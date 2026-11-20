/**
 * POST /api/vocab/:id/review must only touch the caller's own vocab item.
 * Item ids are sequential, so an unscoped UPDATE let any approved user
 * rewrite every other learner's flashcard schedule.
 */
import assert from "node:assert/strict";
import test from "node:test";

import worker from "../src/index.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

const BOT_TOKEN = "123456:test-token";
const OWNER_TG = 1001;
const OTHER_TG = 1002;
const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;

function setup() {
  const { db, raw } = createSqliteD1();
  const user = raw.prepare(`INSERT INTO users (id, telegram_user_id, first_name, is_approved) VALUES (?, ?, ?, 1)`);
  user.run(1, OWNER_TG, "Owner");
  user.run(2, OTHER_TG, "Other");
  raw
    .prepare(`INSERT INTO vocab_items (id, user_id, term_it, term_fa, interval_days, next_review_at) VALUES (1, 1, 'sorpasso', 'سبقت', 4, '2026-01-01')`)
    .run();
  const env = { DB: db, TELEGRAM_BOT_TOKEN: BOT_TOKEN, ALLOWED_TELEGRAM_USER_IDS: "9", PRIMARY_ADMIN_TELEGRAM_USER_ID: "9", LOG_CHANNEL_ID: "-100" } as AppEnv;

  async function review(telegramId: number, body: unknown, itemId: string | number = 1) {
    const response = await worker.fetch(
      new Request(`https://example.test/api/vocab/${itemId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Telegram-InitData": signedInitData(BOT_TOKEN, telegramId) },
        body: typeof body === "string" ? body : JSON.stringify(body),
      }),
      env,
      ctx
    );
    return response.status;
  }
  const item = () => raw.prepare(`SELECT interval_days, next_review_at FROM vocab_items WHERE id = 1`).get();
  return { review, item };
}

test("another user cannot reschedule someone else's vocab item", async () => {
  const { review, item } = setup();
  const before = item();
  assert.equal(await review(OTHER_TG, { correct: true, currentIntervalDays: 4 }), 404);
  assert.deepEqual(item(), before, "the owner's schedule is untouched");
});

test("the owner's correct review doubles the interval", async () => {
  const { review, item } = setup();
  assert.equal(await review(OWNER_TG, { correct: true, currentIntervalDays: 4 }), 200);
  assert.equal((item() as { interval_days: number }).interval_days, 8);
});

test("a malformed review is rejected without writing", async () => {
  const { review, item } = setup();
  const before = item();
  for (const body of [{ correct: "yes" }, { correct: true, currentIntervalDays: "abc" }, { correct: true, currentIntervalDays: 0 }, "{not json"]) {
    assert.equal(await review(OWNER_TG, body), 400, `rejects ${JSON.stringify(body)}`);
  }
  assert.equal(await review(OWNER_TG, { correct: true }, "abc"), 400, "rejects a non-numeric id");
  assert.deepEqual(item(), before, "nothing was written");
});
