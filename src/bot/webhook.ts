/**
 * src/bot/webhook.ts
 * Telegram webhook handler — validates secret token and dispatches to commands.
 */

import { Hono } from "hono";
import type { AppEnv } from "../types.js";
import { handleUpdate } from "./commands.js";

const webhook = new Hono<{ Bindings: AppEnv }>();

const handleWebhook = async (c: any) => {
  // Validate the webhook secret token
  const secret = c.req.header("X-Telegram-Bot-Api-Secret-Token");
  if (!secret || secret !== c.env.TELEGRAM_WEBHOOK_SECRET) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const update = await c.req.json();

  // Process update without blocking the response (Telegram expects 200 fast)
  c.executionCtx.waitUntil(
    handleUpdate(update, {
      db: c.env.DB,
      token: c.env.TELEGRAM_BOT_TOKEN,
      allowedIds: c.env.ALLOWED_TELEGRAM_USER_IDS,
      logChannelId: c.env.LOG_CHANNEL_ID || "@patente_fa_logs",
      miniAppUrl: c.env.MINI_APP_URL,
      kv: c.env.KV,
    })
  );

  return c.json({ ok: true });
};

webhook.post("/", handleWebhook);
webhook.post("/telegram", handleWebhook);

export { webhook };
