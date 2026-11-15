/**
 * src/content/ch23-responsabilita.ts
 * Chapter 23 (Responsabilità civile, penale e assicurazione), lessons 1–2.
 *
 *  L1 one crash, three kinds of consequence: civil (pay for the damage),
 *     criminal (only when the fact is a crime), administrative (Codice della
 *     Strada: fines, points, measures on the licence). They are independent and
 *     can all start from the same event (bank group 598). Drawing `conseguenze`.
 *  L2 when a crash becomes a crime, and what does not erase it (groups 599, 600).
 *
 * Steps after the teaching sections are original "can it arise?" exercises
 * (classify): each states every fact needed, several answers can be "yes", and
 * the answers are fixed here and explained. They say they are not legal advice.
 * Licence measures themselves (sospensione, revisione, revoca) are chapter 20,
 * linked by lesson title.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter23.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";
import { CAP, CDS, CP, COST_27, DISCLAIMER } from "./ch23-common.js";

const CHI = "Chi è penalmente e civilmente responsabile di un sinistro stradale";
const CHI_FA = "کسی که از نظرِ کیفری و مدنی مسئولِ یک تصادف است";
const RP = "La responsabilità penale connessa al sinistro stradale";
const RP_FA = "مسئولیتِ کیفریِ ناشی از تصادف";
const CP_590 = `${CP("590")} (lesioni personali colpose, a querela); ${CP("590-bis")} (lesioni personali stradali gravi o gravissime); ${CP("589-bis")} (omicidio stradale)`;
const CDS_222 = `${CDS("222")} (sanzioni accessorie: sospensione, revoca)`;
const CAN = [
  { it: "può nascere", fa: "ممکن است پیش بیاید" },
  { it: "non da questi fatti", fa: "از این واقعیت‌ها نه" },
  { it: "non si può dire", fa: "از این اطلاعات معلوم نیست" },
];
const CRIME = [
  { it: "può essere reato", fa: "ممکن است جرم باشد" },
  { it: "non è reato", fa: "جرم نیست" },
  { it: "non si può dire", fa: "از این اطلاعات معلوم نیست" },
];

export const lessonTreConseguenze: Lesson = {
  id: "responsabilita-tre-conseguenze",
  titleFa: "یک تصادف، سه نوع پیامد",
  titleIt: "RESPONSABILITÀ CIVILE, PENALE E AMMINISTRATIVA",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس سه نوع مسئولیتی را که ممکن است از یک تصادف پیش بیاید از هم جدا می‌کنی: مدنی (جبرانِ خسارت)، کیفری (مجازات، فقط وقتی کار جرم است) و اداری (جریمه، امتیاز و تصمیم‌هایی درباره‌ی گواهینامه). و می‌بینی که این سه جدا از هم‌اند ولی جمع هم می‌شوند: یک تصادف می‌تواند هر سه را با هم داشته باشد.",
      why:
        "۱۰ سؤال. همه با «کسی که از نظرِ کیفری و مدنی مسئول است» شروع می‌شوند. جمله‌ی درست می‌گوید این آدم مجازات، جبرانِ خسارت و جریمه‌ی رانندگی را با هم دارد و گواهینامه‌اش «ممکن است» تعلیق، ابطال یا بازآزمایی شود. جمله‌ی غلط یکی از سه را حذف می‌کند یا «همیشه» و «در هر حال» اضافه می‌کند.",
      rule: `${CP("185")}; ${CDS_222}`,
    },
    {
      kind: "anatomy",
      scene: "conseguenze",
      title: "از یک نقطه، سه راه",
      body:
        "پایینِ تصویر یک تصادف است. سه راه از همان نقطه جدا می‌شوند. هر راه قانونِ خودش، تصمیم‌گیرنده‌ی خودش و نتیجه‌ی خودش را دارد؛ رفتن در یکی، دیگری را نمی‌بندد. روی هر بخش بزن:",
      parts: [
        { id: "incidente", nameIt: "il sinistro stradale", nameFa: "تصادف", text: "در زبانِ قانون و بیمه، تصادف را «sinistro» می‌گویند (همان incidente). با «sinistro» به معنای «چپ» اشتباهش نگیر: «un sinistro stradale» یعنی یک تصادف. هر چه بعد می‌آید از واقعیت‌های همین اتفاق می‌آید: چه کسی مقصر بود، چه آسیبی رسید، کدام قاعده رعایت نشد." },
        { id: "civile", nameIt: "responsabilità civile", nameFa: "مسئولیتِ مدنی", text: "وظیفه‌ی جبرانِ خسارت به زیان‌دیده: خسارتِ جانی و مالی، با پول. با توافق، با بیمه یا با دادگاهِ مدنی حل می‌شود. هر جا با تقصیرت به کسی خسارت زده‌ای، این راه باز است؛ کوچک یا بزرگ (درسِ ۳)." },
        { id: "penale", nameIt: "responsabilità penale", nameFa: "مسئولیتِ کیفری", text: "فقط وقتی کاری که رخ داده در قانونِ جزا جرم باشد؛ در تصادف معمولاً صدمه‌ی بدنی یا مرگِ کسی. قاضیِ کیفری مجازات تعیین می‌کند (جزای نقدی، حبس). شخصی است: فقط کسی که کار را کرده جواب می‌دهد (درسِ ۲)." },
        { id: "amministrativa", nameIt: "responsabilità amministrativa", nameFa: "مسئولیتِ اداری", text: "وقتی قاعده‌ای از قانونِ راهنمایی‌ورانندگی (Codice della strada) رعایت نشده: جریمه‌ی اداری، کم شدنِ امتیازِ گواهینامه، و گاهی تعلیق. پلیس ثبت می‌کند. چراغ قرمز رد کرده باشی، این راه باز است، چه تصادف بشود چه نشود." },
      ],
      takeaway: "مدنی = جبرانِ خسارت؛ کیفری = مجازات، فقط برای جرم؛ اداری = جریمه و امتیاز. از یک تصادف ممکن است یکی، دو تا یا هر سه پیش بیاید.",
      rule: `${CP("185")} (il reato obbliga al risarcimento); ${CDS("126-bis")}; ${CDS_222}`,
    },
    {
      kind: "table",
      title: "گواهینامه بعد از تصادفِ جرم‌دار",
      body:
        "وقتی تصادف جرم است (صدمه‌ی بدنی یا مرگ)، قاضی کنارِ مجازات درباره‌ی گواهینامه هم تصمیم می‌گیرد، و اداره‌ها ممکن است بازآزمایی بخواهند. چهار تصمیم را در فصلِ ۲۰ دیده‌ای (درس‌های «تعلیقِ گواهینامه: کِی، و کِی نه» و «بازآزمایی و ابطالِ گواهینامه»). این‌جا فقط مهم است کدام «ممکن» است و کدام ساختگی:",
      columns: ["ممکن یا ساختگی؟", "چرا"],
      rows: [
        { label: "تعلیق", it: "la sospensione della patente", values: ["ممکن است", "قاضی برای صدمه یا مرگ، گواهینامه را برای مدتی تعلیق می‌کند؛ مدت به شدتِ آسیب بستگی دارد (ماده‌ی ۲۲۲)."] },
        { label: "ابطال", it: "la revoca della patente", values: ["ممکن است", "محکومیت برای صدمه‌ی شدید یا قتلِ غیرعمد در رانندگی، ابطال را با خودش دارد. یعنی «ممکن است»، نه «در هر حال»: تصادفی که این جرم‌ها نیست، ابطال ندارد."] },
        { label: "بازآزمایی", it: "la revisione della patente", values: ["ممکن است", "اگر درباره‌ی توانایی یا آمادگیِ راننده شک پیش بیاید، آزمونِ دوباره یا معاینه خواسته می‌شود (ماده‌ی ۱۲۸، فصلِ ۲۰)."] },
        { label: "«همیشه» بازداشت", it: "sempre l'arresto preventivo", values: ["ساختگی", "بازداشت (arresto) پیش از محاکمه خودکار نیست؛ فقط در چند حالتِ خیلی جدی و با شرطِ قانون. «sempre» این‌جا غلط است. (arresto در ماده‌ی ۱۸۶ «حبس» بود و در فصلِ ۱۶ «ایستادن به خاطرِ ترافیک»؛ این‌جا «بازداشت».)"] },
        { label: "فقط ردیفِ پایین‌تر", it: "solo di categoria inferiore", values: ["ساختگی", "چنین قاعده‌ای وجود ندارد. یا گواهینامه کار می‌کند، یا تعلیق یا ابطال شده؛ «پایین آمدنِ ردیف» نداریم."] },
      ],
      takeaway: "تعلیق، ابطال و بازآزمایی «ممکن»‌اند. «همیشه بازداشت»، «در هر حال ابطال» و «فقط ردیفِ پایین‌تر» ساختگی‌اند.",
      rule: `${CDS_222}; ${CDS("128")}; ${CDS("219")}`,
    },
    {
      kind: "classify",
      title: "موقعیت: چراغ قرمز و یک عابر",
      body: `${DISCLAIMER} داخلِ آبادی، راننده‌ی فرضیِ A چراغ قرمز را رد می‌کند و به عابری می‌زند که روی خط‌کشی عابر پیاده بوده است. پای عابر می‌شکند و پزشک ۶۰ روز درمان می‌نویسد (در قانونِ جزا، بیماریِ بیش از ۴۰ روز یعنی صدمه‌ی شدید). خودرو مالِ A است و بیمه‌ی شخص ثالث دارد. هنوز هیچ دادگاهی رأی نداده است. برای هر پیامد بگو:`,
      options: CAN,
      items: [
        { prompt: "A باید خسارتِ عابر را جبران کند (هزینه‌ی درمان، روزهای کارِ ازدست‌رفته، رنج)", answer: 0, explain: "مسئولیتِ مدنی: تقصیر و خسارت هست. بیمه‌ی شخص ثالثِ A این پول را به جای او به عابر می‌دهد (درسِ ۶)، ولی وظیفه مالِ A است." },
        { prompt: "جریمه و کم شدنِ امتیاز برای رد کردنِ چراغ قرمز", answer: 0, explain: "مسئولیتِ اداری: قاعده‌ی چراغ را رعایت نکرده؛ این جدا از تصادف هم وجود داشت." },
        { prompt: "پرونده‌ی کیفری برای صدمه‌ی شدید به عابر", answer: 0, explain: "صدمه‌ی شدید با نقضِ مقرراتِ رانندگی جرم است (ماده‌ی ۵۹۰-bis قانونِ جزا). رد کردنِ چراغ قرمز از شرط‌های تشدید است، پس پرونده بدونِ شکایتِ عابر هم پیش می‌رود." },
        { prompt: "چون بیمه پول را می‌دهد، پرونده‌ی کیفری بسته می‌شود", answer: 1, explain: "پولِ بیمه راهِ مدنی را حل می‌کند، نه راهِ کیفری را (درسِ ۲)." },
        { prompt: "تصمیمی درباره‌ی گواهینامه (تعلیق یا ابطال)", answer: 0, explain: "قاضی همراهِ حکمِ کیفری درباره‌ی گواهینامه تصمیم می‌گیرد (ماده‌ی ۲۲۲)." },
        { prompt: "A آخرِ کار محکوم می‌شود", answer: 2, explain: "این را دادگاه با شنیدنِ همه‌ی واقعیت‌ها تصمیم می‌گیرد؛ از این چند خط نمی‌شود حکم را دانست. «ممکن است پیش بیاید» با «حتماً پیش می‌آید» فرق دارد." },
        { prompt: "بیمه جریمه‌ی چراغ قرمز را هم می‌پردازد", answer: 1, explain: "بیمه‌ی شخص ثالث خسارتِ دیگران را می‌دهد، نه جریمه و مجازاتِ خودِ راننده را (درسِ ۶)." },
      ],
      takeaway: "یک اتفاق، سه راهِ باز: مدنی، کیفری و اداری با هم. پولِ بیمه فقط راهِ مدنی را می‌بندد؛ حکمِ دادگاه را از پیش نمی‌شود گفت.",
      rule: `${CP("590-bis")} c.1, c.5, c.9; ${CDS("146")}; ${CDS_222}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il sinistro stradale", fa: "تصادف", note: "واژه‌ی قانون و بیمه؛ «sinistro» این‌جا یعنی تصادف، نه «چپ»" },
        { it: "la responsabilità civile", fa: "مسئولیتِ مدنی" },
        { it: "la responsabilità penale", fa: "مسئولیتِ کیفری" },
        { it: "la responsabilità amministrativa", fa: "مسئولیتِ اداری" },
        { it: "il Codice Penale", fa: "قانونِ جزا" },
        { it: "la pena", fa: "مجازات" },
        { it: "il risarcimento dei danni", fa: "جبرانِ خسارت" },
        { it: "la sanzione amministrativa", fa: "جریمه‌ی اداری" },
        { it: "l'arresto preventivo", fa: "بازداشت (پیش از محاکمه)" },
        { it: "incorrere in", fa: "دچار شدن به، مشمول شدن", base: "incorrere" },
      ],
    },
    {
      kind: "trap",
      title: "«sanzioni»: هست یا نیست؟",
      body: "هر دو جمله درباره‌ی جریمه‌های قانونِ راهنمایی‌ورانندگی‌اند. یکی می‌گوید مسئولیتِ کیفری و مدنی آن‌ها را از بین نمی‌برد؛ دیگری می‌گوید از بین می‌برد:",
      examples: [
        {
          sourceId: "6611",
          textIt: "Chi è penalmente e civilmente responsabile di un sinistro stradale qualora abbia violato norme del Codice della strada è anche soggetto alle relative sanzioni",
          answer: 1,
          chunks: [
            { it: CHI, fa: CHI_FA },
            { it: "qualora abbia violato norme del Codice della strada", fa: "اگر قاعده‌هایی از قانونِ راهنمایی‌ورانندگی را نقض کرده باشد", focus: "condition", verb: "abbia violato ← violare" },
            { it: "è anche soggetto alle relative sanzioni", fa: "مشمولِ جریمه‌های مربوط به آن‌ها هم هست", note: "anche = «هم»: پیامدها جمع می‌شوند" },
          ],
          translation: "کسی که از نظرِ کیفری و مدنی مسئولِ یک تصادف است، اگر قاعده‌هایی از قانونِ راهنمایی‌ورانندگی را نقض کرده باشد، مشمولِ جریمه‌های مربوط به آن‌ها هم هست.",
          why: "درست است. «anche» نکته است: سه راه جمع می‌شوند؛ مجازاتِ کیفری جریمه‌ی رانندگی را حذف نمی‌کند.",
        },
        {
          sourceId: "6618",
          textIt: "Chi è penalmente e civilmente responsabile di un sinistro stradale non è assoggettato alle sanzioni del codice della strada",
          answer: 0,
          chunks: [
            { it: CHI, fa: CHI_FA },
            { it: "non è assoggettato alle sanzioni del codice della strada", fa: "مشمولِ جریمه‌های قانونِ راهنمایی‌ورانندگی نیست", focus: "negation" },
          ],
          translation: "کسی که از نظرِ کیفری و مدنی مسئولِ یک تصادف است، مشمولِ جریمه‌های قانونِ راهنمایی‌ورانندگی نیست.",
          why: "غلط است. سه راه از هم جدا هستند و همدیگر را نمی‌بندند؛ اگر قاعده‌ای نقض شده، جریمه‌اش هم هست.",
        },
      ],
      takeaway: "جمله‌ای که یکی از سه پیامد را «حذف» می‌کند (non è assoggettato، esclude، si libera) معمولاً غلط است. «anche» نشانه‌ی جمعِ پیامدهاست.",
      rule: `${CDS("126-bis")}; ${CDS_222}`,
    },
  ],
  practice: [
    {
      sourceId: "6609",
      textIt: "Chi è penalmente e civilmente responsabile di un sinistro stradale è soggetto alle pene previste dal Codice Penale",
      answer: 1,
      chunks: [
        { it: CHI, fa: CHI_FA },
        { it: "è soggetto alle pene previste dal Codice Penale", fa: "مشمولِ مجازات‌هایی است که قانونِ جزا تعیین کرده", verb: "è ← essere" },
      ],
      translation: "کسی که از نظرِ کیفری و مدنی مسئولِ یک تصادف است، مشمولِ مجازات‌هایی است که قانونِ جزا تعیین کرده.",
      why: "درست است (قدم ۱). «penalmente responsabile» یعنی راهِ کیفری باز است، و مجازاتش را قانونِ جزا تعیین می‌کند.",
      rule: CP_590,
      conceptStep: 1,
    },
    {
      sourceId: "6613",
      textIt: "Chi è penalmente e civilmente responsabile di un sinistro stradale può incorrere nella revoca della patente di guida",
      answer: 1,
      chunks: [
        { it: CHI, fa: CHI_FA },
        { it: "può incorrere nella revoca della patente di guida", fa: "ممکن است دچارِ ابطالِ گواهینامه شود", verb: "può ← potere", focus: "limit" },
      ],
      translation: "کسی که از نظرِ کیفری و مدنی مسئولِ یک تصادف است، ممکن است دچارِ ابطالِ گواهینامه شود.",
      why: "درست است (قدم ۲). «può» درست است: محکومیت برای صدمه‌ی شدید یا قتلِ غیرعمد ابطال دارد؛ هر تصادفی نه.",
      rule: CDS_222,
      conceptStep: 2,
    },
    {
      sourceId: "6615",
      textIt: "Chi è penalmente e civilmente responsabile di un sinistro stradale è sempre soggetto all'arresto preventivo",
      answer: 0,
      chunks: [
        { it: CHI, fa: CHI_FA },
        { it: "è sempre soggetto all'arresto preventivo", fa: "همیشه بازداشت می‌شود", focus: "always" },
      ],
      translation: "کسی که از نظرِ کیفری و مدنی مسئولِ یک تصادف است، همیشه بازداشت می‌شود.",
      why: "غلط است (قدم ۲). بازداشت خودکار نیست؛ فقط در چند حالتِ خیلی جدی. «sempre» جمله را غلط می‌کند.",
      rule: `${CP("589-bis")}; ${CP("590-bis")}; Codice di procedura penale, artt. 380–381`,
      conceptStep: 2,
    },
    {
      sourceId: "6616",
      textIt: "Chi è penalmente e civilmente responsabile di un sinistro stradale non può continuare a guidare veicoli della stessa categoria, ma solo di categoria inferiore",
      answer: 0,
      chunks: [
        { it: CHI, fa: CHI_FA },
        { it: "non può continuare a guidare veicoli della stessa categoria,", fa: "نمی‌تواند به راندنِ وسیله‌های همان ردیف ادامه دهد،", focus: "negation", verb: "può ← potere" },
        { it: "ma solo di categoria inferiore", fa: "بلکه فقط ردیفِ پایین‌تر", focus: "limit" },
      ],
      translation: "کسی که از نظرِ کیفری و مدنی مسئولِ یک تصادف است، نمی‌تواند به راندنِ وسیله‌های همان ردیفِ گواهینامه ادامه دهد، بلکه فقط ردیفِ پایین‌تر را.",
      why: "غلط است (قدم ۲). «پایین آمدنِ ردیف» در قانون نیست؛ تصمیم‌ها تعلیق، بازآزمایی یا ابطال‌اند.",
      rule: `${CDS_222}; ${CDS("128")}`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6609", "6610", "6611", "6618"] },
    { step: 2, sourceIds: ["6612", "6613", "6614", "6615", "6616", "6617"] },
  ],
};

export const lessonPenale: Lesson = {
  id: "responsabilita-penale",
  titleFa: "تصادف کِی جرم است؟",
  titleIt: "LA RESPONSABILITÀ PENALE NEL SINISTRO STRADALE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی کدام تصادف جرم است (صدمه به آدم یا مرگ) و کدام نیست (فقط خسارتِ مالیِ ناخواسته، یا فقط نقضِ یک قاعده‌ی رانندگی). و می‌دانی چه چیزی مسئولیتِ کیفری را واقعاً از بین می‌برد (قوه‌ی قاهره) و چه چیزی نه (پول دادن، بیمه، کمک رساندن).",
      why:
        "۱۳ سؤال در دو دسته: «کِی پیش می‌آید» (sorge) و «کِی از بین می‌رود» (è esclusa). جمله‌ی غلط یا جرم را بزرگ می‌کند («هر نقضِ قانون»، «هر خسارتی»، «خودرو کاملاً نابود شد»)، یا می‌گوید پول و بیمه آن را پاک می‌کنند.",
      rule: `${CP("42")}; ${CP("45")}; ${CP_590}`,
    },
    {
      kind: "table",
      title: "کِی جرم پیش می‌آید",
      body:
        "جرم یعنی کاری که قانونِ جزا (یا گاهی خودِ قانونِ راهنمایی‌ورانندگی) آن را جرم نامیده است. در تصادف، معیار این است که به چه کسی و چه چیزی آسیب رسیده، نه این‌که خسارت چقدر گران است:",
      columns: ["جرم است؟", "چرا"],
      rows: [
        { label: "فقط خسارتِ مالیِ ناخواسته", it: "danni involontari alle sole cose", values: ["نه", "خراب کردنِ ناخواسته‌ی مالِ دیگری جرم نیست، حتی اگر خودرو کاملاً نابود شود. فقط راهِ مدنی (جبرانِ خسارت) باز است، و اگر قاعده‌ای نقض شده، راهِ اداری."] },
        { label: "فقط نقضِ یک قاعده", it: "violare il Codice della strada", values: ["معمولاً نه", "بیشترِ تخلف‌های رانندگی (سرعت، سبقت، چراغ) جریمه‌ی اداری‌اند، نه جرم. چند تخلف را خودِ قانون جرم کرده، مثلِ رانندگی با الکلِ خونِ بالای ۰٫۸ (فصلِ ۲۲)؛ پس «هر نقضی جرم است» غلط است."] },
        { label: "صدمه‌ی بدنیِ سبک", it: "lesioni lievi", values: ["بله، با شکایت", "صدمه‌ی بدنیِ غیرعمد، حتی سبک (بیماری تا ۴۰ روز)، جرم است؛ ولی فقط اگر زیان‌دیده شکایت کند (ماده‌ی ۵۹۰)."] },
        { label: "صدمه‌ی شدید یا بسیار شدید", it: "lesioni gravi o gravissime", values: ["بله", "صدمه‌ی شدید با نقضِ مقرراتِ رانندگی جرمِ ماده‌ی ۵۹۰-bis است. حالتِ ساده با شکایت پیش می‌رود؛ با شرط‌های تشدید (الکل، چراغ قرمز، خلافِ جهت…) بی‌شکایت هم."] },
        { label: "مرگ", it: "omicidio colposo / stradale", values: ["بله", "قتلِ غیرعمد در رانندگی (ماده‌ی ۵۸۹-bis). «colposo» یعنی از روی تقصیر، بی‌قصد."] },
        { label: "مالک به جای راننده‌ی ناشناس", it: "il proprietario, se il conducente non è identificato", values: ["نه", "مسئولیتِ کیفری شخصی است (قانونِ اساسی، ماده‌ی ۲۷): فقط کسی که رانده و تقصیر کرده جواب می‌دهد. پیدا نشدنِ راننده آن را به مالک منتقل نمی‌کند؛ خسارتِ مدنی داستانِ دیگری است (درسِ ۴)."] },
      ],
      takeaway: "جرم = آسیب به آدم (سبک با شکایت، شدید، مرگ). فقط خسارتِ مالیِ ناخواسته جرم نیست؛ بیشترِ تخلف‌ها اداری‌اند؛ مسئولیتِ کیفری شخصی است.",
      rule: `${CP("42")} c.2; ${CP_590}; ${CP("583")}; ${COST_27}`,
    },
    {
      kind: "table",
      title: "چه چیزی آن را از بین می‌برد، چه چیزی نه",
      body:
        "وقتی کاری جرم است، چند چیز به نظر «جبران» می‌آیند ولی جرم را پاک نمی‌کنند. فقط وقتی راننده واقعاً نمی‌توانسته کاری کند، مسئولیتِ کیفری نیست:",
      columns: ["از بین می‌برد؟", "چرا"],
      rows: [
        { label: "قوه‌ی قاهره", it: "causa di forza maggiore", values: ["بله", "نیرویی بیرونی که نه دیدنی بود نه جلوگیری‌پذیر؛ مثلاً سنگی که ناگهان از کوه روی خودرو می‌افتد و آن را به سمتِ دیگری پرت می‌کند. کسی که نمی‌توانسته کاری کند مجازات نمی‌شود (ماده‌ی ۴۵)."] },
        { label: "کار جرم نیست", it: "il fatto non è un reato", values: ["بله", "اگر کار اصلاً جرم نیست (مثلاً فقط خسارتِ مالیِ ناخواسته)، مسئولیتِ کیفری‌ای وجود ندارد."] },
        { label: "کمک رساندن", it: "prestare soccorso alla vittima", values: ["نه", "کمک رساندن وظیفه است (ماده‌ی ۱۸۹، فصلِ ۲۱)؛ نرساندنش خودش جرم است. کمک کردن کارِ درست است، ولی صدمه‌ای را که با تقصیرت زده‌ای پاک نمی‌کند."] },
        { label: "پرداختِ خسارت", it: "il risarcimento del danno", values: ["نه، خودکار نه", "پول راهِ مدنی را می‌بندد. فقط در جرم‌هایی که با شکایت پیش می‌روند (مثلِ صدمه‌ی سبک)، زیان‌دیده ممکن است شکایتش را پس بگیرد، و جبرانِ کامل ممکن است باعث شود قاضی جرم را مختومه اعلام کند (ماده‌ی ۱۶۲-ter). این تصمیمِ قاضی است، نه «هر بار که پول دادی»."] },
        { label: "پرداخت به دستِ بیمه", it: "interviene l'impresa di assicurazione", values: ["نه", "همان پرداختِ خسارت است، این بار از طرفِ شرکتِ بیمه. بیمه هیچ‌وقت مسئولیتِ کیفری را نمی‌خرد (درسِ ۶)."] },
      ],
      takeaway: "فقط «نمی‌توانستی کاری کنی» (قوه‌ی قاهره) یا «جرم نبود» آن را از بین می‌برد. کمک، پول و بیمه کارهای درست یا لازم‌اند، ولی جرم را خودکار پاک نمی‌کنند.",
      rule: `${CP("45")}; ${CP("162-ter")}; ${CDS("189")}; ${CP("590")}`,
    },
    {
      kind: "classify",
      title: "تمرین: جرم است یا نه؟",
      body: `${DISCLAIMER} هر خط یک ماجرای جداست؛ هر واقعیتی که لازم است در همان خط آمده. بگو:`,
      options: CRIME,
      items: [
        { prompt: "در پارکینگ موقعِ دنده‌عقب، گلگیرِ خودروی پارک‌شده‌ای را خط می‌اندازی. کسی آسیب ندیده.", answer: 1, explain: "فقط خسارتِ مالیِ ناخواسته: جرم نیست، ولی باید خسارت را جبران کنی (راهِ مدنی)." },
        { prompt: "شب در آزادراه به خودرویی می‌زنی؛ هر دو خودرو کاملاً نابود می‌شوند. هیچ‌کس آسیب ندیده.", answer: 1, explain: "گرانیِ خسارت معیار نیست؛ آسیبی به آدم نرسیده، پس جرم نیست." },
        { prompt: "۲۰ کیلومتر بیشتر از حدِ مجاز می‌رانی و پلیس ثبت می‌کند. تصادفی نیست.", answer: 1, explain: "تخلفِ اداری: جریمه و شاید امتیاز. جرم نیست." },
        { prompt: "با تقصیرِ تو تصادف می‌شود و راننده‌ی دیگر می‌میرد.", answer: 0, explain: "قتلِ غیرعمد در رانندگی (ماده‌ی ۵۸۹-bis)." },
        { prompt: "با تقصیرِ تو تصادف می‌شود؛ راننده‌ی دیگر به بیمارستان می‌رود. نمی‌دانیم درمانش چند روز طول می‌کشد و آیا شکایت می‌کند.", answer: 2, explain: "اگر صدمه شدید باشد جرم است؛ اگر سبک باشد فقط با شکایتِ او پیش می‌رود. با این اطلاعات نمی‌شود گفت." },
        { prompt: "سنگی بزرگ ناگهان از کوه روی خودروات می‌افتد و آن را به سمتِ دوچرخه‌سواری پرت می‌کند که زخمی می‌شود. هیچ هشدار و فرصتی نبود.", answer: 1, explain: "قوه‌ی قاهره: کاری از تو برنمی‌آمد، پس مجازاتی نیست (ماده‌ی ۴۵)." },
        { prompt: "به عابری صدمه‌ی شدید می‌زنی؛ بعد خودت و بیمه‌ات همه‌ی خسارت را می‌پردازید.", answer: 0, explain: "پرداخت راهِ مدنی را می‌بندد، نه جرم را (قدمِ ۲)." },
      ],
      takeaway: "اول بپرس: به آدم آسیب رسید؟ اگر نه، جرم نیست. اگر بله، پول و بیمه آن را پاک نمی‌کنند؛ فقط «نمی‌شد کاری کرد» پاکش می‌کند.",
      rule: `${CP("45")}; ${CP("589-bis")}; ${CP("590")}; ${CP("590-bis")}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il reato", fa: "جرم" },
        { it: "sorgere", fa: "پیش آمدن، به وجود آمدن", note: "sorge = پیش می‌آید" },
        { it: "essere escluso", fa: "از بین رفتن، منتفی بودن", base: "escludere" },
        { it: "le lesioni personali gravi", fa: "صدمه‌ی بدنیِ شدید" },
        { it: "l'omicidio colposo", fa: "قتلِ غیرعمد", note: "colposo = از روی تقصیر، بی‌قصد" },
        { it: "la colpa", fa: "تقصیر" },
        { it: "la forza maggiore", fa: "قوه‌ی قاهره" },
        { it: "la querela", fa: "شکایتِ زیان‌دیده" },
        { it: "il danneggiato", fa: "زیان‌دیده" },
        { it: "danni alle sole cose", fa: "فقط خسارتِ مالی" },
      ],
    },
    {
      kind: "trap",
      title: "«è esclusa»: کدام واقعاً از بین می‌برد؟",
      body: "هر دو جمله می‌گویند مسئولیتِ کیفری «از بین می‌رود». یکی دلیلِ واقعی دارد؛ دیگری پول را جای حکم می‌گذارد:",
      examples: [
        {
          sourceId: "6621",
          textIt: "La responsabilità penale connessa al sinistro stradale è esclusa quando il fatto dipende da causa di forza maggiore",
          answer: 1,
          chunks: [
            { it: RP, fa: RP_FA },
            { it: "è esclusa", fa: "از بین می‌رود", verb: "è esclusa ← escludere" },
            { it: "quando il fatto dipende da causa di forza maggiore", fa: "وقتی رخ‌داد ناشی از قوه‌ی قاهره است", focus: "condition" },
          ],
          translation: "مسئولیتِ کیفریِ ناشی از تصادف از بین می‌رود، وقتی رخ‌داد ناشی از قوه‌ی قاهره است.",
          why: "درست است. کسی که نمی‌توانسته کاری کند، مجازات نمی‌شود (ماده‌ی ۴۵).",
        },
        {
          sourceId: "6623",
          textIt: "La responsabilità penale connessa al sinistro stradale è esclusa ogni qualvolta ci sia stato il risarcimento del danno",
          answer: 0,
          chunks: [
            { it: RP, fa: RP_FA },
            { it: "è esclusa", fa: "از بین می‌رود", verb: "è esclusa ← escludere" },
            { it: "ogni qualvolta ci sia stato il risarcimento del danno", fa: "هر بار که خسارت جبران شده باشد", focus: "always" },
          ],
          translation: "مسئولیتِ کیفریِ ناشی از تصادف هر بار که خسارت جبران شده باشد از بین می‌رود.",
          why: "غلط است. جبرانِ خسارت راهِ مدنی را می‌بندد. فقط در جرم‌های با شکایت، قاضی ممکن است با جبرانِ کامل جرم را مختومه کند؛ «ogni qualvolta» این را خودکار می‌کند.",
        },
      ],
      takeaway: "«è esclusa» با قوه‌ی قاهره یا «جرم نبودن» درست است؛ با پول، بیمه یا کمک غلط است.",
      rule: `${CP("45")}; ${CP("162-ter")}`,
    },
  ],
  practice: [
    {
      sourceId: "6625",
      textIt: "La responsabilità penale connessa al sinistro stradale sorge qualora esso provochi lesioni gravi a persone",
      answer: 1,
      chunks: [
        { it: RP, fa: RP_FA },
        { it: "sorge", fa: "پیش می‌آید", verb: "sorge ← sorgere" },
        { it: "qualora esso provochi lesioni gravi a persone", fa: "اگر تصادف به آدم‌ها صدمه‌ی شدید بزند", focus: "condition" },
      ],
      translation: "مسئولیتِ کیفریِ ناشی از تصادف پیش می‌آید، اگر تصادف به آدم‌ها صدمه‌ی شدید بزند.",
      why: "درست است (قدم ۱). صدمه‌ی شدید در رانندگی جرمِ ماده‌ی ۵۹۰-bis است. (صدمه‌ی سبک هم جرم است، ولی با شکایت.)",
      rule: CP_590,
      conceptStep: 1,
    },
    {
      sourceId: "6628",
      textIt: "La responsabilità penale connessa al sinistro stradale sorge in ogni caso in cui sia violato il Codice della strada",
      answer: 0,
      chunks: [
        { it: RP, fa: RP_FA },
        { it: "sorge", fa: "پیش می‌آید", verb: "sorge ← sorgere" },
        { it: "in ogni caso in cui sia violato il Codice della strada", fa: "در هر حالتی که قانونِ راهنمایی‌ورانندگی نقض شده باشد", focus: "always" },
      ],
      translation: "مسئولیتِ کیفریِ ناشی از تصادف در هر حالتی که قانونِ راهنمایی‌ورانندگی نقض شده باشد پیش می‌آید.",
      why: "غلط است (قدم ۱). بیشترِ تخلف‌ها فقط جریمه‌ی اداری دارند؛ جرم با آسیب به آدم (یا چند تخلفِ خاص) پیش می‌آید.",
      rule: `${CP("42")}; ${CDS("126-bis")}`,
      conceptStep: 1,
    },
    {
      sourceId: "6619",
      textIt: "La responsabilità penale connessa al sinistro stradale è esclusa quando vi siano danni involontari alle sole cose",
      answer: 1,
      chunks: [
        { it: RP, fa: RP_FA },
        { it: "è esclusa", fa: "منتفی است", verb: "è esclusa ← escludere" },
        { it: "quando vi siano danni involontari alle sole cose", fa: "وقتی فقط خسارتِ مالیِ ناخواسته باشد", focus: "limit" },
      ],
      translation: "مسئولیتِ کیفریِ ناشی از تصادف منتفی است، وقتی فقط خسارتِ مالیِ ناخواسته باشد.",
      why: "درست است (قدم ۲). خسارتِ ناخواسته به مال جرم نیست؛ فقط جبرانِ مدنی دارد.",
      rule: `${CP("42")} c.2; ${CP("635")}`,
      conceptStep: 2,
    },
    {
      sourceId: "6624",
      textIt: "La responsabilità penale connessa al sinistro stradale è esclusa qualora intervenga l'impresa di assicurazione che risarcisca adeguatamente il danneggiato",
      answer: 0,
      chunks: [
        { it: RP, fa: RP_FA },
        { it: "è esclusa", fa: "از بین می‌رود", verb: "è esclusa ← escludere" },
        { it: "qualora intervenga l'impresa di assicurazione", fa: "اگر شرکتِ بیمه وارد شود", focus: "condition", verb: "intervenga ← intervenire" },
        { it: "che risarcisca adeguatamente il danneggiato", fa: "و خسارتِ زیان‌دیده را به‌اندازه جبران کند", verb: "risarcisca ← risarcire" },
      ],
      translation: "مسئولیتِ کیفریِ ناشی از تصادف از بین می‌رود، اگر شرکتِ بیمه وارد شود و خسارتِ زیان‌دیده را به‌اندازه جبران کند.",
      why: "غلط است (قدم ۲). بیمه فقط راهِ مدنی را حل می‌کند؛ مسئولیتِ کیفری شخصی است و با پول منتقل نمی‌شود.",
      rule: `${CAP("122")}; ${COST_27}`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6625", "6626", "6627", "6628", "6629", "6630", "6631"] },
    { step: 2, sourceIds: ["6619", "6620", "6621", "6622", "6623", "6624"] },
  ],
};
