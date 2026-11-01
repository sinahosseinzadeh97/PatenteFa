/**
 * src/content/lessons-velocita.ts
 * Chapter 3 of the learning path: Velocità, distanza di sicurezza e arresto.
 * Same trust rules as src/content/lessons.ts — real bank statements by
 * source_id with text + answer snapshots, faithful translations, explicit
 * question → section mappings — plus two step kinds of its own:
 *
 *  - "stopping": the stopping-distance explorer. Its numbers come only from
 *    src/lib/stopping.ts (sent by the API); every prediction option carries a
 *    claim that tests/stopping.test.ts checks against that model.
 *  - "factors": what the bank says matters (VERO) and what it says does not
 *    (FALSO), each item backed by one bank statement.
 *
 * Scope (reviewed 2026-10-10 against CdS artt. 141 and 149): adapting speed,
 * reaction distance, braking and total stopping distance, following distance.
 * Not covered: the numeric speed limits (art. 142), level crossings, servo
 * brakes on long descents, and liability after a crash. Their questions are
 * left unmapped on purpose.
 */
import type { Chapter, Lesson } from "./lessons.js";

const SIGN = "Il segnale raffigurato";
const SIGN_FA = "تابلوی نشان‌داده‌شده";
const PRESENZA = "In presenza del segnale raffigurato";
const PRESENZA_FA = "وقتی این تابلو هست";

const CDS_141 = "Codice della Strada, art. 141";
const CDS_149 = "Codice della Strada, art. 149";
const KMH_TO_MS = "v (m/s) = km/h ÷ 3,6";
const PROGRAMMA = "Circolare MIT 6935/2017, argomenti d'esame: tempi di reazione";

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => String(from + i));

// ── Lesson 1 ──────────────────────────────────────────────────────────────────

const lessonAdeguata: Lesson = {
  id: "velocita-adeguata",
  titleFa: "سرعتِ مناسبِ همان لحظه",
  titleIt: "VELOCITÀ ADEGUATA",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی سرعت را با چه چیزهایی تنظیم می‌کنی و با چه چیزهایی نه، و چرا سرعتی که زیرِ حدِ مجاز است هم می‌تواند زیاد باشد: باید بتوانی در محدوده‌ای که می‌بینی کامل بایستی.",
      why:
        "بیش از ۸۰ جمله‌ی بانک سؤال از همین ماده‌ی قانون می‌آید. بیشترشان می‌پرسند سرعت را با چه چیزی تنظیم کنی و با چه چیزی نه.",
      rule: `${CDS_141} c.1`,
    },
    {
      kind: "factors",
      title: "سرعت را با چه چیزی تنظیم کنی؟",
      body:
        "حدِ مجاز سقف است، نه هدف. زیرِ این سقف، سرعت را با شرایطِ همان لحظه تنظیم می‌کنی تا برای آدم‌ها و چیزها خطری نسازی و نظمِ ترافیک را به هم نزنی؛ ولی نه آن‌قدر آهسته که بی‌دلیل جلوی جریانِ ترافیک را بگیری. بانک سؤال بارها همین فهرست را می‌پرسد:",
      columns: [
        {
          title: "با این‌ها تنظیم کن (VERO)",
          items: [
            {
              fa: "بار و وضعیتِ خودرو",
              it: "carico del veicolo",
              sourceId: "3953",
              textIt: "Il conducente deve regolare la velocità in relazione al carico del veicolo",
              answer: 1,
            },
            {
              fa: "وضعیتِ جاده: خیس، برفی، یخ‌زده، کثیف",
              it: "condizioni della strada",
              sourceId: "3955",
              textIt: "Il conducente deve regolare la velocità in relazione alle condizioni della strada",
              answer: 1,
            },
            {
              fa: "ترافیک",
              it: "condizioni del traffico",
              sourceId: "3956",
              textIt: "Il conducente deve regolare la velocità in relazione alle condizioni del traffico",
              answer: 1,
            },
            {
              fa: "هوا: باران، مه، برف، بادِ شدید",
              it: "condizioni atmosferiche",
              sourceId: "3962",
              textIt: "Il conducente deve regolare la velocità in relazione alle condizioni atmosferiche",
              answer: 1,
            },
            {
              fa: "جاهای خاص: پیچ، دیدِ محدود، تقاطع، نزدیکِ مدرسه، سرازیریِ تند، گذرگاهِ تنگ، شب، داخلِ آبادی",
              it: "nelle curve",
              sourceId: "3970",
              textIt: "E' obbligatorio regolare la velocità nelle curve",
              answer: 1,
            },
            {
              fa: "عابری که مردد است یا دیر کنار می‌رود، حیوانی که ترسیده",
              it: "danno segni d'incertezza",
              sourceId: "3999",
              textIt:
                "E' obbligatorio ridurre la velocità e all'occorrenza fermarsi quando i pedoni, che sono sul percorso, danno segni d'incertezza",
              answer: 1,
            },
            {
              fa: "حالِ جسمی و روانیِ خودت",
              it: "condizioni psicofisiche",
              sourceId: "4073",
              textIt: "Si deve tenere una velocità adeguata alle proprie condizioni psicofisiche",
              answer: 1,
            },
          ],
        },
        {
          title: "نه با این‌ها (FALSO)",
          items: [
            {
              fa: "عجله‌ی خودت یا دوریِ مقصد",
              it: "fretta del conducente",
              sourceId: "4127",
              textIt: "Si deve regolare la velocità in base alla fretta del conducente",
              answer: 0,
            },
            {
              fa: "مارکِ لاستیک‌ها",
              it: "marca dei pneumatici",
              sourceId: "3965",
              textIt: "Il conducente deve regolare la velocità in relazione alla marca dei pneumatici",
              answer: 0,
            },
            {
              fa: "سرعتِ خودروهای پشتِ سر",
              it: "veicoli che seguono",
              sourceId: "4068",
              textIt: "Si è tenuti a regolare la velocità in funzione della velocità dei veicoli che seguono",
              answer: 0,
            },
            {
              fa: "نوعِ سوختِ موتور",
              it: "tipo di alimentazione del motore",
              sourceId: "4067",
              textIt: "Si è tenuti a regolare la velocità in funzione del tipo di alimentazione del motore",
              answer: 0,
            },
            {
              fa: "هر تابلویی که سرِ راه است",
              it: "qualunque segnale stradale",
              sourceId: "4006",
              textIt: "E' obbligatorio ridurre la velocità e all'occorrenza fermarsi in corrispondenza di qualunque segnale stradale",
              answer: 0,
            },
          ],
        },
      ],
      takeaway:
        "سرعتِ درست را جاده، هوا، ترافیک، خودرو و حالِ خودت تعیین می‌کنند. عجله، مارکِ لاستیک، سوخت و ماشین‌های پشتِ سر معیار نیستند.",
      rule: `${CDS_141} c.1, c.3, c.4, c.6`,
    },
    {
      kind: "stopping",
      scene: "sight",
      title: "به اندازه‌ی جاده‌ای که می‌بینی",
      body:
        "قانون می‌خواهد همیشه بتوانی جلوی هر مانعی که می‌بینی کامل بایستی. جاده‌ای بیرونِ شهر با حدِ مجاز ۹۰ km/h؛ پیچی جلوتر، دید را به ۴۰ متر رسانده. اول ببین با همان ۹۰ چه می‌شود:",
      start: { speed: 90, reaction: 1, surface: "dry" },
      sight: 40,
      controls: ["speed"],
      predictions: [
        {
          question: "در همین پیچ، با کدام سرعت می‌توانی در ۴۰ متری که می‌بینی کامل بایستی؟ (راننده‌ی هوشیار، آسفالتِ خشک)",
          rows: [
            { speed: 70, reaction: 1, surface: "dry" },
            { speed: 50, reaction: 1, surface: "dry" },
          ],
          options: [
            { text: "هم با ۷۰ و هم با ۵۰", claims: [{ row: 0, fits: true }, { row: 1, fits: true }] },
            { text: "فقط با ۵۰", claims: [{ row: 0, fits: false }, { row: 1, fits: true }] },
            { text: "با هیچ‌کدام؛ باید از ۵۰ هم آهسته‌تر بروی", claims: [{ row: 0, fits: false }, { row: 1, fits: false }] },
          ],
          answer: 1,
          explain:
            "با ۷۰، کل مسافتِ توقف از ۴۰ متر بیشتر می‌شود؛ یعنی اگر پشتِ پیچ مانعی باشد، پیش از رسیدن به آن نمی‌ایستی. با ۵۰ در محدوده‌ی دید می‌ایستی. حدِ مجاز ۹۰ است، ولی سرعتِ مناسب در این پیچ خیلی کمتر است.",
        },
      ],
      takeaway:
        "سرعتِ مناسب یعنی سرعتی که با آن جلوی هر مانعی که می‌بینی بایستی. هرچه دید کمتر، سرعت کمتر، حتی زیرِ حدِ مجاز. این عددها تخمین‌اند؛ در واقعیت حاشیه‌ی بیشتری بگذار.",
      rule: `${CDS_141} c.2–3`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "regolare la velocità", base: "regolare", fa: "سرعت را تنظیم کردن" },
        { it: "moderare la velocità", base: "moderare", fa: "سرعت را کم و ملایم کردن" },
        { it: "il limite massimo di velocità", fa: "حداکثر سرعتِ مجاز؛ سقف است، نه هدف" },
        { it: "la visibilità limitata", fa: "دیدِ محدود", note: "«a visuale non libera» هم یعنی جایی که جلو را خوب نمی‌بینی." },
        { it: "il campo di visibilità", fa: "محدوده‌ی دید" },
        { it: "arrestare il veicolo", base: "arrestare", fa: "خودرو را کامل متوقف کردن" },
        { it: "le condizioni psicofisiche", fa: "حالِ جسمی و روانی" },
        { it: "l'intralcio alla circolazione", fa: "کند کردنِ بی‌دلیلِ جریانِ ترافیک", note: "سرعتِ بیش از حد کم هم ممنوع است (art. 141 c.6)." },
      ],
    },
    {
      kind: "trap",
      title: "«entro i limiti» درست است، «esclusivamente» غلط",
      body:
        "اشتباه رایج: «اگر از حدِ مجاز تندتر نروم، سرعتم درست است». هر دو جمله‌ی بانک درباره‌ی «limiti massimi» هستند:",
      examples: [
        {
          sourceId: "3963",
          textIt: "Il conducente deve regolare la velocità tenendo conto esclusivamente dei limiti massimi",
          answer: 0,
          chunks: [
            { it: "Il conducente deve", fa: "راننده باید", verb: "deve ← dovere" },
            { it: "regolare la velocità", fa: "سرعت را تنظیم کند" },
            { it: "tenendo conto", fa: "با در نظر گرفتنِ", verb: "tenendo conto ← tenere conto" },
            { it: "esclusivamente", fa: "فقط؛ منحصراً", focus: "limit" },
            { it: "dei limiti massimi", fa: "حداکثرهای مجاز" },
          ],
          translation: "راننده باید سرعت را فقط با در نظر گرفتنِ حداکثرهای مجاز تنظیم کند.",
          why:
            "غلط است. حدِ مجاز لازم است ولی کافی نیست: قانون می‌خواهد سرعت را با خودرو، جاده، ترافیک و هر شرایطِ دیگری تنظیم کنی. «esclusivamente» همه‌ی این‌ها را کنار می‌گذارد.",
        },
        {
          sourceId: "3960",
          textIt: "Il conducente deve regolare la velocità entro i limiti massimi consentiti",
          answer: 1,
          chunks: [
            { it: "Il conducente deve", fa: "راننده باید", verb: "deve ← dovere" },
            { it: "regolare la velocità", fa: "سرعت را تنظیم کند" },
            { it: "entro i limiti massimi consentiti", fa: "در محدوده‌ی حداکثرهای مجاز", note: "«entro» یعنی «در داخلِ؛ تا سقفِ»." },
          ],
          translation: "راننده باید سرعت را در محدوده‌ی حداکثرهای مجاز تنظیم کند.",
          why:
            "درست است. سرعتی که با شرایط تنظیم می‌کنی همیشه باید زیرِ سقفِ مجاز بماند. این جمله نمی‌گوید «فقط» با حدِ مجاز؛ می‌گوید داخلِ آن.",
        },
      ],
      takeaway:
        "ماندن زیرِ حدِ مجاز لازم است، ولی کافی نیست. «esclusivamente» یعنی «فقط»: جمله می‌گوید چیزِ دیگری مهم نیست، و همین غلط است.",
      rule: `${CDS_141} c.1`,
    },
  ],
  practice: [
    {
      sourceId: "3969",
      textIt: "Il conducente deve poter arrestare il veicolo nel campo di visibilità e in condizioni di sicurezza.",
      answer: 1,
      chunks: [
        { it: "Il conducente deve poter", fa: "راننده باید بتواند", verb: "deve ← dovere" },
        { it: "arrestare il veicolo", fa: "خودرو را کامل متوقف کند" },
        { it: "nel campo di visibilità", fa: "در محدوده‌ی دیدش" },
        { it: "e in condizioni di sicurezza.", fa: "و در شرایطِ ایمن." },
      ],
      translation: "راننده باید بتواند خودرو را در محدوده‌ی دیدش و در شرایطِ ایمن کامل متوقف کند.",
      why:
        "درست است. سرعتت باید طوری باشد که پیش از رسیدن به هر مانعی که می‌بینی، کامل بایستی؛ همان چیزی که در پیچِ ۴۰ متری دیدی.",
      rule: `${CDS_141} c.2`,
      conceptStep: 2,
    },
    {
      sourceId: "4076",
      textIt: "La velocità deve essere moderata fuori dai centri abitati",
      answer: 0,
      chunks: [
        { it: "La velocità deve essere moderata", fa: "سرعت باید ملایم باشد", verb: "deve ← dovere" },
        { it: "fuori dai centri abitati", fa: "بیرون از آبادی‌ها" },
      ],
      translation: "سرعت باید بیرون از آبادی‌ها ملایم باشد.",
      why:
        "غلط است. «بیرون از آبادی» به‌خودیِ‌خود دلیلِ کم کردنِ سرعت نیست. قانون جاهای مشخصی را نام می‌برد، از جمله عبور از داخلِ آبادی‌ها و جاده‌هایی که کنارشان ساختمان است. بیرونِ شهر هم سرعت را با پیچ، دید و هوا تنظیم می‌کنی، نه با اسمِ جاده.",
      rule: `${CDS_141} c.3`,
      conceptStep: 1,
    },
    {
      sourceId: "4157",
      textIt: "Se si attraversa un incrocio con diritto di precedenza, non si ha alcun obbligo di rallentare",
      answer: 0,
      chunks: [
        { it: "Se si attraversa un incrocio", fa: "اگر از تقاطعی عبور کنی", focus: "condition", verb: "si attraversa ← attraversare" },
        { it: "con diritto di precedenza,", fa: "با حق تقدم،" },
        { it: "non si ha alcun obbligo", fa: "هیچ اجباری نداری", focus: "negation", verb: "si ha ← avere" },
        { it: "di rallentare", fa: "که سرعت را کم کنی" },
      ],
      translation: "اگر با حق تقدم از تقاطعی عبور کنی، هیچ اجباری نداری که سرعت را کم کنی.",
      why:
        "غلط است. نزدیکِ تقاطع همیشه باید سرعت را تنظیم کنی، حتی وقتی حق تقدم با توست. همان چیزی که در فصلِ اول دیدی: حق تقدم، احتیاط را حذف نمی‌کند.",
      rule: `${CDS_141} c.3; Codice della Strada, art. 145 c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "3964",
      textIt: "Il conducente deve regolare la velocità in relazione alla propria abilità alla guida",
      answer: 0,
      chunks: [
        { it: "Il conducente deve", fa: "راننده باید", verb: "deve ← dovere" },
        { it: "regolare la velocità", fa: "سرعت را تنظیم کند" },
        { it: "in relazione alla propria abilità alla guida", fa: "متناسب با مهارتِ خودش در رانندگی" },
      ],
      translation: "راننده باید سرعت را متناسب با مهارتِ خودش در رانندگی تنظیم کند.",
      why:
        "غلط است. بانک سؤال مهارت را معیارِ تنظیمِ سرعت نمی‌داند: سرعت را با خودرو، جاده، ترافیک، هوا و حالِ همان لحظه‌ی خودت می‌سنجی. مهارتِ زیاد مجوزِ سرعتِ بیشتر نیست.",
      rule: `${CDS_141} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "4174",
      textIt:
        "In un centro abitato, se si vede un pallone rotolare sulla carreggiata, bisogna rallentare per potersi fermare, se necessario",
      answer: 1,
      chunks: [
        { it: "In un centro abitato,", fa: "داخلِ آبادی،" },
        { it: "se si vede un pallone", fa: "اگر توپی ببینی", focus: "condition", verb: "si vede ← vedere" },
        { it: "rotolare sulla carreggiata,", fa: "که روی سواره‌رو قِل می‌خورد،" },
        { it: "bisogna rallentare", fa: "باید سرعت را کم کنی", verb: "bisogna ← bisognare" },
        { it: "per potersi fermare,", fa: "تا بتوانی بایستی،", focus: "reason" },
        { it: "se necessario", fa: "اگر لازم شد", focus: "condition" },
      ],
      translation: "داخلِ آبادی، اگر توپی ببینی که روی سواره‌رو قِل می‌خورد، باید سرعت را کم کنی تا اگر لازم شد بتوانی بایستی.",
      why:
        "درست است. ممکن است پشتِ توپ بچه‌ای بدود. سرعت را طوری کم می‌کنی که اگر کسی جلویت آمد، در همان فاصله‌ای که می‌بینی بایستی.",
      rule: `${CDS_141} c.2`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        // regolare la velocità: what to adapt to, what not (art. 141 c.1)
        ...range(3951, 3966),
        // where to adapt (c.3) — 3971 (visibility) belongs to step 2
        "3970", ...range(3972, 3995),
        // reduce and, if needed, stop (c.4)
        ...range(3996, 4007),
        "4064", "4065", "4067", "4068", "4069", "4071", "4073", "4074", "4075", "4076",
        "4119", "4120", "4121", "4123", "4124", "4126", "4127", "4128", "4130",
        "4131", "4132", "4133", "4137", "4157",
        // low grip → lower speed
        "6869", "6871", "6872", "6876",
      ],
    },
    {
      step: 2,
      sourceIds: ["3967", "3968", "3969", "3971", "4070", "4072", "4122", "4173", "4174", "4175", "4179"],
    },
  ],
};

// ── Lesson 2 ──────────────────────────────────────────────────────────────────

const lessonReazione: Lesson = {
  id: "spazio-di-reazione",
  titleFa: "یک ثانیه، بدون ترمز",
  titleIt: "TEMPO DI REAZIONE",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی مسافتِ واکنش از کجا تا کجاست، چطور حسابش می‌کنی (km/h تقسیم بر ۳٫۶، ضربدر زمانِ واکنش) و چه چیزهایی بلندترش می‌کند.",
      why:
        "بانک سؤال عددهای همین بخش را می‌پرسد («در یک ثانیه با ۵۰ km/h حدود ۱۴ متر») و یک اشتباهِ رایج را: اینکه رفلکسِ سریع، ترمز را کوتاه می‌کند.",
    },
    {
      kind: "stopping",
      scene: "hazard",
      title: "سه لحظه: دیدن، ترمز، ایستادن",
      body:
        "خطری جلوی تو پیدا می‌شود. تا پایت به ترمز برسد، خودرو با همان سرعت جلو می‌رود: این «مسافتِ واکنش» است. قدم‌به‌قدم جلو برو یا پخش را بزن؛ بعد پیش‌بینی کن.",
      start: { speed: 50, reaction: 1, surface: "dry" },
      controls: ["speed", "reaction"],
      predictions: [
        {
          question: "اگر زمانِ واکنش از ۱ به ۲ ثانیه برسد (مثلاً چون به گوشی نگاه کرده‌ای)، چه تغییری می‌کند؟",
          rows: [
            { speed: 50, reaction: 1, surface: "dry" },
            { speed: 50, reaction: 2, surface: "dry" },
          ],
          options: [
            { text: "فقط مسافتِ قبل از ترمز دو برابر می‌شود", claims: [{ part: "reaction", factor: 2 }, { part: "braking", factor: 1 }] },
            { text: "فقط مسافتِ حینِ ترمز دو برابر می‌شود", claims: [{ part: "reaction", factor: 1 }, { part: "braking", factor: 2 }] },
            { text: "هر دو دو برابر می‌شوند", claims: [{ part: "reaction", factor: 2 }, { part: "braking", factor: 2 }] },
          ],
          answer: 0,
          explain:
            "در زمانِ واکنش هنوز ترمز نکرده‌ای؛ هر ثانیه‌ی اضافه با همان سرعت جلو می‌روی. وقتی ترمز شروع شد، طولش به سرعت و جاده بستگی دارد، نه به اینکه چقدر دیر شروع شد.",
        },
        {
          question: "اگر سرعت از ۵۰ به ۱۰۰ km/h برسد و زمانِ واکنش همان ۱ ثانیه بماند، مسافتِ قبل از ترمز چه می‌شود؟",
          rows: [
            { speed: 50, reaction: 1, surface: "dry" },
            { speed: 100, reaction: 1, surface: "dry" },
          ],
          options: [
            { text: "ثابت می‌ماند؛ واکنش ربطی به سرعت ندارد", claims: [{ part: "reaction", factor: 1 }] },
            { text: "دو برابر می‌شود", claims: [{ part: "reaction", factor: 2 }] },
            { text: "چهار برابر می‌شود", claims: [{ part: "reaction", factor: 4 }] },
          ],
          answer: 1,
          explain:
            "در یک ثانیه، با سرعتِ دو برابر، دو برابر راه می‌روی. بانک سؤال همین را با عدد می‌پرسد: حدود ۱۴ متر با ۵۰ و حدود ۲۸ متر با ۱۰۰.",
        },
      ],
      takeaway:
        "مسافتِ واکنش = سرعت به متر بر ثانیه × زمانِ واکنش. برای تبدیل، km/h را بر ۳٫۶ تقسیم کن: با ۵۰ km/h هر ثانیه حدود ۱۴ متر.",
      rule: `${KMH_TO_MS}; Banca dati ministeriale 4274–4277`,
    },
    {
      kind: "factors",
      title: "چه چیزی واکنش را کُند می‌کند؟",
      body:
        "زمانِ واکنش برای همه و همیشه یکی نیست. هر چیزی که چشم یا ذهنت را از جاده بگیرد، آن را بلندتر می‌کند. بانک سؤال این‌ها را می‌پرسد:",
      columns: [
        {
          title: "درست (VERO)",
          items: [
            {
              fa: "روشن کردن یا ور رفتن با گوشی",
              it: "accensione del cellulare",
              sourceId: "4269",
              textIt: "La distrazione del conducente può essere causata dall'accensione del cellulare",
              answer: 1,
            },
            {
              fa: "گشتن دنبالِ دکمه‌های رادیو یا دستگاه‌های دیگر",
              it: "comandi della radio",
              sourceId: "4271",
              textIt: "La distrazione del conducente può essere causata dalla ricerca dei comandi della radio o di altri apparecchi elettronici",
              answer: 1,
            },
            {
              fa: "غذای سنگین: توجهِ کمتر و واکنشِ دیرتر",
              it: "aumento dei tempi di reazione",
              sourceId: "6482",
              textIt: "L'alimentazione con cibi di difficile digestione può provocare una diminuzione dell'attenzione e un aumento dei tempi di reazione",
              answer: 1,
            },
            {
              fa: "خستگی: توجه کم می‌شود",
              it: "si è affaticati",
              sourceId: "6713",
              textIt: "L'attenzione alla guida diminuisce quando si è affaticati",
              answer: 1,
            },
          ],
        },
        {
          title: "باورِ غلط (FALSO)",
          items: [
            {
              fa: "«چند ثانیه حواس‌پرتی خطری ندارد»",
              it: "pochi secondi",
              sourceId: "4273",
              textIt: "La distrazione del conducente non rappresenta un pericolo se si limita a pochi secondi",
              answer: 0,
            },
            {
              fa: "«گوشی حواس را پرت نمی‌کند»",
              it: "uso del \"cellulare\"",
              sourceId: "4272",
              textIt: "La distrazione del conducente non è determinata dall'uso del \"cellulare\"",
              answer: 0,
            },
            {
              fa: "«با الکل واکنش سریع‌تر می‌شود»",
              it: "tempi di reazione più rapidi",
              sourceId: "6488",
              textIt: "Chi guida in stato di ebbrezza alcoolica ha tempi di reazione più rapidi",
              answer: 0,
            },
            {
              fa: "«الکل خستگی را از بین می‌برد»",
              it: "annulla la stanchezza",
              sourceId: "6590",
              textIt: "L'assunzione di alcool rende più sicura la guida, perché annulla la stanchezza",
              answer: 0,
            },
          ],
        },
      ],
      takeaway:
        "هر ثانیه‌ی اضافه‌ی واکنش، با ۵۰ km/h حدود ۱۴ متر و با ۱۳۰ km/h حدود ۳۶ متر راهِ بدون ترمز است.",
      rule: PROGRAMMA,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il tempo di reazione", fa: "زمانِ واکنش: از دیدنِ خطر تا شروعِ ترمز" },
        {
          it: "lo spazio percorso nel tempo di reazione",
          fa: "مسافتی که در زمانِ واکنش طی می‌شود",
          note: "گاهی «la distanza percorsa durante il tempo di reazione» می‌آید.",
        },
        { it: "la percezione del pericolo", fa: "دیدن و فهمیدنِ خطر" },
        { it: "l'inizio della frenata", fa: "شروعِ ترمز" },
        { it: "i riflessi pronti", fa: "رفلکس‌های سریع؛ آمادگی برای واکنش", note: "«rallentare i riflessi» یعنی رفلکس‌ها را کُند کردن." },
        { it: "la distrazione", fa: "حواس‌پرتی" },
        { it: "si percorrono", base: "percorrere", fa: "طی می‌شوند", note: "«si percorrono circa m 14» یعنی «حدود ۱۴ متر طی می‌شود»." },
      ],
    },
    {
      kind: "trap",
      title: "رفلکسِ سریع، ترمز را کوتاه نمی‌کند",
      body:
        "اشتباه رایج: «رفلکسم سریع است، پس ترمزم کوتاه‌تر است». رفلکس فقط روی بخشِ قبل از ترمز اثر دارد. هر دو جمله‌ی بانک «riflessi» دارند:",
      examples: [
        {
          sourceId: "4293",
          textIt: "Lo spazio di frenatura diminuisce Se il conducente ha i riflessi pronti",
          answer: 0,
          chunks: [
            { it: "Lo spazio di frenatura", fa: "مسافتِ ترمز" },
            { it: "diminuisce", fa: "کم می‌شود", verb: "diminuisce ← diminuire" },
            { it: "Se il conducente", fa: "اگر راننده", focus: "condition" },
            { it: "ha i riflessi pronti", fa: "رفلکس‌های سریعی داشته باشد", verb: "ha ← avere" },
          ],
          translation: "اگر راننده رفلکس‌های سریعی داشته باشد، مسافتِ ترمز کم می‌شود.",
          why:
            "غلط است. رفلکسِ سریع زمانِ واکنش را کوتاه می‌کند، یعنی بخشِ قبل از ترمز. مسافتِ ترمز از اولین فشارِ ترمز شروع می‌شود و به سرعت، چسبندگیِ جاده، لاستیک و ترمزِ خودرو بستگی دارد.",
        },
        {
          sourceId: "6586",
          textIt: "L'assunzione di alcool rende meno sicura la guida, perché può rallentare i riflessi",
          answer: 1,
          chunks: [
            { it: "L'assunzione di alcool", fa: "مصرفِ الکل" },
            { it: "rende meno sicura la guida,", fa: "رانندگی را کم‌ایمن‌تر می‌کند،", verb: "rende ← rendere" },
            { it: "perché", fa: "چون", focus: "reason" },
            { it: "può rallentare i riflessi", fa: "می‌تواند رفلکس‌ها را کُند کند", verb: "può ← potere" },
          ],
          translation: "مصرفِ الکل رانندگی را کم‌ایمن‌تر می‌کند، چون می‌تواند رفلکس‌ها را کُند کند.",
          why: "درست است. رفلکسِ کُند یعنی زمانِ واکنشِ بلندتر، پس پیش از شروعِ ترمز مسافتِ بیشتری را با همان سرعت می‌روی.",
        },
      ],
      takeaway: "«riflessi» فقط به زمانِ واکنش مربوط است. اگر جمله‌ای رفلکس را به مسافتِ ترمز ربط داد، دوباره بخوانش.",
    },
  ],
  practice: [
    {
      sourceId: "4252",
      textIt:
        "Lo spazio percorso nel tempo di reazione è quello percorso dal momento della percezione di una situazione di pericolo a quello di inizio della frenata",
      answer: 1,
      chunks: [
        { it: "Lo spazio percorso nel tempo di reazione", fa: "مسافتی که در زمانِ واکنش طی می‌شود" },
        { it: "è quello percorso", fa: "همان مسافتی است که طی می‌شود", verb: "è ← essere" },
        { it: "dal momento della percezione", fa: "از لحظه‌ی دیدن و فهمیدنِ" },
        { it: "di una situazione di pericolo", fa: "یک موقعیتِ خطرناک" },
        { it: "a quello di inizio della frenata", fa: "تا لحظه‌ی شروعِ ترمز" },
      ],
      translation:
        "مسافتی که در زمانِ واکنش طی می‌شود، همان مسافتی است که از لحظه‌ی دیدنِ یک موقعیتِ خطرناک تا لحظه‌ی شروعِ ترمز طی می‌شود.",
      why: "درست است. این تعریفِ دقیقِ مسافتِ واکنش است: از دیدنِ خطر تا اولین فشارِ ترمز. در این فاصله خودرو با همان سرعت جلو می‌رود.",
      rule: "Polizia di Stato, «Comportamenti da tenere quando si guida»: tempo di reazione",
      conceptStep: 1,
    },
    {
      sourceId: "4276",
      textIt: "In un secondo, si percorrono circa m 36 se si viaggia a 130 km/h",
      answer: 1,
      chunks: [
        { it: "In un secondo,", fa: "در یک ثانیه،" },
        { it: "si percorrono circa m 36", fa: "حدود ۳۶ متر طی می‌شود", verb: "si percorrono ← percorrere" },
        { it: "se si viaggia a 130 km/h", fa: "اگر با ۱۳۰ کیلومتر بر ساعت برانی", focus: "condition", verb: "si viaggia ← viaggiare" },
      ],
      translation: "در یک ثانیه، اگر با ۱۳۰ کیلومتر بر ساعت برانی، حدود ۳۶ متر طی می‌شود.",
      why: "درست است. ۱۳۰ تقسیم بر ۳٫۶ حدود ۳۶ است: هر ثانیه حدود ۳۶ متر. یعنی یک ثانیه حواس‌پرتی، ۳۶ متر بدون ترمز.",
      rule: KMH_TO_MS,
      conceptStep: 1,
    },
    {
      sourceId: "4279",
      textIt: "In un secondo, si percorrono circa m 4 se si viaggia a 50 km/h",
      answer: 0,
      chunks: [
        { it: "In un secondo,", fa: "در یک ثانیه،" },
        { it: "si percorrono circa m 4", fa: "حدود ۴ متر طی می‌شود", verb: "si percorrono ← percorrere" },
        { it: "se si viaggia a 50 km/h", fa: "اگر با ۵۰ کیلومتر بر ساعت برانی", focus: "condition", verb: "si viaggia ← viaggiare" },
      ],
      translation: "در یک ثانیه، اگر با ۵۰ کیلومتر بر ساعت برانی، حدود ۴ متر طی می‌شود.",
      why: "غلط است. ۵۰ تقسیم بر ۳٫۶ حدود ۱۴ است: با ۵۰ کیلومتر بر ساعت هر ثانیه حدود ۱۴ متر جلو می‌روی، نه ۴ متر.",
      rule: KMH_TO_MS,
      conceptStep: 1,
    },
    {
      sourceId: "6436",
      textIt: "La distanza percorsa durante il tempo di reazione non varia con la velocità",
      answer: 0,
      chunks: [
        { it: "La distanza percorsa", fa: "مسافتِ طی‌شده" },
        { it: "durante il tempo di reazione", fa: "در طولِ زمانِ واکنش" },
        { it: "non varia", fa: "تغییر نمی‌کند", focus: "negation", verb: "varia ← variare" },
        { it: "con la velocità", fa: "با سرعت" },
      ],
      translation: "مسافتی که در طولِ زمانِ واکنش طی می‌شود، با سرعت تغییر نمی‌کند.",
      why: "غلط است. در زمانِ واکنش با همان سرعت جلو می‌روی؛ پس سرعتِ دو برابر یعنی مسافتِ واکنشِ دو برابر، همان پیش‌بینیِ این درس.",
      rule: `${KMH_TO_MS}; spazio = v · t`,
      conceptStep: 1,
    },
    {
      sourceId: "4270",
      textIt: "La distrazione del conducente può essere causata dalla accensione di una sigaretta",
      answer: 1,
      chunks: [
        { it: "La distrazione del conducente", fa: "حواس‌پرتیِ راننده" },
        { it: "può essere causata", fa: "می‌تواند ایجاد شود", verb: "può ← potere" },
        { it: "dalla accensione di una sigaretta", fa: "با روشن کردنِ سیگار" },
      ],
      translation: "حواس‌پرتیِ راننده می‌تواند با روشن کردنِ سیگار ایجاد شود.",
      why: "درست است. هر کاری که دست، چشم یا ذهن را از رانندگی بگیرد حواس‌پرتی است و زمانِ واکنش را بلند می‌کند.",
      rule: PROGRAMMA,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["4252", ...range(4274, 4281), "6436", "4293"] },
    { step: 2, sourceIds: [...range(4268, 4273), "6482", "6488", "6586", "6587", "6590", "6713"] },
  ],
};

// ── Lesson 3 ──────────────────────────────────────────────────────────────────

const lessonFrenatura: Lesson = {
  id: "frenatura-e-arresto",
  titleFa: "ترمز و کل مسافتِ توقف",
  titleIt: "SPAZIO DI FRENATURA · DI ARRESTO",
  minutes: 5,
  signs: [17, 18, 24],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس، مسافتِ ترمز و کل مسافتِ توقف را از هم جدا می‌کنی، می‌دانی چرا با دو برابر شدنِ سرعت ترمز چهار برابر می‌شود، و چه چیزهایی ترمز را بلندتر یا کوتاه‌تر می‌کنند.",
      why:
        "حدود ۴۰ جمله‌ی بانک همین را می‌پرسند، با تله‌هایی مثلِ «دو برابر» به‌جای «چهار برابر» یا «سربالایی» به‌جای «سرازیری».",
    },
    {
      kind: "stopping",
      scene: "hazard",
      title: "کاوشگرِ مسافتِ توقف",
      body:
        "خودرو به سمتِ یک خطر می‌رود. سه بخش را جدا ببین: قبل از ترمز (خط‌چین)، حینِ ترمز (هاشور) و کل مسافتِ توقف (کروشه). اول پیش‌بینی کن؛ بعد خودت سرعت، زمانِ واکنش و سطحِ جاده را عوض کن.",
      start: { speed: 50, reaction: 1, surface: "dry" },
      controls: ["speed", "reaction", "surface"],
      predictions: [
        {
          question: "سرعت از ۵۰ به ۱۰۰ km/h می‌رسد. مسافتِ «حینِ ترمز» تقریباً چند برابر می‌شود؟",
          rows: [
            { speed: 50, reaction: 1, surface: "dry" },
            { speed: 100, reaction: 1, surface: "dry" },
          ],
          options: [
            { text: "۲ برابر", claims: [{ part: "braking", factor: 2 }] },
            { text: "۴ برابر", claims: [{ part: "braking", factor: 4 }] },
            { text: "تغییری نمی‌کند", claims: [{ part: "braking", factor: 1 }] },
          ],
          answer: 1,
          explain:
            "مسافتِ ترمز با توانِ دومِ سرعت رشد می‌کند: سرعتِ ۲ برابر، ترمزِ ۴ برابر. کل مسافتِ توقف کمتر از ۴ برابر می‌شود، چون بخشِ قبل از ترمز فقط ۲ برابر شده است.",
        },
        {
          question: "همان ۵۰ km/h، ولی آسفالت خیس است. کدام بخش بلندتر می‌شود؟",
          rows: [
            { speed: 50, reaction: 1, surface: "dry" },
            { speed: 50, reaction: 1, surface: "wet" },
          ],
          options: [
            { text: "فقط حینِ ترمز", claims: [{ part: "reaction", factor: 1 }, { part: "braking", longer: true }] },
            { text: "فقط قبل از ترمز", claims: [{ part: "reaction", longer: true }, { part: "braking", factor: 1 }] },
            { text: "هر دو", claims: [{ part: "reaction", longer: true }, { part: "braking", longer: true }] },
          ],
          answer: 0,
          explain:
            "خیسی چسبندگیِ لاستیک را کم می‌کند، پس ترمز طولانی‌تر می‌شود؛ زمانِ واکنشِ تو به سطحِ جاده ربطی ندارد. چقدر طولانی‌تر؟ به آب، لاستیک و سرعت بستگی دارد. منابع یک عددِ قابل‌اعتماد نمی‌دهند، برای همین عددی نمی‌گذاریم.",
        },
      ],
      takeaway:
        "کل مسافتِ توقف = مسافتِ واکنش + مسافتِ ترمز. دومی با توانِ دومِ سرعت رشد می‌کند و روی جاده‌ی خیس، برفی یا یخ‌زده بلندتر می‌شود. عددها تخمینِ آموزشی‌اند، نه فاصله‌ای قانونی یا تضمینِ ایمنی.",
      rule: "Banca dati ministeriale 4282–4287, 4298; spazio di frenatura = v² / (2·μ·g)",
    },
    {
      kind: "factors",
      title: "چه چیزی ترمز را بلندتر می‌کند؟",
      body:
        "مسافتِ ترمز به سرعت، چسبندگیِ لاستیک به جاده (aderenza) و شیبِ جاده بستگی دارد. بانک سؤال این‌ها را می‌پرسد:",
      columns: [
        {
          title: "بلندترش می‌کند (VERO)",
          items: [
            {
              fa: "چسبندگیِ کمِ لاستیک و آسفالت",
              it: "aderenza tra pneumatico e asfalto",
              sourceId: "4288",
              textIt: "Lo spazio di frenatura aumenta se l'aderenza tra pneumatico e asfalto è bassa",
              answer: 1,
            },
            {
              fa: "جاده‌ی خیس",
              it: "strada è bagnata",
              sourceId: "4290",
              textIt: "Lo spazio di frenatura aumenta se la strada è bagnata",
              answer: 1,
            },
            {
              fa: "جاده‌ی برفی",
              it: "strada è innevata",
              sourceId: "4289",
              textIt: "Lo spazio di frenatura aumenta se la strada è innevata",
              answer: 1,
            },
            {
              fa: "سرازیری",
              it: "strada è in discesa",
              sourceId: "4291",
              textIt: "Lo spazio di frenatura aumenta se la strada è in discesa",
              answer: 1,
            },
            {
              fa: "لاستیک‌های فرسوده (کل مسافتِ توقف)",
              it: "pneumatici sono usurati",
              sourceId: "4310",
              textIt: "Lo spazio totale di arresto aumenta se i pneumatici sono usurati",
              answer: 1,
            },
            {
              fa: "یدک کشیدنِ تریلر",
              it: "traina un rimorchio",
              sourceId: "5705",
              textIt: "Se si traina un rimorchio aumenta lo spazio di frenatura",
              answer: 1,
            },
          ],
        },
        {
          title: "باورِ غلط (FALSO)",
          items: [
            {
              fa: "«در سربالایی بلندتر می‌شود»",
              it: "strada è in salita",
              sourceId: "4296",
              textIt: "Lo spazio di frenatura aumenta se la strada è in salita",
              answer: 0,
            },
            {
              fa: "«اگر چرخ‌ها قفل شوند، کوتاه‌تر می‌شود»",
              it: "ruote si bloccano",
              sourceId: "4294",
              textIt: "Lo spazio di frenatura diminuisce se le ruote si bloccano",
              answer: 0,
            },
            {
              fa: "«روی آسفالتِ زبر بلندتر می‌شود»",
              it: "asfalto è ruvido",
              sourceId: "4313",
              textIt: "Lo spazio totale di arresto aumenta se l'asfalto è ruvido",
              answer: 0,
            },
            {
              fa: "«به سرعت بستگی ندارد»",
              it: "indipendente dalla velocità",
              sourceId: "4286",
              textIt: "Lo spazio di frenatura è indipendente dalla velocità",
              answer: 0,
            },
          ],
        },
      ],
      takeaway:
        "چسبندگیِ کمتر (خیس، برف، یخ، گِل، لاستیکِ فرسوده) و سرازیری یعنی ترمزِ بلندتر؛ سربالایی کمی کوتاه‌ترش می‌کند. قفل شدنِ چرخ‌ها ترمز را کوتاه نمی‌کند؛ ABS برای همین است که چرخ‌ها قفل نشوند.",
      rule: "Banca dati ministeriale 4286–4297, 4308–4313, 5705, 6910",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "lo spazio di frenatura", fa: "مسافتِ ترمز: از اولین فشارِ ترمز تا ایستادن", note: "«la distanza di frenatura» هم همین است." },
        { it: "lo spazio totale di arresto", fa: "کل مسافتِ توقف: واکنش + ترمز" },
        { it: "l'aderenza", fa: "چسبندگیِ لاستیک به جاده", note: "«il coefficiente di aderenza» عددی است که این چسبندگی را نشان می‌دهد." },
        { it: "si quadruplica", base: "quadruplicare", fa: "چهار برابر می‌شود", note: "«si raddoppia» یعنی دو برابر می‌شود؛ «nove volte maggiore» یعنی نُه برابر." },
        { it: "in discesa / in salita", fa: "در سرازیری / در سربالایی" },
        { it: "i pneumatici usurati", fa: "لاستیک‌های فرسوده" },
        { it: "le ruote si bloccano", base: "bloccarsi", fa: "چرخ‌ها قفل می‌شوند و روی جاده سُر می‌خورند" },
      ],
    },
    {
      kind: "trap",
      title: "«raddoppia» یا «quadruplica»؟",
      body:
        "اشتباه رایج: «سرعت دو برابر، ترمز هم دو برابر». هر دو جمله‌ی بانک با «se la velocità si raddoppia» تمام می‌شوند:",
      examples: [
        {
          sourceId: "4287",
          textIt: "Lo spazio di frenatura si raddoppia se la velocità si raddoppia",
          answer: 0,
          chunks: [
            { it: "Lo spazio di frenatura", fa: "مسافتِ ترمز" },
            { it: "si raddoppia", fa: "دو برابر می‌شود", verb: "si raddoppia ← raddoppiare" },
            { it: "se la velocità si raddoppia", fa: "اگر سرعت دو برابر شود", focus: "condition" },
          ],
          translation: "اگر سرعت دو برابر شود، مسافتِ ترمز دو برابر می‌شود.",
          why: "غلط است. مسافتِ ترمز با توانِ دومِ سرعت رشد می‌کند: سرعتِ دو برابر، ترمزِ چهار برابر.",
        },
        {
          sourceId: "4283",
          textIt: "Lo spazio di frenatura si quadruplica se la velocità si raddoppia",
          answer: 1,
          chunks: [
            { it: "Lo spazio di frenatura", fa: "مسافتِ ترمز" },
            { it: "si quadruplica", fa: "چهار برابر می‌شود", verb: "si quadruplica ← quadruplicare" },
            { it: "se la velocità si raddoppia", fa: "اگر سرعت دو برابر شود", focus: "condition" },
          ],
          translation: "اگر سرعت دو برابر شود، مسافتِ ترمز چهار برابر می‌شود.",
          why: "درست است. ۲ × ۲ = ۴. به همین ترتیب سرعتِ سه برابر یعنی ترمزِ نُه برابر.",
        },
      ],
      takeaway:
        "برای ترمز، ضریبِ سرعت را به توانِ دو برسان: ×۲ می‌شود ×۴، ×۳ می‌شود ×۹. برای مسافتِ واکنش ضریب همان می‌ماند: ×۲ می‌شود ×۲.",
    },
  ],
  practice: [
    {
      sourceId: "4298",
      textIt: "Lo spazio totale di arresto è pari allo spazio percorso nel tempo di reazione più quello percorso durante la frenata",
      answer: 1,
      chunks: [
        { it: "Lo spazio totale di arresto", fa: "کل مسافتِ توقف" },
        { it: "è pari allo spazio percorso", fa: "برابر است با مسافتِ طی‌شده", verb: "è ← essere" },
        { it: "nel tempo di reazione", fa: "در زمانِ واکنش" },
        { it: "più quello percorso durante la frenata", fa: "به‌علاوه‌ی مسافتِ طی‌شده حینِ ترمز" },
      ],
      translation: "کل مسافتِ توقف برابر است با مسافتِ طی‌شده در زمانِ واکنش، به‌علاوه‌ی مسافتِ طی‌شده حینِ ترمز.",
      why: "درست است. همان دو بخشی که در کاوشگر دیدی: قبل از ترمز (خط‌چین) و حینِ ترمز (هاشور). جمعشان کل مسافتِ توقف است.",
      rule: "Comune di Genova, «Determinazione dello spazio di arresto»",
      conceptStep: 1,
    },
    {
      sourceId: "4305",
      textIt: "Lo spazio totale di arresto è pari allo spazio percorso durante la frenata",
      answer: 0,
      chunks: [
        { it: "Lo spazio totale di arresto", fa: "کل مسافتِ توقف" },
        { it: "è pari allo spazio percorso", fa: "برابر است با مسافتِ طی‌شده", verb: "è ← essere" },
        { it: "durante la frenata", fa: "حینِ ترمز" },
      ],
      translation: "کل مسافتِ توقف برابر است با مسافتِ طی‌شده حینِ ترمز.",
      why: "غلط است. بخشِ قبل از ترمز جا افتاده: در زمانِ واکنش هم خودرو با همان سرعت جلو می‌رود. کل مسافت = واکنش + ترمز.",
      rule: "Comune di Genova, «Determinazione dello spazio di arresto»",
      conceptStep: 1,
    },
    {
      sourceId: "4284",
      textIt: "Lo spazio di frenatura diventa nove volte maggiore se la velocità si triplica",
      answer: 1,
      chunks: [
        { it: "Lo spazio di frenatura", fa: "مسافتِ ترمز" },
        { it: "diventa nove volte maggiore", fa: "نُه برابر می‌شود", verb: "diventa ← diventare" },
        { it: "se la velocità si triplica", fa: "اگر سرعت سه برابر شود", focus: "condition", verb: "si triplica ← triplicare" },
      ],
      translation: "اگر سرعت سه برابر شود، مسافتِ ترمز نُه برابر می‌شود.",
      why: "درست است. ۳ × ۳ = ۹: مسافتِ ترمز با توانِ دومِ سرعت رشد می‌کند.",
      rule: "spazio di frenatura = v² / (2·μ·g)",
      conceptStep: 1,
    },
    {
      sourceId: "896",
      sign: 18,
      textIt: "Il segnale raffigurato preannuncia un tratto di strada nel quale aumenta lo spazio di frenatura del veicolo",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "preannuncia un tratto di strada", fa: "از قسمتی از جاده خبر می‌دهد", verb: "preannuncia ← preannunciare" },
        { it: "nel quale aumenta", fa: "که در آن بیشتر می‌شود", verb: "aumenta ← aumentare" },
        { it: "lo spazio di frenatura del veicolo", fa: "مسافتِ ترمزِ خودرو" },
      ],
      translation: "تابلوی نشان‌داده‌شده از قسمتی از جاده خبر می‌دهد که در آن مسافتِ ترمزِ خودرو بیشتر می‌شود.",
      why:
        "غلط است. این تابلوی SALITA RIPIDA (سربالاییِ تند) است. در سربالایی وزنِ خودرو هم به کم شدنِ سرعت کمک می‌کند؛ مسافتِ ترمز کمی کوتاه‌تر می‌شود، نه بلندتر.",
      rule: "Banca dati ministeriale 4291–4292, 4296–4297",
      conceptStep: 2,
    },
    {
      sourceId: "871",
      sign: 17,
      textIt: "Il segnale raffigurato preannuncia un tratto di strada sul quale aumenta lo spazio di frenatura del veicolo",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "preannuncia un tratto di strada", fa: "از قسمتی از جاده خبر می‌دهد", verb: "preannuncia ← preannunciare" },
        { it: "sul quale aumenta", fa: "که روی آن بیشتر می‌شود", verb: "aumenta ← aumentare" },
        { it: "lo spazio di frenatura del veicolo", fa: "مسافتِ ترمزِ خودرو" },
      ],
      translation: "تابلوی نشان‌داده‌شده از قسمتی از جاده خبر می‌دهد که روی آن مسافتِ ترمزِ خودرو بیشتر می‌شود.",
      why: "درست است. این تابلوی DISCESA PERICOLOSA (سرازیریِ خطرناک) است. در سرازیری وزنِ خودرو آن را به جلو می‌کشد و ترمز طولانی‌تر می‌شود.",
      rule: "Banca dati ministeriale 4291",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: [...range(4282, 4287), "4298", "4299", "4304", "4305", "4306", "4307", "4312"] },
    {
      step: 2,
      sourceIds: [
        "4288", "4289", "4290", "4291", "4292", "4294", "4295", "4296", "4297",
        ...range(4300, 4303), ...range(4308, 4311), "4313", "5705",
        // coefficiente di aderenza, ABS
        "6868", "6870", "6874", "6877", "6910",
        // DISCESA PERICOLOSA (17), SALITA RIPIDA (18), STRADA SDRUCCIOLEVOLE (24): braking and grip
        "871", "896", "958", "966", "967", "971",
      ],
    },
  ],
};

// ── Lesson 4 ──────────────────────────────────────────────────────────────────

const lessonDistanza: Lesson = {
  id: "distanza-di-sicurezza",
  titleFa: "فاصله‌ی ایمنی با خودروی جلو",
  titleIt: "DISTANZA DI SICUREZZA",
  minutes: 5,
  signs: [24, 139],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی فاصله‌ی ایمنی دقیقاً چیست، چرا با کل مسافتِ توقف یکی نیست، کمترین مقدارش چقدر است و کِی باید بیشترش کنی.",
      why:
        "بیش از ۱۵۰ جمله‌ی بانک درباره‌ی فاصله‌ی ایمنی است. بیشترشان یا عددِ «distanza minima» را می‌پرسند، یا اینکه این فاصله به چه چیزهایی بستگی دارد و به چه چیزهایی نه.",
      rule: `${CDS_149} c.1`,
    },
    {
      kind: "stopping",
      scene: "following",
      title: "دو خودرو، یک ترمز",
      body:
        "خودروی جلو ترمز می‌کند. تو هنوز در زمانِ واکنشی و با همان سرعت جلو می‌روی، بعد تو هم ترمز می‌کنی. اگر هر دو یکسان ترمز کنید، کمترین فاصله‌ای که لازم داری همان مسافتِ واکنشِ توست.",
      start: { speed: 50, reaction: 1, surface: "dry" },
      controls: ["speed", "reaction"],
      predictions: [
        {
          question: "سرعتِ هر دو خودرو از ۵۰ به ۱۰۰ km/h می‌رسد. کمترین فاصله‌ی لازم (وقتی هر دو یکسان ترمز کنند) چه می‌شود؟",
          rows: [
            { speed: 50, reaction: 1, surface: "dry" },
            { speed: 100, reaction: 1, surface: "dry" },
          ],
          options: [
            { text: "ثابت می‌ماند", claims: [{ part: "gap", factor: 1 }] },
            { text: "دو برابر می‌شود", claims: [{ part: "gap", factor: 2 }] },
            { text: "چهار برابر می‌شود", claims: [{ part: "gap", factor: 4 }] },
          ],
          answer: 1,
          explain:
            "این فاصله همان مسافتی است که در زمانِ واکنش با سرعتِ کامل می‌روی، پس مثلِ آن با سرعت دو برابر می‌شود. بانک سؤال همین را با عدد می‌پرسد: حدود ۱۴ متر با ۵۰ و حدود ۲۸ متر با ۱۰۰.",
        },
      ],
      takeaway:
        "فاصله‌ی ایمنی همان کل مسافتِ توقف نیست. کمترینش مسافتِ واکنشِ توست، و هیچ‌وقت کمتر از آن، حتی پشتِ کامیون. اگر خودروی جلو ناگهان بایستد، مثلاً تصادف کند، به کل مسافتِ توقفت نیاز داری. قانون عددی نمی‌دهد؛ می‌گوید فاصله باید «در هر حال» توقفِ به‌موقع را تضمین کند.",
      rule: `${CDS_149} c.1; Banca dati ministeriale 4258–4262, 4335, 4341`,
    },
    {
      kind: "factors",
      title: "فاصله را با چه چیزی بیشتر کنی؟",
      body:
        "فاصله‌ی ایمنی عددِ ثابتی نیست و در هر سرعتی لازم است. قانون فقط دو مورد عددی دارد: بیرون از آبادی، وقتی سبقت فقط برای گروهی از خودروها ممنوع شده، بین همان خودروها دست‌کم ۱۰۰ متر (به‌جز جاده‌هایی که در هر جهت دو خط یا بیشتر دارند)؛ و پشتِ ماشینِ برف‌روب یا نمک‌پاشِ در حالِ کار، دست‌کم ۲۰ متر. بقیه به شرایط بستگی دارد:",
      columns: [
        {
          title: "بستگی دارد (VERO)",
          items: [
            {
              fa: "سرعت",
              it: "velocità a cui si viaggia",
              sourceId: "4315",
              textIt: "Sulla distanza di sicurezza influisce la velocità a cui si viaggia",
              answer: 1,
            },
            {
              fa: "چسبندگی و وضعیتِ لاستیک‌ها: باران، برف، یخ",
              it: "l'aderenza e le condizioni dei pneumatici",
              sourceId: "4317",
              textIt: "Sulla distanza di sicurezza influiscono l'aderenza e le condizioni dei pneumatici",
              answer: 1,
            },
            {
              fa: "بارِ خودرو",
              it: "carico trasportato",
              sourceId: "4316",
              textIt: "Sulla distanza di sicurezza influisce il carico trasportato dal veicolo",
              answer: 1,
            },
            {
              fa: "کارآییِ ترمزِ اصلی",
              it: "efficienza del freno di servizio",
              sourceId: "4318",
              textIt: "Sulla distanza di sicurezza influisce l'efficienza del freno di servizio",
              answer: 1,
            },
            {
              fa: "تمرکز و حالِ راننده (خستگی یعنی فاصله‌ی بیشتر، نه کمتر)",
              it: "concentrazione del conducente",
              sourceId: "4314",
              textIt: "Sulla distanza di sicurezza influisce la concentrazione del conducente",
              answer: 1,
            },
            {
              fa: "رانندگی در صفِ خودروها",
              it: "si marcia in colonna",
              sourceId: "4327",
              textIt: "Quando si marcia in colonna, conviene aumentare la distanza di sicurezza, per evitare tamponamenti a catena",
              answer: 1,
            },
            {
              fa: "بارِ بیرون‌زده یا ناپایدارِ خودروی جلو",
              it: "carico sporgente, poco stabile",
              sourceId: "4337",
              textIt: "La distanza di sicurezza deve essere aumentata quando il veicolo che precede trasporta un carico sporgente, poco stabile",
              answer: 1,
            },
          ],
        },
        {
          title: "بستگی ندارد (FALSO)",
          items: [
            {
              fa: "تعدادِ خط‌های جاده",
              it: "numero di corsie",
              sourceId: "4319",
              textIt: "Sulla distanza di sicurezza influisce il numero di corsie della strada",
              answer: 0,
            },
            {
              fa: "اندازه‌ی خودروی جلو",
              it: "dimensione del veicolo che precede",
              sourceId: "4320",
              textIt: "Sulla distanza di sicurezza influisce la dimensione del veicolo che precede",
              answer: 0,
            },
            {
              fa: "تعدادِ دنده‌های گیربکس",
              it: "numero di marce",
              sourceId: "4321",
              textIt: "Sulla distanza di sicurezza influisce il numero di marce del cambio di velocità",
              answer: 0,
            },
            {
              fa: "نوعِ فرمانِ هیدرولیک",
              it: "tipo di servosterzo",
              sourceId: "4323",
              textIt: "Sulla distanza di sicurezza da mantenere dal veicolo che precede influisce il tipo di servosterzo utilizzato",
              answer: 0,
            },
            {
              fa: "ترمزدستی",
              it: "freno a mano",
              sourceId: "4329",
              textIt: "La distanza di sicurezza dipende dall'efficienza del freno a mano",
              answer: 0,
            },
          ],
        },
      ],
      takeaway:
        "باران، برف، یخ، لاستیکِ فرسوده، بارِ زیاد، ترمزِ ضعیف، خستگی و ترافیکِ صف‌به‌صف یعنی فاصله‌ی بیشتر. نوعِ سوخت، قدرتِ موتور، تعدادِ خط‌ها و پهنای جاده ربطی ندارند.",
      rule: `${CDS_149} c.1–3; Banca dati ministeriale 4314–4331`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la distanza di sicurezza", fa: "فاصله‌ی ایمنی با خودروی جلو" },
        { it: "il veicolo che precede", base: "precedere", fa: "خودرویی که جلوی توست" },
        { it: "il tamponamento", fa: "زدن به عقبِ خودروی جلو", note: "«tamponamenti a catena» یعنی تصادف‌های زنجیره‌ای از پشت." },
        { it: "la distanza minima", fa: "کمترین فاصله" },
        { it: "è commisurata a", base: "commisurare", fa: "متناسب است با؛ بستگی دارد به" },
        {
          it: "influisce su",
          base: "influire",
          fa: "اثر می‌گذارد روی",
          note: "«Sulla distanza di sicurezza influisce …» یعنی «… روی فاصله‌ی ایمنی اثر دارد».",
        },
        { it: "marciare in colonna", base: "marciare", fa: "در صفِ خودروها راندن" },
        { it: "la macchina sgombraneve", fa: "ماشینِ برف‌روب", note: "پشتِ آن در حالِ کار، دست‌کم ۲۰ متر فاصله (art. 149 c.3)." },
      ],
    },
    {
      kind: "trap",
      title: "فاصله‌ی ایمنی با مسافتِ ترمز یکی نیست",
      body:
        "اشتباه رایج: «فاصله‌ی ایمنی یعنی همان مسافتِ ترمز». هر دو جمله‌ی بانک با «La distanza di sicurezza deve essere» شروع می‌شوند:",
      examples: [
        {
          sourceId: "4336",
          textIt: "La distanza di sicurezza deve essere sempre uguale allo spazio di frenatura del veicolo",
          answer: 0,
          chunks: [
            { it: "La distanza di sicurezza", fa: "فاصله‌ی ایمنی" },
            { it: "deve essere sempre uguale", fa: "باید همیشه برابر باشد", focus: "always", verb: "deve ← dovere" },
            { it: "allo spazio di frenatura del veicolo", fa: "با مسافتِ ترمزِ خودرو" },
          ],
          translation: "فاصله‌ی ایمنی باید همیشه با مسافتِ ترمزِ خودرو برابر باشد.",
          why:
            "غلط است. خودروی جلو هم برای ایستادن مسافتِ ترمز لازم دارد؛ اگر هر دو یکسان ترمز کنید، کمترین فاصله مسافتِ واکنشِ توست. «همیشه برابر» هم غلط است: فاصله با شرایط عوض می‌شود.",
        },
        {
          sourceId: "4335",
          textIt: "La distanza di sicurezza deve essere almeno uguale ai metri che il veicolo percorre durante il tempo di reazione",
          answer: 1,
          chunks: [
            { it: "La distanza di sicurezza", fa: "فاصله‌ی ایمنی" },
            { it: "deve essere almeno uguale", fa: "باید دست‌کم برابر باشد", focus: "limit", verb: "deve ← dovere" },
            { it: "ai metri che il veicolo percorre", fa: "با مترهایی که خودرو طی می‌کند", verb: "percorre ← percorrere" },
            { it: "durante il tempo di reazione", fa: "در طولِ زمانِ واکنش" },
          ],
          translation: "فاصله‌ی ایمنی باید دست‌کم برابر با مترهایی باشد که خودرو در طولِ زمانِ واکنش طی می‌کند.",
          why: "درست است. این کمترین فاصله است، نه اندازه‌ی دقیق؛ در شرایطِ بد باید بیشتر باشد.",
        },
      ],
      takeaway: "«almeno uguale» به مسافتِ واکنش: درست. «sempre uguale» یا «almeno pari» به مسافتِ ترمز: غلط.",
      rule: `${CDS_149} c.1`,
    },
  ],
  practice: [
    {
      sourceId: "4259",
      textIt: "La distanza minima di sicurezza se si viaggia a 50 km/h deve essere di circa 14 metri",
      answer: 1,
      chunks: [
        { it: "La distanza minima di sicurezza", fa: "کمترین فاصله‌ی ایمنی" },
        { it: "se si viaggia a 50 km/h", fa: "اگر با ۵۰ کیلومتر بر ساعت برانی", focus: "condition", verb: "si viaggia ← viaggiare" },
        { it: "deve essere di circa 14 metri", fa: "باید حدود ۱۴ متر باشد", verb: "deve ← dovere" },
      ],
      translation: "اگر با ۵۰ کیلومتر بر ساعت برانی، کمترین فاصله‌ی ایمنی باید حدود ۱۴ متر باشد.",
      why: "درست است. کمترین فاصله مسافتی است که در زمانِ واکنش (حدود ۱ ثانیه) می‌روی: ۵۰ تقسیم بر ۳٫۶، یعنی حدود ۱۴ متر.",
      rule: `${KMH_TO_MS}; Banca dati ministeriale 4335`,
      conceptStep: 1,
    },
    {
      sourceId: "4257",
      textIt: "La distanza di sicurezza può essere inferiore allo spazio percorso nel tempo di reazione",
      answer: 0,
      chunks: [
        { it: "La distanza di sicurezza", fa: "فاصله‌ی ایمنی" },
        { it: "può essere inferiore", fa: "می‌تواند کمتر باشد", verb: "può ← potere" },
        { it: "allo spazio percorso nel tempo di reazione", fa: "از مسافتی که در زمانِ واکنش طی می‌شود" },
      ],
      translation: "فاصله‌ی ایمنی می‌تواند از مسافتی که در زمانِ واکنش طی می‌شود کمتر باشد.",
      why: "غلط است. اگر کمتر باشد، پیش از آنکه حتی ترمز را فشار دهی به خودروی جلو می‌رسی. مسافتِ واکنش کفِ فاصله است.",
      rule: `${CDS_149} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "4243",
      textIt: "La distanza di sicurezza è una distanza fissa",
      answer: 0,
      chunks: [
        { it: "La distanza di sicurezza", fa: "فاصله‌ی ایمنی" },
        { it: "è una distanza fissa", fa: "فاصله‌ای ثابت است", verb: "è ← essere" },
      ],
      translation: "فاصله‌ی ایمنی فاصله‌ای ثابت است.",
      why:
        "غلط است. با سرعت، چسبندگیِ جاده، لاستیک، بار، ترمز و حالِ راننده عوض می‌شود. فقط دو مورد عدد دارند: ۱۰۰ متر بینِ خودروهایی که سبقتشان ممنوع شده، و ۲۰ متر پشتِ ماشینِ برف‌روب.",
      rule: `${CDS_149} c.1–3`,
      conceptStep: 2,
    },
    {
      sourceId: "963",
      sign: 24,
      textIt:
        "In presenza del segnale raffigurato è necessario moderare la velocità e tenere presente che la distanza di sicurezza aumenta in caso di ghiaccio",
      answer: 1,
      chunks: [
        { it: PRESENZA, fa: PRESENZA_FA },
        { it: "è necessario moderare la velocità", fa: "لازم است سرعت را کم کنی", verb: "è ← essere" },
        { it: "e tenere presente", fa: "و در نظر داشته باشی" },
        { it: "che la distanza di sicurezza aumenta", fa: "که فاصله‌ی ایمنی بیشتر می‌شود", verb: "aumenta ← aumentare" },
        { it: "in caso di ghiaccio", fa: "در صورتِ یخ‌زدگی", focus: "condition" },
      ],
      translation: "وقتی این تابلو هست، لازم است سرعت را کم کنی و در نظر داشته باشی که در صورتِ یخ‌زدگی، فاصله‌ی ایمنی بیشتر می‌شود.",
      why:
        "درست است. این تابلوی STRADA SDRUCCIOLEVOLE (جاده‌ی لغزنده) است. روی یخ چسبندگی خیلی کم است، پس هم ترمز طولانی‌تر می‌شود و هم فاصله‌ای که باید نگه داری.",
      rule: `${CDS_149} c.1; Banca dati ministeriale 6402`,
      conceptStep: 2,
    },
    {
      sourceId: "4340",
      textIt:
        "Quando si circola in autostrada, è possibile diminuire la distanza di sicurezza, in quanto non ci si aspetta una frenata improvvisa dal veicolo che precede",
      answer: 0,
      chunks: [
        { it: "Quando si circola in autostrada,", fa: "وقتی در آزادراه رانندگی می‌کنی،", focus: "condition", verb: "si circola ← circolare" },
        { it: "è possibile diminuire la distanza di sicurezza,", fa: "می‌توانی فاصله‌ی ایمنی را کم کنی،", verb: "è ← essere" },
        { it: "in quanto", fa: "چون", focus: "reason" },
        { it: "non ci si aspetta", fa: "انتظار نمی‌رود", focus: "negation", verb: "ci si aspetta ← aspettarsi" },
        { it: "una frenata improvvisa dal veicolo che precede", fa: "ترمزِ ناگهانیِ خودروی جلو" },
      ],
      translation: "وقتی در آزادراه رانندگی می‌کنی، می‌توانی فاصله‌ی ایمنی را کم کنی، چون انتظار نمی‌رود خودروی جلو ناگهان ترمز کند.",
      why:
        "غلط است. در آزادراه سرعت بالاست، پس هم مسافتِ واکنش و هم مسافتِ ترمز بلندترند، و خودروی جلو هر لحظه ممکن است ناگهان ترمز کند یا بایستد. فاصله باید بیشتر باشد، نه کمتر.",
      rule: `${CDS_149} c.1`,
      conceptStep: 1,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        // what the gap is for, and its minimum (reaction distance)
        "4207", "4227", "4232", "4233", "4237", "4246", "4251", ...range(4253, 4267),
        "4334", "4335", "4336", "4340", "4341", "6451",
      ],
    },
    {
      step: 2,
      sourceIds: [
        // what it depends on, and the only two fixed numbers (art. 149 c.2–3)
        ...range(4208, 4226), "4228", "4229", "4230", "4231", "4234", "4235", "4236",
        "4238", "4239", "4240", "4243", "4244", "4245", "4247", "4248", "4249",
        ...range(4314, 4331), "4337", "4338",
        // #363 (distance in a queue) is a Chapter 1 question: mapped in lessons-definizioni.ts.
        "4454", "5693", "5694", "5703", "6375", "6394", "6402", "6463",
        // STRADA SDRUCCIOLEVOLE (24), DISCESA PERICOLOSA (17), rain panel (139)
        "890", "963", "968", "972", "3871",
      ],
    },
  ],
};

export const VELOCITA_CHAPTER: Chapter = {
  id: "velocita-distanza-arresto",
  numbers: [11, 12],
  topicIds: [10, 11],
  nameIt: "Velocità, distanza di sicurezza e arresto",
  titleFa: "سرعت، فاصله‌ی ایمنی و توقف",
  summaryFa:
    "چقدر طول می‌کشد تا بایستی؟ چهار درس کوتاه: سرعتِ مناسب، مسافتِ واکنش، ترمز و کل مسافتِ توقف، و فاصله تا خودروی جلو.",
  reviewedOn: "2026-10-10",
  sources: [
    {
      label: "Codice della Strada (D.Lgs. 285/1992), artt. 141, 149 — testo vigente, agg. 24/04/2026",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    {
      label: "ACI, Codice della Strada art. 149 (pagina aggiornata il 9/10/2026)",
      url: "https://aci.gov.it/codice-della-strada/art-149/",
    },
    {
      label: "Polizia di Stato, «Comportamenti da tenere quando si guida»: tempo di reazione, distanza di sicurezza",
      url: "https://www.poliziadistato.it/articolo/pdf/10407",
    },
    {
      label: "Comune di Genova, «Determinazione dello spazio di arresto»: tempo di reazione 1 s, coefficienti di aderenza",
      url: "https://www2.comune.genova.it/sites/default/files/calcolo_spazio_di_frenata.pdf",
    },
    {
      label: "Comune di Firenze (2023, da WHO 2008), spazio di arresto: tempo di reazione 2,5 s",
      url: "https://www.comune.firenze.it/system/files/2023-01/infografica_spaziodiarresto.pdf",
    },
    {
      label: "WHO, Speed management (fonte OECD 2006): 27 / 36 / 58 m a 50 / 60 / 80 km/h",
      url: "https://cdn.who.int/media/docs/default-source/infographics-pdf/road-safety/speed-management-infographic-en.pdf",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023)",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [lessonAdeguata, lessonReazione, lessonFrenatura, lessonDistanza],
};
