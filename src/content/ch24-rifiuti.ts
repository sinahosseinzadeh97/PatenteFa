/**
 * src/content/ch24-rifiuti.ts
 * Chapter 24 (Consumi, ambiente e inquinamento), lessons 9–10
 * (bank groups 625 and 626).
 *
 *  L9  vehicle waste: coolant, batteries, engine oil, end-of-life vehicles,
 *      camper waste water, hazardous waste (now a crime to abandon,
 *      D.Lgs. 152/2006 art. 255-ter, added by D.L. 116/2025).
 *  L10 «È vietato…» on every road: what art. 15 really forbids (damage, throwing
 *      things from moving vehicles, rubbish, mud) and four bans that do not
 *      exist everywhere (practising, horns, vehicles over 10 m, parking in a
 *      residential zone). Chapter 1's «کارهای ممنوع در جاده» is linked.
 *
 * 6841 (the retailer takes the old battery back at no cost) is kept but never
 * scored: the 2008 decree read gives free return at collection centres, the
 * retailer duty itself was not located (FLAGGED_SOURCE_IDS, lessons-ambiente.ts).
 * Trust rules as in src/content/lessons.ts; tests/chapter24.test.ts.
 */
import type { Lesson } from "./lessons.js";
import { AMB, CDS, EXERCISE, PILE, VFU } from "./ch24-common.js";

const VIETATO = "E' vietato";
const VIETATO_FA = "ممنوع است";
const TUTTE = "Su tutte le strade";
const TUTTE_FA = "روی همه‌ی جاده‌ها";
const ZONA_RES = "DPR 495/1992 (Regolamento CdS), art. 135: segnale ZONA RESIDENZIALE (regole fissate per quella zona)";

export const lessonRifiuti: Lesson = {
  id: "rifiuti-del-veicolo",
  titleFa: "زباله‌ی خودرو: ضدیخ، باتری، روغن، اسقاط",
  titleIt: "SMALTIMENTO: ANTIGELO · BATTERIA · OLIO · ROTTAMAZIONE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی هر زباله‌ی خودرو کجا می‌رود و کجا هرگز: ضدیخ، باتریِ کهنه، روغنِ سوخته، خودرویی که اسقاط می‌شود، و فاضلابِ کمپر. و می‌دانی چرا: این‌ها خاک و آبِ زیرِ زمین را آلوده می‌کنند، و رها کردنِ زباله‌ی خطرناک امروز جرم است.",
      why:
        "۸ سؤال، همه درست به جز دو تا. جمله‌ی غلط یا رها کردنِ زباله‌ی خطرناک را «بی‌مجازات» می‌داند، یا تنها راهِ اسقاط را نمایندگیِ سازنده.",
      rule: AMB("255-ter"),
    },
    {
      kind: "table",
      title: "هر چیز کجا می‌رود",
      body:
        "این‌ها زباله‌ی معمولی نیستند. اگر خودت عوضشان کنی، مسئولِ تحویلِ درستشان هم خودتی؛ اگر تعمیرگاه عوض کند، تحویل با تعمیرگاه است:",
      columns: ["کجا", "کجا هرگز", "چرا"],
      rows: [
        { label: "ضدیخ", it: "il liquido antigelo", values: ["تعمیرگاه یا مرکزِ جمع‌آوریِ شهرداری", "فاضلاب، خاک", "ممکن است تجزیه‌پذیر نباشد و آب را آلوده کند"] },
        { label: "باتریِ کهنه", it: "la batteria esausta", values: ["مرکزِ جمع‌آوری، بی‌هزینه و بی‌اجبار به خریدِ باتریِ نو؛ فروشنده‌ها هم معمولاً باتریِ کهنه را پس می‌گیرند", "جاده، زمین، سطلِ زباله", "اسید و فلزِ سنگین؛ به خاک و آبِ زیرِ زمین آسیبِ جدی می‌زند"] },
        { label: "روغنِ سوخته", it: "l'olio del motore usato", values: ["تعمیرگاه یا مرکزِ مجاز؛ دستکش، و پوست را زود بشوی", "فاضلاب، خاک؛ با روغنِ آشپزی قاطی نکن", "تماسِ طولانی با پوست آسیب می‌زند؛ آب و خاک را آلوده می‌کند"] },
        { label: "خودرویی که اسقاط می‌شود", it: "demolire o rottamare", values: ["مرکزِ مجازِ اسقاط؛ یا اگر خودروی دیگری می‌خری، فروشنده که آن را به مرکز می‌فرستد", "رها کردن؛ «فقط نمایندگیِ سازنده» غلط است", "مایع‌ها و باتری‌اش باید ایمن جدا شوند"] },
        { label: "فاضلاب و آبِ کثیفِ کمپر", it: "acque sporche delle autocaravan", values: ["تأسیساتِ مخصوصِ تخلیه", "جاده و زمینِ عمومی (ماده‌ی ۱۸۵)", "بهداشت"] },
        { label: "زباله‌ی خطرناک (روغن، مایع، تکه‌های تعمیر)", it: "rifiuti pericolosi o tossici", values: ["مرکزِ مجاز", "رها کردن روی زمین", "از ۲۰۲۵ جرم است، با حبس (قانونِ محیط‌زیست، ماده‌ی ۲۵۵-ter)"] },
        {
          label: "یادداشتِ منبع: فروشنده و باتریِ کهنه",
          it: "consegnare quella esausta al rivenditore",
          values: [
            "بانک می‌گوید فروشنده بی‌هزینه پس می‌گیرد",
            "—",
            "در فرمانِ ۲۰۰۸ که خواندیم، تحویلِ رایگان در مرکزِ جمع‌آوری آمده؛ وظیفه‌ی خودِ فروشنده را پیدا نکردیم. جوابِ بانک را نگه می‌داریم، ولی برای امتیاز نمی‌آوریم.",
          ],
        },
      ],
      takeaway: "زباله‌ی خودرو هیچ‌وقت در فاضلاب یا روی زمین نمی‌رود. اسقاط: مرکزِ مجاز، نه «فقط نمایندگی».",
      rule: `${AMB("255-ter")}; ${VFU}; ${PILE}; ${CDS("185")} c.4`,
    },
    {
      kind: "classify",
      title: "تمرین: درست یا نادرست؟",
      body: `${EXERCISE} این کارها ساختگی‌اند، نه از بانک. دسته کن:`,
      options: [
        { it: "corretto", fa: "درست" },
        { it: "sbagliato", fa: "نادرست" },
      ],
      items: [
        { prompt: "ضدیخِ کهنه را در آبروِ کفِ پارکینگ خالی کردن", answer: 1, explain: "ضدیخ در فاضلاب ممنوع است؛ به مرکزِ جمع‌آوری ببر (قدمِ ۱)." },
        { prompt: "باتریِ کهنه را کنارِ سطل‌های زباله‌ی خیابان گذاشتن", answer: 1, explain: "باتری زباله‌ی معمولی نیست؛ مرکزِ جمع‌آوری بی‌هزینه می‌گیرد (قدمِ ۱)." },
        { prompt: "خودروی کهنه را به مرکزِ مجازِ اسقاط تحویل دادن", answer: 0, explain: "همین راهِ قانونی است (قدمِ ۱)." },
        { prompt: "هنگامِ خریدِ خودروی نو، خودروی کهنه را به فروشنده دادن تا به مرکزِ اسقاط بفرستد", answer: 0, explain: "قانون این راه را هم پیش‌بینی کرده (قدمِ ۱)." },
        { prompt: "روغنِ سوخته را بعد از تعویضِ خانگی در باغچه خالی کردن", answer: 1, explain: "خاک و آب را آلوده می‌کند؛ رها کردنِ زباله‌ی خطرناک جرم است (قدمِ ۱)." },
        { prompt: "آبِ کثیفِ کمپر را در ایستگاهِ تخلیه‌ی مخصوص خالی کردن", answer: 0, explain: "درست است؛ روی جاده و زمینِ عمومی ممنوع است (قدمِ ۱)." },
      ],
      takeaway: "هر مایع و قطعه‌ی خودرو جایی مخصوص دارد؛ زمین، فاضلاب و کنارِ خیابان هیچ‌وقت.",
      rule: AMB("255-ter"),
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il liquido antigelo", fa: "ضدیخ" },
        { it: "la fognatura", fa: "فاضلاب" },
        { it: "biodegradabile", fa: "تجزیه‌پذیر" },
        { it: "la batteria esausta", fa: "باتریِ کهنه" },
        { it: "le falde acquifere", fa: "آب‌های زیرِ زمین" },
        { it: "l'olio del motore", fa: "روغنِ موتور" },
        { it: "lo smaltimento", fa: "دور ریختنِ اصولی" },
        { it: "demolire · rottamare", fa: "اسقاط کردن", base: "rottamare" },
        { it: "il centro di raccolta (autodemolitore autorizzato)", fa: "مرکزِ مجازِ اسقاط" },
        { it: "i rifiuti pericolosi", fa: "زباله‌ی خطرناک" },
      ],
    },
    {
      kind: "trap",
      title: "اسقاط: «centro di raccolta» یا «esclusivamente al concessionario»؟",
      body: "هر دو جمله می‌گویند خودروی اسقاطی را کجا ببری. یکی مرکزِ مجاز را می‌گوید، دیگری فقط نمایندگی را:",
      examples: [
        {
          sourceId: "6842",
          textIt: "Il proprietario di un veicolo che intende demolirlo o rottamarlo, deve consegnarlo ad un centro di raccolta per la messa in sicurezza (autodemolitore autorizzato)",
          answer: 1,
          chunks: [
            { it: "Il proprietario di un veicolo che intende demolirlo o rottamarlo,", fa: "مالکِ خودرویی که می‌خواهد آن را اسقاط کند،", verb: "intende ← intendere" },
            { it: "deve consegnarlo ad un centro di raccolta per la messa in sicurezza", fa: "باید آن را به یک مرکزِ جمع‌آوری برای ایمن‌سازی تحویل دهد", verb: "deve ← dovere" },
            { it: "(autodemolitore autorizzato)", fa: "(مرکزِ مجازِ اسقاط)" },
          ],
          translation: "مالکِ خودرویی که می‌خواهد آن را اسقاط کند، باید آن را به یک مرکزِ جمع‌آوری برای ایمن‌سازی (مرکزِ مجازِ اسقاط) تحویل دهد.",
          why: "درست است. ماده‌ی ۵ فرمانِ ۲۰۹/۲۰۰۳.",
        },
        {
          sourceId: "6846",
          textIt: "Per demolire o rottamare un veicolo, lo si deve consegnare esclusivamente al concessionario della casa costruttrice",
          answer: 0,
          chunks: [
            { it: "Per demolire o rottamare un veicolo,", fa: "برای اسقاطِ یک خودرو،", focus: "reason" },
            { it: "lo si deve consegnare esclusivamente al concessionario della casa costruttrice", fa: "باید آن را فقط به نمایندگیِ سازنده تحویل داد", verb: "si deve ← dovere", focus: "limit" },
          ],
          translation: "برای اسقاطِ یک خودرو، باید آن را فقط به نمایندگیِ سازنده تحویل داد.",
          why: "غلط است. نمایندگی فقط وقتی خودروی دیگری می‌خری یکی از راه‌هاست؛ «esclusivamente» غلط است.",
        },
      ],
      takeaway: "«esclusivamente» کنارِ نمایندگی غلط است؛ مرکزِ مجازِ اسقاط همیشه راه است.",
      rule: VFU,
    },
  ],
  practice: [
    {
      sourceId: "6839",
      textIt: "E' vietato scaricare nella fognatura il liquido antigelo del circuito di raffreddamento del veicolo, poiché potrebbe non essere biodegradabile",
      answer: 1,
      chunks: [
        { it: VIETATO, fa: VIETATO_FA },
        { it: "scaricare nella fognatura il liquido antigelo del circuito di raffreddamento del veicolo,", fa: "خالی کردنِ ضدیخِ مدارِ خنک‌کننده‌ی خودرو در فاضلاب،" },
        { it: "poiché potrebbe non essere biodegradabile", fa: "چون ممکن است تجزیه‌پذیر نباشد", focus: "reason" },
      ],
      translation: "خالی کردنِ ضدیخِ مدارِ خنک‌کننده‌ی خودرو در فاضلاب ممنوع است، چون ممکن است تجزیه‌پذیر نباشد.",
      why: "درست است (قدم ۱). ضدیخ را به تعمیرگاه یا مرکزِ جمع‌آوری بده.",
      rule: AMB("255-ter"),
      conceptStep: 1,
    },
    {
      sourceId: "6843",
      textIt: "Al momento dello smaltimento dell'olio del motore, bisogna evitare che venga a contatto con la pelle per un tempo prolungato",
      answer: 1,
      chunks: [
        { it: "Al momento dello smaltimento dell'olio del motore,", fa: "هنگامِ دور ریختنِ روغنِ موتور،" },
        { it: "bisogna evitare che venga a contatto con la pelle", fa: "باید نگذاشت با پوست تماس پیدا کند", verb: "venga ← venire" },
        { it: "per un tempo prolungato", fa: "برای مدتِ طولانی", focus: "condition" },
      ],
      translation: "هنگامِ دور ریختنِ روغنِ موتور، باید نگذاشت مدتِ طولانی با پوست تماس پیدا کند.",
      why: "درست است (قدم ۱). روغنِ سوخته برای پوست زیان‌آور است؛ دستکش بپوش و زود بشوی.",
      rule: "INAIL, esposizione a oli minerali usati nei motori; schede di sicurezza degli oli motore",
      conceptStep: 1,
    },
    {
      sourceId: "6845",
      textIt: "L'abbandono sul terreno di rifiuti pericolosi o tossici (olii, liquidi, residui di riparazioni o di sostituzioni) non viene sanzionato",
      answer: 0,
      chunks: [
        { it: "L'abbandono sul terreno di rifiuti pericolosi o tossici", fa: "رها کردنِ زباله‌ی خطرناک یا سمی روی زمین" },
        { it: "(olii, liquidi, residui di riparazioni o di sostituzioni)", fa: "(روغن، مایع، تکه‌های تعمیر یا تعویض)" },
        { it: "non viene sanzionato", fa: "مجازاتی ندارد", focus: "negation", verb: "viene sanzionato ← sanzionare" },
      ],
      translation: "رها کردنِ زباله‌ی خطرناک یا سمی (روغن، مایع، تکه‌های تعمیر یا تعویض) روی زمین مجازاتی ندارد.",
      why: "غلط است (قدم ۱). مجازات دارد؛ از ۲۰۲۵ رها کردنِ زباله‌ی خطرناک جرم است، با حبس.",
      rule: AMB("255-ter"),
      conceptStep: 1,
    },
  ],
  related: [{ step: 1, sourceIds: ["6839", "6840", "6841", "6842", "6843", "6844", "6845", "6846"] }],
};

export const lessonDivietiStrade: Lesson = {
  id: "divieti-su-tutte-le-strade",
  titleFa: "«روی همه‌ی جاده‌ها ممنوع است»: کدام واقعاً؟",
  titleIt: "DIVIETI SU TUTTE LE STRADE",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی ماده‌ی ۱۵ چه چیزهایی را واقعاً روی همه‌ی جاده‌ها ممنوع کرده (آسیب زدن به تأسیسات، انداختنِ چیزی از خودروی در حال حرکت، زباله، گلِ چرخ‌ها)، و چهار ممنوعیتِ ساختگیِ «همه‌جا» را رد می‌کنی: تمرینِ رانندگی، بوق، خودروی بلندتر از ۱۰ متر، پارک در محله‌ی مسکونی.",
      why:
        "۸ سؤال: چهار درست، چهار غلط. همه‌ی درست‌ها کارهایی‌اند که جاده را خراب یا کثیف می‌کنند. همه‌ی غلط‌ها کاری را که قاعده دارد «همه‌جا ممنوع» می‌کنند.",
      rule: `${CDS("15")} c.1`,
    },
    {
      kind: "table",
      title: "واقعاً همه‌جا ممنوع",
      body:
        "این‌ها را ماده‌ی ۱۵ روی همه‌ی جاده‌ها ممنوع کرده، چون جاده را برای نفرِ بعدی خطرناک یا کثیف می‌کنند. بخشی از این‌ها را در فصلِ ۱، «کارهای ممنوع در جاده» دیده‌ای:",
      columns: ["چرا"],
      rows: [
        { label: "آسیب زدن به تأسیساتِ جاده", it: "danneggiare le opere e gli impianti stradali", values: ["گاردریل، تابلو، چراغ: ایمنیِ همه به آن‌ها بسته است"] },
        { label: "انداختنِ چیزی از خودروی در حال حرکت", it: "gettare oggetti e rifiuti dai veicoli in movimento", values: ["هر چیزی؛ برای موتورسوار و دوچرخه‌سوار خطر است"] },
        { label: "کثیف کردنِ سواره‌رو با زباله", it: "sporcare la carreggiata depositando rifiuti", values: ["جریمه، و جبرانِ هزینه‌ی تمیز کردن"] },
        { label: "واردِ جاده شدن با چرخ‌های گِلی", it: "le ruote del veicolo sporche di fango", values: ["گل جاده را لغزنده می‌کند؛ پیش از ورود از زمین یا کارگاه چرخ‌ها را تمیز کن"] },
      ],
      takeaway: "آسیب، انداختن، زباله، گل: روی همه‌ی جاده‌ها ممنوع، بی‌استثنا.",
      rule: `${CDS("15")} c.1 lett. a, f, f-bis, g, i`,
    },
    {
      kind: "table",
      title: "این‌ها «همه‌جا ممنوع» نیستند",
      body: "این کارها قاعده دارند، ولی هیچ قانونی آن‌ها را روی همه‌ی جاده‌ها ممنوع نکرده:",
      columns: ["قاعده‌ی واقعی"],
      rows: [
        { label: "تمرینِ رانندگی", it: "esercitarsi alla guida", values: ["با مجوزِ تمرین و همراهِ مجاز؛ برای گواهینامه‌ی B حتی تمرین در آزادراه یا جاده‌ی برون‌شهری و در تاریکی لازم است (ماده‌ی ۱۲۲)"] },
        { label: "بوق", it: "gli avvisatori acustici", values: ["ممنوع نیست؛ کم، کوتاه، فقط برای ایمنی، و در آبادی فقط در خطرِ فوری (درسِ ۸)"] },
        { label: "خودروی بلندتر از ۱۰ متر", it: "veicoli che superano 10 m", values: ["طولِ مجازِ یک خودرو تا ۱۲ متر است (ماده‌ی ۶۱)؛ فقط تابلوی مخصوص در یک جاده‌ی مشخص می‌تواند خودروهای بلندتر از طولی را ممنوع کند (فصلِ ۳)"] },
        { label: "پارک در محله‌ی مسکونی", it: "parcheggiare nelle zone residenziali", values: ["تابلوی «zona residenziale» قاعده‌های مخصوصِ همان محله را اعلام می‌کند؛ پارک جایی که آن قاعده‌ها و خط‌کشی اجازه دهند. ممنوعیتِ عمومی نیست"] },
      ],
      takeaway: "«Su tutte le strade è vietato…» برای کاری که قاعده دارد، تقریباً همیشه غلط است.",
      rule: `${CDS("122")} c.5-bis; ${CDS("156")}; ${CDS("61")} c.1; ${ZONA_RES}`,
    },
    {
      kind: "classify",
      title: "تمرین: همه‌جا ممنوع، یا قاعده دارد؟",
      body: `${EXERCISE} این کارها ساختگی‌اند، نه از بانک. دسته کن:`,
      options: [
        { it: "vietato su tutte le strade", fa: "روی همه‌ی جاده‌ها ممنوع" },
        { it: "regolato, non vietato ovunque", fa: "قاعده دارد، همه‌جا ممنوع نیست" },
      ],
      items: [
        { prompt: "یک قوطیِ خالی را از پنجره‌ی خودروی در حال حرکت انداختن", answer: 0, explain: "انداختنِ هر چیزی از خودروی در حال حرکت ممنوع است (قدمِ ۱)." },
        { prompt: "بیرون از آبادی، پیش از سبقت یک بوقِ کوتاه", answer: 1, explain: "بیرون از آبادی، وقتی لازم است به‌خصوص در سبقت، مجاز است (قدمِ ۲)." },
        { prompt: "تراکتور از زمینِ گِلی، با چرخ‌های گِلی، مستقیم واردِ جاده می‌شود", answer: 0, explain: "ریختنِ گل با چرخ‌ها ممنوع است (قدمِ ۱)." },
        { prompt: "کارآموزِ گواهینامه‌ی B با همراهِ مجاز در آزادراه تمرین می‌کند", answer: 1, explain: "ممنوع نیست؛ برای B لازم هم هست (قدمِ ۲)." },
        { prompt: "خودروی ۱۱ متری در جاده‌ای که تابلوی محدودیتِ طول ندارد", answer: 1, explain: "تا ۱۲ متر مجاز است؛ فقط تابلو در جاده‌ای مشخص محدودش می‌کند (قدمِ ۲)." },
        { prompt: "عمداً به گاردریل لگد زدن و خمش کردن", answer: 0, explain: "آسیب زدن به تأسیساتِ جاده ممنوع است (قدمِ ۱)." },
      ],
      takeaway: "کاری که جاده را خراب یا کثیف می‌کند: همه‌جا ممنوع. کاری که قاعده دارد: «همه‌جا ممنوع» نیست.",
      rule: CDS("15"),
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "danneggiare", fa: "آسیب زدن", base: "danneggiare" },
        { it: "le opere e gli impianti stradali", fa: "تأسیسات و ساخته‌های جاده" },
        { it: "gettare", fa: "انداختن", base: "gettare" },
        { it: "i rifiuti", fa: "زباله" },
        { it: "sporcare la carreggiata", fa: "کثیف کردنِ سواره‌رو", base: "sporcare" },
        { it: "il fango", fa: "گِل" },
        { it: "esercitarsi alla guida", fa: "تمرینِ رانندگی کردن", base: "esercitarsi" },
        { it: "la zona residenziale", fa: "محله‌ی مسکونی" },
        { it: "su tutte le strade", fa: "روی همه‌ی جاده‌ها" },
      ],
    },
    {
      kind: "trap",
      title: "«vietato»: کدام همه‌جا؟",
      body: "هر دو جمله چیزی را ممنوع می‌کنند. یکی کاری است که جاده را خطرناک می‌کند، دیگری وسیله‌ای که قاعده دارد:",
      examples: [
        {
          sourceId: "6848",
          textIt: "E' vietato gettare oggetti e rifiuti dai veicoli in movimento",
          answer: 1,
          chunks: [
            { it: VIETATO, fa: VIETATO_FA },
            { it: "gettare oggetti e rifiuti dai veicoli in movimento", fa: "انداختنِ اشیا و زباله از وسیله‌های در حال حرکت" },
          ],
          translation: "انداختنِ اشیا و زباله از وسیله‌های در حال حرکت ممنوع است.",
          why: "درست است. ماده‌ی ۱۵ بند ۱ حرفِ i: «qualsiasi cosa».",
        },
        {
          sourceId: "6852",
          textIt: "Su tutte le strade sono vietati gli avvisatori acustici (clacson, trombe)",
          answer: 0,
          chunks: [
            { it: TUTTE, fa: TUTTE_FA, focus: "always" },
            { it: "sono vietati gli avvisatori acustici (clacson, trombe)", fa: "وسیله‌های هشدارِ صوتی (بوق، شیپور) ممنوع‌اند" },
          ],
          translation: "روی همه‌ی جاده‌ها وسیله‌های هشدارِ صوتی (بوق، شیپور) ممنوع‌اند.",
          why: "غلط است. بوق قاعده دارد (ماده‌ی ۱۵۶)، ممنوع نیست.",
        },
      ],
      takeaway: "«Su tutte le strade» کنارِ کاری که قاعده دارد، نشانه‌ی جمله‌ی غلط است.",
      rule: `${CDS("15")} c.1 lett. i; ${CDS("156")}`,
    },
  ],
  practice: [
    {
      sourceId: "6847",
      textIt: "E' vietato danneggiare le opere e gli impianti stradali",
      answer: 1,
      chunks: [
        { it: VIETATO, fa: VIETATO_FA },
        { it: "danneggiare le opere e gli impianti stradali", fa: "آسیب زدن به ساخته‌ها و تأسیساتِ جاده" },
      ],
      translation: "آسیب زدن به ساخته‌ها و تأسیساتِ جاده ممنوع است.",
      why: "درست است (قدم ۱). ماده‌ی ۱۵ بند ۱ حرفِ a.",
      rule: `${CDS("15")} c.1 lett. a`,
      conceptStep: 1,
    },
    {
      sourceId: "6850",
      textIt: "E' vietato immettersi sulle strade con le ruote del veicolo sporche di fango",
      answer: 1,
      chunks: [
        { it: VIETATO, fa: VIETATO_FA },
        { it: "immettersi sulle strade", fa: "واردِ جاده شدن", verb: "immettersi ← immettere" },
        { it: "con le ruote del veicolo sporche di fango", fa: "با چرخ‌های گِلیِ وسیله", focus: "condition" },
      ],
      translation: "واردِ جاده شدن با چرخ‌های گِلیِ وسیله ممنوع است.",
      why: "درست است (قدم ۱). گلی که چرخ‌ها روی جاده می‌ریزند آن را لغزنده می‌کند (ماده‌ی ۱۵ حرفِ g).",
      rule: `${CDS("15")} c.1 lett. g`,
      conceptStep: 1,
    },
    {
      sourceId: "6851",
      textIt: "Su tutte le strade è vietato esercitarsi alla guida",
      answer: 0,
      chunks: [
        { it: TUTTE, fa: TUTTE_FA, focus: "always" },
        { it: "è vietato esercitarsi alla guida", fa: "تمرینِ رانندگی ممنوع است" },
      ],
      translation: "روی همه‌ی جاده‌ها تمرینِ رانندگی ممنوع است.",
      why: "غلط است (قدم ۲). با مجوز و همراهِ مجاز تمرین می‌شود؛ برای گواهینامه‌ی B تمرین در آزادراه یا جاده‌ی برون‌شهری حتی لازم است.",
      rule: `${CDS("122")} c.5-bis`,
      conceptStep: 2,
    },
    {
      sourceId: "6853",
      textIt: "Su tutte le strade è vietato il transito dei veicoli che superano 10 m di lunghezza",
      answer: 0,
      chunks: [
        { it: TUTTE, fa: TUTTE_FA, focus: "always" },
        { it: "è vietato il transito dei veicoli", fa: "عبورِ وسیله‌هایی ممنوع است" },
        { it: "che superano 10 m di lunghezza", fa: "که طولشان از ۱۰ متر بیشتر است", verb: "superano ← superare", focus: "limit" },
      ],
      translation: "روی همه‌ی جاده‌ها عبورِ وسیله‌هایی که طولشان از ۱۰ متر بیشتر است ممنوع است.",
      why: "غلط است (قدم ۲). یک خودرو تا ۱۲ متر مجاز است؛ محدودیتِ طول را فقط تابلو در جاده‌ای مشخص می‌گذارد.",
      rule: `${CDS("61")} c.1`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6847", "6848", "6849", "6850"] },
    { step: 2, sourceIds: ["6851", "6852", "6853", "6854"] },
  ],
};
