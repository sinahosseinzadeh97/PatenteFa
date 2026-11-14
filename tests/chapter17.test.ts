/**
 * Chapter 17 (Norme varie, autostrade, pannelli): content integrity against
 * the pinned question bank, full question coverage, the four questions that
 * stay with chapter 12, the two new road drawings, the chapter review, its
 * place in official order, and the learner flow end to end (resume, mistakes,
 * vocab, nothing pre-completed, two learners kept apart).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import worker from "../src/index.js";
import { CHAPTERS, lessonLinkForSourceId, relatedSourceIds, type Lesson, type Statement } from "../src/content/lessons.js";
import { AUTOSTRADE_CHAPTER, CHAPTER_17_MAPPED_ELSEWHERE, CHAPTER_17_SOURCE_RANGE } from "../src/content/lessons-autostrade.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

/** [text, answer, image file, source group, source line], indexed by source_id - 1. */
const BANK = (JSON.parse(readFileSync("src/content/question-provenance.json", "utf8")) as {
  entries: [string, number, string | null, number, number][];
}).entries;

const [FIRST, LAST] = CHAPTER_17_SOURCE_RANGE;
const CHAPTER = AUTOSTRADE_CHAPTER;
const INDEX = CHAPTERS.indexOf(CHAPTER);
const PREVIOUS = CHAPTERS[INDEX - 1];
const LESSONS = CHAPTER.lessons.filter((lesson) => !lesson.review);
const REVIEW = CHAPTER.lessons.find((lesson) => lesson.review) as Lesson;
const ELSEWHERE = new Set<string>(CHAPTER_17_MAPPED_ELSEWHERE);
const toFa = (n: number) => String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

function bankRow(sourceId: string) {
  const row = BANK[Number(sourceId) - 1];
  assert.ok(row, `${sourceId} exists in the bank`);
  return { text: row[0], answer: row[1], image: row[2] ? Number(row[2].replace(".png", "")) : null };
}

function statementsOf(lesson: Lesson): Statement[] {
  return [...lesson.practice, ...lesson.steps.flatMap((step) => (step.kind === "trap" ? step.examples : []))];
}

const factorIds = (lesson: Lesson) =>
  lesson.steps.flatMap((s) => (s.kind === "factors" ? s.columns.flatMap((c) => c.items.map((i) => i.sourceId)) : []));
const inChapter = (id: string) => Number(id) >= FIRST && Number(id) <= LAST;

test("chapter 17 is the bank's seventeenth group, in official order after chapter 16's place", () => {
  // "fermata-sosta-arresto" ends at group 472; "norme-varie-autostrade-pannelli" is groups 473–512 (ids 5483–5814).
  assert.equal(BANK[FIRST - 2][3], 472);
  assert.equal(BANK[FIRST - 1][3], 473);
  assert.equal(BANK[LAST - 1][3], 512);
  assert.equal(BANK[LAST][3], 513, "source id 5815 opens the next bank group (luci e dispositivi acustici)");
  assert.equal(LAST - FIRST + 1, 332);
  assert.deepEqual(CHAPTER.numbers, [17]);
  assert.ok(INDEX > 0, "registered in CHAPTERS");
  const below = CHAPTERS.flatMap((c) => c.numbers).filter((n) => n < 17);
  assert.equal(PREVIOUS.numbers.at(-1), Math.max(...below), "comes right after the highest-numbered chapter below 17");
  const numbers = CHAPTERS.flatMap((c) => c.numbers);
  assert.deepEqual(numbers, [...numbers].sort((a, b) => a - b), "the course follows official chapter order");
  assert.equal(new Set(numbers).size, numbers.length, "no chapter number is claimed twice");
  assert.equal(new Set(CHAPTERS.flatMap((c) => c.lessons.map((l) => l.id))).size, CHAPTERS.flatMap((c) => c.lessons).length, "lesson ids are unique");
});

test("every chapter 17 question maps to exactly one chapter 17 teaching section, except four that stay in chapter 12", () => {
  const owner = new Map<string, string>();
  for (const lesson of LESSONS) {
    for (const group of lesson.related) {
      assert.ok(group.step > 0 && group.step < lesson.steps.length, `${lesson.id} maps to a real section`);
      assert.ok(!["terms", "trap", "intro", "classify"].includes(lesson.steps[group.step].kind), `${lesson.id} maps questions to a teaching section`);
      for (const id of group.sourceIds) {
        assert.ok(inChapter(id), `${lesson.id} maps ${id}, outside chapter 17`);
        assert.ok(!ELSEWHERE.has(id), `${id} belongs to chapter 12`);
        assert.ok(!owner.has(id), `${id} is mapped by both ${owner.get(id)} and ${lesson.id}`);
        owner.set(id, lesson.id);
      }
    }
  }
  const all = Array.from({ length: LAST - FIRST + 1 }, (_, i) => String(FIRST + i));
  assert.deepEqual(all.filter((id) => !owner.has(id) && !ELSEWHERE.has(id)), [], "unmapped chapter 17 questions");
  assert.equal(owner.size, 328);
  for (const [id, lessonId] of owner) assert.equal(lessonLinkForSourceId(id)?.lessonId, lessonId, `${id} routes to ${lessonId}`);
  // The four kept in chapter 12 still route there, so saved review items keep their destination.
  const twelve = CHAPTERS.find((c) => c.numbers.includes(12));
  for (const id of ELSEWHERE) {
    const lessonId = lessonLinkForSourceId(id)?.lessonId;
    assert.ok(twelve?.lessons.some((l) => l.id === lessonId), `${id} still routes to chapter 12 (${lessonId})`);
  }
  for (const chapter of CHAPTERS.filter((c) => c !== CHAPTER && !c.numbers.includes(12))) {
    for (const lesson of chapter.lessons) {
      for (const id of relatedSourceIds(lesson)) assert.ok(!inChapter(id), `${lesson.id} (chapter ${chapter.numbers}) maps chapter 17 question ${id}`);
    }
  }
});

test("every image question is taught in the panels lesson, which lists the image", () => {
  const panels = LESSONS.find((l) => l.id === "pannelli-posteriori") as Lesson;
  const images = new Set([...panels.signs, ...(panels.figures ?? [])]);
  const seen = new Set<number>();
  for (const lesson of LESSONS) {
    for (const id of relatedSourceIds(lesson)) {
      const image = bankRow(id).image;
      if (image === null) continue;
      seen.add(image);
      assert.equal(lesson, panels, `${id} (image ${image}) is taught by the panels lesson, not ${lesson.id}`);
      assert.ok(images.has(image), `image ${image} is listed by the panels lesson`);
    }
  }
  assert.deepEqual([...seen].sort(), [279, 302, 303, 304, 305]);
});

test("every quoted statement matches the pinned bank: text, answer key and image", () => {
  for (const lesson of CHAPTER.lessons) {
    for (const statement of statementsOf(lesson)) {
      const row = bankRow(statement.sourceId);
      assert.equal(statement.textIt, row.text, `${statement.sourceId} text`);
      assert.equal(statement.answer, row.answer, `${statement.sourceId} answer key`);
      assert.equal(statement.sign ?? statement.figure ?? null, row.image, `${statement.sourceId} image`);
    }
    for (const step of lesson.steps) {
      if (step.kind !== "factors") continue;
      for (const [column, items] of step.columns.map((c, i) => [i, c.items] as const)) {
        for (const item of items) {
          const row = bankRow(item.sourceId);
          assert.deepEqual([item.textIt, item.answer], [row.text, row.answer], `${item.sourceId} factor matches the bank`);
          assert.ok(item.textIt.includes(item.it), `${item.sourceId} key phrase is quoted from the statement`);
          assert.equal(item.answer, column === 0 ? 1 : 0, `${item.sourceId} sits in the column of its answer`);
          assert.ok(relatedSourceIds(lesson).includes(item.sourceId), `${lesson.id} maps its factor ${item.sourceId}`);
        }
      }
    }
  }
});

test("each lesson teaches before it tests and practises only its own questions", () => {
  assert.equal(LESSONS.length, 14);
  for (const lesson of LESSONS) {
    const related = new Set(relatedSourceIds(lesson));
    const shown = new Set<string>(factorIds(lesson));
    for (const id of statementsOf(lesson).map((s) => s.sourceId)) {
      assert.ok(related.has(id), `${lesson.id} quotes ${id} but does not map it`);
      assert.ok(!shown.has(id), `${lesson.id} shows ${id} twice`);
      shown.add(id);
    }
    assert.ok(lesson.practice.some((q) => q.answer === 0) && lesson.practice.some((q) => q.answer === 1), `${lesson.id} practice mixes VERO and FALSO`);
    for (const question of lesson.practice) {
      assert.equal(lessonLinkForSourceId(question.sourceId)?.step, question.conceptStep, `${question.sourceId} practises the section it maps to`);
      assert.match(question.why, new RegExp(`قدم ${toFa(question.conceptStep)}`), `${question.sourceId} feedback names its section`);
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
        if (step.figures) assert.equal(step.figures.length, step.columns.length, `${lesson.id}: one figure per column`);
      }
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

test("the two new drawings exist and every part a lesson names is drawn", () => {
  const road = readFileSync("public/js/road.js", "utf8");
  for (const lesson of LESSONS) {
    for (const step of lesson.steps) {
      if (step.kind !== "anatomy") continue;
      const start = road.indexOf(`${step.scene}: {`);
      const scene = road.slice(start, road.indexOf("} },", start));
      assert.ok(start >= 0 && scene.length > 20, `scene ${step.scene} is drawn`);
      for (const part of step.parts) assert.match(scene, new RegExp(`part\\('${part.id}'`), `${step.scene} draws part ${part.id}`);
    }
  }
  assert.deepEqual(
    LESSONS.flatMap((l) => l.steps.flatMap((s) => (s.kind === "anatomy" ? [s.scene] : []))),
    ["triangolo", "lanes", "rimorchio"]
  );
});

test("the law change after the 2023 bank is flagged, not silently applied", () => {
  // CdS art. 175 c.2-bis (L. 177/2024): motorcycles from 120 cm3 with an adult rider. #5529 keeps its bank
  // answer and stays mapped, is not quizzed, and the teaching text says the rule changed.
  assert.ok(!CHAPTER.lessons.some((l) => statementsOf(l).some((s) => s.sourceId === "5529")), "#5529 is not quizzed");
  const access = LESSONS.find((l) => l.id === "autostrada-chi-entra") as Lesson;
  assert.match(JSON.stringify(access.steps[1]), /۲۰۲۴/);
  assert.match(JSON.stringify(access.steps[1]), /c\.2-bis/);
});

test("the chapter review comes last, takes one unseen question from every lesson, and maps nothing itself", () => {
  assert.equal(CHAPTER.lessons.at(-1), REVIEW);
  assert.deepEqual(REVIEW.related, []);
  const seenInLessons = new Set(LESSONS.flatMap((lesson) => [...statementsOf(lesson).map((s) => s.sourceId), ...factorIds(lesson)]));
  const homes = REVIEW.practice.map((question) => {
    assert.ok(!seenInLessons.has(question.sourceId), `review question ${question.sourceId} was already shown in a lesson`);
    const link = lessonLinkForSourceId(question.sourceId);
    assert.equal(link?.step, question.conceptStep, `${question.sourceId} names the section that teaches it`);
    return link?.lessonId;
  });
  assert.deepEqual(homes, LESSONS.map((lesson) => lesson.id), "one review question per lesson, in lesson order");
  for (const [i, question] of REVIEW.practice.entries()) {
    assert.match(question.why, new RegExp(`درس ${toFa(i + 1)}\\)`), `${question.sourceId} feedback names its lesson`);
  }
  for (const statement of statementsOf(REVIEW)) {
    const row = bankRow(statement.sourceId);
    assert.deepEqual([statement.textIt, statement.answer, statement.sign ?? statement.figure ?? null], [row.text, row.answer, row.image]);
  }
  const summary = REVIEW.steps.find((step) => step.kind === "table");
  assert.equal(summary?.kind === "table" ? summary.rows.length : 0, LESSONS.length, "the summary has one line per lesson");
  assert.ok(REVIEW.practice.some((q) => q.answer === 0) && REVIEW.practice.some((q) => q.answer === 1), "the review mixes VERO and FALSO");
});

test("the client renders every step kind chapter 17 uses", () => {
  const learn = readFileSync("public/js/learn.js", "utf8");
  for (const lesson of CHAPTER.lessons) {
    for (const step of lesson.steps) assert.match(learn, new RegExp(`content\\.kind === '${step.kind}'`), `${step.kind} is rendered`);
  }
});

// ── Flow against real SQL ─────────────────────────────────────────────────────

const BOT_TOKEN = "123456:chapter17-test";
const USER_A = 17001;
const USER_B = 17002;
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

const chapterOf = (home: { body: Record<string, any> }) => home.body.chapters[INDEX];
function markDone(raw: ReturnType<typeof setup>["raw"], lessons: Lesson[]) {
  for (const lesson of lessons) {
    raw.prepare(`INSERT INTO lesson_progress (user_id, lesson_id, step, updated_at, completed_at) VALUES (1, ?, 99, '2026-11-13 09:00:00', '2026-11-13 09:00:00')`).run(lesson.id);
  }
}

test("a learner with earlier progress keeps it, and chapter 17 starts unstarted and is recommended next", async () => {
  const { raw, call } = setup();
  markDone(raw, PREVIOUS.lessons);
  const home = await call(USER_A, "GET", "/learn");
  assert.equal(home.body.chapters[INDEX - 1].completed, true, "the previous chapter stays completed");
  assert.ok(chapterOf(home).lessons.every((l: { state: string }) => l.state === "not_started"), "nothing new is marked completed");
  assert.equal(chapterOf(home).completed, false);
  assert.equal(home.body.today.items.find((item: { kind: string }) => item.kind === "lesson").lessonId, LESSONS[0].id, "today's path recommends chapter 17 lesson 1");
});

test("the previous chapter's review hands over to chapter 17; the learner resumes and walks lessons → review → completion", async () => {
  const { raw, call } = setup();
  markDone(raw, PREVIOUS.lessons.slice(0, -1));
  const prevReview = await finish(call, USER_A, PREVIOUS.lessons.at(-1) as Lesson);
  assert.equal(prevReview.body.chapterCompleted, true);
  assert.equal(prevReview.body.next.lessonId, LESSONS[0].id, "the previous chapter's review hands over to chapter 17 lesson 1");
  assert.deepEqual(prevReview.body.next.chapterNumbers, [17]);

  const home = await call(USER_A, "GET", "/learn");
  assert.equal(chapterOf(home).id, CHAPTER.id);
  assert.deepEqual(chapterOf(home).numbers, [17]);
  assert.equal(chapterOf(home).lessons.length, CHAPTER.lessons.length);

  // Direct access to any lesson; lesson numbers restart per chapter.
  const tenth = await call(USER_A, "GET", `/learn/lessons/${LESSONS[9].id}`);
  assert.deepEqual(tenth.body.position, { index: 10, total: LESSONS.length, review: false });
  assert.deepEqual(tenth.body.chapter.numbers, [17]);
  assert.equal(tenth.body.chapter.reviewedOn, CHAPTER.reviewedOn);
  assert.equal((await call(USER_A, "GET", `/learn/lessons/${REVIEW.id}`)).body.position.review, true, "the review is not numbered as a lesson");

  await call(USER_A, "POST", `/learn/lessons/${LESSONS[0].id}/progress`, { step: 2 });
  const resumed = await call(USER_A, "GET", `/learn/lessons/${LESSONS[0].id}`);
  assert.deepEqual([resumed.body.progress.state, resumed.body.progress.step], ["in_progress", 2], "browsing is progress, not completion");
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
  if (CHAPTERS[INDEX + 1]) assert.deepEqual(reviewDone.body.next?.chapterNumbers, CHAPTERS[INDEX + 1].numbers, "chapter 17's review hands over to the next chapter");
  assert.equal((raw.prepare(`SELECT COUNT(*) AS n FROM review_queue WHERE user_id = 1`).get() as { n: number }).n, 2, "the review mistake joins the review queue");

  const practice = await call(USER_A, "POST", "/learn/practice", { lessonId: REVIEW.id });
  assert.equal(practice.status, 200);
  assert.deepEqual(practice.body.lessonIds, CHAPTER.lessons.map((l) => l.id));

  // Another learner sees none of it.
  const other = await call(USER_B, "GET", "/learn");
  assert.ok(chapterOf(other).lessons.every((l: { state: string }) => l.state === "not_started"));
  assert.equal((raw.prepare(`SELECT COUNT(*) AS n FROM review_queue WHERE user_id = 2`).get() as { n: number }).n, 0);
});

test("a chapter 17 lesson can be opened directly, revisited, and its terms saved to the vocabulary list per learner", async () => {
  const { call } = setup();
  const lesson = LESSONS[7];
  assert.equal((await finish(call, USER_A, lesson)).status, 200);
  const home = await call(USER_A, "GET", "/learn");
  assert.equal(chapterOf(home).lessons[7].state, "completed");
  assert.equal(chapterOf(home).completed, false, "one lesson does not complete the chapter");
  assert.equal((await call(USER_A, "GET", `/learn/lessons/${lesson.id}`)).body.progress.state, "completed", "revisiting keeps it completed");

  const term = lesson.steps.flatMap((step) => (step.kind === "terms" ? step.terms : []))[0];
  assert.ok((await call(USER_A, "POST", "/vocab", { termIt: term.it, termFa: term.fa })).status < 300);
  assert.ok((await call(USER_A, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
  assert.ok(!(await call(USER_B, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
});
