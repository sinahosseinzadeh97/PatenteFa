import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import worker from "../src/index.js";
import { CHAPTERS, lessonLinkForSourceId, relatedSourceIds, type LessonStep } from "../src/content/lessons.js";
import { PERICOLO_CHAPTER } from "../src/content/lessons-pericolo.js";
import { SORPASSO_CHAPTER } from "../src/content/lessons-sorpasso.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

const LESSONS = PERICOLO_CHAPTER.lessons;
const [L1, L2, L3, L4] = LESSONS;
type FactorsStep = Extract<LessonStep, { kind: "factors" }>;

// ── Curated content ──────────────────────────────────────────────────────────

test("the chapter is fifth, offered on the warning-sign topic, with four lessons and its sources", () => {
  assert.equal(CHAPTERS[4], PERICOLO_CHAPTER);
  assert.deepEqual(PERICOLO_CHAPTER.topicIds, [1]);
  assert.deepEqual(
    LESSONS.map((l) => l.id),
    ["dosso-cunetta", "curve-pendenze", "passaggi-a-livello", "pedoni-bambini-animali"]
  );
  assert.match(PERICOLO_CHAPTER.reviewedOn, /^2026-10-24$/);
  assert.ok(PERICOLO_CHAPTER.sources.some((s) => s.url.includes("normattiva.it")));
  assert.ok(PERICOLO_CHAPTER.sources.some((s) => s.url.includes("QuizPatenteB")));
});

test("every statement shows a sign the lesson teaches, and none is a taxonomy question", () => {
  for (const lesson of LESSONS) {
    const signs = new Set(lesson.signs);
    const statements = [
      ...lesson.practice,
      ...lesson.steps.flatMap((s) => (s.kind === "trap" ? s.examples : [])),
      ...lesson.steps.flatMap((s) => (s.kind === "factors" ? s.columns.flatMap((c) => c.items) : [])),
    ];
    for (const statement of statements) {
      assert.ok(statement.sign !== undefined && signs.has(statement.sign), `${statement.sourceId}: its sign is one of ${lesson.id}'s`);
      assert.doesNotMatch(statement.textIt, /è un segnale di|rappresenta un segnale di/, `${statement.sourceId}: taxonomy stays unmapped`);
    }
    for (const step of lesson.steps) {
      if (step.kind === "compare") for (const item of step.items) assert.ok(signs.has(item.sign), `${lesson.id}: compares its own signs`);
      if (step.kind === "sequence") for (const lane of step.lanes) assert.ok(signs.has(lane.from.sign) && signs.has(lane.to.sign));
    }
  }
});

test("factor lists are the bank's own answers: VERO beside VERO, FALSO beside FALSO", () => {
  const practice = new Set(LESSONS.flatMap((l) => l.practice.map((q) => q.sourceId)));
  const traps = new Set(LESSONS.flatMap((l) => l.steps.flatMap((s) => (s.kind === "trap" ? s.examples.map((e) => e.sourceId) : []))));
  const factors = LESSONS.flatMap((lesson) =>
    lesson.steps.filter((s): s is FactorsStep => s.kind === "factors").map((step) => ({ lesson, step }))
  );
  assert.equal(factors.length, 2);
  for (const { lesson, step } of factors) {
    step.columns.forEach((column, i) => {
      assert.ok(column.items.length >= 3, `${lesson.id}: column ${i} has enough items`);
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
  const route = (id: string) => {
    const link = lessonLinkForSourceId(id);
    return link && `${link.lessonId}#${link.step}`;
  };
  assert.equal(route("538"), `${L1.id}#1`, "150 m before the hazard → what every triangle says");
  assert.equal(route("573"), `${L1.id}#2`, "DOSSO read as CUNETTA → the profile comparison");
  assert.equal(route("552"), `${L1.id}#3`, "STRADA DEFORMATA read as DOSSO → the deformed-road comparison");
  assert.equal(route("617"), `${L2.id}#1`, "one bend read as a series → one bend or two");
  assert.equal(route("627"), `${L2.id}#2`, "stopping in a bend → what to do at bends");
  assert.equal(route("874"), `${L2.id}#3`, "low gear on a descent → descent or climb");
  assert.equal(route("725"), `${L3.id}#1`, "lights off → barriers or none");
  assert.equal(route("796"), `${L3.id}#2`, "panel bars counted as tracks → the order of signs");
  assert.equal(route("817"), `${L3.id}#3`, "tram read as a railway → train or tram");
  assert.equal(route("847"), `${L4.id}#1`);
  assert.equal(route("990"), `${L4.id}#2`, "children read as a crossing → pedestrians or children");
  assert.equal(route("1004"), `${L4.id}#3`);
  // Taxonomy, composite (A)/(B) figures, tram overtaking, a breakdown on the tracks,
  // and the signs this chapter does not teach yet.
  for (const id of ["537", "546", "534", "779", "807", "824", "722", "942", "954", "1067", "1150", "1156"]) {
    assert.equal(route(id), null, `${id} is out of scope on purpose`);
  }
  // Already taught elsewhere: one lesson per question.
  assert.equal(lessonLinkForSourceId("570")?.lessonId, SORPASSO_CHAPTER.lessons[2].id, "overtaking on a crest stays with overtaking");
  assert.equal(lessonLinkForSourceId("896")?.lessonId, "frenatura-e-arresto", "braking on a climb stays with braking");
});

test("the factor list shows each statement's sign, so 'il segnale raffigurato' is never a sign the learner cannot see", () => {
  const client = readFileSync(new URL("../public/js/learn.js", import.meta.url), "utf8");
  assert.match(client, /item\.sign \? '<span class="sign-tile sign-tile-sm factor-sign"><img src="' \+ signUrl\(item\.sign\)/);
});

// ── API ──────────────────────────────────────────────────────────────────────

const BOT = "123456:warning-signs-test";
const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;

function setup() {
  const { db, raw } = createSqliteD1();
  raw.prepare(`INSERT INTO topics (id, name_it, name_fa, sort_order) VALUES (1, 'Segnali di pericolo', 'علائم خطر', 1)`).run();
  const insert = raw.prepare(`INSERT INTO questions (id, source_id, topic_id, text_it, correct_answer, image_url) VALUES (?, ?, 1, ?, ?, NULL)`);
  const lessons = CHAPTERS.flatMap((c) => c.lessons);
  const practice = new Map(lessons.flatMap((l) => l.practice.map((q) => [q.sourceId, q] as const)));
  for (const id of new Set(lessons.flatMap(relatedSourceIds))) {
    const q = practice.get(id);
    insert.run(Number(id), id, q ? q.textIt : `Bank statement ${id}`, q ? q.answer : 1);
  }
  raw.prepare(`INSERT INTO users (id, telegram_user_id, first_name, is_approved) VALUES (1, 9501, 'A', 1)`).run();
  const env = { DB: db, TELEGRAM_BOT_TOKEN: BOT, ALLOWED_TELEGRAM_USER_IDS: "1", PRIMARY_ADMIN_TELEGRAM_USER_ID: "1", LOG_CHANNEL_ID: "-100" } as AppEnv;
  const call = async (method: string, path: string, body?: unknown) => {
    const headers = { "Content-Type": "application/json", "X-Telegram-InitData": signedInitData(BOT, 9501) };
    const response = await worker.fetch(
      new Request(`https://example.test/api${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) }),
      env,
      ctx
    );
    return { status: response.status, body: (await response.json()) as Record<string, any> };
  };
  return { call };
}

test("the chapter is listed, opens directly, and the last overtaking lesson hands over to it", async () => {
  const { call } = setup();
  const home = await call("GET", "/learn");
  assert.equal(home.body.chapters[4].id, PERICOLO_CHAPTER.id);
  assert.equal(home.body.chapters[4].lessons.length, 4);
  for (const [index, lesson] of LESSONS.entries()) {
    const opened = await call("GET", `/learn/lessons/${lesson.id}`);
    assert.equal(opened.status, 200);
    assert.deepEqual(opened.body.position, { index: index + 1, total: 4 });
    assert.equal(opened.body.lesson.practice.length, lesson.practice.length, `${lesson.id}: no practice question dropped`);
  }
  const lastOvertaking = await call("GET", `/learn/lessons/${SORPASSO_CHAPTER.lessons[3].id}`);
  assert.deepEqual(lastOvertaking.body.next, { lessonId: L1.id, titleFa: L1.titleFa, chapterTitleFa: PERICOLO_CHAPTER.titleFa });
});
