/**
 * src/content/lessons-sorpasso.ts
 * Chapter 4 of the learning path: Sorpasso e segnaletica orizzontale.
 * Same trust rules as src/content/lessons.ts — real bank statements by
 * source_id with text + answer snapshots, faithful translations, explicit
 * question → section mappings — plus three step kinds of its own, drawn by
 * public/js/overtaking.js:
 *
 *  - "markings": centre lines read from either lane. Who may cross follows
 *    CdS art. 40 c.4, c.8 (the stripe next to you decides) and is checked
 *    against bank statements in tests/overtaking.test.ts.
 *  - "assess": "Assess the situation" (src/content/overtaking.ts). The two
 *    verdicts come from the server; the client only draws and labels.
 *  - "manoeuvre": the overtaking manoeuvre stage by stage (art. 148 c.2–4,
 *    art. 154 c.1–2), with playback, replay and manual steps; static under
 *    reduced motion.
 *
 * Sources reviewed 2026-10-10 on Normattiva (testo vigente): CdS artt. 40,
 * 148, 154 (agg. 24/04/2026); DPR 495/1992 artt. 104, 116, 119
 * (agg. 24/02/2025). Not covered, and left unmapped on purpose: overtaking on
 * the right and trams (art. 148 c.7–9), a second overtake on multi-lane roads
 * (c.6), motorways, trucks over 3.5 t and their signs (c.14, figs II.52/II.73),
 * cyclists' and pedestrians' special cases, and headlight or horn signals.
 */
import type { Chapter, Lesson, LineMarking, SignRef } from "./lessons.js";
import { SCENE_BEHIND, SCENE_MIXED, SCENE_SIGN, SCENE_TRUCK } from "./overtaking.js";

const SIGN = "Il segnale raffigurato";
const SIGN_FA = "تابلوی نشان‌داده‌شده";
const PRESENZA = "In presenza del segnale raffigurato";
const PRESENZA_FA = "وقتی این تابلو هست";
const INTENDE = "Il conducente che intende sorpassare";
const INTENDE_FA = "راننده‌ای که می‌خواهد سبقت بگیرد";

const CDS_40 = "Codice della Strada, art. 40";
const CDS_148 = "Codice della Strada, art. 148";
const CDS_154 = "Codice della Strada, art. 154";

const DIVIETO: SignRef = { sign: 56, nameIt: "DIVIETO DI SORPASSO", nameFa: "سبقت ممنوع" };
const FINE_DIVIETO: SignRef = { sign: 82, nameIt: "FINE DIVIETO DI SORPASSO", nameFa: "پایانِ سبقت ممنوع" };

// ── Lesson 1 ──────────────────────────────────────────────────────────────────

const LINES: LineMarking[] = [
  {
    id: "dashed",
    nameIt: "STRISCIA DISCONTINUA",
    nameFa: "خط‌چین (خطِ مقطع)",
    stripes: ["dashed"],
    cross: { lower: true, upper: true },
    note:
      "از آن می‌شود عبور کرد، به شرطِ رعایتِ بقیه‌ی قواعد: برای سبقت، یا برای پیچیدن به چپ و دور زدن، جایی که مجاز و بی‌خطر است. در جاده‌ی یک‌طرفه فقط خط‌های عبورِ هم‌جهت را از هم جدا می‌کند.",
    evidence: [
      { sourceId: "2391", textIt: "La striscia bianca discontinua in figura può essere superata", answer: 1, image: 502, agrees: true, adjacent: "dashed", claimsCrossable: true },
      {
        sourceId: "2407",
        textIt: "Le strisce lungo il centro della carreggiata possono essere superate se discontinue (tratteggiate)",
        answer: 1,
        agrees: true,
        adjacent: "dashed",
        claimsCrossable: true,
      },
      {
        sourceId: "5220",
        textIt: "Il sorpasso è vietato se si è costretti a superare la linea longitudinale tratteggiata",
        answer: 0,
        agrees: false,
        adjacent: "dashed",
        claimsCrossable: false,
      },
    ],
  },
  {
    id: "solid",
    nameIt: "STRISCIA CONTINUA",
    nameFa: "خطِ ممتد",
    stripes: ["solid"],
    cross: { lower: false, upper: false },
    note:
      "نباید از آن عبور کرد، نه برای سبقت، نه برای پیچیدن به چپ یا دور زدن. معمولاً جایی است که دید کم است: پیش از پیچ، روی سربالاییِ قله، نزدیکِ تقاطع یا گذرگاهِ عابر.",
    evidence: [
      { sourceId: "2594", textIt: "La striscia bianca continua di mezzo in figura non può essere superata", answer: 1, image: 501, agrees: true, adjacent: "solid", claimsCrossable: false },
      {
        sourceId: "2408",
        textIt: "Le strisce lungo il centro della carreggiata non possono essere superate se continue",
        answer: 1,
        agrees: true,
        adjacent: "solid",
        claimsCrossable: false,
      },
      {
        sourceId: "2601",
        textIt: "La striscia bianca continua di mezzo in figura consente il sorpasso anche superandola, purché con le sole ruote di sinistra",
        answer: 0,
        image: 501,
        agrees: false,
        adjacent: "solid",
        claimsCrossable: true,
      },
    ],
  },
  {
    id: "double",
    nameIt: "DOPPIA STRISCIA CONTINUA",
    nameFa: "خطِ ممتدِ دوتایی",
    stripes: ["solid", "solid"],
    cross: { lower: false, upper: false },
    note: "همان قاعده‌ی خطِ ممتد، برای هر دو جهت: عبور، پیچیدن به چپ و دور زدن ممنوع است.",
    evidence: [
      { sourceId: "2415", textIt: "La doppia striscia continua in figura non può essere superata", answer: 1, image: 509, agrees: true, adjacent: "solid", claimsCrossable: false },
      { sourceId: "2423", textIt: "La doppia striscia continua in figura può essere superata", answer: 0, image: 509, agrees: false, adjacent: "solid", claimsCrossable: true },
    ],
  },
  {
    id: "mixed",
    nameIt: "STRISCIA CONTINUA AFFIANCATA A UNA DISCONTINUA",
    nameFa: "خطِ ممتد کنارِ خط‌چین",
    stripes: ["dashed", "solid"],
    cross: { lower: true, upper: false },
    note:
      "هر راننده خطِ نزدیکِ خودش را می‌خواند: سمتِ خط‌چین می‌تواند از هر دو خط عبور کند، سمتِ ممتد نه. معمولاً سمتی ممتد است که جلویش پیچ، سربالاییِ قله یا تقاطع است؛ سمتِ خط‌چین آن را پشت سر گذاشته، مثلاً بعد از پیچ یا در سرازیریِ بعد از قله.",
    evidence: [
      {
        sourceId: "2466",
        textIt:
          "Rispetto al veicolo che procede nel senso della freccia, la striscia discontinua in figura consente di effettuare un sorpasso anche superando tutte e due le strisce",
        answer: 1,
        image: 566,
        agrees: true,
        adjacent: "dashed",
        claimsCrossable: true,
      },
      {
        sourceId: "2469",
        textIt:
          "Rispetto al veicolo che procede nel senso della freccia, la striscia discontinua in figura consente anche al veicolo che viene di fronte di superare le strisce",
        answer: 0,
        image: 566,
        agrees: false,
        adjacent: "solid",
        claimsCrossable: true,
      },
      { sourceId: "2459", textIt: "Il veicolo in figura non può superare la striscia continua centrale", answer: 1, image: 567, agrees: true, adjacent: "solid", claimsCrossable: false },
      {
        sourceId: "2464",
        textIt: "Il veicolo in figura può effettuare un sorpasso anche superando la striscia continua centrale",
        answer: 0,
        image: 567,
        agrees: false,
        adjacent: "solid",
        claimsCrossable: true,
      },
    ],
  },
];

const STRISCIA_502 = "La striscia bianca discontinua in figura";
const STRISCIA_502_FA = "خطِ سفیدِ خط‌چینِ تصویر";
const CONTINUA_501 = "La striscia bianca continua di mezzo in figura";
const CONTINUA_501_FA = "خطِ سفیدِ ممتدِ وسطِ تصویر";

const lessonStrisce: Lesson = {
  id: "sorpasso-strisce",
  titleFa: "خطِ وسطِ جاده را بخوان",
  titleIt: "STRISCE LONGITUDINALI",
  minutes: 4,
  signs: [],
  figures: [501, 502, 509, 566, 567],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس هر خطِ وسطِ جاده را از سمتِ خودت می‌خوانی: خط‌چین، ممتد، ممتدِ دوتایی، و ممتد کنارِ خط‌چین؛ و می‌دانی از کدام می‌شود برای سبقت، پیچیدن به چپ یا دور زدن عبور کرد.",
      why:
        "بیش از ۶۰ جمله‌ی بانک سؤال درباره‌ی همین خط‌هاست. دامِ اصلی‌شان یکی است: خطِ دوتایی برای دو جهت دو معنیِ مختلف دارد، و خطِ ممتد با «سبقت ممنوع» یکی نیست.",
      rule: `${CDS_40} c.3, c.4, c.8`,
    },
    {
      kind: "markings",
      title: "چهار خطِ وسط، از سمتِ تو",
      body:
        "خطِ وسطِ جاده‌ی دوطرفه دو جهت را از هم جدا می‌کند و می‌گوید از آن می‌شود عبور کرد یا نه. هر خط را از سمتِ خودت بخوان. جایت را عوض کن و ببین جوابِ کدام خط عوض می‌شود.",
      lines: LINES,
      takeaway:
        "«می‌توانم از خط عبور کنم؟» را خطِ سمتِ خودت جواب می‌دهد. روی هیچ خطی، چه ممتد چه خط‌چین، نباید رانندگی کنی؛ فقط از خط‌چین عبور می‌کنی. و «می‌توانم عبور کنم» هنوز یعنی «می‌توانم سبقت بگیرم» نیست: بقیه‌ی شرط‌ها در درس‌های بعد.",
      rule: `${CDS_40} c.3, c.4, c.8, c.10 lett. b`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la striscia continua", fa: "خطِ ممتد" },
        { it: "la striscia discontinua", fa: "خط‌چین؛ خطِ مقطع", note: "در سؤال‌ها «tratteggiata» هم به همین معنی می‌آید." },
        { it: "la striscia di mezzo", fa: "خطِ وسط؛ خطی که دو جهت را جدا می‌کند" },
        {
          it: "superare",
          fa: "عبور کردن (از خط)؛ جلو زدن",
          note: "در این سؤال‌ها هم «از خط عبور کردن» است و هم «از وسیله جلو زدن»؛ از بقیه‌ی جمله معلوم می‌شود.",
        },
        { it: "a cavallo", fa: "سوار بر خط؛ با چرخ‌ها در دو طرفِ آن" },
        { it: "la corsia", fa: "خطِ عبور؛ لاین" },
        { it: "il senso di marcia", fa: "جهتِ حرکت", note: "doppio senso = دوطرفه؛ senso unico = یک‌طرفه." },
        { it: "affiancata", base: "affiancare", fa: "در کنارِ (چیزی) قرار گرفته" },
      ],
    },
    {
      kind: "trap",
      title: "خطِ ممتد یعنی «سبقت ممنوع»؟ نه دقیقاً",
      body: "خیلی‌ها خطِ ممتد را با «سبقت ممنوع» یکی می‌دانند. قانون چیزِ دیگری می‌گوید: از خطِ ممتد نباید عبور کرد. این دو جمله‌ی بانک را مقایسه کن:",
      examples: [
        {
          sourceId: "2598",
          figure: 501,
          textIt: "La striscia bianca continua di mezzo in figura permette la manovra di sorpasso senza superarla",
          answer: 1,
          chunks: [
            { it: CONTINUA_501, fa: CONTINUA_501_FA },
            { it: "permette la manovra di sorpasso", fa: "اجازه‌ی سبقت را می‌دهد", verb: "permette ← permettere" },
            { it: "senza superarla", fa: "بدون عبور از آن", focus: "condition", note: "«superarla» یعنی superare + la: «از آن عبور کردن»." },
          ],
          translation: "خطِ سفیدِ ممتدِ وسطِ تصویر اجازه‌ی سبقت را می‌دهد، بدون اینکه از آن عبور کنی.",
          why:
            "درست است. خطِ ممتد عبور از خط را ممنوع می‌کند، نه هر سبقتی را. اگر وسیله‌ی جلویی آن‌قدر باریک است که بدون عبور از خط و با فاصله‌ی جانبیِ کافی از آن جلو می‌زنی، خط مانع نیست.",
        },
        {
          sourceId: "2601",
          figure: 501,
          textIt: "La striscia bianca continua di mezzo in figura consente il sorpasso anche superandola, purché con le sole ruote di sinistra",
          answer: 0,
          chunks: [
            { it: CONTINUA_501, fa: CONTINUA_501_FA },
            { it: "consente il sorpasso", fa: "اجازه‌ی سبقت را می‌دهد", verb: "consente ← consentire" },
            { it: "anche superandola,", fa: "حتی با عبور از آن،", verb: "superandola ← superare" },
            { it: "purché", fa: "به شرطِ اینکه", focus: "condition" },
            { it: "con le sole ruote di sinistra", fa: "فقط با چرخ‌های سمتِ چپ", focus: "limit" },
          ],
          translation: "خطِ سفیدِ ممتدِ وسطِ تصویر اجازه می‌دهد حتی با عبور از آن سبقت بگیری، به شرطِ اینکه فقط چرخ‌های سمتِ چپ از آن عبور کنند.",
          why: "غلط است. از خطِ ممتد نباید عبور کرد، نه کامل و نه «فقط با چرخ‌های چپ». «purché» شرطی ساخته که در قانون نیست.",
        },
      ],
      takeaway:
        "خطِ ممتد عبور را ممنوع می‌کند، نه هر سبقتی را. و «نیمه‌عبور» هم وجود ندارد: نه با یک طرفِ خودرو، نه سوار بر خط.",
      rule: `${CDS_40} c.8, c.10 lett. b`,
    },
  ],
  practice: [
    {
      sourceId: "2394",
      figure: 502,
      textIt: "La striscia bianca discontinua in figura consente, in caso si voglia sorpassare, di occupare momentaneamente l'altra corsia di marcia",
      answer: 1,
      chunks: [
        { it: STRISCIA_502, fa: STRISCIA_502_FA },
        { it: "consente,", fa: "اجازه می‌دهد،", verb: "consente ← consentire" },
        { it: "in caso si voglia sorpassare,", fa: "اگر بخواهی سبقت بگیری،", focus: "condition", verb: "si voglia ← volere" },
        { it: "di occupare momentaneamente", fa: "که موقتاً اشغال کنی" },
        { it: "l'altra corsia di marcia", fa: "خطِ عبورِ دیگر را" },
      ],
      translation: "خطِ سفیدِ خط‌چینِ تصویر اجازه می‌دهد، اگر بخواهی سبقت بگیری، موقتاً خطِ عبورِ دیگر را اشغال کنی.",
      why:
        "درست است. از خط‌چین می‌شود عبور کرد: برای سبقت، موقتاً به خطِ عبورِ مقابل می‌روی و بعد برمی‌گردی. بقیه‌ی قواعدِ سبقت البته سرِ جایشان است.",
      rule: `${CDS_40} c.3, c.8`,
      conceptStep: 1,
    },
    {
      sourceId: "2399",
      figure: 502,
      textIt: "La striscia bianca discontinua in figura consente di circolare stando a cavallo di essa",
      answer: 0,
      chunks: [
        { it: STRISCIA_502, fa: STRISCIA_502_FA },
        { it: "consente di circolare", fa: "اجازه می‌دهد رانندگی کنی", verb: "consente ← consentire" },
        {
          it: "stando a cavallo di essa",
          fa: "در حالی که سوار بر آن هستی",
          verb: "stando ← stare",
          note: "«a cavallo» یعنی چرخ‌ها در دو طرفِ خط: رانندگی روی خط.",
        },
      ],
      translation: "خطِ سفیدِ خط‌چینِ تصویر اجازه می‌دهد سوار بر آن، با چرخ‌ها در دو طرفش، رانندگی کنی.",
      why:
        "غلط است. از خط‌چین فقط عبور می‌کنی، مثلاً برای سبقت یا عوض کردنِ خطِ عبور. رانندگی روی خط‌های طولی ممنوع است، چه ممتد باشند چه خط‌چین.",
      rule: `${CDS_40} c.10 lett. b`,
      conceptStep: 1,
    },
    {
      sourceId: "2459",
      figure: 567,
      textIt: "Il veicolo in figura non può superare la striscia continua centrale",
      answer: 1,
      chunks: [
        { it: "Il veicolo in figura", fa: "وسیله‌ی تصویر" },
        { it: "non può superare", fa: "نمی‌تواند عبور کند (از)", focus: "negation", verb: "può ← potere" },
        { it: "la striscia continua centrale", fa: "خطِ ممتدِ وسط" },
      ],
      translation: "وسیله‌ی تصویر نمی‌تواند از خطِ ممتدِ وسط عبور کند.",
      why:
        "درست است. در شکل، خطِ وسط دوتایی است و خطِ نزدیک به این خودرو ممتد است. قاعده را خطِ سمتِ خودت تعیین می‌کند، پس این خودرو نباید عبور کند، حتی اگر آن طرف خط‌چین باشد.",
      rule: `${CDS_40} c.4, c.8`,
      conceptStep: 1,
    },
    {
      sourceId: "2469",
      figure: 566,
      textIt:
        "Rispetto al veicolo che procede nel senso della freccia, la striscia discontinua in figura consente anche al veicolo che viene di fronte di superare le strisce",
      answer: 0,
      chunks: [
        { it: "Rispetto al veicolo che procede nel senso della freccia,", fa: "نسبت به خودرویی که در جهتِ فلش می‌رود،", verb: "procede ← procedere" },
        { it: "la striscia discontinua in figura", fa: "خط‌چینِ تصویر" },
        { it: "consente anche", fa: "اجازه می‌دهد که حتی", verb: "consente ← consentire" },
        { it: "al veicolo che viene di fronte", fa: "خودرویی که از روبه‌رو می‌آید", verb: "viene ← venire" },
        { it: "di superare le strisce", fa: "از خط‌ها عبور کند" },
      ],
      translation:
        "نسبت به خودرویی که در جهتِ فلش می‌رود، خط‌چینِ تصویر اجازه می‌دهد که خودرویی هم که از روبه‌رو می‌آید از خط‌ها عبور کند.",
      why:
        "غلط است. خط‌چین سمتِ خودروی تصویر است؛ خودرویی که از روبه‌رو می‌آید خطِ ممتد را کنارِ خودش دارد و نباید عبور کند. هر راننده خطِ سمتِ خودش را می‌خواند.",
      rule: `${CDS_40} c.4, c.8`,
      conceptStep: 1,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        // Dashed line (img 502) and the centre line in general
        "2391", "2392", "2393", "2394", "2395", "2396", "2397", "2398", "2399", "2404", "2405",
        "2407", "2408", "2542", "2544", "2549", "2579", "2580", "2586", "2587", "2592",
        // Solid line (img 501)
        "2409", "2413", "2591", "2593", "2594", "2595", "2596", "2597", "2598", "2599", "2600", "2601", "2602",
        // Double solid line (img 509)
        "2410", "2414", "2415", "2416", "2417", "2418", "2423", "2588", "2589", "2590",
        // Solid beside dashed, from either side (img 566, 567)
        "2456", "2457", "2458", "2459", "2460", "2461", "2462", "2463", "2464",
        "2465", "2466", "2467", "2468", "2469", "2470", "2471", "2472", "2473",
        // The same rules without an image
        "5192", "5220", "5246", "5259",
      ],
    },
  ],
};

// ── Lesson 2 ──────────────────────────────────────────────────────────────────

const lessonSegnali: Lesson = {
  id: "sorpasso-segnali",
  titleFa: "تابلو و خط با هم: سبقت ممنوع است؟",
  titleIt: "DIVIETO DI SORPASSO",
  minutes: 5,
  signs: [56, 82],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی تابلوی DIVIETO DI SORPASSO سبقت از چه چیزی را ممنوع می‌کند و کجا تمام می‌شود، و وقتی تابلو و خط هر دو هستند، چطور هر دو را با هم می‌خوانی.",
      why:
        "حدود ۳۰ جمله‌ی بانک سؤال درباره‌ی همین دو تابلوست و بیشترشان یک چیز را می‌سنجند: این تابلو سبقت از وسیله‌های موتوری را منع می‌کند، نه از هر وسیله‌ای.",
      rule: "DPR 495/1992, art. 116 c.1 lett. c; art. 119 c.1 lett. c",
    },
    {
      kind: "compare",
      title: "شروع و پایانِ ممنوعیت",
      body: "تابلوهای ممنوعیت بعد از هر تقاطع دوباره نصب می‌شوند، و پایانِ این یکی تابلوی مخصوصِ خودش را دارد.",
      items: [DIVIETO, FINE_DIVIETO],
      rows: [
        { label: "شکل", values: ["دایره با حاشیه‌ی قرمز؛ دو خودرو، یکی قرمز", "دایره‌ی سفید با نوارِ سیاهِ مورب؛ دو خودروی خاکستری"] },
        {
          label: "یعنی",
          values: [
            "سبقت از وسیله‌های موتوری ممنوع است، به‌جز موتورسیکلت و موتور گازی. برای همه‌ی رانندگان، حتی موتورسوار: مهم این است از چه چیزی سبقت می‌گیری.",
            "ممنوعیتِ سبقتی که قبلاً گذاشته شده، این‌جا برای همه‌ی وسیله‌ها تمام می‌شود.",
          ],
        },
        {
          label: "کدام وسیله‌ها؟",
          values: [
            "ممنوع: سواری، کامیون، اتوبوس، تراکتور و ماشین‌آلاتِ کار؛ حتی برقی یا خیلی کند. ممنوع نیست: موتورسیکلت، موتور گازی، دوچرخه، گاری.",
            "همه؛ نه فقط سواری‌ها.",
          ],
        },
        {
          label: "با خط‌کشی",
          values: [
            "با خطِ ممتد یا بدون آن، و حتی اگر سبقت در نیمه‌ی خودت از جاده جا شود.",
            "پایانِ تابلو خطِ ممتد را برنمی‌دارد: از خطِ ممتد هنوز نباید عبور کنی.",
          ],
        },
      ],
      takeaway: "تابلو و خط دو قاعده‌ی جدا هستند و هر دو باید اجازه بدهند. خط‌چین تابلو را باطل نمی‌کند، و پایانِ تابلو خطِ ممتد را.",
      rule: `DPR 495/1992, art. 104 c.2, art. 116 c.1 lett. c, art. 119 c.1 lett. c; ${CDS_40} c.8`,
    },
    {
      kind: "assess",
      title: "سنجشِ موقعیت: تابلو و خط",
      body:
        "هر صحنه دو پرسشِ جدا دارد. اول قانون: آیا تابلو، خط‌کشی یا خودِ این نقطه سبقت را ممنوع می‌کند؟ بعد ایمنی: با چیزهایی که می‌دانی، می‌شود درباره‌ی ایمن بودنِ سبقت قضاوت کرد؟ «ممنوع نیست» هنوز یعنی «ایمن است» نیست.",
      scenes: [SCENE_SIGN, SCENE_MIXED],
      takeaway: "اول ببین قانون اجازه می‌دهد یا نه، بعد ببین چه می‌دانی و چه نمی‌دانی. سبقت را فقط وقتی شروع می‌کنی که هر دو جواب بدهند.",
      rule: `${CDS_148} c.2; ${CDS_40} c.4, c.8; DPR 495/1992, art. 116 c.1 lett. c`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il sorpasso", fa: "سبقت" },
        { it: "sorpassare", fa: "سبقت گرفتن؛ جلو زدن" },
        { it: "il divieto di sorpasso", fa: "ممنوعیتِ سبقت" },
        { it: "il veicolo a motore", fa: "وسیله‌ی موتوری" },
        { it: "l'autoveicolo", fa: "خودروی موتوریِ دست‌کم چهارچرخ: سواری، کامیون، اتوبوس", note: "l'autovettura = سواری." },
        { it: "il motociclo", fa: "موتورسیکلت", note: "il ciclomotore = موتور گازی (کوچک)." },
        { it: "la semicarreggiata", fa: "نیمه‌ی سواره‌رو؛ سمتِ خودت از جاده" },
        { it: "è consentito", base: "consentire", fa: "مجاز است", note: "ضدش: è vietato = ممنوع است." },
      ],
    },
    {
      kind: "trap",
      title: "«consente il sorpasso»: کِی درست است؟",
      body: "هر دو جمله می‌گویند با این تابلو سبقت «مجاز» است. یکی درست است و یکی غلط؛ فرقشان این است که از چه چیزی سبقت می‌گیری:",
      examples: [
        {
          sourceId: "1240",
          sign: 56,
          textIt: "In presenza del segnale raffigurato è consentito il sorpasso dei motocicli",
          answer: 1,
          chunks: [
            { it: PRESENZA, fa: PRESENZA_FA },
            { it: "è consentito il sorpasso", fa: "سبقت مجاز است", verb: "è ← essere" },
            { it: "dei motocicli", fa: "از موتورسیکلت‌ها" },
          ],
          translation: "وقتی این تابلو هست، سبقت از موتورسیکلت‌ها مجاز است.",
          why: "درست است. این تابلو سبقت از وسیله‌های موتوری را منع می‌کند، ولی موتورسیکلت و موتور گازی را صریحاً استثنا کرده است.",
        },
        {
          sourceId: "1249",
          sign: 56,
          textIt: "Il segnale raffigurato consente il sorpasso tra autovetture se non vi è la striscia bianca continua",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "consente il sorpasso", fa: "اجازه‌ی سبقت می‌دهد", verb: "consente ← consentire" },
            { it: "tra autovetture", fa: "بینِ سواری‌ها" },
            { it: "se", fa: "اگر", focus: "condition" },
            { it: "non vi è la striscia bianca continua", fa: "خطِ سفیدِ ممتد نباشد", focus: "negation", verb: "è ← essere" },
          ],
          translation: "تابلوی نشان‌داده‌شده اجازه می‌دهد سواری‌ها از هم سبقت بگیرند، اگر خطِ سفیدِ ممتد نباشد.",
          why: "غلط است. ممنوعیتِ تابلو به خط بستگی ندارد: با خطِ ممتد یا بدون آن، سبقت از سواری ممنوع است.",
        },
      ],
      takeaway:
        "پرسشِ درست این است: «از چه چیزی سبقت می‌گیرم؟» موتورسیکلت، موتور گازی، دوچرخه: تابلو مانع نیست. هر وسیله‌ی موتوریِ دیگر: ممنوع است، خط هر چه باشد.",
      rule: "DPR 495/1992, art. 116 c.1 lett. c",
    },
  ],
  practice: [
    {
      sourceId: "1232",
      sign: 56,
      textIt: "Il segnale raffigurato vieta il sorpasso fra autoveicoli, anche se la manovra può compiersi entro la semicarreggiata",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "vieta il sorpasso", fa: "سبقت را ممنوع می‌کند", verb: "vieta ← vietare" },
        { it: "fra autoveicoli,", fa: "بینِ خودروهای موتوری،" },
        { it: "anche se", fa: "حتی اگر", focus: "condition" },
        { it: "la manovra può compiersi", fa: "این کار بتواند انجام شود", verb: "può ← potere" },
        { it: "entro la semicarreggiata", fa: "در نیمه‌ی سواره‌روی خودت" },
      ],
      translation: "تابلوی نشان‌داده‌شده سبقتِ خودروهای موتوری از یکدیگر را ممنوع می‌کند، حتی اگر این کار در نیمه‌ی سواره‌روی خودت انجام‌شدنی باشد.",
      why: "درست است. قانون صریح است: ممنوعیت حتی وقتی هست که سبقت در نیمه‌ی خودت جا شود و به سمتِ مقابل نروی.",
      rule: "DPR 495/1992, art. 116 c.1 lett. c",
      conceptStep: 1,
    },
    {
      sourceId: "1260",
      sign: 56,
      textIt: "In presenza del segnale raffigurato è consentito il sorpasso dei veicoli a motore che procedono molto lentamente",
      answer: 0,
      chunks: [
        { it: PRESENZA, fa: PRESENZA_FA },
        { it: "è consentito il sorpasso", fa: "سبقت مجاز است", verb: "è ← essere" },
        { it: "dei veicoli a motore", fa: "از وسیله‌های موتوری" },
        { it: "che procedono molto lentamente", fa: "که خیلی آهسته می‌روند", verb: "procedono ← procedere" },
      ],
      translation: "وقتی این تابلو هست، سبقت از وسیله‌های موتوری‌ای که خیلی آهسته می‌روند مجاز است.",
      why: "غلط است. تابلو برای وسیله‌ی کند استثنا ندارد. تنها استثنای وسیله‌های موتوری موتورسیکلت و موتور گازی است.",
      rule: "DPR 495/1992, art. 116 c.1 lett. c",
      conceptStep: 1,
    },
    {
      sourceId: "1555",
      sign: 82,
      textIt: "In presenza del segnale raffigurato è vietato il sorpasso se deve essere oltrepassata la striscia continua",
      answer: 1,
      chunks: [
        { it: PRESENZA, fa: PRESENZA_FA },
        { it: "è vietato il sorpasso", fa: "سبقت ممنوع است", verb: "è ← essere" },
        { it: "se", fa: "اگر", focus: "condition" },
        { it: "deve essere oltrepassata", fa: "باید از آن عبور کرد", verb: "deve ← dovere" },
        { it: "la striscia continua", fa: "خطِ ممتد" },
      ],
      translation: "وقتی این تابلو هست، اگر برای سبقت باید از خطِ ممتد عبور کرد، سبقت ممنوع است.",
      why:
        "درست است. این تابلوی پایانِ ممنوعیتِ سبقت است، ولی فقط ممنوعیتِ تابلو را تمام می‌کند. خطِ ممتد قاعده‌ی خودش را دارد و هنوز نباید از آن عبور کنی.",
      rule: `DPR 495/1992, art. 119 c.1 lett. c; ${CDS_40} c.8`,
      conceptStep: 1,
    },
    {
      sourceId: "1241",
      sign: 56,
      textIt: "Il segnale raffigurato consente il sorpasso delle biciclette",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "consente il sorpasso", fa: "اجازه‌ی سبقت می‌دهد", verb: "consente ← consentire" },
        { it: "delle biciclette", fa: "از دوچرخه‌ها" },
      ],
      translation: "تابلوی نشان‌داده‌شده اجازه می‌دهد از دوچرخه‌ها سبقت بگیری.",
      why:
        "درست است. ممنوعیتِ این تابلو فقط وسیله‌های موتوری را می‌گیرد و دوچرخه موتور ندارد. فاصله‌ی جانبیِ کافی و بقیه‌ی قواعدِ سبقت سرِ جایشان است.",
      rule: "DPR 495/1992, art. 116 c.1 lett. c",
      conceptStep: 1,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        // DIVIETO DI SORPASSO (img 56)
        "1227", "1230", "1231", "1232", "1233", "1234", "1236", "1237", "1238", "1239", "1240", "1241",
        "1242", "1243", "1244", "1245", "1247", "1248", "1249", "1250", "1252", "1256", "1258", "1259", "1260", "1261",
        // FINE DIVIETO DI SORPASSO (img 82)
        "1554", "1555", "1556", "1561", "3784",
      ],
    },
  ],
};

// ── Lesson 3 ──────────────────────────────────────────────────────────────────

const lessonValutare: Lesson = {
  id: "sorpasso-valutare",
  titleFa: "دید، فضا و ترافیکِ اطراف",
  titleIt: "VISIBILITÀ, SPAZIO, TRAFFICO",
  minutes: 5,
  signs: [2, 4, 5, 6, 7],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس پیش از هر سبقت چهار چیز را می‌سنجی (دید، رانندهٔ جلویی، پشتِ سر، فضای خالیِ جلو) و جاهایی را می‌شناسی که سبقت در آن‌ها از اساس ممنوع است.",
      why:
        "قانون یک فهرستِ بررسی دارد و بانک سؤال تک‌تکِ آن را می‌پرسد. دامِ رایج این است که فقط یکی را ببینی: فقط خودروی روبه‌رو، یا فقط تابلو.",
      rule: `${CDS_148} c.2, c.10–13`,
    },
    {
      kind: "factors",
      title: "پیش از سبقت، چه چیزهایی را بسنجی؟",
      body: "قانون از کسی که می‌خواهد سبقت بگیرد چند بررسی را با هم می‌خواهد. بانک سؤال این فهرست را این‌طور می‌پرسد:",
      columns: [
        {
          title: "این‌ها را بسنج (VERO)",
          items: [
            { fa: "دید آن‌قدر باشد که سبقت ممکن باشد", it: "la visibilità", sourceId: "5136", textIt: "Il conducente che intende sorpassare deve accertarsi che la visibilità sia tale da consentire la manovra", answer: 1 },
            {
              fa: "رانندهٔ جلویی برای همین کار راهنما نزده باشد",
              it: "non abbia segnalato",
              sourceId: "5138",
              textIt: "Il conducente che intende sorpassare deve accertarsi che il conducente che lo precede nella stessa corsia non abbia segnalato di voler compiere analoga manovra",
              answer: 1,
            },
            {
              fa: "کسی که پشتِ سرت است سبقت را شروع نکرده باشد",
              it: "non abbia iniziato il sorpasso",
              sourceId: "5139",
              textIt: "Il conducente che intende sorpassare deve accertarsi che il conducente che lo segue sulla stessa carreggiata non abbia iniziato il sorpasso",
              answer: 1,
            },
            {
              fa: "جاده برای تمام کردنِ سبقت خالی باشد",
              it: "la strada sia libera",
              sourceId: "5140",
              textIt: "Il conducente che intende sorpassare deve accertarsi che la strada sia libera per consentire la completa esecuzione del sorpasso",
              answer: 1,
            },
            {
              fa: "خودروهایی که از روبه‌رو می‌آیند",
              it: "dalla direzione opposta",
              sourceId: "5142",
              textIt: "Il conducente che intende sorpassare deve tener conto di eventuali veicoli che provengono dalla direzione opposta",
              answer: 1,
            },
            {
              fa: "طولِ خودروی خودت و وسیله‌ای که از آن جلو می‌زنی",
              it: "lunghezza del proprio veicolo",
              sourceId: "5143",
              textIt: "Il conducente che intende sorpassare deve valutare lo spazio necessario in relazione alla lunghezza del proprio veicolo e di quello da sorpassare",
              answer: 1,
            },
            {
              fa: "فرقِ سرعتت با او: اگر شتاب بگیرد، فضای بیشتری لازم است",
              it: "accelera",
              sourceId: "5193",
              textIt: "Lo spazio necessario al sorpasso aumenta se il veicolo da sorpassare accelera",
              answer: 1,
            },
            {
              fa: "پهنای سواره‌رو",
              it: "la larghezza della carreggiata",
              sourceId: "5144",
              textIt: "Il conducente che intende sorpassare deve accertarsi che la larghezza della carreggiata consenta la manovra in condizioni di sicurezza",
              answer: 1,
            },
          ],
        },
        {
          title: "نه این‌ها (FALSO)",
          items: [
            {
              fa: "فقط اینکه کسی از روبه‌رو نیاید",
              it: "semplicemente",
              sourceId: "5146",
              textIt: "Il conducente che intende sorpassare deve accertarsi semplicemente che nessun veicolo provenga dalla direzione opposta",
              answer: 0,
            },
            {
              fa: "فقط اینکه تابلوی ممنوعیت نباشد",
              it: "unicamente",
              sourceId: "5148",
              textIt: "Il conducente che intende sorpassare deve unicamente accertarsi che non vi sia nessun segnale di divieto di sorpasso",
              answer: 0,
            },
            {
              fa: "فقط راهنما زدن",
              it: "unico obbligo",
              sourceId: "5147",
              textIt: "Il conducente che intende sorpassare ha come unico obbligo quello di azionare l'indicatore di direzione (frecce)",
              answer: 0,
            },
            {
              fa: "اینکه موتورِ تو قوی‌تر باشد",
              it: "potenza del motore",
              sourceId: "5265",
              textIt: "Il conducente che intende sorpassare deve assicurarsi che la potenza del motore del proprio veicolo sia maggiore di quella del veicolo da sorpassare",
              answer: 0,
            },
            {
              fa: "طولِ خودروها بی‌اهمیت است",
              it: "indipendente dalla lunghezza",
              sourceId: "5217",
              textIt: "Lo spazio necessario per il sorpasso è indipendente dalla lunghezza dei veicoli",
              answer: 0,
            },
          ],
        },
      ],
      takeaway: "سبقت وقتی شروع می‌شود که همه‌ی بررسی‌ها جواب داده باشند. اگر یکی کم است، همین کافی است که صبر کنی.",
      rule: `${CDS_148} c.2`,
    },
    {
      kind: "factors",
      title: "کجا سبقت از اساس ممنوع است؟",
      body:
        "در بعضی جاها نمی‌بینی چه در راه است، یا کسی جلوی تو در خطر است. قانون سبقت را آن‌جا ممنوع کرده است، هر قدر هم که جاده خالی به نظر برسد.",
      columns: [
        {
          title: "این‌جاها ممنوع است (VERO)",
          items: [
            { fa: "نزدیکِ پیچ، در جاده‌ی دوطرفه‌ی دوخطه", it: "in prossimità delle curve", sourceId: "5173", textIt: "Il sorpasso è vietato in prossimità delle curve su strade a due corsie a doppio senso di marcia", answer: 1 },
            { fa: "نزدیکِ قله‌ی سربالایی (dosso)، در همان جاده", it: "in prossimità dei dossi", sourceId: "5174", textIt: "Il sorpasso è vietato in prossimità dei dossi su strade a due corsie a doppio senso di marcia", answer: 1 },
            { fa: "هر جا دید کم است", it: "scarsa visibilità", sourceId: "5175", textIt: "Il sorpasso è vietato in caso di scarsa visibilità", answer: 1 },
            {
              fa: "سبقت از کسی که خودش دارد سبقت می‌گیرد، اگر باید به سمتِ مقابل بروی",
              it: "che ne stia superando un altro",
              sourceId: "5178",
              textIt: "E' vietato il sorpasso di un veicolo che ne stia superando un altro se ciò impone di spostarsi sul lato riservato all'altro senso di marcia",
              answer: 1,
            },
            {
              fa: "سبقت از صفی که پشتِ گذرگاهِ راه‌آهن ایستاده، اگر باید به سمتِ مقابل بروی",
              it: "veicoli fermi ai passaggi a livello",
              sourceId: "5179",
              textIt: "E' vietato il sorpasso di veicoli fermi ai passaggi a livello, se bisogna impegnare la semicarreggiata opposta",
              answer: 1,
            },
            {
              fa: "سبقت از وسیله‌ای که کنارِ گذرگاهِ عابر ایستاده تا عابر رد شود",
              it: "passaggio pedonale",
              sourceId: "5189",
              textIt: "E' vietato il sorpasso di un veicolo che si sia arrestato in corrispondenza di un passaggio pedonale per consentire l'attraversamento di pedoni",
              answer: 1,
            },
            {
              fa: "نزدیکِ تقاطع، اگر برای سبقت (حتی از دوچرخه) باید به سمتِ مقابل بروی",
              it: "In vicinanza o in corrispondenza degli incroci",
              sourceId: "4584",
              textIt: "In vicinanza o in corrispondenza degli incroci non è consentito sorpassare una bicicletta, se si deve occupare la corsia opposta di marcia",
              answer: 1,
            },
          ],
        },
        {
          title: "این‌ها به‌تنهایی دلیلِ ممنوعیت نیستند (FALSO)",
          items: [
            { fa: "جاده‌ی یک‌طرفه", it: "strade a senso unico", sourceId: "5212", textIt: "E' vietato il sorpasso nelle strade a senso unico", answer: 0 },
            { fa: "بارشِ برف", it: "se nevica", sourceId: "5231", textIt: "È vietato il sorpasso se nevica", answer: 0 },
            { fa: "جلوی ورودیِ پارکینگ یا ملکِ خصوصی (passo carrabile)", it: "passi carrabili", sourceId: "5232", textIt: "È vietato il sorpasso in corrispondenza dei passi carrabili", answer: 0 },
            { fa: "نزدیکِ بیمارستان", it: "ospedali", sourceId: "5233", textIt: "È vietato il sorpasso in prossimità degli ospedali", answer: 0 },
            { fa: "نزدیکِ پمپ‌بنزین", it: "stazioni di servizio", sourceId: "5234", textIt: "È vietato il sorpasso in prossimità delle stazioni di servizio", answer: 0 },
          ],
        },
      ],
      takeaway:
        "پیچ و قله استثنا دارند: روی جاده‌ای با دو سواره‌روی جدا، یک‌طرفه، یا با دست‌کم دو خطِ عبورِ هم‌جهتِ خط‌کشی‌شده، سبقت آن‌جا هم ممنوع نیست؛ در سرازیریِ بعد از قله هم، وقتی دوباره دید داری، بانک سؤال سبقت را مجاز می‌داند. در جاده‌ی دوطرفه‌ی دوخطه، نزدیکِ پیچ و قله هیچ استثنایی نیست: نه برای موتورسیکلت، نه برای وسیله‌ی خیلی کند، نه در روز.",
      rule: `${CDS_148} c.10–13`,
    },
    {
      kind: "assess",
      title: "سنجشِ موقعیت: دید، پشتِ سر، فضای جلو",
      body:
        "این بار خط و تابلو مانع نیستند. پرسش این است که بررسی‌های لازم جواب داده‌اند یا نه. دقت کن: «نمی‌دانم» با «نه» فرق دارد.",
      scenes: [SCENE_TRUCK, SCENE_BEHIND],
      takeaway:
        "سبقت وقتی شروع می‌شود که هر چهار بررسی جواب داده باشند و هیچ‌کدام مانع نباشد. اگر یکی رد شده: «الان نه». اگر یکی بی‌جواب است: اول نگاه کن.",
      rule: `${CDS_148} c.2`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "accertarsi", fa: "مطمئن شدن", note: "در سؤال‌ها به شکلِ «deve accertarsi» زیاد می‌آید." },
        { it: "la visibilità", fa: "دید؛ میدانِ دید", note: "scarsa visibilità = دیدِ کم." },
        { it: "il dosso", fa: "قله‌ی سربالایی؛ جایی که پشتش دیده نمی‌شود", note: "در تابلوها «dosso» سرعت‌گیر هم می‌تواند باشد." },
        { it: "la curva", fa: "پیچ" },
        { it: "la direzione opposta", fa: "جهتِ مقابل", note: "«il senso opposto» و «il senso contrario» هم همین است." },
        { it: "sopraggiungere", fa: "از راه رسیدن", note: "i veicoli che sopraggiungono = خودروهایی که دارند می‌رسند." },
        { it: "l'intralcio", fa: "مزاحمت؛ مانع شدن برای دیگران" },
        { it: "lo specchietto retrovisore", fa: "آینه (بغل یا وسط)" },
      ],
    },
    {
      kind: "trap",
      title: "«روبه‌رو خالی است» کافی است؟",
      body: "هر دو جمله درباره‌ی خودروهای روبه‌رو هستند. یکی درست است و یکی غلط؛ یک کلمه فرقشان است:",
      examples: [
        {
          sourceId: "5142",
          textIt: "Il conducente che intende sorpassare deve tener conto di eventuali veicoli che provengono dalla direzione opposta",
          answer: 1,
          chunks: [
            { it: INTENDE, fa: INTENDE_FA, verb: "intende ← intendere" },
            { it: "deve tener conto", fa: "باید در نظر بگیرد", verb: "deve ← dovere" },
            { it: "di eventuali veicoli", fa: "خودروهای احتمالی را" },
            { it: "che provengono dalla direzione opposta", fa: "که از جهتِ مقابل می‌آیند", verb: "provengono ← provenire" },
          ],
          translation: "راننده‌ای که می‌خواهد سبقت بگیرد باید خودروهای احتمالی‌ای را که از جهتِ مقابل می‌آیند در نظر بگیرد.",
          why: "درست است. خودروی روبه‌رو یکی از چیزهایی است که باید سنجید.",
        },
        {
          sourceId: "5146",
          textIt: "Il conducente che intende sorpassare deve accertarsi semplicemente che nessun veicolo provenga dalla direzione opposta",
          answer: 0,
          chunks: [
            { it: INTENDE, fa: INTENDE_FA, verb: "intende ← intendere" },
            { it: "deve accertarsi", fa: "باید مطمئن شود", verb: "deve ← dovere" },
            { it: "semplicemente", fa: "فقط؛ صرفاً", focus: "limit" },
            { it: "che nessun veicolo provenga dalla direzione opposta", fa: "که هیچ خودرویی از جهتِ مقابل نیاید", focus: "negation", verb: "provenga ← provenire" },
          ],
          translation: "راننده‌ای که می‌خواهد سبقت بگیرد فقط باید مطمئن شود که هیچ خودرویی از جهتِ مقابل نمی‌آید.",
          why: "غلط است، به‌خاطرِ «semplicemente». روبه‌رو یکی از بررسی‌هاست، نه همه‌اش: دید، رانندهٔ جلویی، پشتِ سر و فضای کافی هم لازم است.",
        },
      ],
      takeaway:
        "این‌جا «semplicemente» واقعاً جواب را عوض می‌کند، چون قانون فهرستِ کامل‌تری می‌خواهد. ولی مثلِ «solo» در فصلِ اول، این کلمه همیشه نشانه‌ی غلط بودن نیست؛ با خودِ قاعده بسنج.",
      rule: `${CDS_148} c.2`,
    },
  ],
  practice: [
    {
      sourceId: "5155",
      textIt: "La manovra di sorpasso non va effettuata se lo spazio visibile risulta insufficiente per completarla in sicurezza",
      answer: 1,
      chunks: [
        { it: "La manovra di sorpasso", fa: "سبقت" },
        { it: "non va effettuata", fa: "نباید انجام شود", focus: "negation", verb: "va ← andare", note: "«va + اسمِ مفعول» یعنی «باید … شود»." },
        { it: "se", fa: "اگر", focus: "condition" },
        { it: "lo spazio visibile risulta insufficiente", fa: "فضایی که دیده می‌شود ناکافی باشد", verb: "risulta ← risultare" },
        { it: "per completarla in sicurezza", fa: "برای اینکه با ایمنی تمامش کنی" },
      ],
      translation: "اگر فضایی که دیده می‌شود برای تمام کردنِ ایمنِ سبقت کافی نباشد، سبقت نباید انجام شود.",
      why: "درست است. اگر نمی‌بینی که جاده تا پایانِ سبقت خالی است، شروعش نکن. مثلِ صحنه‌ی کامیون: همین که نمی‌بینی، جواب «الان نه» است.",
      rule: `${CDS_148} c.2 lett. a, d`,
      conceptStep: 1,
    },
    {
      sourceId: "5139",
      textIt: "Il conducente che intende sorpassare deve accertarsi che il conducente che lo segue sulla stessa carreggiata non abbia iniziato il sorpasso",
      answer: 1,
      chunks: [
        { it: INTENDE, fa: INTENDE_FA, verb: "intende ← intendere" },
        { it: "deve accertarsi", fa: "باید مطمئن شود", verb: "deve ← dovere" },
        { it: "che il conducente che lo segue", fa: "که راننده‌ای که پشتِ سرش است", verb: "segue ← seguire" },
        { it: "sulla stessa carreggiata", fa: "روی همان سواره‌رو" },
        { it: "non abbia iniziato il sorpasso", fa: "سبقت را شروع نکرده باشد", focus: "negation", verb: "abbia iniziato ← iniziare" },
      ],
      translation: "راننده‌ای که می‌خواهد سبقت بگیرد باید مطمئن شود که راننده‌ی پشتِ سرش روی همان سواره‌رو سبقت را شروع نکرده باشد.",
      why:
        "درست است. اگر کسی از پشت سبقت را شروع کرده، جایی را که تو می‌خواهی بروی گرفته است. برای همین پیش از سبقت آینه‌ها را نگاه می‌کنی و یک نگاهِ سریع هم به کنار می‌اندازی.",
      rule: `${CDS_148} c.2 lett. c`,
      conceptStep: 1,
    },
    {
      sourceId: "5174",
      textIt: "Il sorpasso è vietato in prossimità dei dossi su strade a due corsie a doppio senso di marcia",
      answer: 1,
      chunks: [
        { it: "Il sorpasso è vietato", fa: "سبقت ممنوع است", verb: "è ← essere" },
        { it: "in prossimità dei dossi", fa: "نزدیکِ قله‌های سربالایی" },
        { it: "su strade a due corsie", fa: "در جاده‌های دوخطه" },
        { it: "a doppio senso di marcia", fa: "و دوطرفه" },
      ],
      translation: "در جاده‌های دوخطه‌ی دوطرفه، سبقت نزدیکِ قله‌های سربالایی ممنوع است.",
      why: "درست است. پشتِ قله دیده نمی‌شود و ممکن است کسی از روبه‌رو بیاید. در جاده‌ی دوطرفه‌ی دوخطه این ممنوعیت استثنا ندارد.",
      rule: `${CDS_148} c.10`,
      conceptStep: 2,
    },
    {
      sourceId: "5212",
      textIt: "E' vietato il sorpasso nelle strade a senso unico",
      answer: 0,
      chunks: [
        { it: "E' vietato il sorpasso", fa: "سبقت ممنوع است", verb: "E' ← essere" },
        { it: "nelle strade a senso unico", fa: "در جاده‌های یک‌طرفه" },
      ],
      translation: "در جاده‌های یک‌طرفه سبقت ممنوع است.",
      why: "غلط است. یک‌طرفه بودن به‌خودیِ‌خود سبقت را ممنوع نمی‌کند، چون کسی از روبه‌رو نمی‌آید. بقیه‌ی قواعد و بررسی‌ها البته سرِ جایشان است.",
      rule: `${CDS_148} c.3, c.10`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        // The art. 148 c.2 checks, and what does not replace them
        "5136", "5137", "5138", "5139", "5140", "5142", "5143", "5144", "5145", "5146", "5147", "5148",
        "5155", "5156", "5161", "5193", "5194", "5195", "5199", "5200", "5216", "5217", "5249", "5252", "5253", "5265",
        "4367", "2582",
      ],
    },
    {
      step: 2,
      sourceIds: [
        // Where overtaking is forbidden (c.10–13), and the exceptions
        "5173", "5174", "5175", "5176", "5177", "5178", "5179", "5180", "5182", "5189", "5190",
        "5198", "5204", "5205", "5206", "5209", "5212", "5219", "5231", "5232", "5233", "5234",
        "5235", "5236", "5237", "5238", "5241", "5243", "4584", "2543", "2546", "2583",
        // Curve and crest signs (img 2, 4–7): no exception on a two-lane two-way road
        "570", "581", "615", "625", "628", "631", "642", "654", "670", "680", "684", "695", "704", "708",
      ],
    },
  ],
};

// ── Lesson 4 ──────────────────────────────────────────────────────────────────

const lessonFasi: Lesson = {
  id: "sorpasso-fasi",
  titleFa: "مرحله‌به‌مرحله: سبقت و رانندهٔ جلویی",
  titleIt: "LE FASI DEL SORPASSO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس سبقت را به ترتیبِ درستش انجام می‌دهی (بررسی، راهنما، عبور، آینه، برگشت) و می‌دانی رانندهٔ جلویی، که از او سبقت می‌گیری، چه وظیفه‌ای دارد و چه وظیفه‌ای ندارد.",
      why: "بانک سؤال هم از کسی که سبقت می‌گیرد می‌پرسد و هم از کسی که از او سبقت می‌گیرند. بیشترِ دام‌ها در ترتیبِ کارها و در وظیفه‌ی رانندهٔ دوم است.",
      rule: `${CDS_148} c.3–5; ${CDS_154} c.1–2`,
    },
    {
      kind: "manoeuvre",
      title: "سبقت، مرحله‌به‌مرحله",
      body: "پنج مرحله، به همین ترتیب. هر مرحله را جدا ببین یا کلِ حرکت را پخش کن. تصویر آموزشی است و به مقیاس نیست.",
      stages: [
        {
          title: "پیش از هر کاری، بسنج",
          you:
            "دور را نگاه کن: دید کافی است و جاده تا پایانِ سبقت خالی است؟ آینه‌ها و یک نگاهِ سریع به کنار: کسی از پشت سبقت را شروع نکرده؟ رانندهٔ جلویی برای سبقت راهنما نزده؟ تا آن موقع فاصله‌ات را از وسیله‌ی جلو نگه دار.",
          other: "عادی در خطِ عبورِ خودش می‌راند.",
          rule: `${CDS_148} c.2`,
          pose: { you: [8, 0], other: [34, 0] },
          indicator: "off",
          marks: ["mirror", "view"],
        },
        {
          title: "راهنمای چپ، بعد به چپ",
          you: "راهنمای چپ را با فاصله‌ی کافی بزن، بعد به خطِ عبورِ چپ برو. راهنما تا وقتی کامل به چپ رفته‌ای روشن می‌ماند. بوق زدن اجباری نیست.",
          other: "حالا که سبقت را می‌بیند، نباید شتاب بگیرد.",
          rule: `${CDS_148} c.3; ${CDS_154} c.1 lett. b, c.2`,
          pose: { you: [30, 1], other: [44, 0] },
          indicator: "left",
          marks: [],
        },
        {
          title: "سریع و با فاصله‌ی جانبیِ کافی رد شو",
          you:
            "با سرعتِ کافی، در حدِ مجاز، رد شو تا کمترین زمان را کنارِ او و در خطِ عبورِ مقابل باشی، و فاصله‌ی جانبیِ کافی بگذار. برای دوچرخه، قانونِ فعلی هر جا جاده اجازه بدهد دست‌کم ۱٫۵ متر می‌خواهد. بیش از لازم در خطِ عبورِ چپ نمان.",
          other: "کمک می‌کند: شتاب نمی‌گیرد، و در جاده‌ای که در هر جهت یک خطِ عبور دارد تا جای ممکن کنارِ لبه‌ی راست می‌ماند.",
          rule: `${CDS_148} c.3, c.4, c.9-bis`,
          pose: { you: [70, 1], other: [58, 0] },
          indicator: "off",
          marks: ["gap"],
        },
        {
          title: "پیش از برگشتن: آینه، بعد راهنمای راست",
          you: "در آینه ببین وسیله‌ای که از آن سبقت گرفتی کجاست و با فاصله پشتِ سرت هست یا نه. بعد راهنمای راست را بزن: برگشتن هم عوض کردنِ خطِ عبور است.",
          other: "به راهش ادامه می‌دهد؛ هنوز نباید شتاب بگیرد.",
          rule: `${CDS_148} c.3; ${CDS_154} c.1 lett. a–b, c.2`,
          pose: { you: [84, 1], other: [64, 0] },
          indicator: "right",
          marks: ["mirror"],
        },
        {
          title: "برگرد، بدون بریدنِ راه",
          you:
            "هر وقت ممکن شد به راست برگرد، بدون خطر یا مزاحمت: نه آن‌قدر زود که جلوی او بپیچی و مجبورش کنی ترمز کند، نه با کم کردنِ ناگهانیِ سرعت. وقتی کامل برگشتی، راهنما را خاموش کن.",
          other: "سبقت تمام شده است؛ کارِ دیگری لازم نیست.",
          rule: `${CDS_148} c.3; ${CDS_154} c.2`,
          pose: { you: [106, 0], other: [72, 0] },
          indicator: "right",
          marks: [],
        },
      ],
      takeaway: "ترتیب مهم است: اول بررسی، بعد راهنما، بعد حرکت. در پایان هم همین: آینه، راهنما، بعد برگشت، بدون بریدنِ راه.",
      rule: `${CDS_148} c.2–4; ${CDS_154} c.1–2`,
    },
    {
      kind: "factors",
      title: "اگر از تو سبقت می‌گیرند",
      body: "رانندهٔ جلویی هم وظیفه دارد. قانون از او کمک می‌خواهد، نه کارهای عجیب:",
      columns: [
        {
          title: "وظیفه‌ی اوست (VERO)",
          items: [
            { fa: "سبقت را آسان کند و شتاب نگیرد", it: "agevolare la manovra", sourceId: "5153", textIt: "Il conducente del veicolo che viene sorpassato deve agevolare la manovra di sorpasso e non accelerare", answer: 1 },
            {
              fa: "در جاده‌ی یک‌خطه در هر جهت، تا جای ممکن کنارِ لبه‌ی راست بماند",
              it: "margine destro",
              sourceId: "5154",
              textIt: "Il conducente del veicolo che viene sorpassato, nelle strade ad una corsia per senso di marcia, deve tenersi il più vicino possibile al margine destro",
              answer: 1,
            },
            { fa: "با کسی که سبقت می‌گیرد مسابقه ندهد", it: "non gareggiare", sourceId: "5266", textIt: "Il conducente del veicolo da sorpassare ha l'obbligo di non gareggiare in velocità con il veicolo sorpassante", answer: 1 },
            {
              fa: "اگر وسیله‌اش خیلی کند است، هر وقت شد کنار بکشد تا ترافیک رد شود",
              it: "veicolo molto lento",
              sourceId: "5268",
              textIt: "Il conducente del veicolo da sorpassare ha l'obbligo di fermarsi appena possibile per far defluire il traffico se guida un veicolo molto lento",
              answer: 1,
            },
            {
              fa: "اگر هم‌زمان خودرویی از روبه‌رو می‌آید، تا جای ممکن به راست برود",
              it: "il più vicino possibile al margine destro",
              sourceId: "5277",
              textIt: "Se si viene sorpassati mentre sopraggiunge un veicolo dal senso opposto, occorre spostarsi il più vicino possibile al margine destro della carreggiata",
              answer: 1,
            },
          ],
        },
        {
          title: "وظیفه‌ی او نیست (FALSO)",
          items: [
            { fa: "همیشه سرعتش را کم کند", it: "ridurre sempre", sourceId: "5272", textIt: "Il conducente del veicolo da sorpassare ha l'obbligo di ridurre sempre la propria velocità", answer: 0 },
            {
              fa: "به وسطِ جاده برود تا کسی پشتِ سرِ سبقت‌گیرنده نیاید",
              it: "al centro della carreggiata",
              sourceId: "5270",
              textIt: "Il conducente del veicolo da sorpassare ha l'obbligo di portarsi al centro della carreggiata per evitare sorpassi in scia",
              answer: 0,
            },
            { fa: "دنده را سنگین‌تر کند", it: "marce più basse", sourceId: "5273", textIt: "Il conducente del veicolo da sorpassare ha l'obbligo di inserire le marce più basse per facilitare il sorpasso", answer: 0 },
            {
              fa: "فلاشر بزند تا بگوید جاده خالی است",
              it: "segnalazione luminosa di pericolo",
              sourceId: "5271",
              textIt:
                "Il conducente del veicolo da sorpassare ha l'obbligo di azionare la segnalazione luminosa di pericolo(lampeggio simultaneo di tutte le frecce) per segnalare che la strada è sgombra",
              answer: 0,
            },
          ],
        },
      ],
      takeaway:
        "رانندهٔ جلویی با یک کارِ ساده کمک می‌کند: شتاب نگیرد و راست بماند. لازم نیست همیشه سرعتش را کم کند؛ فقط اگر وسیله‌اش کند یا بزرگ است و سبقت از او سخت است، باید آهسته کند و در صورتِ لزوم کنار بکشد.",
      rule: `${CDS_148} c.4, c.5`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'indicatore di direzione", fa: "چراغ راهنما", note: "در سؤال‌ها «le frecce» هم می‌گویند." },
        { it: "azionare", fa: "روشن کردن؛ به کار انداختن" },
        { it: "agevolare", fa: "آسان کردن؛ کمک کردن" },
        { it: "rientrare", fa: "برگشتن (به خطِ عبورِ خودت)", note: "«riportarsi a destra» هم یعنی به راست برگشتن." },
        { it: "tagliare la strada", base: "tagliare", fa: "راهِ کسی را بریدن" },
        { it: "la distanza laterale", fa: "فاصله‌ی جانبی" },
        { it: "il margine destro", fa: "لبه‌ی راستِ سواره‌رو" },
        { it: "accelerare", fa: "شتاب گرفتن؛ تند کردن" },
      ],
    },
    {
      kind: "trap",
      title: "«فوراً» یا «هر وقت ممکن شد»؟",
      body: "هر دو جمله درباره‌ی برگشتن به راست بعد از سبقت‌اند. فرقشان در یک قید است:",
      examples: [
        {
          sourceId: "5152",
          textIt: "Dopo aver effettuato una manovra di sorpasso il conducente del veicolo deve riportarsi a destra appena possibile senza creare pericolo o intralcio",
          answer: 1,
          chunks: [
            { it: "Dopo aver effettuato una manovra di sorpasso", fa: "بعد از انجامِ سبقت", verb: "aver effettuato ← effettuare" },
            { it: "il conducente del veicolo", fa: "راننده" },
            { it: "deve riportarsi a destra", fa: "باید به راست برگردد", verb: "deve ← dovere" },
            { it: "appena possibile", fa: "هر وقت ممکن شد", focus: "condition" },
            { it: "senza creare pericolo o intralcio", fa: "بدون اینکه خطر یا مزاحمتی بسازد", focus: "condition" },
          ],
          translation: "بعد از انجامِ سبقت، راننده باید هر وقت ممکن شد به راست برگردد، بدون اینکه خطر یا مزاحمتی بسازد.",
          why: "درست است. «appena possibile» یعنی وقتی ممکن شد: وقتی در آینه دیدی وسیله‌ی سبقت‌گرفته‌شده با فاصله پشتِ سرت است.",
        },
        {
          sourceId: "5228",
          textIt: "Dopo il sorpasso bisogna rientrare immediatamente a destra, rallentando",
          answer: 0,
          chunks: [
            { it: "Dopo il sorpasso", fa: "بعد از سبقت" },
            { it: "bisogna rientrare", fa: "باید برگشت", verb: "bisogna ← bisognare" },
            { it: "immediatamente a destra,", fa: "فوراً به راست،", note: "«immediatamente» یعنی فوراً؛ با «appena possibile» فرق دارد." },
            { it: "rallentando", fa: "در حالی که سرعت را کم می‌کنی", verb: "rallentando ← rallentare" },
          ],
          translation: "بعد از سبقت باید فوراً به راست برگشت، در حالی که سرعت را کم می‌کنی.",
          why:
            "غلط است. «فوراً» و «با کم کردنِ سرعت» دقیقاً همان کاری است که راهِ وسیله‌ی سبقت‌گرفته‌شده را می‌بُرد و مجبورش می‌کند ترمز کند. قانون می‌گوید «هر وقت ممکن شد، بدون خطر یا مزاحمت».",
        },
      ],
      takeaway: "زود برگرد، ولی نه آن‌قدر زود که راه را ببری. وقتی در آینه دیدی با فاصله پشتِ سرت است، راهنمای راست را بزن و برگرد.",
      rule: `${CDS_148} c.3`,
    },
  ],
  practice: [
    {
      sourceId: "5918",
      textIt:
        "L’uso degli indicatori di direzione è necessario quando si inizia una manovra di sorpasso, ma non quando la si termina rientrando nella corsia di marcia normale",
      answer: 0,
      chunks: [
        { it: "L’uso degli indicatori di direzione", fa: "استفاده از چراغ راهنما" },
        { it: "è necessario", fa: "لازم است", verb: "è ← essere" },
        { it: "quando si inizia una manovra di sorpasso,", fa: "وقتی سبقت را شروع می‌کنی،", verb: "si inizia ← iniziare" },
        { it: "ma non", fa: "اما نه", focus: "contrast" },
        { it: "quando la si termina", fa: "وقتی تمامش می‌کنی", verb: "si termina ← terminare" },
        { it: "rientrando nella corsia di marcia normale", fa: "و به خطِ عبورِ عادی برمی‌گردی", verb: "rientrando ← rientrare" },
      ],
      translation: "استفاده از چراغ راهنما وقتی سبقت را شروع می‌کنی لازم است، اما وقتی تمامش می‌کنی و به خطِ عبورِ عادی برمی‌گردی لازم نیست.",
      why: "غلط است. برگشتن به راست هم عوض کردنِ خطِ عبور است و باید با راهنما خبرش را بدهی؛ راهنما تا پایانِ همین حرکت روشن می‌ماند.",
      rule: `${CDS_154} c.1 lett. b, c.2`,
      conceptStep: 1,
    },
    {
      sourceId: "5203",
      textIt: "Prima di rientrare nella corsia di destra dopo il sorpasso, occorre controllare la posizione del veicolo sorpassato attraverso gli specchietti retrovisori",
      answer: 1,
      chunks: [
        { it: "Prima di rientrare nella corsia di destra", fa: "پیش از برگشتن به خطِ عبورِ راست" },
        { it: "dopo il sorpasso,", fa: "بعد از سبقت،" },
        { it: "occorre controllare", fa: "لازم است بررسی کنی", verb: "occorre ← occorrere" },
        { it: "la posizione del veicolo sorpassato", fa: "جای وسیله‌ای را که از آن سبقت گرفته‌ای" },
        { it: "attraverso gli specchietti retrovisori", fa: "در آینه‌ها" },
      ],
      translation: "پیش از برگشتن به خطِ عبورِ راست بعد از سبقت، لازم است جای وسیله‌ای را که از آن سبقت گرفته‌ای در آینه‌ها بررسی کنی.",
      why: "درست است. تا در آینه نبینی که با فاصله پشتِ سرت است، نمی‌دانی برگشتنت راهِ او را می‌بُرد یا نه.",
      rule: `${CDS_148} c.3`,
      conceptStep: 1,
    },
    {
      sourceId: "5227",
      textIt: "Nell'eseguire la manovra di sorpasso non bisogna accelerare",
      answer: 0,
      chunks: [
        { it: "Nell'eseguire la manovra di sorpasso", fa: "هنگامِ انجامِ سبقت" },
        { it: "non bisogna accelerare", fa: "نباید شتاب گرفت", focus: "negation", verb: "bisogna ← bisognare" },
      ],
      translation: "هنگامِ سبقت نباید شتاب گرفت.",
      why: "غلط است. قانون می‌گوید باید «سریع» بگذری تا مدتِ کمتری کنارِ او و در خطِ عبورِ مقابل باشی، در حدِ مجاز. کسی که نباید شتاب بگیرد رانندهٔ جلویی است.",
      rule: `${CDS_148} c.3, c.4`,
      conceptStep: 1,
    },
    {
      sourceId: "5153",
      textIt: "Il conducente del veicolo che viene sorpassato deve agevolare la manovra di sorpasso e non accelerare",
      answer: 1,
      chunks: [
        { it: "Il conducente del veicolo che viene sorpassato", fa: "رانندهٔ وسیله‌ای که از آن سبقت می‌گیرند", verb: "viene sorpassato ← sorpassare" },
        { it: "deve agevolare la manovra di sorpasso", fa: "باید سبقت را آسان کند", verb: "deve ← dovere" },
        { it: "e non accelerare", fa: "و شتاب نگیرد", focus: "negation" },
      ],
      translation: "رانندهٔ وسیله‌ای که از آن سبقت می‌گیرند باید سبقت را آسان کند و شتاب نگیرد.",
      why: "درست است. این وظیفه‌ی رانندهٔ دوم است: کمک کند، شتاب نگیرد و در جاده‌ی یک‌خطه کنارِ لبه‌ی راست بماند.",
      rule: `${CDS_148} c.4`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        // Signal, pass, mirror, return (art. 148 c.3; art. 154)
        "5149", "5150", "5152", "5157", "5158", "5159", "5202", "5203", "5226", "5227", "5228", "5248",
        "5250", "5251", "5254", "5255", "5262", "5912", "5917", "5918", "4690", "4691", "4708", "4711",
      ],
    },
    {
      step: 2,
      sourceIds: [
        // The driver being overtaken (art. 148 c.4–5)
        "5153", "5154", "5266", "5267", "5268", "5270", "5271", "5272", "5273", "5277", "5278",
      ],
    },
  ],
};

export const SORPASSO_CHAPTER: Chapter = {
  id: "sorpasso-segnaletica",
  topicIds: [12, 5],
  nameIt: "Sorpasso e segnaletica orizzontale",
  titleFa: "سبقت و خط‌کشی جاده",
  summaryFa: "کِی می‌شود سبقت گرفت؟ چهار درسِ کوتاه: خواندنِ خطِ وسط، تابلو و خط با هم، سنجیدنِ دید و ترافیک، و مراحلِ سبقت.",
  reviewedOn: "2026-10-10",
  sources: [
    {
      label: "Codice della Strada (D.Lgs. 285/1992), artt. 40, 148, 154 — testo vigente, agg. 24/04/2026",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    {
      label: "Regolamento di esecuzione (DPR 495/1992), artt. 104, 116, 119 — testo vigente, agg. 24/02/2025",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1992-12-16;495",
    },
    {
      label: "ACI, Codice della Strada art. 148 «Sorpasso» (pagina aggiornata il 10/10/2026)",
      url: "https://aci.gov.it/codice-della-strada/art-148/",
    },
    {
      label: "ACI, Codice della Strada art. 40 «Segnali orizzontali» (pagina aggiornata il 10/10/2026)",
      url: "https://aci.gov.it/codice-della-strada/art-40/",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023)",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [lessonStrisce, lessonSegnali, lessonValutare, lessonFasi],
};
