/**
 * Chapter 16 (Fermata, sosta, arresto): content integrity against the pinned
 * question bank, full question coverage (191 of 191, one section each, no
 * other module), the two art. 158 lists kept in their own lessons, the
 * chapter review, its place right after chapter 15, and the learner flow end
 * to end (resume, mistakes, vocab, nothing pre-completed, two learners kept
 * apart).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import worker from "../src/index.js";
import { CHAPTERS, lessonLinkForSourceId, relatedSourceIds, type Lesson, type Statement } from "../src/content/lessons.js";
import { CHAPTER_16_SOURCE_RANGE, FERMATA_CHAPTER } from "../src/content/lessons-fermata.js";
import { lessonSostaFermata } from "../src/content/ch3-sosta.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

/** [text, answer, image file, source group, source line], indexed by source_id - 1. */
const BANK = (JSON.parse(readFileSync("src/content/question-provenance.json", "utf8")) as {
  entries: [string, number, string | null, number, number][];
}).entries;

const [FIRST, LAST] = CHAPTER_16_SOURCE_RANGE;
const CHAPTER = FERMATA_CHAPTER;
const INDEX = CHAPTERS.indexOf(CHAPTER);
const PREVIOUS = CHAPTERS[INDEX - 1];
const LESSONS = CHAPTER.lessons.filter((lesson) => !lesson.review);
const REVIEW = CHAPTER.lessons.find((lesson) => lesson.review) as Lesson;
const DIGITS = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

function bankRow(sourceId: string) {
  const row = BANK[Number(sourceId) - 1];
  assert.ok(row, `${sourceId} exists in the bank`);
  return { text: row[0], answer: row[1], image: row[2] ? Number(row[2].replace(".png", "")) : null };
}

function statementsOf(lesson: Lesson): Statement[] {
  return [...lesson.practice, ...lesson.steps.flatMap((step) => (step.kind === "trap" ? step.examples : []))];
}

const inChapter = (id: string) => Number(id) >= FIRST && Number(id) <= LAST;
const link = (id: string) => [lessonLinkForSourceId(id)?.lessonId, lessonLinkForSourceId(id)?.step];

test("chapter 16 is the bank's sixteenth group, right after chapter 15", () => {
  // "sorpasso" ends at group 451; "fermata-sosta-arresto" is groups 452–472 (source ids 5292–5482).
  assert.equal(BANK[FIRST - 2][3], 451);
  assert.equal(BANK[FIRST - 1][3], 452);
  assert.equal(BANK[LAST - 1][3], 472);
  assert.equal(BANK[LAST][3], 473, "source id 5483 opens the next bank group (norme-varie-autostrade-pannelli)");
  assert.deepEqual(CHAPTER.numbers, [16]);
  assert.equal(CHAPTER.nameIt, "Fermata, sosta, arresto");
  assert.deepEqual(CHAPTER.topicIds, [14]);
  assert.deepEqual(PREVIOUS.numbers, [15], "chapter 15 comes right before");
  const after = CHAPTERS[INDEX + 1];
  if (after) assert.ok(after.numbers[0] > 16, "nothing numbered 16 or lower comes after chapter 16");
  const numbers = CHAPTERS.flatMap((c) => c.numbers);
  assert.equal(new Set(numbers).size, numbers.length, "every chapter number appears once");
});

test("seven lessons and the review, with stable ids", () => {
  assert.deepEqual(LESSONS.map((l) => l.id), [
    "fermata-sosta-definizioni",
    "fermata-sosta-posizione",
    "fermata-sosta-vietate",
    "solo-sosta-vietata",
    "spazi-riservati-punti",
    "sosta-sicura-portiere",
    "prima-di-partire",
  ]);
  assert.equal(REVIEW.id, "ripasso-capitolo-16");
  assert.equal(CHAPTER.lessons.at(-1), REVIEW);
});

test("every chapter 16 question maps to exactly one chapter 16 teaching section, and no other module maps one", () => {
  const owner = new Map<string, string>();
  for (const lesson of LESSONS) {
    for (const group of lesson.related) {
      assert.ok(group.step > 0 && group.step < lesson.steps.length, `${lesson.id} maps to a real section`);
      assert.ok(!["terms", "trap", "intro", "classify"].includes(lesson.steps[group.step].kind), `${lesson.id} maps questions to a teaching section`);
      for (const id of group.sourceIds) {
        assert.ok(inChapter(id), `${lesson.id} maps ${id}, outside chapter 16`);
        assert.ok(!owner.has(id), `${id} is mapped by both ${owner.get(id)} and ${lesson.id}`);
        owner.set(id, lesson.id);
      }
    }
  }
  const all = Array.from({ length: LAST - FIRST + 1 }, (_, i) => String(FIRST + i));
  assert.equal(all.length, 191);
  assert.deepEqual(all.filter((id) => !owner.has(id)), [], "unmapped chapter 16 questions");
  for (const [id, lessonId] of owner) assert.equal(lessonLinkForSourceId(id)?.lessonId, lessonId, `${id} routes to ${lessonId}`);
  for (const chapter of CHAPTERS.filter((c) => c !== CHAPTER)) {
    for (const lesson of chapter.lessons) {
      for (const id of relatedSourceIds(lesson)) assert.ok(!inChapter(id), `${lesson.id} maps chapter 16 question ${id}`);
    }
  }
});

test("the two art. 158 lists live in their own lessons: both banned in L3, only sosta in L4", () => {
  // Same place, fermata and sosta wording: both route to lesson 3.
  for (const id of ["5343", "5405", "5347", "5409", "5366", "5359", "5364", "5426"]) {
    assert.equal(link(id)[0], "fermata-sosta-vietate", `${id}: art. 158 c.1 (both banned)`);
  }
  for (const id of ["5421", "5431", "5434", "5449", "5453"]) {
    assert.deepEqual(link(id), ["solo-sosta-vietata", 1], `${id}: art. 158 c.2 (sosta only)`);
  }
  // "Fermata is banned here too" where only sosta is: the contrast section.
  for (const id of ["5353", "5360", "5361", "5369", "5370", "5373", "5374"]) {
    assert.deepEqual(link(id), ["solo-sosta-vietata", 2], `${id}: fermata allowed, sosta not`);
  }
  for (const id of ["5458", "5459", "5460", "5461", "5462", "5463", "5464", "5465", "5466", "5467"]) {
    assert.deepEqual(link(id), ["spazi-riservati-punti", 2], `${id}: points`);
  }
  for (const id of ["5320", "5324", "5376", "5468", "5470"]) {
    assert.deepEqual(link(id), ["fermata-sosta-definizioni", 1], `${id}: a definition`);
  }
});

test("chapter 16's only bank image is sign 84 on #5361, listed by the lesson that maps it", () => {
  for (const lesson of LESSONS) {
    const images = new Set([...lesson.signs, ...(lesson.figures ?? [])]);
    for (const id of relatedSourceIds(lesson)) {
      const image = bankRow(id).image;
      if (id === "5361") assert.equal(image, 84);
      else assert.equal(image, null, `${id} has no image`);
      if (image !== null) assert.ok(images.has(image), `${id} shows image ${image}, not listed by ${lesson.id}`);
    }
  }
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

test("each lesson teaches before it tests and practises only its own questions", () => {
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
      }
      if (step.kind === "table") {
        for (const row of step.rows) assert.equal(row.values.length, step.columns.length, `${lesson.id} table row "${row.label}"`);
      }
    }
    assert.ok(lesson.steps.some((step) => step.kind === "terms" && step.terms.length >= 5), `${lesson.id} has a vocabulary step`);
  }
});

test("the intro counts match the questions each lesson maps", () => {
  const toFa = (n: number) => String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
  for (const lesson of LESSONS) {
    const intro = lesson.steps[0];
    const count = relatedSourceIds(lesson).length;
    assert.ok(intro.kind === "intro" && intro.why.startsWith(`${toFa(count)} سؤال`), `${lesson.id} intro says ${toFa(count)} questions`);
  }
});

test("lesson 1 links chapter 3's sign lesson instead of copying it, and chapter 3 is untouched", () => {
  const table = LESSONS[0].steps[1];
  assert.ok(table.kind === "table" && /فصلِ ۳ \(درسِ ۱۱\)/.test(table.body), "lesson 1 points to chapter 3 lesson 11");
  assert.equal(lessonSostaFermata.id, "divieto-sosta-fermata");
  assert.deepEqual(CHAPTERS.find((c) => c.lessons.includes(lessonSostaFermata))?.numbers, [3]);
  for (const id of relatedSourceIds(lessonSostaFermata)) assert.ok(!inChapter(id), "chapter 3 maps no chapter 16 question");
});

test("the chapter review takes two unseen questions from every lesson and maps nothing itself", () => {
  assert.deepEqual(REVIEW.related, []);
  const seenInLessons = new Set(LESSONS.flatMap((lesson) => statementsOf(lesson).map((s) => s.sourceId)));
  const homes = REVIEW.practice.map((question) => {
    assert.ok(!seenInLessons.has(question.sourceId), `review question ${question.sourceId} was already shown in a lesson`);
    assert.ok(inChapter(question.sourceId), `${question.sourceId} is a chapter 16 question`);
    const target = lessonLinkForSourceId(question.sourceId);
    assert.equal(target?.step, question.conceptStep, `${question.sourceId} names the section that teaches it`);
    return target?.lessonId;
  });
  assert.deepEqual(homes, LESSONS.flatMap((lesson) => [lesson.id, lesson.id]), "two review questions per lesson, in lesson order");
  for (const [i, question] of REVIEW.practice.entries()) {
    assert.match(question.why, new RegExp(`درس ${DIGITS[Math.floor(i / 2)]}`), `${question.sourceId} feedback names its lesson`);
  }
  for (const statement of statementsOf(REVIEW)) {
    const row = bankRow(statement.sourceId);
    assert.deepEqual([statement.textIt, statement.answer], [row.text, row.answer], `${statement.sourceId} matches the bank`);
  }
  const summary = REVIEW.steps.find((step) => step.kind === "table");
  assert.equal(summary?.kind === "table" ? summary.rows.length : 0, LESSONS.length, "the summary has one line per lesson");
  assert.ok(REVIEW.practice.some((q) => q.answer === 0) && REVIEW.practice.some((q) => q.answer === 1), "the review mixes VERO and FALSO");
});

test("the client renders every step kind chapter 16 uses", () => {
  const learn = readFileSync("public/js/learn.js", "utf8");
  for (const lesson of CHAPTER.lessons) {
    for (const step of lesson.steps) assert.match(learn, new RegExp(`content\\.kind === '${step.kind}'`), `${step.kind} is rendered`);
  }
});

// ── Flow against real SQL ─────────────────────────────────────────────────────

const BOT_TOKEN = "123456:chapter16-test";
const USER_A = 16001;
const USER_B = 16002;
const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;

function setup() {
  const { db, raw } = createSqliteD1();
  const insert = raw.prepare(`INSERT INTO questions (id, source_id, topic_id, text_it, correct_answer, image_url) VALUES (?, ?, NULL, ?, ?, ?)`);
  for (const sourceId of new Set(CHAPTERS.flatMap((c) => c.lessons.flatMap(relatedSourceIds)))) {
    const row = BANK[Number(sourceId) - 1];
    insert.run(Number(sourceId), sourceId, row[0], row[1], row[2] ? `/img_sign/${row[2]}` : null);
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

function markCompleted(raw: ReturnType<typeof setup>["raw"], lessons: Lesson[]) {
  const stmt = raw.prepare(`INSERT INTO lesson_progress (user_id, lesson_id, step, updated_at, completed_at) VALUES (1, ?, 99, '2026-11-13 09:00:00', '2026-11-13 09:00:00')`);
  for (const lesson of lessons) stmt.run(lesson.id);
}

const chapterOf = (home: { body: Record<string, any> }) => home.body.chapters[INDEX];
const todayLesson = (home: { body: Record<string, any> }) => home.body.today.items.find((item: { kind: string }) => item.kind === "lesson")?.lessonId;

test("a learner who finished chapters 1–15 sees chapter 16 unstarted and recommended; nothing earlier changes", async () => {
  const { raw, call } = setup();
  markCompleted(raw, CHAPTERS.slice(0, INDEX).flatMap((c) => c.lessons));
  const home = await call(USER_A, "GET", "/learn");
  assert.ok(chapterOf(home).lessons.every((l: { state: string }) => l.state === "not_started"), "no chapter 16 lesson is pre-completed");
  assert.equal(chapterOf(home).completed, false);
  for (let i = 0; i < INDEX; i++) assert.equal(home.body.chapters[i].completed, true, `chapter ${CHAPTERS[i].numbers} stays completed`);
  assert.equal(todayLesson(home), LESSONS[0].id, "today's path recommends chapter 16 lesson 1");
});

test("after chapter 15 the learner is sent to chapter 16, can resume it, and walks lessons → review → completion", async () => {
  const { raw, call } = setup();
  markCompleted(raw, CHAPTERS.slice(0, INDEX - 1).flatMap((c) => c.lessons));
  for (const lesson of PREVIOUS.lessons.slice(0, -1)) await finish(call, USER_A, lesson);
  const prevLast = await finish(call, USER_A, PREVIOUS.lessons.at(-1) as Lesson);
  assert.equal(prevLast.body.chapterCompleted, true);
  assert.equal(prevLast.body.next.lessonId, LESSONS[0].id, "chapter 15's last entry hands over to chapter 16 lesson 1");
  assert.deepEqual(prevLast.body.next.chapterNumbers, [16]);

  // Direct access to any lesson, with its own position (lesson numbers are per chapter).
  const fifth = await call(USER_A, "GET", `/learn/lessons/${LESSONS[4].id}`);
  assert.deepEqual(fifth.body.position, { index: 5, total: LESSONS.length, review: false });
  assert.deepEqual(fifth.body.chapter.numbers, [16]);
  assert.equal(fifth.body.chapter.reviewedOn, CHAPTER.reviewedOn);
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
  const target = lessonLinkForSourceId(queued[0].sourceId);
  assert.equal(target?.lessonId, LESSONS[0].id);
  assert.ok(target && LESSONS[0].related.some((g) => g.step === target.step && g.sourceIds.includes(queued[0].sourceId)), "routes to the section that teaches it");

  for (const lesson of LESSONS.slice(1)) assert.equal((await finish(call, USER_A, lesson)).status, 200);
  assert.equal(chapterOf(await call(USER_A, "GET", "/learn")).completed, false, "not complete before the review");

  const reviewDone = await finish(call, USER_A, REVIEW, true);
  assert.equal(reviewDone.body.chapterCompleted, true);
  assert.equal(chapterOf(await call(USER_A, "GET", "/learn")).completed, true);
  const after = CHAPTERS[INDEX + 1];
  if (after) assert.deepEqual(reviewDone.body.next?.chapterNumbers, after.numbers, "chapter 16's review hands over to the next chapter in course order");
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

test("lesson 4 (with sign 84) opens directly, is revisited, and its terms save to the vocabulary list per learner", async () => {
  const { call } = setup();
  const lesson = LESSONS[3];
  const opened = await call(USER_A, "GET", `/learn/lessons/${lesson.id}`);
  assert.ok(opened.body.lesson.practice.some((q: { imageUrl?: string | null }) => q.imageUrl?.endsWith("84.png")), "the sign question keeps its image");
  assert.equal((await finish(call, USER_A, lesson)).status, 200);
  const home = await call(USER_A, "GET", "/learn");
  assert.equal(chapterOf(home).lessons[3].state, "completed");
  assert.equal(chapterOf(home).completed, false, "one lesson does not complete the chapter");
  const again = await call(USER_A, "GET", `/learn/lessons/${lesson.id}`);
  assert.equal(again.body.progress.state, "completed", "revisiting keeps it completed");

  const term = lesson.steps.flatMap((step) => (step.kind === "terms" ? step.terms : []))[0];
  assert.ok((await call(USER_A, "POST", "/vocab", { termIt: term.it, termFa: term.fa })).status < 300);
  assert.ok((await call(USER_A, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
  assert.ok(!(await call(USER_B, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
});
