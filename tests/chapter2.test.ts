/**
 * Chapter 2 (Segnali di pericolo): content integrity against the pinned
 * question bank, full question coverage, the chapter review, its place right
 * after chapter 1, and the learner flow end to end (resume, mistakes, vocab,
 * two learners kept apart).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import worker from "../src/index.js";
import { CHAPTERS, lessonLinkForSourceId, relatedSourceIds, type Lesson, type Statement } from "../src/content/lessons.js";
import { DEFINIZIONI_CHAPTER } from "../src/content/lessons-definizioni.js";
import { CHAPTER_2_MAPPED_ELSEWHERE, CHAPTER_2_SOURCE_RANGE, PERICOLO_CHAPTER } from "../src/content/lessons-pericolo.js";
import { VELOCITA_CHAPTER } from "../src/content/lessons-velocita.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

/** [text, answer, image file, source group, source line], indexed by source_id - 1. */
const BANK = (JSON.parse(readFileSync("src/content/question-provenance.json", "utf8")) as {
  entries: [string, number, string | null, number, number][];
}).entries;

const [FIRST, LAST] = CHAPTER_2_SOURCE_RANGE;
const LESSONS = PERICOLO_CHAPTER.lessons.filter((lesson) => !lesson.review);
const REVIEW = PERICOLO_CHAPTER.lessons.find((lesson) => lesson.review) as Lesson;
const ELSEWHERE = new Set<string>(CHAPTER_2_MAPPED_ELSEWHERE);

function bankRow(sourceId: string) {
  const row = BANK[Number(sourceId) - 1];
  assert.ok(row, `${sourceId} exists in the bank`);
  return { text: row[0], answer: row[1], image: row[2] ? Number(row[2].replace(".png", "")) : null };
}

function statementsOf(lesson: Lesson): Statement[] {
  return [...lesson.practice, ...lesson.steps.flatMap((step) => (step.kind === "trap" ? step.examples : []))];
}

function factorIdsOf(lesson: Lesson): string[] {
  return lesson.steps.flatMap((step) => (step.kind === "factors" ? step.columns.flatMap((c) => c.items.map((i) => i.sourceId)) : []));
}

test("chapter 2 is the bank's second group and comes right after chapter 1", () => {
  // Groups 1–50 are chapter 1; "segnali-pericolo" is groups 51–88 (source ids 532–1193).
  assert.equal(BANK[FIRST - 2][3], 50);
  assert.equal(BANK[FIRST - 1][3], 51);
  assert.equal(BANK[LAST - 1][3], 88);
  assert.equal(BANK[LAST][3], 89, "source id 1194 opens chapter 3");
  assert.deepEqual(PERICOLO_CHAPTER.numbers, [2]);
  assert.equal(CHAPTERS[0], DEFINIZIONI_CHAPTER);
  assert.equal(CHAPTERS[1], PERICOLO_CHAPTER);
  assert.equal(new Set(CHAPTERS.map((c) => c.id)).size, CHAPTERS.length, "chapter ids are unique");
});

test("every chapter 2 question is mapped to exactly one chapter 2 section, except the three Velocità practises", () => {
  const owner = new Map<string, string>();
  for (const lesson of LESSONS) {
    for (const group of lesson.related) {
      for (const id of group.sourceIds) {
        assert.ok(Number(id) >= FIRST && Number(id) <= LAST, `${lesson.id} maps ${id}, outside chapter 2`);
        assert.ok(!owner.has(id), `${id} is mapped by both ${owner.get(id)} and ${lesson.id}`);
        owner.set(id, lesson.id);
      }
    }
  }
  const all = Array.from({ length: LAST - FIRST + 1 }, (_, i) => String(FIRST + i));
  assert.deepEqual(all.filter((id) => !owner.has(id)), [...CHAPTER_2_MAPPED_ELSEWHERE], "unmapped chapter 2 questions");
  for (const [id, lessonId] of owner) assert.equal(lessonLinkForSourceId(id)?.lessonId, lessonId, `${id} routes to ${lessonId}`);

  // The three exceptions are practised by Velocità, so they must stay mapped there.
  const velocita = new Set(VELOCITA_CHAPTER.lessons.flatMap((l) => l.practice.map((q) => q.sourceId)));
  for (const id of ELSEWHERE) {
    assert.ok(velocita.has(id), `${id} is a Velocità practice question`);
    assert.ok(VELOCITA_CHAPTER.lessons.some((l) => l.id === lessonLinkForSourceId(id)?.lessonId));
  }
  // No other chapter maps a chapter 2 question.
  for (const chapter of CHAPTERS.filter((c) => c !== PERICOLO_CHAPTER)) {
    for (const lesson of chapter.lessons) {
      for (const id of lesson.related.flatMap((group) => group.sourceIds)) {
        if (Number(id) >= FIRST && Number(id) <= LAST) assert.ok(ELSEWHERE.has(id), `${lesson.id} maps chapter 2 question ${id}`);
      }
    }
  }
});

test("every quoted statement and factor matches the pinned bank: text, answer key and image", () => {
  for (const lesson of PERICOLO_CHAPTER.lessons) {
    for (const statement of statementsOf(lesson)) {
      const row = bankRow(statement.sourceId);
      assert.equal(statement.textIt, row.text, `${statement.sourceId} text`);
      assert.equal(statement.answer, row.answer, `${statement.sourceId} answer key`);
      assert.equal(statement.sign ?? statement.figure ?? null, row.image, `${statement.sourceId} image`);
    }
    for (const step of lesson.steps) {
      if (step.kind !== "factors") continue;
      step.columns.forEach((column, i) => {
        for (const item of column.items) {
          const row = bankRow(item.sourceId);
          assert.equal(item.textIt, row.text, `${item.sourceId} factor text`);
          assert.equal(item.answer, row.answer, `${item.sourceId} factor answer`);
          assert.equal(item.answer, i === 0 ? 1 : 0, `${item.sourceId} sits in the column matching its answer`);
          assert.ok(item.textIt.includes(item.it), `${item.sourceId} key phrase is quoted exactly`);
          // "Il segnale raffigurato" means the sign shown above the lists.
          assert.equal(row.image, step.sign?.sign, `${item.sourceId} is about the step's sign`);
        }
      });
    }
  }
});

test("each lesson teaches before it tests and practises only its own questions", () => {
  assert.ok(LESSONS.length >= 10, "the chapter is not squeezed into a handful of lessons");
  for (const lesson of LESSONS) {
    const related = new Set(relatedSourceIds(lesson));
    const shown = new Set<string>();
    for (const id of [...statementsOf(lesson).map((s) => s.sourceId), ...factorIdsOf(lesson)]) {
      assert.ok(related.has(id), `${lesson.id} quotes ${id} but does not map it`);
      assert.ok(!shown.has(id), `${lesson.id} shows ${id} twice`);
      shown.add(id);
    }
    for (const question of lesson.practice) {
      assert.ok(question.conceptStep > 0 && question.conceptStep < lesson.steps.length);
    }
    for (const step of lesson.steps) {
      if (step.kind === "classify") {
        assert.ok(step.items.length >= 3);
        for (const item of step.items) assert.ok(item.answer >= 0 && item.answer < step.options.length, `${lesson.id} classify answer`);
      }
      if (step.kind === "table") for (const row of step.rows) assert.equal(row.values.length, step.columns.length, `${lesson.id} table row "${row.label}"`);
      if (step.kind === "anatomy") assert.equal(new Set(step.parts.map((p) => p.id)).size, step.parts.length);
    }
  }
});

test("the chapter review comes last, takes one unseen question from every lesson, and maps nothing itself", () => {
  assert.equal(PERICOLO_CHAPTER.lessons.at(-1), REVIEW);
  assert.deepEqual(REVIEW.related, []);
  const seenInLessons = new Set(LESSONS.flatMap((lesson) => [...statementsOf(lesson).map((s) => s.sourceId), ...factorIdsOf(lesson)]));
  const homes = REVIEW.practice.map((question) => {
    assert.ok(!seenInLessons.has(question.sourceId), `review question ${question.sourceId} was already shown in a lesson`);
    return lessonLinkForSourceId(question.sourceId)?.lessonId;
  });
  assert.deepEqual(homes, LESSONS.map((lesson) => lesson.id), "one review question per lesson, in lesson order");
});

test("the client can draw every road scene and render every step kind chapter 2 uses", () => {
  const road = readFileSync("public/js/road.js", "utf8");
  const learn = readFileSync("public/js/learn.js", "utf8");
  for (const lesson of PERICOLO_CHAPTER.lessons) {
    for (const step of lesson.steps) {
      assert.match(learn, new RegExp(`content\\.kind === '${step.kind}'`), `${step.kind} is rendered`);
      if (step.kind !== "anatomy") continue;
      assert.match(road, new RegExp(`\\b${step.scene}: \\{`), `scene ${step.scene} is drawn`);
      for (const part of step.parts) assert.match(road, new RegExp(`part\\('${part.id}'`), `part ${part.id} of ${step.scene} is drawn`);
    }
  }
  assert.match(learn, /content\.sign \? signFigure\(content\.sign/, "factors steps show their sign");
});

// ── Flow against real SQL ─────────────────────────────────────────────────────

const BOT_TOKEN = "123456:chapter2-test";
const USER_A = 9201;
const USER_B = 9202;
const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;

function setup() {
  const { db, raw } = createSqliteD1();
  const insert = raw.prepare(`INSERT INTO questions (id, source_id, topic_id, text_it, correct_answer, image_url) VALUES (?, ?, NULL, ?, ?, NULL)`);
  for (const sourceId of new Set(CHAPTERS.flatMap((c) => c.lessons.flatMap(relatedSourceIds)))) {
    const row = BANK[Number(sourceId) - 1];
    insert.run(Number(sourceId), sourceId, row[0], row[1]);
  }
  const user = raw.prepare(`INSERT INTO users (id, telegram_user_id, first_name, is_approved) VALUES (?, ?, ?, 1)`);
  user.run(1, USER_A, "A");
  user.run(2, USER_B, "B");
  const env = { DB: db, TELEGRAM_BOT_TOKEN: BOT_TOKEN, ALLOWED_TELEGRAM_USER_IDS: "1", PRIMARY_ADMIN_TELEGRAM_USER_ID: "1", LOG_CHANNEL_ID: "-100" } as AppEnv;
  async function call(telegramId: number, method: string, path: string, body?: unknown) {
    const response = await worker.fetch(
      new Request(`https://example.test/api${path}`, {
        method,
        headers: { "Content-Type": "application/json", "X-Telegram-InitData": signedInitData(BOT_TOKEN, telegramId) },
        body: body === undefined ? undefined : JSON.stringify(body),
      }),
      env,
      ctx
    );
    return { status: response.status, body: (await response.json()) as Record<string, any> };
  }
  return { raw, call };
}

async function finish(call: ReturnType<typeof setup>["call"], user: number, lesson: Lesson, wrongFirst = false) {
  const opened = await call(user, "GET", `/learn/lessons/${lesson.id}`);
  assert.equal(opened.status, 200);
  assert.equal(opened.body.lesson.practice.length, lesson.practice.length, `${lesson.id}: no practice question dropped as drifted`);
  for (const [i, q] of opened.body.lesson.practice.entries()) {
    const answer = wrongFirst && i === 0 ? 1 - q.correctAnswer : q.correctAnswer;
    assert.equal((await call(user, "POST", `/learn/lessons/${lesson.id}/answer`, { questionId: q.questionId, answer })).status, 200);
  }
  return call(user, "POST", `/learn/lessons/${lesson.id}/complete`);
}

test("after chapter 1 the learner is sent to chapter 2, can resume it, and walks lessons → review → completion", async () => {
  const { raw, call } = setup();
  for (const lesson of DEFINIZIONI_CHAPTER.lessons.slice(0, -1)) await finish(call, USER_A, lesson);
  const ch1Review = await finish(call, USER_A, DEFINIZIONI_CHAPTER.lessons.at(-1) as Lesson);
  assert.equal(ch1Review.body.chapterCompleted, true);
  assert.equal(ch1Review.body.next.lessonId, LESSONS[0].id, "chapter 1's review hands over to chapter 2 lesson 1");
  assert.deepEqual(ch1Review.body.next.chapterNumbers, [2]);

  const home = await call(USER_A, "GET", "/learn");
  assert.equal(home.body.chapters[1].id, PERICOLO_CHAPTER.id);
  assert.deepEqual(home.body.chapters[1].numbers, [2]);
  assert.equal(home.body.chapters[0].completed, true);
  assert.equal(home.body.today.items[0].lessonId, LESSONS[0].id, "today's path recommends chapter 2, not chapter 1 again");

  const first = await call(USER_A, "GET", `/learn/lessons/${LESSONS[0].id}`);
  assert.deepEqual(first.body.position, { index: 1, total: LESSONS.length, review: false });
  assert.deepEqual(first.body.chapter.numbers, [2]);

  // Leave mid-lesson and come back: the furthest step is kept.
  await call(USER_A, "POST", `/learn/lessons/${LESSONS[0].id}/progress`, { step: 5 });
  const resumed = await call(USER_A, "GET", `/learn/lessons/${LESSONS[0].id}`);
  assert.deepEqual([resumed.body.progress.state, resumed.body.progress.step], ["in_progress", 5]);

  // A wrong answer is queued once and routes back to its teaching section.
  const done1 = await finish(call, USER_A, LESSONS[0], true);
  assert.equal(done1.status, 200);
  assert.equal(done1.body.practice.queuedForReview, 1);
  assert.equal(done1.body.next.lessonId, LESSONS[1].id);
  const queued = raw.prepare(`SELECT q.source_id AS sourceId FROM review_queue r JOIN questions q ON q.id = r.question_id WHERE r.user_id = 1`).all() as { sourceId: string }[];
  assert.equal(queued.length, 1);
  const link = lessonLinkForSourceId(queued[0].sourceId);
  assert.equal(link?.lessonId, LESSONS[0].id);
  assert.ok(link && LESSONS[0].related.some((g) => g.step === link.step && g.sourceIds.includes(queued[0].sourceId)), "routes to the section that teaches it");

  for (const lesson of LESSONS.slice(1)) assert.equal((await finish(call, USER_A, lesson)).status, 200);
  assert.equal((await call(USER_A, "GET", "/learn")).body.chapters[1].completed, false, "not complete before the review");

  const reviewDone = await finish(call, USER_A, REVIEW);
  assert.equal(reviewDone.body.chapterCompleted, true);
  const after = await call(USER_A, "GET", "/learn");
  assert.equal(after.body.chapters[1].completed, true);

  // Revisiting keeps the lesson completed; the review draws practice from the whole chapter.
  assert.equal((await call(USER_A, "GET", `/learn/lessons/${LESSONS[5].id}`)).body.progress.state, "completed");
  const practice = await call(USER_A, "POST", "/learn/practice", { lessonId: REVIEW.id });
  assert.equal(practice.status, 200);
  assert.deepEqual(practice.body.lessonIds, PERICOLO_CHAPTER.lessons.map((l) => l.id));

  // Another learner sees none of it.
  const other = await call(USER_B, "GET", "/learn");
  assert.equal(other.body.chapters[1].completed, false);
  assert.ok(other.body.chapters[1].lessons.every((l: { state: string }) => l.state === "not_started"));
  assert.equal((await call(USER_B, "GET", `/learn/lessons/${LESSONS[0].id}`)).body.progress.state, "not_started");
  const otherQueue = raw.prepare(`SELECT COUNT(*) AS n FROM review_queue WHERE user_id = 2`).get() as { n: number };
  assert.equal(otherQueue.n, 0);
});

test("chapter 2 can be opened directly without finishing chapter 1", async () => {
  const { call } = setup();
  const opened = await call(USER_A, "GET", `/learn/lessons/${LESSONS[7].id}`);
  assert.equal(opened.status, 200);
  assert.equal((await finish(call, USER_A, LESSONS[7])).status, 200);
  const home = await call(USER_A, "GET", "/learn");
  assert.equal(home.body.chapters[1].lessons[7].state, "completed");
  // Today's path continues in the chapter the learner was last active in, from its first open lesson.
  const next = home.body.today.items.find((item: { kind: string }) => item.kind === "lesson");
  assert.equal(next.lessonId, LESSONS[0].id);
});

test("lesson terms can be saved to the vocabulary list from a chapter 2 lesson, per learner", async () => {
  const { call } = setup();
  const lesson = LESSONS[1];
  const term = lesson.steps.flatMap((step) => (step.kind === "terms" ? step.terms : []))[0];
  assert.ok((await call(USER_A, "POST", "/vocab", { termIt: term.it, termFa: term.fa })).status < 300);
  assert.ok((await call(USER_A, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
  assert.ok(!(await call(USER_B, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
});
