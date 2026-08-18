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

/** The verified identity of the sign in a question's image (see sign_meanings). */
export interface SignAnchor {
  nameIt: string;
  nameFa: string;
  meaningFa: string;
}

/**
 * Ground the explanation in the sign we already know is in the picture.
 *
 * Measured over the nine destra/sinistra pairs in the bank, gpt-4o names the
 * side correctly 16/18 times from pixels alone — and the misses are the worst
 * kind, since a mirrored left/right teaches the exact opposite rule. The sign's
 * identity is not something we need the model to guess: sign_meanings holds a
 * human-reviewed name for all 413 images.
 *
 * The image still goes with the request. Intersection figures, vehicle letters
 * and the "does the picture actually match the text?" check (which is why many
 * of these questions are FALSO) all still need the model to look.
 */
export function signAnchorBlock(sign: SignAnchor | null | undefined): string {
  if (!sign) return "";
  return `

تابلوی داخل تصویر از قبل شناسایی و توسط انسان بازبینی شده است — این اطلاعات قطعی است:
• نام رسمی ایتالیایی: «${sign.nameIt}»
• معنی: ${sign.meaningFa}

اگر برداشت شما از تصویر با این نام فرق داشت، این نام درست است — مخصوصاً درباره جهت (چپ/راست). نام تابلو را حدس نزنید و آن را عوض نکنید.`;
}

export interface Env {
  OPENAI_API_KEY: string;
  OPENAI_MODEL?: string;
  OPENAI_VISION_MODEL?: string;
}

function model(env: Env): string {
  return env.OPENAI_MODEL ?? "gpt-4o-mini";
}

/**
 * §20.1 — Model for calls that carry a sign/diagram image.
 *
 * gpt-4o-mini reads these images too poorly to teach from. Measured on the three
 * questions that motivated this fix, with the image attached in both cases:
 *   q2224 (red triangle, black X) — mini: "segnale di divieto" (wrong category);
 *                                     4o: "INTERSEZIONE CON DIRITTO DI PRECEDENZA" ✓
 *   q4741 (T-junction figure)     — mini: "C is turning left" (it isn't);
 *                                     4o: "C yields to B coming from the right" ✓
 *
 * Text questions stay on mini — they were never the problem, and they're ~3k of
 * the bank. Falls back to the text model if someone explicitly unsets this.
 */
function visionModel(env: Env): string {
  return env.OPENAI_VISION_MODEL ?? "gpt-4o";
}

/**
 * Resolve a stored image_url into something OpenAI's vision endpoint can fetch.
 *
 * Stored values are relative (`/images/signs/54.png`), served publicly by the R2
 * route in src/index.ts. Passing a relative URL straight through makes OpenAI
 * reject the whole request, which is how sign questions ended up with no
 * translation at all in the tutor review path.
 *
 * MINI_APP_URL carries a path — scripts/repoint-telegram.sh sets it to
 * `<origin>/app` — so string concatenation produced `<origin>/app/images/signs/54.png`.
 * That path is caught by the `/app/*` Mini App shell route and answered with the
 * HTML shell, 200. OpenAI then rejects the request with invalid_image_format and
 * every image question in the exam panel returned that raw 400 instead of a
 * translation. Resolve against the origin instead: stored image_urls are
 * root-absolute, so the base's path is correctly discarded.
 *
 * Returns null when it can't build an absolute URL — callers then run text-only
 * rather than failing outright.
 */
export function resolveImageUrl(
  miniAppUrl: string | undefined,
  imageUrl: string | null | undefined
): string | null {
  if (!imageUrl) return null;
  if (imageUrl.startsWith("http")) return imageUrl;
  if (!miniAppUrl) return null;
  try {
    return new URL(imageUrl, miniAppUrl).toString();
  } catch {
    return null;
  }
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
 *         Translation uses low detail; the answer explanation uses the configured
 *         vision model at high detail so small sign/diagram features stay legible.
 */
export async function translateQuestion(
  env: Env,
  textIt: string,
  correctAnswer: number, // 1 = VERO, 0 = FALSO
  imageUrl?: string | null,
  db?: D1Database,
  userId?: number,
  sign?: SignAnchor | null
): Promise<TranslationResult> {
  const answerIt = correctAnswer === 1 ? "VERO" : "FALSO";
  const currentModel = model(env);
  const explanationModel = visionModel(env);

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

  // §14.2 / §20.1: vision when an image is present.
  // detail "high" for the explanation — these are 400×400 PNGs, so high detail is
  // still a single tile (255 tokens vs 85, ≈ +$0.000026), and intersection figures
  // carry vehicle letters and arrow directions that "low" cannot resolve.
  // Translation stays on "low": it renders "il segnale raffigurato" as "تابلوی
  // نشان‌داده‌شده" regardless of which sign it is, and translations were never
  // the broken part.
  type UserMessageContent = string | Array<{ type: string; text?: string; image_url?: { url: string; detail: string } }>;
  const withImage = (
    text: string,
    detail: "low" | "high"
  ): { role: "user"; content: UserMessageContent } =>
    imageUrl
      ? {
          role: "user",
          content: [
            { type: "text", text },
            { type: "image_url", image_url: { url: imageUrl, detail } },
          ],
        }
      : { role: "user", content: text };

  const translationUserMessage = withImage(translationUserText, "low");

  // ── Call 2: Explanation only — sees correct_answer, that's its whole job ───
  // §20.1: the explanation call gets the image too. It used to be text-only, so
  // for the ~4k image questions ("Il segnale raffigurato…", intersection figures)
  // the model was reasoning about a picture it had never seen and confabulated a
  // rule every time.
  //
  // The "deciding word" instruction is conditional for the same reason: image
  // questions usually have NO deciding word — the deciding factor is which sign
  // is depicted. Demanding one forced the model to pick an arbitrary word and
  // invent a justification around it.
  const explanationSystemPrompt = `شما توضیح‌دهنده قوانین آزمون پاتنته B هستید و برای یک فارسی‌زبان بدون دانش قبلی از قوانین رانندگی توضیح می‌دهید.

هدف: کاربر باید دلیل پاسخ را با یک بار خواندن بفهمد. زبان روزمره و جمله‌های کوتاه به کار ببرید؛ هر جمله فقط یک مفهوم داشته باشد. هر اصطلاح ایتالیایی را فقط وقتی لازم است بیاورید و همان بار اول معنی ساده فارسی آن را داخل پرانتز بنویسید.
${
  imageUrl
    ? `
این سوال تصویر دارد و تصویر منبع اصلی پاسخ است.

پاسخ را در سه بخش کوتاه بنویسید:
**دلیل ساده:** با واژه‌های روزمره بگویید چه چیزی در تصویر دیده می‌شود و چرا پاسخ ${answerIt} است.
**قانون به زبان ساده:** وضعیت، کاری که راننده باید انجام دهد، و نتیجه را قدم‌به‌قدم توضیح دهید. عدد یا استثنا را فقط اگر مستقیماً به همین سوال مربوط است اضافه کنید.
**مثال:** یک موقعیت ملموس یک‌جمله‌ای از رانندگی واقعی بنویسید.

قانون قطعی درباره تصویر:
• هرگز فرض نکنید تابلوی داخل تصویر همان چیزی است که در متن سوال ادعا شده — اغلب پاسخ دقیقاً به همین دلیل FALSO است
• اگر تصویر را با اطمینان تشخیص نمی‌دهید، همین را بنویسید و فقط چیزی را که واقعاً می‌بینید (شکل، رنگ، نماد) توصیف کنید. حدس زدن نام تابلو بدتر از نگفتن آن است
• نام رسمی ایتالیایی تابلو را فقط همراه با معنی ساده فارسی آن بنویسید`
    : `
پاسخ را در سه بخش کوتاه بنویسید:
**دلیل ساده:** کلمه یا شرط تعیین‌کننده را معنی کنید و در یک جمله بگویید چرا پاسخ ${answerIt} است.
**قانون به زبان ساده:** وضعیت، کاری که راننده باید انجام دهد، و نتیجه را قدم‌به‌قدم توضیح دهید. فقط شرط‌ها، عددها و استثناهای مرتبط با همین سوال را بگویید.
**مثال:** یک موقعیت ملموس یک‌جمله‌ای از رانندگی واقعی بنویسید.`
}

ممنوع:
• جمله‌های کلی مثل «طبق قوانین راهنمایی و رانندگی»، «باید احتیاط کرد»، «این یک قانون مهم است» — این‌ها هیچ اطلاعاتی نمی‌دهند
• تکرار خود سوال به عنوان توضیح
• اصطلاح حقوقی، جمله رسمی و ترجمه کلمه‌به‌کلمه
• اطلاعات اضافی درباره حالت‌هایی که به این سوال ربط ندارند
• ذکر شماره ماده قانونی؛ کاربر به فهم قانون نیاز دارد، نه شماره آن
• شروع با «پاسخ صحیح ${answerIt} است» — مستقیم سراغ دلیل بروید`;

  const explanationUserText = `سوال ایتالیایی: "${textIt}"
پاسخ صحیح: ${answerIt}${imageUrl ? "\n(تصویر این سوال ضمیمه شده است — اول آن را بخوانید.)" : ""}${signAnchorBlock(sign)}

خروجی دقیقاً به صورت JSON:
{"explanation": "دلیل مشخص و دقیق به فارسی"}`;

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
      // §20.1: image questions escalate to the vision model — mini misreads signs.
      model: imageUrl ? explanationModel : currentModel,
      messages: [
        { role: "system", content: explanationSystemPrompt },
        withImage(explanationUserText, "high"),
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
      // Image answers must name the sign before reasoning — that costs tokens the
      // old text-only budget didn't allow for.
      max_tokens: imageUrl ? 600 : 500,
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
    // §20.1: the two calls can now run on different models, so the model has to
    // be passed in — logging both as `currentModel` would under-report the cost
    // of every image explanation on the admin dashboard.
    const logUsage = (data: typeof translationData, action: string, usedModel: string) => {
      if (!data.usage) return;
      const pTokens = data.usage.prompt_tokens || 0;
      const cTokens = data.usage.completion_tokens || 0;
      const cost = calculateCost(usedModel, pTokens, cTokens);
      db.prepare(
        `INSERT INTO api_usage_logs (user_id, service, model, action, prompt_tokens, completion_tokens, estimated_cost_usd)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(userId || null, "openai", usedModel, action, pTokens, cTokens, cost)
        .run()
        .catch(() => {});
    };
    logUsage(translationData, "translate_question_text", currentModel);
    logUsage(
      explanationData,
      "translate_question_explanation",
      imageUrl ? explanationModel : currentModel
    );
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

type VocabularySuggestion = GrammarResult["vocab_suggestions"][number];

// Closed-class words do not make useful standalone vocabulary cards. Everything
// else must be represented in the grammar result, including words at the end of
// long questions. Keep this deliberately small: words such as "non", "sempre",
// "quando" and "salvo" change exam meaning and therefore must never be filtered.
const ITALIAN_VOCAB_STOP_WORDS = new Set([
  "il", "lo", "la", "i", "gli", "le", "un", "uno", "una",
  "di", "a", "da", "in", "con", "su", "per", "tra", "fra",
  "del", "dello", "della", "dei", "degli", "delle",
  "dell", "all", "dall", "nell", "sull",
  "al", "allo", "alla", "ai", "agli", "alle",
  "dal", "dallo", "dalla", "dai", "dagli", "dalle",
  "nel", "nello", "nella", "nei", "negli", "nelle",
  "sul", "sullo", "sulla", "sui", "sugli", "sulle",
  "e", "ed", "o", "od", "ma", "si", "ci", "vi", "ne",
]);

function normalizeItalianToken(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase("it");
}

function italianSurfaceTokens(value: string): string[] {
  return (value.replace(/[’']/g, " ").match(/\p{Script=Latin}+/gu) ?? [])
    .map((token) => token.toLocaleLowerCase("it"));
}

function italianTokens(value: string): string[] {
  return italianSurfaceTokens(value).map(normalizeItalianToken);
}

/** Content-bearing tokens that the vocabulary list must cover, in source order. */
export function vocabularyCoverageTokens(textIt: string): string[] {
  const seen = new Set<string>();
  return italianSurfaceTokens(textIt).filter((surfaceToken) => {
    const normalized = normalizeItalianToken(surfaceToken);
    if (
      (normalized.length < 2 && surfaceToken !== "è") ||
      ITALIAN_VOCAB_STOP_WORDS.has(surfaceToken) ||
      seen.has(normalized)
    ) {
      return false;
    }
    seen.add(normalized);
    return true;
  });
}

export function findUncoveredVocabularyTokens(
  textIt: string,
  suggestions: VocabularySuggestion[]
): string[] {
  const covered = new Set(
    suggestions
      .filter(
        (suggestion) =>
          typeof suggestion?.term_it === "string" &&
          typeof suggestion?.term_fa === "string" &&
          suggestion.term_fa.trim().length > 0
      )
      .flatMap((suggestion) => italianTokens(suggestion.term_it))
  );
  return vocabularyCoverageTokens(textIt).filter(
    (token) => !covered.has(normalizeItalianToken(token))
  );
}

export function hasCompleteVocabularyCoverage(
  textIt: string,
  suggestions: VocabularySuggestion[]
): boolean {
  return findUncoveredVocabularyTokens(textIt, suggestions).length === 0;
}

function mergeAndOrderVocabulary(
  textIt: string,
  batches: VocabularySuggestion[][]
): VocabularySuggestion[] {
  const sourceOrder = vocabularyCoverageTokens(textIt).map(normalizeItalianToken);
  const seen = new Set<string>();
  const merged = batches.flat().filter((item) => {
    if (
      !item ||
      typeof item.term_it !== "string" ||
      typeof item.term_fa !== "string" ||
      item.term_fa.trim().length === 0
    ) {
      return false;
    }
    const key = normalizeItalianToken(item.term_it.trim());
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return merged
    .map((item, stableIndex) => {
      const termTokens = italianTokens(item.term_it);
      const sourceIndex = sourceOrder.findIndex((token) => termTokens.includes(token));
      return { item, stableIndex, sourceIndex: sourceIndex < 0 ? Number.MAX_SAFE_INTEGER : sourceIndex };
    })
    .sort((a, b) => a.sourceIndex - b.sourceIndex || a.stableIndex - b.stableIndex)
    .map(({ item }) => item);
}

/**
 * 🎓 مربی تئوری — Full Theory Explanation
 * Persona: an experienced Italian driving-school instructor (scuola guida) who
 * teaches Persian-speaking students. Explains the exact traffic-code rule
 * (Codice della Strada) behind this question, why it's a common mistake, and
 * what mental tip (trucchetto) will help the student remember it.
 * Token budget: 1100 (independent — never competes with translation or grammar).
 * §20.1: vision when the question has an image. This used to be text-only on the
 * reasoning that we're explaining the rule, not the sign — which is true for text
 * questions and false for the ~4k image ones, where the sign IS the rule. Blind,
 * it produced four confidently-structured hallucinated sections at 1100 tokens.
 */
export async function explainTheory(
  env: Env,
  textIt: string,
  correctAnswer: number,
  db?: D1Database,
  userId?: number,
  imageUrl?: string | null,
  sign?: SignAnchor | null
): Promise<TheoryResult> {
  const answerIt = correctAnswer === 1 ? "VERO" : "FALSO";
  // §20.1: image questions escalate to the vision model — see visionModel().
  const currentModel = imageUrl ? visionModel(env) : model(env);

  const systemPrompt = `شما «مربی تئوری» (مربی آزمون پاتنته B ایتالیا) هستید — یک مربی کارآزموده مدرسه رانندگی که به زبان فارسی روان به دانش‌آموزان ایرانی آموزش می‌دهد. فرض کنید دانش‌آموز هیچ پیش‌زمینه‌ای از این مبحث ندارد.

پیش از نوشتن پاسخ، بی‌صدا این چهار مورد را بررسی کنید: ادعای دقیق جمله، پاسخ ${answerIt}، شرط‌ها و استثناهای واقعاً مرتبط، و سازگاری نتیجه با تصویر یا اطلاعات قطعی تابلو. فرایند بررسی درونی را ننویسید؛ فقط استدلال آموزشی روشن و قابل بررسی را نشان دهید.

اصل حاکم بر پاسخ: مفهوم را قدم‌به‌قدم بسازید. هر جمله باید یک اطلاعات قابل استفاده بدهد. اگر جمله‌ای را می‌شود بدون تغییر زیر یک سوال کاملاً متفاوت هم گذاشت، آن جمله را حذف کنید.
${
  imageUrl
    ? `
این سوال یک تصویر دارد و تصویر منبع اصلی پاسخ است. هرگز فرض نکنید محتوای تصویر همان چیزی است که متن ادعا می‌کند. اگر تصویر را با اطمینان تشخیص نمی‌دهید، فقط شکل، رنگ و نماد قابل مشاهده را بگویید؛ نام تابلو را حدس نزنید.
`
    : ""
}
ساختار پاسخ شما — دقیقاً همین چهار بخش با همین تیترها:

${
  imageUrl
    ? `**۱. اول تصویر و حکم**
با زبان ساده بگویید چه می‌بینیم و چرا همین مشاهده پاسخ را ${answerIt} می‌کند. نام ایتالیایی تابلو را همراه با معنی فارسی آن بنویسید. در شکل تقاطع، مسیر خودروها را با حرفشان توضیح دهید.`
    : `**۱. اول معنی سوال و حکم**
در یک یا دو جمله ساده بگویید سوال واقعاً چه ادعایی دارد و کدام کلمه، عبارت یا شرط پاسخ را ${answerIt} می‌کند. عبارت ایتالیایی را همراه با معنی فارسی آن بنویسید.`
}

**۲. قانون قدم‌به‌قدم**
قانون را با این ترتیب آموزش دهید: «وضعیت» چه زمانی است؛ «قانون» از راننده چه می‌خواهد؛ «نتیجه» چه می‌شود. فقط عدد، شرط و استثنایی را اضافه کنید که مستقیماً برای همین سوال لازم است. اگر اصطلاح ایتالیایی ضروری است، معنی فارسی آن را همان بار اول داخل پرانتز بیاورید.

**۳. مثال ملموس**
یک مثال واقعی و کوتاه از رانندگی روزمره بسازید. در مثال مشخص کنید راننده کجاست، چه چیزی می‌بیند، و دقیقاً چه کاری انجام می‌دهد. مثال باید همان قانون بخش ۲ را نشان دهد، نه یک توصیه کلی.

**۴. تله سوال و یادآوری**
بگویید دانش‌آموز معمولاً کدام واژه یا تفاوت را اشتباه می‌خواند. سپس یک جمله کوتاه و مشخص برای حفظ کردن بنویسید.

ممنوعیت‌های قطعی:
• جمله‌های توخالی: «طبق کدیچه دلا استرادا»، «رعایت این قانون برای ایمنی مهم است»، «باید همیشه احتیاط کرد»، «این نکته را به خاطر بسپارید» — هیچ‌کدام را ننویسید
• بازنویسی صورت سوال به عنوان توضیح
• انباشتن همه حالت‌های ممکن قانون وقتی به این سوال ربط ندارند
• جمله‌های طولانی و اصطلاح حقوقی بدون معنی ساده فارسی
• شماره ماده قانونی؛ خود قانون را آموزش دهید، نه شماره آن را
• مقدمه و نتیجه‌گیری — با بخش ۱ شروع کنید و با بخش ۴ تمام کنید

زبان: فارسی روان و ساده. اصطلاحات ایتالیایی آزمون را عیناً در متن نگه دارید (با ترجمه کوتاه در پرانتز بار اول).`;

  const userPrompt = `سوال آزمون: «${textIt}»
پاسخ صحیح: ${answerIt}${imageUrl ? "\n(تصویر این سوال ضمیمه شده است — اول آن را بخوانید.)" : ""}${signAnchorBlock(sign)}

هر چهار بخش را بنویسید (بدون JSON — متن آزاد فارسی):`;

  // §20.1: same high-detail rationale as translateQuestion — 400×400 source images
  // are one tile either way, and sign/diagram detail is the whole answer here.
  const userMessage = imageUrl
    ? {
        role: "user",
        content: [
          { type: "text", text: userPrompt },
          { type: "image_url", image_url: { url: imageUrl, detail: "high" } },
        ],
      }
    : { role: "user", content: userPrompt };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: currentModel,
      messages: [{ role: "system", content: systemPrompt }, userMessage],
      temperature: 0.2, // lower = fewer invented rules
      max_tokens: 1100, // four sections need room; truncation is what reads as "vague"
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
 * every content-bearing vocabulary term, in sentence order, with a Persian translation.
 * Returns a JSON object so vocab words can be rendered as individual save-able chips.
 * Token budget scales from 1200–2400; deterministic coverage checks trigger up
 * to two targeted repair calls rather than accepting or caching a partial list.
 * §15.4: text-only even for image questions.
 */
export async function analyzeGrammar(
  env: Env,
  textIt: string,
  db?: D1Database,
  userId?: number
): Promise<GrammarResult> {
  const currentModel = model(env);
  const coverageTokens = vocabularyCoverageTokens(textIt);
  const maxTokens = Math.min(2400, Math.max(1200, coverageTokens.length * 55));

  const systemPrompt = `شما «معلم گرامر» هستید — یک استاد زبان ایتالیایی که تخصص در متون آزمون پاتنته B دارد و به دانش‌آموزان فارسی‌زبان تدریس می‌کند.

وظیفه شما دو بخش دارد:
۱. **تحلیل گرامری**: ساختار دستوری جمله ایتالیایی را با لحن آموزشی توضیح دهید — زمان فعل، نکات نحوی مهم، کلمات کلیدی مثل «salvo», «qualora», «purché» و غیره که معنا را تغییر می‌دهند.
۲. **پوشش کامل لغات**: جمله را از ابتدا تا انتها و از اولین واژه تا آخرین واژه اسکن کنید. همه واژه‌ها و عبارت‌های معنادار را به ترتیب ظاهرشدن توضیح دهید؛ هیچ واژه‌ای را به دلیل طول جمله یا قرارگرفتن در نیمه دوم حذف نکنید. فقط حروف تعریف، حروف اضافه ساده و ضمیرهای دستوری که به تنهایی کارت آموزشی مفیدی نیستند می‌توانند حذف شوند.

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
- vocab_suggestions: تعداد ثابت یا سقف ۳ تا ۶ ندارد؛ تمام واژه‌های معنادار فهرست پوشش را برگردانید
- ترتیب vocab_suggestions باید دقیقاً از ابتدای جمله به انتهای جمله باشد
- term_it باید شکل دقیق واژه یا عبارت در همین جمله را حفظ کند تا پوشش آن قابل بررسی باشد
- term_fa باید معنی کوتاه و روشن همان واژه در بافت همین جمله باشد
- هر دو بخش ضروری هستند
- انفینیتیو (مصدر) فقط برای افعال (§19.3 + تمایز فعل/اسم):
  • فقط برای شکل‌های صرف‌شده افعال (verbi coniugati) مصدر بنویسید — مثال: "avviene (مصدر: avvenire)"
  • برای اسم‌ها (sostantivi)، صفت‌ها (aggettivi) و سایر واژگان غیرفعلی هرگز مصدر نگذارید — مثال: "veicolo" فقط "veicolo" بنویسید، نه "veicolo (مصدر: …)"
  • اگر یک واژه هم فعل و هم اسم می‌تواند باشد (مثل "arresto")، بر اساس نقش آن در همین جمله تصمیم بگیرید — اگر اسم است، مصدر نگذارید
  • در vocab_suggestions: برای آیتم‌های فعلی، term_it شامل شکل جمله + مصدر باشد. برای آیتم‌های غیرفعلی، فقط خود واژه
  • در grammar_analysis: همین تفکیک رعایت شود`;

  const userPrompt = `جمله ایتالیایی آزمون: «${textIt}»

فهرست کنترل پوشش (هر مورد باید در term_it یکی از آیتم‌ها دیده شود):
${coverageTokens.join("، ")}

تحلیل گرامری و پوشش کامل لغات را به صورت JSON برگردانید. پیش از پاسخ، بررسی کنید آخرین واژه معنادار جمله هم پوشش داده شده باشد:`;

  const callOpenAI = async (body: object) => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const bodyText = await response.text();
      throw new Error(`OpenAI error ${response.status}: ${bodyText}`);
    }

    return (await response.json()) as {
      choices: { message: { content: string } }[];
      usage?: { prompt_tokens: number; completion_tokens: number };
    };
  };

  const logUsage = async (
    data: { usage?: { prompt_tokens: number; completion_tokens: number } },
    action: "grammar_analyze" | "grammar_vocab_repair"
  ) => {
    if (!db || !data.usage) return;
    const promptTokens = data.usage.prompt_tokens || 0;
    const completionTokens = data.usage.completion_tokens || 0;
    const cost = calculateCost(currentModel, promptTokens, completionTokens);
    await db
      .prepare(
        `INSERT INTO api_usage_logs (user_id, service, model, action, prompt_tokens, completion_tokens, estimated_cost_usd)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        userId || null,
        "openai",
        currentModel,
        action,
        promptTokens,
        completionTokens,
        cost
      )
      .run()
      .catch(() => {});
  };

  const initialData = await callOpenAI({
    model: currentModel,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.2,
    max_tokens: maxTokens,
  });
  await logUsage(initialData, "grammar_analyze");

  const parsed = JSON.parse(initialData.choices[0]?.message?.content ?? "{}") as {
    grammar_analysis?: string;
    vocab_suggestions?: VocabularySuggestion[];
  };

  let suggestions = mergeAndOrderVocabulary(
    textIt,
    [Array.isArray(parsed.vocab_suggestions) ? parsed.vocab_suggestions : []]
  );

  // Models occasionally stop halfway through a long list even with a generous
  // token budget. Detect that deterministically from the source sentence and ask
  // only for the omissions. Two targeted repair passes keep incomplete results
  // out of the permanent cache without multiplying normal requests.
  for (let attempt = 0; attempt < 2; attempt++) {
    const missing = findUncoveredVocabularyTokens(textIt, suggestions);
    if (missing.length === 0) break;

    const repairData = await callOpenAI({
      model: currentModel,
      messages: [
        {
          role: "system",
          content: `شما بازبین پوشش لغات ایتالیایی هستید. فقط واژه‌های جاافتاده‌ای را که کاربر مشخص کرده، با معنی ساده فارسی برگردانید. شکل دقیق موجود در جمله را در term_it نگه دارید و برای فعل صرف‌شده مصدر را هم اضافه کنید. خروجی فقط JSON با کلید vocab_suggestions باشد.`,
        },
        {
          role: "user",
          content: `جمله کامل: «${textIt}»

واژه‌های جاافتاده که همه باید پوشش داده شوند: ${missing.join("، ")}

موارد موجود (تکرار نکنید): ${JSON.stringify(suggestions)}

خروجی: {"vocab_suggestions":[{"term_it":"...","term_fa":"..."}]}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.1,
      max_tokens: Math.min(1800, Math.max(500, missing.length * 55)),
    });
    await logUsage(repairData, "grammar_vocab_repair");

    const repaired = JSON.parse(
      repairData.choices[0]?.message?.content ?? "{}"
    ) as { vocab_suggestions?: VocabularySuggestion[] };
    suggestions = mergeAndOrderVocabulary(textIt, [
      suggestions,
      Array.isArray(repaired.vocab_suggestions) ? repaired.vocab_suggestions : [],
    ]);
  }

  const stillMissing = findUncoveredVocabularyTokens(textIt, suggestions);
  if (stillMissing.length > 0) {
    throw new Error(
      `OpenAI vocabulary coverage incomplete; missing: ${stillMissing.join(", ")}`
    );
  }

  return {
    grammar_analysis: parsed.grammar_analysis ?? "",
    vocab_suggestions: suggestions,
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
