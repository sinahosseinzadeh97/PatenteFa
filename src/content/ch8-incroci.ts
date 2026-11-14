/**
 * src/content/ch8-incroci.ts
 * Chapter 8 (Segnali di indicazione), lessons 4–5: junction advance signs
 * (preavviso di intersezione: plain, close junctions, roundabout, signs on a
 * branch) and lane preselection / junction splits.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter8.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const SIGN = "Il segnale raffigurato";
const SIGN_FA = "تابلوی تصویر";

// ── Lesson 4 ──────────────────────────────────────────────────────────────────

export const lessonPreavvisiIntersezione: Lesson = {
  id: "preavvisi-intersezione",
  titleFa: "پیش‌آگهیِ تقاطع: نقشه‌ی کوچکِ جلوی تو",
  titleIt: "PREAVVISO DI INTERSEZIONE",
  minutes: 5,
  signs: [166, 170, 167, 168, 169],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس یک پیش‌آگهیِ تقاطع را مثلِ نقشه می‌خوانی: هر فلش یک شاخه‌ی تقاطع است و کنارِ آن مقصدها. دو تقاطعِ نزدیک و میدان را در یک تابلو تشخیص می‌دهی، و می‌دانی تابلوی کوچکِ منع یا خطر روی یک فلش فقط برای همان شاخه است.",
      why: "۵۱ سؤال. بانک می‌پرسد از کدام شاخه به کجا می‌روی، در کدام تقاطع (اول یا دوم) می‌پیچی، و تابلوی کوچکِ روی فلش برای چه کسی است.",
    },
    {
      kind: "table",
      title: "تابلو را مثلِ نقشه بخوان",
      body: "پیش‌آگهی پیش از تقاطع می‌آید و شکلِ تقاطع را می‌کشد. فلشِ پایین جایی است که تو هستی.",
      columns: ["قاعده"],
      rows: [
        { label: "فلش‌ها", it: "lo schema dell'intersezione", sign: 166, values: ["هر فلش یک شاخه است: مستقیم برای سورا و ناپل؛ راست برای «centro» و «stazione»."] },
        { label: "کِی", it: "prima dell'intersezione", values: ["همیشه پیش از تقاطع. «بعد از تقاطع» غلط است."] },
        { label: "رنگ", it: "bianco · blu", sign: 170, values: ["زمینه‌ی سفید = تقاطعِ داخلِ شهر؛ آبی = تقاطعِ برون‌شهری. قابِ آبی یا سبزِ داخلِ تابلوی سفید فقط نوعِ جاده‌ی آن مقصد است."] },
        { label: "قابِ قهوه‌ای", it: "località turistica", values: ["مقصدِ گردشگری (مثلاً nuraghe Speranza). نه ساحل، نه منطقه‌ی مسکونی."] },
        { label: "چه نمی‌گوید", it: "non vieta, non obbliga", values: ["نمی‌گوید برای رسیدن به مرکز «برگرد»، از شهر «بیرون برو» یا فلان مقصد «در دسترس نیست». فقط مسیر را نشان می‌دهد."] },
      ],
      takeaway: "پیش‌آگهی = نقشه‌ی تقاطعِ پیشِ رو. هر فلش یک شاخه، کنارش مقصدها.",
      rule: "DPR 495/1992 art. 124 c.6; art. 127 c.1–3; art. 78 c.2",
    },
    {
      kind: "table",
      title: "دو تقاطعِ نزدیک و میدان",
      body: "وقتی دو تقاطع کمتر از ۲۵۰ متر فاصله دارند، هر دو در یک تابلو می‌آیند. میدان (rotatoria) هم با دایره‌اش کشیده می‌شود.",
      columns: ["قاعده"],
      rows: [
        { label: "دو تقاطع", it: "incroci ravvicinati", sign: 167, values: ["پایین = تقاطعِ اول؛ بالا = تقاطعِ دوم. در اولی: راست به via Gemona؛ چپ ممنوع (تابلوی ورودِ ممنوع روی فلش). در دومی: چپ به بیمارستان و اتریش، راست به مرکز و تریسته."] },
        { label: "ورود ممنوع روی فلش", it: "senso vietato", values: ["دایره‌ی قرمز با خطِ سفید روی فلشِ چپِ تقاطعِ اول: آن شاخه برای تو ورود ممنوع است. پس در تقاطعِ اول نمی‌شود به چپ پیچید."] },
        { label: "میدان", it: "circolazione rotatoria", sign: 168, values: ["دایره‌ی وسط = میدان؛ هر فلش یک خروجی. خروجیِ اول راست به فورلی؛ دومی مستقیم به کمربندی (tangenziale) و آزادراه."] },
        { label: "چه نیست", it: "non vale solo di notte", values: ["همیشه معتبر است؛ نه «فقط شب». جاده‌ی بسته، منطقه‌ی عابر یا منعِ عبور هم نیست."] },
      ],
      takeaway: "در تابلوی دو تقاطع، اول پایین را بخوان، بعد بالا را. در میدان، خروجی‌ها را به ترتیب بشمار.",
      rule: "DPR 495/1992 art. 127 c.2, c.4, c.7",
    },
    {
      kind: "table",
      title: "تابلوی کوچکِ روی یک فلش",
      body: "تابلوهای منع، اجبار یا خطری که روی آن شاخه هستند، کوچک روی فلشِ همان شاخه کشیده می‌شوند. فقط برای همان شاخه‌اند و فقط برای کسانی که آن تابلو می‌گوید.",
      columns: ["یعنی"],
      rows: [
        { label: "کامیون ممنوع روی مستقیم", it: "transito vietato agli autocarri", sign: 169, values: ["کامیونِ بالای ۳٫۵ تن (وزنِ با بارِ کامل) نمی‌تواند مستقیم به آوتزانو و مرکز برود. سواری می‌تواند به پسکارا برود. اتوبوس کامیون نیست."] },
        { label: "چپ: آزادراه", it: "A24 Roma – L'Aquila", values: ["قابِ سبز: برای آزادراهِ رم–لاکوئیلا به چپ بپیچ. مستقیم برای پسکارا، آوتزانو و مرکز است."] },
        { label: "مثلثِ قطار روی راست", it: "passaggio a livello", sign: 170, values: ["اگر به راست به سن جووانی بپیچی، به گذرگاهِ راه‌آهنِ بی‌راهبند می‌رسی (فصل ۲). خطرش فقط برای همان شاخه است."] },
      ],
      takeaway: "تابلوی کوچکِ روی فلش = قاعده‌ی همان شاخه. نه کلِ تقاطع، نه همه‌ی وسایلِ نقلیه.",
      rule: "DPR 495/1992 art. 127 c.7; art. 117",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il preavviso di intersezione", fa: "پیش‌آگهیِ تقاطع" },
        { it: "preavvisa · preannuncia", base: "preavvisare · preannunciare", fa: "از قبل خبر می‌دهد" },
        { it: "l'incrocio", fa: "تقاطع" },
        { it: "la traversa", fa: "خیابانِ فرعیِ عرضی؛ خروجی" },
        { it: "proseguire diritto", base: "proseguire", fa: "مستقیم ادامه دادن" },
        { it: "svoltare a destra · a sinistra", base: "svoltare", fa: "به راست · به چپ پیچیدن" },
        { it: "la circolazione rotatoria", fa: "میدان (گردشِ دورِ میدان)" },
      ],
    },
    {
      kind: "trap",
      title: "چپ، ولی در کدام تقاطع؟",
      body: "دو جمله درباره‌ی پیچیدن به چپ در تابلوی دو تقاطعِ نزدیک:",
      examples: [
        {
          sourceId: "3049",
          sign: 167,
          textIt: "Il segnale raffigurato preavvisa di svoltare a sinistra per l'ospedale al secondo incrocio",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "preavvisa di svoltare a sinistra", fa: "از قبل خبر می‌دهد که به چپ بپیچی", verb: "preavvisa ← preavvisare" },
            { it: "per l'ospedale", fa: "برای بیمارستان" },
            { it: "al secondo incrocio", fa: "در تقاطعِ دوم", focus: "condition" },
          ],
          translation: "تابلوی تصویر از قبل خبر می‌دهد که برای بیمارستان در تقاطعِ دوم به چپ بپیچی.",
          why: "درست است. فلشِ بالا (تقاطعِ دوم) به چپ، کنارِ نشانِ بیمارستان.",
        },
        {
          sourceId: "3058",
          sign: 167,
          textIt: "Il segnale raffigurato consente di svoltare a sinistra al primo incrocio",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "consente di svoltare a sinistra", fa: "اجازه می‌دهد به چپ بپیچی", verb: "consente ← consentire" },
            { it: "al primo incrocio", fa: "در تقاطعِ اول", focus: "contrast" },
          ],
          translation: "تابلوی تصویر اجازه می‌دهد در تقاطعِ اول به چپ بپیچی.",
          why: "غلط است. روی فلشِ چپِ تقاطعِ اول تابلوی ورودِ ممنوع است.",
        },
      ],
      takeaway: "در تابلوی دو تقاطع، «اول» و «دوم» را با پایین و بالا مقایسه کن.",
      rule: "DPR 495/1992 art. 127 c.4, c.7",
    },
  ],
  practice: [
    {
      sourceId: "3043",
      sign: 166,
      textIt: "Il segnale raffigurato indica di svoltare a destra per uscire dal centro abitato",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica di svoltare a destra", fa: "نشان می‌دهد که به راست بپیچی", verb: "indica ← indicare" },
        { it: "per uscire dal centro abitato", fa: "برای بیرون رفتن از شهر", focus: "contrast" },
      ],
      translation: "تابلوی تصویر نشان می‌دهد که برای بیرون رفتن از شهر به راست بپیچی.",
      why: "غلط است (قدم ۱). راست به مرکزِ شهر (نشانِ دایره‌های تودرتو) و ایستگاه می‌رود، نه بیرون از شهر.",
      rule: "DPR 495/1992 art. 127 c.2",
      conceptStep: 1,
    },
    {
      sourceId: "3087",
      sign: 170,
      textIt: "Il segnale raffigurato si trova dopo un incrocio",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "si trova", fa: "قرار دارد", verb: "si trova ← trovarsi" },
        { it: "dopo un incrocio", fa: "بعد از یک تقاطع", focus: "contrast" },
      ],
      translation: "تابلوی تصویر بعد از یک تقاطع قرار دارد.",
      why: "غلط است (قدم ۱). پیش‌آگهی همیشه پیش از تقاطع است.",
      rule: "DPR 495/1992 art. 124 c.6 lett. a",
      conceptStep: 1,
    },
    {
      sourceId: "3063",
      sign: 168,
      textIt: "Il segnale raffigurato preavvisa di svoltare alla seconda traversa per raggiungere la tangenziale",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "preavvisa di svoltare alla seconda traversa", fa: "از قبل خبر می‌دهد که در خروجیِ دوم بپیچی", verb: "preavvisa ← preavvisare" },
        { it: "per raggiungere la tangenziale", fa: "برای رسیدن به کمربندی" },
      ],
      translation: "تابلوی تصویر از قبل خبر می‌دهد که برای رسیدن به کمربندی در خروجیِ دوم بپیچی.",
      why: "درست است (قدم ۲). در میدان، خروجیِ اول راست است و دومی مستقیم، به سمتِ tangenziale.",
      rule: "DPR 495/1992 art. 127 c.2",
      conceptStep: 2,
    },
    {
      sourceId: "3076",
      sign: 169,
      textIt: "Il segnale raffigurato vieta anche agli autobus di raggiungere Avezzano",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "vieta", fa: "ممنوع می‌کند", verb: "vieta ← vietare" },
        { it: "anche agli autobus", fa: "حتی برای اتوبوس‌ها", focus: "contrast" },
        { it: "di raggiungere Avezzano", fa: "رسیدن به آوتزانو را" },
      ],
      translation: "تابلوی تصویر رسیدن به آوتزانو را حتی برای اتوبوس‌ها ممنوع می‌کند.",
      why: "غلط است (قدم ۳). تابلوی کوچک فقط کامیونِ بالای ۳٫۵ تن را منع می‌کند. اتوبوس کامیون نیست.",
      rule: "DPR 495/1992 art. 127 c.7",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["3036", "3037", "3038", "3039", "3040", "3041", "3043", "3044", "3045", "3046", "3081", "3083", "3084", "3085", "3087", "3088", "3090", "3091"] },
    {
      step: 2,
      sourceIds: [
        "3047", "3048", "3049", "3050", "3051", "3052", "3053", "3054", "3056", "3057", "3058", "3059", "3060",
        "3061", "3062", "3063", "3064", "3065", "3066", "3067", "3068", "3070",
      ],
    },
    { step: 3, sourceIds: ["3071", "3072", "3073", "3074", "3075", "3076", "3077", "3078", "3079", "3082", "3086"] },
  ],
};

// ── Lesson 5 ──────────────────────────────────────────────────────────────────

export const lessonPreselezioneDiramazione: Lesson = {
  id: "preselezione-diramazione",
  titleFa: "خطت را زود انتخاب کن: پیش‌انتخاب و دوشاخه",
  titleIt: "PRESELEZIONE · DIRAMAZIONE",
  minutes: 5,
  signs: [171, 172, 173, 174],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس تابلوی پیش‌انتخاب را می‌خوانی (هر ستون یک خط و مقصدش) و می‌دانی کجا نصب می‌شود: جایی که هنوز می‌شود خط عوض کرد. تابلوی دوشاخه را هم می‌شناسی: دو مقصد، یکی مستقیم و یکی با پیچیدن.",
      why: "۳۹ سؤال. بانک می‌پرسد برای هر مقصد کدام خط، آیا هنوز می‌شود خط عوض کرد، و فرقِ «توصیه‌ی مسیر» با «اجبار».",
    },
    {
      kind: "table",
      title: "پیش‌انتخاب: هر ستون یک خط",
      body: "وقتی جاده در یک جهت دو خط یا بیشتر دارد و هر خط به مقصدِ دیگری می‌رود، پیش‌انتخاب جای پیش‌آگهی را می‌گیرد. خط‌چین‌های تابلو خطوطِ جاده‌اند.",
      columns: ["قاعده"],
      rows: [
        { label: "برون‌شهری · آبی", it: "preselezione extraurbana", sign: 171, values: ["دو خط: باری = خطِ چپ (و بعد به چپ)، پسکارا = خطِ راست (مستقیم)."] },
        { label: "شهری · سفید", it: "preselezione urbana", sign: 172, values: ["سه خط: ترنی = چپ؛ مقصدِ گردشگریِ Terminillo و Salaria = وسط؛ مرکزِ شهر = راست."] },
        { label: "کجا", it: "ancora possibile cambiare corsia", values: ["پیش از جایی که خطوط پیوسته می‌شوند؛ هنوز می‌توانی با احتیاط به خطِ درست بروی. بعد از خطوطِ پیوسته دیگر نمی‌شود."] },
        { label: "چه نیست", it: "non obbliga a sorpassare", values: ["نه اجبار به سبقت از راست، نه دور زدن، نه جاده‌ی بسته، نه فاصله تا شهر. فقط خط و مقصد."] },
      ],
      takeaway: "پیش‌انتخاب = کدام خط به کدام مقصد. جایی است که هنوز وقتِ انتخاب داری.",
      rule: "DPR 495/1992 art. 127 c.1, c.8–10",
    },
    {
      kind: "table",
      title: "دوشاخه: دو مقصد",
      body: "تابلوی دوشاخه دو مقصد را نشان می‌دهد: یکی با ادامه‌ی مستقیم، یکی با پیچیدن. رنگ می‌گوید روی چه جاده‌ای هستی.",
      columns: ["یعنی"],
      rows: [
        { label: "آزادراه · سبز", it: "diramazione autostradale", sign: 173, values: ["خروجیِ آزادراه: برای بولونیا (A1) مستقیم؛ برای فرودگاهِ لیناته به چپ. نه منعِ چپ، نه اجبار به عوض کردنِ خط."] },
        { label: "شهری · سفید", it: "diramazione urbana", sign: 174, values: ["تقاطعِ شهری: برای میلان مستقیم؛ برای مرکز به راست. نه «فقط یک‌طرفه»، نه پایانِ دوطرفه."] },
        { label: "چه نمی‌گوید", it: "non indica distanze", values: ["فاصله نمی‌نویسد («یک کیلومتر تا بولونیا» غلط است). نشانِ هواپیما فرودگاه است، نه پارکِ بازی؛ تابلو هم در ورودیِ فرودگاه نیست."] },
      ],
      takeaway: "دوشاخه = دو مقصد، دو مسیر. رنگ: سبز آزادراه، سفید شهر.",
      rule: "DPR 495/1992 art. 127 c.2, c.12; art. 78 c.2",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la preselezione", fa: "پیش‌انتخابِ خط" },
        { it: "la corsia di canalizzazione", fa: "خطِ هدایت (خطی که به یک جهت می‌برد)" },
        { it: "spostarsi sulla corsia di sinistra", base: "spostarsi", fa: "به خطِ چپ رفتن" },
        { it: "immettersi", fa: "وارد شدن (به یک خط یا جاده)" },
        { it: "cambiare corsia", base: "cambiare", fa: "خط عوض کردن" },
        { it: "la diramazione · lo svincolo", fa: "دوشاخه · خروجی/تقاطعِ غیرهمسطح" },
      ],
    },
    {
      kind: "trap",
      title: "هنوز می‌شود خط عوض کرد؟",
      body: "دو جمله درباره‌ی عوض کردنِ خط پشتِ تابلوی پیش‌انتخاب:",
      examples: [
        {
          sourceId: "3096",
          sign: 171,
          textIt: "Il segnale raffigurato è posto dove è ancora possibile cambiare la corsia di canalizzazione",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "è posto", fa: "نصب شده است", verb: "è posto ← porre" },
            { it: "dove è ancora possibile", fa: "جایی که هنوز ممکن است", focus: "condition" },
            { it: "cambiare la corsia di canalizzazione", fa: "خطِ هدایت را عوض کرد" },
          ],
          translation: "تابلوی تصویر جایی نصب شده است که هنوز می‌شود خطِ هدایت را عوض کرد.",
          why: "درست است. پیش‌انتخاب برای این است که خطت را به‌موقع انتخاب کنی.",
        },
        {
          sourceId: "3113",
          sign: 172,
          textIt: "Il segnale raffigurato indica che non è più possibile cambiare corsia",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "indica che", fa: "نشان می‌دهد که", verb: "indica ← indicare" },
            { it: "non è più possibile cambiare corsia", fa: "دیگر نمی‌شود خط عوض کرد", focus: "negation" },
          ],
          translation: "تابلوی تصویر نشان می‌دهد که دیگر نمی‌شود خط عوض کرد.",
          why: "غلط است. خط‌چین‌های تابلو یعنی هنوز می‌شود خط عوض کرد.",
        },
      ],
      takeaway: "خط‌چین روی تابلوی پیش‌انتخاب = هنوز وقتِ عوض کردنِ خط هست.",
      rule: "DPR 495/1992 art. 127 c.8–9",
    },
  ],
  practice: [
    {
      sourceId: "3094",
      sign: 171,
      textIt: "Il segnale raffigurato indica al conducente diretto a Bari di spostarsi sulla corsia di sinistra",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica al conducente diretto a Bari", fa: "به راننده‌ای که به باری می‌رود نشان می‌دهد", verb: "indica ← indicare" },
        { it: "di spostarsi sulla corsia di sinistra", fa: "که به خطِ چپ برود" },
      ],
      translation: "تابلوی تصویر به راننده‌ای که به باری می‌رود نشان می‌دهد که به خطِ چپ برود.",
      why: "درست است (قدم ۱). ستونِ چپِ تابلو باری است.",
      rule: "DPR 495/1992 art. 127 c.8–9",
      conceptStep: 1,
    },
    {
      sourceId: "3110",
      sign: 172,
      textIt: "Il segnale raffigurato indica che Terni si trova 500 metri dopo aver effettuato la svolta",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che Terni si trova", fa: "نشان می‌دهد که ترنی قرار دارد", verb: "si trova ← trovarsi" },
        { it: "500 metri dopo aver effettuato la svolta", fa: "۵۰۰ متر بعد از پیچیدن", focus: "contrast" },
      ],
      translation: "تابلوی تصویر نشان می‌دهد که ترنی ۵۰۰ متر بعد از پیچیدن قرار دارد.",
      why: "غلط است (قدم ۱). پیش‌انتخاب هیچ فاصله‌ای نمی‌نویسد؛ فقط خط و مقصد.",
      rule: "DPR 495/1992 art. 127 c.9",
      conceptStep: 1,
    },
    {
      sourceId: "3124",
      sign: 173,
      textIt: "Il segnale raffigurato preavvisa uno svincolo con svolta a sinistra per l'aeroporto di Linate",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "preavvisa uno svincolo", fa: "از قبل یک خروجی را خبر می‌دهد", verb: "preavvisa ← preavvisare" },
        { it: "con svolta a sinistra per l'aeroporto di Linate", fa: "با پیچیدن به چپ برای فرودگاهِ لیناته" },
      ],
      translation: "تابلوی تصویر از قبل یک خروجی با پیچیدن به چپ برای فرودگاهِ لیناته را خبر می‌دهد.",
      why: "درست است (قدم ۲). فلشِ چپ با نشانِ هواپیما و Linate.",
      rule: "DPR 495/1992 art. 127 c.2",
      conceptStep: 2,
    },
    {
      sourceId: "3130",
      sign: 173,
      textIt: "Il segnale raffigurato obbliga a cambiare corsia per raggiungere Bologna",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "obbliga a cambiare corsia", fa: "مجبور می‌کند خط عوض کنی", verb: "obbliga ← obbligare", focus: "always" },
        { it: "per raggiungere Bologna", fa: "برای رسیدن به بولونیا" },
      ],
      translation: "تابلوی تصویر مجبور می‌کند برای رسیدن به بولونیا خط عوض کنی.",
      why: "غلط است (قدم ۲). بولونیا مستقیم است؛ تابلوی اطلاعاتی هم اجبار نمی‌کند.",
      rule: "DPR 495/1992 art. 124 c.1; art. 127 c.2",
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        "3092", "3093", "3094", "3095", "3096", "3097", "3098", "3099", "3100", "3101", "3102",
        "3104", "3105", "3106", "3107", "3109", "3110", "3111", "3112", "3113",
      ],
    },
    {
      step: 2,
      sourceIds: [
        "3122", "3123", "3124", "3125", "3126", "3128", "3129", "3130", "3131", "3132",
        "3133", "3134", "3135", "3137", "3138", "3139", "3140", "3141", "3142",
      ],
    },
  ],
};
