/**
 * src/lib/support.ts
 * Pure rules for the support thread, kept out of the API and DB layers so the
 * two things that fail silently can be tested without a database:
 *   - what counts as a sendable message (trust boundary — text arrives from a
 *     Mini App form and from Telegram)
 *   - which direction is unread for which side (get this backwards and a
 *     badge never clears, or a message is marked read before anyone saw it)
 */

/** 'in' = user → support · 'out' = support → user. Always the user's POV. */
export type SupportDirection = "in" | "out";

/**
 * Long enough that no realistic support message is cut (Telegram itself caps a
 * message at 4096), short enough that a D1 row stays small and a flood of junk
 * can't be used to grow the table quickly.
 */
export const SUPPORT_MAX_LEN = 2000;

/**
 * Clean a message body coming from a client. Returns null when there is
 * nothing to send — callers reject rather than storing an empty row.
 */
export function normalizeSupportText(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const text = raw
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n") // collapse newline spam, keep paragraphs
    .trim();
  if (!text) return null;
  return text.length > SUPPORT_MAX_LEN ? text.slice(0, SUPPORT_MAX_LEN) : text;
}

/**
 * Messages unread *for* a side are the ones the other side sent:
 * the admin reads inbound, the user reads outbound.
 */
export function unreadDirectionFor(side: "admin" | "user"): SupportDirection {
  return side === "admin" ? "in" : "out";
}
