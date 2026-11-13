/**
 * src/content/ch8-luoghi.ts
 * Chapter 8 (Segnali di indicazione), lessons 6–8: towns, rivers and borders;
 * signs that name a type of road and the general speed limits; one-way and
 * dead-end streets.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter8.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const SIGN = "Il segnale raffigurato";
const SIGN_FA = "تابلوی تصویر";

// ── Lesson 6 ──────────────────────────────────────────────────────────────────

export const lessonLocalitaConfini: Lesson = {
  id: "localita-confini",
  titleFa: "کجا هستی؟ شهر، رودخانه و مرز",
  titleIt: "CENTRO ABITATO · LOCALIZZAZIONE · CONFINE DI STATO",
  minutes: 5,
  signs: [207, 183, 216, 163, 164],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس تابلوی شروع و پایانِ شهر را می‌شناسی و پنلِ آبیِ زیرِ تابلوی پایان را می‌خوانی، می‌دانی تابلوی نامِ رودخانه کجاست، و می‌دانی تابلوی مرز با کشورِ اتحادیه‌ی اروپا و پیش‌آگهی‌اش تو را مجبور به ایستادن نمی‌کنند.",
      why: "۴۴ سؤال. تابلوی پایانِ شهر را با شروعِ شهر، عددِ ۱۹۰ را با شماره‌ی جاده و مرزِ اروپا را با ایستِ گمرک یا پلاکِ پشتِ ماشین عوض می‌کنند.",
    },
    {
      kind: "table",
      title: "شروع و پایانِ شهر",
      body: "تابلوی سفید با نامِ شهر می‌گوید وارد «centro abitato» شده‌ای. همان تابلو با خطِ قرمزِ مورب یعنی بیرون آمدی.",
      columns: ["قاعده"],
      rows: [
        { label: "شروع", it: "inizio centro abitato", sign: 207, values: ["زمینه‌ی سفید با نامِ شهر، در ابتدای شهر روی همه‌ی جاده‌هایی که به آن وارد می‌شوند. فقط نامِ شهر را می‌گوید: نه جهت، نه مرزِ استان، نه «شهرِ گردشگری»."] },
        { label: "از اینجا به بعد", it: "50 km/h · niente clacson", values: ["همین تابلو یعنی قواعدِ داخلِ شهر شروع شده: سرعتِ حداکثر ۵۰ و بوق ممنوع؛ تابلوی جداگانه لازم نیست."] },
        { label: "پایان", it: "fine centro abitato", sign: 183, values: ["همان نام با خطِ قرمزِ مورب. زیرش پنلِ آبیِ تأیید: شهرهای بعدی و کیلومترِ باقی‌مانده تا هر کدام."] },
        { label: "پنلِ آبی", it: "S. Cesareo 7 · Napoli 190", values: ["خطِ اول = نزدیک‌ترین شهرِ بعدی (۷ کیلومتر)؛ ناپل ۱۹۰ کیلومتر. ۱۹۰ شماره‌ی جاده نیست؛ سربالایی یا جاده‌ی بسته هم نیست."] },
      ],
      takeaway: "سفید + نام = ورود به شهر. خطِ قرمز = خروج؛ پنلِ آبی = چقدر تا شهرهای بعدی.",
      rule: "DPR 495/1992 art. 131 c.2, c.4–6",
    },
    {
      kind: "table",
      title: "رودخانه و مرز",
      body: "دو گروه تابلوی «جایی که هستی»: نامِ یک عارضه‌ی طبیعی، و مرزِ کشور.",
      columns: ["یعنی"],
      rows: [
        { label: "رودخانه", it: "fiume Arno", sign: 216, values: ["تابلوی قهوه‌ای با موج و پنلِ نام، کنارِ پلی که از روی رودِ آرنو می‌گذرد. اطلاعاتی است؛ نه خطرِ سیل یا موج، نه پیچ‌های پشتِ‌سرِهم."] },
        { label: "مرزِ اتحادیه‌ی اروپا", it: "confine di Stato UE", sign: 163, values: ["مربعِ آبی با دوازده ستاره‌ی زرد و نامِ کشوری که واردش می‌شوی، سرِ مرز. در مرز با کشورِ عضو جای تابلوی «ALT – DOGANA» را می‌گیرد: اجبار به ایستادن نیست."] },
        { label: "پیش‌آگهیِ مرز", it: "preavviso di confine", sign: 164, values: ["همان تابلو با پنلِ فاصله (۱ کیلومتر)، روی جاده‌هایی که به مرز می‌روند. این هم اجبار به ایستادن نیست."] },
        { label: "پلاک نیست", it: "non è dietro al veicolo", values: ["این تابلوها کنارِ جاده‌اند، نه پشتِ ماشین برای نشان دادنِ کشورِ پلاک. ایست‌بازرسیِ پلیس را هم خبر نمی‌دهند."] },
      ],
      takeaway: "ستاره‌های اروپا = مرزِ یک کشورِ عضو. خبر است؛ ایست نیست.",
      rule: "DPR 495/1992 art. 134 c.1, c.4; art. 123 (ALT – DOGANA)",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il centro abitato", fa: "محدوده‌ی شهر/روستا (منطقه‌ی مسکونی)" },
        { it: "barrato da una striscia rossa", base: "barrare", fa: "با یک خطِ قرمز خط‌خورده" },
        { it: "la località", fa: "شهر یا آبادی؛ مکان" },
        { it: "il confine di Stato", fa: "مرزِ کشور" },
        { it: "il Paese membro dell'Unione Europea", fa: "کشورِ عضوِ اتحادیه‌ی اروپا" },
        { it: "arrestarsi · il controllo doganale", base: "arrestarsi", fa: "ایستادن · بازرسیِ گمرکی" },
        { it: "il fiume", fa: "رودخانه" },
      ],
    },
    {
      kind: "trap",
      title: "خطِ قرمز: شروع یا پایان؟",
      body: "دو جمله، یکی درباره‌ی تابلوی نامِ شهر و یکی درباره‌ی تابلوی خط‌خورده:",
      examples: [
        {
          sourceId: "3235",
          sign: 207,
          textIt: "Il segnale raffigurato se barrato da una striscia rossa indica la fine del centro abitato",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "se barrato da una striscia rossa", fa: "اگر با یک خطِ قرمز خط خورده باشد", focus: "condition" },
            { it: "indica la fine del centro abitato", fa: "پایانِ شهر را نشان می‌دهد", verb: "indica ← indicare" },
          ],
          translation: "تابلوی تصویر اگر با یک خطِ قرمز خط خورده باشد، پایانِ شهر را نشان می‌دهد.",
          why: "درست است. خطِ قرمزِ مورب روی نامِ شهر یعنی از شهر بیرون آمده‌ای.",
        },
        {
          sourceId: "3164",
          sign: 183,
          textIt: "Il segnale raffigurato indica l'inizio del centro abitato",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "indica", fa: "نشان می‌دهد", verb: "indica ← indicare" },
            { it: "l'inizio del centro abitato", fa: "شروعِ شهر را", focus: "contrast" },
          ],
          translation: "تابلوی تصویر شروعِ شهر را نشان می‌دهد.",
          why: "غلط است. نام خط خورده است: این پایانِ شهر است.",
        },
      ],
      takeaway: "خطِ قرمزِ مورب همیشه یعنی «پایان».",
      rule: "DPR 495/1992 art. 131 c.6",
    },
  ],
  practice: [
    {
      sourceId: "3234",
      sign: 207,
      textIt: "Il segnale raffigurato è posto all'inizio del centro abitato, su tutte le strade d'ingresso alla località indicata",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "è posto all'inizio del centro abitato,", fa: "در ابتدای شهر نصب شده است،", verb: "è posto ← porre" },
        { it: "su tutte le strade d'ingresso alla località indicata", fa: "روی همه‌ی جاده‌های ورودی به شهرِ نوشته‌شده", focus: "always" },
      ],
      translation: "تابلوی تصویر در ابتدای شهر، روی همه‌ی جاده‌های ورودی به شهرِ نوشته‌شده نصب شده است.",
      why: "درست است (قدم ۱). از هر جاده‌ای وارد شوی، تابلوی نامِ شهر را می‌بینی.",
      rule: "DPR 495/1992 art. 131 c.5",
      conceptStep: 1,
    },
    {
      sourceId: "3161",
      sign: 183,
      textIt: "Il segnale raffigurato indica che per raggiungere Napoli bisogna percorrere la strada statale n. 190",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che per raggiungere Napoli", fa: "نشان می‌دهد که برای رسیدن به ناپل", verb: "indica ← indicare" },
        { it: "bisogna percorrere la strada statale n. 190", fa: "باید جاده‌ی ملیِ شماره‌ی ۱۹۰ را پیمود", focus: "contrast" },
      ],
      translation: "تابلوی تصویر نشان می‌دهد که برای رسیدن به ناپل باید جاده‌ی ملیِ شماره‌ی ۱۹۰ را پیمود.",
      why: "غلط است (قدم ۱). عددِ کنارِ نامِ شهر فاصله است: ۱۹۰ کیلومتر تا ناپل.",
      rule: "DPR 495/1992 art. 131 c.6",
      conceptStep: 1,
    },
    {
      sourceId: "3248",
      sign: 216,
      textIt: "Il segnale raffigurato si trova in vicinanza di un ponte che attraversa il fiume Arno",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "si trova in vicinanza di un ponte", fa: "نزدیکِ یک پل قرار دارد", verb: "si trova ← trovarsi" },
        { it: "che attraversa il fiume Arno", fa: "که از روی رودِ آرنو می‌گذرد", verb: "attraversa ← attraversare" },
      ],
      translation: "تابلوی تصویر نزدیکِ پلی قرار دارد که از روی رودِ آرنو می‌گذرد.",
      why: "درست است (قدم ۲). تابلوی نامِ رودخانه کنارِ پلِ روی آن است.",
      rule: "DPR 495/1992 art. 134 c.1, c.4",
      conceptStep: 2,
    },
    {
      sourceId: "3489",
      sign: 163,
      textIt: "Il segnale raffigurato obbliga ad arrestarsi alla frontiera con uno Stato dell'Unione Europea",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "obbliga ad arrestarsi", fa: "مجبور می‌کند بایستی", verb: "obbliga ← obbligare", focus: "always" },
        { it: "alla frontiera con uno Stato dell'Unione Europea", fa: "در مرز با یکی از کشورهای اتحادیه‌ی اروپا" },
      ],
      translation: "تابلوی تصویر مجبور می‌کند در مرز با یکی از کشورهای اتحادیه‌ی اروپا بایستی.",
      why: "غلط است (قدم ۲). تابلوی ستاره‌ها فقط مرز را خبر می‌دهد. ایست اجباری با ALT – DOGANA است (فصل ۴).",
      rule: "DPR 495/1992 art. 123",
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        "3153", "3154", "3155", "3156", "3157", "3158", "3159", "3160", "3161", "3162", "3163", "3164",
        "3232", "3233", "3234", "3235", "3236", "3237", "3238", "3239",
      ],
    },
    {
      step: 2,
      sourceIds: [
        "3248", "3249", "3251", "3252", "3253", "3254",
        "3482", "3483", "3484", "3485", "3486", "3487", "3488", "3489", "3490",
        "3491", "3492", "3493", "3494", "3495", "3496", "3497", "3498", "3499",
      ],
    },
  ],
};

// ── Lesson 7 ──────────────────────────────────────────────────────────────────

export const lessonTipoStradaLimiti: Lesson = {
  id: "tipo-strada-limiti",
  titleFa: "نوعِ جاده و سقفِ سرعت",
  titleIt: "STRADA EXTRAURBANA PRINCIPALE · VEICOLI A MOTORE · LIMITI GENERALI",
  minutes: 5,
  signs: [194, 228, 197],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس تابلوی شروعِ جاده‌ی برون‌شهریِ اصلی و تابلوی «جاده‌ی مخصوصِ وسایلِ موتوری» را می‌شناسی، می‌دانی خطِ قرمز روی آن‌ها یعنی پایان، و تابلوی سقف‌های سرعتِ عمومیِ ایتالیا (۵۰، ۹۰، ۱۱۰، ۱۳۰) را می‌خوانی.",
      why: "۳۱ سؤال. این تابلوها اطلاعاتی‌اند، ولی قاعده را عوض می‌کنند: از اینجا دوچرخه نمی‌آید، از اینجا سقفِ سرعت عوض می‌شود.",
    },
    {
      kind: "table",
      title: "دو تابلوی «نوعِ جاده»",
      body: "هر دو در ابتدای جاده‌اند؛ با خطِ قرمزِ مورب یعنی پایانِ همان جاده.",
      columns: ["قاعده"],
      rows: [
        { label: "برون‌شهریِ اصلی", it: "strada extraurbana principale", sign: 194, values: ["مثلِ تابلوی بزرگراه، ولی آبی. جاده‌ای با دو مسیرِ جدا (carreggiate separate). نه روگذر برای دور زدن، نه سربالایی، نه زیرگذر."] },
        { label: "فقط وسایلِ موتوری", it: "strada riservata ai veicoli a motore", sign: 228, values: ["جاده‌ای (غیر از بزرگراه) فقط برای وسایلِ موتوری. دوچرخه و هر وسیله‌ی بی‌موتور نه؛ اتوبوس و کامیون بله. نه فقط تاکسی، نه پارکینگِ سواری."] },
        { label: "خطِ قرمز", it: "barrato · fine", values: ["همان تابلو با خطِ قرمزِ مورب = پایانِ آن نوعِ جاده."] },
      ],
      takeaway: "تابلوی ابتدای جاده خبر می‌دهد چه جاده‌ای شروع شد؛ قاعده‌های آن جاده از همین‌جا معتبرند.",
      rule: "DPR 495/1992 art. 135 c.9, c.21–23; CdS art. 2 c.3 lett. B",
    },
    {
      kind: "table",
      title: "سقف‌های سرعتِ عمومی",
      body: "این تابلو بیشتر نزدیکِ مرز است، برای کسی که از خارج وارد ایتالیا می‌شود. چهار ردیف از بالا به پایین.",
      columns: ["سقف"],
      rows: [
        { label: "داخلِ شهر", it: "centri abitati", sign: 197, values: ["۵۰ km/h (ردیفِ اول، کنارِ نقشِ شهر)"] },
        { label: "برون‌شهریِ فرعی", it: "extraurbane secondarie", values: ["۹۰ km/h (کنارِ شهرِ خط‌خورده)"] },
        { label: "برون‌شهریِ اصلی", it: "extraurbane principali", values: ["۱۱۰ km/h (نشانِ آبیِ جاده‌ی اصلی)"] },
        { label: "بزرگراه", it: "autostrade", values: ["۱۳۰ km/h (نشانِ سبزِ بزرگراه)"] },
        { label: "چه نیست", it: "non sono minimi", values: ["حداکثرند، نه حداقل. در ورودیِ هر شهر نیست. ربطی به بزرگراه‌های بی‌عوارض ندارد."] },
      ],
      takeaway: "۵۰ · ۹۰ · ۱۱۰ · ۱۳۰ = شهر · برون‌شهریِ فرعی · برون‌شهریِ اصلی · بزرگراه.",
      rule: "DPR 495/1992 art. 135 c.27; CdS art. 142 c.1",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la strada extraurbana principale", fa: "جاده‌ی برون‌شهریِ اصلی" },
        { it: "le carreggiate separate", fa: "دو مسیرِ جدا از هم" },
        { it: "riservata ai veicoli a motore", fa: "مخصوصِ وسایلِ نقلیه‌ی موتوری" },
        { it: "i veicoli senza motore", fa: "وسایلِ بی‌موتور (دوچرخه، گاری…)" },
        { it: "il limite massimo di velocità", fa: "سقفِ سرعت (حداکثر)" },
        { it: "la frontiera", fa: "مرز" },
      ],
    },
    {
      kind: "trap",
      title: "۱۱۰ یا ۱۳۰؟",
      body: "دو جمله درباره‌ی سقفِ سرعت روی جاده‌ی برون‌شهریِ اصلی:",
      examples: [
        {
          sourceId: "3215",
          sign: 197,
          textIt: "Il segnale raffigurato indica in 110 km /h il limite massimo di velocità sulle strade extraurbane principali",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "indica in 110 km /h il limite massimo di velocità", fa: "سقفِ سرعت را ۱۱۰ کیلومتر بر ساعت نشان می‌دهد", verb: "indica ← indicare" },
            { it: "sulle strade extraurbane principali", fa: "در جاده‌های برون‌شهریِ اصلی" },
          ],
          translation: "تابلوی تصویر سقفِ سرعت در جاده‌های برون‌شهریِ اصلی را ۱۱۰ کیلومتر بر ساعت نشان می‌دهد.",
          why: "درست است. ردیفِ سوم: ۱۱۰ کنارِ نشانِ آبی.",
        },
        {
          sourceId: "3219",
          sign: 197,
          textIt: "Il segnale raffigurato indica in 130 km /h il limite massimo di velocità su strade extraurbane principali",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "indica in 130 km /h il limite massimo di velocità", fa: "سقفِ سرعت را ۱۳۰ کیلومتر بر ساعت نشان می‌دهد", verb: "indica ← indicare", focus: "contrast" },
            { it: "su strade extraurbane principali", fa: "در جاده‌های برون‌شهریِ اصلی" },
          ],
          translation: "تابلوی تصویر سقفِ سرعت در جاده‌های برون‌شهریِ اصلی را ۱۳۰ کیلومتر بر ساعت نشان می‌دهد.",
          why: "غلط است. ۱۳۰ مالِ بزرگراه است (نشانِ سبز).",
        },
      ],
      takeaway: "عدد را با نوعِ جاده جفت کن، نه با ترتیبی که در جمله آمده.",
      rule: "CdS art. 142 c.1",
    },
  ],
  practice: [
    {
      sourceId: "3202",
      sign: 194,
      textIt: "Il segnale raffigurato, se barrato, da una striscia rossa indica la fine di una strada extraurbana principale",
      answer: 1,
      chunks: [
        { it: "Il segnale raffigurato,", fa: "تابلوی تصویر،" },
        { it: "se barrato, da una striscia rossa", fa: "اگر با یک خطِ قرمز خط خورده باشد،", focus: "condition" },
        { it: "indica la fine di una strada extraurbana principale", fa: "پایانِ جاده‌ی برون‌شهریِ اصلی را نشان می‌دهد", verb: "indica ← indicare" },
      ],
      translation: "تابلوی تصویر، اگر با یک خطِ قرمز خط خورده باشد، پایانِ یک جاده‌ی برون‌شهریِ اصلی را نشان می‌دهد.",
      why: "درست است (قدم ۱). خطِ قرمزِ مورب همیشه پایان است.",
      rule: "DPR 495/1992 art. 135 c.22–23",
      conceptStep: 1,
    },
    {
      sourceId: "3324",
      sign: 228,
      textIt: "Il segnale raffigurato consente ad una bicicletta di percorrere quella strada",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "consente ad una bicicletta", fa: "به دوچرخه اجازه می‌دهد", verb: "consente ← consentire" },
        { it: "di percorrere quella strada", fa: "آن جاده را بپیماید" },
      ],
      translation: "تابلوی تصویر به دوچرخه اجازه می‌دهد آن جاده را بپیماید.",
      why: "غلط است (قدم ۱). جاده فقط برای وسایلِ موتوری است؛ دوچرخه موتور ندارد.",
      rule: "DPR 495/1992 art. 135 c.9",
      conceptStep: 1,
    },
    {
      sourceId: "3213",
      sign: 197,
      textIt: "Il segnale raffigurato indica nel primo riquadro in alto il limite massimo di velocità nei centri abitati",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica nel primo riquadro in alto", fa: "در اولین قاب از بالا نشان می‌دهد", verb: "indica ← indicare" },
        { it: "il limite massimo di velocità nei centri abitati", fa: "سقفِ سرعت در شهرها را" },
      ],
      translation: "تابلوی تصویر در اولین قاب از بالا سقفِ سرعت در شهرها را نشان می‌دهد.",
      why: "درست است (قدم ۲). ردیفِ اول: ۵۰ کنارِ نقشِ شهر.",
      rule: "DPR 495/1992 art. 135 c.27",
      conceptStep: 2,
    },
    {
      sourceId: "3221",
      sign: 197,
      textIt: "Il segnale raffigurato indica i limiti minimi di velocità che valgono in Italia",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica i limiti minimi di velocità", fa: "حداقلِ سرعت را نشان می‌دهد", verb: "indica ← indicare", focus: "contrast" },
        { it: "che valgono in Italia", fa: "که در ایتالیا معتبر است" },
      ],
      translation: "تابلوی تصویر حداقل‌های سرعتِ معتبر در ایتالیا را نشان می‌دهد.",
      why: "غلط است (قدم ۲). این‌ها سقف‌اند (حداکثر)، نه حداقل.",
      rule: "CdS art. 142 c.1",
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        "3201", "3202", "3203", "3204", "3205", "3206", "3207", "3208", "3209", "3210",
        "3316", "3317", "3318", "3319", "3320", "3321", "3322", "3323", "3324", "3325",
      ],
    },
    { step: 2, sourceIds: ["3211", "3212", "3213", "3214", "3215", "3216", "3217", "3218", "3219", "3220", "3221"] },
  ],
};

// ── Lesson 8 ──────────────────────────────────────────────────────────────────

export const lessonSensoUnicoSenzaUscita: Lesson = {
  id: "senso-unico-senza-uscita",
  titleFa: "یک‌طرفه و بن‌بست: خبر، نه دستور",
  titleIt: "SENSO UNICO · STRADA SENZA USCITA",
  minutes: 5,
  signs: [153, 152, 224, 225],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی تابلوهای یک‌طرفه (فلشِ رو به بالا و فلشِ افقی) چه خبری می‌دهند و چه دستوری نمی‌دهند، و تابلوی بن‌بست و پیش‌آگهی‌اش را درست می‌خوانی: بن‌بست برای وسایلِ نقلیه است، نه برای عابر.",
      why: "۳۷ سؤال. بانک این تابلوهای آبیِ مربع را با تابلوهای اجبار (فلش در دایره‌ی آبی) و منع عوض می‌کند.",
    },
    {
      kind: "table",
      title: "یک‌طرفه: کسی از روبه‌رو نمی‌آید",
      body: "این‌ها مربع یا مستطیلِ آبی‌اند، نه دایره. خبر می‌دهند جاده یک‌طرفه است؛ تو را به جهتی مجبور نمی‌کنند.",
      columns: ["قاعده"],
      rows: [
        { label: "فلشِ رو به بالا", it: "senso unico frontale", sign: 153, values: ["جاده‌ای که واردش می‌شوی از اینجا یک‌طرفه است. نه «فقط مستقیم برو»، نه منعِ پیچیدن، نه باریک شدن، نه حرکت در صف‌های موازی."] },
        { label: "فلشِ افقی", it: "senso unico parallelo", sign: 152, values: ["سرِ تقاطع: جاده‌ای که اگر به سمتِ فلش بپیچی واردش می‌شوی یک‌طرفه است. A یعنی اگر به چپ بپیچی؛ اجبار به پیچیدن نیست."] },
        { label: "نتیجه", it: "niente inversione di marcia", values: ["در جاده‌ی یک‌طرفه دور زدن ممنوع است، چون بعدش خلافِ جهت می‌رانی. از روبه‌رو هم خودرویی نمی‌بینی."] },
        { label: "چه نیست", it: "non è un parcheggio", values: ["پارکینگِ آزاد، پارک فقط سمتِ چپ یا سبقت از راست را خبر نمی‌دهد."] },
      ],
      takeaway: "مربعِ آبی با فلش = یک‌طرفه (خبر). دایره‌ی آبی با فلش = اجبار (فصل ۴).",
      rule: "DPR 495/1992 art. 135 c.24–25",
    },
    {
      kind: "table",
      title: "بن‌بست و پیش‌آگهی‌اش",
      body: "T با سرِ قرمز = جاده‌ای که برای وسایلِ نقلیه راهِ خروج ندارد. سرِ قرمز همیشه آن شاخه‌ای است که بن‌بست است.",
      columns: ["قاعده"],
      rows: [
        { label: "بن‌بست", it: "strada senza uscita", sign: 224, values: ["در ابتدای خودِ جاده‌ی بن‌بست. برای همه‌ی وسایلِ نقلیه، موتورسیکلت هم. عابر می‌تواند وارد شود."] },
        { label: "پیش‌آگهی", it: "preavviso di strada senza uscita", sign: 225, values: ["پیش از تقاطع: جاده‌ی سمتِ راست بن‌بست است. هم مستقیم مجاز است هم پیچیدن به راست."] },
        { label: "چه نیست", it: "non vieta", values: ["نه منعِ پارک، نه منعِ دور زدن، نه منعِ پیچیدن، نه ورود ممنوع برای عابر. نه کارگاه، نه تقاطعِ T، نه توقفگاه."] },
      ],
      takeaway: "بن‌بست خبر است: «اگر بروی، باید برگردی». هیچ‌چیز را منع نمی‌کند.",
      rule: "DPR 495/1992 art. 135 c.7",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il senso unico", fa: "یک‌طرفه" },
        { it: "frontale · parallelo", fa: "روبه‌رو · موازی (کنارِ تقاطع)" },
        { it: "l'inversione di marcia", fa: "دور زدن" },
        { it: "la strada senza uscita", fa: "بن‌بست" },
        { it: "senza sbocco", fa: "بی‌خروجی؛ بن‌بست" },
        { it: "vale anche per i motocicli", base: "valere", fa: "برای موتورسیکلت هم معتبر است" },
      ],
    },
    {
      kind: "trap",
      title: "یک‌طرفه یا اجبار؟",
      body: "دو جمله درباره‌ی تابلوی A (فلشِ افقی به چپ):",
      examples: [
        {
          sourceId: "2974",
          sign: 152,
          textIt: "Il segnale A di figura indica che svoltando a sinistra la strada è a senso unico",
          answer: 1,
          chunks: [
            { it: "Il segnale A di figura", fa: "تابلوی A در تصویر" },
            { it: "indica che svoltando a sinistra", fa: "نشان می‌دهد که اگر به چپ بپیچی", verb: "svoltando ← svoltare", focus: "condition" },
            { it: "la strada è a senso unico", fa: "جاده یک‌طرفه است" },
          ],
          translation: "تابلوی A در تصویر نشان می‌دهد که اگر به چپ بپیچی، جاده یک‌طرفه است.",
          why: "درست است. فلشِ افقی جهتِ جاده‌ی یک‌طرفه‌ی کناری را نشان می‌دهد.",
        },
        {
          sourceId: "2978",
          sign: 152,
          textIt: "Il segnale A di figura indica che è obbligatorio svoltare a sinistra",
          answer: 0,
          chunks: [
            { it: "Il segnale A di figura", fa: "تابلوی A در تصویر" },
            { it: "indica che è obbligatorio", fa: "نشان می‌دهد که اجباری است", verb: "indica ← indicare", focus: "always" },
            { it: "svoltare a sinistra", fa: "به چپ پیچیدن" },
          ],
          translation: "تابلوی A در تصویر نشان می‌دهد که پیچیدن به چپ اجباری است.",
          why: "غلط است. مستطیلِ آبی خبر است، نه دستور. اجبار با دایره‌ی آبی است.",
        },
      ],
      takeaway: "شکل را ببین: مربع یا مستطیلِ آبی خبر می‌دهد؛ دایره‌ی آبی دستور می‌دهد.",
      rule: "DPR 495/1992 art. 135 c.24",
    },
  ],
  practice: [
    {
      sourceId: "2966",
      sign: 153,
      textIt: "Il segnale raffigurato indica che dopo di esso è vietata l'inversione di marcia",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che dopo di esso", fa: "نشان می‌دهد که بعد از آن", verb: "indica ← indicare" },
        { it: "è vietata l'inversione di marcia", fa: "دور زدن ممنوع است" },
      ],
      translation: "تابلوی تصویر نشان می‌دهد که بعد از آن دور زدن ممنوع است.",
      why: "درست است (قدم ۱). در جاده‌ی یک‌طرفه دور زدن یعنی خلافِ جهت راندن.",
      rule: "DPR 495/1992 art. 135 c.25",
      conceptStep: 1,
    },
    {
      sourceId: "2968",
      sign: 153,
      textIt: "Il segnale raffigurato indica l'obbligo di proseguire diritto",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica l'obbligo", fa: "اجبار را نشان می‌دهد", verb: "indica ← indicare", focus: "always" },
        { it: "di proseguire diritto", fa: "به مستقیم رفتن" },
      ],
      translation: "تابلوی تصویر اجبار به مستقیم رفتن را نشان می‌دهد.",
      why: "غلط است (قدم ۱). مربعِ آبی با فلش یعنی یک‌طرفه. اجبارِ مستقیم دایره‌ی آبی است.",
      rule: "DPR 495/1992 art. 135 c.25",
      conceptStep: 1,
    },
    {
      sourceId: "3296",
      sign: 225,
      textIt: "Il segnale raffigurato consente la svolta a destra",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "consente", fa: "اجازه می‌دهد", verb: "consente ← consentire" },
        { it: "la svolta a destra", fa: "پیچیدن به راست را" },
      ],
      translation: "تابلوی تصویر پیچیدن به راست را اجازه می‌دهد.",
      why: "درست است (قدم ۲). فقط خبر می‌دهد جاده‌ی راست بن‌بست است؛ پیچیدن ممنوع نیست.",
      rule: "DPR 495/1992 art. 135 c.7",
      conceptStep: 2,
    },
    {
      sourceId: "3294",
      sign: 224,
      textIt: "Il segnale raffigurato vieta di entrare anche ai pedoni",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "vieta di entrare", fa: "ورود را ممنوع می‌کند", verb: "vieta ← vietare" },
        { it: "anche ai pedoni", fa: "حتی برای عابرِ پیاده", focus: "contrast" },
      ],
      translation: "تابلوی تصویر ورود را حتی برای عابرِ پیاده ممنوع می‌کند.",
      why: "غلط است (قدم ۲). بن‌بست فقط برای وسایلِ نقلیه است و چیزی را منع نمی‌کند.",
      rule: "DPR 495/1992 art. 135 c.7",
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        "2964", "2965", "2966", "2967", "2968", "2969", "2970", "2971", "2972",
        "2973", "2974", "2975", "2976", "2977", "2978", "2979", "2980", "2981", "2982",
      ],
    },
    {
      step: 2,
      sourceIds: [
        "3286", "3287", "3288", "3289", "3290", "3291", "3292", "3293", "3294",
        "3295", "3296", "3297", "3298", "3300", "3301", "3302", "3303", "3304",
      ],
    },
  ],
};
