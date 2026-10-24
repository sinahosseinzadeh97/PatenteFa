/**
 * src/content/lessons-pericolo.ts
 * Chapter 5 of the learning path: Segnali di pericolo (warning signs). Same
 * trust rules as src/content/lessons.ts — real bank statements by source_id
 * with text + answer snapshots, faithful translations, explicit
 * question → section mappings.
 *
 * Scope: 20 of the 38 warning signs, in four lessons — road profile (1–3),
 * bends and slopes (4–7, 17–18), railway and tram crossings (8–11, 13–14),
 * people and animals (15–16, 25–27). The other signs (narrowings, mobile
 * bridge, slippery road, loose chippings, falling rocks, traffic-light
 * warnings, wind, fire, aircraft, quay, two-way traffic, roundabout, general
 * danger) are left unmapped on purpose, as are taxonomy questions
 * ("è un segnale di …"), the composite (A)/(B) figures 901–923, tram
 * overtaking (Codice della Strada art. 148 c.7–9, out of scope as in chapter
 * 4) and the "cavalletti" questions.
 *
 * Review note (2026-10-24): every sign meaning and behaviour below is backed
 * by VERO/FALSO statements of the bank, cited by id. Normattiva was not
 * reachable from the build environment, so the article numbers in `rule`
 * were confirmed from secondary sources only (DPR 495/1992 artt. 81 c.7,
 * 84–88) and the law text was not re-read article by article. Where an
 * article number could not be confirmed, `rule` cites the warning-sign
 * articles as a range. Read against Normattiva before relying on the
 * citations.
 */
import type { Chapter, Lesson, SignRef } from "./lessons.js";

const DEFORMATA: SignRef = { sign: 1, nameIt: "STRADA DEFORMATA", nameFa: "جاده‌ی خراب" };
const DOSSO: SignRef = { sign: 2, nameIt: "DOSSO", nameFa: "برآمدگی" };
const CUNETTA: SignRef = { sign: 3, nameIt: "CUNETTA", nameFa: "فرورفتگی" };
const CURVA_DESTRA: SignRef = { sign: 4, nameIt: "CURVA PERICOLOSA A DESTRA", nameFa: "پیچِ خطرناک به راست" };
const DOPPIA_CURVA: SignRef = { sign: 6, nameIt: "DOPPIA CURVA, LA PRIMA A DESTRA", nameFa: "دو پیچ؛ اولی به راست" };
const PL_BARRIERE: SignRef = { sign: 8, nameIt: "PASSAGGIO A LIVELLO CON BARRIERE", nameFa: "گذرگاهِ راه‌آهن با راهبند" };
const PL_SENZA: SignRef = { sign: 9, nameIt: "PASSAGGIO A LIVELLO SENZA BARRIERE", nameFa: "گذرگاهِ راه‌آهنِ بی‌راهبند" };
const CROCE: SignRef = { sign: 10, nameIt: "CROCE DI S. ANDREA", nameFa: "صلیبِ سنت‌آندره: یک ریل" };
const DOPPIA_CROCE: SignRef = { sign: 11, nameIt: "DOPPIA CROCE DI S. ANDREA", nameFa: "صلیبِ دوتایی: چند ریل" };
const TRAM: SignRef = { sign: 14, nameIt: "ATTRAVERSAMENTO TRANVIARIO", nameFa: "تقاطع با خطِ تراموا" };
const PEDONI: SignRef = { sign: 15, nameIt: "ATTRAVERSAMENTO PEDONALE", nameFa: "گذرگاهِ عابرِ پیاده" };
const CICLABILE: SignRef = { sign: 16, nameIt: "ATTRAVERSAMENTO CICLABILE", nameFa: "گذرگاهِ دوچرخه" };
const DISCESA: SignRef = { sign: 17, nameIt: "DISCESA PERICOLOSA", nameFa: "سرازیریِ خطرناک" };
const SALITA: SignRef = { sign: 18, nameIt: "SALITA RIPIDA", nameFa: "سربالاییِ تند" };
const BAMBINI: SignRef = { sign: 25, nameIt: "BAMBINI", nameFa: "بچه‌ها" };
const DOMESTICI: SignRef = { sign: 26, nameIt: "ANIMALI DOMESTICI VAGANTI", nameFa: "حیواناتِ اهلی" };
const SELVATICI: SignRef = { sign: 27, nameIt: "ANIMALI SELVATICI VAGANTI", nameFa: "حیواناتِ وحشی" };

const SIGN = "Il segnale raffigurato";
const SIGN_FA = "تابلوی نشان‌داده‌شده";
const PRESENZA = "In presenza del segnale raffigurato";
const PRESENZA_FA = "وقتی این تابلو هست";
const PREANNUNCIA = { it: "preannuncia", fa: "از قبل خبر می‌دهد", verb: "preannuncia ← preannunciare" };

const DPR_PERICOLO = "DPR 495/1992, artt. 84–103 (segnali di pericolo)";

/** Italian inside Persian text, isolated so right-to-left layout never reorders it (U+2068 … U+2069). */
const lat = (text: string) => `\u2068${text}\u2069`;
/** The same, in Persian quotation marks. */
const q = (text: string) => `«${lat(text)}»`;

// ── Lesson 1 ──────────────────────────────────────────────────────────────────

const lessonProfilo: Lesson = {
  id: "dosso-cunetta",
  titleFa: "برآمدگی، فرورفتگی، جاده‌ی خراب",
  titleIt: "DOSSO · CUNETTA · STRADA DEFORMATA",
  minutes: 4,
  signs: [2, 3, 1],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی هر مثلثِ خطر چه می‌خواهد و معمولاً چقدر قبل از خطر نصب می‌شود، و سه تابلوی شبیه به هم را از هم جدا می‌کنی: برآمدگی، فرورفتگی و جاده‌ی خراب.",
      why:
        "تابلوهای خطر اولین فصلِ آزمون‌اند و بانک سؤال بیش از ۶۰۰ جمله درباره‌شان دارد. همین سه تابلو بیش از ۷۰ جمله دارند و تله‌ی اصلی‌شان یکی است: جمله‌ی یک تابلو را زیرِ تصویرِ تابلوی دیگر می‌گذارند.",
      rule: "DPR 495/1992, art. 81 c.7, art. 84",
    },
    {
      kind: "factors",
      title: "هر مثلثِ خطر: کجا و چه می‌خواهد",
      body:
        "مثلثِ سفید با حاشیه‌ی قرمز یعنی «جلوتر خطری هست». خودش دستورِ ممنوعیت نیست؛ خبر می‌دهد تا آماده باشی. ممنوعیت‌هایی مثل سبقت روی برآمدگی از قانونِ رانندگی می‌آیند، نه از خودِ مثلث. بانک سؤال درباره‌ی همه‌ی مثلث‌ها این‌ها را می‌پرسد:",
      columns: [
        {
          title: "درست (VERO)",
          items: [
            {
              fa: "معمولاً حدود ۱۵۰ متر قبل از شروعِ خطر نصب می‌شود",
              it: "si trova, in genere, 150 metri prima",
              sourceId: "538",
              sign: 1,
              textIt: "Il segnale raffigurato si trova, in genere, 150 metri prima di un tratto di strada con fondo irregolare",
              answer: 1,
            },
            {
              fa: "اگر زمینه‌اش زرد باشد، مالِ کارگاهِ جاده‌ای است",
              it: "se a fondo giallo, è usato in presenza di cantieri stradali",
              sourceId: "540",
              sign: 1,
              textIt: "Il segnale raffigurato, se a fondo giallo, è usato in presenza di cantieri stradali",
              answer: 1,
            },
            {
              fa: "ممکن است همراهِ تابلوی حداکثرِ سرعت بیاید",
              it: "può essere associato con un segnale di limite massimo di velocità",
              sourceId: "533",
              sign: 1,
              textIt: "Il segnale raffigurato può essere associato con un segnale di limite massimo di velocità",
              answer: 1,
            },
          ],
        },
        {
          title: "غلط (FALSO)",
          items: [
            {
              fa: "اگر فرورفتگی از دور پیدا باشد، کم کردنِ سرعت لازم نیست",
              it: "non è necessario rallentare se la cunetta presenta visibilità",
              sourceId: "603",
              sign: 3,
              textIt: "In presenza del segnale raffigurato non è necessario rallentare se la cunetta presenta visibilità",
              answer: 0,
            },
            {
              fa: "فقط وقتی خودرویی از روبه‌رو می‌آید باید سرعت را کم کنی",
              it: "rallentare solo se provengono veicoli dal senso opposto",
              sourceId: "560",
              sign: 1,
              textIt: "In presenza del segnale raffigurato è necessario rallentare solo se provengono veicoli dal senso opposto",
              answer: 0,
            },
            {
              fa: "وقتی دید کم است، کم کردنِ سرعت لازم نیست",
              it: "non è necessario rallentare in caso di scarsa visibilità",
              sourceId: "557",
              sign: 1,
              textIt: "In presenza del segnale raffigurato non è necessario rallentare in caso di scarsa visibilità",
              answer: 0,
            },
          ],
        },
      ],
      takeaway:
        "مثلثِ خطر یعنی «سرعت را کم کن و آماده باش»، همیشه؛ نه فقط وقتی کسی از روبه‌رو می‌آید یا دید کم است.",
      rule: "DPR 495/1992, art. 81 c.7, art. 84; Codice della Strada, art. 141",
    },
    {
      kind: "compare",
      title: "برآمدگی یا فرورفتگی؟ نیم‌رخِ جاده را بخوان",
      body: "شکلِ سیاهِ داخلِ مثلث نیم‌رخِ جاده است؛ انگار جاده را از کنار می‌بینی.",
      items: [DOSSO, CUNETTA],
      rows: [
        { label: "شکل", values: ["جاده بالا می‌رود و بعد پایین می‌آید.", "جاده پایین می‌رود و بعد بالا می‌آید."] },
        {
          label: "خطرِ اصلی",
          values: [
            "از بالای برآمدگی آن طرفش را نمی‌بینی: دید محدود است.",
            "ضربه به خودرو و کم شدنِ کنترل. در باران ممکن است آب، گل و آشغال تهِ آن جمع شود.",
          ],
        },
        {
          label: "چه کنی",
          values: [
            "سرعت را با دید تنظیم کن. همین تابلو برای سرعت‌گیرهای مصنوعی هم به کار می‌رود.",
            "سرعت را کم کن تا کنترلِ خودرو را حفظ کنی و به سیستمِ تعلیق آسیب نرسد؛ فرمان را محکم‌تر بگیر.",
          ],
        },
        {
          label: "ممنوع یا لازم",
          values: [
            "روی سربالایی‌اش، در جاده‌ی دوطرفه با فقط دو خط، سبقت ممنوع است. دور زدن هم ممنوع است، و توقف و پارک هم در سربالایی و هم در سرازیری‌اش.",
            "حتی اگر فرورفتگی از دور پیدا باشد، باز هم باید سرعت را کم کنی.",
          ],
        },
      ],
      takeaway:
        `خطرِ برآمدگی «ندیدن» است؛ خطرِ فرورفتگی «ضربه و آب». جایشان را عوض نکن: سربالایی و بعد سرازیری یعنی ${lat("DOSSO")}، سرازیری و بعد سربالایی یعنی ${lat("CUNETTA")}.`,
      rule: "DPR 495/1992, art. 85; Codice della Strada, artt. 148, 154, 158",
    },
    {
      kind: "compare",
      title: "جاده‌ی خراب: مشکل در آسفالت است، نه در شیب",
      body: "در تابلوی جاده‌ی خراب دو برآمدگیِ کوچک کنارِ هم کشیده شده، ولی معنی‌اش «چند برآمدگی پشتِ سرِ هم» نیست.",
      items: [DEFORMATA, DOSSO],
      rows: [
        { label: "یعنی", values: ["آسفالتِ خراب یا ناهموار؛ جاده در وضعِ بدی است.", "یک تغییرِ شیب که جلوی دید را می‌گیرد."] },
        {
          label: "چه کنی",
          values: [
            "سرعت را با وضعِ سطحِ جاده تنظیم کن و فرمان را محکم بگیر. ممکن است خودروهای روبه‌رو هم منحرف شوند. اگر یدک می‌کشی، آهسته‌تر برو.",
            "سرعت را با دید تنظیم کن.",
          ],
        },
        { label: "سبقت", values: ["این تابلو به‌تنهایی سبقت را ممنوع نمی‌کند.", "روی سربالایی، در جاده‌ی دوطرفه‌ی دوخطه، ممنوع است."] },
        {
          label: "اشتباه نگیر",
          values: ["نه برآمدگی است، نه فرورفتگی، نه «یک سری برآمدگی».", "جاده‌ی خراب یا ناهموار نیست."],
        },
      ],
      takeaway:
        `سه تابلوی سطحِ جاده: یک برآمدگی یعنی ${lat("DOSSO")}، یک فرورفتگی یعنی ${lat("CUNETTA")}، و سطحِ موج‌دار یعنی جاده‌ی خراب و ناهموار.`,
      rule: "DPR 495/1992, art. 85",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        {
          it: "preannuncia",
          base: "preannunciare",
          fa: "از قبل خبر می‌دهد",
          note: "جمله‌های این فصل اغلب با همین فعل شروع می‌شوند: «تابلو از قبل خبر می‌دهد که …».",
        },
        { it: "il dosso", fa: "برآمدگیِ جاده؛ سربالایی و بعد سرازیری" },
        { it: "la cunetta", fa: "فرورفتگیِ جاده؛ سرازیری و بعد سربالایی" },
        {
          it: "la strada deformata",
          fa: "جاده‌ی خراب؛ آسفالتِ ناهموار",
          note: `واژه‌های ${q("dissestata")} و ${q("in cattivo stato")} هم به همین معنی می‌آیند.`,
        },
        { it: "la pavimentazione", fa: "آسفالت؛ رویه‌ی جاده" },
        { it: "il fondo stradale", fa: "سطحِ جاده" },
        { it: "la visibilità limitata", fa: "دیدِ محدود" },
        { it: "a fondo giallo", fa: "با زمینه‌ی زرد؛ تابلوی موقتِ کارگاهِ جاده‌ای" },
      ],
    },
    {
      kind: "trap",
      title: "همان جمله، تصویرِ دیگر",
      body: "بانک سؤال یک جمله را زیرِ چند تصویر می‌گذارد. این دو جمله کلمه به کلمه یکی‌اند؛ فقط تابلو فرق دارد:",
      examples: [
        {
          sourceId: "561",
          sign: 2,
          textIt: "Il segnale raffigurato preannuncia un dosso",
          answer: 1,
          chunks: [{ it: SIGN, fa: SIGN_FA }, PREANNUNCIA, { it: "un dosso", fa: "از یک برآمدگی" }],
          translation: "تابلوی نشان‌داده‌شده از یک برآمدگی در جلو خبر می‌دهد.",
          why: "درست است: یک برآمدگیِ تنها، یعنی سربالایی و بعد سرازیری، همان DOSSO است.",
        },
        {
          sourceId: "552",
          sign: 1,
          textIt: "Il segnale raffigurato preannuncia un dosso",
          answer: 0,
          chunks: [{ it: SIGN, fa: SIGN_FA }, PREANNUNCIA, { it: "un dosso", fa: "از یک برآمدگی" }],
          translation: "تابلوی نشان‌داده‌شده از یک برآمدگی در جلو خبر می‌دهد.",
          why: `غلط است: این تصویر سطحِ موج‌دار را نشان می‌دهد، یعنی جاده‌ی خراب و ناهموار (${lat("STRADA DEFORMATA")})، نه یک برآمدگی.`,
        },
      ],
      takeaway: "اول تصویر را بخوان، بعد جمله را. جمله‌ای که زیرِ یک تابلو درست است، زیرِ تابلوی دیگر غلط است.",
    },
  ],
  practice: [
    {
      sourceId: "573",
      sign: 2,
      textIt: "Il segnale raffigurato preannuncia una cunetta",
      answer: 0,
      chunks: [{ it: SIGN, fa: SIGN_FA }, PREANNUNCIA, { it: "una cunetta", fa: "از یک فرورفتگی" }],
      translation: "تابلوی نشان‌داده‌شده از یک فرورفتگی در جلو خبر می‌دهد.",
      why: "غلط است. این تصویر یک برآمدگی است: جاده بالا می‌رود و بعد پایین می‌آید. فرورفتگی برعکس است.",
      rule: "DPR 495/1992, art. 85",
      conceptStep: 2,
    },
    {
      sourceId: "588",
      sign: 3,
      textIt: "Il segnale raffigurato si trova prima di un tratto in discesa seguito da uno in salita",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "si trova", fa: "قرار دارد", verb: "si trova ← trovarsi" },
        { it: "prima di un tratto in discesa", fa: "قبل از یک تکه سرازیری" },
        { it: "seguito da uno in salita", fa: "که بعدش یک سربالایی می‌آید" },
      ],
      translation: "تابلوی نشان‌داده‌شده قبل از یک تکه سرازیری قرار دارد که بعدش یک تکه سربالایی می‌آید.",
      why: "درست است. فرورفتگی (CUNETTA) یعنی جاده اول پایین می‌رود و بعد بالا می‌آید؛ همان نیم‌رخی که داخلِ مثلث کشیده شده.",
      rule: "DPR 495/1992, art. 85",
      conceptStep: 2,
    },
    {
      sourceId: "569",
      sign: 2,
      textIt:
        "In presenza del segnale raffigurato sono vietate la sosta e la fermata sia sul tratto in salita che su quello in discesa",
      answer: 1,
      chunks: [
        { it: PRESENZA, fa: PRESENZA_FA },
        { it: "sono vietate", fa: "ممنوع‌اند" },
        { it: "la sosta e la fermata", fa: "پارک و توقف" },
        { it: "sia sul tratto in salita", fa: "هم در تکه‌ی سربالایی" },
        { it: "che su quello in discesa", fa: "و هم در تکه‌ی سرازیری" },
      ],
      translation: "وقتی این تابلو هست، پارک و توقف هم در تکه‌ی سربالایی و هم در تکه‌ی سرازیری ممنوع‌اند.",
      why: "درست است. نزدیکِ برآمدگی دید محدود است و خودرویی که آنجا بایستد دیر دیده می‌شود؛ پس توقف و پارک در هر دو طرفش ممنوع است.",
      rule: "Codice della Strada, art. 158",
      conceptStep: 2,
    },
    {
      sourceId: "553",
      sign: 1,
      textIt: "Il segnale raffigurato preannuncia una cunetta o un dosso",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        PREANNUNCIA,
        { it: "una cunetta", fa: "از یک فرورفتگی" },
        { it: "o un dosso", fa: "یا یک برآمدگی" },
      ],
      translation: "تابلوی نشان‌داده‌شده از یک فرورفتگی یا یک برآمدگی در جلو خبر می‌دهد.",
      why: "غلط است. سطحِ موج‌دار یعنی آسفالتِ خراب و ناهموار. برآمدگی و فرورفتگی هر کدام تابلوی خودشان را دارند.",
      rule: "DPR 495/1992, art. 85",
      conceptStep: 3,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: ["533", "538", "540", "557", "560", "563", "602", "603"],
    },
    {
      step: 2,
      sourceIds: [
        // DOSSO (img 2)
        "561", "562", "564", "565", "566", "567", "568", "569", "572", "573",
        "577", "578", "579", "580", "583",
        // CUNETTA (img 3)
        "585", "586", "588", "589", "590", "591", "592", "593", "594", "595", "599", "600", "601", "605",
      ],
    },
    {
      step: 3,
      sourceIds: [
        // STRADA DEFORMATA (img 1)
        "532", "535", "536", "539", "541", "542", "543", "544", "545", "547", "548", "549", "550", "551",
        "552", "553", "554", "556", "558", "559",
        // DOSSO / CUNETTA read as a deformed road
        "574", "575", "576", "596", "597", "598",
      ],
    },
  ],
};

// ── Lesson 2 ──────────────────────────────────────────────────────────────────

const lessonCurve: Lesson = {
  id: "curve-pendenze",
  titleFa: "پیچ‌ها و شیب‌ها",
  titleIt: "CURVE · DISCESA · SALITA",
  minutes: 5,
  signs: [4, 5, 6, 7, 17, 18],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "از روی مثلث بفهمی جلوتر یک پیچ است یا دو پیچ و اولی به کدام طرف می‌رود؛ بدانی در پیچ چه کاری لازم است و چه کاری ممنوع؛ و سرازیریِ خطرناک را از سربالاییِ تند جدا کنی.",
      why:
        "بیش از ۱۳۰ جمله‌ی بانک درباره‌ی همین شش تابلوست. بیشترِ تله‌ها می‌گویند کاری در پیچ «مجاز است»: سبقت، دور زدن، دنده‌عقب یا توقف. هیچ‌کدام مجاز نیست.",
    },
    {
      kind: "compare",
      title: "یک پیچ یا دو پیچ؟",
      body:
        "مثلِ هر مثلثِ خطر، معمولاً ۱۵۰ متر قبل از شروعِ پیچ نصب می‌شوند. فلشِ داخلِ مثلث از پایین شروع می‌شود؛ اولین خمش جهتِ اولین پیچ است.",
      items: [CURVA_DESTRA, DOPPIA_CURVA],
      rows: [
        { label: "فلش", values: ["یک خم، به راست", "دو خمِ پشتِ سرِ هم؛ اولی به راست"] },
        { label: "یعنی", values: ["یک پیچِ خطرناک به راست", "دو پیچِ خطرناکِ پشتِ سرِ هم؛ اولی به راست"] },
        {
          label: "با پنل",
          values: [`پنلِ ${q("TORNANTE")}: پیچِ تند و برگشتی (سنجاقی)`, `پنلِ ${q("TORNANTI")}: چند پیچِ تند و برگشتی`],
        },
      ],
      takeaway:
        "تابلوی قرینه‌ی هر کدام، یعنی فلشی که اول به چپ خم می‌شود، برای پیچ به چپ است. تابلوی یک‌پیچ را با «یک سری پیچ» اشتباه نگیر.",
      rule: "DPR 495/1992, art. 81 c.7, art. 86",
    },
    {
      kind: "factors",
      title: "در پیچ: چه بکنی و چه نکنی",
      body:
        "قانون نزدیکِ پیچ‌ها چند کار را لازم می‌داند و چند کار را ممنوع می‌کند. بانک سؤال این‌ها را با هر چهار تابلوی پیچ می‌پرسد:",
      columns: [
        {
          title: "درست (VERO)",
          items: [
            {
              fa: "در جاده‌ی دوطرفه‌ی دوخطه، تا جای ممکن نزدیکِ لبه‌ی راست برو",
              it: "si deve circolare il più possibile vicino al margine destro",
              sourceId: "612",
              sign: 4,
              textIt:
                "In presenza del segnale raffigurato, posto su strada a doppio senso di circolazione e con due sole corsie, si deve circolare il più possibile vicino al margine destro",
              answer: 1,
            },
            {
              fa: "سرعت را با دید و تندیِ پیچ تنظیم کن",
              it: "regolare la velocità in relazione alla visibilità e al raggio della curva",
              sourceId: "640",
              sign: 5,
              textIt:
                "In presenza del segnale raffigurato è necessario regolare la velocità in relazione alla visibilità e al raggio della curva",
              answer: 1,
            },
            {
              fa: "در جاده‌ی خیس با دقتِ بیشتر از پیچ رد شو",
              it: "con più attenzione se la strada è bagnata",
              sourceId: "641",
              sign: 5,
              textIt: "In presenza del segnale raffigurato è necessario percorrere la curva con più attenzione se la strada è bagnata",
              answer: 1,
            },
            {
              fa: "سرعت را با بارِ خودرو هم تنظیم کن",
              it: "condizioni di carico del veicolo",
              sourceId: "669",
              sign: 6,
              textIt:
                "In presenza del segnale raffigurato è necessario regolare la velocità in relazione alle condizioni di carico del veicolo",
              answer: 1,
            },
          ],
        },
        {
          title: "غلط (FALSO)",
          items: [
            {
              fa: "برای گرفتنِ بهترِ پیچ به سمتِ چپِ جاده برو",
              it: "portarsi sulla parte sinistra della carreggiata",
              sourceId: "623",
              sign: 4,
              textIt:
                "Il segnale raffigurato, posto su una strada a doppio senso di circolazione, impone di portarsi sulla parte sinistra della carreggiata per affrontare meglio la curva",
              answer: 0,
            },
            {
              fa: "تا جای ممکن نزدیکِ خطِ سفیدِ وسطِ جاده برو",
              it: "il più possibile vicino alla striscia bianca che separa i sensi di marcia",
              sourceId: "626",
              sign: 4,
              textIt:
                "In presenza del segnale raffigurato si deve circolare il più possibile vicino alla striscia bianca che separa i sensi di marcia",
              answer: 0,
            },
            {
              fa: "توقفِ کوتاه در پیچ مجاز است",
              it: "consentito effettuare la fermata in curva",
              sourceId: "683",
              sign: 6,
              textIt: "In presenza del segnale raffigurato è consentito effettuare la fermata in curva",
              answer: 0,
            },
            {
              fa: "دور زدن مجاز است",
              it: "consentito effettuare l'inversione di marcia",
              sourceId: "655",
              sign: 5,
              textIt: "In presenza del segnale raffigurato è consentito effettuare l'inversione di marcia",
              answer: 0,
            },
            {
              fa: "دنده‌عقب مجاز است",
              it: "consentito effettuare manovre di retromarcia",
              sourceId: "656",
              sign: 5,
              textIt: "In presenza del segnale raffigurato è consentito effettuare manovre di retromarcia",
              answer: 0,
            },
            {
              fa: "فقط در پیچِ اول آهسته برو",
              it: "esclusivamente nella prima curva",
              sourceId: "682",
              sign: 6,
              textIt: "In presenza del segnale raffigurato è necessario tenere una velocità moderata esclusivamente nella prima curva",
              answer: 0,
            },
          ],
        },
      ],
      takeaway:
        `در پیچ: سمتِ راست بمان، آهسته برو، سبقت نگیر، نایست، دور نزن، دنده‌عقب نرو. با زاپاسِ موقت (${lat("ruotino")}) خیلی آهسته‌تر برو.`,
      rule: "Codice della Strada, artt. 141, 143, 148, 154, 158",
    },
    {
      kind: "compare",
      title: "سرازیری یا سربالایی؟",
      body:
        "هر دو تابلو درصدِ شیب را نشان می‌دهند. جهتِ شکلِ سیاه را بخوان: اگر از چپ به راست پایین می‌رود سرازیری است، اگر بالا می‌رود سربالایی.",
      items: [DISCESA, SALITA],
      rows: [
        { label: "عدد", values: ["درصدِ شیب است (مثلاً ۱۰٪)، نه حدِ سرعت.", "درصدِ شیبِ سربالایی است."] },
        {
          label: "ترمز",
          values: [
            "مسافتِ ترمز بلندتر می‌شود؛ فاصله‌ات را با خودروی جلویی کم نکن.",
            "مسافتِ ترمز بلندتر نمی‌شود؛ این جمله فقط زیرِ تابلوی سرازیری درست است.",
          ],
        },
        {
          label: "دنده",
          values: [
            "دنده‌ی سنگین (پایین) بگذار تا موتور هم ترمز کند. ترمزِ طولانی ترمزها را داغ می‌کند.",
            "با دنده‌ی سنگین (پایین) و با احتیاط بالا برو.",
          ],
        },
        {
          label: "اشتباه نکن",
          values: [
            "رانندگی با کلاچِ گرفته، گذاشتنِ دنده‌ی بالا و کم کردنِ سرعت فقط با ترمز، و «در باران کم‌خطرتر است»: همه غلط‌اند.",
            "رانندگی با کلاچِ گرفته غلط است.",
          ],
        },
      ],
      takeaway:
        "در سرازیری موتور را به کمکِ ترمز بیاور: دنده‌ی سنگین، ترمزهای کوتاه و فاصله‌ی بیشتر. کلاچِ گرفته یعنی موتور دیگر ترمز نمی‌کند.",
      rule: `${DPR_PERICOLO}; Codice della Strada, art. 141`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la curva pericolosa", fa: "پیچِ خطرناک" },
        { it: "il tornante", fa: "پیچِ تند و برگشتی (سنجاقی)", note: `جمعش ${q("i tornanti")} است.` },
        { it: "il margine destro", fa: "لبه‌ی راستِ جاده" },
        { it: "a doppio senso di circolazione", fa: "دوطرفه" },
        {
          it: "la corsia",
          fa: "خطِ عبور؛ لاین",
          note: `${q("con due sole corsie")} یعنی «فقط با دو خط»: یکی برای هر جهت.`,
        },
        { it: "l'inversione di marcia", fa: "دور زدن" },
        { it: "la retromarcia", fa: "دنده‌عقب" },
        { it: "la fermata", fa: "توقفِ کوتاه؛ مثلاً برای سوار یا پیاده کردنِ مسافر", note: `${q("la sosta")} یعنی پارک: ایستادنِ طولانی‌تر.` },
        { it: "la marcia bassa", fa: "دنده‌ی سنگین (پایین)", note: `${q("la marcia più alta")} برعکسش است: دنده‌ی بالا و سبک.` },
        { it: "la frizione abbassata", fa: "کلاچِ گرفته؛ پدالِ کلاچ پایین" },
        { it: "il ruotino", fa: "زاپاسِ کوچک و موقت" },
      ],
    },
    {
      kind: "trap",
      title: "یک کلمه در هر دو جمله: ruotino",
      body: "دیدنِ یک کلمه‌ی آشنا کافی نیست. این دو جمله‌ی بانک هر دو درباره‌ی زاپاسِ موقت‌اند؛ یکی درست است و یکی غلط:",
      examples: [
        {
          sourceId: "643",
          sign: 5,
          textIt:
            'In presenza del segnale raffigurato si deve viaggiare ad andatura particolarmente moderata se si circola con il "ruotino" (ruota di soccorso)',
          answer: 1,
          chunks: [
            { it: PRESENZA, fa: PRESENZA_FA },
            { it: "si deve viaggiare", fa: "باید رانندگی کرد", verb: "deve ← dovere" },
            { it: "ad andatura particolarmente moderata", fa: "با سرعتی خیلی ملایم" },
            { it: "se si circola", fa: "اگر رانندگی می‌کنی", focus: "condition", verb: "circola ← circolare" },
            { it: 'con il "ruotino" (ruota di soccorso)', fa: `با ${q("ruotino")} (زاپاسِ موقت)` },
          ],
          translation: `وقتی این تابلو هست، اگر با ${q("ruotino")} (زاپاسِ موقت) رانندگی می‌کنی، باید با سرعتی خیلی ملایم بروی.`,
          why: "درست است. زاپاسِ موقت باریک‌تر است و برای سرعتِ کم ساخته شده؛ در پیچ باید خیلی آهسته‌تر بروی.",
        },
        {
          sourceId: "657",
          sign: 5,
          textIt:
            'In presenza del segnale raffigurato non è consentito il transito ai veicoli con il "ruotino" (ruota di soccorso)',
          answer: 0,
          chunks: [
            { it: PRESENZA, fa: PRESENZA_FA },
            { it: "non è consentito il transito", fa: "عبور مجاز نیست", focus: "negation" },
            { it: 'ai veicoli con il "ruotino" (ruota di soccorso)', fa: `برای خودروهایی که ${q("ruotino")} (زاپاسِ موقت) دارند` },
          ],
          translation: `وقتی این تابلو هست، عبورِ خودروهایی که ${q("ruotino")} (زاپاسِ موقت) دارند مجاز نیست.`,
          why: "غلط است. مثلثِ خطر عبور را ممنوع نمی‌کند؛ با زاپاسِ موقت می‌توانی رد شوی، فقط باید خیلی آهسته بروی.",
        },
      ],
      takeaway:
        "کلمه‌ی آشنا جواب را نمی‌دهد. بپرس جمله درباره‌ی آن کلمه چه ادعایی دارد: «آهسته برو» درست است، «ممنوع است» غلط.",
    },
  ],
  practice: [
    {
      sourceId: "617",
      sign: 4,
      textIt: "Il segnale raffigurato preannuncia una serie di curve pericolose di cui la prima a destra",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        PREANNUNCIA,
        { it: "una serie di curve pericolose", fa: "از یک سری پیچِ خطرناک" },
        { it: "di cui la prima a destra", fa: "که اولی‌شان به راست است" },
      ],
      translation: "تابلوی نشان‌داده‌شده از یک سری پیچِ خطرناک خبر می‌دهد که اولی‌شان به راست است.",
      why: "غلط است. فلشِ این تابلو فقط یک خم دارد: یک پیچِ خطرناک به راست. برای دو پیچ، فلش دو خم دارد.",
      rule: "DPR 495/1992, art. 86",
      conceptStep: 1,
    },
    {
      sourceId: "666",
      sign: 6,
      textIt:
        "Su strada a due sole corsie e a doppio senso di circolazione, in presenza del segnale raffigurato si deve marciare il più possibile vicino al margine destro",
      answer: 1,
      chunks: [
        { it: "Su strada a due sole corsie", fa: "در جاده‌ای فقط با دو خط", focus: "limit" },
        { it: "e a doppio senso di circolazione,", fa: "و دوطرفه،" },
        { it: "in presenza del segnale raffigurato", fa: PRESENZA_FA },
        { it: "si deve marciare", fa: "باید رانندگی کرد", verb: "deve ← dovere" },
        { it: "il più possibile vicino al margine destro", fa: "تا جای ممکن نزدیکِ لبه‌ی راست" },
      ],
      translation:
        "در جاده‌ای فقط با دو خط و دوطرفه، وقتی این تابلو هست، باید تا جای ممکن نزدیکِ لبه‌ی راست رانندگی کرد.",
      why: "درست است. در پیچ، خودروی روبه‌رو را دیر می‌بینی؛ وقتی نزدیکِ لبه‌ی راست می‌مانی، جای کافی برای او می‌ماند.",
      rule: "Codice della Strada, art. 143",
      conceptStep: 2,
    },
    {
      sourceId: "627",
      sign: 4,
      textIt: "Il segnale raffigurato preannuncia un tratto di strada in cui è consentita la fermata, ma non la sosta",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        PREANNUNCIA,
        { it: "un tratto di strada", fa: "از تکه‌ای از جاده" },
        { it: "in cui è consentita la fermata,", fa: "که در آن توقفِ کوتاه مجاز است،" },
        { it: "ma non la sosta", fa: "ولی پارک نه", focus: "contrast" },
      ],
      translation: "تابلوی نشان‌داده‌شده از تکه‌ای از جاده خبر می‌دهد که در آن توقفِ کوتاه مجاز است، ولی پارک نه.",
      why: `غلط است. در پیچ هر دو ممنوع‌اند: هم توقفِ کوتاه (${lat("fermata")}) و هم پارک (${lat("sosta")}). خودرویی که در پیچ ایستاده دیر دیده می‌شود.`,
      rule: "Codice della Strada, art. 158",
      conceptStep: 2,
    },
    {
      sourceId: "874",
      sign: 17,
      textIt: "Il segnale raffigurato richiede di inserire una marcia adeguatamente bassa",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "richiede di inserire", fa: "از تو می‌خواهد بگذاری", verb: "richiede ← richiedere" },
        { it: "una marcia adeguatamente bassa", fa: "یک دنده‌ی به‌اندازه‌ی کافی سنگین" },
      ],
      translation: "تابلوی نشان‌داده‌شده از تو می‌خواهد یک دنده‌ی به‌اندازه‌ی کافی سنگین (پایین) بگذاری.",
      why: "درست است. در سرازیری، دنده‌ی سنگین باعث می‌شود موتور هم خودرو را ترمز کند؛ لازم نیست ترمز را طولانی بگیری و داغش کنی.",
      rule: `${DPR_PERICOLO}; Codice della Strada, art. 141`,
      conceptStep: 3,
    },
    {
      sourceId: "898",
      sign: 18,
      textIt: "Il segnale raffigurato preannuncia una discesa e ne specifica la pendenza",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        PREANNUNCIA,
        { it: "una discesa", fa: "از یک سرازیری" },
        { it: "e ne specifica la pendenza", fa: "و شیبش را مشخص می‌کند", verb: "specifica ← specificare" },
      ],
      translation: "تابلوی نشان‌داده‌شده از یک سرازیری خبر می‌دهد و شیبش را مشخص می‌کند.",
      why: "غلط است. این تابلوی سربالاییِ تند است: شکلِ سیاه از چپ به راست بالا می‌رود. نیمه‌ی دوم درست است (درصدِ شیب را نشان می‌دهد)، ولی سرازیری نیست.",
      rule: DPR_PERICOLO,
      conceptStep: 3,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        // CURVA PERICOLOSA A DESTRA / SINISTRA (img 4, 5)
        "606", "607", "608", "611", "617", "618", "620", "621", "622", "624",
        "633", "635", "636", "645", "647", "649", "651",
        // DOPPIA CURVA (img 6, 7)
        "658", "660", "664", "672", "673", "674", "675", "676", "677",
        "685", "687", "689", "697", "698", "699", "700", "701", "702",
      ],
    },
    {
      step: 2,
      sourceIds: [
        // Behaviour at bends: keep right, speed, no overtaking, stopping, U-turns or reversing
        "609", "610", "612", "613", "614", "616", "623", "626", "627", "629", "630",
        "634", "637", "638", "639", "640", "641", "643", "648", "653", "655", "656", "657",
        "659", "661", "665", "666", "667", "668", "669", "671", "679", "681", "682", "683",
        "686", "690", "691", "692", "693", "694", "696", "703", "705", "706", "707",
      ],
    },
    {
      step: 3,
      sourceIds: [
        // DISCESA PERICOLOSA (img 17)
        "869", "870", "872", "873", "874", "875", "876", "877", "878", "879",
        "880", "881", "882", "883", "884", "885", "886", "887", "888", "889",
        // SALITA RIPIDA (img 18)
        "891", "892", "893", "894", "895", "897", "898",
      ],
    },
  ],
};

// ── Lesson 3 ──────────────────────────────────────────────────────────────────

const lessonBinari: Lesson = {
  id: "passaggi-a-livello",
  titleFa: "قطار و تراموا",
  titleIt: "PASSAGGIO A LIVELLO · TRAM",
  minutes: 5,
  signs: [8, 9, 10, 11, 13, 14],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بدانی گذرگاهِ راه‌آهن راهبند دارد یا ندارد و در هر حالت کِی باید بایستی؛ ترتیبِ تابلوها را تا خودِ ریل بشناسی (پنل‌های راه‌راه، مثلث، صلیب)؛ و تابلوی قطار را با تابلوی تراموا اشتباه نگیری.",
      why:
        "بیش از ۱۰۰ جمله‌ی بانک درباره‌ی این شش تابلوست. بیشترشان ترتیب و جای تابلوها را می‌پرسند، یا اینکه کدام تابلو تعدادِ ریل‌ها را نشان می‌دهد.",
    },
    {
      kind: "compare",
      title: "با راهبند یا بی‌راهبند؟",
      body:
        `گذرگاهِ هم‌سطح (${lat("passaggio a livello")}) یعنی جایی که جاده و راه‌آهن هم‌سطح از روی هم رد می‌شوند. داخلِ مثلث را ببین: نرده یعنی راهبند، لوکوموتیو یعنی بی‌راهبند.`,
      items: [PL_BARRIERE, PL_SENZA],
      rows: [
        {
          label: "یعنی",
          values: [
            "گذرگاه با راهبندِ کامل (barriere) یا نیم‌راهبند (semibarriere)، با هر تعداد ریل.",
            "گذرگاهِ بی‌راهبند.",
          ],
        },
        {
          label: "بعد از تابلو",
          values: [
            "با راهبندِ کامل یک چراغِ قرمزِ ثابت؛ با نیم‌راهبند چراغ‌های قرمزِ چشمک‌زن. ممکن است زنگِ هشدارِ بسته شدنِ راهبند هم باشد.",
            "نزدیکِ ریل، تابلوی صلیبِ سنت‌آندره: ساده برای یک ریل، دوتایی برای بیش از یک ریل.",
          ],
        },
        {
          label: "کِی بایستی",
          values: [
            "وقتی چراغ‌های قرمز چشمک می‌زنند یا زنگِ هشدار کار می‌کند. چراغِ خاموش دلیلِ ایستادن نیست. هرگز از لای نیم‌راهبندهای بسته رد نشو.",
            "قبل از عبور مطمئن شو که از هیچ طرف قطاری نمی‌آید؛ اگر قطار می‌آید، قبل از خطِ توقف بایست.",
          ],
        },
        {
          label: "سرعت",
          values: [
            "آهسته کن تا اگر راهبند بسته است بتوانی بایستی.",
            "سرعت را با دیدِ خطِ راه‌آهن تنظیم کن و نهایتِ احتیاط را به کار ببر.",
          ],
        },
      ],
      takeaway:
        "در هر دو: روی ریل یا نزدیکِ آن نه توقف کن، نه پارک؛ و اگر ترافیکِ آن طرف نمی‌گذارد کامل رد شوی، واردِ گذرگاه نشو.",
      rule: "DPR 495/1992, art. 87; Codice della Strada, artt. 147, 158",
    },
    {
      kind: "sequence",
      title: "از ۱۵۰ متر تا ریل: ترتیبِ تابلوها",
      body:
        "قبل از هر گذرگاه، چه با راهبند چه بی‌راهبند، سه پنلِ راه‌راهِ قرمز می‌بینی: سه نوار، دو نوار، یک نوار؛ تقریباً در ۱۵۰، ۱۰۰ و ۵۰ متری. در گذرگاهِ بی‌راهبند، مثلث همراهِ پنلِ سه‌نواری است و بعد از پنل‌ها، درست کنارِ ریل، صلیبِ سنت‌آندره می‌آید:",
      lanes: [
        { from: PL_SENZA, to: CROCE, caption: "یک ریل: صلیبِ ساده، درست کنارِ ریل" },
        { from: PL_SENZA, to: DOPPIA_CROCE, caption: "بیش از یک ریل: صلیبِ دوتایی؛ ممکن است بیش از یک قطار رد شود" },
      ],
      takeaway:
        "ترتیب: مثلث با پنلِ سه‌نواری ← پنلِ دونواری ← پنلِ یک‌نواری ← صلیب کنارِ ریل. نوارها فاصله را می‌شمارند، نه ریل‌ها را. صلیب فقط مالِ گذرگاهِ بی‌راهبند است و ۱۵۰ متر قبل نیست؛ کنارِ خودِ ریل است.",
      rule: "DPR 495/1992, art. 87",
    },
    {
      kind: "compare",
      title: "قطار یا تراموا؟",
      body: "هر دو تابلو درباره‌ی ریل‌اند، ولی خطرشان فرق دارد.",
      items: [PL_SENZA, TRAM],
      rows: [
        { label: "داخلِ مثلث", values: ["لوکوموتیو", "تراموا"] },
        {
          label: "یعنی",
          values: [
            "گذرگاهِ راه‌آهنِ بی‌راهبند.",
            "خطِ تراموایی که از جاده رد می‌شود و چراغِ راهنمایی ندارد؛ هم داخل و هم بیرونِ شهر.",
          ],
        },
        {
          label: "چه کنی",
          values: [
            "آهسته کن تا اگر لازم شد قبل از ریل بایستی. بوق زدن لازم نیست.",
            "مواظب باش جلوی تراموا را نگیری. تراموا برای ایستادن مسافتِ بیشتری لازم دارد، و ترمز روی ریل چسبندگیِ چرخ‌ها را کم می‌کند.",
          ],
        },
        {
          label: "اشتباه نگیر",
          values: [
            "به تراموا ربطی ندارد و پنلِ TRAM هم ندارد.",
            "درباره‌ی اتوبوسِ برقی (filobus) نیست و حق تقدم به آن را اجباری نمی‌کند؛ گذرگاهِ راه‌آهن هم نیست.",
          ],
        },
      ],
      takeaway: "لوکوموتیو یعنی قطار و گذرگاهِ راه‌آهن؛ تراموا یعنی ریلی که داخلِ جاده است و با چراغ کنترل نمی‌شود.",
      rule: "DPR 495/1992, artt. 87–88",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il passaggio a livello", fa: "گذرگاهِ هم‌سطحِ راه‌آهن" },
        { it: "le barriere", fa: "راهبندِ کامل", note: `${q("le semibarriere")} یعنی نیم‌راهبند: فقط نیمی از جاده را می‌بندد.` },
        { it: "i binari", fa: "ریل‌ها", note: `مفردش ${q("il binario")} است.` },
        { it: "la croce di Sant'Andrea", fa: "صلیبِ سنت‌آندره؛ تابلوی ضربدری کنارِ ریل" },
        { it: "il pannello distanziometrico", fa: "پنلِ فاصله‌نما؛ پنل با نوارهای موربِ قرمز" },
        { it: "le luci rosse lampeggianti", fa: "چراغ‌های قرمزِ چشمک‌زن", note: `${q("luce rossa fissa")} یعنی چراغِ قرمزِ ثابت.` },
        { it: "sgomberare", fa: "کامل خالی کردن؛ کامل رد شدن از گذرگاه" },
        { it: "la linea tranviaria", fa: "خطِ تراموا" },
      ],
    },
    {
      kind: "trap",
      title: "کدام تابلو تعدادِ ریل‌ها را می‌گوید؟",
      body: "هر دو جمله درباره‌ی تعدادِ ریل‌ها (binari) است؛ یکی درست است و یکی غلط:",
      examples: [
        {
          sourceId: "775",
          sign: 11,
          textIt: "Il segnale raffigurato indica che la linea ferroviaria ha più di un binario",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "indica", fa: "نشان می‌دهد", verb: "indica ← indicare" },
            { it: "che la linea ferroviaria", fa: "که خطِ راه‌آهن" },
            { it: "ha più di un binario", fa: "بیش از یک ریل دارد", verb: "ha ← avere" },
          ],
          translation: "تابلوی نشان‌داده‌شده نشان می‌دهد که خطِ راه‌آهن بیش از یک ریل دارد.",
          why: "درست است. صلیبِ دوتایی یعنی بیش از یک ریل؛ ممکن است بیش از یک قطار رد شود.",
        },
        {
          sourceId: "796",
          sign: 13,
          textIt: "I pannelli raffigurati hanno tante barre diagonali quanti sono i binari del passaggio a livello",
          answer: 0,
          chunks: [
            { it: "I pannelli raffigurati", fa: "پنل‌های نشان‌داده‌شده" },
            { it: "hanno tante barre diagonali", fa: "به همان تعداد نوارِ مورب دارند", verb: "hanno ← avere" },
            { it: "quanti sono i binari del passaggio a livello", fa: "که گذرگاه ریل دارد" },
          ],
          translation: "پنل‌های نشان‌داده‌شده به تعدادِ ریل‌های گذرگاه نوارِ مورب دارند.",
          why: "غلط است. سه، دو و یک نوار فاصله تا گذرگاه را نشان می‌دهند (حدود ۱۵۰، ۱۰۰ و ۵۰ متر)، نه تعدادِ ریل‌ها را.",
        },
      ],
      takeaway: "فقط صلیب درباره‌ی ریل‌ها حرف می‌زند: ساده یعنی یک ریل، دوتایی یعنی بیشتر. نوارهای پنل فاصله را می‌شمارند.",
    },
  ],
  practice: [
    {
      sourceId: "725",
      sign: 8,
      textIt:
        "Il segnale raffigurato obbliga ad arrestarsi se le luci rosse poste in prossimità delle barriere o delle semibarriere sono spente",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "obbliga ad arrestarsi", fa: "مجبور می‌کند بایستی", verb: "obbliga ← obbligare" },
        { it: "se le luci rosse", fa: "اگر چراغ‌های قرمز", focus: "condition" },
        { it: "poste in prossimità delle barriere o delle semibarriere", fa: "که کنارِ راهبندها یا نیم‌راهبندها هستند" },
        { it: "sono spente", fa: "خاموش باشند" },
      ],
      translation:
        "تابلوی نشان‌داده‌شده مجبورت می‌کند بایستی، اگر چراغ‌های قرمزِ کنارِ راهبندها یا نیم‌راهبندها خاموش باشند.",
      why: "غلط است. وقتی باید بایستی که چراغ‌های قرمز روشن‌اند (چشمک می‌زنند) یا زنگِ هشدار کار می‌کند؛ چراغِ خاموش دلیلِ ایستادن نیست.",
      rule: "DPR 495/1992, art. 87; Codice della Strada, art. 147",
      conceptStep: 1,
    },
    {
      sourceId: "747",
      sign: 9,
      textIt: "In presenza del segnale raffigurato non è consentito sostare o fermarsi in prossimità o in corrispondenza dei binari",
      answer: 1,
      chunks: [
        { it: PRESENZA, fa: PRESENZA_FA },
        { it: "non è consentito", fa: "مجاز نیست", focus: "negation" },
        { it: "sostare o fermarsi", fa: "پارک کردن یا توقف کردن" },
        { it: "in prossimità o in corrispondenza dei binari", fa: "نزدیکِ ریل‌ها یا روی آن‌ها" },
      ],
      translation: "وقتی این تابلو هست، پارک کردن یا توقف کردن نزدیکِ ریل‌ها یا روی آن‌ها مجاز نیست.",
      why: "درست است. قانون توقف و پارک را روی گذرگاهِ راه‌آهن و نزدیکِ آن ممنوع می‌کند؛ خودرویی که آنجا ایستاده ممکن است سرِ راهِ قطار بماند.",
      rule: "Codice della Strada, art. 158",
      conceptStep: 1,
    },
    {
      sourceId: "770",
      sign: 10,
      textIt: "Il segnale raffigurato è posto prima del segnale PASSAGGIO A LIVELLO SENZA BARRIERE",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "è posto", fa: "نصب می‌شود" },
        { it: "prima del segnale", fa: "قبل از تابلوی" },
        { it: "PASSAGGIO A LIVELLO SENZA BARRIERE", fa: "گذرگاهِ بی‌راهبند" },
      ],
      translation: "تابلوی نشان‌داده‌شده قبل از تابلوی «گذرگاهِ بی‌راهبند» نصب می‌شود.",
      why: "غلط است. ترتیب برعکس است: اول مثلث (حدود ۱۵۰ متر قبل)، و صلیب آخر از همه، درست کنارِ ریل.",
      rule: "DPR 495/1992, art. 87",
      conceptStep: 2,
    },
    {
      sourceId: "792",
      sign: 13,
      textIt:
        "Il pannello con tre barre oblique rosse è il primo dei pannelli che si incontra quando ci si approssima ad un passaggio a livello",
      answer: 1,
      chunks: [
        { it: "Il pannello con tre barre oblique rosse", fa: "پنل با سه نوارِ موربِ قرمز" },
        { it: "è il primo dei pannelli", fa: "اولین پنل است" },
        { it: "che si incontra", fa: "که می‌بینی", verb: "si incontra ← incontrarsi" },
        { it: "quando ci si approssima", fa: "وقتی نزدیک می‌شوی", verb: "ci si approssima ← approssimarsi" },
        { it: "ad un passaggio a livello", fa: "به گذرگاهِ راه‌آهن" },
      ],
      translation: "پنل با سه نوارِ موربِ قرمز، اولین پنلی است که وقتی به گذرگاهِ راه‌آهن نزدیک می‌شوی می‌بینی.",
      why: "درست است. سه نوار دورترین پنل است (حدود ۱۵۰ متر)؛ بعد دو نوار و بعد یک نوار.",
      rule: "DPR 495/1992, art. 87",
      conceptStep: 2,
    },
    {
      sourceId: "817",
      sign: 14,
      textIt: "Il segnale raffigurato preannuncia un passaggio a livello ferroviario senza barriere",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        PREANNUNCIA,
        { it: "un passaggio a livello ferroviario", fa: "از یک گذرگاهِ راه‌آهن" },
        { it: "senza barriere", fa: "بی‌راهبند" },
      ],
      translation: "تابلوی نشان‌داده‌شده از یک گذرگاهِ راه‌آهنِ بی‌راهبند خبر می‌دهد.",
      why: "غلط است. این تصویرِ تراموا است: خطِ تراموایی که از جاده رد می‌شود. تابلوی گذرگاهِ بی‌راهبند لوکوموتیو دارد.",
      rule: "DPR 495/1992, artt. 87–88",
      conceptStep: 3,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        // PASSAGGIO A LIVELLO CON BARRIERE (img 8)
        "709", "710", "711", "712", "713", "715", "716", "718", "719", "720", "721",
        "724", "725", "726", "727", "728", "730", "731", "732", "733", "735",
        // PASSAGGIO A LIVELLO SENZA BARRIERE (img 9)
        "736", "738", "743", "744", "746", "747", "749", "751", "752",
        // DOPPIA CROCE: stop if a train is coming
        "773",
      ],
    },
    {
      step: 2,
      sourceIds: [
        // Where each sign stands
        "714", "729", "737", "740", "741", "742", "750",
        // CROCE DI S. ANDREA (img 10, 11)
        "760", "761", "762", "763", "766", "767", "768", "769", "770", "772",
        "774", "775", "776", "777", "780", "782", "783", "784", "785",
        // Distance panels (img 13)
        "787", "788", "789", "792", "793", "795", "796", "797",
      ],
    },
    {
      step: 3,
      sourceIds: [
        // Train or tram?
        "723", "745", "748", "753", "755", "758",
        // ATTRAVERSAMENTO TRANVIARIO (img 14), meaning and care only — not overtaking trams
        "799", "800", "801", "802", "803", "805", "806", "811", "812", "813", "815", "817", "818", "819", "825", "826",
      ],
    },
  ],
};

// ── Lesson 4 ──────────────────────────────────────────────────────────────────

const lessonPersone: Lesson = {
  id: "pedoni-bambini-animali",
  titleFa: "آدم‌ها و حیوان‌ها در جاده",
  titleIt: "PEDONI · CICLISTI · BAMBINI · ANIMALI",
  minutes: 4,
  signs: [15, 16, 25, 26, 27],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "مثلث‌هایی را که از آدم‌ها و حیوان‌ها خبر می‌دهند از هم جدا کنی و بدانی هر کدام چه می‌خواهد: راه دادن به عابر و دوچرخه‌سوار، آهسته رفتن کنارِ بچه‌ها، و آماده‌ی ایستادن بودن برای حیوان‌ها.",
      why:
        "حدود ۸۵ جمله‌ی بانک درباره‌ی این پنج تابلوست. تله‌های رایج: «باید بوق بزنی»، «فقط به کسی که از چپ می‌آید راه بده» و «عابر باید به خودرو راه بدهد».",
    },
    {
      kind: "compare",
      title: "گذرگاهِ عابر و گذرگاهِ دوچرخه",
      body: "هر دو تابلو از قبل خبر می‌دهند که جلوتر گذرگاهی با خط‌کشی هست. خودشان روی گذرگاه نصب نمی‌شوند.",
      items: [PEDONI, CICLABILE],
      rows: [
        {
          label: "کجا",
          values: [
            "بیرونِ شهر معمولاً ۱۵۰ متر قبل از گذرگاه؛ داخلِ شهر هم ممکن است باشد.",
            "معمولاً ۱۵۰ متر قبل از گذرگاهِ دوچرخه.",
          ],
        },
        {
          label: "چه کنی",
          values: [
            "آماده‌ی ایستادن باش و به عابرانی که روی خط‌کشی رد می‌شوند راه بده، از هر طرف که بیایند.",
            "آهسته برو و اگر لازم شد بایست تا دوچرخه‌سوارها رد شوند، از هر طرف که بیایند.",
          ],
        },
        {
          label: "سبقت و توقف",
          values: [
            "از خودرویی که برای عابر ایستاده یا آهسته کرده سبقت نگیر و مواظب باش به آن نزنی. روی خط‌کشی نه توقف کن، نه پارک.",
            "از خودرویی که برای دوچرخه‌سوارها ایستاده سبقت نگیر.",
          ],
        },
        {
          label: "غلط‌های رایج",
          values: [
            "بوق زدن اجباری نیست و عابر مجبور نیست به تو راه بدهد. راه ندادن به عابرِ روی خط‌کشی کسرِ امتیازِ گواهینامه دارد.",
            "بوق زدن اجباری نیست و دوچرخه‌سوار مجبور نیست به تو راه بدهد. شروعِ مسیرِ دوچرخه هم نیست.",
          ],
        },
      ],
      takeaway:
        "روی خط‌کشی حق تقدم با عابر و دوچرخه‌سوار است، نه با تو. تابلو ۱۵۰ متر زودتر خبر می‌دهد تا وقتِ آهسته کردن داشته باشی.",
      rule: "DPR 495/1992, art. 88; Codice della Strada, artt. 148, 158, 191",
    },
    {
      kind: "compare",
      title: "عابرِ پیاده یا بچه‌ها؟",
      body: "هر دو تابلو آدم نشان می‌دهند، ولی یکی از یک گذرگاه خبر می‌دهد و دیگری از یک منطقه.",
      items: [PEDONI, BAMBINI],
      rows: [
        { label: "داخلِ مثلث", values: ["یک آدم روی خط‌کشی", "دو بچه که می‌دوند"] },
        {
          label: "یعنی",
          values: ["گذرگاهِ عابرِ پیاده با خط‌کشی.", "جایی که بچه‌ها زیاد رفت‌وآمد می‌کنند: نزدیکِ مدرسه، زمینِ بازی یا پارک."],
        },
        {
          label: "مراقبِ چه باشی",
          values: [
            "عابرانی که روی خط‌کشی رد می‌شوند.",
            "حرکت‌های ناگهانی و بی‌احتیاطِ بچه‌ها؛ حتی بچه‌هایی که روی پیاده‌رو هستند.",
          ],
        },
        {
          label: "چه نیست",
          values: [
            "تابلوی محلِ رفت‌وآمدِ بچه‌ها نیست.",
            "گذرگاهِ عابر نیست، عبور را ممنوع نمی‌کند، عددِ سرعت (مثلاً ۳۰) ندارد و تابلوی پشتِ اتوبوسِ مدرسه هم نیست.",
          ],
        },
      ],
      takeaway:
        "عابر یعنی خط‌کشی؛ بچه‌ها یعنی منطقه. کنارِ بچه‌ها آهسته برو و از خودرویی که برای عبورِ بچه‌ها ایستاده سبقت نگیر.",
      rule: `${DPR_PERICOLO}; Codice della Strada, artt. 141, 148`,
    },
    {
      kind: "compare",
      title: "حیوانِ اهلی یا وحشی؟",
      body: "گاو یعنی حیواناتِ اهلی؛ گوزن یعنی حیواناتِ وحشی. هر دو ممکن است ناگهان جلوی خودرو بیایند.",
      items: [DOMESTICI, SELVATICI],
      rows: [
        {
          label: "یعنی",
          values: [
            "ممکن است حیواناتِ اهلی در جاده سرگردان باشند یا از آن رد شوند.",
            "ممکن است حیواناتِ وحشی ناگهان از جاده رد شوند.",
          ],
        },
        {
          label: "چه کنی",
          values: [
            "آهسته برو؛ اگر حیوان ترسید یا از جاده کنار نرفت، بایست.",
            "آهسته برو تا به حیوان نخوری؛ اگر ناگهان رد شد یا ترسید، بایست.",
          ],
        },
        {
          label: "غلط‌های رایج",
          values: [
            "بوقِ پشتِ سرِ هم برای دور کردنِ حیوان اجباری نیست. منطقه‌ی چرا یا جاده‌ی مخصوصِ حیوانات هم نیست.",
            "بوق اجباری نیست و لازم نیست وسطِ جاده بروی. ورودیِ پارکِ ملی یا باغ‌وحش هم نیست.",
          ],
        },
      ],
      takeaway: "حیوانِ ترسیده کارِ غیرمنتظره می‌کند. با هر دو تابلو آهسته برو و آماده‌ی ایستادن باش؛ بوق زدن راه‌حل نیست.",
      rule: `${DPR_PERICOLO}; Codice della Strada, art. 141`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'attraversamento pedonale", fa: "گذرگاهِ عابرِ پیاده" },
        { it: "le strisce pedonali", fa: "خط‌کشیِ عابرِ پیاده" },
        { it: "l'attraversamento ciclabile", fa: "گذرگاهِ دوچرخه" },
        {
          it: "il clacson",
          fa: "بوق",
          note: `در سؤال‌ها ${q("il segnalatore acustico")} و ${q("l'avvisatore acustico")} هم یعنی بوق.`,
        },
        { it: "i fanciulli", fa: "بچه‌ها", note: `کلمه‌ی رسمی‌ترِ ${q("bambini")}.` },
        { it: "il marciapiede", fa: "پیاده‌رو" },
        { it: "gli animali domestici", fa: "حیواناتِ اهلی", note: `${q("selvatici")} یعنی وحشی.` },
        { it: "dare segno di spavento", base: "dare", fa: "نشانه‌ی ترس نشان دادن" },
        { it: "vaganti", base: "vagare", fa: "سرگردان" },
      ],
    },
    {
      kind: "trap",
      title: "پیاده‌رو هم حساب است",
      body: "هر دو جمله درباره‌ی بچه‌هایی است که روی پیاده‌رو (marciapiede) هستند؛ یکی درست است و یکی غلط:",
      examples: [
        {
          sourceId: "986",
          sign: 25,
          textIt:
            "In presenza del segnale raffigurato è necessario moderare la velocità e prestare attenzione ai bambini anche se si trovano sui marciapiedi",
          answer: 1,
          chunks: [
            { it: PRESENZA, fa: PRESENZA_FA },
            { it: "è necessario moderare la velocità", fa: "لازم است سرعت را کم کرد" },
            { it: "e prestare attenzione ai bambini", fa: "و مراقبِ بچه‌ها بود" },
            { it: "anche se", fa: "حتی اگر", focus: "condition" },
            { it: "si trovano sui marciapiedi", fa: "روی پیاده‌رو باشند", verb: "si trovano ← trovarsi" },
          ],
          translation: "وقتی این تابلو هست، لازم است سرعت را کم کرد و مراقبِ بچه‌ها بود، حتی اگر روی پیاده‌رو باشند.",
          why: "درست است. بچه ممکن است در یک لحظه از پیاده‌رو به جاده بدود.",
        },
        {
          sourceId: "996",
          sign: 25,
          textIt:
            "In presenza del segnale raffigurato è necessario fare attenzione ai bambini sulla carreggiata e non a quelli sul marciapiede",
          answer: 0,
          chunks: [
            { it: PRESENZA, fa: PRESENZA_FA },
            { it: "è necessario fare attenzione", fa: "لازم است مراقب بود" },
            { it: "ai bambini sulla carreggiata", fa: "به بچه‌هایی که داخلِ سواره‌رو هستند" },
            { it: "e non a quelli sul marciapiede", fa: "و نه به آن‌هایی که روی پیاده‌رو هستند", focus: "negation" },
          ],
          translation: "وقتی این تابلو هست، لازم است مراقبِ بچه‌های داخلِ سواره‌رو بود، نه بچه‌هایی که روی پیاده‌رو هستند.",
          why: "غلط است. تابلو از تو می‌خواهد مراقبِ همه‌ی بچه‌ها باشی؛ بچه‌ی روی پیاده‌رو هم می‌تواند ناگهان واردِ جاده شود.",
        },
      ],
      takeaway:
        "کلمه یکی است، ادعا فرق دارد. تابلوی بچه‌ها یعنی مراقبِ همه‌ی بچه‌ها باش، نه فقط آن‌هایی که الان داخلِ جاده‌اند.",
    },
  ],
  practice: [
    {
      sourceId: "847",
      sign: 15,
      textIt: "In presenza del segnale raffigurato si deve dare la precedenza solo ai pedoni che attraversano da sinistra",
      answer: 0,
      chunks: [
        { it: PRESENZA, fa: PRESENZA_FA },
        { it: "si deve dare la precedenza", fa: "باید حق تقدم داد", verb: "deve ← dovere" },
        { it: "solo", fa: "فقط", focus: "limit" },
        { it: "ai pedoni che attraversano da sinistra", fa: "به عابرانی که از چپ رد می‌شوند", verb: "attraversano ← attraversare" },
      ],
      translation: "وقتی این تابلو هست، فقط باید به عابرانی که از چپ رد می‌شوند حق تقدم داد.",
      why: "غلط است. به هر عابری که روی خط‌کشی رد می‌شود باید راه بدهی، چه از چپ بیاید چه از راست.",
      rule: "Codice della Strada, art. 191",
      conceptStep: 1,
    },
    {
      sourceId: "831",
      sign: 15,
      textIt: "Il segnale raffigurato comporta il divieto di sorpassare un veicolo che si sia arrestato per far attraversare i pedoni",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "comporta il divieto", fa: "یعنی ممنوع است", verb: "comporta ← comportare" },
        { it: "di sorpassare un veicolo", fa: "سبقت گرفتن از خودرویی" },
        { it: "che si sia arrestato", fa: "که ایستاده", verb: "si sia arrestato ← arrestarsi" },
        { it: "per far attraversare i pedoni", fa: "تا عابران رد شوند" },
      ],
      translation: "تابلوی نشان‌داده‌شده یعنی سبقت گرفتن از خودرویی که ایستاده تا عابران رد شوند ممنوع است.",
      why: "درست است. خودروی ایستاده جلوی دیدت را می‌گیرد؛ ممکن است عابری درست جلوی آن در حالِ رد شدن باشد.",
      rule: "Codice della Strada, artt. 148, 191",
      conceptStep: 1,
    },
    {
      sourceId: "867",
      sign: 16,
      textIt: "In presenza del segnale raffigurato è necessario tenere presente che i ciclisti devono dare la precedenza ai veicoli",
      answer: 0,
      chunks: [
        { it: PRESENZA, fa: PRESENZA_FA },
        { it: "è necessario tenere presente", fa: "باید در نظر داشت" },
        { it: "che i ciclisti", fa: "که دوچرخه‌سوارها" },
        { it: "devono dare la precedenza ai veicoli", fa: "باید به خودروها حق تقدم بدهند", verb: "devono ← dovere" },
      ],
      translation: "وقتی این تابلو هست، باید در نظر داشت که دوچرخه‌سوارها باید به خودروها حق تقدم بدهند.",
      why: "غلط است. روی گذرگاهِ دوچرخه، این تو هستی که باید آماده‌ی ایستادن باشی و به دوچرخه‌سوارهایی که رد می‌شوند راه بدهی.",
      rule: "DPR 495/1992, art. 88",
      conceptStep: 1,
    },
    {
      sourceId: "990",
      sign: 25,
      textIt: "Il segnale raffigurato preannuncia un attraversamento pedonale",
      answer: 0,
      chunks: [{ it: SIGN, fa: SIGN_FA }, PREANNUNCIA, { it: "un attraversamento pedonale", fa: "از یک گذرگاهِ عابرِ پیاده" }],
      translation: "تابلوی نشان‌داده‌شده از یک گذرگاهِ عابرِ پیاده خبر می‌دهد.",
      why: "غلط است. دو بچه‌ی در حالِ دویدن یعنی منطقه‌ای که بچه‌ها زیاد رفت‌وآمد می‌کنند. تابلوی گذرگاهِ عابر یک آدم روی خط‌کشی را نشان می‌دهد.",
      rule: DPR_PERICOLO,
      conceptStep: 2,
    },
    {
      sourceId: "1004",
      sign: 26,
      textIt:
        "In presenza del segnale raffigurato è obbligatorio usare ripetutamente l'avvisatore acustico per allontanare gli animali",
      answer: 0,
      chunks: [
        { it: PRESENZA, fa: PRESENZA_FA },
        { it: "è obbligatorio usare ripetutamente", fa: "واجب است پشتِ سرِ هم استفاده کنی" },
        { it: "l'avvisatore acustico", fa: "از بوق" },
        { it: "per allontanare gli animali", fa: "تا حیوان‌ها را دور کنی" },
      ],
      translation: "وقتی این تابلو هست، واجب است برای دور کردنِ حیوان‌ها پشتِ سرِ هم بوق بزنی.",
      why: "غلط است. بانک سؤال کارِ درست را این می‌داند: آهسته برو، و اگر حیوان ترسید یا از جاده کنار نرفت، بایست.",
      rule: `${DPR_PERICOLO}; Codice della Strada, art. 141`,
      conceptStep: 3,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        // ATTRAVERSAMENTO PEDONALE (img 15)
        "827", "828", "829", "830", "831", "832", "833", "834", "835", "836", "838", "839", "840", "841",
        "842", "843", "844", "845", "846", "847", "848", "849", "850",
        // ATTRAVERSAMENTO CICLABILE (img 16)
        "851", "853", "854", "855", "856", "857", "858", "859", "860", "862", "863", "864", "865", "866", "867", "868",
      ],
    },
    {
      step: 2,
      sourceIds: [
        "837",
        // BAMBINI (img 25)
        "978", "979", "980", "982", "983", "984", "985", "986", "987", "988", "989",
        "990", "991", "992", "993", "994", "995", "996", "997", "998",
      ],
    },
    {
      step: 3,
      sourceIds: [
        // ANIMALI DOMESTICI (img 26)
        "999", "1000", "1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008",
        // ANIMALI SELVATICI (img 27)
        "1009", "1010", "1011", "1012", "1013", "1014", "1015", "1016", "1017", "1018", "1019", "1020",
      ],
    },
  ],
};

export const PERICOLO_CHAPTER: Chapter = {
  id: "segnali-pericolo",
  topicIds: [1],
  nameIt: "Segnali di pericolo",
  titleFa: "تابلوهای خطر",
  summaryFa:
    "مثلث‌هایی که از خطرِ جلوتر خبر می‌دهند. چهار درس کوتاه: برآمدگی و فرورفتگی، پیچ و شیب، قطار و تراموا، آدم‌ها و حیوان‌ها.",
  reviewedOn: "2026-10-24",
  sources: [
    {
      label: "Codice della Strada (D.Lgs. 285/1992), artt. 141, 143, 147, 148, 154, 158, 191",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    {
      label: "Regolamento di esecuzione (DPR 495/1992), artt. 81 c.7, 84–88 (segnali di pericolo)",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1992-12-16;495",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), segnali di pericolo (source_id 532–1193)",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [lessonProfilo, lessonCurve, lessonBinari, lessonPersone],
};
