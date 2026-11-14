/**
 * src/content/ch17-autostrada.ts
 * Chapter 17 (Norme varie, autostrade, pannelli), lessons 3–5: the motorway
 * and the main extra-urban road. Who may not use them (CdS art. 175), how you
 * drive on them (art. 176, art. 152 for dipped lights), and when and where you
 * may stop: emergency stops, service areas, lifts, broken-down drivers.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter17.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_175 = "Codice della Strada, art. 175";
const CDS_176 = "Codice della Strada, art. 176";
const CDS_152 = "Codice della Strada, art. 152 c.1";
const REG_372 = "DPR 495/1992 (Regolamento), art. 372 c.4";
const SULLE = "Sulle autostrade e strade extraurbane principali";
const SULLE_FA = "در آزادراه‌ها و جاده‌های برون‌شهری اصلی";
const SULLE_CARR = "Sulle carreggiate, sulle rampe e sugli svincoli";
const SULLE_CARR_FA = "روی سواره‌روها، رمپ‌ها و خروجی‌ها";
const VIETATA = "è vietata la circolazione";
const VIETATA_FA = "رفت‌وآمدِ این‌ها ممنوع است:";

// ── Lesson 3 ──────────────────────────────────────────────────────────────────

export const lessonAutostradaAccesso: Lesson = {
  id: "autostrada-chi-entra",
  titleFa: "چه کسی وارد آزادراه نمی‌شود",
  titleIt: "AUTOSTRADE · DIVIETI DI CIRCOLAZIONE",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی کدام وسیله‌ها، و چه کسانی، حق ندارند وارد آزادراه و جاده‌ی برون‌شهری اصلی شوند، و فهرست را با یک قاعده به خاطر می‌سپاری: هر چیزی که نتواند پا‌به‌پای ترافیکِ سریع برود، یا چیزی از آن روی جاده بریزد.",
      why:
        "۱۷ سؤال. دامِ بانک دو جور است: وسیله‌ای را که ممنوع نیست ممنوع می‌کند (اتوبوسِ مدرسه، کامیونِ حیوانِ زنده)، یا برای ممنوع‌ها استثنای ساختگی می‌سازد (موتور گازیِ سریع، تراکتورِ بی‌یدک).",
      rule: `${CDS_175} c.2`,
    },
    {
      kind: "table",
      title: "این وسیله‌ها وارد نمی‌شوند",
      body:
        "آزادراه (autostrada) و جاده‌ی برون‌شهری اصلی (strada extraurbana principale) برای ترافیکِ سریع و یکنواخت ساخته شده‌اند. قانون دو گروه را بیرون نگه می‌دارد: وسیله‌های کُند، و وسیله‌هایی که خودشان یا بارشان خطر می‌سازند.",
      columns: ["ممنوع", "دامِ بانک"],
      rows: [
        {
          label: "کُندها",
          it: "velocipedi · ciclomotori · motocicli < 150 cm³",
          values: [
            "دوچرخه، موتور گازی (هر قدر هم سریع) و موتورسیکلتِ زیرِ ۱۵۰ سی‌سی. تغییرِ ۲۰۲۴: موتورسیکلتِ ۱۲۰ سی‌سی به بالا، اگر راننده‌اش بزرگسال باشد، وارد می‌شود؛ بانکِ ۲۰۲۳ هنوز فقط «زیرِ ۱۵۰» را می‌شناسد",
            "«موتور گازی‌ای که ۵۰ km/h می‌رود وارد می‌شود» غلط است",
          ],
        },
        {
          label: "",
          it: "autovetture che non raggiungono 80 km/h · macchine agricole",
          values: [
            "سواری‌ای که در زمینِ صاف نتواند به ۸۰ km/h برسد؛ ماشین‌آلات کشاورزی",
            "«تراکتورِ بی‌یدک وارد می‌شود» غلط است: ماشینِ کشاورزی کلاً ممنوع است",
          ],
        },
        {
          label: "بارِ خطرناک",
          it: "carico disordinato, sporgente, scoperto",
          values: [
            "بارِ نامرتب یا محکم‌نبسته یا بیرون‌زده از حدِ مجاز؛ وسیله‌ی درزدار با بارِ بی‌روکشی که ممکن است پخش شود (شن، خاک)",
            "«بهتر است وارد نشوند» نه؛ ممنوع است",
          ],
        },
        {
          label: "وسیله‌ی ناسالم",
          it: "uso, equipaggiamento, gommatura",
          values: [
            "وسیله‌ای که وضعیت، تجهیزات یا لاستیک‌هایش برای ترافیک خطرناک است؛ وسیله‌ی بی‌لاستیکِ بادی",
            "«اگر بیمه دارد وارد می‌شود» غلط است؛ بیمه ربطی به ایمنی ندارد",
          ],
        },
        {
          label: "اینها ممنوع نیستند",
          it: "autobus per studenti · animali vivi",
          values: ["اتوبوسِ مدرسه؛ کامیونی که حیوانِ زنده می‌برد", "«ممنوع است» برای این‌ها غلط است"],
        },
      ],
      takeaway: "بپرس: آیا با ترافیکِ سریع جور است و چیزی از آن روی جاده نمی‌ریزد؟ نه ← ممنوع، بی‌استثنا.",
      rule: `${CDS_175} c.2, c.2-bis, c.4; ${REG_372}`,
    },
    {
      kind: "table",
      title: "پیاده و حیوان",
      body: "روی آزادراه و جاده‌ی برون‌شهری اصلی پیاده و حیوان هم ممنوع‌اند، با دو استثنای مشخص:",
      columns: ["قاعده"],
      rows: [
        { label: "قاعده", it: "vietata la circolazione di pedoni e animali", values: ["پیاده و حیوان روی سواره‌رو و کنارِ آن ممنوع‌اند"] },
        {
          label: "استثنا: محوطه‌ی خدمات و محلِ توقف",
          it: "aree di servizio · aree di sosta",
          values: ["آن‌جا پیاده راه می‌رود؛ حیوان هم، فقط اگر تحتِ مراقبت باشد (مثلاً با قلاده)"],
        },
        {
          label: "استثنا: خطِ اضطراری",
          it: "corsie di emergenza",
          values: ["پیاده فقط برای رسیدن به تلفن یا ستونِ درخواستِ کمک از آن عبور می‌کند"],
        },
      ],
      takeaway: "«حتی در محوطه‌ی خدمات ممنوع است» غلط است، «حیوان آن‌جا حتی با مراقبت ممنوع است» هم غلط. استثناها همین دو جاست.",
      rule: `${CDS_175} c.6`,
    },
    {
      kind: "classify",
      title: "وارد می‌شود یا نه؟",
      body: "برای هر وسیله بگو اجازه‌ی ورود به آزادراه دارد یا نه. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "ammesso", fa: "وارد می‌شود" },
        { it: "vietato", fa: "ممنوع است" },
      ],
      items: [
        { prompt: "موتورسیکلتِ ۱۰۰ سی‌سی", answer: 1, explain: "زیرِ ۱۲۰ سی‌سی است: ممنوع، هم طبقِ بانک (زیرِ ۱۵۰) هم طبقِ قانونِ ۲۰۲۴." },
        { prompt: "موتورسیکلتِ ۲۵۰ سی‌سی", answer: 0, explain: "۱۵۰ سی‌سی یا بیشتر: وارد می‌شود." },
        { prompt: "اتوبوسی که دانش‌آموزان را به اردو می‌برد", answer: 0, explain: "اتوبوسِ مدرسه وسیله‌ی معمولی است؛ ممنوعیتی ندارد." },
        { prompt: "تراکتور، بدونِ یدک", answer: 1, explain: "ماشینِ کشاورزی، با یدک یا بی‌یدک، ممنوع است." },
        { prompt: "کامیونِ بی‌روکش پر از خاک", answer: 1, explain: "بارِ بی‌روکشی که ممکن است پخش شود: ممنوع." },
        { prompt: "کامیونی که گاو می‌برد", answer: 0, explain: "حملِ حیوانِ زنده ممنوعیتی ندارد." },
      ],
      takeaway: "عددها را به خاطر بسپار: موتورسیکلت از ۱۵۰ سی‌سی (در بانک)، سواری از ۸۰ km/h. بقیه را با «کُند است؟ چیزی از آن می‌ریزد؟» بسنج.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la strada extraurbana principale", fa: "جاده‌ی برون‌شهری اصلی" },
        { it: "è vietata la circolazione", fa: "رفت‌وآمد ممنوع است" },
        { it: "sono ammessi a circolare", fa: "اجازه‌ی رفت‌وآمد دارند", base: "ammettere" },
        { it: "il motociclo di cilindrata inferiore a 150 cm³", fa: "موتورسیکلتِ زیرِ ۱۵۰ سی‌سی" },
        { it: "la macchina agricola", fa: "ماشینِ کشاورزی" },
        { it: "il carico scoperto", fa: "بارِ بی‌روکش" },
        { it: "a tenuta non stagna", fa: "درزدار (آب‌بند نیست)" },
        { it: "debitamente custoditi", fa: "تحتِ مراقبتِ لازم" },
      ],
    },
    {
      kind: "trap",
      title: "ماشینِ کشاورزی: با یدک یا بی‌یدک",
      body: "هر دو جمله درباره‌ی ماشین‌آلات کشاورزی است. یکی یک استثنای ساختگی اضافه کرده:",
      examples: [
        {
          sourceId: "5531",
          textIt: "Sulle autostrade e strade extraurbane principali è vietata la circolazione di macchine agricole",
          answer: 1,
          chunks: [
            { it: SULLE, fa: SULLE_FA },
            { it: VIETATA, fa: VIETATA_FA, verb: "è vietata ← vietare", focus: "negation" },
            { it: "di macchine agricole", fa: "ماشین‌آلات کشاورزی" },
          ],
          translation: "در آزادراه‌ها و جاده‌های برون‌شهری اصلی، رفت‌وآمدِ ماشین‌آلات کشاورزی ممنوع است.",
          why: "درست است. ماشینِ کشاورزی کُند است و جایی در ترافیکِ سریع ندارد.",
        },
        {
          sourceId: "5539",
          textIt: "Sono ammesse a circolare su autostrade e strade extraurbane principali le macchine agricole, non trainanti un rimorchio",
          answer: 0,
          chunks: [
            { it: "Sono ammesse a circolare", fa: "اجازه‌ی رفت‌وآمد دارند", verb: "sono ammesse ← ammettere" },
            { it: "su autostrade e strade extraurbane principali", fa: "در آزادراه‌ها و جاده‌های برون‌شهری اصلی" },
            { it: "le macchine agricole,", fa: "ماشین‌آلات کشاورزی،" },
            { it: "non trainanti un rimorchio", fa: "که یدک نمی‌کشند", focus: "condition" },
          ],
          translation: "ماشین‌آلات کشاورزی‌ای که یدک نمی‌کشند، اجازه‌ی رفت‌وآمد در آزادراه‌ها و جاده‌های برون‌شهری اصلی دارند.",
          why: "غلط است. ممنوعیت به یدک ربطی ندارد: هر ماشینِ کشاورزی ممنوع است.",
        },
      ],
      takeaway: "برای وسیله‌های ممنوع، شرطی مثلِ «اگر بیمه دارد»، «اگر یدک ندارد» یا «اگر ۵۰ km/h می‌رود» را باور نکن.",
      rule: `${CDS_175} c.2`,
    },
  ],
  practice: [
    {
      sourceId: "5530",
      textIt:
        "Sulle autostrade e strade extraurbane principali è vietata la circolazione di autovetture che non sono in grado di sviluppare per costruzione la velocità in piano di almeno 80 km/h",
      answer: 1,
      chunks: [
        { it: SULLE, fa: SULLE_FA },
        { it: VIETATA, fa: VIETATA_FA, verb: "è vietata ← vietare", focus: "negation" },
        { it: "di autovetture che non sono in grado di sviluppare per costruzione", fa: "سواری‌هایی که به‌خاطرِ ساختشان نمی‌توانند برسند", verb: "sono in grado ← essere in grado", focus: "condition" },
        { it: "la velocità in piano di almeno 80 km/h", fa: "به سرعتِ دست‌کم ۸۰ km/h در زمینِ صاف", focus: "limit" },
      ],
      translation: "در آزادراه‌ها و جاده‌های برون‌شهری اصلی، رفت‌وآمدِ سواری‌هایی که به‌خاطرِ ساختشان نمی‌توانند در زمینِ صاف به دست‌کم ۸۰ km/h برسند ممنوع است.",
      why: "درست است (قدم ۱). سواریِ کُند با ترافیکِ سریعِ آزادراه جور نیست؛ مرزش ۸۰ km/h است.",
      rule: `${CDS_175} c.4; ${REG_372}`,
      conceptStep: 1,
    },
    {
      sourceId: "5538",
      textIt: "Sono ammessi a circolare su autostrade e strade extraurbane principali i ciclomotori che sviluppano una velocità di almeno 50 km/h",
      answer: 0,
      chunks: [
        { it: "Sono ammessi a circolare", fa: "اجازه‌ی رفت‌وآمد دارند", verb: "sono ammessi ← ammettere" },
        { it: "su autostrade e strade extraurbane principali", fa: "در آزادراه‌ها و جاده‌های برون‌شهری اصلی" },
        { it: "i ciclomotori", fa: "موتور گازی‌هایی" },
        { it: "che sviluppano una velocità di almeno 50 km/h", fa: "که دست‌کم به ۵۰ km/h می‌رسند", verb: "sviluppano ← sviluppare", focus: "condition" },
      ],
      translation: "موتور گازی‌هایی که دست‌کم به ۵۰ km/h می‌رسند، اجازه‌ی رفت‌وآمد در آزادراه‌ها و جاده‌های برون‌شهری اصلی دارند.",
      why: "غلط است (قدم ۱). موتور گازی همیشه ممنوع است. ۵۰ km/h هم از ۸۰ km/h، حدِ وسیله‌های مجاز، خیلی کمتر است.",
      rule: `${CDS_175} c.2`,
      conceptStep: 1,
    },
    {
      sourceId: "5535",
      textIt: "Sulle autostrade e strade extraurbane principali è vietata la circolazione di autobus per trasporto di studenti",
      answer: 0,
      chunks: [
        { it: SULLE, fa: SULLE_FA },
        { it: VIETATA, fa: VIETATA_FA, verb: "è vietata ← vietare", focus: "negation" },
        { it: "di autobus per trasporto di studenti", fa: "اتوبوس‌هایی که دانش‌آموز می‌برند" },
      ],
      translation: "در آزادراه‌ها و جاده‌های برون‌شهری اصلی، رفت‌وآمدِ اتوبوس‌هایی که دانش‌آموز می‌برند ممنوع است.",
      why: "غلط است (قدم ۱). اتوبوسِ مدرسه وسیله‌ای عادی و سریع است و در فهرستِ ممنوع‌ها نیست.",
      rule: `${CDS_175} c.2`,
      conceptStep: 1,
    },
    {
      sourceId: "5541",
      textIt:
        "Sulle autostrade e strade extraurbane principali è vietata la circolazione di pedoni e animali, ad eccezione delle aree di servizio e delle aree di sosta",
      answer: 1,
      chunks: [
        { it: SULLE, fa: SULLE_FA },
        { it: VIETATA, fa: VIETATA_FA, verb: "è vietata ← vietare", focus: "negation" },
        { it: "di pedoni e animali,", fa: "پیاده و حیوان،" },
        { it: "ad eccezione delle aree di servizio e delle aree di sosta", fa: "به‌جز محوطه‌های خدمات و محل‌های توقف", focus: "contrast" },
      ],
      translation: "در آزادراه‌ها و جاده‌های برون‌شهری اصلی، رفت‌وآمدِ پیاده و حیوان ممنوع است، به‌جز در محوطه‌های خدمات و محل‌های توقف.",
      why: "درست است (قدم ۲). قاعده و استثنایش با هم: آن‌جا پیاده راه می‌رود و حیوانِ تحتِ مراقبت هم.",
      rule: `${CDS_175} c.6`,
      conceptStep: 2,
    },
    {
      sourceId: "5546",
      textIt:
        "Nelle aree di servizio e nelle aree di sosta delle autostrade e delle strade extraurbane principali gli animali non possono circolare neppure se debitamente custoditi",
      answer: 0,
      chunks: [
        { it: "Nelle aree di servizio e nelle aree di sosta", fa: "در محوطه‌های خدمات و محل‌های توقفِ" },
        { it: "delle autostrade e delle strade extraurbane principali", fa: "آزادراه‌ها و جاده‌های برون‌شهری اصلی" },
        { it: "gli animali non possono circolare", fa: "حیوان‌ها نمی‌توانند رفت‌وآمد کنند", verb: "possono ← potere", focus: "negation" },
        { it: "neppure se debitamente custoditi", fa: "حتی اگر تحتِ مراقبتِ لازم باشند", focus: "contrast" },
      ],
      translation: "در محوطه‌های خدمات و محل‌های توقفِ آزادراه‌ها و جاده‌های برون‌شهری اصلی، حیوان‌ها حتی اگر تحتِ مراقبتِ لازم باشند نمی‌توانند رفت‌وآمد کنند.",
      why: "غلط است (قدم ۲). همین‌جا استثناست: حیوانِ تحتِ مراقبت آن‌جا اجازه دارد.",
      rule: `${CDS_175} c.6`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // vehicles banned from motorways and main extra-urban roads, and the ones that are not;
      // 5529 ("motocicli < 150 cm3") predates L. 177/2024 (art. 175 c.2-bis: ≥ 120 cm3 with an adult rider), flagged in docs
      sourceIds: ["5529", "5530", "5531", "5532", "5533", "5534", "5535", "5536", "5537", "5538", "5539", "5540"],
    },
    {
      step: 2,
      // pedestrians and animals: banned except in service and rest areas; emergency lane only to call for help
      sourceIds: ["5541", "5542", "5543", "5545", "5546"],
    },
  ],
};

// ── Lesson 4 ──────────────────────────────────────────────────────────────────

export const lessonAutostradaGuida: Lesson = {
  id: "autostrada-come-si-circola",
  titleFa: "رانندگی در آزادراه: فقط رو به جلو",
  titleIt: "AUTOSTRADE · COMPORTAMENTI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی در آزادراه و جاده‌ی برون‌شهری اصلی چه کارهایی هیچ‌وقت مجاز نیست (دور زدن، دنده‌عقب، خلافِ جهت)، خطِ اضطراری برای کیست، چطور وارد و خارج می‌شوی، و چرا چراغِ نور پایین حتی روز روشن است.",
      why:
        "۱۹ سؤال. تقریباً هر دامِ این گروه یک «مگر این‌که» است: مگر با احتیاط، مگر در اضطرار، مگر کوتاه، مگر ترافیک سنگین باشد. برای ممنوعیت‌های این درس استثنایی وجود ندارد.",
      rule: `${CDS_176} c.1`,
    },
    {
      kind: "table",
      title: "چهار کاری که هیچ‌وقت نمی‌کنی",
      body:
        "در آزادراه همه با سرعتِ زیاد در یک جهت می‌روند. هر حرکتی که خلافِ این جریان باشد، ممنوعِ مطلق است: روی سواره‌روها، رمپ‌ها و خروجی‌ها، و حتی در خطِ اضطراری.",
      columns: ["ممنوع", "استثنای ساختگیِ بانک"],
      rows: [
        {
          label: "دور زدن",
          it: "invertire il senso di marcia · attraversare lo spartitraffico",
          values: ["دور زدن یا رد شدن از جداکننده‌ی وسط، حتی از شکاف‌های آن (varchi)", "«با احتیاطِ کامل» یا «در اضطرارِ خاص» مجاز نیست"],
        },
        {
          label: "خلافِ جهت",
          it: "percorrere la carreggiata nel senso opposto",
          values: ["رفتن در جهتِ مخالفِ ترافیک", "«برای مسیرهای کوتاه» مجاز نیست"],
        },
        {
          label: "دنده‌عقب",
          it: "effettuare la retromarcia",
          values: ["روی سواره‌رو، رمپ، خروجی و حتی خطِ اضطراری", "خروجی را رد کردی؟ تا خروجیِ بعدی برو"],
        },
        {
          label: "رانندگی در خطِ اضطراری",
          it: "corsia per la sosta di emergenza",
          values: ["فقط برای ایستادن به‌خاطرِ خرابی یا حالِ بد به آن می‌روی", "«وقتی ترافیک سنگین است» مجاز نیست"],
        },
        {
          label: "و همیشه",
          it: "proiettori anabbaglianti anche di giorno",
          values: ["چراغِ نور پایین روشن، حتی روزِ آفتابی (قانون این را برای همه‌ی جاده‌های بیرونِ آبادی می‌خواهد؛ چراغِ روشنِ روزانه‌ی خودرو هم قبول است)", "«با دیدِ کامل اختیاری است» غلط است"],
        },
      ],
      takeaway: "در آزادراه فقط رو به جلو، در خطِ عبورِ عادی، با چراغِ روشن. «مگر این‌که…» در این جمله‌ها همیشه دام است.",
      rule: `${CDS_176} c.1; ${CDS_152}`,
    },
    {
      kind: "anatomy",
      title: "ورود، خروج و راهبندان",
      scene: "lanes",
      body: "یک آزادراه از بالا. تو در خطِ راست هستی. روی هر بخش بزن تا ببینی قانون آن‌جا چه می‌گوید:",
      parts: [
        {
          id: "accelerazione",
          nameIt: "Corsia di accelerazione",
          nameFa: "خطِ شتاب (ورود)",
          text: "در آن سرعت می‌گیری، ولی حق تقدم با خودروهایی است که از قبل در خط‌های آزادراه‌اند. تو به آن‌ها راه می‌دهی، نه برعکس.",
        },
        {
          id: "marcia",
          nameIt: "Corsia di marcia",
          nameFa: "خط عبور معمولی (راست)",
          text: "هر بار که خط عوض می‌کنی، به‌موقع راهنما بزن، حتی وقتی ترافیک سبک است. حرکت در ستون‌های موازی فقط وقتی مجاز است که ترافیک آن‌قدر سنگین باشد که سواره‌رو پر شده و سرعت را خودروی جلو تعیین می‌کند. برای خروج، از قبل به این خط بیا.",
        },
        {
          id: "sorpasso",
          nameIt: "Corsia di sorpasso",
          nameFa: "خط سبقت (چپ)",
          text: "برای سبقت. بعدش به راست برمی‌گردی؛ و باز با راهنما.",
        },
        {
          id: "decelerazione",
          nameIt: "Corsia di decelerazione",
          nameFa: "خط کاهش سرعت (خروج)",
          text: "از ابتدایش واردش شو، نه از وسطش. سرعت را در همین خط کم می‌کنی، نه روی آزادراه.",
        },
        {
          id: "emergenza",
          nameIt: "Corsia di emergenza",
          nameFa: "خطِ اضطراری",
          text: "فقط برای ایستادن به‌خاطرِ خرابی یا حالِ بد. یک استثنا: در راهبندان، برای خروج، از تابلوی پیش‌آگهیِ خروجی که ۵۰۰ متر قبل از آن است می‌توانی در آن بروی. اگر خطِ اضطراری نیست یا برای پلیس و امداد کافی نیست، کسی که در خطِ اولِ راست است تا جای ممکن به خطِ سمتِ چپش نزدیک می‌شود تا کنارِ راست برای آن‌ها باز بماند.",
        },
      ],
      takeaway: "ورود: تو راه می‌دهی. خروج: از قبل به خطِ راست، و از ابتدای خطِ کاهش سرعت. هر تغییرِ خط: راهنما.",
      rule: `${CDS_176} c.2–4, c.10; Codice della Strada, art. 144 c.1`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "invertire il senso di marcia", fa: "دور زدن", base: "invertire" },
        { it: "lo spartitraffico", fa: "جداکننده‌ی میانی" },
        { it: "il varco", fa: "شکافِ جداکننده‌ی میانی" },
        { it: "la retromarcia", fa: "دنده‌عقب" },
        { it: "la corsia per la sosta di emergenza", fa: "خطِ اضطراری" },
        { it: "la corsia di decelerazione", fa: "خط کاهش سرعت (خروج)" },
        { it: "i proiettori anabbaglianti", fa: "چراغِ نور پایین" },
        { it: "l'ingorgo", fa: "راهبندان" },
        { it: "la marcia per file parallele", fa: "حرکت در ستون‌های موازی" },
      ],
    },
    {
      kind: "trap",
      title: "دور زدن: «ممنوع» یا «با احتیاط»",
      body: "هر دو جمله درباره‌ی دور زدن روی سواره‌رو، رمپ و خروجیِ آزادراه است:",
      examples: [
        {
          sourceId: "5557",
          textIt:
            "Sulle carreggiate, sulle rampe e sugli svincoli di autostrade e strade extraurbane principali è vietato invertire il senso di marcia e attraversare lo spartitraffico, anche all'altezza dei varchi",
          answer: 1,
          chunks: [
            { it: SULLE_CARR, fa: SULLE_CARR_FA },
            { it: "di autostrade e strade extraurbane principali", fa: "در آزادراه‌ها و جاده‌های برون‌شهری اصلی" },
            { it: "è vietato invertire il senso di marcia", fa: "دور زدن ممنوع است", verb: "è vietato ← vietare", focus: "negation" },
            { it: "e attraversare lo spartitraffico,", fa: "و رد شدن از جداکننده‌ی میانی،" },
            { it: "anche all'altezza dei varchi", fa: "حتی جلوی شکاف‌هایش", focus: "always" },
          ],
          translation:
            "روی سواره‌روها، رمپ‌ها و خروجی‌های آزادراه‌ها و جاده‌های برون‌شهری اصلی، دور زدن و رد شدن از جداکننده‌ی میانی ممنوع است، حتی جلوی شکاف‌هایش.",
          why: "درست است. شکاف‌ها برای پلیس و امدادند، نه برای تو.",
        },
        {
          sourceId: "5562",
          textIt:
            "Sulle carreggiate, sulle rampe e sugli svincoli di autostrade e strade extraurbane principali il conducente può invertire il senso di marcia adottando tutti gli accorgimenti necessari",
          answer: 0,
          chunks: [
            { it: SULLE_CARR, fa: SULLE_CARR_FA },
            { it: "di autostrade e strade extraurbane principali", fa: "در آزادراه‌ها و جاده‌های برون‌شهری اصلی" },
            { it: "il conducente può invertire il senso di marcia", fa: "راننده می‌تواند دور بزند", verb: "può ← potere" },
            { it: "adottando tutti gli accorgimenti necessari", fa: "اگر همه‌ی احتیاط‌های لازم را بکند", verb: "adottando ← adottare", focus: "condition" },
          ],
          translation: "روی سواره‌روها، رمپ‌ها و خروجی‌های آزادراه‌ها و جاده‌های برون‌شهری اصلی، راننده می‌تواند با رعایتِ همه‌ی احتیاط‌های لازم دور بزند.",
          why: "غلط است. هیچ احتیاطی دور زدن را مجاز نمی‌کند.",
        },
      ],
      takeaway: "«invertire il senso di marcia» در آزادراه با هر شرطی غلط است: احتیاط، اضطرار، فاصله‌ی کوتاه.",
      rule: `${CDS_176} c.1`,
    },
  ],
  practice: [
    {
      sourceId: "5559",
      textIt: "Sulle carreggiate, sulle rampe e sugli svincoli di autostrade e strade extraurbane principali è vietato effettuare la retromarcia",
      answer: 1,
      chunks: [
        { it: SULLE_CARR, fa: SULLE_CARR_FA },
        { it: "di autostrade e strade extraurbane principali", fa: "در آزادراه‌ها و جاده‌های برون‌شهری اصلی" },
        { it: "è vietato effettuare la retromarcia", fa: "دنده‌عقب رفتن ممنوع است", verb: "è vietato ← vietare", focus: "negation" },
      ],
      translation: "روی سواره‌روها، رمپ‌ها و خروجی‌های آزادراه‌ها و جاده‌های برون‌شهری اصلی، دنده‌عقب رفتن ممنوع است.",
      why: "درست است (قدم ۱). کسی که با سرعت از پشت می‌آید انتظارِ خودرویی که عقب می‌آید ندارد.",
      rule: `${CDS_176} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "5565",
      textIt: "Sulle autostrade e strade extraurbane principali il conducente può utilizzare la corsia di emergenza se il traffico è intenso",
      answer: 0,
      chunks: [
        { it: SULLE, fa: SULLE_FA },
        { it: "il conducente può utilizzare la corsia di emergenza", fa: "راننده می‌تواند از خطِ اضطراری استفاده کند", verb: "può ← potere" },
        { it: "se il traffico è intenso", fa: "اگر ترافیک سنگین باشد", focus: "condition" },
      ],
      translation: "در آزادراه‌ها و جاده‌های برون‌شهری اصلی، اگر ترافیک سنگین باشد، راننده می‌تواند از خطِ اضطراری استفاده کند.",
      why: "غلط است (قدم ۱). خطِ اضطراری برای ایستادن در خرابی یا حالِ بد است، و برای پلیس و امداد. ترافیکِ سنگین دلیلش نیست.",
      rule: `${CDS_176} c.1 lett. c`,
      conceptStep: 1,
    },
    {
      sourceId: "5556",
      textIt: "Durante la marcia sulle autostrade e strade extraurbane principali l'uso dei proiettori anabbaglianti è facoltativo in condizioni di perfetta visibilità",
      answer: 0,
      chunks: [
        { it: "Durante la marcia", fa: "هنگامِ حرکت" },
        { it: "sulle autostrade e strade extraurbane principali", fa: "در آزادراه‌ها و جاده‌های برون‌شهری اصلی" },
        { it: "l'uso dei proiettori anabbaglianti è facoltativo", fa: "روشن کردنِ چراغِ نور پایین اختیاری است", focus: "contrast" },
        { it: "in condizioni di perfetta visibilità", fa: "وقتی دید کامل است", focus: "condition" },
      ],
      translation: "هنگامِ حرکت در آزادراه‌ها و جاده‌های برون‌شهری اصلی، وقتی دید کامل است، روشن کردنِ چراغِ نور پایین اختیاری است.",
      why: "غلط است (قدم ۱). در این جاده‌ها (و در هر جاده‌ی بیرونِ آبادی) چراغِ نور پایین در حرکت اجباری است، روز و شب، با هر دیدی؛ چراغِ روشنِ روزانه‌ی خودرو هم جایش را می‌گیرد.",
      rule: CDS_152,
      conceptStep: 1,
    },
    {
      sourceId: "5566",
      textIt:
        "Sulle autostrade e sulle strade extraurbane principali il conducente che percorre la corsia di accelerazione deve dare la precedenza ai veicoli in circolazione sulle corsie di marcia",
      answer: 1,
      chunks: [
        { it: "Sulle autostrade e sulle strade extraurbane principali", fa: SULLE_FA },
        { it: "il conducente che percorre la corsia di accelerazione", fa: "راننده‌ای که در خطِ شتاب است", verb: "percorre ← percorrere" },
        { it: "deve dare la precedenza", fa: "باید حق تقدم بدهد", verb: "deve ← dovere" },
        { it: "ai veicoli in circolazione sulle corsie di marcia", fa: "به خودروهایی که در خط‌های عبورِ آزادراه حرکت می‌کنند" },
      ],
      translation: "در آزادراه‌ها و جاده‌های برون‌شهری اصلی، راننده‌ای که در خطِ شتاب است باید به خودروهایی که در خط‌های عبور حرکت می‌کنند حق تقدم بدهد.",
      why: "درست است (قدم ۲). کسی که وارد می‌شود راه می‌دهد؛ خطِ شتاب برای هم‌سرعت شدن است، نه برای گرفتنِ حق تقدم.",
      rule: `${CDS_176} c.2 lett. a`,
      conceptStep: 2,
    },
    {
      sourceId: "5571",
      textIt:
        "Sulle autostrade e sulle strade extraurbane principali, per uscire dalla carreggiata il conducente può immettersi nella corsia di decelerazione anche nel tratto successivo al suo inizio",
      answer: 0,
      chunks: [
        { it: "Sulle autostrade e sulle strade extraurbane principali,", fa: `${SULLE_FA}،` },
        { it: "per uscire dalla carreggiata", fa: "برای خارج شدن از سواره‌رو" },
        { it: "il conducente può immettersi nella corsia di decelerazione", fa: "راننده می‌تواند وارد خط کاهش سرعت شود", verb: "può immettersi ← immettersi" },
        { it: "anche nel tratto successivo al suo inizio", fa: "حتی از بخشی بعد از ابتدایش", focus: "contrast" },
      ],
      translation: "در آزادراه‌ها و جاده‌های برون‌شهری اصلی، راننده برای خارج شدن از سواره‌رو می‌تواند حتی از بخشی بعد از ابتدای خط کاهش سرعت واردش شود.",
      why: "غلط است (قدم ۲). از ابتدایش وارد می‌شوی. ورودِ دیرهنگام یعنی بریدنِ ناگهانی، یا ترمز روی خودِ آزادراه.",
      rule: `${CDS_176} c.2 lett. b`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // never U-turn, reverse or drive against traffic; emergency lane only to stop; dipped lights by day
      sourceIds: ["5555", "5556", "5557", "5558", "5559", "5560", "5561", "5562", "5563", "5564", "5565"],
    },
    {
      step: 2,
      // entering, leaving, indicators, parallel files, the emergency lane in a jam
      sourceIds: ["5566", "5567", "5568", "5569", "5570", "5571", "5572", "5573"],
    },
  ],
};

// ── Lesson 5 ──────────────────────────────────────────────────────────────────

export const lessonAutostradaSosta: Lesson = {
  id: "autostrada-fermarsi",
  titleFa: "توقف در آزادراه: کِی، کجا، چقدر",
  titleIt: "AUTOSTRADE · SOSTA, AREE DI SERVIZIO",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس دو عدد را از هم جدا می‌کنی (حداکثر ۳ ساعت توقفِ اضطراری، حداکثر ۲۴ ساعت پارک در محوطه‌ی خدمات)، می‌دانی سواری دادن و گرفتن در آزادراه همه‌جا ممنوع است و با راننده‌ای که خودرواش خراب شده چه کار نمی‌کنی.",
      why:
        "۲۰ سؤال. دو دامِ اصلی: جابه‌جا کردنِ ۳ و ۲۴ ساعت، و جمله‌هایی که کارِ «انسانی» را اجباری یا مجاز نشان می‌دهند (سوار کردنِ معلول، رساندنِ راننده‌ی خراب‌شده، یدک کشیدنش).",
      rule: `${CDS_175} c.7, c.9; ${CDS_176} c.5–6`,
    },
    {
      kind: "table",
      title: "توقفِ اضطراری: دو دلیل، سه ساعت",
      body: "روی سواره‌رو، رمپ و خروجیِ آزادراه پارک ممنوع است. فقط در اضطرار، و فقط در خطِ اضطراری:",
      columns: ["قانون", "دامِ بانک"],
      rows: [
        {
          label: "دلیل",
          it: "malessere · inefficienza del veicolo",
          values: ["حالِ بدِ راننده یا یکی از سرنشین‌ها؛ یا خرابیِ خودرو", "«در حالِ بدِ سرنشین ایستادن ممنوع است» غلط است"],
        },
        {
          label: "کجا",
          it: "corsia per la sosta di emergenza",
          values: ["در خطِ اضطراری (یا جای توقفِ کنارِ جاده)", ""],
        },
        {
          label: "چقدر",
          it: "non oltre tre ore",
          values: ["فقط تا وقتی واقعاً لازم است، و در هر حال نه بیشتر از ۳ ساعت", "«تا ۲۴ ساعت» غلط است؛ ۲۴ مالِ محوطه‌ی خدمات است"],
        },
      ],
      takeaway: "توقفِ اضطراری = حالِ بد یا خرابی + خطِ اضطراری + حداکثر ۳ ساعت.",
      rule: `${CDS_176} c.5–6`,
    },
    {
      kind: "table",
      title: "محوطه‌ی خدمات و پارکینگ",
      body: "محوطه‌ی خدمات (area di servizio) جای استراحت است، ولی هنوز بخشی از آزادراه است و قواعدِ خودش را دارد:",
      columns: ["قانون", "دامِ بانک"],
      rows: [
        { label: "پارک", it: "non oltre 24 ore", values: ["حداکثر ۲۴ ساعت", "«حداکثر سه ساعت» غلط است"] },
        {
          label: "کمپ زدن",
          it: "campeggiare",
          values: ["فقط در بخش‌هایی که برایش تعیین شده و برای مدتی که مالکِ جاده گفته", "«در محوطه‌ی خدمات آزاد است» غلط است"],
        },
        {
          label: "خرید و فروش",
          it: "attività commerciali",
          values: ["فقط با مجوزِ مالکِ جاده", ""],
        },
        {
          label: "سواری دادن و گرفتن",
          it: "richiedere o concedere passaggi",
          values: [
            "همه‌جای آزادراه ممنوع است: سواره‌رو، رمپ، خروجی، محوطه‌ی خدمات، پارکینگ",
            "«در محوطه‌ی خدمات مجاز است» یا «برای معلول‌ها مجاز است» غلط است",
          ],
        },
      ],
      takeaway: "۲۴ ساعت = محوطه‌ی خدمات. ۳ ساعت = خطِ اضطراری. سواری دادن = هیچ‌جا.",
      rule: `${CDS_175} c.7, c.9`,
    },
    {
      kind: "table",
      title: "راننده‌ای که خودرواش خراب شده",
      body:
        "تو در آزادراه کسی را می‌بینی که در خطِ اضطراری ایستاده. دلت می‌خواهد کمک کنی، ولی قانون کارهای مشخصی را از تو نمی‌خواهد و بعضی را ممنوع کرده؛ کمکِ درست، خبر دادن به امداد از تلفنِ درخواستِ کمک یا شماره‌ی اضطراری است.",
      columns: ["چرا نه"],
      rows: [
        { label: "سوارش کنی", it: "dare un passaggio", values: ["سواری دادن در آزادراه ممنوع است"] },
        { label: "حتماً بایستی و کمک کنی", it: "si deve fermare a prestare soccorso", values: ["خرابی تصادف نیست؛ ایستادن در آزادراه فقط برای اضطرارِ خودِ توست"] },
        { label: "دنده‌عقب بروی تا به او برسی", it: "retrocedere con prudenza", values: ["دنده‌عقب در آزادراه همیشه ممنوع است (درسِ ۴)"] },
        {
          label: "یدکش بکشی تا عوارضی",
          it: "trainare il veicolo fino al casello",
          values: ["در آزادراه فقط خودروهای امدادِ مجاز خودروی خراب را یدک می‌کشند"],
        },
      ],
      takeaway: "در آزادراه، کمک به خودروی خراب کارِ امدادِ مجاز است. تو خبر می‌دهی و به راهت ادامه می‌دهی.",
      rule: `${CDS_175} c.7, c.12; ${CDS_176} c.1`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la sosta di emergenza", fa: "توقفِ اضطراری" },
        { it: "il malessere", fa: "حالِ بد، ناخوشی" },
        { it: "l'inefficienza del veicolo", fa: "از کار افتادنِ خودرو" },
        { it: "l'area di servizio", fa: "محوطه‌ی خدمات آزادراه" },
        { it: "campeggiare", fa: "کمپ زدن" },
        { it: "richiedere o concedere passaggi", fa: "سواری خواستن یا دادن" },
        { it: "il casello", fa: "عوارضی" },
        { it: "il veicolo di soccorso autorizzato", fa: "خودروی امدادِ مجاز" },
      ],
    },
    {
      kind: "trap",
      title: "حالِ بدِ سرنشین: ممنوع یا مجاز؟",
      body: "هر دو جمله درباره‌ی ایستادن به‌خاطرِ حالِ بدِ سرنشین است:",
      examples: [
        {
          sourceId: "5575",
          textIt:
            "Sulle carreggiate, sulle rampe e sugli svincoli delle autostrade è consentito, nel caso di malessere di un passeggero, fermarsi sulla corsia per la sosta di emergenza",
          answer: 1,
          chunks: [
            { it: SULLE_CARR, fa: SULLE_CARR_FA },
            { it: "delle autostrade è consentito,", fa: "در آزادراه‌ها مجاز است،", verb: "è consentito ← consentire" },
            { it: "nel caso di malessere di un passeggero,", fa: "اگر یکی از سرنشین‌ها حالش بد شود،", focus: "condition" },
            { it: "fermarsi sulla corsia per la sosta di emergenza", fa: "که در خطِ اضطراری بایستی" },
          ],
          translation: "روی سواره‌روها، رمپ‌ها و خروجی‌های آزادراه‌ها، اگر یکی از سرنشین‌ها حالش بد شود، ایستادن در خطِ اضطراری مجاز است.",
          why: "درست است. حالِ بدِ راننده یا سرنشین یکی از دو دلیلِ توقفِ اضطراری است.",
        },
        {
          sourceId: "5578",
          textIt: "Sulle carreggiate, sulle rampe e sugli svincoli delle autostrade è vietato sostare o fermarsi, in caso di malessere dei passeggeri",
          answer: 0,
          chunks: [
            { it: SULLE_CARR, fa: SULLE_CARR_FA },
            { it: "delle autostrade è vietato sostare o fermarsi,", fa: "در آزادراه‌ها پارک کردن یا ایستادن ممنوع است،", verb: "è vietato ← vietare", focus: "negation" },
            { it: "in caso di malessere dei passeggeri", fa: "در صورتِ حالِ بدِ سرنشین‌ها", focus: "condition" },
          ],
          translation: "روی سواره‌روها، رمپ‌ها و خروجی‌های آزادراه‌ها، در صورتِ حالِ بدِ سرنشین‌ها، پارک کردن یا ایستادن ممنوع است.",
          why: "غلط است. همان موقعیتی است که قانون استثنا کرده: حالِ بد اجازه‌ی توقفِ اضطراری می‌دهد.",
        },
      ],
      takeaway: "در آزادراه توقف ممنوع است، مگر برای حالِ بد یا خرابی؛ این دو استثنا واقعی‌اند.",
      rule: `${CDS_176} c.5`,
    },
  ],
  practice: [
    {
      sourceId: "5576",
      textIt:
        "Sulle carreggiate, sulle rampe e sugli svincoli delle autostrade la sosta di emergenza non deve superare il tempo strettamente necessario e non deve protrarsi comunque oltre tre ore",
      answer: 1,
      chunks: [
        { it: SULLE_CARR, fa: SULLE_CARR_FA },
        { it: "delle autostrade", fa: "در آزادراه‌ها" },
        { it: "la sosta di emergenza non deve superare il tempo strettamente necessario", fa: "توقفِ اضطراری نباید از زمانِ واقعاً لازم بیشتر شود", verb: "deve ← dovere", focus: "negation" },
        { it: "e non deve protrarsi comunque oltre tre ore", fa: "و در هر حال نباید بیش از سه ساعت طول بکشد", verb: "deve protrarsi ← protrarsi", focus: "limit" },
      ],
      translation:
        "روی سواره‌روها، رمپ‌ها و خروجی‌های آزادراه‌ها، توقفِ اضطراری نباید از زمانِ واقعاً لازم بیشتر شود و در هر حال نباید بیش از سه ساعت طول بکشد.",
      why: "درست است (قدم ۱). هر دو حد با هم: فقط به اندازه‌ی لازم، و سقفِ ۳ ساعت.",
      rule: `${CDS_176} c.6`,
      conceptStep: 1,
    },
    {
      sourceId: "5579",
      textIt:
        "Sulle carreggiate, sulle rampe e sugli svincoli delle autostrade la sosta di emergenza non deve superare il tempo strettamente necessario e può protrarsi fino a 24 ore",
      answer: 0,
      chunks: [
        { it: SULLE_CARR, fa: SULLE_CARR_FA },
        { it: "delle autostrade", fa: "در آزادراه‌ها" },
        { it: "la sosta di emergenza non deve superare il tempo strettamente necessario", fa: "توقفِ اضطراری نباید از زمانِ واقعاً لازم بیشتر شود", verb: "deve ← dovere", focus: "negation" },
        { it: "e può protrarsi fino a 24 ore", fa: "و می‌تواند تا ۲۴ ساعت طول بکشد", verb: "può protrarsi ← protrarsi", focus: "contrast" },
      ],
      translation:
        "روی سواره‌روها، رمپ‌ها و خروجی‌های آزادراه‌ها، توقفِ اضطراری نباید از زمانِ واقعاً لازم بیشتر شود و می‌تواند تا ۲۴ ساعت طول بکشد.",
      why: "غلط است (قدم ۱). سقفِ توقفِ اضطراری ۳ ساعت است. ۲۴ ساعت عددِ محوطه‌ی خدمات است.",
      rule: `${CDS_176} c.6`,
      conceptStep: 1,
    },
    {
      sourceId: "5550",
      textIt: "Nelle aree di servizio delle autostrade, il conducente non deve lasciare in sosta il veicolo per più di 24 ore",
      answer: 1,
      chunks: [
        { it: "Nelle aree di servizio delle autostrade,", fa: "در محوطه‌های خدمات آزادراه‌ها،" },
        { it: "il conducente non deve lasciare in sosta il veicolo", fa: "راننده نباید خودرو را پارک‌شده رها کند", verb: "deve ← dovere", focus: "negation" },
        { it: "per più di 24 ore", fa: "بیش از ۲۴ ساعت", focus: "limit" },
      ],
      translation: "در محوطه‌های خدمات آزادراه‌ها، راننده نباید خودرو را بیش از ۲۴ ساعت پارک‌شده رها کند.",
      why: "درست است (قدم ۲). سقفِ پارک در محوطه‌ی خدمات ۲۴ ساعت است.",
      rule: `${CDS_175} c.9`,
      conceptStep: 2,
    },
    {
      sourceId: "5551",
      textIt: "Nelle autostrade è consentito concedere passaggi a persone invalide",
      answer: 0,
      chunks: [
        { it: "Nelle autostrade", fa: "در آزادراه‌ها" },
        { it: "è consentito concedere passaggi", fa: "سواری دادن مجاز است", verb: "è consentito ← consentire" },
        { it: "a persone invalide", fa: "به افرادِ معلول", focus: "condition" },
      ],
      translation: "در آزادراه‌ها سواری دادن به افرادِ معلول مجاز است.",
      why: "غلط است (قدم ۲). سواری دادن و گرفتن در آزادراه برای هیچ‌کس مجاز نیست؛ استثنای «معلول» ساختگی است.",
      rule: `${CDS_175} c.7 lett. b`,
      conceptStep: 2,
    },
    {
      sourceId: "5583",
      textIt:
        "Qualora il conducente veda un automobilista fermo per avaria del veicolo in autostrada, se lo ha superato può retrocedere con prudenza per soccorrerlo",
      answer: 0,
      chunks: [
        { it: "Qualora il conducente veda un automobilista fermo", fa: "اگر راننده راننده‌ی دیگری را ببیند که ایستاده", verb: "veda ← vedere", focus: "condition" },
        { it: "per avaria del veicolo in autostrada,", fa: "چون خودرواش در آزادراه خراب شده،" },
        { it: "se lo ha superato", fa: "اگر از کنارش رد شده باشد", verb: "ha superato ← superare", focus: "condition" },
        { it: "può retrocedere con prudenza per soccorrerlo", fa: "می‌تواند با احتیاط دنده‌عقب برود تا کمکش کند", verb: "può ← potere" },
      ],
      translation: "اگر راننده در آزادراه کسی را ببیند که خودرواش خراب شده و ایستاده، و از کنارش رد شده باشد، می‌تواند با احتیاط دنده‌عقب برود تا کمکش کند.",
      why: "غلط است (قدم ۳). دنده‌عقب در آزادراه با هیچ نیتی مجاز نیست. کمکِ درست، خبر دادن به امداد است.",
      rule: `${CDS_176} c.1`,
      conceptStep: 3,
    },
  ],
  related: [
    {
      step: 1,
      // emergency stops: illness or breakdown, only as long as needed, never over three hours
      sourceIds: ["5574", "5575", "5576", "5577", "5578", "5579"],
    },
    {
      step: 2,
      // service and parking areas: 24 hours, camping, trade, no lifts anywhere
      sourceIds: ["5547", "5548", "5549", "5550", "5551", "5552", "5553", "5554"],
    },
    {
      step: 3,
      // a broken-down driver: no lift, no reversing, no towing (authorised rescue only)
      sourceIds: ["5544", "5580", "5581", "5582", "5583", "5584"],
    },
  ],
};
