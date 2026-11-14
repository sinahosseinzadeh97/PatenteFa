/**
 * src/content/ch17-rimorchio.ts
 * Chapter 17 (Norme varie, autostrade, pannelli), lessons 11–12: the trailer's
 * brake, hitch and upkeep, then driving with it: the tighter curve its wheels
 * cut (road.js scene "rimorchio"), the forces it adds, and how a trailer or a
 * caravan is loaded. Most of this is technical knowledge from the ministerial
 * programme, not an article of law; each `rule` says which.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter17.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const TECNICA = "nozione tecnica dal programma ministeriale, non una norma";
const OMOLOGAZIONE = "Codice della Strada, art. 72 (dispositivi omologati); manutenzione: nozione tecnica";
const INERZIA = "Nei rimorchi dotati di freno a inerzia";
const INERZIA_FA = "در یدک‌هایی که ترمزِ اینرسی دارند";
const ORGANI = "Gli organi di traino di un veicolo";
const ORGANI_FA = "قطعه‌های یدک‌کشیِ یک وسیله";
const GUIDA = "Alla guida di un veicolo con rimorchio,";
const GUIDA_FA = "وقتی خودرویی با یدک می‌رانی،";

// ── Lesson 11 ─────────────────────────────────────────────────────────────────

export const lessonRimorchioFreni: Lesson = {
  id: "rimorchio-freni-gancio",
  titleFa: "ترمز، قلاب و نگهداریِ یدک",
  titleIt: "RIMORCHI · FRENO A INERZIA, ORGANI DI TRAINO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌فهمی ترمزِ اینرسی چطور کار می‌کند و چرا یدک کمی دیرتر از خودرو ترمز می‌گیرد، از قلاب و اتصالِ برق چه انتظاری هست، و یدکی را که مدتی بیکار مانده چطور نگه می‌داری.",
      why:
        "۳۰ سؤال، بیشترشان فنی. بیشترِ دام‌ها یک میان‌بُر پیشنهاد می‌کنند: قلابِ تأییدنشده برای یدکِ سبک، یدکِ سبک بی‌اتصالِ برق، جوش دادنِ قلابِ شکسته، شستنِ گریسِ قلاب با بنزین. هیچ‌کدام مجاز نیست.",
      rule: OMOLOGAZIONE,
    },
    {
      kind: "table",
      title: "ترمزِ اینرسی: یدک بعد از تو ترمز می‌کند",
      body:
        "یدک‌هایی که پشتِ سواری بسته می‌شوند معمولاً ترمزِ اینرسی (freno a inerzia) دارند: پدالی در کار نیست. وقتی تو ترمز می‌کنی، یدک به قلاب فشار می‌آورد و همین فشار ترمزِ یدک را می‌کشد.",
      columns: ["درست", "دامِ بانک"],
      rows: [
        {
          label: "کِی ترمز می‌گیرد",
          it: "non avviene simultaneamente",
          values: ["همزمان با خودرو نه؛ کمی بعد، وقتی یدک به خودرو نزدیک می‌شود و فشار می‌آورد", "«همزمان» و «یک ثانیه زودتر از خودرو» هر دو غلط‌اند"],
        },
        {
          label: "اگر جدا شد",
          it: "sganciamento accidentale",
          values: ["یک کابلِ ایمنی، اگر یدک ناگهان جدا شود، ترمزِ دستیِ آن را خودبه‌خود می‌کشد", ""],
        },
        {
          label: "بعد از بیکاری",
          it: "ruggine",
          values: ["ترمزها ممکن است از زنگ‌زدگی ضعیف شده باشند", ""],
        },
        {
          label: "پارک کردن",
          it: "freno di stazionamento · cunei",
          values: ["ترمزِ دستیِ یدک را بکش؛ در شیب، زیرِ چرخ‌ها گُوِه بگذار", ""],
        },
        {
          label: "ABS",
          it: "A.B.S.",
          values: ["ABSِ خودرو مانعِ بستنِ یدکِ بی‌ترمز نیست", "«با ABS نمی‌شود یدکِ بی‌ترمز بست» غلط است"],
        },
      ],
      takeaway: "ترمزِ اینرسی = یدک با فشار به خودرو ترمز می‌کند، پس همیشه کمی بعد از خودرو. کابلِ ایمنی برای جدا شدن.",
      rule: TECNICA,
    },
    {
      kind: "table",
      title: "قلاب و اتصال",
      body: "قطعه‌های یدک‌کشی (organi di traino) همه‌ی نیرویِ یدک را منتقل می‌کنند. قاعده‌ها ساده‌اند و میان‌بُر ندارند:",
      columns: ["درست", "دامِ بانک"],
      rows: [
        {
          label: "تأییدشده",
          it: "di tipo omologato",
          values: ["قلاب همیشه از نوعِ تأییدشده (omologato) است", "«برای یدکِ سبک یا زیرِ ۷۵۰ کیلو لازم نیست» غلط است"],
        },
        {
          label: "تمیز و روغن‌کاری‌شده",
          it: "pulite e adeguatamente lubrificate",
          values: ["قطعه‌های متحرک تمیز و گریس‌خورده؛ بی‌لقی، بی‌تاب، بی‌ترک. اگر شکست، عوضش می‌کنی", "«روغن‌کاری لازم ندارد، با بنزین بشوی» و «جوشش بده» غلط‌اند"],
        },
        {
          label: "حرکتِ عمودی",
          it: "oscillazioni in senso verticale",
          values: ["اتصال باید بالا و پایین رفتنِ کافی بینِ خودرو و یدک را اجازه بدهد، برای پستی‌وبلندیِ جاده", ""],
        },
        {
          label: "بارِ روی قلاب",
          it: "carico verticale massimo · targhetta",
          values: ["بارِ عمودیِ روی قلاب از حدی که روی پلاکِ قلاب نوشته شده بیشتر نمی‌شود", "«بیشترِ بار را روی قلاب جمع کن» غلط است"],
        },
        {
          label: "برق",
          it: "collegamento elettrico",
          values: ["اتصالِ برقِ خودرو و یدک همیشه لازم است، حتی برای یدکِ سبک: چراغ ترمز و راهنمای یدک از آن کار می‌کنند", "«برای یدکِ سبک لازم نیست» غلط است"],
        },
      ],
      takeaway: "قلاب: تأییدشده، تمیز، گریس‌خورده، سالم. بارِ قلاب در حدِ پلاکش. برق: همیشه.",
      rule: OMOLOGAZIONE,
    },
    {
      kind: "table",
      title: "قبل از حرکت، و وقتی یدک بیکار است",
      body: "چند کارِ ساده که بانک جدا می‌پرسد:",
      columns: ["چه کنی"],
      rows: [
        { label: "قبل از حرکت", it: "illuminazione e segnalazione", values: ["چراغ‌ها و راهنماهای یدک را امتحان کن؛ با آینه‌ها ببین دیدِ عقب کافی است"] },
        { label: "بار", it: "spostamenti, rovesciamenti, cadute", values: ["بار را طوری ببند که در حرکت جابه‌جا نشود، نیفتد و ساییده نشود"] },
        {
          label: "بیکاریِ طولانی",
          it: "pneumatici sollevati da terra",
          values: ["اگر می‌شود، با پایه زیرِ شاسی لاستیک‌ها را از زمین بلند کن؛ اگر نمی‌شود، بادشان را بیشتر کن و هر چند وقت جای تکیه‌شان را عوض کن تا بیضی نشوند"],
        },
        {
          label: "فشارِ باد",
          it: "la stessa degli pneumatici del rimorchio",
          values: ["فشارِ بادِ لاستیک‌های هر وسیله مالِ خودش است؛ لازم نیست با یدک یکی باشد"],
        },
      ],
      takeaway: "قبل از رفتن: چراغ، آینه، بار. یدکِ بیکار: لاستیک از زمین بلند، یا بادِ بیشتر و چرخاندن.",
      rule: TECNICA,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il freno a inerzia", fa: "ترمزِ اینرسی (ترمزِ فشاری)" },
        { it: "lo sganciamento accidentale", fa: "جدا شدنِ ناگهانیِ یدک" },
        { it: "il freno di stazionamento", fa: "ترمزِ دستی" },
        { it: "i cunei di arresto", fa: "گُوِه‌های زیرِ چرخ" },
        { it: "gli organi di traino", fa: "قطعه‌های یدک‌کشی" },
        { it: "omologato", fa: "تأییدشده (دارای گواهیِ نوع)" },
        { it: "lubrificare", fa: "روغن‌کاری کردن" },
        { it: "il collegamento elettrico", fa: "اتصالِ برق" },
        { it: "l'ovalizzazione", fa: "بیضی شدنِ لاستیک" },
      ],
    },
    {
      kind: "trap",
      title: "همزمان یا نه",
      body: "هر دو جمله درباره‌ی لحظه‌ای است که ترمزِ اینرسی کار می‌کند:",
      examples: [
        {
          sourceId: "5756",
          textIt:
            "La frenatura del rimorchio dotato di freno a inerzia non avviene simultaneamente a quella della motrice, in quanto l'azionamento si ha solo dopo che il rimorchio ha esercitato una spinta sulla motrice",
          answer: 1,
          chunks: [
            { it: "La frenatura del rimorchio dotato di freno a inerzia", fa: "ترمز گرفتنِ یدکِ دارای ترمزِ اینرسی" },
            { it: "non avviene simultaneamente a quella della motrice,", fa: "همزمان با ترمزِ خودروی کشنده نیست،", verb: "avviene ← avvenire", focus: "negation" },
            { it: "in quanto", fa: "چون", focus: "reason" },
            { it: "l'azionamento si ha solo dopo", fa: "فقط بعد از این کار می‌کند" },
            { it: "che il rimorchio ha esercitato una spinta sulla motrice", fa: "که یدک به خودروی کشنده فشار آورده باشد", verb: "ha esercitato ← esercitare" },
          ],
          translation: "ترمز گرفتنِ یدکِ دارای ترمزِ اینرسی همزمان با ترمزِ خودروی کشنده نیست، چون فقط بعد از این کار می‌کند که یدک به خودرو فشار آورده باشد.",
          why: "درست است. اول خودرو ترمز می‌کند، یدک به آن فشار می‌آورد، بعد ترمزِ یدک کار می‌کند.",
        },
        {
          sourceId: "5761",
          textIt: "Nei rimorchi dotati di freno a inerzia la frenatura del rimorchio avviene simultaneamente a quella della motrice",
          answer: 0,
          chunks: [
            { it: INERZIA, fa: INERZIA_FA },
            { it: "la frenatura del rimorchio avviene simultaneamente", fa: "ترمز گرفتنِ یدک همزمان است", verb: "avviene ← avvenire", focus: "contrast" },
            { it: "a quella della motrice", fa: "با ترمزِ خودروی کشنده" },
          ],
          translation: "در یدک‌هایی که ترمزِ اینرسی دارند، ترمز گرفتنِ یدک همزمان با ترمزِ خودروی کشنده است.",
          why: "غلط است. ترمزِ اینرسی منتظرِ فشارِ یدک به خودرو است؛ پس همیشه کمی دیرتر.",
        },
      ],
      takeaway: "«simultaneamente» برای ترمزِ اینرسی غلط است، و «prima della motrice» هم.",
      rule: TECNICA,
    },
  ],
  practice: [
    {
      sourceId: "5753",
      textIt: "Nel rimorchio è presente un dispositivo di sicurezza che, in caso di sganciamento accidentale, aziona automaticamente il freno di stazionamento",
      answer: 1,
      chunks: [
        { it: "Nel rimorchio è presente un dispositivo di sicurezza", fa: "در یدک یک وسیله‌ی ایمنی هست" },
        { it: "che, in caso di sganciamento accidentale,", fa: "که اگر یدک ناگهان جدا شود،", focus: "condition" },
        { it: "aziona automaticamente il freno di stazionamento", fa: "خودبه‌خود ترمزِ دستی را می‌کشد", verb: "aziona ← azionare" },
      ],
      translation: "در یدک یک وسیله‌ی ایمنی هست که اگر یدک ناگهان جدا شود، خودبه‌خود ترمزِ دستی را می‌کشد.",
      why: "درست است (قدم ۱). کابلِ ایمنی به خودرو بسته است؛ جدا شدن آن را می‌کشد و یدک می‌ایستد.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "5762",
      textIt: "Nei rimorchi dotati di freno a inerzia il rimorchio frena circa un secondo prima della motrice",
      answer: 0,
      chunks: [
        { it: INERZIA, fa: INERZIA_FA },
        { it: "il rimorchio frena circa un secondo prima della motrice", fa: "یدک حدودِ یک ثانیه زودتر از خودرو ترمز می‌کند", verb: "frena ← frenare", focus: "contrast" },
      ],
      translation: "در یدک‌هایی که ترمزِ اینرسی دارند، یدک حدودِ یک ثانیه زودتر از خودروی کشنده ترمز می‌کند.",
      why: "غلط است (قدم ۱). برعکس است: یدک بعد از خودرو ترمز می‌کند، چون منتظرِ فشار به خودرو است.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "5804",
      textIt: "Quando si traina un rimorchio occorre verificare che il carico verticale gravante sul gancio non ecceda il limite indicato dal costruttore",
      answer: 1,
      chunks: [
        { it: "Quando si traina un rimorchio", fa: "وقتی یدک می‌کشی", verb: "si traina ← trainare", focus: "condition" },
        { it: "occorre verificare che il carico verticale gravante sul gancio", fa: "باید مطمئن شوی که بارِ عمودیِ روی قلاب", verb: "occorre ← occorrere" },
        { it: "non ecceda il limite indicato dal costruttore", fa: "از حدی که سازنده تعیین کرده بیشتر نشود", verb: "ecceda ← eccedere", focus: "limit" },
      ],
      translation: "وقتی یدک می‌کشی، باید مطمئن شوی که بارِ عمودیِ روی قلاب از حدی که سازنده تعیین کرده بیشتر نشود.",
      why: "درست است (قدم ۲). این حد روی پلاکِ قلاب نوشته شده.",
      rule: TECNICA,
      conceptStep: 2,
    },
    {
      sourceId: "5724",
      textIt: "Per trainare un rimorchio leggero non occorre effettuare il collegamento elettrico",
      answer: 0,
      chunks: [
        { it: "Per trainare un rimorchio leggero", fa: "برای کشیدنِ یدکِ سبک", focus: "condition" },
        { it: "non occorre effettuare il collegamento elettrico", fa: "اتصالِ برق لازم نیست", verb: "occorre ← occorrere", focus: "negation" },
      ],
      translation: "برای کشیدنِ یدکِ سبک، اتصالِ برق لازم نیست.",
      why: "غلط است (قدم ۲). بی‌برق، چراغ ترمز و راهنمای یدک کار نمی‌کنند و راننده‌ی پشتی چیزی نمی‌فهمد.",
      rule: "Codice della Strada, art. 72 (dispositivi di segnalazione visiva)",
      conceptStep: 2,
    },
    {
      sourceId: "5814",
      textIt: "Quando si traina un rimorchio, la pressione di gonfiaggio degli pneumatici del veicolo trainante deve essere la stessa degli pneumatici del rimorchio",
      answer: 0,
      chunks: [
        { it: "Quando si traina un rimorchio,", fa: "وقتی یدک می‌کشی،", verb: "si traina ← trainare", focus: "condition" },
        { it: "la pressione di gonfiaggio degli pneumatici del veicolo trainante", fa: "فشارِ بادِ لاستیک‌های خودروی کشنده" },
        { it: "deve essere la stessa degli pneumatici del rimorchio", fa: "باید با لاستیک‌های یدک یکی باشد", verb: "deve ← dovere", focus: "contrast" },
      ],
      translation: "وقتی یدک می‌کشی، فشارِ بادِ لاستیک‌های خودروی کشنده باید با لاستیک‌های یدک یکی باشد.",
      why: "غلط است (قدم ۳). هر وسیله فشارِ بادِ خودش را دارد، طبقِ دستورِ سازنده‌ی همان وسیله.",
      rule: TECNICA,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["5713", "5753", "5754", "5755", "5756", "5757", "5760", "5761", "5762"] },
    { step: 2, sourceIds: ["5715", "5716", "5720", "5721", "5724", "5801", "5802", "5803", "5804", "5805", "5806", "5807", "5808", "5809", "5810"] },
    { step: 3, sourceIds: ["5710", "5711", "5811", "5812", "5813", "5814"] },
  ],
};

// ── Lesson 12 ─────────────────────────────────────────────────────────────────

export const lessonGuidaRimorchio: Lesson = {
  id: "guida-con-rimorchio",
  titleFa: "رانندگی با یدک و کاروان",
  titleIt: "GUIDA CON RIMORCHIO · CARAVAN",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی یدک در پیچ از کجا می‌گذرد (داخل‌تر از خودرو، رو به پیاده‌رو)، چه نیروهایی اضافه می‌کند (هُل در سرازیری، شتابِ کمتر، باد، مایعِ لق) و بارش را چطور می‌چینی، از جمله در کاروان.",
      why:
        "۲۴ سؤال. دامِ پرتکرار جهت است: یدک در پیچ «همان مسیرِ خودرو» نمی‌رود و فضای بیشتری می‌گیرد، نه کمتر؛ بار در ترمز جلو می‌رود و در شتاب عقب، نه برعکس.",
      rule: TECNICA,
    },
    {
      kind: "anatomy",
      title: "یدک در پیچ میان‌بُر می‌زند",
      scene: "rimorchio",
      body: "خودرو با یدک به راست می‌پیچد. خطِ زردِ نقطه‌چین مسیرِ خودرو است و خطِ قرمز مسیرِ چرخ‌های یدک. روی هر بخش بزن:",
      parts: [
        {
          id: "motrice",
          nameIt: "Motrice",
          nameFa: "خودروی کشنده",
          text: "تو پیچ را بازتر می‌گیری تا جا برای یدک بماند. قبل از هر مانور، دورِ مجموعه را نگاه کن که کسی یا چیزی در شعاعِ چرخشش نباشد.",
        },
        {
          id: "rimorchio",
          nameIt: "Rimorchio",
          nameFa: "یدک",
          text: "یدک در پیچ «جمع می‌شود» (stringe): روی دایره‌ای کوچک‌تر از خودرو می‌رود، پس حتی با سرعتِ کم مسیرِ خودرو را تکرار نمی‌کند.",
        },
        {
          id: "traiettoria",
          nameIt: "Fascia di ingombro",
          nameFa: "فضایی که مجموعه می‌گیرد",
          text: "فاصله‌ی بینِ دو خط، فضایی است که مجموعه در پیچ اشغال می‌کند. با یدک بیشتر است، و در پیچِ تند از همه بیشتر؛ «کمتر» غلط است.",
        },
        {
          id: "pedone",
          nameIt: "Pedone sul marciapiede",
          nameFa: "پیاده کنارِ جدول",
          text: "در پیچِ راست، چرخِ عقبِ راستِ یدک به جدول نزدیک می‌شود: ممکن است از پیاده‌رو بالا برود یا به کسی که لبه‌ی آن ایستاده بخورد.",
        },
      ],
      takeaway: "یدک در پیچ داخل‌تر از خودرو می‌رود. پیچِ راست = چرخِ عقبِ راست رو به جدول و پیاده. پیچ را بازتر بگیر.",
      rule: TECNICA,
    },
    {
      kind: "table",
      title: "نیروهایی که یدک اضافه می‌کند",
      body: "یدک جرم اضافه می‌کند، و جرم در هر تغییرِ سرعت و جهت خودش را نشان می‌دهد:",
      columns: ["چه می‌شود", "دامِ بانک"],
      rows: [
        { label: "سرازیریِ تند", it: "forza di spinta", values: ["یدک خودرو را از پشت هُل می‌دهد؛ حسابش را بکن", "«لازم نیست حسابش کرد» غلط است"] },
        { label: "شتاب", it: "capacità di accelerazione (ripresa)", values: ["مخصوصاً با یدکِ پُر، شتاب گرفتن خیلی کُندتر است؛ سبقت طولانی‌تر می‌شود", ""] },
        { label: "سربالایی", it: "temperatura del liquido di raffreddamento", values: ["موتور گرم‌تر می‌شود؛ دمای آبِ رادیاتور را بپا", ""] },
        { label: "سوخت", it: "consumi di carburante", values: ["بیشتر، حتی با سرعتِ آرام", "«با سرعتِ آرام بیشتر نمی‌شود» غلط است"] },
        { label: "باد", it: "forza ribaltante esercitata dal vento", values: ["یدکِ سبک را باد راحت‌تر کج می‌کند", ""] },
        {
          label: "مایعِ داخلِ مخزن",
          it: "movimenti del liquido",
          values: ["در پیچ، ترمز و شتاب جابه‌جا می‌شود و بیشترین ناپایداری را می‌سازد", ""],
        },
        {
          label: "بارِ لق",
          it: "frenata · accelerazione",
          values: ["در ترمز بار به جلو می‌رود؛ در شتاب به عقب", "«در ترمز به عقب»، «در شتاب به جلو» برعکس‌اند"],
        },
        {
          label: "چراغ‌ها",
          it: "inclinazione del fascio luminoso",
          values: ["بارِ روی قلاب عقبِ خودرو را پایین می‌آورد و نورِ چراغ‌ها را بالا می‌برد؛ تنظیمش را چک کن", ""],
        },
      ],
      takeaway: "جرمِ بیشتر: هُل در سرازیری، شتابِ کم، گرمای موتور، سوختِ بیشتر. بار در ترمز جلو می‌رود.",
      rule: TECNICA,
    },
    {
      kind: "table",
      title: "بارِ یدک و کاروان",
      body: "کاروان (roulotte) یک یدک است، فقط خانه‌ای رویش ساخته شده. قاعده‌ی چیدنِ بارش با بقیه‌ی یدک‌ها یکی است:",
      columns: ["درست", "دامِ بانک"],
      rows: [
        {
          label: "سنگین‌ها",
          it: "baricentro il più basso possibile",
          values: ["پایین و نزدیکِ محورِ چرخ‌ها، تا مرکزِ ثقل پایین بماند و یدک در پیچ واژگون نشود", "«بیشترِ بار روی قلاب» غلط است"],
        },
        { label: "چپ و راست", it: "equilibrato tra lato destro e sinistro", values: ["بار را بینِ دو طرف متعادل کن", ""] },
        {
          label: "کاروان",
          it: "Il caravan … rimorchio",
          values: ["کاروان یدک است، با همه‌ی قاعده‌هایش", "«چون جای خواب است یدک نیست» غلط است"],
        },
        {
          label: "سرنشین",
          it: "alloggiare … durante la circolazione",
          values: ["در حرکت هیچ‌کس داخلِ کاروان نمی‌ماند", "«با کمربند مجاز است» غلط است"],
        },
        {
          label: "چرخِ کمکی",
          it: "ruotino pivottante di manovra",
          values: ["چرخِ کوچکِ جلوی یدک در حرکت بالا کشیده شده است", "«پایین و روی زمین» غلط است"],
        },
        { label: "سنسورِ پارک", it: "sensori di parcheggio", values: ["مانعِ بستنِ یدک نیست", "«با سنسورِ پارک نمی‌شود یدک بست» غلط است"] },
      ],
      takeaway: "سنگین‌ها پایین، نزدیکِ محور، متعادل. کاروان = یدک، و کسی داخلش سفر نمی‌کند.",
      rule: `Codice della Strada, art. 56 (caravan come rimorchio); resto: ${TECNICA}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la fascia di ingombro", fa: "فضایی که وسیله اشغال می‌کند" },
        { it: "stringere in curva", fa: "در پیچ داخل‌تر رفتن", base: "stringere" },
        { it: "la traiettoria", fa: "مسیرِ حرکت" },
        { it: "la forza di spinta", fa: "نیروی هُل" },
        { it: "la ripresa", fa: "شتاب‌گیری" },
        { it: "il baricentro", fa: "مرکزِ ثقل" },
        { it: "il ribaltamento", fa: "واژگون شدن" },
        { it: "il caravan (la roulotte)", fa: "کاروان" },
        { it: "il ruotino pivottante", fa: "چرخِ کمکیِ گردانِ جلوی یدک" },
      ],
    },
    {
      kind: "trap",
      title: "در پیچ: بیشتر یا کمتر",
      body: "هر دو جمله از «fascia di ingombro» در پیچ حرف می‌زنند:",
      examples: [
        {
          sourceId: "5790",
          textIt: "Quando si traina un rimorchio, bisogna considerare che nelle curve la fascia di ingombro è maggiore",
          answer: 1,
          chunks: [
            { it: "Quando si traina un rimorchio,", fa: "وقتی یدک می‌کشی،", verb: "si traina ← trainare", focus: "condition" },
            { it: "bisogna considerare che nelle curve", fa: "باید حساب کنی که در پیچ‌ها", verb: "bisogna ← bisognare" },
            { it: "la fascia di ingombro è maggiore", fa: "فضایی که اشغال می‌کنی بیشتر است" },
          ],
          translation: "وقتی یدک می‌کشی، باید حساب کنی که در پیچ‌ها فضایی که اشغال می‌کنی بیشتر است.",
          why: "درست است. یدک داخل‌تر از خودرو می‌رود، پس مجموعه پهنای بیشتری از جاده را می‌گیرد.",
        },
        {
          sourceId: "5726",
          textIt: "Quando si traina un rimorchio, bisogna considerare che nelle curve strette la fascia di ingombro è minore",
          answer: 0,
          chunks: [
            { it: "Quando si traina un rimorchio,", fa: "وقتی یدک می‌کشی،", verb: "si traina ← trainare", focus: "condition" },
            { it: "bisogna considerare che nelle curve strette", fa: "باید حساب کنی که در پیچ‌های تند", verb: "bisogna ← bisognare" },
            { it: "la fascia di ingombro è minore", fa: "فضایی که اشغال می‌کنی کمتر است", focus: "contrast" },
          ],
          translation: "وقتی یدک می‌کشی، باید حساب کنی که در پیچ‌های تند فضایی که اشغال می‌کنی کمتر است.",
          why: "غلط است. هرچه پیچ تندتر، یدک داخل‌تر می‌رود و فضای بیشتری لازم است.",
        },
      ],
      takeaway: "پیچ + یدک = فضای بیشتر. «minore» و «stesso percorso» دام‌اند.",
      rule: TECNICA,
    },
  ],
  practice: [
    {
      sourceId: "5794",
      textIt: "Nelle curve il rimorchio tende a “stringere” perché percorre una traiettoria circolare con raggio inferiore alla motrice",
      answer: 1,
      chunks: [
        { it: "Nelle curve il rimorchio tende a “stringere”", fa: "در پیچ‌ها یدک تمایل دارد «داخل‌تر برود»", verb: "tende ← tendere" },
        { it: "perché", fa: "چون", focus: "reason" },
        { it: "percorre una traiettoria circolare con raggio inferiore alla motrice", fa: "روی دایره‌ای با شعاعِ کوچک‌تر از خودروی کشنده می‌رود", verb: "percorre ← percorrere" },
      ],
      translation: "در پیچ‌ها یدک تمایل دارد «داخل‌تر برود»، چون روی دایره‌ای با شعاعِ کوچک‌تر از خودروی کشنده حرکت می‌کند.",
      why: "درست است (قدم ۱). همان خطِ قرمزِ تصویر.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "5797",
      textIt: "Nell’affrontare una curva a velocità moderata il rimorchio compie sempre lo stesso percorso fatto dalla motrice",
      answer: 0,
      chunks: [
        { it: "Nell’affrontare una curva a velocità moderata", fa: "وقتی با سرعتِ آرام وارد پیچ می‌شوی", focus: "condition" },
        { it: "il rimorchio compie sempre lo stesso percorso", fa: "یدک همیشه همان مسیری را می‌رود", verb: "compie ← compiere", focus: "always" },
        { it: "fatto dalla motrice", fa: "که خودروی کشنده رفته" },
      ],
      translation: "وقتی با سرعتِ آرام وارد پیچ می‌شوی، یدک همیشه همان مسیری را می‌رود که خودروی کشنده رفته.",
      why: "غلط است (قدم ۱). سرعت هرچه باشد، یدک داخل‌تر از خودرو می‌رود.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "5791",
      textIt: "Trainando un rimorchio nelle forti discese, occorre tener conto della forza di spinta esercitata dal rimorchio sulla motrice",
      answer: 1,
      chunks: [
        { it: "Trainando un rimorchio nelle forti discese,", fa: "وقتی در سرازیری‌های تند یدک می‌کشی،", verb: "trainando ← trainare", focus: "condition" },
        { it: "occorre tener conto della forza di spinta", fa: "باید نیروی هُل را حساب کنی", verb: "occorre ← occorrere" },
        { it: "esercitata dal rimorchio sulla motrice", fa: "که یدک به خودروی کشنده وارد می‌کند" },
      ],
      translation: "وقتی در سرازیری‌های تند یدک می‌کشی، باید نیروی هُلی را که یدک به خودروی کشنده وارد می‌کند حساب کنی.",
      why: "درست است (قدم ۲). در سرازیری جرمِ یدک خودرو را از پشت هُل می‌دهد؛ دنده‌ی سنگین‌تر و سرعتِ کمتر.",
      rule: TECNICA,
      conceptStep: 2,
    },
    {
      sourceId: "5758",
      textIt: "Alla guida di un veicolo con rimorchio, durante una frenata in marcia rettilinea, il carico trasportato tenderà a spostarsi all’indietro",
      answer: 0,
      chunks: [
        { it: GUIDA, fa: GUIDA_FA },
        { it: "durante una frenata in marcia rettilinea,", fa: "هنگامِ ترمز در مسیرِ مستقیم،", focus: "condition" },
        { it: "il carico trasportato tenderà a spostarsi all’indietro", fa: "بار تمایل دارد به عقب جابه‌جا شود", verb: "tenderà ← tendere", focus: "contrast" },
      ],
      translation: "وقتی خودرویی با یدک می‌رانی، هنگامِ ترمز در مسیرِ مستقیم، بار تمایل دارد به عقب جابه‌جا شود.",
      why: "غلط است (قدم ۲). در ترمز، بار به حرکتش ادامه می‌دهد، پس به جلو می‌رود.",
      rule: TECNICA,
      conceptStep: 2,
    },
    {
      sourceId: "5751",
      textIt: "Il caravan non è considerato un rimorchio perché può essere adibito ad alloggio",
      answer: 0,
      chunks: [
        { it: "Il caravan non è considerato un rimorchio", fa: "کاروان یدک به حساب نمی‌آید", verb: "è considerato ← considerare", focus: "negation" },
        { it: "perché", fa: "چون", focus: "reason" },
        { it: "può essere adibito ad alloggio", fa: "می‌شود در آن اقامت کرد", verb: "può ← potere" },
      ],
      translation: "کاروان یدک به حساب نمی‌آید، چون می‌شود در آن اقامت کرد.",
      why: "غلط است (قدم ۳). کاروان یدکی است که خانه رویش ساخته شده؛ همه‌ی قاعده‌های یدک برایش اجرا می‌شود.",
      rule: "Codice della Strada, art. 56",
      conceptStep: 3,
    },
  ],
  related: [
    // the tighter curve of the trailer (scene "rimorchio")
    { step: 1, sourceIds: ["5708", "5726", "5789", "5790", "5793", "5794", "5797"] },
    // forces: downhill push, acceleration, heat, fuel, wind, liquid, load shift, headlight aim
    { step: 2, sourceIds: ["5704", "5706", "5723", "5758", "5759", "5791", "5792", "5795", "5796", "5800"] },
    // loading a trailer and a caravan
    { step: 3, sourceIds: ["5707", "5749", "5750", "5751", "5752", "5798", "5799"] },
  ],
};
