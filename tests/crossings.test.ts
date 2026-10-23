import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import worker from "../src/index.js";
import { CHAPTERS, PILOT_CHAPTER, lessonLinkForSourceId, relatedSourceIds, type Crossing, type OrderEvidence } from "../src/content/lessons.js";
import { CROSSINGS } from "../src/content/crossings.js";
import { INCROCI_CHAPTER } from "../src/content/lessons-incroci.js";
import { buildTodayPath, checkPassageOrder, summarizeLessons } from "../src/lib/learning.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

const phaseOf = (crossing: Crossing) =>
  new Map(crossing.phases.flatMap((group, index) => group.map((id) => [id, index] as const)));

/** Does a bank statement's claim hold under the verified phases? */
function claimHolds(crossing: Crossing, evidence: OrderEvidence): boolean {
  const phase = phaseOf(crossing);
  return (
    (evidence.before ?? []).every(([a, b]) => (phase.get(a) ?? -1) < (phase.get(b) ?? -1)) &&
    (evidence.together ?? []).every(([a, b]) => phase.get(a) === phase.get(b))
  );
}

/** Turn of a vehicle from its arms' angles: left is counter-clockwise. */
function turnOf(crossing: Crossing, from: string, to: string): "straight" | "left" | "right" {
  const angle = (id: string) => crossing.arms.find((arm) => arm.id === id)?.angle ?? NaN;
  const delta = (((angle(to) - (angle(from) + 180)) % 360) + 540) % 360 - 180;
  return Math.abs(delta) < 20 ? "straight" : delta > 0 ? "left" : "right";
}

// ── Scenario integrity ───────────────────────────────────────────────────────

test("every scenario is internally consistent with its drawing", () => {
  for (const crossing of CROSSINGS) {
    const armIds = new Set(crossing.arms.map((arm) => arm.id));
    const active = crossing.vehicles.filter((v) => !v.leaving).map((v) => v.id);
    assert.deepEqual(crossing.phases.flat().sort(), [...active].sort(), `${crossing.id}: phases list every active vehicle once`);
    assert.equal(crossing.explain.length, crossing.phases.length, `${crossing.id}: one explanation per phase`);
    for (const vehicle of crossing.vehicles) {
      assert.ok(armIds.has(vehicle.from) && armIds.has(vehicle.to), `${crossing.id}/${vehicle.id}: arms exist`);
      assert.equal(vehicle.move, turnOf(crossing, vehicle.from, vehicle.to), `${crossing.id}/${vehicle.id}: move matches the geometry`);
    }
    for (const id of crossing.phases.slice(1).flat()) {
      assert.ok(crossing.waits[id]?.includes(id), `${crossing.id}/${id}: explains why it waits`);
    }
    for (const step of crossing.explain) {
      for (const arm of step.signs ?? []) {
        assert.ok(crossing.arms.find((a) => a.id === arm)?.sign, `${crossing.id}: highlighted arm ${arm} has a sign`);
      }
    }
  }
});

test("each scenario's order is the bank's: VERO statements hold, FALSO ones break, and VERO alone fixes the order", () => {
  for (const crossing of CROSSINGS) {
    const letters = new Set(crossing.vehicles.map((v) => v.id));
    for (const evidence of crossing.evidence) {
      // Constraints only use real vehicles, and every vehicle the statement
      // names is in a constraint ("prima degli altri" may imply the rest).
      const constrained = new Set([...(evidence.before ?? []), ...(evidence.together ?? [])].flat());
      for (const id of constrained) assert.ok(letters.has(id), `${evidence.sourceId}: ${id} is a vehicle in the figure`);
      for (const id of evidence.textIt.match(/\b[A-Z]\b/g) ?? []) {
        assert.ok(constrained.has(id), `${evidence.sourceId}: ${id} is named in the statement but not constrained`);
      }
      assert.equal(claimHolds(crossing, evidence), evidence.answer === 1, `${crossing.id}: ${evidence.sourceId} (${evidence.answer ? "VERO" : "FALSO"})`);
    }
    assert.ok(crossing.evidence.some((e) => e.answer === 0), `${crossing.id}: at least one FALSO statement is checked too`);

    // The transitive closure of the VERO "before" constraints must decide every
    // pair in different phases, and VERO "together" every pair in the same one.
    const vero = crossing.evidence.filter((e) => e.answer === 1);
    const before = new Set(vero.flatMap((e) => (e.before ?? []).map(([a, b]) => `${a}>${b}`)));
    const ids = crossing.phases.flat();
    for (const k of ids) for (const i of ids) for (const j of ids) {
      if (before.has(`${i}>${k}`) && before.has(`${k}>${j}`)) before.add(`${i}>${j}`);
    }
    const together = new Set(vero.flatMap((e) => (e.together ?? []).flatMap(([a, b]) => [`${a}=${b}`, `${b}=${a}`])));
    const phase = phaseOf(crossing);
    for (const a of ids) {
      for (const b of ids) {
        if (a === b) continue;
        const pa = phase.get(a) ?? 0;
        const pb = phase.get(b) ?? 0;
        if (pa < pb) assert.ok(before.has(`${a}>${b}`), `${crossing.id}: a VERO statement puts ${a} before ${b}`);
        if (pa === pb) assert.ok(together.has(`${a}=${b}`), `${crossing.id}: a VERO statement puts ${a} with ${b}`);
      }
    }
  }
});

test("every scenario used by a lesson is one of the verified scenarios", () => {
  const verified = new Set(CROSSINGS);
  for (const lesson of INCROCI_CHAPTER.lessons) {
    for (const step of lesson.steps) {
      if (step.kind === "order" || step.kind === "scenario") assert.ok(verified.has(step.crossing), `${lesson.id}: ${step.title}`);
      if (step.kind === "scenario") {
        const letters = new Set(step.crossing.vehicles.map((v) => v.id));
        const arms = new Set(step.crossing.arms.map((a) => a.id));
        for (const g of step.guide) {
          g.focus.forEach((id) => assert.ok(letters.has(id), `${lesson.id}: guide focuses ${id}`));
          (g.arms ?? []).forEach((id) => assert.ok(arms.has(id), `${lesson.id}: guide highlights arm ${id}`));
        }
      }
    }
  }
});

// ── Order check ──────────────────────────────────────────────────────────────

test("the order check accepts the verified order and either order inside a simultaneous phase", () => {
  const phases = [["L"], ["C", "A"], ["D"]];
  assert.deepEqual(checkPassageOrder(phases, ["L", "C", "A", "D"]), { valid: true, mistake: null });
  assert.deepEqual(checkPassageOrder(phases, ["L", "A", "C", "D"]), { valid: true, mistake: null });
});

test("the order check names the first vehicle picked too early and who it had to wait for", () => {
  const phases = [["H"], ["D"], ["B"], ["L"]];
  assert.deepEqual(checkPassageOrder(phases, ["H", "D", "L", "B"]), { valid: false, mistake: { vehicle: "L", waitsFor: ["B"] } });
  assert.deepEqual(checkPassageOrder(phases, ["L", "B", "D", "H"]), {
    valid: false,
    mistake: { vehicle: "L", waitsFor: ["B", "D", "H"] },
  });
});

test("the order check rejects anything that is not one pick per vehicle", () => {
  const phases = [["R"], ["A"], ["T"]];
  for (const bad of [[], ["R", "A"], ["R", "A", "A"], ["R", "A", "T", "T"], ["R", "A", "X"]]) {
    assert.equal(checkPassageOrder(phases, bad), null, JSON.stringify(bad));
  }
});

// ── Today's path across chapters ─────────────────────────────────────────────

test("after the pilot chapter, today's path recommends the intersections chapter", () => {
  const done = (chapter: typeof PILOT_CHAPTER) =>
    chapter.lessons.map((l) => ({ lesson_id: l.id, step: 99, started_at: "", updated_at: "2026-10-01 09:00:00", completed_at: "2026-10-01 09:00:00" }));
  const lessons = [
    ...summarizeLessons(PILOT_CHAPTER, done(PILOT_CHAPTER), [], []),
    ...summarizeLessons(INCROCI_CHAPTER, [], [], []),
  ];
  const path = buildTodayPath(lessons, 0);
  assert.deepEqual(path.items.map((i) => i.kind), ["lesson", "practice"]);
  assert.ok(path.items[0].kind === "lesson" && path.items[0].lessonId === INCROCI_CHAPTER.lessons[0].id);
});

test("a learner who opened the intersections chapter directly keeps going there, without redoing old lessons", () => {
  const [pilot1] = PILOT_CHAPTER.lessons;
  const [inc1, inc2] = INCROCI_CHAPTER.lessons;
  const lessons = [
    ...summarizeLessons(
      PILOT_CHAPTER,
      [{ lesson_id: pilot1.id, step: 99, started_at: "", updated_at: "2026-09-27 09:00:00", completed_at: "2026-09-27 09:00:00" }],
      [],
      []
    ),
    ...summarizeLessons(
      INCROCI_CHAPTER,
      [{ lesson_id: inc1.id, step: 99, started_at: "", updated_at: "2026-10-05 09:00:00", completed_at: "2026-10-05 09:00:00" }],
      [],
      []
    ),
  ];
  const path = buildTodayPath(lessons, 0);
  assert.ok(path.items[0].kind === "lesson" && path.items[0].lessonId === inc2.id, "continues the chapter touched last");
  const practice = path.items.find((i) => i.kind === "practice");
  assert.ok(practice && practice.kind === "practice");
  assert.deepEqual(practice.lessonIds.sort(), [pilot1.id, inc1.id].sort(), "practice draws from both completed lessons");
});

// ── API ──────────────────────────────────────────────────────────────────────

const BOT_TOKEN = "123456:crossing-test";
const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;

function setup() {
  const { db, raw } = createSqliteD1();
  raw.prepare(`INSERT INTO topics (id, name_it, name_fa, sort_order) VALUES (4, 'Segnali di precedenza', 'علائم اولویت', 4)`).run();
  const insert = raw.prepare(`INSERT INTO questions (id, source_id, topic_id, text_it, correct_answer, image_url) VALUES (?, ?, 4, ?, ?, NULL)`);
  const lessons = CHAPTERS.flatMap((chapter) => chapter.lessons);
  const practice = new Map(lessons.flatMap((lesson) => lesson.practice.map((q) => [q.sourceId, q] as const)));
  for (const sourceId of new Set(lessons.flatMap(relatedSourceIds))) {
    const q = practice.get(sourceId);
    insert.run(Number(sourceId), sourceId, q ? q.textIt : `Bank statement ${sourceId}`, q ? q.answer : 1);
  }
  const user = raw.prepare(`INSERT INTO users (id, telegram_user_id, first_name, is_approved) VALUES (?, ?, ?, 1)`);
  user.run(1, 7001, "A");
  user.run(2, 7002, "B");
  const env = { DB: db, TELEGRAM_BOT_TOKEN: BOT_TOKEN, ALLOWED_TELEGRAM_USER_IDS: "1", PRIMARY_ADMIN_TELEGRAM_USER_ID: "1", LOG_CHANNEL_ID: "-100" } as AppEnv;
  return async (telegramId: number | null, method: string, path: string, body?: unknown) => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (telegramId !== null) headers["X-Telegram-InitData"] = signedInitData(BOT_TOKEN, telegramId);
    const response = await worker.fetch(
      new Request(`https://example.test/api${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) }),
      env,
      ctx
    );
    return { status: response.status, body: (await response.json()) as Record<string, any> };
  };
}

const [, LESSON_2, LESSON_3] = INCROCI_CHAPTER.lessons;
const orderStep = (lesson: typeof LESSON_2) => lesson.steps.findIndex((step) => step.kind === "order");

test("the intersections chapter is listed, opens directly, and points mistakes back to its lessons", async () => {
  const call = setup();
  const home = await call(7001, "GET", "/learn");
  const incroci = home.body.chapters.find((c: { id: string }) => c.id === INCROCI_CHAPTER.id);
  assert.deepEqual(incroci.numbers, [14]);
  assert.equal(incroci.lessons.length, 4);

  const lesson = await call(7001, "GET", `/learn/lessons/${LESSON_2.id}`);
  assert.equal(lesson.status, 200);
  assert.equal(lesson.body.chapter.id, INCROCI_CHAPTER.id);
  assert.deepEqual(lesson.body.position, { index: 2, total: 4, review: false });
  assert.equal(lesson.body.lesson.practice.length, LESSON_2.practice.length);
  assert.ok(lesson.body.lesson.practice.every((q: { isFigure: boolean }) => q.isFigure));
  assert.equal(lesson.body.lesson.steps[orderStep(LESSON_2)].crossing.figure, 614);

  assert.equal(lessonLinkForSourceId("4910")?.lessonId, INCROCI_CHAPTER.lessons[3].id, "655 order statement → lesson 4");
  assert.equal(lessonLinkForSourceId("4840"), null, "circular figure 638 stays unmapped");

  // Official order: the chapter before 14 in the course (11–12) hands over to it.
  const before = CHAPTERS[CHAPTERS.indexOf(INCROCI_CHAPTER) - 1];
  const beforeLast = await call(7001, "GET", `/learn/lessons/${before.lessons.at(-1)!.id}`);
  assert.deepEqual(beforeLast.body.next, {
    lessonId: INCROCI_CHAPTER.lessons[0].id,
    titleFa: INCROCI_CHAPTER.lessons[0].titleFa,
    chapterTitleFa: INCROCI_CHAPTER.titleFa,
    chapterNumbers: [14],
  });
});

test("the order endpoint gives the verified verdict and validates its input", async () => {
  const call = setup();
  const path = `/learn/lessons/${LESSON_3.id}/order`;
  const step = orderStep(LESSON_3);

  const right = await call(7001, "POST", path, { step, sequence: ["H", "D", "B", "L"] });
  assert.equal(right.status, 200);
  assert.deepEqual([right.body.valid, right.body.mistake], [true, null]);
  assert.deepEqual(right.body.phases, [["H"], ["D"], ["B"], ["L"]]);

  const wrong = await call(7001, "POST", path, { step, sequence: ["H", "D", "L", "B"] });
  assert.deepEqual([wrong.body.valid, wrong.body.mistake], [false, { vehicle: "L", waitsFor: ["B"] }]);

  const together = await call(7001, "POST", path, { step: step + 1, sequence: ["L", "A", "C", "D"] });
  assert.equal(together.body.valid, true, "C and A move together, so either order is accepted");

  for (const bad of [
    { step, sequence: ["H", "D", "B"] },
    { step, sequence: ["H", "D", "B", "B"] },
    { step, sequence: "H,D,B,L" },
    { step: 0, sequence: ["H", "D", "B", "L"] },
    { step: 99, sequence: ["H", "D", "B", "L"] },
    {},
  ]) {
    assert.equal((await call(7001, "POST", path, bad)).status, 400, JSON.stringify(bad));
  }
  assert.equal((await call(7001, "POST", "/learn/lessons/nope/order", { step, sequence: [] })).status, 404);
  assert.equal((await call(null, "POST", path, { step, sequence: ["H", "D", "B", "L"] })).status, 401);
});

test("progress in the new chapter is per learner and survives reopening", async () => {
  const call = setup();
  const base = `/learn/lessons/${LESSON_2.id}`;
  assert.equal((await call(7001, "POST", `${base}/progress`, { step: 3 })).body.step, 3);
  const reopened = await call(7001, "GET", base);
  assert.deepEqual([reopened.body.progress.state, reopened.body.progress.step], ["in_progress", 3]);
  const other = await call(7002, "GET", base);
  assert.deepEqual(other.body.progress, { state: "not_started", step: 0, completedAt: null });

  const home = await call(7001, "GET", "/learn");
  assert.ok(home.body.today.items[0].lessonId === LESSON_2.id && home.body.today.items[0].mode === "continue");
});

// ── Client wiring ─────────────────────────────────────────────────────────────

test("the crossing client is loaded, works without animation, and never decides the order itself", () => {
  const shell = readFileSync("src/app/shell.tsx", "utf8");
  const client = readFileSync("public/js/crossing.js", "utf8");
  assert.match(shell, /<script src="\/js\/crossing\.js"><\/script>[\s\S]*<script src="\/js\/learn\.js"><\/script>/, "crossing.js loads before learn.js");
  assert.match(client, /prefers-reduced-motion: reduce/);
  assert.match(client, /\/order', \{ step: /, "the verdict comes from the server");
  // The verdict shown is the server's response; the client never computes one.
  assert.match(client, /u\.result = res;/);
  assert.doesNotMatch(client, /\bvalid\s*[:=]/, "no client-side copy of the order rule");
});
