import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import vm from "node:vm";
import test, { type TestContext } from "node:test";

import worker from "../src/index.js";
import { handleUpdate, type BotContext } from "../src/bot/commands.js";
import {
  TRIAL_DAYS, upsertUser, startTrialIfEligible, grantAccess, setUserApproval,
  getAccessGrants, getAdminUsersList, getAdminOverviewStats, getUserActivityTimeline,
} from "../src/db/queries.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";
import { renderAdminScreen } from "../src/app/screens/admin.js";

const BOT_TOKEN = "123456:test-token";
const ADMIN_ID = 42;
let telegramCalls: Array<{ chat_id: number | string; text?: string; reply_markup?: { inline_keyboard: Array<Array<{ callback_data?: string }>> } }>;
let realFetch: typeof fetch;
test.beforeEach(() => {
  telegramCalls = [];
  realFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: unknown, init: RequestInit) => {
    telegramCalls.push(JSON.parse(String(init.body)));
    return new Response(JSON.stringify({ ok: true, result: { message_id: 1 } }));
  }) as typeof fetch;
});
test.afterEach(() => { globalThis.fetch = realFetch; });

function fixture(t: TestContext) {
  const { db, raw } = createSqliteD1();
  t.after(() => raw.close());
  const env = {
    DB: db, TELEGRAM_BOT_TOKEN: BOT_TOKEN, ALLOWED_TELEGRAM_USER_IDS: String(ADMIN_ID),
    LOG_CHANNEL_ID: "-100123", MINI_APP_URL: "https://example.test/app",
  } as AppEnv;
  const ctx = { db, token: BOT_TOKEN, allowedIds: String(ADMIN_ID), logChannelId: "-100123", miniAppUrl: env.MINI_APP_URL } as BotContext;
  async function request(path = "/topics", userId = 9001, body?: unknown) {
    const background: Promise<unknown>[] = [];
    const executionCtx = {
      waitUntil(promise: Promise<unknown>) { background.push(promise); },
      passThroughOnException() {}, props: {},
    } as unknown as ExecutionContext;
    const response = await worker.fetch(new Request("https://example.test/api" + path, {
      method: body === undefined ? "GET" : "POST",
      headers: { "X-Telegram-InitData": signedInitData(BOT_TOKEN, userId), "Content-Type": "application/json" },
      ...(body === undefined ? {} : { body: typeof body === 'string' ? body : JSON.stringify(body) }),
    }), env, executionCtx);
    await Promise.all(background);
    return response;
  }
  return { db, raw, request, ctx };
}

function assertDays(expiry: string | null, days: number): void {
  assert.ok(expiry);
  assert.match(expiry, /^\d{4}-\d\d-\d\d \d\d:\d\d:\d\d$/);
  const remaining = (Date.parse(expiry.replace(" ", "T") + "Z") - Date.now()) / 86400000;
  assert.ok(Math.abs(remaining - days) < 0.001, `expected ~${days} days, got ${remaining}`);
}

function startMessage(userId = 9001) {
  return { message: { message_id: 1, from: { id: userId, first_name: "Learner" }, chat: { id: userId }, text: "/start" } };
}

test("first protected request records exactly one 14-day trial and subsequent requests preserve it", async t => {
  const { db, request } = fixture(t);
  assert.equal(TRIAL_DAYS, 14);
  assert.equal((await request()).status, 200);
  const [user] = await getAdminUsersList(db);
  assert.equal(user.is_approved, 1);
  assertDays(user.access_expires_at, 14);
  assert.equal((await request()).status, 200);
  const grants = await getAccessGrants(db, user.id);
  assert.equal(grants.length, 1);
  assert.equal(grants[0].kind, "trial");
  assert.equal(grants[0].days, 14);
  assert.equal(grants[0].expires_at, user.access_expires_at);
  assert.equal((await getAdminUsersList(db))[0].access_expires_at, user.access_expires_at);
  assert.equal(telegramCalls.length, 1);
  assert.equal(telegramCalls[0].chat_id, "-100123");
  assert.match(telegramCalls[0].text!, /کاربر جدید.*\nدوره آزمایشی ۱۴ روزه/);
  const buttons = telegramCalls[0].reply_markup!.inline_keyboard.flat();
  assert.ok(!buttons.some(b => b.callback_data?.startsWith("approve_user:")));
  assert.ok(buttons.some(b => b.callback_data === "reject_user:9001"));
  assert.ok(buttons.some(b => b.callback_data === "reply_user:9001"));
});

test("two concurrent first protected requests both succeed with one user, trial and notification", async t => {
  const { db, raw, request } = fixture(t);
  const responses = await Promise.all([request(), request()]);
  assert.deepEqual(responses.map(r => r.status), [200, 200]);
  assert.equal(raw.prepare("SELECT COUNT(*) AS n FROM users").get()!.n, 1);
  const [user] = await getAdminUsersList(db);
  assert.equal((await getAccessGrants(db, user.id)).length, 1);
  assertDays(user.access_expires_at, 14);
  assert.equal(telegramCalls.length, 1);
});

test("pending users with any prior grant stay pending, including an unexpired consumed trial", async t => {
  const { db, raw, request } = fixture(t);
  for (const [telegramId, kind, expiry] of [
    [9001, "block", null], [9002, "trial", "2000-01-01 00:00:00"], [9003, "trial", "2099-01-01 00:00:00"],
  ] as const) {
    const user = await upsertUser(db, telegramId, "Learner", undefined);
    raw.prepare("INSERT INTO access_grants (user_id, kind, expires_at) VALUES (?, ?, ?)").run(user.id, kind, expiry);
    assert.equal((await startTrialIfEligible(db, user.id)).started, false);
    const response = await request("/topics", telegramId);
    assert.equal(response.status, 403);
    assert.equal((await response.json() as { status: string }).status, "pending");
    assert.equal((await getAccessGrants(db, user.id)).length, 1);
  }
  assert.equal(telegramCalls.length, 0);
});

test("blocking before a trial and /start-style reset never grants an automatic trial", async t => {
  const { db, request, ctx } = fixture(t);
  const user = await upsertUser(db, 9001, "Learner", undefined);
  await setUserApproval(db, 9001, -1);
  assert.equal((await request()).status, 403);
  await handleUpdate(startMessage(), ctx);
  assert.equal((await getAdminUsersList(db))[0].is_approved, 0);
  assert.equal((await request()).status, 403);
  assert.deepEqual((await getAccessGrants(db, user.id)).map(g => g.kind), ["block"]);
});

test("an existing blocked trial is not resurrected by /start", async t => {
  const { db, request, ctx } = fixture(t);
  const user = await upsertUser(db, 9001, "Learner", undefined);
  await startTrialIfEligible(db, user.id);
  await setUserApproval(db, 9001, -1);
  await handleUpdate(startMessage(), ctx);
  assert.equal((await request()).status, 403);
  assert.equal((await getAccessGrants(db, user.id)).filter(g => g.kind === "trial").length, 1);
});

test("approval on a new pending user grants a finite trial and unblocking keeps its previous window", async t => {
  const { db } = fixture(t);
  const user = await upsertUser(db, 9001, "Learner", undefined);
  const approved = await setUserApproval(db, 9001, 1);
  assert.equal(approved!.is_approved, 1);
  assertDays(approved!.access_expires_at, 14);
  await setUserApproval(db, 9001, -1);
  const restored = await setUserApproval(db, 9001, 1);
  assert.equal(restored!.access_expires_at, approved!.access_expires_at);
  assert.deepEqual((await getAccessGrants(db, user.id)).map(g => g.kind), ["block", "trial"]);
});

test("approval after a pre-trial block stays expired; recorded unlimited and legacy access can be restored", async t => {
  const { db, raw, request } = fixture(t);
  const user = await upsertUser(db, 9001, "Learner", undefined);
  await setUserApproval(db, 9001, -1);
  const approved = await setUserApproval(db, 9001, 1);
  assert.ok(approved!.access_expires_at);
  assert.equal((await request()).status, 403);
  assert.deepEqual((await getAccessGrants(db, user.id)).map(g => g.kind), ["block"]);
  await grantAccess(db, user.id, { kind: "unlimited", days: null });
  await setUserApproval(db, 9001, -1);
  assert.equal((await setUserApproval(db, 9001, 1))!.access_expires_at, null);
  const legacy = await upsertUser(db, 9002, "Legacy", undefined);
  raw.prepare("INSERT INTO access_grants (user_id, kind) VALUES (?, 'legacy')").run(legacy.id);
  await setUserApproval(db, 9002, -1);
  assert.equal((await setUserApproval(db, 9002, 1))!.access_expires_at, null);
});

test("/start activates the trial, sends its date and mini-app button, then the normal welcome", async t => {
  const { db, ctx } = fixture(t);
  await handleUpdate(startMessage(), ctx);
  await handleUpdate(startMessage(), ctx);
  const [user] = await getAdminUsersList(db);
  assertDays(user.access_expires_at, 14);
  const logs = telegramCalls.filter(c => c.chat_id === "-100123");
  assert.equal(logs.length, 1);
  const activation = telegramCalls.find(c => c.chat_id === 9001 && c.text?.includes("دوره آزمایشی رایگان ۱۴ روزه"));
  assert.ok(activation?.reply_markup);
  assert.ok(telegramCalls.some(c => c.chat_id === 9001 && c.text?.includes("خوش آمدید")));
  assert.ok(!telegramCalls.some(c => c.text?.includes("درخواست دسترسی شما برای مدیریت ارسال")));
});

test("request-access starts and logs a trial once; admin contacts never receive trials", async t => {
  const { db, request } = fixture(t);
  const response = await request("/request-access", 9001, { funAnswer: "سلام" });
  assert.equal(response.status, 200);
  assert.equal((await response.json() as { isApproved: boolean }).isApproved, true);
  await request("/request-access", 9001, {});
  assert.equal(telegramCalls.length, 1);
  assert.equal((await request("/topics", ADMIN_ID)).status, 200);
  const admin = (await getAdminUsersList(db)).find(u => u.telegram_user_id === ADMIN_ID)!;
  assert.deepEqual(await getAccessGrants(db, admin.id), []);
});

test("bot callback, /approve and panel approval record trials instead of unlimited access", async t => {
  const { db, ctx, request } = fixture(t);
  for (const id of [9001, 9002, 9003]) await upsertUser(db, id, "Learner", undefined);
  await handleUpdate({ callback_query: { id: "cb", from: { id: ADMIN_ID, first_name: "Admin" }, data: "approve_user:9001" } }, ctx);
  await handleUpdate({ message: { message_id: 2, from: { id: ADMIN_ID, first_name: "Admin" }, chat: { id: ADMIN_ID }, text: "/approve 9002" } }, ctx);
  const target = (await getAdminUsersList(db)).find(u => u.telegram_user_id === 9003)!;
  assert.equal((await request(`/admin/users/${target.id}/status`, ADMIN_ID, { isApproved: 1 })).status, 200);
  for (const user of (await getAdminUsersList(db)).filter(u => u.telegram_user_id !== ADMIN_ID)) {
    assertDays(user.access_expires_at, 14);
    assert.equal((await getAccessGrants(db, user.id)).length, 1);
  }
  assert.equal(telegramCalls.filter(c => c.chat_id === "-100123").length, 3);
});

test("paid and gift grants stack from an active trial, including concurrent purchases", async t => {
  const { db, raw } = fixture(t);
  const user = await upsertUser(db, 9001, "Learner", undefined);
  await startTrialIfEligible(db, user.id);
  raw.prepare("UPDATE users SET access_expires_at = datetime('now', '+5 days') WHERE id = ?").run(user.id);
  const paid = await grantAccess(db, user.id, { kind: "paid", days: 30, amountEur: 24.5, note: "بانک" });
  assertDays(paid!.access_expires_at, 35);
  await Promise.all([
    grantAccess(db, user.id, { kind: "paid", days: 7 }),
    grantAccess(db, user.id, { kind: "gift", days: 14 }),
  ]);
  const [result] = await getAdminUsersList(db);
  assertDays(result.access_expires_at, 56);
  assert.equal(result.plan, "gift");
  assert.equal(result.paid_count, 2);
  assert.equal(result.paid_total_eur, 24.5);
  const grants = await getAccessGrants(db, user.id);
  assert.equal(grants.length, 4);
  assert.equal(grants[0].expires_at, result.access_expires_at);
});

test("expired, non-approved and unlimited accounts start purchases from now; set replaces the window", async t => {
  const { db, raw } = fixture(t);
  const user = await upsertUser(db, 9001, "Learner", undefined);
  for (const [status, expiry] of [[1, "2000-01-01 00:00:00"], [0, "2099-01-01 00:00:00"], [-1, "2099-01-01 00:00:00"], [1, null], [1, "not-a-date"], [1, "9999-12-31 23:59:59"]] as const) {
    raw.prepare("UPDATE users SET is_approved = ?, access_expires_at = ? WHERE id = ?").run(status, expiry, user.id);
    assertDays((await grantAccess(db, user.id, { kind: "paid", days: 30 }))!.access_expires_at, 30);
  }
  assertDays((await grantAccess(db, user.id, { kind: "set", days: 7 }))!.access_expires_at, 7);
  assert.equal((await grantAccess(db, user.id, { kind: "unlimited", days: null }))!.access_expires_at, null);
  assertDays((await grantAccess(db, user.id, { kind: "gift", days: 14 }))!.access_expires_at, 14);
  assert.equal(await grantAccess(db, 9999, { kind: "paid", days: 30 }), null);
});

test("a failed grant insert rolls back its user update", async t => {
  const { db, raw } = fixture(t);
  const user = await upsertUser(db, 9001, "Learner", undefined);
  raw.exec("CREATE TRIGGER reject_purchase BEFORE INSERT ON access_grants BEGIN SELECT RAISE(ABORT, 'test failure'); END");
  await assert.rejects(grantAccess(db, user.id, { kind: "paid", days: 30 }), /test failure/);
  assert.equal((await getAdminUsersList(db))[0].is_approved, 0);
  assert.deepEqual(await getAccessGrants(db, user.id), []);
});

test("admin access API rejects invalid kinds, days, amounts, notes and malformed bodies without writes", async t => {
  const { db, request } = fixture(t);
  const user = await upsertUser(db, 9001, "Learner", undefined);
  const invalid: unknown[] = [null, [], "bad", {},
    '{"kind":"paid","durationDays":30,"amountEur":1e999}',
    { kind: "trial", durationDays: 14 }, { kind: null, durationDays: 14 },
    { kind: "paid" }, { kind: "paid", durationDays: null }, { kind: "paid", durationDays: "30" },
    ...[0, -1, 1.5, 3651, true].map(durationDays => ({ kind: "gift", durationDays })),
    { kind: "unlimited", durationDays: 30 }, { kind: "unlimited" },
    ...[-1, 10001, "25", true, {}].map(amountEur => ({ kind: "paid", durationDays: 30, amountEur })),
    { kind: "gift", durationDays: 30, amountEur: 0 }, { kind: "set", durationDays: 30, amountEur: null },
    { kind: "paid", durationDays: 30, note: "x".repeat(201) },
    { kind: "paid", durationDays: 30, note: 123 }, { kind: "paid", durationDays: 30, note: null },
  ];
  for (const body of invalid) {
    const response = await request(`/admin/users/${user.id}/access`, ADMIN_ID, body);
    assert.equal(response.status, 400, JSON.stringify(body));
    assert.match((await response.json() as { error: string }).error, /[\u0600-\u06ff]/);
  }
  assert.deepEqual(await getAccessGrants(db, user.id), []);
  assert.equal((await request('/admin/users/9999/access', ADMIN_ID, { kind: "paid", durationDays: 30 })).status, 404);
  assert.equal((await request(`/admin/users/${user.id}/access`, 9002, { kind: "unlimited", durationDays: null })).status, 403);
});

test("admin access API accepts paid, gift, set, unlimited and old clients, storing a trimmed history", async t => {
  const { db, request } = fixture(t);
  const user = await upsertUser(db, 9001, "Learner", undefined);
  const valid = [
    { kind: "paid", durationDays: 30, amountEur: 0, note: "  خرید اول  " },
    { kind: "paid", durationDays: 7, amountEur: 10000 },
    { kind: "paid", durationDays: 7, amountEur: null },
    { kind: "gift", durationDays: 14, note: "هدیه" },
    { kind: "set", durationDays: 1 }, { kind: "set", durationDays: 3650 },
    { kind: "unlimited", durationDays: null }, { durationDays: 30 }, { durationDays: null },
  ];
  for (const body of valid) {
    const response = await request(`/admin/users/${user.id}/access`, ADMIN_ID, body);
    assert.equal(response.status, 200);
    const result = await response.json() as { plan: string; isApproved: boolean; accessExpiresAt: string | null };
    const kind = body.kind ?? (body.durationDays === null ? "unlimited" : "set");
    assert.equal(result.plan, kind);
    assert.equal(result.isApproved, true);
    if (kind === "unlimited") assert.equal(result.accessExpiresAt, null);
    else assert.ok(result.accessExpiresAt);
  }
  const grants = await getAccessGrants(db, user.id);
  assert.equal(grants.length, valid.length);
  assert.equal(grants.at(-1)!.note, "خرید اول");
  assert.equal(grants[0].kind, "unlimited");
});

test("admin subscription filters, latest plan, search, overview and timeline use the recorded history", async t => {
  const { db, raw } = fixture(t);
  const add = async (telegramId: number, kind: "trial" | "paid" | "gift" | "unlimited", days: number) => {
    const user = await upsertUser(db, telegramId, `Learner${telegramId}`, undefined);
    if (kind === "trial") await startTrialIfEligible(db, user.id);
    else await grantAccess(db, user.id, { kind, days: kind === "unlimited" ? null : days, ...(kind === "paid" ? { amountEur: 20 } : {}) });
    if (kind !== "unlimited") raw.prepare("UPDATE users SET access_expires_at = datetime('now', ?) WHERE id = ?").run(`${days} days`, user.id);
    return user;
  };
  const trial = await add(9001, "trial", 10);
  const paid = await add(9002, "paid", 30);
  const expired = await add(9003, "trial", -1);
  const expiring = await add(9004, "trial", 2);
  const unlimited = await add(9005, "unlimited", 0);
  const gift = await add(9006, "gift", 2);
  const converted = await add(9007, "trial", 10);
  await grantAccess(db, converted.id, { kind: "paid", days: 30, amountEur: 24.5 });
  const blocked = await add(9008, "paid", 30);
  await setUserApproval(db, 9008, -1);
  const oldPaid = await add(9009, "paid", 30);
  raw.prepare("UPDATE access_grants SET created_at = datetime('now', '-40 days') WHERE user_id = ?").run(oldPaid.id);
  raw.prepare("UPDATE users SET created_at = datetime('now', '-8 days') WHERE id = ?").run(oldPaid.id);
  await upsertUser(db, 9010, "Pending", undefined);
  const ids = async (filter: string) => (await getAdminUsersList(db, undefined, filter)).map(u => u.id).sort((a, b) => a - b);
  assert.deepEqual(await ids("trial"), [trial.id, expiring.id]);
  assert.deepEqual(await ids("paid"), [paid.id, converted.id, oldPaid.id]);
  assert.deepEqual(await ids("trial_expired"), [expired.id]);
  assert.deepEqual(await ids("expiring"), [expiring.id, gift.id]);
  assert.deepEqual(await ids("unlimited"), [unlimited.id]);
  assert.deepEqual(await ids("expired"), [expired.id]);
  assert.deepEqual(await ids("blocked"), [blocked.id]);
  assert.equal((await getAdminUsersList(db, "Learner9001", "trial")).length, 1);
  assert.equal((await getAdminUsersList(db, "9002", "trial")).length, 0);
  const users = await getAdminUsersList(db);
  assert.equal(users.find(u => u.id === blocked.id)!.plan, "paid");
  const convertedRow = users.find(u => u.id === converted.id)!;
  assert.equal(convertedRow.plan, "paid");
  assert.equal(convertedRow.paid_count, 1);
  assert.equal(convertedRow.paid_total_eur, 24.5);
  assert.ok(convertedRow.trial_started_at && convertedRow.first_paid_at && convertedRow.last_paid_at);
  const stats = await getAdminOverviewStats(db);
  assert.equal(stats.joinedToday, 9);
  assert.equal(stats.joined7d, 9);
  assert.equal(stats.activeTrials, 2);
  assert.equal(stats.activePaid, 3);
  assert.equal(stats.expiredTrials, 1);
  assert.equal(stats.convertedUsers, 1);
  assert.equal(stats.revenueEur, 84.5);
  assert.equal(stats.revenue30dEur, 64.5);
  assert.deepEqual((await getUserActivityTimeline(db, converted.id)).grants.map(g => g.kind), ["paid", "trial"]);
});

test("0018 backfills only approved and blocked accounts and preserves their windows", () => {
  const raw = new DatabaseSync(":memory:");
  try {
    for (const file of readdirSync("migrations").filter(f => f.endsWith(".sql") && f < "0018").sort()) {
      raw.exec(readFileSync("migrations/" + file, "utf8"));
    }
    raw.exec(`INSERT INTO users (telegram_user_id, is_approved, access_expires_at) VALUES
      (9001, 1, NULL), (9002, 1, '2030-01-01 00:00:00'), (9003, -1, NULL), (9004, 0, NULL)`);
    const migration = readFileSync("migrations/0018_access_grants.sql", "utf8");
    raw.exec(migration);
    raw.exec(migration);
    const rows = raw.prepare("SELECT kind, expires_at FROM access_grants ORDER BY user_id").all();
    assert.deepEqual(rows.map(r => ({ ...r })), [
      { kind: "legacy", expires_at: null }, { kind: "legacy", expires_at: "2030-01-01 00:00:00" }, { kind: "block", expires_at: null },
    ]);
    assert.equal(raw.prepare("SELECT COUNT(*) AS n FROM access_grants WHERE user_id = 4").get()!.n, 0);
  } finally { raw.close(); }
});

// Run the actual admin client functions with a small DOM, as the other client
// tests do. No Telegram or browser startup is needed for the operator actions.
function adminClient() {
  const client = readFileSync("public/js/app.js", "utf8");
  const elements = new Map<string, any>();
  const element = (id: string) => {
    if (!elements.has(id)) elements.set(id, {
      value: "", innerHTML: "", textContent: "", hidden: false, disabled: false,
      style: {}, setAttribute() {}, focus() {}, checkValidity() { return true; }, reportValidity() {},
    });
    return elements.get(id);
  };
  const requests: Array<{ path: string; body: any }> = [];
  const confirmations: string[] = [];
  const App: any = {};
  const state: any = { adminUsers: [] };
  let response: any = {};
  let confirmed = true;
  let reloads = 0;
  const sandbox = {
    App, state, document: { getElementById: element, activeElement: null },
    window: { confirm(message: string) { confirmations.push(message); return confirmed; }, requestAnimationFrame(fn: () => void) { fn(); } },
    api: async (_method: string, path: string, body: any) => { requests.push({ path, body }); return response; },
  };
  const section = (start: string, end: string) => client.slice(client.indexOf(start), client.indexOf(end));
  vm.runInNewContext([
    section("App.escapeHtml =", "/**\n * Render AI prose"),
    section("App.relativeTime =", "// ── §18.4:"),
    section("App.adminDate =", "App.adminEventDescription ="),
    section("App.changeAdminAccessKind =", "App.closeAdminUserModal ="),
  ].join("\n"), sandbox);
  App.toast = () => {};
  App.loadAdminData = async () => { reloads++; };
  return { App, state, element, requests, confirmations, reloads: () => reloads,
    respond: (value: any) => { response = value; }, confirm: (value: boolean) => { confirmed = value; } };
}

test("admin cards and subscription history escape user strings and label every purchase control", async () => {
  const { App, element, respond } = adminClient();
  const attack = '<img src=x onerror="alert(1)">';
  App.renderAdminUsers([{
    id: 1, telegram_user_id: 9001, first_name: attack, username: attack,
    created_at: "2026-01-01 00:00:00", is_approved: 1, access_expires_at: "2099-01-01 00:00:00",
    plan: "paid", paid_count: 2, paid_total_eur: 49.5, last_paid_at: "2026-02-01 00:00:00",
  }]);
  const html = element("admin-users-table").innerHTML;
  assert.ok(!html.includes(attack));
  assert.match(html, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
  assert.match(html, /عضویت:.*خرید:.*€49.50/s);
  for (const control of ["kind", "days", "amount", "note"]) {
    assert.ok(html.includes(`for="admin-access-${control}-1"`));
    assert.ok(html.includes(`id="admin-access-${control}-1"`));
  }
  for (const filter of ["trial", "paid", "trial_expired", "expiring", "unlimited"]) {
    assert.ok(renderAdminScreen().includes(`value="${filter}"`));
  }
  respond({ user: { first_name: attack }, grants: [{ kind: "paid", days: 30, amount_eur: 24.75,
    expires_at: "2030-01-01 00:00:00", created_at: "2026-02-01 00:00:00", note: attack }] });
  await App.viewAdminUserTimeline(1);
  const history = element("admin-user-modal-content").innerHTML;
  assert.match(history, /تاریخچه اشتراک/);
  assert.ok(!history.includes(attack));
  assert.match(history, /&lt;img.*€24.75|€24.75.*&lt;img/s);
});

test("admin purchase controls toggle by kind, confirm the stacked expiry and send only applicable fields", async () => {
  const { App, state, element, requests, confirmations, reloads, confirm } = adminClient();
  state.adminUsers = [{ id: 1, first_name: "Learner", is_approved: 1, access_expires_at: "2099-01-01 00:00:00" }];
  element("admin-access-kind-1").value = "paid";
  element("admin-access-days-1").value = "30";
  element("admin-access-amount-1").value = "24.50";
  element("admin-access-note-1").value = "  بانک  ";
  confirm(false);
  await App.setAdminUserAccess(1);
  assert.equal(requests.length, 0);
  confirm(true);
  await App.setAdminUserAccess(1);
  assert.equal(requests[0].path, "/admin/users/1/access");
  assert.deepEqual(JSON.parse(JSON.stringify(requests[0].body)), { kind: "paid", durationDays: 30, amountEur: 24.5, note: "بانک" });
  assert.ok(confirmations[0].includes(new Date("2099-01-31T00:00:00Z").toLocaleString("fa-IR-u-ca-gregory", { day: "numeric", month: "long", year: "numeric" })));
  assert.equal(reloads(), 1);
  element("admin-access-kind-1").value = "unlimited";
  App.changeAdminAccessKind(1);
  assert.equal(element("admin-access-days-field-1").hidden, true);
  assert.equal(element("admin-access-amount-field-1").hidden, true);
  await App.setAdminUserAccess(1);
  assert.equal(requests[1].body.durationDays, null);
  assert.ok(!("amountEur" in requests[1].body));
  element("admin-access-kind-1").value = "gift";
  App.changeAdminAccessKind(1);
  assert.equal(element("admin-access-days-field-1").hidden, false);
  assert.equal(element("admin-access-amount-field-1").hidden, true);
  await App.setAdminUserAccess(1);
  assert.equal(requests[2].body.durationDays, 30);
  assert.ok(!("amountEur" in requests[2].body));
});

test("trial dates are shown in the Gregorian calendar on the Rome day", async () => {
  const { formatDateFa } = await import("../src/lib/telegram.js");
  assert.equal(formatDateFa("2026-12-01 17:42:13"), "۱ دسامبر ۲۰۲۶");
  // 23:30 UTC on 30 Nov is already 1 Dec in Rome.
  assert.equal(formatDateFa("2026-11-30 23:30:00"), "۱ دسامبر ۲۰۲۶");
  assert.doesNotMatch(formatDateFa("2026-12-01 12:00:00"), /آذر/);
});
