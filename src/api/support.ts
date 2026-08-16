/**
 * src/api/support.ts
 * User-facing support thread for the Mini App.
 *
 * Mounted *before* the approval-gated /api group in src/index.ts, and does its
 * own initData check, because the users who most need to reach support are the
 * ones the gate turns away: pending accounts, expired trials, and blocked
 * users. Verified Telegram identity is required; approval is not.
 */

import { Hono } from "hono";
import type { AppEnv } from "../types.js";
import { verifyInitData } from "../lib/auth.js";
import {
  upsertUser,
  insertSupportMessage,
  getSupportThread,
  markSupportThreadRead,
  countUnreadSupport,
} from "../db/queries.js";
import { notifySupportMessage } from "../lib/telegram.js";
import { normalizeSupportText, SUPPORT_MAX_LEN } from "../lib/support.js";

/** Messages per minute, per user. A support chat is typed by a human. */
const RATE_LIMIT_PER_MIN = 5;

const support = new Hono<{ Bindings: AppEnv }>();

/** Verify initData and make sure the users row exists. Returns null on failure. */
async function resolveUser(c: any) {
  const initData = c.req.header("X-Telegram-InitData");
  if (!initData) return null;
  try {
    const { user } = await verifyInitData(initData, c.env.TELEGRAM_BOT_TOKEN);
    const isAdmin = (c.env.ALLOWED_TELEGRAM_USER_IDS || "")
      .split(",")
      .map((s: string) => Number(s.trim()))
      .filter(Boolean)
      .includes(user.id);
    const dbUser = await upsertUser(c.env.DB, user.id, user.first_name, user.username, isAdmin);
    return { dbUser, tgUser: user };
  } catch {
    return null;
  }
}

/** Thread history. Opening it marks the support side's replies as read. */
support.get("/", async (c) => {
  const resolved = await resolveUser(c);
  if (!resolved) return c.json({ error: "Invalid initData" }, 401);

  const messages = await getSupportThread(c.env.DB, resolved.dbUser.id);
  await markSupportThreadRead(c.env.DB, resolved.dbUser.id, "user");

  return c.json({
    messages: messages.map((m) => ({
      direction: m.direction,
      body: m.body,
      createdAt: m.created_at,
    })),
  });
});

/** Unread replies waiting for this user — drives the badge, no side effects. */
support.get("/unread", async (c) => {
  const resolved = await resolveUser(c);
  if (!resolved) return c.json({ error: "Invalid initData" }, 401);

  const unread = await countUnreadSupport(c.env.DB, resolved.dbUser.id, "user");
  return c.json({ unread });
});

/** Send a message to support. */
support.post("/", async (c) => {
  const resolved = await resolveUser(c);
  if (!resolved) return c.json({ error: "Invalid initData" }, 401);

  const body = (await c.req.json().catch(() => ({}))) as { text?: unknown };
  const text = normalizeSupportText(body.text);
  if (!text) {
    return c.json({ error: "متن پیام خالی است." }, 400);
  }

  const rateKey = `support:rate:${resolved.tgUser.id}`;
  const sent = Number((await c.env.KV.get(rateKey)) || 0);
  if (sent >= RATE_LIMIT_PER_MIN) {
    return c.json({ error: "پیام‌های زیادی ارسال کرده‌اید. یک دقیقه صبر کنید." }, 429);
  }
  await c.env.KV.put(rateKey, String(sent + 1), { expirationTtl: 60 });

  await insertSupportMessage(c.env.DB, resolved.dbUser.id, "in", text, "app");

  // The admin's push notification. Never blocks the user's send.
  c.executionCtx.waitUntil(
    notifySupportMessage(c.env.TELEGRAM_BOT_TOKEN, c.env.LOG_CHANNEL_ID, {
      telegramUserId: resolved.tgUser.id,
      firstName: resolved.tgUser.first_name,
      username: resolved.tgUser.username,
      text,
      via: "app",
    })
  );

  return c.json({ ok: true, body: text, maxLength: SUPPORT_MAX_LEN });
});

export { support };
