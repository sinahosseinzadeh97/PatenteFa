/**
 * src/content/ch21-neve.ts
 * Chapter 21 (Incidenti stradali e comportamenti), lessons 4–5.
 *  L4 snow: winter tyres on all wheels or chains on the driving wheels (an
 *     ordinance can require them), slower, further, smoother; getting stuck in
 *     snow or sand (something under the slipping wheel; a higher gear).
 *  L5 ice: what to do and what the bank invents; grip from dry to ice (ice is
 *     the lowest, below snow) and progressive braking on slippery roads.
 *  6440 (slippery braking) sits in the bank's "obblighi" group; 6449 (snow vs
 *  ice) in "infossamento". Both are taught where their idea lives.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter21.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS = (n: string) => `Codice della Strada, art. ${n}`;
const POLIZIA = "Polizia di Stato, «Viaggiare in sicurezza: i consigli della Polizia» (24/01/2023)";
const NEVE = "Su strade coperte di neve";
const NEVE_FA = "روی جاده‌های پوشیده از برف";
const GHIACCIO = "In presenza di tratti di strada ghiacciati";
const GHIACCIO_FA = "وقتی بخش‌هایی از جاده یخ زده است";
const INFOSS = "In caso di infossamento su neve o sabbia,";
const INFOSS_FA = "وقتی خودرو در برف یا شن گیر کرده،";

// ── Lesson 4 ──────────────────────────────────────────────────────────────────

export const lessonNeve: Lesson = {
  id: "neve-infossamento",
  titleFa: "برف، و وقتی خودرو گیر می‌کند",
  titleIt: "NEVE · CATENE · INFOSSAMENTO",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی روی برف چه تجهیزاتی لازم است (لاستیکِ زمستانی روی همه‌ی چرخ‌ها یا زنجیرِ چرخ روی چرخ‌های محرک) و چطور می‌رانی (آهسته، دور، نرم). و می‌دانی وقتی خودرو در برف یا شن گیر کرده و چرخ درجا می‌چرخد چه کنی.",
      why:
        "۱۰ سؤال (سؤالِ فاصله‌ی ایمنی روی برف در فصلِ ۱۲ است). دامِ اصلیِ بانک «محکم‌تر»، «کامل» و «تند» است: ترمزِ محکم‌تر، گازِ کامل، فرمانِ تند. روی برف هر کدامشان چرخ را به لیز خوردن می‌اندازد.",
      rule: `${CDS("6")} c.4 lett. e; ${POLIZIA}`,
    },
    {
      kind: "table",
      title: "روی برف",
      body:
        "برف چسبندگی را خیلی کم می‌کند. مالکِ جاده می‌تواند با دستور (ordinanza) داشتنِ لاستیکِ زمستانی یا زنجیر را اجباری کند؛ تابلویش را در فصلِ ۴ دیدی. زنجیر روی چرخ‌های محرک بسته می‌شود: چرخ‌هایی که موتور می‌چرخاند.",
      columns: ["قاعده"],
      rows: [
        { label: "تجهیزات", it: "pneumatici invernali su tutte le ruote · catene sulle ruote motrici", values: ["لاستیکِ زمستانی روی همه‌ی چرخ‌ها، یا زنجیرِ چرخ روی چرخ‌های محرک. با زنجیر حداکثر ۵۰ کیلومتر در ساعت. پلیس توصیه می‌کند بستنِ زنجیر را قبل از سفر یک بار تمرین کنی."] },
        { label: "سرعت و فاصله", it: "moderare la velocità · aumentare la distanza di sicurezza", values: ["ترمز روی برف خیلی بلندتر است: آهسته‌تر برو و دورتر بمان."] },
        { label: "نرم", it: "evitare brusche manovre · brusche accelerazioni", values: ["گاز، ترمز و فرمان آرام و پیوسته. ترمز هم تدریجی. هر حرکتِ تند چرخ را به لیز خوردن می‌اندازد."] },
        { label: "دامِ بانک", it: "frenare con maggiore energia · a fondo · accelerare al massimo", values: ["ترمزِ محکم‌تر، ترمزِ کامل وقتی خودرو لیز می‌خورد، گازِ کامل موقعِ راه افتادن، فرمانِ تند برای فرار از خودروی ایستاده: همه غلط‌اند."] },
      ],
      takeaway: "برف = تجهیزات (زمستانی یا زنجیر) + آهسته + دور + نرم. «محکم»، «کامل» و «تند» در جمله یعنی غلط.",
      rule: `${CDS("6")} c.4 lett. e (ordinanze); ${POLIZIA} (catene, 50 km/h, frenata progressiva)`,
    },
    {
      kind: "table",
      title: "وقتی خودرو گیر کرده",
      body:
        "در برفِ نرم یا شن، چرخ ممکن است درجا بچرخد و خودرو تکان نخورد (infossamento). دو کار کمک می‌کند، هر دو برای این‌که چرخ دوباره به چیزی بگیرد:",
      columns: ["چه کنی"],
      rows: [
        { label: "چیزی زیرِ چرخ", it: "qualcosa che faccia attrito", values: ["زیرِ چرخی که درجا می‌چرخد چیزی بگذار که چرخ به آن بگیرد: تکه‌چوب، کفپوشِ خودرو."] },
        { label: "دنده‌ی بالاتر", it: "una marcia superiore", values: ["اگر با دنده‌ی یک راه نمی‌افتی، دنده‌ی بالاتر نیروی کمتری به چرخ می‌دهد و چرخ کمتر درجا می‌چرخد. پلیس همین را برای سربالاییِ برفی هم توصیه می‌کند."] },
      ],
      takeaway: "چرخِ درجاچرخان نیروی کمتر و چیزی برای گرفتن می‌خواهد، نه گازِ بیشتر.",
      rule: `${POLIZIA} (marcia superiore in salita); indicazione tecnica`,
    },
    {
      kind: "classify",
      title: "کارِ درست یا اشتباه؟",
      body: "هر موقعیت را بخوان. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "giusto", fa: "کارِ درست" },
        { it: "sbagliato", fa: "کارِ اشتباه" },
      ],
      items: [
        { prompt: "قبل از سفرِ کوهستانی یک بار بستنِ زنجیر را تمرین می‌کنی", answer: 0, explain: "وسطِ برف و ترافیک وقتِ یاد گرفتن نیست." },
        { prompt: "خودرو در برف درجا می‌چرخد؛ گاز را تا ته فشار می‌دهی", answer: 1, explain: "گازِ بیشتر چرخ را تندتر درجا می‌چرخاند و بیشتر فرو می‌برد." },
        { prompt: "خودرو روی برف لیز می‌خورد؛ ترمز را تا ته فشار می‌دهی", answer: 1, explain: "ترمزِ کامل چرخ را قفل می‌کند و فرمان دیگر نمی‌گیرد." },
        { prompt: "کفپوشِ خودرو را زیرِ چرخی که درجا می‌چرخد می‌گذاری", answer: 0, explain: "چرخ چیزی برای گرفتن پیدا می‌کند." },
        { prompt: "زنجیر را روی چرخ‌هایی می‌بندی که موتور نمی‌چرخاندشان", answer: 1, explain: "زنجیر روی چرخ‌های محرک بسته می‌شود؛ آن‌ها خودرو را می‌کشند." },
      ],
      takeaway: "روی برف کمتر بیشتر است: گازِ کمتر، ترمزِ نرم‌تر، دنده‌ی بالاتر برای راه افتادن.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "le strade coperte di neve", fa: "جاده‌های پوشیده از برف" },
        { it: "i pneumatici invernali", fa: "لاستیکِ زمستانی" },
        { it: "le catene (da neve)", fa: "زنجیرِ چرخ" },
        { it: "le ruote motrici", fa: "چرخ‌های محرک" },
        { it: "brusco · bruscamente", fa: "تند و ناگهانی" },
        { it: "frenare a fondo", fa: "ترمزِ کامل گرفتن" },
        { it: "l'infossamento", fa: "گیر کردن (در برف یا شن)" },
        { it: "la ruota che slitta", fa: "چرخی که درجا می‌چرخد" },
        { it: "una marcia superiore", fa: "دنده‌ی بالاتر" },
      ],
    },
    {
      kind: "trap",
      title: "«brusco»: پرهیز کن یا انجام بده؟",
      body: "هر دو جمله درباره‌ی حرکتِ تند روی برف است. یکی می‌گوید از آن پرهیز کن، دیگری می‌گوید انجامش بده:",
      examples: [
        {
          sourceId: "6395",
          textIt: "Su strade coperte di neve occorre evitare brusche manovre",
          answer: 1,
          chunks: [
            { it: NEVE, fa: NEVE_FA },
            { it: "occorre evitare brusche manovre", fa: "باید از حرکت‌های تند پرهیز کرد", verb: "occorre ← occorrere", focus: "negation" },
          ],
          translation: "روی جاده‌های پوشیده از برف باید از حرکت‌های تند پرهیز کرد.",
          why: "درست است. حرکتِ تند روی برف چسبندگیِ کم را از بین می‌برد.",
        },
        {
          sourceId: "6399",
          textIt: "Su strade coperte di neve occorre sterzare bruscamente per evitare di urtare veicoli fermi",
          answer: 0,
          chunks: [
            { it: NEVE, fa: NEVE_FA },
            { it: "occorre sterzare bruscamente", fa: "باید فرمان را تند چرخاند", verb: "occorre ← occorrere", focus: "contrast" },
            { it: "per evitare di urtare veicoli fermi", fa: "تا به خودروهای ایستاده نخوری", focus: "reason" },
          ],
          translation: "روی جاده‌های پوشیده از برف باید فرمان را تند چرخاند تا به خودروهای ایستاده نخوری.",
          why: "غلط است. فرمانِ تند روی برف خودرو را لیز می‌دهد؛ برای نرسیدن به خودروی ایستاده از قبل آهسته برو و فاصله بگیر.",
        },
      ],
      takeaway: "«evitare» پیش از «brusco» یعنی درست؛ «brusco» به‌عنوانِ راه‌حل یعنی غلط.",
      rule: POLIZIA,
    },
  ],
  practice: [
    {
      sourceId: "6392",
      textIt: "Su strade coperte di neve occorre montare pneumatici invernali su tutte le ruote oppure catene sulle ruote motrici",
      answer: 1,
      chunks: [
        { it: NEVE, fa: NEVE_FA },
        { it: "occorre montare pneumatici invernali su tutte le ruote", fa: "باید روی همه‌ی چرخ‌ها لاستیکِ زمستانی بست", verb: "occorre ← occorrere" },
        { it: "oppure catene sulle ruote motrici", fa: "یا روی چرخ‌های محرک زنجیر", focus: "contrast" },
      ],
      translation: "روی جاده‌های پوشیده از برف باید روی همه‌ی چرخ‌ها لاستیکِ زمستانی بست یا روی چرخ‌های محرک زنجیر.",
      why: "درست است (قدم ۱). زمستانی روی هر چهار چرخ، زنجیر روی چرخ‌هایی که موتور می‌چرخاند.",
      rule: `${CDS("6")} c.4 lett. e; ${POLIZIA}`,
      conceptStep: 1,
    },
    {
      sourceId: "6400",
      textIt: "Su strade coperte di neve occorre frenare a fondo in caso di sbandamento del veicolo",
      answer: 0,
      chunks: [
        { it: NEVE, fa: NEVE_FA },
        { it: "occorre frenare a fondo", fa: "باید ترمزِ کامل گرفت", verb: "occorre ← occorrere", focus: "contrast" },
        { it: "in caso di sbandamento del veicolo", fa: "وقتی خودرو به پهلو لیز می‌خورد", focus: "condition" },
      ],
      translation: "روی جاده‌های پوشیده از برف، وقتی خودرو به پهلو لیز می‌خورد باید ترمزِ کامل گرفت.",
      why: "غلط است (قدم ۱). ترمزِ کامل چرخ‌ها را قفل می‌کند و خودروی لیزخورده فرمان نمی‌گیرد. ترمز روی برف تدریجی است.",
      rule: POLIZIA,
      conceptStep: 1,
    },
    {
      sourceId: "6447",
      textIt: "In caso di infossamento su neve o sabbia, non riuscendo a spostare il veicolo, è consigliabile inserire sotto la ruota che slitta qualcosa che faccia attrito (pezzi di legno, tappeti del veicolo, ecc.)",
      answer: 1,
      chunks: [
        { it: INFOSS, fa: INFOSS_FA },
        { it: "non riuscendo a spostare il veicolo,", fa: "اگر نتوانی خودرو را تکان بدهی،", verb: "riuscendo ← riuscire", focus: "condition" },
        { it: "è consigliabile inserire sotto la ruota che slitta", fa: "بهتر است زیرِ چرخی که درجا می‌چرخد بگذاری", verb: "inserire ← inserire" },
        { it: "qualcosa che faccia attrito (pezzi di legno, tappeti del veicolo, ecc.)", fa: "چیزی که چرخ به آن بگیرد (تکه‌چوب، کفپوشِ خودرو و…)" },
      ],
      translation: "وقتی خودرو در برف یا شن گیر کرده، اگر نتوانی تکانش بدهی، بهتر است زیرِ چرخی که درجا می‌چرخد چیزی بگذاری که چرخ به آن بگیرد (تکه‌چوب، کفپوشِ خودرو و…).",
      why: "درست است (قدم ۲). چرخ چیزی برای گرفتن پیدا می‌کند و خودرو راه می‌افتد.",
      rule: "Indicazione tecnica",
      conceptStep: 2,
    },
    {
      sourceId: "6448",
      textIt: "In caso di infossamento su neve o sabbia, non riuscendo a partire con la prima marcia è opportuno innestare una marcia superiore",
      answer: 1,
      chunks: [
        { it: INFOSS, fa: INFOSS_FA },
        { it: "non riuscendo a partire con la prima marcia", fa: "اگر با دنده‌ی یک راه نیفتی", verb: "riuscendo ← riuscire", focus: "condition" },
        { it: "è opportuno innestare una marcia superiore", fa: "بهتر است دنده‌ی بالاتر بگذاری", verb: "innestare ← innestare" },
      ],
      translation: "وقتی خودرو در برف یا شن گیر کرده، اگر با دنده‌ی یک راه نیفتی، بهتر است دنده‌ی بالاتر بگذاری.",
      why: "درست است (قدم ۲). دنده‌ی بالاتر نیروی کمتری به چرخ می‌دهد و چرخ کمتر درجا می‌چرخد.",
      rule: `${POLIZIA} (marcia superiore)`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6392", "6393", "6395", "6396", "6397", "6398", "6399", "6400"] },
    { step: 2, sourceIds: ["6447", "6448"] },
  ],
};

// ── Lesson 5 ──────────────────────────────────────────────────────────────────

export const lessonGhiaccio: Lesson = {
  id: "ghiaccio-aderenza",
  titleFa: "یخ، و چسبندگیِ لاستیک",
  titleIt: "STRADA GHIACCIATA · ADERENZA · FRENATA",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی روی یخ چه کارهایی درست است (آهسته، دور، دنده‌ی سنگین در سرازیری، دقت در سایه، فاصله از روبه‌رویی) و کدام‌ها ساختگی‌اند. و ترتیبِ چسبندگی را می‌دانی: خشک، خیس، برف، یخ؛ یخ از همه کمتر.",
      why:
        "۱۲ سؤال (سؤالِ فاصله‌ی ایمنی روی یخ در فصلِ ۱۲ است). بانک کارهای «آشنا» ولی خطرناک را کنارِ کارهای درست می‌گذارد: دنده خلاص، چسبیدن به گاردریل، ترمزِ محکم. و یک بار ترتیبِ برف و یخ را برعکس می‌کند.",
      rule: `${CDS("141")} c.2; ${POLIZIA}`,
    },
    {
      kind: "factors",
      title: "روی یخ: چه کنی، چه نکنی",
      body:
        "یخ کم‌چسبندگی‌ترین سطح است. هر کارِ درست یکی از دو هدف را دارد: کمتر به ترمز نیاز داشته باشی، و اگر خودرو لیز خورد جا داشته باشی. جاهای سایه‌گیر (پشتِ کوه، زیرِ پل، کنارِ دیوار) دیرتر آب می‌شوند و ممکن است یخ بمانند وقتی بقیه‌ی جاده خشک است. در سرازیری دنده‌ی سنگین سرعت را نگه می‌دارد و ترمز کمتر لازم است. چهارچرخ‌محرک، اگر خودرو دارد، کمک می‌کند خودرو بکشد و راه بیفتد؛ ترمز را کوتاه‌تر نمی‌کند.",
      columns: [
        {
          title: "درست (VERO)",
          items: [
            { fa: "از مسیرِ خودروهای روبه‌رو فاصله بگیر", it: "distanziarsi dalla traiettoria dei veicoli che si incrociano", sourceId: "6403", textIt: "In presenza di tratti di strada ghiacciati è opportuno distanziarsi dalla traiettoria dei veicoli che si incrociano", answer: 1 },
            { fa: "دقتِ بیشتر در جاهای سایه‌گیر", it: "maggiore attenzione nel transito su zone in ombra", sourceId: "6406", textIt: "In presenza di tratti di strada ghiacciati è opportuno usare maggiore attenzione nel transito su zone in ombra", answer: 1 },
          ],
        },
        {
          title: "غلط (FALSO)",
          items: [
            { fa: "به جای زنجیر، لاستیکِ میخ‌دار فقط روی چرخ‌های جلو", it: "non usare le catene, ma gomme chiodate sulle ruote anteriori", sourceId: "6409", textIt: "In presenza di tratti di strada ghiacciati è opportuno non usare le catene, ma gomme chiodate sulle ruote anteriori", answer: 0 },
            { fa: "هر بار که خودرویی از روبه‌رو می‌آید محکم ترمز کن", it: "frenare energicamente ogni volta che si incrocia un altro veicolo", sourceId: "6410", textIt: "In presenza di tratti di strada ghiacciati è opportuno frenare energicamente ogni volta che si incrocia un altro veicolo", answer: 0 },
          ],
        },
      ],
      takeaway: "روی یخ: آهسته، دور، دنده‌ی سنگین در سرازیری، چشم به سایه‌ها. ترمزِ محکم و دنده خلاص نه.",
      rule: `${CDS("141")} c.2; ${POLIZIA}`,
    },
    {
      kind: "table",
      title: "چسبندگی: از خشک تا یخ",
      body:
        "چسبندگی یعنی لاستیک چقدر به جاده «می‌گیرد». هرچه کمتر، ترمز بلندتر و لیز خوردن راحت‌تر. ترتیب ثابت است:",
      columns: ["یعنی"],
      rows: [
        { label: "آسفالتِ خشک", it: "fondo asciutto", values: ["بیشترین چسبندگی، کوتاه‌ترین ترمز."] },
        { label: "خیس", it: "fondo bagnato", values: ["کمتر؛ با آبِ زیاد آکواپلنینگ (درسِ ۳)."] },
        { label: "برف", it: "strada innevata", values: ["خیلی کمتر؛ زنجیر یا لاستیکِ زمستانی (درسِ ۴)."] },
        { label: "یخ", it: "strada ghiacciata", values: ["از همه کمتر، حتی کمتر از برف."] },
        {
          label: "ترمز روی سطحِ لغزنده",
          it: "frenata su strada sdrucciolevole",
          values: ["تدریجی. فشارِ کامل چرخ‌ها را قفل می‌کند؛ چرخِ قفل‌شده لیز می‌خورد و فرمان نمی‌گیرد. در ترمزِ اضطراری، ABS (اگر خودرو دارد) جلوی قفل شدن را می‌گیرد؛ جمله‌ی بانک قاعده‌ی کلی را می‌سنجد."],
        },
      ],
      takeaway: "خشک > خیس > برف > یخ. روی هر سطحِ لغزنده ترمز تدریجی است، نه کامل.",
      rule: `${POLIZIA} (frenata progressiva); indicazione tecnica`,
    },
    {
      kind: "classify",
      title: "کارِ درست یا اشتباه؟",
      body: "هر موقعیت را بخوان. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "giusto", fa: "کارِ درست" },
        { it: "sbagliato", fa: "کارِ اشتباه" },
      ],
      items: [
        { prompt: "صبحِ زمستان جاده آفتابی و خشک است، ولی جلوتر زیرِ پل سایه است؛ قبل از پل آهسته می‌کنی", answer: 0, explain: "سایه دیرتر آب می‌شود و ممکن است هنوز یخ باشد." },
        { prompt: "در سرازیریِ یخ‌زده دنده را خلاص می‌کنی تا خودرو آزاد برود", answer: 1, explain: "در دنده خلاص موتور سرعت را نگه نمی‌دارد و همه‌چیز به ترمز می‌افتد." },
        { prompt: "خودرو چهارچرخ‌محرک دارد؛ روی یخ آن را درگیر می‌کنی", answer: 0, explain: "کشش بهتر می‌شود؛ ولی فاصله و سرعت را هم مثلِ همیشه رعایت کن." },
        { prompt: "روی جاده‌ی یخ‌زده همان فاصله‌ی جاده‌ی خشک را با جلویی نگه می‌داری", answer: 1, explain: "روی یخ ترمز خیلی بلندتر است؛ فاصله باید خیلی بیشتر باشد." },
      ],
      takeaway: "روی یخ هر چیزی که به ترمز وابسته‌ات کند اشتباه است؛ هر چیزی که جا و زمان بدهد درست.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "i tratti di strada ghiacciati", fa: "بخش‌های یخ‌زده‌ی جاده" },
        { it: "le zone in ombra", fa: "جاهای سایه‌گیر" },
        { it: "le marce basse", fa: "دنده‌های سنگین" },
        { it: "il cambio in folle", fa: "دنده خلاص" },
        { it: "la doppia trazione", fa: "چهارچرخ‌محرک" },
        { it: "le gomme chiodate", fa: "لاستیکِ میخ‌دار" },
        { it: "la strada sdrucciolevole", fa: "جاده‌ی لغزنده" },
        { it: "la strada innevata", fa: "جاده‌ی برفی" },
        { it: "l'aderenza", fa: "چسبندگی (لاستیک به جاده)" },
      ],
    },
    {
      kind: "trap",
      title: "«procedere»: چطور برانی؟",
      body: "هر دو جمله می‌گویند روی یخ «چطور جلو بروی». یکی درست است، یکی خطرناک:",
      examples: [
        {
          sourceId: "6401",
          textIt: "In presenza di tratti di strada ghiacciati è opportuno procedere a velocità moderata",
          answer: 1,
          chunks: [
            { it: GHIACCIO, fa: GHIACCIO_FA },
            { it: "è opportuno procedere a velocità moderata", fa: "بهتر است با سرعتِ کم جلو بروی", verb: "è ← essere" },
          ],
          translation: "وقتی بخش‌هایی از جاده یخ زده است، بهتر است با سرعتِ کم جلو بروی.",
          why: "درست است. سرعتِ کم یعنی ترمزِ کوتاه‌تر و نیازِ کمتر به فرمانِ تند.",
        },
        {
          sourceId: "6411",
          textIt: "In presenza di tratti di strada ghiacciati è opportuno procedere con il cambio in folle",
          answer: 0,
          chunks: [
            { it: GHIACCIO, fa: GHIACCIO_FA },
            { it: "è opportuno procedere con il cambio in folle", fa: "بهتر است با دنده خلاص جلو بروی", verb: "è ← essere", focus: "contrast" },
          ],
          translation: "وقتی بخش‌هایی از جاده یخ زده است، بهتر است با دنده خلاص جلو بروی.",
          why: "غلط است. در دنده خلاص موتور سرعت را مهار نمی‌کند و کنترلِ کمتری داری؛ روی یخ، به‌خصوص در سرازیری، دنده‌ی سنگین درست است.",
        },
      ],
      takeaway: "روی یخ: سرعتِ کم و دنده‌ی درگیر. هر چیزی که خودرو را «آزاد» بگذارد غلط است.",
      rule: POLIZIA,
    },
  ],
  practice: [
    {
      sourceId: "6407",
      textIt: "In presenza di tratti di strada ghiacciati è opportuno innestare la doppia trazione, se il veicolo ne è provvisto",
      answer: 1,
      chunks: [
        { it: GHIACCIO, fa: GHIACCIO_FA },
        { it: "è opportuno innestare la doppia trazione,", fa: "بهتر است چهارچرخ‌محرک را درگیر کنی،", verb: "innestare ← innestare" },
        { it: "se il veicolo ne è provvisto", fa: "اگر خودرو آن را دارد", focus: "condition" },
      ],
      translation: "وقتی بخش‌هایی از جاده یخ زده است، اگر خودرو چهارچرخ‌محرک دارد، بهتر است درگیرش کنی.",
      why: "درست است (قدم ۱). نیرو بینِ چهار چرخ پخش می‌شود و خودرو بهتر می‌کشد؛ ترمز را کوتاه‌تر نمی‌کند.",
      rule: "Indicazione tecnica",
      conceptStep: 1,
    },
    {
      sourceId: "6405",
      textIt: "In presenza di tratti di strada ghiacciati è opportuno evitare brusche accelerazioni",
      answer: 1,
      chunks: [
        { it: GHIACCIO, fa: GHIACCIO_FA },
        { it: "è opportuno evitare brusche accelerazioni", fa: "بهتر است از گازِ تند پرهیز کنی", verb: "evitare ← evitare", focus: "negation" },
      ],
      translation: "وقتی بخش‌هایی از جاده یخ زده است، بهتر است از گازِ تند پرهیز کنی.",
      why: "درست است (قدم ۱). گازِ تند چرخ‌ها را روی یخ درجا می‌چرخاند.",
      rule: POLIZIA,
      conceptStep: 1,
    },
    {
      sourceId: "6449",
      textIt: "Su una strada innevata l'aderenza del veicolo è minore che su una strada ghiacciata",
      answer: 0,
      chunks: [
        { it: "Su una strada innevata", fa: "روی جاده‌ی برفی" },
        { it: "l'aderenza del veicolo è minore", fa: "چسبندگیِ خودرو کمتر است", verb: "è ← essere", focus: "contrast" },
        { it: "che su una strada ghiacciata", fa: "از جاده‌ی یخ‌زده" },
      ],
      translation: "روی جاده‌ی برفی چسبندگیِ خودرو کمتر از جاده‌ی یخ‌زده است.",
      why: "غلط است (قدم ۲). برعکس: یخ کم‌چسبندگی‌ترین سطح است، حتی کمتر از برف.",
      rule: "Indicazione tecnica",
      conceptStep: 2,
    },
    {
      sourceId: "6440",
      textIt: "Su strada sdrucciolevole, per garantire le migliori condizioni di aderenza in frenata, è opportuno premere a fondo il pedale del freno",
      answer: 0,
      chunks: [
        { it: "Su strada sdrucciolevole,", fa: "روی جاده‌ی لغزنده،" },
        { it: "per garantire le migliori condizioni di aderenza in frenata,", fa: "برای بهترین چسبندگی در ترمز،", focus: "reason" },
        { it: "è opportuno premere a fondo il pedale del freno", fa: "بهتر است پدالِ ترمز را تا ته فشار دهی", verb: "premere ← premere", focus: "contrast" },
      ],
      translation: "روی جاده‌ی لغزنده، برای بهترین چسبندگی در ترمز، بهتر است پدالِ ترمز را تا ته فشار دهی.",
      why: "غلط است (قدم ۲). فشارِ کامل چرخ‌ها را قفل می‌کند و چرخِ قفل‌شده لیز می‌خورد؛ روی سطحِ لغزنده ترمز تدریجی است.",
      rule: `${POLIZIA} (frenata progressiva)`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6401", "6403", "6404", "6405", "6406", "6407", "6408", "6409", "6410", "6411"] },
    { step: 2, sourceIds: ["6440", "6449"] },
  ],
};
