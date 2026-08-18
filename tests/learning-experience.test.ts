import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { renderExamScreen } from "../src/app/screens/exam.js";
import {
  analyzeGrammar,
  explainTheory,
  hasCompleteVocabularyCoverage,
  resolveImageUrl,
  signAnchorBlock,
  suggestVocabTranslation,
  translateQuestion,
  vocabularyCoverageTokens,
  type Env,
} from "../src/lib/openai.js";

const env: Env = {
  OPENAI_API_KEY: "test-key",
  OPENAI_MODEL: "test-model",
};

type OpenAIRequest = {
  max_tokens?: number;
  messages?: Array<{ role: string; content: unknown }>;
};

function responseWithContent(content: string): Response {
  return new Response(
    JSON.stringify({ choices: [{ message: { content } }] }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

test("the current question number is exposed as a prominent live badge", () => {
  const markup = renderExamScreen();
  const css = readFileSync("public/css/app.css", "utf8");
  const positionRule = css.match(/\.exam-position\s*\{([^}]*)\}/)?.[1] ?? "";

  assert.match(markup, /class="exam-position-badge"/);
  assert.match(markup, /id="exam-position"[^>]*aria-live="polite"/);
  assert.match(positionRule, /font-size:\s*1\.[2-9]\d*rem/);
  assert.match(positionRule, /font-weight:\s*(?:700|800|900)/);
  assert.match(positionRule, /color:\s*var\(--ink\)/);
  assert.doesNotMatch(positionRule, /var\(--ink-muted\)/);
});

test("translation explanations are prompted for first-read clarity", async (t) => {
  const requests: OpenAIRequest[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_input, init) => {
    const body = JSON.parse(String(init?.body)) as OpenAIRequest;
    requests.push(body);
    const system = String(body.messages?.[0]?.content ?? "");
    return system.includes("مترجم تخصصی")
      ? responseWithContent(JSON.stringify({ translated_text: "ترجمه ساده" }))
      : responseWithContent(JSON.stringify({ explanation: "توضیح ساده" }));
  };
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  await translateQuestion(env, "Il conducente deve rallentare.", 1);

  const explanationRequest = requests.find((request) =>
    String(request.messages?.[0]?.content ?? "").includes("توضیح‌دهنده")
  );
  const prompt = String(explanationRequest?.messages?.[0]?.content ?? "");

  assert.match(prompt, /بدون دانش قبلی|هیچ آشنایی قبلی/);
  assert.match(prompt, /واژه(?:‌| )های روزمره|زبان روزمره/);
  assert.match(prompt, /هر جمله.*یک مفهوم|یک مفهوم.*هر جمله/);
  assert.match(prompt, /مثال/);
  assert.ok((explanationRequest?.max_tokens ?? 0) >= 450);
});

test("a cached translation can regenerate only its explanation", async (t) => {
  const requests: OpenAIRequest[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_input, init) => {
    const body = JSON.parse(String(init?.body)) as OpenAIRequest;
    requests.push(body);
    return responseWithContent(JSON.stringify({ explanation: "توضیح تازه و ساده" }));
  };
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  const translateWithExistingText = translateQuestion as unknown as (
    ...args: unknown[]
  ) => Promise<{ translated_text: string; explanation: string }>;
  const result = await translateWithExistingText(
    env,
    "Il conducente deve rallentare.",
    1,
    null,
    undefined,
    undefined,
    null,
    "ترجمه تاییدشده قبلی"
  );

  assert.equal(requests.length, 1, "only the missing explanation should call OpenAI");
  assert.equal(result.translated_text, "ترجمه تاییدشده قبلی");
  assert.equal(result.explanation, "توضیح تازه و ساده");

  const routeSource = readFileSync("src/api/translate.ts", "utf8");
  assert.match(routeSource, /translateQuestion\([\s\S]*cached\?\.translated_text/);

  const tutorSource = readFileSync("src/api/tutor.ts", "utf8");
  const tutorTranslationCall = tutorSource.slice(
    tutorSource.indexOf("const generated = await translateQuestion"),
    tutorSource.indexOf("await insertTranslation")
  );
  assert.match(
    tutorTranslationCall,
    /trans\?\.translated_text/,
    "the tutor path must also preserve a valid cached translation"
  );
});

test("image-backed learning prompts keep the verified sign identity and usable image URL", async (t) => {
  const requests: OpenAIRequest[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_input, init) => {
    const body = JSON.parse(String(init?.body)) as OpenAIRequest;
    requests.push(body);
    const system = String(body.messages?.[0]?.content ?? "");
    if (system.includes("مترجم تخصصی")) {
      return responseWithContent(JSON.stringify({ translated_text: "ترجمه تصویری" }));
    }
    if (system.includes("توضیح‌دهنده")) {
      return responseWithContent(JSON.stringify({ explanation: "توضیح تصویری" }));
    }
    return responseWithContent("توضیح تئوری تصویری");
  };
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  const imageUrl = resolveImageUrl("https://example.test/app", "/images/signs/54.png");
  assert.equal(imageUrl, "https://example.test/images/signs/54.png");
  assert.equal(resolveImageUrl(undefined, "/images/signs/54.png"), null);
  assert.equal(resolveImageUrl("https://example.test/app", "https://cdn.test/54.png"), "https://cdn.test/54.png");

  const sign = {
    nameIt: "DARE PRECEDENZA",
    nameFa: "رعایت حق تقدم",
    meaningFa: "باید به خودروهای مسیر دیگر راه بدهید.",
  };
  assert.match(signAnchorBlock(sign), /DARE PRECEDENZA/);

  await translateQuestion(
    { ...env, OPENAI_VISION_MODEL: "vision-model" },
    "Il segnale raffigurato impone di dare la precedenza.",
    1,
    imageUrl,
    undefined,
    undefined,
    sign
  );
  await explainTheory(
    { ...env, OPENAI_VISION_MODEL: "vision-model" },
    "Il segnale raffigurato impone di dare la precedenza.",
    1,
    undefined,
    undefined,
    imageUrl,
    sign
  );

  const imageRequests = requests.filter((request) => Array.isArray(request.messages?.[1]?.content));
  assert.equal(imageRequests.length, 3);
  assert.equal(imageRequests[1]?.max_tokens, 600);
  assert.equal(imageRequests[2]?.max_tokens, 1100);
  assert.match(JSON.stringify(imageRequests), /DARE PRECEDENZA/);
});

test("theory explanations teach the rule step by step with a concrete example", async (t) => {
  let request: OpenAIRequest | undefined;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_input, init) => {
    request = JSON.parse(String(init?.body)) as OpenAIRequest;
    return responseWithContent("توضیح آزمایشی");
  };
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  await explainTheory(env, "Il conducente deve dare la precedenza.", 1);
  const prompt = String(request?.messages?.[0]?.content ?? "");

  assert.match(prompt, /بدون دانش قبلی|هیچ پیش‌زمینه/);
  assert.match(prompt, /قدم(?:‌| )به(?:‌| )قدم/);
  assert.match(prompt, /مثال ملموس|مثال واقعی/);
  assert.match(prompt, /وضعیت.*قانون.*نتیجه/s);
  assert.match(prompt, /قبل از پاسخ.*بررسی|پیش از نوشتن.*بررسی/s);
});

test("grammar scans a long sentence through its final vocabulary item and repairs omissions", async (t) => {
  const requests: OpenAIRequest[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_input, init) => {
    const body = JSON.parse(String(init?.body)) as OpenAIRequest;
    requests.push(body);

    if (requests.length === 1) {
      return responseWithContent(
        JSON.stringify({
          grammar_analysis: "تحلیل اولیه",
          vocab_suggestions: [
            {
              term_it: "conducente",
              term_fa: "راننده",
              part_of_speech: "other",
              infinitive: null,
            },
          ],
        })
      );
    }

    return responseWithContent(
      JSON.stringify({
        vocab_suggestions: [
          { term_it: "deve", term_fa: "باید", part_of_speech: "verb", infinitive: "dovere" },
          { term_it: "rallentare", term_fa: "سرعت کم کردن", part_of_speech: "verb", infinitive: "rallentare" },
          { term_it: "quando", term_fa: "وقتی که", part_of_speech: "other", infinitive: null },
          { term_it: "si avvicina", term_fa: "نزدیک می‌شود", part_of_speech: "verb", infinitive: "avvicinarsi" },
          { term_it: "incrocio", term_fa: "تقاطع", part_of_speech: "other", infinitive: null },
          { term_it: "controllare", term_fa: "بررسی کردن", part_of_speech: "verb", infinitive: "controllare" },
          { term_it: "entrambi i lati", term_fa: "هر دو طرف", part_of_speech: "other", infinitive: null },
          { term_it: "e", term_fa: "و", part_of_speech: "other", infinitive: null },
          { term_it: "proseguire", term_fa: "ادامه دادن", part_of_speech: "verb", infinitive: "proseguire" },
          { term_it: "soltanto", term_fa: "فقط", part_of_speech: "other", infinitive: null },
          { term_it: "può", term_fa: "می‌تواند", part_of_speech: "verb", infinitive: "potere" },
          { term_it: "farlo", term_fa: "آن کار را انجام دهد", part_of_speech: "verb", infinitive: "fare" },
          { term_it: "sicurezza", term_fa: "ایمنی", part_of_speech: "other", infinitive: null },
        ],
      })
    );
  };
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  const sentence =
    "Il conducente deve rallentare quando si avvicina a un incrocio, controllare entrambi i lati e proseguire soltanto quando può farlo in sicurezza.";
  const result = await analyzeGrammar(env, sentence);
  const firstPrompt = String(requests[0]?.messages?.[0]?.content ?? "");

  assert.match(firstPrompt, /ابتدا تا انتها|اولین.*آخرین/s);
  assert.match(firstPrompt, /همه.*واژه|تمام.*واژه/s);
  assert.doesNotMatch(firstPrompt, /فقط آنهایی که یادگیری‌شان واقعاً کمک می‌کند/);
  assert.ok((requests[0]?.max_tokens ?? 0) >= 1200);
  assert.ok(requests.length >= 2, "an incomplete first result must trigger a coverage repair call");
  assert.match(
    result.vocab_suggestions.find((item) => item.term_it.startsWith("deve"))?.term_it ?? "",
    /dovere/,
    "a conjugated verb must carry its infinitive into the saved vocabulary term"
  );
  assert.equal(result.vocab_suggestions.at(-1)?.term_it, "sicurezza");
});

test("vocabulary coverage preserves meaningful accented verbs and rejects empty translations", () => {
  const sentence = "La strada è stretta e termina nell'autostrada";
  const coverage = vocabularyCoverageTokens(sentence);

  assert.ok(coverage.includes("è"), "the verb è must not be mistaken for conjunction e");
  assert.ok(coverage.includes("autostrada"), "contracted articles must not hide their noun");
  assert.equal(
    hasCompleteVocabularyCoverage(sentence, [
      { term_it: "strada", term_fa: "جاده", part_of_speech: "other", infinitive: null },
      { term_it: "è (مصدر: essere)", term_fa: "است", part_of_speech: "verb", infinitive: "essere" },
      { term_it: "stretta", term_fa: "باریک", part_of_speech: "other", infinitive: null },
      { term_it: "e", term_fa: "و", part_of_speech: "other", infinitive: null },
      { term_it: "termina (مصدر: terminare)", term_fa: "تمام می‌شود", part_of_speech: "verb", infinitive: "terminare" },
      { term_it: "autostrada", term_fa: "", part_of_speech: "other", infinitive: null },
    ]),
    false,
    "an empty Persian meaning must not count as vocabulary coverage"
  );
  assert.equal(
    hasCompleteVocabularyCoverage("Il conducente deve rallentare", [
      { term_it: "conducente", term_fa: "راننده", part_of_speech: "other", infinitive: null },
      { term_it: "deve", term_fa: "باید", part_of_speech: "verb", infinitive: null },
      { term_it: "rallentare", term_fa: "کم کردن سرعت", part_of_speech: "verb", infinitive: "rallentare" },
    ]),
    false,
    "a conjugated verb without its infinitive must not be accepted as complete"
  );
  assert.equal(
    hasCompleteVocabularyCoverage("Il conducente da\u0300 precedenza", [
      { term_it: "conducente", term_fa: "راننده", part_of_speech: "other", infinitive: null },
      { term_it: "da", term_fa: "از", part_of_speech: "other", infinitive: null },
      { term_it: "precedenza", term_fa: "حق تقدم", part_of_speech: "other", infinitive: null },
    ]),
    false,
    "a canonically decomposed dà must remain distinct from the preposition da"
  );
});

test("vocabulary coverage distinguishes E' and è from e and retains meaning-changing conjunctions", () => {
  const sentence = "E' consentito proseguire, ma il conducente deve rallentare o fermarsi";
  const coverage = vocabularyCoverageTokens(sentence);

  assert.ok(coverage.includes("è"), "E' must be canonicalized as the verb è");
  assert.ok(coverage.includes("ma"), "contrastive ma changes the statement meaning");
  assert.ok(coverage.includes("o"), "alternative o changes the statement meaning");

  assert.equal(
    hasCompleteVocabularyCoverage("La strada è stretta e termina", [
      { term_it: "strada", term_fa: "جاده", part_of_speech: "other", infinitive: null },
      { term_it: "stretta e termina", term_fa: "باریک است و تمام می‌شود", part_of_speech: "other", infinitive: null },
    ]),
    false,
    "a conjunction e in another suggestion must not falsely cover verb è"
  );
  assert.equal(
    hasCompleteVocabularyCoverage("Il conducente dà precedenza", [
      { term_it: "conducente", term_fa: "راننده", part_of_speech: "other", infinitive: null },
      { term_it: "da", term_fa: "از", part_of_speech: "other", infinitive: null },
      { term_it: "precedenza", term_fa: "حق تقدم", part_of_speech: "other", infinitive: null },
    ]),
    false,
    "the verb dà must not be covered by the preposition da"
  );
});

test("single-term vocabulary suggestions remain available for manual saves", async (t) => {
  let request: OpenAIRequest | undefined;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_input, init) => {
    request = JSON.parse(String(init?.body)) as OpenAIRequest;
    return responseWithContent("  حق تقدم  ");
  };
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  const result = await suggestVocabTranslation(env, "precedenza");

  assert.equal(result, "حق تقدم");
  assert.match(JSON.stringify(request), /precedenza/);
});

test("exam AI help is gated until an answer exists and results render structured explanations", () => {
  const examClient = readFileSync("public/js/exam.js", "utf8");

  assert.match(examClient, /App\.canUseAiForCurrentQuestion\s*=\s*function/);
  assert.match(examClient, /state\.answers\[q\.questionId\]\s*!==\s*undefined/);
  assert.match(examClient, /App\.toggleTranslate[\s\S]*App\.canUseAiForCurrentQuestion\(\)/);
  assert.match(examClient, /App\.renderRichText\(explanationBody,\s*data\.explanation\)/);

  const screenMarkup = renderExamScreen();
  assert.match(screenMarkup, /id="translate-toggle"[^>]*disabled/);
});

test("slow AI responses cannot overwrite a different question and requests are deduplicated", () => {
  const examClient = readFileSync("public/js/exam.js", "utf8");

  assert.match(examClient, /state\.aiPendingRequests/);
  assert.match(examClient, /App\.isAiRequestCurrent\s*=\s*function/);
  assert.ok(
    (examClient.match(/App\.isAiRequestCurrent\(/g) ?? []).length >= 4,
    "translation, theory, grammar, and the helper definition must check request identity"
  );
});

test("answer-bearing AI routes enforce the answered state on the server", () => {
  const querySource = readFileSync("src/db/queries.ts", "utf8");
  const routeSource = readFileSync("src/api/translate.ts", "utf8");
  const tutorSource = readFileSync("src/api/tutor.ts", "utf8");

  assert.match(querySource, /hasUnansweredActiveExamQuestion/);
  assert.match(querySource, /finished_at\s+IS\s+NULL/i);
  assert.match(querySource, /user_answer\s+IS\s+NULL/i);
  assert.match(querySource, /started_at\s*>=\s*datetime\('now',\s*'-30 minutes'\)/i);
  assert.ok(
    (routeSource.match(/hasUnansweredActiveExamQuestion\(/g) ?? []).length >= 2,
    "both translation/explanation and theory endpoints must enforce the server-side guard"
  );
  assert.match(tutorSource, /answerRow\?\.user_answer\s*==\s*null\s*&&\s*!session\.finished_at/);
  assert.match(tutorSource, /Answer required before tutor chat/);
});

test("abandoned sessions stop blocking study content without becoming scored exams", () => {
  const querySource = readFileSync("src/db/queries.ts", "utf8");
  const examRouteSource = readFileSync("src/api/exam.ts", "utf8");
  const examClient = readFileSync("public/js/exam.js", "utf8");

  assert.ok(existsSync("migrations/0012_add_abandoned_sessions.sql"));
  assert.ok(existsSync("migrations/0013_backfill_abandoned_sessions.sql"));
  assert.match(querySource, /abandoned_at\s+IS\s+NULL/i);
  assert.match(examRouteSource, /\/:sessionId\/abandon/);
  assert.match(examRouteSource, /ACTIVE_EXAM_SESSION_MS\s*=\s*30\s*\*\s*60\s*\*\s*1000/);
  assert.match(examRouteSource, /isExamSessionExpired/);
  assert.match(examClient, /\/exam\/['"]?\s*\+\s*abandonedSessionId\s*\+\s*['"]\/abandon/);
  const exitFunction = examClient.slice(
    examClient.indexOf("App.exitExam = function"),
    examClient.indexOf("App.exitTopicPractice")
  );
  assert.match(exitFunction, /const abandonedSessionId\s*=\s*state\.sessionId/);
  assert.ok(
    exitFunction.indexOf("state.sessionId = null") < exitFunction.indexOf("api('POST'"),
    "exit must invalidate the local session before the asynchronous abandon request"
  );
});

test("exam answers are validated, immutable, and terminal transitions are atomic", () => {
  const querySource = readFileSync("src/db/queries.ts", "utf8");
  const examRouteSource = readFileSync("src/api/exam.ts", "utf8");
  const recordAnswerQuery = querySource.slice(
    querySource.indexOf("export async function recordExamAnswer"),
    querySource.indexOf("export async function updateAnswerFlag")
  );
  const finishQuery = querySource.slice(
    querySource.indexOf("export async function finishExamSession"),
    querySource.indexOf("export async function getSessionAnswers")
  );
  const abandonQuery = querySource.slice(
    querySource.indexOf("export async function abandonExamSession"),
    querySource.indexOf("export async function abandonOpenExamSessions")
  );

  assert.match(examRouteSource, /body\.answer\s*!==\s*0\s*&&\s*body\.answer\s*!==\s*1/);
  assert.match(recordAnswerQuery, /user_answer\s+IS\s+NULL/i);
  assert.match(recordAnswerQuery, /finished_at\s+IS\s+NULL/i);
  assert.match(recordAnswerQuery, /abandoned_at\s+IS\s+NULL/i);
  assert.match(recordAnswerQuery, /meta\.changes/);
  assert.match(recordAnswerQuery, /existing\?\.user_answer\s*===\s*userAnswer/);
  assert.match(finishQuery, /finished_at\s+IS\s+NULL/i);
  assert.match(finishQuery, /abandoned_at\s+IS\s+NULL/i);
  assert.match(finishQuery, /meta\.changes/);
  assert.match(abandonQuery, /finished_at\s+IS\s+NULL/i);
  assert.match(abandonQuery, /abandoned_at\s+IS\s+NULL/i);
  assert.match(abandonQuery, /meta\.changes/);
});

test("chapter exams reuse the canonical session lifecycle and client reset", () => {
  const topicsRoute = readFileSync("src/api/topics.ts", "utf8");
  const appClient = readFileSync("public/js/app.js", "utf8");
  const examClient = readFileSync("public/js/exam.js", "utf8");

  const querySource = readFileSync("src/db/queries.ts", "utf8");
  const examRoute = readFileSync("src/api/exam.ts", "utf8");
  const replaceSessionQuery = querySource.slice(
    querySource.indexOf("export async function replaceActiveExamSession"),
    querySource.indexOf("export async function insertExamAnswer")
  );

  assert.match(topicsRoute, /replaceActiveExamSession\(\s*c\.env\.DB,\s*userId/);
  assert.match(examRoute, /replaceActiveExamSession\(\s*c\.env\.DB,\s*userId/);
  assert.match(replaceSessionQuery, /db\.batch/);
  assert.match(replaceSessionQuery, /UPDATE\s+exam_sessions/i);
  assert.match(replaceSessionQuery, /INSERT\s+INTO\s+exam_sessions/i);
  assert.match(replaceSessionQuery, /questionIds\.map/);
  assert.match(replaceSessionQuery, /INSERT\s+INTO\s+exam_answers/i);
  assert.doesNotMatch(examRoute, /for\s*\([^)]*questions\.length[\s\S]*insertExamAnswer/);
  assert.doesNotMatch(topicsRoute, /for\s*\([^)]*questions\.length[\s\S]*insertExamAnswer/);
  assert.match(appClient, /state\.examStartPending/);
  assert.match(examClient, /state\.examStartPending/);
  assert.match(examClient, /App\.initializeExamState\s*=\s*function/);
  assert.match(examClient, /state\.recordedAnswers\s*=\s*new Set\(\)/);
  assert.match(appClient, /App\.initializeExamState\(data,/);
});

test("tutor chat rejects injected roles and bounds caller-controlled context", () => {
  const tutorRoute = readFileSync("src/api/tutor.ts", "utf8");
  const openaiSource = readFileSync("src/lib/openai.ts", "utf8");
  const appClient = readFileSync("public/js/app.js", "utf8");
  const tutorMessageType = openaiSource.slice(
    openaiSource.indexOf("export interface TutorChatMessage"),
    openaiSource.indexOf("export async function chatWithTutor")
  );

  assert.match(tutorRoute, /Array\.isArray\(body\.history\)/);
  assert.match(tutorRoute, /message\.role\s*!==\s*"user"/);
  assert.match(tutorRoute, /message\.role\s*!==\s*"assistant"/);
  assert.match(tutorRoute, /MAX_TUTOR_HISTORY_MESSAGES/);
  assert.match(tutorRoute, /MAX_TUTOR_MESSAGE_LENGTH/);
  assert.doesNotMatch(tutorMessageType, /"system"/);
  assert.match(appClient, /tutorChatHistory\[q\.questionId\][\s\S]*slice\(-6\)/);
});

test("answer persistence failures stay visible and ambiguous retries are idempotent", () => {
  const appClient = readFileSync("public/js/app.js", "utf8");
  const examClient = readFileSync("public/js/exam.js", "utf8");
  const answerFunction = examClient.slice(
    examClient.indexOf("App.answer = async function"),
    examClient.indexOf("// ── Flag / bookmark")
  );

  assert.match(appClient, /apiError\.status\s*=\s*res\.status/);
  assert.match(examClient, /state\.answerPending/);
  assert.doesNotMatch(answerFunction, /Offline — continue locally/);
  assert.ok(
    answerFunction.indexOf("await api(") < answerFunction.indexOf("state.answers[q.questionId] = value"),
    "the client must only accept and advance an answer after persistence succeeds"
  );
  assert.match(answerFunction, /برای تلاش دوباره|دوباره/);
  assert.match(answerFunction, /const answeredIndex\s*=\s*state\.currentIndex/);
  assert.match(answerFunction, /state\.currentIndex\s*!==\s*answeredIndex/);
  assert.match(renderExamScreen(), /id="btn-finish-exam"/);
  assert.match(examClient, /App\.updateFinishAvailability\s*=\s*function/);
  assert.match(answerFunction, /App\.updateFinishAvailability\(\)/);
});

test("exam start mode and delayed tutor rendering remain scoped to their request", () => {
  const examRoute = readFileSync("src/api/exam.ts", "utf8");
  const appClient = readFileSync("public/js/app.js", "utf8");

  assert.match(examRoute, /c\.req\.json\(\)\.catch/);
  assert.match(examRoute, /requestedMode\s*!==\s*"exam"/);
  assert.match(examRoute, /requestedMode\s*!==\s*"review"/);
  assert.match(examRoute, /requestedMode\s*!==\s*"topic_practice"/);
  assert.match(appClient, /currentTutorQuestion\?\.questionId\s*===\s*q\.questionId/);
});

test("Reels regenerate missing explanations and render their structure safely", () => {
  const appClient = readFileSync("public/js/app.js", "utf8");
  const querySource = readFileSync("src/db/queries.ts", "utf8");

  assert.match(appClient, /needsExplanation/);
  assert.match(appClient, /state\.reelTranslationRequests/);
  assert.match(appClient, /reelTranslationRequests\[questionId\]/);
  assert.match(appClient, /App\.renderRichText\(explEl,\s*res\.explanation/);
  assert.doesNotMatch(
    appClient,
    /if\s*\(explEl\s*&&\s*res\.explanation\)\s*explEl\.textContent\s*=/
  );
  const reelsQuery = querySource.slice(
    querySource.indexOf("export async function getReelsFeedItems"),
    querySource.indexOf("const goldenTips")
  );
  assert.match(reelsQuery, /ea\.user_answer\s+IS\s+NULL/i);
  assert.match(reelsQuery, /es\.user_id\s*=\s*\?/i);
  assert.match(reelsQuery, /\.bind\(userId,\s*limit\)/);
});

test("admin labels vocabulary repair usage in Persian", () => {
  const appClient = readFileSync("public/js/app.js", "utf8");
  assert.match(appClient, /['"]grammar_vocab_repair['"]\s*:/);
});

test("the cache-reset migration invalidates all outdated learning content", () => {
  const migrationPath = "migrations/0011_reset_learning_content.sql";
  assert.ok(existsSync(migrationPath), `${migrationPath} must exist`);
  const sql = readFileSync(migrationPath, "utf8");

  assert.match(sql, /explanation\s*=\s*NULL/i);
  assert.match(sql, /theory_text\s*=\s*NULL/i);
  assert.match(sql, /grammar_analysis\s*=\s*NULL/i);
  assert.match(sql, /vocab_suggestions\s*=\s*NULL/i);
});
