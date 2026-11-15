/**
 * Chapter 25 (Elementi del veicolo, manutenzione e comportamenti): content
 * integrity against the pinned question bank, full question coverage (276 here,
 * 9 kept by chapters 11 and 12), flagged statements kept out of scored practice,
 * vehicle-type and model caveats, no invented pressures or intervals, the links
 * to earlier chapters, glossary headwords, the four drawings and the "Know the
 * vehicle" map, the review, and the end of the learning route: chapter 25 is the
 * last chapter, nothing points to a chapter 26, "all chapters completed" only
 * when saved progress says so, and a learner who opens it directly gets nothing
 * earlier marked complete.
 */
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";

import worker from "../src/index.js";
import { CHAPTERS, lessonLinkForSourceId, relatedSourceIds, type Lesson } from "../src/content/lessons.js";
import { AMBIENTE_CHAPTER } from "../src/content/lessons-ambiente.js";
import { AUTOSTRADE_CHAPTER } from "../src/content/lessons-autostrade.js";
import { INCIDENTI_CHAPTER } from "../src/content/lessons-incidenti.js";
import { LIMITI_CHAPTER } from "../src/content/lessons-limiti.js";
import { RESPONSABILITA_CHAPTER } from "../src/content/lessons-responsabilita.js";
import { VELOCITA_CHAPTER } from "../src/content/lessons-velocita.js";
import {
  CHAPTER_25_SOURCE_RANGE,
  MAPPED_ELSEWHERE,
  VEICOLO_CHAPTER,
  VEICOLO_FLAGGED_SOURCE_IDS,
} from "../src/content/lessons-veicolo.js";
import { buildTodayPath, type LessonSummary } from "../src/lib/learning.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

/** [text, answer, image file, source group, source line], indexed by source_id - 1. */
const BANK = (JSON.parse(readFileSync("src/content/question-provenance.json", "utf8")) as {
  entries: [string, number, string | null, number, number][];
}).entries;

const [FIRST, LAST] = CHAPTER_25_SOURCE_RANGE;
const CHAPTER = VEICOLO_CHAPTER;
const INDEX = CHAPTERS.indexOf(CHAPTER);
const PREVIOUS = CHAPTERS[INDEX - 1];
const LESSONS = CHAPTER.lessons.filter((lesson) => !lesson.review);
const REVIEW = CHAPTER.lessons.find((lesson) => lesson.review) as Lesson;
const toFa = (n: number) => String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
const SRC = readdirSync("src/content").filter((f) => f.startsWith("ch25-") || f === "lessons-veicolo.ts").map((f) => readFileSync(`src/content/${f}`, "utf8")).join("\n");
const FLAGGED: readonly string[] = VEICOLO_FLAGGED_SOURCE_IDS;
const ELSEWHERE: readonly string[] = MAPPED_ELSEWHERE;

function bankRow(sourceId: string) {
  const row = BANK[Number(sourceId) - 1];
  assert.ok(row, `${sourceId} exists in the bank`);
  return { text: row[0], answer: row[1], image: row[2], group: row[3] };
}

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
const lessonById = (id: string) => LESSONS.find((l) => l.id === id) as Lesson;

test("chapter 25 is the bank's last group, placed last in the route right after chapter 24", () => {
  assert.equal(BANK[FIRST - 2][3], 626, "6854 closes chapter 24 (group 626)");
  assert.equal(BANK[FIRST - 1][3], 627);
  assert.equal(BANK[LAST - 1][3], 656);
  assert.equal(LAST, BANK.length, "7139 is the last question of the bank");
  assert.deepEqual(CHAPTER.numbers, [25]);
  assert.equal(CHAPTER.nameIt, "Elementi del veicolo, manutenzione e comportamenti");
  assert.deepEqual(CHAPTER.topicIds, []);
  assert.equal(PREVIOUS, AMBIENTE_CHAPTER, "the chapter before is chapter 24");
  assert.equal(CHAPTERS.at(-1), CHAPTER, "chapter 25 ends the route");
  const numbers = CHAPTERS.map((c) => c.numbers[0]);
  assert.deepEqual(numbers, [...numbers].sort((a, b) => a - b));
  assert.ok(!SRC.includes("فصلِ ۲۶") && !SRC.includes("فصل ۲۶"), "no chapter 26 is mentioned");
});

test("fourteen lessons with stable ids, then the review", () => {
  assert.deepEqual(LESSONS.map((l) => l.id), [
    "aderenza-pneumatico-strada",
    "curva-sbandamento-ribaltamento",
    "abs-frenata-emergenza",
    "freni-calore-discese-stazionamento",
    "frenatura-poco-efficiente",
    "pneumatici-pressione-condizioni",
    "pneumatici-battistrada-foratura-inverno",
    "foratura-ruota-incendio",
    "sospensioni-tenuta-sovraccarico",
    "ammortizzatori",
    "sterzo-servosterzo",
    "impianto-di-scarico",
    "vetri-tergicristalli-abitacolo",
    "due-ruote-interruttore-catena-livelli",
  ]);
  assert.equal(REVIEW.id, "ripasso-capitolo-25");
  assert.equal(CHAPTER.lessons.at(-1), REVIEW);
});

test("every chapter 25 question maps to exactly one teaching section; nine stay with chapters 11 and 12", () => {
  const owner = new Map<string, string>();
  for (const lesson of LESSONS) {
    for (const group of lesson.related) {
      assert.ok(group.step > 0 && group.step < lesson.steps.length);
      assert.ok(!["terms", "trap", "intro", "classify"].includes(lesson.steps[group.step].kind), `${lesson.id} maps to a teaching section`);
      for (const id of group.sourceIds) {
        assert.ok(inChapter(id), `${lesson.id} maps ${id}, outside chapter 25`);
        assert.ok(!owner.has(id), `${id} mapped twice`);
        owner.set(id, lesson.id);
      }
    }
  }
  const all = Array.from({ length: LAST - FIRST + 1 }, (_, i) => String(FIRST + i));
  assert.equal(all.length, 285);
  assert.deepEqual(all.filter((id) => !owner.has(id)), [...ELSEWHERE], "only the nine kept elsewhere are unmapped here");
  assert.equal(owner.size, 276);
  for (const [id, lessonId] of owner) assert.equal(lessonLinkForSourceId(id)?.lessonId, lessonId, `${id} routes to ${lessonId}`);
  // The nine keep routing where saved mistakes already point.
  const kept = new Set([...LIMITI_CHAPTER.lessons, ...VELOCITA_CHAPTER.lessons].map((l) => l.id));
  for (const id of ELSEWHERE) assert.ok(kept.has(lessonLinkForSourceId(id)?.lessonId ?? ""), `${id} stays with chapter 11 or 12`);
  for (const chapter of CHAPTERS.filter((c) => c !== CHAPTER && c !== LIMITI_CHAPTER && c !== VELOCITA_CHAPTER)) {
    for (const lesson of chapter.lessons) {
      for (const id of relatedSourceIds(lesson)) assert.ok(!inChapter(id), `${chapter.id}/${lesson.id} maps chapter 25 question ${id}`);
    }
  }
});

test("flagged statements stay mapped to a section with a source note, and are never scored", () => {
  assert.deepEqual([...FLAGGED].sort(), ["6938", "7101", "7131"]);
  const quoted = new Set(CHAPTER.lessons.flatMap((lesson) => quotedOf(lesson).map((s) => s.sourceId)));
  for (const id of FLAGGED) {
    assert.ok(!quoted.has(id), `${id} is not a practice, review, trap or factor statement`);
    const link = lessonLinkForSourceId(id);
    assert.ok(link, `${id} is still mapped`);
    const text = stepText(lessonById(link.lessonId).steps[link.step]);
    assert.match(text, new RegExp(`یادداشتِ منبع: بانک \\(${id}\\)`), `${id}: its section names it in a source note`);
    assert.match(text, /این سؤال را برای امتیاز نمی‌آوریم/, `${id}: the note says it is not scored`);
  }
  assert.deepEqual(FLAGGED.map((id) => bankRow(id).answer), [1, 0, 1], "bank answers unchanged");
});

test("every quoted statement matches the pinned bank: text and answer key; no bank images", () => {
  for (let id = FIRST; id <= LAST; id++) assert.equal(bankRow(String(id)).image, null);
  for (const lesson of CHAPTER.lessons) {
    for (const statement of quotedOf(lesson)) {
      const row = bankRow(statement.sourceId);
      assert.equal(statement.textIt, row.text, `${statement.sourceId} text`);
      assert.equal(statement.answer, row.answer, `${statement.sourceId} answer key`);
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
    const classify = classifySteps(lesson);
    assert.equal(classify.length, 1, `${lesson.id} has one exercise`);
    const at = lesson.steps.indexOf(classify[0]);
    assert.ok(at > Math.max(...lesson.related.map((g) => g.step)), `${lesson.id} tests only after teaching`);
    assert.match(classify[0].body, /تمرینِ آموزشی است، نه سؤالِ بانک/, `${lesson.id}: exercise labelled as original`);
    assert.ok(classify[0].items.length >= 4);
    for (const option of classify[0].options.keys()) assert.ok(classify[0].items.some((i) => i.answer === option), `${lesson.id}: option ${option} is right at least once`);
    for (const item of classify[0].items) {
      if (item.pair) assert.equal(/هر دو با هم|همه با هم/.test(item.pair.differs), item.answer === 2, `${lesson.id}: "${item.pair.differs}"`);
    }
    for (const step of lesson.steps) {
      if (step.kind === "table") for (const row of step.rows) assert.equal(row.values.length, step.columns.length, `${lesson.id} row "${row.label}"`);
    }
    const intro = lesson.steps[0];
    assert.ok(intro.kind === "intro" && intro.why.startsWith(`${toFa(related.size)} سؤال`), `${lesson.id} intro says ${toFa(related.size)} questions`);
  }
});

test("no invented tyre pressures, intervals or temperatures; the law's numbers only", () => {
  const prose = SRC.replace(/textIt:\s*\n?\s*"(?:[^"\\]|\\.)*"/g, "").replace(/sourceId: "\d+"/g, "");
  assert.doesNotMatch(prose, /\b\d+([.,]\d+)?\s*(bar|psi)\b|[۰-۹]+\s*بار\b/, "no tyre pressure values");
  assert.doesNotMatch(prose, /(هر|ogni)\s+[0-9۰-۹.٬,]+\s*(هزار\s*)?(کیلومتر|km)/, "no maintenance interval in km");
  assert.doesNotMatch(prose, /درجه|°C/, "no operating temperatures");
  // Tread minimums come from L. 142/1992 art. 66; the ruotino figure is attributed to the manuals read.
  assert.match(SRC, /۱٫۶ میلی‌متر/);
  assert.match(SRC, /۰٫۵ میلی‌متر/);
  assert.match(SRC, /در دفترچه‌های فیات و کیا ۸۰ کیلومتر بر ساعت/);
});

test("manual, automatic, combustion, hybrid and electric vehicles are told apart where it matters", () => {
  const brakes = lessonById("freni-calore-discese-stazionamento");
  assert.match(stepText(brakes.steps[2]), /دنده‌اتومات/);
  assert.match(stepText(brakes.steps[2]), /هیبریدی و برقی/);
  assert.match(stepText(brakes.steps[3]), /بعضی هیبریدی‌ها برای ترمزِ کمکی هنوز به موتورِ بنزینی تکیه دارند/, "hybrid servo depends on the car");
  assert.match(stepText(brakes.steps[4]), /دکمه‌ی برقی/, "electric parking brake");
  const wheel = lessonById("foratura-ruota-incendio");
  assert.match(stepText(wheel.steps[1]), /روی P/, "automatic: P when changing a wheel");
  assert.match(stepText(wheel.steps[3]), /آتشِ باتری را خودت خاموش نکن/, "electric-car fire: move away");
  const steering = lessonById("sterzo-servosterzo");
  assert.match(stepText(steering.steps[1]), /به خودرو بستگی دارد/, "electric power steering depends on the car");
  assert.match(stepText(lessonById("impianto-di-scarico").steps[1]), /اگزوز ندارد/, "electric: no exhaust");
  assert.match(stepText(lessonById("due-ruote-interruttore-catena-livelli").steps[1]), /بسیاری از اسکوترهای کوچک آن را ندارند/);
  for (const id of ["abs-frenata-emergenza", "freni-calore-discese-stazionamento", "pneumatici-pressione-condizioni", "foratura-ruota-incendio", "sterzo-servosterzo", "due-ruote-interruttore-catena-livelli"]) {
    assert.match(JSON.stringify(lessonById(id).steps), /دفترچه/, `${id} defers model-specific detail to the manual`);
  }
});

test("safety-first wording: nobody under the car, no fuel handling at a fire, people before the vehicle", () => {
  const wheel = lessonById("foratura-ruota-incendio");
  assert.match(stepText(wheel.steps[2]), /هرگز زیرِ خودرو نرو/);
  assert.match(stepText(wheel.steps[1]), /اگر جای امنی نیست، چرخ را عوض نکن و کمک بخواه/);
  assert.match(stepText(wheel.steps[3]), /اول همه را دور کن و به ۱۱۲/);
  assert.match(stepText(wheel.steps[3]), /باک و مخزنِ گاز/);
  assert.match(stepText(lessonById("pneumatici-battistrada-foratura-inverno").steps[2]), /با لاستیکِ خالی رانندگی نکن/);
  assert.match(stepText(lessonById("frenatura-poco-efficiente").steps[2]), /به تعمیرگاه بسپار/, "brake work goes to a workshop");
  assert.doesNotMatch(SRC, /درِ رادیاتور|tappo del radiatore|alta tensione/, "no cooling-system or high-voltage handling");
});

test("chapter 25 links earlier chapters instead of repeating them", () => {
  const grip = lessonById("aderenza-pneumatico-strada");
  assert.ok(stepText(grip.steps[3]).includes(titleOf(VELOCITA_CHAPTER.lessons, "frenatura-e-arresto")), "L1 links chapter 12 braking");
  assert.ok(stepText(grip.steps[3]).includes(titleOf(LIMITI_CHAPTER.lessons, "velocita-adeguata")), "L1 links chapter 11 speed");
  assert.ok(stepText(grip.steps[2]).includes(titleOf(INCIDENTI_CHAPTER.lessons, "ghiaccio-aderenza")), "L1 links chapter 21 ice");
  assert.ok(stepText(lessonById("abs-frenata-emergenza").steps[0]).includes(titleOf(VELOCITA_CHAPTER.lessons, "frenatura-e-arresto")), "L3 links chapter 12 (6910)");
  assert.ok(stepText(lessonById("freni-calore-discese-stazionamento").steps[2]).includes(titleOf(LIMITI_CHAPTER.lessons, "discesa-folle-servofreno")), "L4 links chapter 11 descents");
  assert.ok(stepText(lessonById("foratura-ruota-incendio").steps[1]).includes(titleOf(AUTOSTRADE_CHAPTER.lessons, "triangolo-giubbotto")), "L8 links chapter 17 triangle");
  assert.ok(stepText(lessonById("pneumatici-pressione-condizioni").steps[2]).includes(titleOf(AMBIENTE_CHAPTER.lessons, "consumi-aria-peso-pneumatici")), "L6 links chapter 24 consumption");
  assert.ok(stepText(lessonById("impianto-di-scarico").steps[0]).includes(titleOf(AMBIENTE_CHAPTER.lessons, "cosa-esce-dallo-scarico")), "L12 links chapter 24 exhaust");
  assert.ok(stepText(lessonById("vetri-tergicristalli-abitacolo").steps[2]).includes(titleOf(RESPONSABILITA_CHAPTER.lessons, "distrazioni-a-bordo")), "L13 links chapter 23 distraction");
});

test("chapter 25 uses its glossary headwords, and carreggiata keeps its two meanings apart", () => {
  for (const word of ["نیروی چسبندگی", "ضریبِ چسبندگی", "مرکزِ ثقل", "فاصله‌ی چرخ‌های یک محور", "ترمزِ ضدِقفل", "ترمزِ کمکیِ مکشی", "روغنِ ترمز", "ترمزِ دستی", "ترمزِ موتور", "لنتِ ترمز", "آجِ لاستیک", "لاستیکِ تیوبلس", "لاستیکِ زمستانی", "لاستیکِ میخ‌دار", "زنجیرِ چرخ", "زاپاس", "جک", "سیستمِ تعلیق", "کمک‌فنر", "فرمانِ کمکی (هیدرولیک یا برقی)", "لقیِ فرمان", "بالانسِ چرخ", "صداخفه‌کن", "سیستمِ اگزوز", "برف‌پاک‌کن", "شیشه‌شوی", "تابلوهای پیامِ متغیر", "کلیدِ قطعِ اضطراریِ موتور", "زنجیرِ انتقالِ نیرو", "پایه‌ی موتورسیکلت"]) {
    assert.ok(SRC.includes(word), `uses «${word}»`);
  }
  assert.match(SRC, /این‌جا carreggiata یعنی فاصله‌ی چرخ‌های یک محور، نه سواره‌روی جاده/);
  const glossary = readFileSync(".agent/rules/glossary.md", "utf8");
  for (const row of ["| forza aderente | نیروی چسبندگی |", "| carreggiata (del veicolo) | فاصله‌ی چرخ‌های یک محور |", "| ammortizzatore | کمک‌فنر |", "| freno di stazionamento | ترمزِ دستی |", "| cavalletto | پایه‌ی موتورسیکلت |"]) {
    assert.ok(glossary.includes(row), `glossary has ${row}`);
  }
});

test("the four drawings name every part, and every part is drawn", () => {
  const road = readFileSync("public/js/road.js", "utf8");
  const scenes = CHAPTER.lessons.flatMap((lesson) => lesson.steps.flatMap((step) => (step.kind === "anatomy" ? [step] : [])));
  assert.deepEqual(scenes.map((s) => s.scene), ["ribaltamento", "sospensione", "moto", "veicolo"]);
  for (const step of scenes) {
    const start = road.indexOf(`    ${step.scene}: { h: `);
    assert.ok(start > 0, `${step.scene} is drawn`);
    const block = road.slice(start, road.indexOf("} },", start));
    assert.match(block, /schema/, `${step.scene} is labelled as a schematic`);
    const drawn = [...block.matchAll(/part\('([a-z0-9]+)'/g)].map((m) => m[1]);
    assert.deepEqual(drawn.sort(), step.parts.map((p) => p.id).sort(), `${step.scene}: drawn parts = described parts`);
  }
});

test("the 'Know the vehicle' map: every part says where it is, what it does, why it matters, and links its lesson", () => {
  const map = REVIEW.steps.find((step) => step.kind === "anatomy");
  assert.ok(map && map.kind === "anatomy" && map.scene === "veicolo");
  assert.match(map.body, /همه‌ی خودروها همه‌ی این قطعه‌ها را ندارند/);
  for (const part of map.parts) {
    assert.ok(part.where && part.safety && part.text, `${part.id} has where, function and safety`);
    assert.ok(part.link && LESSONS.some((l) => l.id === part.link?.lessonId && l.titleFa === part.link?.titleFa), `${part.id} links a chapter 25 lesson by its real title`);
  }
  const learn = readFileSync("public/js/learn.js", "utf8");
  assert.match(learn, /row\('کجاست:', part\.where\)/);
  assert.match(learn, /row\('برای ایمنی:', part\.safety\)/);
  assert.match(learn, /anatomy-link/);
  assert.match(learn, /class="anatomy-chip"/, "an equivalent list of buttons sits beside the drawing");
});

test("the chapter review takes two unseen questions from every lesson and maps nothing itself", () => {
  assert.deepEqual(REVIEW.related, []);
  const seen = new Set(LESSONS.flatMap((lesson) => quotedOf(lesson).map((s) => s.sourceId)));
  const homes = REVIEW.practice.map((question) => {
    assert.ok(!seen.has(question.sourceId), `${question.sourceId} was already shown in a lesson`);
    assert.ok(!FLAGGED.includes(question.sourceId), `${question.sourceId} is flagged`);
    const link = lessonLinkForSourceId(question.sourceId);
    assert.equal(link?.step, question.conceptStep, `${question.sourceId} names the section that teaches it`);
    return link?.lessonId;
  });
  assert.deepEqual(homes, LESSONS.flatMap((lesson) => [lesson.id, lesson.id]), "two per lesson, in order");
  for (const [i, question] of REVIEW.practice.entries()) {
    assert.match(question.why, new RegExp(`درس ${toFa(Math.floor(i / 2) + 1)}\\)`));
  }
  const summary = REVIEW.steps.find((step) => step.kind === "table");
  assert.equal(summary?.kind === "table" ? summary.rows.length : 0, LESSONS.length);
  assert.ok(REVIEW.practice.some((q) => q.answer === 0) && REVIEW.practice.some((q) => q.answer === 1));
});

test("the client renders every step kind chapter 25 uses", () => {
  const learn = readFileSync("public/js/learn.js", "utf8");
  for (const lesson of CHAPTER.lessons) {
    for (const step of lesson.steps) assert.match(learn, new RegExp(`content\\.kind === '${step.kind}'`));
  }
});

test("today's path offers a full exam only once every lesson is completed", () => {
  const summary = (id: string, state: LessonSummary["state"]): LessonSummary => ({
    id, chapterId: "c", titleFa: id, titleIt: id, minutes: 5, signs: [], state, step: state === "completed" ? 9 : 0, stepCount: 9,
    practice: { answered: 0, correct: 0, total: 4 }, dueReview: 0, updatedAt: state === "not_started" ? null : "2026-11-15 10:00:00",
  });
  const done = buildTodayPath([summary("a", "completed"), summary("b", "completed")], 0);
  assert.deepEqual(done.items.map((i) => i.kind), ["exam", "practice"]);
  const almost = buildTodayPath([summary("a", "completed"), summary("b", "not_started")], 0);
  assert.ok(!almost.items.some((i) => i.kind === "exam"), "no exam item while a lesson is open");
  const learn = readFileSync("public/js/learn.js", "utf8");
  assert.match(learn, /item\.kind === 'exam'\) App\.startExam\('exam'\)/);
});

test("the end-of-route panel is honest: no readiness score, no permission to drive, no chapter 26", () => {
  const learn = readFileSync("public/js/learn.js", "utf8");
  const start = learn.indexOf("function endOfRouteHtml");
  const block = learn.slice(start, learn.indexOf("App.openExternalLink", start));
  assert.match(block, /c\.courseCompleted \|\| \(isReview && c\.lastChapter\)/);
  assert.match(block, /نه اینکه برای آزمون آماده‌ای، و اجازه‌ی رانندگی هم نیست/);
  for (const action of ["App.startReview()", "App.startExam(\\'exam\\')", "App.startTopicPractice()", "App.showScreen(\\'topics\\')"]) {
    assert.ok(block.includes(action), `offers ${action}`);
  }
  assert.doesNotMatch(block, /[0-9۰-۹]+\s*(%|٪|درصد)/, "no readiness percentage");
  assert.match(learn, /c\.next\.earlier \? 'درسِ تمام‌نشده‌ی قبلی: '/, "an earlier unfinished lesson is not labelled as a next chapter");
});

// ── Flow against real SQL ─────────────────────────────────────────────────────

const BOT_TOKEN = "123456:chapter25-test";
const USER_A = 25001;
const USER_B = 25002;
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
  const completeAll = (lessons: Lesson[], userId = 1) => {
    const stmt = raw.prepare(`INSERT INTO lesson_progress (user_id, lesson_id, step, updated_at, completed_at) VALUES (?, ?, 99, '2026-11-14 09:00:00', '2026-11-14 09:00:00')`);
    for (const lesson of lessons) stmt.run(userId, lesson.id);
  };
  return { raw, call, completeAll };
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

test("after chapter 24 the learner is sent to chapter 25, resumes it, and walks to the end of the route", async () => {
  const { raw, call, completeAll } = setup();
  completeAll(CHAPTERS.slice(0, INDEX - 1).flatMap((c) => c.lessons));
  for (const lesson of PREVIOUS.lessons.slice(0, -1)) await finish(call, USER_A, lesson);
  const prevReview = await finish(call, USER_A, PREVIOUS.lessons.at(-1) as Lesson);
  assert.equal(prevReview.body.next.lessonId, LESSONS[0].id, "chapter 24's review hands over to chapter 25 lesson 1");
  assert.deepEqual(prevReview.body.next.chapterNumbers, [25]);
  assert.equal(prevReview.body.next.earlier, false);
  assert.equal(prevReview.body.courseCompleted, false);

  const home = await call(USER_A, "GET", "/learn");
  assert.ok(chapterOf(home).lessons.every((l: { state: string }) => l.state === "not_started"), "nothing in chapter 25 is pre-completed");
  assert.equal(todayLesson(home), LESSONS[0].id);
  assert.equal(home.body.courseCompleted, false);

  await call(USER_A, "POST", `/learn/lessons/${LESSONS[0].id}/progress`, { step: 3 });
  const resumed = await call(USER_A, "GET", `/learn/lessons/${LESSONS[0].id}`);
  assert.deepEqual([resumed.body.progress.state, resumed.body.progress.step], ["in_progress", 3]);

  const done1 = await finish(call, USER_A, LESSONS[0], true);
  assert.equal(done1.body.practice.queuedForReview, 1);
  assert.equal(done1.body.next.lessonId, LESSONS[1].id);
  const queued = raw.prepare(`SELECT q.source_id AS sourceId FROM review_queue r JOIN questions q ON q.id = r.question_id WHERE r.user_id = 1`).all() as { sourceId: string }[];
  assert.equal(lessonLinkForSourceId(queued[0].sourceId)?.lessonId, LESSONS[0].id, "the mistake routes to its teaching section");

  for (const lesson of LESSONS.slice(1)) assert.equal((await finish(call, USER_A, lesson)).status, 200);
  const reviewDone = await finish(call, USER_A, REVIEW, true);
  assert.equal(reviewDone.body.chapterCompleted, true);
  assert.equal(reviewDone.body.lastChapter, true);
  assert.equal(reviewDone.body.courseCompleted, true, "every lesson of every chapter is completed in saved progress");
  assert.deepEqual(reviewDone.body.openChapters, []);
  assert.equal(reviewDone.body.next, null, "nothing after the last chapter: no chapter 26");

  const end = await call(USER_A, "GET", "/learn");
  assert.equal(end.body.courseCompleted, true);
  assert.ok(end.body.today.items.some((i: { kind: string }) => i.kind === "exam"), "today's path offers a full simulation");
  assert.ok(!end.body.today.items.some((i: { kind: string }) => i.kind === "lesson"));

  const other = await call(USER_B, "GET", "/learn");
  assert.equal(other.body.courseCompleted, false, "the other learner is untouched");
  assert.ok(chapterOf(other).lessons.every((l: { state: string }) => l.state === "not_started"));
  assert.equal((raw.prepare(`SELECT COUNT(*) AS n FROM review_queue WHERE user_id = 2`).get() as { n: number }).n, 0);
});

test("a learner who opens chapter 25 directly finishes it without anything earlier marked complete", async () => {
  const { call } = setup();
  for (const lesson of LESSONS) assert.equal((await finish(call, USER_A, lesson)).status, 200);
  const reviewDone = await finish(call, USER_A, REVIEW);
  assert.equal(reviewDone.body.chapterCompleted, true);
  assert.equal(reviewDone.body.lastChapter, true);
  assert.equal(reviewDone.body.courseCompleted, false, "earlier chapters are not complete");
  assert.equal(reviewDone.body.openChapters.length, 24);
  assert.equal(reviewDone.body.next.earlier, true, "the next lesson lies behind, labelled as unfinished, not as a new chapter");
  assert.equal(reviewDone.body.next.lessonId, CHAPTERS[0].lessons[0].id);

  const home = await call(USER_A, "GET", "/learn");
  assert.equal(home.body.courseCompleted, false);
  assert.equal(chapterOf(home).completed, true);
  assert.ok(home.body.chapters.slice(0, INDEX).every((c: { completed: boolean; lessons: { state: string }[] }) => !c.completed && c.lessons.every((l) => l.state === "not_started")), "no earlier lesson is marked complete");
  assert.ok(!home.body.today.items.some((i: { kind: string }) => i.kind === "exam"), "no 'all done' exam offer");

  const again = await call(USER_A, "GET", `/learn/lessons/${LESSONS[3].id}`);
  assert.equal(again.body.progress.state, "completed", "revisiting keeps it completed");
  const term = LESSONS[3].steps.flatMap((step) => (step.kind === "terms" ? step.terms : []))[0];
  assert.ok((await call(USER_A, "POST", "/vocab", { termIt: term.it, termFa: term.fa })).status < 300);
  assert.ok((await call(USER_A, "GET", `/learn/lessons/${LESSONS[3].id}`)).body.savedTerms.includes(term.it));
  assert.ok(!(await call(USER_B, "GET", `/learn/lessons/${LESSONS[3].id}`)).body.savedTerms.includes(term.it), "vocabulary is per learner");
});
