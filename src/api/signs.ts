/**
 * src/api/signs.ts
 * Road-sign flashcard API — returns all questions with associated sign images.
 * Mounted at GET /api/signs in src/index.ts.
 *
 * Auth: handled by the shared API middleware in src/index.ts (verifyInitData).
 * The sign list is the same for all users; SRS state is stored client-side
 * in localStorage so no per-user DB rows are needed for the MVP.
 */

import { Hono } from "hono";
import type { AppEnv, AppVariables } from "../types.js";
import { getSignQuestions } from "../db/queries.js";

const signs = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

// GET /api/signs
// Returns all questions that have an image_url (road-sign questions).
signs.get("/", async (c) => {
  // Auth is already verified by the shared middleware in index.ts.
  const questions = await getSignQuestions(c.env.DB);
  return c.json({ questions });
});

export { signs };
