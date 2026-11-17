import assert from "node:assert/strict";
import test from "node:test";

import worker from "../src/index.js";
import { isAccessExpired, isPrimaryAdminUser } from "../src/lib/auth.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData as sign } from "./helpers/sqlite-d1.js";

const BOT_TOKEN = "123456:test-token";

function signedInitData(userId: number): string {
  return sign(BOT_TOKEN, userId);
}

function envFor(
  approvalStatus: number,
  telegramUserId = 9001,
  accessExpiresAt: string | null = null,
  primaryAdminId?: string
): AppEnv {
  const { db, raw } = createSqliteD1();
  raw.prepare(`INSERT INTO users (id, telegram_user_id, is_approved, access_expires_at)
    VALUES (7, ?, ?, ?)`).run(telegramUserId, approvalStatus, accessExpiresAt);
  if (approvalStatus !== 1) {
    raw.prepare(`INSERT INTO access_grants (user_id, kind, expires_at)
      VALUES (7, 'block', ?)`).run(accessExpiresAt);
  }
  return {
    DB: db,
    TELEGRAM_BOT_TOKEN: BOT_TOKEN,
    ALLOWED_TELEGRAM_USER_IDS: "42",
    PRIMARY_ADMIN_TELEGRAM_USER_ID: primaryAdminId,
    LOG_CHANNEL_ID: "-100123",
  } as AppEnv;
}

const executionCtx = {
  waitUntil(_promise: Promise<unknown>) {},
  passThroughOnException() {},
  props: {},
} as unknown as ExecutionContext;

test("a pending user who already consumed a grant is denied protected API routes", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/api/stats", {
      headers: { "X-Telegram-InitData": signedInitData(9001) },
    }),
    envFor(0),
    executionCtx
  );
  const body = await response.json() as Record<string, unknown>;

  assert.equal(response.status, 403);
  assert.equal(body.isApproved, false);
  assert.equal(body.status, "pending");
  assert.equal("trialExpired" in body, false);
  assert.equal(response.headers.has("X-Trial-Ms-Left"), false);
});

test("a rejected user remains denied", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/api/stats", {
      headers: { "X-Telegram-InitData": signedInitData(9001) },
    }),
    envFor(-1),
    executionCtx
  );
  const body = await response.json() as Record<string, unknown>;

  assert.equal(response.status, 403);
  assert.equal(body.isApproved, false);
  assert.equal(body.status, "rejected");
});

test("an approved account with an expired access window is denied", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/api/stats", {
      headers: { "X-Telegram-InitData": signedInitData(9001) },
    }),
    envFor(1, 9001, "2020-01-01 00:00:00"),
    executionCtx
  );
  const body = await response.json() as Record<string, unknown>;

  assert.equal(response.status, 403);
  assert.equal(body.status, "expired");
  assert.equal(body.isApproved, false);
});

test("access expiry parsing is UTC-aware and fails closed on malformed dates", () => {
  const now = Date.parse("2026-09-01T12:00:00Z");
  assert.equal(isAccessExpired(null, now), false);
  assert.equal(isAccessExpired("2026-09-01 12:00:01", now), false);
  assert.equal(isAccessExpired("2026-09-01 11:59:59", now), true);
  assert.equal(isAccessExpired("not-a-date", now), true);
});

test("the admin shell is absent from the public app and denied to non-admins", async () => {
  const appResponse = await worker.fetch(
    new Request("https://example.test/app"),
    envFor(1),
    executionCtx
  );
  assert.doesNotMatch(await appResponse.text(), /id="screen-admin"/);

  const denied = await worker.fetch(
    new Request("https://example.test/api/admin/shell", {
      headers: { "X-Telegram-InitData": signedInitData(9001) },
    }),
    envFor(1),
    executionCtx
  );
  assert.equal(denied.status, 403);
});

test("the configured admin can load the private admin shell", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/api/admin/shell", {
      headers: { "X-Telegram-InitData": signedInitData(42) },
    }),
    envFor(1, 42),
    executionCtx
  );
  const body = await response.json() as { html?: string };

  assert.equal(response.status, 200);
  assert.match(body.html ?? "", /id="screen-admin"/);
});

test("a dedicated primary admin id overrides every legacy allow-list entry", async () => {
  assert.equal(isPrimaryAdminUser(42, "99", "42,77"), false);
  assert.equal(isPrimaryAdminUser(99, "99", "42,77"), true);

  const response = await worker.fetch(
    new Request("https://example.test/api/admin/shell", {
      headers: { "X-Telegram-InitData": signedInitData(42) },
    }),
    envFor(1, 42, null, "99"),
    executionCtx
  );
  assert.equal(response.status, 403);
});

test("telemetry rejects arbitrary event types before writing them", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/api/telemetry/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Telegram-InitData": signedInitData(9001),
      },
      body: JSON.stringify({ eventType: "captured_form_value", eventData: { value: "secret" } }),
    }),
    envFor(1),
    executionCtx
  );

  assert.equal(response.status, 400);
});
