/**
 * src/api/admin.ts
 * Admin Web Dashboard REST API routes.
 * Guarded by admin check (ALLOWED_TELEGRAM_USER_IDS).
 */

import { Hono } from "hono";
import type { AppEnv, AppVariables } from "../types.js";
import {
  getAdminOverviewStats,
  getAdminUsersList,
  getUserActivityTimeline,
  getAdminRecentEvents,
  setUserApproval,
  getApiCostByAction,
} from "../db/queries.js";
import { checkAllowList } from "../lib/auth.js";

const admin = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

// Middleware: Admin auth check
admin.use("*", async (c, next) => {
  const telegramUserId: number = c.get("telegramUserId" as never);
  try {
    checkAllowList(telegramUserId, c.env.ALLOWED_TELEGRAM_USER_IDS);
  } catch (err) {
    return c.json({ error: "Access denied. Only primary admins can access the management panel." }, 403);
  }
  await next();
});

// GET /api/admin/overview
admin.get("/overview", async (c) => {
  const stats = await getAdminOverviewStats(c.env.DB);
  return c.json(stats);
});

// GET /api/admin/users?search=&status=
// §18.6: search and status are forwarded directly to getAdminUsersList which
// runs a server-side SQL LIKE query — zero in-memory filtering on this path.
admin.get("/users", async (c) => {
  const search = c.req.query("search");
  const statusFilter = c.req.query("status");
  const users = await getAdminUsersList(c.env.DB, search, statusFilter);
  return c.json({ users });
});

// POST /api/admin/users/:id/status
admin.post("/users/:id/status", async (c) => {
  const targetUserId = Number(c.req.param("id"));
  const body = (await c.req.json().catch(() => ({}))) as { isApproved?: number };
  
  if (typeof body.isApproved !== "number" || ![-1, 0, 1].includes(body.isApproved)) {
    return c.json({ error: "Invalid isApproved value (must be -1, 0, or 1)" }, 400);
  }

  await setUserApproval(c.env.DB, targetUserId, body.isApproved);
  return c.json({ ok: true, userId: targetUserId, isApproved: body.isApproved });
});

// GET /api/admin/users/:id/activity
admin.get("/users/:id/activity", async (c) => {
  const targetUserId = Number(c.req.param("id"));
  const timeline = await getUserActivityTimeline(c.env.DB, targetUserId);
  return c.json(timeline);
});

// GET /api/admin/events
admin.get("/events", async (c) => {
  const events = await getAdminRecentEvents(c.env.DB, 50);
  return c.json({ events });
});

// GET /api/admin/cost
// §18.4: API cost breakdown by action — today / this 7 days / all-time.
admin.get("/cost", async (c) => {
  const breakdown = await getApiCostByAction(c.env.DB);
  return c.json({ breakdown });
});

export { admin };
