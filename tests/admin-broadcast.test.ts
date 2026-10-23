import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";

import worker from "../src/index.js";
import type { AppEnv } from "../src/types.js";

const BOT_TOKEN = "123456:test-token";
const ADMIN_ID = 42;

function signedInitData(userId: number): string {
  const params = new URLSearchParams({
    auth_date: String(Math.floor(Date.now() / 1000)),
    user: JSON.stringify({ id: userId, first_name: "Admin" }),
  });
  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  const secret = createHmac("sha256", "WebAppData").update(BOT_TOKEN).digest();
  params.set("hash", createHmac("sha256", secret).update(dataCheckString).digest("hex"));
  return params.toString();
}

const user = (id: number, is_approved: number, access_expires_at: string | null = null) => ({
  id, telegram_user_id: 1000 + id, first_name: `U${id}`, username: null, is_approved, access_expires_at,
});

const USERS = [
  { ...user(1, 1), telegram_user_id: ADMIN_ID },
  user(2, 1),                          // active, unlimited
  user(3, 1, "2000-01-01 00:00:00"),   // expired
  user(4, 0),                          // pending
  user(5, -1),                         // blocked — never receives anything
];

function env(): AppEnv {
  const db = {
    prepare() {
      return {
        bind() { return this; },
        async first() { return USERS[0]; },
        async run() { return { success: true }; },
        async all() { return { results: USERS }; },
      };
    },
  } as unknown as D1Database;
  return {
    DB: db,
    TELEGRAM_BOT_TOKEN: BOT_TOKEN,
    ALLOWED_TELEGRAM_USER_IDS: String(ADMIN_ID),
    LOG_CHANNEL_ID: "-100123",
    MINI_APP_URL: "https://example.test/app",
  } as AppEnv;
}

const executionCtx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;

async function broadcast(body: object) {
  const calls: { method: string; chat_id: number; text?: string }[] = [];
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    const method = String(url).split("/").pop()!;
    const payload = JSON.parse(String(init.body));
    calls.push({ method, ...payload });
    // User 4's chat is gone (they blocked the bot) — counts as a failed send.
    const ok = !(method === "sendMessage" && payload.chat_id === 1004);
    return new Response(JSON.stringify({ ok, result: { message_id: 77 } }), { status: ok ? 200 : 403 });
  }) as typeof fetch;
  try {
    const res = await worker.fetch(
      new Request("https://example.test/api/admin/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Telegram-InitData": signedInitData(ADMIN_ID) },
        body: JSON.stringify(body),
      }),
      env(),
      executionCtx
    );
    return { status: res.status, json: (await res.json()) as Record<string, unknown>, calls };
  } finally {
    globalThis.fetch = realFetch;
  }
}

test("broadcast to active users skips expired, pending and blocked, and pins each message", async () => {
  const { status, json, calls } = await broadcast({ text: "  جلسه <b>فردا</b>  ", audience: "active", pin: true });

  assert.equal(status, 200);
  assert.deepEqual(json, { ok: true, total: 2, sent: 2, failed: 0 });
  const sends = calls.filter((c) => c.method === "sendMessage");
  assert.deepEqual(sends.map((c) => c.chat_id), [ADMIN_ID, 1002]);
  assert.match(sends[0].text ?? "", /اطلاعیه/);
  assert.match(sends[0].text ?? "", /&lt;b&gt;فردا&lt;\/b&gt;/, "admin text is escaped, not parsed as HTML");
  assert.deepEqual(calls.filter((c) => c.method === "pinChatMessage").map((c) => c.chat_id), [ADMIN_ID, 1002]);
});

test("broadcast to all reaches everyone except blocked users and reports failures", async () => {
  const { json, calls } = await broadcast({ text: "سلام", audience: "all", pin: false });

  assert.deepEqual(json, { ok: true, total: 4, sent: 3, failed: 1 });
  assert.ok(!calls.some((c) => c.chat_id === 1005), "blocked user must not be messaged");
  assert.ok(!calls.some((c) => c.method === "pinChatMessage"), "no pin unless asked");
});

test("broadcast rejects empty text and unknown audiences without sending", async () => {
  assert.equal((await broadcast({ text: "   ", audience: "all" })).status, 400);
  const bad = await broadcast({ text: "سلام", audience: "everyone" });
  assert.equal(bad.status, 400);
  assert.equal(bad.calls.length, 0);
});
