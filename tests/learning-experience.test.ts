import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { renderExamScreen } from "../src/app/screens/exam.js";
import {
  analyzeGrammar,
  explainTheory,
  translateQuestion,
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
  assert.match(positionRule, /font-size:\s*1\.[2-9]rem/);
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
  assert.doesNotMatch(firstPrompt, /۳ تا ۶/);
  assert.ok((requests[0]?.max_tokens ?? 0) >= 1200);
  assert.ok(requests.length >= 2, "an incomplete first result must trigger a coverage repair call");
  assert.equal(result.vocab_suggestions.at(-1)?.term_it, "sicurezza");
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
