/**
 * Chapter 4 (Segnali di obbligo): content integrity against the pinned
 * question bank, full question coverage, the chapter review, its place right
 * after chapter 3, and the learner flow end to end (resume, mistakes, vocab,
 * two learners kept apart, chapters 1–3 untouched).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import worker from "../src/index.js";
import { CHAPTERS, lessonLinkForSourceId, relatedSourceIds, type Lesson, type Statement } from "../src/content/lessons.js";
import { DIVIETO_CHAPTER } from "../src/content/lessons-divieto.js";
import { CHAPTER_4_SOURCE_RANGE, OBBLIGO_CHAPTER } from "../src/content/lessons-obbligo.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

/** [text, answer, image file, source group, source line], indexed by source_id - 1. */
const BANK = (JSON.parse(readFileSync("src/content/question-provenance.json", "utf8")) as {
  entries: [string, number, string | null, number, number][];
}).entries;

const [FIRST, LAST] = CHAPTER_4_SOURCE_RANGE;
const LESSONS = OBBLIGO_CHAPTER.lessons.filter((lesson) => !lesson.review);
const REVIEW = OBBLIGO_CHAPTER.lessons.find((lesson) => lesson.review) as Lesson;

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

test("chapter 4 is the bank's fourth group and comes right after chapter 3", () => {
  // "segnali-divieto" ends at group 127; "segnali-obbligo" is groups 128–156 (source ids 1715–2147).
  assert.equal(BANK[FIRST - 2][3], 127);
  assert.equal(BANK[FIRST - 1][3], 128);
  assert.equal(BANK[LAST - 1][3], 156);
  assert.equal(BANK[LAST][3], 157, "source id 2148 opens chapter 5");
  assert.deepEqual(OBBLIGO_CHAPTER.numbers, [4]);
  assert.deepEqual(OBBLIGO_CHAPTER.topicIds, [3]);
  assert.equal(CHAPTERS[2], DIVIETO_CHAPTER);
  assert.equal(CHAPTERS[3], OBBLIGO_CHAPTER);
  const numbers = CHAPTERS.flatMap((c) => c.numbers);
  assert.deepEqual(numbers, [...numbers].sort((a, b) => a - b), "the course follows official chapter order");
  assert.equal(new Set(CHAPTERS.flatMap((c) => c.lessons.map((l) => l.id))).size, CHAPTERS.flatMap((c) => c.lessons).length, "lesson ids are unique");
});

test("every chapter 4 question is mapped to exactly one chapter 4 section, and no other chapter maps one", () => {
  const owner = new Map<string, string>();
  for (const lesson of LESSONS) {
    for (const group of lesson.related) {
      assert.ok(group.step > 0 && group.step < lesson.steps.length, `${lesson.id} maps to a real section`);
      assert.notEqual(lesson.steps[group.step].kind, "terms", `${lesson.id} maps questions to a teaching section`);
      for (const id of group.sourceIds) {
        assert.ok(Number(id) >= FIRST && Number(id) <= LAST, `${lesson.id} maps ${id}, outside chapter 4`);
        assert.ok(!owner.has(id), `${id} is mapped by both ${owner.get(id)} and ${lesson.id}`);
        owner.set(id, lesson.id);
      }
    }
  }
  const all = Array.from({ length: LAST - FIRST + 1 }, (_, i) => String(FIRST + i));
  assert.deepEqual(all.filter((id) => !owner.has(id)), [], "unmapped chapter 4 questions");
  assert.equal(owner.size, 433);
  for (const [id, lessonId] of owner) assert.equal(lessonLinkForSourceId(id)?.lessonId, lessonId, `${id} routes to ${lessonId}`);
  for (const chapter of CHAPTERS.filter((c) => c !== OBBLIGO_CHAPTER)) {
    for (const lesson of chapter.lessons) {
      for (const id of relatedSourceIds(lesson)) assert.ok(Number(id) < FIRST || Number(id) > LAST, `${lesson.id} maps chapter 4 question ${id}`);
    }
  }
});

test("every quoted statement and factor matches the pinned bank: text, answer key and image", () => {
  for (const lesson of OBBLIGO_CHAPTER.lessons) {
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
          assert.equal(row.image, step.sign?.sign, `${item.sourceId} is about the step's sign`);
        }
      });
    }
  }
});

test("every mapped question's image is one the chapter lists", () => {
  const images = new Set(OBBLIGO_CHAPTER.lessons.flatMap((lesson) => [...lesson.signs, ...(lesson.figures ?? [])]));
  for (const id of OBBLIGO_CHAPTER.lessons.flatMap(relatedSourceIds)) {
    const image = bankRow(id).image;
    if (image !== null) assert.ok(images.has(image), `${id} shows image ${image}, not listed by chapter 4`);
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
    assert.ok(lesson.practice.length >= 3, `${lesson.id} has practice`);
    for (const question of lesson.practice) {
      assert.ok(question.conceptStep > 0 && question.conceptStep < lesson.steps.length);
      // The concept step is the section the question routes back to on a mistake.
      assert.equal(lessonLinkForSourceId(question.sourceId)?.step, question.conceptStep, `${question.sourceId} practises the section it maps to`);
    }
    for (const step of lesson.steps) {
      if (step.kind === "trap") {
        assert.deepEqual(step.examples.map((e) => e.answer).sort(), [0, 1], `${lesson.id} trap pairs a VERO and a FALSO statement`);
      }
      if (step.kind === "classify") {
        assert.ok(step.items.length >= 3);
        for (const item of step.items) assert.ok(item.answer >= 0 && item.answer < step.options.length, `${lesson.id} classify answer`);
        for (const option of step.options.keys()) assert.ok(step.items.some((item) => item.answer === option), `${lesson.id}: option ${option} is right at least once`);
      }
      if (step.kind === "table") for (const row of step.rows) assert.equal(row.values.length, step.columns.length, `${lesson.id} table row "${row.label}"`);
    }
  }
});

test("the chapter review comes last, takes one unseen question from every lesson, and maps nothing itself", () => {
  assert.equal(OBBLIGO_CHAPTER.lessons.at(-1), REVIEW);
  assert.deepEqual(REVIEW.related, []);
  const seenInLessons = new Set(LESSONS.flatMap((lesson) => [...statementsOf(lesson).map((s) => s.sourceId), ...factorIdsOf(lesson)]));
  const homes = REVIEW.practice.map((question) => {
    assert.ok(!seenInLessons.has(question.sourceId), `review question ${question.sourceId} was already shown in a lesson`);
    return lessonLinkForSourceId(question.sourceId)?.lessonId;
  });
  assert.deepEqual(homes, LESSONS.map((lesson) => lesson.id), "one review question per lesson, in lesson order");
  const summary = REVIEW.steps.find((step) => step.kind === "table");
  assert.equal(summary?.kind === "table" ? summary.rows.length : 0, LESSONS.length, "the summary has one line per lesson");
});

test("the client renders every step kind chapter 4 uses", () => {
  const learn = readFileSync("public/js/learn.js", "utf8");
  for (const lesson of OBBLIGO_CHAPTER.lessons) {
    for (const step of lesson.steps) assert.match(learn, new RegExp(`content\\.kind === '${step.kind}'`), `${step.kind} is rendered`);
  }
});

// ── Flow against real SQL ─────────────────────────────────────────────────────

const BOT_TOKEN = "123456:chapter4-test";
const USER_A = 9401;
const USER_B = 9402;
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

test("after chapter 3 the learner is sent to chapter 4, can resume it, and walks lessons → review → completion", async () => {
  const { raw, call } = setup();
  for (const lesson of DIVIETO_CHAPTER.lessons.slice(0, -1)) await finish(call, USER_A, lesson);
  const ch3Review = await finish(call, USER_A, DIVIETO_CHAPTER.lessons.at(-1) as Lesson);
  assert.equal(ch3Review.body.chapterCompleted, true);
  assert.equal(ch3Review.body.next.lessonId, LESSONS[0].id, "chapter 3's review hands over to chapter 4 lesson 1");
  assert.deepEqual(ch3Review.body.next.chapterNumbers, [4]);

  const home = await call(USER_A, "GET", "/learn");
  assert.equal(home.body.chapters[3].id, OBBLIGO_CHAPTER.id);
  assert.deepEqual(home.body.chapters[3].numbers, [4]);
  assert.equal(home.body.chapters[2].completed, true);
  assert.equal(home.body.chapters[3].completed, false);
  assert.ok(home.body.chapters[3].lessons.every((l: { state: string }) => l.state === "not_started"), "new chapter starts unstarted, never pre-completed");
  assert.equal(home.body.today.items.find((item: { kind: string }) => item.kind === "lesson").lessonId, LESSONS[0].id, "today's path recommends chapter 4");

  const first = await call(USER_A, "GET", `/learn/lessons/${LESSONS[0].id}`);
  assert.deepEqual(first.body.position, { index: 1, total: LESSONS.length, review: false });
  assert.deepEqual(first.body.chapter.numbers, [4]);
  assert.equal(first.body.chapter.reviewedOn, OBBLIGO_CHAPTER.reviewedOn);

  // Leave mid-lesson and come back: the furthest step is kept.
  await call(USER_A, "POST", `/learn/lessons/${LESSONS[0].id}/progress`, { step: 4 });
  const resumed = await call(USER_A, "GET", `/learn/lessons/${LESSONS[0].id}`);
  assert.deepEqual([resumed.body.progress.state, resumed.body.progress.step], ["in_progress", 4]);

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
  assert.equal((await call(USER_A, "GET", "/learn")).body.chapters[3].completed, false, "not complete before the review");

  const reviewDone = await finish(call, USER_A, REVIEW);
  assert.equal(reviewDone.body.chapterCompleted, true);
  assert.equal((await call(USER_A, "GET", "/learn")).body.chapters[3].completed, true);
  assert.equal(reviewDone.body.next?.chapterNumbers?.[0], 5, "chapter 4's review hands over to chapter 5");

  // Revisiting keeps the lesson completed; the review draws practice from the whole chapter.
  assert.equal((await call(USER_A, "GET", `/learn/lessons/${LESSONS[10].id}`)).body.progress.state, "completed");
  const practice = await call(USER_A, "POST", "/learn/practice", { lessonId: REVIEW.id });
  assert.equal(practice.status, 200);
  assert.deepEqual(practice.body.lessonIds, OBBLIGO_CHAPTER.lessons.map((l) => l.id));

  // Another learner sees none of it.
  const other = await call(USER_B, "GET", "/learn");
  assert.equal(other.body.chapters[3].completed, false);
  assert.ok(other.body.chapters[3].lessons.every((l: { state: string }) => l.state === "not_started"));
  assert.equal((await call(USER_B, "GET", `/learn/lessons/${LESSONS[0].id}`)).body.progress.state, "not_started");
  const otherQueue = raw.prepare(`SELECT COUNT(*) AS n FROM review_queue WHERE user_id = 2`).get() as { n: number };
  assert.equal(otherQueue.n, 0);
});

test("chapter 4 can be opened directly without finishing chapters 1–3", async () => {
  const { call } = setup();
  const lesson = LESSONS[10];
  assert.equal((await call(USER_A, "GET", `/learn/lessons/${lesson.id}`)).status, 200);
  assert.equal((await finish(call, USER_A, lesson)).status, 200);
  const home = await call(USER_A, "GET", "/learn");
  assert.equal(home.body.chapters[3].lessons[10].state, "completed");
  assert.ok(home.body.chapters[2].lessons.every((l: { state: string }) => l.state === "not_started"), "chapter 3 untouched");
  // Today's path continues in the chapter the learner was last active in, from its first open lesson.
  const next = home.body.today.items.find((item: { kind: string }) => item.kind === "lesson");
  assert.equal(next.lessonId, LESSONS[0].id);
});

test("lesson terms can be saved to the vocabulary list from a chapter 4 lesson, per learner", async () => {
  const { call } = setup();
  const lesson = LESSONS[10];
  const term = lesson.steps.flatMap((step) => (step.kind === "terms" ? step.terms : []))[0];
  assert.ok((await call(USER_A, "POST", "/vocab", { termIt: term.it, termFa: term.fa })).status < 300);
  assert.ok((await call(USER_A, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
  assert.ok(!(await call(USER_B, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
});
