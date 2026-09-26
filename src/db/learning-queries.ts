/**
 * src/db/learning-queries.ts
 * D1 helpers for the learning path (lesson_progress, lesson_answers).
 * Every function takes the authenticated userId and filters by it — no query
 * here can read or write another user's learning record.
 */

import { todayLocalISO } from "../lib/srs.js";
import type { DbQuestion } from "./queries.js";

export interface LessonProgressRow {
  lesson_id: string;
  step: number;
  started_at: string;
  updated_at: string;
  completed_at: string | null;
}

export interface LessonAnswerRow {
  lesson_id: string;
  question_id: number;
  user_answer: number;
  is_correct: number;
}

/** D1 accepts at most 100 bound parameters per statement. */
const MAX_IN_PARAMS = 90;

function chunks<T>(items: T[], size = MAX_IN_PARAMS): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

export async function getLessonProgressRows(
  db: D1Database,
  userId: number
): Promise<LessonProgressRow[]> {
  const result = await db
    .prepare(
      `SELECT lesson_id, step, started_at, updated_at, completed_at
       FROM lesson_progress WHERE user_id = ?`
    )
    .bind(userId)
    .all<LessonProgressRow>();
  return result.results;
}

export async function getLessonAnswerRows(
  db: D1Database,
  userId: number,
  lessonId?: string
): Promise<LessonAnswerRow[]> {
  const statement = lessonId
    ? db
        .prepare(
          `SELECT lesson_id, question_id, user_answer, is_correct
           FROM lesson_answers WHERE user_id = ? AND lesson_id = ?`
        )
        .bind(userId, lessonId)
    : db
        .prepare(
          `SELECT lesson_id, question_id, user_answer, is_correct
           FROM lesson_answers WHERE user_id = ?`
        )
        .bind(userId);
  const result = await statement.all<LessonAnswerRow>();
  return result.results;
}

/**
 * Record the furthest step reached. MAX() keeps resume monotonic: a delayed
 * retry of an older save can never move the learner backwards.
 */
export async function saveLessonStep(
  db: D1Database,
  userId: number,
  lessonId: string,
  step: number
): Promise<LessonProgressRow> {
  const row = await db
    .prepare(
      `INSERT INTO lesson_progress (user_id, lesson_id, step)
       VALUES (?, ?, ?)
       ON CONFLICT(user_id, lesson_id) DO UPDATE SET
         step = MAX(lesson_progress.step, excluded.step),
         updated_at = datetime('now')
       RETURNING lesson_id, step, started_at, updated_at, completed_at`
    )
    .bind(userId, lessonId, step)
    .first<LessonProgressRow>();
  if (!row) throw new Error("Failed to save lesson progress");
  return row;
}

/** Idempotent: the first completion time is kept on every repeat. */
export async function completeLesson(
  db: D1Database,
  userId: number,
  lessonId: string,
  finalStep: number
): Promise<LessonProgressRow> {
  const row = await db
    .prepare(
      `INSERT INTO lesson_progress (user_id, lesson_id, step, completed_at)
       VALUES (?, ?, ?, datetime('now'))
       ON CONFLICT(user_id, lesson_id) DO UPDATE SET
         step = MAX(lesson_progress.step, excluded.step),
         completed_at = COALESCE(lesson_progress.completed_at, excluded.completed_at),
         updated_at = datetime('now')
       RETURNING lesson_id, step, started_at, updated_at, completed_at`
    )
    .bind(userId, lessonId, finalStep)
    .first<LessonProgressRow>();
  if (!row) throw new Error("Failed to complete lesson");
  return row;
}

export interface RecordedLessonAnswer {
  /** false when an earlier request already stored an answer (retry or double tap). */
  recorded: boolean;
  userAnswer: number;
  isCorrect: boolean;
  queuedForReview: boolean;
}

/**
 * Store the first answer to a lesson practice question and, if it is wrong,
 * queue the question for tomorrow's review — exactly once.
 *
 * All four statements run in one D1 batch (a single transaction, executed
 * serially), so a retried request after a lost response, or two taps racing,
 * cannot double-count the mistake: the review insert only fires while
 * review_queued = 0, and the next statement flips it.
 */
export async function recordLessonAnswer(
  db: D1Database,
  input: {
    userId: number;
    lessonId: string;
    questionId: number;
    answer: 0 | 1;
    isCorrect: 0 | 1;
    nextReviewAt: string;
  }
): Promise<RecordedLessonAnswer> {
  const { userId, lessonId, questionId, answer, isCorrect, nextReviewAt } = input;
  const key = [userId, lessonId, questionId] as const;

  const results = await db.batch([
    db
      .prepare(
        `INSERT INTO lesson_answers (user_id, lesson_id, question_id, user_answer, is_correct)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(user_id, lesson_id, question_id) DO NOTHING`
      )
      .bind(...key, answer, isCorrect),
    db
      .prepare(
        `INSERT INTO review_queue (user_id, question_id, wrong_count, last_wrong_at, next_review_at, cleared)
         SELECT la.user_id, la.question_id, 1, datetime('now'), ?, 0
         FROM lesson_answers la
         WHERE la.user_id = ? AND la.lesson_id = ? AND la.question_id = ?
           AND la.is_correct = 0 AND la.review_queued = 0
         ON CONFLICT(user_id, question_id) DO UPDATE SET
           wrong_count = wrong_count + 1,
           last_wrong_at = datetime('now'),
           next_review_at = excluded.next_review_at,
           cleared = 0`
      )
      .bind(nextReviewAt, ...key),
    db
      .prepare(
        `UPDATE lesson_answers SET review_queued = 1
         WHERE user_id = ? AND lesson_id = ? AND question_id = ?
           AND is_correct = 0 AND review_queued = 0`
      )
      .bind(...key),
    db
      .prepare(
        `SELECT user_answer, is_correct, review_queued
         FROM lesson_answers WHERE user_id = ? AND lesson_id = ? AND question_id = ?`
      )
      .bind(...key),
  ]);

  const stored = results[3]?.results[0] as
    | { user_answer: number; is_correct: number; review_queued: number }
    | undefined;
  if (!stored) throw new Error("Failed to record lesson answer");
  return {
    recorded: results[0]?.meta.changes === 1,
    userAnswer: stored.user_answer,
    isCorrect: stored.is_correct === 1,
    queuedForReview: stored.review_queued === 1,
  };
}

export async function getQuestionsBySourceIds(
  db: D1Database,
  sourceIds: string[]
): Promise<DbQuestion[]> {
  const rows: DbQuestion[] = [];
  for (const part of chunks(sourceIds)) {
    const result = await db
      .prepare(
        `SELECT * FROM questions WHERE source_id IN (${part.map(() => "?").join(",")})`
      )
      .bind(...part)
      .all<DbQuestion>();
    rows.push(...result.results);
  }
  return rows;
}

/** source_id of every review item due today for this user. */
export async function getDueReviewSourceIds(
  db: D1Database,
  userId: number
): Promise<string[]> {
  const result = await db
    .prepare(
      `SELECT q.source_id AS source_id
       FROM review_queue rq JOIN questions q ON q.id = rq.question_id
       WHERE rq.user_id = ? AND rq.cleared = 0
         AND (rq.next_review_at IS NULL OR rq.next_review_at <= ?)`
    )
    .bind(userId, todayLocalISO())
    .all<{ source_id: string | null }>();
  return result.results.flatMap((row) => (row.source_id ? [row.source_id] : []));
}

export interface PracticeCandidate extends DbQuestion {
  last_seen_at: string | null;
  is_due: number;
  seen_in_lesson: number;
}

/** Candidate questions with this user's history, for drawing a practice set. */
export async function getPracticeCandidates(
  db: D1Database,
  userId: number,
  sourceIds: string[]
): Promise<PracticeCandidate[]> {
  const rows: PracticeCandidate[] = [];
  const today = todayLocalISO();
  for (const part of chunks(sourceIds)) {
    const result = await db
      .prepare(
        `SELECT q.*,
           (SELECT MAX(ea.answered_at) FROM exam_answers ea
              JOIN exam_sessions es ON es.id = ea.session_id
             WHERE es.user_id = ? AND ea.question_id = q.id AND ea.user_answer IS NOT NULL
           ) AS last_seen_at,
           EXISTS (SELECT 1 FROM review_queue rq
                    WHERE rq.user_id = ? AND rq.question_id = q.id AND rq.cleared = 0
                      AND (rq.next_review_at IS NULL OR rq.next_review_at <= ?)
           ) AS is_due,
           EXISTS (SELECT 1 FROM lesson_answers la
                    WHERE la.user_id = ? AND la.question_id = q.id
           ) AS seen_in_lesson
         FROM questions q
         WHERE q.source_id IN (${part.map(() => "?").join(",")})`
      )
      .bind(userId, userId, today, userId, ...part)
      .all<PracticeCandidate>();
    rows.push(...result.results);
  }
  return rows;
}

/** Terms from `terms` this user already has in their vocabulary list. */
export async function getSavedTerms(
  db: D1Database,
  userId: number,
  terms: string[]
): Promise<string[]> {
  if (terms.length === 0) return [];
  const result = await db
    .prepare(
      `SELECT DISTINCT term_it FROM vocab_items
       WHERE user_id = ? AND term_it IN (${terms.map(() => "?").join(",")})`
    )
    .bind(userId, ...terms)
    .all<{ term_it: string }>();
  return result.results.map((row) => row.term_it);
}
