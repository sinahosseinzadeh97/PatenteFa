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
  /** §20.1: model for image (sign/diagram) questions. Default gpt-4o — mini misreads signs. */
  OPENAI_VISION_MODEL?: string;
  ALLOWED_TELEGRAM_USER_IDS: string;
  LOG_CHANNEL_ID: string;
  MINI_APP_URL: string;
  DEFAULT_TIMEZONE: string;
}

/** Hono context variable map — values stored via c.set() / c.get() */
export interface AppVariables {
  userId: number;
  telegramUserId: number;
  /** Milliseconds left in the free trial; unset for approved (paid/admin) users. */
  trialMsLeft?: number;
}
