/**
 * src/api/vocab.ts
 * Vocabulary CRUD + SRS review API.
 */

import { Hono } from "hono";
import type { AppEnv, AppVariables } from "../types.js";
import {
  insertVocabItem,
  getVocabItems,
  getDueVocabItems,
  updateVocabSRS,
} from "../db/queries.js";
import { suggestVocabTranslation } from "../lib/openai.js";
import { nextReview } from "../lib/srs.js";

const vocab = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

// GET /api/vocab — list all vocab items for the user
vocab.get("/", async (c) => {
  const userId: number = c.get("userId" as never);
  const items = await getVocabItems(c.env.DB, userId);
  const dueItems = await getDueVocabItems(c.env.DB, userId);
  const dueSet = new Set(dueItems.map((i) => i.id));

  return c.json({
    items: items.map((item) => ({ ...item, isDue: dueSet.has(item.id) })),
    dueCount: dueItems.length,
  });
});

// POST /api/vocab/suggest — get a GPT suggestion for a Persian translation
vocab.post("/suggest", async (c) => {
  const body = await c.req.json<{ termIt: string }>();
  if (!body.termIt?.trim()) return c.json({ error: "termIt is required" }, 400);

  const suggestion = await suggestVocabTranslation(c.env, body.termIt.trim());
  return c.json({ suggestion });
});

// POST /api/vocab — save a new vocab item
vocab.post("/", async (c) => {
  const userId: number = c.get("userId" as never);
  const body = await c.req.json<{
    termIt: string;
    termFa: string;
    note?: string;
    sourceQuestionId?: number;
  }>();

  if (!body.termIt?.trim() || !body.termFa?.trim()) {
    return c.json({ error: "termIt and termFa are required" }, 400);
  }

  const item = await insertVocabItem(
    c.env.DB,
    userId,
    body.termIt.trim(),
    body.termFa.trim(),
    body.note ?? null,
    body.sourceQuestionId ?? null
  );

  return c.json(item, 201);
});

// POST /api/vocab/:id/review — update SRS after a review attempt
vocab.post("/:id/review", async (c) => {
  const userId: number = c.get("userId" as never);
  const itemId = Number(c.req.param("id"));
  const body = await c.req.json<{ correct: boolean; currentIntervalDays: number }>();

  const { intervalDays, nextReviewAt } = nextReview(
    body.currentIntervalDays ?? 1,
    body.correct
  );

  await updateVocabSRS(c.env.DB, itemId, intervalDays, nextReviewAt);
  return c.json({ intervalDays, nextReviewAt });
});

export { vocab };
