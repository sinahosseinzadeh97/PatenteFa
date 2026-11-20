/**
 * src/lib/ai-budget.ts
 * Per-user cap on OpenAI calls, so one account (or a stolen initData) cannot
 * run up the bill. Counts the rows every OpenAI call already writes to
 * api_usage_logs: strongly consistent, no extra binding.
 *
 * Limits sit well above real use: over 30 days to 2026-11-20 the busiest user
 * made 55 calls in an hour and 97 in a day (about $0.0015 per call).
 */

export const AI_CALLS_PER_HOUR = 120;
export const AI_CALLS_PER_DAY = 400;

export class AiBudgetExceededError extends Error {
  constructor() {
    super("AI budget exceeded");
    this.name = "AiBudgetExceededError";
  }
}

/**
 * Throws AiBudgetExceededError when the user is over either limit.
 * shortcut: count-then-call is not atomic, so a burst of parallel requests can
 * overshoot by its own size; fine for a cost cap, use a Durable Object if it
 * ever must be exact. Calls with no user (unit tests) are not budgeted.
 */
export async function assertAiBudget(db: D1Database | undefined, userId: number | undefined): Promise<void> {
  if (!db || !userId) return;
  const row = await db
    .prepare(
      `SELECT COUNT(*) AS day, COALESCE(SUM(created_at >= datetime('now', '-1 hour')), 0) AS hour
       FROM api_usage_logs WHERE user_id = ? AND created_at >= datetime('now', '-1 day')`
    )
    .bind(userId)
    .first<{ day: number; hour: number }>();
  if ((row?.hour ?? 0) >= AI_CALLS_PER_HOUR || (row?.day ?? 0) >= AI_CALLS_PER_DAY) {
    throw new AiBudgetExceededError();
  }
}
