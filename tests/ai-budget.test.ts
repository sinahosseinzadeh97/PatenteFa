/**
 * Per-user OpenAI budget. Every OpenAI call is already logged in
 * api_usage_logs; once a user has made AI_CALLS_PER_HOUR calls in the last
 * hour or AI_CALLS_PER_DAY in the last day, the next call is refused with 429
 * before anything is sent to OpenAI.
 */
import assert from "node:assert/strict";
import test from "node:test";

import worker from "../src/index.js";
import { AI_CALLS_PER_DAY, AI_CALLS_PER_HOUR } from "../src/lib/ai-budget.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

const BOT_TOKEN = "123456:test-token";
const ME = 1001;
const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;
const realFetch = globalThis.fetch;
let openaiCalls = 0;

test.beforeEach(() => {
  openaiCalls = 0;
  globalThis.fetch = (async (url: unknown) => {
    assert.match(String(url), /api\.openai\.com/, "only OpenAI is called in these tests");
    openaiCalls++;
    const content = JSON.stringify({ grammar_analysis: "x".repeat(20), vocab_suggestions: [] });
    return new Response(JSON.stringify({ choices: [{ message: { content } }], usage: { prompt_tokens: 10, completion_tokens: 5 } }));
  }) as typeof fetch;
});
test.afterEach(() => { globalThis.fetch = realFetch; });

function setup() {
  const { db, raw } = createSqliteD1();
  const user = raw.prepare(`INSERT INTO users (id, telegram_user_id, first_name, is_approved) VALUES (?, ?, ?, 1)`);
  user.run(1, ME, "Me");
  user.run(2, 1002, "Other");
  raw.prepare(`INSERT INTO questions (id, source_id, text_it, correct_answer) VALUES (1, '1', 'Il conducente deve rallentare.', 1)`).run();
  const env = { DB: db, TELEGRAM_BOT_TOKEN: BOT_TOKEN, OPENAI_API_KEY: "test", ALLOWED_TELEGRAM_USER_IDS: "9", PRIMARY_ADMIN_TELEGRAM_USER_ID: "9", LOG_CHANNEL_ID: "-100" } as AppEnv;

  /** Pretend `userId` already made `n` OpenAI calls at `when` (an SQLite datetime modifier). */
  function logCalls(userId: number, n: number, when: string) {
    const insert = raw.prepare(`INSERT INTO api_usage_logs (user_id, action, created_at) VALUES (?, 'test', datetime('now', ?))`);
    for (let i = 0; i < n; i++) insert.run(userId, when);
  }
  async function call(path: string, body: unknown) {
    const response = await worker.fetch(
      new Request(`https://example.test/api${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Telegram-InitData": signedInitData(BOT_TOKEN, ME) },
        body: typeof body === "string" ? body : JSON.stringify(body),
      }),
      env,
      ctx
    );
    return { status: response.status, body: (await response.json()) as Record<string, unknown> };
  }
  const myLoggedCalls = () => (raw.prepare(`SELECT COUNT(*) AS n FROM api_usage_logs WHERE user_id = 1`).get() as { n: number }).n;
  return { logCalls, call, myLoggedCalls };
}

test("a vocab suggestion under budget reaches OpenAI and is logged against the user", async () => {
  const { call, myLoggedCalls } = setup();
  const res = await call("/vocab/suggest", { termIt: "sorpasso" });
  assert.equal(res.status, 200);
  assert.equal(openaiCalls, 1);
  assert.equal(myLoggedCalls(), 1, "the call now counts toward this user's budget");
});

test("the hourly limit refuses the next call with 429 before OpenAI is called", async () => {
  const { logCalls, call } = setup();
  logCalls(1, AI_CALLS_PER_HOUR, "-10 minutes");
  const res = await call("/vocab/suggest", { termIt: "sorpasso" });
  assert.equal(res.status, 429);
  assert.equal(res.body.aiBudgetExceeded, true);
  assert.equal(typeof res.body.error, "string");
  assert.equal(openaiCalls, 0);
});

test("the daily limit counts calls older than an hour", async () => {
  const { logCalls, call } = setup();
  logCalls(1, AI_CALLS_PER_DAY, "-3 hours");
  assert.equal((await call("/vocab/suggest", { termIt: "sorpasso" })).status, 429);
  assert.equal(openaiCalls, 0);
});

test("calls older than a day and other users' calls do not count", async () => {
  const { logCalls, call } = setup();
  logCalls(1, AI_CALLS_PER_DAY, "-25 hours");
  logCalls(2, AI_CALLS_PER_DAY, "-10 minutes");
  assert.equal((await call("/vocab/suggest", { termIt: "sorpasso" })).status, 200);
  assert.equal(openaiCalls, 1);
});

test("the grammar tab is limited the same way on a cache miss", async () => {
  const { logCalls, call } = setup();
  logCalls(1, AI_CALLS_PER_HOUR, "-1 minutes");
  const res = await call("/translate/1/grammar", {});
  assert.equal(res.status, 429);
  assert.equal(res.body.aiBudgetExceeded, true);
  assert.equal(openaiCalls, 0);
});

test("an oversized or malformed vocab term is rejected without calling OpenAI", async () => {
  const { call } = setup();
  assert.equal((await call("/vocab/suggest", { termIt: "a".repeat(81) })).status, 400);
  assert.equal((await call("/vocab/suggest", "{not json")).status, 400);
  assert.equal(openaiCalls, 0);
});
