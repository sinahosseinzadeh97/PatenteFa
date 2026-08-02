/**
 * src/api/telemetry.ts
 * Telemetry endpoint for client event & heartbeat tracking.
 */

import { Hono } from "hono";
import type { AppEnv, AppVariables } from "../types.js";
import { logUserEvent } from "../db/queries.js";

const telemetry = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

telemetry.post("/event", async (c) => {
  const userId: number = c.get("userId" as never);
  const body = (await c.req.json().catch(() => ({}))) as {
    eventType?: string;
    eventData?: object | string;
    durationSeconds?: number;
  };

  const eventType = body.eventType || "heartbeat";
  const durationSeconds = typeof body.durationSeconds === "number" ? body.durationSeconds : 0;

  if (userId) {
    c.executionCtx.waitUntil(
      logUserEvent(c.env.DB, userId, eventType, body.eventData, durationSeconds).catch((err) => {
        console.error("Telemetry event logging error:", err);
      })
    );
  }

  return c.json({ ok: true });
});

export { telemetry };
