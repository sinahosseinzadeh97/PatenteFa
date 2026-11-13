/**
 * src/content/ch8-strade.ts
 * Chapter 8 (Segnali di indicazione), lessons 1–3: what an indication sign is
 * and what its background colour says; road identification badges (E, A, SS,
 * SC) and what a number on a sign measures; confirmation, progressive-distance
 * and exit signs.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter8.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const SIGN = "Il segnale raffigurato";
const SIGN_FA = "تابلوی تصویر";

// ── Lesson 1 ──────────────────────────────────────────────────────────────────

export const lessonIndicazioneColori: Lesson = {
  id: "indicazione-colori",
  titleFa: "تابلوی اطلاعاتی و زبانِ رنگ‌ها",
  titleIt: "SEGNALI DI INDICAZIONE · COLORI DI FONDO",
  minutes: 5,
  signs: [184, 201, 166, 216, 260, 230, 245, 240, 206, 225, 169, 170, 167, 168, 172, 173, 174, 182, 218, 239, 242, 243, 247, 248],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی تابلوی «اطلاعاتی» (segnale di indicazione) چه فرقی با تابلوهای خطر، منع، اجبار و حق تقدم دارد، و از رنگِ زمینه‌ی تابلو می‌فهمی روی چه جاده‌ای هستی: سبز بزرگراه، آبی برون‌شهری، سفید شهری، قهوه‌ای گردشگری، زرد کارگاهِ موقت.",
      why:
        "این بزرگ‌ترین فصلِ تابلوهاست: ۶۳ تابلو و ۶۰۳ سؤال. ده‌ها سؤال فقط می‌پرسند «این تابلو در بزرگراه است یا بیرونِ شهر یا داخلِ شهر؟». جوابِ همه‌شان در رنگِ زمینه است، نه در حفظ کردنِ تک‌تکِ تابلوها.",
    },
    {
      kind: "table",
      title: "تابلوی اطلاعاتی خبر می‌دهد",
      body: "تابلوهای فصل‌های ۲ تا ۵ دستور یا هشدار می‌دهند. تابلوی اطلاعاتی می‌گوید کجا هستی، به کجا می‌رسی و چه چیزی نزدیک است. بیشترشان مستطیل یا مربع‌اند.",
      columns: ["توضیح"],
      rows: [
        {
          label: "کارش",
          it: "forniscono informazioni",
          values: ["اطلاعاتی می‌دهد که برای رانندگیِ درست و امن لازم است: مسیرها، شهرها، خدمات و تأسیساتِ جاده."],
        },
        {
          label: "خانواده‌ها",
          it: "preavviso · direzione · conferma · località · servizi",
          values: ["پیش‌آگهیِ تقاطع، جهت، تأیید (فهرستِ شهرها و فاصله)، شماره‌ی جاده، نامِ شهر، تابلوهای «مفید برای رانندگی» و تابلوهای خدمات. همه یک خانواده‌اند: segnali di indicazione."],
        },
        {
          label: "دستور داخلِ آن",
          it: "segnali in formato ridotto",
          values: ["گاهی یک تابلوی گردِ کوچکِ منع یا اجبار یا یک مثلثِ خطر داخلِ تابلوی اطلاعاتی کشیده می‌شود. دستور مالِ همان تابلوی کوچک است (فصل‌های ۲ تا ۴)، نه مالِ کلِ تابلو."],
        },
        {
          label: "خانواده‌اش چه نیست",
          it: "non è di obbligo · di precedenza",
          values: ["تابلوی اطلاعاتیِ پیش‌آگهی، تابلوی اجبار یا حق تقدم نیست؛ حتی وقتی فلش یا تابلوی گردِ کوچکی دارد."],
        },
      ],
      takeaway: "تابلوی اطلاعاتی = خبر. هر دستوری که دارد از یک تابلوی کوچکِ خطر، منع یا اجبار می‌آید که داخلش کشیده شده.",
      rule: "DPR 495/1992 art. 124 c.1; art. 127 c.7, c.9",
    },
    {
      kind: "table",
      title: "رنگِ زمینه می‌گوید روی چه جاده‌ای هستی",
      body: "زمینه‌ی تابلو رنگِ جاده‌ای را دارد که تابلو روی آن است یا به آن می‌برد. روی تابلوی سفیدِ شهری، یک قابِ کوچکِ آبی یا سبز یعنی آن مقصد از جاده‌ی برون‌شهری یا بزرگراه می‌گذرد.",
      columns: ["یعنی"],
      rows: [
        { label: "سبز", it: "verde", sign: 184, values: ["بزرگراه (autostrada)، یا تابلویی که به بزرگراه می‌برد."] },
        { label: "آبی", it: "blu", sign: 201, values: ["جاده‌ی برون‌شهری، یا تابلویی که به آن می‌برد."] },
        { label: "سفید", it: "bianco", sign: 166, values: ["داخلِ شهر و مقصدهای شهری."] },
        { label: "قهوه‌ای", it: "marrone", sign: 216, values: ["جاذبه‌ی گردشگری، فرهنگی یا طبیعی (رودخانه، کمپ)."] },
        { label: "زرد", it: "giallo", values: ["موقت: انحراف و مسیرِ جایگزین به‌خاطرِ کارگاهِ جاده (درس ۱۳)."] },
        { label: "نارنجی و قرمز", it: "arancio · rosso", values: ["نارنجی فقط برای SCUOLABUS و TAXI؛ قرمز برای SOS (درس‌های ۹، ۱۴ و ۱۵)."] },
      ],
      takeaway: "سبز بزرگراه، آبی برون‌شهری، سفید شهری. اگر رنگ با جاده‌ی جمله نخواند، جمله غلط است.",
      rule: "DPR 495/1992 art. 78 c.2; art. 124 c.8–9",
    },
    {
      kind: "classify",
      title: "این تابلو کجاست؟",
      body: "فقط به رنگِ زمینه نگاه کن، نه به نقشِ وسطِ تابلو.",
      options: [
        { it: "AUTOSTRADA", fa: "بزرگراه" },
        { it: "STRADA EXTRAURBANA", fa: "برون‌شهری" },
        { it: "STRADA URBANA", fa: "داخلِ شهر" },
        { it: "TURISMO · TERRITORIO", fa: "گردشگری و طبیعت" },
      ],
      items: [
        { prompt: "فهرستِ شهرها با فاصله، زمینه‌ی سبز", sign: 184, answer: 0, explain: "سبز = بزرگراه." },
        { prompt: "تابلوی تونل، زمینه‌ی سبز", sign: 230, answer: 0, explain: "سبز: تونلِ بزرگراه." },
        { prompt: "SS 2، زمینه‌ی آبی", sign: 201, answer: 1, explain: "آبی = جاده‌ی برون‌شهری (جاده‌ی ملی)." },
        { prompt: "تابلوی توقفگاهِ کنارِ جاده، زمینه‌ی آبی", sign: 240, answer: 1, explain: "آبی = برون‌شهری." },
        { prompt: "پیش‌آگهیِ تقاطع با زمینه‌ی سفید", sign: 166, answer: 2, explain: "سفید = داخلِ شهر. قابِ آبیِ داخلش فقط می‌گوید ناپل از جاده‌ی برون‌شهری می‌رسد." },
        { prompt: "خطوط با خطِ ویژه‌ی اتوبوس، زمینه‌ی سفید", sign: 245, answer: 2, explain: "سفید = داخلِ شهر؛ پس در بزرگراه نیست." },
        { prompt: "رودخانه، زمینه‌ی قهوه‌ای", sign: 216, answer: 3, explain: "قهوه‌ای = نامِ جغرافیایی و گردشگری." },
        { prompt: "کمپ و کاروان، زمینه‌ی قهوه‌ای", sign: 260, answer: 3, explain: "قهوه‌ای: کمپینگ هم جزوِ مقصدهای گردشگری است." },
      ],
      takeaway: "رنگ را اول بخوان؛ بعد نقش را.",
      rule: "DPR 495/1992 art. 78 c.2",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il segnale di indicazione", fa: "تابلوی اطلاعاتی (راهنما)" },
        { it: "il colore di fondo", fa: "رنگِ زمینه" },
        { it: "l'autostrada", fa: "بزرگراه (آزادراهِ عوارضی)" },
        { it: "la strada extraurbana", fa: "جاده‌ی برون‌شهری" },
        { it: "la strada urbana", fa: "خیابانِ داخلِ شهر" },
        { it: "è posto · si trova", base: "porre · trovarsi", fa: "نصب شده است · قرار دارد" },
        { it: "fa parte dei segnali di…", base: "fare parte", fa: "جزوِ تابلوهای … است" },
      ],
    },
    {
      kind: "trap",
      title: "«اگر آبی باشد» یا «همیشه»؟",
      body: "دو جمله درباره‌ی همین تابلوی سبز با فهرستِ شهرها. هر دو «strade extraurbane» دارند:",
      examples: [
        {
          sourceId: "2906",
          sign: 184,
          textIt: "Il segnale raffigurato se di colore blu, si trova su strade extraurbane",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "se di colore blu,", fa: "اگر آبی باشد،", focus: "condition" },
            { it: "si trova su strade extraurbane", fa: "در جاده‌های برون‌شهری قرار دارد", verb: "si trova ← trovarsi" },
          ],
          translation: "تابلوی تصویر، اگر آبی باشد، در جاده‌های برون‌شهری قرار دارد.",
          why: "درست است. همین تابلو با زمینه‌ی آبی روی جاده‌ی برون‌شهری است. «اگر آبی باشد» جمله را درست می‌کند.",
        },
        {
          sourceId: "2915",
          sign: 184,
          textIt: "Il segnale raffigurato è posto sulle strade extraurbane",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "è posto", fa: "نصب شده است", verb: "è posto ← porre" },
            { it: "sulle strade extraurbane", fa: "روی جاده‌های برون‌شهری", focus: "contrast" },
          ],
          translation: "تابلوی تصویر روی جاده‌های برون‌شهری نصب شده است.",
          why: "غلط است. تابلوی تصویر سبز است، پس در بزرگراه است.",
        },
      ],
      takeaway: "رنگِ تابلوی تصویر را با جاده‌ی جمله مقایسه کن؛ اگر جمله شرطِ «اگر رنگش … باشد» دارد، با همان رنگ بسنج.",
      rule: "DPR 495/1992 art. 78 c.2",
    },
  ],
  practice: [
    {
      sourceId: "3080",
      sign: 169,
      textIt: "Il segnale raffigurato fa parte dei segnali di precedenza",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "fa parte", fa: "جزوِ … است", verb: "fa ← fare" },
        { it: "dei segnali di precedenza", fa: "تابلوهای حق تقدم", focus: "contrast" },
      ],
      translation: "تابلوی تصویر جزوِ تابلوهای حق تقدم است.",
      why: "غلط است (قدم ۱). این پیش‌آگهیِ تقاطع است، یعنی تابلوی اطلاعاتی. تابلوی گردِ کوچکِ داخلش منع است، نه حق تقدم.",
      rule: "DPR 495/1992 art. 124 c.1; art. 127 c.7",
      conceptStep: 1,
    },
    {
      sourceId: "3127",
      sign: 173,
      textIt: "Il segnale raffigurato si trova su strade extraurbane",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "si trova", fa: "قرار دارد", verb: "si trova ← trovarsi" },
        { it: "su strade extraurbane", fa: "در جاده‌های برون‌شهری", focus: "contrast" },
      ],
      translation: "تابلوی تصویر در جاده‌های برون‌شهری قرار دارد.",
      why: "غلط است (قدم ۲). زمینه سبز است و نشانِ A1 دارد: تابلوی بزرگراه است.",
      rule: "DPR 495/1992 art. 78 c.2",
      conceptStep: 2,
    },
    {
      sourceId: "3268",
      sign: 218,
      textIt: "Il segnale raffigurato se di colore verde è posto in autostrada",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "se di colore verde", fa: "اگر سبز باشد", focus: "condition" },
        { it: "è posto in autostrada", fa: "در بزرگراه نصب شده است", verb: "è posto ← porre" },
      ],
      translation: "تابلوی تصویر اگر سبز باشد در بزرگراه نصب شده است.",
      why: "غلط است (قدم ۲). این تابلوی گذرگاهِ عابرِ پیاده است و همیشه آبی است. در بزرگراه عابرِ پیاده و گذرگاهِ عابر نیست.",
      rule: "DPR 495/1992 art. 78 c.2; art. 135 c.3",
      conceptStep: 2,
    },
    {
      sourceId: "3425",
      sign: 248,
      textIt: "Il segnale raffigurato è installato sulle autostrade",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "è installato", fa: "نصب شده است", verb: "è installato ← installare" },
        { it: "sulle autostrade", fa: "در بزرگراه‌ها" },
      ],
      translation: "تابلوی تصویر در بزرگراه‌ها نصب شده است.",
      why: "درست است (قدم ۲). زمینه سبز است، پس تابلوی بزرگراه است.",
      rule: "DPR 495/1992 art. 78 c.2",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2988", "3080", "3089", "3250", "3299"] },
    {
      step: 2,
      sourceIds: [
        "2906", "2907", "2915", "2984", "3042", "3055", "3069", "3103", "3108", "3127", "3136", "3146",
        "3268", "3327", "3368", "3376", "3383", "3387", "3395", "3406", "3409", "3414", "3425",
      ],
    },
  ],
};

// ── Lesson 2 ──────────────────────────────────────────────────────────────────

export const lessonNumeriStrade: Lesson = {
  id: "numeri-strade",
  titleFa: "شماره‌ی جاده: E، A، SS و SC",
  titleIt: "IDENTIFICAZIONE STRADE · E · A · SS · SC",
  minutes: 5,
  signs: [199, 200, 201, 203, 184, 206, 226],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس چهار نشانِ شناساییِ جاده را می‌شناسی (E بین‌المللی، A بزرگراه، SS جاده‌ی ملی، SC جاده‌ی شهرداری) و می‌دانی عددِ روی آن‌ها فقط شماره‌ی جاده است: نه فاصله، نه سرعت، نه کیلومترِ پیموده‌شده.",
      why: "۴۰ سؤال. تقریباً همه‌ی جمله‌های غلط یک ترفند دارند: عددِ روی نشان را به چیزِ دیگری نسبت می‌دهند، مثلاً «۵۵ کیلومتر تا مرز» یا «جاده‌ی لغزنده برای ۲ کیلومتر».",
    },
    {
      kind: "table",
      title: "چهار نشانِ شناسایی",
      body: "حرف نوعِ جاده را می‌گوید و رنگ از قاعده‌ی درس ۱ پیروی می‌کند. این نشان‌ها تنها نصب می‌شوند یا داخلِ تابلوهای پیش‌آگهی، جهت و تأیید می‌آیند.",
      columns: ["چیست"],
      rows: [
        { label: "E · سبز", it: "itinerario internazionale", sign: 199, values: ["مسیرِ بین‌المللیِ اروپایی. عدد شماره‌ی بین‌المللیِ مسیر است. هر جاده‌ی برون‌شهری E نیست."] },
        { label: "A · سبز", it: "autostrada", sign: 200, values: ["شماره‌ی بزرگراه. با یک فلش، راهِ ورودی به بزرگراه را نشان می‌دهد."] },
        { label: "SS · آبی", it: "strada statale", sign: 201, values: ["جاده‌ی ملی (statale). می‌گوید روی کدام جاده‌ی ملی هستی."] },
        { label: "SC · سفید", it: "strada comunale", sign: 203, values: ["جاده‌ی شهرداری (comunale) بیرون از شهر. سرِ جاده یا کنارِ تابلوهای جهت."] },
        { label: "کجا", it: "anche dentro altri segnali", values: ["تنها، یا داخلِ پیش‌آگهی، پیش‌انتخاب، جهت و تأیید. با فلش، خودش تابلوی جهت می‌شود."] },
      ],
      takeaway: "حرف = نوعِ جاده؛ رنگ = همان قاعده‌ی درس ۱. نشان هویتِ جاده است، نه هشدار.",
      rule: "DPR 495/1992 art. 129 c.1, c.3, c.5",
    },
    {
      kind: "table",
      title: "عدد روی نشان یعنی شماره‌ی جاده",
      body: "بانک یک عدد را برمی‌دارد و آن را فاصله، طول، سرعت یا ساعت معرفی می‌کند. روی این چهار نشان، عدد فقط شماره است.",
      columns: ["روی نشان", "چیزی که نیست"],
      rows: [
        { label: "E 55", it: "itinerario n. 55", values: ["مسیرِ بین‌المللیِ شماره‌ی ۵۵", "۵۵ کیلومتر تا مرز؛ خروجیِ ۵۵؛ سرعتِ مجاز؛ ۵۵ کیلومترِ پیموده‌شده"] },
        { label: "SS 2", it: "strada statale n. 2", values: ["جاده‌ی ملیِ شماره‌ی ۲", "۲ کیلومتر جاده‌ی لغزنده، باریک یا بی‌تابلو؛ تعدادِ توقفگاه‌ها"] },
        { label: "SC 19", it: "strada comunale n. 19", values: ["جاده‌ی شهرداریِ شماره‌ی ۱۹", "۱۹ کیلومتر تا پاسگاه؛ پارک بعد از ساعتِ ۱۹"] },
        { label: "A25", it: "autostrada n. 25", values: ["بزرگراهِ شماره‌ی ۲۵", "۲۵ کیلومتر تا خروجی؛ فاصله‌ی ایمنی؛ شماره‌ی روگذر"] },
      ],
      takeaway: "عدد کنارِ E، A، SS یا SC همیشه «شماره‌ی جاده» است. عددی که فاصله باشد کنارِ نامِ یک شهر می‌آید (درس ۳).",
      rule: "DPR 495/1992 art. 129 c.1",
    },
    {
      kind: "classify",
      title: "این عدد چه چیزی را می‌شمارد؟",
      body: "در این فصل چهار نوع عدد می‌بینی. برای هر تابلو بگو عددش چیست.",
      options: [
        { it: "NUMERO DELLA STRADA", fa: "شماره‌ی جاده" },
        { it: "DISTANZA", fa: "فاصله تا یک مقصد" },
        { it: "PROGRESSIVA", fa: "کیلومترشمارِ جاده" },
        { it: "VELOCITÀ CONSIGLIATA", fa: "سرعتِ پیشنهادی" },
      ],
      items: [
        { prompt: "E 55", sign: 199, answer: 0, explain: "شماره‌ی مسیرِ بین‌المللی." },
        { prompt: "SS 2", sign: 201, answer: 0, explain: "شماره‌ی جاده‌ی ملی." },
        { prompt: "FIRENZE 180", sign: 184, answer: 1, explain: "کنارِ نامِ شهر: ۱۸۰ کیلومتر تا فلورانس (درس ۳)." },
        { prompt: "عددِ ۵۴ در مربعِ سفید", sign: 206, answer: 2, explain: "کیلومترِ ۵۴ از ابتدای بزرگراه (درس ۳)." },
        { prompt: "PIACENZA 4 روی همان تابلو", sign: 206, answer: 1, explain: "کنارِ نامِ خروجی: ۴ کیلومتر تا خروجیِ پیاچنتسا." },
        { prompt: "۶۰ در مربعِ آبی", sign: 226, answer: 3, explain: "سرعتی که توصیه می‌شود از آن بیشتر نروی (درس ۱۱)." },
      ],
      takeaway: "عدد کنارِ حرف = شماره؛ عدد کنارِ شهر = فاصله؛ عدد در مربعِ سفیدِ بزرگراه = کیلومترشمار؛ عدد تنها در مربعِ آبی = سرعتِ پیشنهادی.",
      rule: "DPR 495/1992 art. 129 c.1–2; art. 132 c.4; art. 135 c.8",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'itinerario internazionale", fa: "مسیرِ بین‌المللی" },
        { it: "la strada statale (SS)", fa: "جاده‌ی ملی" },
        { it: "la strada comunale (SC)", fa: "جاده‌ی شهرداری" },
        { it: "il numero della strada", fa: "شماره‌ی جاده" },
        { it: "identifica", base: "identificare", fa: "شناسایی می‌کند؛ نشان می‌دهد کدام است" },
        { it: "percorsa · percorrere", base: "percorrere", fa: "پیموده‌شده · پیمودن" },
        { it: "il cavalcavia", fa: "روگذر (پلِ روی جاده)" },
      ],
    },
    {
      kind: "trap",
      title: "۵۵ یعنی چه؟",
      body: "هر دو جمله درباره‌ی همان E 55 و همان عدد هستند:",
      examples: [
        {
          sourceId: "2919",
          sign: 199,
          textIt: "Il segnale raffigurato indica l'itinerario internazionale n. 55",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "indica", fa: "نشان می‌دهد", verb: "indica ← indicare" },
            { it: "l'itinerario internazionale n. 55", fa: "مسیرِ بین‌المللیِ شماره‌ی ۵۵" },
          ],
          translation: "تابلوی تصویر مسیرِ بین‌المللیِ شماره‌ی ۵۵ را نشان می‌دهد.",
          why: "درست است. E یعنی مسیرِ بین‌المللی و ۵۵ شماره‌ی آن است.",
        },
        {
          sourceId: "2923",
          sign: 199,
          textIt: "Il segnale raffigurato indica che mancano 55 chilometri al confine di Stato con l'estero",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "indica che mancano 55 chilometri", fa: "نشان می‌دهد ۵۵ کیلومتر مانده است", verb: "mancano ← mancare", focus: "contrast" },
            { it: "al confine di Stato con l'estero", fa: "تا مرزِ کشور با خارج" },
          ],
          translation: "تابلوی تصویر نشان می‌دهد ۵۵ کیلومتر تا مرزِ کشور با خارج مانده است.",
          why: "غلط است. عدد شماره‌ی مسیر است، نه فاصله.",
        },
      ],
      takeaway: "روی نشانِ جاده، هر جمله‌ای که عدد را «کیلومتر» بخواند غلط است.",
      rule: "DPR 495/1992 art. 129 c.1",
    },
  ],
  practice: [
    {
      sourceId: "2928",
      sign: 201,
      textIt: "Il segnale raffigurato si può trovare all'interno di un segnale di direzione o di bivio stradale",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "si può trovare", fa: "ممکن است قرار داشته باشد", verb: "può ← potere", focus: "limit" },
        { it: "all'interno di un segnale di direzione o di bivio stradale", fa: "داخلِ یک تابلوی جهت یا دوراهی" },
      ],
      translation: "تابلوی تصویر ممکن است داخلِ یک تابلوی جهت یا دوراهی قرار داشته باشد.",
      why: "درست است (قدم ۱). نشانِ جاده تنها هم نصب می‌شود و داخلِ تابلوهای جهت و پیش‌آگهی هم می‌آید.",
      rule: "DPR 495/1992 art. 129 c.3",
      conceptStep: 1,
    },
    {
      sourceId: "2921",
      sign: 199,
      textIt: "Il segnale raffigurato identifica le strade extraurbane",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "identifica", fa: "شناسایی می‌کند", verb: "identifica ← identificare" },
        { it: "le strade extraurbane", fa: "جاده‌های برون‌شهری را", focus: "contrast" },
      ],
      translation: "تابلوی تصویر جاده‌های برون‌شهری را شناسایی می‌کند.",
      why: "غلط است (قدم ۱). E یک مسیرِ بین‌المللیِ مشخص را نشان می‌دهد، نه هر جاده‌ی برون‌شهری را. زمینه‌اش هم سبز است، نه آبی.",
      rule: "DPR 495/1992 art. 129 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2930",
      sign: 201,
      textIt: "Il segnale raffigurato indica che stiamo percorrendo la strada statale n. 2",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che stiamo percorrendo", fa: "نشان می‌دهد که داریم می‌پیماییم", verb: "stiamo percorrendo ← percorrere" },
        { it: "la strada statale n. 2", fa: "جاده‌ی ملیِ شماره‌ی ۲ را" },
      ],
      translation: "تابلوی تصویر نشان می‌دهد که داریم جاده‌ی ملیِ شماره‌ی ۲ را می‌پیماییم.",
      why: "درست است (قدم ۲). SS = جاده‌ی ملی، ۲ = شماره‌اش.",
      rule: "DPR 495/1992 art. 129 c.1",
      conceptStep: 2,
    },
    {
      sourceId: "3230",
      sign: 200,
      textIt: "Il segnale raffigurato indica che il prossimo svincolo autostradale si trova a 25 chilometri",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che il prossimo svincolo autostradale", fa: "نشان می‌دهد که خروجیِ بعدیِ بزرگراه", verb: "indica ← indicare" },
        { it: "si trova a 25 chilometri", fa: "۲۵ کیلومتر جلوتر است", focus: "contrast" },
      ],
      translation: "تابلوی تصویر نشان می‌دهد که خروجیِ بعدیِ بزرگراه ۲۵ کیلومتر جلوتر است.",
      why: "غلط است (قدم ۲). A25 یعنی بزرگراهِ شماره‌ی ۲۵؛ عدد فاصله نیست.",
      rule: "DPR 495/1992 art. 129 c.1",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2916", "2918", "2920", "2921", "2928", "2929", "2936", "2937", "2938", "2939", "2942", "2943", "3223", "3224", "3226"] },
    {
      step: 2,
      sourceIds: [
        "2917", "2919", "2922", "2923", "2924", "2925", "2926", "2927", "2930", "2931", "2932", "2933", "2934",
        "2935", "2940", "2941", "2944", "2945", "3222", "3225", "3227", "3228", "3229", "3230", "3231",
      ],
    },
  ],
};

// ── Lesson 3 ──────────────────────────────────────────────────────────────────

export const lessonDistanzeAutostrada: Lesson = {
  id: "conferma-progressiva-uscita",
  titleFa: "چقدر مانده؟ تابلوی تأیید، کیلومترشمار و خروجی",
  titleIt: "CONFERMA · PROGRESSIVA · ITINERARIO",
  minutes: 5,
  signs: [184, 206, 182],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس سه تابلوی فاصله را می‌خوانی: تابلوی تأیید (فهرستِ شهرها و کیلومترِ باقی‌مانده)، کیلومترشمارِ بزرگراه (عددِ چپ از ابتدای بزرگراه، عددِ راست تا خروجی) و تابلوی مسیر پیش از خروجی (۵۰۰ متر تا خروجی).",
      why: "۲۷ سؤال. بانک «مانده» را با «پیموده‌شده»، فاصله تا شهر را با فاصله تا خروجی، و فاصله را با شماره‌ی جاده عوض می‌کند.",
    },
    {
      kind: "table",
      title: "تابلوی تأیید: چند کیلومتر تا هر شهر",
      body: "بعد از ورود به بزرگراه (حدودِ ۵۰۰ متر بعد از پایانِ خطِ شتاب) یا بیرون آمدن از یک شهر، این تابلو تأیید می‌کند در مسیرِ درستی و چقدر مانده.",
      columns: ["قاعده"],
      rows: [
        { label: "چه می‌نویسد", it: "località e distanze in km", sign: 184, values: ["نامِ شهرها به ترتیبِ مسیر و جلوی هر کدام کیلومترِ «باقی‌مانده» تا آن شهر."] },
        { label: "عدد یعنی", it: "mancano 180 km", values: ["۱۸۰ کیلومتر تا خودِ فلورانس. نه تا مجتمعِ خدماتیِ فلورانس، نه کیلومترِ پیموده‌شده، نه شماره‌ی جاده."] },
        { label: "چه نمی‌گوید", it: "non dal primo casello", values: ["نمی‌گوید همه‌ی این شهرها از اولین خروجی در دسترس‌اند. فقط می‌گوید روی همین مسیر جلوتر هستند."] },
        { label: "رنگ", it: "verde · blu", values: ["سبز روی بزرگراه؛ همان تابلو با زمینه‌ی آبی روی جاده‌ی برون‌شهری (درس ۱)."] },
      ],
      takeaway: "تابلوی تأیید = شهر + کیلومترِ باقی‌مانده، به ترتیبِ مسیر.",
      rule: "DPR 495/1992 art. 132 c.1, c.3–4",
    },
    {
      kind: "table",
      title: "کیلومترشمارِ بزرگراه: دو عدد، دو معنا",
      body: "مربعِ سفیدِ چپ و قابِ سبزِ راست دو چیزِ متفاوت را می‌شمارند.",
      columns: ["یعنی"],
      rows: [
        { label: "چپ: ۵۴", it: "progressiva", sign: 206, values: ["کیلومترِ ۵۴ از نقطه‌ی شروعِ بزرگراه: جایی که الان هستی."] },
        { label: "راست: PIACENZA 4", it: "distanza dall'uscita", values: ["۴ کیلومتر تا خروجیِ (casello / svincolo) پیاچنتسا."] },
        { label: "چه نیست", it: "non è velocità, non è numero", values: ["۵۴ نه سرعتِ پیشنهادی است، نه شماره‌ی بزرگراه، نه فاصله تا خروجی. ۴ هم «کیلومترِ پیموده از پیاچنتسا» نیست."] },
      ],
      takeaway: "مربعِ سفید = کجای بزرگراهی (از ابتدا). نامِ خروجی + عدد = چقدر تا آن خروجی.",
      rule: "DPR 495/1992 art. 129 c.2; art. 132 c.4",
    },
    {
      kind: "table",
      title: "پیش از خروجی: تابلوی مسیر",
      body: "روی بزرگراه و جاده‌ی برون‌شهریِ اصلی، پیش از هر خروجی، تابلویی می‌گوید از آن خروجی به کجاها می‌رسی.",
      columns: ["قاعده"],
      rows: [
        { label: "بالای تابلو", it: "uscita FROSINONE", sign: 182, values: ["نامِ خروجی (svincolo)."] },
        { label: "وسط", it: "località raggiungibili", values: ["شهرهایی که با بیرون رفتن از این خروجی می‌رسی. قابِ قهوه‌ای = مقصدِ گردشگری."] },
        { label: "پایین: ۵۰۰ m", it: "distanza dallo svincolo", values: ["فاصله‌ی تابلو تا خروجی. نه فاصله تا شهرِ فروزینونه، نه فاصله تا همه‌ی شهرها."] },
        { label: "کجا", it: "strade extraurbane principali", values: ["روی جاده‌ی برون‌شهریِ اصلی (و بزرگراه). نه بیرون رفتن از شهر؛ نه شروعِ شهر؛ نه «آخرین خروجی»."] },
      ],
      takeaway: "۵۰۰ متر = تا خروجی. شهرها را فقط بعد از خروجی پیدا می‌کنی.",
      rule: "DPR 495/1992 art. 130 c.1–3; art. 78 c.2",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il segnale di conferma", fa: "تابلوی تأیید" },
        { it: "mancano … chilometri", base: "mancare", fa: "… کیلومتر مانده است" },
        { it: "i chilometri già fatti", fa: "کیلومترهایی که پیموده‌ای" },
        { it: "la distanza progressiva", fa: "کیلومترشمار (فاصله از ابتدای جاده)" },
        { it: "il casello", fa: "عوارضی؛ ورودی/خروجیِ بزرگراه" },
        { it: "lo svincolo d'uscita", fa: "خروجیِ جاده" },
        { it: "raggiungibile", base: "raggiungere", fa: "قابلِ رسیدن" },
      ],
    },
    {
      kind: "trap",
      title: "۴ یا ۵۴؟",
      body: "دو جمله درباره‌ی فاصله تا خروجیِ پیاچنتسا، روی همان تابلو:",
      examples: [
        {
          sourceId: "2987",
          sign: 206,
          textIt: "Il segnale raffigurato indica che mancano 4 chilometri dal casello d'uscita per Piacenza",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "indica che mancano 4 chilometri", fa: "نشان می‌دهد ۴ کیلومتر مانده است", verb: "mancano ← mancare" },
            { it: "dal casello d'uscita per Piacenza", fa: "تا عوارضیِ خروجیِ پیاچنتسا" },
          ],
          translation: "تابلوی تصویر نشان می‌دهد ۴ کیلومتر تا عوارضیِ خروجیِ پیاچنتسا مانده است.",
          why: "درست است. عددِ کنارِ نامِ خروجی فاصله تا خروجی است.",
        },
        {
          sourceId: "2989",
          sign: 206,
          textIt: "Il segnale raffigurato indica cha mancano 54 chilometri dallo svincolo d'uscita per Piacenza",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "indica cha mancano 54 chilometri", fa: "نشان می‌دهد ۵۴ کیلومتر مانده است", verb: "mancano ← mancare", focus: "contrast", note: "«cha» در متنِ بانک غلطِ تایپی به‌جای «che» است." },
            { it: "dallo svincolo d'uscita per Piacenza", fa: "تا خروجیِ پیاچنتسا" },
          ],
          translation: "تابلوی تصویر نشان می‌دهد ۵۴ کیلومتر تا خروجیِ پیاچنتسا مانده است.",
          why: "غلط است. ۵۴ کیلومترشمار است (از ابتدای بزرگراه). تا خروجی ۴ کیلومتر مانده.",
        },
      ],
      takeaway: "اول ببین عدد کنارِ چیست: مربعِ سفید یا نامِ خروجی.",
      rule: "DPR 495/1992 art. 129 c.2",
    },
  ],
  practice: [
    {
      sourceId: "2910",
      sign: 184,
      textIt: "Il segnale raffigurato indica che uscendo dal primo casello autostradale è possibile raggiungere tutte le località indicate",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che uscendo dal primo casello autostradale", fa: "نشان می‌دهد که با خروج از اولین عوارضیِ بزرگراه", verb: "uscendo ← uscire", focus: "condition" },
        { it: "è possibile raggiungere tutte le località indicate", fa: "می‌شود به همه‌ی شهرهای نوشته‌شده رسید", focus: "always" },
      ],
      translation: "تابلوی تصویر نشان می‌دهد که با خروج از اولین عوارضیِ بزرگراه می‌شود به همه‌ی شهرهای نوشته‌شده رسید.",
      why: "غلط است (قدم ۱). تابلوی تأیید فقط می‌گوید این شهرها روی همین مسیر جلوتر هستند و چند کیلومتر مانده.",
      rule: "DPR 495/1992 art. 132 c.4",
      conceptStep: 1,
    },
    {
      sourceId: "2986",
      sign: 206,
      textIt: "Il segnale raffigurato nella parte sinistra indica la distanza progressiva dal luogo di origine dell'autostrada",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "nella parte sinistra", fa: "در بخشِ چپ" },
        { it: "indica la distanza progressiva", fa: "کیلومترشمار را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "dal luogo di origine dell'autostrada", fa: "از نقطه‌ی شروعِ بزرگراه" },
      ],
      translation: "تابلوی تصویر در بخشِ چپ، فاصله‌ی پیوسته از نقطه‌ی شروعِ بزرگراه را نشان می‌دهد.",
      why: "درست است (قدم ۲). عددِ ۵۴ در مربعِ سفید کیلومترِ ۵۴ از ابتدای بزرگراه است.",
      rule: "DPR 495/1992 art. 129 c.2",
      conceptStep: 2,
    },
    {
      sourceId: "3144",
      sign: 182,
      textIt: "Il segnale raffigurato indica che lo svincolo di uscita per Frosinone è a 500 metri",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che lo svincolo di uscita per Frosinone", fa: "نشان می‌دهد که خروجیِ فروزینونه", verb: "indica ← indicare" },
        { it: "è a 500 metri", fa: "۵۰۰ متر جلوتر است" },
      ],
      translation: "تابلوی تصویر نشان می‌دهد که خروجیِ فروزینونه ۵۰۰ متر جلوتر است.",
      why: "درست است (قدم ۳). عددِ پایینِ تابلو فاصله تا خروجی است.",
      rule: "DPR 495/1992 art. 130 c.2",
      conceptStep: 3,
    },
    {
      sourceId: "3150",
      sign: 182,
      textIt: "Il segnale raffigurato indica che tutte le località riportate nel cartello sono distanti 500 metri",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che tutte le località riportate nel cartello", fa: "نشان می‌دهد که همه‌ی شهرهای نوشته‌شده روی تابلو", verb: "indica ← indicare", focus: "always" },
        { it: "sono distanti 500 metri", fa: "۵۰۰ متر فاصله دارند" },
      ],
      translation: "تابلوی تصویر نشان می‌دهد که همه‌ی شهرهای نوشته‌شده روی تابلو ۵۰۰ متر فاصله دارند.",
      why: "غلط است (قدم ۳). ۵۰۰ متر فقط تا خروجی است. شهرها بعد از خروجی و دورترند.",
      rule: "DPR 495/1992 art. 130 c.2",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2904", "2905", "2908", "2909", "2910", "2911", "2912", "2913", "2914"] },
    { step: 2, sourceIds: ["2983", "2985", "2986", "2987", "2989", "2990", "2991", "2992", "2993"] },
    { step: 3, sourceIds: ["3143", "3144", "3145", "3147", "3148", "3149", "3150", "3151", "3152"] },
  ],
};
