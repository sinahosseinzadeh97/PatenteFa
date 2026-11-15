/**
 * src/content/ch19-airbag.ts
 * Chapter 19 (Cinture, casco e sicurezza), lesson 3: the airbag (what it is,
 * when and how fast it inflates, why it needs the belt) and the headrest
 * (whiplash; set in height and angle). Drawn on the `abitacolo` side view in
 * public/js/road.js. Mostly technical statements: no CdS article describes how
 * an airbag works; art. 172 c.5 covers airbags only for rear-facing child seats
 * (lesson 4). The pre-drive headrest check is chapter 16's.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter19.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const TECH = "Funzione tecnica del dispositivo (nessun articolo del CdS lo descrive)";

export const lessonAirbagPoggiatesta: Lesson = {
  id: "airbag-poggiatesta",
  titleFa: "کیسه‌ی هوا و پشت‌سری: همراهِ کمربند، نه به‌جایش",
  titleIt: "AIRBAG · POGGIATESTA · COLPO DI FRUSTA",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی کیسه‌ی هوا چیست، چه کسی و با چه سرعتی بازش می‌کند و چرا بدونِ کمربند خطرناک می‌شود، و این‌که پشت‌سری وسیله‌ی ایمنی در برابرِ ضربه‌ی شلاقیِ گردن است که فقط با تنظیمِ درستِ ارتفاع و شیب کار می‌کند.",
      why:
        "۱۸ سؤال. بانک کیسه‌ی هوا را با چیزهای آشنا قاطی می‌کند: دکمه‌ی داشبورد، «چند ثانیه»، «باد کردنِ دوره‌ای»، «تنظیمِ حدِ ضربه توسطِ راننده»، «فقط بیرونِ شهر». و پشت‌سری را وسیله‌ی راحتی یا تزیینی جا می‌زند.",
    },
    {
      kind: "table",
      title: "کیسه‌ی هوا: چیست و کِی باز می‌شود",
      body:
        "کیسه‌ی هوا وسیله‌ای خودکار است. راننده کاری با آن ندارد: نه بازش می‌کند، نه تنظیمش می‌کند، نه امتحانش می‌کند. یک حسگر ضربه‌ی شدید را می‌فهمد و در یک لحظه کیسه را پر از گاز می‌کند.",
      columns: ["واقعیت"],
      rows: [
        { label: "جنس", it: "cuscino gonfiabile di nylon", values: ["کیسه‌ای بادشونده از نایلون یا پارچه‌ی مصنوعیِ دیگر."] },
        { label: "چه کسی بازش می‌کند", it: "comando di un sensore", values: ["یک حسگر، خودکار. دکمه‌ای روی داشبورد نیست و راننده حدِ ضربه را تنظیم نمی‌کند."] },
        { label: "چقدر سریع", it: "pochi millisecondi", values: ["در چند میلی‌ثانیه (هزارمِ ثانیه)، نه چند ثانیه: سریع‌تر از یک پلک زدن."] },
        { label: "کِی", it: "urto violento", values: ["فقط در ضربه‌ی شدید. در شهر هم مثلِ بیرونِ شهر کار می‌کند."] },
        { label: "کارش", it: "urti contro superfici interne", values: ["جلوی برخوردِ سرنشین با بخش‌های داخلیِ خودرو را می‌گیرد و آسیب را کم می‌کند."] },
        { label: "نگه‌داری", it: "gonfiato periodicamente", values: ["لازم نیست گاه‌به‌گاه بادش کنی تا امتحانش کنی؛ یک بار باز می‌شود و بعد عوض می‌شود."] },
        { label: "خاموش کردن", it: "talvolta disattivabile", values: ["بعضی خودروها برای کیسه‌ی هوای سرنشینِ جلو کلیدِ خاموش کردن دارند (برای صندلیِ کودک، درس ۴)."] },
        { label: "کدام خودرو", it: "vetture con meno di 4 porte", values: ["تعدادِ درها مهم نیست؛ خودروی دو در هم کیسه‌ی هوا دارد."] },
      ],
      takeaway: "خودکار، در چند میلی‌ثانیه، فقط در ضربه‌ی شدید. نه دکمه، نه تنظیم، نه باد کردنِ دوره‌ای.",
      rule: TECH,
    },
    {
      kind: "anatomy",
      scene: "abitacolo",
      title: "کمربند، کیسه‌ی هوا، پشت‌سری: با هم",
      body:
        "سه وسیله، سه کار. کمربند بدن را روی صندلی نگه می‌دارد، کیسه‌ی هوا سر و سینه را وقتی به جلو می‌آیند می‌گیرد، پشت‌سری سر را وقتی به عقب برمی‌گردد. کیسه‌ی هوا با سرعتِ زیادی باز می‌شود؛ اگر کمربند نبسته باشی، بدنت زودتر و تندتر به آن می‌رسد و خودِ کیسه آسیب می‌زند. روی هر بخش بزن.",
      parts: [
        {
          id: "cintura",
          nameIt: "cintura di sicurezza",
          nameFa: "کمربندِ ایمنی",
          text: "نوارِ بالایی از روی شانه و وسطِ سینه، نوارِ پایینی روی لگن، نه روی شکم. بدن را روی صندلی نگه می‌دارد تا کیسه‌ی هوا درست جلوی آن باز شود.",
        },
        {
          id: "airbag",
          nameIt: "airbag",
          nameFa: "کیسه‌ی هوا",
          text: "در ضربه‌ی شدید در چند میلی‌ثانیه باز می‌شود و سر و سینه را می‌گیرد. برای کار کردن همراهِ کمربند ساخته شده، نه به‌جای آن: بی‌کمربند، بدن تند به کیسه‌ای می‌خورد که هنوز در حالِ باز شدن است.",
        },
        {
          id: "poggiatesta",
          nameIt: "poggiatesta",
          nameFa: "پشت‌سری",
          text: "بالای آن هم‌سطحِ بالای سر و نزدیکِ پشتِ سر. در ضربه از عقب، سر را نگه می‌دارد تا گردن به عقب پرت نشود.",
        },
      ],
      takeaway: "کیسه‌ی هوا همراهِ کمربند محافظت می‌کند. کیسه‌ی هوا بدونِ کمربند خطرِ تازه است.",
      rule: TECH,
    },
    {
      kind: "table",
      title: "پشت‌سری: وسیله‌ی ایمنی، به شرطِ تنظیم",
      body:
        "در ضربه از عقب، خودرو ناگهان به جلو هل داده می‌شود. تنه با صندلی جلو می‌رود و سر، اگر چیزی پشتش نباشد، به عقب پرت می‌شود و برمی‌گردد. این حرکتِ شلاق‌مانند به گردن آسیب می‌زند: ضربه‌ی شلاقیِ گردن. پشت‌سری فقط وقتی جلویش را می‌گیرد که درست تنظیم شده باشد.",
      columns: ["درست"],
      rows: [
        { label: "ارتفاع", it: "altezza", values: ["بالای پشت‌سری هم‌سطحِ بالای سر. اگر پایین باشد، سر از رویش به عقب می‌چرخد."] },
        { label: "شیب", it: "inclinazione", values: ["تا جایی که می‌شود نزدیکِ پشتِ سر."] },
        { label: "کارش", it: "colpo di frusta", values: ["ایمنی: جلوگیری از ضربه‌ی شلاقیِ گردن. نه زیبایی، نه استراحتِ عضله‌ها هنگامِ رانندگی."] },
        { label: "کِی", it: "prima di partire", values: ["قبل از راه افتادن، همراهِ تنظیمِ صندلی (فصلِ ۱۶)."] },
      ],
      takeaway: "پشت‌سری وسیله‌ی ایمنی است و فقط با تنظیمِ درستِ ارتفاع و شیب کار می‌کند.",
      rule: TECH,
    },
    {
      kind: "classify",
      title: "کارِ کدام وسیله است؟",
      body: "هر جمله را به وسیله‌اش وصل کن. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "cintura", fa: "کمربند" },
        { it: "airbag", fa: "کیسه‌ی هوا" },
        { it: "poggiatesta", fa: "پشت‌سری" },
      ],
      items: [
        { prompt: "بدن را روی صندلی نگه می‌دارد", answer: 0, explain: "کارِ اصلیِ کمربند." },
        { prompt: "در ضربه از عقب، جلوی پرت شدنِ سر به عقب را می‌گیرد", answer: 2, explain: "پشت‌سری، در برابرِ ضربه‌ی شلاقیِ گردن." },
        { prompt: "با فرمانِ یک حسگر در چند میلی‌ثانیه باد می‌شود", answer: 1, explain: "کیسه‌ی هوا، خودکار." },
        { prompt: "باید در ارتفاع و شیب تنظیم شود", answer: 2, explain: "پشت‌سری فقط با تنظیمِ درست کار می‌کند." },
        { prompt: "نمی‌گذارد در ضربه‌ی شدید از خودرو بیرون پرت شوی", answer: 0, explain: "کمربند." },
        { prompt: "در بعضی خودروها برای سرنشینِ جلو قابلِ خاموش کردن است", answer: 1, explain: "کیسه‌ی هوا، برای صندلیِ کودکِ رو به عقب." },
      ],
      takeaway: "کمربند نگه می‌دارد، کیسه‌ی هوا می‌گیرد، پشت‌سری سر را متوقف می‌کند.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l’airbag", fa: "کیسه‌ی هوا" },
        { it: "il cuscino gonfiabile", fa: "کیسه‌ی بادشونده" },
        { it: "si gonfia", base: "gonfiarsi", fa: "باد می‌شود" },
        { it: "il sensore", fa: "حسگر" },
        { it: "disattivare", fa: "خاموش کردن (غیرفعال کردن)" },
        { it: "il poggiatesta", fa: "پشت‌سری" },
        { it: "il colpo di frusta", fa: "ضربه‌ی شلاقیِ گردن" },
        { it: "regolare", fa: "تنظیم کردن" },
        { it: "l’inclinazione", fa: "شیب" },
        { it: "le superfici interne del veicolo", fa: "بخش‌های داخلیِ خودرو" },
      ],
    },
    {
      kind: "trap",
      title: "«millisecondi» درست، «secondi» غلط",
      body: "دو جمله فقط در یک کلمه فرق دارند:",
      examples: [
        {
          sourceId: "6053",
          textIt: "L’airbag si gonfia in pochi millisecondi",
          answer: 1,
          chunks: [
            { it: "L’airbag", fa: "کیسه‌ی هوا" },
            { it: "si gonfia", fa: "باد می‌شود", verb: "si gonfia ← gonfiarsi" },
            { it: "in pochi millisecondi", fa: "در چند میلی‌ثانیه", focus: "limit" },
          ],
          translation: "کیسه‌ی هوا در چند میلی‌ثانیه باد می‌شود.",
          why: "درست است. سرنشین در ضربه در کسری از ثانیه به جلو می‌آید؛ کیسه باید زودتر آماده باشد.",
        },
        {
          sourceId: "6054",
          textIt: "L’airbag si gonfia in pochi secondi",
          answer: 0,
          chunks: [
            { it: "L’airbag", fa: "کیسه‌ی هوا" },
            { it: "si gonfia", fa: "باد می‌شود", verb: "si gonfia ← gonfiarsi" },
            { it: "in pochi secondi", fa: "در چند ثانیه", focus: "limit" },
          ],
          translation: "کیسه‌ی هوا در چند ثانیه باد می‌شود.",
          why: "غلط است. چند ثانیه خیلی دیر است؛ تا آن موقع سرنشین به داخلِ خودرو خورده است.",
        },
      ],
      takeaway: "در جمله‌های کیسه‌ی هوا، واحدِ زمان را بخوان: milli-secondi.",
      rule: TECH,
    },
  ],
  practice: [
    {
      sourceId: "6052",
      textIt: "L’airbag si gonfia automaticamente grazie al comando di un sensore",
      answer: 1,
      chunks: [
        { it: "L’airbag", fa: "کیسه‌ی هوا" },
        { it: "si gonfia automaticamente", fa: "خودکار باد می‌شود", verb: "si gonfia ← gonfiarsi" },
        { it: "grazie al comando di un sensore", fa: "با فرمانِ یک حسگر", focus: "reason" },
      ],
      translation: "کیسه‌ی هوا با فرمانِ یک حسگر خودکار باد می‌شود.",
      why: "درست است (قدم ۱). حسگر ضربه‌ی شدید را می‌فهمد و کیسه را باز می‌کند؛ راننده کاری نمی‌کند.",
      rule: TECH,
      conceptStep: 1,
    },
    {
      sourceId: "6055",
      textIt: "L’airbag si gonfia premendo un pulsante posto sul cruscotto",
      answer: 0,
      chunks: [
        { it: "L’airbag", fa: "کیسه‌ی هوا" },
        { it: "si gonfia", fa: "باد می‌شود", verb: "si gonfia ← gonfiarsi" },
        { it: "premendo un pulsante posto sul cruscotto", fa: "با فشار دادنِ دکمه‌ای روی داشبورد", verb: "premendo ← premere", focus: "contrast" },
      ],
      translation: "کیسه‌ی هوا با فشار دادنِ دکمه‌ای روی داشبورد باد می‌شود.",
      why: "غلط است (قدم ۱). دکمه‌ای در کار نیست؛ در چند میلی‌ثانیه هیچ دستی به دکمه نمی‌رسد. حسگر بازش می‌کند.",
      rule: TECH,
      conceptStep: 1,
    },
    {
      sourceId: "6049",
      textIt: "L’airbag può essere pericoloso se si attiva mentre non si indossa la cintura di sicurezza",
      answer: 1,
      chunks: [
        { it: "L’airbag", fa: "کیسه‌ی هوا" },
        { it: "può essere pericoloso", fa: "می‌تواند خطرناک باشد", verb: "può ← potere" },
        { it: "se si attiva", fa: "اگر باز شود", verb: "si attiva ← attivarsi", focus: "condition" },
        { it: "mentre non si indossa la cintura di sicurezza", fa: "وقتی کمربندِ ایمنی بسته نیست", verb: "si indossa ← indossare", focus: "negation" },
      ],
      translation: "کیسه‌ی هوا اگر وقتی کمربندِ ایمنی بسته نیست باز شود، می‌تواند خطرناک باشد.",
      why: "درست است (قدم ۲). بی‌کمربند، بدن تند به کیسه‌ای می‌خورد که هنوز در حالِ باز شدن است.",
      rule: TECH,
      conceptStep: 2,
    },
    {
      sourceId: "5998",
      textIt: "Il poggiatesta è utile per prevenire il \"colpo di frusta\"",
      answer: 1,
      chunks: [
        { it: "Il poggiatesta", fa: "پشت‌سری" },
        { it: "è utile", fa: "مفید است", verb: "è ← essere" },
        { it: "per prevenire il \"colpo di frusta\"", fa: "برای جلوگیری از «ضربه‌ی شلاقیِ گردن»", focus: "reason" },
      ],
      translation: "پشت‌سری برای جلوگیری از «ضربه‌ی شلاقیِ گردن» مفید است.",
      why: "درست است (قدم ۳). در ضربه از عقب، پشت‌سری سر را نگه می‌دارد تا گردن به عقب پرت نشود.",
      rule: TECH,
      conceptStep: 3,
    },
    {
      sourceId: "6000",
      textIt: "Il poggiatesta è particolarmente utile per rilassare la muscolatura durante la guida",
      answer: 0,
      chunks: [
        { it: "Il poggiatesta", fa: "پشت‌سری" },
        { it: "è particolarmente utile", fa: "مخصوصاً مفید است", verb: "è ← essere" },
        { it: "per rilassare la muscolatura durante la guida", fa: "برای آرام کردنِ عضله‌ها هنگامِ رانندگی", focus: "reason" },
      ],
      translation: "پشت‌سری مخصوصاً برای آرام کردنِ عضله‌ها هنگامِ رانندگی مفید است.",
      why: "غلط است (قدم ۳). پشت‌سری وسیله‌ی ایمنی در برابرِ ضربه‌ی شلاقیِ گردن است، نه وسیله‌ی راحتی.",
      rule: TECH,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6047", "6048", "6050", "6051", "6052", "6053", "6054", "6055", "6056", "6057", "6059", "6060"] },
    { step: 2, sourceIds: ["6049", "6058"] },
    { step: 3, sourceIds: ["5998", "5999", "6000", "6001"] },
  ],
};
