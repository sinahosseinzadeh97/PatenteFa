import { getQuestionSource } from "../lib/question-sources.js";
/**
 * src/api/exam.ts
 * Exam session API routes — start, resume, answer, assistance, flag, finish.
 *
 * mode 'exam' grades at the end: an answer is a provisional selection the
 * learner can change until finish, and nothing reveals correctness before
 * then. 'review' and 'topic_practice' grade immediately and lock the answer.
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
  recordExamAnswer,
  updateAnswerFlag,
  upsertReviewQueue,
  clearReviewItems,
  getQuestionById,
  getDueReviewQuestions,
  getWorstTopicIds,
  drawQuestionsFromTopics,
  saveExamSelection,
  finishDeferredExamSession,
  setExamAssistance,
  getActiveDeferredExam,
  type DbExamSession,
} from "../db/queries.js";
import { nextMorningISO } from "../lib/srs.js";
import { checkAnswer } from "../lib/grading.js";
import { lessonLinkForSourceId } from "../content/lessons.js";
import { sendMessage, buildMiniAppButton } from "../lib/telegram.js";

const exam = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();
const ACTIVE_EXAM_SESSION_MS = 30 * 60 * 1000;
// The client exam timer; the server keeps the session open a little longer.
const EXAM_DURATION_SECONDS = 20 * 60;

function startedAtMs(startedAt: string): number {
  const iso = startedAt.includes("T") ? startedAt : startedAt.replace(" ", "T") + "Z";
  return Date.parse(iso);
}

function isExamSessionExpired(startedAt: string): boolean {
  const startedMs = startedAtMs(startedAt);
  return !Number.isFinite(startedMs) || Date.now() - startedMs >= ACTIVE_EXAM_SESSION_MS;
}

/** `{ "<questionId>": 0 | 1 }` from the finish request; null when malformed. */
function parseFinishAnswers(raw: unknown): Map<number, 0 | 1> | null {
  const answers = new Map<number, 0 | 1>();
  if (raw === undefined) return answers;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  for (const [key, value] of Object.entries(raw)) {
    const questionId = Number(key);
    if (!Number.isInteger(questionId) || questionId <= 0 || (value !== 0 && value !== 1)) return null;
    answers.set(questionId, value);
  }
  return answers;
}

// ── POST /api/exam/start ──────────────────────────────────────────────────────
exam.post("/start", async (c) => {
  const userId: number = c.get("userId" as never);
  const body = (await c.req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || Array.isArray(body)) {
    return c.json({ error: "Invalid exam start request" }, 400);
  }
  const requestedMode = body.mode;
  if (
    requestedMode !== undefined &&
    requestedMode !== "exam" &&
    requestedMode !== "review" &&
    requestedMode !== "topic_practice"
  ) {
    return c.json({ error: "Invalid exam mode" }, 400);
  }
  const mode: "exam" | "review" | "topic_practice" = requestedMode ?? "exam";

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
  const sessionId = await replaceActiveExamSession(
    c.env.DB,
    userId,
    mode,
    questions.map((question) => question.id)
  );

  return c.json({
    sessionId,
    mode,
    feedback: mode === "exam" ? "deferred" : "immediate",
    aiEnabled: false,
    questions: questions.map((q, i) => ({
      position: i + 1,
      questionId: q.id,
      textIt: q.text_it,
      imageUrl: q.image_url,
      topicId: q.topic_id,
      source: getQuestionSource(q, false),
    })),
  });
});

// ── GET /api/exam/active ──────────────────────────────────────────────────────
// Resume an open exam-mode session after a reload. Selections only — never
// correctness, so resuming reveals nothing the exam screen would not show.
exam.get("/active", async (c) => {
  const userId: number = c.get("userId" as never);
  const active = await getActiveDeferredExam(c.env.DB, userId);
  if (!active) return c.json({ session: null });

  const { session, questions } = active;
  const elapsedSeconds = Math.floor((Date.now() - startedAtMs(session.started_at)) / 1000);
  const selections: Record<number, number> = {};
  for (const q of questions) {
    if (q.selected_answer === 0 || q.selected_answer === 1) selections[q.question_id] = q.selected_answer;
  }

  return c.json({
    session: {
      sessionId: session.id,
      mode: "exam",
      feedback: "deferred",
      aiEnabled: session.ai_enabled === 1,
      aiAssisted: session.ai_assisted_at != null,
      secondsLeft: Math.max(0, EXAM_DURATION_SECONDS - elapsedSeconds),
      questions: questions.map((q) => ({
        position: q.position,
        questionId: q.question_id,
        textIt: q.text_it,
        imageUrl: q.image_url,
        topicId: q.topic_id,
      })),
      selections,
      flags: questions.filter((q) => q.flagged === 1).map((q) => q.question_id),
    },
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

  // Exam mode: store the provisional selection and say nothing about it.
  if (session.mode === "exam") {
    const saved = await saveExamSelection(c.env.DB, sessionId, userId, body.questionId, body.answer);
    if (saved === "not_in_session") return c.json({ error: "Question not in this session" }, 404);
    if (saved === "inactive") return c.json({ error: "Session is no longer active" }, 409);
    return c.json({ saved: true, questionId: body.questionId, answer: body.answer });
  }

  const question = await getQuestionById(c.env.DB, body.questionId);
  if (!question) return c.json({ error: "Question not found" }, 404);

  const isCorrect = checkAnswer(body.answer, question.correct_answer);
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

  // The choice is now immutable, so it is safe to reveal the result. Keeping
  // this in the persisted-answer response prevents the client from guessing
  // and lets the learner review before explicitly moving to the next question.
  return c.json({
    recorded: true,
    duplicate: recordResult === "duplicate",
    isCorrect: isCorrect === 1,
    correctAnswer: question.correct_answer,
    // Explicit, curated question → lesson-section mapping (never a topic guess).
    lessonLink: lessonLinkForSourceId(question.source_id),
    source: getQuestionSource(question),
  });
});

// ── POST /api/exam/:sessionId/assistance ─────────────────────────────────────
// Exam mode only. Every exam starts with AI help off; switching it on marks the
// session as assisted for good, which keeps it out of the pass rate.
exam.post("/:sessionId/assistance", async (c) => {
  const userId: number = c.get("userId" as never);
  const sessionId = Number(c.req.param("sessionId"));
  const body = (await c.req.json().catch(() => null)) as { enabled?: unknown } | null;
  if (!body || typeof body.enabled !== "boolean") {
    return c.json({ error: "enabled (boolean) is required" }, 400);
  }

  const session = await getSessionById(c.env.DB, sessionId);
  if (!session || session.user_id !== userId) {
    return c.json({ error: "Session not found" }, 404);
  }
  if (session.mode !== "exam") {
    return c.json({ error: "AI assistance toggle is only for exam mode" }, 400);
  }

  const state = await setExamAssistance(c.env.DB, sessionId, userId, body.enabled);
  if (!state) return c.json({ error: "Session is no longer active" }, 409);
  return c.json(state);
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
// Exam mode: `answers` carries the learner's final selections, so a selection
// whose save failed still counts. Finishing an already-finished session returns
// the same results, so a retry after a lost response is safe.
exam.post("/:sessionId/finish", async (c) => {
  const userId: number = c.get("userId" as never);
  const sessionId = Number(c.req.param("sessionId"));
  const body = ((await c.req.json().catch(() => null)) ?? {}) as {
    durationSeconds?: unknown;
    answers?: unknown;
  };

  const session = await getSessionById(c.env.DB, sessionId);
  if (!session || session.user_id !== userId) {
    return c.json({ error: "Session not found" }, 404);
  }
  if (session.finished_at) {
    return c.json(await buildExamResults(c.env.DB, session));
  }
  if (session.abandoned_at) {
    return c.json({ error: "Session was abandoned" }, 400);
  }
  if (isExamSessionExpired(session.started_at)) {
    await abandonExamSession(c.env.DB, sessionId, userId);
    return c.json({ error: "Session expired" }, 400);
  }

  const answers = session.mode === "exam" ? parseFinishAnswers(body.answers) : new Map<number, 0 | 1>();
  if (!answers) {
    return c.json({ error: "answers must map question ids to 0 or 1" }, 400);
  }

  const durationSeconds =
    typeof body.durationSeconds === "number" && Number.isFinite(body.durationSeconds)
      ? Math.max(0, Math.floor(body.durationSeconds))
      : 0;

  // The score and terminal transition happen in one conditional SQL statement
  // (one transaction in exam mode, together with the final selections).
  // Whichever request wins (finish or abandon) prevents the other from mutating
  // the session, and answers cannot change after this transition commits.
  const finished =
    session.mode === "exam"
      ? await finishDeferredExamSession(c.env.DB, sessionId, userId, durationSeconds, answers)
      : await finishExamSession(c.env.DB, sessionId, userId, durationSeconds);
  if (!finished) {
    return c.json({ error: "Session is no longer active" }, 409);
  }

  const [answerRows, finishedSession] = await Promise.all([
    getSessionAnswers(c.env.DB, sessionId),
    getSessionById(c.env.DB, sessionId),
  ]);

  // Wrong questions come back tomorrow; questions the user finally got right
  // leave the queue so it stops replaying the same mistakes forever.
  const wrongQuestionIds = answerRows.filter((a) => a.is_correct !== 1).map((a) => a.question_id);
  const correctQuestionIds = answerRows.filter((a) => a.is_correct === 1).map((a) => a.question_id);
  const nextReview = nextMorningISO();
  for (const qId of wrongQuestionIds) {
    await upsertReviewQueue(c.env.DB, userId, qId, nextReview);
  }
  await clearReviewItems(c.env.DB, userId, correctQuestionIds);

  return c.json(await buildExamResults(c.env.DB, finishedSession ?? session));
});

/** Results payload for a finished session, with correct answers revealed. */
async function buildExamResults(db: D1Database, session: DbExamSession) {
  const answers = await getSessionAnswers(db, session.id);
  const questionsData: Record<
    number,
    { text_it: string; correct_answer: number; image_url: string | null; source_id: string | null }
  > = {};
  for (const a of answers) {
    const q = await getQuestionById(db, a.question_id);
    if (q) {
      questionsData[a.question_id] = {
        text_it: q.text_it,
        correct_answer: q.correct_answer,
        image_url: q.image_url,
        source_id: q.source_id,
      };
    }
  }

  return {
    sessionId: session.id,
    score: session.score ?? 0,
    wrongCount: session.wrong_count ?? answers.length,
    passed: session.passed === 1,
    durationSeconds: session.duration_seconds ?? 0,
    aiAssisted: session.ai_assisted_at != null,
    answers: answers.map((a) => ({
      position: a.position,
      questionId: a.question_id,
      textIt: questionsData[a.question_id]?.text_it ?? "",
      imageUrl: questionsData[a.question_id]?.image_url ?? null,
      correctAnswer: questionsData[a.question_id]?.correct_answer ?? 1,
      userAnswer: a.user_answer,
      isCorrect: a.is_correct === 1,
      flagged: a.flagged === 1,
      lessonLink: lessonLinkForSourceId(questionsData[a.question_id]?.source_id),
      source: questionsData[a.question_id] ? getQuestionSource(questionsData[a.question_id]) : null,
    })),
  };
}

export { exam };
