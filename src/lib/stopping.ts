/**
 * src/lib/stopping.ts
 * The stopping-distance model behind chapter 3 (Velocità, distanza di
 * sicurezza e arresto). Deterministic and deliberately simple: an educational
 * estimate, never a legal following distance or a prediction for a real car.
 *
 *   speed             v = km/h ÷ 3.6                    (m/s)
 *   reaction distance = v · t                           (still at full speed)
 *   braking distance  = v² / (2 · μ · g)                (uniform deceleration)
 *   stopping distance = reaction + braking
 *
 * Why these numbers (checked in tests/stopping.test.ts):
 *  - t = 1 s is the bank's own reference: its VERO statements give the metres
 *    covered "in un secondo" and the "distanza minima di sicurezza" with it.
 *    2.5 s is the 90th-percentile driver used by Comune di Firenze (WHO 2008).
 *  - μ = 0.7 on dry asphalt sits in Comune di Genova's range (0.65–0.72) and,
 *    with t = 1 s, lands within a metre of WHO/OECD's 27 / 36 / 58 m at
 *    50 / 60 / 80 km/h.
 *  - Wet, snowy and icy roads get no number: the sources disagree (from +50 %
 *    to "at least double"), so braking there is reported only as longer than
 *    on dry asphalt — the bank's own claim.
 *
 * The client never recomputes any of this; it draws the table the API sends.
 */

export const GRAVITY = 9.81; // m/s²
export const DRY_FRICTION = 0.7;
export const SPEEDS_KMH = [30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130];
export const REACTION_TIMES_S = [1, 1.5, 2, 2.5];
export const SURFACES = ["dry", "wet", "snow"] as const;
export type Surface = (typeof SURFACES)[number];

export interface StoppingSetting {
  speed: number;
  reaction: number;
  surface: Surface;
}

export interface StoppingEstimate extends StoppingSetting {
  reactionM: number;
  /** null: no credible number for this surface — longer than brakingMinM. */
  brakingM: number | null;
  /** Dry-asphalt braking distance; only a lower bound off dry asphalt. */
  brakingMinM: number;
  totalM: number | null;
  totalMinM: number;
  /** Time from the first touch of the brake to standstill (dry only). */
  brakingS: number | null;
  /** Gap to a vehicle ahead that brakes exactly as hard as you: you cover it while reacting. */
  gapM: number;
}

function assertNonNegative(name: string, value: number): void {
  if (!Number.isFinite(value) || value < 0) throw new RangeError(`${name} must be a finite number ≥ 0, got ${value}`);
}

export function metresPerSecond(kmh: number): number {
  assertNonNegative("speed", kmh);
  return kmh / 3.6;
}

export function reactionDistance(kmh: number, seconds: number): number {
  assertNonNegative("reaction time", seconds);
  return metresPerSecond(kmh) * seconds;
}

/** Braking distance on dry asphalt. */
export function brakingDistance(kmh: number): number {
  const v = metresPerSecond(kmh);
  return (v * v) / (2 * DRY_FRICTION * GRAVITY);
}

export function estimateStopping({ speed, reaction, surface }: StoppingSetting): StoppingEstimate {
  if (!SURFACES.includes(surface)) throw new RangeError(`unknown surface: ${String(surface)}`);
  const reactionM = reactionDistance(speed, reaction);
  const dryBraking = brakingDistance(speed);
  const numeric = surface === "dry";
  return {
    speed,
    reaction,
    surface,
    reactionM,
    brakingM: numeric ? dryBraking : null,
    brakingMinM: dryBraking,
    totalM: numeric ? reactionM + dryBraking : null,
    totalMinM: reactionM + dryBraking,
    brakingS: numeric && speed > 0 ? metresPerSecond(speed) / (DRY_FRICTION * GRAVITY) : numeric ? 0 : null,
    gapM: reactionM,
  };
}

const round2 = (value: number | null) => (value === null ? null : Math.round(value * 100) / 100);

/** Every setting the explorer offers, rounded to centimetres for the wire. */
export function stoppingTable(): StoppingEstimate[] {
  return SPEEDS_KMH.flatMap((speed) =>
    REACTION_TIMES_S.flatMap((reaction) =>
      SURFACES.map((surface) => {
        const e = estimateStopping({ speed, reaction, surface });
        return {
          ...e,
          reactionM: round2(e.reactionM) as number,
          brakingM: round2(e.brakingM),
          brakingMinM: round2(e.brakingMinM) as number,
          totalM: round2(e.totalM),
          totalMinM: round2(e.totalMinM) as number,
          brakingS: round2(e.brakingS),
          gapM: round2(e.gapM) as number,
        };
      })
    )
  );
}
