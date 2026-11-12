/**
 * Chapter 5 (Segnali di precedenza): content integrity against the pinned
 * question bank, full question coverage, the pilot lessons it grew from kept
 * intact (ids and step order, so saved progress stays valid), the chapter
 * review, its place right after chapter 4, and the learner flow end to end
 * (old progress kept, resume, mistakes, vocab, two learners kept apart).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import worker from "../src/index.js";
import { CHAPTER_5_SOURCE_RANGE } from "../src/content/ch5-signs.js";
import { CHAPTERS, PILOT_CHAPTER, lessonLinkForSourceId, relatedSourceIds, type Lesson, type Statement } from "../src/content/lessons.js";
import { OBBLIGO_CHAPTER } from "../src/content/lessons-obbligo.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

/** [text, answer, image file, source group, source line], indexed by source_id - 1. */
const BANK = (JSON.parse(readFileSync("src/content/question-provenance.json", "utf8")) as {
  entries: [string, number, string | null, number, number][];
}).entries;

const [FIRST, LAST] = CHAPTER_5_SOURCE_RANGE;
const CHAPTER = PILOT_CHAPTER;
const LESSONS = CHAPTER.lessons.filter((lesson) => !lesson.review);
const REVIEW = CHAPTER.lessons.find((lesson) => lesson.review) as Lesson;
/** Later-chapter questions the pilot already mapped before chapter 5 was completed; kept so their routing does not change. */
const LEGACY_OUTSIDE = ["4394", "4564", "4565", "4569", "4637"];
/** Trap statements the pilot quotes from another lesson: #409 (chapter 1) beside #2276, and #2262 (lesson 4) beside #2384. */
const QUOTED_ELSEWHERE = new Map([
  ["diritto-di-precedenza", ["409"]],
  ["sensi-unici-alternati", ["2262"]],
]);
/** The pilot lessons, their position in the chapter, and their step kinds: unchanged, so a saved `step` still points at the same section. */
const PILOT = [
  { id: "dare-precedenza-stop", index: 1, kinds: ["intro", "compare", "sequence", "terms", "trap"] },
  { id: "diritto-di-precedenza", index: 3, kinds: ["intro", "diagram", "compare", "compare", "terms", "trap"] },
  { id: "sensi-unici-alternati", index: 7, kinds: ["intro", "compare", "diagram", "terms", "trap"] },
];

function bankRow(sourceId: string) {
  const row = BANK[Number(sourceId) - 1];
  assert.ok(row, `${sourceId} exists in the bank`);
  return { text: row[0], answer: row[1], image: row[2] ? Number(row[2].replace(".png", "")) : null };
}

function statementsOf(lesson: Lesson): Statement[] {
  return [...lesson.practice, ...lesson.steps.flatMap((step) => (step.kind === "trap" ? step.examples : []))];
}

test("chapter 5 is the bank's fifth group and comes right after chapter 4", () => {
  // "segnali-obbligo" ends at group 156; "segnali-precedenza" is groups 157–170 (source ids 2148–2390).
  assert.equal(BANK[FIRST - 2][3], 156);
  assert.equal(BANK[FIRST - 1][3], 157);
  assert.equal(BANK[LAST - 1][3], 170);
  assert.equal(BANK[LAST][3], 171, "source id 2391 opens chapter 6");
  assert.deepEqual(CHAPTER.numbers, [5]);
  assert.deepEqual(CHAPTER.topicIds, [4]);
  assert.equal(CHAPTERS[3], OBBLIGO_CHAPTER);
  assert.equal(CHAPTERS[4], CHAPTER);
  const numbers = CHAPTERS.flatMap((c) => c.numbers);
  assert.deepEqual(numbers, [...numbers].sort((a, b) => a - b), "the course follows official chapter order");
  assert.equal(new Set(CHAPTERS.flatMap((c) => c.lessons.map((l) => l.id))).size, CHAPTERS.flatMap((c) => c.lessons).length, "lesson ids are unique");
});

test("the pilot lessons keep their ids and step order, so saved progress points at the same sections", () => {
  for (const pilot of PILOT) {
    const lesson = CHAPTER.lessons[pilot.index];
    assert.equal(lesson.id, pilot.id);
    assert.deepEqual(lesson.steps.map((step) => step.kind), pilot.kinds, `${pilot.id} step order`);
  }
});

test("every chapter 5 question is mapped to exactly one chapter 5 section, and no other chapter maps one", () => {
  const owner = new Map<string, string>();
  for (const lesson of LESSONS) {
    for (const group of lesson.related) {
      assert.ok(group.step > 0 && group.step < lesson.steps.length, `${lesson.id} maps to a real section`);
      assert.notEqual(lesson.steps[group.step].kind, "terms", `${lesson.id} maps questions to a teaching section`);
      for (const id of group.sourceIds) {
        const inside = Number(id) >= FIRST && Number(id) <= LAST;
        assert.ok(inside || LEGACY_OUTSIDE.includes(id), `${lesson.id} maps ${id}, outside chapter 5`);
        assert.ok(!owner.has(id), `${id} is mapped by both ${owner.get(id)} and ${lesson.id}`);
        owner.set(id, lesson.id);
      }
    }
  }
  const all = Array.from({ length: LAST - FIRST + 1 }, (_, i) => String(FIRST + i));
  assert.deepEqual(all.filter((id) => !owner.has(id)), [], "unmapped chapter 5 questions");
  assert.equal(all.filter((id) => owner.has(id)).length, 243);
  for (const [id, lessonId] of owner) assert.equal(lessonLinkForSourceId(id)?.lessonId, lessonId, `${id} routes to ${lessonId}`);
  for (const chapter of CHAPTERS.filter((c) => c !== CHAPTER)) {
    for (const lesson of chapter.lessons) {
      for (const id of relatedSourceIds(lesson)) assert.ok(Number(id) < FIRST || Number(id) > LAST, `${lesson.id} maps chapter 5 question ${id}`);
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

test("every mapped question's image is one the chapter lists", () => {
  const images = new Set(CHAPTER.lessons.flatMap((lesson) => [...lesson.signs, ...(lesson.figures ?? [])]));
  for (const id of CHAPTER.lessons.flatMap(relatedSourceIds)) {
    const image = bankRow(id).image;
    if (image !== null) assert.ok(images.has(image), `${id} shows image ${image}, not listed by chapter 5`);
  }
});

test("each lesson teaches before it tests and practises only its own questions", () => {
  assert.ok(LESSONS.length >= 9, "the chapter covers all 14 sign groups, not only the pilot's three lessons");
  for (const lesson of LESSONS) {
    const related = new Set([...relatedSourceIds(lesson), ...(QUOTED_ELSEWHERE.get(lesson.id) ?? [])]);
    const shown = new Set<string>();
    for (const id of statementsOf(lesson).map((s) => s.sourceId)) {
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
  assert.equal(CHAPTER.lessons.at(-1), REVIEW);
  assert.deepEqual(REVIEW.related, []);
  const seenInLessons = new Set(LESSONS.flatMap((lesson) => statementsOf(lesson).map((s) => s.sourceId)));
  const homes = REVIEW.practice.map((question) => {
    assert.ok(!seenInLessons.has(question.sourceId), `review question ${question.sourceId} was already shown in a lesson`);
    return lessonLinkForSourceId(question.sourceId)?.lessonId;
  });
  assert.deepEqual(homes, LESSONS.map((lesson) => lesson.id), "one review question per lesson, in lesson order");
  const summary = REVIEW.steps.find((step) => step.kind === "table");
  assert.equal(summary?.kind === "table" ? summary.rows.length : 0, LESSONS.length, "the summary has one line per lesson");
});

test("the client renders every step kind chapter 5 uses", () => {
  const learn = readFileSync("public/js/learn.js", "utf8");
  for (const lesson of CHAPTER.lessons) {
    for (const step of lesson.steps) assert.match(learn, new RegExp(`content\\.kind === '${step.kind}'`), `${step.kind} is rendered`);
  }
});

// ── Flow against real SQL ─────────────────────────────────────────────────────

const BOT_TOKEN = "123456:chapter5-test";
const USER_A = 9501;
const USER_B = 9502;
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

const chapterOf = (home: { body: Record<string, any> }) => home.body.chapters[4];

test("a learner who finished the old pilot keeps those lessons, gets the new ones unstarted, and is sent to them", async () => {
  const { raw, call } = setup();
  // Progress saved before chapter 5 was completed: the three pilot lessons done.
  const saved = raw.prepare(`INSERT INTO lesson_progress (user_id, lesson_id, step, completed_at) VALUES (1, ?, 99, '2026-10-01 09:00:00')`);
  for (const pilot of PILOT) saved.run(pilot.id);
  const before = await call(USER_A, "GET", "/learn");
  for (const lesson of chapterOf(before).lessons as { id: string; state: string }[]) {
    assert.equal(lesson.state, PILOT.some((p) => p.id === lesson.id) ? "completed" : "not_started", `${lesson.id} is ${lesson.state}`);
  }
  assert.equal(chapterOf(before).completed, false, "new material is never marked completed for them");
  assert.equal(before.body.today.items.find((item: { kind: string }) => item.kind === "lesson").lessonId, LESSONS[0].id, "today's path offers the first new lesson");

  // The next lesson after an old pilot lesson skips the completed ones.
  const opened = await call(USER_A, "GET", `/learn/lessons/${PILOT[0].id}`);
  assert.equal(opened.body.progress.state, "completed");
  assert.equal(opened.body.next.lessonId, CHAPTER.lessons[2].id, "after the old lesson 1 comes the new lesson right after it");
});

test("after chapter 4 the learner is sent to chapter 5, can resume it, and walks lessons → review → completion", async () => {
  const { raw, call } = setup();
  for (const lesson of OBBLIGO_CHAPTER.lessons.slice(0, -1)) await finish(call, USER_A, lesson);
  const ch4Review = await finish(call, USER_A, OBBLIGO_CHAPTER.lessons.at(-1) as Lesson);
  assert.equal(ch4Review.body.chapterCompleted, true);
  assert.equal(ch4Review.body.next.lessonId, LESSONS[0].id, "chapter 4's review hands over to chapter 5 lesson 1");
  assert.deepEqual(ch4Review.body.next.chapterNumbers, [5]);

  const home = await call(USER_A, "GET", "/learn");
  assert.equal(chapterOf(home).id, CHAPTER.id);
  assert.deepEqual(chapterOf(home).numbers, [5]);
  assert.ok(chapterOf(home).lessons.every((l: { state: string }) => l.state === "not_started"));
  assert.equal(home.body.today.items.find((item: { kind: string }) => item.kind === "lesson").lessonId, LESSONS[0].id, "today's path recommends chapter 5");

  const first = await call(USER_A, "GET", `/learn/lessons/${LESSONS[0].id}`);
  assert.deepEqual(first.body.position, { index: 1, total: LESSONS.length, review: false });
  assert.deepEqual(first.body.chapter.numbers, [5]);
  assert.equal(first.body.chapter.reviewedOn, CHAPTER.reviewedOn);

  await call(USER_A, "POST", `/learn/lessons/${LESSONS[0].id}/progress`, { step: 3 });
  const resumed = await call(USER_A, "GET", `/learn/lessons/${LESSONS[0].id}`);
  assert.deepEqual([resumed.body.progress.state, resumed.body.progress.step], ["in_progress", 3]);

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

  const reviewDone = await finish(call, USER_A, REVIEW);
  assert.equal(reviewDone.body.chapterCompleted, true);
  assert.equal(chapterOf(await call(USER_A, "GET", "/learn")).completed, true);
  assert.deepEqual(reviewDone.body.next?.chapterNumbers, CHAPTERS[5].numbers, "chapter 5's review hands over to the next chapter in course order");

  const practice = await call(USER_A, "POST", "/learn/practice", { lessonId: REVIEW.id });
  assert.equal(practice.status, 200);
  assert.deepEqual(practice.body.lessonIds, CHAPTER.lessons.map((l) => l.id));

  // Another learner sees none of it.
  const other = await call(USER_B, "GET", "/learn");
  assert.ok(chapterOf(other).lessons.every((l: { state: string }) => l.state === "not_started"));
  const otherQueue = raw.prepare(`SELECT COUNT(*) AS n FROM review_queue WHERE user_id = 2`).get() as { n: number };
  assert.equal(otherQueue.n, 0);
});

test("a chapter 5 lesson can be opened directly, and its terms saved to the vocabulary list per learner", async () => {
  const { call } = setup();
  const lesson = LESSONS.at(-1) as Lesson;
  assert.equal((await finish(call, USER_A, lesson)).status, 200);
  const home = await call(USER_A, "GET", "/learn");
  assert.equal(chapterOf(home).lessons.at(-2).state, "completed");
  assert.ok(home.body.chapters[3].lessons.every((l: { state: string }) => l.state === "not_started"), "chapter 4 untouched");

  const term = lesson.steps.flatMap((step) => (step.kind === "terms" ? step.terms : []))[0];
  assert.ok((await call(USER_A, "POST", "/vocab", { termIt: term.it, termFa: term.fa })).status < 300);
  assert.ok((await call(USER_A, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
  assert.ok(!(await call(USER_B, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
});
