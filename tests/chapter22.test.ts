/**
 * Chapter 22 (Alcool, droga e primo soccorso): content integrity against the
 * pinned question bank, full question coverage (135 here, six kept by chapter
 * 12), the disputed first-aid statements kept out of scored practice, the
 * original exercises and scenarios, the no-calculator and no-dosage rules, the
 * links to chapters 12 and 21, the glossary headwords, the drawing, the chapter
 * review, its place in the route right after chapter 21, and the learner flow
 * end to end (resume, mistakes, vocab, nothing pre-completed, two learners kept
 * apart).
 *
 * Neighbours are found by position and number, never by a fixed index.
 */
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";

import worker from "../src/index.js";
import { CHAPTERS, lessonLinkForSourceId, relatedSourceIds, type Lesson } from "../src/content/lessons.js";
import { ALCOOL_CHAPTER, CHAPTER_22_SOURCE_RANGE, DISPUTED_SOURCE_IDS } from "../src/content/lessons-alcool.js";
import { INCIDENTI_CHAPTER } from "../src/content/lessons-incidenti.js";
import { VELOCITA_CHAPTER } from "../src/content/lessons-velocita.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

/** [text, answer, image file, source group, source line], indexed by source_id - 1. */
const BANK = (JSON.parse(readFileSync("src/content/question-provenance.json", "utf8")) as {
  entries: [string, number, string | null, number, number][];
}).entries;

const [FIRST, LAST] = CHAPTER_22_SOURCE_RANGE;
const CHAPTER = ALCOOL_CHAPTER;
const INDEX = CHAPTERS.indexOf(CHAPTER);
const PREVIOUS = CHAPTERS[INDEX - 1];
const LESSONS = CHAPTER.lessons.filter((lesson) => !lesson.review);
const REVIEW = CHAPTER.lessons.find((lesson) => lesson.review) as Lesson;
const FIRST_AID = LESSONS.slice(4);
const toFa = (n: number) => String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
const SRC = readdirSync("src/content").filter((f) => f.startsWith("ch22-") || f === "lessons-alcool.ts").map((f) => readFileSync(`src/content/${f}`, "utf8")).join("\n");
const DISPUTED: readonly string[] = DISPUTED_SOURCE_IDS;

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
const classifySteps = (lesson: Lesson) => lesson.steps.flatMap((step) => (step.kind === "classify" ? [step] : []));
const stepText = (step: Lesson["steps"][number]) => JSON.stringify(step);

test("chapter 22 is the bank's twenty-second group, placed right after chapter 21", () => {
  // "incidenti-stradali-comportamenti" ends at group 575; "alcool-droga-primo-soccorso" is groups 576–596.
  assert.equal(BANK[FIRST - 2][3], 575);
  assert.equal(BANK[FIRST - 1][3], 576);
  assert.equal(BANK[LAST - 1][3], 596);
  assert.equal(BANK[LAST][3], 597, "source id 6603 opens the next bank group (responsabilità civile)");
  assert.deepEqual(CHAPTER.numbers, [22]);
  assert.equal(CHAPTER.nameIt, "Alcool, droga e primo soccorso");
  assert.deepEqual(CHAPTER.topicIds, [], "its questions are spread over several app topics");
  assert.ok(INDEX > 0, "registered in CHAPTERS");
  const numbers = CHAPTERS.map((c) => c.numbers[0]);
  assert.deepEqual(numbers, [...numbers].sort((a, b) => a - b), "the route is in official chapter order");
  assert.equal(new Set(CHAPTERS.flatMap((c) => c.numbers)).size, CHAPTERS.flatMap((c) => c.numbers).length, "every chapter number appears once");
  assert.equal(PREVIOUS, INCIDENTI_CHAPTER, "the chapter before is chapter 21");
  assert.ok(CHAPTERS.slice(INDEX + 1).every((c) => c.numbers[0] > 22));
});

test("eleven lessons with stable ids, impairment first and first aid second, then the review", () => {
  assert.deepEqual(LESSONS.map((l) => l.id), [
    "alcol-effetti-guida",
    "alcol-tempo-legge",
    "droghe-farmaci",
    "stanchezza-pasti-vista",
    "soccorso-obbligo",
    "primo-soccorso-incosciente",
    "ferite-emorragia",
    "shock-cause-segni",
    "posizioni-shock-torace",
    "fratture-occhio",
    "ustioni",
  ]);
  assert.equal(REVIEW.id, "ripasso-capitolo-22");
  assert.equal(CHAPTER.lessons.at(-1), REVIEW);
  // Impairment groups (576–581, 595, 596) live in L1–L4, first-aid groups (582–594) in L5–L11.
  for (const [i, lesson] of LESSONS.entries()) {
    for (const id of relatedSourceIds(lesson)) {
      const group = BANK[Number(id) - 1][3];
      const firstAid = group >= 582 && group <= 594;
      assert.equal(firstAid, i >= 4, `${id} (group ${group}) sits in the ${firstAid ? "first-aid" : "impairment"} part`);
    }
  }
});

/** Mapped first by chapter 12 (lessons-velocita.ts: tiredness and distance, heavy food, alcohol and reaction); they stay there. */
const OWNED_BY_CHAPTER_12 = ["6463", "6482", "6488", "6586", "6587", "6590"];

test("every chapter 22 question maps to exactly one teaching section; six keep their chapter 12 home", () => {
  const owner = new Map<string, string>();
  for (const lesson of LESSONS) {
    for (const group of lesson.related) {
      assert.ok(group.step > 0 && group.step < lesson.steps.length, `${lesson.id} maps to a real section`);
      assert.ok(!["terms", "trap", "intro", "classify"].includes(lesson.steps[group.step].kind), `${lesson.id} maps questions to a teaching section`);
      for (const id of group.sourceIds) {
        assert.ok(inChapter(id), `${lesson.id} maps ${id}, outside chapter 22`);
        assert.ok(!owner.has(id), `${id} is mapped by both ${owner.get(id)} and ${lesson.id}`);
        owner.set(id, lesson.id);
      }
    }
  }
  const all = Array.from({ length: LAST - FIRST + 1 }, (_, i) => String(FIRST + i));
  assert.equal(all.length, 141);
  assert.equal(owner.size, 135);
  assert.deepEqual(all.filter((id) => !owner.has(id)), OWNED_BY_CHAPTER_12, "every other chapter 22 question is mapped here");
  for (const [id, lessonId] of owner) assert.equal(lessonLinkForSourceId(id)?.lessonId, lessonId, `${id} routes to ${lessonId}`);
  const elsewhere = new Map<string, string>();
  for (const chapter of CHAPTERS.filter((c) => c !== CHAPTER)) {
    for (const lesson of chapter.lessons) {
      for (const id of relatedSourceIds(lesson)) if (inChapter(id)) elsewhere.set(id, chapter.id);
    }
  }
  assert.deepEqual([...elsewhere.keys()].sort(), OWNED_BY_CHAPTER_12, "only the six chapter 12 questions are mapped outside chapter 22");
  assert.ok([...elsewhere.values()].every((id) => id === VELOCITA_CHAPTER.id), "and chapter 12 is the one that maps them");
});

test("disputed statements stay mapped to the section that explains the difference, and are never scored", () => {
  assert.deepEqual([...DISPUTED].sort(), ["6518", "6550", "6578", "6581"]);
  const quoted = new Set(CHAPTER.lessons.flatMap((lesson) => quotedOf(lesson).map((s) => s.sourceId)));
  for (const id of DISPUTED) {
    assert.ok(!quoted.has(id), `${id} is not a practice, review, trap or factor statement`);
    const link = lessonLinkForSourceId(id);
    assert.ok(link, `${id} is still mapped, so an exam mistake routes to its explanation`);
    const lesson = LESSONS.find((l) => l.id === link.lessonId) as Lesson;
    const section = stepText(lesson.steps[link.step]);
    assert.match(section, /مورد اختلاف/, `${id}: its section names the discrepancy`);
    assert.match(section, /جوابِ بانک/, `${id}: and states the bank's answer`);
    assert.match(section, /رهنمودِ امروز/, `${id}: and what current guidance says`);
    assert.match(section, /در تمرین‌های امتیازیِ این دوره نمی‌آی/, `${id}: and that it is not scored here`);
    assert.match(section, new RegExp(bankRow(id).answer ? "VERO" : "FALSO"), `${id}: the stated bank answer is the real key`);
  }
});

test("no statement in chapter 22 shows a bank image; the drawing names every part", () => {
  for (let id = FIRST; id <= LAST; id++) assert.equal(bankRow(String(id)).image, null, `${id} has no image`);
  for (const lesson of CHAPTER.lessons) {
    for (const statement of quotedOf(lesson) as { sourceId: string; sign?: number }[]) assert.equal(statement.sign, undefined);
  }
  const road = readFileSync("public/js/road.js", "utf8");
  const scenes = LESSONS.flatMap((lesson) => lesson.steps.flatMap((step) => (step.kind === "anatomy" ? [step] : [])));
  assert.deepEqual(scenes.map((s) => s.scene), ["posizioni"]);
  for (const step of scenes) {
    const start = road.indexOf(`    ${step.scene}: { h: `);
    assert.ok(start > 0, `${step.scene} is drawn`);
    const block = road.slice(start, road.indexOf("} },", start));
    const drawn = [...block.matchAll(/part\('([a-z]+)'/g)].map((m) => m[1]);
    assert.deepEqual(drawn.sort(), step.parts.map((p) => p.id).sort(), `${step.scene}: every drawn part has text, every part is drawn`);
  }
});

test("every original exercise is labelled; first-aid scenarios point to 112 and the operator and allow several right actions", () => {
  for (const lesson of LESSONS) {
    for (const step of classifySteps(lesson)) {
      assert.match(step.body, /تمرینِ آموزشی است، نه سؤالِ بانک/, `${lesson.id} "${step.title}": marked as an original exercise`);
      for (const item of step.items) assert.ok(item.explain.length > 20, `${lesson.id}: "${item.prompt}" explains its answer`);
    }
  }
  for (const lesson of FIRST_AID) {
    const steps = classifySteps(lesson);
    assert.equal(steps.length, 1, `${lesson.id} has one scenario`);
    for (const step of steps) {
      assert.match(step.body, /نه دستورِ اضطراری/, `${lesson.id}: not personal emergency advice`);
      assert.match(step.body, /نه جایگزینِ دوره‌ی عملیِ کمک‌های اولیه/, `${lesson.id}: not a first-aid course`);
      assert.match(step.body, /۱۱۲ \(یا ۱۱۸\)/, `${lesson.id}: names the emergency number`);
      assert.match(step.body, /دستورهای اپراتور/, `${lesson.id}: follow the operator`);
      if (step.options[0].it === "fallo") {
        assert.ok(step.items.filter((item) => item.answer === 0).length >= 2, `${lesson.id}: more than one action is right`);
        assert.ok(step.items.some((item) => item.answer === step.options.length - 1), `${lesson.id}: and at least one is to be avoided`);
      }
    }
  }
  assert.match(CHAPTER.summaryFa, /گواهیِ کمک‌های اولیه نیست/, "the chapter says it is not a certificate");
  assert.match(REVIEW.steps[0].kind === "intro" ? REVIEW.steps[0].why : "", /گواهیِ کمک‌های اولیه نیست/);
});

test("no 'safe to drive' arithmetic and no medicine-specific or dosage advice", () => {
  for (const phrase of ["per ogni bicchiere", "هر لیوان", "لیوان در ساعت", "ساعت برای هر", "g/l all'ora", "peso corporeo", "وزنِ بدن"]) {
    assert.ok(!SRC.includes(phrase), `chapter 22 never offers drink or time arithmetic («${phrase}»)`);
  }
  assert.ok(!/\b\d+\s?mg\b/.test(SRC), "no doses");
  assert.match(SRC, /داروی تجویزی را خودت قطع نکن/, "it says not to stop or change a prescribed medicine on one's own");
  assert.match(SRC, /این درس درباره‌ی هیچ داروی مشخصی توصیه نمی‌کند/);
});

test("chapter 22 links chapter 12 and chapter 21 instead of repeating them", () => {
  const reaction = VELOCITA_CHAPTER.lessons.find((l) => l.id === "spazio-di-reazione") as Lesson;
  assert.ok(stepText(LESSONS[0].steps[1]).includes(`«${reaction.titleFa}»`), "L1 links chapter 12's reaction-time lesson by its title");
  const duties = INCIDENTI_CHAPTER.lessons.find((l) => l.id === "incidente-obblighi") as Lesson;
  assert.ok(stepText(LESSONS[4].steps[1]).includes(`«${duties.titleFa}»`), "L5 links chapter 21's duties lesson by its title");
  const ch21 = readdirSync("src/content").filter((f) => f.startsWith("ch21-")).map((f) => readFileSync(`src/content/${f}`, "utf8")).join("\n");
  assert.ok(ch21.includes("کمک‌های اولیه موضوعِ فصلِ ۲۲ است"), "chapter 21 still points here");
});

test("chapter 22 uses its glossary headwords", () => {
  for (const word of ["مستی", "الکلِ خون", "حبس", "مواد مخدر", "کمک‌های اولیه", "کمک‌رسان", "مصدوم", "زخمی", "خونریزی", "شوک", "قفسه‌ی سینه", "ستونِ مهره‌ها", "شکستگی", "سوختگی", "جسمِ خارجی", "عینکِ طبی", "لنزِ تماسی", "کدِ ۰۱", "پارکینگِ کوچکِ کنارِ راه"]) {
    assert.ok(SRC.includes(word), `uses «${word}»`);
  }
  const glossary = readFileSync(".agent/rules/glossary.md", "utf8");
  for (const row of ["| stato di ebbrezza | حالتِ مستی |", "| arresto (pena, art. 186) | حبس |", "| primo soccorso | کمک‌های اولیه |", "| soccorritore | کمک‌رسان |", "| tamponare (una ferita) | روی زخم فشار دادن |", "| stato di shock | شوک |"]) {
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
    assert.ok(!DISPUTED.includes(question.sourceId), `review question ${question.sourceId} is disputed`);
    assert.ok(inChapter(question.sourceId), `${question.sourceId} is a chapter 22 question`);
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

test("the client renders every step kind chapter 22 uses", () => {
  const learn = readFileSync("public/js/learn.js", "utf8");
  for (const lesson of CHAPTER.lessons) {
    for (const step of lesson.steps) assert.match(learn, new RegExp(`content\\.kind === '${step.kind}'`), `${step.kind} is rendered`);
  }
});

// ── Flow against real SQL ─────────────────────────────────────────────────────

const BOT_TOKEN = "123456:chapter22-test";
const USER_A = 22001;
const USER_B = 22002;
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

test("a learner who finished every earlier chapter starts chapter 22 unstarted and is sent to lesson 1", async () => {
  const { raw, call } = setup();
  for (const lesson of CHAPTERS.slice(0, INDEX).flatMap((c) => c.lessons)) {
    raw.prepare(`INSERT INTO lesson_progress (user_id, lesson_id, step, updated_at, completed_at) VALUES (1, ?, 99, '2026-11-14 09:00:00', '2026-11-14 09:00:00')`).run(lesson.id);
  }
  const home = await call(USER_A, "GET", "/learn");
  assert.ok(chapterOf(home).lessons.every((l: { state: string }) => l.state === "not_started"), "nothing in chapter 22 is pre-completed");
  assert.equal(chapterOf(home).completed, false);
  assert.ok(home.body.chapters.slice(0, INDEX).every((c: { completed: boolean }) => c.completed), "earlier chapters stay completed");
  assert.equal(todayLesson(home), LESSONS[0].id, "today's path recommends chapter 22 lesson 1");
});

test("after chapter 21 the learner is sent to chapter 22, can resume it, and walks lessons → review → completion", async () => {
  const { raw, call } = setup();
  for (const lesson of PREVIOUS.lessons.slice(0, -1)) await finish(call, USER_A, lesson);
  const prevReview = await finish(call, USER_A, PREVIOUS.lessons.at(-1) as Lesson);
  assert.equal(prevReview.body.chapterCompleted, true);
  assert.equal(prevReview.body.next.lessonId, LESSONS[0].id, "chapter 21's review hands over to chapter 22 lesson 1");
  assert.deepEqual(prevReview.body.next.chapterNumbers, [22]);

  // Direct access to any lesson, with its own position (lesson numbers are per chapter).
  const sixth = await call(USER_A, "GET", `/learn/lessons/${LESSONS[5].id}`);
  assert.deepEqual(sixth.body.position, { index: 6, total: LESSONS.length, review: false });
  assert.deepEqual(sixth.body.chapter.numbers, [22]);
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
  // Next in course order, or (if chapter 22 is last) the first chapter this learner has not finished.
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
