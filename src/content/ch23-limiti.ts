/**
 * src/content/ch23-limiti.ts
 * Chapter 23 (Responsabilità civile, penale e assicurazione), lessons 7–8.
 *
 *  L7 the limits of what an insurer pays: the massimale (and its legal
 *     minimum), franchigia and rivalsa (taught as policy terms, not tested), and
 *     the optional policies: theft, fire, kasko (groups 607, 606).
 *  L8 without insurance: forbidden to drive or park on public roads, sanction,
 *     seizure and confiscation; the Fondo di garanzia per le vittime della strada
 *     for victims of uninsured or unidentified vehicles (groups 604, 605).
 *
 * No massimale amounts are taught: art. 128 updates them by decree and the bank
 * never asks for a figure. The art. 193 fine range is quoted from the text read
 * on 2026-11-15. 6669 and 6670 depend on policy terms; they stay mapped and
 * explained, and are never used as practice or review (tests/chapter23.test.ts).
 *
 * Trust rules as in src/content/lessons.ts.
 */
import type { Lesson } from "./lessons.js";
import { CAP, CDS, DISCLAIMER, IVASS } from "./ch23-common.js";

const CONSAP = "Consap, Fondo di Garanzia per le Vittime della Strada (pagina e FAQ)";
const MASS = "I massimali della polizza di assicurazione R.C.A. (responsabilità civile auto)";
const MASS_FA = "سقف‌های تعهدِ بیمه‌نامه‌ی شخص ثالث";
const QS = "Quando l'assicurazione per la responsabilità civile auto è scaduta di validità";
const QS_FA = "وقتی اعتبارِ بیمه‌ی شخص ثالث تمام شده";
const FG = "Il \"fondo di garanzia per le vittime della strada\"";
const FG_FA = "«صندوقِ تضمینِ قربانیانِ جاده»";

export const lessonMassimaliPolizze: Lesson = {
  id: "rca-massimali-polizze",
  titleFa: "سقفِ تعهد و بیمه‌های اختیاری",
  titleIt: "MASSIMALI · FURTO, INCENDIO, KASKO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی سقفِ تعهد چیست (بیشترین مبلغی که شرکتِ بیمه برای یک تصادف می‌دهد)، فرقش با حقِ بیمه چیست، و بالاتر از آن چه کسی می‌پردازد. و بیمه‌های سرقت، آتش‌سوزی و بدنه را از بیمه‌ی شخص ثالث جدا می‌کنی: اختیاری‌اند و هر کدام قراردادِ خودشان را دارند.",
      why:
        "۱۳ سؤال. جمله‌ی غلط سقف را با حقِ بیمه یا با «پولی که آخرِ سال پس می‌دهند» قاطی می‌کند. در بیمه‌های اختیاری، شرط‌هایی می‌سازد که قانون ندارد (دزدگیرِ اجباری، قطع‌کنِ خودکارِ باتری) یا پوشش را عجیب می‌کند (مستمریِ مادام‌العمر، فقط آتش‌سوزیِ عمدی).",
      rule: `${CAP("128")}; ${IVASS}`,
    },
    {
      kind: "table",
      title: "سقفِ تعهد، فرانشیز، حقِ رجوع",
      body:
        "سه کلمه که با هم قاطی می‌شوند. «حقِ بیمه» پولی است که تو هر سال می‌دهی؛ «سقفِ تعهد» حداکثرِ پولی است که شرکت برای یک تصادف به زیان‌دیده‌ها می‌دهد:",
      columns: ["از کجا می‌آید", "یعنی چه"],
      rows: [
        { label: "سقفِ تعهد", it: "il massimale", values: ["قرارداد، با حداقلِ قانونی", "بیشترین مبلغی که شرکت برای یک تصادف می‌دهد؛ جدا برای آسیب به آدم و برای مال. بالاتر از آن را خودِ مسئول می‌دهد."] },
        { label: "حداقلِ سقف", it: "la cifra minima, stabilita dalla legge", values: ["قانون", "ماده‌ی ۱۲۸ کمترین سقف را تعیین می‌کند و هر چند سال با فرمان به‌روز می‌شود. عدد را این‌جا یاد نمی‌دهیم، چون عوض می‌شود و بانک آن را نمی‌پرسد."] },
        { label: "سقفِ بالاتر", it: "aumentati, a scelta del cliente", values: ["قرارداد", "می‌توانی سقفِ بالاتری بخری، با حقِ بیمه‌ی بیشتر. سقف هر سال خودکار بالا نمی‌رود و آخرِ سال هم «پس داده» نمی‌شود: پولی نیست که تو داده باشی."] },
        { label: "فرانشیز", it: "la franchigia", values: ["فقط بعضی بیمه‌نامه‌ها", "بخشی از خسارت که با خودت است. در بیمه‌ی شخص ثالث، شرکت باز هم همه‌ی خسارت را به زیان‌دیده می‌دهد، بعد آن بخش را از تو پس می‌گیرد. مثالِ IVASS: فرانشیزِ ۵۰۰ یورو، خسارتِ ۱۲۰۰؛ زیان‌دیده ۱۲۰۰ می‌گیرد و تو ۵۰۰ پس می‌دهی."] },
        { label: "حقِ رجوع", it: "la rivalsa", values: ["قانون و بندهای بیمه‌نامه", "اگر بیمه‌نامه برای حالت‌هایی مثلِ رانندگی با مستی یا بی‌گواهینامه بندِ حذفِ پوشش داشته باشد، زیان‌دیده باز هم پولش را می‌گیرد؛ شرکت بعد آن را (همه یا بخشی) از تو می‌خواهد. بیمه پیامدِ کارِ تو را پاک نمی‌کند."] },
      ],
      takeaway: "حقِ بیمه = آنچه تو می‌دهی. سقفِ تعهد = حداکثرِ آنچه شرکت برای یک تصادف می‌دهد؛ بالاتر از آن، و فرانشیز و حقِ رجوع، با خودت است. زیان‌دیده در هر حال پولش را می‌گیرد.",
      rule: `${CAP("128")}; ${CAP("144")} (azione diretta, eccezioni non opponibili); ${IVASS}`,
    },
    {
      kind: "table",
      title: "بیمه‌های اختیاری: سرقت، آتش‌سوزی، بدنه",
      body:
        "این‌ها خسارتِ خودروی «خودت» را می‌دهند، نه خسارتِ دیگران را؛ پس قانون آن‌ها را اجباری نکرده (فصلِ ۲۰، درسِ «مدارک و پلاکِ خودرو: چه چیزی واقعاً لازم است»). شرط‌هایشان از بیمه‌نامه می‌آید:",
      columns: ["از کجا می‌آید", "توضیح"],
      rows: [
        { label: "اختیاری", it: "non sono obbligatorie", values: ["قانون", "سرقت، آتش‌سوزی، خرابکاری، حوادثِ طبیعی، بیمه‌ی بدنه (kasko): هیچ‌کدام اجباری نیست."] },
        { label: "تا ارزشِ خودرو", it: "non superiore al valore del veicolo", values: ["اصلِ کلی، با استثنای قراردادی", "بیمه نباید از تو پول‌دارتر از قبل بسازد: معمولاً تا ارزشِ خودرو در زمانِ سرقت یا آتش‌سوزی. بعضی بیمه‌نامه‌ها از قبل ارزشی توافقی می‌نویسند (مثلاً «ارزشِ نو» در ماه‌های اول)؛ شرط‌های بیمه‌نامه‌ات را بخوان."] },
        { label: "سرقت در خارج", it: "rubato in uno Stato estero", values: ["شرطِ بیمه‌نامه", "شرط‌های معمولِ بیمه‌نامه می‌خواهند سرقت در همان کشور گزارش شود و برای فعال شدنِ بیمه در ایتالیا هم دوباره گزارش شود. جوابِ بانک VERO است؛ جزئیات را بیمه‌نامه می‌گوید."] },
        { label: "مستمریِ مادام‌العمر", it: "rendita vitalizia", values: ["نیست", "بیمه‌ی سرقت یا آتش‌سوزی یک بار ارزشِ خودرو را می‌دهد، نه درآمدی برای همه‌ی عمر."] },
        { label: "دزدگیر، قطع‌کنِ باتری", it: "antifurto · staccabatteria automatico", values: ["نه به‌عنوانِ شرطِ کلی", "قانون چنین شرطی ندارد. بعضی شرکت‌ها برای بعضی خودروها دزدگیر می‌خواهند یا برایش تخفیف می‌دهند؛ این قراردادِ همان شرکت است، نه شرطِ همه‌ی بیمه‌ها."] },
        { label: "فقط آتش‌سوزیِ عمدی", it: "solo incendi dolosi", values: ["نه", "بیمه‌ی آتش‌سوزی معمولاً آتش، انفجار و صاعقه را می‌پوشاند؛ آتش‌سوزیِ اتفاقی هم، نه فقط عمدی."] },
      ],
      takeaway: "سرقت، آتش‌سوزی و بدنه اختیاری‌اند، تا ارزشِ خودرو، با شرط‌های بیمه‌نامه‌ی خودشان. «همیشه دزدگیر لازم است» یا «فقط آتشِ عمدی» شرطِ کلی نیست.",
      rule: `Codice civile, artt. 1905, 1908 (principio indennitario); ${IVASS}`,
    },
    {
      kind: "classify",
      title: "تمرین: چه کسی می‌پردازد؟",
      body: `${DISCLAIMER} راننده‌ی فرضیِ G این بیمه‌نامه‌ی ساختگی را دارد: شخص ثالث با فرانشیزِ ۵۰۰ یورو و یک بندِ حقِ رجوع برای رانندگی با مستی؛ بیمه‌ی سرقت دارد؛ بیمه‌ی بدنه ندارد. در هر خط G مقصر است. بگو:`,
      options: [
        { it: "paga l'impresa", fa: "شرکتِ بیمه می‌پردازد" },
        { it: "paghi tu", fa: "خودِ G می‌پردازد" },
        { it: "prima l'impresa, poi ti chiede indietro", fa: "اول شرکت به زیان‌دیده، بعد از G پس می‌گیرد" },
      ],
      items: [
        { prompt: "G با خودروی دیگری تصادف می‌کند؛ خسارتِ آن خودرو ۱۲۰۰ یورو است. سهمِ فرانشیز (۵۰۰) چه می‌شود؟", answer: 2, explain: "زیان‌دیده همه‌ی ۱۲۰۰ را از شرکت می‌گیرد؛ شرکت ۵۰۰ را از G پس می‌خواهد (قدمِ ۱)." },
        { prompt: "خسارتِ آسیب به آدم‌ها در یک تصادفِ بزرگ، تا سقفِ نوشته‌شده در بیمه‌نامه", answer: 0, explain: "تا سقف، شرکت می‌پردازد." },
        { prompt: "همان تصادف: بخشی از خسارت که از سقف بالاتر است", answer: 1, explain: "بالاتر از سقف با خودِ مسئول است." },
        { prompt: "G با الکلِ خونِ بالای حدِ مجاز به عابری می‌زند", answer: 2, explain: "عابر پولش را می‌گیرد؛ شرکت با بندِ حقِ رجوع از G پس می‌خواهد. بیمه مجازات و مسئولیتِ کیفری را هم نمی‌پوشاند (درسِ ۲)." },
        { prompt: "آسیبِ خودروی خودِ G در تصادفی که خودش مقصر بوده", answer: 1, explain: "بدونِ بیمه‌ی بدنه، هیچ‌کس این را به G بدهکار نیست." },
        { prompt: "خودروی G دزدیده می‌شود و G سرقت را گزارش می‌دهد", answer: 0, explain: "بیمه‌ی سرقت، تا ارزشِ خودرو و با شرط‌های بیمه‌نامه." },
      ],
      takeaway: "زیان‌دیده تقریباً همیشه از شرکت پول می‌گیرد. چیزی که برای تو مهم است این است که شرکت بعداً چه چیزی را از تو پس می‌خواهد، و چه چیزی را اصلاً نمی‌پوشاند.",
      rule: `${CAP("128")}; ${CAP("144")}; ${IVASS}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il massimale", fa: "سقفِ تعهد" },
        { it: "il premio assicurativo", fa: "حقِ بیمه" },
        { it: "la franchigia", fa: "فرانشیز" },
        { it: "la rivalsa", fa: "حقِ رجوعِ بیمه" },
        { it: "impegnarsi a pagare", fa: "متعهد شدن به پرداخت", base: "impegnarsi" },
        { it: "il furto", fa: "سرقت" },
        { it: "l'incendio", fa: "آتش‌سوزی" },
        { it: "atti vandalici, eventi naturali", fa: "خرابکاری، حوادثِ طبیعی" },
        { it: "la polizza kasko", fa: "بیمه‌ی بدنه" },
        { it: "l'antifurto", fa: "دزدگیر" },
      ],
    },
    {
      kind: "trap",
      title: "«i massimali sono…»: آنچه شرکت می‌دهد یا آنچه می‌گیرد؟",
      body: "هر دو جمله تعریف می‌کنند سقفِ تعهد چیست. یکی جهتِ پول را درست می‌گوید؛ دیگری برعکس:",
      examples: [
        {
          sourceId: "6675",
          textIt: "I massimali della polizza di assicurazione R.C.A. (responsabilità civile auto) sono gli importi massimi che l'impresa assicuratrice si impegna a pagare, in caso di incidente",
          answer: 1,
          chunks: [
            { it: MASS, fa: MASS_FA },
            { it: "sono gli importi massimi che l'impresa assicuratrice si impegna a pagare,", fa: "بیشترین مبلغ‌هایی‌اند که شرکتِ بیمه متعهد می‌شود بپردازد،", verb: "si impegna ← impegnarsi" },
            { it: "in caso di incidente", fa: "در صورتِ تصادف", focus: "condition" },
          ],
          translation: "سقف‌های تعهدِ بیمه‌نامه‌ی شخص ثالث بیشترین مبلغ‌هایی‌اند که شرکتِ بیمه متعهد می‌شود در صورتِ تصادف بپردازد.",
          why: "درست است. سقف پولی است که از شرکت به زیان‌دیده می‌رود.",
        },
        {
          sourceId: "6678",
          textIt: "I massimali della polizza di assicurazione R.C.A. (responsabilità civile auto ) sono le somme di denaro che l'impresa assicuratrice riscuote ogni anno dal proprio cliente",
          answer: 0,
          chunks: [
            { it: "I massimali della polizza di assicurazione R.C.A. (responsabilità civile auto )", fa: MASS_FA },
            { it: "sono le somme di denaro che l'impresa assicuratrice riscuote ogni anno dal proprio cliente", fa: "پول‌هایی‌اند که شرکتِ بیمه هر سال از مشتری‌اش می‌گیرد", verb: "riscuote ← riscuotere", focus: "contrast" },
          ],
          translation: "سقف‌های تعهدِ بیمه‌نامه‌ی شخص ثالث پول‌هایی‌اند که شرکتِ بیمه هر سال از مشتری‌اش می‌گیرد.",
          why: "غلط است. پولی که هر سال از تو می‌گیرند «حقِ بیمه» (premio) است، نه سقف.",
        },
      ],
      takeaway: "massimale → از شرکت به زیان‌دیده. premio → از تو به شرکت. «riscuote», «restituiti» و «aumentano ogni anno» کنارِ massimale غلط‌اند.",
      rule: `${CAP("128")}; ${IVASS}`,
    },
  ],
  practice: [
    {
      sourceId: "6676",
      textIt: "La cifra minima dei massimali della polizza di assicurazione R.C.A. (responsabilità civile auto) viene stabilita dalla legge",
      answer: 1,
      chunks: [
        { it: "La cifra minima dei massimali della polizza di assicurazione R.C.A. (responsabilità civile auto)", fa: "کمترین مبلغِ سقف‌های تعهدِ بیمه‌نامه‌ی شخص ثالث" },
        { it: "viene stabilita dalla legge", fa: "را قانون تعیین می‌کند", verb: "viene stabilita ← stabilire" },
      ],
      translation: "کمترین مبلغِ سقف‌های تعهدِ بیمه‌نامه‌ی شخص ثالث را قانون تعیین می‌کند.",
      why: "درست است (قدم ۱). ماده‌ی ۱۲۸؛ قرارداد می‌تواند بالاتر برود، نه پایین‌تر.",
      rule: CAP("128"),
      conceptStep: 1,
    },
    {
      sourceId: "6680",
      textIt: "I massimali della polizza di assicurazione R.C.A. (responsabilità civile auto) vengono restituiti al cliente alla fine dell'anno, se non si causano incidenti",
      answer: 0,
      chunks: [
        { it: MASS, fa: MASS_FA },
        { it: "vengono restituiti al cliente alla fine dell'anno,", fa: "آخرِ سال به مشتری پس داده می‌شوند،", verb: "vengono restituiti ← restituire", focus: "contrast" },
        { it: "se non si causano incidenti", fa: "اگر تصادفی ایجاد نشود", focus: "condition" },
      ],
      translation: "سقف‌های تعهدِ بیمه‌نامه‌ی شخص ثالث، اگر تصادفی ایجاد نشود، آخرِ سال به مشتری پس داده می‌شوند.",
      why: "غلط است (قدم ۱). سقف پولی نیست که تو داده باشی. بی‌تصادف بودن با بونوس‌مالوس حقِ بیمه‌ی سالِ بعد را کم می‌کند (درسِ ۵)، پولی پس داده نمی‌شود.",
      rule: `${CAP("128")}; ${IVASS}`,
      conceptStep: 1,
    },
    {
      sourceId: "6668",
      textIt: "Le polizze assicurative stipulate di solito per coprire i danni da furto, incendio, atti vandalici, eventi naturali o danni al proprio veicolo (polizza kasko) non sono obbligatorie",
      answer: 1,
      chunks: [
        { it: "Le polizze assicurative stipulate di solito per coprire i danni", fa: "بیمه‌نامه‌هایی که معمولاً برای پوشاندنِ خسارت‌های" },
        { it: "da furto, incendio, atti vandalici, eventi naturali o danni al proprio veicolo (polizza kasko)", fa: "سرقت، آتش‌سوزی، خرابکاری، حوادثِ طبیعی یا آسیب به خودروی خودت (بیمه‌ی بدنه) بسته می‌شوند" },
        { it: "non sono obbligatorie", fa: "اجباری نیستند", focus: "negation" },
      ],
      translation: "بیمه‌نامه‌هایی که معمولاً برای پوشاندنِ خسارت‌های سرقت، آتش‌سوزی، خرابکاری، حوادثِ طبیعی یا آسیب به خودروی خودت (بیمه‌ی بدنه) بسته می‌شوند، اجباری نیستند.",
      why: "درست است (قدم ۲). فقط بیمه‌ی شخص ثالث اجباری است.",
      rule: `${CAP("122")}; ${IVASS}`,
      conceptStep: 2,
    },
    {
      sourceId: "6673",
      textIt: "Per poter stipulare una polizza assicurativa contro il rischio di furto, occorre che il veicolo sia dotato di antifurto",
      answer: 0,
      chunks: [
        { it: "Per poter stipulare una polizza assicurativa contro il rischio di furto,", fa: "برای این‌که بتوانی بیمه‌نامه‌ی سرقت ببندی،", focus: "condition" },
        { it: "occorre che il veicolo sia dotato di antifurto", fa: "لازم است خودرو دزدگیر داشته باشد", verb: "occorre ← occorrere", focus: "always" },
      ],
      translation: "برای این‌که بتوانی بیمه‌نامه‌ی سرقت ببندی، لازم است خودرو دزدگیر داشته باشد.",
      why: "غلط است (قدم ۲). چنین شرطِ کلی‌ای در قانون نیست؛ اگر شرکتی بخواهد، شرطِ قراردادِ خودش است.",
      rule: IVASS,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6675", "6676", "6677", "6678", "6679", "6680"] },
    { step: 2, sourceIds: ["6668", "6669", "6670", "6671", "6672", "6673", "6674"] },
  ],
};

export const lessonSenzaAssicurazione: Lesson = {
  id: "senza-assicurazione-fondo",
  titleFa: "بدونِ بیمه، و صندوقِ تضمین",
  titleIt: "SENZA ASSICURAZIONE · FONDO DI GARANZIA",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی خودروی بی‌بیمه را نه می‌شود راند و نه روی جاده‌ی عمومی پارک کرد، چه جریمه و چه پیامدی دارد، و هیچ «استثنای کوتاهی» ندارد. و می‌دانی اگر خودروی بی‌بیمه یا ناشناس به تو بزند، «صندوقِ تضمینِ قربانیانِ جاده» کِی خسارت را می‌دهد.",
      why:
        "۱۴ سؤال. در بخشِ اول، جمله‌ی غلط استثنا می‌سازد: «فقط مسیرِ کوتاه»، «فقط در ایتالیا»، «پارک اشکالی ندارد»، «اگر خودم بپردازم». در بخشِ دوم، صندوق را چیزی می‌سازد که نیست: جایزه، مستمری، قراردادِ اختیاری، یا صندوقِ راننده‌های زیرِ سن.",
      rule: `${CDS("193")}; ${CAP("283")}`,
    },
    {
      kind: "table",
      title: "خودروی بی‌بیمه",
      body:
        "بیمه‌ی شخص ثالث برای حفظِ دیگران است، پس قانون استثنایی برایش نمی‌گذارد. در قانونِ راهنمایی‌ورانندگی، «رفت‌وآمد» (circolazione) حرکت، توقف و پارک را با هم در بر می‌گیرد:",
      columns: ["قاعده"],
      rows: [
        { label: "راندن", it: "è vietato utilizzare il veicolo", values: ["ممنوع، روی هر جاده‌ی عمومی. مسیرِ کوتاه، «فقط تا تعمیرگاه» یا «فقط در ایتالیا» استثنا نیستند؛ بیمه در اروپا هم لازم است."] },
        { label: "پارک", it: "lasciare in sosta sulle strade pubbliche", values: ["ممنوع. خودروی بی‌بیمه را روی خیابانِ عمومی پارک کنی، همان جریمه را داری."] },
        { label: "«خودم می‌دهم»", it: "pagare personalmente i danni", values: ["پذیرفته نیست. بیمه برای این است که زیان‌دیده پولش را حتماً بگیرد، نه این‌که تو قول بدهی."] },
        { label: "جریمه", it: "una sanzione", values: ["جریمه‌ی اداری (در متنِ ماده‌ی ۱۹۳ که در ۱۵ نوامبرِ ۲۰۲۶ خوانده شد: ۸۶۶ تا ۳۴۶۴ یورو)، توقیفِ فوریِ خودرو؛ تکرار در دو سال: تعلیقِ گواهینامه برای یک تا دو ماه. اگر در مهلت جریمه داده نشود و بیمه برقرار نشود، خودرو مصادره می‌شود."] },
        { label: "معاینه‌ی فنی؟", it: "collaudo tecnico", values: ["ربطی ندارد. برای برگشتن به جاده بیمه‌ی تازه لازم است، نه آزمایشِ فنیِ خودرو."] },
        { label: "۱۵ روزِ بعد از سررسید", it: "periodo di tolleranza", values: ["قانون بعد از سررسید، پوشش را تا ۱۵ روز نگه می‌دارد تا بیمه‌ی تازه بخری. جمله‌های بانک درباره‌ی وقتی‌اند که پوشش واقعاً تمام شده."] },
      ],
      takeaway: "بی‌بیمه: نه راندن، نه پارک روی جاده‌ی عمومی، نه کوتاه، نه با قول. جریمه، توقیف، و ممکن است مصادره.",
      rule: `${CDS("193")} c.1–4; ${CDS("3")} (circolazione); ${CAP("170-bis")}; ${CAP("122")} c.4; ${IVASS}`,
    },
    {
      kind: "table",
      title: "صندوقِ تضمینِ قربانیانِ جاده",
      body:
        "صندوقی عمومی است (به دستِ Consap) که با قانون ساخته شده تا زیان‌دیده بی‌پول نماند وقتی بیمه‌ای نیست که بپردازد. بعد، صندوق پولش را از مسئول پس می‌گیرد؛ پس راننده‌ی بی‌بیمه با آن آزاد نمی‌شود:",
      columns: ["صندوق می‌پردازد؟", "توضیح"],
      rows: [
        { label: "خودروی بی‌بیمه", it: "veicoli non coperti da assicurazione", values: ["بله", "آسیب به آدم و مال."] },
        { label: "خودروی ناشناس", it: "veicoli non identificati", values: ["بله، برای آدم", "آسیب به آدم. خسارتِ مال فقط وقتی همراهش آسیبِ بدنیِ جدی باشد."] },
        { label: "خودروی دزدیده‌شده", it: "contro la volontà del proprietario", values: ["بله", "وقتی سرقت گزارش شده؛ آدم و مال."] },
        { label: "جایزه برای راننده‌ی بی‌تصادف", it: "un premio per chi non ha provocato incidenti", values: ["نه", "جایزه‌ای نیست؛ آن کارِ بونوس‌مالوس است (درسِ ۵)."] },
        { label: "مستمری برای راننده‌ی زخمی", it: "un vitalizio al conducente infortunato", values: ["نه", "خسارتِ قربانی را جبران می‌کند؛ درآمدی همیشگی برای راننده‌ها نیست."] },
        { label: "قراردادی اختیاری", it: "una convenzione facoltativa", values: ["نه", "با قانون وجود دارد؛ کسی «عضوش» نمی‌شود."] },
        { label: "راننده‌ی زیرِ سن", it: "conducenti minorenni", values: ["نه", "قاعده‌ی جدایی برای زیرِ سن‌ها نیست. اگر خودرو بیمه دارد، بیمه‌اش می‌پردازد."] },
      ],
      takeaway: "صندوق = وقتی خودرو بی‌بیمه، ناشناس یا دزدیده‌شده است. نه جایزه، نه مستمری، نه اختیاری، نه برای زیرِ سن‌ها.",
      rule: `${CAP("283")}; ${CONSAP}; ${IVASS}`,
    },
    {
      kind: "classify",
      title: "تمرین: صندوق می‌پردازد؟",
      body: `${DISCLAIMER} در هر خط تو زیان‌دیده‌ای و تقصیری نداری، مگر خلافش نوشته شده باشد. بگو:`,
      options: [
        { it: "paga il Fondo", fa: "صندوق می‌پردازد" },
        { it: "non paga il Fondo", fa: "صندوق نمی‌پردازد" },
        { it: "non si può dire", fa: "از این اطلاعات معلوم نیست" },
      ],
      items: [
        { prompt: "پیاده‌ای. خودرویی به تو می‌زند و فرار می‌کند؛ هیچ‌کس پلاکش را ندید. پایت آسیب دیده.", answer: 0, explain: "خودروی ناشناس، آسیب به آدم (قدمِ ۲)." },
        { prompt: "شب خودرویی ناشناس آینه‌ی خودروی پارک‌شده‌ات را می‌شکند و می‌رود. کسی آسیب ندیده.", answer: 1, explain: "ناشناس و فقط مال، بی‌آسیبِ بدنیِ جدی: صندوق نمی‌پردازد." },
        { prompt: "خودرویی که پلاکش معلوم است ولی بیمه ندارد، به خودروات می‌زند و دستت را می‌شکند.", answer: 0, explain: "خودروی شناخته‌شده ولی بی‌بیمه: صندوق هم آسیبِ آدم و هم خسارتِ مال را می‌دهد." },
        { prompt: "خودرویی بیمه‌شده به تو می‌زند.", answer: 1, explain: "بیمه‌ی خودِ آن خودرو می‌پردازد؛ صندوق نه." },
        { prompt: "خودرویی دزدیده‌شده، که مالکش سرقت را گزارش داده، به تو می‌زند.", answer: 0, explain: "بی‌رضایتِ مالک و گزارش‌شده." },
        { prompt: "خودت روی یخ لیز می‌خوری و به دیوار می‌زنی؛ هیچ خودروی دیگری نیست.", answer: 1, explain: "شخصِ ثالثی نیست؛ فقط بیمه‌ی بدنه‌ی خودت، اگر داری." },
        { prompt: "پلاکِ خودروی دیگر را داری، ولی هنوز معلوم نیست بیمه داشته یا نه.", answer: 2, explain: "اگر بیمه داشته، بیمه‌اش؛ اگر نه، صندوق. هنوز نمی‌شود گفت." },
      ],
      takeaway: "اول بپرس: آن خودرو بیمه داشت و شناخته شد؟ اگر بله، بیمه‌اش. اگر بی‌بیمه، ناشناس یا دزدیده: صندوق، با مرزِ «مالِ تنها» برای ناشناس.",
      rule: `${CAP("283")}; ${CONSAP}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "scaduta di validità", fa: "اعتبارش تمام‌شده" },
        { it: "privo di copertura assicurativa", fa: "بی‌پوششِ بیمه" },
        { it: "lasciare in sosta", fa: "پارک کردن", base: "lasciare" },
        { it: "la confisca del veicolo", fa: "مصادره‌ی خودرو" },
        { it: "il sequestro", fa: "توقیف" },
        { it: "il Fondo di garanzia per le vittime della strada", fa: "صندوقِ تضمینِ قربانیانِ جاده" },
        { it: "veicolo non identificato", fa: "خودروی ناشناس" },
        { it: "veicolo non assicurato", fa: "خودروی بی‌بیمه" },
        { it: "facoltativo", fa: "اختیاری" },
        { it: "il conducente minorenne", fa: "راننده‌ی زیرِ سن" },
      ],
    },
    {
      kind: "trap",
      title: "«in sosta»: پارک هم حساب است؟",
      body: "هر دو جمله درباره‌ی پارکِ خودروی بی‌بیمه روی جاده‌ی عمومی‌اند. یکی می‌گوید جریمه دارد؛ دیگری می‌گوید مجاز است:",
      examples: [
        {
          sourceId: "6655",
          textIt: "Quando l'assicurazione per la responsabilità civile auto è scaduta di validità si incorre in una sanzione se si circola o si lascia in sosta il veicolo sulle strade pubbliche",
          answer: 1,
          chunks: [
            { it: QS, fa: QS_FA },
            { it: "si incorre in una sanzione", fa: "مشمولِ جریمه می‌شوی", verb: "si incorre ← incorrere" },
            { it: "se si circola o si lascia in sosta il veicolo sulle strade pubbliche", fa: "اگر با خودرو روی جاده‌های عمومی رفت‌وآمد کنی یا آن را پارک کنی", focus: "condition" },
          ],
          translation: "وقتی اعتبارِ بیمه‌ی شخص ثالث تمام شده، اگر با خودرو روی جاده‌های عمومی رفت‌وآمد کنی یا آن را آن‌جا پارک کنی، مشمولِ جریمه می‌شوی.",
          why: "درست است. پارک هم بخشی از «رفت‌وآمد» است.",
        },
        {
          sourceId: "6659",
          textIt: "Quando l'assicurazione per la responsabilità civile auto è scaduta di validità è possibile lasciare il veicolo in sosta sulle strade pubbliche",
          answer: 0,
          chunks: [
            { it: QS, fa: QS_FA },
            { it: "è possibile lasciare il veicolo in sosta sulle strade pubbliche", fa: "می‌شود خودرو را روی جاده‌های عمومی پارک کرد", focus: "contrast" },
          ],
          translation: "وقتی اعتبارِ بیمه‌ی شخص ثالث تمام شده، می‌شود خودرو را روی جاده‌های عمومی پارک کرد.",
          why: "غلط است. پارکِ خودروی بی‌بیمه روی جاده‌ی عمومی هم ممنوع است و جریمه دارد.",
        },
      ],
      takeaway: "در جمله‌های «assicurazione scaduta»، هر «è possibile», «si può continuare» یا «solo per» یک استثنای ساختگی است.",
      rule: `${CDS("193")}; ${CDS("3")}; ${IVASS}`,
    },
  ],
  practice: [
    {
      sourceId: "6654",
      textIt: "È vietato utilizzare il veicolo privo di copertura assicurativa sulle strade pubbliche",
      answer: 1,
      chunks: [
        { it: "È vietato utilizzare il veicolo privo di copertura assicurativa", fa: "استفاده از خودروی بی‌پوششِ بیمه ممنوع است", focus: "negation" },
        { it: "sulle strade pubbliche", fa: "روی جاده‌های عمومی" },
      ],
      translation: "استفاده از خودروی بی‌پوششِ بیمه روی جاده‌های عمومی ممنوع است.",
      why: "درست است (قدم ۱). ماده‌ی ۱۹۳.",
      rule: CDS("193"),
      conceptStep: 1,
    },
    {
      sourceId: "6657",
      textIt: "Quando l'assicurazione per la responsabilità civile auto è scaduta di validità si può continuare a usare il veicolo solo per brevi tragitti",
      answer: 0,
      chunks: [
        { it: QS, fa: QS_FA },
        { it: "si può continuare a usare il veicolo", fa: "می‌شود به استفاده از خودرو ادامه داد", verb: "si può ← potere" },
        { it: "solo per brevi tragitti", fa: "فقط برای مسیرهای کوتاه", focus: "limit" },
      ],
      translation: "وقتی اعتبارِ بیمه‌ی شخص ثالث تمام شده، فقط برای مسیرهای کوتاه می‌شود به استفاده از خودرو ادامه داد.",
      why: "غلط است (قدم ۱). مسیرِ کوتاه استثنا نیست؛ یک تصادف در مسیرِ کوتاه هم ممکن است.",
      rule: CDS("193"),
      conceptStep: 1,
    },
    {
      sourceId: "6662",
      textIt: "Il \"fondo di garanzia per le vittime della strada\" prevede il risarcimento dei danni arrecati alle persone da veicoli non coperti da assicurazione",
      answer: 1,
      chunks: [
        { it: FG, fa: FG_FA },
        { it: "prevede il risarcimento dei danni arrecati alle persone", fa: "جبرانِ خسارت‌هایی را پیش‌بینی می‌کند که به آدم‌ها وارد شده", verb: "prevede ← prevedere" },
        { it: "da veicoli non coperti da assicurazione", fa: "از طرفِ وسیله‌هایی که بیمه نداشته‌اند", focus: "condition" },
      ],
      translation: "«صندوقِ تضمینِ قربانیانِ جاده» جبرانِ خسارت‌هایی را پیش‌بینی می‌کند که وسیله‌های بی‌بیمه به آدم‌ها زده‌اند.",
      why: "درست است (قدم ۲). بی‌بیمه: صندوق آدم (و مال) را جبران می‌کند.",
      rule: CAP("283"),
      conceptStep: 2,
    },
    {
      sourceId: "6666",
      textIt: "Il \"fondo di garanzia per le vittime della strada\" è una convenzione facoltativa",
      answer: 0,
      chunks: [
        { it: FG, fa: FG_FA },
        { it: "è una convenzione facoltativa", fa: "یک قراردادِ اختیاری است", focus: "contrast" },
      ],
      translation: "«صندوقِ تضمینِ قربانیانِ جاده» یک قراردادِ اختیاری است.",
      why: "غلط است (قدم ۲). صندوق را قانون ساخته؛ عضویت و قراردادی در کار نیست.",
      rule: CAP("283"),
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6654", "6655", "6656", "6657", "6658", "6659", "6660", "6661"] },
    { step: 2, sourceIds: ["6662", "6663", "6664", "6665", "6666", "6667"] },
  ],
};
