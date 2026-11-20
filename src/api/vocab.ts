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

/** A word or short phrase; longer input only adds OpenAI tokens. */
const MAX_TERM_LENGTH = 80;

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
  const userId: number = c.get("userId" as never);
  const body = (await c.req.json().catch(() => null)) as { termIt?: unknown } | null;
  const termIt = typeof body?.termIt === "string" ? body.termIt.trim() : "";
  if (!termIt || termIt.length > MAX_TERM_LENGTH) {
    return c.json({ error: `termIt is required (at most ${MAX_TERM_LENGTH} characters)` }, 400);
  }

  // db + userId: logs the call against the user, which is what the AI budget counts.
  const suggestion = await suggestVocabTranslation(c.env, termIt, c.env.DB, userId);
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
  const body = (await c.req.json().catch(() => null)) as {
    correct?: unknown;
    currentIntervalDays?: unknown;
  } | null;
  const current = body?.currentIntervalDays ?? 1;

  if (
    !Number.isSafeInteger(itemId) ||
    itemId < 1 ||
    typeof body?.correct !== "boolean" ||
    typeof current !== "number" ||
    !Number.isInteger(current) ||
    current < 1 ||
    current > 90
  ) {
    return c.json({ error: "a boolean correct and an interval of 1–90 days are required" }, 400);
  }

  const { intervalDays, nextReviewAt } = nextReview(current, body.correct);

  // Scoped by owner in SQL: a foreign or missing id changes no row.
  if (!(await updateVocabSRS(c.env.DB, userId, itemId, intervalDays, nextReviewAt))) {
    return c.json({ error: "Vocab item not found" }, 404);
  }
  return c.json({ intervalDays, nextReviewAt });
});

export { vocab };
