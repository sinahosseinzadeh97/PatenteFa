/**
 * src/api/reels.ts
 * Endpoint for the Patente Reels vertical feed.
 * Mounted at GET /api/reels/feed in src/index.ts.
 */

import { Hono } from "hono";
import type { AppEnv, AppVariables } from "../types.js";
import { getReelsFeedItems } from "../db/queries.js";

const reels = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

// GET /api/reels/feed
reels.get("/feed", async (c) => {
  const userId = c.get("userId");
  const limitParam = c.req.query("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : 20;

  const items = await getReelsFeedItems(c.env.DB, userId, limit);
  return c.json({ items });
});

export { reels };
