/**
 * src/api/readiness.ts
 * GET /api/readiness — the readiness light (features.md §52).
 */

import { Hono } from "hono";
import type { AppEnv, AppVariables } from "../types.js";
import { getUnassistedSimulations, getWrongSourceIds } from "../db/queries.js";
import { chapterOfLesson, lessonLinkForSourceId } from "../content/lessons.js";
import { computeReadiness, displayPercent, READINESS_WINDOW } from "../lib/readiness.js";

const readiness = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

interface WeakestChapter {
  number: number;
  titleFa: string;
  wrong: number;
  reviewLessonId: string | null;
}

/** The chapter with the most wrong answers (ties: the lower chapter number). */
function weakestChapter(wrongSourceIds: string[]): WeakestChapter | null {
  const counts = new Map<string, { chapter: NonNullable<ReturnType<typeof chapterOfLesson>>; wrong: number }>();
  for (const sourceId of wrongSourceIds) {
    const link = lessonLinkForSourceId(sourceId);
    const chapter = link ? chapterOfLesson(link.lessonId) : null;
    if (!chapter) continue;
    const entry = counts.get(chapter.id) ?? { chapter, wrong: 0 };
    counts.set(chapter.id, { chapter, wrong: entry.wrong + 1 });
  }
  const [best] = [...counts.values()].sort((a, b) => b.wrong - a.wrong || a.chapter.numbers[0] - b.chapter.numbers[0]);
  if (!best) return null;
  return {
    number: best.chapter.numbers[0],
    titleFa: best.chapter.titleFa,
    wrong: best.wrong,
    reviewLessonId: best.chapter.lessons.find((lesson) => lesson.review)?.id ?? null,
  };
}

readiness.get("/", async (c) => {
  const userId: number = c.get("userId" as never);
  // One extra row gives the state before the newest simulation, for the results screen.
  const rows = await getUnassistedSimulations(c.env.DB, userId, READINESS_WINDOW + 1);
  const toResult = (row: { wrong_count: number }) => ({ wrongCount: row.wrong_count });
  const current = computeReadiness(rows.slice(0, READINESS_WINDOW).map(toResult));
  const previous = computeReadiness(rows.slice(1, READINESS_WINDOW + 1).map(toResult));

  const needsHint = current.state === "red" || current.state === "amber";
  const windowIds = rows.slice(0, READINESS_WINDOW).map((row) => row.id);
  const weakest = needsHint ? weakestChapter(await getWrongSourceIds(c.env.DB, windowIds)) : null;

  return c.json({
    ...current,
    previousState: previous.state,
    display: current.probability === null ? null : displayPercent(current.probability),
    weakestChapter: weakest,
  });
});

export { readiness };
