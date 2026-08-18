/**
 * src/api/topics.ts
 * Endpoints for browsing the official Patente B chapters (Capitoli) in Italian & Persian,
 * and starting dedicated chapter quizzes.
 */

import { Hono } from "hono";
import type { AppEnv, AppVariables } from "../types.js";
import {
  getAllTopicsWithStats,
  drawQuestionsFromTopics,
  replaceActiveExamSession,
  insertExamAnswer,
} from "../db/queries.js";

export const topics = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

/**
 * GET /api/topics
 * Returns list of all official argument areas with Italian/Persian names and user stats.
 * Topics with 0 questions (e.g. safety-net placeholders) are included in the DB
 * but filtered out by the client before display.
 */
topics.get("/", async (c) => {
  const userId = c.get("userId");
  const list = await getAllTopicsWithStats(c.env.DB, userId);

  return c.json({
    ok: true,
    count: list.length,
    topics: list,
  });
});

/**
 * POST /api/topics/:topicId/exam
 * Starts a 15-question exam session strictly for the specified chapter (topic_id).
 */
topics.post("/:topicId/exam", async (c) => {
  const userId = c.get("userId");
  const topicId = Number(c.req.param("topicId"));

  if (!topicId || isNaN(topicId)) {
    return c.json({ error: "آیدی فصل نامعتبر است." }, 400);
  }

  const questions = await drawQuestionsFromTopics(c.env.DB, userId, [topicId], 15);
  if (!questions || questions.length === 0) {
    return c.json({ error: "هیچ سوالی برای این فصل یافت نشد." }, 404);
  }

  // Match /api/exam/start: only retire a previous session after the new draw is
  // known to contain questions, so a failed chapter start cannot discard work.
  const sessionId = await replaceActiveExamSession(c.env.DB, userId, "topic_practice");

  for (let i = 0; i < questions.length; i++) {
    await insertExamAnswer(c.env.DB, sessionId, questions[i].id, i + 1, null, null);
  }

  return c.json({
    ok: true,
    sessionId,
    mode: "topic_practice",
    topicId,
    questionCount: questions.length,
    questions: questions.map((q, i) => ({
      position: i + 1,
      questionId: q.id,
      textIt: q.text_it,
      imageUrl: q.image_url,
      topicId: q.topic_id,
    })),
  });
});
