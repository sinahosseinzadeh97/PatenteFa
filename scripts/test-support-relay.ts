/**
 * scripts/test-support-relay.ts
 * Self-check for support-relay routing. Run: npx tsx scripts/test-support-relay.ts
 *
 * Guards the one decision that fails silently: which side of the relay a
 * message came from. Misclassify a customer as an admin and their message is
 * swallowed as a reply instead of reaching the channel.
 */
import assert from "node:assert/strict";
import { isAdminChat } from "../src/bot/commands.js";

const CHANNEL = "@patente_fa_logs";
const ADMIN = 5551234;
const CUSTOMER = 777888999;
const ctx = { logChannelId: CHANNEL, allowedIds: `${ADMIN}, 4442222` };

// The log channel is the admin side, however the id arrives.
assert.equal(isAdminChat(CHANNEL, 0, ctx), true);
// Numeric channel ids (what Telegram actually sends for channel_post).
assert.equal(isAdminChat(-1001234567890, 0, { ...ctx, logChannelId: "-1001234567890" }), true);
assert.equal(isAdminChat("-1001234567890", 0, { ...ctx, logChannelId: -1001234567890 as unknown as string }), true);

// An allow-listed admin DMing the bot directly is also the admin side.
assert.equal(isAdminChat(ADMIN, ADMIN, ctx), true);
assert.equal(isAdminChat(4442222, 4442222, ctx), true);

// A customer is never the admin side.
assert.equal(isAdminChat(CUSTOMER, CUSTOMER, ctx), false);

// Fail-closed: no allow-list configured means nobody is an admin by id.
assert.equal(isAdminChat(CUSTOMER, CUSTOMER, { logChannelId: CHANNEL, allowedIds: "" }), false);
assert.equal(
  isAdminChat(CUSTOMER, CUSTOMER, { logChannelId: CHANNEL, allowedIds: undefined as unknown as string }),
  false
);

// The bug this exists to prevent: checkAllowList() honours "*", which would
// classify every customer as an admin and silently disable the inbound leg.
assert.equal(isAdminChat(CUSTOMER, CUSTOMER, { logChannelId: CHANNEL, allowedIds: "*" }), false);
assert.equal(isAdminChat(CUSTOMER, CUSTOMER, { logChannelId: CHANNEL, allowedIds: "*, 5551234" }), false);

// Whitespace and junk entries in the allow-list don't grant access.
assert.equal(isAdminChat(CUSTOMER, CUSTOMER, { logChannelId: CHANNEL, allowedIds: " , ,, " }), false);
assert.equal(isAdminChat(ADMIN, ADMIN, { logChannelId: CHANNEL, allowedIds: `  ${ADMIN}  ` }), true);
// A customer whose id merely *contains* an admin id is not an admin.
assert.equal(isAdminChat(15551234, 15551234, ctx), false);

console.log("✓ support relay routing: all checks passed");
