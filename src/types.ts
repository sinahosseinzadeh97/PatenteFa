/**
 * src/types.ts
 * Shared types: AppEnv and Hono context variable map.
 */

export interface AppEnv {
  // Cloudflare bindings (from wrangler.jsonc)
  DB: D1Database;
  KV: KVNamespace;
  SIGNS: R2Bucket;
  // Secrets / env vars
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_WEBHOOK_SECRET: string;
  OPENAI_API_KEY: string;
  OPENAI_MODEL: string;
  ALLOWED_TELEGRAM_USER_IDS: string;
  LOG_CHANNEL_ID: string;
  MINI_APP_URL: string;
  DEFAULT_TIMEZONE: string;
}

/** Hono context variable map — values stored via c.set() / c.get() */
export interface AppVariables {
  userId: number;
  telegramUserId: number;
}
