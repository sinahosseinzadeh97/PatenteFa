/**
 * src/api/translate.ts
 * Translation API — cache-first, OpenAI on miss.
 * §15.3: three independent lazy endpoints — translation, theory, grammar.
 *        Each has its own token budget and cache column; opening one tab
 *        never triggers the other two.
 */

import { Hono } from "hono";
import type { AppEnv, AppVariables } from "../types.js";
import {
  getCachedTranslation,
  getQuestionById,
  insertTranslation,
  updateTheoryCache,
  updateGrammarCache,
} from "../db/queries.js";
import { translateQuestion, explainTheory, analyzeGrammar } from "../lib/openai.js";

const translate = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

// ── POST /api/translate/:questionId ─────────────────────────────────────────
// Tab 1 — ترجمه — existing §14.1 endpoint, unchanged behaviour.
// Loads immediately when the panel opens.
translate.post("/:questionId", async (c) => {
  const questionId = Number(c.req.param("questionId"));
  const lang = "fa";

  // §19.2: Always fetch the question row so we can include correct_answer in the
  // response. It's a single PK lookup (indexed), effectively free, and avoids
  // a two-path design where cache hits omit the verdict.
  const question = await getQuestionById(c.env.DB, questionId);
  if (!question) return c.json({ error: "Question not found" }, 404);

  // §14.1: cache-first — trust only if translated_text is present and substantial.
  const cached = await getCachedTranslation(c.env.DB, questionId, lang);
  if (cached && cached.translated_text && cached.translated_text.length > 10) {
    return c.json({
      questionId,
      lang,
      translatedText: cached.translated_text,
      explanation: cached.explanation,
      // §19.2: verdict badge — true = VERO, false = FALSO
      verdictVero: question.correct_answer === 1,
      cached: true,
    });
  }

  const userId: number | undefined = c.get("userId" as never);

  // §14.2 / §16.7: resolve image_url to an absolute URL for OpenAI vision.
  let resolvedImageUrl: string | null = null;
  if (question.image_url) {
    if (question.image_url.startsWith("http")) {
      resolvedImageUrl = question.image_url;
    } else {
      const base = (c.env.MINI_APP_URL ?? "").replace(/\/$/, "");
      resolvedImageUrl = `${base}${question.image_url}`;
    }
  }

  try {
    const result = await translateQuestion(
      c.env,
      question.text_it,
      question.correct_answer,
      resolvedImageUrl,
      c.env.DB,
      userId
    );

    await insertTranslation(c.env.DB, questionId, lang, result.translated_text, result.explanation);

    return c.json({
      questionId,
      lang,
      translatedText: result.translated_text,
      explanation: result.explanation,
      // §19.2: verdict badge — true = VERO, false = FALSO
      verdictVero: question.correct_answer === 1,
      cached: false,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`[translate] questionId=${questionId} error: ${msg}`);
    return c.json({ error: msg }, 500);
  }
});

// ── POST /api/translate/:questionId/theory ───────────────────────────────────
// Tab 2 — توضیح کامل تئوری — 🎓 مربی تئوری
// Lazy: only called when the user taps this tab.
// Checks theory_text cache column first.  §15.4: text-only, no vision.
translate.post("/:questionId/theory", async (c) => {
  const questionId = Number(c.req.param("questionId"));
  const lang = "fa";

  const cached = await getCachedTranslation(c.env.DB, questionId, lang);
  if (cached && cached.theory_text && cached.theory_text.length > 10) {
    return c.json({
      questionId,
      theoryText: cached.theory_text,
      cached: true,
    });
  }

  const question = await getQuestionById(c.env.DB, questionId);
  if (!question) return c.json({ error: "Question not found" }, 404);

  const userId: number | undefined = c.get("userId" as never);
  const result = await explainTheory(
    c.env,
    question.text_it,
    question.correct_answer,
    c.env.DB,
    userId
  );

  await updateTheoryCache(c.env.DB, questionId, lang, result.theory_text);

  return c.json({
    questionId,
    theoryText: result.theory_text,
    cached: false,
  });
});

// ── POST /api/translate/:questionId/grammar ──────────────────────────────────
// Tab 3 — گرامر و لغات — 📚 معلم گرامر
// Lazy: only called when the user taps this tab.
// Checks grammar_analysis + vocab_suggestions cache columns first.  §15.4: text-only.
translate.post("/:questionId/grammar", async (c) => {
  const questionId = Number(c.req.param("questionId"));
  const lang = "fa";

  const cached = await getCachedTranslation(c.env.DB, questionId, lang);
  if (
    cached &&
    cached.grammar_analysis &&
    cached.grammar_analysis.length > 10
  ) {
    let vocabSuggestions: Array<{ term_it: string; term_fa: string }> = [];
    try {
      if (cached.vocab_suggestions) {
        vocabSuggestions = JSON.parse(cached.vocab_suggestions);
      }
    } catch {
      vocabSuggestions = [];
    }
    return c.json({
      questionId,
      grammarAnalysis: cached.grammar_analysis,
      vocabSuggestions,
      cached: true,
    });
  }

  const question = await getQuestionById(c.env.DB, questionId);
  if (!question) return c.json({ error: "Question not found" }, 404);

  const userId: number | undefined = c.get("userId" as never);
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
