/**
 * src/jobs/morningReminder.ts
 * Cron job: 06:00 UTC (≈ 08:00 Europe/Rome CEST)
 * Sends a Persian nudge to each user with pending review items.
 */

import { getAllUsers, getPendingReviewCount } from "../db/queries.js";
import { sendMessage, buildMiniAppButton } from "../lib/telegram.js";

export interface ReminderEnv {
  DB: D1Database;
  TELEGRAM_BOT_TOKEN: string;
  MINI_APP_URL: string;
  ALLOWED_TELEGRAM_USER_IDS: string;
}

export async function runMorningReminder(env: ReminderEnv): Promise<void> {
  const users = await getAllUsers(env.DB);

  for (const user of users) {
    if (user.is_approved !== 1) continue;

    const count = await getPendingReviewCount(env.DB, user.id);
    if (count === 0) continue;

    const text =
      count === 1
        ? `📚 یه سوال دیروز اشتباه زدی — بریم مرور کنیم؟`
        : `📚 ${count} سوال دیروز اشتباه زدی — بریم مرور کنیم؟`;

    await sendMessage(env.TELEGRAM_BOT_TOKEN, {
      chat_id: user.telegram_user_id,
      text,
      reply_markup: buildMiniAppButton("🔁 شروع مرور", `${env.MINI_APP_URL}?screen=review`),
    }).catch((e) => console.error(`Failed to send reminder to user ${user.id}:`, e));
  }
}
