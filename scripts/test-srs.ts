/**
 * scripts/test-srs.ts — run with: npx tsx scripts/test-srs.ts
 * Guards the review scheduling: a question missed today must come back on the
 * *next* calendar day in Rome, not the same evening and not two days later.
 */
import assert from "node:assert";
import { addDaysISO, nextMorningISO, nextReview, todayLocalISO } from "../src/lib/srs.js";

const today = todayLocalISO();
assert.match(today, /^\d{4}-\d{2}-\d{2}$/, "todayLocalISO must be YYYY-MM-DD");

// Exact next day, and it survives month/year/DST boundaries.
assert.equal(addDaysISO(today, 1), nextMorningISO());
assert.equal(addDaysISO("2026-12-31", 1), "2027-01-01");
assert.equal(addDaysISO("2027-03-01", -1), "2027-02-28");
assert.equal(addDaysISO("2026-03-28", 1), "2026-03-29"); // Rome DST spring-forward
assert.equal(addDaysISO("2026-10-24", 1), "2026-10-25"); // Rome DST fall-back
assert.equal(addDaysISO(addDaysISO(today, 14), -14), today);

// A question due tomorrow is not due today — this is what stopped wrong answers
// from being re-served in the very next exam of the same day.
assert.ok(nextMorningISO() > todayLocalISO());

// Vocab SRS: miss resets to 1 day, correct doubles, capped at 90.
assert.equal(nextReview(8, false).intervalDays, 1);
assert.equal(nextReview(8, true).intervalDays, 16);
assert.equal(nextReview(64, true).intervalDays, 90);
assert.equal(nextReview(4, true).nextReviewAt, addDaysISO(today, 8));

// Rome is ahead of UTC, so late-evening UTC dates must not roll back a day.
const romeNow = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Rome" });
assert.equal(today, romeNow);

console.log("srs ok —", today, "->", nextMorningISO());
