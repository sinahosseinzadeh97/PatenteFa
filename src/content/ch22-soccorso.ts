/**
 * src/content/ch22-soccorso.ts
 * Chapter 22 (Alcool, droga e primo soccorso), lessons 5–6. First aid starts
 * here and is taught for an untrained learner: call 112 (or 118), follow the
 * operator, do what is simple and safe, avoid what harms.
 *
 *  L5 the duty to help (group 582: c.p. art. 593; for drivers involved, CdS
 *     art. 189 as taught in chapter 21 lesson 7, linked, not repeated) and what
 *     a rescuer does and does not do (group 593).
 *  L6 the aims of first aid (group 583) and an unconscious casualty (589),
 *     against ERC Guidelines 2025 First Aid.
 *
 * The "what should you do next?" steps are original exercises (classify, three
 * answers, several right), fixed in this file and explained per item. They say
 * they are not bank questions, not emergency instructions and not a course.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter22.test.ts.
 */
import type { Lesson } from "./lessons.js";

const ERC = "European Resuscitation Council, Guidelines 2025 First Aid (Resuscitation 215, 2025, 110752)";
const CP_593 = "Codice penale, art. 593 c.2 (omissione di soccorso)";
const CDS_189 = "Codice della Strada, art. 189 c.1";
const DISCLAIMER =
  "تمرینِ آموزشی است، نه سؤالِ بانک؛ موقعیتی ساده‌شده برای فهمیدنِ درس، نه دستورِ اضطراری برای موقعیتِ واقعیِ تو و نه جایگزینِ دوره‌ی عملیِ کمک‌های اولیه. در موقعیتِ واقعی با ۱۱۲ (یا ۱۱۸) تماس بگیر و از دستورهای اپراتور پیروی کن.";
const ACTIONS = [
  { it: "fallo", fa: "انجامش بده" },
  { it: "non è richiesto", fa: "لازم نیست" },
  { it: "non farlo", fa: "نکن" },
];
const SOCCORRERE = "Soccorrere un ferito della strada";
const SOCCORRERE_FA = "کمک رساندن به زخمیِ تصادف";
const SOCCORRITORE = "Dopo un incidente stradale, il soccorritore che interviene deve";
const SOCCORRITORE_FA = "بعد از تصادف، کمک‌رسانی که وارد عمل می‌شود باید";
const FINE = "Il fine del primo soccorso è quello di";
const FINE_FA = "هدفِ کمک‌های اولیه این است که";
const INCOSCIENTE = "Se un ferito della strada è in stato di incoscienza,";
const INCOSCIENTE_FA = "اگر زخمیِ تصادف بیهوش است،";

export const lessonSoccorsoObbligo: Lesson = {
  id: "soccorso-obbligo",
  titleFa: "کمک رساندن: وظیفه‌ی قانونی و حدِ کمک‌رسان",
  titleIt: "SOCCORRERE UN FERITO: OBBLIGO E LIMITI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی که کمک به زخمیِ تصادف برای همه وظیفه‌ی قانونی است، نه فقط برای پزشک، و اینکه کمک‌رسانِ آموزش‌ندیده چه کاری می‌کند و چه کاری نه: اول ایمنی، بعد خبر کردن، بعد کمکِ ساده در حدِ توان، و هیچ کارِ پزشکی. این درس‌ها گواهیِ کمک‌های اولیه نیستند؛ مهارتِ عملی را فقط دوره‌ی حضوری (مثلاً صلیبِ سرخِ ایتالیا) می‌دهد.",
      why:
        "۱۵ سؤال. بیشترِ جمله‌های غلط وظیفه را کوچک می‌کنند («فقط اخلاقی»، «فقط پزشک»، «فقط اگر جدی است») یا کمک‌رسان را به کارِ اشتباه می‌کشانند (رفتن، بیکار ماندن، دارو دادن، اول اسم پرسیدن).",
      rule: `${CP_593}; ${CDS_189}`,
    },
    {
      kind: "table",
      title: "وظیفه‌ی قانونی، برای همه",
      body:
        "دو قانون: راننده‌ی درگیر در تصادف باید بایستد و کمک برساند (ماده‌ی ۱۸۹؛ فصلِ ۲۱، درسِ «بعد از تصادف: وظیفه‌های راننده»). و هر کسی که آدمِ زخمی یا در خطری پیدا کند باید کمکِ لازم برساند یا فوراً به مقامات خبر بدهد (قانونِ جزا، ماده‌ی ۵۹۳)؛ نکردنش جرم است.",
      columns: ["چه می‌گوید"],
      rows: [
        { label: "قانونی، نه فقط اخلاقی", it: "obbligatorio per legge", values: ["کمک رساندن وظیفه‌ی قانونی است. «فقط وظیفه‌ی اخلاقی» غلط است."] },
        { label: "همه، نه فقط پزشک", it: "non solo medici e personale sanitario", values: ["وظیفه برای همه است. فرقِ پزشک و تو در نوعِ کمک است، نه در وجودِ وظیفه."] },
        { label: "هر تصادف", it: "non solo se si considera grave", values: ["تو نمی‌توانی از بیرون بفهمی آسیب جدی است یا نه؛ وظیفه به برداشتِ تو بستگی ندارد."] },
        { label: "ایمنیِ خودت", it: "la propria sicurezza", values: ["قانون نمی‌خواهد جانت را به خطر بیندازی. ولی وظیفه از بین نمی‌رود: اگر نزدیک شدن خطرناک است (آتش، ترافیکِ تند)، با خبر کردنِ ۱۱۲ (یا ۱۱۸) وظیفه‌ات را انجام می‌دهی. «لازم نیست، چون خطر دارد» غلط است."] },
        { label: "ترافیک بهانه نیست", it: "intralcio alla circolazione", values: ["اگر کمک کردن راه را کمی بند بیاورد، باز هم وظیفه است. خودت را امن کن: بیرون از سواره‌رو پارک کن، چراغِ خطر، جلیقه‌ی شب‌نما، و بیرونِ آبادی مثلث (فصلِ ۱۷)."] },
        { label: "چرا مهم است", it: "salvargli la vita · ulteriori danni", values: ["چند دقیقه‌ی اول ممکن است جان را نجات دهد و جلوی آسیبِ بیشتر را بگیرد: خونریزی، خفگی، ماشینی که از پشت می‌آید."] },
      ],
      takeaway: "کمک وظیفه‌ی قانونیِ همه است. وقتی نزدیک شدن خطر دارد، خبر کردن همان کمک است.",
      rule: `${CP_593}; ${CDS_189}`,
    },
    {
      kind: "table",
      title: "کمک‌رسان چه می‌کند، چه نمی‌کند",
      body:
        "رهنمودهای امروزِ کمک‌های اولیه (شورای احیای اروپا، ۲۰۲۵) با یک اصل شروع می‌کنند: همیشه کمک خبر کن، و فقط کاری را بکن یا ابزاری را به کار ببر که برایش آموزش دیده‌ای. با همین اصل:",
      columns: ["کارِ درست"],
      rows: [
        { label: "اول صحنه را بسنج", it: "valutare bene la situazione", values: ["ترافیک، آتش، بنزینِ ریخته؟ خودت و زخمی‌ها را از خطرِ تازه دور نگه دار؛ تو اگر زخمی شوی، یک زخمیِ دیگر اضافه شده."] },
        { label: "خبر کن", it: "chiamare il 112 / 118", values: ["۱۱۲ (یا ۱۱۸): بگو کجا هستی، چه شده، چند زخمی، و آیا به هوش‌اند و نفس می‌کشند. گوشی را روی بلندگو بگذار، قطع نکن، و هر چه اپراتور گفت انجام بده."] },
        { label: "در حدِ توان و دانش", it: "secondo le proprie possibilità e conoscenze", values: ["کمکِ ساده: کنارش بمان، با او حرف بزن، گرمش نگه دار، روی خونریزی فشار بده (درسِ ۷). هیچ کارِ تخصصیِ پزشکی، و هیچ دارویی به او نده."] },
        { label: "نرو، بیکار هم نمان", it: "non allontanarsi · non aspettare senza fare nulla", values: ["رفتن از صحنه غلط است؛ فقط منتظرِ آمبولانس ماندن و هیچ کاری نکردن هم."] },
        { label: "اسم اولویت نیست", it: "non identificare per primo", values: ["اول ببین آیا جواب می‌دهد، نفس می‌کشد، خونریزی دارد. حرف زدن با او برای سنجیدنِ هوشیاری خوب است؛ پرسیدنِ اسم و فامیل کارِ اول نیست."] },
      ],
      takeaway: "ایمنی، خبر کردن، کمکِ ساده در حدِ توان. نه رفتن، نه بیکار ماندن، نه دارو.",
      rule: ERC,
    },
    {
      kind: "classify",
      title: "حالا چه کنی؟ اولین نفر در صحنه",
      body: `${DISCLAIMER} بیرونِ آبادی، روز، جاده‌ی دوطرفه. خودرویی از جاده بیرون رفته و به درخت خورده. اولین نفری هستی که می‌رسد. راننده پشتِ فرمان نشسته، جواب می‌دهد و از درد می‌نالد. دود یا آتش یا بوی بنزین نیست. هنوز کسی خبر نکرده. برای هر کار بگو:`,
      options: ACTIONS,
      items: [
        { prompt: "خودروی خودت را بیرون از سواره‌رو پارک می‌کنی، چراغِ خطر روشن می‌کنی و جلیقه‌ی شب‌نما می‌پوشی", answer: 0, explain: "اول ایمنیِ خودت و صحنه؛ جلیقه بیرونِ آبادی وقتی پیاده روی جاده می‌روی لازم است (فصلِ ۱۷)." },
        { prompt: "با ۱۱۲ (یا ۱۱۸) تماس می‌گیری، می‌گویی کجایی و چه دیده‌ای، و روی بلندگو می‌مانی", answer: 0, explain: "هنوز کسی خبر نکرده؛ خبر کردن مهم‌ترین کمک است." },
        { prompt: "هر چه اپراتور می‌گوید قدم‌به‌قدم انجام می‌دهی", answer: 0, explain: "اپراتور آموزش دیده و موقعیت را از تو می‌شنود؛ دستورش بر حدسِ تو مقدم است." },
        { prompt: "راننده را فوراً از خودرو بیرون می‌کشی تا راحت‌تر باشد", answer: 2, explain: "خطری نیست؛ ممکن است آسیبِ گردن یا ستونِ مهره‌ها داشته باشد. فقط در خطرِ واقعی (آتش، ترافیکی که نمی‌شود متوقف کرد) جابه‌جا کن." },
        { prompt: "قرصِ مسکنی که در کیفت داری به او می‌دهی", answer: 2, explain: "کمک‌رسانِ آموزش‌ندیده دارو نمی‌دهد." },
        { prompt: "کنارش می‌مانی، با او آرام حرف می‌زنی و هر تغییری را به اپراتور می‌گویی", answer: 0, explain: "کمکِ ساده در حدِ توان: ماندن، آرام کردن، دیدن." },
        { prompt: "فرمِ توافقیِ تصادف را پر می‌کنی", answer: 1, explain: "تو درگیرِ تصادف نیستی و فرم ربطی به کمک ندارد." },
      ],
      takeaway: "امن کن، خبر کن، بمان و ساده کمک کن. جابه‌جا کردن و دارو دادن کارِ تو نیست، مگر خطرِ واقعی یا دستورِ اپراتور.",
      rule: `${ERC}; ${CP_593}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "soccorrere", fa: "کمک رساندن" },
        { it: "il ferito della strada", fa: "زخمیِ تصادف" },
        { it: "il soccorritore", fa: "کمک‌رسان" },
        { it: "il primo soccorso", fa: "کمک‌های اولیه" },
        { it: "l'obbligo imposto dalla legge", fa: "وظیفه‌ی قانونی" },
        { it: "il dovere morale", fa: "وظیفه‌ی اخلاقی" },
        { it: "il personale sanitario", fa: "کادرِ درمان" },
        { it: "l'infortunato", fa: "مصدوم" },
        { it: "l'omissione di soccorso", fa: "کمک نکردن (جرم)" },
      ],
    },
    {
      kind: "trap",
      title: "«obbligo»: قانونی یا فقط اخلاقی؟",
      body: "هر دو جمله درباره‌ی وظیفه‌ی کمک‌اند. یکی می‌گوید قانون آن را می‌خواهد، دیگری فقط وجدان:",
      examples: [
        {
          sourceId: "6489",
          textIt: "Soccorrere un ferito della strada è obbligatorio per legge",
          answer: 1,
          chunks: [
            { it: SOCCORRERE, fa: SOCCORRERE_FA },
            { it: "è obbligatorio per legge", fa: "طبقِ قانون اجباری است", verb: "è ← essere" },
          ],
          translation: "کمک رساندن به زخمیِ تصادف طبقِ قانون اجباری است.",
          why: "درست است. قانونِ جزا (ماده‌ی ۵۹۳) و برای راننده‌ی درگیر ماده‌ی ۱۸۹.",
        },
        {
          sourceId: "6492",
          textIt: "Soccorrere un ferito della strada non è un obbligo imposto dalla legge, ma solo un dovere morale",
          answer: 0,
          chunks: [
            { it: SOCCORRERE, fa: SOCCORRERE_FA },
            { it: "non è un obbligo imposto dalla legge,", fa: "وظیفه‌ای نیست که قانون گذاشته باشد،", verb: "è ← essere", focus: "negation" },
            { it: "ma solo un dovere morale", fa: "بلکه فقط وظیفه‌ای اخلاقی است", focus: "limit" },
          ],
          translation: "کمک رساندن به زخمیِ تصادف وظیفه‌ای نیست که قانون گذاشته باشد، بلکه فقط وظیفه‌ای اخلاقی است.",
          why: "غلط است. هم اخلاقی است و هم قانونی؛ نکردنش جرم است.",
        },
      ],
      takeaway: "هر جمله‌ای که وظیفه‌ی کمک را «non obbligatorio» یا «solo per …» کند، غلط است.",
      rule: CP_593,
    },
  ],
  practice: [
    {
      sourceId: "6493",
      textIt: "Bisogna soccorrere un ferito della strada solo se si considera grave l'incidente",
      answer: 0,
      chunks: [
        { it: "Bisogna soccorrere un ferito della strada", fa: "باید به زخمیِ تصادف کمک کرد", verb: "bisogna ← bisognare" },
        { it: "solo se si considera grave l'incidente", fa: "فقط اگر تصادف جدی به نظر برسد", focus: "limit" },
      ],
      translation: "فقط اگر تصادف جدی به نظر برسد باید به زخمیِ تصادف کمک کرد.",
      why: "غلط است (قدم ۱). وظیفه به برداشتِ تو از شدتِ تصادف بستگی ندارد.",
      rule: CP_593,
      conceptStep: 1,
    },
    {
      sourceId: "6494",
      textIt: "Non è obbligatorio soccorrere un ferito della strada, per non mettere a repentaglio la propria sicurezza",
      answer: 0,
      chunks: [
        { it: "Non è obbligatorio soccorrere un ferito della strada,", fa: "کمک به زخمیِ تصادف اجباری نیست،", verb: "è ← essere", focus: "negation" },
        { it: "per non mettere a repentaglio la propria sicurezza", fa: "تا ایمنیِ خود را به خطر نیندازی", focus: "reason" },
      ],
      translation: "کمک به زخمیِ تصادف اجباری نیست، تا ایمنیِ خود را به خطر نیندازی.",
      why: "غلط است (قدم ۱). وظیفه هست؛ اگر نزدیک شدن خطرناک است، با خبر کردنِ ۱۱۲ (یا ۱۱۸) انجامش می‌دهی.",
      rule: CP_593,
      conceptStep: 1,
    },
    {
      sourceId: "6570",
      textIt: "Dopo un incidente stradale, il soccorritore che interviene deve valutare bene la situazione, per proteggere gli infortunati da altri pericoli",
      answer: 1,
      chunks: [
        { it: SOCCORRITORE, fa: SOCCORRITORE_FA, verb: "deve ← dovere" },
        { it: "valutare bene la situazione,", fa: "موقعیت را خوب بسنجد،" },
        { it: "per proteggere gli infortunati da altri pericoli", fa: "تا مصدومان را از خطرهای دیگر حفظ کند", focus: "reason" },
      ],
      translation: "بعد از تصادف، کمک‌رسانی که وارد عمل می‌شود باید موقعیت را خوب بسنجد تا مصدومان را از خطرهای دیگر حفظ کند.",
      why: "درست است (قدم ۲). اولین کار: ایمنیِ صحنه.",
      rule: ERC,
      conceptStep: 2,
    },
    {
      sourceId: "6576",
      textIt: "In caso di incidente stradale, il soccorritore deve somministrare farmaci alla vittima, se la stessa non ha specifica competenza medica",
      answer: 0,
      chunks: [
        { it: "In caso di incidente stradale, il soccorritore deve somministrare farmaci alla vittima,", fa: "در تصادف، کمک‌رسان باید به آسیب‌دیده دارو بدهد،", verb: "deve ← dovere", focus: "contrast" },
        { it: "se la stessa non ha specifica competenza medica", fa: "اگر خودِ او تخصصِ پزشکی ندارد", focus: "condition" },
      ],
      translation: "در تصادف، اگر آسیب‌دیده خودش تخصصِ پزشکی ندارد، کمک‌رسان باید به او دارو بدهد.",
      why: "غلط است (قدم ۲). کمک‌رسانِ آموزش‌ندیده دارو نمی‌دهد؛ این کارِ امدادگرانِ پزشکی است.",
      rule: ERC,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6489", "6490", "6491", "6492", "6493", "6494", "6495", "6496"] },
    { step: 2, sourceIds: ["6570", "6571", "6572", "6573", "6574", "6575", "6576"] },
  ],
};

export const lessonPrimoSoccorsoIncosciente: Lesson = {
  id: "primo-soccorso-incosciente",
  titleFa: "هدفِ کمک‌های اولیه؛ مصدومِ بیهوش",
  titleIt: "PRIMO SOCCORSO: SCOPO E FERITO INCOSCIENTE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی هدفِ کمک‌های اولیه چیست (زنده نگه داشتن و جلوگیری از آسیبِ بیشتر تا امداد برسد) و با مصدومی که جواب نمی‌دهد چه کنی: خبر کن، تنفس را بسنج، جابه‌جایش نکن، و کنارش بمان. اگر طبیعی نفس نمی‌کشد، اپراتورِ ۱۱۲ (یا ۱۱۸) قدم‌به‌قدم راهنمایی‌ات می‌کند؛ این درس آن روش را آموزش نمی‌دهد.",
      why:
        "۱۵ سؤال. جمله‌های غلط یا هدف را عوض می‌کنند (پرسیدنِ چگونگیِ تصادف، همیشه جابه‌جا کردن، صبر برای پلیس) یا کاری به بیهوش می‌کنند که خطرناک است: الکل، بستنِ دست، بستنِ سر، نشاندن.",
      rule: ERC,
    },
    {
      kind: "table",
      title: "هدفِ کمک‌های اولیه",
      body: "کمک‌های اولیه پزشکی نیست؛ پلی است تا رسیدنِ امدادِ پزشکی. چهار هدف، و سه برداشتِ غلط:",
      columns: ["در بانک", "چرا"],
      rows: [
        { label: "زنده نگه داشتن", it: "mantenere in vita con semplici e immediati interventi", values: ["درست", "کارهای ساده و فوری: خبر کردن، فشار روی خونریزی، بازگذاشتنِ راهِ تنفس"] },
        { label: "کمک تا رسیدنِ امداد", it: "in attesa che arrivi il soccorso medico", values: ["درست", "تو جای پزشک نیستی؛ نگه می‌داری تا او برسد"] },
        { label: "جلوی آسیبِ بیشتر", it: "evitare ulteriori danni", values: ["درست", "خطرِ ترافیک، سرما، حرکتِ اشتباه"] },
        { label: "نه کارِ اشتباه یا زیان‌بار", it: "interventi sbagliati o dannosi", values: ["درست", "کاری که بلد نیستی نکن؛ کمکِ اشتباه می‌تواند بدتر از هیچ باشد"] },
        { label: "پرسیدنِ چگونگیِ تصادف", it: "chiedere come è avvenuto l'incidente", values: ["غلط", "هدف نیست؛ این کارِ پلیس است، بعداً"] },
        { label: "همیشه جابه‌جا کردن", it: "allontanare in ogni caso", values: ["غلط", "فقط وقتی جایش خطرِ فوری دارد؛ وگرنه حرکت ممکن است آسیبِ ستونِ مهره‌ها را بدتر کند"] },
        { label: "دست نزدن تا پلیس بیاید", it: "non toccare se non è arrivata la polizia", values: ["غلط", "کمک منتظرِ پلیس نمی‌ماند"] },
      ],
      takeaway: "کمک‌های اولیه: ساده، فوری، بی‌ضرر، تا رسیدنِ امداد.",
      rule: ERC,
    },
    {
      kind: "table",
      title: "مصدومی که جواب نمی‌دهد",
      body:
        "شورای احیای اروپا (۲۰۲۵) برای آدمِ آسیب‌دیده یک ترتیب دارد: ایمنی، جواب می‌دهد یا نه، خونریزیِ شدید، بعد راهِ تنفس و تنفس. برای مصدومِ بیهوشِ تصادف، با زبانِ بانک:",
      columns: ["چه کنی"],
      rows: [
        { label: "صدا بزن، خبر کن", it: "chiamare subito il 112 / 118", values: ["آرام شانه‌اش را لمس کن و بلند بپرس «حالت خوب است؟». جواب نمی‌دهد: فوراً ۱۱۲ (یا ۱۱۸)، گوشی روی بلندگو."] },
        { label: "تنفس را بسنج", it: "verificare se respira", values: ["حداکثر ده ثانیه نگاه کن، گوش کن و حس کن. بانک می‌گوید دست را روی پایینِ پهلوی قفسه‌ی سینه یا روی شکم بگذار تا حرکتِ تنفس را حس کنی: همان «حس کردن» است."] },
        { label: "طبیعی نفس نمی‌کشد", it: "non respira normalmente", values: ["این را به اپراتور بگو. او قدم‌به‌قدم می‌گوید چه کنی (فشردنِ قفسه‌ی سینه). هر کاری که اپراتور می‌گوید را تا رسیدنِ امداد ادامه بده. این درس این روش را آموزش نمی‌دهد؛ دوره‌ی عملی می‌دهد."] },
        { label: "راهِ تنفس", it: "liberare il naso e la bocca", values: ["اگر به‌سختی نفس می‌کشد و در دهان یا بینی‌اش چیزی می‌بینی، بیرونش بیاور. کورکورانه انگشت در دهانش نگردان."] },
        { label: "جابه‌جا نکن", it: "colonna vertebrale", values: ["بعد از تصادف همیشه احتمالِ آسیبِ گردن و ستونِ مهره‌ها هست. بانک می‌گوید فقط وقتی جابه‌جایش کن که مطمئنی آسیبِ ستونِ مهره ندارد. رهنمودِ امروز همین را کمی دقیق‌تر می‌گوید: جابه‌جا نکن، مگر جایش خطرِ فوری دارد (آتش، ترافیک) یا اپراتور برای باز نگه داشتنِ راهِ تنفس می‌خواهد."] },
        { label: "بمان و بپا", it: "controllare spesso fino all'arrivo dell'ambulanza", values: ["تا رسیدنِ آمبولانس مدام تنفس و حالش را ببین و هر تغییری را به اپراتور بگو."] },
        { label: "هرگز", it: "alcool · bloccare le mani · fasciare la testa · semiseduto", values: ["نه الکل (و نه هیچ نوشیدنی، چون نمی‌تواند قورت بدهد)، نه بستنِ دست، نه بستنِ سر بی‌دلیل، نه نیمه‌نشسته کردن: بیهوش نمی‌تواند خودش راهِ تنفس را باز نگه دارد."] },
      ],
      takeaway: "جواب نمی‌دهد؟ خبر کن، تنفس را بسنج، به اپراتور بگو، جابه‌جا نکن، بپا. نه نوشیدنی، نه نشاندن.",
      rule: ERC,
    },
    {
      kind: "classify",
      title: "حالا چه کنی؟ موتورسوارِ بیهوش",
      body: `${DISCLAIMER} داخلِ آبادی، شب. موتورسواری بعد از برخورد با یک خودرو روی آسفالت افتاده و تکان نمی‌خورد. خودروی دیگر ایستاده و رهگذری ترافیک را با چراغ‌قوه دور می‌کند. وقتی صدایش می‌زنی جواب نمی‌دهد. خطرِ آتش نیست. هنوز کسی خبر نکرده. برای هر کار بگو:`,
      options: ACTIONS,
      items: [
        { prompt: "فوراً ۱۱۲ (یا ۱۱۸) را می‌گیری و گوشی را روی بلندگو می‌گذاری", answer: 0, explain: "بیهوش است و کسی خبر نکرده؛ خبر کردن اولین کار است." },
        { prompt: "حداکثر ده ثانیه نگاه می‌کنی، گوش می‌دهی و حس می‌کنی که نفس می‌کشد یا نه", answer: 0, explain: "اپراتور اول همین را می‌پرسد." },
        { prompt: "اگر طبیعی نفس نمی‌کشد، به اپراتور می‌گویی و هر چه گفت انجام می‌دهی", answer: 0, explain: "اپراتور تو را قدم‌به‌قدم راهنمایی می‌کند." },
        { prompt: "او را می‌نشانی و به جدولِ کنارِ خیابان تکیه می‌دهی تا راحت‌تر نفس بکشد", answer: 2, explain: "بیهوش را نیمه‌نشسته نمی‌کنند، و جابه‌جا کردن بعد از تصادف ممکن است آسیبِ ستونِ مهره‌ها را بدتر کند." },
        { prompt: "کمی آب در دهانش می‌ریزی", answer: 2, explain: "بیهوش نمی‌تواند قورت بدهد؛ نوشیدنی ممکن است راهِ تنفس را ببندد." },
        { prompt: "در جیب‌هایش دنبالِ کارتِ شناسایی می‌گردی تا اسمش را بدانی", answer: 1, explain: "شناسایی کارِ پلیس و امدادگران است، نه اولویتِ تو." },
        { prompt: "کنارش می‌مانی و مدام تنفسش را می‌بینی تا آمبولانس برسد", answer: 0, explain: "حالِ بیهوش ممکن است عوض شود؛ اپراتور باید بداند." },
      ],
      takeaway: "جواب نمی‌دهد: خبر کن، تنفس، اپراتور، بمان. نه نشاندن، نه آب، نه گشتنِ جیب.",
      rule: ERC,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "lo stato di incoscienza", fa: "بیهوشی (جواب ندادن)" },
        { it: "verificare se respira", fa: "سنجیدنِ تنفس" },
        { it: "il torace", fa: "قفسه‌ی سینه" },
        { it: "l'addome", fa: "شکم" },
        { it: "la colonna vertebrale", fa: "ستونِ مهره‌ها" },
        { it: "le ostruzioni", fa: "چیزی که راه را بسته" },
        { it: "il soccorso medico", fa: "امدادِ پزشکی" },
        { it: "ulteriori danni", fa: "آسیبِ بیشتر" },
        { it: "la posizione semiseduta", fa: "نیمه‌نشسته" },
      ],
    },
    {
      kind: "trap",
      title: "«Il fine del primo soccorso»: زنده نگه داشتن یا پرسیدن؟",
      body: "هر دو جمله هدفِ کمک‌های اولیه را تعریف می‌کنند. یکی درست است، یکی کارِ پلیس را جای آن می‌گذارد:",
      examples: [
        {
          sourceId: "6497",
          textIt: "Il fine del primo soccorso è quello di cercare di mantenere in vita il ferito con semplici e immediati interventi",
          answer: 1,
          chunks: [
            { it: FINE, fa: FINE_FA, verb: "è ← essere" },
            { it: "cercare di mantenere in vita il ferito", fa: "تلاش کنی زخمی را زنده نگه داری" },
            { it: "con semplici e immediati interventi", fa: "با کارهای ساده و فوری" },
          ],
          translation: "هدفِ کمک‌های اولیه این است که با کارهای ساده و فوری تلاش کنی زخمی را زنده نگه داری.",
          why: "درست است. ساده و فوری، تا رسیدنِ امداد.",
        },
        {
          sourceId: "6501",
          textIt: "Il fine del primo soccorso è quello di chiedere subito al ferito come è avvenuto l'incidente",
          answer: 0,
          chunks: [
            { it: FINE, fa: FINE_FA, verb: "è ← essere" },
            { it: "chiedere subito al ferito come è avvenuto l'incidente", fa: "فوراً از زخمی بپرسی تصادف چطور رخ داده", focus: "contrast" },
          ],
          translation: "هدفِ کمک‌های اولیه این است که فوراً از زخمی بپرسی تصادف چطور رخ داده.",
          why: "غلط است. این هدف نیست؛ چگونگیِ تصادف را بعداً پلیس می‌پرسد.",
        },
      ],
      takeaway: "هدف همیشه درباره‌ی حالِ زخمی است: زنده، بی‌آسیبِ بیشتر، تا امداد. هر چیزِ دیگری (پرسیدن، شناختن) غلط است.",
      rule: ERC,
    },
  ],
  practice: [
    {
      sourceId: "6500",
      textIt: "Nelle operazioni di primo soccorso bisogna evitare che al ferito vengano praticati interventi sbagliati o dannosi",
      answer: 1,
      chunks: [
        { it: "Nelle operazioni di primo soccorso", fa: "در کمک‌های اولیه" },
        { it: "bisogna evitare che al ferito vengano praticati", fa: "باید نگذاشت روی زخمی انجام شود", verb: "bisogna ← bisognare" },
        { it: "interventi sbagliati o dannosi", fa: "کارهای اشتباه یا زیان‌بار" },
      ],
      translation: "در کمک‌های اولیه باید نگذاشت کارهای اشتباه یا زیان‌بار روی زخمی انجام شود.",
      why: "درست است (قدم ۱). کاری که بلد نیستی نکن.",
      rule: ERC,
      conceptStep: 1,
    },
    {
      sourceId: "6502",
      textIt: "Nell'intervento di primo soccorso bisogna allontanare in ogni caso il ferito dal posto in cui si trova",
      answer: 0,
      chunks: [
        { it: "Nell'intervento di primo soccorso", fa: "در کمک‌های اولیه" },
        { it: "bisogna allontanare in ogni caso il ferito", fa: "باید در هر حال زخمی را دور کرد", verb: "bisogna ← bisognare", focus: "always" },
        { it: "dal posto in cui si trova", fa: "از جایی که هست" },
      ],
      translation: "در کمک‌های اولیه باید در هر حال زخمی را از جایی که هست دور کرد.",
      why: "غلط است (قدم ۱). فقط وقتی جایش خطرِ فوری دارد؛ «in ogni caso» غلط است.",
      rule: ERC,
      conceptStep: 1,
    },
    {
      sourceId: "6541",
      textIt: "Se un ferito della strada è in stato di incoscienza, bisogna verificare se respira ancora, mettendo una mano sulla parte laterale bassa del torace o sull'addome",
      answer: 1,
      chunks: [
        { it: INCOSCIENTE, fa: INCOSCIENTE_FA },
        { it: "bisogna verificare se respira ancora,", fa: "باید دید هنوز نفس می‌کشد یا نه،", verb: "bisogna ← bisognare" },
        { it: "mettendo una mano sulla parte laterale bassa del torace o sull'addome", fa: "با گذاشتنِ یک دست روی پایینِ پهلوی قفسه‌ی سینه یا روی شکم", verb: "mettendo ← mettere" },
      ],
      translation: "اگر زخمیِ تصادف بیهوش است، باید با گذاشتنِ یک دست روی پایینِ پهلوی قفسه‌ی سینه یا روی شکم دید که هنوز نفس می‌کشد یا نه.",
      why: "درست است (قدم ۲). سنجیدنِ تنفس؛ دست حرکتِ نفس را حس می‌کند.",
      rule: ERC,
      conceptStep: 2,
    },
    {
      sourceId: "6548",
      textIt: "Se un ferito della strada è in stato di incoscienza bisogna metterlo in posizione semiseduta",
      answer: 0,
      chunks: [
        { it: "Se un ferito della strada è in stato di incoscienza", fa: "اگر زخمیِ تصادف بیهوش است" },
        { it: "bisogna metterlo in posizione semiseduta", fa: "باید او را نیمه‌نشسته کرد", verb: "bisogna ← bisognare", focus: "contrast" },
      ],
      translation: "اگر زخمیِ تصادف بیهوش است باید او را نیمه‌نشسته کرد.",
      why: "غلط است (قدم ۲). بیهوش نمی‌تواند خودش راهِ تنفس را باز نگه دارد، و جابه‌جا کردن بعد از تصادف خطرناک است.",
      rule: ERC,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6497", "6498", "6499", "6500", "6501", "6502", "6503"] },
    { step: 2, sourceIds: ["6541", "6542", "6543", "6544", "6545", "6546", "6547", "6548"] },
  ],
};
