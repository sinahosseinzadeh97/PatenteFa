/**
 * Referral link: a friend who starts the bot with someone's link gets 7 extra
 * trial days; the inviter gets 30 days when that friend first pays, once.
 * Runs the real webhook, admin and API routes against real SQL.
 */
import assert from "node:assert/strict";
import test from "node:test";
import worker from "../src/index.js";
import { BOT_USERNAME, referralCodeFromStart } from "../src/lib/referral.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

const BOT_TOKEN = "123456:referral-test";
const SECRET = "hook-secret";
const ADMIN = 8001;
const INVITER = 8101;
type Json = Record<string, any>;

test("only an r_ code with 8 lowercase letters or digits counts", () => {
  assert.equal(referralCodeFromStart("/start r_ab12cd34"), "ab12cd34");
  assert.equal(referralCodeFromStart("/start web"), null, "the landing page's start=web is not a referral");
  assert.equal(referralCodeFromStart("/start"), null);
  assert.equal(referralCodeFromStart("/start r_AB12cd34"), null);
  assert.equal(referralCodeFromStart("/start r_ab12cd3"), null);
  assert.equal(referralCodeFromStart("/panel r_ab12cd34"), null, "only /start carries a referral");
});

function setup() {
  const { db, raw } = createSqliteD1();
  raw.prepare(`INSERT INTO users (telegram_user_id, first_name, is_approved, access_expires_at) VALUES (?, 'Inviter', 1, datetime('now', '+10 days'))`).run(INVITER);
  raw.prepare(`INSERT INTO users (telegram_user_id, first_name, is_approved) VALUES (8102, 'Unlimited', 1)`).run();
  raw.prepare(`INSERT INTO users (telegram_user_id, first_name, is_approved) VALUES (8301, 'Old', 1)`).run();
  const store = new Map<string, string>();
  const env = {
    DB: db,
    KV: { get: async (k: string) => store.get(k) ?? null, put: async (k: string, v: string) => void store.set(k, v), delete: async (k: string) => void store.delete(k) },
    TELEGRAM_BOT_TOKEN: BOT_TOKEN,
    TELEGRAM_WEBHOOK_SECRET: SECRET,
    ALLOWED_TELEGRAM_USER_IDS: String(ADMIN),
    PRIMARY_ADMIN_TELEGRAM_USER_ID: String(ADMIN),
    LOG_CHANNEL_ID: "-100",
    MINI_APP_URL: "https://example.test/app",
  } as unknown as AppEnv;

  const pending: Promise<unknown>[] = [];
  const ctx = { waitUntil: (p: Promise<unknown>) => void pending.push(p), passThroughOnException() {}, props: {} } as unknown as ExecutionContext;
  const settle = async () => { while (pending.length) await pending.shift(); };

  const sent: { chat_id: number | string; text: string }[] = [];
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string, init?: RequestInit) => {
    if (String(url).startsWith("https://api.telegram.org/")) {
      if (init?.body) sent.push(JSON.parse(String(init.body)));
      return new Response(JSON.stringify({ ok: true, result: { message_id: 1 } }), { status: 200 });
    }
    return realFetch(url, init);
  }) as typeof fetch;
  const restore = () => { globalThis.fetch = realFetch; };

  async function api(telegramId: number, method: string, path: string, body?: unknown) {
    const res = await worker.fetch(
      new Request(`https://example.test/api${path}`, {
        method,
        headers: { "Content-Type": "application/json", "X-Telegram-InitData": signedInitData(BOT_TOKEN, telegramId) },
        body: body === undefined ? undefined : JSON.stringify(body),
      }),
      env,
      ctx
    );
    await settle();
    return { status: res.status, body: (await res.json()) as Json };
  }

  async function start(telegramId: number, text: string) {
    const update = { update_id: telegramId, message: { message_id: 1, from: { id: telegramId, first_name: `U${telegramId}` }, chat: { id: telegramId, type: "private" }, date: 0, text } };
    const res = await worker.fetch(
      new Request("https://example.test/webhook", { method: "POST", headers: { "Content-Type": "application/json", "X-Telegram-Bot-Api-Secret-Token": SECRET }, body: JSON.stringify(update) }),
      env,
      ctx
    );
    assert.equal(res.status, 200);
    await settle();
  }

  const user = (telegramId: number) =>
    raw.prepare(`SELECT id, is_approved, access_expires_at, (julianday(access_expires_at) - julianday('now')) AS days_left FROM users WHERE telegram_user_id = ?`).get(telegramId) as Json;
  const referralOf = (telegramId: number) =>
    raw.prepare(`SELECT r.* FROM referrals r JOIN users u ON u.id = r.invitee_user_id WHERE u.telegram_user_id = ?`).get(telegramId) as Json | undefined;

  return { api, start, user, referralOf, sent, restore };
}

test("the inviter gets a stable personal link", async () => {
  const t = setup();
  try {
    const first = await t.api(INVITER, "GET", "/referral");
    assert.equal(first.status, 200);
    assert.match(first.body.link, new RegExp(`^https://t\\.me/${BOT_USERNAME}\\?start=r_[a-z0-9]{8}$`));
    assert.equal((await t.api(INVITER, "GET", "/referral")).body.link, first.body.link, "same link every time");
    assert.deepEqual([first.body.invited, first.body.paid, first.body.rewardDays], [0, 0, 0]);
  } finally {
    t.restore();
  }
});

test("a new user who starts with the link gets 21 days; others get nothing extra", async () => {
  const t = setup();
  try {
    const link = (await t.api(INVITER, "GET", "/referral")).body.link as string;
    const payload = link.split("start=")[1];

    await t.start(8201, `/start ${payload}`);
    const invitee = t.user(8201);
    assert.equal(invitee.is_approved, 1);
    assert.ok(invitee.days_left > 20.9 && invitee.days_left < 21.1, `21 days, got ${invitee.days_left}`);
    assert.equal(t.referralOf(8201)?.referrer_user_id, t.user(INVITER).id);
    assert.ok(t.sent.some((m) => m.chat_id === 8201 && m.text.includes("۷ روز هدیه")), "the friend is told about the bonus");

    await t.start(8301, `/start ${payload}`);
    assert.equal(t.referralOf(8301), undefined, "an existing user is never counted");

    await t.start(8202, "/start web");
    assert.equal(t.referralOf(8202), undefined);
    assert.ok(Math.abs(t.user(8202).days_left - 14) < 0.1, "a plain start keeps the 14-day trial");

    await t.start(8203, "/start r_zzzzzzzz");
    assert.equal(t.referralOf(8203), undefined, "an unknown code is ignored");
    assert.ok(Math.abs(t.user(8203).days_left - 14) < 0.1);

    await t.start(8201, "/start r_zzzzzzzz");
    assert.equal(t.referralOf(8201)?.referrer_user_id, t.user(INVITER).id, "the first inviter stays");
  } finally {
    t.restore();
  }
});

test("the inviter gets 30 days on the friend's first payment, and only once", async () => {
  const t = setup();
  try {
    const link = (await t.api(INVITER, "GET", "/referral")).body.link as string;
    await t.start(8201, `/start ${link.split("start=")[1]}`);
    const inviteeId = t.user(8201).id;
    const inviterId = t.user(INVITER).id;

    const gift = await t.api(ADMIN, "POST", `/admin/users/${inviteeId}/access`, { kind: "gift", durationDays: 5 });
    assert.equal(gift.status, 200);
    assert.ok(Math.abs(t.user(INVITER).days_left - 10) < 0.1, "a gift is not a payment");
    assert.equal(gift.body.referralRewardUserId ?? null, null);

    const paid = await t.api(ADMIN, "POST", `/admin/users/${inviteeId}/access`, { kind: "paid", durationDays: 30, amountEur: 18 });
    assert.equal(paid.status, 200);
    assert.equal(paid.body.referralRewardUserId, inviterId);
    const afterFirst = t.user(INVITER).days_left;
    assert.ok(afterFirst > 39.9 && afterFirst < 40.1, `10 + 30 days, got ${afterFirst}`);
    assert.ok(t.referralOf(8201)?.rewarded_at, "the reward is recorded");
    assert.ok(t.sent.some((m) => m.chat_id === INVITER && m.text.includes("۳۰ روز")), "the inviter is told");

    const again = await t.api(ADMIN, "POST", `/admin/users/${inviteeId}/access`, { kind: "paid", durationDays: 30, amountEur: 18 });
    assert.equal(again.body.referralRewardUserId ?? null, null);
    assert.ok(Math.abs(t.user(INVITER).days_left - afterFirst) < 0.01, "a second payment gives no second reward");

    const stats = (await t.api(INVITER, "GET", "/referral")).body;
    assert.deepEqual([stats.invited, stats.paid, stats.rewardDays], [1, 1, 30]);
  } finally {
    t.restore();
  }
});

test("an inviter with unlimited access is never cut down to 30 days", async () => {
  const t = setup();
  try {
    const link = (await t.api(8102, "GET", "/referral")).body.link as string;
    await t.start(8204, `/start ${link.split("start=")[1]}`);
    await t.api(ADMIN, "POST", `/admin/users/${t.user(8204).id}/access`, { kind: "paid", durationDays: 30, amountEur: 18 });
    assert.equal(t.user(8102).access_expires_at, null, "still unlimited");
    assert.ok(t.referralOf(8204)?.rewarded_at, "the payment still counts for the inviter's stats");
  } finally {
    t.restore();
  }
});
