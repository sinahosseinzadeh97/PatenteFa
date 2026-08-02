/**
 * src/lib/openai.ts
 * OpenAI API wrapper for translation, explanation, and vocabulary suggestions.
 * Model name comes from env var OPENAI_MODEL (default: gpt-4o-mini).
 * Never used to invent exam questions — only for translation/explanation/vocab.
 */

export interface TranslationResult {
  translated_text: string;
  explanation: string;
}

export interface Env {
  OPENAI_API_KEY: string;
  OPENAI_MODEL?: string;
}

function model(env: Env): string {
  return env.OPENAI_MODEL ?? "gpt-4o-mini";
}

export function calculateCost(model: string, promptTokens: number, completionTokens: number): number {
  if (model.includes("gpt-4o-mini")) {
    return (promptTokens * 0.15 + completionTokens * 0.60) / 1_000_000;
  }
  return (promptTokens * 2.50 + completionTokens * 10.00) / 1_000_000;
}

/**
 * Translate an Italian exam question + correct answer into Persian.
 * §14.1: simplified to just translated_text + explanation (no driving/grammar agents).
 * §14.2: when imageUrl is provided, sends the sign image via vision so the
 *         translation is grounded in the actual road sign shown.
 *         gpt-4o-mini supports vision natively — no model change needed.
 *         detail:"low" keeps image cost to ~85 tokens (~$0.00001).
 */
export async function translateQuestion(
  env: Env,
  textIt: string,
  correctAnswer: number, // 1 = VERO, 0 = FALSO
  imageUrl?: string | null,
  db?: D1Database,
  userId?: number
): Promise<TranslationResult> {
  const answerIt = correctAnswer === 1 ? "VERO" : "FALSO";
  const currentModel = model(env);

  // §17.6: Split into two independent parallel calls so correct_answer is
  // structurally absent from the translation call — the model cannot leak the
  // answer into translated_text because it never sees it.

  // ── Call 1: Translation only — NO correct_answer in scope ─────────────────
  const translationSystemPrompt = `شما مترجم تخصصی آزمون تئوری رانندگی (Patente B) ایتالیا هستید که برای فارسی‌زبانان ایرانی مقیم ایتالیا ترجمه می‌کنید.

هدف: ترجمه فارسی باید دقیقاً مثل جمله‌ای باشد که یک راننده ایرانی باتجربه می‌نویسد — روان، طبیعی، و بدون ساختار ترجمه‌وار.

قوانین سبک:
• از کلمه‌به‌کلمه پرهیز کنید — معنا را منتقل کنید، نه ساختار دستوری ایتالیایی را
• از واژگان فارسی رایج در حوزه رانندگی استفاده کنید (مثال: «راه‌بند» نه «مانع»، «چراغ راهنما» نه «سیگنال»)
• افعال منفی را طبیعی بنویسید: «نباید» نه «نمی‌بایست»، «مجاز نیست» نه «اجازه داده نمی‌شود»
• جمله‌های شرطی را با «اگر … باید/می‌توان» بنویسید، نه با ترجمه تحت‌اللفظی «qualora/salvo che»
• اعداد و واحدها را به فارسی بنویسید: «۵۰ کیلومتر بر ساعت» نه «50 km/h»
• اگر تصویر تابلو یا علامت راهنمایی ضمیمه شده، محتوای آن را در ترجمه لحاظ کنید

قانون مهم — جمله‌های «È + صفت» (§17.5):
جمله‌هایی که با «È» یا «E'» + صفت شروع می‌شوند (مثل vietato، obbligatorio، consentito، necessario، possibile، corretto، regolamentare و مشابه آنها) همیشه جمله‌ی خبری درباره یک قانون یا واقعیت هستند، نه سؤال. همیشه به‌صورت خبری ترجمه کنید، هرگز با «آیا … ؟» شروع نکنید.

نمونه (برای کالیبراسیون — این‌ها را کپی نکنید، فقط سبک را بگیرید):
• ایتالیایی: «È vietato sorpassare quando non si ha la visibilità necessaria.»
  فارسی خوب: «وقتی دید کافی ندارید، سبقت گرفتن ممنوع است.»
  فارسی بد: «سبقت گرفتن در زمانی که دید لازم وجود ندارد ممنوع است.»

• ایتالیایی: «Il conducente deve arrestare il veicolo prima della striscia d'arresto.»
  فارسی خوب: «راننده باید قبل از خط توقف، ماشین را متوقف کند.»
  فارسی بد: «راننده ملزم است وسیله نقلیه را قبل از خط توقف متوقف نماید.»`;

  const translationUserText = `سوال ایتالیایی: "${textIt}"

فقط ترجمه فارسی روان را برگردانید (بدون توضیح). خروجی دقیقاً به صورت JSON:
{"translated_text": "ترجمه فارسی روان سوال"}`;

  // §14.2: vision call when image present — translation call only
  type UserMessageContent = string | Array<{ type: string; text?: string; image_url?: { url: string; detail: string } }>;
  const translationUserMessage: { role: "user"; content: UserMessageContent } = imageUrl
    ? {
        role: "user",
        content: [
          { type: "text", text: translationUserText },
          { type: "image_url", image_url: { url: imageUrl, detail: "low" } },
        ],
      }
    : { role: "user", content: translationUserText };

  // ── Call 2: Explanation only — sees correct_answer, that's its whole job ───
  const explanationUserText = `سوال ایتالیایی: "${textIt}"
پاسخ صحیح: ${answerIt}

دلیل کوتاه پاسخ صحیح را به فارسی بنویسید. خروجی دقیقاً به صورت JSON:
{"explanation": "دلیل کوتاه به فارسی"}`;

  const callOpenAI = (body: object) =>
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

  // Run both in parallel — they're independent
  const [translationRes, explanationRes] = await Promise.all([
    callOpenAI({
      model: currentModel,
      messages: [
        { role: "system", content: translationSystemPrompt },
        translationUserMessage,
      ],
      response_format: { type: "json_object" },
      temperature: 0.4, // §17.3
      max_tokens: 250,
    }),
    callOpenAI({
      model: currentModel,
      messages: [
        {
          role: "system",
          content: "شما توضیح‌دهنده قوانین آزمون پاتنته B هستید. دلیل کوتاه و روشن برای پاسخ صحیح سوال را به فارسی بنویسید.",
        },
        { role: "user", content: explanationUserText },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 200,
    }),
  ]);

  if (!translationRes.ok) {
    const body = await translationRes.text();
    throw new Error(`OpenAI translation error ${translationRes.status}: ${body}`);
  }
  if (!explanationRes.ok) {
    const body = await explanationRes.text();
    throw new Error(`OpenAI explanation error ${explanationRes.status}: ${body}`);
  }

  const [translationData, explanationData] = await Promise.all([
    translationRes.json() as Promise<{ choices: { message: { content: string } }[]; usage?: { prompt_tokens: number; completion_tokens: number } }>,
    explanationRes.json() as Promise<{ choices: { message: { content: string } }[]; usage?: { prompt_tokens: number; completion_tokens: number } }>,
  ]);

  // Log combined usage
  if (db) {
    const logUsage = (data: typeof translationData, action: string) => {
      if (!data.usage) return;
      const pTokens = data.usage.prompt_tokens || 0;
      const cTokens = data.usage.completion_tokens || 0;
      const cost = calculateCost(currentModel, pTokens, cTokens);
      db.prepare(
        `INSERT INTO api_usage_logs (user_id, service, model, action, prompt_tokens, completion_tokens, estimated_cost_usd)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(userId || null, "openai", currentModel, action, pTokens, cTokens, cost)
        .run()
        .catch(() => {});
    };
    logUsage(translationData, "translate_question_text");
    logUsage(explanationData, "translate_question_explanation");
  }

  const translatedParsed = JSON.parse(translationData.choices[0]?.message?.content ?? "{}") as { translated_text?: string };
  const explanationParsed = JSON.parse(explanationData.choices[0]?.message?.content ?? "{}") as { explanation?: string };

  return {
    translated_text: translatedParsed.translated_text ?? textIt,
    explanation: explanationParsed.explanation ?? "",
  };
}


/**
 * Suggest a Persian translation for an Italian vocabulary term.
 * Returns the suggested translation string (the user can then accept or edit).
 */
export async function suggestVocabTranslation(
  env: Env,
  termIt: string,
  db?: D1Database,
  userId?: number
): Promise<string> {
  const currentModel = model(env);
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: currentModel,
      messages: [
        {
          role: "system",
          content:
            "شما یک مترجم متخصص ایتالیایی به فارسی هستید. فقط ترجمه را بدون توضیح اضافه برگردانید.",
        },
        {
          role: "user",
          content: `ترجمه فارسی این اصطلاح ایتالیایی مرتبط با قوانین راهنمایی و رانندگی: "${termIt}"`,
        },
      ],
      temperature: 0.2,
      max_tokens: 100,
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenAI error ${res.status}`);
  }

  const data = (await res.json()) as {
    choices: { message: { content: string } }[];
    usage?: { prompt_tokens: number; completion_tokens: number };
  };

  if (db && data.usage) {
    const pTokens = data.usage.prompt_tokens || 0;
    const cTokens = data.usage.completion_tokens || 0;
    const cost = calculateCost(currentModel, pTokens, cTokens);
    await db
      .prepare(
        `INSERT INTO api_usage_logs (user_id, service, model, action, prompt_tokens, completion_tokens, estimated_cost_usd)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(userId || null, "openai", currentModel, "suggest_vocab", pTokens, cTokens, cost)
      .run()
      .catch(() => {});
  }

  return (data.choices[0]?.message?.content ?? "").trim();
}

// ── §15.3 — Three-tab AI panel — independent agents ──────────────────────────

export interface TheoryResult {
  theory_text: string;
}

export interface GrammarResult {
  grammar_analysis: string;
  vocab_suggestions: Array<{ term_it: string; term_fa: string }>;
}

/**
 * 🎓 مربی تئوری — Full Theory Explanation
 * Persona: an experienced Italian driving-school instructor (scuola guida) who
 * teaches Persian-speaking students. Explains the exact traffic-code rule
 * (Codice della Strada) behind this question, why it's a common mistake, and
 * what mental tip (trucchetto) will help the student remember it.
 * Token budget: 700 (independent — never competes with translation or grammar).
 * §15.4: text-only even for image questions — we're reasoning about the rule, not the sign.
 */
export async function explainTheory(
  env: Env,
  textIt: string,
  correctAnswer: number,
  db?: D1Database,
  userId?: number
): Promise<TheoryResult> {
  const answerIt = correctAnswer === 1 ? "VERO" : "FALSO";
  const currentModel = model(env);

  const systemPrompt = `شما «مربی تئوری» (مربی آزمون پاتنته B ایتالیا) هستید — یک مربی کارآزموده مدرسه رانندگی که به زبان فارسی روان به دانش‌آموزان ایرانی آموزش می‌دهد.

وظیفه شما: برای هر سوال آزمون، قانون دقیق کدیچه دلا استرادا (Codice della Strada) را به طور کامل توضیح دهید.

ساختار پاسخ شما:
۱. **قانون اصلی**: اصل قانون دقیق ایتالیا که این سوال را پوشش می‌دهد (با ذکر ماده قانونی اگر مرتبط است)
۲. **چرا اشتباه رایج است**: دقیقاً چه چیزی باعث می‌شود این سوال دانش‌آموزان را گول بزند — تله‌های لغوی، استثناها، یا شرایط خاص
۳. **نکته طلایی**: یک جمله کوتاه و به‌یادماندنی که کمک می‌کند پاسخ صحیح را حفظ کنند

لحن: گرم، صبور، انگیزشی — مثل یک مربی خوب که واقعاً می‌خواهد شاگردش قبول شود.
زبان: فارسی روان. کلمات ایتالیایی تخصصی را در متن حفظ کنید.

قانون مهم — پرهیز از بویلرپلیت ثابت (§19.1):
پاسخ را با یک ارجاع کلی به «کدیچه دلا استرادا» شروع نکنید. اسم آیین‌نامه را تنها وقتی بنویسید که یک ماده یا مورد مشخصی را ذکر می‌کنید — نه به عنوان عادت. با متن سوال شروع کنید: مستقیم به نکته اصلی بروید.`;

  const userPrompt = `سوال آزمون: «${textIt}»
پاسخ صحیح: ${answerIt}

توضیح کامل تئوری این سوال را بدهید (بدون JSON — متن آزاد فارسی):`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: currentModel,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 700,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${body}`);
  }

  const data = (await res.json()) as {
    choices: { message: { content: string } }[];
    usage?: { prompt_tokens: number; completion_tokens: number };
  };

  if (db && data.usage) {
    const pTokens = data.usage.prompt_tokens || 0;
    const cTokens = data.usage.completion_tokens || 0;
    const cost = calculateCost(currentModel, pTokens, cTokens);
    await db
      .prepare(
        `INSERT INTO api_usage_logs (user_id, service, model, action, prompt_tokens, completion_tokens, estimated_cost_usd)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(userId || null, "openai", currentModel, "theory_explain", pTokens, cTokens, cost)
      .run()
      .catch(() => {});
  }

  return {
    theory_text: (data.choices[0]?.message?.content ?? "").trim(),
  };
}

/**
 * 📚 معلم گرامر — Grammar & Vocabulary Analysis
 * Persona: a Persian-speaking Italian language teacher who specialises in
 * traffic-exam Italian. Breaks down the grammar of the sentence and extracts
 * key vocabulary terms the student should know, each with a Persian translation.
 * Returns a JSON object so vocab words can be rendered as individual save-able chips.
 * Token budget: 700 (independent — never competes with translation or theory).
 * §15.4: text-only even for image questions.
 */
export async function analyzeGrammar(
  env: Env,
  textIt: string,
  db?: D1Database,
  userId?: number
): Promise<GrammarResult> {
  const currentModel = model(env);

  const systemPrompt = `شما «معلم گرامر» هستید — یک استاد زبان ایتالیایی که تخصص در متون آزمون پاتنته B دارد و به دانش‌آموزان فارسی‌زبان تدریس می‌کند.

وظیفه شما دو بخش دارد:
۱. **تحلیل گرامری**: ساختار دستوری جمله ایتالیایی را با لحن آموزشی توضیح دهید — زمان فعل، نکات نحوی مهم، کلمات کلیدی مثل «salvo», «qualora», «purché» و غیره که معنا را تغییر می‌دهند.
۲. **لغات کلیدی**: فهرستی از مهم‌ترین کلمات و عبارات ایتالیایی در این جمله که دانش‌آموز باید بداند.

خروجی دقیقاً به صورت JSON با این ساختار:
{
  "grammar_analysis": "توضیح گرامری به فارسی (متن آزاد)",
  "vocab_suggestions": [
    {"term_it": "واژه ایتالیایی", "term_fa": "ترجمه فارسی"},
    ...
  ]
}

قوانین:
- grammar_analysis: فارسی روان، حداکثر ۳-۴ جمله، آموزشی نه تکنیکال
- vocab_suggestions: ۳ تا ۶ واژه مهم‌ترین — نه همه کلمات، فقط آنهایی که یادگیری‌شان واقعاً کمک می‌کند
- هر دو بخش ضروری هستند
- انفینیتیو (مصدر) فقط برای افعال (§19.3 + تمایز فعل/اسم):
  • فقط برای شکل‌های صرف‌شده افعال (verbi coniugati) مصدر بنویسید — مثال: "avviene (مصدر: avvenire)"
  • برای اسم‌ها (sostantivi)، صفت‌ها (aggettivi) و سایر واژگان غیرفعلی هرگز مصدر نگذارید — مثال: "veicolo" فقط "veicolo" بنویسید، نه "veicolo (مصدر: …)"
  • اگر یک واژه هم فعل و هم اسم می‌تواند باشد (مثل "arresto")، بر اساس نقش آن در همین جمله تصمیم بگیرید — اگر اسم است، مصدر نگذارید
  • در vocab_suggestions: برای آیتم‌های فعلی، term_it شامل شکل جمله + مصدر باشد. برای آیتم‌های غیرفعلی، فقط خود واژه
  • در grammar_analysis: همین تفکیک رعایت شود`;

  const userPrompt = `جمله ایتالیایی آزمون: «${textIt}»

تحلیل گرامری و لغات کلیدی را به صورت JSON برگردانید:`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: currentModel,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 700,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${body}`);
  }

  const data = (await res.json()) as {
    choices: { message: { content: string } }[];
    usage?: { prompt_tokens: number; completion_tokens: number };
  };

  if (db && data.usage) {
    const pTokens = data.usage.prompt_tokens || 0;
    const cTokens = data.usage.completion_tokens || 0;
    const cost = calculateCost(currentModel, pTokens, cTokens);
    await db
      .prepare(
        `INSERT INTO api_usage_logs (user_id, service, model, action, prompt_tokens, completion_tokens, estimated_cost_usd)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(userId || null, "openai", currentModel, "grammar_analyze", pTokens, cTokens, cost)
      .run()
      .catch(() => {});
  }

  const content = data.choices[0]?.message?.content ?? "{}";
  const parsed = JSON.parse(content) as {
    grammar_analysis?: string;
    vocab_suggestions?: Array<{ term_it: string; term_fa: string }>;
  };

  return {
    grammar_analysis: parsed.grammar_analysis ?? "",
    vocab_suggestions: Array.isArray(parsed.vocab_suggestions) ? parsed.vocab_suggestions : [],
  };
}

export interface TutorChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Interactive Q&A with the AI Tutor for a specific wrong question.
 */
export async function chatWithTutor(
  env: Env,
  questionContext: {
    questionId: number;
    textIt: string;
    correctAnswer: number;
    userAnswer: number | null;
  },
  history: TutorChatMessage[],
  userMessage: string,
  db?: D1Database,
  userId?: number
): Promise<string> {
  const currentModel = model(env);
  const answerIt = questionContext.correctAnswer === 1 ? "VERO" : "FALSO";
  const userAnsIt =
    questionContext.userAnswer === 1
      ? "VERO"
      : questionContext.userAnswer === 0
      ? "FALSO"
      : "پاسخ داده نشده";

  const systemPrompt = `شما "استاد رفع اشکال آزمون پاتنته ب ایتالیا" (Patente B Exam Tutor) هستید.
وظیفه شما این است که با لحنی بسیار صبورانه، آموزشی، انگیزشی و صمیمی به زبان فارسی به کاربر کمک کنید تا علت اشتباهش در آزمون آیین‌نامه ایتالیا را کاملاً متوجه شود.

اطلاعات سوال فعلی:
- صورت سوال ایتالیایی: "${questionContext.textIt}"
- پاسخ صحیح: ${answerIt}
- پاسخ انتخاب شده توسط کاربر: ${userAnsIt}

قوانین و راهنمایی‌ها:
۱. روی تله‌های لغوی و گرامری (مانند salvo, فرق dev'essere و può essere, قیدها، استثنائات قانون Codice della Strada) دقیقا دست بگذارید.
۲. اصل قانون رسمی آیین‌نامه مربوطه را کوتاه بیان کنید.
۳. در انتهای پاسخ، یک نکته یا کلیدواژه طلایی برای حفظ کردن پیشنهاد دهید.
۴. همیشه به زبان فارسی روان پاسخ دهید. کلمات ایتالیایی را شفاف در متن نگه دارید.`;

  const messages: TutorChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...history.slice(-6),
    { role: "user", content: userMessage },
  ];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: currentModel,
      messages,
      temperature: 0.3,
      max_tokens: 600,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${body}`);
  }

  const data = (await res.json()) as {
    choices: { message: { content: string } }[];
    usage?: { prompt_tokens: number; completion_tokens: number };
  };

  if (db && data.usage) {
    const pTokens = data.usage.prompt_tokens || 0;
    const cTokens = data.usage.completion_tokens || 0;
    const cost = calculateCost(currentModel, pTokens, cTokens);
    await db
      .prepare(
        `INSERT INTO api_usage_logs (user_id, service, model, action, prompt_tokens, completion_tokens, estimated_cost_usd)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(userId || null, "openai", currentModel, "tutor_chat", pTokens, cTokens, cost)
      .run()
      .catch(() => {});
  }

  return (data.choices[0]?.message?.content ?? "").trim();
}

