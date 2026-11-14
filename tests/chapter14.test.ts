/**
 * Chapter 14 (Precedenza negli incroci): content integrity against the pinned
 * question bank, full question coverage, lessons 1–4 kept from the old
 * intersections module (same ids and step kinds, progress kept), the new
 * lessons 5–6 and the chapter review, its place after chapter 12/13, and the
 * learner flow end to end (resume, mistakes, vocab, nothing pre-completed, two
 * learners kept apart).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import worker from "../src/index.js";
import { CHAPTERS, lessonLinkForSourceId, relatedSourceIds, type Lesson, type Statement } from "../src/content/lessons.js";
import { CROSSINGS } from "../src/content/crossings.js";
import { INCROCI_CHAPTER } from "../src/content/lessons-incroci.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

/** [text, answer, image file, source group, source line], indexed by source_id - 1. */
const BANK = (JSON.parse(readFileSync("src/content/question-provenance.json", "utf8")) as {
  entries: [string, number, string | null, number, number][];
}).entries;

const FIRST = 4721;
const LAST = 5135;
const CHAPTER = INCROCI_CHAPTER;
const INDEX = CHAPTERS.indexOf(CHAPTER);
const PREVIOUS = CHAPTERS[INDEX - 1];
const LESSONS = CHAPTER.lessons.filter((lesson) => !lesson.review);
const REVIEW = CHAPTER.lessons.find((lesson) => lesson.review) as Lesson;
const DIGITS = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
/** The four lessons that existed before chapter 14 was completed; their ids and step kinds are pinned. */
const KEPT = [
  ["leggere-incrocio", ["intro", "scenario", "scenario", "terms", "trap"]],
  ["precedenza-a-destra", ["intro", "order", "order", "terms", "trap"]],
  ["svolte-e-contemporanei", ["intro", "order", "order", "terms", "trap"]],
  ["segnali-negli-incroci", ["intro", "order", "order", "terms", "trap"]],
] as const;
/**
 * Chapter-13 questions these lessons mapped before 2026-11-14 (left-turn rules
 * with no figure). Chapter 13 pins them here too (lessons-norme.ts,
 * CHAPTER_13_MAPPED_ELSEWHERE); the owning chapter must move them on purpose.
 */
const OUTSIDE: Record<string, string[]> = {
  "precedenza-a-destra": ["4361", "4576", "4591", "4597", "4559"],
  "svolte-e-contemporanei": ["4530", "4538", "4483", "4486", "4487", "4490", "4568", "4468"],
};
/** Sign statements from chapter 5 quoted in lesson 4's trap (owned and mapped by chapter 5). */
const QUOTED_FROM_CHAPTER_5 = new Set(["2149", "2185"]);

function bankRow(sourceId: string) {
  const row = BANK[Number(sourceId) - 1];
  assert.ok(row, `${sourceId} exists in the bank`);
  return { text: row[0], answer: row[1], image: row[2] ? Number(row[2].replace(".png", "")) : null };
}

function statementsOf(lesson: Lesson): Statement[] {
  return [...lesson.practice, ...lesson.steps.flatMap((step) => (step.kind === "trap" ? step.examples : []))];
}

const inChapter = (id: string) => Number(id) >= FIRST && Number(id) <= LAST;

test("chapter 14 is the bank's fourteenth group, right after chapter 12 or 13", () => {
  // "norme-di-circolazione" ends at group 398; "precedenza-incroci" is groups 399–441 (source ids 4721–5135).
  assert.equal(BANK[FIRST - 2][3], 398);
  assert.equal(BANK[FIRST - 1][3], 399);
  assert.equal(BANK[LAST - 1][3], 441);
  assert.equal(BANK[LAST][3], 442, "source id 5136 opens the next bank group (sorpasso)");
  assert.deepEqual(CHAPTER.numbers, [14]);
  assert.equal(CHAPTER.nameIt, "Precedenza negli incroci");
  assert.deepEqual(CHAPTER.topicIds, [4]);
  assert.ok([12, 13].includes(PREVIOUS.numbers.at(-1) as number), "the chapter before is 13 (or 12 until 13 exists)");
  assert.ok(CHAPTERS[INDEX + 1].numbers[0] > 14, "no chapter is inserted after 14 by this change");
  assert.equal(CHAPTERS.filter((c) => c.numbers.includes(14)).length, 1, "one chapter 14");
});

test("lessons 1–4 keep their ids and step kinds, so saved steps point at the same section", () => {
  assert.equal(LESSONS.length, 6);
  for (const [i, [id, kinds]] of KEPT.entries()) {
    assert.equal(LESSONS[i].id, id);
    assert.deepEqual(LESSONS[i].steps.map((s) => s.kind), kinds, `${id} step kinds unchanged`);
  }
  assert.deepEqual(LESSONS.slice(4).map((l) => l.id), ["incroci-a-piu-bracci", "stallo-al-centro"]);
  assert.equal(REVIEW.id, "ripasso-capitolo-14");
  assert.equal(CHAPTER.lessons.at(-1), REVIEW);
});

test("every chapter 14 question maps to exactly one chapter 14 teaching section, and no other module maps one", () => {
  const owner = new Map<string, string>();
  for (const lesson of LESSONS) {
    for (const group of lesson.related) {
      assert.ok(group.step > 0 && group.step < lesson.steps.length, `${lesson.id} maps to a real section`);
      assert.ok(!["terms", "trap", "intro"].includes(lesson.steps[group.step].kind), `${lesson.id} maps questions to a teaching section`);
      for (const id of group.sourceIds) {
        assert.ok(inChapter(id) || OUTSIDE[lesson.id]?.includes(id), `${lesson.id} maps ${id}, outside chapter 14 and not pinned`);
        assert.ok(!owner.has(id), `${id} is mapped by both ${owner.get(id)} and ${lesson.id}`);
        owner.set(id, lesson.id);
      }
    }
  }
  const all = Array.from({ length: LAST - FIRST + 1 }, (_, i) => String(FIRST + i));
  assert.equal(all.length, 415);
  assert.deepEqual(all.filter((id) => !owner.has(id)), [], "unmapped chapter 14 questions");
  for (const [lessonId, ids] of Object.entries(OUTSIDE)) for (const id of ids) assert.equal(owner.get(id), lessonId, `${id} stays with ${lessonId}`);
  for (const [id, lessonId] of owner) assert.equal(lessonLinkForSourceId(id)?.lessonId, lessonId, `${id} routes to ${lessonId}`);
  for (const chapter of CHAPTERS.filter((c) => c !== CHAPTER)) {
    for (const lesson of chapter.lessons) {
      for (const id of relatedSourceIds(lesson)) assert.ok(!inChapter(id), `${lesson.id} maps chapter 14 question ${id}`);
    }
  }
});

test("each figure's questions land where its concept is taught", () => {
  const at = (id: string) => {
    const link = lessonLinkForSourceId(id);
    return `${link?.lessonId}:${link?.step}`;
  };
  // Deadlocks: lesson 6, except the two "has the right free" statements (lesson 1).
  for (const id of ["4988", "4990", "5006", "4883", "4952", "4953"]) assert.equal(at(id), "stallo-al-centro:1", id);
  for (const id of ["4840", "4845", "4858", "4721", "4723", "4731"]) assert.equal(at(id), "stallo-al-centro:2", id);
  for (const id of ["4727", "4856"]) assert.equal(at(id), "leggere-incrocio:1", id);
  // Diagonal and five/six-arm junctions: lesson 5.
  for (const id of ["5089", "4773", "5128", "4763", "4859", "4865", "5120"]) assert.equal(at(id), "incroci-a-piu-bracci:1", id);
  for (const id of ["5039", "5047", "4885", "4873", "4977", "4789"]) assert.equal(at(id), "incroci-a-piu-bracci:2", id);
  // Ordinary geometry joins the lesson that already teaches it.
  for (const id of ["4967", "4871"]) assert.equal(at(id), "precedenza-a-destra:2", id);
  for (const id of ["5018", "5101"]) assert.equal(at(id), "svolte-e-contemporanei:1", id);
  for (const id of ["4920", "4958"]) assert.equal(at(id), "segnali-negli-incroci:2", id);
});

test("every chapter 14 question shows a figure its lesson lists", () => {
  for (const lesson of LESSONS) {
    const images = new Set([...lesson.signs, ...(lesson.figures ?? [])]);
    for (const id of relatedSourceIds(lesson)) {
      const image = bankRow(id).image;
      if (inChapter(id)) assert.ok(image !== null, `${id} has a figure`);
      if (image !== null) assert.ok(images.has(image), `${id} shows figure ${image}, not listed by ${lesson.id}`);
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
  for (const crossing of CROSSINGS) {
    for (const evidence of crossing.evidence) {
      const row = bankRow(evidence.sourceId);
      assert.deepEqual([evidence.textIt, evidence.answer], [row.text, row.answer], `${crossing.id}: ${evidence.sourceId}`);
      assert.equal(row.image, crossing.figure, `${evidence.sourceId} is a statement about figure ${crossing.figure}`);
    }
  }
});

test("each lesson teaches before it tests and practises only its own questions", () => {
  for (const lesson of LESSONS) {
    const related = new Set(relatedSourceIds(lesson));
    const shown = new Set<string>();
    for (const id of statementsOf(lesson).map((s) => s.sourceId)) {
      assert.ok(related.has(id) || QUOTED_FROM_CHAPTER_5.has(id), `${lesson.id} quotes ${id} but does not map it`);
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

test("the deadlock drawings: one left-turner waits at the centre; no other drawing has one", () => {
  for (const lesson of LESSONS) {
    for (const step of lesson.steps) {
      if (step.kind !== "order") continue;
      const { crossing } = step;
      if (lesson.id === "stallo-al-centro") {
        assert.ok(crossing.centre, `${crossing.id} names the vehicle that waits at the centre`);
        assert.ok(crossing.explain[0].text.includes(crossing.centre as string), `${crossing.id}: phase 1 explains the centre move`);
      } else {
        assert.equal(crossing.centre, undefined, `${crossing.id} is not a deadlock`);
      }
    }
  }
  const client = readFileSync("public/js/crossing.js", "utf8");
  assert.match(client, /crossing\.centre/, "the client draws the centre wait");
});

test("the chapter review takes two unseen questions from every lesson and maps nothing itself", () => {
  assert.deepEqual(REVIEW.related, []);
  const evidence = LESSONS.flatMap((l) => l.steps.flatMap((s) => (s.kind === "order" || s.kind === "scenario" ? s.crossing.evidence.map((e) => e.sourceId) : [])));
  const seenInLessons = new Set([...LESSONS.flatMap((lesson) => statementsOf(lesson).map((s) => s.sourceId)), ...evidence]);
  const homes = REVIEW.practice.map((question) => {
    assert.ok(!seenInLessons.has(question.sourceId), `review question ${question.sourceId} was already shown in a lesson`);
    assert.ok(inChapter(question.sourceId), `${question.sourceId} is a chapter 14 question`);
    const link = lessonLinkForSourceId(question.sourceId);
    assert.equal(link?.step, question.conceptStep, `${question.sourceId} names the section that teaches it`);
    return link?.lessonId;
  });
  assert.deepEqual(homes, LESSONS.flatMap((lesson) => [lesson.id, lesson.id]), "two review questions per lesson, in lesson order");
  for (const [i, question] of REVIEW.practice.entries()) {
    assert.match(question.why, new RegExp(`درس ${DIGITS[Math.floor(i / 2)]}`), `${question.sourceId} feedback names its lesson`);
  }
  for (const statement of statementsOf(REVIEW)) {
    const row = bankRow(statement.sourceId);
    assert.deepEqual([statement.textIt, statement.answer, statement.figure ?? null], [row.text, row.answer, row.image], `${statement.sourceId} matches the bank`);
  }
  const summary = REVIEW.steps.find((step) => step.kind === "table");
  assert.equal(summary?.kind === "table" ? summary.rows.length : 0, LESSONS.length, "the summary has one line per lesson");
  assert.ok(REVIEW.practice.some((q) => q.answer === 0) && REVIEW.practice.some((q) => q.answer === 1), "the review mixes VERO and FALSO");
});

test("the client renders every step kind chapter 14 uses", () => {
  const learn = readFileSync("public/js/learn.js", "utf8");
  for (const lesson of CHAPTER.lessons) {
    for (const step of lesson.steps) assert.match(learn, new RegExp(`content\\.kind === '${step.kind}'`), `${step.kind} is rendered`);
  }
});

// ── Flow against real SQL ─────────────────────────────────────────────────────

const BOT_TOKEN = "123456:chapter14-test";
const USER_A = 14001;
const USER_B = 14002;
const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;

function setup() {
  const { db, raw } = createSqliteD1();
  const insert = raw.prepare(`INSERT INTO questions (id, source_id, topic_id, text_it, correct_answer, image_url) VALUES (?, ?, NULL, ?, ?, NULL)`);
  for (const sourceId of new Set(CHAPTERS.flatMap((c) => c.lessons.flatMap((l) => [...relatedSourceIds(l), ...l.practice.map((q) => q.sourceId)])))) {
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

function markDone(raw: ReturnType<typeof setup>["raw"], lessons: Lesson[]) {
  for (const lesson of lessons) {
    raw.prepare(`INSERT INTO lesson_progress (user_id, lesson_id, step, updated_at, completed_at) VALUES (1, ?, 99, '2026-11-13 09:00:00', '2026-11-13 09:00:00')`).run(lesson.id);
  }
}

const chapterOf = (home: { body: Record<string, any> }) => home.body.chapters[INDEX];
const todayLesson = (home: { body: Record<string, any> }) => home.body.today.items.find((item: { kind: string }) => item.kind === "lesson")?.lessonId;

test("a learner who finished the old four lessons keeps them; lessons 5–6 and the review start unstarted and are recommended next", async () => {
  const { raw, call } = setup();
  markDone(raw, [...PREVIOUS.lessons, ...LESSONS.slice(0, 4)]);
  const home = await call(USER_A, "GET", "/learn");
  assert.deepEqual(
    chapterOf(home).lessons.map((l: { state: string }) => l.state),
    ["completed", "completed", "completed", "completed", "not_started", "not_started", "not_started"]
  );
  assert.equal(chapterOf(home).completed, false, "the new lessons and the review are not marked completed");
  assert.equal(home.body.chapters[INDEX - 1].completed, true, "the previous chapter stays completed");
  assert.equal(todayLesson(home), LESSONS[4].id, "today's path recommends lesson 5");
});

test("after the previous chapter the learner is sent to chapter 14, can resume it, and walks lessons → review → completion", async () => {
  const { raw, call } = setup();
  markDone(raw, PREVIOUS.lessons);
  const prevReview = await call(USER_A, "GET", `/learn/lessons/${PREVIOUS.lessons.at(-1)!.id}`);
  assert.equal(prevReview.body.next.lessonId, LESSONS[0].id, "the previous chapter hands over to chapter 14 lesson 1");
  assert.deepEqual(prevReview.body.next.chapterNumbers, [14]);
  assert.equal(todayLesson(await call(USER_A, "GET", "/learn")), LESSONS[0].id, "home recommends chapter 14 next");

  // Direct access with per-chapter lesson numbers; the review is not numbered.
  const sixth = await call(USER_A, "GET", `/learn/lessons/${LESSONS[5].id}`);
  assert.deepEqual(sixth.body.position, { index: 6, total: LESSONS.length, review: false });
  assert.deepEqual(sixth.body.chapter.numbers, [14]);
  assert.equal(sixth.body.chapter.reviewedOn, "2026-11-14");
  assert.equal((await call(USER_A, "GET", `/learn/lessons/${REVIEW.id}`)).body.position.review, true);

  // The deadlock drawing reaches the client with its centre vehicle, and the verdict is the server's.
  const orderAt = LESSONS[5].steps.findIndex((s) => s.kind === "order");
  assert.equal(sixth.body.lesson.steps[orderAt].crossing.centre, "N");
  const verdict = await call(USER_A, "POST", `/learn/lessons/${LESSONS[5].id}/order`, { step: orderAt, sequence: ["R", "A", "N"] });
  assert.deepEqual([verdict.body.valid, verdict.body.mistake], [true, null]);
  const early = await call(USER_A, "POST", `/learn/lessons/${LESSONS[5].id}/order`, { step: orderAt, sequence: ["N", "R", "A"] });
  assert.deepEqual([early.body.valid, early.body.mistake?.vehicle], [false, "N"], "entering first is not finishing first");

  await call(USER_A, "POST", `/learn/lessons/${LESSONS[4].id}/progress`, { step: 2 });
  const resumed = await call(USER_A, "GET", `/learn/lessons/${LESSONS[4].id}`);
  assert.deepEqual([resumed.body.progress.state, resumed.body.progress.step], ["in_progress", 2]);
  assert.equal(todayLesson(await call(USER_A, "GET", "/learn")), LESSONS[4].id, "the unfinished lesson is recommended");

  // A wrong answer is queued once and routes back to its teaching section.
  const done5 = await finish(call, USER_A, LESSONS[4], true);
  assert.equal(done5.body.practice.queuedForReview, 1);
  assert.equal(done5.body.next.lessonId, LESSONS[5].id);
  const queued = raw.prepare(`SELECT q.source_id AS sourceId FROM review_queue r JOIN questions q ON q.id = r.question_id WHERE r.user_id = 1`).all() as { sourceId: string }[];
  assert.equal(queued.length, 1);
  const link = lessonLinkForSourceId(queued[0].sourceId);
  assert.ok(link && link.lessonId === LESSONS[4].id && LESSONS[4].related.some((g) => g.step === link.step && g.sourceIds.includes(queued[0].sourceId)), "routes to the section that teaches it");

  for (const lesson of LESSONS.filter((l) => l !== LESSONS[4])) assert.equal((await finish(call, USER_A, lesson)).status, 200);
  assert.equal(chapterOf(await call(USER_A, "GET", "/learn")).completed, false, "not complete before the review");

  const reviewDone = await finish(call, USER_A, REVIEW, true);
  assert.equal(reviewDone.body.chapterCompleted, true);
  assert.equal(chapterOf(await call(USER_A, "GET", "/learn")).completed, true);
  assert.deepEqual(reviewDone.body.next?.chapterNumbers, CHAPTERS[INDEX + 1].numbers, "the review hands over to the next chapter in course order");
  const reviewLink = lessonLinkForSourceId(REVIEW.practice[0].sourceId);
  assert.deepEqual([reviewLink?.lessonId, reviewLink?.step], [LESSONS[0].id, REVIEW.practice[0].conceptStep], "a review mistake links to its teaching section");
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

test("lesson 6 can be opened directly, revisited, and its terms saved to the vocabulary list per learner", async () => {
  const { call } = setup();
  const lesson = LESSONS[5];
  assert.equal((await finish(call, USER_A, lesson)).status, 200);
  const home = await call(USER_A, "GET", "/learn");
  assert.equal(chapterOf(home).lessons[5].state, "completed");
  assert.equal(chapterOf(home).completed, false, "one lesson does not complete the chapter");
  assert.ok(home.body.chapters[INDEX - 1].lessons.every((l: { state: string }) => l.state === "not_started"), "the previous chapter is untouched");
  assert.equal((await call(USER_A, "GET", `/learn/lessons/${lesson.id}`)).body.progress.state, "completed", "revisiting keeps it completed");

  const term = lesson.steps.flatMap((step) => (step.kind === "terms" ? step.terms : []))[0];
  assert.ok((await call(USER_A, "POST", "/vocab", { termIt: term.it, termFa: term.fa })).status < 300);
  assert.ok((await call(USER_A, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
  assert.ok(!(await call(USER_B, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
});
