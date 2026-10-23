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
  getQuestionById,
  getAllUsers,
} from "../db/queries.js";
import { getQuestionSource, sourceKey, type SourceQuestion } from '../lib/question-sources.js';
import { saveReviewedContent } from '../lib/content-quality.js';
import { checkPrimaryAdmin, isAccessExpired } from "../lib/auth.js";
import { sendMessage, sendSupportReply, sendAnnouncement, buildMiniAppButton } from "../lib/telegram.js";
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

admin.get('/content-reports', async c => {
  const offset = Math.max(0, Math.min(100000, Number(c.req.query('offset')) || 0));
  const rows = await c.env.DB.prepare(`SELECT r.*, q.source_id, q.text_it, q.correct_answer, q.image_url,
    t.translated_text, t.explanation, t.quality_status FROM content_reports r
    JOIN questions q ON q.id = r.question_id LEFT JOIN translations_cache t ON t.question_id = q.id AND t.lang = 'fa'
    WHERE r.status = 'open' ORDER BY r.id LIMIT 50 OFFSET ?`).bind(Math.floor(offset)).all<SourceQuestion & Record<string, unknown>>();
  const total = await c.env.DB.prepare("SELECT COUNT(*) AS n FROM content_reports WHERE status = 'open'").first<{ n: number }>();
  const audit = await c.env.DB.prepare("SELECT quality_status, COUNT(*) AS count FROM translations_cache WHERE lang = 'fa' GROUP BY quality_status").all();
  return c.json({ reports: rows.results.map(row => ({ ...row, source: getQuestionSource(row) })), total: total?.n || 0, audit: audit.results });
});

admin.post('/content-reports/:id/resolve', async c => {
  const id = Number(c.req.param('id'));
  const body = await c.req.json().catch(() => null) as { status?: unknown; note?: unknown; translatedText?: unknown; explanation?: unknown } | null;
  if (!Number.isSafeInteger(id) || id < 1 || !body || !['resolved', 'dismissed'].includes(String(body.status))
    || typeof body.note !== 'string' || !body.note.trim() || body.note.length > 1000) return c.json({ error: 'دلیل بررسی لازم است؛ حداکثر ۱۰۰۰ نویسه.' }, 400);
  const report = await c.env.DB.prepare("SELECT * FROM content_reports WHERE id = ? AND status = 'open'").bind(id).first<{ question_id: number; kind: string }>();
  if (!report) return c.json({ error: 'گزارش باز پیدا نشد.' }, 404);
  const closeReport = c.env.DB.prepare("UPDATE content_reports SET status = ?, resolution_note = ?, resolved_by = ?, resolved_at = datetime('now') WHERE id = ? AND status = 'open'")
    .bind(body.status, body.note.trim(), c.get('userId'), id);
  if (body.status === 'resolved') {
    if (report.kind === 'answer' || report.kind === 'source') return c.json({ error: 'این گزارش نیاز به بررسی بانک سؤال دارد؛ ویرایش ترجمه، پاسخ یا منبع بانک را تغییر نمی‌دهد.' }, 409);
    if (typeof body.translatedText !== 'string' || body.translatedText.trim().length < 10 || body.translatedText.length > 2000
      || typeof body.explanation !== 'string' || body.explanation.trim().length < 10 || body.explanation.length > 4000) return c.json({ error: 'ترجمه و توضیح اصلاح‌شده را کامل بنویس.' }, 400);
    const q = await getQuestionById(c.env.DB, report.question_id);
    if (!q || !sourceKey(q)) return c.json({ error: 'ابتدا تطبیق سؤال با منبع را اصلاح کن.' }, 409);
    await saveReviewedContent(c.env, q, body.translatedText.trim(), body.explanation.trim(), 'human_reviewed', `admin:${c.get('userId')}`, [], [closeReport]);
  } else await closeReport.run();
  return c.json({ saved: true });
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
        text: `🎉 <b>تبریک! حساب کاربری شما تایید شد.</b>\n\nاکنون می‌توانید مینی‌اپ پتنت فارسی را باز کرده و تمرینات را آغاز کنید. 🚗`,
        parse_mode: "HTML",
        reply_markup: buildMiniAppButton("🚗 باز کردن پتنت فارسی", c.env.MINI_APP_URL),
      })
    );
  } else if (body.isApproved === -1) {
    c.executionCtx.waitUntil(
      sendMessage(c.env.TELEGRAM_BOT_TOKEN, {
        chat_id: target.telegram_user_id,
        text: `🚫 <b>دسترسی شما به مینی‌اپ پتنت فارسی لغو گردید.</b>`,
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

// POST /api/admin/broadcast — one announcement to every user in the audience.
// "active" = approved and not expired; "all" = everyone except blocked users.
admin.post("/broadcast", async (c) => {
  const body = (await c.req.json().catch(() => ({}))) as { text?: unknown; audience?: unknown; pin?: unknown };
  const text = normalizeSupportText(body.text);
  if (!text) return c.json({ error: "متن پیام خالی است." }, 400);
  if (body.audience !== "active" && body.audience !== "all") {
    return c.json({ error: "Invalid audience (must be active or all)" }, 400);
  }

  const users = (await getAllUsers(c.env.DB)).filter((u) =>
    body.audience === "all"
      ? u.is_approved !== -1
      : u.is_approved === 1 && !isAccessExpired(u.access_expires_at)
  );

  // shortcut: sequential sends inside the request — fine for a few hundred users;
  // move to a Queue once the base outgrows Telegram's ~30 msg/s and the Worker time limit.
  let sent = 0;
  for (const u of users) {
    if (await sendAnnouncement(c.env.TELEGRAM_BOT_TOKEN, u.telegram_user_id, text, c.env.MINI_APP_URL, body.pin === true)) sent++;
  }
  return c.json({ ok: true, total: users.length, sent, failed: users.length - sent });
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
