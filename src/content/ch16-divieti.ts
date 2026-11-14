/**
 * src/content/ch16-divieti.ts
 * Chapter 16 (Fermata, sosta, arresto), lessons 3–4: the two lists of
 * CdS art. 158. Comma 1 lists the places where fermata AND sosta are banned
 * (rail, tunnels and underpasses, crests and curves, signs and lane markings,
 * intersections, crossings, cycle paths, sidewalks); comma 2 the places where
 * only sosta is (driveways, double parking, bus/taxi/market spaces, fuel
 * stations, bins, emergency services). The core move of the chapter: "which
 * list is this place on?"
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter16.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_158 = "Codice della Strada, art. 158";

// ── Lesson 3 ──────────────────────────────────────────────────────────────────

export const lessonFermataSostaVietate: Lesson = {
  id: "fermata-sosta-vietate",
  titleFa: "جاهایی که نه توقف کوتاه، نه پارک",
  titleIt: "FERMATA E SOSTA VIETATE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس فهرستِ جاهایی را می‌دانی که قانون در آن‌ها هم توقف کوتاه و هم پارک را ممنوع کرده، بی‌آن‌که تابلویی لازم باشد، و می‌دانی «نزدیکِ آن» کجا هم ممنوع است و کجا نه.",
      why:
        "۴۵ سؤال، بزرگ‌ترین گروهِ فصل. بانک هر جا را دو بار می‌پرسد، یک بار با fermata و یک بار با sosta، و دامش «فقط پارک، نه توقف کوتاه» یا «روی خودش، نه نزدیکش» است. این فهرست بسته است: جایی که در آن نیست (مثلاً لبه‌ی راست یا شب) ممنوعیتِ عمومی ندارد.",
      rule: `${CDS_158} c.1`,
    },
    {
      kind: "table",
      title: "ریل، تونل، برآمدگی و پیچ",
      body:
        "در همه‌ی این جاها هم توقف کوتاه ممنوع است و هم پارک. یک ایستادنِ کوتاه این‌جا هم دیگران را بی‌دید یا بی‌راه می‌گذارد. «نزدیکِ آن» برای برآمدگی و پیچ فقط بیرونِ آبادی و در خیابان‌های شهریِ پرسرعت (urbane di scorrimento) هم ممنوع است؛ برای گذرگاهِ راه‌آهن همه‌جا.",
      columns: ["روی خودش", "نزدیکِ آن"],
      rows: [
        { label: "گذرگاه راه‌آهن", it: "passaggio a livello", values: ["ممنوع", "ممنوع، همه‌جا"] },
        {
          label: "ریلِ قطار و ریلِ تراموا",
          it: "binari ferroviari o tranviari",
          values: ["ممنوع، هر دو ریل", "ممنوع وقتی آن‌قدر نزدیک است که جلوی وسیله‌ی ریلی را بگیرد"],
        },
        { label: "تونل", it: "galleria", values: ["ممنوع، مگر تابلو اجازه دهد؛ روشن بودنِ تونل فرقی نمی‌کند", "—"] },
        {
          label: "زیرگذر، زیرِ روگذر، زیرِ طاق‌ها و رواق‌ها",
          it: "sottovia · sovrapassaggi · fornici · portici",
          values: ["ممنوع، مگر تابلو اجازه دهد", "—"],
        },
        { label: "برآمدگی", it: "il dosso", values: ["ممنوع، همه‌جا", "بیرونِ آبادی و urbane di scorrimento: ممنوع"] },
        { label: "پیچ", it: "la curva", values: ["ممنوع، همه‌جا؛ حتی توقفِ خیلی کوتاه", "بیرونِ آبادی و urbane di scorrimento: ممنوع"] },
      ],
      takeaway: "ریل، تونل، زیرگذر، برآمدگی، پیچ: نه توقف کوتاه، نه پارک. «فقط پارک ممنوع است» در این ردیف‌ها همیشه غلط است.",
      rule: `${CDS_158} c.1 lett. a–c`,
    },
    {
      kind: "table",
      title: "تابلو، خط، تقاطع، عابر",
      body:
        "گروهِ دوم جاهایی‌اند که خودروی ایستاده دیدِ دیگران یا راهِ عابر و دوچرخه را می‌بندد. برای تابلو و چراغ، شرط این است که دیدشان را بپوشانی؛ نزدیکِ تابلو ایستادن به‌خودیِ خود ممنوع نیست.",
      columns: ["قاعده"],
      rows: [
        { label: "تابلو و چراغِ راهنمایی", values: ["روی آن یا نزدیکش، وقتی دیدش را می‌پوشانی"] },
        {
          label: "خط‌کشیِ انتخابِ جهت و خطِ هدایت",
          it: "preselezione · corsie di canalizzazione",
          values: ["روی فلش‌های انتخابِ جهت و در تمامِ طولِ خطِ هدایت. خطِ شتاب هم فقط برای واردشدن است؛ «توقفِ خیلی کوتاه» آن‌جا هم نه"],
        },
        { label: "تقاطع، بیرونِ آبادی", values: ["روی تقاطع و نزدیکش"] },
        { label: "تقاطع، داخلِ آبادی", values: ["روی تقاطع و تا ۵ متر از آن، مگر تابلو چیز دیگری بگوید. بیش از ۵ متر ممنوعیتِ عمومی ندارد"] },
        { label: "گذرگاه عابر پیاده", it: "attraversamento pedonale", values: ["همیشه، حتی برای پیاده کردنِ یک مسافر"] },
        { label: "مسیرِ ویژه‌ی دوچرخه", it: "pista ciclabile", values: ["روی آن و جلوی خروجی‌هایش، در هر حال؛ کوتاه بودن فرقی نمی‌کند"] },
        { label: "پیاده‌رو", it: "marciapiede", values: ["ممنوع، مگر تابلو اجازه دهد؛ «اگر کوتاه باشد» نه"] },
      ],
      takeaway: "تقاطع: داخلِ آبادی ۵ متر، بیرونِ آبادی «نزدیک». تابلو: فقط وقتی دیدش را می‌بندی. گذرگاه، مسیرِ دوچرخه، پیاده‌رو: هیچ‌وقت.",
      rule: `${CDS_158} c.1 lett. d–h; Codice della Strada, art. 176 c.1 lett. d`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "in corrispondenza", fa: "روی خودش، درست همان‌جا" },
        { it: "in prossimità", fa: "نزدیکِ آن" },
        { it: "il dosso", fa: "برآمدگی", note: "در این فصل یعنی بالای یک سربالایی، جایی که پشتش دیده نمی‌شود." },
        { it: "il sottovia", fa: "زیرگذر" },
        { it: "il sovrapassaggio", fa: "روگذر (پلی که از بالا رد می‌شود)" },
        { it: "il fornice", fa: "دهانه‌ی طاق" },
        { it: "il portico", fa: "رواق، راهروی سرپوشیده" },
        { it: "occultarne la vista", fa: "دیدنش را پوشاندن", base: "occultare" },
        { it: "salvo diversa segnalazione", fa: "مگر این‌که تابلو چیز دیگری بگوید" },
        { it: "la strada urbana di scorrimento", fa: "خیابانِ شهریِ پرسرعت (با جداکننده)" },
      ],
    },
    {
      kind: "trap",
      title: "۵ متر: کمتر یا بیشتر",
      body: "هر دو جمله درباره‌ی تقاطع داخلِ آبادی‌اند و هر دو ۵ متر دارند. فقط جهتِ عدد فرق دارد:",
      examples: [
        {
          sourceId: "5359",
          textIt:
            "Nei centri abitati, la fermata e la sosta sono vietate in corrispondenza delle aree di intersezione e in prossimità di esse a meno di 5 metri, salvo diversa segnalazione.",
          answer: 1,
          chunks: [
            { it: "Nei centri abitati,", fa: "داخلِ آبادی،" },
            { it: "la fermata e la sosta sono vietate", fa: "توقف کوتاه و پارک ممنوع‌اند", verb: "sono vietate ← vietare" },
            { it: "in corrispondenza delle aree di intersezione", fa: "روی تقاطع" },
            { it: "e in prossimità di esse a meno di 5 metri,", fa: "و نزدیکش، کمتر از ۵ متر،", focus: "limit" },
            { it: "salvo diversa segnalazione.", fa: "مگر این‌که تابلو چیز دیگری بگوید.", focus: "condition" },
          ],
          translation: "داخلِ آبادی، توقف کوتاه و پارک روی تقاطع و نزدیکِ آن تا کمتر از ۵ متر ممنوع‌اند، مگر این‌که تابلو چیز دیگری بگوید.",
          why: "درست است. ماده‌ی ۱۵۸ بند ۱: داخلِ آبادی، تقاطع و ۵ مترِ دورش.",
        },
        {
          sourceId: "5364",
          textIt: "Nei centri abitati la fermata è vietata in prossimità delle aree di intersezione, a più di 5 metri",
          answer: 0,
          chunks: [
            { it: "Nei centri abitati", fa: "داخلِ آبادی" },
            { it: "la fermata è vietata", fa: "توقف کوتاه ممنوع است", verb: "è vietata ← vietare" },
            { it: "in prossimità delle aree di intersezione,", fa: "نزدیکِ تقاطع،" },
            { it: "a più di 5 metri", fa: "بیش از ۵ متر", focus: "contrast" },
          ],
          translation: "داخلِ آبادی، توقف کوتاه نزدیکِ تقاطع، در بیش از ۵ متر، ممنوع است.",
          why: "غلط است. ممنوعیت تا ۵ متر است؛ از ۵ متر به بعد قانون چیزی ممنوع نمی‌کند.",
        },
      ],
      takeaway: "«a meno di 5 metri» = کمتر از ۵ متر، ممنوع. «a più di 5 metri» = بیشتر از ۵ متر، آزاد (اگر تابلو نباشد).",
      rule: `${CDS_158} c.1 lett. f`,
    },
  ],
  practice: [
    {
      sourceId: "5345",
      textIt: "La fermata è vietata nelle gallerie, salvo diversa segnalazione.",
      answer: 1,
      chunks: [
        { it: "La fermata è vietata", fa: "توقف کوتاه ممنوع است", verb: "è vietata ← vietare" },
        { it: "nelle gallerie,", fa: "در تونل‌ها،" },
        { it: "salvo diversa segnalazione.", fa: "مگر این‌که تابلو چیز دیگری بگوید.", focus: "condition" },
      ],
      translation: "توقف کوتاه در تونل‌ها ممنوع است، مگر این‌که تابلو چیز دیگری بگوید.",
      why: "درست است (قدم ۱). تونل در فهرستِ «هر دو ممنوع» است؛ فقط تابلو می‌تواند اجازه بدهد.",
      rule: `${CDS_158} c.1 lett. b`,
      conceptStep: 1,
    },
    {
      sourceId: "5411",
      textIt: "La sosta è vietata in corrispondenza dei passaggi a livello ma non in loro prossimità",
      answer: 0,
      chunks: [
        { it: "La sosta è vietata", fa: "پارک ممنوع است", verb: "è vietata ← vietare" },
        { it: "in corrispondenza dei passaggi a livello", fa: "روی گذرگاه‌های راه‌آهن" },
        { it: "ma non in loro prossimità", fa: "ولی نه نزدیکِ آن‌ها", focus: "contrast" },
      ],
      translation: "پارک روی گذرگاه‌های راه‌آهن ممنوع است، ولی نزدیکِ آن‌ها نه.",
      why: "غلط است (قدم ۱). گذرگاه راه‌آهن تنها جایی است که «نزدیکش» همه‌جا ممنوع است، داخل و بیرونِ آبادی.",
      rule: `${CDS_158} c.1 lett. a`,
      conceptStep: 1,
    },
    {
      sourceId: "5358",
      textIt: "Fuori dei centri abitati, la fermata è vietata in corrispondenza e in prossimità delle aree di intersezione",
      answer: 1,
      chunks: [
        { it: "Fuori dei centri abitati,", fa: "بیرونِ آبادی،" },
        { it: "la fermata è vietata", fa: "توقف کوتاه ممنوع است", verb: "è vietata ← vietare" },
        { it: "in corrispondenza e in prossimità", fa: "روی و نزدیکِ" },
        { it: "delle aree di intersezione", fa: "تقاطع‌ها" },
      ],
      translation: "بیرونِ آبادی، توقف کوتاه روی تقاطع‌ها و نزدیکِ آن‌ها ممنوع است.",
      why: "درست است (قدم ۲). بیرونِ آبادی عددی نیست: «نزدیکِ تقاطع» هم ممنوع است. عددِ ۵ متر مالِ داخلِ آبادی است.",
      rule: `${CDS_158} c.1 lett. e`,
      conceptStep: 2,
    },
    {
      sourceId: "5362",
      textIt: "La fermata è vietata in prossimità dei segnali stradali, anche se il veicolo non ne occulta la vista",
      answer: 0,
      chunks: [
        { it: "La fermata è vietata", fa: "توقف کوتاه ممنوع است", verb: "è vietata ← vietare" },
        { it: "in prossimità dei segnali stradali,", fa: "نزدیکِ تابلوهای راهنمایی،" },
        { it: "anche se il veicolo non ne occulta la vista", fa: "حتی اگر خودرو دیدِ آن‌ها را نپوشاند", verb: "occulta ← occultare", focus: "contrast" },
      ],
      translation: "توقف کوتاه نزدیکِ تابلوهای راهنمایی ممنوع است، حتی اگر خودرو دیدِ آن‌ها را نپوشاند.",
      why: "غلط است (قدم ۲). ممنوعیت به خاطرِ پوشاندنِ دید است؛ اگر تابلو دیده می‌شود، نزدیکش ایستادن ممنوع نیست.",
      rule: `${CDS_158} c.1 lett. d`,
      conceptStep: 2,
    },
    {
      sourceId: "5427",
      textIt: "La sosta è vietata sulle piste ciclabili, ma non agli sbocchi di esse nel caso sia di breve durata",
      answer: 0,
      chunks: [
        { it: "La sosta è vietata sulle piste ciclabili,", fa: "پارک روی مسیرهای ویژه‌ی دوچرخه ممنوع است،", verb: "è vietata ← vietare" },
        { it: "ma non agli sbocchi di esse", fa: "ولی نه جلوی خروجی‌هایشان", focus: "contrast" },
        { it: "nel caso sia di breve durata", fa: "اگر کوتاه باشد", verb: "sia ← essere", focus: "condition" },
      ],
      translation: "پارک روی مسیرهای ویژه‌ی دوچرخه ممنوع است، ولی اگر کوتاه باشد، جلوی خروجی‌هایشان نه.",
      why: "غلط است (قدم ۲). روی مسیرِ دوچرخه و جلوی خروجی‌هایش، توقف کوتاه و پارک در هر حال ممنوع‌اند؛ کوتاه بودن فرقی نمی‌کند.",
      rule: `${CDS_158} c.1 lett. g`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // rail, tunnels, underpasses, crests, curves; the list is closed (no night ban)
      sourceIds: [
        "5343", "5344", "5345", "5346", "5347", "5348", "5349", "5352", "5375",
        "5405", "5406", "5407", "5408", "5409", "5410", "5411", "5412", "5413", "5414", "5415", "5416", "5422",
      ],
    },
    {
      step: 2,
      // signs and lights hidden, lane markings, intersections (5 m), crossings, cycle paths, sidewalks
      sourceIds: [
        "5355", "5356", "5357", "5358", "5359", "5362", "5364", "5365", "5366", "5367", "5368", "5371",
        "5372", "5417", "5418", "5419", "5420", "5423", "5424", "5425", "5426", "5427", "5428",
      ],
    },
  ],
};

// ── Lesson 4 ──────────────────────────────────────────────────────────────────

const PASSI = "allo sbocco dei passi carrabili";
const PASSI_FA = "جلوی ورودیِ خودرو به ملک";

export const lessonSoloSostaVietata: Lesson = {
  id: "solo-sosta-vietata",
  titleFa: "جاهایی که فقط پارک ممنوع است",
  titleIt: "SOSTA VIETATA · FERMATA CONSENTITA",
  minutes: 5,
  signs: [84],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس فهرستِ دومِ قانون را می‌دانی: جاهایی که پارک ممنوع است ولی توقف کوتاه نه، چون خودروی پارک‌شده جای کسی را می‌گیرد که آن‌جا کار دارد. و هر جا را می‌توانی در یکی از سه دسته بگذاری: هر دو ممنوع، فقط پارک، یا هر دو مجاز.",
      why:
        "۳۰ سؤال. این‌جا دامِ بانک برعکسِ درسِ ۳ است: «توقف کوتاه هم ممنوع است» در جایی که فقط پارک ممنوع است. یک جمله‌ی بانک (#5353 و #5373) با همان متن دو بار آمده و هر دو بار غلط است.",
      rule: `${CDS_158} c.2–3`,
    },
    {
      kind: "table",
      title: "جای کسی را نگیر",
      body:
        "این‌جاها مالِ کسی است که باید وارد یا خارج شود، سوار و پیاده کند یا کار کند. پارک ممنوع است؛ «برای مدتِ کوتاه» یا «با چراغِ خطر» چیزی را عوض نمی‌کند. قانون برای این‌ها تابلو لازم ندارد.",
      columns: ["پارک ممنوع است", "نکته"],
      rows: [
        { label: "ورودیِ خودرو به ملک", it: "passo carrabile", values: ["جلوی ورودی", "توقف کوتاه مجاز است"] },
        { label: "خودروهای پارک‌شده", values: ["جایی که خودرویی را که درست پارک کرده محبوس کنی یا نگذاری جابه‌جا شود", "—"] },
        {
          label: "ردیفِ دوم (دوبل)",
          it: "in seconda fila · in doppia fila",
          values: ["برای همه، جز وسیله‌های دوچرخ", "«چند دقیقه با چراغِ خطر» یا «اگر جا برای دو ردیف بماند» نه"],
        },
        {
          label: "ایستگاهِ اتوبوس، اتوبوس برقی، تراموا",
          values: ["روی جای مخصوصِ ایستادن و توقفشان؛ اگر جایشان خط‌کشی نشده، تا ۱۵ متر از تابلوی ایستگاه", "«کوتاه» نه"],
        },
        { label: "ایستگاهِ تاکسی", it: "veicoli in servizio di piazza", values: ["روی جای مخصوصِ تاکسی‌ها", "«اگر طول نکشد» نه"] },
        { label: "بازار و بارگیری", it: "mercato · carico e scarico", values: ["در ساعت‌هایی که تابلو تعیین کرده", "«اگر کوتاه باشد» نه"] },
        {
          label: "پمپ‌بنزین",
          it: "distributori di carburante",
          values: ["روی آن و ۵ متر قبل و بعدش، فقط در ساعت‌های کارش", "وقتی بسته است، این ممنوعیت نیست"],
        },
        { label: "سطل‌های زباله‌ی شهری", it: "cassonetti", values: ["جلوی سطل‌ها", "توقف کوتاه مجاز است"] },
        { label: "خدماتِ اضطراری و بهداشتِ عمومی", values: ["جاهایی که تابلو برایشان مشخص کرده", "توقف کوتاه مجاز است"] },
        { label: "یدکِ جداشده از خودرو", it: "rimorchio staccato", values: ["داخلِ آبادی، مگر تابلو اجازه دهد", "—"] },
      ],
      takeaway: "پارک جای کسی را می‌گیرد، توقف کوتاه نه. «کوتاه»، «چند دقیقه» و «چراغِ خطر» پارکِ ممنوع را مجاز نمی‌کنند.",
      rule: `${CDS_158} c.2 lett. a–e, m–o; c.3`,
    },
    {
      kind: "table",
      title: "توقف کوتاه: آره. پارک: نه",
      body:
        "در هر کدام از این ردیف‌ها بانک یک بار می‌گوید «توقف کوتاه هم ممنوع است». نیست. و ممنوعیتی که قانون نوشته تابلو نمی‌خواهد؛ تابلو جایی می‌آید که قانون خودش چیزی نگفته. تابلوی پارک ممنوع را در فصلِ ۳ (درسِ ۱۱) دیدی: یک خطِ مورب، پس توقف کوتاه مجاز است.",
      columns: ["توقف کوتاه", "پارک"],
      rows: [
        { label: "جلوی ورودیِ خودرو به ملک", it: PASSI, values: ["مجاز", "ممنوع"] },
        { label: "جلوی سطل‌های زباله", it: "davanti ai cassonetti", values: ["مجاز", "ممنوع"] },
        { label: "بازار و بارگیری", values: ["مجاز", "ممنوع در ساعت‌های تعیین‌شده"] },
        { label: "پمپ‌بنزین", values: ["مجاز", "ممنوع در ساعت‌های کار، تا ۵ متر قبل و بعد"] },
        { label: "ردیفِ دوم", values: ["همیشه ممنوع نیست؛ به شرطِ این‌که مزاحمِ ترافیک نشوی (درسِ ۱)", "ممنوع، جز دوچرخ‌ها"] },
        { label: "بعد از تابلوی پارک ممنوع", it: "DIVIETO DI SOSTA", values: ["مجاز", "ممنوع"] },
        { label: "ممنوعیتی که در قانون آمده", values: ["—", "بدونِ هیچ تابلویی هم باید رعایت شود"] },
      ],
      takeaway: "فهرستِ دوم = فقط پارک. اگر جمله‌ای در این جاها توقف کوتاه را ممنوع کرد، غلط است.",
      rule: `${CDS_158} c.1–2; DPR 495/1992 art. 120 c.1 lett. b`,
    },
    {
      kind: "classify",
      title: "کدام فهرست؟",
      body: "درسِ ۳ و این درس را کنارِ هم بگذار. هر جا را بخوان و بگو قانون چه می‌گوید، وقتی تابلویی چیز دیگری نگفته. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "fermata e sosta vietate", fa: "توقف کوتاه و پارک، هر دو ممنوع" },
        { it: "solo sosta vietata", fa: "فقط پارک ممنوع" },
        { it: "fermata e sosta consentite", fa: "هر دو مجاز" },
      ],
      items: [
        { prompt: "روی گذرگاه عابر پیاده، برای پیاده کردنِ دوستت.", answer: 0, explain: "گذرگاه عابر در فهرستِ اول است: توقف کوتاه هم نه." },
        { prompt: "جلوی درِ پارکینگِ یک ساختمان.", answer: 1, explain: "ورودیِ خودرو به ملک در فهرستِ دوم است: توقف کوتاه آره، پارک نه." },
        { prompt: "بالای یک سربالایی در جاده‌ی بیرونِ آبادی.", answer: 0, explain: "برآمدگی، فهرستِ اول: هیچ‌کدام." },
        { prompt: "جلوی سطل‌های زباله‌ی شهری.", answer: 1, explain: "سطل‌ها در فهرستِ دوم‌اند: کامیونِ زباله باید به آن‌ها برسد." },
        { prompt: "خیابانِ شهری با پیاده‌رو، کنارِ لبه‌ی راست، دور از تقاطع.", answer: 2, explain: "در هیچ فهرستی نیست: جای درستِ توقف کوتاه و پارک (درسِ ۲)." },
        { prompt: "ردیفِ دوم، با سواری، چراغ‌های خطر روشن، «فقط دو دقیقه».", answer: 1, explain: "پارک در ردیفِ دوم ممنوع است؛ چراغِ خطر چیزی را عوض نمی‌کند." },
        { prompt: "۳ متر مانده به تقاطع، داخلِ آبادی.", answer: 0, explain: "کمتر از ۵ متر از تقاطع، داخلِ آبادی: هر دو ممنوع." },
        { prompt: "پمپ‌بنزینِ شهر ساعت ۲ بامداد، وقتی بسته است.", answer: 2, explain: "پارک فقط در ساعت‌های کار ممنوع است؛ بسته که باشد، این ممنوعیت نیست." },
      ],
      takeaway: "سه سؤال به ترتیب: در فهرستِ اول است؟ هر دو ممنوع. در فهرستِ دوم؟ فقط پارک. در هیچ‌کدام و تابلویی نیست؟ هر دو مجاز.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il passo carrabile", fa: "ورودیِ خودرو به ملک" },
        { it: "lo sbocco", fa: "دهانه، جای بیرون آمدن" },
        { it: "in seconda fila", fa: "در ردیفِ دوم (دوبل)", note: "«in doppia fila» هم همین است." },
        { it: "i veicoli in servizio di piazza", fa: "تاکسی‌ها" },
        { it: "il carico e lo scarico delle merci", fa: "بارگیری و تخلیه‌ی کالا" },
        { it: "il distributore di carburante", fa: "پمپ‌بنزین" },
        { it: "limitatamente alle ore di esercizio", fa: "فقط در ساعت‌های کار" },
        { it: "il cassonetto dei rifiuti urbani", fa: "سطلِ بزرگِ زباله‌ی شهری" },
        { it: "il rimorchio staccato dalla motrice", fa: "یدکِ جداشده از خودروی کِشنده" },
        { it: "le luci di emergenza", fa: "چراغِ خطر (چهار راهنما با هم)" },
      ],
    },
    {
      kind: "trap",
      title: "ورودیِ خودرو به ملک: توقف آره یا نه؟",
      body: "دو جمله‌ی بانک با یک کلمه‌ی متفاوت: «consentita» یا «vietata»:",
      examples: [
        {
          sourceId: "5369",
          textIt: "La fermata è consentita allo sbocco dei passi carrabili",
          answer: 1,
          chunks: [
            { it: "La fermata è consentita", fa: "توقف کوتاه مجاز است", verb: "è consentita ← consentire" },
            { it: PASSI, fa: PASSI_FA },
          ],
          translation: "توقف کوتاه جلوی ورودیِ خودرو به ملک مجاز است.",
          why: "درست است. ورودیِ خودرو به ملک در فهرستِ دوم است: فقط پارک ممنوع است.",
        },
        {
          sourceId: "5373",
          textIt: "La fermata è vietata allo sbocco dei passi carrabili",
          answer: 0,
          chunks: [
            { it: "La fermata è vietata", fa: "توقف کوتاه ممنوع است", verb: "è vietata ← vietare", focus: "contrast" },
            { it: PASSI, fa: PASSI_FA },
          ],
          translation: "توقف کوتاه جلوی ورودیِ خودرو به ملک ممنوع است.",
          why: "غلط است. جلوی ورودیِ خودرو به ملک فقط پارک ممنوع است. صاحبِ ملک چند ثانیه صبر می‌کند؛ ساعت‌ها نه.",
        },
      ],
      takeaway: "اول بپرس جمله درباره‌ی fermata است یا sosta. بعد بپرس این جا در کدام فهرست است.",
      rule: `${CDS_158} c.2 lett. a`,
    },
  ],
  practice: [
    {
      sourceId: "5431",
      textIt: "La sosta è vietata in seconda fila, salvo che si tratti di veicoli a due ruote",
      answer: 1,
      chunks: [
        { it: "La sosta è vietata in seconda fila,", fa: "پارک در ردیفِ دوم ممنوع است،", verb: "è vietata ← vietare" },
        { it: "salvo che si tratti di veicoli a due ruote", fa: "مگر این‌که وسیله‌ی دوچرخ باشد", verb: "si tratti ← trattarsi", focus: "condition" },
      ],
      translation: "پارک در ردیفِ دوم ممنوع است، مگر این‌که وسیله‌ی دوچرخ باشد.",
      why: "درست است (قدم ۱). ماده‌ی ۱۵۸ بند ۲ همین استثنا را دارد: دوچرخ‌ها.",
      rule: `${CDS_158} c.2 lett. c`,
      conceptStep: 1,
    },
    {
      sourceId: "5434",
      textIt: "La sosta degli autoveicoli in doppia fila è consentita per pochi minuti, azionando le luci di emergenza",
      answer: 0,
      chunks: [
        { it: "La sosta degli autoveicoli in doppia fila", fa: "پارکِ خودروها در ردیفِ دوم" },
        { it: "è consentita per pochi minuti,", fa: "برای چند دقیقه مجاز است،", verb: "è consentita ← consentire", focus: "limit" },
        { it: "azionando le luci di emergenza", fa: "با روشن کردنِ چراغ‌های خطر", verb: "azionando ← azionare", focus: "condition" },
      ],
      translation: "پارکِ خودروها در ردیفِ دوم برای چند دقیقه، با روشن کردنِ چراغ‌های خطر، مجاز است.",
      why: "غلط است (قدم ۱). نه «چند دقیقه» استثناست و نه چراغِ خطر. پارکِ دوبل برای خودرو ممنوع است.",
      rule: `${CDS_158} c.2 lett. c`,
      conceptStep: 1,
    },
    {
      sourceId: "5453",
      textIt:
        "La sosta è vietata, limitatamente alle ore di esercizio, in corrispondenza dei distributori di carburante, e in loro prossimità sino a 5 metri prima e dopo",
      answer: 1,
      chunks: [
        { it: "La sosta è vietata,", fa: "پارک ممنوع است،", verb: "è vietata ← vietare" },
        { it: "limitatamente alle ore di esercizio,", fa: "فقط در ساعت‌های کار،", focus: "limit" },
        { it: "in corrispondenza dei distributori di carburante,", fa: "روی پمپ‌بنزین‌ها،" },
        { it: "e in loro prossimità sino a 5 metri prima e dopo", fa: "و نزدیکشان، تا ۵ متر قبل و بعد" },
      ],
      translation: "پارک، فقط در ساعت‌های کار، روی پمپ‌بنزین‌ها و نزدیکشان تا ۵ متر قبل و بعد ممنوع است.",
      why: "درست است (قدم ۱). هر سه جزء درست است: ساعت‌های کار، روی پمپ، ۵ متر قبل و بعد.",
      rule: `${CDS_158} c.2 lett. o`,
      conceptStep: 1,
    },
    {
      sourceId: "5370",
      textIt: "La fermata è consentita davanti ai cassonetti dei rifiuti urbani",
      answer: 1,
      chunks: [
        { it: "La fermata è consentita", fa: "توقف کوتاه مجاز است", verb: "è consentita ← consentire" },
        { it: "davanti ai cassonetti dei rifiuti urbani", fa: "جلوی سطل‌های زباله‌ی شهری" },
      ],
      translation: "توقف کوتاه جلوی سطل‌های زباله‌ی شهری مجاز است.",
      why: "درست است (قدم ۲). سطل‌ها در فهرستِ دوم‌اند: فقط پارک ممنوع است.",
      rule: `${CDS_158} c.2 lett. n`,
      conceptStep: 2,
    },
    {
      sourceId: "5361",
      sign: 84,
      textIt: "La fermata è vietata dopo il segnale DIVIETO DI SOSTA",
      answer: 0,
      chunks: [
        { it: "La fermata è vietata", fa: "توقف کوتاه ممنوع است", verb: "è vietata ← vietare" },
        { it: "dopo il segnale DIVIETO DI SOSTA", fa: "بعد از تابلوی پارک ممنوع" },
      ],
      translation: "بعد از تابلوی پارک ممنوع، توقف کوتاه ممنوع است.",
      why: "غلط است (قدم ۲). یک خطِ مورب یعنی فقط پارک ممنوع؛ توقف کوتاه مجاز است. ضربدر (توقف ممنوع) چیزِ دیگری است.",
      rule: "DPR 495/1992 art. 120 c.1 lett. b",
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // art. 158 c.2–3: driveways, blocking, double parking, bus/taxi/market, fuel, bins, emergency, trailers
      sourceIds: [
        "5421", "5429", "5430", "5431", "5432", "5433", "5434", "5435", "5436", "5437",
        "5438", "5442", "5443", "5448", "5449", "5451", "5452", "5453", "5454", "5456",
      ],
    },
    {
      step: 2,
      // fermata allowed where only sosta is banned; a ban in the law needs no sign
      sourceIds: ["5353", "5354", "5360", "5361", "5369", "5370", "5373", "5374", "5455", "5457"],
    },
  ],
};
