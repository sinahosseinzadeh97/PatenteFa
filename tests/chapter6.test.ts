/**
 * Chapter 6 (Segnaletica orizzontale e segni sugli ostacoli): content
 * integrity against the pinned question bank, full question coverage, the
 * centre-line lesson moved from the overtaking module kept intact (id and step
 * order, so saved progress stays valid), the chapter review, its place right
 * after chapter 5, and the learner flow end to end (old progress kept, resume,
 * mistakes, vocab, two learners kept apart).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import worker from "../src/index.js";
import { CHAPTERS, PILOT_CHAPTER, lessonLinkForSourceId, relatedSourceIds, type Lesson, type Statement } from "../src/content/lessons.js";
import { CHAPTER_6_MAPPED_ELSEWHERE, CHAPTER_6_SOURCE_RANGE, SEGNALETICA_CHAPTER } from "../src/content/lessons-segnaletica.js";
import { SORPASSO_CHAPTER } from "../src/content/lessons-sorpasso.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

/** [text, answer, image file, source group, source line], indexed by source_id - 1. */
const BANK = (JSON.parse(readFileSync("src/content/question-provenance.json", "utf8")) as {
  entries: [string, number, string | null, number, number][];
}).entries;

const [FIRST, LAST] = CHAPTER_6_SOURCE_RANGE;
const CHAPTER = SEGNALETICA_CHAPTER;
const LESSONS = CHAPTER.lessons.filter((lesson) => !lesson.review);
const REVIEW = CHAPTER.lessons.find((lesson) => lesson.review) as Lesson;
/** The centre-line lesson built for the overtaking module, now lesson 2 here: unchanged id, position and step kinds. */
const MOVED = { id: "sorpasso-strisce", index: 1, kinds: ["intro", "markings", "terms", "trap"], mapped: 62 };
/** Overtaking-group questions about centre lines the moved lesson already mapped; kept so their mistake links do not change. */
const LEGACY_OUTSIDE = ["5192", "5220", "5246", "5259"];

function bankRow(sourceId: string) {
  const row = BANK[Number(sourceId) - 1];
  assert.ok(row, `${sourceId} exists in the bank`);
  return { text: row[0], answer: row[1], image: row[2] ? Number(row[2].replace(".png", "")) : null };
}

function statementsOf(lesson: Lesson): Statement[] {
  return [...lesson.practice, ...lesson.steps.flatMap((step) => (step.kind === "trap" ? step.examples : []))];
}

const inChapter = (id: string) => Number(id) >= FIRST && Number(id) <= LAST;

test("chapter 6 is the bank's sixth group and comes right after chapter 5", () => {
  // "segnali-precedenza" ends at group 170; "segnaletica-orizzontale-ostacoli" is groups 171–197 (source ids 2391–2650).
  assert.equal(BANK[FIRST - 2][3], 170);
  assert.equal(BANK[FIRST - 1][3], 171);
  assert.equal(BANK[LAST - 1][3], 197);
  assert.equal(BANK[LAST][3], 198, "source id 2651 opens chapter 7");
  assert.deepEqual(CHAPTER.numbers, [6]);
  assert.deepEqual(CHAPTER.topicIds, [5]);
  assert.equal(CHAPTERS[4], PILOT_CHAPTER);
  assert.equal(CHAPTERS[5], CHAPTER);
  const numbers = CHAPTERS.flatMap((c) => c.numbers);
  assert.deepEqual(numbers, [...numbers].sort((a, b) => a - b), "the course follows official chapter order");
  assert.equal(new Set(CHAPTERS.flatMap((c) => c.lessons.map((l) => l.id))).size, CHAPTERS.flatMap((c) => c.lessons).length, "lesson ids are unique");
});

test("the centre-line lesson moved from the overtaking module keeps its id, step order and mappings", () => {
  const lesson = CHAPTER.lessons[MOVED.index];
  assert.equal(lesson.id, MOVED.id);
  assert.deepEqual(lesson.steps.map((step) => step.kind), MOVED.kinds);
  assert.equal(lesson.related.flatMap((g) => g.sourceIds).filter(inChapter).length, MOVED.mapped);
  assert.ok(!SORPASSO_CHAPTER.lessons.some((l) => l.id === MOVED.id), "it lives in one chapter only");
  assert.deepEqual(SORPASSO_CHAPTER.topicIds, [12], "road markings (topic 5) are chapter 6 now");
});

test("every chapter 6 question is mapped to exactly one chapter 6 section, except four overtaking questions chapter 15 keeps", () => {
  const owner = new Map<string, string>();
  for (const lesson of LESSONS) {
    for (const group of lesson.related) {
      assert.ok(group.step > 0 && group.step < lesson.steps.length, `${lesson.id} maps to a real section`);
      assert.notEqual(lesson.steps[group.step].kind, "terms", `${lesson.id} maps questions to a teaching section`);
      for (const id of group.sourceIds) {
        assert.ok(inChapter(id) || (lesson.id === MOVED.id && LEGACY_OUTSIDE.includes(id)), `${lesson.id} maps ${id}, outside chapter 6`);
        assert.ok(!owner.has(id), `${id} is mapped by both ${owner.get(id)} and ${lesson.id}`);
        owner.set(id, lesson.id);
      }
    }
  }
  const all = Array.from({ length: LAST - FIRST + 1 }, (_, i) => String(FIRST + i));
  const elsewhere = new Set<string>(CHAPTER_6_MAPPED_ELSEWHERE);
  assert.deepEqual(all.filter((id) => !owner.has(id) && !elsewhere.has(id)), [], "unmapped chapter 6 questions");
  assert.equal([...owner.keys()].filter(inChapter).length, 256);
  assert.deepEqual([...owner.keys()].filter((id) => !inChapter(id)).sort(), LEGACY_OUTSIDE);
  for (const id of elsewhere) assert.equal(lessonLinkForSourceId(id)?.lessonId, "sorpasso-valutare", `${id} stays with the overtaking checks`);
  for (const [id, lessonId] of owner) assert.equal(lessonLinkForSourceId(id)?.lessonId, lessonId, `${id} routes to ${lessonId}`);
  for (const chapter of CHAPTERS.filter((c) => c !== CHAPTER)) {
    for (const lesson of chapter.lessons) {
      for (const id of relatedSourceIds(lesson)) assert.ok(!inChapter(id) || elsewhere.has(id), `${lesson.id} maps chapter 6 question ${id}`);
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
    if (image !== null) assert.ok(images.has(image), `${id} shows image ${image}, not listed by chapter 6`);
  }
});

test("each lesson teaches before it tests and practises only its own questions", () => {
  assert.equal(LESSONS.length, 10);
  for (const lesson of LESSONS) {
    const related = new Set(relatedSourceIds(lesson));
    const shown = new Set<string>();
    for (const id of statementsOf(lesson).map((s) => s.sourceId)) {
      assert.ok(related.has(id), `${lesson.id} quotes ${id} but does not map it`);
      assert.ok(!shown.has(id), `${lesson.id} shows ${id} twice`);
      shown.add(id);
    }
    assert.ok(lesson.practice.length >= 3, `${lesson.id} has practice`);
    for (const question of lesson.practice) {
      assert.ok(question.conceptStep > 0 && question.conceptStep < lesson.steps.length);
      assert.equal(lessonLinkForSourceId(question.sourceId)?.step, question.conceptStep, `${question.sourceId} practises the section it maps to`);
    }
    for (const step of lesson.steps) {
      if (step.kind === "classify") {
        assert.ok(step.items.length >= 3);
        for (const item of step.items) assert.ok(item.answer >= 0 && item.answer < step.options.length, `${lesson.id} classify answer`);
        for (const option of step.options.keys()) assert.ok(step.items.some((item) => item.answer === option), `${lesson.id}: option ${option} is right at least once`);
        for (const item of step.items) if (item.figure) assert.ok(lesson.figures?.includes(item.figure), `${lesson.id} lists figure ${item.figure}`);
      }
      if (step.kind === "table") {
        for (const row of step.rows) {
          assert.equal(row.values.length, step.columns.length, `${lesson.id} table row "${row.label}"`);
          if (row.sign) assert.ok(lesson.figures?.includes(row.sign) || lesson.signs.includes(row.sign), `${lesson.id} lists image ${row.sign}`);
        }
      }
      if (step.kind === "anatomy") assert.equal(new Set(step.parts.map((p) => p.id)).size, step.parts.length);
    }
  }
});

test("the chapter review comes last, takes one unseen question from every lesson, and maps nothing itself", () => {
  assert.equal(CHAPTER.lessons.at(-1), REVIEW);
  assert.deepEqual(REVIEW.related, []);
  const seenInLessons = new Set(
    LESSONS.flatMap((lesson) => [
      ...statementsOf(lesson).map((s) => s.sourceId),
      ...lesson.steps.flatMap((step) => (step.kind === "markings" ? step.lines.flatMap((line) => line.evidence.map((e) => e.sourceId)) : [])),
    ])
  );
  const homes = REVIEW.practice.map((question) => {
    assert.ok(!seenInLessons.has(question.sourceId), `review question ${question.sourceId} was already shown in a lesson`);
    return lessonLinkForSourceId(question.sourceId)?.lessonId;
  });
  assert.deepEqual(homes, LESSONS.map((lesson) => lesson.id), "one review question per lesson, in lesson order");
  const summary = REVIEW.steps.find((step) => step.kind === "table");
  assert.equal(summary?.kind === "table" ? summary.rows.length : 0, LESSONS.length, "the summary has one line per lesson");
});

test("the client renders every step kind chapter 6 uses and draws the junction approach", () => {
  const learn = readFileSync("public/js/learn.js", "utf8");
  const road = readFileSync("public/js/road.js", "utf8");
  for (const lesson of CHAPTER.lessons) {
    for (const step of lesson.steps) {
      assert.match(learn, new RegExp(`content\\.kind === '${step.kind}'`), `${step.kind} is rendered`);
      if (step.kind !== "anatomy") continue;
      assert.match(road, new RegExp(`\\b${step.scene}: \\{`), `scene ${step.scene} is drawn`);
      for (const part of step.parts) assert.match(road, new RegExp(`part\\('${part.id}'`), `part ${part.id} of ${step.scene} is drawn`);
    }
  }
});

// ── Flow against real SQL ─────────────────────────────────────────────────────

const BOT_TOKEN = "123456:chapter6-test";
const USER_A = 9601;
const USER_B = 9602;
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

const chapterOf = (home: { body: Record<string, any> }) => home.body.chapters[5];

test("a learner who finished the centre-line lesson in the overtaking module keeps it, and nothing new is marked done", async () => {
  const { raw, call } = setup();
  raw.prepare(`INSERT INTO lesson_progress (user_id, lesson_id, step, completed_at) VALUES (1, ?, 99, '2026-10-12 09:00:00')`).run(MOVED.id);
  const home = await call(USER_A, "GET", "/learn");
  for (const lesson of chapterOf(home).lessons as { id: string; state: string }[]) {
    assert.equal(lesson.state, lesson.id === MOVED.id ? "completed" : "not_started", `${lesson.id} is ${lesson.state}`);
  }
  assert.equal(chapterOf(home).completed, false, "new material is never marked completed for them");
  const overtaking = home.body.chapters.find((c: { id: string }) => c.id === SORPASSO_CHAPTER.id);
  assert.equal(overtaking.lessons.length, SORPASSO_CHAPTER.lessons.length);
  assert.ok(overtaking.lessons.every((l: { state: string }) => l.state === "not_started"), "chapter 15 shows no progress it did not have");
  const opened = await call(USER_A, "GET", `/learn/lessons/${MOVED.id}`);
  assert.equal(opened.body.progress.state, "completed");
  assert.deepEqual(opened.body.position, { index: 2, total: LESSONS.length, review: false });
  assert.deepEqual(opened.body.chapter.numbers, [6]);
});

test("after chapter 5 the learner is sent to chapter 6, can resume it, and walks lessons → review → completion", async () => {
  const { raw, call } = setup();
  for (const lesson of PILOT_CHAPTER.lessons.slice(0, -1)) await finish(call, USER_A, lesson);
  const ch5Review = await finish(call, USER_A, PILOT_CHAPTER.lessons.at(-1) as Lesson);
  assert.equal(ch5Review.body.chapterCompleted, true);
  assert.equal(ch5Review.body.next.lessonId, LESSONS[0].id, "chapter 5's review hands over to chapter 6 lesson 1");
  assert.deepEqual(ch5Review.body.next.chapterNumbers, [6]);

  const home = await call(USER_A, "GET", "/learn");
  assert.equal(chapterOf(home).id, CHAPTER.id);
  assert.deepEqual(chapterOf(home).numbers, [6]);
  assert.ok(chapterOf(home).lessons.every((l: { state: string }) => l.state === "not_started"));
  assert.equal(home.body.today.items.find((item: { kind: string }) => item.kind === "lesson").lessonId, LESSONS[0].id, "today's path recommends chapter 6");

  const fourth = await call(USER_A, "GET", `/learn/lessons/${LESSONS[3].id}`);
  assert.deepEqual(fourth.body.position, { index: 4, total: LESSONS.length, review: false });
  assert.equal(fourth.body.chapter.reviewedOn, CHAPTER.reviewedOn);

  await call(USER_A, "POST", `/learn/lessons/${LESSONS[0].id}/progress`, { step: 3 });
  const resumed = await call(USER_A, "GET", `/learn/lessons/${LESSONS[0].id}`);
  assert.deepEqual([resumed.body.progress.state, resumed.body.progress.step], ["in_progress", 3]);
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

  const reviewDone = await finish(call, USER_A, REVIEW);
  assert.equal(reviewDone.body.chapterCompleted, true);
  assert.equal(chapterOf(await call(USER_A, "GET", "/learn")).completed, true);
  assert.deepEqual(reviewDone.body.next?.chapterNumbers, CHAPTERS[6].numbers, "chapter 6's review hands over to the next chapter in course order");

  const practice = await call(USER_A, "POST", "/learn/practice", { lessonId: REVIEW.id });
  assert.equal(practice.status, 200);
  assert.deepEqual(practice.body.lessonIds, CHAPTER.lessons.map((l) => l.id));

  // Another learner sees none of it.
  const other = await call(USER_B, "GET", "/learn");
  assert.ok(chapterOf(other).lessons.every((l: { state: string }) => l.state === "not_started"));
  const otherQueue = raw.prepare(`SELECT COUNT(*) AS n FROM review_queue WHERE user_id = 2`).get() as { n: number };
  assert.equal(otherQueue.n, 0);
});

test("a chapter 6 lesson can be opened directly, and its terms saved to the vocabulary list per learner", async () => {
  const { call } = setup();
  const lesson = LESSONS.at(-1) as Lesson;
  assert.equal((await finish(call, USER_A, lesson)).status, 200);
  const home = await call(USER_A, "GET", "/learn");
  assert.equal(chapterOf(home).lessons.at(-2).state, "completed");
  assert.ok(home.body.chapters[4].lessons.every((l: { state: string }) => l.state === "not_started"), "chapter 5 untouched");

  const term = lesson.steps.flatMap((step) => (step.kind === "terms" ? step.terms : []))[0];
  assert.ok((await call(USER_A, "POST", "/vocab", { termIt: term.it, termFa: term.fa })).status < 300);
  assert.ok((await call(USER_A, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
  assert.ok(!(await call(USER_B, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
});
