import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";

import worker from "../src/index.js";
import { isAccessExpired, isPrimaryAdminUser } from "../src/lib/auth.js";
import type { AppEnv } from "../src/types.js";

const BOT_TOKEN = "123456:test-token";

function signedInitData(userId: number): string {
  const params = new URLSearchParams({
    auth_date: String(Math.floor(Date.now() / 1000)),
    user: JSON.stringify({ id: userId, first_name: "Pending" }),
  });
  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  const secret = createHmac("sha256", "WebAppData").update(BOT_TOKEN).digest();
  params.set("hash", createHmac("sha256", secret).update(dataCheckString).digest("hex"));
  return params.toString();
}

function userDb(
  approvalStatus: number,
  telegramUserId = 9001,
  accessExpiresAt: string | null = null
): D1Database {
  const user = {
    id: 7,
    telegram_user_id: telegramUserId,
    first_name: "Pending",
    username: null,
    target_exam_date: null,
    daily_reminder_hour: 8,
    timezone: "Europe/Rome",
    is_approved: approvalStatus,
    access_expires_at: accessExpiresAt,
    // Deliberately recent: this reproduced the former 72-hour bypass.
    created_at: new Date().toISOString().replace("T", " ").slice(0, 19),
  };

  return {
    prepare(sql: string) {
      assert.match(sql, /users/, "a blocked request must not reach the protected endpoint query");
      return {
        bind() {
          return this;
        },
        async first() {
          return user;
        },
        async run() {
          return { success: true };
        },
      };
    },
  } as unknown as D1Database;
}

function envFor(
  approvalStatus: number,
  telegramUserId = 9001,
  accessExpiresAt: string | null = null,
  primaryAdminId?: string
): AppEnv {
  return {
    DB: userDb(approvalStatus, telegramUserId, accessExpiresAt),
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

test("a newly registered pending user is denied every protected API route", async () => {
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
