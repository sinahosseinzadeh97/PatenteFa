/**
 * src/content/lessons-incroci.ts
 * Chapter 2 of the learning path: Precedenza negli incroci (right of way at
 * intersections). Same trust rules as src/content/lessons.ts — real bank
 * statements by source_id with text + answer snapshots, faithful translations,
 * explicit question → section mappings — plus the "Who goes first?" scenarios
 * in src/content/crossings.ts.
 *
 * Scope is deliberately limited to what was verified (figures read by hand,
 * rules checked against the current Codice della Strada, reviewed 2026-10-08):
 * reading a figure, giving way to the right, vehicles on rails, turning, moving
 * together, and DARE PRECEDENZA / STOP at a junction. Not covered: circular
 * "everyone has someone on the right" figures, roundabouts, traffic lights,
 * police directions. Their questions are left unmapped on purpose.
 */
import type { Chapter, Lesson } from "./lessons.js";
import { FIG_613, FIG_614, FIG_633, FIG_637, FIG_640, FIG_643, FIG_655 } from "./crossings.js";

const SECONDO = "Secondo le norme di precedenza";
const SECONDO_FA = "طبق قواعد حق تقدم";
const NELL_INCROCIO = "nell'incrocio rappresentato in figura";
const NELL_INCROCIO_CAP = "Nell'incrocio rappresentato in figura";
const NELL_INCROCIO_FA = "در تقاطعِ نشان‌داده‌شده در شکل";
const INTERSEZIONE = "Nell'intersezione di figura";
const INTERSEZIONE_FA = "در تقاطعِ شکل";

const CDS_145 = "Codice della Strada, art. 145 c.2";

// ── Lesson 1 ──────────────────────────────────────────────────────────────────

const lessonLeggere: Lesson = {
  id: "leggere-incrocio",
  titleFa: "شکلِ تقاطع را بخوان",
  titleIt: "LEGGERE LA FIGURA",
  minutes: 4,
  signs: [],
  figures: [620, 633, 640, 646, 651, 667],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس، برای هر وسیله در شکل‌های بانک سؤال می‌گویی از کجا می‌آید، به کجا می‌رود، سمت راستش چه کسی است و جلویش چه تابلویی هست.",
      why:
        "در بانک سؤال بیش از ۴۰۰ جمله درباره‌ی شکل‌هایی با وسیله‌های حرف‌دار هست. خیلی از اشتباه‌ها از بد خواندنِ شکل می‌آید، نه از ندانستنِ قاعده.",
    },
    {
      kind: "scenario",
      title: "حرف‌ها، مسیرها و «راستِ» هر راننده",
      body:
        "این بازسازیِ آموزشیِ یک شکل بانک است. قدم‌به‌قدم جلو برو؛ هر قدم یک چیز را روی تصویر روشن می‌کند.",
      crossing: FIG_640,
      guide: [
        {
          text: "هر حرف یک وسیله است: B (کامیون) از چپِ تصویر، D از پایین، R از راستِ تصویر. L جلوی B است و دارد از تقاطع بیرون می‌رود.",
          focus: ["B", "D", "R", "L"],
        },
        {
          text: "خط‌چین‌ها مسیر را نشان می‌دهند و نوکِ فلش مقصد است. هر سه مستقیم می‌روند: B به راستِ تصویر، D به بالا، R به چپ.",
          focus: ["B", "D", "R"],
        },
        {
          text: "«راستِ» هر راننده به جهت حرکت خودش بستگی دارد، نه به راستِ صفحه. R رو به چپِ تصویر می‌راند؛ پس راستش بالای تصویر است. آنجا خالی است.",
          focus: ["R"],
          arms: ["N"],
        },
        {
          text: "D رو به بالا می‌راند؛ راستش سمت راستِ تصویر است. R از آنجا می‌آید: راستِ D «اشغال» است.",
          focus: ["D", "R"],
          arms: ["E"],
        },
        {
          text: "B رو به راستِ تصویر می‌راند؛ راستش پایینِ تصویر است. D از آنجا می‌آید.",
          focus: ["B", "D"],
          arms: ["S"],
        },
        {
          text: "تابلو یا ریلِ تراموا نیست. پس فقط قاعده‌ی عمومی می‌ماند؛ در درس بعد ترتیبِ عبور را با همان پیدا می‌کنی.",
          focus: [],
        },
      ],
      takeaway:
        "برای هر وسیله سه سؤال: از کجا می‌آید؟ به کجا می‌رود؟ راستِ خودش کدام طرفِ تصویر است؟",
      rule: CDS_145,
    },
    {
      kind: "scenario",
      title: "تابلوها روی کدام بازو هستند؟",
      body: "در این شکل، جلوی بعضی بازوها تابلو و خط روی آسفالت هست. تابلو مالِ همان بازویی است که جلویش نصب شده.",
      crossing: FIG_633,
      guide: [
        {
          text: "سه وسیله: N از پایین، A از راستِ تصویر، R از چپِ تصویر.",
          focus: ["N", "A", "R"],
        },
        {
          text: "مسیرها: N به چپ می‌پیچد (به سمت چپِ تصویر)، R هم به چپ می‌پیچد (به بالا)، A مستقیم می‌رود.",
          focus: ["N", "A", "R"],
        },
        {
          text: "جلوی بازوی A و بازوی R مثلثِ وارونه‌ی قرمز است و روی آسفالت ردیفی از مثلث‌های سفید: یعنی A و R تابلوی DARE PRECEDENZA دارند.",
          focus: ["A", "R"],
          arms: ["E", "W"],
        },
        {
          text: "بازوی N تابلو ندارد. اثرِ این را در درس ۴ کامل می‌بینی: A و R باید به N راه بدهند.",
          focus: ["N"],
          arms: ["S"],
        },
      ],
      takeaway: "تابلو را به بازوی خودش وصل کن: «جلوی کدام وسیله است؟» نه «کجای تصویر است؟».",
      rule: "Codice della Strada, art. 145 c.4; DPR 495/1992, art. 106 c.1",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'incrocio", fa: "تقاطع؛ چهارراه", note: "در سؤال‌ها «l'intersezione» هم به همین معنی می‌آید." },
        { it: "rappresentato in figura", base: "rappresentare", fa: "نشان‌داده‌شده در شکل" },
        { it: "il veicolo", fa: "وسیله‌ی نقلیه", note: "در این سؤال‌ها هر حرف (A، B، …) یک veicolo است." },
        { it: "il conducente", fa: "راننده" },
        { it: "avere la destra libera", base: "avere", fa: "سمتِ راستِ خالی داشتن؛ کسی از راست نمی‌آید" },
        { it: "avere la destra occupata", base: "avere", fa: "سمتِ راستِ اشغال داشتن؛ کسی از راست می‌آید" },
        { it: "se necessario", fa: "اگر لازم باشد" },
      ],
    },
    {
      kind: "trap",
      title: "«destra» یعنی راستِ راننده، نه راستِ صفحه",
      body:
        "اشتباه رایج: «راست» را با سمت راستِ صفحه یکی گرفتن. راستِ هر راننده به جهت حرکت خودش بستگی دارد. این دو جمله‌ی واقعیِ بانک را ببین:",
      examples: [
        {
          sourceId: "4803",
          figure: 646,
          textIt: "Nell'incrocio rappresentato in figura il veicolo A ha la destra occupata",
          answer: 1,
          chunks: [
            { it: NELL_INCROCIO_CAP, fa: NELL_INCROCIO_FA },
            { it: "il veicolo A", fa: "وسیله‌ی A" },
            { it: "ha la destra occupata", fa: "سمت راستش اشغال است", verb: "ha ← avere" },
          ],
          translation: "در تقاطعِ نشان‌داده‌شده در شکل، سمت راستِ وسیله‌ی A اشغال است.",
          why: "درست است. A در سمت راستِ تصویر است و رو به چپ می‌راند؛ پس راستِ او بالای تصویر است و کامیونِ C از همان‌جا می‌آید.",
        },
        {
          sourceId: "5026",
          figure: 651,
          textIt: "Nell'incrocio rappresentato nella figura il conducente del veicolo A ha la destra libera",
          answer: 0,
          chunks: [
            { it: "Nell'incrocio rappresentato nella figura", fa: NELL_INCROCIO_FA },
            { it: "il conducente del veicolo A", fa: "راننده‌ی وسیله‌ی A" },
            { it: "ha la destra libera", fa: "سمت راستش خالی است", verb: "ha ← avere" },
          ],
          translation: "در تقاطعِ نشان‌داده‌شده در شکل، سمت راستِ راننده‌ی وسیله‌ی A خالی است.",
          why: "غلط است. اینجا هم A در سمت راستِ تصویر است و رو به چپ می‌راند؛ راستش بالای تصویر است و E و S از آنجا می‌آیند.",
        },
      ],
      takeaway:
        "در هر دو شکل، A در سمت راستِ تصویر است و رو به چپ می‌راند؛ پس «راستِ A» بالای تصویر است. اولین سؤال همیشه این است: این راننده رو به کجا می‌راند؟",
      rule: CDS_145,
    },
  ],
  practice: [
    {
      sourceId: "5077",
      figure: 620,
      textIt: "Secondo le norme di precedenza nell'incrocio rappresentato in figura il veicolo C ha la destra occupata",
      answer: 1,
      chunks: [
        { it: SECONDO, fa: SECONDO_FA },
        { it: NELL_INCROCIO, fa: NELL_INCROCIO_FA },
        { it: "il veicolo C", fa: "وسیله‌ی C" },
        {
          it: "ha la destra occupata",
          fa: "سمت راستش اشغال است",
          verb: "ha ← avere",
          note: "«la destra occupata» یعنی از سمت راستِ همین راننده کسی دارد می‌آید.",
        },
      ],
      translation: "طبق قواعد حق تقدم، در تقاطعِ نشان‌داده‌شده در شکل، سمت راستِ وسیله‌ی C اشغال است.",
      why: "درست است. C از سمت راستِ تصویر می‌آید و رو به چپ می‌راند؛ پس راستش بالای تصویر است و B از همان‌جا می‌آید.",
      rule: CDS_145,
      conceptStep: 1,
    },
    {
      sourceId: "5051",
      figure: 633,
      textIt: "Nell'intersezione di figura i veicoli A ed R devono, se necessario, fermarsi",
      answer: 1,
      chunks: [
        { it: INTERSEZIONE, fa: INTERSEZIONE_FA },
        { it: "i veicoli A ed R", fa: "وسیله‌های A و R" },
        { it: "devono,", fa: "باید،", verb: "devono ← dovere" },
        { it: "se necessario,", fa: "اگر لازم باشد،", focus: "condition" },
        { it: "fermarsi", fa: "بایستند" },
      ],
      translation: "در تقاطعِ شکل، وسیله‌های A و R باید در صورت لزوم بایستند.",
      why:
        "درست است. جلوی A و R تابلوی DARE PRECEDENZA و مثلث‌های سفید است: راه می‌دهند و اگر کسی می‌آید می‌ایستند. ایستادنِ همیشگی فقط پشت STOP لازم است.",
      rule: "Codice della Strada, art. 145 c.4; DPR 495/1992, art. 106 c.1",
      conceptStep: 2,
    },
    {
      sourceId: "4864",
      figure: 667,
      textIt: "Nell'incrocio rappresentato in figura il veicolo P passa per primo perché ha la destra libera",
      answer: 0,
      chunks: [
        { it: NELL_INCROCIO_CAP, fa: NELL_INCROCIO_FA },
        { it: "il veicolo P passa", fa: "وسیله‌ی P رد می‌شود", verb: "passa ← passare" },
        { it: "per primo", fa: "اول" },
        { it: "perché", fa: "چون", focus: "reason" },
        { it: "ha la destra libera", fa: "سمت راستش خالی است", verb: "ha ← avere" },
      ],
      translation: "در تقاطعِ نشان‌داده‌شده در شکل، وسیله‌ی P اول رد می‌شود، چون سمت راستش خالی است.",
      why:
        "غلط است. P از پایین-چپِ تصویر رو به بالا می‌راند؛ راستش سمت راستِ تصویر است و A از همان‌جا می‌آید. راستِ P خالی نیست، پس دلیلِ جمله غلط است و P اول نیست.",
      rule: CDS_145,
      conceptStep: 1,
    },
  ],
  related: [
    { step: 1, sourceIds: ["5077", "4803", "5026", "4864"] },
    { step: 2, sourceIds: ["5051"] },
  ],
};

// ── Lesson 2 ──────────────────────────────────────────────────────────────────

const lessonDestra: Lesson = {
  id: "precedenza-a-destra",
  titleFa: "بدون تابلو: اول کسی که راستش خالی است",
  titleIt: "PRECEDENZA A DESTRA · TRAM",
  minutes: 5,
  signs: [],
  figures: [604, 607, 608, 613, 614, 615, 616, 618, 631, 636, 640],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "در تقاطعی بدون تابلو و چراغ، پیدا کنی چه کسی اول رد می‌شود و بقیه به چه ترتیبی؛ و بدانی چرا فقط وسیله‌ی ریلی استثناست.",
      why:
        "قاعده‌ی پایه‌ی آیین‌نامه: وقتی مسیر دو وسیله قطع می‌شود، به کسی که از راست می‌آید راه بده، مگر تابلو چیز دیگری بگوید. بیشترِ شکل‌های بانک با همین یک قاعده و یک زنجیره حل می‌شوند.",
      rule: CDS_145,
    },
    {
      kind: "order",
      title: "چه کسی اول رد می‌شود؟",
      body:
        "هر راننده به کسی که از راستش می‌آید راه می‌دهد. پس اول کسی رد می‌شود که راستش خالی است؛ بعد زنجیره ادامه پیدا می‌کند. وسیله‌ها را به ترتیبِ عبور انتخاب کن.",
      crossing: FIG_614,
      takeaway:
        "راستِ خالی یعنی نوبتِ اول. بعد از او کسی می‌رود که فقط منتظر او بود. این یک زنجیره است، نه مسابقه‌ی سرعت یا اندازه.",
      rule: CDS_145,
    },
    {
      kind: "order",
      title: "تراموا: تنها استثنای بدون تابلو",
      body:
        "تراموا روی ریل حرکت می‌کند و نمی‌تواند کنار بکشد. قانون می‌گوید سرِ خط تراموا به وسیله‌ی ریلی راه بده، مگر تابلو چیز دیگری بگوید. بقیه بعد از آن با همان قاعده‌ی راست جلو می‌روند.",
      crossing: FIG_613,
      takeaway:
        "فقط «روی ریل بودن» امتیاز می‌دهد. اتوبوس، اتوبوس برقی (filobus)، کامیون و veicolo eccezionale امتیاز ویژه ندارند. خودروی امدادی با آژیر و چراغ آبی قاعده‌ی جدایی دارد: باید راه را برایش باز کنی.",
      rule: "Codice della Strada, art. 145 c.2–3; art. 177 c.3",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        {
          it: "provenire da destra",
          base: "provenire",
          fa: "از راست آمدن",
          note: "در سؤال‌ها به شکل «proveniente / provenienti da destra» یعنی «که از راست می‌آید / می‌آیند».",
        },
        { it: "transitare", fa: "عبور کردن؛ رد شدن", note: "«transita per primo» یعنی «اول رد می‌شود»." },
        { it: "per primo / per ultimo", fa: "اول / آخر" },
        { it: "attendere il transito di", base: "attendere", fa: "منتظرِ عبورِ … ماندن" },
        { it: "nell'ordine", fa: "به این ترتیب" },
        { it: "i veicoli su rotaie", fa: "وسیله‌های ریلی (تراموا و قطار)" },
        { it: "il filobus", fa: "اتوبوس برقی؛ سیمِ بالای سر دارد ولی روی ریل نیست" },
      ],
    },
    {
      kind: "trap",
      title: "«per primo»: تراموا بله، filobus نه",
      body:
        "اشتباه رایج: هر وسیله‌ی عمومی یا بزرگ (اتوبوس، filobus، کامیون) حق تقدم دارد. قانون فقط به وسیله‌ی روی ریل امتیاز می‌دهد. این دو جمله‌ی بانک را ببین:",
      examples: [
        {
          sourceId: "5045",
          figure: 631,
          textIt: "Nell'intersezione di figura il filobus passa per primo perché vincolato alla linea elettrica aerea",
          answer: 0,
          chunks: [
            { it: INTERSEZIONE, fa: INTERSEZIONE_FA },
            { it: "il filobus passa", fa: "اتوبوس برقی رد می‌شود", verb: "passa ← passare" },
            { it: "per primo", fa: "اول" },
            { it: "perché", fa: "چون", focus: "reason" },
            {
              it: "vincolato alla linea elettrica aerea",
              fa: "به سیمِ برقِ بالای سر وابسته است",
              note: "«vincolato» یعنی «مقید به؛ بسته به».",
            },
          ],
          translation: "در تقاطعِ شکل، اتوبوس برقی اول رد می‌شود، چون به سیمِ برقِ بالای سر وابسته است.",
          why:
            "غلط است. filobus روی ریل نیست؛ فقط از سیمِ بالای سر برق می‌گیرد. پس قاعده‌ی عمومی برای او هم هست: D از راستش می‌آید و ترتیب R، D، F است.",
        },
        {
          sourceId: "4931",
          figure: 613,
          textIt: "Secondo le norme di precedenza nell'incrocio rappresentato in figura il veicolo T transita per primo",
          answer: 1,
          chunks: [
            { it: SECONDO, fa: SECONDO_FA },
            { it: NELL_INCROCIO, fa: NELL_INCROCIO_FA },
            { it: "il veicolo T transita", fa: "وسیله‌ی T عبور می‌کند", verb: "transita ← transitare" },
            { it: "per primo", fa: "اول" },
          ],
          translation: "طبق قواعد حق تقدم، در تقاطعِ نشان‌داده‌شده در شکل، وسیله‌ی T اول عبور می‌کند.",
          why: "درست است. T تراموا است و روی ریل حرکت می‌کند؛ سرِ خط تراموا همه باید به آن راه بدهند.",
        },
      ],
      takeaway: "هر دو جمله «per primo» دارند. فرق در «روی ریل» بودن است، نه در عمومی یا بزرگ بودنِ وسیله.",
      rule: "Codice della Strada, art. 145 c.2–3",
    },
  ],
  practice: [
    {
      sourceId: "4783",
      figure: 640,
      textIt:
        "Secondo le norme di precedenza possono impegnare l'incrocio rappresentato in figura il veicolo R senza dare la precedenza ad alcun veicolo",
      answer: 1,
      chunks: [
        { it: SECONDO, fa: SECONDO_FA },
        {
          it: "possono impegnare l'incrocio rappresentato in figura",
          fa: "می‌توانند وارد تقاطعِ شکل شوند",
          verb: "possono ← potere",
          note: "جمله وارونه است: فاعل («il veicolo R») بعد از فعل آمده.",
        },
        { it: "il veicolo R", fa: "وسیله‌ی R" },
        { it: "senza dare la precedenza", fa: "بدون حق تقدم دادن", focus: "negation" },
        { it: "ad alcun veicolo", fa: "به هیچ وسیله‌ای", note: "«senza … alcun» یعنی «بدون … هیچ»." },
      ],
      translation: "طبق قواعد حق تقدم، وسیله‌ی R می‌تواند بدون حق تقدم دادن به هیچ وسیله‌ای وارد تقاطعِ شکل شود.",
      why:
        "درست است. R رو به چپِ تصویر می‌راند و راستش (بالای تصویر) خالی است؛ تابلو و ریل هم نیست. پس به کسی راه نمی‌دهد و اول رد می‌شود.",
      rule: CDS_145,
      conceptStep: 1,
    },
    {
      sourceId: "4733",
      figure: 608,
      textIt: "Nella situazione rappresentata in figura il veicolo H passa per secondo",
      answer: 1,
      chunks: [
        { it: "Nella situazione rappresentata in figura", fa: "در وضعیتِ نشان‌داده‌شده در شکل" },
        { it: "il veicolo H passa", fa: "وسیله‌ی H رد می‌شود", verb: "passa ← passare" },
        { it: "per secondo", fa: "دوم" },
      ],
      translation: "در وضعیتِ نشان‌داده‌شده در شکل، وسیله‌ی H دوم رد می‌شود.",
      why:
        "درست است. B (اتوبوسی که از راستِ تصویر می‌آید) راستش خالی است و اول می‌رود. H (اتوبوسی که از پایین می‌آید) B را در سمت راستش دارد، پس دوم است. C از چپ، H را در راستش دارد و آخر است. اتوبوس بودن امتیازی نمی‌دهد.",
      rule: CDS_145,
      conceptStep: 1,
    },
    {
      sourceId: "5046",
      figure: 631,
      textIt: "Nell'intersezione di figura l'ordine di transito dei veicoli è: F, R, D",
      answer: 0,
      chunks: [
        { it: INTERSEZIONE, fa: INTERSEZIONE_FA },
        { it: "l'ordine di transito dei veicoli è:", fa: "ترتیبِ عبورِ وسیله‌ها این است:", verb: "è ← essere" },
        { it: "F, R, D", fa: "F، R، D" },
      ],
      translation: "در تقاطعِ شکل، ترتیبِ عبورِ وسیله‌ها این است: F، R، D.",
      why:
        "غلط است. F اتوبوس برقی (filobus) است و روی ریل نیست، پس امتیازی ندارد. R راستش خالی است و اول می‌رود، بعد D، و F که D را در سمت راستش دارد آخر است: R، D، F.",
      rule: "Codice della Strada, art. 145 c.2–3",
      conceptStep: 2,
    },
    {
      sourceId: "5064",
      figure: 604,
      textIt: "Nell'incrocio rappresentato in figura i veicoli transitano nel seguente ordine: D, A, R",
      answer: 0,
      chunks: [
        { it: NELL_INCROCIO_CAP, fa: NELL_INCROCIO_FA },
        { it: "i veicoli transitano", fa: "وسیله‌ها عبور می‌کنند", verb: "transitano ← transitare" },
        { it: "nel seguente ordine:", fa: "به این ترتیب:" },
        { it: "D, A, R", fa: "D، A، R" },
      ],
      translation: "در تقاطعِ نشان‌داده‌شده در شکل، وسیله‌ها به این ترتیب عبور می‌کنند: D، A، R.",
      why:
        "غلط است. D یک veicolo eccezionale (وسیله‌ی بزرگ‌تر از اندازه‌ی معمول) است، ولی این به او حق تقدم نمی‌دهد. R از چپِ تصویر می‌آید و راستش خالی است، پس اول است؛ بعد D که R را در راستش دارد؛ آخر A. ترتیب درست: R، D، A.",
      rule: CDS_145,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        // 614: R, A, T
        "5030", "5031", "5032", "5033", "5034", "5035", "5036", "5037", "5038",
        // 640: R, D, B (L is already leaving)
        "4781", "4782", "4783", "4784", "4785", "4786", "4787", "4788",
        // 608: B, H, C (two buses, no special precedence)
        "4732", "4733", "4734", "4735", "4736", "4737", "4738", "4739", "4741",
        // 615: R, A, C
        "4742", "4743", "4744", "4745", "4746", "4748", "4749", "4750", "4751", "4752", "4753",
        // 616: B, T, S
        "5082", "5083", "5084", "5085", "5086", "5087", "5088",
        // 618: L, C, H
        "4754", "4755", "4756", "4757", "4758", "4759", "4760", "4761", "4762",
        // The rule itself, no image
        "4361", "4576", "4591", "4597",
      ],
    },
    {
      step: 2,
      sourceIds: [
        // 613: tram T, O, A
        "4931", "4932", "4933", "4934", "4935", "4936", "4937", "4938", "4939", "4940",
        // 636: tram T, A, S
        "5066", "5067", "5068", "5069", "5070", "5071", "5072", "5073",
        // 607: tram T, P, bus M
        "5055", "5056", "5057", "5058", "5059", "5060",
        // 631: R, D, filobus F
        "5043", "5044", "5045", "5046",
        // 604: R, veicolo eccezionale D, A
        "5061", "5062", "5063", "5064", "5065",
        // "it's a bus" / police with siren
        "4740", "4747",
        // Rails, no image
        "4559",
      ],
    },
  ],
};

// ── Lesson 3 ──────────────────────────────────────────────────────────────────

const lessonSvolte: Lesson = {
  id: "svolte-e-contemporanei",
  titleFa: "پیچیدن، و عبورِ هم‌زمان",
  titleIt: "SVOLTARE · CONTEMPORANEAMENTE",
  minutes: 5,
  signs: [],
  figures: [601, 606, 620, 637, 639, 643, 644, 646],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بدانی کسی که به چپ می‌پیچد به چه کسانی راه می‌دهد، چرا گردشِ کوتاه به راست معمولاً با کسی تلاقی ندارد، و کِی دو وسیله با هم رد می‌شوند.",
      why:
        "قاعده‌ی راست فقط جایی معنا دارد که مسیرها همدیگر را قطع کنند. با دانستنِ همین، شکل‌های چهار وسیله‌ای بانک هم قدم‌به‌قدم حل می‌شوند.",
      rule: "Codice della Strada, art. 145 c.2; art. 154 c.3",
    },
    {
      kind: "order",
      title: "به راست، مستقیم، به چپ",
      body:
        "سه نکته: (۱) گردش به راست، نزدیک لبه‌ی راست، معمولاً مسیرِ کسی را قطع نمی‌کند. (۲) کسی که به چپ می‌پیچد نزدیکِ مرکز تقاطع و در سمت چپِ آن می‌پیچد؛ در این حرکت، خودروی روبه‌رو از سمت راستش وارد مسیرش می‌شود، پس به او راه می‌دهد. (۳) پیچیدن به چپ تو را آخرِ صف نمی‌کند. ترتیب را بچین.",
      crossing: FIG_643,
      takeaway:
        "B به چپ می‌پیچد و باز هم قبل از L رد می‌شود، چون L او را در سمت راستش دارد. «مستقیم رفتن» حق تقدم نمی‌آورد.",
      rule: "Codice della Strada, art. 145 c.2; art. 154 c.3 lett. a–b",
    },
    {
      kind: "order",
      title: "دو وسیله، یک لحظه",
      body:
        "وقتی مسیرِ دو وسیله همدیگر را قطع نمی‌کند، لازم نیست یکی منتظر دیگری بماند؛ با هم رد می‌شوند. اگر دو وسیله هم‌زمان حرکت می‌کنند، هر ترتیبی بین آن دو قبول است.",
      crossing: FIG_637,
      takeaway:
        "قاعده‌ی راست برای مسیرهایی است که قطع می‌شوند. C و A از یک بازو می‌آیند و مسیرشان قطع نمی‌شود؛ پس با هم می‌روند.",
      rule: CDS_145,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "svoltare a sinistra", base: "svoltare", fa: "به چپ پیچیدن" },
        { it: "svoltare a destra", base: "svoltare", fa: "به راست پیچیدن" },
        { it: "proseguire diritto", base: "proseguire", fa: "مستقیم ادامه دادن" },
        {
          it: "il centro dell'incrocio",
          fa: "مرکزِ تقاطع",
          note: "برای پیچیدن به چپ، مرکز را سمت راستِ خودت نگه دار: «lasciare il centro dell'incrocio alla nostra destra».",
        },
        { it: "contemporaneamente", fa: "هم‌زمان" },
        { it: "dato che", fa: "چون؛ از آنجا که" },
        { it: "impegnare l'incrocio", base: "impegnare", fa: "وارد تقاطع شدن" },
      ],
    },
    {
      kind: "trap",
      title: "پیچیدن به چپ یعنی راه دادن به همه؟",
      body: "اشتباه رایج: «هر کس به چپ می‌پیچد باید به همه راه بدهد». قانون این را نمی‌گوید. این دو جمله‌ی بانک را مقایسه کن:",
      examples: [
        {
          sourceId: "4568",
          textIt: "E' obbligatorio dare la precedenza a tutti i veicoli circolanti quando si svolta a sinistra",
          answer: 0,
          chunks: [
            { it: "E' obbligatorio", fa: "اجباری است", verb: "è ← essere", note: "«E'» همان «È» است: «است»." },
            { it: "dare la precedenza", fa: "حق تقدم دادن" },
            { it: "a tutti i veicoli circolanti", fa: "به همه‌ی وسیله‌هایی که در حال حرکت‌اند", focus: "always" },
            { it: "quando si svolta a sinistra", fa: "وقتی به چپ می‌پیچی", focus: "condition", verb: "si svolta ← svoltare" },
          ],
          translation: "وقتی به چپ می‌پیچی، حق تقدم دادن به همه‌ی وسیله‌هایی که در حال حرکت‌اند اجباری است.",
          why:
            "غلط است. کسی که به چپ می‌پیچد به کسانی راه می‌دهد که از راستش می‌آیند، از جمله خودروی روبه‌رو؛ نه به همه. در شکل ۶۴۳، B به چپ می‌پیچد و قبل از L رد می‌شود.",
        },
        {
          sourceId: "4486",
          textIt:
            "In una carreggiata a doppio senso di circolazione per svoltare a sinistra bisogna dare la precedenza ai veicoli provenienti da destra, salvo diversa segnalazione",
          answer: 1,
          chunks: [
            { it: "In una carreggiata a doppio senso di circolazione", fa: "در سواره‌رویی که دوطرفه است" },
            { it: "per svoltare a sinistra", fa: "برای پیچیدن به چپ" },
            { it: "bisogna dare la precedenza", fa: "باید حق تقدم داد", verb: "bisogna ← bisognare" },
            { it: "ai veicoli provenienti da destra,", fa: "به وسیله‌هایی که از راست می‌آیند،", verb: "provenienti ← provenire" },
            { it: "salvo diversa segnalazione", fa: "مگر اینکه تابلو چیز دیگری بگوید", focus: "condition" },
          ],
          translation:
            "در سواره‌روی دوطرفه، برای پیچیدن به چپ باید به وسیله‌هایی که از راست می‌آیند حق تقدم داد، مگر اینکه تابلو چیز دیگری بگوید.",
          why:
            "درست است. همان قاعده‌ی راست است. هنگامِ پیچیدن به چپ، خودروی روبه‌رو هم از سمت راستت وارد مسیرت می‌شود، پس به او هم راه می‌دهی.",
        },
      ],
      takeaway:
        "هر دو جمله درباره‌ی «svoltare a sinistra» و «dare la precedenza» است. پیچیدن به چپ یعنی راه دادن به راست و روبه‌رو، نه به همه.",
      rule: "Codice della Strada, art. 145 c.2; art. 154 c.1 lett. a, c.3 lett. b",
    },
  ],
  practice: [
    {
      sourceId: "4838",
      figure: 643,
      textIt:
        "Giungendo all'incrocio rappresentato in figura il veicolo B, dato che svolta a sinistra, non ha diritto di precedenza su alcun veicolo",
      answer: 0,
      chunks: [
        { it: "Giungendo all'incrocio rappresentato in figura", fa: "وقتی به تقاطعِ شکل می‌رسیم", verb: "giungendo ← giungere" },
        { it: "il veicolo B,", fa: "وسیله‌ی B،" },
        { it: "dato che svolta a sinistra,", fa: "چون به چپ می‌پیچد،", focus: "reason", verb: "svolta ← svoltare" },
        { it: "non ha diritto di precedenza", fa: "حق تقدم ندارد", focus: "negation", verb: "ha ← avere" },
        { it: "su alcun veicolo", fa: "نسبت به هیچ وسیله‌ای" },
      ],
      translation: "وقتی به تقاطعِ شکل می‌رسیم، وسیله‌ی B چون به چپ می‌پیچد، نسبت به هیچ وسیله‌ای حق تقدم ندارد.",
      why: "غلط است. B نسبت به L حق تقدم دارد، چون L او را در سمت راستش دارد. ترتیب: H، D، B، L.",
      rule: CDS_145,
      conceptStep: 1,
    },
    {
      sourceId: "4815",
      figure: 637,
      textIt: "Nell'attraversare l'incrocio in figura i veicoli C e A passano contemporaneamente dopo il veicolo L",
      answer: 1,
      chunks: [
        {
          it: "Nell'attraversare l'incrocio in figura",
          fa: "هنگامِ عبور از تقاطعِ شکل",
          note: "«nell'» + مصدر یعنی «هنگامِ …»: nell'attraversare = هنگامِ عبور کردن.",
        },
        { it: "i veicoli C e A", fa: "وسیله‌های C و A" },
        { it: "passano contemporaneamente", fa: "هم‌زمان رد می‌شوند", verb: "passano ← passare" },
        { it: "dopo il veicolo L", fa: "بعد از وسیله‌ی L" },
      ],
      translation: "هنگامِ عبور از تقاطعِ شکل، وسیله‌های C و A بعد از وسیله‌ی L هم‌زمان رد می‌شوند.",
      why:
        "درست است. L راستش خالی است و اول می‌رود. C و A هر دو از پایین می‌آیند؛ C مستقیم می‌رود و A از خطِ کنارِ وسط به چپ می‌پیچد، و مسیرشان قطع نمی‌شود. پس با هم رد می‌شوند. D آخر است.",
      rule: CDS_145,
      conceptStep: 2,
    },
    {
      sourceId: "4805",
      figure: 646,
      textIt: "Nell'incrocio rappresentato in figura il veicolo D è il primo ad impegnare l'incrocio",
      answer: 1,
      chunks: [
        { it: NELL_INCROCIO_CAP, fa: NELL_INCROCIO_FA },
        { it: "il veicolo D", fa: "وسیله‌ی D" },
        { it: "è il primo", fa: "اولین است", verb: "è ← essere" },
        { it: "ad impegnare l'incrocio", fa: "که وارد تقاطع می‌شود" },
      ],
      translation: "در تقاطعِ نشان‌داده‌شده در شکل، وسیله‌ی D اولین وسیله‌ای است که وارد تقاطع می‌شود.",
      why:
        "درست است. D از چپِ تصویر می‌آید و نزدیک لبه به راست می‌پیچد. H از پایین می‌آید، ولی مسیرش با مسیرِ کوتاهِ D قطع نمی‌شود؛ پس D منتظر کسی نیست. بعد C، A و H به ترتیبِ قاعده‌ی راست رد می‌شوند.",
      rule: "Codice della Strada, art. 145 c.2; art. 154 c.3 lett. a",
      conceptStep: 1,
    },
    {
      sourceId: "4530",
      figure: 601,
      textIt: "Per svoltare a sinistra bisogna, di norma, lasciare il centro dell'incrocio alla nostra destra, come i veicoli in figura",
      answer: 1,
      chunks: [
        { it: "Per svoltare a sinistra", fa: "برای پیچیدن به چپ" },
        { it: "bisogna,", fa: "باید،", verb: "bisogna ← bisognare" },
        { it: "di norma,", fa: "طبق قاعده‌ی عادی،", focus: "condition" },
        { it: "lasciare il centro dell'incrocio", fa: "مرکزِ تقاطع را گذاشت" },
        { it: "alla nostra destra,", fa: "در سمت راستِ خودمان،" },
        { it: "come i veicoli in figura", fa: "مثل وسیله‌های شکل" },
      ],
      translation: "برای پیچیدن به چپ، طبق قاعده‌ی عادی باید مرکزِ تقاطع را سمت راستِ خودمان بگذاریم، مثل وسیله‌های شکل.",
      why:
        "درست است. آیین‌نامه می‌گوید پیچیدن به چپ نزدیکِ مرکز تقاطع و در سمت چپِ آن انجام می‌شود؛ یعنی مرکز سمت راستِ تو می‌ماند. در شکل، N و A همین‌طور پیچیده‌اند.",
      rule: "Codice della Strada, art. 154 c.3 lett. b",
      conceptStep: 1,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        // 643: H (right), D, B (left), L
        "4827", "4828", "4829", "4830", "4831", "4832", "4833", "4834", "4835", "4836", "4837", "4838", "4839",
        // 644: P (right), D, B (left), L
        "5105", "5106", "5107", "5108", "5109", "5110", "5111", "5112", "5113",
        // 646: D (right), C, A, H (4803 "A ha la destra occupata" is lesson 1)
        "4802", "4804", "4805", "4806", "4807", "4808", "4809", "4810", "4811", "4812",
        // 606: E (right), C (left), M (left)
        "5114", "5115", "5116", "5117", "5118", "5119",
        // 620: P, B, C (two opposite left turns)
        "5074", "5075", "5076", "5078", "5079", "5080", "5081",
        // Left-turn position and precedence (601 + no image)
        "4530", "4538", "4483", "4486", "4487", "4490", "4568", "4468",
      ],
    },
    {
      step: 2,
      sourceIds: [
        // 637: L, C+A together, D
        "4813", "4814", "4815", "4816", "4817", "4818", "4819", "4820", "4821", "4822", "4823", "4824", "4825", "4826",
        // 639: tram T + B together, A, C
        "5007", "5008", "5009", "5010", "5011", "5012", "5013", "5014", "5015", "5016",
      ],
    },
  ],
};

// ── Lesson 4 ──────────────────────────────────────────────────────────────────

const lessonSegnali: Lesson = {
  id: "segnali-negli-incroci",
  titleFa: "تابلوها ترتیب را عوض می‌کنند",
  titleIt: "DARE PRECEDENZA · STOP NELL'INCROCIO",
  minutes: 5,
  signs: [40, 41],
  figures: [633, 647, 655],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "وقتی روی بعضی بازوها DARE PRECEDENZA یا STOP هست، ترتیب را درست بچینی: اول آن‌هایی که تابلو ندارند، بعد آن‌هایی که تابلو دارند؛ و درونِ هر گروه همان قاعده‌های درس ۲ و ۳.",
      why:
        "معنیِ خودِ این تابلوها را در فصل «تابلوهای حق تقدم» دیدی. اینجا اثرشان را در تقاطع می‌بینی: تابلو قاعده‌ی راست را بین دو گروه کنار می‌گذارد.",
      rule: "Codice della Strada, art. 145 c.2, c.4",
    },
    {
      kind: "order",
      title: "تابلو بر «راست» مقدم است",
      body:
        "A و R پشت مثلث‌های سفید و تابلوی DARE PRECEDENZA هستند؛ N تابلو ندارد. کسی که تابلوی راه‌دادن دارد به هر دو جهت راه می‌دهد، حتی به کسی که از چپش می‌آید. ترتیب را بچین.",
      crossing: FIG_633,
      takeaway:
        "N به چپ می‌پیچد و از چپِ A می‌آید، ولی چون تابلو ندارد اول است. بعد بین A و R قاعده‌ی درس ۳: R که به چپ می‌پیچد به A که روبه‌رویش است راه می‌دهد.",
      rule: "Codice della Strada, art. 145 c.4; DPR 495/1992, art. 106 c.1",
    },
    {
      kind: "order",
      title: "چهار وسیله، دو گروه",
      body:
        "اینجا جلوی E و R تابلو هست و جلوی A و S نیست. اول گروهِ بدون تابلو را مرتب کن، بعد گروهِ با تابلو را.",
      crossing: FIG_655,
      takeaway:
        "قدم‌ها همیشه همین است: (۱) چه کسی تابلو ندارد؟ (۲) بینِ آن‌ها، راست و پیچیدن به چپ. (۳) بعد گروهِ با تابلو، با همان دو قاعده.",
      rule: "Codice della Strada, art. 145 c.2, c.4; art. 154 c.3 lett. b",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "sia da destra che da sinistra", fa: "هم از راست و هم از چپ" },
        { it: "tutti gli altri veicoli", fa: "همه‌ی وسیله‌های دیگر" },
        { it: "dare la precedenza a", base: "dare", fa: "به … حق تقدم دادن؛ راه دادن" },
        {
          it: "attendere che siano transitati",
          base: "attendere",
          fa: "صبر کردن تا رد شده باشند",
          note: "«che siano transitati» وجهِ التزامی است: «که رد شده باشند».",
        },
        { it: "fermarsi", fa: "ایستادن" },
      ],
    },
    {
      kind: "trap",
      title: "پشتِ تابلو، «راست» دیگر ملاک نیست",
      body:
        "اشتباه رایج: «پشتِ تابلو هم فقط به راست راه می‌دهم». تابلوی راه‌دادن یعنی به هر دو جهتِ جاده‌ی بدون تابلو راه بده. این دو جمله‌ی بانک را ببین:",
      examples: [
        {
          sourceId: "2149",
          sign: 40,
          textIt: "Il segnale raffigurato obbliga a dare precedenza ai veicoli provenienti sia da destra che da sinistra",
          answer: 1,
          chunks: [
            { it: "Il segnale raffigurato", fa: "تابلوی نشان‌داده‌شده" },
            { it: "obbliga a dare precedenza", fa: "مجبور می‌کند حق تقدم بدهی", verb: "obbliga ← obbligare" },
            { it: "ai veicoli provenienti", fa: "به وسیله‌هایی که می‌آیند", verb: "provenienti ← provenire" },
            { it: "sia da destra che da sinistra", fa: "هم از راست و هم از چپ" },
          ],
          translation: "تابلوی نشان‌داده‌شده مجبورت می‌کند به وسیله‌هایی که هم از راست و هم از چپ می‌آیند حق تقدم بدهی.",
          why: "درست است. DARE PRECEDENZA یعنی به هر کس که در جاده‌ی متقاطع می‌آید راه بده، از هر دو جهت. در شکل ۶۳۳، A باید به N که از چپش می‌آید راه بدهد.",
        },
        {
          sourceId: "2185",
          sign: 41,
          textIt: "Il segnale raffigurato obbliga ad arrestarsi per dare la precedenza solo ai veicoli provenienti da destra",
          answer: 0,
          chunks: [
            { it: "Il segnale raffigurato", fa: "تابلوی نشان‌داده‌شده" },
            { it: "obbliga ad arrestarsi", fa: "مجبور می‌کند کامل بایستی", verb: "obbliga ← obbligare" },
            { it: "per dare la precedenza", fa: "تا حق تقدم بدهی" },
            { it: "solo", fa: "فقط", focus: "limit" },
            { it: "ai veicoli provenienti da destra", fa: "به وسیله‌هایی که از راست می‌آیند", verb: "provenienti ← provenire" },
          ],
          translation: "تابلوی نشان‌داده‌شده مجبورت می‌کند کامل بایستی تا فقط به وسیله‌هایی که از راست می‌آیند حق تقدم بدهی.",
          why: "غلط است. ایستادن پشتِ STOP درست است، ولی «فقط به راست» غلط است: پشتِ STOP هم به هر دو جهت راه می‌دهی.",
        },
      ],
      takeaway:
        "هر دو جمله «provenienti … da destra» دارند. پشتِ تابلوی راه‌دادن، به هر دو جهتِ جاده‌ی بدون تابلو راه بده.",
      rule: "Codice della Strada, art. 145 c.4; DPR 495/1992, art. 106 c.1, art. 107 c.1",
    },
  ],
  practice: [
    {
      sourceId: "4911",
      figure: 655,
      textIt: "Secondo le norme di precedenza nell'incrocio rappresentato in figura il veicolo A deve dare la precedenza al veicolo S",
      answer: 1,
      chunks: [
        { it: SECONDO, fa: SECONDO_FA },
        { it: NELL_INCROCIO, fa: NELL_INCROCIO_FA },
        { it: "il veicolo A deve", fa: "وسیله‌ی A باید", verb: "deve ← dovere" },
        { it: "dare la precedenza al veicolo S", fa: "به وسیله‌ی S حق تقدم بدهد" },
      ],
      translation: "طبق قواعد حق تقدم، در تقاطعِ نشان‌داده‌شده در شکل، وسیله‌ی A باید به وسیله‌ی S حق تقدم بدهد.",
      why: "درست است. A و S هیچ‌کدام تابلو ندارند. A به چپ می‌پیچد و S روبه‌رویش مستقیم می‌آید؛ هنگامِ پیچیدن، S از راستِ A می‌آید.",
      rule: "Codice della Strada, art. 145 c.2; art. 154 c.3 lett. b",
      conceptStep: 2,
    },
    {
      sourceId: "4913",
      figure: 655,
      textIt: "Secondo le norme di precedenza nell'incrocio rappresentato in figura il veicolo E deve attendere il transito del veicolo R",
      answer: 0,
      chunks: [
        { it: SECONDO, fa: SECONDO_FA },
        { it: NELL_INCROCIO, fa: NELL_INCROCIO_FA },
        { it: "il veicolo E deve", fa: "وسیله‌ی E باید", verb: "deve ← dovere" },
        { it: "attendere il transito del veicolo R", fa: "منتظرِ عبورِ وسیله‌ی R بماند" },
      ],
      translation: "طبق قواعد حق تقدم، در تقاطعِ نشان‌داده‌شده در شکل، وسیله‌ی E باید منتظرِ عبورِ وسیله‌ی R بماند.",
      why:
        "غلط است. E و R هر دو تابلوی DARE PRECEDENZA دارند و هر دو بعد از S و A می‌روند. بینِ خودشان، R به چپ می‌پیچد و E روبه‌رویش مستقیم می‌آید؛ پس R منتظرِ E می‌ماند، نه برعکس.",
      rule: "Codice della Strada, art. 145 c.2, c.4",
      conceptStep: 2,
    },
    {
      sourceId: "5053",
      figure: 633,
      textIt: "Nell'intersezione di figura l'ordine di transito dei veicoli è: A, N, R",
      answer: 0,
      chunks: [
        { it: INTERSEZIONE, fa: INTERSEZIONE_FA },
        { it: "l'ordine di transito dei veicoli è:", fa: "ترتیبِ عبورِ وسیله‌ها این است:", verb: "è ← essere" },
        { it: "A, N, R", fa: "A، N، R" },
      ],
      translation: "در تقاطعِ شکل، ترتیبِ عبورِ وسیله‌ها این است: A، N، R.",
      why: "غلط است. A تابلوی DARE PRECEDENZA دارد و باید به N که تابلو ندارد راه بدهد، حتی اگر N از چپش بیاید. ترتیب درست: N، A، R.",
      rule: "Codice della Strada, art. 145 c.4",
      conceptStep: 1,
    },
    {
      sourceId: "4901",
      figure: 647,
      textIt: "Secondo le norme di precedenza nell'incrocio rappresentato in figura il veicolo O deve dare la precedenza a tutti gli altri veicoli",
      answer: 1,
      chunks: [
        { it: SECONDO, fa: SECONDO_FA },
        { it: NELL_INCROCIO, fa: NELL_INCROCIO_FA },
        { it: "il veicolo O deve", fa: "وسیله‌ی O باید", verb: "deve ← dovere" },
        { it: "dare la precedenza", fa: "حق تقدم بدهد" },
        { it: "a tutti gli altri veicoli", fa: "به همه‌ی وسیله‌های دیگر", focus: "always" },
      ],
      translation: "طبق قواعد حق تقدم، در تقاطعِ نشان‌داده‌شده در شکل، وسیله‌ی O باید به همه‌ی وسیله‌های دیگر حق تقدم بدهد.",
      why:
        "درست است. O تابلوی DARE PRECEDENZA دارد، پس به L و H در جاده‌ی بدون تابلو راه می‌دهد. B هم تابلو دارد، ولی از سمتِ راستِ O می‌آید؛ پس O به B هم راه می‌دهد.",
      rule: "Codice della Strada, art. 145 c.2, c.4",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["5050", "5052", "5053", "5054"] },
    {
      step: 2,
      sourceIds: [
        // 655: S, A, E, R
        "4908", "4909", "4910", "4911", "4912", "4913", "4914", "4915", "4916", "4917", "4918",
        // 647: L + H together, B, O
        "4896", "4897", "4898", "4899", "4900", "4901", "4902", "4903", "4904", "4905", "4906", "4907",
      ],
    },
  ],
};

export const INCROCI_CHAPTER: Chapter = {
  id: "precedenza-incroci",
  topicId: 4,
  nameIt: "Precedenza negli incroci",
  titleFa: "حق تقدم و تقاطع‌ها",
  summaryFa: "چه کسی اول از تقاطع رد می‌شود؟ چهار درس کوتاه: خواندنِ شکل، قاعده‌ی راست، پیچیدن، و اثرِ تابلوها.",
  reviewedOn: "2026-10-08",
  sources: [
    {
      label: "Codice della Strada (D.Lgs. 285/1992), artt. 145, 154, 177 — testo vigente, agg. 24/04/2026",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    {
      label: "Regolamento di esecuzione (DPR 495/1992), artt. 106–107",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1992-12-16;495",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), figure 601–667",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [lessonLeggere, lessonDestra, lessonSvolte, lessonSegnali],
};
