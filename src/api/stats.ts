/**
 * src/api/stats.ts
 * Stats API — per-topic accuracy, streak, days remaining.
 */

import { Hono } from "hono";
import type { AppEnv, AppVariables } from "../types.js";
import {
  getTopicAccuracy,
  getStreak,
  getRecentSessions,
  getPendingReviewCount,
  getQuestionCount,
  getUserByTelegramId,
  updateUserTargetDate,
} from "../db/queries.js";

const stats = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

// GET /api/stats
stats.get("/", async (c) => {
  const userId: number = c.get("userId" as never);
  const telegramUserId: number = c.get("telegramUserId" as never);

  const [topicAccuracy, streak, recentSessions, reviewCount, questionCount, user] =
    await Promise.all([
      getTopicAccuracy(c.env.DB, userId),
      getStreak(c.env.DB, userId),
      getRecentSessions(c.env.DB, userId, 30),
      getPendingReviewCount(c.env.DB, userId),
      getQuestionCount(c.env.DB),
      getUserByTelegramId(c.env.DB, telegramUserId),
    ]);

  // Days remaining to target exam date
  let daysToExam: number | null = null;
  if (user?.target_exam_date) {
    const target = new Date(user.target_exam_date);
    const now = new Date();
    daysToExam = Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86_400_000));
  }

  // Weakest topic
  const weakestTopic = topicAccuracy.length > 0 ? topicAccuracy[0] : null;

  // Total sessions and pass rate
  const finishedSessions = recentSessions.filter((s) => s.finished_at);
  const passCount = finishedSessions.filter((s) => s.passed === 1).length;
  const passRate =
    finishedSessions.length > 0
      ? Math.round((passCount / finishedSessions.length) * 100)
      : null;

  return c.json({
    user: user
      ? {
          id: user.id,
          telegramUserId: user.telegram_user_id,
          firstName: user.first_name,
          username: user.username,
          targetExamDate: user.target_exam_date,
          createdAt: user.created_at,
        }
      : null,
    streak,
    daysToExam,
    reviewCount,
    questionCount,
    passRate,
    totalSessions: finishedSessions.length,
    weakestTopic,
    topicAccuracy,
    recentSessions: recentSessions.slice(0, 5).map((s) => ({
      id: s.id,
      mode: s.mode,
      score: s.score,
      wrongCount: s.wrong_count,
      passed: s.passed === 1,
      durationSeconds: s.duration_seconds,
      startedAt: s.started_at,
    })),
  });
});

// POST /api/stats/target-date
stats.post("/target-date", async (c) => {
  const userId: number = c.get("userId" as never);
  const body = (await c.req.json()) as { targetExamDate?: string };
  await updateUserTargetDate(c.env.DB, userId, body.targetExamDate ?? null);
  return c.json({ ok: true });
});

export { stats };

