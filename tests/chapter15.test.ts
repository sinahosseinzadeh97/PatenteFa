/**
 * Chapter 15 (Sorpasso): content integrity against the pinned question bank,
 * full question coverage, lessons 1–3 kept from the overtaking module (same
 * ids and step kinds, progress kept), the four new lessons and the chapter
 * review, its place right after chapter 14, and the learner flow end to end
 * (resume, mistakes, vocab, nothing pre-completed, two learners kept apart).
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import worker from "../src/index.js";
import { CHAPTERS, lessonLinkForSourceId, relatedSourceIds, type Lesson, type Statement } from "../src/content/lessons.js";
import { INCROCI_CHAPTER } from "../src/content/lessons-incroci.js";
import { SORPASSO_CHAPTER, lessonStrisce } from "../src/content/lessons-sorpasso.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

/** [text, answer, image file, source group, source line], indexed by source_id - 1. */
const BANK = (JSON.parse(readFileSync("src/content/question-provenance.json", "utf8")) as {
  entries: [string, number, string | null, number, number][];
}).entries;

const FIRST = 5136;
const LAST = 5291;
const CHAPTER = SORPASSO_CHAPTER;
const PREVIOUS = INCROCI_CHAPTER;
const INDEX = CHAPTERS.indexOf(CHAPTER);
const LESSONS = CHAPTER.lessons.filter((lesson) => !lesson.review);
const REVIEW = CHAPTER.lessons.find((lesson) => lesson.review) as Lesson;
const DIGITS = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
/** The three lessons that existed before chapter 15 was completed; their ids and step kinds are pinned. */
const KEPT = [
  ["sorpasso-segnali", ["intro", "compare", "assess", "terms", "trap"]],
  ["sorpasso-valutare", ["intro", "factors", "factors", "assess", "terms", "trap"]],
  ["sorpasso-fasi", ["intro", "manoeuvre", "factors", "terms", "trap"]],
] as const;
const NEW = ["sorpasso-destra-tram", "sorpasso-incroci-pedoni", "sorpasso-falsi-divieti", "sorpasso-autostrada"];
/** Centre-line statements chapter 6's lessonStrisce has taught since the overtaking module was split (pinned there too). */
const ELSEWHERE = ["5192", "5220", "5246", "5259"];
/** Questions from other bank chapters these lessons mapped before 2026-11-14; kept, so mistakes still route here. */
const OUTSIDE: Record<string, string[]> = {
  "sorpasso-segnali": [
    "1227", "1230", "1231", "1232", "1233", "1234", "1236", "1237", "1238", "1239", "1240", "1241", "1242", "1243", "1244", "1245",
    "1247", "1248", "1249", "1250", "1252", "1256", "1258", "1259", "1260", "1261", "1554", "1555", "1556", "1561", "3784",
  ],
  "sorpasso-valutare": ["4367", "2582", "4584", "2543", "2546", "2583"],
  "sorpasso-fasi": ["5912", "5917", "5918", "4690", "4691", "4708", "4711"],
};

function bankRow(sourceId: string) {
  const row = BANK[Number(sourceId) - 1];
  assert.ok(row, `${sourceId} exists in the bank`);
  return { text: row[0], answer: row[1], image: row[2] ? Number(row[2].replace(".png", "")) : null, group: row[3] };
}

function statementsOf(lesson: Lesson): Statement[] {
  return [...lesson.practice, ...lesson.steps.flatMap((step) => (step.kind === "trap" ? step.examples : []))];
}

const inChapter = (id: string) => Number(id) >= FIRST && Number(id) <= LAST;
const allIds = () => Array.from({ length: LAST - FIRST + 1 }, (_, i) => String(FIRST + i));

test("chapter 15 is the bank's fifteenth group (sorpasso), right after chapter 14", () => {
  const groups = new Set(allIds().map((id) => bankRow(id).group));
  assert.equal(groups.size, 10, "the sorpasso chapter has 10 source groups");
  assert.notEqual(bankRow(String(FIRST - 1)).group, bankRow(String(FIRST)).group, "5135 closes precedenza-incroci");
  assert.notEqual(bankRow(String(LAST)).group, bankRow(String(LAST + 1)).group, "5292 opens fermata-sosta-arresto");
  assert.equal(allIds().filter((id) => bankRow(id).image !== null).length, 0, "no chapter 15 question has an image");
  assert.deepEqual(CHAPTER.numbers, [15]);
  assert.equal(CHAPTER.nameIt, "Sorpasso");
  assert.deepEqual(CHAPTER.topicIds, [12]);
  assert.equal(CHAPTER.reviewedOn, "2026-11-14");
  assert.equal(CHAPTERS[INDEX - 1], PREVIOUS, "chapter 14 comes right before");
  assert.ok(INDEX === CHAPTERS.length - 1 || CHAPTERS[INDEX + 1].numbers[0] > 15, "nothing numbered 15 or lower comes after");
  assert.equal(CHAPTERS.filter((c) => c.numbers.includes(15)).length, 1, "one chapter 15");
});

test("lessons 1–3 keep their ids and step kinds, the new lessons follow, the review is last", () => {
  assert.equal(LESSONS.length, 7);
  for (const [i, [id, kinds]] of KEPT.entries()) {
    assert.equal(LESSONS[i].id, id);
    assert.deepEqual(LESSONS[i].steps.map((s) => s.kind), kinds, `${id} step kinds unchanged`);
  }
  assert.deepEqual(LESSONS.slice(3).map((l) => l.id), NEW);
  assert.equal(REVIEW.id, "ripasso-capitolo-15");
  assert.equal(CHAPTER.lessons.at(-1), REVIEW);
  assert.equal(new Set(CHAPTERS.flatMap((c) => c.lessons.map((l) => l.id))).size, CHAPTERS.flatMap((c) => c.lessons).length, "lesson ids are unique");
});

test("every chapter 15 question maps to exactly one chapter 15 teaching section, except the four centre-line ones", () => {
  const owner = new Map<string, string>();
  for (const lesson of LESSONS) {
    for (const group of lesson.related) {
      assert.ok(group.step > 0 && group.step < lesson.steps.length, `${lesson.id} maps to a real section`);
      assert.ok(!["terms", "trap", "intro", "classify"].includes(lesson.steps[group.step].kind), `${lesson.id} maps questions to a teaching section`);
      for (const id of group.sourceIds) {
        assert.ok(inChapter(id) || OUTSIDE[lesson.id]?.includes(id), `${lesson.id} maps ${id}, outside chapter 15 and not pinned`);
        assert.ok(!owner.has(id), `${id} is mapped by both ${owner.get(id)} and ${lesson.id}`);
        owner.set(id, lesson.id);
      }
    }
  }
  assert.equal(allIds().length, 156);
  assert.deepEqual(allIds().filter((id) => !owner.has(id) && !ELSEWHERE.includes(id)), [], "unmapped chapter 15 questions");
  for (const id of ELSEWHERE) assert.equal(lessonLinkForSourceId(id)?.lessonId, lessonStrisce.id, `${id} stays with chapter 6's centre lines`);
  for (const lesson of LESSONS) for (const id of OUTSIDE[lesson.id] ?? []) assert.equal(owner.get(id), lesson.id, `${id} stays with ${lesson.id}`);
  for (const [id, lessonId] of owner) assert.equal(lessonLinkForSourceId(id)?.lessonId, lessonId, `${id} routes to ${lessonId}`);
  for (const chapter of CHAPTERS.filter((c) => c !== CHAPTER)) {
    for (const lesson of chapter.lessons.filter((l) => l !== lessonStrisce)) {
      for (const id of relatedSourceIds(lesson)) assert.ok(!inChapter(id), `${lesson.id} maps chapter 15 question ${id}`);
    }
  }
});

test("each concept routes to the section that teaches it", () => {
  const at = (id: string) => {
    const link = lessonLinkForSourceId(id);
    return `${link?.lessonId}#${link?.step}`;
  };
  // checking signs → the sign lesson; speed difference → the checks
  for (const id of ["5145", "5199"]) assert.equal(at(id), "sorpasso-segnali#1");
  for (const id of ["5141", "5196"]) assert.equal(at(id), "sorpasso-valutare#1");
  // speed within the limit, high beams, lateral gap → the stages; oncoming while overtaken → the overtaken driver
  for (const id of ["5151", "5197", "5223", "5224", "5225", "5256"]) assert.equal(at(id), "sorpasso-fasi#1");
  for (const id of ["5160", "5269", "5276", "5281", "5282", "5283"]) assert.equal(at(id), "sorpasso-fasi#2");
  for (const id of ["5163", "5164", "5166", "5167", "5168", "5184", "5247"]) assert.equal(at(id), "sorpasso-destra-tram#1");
  for (const id of ["5162", "5172", "5214", "5221"]) assert.equal(at(id), "sorpasso-destra-tram#3");
  for (const id of ["5183", "5185", "5186", "5187"]) assert.equal(at(id), "sorpasso-incroci-pedoni#1");
  for (const id of ["5181", "5188", "5191", "5201", "5207", "5210"]) assert.equal(at(id), "sorpasso-incroci-pedoni#2");
  for (const id of ["5213", "5218", "5229", "5230", "5240", "5274"]) assert.equal(at(id), "sorpasso-falsi-divieti#1");
  for (const id of ["5239", "5275", "5279", "5280"]) assert.equal(at(id), "sorpasso-falsi-divieti#2");
  for (const id of ["5261", "5284", "5291"]) assert.equal(at(id), "sorpasso-autostrada#1");
  // Chapter 18 relies on these indicator questions staying here.
  for (const id of ["5912", "5917", "5918"]) assert.equal(at(id), "sorpasso-fasi#1");
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
      for (const [col, column] of step.columns.entries()) {
        for (const item of column.items) {
          const row = bankRow(item.sourceId);
          assert.deepEqual([item.textIt, item.answer], [row.text, row.answer], `${lesson.id} factor ${item.sourceId}`);
          assert.equal(item.answer, col === 0 ? 1 : 0, `${item.sourceId} sits in the column of its answer`);
          assert.ok(item.textIt.includes(item.it), `${item.sourceId}: «${item.it}» is quoted from the statement`);
          assert.ok(relatedSourceIds(lesson).includes(item.sourceId), `${lesson.id} maps its factor ${item.sourceId}`);
        }
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
    assert.ok(lesson.practice.some((q) => q.answer === 0) && lesson.practice.some((q) => q.answer === 1), `${lesson.id} practice mixes VERO and FALSO`);
    for (const question of lesson.practice) {
      assert.equal(lessonLinkForSourceId(question.sourceId)?.step, question.conceptStep, `${question.sourceId} practises the section it maps to`);
      assert.match(question.why, new RegExp(`قدم ${DIGITS[question.conceptStep - 1]}`), `${question.sourceId} feedback names its section`);
      const firstTest = lesson.steps.findIndex((s) => s.kind === "trap");
      assert.ok(question.conceptStep < firstTest, `${question.sourceId}: its section comes before the lesson's trap and practice`);
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

test("the chapter review takes two unseen questions from every lesson and maps nothing itself", () => {
  assert.deepEqual(REVIEW.related, []);
  const factorItems = LESSONS.flatMap((l) => l.steps.flatMap((s) => (s.kind === "factors" ? s.columns.flatMap((c) => c.items.map((i) => i.sourceId)) : [])));
  const seenInLessons = new Set([...LESSONS.flatMap((lesson) => statementsOf(lesson).map((s) => s.sourceId)), ...factorItems]);
  const homes = REVIEW.practice.map((question) => {
    assert.ok(!seenInLessons.has(question.sourceId), `review question ${question.sourceId} was already shown in a lesson`);
    assert.ok(inChapter(question.sourceId), `${question.sourceId} is a chapter 15 question`);
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
    assert.deepEqual([statement.textIt, statement.answer], [row.text, row.answer], `${statement.sourceId} matches the bank`);
  }
  const summary = REVIEW.steps.find((step) => step.kind === "table");
  assert.equal(summary?.kind === "table" ? summary.rows.length : 0, LESSONS.length, "the summary has one line per lesson");
  assert.ok(REVIEW.practice.some((q) => q.answer === 0) && REVIEW.practice.some((q) => q.answer === 1), "the review mixes VERO and FALSO");
});

test("the client renders every step kind chapter 15 uses", () => {
  const learn = readFileSync("public/js/learn.js", "utf8");
  const drawn = ["markings", "assess", "manoeuvre"];
  for (const lesson of CHAPTER.lessons) {
    for (const step of lesson.steps) {
      if (drawn.includes(step.kind)) continue; // drawn by public/js/overtaking.js, covered by tests/overtaking.test.ts
      assert.match(learn, new RegExp(`content\\.kind === '${step.kind}'`), `${step.kind} is rendered`);
    }
  }
});

// ── Flow against real SQL ─────────────────────────────────────────────────────

const BOT_TOKEN = "123456:chapter15-test";
const USER_A = 15001;
const USER_B = 15002;
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

const chapterOf = (home: { body: Record<string, any> }) => home.body.chapters.find((c: { id: string }) => c.id === CHAPTER.id);
const todayLesson = (home: { body: Record<string, any> }) => home.body.today.items.find((item: { kind: string }) => item.kind === "lesson")?.lessonId;

test("a learner who finished the old three lessons keeps them; the new lessons and the review start unstarted and are recommended next", async () => {
  const { raw, call } = setup();
  for (const lesson of [...PREVIOUS.lessons, ...LESSONS.slice(0, 3)]) {
    raw.prepare(`INSERT INTO lesson_progress (user_id, lesson_id, step, updated_at, completed_at) VALUES (1, ?, 99, '2026-11-13 09:00:00', '2026-11-13 09:00:00')`).run(lesson.id);
  }
  const home = await call(USER_A, "GET", "/learn");
  assert.deepEqual(
    chapterOf(home).lessons.map((l: { state: string }) => l.state),
    ["completed", "completed", "completed", ...Array(5).fill("not_started")]
  );
  assert.equal(chapterOf(home).completed, false, "the new lessons and the review are not marked completed");
  assert.equal(todayLesson(home), LESSONS[3].id, "today's path recommends the first new lesson");
});

test("after chapter 14 the learner is sent to chapter 15, can resume it, and walks lessons → review → completion", async () => {
  const { raw, call } = setup();
  for (const lesson of PREVIOUS.lessons.slice(0, -1)) await finish(call, USER_A, lesson);
  const lastPrev = await finish(call, USER_A, PREVIOUS.lessons.at(-1) as Lesson);
  assert.equal(lastPrev.body.next.lessonId, LESSONS[0].id, "chapter 14's last lesson hands over to chapter 15 lesson 1");
  assert.deepEqual(lastPrev.body.next.chapterNumbers, [15]);
  assert.equal(todayLesson(await call(USER_A, "GET", "/learn")), LESSONS[0].id, "home recommends chapter 15 after chapter 14");

  // Direct access to any lesson, numbered within its chapter (chapter 15, lesson 5 of 7).
  const fifth = await call(USER_A, "GET", `/learn/lessons/${LESSONS[4].id}`);
  assert.deepEqual(fifth.body.position, { index: 5, total: LESSONS.length, review: false });
  assert.deepEqual(fifth.body.chapter.numbers, [15]);
  assert.equal(fifth.body.chapter.reviewedOn, CHAPTER.reviewedOn);
  const review = await call(USER_A, "GET", `/learn/lessons/${REVIEW.id}`);
  assert.equal(review.body.position.review, true, "the review is not numbered as a lesson");

  await call(USER_A, "POST", `/learn/lessons/${LESSONS[3].id}/progress`, { step: 2 });
  const resumed = await call(USER_A, "GET", `/learn/lessons/${LESSONS[3].id}`);
  assert.deepEqual([resumed.body.progress.state, resumed.body.progress.step], ["in_progress", 2]);
  assert.equal(todayLesson(await call(USER_A, "GET", "/learn")), LESSONS[3].id, "the unfinished lesson is recommended");

  // A wrong answer in a new lesson is queued once and routes back to its teaching section.
  const done4 = await finish(call, USER_A, LESSONS[3], true);
  assert.equal(done4.body.practice.queuedForReview, 1);
  const queued = raw.prepare(`SELECT q.source_id AS sourceId FROM review_queue r JOIN questions q ON q.id = r.question_id WHERE r.user_id = 1`).all() as { sourceId: string }[];
  assert.equal(queued.length, 1);
  const link = lessonLinkForSourceId(queued[0].sourceId);
  assert.equal(link?.lessonId, LESSONS[3].id);
  assert.ok(link && LESSONS[3].related.some((g) => g.step === link.step && g.sourceIds.includes(queued[0].sourceId)), "routes to the section that teaches it");

  for (const lesson of LESSONS.filter((l) => l !== LESSONS[3])) assert.equal((await finish(call, USER_A, lesson)).status, 200);
  assert.equal(chapterOf(await call(USER_A, "GET", "/learn")).completed, false, "not complete before the review");

  const reviewDone = await finish(call, USER_A, REVIEW, true);
  assert.equal(reviewDone.body.chapterCompleted, true);
  assert.equal(chapterOf(await call(USER_A, "GET", "/learn")).completed, true);
  const after = CHAPTERS[INDEX + 1];
  if (after) assert.deepEqual(reviewDone.body.next?.chapterNumbers, after.numbers, "chapter 15's review hands over to the next chapter in course order");
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

test("a new lesson can be opened directly, revisited, and its terms saved to the vocabulary list per learner", async () => {
  const { call } = setup();
  const lesson = LESSONS[5];
  assert.equal((await finish(call, USER_A, lesson)).status, 200);
  const home = await call(USER_A, "GET", "/learn");
  assert.equal(chapterOf(home).lessons[5].state, "completed");
  assert.equal(chapterOf(home).completed, false, "one lesson does not complete the chapter");
  assert.ok(home.body.chapters[INDEX - 1].lessons.every((l: { state: string }) => l.state === "not_started"), "chapter 14 untouched");
  const again = await call(USER_A, "GET", `/learn/lessons/${lesson.id}`);
  assert.equal(again.body.progress.state, "completed", "revisiting keeps it completed");

  const term = lesson.steps.flatMap((step) => (step.kind === "terms" ? step.terms : []))[0];
  assert.ok((await call(USER_A, "POST", "/vocab", { termIt: term.it, termFa: term.fa })).status < 300);
  assert.ok((await call(USER_A, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
  assert.ok(!(await call(USER_B, "GET", `/learn/lessons/${lesson.id}`)).body.savedTerms.includes(term.it));
});
