/**
 * src/content/ch20-provvedimenti.ts
 * Chapter 20 (Patente, punti e documenti), lessons 9–11: what can happen to a
 * licence. Four words the bank swaps on purpose:
 *   ritiro      the officer takes the card on the spot (art. 216, 218 c.1, 223)
 *   sospensione you may not drive for a set time (art. 129, 218; Prefetto)
 *   revisione   a new medical check and/or driving exam (art. 128; 126-bis c.6)
 *   revoca      the licence ends (art. 130, 219, 120; Prefetto or the ministry
 *               offices, never the police)
 *  L9  the map of the four, then immediate withdrawal.
 *  L10 suspension: its triggers, and what is something else.
 *  L11 revisione and revoca.
 *
 * Law newer than the 2023 bank, taught as context and never tested: art. 218-ter
 * (sospensione breve, L. 177/2024) and art. 142 c.8 (two 10–40 km/h excesses in
 * a built-up area within a year → 15–30 days). Under the latter #6295 ("can be
 * suspended at 20 km/h over", FALSO) is debatable; it stays mapped and is used
 * nowhere as practice. Trust rules as in src/content/lessons.ts.
 */
import type { Lesson } from "./lessons.js";

const ART = (n: string) => `Codice della Strada, art. ${n}`;

export const lessonRitiro: Lesson = {
  id: "patente-ritiro",
  titleFa: "چهار اتفاق برای گواهینامه، و گرفتنِ فوری",
  titleIt: "RITIRO · SOSPENSIONE · REVISIONE · REVOCA",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس چهار واژه را از هم جدا می‌کنی (گرفتنِ گواهینامه، تعلیق، بازآزمایی، ابطال) و می‌دانی پلیس کِی همان‌جا در جاده گواهینامه را از راننده می‌گیرد.",
      why:
        "۱۲ سؤال. بانک کنارِ دلیل‌های واقعیِ گرفتنِ فوری (تخلفی که تعلیق دارد، گواهینامه‌ی منقضی، مستی، تصادف با مصدوم) چیزهایی می‌گذارد که فقط جریمه‌اند: مدرکی که همراهت نیست، لاستیکِ نامناسب، مسافرِ مست، یا هر تخلفی که امتیاز کم می‌کند.",
      rule: `${ART("216")}, ${ART("218")} c.1, ${ART("223")}`,
    },
    {
      kind: "table",
      title: "چهار واژه، چهار معنا",
      body:
        "این چهار واژه در همه‌ی این فصل تکرار می‌شوند. هر جمله‌ی بانک یکی را جای دیگری می‌گذارد. قبل از هر چیز، معنایشان را از هم جدا کن:",
      columns: ["یعنی", "چه کسی", "بعدش"],
      rows: [
        { label: "گرفتنِ گواهینامه", it: "ritiro", values: ["پلیس همان‌جا کارت را می‌گیرد", "مأمورِ پلیس", "کارت را برای فرماندار می‌فرستد تا تصمیم بگیرد"] },
        { label: "تعلیق", it: "sospensione", values: ["مدتی حقِ رانندگی نداری", "فرماندار (Prefetto)؛ برای سلامت، اداره‌ی موتوریتزاتسیونه", "بعد از مدت گواهینامه برمی‌گردد (درس ۱۰)"] },
        { label: "بازآزمایی", it: "revisione", values: ["دوباره معاینه‌ی پزشکی و/یا آزمونِ مهارت", "اداره‌ی موتوریتزاتسیونه؛ گاهی فرماندار", "قبول: ادامه. رد: ابطال (درس ۱۱)"] },
        { label: "ابطال", it: "revoca", values: ["گواهینامه تمام می‌شود", "فرماندار یا اداره‌ی موتوریتزاتسیونه؛ هرگز پلیس", "باید از نو گواهینامه بگیری (درس ۱۱)"] },
      ],
      takeaway: "گرفتن = همین حالا. تعلیق = مدتی. بازآزمایی = دوباره ثابت کن. ابطال = تمام.",
      rule: `${ART("128")}, ${ART("129")}, ${ART("130")}, ${ART("216")}, ${ART("218")}, ${ART("219")}`,
    },
    {
      kind: "factors",
      title: "پلیس کِی همان‌جا گواهینامه را می‌گیرد",
      body:
        "پلیس گواهینامه را در جاده می‌گیرد وقتی پشتِ آن یک تصمیمِ جدی می‌آید: تخلفی که تعلیق دارد (مستی، سرعتِ بیش از ۴۰ بالای سقف…)، گواهینامه‌ی منقضی، تصادفی که مصدوم دارد، باری که بعد از تذکرِ پلیس هنوز درست نشده، یا کسی که بازآزمایی‌اش را سرِ وقت نرفته. مدرکی که همراهت نیست یا مشکلِ فنیِ خودرو گواهینامه را نمی‌گیرد؛ مشکلِ خودرو اگر جدی باشد، کارتِ خودرو را می‌گیرند، نه گواهینامه را.",
      columns: [
        {
          title: "همان‌جا گرفته می‌شود",
          items: [
            {
              fa: "تخلفی که تعلیقِ گواهینامه دارد",
              it: "violazione che comporti le sanzioni accessorie della sospensione della patente",
              sourceId: "6241",
              textIt: "La patente di guida viene immediatamente ritirata, durante la circolazione, a seguito di violazione che comporti le sanzioni accessorie della sospensione della patente",
              answer: 1,
            },
            {
              fa: "گواهینامه‌ی منقضی",
              it: "patente la cui validità è scaduta",
              sourceId: "6242",
              textIt: "La patente di guida viene immediatamente ritirata, durante la circolazione, quando si accerti che il conducente guida con patente la cui validità è scaduta",
              answer: 1,
            },
          ],
        },
        {
          title: "گرفته نمی‌شود",
          items: [
            {
              fa: "مسافرِ مست",
              it: "trasporta un passeggero in stato di ebbrezza",
              sourceId: "6247",
              textIt: "La patente di guida viene immediatamente ritirata, durante la circolazione, quando il conducente trasporta un passeggero in stato di ebbrezza",
              answer: 0,
            },
            {
              fa: "لاستیکِ اندازه‌ی دیگر",
              it: "pneumatici di dimensioni diverse",
              sourceId: "6249",
              textIt: "La patente di guida viene immediatamente ritirata, durante la circolazione, se si circola con pneumatici di dimensioni diverse da quelle riportate sulla carta di circolazione",
              answer: 0,
            },
            {
              fa: "کارتِ خودرو همراهت نیست",
              it: "senza avere con sé la carta di circolazione",
              sourceId: "6251",
              textIt: "La patente di guida viene immediatamente ritirata, durante la circolazione, quando il conducente circola senza avere con sé la carta di circolazione del veicolo",
              answer: 0,
            },
          ],
        },
      ],
      takeaway: "گرفتنِ فوری یعنی پشتش تعلیق، ابطال یا تصمیمِ فرماندار است. جریمه‌ی ساده یا مدرکِ جامانده نه.",
      rule: `${ART("126")} c.11, ${ART("128")} c.2, ${ART("164")}, ${ART("186")}, ${ART("216")}, ${ART("218")} c.1, ${ART("223")}`,
    },
    {
      kind: "classify",
      title: "پلیس همین حالا گواهینامه را می‌گیرد؟",
      body: "هر موقعیت را بخوان. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "ritiro immediato", fa: "بله، همین حالا" },
        { it: "no", fa: "نه" },
      ],
      items: [
        { prompt: "گواهینامه‌ات ماهِ پیش منقضی شده", answer: 0, explain: "گواهینامه‌ی منقضی همان‌جا گرفته می‌شود." },
        { prompt: "گواهینامه‌ات را در خانه جا گذاشته‌ای", answer: 1, explain: "فقط جریمه؛ باید بعداً نشانش بدهی." },
        { prompt: "تصادف کرده‌ای و یک نفر زخمی شده", answer: 0, explain: "تصادف با مصدوم: گواهینامه برای فرماندار فرستاده می‌شود." },
        { prompt: "با ۵۵ کیلومتر بالای سقف رانده‌ای", answer: 0, explain: "بیش از ۴۰ بالای سقف تعلیق دارد؛ پس همان‌جا گرفته می‌شود." },
        { prompt: "با ۱۵ کیلومتر بالای سقف رانده‌ای", answer: 1, explain: "جریمه و امتیاز؛ تعلیق ندارد." },
        { prompt: "دوستِ کنارت مست است، خودت نه", answer: 1, explain: "حالِ مسافر به گواهینامه‌ی تو ربطی ندارد." },
      ],
      takeaway: "بپرس: بعد از این، تعلیق یا تصمیمِ فرماندار می‌آید؟ اگر نه، گواهینامه پیشِ خودت می‌ماند.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il ritiro della patente", fa: "گرفتنِ گواهینامه (توسطِ پلیس)" },
        { it: "immediatamente", fa: "همان‌جا، فوری" },
        { it: "la sospensione della patente", fa: "تعلیقِ گواهینامه" },
        { it: "la revisione della patente", fa: "بازآزماییِ گواهینامه" },
        { it: "la revoca della patente", fa: "ابطالِ گواهینامه" },
        { it: "la sanzione accessoria", fa: "مجازاتِ تکمیلی (کنارِ جریمه)" },
        { it: "il prefetto", fa: "فرماندار (Prefetto)" },
        { it: "gli organi di polizia", fa: "پلیس" },
        { it: "lo stato di ebbrezza", fa: "مستی" },
        { it: "le lesioni a persone", fa: "آسیب به افراد" },
      ],
    },
    {
      kind: "trap",
      title: "«immediatamente ritirata»: تصادف با مصدوم آری، گواهینامه‌ی خارجی نه",
      body: "هر دو جمله با همان کلمه‌ها شروع می‌شوند. فقط دلیل فرق دارد:",
      examples: [
        {
          sourceId: "6245",
          textIt: "La patente di guida viene immediatamente ritirata, durante la circolazione, se a seguito di incidente, sono derivate lesioni a persone",
          answer: 1,
          chunks: [
            { it: "La patente di guida viene immediatamente ritirata,", fa: "گواهینامه همان‌جا گرفته می‌شود،", verb: "viene ritirata ← ritirare" },
            { it: "durante la circolazione,", fa: "در حینِ رانندگی،" },
            { it: "se a seguito di incidente,", fa: "اگر در پیِ تصادف،", focus: "condition" },
            { it: "sono derivate lesioni a persone", fa: "به افراد آسیب رسیده باشد", verb: "sono derivate ← derivare" },
          ],
          translation: "اگر در پیِ تصادف به افراد آسیب رسیده باشد، گواهینامه در حینِ رانندگی همان‌جا گرفته می‌شود.",
          why: "درست است. پلیس گواهینامه را می‌گیرد و برای فرماندار می‌فرستد تا درباره‌ی تعلیق تصمیم بگیرد.",
        },
        {
          sourceId: "6248",
          textIt: "La patente di guida viene immediatamente ritirata, durante la circolazione, quando il conducente circola in Italia con patente rilasciata da uno stato estero in cui è residente",
          answer: 0,
          chunks: [
            { it: "La patente di guida viene immediatamente ritirata,", fa: "گواهینامه همان‌جا گرفته می‌شود،", verb: "viene ritirata ← ritirare" },
            { it: "durante la circolazione,", fa: "در حینِ رانندگی،" },
            { it: "quando il conducente circola in Italia", fa: "وقتی راننده در ایتالیا رانندگی می‌کند", verb: "circola ← circolare", focus: "condition" },
            { it: "con patente rilasciata da uno stato estero in cui è residente", fa: "با گواهینامه‌ای که کشورِ خارجیِ محلِ اقامتش صادر کرده" },
          ],
          translation: "وقتی راننده در ایتالیا با گواهینامه‌ای رانندگی می‌کند که کشورِ خارجیِ محلِ اقامتش صادر کرده، گواهینامه در حینِ رانندگی همان‌جا گرفته می‌شود.",
          why: "غلط است. کسی که مقیمِ خارج است می‌تواند با گواهینامه‌ی کشورِ خودش در ایتالیا براند؛ تخلفی نیست.",
        },
      ],
      takeaway: "اول بپرس: این اصلاً تخلف است؟ بعد: تعلیق یا تصمیمِ فرماندار پشتش هست؟",
      rule: `${ART("135")}, ${ART("223")} c.2`,
    },
  ],
  practice: [
    {
      sourceId: "6243",
      textIt: "La patente di guida viene immediatamente ritirata, durante la circolazione, quando il conducente sia alla guida in stato di ebbrezza",
      answer: 1,
      chunks: [
        { it: "La patente di guida viene immediatamente ritirata,", fa: "گواهینامه همان‌جا گرفته می‌شود،", verb: "viene ritirata ← ritirare" },
        { it: "durante la circolazione,", fa: "در حینِ رانندگی،" },
        { it: "quando il conducente sia alla guida in stato di ebbrezza", fa: "وقتی راننده در حالِ مستی رانندگی کند", verb: "sia ← essere", focus: "condition" },
      ],
      translation: "وقتی راننده در حالِ مستی رانندگی کند، گواهینامه در حینِ رانندگی همان‌جا گرفته می‌شود.",
      why: "درست است (قدم ۲). مستی تعلیق دارد، پس پلیس گواهینامه را همان‌جا می‌گیرد.",
      rule: `${ART("186")}, ${ART("218")} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "6244",
      textIt: "La patente di guida viene immediatamente ritirata, durante la circolazione, se il conducente non sistema correttamente il carico mal disposto, dopo invito degli organi di polizia",
      answer: 1,
      chunks: [
        { it: "La patente di guida viene immediatamente ritirata,", fa: "گواهینامه همان‌جا گرفته می‌شود،", verb: "viene ritirata ← ritirare" },
        { it: "durante la circolazione,", fa: "در حینِ رانندگی،" },
        { it: "se il conducente non sistema correttamente il carico mal disposto,", fa: "اگر راننده بارِ بدچیده را درست نکند،", verb: "sistema ← sistemare", focus: "negation" },
        { it: "dopo invito degli organi di polizia", fa: "بعد از تذکرِ پلیس", focus: "condition" },
      ],
      translation: "اگر راننده بعد از تذکرِ پلیس بارِ بدچیده را درست نکند، گواهینامه در حینِ رانندگی همان‌جا گرفته می‌شود.",
      why: "درست است (قدم ۲). اول تذکر؛ اگر بار درست نشود، گواهینامه گرفته می‌شود تا خطر برطرف شود.",
      rule: ART("164"),
      conceptStep: 2,
    },
    {
      sourceId: "6250",
      textIt: "La patente di guida viene immediatamente ritirata, durante la circolazione, tutte le volte che il conducente commette una violazione che comporta una decurtazione di punti dalla patente",
      answer: 0,
      chunks: [
        { it: "La patente di guida viene immediatamente ritirata,", fa: "گواهینامه همان‌جا گرفته می‌شود،", verb: "viene ritirata ← ritirare" },
        { it: "durante la circolazione,", fa: "در حینِ رانندگی،" },
        { it: "tutte le volte che il conducente commette una violazione", fa: "هر بار که راننده تخلفی می‌کند", verb: "commette ← commettere", focus: "always" },
        { it: "che comporta una decurtazione di punti dalla patente", fa: "که امتیازِ گواهینامه را کم می‌کند", verb: "comporta ← comportare" },
      ],
      translation: "هر بار که راننده تخلفی می‌کند که امتیازِ گواهینامه را کم می‌کند، گواهینامه در حینِ رانندگی همان‌جا گرفته می‌شود.",
      why: "غلط است (قدم ۲). بیشترِ تخلف‌های امتیازدار فقط جریمه و کم شدنِ امتیازند؛ گرفتنِ فوری برای تخلف‌هایی است که تعلیق دارند.",
      rule: `${ART("126-bis")}, ${ART("218")} c.1`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 2, sourceIds: ["6241", "6242", "6243", "6244", "6245", "6246", "6247", "6248", "6249", "6250", "6251", "6252"] },
  ],
};

export const lessonSospensione: Lesson = {
  id: "patente-sospensione",
  titleFa: "تعلیقِ گواهینامه: کِی، و کِی نه",
  titleIt: "SOSPENSIONE DELLA PATENTE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی تعلیق مجازاتی موقت است که فرماندار برای تخلف‌های مشخص و جدی می‌دهد، فهرستِ اصلیِ آن‌ها را بلدی، و جمله‌هایی را که ابطال، بازآزمایی یا فقط جریمه را «تعلیق» می‌نامند تشخیص می‌دهی.",
      why:
        "۲۱ سؤال. نیمی از جمله‌ها دلیلِ واقعیِ تعلیق‌اند. نیمِ دیگر اتفاقِ دیگری را تعلیق نامیده‌اند: رانندگی با گواهینامه‌ی تعلیق‌شده (ابطال!)، از دست دادنِ همیشگیِ سلامت (ابطال)، شک به سلامت یا صفر شدنِ امتیاز (بازآزمایی)، یا مدرکِ همراه نداشتن (فقط جریمه).",
      rule: `${ART("129")}, ${ART("218")}`,
    },
    {
      kind: "table",
      title: "این‌ها تعلیق دارند",
      body:
        "تعلیق «مجازاتِ تکمیلی» است: کنارِ جریمه می‌آید، برای تخلف‌هایی که خودِ قانون گفته. فرماندار مدتش را تعیین می‌کند و بعد گواهینامه برمی‌گردد.",
      columns: ["تعلیق"],
      rows: [
        { label: "قاعده‌های تازه‌کار", it: "neopatentato · limiti", values: ["تازه‌کاری که سقفِ سرعت یا توانِ خودرو را رعایت نکند: ۲ تا ۸ ماه."] },
        { label: "سرعت", it: "oltre 40 km/h", values: ["بیش از ۴۰ کیلومتر بالای سقف: ۱ تا ۳ ماه؛ بیش از ۶۰: ۶ تا ۱۲ ماه."] },
        { label: "خطِ اضطراری", it: "corsia di emergenza", values: ["حرکت در خطِ اضطراریِ آزادراه بی‌دلیلِ مجاز: ۲ تا ۶ ماه."] },
        { label: "الکل و مواد", it: "ebbrezza · stupefacenti · rifiuto", values: ["رانندگی در مستی یا زیرِ اثرِ مواد، و حتی رد کردنِ آزمایش."] },
        { label: "فرار", it: "fuga senza prestare soccorso", values: ["فرار بی‌کمک به کسی که زیر گرفته‌ای."] },
        { label: "خودروی توقیفی", it: "veicolo sottoposto a sequestro", values: ["راندنِ خودرویی که توقیف شده."] },
        { label: "مدرکِ بیمه‌ی جعلی", it: "documenti assicurativi falsificati", values: ["جعل یا دست‌کاریِ مدارکِ بیمه."] },
      ],
      takeaway:
        "تعلیق = تخلفِ جدیِ مشخص، مدتِ مشخص، تصمیمِ فرماندار. قانونِ تازه‌تر از بانک (۲۰۲۴) دو مورد اضافه کرده که بانک نمی‌پرسد: «تعلیقِ کوتاه» ۷ روزه (زیرِ ۲۰ امتیاز) یا ۱۵ روزه (زیرِ ۱۰ امتیاز) وقتی یکی از تخلف‌های فهرستش (مثلِ کمربند، کلاه، تلفن) را انجام دهی، و ۱۵ تا ۳۰ روز برای دو بار سرعتِ ۱۰ تا ۴۰ بالای سقف در آبادی در یک سال.",
      rule: `${ART("117")} c.5, ${ART("142")} c.8–9-bis, ${ART("176")} c.22, ${ART("186")}, ${ART("187")}, ${ART("189")}, ${ART("213")}, ${ART("218-ter")}`,
    },
    {
      kind: "table",
      title: "این‌ها تعلیق نیستند",
      body:
        "هر جمله‌ای که «تعلیق» می‌گوید را با این جدول بسنج. اگر مورد این‌جاست، جمله غلط است:",
      columns: ["در واقع چه می‌شود"],
      rows: [
        { label: "رانندگی با گواهینامه‌ی تعلیق‌شده", it: "circola con patente sospesa", values: ["ابطال، نه تعلیقِ دوباره."] },
        { label: "از دست دادنِ همیشگیِ سلامت", it: "perde definitivamente i requisiti fisici", values: ["ابطال."] },
        { label: "شرایطِ اخلاقی", it: "requisiti morali", values: ["ابطال توسطِ فرماندار."] },
        { label: "شک به سلامت یا مهارت", it: "dubbi sulla persistenza dei requisiti", values: ["بازآزمایی."] },
        { label: "صفر شدنِ امتیاز", it: "azzeramento dei punti", values: ["بازآزمایی؛ تعلیق فقط اگر سرِ آزمون نروی."] },
        { label: "۲۰ کیلومتر بالای سقف", it: "20 km/h", values: ["جریمه و امتیاز. (بانک این را همیشه FALSO می‌داند؛ قانونِ تازه تکرارش در آبادی را تعلیق کرده.)"] },
        { label: "مدرک، پارک، مالیات", it: "senza patente · illeggibile · triangolo · disabili · bollo", values: ["گواهینامه همراه نیست، ناخواناست، مثلث را نشان نمی‌دهی، پارک در جای معلولان، مالیاتِ پرداخت‌نشده: جریمه (پارکِ معلولان امتیاز هم دارد)، تعلیق نه."] },
      ],
      takeaway: "رانندگی با گواهینامه‌ی تعلیق‌شده = ابطال. سلامت: موقت = تعلیق، همیشگی = ابطال، شک = بازآزمایی.",
      rule: `${ART("120")}, ${ART("126-bis")} c.6, ${ART("128")}, ${ART("130")}, ${ART("158")}, ${ART("180")}, ${ART("218")} c.6`,
    },
    {
      kind: "classify",
      title: "تعلیق، اتفاقِ دیگر، یا فقط جریمه؟",
      body: "هر مورد را بخوان. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "sospensione", fa: "تعلیق" },
        { it: "revoca o revisione", fa: "ابطال یا بازآزمایی" },
        { it: "solo multa (ed eventuali punti)", fa: "فقط جریمه (و شاید امتیاز)" },
      ],
      items: [
        { prompt: "رانندگی در مستی", answer: 0, explain: "مستی تعلیق دارد." },
        { prompt: "رانندگی در دوره‌ی تعلیق", answer: 1, explain: "ابطال." },
        { prompt: "امتیازت صفر شد", answer: 1, explain: "بازآزمایی." },
        { prompt: "پارک در جای خودروی معلولان", answer: 2, explain: "جریمه و امتیاز، تعلیق نه." },
        { prompt: "۷۰ کیلومتر بالای سقفِ سرعت", answer: 0, explain: "بیش از ۶۰: ۶ تا ۱۲ ماه تعلیق." },
        { prompt: "مالیاتِ خودرو را سرِ وقت ندادی", answer: 2, explain: "مسئله‌ی مالیاتی است، نه رانندگی." },
      ],
      takeaway: "سه سؤال: تخلفِ جدیِ مشخص؟ (تعلیق) سلامت یا رانندگی در تعلیق؟ (ابطال/بازآزمایی) وگرنه جریمه.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "disporre la sospensione", base: "disporre", fa: "تعلیق را حکم کردن" },
        { it: "la patente sospesa", fa: "گواهینامه‌ی تعلیق‌شده" },
        { it: "rifiutare gli accertamenti", base: "rifiutare", fa: "آزمایش را رد کردن" },
        { it: "fuggire senza prestare soccorso", base: "fuggire", fa: "فرار بی‌کمک کردن" },
        { it: "il veicolo sottoposto a sequestro", fa: "خودروی توقیف‌شده" },
        { it: "falsificare, contraffare", base: "falsificare", fa: "جعل کردن" },
        { it: "i requisiti morali", fa: "شرایطِ اخلاقی" },
        { it: "illeggibile, deteriorata", fa: "ناخوانا، فرسوده" },
      ],
    },
    {
      kind: "trap",
      title: "«la sospensione è disposta quando»: سرعتِ ۴۰+ آری، جای معلولان نه",
      body: "هر دو جمله با همان کلمه‌ها شروع می‌شوند و هر دو تخلف‌اند. فقط یکی تعلیق دارد:",
      examples: [
        {
          sourceId: "6283",
          textIt: "La sospensione della patente è disposta quando si superano di oltre 40 km/h i limiti massimi di velocità",
          answer: 1,
          chunks: [
            { it: "La sospensione della patente è disposta", fa: "تعلیقِ گواهینامه حکم می‌شود", verb: "è disposta ← disporre" },
            { it: "quando si superano di oltre 40 km/h", fa: "وقتی بیش از ۴۰ کیلومتر بر ساعت بالاتر می‌روی", verb: "si superano ← superare", focus: "limit" },
            { it: "i limiti massimi di velocità", fa: "از سقفِ سرعت" },
          ],
          translation: "وقتی بیش از ۴۰ کیلومتر بر ساعت از سقفِ سرعت بالاتر می‌روی، تعلیقِ گواهینامه حکم می‌شود.",
          why: "درست است. بیش از ۴۰ بالای سقف: ۱ تا ۳ ماه تعلیق.",
        },
        {
          sourceId: "6300",
          textIt: "La sospensione della patente è disposta quando si lascia il veicolo in sosta negli spazi destinati ai disabili",
          answer: 0,
          chunks: [
            { it: "La sospensione della patente è disposta", fa: "تعلیقِ گواهینامه حکم می‌شود", verb: "è disposta ← disporre" },
            { it: "quando si lascia il veicolo in sosta", fa: "وقتی خودرو را پارک می‌کنی", verb: "si lascia ← lasciare", focus: "condition" },
            { it: "negli spazi destinati ai disabili", fa: "در جاهای مخصوصِ معلولان" },
          ],
          translation: "وقتی خودرو را در جاهای مخصوصِ معلولان پارک می‌کنی، تعلیقِ گواهینامه حکم می‌شود.",
          why: "غلط است. جریمه‌ی سنگین دارد و امتیاز کم می‌کند (فصلِ ۱۶)، ولی تعلیق نه.",
        },
      ],
      takeaway: "«تخلفِ بد» همیشه به معنای تعلیق نیست. فهرستِ تعلیق را بلد باش.",
      rule: `${ART("142")} c.9, ${ART("158")} c.2 lett. g`,
    },
  ],
  practice: [
    {
      sourceId: "6282",
      textIt: "La sospensione della patente è disposta, ad esempio, quando il neopatentato circola senza rispettare le limitazioni sui veicoli e sulle velocità",
      answer: 1,
      chunks: [
        { it: "La sospensione della patente è disposta,", fa: "تعلیقِ گواهینامه حکم می‌شود،", verb: "è disposta ← disporre" },
        { it: "ad esempio,", fa: "برای مثال،" },
        { it: "quando il neopatentato circola", fa: "وقتی راننده‌ی تازه‌کار رانندگی می‌کند", verb: "circola ← circolare", focus: "condition" },
        { it: "senza rispettare le limitazioni sui veicoli e sulle velocità", fa: "بی‌آن‌که محدودیت‌های خودرو و سرعت را رعایت کند", focus: "negation" },
      ],
      translation: "برای مثال، وقتی راننده‌ی تازه‌کار بی‌آن‌که محدودیت‌های خودرو و سرعت را رعایت کند رانندگی می‌کند، تعلیقِ گواهینامه حکم می‌شود.",
      why: "درست است (قدم ۱). قاعده‌های تازه‌کار (سقفِ سرعت و توان) را رعایت نکنی: ۲ تا ۸ ماه تعلیق.",
      rule: `${ART("117")} c.5`,
      conceptStep: 1,
    },
    {
      sourceId: "6287",
      textIt: "La sospensione della patente è disposta quando il conducente rifiuta di sottoporsi agli accertamenti sul suo eventuale stato di ebbrezza alcolica",
      answer: 1,
      chunks: [
        { it: "La sospensione della patente è disposta", fa: "تعلیقِ گواهینامه حکم می‌شود", verb: "è disposta ← disporre" },
        { it: "quando il conducente rifiuta di sottoporsi agli accertamenti", fa: "وقتی راننده آزمایش را رد می‌کند", verb: "rifiuta ← rifiutare", focus: "condition" },
        { it: "sul suo eventuale stato di ebbrezza alcolica", fa: "درباره‌ی مستیِ احتمالی‌اش" },
      ],
      translation: "وقتی راننده آزمایشِ مستیِ احتمالی‌اش را رد می‌کند، تعلیقِ گواهینامه حکم می‌شود.",
      why: "درست است (قدم ۱). رد کردنِ آزمایش مثلِ مستی تعلیق دارد؛ وگرنه همه رد می‌کردند.",
      rule: `${ART("186")} c.7`,
      conceptStep: 1,
    },
    {
      sourceId: "6291",
      textIt: "La sospensione della patente è disposta quando il conducente circola con patente sospesa",
      answer: 0,
      chunks: [
        { it: "La sospensione della patente è disposta", fa: "تعلیقِ گواهینامه حکم می‌شود", verb: "è disposta ← disporre" },
        { it: "quando il conducente circola con patente sospesa", fa: "وقتی راننده با گواهینامه‌ی تعلیق‌شده رانندگی می‌کند", verb: "circola ← circolare", focus: "condition" },
      ],
      translation: "وقتی راننده با گواهینامه‌ی تعلیق‌شده رانندگی می‌کند، تعلیقِ گواهینامه حکم می‌شود.",
      why: "غلط است (قدم ۲). رانندگی در دوره‌ی تعلیق ابطالِ گواهینامه دارد، نه یک تعلیقِ دیگر.",
      rule: `${ART("218")} c.6`,
      conceptStep: 2,
    },
    {
      sourceId: "6294",
      textIt: "La sospensione della patente è disposta contestualmente alla comunicazione di azzeramento dei punti",
      answer: 0,
      chunks: [
        { it: "La sospensione della patente è disposta", fa: "تعلیقِ گواهینامه حکم می‌شود", verb: "è disposta ← disporre" },
        { it: "contestualmente alla comunicazione", fa: "هم‌زمان با اعلامِ", focus: "condition" },
        { it: "di azzeramento dei punti", fa: "صفر شدنِ امتیازها" },
      ],
      translation: "تعلیقِ گواهینامه هم‌زمان با اعلامِ صفر شدنِ امتیازها حکم می‌شود.",
      why: "غلط است (قدم ۲). صفر شدنِ امتیاز بازآزمایی می‌آورد؛ تعلیق فقط اگر ظرفِ ۳۰ روز سرِ آزمون نروی.",
      rule: `${ART("126-bis")} c.6`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6281", "6282", "6283", "6284", "6285", "6286", "6287", "6288", "6289", "6290"] },
    {
      step: 2,
      sourceIds: ["6291", "6292", "6293", "6294", "6295", "6296", "6297", "6298", "6299", "6300", "6301"],
    },
  ],
};

export const lessonRevisioneRevoca: Lesson = {
  id: "patente-revisione-revoca",
  titleFa: "بازآزمایی و ابطالِ گواهینامه",
  titleIt: "REVISIONE E REVOCA DELLA PATENTE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی بازآزمایی یعنی «دوباره ثابت کن که هنوز می‌توانی» (معاینه و/یا آزمون) و ابطال یعنی «گواهینامه تمام شد»، چه کسی هر کدام را حکم می‌کند، و چه اتفاق‌هایی به هر کدام می‌رسند.",
      why:
        "۲۸ سؤال. جفتِ کلیدی: سلامتِ «موقت» از دست برود = تعلیق، «همیشگی» = ابطال، «شک» به آن = بازآزمایی. و: پلیس هیچ‌وقت ابطال نمی‌کند. بقیه‌ی جمله‌های غلط ماجراهای کاغذی‌اند (معاینه‌ی فنیِ خودرو، خودروی کلاسیک، خودروی دیگران، گواهینامه‌ی همراه‌نبوده).",
      rule: `${ART("128")}, ${ART("130")}, ${ART("219")}`,
    },
    {
      kind: "table",
      title: "بازآزمایی: دوباره ثابت کن",
      body:
        "بازآزمایی برای وقتی است که شک هست راننده هنوز سالم یا ماهر است. اداره‌ی موتوریتزاتسیونه حکمش می‌کند؛ در پرونده‌های مستی و مواد، فرماندار. نتیجه یا ادامه است یا ابطال.",
      columns: ["بازآزمایی"],
      rows: [
        { label: "چرا", it: "dubbi sui requisiti fisici e psichici o sull'idoneità tecnica", values: ["شک به شرایطِ جسمی و روانی، یا به مهارتِ رانندگی."] },
        { label: "چه کسی", it: "Motorizzazione civile o Prefetto", values: ["اداره‌ی موتوریتزاتسیونه، یا فرماندار (مستی، مواد)."] },
        { label: "چطور", it: "visita medica e/o esame di idoneità tecnica", values: ["معاینه‌ی پزشکی و/یا آزمونِ مهارت."] },
        { label: "کِی حتماً", it: "incidente con lesioni gravi · azzeramento dei punti", values: ["تصادف با آسیبِ جدی به افراد (با تخلفی که تعلیق دارد)؛ صفر شدنِ امتیاز؛ سه تخلفِ دست‌کم ۵ امتیازی در ۱۲ ماه (اولی و دو تای بعد، نه «دو بار»)."] },
        { label: "سرِ آزمون نروی", it: "mancata presentazione", values: ["گواهینامه تعلیق می‌شود تا وقتی بروی و قبول شوی."] },
        { label: "رد شوی", it: "esito sfavorevole", values: ["ابطال. نه «دو بارِ دیگر در یک سال با مجوزِ موقت»."] },
        { label: "نه برای این‌ها", it: "requisiti morali · revisione del veicolo · auto storica · veicolo altrui", values: ["شرایطِ اخلاقی (ابطال)، از دست دادنِ همیشگیِ سلامت (ابطال)، معاینه‌ی فنیِ خودرو، خودروی کلاسیک بی‌مدرک، خودروی دیگران، گواهینامه‌ی همراه‌نبوده."] },
      ],
      takeaway: "بازآزمایی = شک → معاینه و/یا آزمون. قبول: ادامه. رد: ابطال.",
      rule: `${ART("126-bis")} c.6, ${ART("128")} c.1–2, ${ART("130")} c.1 lett. b`,
    },
    {
      kind: "table",
      title: "ابطال: گواهینامه تمام می‌شود",
      body:
        "ابطال پایانِ گواهینامه است؛ برای رانندگی باید از نو گواهینامه بگیری. فرماندار (به‌عنوانِ مجازات) یا اداره‌های وزارت (برای سلامت) حکمش می‌کنند. پلیس فقط گزارش می‌دهد.",
      columns: ["ابطال؟"],
      rows: [
        { label: "رانندگی در دوره‌ی تعلیق", it: "guida con patente sospesa", values: ["بله."] },
        { label: "دور زدن یا خلاف‌جهت در آزادراه", it: "inversione o contromano in autostrada", values: ["بله (فصلِ ۱۷)."] },
        { label: "از دست دادنِ همیشگیِ سلامت", it: "perdita permanente dei requisiti fisici o psichici", values: ["بله. موقت باشد: تعلیق."] },
        { label: "جایگزینی با گواهینامه‌ی خارجی", it: "sostituita con patente estera", values: ["بله؛ گواهینامه‌ی ایتالیایی‌ات را با یک خارجی عوض کرده‌ای."] },
        { label: "ردی در بازآزمایی", it: "non idoneo alla revisione", values: ["بله."] },
        { label: "منقضی یا همراه نبودن", it: "patente scaduta · senza averla con sé", values: ["نه؛ جریمه (و برای منقضی، گرفتنِ گواهینامه تا تمدید)."] },
        { label: "عینک نزدن", it: "senza lenti prescritte", values: ["نه؛ جریمه و امتیاز."] },
        { label: "خودروی دیگران", it: "veicolo intestato ad altri", values: ["نه؛ اصلاً تخلف نیست (درس ۱)."] },
      ],
      takeaway: "ابطال: رانندگی در تعلیق، خلاف‌جهت در آزادراه، سلامتِ از دست‌رفته‌ی همیشگی، گواهینامه‌ی خارجی، ردی در بازآزمایی. هرگز توسطِ پلیس.",
      rule: `${ART("130")} c.1, ${ART("176")} c.22, ${ART("218")} c.6, ${ART("219")}`,
    },
    {
      kind: "classify",
      title: "کدام اتفاق؟",
      body: "هر مورد را بخوان و پیامدش را انتخاب کن. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "sospensione", fa: "تعلیق" },
        { it: "revisione", fa: "بازآزمایی" },
        { it: "revoca", fa: "ابطال" },
        { it: "solo multa", fa: "فقط جریمه" },
      ],
      items: [
        { prompt: "چند ماه بعد از سکته، پزشک می‌گوید دید تا بهبود کم است", answer: 0, explain: "از دست دادنِ موقتِ سلامت: تعلیق تا بهبود." },
        { prompt: "بیماری‌ای که دید را برای همیشه گرفته", answer: 2, explain: "همیشگی: ابطال." },
        { prompt: "اداره شک دارد هنوز می‌توانی خوب برانی", answer: 1, explain: "شک: بازآزمایی." },
        { prompt: "در آزمونِ بازآزمایی رد شدی", answer: 2, explain: "رد: ابطال." },
        { prompt: "در آزادراه خلاف‌جهت رانده‌ای", answer: 2, explain: "ابطال." },
        { prompt: "گواهینامه را در خانه جا گذاشته‌ای", answer: 3, explain: "فقط جریمه." },
      ],
      takeaway: "سلامت: موقت → تعلیق، شک → بازآزمایی، همیشگی → ابطال.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la revisione della patente", fa: "بازآزماییِ گواهینامه" },
        { it: "la revoca della patente", fa: "ابطالِ گواهینامه" },
        { it: "l’Ufficio Motorizzazione civile", fa: "اداره‌ی موتوریتزاتسیونه (Motorizzazione)" },
        { it: "l’idoneità tecnica", fa: "مهارتِ رانندگی" },
        { it: "l’esame di idoneità tecnica", fa: "آزمونِ مهارت" },
        { it: "la visita medica", fa: "معاینه‌ی پزشکی" },
        { it: "permanentemente / temporaneamente", fa: "همیشگی / موقت" },
        { it: "le lesioni gravi", fa: "آسیبِ جدی" },
        { it: "invertire il senso di marcia", base: "invertire", fa: "دور زدن" },
        { it: "contromano", fa: "خلاف‌جهت" },
      ],
    },
    {
      kind: "trap",
      title: "«perde … i requisiti fisici»: همیشگی آری، موقت نه",
      body: "هر دو جمله درباره‌ی ابطال به خاطرِ سلامت است. یک کلمه فرق دارد:",
      examples: [
        {
          sourceId: "6271",
          textIt: "La revoca della patente è disposta quando il titolare perde permanentemente (per sempre) i requisiti fisici richiesti",
          answer: 1,
          chunks: [
            { it: "La revoca della patente è disposta", fa: "ابطالِ گواهینامه حکم می‌شود", verb: "è disposta ← disporre" },
            { it: "quando il titolare perde permanentemente (per sempre)", fa: "وقتی دارنده برای همیشه از دست می‌دهد", verb: "perde ← perdere", focus: "always" },
            { it: "i requisiti fisici richiesti", fa: "شرایطِ جسمیِ لازم را" },
          ],
          translation: "وقتی دارنده شرایطِ جسمیِ لازم را برای همیشه از دست می‌دهد، ابطالِ گواهینامه حکم می‌شود.",
          why: "درست است. از دست دادنِ همیشگی: ابطال.",
        },
        {
          sourceId: "6277",
          textIt: "La revoca della patente è disposta quando il conducente perde temporaneamente i requisiti fisici",
          answer: 0,
          chunks: [
            { it: "La revoca della patente è disposta", fa: "ابطالِ گواهینامه حکم می‌شود", verb: "è disposta ← disporre" },
            { it: "quando il conducente perde temporaneamente", fa: "وقتی راننده به طورِ موقت از دست می‌دهد", verb: "perde ← perdere", focus: "limit" },
            { it: "i requisiti fisici", fa: "شرایطِ جسمی را" },
          ],
          translation: "وقتی راننده شرایطِ جسمی را به طورِ موقت از دست می‌دهد، ابطالِ گواهینامه حکم می‌شود.",
          why: "غلط است. از دست دادنِ موقت تعلیق می‌آورد، تا وقتی سلامت برگردد؛ ابطال نه.",
        },
      ],
      takeaway: "در جمله‌های سلامت دنبالِ یک کلمه بگرد: permanentemente (ابطال) یا temporaneamente (تعلیق).",
      rule: `${ART("129")} c.2, ${ART("130")} c.1 lett. a`,
    },
  ],
  practice: [
    {
      sourceId: "6254",
      textIt: "La revisione della patente di guida può essere disposta dall’Ufficio Motorizzazione civile o dal Prefetto",
      answer: 1,
      chunks: [
        { it: "La revisione della patente di guida", fa: "بازآزماییِ گواهینامه" },
        { it: "può essere disposta", fa: "می‌تواند حکم شود", verb: "può ← potere" },
        { it: "dall’Ufficio Motorizzazione civile o dal Prefetto", fa: "توسطِ اداره‌ی موتوریتزاتسیونه یا فرماندار" },
      ],
      translation: "بازآزماییِ گواهینامه را اداره‌ی موتوریتزاتسیونه یا فرماندار می‌تواند حکم کند.",
      why: "درست است (قدم ۱). معمولاً اداره‌ی موتوریتزاتسیونه؛ در پرونده‌های مستی و مواد، فرماندار.",
      rule: `${ART("128")} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "6261",
      textIt: "La revisione della patente di guida può essere disposta quando il titolare non è più in possesso dei requisiti morali richiesti",
      answer: 0,
      chunks: [
        { it: "La revisione della patente di guida", fa: "بازآزماییِ گواهینامه" },
        { it: "può essere disposta", fa: "می‌تواند حکم شود", verb: "può ← potere" },
        { it: "quando il titolare non è più in possesso", fa: "وقتی دارنده دیگر ندارد", verb: "è ← essere", focus: "negation" },
        { it: "dei requisiti morali richiesti", fa: "شرایطِ اخلاقیِ لازم را" },
      ],
      translation: "وقتی دارنده دیگر شرایطِ اخلاقیِ لازم را ندارد، بازآزماییِ گواهینامه می‌تواند حکم شود.",
      why: "غلط است (قدم ۱). بازآزمایی برای سلامت و مهارت است. از دست رفتنِ شرایطِ اخلاقی ابطالِ گواهینامه توسطِ فرماندار است.",
      rule: `${ART("120")} c.2, ${ART("128")}`,
      conceptStep: 1,
    },
    {
      sourceId: "6269",
      textIt: "La revoca della patente è disposta quando il titolare guida nonostante abbia la patente sospesa",
      answer: 1,
      chunks: [
        { it: "La revoca della patente è disposta", fa: "ابطالِ گواهینامه حکم می‌شود", verb: "è disposta ← disporre" },
        { it: "quando il titolare guida", fa: "وقتی دارنده رانندگی می‌کند", verb: "guida ← guidare", focus: "condition" },
        { it: "nonostante abbia la patente sospesa", fa: "با این‌که گواهینامه‌اش تعلیق شده", verb: "abbia ← avere", focus: "contrast" },
      ],
      translation: "وقتی دارنده با این‌که گواهینامه‌اش تعلیق شده رانندگی می‌کند، ابطالِ گواهینامه حکم می‌شود.",
      why: "درست است (قدم ۲). رانندگی در دوره‌ی تعلیق: ابطال.",
      rule: `${ART("218")} c.6`,
      conceptStep: 2,
    },
    {
      sourceId: "6279",
      textIt: "La revoca della patente può essere disposta dagli organi di polizia",
      answer: 0,
      chunks: [
        { it: "La revoca della patente", fa: "ابطالِ گواهینامه" },
        { it: "può essere disposta", fa: "می‌تواند حکم شود", verb: "può ← potere" },
        { it: "dagli organi di polizia", fa: "توسطِ پلیس" },
      ],
      translation: "ابطالِ گواهینامه را پلیس می‌تواند حکم کند.",
      why: "غلط است (قدم ۲). پلیس فقط گزارش می‌دهد و گواهینامه را می‌گیرد. ابطال را فرماندار یا اداره‌های وزارت حکم می‌کنند.",
      rule: `${ART("130")}, ${ART("219")} c.2`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: ["6253", "6254", "6255", "6256", "6257", "6258", "6259", "6260", "6261", "6262", "6263", "6264", "6265", "6266", "6267", "6268"],
    },
    { step: 2, sourceIds: ["6269", "6270", "6271", "6272", "6273", "6274", "6275", "6276", "6277", "6278", "6279", "6280"] },
  ],
};
