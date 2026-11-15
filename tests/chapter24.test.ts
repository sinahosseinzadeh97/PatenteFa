/**
 * Chapter 24 (Consumi, ambiente e inquinamento): content integrity against the
 * pinned question bank, full question coverage (all 103 here), the flagged
 * statements kept out of scored practice, consumption / CO₂ / pollutants /
 * noise kept apart, vehicle-type caveats, the "compare the choices" exercises
 * (labelled, one factor or an honest "cannot tell", no savings figures), safety
 * never traded for savings, the links to chapters 1, 11, 12, 13, 16, 17 and 18,
 * the glossary headwords, both drawings, the chapter review, its place in the
 * route right after chapter 23, and the learner flow end to end (resume,
 * mistakes, vocab, nothing pre-completed, two learners kept apart).
 *
 * Neighbours are found by position and number, never by a fixed index.
 */
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";

import worker from "../src/index.js";
import { CHAPTERS, lessonLinkForSourceId, relatedSourceIds, type Lesson } from "../src/content/lessons.js";
import { AMBIENTE_CHAPTER, CHAPTER_24_SOURCE_RANGE, FLAGGED_SOURCE_IDS } from "../src/content/lessons-ambiente.js";
import { AUTOSTRADE_CHAPTER } from "../src/content/lessons-autostrade.js";
import { DEFINIZIONI_CHAPTER } from "../src/content/lessons-definizioni.js";
import { FERMATA_CHAPTER } from "../src/content/lessons-fermata.js";
import { LIMITI_CHAPTER } from "../src/content/lessons-limiti.js";
import { LUCI_CHAPTER } from "../src/content/lessons-luci.js";
import { NORME_CHAPTER } from "../src/content/lessons-norme.js";
import { RESPONSABILITA_CHAPTER } from "../src/content/lessons-responsabilita.js";
import { VELOCITA_CHAPTER } from "../src/content/lessons-velocita.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

/** [text, answer, image file, source group, source line], indexed by source_id - 1. */
const BANK = (JSON.parse(readFileSync("src/content/question-provenance.json", "utf8")) as {
  entries: [string, number, string | null, number, number][];
}).entries;

const [FIRST, LAST] = CHAPTER_24_SOURCE_RANGE;
const CHAPTER = AMBIENTE_CHAPTER;
const INDEX = CHAPTERS.indexOf(CHAPTER);
const PREVIOUS = CHAPTERS[INDEX - 1];
const LESSONS = CHAPTER.lessons.filter((lesson) => !lesson.review);
const REVIEW = CHAPTER.lessons.find((lesson) => lesson.review) as Lesson;
const toFa = (n: number) => String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
const SRC = readdirSync("src/content").filter((f) => f.startsWith("ch24-") || f === "lessons-ambiente.ts").map((f) => readFileSync(`src/content/${f}`, "utf8")).join("\n");
const FLAGGED: readonly string[] = FLAGGED_SOURCE_IDS;

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
const lessonById = (id: string) => LESSONS.find((l) => l.id === id) as Lesson;

test("chapter 24 is the bank's twenty-fourth group, placed right after chapter 23", () => {
  // "responsabilita-civile-penale-e-assicurazione" ends at group 611; "consumi-ambiente-inquinamento" is groups 612–626.
  assert.equal(BANK[FIRST - 2][3], 611);
  assert.equal(BANK[FIRST - 1][3], 612);
  assert.equal(BANK[LAST - 1][3], 626);
  assert.equal(BANK[LAST][3], 627, "source id 6855 opens the next bank group (elementi del veicolo)");
  assert.deepEqual(CHAPTER.numbers, [24]);
  assert.equal(CHAPTER.nameIt, "Consumi, ambiente e inquinamento");
  assert.deepEqual(CHAPTER.topicIds, [], "its questions are spread over several app topics");
  assert.ok(INDEX > 0, "registered in CHAPTERS");
  const numbers = CHAPTERS.map((c) => c.numbers[0]);
  assert.deepEqual(numbers, [...numbers].sort((a, b) => a - b), "the route is in official chapter order");
  assert.equal(new Set(CHAPTERS.flatMap((c) => c.numbers)).size, CHAPTERS.flatMap((c) => c.numbers).length, "every chapter number appears once");
  assert.equal(PREVIOUS, RESPONSABILITA_CHAPTER, "the chapter before is chapter 23");
  assert.ok(CHAPTERS.slice(INDEX + 1).every((c) => c.numbers[0] > 24));
});

test("ten lessons with stable ids: consumption, pollution, noise, waste, then the review", () => {
  assert.deepEqual(LESSONS.map((l) => l.id), [
    "consumi-aria-peso-pneumatici",
    "consumi-impianti-tipi-veicolo",
    "guida-fluida",
    "miti-del-motore",
    "cosa-esce-dallo-scarico",
    "motore-sano",
    "rumore-del-veicolo",
    "rumore-guida-clacson",
    "rifiuti-del-veicolo",
    "divieti-su-tutte-le-strade",
  ]);
  assert.equal(REVIEW.id, "ripasso-capitolo-24");
  assert.equal(CHAPTER.lessons.at(-1), REVIEW);
  // Noise groups (613–616) only in L7–L8; waste (625) only in L9; road bans (626) only in L10.
  for (const [i, lesson] of LESSONS.entries()) {
    for (const id of relatedSourceIds(lesson)) {
      const group = bankRow(id).group;
      const part = group >= 613 && group <= 616 ? "noise" : group === 625 ? "waste" : group === 626 ? "bans" : "energy";
      const expected = i <= 5 ? "energy" : i <= 7 ? "noise" : i === 8 ? "waste" : "bans";
      assert.equal(part, expected, `${id} (group ${group}) sits in lesson ${i + 1}`);
    }
  }
});

test("every chapter 24 question maps to exactly one teaching section, and no other chapter maps any", () => {
  const owner = new Map<string, string>();
  for (const lesson of LESSONS) {
    for (const group of lesson.related) {
      assert.ok(group.step > 0 && group.step < lesson.steps.length, `${lesson.id} maps to a real section`);
      assert.ok(!["terms", "trap", "intro", "classify"].includes(lesson.steps[group.step].kind), `${lesson.id} maps questions to a teaching section`);
      for (const id of group.sourceIds) {
        assert.ok(inChapter(id), `${lesson.id} maps ${id}, outside chapter 24`);
        assert.ok(!owner.has(id), `${id} is mapped by both ${owner.get(id)} and ${lesson.id}`);
        owner.set(id, lesson.id);
      }
    }
  }
  const all = Array.from({ length: LAST - FIRST + 1 }, (_, i) => String(FIRST + i));
  assert.equal(all.length, 103);
  assert.deepEqual(all.filter((id) => !owner.has(id)), [], "every chapter 24 question is mapped");
  for (const [id, lessonId] of owner) assert.equal(lessonLinkForSourceId(id)?.lessonId, lessonId, `${id} routes to ${lessonId}`);
  for (const chapter of CHAPTERS.filter((c) => c !== CHAPTER)) {
    for (const lesson of chapter.lessons) {
      for (const id of relatedSourceIds(lesson)) assert.ok(!inChapter(id), `${chapter.id}/${lesson.id} maps chapter 24 question ${id}`);
    }
  }
});

test("flagged statements stay mapped to a section that explains the doubt, and are never scored", () => {
  assert.deepEqual([...FLAGGED].sort(), ["6807", "6813", "6841"]);
  const quoted = new Set(CHAPTER.lessons.flatMap((lesson) => quotedOf(lesson).map((s) => s.sourceId)));
  for (const id of FLAGGED) {
    assert.ok(!quoted.has(id), `${id} is not a practice, review, trap or factor statement`);
    assert.equal(bankRow(id).answer, 1, `${id} keeps its bank answer (VERO)`);
    const link = lessonLinkForSourceId(id);
    assert.ok(link, `${id} is still mapped, so an exam mistake routes to its explanation`);
    const step = lessonById(link.lessonId).steps[link.step];
    assert.match(stepText(step), /یادداشتِ منبع/, `${id}: its section has a source note`);
    assert.match(stepText(step), /برای امتیاز نمی‌آوریم/, `${id}: the note says it is not scored`);
  }
});

test("consumption, CO₂, pollutants and noise are taught as different things", () => {
  const l5 = lessonById("cosa-esce-dallo-scarico");
  const drawing = l5.steps[1];
  assert.ok(drawing.kind === "anatomy" && drawing.scene === "scarico");
  for (const id of ["carburante", "co2", "inquinanti", "rumore"]) assert.ok(drawing.parts.some((p) => p.id === id), `the exhaust drawing shows ${id}`);
  const four = l5.steps[2];
  assert.ok(four.kind === "table");
  for (const label of ["مصرفِ سوخت یا انرژی", "دی‌اکسیدِ کربن", "آلاینده‌های هوا", "صدا"]) assert.ok(four.rows.some((r) => r.label === label), `the table has a row for ${label}`);
  assert.match(four.takeaway, /هیچ کدام صدا یا ذره‌ی لاستیک را صفر نمی‌کند/, "lowering one does not remove the others");
  // Same question about fuel burned: CO₂ follows fuel (A); NOx cannot be told once the catalyst differs too.
  const [co2, nox] = classifySteps(l5)[0].items;
  assert.match(co2.prompt, /دی‌اکسیدِ کربن/);
  assert.equal(co2.answer, 0);
  assert.match(nox.prompt, /NOx/);
  assert.equal(nox.answer, 2);
  assert.match(SRC, /اسموگ و باران اسیدی از آلاینده‌ها، اثرِ گلخانه‌ای از CO₂/, "6806's three effects are traced to different gases");
});

test("advice that differs by vehicle type says so, and no vehicle is called zero impact", () => {
  const types = lessonById("consumi-impianti-tipi-veicolo").steps[2];
  assert.ok(types.kind === "table");
  assert.deepEqual(types.columns, ["بنزینی یا دیزلی (و گازسوز)", "هیبریدی", "برقی"]);
  const particles = types.rows.find((r) => r.it === "usura di pneumatici e freni");
  assert.ok(particles?.values.every((v) => v.startsWith("دارد")), "every type makes tyre and brake particles");
  for (const id of ["consumi-aria-peso-pneumatici", "guida-fluida", "motore-sano", "rumore-del-veicolo"]) {
    assert.match(JSON.stringify(lessonById(id).steps), /برقی/, `${id} says what changes for an electric car`);
  }
  assert.doesNotMatch(SRC, /آلودگیِ صفر دارد|بی‌اثر است\./, "no vehicle is described as without impact");
});

test("safety is never traded for savings", () => {
  const smooth = lessonById("guida-fluida");
  const distance = smooth.steps[1].kind === "table" ? smooth.steps[1].rows.find((r) => r.it === "distanza di sicurezza") : undefined;
  assert.match(distance?.values[0] ?? "", /فاصله را کم نکن/);
  const myths = lessonById("miti-del-motore");
  const stop = myths.steps[2].kind === "table" ? myths.steps[2].rows.find((r) => r.it === "arresto prolungato") : undefined;
  assert.match(stop?.values[1] ?? "", /هرگز در حرکت/, "engine off only when stopped");
  const tyres = lessonById("consumi-aria-peso-pneumatici").steps[3];
  assert.ok(tyres.kind === "table" && tyres.rows.some((r) => /پرباد/.test(r.label) && /نکن/.test(r.values[1])), "no overinflation");
  const glass = lessonById("consumi-impianti-tipi-veicolo").steps[1];
  assert.ok(glass.kind === "table" && glass.rows.some((r) => /بخارگرفته/.test(r.label) && /دید اول است/.test(r.values[0])), "clear glass first");
  // Bank answers this rests on: coasting, revving in neutral and the cold catalyst are all FALSO.
  for (const id of ["6817", "6816", "6794", "6792"]) assert.equal(bankRow(id).answer, 0);
});

test("no savings figures, ideal engine speeds or gear-change points anywhere in the chapter", () => {
  const prose = SRC.replace(/textIt:\s*\n?\s*"[^"]*"/g, "");
  assert.doesNotMatch(prose, /[0-9۰-۹]+\s*(%|٪|درصد)/, "no percentages");
  assert.doesNotMatch(prose, /rpm|giri\/min|دور در دقیقه|\b(bar|psi)\b/, "no engine speeds or tyre pressures");
  assert.doesNotMatch(prose, /کیلومتر بر ساعت|km\/h/, "no speed thresholds");
});

test("every original exercise is labelled; comparisons show two situations, name the difference and allow 'cannot tell'", () => {
  for (const lesson of LESSONS) {
    const steps = classifySteps(lesson);
    assert.equal(steps.length, 1, `${lesson.id} has one exercise`);
    for (const step of steps) {
      assert.match(step.body, /تمرینِ آموزشی است، نه سؤالِ بانک/, `${lesson.id} "${step.title}": marked as an original exercise`);
      for (const item of step.items) assert.ok(item.explain.length > 20, `${lesson.id}: "${item.prompt}" explains its answer`);
    }
  }
  const comparisons = LESSONS.filter((l) => classifySteps(l)[0].items.some((item) => item.pair));
  assert.deepEqual(comparisons.map((l) => l.id), ["consumi-aria-peso-pneumatici", "consumi-impianti-tipi-veicolo", "guida-fluida", "cosa-esce-dallo-scarico", "rumore-del-veicolo", "rumore-guida-clacson"]);
  for (const lesson of comparisons) {
    const step = classifySteps(lesson)[0];
    assert.match(step.body, /در هر جفت فقط یک چیز عوض می‌شود/);
    assert.match(step.body, /عدد یا درصدِ صرفه‌جویی نمی‌دهیم/);
    assert.deepEqual(step.options.map((o) => o.it), ["A", "B", "non si può dire"]);
    for (const item of step.items) {
      assert.ok(item.pair && item.pair.a && item.pair.b && item.pair.differs, `${lesson.id}: "${item.prompt}" has two situations and names the difference`);
      // When two factors change at once, the honest answer is "cannot tell"; and only then.
      assert.equal(/هر دو با هم|همه با هم/.test(item.pair.differs), item.answer === 2, `${lesson.id}: "${item.pair.differs}" matches its answer`);
    }
  }
  const learn = readFileSync("public/js/learn.js", "utf8");
  assert.match(learn, /classify-pair/, "the client draws both situations");
  assert.match(learn, /تفاوت: ' \+ esc\(item\.pair\.differs\)/, "and names the difference after the answer");
});

test("chapter 24 links chapters 1, 11, 12, 13, 16, 17 and 18 instead of repeating them", () => {
  const smooth = lessonById("guida-fluida");
  const myths = lessonById("miti-del-motore");
  const types = lessonById("consumi-impianti-tipi-veicolo");
  const noise = lessonById("rumore-del-veicolo");
  const horn = lessonById("rumore-guida-clacson");
  const bans = lessonById("divieti-su-tutte-le-strade");
  const air = lessonById("consumi-aria-peso-pneumatici");
  assert.ok(stepText(smooth.steps[1]).includes(titleOf(VELOCITA_CHAPTER.lessons, "distanza-casi-particolari")), "L3 links chapter 12 distance");
  assert.ok(stepText(smooth.steps[2]).includes(titleOf(LIMITI_CHAPTER.lessons, "discesa-folle-servofreno")), "L3 links chapter 11 downhill");
  assert.ok(stepText(myths.steps[2]).includes(titleOf(LIMITI_CHAPTER.lessons, "discesa-folle-servofreno")), "L4 links chapter 11 downhill");
  assert.ok(stepText(myths.steps[2]).includes(titleOf(FERMATA_CHAPTER.lessons, "sosta-sicura-portiere")), "L4 links chapter 16 engine-on parking");
  assert.ok(JSON.stringify(types.steps).includes(titleOf(FERMATA_CHAPTER.lessons, "sosta-sicura-portiere")), "L2 links chapter 16");
  assert.ok(stepText(air.steps[3]).includes(titleOf(AUTOSTRADE_CHAPTER.lessons, "guida-con-rimorchio")), "L1 links chapter 17 trailers");
  assert.ok(stepText(noise.steps[1]).includes(titleOf(AUTOSTRADE_CHAPTER.lessons, "guida-con-rimorchio")), "L7 links chapter 17 trailers");
  assert.ok(stepText(noise.steps[1]).includes(titleOf(NORME_CHAPTER.lessons, "norme-carico")), "L7 links chapter 13 load");
  assert.ok(stepText(horn.steps[2]).includes(titleOf(LUCI_CHAPTER.lessons, "abbaglianti-lampeggio")), "L8 links chapter 18 flashing");
  assert.ok(stepText(bans.steps[1]).includes(titleOf(DEFINIZIONI_CHAPTER.lessons, "divieti-sulla-strada")), "L10 links chapter 1 bans");
});

test("chapter 24 uses its glossary headwords", () => {
  for (const word of ["مصرفِ سوخت", "آلودگیِ هوا", "آلودگیِ صوتی", "آلاینده‌ها", "گازِ اگزوز", "دی‌اکسیدِ کربن", "اثرِ گلخانه‌ای", "اسموگ", "باران اسیدی", "صداخفه‌کن", "مبدلِ کاتالیستی", "لوله‌ی اگزوز", "فیلترِ هوا", "فیلترِ کابین", "فیلترِ روغن", "انژکتورها", "کولرِ خودرو", "گردشِ داخلیِ هوا", "باربند", "سان‌روف", "گرم‌کنِ شیشه‌ی عقب", "فشارِ بادِ لاستیک", "دورِ موتور", "خودروی هیبریدی", "خودروی برقی", "ضدیخ", "باتریِ کهنه", "مرکزِ مجازِ اسقاط", "فاضلاب", "زباله‌ی خطرناک", "صدای مزاحم", "محله‌ی مسکونی", "دنده خلاص", "دنده‌ی سنگین", "کارتِ خودرو", "کمپر", "آبادی"]) {
    assert.ok(SRC.includes(word), `uses «${word}»`);
  }
  assert.ok(!SRC.includes("منطقه‌ی مسکونی"), "zona residenziale is «محله‌ی مسکونی», never the chapter 8 gloss of centro abitato");
  const glossary = readFileSync(".agent/rules/glossary.md", "utf8");
  for (const row of ["| consumo (di carburante) | مصرفِ سوخت |", "| inquinamento acustico | آلودگیِ صوتی |", "| silenziatore | صداخفه‌کن |", "| marmitta catalitica, catalizzatore | مبدلِ کاتالیستی |", "| zona residenziale | محله‌ی مسکونی |", "| filtro antipolline | فیلترِ کابین |"]) {
    assert.ok(glossary.includes(row), `glossary has ${row}`);
  }
});

test("every quoted statement matches the pinned bank: text and answer key; no bank images", () => {
  for (let id = FIRST; id <= LAST; id++) assert.equal(bankRow(String(id)).image, null, `${id} has no image`);
  for (const lesson of CHAPTER.lessons) {
    for (const statement of quotedOf(lesson) as { sourceId: string; textIt: string; answer: number; sign?: number }[]) {
      const row = bankRow(statement.sourceId);
      assert.equal(statement.textIt, row.text, `${statement.sourceId} text`);
      assert.equal(statement.answer, row.answer, `${statement.sourceId} answer key`);
      assert.equal(statement.sign, undefined);
    }
  }
});

test("both drawings name every part, and every part is drawn", () => {
  const road = readFileSync("public/js/road.js", "utf8");
  const scenes = LESSONS.flatMap((lesson) => lesson.steps.flatMap((step) => (step.kind === "anatomy" ? [step] : [])));
  assert.deepEqual(scenes.map((s) => s.scene), ["resistenze", "scarico"]);
  for (const step of scenes) {
    const start = road.indexOf(`    ${step.scene}: { h: `);
    assert.ok(start > 0, `${step.scene} is drawn`);
    const block = road.slice(start, road.indexOf("} },", start));
    const drawn = [...block.matchAll(/part\('([a-z0-9]+)'/g)].map((m) => m[1]);
    assert.deepEqual(drawn.sort(), step.parts.map((p) => p.id).sort(), `${step.scene}: every drawn part has text, every part is drawn`);
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
    assert.ok(!FLAGGED.includes(question.sourceId), `review question ${question.sourceId} is flagged`);
    assert.ok(inChapter(question.sourceId), `${question.sourceId} is a chapter 24 question`);
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

test("the client renders every step kind chapter 24 uses", () => {
  const learn = readFileSync("public/js/learn.js", "utf8");
  for (const lesson of CHAPTER.lessons) {
    for (const step of lesson.steps) assert.match(learn, new RegExp(`content\\.kind === '${step.kind}'`), `${step.kind} is rendered`);
  }
});

// ── Flow against real SQL ─────────────────────────────────────────────────────

const BOT_TOKEN = "123456:chapter24-test";
const USER_A = 24001;
const USER_B = 24002;
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

test("a learner who finished every earlier chapter starts chapter 24 unstarted and is sent to lesson 1", async () => {
  const { raw, call } = setup();
  for (const lesson of CHAPTERS.slice(0, INDEX).flatMap((c) => c.lessons)) {
    raw.prepare(`INSERT INTO lesson_progress (user_id, lesson_id, step, updated_at, completed_at) VALUES (1, ?, 99, '2026-11-14 09:00:00', '2026-11-14 09:00:00')`).run(lesson.id);
  }
  const home = await call(USER_A, "GET", "/learn");
  assert.ok(chapterOf(home).lessons.every((l: { state: string }) => l.state === "not_started"), "nothing in chapter 24 is pre-completed");
  assert.equal(chapterOf(home).completed, false);
  assert.ok(home.body.chapters.slice(0, INDEX).every((c: { completed: boolean }) => c.completed), "earlier chapters stay completed");
  assert.equal(todayLesson(home), LESSONS[0].id, "today's path recommends chapter 24 lesson 1");
});

test("after chapter 23 the learner is sent to chapter 24, can resume it, and walks lessons → review → completion", async () => {
  const { raw, call } = setup();
  for (const lesson of PREVIOUS.lessons.slice(0, -1)) await finish(call, USER_A, lesson);
  const prevReview = await finish(call, USER_A, PREVIOUS.lessons.at(-1) as Lesson);
  assert.equal(prevReview.body.chapterCompleted, true);
  assert.equal(prevReview.body.next.lessonId, LESSONS[0].id, "chapter 23's review hands over to chapter 24 lesson 1");
  assert.deepEqual(prevReview.body.next.chapterNumbers, [24]);

  const fifth = await call(USER_A, "GET", `/learn/lessons/${LESSONS[4].id}`);
  assert.deepEqual(fifth.body.position, { index: 5, total: LESSONS.length, review: false });
  assert.deepEqual(fifth.body.chapter.numbers, [24]);
  assert.equal(fifth.body.chapter.reviewedOn, CHAPTER.reviewedOn);
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
