/**
 * Chapter 23 (Responsabilità civile, penale e assicurazione): content integrity
 * against the pinned question bank, full question coverage (148 here, 6713 kept
 * by chapter 12), the policy-dependent statements kept out of scored practice,
 * the original exercises (labelled, not legal advice, several consequences can
 * be right at once), the links to chapters 12, 13, 20, 21 and 22, the glossary
 * headwords, the drawing, the chapter review, its place in the route right after
 * chapter 22, and the learner flow end to end (resume, mistakes, vocab, nothing
 * pre-completed, two learners kept apart).
 *
 * Neighbours are found by position and number, never by a fixed index.
 */
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";

import worker from "../src/index.js";
import { CHAPTERS, lessonLinkForSourceId, relatedSourceIds, type Lesson } from "../src/content/lessons.js";
import { ALCOOL_CHAPTER } from "../src/content/lessons-alcool.js";
import { INCIDENTI_CHAPTER } from "../src/content/lessons-incidenti.js";
import { NORME_CHAPTER } from "../src/content/lessons-norme.js";
import { PATENTE_CHAPTER } from "../src/content/lessons-patente.js";
import { CHAPTER_23_SOURCE_RANGE, POLICY_DEPENDENT_SOURCE_IDS, RESPONSABILITA_CHAPTER } from "../src/content/lessons-responsabilita.js";
import { VELOCITA_CHAPTER } from "../src/content/lessons-velocita.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

/** [text, answer, image file, source group, source line], indexed by source_id - 1. */
const BANK = (JSON.parse(readFileSync("src/content/question-provenance.json", "utf8")) as {
  entries: [string, number, string | null, number, number][];
}).entries;

const [FIRST, LAST] = CHAPTER_23_SOURCE_RANGE;
const CHAPTER = RESPONSABILITA_CHAPTER;
const INDEX = CHAPTERS.indexOf(CHAPTER);
const PREVIOUS = CHAPTERS[INDEX - 1];
const LESSONS = CHAPTER.lessons.filter((lesson) => !lesson.review);
const REVIEW = CHAPTER.lessons.find((lesson) => lesson.review) as Lesson;
const toFa = (n: number) => String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
const SRC = readdirSync("src/content").filter((f) => f.startsWith("ch23-") || f === "lessons-responsabilita.ts").map((f) => readFileSync(`src/content/${f}`, "utf8")).join("\n");
const POLICY: readonly string[] = POLICY_DEPENDENT_SOURCE_IDS;

function bankRow(sourceId: string) {
  const row = BANK[Number(sourceId) - 1];
  assert.ok(row, `${sourceId} exists in the bank`);
  return { text: row[0], answer: row[1], image: row[2], group: row[3] };
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
const titleOf = (lessons: Lesson[], id: string) => `«${(lessons.find((l) => l.id === id) as Lesson).titleFa}»`;

test("chapter 23 is the bank's twenty-third group, placed right after chapter 22", () => {
  // "alcool-droga-primo-soccorso" ends at group 596; "responsabilita-civile-penale-e-assicurazione" is groups 597–611.
  assert.equal(BANK[FIRST - 2][3], 596);
  assert.equal(BANK[FIRST - 1][3], 597);
  assert.equal(BANK[LAST - 1][3], 611);
  assert.equal(BANK[LAST][3], 612, "source id 6752 opens the next bank group (consumi e ambiente)");
  assert.deepEqual(CHAPTER.numbers, [23]);
  assert.equal(CHAPTER.nameIt, "Responsabilità civile, penale e assicurazione");
  assert.deepEqual(CHAPTER.topicIds, [], "its questions are spread over several app topics");
  assert.ok(INDEX > 0, "registered in CHAPTERS");
  const numbers = CHAPTERS.map((c) => c.numbers[0]);
  assert.deepEqual(numbers, [...numbers].sort((a, b) => a - b), "the route is in official chapter order");
  assert.equal(new Set(CHAPTERS.flatMap((c) => c.numbers)).size, CHAPTERS.flatMap((c) => c.numbers).length, "every chapter number appears once");
  assert.equal(PREVIOUS, ALCOOL_CHAPTER, "the chapter before is chapter 22");
  assert.ok(CHAPTERS.slice(INDEX + 1).every((c) => c.numbers[0] > 23));
});

test("twelve lessons with stable ids: liability, insurance, traffic psychology, then the review", () => {
  assert.deepEqual(LESSONS.map((l) => l.id), [
    "responsabilita-tre-conseguenze",
    "responsabilita-penale",
    "responsabilita-civile",
    "chi-risponde-risarcimento",
    "rca-obbligo-contratto",
    "rca-cosa-copre",
    "rca-massimali-polizze",
    "senza-assicurazione-fondo",
    "attenzione-sensi-emozioni",
    "distrazioni-a-bordo",
    "valutare-se-e-gli-altri",
    "perche-le-regole",
  ]);
  assert.equal(REVIEW.id, "ripasso-capitolo-23");
  assert.equal(CHAPTER.lessons.at(-1), REVIEW);
  // Liability groups (597–601, 603) in L1–L4, insurance (602, 604–610) in L5–L8, psychology (611) in L9–L12.
  const LIABILITY = new Set([597, 598, 599, 600, 601, 603]);
  for (const [i, lesson] of LESSONS.entries()) {
    for (const id of relatedSourceIds(lesson)) {
      const group = bankRow(id).group;
      const part = LIABILITY.has(group) ? 0 : group <= 610 ? 1 : 2;
      assert.equal(part, Math.floor(i / 4), `${id} (group ${group}) sits in part ${part + 1}`);
    }
  }
});

/** Mapped first by chapter 12 (attention falls with tiredness); it stays there. */
const OWNED_BY_CHAPTER_12 = ["6713"];

test("every chapter 23 question maps to exactly one teaching section; 6713 keeps its chapter 12 home", () => {
  const owner = new Map<string, string>();
  for (const lesson of LESSONS) {
    for (const group of lesson.related) {
      assert.ok(group.step > 0 && group.step < lesson.steps.length, `${lesson.id} maps to a real section`);
      assert.ok(!["terms", "trap", "intro", "classify"].includes(lesson.steps[group.step].kind), `${lesson.id} maps questions to a teaching section`);
      for (const id of group.sourceIds) {
        assert.ok(inChapter(id), `${lesson.id} maps ${id}, outside chapter 23`);
        assert.ok(!owner.has(id), `${id} is mapped by both ${owner.get(id)} and ${lesson.id}`);
        owner.set(id, lesson.id);
      }
    }
  }
  const all = Array.from({ length: LAST - FIRST + 1 }, (_, i) => String(FIRST + i));
  assert.equal(all.length, 149);
  assert.equal(owner.size, 148);
  assert.deepEqual(all.filter((id) => !owner.has(id)), OWNED_BY_CHAPTER_12, "every other chapter 23 question is mapped here");
  for (const [id, lessonId] of owner) assert.equal(lessonLinkForSourceId(id)?.lessonId, lessonId, `${id} routes to ${lessonId}`);
  const elsewhere = new Map<string, string>();
  for (const chapter of CHAPTERS.filter((c) => c !== CHAPTER)) {
    for (const lesson of chapter.lessons) {
      for (const id of relatedSourceIds(lesson)) if (inChapter(id)) elsewhere.set(id, chapter.id);
    }
  }
  assert.deepEqual([...elsewhere.keys()].sort(), OWNED_BY_CHAPTER_12, "only 6713 is mapped outside chapter 23");
  assert.ok([...elsewhere.values()].every((id) => id === VELOCITA_CHAPTER.id), "and chapter 12 is the one that maps it");
});

test("policy-dependent statements stay mapped to a section that says so, and are never scored", () => {
  assert.deepEqual([...POLICY].sort(), ["6669", "6670"]);
  const quoted = new Set(CHAPTER.lessons.flatMap((lesson) => quotedOf(lesson).map((s) => s.sourceId)));
  for (const id of POLICY) {
    assert.ok(!quoted.has(id), `${id} is not a practice, review, trap or factor statement`);
    const link = lessonLinkForSourceId(id);
    assert.ok(link, `${id} is still mapped, so an exam mistake routes to its explanation`);
    const lesson = LESSONS.find((l) => l.id === link.lessonId) as Lesson;
    assert.match(stepText(lesson.steps[link.step]), /بیمه‌نامه/, `${id}: its section names the policy as the source`);
  }
});

test("liability is taught as three coexisting paths, and insurance never removes a crime", () => {
  const [l1, l2, l3] = LESSONS;
  const drawing = l1.steps[1];
  assert.ok(drawing.kind === "anatomy" && drawing.scene === "conseguenze");
  assert.match(drawing.takeaway, /هر سه/, "the same crash can start all three");
  const scenario = classifySteps(l1)[0];
  assert.ok(scenario.items.filter((item) => item.answer === 0).length >= 3, "several consequences arise at once in the L1 scenario");
  const insurer = l2.steps[2];
  assert.ok(insurer.kind === "table");
  const row = insurer.rows.find((r) => r.it === "interviene l'impresa di assicurazione");
  assert.equal(row?.values[0], "نه", "paying through the insurer does not erase criminal liability");
  const independent = l3.practice.find((q) => q.sourceId === "6635");
  assert.match(independent?.why ?? "", /هر سه پیش بیاید/, "«indipendente» is explained as separate conditions, not mutually exclusive");
  // The bank statements claiming insurance or payment erase a crime or a fine are FALSO.
  for (const id of ["6686", "6687", "6624", "6608"]) assert.equal(bankRow(id).answer, 0);
});

test("no statement in chapter 23 shows a bank image; the drawing names every part", () => {
  for (let id = FIRST; id <= LAST; id++) assert.equal(bankRow(String(id)).image, null, `${id} has no image`);
  for (const lesson of CHAPTER.lessons) {
    for (const statement of quotedOf(lesson) as { sourceId: string; sign?: number }[]) assert.equal(statement.sign, undefined);
  }
  const road = readFileSync("public/js/road.js", "utf8");
  const scenes = LESSONS.flatMap((lesson) => lesson.steps.flatMap((step) => (step.kind === "anatomy" ? [step] : [])));
  assert.deepEqual(scenes.map((s) => s.scene), ["conseguenze"]);
  for (const step of scenes) {
    const start = road.indexOf(`    ${step.scene}: { h: `);
    assert.ok(start > 0, `${step.scene} is drawn`);
    const block = road.slice(start, road.indexOf("} },", start));
    const drawn = [...block.matchAll(/part\('([a-z]+)'/g)].map((m) => m[1]);
    assert.deepEqual(drawn.sort(), step.parts.map((p) => p.id).sort(), `${step.scene}: every drawn part has text, every part is drawn`);
  }
});

test("every original exercise is labelled as not a bank question and not legal advice, and is deterministic", () => {
  for (const lesson of LESSONS) {
    const steps = classifySteps(lesson);
    assert.equal(steps.length, 1, `${lesson.id} has one exercise`);
    for (const step of steps) {
      assert.match(step.body, /تمرینِ آموزشی است، نه سؤالِ بانک/, `${lesson.id} "${step.title}": marked as an original exercise`);
      assert.match(step.body, /مشاوره‌ی حقوقی یا بیمه‌ای برای موقعیتِ واقعیِ تو نیست/, `${lesson.id}: not personal legal advice`);
      for (const item of step.items) assert.ok(item.explain.length > 20, `${lesson.id}: "${item.prompt}" explains its answer`);
      assert.ok(step.items.filter((item) => item.answer === 0).length >= 2, `${lesson.id}: more than one item shares the first answer`);
    }
  }
  // Liability and insurance exercises separate "cannot tell from these facts" from "no".
  const undetermined = LESSONS.slice(0, 8).filter((l) => classifySteps(l)[0].options.some((o) => o.it === "non si può dire"));
  assert.ok(undetermined.length >= 5, "most liability and insurance exercises offer 'cannot tell'");
  assert.match(CHAPTER.summaryFa, /مشاوره‌ی حقوقی یا بیمه‌ای نیست/);
  assert.match(REVIEW.steps[0].kind === "intro" ? REVIEW.steps[0].why : "", /مشاوره‌ی حقوقی یا بیمه‌ای نیست/);
});

test("chapter 23 links chapters 12, 13, 20, 21 and 22 instead of repeating them", () => {
  const [l1, , , , l5, l6, l7, , l9, l10, , l12] = LESSONS;
  assert.ok(stepText(l1.steps[2]).includes(titleOf(PATENTE_CHAPTER.lessons, "patente-sospensione")), "L1 links chapter 20 suspension");
  assert.ok(stepText(l1.steps[2]).includes(titleOf(PATENTE_CHAPTER.lessons, "patente-revisione-revoca")), "L1 links chapter 20 revision/revocation");
  assert.ok(stepText(l5.steps[1]).includes(titleOf(PATENTE_CHAPTER.lessons, "documenti-veicolo-targhe")), "L5 links chapter 20 documents");
  assert.ok(stepText(l7.steps[2]).includes(titleOf(PATENTE_CHAPTER.lessons, "documenti-veicolo-targhe")), "L7 links chapter 20 documents");
  assert.ok(stepText(l6.steps[2]).includes(titleOf(INCIDENTI_CHAPTER.lessons, "incidente-obblighi")), "L6 links chapter 21's duties and CAI lesson");
  assert.ok(stepText(l9.steps[1]).includes(titleOf(VELOCITA_CHAPTER.lessons, "spazio-di-reazione")), "L9 links chapter 12");
  assert.ok(stepText(l9.steps[1]).includes(titleOf(ALCOOL_CHAPTER.lessons, "stanchezza-pasti-vista")), "L9 links chapter 22 tiredness");
  assert.ok(stepText(l10.steps[1]).includes(titleOf(NORME_CHAPTER.lessons, "norme-specchi")), "L10 links chapter 13 mirrors");
  assert.ok(stepText(l12.steps[2]).includes(titleOf(ALCOOL_CHAPTER.lessons, "alcol-effetti-guida")), "L12 links chapter 22 alcohol");
  assert.ok(stepText(l12.steps[2]).includes(titleOf(ALCOOL_CHAPTER.lessons, "alcol-tempo-legge")));
});

test("chapter 23 uses its glossary headwords", () => {
  for (const word of ["مسئولیتِ مدنی", "مسئولیتِ کیفری", "مسئولیتِ اداری", "جبرانِ خسارت", "زیان‌دیده", "قانونِ جزا", "جرم", "قوه‌ی قاهره", "صدمه‌ی بدنی", "قتلِ غیرعمد", "مالکِ خودرو", "بیمه‌ی شخص ثالث", "گواهیِ بیمه", "حقِ بیمه", "سقفِ تعهد", "فرانشیز", "حقِ رجوعِ بیمه", "بونوس‌مالوس", "جبرانِ مستقیم", "صندوقِ تضمینِ قربانیانِ جاده", "بیمه‌ی بدنه", "مصادره", "توقیف", "حواس‌پرتی", "مسیریاب", "بازداشت"]) {
    assert.ok(SRC.includes(word), `uses «${word}»`);
  }
  const glossary = readFileSync(".agent/rules/glossary.md", "utf8");
  for (const row of ["| responsabilità civile | مسئولیتِ مدنی |", "| responsabilità penale | مسئولیتِ کیفری |", "| risarcimento (del danno) | جبرانِ خسارت |", "| massimale | سقفِ تعهد |", "| rivalsa | حقِ رجوعِ بیمه |", "| arresto (preventivo) | بازداشت |", "| sinistro (stradale) | تصادف |"]) {
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
    assert.ok(!POLICY.includes(question.sourceId), `review question ${question.sourceId} is policy-dependent`);
    assert.ok(inChapter(question.sourceId), `${question.sourceId} is a chapter 23 question`);
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

test("the client renders every step kind chapter 23 uses", () => {
  const learn = readFileSync("public/js/learn.js", "utf8");
  for (const lesson of CHAPTER.lessons) {
    for (const step of lesson.steps) assert.match(learn, new RegExp(`content\\.kind === '${step.kind}'`), `${step.kind} is rendered`);
  }
});

// ── Flow against real SQL ─────────────────────────────────────────────────────

const BOT_TOKEN = "123456:chapter23-test";
const USER_A = 23001;
const USER_B = 23002;
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

test("a learner who finished every earlier chapter starts chapter 23 unstarted and is sent to lesson 1", async () => {
  const { raw, call } = setup();
  for (const lesson of CHAPTERS.slice(0, INDEX).flatMap((c) => c.lessons)) {
    raw.prepare(`INSERT INTO lesson_progress (user_id, lesson_id, step, updated_at, completed_at) VALUES (1, ?, 99, '2026-11-14 09:00:00', '2026-11-14 09:00:00')`).run(lesson.id);
  }
  const home = await call(USER_A, "GET", "/learn");
  assert.ok(chapterOf(home).lessons.every((l: { state: string }) => l.state === "not_started"), "nothing in chapter 23 is pre-completed");
  assert.equal(chapterOf(home).completed, false);
  assert.ok(home.body.chapters.slice(0, INDEX).every((c: { completed: boolean }) => c.completed), "earlier chapters stay completed");
  assert.equal(todayLesson(home), LESSONS[0].id, "today's path recommends chapter 23 lesson 1");
});

test("after chapter 22 the learner is sent to chapter 23, can resume it, and walks lessons → review → completion", async () => {
  const { raw, call } = setup();
  for (const lesson of PREVIOUS.lessons.slice(0, -1)) await finish(call, USER_A, lesson);
  const prevReview = await finish(call, USER_A, PREVIOUS.lessons.at(-1) as Lesson);
  assert.equal(prevReview.body.chapterCompleted, true);
  assert.equal(prevReview.body.next.lessonId, LESSONS[0].id, "chapter 22's review hands over to chapter 23 lesson 1");
  assert.deepEqual(prevReview.body.next.chapterNumbers, [23]);

  const sixth = await call(USER_A, "GET", `/learn/lessons/${LESSONS[5].id}`);
  assert.deepEqual(sixth.body.position, { index: 6, total: LESSONS.length, review: false });
  assert.deepEqual(sixth.body.chapter.numbers, [23]);
  assert.equal(sixth.body.chapter.reviewedOn, CHAPTER.reviewedOn);
  const review = await call(USER_A, "GET", `/learn/lessons/${REVIEW.id}`);
  assert.equal(review.body.position.review, true, "the review is not numbered as a lesson");

  await call(USER_A, "POST", `/learn/lessons/${LESSONS[0].id}/progress`, { step: 2 });
  const resumed = await call(USER_A, "GET", `/learn/lessons/${LESSONS[0].id}`);
  assert.deepEqual([resumed.body.progress.state, resumed.body.progress.step], ["in_progress", 2]);
  assert.equal(todayLesson(await call(USER_A, "GET", "/learn")), LESSONS[0].id, "the unfinished lesson is recommended");

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
  const expectedNext = CHAPTERS[INDEX + 1]?.numbers ?? CHAPTERS[0].numbers;
  assert.deepEqual(reviewDone.body.next?.chapterNumbers, expectedNext, "the review hands over in course order");
  const reviewQueued = raw.prepare(`SELECT COUNT(*) AS n FROM review_queue WHERE user_id = 1`).get() as { n: number };
  assert.equal(reviewQueued.n, 2, "the review mistake joins the review queue");
  const reviewLink = lessonLinkForSourceId(REVIEW.practice[0].sourceId);
  assert.deepEqual([reviewLink?.lessonId, reviewLink?.step], [LESSONS[0].id, REVIEW.practice[0].conceptStep], "a review mistake links to its teaching section");

  const practice = await call(USER_A, "POST", "/learn/practice", { lessonId: REVIEW.id });
  assert.equal(practice.status, 200);
  assert.deepEqual(practice.body.lessonIds, CHAPTER.lessons.map((l) => l.id));

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
