/**
 * src/content/ch1-veicoli.ts
 * Chapter 1, lessons 7–9: light two/three/four-wheelers, autoveicoli and
 * trailers, agricultural/work machines and the rear panels of heavy vehicles.
 * Same trust rules as src/content/ch1-strada.ts.
 */
import type { Lesson, SignRef } from "./lessons.js";

const range = (from: number, to: number): string[] =>
  Array.from({ length: to - from + 1 }, (_, i) => String(from + i));

const PANEL_TRUCK: SignRef = { sign: 304, nameIt: "AUTOCARRO OLTRE 3,5 t", nameFa: "کامیون بیش از ۳٫۵ تن" };
const PANEL_TRAILER: SignRef = { sign: 305, nameIt: "RIMORCHIO OLTRE 3,5 t", nameFa: "یدک و نیم‌یدک بیش از ۳٫۵ تن" };

// ── Lesson 7 ──────────────────────────────────────────────────────────────────

export const lessonDueRuote: Lesson = {
  id: "ciclomotori-motocicli-quadricicli",
  titleFa: "موپد، موتورسیکلت، سه‌چرخ و چهارچرخ سبک",
  titleIt: "CICLOMOTORI · MOTOCICLI · TRICICLI · QUADRICICLI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس با دیدن تعداد چرخ، حجم موتور و حداکثر سرعت می‌گویی یک وسیله موپد است، موتورسیکلت، سه‌چرخ یا چهارچرخ، و می‌دانی کدام‌شان از نظر قانون مثل موپد حساب می‌شوند.",
      why: "۴۳ سؤال این فصل همین مرزها را می‌سنجند: ۵۰ سی‌سی، ۴۵ کیلومتر بر ساعت، دو یا سه چرخ. یک عدد جابه‌جا شود و جواب عوض می‌شود.",
    },
    {
      kind: "table",
      title: "مرزها: ۵۰ سی‌سی و ۴۵ کیلومتر",
      body: "دو عدد را حفظ کن: موتور بنزینی ۵۰ سی‌سی و سرعت ۴۵ کیلومتر بر ساعت. زیر این مرز موپد است، بالایش موتورسیکلت یا سه‌چرخ. همه‌ی این‌ها معاینه‌ی فنی (revisione) دارند: اولی ۴ سال بعد از ثبت، بعد هر ۲ سال.",
      columns: ["چرخ", "موتور و سرعت", "نکته‌ی آزمون"],
      rows: [
        { label: "موپد", it: "ciclomotore", values: ["۲ یا ۳", "بنزینی حداکثر ۵۰ سی‌سی (برقی حداکثر ۴ کیلووات)، حداکثر ۴۵ کیلومتر", "سه‌چرخ هم می‌تواند موپد باشد؛ دنده‌ی دستی شرط نیست"] },
        { label: "موتورسیکلت", it: "motociclo", values: ["۲", "بیش از ۵۰ سی‌سی", "موپد جزو موتورسیکلت‌ها نیست؛ ممکن است دنده‌اتومات باشد"] },
        { label: "سه‌چرخ موتوری", it: "triciclo a motore", values: ["۳ چرخ متقارن", "بیش از ۵۰ سی‌سی یا بیش از ۴۵ کیلومتر", "گواهینامه لازم دارد؛ موتور با سایدکار نیست"] },
        { label: "چهارچرخ سبک", it: "quadriciclo leggero", values: ["۴", "بنزینی حداکثر ۵۰ سی‌سی، حداکثر ۴۵ کیلومتر", "از نظر تردد مثل موپد حساب می‌شود؛ دست بردن در موتور یا اگزوز برای سرعت بیشتر ممنوع"] },
        { label: "چهارچرخ غیرسبک", it: "quadriciclo non leggero", values: ["۴", "توان حداکثر ۱۵ کیلووات", "مثل موپد نیست؛ گواهینامه لازم دارد و با بدنه‌ی باز و فرمان دسته‌ای کلاه ایمنی اجباری است"] },
      ],
      takeaway: "دوچرخه با پدال کمکی برقی (حداکثر ۰٫۲۵ کیلووات) موپد نیست؛ دوچرخه است.",
      rule: "CdS artt. 50, 52, 53, 80 c.4; Reg. (UE) 168/2013, categorie L1e–L7e",
    },
    {
      kind: "classify",
      title: "این وسیله چیست؟",
      body: "برای هر وسیله دسته‌اش را انتخاب کن. این‌ها نمونه‌های آموزشی‌اند، نه سؤال بانک.",
      options: [
        { it: "velocipede", fa: "دوچرخه" },
        { it: "ciclomotore", fa: "موپد" },
        { it: "motociclo", fa: "موتورسیکلت" },
        { it: "triciclo a motore", fa: "سه‌چرخ موتوری" },
        { it: "quadriciclo", fa: "چهارچرخ" },
      ],
      items: [
        { prompt: "اسکوتر دوچرخ با موتور بنزینی ۵۰ سی‌سی که حداکثر ۴۵ کیلومتر بر ساعت می‌رود", answer: 1, explain: "هر دو عدد روی مرز موپد است: حداکثر ۵۰ سی‌سی و حداکثر ۴۵ کیلومتر." },
        { prompt: "موتور دوچرخ ۱۲۵ سی‌سی، دنده‌اتومات", answer: 2, explain: "بیش از ۵۰ سی‌سی و دوچرخ، پس موتورسیکلت. دنده‌اتومات بودن دسته را عوض نمی‌کند." },
        { prompt: "وانت کوچک سه‌چرخ با موتور ۵۰ سی‌سی و حداکثر ۴۵ کیلومتر", answer: 1, explain: "موپد می‌تواند سه‌چرخ باشد و حتی بار ببرد. مرز ۵۰ سی‌سی و ۴۵ کیلومتر تعیین‌کننده است." },
        { prompt: "وسیله‌ی سه‌چرخ با چرخ‌های متقارن و موتور ۲۰۰ سی‌سی", answer: 3, explain: "سه چرخ متقارن و بیش از ۵۰ سی‌سی: سه‌چرخ موتوری." },
        { prompt: "خودروی کوچک چهارچرخ با موتور ۵۰ سی‌سی و حداکثر ۴۵ کیلومتر", answer: 4, explain: "چهارچرخ سبک است و از نظر تردد مثل موپد حساب می‌شود، ولی دسته‌اش quadriciclo است." },
        { prompt: "دوچرخه با پدال کمکی برقی ۰٫۲۵ کیلووات", answer: 0, explain: "موتور فقط به رکاب زدن کمک می‌کند؛ قانون آن را دوچرخه می‌داند، نه موپد." },
      ],
      takeaway: "اول چرخ‌ها را بشمار، بعد ببین از مرز ۵۰ سی‌سی و ۴۵ کیلومتر رد شده یا نه.",
    },
    {
      kind: "terms",
      title: "کلمه‌های این درس",
      terms: [
        { it: "il ciclomotore", fa: "موپد" },
        { it: "il motociclo", fa: "موتورسیکلت" },
        { it: "il triciclo a motore", fa: "سه‌چرخ موتوری" },
        { it: "il quadriciclo leggero", fa: "چهارچرخ سبک" },
        { it: "la cilindrata", fa: "حجم موتور" },
        { it: "assimilati a", fa: "هم‌ردیفِ، مثلِ … حساب می‌شوند", base: "assimilare" },
        { it: "la revisione", fa: "معاینه‌ی فنی" },
        { it: "la prima immatricolazione", fa: "اولین ثبت (شماره‌گذاری)" },
      ],
    },
    {
      kind: "trap",
      title: "تله: موپد دو چرخ دارد یا سه؟",
      body: "در ذهن بیشتر ما موپد دوچرخ است. قانون سه‌چرخ را هم موپد می‌داند، اگر زیر مرزها بماند.",
      examples: [
        {
          sourceId: "231",
          textIt: "I ciclomotori possono avere due o tre ruote",
          answer: 1,
          chunks: [
            { it: "I ciclomotori", fa: "موپدها" },
            { it: "possono avere", fa: "می‌توانند داشته باشند", verb: "possono ← potere" },
            { it: "due o tre ruote", fa: "دو یا سه چرخ" },
          ],
          translation: "موپدها می‌توانند دو یا سه چرخ داشته باشند.",
          why: "درست است. این عین تعریف قانون است.",
        },
        {
          sourceId: "235",
          textIt: "I ciclomotori non hanno più di due ruote",
          answer: 0,
          chunks: [
            { it: "I ciclomotori", fa: "موپدها" },
            { it: "non hanno più di", fa: "بیش از … ندارند", focus: "negation", verb: "hanno ← avere" },
            { it: "due ruote", fa: "دو چرخ" },
          ],
          translation: "موپدها بیش از دو چرخ ندارند.",
          why: "غلط است. موپد می‌تواند سه چرخ داشته باشد.",
        },
      ],
      takeaway: "موپد: ۲ یا ۳ چرخ. موتورسیکلت: فقط ۲ چرخ.",
    },
  ],
  practice: [
    {
      sourceId: "233",
      textIt: "I ciclomotori a due ruote non possono avere un motore termico di cilindrata superiore a 50 cm3",
      answer: 1,
      chunks: [
        { it: "I ciclomotori a due ruote", fa: "موپدهای دوچرخ" },
        { it: "non possono avere", fa: "نمی‌توانند داشته باشند", focus: "negation", verb: "possono ← potere" },
        { it: "un motore termico", fa: "موتور احتراقی" },
        { it: "di cilindrata superiore a 50 cm3", fa: "با حجم بیش از ۵۰ سی‌سی", focus: "limit" },
      ],
      translation: "موپدهای دوچرخ نمی‌توانند موتور احتراقی با حجم بیش از ۵۰ سی‌سی داشته باشند.",
      why: "درست است. ۵۰ سی‌سی سقف موپد است؛ بالاتر از آن موتورسیکلت می‌شود.",
      rule: "CdS art. 52 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "236",
      textIt: "Le biciclette con pedalata assistita, dotate di motore elettrico ausiliario di potenza massima fino a 0,25 kW, sono definite ciclomotori",
      answer: 0,
      chunks: [
        { it: "Le biciclette con pedalata assistita,", fa: "دوچرخه‌های با پدال کمکی،" },
        { it: "dotate di motore elettrico ausiliario", fa: "مجهز به موتور برقی کمکی" },
        { it: "di potenza massima fino a 0,25 kW,", fa: "با توان حداکثر ۰٫۲۵ کیلووات،" },
        { it: "sono definite ciclomotori", fa: "موپد تعریف می‌شوند", verb: "definite ← definire" },
      ],
      translation: "دوچرخه‌های با پدال کمکی که موتور برقی کمکی با توان حداکثر ۰٫۲۵ کیلووات دارند، موپد تعریف می‌شوند.",
      why: "غلط است. قانون این‌ها را دوچرخه (velocipede) می‌داند، نه موپد.",
      rule: "CdS art. 50 c.1",
      conceptStep: 2,
    },
    {
      sourceId: "247",
      textIt: "I tricicli a motore sono veicoli con motore di cilindrata inferiore a 50 cm3 e aventi velocità massima per costruzione fino a 45 km/h",
      answer: 0,
      chunks: [
        { it: "I tricicli a motore", fa: "سه‌چرخ‌های موتوری" },
        { it: "sono veicoli con motore di cilindrata inferiore a 50 cm3", fa: "وسایلی با موتور کمتر از ۵۰ سی‌سی هستند" },
        { it: "e aventi velocità massima per costruzione fino a 45 km/h", fa: "که حداکثر سرعت ساختشان تا ۴۵ کیلومتر بر ساعت است", focus: "limit" },
      ],
      translation: "سه‌چرخ‌های موتوری وسایلی با موتور کمتر از ۵۰ سی‌سی هستند که حداکثر سرعت ساختشان تا ۴۵ کیلومتر بر ساعت است.",
      why: "غلط است. این مشخصاتِ موپد سه‌چرخ است. سه‌چرخ موتوری از این مرزها بالاتر است.",
      rule: "CdS art. 52; Reg. (UE) 168/2013, cat. L5e",
      conceptStep: 1,
    },
    {
      sourceId: "251",
      textIt: "I quadricicli leggeri, ai fini della circolazione, sono assimilati ai ciclomotori",
      answer: 1,
      chunks: [
        { it: "I quadricicli leggeri,", fa: "چهارچرخ‌های سبک،" },
        { it: "ai fini della circolazione,", fa: "از نظر تردد،" },
        { it: "sono assimilati ai ciclomotori", fa: "مثل موپد حساب می‌شوند", verb: "assimilati ← assimilare" },
      ],
      translation: "چهارچرخ‌های سبک از نظر تردد مثل موپد حساب می‌شوند.",
      why: "درست است. همان مرزهای ۵۰ سی‌سی و ۴۵ کیلومتر را دارند.",
      rule: "Reg. (UE) 168/2013, cat. L6e",
      conceptStep: 1,
    },
    {
      sourceId: "318",
      textIt: "Ai fini della circolazione i quadricicli leggeri sono assimilati ai motocicli",
      answer: 0,
      chunks: [
        { it: "Ai fini della circolazione", fa: "از نظر تردد" },
        { it: "i quadricicli leggeri", fa: "چهارچرخ‌های سبک" },
        { it: "sono assimilati ai motocicli", fa: "مثل موتورسیکلت حساب می‌شوند", verb: "assimilati ← assimilare" },
      ],
      translation: "چهارچرخ‌های سبک از نظر تردد مثل موتورسیکلت حساب می‌شوند.",
      why: "غلط است. همان جمله‌ی قبلی است با یک کلمه‌ی عوض‌شده: چهارچرخ سبک مثل موپد است، نه موتورسیکلت.",
      rule: "Reg. (UE) 168/2013, cat. L6e",
      conceptStep: 1,
    },
  ],
  related: [
    { step: 1, sourceIds: [...range(241, 261), ...range(308, 318)] },
    { step: 2, sourceIds: range(230, 240) },
  ],
};

// ── Lesson 8 ──────────────────────────────────────────────────────────────────

export const lessonAutoveicoli: Lesson = {
  id: "autoveicoli-e-rimorchi",
  titleFa: "خودرو، اتوبوس، کامیون، یدک و کاروان",
  titleIt: "AUTOVEICOLI · AUTOVETTURE · RIMORCHI · CARAVAN",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی autoveicolo چیست، سواری (autovettura) چند نفر جا دارد، چه چیزی rimorchio است و فرق caravan با camper را می‌گویی.",
      why: "۴۸ سؤال درباره‌ی همین دسته‌هاست. تله‌ها معمولاً یک وسیله را در دسته‌ی اشتباه می‌گذارند: سه‌چرخ در autoveicoli یا caravan بیرون از rimorchi.",
    },
    {
      kind: "table",
      title: "درخت دسته‌ها",
      body: "autoveicolo یعنی وسیله‌ی موتوری با حداقل چهار چرخ، به جز چهارچرخ‌های سبک و سنگین (quadricicli). rimorchio یعنی وسیله‌ی بدون موتور که کشیده می‌شود.",
      columns: ["دسته", "تعریف کوتاه"],
      rows: [
        { label: "سواری", it: "autovettura", values: ["autoveicolo", "برای مسافر، حداکثر ۹ صندلی با راننده؛ می‌تواند برقی باشد و یدک بکشد"] },
        { label: "اتوبوس", it: "autobus", values: ["autoveicolo", "برای مسافر، بیش از ۹ صندلی؛ پس سواری نیست"] },
        { label: "کامیون", it: "autocarro", values: ["autoveicolo", "برای بار؛ سواری نیست"] },
        { label: "کمپر", it: "autocaravan (camper)", values: ["autoveicolo", "بدنه‌ی مخصوص و تجهیز دائمی برای حمل و اقامت"] },
        { label: "سه‌چرخ / چهارچرخ", it: "triciclo / quadriciclo", values: ["autoveicolo نیستند", "دسته‌ی جداگانه دارند (درس قبل)"] },
        { label: "یدک", it: "rimorchio", values: ["rimorchio", "بدون موتور؛ یدک سبک حداکثر ۷۵۰ کیلوگرم با بار کامل"] },
        { label: "نیم‌یدک", it: "semirimorchio", values: ["rimorchio", "بخشی از آن روی کشنده قرار می‌گیرد؛ سیستم ترمز دارد"] },
        { label: "کاروان", it: "caravan (roulotte)", values: ["rimorchio", "برای اقامت، فقط وقتی متوقف است"] },
      ],
      takeaway: "اتوبوس مفصلی (autosnodato) و کمپر autoveicolo هستند، نه rimorchio. کاروان rimorchio است.",
      rule: "CdS artt. 54, 56; art. 80",
    },
    {
      kind: "classify",
      title: "autoveicolo، rimorchio یا هیچ‌کدام؟",
      body: "برای هر وسیله دسته‌اش را انتخاب کن. نمونه‌ها آموزشی‌اند، نه سؤال بانک.",
      options: [
        { it: "autoveicolo", fa: "autoveicolo" },
        { it: "rimorchio", fa: "rimorchio (یدک)" },
        { it: "né l'uno né l'altro", fa: "هیچ‌کدام" },
      ],
      items: [
        { prompt: "اتوبوس شهری ۵۰ نفره", answer: 0, explain: "وسیله‌ی موتوری با بیش از چهار چرخ و بیش از ۹ صندلی: autoveicolo، از نوع autobus." },
        { prompt: "کاروانی که پشت سواری بسته می‌شود", answer: 1, explain: "موتور ندارد و کشیده می‌شود: rimorchio." },
        { prompt: "کمپر (autocaravan) با موتور خودش", answer: 0, explain: "موتور دارد و چهارچرخ است: autoveicolo. با caravan قاطی‌اش نکن." },
        { prompt: "چهارچرخ سبک ۴۵ کیلومتری", answer: 2, explain: "quadricicli صراحتاً از autoveicoli کنار گذاشته شده‌اند." },
        { prompt: "سه‌چرخ موتوری ۲۰۰ سی‌سی", answer: 2, explain: "سه چرخ دارد؛ autoveicolo حداقل چهار چرخ دارد." },
        { prompt: "اتوبوس مفصلی (autosnodato)", answer: 0, explain: "یک وسیله‌ی موتوری یکپارچه است، نه یدک: autoveicolo." },
      ],
      takeaway: "موتور دارد و حداقل چهار چرخ (نه quadriciclo)؟ autoveicolo. موتور ندارد و کشیده می‌شود؟ rimorchio.",
    },
    {
      kind: "table",
      title: "کاروان یا کمپر؟",
      body: "هر دو برای اقامت‌اند، ولی یکی موتور دارد و دیگری نه.",
      columns: ["caravan (roulotte)", "autocaravan (camper)"],
      rows: [
        { label: "موتور", values: ["ندارد", "دارد"] },
        { label: "دسته", values: ["rimorchio", "autoveicolo؛ rimorchio نیست"] },
        { label: "اقامت", values: ["فقط وقتی متوقف است؛ حین حرکت ممنوع", "حداکثر به تعداد نفراتی که در کارت خودرو آمده"] },
        { label: "پلاک", values: ["دارد", "دارد"] },
        { label: "ایستاده سفر کردن", values: ["—", "ممنوع، حتی برای مسیر کوتاه"] },
        { label: "معاینه‌ی فنی", values: ["—", "دوره‌ای دارد (نه «هر پنج سال»)"] },
      ],
      takeaway: "caravan = یدکِ اقامتی، فقط در توقف. camper = خودروی اقامتی.",
      rule: "CdS art. 54 c.1 lett. m; art. 56 c.2 lett. e",
    },
    {
      kind: "terms",
      title: "کلمه‌های این درس",
      terms: [
        { it: "l'autoveicolo", fa: "وسیله‌ی موتوری چهارچرخ" },
        { it: "l'autovettura", fa: "سواری" },
        { it: "l'autocarro", fa: "کامیون" },
        { it: "il rimorchio", fa: "یدک" },
        { it: "il semirimorchio", fa: "نیم‌یدک" },
        { it: "il caravan (la roulotte)", fa: "کاروان" },
        { it: "l'autocaravan (il camper)", fa: "کمپر" },
        { it: "trainati", fa: "کشیده‌شده (یدک‌شده)", base: "trainare" },
      ],
    },
    {
      kind: "trap",
      title: "تله: کاروان یا کمپر؟",
      body: "اسم‌ها شبیه‌اند و جمله‌ها هم «non è un rimorchio» دارند. فقط یکی درست است.",
      examples: [
        {
          sourceId: "347",
          textIt: "L'autocaravan non è un rimorchio",
          answer: 1,
          chunks: [
            { it: "L'autocaravan", fa: "کمپر" },
            { it: "non è", fa: "نیست", focus: "negation" },
            { it: "un rimorchio", fa: "یدک" },
          ],
          translation: "کمپر یدک نیست.",
          why: "درست است. کمپر موتور دارد و autoveicolo است.",
        },
        {
          sourceId: "348",
          textIt: "Il caravan non è un rimorchio",
          answer: 0,
          chunks: [
            { it: "Il caravan", fa: "کاروان" },
            { it: "non è", fa: "نیست", focus: "negation" },
            { it: "un rimorchio", fa: "یدک" },
          ],
          translation: "کاروان یدک نیست.",
          why: "غلط است. کاروان موتور ندارد و کشیده می‌شود، پس یدک است.",
        },
      ],
      takeaway: "auto- در autocaravan یعنی موتور دارد.",
    },
  ],
  practice: [
    {
      sourceId: "323",
      textIt: "I quadricicli non sono autoveicoli",
      answer: 1,
      chunks: [
        { it: "I quadricicli", fa: "چهارچرخ‌ها" },
        { it: "non sono", fa: "نیستند", focus: "negation" },
        { it: "autoveicoli", fa: "autoveicolo" },
      ],
      translation: "چهارچرخ‌ها autoveicolo نیستند.",
      why: "درست است. با اینکه چهار چرخ دارند، قانون آن‌ها را از autoveicoli جدا کرده است.",
      rule: "CdS artt. 53, 54",
      conceptStep: 1,
    },
    {
      sourceId: "332",
      textIt: "L'autovettura non può avere più di nove posti, compreso il conducente",
      answer: 1,
      chunks: [
        { it: "L'autovettura", fa: "سواری" },
        { it: "non può avere più di nove posti,", fa: "نمی‌تواند بیش از نه صندلی داشته باشد،", focus: "limit", verb: "può ← potere" },
        { it: "compreso il conducente", fa: "با احتساب راننده" },
      ],
      translation: "سواری نمی‌تواند بیش از نه صندلی، با احتساب راننده، داشته باشد.",
      why: "درست است. از ده صندلی به بالا، وسیله اتوبوس است.",
      rule: "CdS art. 54 c.1 lett. a",
      conceptStep: 1,
    },
    {
      sourceId: "345",
      textIt: "I rimorchi leggeri sono quelli di massa massima a pieno carico fino a 750 kg",
      answer: 1,
      chunks: [
        { it: "I rimorchi leggeri", fa: "یدک‌های سبک" },
        { it: "sono quelli di massa massima a pieno carico", fa: "آن‌هایی هستند که جرم کلشان با بار کامل" },
        { it: "fino a 750 kg", fa: "تا ۷۵۰ کیلوگرم است", focus: "limit" },
      ],
      translation: "یدک‌های سبک آن‌هایی هستند که جرم کلشان با بار کامل تا ۷۵۰ کیلوگرم است.",
      why: "درست است. ۷۵۰ کیلوگرم مرز یدک سبک است (جمله‌ی مشابه با ۵۰۰ کیلوگرم غلط است).",
      rule: "Reg. (UE) 2018/858, cat. O1; CdS art. 116",
      conceptStep: 1,
    },
    {
      sourceId: "280",
      textIt: "E' possibile alloggiare nei caravan (roulottes) durante la circolazione",
      answer: 0,
      chunks: [
        { it: "E' possibile", fa: "ممکن است" },
        { it: "alloggiare nei caravan (roulottes)", fa: "در کاروان اقامت کرد" },
        { it: "durante la circolazione", fa: "در حین حرکت" },
      ],
      translation: "در حین حرکت می‌توان در کاروان اقامت کرد.",
      why: "غلط است. کاروان فقط وقتی متوقف است برای اقامت به کار می‌رود؛ در حین حرکت کسی نباید داخلش باشد.",
      rule: "CdS art. 56 c.2 lett. e",
      conceptStep: 3,
    },
    {
      sourceId: "287",
      textIt: "Le autocaravan (camper) sono rimorchi",
      answer: 0,
      chunks: [
        { it: "Le autocaravan (camper)", fa: "کمپرها" },
        { it: "sono rimorchi", fa: "یدک هستند" },
      ],
      translation: "کمپرها در دسته‌ی یدک‌ها هستند.",
      why: "غلط است. کمپر موتور دارد؛ autoveicolo است.",
      rule: "CdS art. 54 c.1 lett. m",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: range(319, 343) },
    { step: 2, sourceIds: range(344, 351) },
    { step: 3, sourceIds: range(277, 291) },
  ],
};

// ── Lesson 9 ──────────────────────────────────────────────────────────────────

export const lessonMacchinePannelli: Lesson = {
  id: "macchine-agricole-e-pannelli",
  titleFa: "ماشین‌آلات کشاورزی و تابلوهای پشت وسایل سنگین",
  titleIt: "MACCHINE AGRICOLE E OPERATRICI · PANNELLI RETRORIFLETTENTI",
  minutes: 5,
  signs: [302, 303, 304, 305],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی ماشین‌آلات کشاورزی و عملیاتی کی و چطور در جاده حرکت می‌کنند و از روی تابلوی پشت یک وسیله می‌فهمی جلوی تو کامیون است یا یدک، بار بیرون‌زده دارد یا بار خطرناک.",
      why: "۳۱ سؤال درباره‌ی این‌هاست و نیمی از آن‌ها با تصویر تابلو پرسیده می‌شوند.",
    },
    {
      kind: "table",
      title: "ماشین‌آلات کشاورزی و عملیاتی",
      body: "macchine agricole برای کار کشاورزی‌اند و macchine operatrici برای کارهای جاده‌ای و صنعتی (مثلاً برف‌روب). هر دو می‌توانند چرخ‌دار یا زنجیری، خودکشش یا یدک‌شده باشند.",
      columns: ["macchine agricole", "macchine operatrici"],
      rows: [
        { label: "کجا در جاده؟", values: ["اگر ثبت شده باشند، برای جابه‌جایی خودشان و حمل محصول برای شرکت‌های کشاورزی", "برای جابه‌جایی خودشان؛ برف‌روب هم از این دسته است"] },
        { label: "حداکثر سرعت", values: ["۴۰ کیلومتر روی لاستیک، ۱۵ در بقیه‌ی حالت‌ها (مثلاً زنجیری)", "همان: ۴۰ یا ۱۵"] },
        { label: "مسافر", values: ["نه «تا چهار مسافر» و نه ایستاده", "نه «تا چهار مسافر»"] },
        { label: "آزادراه", values: ["ممنوع", "ممنوع"] },
      ],
      takeaway: "جمله‌هایی که برای این ماشین‌ها سرعت بالاتر از ۴۰، چند مسافر یا گواهینامه‌ی A را می‌گویند، FALSO هستند.",
      rule: "CdS artt. 57, 58; art. 142 c.3 lett. c; art. 175",
    },
    {
      kind: "compare",
      title: "پشت یک وسیله‌ی سنگین",
      body: "هر کامیون، یدک یا نیم‌یدکِ باری بالای ۳٫۵ تن باید پشتش تابلوی بازتابنده داشته باشد. از روی طرح تابلو می‌فهمی جلوی تو کدام است.",
      items: [PANEL_TRUCK, PANEL_TRAILER],
      rows: [
        { label: "طرح", values: ["نوارهای مورب زرد و قرمز", "زمینه‌ی زرد با حاشیه‌ی قرمز"] },
        { label: "روی چه وسیله‌ای", values: ["کامیون (autocarro) بالای ۳٫۵ تن", "یدک و نیم‌یدک باری بالای ۳٫۵ تن"] },
        { label: "اگر جلوی تو باشد", values: ["پشت کامیون هستی", "پشت یدک یا نیم‌یدک هستی"] },
      ],
      takeaway: "مورب = کامیون؛ حاشیه‌دار = یدک.",
      rule: "CdS art. 72; DM 24 gennaio 2003 n. 40 (Reg. ECE/ONU 70)",
    },
    {
      kind: "table",
      title: "تابلوهای دیگر و نوارهای بازتابنده",
      body: "دو تابلوی دیگر معنی بار را می‌گویند، نه نوع وسیله را. نوارهای بازتابنده هم روی وسایل بالای ۳٫۵ تن اجباری‌اند.",
      columns: ["معنی"],
      rows: [
        { label: "تابلوی سفید و قرمز ۵۰×۵۰", it: "pannello per carichi sporgenti", sign: 302, values: ["بار از پشت وسیله بیرون زده است"] },
        { label: "تابلوی نارنجی با دو عدد", it: "pannello per merci pericolose", sign: 303, values: ["حمل بار خطرناک؛ عدد بالا نوع خطر و عدد پایین خودِ ماده را نشان می‌دهد"] },
        { label: "نوار کناری", it: "strisce retroriflettenti laterali", values: ["سفید یا زرد؛ برای کامیون و یدکِ بالای ۳٫۵ تن"] },
        { label: "نوار پشتی", it: "strisce retroriflettenti posteriori", values: ["قرمز یا زرد؛ برای کامیون و یدکِ بالای ۳٫۵ تن"] },
      ],
      takeaway: "روی سواری، اتوبوس یا کاروان تابلوی «حداکثر سرعت» یا نوار قرمز و سفید اجباری نیست.",
      rule: "CdS artt. 72, 164, 168; DPR 495/1992 art. 361",
    },
    {
      kind: "terms",
      title: "کلمه‌های این درس",
      terms: [
        { it: "la macchina agricola", fa: "ماشین کشاورزی" },
        { it: "la macchina operatrice", fa: "ماشین عملیاتی (مثل برف‌روب)" },
        { it: "a cingoli", fa: "زنجیری" },
        { it: "semoventi o trainate", fa: "خودکشش یا یدک‌شده", base: "trainare" },
        { it: "il pannello retroriflettente", fa: "تابلوی بازتابنده" },
        { it: "la massa a pieno carico", fa: "جرم با بار کامل" },
        { it: "il carico sporgente", fa: "بار بیرون‌زده" },
        { it: "le merci pericolose", fa: "بار خطرناک" },
      ],
    },
    {
      kind: "trap",
      title: "تله: همان تابلو، دو ادعا",
      body: "هر دو جمله درباره‌ی تابلوی مورب زرد و قرمز هستند. یکی می‌گوید پشت چه وسیله‌ای هستی و دیگری وسیله را عوض می‌کند.",
      examples: [
        {
          sourceId: "299",
          sign: 304,
          textIt: "Il conducente che vede i pannelli in figura sta seguendo un autocarro con massa a pieno carico superiore a 3,5 tonnellate",
          answer: 1,
          chunks: [
            { it: "Il conducente che vede i pannelli in figura", fa: "راننده‌ای که تابلوهای تصویر را می‌بیند", verb: "vede ← vedere" },
            { it: "sta seguendo", fa: "پشت سرِ … حرکت می‌کند", verb: "seguendo ← seguire" },
            { it: "un autocarro", fa: "یک کامیون" },
            { it: "con massa a pieno carico superiore a 3,5 tonnellate", fa: "با جرم کل بیش از ۳٫۵ تن" },
          ],
          translation: "راننده‌ای که تابلوهای تصویر را می‌بیند، پشت سرِ یک کامیون با جرم کل بیش از ۳٫۵ تن حرکت می‌کند.",
          why: "درست است. نوار مورب زرد و قرمز مال کامیون است.",
        },
        {
          sourceId: "307",
          sign: 304,
          textIt: "Il pannello in figura è installato posteriormente ai rimorchi o semirimorchi con massa a pieno carico superiore a 3,5 tonnellate",
          answer: 0,
          chunks: [
            { it: "Il pannello in figura", fa: "تابلوی تصویر" },
            { it: "è installato posteriormente", fa: "پشتِ … نصب می‌شود", verb: "installato ← installare" },
            { it: "ai rimorchi o semirimorchi", fa: "یدک‌ها یا نیم‌یدک‌ها" },
            { it: "con massa a pieno carico superiore a 3,5 tonnellate", fa: "با جرم کل بیش از ۳٫۵ تن" },
          ],
          translation: "تابلوی تصویر پشتِ یدک‌ها یا نیم‌یدک‌هایی با جرم کل بیش از ۳٫۵ تن نصب می‌شود.",
          why: "غلط است. یدک تابلوی زرد با حاشیه‌ی قرمز دارد، نه نوار مورب.",
        },
      ],
      takeaway: "اول طرح تابلو را ببین، بعد اسم وسیله را در جمله پیدا کن.",
    },
  ],
  practice: [
    {
      sourceId: "263",
      textIt: "Le macchine agricole possono essere a ruote o a cingoli",
      answer: 1,
      chunks: [
        { it: "Le macchine agricole", fa: "ماشین‌آلات کشاورزی" },
        { it: "possono essere", fa: "می‌توانند باشند", verb: "possono ← potere" },
        { it: "a ruote o a cingoli", fa: "چرخ‌دار یا زنجیری" },
      ],
      translation: "ماشین‌آلات کشاورزی می‌توانند چرخ‌دار یا زنجیری باشند.",
      why: "درست است. هر دو نوع وجود دارد.",
      rule: "CdS art. 57",
      conceptStep: 1,
    },
    {
      sourceId: "274",
      textIt: "Sulle macchine agricole e sui loro rimorchi è consentito il trasporto di persone in piedi",
      answer: 0,
      chunks: [
        { it: "Sulle macchine agricole e sui loro rimorchi", fa: "روی ماشین‌آلات کشاورزی و یدک‌هایشان" },
        { it: "è consentito", fa: "مجاز است", verb: "consentito ← consentire" },
        { it: "il trasporto di persone in piedi", fa: "حمل افراد به صورت ایستاده" },
      ],
      translation: "روی ماشین‌آلات کشاورزی و یدک‌هایشان حمل افراد به صورت ایستاده مجاز است.",
      why: "غلط است. حمل آدم ایستاده روی این ماشین‌ها مجاز نیست.",
      rule: "CdS art. 57",
      conceptStep: 1,
    },
    {
      sourceId: "293",
      sign: 305,
      textIt: "Durante la circolazione, i rimorchi e i semirimorchi per trasporto di cose con massa massima a pieno carico superiore a 3,5 tonnellate devono essere segnalati posteriormente con pannelli retroriflettenti in figura",
      answer: 1,
      chunks: [
        { it: "Durante la circolazione,", fa: "در حین تردد،" },
        { it: "i rimorchi e i semirimorchi per trasporto di cose", fa: "یدک‌ها و نیم‌یدک‌های باری" },
        { it: "con massa massima a pieno carico superiore a 3,5 tonnellate", fa: "با جرم کل بیش از ۳٫۵ تن" },
        { it: "devono essere segnalati posteriormente", fa: "باید از پشت مشخص شوند", verb: "devono ← dovere" },
        { it: "con pannelli retroriflettenti in figura", fa: "با تابلوهای بازتابنده‌ی تصویر" },
      ],
      translation: "در حین تردد، یدک‌ها و نیم‌یدک‌های باری با جرم کل بیش از ۳٫۵ تن باید از پشت با تابلوهای بازتابنده‌ی تصویر مشخص شوند.",
      why: "درست است. زرد با حاشیه‌ی قرمز تابلوی یدک و نیم‌یدک است.",
      rule: "DM 24 gennaio 2003 n. 40 (Reg. ECE/ONU 70)",
      conceptStep: 2,
    },
    {
      sourceId: "296",
      sign: 302,
      textIt: "Il pannello in figura segnala il trasporto di carichi sporgenti",
      answer: 1,
      chunks: [
        { it: "Il pannello in figura", fa: "تابلوی تصویر" },
        { it: "segnala", fa: "نشان می‌دهد", verb: "segnala ← segnalare" },
        { it: "il trasporto di carichi sporgenti", fa: "حمل بار بیرون‌زده را" },
      ],
      translation: "تابلوی تصویر حمل بار بیرون‌زده را نشان می‌دهد.",
      why: "درست است. تابلوی مربعی سفید و قرمز را به انتهای بار بیرون‌زده می‌بندند.",
      rule: "CdS art. 164; DPR 495/1992 art. 361",
      conceptStep: 3,
    },
    {
      sourceId: "302",
      textIt: "Durante la circolazione, gli autocarri di massa complessiva a pieno carico inferiore o uguale a 3,5 tonnellate devono essere segnalati posteriormente con pannelli retroriflettenti gialli e rossi",
      answer: 0,
      chunks: [
        { it: "Durante la circolazione,", fa: "در حین تردد،" },
        { it: "gli autocarri di massa complessiva a pieno carico", fa: "کامیون‌هایی با جرم کل" },
        { it: "inferiore o uguale a 3,5 tonnellate", fa: "کمتر از ۳٫۵ تن یا برابر با آن", focus: "limit" },
        { it: "devono essere segnalati posteriormente", fa: "باید از پشت مشخص شوند", verb: "devono ← dovere" },
        { it: "con pannelli retroriflettenti gialli e rossi", fa: "با تابلوهای بازتابنده‌ی زرد و قرمز" },
      ],
      translation: "در حین تردد، کامیون‌هایی با جرم کل کمتر از ۳٫۵ تن یا برابر با آن باید از پشت با تابلوهای بازتابنده‌ی زرد و قرمز مشخص شوند.",
      why: "غلط است. این تابلو برای وسایل بالای ۳٫۵ تن اجباری است، نه زیر آن.",
      rule: "CdS art. 72; DM 24 gennaio 2003 n. 40",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: range(262, 276) },
    { step: 2, sourceIds: ["292", "293", "299", "300", "302", "307"] },
    { step: 3, sourceIds: ["294", "295", "296", "297", "298", "301", "303", "304", "305", "306"] },
  ],
};
