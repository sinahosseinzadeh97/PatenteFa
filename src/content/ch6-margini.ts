/**
 * src/content/ch6-margini.ts
 * Chapter 6 (Segnaletica orizzontale e segni sugli ostacoli), lessons 5, 6 and 7:
 * edge lines and the emergency lane, traffic islands vs guide stripes, and
 * transverse lines (where to stop).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter6.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const LATERALE = "La striscia bianca laterale discontinua in figura";
const LATERALE_FA = "خط‌چینِ سفیدِ کناریِ تصویر";
const CORSIA_A = "La corsia di emergenza (corsia A)";
const CORSIA_A_FA = "خطِ اضطراری (خطِ A)";
const NELLA_SEGNALETICA = "Nella segnaletica in figura";
const NELLA_SEGNALETICA_FA = "در خط‌کشیِ تصویر";
const ISOLA = "L'isola di traffico in figura";
const ISOLA_FA = "جزیره‌ی ترافیکیِ تصویر";
const GUIDA = "Le strisce di guida in figura";
const GUIDA_FA = "خط‌های راهنمای تصویر";
const TRASVERSALE = "La striscia bianca trasversale in figura";
const TRASVERSALE_FA = "خطِ سفیدِ عرضیِ تصویر";
const TRASVERSALE_CONTINUA = "La striscia trasversale continua in figura";
const TRASVERSALE_CONTINUA_FA = "خطِ عرضیِ ممتدِ تصویر";

// ── Lesson 5 ──────────────────────────────────────────────────────────────────

export const lessonMargineEmergenza: Lesson = {
  id: "strisce-margine-emergenza",
  titleFa: "خطِ کنارِ سواره‌رو و خطِ اضطراری",
  titleIt: "STRISCE DI MARGINE · CORSIA DI EMERGENZA",
  minutes: 5,
  signs: [],
  figures: [502, 509, 513, 505, 537, 512, 553],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس از روی خطِ کنارِ سواره‌رو می‌فهمی آن طرفش چیست: اگر ممتد است، شانه‌ی جاده یا خطِ اضطراری؛ اگر خط‌چین است، جایی که خودروها وارد یا خارج می‌شوند. و می‌دانی خطِ اضطراری را کِی و تا چه مدت می‌شود استفاده کرد.",
      why:
        "بانک چند تصویر از خط‌چینِ کنارِ جاده نشان می‌دهد و می‌پرسد آن طرفش چیست. قاعده یک جمله است: خط‌چینِ کناری یعنی آن طرف جایی است که می‌شود به آن وارد شد یا از آن آمد.",
    },
    {
      kind: "table",
      title: "ممتد یا خط‌چین: آن طرفِ خط چیست؟",
      body: "خطِ کنارِ سواره‌رو (striscia di margine) سفید است. شکلش می‌گوید آن طرف برای چه کاری است.",
      columns: ["آن طرفِ خط"],
      rows: [
        {
          label: "خطِ کناریِ ممتد",
          it: "striscia di margine continua",
          values: ["شانه‌ی جاده (banchina) یا خطِ اضطراری؛ گاهی هم نشانه‌ی پارک ممنوع. فقط برای توقفِ اضطراری از آن عبور می‌کنی (و اتوبوسِ خطِ عمومی برای ایستگاهش)."],
        },
        {
          label: "خطِ کناریِ خط‌چین",
          it: "striscia di margine discontinua",
          values: [
            "جایی که می‌شود وارد یا خارج شد: جای توقفِ کنارِ جاده (piazzola)، ورودیِ ملک (passo carrabile)، خطِ شتاب یا کاهشِ سرعت، انشعاب، و دهانه‌ی جاده‌ای که باید حق تقدم بدهد. عبور از آن «فقط در اضطرار» نیست و خودش پارک را ممنوع نمی‌کند.",
          ],
        },
        {
          label: "دو خطِ ممتدِ کنارِ هم",
          it: "doppia striscia continua",
          values: ["خطِ کنارِ جاده نیست؛ خطِ وسطِ جاده‌ی دوطرفه است (درس ۲). کنارِ جاده یک خطِ سفیدِ تنهاست."],
        },
        {
          label: "سفید و زرد کنارِ هم",
          it: "bianca + gialla",
          values: ["مرزِ خطِ عبورِ ویژه (مثلاً اتوبوس) یا مسیرِ دوچرخه با این دو خطِ ممتد کشیده می‌شود، نه با یک خط‌چینِ سفید."],
        },
      ],
      takeaway: "خط‌چینِ کناری = آن طرف دری باز است. ممتدِ کناری = آن طرف جای رانندگی نیست؛ شانه یا خطِ اضطراری است.",
      rule: "DPR 495/1992 art. 140 c.6–7; art. 141 c.1–3; Codice della Strada art. 40 c.9",
    },
    {
      kind: "classify",
      title: "آن طرفِ خط چیست؟",
      body: "پنج تصویر از بانک سؤال. برای هر کدام بگو آن طرفِ خطِ کناری چیست.",
      options: [
        { it: "piazzola di sosta", fa: "جای توقفِ کنارِ جاده" },
        { it: "passo carrabile", fa: "ورودیِ ملک" },
        { it: "corsia di accelerazione", fa: "خطِ شتاب" },
        { it: "strada secondaria", fa: "جاده‌ی فرعی" },
        { it: "corsia di emergenza", fa: "خطِ اضطراری" },
      ],
      items: [
        { prompt: "آن طرفِ این خط‌چین؟", figure: 513, answer: 0, explain: "یک فرورفتگیِ کوتاه کنارِ جاده: جای توقف (piazzola). خط‌چین است چون باید بشود به آن وارد شد." },
        { prompt: "آن طرفِ این خط‌چین؟", figure: 505, answer: 1, explain: "دهانه‌ای کوتاه رو به یک ملک: ورودیِ ملک (passo carrabile)." },
        { prompt: "آن طرفِ این خط‌چین؟", figure: 537, answer: 2, explain: "راهی که از کنار می‌آید و با جاده یکی می‌شود: خطِ شتاب، برای رسیدن به سرعتِ جاده پیش از ورود." },
        { prompt: "آن طرفِ این خط‌چین؟", figure: 512, answer: 3, explain: "خط‌چین لبه‌ی جاده‌ی اصلی را از دهانه‌ی جاده‌ی فرعی جدا می‌کند." },
        { prompt: "آن طرفِ خطِ کناری؟", figure: 553, answer: 4, explain: "اینجا خطِ کناری ممتد است: آن طرف خطِ اضطراری (A) است، نه جای رانندگی." },
      ],
      takeaway: "هر جا خطِ کناری خط‌چین می‌شود، دنبالِ «در» بگرد: ورودی، خروجی یا جای توقف.",
      rule: "DPR 495/1992 art. 141 c.2–3",
    },
    {
      kind: "table",
      title: "خطِ اضطراری: کِی و چقدر؟",
      body: "خطِ اضطراری (corsia di emergenza) کنارِ سواره‌روِ آزادراه‌ها و جاده‌های اصلیِ بیرونِ شهر است. اسمش «خط» است، ولی جای رانندگی نیست.",
      columns: ["قاعده"],
      rows: [
        { label: "کِی", it: "guasto · malessere", values: ["فقط برای توقفِ اضطراری: خرابیِ خودرو، یا حالِ بدِ راننده یا سرنشین."] },
        { label: "چقدر", it: "massimo tre ore", values: ["فقط تا وقتی لازم است، و هرگز بیش از سه ساعت؛ بعد از آن ممکن است خودرو را ببرند."] },
        { label: "سبقت، پیچیدن، کم کردنِ سرعت", it: "sorpasso · svolta · decelerazione", values: ["هیچ‌کدام. برای خروج، خطِ کاهشِ سرعتِ جداگانه هست."] },
        { label: "ترافیکِ سنگین", it: "intenso traffico", values: ["دلیل نیست. فقط در صف، از تابلوی خروجیِ ۵۰۰ متری به بعد، برای بیرون رفتن از آزادراه می‌شود واردش شد."] },
        { label: "موتورسیکلت", it: "motocicli", values: ["همان قاعده؛ استثنایی برای موتور نیست."] },
      ],
      takeaway: "خطِ اضطراری جای ایستادنِ ناچاری است، نه جای رانندگی؛ حداکثر سه ساعت.",
      rule: "Codice della Strada art. 176 c.1 lett. c, c.4–6; art. 40 c.9; DPR 495/1992 art. 141 c.2",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la striscia di margine", fa: "خطِ کنارِ سواره‌رو" },
        { it: "laterale", fa: "کناری" },
        { it: "la piazzola di sosta", fa: "جای توقفِ کنارِ جاده" },
        { it: "il passo carrabile", fa: "ورودیِ خودرو به ملک" },
        { it: "la corsia di accelerazione", fa: "خطِ شتاب" },
        { it: "la corsia di emergenza", fa: "خطِ اضطراری" },
        { it: "la banchina", fa: "شانه‌ی جاده" },
        { it: "il guasto", fa: "خرابیِ فنی" },
        { it: "il malessere", fa: "حالِ بد؛ ناخوشی" },
      ],
    },
    {
      kind: "trap",
      title: "خطِ ممتدِ کنارِ خطِ اضطراری: «فقط» یا «همیشه»؟",
      body: "دو جمله‌ی بانک درباره‌ی یک خط. یکی شرطِ قانون را می‌گوید، دیگری شرطی ساخته که در قانون نیست:",
      examples: [
        {
          sourceId: "2636",
          figure: 553,
          textIt:
            "Nella segnaletica in figura la striscia bianca continua, che separa la carreggiata dalla corsia di emergenza (corsia A), può essere superata solo in caso di necessità (guasto del veicolo, malessere dei viaggiatori)",
          answer: 1,
          chunks: [
            { it: NELLA_SEGNALETICA, fa: NELLA_SEGNALETICA_FA },
            { it: "la striscia bianca continua,", fa: "خطِ سفیدِ ممتد،" },
            { it: "che separa la carreggiata dalla corsia di emergenza (corsia A),", fa: "که سواره‌رو را از خطِ اضطراری (A) جدا می‌کند،", verb: "separa ← separare" },
            { it: "può essere superata", fa: "می‌شود از آن عبور کرد", verb: "può ← potere" },
            { it: "solo in caso di necessità (guasto del veicolo, malessere dei viaggiatori)", fa: "فقط در صورتِ ناچاری (خرابیِ خودرو، حالِ بدِ سرنشینان)", focus: "limit" },
          ],
          translation: "در خط‌کشیِ تصویر، خطِ سفیدِ ممتدی که سواره‌رو را از خطِ اضطراری (A) جدا می‌کند، فقط در صورتِ ناچاری (خرابیِ خودرو، حالِ بدِ سرنشینان) قابلِ عبور است.",
          why: "درست است. عبور از خطِ ممتدِ کناری فقط برای توقفِ اضطراری است.",
        },
        {
          sourceId: "2640",
          figure: 553,
          textIt:
            "Nella segnaletica in figura la striscia bianca continua che delimita la corsia di emergenza, (corsia A), può essere sempre superata in caso di intenso traffico",
          answer: 0,
          chunks: [
            { it: NELLA_SEGNALETICA, fa: NELLA_SEGNALETICA_FA },
            { it: "la striscia bianca continua che delimita la corsia di emergenza,", fa: "خطِ سفیدِ ممتدی که مرزِ خطِ اضطراری است،", verb: "delimita ← delimitare" },
            { it: "(corsia A),", fa: "(خطِ A)،" },
            { it: "può essere sempre superata", fa: "همیشه می‌شود از آن عبور کرد", verb: "può ← potere", focus: "always" },
            { it: "in caso di intenso traffico", fa: "در ترافیکِ سنگین", focus: "condition" },
          ],
          translation: "در خط‌کشیِ تصویر، از خطِ سفیدِ ممتدی که مرزِ خطِ اضطراری (A) است، در ترافیکِ سنگین همیشه می‌شود عبور کرد.",
          why: "غلط است. ترافیک اضطرار نیست. خطِ اضطراری باید برای امداد و خودروهای خراب خالی بماند.",
        },
      ],
      takeaway: "خطِ اضطراری: «فقط در اضطرار» درست است؛ «همیشه در ترافیک» غلط.",
      rule: "Codice della Strada art. 40 c.9; art. 176 c.1, c.4–5",
    },
  ],
  practice: [
    {
      sourceId: "2622",
      textIt: "La striscia bianca laterale discontinua separa la carreggiata dalla corsia di emergenza",
      answer: 0,
      chunks: [
        { it: "La striscia bianca laterale discontinua", fa: "خط‌چینِ سفیدِ کناری" },
        { it: "separa la carreggiata", fa: "سواره‌رو را جدا می‌کند", verb: "separa ← separare" },
        { it: "dalla corsia di emergenza", fa: "از خطِ اضطراری", focus: "contrast" },
      ],
      translation: "خط‌چینِ سفیدِ کناری سواره‌رو را از خطِ اضطراری جدا می‌کند.",
      why: "غلط است (قدم ۱). کنارِ خطِ اضطراری خطِ ممتد است، نه خط‌چین؛ چون جای رانندگی نیست.",
      rule: "DPR 495/1992 art. 141 c.2",
      conceptStep: 1,
    },
    {
      sourceId: "2615",
      figure: 513,
      textIt: "La striscia bianca laterale discontinua in figura separa la carreggiata da una piazzola di sosta",
      answer: 1,
      chunks: [
        { it: LATERALE, fa: LATERALE_FA },
        { it: "separa la carreggiata", fa: "سواره‌رو را جدا می‌کند", verb: "separa ← separare" },
        { it: "da una piazzola di sosta", fa: "از یک جای توقفِ کنارِ جاده" },
      ],
      translation: "خط‌چینِ سفیدِ کناریِ تصویر سواره‌رو را از یک جای توقفِ کنارِ جاده جدا می‌کند.",
      why: "درست است (قدم ۲). جای توقف «در»ی کنارِ جاده است؛ برای همین خط آنجا خط‌چین است.",
      rule: "DPR 495/1992 art. 141 c.3",
      conceptStep: 2,
    },
    {
      sourceId: "2618",
      figure: 537,
      textIt: "La striscia bianca laterale discontinua in figura divide la carreggiata da una corsia di accelerazione",
      answer: 1,
      chunks: [
        { it: LATERALE, fa: LATERALE_FA },
        { it: "divide la carreggiata", fa: "سواره‌رو را جدا می‌کند", verb: "divide ← dividere" },
        { it: "da una corsia di accelerazione", fa: "از یک خطِ شتاب" },
      ],
      translation: "خط‌چینِ سفیدِ کناریِ تصویر سواره‌رو را از یک خطِ شتاب جدا می‌کند.",
      why: "درست است (قدم ۲). از خطِ شتاب واردِ جاده می‌شوی، پس خطِ بینِ آن دو خط‌چین است.",
      rule: "DPR 495/1992 art. 141 c.3",
      conceptStep: 2,
    },
    {
      sourceId: "2637",
      figure: 553,
      textIt: "La corsia di emergenza (corsia A) si può utilizzare in caso di guasto del veicolo, per un massimo di tre ore",
      answer: 1,
      chunks: [
        { it: CORSIA_A, fa: CORSIA_A_FA },
        { it: "si può utilizzare", fa: "می‌شود از آن استفاده کرد", verb: "si può ← potere" },
        { it: "in caso di guasto del veicolo,", fa: "در صورتِ خرابیِ خودرو،", focus: "condition" },
        { it: "per un massimo di tre ore", fa: "حداکثر سه ساعت", focus: "limit" },
      ],
      translation: "از خطِ اضطراری (خطِ A) در صورتِ خرابیِ خودرو، حداکثر سه ساعت، می‌شود استفاده کرد.",
      why: "درست است (قدم ۳). خرابی یکی از دو دلیلِ توقفِ اضطراری است، و این توقف از سه ساعت بیشتر نمی‌شود.",
      rule: "Codice della Strada art. 176 c.5–6",
      conceptStep: 3,
    },
    {
      sourceId: "2643",
      figure: 553,
      textIt: "La corsia di emergenza (corsia A) è vietata al transito degli autoveicoli ma non al transito dei motocicli",
      answer: 0,
      chunks: [
        { it: CORSIA_A, fa: CORSIA_A_FA },
        { it: "è vietata al transito degli autoveicoli", fa: "برای عبورِ خودروها ممنوع است", focus: "negation" },
        { it: "ma non al transito dei motocicli", fa: "ولی برای عبورِ موتورسیکلت‌ها نه", focus: "contrast" },
      ],
      translation: "عبور از خطِ اضطراری (خطِ A) برای خودروها ممنوع است، ولی برای موتورسیکلت‌ها نه.",
      why: "غلط است (قدم ۳). خطِ اضطراری برای هیچ وسیله‌ای جای رانندگی نیست؛ موتور هم استثنا ندارد.",
      rule: "Codice della Strada art. 176 c.1 lett. c",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2400", "2419", "2620", "2621", "2622", "2623", "2625"] },
    { step: 2, sourceIds: ["2615", "2616", "2618", "2619", "2626"] },
    { step: 3, sourceIds: ["2636", "2637", "2638", "2639", "2640", "2641", "2642", "2643"] },
  ],
};

// ── Lesson 6 ──────────────────────────────────────────────────────────────────

export const lessonIsoleGuida: Lesson = {
  id: "isole-traffico-strisce-guida",
  titleFa: "جزیره‌ی ترافیکی یا خطِ راهنما؟",
  titleIt: "ISOLA DI TRAFFICO · STRISCE DI GUIDA",
  minutes: 5,
  signs: [],
  figures: [595, 596, 543, 506],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس جزیره‌ی ترافیکیِ رنگ‌شده را از خط‌های راهنمای تقاطع جدا می‌کنی: روی اولی نه می‌رانی نه پارک می‌کنی و مسیرت را تعیین می‌کند؛ از دومی می‌شود عبور کرد و فقط مسیرِ درست را نشان می‌دهد.",
      why:
        "بانک یک تقاطع را دو بار نشان می‌دهد، یک بار با جزیره و یک بار با خطِ راهنما، و درباره‌ی همان خودروهای A، B و C می‌پرسد. جوابِ دو تصویر تقریباً برعکسِ هم است.",
    },
    {
      kind: "table",
      title: "جزیره و خطِ راهنما کنارِ هم",
      body: "جزیره‌ی ترافیکی را در فصل ۱ به‌عنوانِ بخشی از جاده دیدی. اینجا شکلِ رنگ‌شده‌اش را می‌بینی و آن را با خطِ راهنما مقایسه می‌کنی.",
      columns: ["isola di traffico", "strisce di guida"],
      rows: [
        { label: "شکل", values: ["خط‌های اریبِ سفید (دست‌کم ۴۵ درجه) داخلِ یک قابِ سفید", "خط‌چین‌های سفیدِ منحنی"] },
        { label: "رانندگی و پارک رویش", values: ["هیچ‌کدام؛ بخشی از جاده است که رویش رفت‌وآمد نمی‌شود. پارک هم ممنوع، در هر ساعتی", "عبور آزاد است؛ خط‌چین‌اند"] },
        { label: "کارش", values: ["جریانِ خودروها را جدا و هدایت می‌کند؛ بعضی جهت‌ها را می‌بندد", "فقط مسیرِ درستِ پیچیدن را نشان می‌دهد؛ چیزی را نمی‌بندد"] },
      ],
      takeaway: "جزیره مسیر را تعیین می‌کند؛ خطِ راهنما فقط مسیر را نشان می‌دهد.",
      rule: "Codice della Strada art. 3 c.1 n.27; art. 40 c.8; DPR 495/1992 art. 143 c.1; art. 150 c.1–4",
    },
    {
      kind: "classify",
      title: "خودروی A، B و C چه می‌توانند بکنند؟",
      body: "دو تصویر از بانک سؤال: همان جاده، یک بار با جزیره (۵۹۵) و یک بار با خطِ راهنما (۵۹۶). برای هر خودرو بگو چه کاری از او خواسته می‌شود.",
      options: [
        { it: "deve andare diritto", fa: "باید مستقیم برود" },
        { it: "deve svoltare a destra", fa: "باید به راست بپیچد" },
        { it: "direzione libera", fa: "مجبور نیست؛ مسیرش آزاد است" },
      ],
      items: [
        { prompt: "خودروی A، با جزیره", figure: 595, answer: 0, explain: "جزیره راهِ پیچیدن به جاده‌ی پایین را از A گرفته است؛ فقط مستقیم." },
        { prompt: "خودروی B، با جزیره", figure: 595, answer: 1, explain: "B از جاده‌ی پایین می‌آید. جزیره پیچیدن به چپ را بسته است؛ فقط به راست." },
        { prompt: "خودروی C، با جزیره", figure: 595, answer: 1, explain: "جزیره راهِ مستقیمِ C را بسته است؛ ناچار به راست، به جاده‌ی پایین." },
        { prompt: "خودروی A، با خطِ راهنما", figure: 596, answer: 2, explain: "خطِ راهنما چیزی را نمی‌بندد؛ A به هر جهتی که جاده دارد می‌تواند برود." },
        { prompt: "خودروی B، با خطِ راهنما", figure: 596, answer: 2, explain: "B می‌تواند به چپ هم بپیچد، به شرطِ اینکه به A راه بدهد. مجبور به راست نیست." },
        { prompt: "خودروی C، با خطِ راهنما", figure: 596, answer: 2, explain: "C می‌تواند مستقیم برود؛ خط‌چین را می‌شود رد کرد. مجبور به راست نیست." },
      ],
      takeaway: "سؤال‌های «deve» (باید) مالِ جزیره‌اند؛ سؤال‌های «può» (می‌تواند) مالِ خطِ راهنما.",
      rule: "Codice della Strada art. 3 c.1 n.27; art. 40 c.8",
    },
    {
      kind: "table",
      title: "خط‌های راهنما در وسطِ تقاطع",
      body: "در بعضی تقاطع‌ها خط‌چین‌های منحنیِ سفید مسیرِ پیچیدن را روی آسفالت می‌کشند. این‌ها هم خطِ راهنمایند و هم مثلِ هر خط‌چینی قابلِ عبورند.",
      columns: ["قاعده"],
      rows: [
        {
          label: "کجا",
          it: "strisce di guida",
          sign: 543,
          values: ["جایی که پیچیدن به چپ طبقِ قاعده‌ی عمومی انجام می‌شود: نزدیکِ مرکزِ تقاطع، طوری که مرکز سمتِ راستِ تو بماند."],
        },
        { label: "پیچیدن به چپ", values: ["خط‌چینِ منحنی را سمتِ چپِ خودت نگه دار؛ این‌طور واردِ نیمه‌ی خلافِ جهتِ جاده‌ی جدید نمی‌شوی."] },
        { label: "مستقیم رفتن", values: ["از روی خط‌ها رد می‌شوی؛ خط‌چین‌اند و چیزی را نمی‌بندند."] },
        { label: "پیچیدن به راست", values: ["این خط‌ها برای پیچیدن به چپ کشیده شده‌اند. برای راست به لبه‌ی راست نزدیک می‌مانی؛ «همیشه سمتِ راستت نگه دار» قاعده نیست."] },
        { label: "تقاطعِ چندخطه", sign: 506, values: ["خط‌چین‌های منحنیِ داخلِ تقاطع خطِ راهنما هستند و پیچیدن را ممنوع نمی‌کنند. جزیره هم نمی‌سازند."] },
      ],
      takeaway: "خطِ راهنمای چپ‌گرد سمتِ چپِ تو می‌ماند و مرکزِ تقاطع سمتِ راستت. هدف: وارد نشدن به خلافِ جهت.",
      rule: "Codice della Strada art. 154 c.3 lett. b; DPR 495/1992 art. 143 c.1",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'isola di traffico", fa: "جزیره‌ی ترافیکی" },
        { it: "le strisce oblique", fa: "خط‌های اریب", note: "به این سطحِ راه‌راه «zebratura» هم می‌گویند." },
        { it: "le strisce di guida", fa: "خط‌های راهنما" },
        { it: "circolare", fa: "رفت‌وآمد کردن؛ راندن" },
        { it: "deve svoltare", base: "dovere", fa: "باید بپیچد" },
        { it: "può andare", base: "potere", fa: "می‌تواند برود" },
        { it: "il centro dell'incrocio", fa: "مرکزِ تقاطع" },
        { it: "contromano", fa: "خلافِ جهت" },
      ],
    },
    {
      kind: "trap",
      title: "«نمی‌شود رویش رفت»: درباره‌ی کدام؟",
      body: "دو جمله‌ی بانک هر دو می‌گویند از چیزی نمی‌شود رد شد. یکی درباره‌ی جزیره است و یکی درباره‌ی خطِ راهنما:",
      examples: [
        {
          sourceId: "2446",
          figure: 595,
          textIt: "L'isola di traffico in figura indica una parte della strada su cui non si può circolare",
          answer: 1,
          chunks: [
            { it: ISOLA, fa: ISOLA_FA },
            { it: "indica una parte della strada", fa: "بخشی از جاده را نشان می‌دهد", verb: "indica ← indicare" },
            { it: "su cui non si può circolare", fa: "که رویش نمی‌شود رفت‌وآمد کرد", verb: "si può ← potere", focus: "negation" },
          ],
          translation: "جزیره‌ی ترافیکیِ تصویر بخشی از جاده را نشان می‌دهد که رویش نمی‌شود رفت‌وآمد کرد.",
          why: "درست است. جزیره طبقِ تعریف قابلِ عبور نیست.",
        },
        {
          sourceId: "2429",
          figure: 543,
          textIt: "Le strisce di guida in figura non possono essere superate dai veicoli che proseguono diritto",
          answer: 0,
          chunks: [
            { it: GUIDA, fa: GUIDA_FA },
            { it: "non possono essere superate", fa: "نمی‌شود از آن‌ها عبور کرد", verb: "possono ← potere", focus: "negation" },
            { it: "dai veicoli che proseguono diritto", fa: "برای خودروهایی که مستقیم می‌روند", verb: "proseguono ← proseguire" },
          ],
          translation: "از خط‌های راهنمای تصویر، خودروهایی که مستقیم می‌روند نمی‌توانند عبور کنند.",
          why: "غلط است. خطِ راهنما خط‌چین است؛ خودرویی که مستقیم می‌رود از رویش رد می‌شود.",
        },
      ],
      takeaway: "قاب و خط‌های اریب = جزیره، عبور ممنوع. خط‌چینِ منحنی = راهنما، عبور آزاد.",
      rule: "Codice della Strada art. 3 c.1 n.27; art. 40 c.8; DPR 495/1992 art. 143",
    },
  ],
  practice: [
    {
      sourceId: "2451",
      figure: 595,
      textIt: "L'isola di traffico in figura indica una zona dove è possibile la sosta dei veicoli",
      answer: 0,
      chunks: [
        { it: ISOLA, fa: ISOLA_FA },
        { it: "indica una zona", fa: "جایی را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "dove è possibile la sosta dei veicoli", fa: "که پارکِ خودروها در آن ممکن است", focus: "contrast" },
      ],
      translation: "جزیره‌ی ترافیکیِ تصویر جایی را نشان می‌دهد که پارکِ خودروها در آن ممکن است.",
      why: "غلط است (قدم ۱). روی جزیره نه می‌شود راند و نه پارک کرد.",
      rule: "DPR 495/1992 art. 150 c.4",
      conceptStep: 1,
    },
    {
      sourceId: "2448",
      figure: 595,
      textIt: "In presenza dell'isola di traffico rappresentata in figura il veicolo B deve svoltare a destra",
      answer: 1,
      chunks: [
        { it: "In presenza dell'isola di traffico rappresentata in figura", fa: "با جزیره‌ی ترافیکیِ تصویر" },
        { it: "il veicolo B", fa: "خودروی B" },
        { it: "deve svoltare a destra", fa: "باید به راست بپیچد", verb: "deve ← dovere" },
      ],
      translation: "با جزیره‌ی ترافیکیِ تصویر، خودروی B باید به راست بپیچد.",
      why: "درست است (قدم ۲). جزیره راهِ چپ را برای B بسته است.",
      rule: "Codice della Strada art. 3 c.1 n.27",
      conceptStep: 2,
    },
    {
      sourceId: "2494",
      figure: 596,
      textIt: "In presenza delle strisce di guida in figura il veicolo B può svoltare a sinistra, dando però la precedenza al veicolo A",
      answer: 1,
      chunks: [
        { it: "In presenza delle strisce di guida in figura", fa: "با خط‌های راهنمای تصویر" },
        { it: "il veicolo B può svoltare a sinistra,", fa: "خودروی B می‌تواند به چپ بپیچد،", verb: "può ← potere" },
        { it: "dando però la precedenza al veicolo A", fa: "ولی با دادنِ حق تقدم به خودروی A", verb: "dando ← dare", focus: "condition" },
      ],
      translation: "با خط‌های راهنمای تصویر، خودروی B می‌تواند به چپ بپیچد، ولی به خودروی A حق تقدم می‌دهد.",
      why: "درست است (قدم ۲). خطِ راهنما چیزی را نمی‌بندد. B از جاده‌ی فرعی می‌آید و پیش از پیچیدن به A راه می‌دهد.",
      rule: "Codice della Strada art. 40 c.8; DPR 495/1992 art. 143",
      conceptStep: 2,
    },
    {
      sourceId: "2426",
      figure: 543,
      textIt: "Le strisce di guida in figura debbono essere lasciate alla sinistra del veicolo quando si svolta a sinistra",
      answer: 1,
      chunks: [
        { it: GUIDA, fa: GUIDA_FA },
        { it: "debbono essere lasciate alla sinistra del veicolo", fa: "باید سمتِ چپِ خودرو بمانند", verb: "debbono ← dovere" },
        { it: "quando si svolta a sinistra", fa: "وقتی به چپ می‌پیچی", verb: "si svolta ← svoltare", focus: "condition" },
      ],
      translation: "خط‌های راهنمای تصویر، وقتی به چپ می‌پیچی، باید سمتِ چپِ خودرو بمانند.",
      why: "درست است (قدم ۳). خط مسیرِ چپ‌گرد را می‌کشد؛ آن را سمتِ چپت نگه می‌داری تا واردِ نیمه‌ی خلافِ جهت نشوی.",
      rule: "Codice della Strada art. 154 c.3 lett. b; DPR 495/1992 art. 143 c.1",
      conceptStep: 3,
    },
    {
      sourceId: "2617",
      figure: 506,
      textIt: "Le strisce bianche discontinue sull'intersezione in figura sono strisce di guida",
      answer: 1,
      chunks: [
        { it: "Le strisce bianche discontinue sull'intersezione in figura", fa: "خط‌چین‌های سفیدِ روی تقاطعِ تصویر" },
        { it: "sono strisce di guida", fa: "خط‌های راهنما هستند" },
      ],
      translation: "خط‌چین‌های سفیدِ روی تقاطعِ تصویر خط‌های راهنما هستند.",
      why: "درست است (قدم ۳). خط‌چین‌های منحنیِ داخلِ تقاطع مسیر را نشان می‌دهند؛ همین یعنی خطِ راهنما.",
      rule: "DPR 495/1992 art. 143 c.1",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2444", "2445", "2446", "2451", "2452"] },
    { step: 2, sourceIds: ["2447", "2448", "2449", "2453", "2454", "2455", "2493", "2494", "2495", "2496", "2497", "2498"] },
    { step: 3, sourceIds: ["2424", "2425", "2426", "2427", "2428", "2429", "2430", "2617", "2624"] },
  ],
};

// ── Lesson 7 ──────────────────────────────────────────────────────────────────

export const lessonTrasversali: Lesson = {
  id: "strisce-trasversali-arresto",
  titleFa: "خطِ عرضی: کجا بایستی؟",
  titleIt: "STRISCIA DI ARRESTO · TRASVERSALE",
  minutes: 4,
  signs: [],
  figures: [509, 563, 568, 515],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی خطِ سفیدِ عرضیِ ممتد کجا جای ایستادن است (چراغ قرمز، STOP، مأمور)، فرقش با ردیفِ مثلث‌های DARE PRECEDENZA چیست، و چرا «همیشه بایست» درباره‌اش غلط است.",
      why:
        "خطِ ایست خودش دستورِ ایستادن نمی‌دهد؛ فقط می‌گوید اگر باید بایستی، کجا. دستور را چراغ، تابلو یا مأمور می‌دهد. بیشترِ جمله‌های غلطِ بانک این دو را قاطی می‌کنند.",
    },
    {
      kind: "table",
      title: "دو خطِ عرضی",
      body: "خطِ عرضی از لبه‌ی سواره‌رو تا خطِ وسط کشیده می‌شود. دو شکل دارد، هر کدام با یک دستورِ دیگر.",
      columns: ["ممتد · continua", "مثلث‌ها · discontinua"],
      rows: [
        {
          label: "با چه می‌آید",
          values: [
            "چراغِ راهنمایی، تابلوی STOP، گذرگاهِ عابرِ چراغ‌دار، گذرگاهِ راه‌آهن، یا جایی که مأمور می‌ایستاند. تقاطعی که هیچ کدامِ این‌ها را ندارد خطِ ایستِ ممتد نمی‌خواهد",
            "تابلوی DARE PRECEDENZA",
          ],
        },
        { label: "چه می‌گوید", values: ["اگر باید بایستی، جلوی همین خط بایست", "فقط اگر برای راه دادن لازم است، اینجا بایست"] },
        {
          label: "نوشته روی آسفالت",
          values: ["با تابلوی STOP، کلمه‌ی STOP هم روی آسفالت نوشته می‌شود", "با DARE می‌تواند یک مثلث نقاشی شود؛ کلمه‌ی STOP نه"],
        },
        { label: "شکل", values: ["نوارِ سفیدِ پهن، دست‌کم ۵۰ سانتی‌متر", "مثلث‌های سفید با نوکِ رو به راننده"] },
        {
          label: "چه نیست",
          values: [
            "گذرگاهِ عابر یا دوچرخه، شروعِ پارک ممنوع، خروجیِ ملکِ خصوصی. خطِ ایست عرضی است؛ خطِ ممتدِ دوتاییِ وسطِ جاده جای ایستادن نیست",
            "خطِ ایستِ STOP",
          ],
        },
      ],
      takeaway: "ممتد = چراغ، STOP یا مأمور. مثلث‌ها = DARE PRECEDENZA. با DARE هرگز خطِ ممتد یا کلمه‌ی STOP نمی‌آید.",
      rule: "Codice della Strada art. 40 c.5–6; DPR 495/1992 art. 144 c.1, c.4; art. 148 c.8–9",
    },
    {
      kind: "classify",
      title: "جلوی خطِ ممتد بایستی؟",
      body: "پنج موقعیتِ ساختگی، همه با خطِ ایستِ ممتد. خط فقط «کجا» را می‌گوید؛ «آیا» را چراغ، تابلو یا مأمور می‌گوید. به چه کسی راه بدهی هم با تابلو یا چراغ است، نه با خود خط.",
      options: [
        { it: "arrestarsi", fa: "بله، جلوی خط بایست" },
        { it: "proseguire", fa: "نه؛ اگر راه باز است برو" },
      ],
      items: [
        { prompt: "تقاطعِ چراغ‌دار؛ چراغ قرمز است.", answer: 0, explain: "چراغ قرمز یعنی ایست، و جای ایستادن جلوی همین خط است." },
        { prompt: "تقاطعِ چراغ‌دار؛ چراغ سبز است و تقاطع خالی.", answer: 1, explain: "با چراغ سبز از روی خط رد می‌شوی؛ خطِ ایست «هرگز رد نشو» نیست." },
        { prompt: "تابلوی STOP؛ هیچ خودرویی نمی‌آید.", answer: 0, explain: "پشتِ STOP همیشه کامل می‌ایستی، حتی وقتی کسی نمی‌آید (فصل ۵)." },
        { prompt: "چراغ سبز است، ولی مأمور با دست به تو علامتِ ایست می‌دهد.", answer: 0, explain: "دستورِ مأمور از چراغ مقدم‌تر است. جلوی خط بایست." },
        { prompt: "چراغ زردِ چشمک‌زن است و تابلوی STOP هم هست.", answer: 0, explain: "زردِ چشمک‌زن یعنی تابلو تصمیم می‌گیرد؛ تابلو STOP است، پس می‌ایستی." },
      ],
      takeaway: "اول ببین چه کسی دستور می‌دهد: مأمور، بعد چراغی که کار می‌کند، بعد تابلو. خط فقط جای ایستادن است.",
      rule: "Codice della Strada art. 38 c.2; art. 40 c.5; art. 41; DPR 495/1992 art. 105 c.6",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la striscia trasversale", fa: "خطِ عرضی" },
        { it: "la striscia di arresto", fa: "خطِ ایست" },
        { it: "arrestarsi", fa: "ایستادن" },
        { it: "il semaforo a luce rossa", fa: "چراغِ قرمز" },
        { it: "il vigile", fa: "مأمورِ راهنمایی" },
        { it: "impone", base: "imporre", fa: "دستور می‌دهد؛ تحمیل می‌کند" },
        { it: "abbinata", base: "abbinare", fa: "همراه؛ جفت‌شده" },
        { it: "regolato", base: "regolare", fa: "کنترل‌شده (با چراغ، تابلو یا مأمور)" },
      ],
    },
    {
      kind: "trap",
      title: "«sempre» کنارِ خطِ ایست",
      body: "هر دو جمله‌ی بانک «همیشه» دارند. فرق در شرطی است که بعدش آمده:",
      examples: [
        {
          sourceId: "2645",
          figure: 568,
          textIt: "La striscia trasversale continua in figura indica il punto in cui dobbiamo sempre arrestarci ad un incrocio, se il vigile lo impone",
          answer: 1,
          chunks: [
            { it: TRASVERSALE_CONTINUA, fa: TRASVERSALE_CONTINUA_FA },
            { it: "indica il punto in cui dobbiamo sempre arrestarci ad un incrocio,", fa: "جایی را نشان می‌دهد که در تقاطع همیشه باید بایستیم،", verb: "dobbiamo ← dovere", focus: "always" },
            { it: "se il vigile lo impone", fa: "اگر مأمور دستور بدهد", verb: "impone ← imporre", focus: "condition" },
          ],
          translation: "خطِ عرضیِ ممتدِ تصویر جایی را نشان می‌دهد که در تقاطع، اگر مأمور دستور بدهد، همیشه باید بایستیم.",
          why: "درست است. «همیشه» اینجا به یک دستور بسته شده: هر بار مأمور بگوید، جلوی همین خط می‌ایستی.",
        },
        {
          sourceId: "2648",
          figure: 563,
          textIt: "La striscia trasversale continua in figura indica il punto in cui bisogna sempre arrestarsi in vicinanza di un incrocio stradale",
          answer: 0,
          chunks: [
            { it: TRASVERSALE_CONTINUA, fa: TRASVERSALE_CONTINUA_FA },
            { it: "indica il punto in cui bisogna sempre arrestarsi", fa: "جایی را نشان می‌دهد که همیشه باید ایستاد", verb: "bisogna ← bisognare", focus: "always" },
            { it: "in vicinanza di un incrocio stradale", fa: "نزدیکِ یک تقاطع" },
          ],
          translation: "خطِ عرضیِ ممتدِ تصویر جایی را نشان می‌دهد که نزدیکِ یک تقاطع همیشه باید ایستاد.",
          why: "غلط است. بدونِ دستور (چراغ قرمز، STOP، مأمور) خط به‌تنهایی «همیشه بایست» نمی‌گوید؛ با چراغ سبز از رویش رد می‌شوی.",
        },
      ],
      takeaway: "«sempre» فقط وقتی درست است که به یک دستور بسته شده باشد.",
      rule: "Codice della Strada art. 40 c.5",
    },
  ],
  practice: [
    {
      sourceId: "2574",
      figure: 563,
      textIt: "La striscia bianca trasversale in figura viene abbinata con il segnale di DARE PRECEDENZA",
      answer: 0,
      chunks: [
        { it: TRASVERSALE, fa: TRASVERSALE_FA },
        { it: "viene abbinata", fa: "همراه می‌آید", verb: "viene abbinata ← abbinare" },
        { it: "con il segnale di DARE PRECEDENZA", fa: "با تابلوی DARE PRECEDENZA", focus: "contrast" },
      ],
      translation: "خطِ سفیدِ عرضیِ تصویر همراهِ تابلوی DARE PRECEDENZA می‌آید.",
      why: "غلط است (قدم ۱). خطِ ممتد با چراغ یا STOP می‌آید. با DARE PRECEDENZA ردیفِ مثلث‌ها کشیده می‌شود.",
      rule: "DPR 495/1992 art. 144 c.1, c.4",
      conceptStep: 1,
    },
    {
      sourceId: "2532",
      textIt: "E' regolamentare trovare sulla pavimentazione la scritta STOP, a completamento del relativo segnale verticale",
      answer: 1,
      chunks: [
        { it: "E' regolamentare", fa: "طبقِ مقررات است" },
        { it: "trovare sulla pavimentazione", fa: "که روی آسفالت ببینی" },
        { it: "la scritta STOP,", fa: "کلمه‌ی STOP را،" },
        { it: "a completamento del relativo segnale verticale", fa: "برای کامل کردنِ تابلوی ایستاده‌ی همان دستور", focus: "reason" },
      ],
      translation: "طبقِ مقررات است که روی آسفالت کلمه‌ی STOP را ببینی، برای کامل کردنِ تابلوی ایستاده‌ی همان دستور.",
      why: "درست است (قدم ۱). جایی که تابلوی STOP هست، کلمه‌ی STOP هم روی آسفالت، پیش از خطِ ایست، نوشته می‌شود.",
      rule: "DPR 495/1992 art. 148 c.8",
      conceptStep: 1,
    },
    {
      sourceId: "2647",
      figure: 563,
      textIt: "La striscia trasversale continua in figura indica il punto in cui dobbiamo arrestarci ad un incrocio, se non è regolato",
      answer: 0,
      chunks: [
        { it: TRASVERSALE_CONTINUA, fa: TRASVERSALE_CONTINUA_FA },
        { it: "indica il punto in cui dobbiamo arrestarci ad un incrocio,", fa: "جایی را نشان می‌دهد که در تقاطع باید بایستیم،", verb: "dobbiamo ← dovere" },
        { it: "se non è regolato", fa: "اگر تقاطع کنترل‌نشده باشد", focus: "condition" },
      ],
      translation: "خطِ عرضیِ ممتدِ تصویر جایی را نشان می‌دهد که در تقاطع، اگر کنترل‌نشده باشد، باید بایستیم.",
      why: "غلط است (قدم ۱). برعکس: خطِ ایستِ ممتد مالِ تقاطعِ کنترل‌شده است (چراغ، STOP، مأمور).",
      rule: "Codice della Strada art. 40 c.5; DPR 495/1992 art. 144 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2572",
      figure: 563,
      textIt: "La striscia bianca trasversale in figura indica il punto in cui i conducenti devono arrestarsi in presenza del semaforo a luce rossa",
      answer: 1,
      chunks: [
        { it: TRASVERSALE, fa: TRASVERSALE_FA },
        { it: "indica il punto in cui i conducenti devono arrestarsi", fa: "جایی را نشان می‌دهد که راننده‌ها باید بایستند", verb: "devono ← dovere" },
        { it: "in presenza del semaforo a luce rossa", fa: "وقتی چراغ قرمز است", focus: "condition" },
      ],
      translation: "خطِ سفیدِ عرضیِ تصویر جایی را نشان می‌دهد که راننده‌ها، وقتی چراغ قرمز است، باید بایستند.",
      why: "درست است (قدم ۲). چراغ قرمز دستور می‌دهد، خط جای ایستادن را.",
      rule: "Codice della Strada art. 40 c.5",
      conceptStep: 2,
    },
    {
      sourceId: "2577",
      figure: 563,
      textIt: "La striscia bianca trasversale in figura non può mai essere superata",
      answer: 0,
      chunks: [
        { it: TRASVERSALE, fa: TRASVERSALE_FA },
        { it: "non può mai essere superata", fa: "هرگز نمی‌شود از آن عبور کرد", verb: "può ← potere", focus: "always" },
      ],
      translation: "از خطِ سفیدِ عرضیِ تصویر هرگز نمی‌شود عبور کرد.",
      why: "غلط است (قدم ۲). وقتی چراغ سبز است، یا پس از ایستادن پشتِ STOP راه باز است، از رویش رد می‌شوی.",
      rule: "Codice della Strada art. 40 c.5",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2421", "2532", "2536", "2569", "2570", "2573", "2574", "2575", "2576", "2578", "2647", "2650"] },
    { step: 2, sourceIds: ["2571", "2572", "2577", "2644", "2645", "2646", "2648", "2649"] },
  ],
};
