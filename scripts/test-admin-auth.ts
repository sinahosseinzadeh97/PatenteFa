/** Security checks for every bot/admin entry point used by private messaging. */
import assert from "node:assert/strict";
import { checkAllowList } from "../src/lib/auth.js";
import { handleUpdate, isAdminActor, isAdminChat } from "../src/bot/commands.js";

const ADMIN = 5551234;
const CUSTOMER = 777888999;
const allowedIds = `${ADMIN}, 4442222`;

assert.equal(isAdminActor(ADMIN, allowedIds), true);
assert.equal(isAdminActor(CUSTOMER, allowedIds), false);
assert.equal(isAdminActor(CUSTOMER, "*"), false);
assert.equal(isAdminActor(CUSTOMER, ""), false);

assert.equal(
  isAdminChat(ADMIN, ADMIN, { allowedIds, logChannelId: "@patente_fa_logs" }),
  true
);
assert.equal(
  isAdminChat(CUSTOMER, CUSTOMER, { allowedIds, logChannelId: "@patente_fa_logs" }),
  false
);

// A wildcard is not a valid admin configuration. Admin authorization must
// always identify a concrete Telegram account.
assert.throws(() => checkAllowList(CUSTOMER, "*"));
assert.throws(() => checkAllowList(CUSTOMER, ""));
assert.doesNotThrow(() => checkAllowList(ADMIN, allowedIds));

async function verifyBotGuards(): Promise<void> {
  let dbTouched = false;
  const fakeDb = {
    prepare() {
      dbTouched = true;
      throw new Error("unauthorized bot action reached D1");
    },
  };
  const requests: Array<{ url: string; body: Record<string, unknown> }> = [];
  const originalFetch = globalThis.fetch;

  try {
    globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
      requests.push({
        url: String(input),
        body: JSON.parse(String(init?.body || "{}")),
      });
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }) as typeof fetch;

    const ctx = {
      db: fakeDb,
      token: "test-token",
      allowedIds,
      logChannelId: "@patente_fa_logs",
      miniAppUrl: "https://example.test/app",
      kv: {
        get: async () => null,
        put: async () => undefined,
        delete: async () => undefined,
      },
    } as unknown as Parameters<typeof handleUpdate>[1];

    await handleUpdate(
      {
        callback_query: {
          id: "unauthorized-callback",
          from: { id: CUSTOMER, first_name: "Customer" },
          data: `approve_user:${CUSTOMER}`,
          message: { chat: { id: -1001234567890 }, message_id: 1 },
        },
      },
      ctx
    );
    assert.equal(dbTouched, false);
    assert.match(String(requests.at(-1)?.body.text), /دسترسی مدیریت ندارید/);

    await handleUpdate(
      {
        message: {
          message_id: 2,
          from: { id: CUSTOMER, first_name: "Customer" },
          chat: { id: CUSTOMER },
          text: `/approve ${CUSTOMER}`,
        },
      },
      ctx
    );
    assert.equal(dbTouched, false);
    assert.equal(requests.at(-1)?.body.chat_id, CUSTOMER);
    assert.match(String(requests.at(-1)?.body.text), /دسترسی مدیریت ندارید/);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

verifyBotGuards()
  .then(() => console.log("✓ admin authorization: all checks passed"))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
