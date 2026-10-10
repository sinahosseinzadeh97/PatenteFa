/**
 * src/lib/learning.ts
 * Pure rules for the learning path: lesson state, snapshot integrity,
 * practice ordering, "today's path", and the "Who goes first?" order check. No I/O — src/api/learn.ts feeds it
 * rows from D1, and tests/learning-path.test.ts exercises it directly.
 */

import {
  lessonStepCount,
  relatedSourceIds,
  type Chapter,
  type Lesson,
  type PracticeQuestion,
} from "../content/lessons.js";
import type { DbQuestion } from "../db/queries.js";
import type {
  LessonAnswerRow,
  LessonProgressRow,
  PracticeCandidate,
} from "../db/learning-queries.js";

export type LessonState = "not_started" | "in_progress" | "completed";

export interface LessonSummary {
  id: string;
  chapterId: string;
  titleFa: string;
  titleIt: string;
  minutes: number;
  signs: number[];
  state: LessonState;
  step: number;
  stepCount: number;
  practice: { answered: number; correct: number; total: number };
  /** Review items due today whose question this lesson teaches. */
  dueReview: number;
  /** Last time this learner's progress here changed (null = never opened). */
  updatedAt: string | null;
}

export function summarizeLessons(
  chapter: Chapter,
  progress: LessonProgressRow[],
  answers: LessonAnswerRow[],
  dueSourceIds: string[]
): LessonSummary[] {
  const due = new Set(dueSourceIds);
  return chapter.lessons.map((lesson) => {
    const row = progress.find((p) => p.lesson_id === lesson.id);
    const lessonAnswers = answers.filter((a) => a.lesson_id === lesson.id);
    const state: LessonState = row?.completed_at
      ? "completed"
      : row
        ? "in_progress"
        : "not_started";
    return {
      id: lesson.id,
      chapterId: chapter.id,
      titleFa: lesson.titleFa,
      titleIt: lesson.titleIt,
      minutes: lesson.minutes,
      signs: lesson.signs,
      state,
      step: row?.step ?? 0,
      stepCount: lessonStepCount(lesson),
      practice: {
        answered: lessonAnswers.length,
        correct: lessonAnswers.filter((a) => a.is_correct === 1).length,
        total: lesson.practice.length,
      },
      dueReview: relatedSourceIds(lesson).filter((id) => due.has(id)).length,
      updatedAt: row?.updated_at ?? null,
    };
  });
}

/**
 * Pair each curated practice question with its live bank row. A question is
 * dropped (and reported) when the row is missing or its text/answer no longer
 * matches the snapshot the feedback was written against — the lesson must never
 * show feedback that disagrees with the bank's answer key.
 */
export function resolvePracticeQuestions(
  lesson: Lesson,
  rows: DbQuestion[]
): { questions: { content: PracticeQuestion; row: DbQuestion }[]; excluded: string[] } {
  const bySource = new Map(rows.map((row) => [row.source_id, row]));
  const questions: { content: PracticeQuestion; row: DbQuestion }[] = [];
  const excluded: string[] = [];
  for (const content of lesson.practice) {
    const row = bySource.get(content.sourceId);
    if (
      row &&
      row.text_it.trim() === content.textIt.trim() &&
      row.correct_answer === content.answer
    ) {
      questions.push({ content, row });
    } else {
      excluded.push(content.sourceId);
    }
  }
  return { questions, excluded };
}

/**
 * Order practice candidates: due review first, then questions never seen,
 * then ones only met inside a lesson, then the longest-unseen.
 * `random` is injectable so the order is testable.
 */
export function orderPracticeCandidates(
  candidates: PracticeCandidate[],
  count: number,
  random: () => number = Math.random
): PracticeCandidate[] {
  const rank = (c: PracticeCandidate) =>
    c.is_due ? 0 : !c.last_seen_at && !c.seen_in_lesson ? 1 : !c.last_seen_at ? 2 : 3;
  return candidates
    .map((candidate) => ({ candidate, tie: random() }))
    .sort((a, b) => {
      const byRank = rank(a.candidate) - rank(b.candidate);
      if (byRank !== 0) return byRank;
      const seenA = a.candidate.last_seen_at ?? "";
      const seenB = b.candidate.last_seen_at ?? "";
      if (seenA !== seenB) return seenA < seenB ? -1 : 1;
      return a.tie - b.tie;
    })
    .slice(0, count)
    .map(({ candidate }) => candidate);
}

export type TodayItem =
  | { kind: "lesson"; mode: "start" | "continue"; lessonId: string; titleFa: string; step: number; stepCount: number; minutes: number }
  | { kind: "review"; count: number; minutes: number }
  | { kind: "practice"; lessonIds: string[]; count: number; minutes: number };

export const PRACTICE_SET_SIZE = 10;
/** ~30 seconds per true/false statement, including reading the feedback. */
const MINUTES_PER_QUESTION = 0.5;
const MAX_TODAY_ITEMS = 3;

function questionMinutes(count: number): number {
  return Math.max(1, Math.ceil(count * MINUTES_PER_QUESTION));
}

function remainingMinutes(lesson: LessonSummary): number {
  const remaining = Math.max(0, lesson.stepCount - lesson.step) / lesson.stepCount;
  return Math.max(1, Math.round(lesson.minutes * remaining));
}

/**
 * Today's path, from real progress only — no AI call, no guessed weakness.
 *   1. unfinished lesson (the most recently touched one)
 *   2. review items due today (the existing review queue)
 *   3. the next lesson, if none is in progress: continue the chapter the
 *      learner worked in last, otherwise follow chapter order
 *   4. related practice for lessons already completed
 * Capped at three items so the day stays manageable. `lessons` is every
 * chapter's summaries, in chapter order.
 */
export function buildTodayPath(
  lessons: LessonSummary[],
  reviewDue: number
): { items: TodayItem[]; minutes: number } {
  const items: TodayItem[] = [];
  const mostRecentFirst = (a: LessonSummary, b: LessonSummary) =>
    (b.updatedAt ?? "").localeCompare(a.updatedAt ?? "");
  const inProgress = lessons.filter((l) => l.state === "in_progress").sort(mostRecentFirst)[0];
  const lastChapter = lessons.filter((l) => l.updatedAt).sort(mostRecentFirst)[0]?.chapterId;
  const nextLesson =
    lessons.find((l) => l.state === "not_started" && l.chapterId === lastChapter) ??
    lessons.find((l) => l.state === "not_started");
  const completed = lessons.filter((l) => l.state === "completed");

  const lessonItem = (lesson: LessonSummary, mode: "start" | "continue"): TodayItem => ({
    kind: "lesson",
    mode,
    lessonId: lesson.id,
    titleFa: lesson.titleFa,
    step: lesson.step,
    stepCount: lesson.stepCount,
    minutes: mode === "continue" ? remainingMinutes(lesson) : lesson.minutes,
  });

  if (inProgress) items.push(lessonItem(inProgress, "continue"));
  if (reviewDue > 0) {
    const count = Math.min(reviewDue, 30);
    items.push({ kind: "review", count, minutes: questionMinutes(count) });
  }
  if (!inProgress && nextLesson) items.push(lessonItem(nextLesson, "start"));
  if (completed.length > 0) {
    items.push({
      kind: "practice",
      lessonIds: completed.map((l) => l.id),
      count: PRACTICE_SET_SIZE,
      minutes: questionMinutes(PRACTICE_SET_SIZE),
    });
  }

  const today = items.slice(0, MAX_TODAY_ITEMS);
  return { items: today, minutes: today.reduce((sum, item) => sum + item.minutes, 0) };
}

/** Practice set sources for the given completed lessons (or one lesson). */
export function practiceSourceIds(chapters: Chapter[], lessonIds: string[]): string[] {
  const ids = new Set<string>();
  for (const chapter of chapters) {
    for (const lesson of chapter.lessons) {
      if (lessonIds.includes(lesson.id)) relatedSourceIds(lesson).forEach((id) => ids.add(id));
    }
  }
  return [...ids];
}

export interface OrderCheck {
  valid: boolean;
  /** The first vehicle picked before its turn, and the ones it had to wait for. */
  mistake: { vehicle: string; waitsFor: string[] } | null;
}

/**
 * "Who goes first?": is the learner's sequence a valid passage order?
 * Vehicles in one phase move together, so any order among them is accepted.
 * Returns null when `sequence` is not exactly one pick per vehicle.
 */
export function checkPassageOrder(phases: string[][], sequence: string[]): OrderCheck | null {
  const phaseOf = new Map(phases.flatMap((group, index) => group.map((id) => [id, index] as const)));
  if (
    sequence.length !== phaseOf.size ||
    new Set(sequence).size !== sequence.length ||
    sequence.some((id) => !phaseOf.has(id))
  ) {
    return null;
  }
  for (const [index, vehicle] of sequence.entries()) {
    const phase = phaseOf.get(vehicle) ?? 0;
    const waitsFor = sequence.slice(index + 1).filter((id) => (phaseOf.get(id) ?? 0) < phase);
    if (waitsFor.length > 0) return { valid: false, mistake: { vehicle, waitsFor } };
  }
  return { valid: true, mistake: null };
}
