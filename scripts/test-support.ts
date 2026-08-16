/**
 * scripts/test-support.ts
 * Self-check for the support thread's two silent-failure points.
 * Run: npx tsx scripts/test-support.ts
 *
 *  1. What counts as a sendable message — text arrives from a Mini App form and
 *     from Telegram; an empty or unbounded body would be stored either way.
 *  2. Which direction is unread for which side — swap these and either a badge
 *     never clears, or a message is marked read before anyone opened it.
 */
import assert from "node:assert/strict";
import {
  normalizeSupportText,
  unreadDirectionFor,
  SUPPORT_MAX_LEN,
} from "../src/lib/support.js";

// ── Message validation ──────────────────────────────────────────────────────
assert.equal(normalizeSupportText("  سلام  "), "سلام");
assert.equal(normalizeSupportText("خط اول\nخط دوم"), "خط اول\nخط دوم");
assert.equal(normalizeSupportText("a\r\nb"), "a\nb");

// Nothing to send — these must not become rows.
assert.equal(normalizeSupportText(""), null);
assert.equal(normalizeSupportText("   \n\n  "), null);
assert.equal(normalizeSupportText(undefined), null);
assert.equal(normalizeSupportText(null), null);
assert.equal(normalizeSupportText(42), null);
assert.equal(normalizeSupportText({ text: "hi" }), null);

// Newline spam collapses to a paragraph break, real paragraphs survive.
assert.equal(normalizeSupportText("a\n\n\n\n\nb"), "a\n\nb");
assert.equal(normalizeSupportText("a\n\nb"), "a\n\nb");

// Bounded: a long body is truncated, never rejected — the user still gets heard.
const long = "x".repeat(SUPPORT_MAX_LEN + 500);
assert.equal(normalizeSupportText(long)?.length, SUPPORT_MAX_LEN);
assert.equal(normalizeSupportText("x".repeat(SUPPORT_MAX_LEN))?.length, SUPPORT_MAX_LEN);

// ── Read/unread direction ───────────────────────────────────────────────────
// 'in' = user → support, 'out' = support → user. You read what you did not send.
assert.equal(unreadDirectionFor("admin"), "in");
assert.equal(unreadDirectionFor("user"), "out");
assert.notEqual(unreadDirectionFor("admin"), unreadDirectionFor("user"));

console.log("✓ support thread: all checks passed");
