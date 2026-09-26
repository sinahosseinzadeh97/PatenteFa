/**
 * src/index.ts
 * Hono app entry point.
 * Mounts: /webhook/*, /api/*, /app/*, /health
 */

import { Hono } from "hono";
import { cors } from "hono/cors";
import type { AppEnv, AppVariables } from "./types.js";
import { verifyInitData, isAccessExpired, isPrimaryAdminUser } from "./lib/auth.js";
import { upsertUser, setUserApproval } from "./db/queries.js";
import { webhook } from "./bot/webhook.js";
import { exam } from "./api/exam.js";
import { translate } from "./api/translate.js";
import { vocab } from "./api/vocab.js";
import { stats } from "./api/stats.js";
import { signs } from "./api/signs.js";
import { support } from "./api/support.js";
import { serveApp } from "./app/shell.js";
import { runMorningReminder } from "./jobs/morningReminder.js";
import { runNightlyBackup } from "./jobs/nightlyJournalAndBackup.js";

import { notifyAdminNewUserRequest } from "./lib/telegram.js";

// Re-export for use in route files
export type { AppEnv, AppVariables };

type HonoApp = Hono<{ Bindings: AppEnv; Variables: AppVariables }>;

const app: HonoApp = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

// ── Global middleware ────────────────────────────────────────────────────────
app.use("*", cors({ origin: "*", allowMethods: ["GET", "POST", "OPTIONS"] }));

// ── Health check ─────────────────────────────────────────────────────────────
app.get("/health", (c) => c.json({ ok: true, service: "patente-fa" }));

// ── Webhook (no auth — validated by secret token in handler) ──────────────────
app.route("/webhook", webhook);

// ── Public Access Request Endpoint (allows submitting typed fun answer) ────────
app.post("/api/request-access", async (c) => {
  const initData = c.req.header("X-Telegram-InitData");
  if (!initData) return c.json({ error: "Missing X-Telegram-InitData header" }, 401);

  let payload;
  try {
    payload = await verifyInitData(initData, c.env.TELEGRAM_BOT_TOKEN);
  } catch {
    return c.json({ error: "Invalid initData" }, 401);
  }

  const { user } = payload;
  const body = (await c.req.json().catch(() => ({}))) as { funAnswer?: string };
  const funAnswer = (body.funAnswer || "").trim() || "آره خیلی زیاد!";

  const isAdmin = isPrimaryAdminUser(
    user.id,
    c.env.PRIMARY_ADMIN_TELEGRAM_USER_ID,
    c.env.ALLOWED_TELEGRAM_USER_IDS
  );

  let dbUser = await upsertUser(c.env.DB, user.id, user.first_name, user.username, isAdmin);

  // A rejected user may submit a fresh request, but this public endpoint must
  // never downgrade an already-approved account back to pending.
  if (!isAdmin && dbUser.is_approved !== 1) {
    dbUser = (await setUserApproval(c.env.DB, user.id, 0)) ?? dbUser;
  }

  const hasAccess = isAdmin || (dbUser.is_approved === 1 && !isAccessExpired(dbUser.access_expires_at));

  if (!hasAccess) {
    await notifyAdminNewUserRequest(
      c.env.TELEGRAM_BOT_TOKEN,
      c.env.LOG_CHANNEL_ID || "@patente_fa_logs",
      {
        telegramUserId: user.id,
        firstName: user.first_name,
        username: user.username,
        funAnswer,
      }
    );
  }

  return c.json({ ok: true, isApproved: hasAccess });
});

// ── Support thread ───────────────────────────────────────────────────────────
// Mounted before the /api group on purpose: it authenticates with initData but
// is NOT approval-gated, so a pending or blocked user can still
// reach the admin. Registered first, so the gate below never runs for it.
app.route("/api/support", support);

// ── API auth middleware ───────────────────────────────────────────────────────
const api = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

api.use("*", async (c, next) => {
  const initData = c.req.header("X-Telegram-InitData");
  if (!initData) {
    return c.json({ error: "Missing X-Telegram-InitData header" }, 401);
  }

  let payload;
  try {
    payload = await verifyInitData(initData, c.env.TELEGRAM_BOT_TOKEN);
  } catch (e) {
    if (e instanceof Response) return e;
    return c.json({ error: "Invalid initData" }, 401);
  }

  const { user } = payload;

  const isAdmin = isPrimaryAdminUser(
    user.id,
    c.env.PRIMARY_ADMIN_TELEGRAM_USER_ID,
    c.env.ALLOWED_TELEGRAM_USER_IDS
  );

  // Upsert user (admins auto-approved, others default to pending 0)
  const dbUser = await upsertUser(c.env.DB, user.id, user.first_name, user.username, isAdmin);

  // Approval is the subscription/access gate. Keep it fail-closed: a newly
  // registered, pending, rejected, or otherwise invalid status must never reach
  // any protected API route. The support and access-request routes above are
  // the only intentional exceptions.
  const accessExpired = !isAdmin && dbUser.is_approved === 1 && isAccessExpired(dbUser.access_expires_at);
  if (dbUser.is_approved !== 1 || accessExpired) {
    const rejected = dbUser.is_approved === -1;
    return c.json(
      {
        error: accessExpired
          ? "زمان دسترسی شما به پایان رسیده است. برای تمدید با پشتیبانی گفتگو کنید."
          : rejected
          ? "درخواست دسترسی شما تایید نشده است. برای پیگیری با پشتیبانی گفتگو کنید."
          : "درخواست دسترسی شما در انتظار تایید مدیریت است.",
        isApproved: false,
        status: accessExpired ? "expired" : rejected ? "rejected" : "pending",
        accessExpiresAt: accessExpired ? dbUser.access_expires_at : undefined,
      },
      403
    );
  }

  c.set("userId", dbUser.id);
  c.set("telegramUserId", user.id);

  await next();
});

import { topics } from "./api/topics.js";
import { reels } from "./api/reels.js";
import { telemetry } from "./api/telemetry.js";
import { admin } from "./api/admin.js";
import { profile } from "./api/profile.js";
import { tutor } from "./api/tutor.js";

api.route("/exam", exam);
api.route("/translate", translate);
api.route("/vocab", vocab);
api.route("/stats", stats);
api.route("/signs", signs);
api.route("/topics", topics);
api.route("/reels", reels);
api.route("/telemetry", telemetry);
api.route("/admin", admin);
api.route("/profile", profile);
api.route("/tutor", tutor);

app.route("/api", api);

// ── Sign images served from R2 (§16.7) ───────────────────────────────────────
// Public route — no auth required, these are static image assets.
// Cache-Control: 1 year immutable since filenames are stable sign IDs.
app.get("/images/signs/:key", async (c) => {
  const key = c.req.param("key");
  const object = await c.env.SIGNS.get(`signs/${key}`);
  if (!object) {
    return c.json({ error: "Not found" }, 404);
  }
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return new Response(object.body, { headers });
});

// ── Mini App shell ──────────────────────────────────────────────────────────
// CSS/JS are real static files under public/ (served automatically by
// wrangler's `assets` binding — see wrangler.jsonc — for paths like
// /css/app.css and /js/*.js, before any request reaches this Worker).
// "/" is the public landing page — a static file (public/index.html) served by
// the assets binding before the request ever reaches this Worker.
app.get("/app", serveApp);
app.get("/app/*", serveApp);

// ── Scheduled (cron) handler ─────────────────────────────────────────────────
const scheduled: ExportedHandlerScheduledHandler<AppEnv> = async (event, env) => {
  const cron = event.cron;
  console.log("Cron fired:", cron);

  if (cron === "0 6 * * *") {
    await runMorningReminder({
      DB: env.DB,
      TELEGRAM_BOT_TOKEN: env.TELEGRAM_BOT_TOKEN,
      MINI_APP_URL: env.MINI_APP_URL,
      ALLOWED_TELEGRAM_USER_IDS: env.ALLOWED_TELEGRAM_USER_IDS,
    });
  } else if (cron === "0 23 * * *") {
    await runNightlyBackup({
      DB: env.DB,
      TELEGRAM_BOT_TOKEN: env.TELEGRAM_BOT_TOKEN,
      LOG_CHANNEL_ID: env.LOG_CHANNEL_ID,
    });
  }
};

export default {
  fetch: app.fetch,
  scheduled,
};
