import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

import worker from "../src/index.js";
import {
  CHAPTERS,
  PILOT_CHAPTER,
  lessonLinkForSourceId,
  relatedSourceIds,
  type DistancePart,
  type LessonStep,
  type Prediction,
  type PredictionClaim,
} from "../src/content/lessons.js";
import { INCROCI_CHAPTER } from "../src/content/lessons-incroci.js";
import { VELOCITA_CHAPTER } from "../src/content/lessons-velocita.js";
import { buildTodayPath, summarizeLessons } from "../src/lib/learning.js";
import {
  DRY_FRICTION,
  GRAVITY,
  REACTION_TIMES_S,
  SPEEDS_KMH,
  SURFACES,
  brakingDistance,
  estimateStopping,
  metresPerSecond,
  reactionDistance,
  stoppingTable,
  type StoppingEstimate,
} from "../src/lib/stopping.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

const near = (actual: number, expected: number, tolerance: number, label: string) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: ${actual.toFixed(2)} vs ${expected} (±${tolerance})`);

// ── Units and formulas ───────────────────────────────────────────────────────

test("speed is converted from km/h to m/s by dividing by 3.6", () => {
  assert.equal(metresPerSecond(36), 10);
  near(metresPerSecond(50), 13.889, 0.001, "50 km/h");
  assert.equal(metresPerSecond(0), 0);
});

test("reaction distance is speed in m/s times the reaction time in seconds", () => {
  near(reactionDistance(50, 1), 13.889, 0.001, "50 km/h, 1 s");
  near(reactionDistance(90, 2), 50, 1e-9, "90 km/h, 2 s");
  assert.equal(reactionDistance(50, 0), 0, "no reaction time, no reaction distance");
});

test("dry braking distance is v² / (2·μ·g) with μ = 0.7", () => {
  assert.equal(DRY_FRICTION, 0.7);
  assert.equal(GRAVITY, 9.81);
  const v = 100 / 3.6;
  near(brakingDistance(100), (v * v) / (2 * 0.7 * 9.81), 1e-9, "100 km/h");
  near(brakingDistance(50), 14.05, 0.01, "50 km/h");
  assert.equal(brakingDistance(0), 0, "a stopped car needs no braking distance");
});

test("invalid inputs are rejected instead of producing a distance", () => {
  for (const bad of [-1, Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.throws(() => reactionDistance(bad, 1), RangeError, `speed ${bad}`);
    assert.throws(() => reactionDistance(50, bad), RangeError, `reaction ${bad}`);
    assert.throws(() => brakingDistance(bad), RangeError, `braking speed ${bad}`);
  }
  assert.throws(() => estimateStopping({ speed: 50, reaction: 1, surface: "gravel" as never }), RangeError);
});

// ── Relationships the lessons teach ──────────────────────────────────────────

test("doubling the speed doubles the reaction distance but quadruples the braking distance", () => {
  near(reactionDistance(100, 1) / reactionDistance(50, 1), 2, 1e-9, "reaction ×2");
  near(brakingDistance(100) / brakingDistance(50), 4, 1e-9, "braking ×4 (bank 4283)");
  near(brakingDistance(90) / brakingDistance(30), 9, 1e-9, "braking ×9 for ×3 speed (bank 4284)");
  near(brakingDistance(120) / brakingDistance(30), 16, 1e-9, "braking ×16 for ×4 speed (bank 4285)");
});

test("reaction time changes only the distance before braking; the surface changes only braking", () => {
  const base = estimateStopping({ speed: 50, reaction: 1, surface: "dry" });
  const slow = estimateStopping({ speed: 50, reaction: 2, surface: "dry" });
  near(slow.reactionM / base.reactionM, 2, 1e-9, "reaction ×2 for ×2 time");
  assert.equal(slow.brakingM, base.brakingM, "braking does not depend on the driver's reflexes (bank 4293)");

  for (const surface of ["wet", "snow"] as const) {
    const off = estimateStopping({ speed: 50, reaction: 1, surface });
    assert.equal(off.reactionM, base.reactionM, `${surface}: reaction distance unchanged`);
    assert.equal(off.brakingM, null, `${surface}: no braking figure is claimed`);
    assert.equal(off.totalM, null, `${surface}: no total is claimed`);
    assert.equal(off.brakingMinM, base.brakingM, `${surface}: dry braking is only a lower bound`);
    assert.equal(off.totalMinM, base.totalM, `${surface}: dry total is only a lower bound`);
    assert.equal(off.brakingS, null);
  }
});

test("total stopping distance is reaction plus braking, and grows with speed and reaction time", () => {
  let previous = 0;
  for (const speed of SPEEDS_KMH) {
    const estimate = estimateStopping({ speed, reaction: 1, surface: "dry" });
    assert.equal(estimate.totalM, estimate.reactionM + (estimate.brakingM ?? Number.NaN), `${speed}: total = sum (bank 4298)`);
    assert.ok((estimate.totalM ?? 0) > previous, `${speed}: longer than at a lower speed (bank 4307)`);
    previous = estimate.totalM ?? 0;
  }
  const quick = estimateStopping({ speed: 70, reaction: 1, surface: "dry" });
  const slow = estimateStopping({ speed: 70, reaction: 2.5, surface: "dry" });
  assert.ok((slow.totalM ?? 0) > (quick.totalM ?? 0));
});

test("braking time is the time to stop under uniform deceleration", () => {
  const estimate = estimateStopping({ speed: 50, reaction: 1, surface: "dry" });
  near(estimate.brakingS ?? 0, metresPerSecond(50) / (DRY_FRICTION * GRAVITY), 1e-9, "t = v / a");
  near(estimate.brakingS ?? 0, (2 * (estimate.brakingM ?? 0)) / metresPerSecond(50), 1e-9, "t = 2d / v");
});

test("a following gap of one reaction distance is what the equal-braking model needs", () => {
  const estimate = estimateStopping({ speed: 100, reaction: 1, surface: "dry" });
  assert.equal(estimate.gapM, estimate.reactionM);
  // Both cars brake identically, so the follower ends exactly where the leader stops.
  near(estimate.gapM + (estimate.brakingM ?? 0), estimate.reactionM + (estimate.brakingM ?? 0), 1e-9, "same stop point");
});

// ── Independent published figures ────────────────────────────────────────────

test("with a 1 s reaction the model gives the bank's 'one second' and minimum-distance figures", () => {
  // Bank statements 4258–4262 and 4274–4277 (VERO): metres in one second / minimum distance.
  const bank: [number, number][] = [[30, 9], [50, 14], [100, 28], [130, 36], [150, 42]];
  for (const [speed, metres] of bank) near(reactionDistance(speed, 1), metres, 1, `${speed} km/h`);
  // The FALSO alternatives are far off, so the model would never confirm them.
  for (const [speed, metres] of [[30, 2], [50, 5], [100, 15], [130, 20], [150, 25]] as const) {
    assert.ok(Math.abs(reactionDistance(speed, 1) - metres) > 5, `${speed} km/h ≠ ${metres} m`);
  }
});

test("with a 2.5 s reaction the reaction distances match Comune di Firenze's infographic (WHO 2008)", () => {
  for (const [speed, metres] of [[30, 21], [40, 28], [50, 35], [60, 42], [70, 49]] as const) {
    near(reactionDistance(speed, 2.5), metres, 0.5, `${speed} km/h`);
  }
});

test("dry stopping distances agree with the WHO/OECD figures (27, 36, 58 m) within a metre", () => {
  for (const [speed, metres] of [[50, 27], [60, 36], [80, 58]] as const) {
    near(estimateStopping({ speed, reaction: 1, surface: "dry" }).totalM ?? 0, metres, 1, `${speed} km/h`);
  }
});

// ── The table the explorer receives ──────────────────────────────────────────

test("the explorer table covers every offered setting once, rounded to centimetres", () => {
  const table = stoppingTable();
  assert.equal(table.length, SPEEDS_KMH.length * REACTION_TIMES_S.length * SURFACES.length);
  const keys = new Set(table.map((row) => `${row.speed}/${row.reaction}/${row.surface}`));
  assert.equal(keys.size, table.length, "no duplicate settings");
  for (const row of table) {
    const exact = estimateStopping(row);
    near(row.reactionM, exact.reactionM, 0.005, "reaction rounded");
    near(row.brakingMinM, exact.brakingMinM, 0.005, "braking rounded");
    assert.equal(row.brakingM === null, exact.brakingM === null);
    assert.ok(Number.isInteger(Math.round(row.reactionM * 100)) && Math.abs(row.reactionM * 100 - Math.round(row.reactionM * 100)) < 1e-6);
  }
});

// ── Chapter content checked against the model and the bank ─────────────────

type StoppingStep = Extract<LessonStep, { kind: "stopping" }>;
type FactorsStep = Extract<LessonStep, { kind: "factors" }>;
const LESSONS = VELOCITA_CHAPTER.lessons;
const stepsOf = <K extends LessonStep["kind"]>(kind: K) =>
  LESSONS.flatMap((lesson) => lesson.steps.filter((s): s is Extract<LessonStep, { kind: K }> => s.kind === kind).map((step) => ({ lesson, step })));

function part(e: StoppingEstimate, which: DistancePart): number | null {
  if (which === "reaction") return e.reactionM;
  if (which === "gap") return e.gapM;
  if (which === "braking") return e.brakingM;
  return e.totalM;
}

/** Does this claim hold for the prediction's rows under the model? */
function claimHolds(step: StoppingStep, prediction: Prediction, claim: PredictionClaim): boolean {
  const rows = prediction.rows.map(estimateStopping);
  if ("fits" in claim) {
    const total = rows[claim.row]?.totalM ?? null;
    return total !== null && (total <= (step.sight ?? Number.NaN)) === claim.fits;
  }
  const before = part(rows[0], claim.part);
  const after = part(rows[1], claim.part);
  if ("longer" in claim) return before !== null && (after === null || after > before + 1e-9);
  return before !== null && after !== null && Math.abs(after / before - claim.factor) < 0.01;
}

test("every prediction has exactly one option the model confirms, and it is the marked answer", () => {
  const steps = stepsOf("stopping");
  assert.equal(steps.length, 4, "one explorer per lesson");
  for (const { lesson, step } of steps) {
    assert.ok(step.predictions.length >= 1, `${lesson.id}: predict before any comparison`);
    for (const prediction of step.predictions) {
      const holding = prediction.options
        .map((option, index) => ({ index, holds: option.claims.every((claim) => claimHolds(step, prediction, claim)) }))
        .filter((o) => o.holds)
        .map((o) => o.index);
      assert.deepEqual(holding, [prediction.answer], `${lesson.id}: «${prediction.question}»`);
      assert.ok(prediction.explain.length > 40, `${lesson.id}: the reveal explains itself`);
    }
  }
});

test("every setting the explorer starts from or compares is one the model table offers", () => {
  const table = new Set(stoppingTable().map((r) => `${r.speed}/${r.reaction}/${r.surface}`));
  for (const { lesson, step } of stepsOf("stopping")) {
    for (const s of [step.start, ...step.predictions.flatMap((p) => p.rows)]) {
      assert.ok(table.has(`${s.speed}/${s.reaction}/${s.surface}`), `${lesson.id}: ${JSON.stringify(s)}`);
    }
    assert.ok(step.controls.length > 0 && step.controls.every((c) => ["speed", "reaction", "surface"].includes(c)));
    if (step.scene === "sight") assert.ok((step.sight ?? 0) > 0, `${lesson.id}: sight distance set`);
    // The equal-braking gap does not change with grip, so a surface control here
    // would wrongly suggest rain does not matter for following distance.
    if (step.scene === "following") assert.ok(!step.controls.includes("surface"), `${lesson.id}: no surface control on the following scene`);
  }
});

test("factor lists are the bank's own answers: VERO beside VERO, FALSO beside FALSO", () => {
  const practice = new Set(LESSONS.flatMap((l) => l.practice.map((q) => q.sourceId)));
  const traps = new Set(LESSONS.flatMap((l) => l.steps.flatMap((s) => (s.kind === "trap" ? s.examples.map((e) => e.sourceId) : []))));
  const factors = stepsOf("factors");
  assert.equal(factors.length, 4);
  for (const { lesson, step } of factors as { lesson: (typeof LESSONS)[number]; step: FactorsStep }[]) {
    step.columns.forEach((column, i) => {
      assert.ok(column.items.length >= 4, `${lesson.id}: column ${i} has enough items`);
      for (const item of column.items) {
        assert.equal(item.answer, i === 0 ? 1 : 0, `${item.sourceId} sits in the column of its answer`);
        assert.ok(item.textIt.includes(item.it), `${item.sourceId}: «${item.it}» is the bank's own wording`);
        assert.ok(!practice.has(item.sourceId) && !traps.has(item.sourceId), `${item.sourceId}: not reused as practice or trap`);
        assert.equal(lessonLinkForSourceId(item.sourceId)?.lessonId, lesson.id, `${item.sourceId}: a mistake on it routes back here`);
      }
    });
  }
});

test("mistakes route to the section that teaches them; out-of-scope questions stay unmapped", () => {
  const link = (id: string) => lessonLinkForSourceId(id);
  assert.deepEqual([link("3969")?.lessonId, link("3969")?.step], ["velocita-adeguata", 2], "stop within visibility → sight explorer");
  assert.deepEqual([link("6436")?.lessonId, link("6436")?.step], ["spazio-di-reazione", 1]);
  assert.deepEqual([link("4287")?.lessonId, link("4287")?.step], ["frenatura-e-arresto", 1]);
  assert.deepEqual([link("896")?.lessonId, link("896")?.step], ["frenatura-e-arresto", 2], "SALITA RIPIDA sign → braking factors");
  assert.deepEqual([link("4336")?.lessonId, link("4336")?.step], ["distanza-di-sicurezza", 1]);
  assert.deepEqual([link("4216")?.lessonId, link("4216")?.step], ["distanza-di-sicurezza", 2], "20 m from snowplows");
  for (const id of ["4134", "4153", "4159", "4166", "4332"]) assert.equal(link(id), null, `${id} is out of scope`);
  assert.deepEqual(VELOCITA_CHAPTER.topicIds, [10, 11]);
});

test("after the first two chapters, today's path recommends this chapter, never a completed lesson", () => {
  const done = (lessons: typeof LESSONS, at: string) =>
    lessons.map((l) => ({ lesson_id: l.id, step: 99, started_at: "", updated_at: at, completed_at: at }));
  const summaries = [
    ...summarizeLessons(PILOT_CHAPTER, done(PILOT_CHAPTER.lessons, "2026-10-01 09:00:00"), [], []),
    ...summarizeLessons(INCROCI_CHAPTER, done(INCROCI_CHAPTER.lessons, "2026-10-08 09:00:00"), [], []),
    ...summarizeLessons(VELOCITA_CHAPTER, done([LESSONS[0]], "2026-10-02 09:00:00"), [], []),
  ];
  const first = buildTodayPath(summaries, 0).items[0];
  assert.ok(first.kind === "lesson" && first.lessonId === LESSONS[1].id, "the next unfinished lesson, skipping the one done directly");
});

// ── API ──────────────────────────────────────────────────────────────────────

const BOT = "123456:stopping-test";
const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;

function setup() {
  const { db, raw } = createSqliteD1();
  raw.prepare(`INSERT INTO topics (id, name_it, name_fa, sort_order) VALUES (4, 'Segnali di precedenza', 'علائم اولویت', 4)`).run();
  const insert = raw.prepare(`INSERT INTO questions (id, source_id, topic_id, text_it, correct_answer, image_url) VALUES (?, ?, 4, ?, ?, NULL)`);
  const lessons = CHAPTERS.flatMap((c) => c.lessons);
  const practice = new Map(lessons.flatMap((l) => l.practice.map((q) => [q.sourceId, q] as const)));
  for (const id of new Set(lessons.flatMap(relatedSourceIds))) {
    const q = practice.get(id);
    insert.run(Number(id), id, q ? q.textIt : `Bank statement ${id}`, q ? q.answer : 1);
  }
  const user = raw.prepare(`INSERT INTO users (id, telegram_user_id, first_name, is_approved) VALUES (?, ?, ?, 1)`);
  user.run(1, 8001, "A");
  user.run(2, 8002, "B");
  const env = { DB: db, TELEGRAM_BOT_TOKEN: BOT, ALLOWED_TELEGRAM_USER_IDS: "1", PRIMARY_ADMIN_TELEGRAM_USER_ID: "1", LOG_CHANNEL_ID: "-100" } as AppEnv;
  const call = async (telegramId: number, method: string, path: string, body?: unknown) => {
    const response = await worker.fetch(
      new Request(`https://example.test/api${path}`, {
        method,
        headers: { "Content-Type": "application/json", "X-Telegram-InitData": signedInitData(BOT, telegramId) },
        body: body === undefined ? undefined : JSON.stringify(body),
      }),
      env,
      ctx
    );
    return { status: response.status, body: (await response.json()) as Record<string, any> };
  };
  return { call, raw };
}

test("the chapter is listed in official order, opens directly, and ships the model's table with its explorer", async () => {
  const { call } = setup();
  const home = await call(8001, "GET", "/learn");
  assert.equal(home.body.chapters.length, CHAPTERS.length);
  const listed = home.body.chapters[CHAPTERS.indexOf(VELOCITA_CHAPTER)];
  assert.equal(listed.id, VELOCITA_CHAPTER.id);
  assert.deepEqual(listed.topicIds, [10, 11]);
  assert.equal(listed.lessons.length, 4);

  const lesson = await call(8001, "GET", `/learn/lessons/${LESSONS[2].id}`);
  assert.equal(lesson.status, 200);
  assert.deepEqual(lesson.body.position, { index: 3, total: 4, review: false });
  assert.equal(lesson.body.lesson.practice.length, 5);
  assert.equal(lesson.body.stopping.table.length, SPEEDS_KMH.length * REACTION_TIMES_S.length * SURFACES.length);
  assert.equal(lesson.body.stopping.friction, DRY_FRICTION);
  const row = lesson.body.stopping.table.find((r: StoppingEstimate) => r.speed === 50 && r.reaction === 1 && r.surface === "dry");
  assert.deepEqual([row.reactionM, row.brakingM, row.totalM], [13.89, 14.05, 27.93]);

  const pilot = await call(8001, "GET", `/learn/lessons/${PILOT_CHAPTER.lessons[0].id}`);
  assert.equal(pilot.body.stopping, null, "only lessons with an explorer carry the table");
});

test("'next lesson' skips lessons the learner already completed", async () => {
  const { call, raw } = setup();
  raw.prepare(`INSERT INTO lesson_progress (user_id, lesson_id, step, completed_at) VALUES (1, ?, 10, datetime('now'))`).run(LESSONS[0].id);
  // Official order: chapter 5 (segnali di precedenza) is followed by chapters 11–12.
  const lastIncroci = PILOT_CHAPTER.lessons[2];
  const opened = await call(8001, "GET", `/learn/lessons/${lastIncroci.id}`);
  assert.deepEqual(opened.body.next, {
    lessonId: LESSONS[1].id,
    titleFa: LESSONS[1].titleFa,
    chapterTitleFa: VELOCITA_CHAPTER.titleFa,
    chapterNumbers: VELOCITA_CHAPTER.numbers,
  });

  // Finishing it the real way gives the same answer.
  for (const q of opened.body.lesson.practice) await call(8001, "POST", `/learn/lessons/${lastIncroci.id}/answer`, { questionId: q.questionId, answer: q.correctAnswer });
  const finished = await call(8001, "POST", `/learn/lessons/${lastIncroci.id}/complete`);
  assert.equal(finished.status, 200);
  assert.equal(finished.body.next.lessonId, LESSONS[1].id);

  // Another learner, with nothing completed, is pointed at lesson 1.
  const other = await call(8002, "GET", `/learn/lessons/${lastIncroci.id}`);
  assert.equal(other.body.next.lessonId, LESSONS[0].id);
});

test("practice in this chapter is stored per learner and a wrong answer is queued for review once", async () => {
  const { call, raw } = setup();
  const lesson = LESSONS[3];
  const opened = await call(8001, "GET", `/learn/lessons/${lesson.id}`);
  const q = opened.body.lesson.practice[0];
  const wrong = 1 - q.correctAnswer;
  for (let i = 0; i < 2; i++) await call(8001, "POST", `/learn/lessons/${lesson.id}/answer`, { questionId: q.questionId, answer: wrong });
  assert.equal(raw.prepare(`SELECT COUNT(*) AS n FROM review_queue WHERE user_id = 1 AND question_id = ?`).get(q.questionId)?.n, 1);
  const mine = await call(8001, "GET", `/learn/lessons/${lesson.id}`);
  assert.deepEqual(mine.body.answers[q.questionId], { userAnswer: wrong, isCorrect: false });
  const theirs = await call(8002, "GET", `/learn/lessons/${lesson.id}`);
  assert.deepEqual(theirs.body.answers, {});
  assert.equal(theirs.body.progress.state, "not_started");
});

// ── Client: drawn to scale, predict first, no physics of its own ────────────

const EXPLORER = readFileSync("public/js/stopping.js", "utf8");

function loadExplorer(reduce = false) {
  const elements = new Map<string, Record<string, any>>();
  const element = (id: string) => {
    if (!elements.has(id)) elements.set(id, { id, innerHTML: "", textContent: "", hidden: false, disabled: false, focus() {}, scrollIntoView() {}, querySelector: () => null });
    return elements.get(id)!;
  };
  const steps = LESSONS.flatMap((l) => l.steps);
  const sandbox: Record<string, any> = {
    window: { matchMedia: () => ({ matches: reduce }) },
    document: { getElementById: element, querySelector: () => null, querySelectorAll: () => [] },
    requestAnimationFrame: () => 0,
    cancelAnimationFrame: () => {},
    App: { escapeHtml: (s: string) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"), refreshLessonDock() {} },
    state: {
      lesson: {
        lesson: { id: "chapter3", steps },
        progress: { state: "in_progress" },
        stopping: { friction: DRY_FRICTION, gravity: GRAVITY, speeds: SPEEDS_KMH, reactions: REACTION_TIMES_S, table: stoppingTable() },
      },
    },
  };
  vm.runInNewContext(EXPLORER, sandbox);
  return { App: sandbox.App, element, steps };
}

/**
 * Every bar in an SVG: its metres and its drawn width must share one scale.
 * Widths are written to 0.1 px, so the longest bar sets the scale and each bar
 * may differ from it by that rounding only.
 */
function assertToScale(svg: string, label: string) {
  const bars = [...svg.matchAll(/<rect class="sx-bar is-\w+"[^>]*data-m0="([\d.]+)" data-m1="([\d.]+)" x="([\d.-]+)" y="[\d.]+" width="([\d.]+)"/g)]
    .map((m) => ({ metres: Number(m[2]) - Number(m[1]), width: Number(m[4]), x: Number(m[3]) }))
    .filter((b) => b.metres > 0.5);
  assert.ok(bars.length >= 2, `${label}: bars drawn`);
  const ref = bars.reduce((a, b) => (b.metres > a.metres ? b : a));
  const k = ref.width / ref.metres;
  for (const bar of bars) {
    const tolerance = 0.06 + (0.05 * bar.metres) / ref.metres;
    assert.ok(Math.abs(bar.width - bar.metres * k) <= tolerance, `${label}: ${bar.metres.toFixed(2)} m drawn ${bar.width}px, expected ${(bar.metres * k).toFixed(2)}px`);
    assert.ok(bar.x >= 0, `${label}: inside the drawing`);
  }
  return k;
}

test("the explorer draws every distance to one scale, for every setting it offers", () => {
  const { App, element, steps } = loadExplorer();
  const index = steps.findIndex((s) => s.kind === "stopping" && s.scene === "hazard" && s.controls.includes("surface"));
  const content = steps[index] as StoppingStep;
  App.stoppingStepHtml(content, index);
  App.mountStopping(content, index);
  // Unlock the controls by answering the predictions.
  content.predictions.forEach((p, i) => {
    App.stopPick(p.answer);
    App.stopCheck();
    assertToScale(element("sx-predict").innerHTML, `comparison ${i + 1}`);
    if (i < content.predictions.length - 1) App.stopNextPrediction();
  });
  assert.equal(App.stoppingDone(index), true);
  let drawn = 0;
  for (const surface of SURFACES) {
    App.stopSet("surface", surface);
    for (const reaction of REACTION_TIMES_S) {
      App.stopSet("reaction", String(reaction));
      for (let i = 0; i < SPEEDS_KMH.length; i++) App.stopSpeed(-1);
      for (let i = 0; i < SPEEDS_KMH.length; i++) {
        assertToScale(element("sx-figure").innerHTML, `${surface}/${reaction}s/${SPEEDS_KMH[i]}km/h`);
        drawn++;
        App.stopSpeed(1);
      }
    }
  }
  assert.equal(drawn, SURFACES.length * REACTION_TIMES_S.length * SPEEDS_KMH.length, "every offered setting was drawn");

  // The other scenes: following (two cars) and the blind bend, main view and comparisons.
  steps.forEach((step, i) => {
    if (step.kind !== "stopping" || i === index) return;
    App.stoppingStepHtml(step, i);
    App.mountStopping(step, i);
    assertToScale(element("sx-figure").innerHTML, `${step.scene} main view`);
    step.predictions.forEach((p, n) => {
      App.stopPick(p.answer);
      App.stopCheck();
      assertToScale(element("sx-predict").innerHTML, `${step.scene} comparison ${n + 1}`);
      if (n < step.predictions.length - 1) App.stopNextPrediction();
    });
  });
});

test("the explorer asks for a prediction before it compares, and unlocks controls only after", () => {
  const { App, element, steps } = loadExplorer();
  const index = steps.findIndex((s) => s.kind === "stopping" && s.scene === "hazard");
  const content = steps[index] as StoppingStep;
  App.stoppingStepHtml(content, index);
  App.mountStopping(content, index);
  assert.doesNotMatch(element("sx-predict").innerHTML, /sx-compare/, "no comparison before a prediction");
  assert.match(element("sx-controls").innerHTML, /sx-locked/, "controls locked at first");
  assert.equal(App.stoppingDone(index), false);

  const wrong = content.predictions[0].answer === 0 ? 1 : 0;
  App.stopPick(wrong);
  App.stopCheck();
  assert.match(element("sx-predict").innerHTML, /sx-verdict is-wrong/);
  assert.match(element("sx-predict").innerHTML, /sx-compare/, "the comparison follows the prediction");
  App.stopNextPrediction();
  App.stopPick(content.predictions[1].answer);
  App.stopCheck();
  assert.match(element("sx-predict").innerHTML, /sx-verdict is-right/);
  assert.equal(App.stoppingDone(index), true);
  assert.match(element("sx-controls").innerHTML, /sx-speed-btn/, "controls unlocked");
  assert.match(element("sx-controls").innerHTML, /type="radio"/, "reaction time is a radio group: taps and keyboard");
});

test("reduced motion removes playback but keeps manual steps; the client holds no physics", () => {
  const { App, element, steps } = loadExplorer(true);
  const index = steps.findIndex((s) => s.kind === "stopping" && s.scene === "hazard");
  App.stoppingStepHtml(steps[index], index);
  App.mountStopping(steps[index], index);
  assert.doesNotMatch(element("sx-stepper").innerHTML, /sx-play/, "no playback with reduced motion");
  assert.match(element("sx-stepper").innerHTML, /App\.stopStep\(1\)/, "manual stepping stays");
  App.stopStep(3);
  assert.match(element("sx-figure").innerHTML, /sx-bracket/, "the last step shows the total statically");

  assert.match(EXPLORER, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(EXPLORER, /[\/*]\s*3\.6|9\.81|\b0\.7\b/, "no copy of the model's constants or formulas");
  assert.doesNotMatch(EXPLORER, /pointermove|mousemove|touchmove|draggable/, "nothing depends on dragging");
  const shell = readFileSync("src/app/shell.tsx", "utf8");
  assert.match(shell, /<script src="\/js\/stopping\.js"><\/script>[\s\S]*<script src="\/js\/learn\.js"><\/script>/, "stopping.js loads before learn.js");
});
