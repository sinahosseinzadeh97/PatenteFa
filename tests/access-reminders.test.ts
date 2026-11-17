import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import test, { type TestContext } from "node:test";

import worker from "../src/index.js";
import { runAccessReminders, reminderKindFor } from "../src/jobs/accessReminder.js";
import { buildAccessReminder } from "../src/lib/access-messages.js";
import { saveAccessOfferSettings, type ReminderCandidate } from "../src/db/queries.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";
import { renderPendingScreen } from "../src/app/screens/pending.js";

const BOT_TOKEN = "123456:test-token";
const ADMIN_ID = 42;
const DAY = 86_400_000;
let sent: Array<{ chat_id: number; text: string }>;
let telegramOk: boolean;
let realFetch: typeof fetch;

test.beforeEach(() => {
  sent = [];
  telegramOk = true;
  realFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: unknown, init: RequestInit) => {
    sent.push(JSON.parse(String(init.body)));
    return new Response(JSON.stringify({ ok: telegramOk, result: { message_id: 1 } }), { status: telegramOk ? 200 : 400 });
  }) as typeof fetch;
});
test.afterEach(() => { globalThis.fetch = realFetch; });

const utc = (ms: number) => new Date(ms).toISOString().replace("T", " ").slice(0, 19);

function fixture(t: TestContext) {
  const { db, raw } = createSqliteD1();
  t.after(() => raw.close());
  const env = {
    DB: db, TELEGRAM_BOT_TOKEN: BOT_TOKEN, ALLOWED_TELEGRAM_USER_IDS: String(ADMIN_ID),
    LOG_CHANNEL_ID: "-100123", MINI_APP_URL: "https://example.test/app",
  } as AppEnv;
  /** A user whose latest grant is `kind`/`days` and whose window ends at now+offsetMs. */
  function user(tg: number, name: string, offsetMs: number, kind: string, days: number | null) {
    const exp = utc(Date.now() + offsetMs);
    raw.prepare(`INSERT INTO users (telegram_user_id, first_name, is_approved, access_expires_at) VALUES (?, ?, 1, ?)`).run(tg, name, exp);
    const id = Number(raw.prepare(`SELECT id FROM users WHERE telegram_user_id = ?`).get(tg)!.id);
    raw.prepare(`INSERT INTO access_grants (user_id, kind, days, expires_at) VALUES (?, ?, ?, ?)`).run(id, kind, days, exp);
    return id;
  }
  async function call(method: string, path: string, userId: number, body?: unknown) {
    const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;
    return worker.fetch(new Request("https://example.test/api" + path, {
      method,
      headers: { "X-Telegram-InitData": signedInitData(BOT_TOKEN, userId), "Content-Type": "application/json" },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    }), env, ctx);
  }
  return { db, raw, env, user, call };
}

const candidate = (offsetMs: number, last_kind: ReminderCandidate["last_kind"], last_days: number | null): ReminderCandidate => ({
  id: 1, telegram_user_id: 1, first_name: null, access_expires_at: utc(Date.now() + offsetMs), last_kind, last_days,
});

test("reminder kind follows the time left; 'expired' only for windows that ran out on their own", () => {
  const now = Date.now();
  assert.equal(reminderKindFor(candidate(4 * DAY, "trial", 14), now), null);
  assert.equal(reminderKindFor(candidate(2.5 * DAY, "trial", 14), now), "ends_3d");
  assert.equal(reminderKindFor(candidate(0.5 * DAY, "paid", 30), now), "ends_1d");
  assert.equal(reminderKindFor(candidate(-DAY, "trial", 14), now), "expired");
  assert.equal(reminderKindFor(candidate(-DAY, "gift", 7), now), "expired");
  assert.equal(reminderKindFor(candidate(-DAY, "set", 14), now), "expired");
  // Closed on purpose by the admin, or a legacy row: no "buy now" message.
  assert.equal(reminderKindFor(candidate(-DAY, "set", 0), now), null);
  assert.equal(reminderKindFor(candidate(-DAY, "legacy", null), now), null);
});

test("the reminder says what ends, when, the price and how to pay — with user text escaped", () => {
  const offer = { plansText: "یک ماه ۱۵ یورو <b>", paymentText: "PayPal: a&b" };
  const { html, plain } = buildAccessReminder({ kind: "ends_3d", firstName: "<Ali>", expiresAt: "2026-12-01 17:42:13", isTrial: true, offer });
  assert.match(html, /&lt;Ali&gt;، دوره رایگانت/);
  assert.match(html, /۱ دسامبر ۲۰۲۶/);
  assert.match(html, /یک ماه ۱۵ یورو &lt;b&gt;/);
  assert.match(html, /PayPal: a&amp;b/);
  assert.match(html, /رسیدش رو همین‌جا بفرست/);
  assert.match(plain, /یک ماه ۱۵ یورو <b>/);
  assert.doesNotMatch(plain, /<\/b>/, "formatting tags are stripped from the logged copy");

  const bare = buildAccessReminder({ kind: "expired", firstName: null, expiresAt: "2026-12-01 17:42:13", isTrial: false, offer: { plansText: "", paymentText: "" } });
  assert.match(bare.html, /^🔒 <b>دسترسی‌ات/);
  assert.match(bare.html, /همین‌جا به پشتیبانی پیام بده/);
});

test("the cron sends each due reminder once, logs it in the support thread, and skips closed accounts", async t => {
  const { db, raw, env, user } = fixture(t);
  await saveAccessOfferSettings(db, { plansText: "یک ماه ۱۵ یورو", paymentText: "PayPal" });
  user(101, "Soon", 2 * DAY, "trial", 14);
  user(102, "Tomorrow", 0.5 * DAY, "paid", 30);
  user(103, "Ended", -DAY, "trial", 14);
  user(104, "Closed", -DAY, "set", 0);
  user(105, "Far", 10 * DAY, "paid", 30);

  assert.equal(await runAccessReminders(env), 3);
  assert.deepEqual(sent.map((m) => m.chat_id).sort(), [101, 102, 103]);
  assert.ok(sent.every((m) => m.text.includes("یک ماه ۱۵ یورو") && m.text.includes("PayPal")));
  assert.match(sent.find((m) => m.chat_id === 102)!.text, /کمتر از ۲۴ ساعت/);
  assert.match(sent.find((m) => m.chat_id === 103)!.text, /تموم شد/);

  const logged = raw.prepare(`SELECT COUNT(*) AS n FROM support_messages WHERE direction = 'out' AND source = 'auto'`).get()!;
  assert.equal(Number(logged.n), 3);

  sent = [];
  assert.equal(await runAccessReminders(env), 0, "a second run the same day sends nothing");
  assert.equal(sent.length, 0);
});

test("a failed Telegram send is retried on the next run instead of being lost", async t => {
  const { env, user } = fixture(t);
  user(201, "Retry", 2 * DAY, "trial", 14);
  telegramOk = false;
  assert.equal(await runAccessReminders(env), 0);
  telegramOk = true;
  sent = [];
  assert.equal(await runAccessReminders(env), 1);
  assert.equal(sent[0].chat_id, 201);
});

test("an expired user's gate response carries the plans and payment method", async t => {
  const { db, user, call } = fixture(t);
  await saveAccessOfferSettings(db, { plansText: "سه ماه ۳۵ یورو", paymentText: "کارت به کارت" });
  user(301, "Ended", -DAY, "trial", 14);
  const res = await call("GET", "/topics", 301);
  const body = await res.json() as { status?: string; offer?: { plansText: string; paymentText: string } };
  assert.equal(res.status, 403);
  assert.equal(body.status, "expired");
  assert.deepEqual(body.offer, { plansText: "سه ماه ۳۵ یورو", paymentText: "کارت به کارت" });
});

test("only the admin can read and change the offer settings, and input is validated", async t => {
  const { call, user } = fixture(t);
  user(401, "Learner", 10 * DAY, "paid", 30);
  assert.equal((await call("PUT", "/admin/settings", 401, { plansText: "x", paymentText: "y" })).status, 403);
  assert.equal((await call("PUT", "/admin/settings", ADMIN_ID, { plansText: 5, paymentText: "y" })).status, 400);
  assert.equal((await call("PUT", "/admin/settings", ADMIN_ID, { plansText: "x".repeat(601), paymentText: "y" })).status, 400);
  assert.equal((await call("PUT", "/admin/settings", ADMIN_ID, { plansText: "  یک ماه ۱۵ یورو  ", paymentText: "PayPal" })).status, 200);
  const res = await call("GET", "/admin/settings", ADMIN_ID);
  assert.deepEqual(await res.json(), { plansText: "یک ماه ۱۵ یورو", paymentText: "PayPal" });
});

test("the gate screen switches to a renewal offer for expired users and back for pending ones", () => {
  const client = readFileSync("public/js/app.js", "utf8");
  const elements = new Map<string, any>();
  const el = (id: string) => {
    if (!elements.has(id)) elements.set(id, { value: "", textContent: "", hidden: false, style: {} });
    return elements.get(id);
  };
  const App: any = { openSupport() { App.opened = true; } };
  const state: any = {};
  const start = client.indexOf("App.applyPendingMode =");
  vm.runInNewContext(client.slice(start, client.indexOf("App.showPendingScreen =", start)),
    { App, state, document: { getElementById: el } });

  App.applyPendingMode({ status: "expired", offer: { plansText: "<b>۱۵ یورو</b>", paymentText: "" } });
  assert.equal(el("pending-title").textContent, "دسترسی شما تمام شده است");
  assert.equal(el("pending-offer").hidden, false);
  assert.equal(el("pending-offer-plans").hidden, false);
  assert.equal(el("pending-offer-plans-text").textContent, "<b>۱۵ یورو</b>", "owner text is set as text, never HTML");
  assert.equal(el("pending-offer-payment").hidden, true);
  assert.equal(el("btn-submit-fun").hidden, true);
  assert.equal(el("pending-request-field").hidden, true);

  App.openSupportToBuy();
  assert.equal(App.opened, true);
  assert.equal(el("support-input").value, "سلام، می‌خواهم اشتراک بخرم.");

  App.applyPendingMode({ status: "pending" });
  assert.equal(el("pending-title").textContent, "در انتظار تأیید مدیریت");
  assert.equal(el("pending-offer").hidden, true);
  assert.equal(el("btn-submit-fun").hidden, false);

  // Every id the client toggles exists in the rendered screen.
  const html = renderPendingScreen();
  for (const id of ["pending-title", "pending-details-title", "pending-request-field", "btn-submit-fun", "pending-offer",
    "pending-offer-plans", "pending-offer-plans-text", "pending-offer-payment", "pending-offer-payment-text"]) {
    assert.match(html, new RegExp(`id="${id}"`), id);
  }
});
