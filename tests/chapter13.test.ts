/**
 * Chapter 13 (Norme di circolazione): content integrity against the pinned
 * question bank, full question coverage (354 mapped here, 25 pinned to the
 * modules that already taught them), its place right after chapter 12, the
 * chapter review, and the learner flow end to end (recommendation after
 * chapter 12, resume, mistakes, vocab, nothing pre-completed, two learners
 * kept apart).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import worker from "../src/index.js";
import { CHAPTERS, lessonLinkForSourceId, relatedSourceIds, type Lesson, type Statement } from "../src/content/lessons.js";
import { INCROCI_CHAPTER } from "../src/content/lessons-incroci.js";
import { CHAPTER_13_MAPPED_ELSEWHERE, CHAPTER_13_SOURCE_RANGE, NORME_CHAPTER } from "../src/content/lessons-norme.js";
import { VELOCITA_CHAPTER } from "../src/content/lessons-velocita.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

/** [text, answer, image file, source group, source line], indexed by source_id - 1. */
const BANK = (JSON.parse(readFileSync("src/content/question-provenance.json", "utf8")) as {
  entries: [string, number, string | null, number, number][];
}).entries;

const [FIRST, LAST] = CHAPTER_13_SOURCE_RANGE;
const CHAPTER = NORME_CHAPTER;
const PREVIOUS = VELOCITA_CHAPTER;
const INDEX = CHAPTERS.indexOf(CHAPTER);
const LESSONS = CHAPTER.lessons.filter((lesson) => !lesson.review);
const REVIEW = CHAPTER.lessons.find((lesson) => lesson.review) as Lesson;
const toFa = (n: number) => String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
/** «قدم ۱» but not «قدم ۱۰». */
const named = (word: string, n: number) => new RegExp(`${word} ${toFa(n)}(?![۰-۹])`);
const ELSEWHERE = new Map(Object.entries(CHAPTER_13_MAPPED_ELSEWHERE).flatMap(([lessonId, ids]) => ids.map((id) => [id, lessonId] as const)));

function bankRow(sourceId: string) {
  const row = BANK[Number(sourceId) - 1];
  assert.ok(row, `${sourceId} exists in the bank`);
  return { text: row[0], answer: row[1], image: row[2] ? Number(row[2].replace(".png", "")) : null };
}

function statementsOf(lesson: Lesson): Statement[] {
  return [...lesson.practice, ...lesson.steps.flatMap((step) => (step.kind === "trap" ? step.examples : []))];
}

const inChapter = (id: string) => Number(id) >= FIRST && Number(id) <= LAST;

test("chapter 13 is the bank's thirteenth group, right after chapter 12 and before chapter 14", () => {
  // "distanza-di-sicurezza" ends at group 360; "norme-di-circolazione" is groups 361–398 (source ids 4342–4720).
  assert.equal(BANK[FIRST - 2][3], 360);
  assert.equal(BANK[FIRST - 1][3], 361);
  assert.equal(BANK[LAST - 1][3], 398);
  assert.equal(BANK[LAST][3], 399, "source id 4721 opens the next bank group (precedenza-incroci)");
  assert.deepEqual(CHAPTER.numbers, [13]);
  assert.equal(CHAPTER.id, "norme-di-circolazione");
  assert.equal(CHAPTER.nameIt, "Norme di circolazione");
  assert.deepEqual(CHAPTER.topicIds, [16]);
  assert.equal(CHAPTERS[INDEX - 1], PREVIOUS);
  assert.equal(CHAPTERS[INDEX + 1], INCROCI_CHAPTER);
  assert.equal(INDEX, 12);
  const numbers = CHAPTERS.flatMap((c) => c.numbers);
  assert.equal(new Set(numbers).size, numbers.length, "every chapter number appears once");
  assert.equal(LESSONS.length, 13);
  assert.equal(CHAPTER.lessons.at(-1), REVIEW);
  assert.equal(REVIEW.id, "ripasso-capitolo-13");
  const ids = CHAPTERS.flatMap((c) => c.lessons.map((l) => l.id));
  assert.equal(new Set(ids).size, ids.length, "lesson ids stay unique across the course");
});

test("every chapter 13 question maps to exactly one teaching section: 354 here, 25 pinned where they were already taught", () => {
  const owner = new Map<string, string>();
  for (const lesson of LESSONS) {
    for (const group of lesson.related) {
      assert.ok(group.step > 0 && group.step < lesson.steps.length, `${lesson.id} maps to a real section`);
      assert.ok(!["terms", "trap", "intro", "classify"].includes(lesson.steps[group.step].kind), `${lesson.id} maps questions to a teaching section`);
      for (const id of group.sourceIds) {
        assert.ok(inChapter(id), `${lesson.id} maps ${id}, outside chapter 13`);
        assert.ok(!owner.has(id), `${id} is mapped by both ${owner.get(id)} and ${lesson.id}`);
        assert.ok(!ELSEWHERE.has(id), `${id} is pinned to ${ELSEWHERE.get(id)}`);
        owner.set(id, lesson.id);
      }
    }
  }
  const all = Array.from({ length: LAST - FIRST + 1 }, (_, i) => String(FIRST + i));
  assert.equal(all.length, 379);
  assert.equal(owner.size, 354);
  assert.equal(ELSEWHERE.size, 25);
  assert.deepEqual(all.filter((id) => !owner.has(id) && !ELSEWHERE.has(id)), [], "unmapped chapter 13 questions");
  for (const [id, lessonId] of owner) assert.equal(lessonLinkForSourceId(id)?.lessonId, lessonId, `${id} routes to ${lessonId}`);
  for (const [id, lessonId] of ELSEWHERE) assert.equal(lessonLinkForSourceId(id)?.lessonId, lessonId, `${id} stays with ${lessonId}`);
  // Nothing else in the course maps a chapter-13 question.
  for (const chapter of CHAPTERS.filter((c) => c !== CHAPTER)) {
    for (const lesson of chapter.lessons) {
      for (const id of relatedSourceIds(lesson).filter(inChapter)) {
        assert.equal(ELSEWHERE.get(id), lesson.id, `${lesson.id} maps chapter 13 question ${id} without a pin`);
      }
    }
  }
});

test("every bank image a lesson's questions show is listed by that lesson", () => {
  for (const lesson of LESSONS) {
    const images = new Set([...lesson.signs, ...(lesson.figures ?? [])]);
    for (const id of relatedSourceIds(lesson)) {
      const image = bankRow(id).image;
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
      assert.equal(statement.chunks.map((c) => c.it).join(" "), row.text, `${statement.sourceId} chunks rebuild the sentence`);
    }
    for (const step of lesson.steps) {
      if (step.kind !== "factors") continue;
      for (const item of step.columns.flatMap((c) => c.items)) {
        const row = bankRow(item.sourceId);
        assert.deepEqual([item.textIt, item.answer], [row.text, row.answer], `${item.sourceId} factor matches the bank`);
        assert.ok(row.text.includes(item.it), `${item.sourceId} key phrase is quoted from the sentence`);
      }
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
    assert.equal(lesson.steps[0].kind, "intro");
    assert.equal(lesson.steps.at(-1)?.kind, "trap");
    const trap = lesson.steps.at(-1);
    assert.ok(trap?.kind === "trap" && trap.examples.length === 2 && trap.examples[0].answer !== trap.examples[1].answer, `${lesson.id} trap pairs VERO with FALSO`);
    assert.ok(lesson.practice.some((q) => q.answer === 0) && lesson.practice.some((q) => q.answer === 1), `${lesson.id} practice mixes VERO and FALSO`);
    for (const question of lesson.practice) {
      assert.equal(lessonLinkForSourceId(question.sourceId)?.step, question.conceptStep, `${question.sourceId} practises the section it maps to`);
      assert.match(question.why, named("قدم", question.conceptStep), `${question.sourceId} feedback names its section`);
      assert.match(question.why, question.answer ? /^درست است/ : /^غلط است/, `${question.sourceId} feedback starts with the verdict`);
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
        if (step.figures) assert.equal(step.figures.length, step.columns.length, `${lesson.id} one figure per column`);
      }
      assert.ok(!/[(（][A-Za-z]/.test(step.title), `${lesson.id} step title "${step.title}" carries no bracketed Italian`);
    }
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
  const factorItems = LESSONS.flatMap((l) => l.steps.flatMap((s) => (s.kind === "factors" ? s.columns.flatMap((c) => c.items.map((i) => i.sourceId)) : [])));
  const seenInLessons = new Set([...LESSONS.flatMap((lesson) => statementsOf(lesson).map((s) => s.sourceId)), ...factorItems]);
  const homes = REVIEW.practice.map((question) => {
    assert.ok(!seenInLessons.has(question.sourceId), `review question ${question.sourceId} was already shown in a lesson`);
    assert.ok(inChapter(question.sourceId) && !ELSEWHERE.has(question.sourceId), `${question.sourceId} is a chapter 13 question taught here`);
    const link = lessonLinkForSourceId(question.sourceId);
    assert.equal(link?.step, question.conceptStep, `${question.sourceId} names the section that teaches it`);
    return link?.lessonId;
  });
  assert.deepEqual(homes, LESSONS.flatMap((lesson) => [lesson.id, lesson.id]), "two review questions per lesson, in lesson order");
  for (const [i, question] of REVIEW.practice.entries()) {
    assert.match(question.why, named("درس", Math.floor(i / 2) + 1), `${question.sourceId} feedback names its lesson`);
  }
  for (const statement of statementsOf(REVIEW)) {
    const row = bankRow(statement.sourceId);
    assert.deepEqual([statement.textIt, statement.answer, statement.sign ?? statement.figure ?? null], [row.text, row.answer, row.image], `${statement.sourceId} matches the bank`);
  }
  const summary = REVIEW.steps.find((step) => step.kind === "table");
  assert.equal(summary?.kind === "table" ? summary.rows.length : 0, LESSONS.length, "the summary has one line per lesson");
  assert.ok(REVIEW.practice.some((q) => q.answer === 0) && REVIEW.practice.some((q) => q.answer === 1), "the review mixes VERO and FALSO");
});

test("the client renders every step kind chapter 13 uses", () => {
  const learn = readFileSync("public/js/learn.js", "utf8");
  for (const lesson of CHAPTER.lessons) {
    for (const step of lesson.steps) assert.match(learn, new RegExp(`content\\.kind === '${step.kind}'`), `${step.kind} is rendered`);
  }
});

// ── Flow against real SQL ─────────────────────────────────────────────────────

const BOT_TOKEN = "123456:chapter13-test";
const USER_A = 13001;
const USER_B = 13002;
const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;

function setup() {
  const { db, raw } = createSqliteD1();
  const insert = raw.prepare(`INSERT INTO questions (id, source_id, topic_id, text_it, correct_answer, image_url) VALUES (?, ?, NULL, ?, ?, ?)`);
  for (const sourceId of new Set(CHAPTERS.flatMap((c) => c.lessons.flatMap(relatedSourceIds)))) {
    const row = BANK[Number(sourceId) - 1];
    insert.run(Number(sourceId), sourceId, row[0], row[1], row[2] ? `/img/${row[2]}` : null);
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

test("a learner who finished chapter 12 keeps it; chapter 13 starts unstarted and is recommended next", async () => {
  const { raw, call } = setup();
  for (const lesson of PREVIOUS.lessons) {
    raw.prepare(`INSERT INTO lesson_progress (user_id, lesson_id, step, updated_at, completed_at) VALUES (1, ?, 99, '2026-11-14 09:00:00', '2026-11-14 09:00:00')`).run(lesson.id);
  }
  const home = await call(USER_A, "GET", "/learn");
  assert.equal(home.body.chapters[INDEX - 1].completed, true, "chapter 12 stays completed");
  assert.ok(chapterOf(home).lessons.every((l: { state: string }) => l.state === "not_started"), "nothing in chapter 13 is pre-completed");
  assert.equal(chapterOf(home).completed, false);
  assert.equal(todayLesson(home), LESSONS[0].id, "today's path recommends chapter 13 lesson 1");
  const prevReview = await call(USER_A, "GET", `/learn/lessons/${PREVIOUS.lessons.at(-1)!.id}`);
  assert.equal(prevReview.body.next.lessonId, LESSONS[0].id, "chapter 12's review hands over to chapter 13");
  assert.deepEqual(prevReview.body.next.chapterNumbers, [13]);
});

test("chapter 13 can be resumed and walked lessons → review → completion, then hands over to chapter 14", async () => {
  const { raw, call } = setup();
  // Direct access to any lesson, with its own position (lesson numbers are per chapter, not chapter numbers).
  const tenth = await call(USER_A, "GET", `/learn/lessons/${LESSONS[9].id}`);
  assert.equal(tenth.status, 200);
  assert.deepEqual(tenth.body.position, { index: 10, total: LESSONS.length, review: false });
  assert.deepEqual(tenth.body.chapter.numbers, [13]);
  assert.equal(tenth.body.chapter.reviewedOn, CHAPTER.reviewedOn);
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
  assert.equal(reviewDone.body.next?.lessonId, INCROCI_CHAPTER.lessons[0].id, "chapter 13's review hands over to chapter 14");
  assert.deepEqual(reviewDone.body.next?.chapterNumbers, [14]);
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

test("a lesson with bank figures serves them through the API", async () => {
  const { call } = setup();
  const lesson = LESSONS.find((l) => l.practice.some((q) => q.figure));
  assert.ok(lesson, "at least one chapter-13 practice question shows a bank figure");
  const opened = await call(USER_A, "GET", `/learn/lessons/${lesson.id}`);
  const withFigure = lesson.practice.findIndex((q) => q.figure);
  assert.ok(opened.body.lesson.practice[withFigure].imageUrl, `${lesson.id} practice ${withFigure} keeps its image`);
});

test("a lesson opened directly can be revisited, and its terms saved to the vocabulary list per learner", async () => {
  const { call } = setup();
  const lesson = LESSONS[12];
  assert.equal((await finish(call, USER_A, lesson)).status, 200);
  const home = await call(USER_A, "GET", "/learn");
  assert.equal(chapterOf(home).lessons[12].state, "completed");
  assert.equal(chapterOf(home).completed, false, "one lesson does not complete the chapter");
  assert.ok(home.body.chapters[INDEX - 1].lessons.every((l: { state: string }) => l.state === "not_started"), "chapter 12 untouched");
  const again = await call(USER_A, "GET", `/learn/lessons/${lesson.id}`);
  assert.equal(again.body.progress.state, "completed", "revisiting keeps it completed");

  const term = lesson.steps.flatMap((step) => (step.kind === "terms" ? step.terms : []))[0];
  assert.ok((await call(USER_A, "POST", "/vocab", { termIt: term.it, termFa: term.fa })).status < 300);
  assert.ok((await call(USER_A, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
  assert.ok(!(await call(USER_B, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
});
