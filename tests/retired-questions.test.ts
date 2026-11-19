/**
 * Questions the ministry removed from the exam database must never reach a
 * learner: not in simulations, review, topic practice, lesson practice, reels,
 * the "needs more work" list, or the bank-coverage total. Runs the real SQL.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { CHAPTERS } from "../src/content/lessons.js";
import { RETIRED_QUESTIONS } from "../src/content/retired-questions.js";
import {
  drawExamQuestions,
  drawQuestionsFromTopics,
  getAllTopicsWithStats,
  getBankCoverage,
  getDueReviewQuestions,
  getNeedsMoreWork,
  getPendingReviewCount,
  getQuestionCount,
  getReelsFeedItems,
} from "../src/db/queries.js";
import { getDueReviewSourceIds, getPracticeCandidates, getQuestionsBySourceIds } from "../src/db/learning-queries.js";
import { createSqliteD1 } from "./helpers/sqlite-d1.js";

type Entry = [string, number, string | null, number, number];
const BANK = (JSON.parse(readFileSync("src/content/question-provenance.json", "utf8")) as { entries: Entry[] }).entries;

// Statements as printed in NECA's "Quiz eliminati 2025" list (Legge 177/2024), keyed by ministry code.
const MINISTRY_TEXT: Record<string, string> = {
  "29007/V01": "I bambini di altezza inferiore a 1,50 metri, quando sono trasportati su una autovettura, devono essere trattenuti da sistemi di ritenuta omologati, adeguati alla loro statura e peso",
  "30013/V06": "La revisione della patente di guida può essere disposta a seguito di guida in stato di ebbrezza o sotto l’effetto di sostanze stupefacenti",
  "30015/V05": "La sospensione della patente è disposta quando il conducente guida sotto l’effetto di sostanze stupefacenti",
  "30017/V10": "Guidare sotto l’effetto di sostanze stupefacenti comporta una perdita di punti sulla patente",
  "30009/F04": "La patente di categoria B, per i primi tre anni dal suo conseguimento, non consente la guida di autovetture aventi una potenza specifica, riferita alla tara, superiore a 55 kW/t o una potenza massima di 70 kW",
  "30015/F05": "La sospensione della patente può essere disposta quando si superano di 20 km/h i limiti massimi di velocità",
  "23018/V01": "I veicoli senza motore devono circolare il più possibile vicino al margine destro della carreggiata",
  "27008/V01": "Sulle autostrade e strade extraurbane principali è vietata la circolazione di velocipedi, ciclomotori, motocicli di cilindrata inferiore a 150 cm3",
  "33006/V02": "L’assicurazione obbligatoria RCA copre i danni subiti da persone e/o cose che si trovano in aree pubbliche o aperte al pubblico",
  "30001/V01": "E’ vietato utilizzare un autoveicolo sulle strade pubbliche quando il veicolo non è coperto dall’assicurazione per la responsabilità civile",
  "33008/V01": "È vietato utilizzare il veicolo privo di copertura assicurativa sulle strade pubbliche",
  "33008/V02": "Quando l’assicurazione per la responsabilità civile auto è scaduta di validità si incorre in una sanzione se si circola o si lascia in sosta il veicolo sulle strade pubbliche",
  "14031/V05": "Il segnale raffigurato non consente la circolazione dei veicoli a motore",
  "14032/V04": "Il segnale raffigurato non consente la circolazione dei veicoli a motore",
  "14029/V02": "Il segnale raffigurato è posto in corrispondenza di una corsia riservata alle biciclette",
  "14031/V02": "Il segnale raffigurato è posto in corrispondenza dell’inizio di una corsia riservata alle biciclette accanto ad un percorso pedonale",
  "14030/V03": "Il segnale raffigurato è posto in corrispondenza della fine di una corsia riservata ai ciclisti",
  "30009/V09": "La patente di categoria B abilita a condurre gli autocarri di massa massima autorizzata non superiore a 3.500 chilogrammi anche se trainanti un rimorchio leggero (massa fino a 750 chilogrammi)",
  "27012/V04": "E’ consentito circolare sulle corsie per la sosta di emergenza delle autostrade e strade extraurbane principali per arrestarsi per avaria del veicolo",
  "13021/V07": "In presenza del segnale raffigurato è consentito il transito ai quadricicli a motore",
  "13021/F04": "Il segnale raffigurato vieta il transito ai quadricicli a motore",
};

// Accents, apostrophe styles and punctuation differ between the PDF and the bank.
const norm = (s: string) => s.normalize("NFD").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

test("every retired entry is the exact bank statement the ministry removed", () => {
  assert.equal(RETIRED_QUESTIONS.length, Object.keys(MINISTRY_TEXT).length);
  assert.equal(new Set(RETIRED_QUESTIONS.map((q) => q.sourceId)).size, RETIRED_QUESTIONS.length, "no duplicate sourceId");
  for (const q of RETIRED_QUESTIONS) {
    const entry = BANK[Number(q.sourceId) - 1];
    assert.ok(entry, `#${q.sourceId} exists in the bank`);
    assert.equal(norm(entry[0]), norm(MINISTRY_TEXT[q.code]), `#${q.sourceId} text matches ${q.code}`);
    // The letter after the slash is the ministry's answer: V = VERO, F = FALSO.
    assert.equal(entry[1], q.code.includes("/F") ? 0 : 1, `#${q.sourceId} answer matches ${q.code}`);
    assert.equal(entry[2], q.figure ? `${q.figure}.png` : null, `#${q.sourceId} image matches ${q.code}`);
  }
});

test("no lesson quotes a retired question (related pools may map them: the DB filter skips those)", () => {
  for (const chapter of CHAPTERS) {
    for (const lesson of chapter.lessons) {
      const quoted = JSON.stringify({ steps: lesson.steps, practice: lesson.practice });
      for (const { sourceId } of RETIRED_QUESTIONS) {
        assert.ok(!quoted.includes(`"sourceId":"${sourceId}"`), `${lesson.id} quotes retired #${sourceId}`);
      }
    }
  }
});

const RETIRED = ["5529", "6295", "2058"]; // three real retired source_ids, one with a sign image
const ACTIVE_COUNT = 40;

function setup() {
  const { db, raw } = createSqliteD1();
  raw.prepare(`INSERT INTO topics (id, name_it, name_fa, sort_order) VALUES (1, 'Segnali', 'علائم', 1)`).run();
  const insert = raw.prepare(
    `INSERT INTO questions (id, source_id, topic_id, text_it, correct_answer, image_url) VALUES (?, ?, 1, ?, 1, NULL)`
  );
  for (let id = 1; id <= ACTIVE_COUNT; id++) insert.run(id, String(id), `Affermazione ${id}`);
  RETIRED.forEach((sourceId, i) => insert.run(ACTIVE_COUNT + 1 + i, sourceId, `Ritirata ${sourceId}`));
  raw.prepare(`INSERT INTO users (id, telegram_user_id, first_name, is_approved) VALUES (1, 7001, 'A', 1)`).run();
  // The user already missed every retired question: they sit due in review...
  const review = raw.prepare(`INSERT INTO review_queue (user_id, question_id, next_review_at) VALUES (1, ?, NULL)`);
  for (let i = 0; i < RETIRED.length; i++) review.run(ACTIVE_COUNT + 1 + i);
  review.run(1);
  // ...and got each wrong twice, which qualifies them for "needs more work".
  raw.prepare(`INSERT INTO exam_sessions (id, user_id, mode, finished_at) VALUES (1, 1, 'exam', datetime('now'))`).run();
  const answer = raw.prepare(
    `INSERT INTO exam_answers (session_id, question_id, user_answer, is_correct, answered_at) VALUES (1, ?, 0, 0, '2020-01-01 00:00:00')`
  );
  for (let i = 0; i < RETIRED.length; i++) {
    answer.run(ACTIVE_COUNT + 1 + i);
    answer.run(ACTIVE_COUNT + 1 + i);
  }
  answer.run(1);
  answer.run(1);
  return db;
}

const isRetired = (q: { source_id?: string | null; id?: number; question_id?: number; questionId?: number }) =>
  (q.source_id != null && RETIRED.includes(q.source_id)) ||
  [q.id, q.question_id, q.questionId].some((id) => id !== undefined && id > ACTIVE_COUNT);

test("simulations, review and practice never serve a retired question", async () => {
  const db = setup();
  for (let run = 0; run < 5; run++) {
    const exam = await drawExamQuestions(db, 1, 30);
    assert.equal(exam.length, 30);
    assert.ok(!exam.some(isRetired), "exam draw");
  }
  assert.deepEqual((await getDueReviewQuestions(db, 1)).map((q) => q.id), [1], "due review");
  assert.equal(await getPendingReviewCount(db, 1), 1, "pending review count");
  assert.deepEqual(await getDueReviewSourceIds(db, 1), ["1"], "lesson review count");
  assert.ok(!(await drawQuestionsFromTopics(db, 1, [1], 50)).some(isRetired), "topic practice");
  assert.ok(!(await getReelsFeedItems(db, 1, 50)).some(isRetired), "reels");
  const pool = ["1", "2", ...RETIRED];
  assert.deepEqual((await getPracticeCandidates(db, 1, pool)).map((q) => q.source_id).sort(), ["1", "2"], "lesson practice pool");
  assert.deepEqual((await getQuestionsBySourceIds(db, pool)).map((q) => q.source_id).sort(), ["1", "2"], "lesson quoted practice");
  assert.deepEqual((await getNeedsMoreWork(db, 1)).map((q) => q.questionId), [1], "needs more work");
});

test("bank size and coverage count only questions still in the exam", async () => {
  const db = setup();
  assert.equal(await getQuestionCount(db), ACTIVE_COUNT);
  const coverage = await getBankCoverage(db, 1);
  assert.equal(coverage.total, ACTIVE_COUNT);
  assert.equal(coverage.seen, 1, "answers to retired questions do not count as coverage");
  const [topic] = await getAllTopicsWithStats(db, 1);
  assert.equal(topic.question_count, ACTIVE_COUNT, "the topic list counts only active questions");
  assert.equal(topic.answered_count, 1);
});
