/**
 * Chapter 1 (Definizioni generali e doveri nell'uso della strada): content
 * integrity against the pinned question bank, full question coverage, the
 * chapter review, official chapter order, and the learner flow end to end.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import worker from "../src/index.js";
import { CHAPTERS, lessonLinkForSourceId, relatedSourceIds, type Lesson, type Statement } from "../src/content/lessons.js";
import { CHAPTER_1_SOURCE_RANGE, DEFINIZIONI_CHAPTER } from "../src/content/lessons-definizioni.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

/** [text, answer, image file, source group, source line], indexed by source_id - 1. */
const BANK = (JSON.parse(readFileSync("src/content/question-provenance.json", "utf8")) as {
  entries: [string, number, string | null, number, number][];
}).entries;

const [FIRST, LAST] = CHAPTER_1_SOURCE_RANGE;
const LESSONS = DEFINIZIONI_CHAPTER.lessons.filter((lesson) => !lesson.review);
const REVIEW = DEFINIZIONI_CHAPTER.lessons.find((lesson) => lesson.review) as Lesson;

function bankRow(sourceId: string) {
  const row = BANK[Number(sourceId) - 1];
  assert.ok(row, `${sourceId} exists in the bank`);
  return { text: row[0], answer: row[1], image: row[2] ? Number(row[2].replace(".png", "")) : null };
}

function statementsOf(lesson: Lesson): Statement[] {
  return [...lesson.practice, ...lesson.steps.flatMap((step) => (step.kind === "trap" ? step.examples : []))];
}

test("chapter 1 is the first bank group and comes first in the course, in official order", () => {
  // The bank's first group is "definizioni-generali-doveri-strada"; every one of its rows is group 1–50.
  assert.equal(BANK[FIRST - 1][3], 1);
  assert.equal(BANK[LAST - 1][3], 50);
  assert.equal(BANK[LAST][3], 51, "source id 532 opens chapter 2");
  assert.equal(CHAPTERS[0].id, DEFINIZIONI_CHAPTER.id);
  assert.deepEqual(DEFINIZIONI_CHAPTER.numbers, [1]);
  const firsts = CHAPTERS.map((chapter) => chapter.numbers[0]);
  assert.deepEqual(firsts, [...firsts].sort((a, b) => a - b), "chapters are in official number order");
});

test("every chapter 1 bank question is mapped to exactly one chapter 1 lesson section", () => {
  const owner = new Map<string, string>();
  for (const lesson of LESSONS) {
    for (const group of lesson.related) {
      for (const id of group.sourceIds) {
        assert.ok(Number(id) >= FIRST && Number(id) <= LAST, `${lesson.id} maps ${id}, outside chapter 1`);
        assert.ok(!owner.has(id), `${id} is mapped by both ${owner.get(id)} and ${lesson.id}`);
        owner.set(id, lesson.id);
      }
    }
  }
  const missing = Array.from({ length: LAST - FIRST + 1 }, (_, i) => String(FIRST + i)).filter((id) => !owner.has(id));
  assert.deepEqual(missing, [], "unmapped chapter 1 questions");
  // Mistakes in any chapter 1 question route to its chapter 1 lesson, including ones other chapters use as examples.
  for (const [id, lessonId] of owner) assert.equal(lessonLinkForSourceId(id)?.lessonId, lessonId, `${id} routes to ${lessonId}`);
  for (const chapter of CHAPTERS.filter((c) => c !== DEFINIZIONI_CHAPTER)) {
    for (const lesson of chapter.lessons) {
      for (const id of lesson.related.flatMap((group) => group.sourceIds)) {
        assert.ok(Number(id) > LAST, `${lesson.id} still maps chapter 1 question ${id}`);
      }
    }
  }
});

test("every quoted statement matches the pinned bank: text, answer key and image", () => {
  for (const lesson of DEFINIZIONI_CHAPTER.lessons) {
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
    for (const statement of statementsOf(lesson)) {
      assert.ok(related.has(statement.sourceId), `${lesson.id} quotes ${statement.sourceId} but does not map it`);
      assert.ok(!shown.has(statement.sourceId), `${lesson.id} shows ${statement.sourceId} twice`);
      shown.add(statement.sourceId);
    }
    for (const question of lesson.practice) {
      assert.ok(lesson.related.some((group) => group.sourceIds.includes(question.sourceId)), `${question.sourceId} is mapped in ${lesson.id}`);
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
  assert.equal(DEFINIZIONI_CHAPTER.lessons.at(-1), REVIEW);
  assert.deepEqual(REVIEW.related, []);
  const seenInLessons = new Set(LESSONS.flatMap((lesson) => [
    ...statementsOf(lesson).map((s) => s.sourceId),
    ...lesson.steps.flatMap((step) => (step.kind === "factors" ? step.columns.flatMap((c) => c.items.map((i) => i.sourceId)) : [])),
  ]));
  const homes = REVIEW.practice.map((question) => {
    assert.ok(!seenInLessons.has(question.sourceId), `review question ${question.sourceId} was already shown in a lesson`);
    return lessonLinkForSourceId(question.sourceId)?.lessonId;
  });
  assert.deepEqual(homes, LESSONS.map((lesson) => lesson.id), "one review question per lesson, in lesson order");
});

test("the client can draw every road scene and lesson step kind used by chapter 1", () => {
  const road = readFileSync("public/js/road.js", "utf8");
  const shell = readFileSync("src/app/shell.tsx", "utf8");
  assert.match(shell, /<script src="\/js\/road\.js"><\/script>[\s\S]*<script src="\/js\/learn\.js"><\/script>/, "road.js loads before learn.js");
  for (const lesson of DEFINIZIONI_CHAPTER.lessons) {
    for (const step of lesson.steps) {
      if (step.kind !== "anatomy") continue;
      assert.match(road, new RegExp(`\\b${step.scene}: \\{`), `scene ${step.scene} is drawn`);
      for (const part of step.parts) assert.match(road, new RegExp(`data-part="${part.id}"|part\\('${part.id}'`), `part ${part.id} of ${step.scene} is drawn`);
    }
  }
});

// ── Flow against real SQL ─────────────────────────────────────────────────────

const BOT_TOKEN = "123456:chapter1-test";
const USER = 9101;
const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;

function setup() {
  const { db, raw } = createSqliteD1();
  const insert = raw.prepare(`INSERT INTO questions (id, source_id, topic_id, text_it, correct_answer, image_url) VALUES (?, ?, NULL, ?, ?, NULL)`);
  for (const sourceId of new Set(CHAPTERS.flatMap((c) => c.lessons.flatMap(relatedSourceIds)))) {
    const row = BANK[Number(sourceId) - 1];
    insert.run(Number(sourceId), sourceId, row[0], row[1]);
  }
  raw.prepare(`INSERT INTO users (id, telegram_user_id, first_name, is_approved) VALUES (1, ?, 'A', 1)`).run(USER);
  const env = { DB: db, TELEGRAM_BOT_TOKEN: BOT_TOKEN, ALLOWED_TELEGRAM_USER_IDS: "1", PRIMARY_ADMIN_TELEGRAM_USER_ID: "1", LOG_CHANNEL_ID: "-100" } as AppEnv;
  async function call(method: string, path: string, body?: unknown) {
    const response = await worker.fetch(
      new Request(`https://example.test/api${path}`, {
        method,
        headers: { "Content-Type": "application/json", "X-Telegram-InitData": signedInitData(BOT_TOKEN, USER) },
        body: body === undefined ? undefined : JSON.stringify(body),
      }),
      env,
      ctx
    );
    return { status: response.status, body: (await response.json()) as Record<string, any> };
  }
  return { raw, call };
}

async function finish(call: ReturnType<typeof setup>["call"], lesson: Lesson, wrongFirst = false) {
  const opened = await call("GET", `/learn/lessons/${lesson.id}`);
  assert.equal(opened.status, 200);
  for (const [i, q] of opened.body.lesson.practice.entries()) {
    const answer = wrongFirst && i === 0 ? 1 - q.correctAnswer : q.correctAnswer;
    assert.equal((await call("POST", `/learn/lessons/${lesson.id}/answer`, { questionId: q.questionId, answer })).status, 200);
  }
  return call("POST", `/learn/lessons/${lesson.id}/complete`);
}

test("a new learner starts chapter 1 lesson 1, can resume, and walks lessons → review → chapter completion", async () => {
  const { raw, call } = setup();
  const home = await call("GET", "/learn");
  assert.equal(home.body.chapters[0].id, DEFINIZIONI_CHAPTER.id);
  assert.deepEqual(home.body.chapters[0].numbers, [1]);
  assert.equal(home.body.chapters[0].completed, false);
  assert.equal(home.body.today.items[0].lessonId, LESSONS[0].id);

  // Lesson numbers count lessons only; the review is labelled as the review.
  const first = await call("GET", `/learn/lessons/${LESSONS[0].id}`);
  assert.deepEqual(first.body.position, { index: 1, total: LESSONS.length, review: false });
  assert.deepEqual(first.body.chapter.numbers, [1]);
  const reviewOpened = await call("GET", `/learn/lessons/${REVIEW.id}`);
  assert.deepEqual(reviewOpened.body.position, { index: null, total: LESSONS.length, review: true });

  // Resume: progress is kept and monotonic.
  await call("POST", `/learn/lessons/${LESSONS[0].id}/progress`, { step: 4 });
  const resumed = await call("GET", `/learn/lessons/${LESSONS[0].id}`);
  assert.deepEqual([resumed.body.progress.state, resumed.body.progress.step], ["in_progress", 4]);

  // A wrong first answer is queued for review and linked back to its lesson section.
  const done1 = await finish(call, LESSONS[0], true);
  assert.equal(done1.status, 200);
  assert.equal(done1.body.practice.queuedForReview, 1);
  assert.equal(done1.body.next.lessonId, LESSONS[1].id);
  assert.equal(done1.body.next.chapterNumbers, null, "the next lesson is in the same chapter");
  const queued = raw.prepare(`SELECT COUNT(*) AS n FROM review_queue WHERE user_id = 1`).get() as { n: number };
  assert.equal(queued.n, 1);

  for (const lesson of LESSONS.slice(1)) assert.equal((await finish(call, lesson)).status, 200);
  const beforeReview = await call("GET", "/learn");
  assert.equal(beforeReview.body.chapters[0].completed, false, "the chapter is not complete before its review");

  const reviewDone = await finish(call, REVIEW);
  assert.equal(reviewDone.status, 200);
  assert.equal(reviewDone.body.chapterCompleted, true);
  assert.deepEqual(reviewDone.body.next.chapterNumbers, CHAPTERS[1].numbers, "after the review the next chapter is named by its number");

  const after = await call("GET", "/learn");
  assert.equal(after.body.chapters[0].completed, true);
  assert.ok(after.body.chapters[0].lessons.every((l: { state: string }) => l.state === "completed"));

  // Revisiting a completed lesson keeps it completed.
  const revisit = await call("GET", `/learn/lessons/${LESSONS[2].id}`);
  assert.equal(revisit.body.progress.state, "completed");

  // Review practice draws from the whole chapter, not just the review's own questions.
  const practice = await call("POST", "/learn/practice", { lessonId: REVIEW.id });
  assert.equal(practice.status, 200);
  assert.deepEqual(practice.body.lessonIds, DEFINIZIONI_CHAPTER.lessons.map((l) => l.id));
});

test("lesson terms can be saved to the vocabulary list from a chapter 1 lesson", async () => {
  const { call } = setup();
  const lesson = LESSONS[0];
  const term = lesson.steps.flatMap((step) => (step.kind === "terms" ? step.terms : []))[0];
  assert.equal((await call("POST", "/vocab", { termIt: term.it, termFa: term.fa })).status < 300, true);
  const opened = await call("GET", `/learn/lessons/${lesson.id}`);
  assert.ok(opened.body.savedTerms.includes(term.it));
});
