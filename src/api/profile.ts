/**
 * src/api/profile.ts
 * Profile & Analysis API — single endpoint for §13 profile screen.
 * GET /api/profile — returns XP/level, bank coverage, needs-more-work,
 *                     per-topic accuracy, and score trend sparkline data.
 */

import { Hono } from "hono";
import type { AppEnv, AppVariables } from "../types.js";
import {
  getUserByTelegramId,
  getBankCoverage,
  getNeedsMoreWork,
  getScoreTrend,
  getTopicAccuracy,
  getStreak,
} from "../db/queries.js";

const profile = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

/**
 * XP formula (§13.2):
 *   XP = (total_correct * 10) + (exams_finished * 50) + (streak_days * 5)
 * Level: floor(XP / 100)
 */
function computeXpAndLevel(
  totalCorrect: number,
  examsFinished: number,
  streakDays: number
): { xp: number; level: number; xpInLevel: number; xpForNextLevel: number } {
  const xp = totalCorrect * 10 + examsFinished * 50 + streakDays * 5;
  const level = Math.floor(xp / 100);
  const xpInLevel = xp % 100;
  const xpForNextLevel = 100;
  return { xp, level, xpInLevel, xpForNextLevel };
}

// GET /api/profile
profile.get("/", async (c) => {
  const userId: number = c.get("userId" as never);
  const telegramUserId: number = c.get("telegramUserId" as never);

  const [user, bankCoverage, needsMoreWork, scoreTrend, topicAccuracy, streak] =
    await Promise.all([
      getUserByTelegramId(c.env.DB, telegramUserId),
      getBankCoverage(c.env.DB, userId),
      getNeedsMoreWork(c.env.DB, userId, 10),
      getScoreTrend(c.env.DB, userId, 15),
      getTopicAccuracy(c.env.DB, userId),
      getStreak(c.env.DB, userId),
    ]);

  // For accurate XP we need total finished exams (not capped to 15) and total correct
  const [examCountRow, correctCountRow, vocabRow] = await Promise.all([
    c.env.DB.prepare(
      `SELECT COUNT(*) AS cnt FROM exam_sessions
       WHERE user_id = ? AND mode = 'exam' AND finished_at IS NOT NULL`
    )
      .bind(userId)
      .first<{ cnt: number }>(),
    c.env.DB.prepare(
      `SELECT SUM(ea.is_correct) AS cnt
       FROM exam_answers ea
       JOIN exam_sessions es ON es.id = ea.session_id
       WHERE es.user_id = ? AND ea.is_correct = 1`
    )
      .bind(userId)
      .first<{ cnt: number | null }>(),
    c.env.DB.prepare(
      `SELECT COUNT(*) AS cnt FROM vocab_items WHERE user_id = ?`
    )
      .bind(userId)
      .first<{ cnt: number }>(),
  ]);

  const totalExamsFinished = examCountRow?.cnt ?? 0;
  const totalCorrect = correctCountRow?.cnt ?? 0;
  const vocabLearned = vocabRow?.cnt ?? 0;

  const { xp, level, xpInLevel, xpForNextLevel } = computeXpAndLevel(
    totalCorrect,
    totalExamsFinished,
    streak
  );

  return c.json({
    user: user
      ? {
          id: user.id,
          firstName: user.first_name,
          username: user.username,
          telegramUserId: user.telegram_user_id,
        }
      : null,
    xp,
    level,
    xpInLevel,
    xpForNextLevel,
    stats: {
      streak,
      examsFinished: totalExamsFinished,
      vocabLearned,
      bankCoverage,
    },
    topicAccuracy,
    scoreTrend: scoreTrend.map((s) => ({
      sessionId: s.sessionId,
      score: s.score,
      wrongCount: s.wrongCount,
      passed: s.passed === 1,
      startedAt: s.startedAt,
    })),
    needsMoreWork,
  });
});

export { profile };
