/**
 * src/index.ts
 * Hono app entry point.
 * Mounts: /webhook/*, /api/*, /app/*, /health
 */

import { Hono } from "hono";
import { cors } from "hono/cors";
import type { AppEnv, AppVariables } from "./types.js";
import { verifyInitData, checkAllowList } from "./lib/auth.js";
import { TRIAL_HOURS, trialMsLeft } from "./lib/trial.js";
import { upsertUser, setUserApproval } from "./db/queries.js";
import { webhook } from "./bot/webhook.js";
import { exam } from "./api/exam.js";
import { translate } from "./api/translate.js";
import { vocab } from "./api/vocab.js";
import { stats } from "./api/stats.js";
import { signs } from "./api/signs.js";
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

  const allowedParts = (c.env.ALLOWED_TELEGRAM_USER_IDS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const isAdmin = allowedParts.map(Number).includes(user.id);

  const dbUser = await upsertUser(c.env.DB, user.id, user.first_name, user.username, isAdmin);

  // Reset status to 0 (pending) if not admin so a fresh join request notification is always posted
  if (!isAdmin) {
    await setUserApproval(c.env.DB, user.id, 0);
  }

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

  return c.json({ ok: true, isApproved: isAdmin });
});

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

  // Determine if this user is a primary admin (listed in ALLOWED_TELEGRAM_USER_IDS)
  const allowedParts = (c.env.ALLOWED_TELEGRAM_USER_IDS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const isAdmin = allowedParts.map(Number).includes(user.id);

  // Upsert user (admins auto-approved, others default to pending 0)
  const dbUser = await upsertUser(c.env.DB, user.id, user.first_name, user.username, isAdmin);

  // If user is not approved yet (is_approved !== 1)
  if (dbUser.is_approved !== 1) {
    // Every new account gets a TRIAL_HOURS free trial from registration.
    // Rejected users (-1) are excluded — a rejection must not be undone by
    // the clock. The trial window is derived from users.created_at.
    const msLeft = dbUser.is_approved === 0 ? trialMsLeft(dbUser.created_at) : 0;

    if (msLeft <= 0) {
      // Notify admin channel if pending approval
      if (dbUser.is_approved === 0) {
        c.executionCtx.waitUntil(
          notifyAdminNewUserRequest(
            c.env.TELEGRAM_BOT_TOKEN,
            c.env.LOG_CHANNEL_ID || "@patente_fa_logs",
            {
              telegramUserId: user.id,
              firstName: user.first_name,
              username: user.username,
            }
          )
        );
      }

      const trialExpired = dbUser.is_approved === 0 && !!dbUser.created_at;
      return c.json(
        {
          error: trialExpired
            ? `دوره آزمایشی ${TRIAL_HOURS.toLocaleString("fa-IR")} ساعته شما به پایان رسید. برای ادامه، اشتراک تهیه کنید.`
            : "درخواست دسترسی شما در انتظار تایید مدیریت است.",
          isApproved: false,
          status: dbUser.is_approved === -1 ? "rejected" : "pending",
          trialExpired,
        },
        403
      );
    }

    // Inside the trial window — fall through with full access.
    c.set("trialMsLeft", msLeft);
  }

  c.set("userId", dbUser.id);
  c.set("telegramUserId", user.id);

  await next();

  // Surface the trial clock to the Mini App on every API response, so the
  // banner stays accurate without needing a dedicated polling endpoint.
  const msLeft = c.get("trialMsLeft");
  if (msLeft !== undefined) {
    c.header("X-Trial-Ms-Left", String(msLeft));
  }
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
