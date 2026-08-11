/**
 * src/api/exam.ts
 * Exam session API routes — start, answer, flag, finish.
 * All routes are mounted at /api/exam/* in src/index.ts.
 */

import { Hono } from "hono";
import type { AppEnv, AppVariables } from "../types.js";
import {
  createExamSession,
  drawExamQuestions,
  finishExamSession,
  getSessionAnswers,
  getSessionById,
  insertExamAnswer,
  updateAnswerFlag,
  upsertReviewQueue,
  clearReviewItems,
  getQuestionById,
  getDueReviewQuestions,
  getWorstTopicIds,
  drawQuestionsFromTopics,
} from "../db/queries.js";
import { nextMorningISO } from "../lib/srs.js";
import { sendMessage, buildMiniAppButton } from "../lib/telegram.js";

const exam = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

// ── POST /api/exam/start ──────────────────────────────────────────────────────
exam.post("/start", async (c) => {
  const userId: number = c.get("userId" as never);
  const body = await c.req.json<{ mode?: "exam" | "review" | "topic_practice" }>();
  const mode = body.mode ?? "exam";

  let questions;
  if (mode === "review") {
    questions = await getDueReviewQuestions(c.env.DB, userId);
    if (questions.length === 0) {
      return c.json({ error: "No questions due for review" }, 400);
    }
    // Cap review sessions at 30
    questions = questions.slice(0, 30);
  } else if (mode === "topic_practice") {
    // Pull from the user's worst 3 topics
    const worstTopicIds = await getWorstTopicIds(c.env.DB, userId, 3);
    if (worstTopicIds.length === 0) {
      // No answer history yet — fall back to normal random draw
      questions = await drawExamQuestions(c.env.DB, userId, 30);
    } else {
      questions = await drawQuestionsFromTopics(c.env.DB, userId, worstTopicIds, 30);
      if (questions.length === 0) {
        // Topics exist but no questions (shouldn't happen) — fall back
        questions = await drawExamQuestions(c.env.DB, userId, 30);
      }
    }
    if (questions.length === 0) {
      return c.json({ error: "No questions in database — run the import script first" }, 503);
    }
  } else {
    questions = await drawExamQuestions(c.env.DB, userId, 30);
    if (questions.length === 0) {
      return c.json({ error: "No questions in database — run the import script first" }, 503);
    }
  }

  const sessionId = await createExamSession(c.env.DB, userId, mode);

  // Pre-insert all answer rows with null answers so position is established
  for (let i = 0; i < questions.length; i++) {
    await insertExamAnswer(c.env.DB, sessionId, questions[i].id, i + 1, null, null);
  }

  return c.json({
    sessionId,
    mode,
    questions: questions.map((q, i) => ({
      position: i + 1,
      questionId: q.id,
      textIt: q.text_it,
      imageUrl: q.image_url,
      topicId: q.topic_id,
    })),
  });
});

// ── POST /api/exam/:sessionId/answer ─────────────────────────────────────────
exam.post("/:sessionId/answer", async (c) => {
  const userId: number = c.get("userId" as never);
  const sessionId = Number(c.req.param("sessionId"));
  const body = await c.req.json<{ questionId: number; answer: 0 | 1 }>();

  const session = await getSessionById(c.env.DB, sessionId);
  if (!session || session.user_id !== userId) {
    return c.json({ error: "Session not found" }, 404);
  }
  if (session.finished_at) {
    return c.json({ error: "Session already finished" }, 400);
  }

  const question = await getQuestionById(c.env.DB, body.questionId);
  if (!question) return c.json({ error: "Question not found" }, 404);

  const isCorrect = body.answer === question.correct_answer ? 1 : 0;

  await c.env.DB
    .prepare(
      `UPDATE exam_answers
       SET user_answer = ?, is_correct = ?, answered_at = datetime('now')
       WHERE session_id = ? AND question_id = ?`
    )
    .bind(body.answer, isCorrect, sessionId, body.questionId)
    .run();

  // Don't reveal correct/incorrect until finish (matches real exam)
  return c.json({ recorded: true });
});

// ── POST /api/exam/:sessionId/flag ────────────────────────────────────────────
exam.post("/:sessionId/flag", async (c) => {
  const userId: number = c.get("userId" as never);
  const sessionId = Number(c.req.param("sessionId"));
  const body = await c.req.json<{ questionId: number; flagged: boolean }>();

  const session = await getSessionById(c.env.DB, sessionId);
  if (!session || session.user_id !== userId) {
    return c.json({ error: "Session not found" }, 404);
  }

  await updateAnswerFlag(c.env.DB, sessionId, body.questionId, body.flagged ? 1 : 0);
  return c.json({ ok: true });
});

// ── POST /api/exam/:sessionId/finish ─────────────────────────────────────────
exam.post("/:sessionId/finish", async (c) => {
  const userId: number = c.get("userId" as never);
  const sessionId = Number(c.req.param("sessionId"));
  const body = await c.req.json<{ durationSeconds?: number }>();

  const session = await getSessionById(c.env.DB, sessionId);
  if (!session || session.user_id !== userId) {
    return c.json({ error: "Session not found" }, 404);
  }
  if (session.finished_at) {
    return c.json({ error: "Session already finished" }, 400);
  }

  const answers = await getSessionAnswers(c.env.DB, sessionId);

  // Score the session
  let correctCount = 0;
  let wrongCount = 0;
  const wrongQuestionIds: number[] = [];
  const correctQuestionIds: number[] = [];

  for (const a of answers) {
    if (a.is_correct === 1) {
      correctCount++;
      correctQuestionIds.push(a.question_id);
    } else {
      wrongCount++;
      wrongQuestionIds.push(a.question_id);
    }
  }

  const totalQ = answers.length || 30;
  const allowedWrong = totalQ <= 10 ? 1 : 3;
  const passed = wrongCount <= allowedWrong ? 1 : 0;
  const durationSeconds = body.durationSeconds ?? 0;

  await finishExamSession(
    c.env.DB,
    sessionId,
    correctCount,
    wrongCount,
    passed,
    durationSeconds
  );

  // Wrong questions come back tomorrow; questions the user finally got right
  // leave the queue so it stops replaying the same mistakes forever.
  const nextReview = nextMorningISO();
  for (const qId of wrongQuestionIds) {
    await upsertReviewQueue(c.env.DB, userId, qId, nextReview);
  }
  await clearReviewItems(c.env.DB, userId, correctQuestionIds);



  // Build results payload with correct answers revealed
  const questionIds = answers.map((a) => a.question_id);
  const questionsData: Record<number, { text_it: string; correct_answer: number; image_url: string | null }> = {};
  for (const qId of questionIds) {
    const q = await getQuestionById(c.env.DB, qId);
    if (q) {
      questionsData[qId] = {
        text_it: q.text_it,
        correct_answer: q.correct_answer,
        image_url: q.image_url,
      };
    }
  }

  return c.json({
    sessionId,
    score: correctCount,
    wrongCount,
    passed: passed === 1,
    durationSeconds,
    answers: answers.map((a) => ({
      position: a.position,
      questionId: a.question_id,
      textIt: questionsData[a.question_id]?.text_it ?? "",
      imageUrl: questionsData[a.question_id]?.image_url ?? null,
      correctAnswer: questionsData[a.question_id]?.correct_answer ?? 1,
      userAnswer: a.user_answer,
      isCorrect: a.is_correct === 1,
      flagged: a.flagged === 1,
    })),
  });
});

export { exam };
