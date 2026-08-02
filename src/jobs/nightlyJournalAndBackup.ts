/**
 * src/jobs/nightlyJournalAndBackup.ts
 * Cron job: 23:00 UTC (≈ 01:00 Europe/Rome)
 * Dumps D1 tables to JSON and posts to the log Telegram channel as a document.
 */

import { sendDocument } from "../lib/telegram.js";

export interface BackupEnv {
  DB: D1Database;
  TELEGRAM_BOT_TOKEN: string;
  LOG_CHANNEL_ID: string;
}

async function dumpTable<T>(db: D1Database, table: string): Promise<T[]> {
  const result = await db.prepare(`SELECT * FROM ${table}`).all<T>();
  return result.results;
}

export async function runNightlyBackup(env: BackupEnv): Promise<void> {
  const logChannel = env.LOG_CHANNEL_ID || "@patente_fa_logs";
  const dateStr = new Date().toISOString().split("T")[0];
  const timestamp = new Date().toISOString();

  try {
    const [users, examSessions, examAnswers, reviewQueue, vocabItems, translationsCache] =
      await Promise.all([
        dumpTable(env.DB, "users"),
        dumpTable(env.DB, "exam_sessions"),
        dumpTable(env.DB, "exam_answers"),
        dumpTable(env.DB, "review_queue"),
        dumpTable(env.DB, "vocab_items"),
        dumpTable(env.DB, "translations_cache"),
      ]);

    const backupData = {
      backup_timestamp: timestamp,
      tables: {
        users,
        exam_sessions: examSessions,
        exam_answers: examAnswers,
        review_queue: reviewQueue,
        vocab_items: vocabItems,
        translations_cache: translationsCache,
      },
      stats: {
        total_users: users.length,
        total_sessions: examSessions.length,
        total_answers: examAnswers.length,
        total_vocab: vocabItems.length,
      },
    };

    const content = JSON.stringify(backupData, null, 2);
    const filename = `patente_fa_backup_${dateStr}.json`;
    const caption = `💾 <b>پشتیبان‌گیری شبانه D1</b>\n📅 تاریخ: ${dateStr}\n👥 کاربران: ${users.length} | 📝 آزمون‌ها: ${examSessions.length}`;

    await sendDocument(env.TELEGRAM_BOT_TOKEN, logChannel, filename, content, caption);

    console.log(`Nightly backup successfully generated and sent to ${logChannel}`);
  } catch (error) {
    console.error("Failed to execute nightly backup job:", error);
  }
}
