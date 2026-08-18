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
          vocab_suggestions: [{ term_it: "conducente", term_fa: "راننده" }],
        })
      );
    }

    return responseWithContent(
      JSON.stringify({
        vocab_suggestions: [
          { term_it: "deve (مصدر: dovere)", term_fa: "باید" },
          { term_it: "rallentare", term_fa: "سرعت کم کردن" },
          { term_it: "quando", term_fa: "وقتی که" },
          { term_it: "si avvicina (مصدر: avvicinarsi)", term_fa: "نزدیک می‌شود" },
          { term_it: "incrocio", term_fa: "تقاطع" },
          { term_it: "controllare", term_fa: "بررسی کردن" },
          { term_it: "entrambi i lati", term_fa: "هر دو طرف" },
          { term_it: "proseguire", term_fa: "ادامه دادن" },
          { term_it: "soltanto", term_fa: "فقط" },
          { term_it: "può (مصدر: potere)", term_fa: "می‌تواند" },
          { term_it: "farlo (مصدر: fare)", term_fa: "آن کار را انجام دهد" },
          { term_it: "sicurezza", term_fa: "ایمنی" },
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
  assert.equal(result.vocab_suggestions.at(-1)?.term_it, "sicurezza");
});

test("vocabulary coverage preserves meaningful accented verbs and rejects empty translations", () => {
  const sentence = "La strada è stretta e termina nell'autostrada";
  const coverage = vocabularyCoverageTokens(sentence);

  assert.ok(coverage.includes("è"), "the verb è must not be mistaken for conjunction e");
  assert.ok(coverage.includes("autostrada"), "contracted articles must not hide their noun");
  assert.equal(
    hasCompleteVocabularyCoverage(sentence, [
      { term_it: "strada", term_fa: "جاده" },
      { term_it: "è (مصدر: essere)", term_fa: "است" },
      { term_it: "stretta", term_fa: "باریک" },
      { term_it: "termina (مصدر: terminare)", term_fa: "تمام می‌شود" },
      { term_it: "autostrada", term_fa: "" },
    ]),
    false
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
      { term_it: "strada", term_fa: "جاده" },
      { term_it: "stretta e termina", term_fa: "باریک است و تمام می‌شود" },
    ]),
    false,
    "a conjunction e in another suggestion must not falsely cover verb è"
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
