/**
 * Exam mode grades at the end: selections are provisional until finish, nothing
 * reveals correctness before then, and AI help is an opt-in that marks the exam
 * as assisted (and keeps it out of the pass rate). Practice and review modes
 * keep immediate feedback. Runs the real routes against real SQL.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import worker from "../src/index.js";
import { getAdminOverviewStats } from "../src/db/queries.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

const BOT_TOKEN = "123456:exam-test";
const USER_A = 6001;
const USER_B = 6002;
const QUESTION_COUNT = 40;
const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;

type Json = Record<string, any>;

function setup() {
  const { db, raw } = createSqliteD1();
  raw.prepare(`INSERT INTO topics (id, name_it, name_fa, sort_order) VALUES (1, 'Segnali', 'علائم', 1)`).run();
  const insert = raw.prepare(
    `INSERT INTO questions (id, source_id, topic_id, text_it, correct_answer, image_url) VALUES (?, ?, 1, ?, ?, NULL)`
  );
  for (let id = 1; id <= QUESTION_COUNT; id++) insert.run(id, String(id), `Affermazione numero ${id}`, id % 2);
  const user = raw.prepare(`INSERT INTO users (id, telegram_user_id, first_name, is_approved) VALUES (?, ?, ?, 1)`);
  user.run(1, USER_A, "A");
  user.run(2, USER_B, "B");
  const env = {
    DB: db,
    TELEGRAM_BOT_TOKEN: BOT_TOKEN,
    ALLOWED_TELEGRAM_USER_IDS: "1",
    PRIMARY_ADMIN_TELEGRAM_USER_ID: "1",
    LOG_CHANNEL_ID: "-100",
  } as AppEnv;

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
    return { status: response.status, body: (await response.json()) as Json };
  }

  const correctOf = (questionId: number) => questionId % 2;
  const wrongOf = (questionId: number) => 1 - (questionId % 2);

  async function startExam(mode: "exam" | "topic_practice" | "review" = "exam") {
    const res = await call(USER_A, "POST", "/exam/start", { mode });
    assert.equal(res.status, 200);
    return { sessionId: res.body.sessionId as number, ids: res.body.questions.map((q: Json) => q.questionId) as number[], body: res.body };
  }

  /** Cached translation so the translate route answers without OpenAI. */
  function cacheTranslation(questionId: number) {
    raw
      .prepare(`INSERT OR REPLACE INTO translations_cache (question_id, lang, translated_text, explanation) VALUES (?, 'fa', ?, ?)`)
      .run(questionId, "ترجمه‌ی کامل این جمله", "توضیح پاسخ");
  }

  const backdate = (sessionId: number, minutes: number) =>
    raw.prepare(`UPDATE exam_sessions SET started_at = datetime('now', ?) WHERE id = ?`).run(`-${minutes} minutes`, sessionId);

  return { db, raw, call, correctOf, wrongOf, startExam, cacheTranslation, backdate };
}

// ── Deferred answers ─────────────────────────────────────────────────────────

test("exam start advertises deferred feedback with AI help off; practice stays immediate", async () => {
  const { startExam } = setup();
  const exam = await startExam("exam");
  assert.equal(exam.body.feedback, "deferred");
  assert.equal(exam.body.aiEnabled, false);
  const practice = await startExam("topic_practice");
  assert.equal(practice.body.feedback, "immediate");
});

test("an exam-mode answer is saved without revealing anything about it", async () => {
  const { call, startExam } = setup();
  const { sessionId, ids } = await startExam();
  const res = await call(USER_A, "POST", `/exam/${sessionId}/answer`, { questionId: ids[0], answer: 1 });
  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { saved: true, questionId: ids[0], answer: 1 });

  const outsider = await call(USER_A, "POST", `/exam/${sessionId}/answer`, {
    questionId: [...Array(QUESTION_COUNT).keys()].map((i) => i + 1).find((id) => !ids.includes(id)),
    answer: 1,
  });
  assert.equal(outsider.status, 404);
});

test("VERO, move on, come back and choose FALSO: the final selection is what gets scored", async () => {
  const { call, startExam, correctOf } = setup();
  const { sessionId, ids } = await startExam();
  const [q1, q2] = ids;
  assert.equal((await call(USER_A, "POST", `/exam/${sessionId}/answer`, { questionId: q1, answer: 1 })).status, 200);
  assert.equal((await call(USER_A, "POST", `/exam/${sessionId}/answer`, { questionId: q2, answer: 1 })).status, 200);
  assert.equal((await call(USER_A, "POST", `/exam/${sessionId}/answer`, { questionId: q1, answer: 0 })).status, 200);

  const finish = await call(USER_A, "POST", `/exam/${sessionId}/finish`, { durationSeconds: 60 });
  assert.equal(finish.status, 200);
  const first = finish.body.answers.find((a: Json) => a.questionId === q1);
  assert.equal(first.userAnswer, 0);
  assert.equal(first.isCorrect, correctOf(q1) === 0);
  const expectedScore = [correctOf(q1) === 0, correctOf(q2) === 1].filter(Boolean).length;
  assert.equal(finish.body.score, expectedScore);
});

test("while the exam is open, no stats, profile or tutor route can see a selection", async () => {
  const { raw, call, startExam, wrongOf } = setup();
  const before = { stats: await call(USER_A, "GET", "/stats"), profile: await call(USER_A, "GET", "/profile") };
  const { sessionId, ids } = await startExam();
  for (const id of ids.slice(0, 5)) await call(USER_A, "POST", `/exam/${sessionId}/answer`, { questionId: id, answer: wrongOf(id) });

  const rows = raw.prepare(`SELECT user_answer, is_correct, selected_answer FROM exam_answers WHERE session_id = ? AND selected_answer IS NOT NULL`).all(sessionId);
  assert.equal(rows.length, 5);
  for (const row of rows) assert.deepEqual([row.user_answer, row.is_correct], [null, null]);

  const stats = await call(USER_A, "GET", "/stats");
  const profile = await call(USER_A, "GET", "/profile");
  assert.deepEqual(stats.body.topicAccuracy, before.stats.body.topicAccuracy);
  assert.deepEqual(profile.body.topicAccuracy, before.profile.body.topicAccuracy);
  assert.equal(profile.body.xp, before.profile.body.xp);

  const tutor = await call(USER_A, "POST", "/tutor/explain-wrong", { sessionId });
  assert.equal(tutor.status, 200);
  assert.equal(tutor.body.wrongCount, 0);
  assert.deepEqual(tutor.body.questions, []);
});

test("the selections sent with finish override stale saves; malformed ones are rejected", async () => {
  const { call, startExam, correctOf, wrongOf } = setup();
  const { sessionId, ids } = await startExam();
  const [q1, q2] = ids;
  await call(USER_A, "POST", `/exam/${sessionId}/answer`, { questionId: q1, answer: wrongOf(q1) });

  for (const answers of [[], { abc: 1 }, { [q1]: 2 }, "x"]) {
    const bad = await call(USER_A, "POST", `/exam/${sessionId}/finish`, { durationSeconds: 1, answers });
    assert.equal(bad.status, 400, JSON.stringify(answers));
  }

  const finish = await call(USER_A, "POST", `/exam/${sessionId}/finish`, {
    durationSeconds: 1,
    answers: { [q1]: correctOf(q1), [q2]: correctOf(q2), 999999: 1 },
  });
  assert.equal(finish.status, 200);
  assert.equal(finish.body.score, 2);
  assert.equal(finish.body.answers.find((a: Json) => a.questionId === q1).userAnswer, correctOf(q1));
});

test("finish can be retried safely, and a finished or abandoned exam rejects changes", async () => {
  const { raw, call, startExam, wrongOf } = setup();
  const { sessionId, ids } = await startExam();
  await call(USER_A, "POST", `/exam/${sessionId}/answer`, { questionId: ids[0], answer: wrongOf(ids[0]) });

  const first = await call(USER_A, "POST", `/exam/${sessionId}/finish`, { durationSeconds: 42 });
  const queueAfterFirst = raw.prepare(`SELECT question_id, wrong_count FROM review_queue ORDER BY question_id`).all();
  const second = await call(USER_A, "POST", `/exam/${sessionId}/finish`, { durationSeconds: 99 });
  assert.equal(second.status, 200);
  assert.deepEqual(second.body, first.body);
  assert.deepEqual(raw.prepare(`SELECT question_id, wrong_count FROM review_queue ORDER BY question_id`).all(), queueAfterFirst);

  assert.equal((await call(USER_A, "POST", `/exam/${sessionId}/answer`, { questionId: ids[0], answer: 1 })).status, 400);

  const other = await startExam();
  assert.equal((await call(USER_B, "POST", `/exam/${other.sessionId}/answer`, { questionId: other.ids[0], answer: 1 })).status, 404);
  assert.equal((await call(USER_B, "POST", `/exam/${other.sessionId}/assistance`, { enabled: true })).status, 404);
  assert.equal((await call(USER_B, "POST", `/exam/${other.sessionId}/finish`, {})).status, 404);
  assert.equal((await call(USER_A, "POST", `/exam/${other.sessionId}/abandon`)).status, 200);
  assert.equal((await call(USER_A, "POST", `/exam/${other.sessionId}/answer`, { questionId: other.ids[0], answer: 1 })).status, 400);
});

test("unanswered questions count as wrong: 3 wrong passes, 4 wrong fails", async () => {
  const { call, startExam, correctOf } = setup();
  for (const [skipped, passed] of [[3, true], [4, false]] as const) {
    const { sessionId, ids } = await startExam();
    assert.equal(ids.length, 30);
    const answers = Object.fromEntries(ids.slice(skipped).map((id) => [id, correctOf(id)]));
    const finish = await call(USER_A, "POST", `/exam/${sessionId}/finish`, { durationSeconds: 1, answers });
    assert.equal(finish.body.wrongCount, skipped);
    assert.equal(finish.body.passed, passed);
    assert.equal(finish.body.answers.filter((a: Json) => a.userAnswer === null).length, skipped);
  }
});

// ── Optional AI help ─────────────────────────────────────────────────────────

test("AI help starts off: all three AI routes refuse a question in the open exam", async () => {
  const { call, startExam, cacheTranslation } = setup();
  const { ids } = await startExam();
  cacheTranslation(ids[0]);
  for (const path of [`/translate/${ids[0]}`, `/translate/${ids[0]}/theory`, `/translate/${ids[0]}/grammar`]) {
    const res = await call(USER_A, "POST", path);
    assert.equal(res.status, 403, path);
    assert.deepEqual(res.body, { error: "AI assistance is off for this exam", aiLocked: true });
  }
});

test("switching AI help on unlocks it and marks the exam assisted for good", async () => {
  const { raw, call, startExam, cacheTranslation, correctOf } = setup();
  const { sessionId, ids } = await startExam();
  cacheTranslation(ids[0]);

  const on = await call(USER_A, "POST", `/exam/${sessionId}/assistance`, { enabled: true });
  assert.deepEqual([on.status, on.body], [200, { enabled: true, assisted: true }]);
  const translated = await call(USER_A, "POST", `/translate/${ids[0]}`);
  assert.equal(translated.status, 200);
  assert.equal(translated.body.verdictVero, correctOf(ids[0]) === 1);

  const off = await call(USER_A, "POST", `/exam/${sessionId}/assistance`, { enabled: false });
  assert.deepEqual([off.status, off.body], [200, { enabled: false, assisted: true }]);
  assert.equal((await call(USER_A, "POST", `/translate/${ids[0]}`)).status, 403);
  const row = raw.prepare(`SELECT ai_enabled, ai_assisted_at FROM exam_sessions WHERE id = ?`).get(sessionId);
  assert.equal(row?.ai_enabled, 0);
  assert.ok(row?.ai_assisted_at);

  const finish = await call(USER_A, "POST", `/exam/${sessionId}/finish`, { durationSeconds: 1 });
  assert.equal(finish.body.aiAssisted, true);
  // After finishing, the results screen can use AI help for the same questions.
  assert.equal((await call(USER_A, "POST", `/translate/${ids[0]}`)).status, 200);
});

test("an exam that never switched AI on is reported as unassisted", async () => {
  const { call, startExam } = setup();
  const { sessionId } = await startExam();
  const finish = await call(USER_A, "POST", `/exam/${sessionId}/finish`, { durationSeconds: 1 });
  assert.equal(finish.body.aiAssisted, false);
});

test("the AI toggle is only for open exam-mode sessions and needs a boolean", async () => {
  const { call, startExam, backdate } = setup();
  const practice = await startExam("topic_practice");
  assert.equal((await call(USER_A, "POST", `/exam/${practice.sessionId}/assistance`, { enabled: true })).status, 400);

  const exam = await startExam();
  assert.equal((await call(USER_A, "POST", `/exam/${exam.sessionId}/assistance`, { enabled: "yes" })).status, 400);
  backdate(exam.sessionId, 31);
  assert.equal((await call(USER_A, "POST", `/exam/${exam.sessionId}/assistance`, { enabled: true })).status, 409);

  const finished = await startExam();
  await call(USER_A, "POST", `/exam/${finished.sessionId}/finish`, { durationSeconds: 1 });
  assert.equal((await call(USER_A, "POST", `/exam/${finished.sessionId}/assistance`, { enabled: true })).status, 409);

  const abandoned = await startExam();
  await call(USER_A, "POST", `/exam/${abandoned.sessionId}/abandon`);
  assert.equal((await call(USER_A, "POST", `/exam/${abandoned.sessionId}/assistance`, { enabled: true })).status, 409);
});

// ── Resume ───────────────────────────────────────────────────────────────────

test("resume returns selections and timer but never correctness", async () => {
  const { call, startExam, backdate } = setup();
  assert.deepEqual((await call(USER_A, "GET", "/exam/active")).body, { session: null });

  const { sessionId, ids } = await startExam();
  await call(USER_A, "POST", `/exam/${sessionId}/answer`, { questionId: ids[2], answer: 0 });
  await call(USER_A, "POST", `/exam/${sessionId}/flag`, { questionId: ids[3], flagged: true });

  const active = await call(USER_A, "GET", "/exam/active");
  assert.equal(active.status, 200);
  const session = active.body.session;
  assert.equal(session.sessionId, sessionId);
  assert.deepEqual(session.selections, { [ids[2]]: 0 });
  assert.deepEqual(session.flags, [ids[3]]);
  assert.deepEqual([session.aiEnabled, session.aiAssisted], [false, false]);
  assert.ok(session.secondsLeft > 1190 && session.secondsLeft <= 1200);
  assert.deepEqual(session.questions.map((q: Json) => q.questionId), ids);
  assert.doesNotMatch(JSON.stringify(active.body), /correct|isCorrect|is_correct|userAnswer|user_answer|verdict/i);

  backdate(sessionId, 25);
  assert.equal((await call(USER_A, "GET", "/exam/active")).body.session.secondsLeft, 0);
  backdate(sessionId, 31);
  assert.deepEqual((await call(USER_A, "GET", "/exam/active")).body, { session: null });

  const finished = await startExam();
  await call(USER_A, "POST", `/exam/${finished.sessionId}/finish`, { durationSeconds: 1 });
  assert.deepEqual((await call(USER_A, "GET", "/exam/active")).body, { session: null });

  await startExam("topic_practice");
  assert.deepEqual((await call(USER_A, "GET", "/exam/active")).body, { session: null });
});

// ── Practice and review keep immediate feedback ──────────────────────────────

test("topic practice still reveals the result immediately and locks the first answer", async () => {
  const { call, startExam, cacheTranslation, correctOf, wrongOf } = setup();
  const { sessionId, ids } = await startExam("topic_practice");
  const answer = await call(USER_A, "POST", `/exam/${sessionId}/answer`, { questionId: ids[0], answer: wrongOf(ids[0]) });
  assert.equal(answer.status, 200);
  assert.equal(answer.body.isCorrect, false);
  assert.equal(answer.body.correctAnswer, correctOf(ids[0]));

  const changed = await call(USER_A, "POST", `/exam/${sessionId}/answer`, { questionId: ids[0], answer: correctOf(ids[0]) });
  assert.equal(changed.status, 409);

  cacheTranslation(ids[1]);
  assert.equal((await call(USER_A, "POST", `/translate/${ids[1]}`)).status, 200);
});

// ── Pass rate ────────────────────────────────────────────────────────────────

test("assisted exams are excluded from the pass rate", async () => {
  const { db, call, startExam, correctOf } = setup();
  const allCorrect = (ids: number[]) => Object.fromEntries(ids.map((id) => [id, correctOf(id)]));

  const passed = await startExam();
  await call(USER_A, "POST", `/exam/${passed.sessionId}/finish`, { durationSeconds: 1, answers: allCorrect(passed.ids) });

  const assisted = await startExam();
  await call(USER_A, "POST", `/exam/${assisted.sessionId}/assistance`, { enabled: true });
  const assistedFinish = await call(USER_A, "POST", `/exam/${assisted.sessionId}/finish`, { durationSeconds: 1, answers: allCorrect(assisted.ids) });
  assert.equal(assistedFinish.body.passed, true);

  const failed = await startExam();
  await call(USER_A, "POST", `/exam/${failed.sessionId}/finish`, { durationSeconds: 1 });

  const stats = await call(USER_A, "GET", "/stats");
  assert.equal(stats.body.passRate, 50);
  assert.equal(stats.body.totalSessions, 2);
  assert.ok(stats.body.recentSessions.some((s: Json) => s.aiAssisted === true));

  const overview = await getAdminOverviewStats(db);
  assert.equal(overview.totalExams, 3);
  assert.equal(overview.overallPassRate, 50);
});

// ── Migration ────────────────────────────────────────────────────────────────

test("migration 0016 adds the columns and retires sessions that were open at deploy", () => {
  const { raw } = setup();
  raw.exec(`ALTER TABLE exam_answers DROP COLUMN selected_answer;
            ALTER TABLE exam_sessions DROP COLUMN ai_enabled;
            ALTER TABLE exam_sessions DROP COLUMN ai_assisted_at;`);
  raw.prepare(`INSERT INTO exam_sessions (id, user_id, mode) VALUES (900, 1, 'exam')`).run();
  raw.prepare(`INSERT INTO exam_sessions (id, user_id, mode, finished_at) VALUES (901, 1, 'exam', datetime('now'))`).run();

  raw.exec(readFileSync("migrations/0016_exam_deferred_answers.sql", "utf8"));

  const session = raw.prepare(`SELECT abandoned_at, ai_enabled, ai_assisted_at FROM exam_sessions WHERE id = 900`).get();
  assert.ok(session?.abandoned_at);
  assert.deepEqual([session?.ai_enabled, session?.ai_assisted_at], [0, null]);
  assert.equal(raw.prepare(`SELECT abandoned_at FROM exam_sessions WHERE id = 901`).get()?.abandoned_at, null);
  assert.ok(raw.prepare(`SELECT selected_answer FROM exam_answers LIMIT 1`).columns().length === 1);
});
