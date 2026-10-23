/**
 * src/content/ch1-strada.ts
 * Chapter 1 (Definizioni generali e doveri nell'uso della strada), lessons 1–6:
 * the road and its parts, lanes, reading the bank's road figures, elements on
 * the road, road types, junctions and restricted zones.
 *
 * Same trust rules as src/content/lessons.ts: every statement is a verbatim bank
 * row (checked against question-provenance.json in tests/chapter1.test.ts), and
 * `related` maps each bank question of the chapter to exactly one section.
 */
import type { Lesson } from "./lessons.js";

const range = (from: number, to: number): string[] =>
  Array.from({ length: to - from + 1 }, (_, i) => String(from + i));

const FIG = "La strada rappresentata";
const FIG_FA = "جاده‌ی نشان‌داده‌شده";

// ── Lesson 1 ──────────────────────────────────────────────────────────────────

export const lessonStrada: Lesson = {
  id: "strada-e-carreggiata",
  titleFa: "جاده، سواره‌رو و بخش‌های کنارش",
  titleIt: "STRADA · CARREGGIATA · BANCHINA · MARCIAPIEDE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس فرق strada (کل جاده) و carreggiata (سواره‌رو) را می‌دانی و می‌گویی banchina، marciapiede و pista ciclabile کجای جاده‌اند و چرا جزو سواره‌رو نیستند.",
      why:
        "بیش از ۴۰ سؤال این فصل فقط همین را می‌سنجند: یک بخش جزو کدام است. بیشتر جمله‌های غلط یک کلمه را عوض کرده‌اند: strada به جای carreggiata.",
    },
    {
      kind: "anatomy",
      title: "یک جاده را تکه‌تکه ببین",
      scene: "street",
      body:
        "روی هر بخش تصویر بزن تا اسم ایتالیایی و نقشش را ببینی. به برچسب «جزو carreggiata» دقت کن: فقط بخشی که خودروها رویش حرکت می‌کنند سواره‌رو است.",
      parts: [
        {
          id: "strada",
          nameIt: "Strada",
          nameFa: "جاده (کل فضا)",
          text: "فضای عمومی برای عبور عابر پیاده، حیوان و وسیله‌ی نقلیه. سواره‌رو، شانه، پیاده‌رو و مسیر دوچرخه همه جزو strada هستند.",
        },
        {
          id: "carreggiata",
          nameIt: "Carreggiata",
          nameFa: "سواره‌رو",
          text: "بخشی از جاده که برای حرکت وسایل نقلیه است. از یک یا چند corsia تشکیل می‌شود و معمولاً خط سفید کناری لبه‌اش را نشان می‌دهد. می‌تواند یک‌طرفه یا دوطرفه باشد.",
          inCarreggiata: true,
        },
        {
          id: "corsia",
          nameIt: "Corsia",
          nameFa: "خط عبور",
          text: "نواری از سواره‌رو که فقط یک ردیف خودرو در آن جا می‌شود. درس بعد کامل به آن می‌پردازد.",
          inCarreggiata: true,
        },
        {
          id: "margine",
          nameIt: "Striscia di margine",
          nameFa: "خط سفید کناری",
          text: "خط سفید ممتدی که لبه‌ی سواره‌رو را نشان می‌دهد. هر چه آن طرف این خط است دیگر carreggiata نیست.",
        },
        {
          id: "banchina",
          nameIt: "Banchina",
          nameFa: "شانه‌ی جاده",
          text: "بین لبه‌ی سواره‌رو و پیاده‌رو (یا جدول، یا لبه‌ی شیب کنار جاده). جزو strada است ولی بیرون از carreggiata؛ معمولاً جای حرکت خودرو نیست.",
          inCarreggiata: false,
        },
        {
          id: "marciapiede",
          nameIt: "Marciapiede",
          nameFa: "پیاده‌رو",
          text: "بیرون سواره‌رو، برآمده یا جداشده و محافظت‌شده، فقط برای عابر پیاده.",
          inCarreggiata: false,
        },
        {
          id: "ciclabile",
          nameIt: "Pista ciclabile",
          nameFa: "مسیر دوچرخه",
          text: "نوار جداشده‌ی مخصوص دوچرخه. جزو strada است، جزو carreggiata نیست.",
          inCarreggiata: false,
        },
      ],
      takeaway: "strada همه چیز است؛ carreggiata فقط جای حرکت خودروها. banchina، marciapiede و pista ciclabile بیرون carreggiata هستند.",
      rule: "CdS art. 2 c.1; art. 3 c.1 n.4, n.7, n.33, n.39",
    },
    {
      kind: "factors",
      title: "چه چیزی جزو سواره‌رو است؟",
      body:
        "خط‌کشی‌هایی که روی آسفالتِ سواره‌رو کشیده شده‌اند جزو آن‌اند، حتی خط عابر پیاده. هر چه بیرون خط سفید کناری است جزو آن نیست.",
      columns: [
        {
          title: "جزو carreggiata هست (VERO)",
          items: [
            { fa: "خط‌های عبور معمولی", it: "le corsie di marcia", sourceId: "157", textIt: "Fanno parte della carreggiata le corsie di marcia", answer: 1 },
            { fa: "خط سبقت", it: "le corsie di sorpasso", sourceId: "160", textIt: "Fanno parte della carreggiata le corsie di sorpasso", answer: 1 },
            { fa: "خط عابر پیاده", it: "gli attraversamenti pedonali", sourceId: "159", textIt: "Fanno parte della carreggiata gli attraversamenti pedonali", answer: 1 },
            { fa: "گذرگاه دوچرخه", it: "gli attraversamenti ciclabili", sourceId: "158", textIt: "Fanno parte della carreggiata gli attraversamenti ciclabili", answer: 1 },
          ],
        },
        {
          title: "جزو carreggiata نیست (FALSO)",
          items: [
            { fa: "شانه‌ها", it: "le banchine", sourceId: "162", textIt: "Fanno parte della carreggiata le banchine", answer: 0 },
            { fa: "پیاده‌روها", it: "i marciapiedi", sourceId: "163", textIt: "Fanno parte della carreggiata i marciapiedi", answer: 0 },
            { fa: "خط اضطراری آزادراه", it: "le corsie di emergenza delle autostrade", sourceId: "161", textIt: "Fanno parte della carreggiata le corsie di emergenza delle autostrade", answer: 0 },
            { fa: "محل توقف کنار جاده", it: "le piazzole di sosta", sourceId: "156", textIt: "La carreggiata comprende le piazzole di sosta", answer: 0 },
          ],
        },
      ],
      takeaway: "خط اضطراری (corsia di emergenza) با اینکه اسمش corsia است، کنار سواره‌رو است، نه داخل آن.",
      rule: "CdS art. 3 c.1 n.7, n.15, n.38",
    },
    {
      kind: "factors",
      title: "strada چه چیزهایی را در بر می‌گیرد؟",
      body: "strada بزرگ‌ترین ظرف است: هر بخشی که در این درس دیدی داخل آن است. برای همه است، نه فقط برای خودروها.",
      columns: [
        {
          title: "درست است (VERO)",
          items: [
            { fa: "می‌تواند چند سواره‌رو داشته باشد", it: "può essere suddivisa in carreggiate", sourceId: "122", textIt: "La strada può essere suddivisa in carreggiate", answer: 1 },
            { fa: "مسیر دوچرخه را هم شامل می‌شود", it: "può comprendere le piste ciclabili", sourceId: "123", textIt: "La strada può comprendere le piste ciclabili", answer: 1 },
            { fa: "برای عابر، حیوان و وسیله‌ی نقلیه باز است", it: "aperta alla circolazione dei pedoni, degli animali e dei veicoli", sourceId: "126", textIt: "La strada è aperta alla circolazione dei pedoni, degli animali e dei veicoli", answer: 1 },
            { fa: "سواره‌رو برای حرکت وسایل نقلیه است", it: "destinata normalmente alla circolazione dei veicoli", sourceId: "151", textIt: "La carreggiata è la parte della strada destinata normalmente alla circolazione dei veicoli", answer: 1 },
          ],
        },
        {
          title: "غلط است (FALSO)",
          items: [
            { fa: "strada شانه‌ها را شامل نمی‌شود", it: "non comprende le banchine", sourceId: "127", textIt: "La strada non comprende le banchine", answer: 0 },
            { fa: "فقط برای خودرو و موتور است", it: "riservata alla circolazione dei soli autoveicoli e motocicli", sourceId: "128", textIt: "La strada è riservata alla circolazione dei soli autoveicoli e motocicli", answer: 0 },
            { fa: "سواره‌رو برای توقف اضطراری است", it: "destinata alla sosta di emergenza", sourceId: "153", textIt: "La carreggiata è destinata alla sosta di emergenza", answer: 0 },
            { fa: "سواره‌رو جای پارک کامیون‌هاست", it: "destinata alla sosta degli autocarri", sourceId: "154", textIt: "La carreggiata è destinata alla sosta degli autocarri", answer: 0 },
          ],
        },
      ],
      takeaway: "اگر جمله strada را به خودروها محدود کرد یا بخشی را از آن بیرون گذاشت، غلط است.",
      rule: "CdS art. 2 c.1; art. 3 c.1 n.7",
    },
    {
      kind: "table",
      title: "شانه یا پیاده‌رو؟",
      body: "هر دو بیرون سواره‌رو هستند، ولی کار و جایشان فرق دارد.",
      columns: ["banchina", "marciapiede"],
      rows: [
        { label: "کجاست؟", values: ["آن طرفِ خط سفید ممتد کناری، بین سواره‌رو و پیاده‌رو یا لبه‌ی جاده", "کنار جاده، برآمده یا با مانع جدا و محافظت‌شده"] },
        { label: "مال کیست؟", values: ["معمولاً جای حرکت خودرو نیست", "فقط عابر پیاده؛ نه دوچرخه، نه موتور"] },
        { label: "پارک", values: ["قانون سقفی مثل «۵ ساعت» برایش ندارد", "فقط جایی که خط‌کشی پارک کشیده شده"] },
        { label: "جزو carreggiata؟", values: ["نه", "نه"] },
      ],
      takeaway: "عدد دقیق و ساختگی (مثل «۵ ساعت») در جمله‌ی تعریفی معمولاً نشانه‌ی FALSO است.",
      rule: "CdS art. 3 c.1 n.4, n.33; art. 158 c.2",
    },
    {
      kind: "terms",
      title: "کلمه‌های این درس",
      terms: [
        { it: "la strada", fa: "جاده، کل فضای عبور" },
        { it: "la carreggiata", fa: "سواره‌رو" },
        { it: "la banchina", fa: "شانه‌ی جاده" },
        { it: "il marciapiede", fa: "پیاده‌رو" },
        { it: "la pista ciclabile", fa: "مسیر دوچرخه" },
        { it: "comprende", fa: "شامل می‌شود", base: "comprendere" },
        { it: "fanno parte di", fa: "جزو … هستند", base: "fare parte di" },
        { it: "la sosta", fa: "پارک، توقف طولانی" },
      ],
    },
    {
      kind: "trap",
      title: "تله: strada یا carreggiata؟",
      body: "این دو جمله ساختار یکسانی دارند و هر دو «non comprende» دارند. فقط اسمِ ظرف عوض شده است.",
      examples: [
        {
          sourceId: "149",
          textIt: "La carreggiata non comprende le piste ciclabili",
          answer: 1,
          chunks: [
            { it: "La carreggiata", fa: "سواره‌رو" },
            { it: "non comprende", fa: "شامل نمی‌شود", focus: "negation", verb: "comprende ← comprendere" },
            { it: "le piste ciclabili", fa: "مسیرهای دوچرخه را" },
          ],
          translation: "سواره‌رو مسیرهای دوچرخه را شامل نمی‌شود.",
          why: "درست است. مسیر دوچرخه جزو strada است ولی بیرون سواره‌رو.",
        },
        {
          sourceId: "127",
          textIt: "La strada non comprende le banchine",
          answer: 0,
          chunks: [
            { it: "La strada", fa: "جاده" },
            { it: "non comprende", fa: "شامل نمی‌شود", focus: "negation", verb: "comprende ← comprendere" },
            { it: "le banchine", fa: "شانه‌ها را" },
          ],
          translation: "جاده شانه‌ها را شامل نمی‌شود.",
          why: "غلط است. strada همه‌ی بخش‌ها را در بر می‌گیرد، از جمله شانه.",
        },
      ],
      takeaway: "اول ببین فاعل جمله strada است یا carreggiata؛ بعد بپرس آن بخش داخلش هست یا نه.",
    },
  ],
  practice: [
    {
      sourceId: "150",
      textIt: "La carreggiata non comprende i marciapiedi",
      answer: 1,
      chunks: [
        { it: "La carreggiata", fa: "سواره‌رو" },
        { it: "non comprende", fa: "شامل نمی‌شود", focus: "negation", verb: "comprende ← comprendere" },
        { it: "i marciapiedi", fa: "پیاده‌روها را" },
      ],
      translation: "سواره‌رو پیاده‌روها را شامل نمی‌شود.",
      why: "درست است. پیاده‌رو بیرون سواره‌رو و مخصوص عابر پیاده است؛ سواره‌رو فقط بخش حرکت وسایل نقلیه است.",
      rule: "CdS art. 3 c.1 n.7, n.33",
      conceptStep: 1,
    },
    {
      sourceId: "208",
      textIt: "Il marciapiede è una parte della carreggiata",
      answer: 0,
      chunks: [
        { it: "Il marciapiede", fa: "پیاده‌رو" },
        { it: "è una parte della carreggiata", fa: "بخشی از سواره‌رو است" },
      ],
      translation: "پیاده‌رو بخشی از سواره‌رو است.",
      why: "غلط است. پیاده‌رو بخشی از strada هست، ولی بیرون carreggiata.",
      rule: "CdS art. 3 c.1 n.33",
      conceptStep: 2,
    },
    {
      sourceId: "130",
      textIt: "La strada non comprende i marciapiedi",
      answer: 0,
      chunks: [
        { it: "La strada", fa: "جاده" },
        { it: "non comprende", fa: "شامل نمی‌شود", focus: "negation", verb: "comprende ← comprendere" },
        { it: "i marciapiedi", fa: "پیاده‌روها را" },
      ],
      translation: "جاده پیاده‌روها را شامل نمی‌شود.",
      why: "غلط است. همین جمله با «La carreggiata» درست بود؛ اینجا فاعل strada است و strada پیاده‌رو را هم در بر می‌گیرد.",
      rule: "CdS art. 2 c.1; art. 3 c.1 n.33",
      conceptStep: 3,
    },
    {
      sourceId: "199",
      textIt: "La banchina è parte della strada, situata oltre la linea bianca continua di margine della carreggiata",
      answer: 1,
      chunks: [
        { it: "La banchina", fa: "شانه‌ی جاده" },
        { it: "è parte della strada,", fa: "بخشی از جاده است،" },
        { it: "situata oltre", fa: "که آن طرفِ … قرار دارد" },
        { it: "la linea bianca continua di margine della carreggiata", fa: "خط سفید ممتدِ کناریِ سواره‌رو" },
      ],
      translation: "شانه‌ی جاده بخشی از جاده است که آن طرفِ خط سفید ممتدِ کناریِ سواره‌رو قرار دارد.",
      why: "درست است. خط سفید کناری لبه‌ی سواره‌رو است و شانه بلافاصله بیرون آن شروع می‌شود.",
      rule: "CdS art. 3 c.1 n.4",
      conceptStep: 4,
    },
    {
      sourceId: "201",
      textIt: "Sulle banchine la sosta dei veicoli è consentita per un massimo di 5 ore",
      answer: 0,
      chunks: [
        { it: "Sulle banchine", fa: "روی شانه‌ها" },
        { it: "la sosta dei veicoli", fa: "پارک وسایل نقلیه" },
        { it: "è consentita", fa: "مجاز است", verb: "consentita ← consentire" },
        { it: "per un massimo di 5 ore", fa: "حداکثر ۵ ساعت", focus: "limit" },
      ],
      translation: "روی شانه‌ها پارک وسایل نقلیه حداکثر ۵ ساعت مجاز است.",
      why: "غلط است. قانون چنین سقف «۵ ساعته‌ای» برای شانه ندارد؛ این عدد ساختگی است.",
      rule: "CdS art. 3 c.1 n.4; art. 157",
      conceptStep: 4,
    },
  ],
  related: [
    { step: 2, sourceIds: [...range(146, 150), "152", "155", ...range(157, 163)] },
    { step: 3, sourceIds: [...range(122, 131), "151", "153", "154", "156"] },
    { step: 4, sourceIds: range(197, 211) },
  ],
};

// ── Lesson 2 ──────────────────────────────────────────────────────────────────

export const lessonCorsie: Lesson = {
  id: "corsie",
  titleFa: "خط عبور و انواعش",
  titleIt: "CORSIA · ACCELERAZIONE · DECELERAZIONE",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی corsia دقیقاً چیست، چه انواعی دارد و کدام خط برای ورود به آزادراه است و کدام برای خروج.",
      why: "بانک بیش از ۳۰ جمله درباره‌ی corsia دارد. بیشترِ تله‌ها جای «ورود» و «خروج» یا «یک ردیف» و «دو ردیف» را عوض کرده‌اند.",
    },
    {
      kind: "anatomy",
      title: "خط‌ها در یک آزادراه",
      scene: "lanes",
      body: "روی هر خط بزن. خطی که از رمپ به جاده می‌رسد برای ورود است و خطی که از جاده جدا می‌شود برای خروج.",
      parts: [
        { id: "marcia", nameIt: "Corsia di marcia", nameFa: "خط عبور معمولی (راست)", text: "خط عادی حرکت. در جاده‌هایی که چند خط در هر جهت دارند، خط راست برای حرکت معمولی است.", inCarreggiata: true },
        { id: "sorpasso", nameIt: "Corsia di sorpasso", nameFa: "خط سبقت (چپ)", text: "خط چپ، برای سبقت. بعد از سبقت به راست برمی‌گردی.", inCarreggiata: true },
        { id: "accelerazione", nameIt: "Corsia di accelerazione", nameFa: "خط افزایش سرعت (ورود)", text: "برای ورود به سواره‌رو: در آن سرعت می‌گیری تا با جریان یکی شوی. برای سبقت نیست.", inCarreggiata: false },
        { id: "decelerazione", nameIt: "Corsia di decelerazione", nameFa: "خط کاهش سرعت (خروج)", text: "برای خروج از سواره‌رو، مثلاً به سمت خروجی یا area di servizio، بدون کند کردن بقیه. جای توقف نیست.", inCarreggiata: false },
        { id: "emergenza", nameIt: "Corsia di emergenza", nameFa: "خط اضطراری", text: "کنار سواره‌رو، برای توقف اضطراری (خرابی، حال بد) و عبور خودروهای امدادی.", inCarreggiata: false },
      ],
      takeaway: "accelerazione = ورود و سرعت گرفتن؛ decelerazione = خروج و کم کردن سرعت. هیچ‌کدام برای سبقت یا پارک نیستند.",
      rule: "CdS art. 3 c.1 n.12–18",
    },
    {
      kind: "factors",
      title: "corsia چیست و چه چیزی نیست؟",
      body: "corsia همیشه یک ردیف خودرو را جا می‌دهد و با خط‌کشی جدا می‌شود. مالک جاده می‌تواند آن را به گروهی خاص یا کاری خاص اختصاص دهد.",
      columns: [
        {
          title: "درست است (VERO)",
          items: [
            { fa: "فقط یک ردیف خودرو", it: "consente la circolazione di una sola fila di veicoli", sourceId: "172", textIt: "La corsia è una parte della carreggiata che consente la circolazione di una sola fila di veicoli", answer: 1 },
            { fa: "می‌تواند مخصوص تاکسی و اتوبوس باشد", it: "riservata alla circolazione di alcune categorie di veicoli", sourceId: "169", textIt: "La corsia può essere riservata alla circolazione di alcune categorie di veicoli (taxi, autobus, ecc.)", answer: 1 },
            { fa: "می‌تواند مخصوص گردش باشد (corsia specializzata)", it: "riservata ai veicoli che intendono svoltare", sourceId: "174", textIt: "La corsia può essere riservata ai veicoli che intendono svoltare (corsia specializzata)", answer: 1 },
            { fa: "ممکن است حداقل سرعت اجباری داشته باشد", it: "velocità minima obbligatoria", sourceId: "171", textIt: "L'ente proprietario della strada può imporre che su una corsia i veicoli transitino ad una velocità minima obbligatoria", answer: 1 },
          ],
        },
        {
          title: "غلط است (FALSO)",
          items: [
            { fa: "corsia دوطرفه است", it: "può essere a doppio senso di circolazione", sourceId: "177", textIt: "La corsia può essere a doppio senso di circolazione", answer: 0 },
            { fa: "از دو سواره‌رو تشکیل شده", it: "è formata da due carreggiate", sourceId: "180", textIt: "La corsia è formata da due carreggiate", answer: 0 },
            { fa: "در شهر دو موتور کنار هم در یک خط", it: "possono circolare affiancati due motocicli", sourceId: "182", textIt: "Nei centri abitati, su una stessa corsia possono circolare affiancati due motocicli", answer: 0 },
            { fa: "بیرون شهر دو موپد کنار هم در یک خط", it: "possono circolare affiancati due ciclomotori", sourceId: "183", textIt: "Fuori dai centri abitati, su una stessa corsia possono circolare affiancati due ciclomotori", answer: 0 },
          ],
        },
      ],
      takeaway: "«یک ردیف» یعنی نه دو موتور کنار هم، نه دو جهت. corsia جزئی از carreggiata است، نه برعکس.",
      rule: "CdS art. 3 c.1 n.12, n.17, n.18",
    },
    {
      kind: "table",
      title: "ورود یا خروج؟",
      body: "هر دو corsia specializzata هستند. تله‌ها معمولاً جهت را برعکس می‌کنند، مخصوصاً درباره‌ی area di servizio (محوطه‌ی خدمات).",
      columns: ["accelerazione", "decelerazione"],
      rows: [
        { label: "کارش", values: ["ورود به سواره‌رو و سرعت گرفتن", "خروج از سواره‌رو بدون کند کردن بقیه"] },
        { label: "کجا؟", values: ["ورود به آزادراه یا جاده‌ی برون‌شهری اصلی", "خروج از آزادراه یا جاده‌ی برون‌شهری اصلی"] },
        { label: "area di servizio", values: ["برگشتن از area di servizio به آزادراه", "رفتن از آزادراه به area di servizio"] },
        { label: "سبقت یا پارک؟", values: ["نه", "نه"] },
      ],
      takeaway: "هر بار که وارد سواره‌ی آزادراه می‌شوی (حتی از area di servizio) از خط accelerazione استفاده می‌کنی.",
      rule: "CdS art. 3 c.1 n.13, n.14; art. 176",
    },
    {
      kind: "terms",
      title: "کلمه‌های این درس",
      terms: [
        { it: "la corsia", fa: "خط عبور" },
        { it: "una sola fila di veicoli", fa: "فقط یک ردیف خودرو" },
        { it: "la corsia di accelerazione", fa: "خط افزایش سرعت (ورود)" },
        { it: "la corsia di decelerazione", fa: "خط کاهش سرعت (خروج)" },
        { it: "la corsia di emergenza", fa: "خط اضطراری" },
        { it: "riservata", fa: "مخصوصِ، اختصاص‌یافته", base: "riservare" },
        { it: "affiancati", fa: "کنار هم، پهلو به پهلو", base: "affiancare" },
        { it: "l'area di servizio", fa: "محوطه‌ی خدمات آزادراه" },
      ],
    },
    {
      kind: "trap",
      title: "تله: جهت حرکت را برعکس نکن",
      body: "هر دو جمله درباره‌ی area di servizio و خط افزایش سرعت‌اند. یکی برگشتن به آزادراه را می‌گوید و دیگری رفتن به محوطه را.",
      examples: [
        {
          sourceId: "187",
          textIt: "La corsia di accelerazione serve per rientrare sulla carreggiata dell’autostrada dopo che si è usciti da un’area di servizio",
          answer: 1,
          chunks: [
            { it: "La corsia di accelerazione", fa: "خط افزایش سرعت" },
            { it: "serve per rientrare", fa: "برای برگشتن است", verb: "rientrare ← rientrare" },
            { it: "sulla carreggiata dell’autostrada", fa: "به سواره‌روی آزادراه" },
            { it: "dopo che si è usciti da un’area di servizio", fa: "بعد از آنکه از محوطه‌ی خدمات بیرون آمدی", verb: "usciti ← uscire" },
          ],
          translation: "خط افزایش سرعت برای برگشتن به سواره‌روی آزادراه است، بعد از آنکه از محوطه‌ی خدمات بیرون آمدی.",
          why: "درست است. برگشتن به آزادراه یعنی ورود، پس خط افزایش سرعت.",
        },
        {
          sourceId: "190",
          textIt: "La corsia di accelerazione serve per abbandonare la carreggiata dell’autostrada ed entrare in un’area di sosta",
          answer: 0,
          chunks: [
            { it: "La corsia di accelerazione", fa: "خط افزایش سرعت" },
            { it: "serve per abbandonare", fa: "برای ترک کردن است", verb: "abbandonare ← abbandonare" },
            { it: "la carreggiata dell’autostrada", fa: "سواره‌روی آزادراه" },
            { it: "ed entrare in un’area di sosta", fa: "و وارد شدن به محوطه‌ی توقف" },
          ],
          translation: "خط افزایش سرعت برای ترک کردن سواره‌روی آزادراه و وارد شدن به محوطه‌ی توقف است.",
          why: "غلط است. ترک کردن آزادراه خروج است و برای خروج خط کاهش سرعت (decelerazione) هست.",
        },
      ],
      takeaway: "در هر جمله فعل را پیدا کن: entrare/rientrare = ورود، uscire/abbandonare = خروج.",
    },
  ],
  practice: [
    {
      sourceId: "165",
      textIt: "La corsia è limitata da strisce continue o discontinue",
      answer: 1,
      chunks: [
        { it: "La corsia", fa: "خط عبور" },
        { it: "è limitata", fa: "محدود می‌شود", verb: "limitata ← limitare" },
        { it: "da strisce continue o discontinue", fa: "با خط‌های ممتد یا خط‌چین" },
      ],
      translation: "خط عبور با خط‌های ممتد یا خط‌چین محدود می‌شود.",
      why: "درست است. خط‌کشی، چه ممتد چه خط‌چین، مرز هر corsia را نشان می‌دهد.",
      rule: "CdS art. 3 c.1 n.12; art. 40",
      conceptStep: 1,
    },
    {
      sourceId: "177",
      textIt: "La corsia può essere a doppio senso di circolazione",
      answer: 0,
      chunks: [
        { it: "La corsia", fa: "خط عبور" },
        { it: "può essere", fa: "می‌تواند باشد", verb: "può ← potere" },
        { it: "a doppio senso di circolazione", fa: "دوطرفه" },
      ],
      translation: "خط عبور می‌تواند دوطرفه باشد.",
      why: "غلط است. corsia فقط یک ردیف خودرو را جا می‌دهد، پس یک جهت دارد. carreggiata می‌تواند دوطرفه باشد، corsia نه.",
      rule: "CdS art. 3 c.1 n.12",
      conceptStep: 2,
    },
    {
      sourceId: "182",
      textIt: "Nei centri abitati, su una stessa corsia possono circolare affiancati due motocicli",
      answer: 0,
      chunks: [
        { it: "Nei centri abitati,", fa: "در شهرها،" },
        { it: "su una stessa corsia", fa: "در یک خط عبور" },
        { it: "possono circolare affiancati", fa: "می‌توانند کنار هم حرکت کنند", verb: "possono ← potere" },
        { it: "due motocicli", fa: "دو موتورسیکلت" },
      ],
      translation: "در شهرها دو موتورسیکلت می‌توانند در یک خط عبور کنار هم حرکت کنند.",
      why: "غلط است. یک corsia برای یک ردیف است؛ داخل یا بیرون شهر فرقی نمی‌کند.",
      rule: "CdS art. 3 c.1 n.12",
      conceptStep: 2,
    },
    {
      sourceId: "188",
      textIt: "La corsia di accelerazione può essere utilizzata per il sorpasso",
      answer: 0,
      chunks: [
        { it: "La corsia di accelerazione", fa: "خط افزایش سرعت" },
        { it: "può essere utilizzata", fa: "می‌تواند استفاده شود", verb: "utilizzata ← utilizzare" },
        { it: "per il sorpasso", fa: "برای سبقت" },
      ],
      translation: "از خط افزایش سرعت می‌توان برای سبقت استفاده کرد.",
      why: "غلط است. این خط فقط برای ورود و یکی شدن با جریان است، نه برای سبقت.",
      rule: "CdS art. 3 c.1 n.13; art. 176",
      conceptStep: 3,
    },
    {
      sourceId: "193",
      textIt: "La corsia di decelerazione serve per uscire dalla carreggiata dell’autostrada ed entrare nell’area di servizio",
      answer: 1,
      chunks: [
        { it: "La corsia di decelerazione", fa: "خط کاهش سرعت" },
        { it: "serve per uscire", fa: "برای خارج شدن است", verb: "uscire ← uscire" },
        { it: "dalla carreggiata dell’autostrada", fa: "از سواره‌روی آزادراه" },
        { it: "ed entrare nell’area di servizio", fa: "و وارد شدن به محوطه‌ی خدمات" },
      ],
      translation: "خط کاهش سرعت برای خارج شدن از سواره‌روی آزادراه و وارد شدن به محوطه‌ی خدمات است.",
      why: "درست است. «entrare» در اینجا گیجت نکند: از دید آزادراه این خروج است، پس خط کاهش سرعت.",
      rule: "CdS art. 3 c.1 n.14; art. 2 c.3 lett. A",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 2, sourceIds: range(164, 183) },
    { step: 3, sourceIds: range(184, 196) },
  ],
};

// ── Lesson 3 ──────────────────────────────────────────────────────────────────

export const lessonFigure: Lesson = {
  id: "carreggiate-in-figura",
  titleFa: "شمردن سواره‌رو و خط در تصویر",
  titleIt: "CARREGGIATE E CORSIE IN FIGURA",
  minutes: 4,
  signs: [],
  figures: [550, 552, 562],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس سه تصویرِ جاده‌ی بانک سؤال را می‌خوانی: چند سواره‌رو و چند خط دارد، کدام یک‌طرفه است و کدام خط برای سبقت.",
      why: "۲۶ سؤال فقط با همین سه تصویر پرسیده می‌شوند. اگر شمردن را یاد بگیری، همه‌شان تقریباً رایگان‌اند.",
    },
    {
      kind: "table",
      title: "قاعده‌ی شمردن",
      body: "سواره‌روها را مانعِ فیزیکی (مثلاً نوار چمن یا جداکننده) از هم جدا می‌کند. خط‌ها را فقط خط‌کشی جدا می‌کند. خط ممتد دوبل وسط جاده سواره‌رو را دو تا نمی‌کند.",
      columns: ["تصویر ۵۵۰", "تصویر ۵۵۲", "تصویر ۵۶۲"],
      rows: [
        { label: "سواره‌رو (carreggiata)", values: ["۱، دوطرفه", "۱، دوطرفه", "۳: دو کناری یک‌طرفه، وسطی دوطرفه"] },
        { label: "خط (corsia)", values: ["۴: دو تا در هر جهت", "۶: سه تا در هر جهت", "۸: ۲ + ۴ + ۲"] },
        { label: "وسط جاده", values: ["خط ممتد دوبل", "خط ممتد دوبل", "دو نوار چمن، و خط ممتد دوبل در سواره‌روی وسط"] },
      ],
      takeaway: "نوار چمن = سواره‌روی جدید؛ خط سفید (حتی دوبل) = فقط خط جدید.",
      rule: "CdS art. 3 c.1 n.7, n.12",
    },
    {
      kind: "classify",
      title: "خودت بشمار",
      body: "هر تصویر چند سواره‌رو دارد؟ اول خودت جواب بده، بعد توضیح را ببین.",
      options: [
        { it: "una carreggiata", fa: "یک سواره‌رو" },
        { it: "due carreggiate", fa: "دو سواره‌رو" },
        { it: "tre carreggiate", fa: "سه سواره‌رو" },
      ],
      items: [
        { prompt: "این جاده چند سواره‌رو دارد؟", figure: 550, answer: 0, explain: "یک سواره‌روی دوطرفه با چهار خط. خط ممتد دوبل وسط فقط دو جهت را جدا می‌کند." },
        { prompt: "این جاده چند سواره‌رو دارد؟", figure: 552, answer: 0, explain: "باز هم یک سواره‌رو، این بار با شش خط (سه تا در هر جهت). مانع فیزیکی‌ای در کار نیست." },
        { prompt: "این جاده چند سواره‌رو دارد؟", figure: 562, answer: 2, explain: "دو نوار چمن جاده را سه تکه کرده: سه سواره‌رو با روی هم هشت خط." },
      ],
      takeaway: "اول دنبال مانع فیزیکی بگرد، بعد خط‌ها را بشمار.",
    },
    {
      kind: "table",
      title: "کدام خط برای چیست؟",
      body: "در جاده‌ای که در هر جهت چند خط دارد، خط راست برای حرکت معمولی است و خط‌های دیگر برای سبقت. خط ممتد را نمی‌شود رد کرد، پس دور زدن هم ممنوع است.",
      columns: ["تصویر ۵۵۰", "تصویر ۵۵۲", "تصویر ۵۶۲"],
      rows: [
        { label: "حرکت معمولی", values: ["خط راست هر جهت", "خط راست هر جهت", "خط راست در هر سواره‌رو"] },
        { label: "سبقت", values: ["خط داخلی (چپ)، فقط از چپ", "خط وسط و چپ", "خط‌های چپ"] },
        { label: "سبقت در پیچ", values: ["مجاز: دو خط در هر جهت", "مجاز", "مجاز"] },
        { label: "دور زدن", values: ["ممنوع: خط ممتد دوبل", "ممنوع: خط ممتد دوبل", "در سواره‌روهای یک‌طرفه ممنوع"] },
      ],
      takeaway: "«همیشه» و «بی‌تفاوت از راست یا چپ» در این سؤال‌ها تقریباً همیشه FALSO است.",
      rule: "CdS art. 143 c.5; art. 148 c.3, c.10; art. 40 c.8",
    },
    {
      kind: "terms",
      title: "کلمه‌های این درس",
      terms: [
        { it: "del tipo rappresentato", fa: "از نوعی که نشان داده شده" },
        { it: "a doppio senso di circolazione", fa: "دوطرفه" },
        { it: "a senso unico", fa: "یک‌طرفه" },
        { it: "per ogni senso di marcia", fa: "در هر جهت حرکت" },
        { it: "la marcia ordinaria", fa: "حرکت معمولی" },
        { it: "il sorpasso", fa: "سبقت" },
        { it: "l'inversione di marcia", fa: "دور زدن" },
        { it: "di norma", fa: "معمولاً، طبق قاعده" },
      ],
    },
    {
      kind: "trap",
      title: "تله: corsie یا carreggiate؟",
      body: "دو جمله درباره‌ی همان تصویر ۵۶۲ و همان عدد «هشت». فقط اسمِ چیزی که شمرده شده فرق دارد.",
      examples: [
        {
          sourceId: "17",
          figure: 562,
          textIt: "La strada rappresentata è composta da otto corsie",
          answer: 1,
          chunks: [
            { it: FIG, fa: FIG_FA },
            { it: "è composta da", fa: "تشکیل شده از", verb: "composta ← comporre" },
            { it: "otto corsie", fa: "هشت خط عبور" },
          ],
          translation: "جاده‌ی نشان‌داده‌شده از هشت خط عبور تشکیل شده است.",
          why: "درست است: ۲ + ۴ + ۲ = هشت خط.",
        },
        {
          sourceId: "22",
          figure: 562,
          textIt: "La strada rappresentata è composta da otto carreggiate",
          answer: 0,
          chunks: [
            { it: FIG, fa: FIG_FA },
            { it: "è composta da", fa: "تشکیل شده از", verb: "composta ← comporre" },
            { it: "otto carreggiate", fa: "هشت سواره‌رو" },
          ],
          translation: "جاده‌ی نشان‌داده‌شده از هشت سواره‌رو تشکیل شده است.",
          why: "غلط است. هشت خط دارد، ولی فقط سه سواره‌رو.",
        },
      ],
      takeaway: "عدد را با کلمه‌ی بعدش بخوان: corsie یا carreggiate.",
    },
  ],
  practice: [
    {
      sourceId: "9",
      figure: 552,
      textIt: "La strada rappresentata è composta da tre corsie per ogni senso di marcia",
      answer: 1,
      chunks: [
        { it: FIG, fa: FIG_FA },
        { it: "è composta da", fa: "تشکیل شده از", verb: "composta ← comporre" },
        { it: "tre corsie", fa: "سه خط عبور" },
        { it: "per ogni senso di marcia", fa: "در هر جهت حرکت" },
      ],
      translation: "جاده‌ی نشان‌داده‌شده در هر جهت حرکت از سه خط عبور تشکیل شده است.",
      why: "درست است. شش خط دارد که خط ممتد دوبل وسط آن‌ها را سه‌تا‌سه‌تا جدا کرده است.",
      rule: "CdS art. 3 c.1 n.12",
      conceptStep: 1,
    },
    {
      sourceId: "14",
      figure: 552,
      textIt: "La strada rappresentata è composta da due carreggiate",
      answer: 0,
      chunks: [
        { it: FIG, fa: FIG_FA },
        { it: "è composta da", fa: "تشکیل شده از", verb: "composta ← comporre" },
        { it: "due carreggiate", fa: "دو سواره‌رو" },
      ],
      translation: "جاده‌ی نشان‌داده‌شده از دو سواره‌رو تشکیل شده است.",
      why: "غلط است. خط ممتد دوبل مانع فیزیکی نیست؛ این یک سواره‌روی دوطرفه است.",
      rule: "CdS art. 3 c.1 n.7",
      conceptStep: 2,
    },
    {
      sourceId: "21",
      figure: 562,
      textIt: "La strada rappresentata è composta da quattro carreggiate, tutte a senso unico",
      answer: 0,
      chunks: [
        { it: FIG, fa: FIG_FA },
        { it: "è composta da", fa: "تشکیل شده از", verb: "composta ← comporre" },
        { it: "quattro carreggiate,", fa: "چهار سواره‌رو،" },
        { it: "tutte a senso unico", fa: "همه یک‌طرفه", focus: "always" },
      ],
      translation: "جاده‌ی نشان‌داده‌شده از چهار سواره‌رو تشکیل شده که همه یک‌طرفه‌اند.",
      why: "غلط است. سه سواره‌رو دارد و سواره‌روی وسط دوطرفه است.",
      rule: "CdS art. 3 c.1 n.7",
      conceptStep: 2,
    },
    {
      sourceId: "4",
      figure: 550,
      textIt: "In una carreggiata del tipo rappresentato non si può effettuare l'inversione di marcia",
      answer: 1,
      chunks: [
        { it: "In una carreggiata del tipo rappresentato", fa: "در سواره‌رویی از نوع نشان‌داده‌شده" },
        { it: "non si può effettuare", fa: "نمی‌شود انجام داد", focus: "negation", verb: "può ← potere" },
        { it: "l'inversione di marcia", fa: "دور زدن را" },
      ],
      translation: "در سواره‌رویی از نوع نشان‌داده‌شده نمی‌شود دور زد.",
      why: "درست است. برای دور زدن باید از خط ممتد دوبل وسط رد شوی و این ممنوع است.",
      rule: "CdS art. 40 c.8; art. 154",
      conceptStep: 3,
    },
    {
      sourceId: "26",
      figure: 562,
      textIt: "Nelle carreggiate laterali della strada rappresentata è consentita, di norma, l'inversione di marcia",
      answer: 0,
      chunks: [
        { it: "Nelle carreggiate laterali", fa: "در سواره‌روهای کناریِ" },
        { it: "della strada rappresentata", fa: "جاده‌ی نشان‌داده‌شده" },
        { it: "è consentita, di norma,", fa: "معمولاً مجاز است،", verb: "consentita ← consentire" },
        { it: "l'inversione di marcia", fa: "دور زدن" },
      ],
      translation: "در سواره‌روهای کناریِ جاده‌ی نشان‌داده‌شده معمولاً دور زدن مجاز است.",
      why: "غلط است. سواره‌روهای کناری یک‌طرفه‌اند؛ دور زدن در آن‌ها یعنی خلاف جهت رفتن.",
      rule: "CdS art. 154",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 2, sourceIds: ["2", "9", "11", "14", "16", "17", "18", "19", "21", "22", "23", "24", "25"] },
    { step: 3, sourceIds: ["1", "3", "4", "5", "6", "7", "8", "10", "12", "13", "15", "20", "26"] },
  ],
};

// ── Lesson 4 ──────────────────────────────────────────────────────────────────

export const lessonElementi: Lesson = {
  id: "elementi-della-strada",
  titleFa: "خط عابر، جزیره، سکوی عابر و ورودی پارکینگ",
  titleIt: "ATTRAVERSAMENTO · ISOLA DI TRAFFICO · SALVAGENTE · PASSO CARRABILE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس چهار بخش کوچکِ جاده را از هم تشخیص می‌دهی و می‌دانی روی کدام توقف، پارک یا عبور مجاز است.",
      why: "تقریباً ۵۰ سؤال درباره‌ی همین چهار بخش است و بسیاری از آن‌ها isola di traffico را با salvagente یا «توقف» را با «پارک» قاطی می‌کنند.",
    },
    {
      kind: "anatomy",
      title: "چهار بخش در یک خیابان",
      scene: "elements",
      body: "روی هر بخش بزن. دقت کن کدام روی سواره‌رو است و کدام بیرون آن.",
      parts: [
        { id: "attraversamento", nameIt: "Attraversamento pedonale", nameFa: "خط عابر پیاده", text: "خط‌های سفید موازی روی سواره‌رو. عابرِ در حال عبور حق تقدم دارد. توقف و پارک روی آن ممنوع است.", inCarreggiata: true },
        { id: "isola", nameIt: "Isola di traffico", nameFa: "جزیره‌ی ترافیکی", text: "جزیره‌ی غیرقابل عبور که خودروها را به جهت‌های مختلف هدایت می‌کند. یا هم‌سطح است (خط‌کشی مورب سفید) یا برآمده؛ دورش خط سفید ممتد است. عبور هیچ وسیله‌ای از رویش مجاز نیست.", inCarreggiata: false },
        { id: "salvagente", nameIt: "Salvagente", nameFa: "سکوی پناه عابر", text: "سکوی برآمده یا محافظت‌شده برای پناه و ایستادن عابران، کنار خط عابر یا ایستگاه تراموا و اتوبوس. ممکن است با ستون‌های چراغ زرد ثابت مشخص شده باشد.", inCarreggiata: false },
        { id: "carrabile", nameIt: "Passo carrabile", nameFa: "ورودی پارکینگ خصوصی", text: "ورودی خودرو به ملک کنار جاده (گاراژ، حیاط). تابلوی مخصوص با نام اداره و شماره‌ی مجوز دارد. توقف کوتاه جلویش مجاز است، پارک نه.", inCarreggiata: false },
      ],
      takeaway: "isola خودروها را هدایت می‌کند؛ salvagente از عابر محافظت می‌کند. هیچ‌کدام برای عبور خودرو نیستند.",
      rule: "CdS art. 3 c.1 n.3, n.27–28, n.37, n.45",
    },
    {
      kind: "table",
      title: "جزیره یا سکوی عابر؟",
      body: "هر دو در وسط جاده دیده می‌شوند و هر دو برای خودرو بسته‌اند. فرقشان این است که برای چه کسی ساخته شده‌اند.",
      columns: ["isola di traffico", "salvagente"],
      rows: [
        { label: "برای چیست؟", values: ["هدایت خودروها به جهت‌های مختلف", "پناه و ایستادن عابران"] },
        { label: "شکل", values: ["خط‌کشی مورب سفید، یا برآمده که قبلش خط‌کشی مورب است؛ دورش خط سفید ممتد", "برآمده یا محافظت‌شده، گاهی با ستون چراغ زرد ثابت"] },
        { label: "کجا؟", values: ["تقاطع‌ها و دوراهی‌ها", "کنار خط عابر یا ایستگاه تراموا و اتوبوس"] },
        { label: "عبور خودرو", values: ["ممنوع، حتی موتور و موپد", "ممنوع"] },
      ],
      takeaway: "اگر جمله‌ای درباره‌ی isola گفت «برای عابر» یا «برای سوار و پیاده شدن مسافر»، آن را با salvagente قاطی کرده است.",
      rule: "CdS art. 3 c.1 n.27, n.45; art. 40",
    },
    {
      kind: "factors",
      title: "خط عابر پیاده: روی سواره‌رو، بدون توقف",
      body: "خط عابر جزو سواره‌رو است. خودروها از رویش رد می‌شوند، ولی باید به عابر حق تقدم بدهند و حق ندارند رویش بایستند، حتی کوتاه.",
      columns: [
        {
          title: "درست است (VERO)",
          items: [
            { fa: "با خط‌های سفید موازی مشخص می‌شود", it: "strisce bianche parallele", sourceId: "27", textIt: "L'attraversamento pedonale viene segnalato con strisce bianche parallele", answer: 1 },
            { fa: "توقف کوتاه (fermata) روی آن ممنوع است", it: "è vietata la fermata dei veicoli", sourceId: "28", textIt: "L'attraversamento pedonale è una parte della carreggiata sulla quale è vietata la fermata dei veicoli", answer: 1 },
            { fa: "پارک (sosta) روی آن ممنوع است", it: "è vietata la sosta dei veicoli", sourceId: "31", textIt: "L'attraversamento pedonale è una parte della carreggiata sulla quale è vietata la sosta dei veicoli", answer: 1 },
          ],
        },
        {
          title: "غلط است (FALSO)",
          items: [
            { fa: "جزو سواره‌رو نیست", it: "non fa parte della carreggiata", sourceId: "34", textIt: "L'attraversamento pedonale non fa parte della carreggiata", answer: 0 },
            { fa: "با خط زرد از سواره‌رو جدا شده", it: "separata dalla carreggiata mediante una striscia gialla", sourceId: "32", textIt: "L'attraversamento pedonale è una parte della strada, separata dalla carreggiata mediante una striscia gialla", answer: 0 },
            { fa: "عبور خودرو از رویش ممنوع است", it: "vietata al transito dei veicoli", sourceId: "33", textIt: "L'attraversamento pedonale è una parte della carreggiata vietata al transito dei veicoli", answer: 0 },
          ],
        },
      ],
      takeaway: "fermata = توقف کوتاه، راننده پشت فرمان؛ sosta = پارک. روی خط عابر هر دو ممنوع‌اند، ولی عبور مجاز است.",
      rule: "CdS art. 3 c.1 n.3; art. 158 c.1; art. 191",
    },
    {
      kind: "factors",
      title: "ورودی پارکینگ: توقف آری، پارک نه",
      body: "passo carrabile یعنی دسترسی خودرو به ملکی کنار جاده. جلویش نباید پارک کنی، چون راه صاحب ملک را می‌بندی؛ ولی توقف کوتاه مجاز است.",
      columns: [
        {
          title: "درست است (VERO)",
          items: [
            { fa: "دسترسی به گاراژ و حیاط کنار جاده", it: "accedere alle proprietà private laterali alla strada", sourceId: "219", textIt: "Il passo carrabile consente ai veicoli di accedere alle proprietà private laterali alla strada (garage, cortili, ecc.)", answer: 1 },
            { fa: "تابلو با نام اداره و شماره‌ی مجوز دارد", it: "riporti l'ente e il numero di autorizzazione", sourceId: "221", textIt: "Il passo carrabile deve essere corredato da apposito segnale, che riporti l'ente e il numero di autorizzazione", answer: 1 },
          ],
        },
        {
          title: "غلط است (FALSO)",
          items: [
            { fa: "یک پارکینگ بین‌راهی است", it: "è un parcheggio scambiatore", sourceId: "224", textIt: "Il passo carrabile è un parcheggio scambiatore", answer: 0 },
            { fa: "تابلویی که دور زدن در میدان را اجباری می‌کند", it: "impone la circolazione rotatoria", sourceId: "228", textIt: "Il passo carrabile è un segnale che impone la circolazione rotatoria su una piazza", answer: 0 },
          ],
        },
      ],
      takeaway: "جلوی passo carrabile: fermata مجاز، sosta ممنوع.",
      rule: "CdS art. 3 c.1 n.37; art. 22; art. 158 c.2",
    },
    {
      kind: "terms",
      title: "کلمه‌های این درس",
      terms: [
        { it: "l'attraversamento pedonale", fa: "خط عابر پیاده" },
        { it: "l'isola di traffico", fa: "جزیره‌ی ترافیکی" },
        { it: "il salvagente", fa: "سکوی پناه عابر" },
        { it: "il passo carrabile", fa: "ورودی پارکینگ خصوصی" },
        { it: "la zebratura", fa: "خط‌کشی مورب (گورخری)" },
        { it: "la fermata", fa: "توقف کوتاه" },
        { it: "la sosta", fa: "پارک" },
        { it: "a raso", fa: "هم‌سطح با جاده" },
      ],
    },
    {
      kind: "trap",
      title: "تله: fermata یا sosta؟",
      body: "این دو کلمه در فارسی هر دو «توقف» ترجمه می‌شوند، ولی در قانون فرق دارند. ببین هر جمله کدام را مجاز می‌داند.",
      examples: [
        {
          sourceId: "223",
          textIt: "In corrispondenza del passo carrabile è consentita la fermata",
          answer: 1,
          chunks: [
            { it: "In corrispondenza del passo carrabile", fa: "جلوی ورودی پارکینگ" },
            { it: "è consentita", fa: "مجاز است", verb: "consentita ← consentire" },
            { it: "la fermata", fa: "توقف کوتاه" },
          ],
          translation: "جلوی ورودی پارکینگ توقف کوتاه مجاز است.",
          why: "درست است. توقف کوتاه راه را برای همیشه نمی‌بندد؛ پارک ممنوع است.",
        },
        {
          sourceId: "36",
          textIt: "L'attraversamento pedonale è una parte della carreggiata in cui è consentita la fermata ma non la sosta dei veicoli",
          answer: 0,
          chunks: [
            { it: "L'attraversamento pedonale", fa: "خط عابر پیاده" },
            { it: "è una parte della carreggiata", fa: "بخشی از سواره‌رو است" },
            { it: "in cui è consentita la fermata", fa: "که در آن توقف کوتاه مجاز است", verb: "consentita ← consentire" },
            { it: "ma non la sosta dei veicoli", fa: "ولی پارک وسایل نقلیه نه", focus: "contrast" },
          ],
          translation: "خط عابر پیاده بخشی از سواره‌رو است که در آن توقف کوتاه مجاز است ولی پارک نه.",
          why: "غلط است. نیمه‌ی اول درست است، ولی روی خط عابر حتی توقف کوتاه هم ممنوع است.",
        },
      ],
      takeaway: "خط عابر: نه fermata، نه sosta. ورودی پارکینگ: fermata بله، sosta نه.",
    },
  ],
  practice: [
    {
      sourceId: "54",
      textIt: "L'isola di traffico è delimitata da strisce bianche continue",
      answer: 1,
      chunks: [
        { it: "L'isola di traffico", fa: "جزیره‌ی ترافیکی" },
        { it: "è delimitata", fa: "محدود شده است", verb: "delimitata ← delimitare" },
        { it: "da strisce bianche continue", fa: "با خط‌های سفید ممتد" },
      ],
      translation: "جزیره‌ی ترافیکی با خط‌های سفید ممتد محدود شده است.",
      why: "درست است. دور جزیره خط سفید ممتد است و نباید از آن رد شوی.",
      rule: "CdS art. 3 c.1 n.27; art. 40",
      conceptStep: 1,
    },
    {
      sourceId: "61",
      textIt: "L'isola di traffico serve a separare la carreggiata dalla banchina",
      answer: 0,
      chunks: [
        { it: "L'isola di traffico", fa: "جزیره‌ی ترافیکی" },
        { it: "serve a separare", fa: "برای جدا کردن است", verb: "separare ← separare" },
        { it: "la carreggiata dalla banchina", fa: "سواره‌رو از شانه" },
      ],
      translation: "جزیره‌ی ترافیکی برای جدا کردن سواره‌رو از شانه است.",
      why: "غلط است. کار جزیره هدایت خودروها به جهت‌های مختلف است. مرز سواره‌رو و شانه را خط سفید کناری نشان می‌دهد.",
      rule: "CdS art. 3 c.1 n.27",
      conceptStep: 2,
    },
    {
      sourceId: "212",
      textIt: "Il salvagente, posto in corrispondenza di attraversamenti pedonali, serve anche al riparo o alla sosta dei pedoni che attraversano la strada",
      answer: 1,
      chunks: [
        { it: "Il salvagente,", fa: "سکوی پناه عابر،" },
        { it: "posto in corrispondenza di attraversamenti pedonali,", fa: "که کنار خط‌های عابر پیاده قرار دارد،" },
        { it: "serve anche", fa: "به کار … هم می‌آید" },
        { it: "al riparo o alla sosta dei pedoni", fa: "برای پناه یا ایستادن عابران" },
        { it: "che attraversano la strada", fa: "که از جاده عبور می‌کنند", verb: "attraversano ← attraversare" },
      ],
      translation: "سکوی پناه عابر که کنار خط‌های عابر پیاده قرار دارد، برای پناه یا ایستادن عابرانی که از جاده عبور می‌کنند هم به کار می‌آید.",
      why: "درست است. عابری که نمی‌تواند یک‌باره از جاده‌ی پهن رد شود، روی salvagente می‌ایستد.",
      rule: "CdS art. 3 c.1 n.45",
      conceptStep: 2,
    },
    {
      sourceId: "29",
      textIt: "L'attraversamento pedonale è una parte della carreggiata, in cui i veicoli devono dare la precedenza ai pedoni, che attraversano sulle apposite strisce",
      answer: 1,
      chunks: [
        { it: "L'attraversamento pedonale", fa: "خط عابر پیاده" },
        { it: "è una parte della carreggiata,", fa: "بخشی از سواره‌رو است،" },
        { it: "in cui i veicoli devono dare la precedenza ai pedoni,", fa: "که در آن وسایل نقلیه باید به عابران حق تقدم بدهند،", verb: "devono ← dovere" },
        { it: "che attraversano sulle apposite strisce", fa: "که روی خط‌های مخصوص عبور می‌کنند", verb: "attraversano ← attraversare" },
      ],
      translation: "خط عابر پیاده بخشی از سواره‌رو است که در آن وسایل نقلیه باید به عابرانی که روی خط‌های مخصوص عبور می‌کنند حق تقدم بدهند.",
      why: "درست است. هم «جزو سواره‌رو» درست است و هم «حق تقدم با عابر».",
      rule: "CdS art. 3 c.1 n.3; art. 191 c.1",
      conceptStep: 3,
    },
    {
      sourceId: "229",
      textIt: "In corrispondenza del passo carrabile è consentita la sosta",
      answer: 0,
      chunks: [
        { it: "In corrispondenza del passo carrabile", fa: "جلوی ورودی پارکینگ" },
        { it: "è consentita", fa: "مجاز است", verb: "consentita ← consentire" },
        { it: "la sosta", fa: "پارک" },
      ],
      translation: "جلوی ورودی پارکینگ پارک مجاز است.",
      why: "غلط است. پارک راه خودروی صاحب ملک را می‌بندد؛ فقط توقف کوتاه مجاز است.",
      rule: "CdS art. 158 c.2",
      conceptStep: 4,
    },
  ],
  related: [
    { step: 2, sourceIds: [...range(53, 73), ...range(212, 218)] },
    { step: 3, sourceIds: range(27, 36) },
    { step: 4, sourceIds: range(219, 229) },
  ],
};

// ── Lesson 5 ──────────────────────────────────────────────────────────────────

export const lessonAutostrade: Lesson = {
  id: "autostrade-extraurbane",
  titleFa: "آزادراه و جاده‌ی برون‌شهری اصلی",
  titleIt: "AUTOSTRADA · STRADA EXTRAURBANA PRINCIPALE",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی آزادراه و جاده‌ی برون‌شهری اصلی چه ویژگی‌هایی دارند، چه فرقی با هم دارند و چه وسیله‌هایی حق ورود به آن‌ها را ندارند.",
      why: "۳۰ سؤال درباره‌ی همین دو نوع جاده است. بیشترِ تله‌ها عدد سرعت، رنگ تابلو یا نوع وسیله را عوض می‌کنند.",
    },
    {
      kind: "table",
      title: "دو جاده‌ی سریع، کنار هم",
      body: "هر دو سواره‌روهای جدا دارند، تقاطع هم‌سطح ندارند و ورود و خروجشان با خط افزایش و کاهش سرعت است. فرق اصلی در سرعت، رنگ تابلو و حصار است.",
      columns: ["autostrada", "extraurbana principale"],
      rows: [
        { label: "سواره‌رو", values: ["جدا یا با جداکننده‌ی غیرقابل عبور؛ هر کدام حداقل ۲ خط", "جدا یا با جداکننده‌ی غیرقابل عبور؛ هر کدام حداقل ۲ خط"] },
        { label: "تقاطع هم‌سطح (a raso)", values: ["ندارد", "ندارد"] },
        { label: "حصار کنار جاده", values: ["اجباری", "اجباری نیست"] },
        { label: "حداکثر سرعت", values: ["۱۳۰ کیلومتر بر ساعت", "۱۱۰ کیلومتر بر ساعت"] },
        { label: "رنگ تابلوها", values: ["سبز", "آبی"] },
        { label: "تابلوی شروع و پایان", values: ["دارد", "دارد"] },
        { label: "محوطه‌ی خدمات / توقف", values: ["دارد، با خط افزایش و کاهش سرعت", "دارد، با خط افزایش و کاهش سرعت"] },
      ],
      takeaway: "«تک‌سواره‌رو»، «یک خط در هر جهت»، «۱۳۰ برای برون‌شهری اصلی» و «تابلوی سبز برای برون‌شهری اصلی»، همه FALSO هستند.",
      rule: "CdS art. 2 c.3 lett. A–B; art. 142 c.1; DPR 495/1992 art. 78",
    },
    {
      kind: "factors",
      title: "چه کسی حق ورود دارد؟",
      body:
        "هر دو جاده فقط برای بعضی وسایل موتوری‌اند. موپد، چهارچرخ سبک، دوچرخه و ماشین‌آلات کشاورزی هرگز وارد نمی‌شوند. از ۱۴ دسامبر ۲۰۲۴ موتورسیکلت از ۱۲۰ سی‌سی (برقی از ۶ کیلووات) هم وارد می‌شود، به شرطی که راننده‌اش بالای ۱۸ سال باشد؛ جمله‌ی بانک درباره‌ی «حداقل ۱۵۰ سی‌سی» همچنان درست است.",
      columns: [
        {
          title: "درست است (VERO)",
          items: [
            { fa: "موتورسیکلت حداقل ۱۵۰ سی‌سی وارد آزادراه می‌شود", it: "I motocicli con cilindrata di almeno 150 cm3", sourceId: "135", textIt: "I motocicli con cilindrata di almeno 150 cm3 possono circolare in autostrada", answer: 1 },
            { fa: "ماشین‌آلات کشاورزی وارد آزادراه نمی‌شوند", it: "Le macchine agricole non possono circolare in autostrada", sourceId: "136", textIt: "Le macchine agricole non possono circolare in autostrada", answer: 1 },
            { fa: "همه‌ی وسایل حق ورود ندارند", it: "Non tutti i tipi di veicoli", sourceId: "137", textIt: "Non tutti i tipi di veicoli possono circolare in autostrada", answer: 1 },
            { fa: "در برون‌شهری اصلی فقط بعضی وسایل موتوری", it: "solo alcune categorie di veicoli a motore", sourceId: "41", textIt: "Nelle strade extraurbane principali possono circolare solo alcune categorie di veicoli a motore", answer: 1 },
          ],
        },
        {
          title: "غلط است (FALSO)",
          items: [
            { fa: "همه‌ی موتورسیکلت‌ها", it: "possono circolare tutti i tipi di motocicli", sourceId: "141", textIt: "Nelle autostrade possono circolare tutti i tipi di motocicli", answer: 0 },
            { fa: "فقط سواری‌ها", it: "possono circolare solo le autovetture", sourceId: "140", textIt: "Nelle autostrade possono circolare solo le autovetture", answer: 0 },
            { fa: "موپد در برون‌شهری اصلی", it: "i ciclomotori possono transitare", sourceId: "50", textIt: "Sulle strade extraurbane principali i ciclomotori possono transitare", answer: 0 },
            { fa: "چهارچرخ سبک در برون‌شهری اصلی", it: "i quadricicli leggeri possono transitare", sourceId: "48", textIt: "Sulle strade extraurbane principali i quadricicli leggeri possono transitare", answer: 0 },
          ],
        },
      ],
      takeaway: "«همه» و «فقط» در این سؤال‌ها تله‌اند: نه همه‌ی موتورها مجازند، نه فقط سواری‌ها.",
      rule: "CdS art. 175 c.1, c.2, c.2-bis (L. 177/2024)",
    },
    {
      kind: "terms",
      title: "کلمه‌های این درس",
      terms: [
        { it: "l'autostrada", fa: "آزادراه" },
        { it: "la strada extraurbana principale", fa: "جاده‌ی برون‌شهری اصلی" },
        { it: "a carreggiate separate", fa: "با سواره‌روهای جدا" },
        { it: "lo spartitraffico", fa: "جداکننده‌ی میانی" },
        { it: "l'incrocio a raso", fa: "تقاطع هم‌سطح" },
        { it: "recintata", fa: "حصارکشی‌شده", base: "recintare" },
        { it: "la cilindrata", fa: "حجم موتور (سی‌سی)" },
        { it: "possono circolare", fa: "می‌توانند تردد کنند", base: "potere circolare" },
      ],
    },
    {
      kind: "trap",
      title: "تله: «می‌تواند تک‌سواره‌رو باشد»",
      body: "«può/possono» جمله را نرم و محتمل نشان می‌دهد، ولی اگر چیزی که «ممکن» شمرده شده با تعریف جاده نخواند، جمله غلط است.",
      examples: [
        {
          sourceId: "134",
          textIt: "L'autostrada è a carreggiate indipendenti o separate da spartitraffico",
          answer: 1,
          chunks: [
            { it: "L'autostrada", fa: "آزادراه" },
            { it: "è a carreggiate indipendenti", fa: "سواره‌روهای مستقل دارد" },
            { it: "o separate da spartitraffico", fa: "یا با جداکننده‌ی میانی جدا شده‌اند" },
          ],
          translation: "آزادراه سواره‌روهای مستقل دارد یا سواره‌روهایش با جداکننده‌ی میانی جدا شده‌اند.",
          why: "درست است. این تعریف خودِ قانون است.",
        },
        {
          sourceId: "46",
          textIt: "Le strade extraurbane principali possono essere ad un'unica carreggiata",
          answer: 0,
          chunks: [
            { it: "Le strade extraurbane principali", fa: "جاده‌های برون‌شهری اصلی" },
            { it: "possono essere", fa: "می‌توانند باشند", verb: "possono ← potere" },
            { it: "ad un'unica carreggiata", fa: "تک‌سواره‌رو", focus: "limit" },
          ],
          translation: "جاده‌های برون‌شهری اصلی می‌توانند تک‌سواره‌رو باشند.",
          why: "غلط است. برون‌شهری اصلی هم مثل آزادراه سواره‌روهای جدا دارد.",
        },
      ],
      takeaway: "«può» تعریف را عوض نمی‌کند: هر دو جاده همیشه سواره‌روهای جدا دارند.",
    },
  ],
  practice: [
    {
      sourceId: "39",
      textIt: "La strada extraurbana principale non ha incroci a raso che l'attraversano",
      answer: 1,
      chunks: [
        { it: "La strada extraurbana principale", fa: "جاده‌ی برون‌شهری اصلی" },
        { it: "non ha", fa: "ندارد", focus: "negation", verb: "ha ← avere" },
        { it: "incroci a raso", fa: "تقاطع هم‌سطح" },
        { it: "che l'attraversano", fa: "که آن را قطع کند", verb: "attraversano ← attraversare" },
      ],
      translation: "جاده‌ی برون‌شهری اصلی تقاطع هم‌سطحی ندارد که آن را قطع کند.",
      why: "درست است. تقاطع‌هایش غیرهم‌سطح‌اند (با پل و زیرگذر).",
      rule: "CdS art. 2 c.3 lett. B",
      conceptStep: 1,
    },
    {
      sourceId: "44",
      textIt: "Sulle strade extraurbane principali è consentito circolare alla velocità massima di 130 km/h",
      answer: 0,
      chunks: [
        { it: "Sulle strade extraurbane principali", fa: "در جاده‌های برون‌شهری اصلی" },
        { it: "è consentito circolare", fa: "مجاز است حرکت کرد", verb: "consentito ← consentire" },
        { it: "alla velocità massima di 130 km/h", fa: "با حداکثر سرعت ۱۳۰ کیلومتر بر ساعت", focus: "limit" },
      ],
      translation: "در جاده‌های برون‌شهری اصلی مجاز است با حداکثر سرعت ۱۳۰ کیلومتر بر ساعت حرکت کرد.",
      why: "غلط است. ۱۳۰ مال آزادراه است؛ برون‌شهری اصلی حداکثر ۱۱۰.",
      rule: "CdS art. 142 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "45",
      textIt: "Le strade extraurbane principali sono contraddistinte da segnaletica verde",
      answer: 0,
      chunks: [
        { it: "Le strade extraurbane principali", fa: "جاده‌های برون‌شهری اصلی" },
        { it: "sono contraddistinte", fa: "مشخص می‌شوند", verb: "contraddistinte ← contraddistinguere" },
        { it: "da segnaletica verde", fa: "با تابلوهای سبز" },
      ],
      translation: "جاده‌های برون‌شهری اصلی با تابلوهای سبز مشخص می‌شوند.",
      why: "غلط است. تابلوی سبز مال آزادراه است؛ جاده‌های برون‌شهری تابلوی آبی دارند.",
      rule: "DPR 495/1992 art. 78",
      conceptStep: 1,
    },
    {
      sourceId: "139",
      textIt: "L'autostrada deve essere lateralmente recintata",
      answer: 1,
      chunks: [
        { it: "L'autostrada", fa: "آزادراه" },
        { it: "deve essere", fa: "باید باشد", verb: "deve ← dovere" },
        { it: "lateralmente recintata", fa: "از کناره‌ها حصارکشی‌شده" },
      ],
      translation: "آزادراه باید از کناره‌ها حصارکشی‌شده باشد.",
      why: "درست است. حصار برای آزادراه اجباری است (برای برون‌شهری اصلی نه).",
      rule: "CdS art. 2 c.3 lett. A",
      conceptStep: 1,
    },
    {
      sourceId: "143",
      textIt: "Nelle autostrade possono circolare i ciclomotori e i motocicli con cilindrata fino a 125 cm3",
      answer: 0,
      chunks: [
        { it: "Nelle autostrade", fa: "در آزادراه‌ها" },
        { it: "possono circolare", fa: "می‌توانند تردد کنند", verb: "possono ← potere" },
        { it: "i ciclomotori", fa: "موپدها" },
        { it: "e i motocicli con cilindrata fino a 125 cm3", fa: "و موتورسیکلت‌های تا ۱۲۵ سی‌سی", focus: "limit" },
      ],
      translation: "در آزادراه‌ها موپدها و موتورسیکلت‌های تا ۱۲۵ سی‌سی می‌توانند تردد کنند.",
      why:
        "غلط است. موپد هرگز وارد آزادراه نمی‌شود و همین کافی است. نکته‌ی به‌روز: از دسامبر ۲۰۲۴ موتورسیکلت ۱۲۰ تا ۱۲۵ سی‌سی با راننده‌ی بالای ۱۸ سال مجاز شده، ولی جمله موپد را هم مجاز می‌داند، پس همچنان غلط است.",
      rule: "CdS art. 175 c.2 lett. a, c.2-bis (L. 177/2024)",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: [...range(37, 40), "42", "43", "44", "45", "46", "47", "49", "51", "52", "132", "133", "134", "138", "139", "142"] },
    { step: 2, sourceIds: ["41", "48", "50", "135", "136", "137", "140", "141", "143", "144", "145"] },
  ],
};

// ── Lesson 6 ──────────────────────────────────────────────────────────────────

export const lessonIncrociZone: Lesson = {
  id: "incroci-e-zone",
  titleFa: "تقاطع، گذرگاه راه‌آهن و منطقه‌های محدود",
  titleIt: "INTERSEZIONI · PASSAGGIO A LIVELLO · ZTL · AREA PEDONALE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس تقاطع هم‌سطح را از غیرهم‌سطح تشخیص می‌دهی، می‌دانی سر گذرگاه راه‌آهن چه چیزهایی می‌بینی و فرق ZTL با منطقه‌ی عابر پیاده را می‌گویی.",
      why: "نزدیک ۵۰ سؤال درباره‌ی این تعریف‌هاست. تله‌ها معمولاً یک تعریف را با دیگری جابه‌جا می‌کنند، مثلاً تقاطع هم‌سطح را با گذرگاه راه‌آهن.",
    },
    {
      kind: "table",
      title: "هم‌سطح یا غیرهم‌سطح؟",
      body: "در تقاطع هم‌سطح (a raso) جاده‌ها در یک سطح به هم می‌رسند و مسیر خودروها با هم برخورد می‌کند. در تقاطع غیرهم‌سطح (a livelli sfalsati) جاده‌ها در ارتفاع‌های مختلف‌اند و رمپ آن‌ها را به هم وصل می‌کند.",
      columns: ["a raso", "a livelli sfalsati"],
      rows: [
        { label: "سطح جاده‌ها", values: ["یک سطح", "ارتفاع‌های مختلف"] },
        { label: "برخورد مستقیم خودروها", values: ["دارد؛ باید مراقب جاده‌های دیگر باشی", "ندارد؛ برای همین جریان روان‌تر است"] },
        { label: "از چه ساخته شده", values: ["محوطه‌ی مشترک چند جاده؛ ممکن است چراغ داشته باشد", "رمپ، روگذر، زیرگذر؛ معمولاً چراغ ندارد"] },
        { label: "حد سرعت عمومی", values: ["رعایت می‌شود", "رعایت می‌شود"] },
      ],
      takeaway: "گذرگاه راه‌آهن (passaggio a livello) نوعی تقاطع هم‌سطح با ریل است، ولی هر تقاطع هم‌سطحی گذرگاه راه‌آهن نیست.",
      rule: "CdS art. 3 c.1 n.25, n.26",
    },
    {
      kind: "factors",
      title: "سر گذرگاه راه‌آهن چه می‌بینی؟",
      body: "passaggio a livello تقاطع هم‌سطح جاده با ریل قطار یا تراموا است که برای ایمنی تجهیز شده. چراغ آن قرمز است، نه زرد چشمک‌زن.",
      columns: [
        {
          title: "ممکن است ببینی (VERO)",
          items: [
            { fa: "راه‌بند کامل", it: "le barriere", sourceId: "99", textIt: "In un passaggio a livello si possono trovare le barriere", answer: 1 },
            { fa: "نیم‌راه‌بند", it: "le semibarriere", sourceId: "100", textIt: "In un passaggio a livello si possono trovare le semibarriere", answer: 1 },
            { fa: "چراغ قرمز", it: "le luci rosse", sourceId: "101", textIt: "In un passaggio a livello si possono trovare le luci rosse", answer: 1 },
            { fa: "صلیب سنت‌آندره", it: "la croce di S. Andrea", sourceId: "103", textIt: "In un passaggio a livello si può trovare la croce di S. Andrea", answer: 1 },
            { fa: "تابلوهای فاصله‌نما پیش از آن", it: "i pannelli distanziometrici", sourceId: "102", textIt: "In vicinanza di un passaggio a livello si trovano i pannelli distanziometrici", answer: 1 },
          ],
        },
        {
          title: "نمی‌بینی (FALSO)",
          items: [
            { fa: "چراغ زرد چشمک‌زن", it: "le luci gialle lampeggianti", sourceId: "106", textIt: "In un passaggio a livello si possono trovare le luci gialle lampeggianti", answer: 0 },
            { fa: "خط افزایش سرعت", it: "le corsie di accelerazione", sourceId: "108", textIt: "In un passaggio a livello si possono trovare le corsie di accelerazione", answer: 0 },
            { fa: "روگذر راه‌آهن", it: "un cavalcavia ferroviario o tranviario", sourceId: "105", textIt: "Il passaggio a livello è un cavalcavia ferroviario o tranviario", answer: 0 },
            { fa: "زیرگذر", it: "un sottopassaggio", sourceId: "110", textIt: "Il passaggio a livello è caratterizzato dalla presenza di un sottopassaggio", answer: 0 },
          ],
        },
      ],
      takeaway: "«a livello» یعنی هم‌سطح؛ پس روگذر و زیرگذر هرگز passaggio a livello نیستند.",
      rule: "CdS art. 3 c.1 n.35; DPR 495/1992 artt. 87, 89",
    },
    {
      kind: "table",
      title: "ZTL یا منطقه‌ی عابر پیاده؟",
      body: "هر دو با تابلوی شروع و پایان مشخص می‌شوند. در ZTL تردد فقط محدود است؛ منطقه‌ی عابر پیاده برای خودروها بسته است، جز چند استثنا.",
      columns: ["zona a traffico limitato", "area pedonale"],
      rows: [
        { label: "قاعده", values: ["دسترسی در ساعت‌های معین یا فقط برای گروه‌های خاصی از کاربران و وسایل محدود است", "به روی وسایل نقلیه بسته است"] },
        { label: "چه کسی وارد می‌شود؟", values: ["فقط وسایل مجاز", "عابر، دوچرخه، وسایل امدادی با آژیر و چراغ آبی روشن، وسایلِ در خدمت افراد کم‌توان، و وسایل برقی (بدون آلایندگی) اگر صریحاً مجاز شده باشند"] },
        { label: "همیشه بسته؟", values: ["نه؛ ممکن است فقط بعضی ساعت‌ها محدود باشد", "برای خودروهای عادی بله"] },
      ],
      takeaway: "ZTL «محدود» است، نه «همیشه ممنوع». منطقه‌ی عابر پیاده حتی برای موتور و موپد هم بسته است.",
      rule: "CdS art. 3 c.1 n.2, n.54; art. 7 c.9",
    },
    {
      kind: "terms",
      title: "کلمه‌های این درس",
      terms: [
        { it: "l'intersezione a raso", fa: "تقاطع هم‌سطح" },
        { it: "a livelli sfalsati", fa: "در سطح‌های مختلف" },
        { it: "il sovrappasso / il sottopasso", fa: "روگذر / زیرگذر" },
        { it: "il passaggio a livello", fa: "گذرگاه راه‌آهن" },
        { it: "le semibarriere", fa: "نیم‌راه‌بند" },
        { it: "la zona a traffico limitato (ZTL)", fa: "منطقه‌ی تردد محدود" },
        { it: "l'area pedonale", fa: "منطقه‌ی عابر پیاده" },
        { it: "autorizzati", fa: "مجاز، دارای مجوز", base: "autorizzare" },
      ],
    },
    {
      kind: "trap",
      title: "تله: «فقط» و «همیشه»",
      body: "دو جمله درباره‌ی ZTL. یکی محدودیت را به بعضی ساعت‌ها می‌بندد و دیگری آن را همیشگی می‌کند.",
      examples: [
        {
          sourceId: "90",
          textIt: "Una zona a traffico limitato è un'area in cui può essere limitata la circolazione dei veicoli solo in alcune ore",
          answer: 1,
          chunks: [
            { it: "Una zona a traffico limitato", fa: "منطقه‌ی تردد محدود" },
            { it: "è un'area in cui", fa: "محدوده‌ای است که در آن" },
            { it: "può essere limitata", fa: "ممکن است محدود شود", verb: "può ← potere" },
            { it: "la circolazione dei veicoli", fa: "تردد وسایل نقلیه" },
            { it: "solo in alcune ore", fa: "فقط در بعضی ساعت‌ها", focus: "limit" },
          ],
          translation: "منطقه‌ی تردد محدود محدوده‌ای است که در آن تردد وسایل نقلیه ممکن است فقط در بعضی ساعت‌ها محدود شود.",
          why: "درست است. محدودیت ZTL می‌تواند ساعتی باشد.",
        },
        {
          sourceId: "97",
          textIt: "Una zona a traffico limitato è un'area sempre vietata al transito dei veicoli a motore",
          answer: 0,
          chunks: [
            { it: "Una zona a traffico limitato", fa: "منطقه‌ی تردد محدود" },
            { it: "è un'area", fa: "محدوده‌ای است" },
            { it: "sempre vietata", fa: "همیشه ممنوع", focus: "always" },
            { it: "al transito dei veicoli a motore", fa: "برای عبور وسایل موتوری" },
          ],
          translation: "منطقه‌ی تردد محدود محدوده‌ای است که عبور وسایل موتوری در آن همیشه ممنوع است.",
          why: "غلط است. «limitato» یعنی محدود، نه ممنوع؛ وسایل مجاز وارد می‌شوند.",
        },
      ],
      takeaway: "در ZTL «solo in alcune ore» درست است و «sempre vietata» غلط.",
    },
  ],
  practice: [
    {
      sourceId: "75",
      textIt: "L'intersezione (incrocio) a livelli sfalsati facilita la circolazione, perché esclude l'incrocio diretto fra i veicoli",
      answer: 1,
      chunks: [
        { it: "L'intersezione (incrocio) a livelli sfalsati", fa: "تقاطع غیرهم‌سطح" },
        { it: "facilita la circolazione,", fa: "تردد را آسان می‌کند،", verb: "facilita ← facilitare" },
        { it: "perché", fa: "چون", focus: "reason" },
        { it: "esclude l'incrocio diretto fra i veicoli", fa: "برخورد مستقیم مسیر خودروها را حذف می‌کند", verb: "esclude ← escludere" },
      ],
      translation: "تقاطع غیرهم‌سطح تردد را آسان می‌کند، چون برخورد مستقیم مسیر خودروها را حذف می‌کند.",
      why: "درست است. هم ادعا درست است و هم دلیلش: جاده‌ها در ارتفاع‌های مختلف‌اند.",
      rule: "CdS art. 3 c.1 n.25",
      conceptStep: 1,
    },
    {
      sourceId: "86",
      textIt: "L'intersezione (incrocio) a raso è un passaggio a livello dotato di barriere o semibarriere",
      answer: 0,
      chunks: [
        { it: "L'intersezione (incrocio) a raso", fa: "تقاطع هم‌سطح" },
        { it: "è un passaggio a livello", fa: "یک گذرگاه راه‌آهن است" },
        { it: "dotato di barriere o semibarriere", fa: "مجهز به راه‌بند یا نیم‌راه‌بند" },
      ],
      translation: "تقاطع هم‌سطح یک گذرگاه راه‌آهنِ مجهز به راه‌بند یا نیم‌راه‌بند است.",
      why: "غلط است. تقاطع هم‌سطح محل به هم رسیدن جاده‌ها در یک سطح است. گذرگاه راه‌آهن فقط یک نوع خاص از آن است.",
      rule: "CdS art. 3 c.1 n.26, n.35",
      conceptStep: 1,
    },
    {
      sourceId: "104",
      textIt: "In un passaggio a livello si può trovare un dispositivo di segnalazione acustica",
      answer: 1,
      chunks: [
        { it: "In un passaggio a livello", fa: "سر گذرگاه راه‌آهن" },
        { it: "si può trovare", fa: "ممکن است دیده شود", verb: "può ← potere" },
        { it: "un dispositivo di segnalazione acustica", fa: "یک وسیله‌ی هشدار صوتی" },
      ],
      translation: "سر گذرگاه راه‌آهن ممکن است یک وسیله‌ی هشدار صوتی باشد.",
      why: "درست است. بسیاری از گذرگاه‌ها هنگام نزدیک شدن قطار زنگ هشدار دارند.",
      rule: "DPR 495/1992 art. 89",
      conceptStep: 2,
    },
    {
      sourceId: "92",
      textIt: "In una zona a traffico limitato possono circolare solo i veicoli autorizzati",
      answer: 1,
      chunks: [
        { it: "In una zona a traffico limitato", fa: "در منطقه‌ی تردد محدود" },
        { it: "possono circolare", fa: "می‌توانند تردد کنند", verb: "possono ← potere" },
        { it: "solo i veicoli autorizzati", fa: "فقط وسایل مجاز", focus: "limit" },
      ],
      translation: "در منطقه‌ی تردد محدود فقط وسایل مجاز می‌توانند تردد کنند.",
      why: "درست است. در ساعت‌ها و برای گروه‌هایی که محدودیت اعمال می‌شود، فقط وسایلی که مجوز دارند وارد می‌شوند.",
      rule: "CdS art. 3 c.1 n.54; art. 7 c.9",
      conceptStep: 3,
    },
    {
      sourceId: "117",
      textIt: "Nelle aree pedonali possono transitare tutti i motocicli, purché diano la precedenza ai pedoni",
      answer: 0,
      chunks: [
        { it: "Nelle aree pedonali", fa: "در منطقه‌های عابر پیاده" },
        { it: "possono transitare", fa: "می‌توانند عبور کنند", verb: "possono ← potere" },
        { it: "tutti i motocicli,", fa: "همه‌ی موتورسیکلت‌ها،", focus: "always" },
        { it: "purché diano la precedenza ai pedoni", fa: "به شرط آنکه به عابران حق تقدم بدهند", focus: "condition", verb: "diano ← dare" },
      ],
      translation: "در منطقه‌های عابر پیاده همه‌ی موتورسیکلت‌ها می‌توانند عبور کنند، به شرط آنکه به عابران حق تقدم بدهند.",
      why: "غلط است. منطقه‌ی عابر پیاده به روی وسایل موتوری بسته است؛ شرطِ «حق تقدم دادن» آن را مجاز نمی‌کند.",
      rule: "CdS art. 3 c.1 n.2",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: range(74, 89) },
    { step: 2, sourceIds: range(99, 110) },
    { step: 3, sourceIds: [...range(90, 98), ...range(111, 121)] },
  ],
};
