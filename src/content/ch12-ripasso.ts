/**
 * src/content/ch12-ripasso.ts
 * Chapter 12 (Distanza di sicurezza): the chapter review. Eight real bank
 * questions, two per lesson in lesson order, none shown inside a lesson; a
 * mistake routes back to the lesson section that teaches it
 * (tests/chapter12.test.ts).
 */
import type { Lesson } from "./lessons.js";

const DISTANZA = "La distanza di sicurezza";
const DISTANZA_FA = "فاصله‌ی ایمنی";
const FRENATURA = "Lo spazio di frenatura";
const FRENATURA_FA = "مسافتِ ترمز";

export const reviewDistanza: Lesson = {
  id: "ripasso-capitolo-12",
  titleFa: "مرور فصل ۱۲",
  titleIt: "RIPASSO · DISTANZA DI SICUREZZA",
  minutes: 5,
  signs: [],
  review: true,
  steps: [
    {
      kind: "intro",
      title: "مرور فصل",
      objective:
        "هشت سؤالِ واقعی از بانک، دو تا از هر درس. هیچ‌کدام را در درس‌ها ندیده‌ای، پس این مرور نشان می‌دهد چه چیزی واقعاً در ذهنت مانده است.",
      why: "تقریباً هر سؤالِ این فصل یکی از سه چیز را می‌پرسد: «این مسافت از کجا تا کجاست: واکنش، ترمز یا کل؟»، «با دو یا سه برابر شدنِ سرعت چند برابر می‌شود؟» و «فاصله‌ی ایمنی به این چیز بستگی دارد یا نه، و عدد دارد یا نه؟». سؤالی که این‌جا اشتباه کنی به فهرستِ مرورت اضافه می‌شود و به بخشِ درسِ مربوطش وصل است.",
    },
    {
      kind: "table",
      title: "فصل ۱۲ در چهار خط",
      body: "قبل از سؤال‌ها، نکته‌ی اصلیِ هر درس را یک بار دیگر ببین. اگر جایی برایت تازه بود، اول همان درس را دوباره باز کن.",
      columns: ["نکته‌ی اصلی"],
      rows: [
        { label: "درس ۱", it: "tempo di reazione", values: ["از دیدنِ خطر تا شروعِ ترمز، با همان سرعت می‌روی: km/h ÷ ۳٫۶ در هر ثانیه (۵۰ → ۱۴ متر، ۱۳۰ → ۳۶ متر). حواس‌پرتی این زمان را بلند می‌کند"] },
        { label: "درس ۲", it: "frenatura · arresto", values: ["ترمز با توانِ دومِ سرعت: ×۲ → ×۴، ×۳ → ×۹. خیسی، برف، لاستیکِ فرسوده و سرازیری بلندترش می‌کنند. کل = واکنش + ترمز"] },
        { label: "درس ۳", it: "distanza di sicurezza", values: ["برای این‌که به عقبِ خودروی جلو نزنی. دست‌کم مسافتِ واکنش؛ به سرعت، جاده، خودرو و حالِ تو بستگی دارد، نه به سوخت، قدرت یا اندازه‌ی خودروی جلو"] },
        { label: "درس ۴", it: "20 m · 100 m", values: ["فقط دو عدد: ۲۰ متر پشتِ برف‌روب و نمک‌پاش، ۱۰۰ متر بینِ وسیله‌هایی که سبقتشان ممنوع شده. هیچ موقعیتی فاصله را کم نمی‌کند"] },
      ],
      takeaway: "در هر جمله بپرس: درباره‌ی واکنش است، ترمز، کل، یا فاصله با خودروی جلو؟ ضریب را درست زدی؟ عدد دارد یا جمله عدد ساخته؟",
    },
  ],
  practice: [
    {
      sourceId: "4277",
      textIt: "In un secondo, si percorrono circa m 42 se si viaggia a 150 km/h",
      answer: 1,
      chunks: [
        { it: "In un secondo,", fa: "در یک ثانیه،" },
        { it: "si percorrono circa m 42", fa: "حدود ۴۲ متر طی می‌شود", verb: "si percorrono ← percorrere" },
        { it: "se si viaggia a 150 km/h", fa: "اگر با ۱۵۰ کیلومتر بر ساعت برانی", focus: "condition", verb: "si viaggia ← viaggiare" },
      ],
      translation: "در یک ثانیه، اگر با ۱۵۰ کیلومتر بر ساعت برانی، حدود ۴۲ متر طی می‌شود.",
      why: "درست است (درس ۱). ۱۵۰ تقسیم بر ۳٫۶ حدود ۴۲ است.",
      rule: "v (m/s) = km/h ÷ 3,6",
      conceptStep: 1,
    },
    {
      sourceId: "4268",
      textIt: "La distrazione del conducente può essere causa di incidenti",
      answer: 1,
      chunks: [
        { it: "La distrazione del conducente", fa: "حواس‌پرتیِ راننده" },
        { it: "può essere causa di incidenti", fa: "می‌تواند علتِ تصادف باشد", verb: "può ← potere" },
      ],
      translation: "حواس‌پرتیِ راننده می‌تواند علتِ تصادف باشد.",
      why: "درست است (درس ۱). حواس‌پرتی زمانِ واکنش را بلند می‌کند: مترهای بیشتری بدون ترمز.",
      rule: "Circolare MIT 6935/2017, argomenti d'esame: tempi di reazione",
      conceptStep: 2,
    },
    {
      sourceId: "4285",
      textIt: "Lo spazio di frenatura diventa sedici volte maggiore se la velocità si quadruplica",
      answer: 1,
      chunks: [
        { it: FRENATURA, fa: FRENATURA_FA },
        { it: "diventa sedici volte maggiore", fa: "شانزده برابر می‌شود", verb: "diventa ← diventare" },
        { it: "se la velocità si quadruplica", fa: "اگر سرعت چهار برابر شود", focus: "condition", verb: "si quadruplica ← quadruplicare" },
      ],
      translation: "اگر سرعت چهار برابر شود، مسافتِ ترمز شانزده برابر می‌شود.",
      why: "درست است (درس ۲). ضریبِ سرعت به توانِ دو: ۴ × ۴ = ۱۶.",
      rule: "spazio di frenatura = v² / (2·μ·g)",
      conceptStep: 1,
    },
    {
      sourceId: "4295",
      textIt: "Lo spazio di frenatura diminuisce sul tratto in discesa di un dosso",
      answer: 0,
      chunks: [
        { it: FRENATURA, fa: FRENATURA_FA },
        { it: "diminuisce", fa: "کم می‌شود", verb: "diminuisce ← diminuire", focus: "contrast" },
        { it: "sul tratto in discesa di un dosso", fa: "در سرازیریِ یک برآمدگی" },
      ],
      translation: "مسافتِ ترمز در سرازیریِ یک برآمدگی کم می‌شود.",
      why: "غلط است (درس ۲). هر سرازیری، حتی پشتِ یک برآمدگی، ترمز را بلندتر می‌کند، نه کوتاه‌تر.",
      rule: "Banca dati ministeriale 4291, 4297",
      conceptStep: 2,
    },
    {
      sourceId: "4255",
      textIt: "La distanza di sicurezza deve essere mantenuta per evitare lo scontro frontale",
      answer: 0,
      chunks: [
        { it: DISTANZA, fa: DISTANZA_FA },
        { it: "deve essere mantenuta", fa: "باید نگه داشته شود", verb: "deve ← dovere" },
        { it: "per evitare lo scontro frontale", fa: "برای جلوگیری از برخوردِ رودررو", focus: "reason" },
      ],
      translation: "فاصله‌ی ایمنی باید نگه داشته شود تا از برخوردِ رودررو جلوگیری شود.",
      why: "غلط است (درس ۳). فاصله‌ی ایمنی با خودروی جلوست و جلوی زدن به عقبِ آن (tamponamento) را می‌گیرد، نه برخورد با خودروی روبه‌رو.",
      rule: "Codice della Strada, art. 149 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "4242",
      textIt: "La distanza di sicurezza è commisurata anche al limite di velocità riportato sul retro del veicolo che ci precede",
      answer: 0,
      chunks: [
        { it: DISTANZA, fa: DISTANZA_FA },
        { it: "è commisurata anche", fa: "همچنین متناسب است با", verb: "è commisurata ← commisurare" },
        { it: "al limite di velocità riportato sul retro", fa: "سقفِ سرعتی که پشتِ … نوشته شده" },
        { it: "del veicolo che ci precede", fa: "خودرویی که جلوی ماست", verb: "precede ← precedere" },
      ],
      translation: "فاصله‌ی ایمنی همچنین متناسب است با سقفِ سرعتی که پشتِ خودروی جلو نوشته شده.",
      why: "غلط است (درس ۳). دایره‌ی پشتِ خودرو (فصل ۱۱، درسِ ۴) سقفِ سرعتِ همان وسیله است، نه معیارِ فاصله. فاصله به سرعتِ واقعیِ هر دو خودرو و شرایط بستگی دارد.",
      rule: "Codice della Strada, art. 149 c.1",
      conceptStep: 2,
    },
    {
      sourceId: "4229",
      textIt: "valore della distanza di sicurezza da mantenere da una macchina spanditrice di sale in azione è di 15 metri",
      answer: 0,
      chunks: [
        { it: "valore della distanza di sicurezza da mantenere da una macchina", fa: "مقدارِ فاصله‌ی ایمنی‌ای که باید نگه داشت از ماشینِ" },
        { it: "spanditrice di sale in azione", fa: "نمک‌پاشِ در حالِ کار" },
        { it: "è di 15 metri", fa: "۱۵ متر است", verb: "è ← essere", focus: "contrast" },
      ],
      translation: "مقدارِ فاصله‌ی ایمنی‌ای که باید از ماشینِ نمک‌پاشِ در حالِ کار نگه داشت، ۱۵ متر است.",
      why: "غلط است (درس ۴). پشتِ نمک‌پاش هم مثلِ برف‌روب، دست‌کم ۲۰ متر.",
      rule: "Codice della Strada, art. 149 c.3",
      conceptStep: 1,
    },
    {
      sourceId: "4333",
      textIt: "La distanza di sicurezza deve essere aumentata qualora sia difficile valutare il comportamento del conducente che precede",
      answer: 1,
      chunks: [
        { it: DISTANZA, fa: DISTANZA_FA },
        { it: "deve essere aumentata", fa: "باید بیشتر شود", verb: "deve ← dovere" },
        { it: "qualora sia difficile valutare", fa: "اگر سنجیدنِ … سخت باشد", focus: "condition", verb: "sia ← essere" },
        { it: "il comportamento del conducente che precede", fa: "رفتارِ راننده‌ی جلو" },
      ],
      translation: "اگر سنجیدنِ رفتارِ راننده‌ی جلو سخت باشد، فاصله‌ی ایمنی باید بیشتر شود.",
      why: "درست است (درس ۴). وقتی نمی‌دانی کِی ترمز می‌کند یا می‌پیچد، فاصله را بیشتر کن.",
      rule: "Codice della Strada, art. 149 c.1",
      conceptStep: 2,
    },
  ],
  related: [],
};
