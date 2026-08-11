/**
 * scripts/test-trial.ts
 * Self-check for the free-trial window. Run: npx tsx scripts/test-trial.ts
 */
import assert from "node:assert/strict";
import { TRIAL_HOURS, trialMsLeft, isTrialActive, trialHoursLeft } from "../src/lib/trial.js";

const H = 3_600_000;
// SQLite datetime('now') format — UTC, no zone marker.
const at = (ms: number) => new Date(ms).toISOString().replace("T", " ").slice(0, 19);

const now = Date.parse("2026-08-07T12:00:00Z");

// Just registered → full window.
assert.equal(trialMsLeft(at(now), now), TRIAL_HOURS * H);
assert.equal(isTrialActive(at(now), now), true);

// Mid-trial.
assert.equal(trialMsLeft(at(now - 24 * H), now), 48 * H);
assert.equal(trialHoursLeft(at(now - 24 * H), now), 48);

// Boundary: exactly 72h old is expired, one minute earlier is not.
assert.equal(trialMsLeft(at(now - TRIAL_HOURS * H), now), 0);
assert.equal(isTrialActive(at(now - TRIAL_HOURS * H), now), false);
assert.equal(isTrialActive(at(now - TRIAL_HOURS * H + 60_000), now), true);

// Long expired never goes negative.
assert.equal(trialMsLeft(at(now - 900 * H), now), 0);

// The bug this guards: a zone-less UTC stamp must not be read as local time.
// Under TZ=Europe/Rome (UTC+2 in August) a naive Date.parse would shift by 2h.
assert.equal(trialMsLeft("2026-08-07 12:00:00", now), TRIAL_HOURS * H);
// Explicit-zone forms still parse correctly.
assert.equal(trialMsLeft("2026-08-07T12:00:00Z", now), TRIAL_HOURS * H);

// Missing / malformed input denies access rather than granting it.
for (const bad of [null, undefined, "", "   ", "not-a-date"]) {
  assert.equal(trialMsLeft(bad as string | null | undefined, now), 0, `should deny: ${String(bad)}`);
  assert.equal(isTrialActive(bad as string | null | undefined, now), false);
}

console.log("✓ trial window: all checks passed");
