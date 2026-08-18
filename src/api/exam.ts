/**
 * src/api/exam.ts
 * Exam session API routes — start, answer, flag, finish.
 * All routes are mounted at /api/exam/* in src/index.ts.
 */

import { Hono } from "hono";
import type { AppEnv, AppVariables } from "../types.js";
import {
  abandonExamSession,
  replaceActiveExamSession,
  drawExamQuestions,
  finishExamSession,
  getSessionAnswers,
  getSessionById,
  insertExamAnswer,
  recordExamAnswer,
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
const ACTIVE_EXAM_SESSION_MS = 30 * 60 * 1000;

function isExamSessionExpired(startedAt: string): boolean {
  const iso = startedAt.includes("T") ? startedAt : startedAt.replace(" ", "T") + "Z";
  const startedMs = Date.parse(iso);
  return !Number.isFinite(startedMs) || Date.now() - startedMs >= ACTIVE_EXAM_SESSION_MS;
}

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

  // Only supersede an old session once this start request is known to succeed.
  // Its answers remain available for progress stats, but it is never scored.
  const sessionId = await replaceActiveExamSession(c.env.DB, userId, mode);

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

// ── POST /api/exam/:sessionId/abandon ────────────────────────────────────────
exam.post("/:sessionId/abandon", async (c) => {
  const userId: number = c.get("userId" as never);
  const sessionId = Number(c.req.param("sessionId"));
  const session = await getSessionById(c.env.DB, sessionId);
  if (!session || session.user_id !== userId) {
    return c.json({ error: "Session not found" }, 404);
  }

  const abandoned = await abandonExamSession(c.env.DB, sessionId, userId);
  if (!abandoned) {
    return c.json({ error: "Session is no longer active", abandoned: false }, 409);
  }
  return c.json({ abandoned: true });
});

// ── POST /api/exam/:sessionId/answer ─────────────────────────────────────────
exam.post("/:sessionId/answer", async (c) => {
  const userId: number = c.get("userId" as never);
  const sessionId = Number(c.req.param("sessionId"));
  const body = (await c.req.json().catch(() => null)) as {
    questionId?: unknown;
    answer?: unknown;
  } | null;

  if (
    !body ||
    typeof body.questionId !== "number" ||
    !Number.isInteger(body.questionId) ||
    body.questionId <= 0 ||
    (body.answer !== 0 && body.answer !== 1)
  ) {
    return c.json({ error: "questionId and a binary answer (0 or 1) are required" }, 400);
  }

  const session = await getSessionById(c.env.DB, sessionId);
  if (!session || session.user_id !== userId) {
    return c.json({ error: "Session not found" }, 404);
  }
  if (session.finished_at) {
    return c.json({ error: "Session already finished" }, 400);
  }
  if (session.abandoned_at) {
    return c.json({ error: "Session was abandoned" }, 400);
  }
  if (isExamSessionExpired(session.started_at)) {
    await abandonExamSession(c.env.DB, sessionId, userId);
    return c.json({ error: "Session expired" }, 400);
  }

  const question = await getQuestionById(c.env.DB, body.questionId);
  if (!question) return c.json({ error: "Question not found" }, 404);

  const isCorrect: 0 | 1 = body.answer === question.correct_answer ? 1 : 0;
  const recordResult = await recordExamAnswer(
    c.env.DB,
    sessionId,
    userId,
    body.questionId,
    body.answer,
    isCorrect
  );
  if (recordResult === "conflict") {
    return c.json({ error: "A different answer was already recorded" }, 409);
  }
  if (recordResult === "inactive") {
    return c.json({ error: "Session is no longer active" }, 409);
  }

  // Don't reveal correct/incorrect until finish (matches real exam)
  return c.json({ recorded: true, duplicate: recordResult === "duplicate" });
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
  if (session.finished_at || session.abandoned_at || isExamSessionExpired(session.started_at)) {
    if (!session.finished_at && !session.abandoned_at) {
      await abandonExamSession(c.env.DB, sessionId, userId);
    }
    return c.json({ error: "Session is no longer active" }, 400);
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
  if (session.abandoned_at) {
    return c.json({ error: "Session was abandoned" }, 400);
  }
  if (isExamSessionExpired(session.started_at)) {
    await abandonExamSession(c.env.DB, sessionId, userId);
    return c.json({ error: "Session expired" }, 400);
  }

  const durationSeconds =
    typeof body.durationSeconds === "number" && Number.isFinite(body.durationSeconds)
      ? Math.max(0, Math.floor(body.durationSeconds))
      : 0;

  // The score and terminal transition happen in one conditional SQL statement.
  // Whichever request wins (finish or abandon) prevents the other from mutating
  // the session, and answers cannot change after this transition commits.
  const finished = await finishExamSession(c.env.DB, sessionId, userId, durationSeconds);
  if (!finished) {
    return c.json({ error: "Session is no longer active" }, 409);
  }

  const [answers, finishedSession] = await Promise.all([
    getSessionAnswers(c.env.DB, sessionId),
    getSessionById(c.env.DB, sessionId),
  ]);
  const correctCount = finishedSession?.score ?? 0;
  const wrongCount = finishedSession?.wrong_count ?? answers.length;
  const passed = finishedSession?.passed ?? 0;
  const wrongQuestionIds = answers.filter((a) => a.is_correct !== 1).map((a) => a.question_id);
  const correctQuestionIds = answers.filter((a) => a.is_correct === 1).map((a) => a.question_id);

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
