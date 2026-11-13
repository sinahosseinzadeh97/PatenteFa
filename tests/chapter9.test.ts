/**
 * Chapter 9 (Segnali complementari, segnali temporanei e di cantiere): content
 * integrity against the pinned question bank, full question coverage, the
 * chapter review, its place right after chapter 8, and the learner flow end to
 * end (resume, mistakes, vocab, nothing pre-completed, two learners kept apart).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import worker from "../src/index.js";
import { CHAPTERS, lessonLinkForSourceId, relatedSourceIds, type Lesson, type Statement } from "../src/content/lessons.js";
import { CHAPTER_9_SOURCE_RANGE, COMPLEMENTARI_CHAPTER } from "../src/content/lessons-complementari.js";
import { INDICAZIONE_CHAPTER } from "../src/content/lessons-indicazione.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

/** [text, answer, image file, source group, source line], indexed by source_id - 1. */
const BANK = (JSON.parse(readFileSync("src/content/question-provenance.json", "utf8")) as {
  entries: [string, number, string | null, number, number][];
}).entries;

const [FIRST, LAST] = CHAPTER_9_SOURCE_RANGE;
const CHAPTER = COMPLEMENTARI_CHAPTER;
const PREVIOUS = INDICAZIONE_CHAPTER;
const INDEX = CHAPTERS.indexOf(CHAPTER);
const LESSONS = CHAPTER.lessons.filter((lesson) => !lesson.review);
const REVIEW = CHAPTER.lessons.find((lesson) => lesson.review) as Lesson;
const DIGITS = ["۱", "۲", "۳", "۴", "۵", "۶"];

function bankRow(sourceId: string) {
  const row = BANK[Number(sourceId) - 1];
  assert.ok(row, `${sourceId} exists in the bank`);
  return { text: row[0], answer: row[1], image: row[2] ? Number(row[2].replace(".png", "")) : null };
}

function statementsOf(lesson: Lesson): Statement[] {
  return [...lesson.practice, ...lesson.steps.flatMap((step) => (step.kind === "trap" ? step.examples : []))];
}

const inChapter = (id: string) => Number(id) >= FIRST && Number(id) <= LAST;

test("chapter 9 is the bank's ninth group and comes right after chapter 8", () => {
  // "segnali-indicazione" ends at group 282; "segnali-complementari-cantiere" is groups 283–301 (source ids 3507–3687).
  assert.equal(BANK[FIRST - 2][3], 282);
  assert.equal(BANK[FIRST - 1][3], 283);
  assert.equal(BANK[LAST - 1][3], 301);
  assert.equal(BANK[LAST][3], 302, "source id 3688 opens chapter 10");
  assert.deepEqual(CHAPTER.numbers, [9]);
  assert.deepEqual(CHAPTER.topicIds, [7], "topic 7 (Segnali complementari) is this chapter's topic");
  assert.equal(CHAPTERS[INDEX - 1], PREVIOUS);
  assert.equal(INDEX, 8);
  const numbers = CHAPTERS.flatMap((c) => c.numbers);
  assert.deepEqual(numbers, [...numbers].sort((a, b) => a - b), "the course follows official chapter order");
  assert.equal(new Set(CHAPTERS.flatMap((c) => c.lessons.map((l) => l.id))).size, CHAPTERS.flatMap((c) => c.lessons).length, "lesson ids are unique");
});

test("every chapter 9 question is mapped to exactly one chapter 9 teaching section, and no other chapter maps one", () => {
  const owner = new Map<string, string>();
  for (const lesson of LESSONS) {
    for (const group of lesson.related) {
      assert.ok(group.step > 0 && group.step < lesson.steps.length, `${lesson.id} maps to a real section`);
      assert.ok(!["terms", "trap", "intro", "classify"].includes(lesson.steps[group.step].kind), `${lesson.id} maps questions to a teaching section`);
      for (const id of group.sourceIds) {
        assert.ok(inChapter(id), `${lesson.id} maps ${id}, outside chapter 9`);
        assert.ok(!owner.has(id), `${id} is mapped by both ${owner.get(id)} and ${lesson.id}`);
        owner.set(id, lesson.id);
      }
    }
  }
  const all = Array.from({ length: LAST - FIRST + 1 }, (_, i) => String(FIRST + i));
  assert.equal(all.length, 181);
  assert.deepEqual(all.filter((id) => !owner.has(id)), [], "unmapped chapter 9 questions");
  for (const [id, lessonId] of owner) assert.equal(lessonLinkForSourceId(id)?.lessonId, lessonId, `${id} routes to ${lessonId}`);
  for (const chapter of CHAPTERS.filter((c) => c !== CHAPTER)) {
    for (const lesson of chapter.lessons) {
      for (const id of relatedSourceIds(lesson)) assert.ok(!inChapter(id), `${lesson.id} maps chapter 9 question ${id}`);
    }
  }
});

test("each bank sign is taught in one section, so every mistake on it routes to the same table", () => {
  const sectionsBySign = new Map<number, Set<string>>();
  for (const lesson of LESSONS) {
    for (const group of lesson.related) {
      for (const id of group.sourceIds) {
        const image = bankRow(id).image as number;
        const set = sectionsBySign.get(image) ?? new Set<string>();
        set.add(`${lesson.id}#${group.step}`);
        sectionsBySign.set(image, set);
      }
    }
  }
  assert.equal(sectionsBySign.size, 19, "19 signs in chapter 9");
  for (const [image, sections] of sectionsBySign) assert.equal(sections.size, 1, `sign ${image} is split across ${[...sections].join(", ")}`);
});

test("every quoted statement matches the pinned bank: text, answer key and image", () => {
  for (const lesson of CHAPTER.lessons) {
    for (const statement of statementsOf(lesson)) {
      const row = bankRow(statement.sourceId);
      assert.equal(statement.textIt, row.text, `${statement.sourceId} text`);
      assert.equal(statement.answer, row.answer, `${statement.sourceId} answer key`);
      assert.equal(statement.sign ?? statement.figure ?? null, row.image, `${statement.sourceId} image`);
    }
  }
});

test("every mapped question's image is one its lesson lists", () => {
  for (const lesson of LESSONS) {
    const images = new Set([...lesson.signs, ...(lesson.figures ?? [])]);
    for (const id of relatedSourceIds(lesson)) {
      const image = bankRow(id).image;
      if (image !== null) assert.ok(images.has(image), `${id} shows image ${image}, not listed by ${lesson.id}`);
    }
  }
});

test("each lesson teaches before it tests and practises only its own questions", () => {
  assert.equal(LESSONS.length, 6);
  for (const lesson of LESSONS) {
    const related = new Set(relatedSourceIds(lesson));
    const shown = new Set<string>();
    for (const id of statementsOf(lesson).map((s) => s.sourceId)) {
      assert.ok(related.has(id), `${lesson.id} quotes ${id} but does not map it`);
      assert.ok(!shown.has(id), `${lesson.id} shows ${id} twice`);
      shown.add(id);
    }
    assert.ok(lesson.practice.some((q) => q.answer === 0) && lesson.practice.some((q) => q.answer === 1), `${lesson.id} practice mixes VERO and FALSO`);
    for (const question of lesson.practice) {
      assert.equal(lessonLinkForSourceId(question.sourceId)?.step, question.conceptStep, `${question.sourceId} practises the section it maps to`);
      assert.match(question.why, new RegExp(`قدم ${DIGITS[question.conceptStep - 1]}`), `${question.sourceId} feedback names its section`);
    }
    for (const group of lesson.related) {
      assert.ok(lesson.practice.some((q) => q.conceptStep === group.step), `${lesson.id} step ${group.step} has a practice question`);
    }
    for (const step of lesson.steps) {
      if (step.kind === "classify") {
        assert.ok(step.items.length >= 3);
        for (const item of step.items) assert.ok(item.answer >= 0 && item.answer < step.options.length, `${lesson.id} classify answer`);
        for (const option of step.options.keys()) assert.ok(step.items.some((item) => item.answer === option), `${lesson.id}: option ${option} is right at least once`);
        for (const item of step.items) if (item.sign) assert.ok(lesson.signs.includes(item.sign), `${lesson.id} lists sign ${item.sign}`);
      }
      if (step.kind === "table") {
        for (const row of step.rows) {
          assert.equal(row.values.length, step.columns.length, `${lesson.id} table row "${row.label}"`);
          if (row.sign) assert.ok(lesson.figures?.includes(row.sign) || lesson.signs.includes(row.sign), `${lesson.id} lists image ${row.sign}`);
        }
      }
    }
    assert.ok(lesson.steps.some((step) => step.kind === "terms" && step.terms.length >= 5), `${lesson.id} has a vocabulary step`);
  }
});

test("the chapter review comes last, takes two unseen questions from every lesson, and maps nothing itself", () => {
  assert.equal(CHAPTER.lessons.at(-1), REVIEW);
  assert.deepEqual(REVIEW.related, []);
  const seenInLessons = new Set(LESSONS.flatMap((lesson) => statementsOf(lesson).map((s) => s.sourceId)));
  const homes = REVIEW.practice.map((question) => {
    assert.ok(!seenInLessons.has(question.sourceId), `review question ${question.sourceId} was already shown in a lesson`);
    const link = lessonLinkForSourceId(question.sourceId);
    assert.equal(link?.step, question.conceptStep, `${question.sourceId} names the section that teaches it`);
    return link?.lessonId;
  });
  assert.deepEqual(homes, LESSONS.flatMap((lesson) => [lesson.id, lesson.id]), "two review questions per lesson, in lesson order");
  for (const [i, question] of REVIEW.practice.entries()) {
    assert.match(question.why, new RegExp(`درس ${DIGITS[Math.floor(i / 2)]}`), `${question.sourceId} feedback names its lesson`);
  }
  const summary = REVIEW.steps.find((step) => step.kind === "table");
  assert.equal(summary?.kind === "table" ? summary.rows.length : 0, LESSONS.length, "the summary has one line per lesson");
  assert.ok(REVIEW.practice.some((q) => q.answer === 0) && REVIEW.practice.some((q) => q.answer === 1), "the review mixes VERO and FALSO");
});

test("the client renders every step kind chapter 9 uses", () => {
  const learn = readFileSync("public/js/learn.js", "utf8");
  for (const lesson of CHAPTER.lessons) {
    for (const step of lesson.steps) assert.match(learn, new RegExp(`content\\.kind === '${step.kind}'`), `${step.kind} is rendered`);
  }
});

// ── Flow against real SQL ─────────────────────────────────────────────────────

const BOT_TOKEN = "123456:chapter9-test";
const USER_A = 9901;
const USER_B = 9902;
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

const chapterOf = (home: { body: Record<string, any> }) => home.body.chapters[INDEX];

test("a learner with earlier progress keeps it, and chapter 9 starts unstarted", async () => {
  const { raw, call } = setup();
  for (const lesson of PREVIOUS.lessons) {
    raw.prepare(`INSERT INTO lesson_progress (user_id, lesson_id, step, completed_at) VALUES (1, ?, 99, '2026-11-13 09:00:00')`).run(lesson.id);
  }
  const home = await call(USER_A, "GET", "/learn");
  assert.equal(home.body.chapters[INDEX - 1].completed, true, "chapter 8 stays completed");
  assert.ok(chapterOf(home).lessons.every((l: { state: string }) => l.state === "not_started"), "nothing new is marked completed");
  assert.equal(chapterOf(home).completed, false);
  assert.equal(home.body.today.items.find((item: { kind: string }) => item.kind === "lesson").lessonId, LESSONS[0].id, "today's path recommends chapter 9 after chapter 8");
});

test("after chapter 8 the learner is sent to chapter 9, can resume it, and walks lessons → review → completion", async () => {
  const { raw, call } = setup();
  for (const lesson of PREVIOUS.lessons.slice(0, -1)) await finish(call, USER_A, lesson);
  const prevReview = await finish(call, USER_A, PREVIOUS.lessons.at(-1) as Lesson);
  assert.equal(prevReview.body.chapterCompleted, true);
  assert.equal(prevReview.body.next.lessonId, LESSONS[0].id, "chapter 8's review hands over to chapter 9 lesson 1");
  assert.deepEqual(prevReview.body.next.chapterNumbers, [9]);

  const home = await call(USER_A, "GET", "/learn");
  assert.equal(chapterOf(home).id, CHAPTER.id);
  assert.deepEqual(chapterOf(home).numbers, [9]);
  assert.equal(chapterOf(home).lessons.length, CHAPTER.lessons.length);

  // Direct access to any lesson, with its own position (lesson numbers are per chapter).
  const fourth = await call(USER_A, "GET", `/learn/lessons/${LESSONS[3].id}`);
  assert.deepEqual(fourth.body.position, { index: 4, total: LESSONS.length, review: false });
  assert.deepEqual(fourth.body.chapter.numbers, [9]);
  assert.equal(fourth.body.chapter.reviewedOn, CHAPTER.reviewedOn);
  const review = await call(USER_A, "GET", `/learn/lessons/${REVIEW.id}`);
  assert.equal(review.body.position.review, true, "the review is not numbered as a lesson");

  await call(USER_A, "POST", `/learn/lessons/${LESSONS[0].id}/progress`, { step: 2 });
  const resumed = await call(USER_A, "GET", `/learn/lessons/${LESSONS[0].id}`);
  assert.deepEqual([resumed.body.progress.state, resumed.body.progress.step], ["in_progress", 2]);
  const homeResumed = await call(USER_A, "GET", "/learn");
  assert.equal(homeResumed.body.today.items.find((item: { kind: string }) => item.kind === "lesson").lessonId, LESSONS[0].id, "the unfinished lesson is recommended");

  // A wrong answer is queued once and routes back to its teaching section.
  const done1 = await finish(call, USER_A, LESSONS[0], true);
  assert.equal(done1.body.practice.queuedForReview, 1);
  assert.equal(done1.body.next.lessonId, LESSONS[1].id);
  const queued = raw.prepare(`SELECT q.source_id AS sourceId FROM review_queue r JOIN questions q ON q.id = r.question_id WHERE r.user_id = 1`).all() as { sourceId: string }[];
  assert.equal(queued.length, 1);
  const link = lessonLinkForSourceId(queued[0].sourceId);
  assert.equal(link?.lessonId, LESSONS[0].id);
  assert.ok(link && LESSONS[0].related.some((g) => g.step === link.step && g.sourceIds.includes(queued[0].sourceId)), "routes to the section that teaches it");

  for (const lesson of LESSONS.slice(1)) assert.equal((await finish(call, USER_A, lesson)).status, 200);
  assert.equal(chapterOf(await call(USER_A, "GET", "/learn")).completed, false, "not complete before the review");

  const reviewDone = await finish(call, USER_A, REVIEW, true);
  assert.equal(reviewDone.body.chapterCompleted, true);
  assert.equal(chapterOf(await call(USER_A, "GET", "/learn")).completed, true);
  assert.deepEqual(reviewDone.body.next?.chapterNumbers, CHAPTERS[INDEX + 1].numbers, "chapter 9's review hands over to the next chapter in course order");
  const reviewQueued = raw.prepare(`SELECT COUNT(*) AS n FROM review_queue WHERE user_id = 1`).get() as { n: number };
  assert.equal(reviewQueued.n, 2, "the review mistake joins the review queue");

  const practice = await call(USER_A, "POST", "/learn/practice", { lessonId: REVIEW.id });
  assert.equal(practice.status, 200);
  assert.deepEqual(practice.body.lessonIds, CHAPTER.lessons.map((l) => l.id));

  // Another learner sees none of it.
  const other = await call(USER_B, "GET", "/learn");
  assert.ok(chapterOf(other).lessons.every((l: { state: string }) => l.state === "not_started"));
  const otherQueue = raw.prepare(`SELECT COUNT(*) AS n FROM review_queue WHERE user_id = 2`).get() as { n: number };
  assert.equal(otherQueue.n, 0);
});

test("a chapter 9 lesson can be opened directly, revisited, and its terms saved to the vocabulary list per learner", async () => {
  const { call } = setup();
  const lesson = LESSONS[4];
  assert.equal((await finish(call, USER_A, lesson)).status, 200);
  const home = await call(USER_A, "GET", "/learn");
  assert.equal(chapterOf(home).lessons[4].state, "completed");
  assert.equal(chapterOf(home).completed, false, "one lesson does not complete the chapter");
  assert.ok(home.body.chapters[INDEX - 1].lessons.every((l: { state: string }) => l.state === "not_started"), "chapter 8 untouched");
  const again = await call(USER_A, "GET", `/learn/lessons/${lesson.id}`);
  assert.equal(again.body.progress.state, "completed", "revisiting keeps it completed");

  const term = lesson.steps.flatMap((step) => (step.kind === "terms" ? step.terms : []))[0];
  assert.ok((await call(USER_A, "POST", "/vocab", { termIt: term.it, termFa: term.fa })).status < 300);
  assert.ok((await call(USER_A, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
  assert.ok(!(await call(USER_B, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
});
