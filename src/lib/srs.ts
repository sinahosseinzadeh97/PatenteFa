/**
 * src/lib/srs.ts
 * Lightweight Spaced Repetition System for the vocabulary trainer.
 * Simple: double interval on correct recall, reset to 1 day on miss.
 */

/** Users sit the exam in Italy — all "day" boundaries are Rome-local, not UTC. */
const TZ = "Europe/Rome";

/** Today's calendar date in Rome as YYYY-MM-DD ("en-CA" formats as ISO). */
export function todayLocalISO(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: TZ });
}

/** Shift a YYYY-MM-DD date string by N days. Noon anchor avoids DST edge cases. */
export function addDaysISO(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

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

  return { intervalDays, nextReviewAt: addDaysISO(todayLocalISO(), intervalDays) };
}

/**
 * Calculate the next_review_at for a question in the review queue.
 * Always the next calendar day in Rome — a question missed today is due
 * tomorrow morning and stays due all of tomorrow.
 */
export function nextMorningISO(): string {
  return addDaysISO(todayLocalISO(), 1);
}
