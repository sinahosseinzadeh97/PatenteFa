/**
 * src/lib/srs.ts
 * Lightweight Spaced Repetition System for the vocabulary trainer.
 * Simple: double interval on correct recall, reset to 1 day on miss.
 */

/**
 * Calculate the next review date for a vocab item.
 * @param currentIntervalDays — current interval (default 1)
 * @param wasCorrect — whether the user recalled the word correctly
 * @returns { intervalDays, nextReviewAt }
 */
export function nextReview(
  currentIntervalDays: number,
  wasCorrect: boolean
): { intervalDays: number; nextReviewAt: string } {
  const intervalDays = wasCorrect
    ? Math.min(currentIntervalDays * 2, 90) // cap at 90 days
    : 1;

  const next = new Date();
  next.setDate(next.getDate() + intervalDays);
  const nextReviewAt = next.toISOString().slice(0, 10); // YYYY-MM-DD

  return { intervalDays, nextReviewAt };
}

/**
 * Calculate the next_review_at for a question in the review queue.
 * Always next morning (current day + 1, at midnight so it shows up all day tomorrow).
 */
export function nextMorningISO(): string {
  const next = new Date();
  next.setDate(next.getDate() + 1);
  return next.toISOString().slice(0, 10);
}
