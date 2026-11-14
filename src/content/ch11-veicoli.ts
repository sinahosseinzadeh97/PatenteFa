/**
 * src/content/ch11-veicoli.ts
 * Chapter 11 (Limiti di velocità), lessons 3–4:
 *  L3 which vehicles share the car's limits (motorcycles, up to 3.5 t, a car
 *     with a carrello appendice) and which drop to 80 / 70 because they tow a
 *     trailer (CdS art. 142 c.3 lett. e; art. 54 c.1 lett. h; art. 56 c.4).
 *  L4 vehicles with their own low limit (mopeds 45, quadricycles 80, farm and
 *     operating machines 40; art. 142 c.3), new drivers (art. 117 c.2), and the
 *     speed discs on the back of vehicles with their own limits (art. 142 c.4).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter11.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_142 = "Codice della Strada, art. 142";
const LIMITE = "Il limite massimo di velocità";
const LIMITE_FA = "حداکثرِ سرعتِ مجاز";
const CONTRASSEGNI = "I contrassegni rappresentati in figura";
const CONTRASSEGNI_FA = "نشان‌های تصویر";
const ROADS = ["آزادراه", "برون‌شهریِ اصلی", "برون‌شهریِ فرعی", "داخلِ آبادی"];
const NEOPATENTATI = "per coloro che hanno conseguito la patente da meno di";
const NEOPATENTATI_FA = "برای کسانی که کمتر از … پیش گواهینامه گرفته‌اند";

// ── Lesson 3 ──────────────────────────────────────────────────────────────────

export const lessonLimitiRimorchi: Lesson = {
  id: "limiti-veicoli-rimorchi",
  titleFa: "مثلِ سواری، یا با یدک",
  titleIt: "MOTOCICLI · FINO A 3,5 t · CARRELLO APPENDICE · RIMORCHI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی کدام وسیله‌ها همان سقفِ سواری را دارند (موتورسیکلت، هر وسیله‌ی تا ۳٫۵ تن، سواری با carrello appendice) و چرا سواری‌ای که یدک می‌کشد به ۸۰ در آزادراه و ۷۰ بیرونِ آبادی پایین می‌آید.",
      why:
        "۴۷ سؤال؛ بزرگ‌ترین گروهِ این فصل. همه یک الگو دارند: «برای این وسیله روی این جاده سقف چند است؟». اگر بدانی وسیله در کدام خانواده است، عدد را حفظ نمی‌کنی، از درسِ ۲ می‌سازی.",
      rule: `${CDS_142} c.1, c.3`,
    },
    {
      kind: "table",
      title: "همان عددهای سواری",
      body:
        "این وسیله‌ها سقفِ جداگانه ندارند؛ همان ۱۳۰، ۱۱۰، ۹۰، ۵۰ و در بارش همان ۱۱۰ و ۹۰. «carrello appendice» یدکِ خیلی کوچکی است که قانون آن را بخشی از خودِ خودرو می‌داند، نه یدک. داخلِ آبادی هم کامیون، مثلِ همه، ۵۰ دارد؛ «۴۰ برای کامیون» وجود ندارد.",
      columns: ROADS,
      rows: [
        { label: "سواری", it: "autovettura", values: ["۱۳۰", "۱۱۰", "۹۰", "۵۰"] },
        { label: "موتورسیکلت", it: "motociclo", values: ["۱۳۰", "۱۱۰", "۹۰", "۵۰"] },
        { label: "وسیله‌ی تا ۳٫۵ تن", it: "autocarro · autocaravan fino a 3,5 t", values: ["۱۳۰", "۱۱۰", "۹۰", "۵۰"] },
        { label: "سواری + carrello appendice", it: "carrello appendice", values: ["۱۳۰ (در باران ۱۱۰)", "۱۱۰", "۹۰", "۵۰"] },
        { label: "عددهای غلطِ بانک", it: "non è", values: ["۱۲۰ یا ۹۰ نه", "۱۰۰ یا ۸۰ نه", "۸۰ یا ۷۰ نه", "۴۰ یا ۶۰ نه"] },
      ],
      takeaway: "موتورسیکلت، هر وسیله‌ی تا ۳٫۵ تن و سواری با carrello appendice = همان عددهای سواری.",
      rule: `${CDS_142} c.1, c.3; CdS art. 56 c.4`,
    },
    {
      kind: "table",
      title: "یدک که بستی: ۸۰ و ۷۰",
      body:
        "سواری‌ای که یدک (rimorchio) می‌کشد، از نظرِ قانون یک «autotreno» است: دو وسیله‌ی جدا که به هم وصل‌اند. سقفِ همه‌ی این ترکیب‌ها یکی است: آزادراه ۸۰، بیرونِ آبادی ۷۰. نوعِ یدک (کاروان، قایق، اسب، موتورسیکلت) و وزنش (۷۵۰ یا ۹۰۰ کیلو) عدد را عوض نمی‌کند. خودِ این وسیله‌ها را در فصلِ ۱، درسِ ۸ دیدی.",
      columns: ROADS,
      rows: [
        { label: "سواری + کاروان", it: "caravan", values: ["۸۰", "۷۰", "۷۰", "۵۰"] },
        { label: "سواری + یدکِ قایق، اسب یا موتور", it: "rimorchio per imbarcazioni · cavalli · motocicli", values: ["۸۰", "۷۰", "۷۰", "۵۰"] },
        { label: "کامیون + یدک", it: "autotreno", values: ["۸۰", "۷۰", "۷۰", "۵۰"] },
        { label: "دامِ «سبک»", it: "rimorchio leggero", values: ["۱۳۰ نه", "۸۰ یا ۱۱۰ نه", "۸۰ یا ۹۰ نه", "—"] },
      ],
      takeaway: "یدک = ۸۰ در آزادراه، ۷۰ بیرونِ آبادی. carrello appendice یدک حساب نمی‌شود.",
      rule: `${CDS_142} c.3 lett. e; CdS art. 54 c.1 lett. h, art. 56 c.2`,
    },
    {
      kind: "classify",
      title: "سقفت چند است؟",
      body: "هوا خشک است، تابلوی سرعت نیست و گواهینامه‌ات قدیمی است. وسیله و جاده را بخوان. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "130", fa: "130" },
        { it: "110", fa: "110" },
        { it: "90", fa: "90" },
        { it: "80", fa: "80" },
        { it: "70", fa: "70" },
      ],
      items: [
        { prompt: "سواری با carrello appendice، آزادراه", answer: 0, explain: "carrello appendice بخشی از سواری است: ۱۳۰." },
        { prompt: "موتورسیکلت، برون‌شهریِ اصلی", answer: 1, explain: "موتورسیکلت مثلِ سواری: اصلی ۱۱۰." },
        { prompt: "کمپرِ ۳ تنی، برون‌شهریِ فرعی", answer: 2, explain: "تا ۳٫۵ تن مثلِ سواری: فرعی ۹۰." },
        { prompt: "سواری با کاروان، آزادراه", answer: 3, explain: "یدک: آزادراه ۸۰." },
        { prompt: "سواری با یدکِ قایق، برون‌شهریِ اصلی", answer: 4, explain: "یدک: بیرونِ آبادی ۷۰، اصلی هم." },
      ],
      takeaway: "اول بپرس: خانواده‌ی سواری است یا یدک دارد؟ بعد جاده.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il motociclo", fa: "موتورسیکلت" },
        { it: "l'autocarro", fa: "کامیون؛ وسیله‌ی باری" },
        { it: "l'autocaravan", fa: "کمپر؛ خودروی خانه‌دار" },
        { it: "il rimorchio", fa: "یدک" },
        { it: "il carrello appendice", fa: "یدکِ کوچکی که بخشی از خودرو حساب می‌شود" },
        { it: "trainare", fa: "یدک کشیدن", note: "«che traina un caravan» = که کاروان می‌کشد." },
        { it: "l'autotreno", fa: "خودرو + یدک؛ دو وسیله‌ی به‌هم‌وصل" },
        { it: "la massa complessiva", fa: "جرمِ کل (با بار)" },
      ],
    },
    {
      kind: "trap",
      title: "carrello appendice ≠ rimorchio",
      body: "هر دو جمله درباره‌ی سواری در آزادراه است که چیزی پشتش بسته:",
      examples: [
        {
          sourceId: "4046",
          textIt: "Il limite massimo di velocità sulle autostrade è ordinariamente di 130 km/h per le autovetture con carrello appendice",
          answer: 1,
          chunks: [
            { it: LIMITE, fa: LIMITE_FA },
            { it: "sulle autostrade", fa: "در آزادراه‌ها" },
            { it: "è ordinariamente di 130 km/h", fa: "به‌طورِ معمول ۱۳۰ کیلومتر بر ساعت است", verb: "è ← essere" },
            { it: "per le autovetture con carrello appendice", fa: "برای سواری‌هایی که carrello appendice دارند" },
          ],
          translation: "حداکثرِ سرعتِ مجاز در آزادراه‌ها برای سواری‌هایی که carrello appendice دارند به‌طورِ معمول ۱۳۰ کیلومتر بر ساعت است.",
          why: "درست است. carrello appendice بخشی از خودِ سواری حساب می‌شود، پس عددِ سواری.",
        },
        {
          sourceId: "4056",
          textIt: "Il limite massimo di velocità sulle autostrade è di 130 km/h per le autovetture con rimorchio",
          answer: 0,
          chunks: [
            { it: LIMITE, fa: LIMITE_FA },
            { it: "sulle autostrade", fa: "در آزادراه‌ها" },
            { it: "è di 130 km/h", fa: "۱۳۰ کیلومتر بر ساعت است", verb: "è ← essere", focus: "contrast" },
            { it: "per le autovetture con rimorchio", fa: "برای سواری‌هایی که یدک دارند" },
          ],
          translation: "حداکثرِ سرعتِ مجاز در آزادراه‌ها برای سواری‌هایی که یدک دارند ۱۳۰ کیلومتر بر ساعت است.",
          why: "غلط است. سواری + rimorchio = autotreno: آزادراه ۸۰.",
        },
      ],
      takeaway: "«carrello appendice» = عددِ سواری. «rimorchio»، «caravan»، «rimorchio per …» = ۸۰ و ۷۰.",
      rule: `${CDS_142} c.3 lett. e; CdS art. 56 c.4`,
    },
  ],
  practice: [
    {
      sourceId: "4013",
      textIt: "Il limite massimo di velocità per un autocarro fino a 3,5 tonnellate sulle strade extraurbane principali è di 110 km/h",
      answer: 1,
      chunks: [
        { it: LIMITE, fa: LIMITE_FA },
        { it: "per un autocarro fino a 3,5 tonnellate", fa: "برای کامیونِ تا ۳٫۵ تن", focus: "limit" },
        { it: "sulle strade extraurbane principali", fa: "در جاده‌های برون‌شهریِ اصلی" },
        { it: "è di 110 km/h", fa: "۱۱۰ کیلومتر بر ساعت است", verb: "è ← essere" },
      ],
      translation: "حداکثرِ سرعتِ مجاز برای کامیونِ تا ۳٫۵ تن در جاده‌های برون‌شهریِ اصلی ۱۱۰ کیلومتر بر ساعت است.",
      why: "درست است (قدم ۱). تا ۳٫۵ تن = عددهای سواری.",
      rule: `${CDS_142} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "4057",
      textIt: "Il limite massimo di velocità sulle autostrade è di 90 km/h per i motocicli",
      answer: 0,
      chunks: [
        { it: LIMITE, fa: LIMITE_FA },
        { it: "sulle autostrade", fa: "در آزادراه‌ها" },
        { it: "è di 90 km/h", fa: "۹۰ کیلومتر بر ساعت است", verb: "è ← essere", focus: "contrast" },
        { it: "per i motocicli", fa: "برای موتورسیکلت‌ها" },
      ],
      translation: "حداکثرِ سرعتِ مجاز در آزادراه‌ها برای موتورسیکلت‌ها ۹۰ کیلومتر بر ساعت است.",
      why: "غلط است (قدم ۱). موتورسیکلت عددهای سواری را دارد: آزادراه ۱۳۰.",
      rule: `${CDS_142} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "4050",
      textIt: "Il limite massimo di velocità sulle autostrade è di 80 km/h per l'autovettura che traina un caravan",
      answer: 1,
      chunks: [
        { it: LIMITE, fa: LIMITE_FA },
        { it: "sulle autostrade", fa: "در آزادراه‌ها" },
        { it: "è di 80 km/h", fa: "۸۰ کیلومتر بر ساعت است", verb: "è ← essere" },
        { it: "per l'autovettura che traina un caravan", fa: "برای سواری‌ای که کاروان می‌کشد", verb: "traina ← trainare" },
      ],
      translation: "حداکثرِ سرعتِ مجاز در آزادراه‌ها برای سواری‌ای که کاروان می‌کشد ۸۰ کیلومتر بر ساعت است.",
      why: "درست است (قدم ۲). کاروان یدک است: آزادراه ۸۰.",
      rule: `${CDS_142} c.3 lett. e`,
      conceptStep: 2,
    },
    {
      sourceId: "4095",
      textIt: "Su strade extraurbane principali il limite massimo di velocità è di 80 km/h per autovetture con rimorchio leggero",
      answer: 0,
      chunks: [
        { it: "Su strade extraurbane principali", fa: "در جاده‌های برون‌شهریِ اصلی" },
        { it: "il limite massimo di velocità", fa: LIMITE_FA },
        { it: "è di 80 km/h", fa: "۸۰ کیلومتر بر ساعت است", verb: "è ← essere", focus: "contrast" },
        { it: "per autovetture con rimorchio leggero", fa: "برای سواری‌هایی که یدکِ سبک دارند" },
      ],
      translation: "در جاده‌های برون‌شهریِ اصلی حداکثرِ سرعتِ مجاز برای سواری‌هایی که یدکِ سبک دارند ۸۰ کیلومتر بر ساعت است.",
      why: "غلط است (قدم ۲). یدک، سبک یا سنگین، بیرونِ آبادی ۷۰ است؛ ۸۰ فقط در آزادراه.",
      rule: `${CDS_142} c.3 lett. e`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        "4012", "4013", "4014", "4015", "4030", "4031", "4032", "4033",
        "4046", "4048", "4049", "4051", "4052", "4054", "4057", "4058", "4060", "4061", "4063",
        "4088", "4093", "4094", "4096", "4097",
        "4098", "4099", "4101", "4102", "4106", "4109", "4110",
      ],
    },
    {
      step: 2,
      sourceIds: ["4047", "4050", "4053", "4055", "4056", "4059", "4062", "4087", "4089", "4095", "4100", "4103", "4108", "4138", "4139", "4151"],
    },
  ],
};

// ── Lesson 4 ──────────────────────────────────────────────────────────────────

export const lessonLimitiNeopatentati: Lesson = {
  id: "limiti-ciclomotori-neopatentati",
  titleFa: "وسیله‌های کُند، سه سالِ اول، و عددهای پشتِ خودرو",
  titleIt: "CICLOMOTORI · QUADRICICLI · NEOPATENTATI · CONTRASSEGNI",
  minutes: 4,
  signs: [301],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس سقفِ وسیله‌هایی را که خودشان کُندند می‌دانی (موتورگازی ۴۵، چهارچرخِ غیرِ سبک ۸۰، ماشینِ کشاورزی ۴۰)، سقفِ سه سالِ اولِ گواهینامه را (۱۰۰ و ۹۰)، و می‌دانی دایره‌های عدددارِ پشتِ اتوبوس و کامیون چه می‌گویند.",
      why:
        "۲۳ سؤال. سه سالِ اول مستقیم به خودِ تو مربوط است: گواهینامه‌ی تازه‌ات تا سه سال سقفِ پایین‌تری دارد. بقیه عددهایی‌اند که بانک با عددِ نزدیک (۷۰ به جای ۸۰، ۵۰ به جای ۴۰) عوض می‌کند.",
      rule: `${CDS_142} c.3; CdS art. 117 c.2`,
    },
    {
      kind: "table",
      title: "وسیله‌هایی که خودشان کُندند",
      body: "این‌ها سقفِ ثابتِ خودشان را دارند و هیچ چیز آن را بالا نمی‌برد، حتی چراغِ زردِ چشمک‌زن روی ماشینِ کشاورزی. این‌که هر کدام چه وسیله‌ای است را در فصلِ ۱ (درس‌های ۷ و ۹) دیدی.",
      columns: ["سقف"],
      rows: [
        { label: "موتورگازی", it: "ciclomotore", values: ["۴۵ km/h، روی هر جاده‌ای (۷۰ نه)"] },
        { label: "چهارچرخِ غیرِ سبک", it: "quadriciclo non leggero", values: ["۸۰ km/h بیرونِ آبادی (۷۰ یا ۹۰ نه)"] },
        { label: "ماشینِ کشاورزی یا راه‌سازیِ لاستیکی", it: "macchina agricola · macchina operatrice gommata", values: ["۴۰ km/h (۵۰ یا ۷۰ نه)"] },
      ],
      takeaway: "۴۵ · ۸۰ · ۴۰ = موتورگازی · چهارچرخِ غیرِ سبک بیرونِ آبادی · ماشینِ کشاورزی و راه‌سازی.",
      rule: `${CDS_142} c.3 lett. a, c, d`,
    },
    {
      kind: "table",
      title: "سه سالِ اولِ گواهینامه",
      body: "تا سه سال بعد از گرفتنِ گواهینامه، دو سقفِ پایین‌تر برای خودِ راننده هست، با هر خودرویی:",
      columns: ["سقفِ تو"],
      rows: [
        { label: "آزادراه", it: "autostrade", values: ["۱۰۰ km/h (نه ۱۱۰، نه ۱۳۰)"] },
        { label: "برون‌شهریِ اصلی", it: "extraurbane principali", values: ["۹۰ km/h (نه ۱۱۰)"] },
        { label: "فرعی و شهر", it: "secondarie · centri abitati", values: ["مثلِ همه: ۹۰ و ۵۰"] },
      ],
      takeaway: "سه سالِ اول: ۱۰۰ در آزادراه، ۹۰ در برون‌شهریِ اصلی.",
      rule: "Codice della Strada, art. 117 c.2",
    },
    {
      kind: "table",
      title: "عددهای پشتِ خودرو",
      body:
        "این دایره‌ها تابلوی کنارِ جاده نیستند؛ برچسب‌هایی‌اند پشتِ وسیله‌هایی که سقفِ پایین‌ترِ خودشان را دارند (مثلاً بعضی اتوبوس‌ها و کامیون‌های سنگین؛ در autotreno روی یدک). هر عدد سقفِ همان وسیله روی یک نوع جاده است. سواری، موتورسیکلت و وسیله‌ی تا ۳٫۵ تن چنین برچسبی ندارند، چون سقفشان همان سقفِ عمومی است. با تابلوهای بازتابِ زرد و قرمزِ پشتِ وسیله‌های سنگین (فصلِ ۱، درسِ ۹) فرق دارند.",
      columns: ["معنا"],
      rows: [
        { label: "۶۰ · ۸۰ · ۱۰۰", it: "contrassegni di velocità", sign: 301, values: ["سقف‌های همین وسیله، پشتش چسبیده‌اند تا راننده‌ی پشتی بداند او کُندتر می‌رود."] },
        { label: "روی چه چیزی", it: "autobus · autocarri pesanti", values: ["بعضی اتوبوس‌ها و کامیون‌های سنگین. کامیونِ تا ۳٫۵ تن، کمپرِ تا ۳٫۵ تن و موتورسیکلت نه."] },
      ],
      takeaway: "دایره‌ی عدد پشتِ خودرو = سقفِ خودِ آن وسیله، نه سقفِ جاده.",
      rule: `${CDS_142} c.4`,
    },
    {
      kind: "classify",
      title: "سقف کدام است؟",
      body: "هوا خشک است و تابلوی سرعت نیست. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "100", fa: "100" },
        { it: "90", fa: "90" },
        { it: "80", fa: "80" },
        { it: "45", fa: "45" },
        { it: "40", fa: "40" },
      ],
      items: [
        { prompt: "یک سال است گواهینامه گرفته‌ای، آزادراه", answer: 0, explain: "سه سالِ اول: آزادراه ۱۰۰." },
        { prompt: "دو سال است گواهینامه گرفته‌ای، برون‌شهریِ اصلی", answer: 1, explain: "سه سالِ اول: اصلی ۹۰." },
        { prompt: "چهارچرخِ غیرِ سبک، برون‌شهریِ فرعی", answer: 2, explain: "بیرونِ آبادی ۸۰." },
        { prompt: "موتورگازی، برون‌شهریِ فرعی", answer: 3, explain: "موتورگازی همه‌جا ۴۵." },
        { prompt: "تراکتورِ لاستیکی با چراغِ چشمک‌زن", answer: 4, explain: "ماشینِ کشاورزی ۴۰؛ چراغ عدد را بالا نمی‌برد." },
      ],
      takeaway: "وسیله‌ی کُند سقفِ خودش را دارد؛ راننده‌ی تازه‌کار هم سقفِ خودش را.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il ciclomotore", fa: "موتورگازی (حداکثر ۴۵)" },
        { it: "il quadriciclo non leggero", fa: "چهارچرخِ کوچکِ موتوری (نه نوعِ سبکش)" },
        { it: "la macchina agricola gommata", fa: "ماشینِ کشاورزیِ لاستیکی" },
        { it: "la macchina operatrice", fa: "ماشینِ راه‌سازی یا کارگاهی" },
        { it: "conseguire la patente", base: "conseguire", fa: "گواهینامه گرفتن" },
        { it: "da meno di 3 anni", fa: "کمتر از ۳ سال است که …" },
        { it: "i contrassegni", fa: "نشان‌ها؛ برچسب‌های پشتِ خودرو" },
        { it: "la parte posteriore", fa: "قسمتِ عقب" },
      ],
    },
    {
      kind: "trap",
      title: "۱۰۰ یا ۱۱۰؟",
      body: "هر دو جمله درباره‌ی راننده‌ای است که کمتر از سه سال است گواهینامه دارد، در آزادراه:",
      examples: [
        {
          sourceId: "4037",
          textIt: "Il limite di velocità sulle autostrade per coloro che hanno conseguito la patente da meno di 3 anni è di 100 km/h",
          answer: 1,
          chunks: [
            { it: "Il limite di velocità sulle autostrade", fa: "سقفِ سرعت در آزادراه‌ها" },
            { it: NEOPATENTATI, fa: NEOPATENTATI_FA, verb: "hanno conseguito ← conseguire" },
            { it: "3 anni", fa: "۳ سال", focus: "limit" },
            { it: "è di 100 km/h", fa: "۱۰۰ کیلومتر بر ساعت است", verb: "è ← essere" },
          ],
          translation: "سقفِ سرعت در آزادراه‌ها برای کسانی که کمتر از ۳ سال پیش گواهینامه گرفته‌اند ۱۰۰ کیلومتر بر ساعت است.",
          why: "درست است. سه سالِ اول: آزادراه ۱۰۰.",
        },
        {
          sourceId: "4044",
          textIt: "Il limite di velocità sulle autostrade per coloro che hanno conseguito la patente da meno di tre anni è di 110 km/h",
          answer: 0,
          chunks: [
            { it: "Il limite di velocità sulle autostrade", fa: "سقفِ سرعت در آزادراه‌ها" },
            { it: NEOPATENTATI, fa: NEOPATENTATI_FA, verb: "hanno conseguito ← conseguire" },
            { it: "tre anni", fa: "سه سال", focus: "limit" },
            { it: "è di 110 km/h", fa: "۱۱۰ کیلومتر بر ساعت است", verb: "è ← essere", focus: "contrast" },
          ],
          translation: "سقفِ سرعت در آزادراه‌ها برای کسانی که کمتر از سه سال پیش گواهینامه گرفته‌اند ۱۱۰ کیلومتر بر ساعت است.",
          why: "غلط است. ۱۱۰ سقفِ همه در آزادراهِ بارانی است، نه سقفِ تازه‌کار. تازه‌کار: ۱۰۰.",
        },
      ],
      takeaway: "تازه‌کار: ۱۰۰ و ۹۰. اگر جمله ۱۱۰ گفت، حتماً غلط است.",
      rule: "Codice della Strada, art. 117 c.2",
    },
  ],
  practice: [
    {
      sourceId: "4091",
      textIt: "Salvo diversa segnalazione, il limite massimo di velocità consentito per i quadricicli non leggeri è di 70 km/h.",
      answer: 0,
      chunks: [
        { it: "Salvo diversa segnalazione,", fa: "مگر این‌که تابلو چیزِ دیگری بگوید،", focus: "condition" },
        { it: "il limite massimo di velocità consentito", fa: "حداکثرِ سرعتِ مجاز" },
        { it: "per i quadricicli non leggeri", fa: "برای چهارچرخ‌های غیرِ سبک" },
        { it: "è di 70 km/h.", fa: "۷۰ کیلومتر بر ساعت است.", verb: "è ← essere", focus: "contrast" },
      ],
      translation: "مگر این‌که تابلو چیزِ دیگری بگوید، حداکثرِ سرعتِ مجاز برای چهارچرخ‌های غیرِ سبک ۷۰ کیلومتر بر ساعت است.",
      why: "غلط است (قدم ۱). سقفِ این چهارچرخ‌ها بیرونِ آبادی ۸۰ است، نه ۷۰.",
      rule: `${CDS_142} c.3 lett. d`,
      conceptStep: 1,
    },
    {
      sourceId: "4022",
      textIt: "Il limite massimo di velocità per una macchina agricola gommata è di 40 km/h",
      answer: 1,
      chunks: [
        { it: LIMITE, fa: LIMITE_FA },
        { it: "per una macchina agricola gommata", fa: "برای ماشینِ کشاورزیِ لاستیکی" },
        { it: "è di 40 km/h", fa: "۴۰ کیلومتر بر ساعت است", verb: "è ← essere" },
      ],
      translation: "حداکثرِ سرعتِ مجاز برای ماشینِ کشاورزیِ لاستیکی ۴۰ کیلومتر بر ساعت است.",
      why: "درست است (قدم ۱). ماشینِ کشاورزی و راه‌سازیِ لاستیکی: ۴۰.",
      rule: `${CDS_142} c.3 lett. c`,
      conceptStep: 1,
    },
    {
      sourceId: "4038",
      textIt: "Il limite di velocità sulle strade extraurbane principali per coloro che hanno conseguito la patente da meno di 3 anni è di 90 km/h",
      answer: 1,
      chunks: [
        { it: "Il limite di velocità sulle strade extraurbane principali", fa: "سقفِ سرعت در جاده‌های برون‌شهریِ اصلی" },
        { it: NEOPATENTATI, fa: NEOPATENTATI_FA, verb: "hanno conseguito ← conseguire" },
        { it: "3 anni", fa: "۳ سال", focus: "limit" },
        { it: "è di 90 km/h", fa: "۹۰ کیلومتر بر ساعت است", verb: "è ← essere" },
      ],
      translation: "سقفِ سرعت در جاده‌های برون‌شهریِ اصلی برای کسانی که کمتر از ۳ سال پیش گواهینامه گرفته‌اند ۹۰ کیلومتر بر ساعت است.",
      why: "درست است (قدم ۲). سه سالِ اول: برون‌شهریِ اصلی ۹۰.",
      rule: "Codice della Strada, art. 117 c.2",
      conceptStep: 2,
    },
    {
      sourceId: "4116",
      sign: 301,
      textIt: "I contrassegni rappresentati in figura sono applicati su autocarri di massa complessiva fino a 3,5 tonnellate",
      answer: 0,
      chunks: [
        { it: CONTRASSEGNI, fa: CONTRASSEGNI_FA },
        { it: "sono applicati", fa: "چسبانده می‌شوند", verb: "sono applicati ← applicare" },
        { it: "su autocarri di massa complessiva fino a 3,5 tonnellate", fa: "روی کامیون‌هایی با جرمِ کلِ تا ۳٫۵ تن", focus: "limit" },
      ],
      translation: "نشان‌های تصویر روی کامیون‌هایی با جرمِ کلِ تا ۳٫۵ تن چسبانده می‌شوند.",
      why: "غلط است (قدم ۳). کامیونِ تا ۳٫۵ تن سقفِ سواری را دارد؛ برچسب برای وسیله‌هایی است که سقفِ پایین‌ترِ خودشان را دارند.",
      rule: `${CDS_142} c.4`,
      conceptStep: 3,
    },
    {
      sourceId: "4112",
      sign: 301,
      textIt: "I contrassegni rappresentati in figura indicano le velocità massime consentite al veicolo sul quale sono applicati",
      answer: 1,
      chunks: [
        { it: CONTRASSEGNI, fa: CONTRASSEGNI_FA },
        { it: "indicano le velocità massime consentite", fa: "حداکثرِ سرعت‌های مجاز را نشان می‌دهند", verb: "indicano ← indicare" },
        { it: "al veicolo sul quale sono applicati", fa: "برای وسیله‌ای که رویش چسبانده شده‌اند", verb: "sono applicati ← applicare" },
      ],
      translation: "نشان‌های تصویر حداکثرِ سرعت‌های مجاز را برای وسیله‌ای نشان می‌دهند که رویش چسبانده شده‌اند.",
      why: "درست است (قدم ۳). عددها سقفِ خودِ همان وسیله‌اند، نه سقفِ جاده.",
      rule: `${CDS_142} c.4`,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["4020", "4021", "4022", "4023", "4029", "4035", "4036", "4080", "4081", "4091", "4104", "4105", "4152"] },
    { step: 2, sourceIds: ["4037", "4038", "4044", "4045"] },
    { step: 3, sourceIds: ["4111", "4112", "4113", "4116", "4117", "4118"] },
  ],
};
