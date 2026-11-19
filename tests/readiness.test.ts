/**
 * The readiness light: an estimated pass probability from the last five
 * simulations without AI help, and the state (off / red / amber / green).
 * Pure functions; the numbers are the binomial for 30 questions, at most 3 wrong.
 */
import assert from "node:assert/strict";
import test from "node:test";
import { computeReadiness, displayPercent, maxWrongFor, passProbability } from "../src/lib/readiness.js";

const sims = (...wrong: number[]) => wrong.map((wrongCount) => ({ wrongCount }));
const near = (actual: number, expected: number) => assert.ok(Math.abs(actual - expected) < 0.001, `${actual} ≈ ${expected}`);

test("pass probability is the binomial for 30 questions with at most 3 wrong", () => {
  near(passProbability(0.9), 0.647);
  near(passProbability(0.94), 0.897);
  near(passProbability(0.95), 0.939);
  assert.equal(passProbability(0), 0);
  assert.equal(passProbability(1), 1);
  assert.equal(passProbability(1.2), 1, "clamped");
});

test("thresholds in wrong answers over five simulations", () => {
  assert.equal(maxWrongFor(150, 0.9), 8);
  assert.equal(maxWrongFor(150, 0.6), 16);
});

test("the shown percent is rounded down to 5 and capped at 95", () => {
  assert.deepEqual(displayPercent(0.647), { value: 60, over: false });
  assert.deepEqual(displayPercent(0.97), { value: 95, over: true });
  assert.deepEqual(displayPercent(0.95), { value: 95, over: false });
  // 9 wrong in 150 is amber at 0.897: it must not read "90%", the green threshold.
  assert.deepEqual(displayPercent(0.897), { value: 85, over: false });
  assert.deepEqual(displayPercent(0.9), { value: 90, over: false });
  assert.deepEqual(displayPercent(0.003), { value: 0, over: false });
});

test("fewer than three simulations: the light stays off", () => {
  assert.deepEqual(computeReadiness([]), { state: "off", probability: null, simulations: 0, wrong: 0, passes: 0, toNext: { simulationsNeeded: 3 } });
  const two = computeReadiness(sims(0, 0));
  assert.equal(two.state, "off");
  assert.equal(two.toNext.simulationsNeeded, 1);
});

test("three simulations are enough for a percent, but never for green", () => {
  const three = computeReadiness(sims(0, 0, 0));
  assert.equal(three.simulations, 3);
  assert.equal(three.probability, 1);
  assert.equal(three.state, "amber", "green needs five simulations");
});

test("green: five passes and at most 8 wrong in total", () => {
  assert.equal(computeReadiness(sims(1, 1, 1, 1, 1)).state, "green");
  assert.equal(computeReadiness(sims(3, 2, 2, 1, 0)).state, "green", "8 wrong");
  const nine = computeReadiness(sims(3, 2, 2, 1, 1));
  assert.equal(nine.state, "amber", "9 wrong");
  assert.equal(nine.toNext.wrongForGreen, 8);
  assert.equal(computeReadiness(sims(4, 1, 1, 1, 0)).state, "amber", "one failed simulation breaks green");
});

test("only the newest five simulations count", () => {
  const result = computeReadiness(sims(1, 1, 1, 1, 1, 20, 20));
  assert.equal(result.state, "green");
  assert.equal(result.simulations, 5);
  assert.equal(result.wrong, 5);
});

test("red tells how many wrong answers amber allows", () => {
  const red = computeReadiness(sims(8, 7, 9, 6, 10));
  assert.equal(red.state, "red");
  assert.equal(red.wrong, 40);
  assert.equal(red.toNext.wrongForAmber, 16);
});

test("the input is not changed", () => {
  const input = Object.freeze(sims(1, 1, 1, 1, 1, 1).map((s) => Object.freeze(s)));
  assert.doesNotThrow(() => computeReadiness(input));
});
