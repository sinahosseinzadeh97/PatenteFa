/**
 * src/content/ch24-rumore.ts
 * Chapter 24 (Consumi, ambiente e inquinamento), lessons 7–8: noise
 * (bank groups 613–616).
 *
 *  L7 where vehicle noise comes from (exhaust, brakes, tyres, a bouncing empty
 *     trailer; not only the engine) and the silencer law: efficient, approved,
 *     never drilled, shortened or narrowed.
 *  L8 noise from how you drive (hard braking and acceleration, revving at a
 *     standstill, slammed doors) and the horn (art. 156: moderation, safety
 *     only, banned in built-up areas except immediate danger; flashing
 *     headlights at night, or by day when needed; transport of the injured).
 *
 * Chapter 13 (load), chapter 17 (trailers) and chapter 18 (flashing headlights)
 * are linked by lesson title. Trust rules as in src/content/lessons.ts;
 * tests/chapter24.test.ts.
 */
import type { Lesson } from "./lessons.js";
import { CDS, CHOICES, COMPARE, GUIDA_CO2, MANUALE, TECNICA } from "./ch24-common.js";

const CDS_155 = `${CDS("155")} (limitazione dei rumori)`;
const CDS_156 = `${CDS("156")} (dispositivi di segnalazione acustica)`;
const RUM = "Per diminuire il rumore emesso dai veicoli a motore";
const RUM_FA = "برای کم کردنِ صدای وسیله‌های موتوری،";
const EVI = "Per evitare rumori fastidiosi durante la guida,";
const EVI_FA = "برای جلوگیری از صدای مزاحم هنگامِ رانندگی،";

export const lessonRumoreVeicolo: Lesson = {
  id: "rumore-del-veicolo",
  titleFa: "صدای خودرو از کجا می‌آید",
  titleIt: "RUMORE: SILENZIATORE · FRENI · PNEUMATICI · CARICO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی صدای خودرو فقط از موتور نیست: اگزوز، ترمز، لاستیک و بارِ لق هم صدا می‌سازند. و می‌دانی قانون درباره‌ی صداخفه‌کن چه می‌گوید: سالم، از نوعِ تأییدشده، و هیچ‌وقت سوراخ، کوتاه یا باریک‌شده.",
      why:
        "۱۲ سؤال. جمله‌ی غلط یا صدا را فقط کارِ موتور می‌داند، یا راهِ «کم کردنِ صدا» را خراب کردنِ اگزوز معرفی می‌کند: «سوراخش کن»، «انتهایش را بِبُر»، «لوله‌ی باریک‌تر بگذار».",
      rule: CDS_155,
    },
    {
      kind: "table",
      title: "منبع‌های صدا",
      body:
        "قانون می‌خواهد صدای مزاحم نسازی: نه با شیوه‌ی رانندگی، نه با بارِ بد بسته، نه با هر کارِ دیگری در رفت‌وآمد (ماده‌ی ۱۵۵). صدا این منبع‌ها را دارد:",
      columns: ["چرا صدا می‌سازد", "چه کنی"],
      rows: [
        { label: "صداخفه‌کن (اگزوز)", it: "il silenziatore (marmitta)", values: ["هرچه فرسوده‌تر، صدا بیشتر", "مرتب بدهی بررسی کنند و سالم نگهش دار"] },
        { label: "ترمزِ صدادار", it: "i freni che emettono rumore", values: ["لنتِ فرسوده یا مشکلِ ترمز", "بررسی و در صورتِ لزوم تعویض؛ هم ایمنی، هم صدا"] },
        { label: "لاستیک در پیچِ تند", it: "lo strisciamento dei pneumatici", values: ["لاستیک روی جاده می‌کشد و جیغ می‌زند", "پیچ را آرام‌تر برو؛ این صدا نشانه‌ی کم شدنِ چسبندگی هم هست"] },
        { label: "لاستیکِ زمستانی بیرون از فصل", it: "pneumatici invernali", values: ["صدا و مصرفِ بیشتر", "فقط در فصلی که لازم است"] },
        { label: "یدکِ خالی که بالا و پایین می‌پرد", it: "i rimorchi vuoti che sobbalzano", values: ["بدنه و بار به هم می‌خورند", "آرام‌تر در جاده‌ی ناهموار؛ بار و بست‌ها محکم (فصلِ ۱۷، «رانندگی با یدک و کاروان»)"] },
        { label: "بارِ لق", it: "il modo in cui è sistemato il carico", values: ["تکان و ضربه", "بار را درست ببند (فصلِ ۱۳، «بار روی خودرو و موتورسیکلت»)"] },
        { label: "خودروی برقی", it: "veicolo elettrico", values: ["موتورش کم‌صداست؛ لاستیک و باد سر جایشان‌اند", "همان قاعده‌ها، به‌جز اگزوز"] },
      ],
      takeaway: "صدا فقط از موتور نیست: اگزوز، ترمز، لاستیک و بار هم. هر کدام راهِ خودش را دارد.",
      rule: `${CDS_155} c.1–2; ${GUIDA_CO2}; ${TECNICA}`,
    },
    {
      kind: "table",
      title: "صداخفه‌کن: سالم، تأییدشده، دست‌نخورده",
      body:
        "صداخفه‌کن باید سالم نگه داشته شود و نباید دستکاری شود (ماده‌ی ۱۵۵ بند ۲). هر تغییر در اگزوز بدونِ بازدید و آزمایشِ فنی هم ممنوع است (ماده‌ی ۷۸). هیچ‌کدام از این «راه‌حل»ها صدا را کم نمی‌کند:",
      columns: ["درست یا غلط", "چرا"],
      rows: [
        { label: "سالم و از نوعِ تأییدشده", it: "efficiente e di tipo approvato", values: ["درست", "همان که قانون می‌خواهد"] },
        { label: "تعویضِ اگزوزِ خراب با نوعِ تأییدشده برای همان خودرو", it: "approvata per quel tipo di veicolo", values: ["درست", "نه هر اگزوزی؛ همانی که برای این خودرو تأیید شده"] },
        { label: "سوراخ کردنِ صداخفه‌کن", it: "praticare dei fori", values: ["غلط", "صدا را بیشتر می‌کند و دستکاریِ ممنوع است"] },
        { label: "بریدنِ انتهای اگزوز", it: "eliminare la parte finale", values: ["غلط", "همان: صدای بیشتر، تخلف"] },
        { label: "لوله‌ی باریک‌تر", it: "un diametro più piccolo", values: ["غلط", "موتور را خفه می‌کند و تغییرِ تأییدنشده است"] },
      ],
      takeaway: "صدا را فقط اگزوزِ سالم و تأییدشده کم می‌کند. هر دستکاری غلط است.",
      rule: `${CDS_155} c.2; ${CDS("78")} c.1, 3; ${MANUALE}`,
    },
    {
      kind: "classify",
      title: "مقایسه کن: کدام کم‌صداتر است؟",
      body: `${COMPARE} برای هر جفت جواب بده:`,
      options: CHOICES,
      items: [
        {
          pair: { a: "اگزوزِ اصلی و تأییدشده، سالم", b: "همان اگزوز، با چند سوراخ «برای صدای بهتر»", differs: "سوراخ در اگزوز" },
          prompt: "کدام کم‌صداتر و قانونی است؟",
          answer: 0,
          explain: "سوراخ صدا را بیشتر می‌کند و دستکاریِ ممنوع است (قدمِ ۲).",
        },
        {
          pair: { a: "ترمزهایی که جیغ می‌زنند، بررسی و تعمیر شده‌اند", b: "همان ترمزها، «فعلاً کار می‌کنند»", differs: "ترمزِ تعمیرشده یا نه" },
          prompt: "کدام کم‌صداتر و امن‌تر است؟",
          answer: 0,
          explain: "صدای ترمز نشانه است؛ بررسی هم صدا را کم می‌کند، هم ایمنی را بیشتر (قدمِ ۱).",
        },
        {
          pair: { a: "پیچ را تند می‌رود و لاستیک‌ها جیغ می‌زنند", b: "همان پیچ، آرام‌تر", differs: "سرعت در پیچ" },
          prompt: "کدام کم‌صداتر است؟",
          answer: 1,
          explain: "کشیدنِ لاستیک در پیچِ تند صدا می‌سازد و نشانه‌ی لبه‌ی چسبندگی است (قدمِ ۱).",
        },
        {
          pair: { a: "خودروی برقی با سرعتِ بالا در جاده‌ی برون‌شهری", b: "همان خودرو با سرعتِ کم در شهر", differs: "سرعت (خودروی برقی)" },
          prompt: "کدام صدای بیشتری دارد؟",
          answer: 0,
          explain: "موتورِ برقی کم‌صداست، ولی صدای لاستیک و باد با سرعت بیشتر می‌شود (قدمِ ۱).",
        },
        {
          pair: { a: "خودروی بنزینی با اگزوزِ سالم", b: "خودروی بنزینیِ دیگری با لاستیک‌های دیگر و اگزوزِ نو", differs: "خودرو، لاستیک و اگزوز، همه با هم" },
          prompt: "کدام کم‌صداتر است؟",
          answer: 2,
          explain: "خودرو، لاستیک و اگزوز با هم عوض شده‌اند؛ از این اطلاعات نمی‌شود گفت.",
        },
      ],
      takeaway: "صدا را منبعش کم می‌کند: اگزوزِ سالم، ترمزِ سالم، سرعتِ آرام‌تر. دستکاری هیچ‌وقت.",
      rule: CDS_155,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il rumore", fa: "صدا" },
        { it: "il silenziatore", fa: "صداخفه‌کن" },
        { it: "la marmitta", fa: "اگزوز" },
        { it: "di tipo approvato", fa: "از نوعِ تأییدشده" },
        { it: "il tubo di scarico", fa: "لوله‌ی اگزوز" },
        { it: "praticare dei fori", fa: "سوراخ کردن", base: "praticare" },
        { it: "lo strisciamento dei pneumatici", fa: "کشیدنِ لاستیک روی جاده" },
        { it: "sobbalzare", fa: "بالا و پایین پریدن", base: "sobbalzare" },
        { it: "la rumorosità", fa: "پرصدایی" },
      ],
    },
    {
      kind: "trap",
      title: "«Per diminuire il rumore»: سالم نگه داشتن یا سوراخ کردن؟",
      body: "هر دو جمله با «برای کم کردنِ صدای وسیله‌های موتوری» شروع می‌شوند. یکی اگزوزِ سالم می‌خواهد، دیگری سوراخش می‌کند:",
      examples: [
        {
          sourceId: "6776",
          textIt: "Per diminuire il rumore emesso dai veicoli a motore è necessario che il dispositivo silenziatore (marmitta) sia efficiente e di tipo approvato",
          answer: 1,
          chunks: [
            { it: RUM, fa: RUM_FA, focus: "reason" },
            { it: "è necessario che il dispositivo silenziatore (marmitta)", fa: "لازم است که صداخفه‌کن (اگزوز)" },
            { it: "sia efficiente e di tipo approvato", fa: "سالم و از نوعِ تأییدشده باشد", verb: "sia ← essere" },
          ],
          translation: "برای کم کردنِ صدای وسیله‌های موتوری، لازم است که صداخفه‌کن (اگزوز) سالم و از نوعِ تأییدشده باشد.",
          why: "درست است. همان که ماده‌ی ۱۵۵ می‌خواهد.",
        },
        {
          sourceId: "6782",
          textIt: "Per diminuire il rumore emesso dai veicoli a motore è opportuno praticare dei fori nel dispositivo silenziatore (marmitta)",
          answer: 0,
          chunks: [
            { it: RUM, fa: RUM_FA, focus: "reason" },
            { it: "è opportuno praticare dei fori", fa: "بهتر است سوراخ‌هایی ایجاد کرد", focus: "contrast" },
            { it: "nel dispositivo silenziatore (marmitta)", fa: "در صداخفه‌کن (اگزوز)" },
          ],
          translation: "برای کم کردنِ صدای وسیله‌های موتوری، بهتر است در صداخفه‌کن (اگزوز) سوراخ‌هایی ایجاد کرد.",
          why: "غلط است. سوراخ صدا را بیشتر می‌کند و دستکاریِ ممنوع است.",
        },
      ],
      takeaway: "«efficiente», «approvato» درست؛ «fori», «eliminare», «diametro più piccolo» غلط.",
      rule: `${CDS_155} c.2`,
    },
  ],
  practice: [
    {
      sourceId: "6775",
      textIt: "Il rumore prodotto dai veicoli a motore è causato solo dal motore",
      answer: 0,
      chunks: [
        { it: "Il rumore prodotto dai veicoli a motore", fa: "صدای وسیله‌های موتوری" },
        { it: "è causato solo dal motore", fa: "فقط از موتور است", focus: "limit" },
      ],
      translation: "صدای وسیله‌های موتوری فقط از موتور است.",
      why: "غلط است (قدم ۱). اگزوز، ترمز، لاستیک و بار هم صدا می‌سازند؛ «solo» جمله را غلط می‌کند.",
      rule: `${CDS_155} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "6779",
      textIt: "Per diminuire il rumore prodotto dai veicoli a motore è necessario far controllare i freni se emettono rumore durante le frenate, sostituendoli se necessario",
      answer: 1,
      chunks: [
        { it: "Per diminuire il rumore prodotto dai veicoli a motore", fa: "برای کم کردنِ صدای وسیله‌های موتوری،", focus: "reason" },
        { it: "è necessario far controllare i freni", fa: "لازم است ترمزها را بدهی بررسی کنند" },
        { it: "se emettono rumore durante le frenate,", fa: "اگر هنگامِ ترمز صدا می‌دهند،", verb: "emettono ← emettere", focus: "condition" },
        { it: "sostituendoli se necessario", fa: "و اگر لازم بود عوضشان کنند", verb: "sostituendoli ← sostituire" },
      ],
      translation: "برای کم کردنِ صدای وسیله‌های موتوری، اگر ترمزها هنگامِ ترمز صدا می‌دهند، لازم است بدهی بررسی‌شان کنند و اگر لازم بود عوضشان کنند.",
      why: "درست است (قدم ۱). ترمزِ صدادار هم صدای مزاحم است، هم نشانه‌ای برای ایمنی.",
      rule: `${CDS_155} c.1; ${MANUALE}`,
      conceptStep: 1,
    },
    {
      sourceId: "6777",
      textIt: "Per diminuire il rumore è necessario far sostituire la marmitta rovinata con una approvata per quel tipo di veicolo",
      answer: 1,
      chunks: [
        { it: "Per diminuire il rumore", fa: "برای کم کردنِ صدا،", focus: "reason" },
        { it: "è necessario far sostituire la marmitta rovinata", fa: "لازم است اگزوزِ خراب را عوض کنی" },
        { it: "con una approvata per quel tipo di veicolo", fa: "با اگزوزی که برای همان نوع وسیله تأیید شده", focus: "condition" },
      ],
      translation: "برای کم کردنِ صدا، لازم است اگزوزِ خراب را با اگزوزی که برای همان نوع وسیله تأیید شده عوض کنی.",
      why: "درست است (قدم ۲). نه هر اگزوزی: «approvata per quel tipo di veicolo».",
      rule: `${CDS_155} c.2; ${CDS("78")}`,
      conceptStep: 2,
    },
    {
      sourceId: "6784",
      textIt: "Per diminuire il rumore emesso dai veicoli a motore basta eliminare la parte finale della marmitta",
      answer: 0,
      chunks: [
        { it: RUM, fa: RUM_FA, focus: "reason" },
        { it: "basta eliminare la parte finale della marmitta", fa: "کافی است انتهای اگزوز را برداری", verb: "basta ← bastare", focus: "contrast" },
      ],
      translation: "برای کم کردنِ صدای وسیله‌های موتوری، کافی است انتهای اگزوز را برداری.",
      why: "غلط است (قدم ۲). بریدنِ اگزوز صدا را بیشتر می‌کند و دستکاریِ ممنوع است.",
      rule: `${CDS_155} c.2`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6765", "6773", "6775", "6779", "6780", "6785", "6786"] },
    { step: 2, sourceIds: ["6776", "6777", "6782", "6783", "6784"] },
  ],
};

export const lessonRumoreGuida: Lesson = {
  id: "rumore-guida-clacson",
  titleFa: "صدای رانندگی، و بوق",
  titleIt: "RUMORE: STILE DI GUIDA · CLACSON · PORTIERE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی همان رانندگیِ نرمی که سوخت را کم می‌کند، صدا را هم کم می‌کند: ترمز و گازِ تند، گاز دادنِ درجا و کوبیدنِ در صدای مزاحم‌اند. و یاد می‌گیری قانونِ بوق را: کم، کوتاه، فقط برای ایمنی؛ در آبادی فقط در خطرِ واقعی و فوری؛ و کِی چشمکِ نورِ بالا جای بوق را می‌گیرد.",
      why:
        "۱۰ سؤال. جمله‌ی غلط کارِ پرصدا را راهِ کم کردنِ صدا جا می‌زند («در ترافیک موتور را روشن نگه دار و گاز بده»، «در را محکم ببند»)، یا قاعده‌ی بوق را با شرطی ساختگی می‌بندد («فقط شب جایش چراغ بزن»).",
      rule: CDS_155,
    },
    {
      kind: "table",
      title: "صدایی که با رانندگی ساخته می‌شود",
      body:
        "ماده‌ی ۱۵۵ صدای مزاحمی را که از «شیوه‌ی رانندگی» می‌آید جدا نام می‌برد. همان کارهایی که سوخت را هدر می‌دهند (درس‌های ۳ و ۴)، صدا هم می‌سازند:",
      columns: ["چه کنی"],
      rows: [
        { label: "ترمزِ تند", it: "frenare bruscamente", values: ["فقط وقتی واقعاً لازم است؛ با پیش‌بینی کمتر لازم می‌شود"] },
        { label: "گازِ تند", it: "forti accelerazioni", values: ["نرم راه بیفت؛ رانندگیِ درست صدا را کم می‌کند"] },
        { label: "گاز دادنِ درجا", it: "accelerare quando il veicolo è fermo", values: ["نکن؛ نه پشتِ چراغ، نه در صف، نه «برای گرم کردن»"] },
        { label: "در ایستادن‌های ترافیک", it: "fermate dovute al traffico", values: ["«موتور روشن و گاز» غلط است؛ ایستادنِ طولانی: خاموش (درسِ ۴)"] },
        { label: "کوبیدنِ در", it: "chiudere con forza le portiere", values: ["آرام ببند و نگاه کن که بسته شده؛ کوبیدن فقط صداست"] },
        { label: "رادیو و ضبط", it: "apparecchi radiofonici", values: ["صدا نباید از حدِ مجاز بیشتر شود (ماده‌ی ۱۵۵ بند ۳)"] },
      ],
      takeaway: "رانندگیِ نرم = سوختِ کمتر و صدای کمتر. هیچ «گاز بده تا…» صدا را کم نمی‌کند.",
      rule: `${CDS_155} c.1, 3`,
    },
    {
      kind: "table",
      title: "بوق: کِی و چطور",
      body:
        "ماده‌ی ۱۵۶ بوق را ممنوع نمی‌کند؛ قاعده‌مندش می‌کند. همیشه کم و کوتاه، و فقط برای ایمنیِ راه:",
      columns: ["قاعده"],
      rows: [
        { label: "همه‌جا", it: "con la massima moderazione · solamente ai fini della sicurezza", values: ["با نهایتِ خودداری، فقط برای ایمنی، تا جایی که می‌شود کوتاه"] },
        { label: "بیرون از آبادی", it: "fuori dei centri abitati", values: ["هر وقت ترافیک یا شرایط لازم کند، به‌خصوص هنگامِ سبقت"] },
        { label: "داخلِ آبادی", it: "nei centri abitati", values: ["ممنوع، مگر خطرِ واقعی و فوری"] },
        { label: "چشمکِ نورِ بالا به جای بوق", it: "segnali luminosi a breve intermittenza", values: ["شب؛ و روز هم اگر لازم باشد، جایی که ممنوع نیست (فصلِ ۱۸، «نورِ بالا: کِی روشن، کِی پایین، کِی چشمک»). «فقط شب» غلط است"] },
        { label: "حملِ زخمی یا بیمارِ بدحال", it: "trasporto feriti o ammalati gravi", values: ["در صورتِ لزوم، محدودیت‌های بوق برایش نیست"] },
        { label: "بوقِ زیاد", it: "in modo eccessivo", values: ["آلودگیِ صوتی را بیشتر می‌کند"] },
      ],
      takeaway: "بوق: کم، کوتاه، فقط برای ایمنی. در آبادی فقط در خطرِ فوری. چشمک جایش را می‌گیرد، شب و هر وقت لازم باشد.",
      rule: CDS_156,
    },
    {
      kind: "classify",
      title: "مقایسه کن: کدام صدای کمتری می‌سازد؟",
      body: `${COMPARE} برای هر جفت جواب بده:`,
      options: CHOICES,
      items: [
        {
          pair: { a: "در ترافیکِ ایستاده، پشتِ سرِ هم بوق می‌زند تا صف راه بیفتد", b: "همان صف، بی‌بوق صبر می‌کند", differs: "بوق زدن یا صبر کردن" },
          prompt: "کدام صدای کمتری می‌سازد و درست است؟",
          answer: 1,
          explain: "بوق فقط برای ایمنی است؛ صف را راه نمی‌اندازد (قدمِ ۲). در آبادی هم بی‌خطرِ فوری ممنوع است.",
        },
        {
          pair: { a: "پشتِ چراغ قرمز گاز می‌دهد", b: "پشتِ همان چراغ، موتور آرام کار می‌کند یا Start & Stop خاموشش کرده", differs: "گاز دادن پشتِ چراغ" },
          prompt: "کدام صدای کمتری می‌سازد؟",
          answer: 1,
          explain: "گازِ درجا فقط صدا و سوخت است (قدمِ ۱).",
        },
        {
          pair: { a: "در را آرام می‌بندد و نگاه می‌کند بسته شده", b: "در را محکم می‌کوبد «تا مطمئن شود»", differs: "آرام بستن یا کوبیدنِ در" },
          prompt: "کدام صدای کمتری می‌سازد؟",
          answer: 0,
          explain: "کوبیدن فقط صداست؛ نگاه کردن مطمئن‌تر است (قدمِ ۱).",
        },
        {
          pair: { a: "شب بیرون از آبادی، پیش از سبقت یک چشمکِ کوتاهِ نورِ بالا، جایی که ممنوع نیست", b: "همان‌جا، یک بوقِ کوتاه", differs: "چشمکِ نور یا بوق" },
          prompt: "کدام صدای کمتری می‌سازد؟",
          answer: 0,
          explain: "هر دو مجازند؛ چشمک بی‌صداست. قانون شب چشمک را جای بوق می‌گذارد (قدمِ ۲).",
        },
        {
          pair: { a: "رانندگی در شهر با خودروی برقی", b: "رانندگی در جاده با خودروی بنزینیِ دیگر", differs: "خودرو، جا و سرعت، همه با هم" },
          prompt: "کدام صدای کمتری می‌سازد؟",
          answer: 2,
          explain: "خودرو، جا و سرعت با هم عوض شده‌اند؛ نمی‌شود گفت. صدا به سرعت، لاستیک و شیوه‌ی رانندگی هم بستگی دارد.",
        },
      ],
      takeaway: "صدای کمتر از رانندگیِ آرام و بوقِ کم می‌آید، نه از هیچ ترفندی.",
      rule: `${CDS_155}; ${CDS_156}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "i rumori fastidiosi · molesti", fa: "صدای مزاحم" },
        { it: "l'inquinamento acustico", fa: "آلودگیِ صوتی" },
        { it: "il clacson · il dispositivo di segnalazione acustica", fa: "بوق" },
        { it: "le luci ad intermittenza", fa: "چشمکِ نور" },
        { it: "frenare bruscamente", fa: "تند ترمز کردن", base: "frenare" },
        { it: "la portiera", fa: "درِ خودرو" },
        { it: "il pericolo immediato", fa: "خطرِ فوری" },
        { it: "il trasporto di feriti o ammalati", fa: "حملِ زخمی یا بیمار" },
        { it: "il meno possibile", fa: "تا جایی که می‌شود کم" },
      ],
    },
    {
      kind: "trap",
      title: "«il clacson»: فقط برای ایمنی، یا «فقط شب» چراغ؟",
      body: "هر دو جمله درباره‌ی بوق هنگامِ رانندگی‌اند و هر دو یک «فقط» دارند. یکی همان قانون است، دیگری شرطی ساختگی می‌سازد:",
      examples: [
        {
          sourceId: "6769",
          textIt: "Per evitare rumori fastidiosi durante la guida, si deve usare il clacson solamente per motivi di sicurezza stradale (trasporto feriti o ammalati, pericolo immediato)",
          answer: 1,
          chunks: [
            { it: EVI, fa: EVI_FA, focus: "reason" },
            { it: "si deve usare il clacson solamente per motivi di sicurezza stradale", fa: "بوق را باید فقط به دلیلِ ایمنیِ راه زد", verb: "si deve ← dovere", focus: "limit" },
            { it: "(trasporto feriti o ammalati, pericolo immediato)", fa: "(حملِ زخمی یا بیمار، خطرِ فوری)" },
          ],
          translation: "برای جلوگیری از صدای مزاحم هنگامِ رانندگی، بوق را باید فقط به دلیلِ ایمنیِ راه زد (حملِ زخمی یا بیمار، خطرِ فوری).",
          why: "درست است. این «فقط» همان «solamente ai fini della sicurezza» ماده‌ی ۱۵۶ است.",
        },
        {
          sourceId: "6772",
          textIt: "Per evitare rumori fastidiosi durante la guida, occorre sostituire il clacson con le luci ad intermittenza, ma solamente di notte",
          answer: 0,
          chunks: [
            { it: EVI, fa: EVI_FA, focus: "reason" },
            { it: "occorre sostituire il clacson con le luci ad intermittenza,", fa: "باید به جای بوق چشمکِ نور زد،", verb: "occorre ← occorrere" },
            { it: "ma solamente di notte", fa: "ولی فقط شب", focus: "limit" },
          ],
          translation: "برای جلوگیری از صدای مزاحم هنگامِ رانندگی، باید به جای بوق چشمکِ نور زد، ولی فقط شب.",
          why: "غلط است. چشمک شب جای بوق را می‌گیرد، و روز هم اگر لازم باشد؛ «solamente di notte» ساختگی است.",
        },
      ],
      takeaway: "«solamente» کنارِ «sicurezza» درست است؛ کنارِ «di notte» غلط.",
      rule: CDS_156,
    },
  ],
  practice: [
    {
      sourceId: "6767",
      textIt: "Per evitare rumori fastidiosi durante la guida non si deve frenare bruscamente, se non è strettamente necessario",
      answer: 1,
      chunks: [
        { it: "Per evitare rumori fastidiosi durante la guida", fa: "برای جلوگیری از صدای مزاحم هنگامِ رانندگی،", focus: "reason" },
        { it: "non si deve frenare bruscamente,", fa: "نباید تند ترمز کرد،", verb: "si deve ← dovere", focus: "negation" },
        { it: "se non è strettamente necessario", fa: "مگر این‌که واقعاً لازم باشد", focus: "condition" },
      ],
      translation: "برای جلوگیری از صدای مزاحم هنگامِ رانندگی، نباید تند ترمز کرد، مگر این‌که واقعاً لازم باشد.",
      why: "درست است (قدم ۱). «se non è strettamente necessario»: در خطر، ترمزِ تند همیشه درست است.",
      rule: `${CDS_155} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "6770",
      textIt: "Per evitare rumori fastidiosi durante le fermate dovute al traffico, occorre mantenere il motore acceso, accelerando ripetutamente",
      answer: 0,
      chunks: [
        { it: "Per evitare rumori fastidiosi durante le fermate dovute al traffico,", fa: "برای جلوگیری از صدای مزاحم هنگامِ ایستادن‌های ترافیک،", focus: "reason" },
        { it: "occorre mantenere il motore acceso,", fa: "باید موتور را روشن نگه داشت،", verb: "occorre ← occorrere" },
        { it: "accelerando ripetutamente", fa: "و پشتِ سرِ هم گاز داد", verb: "accelerando ← accelerare", focus: "contrast" },
      ],
      translation: "برای جلوگیری از صدای مزاحم هنگامِ ایستادن‌های ترافیک، باید موتور را روشن نگه داشت و پشتِ سرِ هم گاز داد.",
      why: "غلط است (قدم ۱). گازِ درجا خودش صدای مزاحم است.",
      rule: `${CDS_155} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "6781",
      textIt: "Per diminuire il rumore emesso dai veicoli a motore si deve suonare il clacson il meno possibile",
      answer: 1,
      chunks: [
        { it: RUM, fa: RUM_FA, focus: "reason" },
        { it: "si deve suonare il clacson il meno possibile", fa: "باید تا جایی که می‌شود کم بوق زد", verb: "si deve ← dovere" },
      ],
      translation: "برای کم کردنِ صدای وسیله‌های موتوری، باید تا جایی که می‌شود کم بوق زد.",
      why: "درست است (قدم ۲). «con la massima moderazione» در ماده‌ی ۱۵۶.",
      rule: CDS_156,
      conceptStep: 2,
    },
    {
      sourceId: "6766",
      textIt: "L'inquinamento acustico aumenta se si usano in modo eccessivo i dispositivi di segnalazione acustica (clacson, trombe)",
      answer: 1,
      chunks: [
        { it: "L'inquinamento acustico aumenta", fa: "آلودگیِ صوتی بیشتر می‌شود", verb: "aumenta ← aumentare" },
        { it: "se si usano in modo eccessivo", fa: "اگر بیش از حد استفاده شوند", focus: "condition", verb: "si usano ← usare" },
        { it: "i dispositivi di segnalazione acustica (clacson, trombe)", fa: "وسیله‌های هشدارِ صوتی (بوق، شیپور)" },
      ],
      translation: "اگر از وسیله‌های هشدارِ صوتی (بوق، شیپور) بیش از حد استفاده شود، آلودگیِ صوتی بیشتر می‌شود.",
      why: "درست است (قدم ۲). بوقِ زیاد همان آلودگیِ صوتی است.",
      rule: CDS_156,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6767", "6768", "6770", "6771", "6774", "6778"] },
    { step: 2, sourceIds: ["6766", "6769", "6772", "6781"] },
  ],
};
