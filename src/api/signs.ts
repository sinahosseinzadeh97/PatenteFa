/**
 * src/api/signs.ts
 * Road-sign teaching API — one card per sign, with what the exam asserts is true
 * about it. Mounted at GET /api/signs in src/index.ts.
 *
 * تابلوها teaches; it does not quiz. The true/false format lives in the exam,
 * which draws from the full question bank independently of this endpoint.
 *
 * Auth: handled by the shared API middleware in src/index.ts (verifyInitData).
 * The sign list is the same for all users; SRS state is stored client-side
 * in localStorage so no per-user DB rows are needed for the MVP.
 */

import { Hono } from "hono";
import type { AppEnv, AppVariables } from "../types.js";
import { getSignCards } from "../db/queries.js";

const signs = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

// GET /api/signs
// Returns one entry per distinct sign image with its true statements.
signs.get("/", async (c) => {
  // Auth is already verified by the shared middleware in index.ts.
  const signCards = await getSignCards(c.env.DB);
  return c.json({ signs: signCards });
});

export { signs };
