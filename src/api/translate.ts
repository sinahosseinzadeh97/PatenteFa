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
  getSignCardForImage,
  insertTranslation,
  updateTheoryCache,
  updateGrammarCache,
} from "../db/queries.js";
import {
  translateQuestion,
  explainTheory,
  analyzeGrammar,
  hasCompleteVocabularyCoverage,
  resolveImageUrl,
} from "../lib/openai.js";
import type { VocabularySuggestion } from "../lib/openai.js";

const translate = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

// ── POST /api/translate/:questionId ─────────────────────────────────────────
// Tab 1 — ترجمه — loads immediately when the panel opens, including before
// the current question is answered (explicit study-mode choice from §19.2).
translate.post("/:questionId", async (c) => {
  const questionId = Number(c.req.param("questionId"));
  const lang = "fa";

  // §19.2: Always fetch the question row so we can include correct_answer in the
  // response. It's a single PK lookup (indexed), effectively free, and avoids
  // a two-path design where cache hits omit the verdict.
  const question = await getQuestionById(c.env.DB, questionId);
  if (!question) return c.json({ error: "Question not found" }, 404);
  const userId: number = c.get("userId" as never);

  // §14.1: cache-first — trust only if translated_text is present and substantial.
  // The explanation must be present too: migration 0007 nulled explanations
  // written by the old vague prompt, and those rows must regenerate.
  const cached = await getCachedTranslation(c.env.DB, questionId, lang);
  if (
    cached &&
    cached.translated_text &&
    cached.translated_text.length > 10 &&
    cached.explanation
  ) {
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

  const resolvedImageUrl = resolveImageUrl(c.env.MINI_APP_URL, question.image_url);

  // The sign in the picture is already known — don't make the model read it off
  // the pixels. See getSignCardForImage: it mirrors left/right often enough that
  // explanations were teaching the opposite rule.
  const sign = question.image_url
    ? await getSignCardForImage(c.env.DB, question.image_url)
    : null;

  try {
    const result = await translateQuestion(
      c.env,
      question.text_it,
      question.correct_answer,
      resolvedImageUrl,
      c.env.DB,
      userId,
      sign,
      cached?.translated_text && cached.translated_text.length > 10
        ? cached.translated_text
        : null
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
// Checks theory_text cache column first.  §20.1: vision when the question has an image.
translate.post("/:questionId/theory", async (c) => {
  const questionId = Number(c.req.param("questionId"));
  const lang = "fa";
  const userId: number = c.get("userId" as never);

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

  // §20.1: image questions need the picture here too — the sign IS the rule.
  const result = await explainTheory(
    c.env,
    question.text_it,
    question.correct_answer,
    c.env.DB,
    userId,
    resolveImageUrl(c.env.MINI_APP_URL, question.image_url),
    question.image_url ? await getSignCardForImage(c.env.DB, question.image_url) : null
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
