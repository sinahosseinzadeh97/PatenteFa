/**
 * src/jobs/accessReminder.ts
 * Cron job (with the 06:00 UTC morning run): tells users, in the bot chat,
 * 3 days and 1 day before their access ends and once after it ends — with
 * the plans, the payment method and a button to the app.
 */
import {
  getReminderCandidates,
  getAccessOfferSettings,
  claimAccessReminder,
  releaseAccessReminder,
  insertSupportMessage,
  type ReminderCandidate,
} from "../db/queries.js";
import { buildAccessReminder, type AccessReminderKind } from "../lib/access-messages.js";
import { sendMessage, buildMiniAppButton } from "../lib/telegram.js";

export interface AccessReminderEnv {
  DB: D1Database;
  TELEGRAM_BOT_TOKEN: string;
  MINI_APP_URL: string;
}

const DAY_MS = 86_400_000;

/**
 * Which reminder is due now, or null. "Expired" goes only to windows that ran
 * out on their own (trial, purchase, gift, a dated correction) — not to
 * accounts the admin closed on purpose (a 0-day correction) or legacy rows.
 */
export function reminderKindFor(c: ReminderCandidate, nowMs: number): AccessReminderKind | null {
  const remaining = Date.parse(c.access_expires_at.replace(" ", "T") + "Z") - nowMs;
  if (!Number.isFinite(remaining)) return null;
  if (remaining > 3 * DAY_MS) return null;
  if (remaining > DAY_MS) return "ends_3d";
  if (remaining > 0) return "ends_1d";
  const ranOut = c.last_kind === "trial" || c.last_kind === "paid" || c.last_kind === "gift"
    || (c.last_kind === "set" && (c.last_days ?? 0) > 0);
  return ranOut ? "expired" : null;
}

export async function runAccessReminders(env: AccessReminderEnv, nowMs: number = Date.now()): Promise<number> {
  const [candidates, offer] = await Promise.all([
    getReminderCandidates(env.DB),
    getAccessOfferSettings(env.DB),
  ]);

  let sent = 0;
  for (const c of candidates) {
    const kind = reminderKindFor(c, nowMs);
    if (!kind) continue;
    if (!(await claimAccessReminder(env.DB, c.id, kind, c.access_expires_at))) continue;

    const { html, plain } = buildAccessReminder({
      kind,
      firstName: c.first_name,
      expiresAt: c.access_expires_at,
      isTrial: c.last_kind === "trial",
      offer,
    });
    const ok = await sendMessage(env.TELEGRAM_BOT_TOKEN, {
      chat_id: c.telegram_user_id,
      text: html,
      parse_mode: "HTML",
      reply_markup: buildMiniAppButton("🚗 باز کردن پتنت فارسی", env.MINI_APP_URL),
    });
    if (!ok) {
      await releaseAccessReminder(env.DB, c.id, kind, c.access_expires_at);
      continue;
    }
    // Logged as an outbound support message: the admin sees it in the thread,
    // and the user gets the in-app unread badge.
    await insertSupportMessage(env.DB, c.id, "out", plain, "auto");
    sent++;
  }
  return sent;
}
