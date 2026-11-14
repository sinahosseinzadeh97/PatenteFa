/**
 * src/content/ch17-carico.ts
 * Chapter 17 (Norme varie, autostrade, pannelli), lessons 6–8: who and what
 * you carry (CdS artt. 54, 169, 170), how the load is arranged and how far it
 * may protrude (art. 164), and the rear panels: 302 protruding load
 * (Regolamento art. 361), 303 dangerous goods (art. 168, ADR), 304 and 305
 * heavy and long vehicles (DM 40/2003, ECE R70).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter17.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson, SignRef } from "./lessons.js";

const CDS_164 = "Codice della Strada, art. 164";
const CDS_169 = "Codice della Strada, art. 169";
const CDS_170 = "Codice della Strada, art. 170";
const REG_361 = "DPR 495/1992 (Regolamento), art. 361";
const DM_40 = "DM 24/01/2003 n. 40 (pannelli per veicoli pesanti e lunghi, ECE R70)";
const IL_CARICO = "Il carico dei veicoli deve essere sistemato in modo da";
const IL_CARICO_FA = "بارِ وسیله‌ها باید طوری چیده شود که";
const CIRCOLANDO = "Circolando dietro ad un veicolo";
const CIRCOLANDO_FA = "وقتی پشتِ وسیله‌ای حرکت می‌کنی";
const PANNELLO = "Il pannello raffigurato";
const PANNELLO_FA = "پنلِ نشان‌داده‌شده";
const CARICO_SPORGENTE: SignRef = { sign: 302, nameIt: "PANNELLO PER CARICHI SPORGENTI", nameFa: "پنلِ بارِ بیرون‌زده" };

// ── Lesson 6 ──────────────────────────────────────────────────────────────────

export const lessonPasseggeri: Lesson = {
  id: "passeggeri-animali",
  titleFa: "سرنشین، حیوان و ترک‌نشین",
  titleIt: "TRASPORTO DI PERSONE E ANIMALI",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی چند نفر را از کجا می‌شود فهمید (کارتِ خودرو، با احتسابِ راننده؛ سواری حداکثر ۹)، حیوان را چطور می‌بری، و روی موتورسیکلت چه کسی و چه چیزی را نمی‌بری.",
      why:
        "۲۲ سؤال. دامِ اصلی یک کلمه است: «compreso» (با احتسابِ). جمله‌هایی که راننده را از شمار بیرون می‌گذارند، یا عددِ ثابتی برای همه‌ی موتورسیکلت‌ها و کامیون‌ها می‌سازند، غلط‌اند.",
      rule: `${CDS_169} c.2, c.4, c.6; ${CDS_170}`,
    },
    {
      kind: "table",
      title: "چند نفر، و چطور",
      body: "عددِ سرنشین را حافظه‌ات تعیین نمی‌کند، کارتِ خودرو (carta di circolazione) تعیین می‌کند؛ و این عدد صندلیِ راننده را هم می‌شمارد.",
      columns: ["قانون", "دامِ بانک"],
      rows: [
        {
          label: "عدد از کجا",
          it: "indicato sulla carta di circolazione",
          values: ["تعدادِ صندلی‌ها و آدم‌هایی که می‌شود برد در کارتِ خودرو نوشته شده، برای هر وسیله", "«همیشه ۲ نفر روی موتورسیکلت»، «همیشه ۵ نفر در کامیون» غلط‌اند: عدد مالِ همان وسیله است"],
        },
        {
          label: "راننده هم",
          it: "compreso il conducente",
          values: ["این عدد راننده را هم می‌شمارد", "«راننده جزوِ این عدد نیست» غلط است"],
        },
        {
          label: "سقفِ سواری",
          it: "al massimo nove posti",
          values: ["سواری حداکثر ۹ صندلی دارد، با صندلیِ راننده؛ بیشتر از آن دیگر سواری نیست", "«حداکثر ۴» یا «تا ۱۰» غلط‌اند"],
        },
        {
          label: "چطور بنشینند",
          it: "non limitare la libertà del conducente",
          values: ["طوری که جلوی حرکتِ آزادِ راننده یا دیدش را نگیرند", ""],
        },
      ],
      takeaway: "عدد = کارتِ خودرو، راننده هم جزوش. سواری: حداکثر ۹ با راننده.",
      rule: `${CDS_169} c.2, c.4; Codice della Strada, art. 54 c.1 lett. a`,
    },
    {
      kind: "table",
      title: "حیوانِ خانگی در خودرو",
      body: "قانون یک حیوان را آزاد می‌گذارد، به شرطی که مزاحمِ رانندگی نشود. برای بیشتر از یکی، باید جای جدا داشته باشند:",
      columns: ["مجاز", "شرط"],
      rows: [
        { label: "یک حیوان", it: "un animale domestico", values: ["بله", "به شرطی که مانع یا خطری برای رانندگی نباشد"] },
        {
          label: "بیشتر از یکی",
          it: "in gabbia o nel vano posteriore diviso da rete",
          values: ["بله", "فقط در قفس، یا در صندوقِ عقب که با تور از سرنشین‌ها جدا شده"],
        },
        { label: "چند سگ با قلاده", it: "trattenuti al guinzaglio", values: ["نه", "قلاده جای قفس یا تور را نمی‌گیرد"] },
      ],
      takeaway: "یکی: آزاد، اگر مزاحم نیست. بیشتر: قفس یا تور. قلاده کافی نیست.",
      rule: `${CDS_169} c.6`,
    },
    {
      kind: "table",
      title: "روی موتورسیکلت",
      body: "موتورسیکلت تعادلش را از راننده می‌گیرد؛ هر چیزی که این تعادل یا دید را به هم بزند، ممنوع است:",
      columns: ["ممنوع", "دامِ بانک"],
      rows: [
        { label: "ترک‌نشینِ زیرِ ۵ سال", it: "minori di anni 5", values: ["بردنِ بچه‌ی زیرِ ۵ سال", "«ترک‌نشین باید بزرگسال باشد» غلط است؛ قاعده فقط ۵ سال است"] },
        {
          label: "یدک",
          it: "trainare e farsi trainare",
          values: ["موتورسیکلت نه چیزی را یدک می‌کشد، نه یدک کشیده می‌شود", "«فقط با سواری می‌شود یدکش کشید» غلط است"],
        },
        {
          label: "بار",
          it: "oggetti non solidamente assicurati",
          values: [
            "باری که محکم بسته نشده، جلوی دید را می‌گیرد، یا بیش از ۵۰ سانتی‌متر از کنار یا جلو و عقب بیرون می‌زند",
            "«هر بیرون‌زدگیِ طولی ممنوع است» غلط است؛ تا ۵۰ سانتی‌متر مجاز است",
          ],
        },
      ],
      takeaway: "موتورسیکلت: بچه از ۵ سال، بی‌یدک، بارِ محکم که نه دید را بگیرد نه بیش از ۵۰ سانتی‌متر بیرون بزند.",
      rule: `${CDS_170} c.1-bis, c.4–5`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la carta di circolazione", fa: "کارتِ خودرو (سندِ ثبتِ خودرو)" },
        { it: "il numero dei posti", fa: "تعدادِ صندلی‌ها" },
        { it: "compreso il conducente", fa: "با احتسابِ راننده" },
        { it: "l'animale domestico", fa: "حیوانِ خانگی" },
        { it: "la gabbia", fa: "قفس" },
        { it: "il vano posteriore diviso da rete", fa: "صندوقِ عقب که با تور جدا شده" },
        { it: "il guinzaglio", fa: "قلاده" },
        { it: "i minori di anni 5", fa: "بچه‌های زیرِ ۵ سال" },
        { it: "solidamente assicurati", fa: "محکم بسته‌شده" },
      ],
    },
    {
      kind: "trap",
      title: "راننده جزوِ عدد هست یا نه",
      body: "هر دو جمله درباره‌ی عددی است که در کارتِ خودرو نوشته شده:",
      examples: [
        {
          sourceId: "5727",
          textIt: "Il numero di persone trasportabili sui veicoli è indicato sulla carta di circolazione",
          answer: 1,
          chunks: [
            { it: "Il numero di persone trasportabili sui veicoli", fa: "تعدادِ آدم‌هایی که می‌شود با وسیله‌ها برد" },
            { it: "è indicato sulla carta di circolazione", fa: "در کارتِ خودرو نوشته شده", verb: "è indicato ← indicare" },
          ],
          translation: "تعدادِ آدم‌هایی که می‌شود با وسیله‌ها برد، در کارتِ خودرو نوشته شده است.",
          why: "درست است. برای هر وسیله، عددِ خودش در کارتِ خودرو است.",
        },
        {
          sourceId: "5734",
          textIt: "Il numero di persone trasportabili su un veicolo, riportato sulla carta di circolazione, non comprende il conducente",
          answer: 0,
          chunks: [
            { it: "Il numero di persone trasportabili su un veicolo,", fa: "تعدادِ آدم‌هایی که می‌شود با یک وسیله برد،" },
            { it: "riportato sulla carta di circolazione,", fa: "که در کارتِ خودرو آمده،", verb: "riportato ← riportare" },
            { it: "non comprende il conducente", fa: "راننده را نمی‌شمارد", verb: "comprende ← comprendere", focus: "negation" },
          ],
          translation: "تعدادِ آدم‌هایی که می‌شود با یک وسیله برد و در کارتِ خودرو آمده، راننده را نمی‌شمارد.",
          why: "غلط است. راننده هم یک صندلی است و جزوِ همین عدد شمرده می‌شود.",
        },
      ],
      takeaway: "«compreso il conducente» = درست. «non comprende il conducente» = غلط.",
      rule: `${CDS_169} c.2; Codice della Strada, art. 54 c.1 lett. a`,
    },
  ],
  practice: [
    {
      sourceId: "5729",
      textIt: "Il numero di persone trasportabili sulle autovetture può essere al massimo di nove, compreso il conducente",
      answer: 1,
      chunks: [
        { it: "Il numero di persone trasportabili sulle autovetture", fa: "تعدادِ آدم‌هایی که می‌شود با سواری برد" },
        { it: "può essere al massimo di nove,", fa: "حداکثر می‌تواند نه باشد،", verb: "può ← potere", focus: "limit" },
        { it: "compreso il conducente", fa: "با احتسابِ راننده" },
      ],
      translation: "تعدادِ آدم‌هایی که می‌شود با سواری برد، با احتسابِ راننده، حداکثر می‌تواند نه باشد.",
      why: "درست است (قدم ۱). سواری حداکثر ۹ صندلی دارد و راننده هم یکی از آن‌هاست.",
      rule: "Codice della Strada, art. 54 c.1 lett. a",
      conceptStep: 1,
    },
    {
      sourceId: "5589",
      textIt: "Il numero delle persone trasportabili sulle autovetture indicato sulla carta di circolazione non comprende il conducente",
      answer: 0,
      chunks: [
        { it: "Il numero delle persone trasportabili sulle autovetture", fa: "تعدادِ آدم‌هایی که می‌شود با سواری برد" },
        { it: "indicato sulla carta di circolazione", fa: "که در کارتِ خودرو نوشته شده" },
        { it: "non comprende il conducente", fa: "راننده را نمی‌شمارد", verb: "comprende ← comprendere", focus: "negation" },
      ],
      translation: "تعدادِ آدم‌هایی که می‌شود با سواری برد و در کارتِ خودرو نوشته شده، راننده را نمی‌شمارد.",
      why: "غلط است (قدم ۱). عددِ کارتِ خودرو صندلیِ راننده را هم می‌شمارد.",
      rule: `${CDS_169} c.2; Codice della Strada, art. 54 c.1 lett. a`,
      conceptStep: 1,
    },
    {
      sourceId: "5588",
      textIt:
        "Sui veicoli è consentito il trasporto di animali domestici anche in numero superiore ad uno, purché custoditi in gabbia o nel vano posteriore, appositamente diviso da rete",
      answer: 1,
      chunks: [
        { it: "Sui veicoli è consentito il trasporto di animali domestici", fa: "بردنِ حیوان‌های خانگی با وسیله‌ها مجاز است", verb: "è consentito ← consentire" },
        { it: "anche in numero superiore ad uno,", fa: "حتی بیشتر از یکی،" },
        { it: "purché custoditi in gabbia", fa: "به شرطی که در قفس باشند", focus: "condition" },
        { it: "o nel vano posteriore, appositamente diviso da rete", fa: "یا در صندوقِ عقب که مخصوصاً با تور جدا شده" },
      ],
      translation: "بردنِ حیوان‌های خانگی با وسیله‌ها، حتی بیشتر از یکی، مجاز است، به شرطی که در قفس یا در صندوقِ عقبی باشند که مخصوصاً با تور جدا شده.",
      why: "درست است (قدم ۲). بیشتر از یک حیوان فقط با جای جدا: قفس یا تور.",
      rule: `${CDS_169} c.6`,
      conceptStep: 2,
    },
    {
      sourceId: "5591",
      textIt: "Sui veicoli è consentito il trasporto di cani anche in numero superiore ad uno, purché adeguatamente trattenuti al guinzaglio",
      answer: 0,
      chunks: [
        { it: "Sui veicoli è consentito il trasporto di cani", fa: "بردنِ سگ‌ها با وسیله‌ها مجاز است", verb: "è consentito ← consentire" },
        { it: "anche in numero superiore ad uno,", fa: "حتی بیشتر از یکی،" },
        { it: "purché adeguatamente trattenuti al guinzaglio", fa: "به شرطی که با قلاده درست نگه داشته شوند", focus: "condition" },
      ],
      translation: "بردنِ سگ‌ها با وسیله‌ها، حتی بیشتر از یکی، مجاز است، به شرطی که با قلاده درست نگه داشته شوند.",
      why: "غلط است (قدم ۲). برای بیشتر از یک حیوان، قانون قفس یا صندوقِ جداشده با تور می‌خواهد؛ قلاده کافی نیست.",
      rule: `${CDS_169} c.6`,
      conceptStep: 2,
    },
    {
      sourceId: "5592",
      textIt: "Sui motocicli è vietato il trasporto di minori di anni 5",
      answer: 1,
      chunks: [
        { it: "Sui motocicli è vietato il trasporto", fa: "روی موتورسیکلت بردنِ … ممنوع است", verb: "è vietato ← vietare", focus: "negation" },
        { it: "di minori di anni 5", fa: "بچه‌های زیرِ ۵ سال", focus: "limit" },
      ],
      translation: "بردنِ بچه‌های زیرِ ۵ سال روی موتورسیکلت ممنوع است.",
      why: "درست است (قدم ۳). بچه‌ی کوچک نمی‌تواند خودش را نگه دارد. قاعده‌ی سن فقط همین ۵ سال است.",
      rule: `${CDS_170} c.1-bis`,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["5585", "5586", "5589", "5590", "5727", "5728", "5729", "5730", "5731", "5732", "5733", "5734"] },
    { step: 2, sourceIds: ["5587", "5588", "5591"] },
    { step: 3, sourceIds: ["5592", "5593", "5594", "5595", "5596", "5597", "5598"] },
  ],
};

// ── Lesson 7 ──────────────────────────────────────────────────────────────────

export const lessonCarico: Lesson = {
  id: "carico-sistemazione-sporgenza",
  titleFa: "بار: چیدن، بیرون‌زدگی، پشتِ بارِ لق",
  titleIt: "SISTEMAZIONE E SPORGENZA DEL CARICO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی بار را چطور می‌چینی، چقدر می‌تواند بیرون بزند (جلو هیچ، عقب تا ۳/۱۰ طول، کنار تا ۳۰ سانتی‌متر از چراغ‌ها) و وقتی پشتِ وسیله‌ای با بارِ لق هستی چه می‌کنی.",
      why:
        "۲۲ سؤال. دو دامِ پرتکرار: قاعده‌ای که فقط «گاهی» اجرا می‌شود (فقط شب، فقط بیرونِ شهر) و جابه‌جا کردنِ ۳/۱۰ طول با ۳/۱۰ عرض.",
      rule: `${CDS_164} c.1–6`,
    },
    {
      kind: "table",
      title: "بار را چطور بچینی: همیشه، همه‌جا",
      body: "قانون چهار چیز از چیدنِ بار می‌خواهد. هیچ‌کدام به ساعت یا نوعِ جاده بستگی ندارد:",
      columns: ["بار باید", "دامِ بانک"],
      rows: [
        { label: "نیفتد", it: "evitarne la caduta o la dispersione", values: ["نه بیفتد، نه پخش شود", "«فقط در جاده‌ی برون‌شهری» غلط است"] },
        { label: "دید و دست", it: "non diminuire la visibilità", values: ["جلوی دید و حرکتِ آزادِ راننده را نگیرد", ""] },
        { label: "تعادل", it: "non compromettere la stabilità", values: ["تعادلِ وسیله را به هم نزند", ""] },
        {
          label: "چراغ و پلاک",
          it: "non mascherare dispositivi di illuminazione",
          values: ["چراغ‌ها، علامت‌دهنده‌ها، پلاک و علامتِ دستِ راننده را نپوشاند", "«فقط شب» غلط است؛ چراغ ترمز و راهنما روز هم کار می‌کنند"],
        },
      ],
      takeaway: "چیدنِ بار شرطِ زمانی و مکانی ندارد: نیفتد، دید را نگیرد، تعادل را نگه دارد، چیزی را نپوشاند.",
      rule: `${CDS_164} c.1`,
    },
    {
      kind: "table",
      title: "چقدر بیرون بزند",
      body:
        "بار باید داخلِ حدِ ابعادِ وسیله (sagoma) بماند. بیرون‌زدگی فقط در دو جهت و با حدِ مشخص مجاز است، و همیشه با احتیاطی که خطری برای دیگران نسازد:",
      columns: ["حد"],
      rows: [
        { label: "جلو", it: "dalla parte anteriore", values: ["هیچ. بار از جلو بیرون نمی‌زند"] },
        { label: "عقب", it: "fino ai 3/10 della lunghezza", values: ["تا ۳/۱۰ طولِ وسیله، فقط برای بارِ تقسیم‌ناپذیر (مثلاً یک تیرآهن)، با پنلِ ۳۰۲ (درسِ ۸)"] },
        {
          label: "کنار",
          it: "non più di 30 cm dalle luci di posizione",
          values: ["تا ۳۰ سانتی‌متر از چراغ‌های موقعیتِ جلو و عقب، و همچنان در حدِ عرضِ مجاز. «۳/۱۰ عرض» غلط است؛ ۳/۱۰ فقط مالِ طول است"],
        },
        { label: "روی زمین", it: "cose che strisciano sul terreno", values: ["ممنوع، حتی اگر بخشی از آن روی چرخ باشد"] },
      ],
      takeaway: "جلو: ۰. عقب: ۳/۱۰ طول. کنار: ۳۰ سانتی‌متر از چراغ‌ها. کشیدنِ چیزی روی زمین: هرگز.",
      rule: `${CDS_164} c.2–5`,
    },
    {
      kind: "classify",
      title: "مجاز است یا نه؟",
      body: "هر بار را بخوان و بگو با این اندازه می‌شود حرکت کرد یا نه. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "consentito", fa: "مجاز" },
        { it: "vietato", fa: "ممنوع" },
      ],
      items: [
        { prompt: "کامیونِ ۸ متری؛ یک تیرآهن ۲ متر از عقب بیرون زده (۳/۱۰ = ۲٫۴ متر)، با پنلِ ۳۰۲", answer: 0, explain: "کمتر از ۳/۱۰ طول، تقسیم‌ناپذیر، با پنل: مجاز." },
        { prompt: "وانت؛ نردبان ۳۰ سانتی‌متر از جلو بیرون زده", answer: 1, explain: "از جلو هیچ بیرون‌زدگی‌ای مجاز نیست." },
        { prompt: "ده کیسه‌ی سیمان که ۱ متر از عقب بیرون زده‌اند", answer: 1, explain: "تقسیم‌پذیر است: می‌شود جورِ دیگری چیدشان. استثنای ۳/۱۰ فقط برای بارِ تقسیم‌ناپذیر است." },
        { prompt: "یک صفحه که ۲۰ سانتی‌متر از چراغ‌های موقعیتِ کنار بیرون است، داخلِ عرضِ مجاز", answer: 0, explain: "کمتر از ۳۰ سانتی‌متر از چراغ‌ها: مجاز." },
        { prompt: "یک لوله‌ی بلند که سرش روی آسفالت کشیده می‌شود", answer: 1, explain: "چیزی که روی زمین کشیده شود، هیچ‌وقت مجاز نیست." },
      ],
      takeaway: "قبل از عدد بپرس: کدام جهت؟ جلو هیچ، عقب ۳/۱۰ طول و فقط تقسیم‌ناپذیر، کنار ۳۰ سانتی‌متر.",
    },
    {
      kind: "table",
      title: "پشتِ وسیله‌ای با بارِ لق",
      body:
        "حالا جای تو عوض شده: بارِ ناپایدار جلوی توست. در فصلِ ۱۲ دیدی که فاصله را بیشتر می‌کنی. بانک بقیه‌ی رفتارها را هم می‌پرسد:",
      columns: ["چه کنی", "دامِ بانک"],
      rows: [
        {
          label: "فاصله",
          it: "non stargli troppo vicino",
          values: ["نزدیک نشو تا اگر بار افتاد به‌موقع بایستی", "«ناگهان ترمز کن و صبر کن همه رد شوند» غلط است"],
        },
        {
          label: "حواس",
          it: "quando frena o svolta",
          values: ["مخصوصاً وقتی ترمز می‌کند یا می‌پیچد، بار ممکن است بیفتد. بارِ آویزان ممکن است راهنمای او را پنهان کند", ""],
        },
        { label: "خبر", it: "avvertire il conducente", values: ["اگر بار در حالِ افتادن است، راننده را باخبر کن", ""] },
        {
          label: "جا",
          it: "margine sinistro · sorpassarlo subito, anche se in curva",
          values: ["در خطِ خودت بمان؛ وقتی امن شد سبقت بگیر", "«به لبه‌ی چپ بچسب» و «فوراً سبقت بگیر، حتی در پیچ» غلط‌اند"],
        },
      ],
      takeaway: "پشتِ بارِ لق: دور، هوشیار، و اگر لازم شد خبر بده. سبقت فقط وقتی امن است.",
      rule: "Codice della Strada, artt. 141, 148 c.2, 149 c.1 (prudenza; dettagli dal programma ministeriale)",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la sistemazione del carico", fa: "چیدنِ بار" },
        { it: "la sagoma", fa: "حدِ ابعادِ وسیله" },
        { it: "sporgere longitudinalmente · lateralmente", fa: "از جلو و عقب · از کنار بیرون زدن", base: "sporgere" },
        { it: "le cose indivisibili", fa: "بارِ تقسیم‌ناپذیر (یک‌تکه)" },
        { it: "i 3/10 della lunghezza", fa: "سه‌دهمِ طول" },
        { it: "strisciare sul terreno", fa: "روی زمین کشیده شدن" },
        { it: "mascherare", fa: "پوشاندن، پنهان کردن" },
        { it: "il carico instabile", fa: "بارِ ناپایدار" },
      ],
    },
    {
      kind: "trap",
      title: "۳/۱۰ از کدام طرف؟",
      body: "هر دو جمله «۳/۱۰» دارند. یکی طول را می‌گوید، یکی عرض را:",
      examples: [
        {
          sourceId: "5607",
          textIt: "Il carico può sporgere longitudinalmente dalla parte posteriore, se costituito da cose indivisibili, fino ai 3/10 della lunghezza dell'autoveicolo",
          answer: 1,
          chunks: [
            { it: "Il carico può sporgere longitudinalmente dalla parte posteriore,", fa: "بار می‌تواند از عقب بیرون بزند،", verb: "può ← potere" },
            { it: "se costituito da cose indivisibili,", fa: "اگر تقسیم‌ناپذیر باشد،", focus: "condition" },
            { it: "fino ai 3/10 della lunghezza dell'autoveicolo", fa: "تا سه‌دهمِ طولِ خودرو", focus: "limit" },
          ],
          translation: "بار، اگر تقسیم‌ناپذیر باشد، می‌تواند از عقب تا سه‌دهمِ طولِ خودرو بیرون بزند.",
          why: "درست است. ۳/۱۰ مالِ طول است، فقط از عقب، فقط برای بارِ یک‌تکه.",
        },
        {
          sourceId: "5612",
          textIt: "Il carico può sporgere lateralmente, se costituito da cose indivisibili, fino ai 3/10 della larghezza del veicolo",
          answer: 0,
          chunks: [
            { it: "Il carico può sporgere lateralmente,", fa: "بار می‌تواند از کنار بیرون بزند،", verb: "può ← potere", focus: "contrast" },
            { it: "se costituito da cose indivisibili,", fa: "اگر تقسیم‌ناپذیر باشد،", focus: "condition" },
            { it: "fino ai 3/10 della larghezza del veicolo", fa: "تا سه‌دهمِ عرضِ وسیله", focus: "limit" },
          ],
          translation: "بار، اگر تقسیم‌ناپذیر باشد، می‌تواند از کنار تا سه‌دهمِ عرضِ وسیله بیرون بزند.",
          why: "غلط است. حدِ کنار ۳۰ سانتی‌متر از چراغ‌های موقعیت است؛ ۳/۱۰ فقط برای طول است.",
        },
      ],
      takeaway: "«longitudinalmente … 3/10 della lunghezza» درست. «lateralmente … 3/10 della larghezza» غلط.",
      rule: `${CDS_164} c.2–3`,
    },
  ],
  practice: [
    {
      sourceId: "5604",
      textIt: "Il carico dei veicoli deve essere sistemato in modo da non mascherare dispositivi di illuminazione e di segnalazione visiva soltanto durante la circolazione notturna",
      answer: 0,
      chunks: [
        { it: IL_CARICO, fa: IL_CARICO_FA, verb: "deve ← dovere" },
        { it: "non mascherare dispositivi di illuminazione e di segnalazione visiva", fa: "چراغ‌ها و علامت‌دهنده‌های نوری را نپوشاند", focus: "negation" },
        { it: "soltanto durante la circolazione notturna", fa: "فقط هنگامِ رانندگیِ شبانه", focus: "limit" },
      ],
      translation: "بارِ وسیله‌ها باید طوری چیده شود که فقط هنگامِ رانندگیِ شبانه چراغ‌ها و علامت‌دهنده‌های نوری را نپوشاند.",
      why: "غلط است (قدم ۱). قاعده همیشگی است: چراغِ ترمز و راهنما روز هم باید دیده شوند.",
      rule: `${CDS_164} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "5606",
      textIt: "Sugli autoveicoli, il carico non può sporgere longitudinalmente dalla parte anteriore",
      answer: 1,
      chunks: [
        { it: "Sugli autoveicoli,", fa: "روی خودروها،" },
        { it: "il carico non può sporgere longitudinalmente", fa: "بار نمی‌تواند در طول بیرون بزند", verb: "può ← potere", focus: "negation" },
        { it: "dalla parte anteriore", fa: "از جلو" },
      ],
      translation: "روی خودروها، بار نمی‌تواند از جلو بیرون بزند.",
      why: "درست است (قدم ۲). از جلو هیچ بیرون‌زدگی‌ای مجاز نیست (قانون این را برای همه‌ی وسیله‌ها می‌گوید).",
      rule: `${CDS_164} c.2`,
      conceptStep: 2,
    },
    {
      sourceId: "5613",
      textIt: "E' consentito trasportare o trainare cose che strisciano sul terreno se in parte sostenute da ruote",
      answer: 0,
      chunks: [
        { it: "E' consentito trasportare o trainare", fa: "بردن یا کشیدنِ … مجاز است", verb: "è consentito ← consentire" },
        { it: "cose che strisciano sul terreno", fa: "چیزهایی که روی زمین کشیده می‌شوند", verb: "strisciano ← strisciare" },
        { it: "se in parte sostenute da ruote", fa: "اگر بخشی از آن‌ها روی چرخ باشد", focus: "condition" },
      ],
      translation: "بردن یا کشیدنِ چیزهایی که روی زمین کشیده می‌شوند مجاز است، اگر بخشی از آن‌ها روی چرخ باشد.",
      why: "غلط است (قدم ۲). قانون صریح می‌گوید: ممنوع، «حتی اگر» بخشی روی چرخ باشد.",
      rule: `${CDS_164} c.5`,
      conceptStep: 2,
    },
    {
      sourceId: "5698",
      textIt: "Circolando dietro ad un veicolo che ha un carico sporgente, può risultare difficile accorgersi che intende svoltare, se gli indicatori di direzione sono nascosti dalla merce penzolante",
      answer: 1,
      chunks: [
        { it: CIRCOLANDO, fa: CIRCOLANDO_FA, verb: "circolando ← circolare" },
        { it: "che ha un carico sporgente,", fa: "که بارِ بیرون‌زده دارد،" },
        { it: "può risultare difficile accorgersi che intende svoltare,", fa: "ممکن است سخت بفهمی که می‌خواهد بپیچد،", verb: "intende ← intendere" },
        { it: "se gli indicatori di direzione sono nascosti dalla merce penzolante", fa: "اگر بارِ آویزان راهنماهایش را پوشانده باشد", focus: "condition" },
      ],
      translation: "وقتی پشتِ وسیله‌ای با بارِ بیرون‌زده حرکت می‌کنی، اگر بارِ آویزان راهنماهایش را پوشانده باشد، ممکن است سخت بفهمی که می‌خواهد بپیچد.",
      why: "درست است (قدم ۴). برای همین است که بار نباید چراغ‌ها را بپوشاند، و تو پشتِ چنین باری بیشتر حواست را جمع می‌کنی.",
      rule: `${CDS_164} c.1; Codice della Strada, art. 141`,
      conceptStep: 4,
    },
    {
      sourceId: "5701",
      textIt: "Circolando dietro ad un veicolo che trasporta un carico che sta per cadere, conviene sorpassarlo subito, anche se in curva",
      answer: 0,
      chunks: [
        { it: CIRCOLANDO, fa: CIRCOLANDO_FA, verb: "circolando ← circolare" },
        { it: "che trasporta un carico che sta per cadere,", fa: "که باری در حالِ افتادن می‌برد،", verb: "sta per cadere ← cadere" },
        { it: "conviene sorpassarlo subito,", fa: "بهتر است فوراً از آن سبقت بگیری،", verb: "conviene ← convenire" },
        { it: "anche se in curva", fa: "حتی در پیچ", focus: "contrast" },
      ],
      translation: "وقتی پشتِ وسیله‌ای حرکت می‌کنی که باری در حالِ افتادن می‌برد، بهتر است فوراً از آن سبقت بگیری، حتی در پیچ.",
      why: "غلط است (قدم ۴). بارِ لق سبقت در پیچ را مجاز نمی‌کند؛ فاصله بگیر و وقتی امن شد سبقت بگیر.",
      rule: "Codice della Strada, art. 148 c.2, c.10",
      conceptStep: 4,
    },
  ],
  related: [
    { step: 1, sourceIds: ["5599", "5600", "5601", "5602", "5603", "5604"] },
    { step: 2, sourceIds: ["5605", "5606", "5607", "5608", "5609", "5610", "5612", "5613"] },
    {
      step: 4,
      // behind an unstable load; 5693, 5694, 5703 (keep your distance) stay with chapter 12's `distanza-casi-particolari`
      sourceIds: ["5695", "5696", "5697", "5698", "5699", "5700", "5701", "5702"],
    },
  ],
};

// ── Lesson 8 ──────────────────────────────────────────────────────────────────

export const lessonPannelli: Lesson = {
  id: "pannelli-posteriori",
  titleFa: "پنل‌های پشتِ وسیله: بار، کالای خطرناک، وسیله‌ی سنگین",
  titleIt: "PANNELLI · CARICHI SPORGENTI, MERCI PERICOLOSE",
  minutes: 5,
  signs: [302, 303, 279],
  figures: [304, 305],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس چهار پنلِ پشتِ وسیله‌ها را از هم جدا می‌کنی: سفید و قرمزِ مربعی (بارِ بیرون‌زده)، نارنجی با عدد (کالای خطرناک)، راه‌راهِ زرد و قرمز (کامیونِ بالای ۳٫۵ تن) و زردِ حاشیه‌قرمز (یدک و نیم‌یدک)؛ و همه‌ی قاعده‌های پنلِ بار را می‌دانی.",
      why:
        "۲۸ سؤال، بیشترشان با تصویر. بانک یک جمله را با تصویرهای مختلف تکرار می‌کند؛ پس اول تصویر را بشناس، بعد جمله را بخوان.",
      rule: `${CDS_164} c.6; ${REG_361}`,
    },
    {
      kind: "table",
      title: "چهار پنل، چهار معنی",
      body:
        "هر چهار پنل بازتابنده‌اند و پشتِ وسیله می‌آیند، ولی هر کدام یک چیزِ متفاوت می‌گوید. هیچ‌کدام روی جاده گذاشته نمی‌شود؛ برای مانعِ روی جاده مثلثِ خطر داری (درسِ ۲). تصویرِ ۲۷۹ (مربعِ سفید و قرمز با دایره‌ی آبی) پنلِ بار نیست؛ تابلوی «عبورِ اجباری» پشتِ ماشین‌های کارِ جاده است (فصلِ ۹).",
      columns: ["302", "303", "304", "305"],
      figures: [302, 303, 304, 305],
      rows: [
        {
          label: "شکل",
          values: ["مربع، راه‌راهِ مورّبِ سفید و قرمز", "مستطیلِ نارنجی، دو عدد", "مستطیلِ راه‌راهِ زرد و قرمز", "مستطیلِ زرد با حاشیه‌ی قرمز"],
        },
        {
          label: "یعنی",
          values: [
            "بارِ تقسیم‌ناپذیر از عقب بیرون زده",
            "این وسیله کالای خطرناک می‌برد",
            "کامیونِ باریِ بالای ۳٫۵ تن را از پشت مشخص می‌کند",
            "پشتِ یدک یا نیم‌یدک: کامیون با یدک یا تریلی",
          ],
        },
        {
          label: "نه",
          values: [
            "نه برای همه‌ی کامیون‌ها، نه برای زباله یا مصالح",
            "نه برای «بارِ بیرون‌زده‌ی خطرناک»",
            "نه برای بارِ بیرون‌زده؛ نه روی جاده",
            "نه پشتِ اتوبوس",
          ],
        },
      ],
      takeaway: "مربعِ سفید‌قرمز = بارِ بیرون‌زده. نارنجی = خطرناک. راه‌راهِ زرد‌قرمز = کامیونِ سنگین. زردِ حاشیه‌قرمز = یدک.",
      rule: `${REG_361}; Codice della Strada, art. 168 (ADR); ${DM_40}`,
    },
    {
      kind: "factors",
      title: "قاعده‌های پنلِ بار (۳۰۲)",
      body: "همه‌ی این جمله‌ها درباره‌ی همین تصویرند. ستونِ اول قاعده‌هایی است که بانک درست می‌داند، ستونِ دوم ساختگی‌ها:",
      sign: CARICO_SPORGENTE,
      columns: [
        {
          title: "درست (VERO)",
          items: [
            { fa: "سرِ بارِ بیرون‌زده نصب می‌شود", it: "all'estremità del carico che sporge dietro", sourceId: "5735", textIt: "Il pannello raffigurato deve essere messo all'estremità del carico che sporge dietro al veicolo", answer: 1 },
            { fa: "بازتابنده است", it: "deve essere retroriflettente", sourceId: "5737", textIt: "Il pannello raffigurato deve essere retroriflettente", answer: 1 },
            { fa: "وقتی بار سراسرِ عرض را گرفته، دو تا، دو سرِ آن", it: "devono essere due, posti trasversalmente", sourceId: "5617", textIt: "Se il carico sporge longitudinalmente per l'intera larghezza della parte posteriore del veicolo, i pannelli in figura devono essere due, posti trasversalmente alle due estremità del carico", answer: 1 },
            { fa: "روی خودروی خرابِ یدک‌شده، وقتی چراغِ خطرش کار نمی‌کند", it: "sui veicoli guasti, quando vengono trainati", sourceId: "5739", textIt: "Il pannello raffigurato può essere messo sui veicoli guasti, quando vengono trainati e non funzionano le luci di emergenza", answer: 1 },
            { fa: "به راننده‌ی پشتی می‌گوید محتاط باشد", it: "a circolare con particolare prudenza", sourceId: "5741", textIt: "Il pannello raffigurato invita i conducenti che stanno dietro al veicolo su cui è applicato, a circolare con particolare prudenza", answer: 1 },
          ],
        },
        {
          title: "غلط (FALSO)",
          items: [
            { fa: "فقط وقتی بیش از ۳/۱۰ بیرون است", it: "solo se il carico sporge di oltre tre decimi", sourceId: "5742", textIt: "Il pannello raffigurato si usa solo se il carico sporge di oltre tre decimi della lunghezza del veicolo", answer: 0 },
            { fa: "کنارِ وسیله هم، برای بارِ عریض", it: "anche di lato", sourceId: "5743", textIt: "Il pannello raffigurato va messo anche di lato, quando il carico sporge oltre la larghezza del veicolo", answer: 0 },
            { fa: "روی ماشینِ زباله", it: "sui veicoli che trasportano la spazzatura", sourceId: "5745", textIt: "Il pannello raffigurato va messo sui veicoli che trasportano la spazzatura", answer: 0 },
            { fa: "پشتِ همه‌ی کامیون‌ها", it: "dietro a tutti gli autocarri", sourceId: "5747", textIt: "Il pannello raffigurato va messo dietro a tutti gli autocarri", answer: 0 },
            { fa: "به‌جایش پرچمِ قرمزِ ۵۰ در ۵۰", it: "sostituito da una bandiera di colore rosso", sourceId: "5748", textIt: "Il pannello raffigurato può essere sostituito da una bandiera di colore rosso, delle dimensioni di 50x50 centimetri", answer: 0 },
          ],
        },
      ],
      takeaway: "پنلِ ۳۰۲: هر بیرون‌زدگیِ عقب، حتی کم؛ یکی یا دو تا؛ سرِ بار؛ بازتابنده؛ جایگزین ندارد.",
      rule: `${CDS_164} c.6; ${REG_361}; Codice della Strada, art. 165 c.2`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il pannello retroriflettente", fa: "پنلِ بازتابنده" },
        { it: "i carichi sporgenti", fa: "بارهای بیرون‌زده" },
        { it: "le merci pericolose", fa: "کالاهای خطرناک" },
        { it: "il pannello arancione", fa: "پنلِ نارنجی" },
        { it: "l'autoarticolato", fa: "تریلی (کشنده + نیم‌یدک)" },
        { it: "l'estremità del carico", fa: "سرِ بار" },
        { it: "anche se di poco", fa: "حتی اگر کم" },
        { it: "posti trasversalmente", fa: "عرضی نصب‌شده" },
      ],
    },
    {
      kind: "trap",
      title: "یک جمله، دو تصویر",
      body: "متنِ این دو جمله تقریباً یکی است؛ فقط تصویرشان فرق می‌کند. جواب را تصویر تعیین می‌کند:",
      examples: [
        {
          sourceId: "5614",
          textIt: "La sporgenza longitudinale del carico, fino ai 3/10 della lunghezza del veicolo, deve essere segnalata mediante uno o due pannelli quadrangolari in figura",
          answer: 1,
          sign: 302,
          chunks: [
            { it: "La sporgenza longitudinale del carico,", fa: "بیرون‌زدگیِ طولیِ بار،" },
            { it: "fino ai 3/10 della lunghezza del veicolo,", fa: "تا سه‌دهمِ طولِ وسیله،", focus: "limit" },
            { it: "deve essere segnalata", fa: "باید علامت‌گذاری شود", verb: "deve ← dovere" },
            { it: "mediante uno o due pannelli quadrangolari in figura", fa: "با یک یا دو پنلِ چهارگوشِ تصویر" },
          ],
          translation: "بیرون‌زدگیِ طولیِ بار، تا سه‌دهمِ طولِ وسیله، باید با یک یا دو پنلِ چهارگوشِ تصویر علامت‌گذاری شود.",
          why: "درست است. تصویر پنلِ مربعیِ سفید و قرمز (۳۰۲) است: پنلِ بارِ بیرون‌زده.",
        },
        {
          sourceId: "5618",
          textIt: "La sporgenza longitudinale del carico, fino ai 3/10 della lunghezza del veicolo, deve essere segnalata mediante uno o due pannelli in figura",
          answer: 0,
          figure: 304,
          chunks: [
            { it: "La sporgenza longitudinale del carico,", fa: "بیرون‌زدگیِ طولیِ بار،" },
            { it: "fino ai 3/10 della lunghezza del veicolo,", fa: "تا سه‌دهمِ طولِ وسیله،", focus: "limit" },
            { it: "deve essere segnalata", fa: "باید علامت‌گذاری شود", verb: "deve ← dovere" },
            { it: "mediante uno o due pannelli in figura", fa: "با یک یا دو پنلِ تصویر", focus: "contrast" },
          ],
          translation: "بیرون‌زدگیِ طولیِ بار، تا سه‌دهمِ طولِ وسیله، باید با یک یا دو پنلِ تصویر علامت‌گذاری شود.",
          why: "غلط است. تصویر پنلِ راه‌راهِ زرد و قرمز (۳۰۴) است: پنلِ کامیونِ سنگین، نه پنلِ بار.",
        },
      ],
      takeaway: "در سؤال‌های پنل، اول تصویر را نام ببر، بعد جمله را بخوان. متنِ درست با تصویرِ غلط، غلط است.",
      rule: `${REG_361}; ${DM_40}`,
    },
  ],
  practice: [
    {
      sourceId: "5621",
      textIt: "Il pannello arancione retroriflettente in figura segnala veicoli che stanno trasportando merci pericolose",
      answer: 1,
      sign: 303,
      chunks: [
        { it: "Il pannello arancione retroriflettente in figura", fa: "پنلِ نارنجیِ بازتابنده‌ی تصویر" },
        { it: "segnala veicoli", fa: "وسیله‌هایی را نشان می‌دهد", verb: "segnala ← segnalare" },
        { it: "che stanno trasportando merci pericolose", fa: "که کالای خطرناک می‌برند", verb: "stanno trasportando ← trasportare" },
      ],
      translation: "پنلِ نارنجیِ بازتابنده‌ی تصویر، وسیله‌هایی را نشان می‌دهد که کالای خطرناک می‌برند.",
      why: "درست است (قدم ۱). پنلِ نارنجی با دو عدد (نوعِ خطر و نوعِ مادّه) مالِ کالای خطرناک است.",
      rule: "Codice della Strada, art. 168 (ADR)",
      conceptStep: 1,
    },
    {
      sourceId: "5622",
      textIt: "Il pannello in figura facilita l'individuazione dalla parte posteriore di autocarri con massa a pieno carico superiore a 3,5 tonnellate",
      answer: 1,
      figure: 304,
      chunks: [
        { it: "Il pannello in figura facilita l'individuazione", fa: "پنلِ تصویر تشخیص را آسان می‌کند", verb: "facilita ← facilitare" },
        { it: "dalla parte posteriore", fa: "از پشت" },
        { it: "di autocarri con massa a pieno carico superiore a 3,5 tonnellate", fa: "کامیون‌هایی که جرمِ کلشان بیش از ۳٫۵ تن است", focus: "limit" },
      ],
      translation: "پنلِ تصویر، تشخیصِ کامیون‌هایی را که جرمِ کلِ آن‌ها بیش از ۳٫۵ تن است از پشت آسان می‌کند.",
      why: "درست است (قدم ۱). راه‌راهِ زرد و قرمز (۳۰۴) پشتِ کامیون‌های سنگین است.",
      rule: DM_40,
      conceptStep: 1,
    },
    {
      sourceId: "5626",
      textIt: "Il pannello in figura deve essere applicato posteriormente agli autobus di massa totale superiore a 3,5 tonnellate",
      answer: 0,
      figure: 305,
      chunks: [
        { it: "Il pannello in figura deve essere applicato posteriormente", fa: "پنلِ تصویر باید پشتِ … نصب شود", verb: "deve ← dovere" },
        { it: "agli autobus di massa totale superiore a 3,5 tonnellate", fa: "اتوبوس‌های با جرمِ کلِ بیش از ۳٫۵ تن", focus: "contrast" },
      ],
      translation: "پنلِ تصویر باید پشتِ اتوبوس‌هایی که جرمِ کلِ آن‌ها بیش از ۳٫۵ تن است نصب شود.",
      why: "غلط است (قدم ۱). زردِ حاشیه‌قرمز (۳۰۵) پشتِ یدک و نیم‌یدک است، نه اتوبوس.",
      rule: DM_40,
      conceptStep: 1,
    },
    {
      sourceId: "5738",
      textIt: "Il pannello raffigurato va usato nel caso in cui il carico sporga dietro al veicolo, anche se di poco",
      answer: 1,
      sign: 302,
      chunks: [
        { it: PANNELLO, fa: PANNELLO_FA },
        { it: "va usato nel caso in cui il carico sporga dietro al veicolo,", fa: "باید وقتی بار از پشتِ وسیله بیرون می‌زند به کار برود،", verb: "va usato ← usare", focus: "condition" },
        { it: "anche se di poco", fa: "حتی اگر کم", focus: "always" },
      ],
      translation: "پنلِ نشان‌داده‌شده باید وقتی بار از پشتِ وسیله بیرون می‌زند به کار برود، حتی اگر کم.",
      why: "درست است (قدم ۲). قانون حدِ پایینی نمی‌گذارد: «در هر حال» پنل لازم است.",
      rule: `${CDS_164} c.6`,
      conceptStep: 2,
    },
    {
      sourceId: "5746",
      textIt: "Il pannello raffigurato va messo sui veicoli, solo se il carico sporge di almeno 50 centimetri",
      answer: 0,
      sign: 302,
      chunks: [
        { it: PANNELLO, fa: PANNELLO_FA },
        { it: "va messo sui veicoli,", fa: "روی وسیله‌ها گذاشته می‌شود،", verb: "va messo ← mettere" },
        { it: "solo se il carico sporge di almeno 50 centimetri", fa: "فقط اگر بار دست‌کم ۵۰ سانتی‌متر بیرون بزند", focus: "limit" },
      ],
      translation: "پنلِ نشان‌داده‌شده فقط وقتی روی وسیله‌ها گذاشته می‌شود که بار دست‌کم ۵۰ سانتی‌متر بیرون بزند.",
      why: "غلط است (قدم ۲). حدِ پایینی در کار نیست؛ ۵۰ سانتی‌متر اندازه‌ی خودِ پنل است، نه شرطِ نصبش.",
      rule: `${CDS_164} c.6; ${REG_361}`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // which panel is which: 302, 303, 304, 305 (and 279, the chapter-9 sign, mistaken for a load panel)
      sourceIds: ["5611", "5618", "5619", "5620", "5621", "5622", "5623", "5624", "5625", "5626"],
    },
    {
      step: 2,
      // the protruding-load panel 302
      sourceIds: ["5614", "5615", "5616", "5617", "5735", "5736", "5737", "5738", "5739", "5740", "5741", "5742", "5743", "5744", "5745", "5746", "5747", "5748"],
    },
  ],
};
