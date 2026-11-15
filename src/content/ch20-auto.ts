/**
 * src/content/ch20-auto.ts
 * Chapter 20 (Patente, punti e documenti), lessons 4–5: car licences.
 *  L4 B1 (16 years; non-light quadricycles, Quad with handlebars) and B (up to
 *     3.5 t and 8 passengers; campers up to 3.5 t; every quadricycle; AM and B1
 *     inside; in Italy only, A1 motorcycles and, from 21, tricycles over 15 kW;
 *     agricultural machines, exceptional ones too — art. 124; never A2/A, buses,
 *     C1 trucks or exceptional operating machines).
 *  L5 trailers: B (trailer up to 750 kg, or a heavier one if the pair stays
 *     within 3.5 t), B + code 96 (pair up to 4.25 t, driving test on a specific
 *     vehicle, at the same time as B or later, harmonised EU code), BE (B tractor
 *     + trailer up to 3.5 t, any pair mass; age 18).
 *
 * The B power limits for new drivers changed after the 2023 bank (art. 117
 * c.2-bis: three years, 75 kW/t, 105 kW for M1); #6214 is FALSO under both
 * texts and is not used as practice. Trust rules as in src/content/lessons.ts.
 */
import type { Lesson } from "./lessons.js";

const ART = (n: string) => `Codice della Strada, art. ${n}`;

export const lessonB1B: Lesson = {
  id: "patente-b1-b",
  titleFa: "گواهینامه‌ی B1 و B: چهارچرخ و سواری",
  titleIt: "PATENTE B1 · PATENTE B",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی B1 (از ۱۶ سالگی) فقط چهارچرخ‌های موتوریِ غیرِ سبک را می‌دهد، و گواهینامه‌ای که خودت می‌گیری، B، دقیقاً چه چیزهایی را می‌دهد: تا ۳٫۵ تن و ۸ مسافر، بعضی وسیله‌ها فقط در ایتالیا، و چه چیزهایی هرگز.",
      why:
        "۲۳ سؤال. نیمی از این‌ها درباره‌ی خودِ گواهینامه‌ی توست. بانک B را بزرگ‌تر از آن‌چه هست نشان می‌دهد (اتوبوس، کامیونِ ۷٫۵ تنی، همه‌ی موتورسیکلت‌ها بعد از ۲۴ سالگی، همه‌ی کمپرها) یا کوچک‌تر (فقط سواریِ ۹ نفره). مرزها را با عدد یاد بگیر.",
      rule: `${ART("115")}, ${ART("116")} c.3, ${ART("124")}`,
    },
    {
      kind: "table",
      title: "B1: فقط چهارچرخِ غیرِ سبک",
      body:
        "B1 ردیفی کوچک است: چهارچرخ‌های موتوریِ غیرِ سبک (تا ۱۵ کیلووات؛ مثلاً کوادِ فرمان‌دسته‌ای). همین. موتورسیکلت در آن نیست و سواری هم نه، حتی کوچک و بی‌مسافر.",
      columns: ["B1"],
      rows: [
        { label: "سن", it: "16 anni", values: ["از ۱۶ سالگی."] },
        { label: "چهارچرخِ غیرِ سبک", it: "quadricicli non leggeri · Quad", values: ["بله، از جمله کوادِ فرمان‌دسته‌ای."] },
        { label: "موتورسیکلتِ A1", it: "veicoli della patente A1", values: ["نه. B1 و A1 دو ردیفِ جدا هستند."] },
        { label: "سه‌چرخ", it: "tricicli a motore", values: ["نه، در هیچ سنی."] },
        { label: "سواریِ کوچک", it: "autovetture monoposto o a tre posti", values: ["نه، حتی تک‌نفره یا بی‌مسافر. سواری B می‌خواهد."] },
        { label: "از B1 به B", it: "da B1 a B", values: ["میان‌بُرِ «فقط یک آزمونِ تئوریِ تکمیلی» نیست؛ B آزمون‌های خودش را دارد، از جمله آزمونِ عملی با سواری."] },
      ],
      takeaway: "B1 = چهارچرخِ غیرِ سبک از ۱۶ سالگی. نه موتورسیکلت، نه سه‌چرخ، نه سواری.",
      rule: `${ART("115")} c.1; ${ART("116")} c.3 lett. e`,
    },
    {
      kind: "table",
      title: "B: چه چیزی، کجا، از چند سالگی",
      body:
        "B خودروهایی را می‌دهد که حداکثر وزنِ مجازشان (عددِ کارتِ خودرو، نه وزنِ امروز) تا ۳٫۵ تن است و جز راننده حداکثر ۸ نفر جا دارند. ستونِ دوم می‌گوید کجا معتبر است.",
      columns: ["با B؟", "کجا"],
      rows: [
        { label: "سواری، کامیون، کمپر", it: "fino a 3,5 t · 8 persone oltre al conducente", values: ["بله، تا ۳٫۵ تن و ۸+۱ نفر. کمپرِ سنگین‌تر نه", "همه‌جا"] },
        { label: "همه‌ی چهارچرخ‌های موتوری", it: "tutti i quadricicli", values: ["بله؛ AM و B1 در B هستند", "همه‌جا"] },
        { label: "ماشین‌آلاتِ کشاورزی", it: "macchine agricole, anche eccezionali", values: ["بله، حتی نوعِ «استثنایی» (بزرگ‌تر از اندازه‌های عادی)", "ایتالیا"] },
        { label: "موتورسیکلتِ ردیفِ A1", it: "veicoli della patente A1", values: ["بله: تا ۱۲۵ سی‌سی، ۱۱ کیلووات، ۰٫۱ کیلووات بر کیلوگرم", "فقط ایتالیا"] },
        { label: "سه‌چرخِ بالای ۱۵ کیلووات", it: "tricicli oltre 15 kW", values: ["بله، فقط از ۲۱ سالگی", "فقط ایتالیا"] },
        { label: "A2 و A", it: "veicoli delle patenti A2 e A", values: ["هرگز، در هیچ سنی", "—"] },
        { label: "اتوبوس، کامیونِ ۳٫۵ تا ۷٫۵ تن", it: "autobus · autocarri fino a 7,5 t (C1)", values: ["نه؛ ردیف‌های D و C1", "—"] },
        { label: "ماشین‌آلاتِ عملیاتیِ استثنایی", it: "macchine operatrici eccezionali", values: ["نه؛ C1 لازم است", "—"] },
      ],
      takeaway:
        "B: تا ۳٫۵ تن و ۸+۱ نفر، همه‌ی چهارچرخ‌ها، ماشینِ کشاورزی. فقط در ایتالیا: موتورسیکلتِ A1 و سه‌چرخِ قوی از ۲۱. هرگز: A2، A، اتوبوس، C1. تازه‌کارها سه سال سقفِ توان دارند (ماده‌ی ۱۱۷: ۷۵ کیلووات بر تن، و برای سواری ۱۰۵ کیلووات).",
      rule: `${ART("116")} c.3 lett. f; ${ART("117")} c.2-bis; ${ART("124")}`,
    },
    {
      kind: "classify",
      title: "با گواهینامه‌ی B می‌شود؟",
      body: "فرض کن ۲۵ ساله‌ای و فقط B داری. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "sì", fa: "بله" },
        { it: "no", fa: "نه" },
      ],
      items: [
        { prompt: "کوادِ فرمان‌دسته‌ای (چهارچرخِ غیرِ سبک)", answer: 0, explain: "همه‌ی چهارچرخ‌ها در B هستند." },
        { prompt: "اسکوترِ ۱۲۵ سی‌سی، ۱۱ کیلووات، در تورین", answer: 0, explain: "در ایتالیا B موتورسیکلتِ A1 را می‌دهد." },
        { prompt: "همان اسکوتر، در سفری به فرانسه", answer: 1, explain: "این اجازه فقط در ایتالیاست." },
        { prompt: "کمپرِ ۴ تنی", answer: 1, explain: "کمپر فقط تا ۳٫۵ تن." },
        { prompt: "مینی‌بوسِ ۱۲ نفره", answer: 1, explain: "B حداکثر ۸ مسافر به‌اضافه‌ی راننده است." },
        { prompt: "تراکتورِ کشاورزی", answer: 0, explain: "ماشین‌آلاتِ کشاورزی با B هستند." },
      ],
      takeaway: "اول وزن و تعدادِ نفرات، بعد این‌که «فقط در ایتالیا» است یا نه.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la massa massima autorizzata", fa: "حداکثر وزنِ مجاز" },
        { it: "oltre al conducente", fa: "جز راننده" },
        { it: "l’autocaravan", fa: "کمپر" },
        { it: "l’autocarro", fa: "کامیون" },
        { it: "le macchine agricole", fa: "ماشین‌آلاتِ کشاورزی" },
        { it: "le macchine operatrici", fa: "ماشین‌آلاتِ عملیاتی (راهسازی)" },
        { it: "eccezionale", fa: "استثنایی (بزرگ‌تر از اندازه‌های عادی)" },
        { it: "sul territorio nazionale", fa: "در خاکِ ایتالیا" },
        { it: "il neopatentato", fa: "راننده‌ی تازه‌کار" },
      ],
    },
    {
      kind: "trap",
      title: "«abilita anche»: A1 در ایتالیا آری، A2 و A نه",
      body: "هر دو جمله می‌گویند B موتورسیکلت هم می‌دهد. یکی دقیق است، دیگری بزرگش کرده:",
      examples: [
        {
          sourceId: "6206",
          textIt: "La patente di categoria B consente di guidare, ma solo sul territorio nazionale (Italia), i veicoli che si possono condurre con la patente A1",
          answer: 1,
          chunks: [
            { it: "La patente di categoria B consente di guidare,", fa: "گواهینامه‌ی ردیفِ B اجازه‌ی راندن می‌دهد،", verb: "consente ← consentire" },
            { it: "ma solo sul territorio nazionale (Italia),", fa: "ولی فقط در خاکِ ایتالیا،", focus: "limit" },
            { it: "i veicoli che si possono condurre con la patente A1", fa: "وسیله‌هایی را که با گواهینامه‌ی A1 می‌شود راند" },
          ],
          translation: "گواهینامه‌ی ردیفِ B اجازه می‌دهد وسیله‌هایی را که با گواهینامه‌ی A1 می‌شود راند بِرانی، ولی فقط در خاکِ ایتالیا.",
          why: "درست است. این یک اجازه‌ی ایتالیایی است؛ بیرون از ایتالیا معتبر نیست.",
        },
        {
          sourceId: "6211",
          textIt: "La patente di categoria B abilita anche alla guida dei veicoli che si possono condurre con le patenti A2 e A",
          answer: 0,
          chunks: [
            { it: "La patente di categoria B", fa: "گواهینامه‌ی ردیفِ B" },
            { it: "abilita anche alla guida", fa: "اجازه‌ی راندنِ … را هم می‌دهد", verb: "abilita ← abilitare", focus: "always" },
            { it: "dei veicoli che si possono condurre con le patenti A2 e A", fa: "وسیله‌هایی که با گواهینامه‌های A2 و A می‌شود راند" },
          ],
          translation: "گواهینامه‌ی ردیفِ B اجازه‌ی راندنِ وسیله‌هایی را هم می‌دهد که با گواهینامه‌های A2 و A می‌شود راند.",
          why: "غلط است. B فقط تا موتورسیکلت‌های A1 می‌رسد، و آن هم فقط در ایتالیا.",
        },
      ],
      takeaway: "B و موتورسیکلت: فقط A1، فقط در ایتالیا.",
      rule: `${ART("116")} c.3`,
    },
  ],
  practice: [
    {
      sourceId: "6193",
      textIt: "La patente di categoria B1 può essere conseguita a 16 anni di età",
      answer: 1,
      chunks: [
        { it: "La patente di categoria B1", fa: "گواهینامه‌ی ردیفِ B1" },
        { it: "può essere conseguita", fa: "می‌تواند گرفته شود", verb: "può ← potere" },
        { it: "a 16 anni di età", fa: "در ۱۶ سالگی", focus: "limit" },
      ],
      translation: "گواهینامه‌ی ردیفِ B1 را می‌شود در ۱۶ سالگی گرفت.",
      why: "درست است (قدم ۱). B1 مثلِ A1 از ۱۶ سالگی است.",
      rule: `${ART("115")} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "6198",
      textIt: "La patente di categoria B1 abilita a condurre le autovetture monoposto, o con un massimo di tre posti, compreso il conducente, purché si circoli senza passeggeri a bordo",
      answer: 0,
      chunks: [
        { it: "La patente di categoria B1", fa: "گواهینامه‌ی ردیفِ B1" },
        { it: "abilita a condurre le autovetture monoposto,", fa: "اجازه‌ی راندنِ سواری‌های تک‌نفره را می‌دهد،", verb: "abilita ← abilitare" },
        { it: "o con un massimo di tre posti, compreso il conducente,", fa: "یا حداکثر سه‌نفره با راننده،", focus: "limit" },
        { it: "purché si circoli senza passeggeri a bordo", fa: "به شرطی که بی‌مسافر حرکت کنی", verb: "si circoli ← circolare", focus: "condition" },
      ],
      translation: "گواهینامه‌ی ردیفِ B1 اجازه‌ی راندنِ سواری‌های تک‌نفره یا حداکثر سه‌نفره با راننده را می‌دهد، به شرطی که بی‌مسافر حرکت کنی.",
      why: "غلط است (قدم ۱). B1 فقط چهارچرخِ موتوریِ غیرِ سبک است؛ هر سواری‌ای، حتی کوچک و بی‌مسافر، B می‌خواهد.",
      rule: `${ART("116")} c.3 lett. e`,
      conceptStep: 1,
    },
    {
      sourceId: "6201",
      textIt: "La patente di categoria B abilita a condurre gli autoveicoli di massa massima autorizzata non superiore a 3,5 tonnellate destinati al trasporto di non più di otto persone oltre al conducente",
      answer: 1,
      chunks: [
        { it: "La patente di categoria B abilita a condurre gli autoveicoli", fa: "گواهینامه‌ی ردیفِ B اجازه‌ی راندنِ خودروهایی را می‌دهد", verb: "abilita ← abilitare" },
        { it: "di massa massima autorizzata non superiore a 3,5 tonnellate", fa: "با حداکثر وزنِ مجازِ نه بیشتر از ۳٫۵ تن", focus: "limit" },
        { it: "destinati al trasporto di non più di otto persone", fa: "برای حملِ نه بیشتر از هشت نفر", focus: "limit" },
        { it: "oltre al conducente", fa: "جز راننده" },
      ],
      translation: "گواهینامه‌ی ردیفِ B اجازه‌ی راندنِ خودروهایی با حداکثر وزنِ مجازِ نه بیشتر از ۳٫۵ تن را می‌دهد که برای حملِ نه بیشتر از هشت نفر جز راننده ساخته شده‌اند.",
      why: "درست است (قدم ۲). دو مرزِ B همین‌هاست: ۳٫۵ تن و ۸+۱ نفر.",
      rule: `${ART("116")} c.3 lett. f`,
      conceptStep: 2,
    },
    {
      sourceId: "6219",
      textIt: "La patente di categoria B, conseguita dopo i 24 anni di età, abilita alla guida di tutti i motocicli",
      answer: 0,
      chunks: [
        { it: "La patente di categoria B,", fa: "گواهینامه‌ی ردیفِ B،" },
        { it: "conseguita dopo i 24 anni di età,", fa: "که بعد از ۲۴ سالگی گرفته شده،", verb: "conseguita ← conseguire", focus: "condition" },
        { it: "abilita alla guida di tutti i motocicli", fa: "اجازه‌ی راندنِ همه‌ی موتورسیکلت‌ها را می‌دهد", verb: "abilita ← abilitare", focus: "always" },
      ],
      translation: "گواهینامه‌ی ردیفِ B که بعد از ۲۴ سالگی گرفته شده، اجازه‌ی راندنِ همه‌ی موتورسیکلت‌ها را می‌دهد.",
      why: "غلط است (قدم ۲). ۲۴ سالِ راهِ مستقیم به A است (درس ۳)، و A آزمونِ خودش را دارد. B در هر سنی فقط تا A1، و فقط در ایتالیا.",
      rule: `${ART("115")} c.1; ${ART("116")} c.3`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6193", "6194", "6195", "6196", "6197", "6198", "6199", "6200"] },
    {
      step: 2,
      sourceIds: ["6201", "6203", "6204", "6206", "6207", "6208", "6210", "6211", "6212", "6213", "6214", "6215", "6216", "6219", "6220"],
    },
  ],
};

export const lessonRimorchi: Lesson = {
  id: "patente-rimorchi-96-be",
  titleFa: "یدک با گواهینامه‌ی B، کدِ ۹۶ و BE",
  titleIt: "RIMORCHI · PATENTE B · CODICE 96 · PATENTE BE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس با سه عدد (۷۵۰ کیلو، ۳۵۰۰ کیلو، ۴۲۵۰ کیلو) می‌توانی بگویی برای سواری‌ای که یدک می‌کشد B کافی است، B با کدِ ۹۶ لازم است، یا BE.",
      why:
        "۲۵ سؤال. عددها همه از حداکثر وزنِ مجاز است که در کارتِ خودرو آمده، نه وزنِ امروزِ بار. بانک با عددهای نزدیک بازی می‌کند (۴۵۰۰، ۶۰۰۰، ۷۵۰۰) و کدِ ۹۶ را به موتورسیکلت، اتوبوسِ مفصلی یا «فقط ایتالیا» می‌چسباند. یدک کشیدن را خودش فصلِ ۱۷ درس داد؛ این‌جا فقط گواهینامه‌اش.",
      rule: `${ART("116")} c.3 lett. f–g`,
    },
    {
      kind: "table",
      title: "B و یدک: دو راه برای ماندن در B",
      body:
        "با B خودروِ کشنده باید تا ۳۵۰۰ کیلو باشد. بعد یکی از این دو:",
      columns: ["شرط", "مثال"],
      rows: [
        { label: "یدکِ سبک", it: "rimorchio leggero (fino a 750 kg)", values: ["یدک تا ۷۵۰ کیلو، با هر کشنده‌ی تا ۳۵۰۰ کیلو", "کامیونِ ۳۵۰۰ + یدکِ ۷۰۰ ✓"] },
        { label: "یدکِ سنگین‌تر", it: "rimorchio oltre 750 kg", values: ["یدکِ بیش از ۷۵۰ کیلو، به شرطی که جمعِ دو تا از ۳۵۰۰ کیلو بیشتر نشود", "سواریِ ۲۰۰۰ + یدکِ ۱۲۰۰ = ۳۲۰۰ ✓"] },
        { label: "از این بیشتر", it: "oltre 3.500 kg in totale", values: ["جمع بالای ۳۵۰۰ کیلو: دیگر B کافی نیست", "سواریِ ۲۵۰۰ + یدکِ ۲۰۰۰ = ۴۵۰۰ ✗"] },
      ],
      takeaway: "یدکِ تا ۷۵۰ کیلو: آزاد. سنگین‌تر: جمع تا ۳۵۰۰ کیلو.",
      rule: `${ART("116")} c.3 lett. f`,
    },
    {
      kind: "table",
      title: "کدِ ۹۶: تا ۴۲۵۰ کیلو",
      body:
        "کدِ ۹۶ گواهینامه‌ی جدیدی نیست؛ کدی است که روی همان B (در خانه‌ی ۱۲ِ کارتِ گواهینامه) می‌نشیند. اجازه می‌دهد جمعِ سواری و یدکِ بیش از ۷۵۰ کیلو از ۳۵۰۰ بالاتر برود، تا ۴۲۵۰ کیلو.",
      columns: ["کدِ ۹۶"],
      rows: [
        { label: "چه چیزی", it: "complesso fino a 4.250 kg", values: ["کشنده‌ی B + یدکِ بیش از ۷۵۰ کیلو، جمع بالای ۳۵۰۰ و تا ۴۲۵۰ کیلو."] },
        { label: "چطور", it: "prova di guida su specifico veicolo", values: ["یک آزمونِ عملی با همان نوع خودرو و یدک."] },
        { label: "کِی", it: "contestualmente o successivamente alla B", values: ["هم‌زمان با B یا هر وقتی بعد از آن. A لازم نیست."] },
        { label: "کجا", it: "codice armonizzato", values: ["کدِ «هماهنگ» در همه‌ی اتحادیه‌ی اروپاست، نه فقط ایتالیا."] },
        { label: "چه چیزی نه", it: "non motocicli · non autosnodati", values: ["موتورسیکلت نه، اتوبوسِ مفصلی نه، و جمعِ بالای ۴۲۵۰ کیلو نه."] },
      ],
      takeaway: "کدِ ۹۶ = همان B تا ۴۲۵۰ کیلو، با یک آزمونِ عملی، در همه‌ی اروپا.",
      rule: `${ART("116")} c.3 lett. f; Direttiva 2006/126/CE, allegato I (codice 96)`,
    },
    {
      kind: "table",
      title: "BE: یدک تا ۳۵۰۰ کیلو، جمع هر چه",
      body:
        "BE ردیفِ جداست: کشنده‌ی ردیفِ B (تا ۳۵۰۰ کیلو) با یدک یا نیم‌یدکِ تا ۳۵۰۰ کیلو. این‌جا سقفِ جمع نیست؛ سقف روی هر کدام جداست. پس بالای ۴۲۵۰ کیلو هم مجاز است.",
      columns: ["BE"],
      rows: [
        { label: "کشنده", it: "motrice fino a 3.500 kg", values: ["فقط تا ۳۵۰۰ کیلو. کشنده‌ی ۴۰۰۰ کیلویی دیگر B نیست."] },
        { label: "یدک", it: "rimorchio fino a 3.500 kg", values: ["تا ۳۵۰۰ کیلو، نه بیشتر."] },
        { label: "جمع", it: "anche oltre 4.250 kg", values: ["سقف ندارد؛ مثلاً ۳۵۰۰ + ۱۰۰۰ = ۴۵۰۰ کیلو با BE."] },
        { label: "در آن است", it: "AM, B1, B, B96", values: ["هر چه با AM، B1، B و B با کدِ ۹۶ می‌شود راند."] },
        { label: "نیست", it: "non A · non C1 · non minibus", values: ["موتورسیکلت (A) نه، کامیونِ C1 نه، مینی‌بوس با یدک (D1E) نه."] },
        { label: "سن", it: "18 anni", values: ["۱۸ سال، نه ۲۱."] },
      ],
      takeaway: "BE: هر کدام تا ۳۵۰۰ کیلو، جمع هر چه. کشنده‌ی سنگین‌تر یا یدکِ سنگین‌تر: ردیفِ C.",
      rule: `${ART("115")} c.1; ${ART("116")} c.3 lett. g`,
    },
    {
      kind: "classify",
      title: "کدام گواهینامه؟",
      body: "عددها حداکثر وزنِ مجاز از کارتِ خودرو است. کمترین گواهینامه‌ی کافی را انتخاب کن. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "B", fa: "B" },
        { it: "B + codice 96", fa: "B با کدِ ۹۶" },
        { it: "BE", fa: "BE" },
        { it: "nessuna di queste", fa: "هیچ‌کدام" },
      ],
      items: [
        { prompt: "سواریِ ۱۵۰۰ کیلو + یدکِ ۶۰۰ کیلو", answer: 0, explain: "یدک تا ۷۵۰ کیلو: B." },
        { prompt: "سواریِ ۲۰۰۰ + یدکِ ۱۲۰۰ (جمع ۳۲۰۰)", answer: 0, explain: "یدک سنگین‌تر از ۷۵۰، ولی جمع زیرِ ۳۵۰۰: B." },
        { prompt: "سواریِ ۲۵۰۰ + یدکِ ۱۵۰۰ (جمع ۴۰۰۰)", answer: 1, explain: "جمع بین ۳۵۰۰ و ۴۲۵۰: کدِ ۹۶." },
        { prompt: "سواریِ ۳۰۰۰ + یدکِ ۲۰۰۰ (جمع ۵۰۰۰)", answer: 2, explain: "جمع بالای ۴۲۵۰، هر کدام تا ۳۵۰۰: BE." },
        { prompt: "کامیونِ ۴۰۰۰ + یدکِ ۱۰۰۰", answer: 3, explain: "کشنده بالای ۳۵۰۰ است؛ ردیفِ C1E لازم است." },
        { prompt: "سواریِ ۲۵۰۰ + یدکِ ۳۸۰۰", answer: 3, explain: "یدک بالای ۳۵۰۰ است؛ BE هم کافی نیست." },
      ],
      takeaway: "ترتیب: کشنده تا ۳۵۰۰؟ یدک تا ۷۵۰؟ جمع تا ۳۵۰۰؟ تا ۴۲۵۰؟ هر کدام تا ۳۵۰۰؟",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il rimorchio leggero", fa: "یدکِ سبک (تا ۷۵۰ کیلو)" },
        { it: "il complesso veicolare", fa: "مجموعه‌ی خودرو و یدک" },
        { it: "trainare", fa: "یدک کشیدن" },
        { it: "la motrice", fa: "خودروی کشنده" },
        { it: "il codice armonizzato 96", fa: "کدِ ۹۶" },
        { it: "contestualmente", fa: "هم‌زمان" },
        { it: "successivamente", fa: "بعداً" },
        { it: "la prova di guida", fa: "آزمونِ عملی" },
        { it: "l’autotreno", fa: "کامیون با یدک" },
      ],
    },
    {
      kind: "trap",
      title: "«codice 96»: تا ۴۲۵۰، نه ۶۰۰۰",
      body: "هر دو جمله درباره‌ی سقفِ جمعِ سواری و یدک با کدِ ۹۶ است:",
      examples: [
        {
          sourceId: "6225",
          textIt: "Per guidare un’autovettura che traina un rimorchio non leggero (oltre 750 chilogrammi), con massa massima autorizzata del complesso superiore a 3.500 chilogrammi ma non superiore a 4.250 chilogrammi, è sufficiente aver conseguito la patente di categoria B con codice armonizzato 96",
          answer: 1,
          chunks: [
            { it: "Per guidare un’autovettura che traina un rimorchio non leggero (oltre 750 chilogrammi),", fa: "برای راندنِ سواری‌ای که یدکِ غیرِ سبک (بیش از ۷۵۰ کیلو) می‌کشد،", verb: "traina ← trainare" },
            { it: "con massa massima autorizzata del complesso", fa: "با حداکثر وزنِ مجازِ مجموعه" },
            { it: "superiore a 3.500 chilogrammi ma non superiore a 4.250 chilogrammi,", fa: "بیشتر از ۳۵۰۰ ولی نه بیشتر از ۴۲۵۰ کیلو،", focus: "limit" },
            { it: "è sufficiente aver conseguito", fa: "کافی است گرفته باشی", verb: "è ← essere" },
            { it: "la patente di categoria B con codice armonizzato 96", fa: "گواهینامه‌ی ردیفِ B با کدِ ۹۶" },
          ],
          translation: "برای راندنِ سواری‌ای که یدکِ غیرِ سبک (بیش از ۷۵۰ کیلو) می‌کشد، با حداکثر وزنِ مجازِ مجموعه‌ی بیشتر از ۳۵۰۰ ولی نه بیشتر از ۴۲۵۰ کیلو، کافی است گواهینامه‌ی ردیفِ B با کدِ ۹۶ گرفته باشی.",
          why: "درست است. این دقیقاً بازه‌ی کدِ ۹۶ است.",
        },
        {
          sourceId: "6229",
          textIt: "Il codice armonizzato 96, apposto sulla patente di categoria B, abilita alla guida di autoveicoli trainanti un rimorchio non leggero (oltre 750 chilogrammi), con massa massima autorizzata del complesso superiore a 4.250 chilogrammi ma non superiore a 6.000 chilogrammi",
          answer: 0,
          chunks: [
            { it: "Il codice armonizzato 96, apposto sulla patente di categoria B,", fa: "کدِ ۹۶، که روی گواهینامه‌ی ردیفِ B آمده،", verb: "apposto ← apporre" },
            { it: "abilita alla guida di autoveicoli trainanti un rimorchio non leggero (oltre 750 chilogrammi),", fa: "اجازه‌ی راندنِ خودروهایی را می‌دهد که یدکِ غیرِ سبک (بیش از ۷۵۰ کیلو) می‌کشند،", verb: "abilita ← abilitare" },
            { it: "con massa massima autorizzata del complesso", fa: "با حداکثر وزنِ مجازِ مجموعه" },
            { it: "superiore a 4.250 chilogrammi ma non superiore a 6.000 chilogrammi", fa: "بیشتر از ۴۲۵۰ ولی نه بیشتر از ۶۰۰۰ کیلو", focus: "limit" },
          ],
          translation: "کدِ ۹۶، که روی گواهینامه‌ی ردیفِ B آمده، اجازه‌ی راندنِ خودروهایی را می‌دهد که یدکِ غیرِ سبک (بیش از ۷۵۰ کیلو) می‌کشند، با حداکثر وزنِ مجازِ مجموعه‌ی بیشتر از ۴۲۵۰ ولی نه بیشتر از ۶۰۰۰ کیلو.",
          why: "غلط است. ۴۲۵۰ سقفِ کدِ ۹۶ است، نه کفِ آن. بالای ۴۲۵۰ کیلو BE لازم است.",
        },
      ],
      takeaway: "۳۵۰۰ تا ۴۲۵۰ = کدِ ۹۶. هر عددی بالای ۴۲۵۰ برای کدِ ۹۶ غلط است.",
      rule: `${ART("116")} c.3 lett. f`,
    },
  ],
  practice: [
    {
      sourceId: "6205",
      textIt: "La patente di categoria B abilita a condurre le autovetture trainanti un rimorchio non leggero (massa oltre 750 chilogrammi) purché la massa massima autorizzata del complesso non superi 3,5 tonnellate",
      answer: 1,
      chunks: [
        { it: "La patente di categoria B abilita a condurre le autovetture", fa: "گواهینامه‌ی ردیفِ B اجازه‌ی راندنِ سواری‌هایی را می‌دهد", verb: "abilita ← abilitare" },
        { it: "trainanti un rimorchio non leggero (massa oltre 750 chilogrammi)", fa: "که یدکِ غیرِ سبک (بیش از ۷۵۰ کیلو) می‌کشند" },
        { it: "purché la massa massima autorizzata del complesso", fa: "به شرطی که حداکثر وزنِ مجازِ مجموعه", focus: "condition" },
        { it: "non superi 3,5 tonnellate", fa: "از ۳٫۵ تن بیشتر نشود", verb: "superi ← superare", focus: "limit" },
      ],
      translation: "گواهینامه‌ی ردیفِ B اجازه‌ی راندنِ سواری‌هایی را می‌دهد که یدکِ غیرِ سبک (بیش از ۷۵۰ کیلو) می‌کشند، به شرطی که حداکثر وزنِ مجازِ مجموعه از ۳٫۵ تن بیشتر نشود.",
      why: "درست است (قدم ۱). راهِ دومِ ماندن در B: یدکِ سنگین‌تر، ولی جمع تا ۳۵۰۰ کیلو.",
      rule: `${ART("116")} c.3 lett. f`,
      conceptStep: 1,
    },
    {
      sourceId: "6218",
      textIt: "La patente di categoria B consente di guidare un’autovettura che traina un rimorchio, con massa del complesso veicolare pari a 4.500 chilogrammi",
      answer: 0,
      chunks: [
        { it: "La patente di categoria B consente di guidare", fa: "گواهینامه‌ی ردیفِ B اجازه‌ی راندنِ … را می‌دهد", verb: "consente ← consentire" },
        { it: "un’autovettura che traina un rimorchio,", fa: "سواری‌ای که یدک می‌کشد،", verb: "traina ← trainare" },
        { it: "con massa del complesso veicolare pari a 4.500 chilogrammi", fa: "با وزنِ مجموعه‌ی خودرو و یدکِ برابرِ ۴۵۰۰ کیلو", focus: "limit" },
      ],
      translation: "گواهینامه‌ی ردیفِ B اجازه می‌دهد سواری‌ای را برانی که یدک می‌کشد، با وزنِ مجموعه‌ی خودرو و یدکِ برابرِ ۴۵۰۰ کیلو.",
      why: "غلط است (قدم ۱). ۴۵۰۰ از ۳۵۰۰ (B) و حتی از ۴۲۵۰ (کدِ ۹۶) بیشتر است؛ BE لازم است.",
      rule: `${ART("116")} c.3 lett. f–g`,
      conceptStep: 1,
    },
    {
      sourceId: "6222",
      textIt: "La patente di categoria B con codice armonizzato 96, può essere conseguita anche successivamente al conseguimento della patente di categoria B, superando una prova di guida su specifico veicolo",
      answer: 1,
      chunks: [
        { it: "La patente di categoria B con codice armonizzato 96,", fa: "گواهینامه‌ی ردیفِ B با کدِ ۹۶،" },
        { it: "può essere conseguita anche successivamente", fa: "می‌تواند بعداً هم گرفته شود", verb: "può ← potere" },
        { it: "al conseguimento della patente di categoria B,", fa: "بعد از گرفتنِ گواهینامه‌ی ردیفِ B،" },
        { it: "superando una prova di guida su specifico veicolo", fa: "با قبول شدن در یک آزمونِ عملی با خودروی مخصوص", verb: "superando ← superare", focus: "condition" },
      ],
      translation: "گواهینامه‌ی ردیفِ B با کدِ ۹۶ را بعد از گرفتنِ گواهینامه‌ی ردیفِ B هم می‌شود گرفت، با قبول شدن در یک آزمونِ عملی با خودروی مخصوص.",
      why: "درست است (قدم ۲). کدِ ۹۶ هم‌زمان با B یا بعد از آن، با یک آزمونِ عملی.",
      rule: `${ART("116")} c.3 lett. f`,
      conceptStep: 2,
    },
    {
      sourceId: "6230",
      textIt: "Il codice armonizzato 96, apposto sulla patente di categoria B, indica che il titolare può condurre un’autovettura che traina un rimorchio solo in Italia",
      answer: 0,
      chunks: [
        { it: "Il codice armonizzato 96, apposto sulla patente di categoria B,", fa: "کدِ ۹۶، که روی گواهینامه‌ی ردیفِ B آمده،", verb: "apposto ← apporre" },
        { it: "indica che il titolare può condurre", fa: "نشان می‌دهد دارنده‌اش می‌تواند براند", verb: "indica ← indicare" },
        { it: "un’autovettura che traina un rimorchio", fa: "سواری‌ای که یدک می‌کشد" },
        { it: "solo in Italia", fa: "فقط در ایتالیا", focus: "limit" },
      ],
      translation: "کدِ ۹۶، که روی گواهینامه‌ی ردیفِ B آمده، نشان می‌دهد دارنده‌اش فقط در ایتالیا می‌تواند سواری‌ای را که یدک می‌کشد براند.",
      why: "غلط است (قدم ۲). «هماهنگ» یعنی در همه‌ی اتحادیه‌ی اروپا همین معنا را دارد.",
      rule: "Direttiva 2006/126/CE, allegato I (codici armonizzati)",
      conceptStep: 2,
    },
    {
      sourceId: "6232",
      textIt: "Per guidare un’autovettura che traina un rimorchio di massa massima autorizzata di 2.000 chilogrammi e massa massima autorizzata del complesso veicolare pari a 4.500 chilogrammi, è necessario aver conseguito la patente di categoria BE",
      answer: 1,
      chunks: [
        { it: "Per guidare un’autovettura che traina un rimorchio", fa: "برای راندنِ سواری‌ای که یدکی می‌کشد", verb: "traina ← trainare" },
        { it: "di massa massima autorizzata di 2.000 chilogrammi", fa: "با حداکثر وزنِ مجازِ ۲۰۰۰ کیلو" },
        { it: "e massa massima autorizzata del complesso veicolare pari a 4.500 chilogrammi,", fa: "و حداکثر وزنِ مجازِ مجموعه‌ی برابرِ ۴۵۰۰ کیلو،", focus: "limit" },
        { it: "è necessario aver conseguito la patente di categoria BE", fa: "باید گواهینامه‌ی ردیفِ BE گرفته باشی", verb: "è ← essere" },
      ],
      translation: "برای راندنِ سواری‌ای که یدکی با حداکثر وزنِ مجازِ ۲۰۰۰ کیلو می‌کشد و حداکثر وزنِ مجازِ مجموعه‌اش ۴۵۰۰ کیلوست، باید گواهینامه‌ی ردیفِ BE گرفته باشی.",
      why: "درست است (قدم ۳). جمع بالای ۴۲۵۰ است، یدک و کشنده هر کدام تا ۳۵۰۰: BE.",
      rule: `${ART("116")} c.3 lett. g`,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6202", "6205", "6209", "6217", "6218"] },
    { step: 2, sourceIds: ["6221", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "6229", "6230"] },
    { step: 3, sourceIds: ["6231", "6232", "6233", "6234", "6235", "6236", "6237", "6238", "6239", "6240"] },
  ],
};
