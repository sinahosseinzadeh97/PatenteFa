/**
 * src/content/ch8-servizi.ts
 * Chapter 8 (Segnali di indicazione), lessons 14–15: service signs on the
 * road (fuel, mechanic, telephone, SOS, police, tourist information, camping,
 * motorhome waste disposal) and signs for health and transport (hospital,
 * first aid, taxi, extra-urban bus stop, park-and-ride, car on the train).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter8.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const SIGN = "Il segnale raffigurato";
const SIGN_FA = "تابلوی تصویر";

// ── Lesson 14 ─────────────────────────────────────────────────────────────────

export const lessonServiziViaggio: Lesson = {
  id: "servizi-strada",
  titleFa: "خدماتِ کنارِ جاده: بنزین، تعمیرگاه، تلفن، SOS و بیشتر",
  titleIt: "RIFORNIMENTO · OFFICINA · TELEFONO · SOS · POLIZIA · INFORMAZIONI · CAMPEGGIO",
  minutes: 5,
  signs: [254, 252, 253, 220, 274, 217, 260, 273],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس هشت تابلوی خدماتی را از نقشِ وسطشان می‌شناسی و می‌دانی همه فقط می‌گویند «این خدمت نزدیک است»؛ هیچ‌کدام چیزی را منع یا اجبار نمی‌کنند.",
      why: "۷۰ سؤال. جمله‌های غلط یا نقش را با خدمتِ دیگری عوض می‌کنند (پمپ‌بنزین ↔ تعمیرگاه، SOS ↔ تلفن) یا به تابلو یک منع یا شرطِ ساختگی می‌چسبانند («فقط گاز»، «منعِ موبایل»).",
    },
    {
      kind: "table",
      title: "برای ماشین و برای کمک",
      body: "بیشترِ تابلوهای خدمات آبی‌اند با یک مربعِ سفید و نقشِ مشکی: یعنی خدمت روی جاده‌ی برون‌شهری است.",
      columns: ["یعنی"],
      rows: [
        { label: "پمپ‌بنزین", it: "rifornimento carburante", sign: 254, values: ["پمپ‌بنزین نزدیک است. نه «فقط گاز»، نه پالایشگاه، نه منعِ تانکرِ سوخت، نه تعمیرگاه."] },
        { label: "تعمیرگاه", it: "officina meccanica", sign: 252, values: ["آچار = تعمیرگاهِ خودرو نزدیک است. نه کارگرانِ کارخانه، نه کارگرانِ جاده، نه پمپ‌بنزین."] },
        { label: "تلفن", it: "telefono pubblico", sign: 253, values: ["تلفنِ عمومی نزدیک است. نه مغازه‌ی موبایل، نه شارژِ گوشی، نه آنتن‌دهی، نه منعِ موبایل."] },
        { label: "SOS · قرمز", it: "dispositivo di chiamata di soccorso", sign: 220, values: ["دستگاهِ درخواستِ امداد یا کمکِ جاده‌ای. تلفنِ عمومی نیست؛ بیمارستان یا توقفگاهِ آمبولانس هم نیست."] },
        { label: "پلیسِ راه", it: "comando della polizia stradale", sign: 274, values: ["نشانی و تلفنِ نزدیک‌ترین مقرِ پلیسِ راه: محل، خیابان، تلفن. نه ایست‌بازرسی، نه پارکینگِ پلیس، نه جاده‌ی بسته."] },
      ],
      takeaway: "نقشِ وسط را بخوان: پمپ، آچار، گوشی، SOS. همه خبر می‌دهند؛ هیچ‌کدام دستور نمی‌دهند.",
      rule: "DPR 495/1992 art. 136 c.3–5, c.21; art. 135 c.5; art. 78 c.2",
    },
    {
      kind: "table",
      title: "برای سفر و اقامت",
      body: "قهوه‌ای یعنی گردشگری (درس ۱). تابلوی تخلیه آبی است.",
      columns: ["یعنی"],
      rows: [
        { label: "اطلاعاتِ گردشگری و هتل", it: "informazioni turistico-alberghiere", sign: 217, values: ["«i» و تخت: دفترِ اطلاعاتی که درباره‌ی هتل‌ها و متل‌ها راهنمایی می‌کند، ۱۵۰ متر جلوتر. تعدادِ هتل‌ها یا بیمارستان یا «هتل با مترجم» نیست."] },
        { label: "کمپینگ · قهوه‌ای", it: "area campeggio", sign: 260, values: ["محوطه‌ی کمپ با چادر و جای کاروان و موتورخانه نزدیک است. منعِ پارکِ کاروان نیست؛ تعمیرگاه یا منطقه‌ی دیدنی هم نیست."] },
        { label: "تخلیه‌ی موتورخانه", it: "impianti di scarico", sign: 273, values: ["محوطه‌ای که وسایلِ دارای سرویسِ بهداشتی (مثلِ موتورخانه) پسماند و آب‌های مصرفی را تخلیه می‌کنند. برای همه‌ی این وسایل. دست‌شوییِ مسافران، باسکول، یا هشدارِ چاله نیست."] },
      ],
      takeaway: "قهوه‌ای = گردشگری و اقامت. نقشِ موتورخانه با فلش رو به پایین = جای تخلیه.",
      rule: "DPR 495/1992 art. 134 c.4, c.10; art. 136 c.8, c.11, c.20",
    },
    {
      kind: "classify",
      title: "جلوتر چه خبر است؟",
      body: "هر تابلو را به خدمتی که خبر می‌دهد وصل کن.",
      options: [
        { it: "VEICOLO", fa: "برای خودرو (سوخت، تعمیر)" },
        { it: "AIUTO", fa: "کمک (تلفن، SOS، پلیس)" },
        { it: "VIAGGIO", fa: "سفر و اقامت" },
      ],
      items: [
        { prompt: "پمپ با شلنگ", sign: 254, answer: 0, explain: "پمپ‌بنزین." },
        { prompt: "آچار", sign: 252, answer: 0, explain: "تعمیرگاه." },
        { prompt: "گوشیِ تلفن", sign: 253, answer: 1, explain: "تلفنِ عمومی." },
        { prompt: "SOS روی قرمز", sign: 220, answer: 1, explain: "دستگاهِ درخواستِ امداد." },
        { prompt: "POLIZIA STRADALE با جای نشانی", sign: 274, answer: 1, explain: "نزدیک‌ترین مقرِ پلیسِ راه." },
        { prompt: "چادر و کاروان روی قهوه‌ای", sign: 260, answer: 2, explain: "کمپینگ." },
        { prompt: "«i» و تخت با ۱۵۰ m", sign: 217, answer: 2, explain: "اطلاعاتِ هتل و گردشگری." },
      ],
      takeaway: "سه سؤال: برای ماشین؟ برای کمک؟ برای سفر؟",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il rifornimento di carburante", fa: "سوخت‌گیری" },
        { it: "l'officina meccanica", fa: "تعمیرگاهِ مکانیکی" },
        { it: "nelle vicinanze · a breve distanza", fa: "در نزدیکی · در فاصله‌ی کوتاه" },
        { it: "il soccorso stradale", fa: "امدادِ جاده‌ای" },
        { it: "il comando di polizia stradale", fa: "مقرِ پلیسِ راه" },
        { it: "l'autocaravan", fa: "موتورخانه (کمپر)" },
        { it: "lo scarico", fa: "تخلیه" },
      ],
    },
    {
      kind: "trap",
      title: "تلفن یا SOS؟",
      body: "دو جمله با همان «telefono pubblico»، درباره‌ی دو تابلوی متفاوت:",
      examples: [
        {
          sourceId: "3004",
          sign: 253,
          textIt: "Il segnale raffigurato indica un posto di telefono pubblico nelle vicinanze",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "indica un posto di telefono pubblico", fa: "یک تلفنِ عمومی را نشان می‌دهد", verb: "indica ← indicare" },
            { it: "nelle vicinanze", fa: "در نزدیکی" },
          ],
          translation: "تابلوی تصویر یک تلفنِ عمومی در نزدیکی را نشان می‌دهد.",
          why: "درست است. نقشِ گوشیِ تلفن.",
        },
        {
          sourceId: "3283",
          sign: 220,
          textIt: "Il segnale raffigurato indica la presenza di un telefono pubblico",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "indica la presenza", fa: "وجودِ … را نشان می‌دهد", verb: "indica ← indicare" },
            { it: "di un telefono pubblico", fa: "یک تلفنِ عمومی", focus: "contrast" },
          ],
          translation: "تابلوی تصویر وجودِ یک تلفنِ عمومی را نشان می‌دهد.",
          why: "غلط است. SOS دستگاهِ درخواستِ امداد است، نه تلفنِ عمومی.",
        },
      ],
      takeaway: "SOS قرمز = امداد. گوشی روی آبی = تلفنِ عمومی.",
      rule: "DPR 495/1992 art. 135 c.5; art. 136 c.4",
    },
  ],
  practice: [
    {
      sourceId: "3022",
      sign: 254,
      textIt: "Il segnale raffigurato indica un distributore di carburante riservato solo ai veicoli alimentati a GPL",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica un distributore di carburante", fa: "یک پمپ‌بنزین را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "riservato solo ai veicoli alimentati a GPL", fa: "که فقط مخصوصِ خودروهای گازسوز است", focus: "limit" },
      ],
      translation: "تابلوی تصویر پمپ‌بنزینی را نشان می‌دهد که فقط مخصوصِ خودروهای گازسوز (GPL) است.",
      why: "غلط است (قدم ۱). تابلو فقط می‌گوید سوخت‌گیری نزدیک است؛ «فقط گاز» نمی‌گوید.",
      rule: "DPR 495/1992 art. 136 c.5",
      conceptStep: 1,
    },
    {
      sourceId: "2959",
      sign: 274,
      textIt: "Il segnale raffigurato indica un posto di blocco della polizia",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica", fa: "نشان می‌دهد", verb: "indica ← indicare" },
        { it: "un posto di blocco della polizia", fa: "یک ایست‌بازرسیِ پلیس را", focus: "contrast" },
      ],
      translation: "تابلوی تصویر یک ایست‌بازرسیِ پلیس را نشان می‌دهد.",
      why: "غلط است (قدم ۱). نشانی و تلفنِ نزدیک‌ترین مقرِ پلیسِ راه را می‌دهد؛ ایست نیست.",
      rule: "DPR 495/1992 art. 136 c.21",
      conceptStep: 1,
    },
    {
      sourceId: "3466",
      sign: 273,
      textIt: "Il segnale raffigurato indica un'area con impianti igienico-sanitari per raccogliere le acque delle autocaravan",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica un'area con impianti igienico-sanitari", fa: "محوطه‌ای با تأسیساتِ بهداشتی را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "per raccogliere le acque delle autocaravan", fa: "برای جمع‌آوریِ آب‌های موتورخانه‌ها", focus: "reason" },
      ],
      translation: "تابلوی تصویر محوطه‌ای با تأسیساتِ بهداشتی برای جمع‌آوریِ آب‌های موتورخانه‌ها را نشان می‌دهد.",
      why: "درست است (قدم ۲). جای تخلیه‌ی پسماند و آب‌های موتورخانه.",
      rule: "DPR 495/1992 art. 136 c.20",
      conceptStep: 2,
    },
    {
      sourceId: "3258",
      sign: 217,
      textIt: "Il segnale raffigurato indica il numero di alberghi che si trovano nelle vicinanze",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica il numero di alberghi", fa: "تعدادِ هتل‌ها را نشان می‌دهد", verb: "indica ← indicare", focus: "contrast" },
        { it: "che si trovano nelle vicinanze", fa: "که در نزدیکی هستند" },
      ],
      translation: "تابلوی تصویر تعدادِ هتل‌هایی را که در نزدیکی هستند نشان می‌دهد.",
      why: "غلط است (قدم ۲). دفترِ اطلاعاتِ هتل و گردشگری را خبر می‌دهد؛ ۱۵۰ متر فاصله تا آن است، نه تعداد.",
      rule: "DPR 495/1992 art. 134 c.10",
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        "3014", "3015", "3016", "3017", "3018", "3019", "3020", "3021", "3022", "3023", "3024",
        "3474", "3475", "3476", "3477", "3478", "3479", "3480", "3481",
        "3004", "3005", "3006", "3007", "3008", "3009", "3010", "3011", "3012", "3013",
        "3279", "3280", "3281", "3282", "3283", "3284", "3285",
        "2955", "2956", "2957", "2958", "2959", "2960", "2961", "2962", "2963",
      ],
    },
    {
      step: 2,
      sourceIds: [
        "3255", "3256", "3257", "3258", "3259", "3260", "3261",
        "2946", "2947", "2948", "2949", "2950", "2951", "2952", "2953", "2954",
        "3465", "3466", "3467", "3468", "3469", "3470", "3471", "3472", "3473",
      ],
    },
  ],
};

// ── Lesson 15 ─────────────────────────────────────────────────────────────────

export const lessonServiziSaluteTrasporti: Lesson = {
  id: "ospedale-taxi-autobus",
  titleFa: "بیمارستان، اورژانس، تاکسی، اتوبوس و قطارِ ماشین‌بر",
  titleIt: "OSPEDALE · PRONTO SOCCORSO · TAXI · AUTOBUS · PARCHEGGIO DI SCAMBIO · AUTO AL SEGUITO",
  minutes: 5,
  signs: [214, 210, 272, 256, 265, 270],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس تابلوهای بیمارستان و اورژانس را می‌شناسی (و فلشِ زیرشان را: راهِ ورودی)، و چهار تابلوی حمل‌ونقل را: ایستگاهِ تاکسی، ایستگاهِ اتوبوسِ برون‌شهری، پارک‌سوار و قطاری که ماشینت را هم می‌برد.",
      why: "۵۰ سؤال. صلیبِ قرمز را با داروخانه و پرچمِ سوئیس عوض می‌کنند، تختِ بیمارستان را با هتل، و تاکسی را با «منعِ سبقت» یا «تلفنِ تاکسی».",
    },
    {
      kind: "table",
      title: "بیمارستان و اورژانس",
      body: "هر دو سفیدند با نقش و یک فلش: «ورودی از این طرف». سرِ خودِ ورودی نصب می‌شوند.",
      columns: ["یعنی"],
      rows: [
        { label: "بیمارستان", it: "ospedale", sign: 214, values: ["تخت با صلیبِ قرمز = ورودیِ بیمارستان، و فلش جهتِ ورود. یادآوری هم می‌کند که نزدیکِ بیمارستان سروصدا نکنی. هتل، خوابگاه یا قطارِ تخت‌دار نیست."] },
        { label: "اورژانس", it: "pronto soccorso", sign: 210, values: ["صلیبِ قرمز تنها = ورودیِ اورژانس (کمک‌های اولیه)، با فلشِ جهتِ ورود. داروخانه، مرزِ سوئیس، تقاطعِ چهارراه یا راهِ قبرستان نیست."] },
        { label: "هیچ‌کدام", it: "non parcheggio medici", values: ["هیچ‌کدام پارکینگِ ویژه‌ی پزشکان نیست."] },
      ],
      takeaway: "سفید + فلش = «ورودی از این طرف». تخت = بیمارستان؛ صلیبِ تنها = اورژانس.",
      rule: "DPR 495/1992 art. 131 c.9–10; art. 135 c.2; art. 136 c.2",
    },
    {
      kind: "table",
      title: "تاکسی، اتوبوس، پارک‌سوار، قطار",
      body: "چهار تابلوی حمل‌ونقل. تاکسی نارنجی است (مثلِ سرویسِ مدرسه)؛ بقیه آبی یا سفید.",
      columns: ["یعنی"],
      rows: [
        { label: "تاکسی · نارنجی", it: "area di sosta taxi", sign: 272, values: ["جای توقفِ ویژه‌ی تاکسی‌های در حالِ کار، با خط‌کشیِ زرد و نوشته‌ی TAXI. نور ندارد. منعِ سبقت، جاده‌ی ممنوع، تلفن یا رادیوی تاکسی، یا گاراژ نیست."] },
        { label: "اتوبوسِ برون‌شهری", it: "fermata autobus extraurbano", sign: 256, values: ["ایستگاهِ اتوبوسِ حمل‌ونقلِ عمومیِ برون‌شهری؛ ممکن است پنلِ ساعتِ حرکت داشته باشد. خطِ ویژه، جاده‌ی ویژه یا منعِ اتوبوس نیست."] },
        { label: "پارک‌سوار", it: "parcheggio di scambio", sign: 265, values: ["پارکینگ نزدیکِ ایستگاهِ اتوبوس: ماشین را پارک کن و سوارِ اتوبوسِ ۸ یا ۴۵ شو. ۸ و ۴۵ شماره‌ی خط‌اند، نه ساعتِ ۸:۴۵، نه دقیقه، نه تعدادِ اتوبوس."] },
        { label: "قطارِ ماشین‌بر", it: "auto al seguito", sign: 270, values: ["نزدیکِ ایستگاهِ قطارِ بزرگ، جایی که ماشین‌ها را برای سوار شدن بر قطار می‌برند؛ مسافر جدا سفر می‌کند. «در ماشین بمان» یا هتل نیست."] },
      ],
      takeaway: "عدد روی تابلوی پارک‌سوار شماره‌ی خطِ اتوبوس است. نارنجی فقط تاکسی و سرویسِ مدرسه.",
      rule: "DPR 495/1992 art. 136 c.6, c.15–16, c.18; art. 78 c.2",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'ospedale", fa: "بیمارستان" },
        { it: "il pronto soccorso", fa: "اورژانس؛ کمک‌های اولیه" },
        { it: "l'ingresso", fa: "ورودی" },
        { it: "i rumori molesti", fa: "سروصدای آزاردهنده" },
        { it: "i taxi in servizio", fa: "تاکسی‌های در حالِ کار" },
        { it: "il parcheggio di scambio", fa: "پارک‌سوار" },
        { it: "al seguito del viaggiatore", fa: "همراهِ مسافر" },
      ],
    },
    {
      kind: "trap",
      title: "پارکینگِ ویژه برای چه کسی؟",
      body: "دو جمله با همان «parcheggio riservato»:",
      examples: [
        {
          sourceId: "2996",
          sign: 272,
          textIt: "Il segnale raffigurato indica un parcheggio riservato ai taxi in servizio",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "indica un parcheggio riservato", fa: "یک پارکینگِ ویژه را نشان می‌دهد", verb: "indica ← indicare" },
            { it: "ai taxi in servizio", fa: "برای تاکسی‌های در حالِ کار" },
          ],
          translation: "تابلوی تصویر یک پارکینگِ ویژه‌ی تاکسی‌های در حالِ کار را نشان می‌دهد.",
          why: "درست است. نارنجی با TAXI = جای توقفِ تاکسی‌ها.",
        },
        {
          sourceId: "3247",
          sign: 210,
          textIt: "Il segnale raffigurato indica un parcheggio riservato ai medici",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "indica un parcheggio riservato", fa: "یک پارکینگِ ویژه را نشان می‌دهد", verb: "indica ← indicare" },
            { it: "ai medici", fa: "برای پزشکان", focus: "contrast" },
          ],
          translation: "تابلوی تصویر یک پارکینگِ ویژه‌ی پزشکان را نشان می‌دهد.",
          why: "غلط است. صلیبِ قرمز با فلش ورودیِ اورژانس است.",
        },
      ],
      takeaway: "اول نقشِ تابلو را بشناس؛ «پارکینگِ ویژه» فقط وقتی درست است که تابلو خودش پارکینگ باشد.",
      rule: "DPR 495/1992 art. 136 c.2, c.18",
    },
  ],
  practice: [
    {
      sourceId: "3115",
      sign: 214,
      textIt: "Il segnale raffigurato, che indica la vicinanza di un ospedale, invita a non fare rumori molesti nelle sue vicinanze",
      answer: 1,
      chunks: [
        { it: "Il segnale raffigurato, che indica la vicinanza di un ospedale,", fa: "تابلوی تصویر، که نزدیکیِ یک بیمارستان را نشان می‌دهد،", verb: "indica ← indicare" },
        { it: "invita a non fare rumori molesti", fa: "دعوت می‌کند سروصدای آزاردهنده نکنی", verb: "invita ← invitare", focus: "negation" },
        { it: "nelle sue vicinanze", fa: "در نزدیکیِ آن" },
      ],
      translation: "تابلوی تصویر، که نزدیکیِ یک بیمارستان را نشان می‌دهد، دعوت می‌کند در نزدیکیِ آن سروصدای آزاردهنده نکنی.",
      why: "درست است (قدم ۱). تابلوی بیمارستان یادآوریِ آرام بودن هم هست.",
      rule: "DPR 495/1992 art. 135 c.2",
      conceptStep: 1,
    },
    {
      sourceId: "3244",
      sign: 210,
      textIt: "Il segnale raffigurato indica una farmacia",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica", fa: "نشان می‌دهد", verb: "indica ← indicare" },
        { it: "una farmacia", fa: "یک داروخانه را", focus: "contrast" },
      ],
      translation: "تابلوی تصویر یک داروخانه را نشان می‌دهد.",
      why: "غلط است (قدم ۱). صلیبِ قرمز با فلش ورودیِ اورژانس است.",
      rule: "DPR 495/1992 art. 136 c.2",
      conceptStep: 1,
    },
    {
      sourceId: "3002",
      sign: 272,
      textIt: "Il segnale raffigurato è dotato di luce propria",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "è dotato", fa: "مجهز است", verb: "è dotato ← dotare" },
        { it: "di luce propria", fa: "به نورِ خودش", focus: "contrast" },
      ],
      translation: "تابلوی تصویر نورِ خودش را دارد.",
      why: "غلط است (قدم ۲). تابلوی ثابتِ نارنجی است، نه تابلوی نوردار.",
      rule: "DPR 495/1992 art. 136 c.18",
      conceptStep: 2,
    },
    {
      sourceId: "3462",
      sign: 270,
      textIt: "Il segnale raffigurato indica la possibilità di restare in auto durante il suo trasporto in treno",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica la possibilità di restare in auto", fa: "امکانِ ماندن در ماشین را نشان می‌دهد", verb: "indica ← indicare", focus: "contrast" },
        { it: "durante il suo trasporto in treno", fa: "در طولِ حملِ آن با قطار" },
      ],
      translation: "تابلوی تصویر امکانِ ماندن در ماشین در طولِ حملِ آن با قطار را نشان می‌دهد.",
      why: "غلط است (قدم ۲). ماشین «همراهِ» مسافر با قطار می‌رود؛ مسافر در واگنِ خودش است (نقشِ تخت).",
      rule: "DPR 495/1992 art. 136 c.16",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["3114", "3115", "3116", "3117", "3118", "3119", "3120", "3121", "3240", "3241", "3242", "3243", "3244", "3245", "3246", "3247"] },
    {
      step: 2,
      sourceIds: [
        "2994", "2995", "2996", "2997", "2998", "2999", "3000", "3001", "3002", "3003",
        "3441", "3442", "3443", "3444", "3445", "3446", "3447",
        "3448", "3449", "3450", "3451", "3452", "3453", "3454", "3455", "3456", "3457",
        "3458", "3459", "3460", "3461", "3462", "3463", "3464",
      ],
    },
  ],
};
