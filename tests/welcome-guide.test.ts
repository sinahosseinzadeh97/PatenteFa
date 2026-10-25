import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";

import worker from "../src/index.js";
import { handleUpdate, type BotContext } from "../src/bot/commands.js";
import type { AppEnv } from "../src/types.js";

const BOT_TOKEN = "123456:test-token";
const ADMIN_ID = 42;
const MINI_APP_URL = "https://example.test/app";

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

type Row = { id: number; telegram_user_id: number; first_name: string; username: null; is_approved: number; access_expires_at: string | null };
const ADMIN: Row = { id: 1, telegram_user_id: ADMIN_ID, first_name: "Admin", username: null, is_approved: 1, access_expires_at: null };

// Every lookup returns the admin for the auth upsert, then `target` for the route.
function fakeDb(target: Row): D1Database {
  return {
    prepare(sql: string) {
      let args: unknown[] = [];
      return {
        bind(...a: unknown[]) { args = a; return this; },
        async first() { return args.includes(ADMIN_ID) ? ADMIN : target; },
        async run() { return { success: true }; },
        async all() { return { results: [] }; },
      };
    },
  } as unknown as D1Database;
}

type Sent = { method: string; chat_id: number; text?: string; reply_markup?: { inline_keyboard: { text: string; web_app?: { url: string } }[][] } };

async function withTelegram<T>(fn: () => Promise<T>): Promise<{ result: T; sent: Sent[] }> {
  const sent: Sent[] = [];
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    sent.push({ method: String(url).split("/").pop()!, ...JSON.parse(String(init.body)) });
    return new Response(JSON.stringify({ ok: true, result: {} }), { status: 200 });
  }) as typeof fetch;
  try {
    return { result: await fn(), sent };
  } finally {
    globalThis.fetch = realFetch;
  }
}

async function adminPost(path: string, body: object, target: Row) {
  const pending: Promise<unknown>[] = [];
  const executionCtx = { waitUntil(p: Promise<unknown>) { pending.push(p); }, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;
  const env = { DB: fakeDb(target), TELEGRAM_BOT_TOKEN: BOT_TOKEN, ALLOWED_TELEGRAM_USER_IDS: String(ADMIN_ID), MINI_APP_URL } as AppEnv;
  return withTelegram(async () => {
    const res = await worker.fetch(
      new Request(`https://example.test/api/admin${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Telegram-InitData": signedInitData(ADMIN_ID) },
        body: JSON.stringify(body),
      }),
      env,
      executionCtx
    );
    await Promise.all(pending);
    return { status: res.status, json: (await res.json()) as Record<string, unknown> };
  });
}

const guides = (sent: Sent[], chatId: number) =>
  sent.filter((s) => s.method === "sendMessage" && s.chat_id === chatId && /مسیر امروز/.test(s.text ?? ""));

function assertGuide(msg: Sent) {
  const buttons = msg.reply_markup!.inline_keyboard.flat();
  assert.equal(buttons[0].text, "📚 شروع درس‌ها");
  assert.equal(buttons[0].web_app!.url, `${MINI_APP_URL}?screen=topics`, "first button opens the lessons screen");
  assert.equal(buttons[1].web_app!.url, MINI_APP_URL);
}

const pendingUser: Row = { id: 7, telegram_user_id: 1007, first_name: "Nima", username: null, is_approved: 0, access_expires_at: null };

test("approving from the panel status route sends the onboarding guide", async () => {
  const { result, sent } = await adminPost("/users/7/status", { isApproved: 1 }, pendingUser);
  assert.equal(result.status, 200);
  const [guide] = guides(sent, 1007);
  assert.ok(guide, "approved user receives the guide");
  assertGuide(guide);
});

test("granting access to a pending user sends the guide; renewing an active user does not", async () => {
  const first = await adminPost("/users/7/access", { durationDays: 30 }, pendingUser);
  assert.equal(first.result.status, 200);
  assert.equal(guides(first.sent, 1007).length, 1);

  const active = { ...pendingUser, is_approved: 1 };
  const renewal = await adminPost("/users/7/access", { durationDays: 30 }, active);
  assert.equal(renewal.result.status, 200);
  assert.equal(guides(renewal.sent, 1007).length, 0, "a renewal is not a new arrival");

  const expired = { ...pendingUser, is_approved: 1, access_expires_at: "2000-01-01 00:00:00" };
  const reopened = await adminPost("/users/7/access", { durationDays: 30 }, expired);
  assert.equal(guides(reopened.sent, 1007).length, 1, "re-opening expired access counts as getting in");
});

test("the resend route delivers the guide but refuses blocked users", async () => {
  const ok = await adminPost("/users/7/welcome", {}, { ...pendingUser, is_approved: 1 });
  assert.deepEqual(ok.result.json, { ok: true, delivered: true });
  assertGuide(guides(ok.sent, 1007)[0]);

  const blocked = await adminPost("/users/7/welcome", {}, { ...pendingUser, is_approved: -1 });
  assert.equal(blocked.result.status, 409);
  assert.equal(guides(blocked.sent, 1007).length, 0);
});

test("approving from the log-channel button sends the guide", async () => {
  const ctx: BotContext = {
    db: fakeDb(pendingUser),
    token: BOT_TOKEN,
    allowedIds: String(ADMIN_ID),
    miniAppUrl: MINI_APP_URL,
    kv: {} as KVNamespace,
  };
  const { sent } = await withTelegram(() =>
    handleUpdate(
      { update_id: 1, callback_query: { id: "cb", from: { id: ADMIN_ID, first_name: "Admin" }, data: "approve_user:1007" } },
      ctx
    )
  );
  assertGuide(guides(sent, 1007)[0]);
});
