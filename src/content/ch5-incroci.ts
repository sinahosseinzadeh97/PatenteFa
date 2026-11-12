/**
 * src/content/ch5-incroci.ts
 * Chapter 5 (Segnali di precedenza), new lessons 6, 7 and 9: the T-junction
 * signs (48, 49), the merge signs (50, 51), and what wins when a precedence
 * sign meets a traffic light or a traffic officer.
 *
 * Trust rules as in src/content/lessons.ts: every statement is a real bank
 * row (text, answer key and image snapshotted, checked by
 * tests/chapter5.test.ts and `npm run verify:lessons`); `translation` keeps
 * the claim's polarity; `related` maps each question to the one section that
 * teaches its fact. Classify items are original examples, never bank rows.
 */
import type { Lesson } from "./lessons.js";
import { CONFLUENZA_DESTRA, CONFLUENZA_SINISTRA, PRESENZA, SIGN, SIGN_FA, T_DESTRA, T_SINISTRA } from "./ch5-signs.js";

const SEMAFORO = "In presenza del segnale raffigurato e del semaforo a tre luci";
const SEMAFORO_FA = "وقتی این تابلو و چراغ راهنمایی سه‌رنگ هر دو هستند،";

// ── Lesson 6 ──────────────────────────────────────────────────────────────────

export const lessonIntersezioniT: Lesson = {
  id: "intersezioni-a-t",
  titleFa: "تقاطع T: فرعی فقط از یک طرف",
  titleIt: "INTERSEZIONE A T · DESTRA · SINISTRA",
  minutes: 4,
  signs: [48, 49, 50, 224],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس از روی دو تابلوی T می‌گویی جاده‌ی فرعی از کدام طرف می‌رسد، حق تقدم با کیست و چه چیزهایی را نباید به این تابلوها نسبت بدهی: بن‌بست، ممنوعیت گردش، ورود با خط شتاب.",
      why: "این دو تابلو نسخه‌ی یک‌طرفه‌ی تابلوی ۴۷ (درس ۴) هستند. ۲۲ سؤال بانک درباره‌ی آن‌هاست و نیمی از آن‌ها تابلو را با چیز دیگری قاطی می‌کنند.",
    },
    {
      kind: "compare",
      title: "خط پهن تویی، خط باریک فرعی است",
      items: [T_DESTRA, T_SINISTRA],
      rows: [
        { label: "نماد", values: ["خط پهنِ عمودی = جاده‌ی تو؛ خط باریک از راست به آن می‌رسد.", "همان؛ خط باریک از چپ می‌رسد."] },
        {
          label: "یعنی",
          values: [
            "جاده‌ای کم‌اهمیت‌تر و بدون حق تقدم از راست وارد می‌شود. حق تقدم با توست؛ روی آن فرعی DARE PRECEDENZA یا STOP هست.",
            "همین، وقتی فرعی از چپ می‌آید: نسبت به خودروهای سمت چپ حق تقدم داری.",
          ],
        },
        {
          label: "تو چه می‌کنی",
          values: [
            "احتیاط کن، چون به تقاطع نزدیک می‌شوی؛ نه موظفی بایستی، نه به خودروی سمت راست راه بدهی.",
            "همین.",
          ],
        },
        { label: "کجا", values: ["معمولاً ۱۵۰ متر قبل از تقاطع، روی جاده‌ی اصلی.", "همان."] },
      ],
      takeaway: "تابلوی T همان پیامِ ۴۷ را دارد («حق تقدم با توست»)، فقط می‌گوید فرعی از کدام طرف می‌آید.",
      rule: "DPR 495/1992 art. 112 c.1–3 (figg. II.43/b–c); Codice della Strada art. 145 c.1",
    },
    {
      kind: "table",
      title: "با این‌ها اشتباه نگیر",
      body: "جمله‌های غلطِ این دو تابلو معمولاً آن‌ها را به چیز دیگری نسبت می‌دهند. خط باریک یک جاده‌ی واقعی است که به جاده‌ی تو وصل می‌شود؛ همین.",
      columns: ["چرا غلط است"],
      rows: [
        { label: "بن‌بست", it: "STRADA SENZA USCITA", sign: 224, values: ["بن‌بست تابلوی اطلاعاتیِ خودش را دارد. خط باریکِ T جاده‌ای است که از آن خودرو می‌آید."] },
        { label: "ممنوعیت گردش", it: "DIVIETO DI SVOLTA", values: ["تابلوی T چیزی را ممنوع نمی‌کند؛ ممنوعیت گردش دایره‌ی قرمز است (فصل ۳)."] },
        { label: "ورود با خط شتاب", it: "CONFLUENZA", sign: 50, values: ["وقتی فرعی با زاویه و خط شتاب وارد می‌شود، تابلویش confluenza است (درس ۷)، نه T. «ورود از راست» هم تابلوی ۵۰ است، نه ۴۹."] },
        { label: "آزادراه", values: ["آزادراه تقاطع T ندارد؛ این تابلو روی رمپ یا خط شتابِ آزادراه نصب نمی‌شود."] },
        { label: "جای توقف یا ریل", values: ["از جاده خبر می‌دهد، نه از جای توقفِ کنار جاده یا ریلِ بن‌بست."] },
      ],
      takeaway: "هر جمله‌ای که تابلوی T را بن‌بست، ممنوعیت، ورود با خط شتاب یا آزادراه بخواند غلط است.",
      rule: "DPR 495/1992 art. 112 c.2",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "si incrocia", fa: "قطع می‌شود؛ تلاقی می‌کند", base: "incrociarsi" },
        { it: "di minore importanza", fa: "کم‌اهمیت‌تر؛ فرعی" },
        { it: "si immette", fa: "وارد می‌شود", base: "immettersi" },
        { it: "la strada senza uscita", fa: "بن‌بست" },
        { it: "la svolta", fa: "گردش؛ پیچیدن" },
        { it: "il binario morto", fa: "ریلِ بن‌بست" },
        { it: "la piazzola di sosta", fa: "جای توقفِ کنار جاده" },
      ],
    },
    {
      kind: "trap",
      title: "«veicoli provenienti da destra»: حق تقدم داری یا باید بایستی؟",
      body: "هر دو جمله درباره‌ی تابلوی فرعی از راست‌اند و هر دو از «خودروهایی که از راست می‌آیند» حرف می‌زنند:",
      examples: [
        {
          sourceId: "2304",
          sign: 48,
          textIt: "Il segnale raffigurato preannuncia un incrocio in cui il conducente ha la precedenza sui veicoli provenienti da destra",
          answer: 1,
          chunks: [
            { it: "Il segnale raffigurato preannuncia un incrocio", fa: "تابلوی نشان‌داده‌شده از تقاطعی خبر می‌دهد", verb: "preannuncia ← preannunciare" },
            { it: "in cui il conducente ha la precedenza", fa: "که در آن راننده حق تقدم دارد", verb: "ha ← avere" },
            { it: "sui veicoli provenienti da destra", fa: "نسبت به خودروهایی که از راست می‌آیند" },
          ],
          translation: "تابلوی نشان‌داده‌شده از تقاطعی خبر می‌دهد که در آن راننده نسبت به خودروهایی که از راست می‌آیند حق تقدم دارد.",
          why: "درست است. فرعی از راست می‌آید و آن‌ها باید به تو راه بدهند.",
        },
        {
          sourceId: "2309",
          sign: 48,
          textIt:
            "Il segnale raffigurato preannuncia un incrocio in cui il conducente ha l’obbligo di fermarsi e dare precedenza ai veicoli provenienti da destra",
          answer: 0,
          chunks: [
            { it: "Il segnale raffigurato preannuncia un incrocio", fa: "تابلوی نشان‌داده‌شده از تقاطعی خبر می‌دهد", verb: "preannuncia ← preannunciare" },
            { it: "in cui il conducente ha l’obbligo di fermarsi", fa: "که در آن راننده مجبور است بایستد", focus: "contrast" },
            { it: "e dare precedenza ai veicoli provenienti da destra", fa: "و به خودروهایی که از راست می‌آیند حق تقدم بدهد" },
          ],
          translation: "تابلوی نشان‌داده‌شده از تقاطعی خبر می‌دهد که در آن راننده مجبور است بایستد و به خودروهایی که از راست می‌آیند حق تقدم بدهد.",
          why: "غلط است. برعکس: آن‌ها باید بایستند یا راه بدهند، نه تو.",
        },
      ],
      takeaway: "«da destra» در هر دو جمله هست. تصمیم را جهتِ حق تقدم می‌گیرد: با تابلوی T، تو حق تقدم داری.",
    },
  ],
  practice: [
    {
      sourceId: "2300",
      sign: 48,
      textIt: "Il segnale raffigurato preannuncia un incrocio con una strada secondaria che si immette da destra",
      answer: 1,
      chunks: [
        { it: "Il segnale raffigurato preannuncia un incrocio", fa: "تابلوی نشان‌داده‌شده از تقاطعی خبر می‌دهد", verb: "preannuncia ← preannunciare" },
        { it: "con una strada secondaria", fa: "با یک جاده‌ی فرعی" },
        { it: "che si immette da destra", fa: "که از راست وارد می‌شود", verb: "si immette ← immettersi" },
      ],
      translation: "تابلوی نشان‌داده‌شده از تقاطع با یک جاده‌ی فرعی خبر می‌دهد که از راست وارد می‌شود.",
      why: "درست است (قدم ۱). خط باریک از راست = فرعی از راست.",
      rule: "DPR 495/1992 art. 112 c.2 (fig. II.43/b)",
      conceptStep: 1,
    },
    {
      sourceId: "2316",
      sign: 49,
      textIt: "Il segnale raffigurato preannuncia un incrocio in cui si ha la precedenza sui veicoli provenienti da sinistra",
      answer: 1,
      chunks: [
        { it: "Il segnale raffigurato preannuncia un incrocio", fa: "تابلوی نشان‌داده‌شده از تقاطعی خبر می‌دهد", verb: "preannuncia ← preannunciare" },
        { it: "in cui si ha la precedenza", fa: "که در آن حق تقدم داری" },
        { it: "sui veicoli provenienti da sinistra", fa: "نسبت به خودروهایی که از چپ می‌آیند" },
      ],
      translation: "تابلوی نشان‌داده‌شده از تقاطعی خبر می‌دهد که در آن نسبت به خودروهایی که از چپ می‌آیند حق تقدم داری.",
      why: "درست است (قدم ۱). فرعی از چپ می‌آید و باید به تو راه بدهد.",
      rule: "DPR 495/1992 art. 112 c.2–3 (fig. II.43/c)",
      conceptStep: 1,
    },
    {
      sourceId: "2313",
      sign: 49,
      textIt: "Il segnale raffigurato prescrive di usare prudenza perché ci si sta avvicinando ad un incrocio",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "prescrive di usare prudenza", fa: "دستور می‌دهد احتیاط کنی", verb: "prescrive ← prescrivere" },
        { it: "perché", fa: "چون", focus: "reason" },
        { it: "ci si sta avvicinando ad un incrocio", fa: "داری به یک تقاطع نزدیک می‌شوی", verb: "avvicinando ← avvicinarsi" },
      ],
      translation: "تابلوی نشان‌داده‌شده دستور می‌دهد احتیاط کنی، چون داری به یک تقاطع نزدیک می‌شوی.",
      why: "درست است (قدم ۱). هم ادعا درست است و هم دلیلش: حق تقدم داشتن احتیاط را حذف نمی‌کند.",
      rule: "DPR 495/1992 art. 112 c.1; Codice della Strada art. 145 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2306",
      sign: 48,
      textIt: "Il segnale raffigurato vieta la svolta a destra",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "vieta la svolta a destra", fa: "گردش به راست را ممنوع می‌کند", focus: "contrast", verb: "vieta ← vietare" },
      ],
      translation: "تابلوی نشان‌داده‌شده گردش به راست را ممنوع می‌کند.",
      why: "غلط است (قدم ۲). این تابلو از یک فرعی خبر می‌دهد؛ چیزی را ممنوع نمی‌کند.",
      rule: "DPR 495/1992 art. 112 c.2",
      conceptStep: 2,
    },
    {
      sourceId: "2320",
      sign: 49,
      textIt: "Il segnale raffigurato preannuncia una confluenza a destra",
      answer: 0,
      chunks: [
        { it: "Il segnale raffigurato preannuncia", fa: "تابلوی نشان‌داده‌شده از قبل خبر می‌دهد", verb: "preannuncia ← preannunciare" },
        { it: "una confluenza a destra", fa: "از ورودِ (با خط شتاب) از راست", focus: "contrast" },
      ],
      translation: "تابلوی نشان‌داده‌شده از قبل از یک ورود از راست خبر می‌دهد.",
      why: "غلط است (قدم ۲). دو اشتباه دارد: فرعیِ این تابلو از چپ است، و تقاطع T است، نه ورود با خط شتاب.",
      rule: "DPR 495/1992 art. 112 c.2",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2299", "2300", "2301", "2303", "2304", "2309", "2311", "2312", "2313", "2315", "2316"] },
    { step: 2, sourceIds: ["2305", "2306", "2307", "2308", "2310", "2317", "2318", "2319", "2320", "2321", "2322"] },
  ],
};

// ── Lesson 7 ──────────────────────────────────────────────────────────────────

export const lessonConfluenze: Lesson = {
  id: "confluenze",
  titleFa: "ورود با خط شتاب: کسی کنارت وارد می‌شود",
  titleIt: "CONFLUENZA · DESTRA · SINISTRA",
  minutes: 4,
  signs: [50, 51, 47],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس دو تابلوی confluenza را می‌شناسی: از کدام طرف خودرو با خط شتاب وارد جاده‌ی تو می‌شود، چه کسی باید راه بدهد، و این تابلو کجا ایستاده است (جاده‌ی اصلی، آزادراه، نه روی رمپ).",
      why: "این‌ها هم شکلی از تابلوی ۴۷ هستند، این بار برای ورودِ مورب با خط شتاب. ۲۴ سؤال بانک درباره‌ی آن‌هاست و تله‌ی اصلی‌شان این است که جای «تو» و «آن‌ها» را عوض می‌کنند.",
    },
    {
      kind: "compare",
      title: "ورود از راست، ورود از چپ",
      items: [CONFLUENZA_DESTRA, CONFLUENZA_SINISTRA],
      rows: [
        { label: "نماد", values: ["خط پهن = جاده‌ی تو؛ خط باریکی با زاویه از راست کنارش می‌آید و یکی می‌شود.", "همان؛ خط باریک از چپ."] },
        {
          label: "یعنی",
          values: [
            "خودروهایی از راست، با خط شتاب، وارد جریانِ تو می‌شوند. حق تقدم با توست؛ روی رمپِ آن‌ها DARE PRECEDENZA هست.",
            "همین از چپ. ورود از چپ فقط وقتی ممکن است که سواره‌روی تو یک‌طرفه باشد.",
          ],
        },
        { label: "کجا", values: ["روی جاده‌ی اصلیِ دارای حق تقدم؛ در آزادراه هم دیده می‌شود.", "روی سواره‌روی یک‌طرفه‌ی دارای حق تقدم؛ مثلاً آزادراه."] },
        {
          label: "تو چه می‌کنی",
          values: [
            "احتیاط کامل: کسی ممکن است وارد جریان شود. حتی در آزادراه یعنی آماده‌ی کم کردن سرعت باش.",
            "همین.",
          ],
        },
      ],
      takeaway: "confluenza = «کسی با خط شتاب کنارت وارد می‌شود و او باید راه بدهد». تو حق تقدم داری، ولی حواست به او هست.",
      rule: "DPR 495/1992 art. 112 c.1–3 (figg. II.43/d–e); art. 106 c.1",
    },
    {
      kind: "table",
      title: "آنچه این دو تابلو نمی‌گویند",
      body: "جمله‌های غلط معمولاً تابلو را از جاده‌ی اصلی به جاده‌ی فرعی می‌برند، یا جای «تو» و «آن‌ها» را عوض می‌کنند.",
      columns: ["جمله‌ی غلط", "درست"],
      rows: [
        { label: "تو راه بده", values: ["«به خودروهای راست/چپ راه بده» یا «در محل ورود حق تقدم نداری»", "برعکس: آن‌ها به تو راه می‌دهند."] },
        { label: "۲۵ متر", values: ["«حداکثر ۲۵ متر قبل از تقاطع»", "۲۵ متر مال DARE PRECEDENZA روی جاده‌ی فرعی است. این تابلو هشدار است و معمولاً ۱۵۰ متر قبل نصب می‌شود."] },
        { label: "روی فرعی", values: ["«روی جاده‌ی فرعیِ بدون حق تقدم» یا «قبل از DARE PRECEDENZA»", "روی جاده‌ی اصلی است. DARE PRECEDENZA روی رمپِ آن‌هاست، نه جلوی تو."] },
        { label: "گردش", values: ["«گردش به راست/چپ در تقاطع بعدی مجاز است» یا «قبل از اجبار به گردش»", "درباره‌ی گردشِ تو چیزی نمی‌گوید."] },
        { label: "تابلوی ۴۷", it: "INTERSEZIONE", sign: 47, values: ["«۴۷ از ورود با خط شتاب از دو طرف خبر می‌دهد»", "۴۷ تقاطعِ معمولی با جاده‌های فرعی است. ورود با خط شتاب فقط ۵۰ (راست) و ۵۱ (چپ) است."] },
      ],
      takeaway: "تابلوی ورود روی جاده‌ی توست و می‌گوید «تو حق تقدم داری». هر جمله‌ای که تو را به راه دادن یا گردش مجبور کند غلط است.",
      rule: "DPR 495/1992 art. 112 c.2–3; art. 106 c.2",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la confluenza", fa: "به هم رسیدنِ دو جریان؛ ورودِ مورب" },
        { it: "la corsia di accelerazione", fa: "خط شتاب" },
        { it: "immettersi nel flusso", fa: "وارد جریانِ ترافیک شدن" },
        { it: "la strada di immissione laterale", fa: "جاده‌ی ورودیِ کناری" },
        { it: "la carreggiata a senso unico", fa: "سواره‌روی یک‌طرفه" },
        { it: "sul lato sinistro", fa: "در سمت چپ" },
        { it: "non più di", fa: "نه بیشتر از؛ حداکثر" },
      ],
    },
    {
      kind: "trap",
      title: "«da destra»: کی به کی راه می‌دهد؟",
      body: "دو جمله درباره‌ی همان تابلو؛ هر دو از راست حرف می‌زنند، ولی جای «ما» و «آن‌ها» عوض شده است:",
      examples: [
        {
          sourceId: "2327",
          sign: 50,
          textIt: "Il segnale raffigurato indica che abbiamo la precedenza sui veicoli che si immettono da destra",
          answer: 1,
          chunks: [
            { it: "Il segnale raffigurato indica", fa: "تابلوی نشان‌داده‌شده نشان می‌دهد", verb: "indica ← indicare" },
            { it: "che abbiamo la precedenza", fa: "که ما حق تقدم داریم", verb: "abbiamo ← avere" },
            { it: "sui veicoli che si immettono da destra", fa: "نسبت به خودروهایی که از راست وارد می‌شوند", verb: "si immettono ← immettersi" },
          ],
          translation: "تابلوی نشان‌داده‌شده نشان می‌دهد که ما نسبت به خودروهایی که از راست وارد می‌شوند حق تقدم داریم.",
          why: "درست است. واردشونده‌ها باید راه بدهند.",
        },
        {
          sourceId: "2330",
          sign: 50,
          textIt: "Il segnale raffigurato preannuncia di dare precedenza ai veicoli provenienti da destra",
          answer: 0,
          chunks: [
            { it: "Il segnale raffigurato preannuncia", fa: "تابلوی نشان‌داده‌شده از قبل خبر می‌دهد", verb: "preannuncia ← preannunciare" },
            { it: "di dare precedenza", fa: "که حق تقدم بدهی", focus: "contrast" },
            { it: "ai veicoli provenienti da destra", fa: "به خودروهایی که از راست می‌آیند" },
          ],
          translation: "تابلوی نشان‌داده‌شده از قبل خبر می‌دهد که به خودروهایی که از راست می‌آیند حق تقدم بدهی.",
          why: "غلط است. جهتِ حق تقدم برعکس است: آن‌ها به تو راه می‌دهند.",
        },
      ],
      takeaway: "در تابلوهای ۴۷ تا ۵۱ خط پهن تویی و حق تقدم با توست. «dare precedenza» برای تو در این تابلوها غلط است.",
    },
  ],
  practice: [
    {
      sourceId: "2328",
      sign: 50,
      textIt: "In presenza del segnale raffigurato, sulla rampa di raccordo è posto il segnale di DARE PRECEDENZA",
      answer: 1,
      chunks: [
        { it: `${PRESENZA},`, fa: "وقتی این تابلو هست،" },
        { it: "sulla rampa di raccordo", fa: "روی رمپِ اتصال" },
        { it: "è posto il segnale di DARE PRECEDENZA", fa: "تابلوی DARE PRECEDENZA نصب شده است", verb: "posto ← porre" },
      ],
      translation: "وقتی این تابلو هست، روی رمپِ اتصال تابلوی DARE PRECEDENZA نصب شده است.",
      why: "درست است (قدم ۱). تو روی جاده‌ی اصلی هستی؛ کسانی که از رمپ وارد می‌شوند تابلوی راه دادن دارند.",
      rule: "DPR 495/1992 art. 112 c.3; art. 106 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2337",
      sign: 51,
      textIt: "Il segnale raffigurato si trova su carreggiate a senso unico di circolazione",
      answer: 1,
      chunks: [
        { it: "Il segnale raffigurato si trova", fa: "تابلوی نشان‌داده‌شده دیده می‌شود", verb: "si trova ← trovarsi" },
        { it: "su carreggiate a senso unico di circolazione", fa: "روی سواره‌روهای یک‌طرفه" },
      ],
      translation: "تابلوی نشان‌داده‌شده روی سواره‌روهای یک‌طرفه دیده می‌شود.",
      why: "درست است (قدم ۱). ورود از چپ فقط وقتی شدنی است که از چپِ تو خودرویی از روبه‌رو نیاید، یعنی سواره‌روی یک‌طرفه.",
      rule: "DPR 495/1992 art. 112 c.2 (fig. II.43/e)",
      conceptStep: 1,
    },
    {
      sourceId: "2343",
      sign: 51,
      textIt: "Il segnale raffigurato preannuncia che non si ha diritto di precedenza nella confluenza",
      answer: 0,
      chunks: [
        { it: "Il segnale raffigurato preannuncia", fa: "تابلوی نشان‌داده‌شده از قبل خبر می‌دهد", verb: "preannuncia ← preannunciare" },
        { it: "che non si ha diritto di precedenza", fa: "که حق تقدم نداری", focus: "negation" },
        { it: "nella confluenza", fa: "در محل ورود" },
      ],
      translation: "تابلوی نشان‌داده‌شده از قبل خبر می‌دهد که در محل ورود حق تقدم نداری.",
      why: "غلط است (قدم ۲). در محل ورود حق تقدم با توست؛ واردشونده‌ها باید راه بدهند.",
      rule: "DPR 495/1992 art. 112 c.1–3",
      conceptStep: 2,
    },
    {
      sourceId: "2341",
      sign: 51,
      textIt: "Il segnale raffigurato è posto a non più di 25 metri dall'incrocio",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "è posto a non più di 25 metri", fa: "حداکثر ۲۵ متر … نصب شده", focus: "limit", verb: "posto ← porre" },
        { it: "dall'incrocio", fa: "تا تقاطع" },
      ],
      translation: "تابلوی نشان‌داده‌شده حداکثر ۲۵ متر مانده به تقاطع نصب شده است.",
      why: "غلط است (قدم ۲). ۲۵ متر مال DARE PRECEDENZA روی جاده‌ی فرعی است. این تابلو هشدار است و از فاصله‌ی دورتری (معمولاً ۱۵۰ متر) خبر می‌دهد.",
      rule: "DPR 495/1992 art. 105 c.4; art. 106 c.2",
      conceptStep: 2,
    },
    {
      sourceId: "2298",
      sign: 47,
      textIt: "Il segnale raffigurato preannuncia corsie di accelerazione a destra e a sinistra",
      answer: 0,
      chunks: [
        { it: "Il segnale raffigurato preannuncia", fa: "تابلوی نشان‌داده‌شده از قبل خبر می‌دهد", verb: "preannuncia ← preannunciare" },
        { it: "corsie di accelerazione a destra e a sinistra", fa: "از خط‌های شتاب در راست و چپ", focus: "contrast" },
      ],
      translation: "تابلوی نشان‌داده‌شده از قبل از خط‌های شتاب در راست و چپ خبر می‌دهد.",
      why: "غلط است (قدم ۲). ۴۷ تقاطعِ معمولی است. ورود با خط شتاب تابلوهای ۵۰ و ۵۱ را دارد.",
      rule: "DPR 495/1992 art. 112 c.1–2",
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: ["2323", "2324", "2325", "2326", "2327", "2328", "2333", "2335", "2336", "2337", "2338", "2339", "2340"],
    },
    {
      step: 2,
      sourceIds: ["2292", "2298", "2329", "2330", "2331", "2332", "2334", "2341", "2342", "2343", "2344", "2345", "2346"],
    },
  ],
};

// ── Lesson 9 ──────────────────────────────────────────────────────────────────

export const lessonSemaforoAgente: Lesson = {
  id: "semaforo-agente-precedenza",
  titleFa: "تابلو، چراغ یا مأمور: حرف آخر با کیست؟",
  titleIt: "SEGNALI DI PRECEDENZA · SEMAFORO · AGENTE",
  minutes: 5,
  signs: [40, 41, 45, 47, 53],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس، وقتی تابلوی حق تقدم و چراغ راهنمایی یا مأمور راهنمایی کنار هم هستند، می‌گویی کدام‌یک حرف آخر را می‌زند و در چه حالتی تابلو دوباره حاکم می‌شود.",
      why: "بیش از ۲۰ سؤال بانک یک الگو دارند: «با این تابلو و چراغ سه‌رنگ، اگر چراغ … باشد و مأمور … بگوید، حق تقدم داریم؟». با یک ترتیبِ سه‌مرحله‌ای همه‌شان حل می‌شوند.",
    },
    {
      kind: "table",
      title: "سه لایه: مأمور، چراغ، تابلو",
      body: "از بالا شروع کن و اولین لایه‌ای را که «حرف می‌زند» پیدا کن. همان لایه تصمیم می‌گیرد.",
      columns: ["چه وقت تصمیم می‌گیرد"],
      rows: [
        { label: "۱. مأمور", it: "agente del traffico", values: ["همیشه. دستور مأمورِ تنظیم ترافیک بر چراغ و بر هر تابلویی مقدم است؛ وقتی مأمور هست، تابلوی حق تقدم اثرش را از دست می‌دهد."] },
        { label: "۲. چراغ روشن", it: "verde · giallo · rosso", values: ["وقتی چراغ سبز، زرد یا قرمز کار می‌کند، بر تابلوهای حق تقدم مقدم است: سبز یعنی برو حتی با STOP؛ قرمز یعنی بایست حتی با مربع آبی."] },
        { label: "۳. تابلو", it: "spento · giallo lampeggiante", sign: 41, values: ["وقتی چراغ خاموش است یا زرد چشمک می‌زند، تابلو دوباره حاکم است: پشت STOP کامل بایست، پشت DARE PRECEDENZA راه بده، با مربع آبی حق تقدم داری."] },
      ],
      takeaway: "مأمور > چراغی که کار می‌کند > تابلو. زرد چشمک‌زن «چراغ خاموش» حساب می‌شود: تابلو تصمیم می‌گیرد.",
      rule: "Codice della Strada art. 38 c.2; art. 41 c.17–18; DPR 495/1992 art. 105 c.6",
    },
    {
      kind: "classify",
      title: "در این باریکه حق تقدم با کیست؟",
      body: "در هر مثال یکی از دو تابلوی باریکه هست و یک چراغ راهنمایی سه‌رنگ. لایه‌ها را از بالا بخوان.",
      options: [
        { it: "ABBIAMO LA PRECEDENZA", fa: "حق تقدم با ماست" },
        { it: "DOBBIAMO DARE LA PRECEDENZA", fa: "باید راه بدهیم یا بایستیم" },
      ],
      items: [
        { prompt: "چراغ سبز است.", sign: 45, answer: 0, explain: "مأموری نیست؛ چراغ کار می‌کند و بر دایره‌ی قرمز مقدم است: سبز یعنی برو." },
        { prompt: "چراغ خاموش است.", sign: 45, answer: 1, explain: "چراغ حرفی نمی‌زند؛ تابلو حاکم است: دایره‌ی قرمز یعنی به جهت مقابل راه بده." },
        { prompt: "چراغ زرد چشمک می‌زند.", sign: 53, answer: 0, explain: "زرد چشمک‌زن مثل خاموش است؛ تابلو حاکم است: مربع آبی یعنی حق تقدم با توست، با احتیاط." },
        { prompt: "چراغ قرمز است.", sign: 53, answer: 1, explain: "چراغ کار می‌کند و بر مربع آبی مقدم است: بایست." },
        { prompt: "چراغ قرمز است، ولی مأمور اشاره می‌کند رد شو.", sign: 45, answer: 0, explain: "مأمور بر همه مقدم است: رد شو." },
        { prompt: "چراغ سبز است، ولی مأمور می‌گوید بایست.", sign: 53, answer: 1, explain: "مأمور بر چراغ سبز و بر تابلو مقدم است: بایست." },
        { prompt: "چراغ خاموش است و مأمور می‌گوید بایست.", sign: 53, answer: 1, explain: "تابلو حق تقدم را به تو می‌داد، ولی مأمور بر تابلو مقدم است." },
      ],
      takeaway: "سؤال‌های «semaforo a tre luci» را با همین سه قدم حل کن: مأمور هست؟ چراغ کار می‌کند؟ وگرنه تابلو.",
      rule: "Codice della Strada art. 38 c.2; art. 41 c.17; DPR 495/1992 art. 110 c.3",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il semaforo a tre luci", fa: "چراغ راهنمایی سه‌رنگ" },
        { it: "la luce gialla lampeggiante", fa: "چراغ زرد چشمک‌زن" },
        { it: "spento", fa: "خاموش" },
        { it: "l'agente del traffico", fa: "مأمور راهنمایی و رانندگی" },
        { it: "ci ordina di passare", fa: "به ما دستور می‌دهد رد شویم", base: "ordinare" },
        { it: "abbinato", fa: "همراه؛ جفت‌شده", base: "abbinare" },
        { it: "perdere la sua efficacia", fa: "اثرش را از دست دادن", base: "perdere" },
      ],
    },
    {
      kind: "trap",
      title: "«anche se»: حتی با چراغ سبز؟",
      body: "هر دو جمله تابلوی «به جهت مقابل راه بده» و چراغ سبز را با هم دارند:",
      examples: [
        {
          sourceId: "2242",
          sign: 45,
          textIt: "In presenza del segnale raffigurato e del semaforo a tre luci abbiamo la precedenza se il semaforo è a luce verde",
          answer: 1,
          chunks: [
            { it: SEMAFORO, fa: SEMAFORO_FA },
            { it: "abbiamo la precedenza", fa: "حق تقدم داریم", verb: "abbiamo ← avere" },
            { it: "se il semaforo è a luce verde", fa: "اگر چراغ سبز باشد", focus: "condition" },
          ],
          translation: "وقتی این تابلو و چراغ راهنمایی سه‌رنگ هر دو هستند، اگر چراغ سبز باشد حق تقدم داریم.",
          why: "درست است. چراغی که کار می‌کند بر تابلو مقدم است.",
        },
        {
          sourceId: "2258",
          sign: 45,
          textIt: "In presenza del segnale raffigurato e del semaforo a tre luci dobbiamo dare la precedenza anche se il semaforo è a luce verde",
          answer: 0,
          chunks: [
            { it: SEMAFORO, fa: SEMAFORO_FA },
            { it: "dobbiamo dare la precedenza", fa: "باید حق تقدم بدهیم", verb: "dobbiamo ← dovere" },
            { it: "anche se", fa: "حتی اگر", focus: "contrast" },
            { it: "il semaforo è a luce verde", fa: "چراغ سبز باشد" },
          ],
          translation: "وقتی این تابلو و چراغ راهنمایی سه‌رنگ هر دو هستند، حتی اگر چراغ سبز باشد باید حق تقدم بدهیم.",
          why: "غلط است. وقتی چراغ کار می‌کند، تابلوی حق تقدم کنار می‌رود.",
        },
      ],
      takeaway: "«anche se il semaforo è verde» یعنی جمله ادعا می‌کند تابلو بر چراغ مقدم است. برعکس است: چراغ روشن بر تابلو مقدم است.",
    },
  ],
  practice: [
    {
      sourceId: "2176",
      sign: 41,
      textIt: "Il segnale raffigurato impone di fermarsi all'incrocio anche in presenza di semaforo a luce lampeggiante gialla",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "impone di fermarsi all'incrocio", fa: "دستور می‌دهد سرِ تقاطع بایستی", verb: "impone ← imporre" },
        { it: "anche in presenza di semaforo", fa: "حتی وقتی چراغ راهنمایی هست", focus: "always" },
        { it: "a luce lampeggiante gialla", fa: "که زرد چشمک می‌زند" },
      ],
      translation: "تابلوی نشان‌داده‌شده دستور می‌دهد سرِ تقاطع بایستی، حتی وقتی چراغ راهنمایی زرد چشمک می‌زند.",
      why: "درست است (قدم ۱). زرد چشمک‌زن یعنی چراغ تصمیم نمی‌گیرد؛ STOP حاکم است.",
      rule: "DPR 495/1992 art. 105 c.6",
      conceptStep: 1,
    },
    {
      sourceId: "2243",
      sign: 45,
      textIt: "In presenza del segnale raffigurato e del semaforo a tre luci dobbiamo dare la precedenza se il semaforo è spento",
      answer: 1,
      chunks: [
        { it: SEMAFORO, fa: SEMAFORO_FA },
        { it: "dobbiamo dare la precedenza", fa: "باید حق تقدم بدهیم", verb: "dobbiamo ← dovere" },
        { it: "se il semaforo è spento", fa: "اگر چراغ خاموش باشد", focus: "condition" },
      ],
      translation: "وقتی این تابلو و چراغ راهنمایی سه‌رنگ هر دو هستند، اگر چراغ خاموش باشد باید حق تقدم بدهیم.",
      why: "درست است (قدم ۲). چراغ خاموش؛ تابلو حاکم است و دایره‌ی قرمز می‌گوید راه بده.",
      rule: "Codice della Strada art. 38 c.2; art. 41 c.18; DPR 495/1992 art. 110 c.1",
      conceptStep: 2,
    },
    {
      sourceId: "2259",
      sign: 45,
      textIt: "In presenza del segnale raffigurato e del semaforo a tre luci abbiamo la precedenza se il semaforo è a luce gialla lampeggiante",
      answer: 0,
      chunks: [
        { it: SEMAFORO, fa: SEMAFORO_FA },
        { it: "abbiamo la precedenza", fa: "حق تقدم داریم", verb: "abbiamo ← avere" },
        { it: "se il semaforo è a luce gialla lampeggiante", fa: "اگر چراغ زرد چشمک بزند", focus: "condition" },
      ],
      translation: "وقتی این تابلو و چراغ راهنمایی سه‌رنگ هر دو هستند، اگر چراغ زرد چشمک بزند حق تقدم داریم.",
      why: "غلط است (قدم ۲). زرد چشمک‌زن یعنی تابلو حاکم است، و این تابلو (دایره‌ی قرمز) می‌گوید راه بده.",
      rule: "Codice della Strada art. 41 c.17; DPR 495/1992 art. 110 c.1",
      conceptStep: 2,
    },
    {
      sourceId: "2377",
      sign: 53,
      textIt:
        "In presenza del segnale raffigurato e del semaforo a tre luci abbiamo la precedenza se il semaforo è a luce rossa, ma l'agente del traffico ci ordina di passare",
      answer: 1,
      chunks: [
        { it: SEMAFORO, fa: SEMAFORO_FA },
        { it: "abbiamo la precedenza", fa: "حق تقدم داریم", verb: "abbiamo ← avere" },
        { it: "se il semaforo è a luce rossa,", fa: "اگر چراغ قرمز باشد،", focus: "condition" },
        { it: "ma l'agente del traffico ci ordina di passare", fa: "ولی مأمور به ما دستور بدهد رد شویم", focus: "contrast", verb: "ordina ← ordinare" },
      ],
      translation: "وقتی این تابلو و چراغ راهنمایی سه‌رنگ هر دو هستند، اگر چراغ قرمز باشد ولی مأمور به ما دستور بدهد رد شویم، حق تقدم داریم.",
      why: "درست است (قدم ۲). دستور مأمور بر چراغ قرمز مقدم است.",
      rule: "Codice della Strada art. 38 c.2",
      conceptStep: 2,
    },
    {
      sourceId: "2390",
      sign: 53,
      textIt:
        "In presenza del segnale raffigurato e del semaforo a tre luci abbiamo la precedenza se il semaforo è spento e l'agente del traffico ci ordina di fermarci",
      answer: 0,
      chunks: [
        { it: SEMAFORO, fa: SEMAFORO_FA },
        { it: "abbiamo la precedenza", fa: "حق تقدم داریم", verb: "abbiamo ← avere" },
        { it: "se il semaforo è spento", fa: "اگر چراغ خاموش باشد", focus: "condition" },
        { it: "e l'agente del traffico ci ordina di fermarci", fa: "و مأمور به ما دستور بدهد بایستیم", verb: "ordina ← ordinare" },
      ],
      translation: "وقتی این تابلو و چراغ راهنمایی سه‌رنگ هر دو هستند، اگر چراغ خاموش باشد و مأمور به ما دستور بدهد بایستیم، حق تقدم داریم.",
      why: "غلط است (قدم ۲). مربع آبی حق تقدم را به تو می‌داد، ولی مأمور بر تابلو مقدم است: باید بایستی.",
      rule: "Codice della Strada art. 38 c.2",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2158", "2176", "2188", "2288"] },
    {
      step: 2,
      sourceIds: [
        "2242", "2243", "2244", "2245", "2258", "2259", "2260", "2261",
        "2375", "2376", "2377", "2378", "2379", "2387", "2388", "2389", "2390",
      ],
    },
  ],
};
