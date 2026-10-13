/**
 * src/api/translate.ts
 * Translation and theory share a versioned publication gate. Grammar stays lazy.
 * Theory may first check the short explanation used as its safe fallback.
 */

import { Hono } from "hono";
import type { AppEnv, AppVariables } from "../types.js";
import {
  getCachedTranslation,
  getQuestionById,
  isAiLockedForQuestion,
  updateGrammarCache,
} from "../db/queries.js";
import {
  analyzeGrammar,
  hasCompleteVocabularyCoverage,
} from "../lib/openai.js";
import type { VocabularySuggestion } from "../lib/openai.js";

import { getLearningContent, getTheoryContent, QUALITY_LABELS } from '../lib/content-quality.js';

const translate = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

// All three tabs can reveal the answer (verdict, explanation, theory). In exam
// mode they stay closed until the learner switches AI help on, so each route
// checks this before any cache read, DB lookup or OpenAI call.
const AI_LOCKED_BODY = { error: "AI assistance is off for this exam", aiLocked: true } as const;

// ── POST /api/translate/:questionId ─────────────────────────────────────────
// Tab 1 — ترجمه — loads immediately when the panel opens, including before
// the current question is answered (§19.2: practice and review modes; in exam
// mode only once the learner has switched AI help on).
translate.post("/:questionId", async (c) => {
  const questionId = Number(c.req.param("questionId"));
  if (!Number.isSafeInteger(questionId) || questionId < 1) return c.json({ error: "Invalid question" }, 400);
  const userId = c.get("userId");
  if (await isAiLockedForQuestion(c.env.DB, userId, questionId)) return c.json(AI_LOCKED_BODY, 403);
  const question = await getQuestionById(c.env.DB, questionId);
  if (!question) return c.json({ error: "Question not found" }, 404);
  const result = await getLearningContent(c.env, question, userId);
  return c.json({ questionId, lang: 'fa', ...result, qualityLabel: QUALITY_LABELS[result.qualityStatus], verdictVero: question.correct_answer === 1 });
});

translate.post("/:questionId/theory", async (c) => {
  const questionId = Number(c.req.param("questionId"));
  if (!Number.isSafeInteger(questionId) || questionId < 1) return c.json({ error: "Invalid question" }, 400);
  const userId = c.get("userId");
  if (await isAiLockedForQuestion(c.env.DB, userId, questionId)) return c.json(AI_LOCKED_BODY, 403);
  const question = await getQuestionById(c.env.DB, questionId);
  if (!question) return c.json({ error: "Question not found" }, 404);
  const result = await getTheoryContent(c.env, question, userId);
  return c.json({ questionId, ...result, qualityLabel: QUALITY_LABELS[result.qualityStatus as keyof typeof QUALITY_LABELS] });
});

// ── POST /api/translate/:questionId/grammar ──────────────────────────────────
// Tab 3 — گرامر و لغات — 📚 معلم گرامر
// Lazy: only called when the user taps this tab.
// Checks grammar_analysis + vocab_suggestions cache columns first.  §15.4: text-only.
translate.post("/:questionId/grammar", async (c) => {
  const questionId = Number(c.req.param("questionId"));
  const lang = "fa";
  const userId: number = c.get("userId" as never);
  if (await isAiLockedForQuestion(c.env.DB, userId, questionId)) return c.json(AI_LOCKED_BODY, 403);

  // The source text is required to verify that a cached vocabulary list covers
  // the whole sentence. Old prompt versions intentionally returned only 3–6
  // words, so grammar_analysis alone is not evidence that the cache is complete.
  const question = await getQuestionById(c.env.DB, questionId);
  if (!question) return c.json({ error: "Question not found" }, 404);

  const cached = await getCachedTranslation(c.env.DB, questionId, lang);
  if (
    cached &&
    cached.grammar_analysis &&
    cached.grammar_analysis.length > 10
  ) {
    let vocabSuggestions: VocabularySuggestion[] = [];
    try {
      if (cached.vocab_suggestions) {
        vocabSuggestions = JSON.parse(cached.vocab_suggestions);
      }
    } catch {
      vocabSuggestions = [];
    }
    if (hasCompleteVocabularyCoverage(question.text_it, vocabSuggestions)) {
      return c.json({
        questionId,
        grammarAnalysis: cached.grammar_analysis,
        vocabSuggestions,
        cached: true,
      });
    }
  }

  const result = await analyzeGrammar(c.env, question.text_it, c.env.DB, userId);

  await updateGrammarCache(
    c.env.DB,
    questionId,
    lang,
    result.grammar_analysis,
    JSON.stringify(result.vocab_suggestions)
  );

  return c.json({
    questionId,
    grammarAnalysis: result.grammar_analysis,
    vocabSuggestions: result.vocab_suggestions,
    cached: false,
  });
});


export { translate };
