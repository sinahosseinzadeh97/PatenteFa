/**
 * src/api/learn.ts
 * Structured learning path — mounted at /api/learn behind the shared
 * initData + approval middleware in src/index.ts. Every handler reads the
 * learner from c.get("userId"); nothing here accepts a user id from the client.
 *
 *   GET  /api/learn                          every chapter's route + today's path
 *   GET  /api/learn/lessons/:lessonId        lesson content + this user's progress
 *   POST /api/learn/lessons/:lessonId/progress   { step }            (monotonic)
 *   POST /api/learn/lessons/:lessonId/answer     { questionId, answer } (first answer wins)
 *   POST /api/learn/lessons/:lessonId/order      { step, sequence }  ("Who goes first?", stateless)
 *   POST /api/learn/lessons/:lessonId/complete                         (idempotent)
 *   POST /api/learn/practice                 { lessonId? } → practice session
 */

import { Hono } from "hono";
import type { AppEnv, AppVariables } from "../types.js";
import {
  CHAPTERS,
  chapterOfLesson,
  findLesson,
  lessonStepCount,
  type Chapter,
  type Lesson,
} from "../content/lessons.js";
import {
  completeLesson,
  getDueReviewSourceIds,
  getLessonAnswerRows,
  getLessonProgressRows,
  getPracticeCandidates,
  getQuestionsBySourceIds,
  getSavedTerms,
  recordLessonAnswer,
  saveLessonStep,
} from "../db/learning-queries.js";
import { getQuestionById, replaceActiveExamSession } from "../db/queries.js";
import {
  PRACTICE_SET_SIZE,
  buildTodayPath,
  checkPassageOrder,
  orderPracticeCandidates,
  practiceSourceIds,
  resolvePracticeQuestions,
  summarizeLessons,
} from "../lib/learning.js";
import { nextMorningISO } from "../lib/srs.js";

const learn = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

/** The next lesson in this chapter, or the first lesson of the next chapter. */
function nextLessonAfter(
  lesson: Lesson
): { lessonId: string; titleFa: string; chapterTitleFa: string | null } | null {
  const lessons = CHAPTERS.flatMap((chapter) => chapter.lessons.map((l) => ({ chapter, lesson: l })));
  const index = lessons.findIndex((entry) => entry.lesson.id === lesson.id);
  const next = lessons[index + 1];
  if (!next) return null;
  const sameChapter = next.chapter.lessons.some((l) => l.id === lesson.id);
  return {
    lessonId: next.lesson.id,
    titleFa: next.lesson.titleFa,
    chapterTitleFa: sameChapter ? null : next.chapter.titleFa,
  };
}

/** Both the lesson and its chapter; every lesson id belongs to exactly one chapter. */
function lessonFromParam(lessonId: string): { lesson: Lesson; chapter: Chapter } | null {
  const lesson = findLesson(lessonId);
  const chapter = lesson && chapterOfLesson(lesson.id);
  return lesson && chapter ? { lesson, chapter } : null;
}

async function resolvedPractice(db: D1Database, lesson: Lesson) {
  const rows = await getQuestionsBySourceIds(db, lesson.practice.map((q) => q.sourceId));
  const resolved = resolvePracticeQuestions(lesson, rows);
  if (resolved.excluded.length > 0) {
    // A bank row drifted from the reviewed snapshot. Excluding it keeps the
    // lesson honest; the log line is the flag for a human review.
    console.warn(`[learn] lesson=${lesson.id} excluded practice sourceIds=${resolved.excluded.join(",")}`);
  }
  return resolved;
}

// ── GET /api/learn ────────────────────────────────────────────────────────────
learn.get("/", async (c) => {
  const userId = c.get("userId");
  const [progress, answers, dueSourceIds] = await Promise.all([
    getLessonProgressRows(c.env.DB, userId),
    getLessonAnswerRows(c.env.DB, userId),
    getDueReviewSourceIds(c.env.DB, userId),
  ]);
  // Every bank question carries a source_id, so this is the full due count.
  const reviewDue = dueSourceIds.length;
  const chapters = CHAPTERS.map((chapter) => ({
    id: chapter.id,
    topicId: chapter.topicId,
    nameIt: chapter.nameIt,
    titleFa: chapter.titleFa,
    summaryFa: chapter.summaryFa,
    lessons: summarizeLessons(chapter, progress, answers, dueSourceIds),
  }));

  return c.json({
    chapters,
    today: buildTodayPath(chapters.flatMap((chapter) => chapter.lessons), reviewDue),
    reviewDue,
  });
});

// ── GET /api/learn/lessons/:lessonId ──────────────────────────────────────────
learn.get("/lessons/:lessonId", async (c) => {
  const userId = c.get("userId");
  const found = lessonFromParam(c.req.param("lessonId"));
  if (!found) return c.json({ error: "درس پیدا نشد." }, 404);
  const { lesson, chapter } = found;

  const termList = lesson.steps.flatMap((step) => (step.kind === "terms" ? step.terms.map((t) => t.it) : []));
  const [practice, progressRows, answerRows, savedTerms] = await Promise.all([
    resolvedPractice(c.env.DB, lesson),
    getLessonProgressRows(c.env.DB, userId),
    getLessonAnswerRows(c.env.DB, userId, lesson.id),
    getSavedTerms(c.env.DB, userId, termList),
  ]);
  const progress = progressRows.find((row) => row.lesson_id === lesson.id);

  return c.json({
    chapter: {
      id: chapter.id,
      titleFa: chapter.titleFa,
      nameIt: chapter.nameIt,
      reviewedOn: chapter.reviewedOn,
      sources: chapter.sources,
    },
    position: {
      index: chapter.lessons.findIndex((l) => l.id === lesson.id) + 1,
      total: chapter.lessons.length,
    },
    lesson: {
      id: lesson.id,
      titleFa: lesson.titleFa,
      titleIt: lesson.titleIt,
      minutes: lesson.minutes,
      signs: lesson.signs,
      steps: lesson.steps,
      stepCount: lesson.steps.length + practice.questions.length + 1,
      practice: practice.questions.map(({ content, row }) => ({
        questionId: row.id,
        sourceId: content.sourceId,
        textIt: row.text_it,
        imageUrl: row.image_url,
        isFigure: content.figure !== undefined,
        correctAnswer: row.correct_answer,
        chunks: content.chunks,
        translation: content.translation,
        why: content.why,
        rule: content.rule,
        conceptStep: content.conceptStep,
      })),
    },
    progress: {
      state: progress?.completed_at ? "completed" : progress ? "in_progress" : "not_started",
      step: progress?.step ?? 0,
      completedAt: progress?.completed_at ?? null,
    },
    answers: Object.fromEntries(
      answerRows.map((row) => [row.question_id, { userAnswer: row.user_answer, isCorrect: row.is_correct === 1 }])
    ),
    savedTerms,
    next: nextLessonAfter(lesson),
  });
});

// ── POST /api/learn/lessons/:lessonId/progress ───────────────────────────────
learn.post("/lessons/:lessonId/progress", async (c) => {
  const userId = c.get("userId");
  const lesson = findLesson(c.req.param("lessonId"));
  if (!lesson) return c.json({ error: "درس پیدا نشد." }, 404);

  const body = (await c.req.json().catch(() => null)) as { step?: unknown } | null;
  const step = body?.step;
  if (typeof step !== "number" || !Number.isInteger(step) || step < 0 || step >= lessonStepCount(lesson)) {
    return c.json({ error: "Invalid step" }, 400);
  }

  const row = await saveLessonStep(c.env.DB, userId, lesson.id, step);
  return c.json({ step: row.step, completedAt: row.completed_at });
});

// ── POST /api/learn/lessons/:lessonId/answer ─────────────────────────────────
learn.post("/lessons/:lessonId/answer", async (c) => {
  const userId = c.get("userId");
  const lesson = findLesson(c.req.param("lessonId"));
  if (!lesson) return c.json({ error: "درس پیدا نشد." }, 404);

  const body = (await c.req.json().catch(() => null)) as { questionId?: unknown; answer?: unknown } | null;
  const questionId = body?.questionId;
  const answer = body?.answer;
  if (typeof questionId !== "number" || !Number.isInteger(questionId) || questionId <= 0 || (answer !== 0 && answer !== 1)) {
    return c.json({ error: "questionId and a binary answer (0 or 1) are required" }, 400);
  }

  const row = await getQuestionById(c.env.DB, questionId);
  const valid = row ? resolvePracticeQuestions(lesson, [row]).questions.find((q) => q.row.id === questionId) : undefined;
  if (!row || !valid) return c.json({ error: "این سؤال جزو تمرین این درس نیست." }, 404);

  const isCorrect: 0 | 1 = answer === row.correct_answer ? 1 : 0;
  const stored = await recordLessonAnswer(c.env.DB, {
    userId,
    lessonId: lesson.id,
    questionId,
    answer,
    isCorrect,
    nextReviewAt: nextMorningISO(),
  });

  // The stored (first) answer is the truth; a retry or a racing second tap
  // gets the original result back instead of a new one.
  return c.json({
    recorded: stored.recorded,
    duplicate: !stored.recorded,
    userAnswer: stored.userAnswer,
    isCorrect: stored.isCorrect,
    correctAnswer: row.correct_answer,
    queuedForReview: stored.queuedForReview,
  });
});

// ── POST /api/learn/lessons/:lessonId/order ──────────────────────────────────
// "Who goes first?" — the verdict is computed here, from the verified phases in
// src/content/crossings.ts, so the decision is deterministic and tested. It is
// a self-check, not a graded answer, so nothing is stored.
// ponytail: attempts are not persisted; add a table if first-try stats are wanted.
learn.post("/lessons/:lessonId/order", async (c) => {
  const lesson = findLesson(c.req.param("lessonId"));
  if (!lesson) return c.json({ error: "درس پیدا نشد." }, 404);

  const body = (await c.req.json().catch(() => null)) as { step?: unknown; sequence?: unknown } | null;
  const step = typeof body?.step === "number" && Number.isInteger(body.step) ? lesson.steps[body.step] : undefined;
  if (!step || step.kind !== "order") return c.json({ error: "Invalid step" }, 400);

  const sequence = body?.sequence;
  const result =
    Array.isArray(sequence) && sequence.length <= 10 && sequence.every((id) => typeof id === "string")
      ? checkPassageOrder(step.crossing.phases, sequence as string[])
      : null;
  if (!result) return c.json({ error: "sequence must list every vehicle exactly once" }, 400);

  return c.json({ ...result, phases: step.crossing.phases });
});

// ── POST /api/learn/lessons/:lessonId/complete ───────────────────────────────
learn.post("/lessons/:lessonId/complete", async (c) => {
  const userId = c.get("userId");
  const lesson = findLesson(c.req.param("lessonId"));
  if (!lesson) return c.json({ error: "درس پیدا نشد." }, 404);

  const [practice, answers] = await Promise.all([
    resolvedPractice(c.env.DB, lesson),
    getLessonAnswerRows(c.env.DB, userId, lesson.id),
  ]);
  const answered = new Set(answers.map((a) => a.question_id));
  const missing = practice.questions.filter(({ row }) => !answered.has(row.id)).map(({ row }) => row.id);
  if (missing.length > 0) {
    return c.json({ error: "اول به همه‌ی سؤال‌های تمرین جواب بده.", missing }, 409);
  }

  const stepCount = lesson.steps.length + practice.questions.length + 1;
  const row = await completeLesson(c.env.DB, userId, lesson.id, stepCount - 1);
  const practiceIds = new Set(practice.questions.map(({ row: q }) => q.id));
  const practiceAnswers = answers.filter((a) => practiceIds.has(a.question_id));

  return c.json({
    completedAt: row.completed_at,
    practice: {
      total: practice.questions.length,
      correct: practiceAnswers.filter((a) => a.is_correct === 1).length,
      queuedForReview: practiceAnswers.filter((a) => a.is_correct !== 1).length,
    },
    next: nextLessonAfter(lesson),
  });
});

// ── POST /api/learn/practice ─────────────────────────────────────────────────
// Real bank questions mapped to the lesson(s), run in the normal exam runner
// as a topic_practice session so answers, review and results reuse one path.
learn.post("/practice", async (c) => {
  const userId = c.get("userId");
  const body = (await c.req.json().catch(() => ({}))) as { lessonId?: unknown };

  let lessonIds: string[];
  if (body.lessonId !== undefined) {
    const lesson = typeof body.lessonId === "string" ? findLesson(body.lessonId) : null;
    if (!lesson) return c.json({ error: "درس پیدا نشد." }, 404);
    lessonIds = [lesson.id];
  } else {
    const progress = await getLessonProgressRows(c.env.DB, userId);
    lessonIds = progress.filter((row) => row.completed_at).map((row) => row.lesson_id);
    if (lessonIds.length === 0) {
      return c.json({ error: "اول یک درس را تمام کن تا تمرین مرتبطش باز شود." }, 409);
    }
  }

  const candidates = await getPracticeCandidates(c.env.DB, userId, practiceSourceIds(CHAPTERS, lessonIds));
  const questions = orderPracticeCandidates(candidates, PRACTICE_SET_SIZE);
  if (questions.length === 0) return c.json({ error: "سؤالی برای تمرین پیدا نشد." }, 404);

  const sessionId = await replaceActiveExamSession(
    c.env.DB,
    userId,
    "topic_practice",
    questions.map((q) => q.id)
  );

  return c.json({
    sessionId,
    mode: "topic_practice",
    lessonIds,
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

export { learn };
