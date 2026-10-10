/**
 * src/api/admin.ts
 * Admin Web Dashboard REST API routes.
 * Guarded by the single configured primary Telegram admin.
 */

import { Hono } from "hono";
import type { AppEnv, AppVariables } from "../types.js";
import {
  getAdminOverviewStats,
  getAdminUsersList,
  getUserActivityTimeline,
  getAdminRecentEvents,
  setUserApproval,
  getApiCostByAction,
  getUserById,
  getSupportThreads,
  getSupportThread,
  insertSupportMessage,
  markSupportThreadRead,
  countUnreadSupportTotal,
  setUserAccessExpiration,
} from "../db/queries.js";
import { checkPrimaryAdmin } from "../lib/auth.js";
import { sendMessage, sendSupportReply, buildMiniAppButton } from "../lib/telegram.js";
import { normalizeSupportText } from "../lib/support.js";
import { persistThenDeliverSupportReply } from "../lib/support-delivery.js";
import {
  renderAdminScreen,
  renderAdminSupportModal,
  renderAdminUserModal,
} from "../app/screens/admin.js";

const admin = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

// Middleware: Admin auth check
admin.use("*", async (c, next) => {
  const telegramUserId: number = c.get("telegramUserId" as never);
  try {
    checkPrimaryAdmin(
      telegramUserId,
      c.env.PRIMARY_ADMIN_TELEGRAM_USER_ID,
      c.env.ALLOWED_TELEGRAM_USER_IDS
    );
  } catch (err) {
    return c.json({ error: "Access denied. Only primary admins can access the management panel." }, 403);
  }
  await next();
});

// The normal Mini App shell does not contain admin markup. It is mounted only
// after this authenticated request succeeds, so non-admin users neither see
// the entry point nor receive the operator interface.
admin.get("/shell", (c) => {
  return c.json({
    html: [renderAdminScreen(), renderAdminUserModal(), renderAdminSupportModal()].join("\n"),
  });
});

// GET /api/admin/overview
admin.get("/overview", async (c) => {
  const stats = await getAdminOverviewStats(c.env.DB);
  return c.json(stats);
});

// GET /api/admin/users?search=&status=
// §18.6: search and status are forwarded directly to getAdminUsersList which
// runs a server-side SQL LIKE query — zero in-memory filtering on this path.
admin.get("/users", async (c) => {
  const search = c.req.query("search");
  const statusFilter = c.req.query("status");
  const users = await getAdminUsersList(c.env.DB, search, statusFilter);
  return c.json({ users });
});

// POST /api/admin/users/:id/status
// :id is the internal users.id — the same id the dashboard uses for
// /users/:id/activity. setUserApproval() keys on telegram_user_id, so the row
// has to be resolved first; passing the internal id straight through updated
// zero rows and made every approve/block button in the panel a no-op.
admin.post("/users/:id/status", async (c) => {
  const id = Number(c.req.param("id"));
  const body = (await c.req.json().catch(() => ({}))) as { isApproved?: number };

  if (typeof body.isApproved !== "number" || ![-1, 0, 1].includes(body.isApproved)) {
    return c.json({ error: "Invalid isApproved value (must be -1, 0, or 1)" }, 400);
  }

  const target = await getUserById(c.env.DB, id);
  if (!target) return c.json({ error: "User not found" }, 404);

  await setUserApproval(c.env.DB, target.telegram_user_id, body.isApproved);

  // Tell the user, exactly like the bot's approve/revoke buttons do — an
  // approval nobody is notified of is an approval that does nothing.
  if (body.isApproved === 1) {
    c.executionCtx.waitUntil(
      sendMessage(c.env.TELEGRAM_BOT_TOKEN, {
        chat_id: target.telegram_user_id,
        text: `🎉 <b>تبریک! حساب کاربری شما تایید شد.</b>\n\nاکنون می‌توانید مینی‌اپ PatenteFa را باز کرده و تمرینات را آغاز کنید. 🚗`,
        parse_mode: "HTML",
        reply_markup: buildMiniAppButton("🚗 باز کردن PatenteFa", c.env.MINI_APP_URL),
      })
    );
  } else if (body.isApproved === -1) {
    c.executionCtx.waitUntil(
      sendMessage(c.env.TELEGRAM_BOT_TOKEN, {
        chat_id: target.telegram_user_id,
        text: `🚫 <b>دسترسی شما به مینی‌اپ PatenteFa لغو گردید.</b>`,
        parse_mode: "HTML",
      })
    );
  }

  return c.json({
    ok: true,
    userId: id,
    telegramUserId: target.telegram_user_id,
    isApproved: body.isApproved,
  });
});

// POST /api/admin/users/:id/access — grant unlimited or time-boxed access.
admin.post("/users/:id/access", async (c) => {
  const id = Number(c.req.param("id"));
  if (!Number.isSafeInteger(id) || id <= 0) {
    return c.json({ error: "Invalid user id" }, 400);
  }

  const body = (await c.req.json().catch(() => ({}))) as { durationDays?: number | null };
  const durationDays = body.durationDays;
  if (durationDays === undefined) {
    return c.json({ error: "durationDays is required" }, 400);
  }
  if (
    durationDays !== null &&
    (!Number.isSafeInteger(durationDays) || durationDays < 1 || durationDays > 3650)
  ) {
    return c.json({ error: "durationDays must be null or an integer between 1 and 3650" }, 400);
  }

  const target = await getUserById(c.env.DB, id);
  if (!target) return c.json({ error: "User not found" }, 404);

  const accessExpiresAt = durationDays === null
    ? null
    : new Date(Date.now() + durationDays * 86_400_000)
        .toISOString()
        .replace("T", " ")
        .slice(0, 19);
  const updated = await setUserAccessExpiration(c.env.DB, id, accessExpiresAt);

  return c.json({
    ok: true,
    userId: id,
    isApproved: updated?.is_approved === 1,
    accessExpiresAt: updated?.access_expires_at ?? null,
  });
});

// ── Support inbox ────────────────────────────────────────────────────────────
// Replies go out through sendSupportReply(), which is the only formatter for an
// outbound message: from the bot, labelled "پشتیبانی PatenteFa", carrying no
// admin name or id. Nothing on these routes stores or returns who replied.

// GET /api/admin/support — thread list, unread first
admin.get("/support", async (c) => {
  const [threads, unreadTotal] = await Promise.all([
    getSupportThreads(c.env.DB),
    countUnreadSupportTotal(c.env.DB),
  ]);
  return c.json({ threads, unreadTotal });
});

// GET /api/admin/support/:id — one user's thread (:id = internal users.id)
admin.get("/support/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (!Number.isSafeInteger(id) || id <= 0) {
    return c.json({ error: "Invalid user id" }, 400);
  }
  const target = await getUserById(c.env.DB, id);
  if (!target) return c.json({ error: "User not found" }, 404);

  const messages = await getSupportThread(c.env.DB, id);
  await markSupportThreadRead(c.env.DB, id, "admin");

  return c.json({
    user: {
      id: target.id,
      telegramUserId: target.telegram_user_id,
      firstName: target.first_name,
      username: target.username,
      isApproved: target.is_approved,
    },
    messages: messages.map((m) => ({
      direction: m.direction,
      body: m.body,
      source: m.source,
      createdAt: m.created_at,
    })),
  });
});

// POST /api/admin/support/:id/reply — works for any user, whether or not they
// have written first, which is what makes it possible to start a conversation
// from the user list.
admin.post("/support/:id/reply", async (c) => {
  const id = Number(c.req.param("id"));
  if (!Number.isSafeInteger(id) || id <= 0) {
    return c.json({ error: "Invalid user id" }, 400);
  }
  const body = (await c.req.json().catch(() => ({}))) as { text?: unknown };
  const text = normalizeSupportText(body.text);
  if (!text) return c.json({ error: "متن پیام خالی است." }, 400);

  const target = await getUserById(c.env.DB, id);
  if (!target) return c.json({ error: "User not found" }, 404);

  const delivered = await persistThenDeliverSupportReply(
    () => insertSupportMessage(c.env.DB, target.id, "out", text, "app"),
    () => sendSupportReply(c.env.TELEGRAM_BOT_TOKEN, target.telegram_user_id, text)
  );

  return c.json({
    ok: true,
    delivered,
    userId: target.id,
    telegramUserId: target.telegram_user_id,
  });
});

// GET /api/admin/users/:id/activity
admin.get("/users/:id/activity", async (c) => {
  const targetUserId = Number(c.req.param("id"));
  const timeline = await getUserActivityTimeline(c.env.DB, targetUserId);
  return c.json(timeline);
});

// GET /api/admin/events
admin.get("/events", async (c) => {
  const events = await getAdminRecentEvents(c.env.DB, 50);
  return c.json({ events });
});

// GET /api/admin/cost
// §18.4: API cost breakdown by action — today / this 7 days / all-time.
admin.get("/cost", async (c) => {
  const breakdown = await getApiCostByAction(c.env.DB);
  return c.json({ breakdown });
});

export { admin };
