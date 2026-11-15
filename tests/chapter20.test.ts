/**
 * Chapter 20 (Patente, punti e documenti): content integrity against the
 * pinned question bank, full question coverage (all 234 here), the made-up
 * licence card drawing, the glossary headwords, the two flagged statements kept
 * out of practice, the chapter review, its place in the route right after
 * chapter 19, and the learner flow end to end (resume, mistakes, vocab,
 * nothing pre-completed, two learners kept apart).
 *
 * Neighbours are found by position and number, never by a fixed index.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import worker from "../src/index.js";
import { CHAPTERS, lessonLinkForSourceId, relatedSourceIds, type Lesson } from "../src/content/lessons.js";
import { CINTURE_CHAPTER } from "../src/content/lessons-cinture.js";
import { CHAPTER_20_SOURCE_RANGE, PATENTE_CHAPTER } from "../src/content/lessons-patente.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

/** [text, answer, image file, source group, source line], indexed by source_id - 1. */
const BANK = (JSON.parse(readFileSync("src/content/question-provenance.json", "utf8")) as {
  entries: [string, number, string | null, number, number][];
}).entries;

const [FIRST, LAST] = CHAPTER_20_SOURCE_RANGE;
const CHAPTER = PATENTE_CHAPTER;
const INDEX = CHAPTERS.indexOf(CHAPTER);
const PREVIOUS = CHAPTERS[INDEX - 1];
const LESSONS = CHAPTER.lessons.filter((lesson) => !lesson.review);
const REVIEW = CHAPTER.lessons.find((lesson) => lesson.review) as Lesson;
const toFa = (n: number) => String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

function bankRow(sourceId: string) {
  const row = BANK[Number(sourceId) - 1];
  assert.ok(row, `${sourceId} exists in the bank`);
  return { text: row[0], answer: row[1], image: row[2] };
}

/** Every bank statement a lesson quotes: practice, trap examples and factor items. */
function quotedOf(lesson: Lesson): { sourceId: string; textIt: string; answer: number }[] {
  return [
    ...lesson.practice,
    ...lesson.steps.flatMap((step) => (step.kind === "trap" ? step.examples : [])),
    ...lesson.steps.flatMap((step) => (step.kind === "factors" ? step.columns.flatMap((column) => column.items) : [])),
  ];
}

const inChapter = (id: string) => Number(id) >= FIRST && Number(id) <= LAST;

test("chapter 20 is the bank's twentieth group, placed right after chapter 19", () => {
  // "cinture-casco-sicurezza" ends at group 546; "patente-punti-documenti" is groups 547–564.
  assert.equal(BANK[FIRST - 2][3], 546);
  assert.equal(BANK[FIRST - 1][3], 547);
  assert.equal(BANK[LAST - 1][3], 564);
  assert.equal(BANK[LAST][3], 565, "source id 6360 opens the next bank group (incidenti-stradali-comportamenti)");
  assert.deepEqual(CHAPTER.numbers, [20]);
  assert.equal(CHAPTER.nameIt, "Patente, punti e documenti");
  assert.deepEqual(CHAPTER.topicIds, [], "topic 17 mostly belongs to later chapters");
  assert.ok(INDEX > 0, "registered in CHAPTERS");
  const numbers = CHAPTERS.map((c) => c.numbers[0]);
  assert.deepEqual(numbers, [...numbers].sort((a, b) => a - b), "the route is in official chapter order");
  assert.equal(new Set(CHAPTERS.flatMap((c) => c.numbers)).size, CHAPTERS.flatMap((c) => c.numbers).length, "every chapter number appears once");
  assert.equal(PREVIOUS, CINTURE_CHAPTER, "the chapter before is chapter 19");
  assert.ok(CHAPTERS.slice(INDEX + 1).every((c) => c.numbers[0] > 20));
});

test("eleven lessons with stable ids, then the review", () => {
  assert.deepEqual(LESSONS.map((l) => l.id), [
    "documenti-veicolo-targhe",
    "patente-am-a1",
    "patente-a2-a",
    "patente-b1-b",
    "patente-rimorchi-96-be",
    "patente-validita-conferma",
    "punti-patente-sistema",
    "punti-quali-violazioni",
    "patente-ritiro",
    "patente-sospensione",
    "patente-revisione-revoca",
  ]);
  assert.equal(REVIEW.id, "ripasso-capitolo-20");
  assert.equal(CHAPTER.lessons.at(-1), REVIEW);
});

test("every chapter 20 question maps to exactly one teaching section, and no other module maps one", () => {
  const owner = new Map<string, string>();
  for (const lesson of LESSONS) {
    for (const group of lesson.related) {
      assert.ok(group.step > 0 && group.step < lesson.steps.length, `${lesson.id} maps to a real section`);
      assert.ok(!["terms", "trap", "intro", "classify"].includes(lesson.steps[group.step].kind), `${lesson.id} maps questions to a teaching section`);
      for (const id of group.sourceIds) {
        assert.ok(inChapter(id), `${lesson.id} maps ${id}, outside chapter 20`);
        assert.ok(!owner.has(id), `${id} is mapped by both ${owner.get(id)} and ${lesson.id}`);
        owner.set(id, lesson.id);
      }
    }
  }
  const all = Array.from({ length: LAST - FIRST + 1 }, (_, i) => String(FIRST + i));
  assert.equal(all.length, 234);
  assert.deepEqual(all.filter((id) => !owner.has(id)), [], "unmapped chapter 20 questions");
  for (const [id, lessonId] of owner) assert.equal(lessonLinkForSourceId(id)?.lessonId, lessonId, `${id} routes to ${lessonId}`);
  for (const chapter of CHAPTERS.filter((c) => c !== CHAPTER)) {
    for (const lesson of chapter.lessons) {
      for (const id of relatedSourceIds(lesson)) assert.ok(!inChapter(id), `${lesson.id} maps chapter 20 question ${id}`);
    }
  }
});

test("the chapter has no bank images, and its licence card drawing exists with every part it names", () => {
  for (let id = FIRST; id <= LAST; id++) assert.equal(bankRow(String(id)).image, null, `${id} has no image`);
  for (const lesson of CHAPTER.lessons) assert.deepEqual(lesson.signs, [], `${lesson.id} lists no signs`);
  const road = readFileSync("public/js/road.js", "utf8");
  const scenes = LESSONS.flatMap((lesson) => lesson.steps.flatMap((step) => (step.kind === "anatomy" ? [step] : [])));
  assert.deepEqual(scenes.map((s) => s.scene), ["patente"]);
  for (const step of scenes) {
    const start = road.indexOf(`    ${step.scene}: { h: `);
    assert.ok(start > 0, `${step.scene} is drawn`);
    const block = road.slice(start, road.indexOf("} },", start));
    const drawn = [...block.matchAll(/part\('([a-z]+)'/g)].map((m) => m[1]);
    assert.deepEqual(drawn.sort(), step.parts.map((p) => p.id).sort(), `${step.scene}: every drawn part has text, every part is drawn`);
    assert.match(block, /ESEMPIO/, "the card is visibly made up");
  }
});

test("statements the sources flag are mapped but never shown as practice", () => {
  // #6295: art. 142 c.8 (L. 177/2024) now suspends repeat 10–40 km/h excesses in towns, so "can be
  // suspended at 20 km/h over" (FALSO) is debatable. #6214: art. 117 c.2-bis changed its numbers.
  const quoted = new Set(CHAPTER.lessons.flatMap((lesson) => quotedOf(lesson).map((s) => s.sourceId)));
  for (const id of ["6295", "6214"]) {
    assert.ok(!quoted.has(id), `${id} is not quoted`);
    assert.ok(lessonLinkForSourceId(id), `${id} still routes to its lesson`);
  }
});

test("chapter 20 uses its glossary headwords for the four licence measures", () => {
  const src = ["ch20-provvedimenti.ts", "ch20-punti.ts", "ch20-validita.ts", "ch20-ripasso.ts"].map((f) => readFileSync(`src/content/${f}`, "utf8")).join("\n");
  for (const word of ["گرفتنِ گواهینامه", "تعلیقِ گواهینامه", "بازآزمایی", "ابطالِ گواهینامه"]) assert.ok(src.includes(word), `uses «${word}»`);
  const glossary = readFileSync(".agent/rules/glossary.md", "utf8");
  for (const row of ["| revoca della patente | ابطالِ گواهینامه |", "| revisione della patente | بازآزماییِ گواهینامه |", "| codice armonizzato 96 | کدِ ۹۶ |"]) {
    assert.ok(glossary.includes(row), `glossary has ${row}`);
  }
});

test("every quoted statement matches the pinned bank: text and answer key", () => {
  for (const lesson of CHAPTER.lessons) {
    for (const statement of quotedOf(lesson)) {
      const row = bankRow(statement.sourceId);
      assert.equal(statement.textIt, row.text, `${statement.sourceId} text`);
      assert.equal(statement.answer, row.answer, `${statement.sourceId} answer key`);
    }
  }
});

test("factor items quote their own statement and sit in the column their answer key says", () => {
  for (const lesson of LESSONS) {
    for (const step of lesson.steps) {
      if (step.kind !== "factors") continue;
      for (const [i, column] of step.columns.entries()) {
        for (const item of column.items) {
          assert.ok(item.textIt.includes(item.it), `${item.sourceId}: "${item.it}" is words from the statement`);
          assert.equal(item.answer, i === 0 ? 1 : 0, `${item.sourceId} is in the ${i === 0 ? "VERO" : "FALSO"} column`);
        }
      }
    }
  }
});

test("each lesson teaches before it tests and quotes only its own questions, each once", () => {
  for (const lesson of LESSONS) {
    const related = new Set(relatedSourceIds(lesson));
    const shown = new Set<string>();
    for (const id of quotedOf(lesson).map((s) => s.sourceId)) {
      assert.ok(related.has(id), `${lesson.id} quotes ${id} but does not map it`);
      assert.ok(!shown.has(id), `${lesson.id} shows ${id} twice`);
      shown.add(id);
    }
    assert.ok(lesson.practice.some((q) => q.answer === 0) && lesson.practice.some((q) => q.answer === 1), `${lesson.id} practice mixes VERO and FALSO`);
    for (const question of lesson.practice) {
      assert.equal(lessonLinkForSourceId(question.sourceId)?.step, question.conceptStep, `${question.sourceId} practises the section it maps to`);
      assert.match(question.why, new RegExp(`قدم ${toFa(question.conceptStep)}\\)`), `${question.sourceId} feedback names its section`);
    }
    for (const group of lesson.related) {
      assert.ok(lesson.practice.some((q) => q.conceptStep === group.step), `${lesson.id} step ${group.step} has a practice question`);
    }
    for (const step of lesson.steps) {
      if (step.kind === "classify") {
        assert.ok(step.items.length >= 3);
        for (const item of step.items) assert.ok(item.answer >= 0 && item.answer < step.options.length, `${lesson.id} classify answer`);
        for (const option of step.options.keys()) assert.ok(step.items.some((item) => item.answer === option), `${lesson.id}: option ${option} is right at least once`);
      }
      if (step.kind === "table") {
        for (const row of step.rows) assert.equal(row.values.length, step.columns.length, `${lesson.id} table row "${row.label}"`);
      }
    }
    const classify = lesson.steps.findIndex((s) => s.kind === "classify");
    assert.ok(classify > Math.max(...lesson.related.map((g) => g.step)), `${lesson.id} tests only after teaching`);
    assert.ok(lesson.steps.some((step) => step.kind === "terms" && step.terms.length >= 5), `${lesson.id} has a vocabulary step`);
  }
});

test("the intro counts match the questions each lesson maps", () => {
  for (const lesson of LESSONS) {
    const intro = lesson.steps[0];
    const count = relatedSourceIds(lesson).length;
    assert.ok(intro.kind === "intro" && intro.why.startsWith(`${toFa(count)} سؤال`), `${lesson.id} intro says ${toFa(count)} questions`);
  }
});

test("the chapter review takes two unseen questions from every lesson and maps nothing itself", () => {
  assert.deepEqual(REVIEW.related, []);
  const seenInLessons = new Set(LESSONS.flatMap((lesson) => quotedOf(lesson).map((s) => s.sourceId)));
  const homes = REVIEW.practice.map((question) => {
    assert.ok(!seenInLessons.has(question.sourceId), `review question ${question.sourceId} was already shown in a lesson`);
    assert.ok(inChapter(question.sourceId), `${question.sourceId} is a chapter 20 question`);
    const link = lessonLinkForSourceId(question.sourceId);
    assert.equal(link?.step, question.conceptStep, `${question.sourceId} names the section that teaches it`);
    return link?.lessonId;
  });
  assert.deepEqual(homes, LESSONS.flatMap((lesson) => [lesson.id, lesson.id]), "two review questions per lesson, in lesson order");
  for (const [i, question] of REVIEW.practice.entries()) {
    assert.match(question.why, new RegExp(`درس ${toFa(Math.floor(i / 2) + 1)}\\)`), `${question.sourceId} feedback names its lesson`);
  }
  const summary = REVIEW.steps.find((step) => step.kind === "table");
  assert.equal(summary?.kind === "table" ? summary.rows.length : 0, LESSONS.length, "the summary has one line per lesson");
  assert.ok(REVIEW.practice.some((q) => q.answer === 0) && REVIEW.practice.some((q) => q.answer === 1), "the review mixes VERO and FALSO");
});

test("the client renders every step kind chapter 20 uses", () => {
  const learn = readFileSync("public/js/learn.js", "utf8");
  for (const lesson of CHAPTER.lessons) {
    for (const step of lesson.steps) assert.match(learn, new RegExp(`content\\.kind === '${step.kind}'`), `${step.kind} is rendered`);
  }
});

// ── Flow against real SQL ─────────────────────────────────────────────────────

const BOT_TOKEN = "123456:chapter20-test";
const USER_A = 20001;
const USER_B = 20002;
const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;

function setup() {
  const { db, raw } = createSqliteD1();
  const insert = raw.prepare(`INSERT INTO questions (id, source_id, topic_id, text_it, correct_answer, image_url) VALUES (?, ?, NULL, ?, ?, ?)`);
  for (const sourceId of new Set(CHAPTERS.flatMap((c) => c.lessons.flatMap(relatedSourceIds)))) {
    const row = BANK[Number(sourceId) - 1];
    insert.run(Number(sourceId), sourceId, row[0], row[1], row[2] ? `/images/signs/${row[2]}` : null);
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
const todayLesson = (home: { body: Record<string, any> }) => home.body.today.items.find((item: { kind: string }) => item.kind === "lesson")?.lessonId;

test("a learner who finished every earlier chapter starts chapter 20 unstarted and is sent to lesson 1", async () => {
  const { raw, call } = setup();
  for (const lesson of CHAPTERS.slice(0, INDEX).flatMap((c) => c.lessons)) {
    raw.prepare(`INSERT INTO lesson_progress (user_id, lesson_id, step, updated_at, completed_at) VALUES (1, ?, 99, '2026-11-14 09:00:00', '2026-11-14 09:00:00')`).run(lesson.id);
  }
  const home = await call(USER_A, "GET", "/learn");
  assert.ok(chapterOf(home).lessons.every((l: { state: string }) => l.state === "not_started"), "nothing in chapter 20 is pre-completed");
  assert.equal(chapterOf(home).completed, false);
  assert.ok(home.body.chapters.slice(0, INDEX).every((c: { completed: boolean }) => c.completed), "earlier chapters stay completed");
  assert.equal(todayLesson(home), LESSONS[0].id, "today's path recommends chapter 20 lesson 1");
});

test("after chapter 19 the learner is sent to chapter 20, can resume it, and walks lessons → review → completion", async () => {
  const { raw, call } = setup();
  for (const lesson of PREVIOUS.lessons.slice(0, -1)) await finish(call, USER_A, lesson);
  const prevReview = await finish(call, USER_A, PREVIOUS.lessons.at(-1) as Lesson);
  assert.equal(prevReview.body.chapterCompleted, true);
  assert.equal(prevReview.body.next.lessonId, LESSONS[0].id, "chapter 19's review hands over to chapter 20 lesson 1");
  assert.deepEqual(prevReview.body.next.chapterNumbers, [20]);

  // Direct access to any lesson, with its own position (lesson numbers are per chapter).
  const sixth = await call(USER_A, "GET", `/learn/lessons/${LESSONS[5].id}`);
  assert.deepEqual(sixth.body.position, { index: 6, total: LESSONS.length, review: false });
  assert.deepEqual(sixth.body.chapter.numbers, [20]);
  assert.equal(sixth.body.chapter.reviewedOn, CHAPTER.reviewedOn);
  const review = await call(USER_A, "GET", `/learn/lessons/${REVIEW.id}`);
  assert.equal(review.body.position.review, true, "the review is not numbered as a lesson");

  await call(USER_A, "POST", `/learn/lessons/${LESSONS[0].id}/progress`, { step: 2 });
  const resumed = await call(USER_A, "GET", `/learn/lessons/${LESSONS[0].id}`);
  assert.deepEqual([resumed.body.progress.state, resumed.body.progress.step], ["in_progress", 2]);
  assert.equal(todayLesson(await call(USER_A, "GET", "/learn")), LESSONS[0].id, "the unfinished lesson is recommended");

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
  // Next in course order, or (if chapter 20 is last) the first chapter this learner has not finished.
  const expectedNext = CHAPTERS[INDEX + 1]?.numbers ?? CHAPTERS[0].numbers;
  assert.deepEqual(reviewDone.body.next?.chapterNumbers, expectedNext, "the review hands over in course order");
  const reviewQueued = raw.prepare(`SELECT COUNT(*) AS n FROM review_queue WHERE user_id = 1`).get() as { n: number };
  assert.equal(reviewQueued.n, 2, "the review mistake joins the review queue");
  const reviewLink = lessonLinkForSourceId(REVIEW.practice[0].sourceId);
  assert.deepEqual([reviewLink?.lessonId, reviewLink?.step], [LESSONS[0].id, REVIEW.practice[0].conceptStep], "a review mistake links to its teaching section");

  const practice = await call(USER_A, "POST", "/learn/practice", { lessonId: REVIEW.id });
  assert.equal(practice.status, 200);
  assert.deepEqual(practice.body.lessonIds, CHAPTER.lessons.map((l) => l.id));

  // Another learner sees none of it.
  const other = await call(USER_B, "GET", "/learn");
  assert.ok(chapterOf(other).lessons.every((l: { state: string }) => l.state === "not_started"));
  const otherQueue = raw.prepare(`SELECT COUNT(*) AS n FROM review_queue WHERE user_id = 2`).get() as { n: number };
  assert.equal(otherQueue.n, 0);
});

test("a lesson can be opened directly, revisited, and its terms saved to the vocabulary list per learner", async () => {
  const { call } = setup();
  const lesson = LESSONS[4];
  assert.equal((await finish(call, USER_A, lesson)).status, 200);
  const home = await call(USER_A, "GET", "/learn");
  assert.equal(chapterOf(home).lessons[4].state, "completed");
  assert.equal(chapterOf(home).completed, false, "one lesson does not complete the chapter");
  assert.ok(home.body.chapters[INDEX - 1].lessons.every((l: { state: string }) => l.state === "not_started"), "the chapter before is untouched");
  const again = await call(USER_A, "GET", `/learn/lessons/${lesson.id}`);
  assert.equal(again.body.progress.state, "completed", "revisiting keeps it completed");

  const term = lesson.steps.flatMap((step) => (step.kind === "terms" ? step.terms : []))[0];
  assert.ok((await call(USER_A, "POST", "/vocab", { termIt: term.it, termFa: term.fa })).status < 300);
  assert.ok((await call(USER_A, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
  assert.ok(!(await call(USER_B, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
});
