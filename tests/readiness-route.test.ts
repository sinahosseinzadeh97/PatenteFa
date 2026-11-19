/**
 * GET /api/readiness against real SQL: only finished, unassisted 30-question
 * simulations count; the weakest chapter comes from the window's wrong answers.
 */
import assert from "node:assert/strict";
import test from "node:test";
import worker from "../src/index.js";
import { CHAPTERS, relatedSourceIds } from "../src/content/lessons.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

const BOT_TOKEN = "123456:readiness-test";
const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;
type Json = Record<string, any>;

// Questions 1–10 come from WEAK (where every wrong answer lands), 11–30 from OTHER.
const OTHER = CHAPTERS[0];
const WEAK = CHAPTERS[13];
const firstIds = (chapter: (typeof CHAPTERS)[number], n: number) => chapter.lessons.flatMap(relatedSourceIds).slice(0, n);

function setup() {
  const { db, raw } = createSqliteD1();
  const insert = raw.prepare(`INSERT INTO questions (id, source_id, topic_id, text_it, correct_answer, image_url) VALUES (?, ?, NULL, ?, 1, NULL)`);
  [...firstIds(WEAK, 10), ...firstIds(OTHER, 20)].forEach((sourceId, i) => insert.run(i + 1, sourceId, `Affermazione ${i + 1}`));
  const user = raw.prepare(`INSERT INTO users (id, telegram_user_id, first_name, is_approved) VALUES (?, ?, ?, 1)`);
  [1, 2, 3].forEach((id) => user.run(id, 7100 + id, `U${id}`));
  const env = { DB: db, TELEGRAM_BOT_TOKEN: BOT_TOKEN, ALLOWED_TELEGRAM_USER_IDS: "1", PRIMARY_ADMIN_TELEGRAM_USER_ID: "1", LOG_CHANNEL_ID: "-100" } as AppEnv;

  let minute = 0;
  /** A session of 30 answers; the first `wrong` answers (questions 1..wrong) are wrong. */
  function addSession(userId: number, wrong: number, opts: { mode?: string; aiAssisted?: boolean; abandoned?: boolean } = {}) {
    const at = `2026-11-10 ${String(8 + Math.floor(minute / 60)).padStart(2, "0")}:${String(minute++ % 60).padStart(2, "0")}:00`;
    const session = raw
      .prepare(
        `INSERT INTO exam_sessions (user_id, mode, started_at, finished_at, abandoned_at, score, wrong_count, passed, ai_assisted_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(userId, opts.mode ?? "exam", at, opts.abandoned ? null : at, opts.abandoned ? at : null, 30 - wrong, wrong, wrong <= 3 ? 1 : 0, opts.aiAssisted ? at : null);
    const answer = raw.prepare(`INSERT INTO exam_answers (session_id, question_id, position, user_answer, is_correct, answered_at) VALUES (?, ?, ?, ?, ?, ?)`);
    for (let q = 1; q <= 30; q++) answer.run(session.lastInsertRowid, q, q, 1, q <= wrong ? 0 : 1, at);
  }

  async function readiness(userId: number) {
    const response = await worker.fetch(
      new Request("https://example.test/api/readiness", { headers: { "X-Telegram-InitData": signedInitData(BOT_TOKEN, 7100 + userId) } }),
      env,
      ctx
    );
    return { status: response.status, body: (await response.json()) as Json };
  }
  return { addSession, readiness };
}

test("no simulations: the light is off and asks for three", async () => {
  const { readiness } = setup();
  const res = await readiness(1);
  assert.equal(res.status, 200);
  assert.equal(res.body.state, "off");
  assert.equal(res.body.display, null);
  assert.equal(res.body.toNext.simulationsNeeded, 3);
  assert.equal(res.body.weakestChapter, null);
});

test("red: counts only unassisted finished simulations and names the weakest chapter", async () => {
  const { addSession, readiness } = setup();
  for (let i = 0; i < 3; i++) addSession(1, 10);
  addSession(1, 0, { aiAssisted: true });
  addSession(1, 0, { mode: "topic_practice" });
  addSession(1, 0, { abandoned: true });
  const res = await readiness(1);
  assert.equal(res.body.state, "red");
  assert.equal(res.body.simulations, 3, "assisted, practice and abandoned sessions are ignored");
  assert.equal(res.body.wrong, 30);
  assert.equal(res.body.weakestChapter?.number, WEAK.numbers[0]);
  assert.equal(res.body.weakestChapter?.wrong, 30);
  assert.equal(res.body.weakestChapter?.reviewLessonId, WEAK.lessons.find((l) => l.review)?.id);
  assert.equal(res.body.weakestChapter?.titleFa, WEAK.titleFa);
});

test("green: five passes, no chapter hint, and the previous state without the newest simulation", async () => {
  const { addSession, readiness } = setup();
  addSession(2, 10);
  for (let i = 0; i < 5; i++) addSession(2, 1);
  const res = await readiness(2);
  assert.equal(res.body.state, "green");
  assert.equal(res.body.weakestChapter, null);
  assert.deepEqual(res.body.display, { value: 95, over: true });
  // Without the newest: four passes plus the 10-wrong one = 14 wrong, one fail.
  assert.equal(res.body.previousState, "amber");
});

test("users never see each other's simulations", async () => {
  const { addSession, readiness } = setup();
  for (let i = 0; i < 5; i++) addSession(2, 0);
  assert.equal((await readiness(3)).body.state, "off");
});
