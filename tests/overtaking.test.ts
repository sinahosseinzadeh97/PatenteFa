import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

import worker from "../src/index.js";
import {
  CHAPTERS,
  lessonLinkForSourceId,
  relatedSourceIds,
  type AssessRule,
  type AssessScene,
  type LessonStep,
  type SafetyCheck,
  type SceneDraw,
} from "../src/content/lessons.js";
import { ASSESS_RULES, ASSESS_SCENES } from "../src/content/overtaking.js";
import { SORPASSO_CHAPTER } from "../src/content/lessons-sorpasso.js";
import { VELOCITA_CHAPTER } from "../src/content/lessons-velocita.js";
import { assessAnswer, buildTodayPath, judgeScene, summarizeLessons } from "../src/lib/learning.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

const LESSONS = SORPASSO_CHAPTER.lessons;
const [L1, L2, L3, L4] = LESSONS;
const CHECKS: SafetyCheck[] = ["visibility", "ahead", "behind", "space"];
const variants = (scene: AssessScene) => [
  { name: `${scene.id}/base`, facts: scene.facts, expect: scene.expect },
  { name: `${scene.id}/compare`, facts: scene.compare.facts, expect: scene.compare.expect },
];
const ALL_VARIANTS = ASSESS_SCENES.flatMap(variants);
const stepOf = <K extends LessonStep["kind"]>(kind: K) =>
  LESSONS.flatMap((lesson) => lesson.steps.filter((step): step is Extract<LessonStep, { kind: K }> => step.kind === kind));

// ── Rules: every one rests on the law and on the bank ───────────────────────

test("every rule cites the law and at least one VERO bank statement that agrees with it", () => {
  for (const rule of ASSESS_RULES) {
    assert.match(rule.law, /^(Codice della Strada|DPR 495\/1992), art\. \d+/, `${rule.id} cites an article`);
    assert.ok(rule.legal || rule.safety, `${rule.id} affects at least one question`);
    assert.ok(rule.evidence.some((e) => e.agrees && e.answer === 1), `${rule.id} has an agreeing VERO statement`);
    for (const e of rule.evidence) {
      // Our reading must match the answer key: a statement we read as agreeing is VERO, a contradicting one FALSO.
      assert.equal(e.answer, e.agrees ? 1 : 0, `${rule.id}: ${e.sourceId} is ${e.answer ? "VERO" : "FALSO"} but marked agrees=${e.agrees}`);
    }
    assert.ok(rule.fact.length > 15 && rule.explain.length > 40, `${rule.id} states the fact and explains it`);
    assert.ok(rule.marks.length > 0, `${rule.id} points at something on the drawing`);
    if (Object.keys(rule.draw).length === 0) assert.equal(rule.textOnly, true, `${rule.id} cannot be drawn, so the text says so`);
  }
  assert.equal(new Set(ASSESS_RULES.map((r) => r.id)).size, ASSESS_RULES.length, "rule ids are unique");
});

// ── Scenes: the reviewed answers are what the rules derive ──────────────────

test("every scene's reviewed answers are exactly what its rules derive, for the scene and its comparison", () => {
  for (const v of ALL_VARIANTS) {
    const judged = judgeScene(v.facts);
    assert.deepEqual({ legal: judged.legal.answer, safety: judged.safety.answer }, v.expect, v.name);
  }
});

test("a comparison scene changes exactly one fact, and that change changes at least one answer", () => {
  for (const scene of ASSESS_SCENES) {
    assert.equal(scene.compare.facts.length, scene.facts.length, `${scene.id}: same number of facts`);
    const changed = scene.facts.filter((rule, i) => scene.compare.facts[i] !== rule);
    assert.equal(changed.length, 1, `${scene.id}: exactly one fact differs`);
    assert.notDeepEqual(scene.compare.expect, scene.expect, `${scene.id}: the comparison teaches a different verdict`);
    assert.ok(scene.compare.change.startsWith("فقط"), `${scene.id}: the change is named as the only one`);
  }
});

test("scenes are self-contained: every art. 148 c.2 check and the centre line are stated, never left to guess", () => {
  for (const v of ALL_VARIANTS) {
    const addressed = new Set(v.facts.flatMap((rule) => rule.safety?.checks ?? []));
    for (const check of CHECKS) assert.ok(addressed.has(check), `${v.name}: says something about "${check}"`);
    const perCheck = CHECKS.map((check) => v.facts.filter((rule) => rule.safety?.checks.includes(check)).length);
    assert.ok(perCheck.every((n) => n === 1), `${v.name}: each check is settled by exactly one fact`);
    assert.ok(v.facts.some((rule) => rule.draw.line), `${v.name}: states its centre line`);
  }
});

test("a drawing shows only what the facts state, and no two facts contradict it", () => {
  for (const v of ALL_VARIANTS) {
    const merged: Record<string, unknown> = {};
    for (const rule of v.facts) {
      for (const [key, value] of Object.entries(rule.draw) as [keyof SceneDraw, unknown][]) {
        assert.ok(merged[key] === undefined || merged[key] === value, `${v.name}: ${key} drawn two ways`);
        merged[key] = value;
      }
    }
  }
});

test("every answer option is the right one somewhere, so none is a trick that is never correct", () => {
  const legal = new Set(ALL_VARIANTS.map((v) => v.expect.legal));
  const safety = new Set(ALL_VARIANTS.map((v) => v.expect.safety));
  assert.deepEqual([...legal].sort(), ["forbidden", "not_forbidden"]);
  assert.deepEqual([...safety].sort(), ["clear", "fails", "unknown"]);
  assert.ok(ALL_VARIANTS.some((v) => v.expect.legal === "not_forbidden" && v.expect.safety !== "clear"), "'not forbidden' is shown to differ from 'safe'");
  assert.ok(ALL_VARIANTS.some((v) => v.expect.legal === "forbidden" && v.expect.safety === "clear"), "'looks safe' is shown to differ from 'allowed'");
});

test("scenes give no distances or speeds: there is no gap calculator to trust", () => {
  for (const rule of ASSESS_RULES) {
    for (const text of [rule.fact, rule.explain]) assert.doesNotMatch(text, /[0-9۰-۹]/, `${rule.id}: no numbers in what the learner reads`);
  }
  for (const scene of ASSESS_SCENES) assert.doesNotMatch(scene.setting + scene.compare.change, /[0-9۰-۹]/, scene.id);
});

test("the exercise uses only the reviewed scenes and rules", () => {
  const scenes = new Set(ASSESS_SCENES);
  const rules = new Set(ASSESS_RULES);
  const used = stepOf("assess").flatMap((step) => step.scenes);
  assert.equal(used.length, ASSESS_SCENES.length);
  for (const scene of used) {
    assert.ok(scenes.has(scene), scene.id);
    for (const rule of [...scene.facts, ...scene.compare.facts]) assert.ok(rules.has(rule), `${scene.id}: ${rule.id}`);
  }
});

// ── The verdict logic itself ─────────────────────────────────────────────────

const rule = (id: string) => ASSESS_RULES.find((r) => r.id === id) as AssessRule;

test("one prohibition is enough: the law answer is 'forbidden' however good the rest looks", () => {
  const judged = judgeScene([rule("line-dashed"), rule("sign-car-ahead"), rule("road-ahead-clear")]);
  assert.deepEqual(judged.legal, { answer: "forbidden", decisive: [1] });
  assert.deepEqual(judgeScene([rule("line-dashed")]).legal, { answer: "not_forbidden", decisive: [0] });
});

test("safety: a failed check beats a missing one; a missing or unknown check means 'not enough information'", () => {
  const ok = [rule("road-ahead-clear"), rule("ahead-not-signalling"), rule("behind-checked")];
  assert.deepEqual(judgeScene(ok).safety, { answer: "clear", decisive: [0, 1, 2], missing: [] });
  assert.deepEqual(judgeScene(ok.slice(0, 2)).safety, { answer: "unknown", decisive: [], missing: ["behind"] }, "an unstated check is not assumed fine");
  assert.deepEqual(judgeScene([...ok.slice(0, 2), rule("behind-unknown")]).safety, { answer: "unknown", decisive: [2], missing: ["behind"] });
  assert.deepEqual(judgeScene([rule("view-blocked"), rule("behind-unknown")]).safety, { answer: "fails", decisive: [0], missing: ["ahead", "behind"] });
});

test("a wrong answer gets the reason it is wrong; a right one gets none", () => {
  const facts = [rule("line-solid-near"), rule("road-ahead-clear"), rule("ahead-not-signalling"), rule("behind-unknown")];
  const wrong = assessAnswer(facts, { legal: "not_forbidden", safety: "clear" });
  assert.equal(wrong.legal.correct, false);
  assert.match(wrong.legal.note ?? "", /ممنوعیت/);
  assert.equal(wrong.safety.correct, false);
  assert.match(wrong.safety.note ?? "", /کسی پشتِ سرت سبقت را شروع نکرده باشد/, "the missing check is named");
  assert.deepEqual(wrong.safety.missing.map((m) => m.check), ["behind"]);
  assert.deepEqual(wrong.roles, ["forbids", "ok", "ok", "unknown"]);
  const right = assessAnswer(facts, { legal: "forbidden", safety: "unknown" });
  assert.deepEqual([right.legal.correct, right.legal.note, right.safety.correct, right.safety.note], [true, null, true, null]);
  for (const chosen of ["fails", "unknown", "clear"] as const) {
    const res = assessAnswer([rule("line-dashed"), rule("view-blocked"), rule("ahead-not-signalling"), rule("behind-checked")], { legal: "not_forbidden", safety: chosen });
    assert.equal(res.safety.note === null, chosen === "fails", `chosen ${chosen}`);
    assert.doesNotMatch(res.safety.note ?? "", /\{missing\}/);
  }
});

// ── Centre lines: the stripe next to you decides (CdS art. 40 c.4, c.8) ──────

test("who may cross each centre line follows art. 40 and every bank statement about it", () => {
  const [markings] = stepOf("markings");
  assert.ok(markings, "lesson 1 has the markings step");
  for (const line of markings.lines) {
    const lower = line.stripes[0];
    const upper = line.stripes[line.stripes.length - 1];
    assert.deepEqual(line.cross, { lower: lower === "dashed", upper: upper === "dashed" }, `${line.id}: the nearest stripe decides`);
    for (const e of line.evidence) {
      assert.ok([lower, upper].includes(e.adjacent), `${line.id}: ${e.sourceId} is read from a side the line has`);
      const holds = e.claimsCrossable === (e.adjacent === "dashed");
      assert.equal(e.answer, holds ? 1 : 0, `${line.id}: ${e.sourceId} (${e.answer ? "VERO" : "FALSO"})`);
      assert.equal(e.agrees, holds, `${line.id}: ${e.sourceId} agrees flag`);
    }
  }
  const mixed = markings.lines.find((l) => l.stripes.length === 2 && l.stripes[0] !== l.stripes[1]);
  assert.ok(mixed && mixed.cross.lower !== mixed.cross.upper, "the mixed line reads differently from each side");
});

// ── The manoeuvre: a reviewed sequence ───────────────────────────────────────

test("the manoeuvre runs check → signal and move left → pass → mirror and signal right → return", () => {
  const [step] = stepOf("manoeuvre");
  assert.equal(step.stages.length, 5);
  const lanes = step.stages.map((s) => s.pose.you[1]);
  assert.deepEqual(lanes, [0, 1, 1, 1, 0], "out to the left lane and back");
  assert.deepEqual(step.stages.map((s) => s.indicator), ["off", "left", "off", "right", "right"], "signal before each lane change");
  const you = step.stages.map((s) => s.pose.you[0]);
  const other = step.stages.map((s) => s.pose.other[0]);
  you.slice(1).forEach((x, i) => assert.ok(x > you[i], "you move forward every stage"));
  other.slice(1).forEach((x, i) => assert.ok(x >= other[i], "the other car never moves backwards"));
  assert.ok(you[0] < other[0] && you[1] < other[1], "you start and move out behind it");
  assert.ok(you[2] > other[2], "you are past it before you prepare to return");
  assert.ok(you[4] - other[4] > you[3] - other[3], "you return with more room than when you signalled");
  assert.ok(step.stages[0].marks.includes("mirror") && step.stages[3].marks.includes("mirror"), "mirrors before leaving and before returning");
  assert.ok(step.stages[2].marks.includes("gap"), "lateral distance shown while passing");
  for (const stage of step.stages) assert.match(stage.rule, /Codice della Strada, art\. 148/);
});

// ── Chapter integration ──────────────────────────────────────────────────────

test("the chapter is last (official chapter 15), offered on the overtaking and road-marking topics, with four lessons", () => {
  assert.equal(CHAPTERS.at(-1), SORPASSO_CHAPTER);
  assert.deepEqual(SORPASSO_CHAPTER.numbers, [15]);
  assert.deepEqual(SORPASSO_CHAPTER.topicIds, [12, 5]);
  assert.equal(LESSONS.length, 4);
  assert.deepEqual(
    LESSONS.map((l) => l.steps.find((s) => ["markings", "assess", "manoeuvre"].includes(s.kind))?.kind),
    ["markings", "assess", "assess", "manoeuvre"]
  );
  assert.match(SORPASSO_CHAPTER.reviewedOn, /^2026-10-10$/);
  assert.ok(SORPASSO_CHAPTER.sources.some((s) => s.url.includes("normattiva.it")));
});

test("mistakes route to the section that teaches them; out-of-scope questions stay unmapped", () => {
  const route = (id: string) => {
    const link = lessonLinkForSourceId(id);
    return link && `${link.lessonId}#${link.step}`;
  };
  assert.equal(route("2466"), `${L1.id}#1`, "mixed line (fig. 566) → reading lines");
  assert.equal(route("1240"), `${L2.id}#1`, "motorcycles under DIVIETO → the sign comparison");
  assert.equal(route("5139"), `${L3.id}#1`, "checking behind → the checks");
  assert.equal(route("5174"), `${L3.id}#2`, "crests → where it is forbidden");
  assert.equal(route("5918"), `${L4.id}#1`, "signal at the end too → the stages");
  assert.equal(route("5153"), `${L4.id}#2`, "the overtaken driver → their duties");
  for (const id of ["5163", "5165", "5214", "5162", "5223"]) assert.equal(route(id), null, `${id} is out of scope on purpose`);
  // The heavy-vehicle overtaking ban is out of this chapter's scope but taught by chapter 3.
  assert.equal(lessonLinkForSourceId("1310")?.lessonId, "divieti-sorpasso-veicoli-pesanti");
});

test("after the speed chapter, today's path and 'next lesson' lead into this chapter", () => {
  const done = (chapter: typeof VELOCITA_CHAPTER) =>
    chapter.lessons.map((l) => ({ lesson_id: l.id, step: 99, started_at: "", updated_at: "2026-10-10 09:00:00", completed_at: "2026-10-10 09:00:00" }));
  const summaries = CHAPTERS.flatMap((chapter) => summarizeLessons(chapter, chapter === SORPASSO_CHAPTER ? [] : done(chapter), [], []));
  const first = buildTodayPath(summaries, 0).items[0];
  assert.ok(first.kind === "lesson" && first.lessonId === L1.id);
});

// ── API ──────────────────────────────────────────────────────────────────────

const BOT = "123456:overtaking-test";
const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;

function setup() {
  const { db, raw } = createSqliteD1();
  raw.prepare(`INSERT INTO topics (id, name_it, name_fa, sort_order) VALUES (12, 'Sorpasso', 'سبقت', 12)`).run();
  const insert = raw.prepare(`INSERT INTO questions (id, source_id, topic_id, text_it, correct_answer, image_url) VALUES (?, ?, 12, ?, ?, NULL)`);
  const lessons = CHAPTERS.flatMap((c) => c.lessons);
  const practice = new Map(lessons.flatMap((l) => l.practice.map((q) => [q.sourceId, q] as const)));
  for (const id of new Set(lessons.flatMap(relatedSourceIds))) {
    const q = practice.get(id);
    insert.run(Number(id), id, q ? q.textIt : `Bank statement ${id}`, q ? q.answer : 1);
  }
  const user = raw.prepare(`INSERT INTO users (id, telegram_user_id, first_name, is_approved) VALUES (?, ?, ?, 1)`);
  user.run(1, 9401, "A");
  user.run(2, 9402, "B");
  const env = { DB: db, TELEGRAM_BOT_TOKEN: BOT, ALLOWED_TELEGRAM_USER_IDS: "1", PRIMARY_ADMIN_TELEGRAM_USER_ID: "1", LOG_CHANNEL_ID: "-100" } as AppEnv;
  const call = async (telegramId: number | null, method: string, path: string, body?: unknown) => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (telegramId !== null) headers["X-Telegram-InitData"] = signedInitData(BOT, telegramId);
    const response = await worker.fetch(
      new Request(`https://example.test/api${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) }),
      env,
      ctx
    );
    return { status: response.status, body: (await response.json()) as Record<string, any> };
  };
  return { call, raw };
}

const assessStep = (lesson: typeof L2) => lesson.steps.findIndex((s) => s.kind === "assess");

test("the assess endpoint judges right, wrong and 'not enough information' answers, and the comparison scenes", async () => {
  const { call } = setup();
  const path = `/learn/lessons/${L2.id}/assess`;
  const step = assessStep(L2);

  const wrong = await call(9401, "POST", path, { step, scene: 0, variant: "base", legal: "not_forbidden", safety: "clear" });
  assert.equal(wrong.status, 200);
  assert.deepEqual([wrong.body.legal.answer, wrong.body.legal.correct, wrong.body.safety.correct], ["forbidden", false, true]);
  assert.ok(wrong.body.legal.note.length > 20);
  assert.deepEqual(wrong.body.legal.decisive, [0], "the sign decides");

  const compare = await call(9401, "POST", path, { step, scene: 0, variant: "compare", legal: "not_forbidden", safety: "clear" });
  assert.deepEqual([compare.body.legal.correct, compare.body.safety.correct], [true, true], "a motorcycle is not covered by the sign");

  const unknown = await call(9401, "POST", path, { step, scene: 1, variant: "base", legal: "forbidden", safety: "unknown" });
  assert.deepEqual([unknown.body.legal.correct, unknown.body.safety.correct], [true, true]);
  assert.deepEqual(unknown.body.safety.missing.map((m: { check: string }) => m.check), ["behind"]);

  const l3 = `/learn/lessons/${L3.id}/assess`;
  const truck = await call(9401, "POST", l3, { step: assessStep(L3), scene: 0, variant: "base", legal: "not_forbidden", safety: "unknown" });
  assert.deepEqual([truck.body.safety.answer, truck.body.safety.correct], ["fails", false], "not seeing is a failed check, not missing information");
  const clear = await call(9401, "POST", l3, { step: assessStep(L3), scene: 0, variant: "compare", legal: "not_forbidden", safety: "clear" });
  assert.equal(clear.body.safety.correct, true);

  for (const bad of [
    { step, scene: 0, variant: "base", legal: "maybe", safety: "clear" },
    { step, scene: 0, variant: "base", legal: "forbidden", safety: "safe" },
    { step, scene: 0, variant: "both", legal: "forbidden", safety: "clear" },
    { step, scene: 9, variant: "base", legal: "forbidden", safety: "clear" },
    { step, scene: -1, variant: "base", legal: "forbidden", safety: "clear" },
    { step: 0, scene: 0, variant: "base", legal: "forbidden", safety: "clear" },
    { step: 1.5, scene: 0, variant: "base", legal: "forbidden", safety: "clear" },
    {},
  ]) {
    assert.equal((await call(9401, "POST", path, bad)).status, 400, JSON.stringify(bad));
  }
  assert.equal((await call(9401, "POST", "/learn/lessons/nope/assess", { step, scene: 0, variant: "base", legal: "forbidden", safety: "clear" })).status, 404);
  assert.equal((await call(null, "POST", path, { step, scene: 0, variant: "base", legal: "forbidden", safety: "clear" })).status, 401);
});

test("the chapter is listed, opens directly, and the last intersections lesson (chapter 14) hands over to it", async () => {
  const { call } = setup();
  const home = await call(9401, "GET", "/learn");
  assert.equal(home.body.chapters.at(-1).id, SORPASSO_CHAPTER.id);
  assert.equal(home.body.chapters.at(-1).lessons.length, 4);
  const lesson = await call(9401, "GET", `/learn/lessons/${L3.id}`);
  assert.equal(lesson.status, 200);
  assert.deepEqual(lesson.body.position, { index: 3, total: 4, review: false });
  assert.equal(lesson.body.lesson.practice.length, L3.practice.length);
  assert.equal(lesson.body.stopping, null);
  const lastIncroci = await call(9401, "GET", `/learn/lessons/${CHAPTERS.at(-2)!.lessons.at(-1)!.id}`);
  assert.deepEqual(lastIncroci.body.next, { lessonId: L1.id, titleFa: L1.titleFa, chapterTitleFa: SORPASSO_CHAPTER.titleFa, chapterNumbers: [15] });
});

test("progress and answers in this chapter are per learner, resume never moves back, and a wrong answer is queued once", async () => {
  const { call, raw } = setup();
  const base = `/learn/lessons/${L4.id}`;
  assert.equal((await call(9401, "POST", `${base}/progress`, { step: 3 })).body.step, 3);
  assert.equal((await call(9401, "POST", `${base}/progress`, { step: 1 })).body.step, 3, "a stale save cannot move the learner back");
  const opened = await call(9401, "GET", base);
  assert.deepEqual([opened.body.progress.state, opened.body.progress.step], ["in_progress", 3]);
  const q = opened.body.lesson.practice[0];
  for (let i = 0; i < 2; i++) await call(9401, "POST", `${base}/answer`, { questionId: q.questionId, answer: 1 - q.correctAnswer });
  assert.equal(raw.prepare(`SELECT COUNT(*) AS n FROM review_queue WHERE user_id = 1 AND question_id = ?`).get(q.questionId)?.n, 1);

  const theirs = await call(9402, "GET", base);
  assert.deepEqual([theirs.body.progress, theirs.body.answers], [{ state: "not_started", step: 0, completedAt: null }, {}]);
  assert.equal(raw.prepare(`SELECT COUNT(*) AS n FROM review_queue WHERE user_id = 2`).get()?.n, 0);
});

// ── Client: draws and labels, never decides ──────────────────────────────────

const CLIENT = readFileSync("public/js/overtaking.js", "utf8");

/** A tiny DOM: elements keep innerHTML and attributes; drawn marks are read back from the figure's SVG. */
function loadClient(options: { reduce?: boolean; api?: (method: string, path: string, body: any) => Promise<any> } = {}) {
  const elements = new Map<string, any>();
  const fake = (id: string) => {
    const attrs: Record<string, string> = {};
    const classes = new Set<string>();
    return {
      id, innerHTML: "", textContent: "", hidden: false, disabled: false,
      focus() {}, scrollIntoView() {},
      setAttribute(k: string, v: string) { attrs[k] = v; },
      getAttribute(k: string) { return attrs[k] ?? null; },
      classList: { toggle(c: string, on?: boolean) { if (on ?? !classes.has(c)) classes.add(c); else classes.delete(c); }, contains: (c: string) => classes.has(c) },
      querySelectorAll: () => [],
      attrs, classes,
    };
  };
  const element = (id: string) => {
    if (!elements.has(id)) elements.set(id, fake(id));
    return elements.get(id);
  };
  const marks = new Map<string, any>();
  const inds = ["left", "right"].map((side) => { const el = fake(side); el.classList.toggle(`is-${side}`, true); return el; });
  let rafCalls = 0;
  const svg = {
    querySelectorAll(selector: string) {
      if (selector === ".ov-ind") return inds;
      const found = [...element("ov-figure").innerHTML.matchAll(/data-mark="(\w+)"/g)].map((m) => {
        if (!marks.has(m[1])) { const el = fake(m[1]); el.setAttribute("data-mark", m[1]); marks.set(m[1], el); }
        return marks.get(m[1]);
      });
      return found;
    },
    setAttribute() {},
  };
  const steps = LESSONS.flatMap((l) => l.steps);
  const sandbox: Record<string, any> = {
    window: { matchMedia: () => ({ matches: !!options.reduce }) },
    document: {
      getElementById: element,
      querySelector: (s: string) => (s === ".ov-svg" || s === ".ov-man-svg" ? svg : null),
      querySelectorAll: () => [],
    },
    requestAnimationFrame: () => { rafCalls++; return 1; },
    cancelAnimationFrame: () => {},
    setTimeout: () => 0,
    clearTimeout: () => {},
    api: options.api ?? (async () => { throw new Error("offline"); }),
    App: { escapeHtml: (s: string) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"), refreshLessonDock() {} },
    state: { lessonRequestId: 1, lesson: { lesson: { id: "chapter4", steps }, progress: { state: "in_progress" } } },
  };
  vm.runInNewContext(CLIENT, sandbox);
  return { App: sandbox.App, state: sandbox.state, element, steps, marks, inds, rafCalls: () => rafCalls };
}

/** The real server logic behind a stubbed api(), so the client test sees genuine verdicts. */
const serverApi = (steps: LessonStep[]) => async (_method: string, _path: string, body: any) => {
  const step = steps[body.step] as Extract<LessonStep, { kind: "assess" }>;
  const scene = step.scenes[body.scene];
  return JSON.parse(JSON.stringify(assessAnswer((body.variant === "compare" ? scene.compare : scene).facts, body)));
};

test("the assess client draws every fact, asks both questions, and shows the server's verdict with its evidence", async () => {
  const steps = LESSONS.flatMap((l) => l.steps);
  const { App, element, marks } = loadClient({ api: serverApi(steps) });
  const index = steps.findIndex((s) => s.kind === "assess");
  const content = steps[index] as Extract<LessonStep, { kind: "assess" }>;
  element("x").innerHTML = App.assessStepHtml(content, index);
  App.mountAssess(content, index);

  const svg = element("ov-figure").innerHTML;
  for (const r of content.scenes[0].facts) for (const mark of r.marks) assert.match(svg, new RegExp(`data-mark="${mark}"`), `${r.id} is drawn`);
  assert.match(element("ov-panel").innerHTML, /type="radio" name="ov-legal"[\s\S]*type="radio" name="ov-safety"/, "two questions, native radios");
  assert.match(element("ov-panel").innerHTML, /id="ov-submit"[^>]*disabled/, "nothing to check before both answers");
  assert.equal(App.assessDone(index), false);

  App.assessPick("legal", "not_forbidden");
  App.assessPick("safety", "clear");
  await App.assessSubmit();
  const top = element("ov-top").innerHTML;
  assert.match(top, /ov-verdict is-wrong[\s\S]*ov-verdict is-right/, "law wrong, safety right");
  assert.ok(marks.get("sign").classes.has("is-on") && marks.get("ahead").classes.has("is-on"), "the deciding sign is highlighted first");
  assert.ok(!marks.get("line").classes.has("is-on"));
  assert.match(element("ov-evidence").innerHTML, /تعیین‌کننده/);

  App.assessRetry();
  assert.match(element("ov-panel").innerHTML, /name="ov-legal"/, "retry asks again");
  App.assessVariant("compare");
  assert.match(element("ov-top").innerHTML, /فقط وسیله‌ی جلویی عوض شد/);
  assert.match(element("ov-figure").innerHTML, /ov-mark is-changed" data-mark="ahead"/, "the changed vehicle is outlined");
  assert.doesNotMatch(element("ov-figure").innerHTML, /ov-mark is-changed" data-mark="sign"/, "the unchanged sign is not");

  App.assessScene(1);
  App.assessPick("legal", "forbidden");
  App.assessPick("safety", "unknown");
  await App.assessSubmit();
  assert.match(element("ov-top").innerHTML, /بی‌جواب: کسی پشتِ سرت/);
  assert.equal(App.assessDone(index), true, "every scene checked once (a retry keeps it)");
});

test("the assess client asks again after a failed request, keeping the answers", async () => {
  const steps = LESSONS.flatMap((l) => l.steps);
  const { App, element } = loadClient();
  const index = steps.findIndex((s) => s.kind === "assess");
  App.mountAssess(steps[index], index);
  App.assessPick("legal", "forbidden");
  App.assessPick("safety", "clear");
  await App.assessSubmit();
  assert.match(element("ov-panel").innerHTML, /is-error/);
  assert.match(element("ov-panel").innerHTML, /value="forbidden" checked/);
  assert.equal(App.assessDone(index), false);
});

test("the markings client flips only the mixed line when you change lanes", () => {
  const { App, element, state } = loadClient();
  const content = stepOf("markings")[0];
  const pills = () => [...element("ov-lines").innerHTML.matchAll(/ov-pill (is-yes|is-no)/g)].map((m) => m[1]);
  element("ov-lines").innerHTML = App.markingsStepHtml(content).match(/<ul id="ov-lines" class="ov-lines">([\s\S]*?)<\/ul>/)![1];
  assert.deepEqual(pills(), ["is-yes", "is-no", "is-no", "is-yes"]);
  App.markingsSide("upper");
  assert.equal(state.markingsSide, "upper");
  assert.deepEqual(pills(), ["is-yes", "is-no", "is-no", "is-no"]);
});

test("the manoeuvre plays with motion, and with reduced motion shows every stage still, with manual steps", () => {
  const content = stepOf("manoeuvre")[0];
  const moving = loadClient();
  moving.App.mountManoeuvre(content, 0);
  assert.match(moving.element("ov-m-bar").innerHTML, /App\.manoeuvrePlay\(\)/, "playback offered");
  moving.App.manoeuvreGoTo(1);
  assert.ok(moving.rafCalls() > 0, "a step forward is animated");
  assert.ok(moving.inds[0].classes.has("is-on"), "the left indicator shows at once");

  const still = loadClient({ reduce: true });
  still.App.mountManoeuvre(content, 0);
  assert.doesNotMatch(still.element("ov-m-bar").innerHTML, /manoeuvrePlay/, "no playback with reduced motion");
  assert.match(still.element("ov-m-bar").innerHTML, /App\.manoeuvreGoTo\(1\)/, "manual steps stay");
  still.App.manoeuvreGoTo(1);
  still.App.manoeuvrePlay();
  assert.equal(still.rafCalls(), 0, "nothing animates");
  const [x, lane] = content.stages[1].pose.you;
  assert.equal(still.element("ov-m-you").getAttribute("transform"), `translate(${(22 + x * 2.65).toFixed(1)} ${(102 - 55 * lane).toFixed(1)})`, "the stage's end pose, drawn at once");
  assert.match(still.element("ov-m-stage").innerHTML, new RegExp(content.stages[1].title));
  const html = still.App.manoeuvreStepHtml(content);
  for (const stage of content.stages) assert.ok(html.includes(stage.title), "the full list is readable without motion");
});

test("the client holds no verdict logic and is loaded before learn.js", () => {
  assert.match(CLIENT, /prefers-reduced-motion: reduce/);
  assert.match(CLIENT, /\/assess', \{/, "the verdict comes from the server");
  assert.doesNotMatch(CLIENT, /rule\.legal|rule\.safety|\.expect\b|\.agrees\b/, "no client copy of the rules or the reviewed answers");
  assert.doesNotMatch(CLIENT, /pointermove|mousemove|touchmove|draggable/, "nothing depends on dragging");
  const shell = readFileSync("src/app/shell.tsx", "utf8");
  assert.match(shell, /<script src="\/js\/overtaking\.js"><\/script>[\s\S]*<script src="\/js\/learn\.js"><\/script>/);
  const learn = readFileSync("public/js/learn.js", "utf8");
  for (const kind of ["markings", "assess", "manoeuvre"]) assert.match(learn, new RegExp(`content\\.kind === '${kind}'`), `learn.js renders ${kind}`);
  assert.match(learn, /kind === 'assess'\) return !App\.assessDone/, "Next waits for the scenes the first time through");
});
