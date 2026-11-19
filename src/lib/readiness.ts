/**
 * The readiness light (features.md §52): how likely is a pass today, judged
 * only by the last simulations the learner finished without AI help.
 *
 * A simulation is the real exam's shape (30 statements, 20 minutes, unanswered
 * counts as wrong) and skips questions answered in the last 14 days, so its
 * accuracy measures what the learner knows, not what they saw yesterday.
 */

export const EXAM_QUESTIONS = 30;
export const EXAM_MAX_ERRORS = 3;
export const READINESS_WINDOW = 5;
export const MIN_SIMULATIONS = 3;
export const GREEN_PROBABILITY = 0.9;
export const AMBER_PROBABILITY = 0.6;

export type ReadinessState = "off" | "red" | "amber" | "green";

/** One finished simulation; callers pass them newest first. */
export interface SimulationResult {
  wrongCount: number;
}

export interface Readiness {
  state: ReadinessState;
  probability: number | null;
  simulations: number;
  wrong: number;
  passes: number;
  toNext: { simulationsNeeded?: number; wrongForAmber?: number; wrongForGreen?: number };
}

function binomial(n: number, k: number): number {
  let result = 1;
  for (let i = 1; i <= k; i++) result = (result * (n - k + i)) / i;
  return result;
}

/** P(at most 3 wrong in 30) when each answer is right with probability `accuracy`. */
export function passProbability(accuracy: number): number {
  const a = Math.min(1, Math.max(0, accuracy));
  let p = 0;
  for (let wrong = 0; wrong <= EXAM_MAX_ERRORS; wrong++) {
    p += binomial(EXAM_QUESTIONS, wrong) * (1 - a) ** wrong * a ** (EXAM_QUESTIONS - wrong);
  }
  return Math.min(1, p);
}

/** Most wrong answers out of `answers` that still reach `threshold`; −1 if none. */
export function maxWrongFor(answers: number, threshold: number): number {
  for (let wrong = answers; wrong >= 0; wrong--) {
    if (passProbability((answers - wrong) / answers) >= threshold) return wrong;
  }
  return -1;
}

/**
 * Rounded *down* to 5 and capped at 95: the estimate is not precise enough for
 * more, and rounding down keeps each band's numbers inside it (amber never
 * reads "90%", the green threshold). The epsilon guards 0.9 against float error.
 */
export function displayPercent(p: number): { value: number; over: boolean } {
  const percent = p * 100;
  return { value: Math.min(95, Math.floor(percent / 5 + 1e-9) * 5), over: percent > 95 };
}

export function computeReadiness(results: readonly SimulationResult[]): Readiness {
  const window = results.slice(0, READINESS_WINDOW);
  const simulations = window.length;
  const wrong = window.reduce((sum, r) => sum + r.wrongCount, 0);
  const passes = window.filter((r) => r.wrongCount <= EXAM_MAX_ERRORS).length;

  if (simulations < MIN_SIMULATIONS) {
    return { state: "off", probability: null, simulations, wrong, passes, toNext: { simulationsNeeded: MIN_SIMULATIONS - simulations } };
  }

  const answers = EXAM_QUESTIONS * simulations;
  const probability = passProbability((answers - wrong) / answers);
  if (simulations === READINESS_WINDOW && passes === READINESS_WINDOW && probability >= GREEN_PROBABILITY) {
    return { state: "green", probability, simulations, wrong, passes, toNext: {} };
  }
  if (probability >= AMBER_PROBABILITY) {
    const wrongForGreen = maxWrongFor(EXAM_QUESTIONS * READINESS_WINDOW, GREEN_PROBABILITY);
    return { state: "amber", probability, simulations, wrong, passes, toNext: { wrongForGreen } };
  }
  return { state: "red", probability, simulations, wrong, passes, toNext: { wrongForAmber: maxWrongFor(answers, AMBER_PROBABILITY) } };
}
