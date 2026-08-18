/**
 * src/api/tutor.ts
 * AI Exam Tutor API routes — explain wrong answers & interactive chat.
 * Mounted at /api/tutor/* in src/index.ts.
 */

import { Hono } from "hono";
import type { AppEnv, AppVariables } from "../types.js";
import {
  getSessionById,
  getSessionAnswers,
  getQuestionById,
  getCachedTranslation,
  getSignCardForImage,
  insertTranslation,
} from "../db/queries.js";
import { translateQuestion, chatWithTutor, resolveImageUrl, type TutorChatMessage } from "../lib/openai.js";

const tutor = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();
const MAX_TUTOR_HISTORY_MESSAGES = 6;
const MAX_TUTOR_MESSAGE_LENGTH = 2_000;

// ── POST /api/tutor/explain-wrong ─────────────────────────────────────────────
tutor.post("/explain-wrong", async (c) => {
  const userId: number = c.get("userId" as never);
  const body = await c.req.json<{ sessionId: number }>();
  const sessionId = Number(body.sessionId);

  if (!sessionId) {
    return c.json({ error: "Missing sessionId" }, 400);
  }

  const session = await getSessionById(c.env.DB, sessionId);
  if (!session || session.user_id !== userId) {
    return c.json({ error: "Session not found or access denied" }, 404);
  }

  const answers = await getSessionAnswers(c.env.DB, sessionId);
  const wrongAnswers = answers.filter((a) => a.is_correct === 0);

  if (wrongAnswers.length === 0) {
    return c.json({
      sessionId,
      wrongCount: 0,
      questions: [],
      message: "تبریک! شما هیچ سوال غلطی در این آزمون نداشتید.",
    });
  }

  const wrongDetails = [];

  for (const a of wrongAnswers) {
    const q = await getQuestionById(c.env.DB, a.question_id);
    if (!q) continue;

    // Check cached translation / explanation
    // Regenerate when the explanation is missing too — migration 0007 cleared
    // explanations produced by the old vague prompt.
    let trans = await getCachedTranslation(c.env.DB, q.id, "fa");
    if (!trans || !trans.explanation) {
      try {
        // §20.1: must be absolute — passing the stored relative path made OpenAI
        // reject the request, so every sign question silently fell into the catch
        // below and rendered with an empty translation.
        const generated = await translateQuestion(
          c.env,
          q.text_it,
          q.correct_answer,
          resolveImageUrl(c.env.MINI_APP_URL, q.image_url),
          c.env.DB,
          userId,
          q.image_url ? await getSignCardForImage(c.env.DB, q.image_url) : null,
          trans?.translated_text && trans.translated_text.length > 10
            ? trans.translated_text
            : null
        );
        await insertTranslation(
          c.env.DB,
          q.id,
          "fa",
          generated.translated_text,
          generated.explanation
        );
        trans = await getCachedTranslation(c.env.DB, q.id, "fa");
      } catch (err) {
        console.error("Failed to generate translation for tutor:", err);
      }
    }

    wrongDetails.push({
      position: a.position,
      questionId: q.id,
      textIt: q.text_it,
      imageUrl: q.image_url,
      correctAnswer: q.correct_answer,
      userAnswer: a.user_answer,
      translatedText: trans?.translated_text ?? "",
      explanation: trans?.explanation ?? "",
    });
  }

  return c.json({
    sessionId,
    wrongCount: wrongDetails.length,
    questions: wrongDetails,
  });
});

// ── POST /api/tutor/chat ──────────────────────────────────────────────────────
tutor.post("/chat", async (c) => {
  const userId: number = c.get("userId" as never);
  const body = (await c.req.json().catch(() => null)) as Record<string, unknown> | null;
  if (
    !body ||
    typeof body.sessionId !== "number" ||
    !Number.isInteger(body.sessionId) ||
    typeof body.questionId !== "number" ||
    !Number.isInteger(body.questionId) ||
    typeof body.userMessage !== "string" ||
    !body.userMessage.trim() ||
    body.userMessage.length > MAX_TUTOR_MESSAGE_LENGTH
  ) {
    return c.json({ error: "Invalid tutor chat request" }, 400);
  }

  if (
    body.history !== undefined &&
    (!Array.isArray(body.history) || body.history.length > MAX_TUTOR_HISTORY_MESSAGES)
  ) {
    return c.json({ error: "Invalid tutor chat history" }, 400);
  }

  const history: TutorChatMessage[] = [];
  for (const candidate of body.history ?? []) {
    if (!candidate || typeof candidate !== "object") {
      return c.json({ error: "Invalid tutor chat history" }, 400);
    }
    const message = candidate as Record<string, unknown>;
    if (
      (message.role !== "user" && message.role !== "assistant") ||
      typeof message.content !== "string" ||
      !message.content.trim() ||
      message.content.length > MAX_TUTOR_MESSAGE_LENGTH
    ) {
      return c.json({ error: "Invalid tutor chat history" }, 400);
    }
    history.push({ role: message.role, content: message.content.trim() });
  }

  const session = await getSessionById(c.env.DB, body.sessionId);
  if (!session || session.user_id !== userId) {
    return c.json({ error: "Session not found or access denied" }, 404);
  }

  const answers = await getSessionAnswers(c.env.DB, body.sessionId);
  const answerRow = answers.find((a) => a.question_id === body.questionId);
  const q = await getQuestionById(c.env.DB, body.questionId);

  if (!q || !answerRow) {
    return c.json({ error: "Question not found in this session" }, 404);
  }
  if (answerRow?.user_answer == null && !session.finished_at) {
    return c.json({ error: "Answer required before tutor chat", answerRequired: true }, 409);
  }

  const responseText = await chatWithTutor(
    c.env,
    {
      questionId: q.id,
      textIt: q.text_it,
      correctAnswer: q.correct_answer,
      userAnswer: answerRow.user_answer,
    },
    history,
    body.userMessage.trim(),
    c.env.DB,
    userId
  );

  return c.json({ response: responseText });
});

export { tutor };
