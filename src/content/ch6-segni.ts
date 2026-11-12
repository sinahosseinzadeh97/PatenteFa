/**
 * src/content/ch6-segni.ts
 * Chapter 6 (Segnaletica orizzontale e segni sugli ostacoli), lessons 8, 9 and 10:
 * pedestrian crossings, yellow markings (kerbs, bus stops, reserved bays), and
 * writing on the road, speed reducers and the level-crossing marking.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter6.test.ts
 * and `npm run verify:lessons`.
 *
 * Flag (bank unchanged): #2603 calls the painted "50" (fig. 528) "velocità
 * consigliata". DPR 495/1992 art. 148 does not define painted numbers; c.11
 * only lets symbols repeat a vertical sign. Lesson 10 says so instead of
 * presenting the bank's reading as the law's.
 */
import type { Lesson } from "./lessons.js";

const SEGNALETICA = "La segnaletica in figura";
const SEGNALETICA_FA = "خط‌کشیِ تصویر";
const SEGNI = "I segni gialli e neri in figura";
const SEGNI_FA = "نشانه‌های زرد و سیاهِ تصویر";
const DIPINTI = "dipinti sul bordo del marciapiede";
const DIPINTI_FA = "که روی لبه‌ی جدولِ پیاده‌رو رنگ شده‌اند";
const RAPPRESENTATA = "La segnaletica rappresentata in figura";
const RAPPRESENTATA_FA = "خط‌کشیِ تصویر";

// ── Lesson 8 ──────────────────────────────────────────────────────────────────

export const lessonPedonali: Lesson = {
  id: "attraversamenti-pedonali",
  titleFa: "گذرگاهِ عابرِ خط‌کشی‌شده",
  titleIt: "ATTRAVERSAMENTO PEDONALE",
  minutes: 4,
  signs: [],
  figures: [517, 545],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس گذرگاهِ عابر را از نقش‌های شبیهش جدا می‌کنی و می‌دانی کنارش چه باید بکنی: کجا تابلو دارد، کجا خطِ زردِ زیگزاگ، و کِی باید بایستی.",
      why:
        "در فصل ۲ تابلوی خطرِ «گذرگاهِ عابر» را دیدی. این درس خودِ خط‌کشیِ روی آسفالت است. بانک آن را با گذرگاهِ دوچرخه، ورودیِ ملک و جزیره عوض می‌کند تا ببیند شکلش را می‌شناسی یا نه.",
    },
    {
      kind: "table",
      title: "گذرگاهِ عابر چیست و چه نیست",
      body: "نوارهای پهنِ سفید، موازی با جهتِ حرکتِ خودروها. هر بار که بانک اسمِ دیگری رویش می‌گذارد، این جدول جواب است.",
      columns: ["توضیح"],
      rows: [
        {
          label: "گذرگاهِ عابر",
          it: "attraversamento pedonale",
          sign: 517,
          values: ["نوارهای سفیدِ ۵۰ سانتی‌متری با فاصله‌ی ۵۰ سانتی‌متری. داخل و بیرونِ شهر، در شهرهای کوچک هم."],
        },
        { label: "گذرگاهِ دوچرخه نیست", it: "attraversamento ciclabile", values: ["گذرگاهِ دوچرخه با دو ردیف خط‌چینِ سفید کشیده می‌شود، نه با نوارهای پهن."] },
        { label: "ورودیِ ملک نیست", it: "passo carrabile", values: ["ورودیِ ملک با تابلوی خودش و خط‌چینِ کنارِ سواره‌رو مشخص می‌شود (درس ۵)."] },
        { label: "جزیره نیست", it: "isola · salvagente", values: ["خودروها از روی گذرگاه رد می‌شوند؛ جزیره و سکوی عابر را نمی‌شود رد کرد."] },
        { label: "برای چه کسی", it: "pedoni", values: ["همه‌ی عابرها، نه فقط معلول‌ها. عبورِ عابر را ممنوع نمی‌کند؛ برای همین است."] },
      ],
      takeaway: "نوارهای پهنِ موازی = گذرگاهِ عابر، برای همه‌ی عابرها. خودرو از رویش رد می‌شود، ولی وقتی عابر هست می‌ایستد.",
      rule: "Codice della Strada art. 40 c.11; DPR 495/1992 art. 145 c.1; art. 146",
    },
    {
      kind: "table",
      title: "کنارِ گذرگاه چه باید بکنی",
      body: "خط‌کشی تنها نیست؛ گاهی تابلو و خطِ زرد هم دارد. و قاعده‌ی حق تقدم همه‌جا یکی است.",
      columns: ["قاعده"],
      rows: [
        {
          label: "حق تقدم",
          it: "precedenza ai pedoni",
          values: ["عابری که روی گذرگاه است یا می‌خواهد عبور کند حق تقدم دارد: آهسته کن، و اگر عابر هست، بایست."],
        },
        {
          label: "تابلوی خطر پیش از آن",
          it: "pericolo · ATTRAVERSAMENTO PEDONALE",
          values: ["بیرونِ شهر (مثلاً جاده‌های فرعیِ بیرونِ شهر) و روی جاده‌های شهریِ سریع‌تر، تابلوی مثلثیِ خطر پیش از گذرگاه اجباری است؛ در شهر اختیاری."],
        },
        {
          label: "تابلوی مربعیِ سرِ گذرگاه",
          it: "indicazione · ATTRAVERSAMENTO PEDONALE",
          values: ["تابلوی آبیِ «گذرگاهِ عابر» را می‌شود سرِ خودِ گذرگاه، دو طرفِ سواره‌رو، نصب کرد تا خط‌کشی را کامل کند."],
        },
        {
          label: "خطِ زردِ زیگزاگ",
          it: "striscia gialla a zig zag",
          sign: 545,
          values: ["جایی که کنارِ خیابان پارک مجاز است، می‌تواند پیش از گذرگاه، سمتِ راست، کشیده شود. رویش پارک ممنوع است تا عابر دیده شود."],
        },
      ],
      takeaway: "پیش از گذرگاه: تابلوی خطر (بیرونِ شهر اجباری) و شاید زیگزاگِ زرد. سرِ گذرگاه: تابلوی مربعی و خط‌کشی. روی گذرگاه: عابر اول.",
      rule: "Codice della Strada art. 191 c.1; DPR 495/1992 art. 88 c.2, c.4; art. 135 c.3; art. 145 c.4",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'attraversamento pedonale", fa: "گذرگاهِ عابر" },
        { it: "le strisce pedonali", fa: "خط‌کشیِ گذرگاهِ عابر" },
        { it: "il pedone", fa: "عابرِ پیاده" },
        { it: "accingersi ad attraversare", base: "accingersi", fa: "آماده‌ی عبور بودن" },
        { it: "transitare", fa: "عبور کردن (با خودرو)" },
        { it: "la striscia gialla a zig zag", fa: "خطِ زردِ زیگزاگ" },
        { it: "extraurbana secondaria", fa: "جاده‌ی فرعیِ بیرونِ شهر" },
        { it: "preceduta", base: "precedere", fa: "که پیش از آن … می‌آید" },
      ],
    },
    {
      kind: "trap",
      title: "بایستی یا اصلاً رد نشوی؟",
      body: "یک جمله‌ی بانک می‌گوید گذرگاه تو را مجبور به ایستادن می‌کند؛ دیگری می‌گوید اصلاً نمی‌شود از رویش رد شد. فقط یکی درست است:",
      examples: [
        {
          sourceId: "2557",
          figure: 517,
          textIt: "La segnaletica in figura obbliga i conducenti ad arrestarsi quando vi sono pedoni che attraversano la carreggiata",
          answer: 1,
          chunks: [
            { it: SEGNALETICA, fa: SEGNALETICA_FA },
            { it: "obbliga i conducenti ad arrestarsi", fa: "راننده‌ها را مجبور می‌کند بایستند", verb: "obbliga ← obbligare" },
            { it: "quando vi sono pedoni che attraversano la carreggiata", fa: "وقتی عابرهایی از سواره‌رو عبور می‌کنند", verb: "attraversano ← attraversare", focus: "condition" },
          ],
          translation: "خط‌کشیِ تصویر راننده‌ها را مجبور می‌کند، وقتی عابرهایی از سواره‌رو عبور می‌کنند، بایستند.",
          why: "درست است. عابرِ روی گذرگاه حق تقدم دارد؛ اگر هست، می‌ایستی.",
        },
        {
          sourceId: "2566",
          figure: 517,
          textIt: "La segnaletica in figura non consente ai veicoli di transitarci sopra",
          answer: 0,
          chunks: [
            { it: SEGNALETICA, fa: SEGNALETICA_FA },
            { it: "non consente ai veicoli", fa: "به خودروها اجازه نمی‌دهد", verb: "consente ← consentire", focus: "negation" },
            { it: "di transitarci sopra", fa: "که از رویش عبور کنند" },
          ],
          translation: "خط‌کشیِ تصویر به خودروها اجازه نمی‌دهد از رویش عبور کنند.",
          why: "غلط است. گذرگاه بخشی از سواره‌روست؛ وقتی عابری نیست، از رویش رد می‌شوی.",
        },
      ],
      takeaway: "شرط را پیدا کن: «quando vi sono pedoni» → بایست. بدونِ شرط، «هرگز رد نشو» غلط است.",
      rule: "Codice della Strada art. 40 c.11; art. 191 c.1",
    },
  ],
  practice: [
    {
      sourceId: "2562",
      figure: 517,
      textIt: "La segnaletica in figura indica un attraversamento per ciclisti",
      answer: 0,
      chunks: [
        { it: SEGNALETICA, fa: SEGNALETICA_FA },
        { it: "indica un attraversamento per ciclisti", fa: "گذرگاهی برای دوچرخه‌سوارها را نشان می‌دهد", verb: "indica ← indicare", focus: "contrast" },
      ],
      translation: "خط‌کشیِ تصویر گذرگاهی برای دوچرخه‌سوارها را نشان می‌دهد.",
      why: "غلط است (قدم ۱). نوارهای پهن مالِ عابرند. گذرگاهِ دوچرخه دو ردیف خط‌چین است.",
      rule: "DPR 495/1992 art. 145 c.1; art. 146",
      conceptStep: 1,
    },
    {
      sourceId: "2564",
      figure: 517,
      textIt: "La segnaletica in figura indica un passo carrabile",
      answer: 0,
      chunks: [
        { it: SEGNALETICA, fa: SEGNALETICA_FA },
        { it: "indica un passo carrabile", fa: "یک ورودیِ ملک را نشان می‌دهد", verb: "indica ← indicare", focus: "contrast" },
      ],
      translation: "خط‌کشیِ تصویر یک ورودیِ ملک را نشان می‌دهد.",
      why: "غلط است (قدم ۱). این گذرگاهِ عابر است. ورودیِ ملک تابلوی خودش را دارد.",
      rule: "DPR 495/1992 art. 145 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2559",
      figure: 517,
      textIt: "La segnaletica in figura posta su strade extraurbane secondarie deve essere preceduta dal segnale di pericolo ATTRAVERSAMENTO PEDONALE",
      answer: 1,
      chunks: [
        { it: SEGNALETICA, fa: SEGNALETICA_FA },
        { it: "posta su strade extraurbane secondarie", fa: "وقتی روی جاده‌های فرعیِ بیرونِ شهر است", verb: "posta ← porre", focus: "condition" },
        { it: "deve essere preceduta", fa: "باید پیش از آن بیاید", verb: "deve ← dovere" },
        { it: "dal segnale di pericolo ATTRAVERSAMENTO PEDONALE", fa: "تابلوی خطرِ «گذرگاهِ عابر»" },
      ],
      translation: "خط‌کشیِ تصویر، وقتی روی جاده‌های فرعیِ بیرونِ شهر است، باید تابلوی خطرِ «گذرگاهِ عابر» را پیش از خود داشته باشد.",
      why: "درست است (قدم ۲). بیرونِ شهر تابلوی خطر پیش از گذرگاه اجباری است.",
      rule: "DPR 495/1992 art. 88 c.2",
      conceptStep: 2,
    },
    {
      sourceId: "2558",
      figure: 545,
      textIt: "Un attraversamento pedonale può essere preceduto sulla destra da una striscia gialla a zig zag, come nella figura seguente",
      answer: 1,
      chunks: [
        { it: "Un attraversamento pedonale", fa: "یک گذرگاهِ عابر" },
        { it: "può essere preceduto sulla destra", fa: "می‌تواند در سمتِ راست، پیش از خود، داشته باشد", verb: "può ← potere" },
        { it: "da una striscia gialla a zig zag,", fa: "یک خطِ زردِ زیگزاگ،" },
        { it: "come nella figura seguente", fa: "مثلِ تصویرِ زیر" },
      ],
      translation: "یک گذرگاهِ عابر می‌تواند، مثلِ تصویرِ زیر، در سمتِ راست یک خطِ زردِ زیگزاگ پیش از خود داشته باشد.",
      why: "درست است (قدم ۲). جایی که کنارِ خیابان پارک مجاز است، زیگزاگِ زرد جلوی گذرگاه را از خودروی پارک‌شده خالی نگه می‌دارد.",
      rule: "DPR 495/1992 art. 145 c.4",
      conceptStep: 2,
    },
    {
      sourceId: "2555",
      figure: 517,
      textIt: "La segnaletica in figura indica un attraversamento in cui i pedoni hanno la precedenza",
      answer: 1,
      chunks: [
        { it: SEGNALETICA, fa: SEGNALETICA_FA },
        { it: "indica un attraversamento", fa: "گذرگاهی را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "in cui i pedoni hanno la precedenza", fa: "که در آن عابرها حق تقدم دارند", verb: "hanno ← avere" },
      ],
      translation: "خط‌کشیِ تصویر گذرگاهی را نشان می‌دهد که در آن عابرها حق تقدم دارند.",
      why: "درست است (قدم ۲). روی گذرگاهِ عابر، عابر اول است.",
      rule: "Codice della Strada art. 40 c.11; art. 191 c.1",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2551", "2552", "2553", "2554", "2561", "2562", "2563", "2564", "2565", "2566", "2567", "2568"] },
    { step: 2, sourceIds: ["2555", "2556", "2557", "2558", "2559", "2560"] },
  ],
};

// ── Lesson 9 ──────────────────────────────────────────────────────────────────

export const lessonGialli: Lesson = {
  id: "segni-gialli-sosta-fermata",
  titleFa: "رنگِ زرد: پارک ممنوع، توقفِ کوتاه آزاد",
  titleIt: "SEGNI GIALLI · FERMATA BUS · STALLI RISERVATI",
  minutes: 5,
  signs: [],
  figures: [670, 546, 445],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس سه نقشِ زرد را می‌شناسی: زرد و سیاهِ لبه‌ی جدول، ایستگاهِ اتوبوس با زیگزاگ، و جای پارکِ معلول؛ و برای هر کدام می‌دانی پارک (sosta) و توقفِ کوتاه (fermata) مجاز است یا نه.",
      why:
        "۲۹ سؤال. تقریباً همه به فرقی برمی‌گردند که در فصل ۳ دیدی: sosta یعنی خودرو را می‌گذاری و می‌روی؛ fermata یعنی توقفی کوتاه با راننده‌ی آماده، مثلاً برای پیاده کردنِ کسی.",
    },
    {
      kind: "table",
      title: "لبه‌ی زرد و سیاهِ جدول",
      body: "این نشانه روی بدنه‌ی عمودیِ جدولِ پیاده‌رو رنگ می‌شود، نه روی آسفالت.",
      columns: ["قاعده"],
      rows: [
        { label: "کجاست", it: "bordo del marciapiede", sign: 670, values: ["قطعه‌های زرد و سیاهِ یکی‌درمیان روی بدنه‌ی عمودیِ جدولِ پیاده‌رو (یا دیوارِ کنارِ جاده)."] },
        { label: "پارک", it: "sosta", values: ["در همان طرف و همان تکه ممنوع است، برای همه، تاکسی هم. نه پولی است، نه یک‌ساعته."] },
        { label: "توقفِ کوتاه", it: "fermata", values: ["مجاز است؛ فقط پارک ممنوع است."] },
        { label: "چه نیست", values: ["هشدارِ مانع در وسطِ سواره‌رو، کارگاه، هشدارِ پله برای عابر، جاده‌ی با حق تقدم، یا جای پارکِ اتوبوس."] },
      ],
      takeaway: "زرد و سیاه روی جدول = پارک ممنوع برای همه؛ توقفِ کوتاه آزاد.",
      rule: "DPR 495/1992 art. 152 c.3; Codice della Strada art. 157 c.1",
    },
    {
      kind: "table",
      title: "ایستگاهِ اتوبوس",
      body: "ایستگاهِ اتوبوسِ خطِ عمومی سه بخش دارد: ورود، توقف، خروج. همه زرد.",
      columns: ["قاعده"],
      rows: [
        {
          label: "شکل",
          it: "fermata bus",
          sign: 546,
          values: ["خط‌چینِ زرد موازیِ جدول، دو سرِ زیگزاگِ زرد، و کلمه‌ی BUS زرد. هرگز سفید."],
        },
        {
          label: "برای چه",
          values: ["توقفِ اتوبوس، اتوبوسِ برقی و اتوبوسِ مفصلی (autosnodato) در خطِ عمومی. زیگزاگ‌ها برای کنار آمدن و راه افتادنِ اتوبوس‌اند. جای تاکسی نیست."],
        },
        {
          label: "پارک",
          values: ["در کلِ محدوده، زیگزاگ‌ها هم، ممنوع است؛ شب هم. ولی بیرونِ محدوده، مثلاً ۲۰ متر پیش از آن، این خط‌کشی چیزی را ممنوع نمی‌کند."],
        },
        { label: "توقفِ کوتاه و عبور", values: ["توقفِ کوتاه ممنوع نیست. خودرو و کامیون هم می‌توانند از روی محدوده رد شوند."] },
      ],
      takeaway: "ایستگاهِ اتوبوس: پارک نه، توقفِ کوتاه آره، عبور آره. ممنوعیت فقط داخلِ خط‌کشی است.",
      rule: "DPR 495/1992 art. 151 c.1–5; art. 148 c.4; Codice della Strada art. 158 c.2 lett. d",
    },
    {
      kind: "table",
      title: "جای پارکِ معلول",
      body: "جای پارکِ رزرو با خطِ زرد کشیده می‌شود و نمادِ کسی را دارد که برایش رزرو شده.",
      columns: ["قاعده"],
      rows: [
        { label: "جای پارک", it: "stallo riservato", sign: 445, values: ["قابِ زرد با نمادِ ویلچر؛ فقط برای خودرویی که کارتِ معلولیت دارد."] },
        { label: "خط‌های اریبِ زردِ کنارش", values: ["باید خالی بمانند تا معلول بتواند سوار و پیاده شود یا به پیاده‌رو برسد."] },
        { label: "چه نیست", values: ["جای تاکسی یا بارگیری نیست؛ هر جای رزرو نمادِ خودش را دارد."] },
      ],
      takeaway: "قابِ زرد + ویلچر = فقط معلول. خط‌های اریبِ کنارش هم جای پارک نیست.",
      rule: "DPR 495/1992 art. 149 c.3–5",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la sosta", fa: "پارک؛ گذاشتنِ خودرو و رفتن" },
        { it: "la fermata", fa: "توقفِ کوتاه با راننده‌ی آماده", note: "«fermata dell'autobus» هم یعنی ایستگاهِ اتوبوس." },
        { it: "il bordo del marciapiede", fa: "لبه‌ی جدولِ پیاده‌رو" },
        { it: "in servizio pubblico di linea", fa: "در خطِ حمل‌ونقلِ عمومی" },
        { it: "l'autosnodato", fa: "اتوبوسِ مفصلی" },
        { it: "lo stallo riservato", fa: "جای پارکِ رزرو" },
        { it: "le persone invalide", fa: "افرادِ معلول" },
        { it: "vieta", base: "vietare", fa: "ممنوع می‌کند" },
      ],
    },
    {
      kind: "trap",
      title: "پارک ممنوع ≠ توقف ممنوع",
      body: "دو جمله‌ی بانک درباره‌ی لبه‌ی زرد و سیاه. یکی فقط پارک را ممنوع می‌داند، دیگری توقفِ کوتاه را هم:",
      examples: [
        {
          sourceId: "2477",
          figure: 670,
          textIt: "I segni gialli e neri in figura dipinti sul bordo del marciapiede consentono la fermata",
          answer: 1,
          chunks: [
            { it: SEGNI, fa: SEGNI_FA },
            { it: DIPINTI, fa: DIPINTI_FA, verb: "dipinti ← dipingere" },
            { it: "consentono la fermata", fa: "توقفِ کوتاه را مجاز می‌دانند", verb: "consentono ← consentire" },
          ],
          translation: "نشانه‌های زرد و سیاهِ تصویر که روی لبه‌ی جدولِ پیاده‌رو رنگ شده‌اند، توقفِ کوتاه را مجاز می‌دانند.",
          why: "درست است. این نشانه فقط پارک را ممنوع می‌کند.",
        },
        {
          sourceId: "2481",
          figure: 670,
          textIt: "I segni gialli e neri in figura dipinti sul bordo del marciapiede indicano che è vietata anche la fermata",
          answer: 0,
          chunks: [
            { it: SEGNI, fa: SEGNI_FA },
            { it: DIPINTI, fa: DIPINTI_FA, verb: "dipinti ← dipingere" },
            { it: "indicano che è vietata anche la fermata", fa: "نشان می‌دهند که توقفِ کوتاه هم ممنوع است", verb: "indicano ← indicare", focus: "contrast" },
          ],
          translation: "نشانه‌های زرد و سیاهِ تصویر که روی لبه‌ی جدولِ پیاده‌رو رنگ شده‌اند، نشان می‌دهند که توقفِ کوتاه هم ممنوع است.",
          why: "غلط است. «anche la fermata» بیش از قانون است: آیین‌نامه این نشانه را فقط برای تکه‌هایی آورده که پارک در آن‌ها ممنوع است.",
        },
      ],
      takeaway: "زرد و سیاه و ایستگاهِ اتوبوس: sosta نه، fermata آره. «anche la fermata» را با شک بخوان.",
      rule: "DPR 495/1992 art. 152 c.3; Codice della Strada art. 157 c.1",
    },
  ],
  practice: [
    {
      sourceId: "2523",
      figure: 670,
      textIt: "Il bordo del marciapiede come dipinto in figura vieta la sosta anche ai taxi",
      answer: 1,
      chunks: [
        { it: "Il bordo del marciapiede come dipinto in figura", fa: "لبه‌ی جدولِ پیاده‌رو، آن‌طور که در تصویر رنگ شده،", verb: "dipinto ← dipingere" },
        { it: "vieta la sosta", fa: "پارک را ممنوع می‌کند", verb: "vieta ← vietare" },
        { it: "anche ai taxi", fa: "حتی برای تاکسی‌ها" },
      ],
      translation: "لبه‌ی جدولِ پیاده‌رو، آن‌طور که در تصویر رنگ شده، پارک را حتی برای تاکسی‌ها ممنوع می‌کند.",
      why: "درست است (قدم ۱). ممنوعیت برای همه است؛ تاکسی استثنا ندارد.",
      rule: "DPR 495/1992 art. 152 c.3",
      conceptStep: 1,
    },
    {
      sourceId: "2479",
      figure: 670,
      textIt: "I segni gialli e neri in figura dipinti sul bordo del marciapiede segnalano un ostacolo al centro della carreggiata",
      answer: 0,
      chunks: [
        { it: SEGNI, fa: SEGNI_FA },
        { it: DIPINTI, fa: DIPINTI_FA, verb: "dipinti ← dipingere" },
        { it: "segnalano un ostacolo al centro della carreggiata", fa: "از مانعی در وسطِ سواره‌رو خبر می‌دهند", verb: "segnalano ← segnalare", focus: "contrast" },
      ],
      translation: "نشانه‌های زرد و سیاهِ تصویر که روی لبه‌ی جدولِ پیاده‌رو رنگ شده‌اند، از مانعی در وسطِ سواره‌رو خبر می‌دهند.",
      why: "غلط است (قدم ۱). روی جدول هستند و یک معنی دارند: اینجا پارک ممنوع است.",
      rule: "DPR 495/1992 art. 152 c.3",
      conceptStep: 1,
    },
    {
      sourceId: "2485",
      figure: 546,
      textIt: "La segnaletica in figura vieta la sosta ma non la fermata anche nelle parti con striscia gialla a zig zag",
      answer: 1,
      chunks: [
        { it: SEGNALETICA, fa: SEGNALETICA_FA },
        { it: "vieta la sosta", fa: "پارک را ممنوع می‌کند", verb: "vieta ← vietare" },
        { it: "ma non la fermata", fa: "ولی توقفِ کوتاه را نه", focus: "contrast" },
        { it: "anche nelle parti con striscia gialla a zig zag", fa: "حتی در بخش‌هایی که خطِ زردِ زیگزاگ دارند" },
      ],
      translation: "خط‌کشیِ تصویر پارک را ممنوع می‌کند ولی توقفِ کوتاه را نه، حتی در بخش‌هایی که خطِ زردِ زیگزاگ دارند.",
      why: "درست است (قدم ۲). در کلِ ایستگاه، زیگزاگ‌ها هم، فقط پارک ممنوع است.",
      rule: "DPR 495/1992 art. 151 c.5; Codice della Strada art. 158 c.2 lett. d",
      conceptStep: 2,
    },
    {
      sourceId: "2489",
      figure: 546,
      textIt: "La segnaletica in figura non consente la sosta 20 metri prima della striscia gialla a zig zag",
      answer: 0,
      chunks: [
        { it: SEGNALETICA, fa: SEGNALETICA_FA },
        { it: "non consente la sosta", fa: "اجازه‌ی پارک نمی‌دهد", verb: "consente ← consentire", focus: "negation" },
        { it: "20 metri prima della striscia gialla a zig zag", fa: "۲۰ متر پیش از خطِ زردِ زیگزاگ", focus: "limit" },
      ],
      translation: "خط‌کشیِ تصویر ۲۰ متر پیش از خطِ زردِ زیگزاگ اجازه‌ی پارک نمی‌دهد.",
      why: "غلط است (قدم ۲). ممنوعیتِ ایستگاه فقط داخلِ خط‌کشیِ زرد است؛ «۲۰ متر پیش از آن» ساختگی است.",
      rule: "DPR 495/1992 art. 151 c.2, c.5",
      conceptStep: 2,
    },
    {
      sourceId: "2608",
      figure: 445,
      textIt: "Le strisce gialle diagonali in figura devono essere lasciate libere per consentire l'entrata e l'uscita dal veicolo delle persone invalide",
      answer: 1,
      chunks: [
        { it: "Le strisce gialle diagonali in figura", fa: "خط‌های زردِ اریبِ تصویر" },
        { it: "devono essere lasciate libere", fa: "باید خالی بمانند", verb: "devono ← dovere" },
        { it: "per consentire l'entrata e l'uscita dal veicolo delle persone invalide", fa: "تا افرادِ معلول بتوانند سوار و پیاده شوند", focus: "reason" },
      ],
      translation: "خط‌های زردِ اریبِ تصویر باید خالی بمانند تا افرادِ معلول بتوانند سوار و پیاده شوند.",
      why: "درست است (قدم ۳). این فضای کناری برای باز کردنِ در و جابه‌جا شدن است، نه برای پارک.",
      rule: "DPR 495/1992 art. 149 c.5",
      conceptStep: 3,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: ["2474", "2475", "2476", "2477", "2478", "2479", "2480", "2481", "2523", "2524", "2525", "2526", "2527", "2528", "2529"],
    },
    { step: 2, sourceIds: ["2482", "2483", "2484", "2485", "2486", "2487", "2488", "2489", "2490", "2492"] },
    { step: 3, sourceIds: ["2607", "2608", "2613", "2614"] },
  ],
};

// ── Lesson 10 ─────────────────────────────────────────────────────────────────

export const lessonScritteRallentatori: Lesson = {
  id: "scritte-rallentatori-passaggio-livello",
  titleFa: "نوشته‌ها، سرعت‌گیرها و گذرگاهِ راه‌آهن",
  titleIt: "ISCRIZIONI · RALLENTATORI · PASSAGGIO A LIVELLO",
  minutes: 5,
  signs: [],
  figures: [502, 528, 534, 535, 531],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی چه چیزی را می‌شود روی آسفالت نوشت و چه چیزی را نه، سرعت‌گیرهای رنگی را می‌شناسی، و نوشته‌ی PL با ضربدر را به گذرگاهِ راه‌آهن ربط می‌دهی، چه راه‌بند داشته باشد چه نه.",
      why:
        "قاعده‌ی نوشته‌ها ساده است: فقط چیزی که ترافیک را هدایت یا تنظیم کند. هر نوشته‌ی تبلیغاتی یا تشویقی غلط است. سرعت‌گیرها و PL هم هر کدام یک معنیِ ثابت دارند.",
    },
    {
      kind: "table",
      title: "روی آسفالت چه می‌شود نوشت؟",
      body: "نوشته و نمادِ روی آسفالت فقط برای هدایت یا تنظیمِ ترافیک است. هر چیز دیگری مجوزِ وزارتخانه می‌خواهد.",
      columns: ["مجاز؟"],
      rows: [
        { label: "نامِ شهر یا خیابان", it: "località", values: ["بله؛ مثلاً کنارِ فلشِ جهت (درس ۴)."] },
        { label: "STOP، BUS، TAXI، TRAM", values: ["بله. STOP سفید؛ BUS، TAXI و TRAM زرد (درس‌های ۱ و ۷)."] },
        { label: "PL با ضربدر", it: "croce di S. Andrea", values: ["بله؛ کنارِ هر گذرگاهِ راه‌آهن (قدم ۳)."] },
        { label: "تبلیغ", it: "pubblicità", values: ["نه؛ مثلاً تبلیغِ پمپ‌بنزین یا خبرِ «پمپ‌بنزینِ بعدی»."] },
        { label: "نوشته‌های دیگر", values: ["نه، مگر با مجوزِ وزارتخانه؛ مثلاً تشویقِ مسابقه‌ی دوچرخه یا کلمه‌ای کنارِ پارک."] },
      ],
      takeaway: "سؤالِ «E' regolamentare…»: اگر نوشته به راننده می‌گوید کجا برود یا چه کند، درست؛ اگر چیزی می‌فروشد یا سرگرم می‌کند، غلط.",
      rule: "DPR 495/1992 art. 148 c.1–4, c.8, c.10, c.12",
    },
    {
      kind: "table",
      title: "سرعت‌گیرها و عددِ روی آسفالت",
      body: "بعضی نقش‌ها برای کم کردنِ سرعت‌اند: یکی با چشم، یکی با برآمدگی.",
      columns: ["معنی"],
      rows: [
        {
          label: "نوارهای عرضیِ سفیدِ پهن‌شونده",
          it: "rallentatore ottico",
          sign: 534,
          values: ["دست‌کم چهار نوارِ سفید که در جهتِ حرکت پهن‌تر و نزدیک‌تر می‌شوند: سرعت را کم کن."],
        },
        {
          label: "برآمدگیِ زرد و سیاه",
          it: "dosso artificiale",
          sign: 535,
          values: ["سرعت‌گیرِ برآمده؛ فقط جایی که سقفِ سرعت ۵۰ یا کمتر است، با تابلوی خطر پیش از آن. گذرگاهِ عابر یا دوچرخه نیست و نشانه‌ی پارک ممنوع هم نیست."],
        },
        {
          label: "عددِ سفید روی آسفالت",
          it: "50",
          sign: 528,
          values: [
            "بانک آن را «سرعتِ توصیه‌شده» می‌خواند و ربطی به وزنِ کامیون ندارد. آیین‌نامه برای عددِ رنگ‌شده متنِ جداگانه‌ای ندارد؛ فقط می‌گوید نمادِ روی آسفالت می‌تواند تابلوی ایستاده را تکرار کند.",
          ],
        },
      ],
      takeaway: "نوارهای سفیدِ پهن‌شونده و برآمدگیِ زرد و سیاه هر دو یعنی «آهسته». هیچ‌کدام گذرگاه یا پارک ممنوع نیست.",
      rule: "DPR 495/1992 art. 179 c.1–2, c.4–5, c.7; art. 148 c.11",
    },
    {
      kind: "table",
      title: "گذرگاهِ راه‌آهن روی آسفالت",
      body: "پیش از گذرگاهِ راه‌آهن، روی هر خطِ عبور یک ضربدرِ سفید با حروفِ P و L کشیده می‌شود.",
      columns: ["قاعده"],
      rows: [
        { label: "PL با ضربدر", it: "PL · croce di S. Andrea", sign: 531, values: ["روی هر خطِ عبورِ رو به گذرگاهِ راه‌آهن، چه راه‌بند داشته باشد چه نداشته باشد. یعنی: مراقبِ قطار باش."] },
        { label: "خطِ وسط نزدیکِ گذرگاه", values: ["ممتد است: به نیمه‌ی چپِ سواره‌رو نرو. پس «خط‌چین نزدیکِ همه‌ی گذرگاه‌های راه‌آهن» غلط است."] },
        { label: "چه نیست", values: ["گذرگاهِ تراموا، تقاطعِ دارای مأمور، یا پارکِ اتوبوس."] },
      ],
      takeaway: "PL = Passaggio a Livello، با یا بدونِ راه‌بند. کنارش خطِ وسط ممتد است.",
      rule: "DPR 495/1992 art. 148 c.10; art. 139 c.2 lett. f",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'iscrizione", fa: "نوشته (روی آسفالت)" },
        { it: "la scritta pubblicitaria", fa: "نوشته‌ی تبلیغاتی" },
        { it: "il rallentatore di velocità", fa: "سرعت‌گیر" },
        { it: "il dosso artificiale", fa: "سرعت‌گیرِ برآمده" },
        { it: "moderare la velocità", base: "moderare", fa: "سرعت را کم کردن" },
        { it: "la velocità consigliata", fa: "سرعتِ توصیه‌شده" },
        { it: "il passaggio a livello", fa: "گذرگاهِ راه‌آهن" },
        { it: "con / senza barriere", fa: "با / بدونِ راه‌بند" },
      ],
    },
    {
      kind: "trap",
      title: "PL: با راه‌بند یا بی‌راه‌بند؟",
      body: "دو جمله‌ی بانک درباره‌ی یک نوشته. یکی می‌گوید «بی‌راه‌بند»، دیگری «فقط با راه‌بند»:",
      examples: [
        {
          sourceId: "2628",
          figure: 531,
          textIt: "La segnaletica rappresentata in figura serve ad avvertire i conducenti che si è vicini ad un passaggio a livello senza barriere",
          answer: 1,
          chunks: [
            { it: RAPPRESENTATA, fa: RAPPRESENTATA_FA },
            { it: "serve ad avvertire i conducenti", fa: "برای هشدار به راننده‌هاست", verb: "serve ← servire" },
            { it: "che si è vicini ad un passaggio a livello", fa: "که به یک گذرگاهِ راه‌آهن نزدیک‌اند" },
            { it: "senza barriere", fa: "بدونِ راه‌بند", focus: "condition" },
          ],
          translation: "خط‌کشیِ تصویر برای هشدار به راننده‌هاست که به یک گذرگاهِ راه‌آهنِ بدونِ راه‌بند نزدیک‌اند.",
          why: "درست است. PL پیش از هر گذرگاهِ راه‌آهن کشیده می‌شود، از جمله گذرگاهِ بی‌راه‌بند.",
        },
        {
          sourceId: "2633",
          figure: 531,
          textIt: "La segnaletica rappresentata in figura si trova solo in vicinanza di passaggi a livello con barriere",
          answer: 0,
          chunks: [
            { it: RAPPRESENTATA, fa: RAPPRESENTATA_FA },
            { it: "si trova solo in vicinanza di passaggi a livello", fa: "فقط نزدیکِ گذرگاه‌های راه‌آهنی دیده می‌شود", verb: "si trova ← trovare", focus: "limit" },
            { it: "con barriere", fa: "که راه‌بند دارند", focus: "condition" },
          ],
          translation: "خط‌کشیِ تصویر فقط نزدیکِ گذرگاه‌های راه‌آهنی دیده می‌شود که راه‌بند دارند.",
          why: "غلط است. «solo» اشتباه است: PL پیش از هر گذرگاهِ راه‌آهن است، با یا بدونِ راه‌بند.",
        },
      ],
      takeaway: "«con barriere» و «senza barriere» هر دو درست‌اند؛ «solo» یکی از آن‌ها را غلط می‌کند.",
      rule: "DPR 495/1992 art. 148 c.10",
    },
  ],
  practice: [
    {
      sourceId: "2538",
      textIt: "E' regolamentare trovare sulla pavimentazione una scritta pubblicitaria che indica un distributore di carburante",
      answer: 0,
      chunks: [
        { it: "E' regolamentare", fa: "طبقِ مقررات است" },
        { it: "trovare sulla pavimentazione", fa: "که روی آسفالت ببینی" },
        { it: "una scritta pubblicitaria", fa: "یک نوشته‌ی تبلیغاتی", focus: "contrast" },
        { it: "che indica un distributore di carburante", fa: "که پمپ‌بنزینی را نشان می‌دهد", verb: "indica ← indicare" },
      ],
      translation: "طبقِ مقررات است که روی آسفالت یک نوشته‌ی تبلیغاتی ببینی که پمپ‌بنزینی را نشان می‌دهد.",
      why: "غلط است (قدم ۱). روی آسفالت فقط چیزی نوشته می‌شود که ترافیک را هدایت یا تنظیم کند؛ تبلیغ نه.",
      rule: "DPR 495/1992 art. 148 c.1, c.12",
      conceptStep: 1,
    },
    {
      sourceId: "2604",
      figure: 535,
      textIt: "Il dispositivo in figura è un dosso artificiale",
      answer: 1,
      chunks: [
        { it: "Il dispositivo in figura", fa: "وسیله‌ی تصویر" },
        { it: "è un dosso artificiale", fa: "یک سرعت‌گیرِ برآمده است" },
      ],
      translation: "وسیله‌ی تصویر یک سرعت‌گیرِ برآمده است.",
      why: "درست است (قدم ۲). نوارهای زرد و سیاهِ موازی با جهتِ حرکت نشانه‌ی سرعت‌گیرِ برآمده است.",
      rule: "DPR 495/1992 art. 179 c.4",
      conceptStep: 2,
    },
    {
      sourceId: "2534",
      figure: 534,
      textIt: "Quando si incontrano le strisce di figura dipinte sulla pavimentazione occorre moderare la velocità",
      answer: 1,
      chunks: [
        { it: "Quando si incontrano", fa: "وقتی به … می‌رسی", verb: "si incontrano ← incontrare", focus: "condition" },
        { it: "le strisce di figura dipinte sulla pavimentazione", fa: "خط‌های تصویر که روی آسفالت رنگ شده‌اند", verb: "dipinte ← dipingere" },
        { it: "occorre moderare la velocità", fa: "باید سرعت را کم کرد", verb: "occorre ← occorrere" },
      ],
      translation: "وقتی به خط‌های تصویر می‌رسی که روی آسفالت رنگ شده‌اند، باید سرعت را کم کرد.",
      why: "درست است (قدم ۲). نوارهای عرضیِ سفیدی که پهن‌تر و نزدیک‌تر می‌شوند سرعت‌گیرِ دیداری‌اند.",
      rule: "DPR 495/1992 art. 179 c.1–2",
      conceptStep: 2,
    },
    {
      sourceId: "2630",
      figure: 531,
      textIt: "In presenza della segnaletica rappresentata in figura non è consentito spostarsi nella parte sinistra della carreggiata",
      answer: 1,
      chunks: [
        { it: "In presenza della segnaletica rappresentata in figura", fa: "با خط‌کشیِ تصویر" },
        { it: "non è consentito", fa: "مجاز نیست", focus: "negation" },
        { it: "spostarsi nella parte sinistra della carreggiata", fa: "به نیمه‌ی چپِ سواره‌رو بروی" },
      ],
      translation: "با خط‌کشیِ تصویر، مجاز نیست به نیمه‌ی چپِ سواره‌رو بروی.",
      why: "درست است (قدم ۳). نزدیکِ گذرگاهِ راه‌آهن خطِ وسط ممتد است؛ از آن عبور نمی‌کنی.",
      rule: "DPR 495/1992 art. 139 c.2 lett. f; Codice della Strada art. 40 c.8",
      conceptStep: 3,
    },
    {
      sourceId: "2632",
      figure: 531,
      textIt: "La segnaletica rappresentata in figura serve ad indicare che a 150 metri vi è un attraversamento tranviario molto pericoloso",
      answer: 0,
      chunks: [
        { it: RAPPRESENTATA, fa: RAPPRESENTATA_FA },
        { it: "serve ad indicare", fa: "برای نشان دادنِ این است", verb: "serve ← servire" },
        { it: "che a 150 metri vi è un attraversamento tranviario molto pericoloso", fa: "که ۱۵۰ متر جلوتر یک گذرگاهِ تراموای بسیار خطرناک هست", focus: "contrast" },
      ],
      translation: "خط‌کشیِ تصویر برای نشان دادنِ این است که ۱۵۰ متر جلوتر یک گذرگاهِ تراموای بسیار خطرناک هست.",
      why: "غلط است (قدم ۳). PL یعنی گذرگاهِ راه‌آهن، و نزدیکِ خودِ گذرگاه کشیده می‌شود، نه برای تراموا.",
      rule: "DPR 495/1992 art. 148 c.10",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2537", "2538", "2539", "2541"] },
    { step: 2, sourceIds: ["2534", "2603", "2604", "2605", "2606", "2609", "2610", "2611", "2612"] },
    { step: 3, sourceIds: ["2401", "2533", "2627", "2628", "2629", "2630", "2631", "2632", "2633", "2634", "2635"] },
  ],
};
