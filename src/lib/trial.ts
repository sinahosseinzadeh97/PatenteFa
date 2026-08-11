/**
 * src/lib/trial.ts
 * Free-trial window for newly registered users.
 *
 * No schema change: the trial clock is `users.created_at`, which SQLite already
 * stamps via `datetime('now')` on insert. A user is inside their trial for
 * TRIAL_HOURS after first registration, regardless of admin approval.
 */

/** Length of the free trial granted to every new user. */
export const TRIAL_HOURS = 72;

const MS_PER_HOUR = 3_600_000;

/**
 * Milliseconds remaining in a user's free trial; 0 once it has lapsed.
 *
 * `created_at` arrives as SQLite's `datetime('now')` output — "YYYY-MM-DD HH:MM:SS",
 * UTC but with no zone marker, which Date.parse treats as *local* time. We
 * normalise to ISO-with-Z so the trial isn't silently skewed by the runtime's
 * timezone. An unparseable or missing value yields 0 (deny), never a free pass.
 */
export function trialMsLeft(
  createdAt: string | null | undefined,
  now: number = Date.now()
): number {
  if (!createdAt) return 0;

  const t = createdAt.trim().replace(" ", "T");
  const hasZone = /([Zz]|[+-]\d{2}:?\d{2})$/.test(t);
  const started = Date.parse(hasZone ? t : `${t}Z`);
  if (Number.isNaN(started)) return 0;

  return Math.max(0, started + TRIAL_HOURS * MS_PER_HOUR - now);
}

/** Whether the user is still inside their free trial. */
export function isTrialActive(
  createdAt: string | null | undefined,
  now: number = Date.now()
): boolean {
  return trialMsLeft(createdAt, now) > 0;
}

/** Whole hours left, rounded up — for "X ساعت باقی مانده" copy. */
export function trialHoursLeft(
  createdAt: string | null | undefined,
  now: number = Date.now()
): number {
  return Math.ceil(trialMsLeft(createdAt, now) / MS_PER_HOUR);
}
