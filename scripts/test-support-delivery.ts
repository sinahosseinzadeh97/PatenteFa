/**
 * Admin private-message delivery self-check.
 *
 * Guarantees that the Mini App copy is persisted before Telegram is attempted,
 * that a transient Telegram failure does not erase the in-app message, and
 * that the Bot API receives only the resolved target user's Telegram id.
 */
import assert from "node:assert/strict";
import { persistThenDeliverSupportReply } from "../src/lib/support-delivery.js";
import { sendSupportReply } from "../src/lib/telegram.js";

async function main(): Promise<void> {
const order: string[] = [];
const delivered = await persistThenDeliverSupportReply(
  async () => {
    order.push("persist");
  },
  async () => {
    order.push("telegram");
    return true;
  }
);
assert.equal(delivered, true);
assert.deepEqual(order, ["persist", "telegram"]);

const telegramFailureOrder: string[] = [];
const telegramFailed = await persistThenDeliverSupportReply(
  async () => {
    telegramFailureOrder.push("persist");
  },
  async () => {
    telegramFailureOrder.push("telegram");
    throw new Error("temporary network failure");
  }
);
assert.equal(telegramFailed, false);
assert.deepEqual(telegramFailureOrder, ["persist", "telegram"]);

let attemptedAfterPersistenceFailure = false;
await assert.rejects(
  persistThenDeliverSupportReply(
    async () => {
      throw new Error("D1 unavailable");
    },
    async () => {
      attemptedAfterPersistenceFailure = true;
      return true;
    }
  ),
  /D1 unavailable/
);
assert.equal(attemptedAfterPersistenceFailure, false);

const originalFetch = globalThis.fetch;
try {
  let requestUrl = "";
  let requestBody: Record<string, unknown> = {};
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    requestUrl = String(input);
    requestBody = JSON.parse(String(init?.body || "{}"));
    return new Response(JSON.stringify({ ok: true, result: { message_id: 1 } }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;

  assert.equal(await sendSupportReply("secret-token", 987654321, "<سلام & تست>"), true);
  assert.match(requestUrl, /\/botsecret-token\/sendMessage$/);
  assert.equal(requestBody.chat_id, 987654321);
  assert.match(String(requestBody.text), /&lt;سلام &amp; تست&gt;/);
  assert.doesNotMatch(String(requestBody.text), /<سلام & تست>/);

  // Treat Telegram's application-level error as a failed delivery even when
  // an intermediary returns HTTP 200.
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ ok: false, description: "bot was blocked" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })) as typeof fetch;
  assert.equal(await sendSupportReply("secret-token", 987654321, "پیام"), false);

  globalThis.fetch = (async () => {
    throw new Error("network down");
  }) as typeof fetch;
  assert.equal(await sendSupportReply("secret-token", 987654321, "پیام"), false);
} finally {
  globalThis.fetch = originalFetch;
}

console.log("✓ admin support delivery: all checks passed");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
