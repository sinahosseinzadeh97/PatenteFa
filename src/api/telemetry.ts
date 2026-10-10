/**
 * src/api/telemetry.ts
 * Telemetry endpoint for client event & heartbeat tracking.
 */

import { Hono } from "hono";
import type { AppEnv, AppVariables } from "../types.js";
import { logUserEvent } from "../db/queries.js";

const telemetry = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

const allowedEventTypes = new Set(["screen_view", "interaction", "active_time", "heartbeat"]);

function shortText(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized ? normalized.slice(0, maxLength) : undefined;
}

function finiteNumber(value: unknown, min: number, max: number): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  return Math.min(max, Math.max(min, Math.round(value)));
}

/** Keep telemetry useful without accepting arbitrary form/user content. */
function sanitizeEventData(eventType: string, value: unknown): Record<string, unknown> {
  const source = value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
  const screen = shortText(source.screen, 40) ?? "unknown";

  if (eventType === "interaction") {
    return {
      screen,
      control: shortText(source.control, 120) ?? "unknown",
      action: shortText(source.action, 80),
      label: shortText(source.label, 80),
      xPct: finiteNumber(source.xPct, 0, 100),
      yPct: finiteNumber(source.yPct, 0, 100),
      viewportWidth: finiteNumber(source.viewportWidth, 240, 4000),
      viewportHeight: finiteNumber(source.viewportHeight, 240, 4000),
    };
  }

  return {
    screen,
    reason: shortText(source.reason, 30),
  };
}

telemetry.post("/event", async (c) => {
  const userId: number = c.get("userId" as never);
  const body = (await c.req.json().catch(() => ({}))) as {
    eventType?: string;
    eventData?: unknown;
    durationSeconds?: number;
  };

  const eventType = body.eventType || "heartbeat";
  if (!allowedEventTypes.has(eventType)) {
    return c.json({ error: "Unsupported telemetry event type" }, 400);
  }

  const canCarryDuration = eventType === "active_time" || eventType === "heartbeat";
  const durationSeconds = canCarryDuration
    ? finiteNumber(body.durationSeconds, 0, 300) ?? 0
    : 0;
  const eventData = sanitizeEventData(eventType, body.eventData);

  if (userId) {
    c.executionCtx.waitUntil(
      logUserEvent(c.env.DB, userId, eventType, eventData, durationSeconds).catch((err) => {
        console.error("Telemetry event logging error:", err);
      })
    );
  }

  return c.json({ ok: true });
});

export { telemetry };
