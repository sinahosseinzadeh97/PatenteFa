/**
 * src/content/ch25-sospensioni.ts
 * Chapter 25 (Elementi del veicolo, manutenzione e comportamenti), lessons 9–10:
 * suspension and shock absorbers (bank groups 648–651).
 *
 *  L9  what the suspension does (drawing `sospensione`), when it fails, overload (648, 649).
 *  L10 springs and dampers work together; worn dampers; load, checks and adjustment (650, 651).
 *
 * No replacement intervals: the bank itself rejects a fixed one (7044), and the
 * manufacturer and the workshop decide. Trust rules as in src/content/lessons.ts;
 * checked by tests/chapter25.test.ts.
 */
import type { Lesson } from "./lessons.js";
import { CDS, EXERCISE, MANUALE, TECNICA } from "./ch25-common.js";

const SOSP = "Le sospensioni di un veicolo a motore";
const SOSP_FA = "سیستمِ تعلیقِ وسیله‌ی موتوری";
const SOVR = "Il sovraccarico del veicolo";
const SOVR_FA = "بارِ اضافه‌ی وسیله";
const SCAR = "In un veicolo a motore, gli ammortizzatori scarichi";
const SCAR_FA = "در وسیله‌ی موتوری، کمک‌فنرهای خسته";

export const lessonSospensioni: Lesson = {
  id: "sospensioni-tenuta-sovraccarico",
  titleFa: "سیستمِ تعلیق: چرخ روی جاده، خودرو آرام",
  titleIt: "SOSPENSIONI · TENUTA DI STRADA · SOVRACCARICO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی سیستمِ تعلیق کجاست (بینِ شاسی و چرخ‌ها، روی همه‌ی چرخ‌ها) و دو کار می‌کند: چرخ‌ها را روی جاده نگه می‌دارد و ضربه‌ها را می‌گیرد. می‌دانی تعلیقِ خسته یا خراب چه اثری روی رانندگی دارد، و چرا بارِ اضافه به آن آسیب می‌زند.",
      why:
        "۲۵ سؤال. جمله‌ی غلط یا کارِ قطعه‌ی دیگری را به تعلیق می‌دهد («خودرو را در شیب نگه می‌دارد»)، یا آن را فقط برای راحتی می‌داند («در فرمان‌پذیری نقشی ندارد»)، یا یک چاره‌ی ساختگی می‌سازد («برای بارِ اضافه یک بار بادِ بیشتر بزن»)، یا آن را بی‌نیاز از بررسی می‌خواند («تا پایانِ گارانتی»، «هر سی هزار کیلومتر»).",
      rule: TECNICA,
    },
    {
      kind: "anatomy",
      title: "یک گوشه‌ی خودرو، از نزدیک",
      scene: "sospensione",
      body:
        "تصویر یک چرخ و سیستمِ تعلیقش را از پهلو نشان می‌دهد. هر بخش را لمس کن. تصویر ساده است؛ شکلِ واقعی از خودرویی به خودرو فرق دارد.",
      parts: [
        { id: "telaio", nameIt: "il telaio · la scocca", nameFa: "شاسی و بدنه", text: "بخشی که سرنشین‌ها، موتور و بار رویش هستند. تعلیق آن را روی چرخ‌ها نگه می‌دارد." },
        { id: "molla", nameIt: "la molla", nameFa: "فنر", text: "وزنِ خودرو را تحمل می‌کند و وقتی چرخ از روی برآمدگی رد می‌شود، فشرده و باز می‌شود." },
        { id: "ammortizzatore", nameIt: "l'ammortizzatore", nameFa: "کمک‌فنر", text: "نمی‌گذارد فنر بعد از هر ضربه پشتِ سرِ هم بالا و پایین بپرد (درسِ ۱۰)." },
        { id: "pneumatico", nameIt: "la ruota · lo pneumatico", nameFa: "چرخ و لاستیک", text: "تعلیقِ سالم لاستیک را روی جاده نگه می‌دارد. لاستیکی که از جاده جدا شود، نه ترمز می‌کند نه فرمان می‌گیرد." },
        { id: "asperita", nameIt: "le asperità del terreno", nameFa: "ناهمواریِ جاده", text: "برآمدگی، چاله و درز. تعلیق ضربه‌اش را می‌گیرد تا به بدنه و سرنشین‌ها نرسد، در جاده‌ی صاف هم مدام کار می‌کند." },
        { id: "proiettore", nameIt: "il proiettore", nameFa: "چراغِ جلو", text: "اگر تعلیق خسته باشد یا خودرو بیش از حد بار داشته باشد، بدنه کج می‌شود و نورِ چراغ هم بالا یا پایین می‌رود." },
      ],
      takeaway: "سیستمِ تعلیق بینِ شاسی و چرخ‌هاست، روی همه‌ی چرخ‌ها. کارِ اولش: لاستیک روی جاده.",
      rule: TECNICA,
    },
    {
      kind: "factors",
      title: "سیستمِ تعلیق چه کار می‌کند، و چه کار نمی‌کند",
      body: "همه‌ی جمله‌ها با «سیستمِ تعلیقِ وسیله‌ی موتوری…» شروع می‌شوند. هر کدام را با تصویرِ قدمِ ۱ بسنج:",
      columns: [
        {
          title: "درست است (VERO)",
          items: [
            { fa: "رانندگی را راحت می‌کند", it: "servono a garantire un buon confort di marcia", sourceId: "7026", textIt: "Le sospensioni di un veicolo a motore servono a garantire un buon confort di marcia", answer: 1 },
            { fa: "ضربه‌های ناهمواریِ جاده را می‌گیرد", it: "servono a smorzare gli urti trasmessi dalle asperità del terreno", sourceId: "7028", textIt: "Le sospensioni di un veicolo a motore servono a smorzare gli urti trasmessi dalle asperità del terreno", answer: 1 },
            { fa: "رانندگی را هم راحت‌تر می‌کند و هم امن‌تر", it: "collaborano a rendere più confortevole e sicura la guida", sourceId: "7029", textIt: "Le sospensioni di un veicolo a motore collaborano a rendere più confortevole e sicura la guida", answer: 1 },
          ],
        },
        {
          title: "غلط است (FALSO)",
          items: [
            { fa: "خودرو را در شیب ثابت نگه می‌دارد", it: "servono a mantenere il veicolo fermo anche su strada in pendenza", sourceId: "7030", textIt: "Le sospensioni di un veicolo a motore servono a mantenere il veicolo fermo anche su strada in pendenza", answer: 0 },
            { fa: "فقط روی چرخ‌های جلو هست", it: "sono in genere poste sulle ruote anteriori, ma non su quelle posteriori", sourceId: "7031", textIt: "Le sospensioni di un veicolo a motore sono in genere poste sulle ruote anteriori, ma non su quelle posteriori", answer: 0 },
            { fa: "خودرو را سفت می‌کند تا راننده هر تکان را حس کند", it: "servono a irrigidire il veicolo", sourceId: "7032", textIt: "Le sospensioni di un veicolo a motore servono a irrigidire il veicolo, in modo che il conducente percepisca chiaramente tutti i saltellamenti del veicolo dovuti ad irregolarità della strada", answer: 0 },
          ],
        },
      ],
      takeaway: "تعلیق = راحتی و ایمنی، روی همه‌ی چرخ‌ها. نگه داشتنِ خودروی ایستاده کارِ ترمزِ دستی است.",
      rule: TECNICA,
    },
    {
      kind: "table",
      title: "وقتی سیستمِ تعلیق خسته یا خراب است",
      body:
        "تعلیق با کار کردن و با ضربه‌های محکم (چاله، جدولِ کنارِ خیابان) فرسوده می‌شود. ارتجاعی بودنش آن را آسیب‌ناپذیر نمی‌کند. وقتی ضعیف شد، فقط راحتی نیست که از دست می‌رود:",
      columns: ["اثر", "یادت باشد"],
      rows: [
        { label: "پایداری روی جاده", it: "problemi di tenuta di strada", values: ["بدتر؛ در پیچ و ترمز بیشتر حس می‌شود", "تعلیق در فرمان‌پذیری هم شریک است، نه فقط قطعه‌های فرمان"] },
        { label: "راحتی و خستگی", it: "riduce il confort · aumenta l’affaticamento", values: ["راحتی کمتر، راننده زودتر خسته", "خستگی هم خطر است"] },
        { label: "نورِ چراغِ جلو", it: "l’anomalo orientamento dei proiettori anabbaglianti", values: ["بدنه کج می‌شود و نورِ پایین درست نمی‌تابد", "ممکن است جلو را کم ببینی یا روبه‌رویی را چشم بزنی"] },
        { label: "یکی از چهار تا خراب", it: "la rottura di una sola delle quattro", values: ["مشکل است", "«بقیه جبران می‌کنند»: غلط"] },
        { label: "بررسی", it: "non necessitare di verifiche e manutenzioni", values: ["لازم است، در گارانتی هم", "زمانِ تعویضِ ثابتی مثلِ «هر سی هزار کیلومتر» وجود ندارد؛ وضعش را تعمیرگاه می‌سنجد"] },
      ],
      takeaway: "تعلیقِ خراب یعنی پایداری، دید و تمرکزِ کمتر. بررسی‌اش را به گارانتی و کیلومترِ ثابت نسپار.",
      rule: `${TECNICA}; ${MANUALE}`,
    },
    {
      kind: "table",
      title: "بارِ اضافه و سیستمِ تعلیق",
      body:
        "هر خودرو حداکثرِ وزنی دارد که در کارتِ خودرو نوشته شده. بیشتر از آن، تعلیق را بیش از توانش فشار می‌دهد. چیدنِ بار را فصل‌های ۱۳ و ۱۷ درس داده‌اند («بار روی خودرو و موتورسیکلت»):",
      columns: ["اثر", "دام"],
      rows: [
        { label: "یک بارِ زیاد", it: "la temporanea inefficienza · la rottura delle sospensioni", values: ["تعلیق موقتاً ضعیف می‌شود، یا حتی می‌شکند", "«بارِ اضافه برای تعلیق مشکلی ندارد»: غلط"] },
        { label: "بارِ زیادِ تکراری", it: "il sovraccarico ripetuto", values: ["تعلیق زود فرسوده می‌شود", "—"] },
        { label: "«فقط رانندگی سخت‌تر می‌شود»", it: "maggiori difficoltà di guida", values: ["هم رانندگی سخت‌تر، هم تعلیق آسیب می‌بیند", "هر دو با هم"] },
        { label: "«یک بار بادِ بیشتر کافی است»", it: "aumentare la pressione dei pneumatici di un bar", values: ["غلط: باد زدن تعلیق را قوی نمی‌کند", "بار را کم کن؛ فشارِ لاستیک را با عددِ سازنده برای بار تنظیم کن (درسِ ۶)"] },
      ],
      takeaway: "بیش از حدِ کارتِ خودرو بار نزن. هیچ ترفندی جای کم کردنِ بار را نمی‌گیرد.",
      rule: `${TECNICA}; ${CDS("167")} (masse limite)`,
    },
    {
      kind: "classify",
      title: "تمرین: کارِ تعلیق هست یا نه؟",
      body: `${EXERCISE} برای هر موقعیت بگو سیستمِ تعلیق در آن نقش دارد یا کارِ قطعه‌ی دیگری است:`,
      options: [
        { it: "lo fanno le sospensioni", fa: "کارِ تعلیق است" },
        { it: "non è il compito delle sospensioni", fa: "کارِ تعلیق نیست" },
      ],
      items: [
        { prompt: "روی جاده‌ی پر از درز، لاستیک‌ها روی آسفالت می‌مانند و ترمز درست می‌گیرد", answer: 0, explain: "نگه داشتنِ لاستیک روی جاده کارِ اصلیِ تعلیق است (قدمِ ۱)." },
        { prompt: "خودروی پارک‌شده در سرازیری تکان نمی‌خورد", answer: 1, explain: "این کارِ ترمزِ دستی است (قدمِ ۲؛ درسِ ۴)." },
        { prompt: "از روی یک چاله رد می‌شوی و ضربه‌اش به سرنشین‌ها نمی‌رسد", answer: 0, explain: "تعلیق ضربه را می‌گیرد (قدمِ ۲)." },
        { prompt: "خودرو جلوی چراغِ قرمز می‌ایستد", answer: 1, explain: "ایستادن کارِ ترمز است (درسِ ۴)." },
        { prompt: "با خودروی پربار، نورِ چراغ‌ها رو به جلو و پایین می‌ماند، نه رو به آسمان", answer: 0, explain: "تعلیقِ سالم بدنه را صاف نگه می‌دارد (قدمِ ۳)." },
      ],
      takeaway: "تعلیق لاستیک را روی جاده و بدنه را آرام نگه می‌دارد. ایستادن و نگه داشتن کارِ ترمز است.",
      rule: TECNICA,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "le sospensioni", fa: "سیستمِ تعلیق" },
        { it: "il telaio", fa: "شاسی" },
        { it: "la molla", fa: "فنر" },
        { it: "smorzare gli urti", fa: "گرفتنِ ضربه‌ها", base: "smorzare" },
        { it: "le asperità del terreno", fa: "ناهمواری‌های جاده" },
        { it: "il confort di marcia", fa: "راحتیِ رانندگی" },
        { it: "la tenuta di strada", fa: "پایداری خودرو روی جاده" },
        { it: "la dirigibilità", fa: "فرمان‌پذیری" },
        { it: "il sovraccarico", fa: "بارِ اضافه" },
        { it: "i proiettori anabbaglianti", fa: "نورِ پایین" },
      ],
    },
    {
      kind: "trap",
      title: "«Il sovraccarico del veicolo»: مشکل دارد یا نه؟",
      body: "هر دو جمله درباره‌ی بارِ اضافه و سیستمِ تعلیق‌اند:",
      examples: [
        {
          sourceId: "7036",
          textIt: "Il sovraccarico del veicolo può comportare la rottura delle sospensioni",
          answer: 1,
          chunks: [
            { it: SOVR, fa: SOVR_FA },
            { it: "può comportare la rottura delle sospensioni", fa: "ممکن است باعثِ شکستنِ سیستمِ تعلیق شود", verb: "può ← potere" },
          ],
          translation: "بارِ اضافه‌ی وسیله ممکن است باعثِ شکستنِ سیستمِ تعلیق شود.",
          why: "درست است. تعلیق برای وزنی ساخته شده که در کارتِ خودرو نوشته شده.",
        },
        {
          sourceId: "7042",
          textIt: "Il sovraccarico del veicolo non comporta problemi per le sospensioni",
          answer: 0,
          chunks: [
            { it: SOVR, fa: SOVR_FA },
            { it: "non comporta problemi per le sospensioni", fa: "برای سیستمِ تعلیق مشکلی ندارد", verb: "comporta ← comportare", focus: "negation" },
          ],
          translation: "بارِ اضافه‌ی وسیله برای سیستمِ تعلیق مشکلی ندارد.",
          why: "غلط است. بارِ اضافه تعلیق را ضعیف، فرسوده یا حتی شکسته می‌کند.",
        },
      ],
      takeaway: "بارِ اضافه همیشه برای تعلیق مشکل است. «non comporta problemi» یعنی جمله غلط است.",
      rule: TECNICA,
    },
  ],
  practice: [
    {
      sourceId: "7027",
      textIt: "Le sospensioni di un veicolo a motore servono a garantire che le ruote rimangano aderenti al fondo stradale",
      answer: 1,
      chunks: [
        { it: SOSP, fa: SOSP_FA },
        { it: "servono a garantire", fa: "برای این است که مطمئن شوی", verb: "servono ← servire" },
        { it: "che le ruote rimangano aderenti al fondo stradale", fa: "چرخ‌ها روی سطحِ جاده می‌چسبند و می‌مانند", verb: "rimangano ← rimanere" },
      ],
      translation: "سیستمِ تعلیقِ وسیله‌ی موتوری برای این است که چرخ‌ها روی سطحِ جاده چسبیده بمانند.",
      why: "درست است (قدم ۱). چرخِ جداشده از جاده نه ترمز می‌کند نه فرمان می‌گیرد.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "7033",
      textIt: "Le sospensioni di un veicolo a motore non entrano in funzione su strada rettilinea",
      answer: 0,
      chunks: [
        { it: SOSP, fa: SOSP_FA },
        { it: "non entrano in funzione", fa: "کار نمی‌کند", verb: "entrano ← entrare", focus: "negation" },
        { it: "su strada rettilinea", fa: "در جاده‌ی مستقیم", focus: "condition" },
      ],
      translation: "سیستمِ تعلیقِ وسیله‌ی موتوری در جاده‌ی مستقیم کار نمی‌کند.",
      why: "غلط است (قدم ۲). جاده‌ی مستقیم هم ناهموار است و در ترمز و شتاب هم بار جابه‌جا می‌شود؛ تعلیق همیشه کار می‌کند.",
      rule: TECNICA,
      conceptStep: 2,
    },
    {
      sourceId: "7041",
      textIt: "Un veicolo con sospensioni inefficienti può avere come conseguenza l’anomalo orientamento dei proiettori anabbaglianti",
      answer: 1,
      chunks: [
        { it: "Un veicolo con sospensioni inefficienti", fa: "وسیله‌ای با سیستمِ تعلیقِ ناکارآمد" },
        { it: "può avere come conseguenza", fa: "ممکن است این پیامد را داشته باشد:", verb: "può ← potere" },
        { it: "l’anomalo orientamento dei proiettori anabbaglianti", fa: "جهتِ نادرستِ نورِ پایین" },
      ],
      translation: "وسیله‌ای با سیستمِ تعلیقِ ناکارآمد ممکن است نورِ پایینش جهتِ نادرستی داشته باشد.",
      why: "درست است (قدم ۳). بدنه‌ی کج نورِ چراغ را هم کج می‌کند.",
      rule: TECNICA,
      conceptStep: 3,
    },
    {
      sourceId: "7044",
      textIt: "Le sospensioni del veicolo devono essere sostituite all’incirca ogni trentamila chilometri",
      answer: 0,
      chunks: [
        { it: "Le sospensioni del veicolo", fa: "سیستمِ تعلیقِ خودرو" },
        { it: "devono essere sostituite", fa: "باید عوض شود", verb: "devono ← dovere" },
        { it: "all’incirca ogni trentamila chilometri", fa: "تقریباً هر سی هزار کیلومتر", focus: "always" },
      ],
      translation: "سیستمِ تعلیقِ خودرو باید تقریباً هر سی هزار کیلومتر عوض شود.",
      why: "غلط است (قدم ۳). زمانِ تعویضِ ثابتی وجود ندارد؛ به استفاده و وضعِ قطعه بستگی دارد و تعمیرگاه آن را می‌سنجد.",
      rule: MANUALE,
      conceptStep: 3,
    },
    {
      sourceId: "7043",
      textIt: "Se il veicolo è sovraccarico, per evitare problemi per le sospensioni è sufficiente aumentare la pressione dei pneumatici di un bar",
      answer: 0,
      chunks: [
        { it: "Se il veicolo è sovraccarico,", fa: "اگر وسیله بارِ اضافه دارد،", focus: "condition" },
        { it: "per evitare problemi per le sospensioni", fa: "برای این‌که سیستمِ تعلیق مشکلی پیدا نکند", focus: "reason" },
        { it: "è sufficiente aumentare la pressione dei pneumatici di un bar", fa: "کافی است فشارِ لاستیک‌ها را یک بار بیشتر کنی", focus: "limit" },
      ],
      translation: "اگر وسیله بارِ اضافه دارد، برای این‌که سیستمِ تعلیق مشکلی پیدا نکند، کافی است فشارِ لاستیک‌ها را یک بار بیشتر کنی.",
      why: "غلط است (قدم ۴). بادِ لاستیک تعلیق را قوی‌تر نمی‌کند. تنها چاره: بار را کم کن.",
      rule: TECNICA,
      conceptStep: 4,
    },
  ],
  related: [
    { step: 1, sourceIds: ["7025", "7027"] },
    { step: 2, sourceIds: ["7026", "7028", "7029", "7030", "7031", "7032", "7033"] },
    { step: 3, sourceIds: ["7034", "7035", "7039", "7040", "7041", "7044", "7046", "7047", "7048", "7049"] },
    { step: 4, sourceIds: ["7036", "7037", "7038", "7042", "7043", "7045"] },
  ],
};

export const lessonAmmortizzatori: Lesson = {
  id: "ammortizzatori",
  titleFa: "کمک‌فنر: چرا خودرو نباید بالا و پایین بپرد",
  titleIt: "AMMORTIZZATORI · AMMORTIZZATORI SCARICHI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی فنر و کمک‌فنر چطور با هم کار می‌کنند، کمک‌فنرِ خسته چه نشانه‌هایی دارد و چه چیزهایی نشانه‌اش نیست، و چرا بارِ اضافه، بی‌توجهی و «تنظیم کردنِ خودسر» به آن آسیب می‌زنند.",
      why:
        "۲۲ سؤال. دام‌ها: فنر و کمک‌فنر را «این یا آن» جا می‌زنند، به کمک‌فنرِ خسته اثرهای بی‌ربط می‌دهند (موتور، مصرفِ روغن)، یا آن را بهتر کننده‌ی پایداری می‌خوانند («خودرو پایین‌تر، پس بهتر»). و «in ogni caso»: بعضی خودروها کمک‌فنرِ قابلِ تنظیم دارند، ولی نه همه.",
      rule: TECNICA,
    },
    {
      kind: "table",
      title: "فنر و کمک‌فنر: دو قطعه، یک کار",
      body:
        "فنر بدون کمک‌فنر بعد از هر ضربه مثلِ یک توپ بالا و پایین می‌پرد. کمک‌فنر این نوسان را می‌گیرد و چرخ را زود به جاده برمی‌گرداند. پس هر دو لازم‌اند و یکی جای دیگری را نمی‌گیرد:",
      columns: ["کار", "دام"],
      rows: [
        { label: "کمک‌فنر", it: "ridurre le oscillazioni delle sospensioni", values: ["نوسانِ فنر را کم می‌کند", "—"] },
        { label: "پایداری روی جاده", it: "collaborano alla tenuta di strada", values: ["کمک‌فنر در آن شریک است", "لاستیکی که می‌پرد، نمی‌گیرد"] },
        { label: "«یا فنر، یا کمک‌فنر»", it: "sospensioni oppure di ammortizzatori", values: ["غلط: خودروها هر دو را دارند", "کمک‌فنر بخشی از سیستمِ تعلیق است"] },
        { label: "«فنرِ تقویتی به‌جای کمک‌فنر»", it: "sostituiti con una sospensione rinforzata", values: ["غلط", "فنرِ سفت‌تر نوسان را نمی‌گیرد"] },
      ],
      takeaway: "فنر وزن را می‌برد، کمک‌فنر پریدن را می‌گیرد. هر دو، با هم.",
      rule: TECNICA,
    },
    {
      kind: "table",
      title: "کمک‌فنرِ خسته (scarico) چه می‌کند",
      body:
        "کمک‌فنری که دیگر خوب کار نمی‌کند را «scarico» می‌گویند. نشانه‌هایش در ترمز، پیچ و لاستیک دیده می‌شود، نه در موتور:",
      columns: ["اثر", "یادت باشد"],
      rows: [
        { label: "ترمز", it: "un comportamento anomalo del veicolo in frenata", values: ["خودرو در ترمز عجیب رفتار می‌کند (دماغه‌اش زیاد پایین می‌رود)", "مسافتِ ترمز ممکن است بیشتر شود"] },
        { label: "پیچ", it: "particolarmente in curva", values: ["خودرو کج می‌شود و تاب می‌خورد", "پایداری روی جاده بدتر می‌شود"] },
        { label: "لاستیک", it: "l’usura non uniforme del battistrada", values: ["آج نایکنواخت می‌ساید", "—"] },
        { label: "فنرها و راحتی", it: "il rischio di rottura delle molle · il comfort", values: ["خطرِ شکستنِ فنر بیشتر، راحتیِ سرنشین‌ها کمتر", "—"] },
        { label: "«خودرو پایین‌تر، پس پایدارتر»", it: "abbassando l’altezza da terra del telaio", values: ["غلط", "کمک‌فنرِ خسته پایداری را بدتر می‌کند، نه بهتر"] },
        { label: "موتور و روغن", it: "anomalo funzionamento del motore · consumo di lubrificante", values: ["ربطی ندارند", "کمک‌فنر بخشی از تعلیق است، نه موتور"] },
      ],
      takeaway: "کمک‌فنرِ خسته: ترمز و پیچِ بدتر، آجِ نایکنواخت، فنرِ در خطر. موتور: بی‌ربط.",
      rule: TECNICA,
    },
    {
      kind: "table",
      title: "بار، بررسی، و تنظیم",
      body:
        "کمک‌فنر هم مثلِ بقیه‌ی تعلیق با بارِ اضافه زودتر فرسوده می‌شود و بررسی لازم دارد. بعضی خودروها حالت‌های مختلفِ تعلیق دارند، ولی نه همه:",
      columns: ["قاعده", "دام"],
      rows: [
        { label: "بارِ اضافه", it: "il sovraccarico del veicolo · gli ammortizzatori", values: ["کمک‌فنر را ضعیف و زود فرسوده می‌کند", "«اگر آرام برانی مشکلی نیست»: غلط"] },
        { label: "«نیم بار بادِ بیشتر»", it: "aumentare la pressione dei pneumatici di mezzo bar", values: ["غلط", "بادِ لاستیک کمک‌فنر را محافظت نمی‌کند"] },
        { label: "بررسی", it: "non necessitano di verifiche e manutenzioni", values: ["لازم است، در گارانتی هم، و برای نوعِ «مدارِ بسته» هم", "«بسته‌بندی‌شده، پس بی‌نیاز»: غلط"] },
        { label: "تنظیمِ سفتی", it: "regolare la rigidità degli ammortizzatori", values: ["فقط در خودروهایی که این امکان را دارند", "«راننده در هر حال می‌تواند»: غلط؛ و سنجیدنِ سفتی کارِ تعمیرگاه است"] },
      ],
      takeaway: "کمک‌فنر را بار نزن، بررسی کن، و خودسر دست نزن.",
      rule: `${TECNICA}; ${MANUALE}`,
    },
    {
      kind: "classify",
      title: "تمرین: نشانه‌ی کمک‌فنرِ خسته هست یا نه؟",
      body: `${EXERCISE} هر چیزی که راننده حس می‌کند را بسنج. اگر «می‌تواند» باشد، بررسی‌اش با تعمیرگاه است:`,
      options: [
        { it: "può essere un segnale", fa: "می‌تواند نشانه باشد" },
        { it: "non è un segnale", fa: "نشانه‌اش نیست" },
      ],
      items: [
        { prompt: "بعد از یک برآمدگی، خودرو چند بار بالا و پایین می‌رود", answer: 0, explain: "کمک‌فنر باید نوسان را زود بگیرد (قدمِ ۱)." },
        { prompt: "در ترمز، دماغه‌ی خودرو خیلی پایین می‌رود", answer: 0, explain: "رفتارِ عجیب در ترمز (قدمِ ۲)." },
        { prompt: "موتور در حالتِ درجا نامنظم کار می‌کند", answer: 1, explain: "کمک‌فنر به موتور ربطی ندارد (قدمِ ۲)." },
        { prompt: "آجِ لاستیک لکه‌لکه و نایکنواخت ساییده شده", answer: 0, explain: "چرخی که می‌پرد، نایکنواخت می‌ساید (قدمِ ۲)." },
        { prompt: "خودرو روغنِ موتورِ بیشتری مصرف می‌کند", answer: 1, explain: "بی‌ربط؛ کمک‌فنر روغنِ موتور مصرف نمی‌کند (قدمِ ۲)." },
        { prompt: "در پیچ، خودرو زیاد کج می‌شود و تاب می‌خورد", answer: 0, explain: "پایداریِ کمتر در پیچ (قدمِ ۲)." },
      ],
      takeaway: "نشانه‌ها در ترمز، پیچ و لاستیک‌اند. هر چیزی که مالِ موتور است، نشانه‌ی کمک‌فنر نیست.",
      rule: TECNICA,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'ammortizzatore", fa: "کمک‌فنر" },
        { it: "gli ammortizzatori scarichi", fa: "کمک‌فنرهای خسته (فرسوده)" },
        { it: "le oscillazioni", fa: "نوسان (بالا و پایین رفتن)" },
        { it: "la molla", fa: "فنر" },
        { it: "la rigidità", fa: "سفتی" },
        { it: "regolare", fa: "تنظیم کردن", base: "regolare" },
        { it: "l’usura precoce", fa: "فرسودگیِ زودرس" },
        { it: "l’altezza da terra", fa: "فاصله‌ی بدنه از زمین" },
        { it: "un’officina specializzata", fa: "تعمیرگاهِ تخصصی" },
      ],
    },
    {
      kind: "trap",
      title: "«ammortizzatori scarichi»: جاده یا موتور؟",
      body: "هر دو جمله اثری از کمک‌فنرِ خسته می‌گویند. یکی واقعی است، دیگری مالِ قطعه‌ی دیگری:",
      examples: [
        {
          sourceId: "7065",
          textIt: "In un veicolo a motore, gli ammortizzatori scarichi peggiorano la tenuta di strada",
          answer: 1,
          chunks: [
            { it: SCAR, fa: SCAR_FA },
            { it: "peggiorano la tenuta di strada", fa: "پایداری روی جاده را بدتر می‌کنند", verb: "peggiorano ← peggiorare" },
          ],
          translation: "در وسیله‌ی موتوری، کمک‌فنرهای خسته پایداری روی جاده را بدتر می‌کنند.",
          why: "درست است. لاستیکی که می‌پرد، کمتر می‌گیرد.",
        },
        {
          sourceId: "7066",
          textIt: "In un veicolo, gli ammortizzatori scarichi provocano un anomalo funzionamento del motore",
          answer: 0,
          chunks: [
            { it: "In un veicolo, gli ammortizzatori scarichi", fa: "در یک وسیله، کمک‌فنرهای خسته" },
            { it: "provocano un anomalo funzionamento del motore", fa: "باعثِ کارِ نامنظمِ موتور می‌شوند", verb: "provocano ← provocare", focus: "contrast" },
          ],
          translation: "در یک وسیله، کمک‌فنرهای خسته باعثِ کارِ نامنظمِ موتور می‌شوند.",
          why: "غلط است. کمک‌فنر به موتور ربطی ندارد.",
        },
      ],
      takeaway: "«tenuta di strada», «frenata»، «curva»، «battistrada»: درست. «motore»، «lubrificante»: غلط.",
      rule: TECNICA,
    },
  ],
  practice: [
    {
      sourceId: "7050",
      textIt: "Gli ammortizzatori di un veicolo a motore servono a ridurre le oscillazioni delle sospensioni",
      answer: 1,
      chunks: [
        { it: "Gli ammortizzatori di un veicolo a motore", fa: "کمک‌فنرهای وسیله‌ی موتوری" },
        { it: "servono a ridurre le oscillazioni delle sospensioni", fa: "برای کم کردنِ نوسانِ سیستمِ تعلیق‌اند", verb: "servono ← servire" },
      ],
      translation: "کمک‌فنرهای وسیله‌ی موتوری برای کم کردنِ نوسانِ سیستمِ تعلیق‌اند.",
      why: "درست است (قدم ۱). بدونِ کمک‌فنر، فنر بعد از هر ضربه پشتِ سرِ هم می‌پرد.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "7070",
      textIt: "Un veicolo a motore è dotato di sospensioni oppure di ammortizzatori, ma difficilmente di tutti e due",
      answer: 0,
      chunks: [
        { it: "Un veicolo a motore è dotato di sospensioni oppure di ammortizzatori,", fa: "یک وسیله‌ی موتوری یا فنربندی دارد یا کمک‌فنر،", verb: "è dotato ← dotare" },
        { it: "ma difficilmente di tutti e due", fa: "ولی به‌ندرت هر دو را", focus: "contrast" },
      ],
      translation: "یک وسیله‌ی موتوری یا فنربندی دارد یا کمک‌فنر، ولی به‌ندرت هر دو را.",
      why: "غلط است (قدم ۱). کمک‌فنر بخشی از سیستمِ تعلیق است و خودروها هر دو را دارند.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "7062",
      textIt: "In un veicolo a motore, gli ammortizzatori scarichi provocano l’usura non uniforme del battistrada dei pneumatici",
      answer: 1,
      chunks: [
        { it: SCAR, fa: SCAR_FA },
        { it: "provocano l’usura non uniforme", fa: "باعثِ سایشِ نایکنواختِ", verb: "provocano ← provocare" },
        { it: "del battistrada dei pneumatici", fa: "آجِ لاستیک‌ها می‌شوند" },
      ],
      translation: "در وسیله‌ی موتوری، کمک‌فنرهای خسته باعثِ سایشِ نایکنواختِ آجِ لاستیک‌ها می‌شوند.",
      why: "درست است (قدم ۲). چرخی که می‌پرد، هر بار جای دیگری از آج را می‌ساید.",
      rule: TECNICA,
      conceptStep: 2,
    },
    {
      sourceId: "7068",
      textIt: "In un veicolo a motore, gli ammortizzatori scarichi, abbassando l’altezza da terra del telaio, migliorano la tenuta di strada del veicolo, specie in curva",
      answer: 0,
      chunks: [
        { it: "In un veicolo a motore, gli ammortizzatori scarichi,", fa: "در وسیله‌ی موتوری، کمک‌فنرهای خسته،" },
        { it: "abbassando l’altezza da terra del telaio,", fa: "با پایین آوردنِ فاصله‌ی شاسی از زمین،", verb: "abbassando ← abbassare", focus: "reason" },
        { it: "migliorano la tenuta di strada del veicolo,", fa: "پایداری وسیله روی جاده را بهتر می‌کنند،", verb: "migliorano ← migliorare", focus: "contrast" },
        { it: "specie in curva", fa: "به‌خصوص در پیچ" },
      ],
      translation: "در وسیله‌ی موتوری، کمک‌فنرهای خسته با پایین آوردنِ فاصله‌ی شاسی از زمین، پایداری وسیله روی جاده را بهتر می‌کنند، به‌خصوص در پیچ.",
      why: "غلط است (قدم ۲). دلیلِ ساختگی است؛ کمک‌فنرِ خسته پایداری را، به‌خصوص در پیچ، بدتر می‌کند.",
      rule: TECNICA,
      conceptStep: 2,
    },
    {
      sourceId: "7058",
      textIt: "Il conducente può in ogni caso regolare la rigidità degli ammortizzatori",
      answer: 0,
      chunks: [
        { it: "Il conducente può", fa: "راننده می‌تواند", verb: "può ← potere" },
        { it: "in ogni caso", fa: "در هر حال", focus: "always" },
        { it: "regolare la rigidità degli ammortizzatori", fa: "سفتیِ کمک‌فنرها را تنظیم کند" },
      ],
      translation: "راننده در هر حال می‌تواند سفتیِ کمک‌فنرها را تنظیم کند.",
      why: "غلط است (قدم ۳). «در هر حال» دام است: فقط بعضی خودروها کمک‌فنرِ قابلِ تنظیم دارند.",
      rule: MANUALE,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["7050", "7051", "7052", "7069", "7070"] },
    { step: 2, sourceIds: ["7060", "7061", "7062", "7063", "7064", "7065", "7066", "7067", "7068"] },
    { step: 3, sourceIds: ["7053", "7054", "7055", "7056", "7057", "7058", "7059", "7071"] },
  ],
};
