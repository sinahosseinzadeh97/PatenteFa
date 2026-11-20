/**
 * Admin notices in the log channel: they must fit in one Telegram message,
 * must not be floodable by one user, and must never go to a guessed channel
 * when LOG_CHANNEL_ID is missing. Runs the real webhook and API on real SQL.
 */
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import worker from "../src/index.js";
import { runNightlyBackup } from "../src/jobs/nightlyJournalAndBackup.js";
import { notifyAdminNewUserRequest } from "../src/lib/telegram.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

const BOT_TOKEN = "123456:test-token";
const SECRET = "hook-secret";
const ADMIN = 42;
const CHANNEL = "-100777";
const LEARNER = 5001;

let sent: { method: string; chat_id?: number | string; text?: string }[] = [];
const realFetch = globalThis.fetch;
test.beforeEach(() => {
  sent = [];
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    const href = String(url);
    assert.ok(href.startsWith("https://api.telegram.org/"), `unexpected fetch ${href}`);
    const body = init?.body instanceof FormData
      ? { chat_id: String(init.body.get("chat_id")) }
      : init?.body ? JSON.parse(String(init.body)) : {};
    sent.push({ method: href.split("/").pop() ?? "", chat_id: body.chat_id, text: body.text });
    return new Response(JSON.stringify({ ok: true, result: { message_id: 1 } }));
  }) as typeof fetch;
});
test.afterEach(() => { globalThis.fetch = realFetch; });

const toChannel = () => sent.filter((m) => String(m.chat_id) === CHANNEL);
const toLearner = () => sent.filter((m) => m.chat_id === LEARNER);
const elsewhere = () => sent.filter((m) => m.chat_id !== LEARNER);

/** `null` = LOG_CHANNEL_ID unset (`undefined` would pick up the default). */
function setup(logChannel: string | null = CHANNEL) {
  const { db, raw } = createSqliteD1();
  // A returning learner whose trial ended long ago: no new trial, so every
  // /start and fun answer takes the plain access-request path.
  raw.prepare(`INSERT INTO users (id, telegram_user_id, first_name, is_approved) VALUES (1, ?, 'Learner', -1)`).run(LEARNER);
  raw.prepare(`INSERT INTO access_grants (user_id, kind, days, expires_at) VALUES (1, 'trial', 14, datetime('now', '-30 days'))`).run();
  const store = new Map<string, string>();
  const env = {
    DB: db,
    KV: { get: async (k: string) => store.get(k) ?? null, put: async (k: string, v: string) => void store.set(k, v), delete: async (k: string) => void store.delete(k) },
    TELEGRAM_BOT_TOKEN: BOT_TOKEN,
    TELEGRAM_WEBHOOK_SECRET: SECRET,
    ALLOWED_TELEGRAM_USER_IDS: String(ADMIN),
    PRIMARY_ADMIN_TELEGRAM_USER_ID: String(ADMIN),
    LOG_CHANNEL_ID: logChannel ?? undefined,
    MINI_APP_URL: "https://example.test/app",
  } as unknown as AppEnv;
  const pending: Promise<unknown>[] = [];
  const ctx = { waitUntil: (p: Promise<unknown>) => void pending.push(p), passThroughOnException() {}, props: {} } as unknown as ExecutionContext;
  const settle = async () => { while (pending.length) await pending.shift(); };

  async function dm(text: string) {
    const update = { update_id: 1, message: { message_id: 1, from: { id: LEARNER, first_name: "Learner" }, chat: { id: LEARNER }, text } };
    const res = await worker.fetch(
      new Request("https://example.test/webhook", { method: "POST", headers: { "Content-Type": "application/json", "X-Telegram-Bot-Api-Secret-Token": SECRET }, body: JSON.stringify(update) }),
      env,
      ctx
    );
    assert.equal(res.status, 200);
    await settle();
  }
  async function requestAccess(funAnswer: string) {
    const res = await worker.fetch(
      new Request("https://example.test/api/request-access", { method: "POST", headers: { "Content-Type": "application/json", "X-Telegram-InitData": signedInitData(BOT_TOKEN, LEARNER) }, body: JSON.stringify({ funAnswer }) }),
      env,
      ctx
    );
    assert.equal(res.status, 200);
    await settle();
  }
  const stored = () => (raw.prepare(`SELECT COUNT(*) AS n FROM support_messages WHERE user_id = 1 AND direction = 'in'`).get() as { n: number }).n;
  return { db, dm, requestAccess, stored };
}

test("an over-long fun answer is cut so the access notice still fits one Telegram message", async () => {
  await notifyAdminNewUserRequest(BOT_TOKEN, CHANNEL, { telegramUserId: LEARNER, firstName: "A & B <i>", funAnswer: "x".repeat(5000) });
  const [notice] = toChannel();
  assert.ok(notice.text!.length <= 4096, `notice is ${notice.text!.length} characters`);
  assert.ok(notice.text!.includes("A &amp; B &lt;i&gt;"), "the name stays escaped");
  assert.ok(notice.text!.includes("…"), "the cut is visible");
});

test("repeated /start from a learner without access notifies the admin once an hour", async () => {
  const t = setup();
  await t.dm("/start");
  await t.dm("/start");
  assert.equal(toChannel().length, 1);
  assert.equal(toLearner().length, 2, "the learner still gets a reply each time");
});

test("repeated fun answers notify once an hour, and a /start notice does not swallow the typed answer", async () => {
  const t = setup();
  await t.dm("/start");
  await t.requestAccess("سلام، من دوباره آمدم");
  await t.requestAccess("سلام دوباره");
  assert.equal(toChannel().length, 2);
  assert.ok(toChannel()[1].text!.includes("سلام، من دوباره آمدم"));
});

test("the bot support relay accepts five messages a minute", async () => {
  const t = setup();
  for (let i = 1; i <= 6; i++) await t.dm(`پیام ${i}`);
  assert.equal(t.stored(), 5);
  assert.equal(toChannel().length, 5);
  assert.match(toLearner().at(-1)!.text!, /یک دقیقه صبر کنید/);
});

test("without LOG_CHANNEL_ID no admin notice or backup is sent anywhere", async () => {
  const t = setup(null);
  await t.dm("سلام");
  await t.dm("/start");
  assert.equal(t.stored(), 1, "the support message is still kept");
  assert.deepEqual(elsewhere(), [], "nothing goes to a guessed channel");
  await runNightlyBackup({ DB: t.db, TELEGRAM_BOT_TOKEN: BOT_TOKEN, LOG_CHANNEL_ID: undefined as unknown as string });
  assert.deepEqual(elsewhere(), [], "the nightly backup is not posted either");
});

test("no source file names a fallback log channel", () => {
  const files = (readdirSync("src", { recursive: true }) as string[]).filter((f) => f.endsWith(".ts"));
  for (const file of files) {
    assert.ok(!readFileSync(join("src", file), "utf8").includes("@patente_fa_logs"), file);
  }
});
