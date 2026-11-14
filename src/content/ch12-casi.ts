/**
 * src/content/ch12-casi.ts
 * Chapter 12 (Distanza di sicurezza), lesson 4: the only two numbers the law
 * gives for the following distance (CdS art. 149 c.2: ≥ 100 m between vehicles
 * that alone are banned from overtaking; c.3: ≥ 20 m behind working snowploughs
 * and salt spreaders), the bank's invented numbers, and the situations where
 * the gap grows and never shrinks.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter12.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_149 = "Codice della Strada, art. 149";
const VALORE = "valore della distanza di sicurezza da mantenere da una macchina";
const VALORE_FA = "مقدارِ فاصله‌ی ایمنی‌ای که باید نگه داشت از ماشینِ";
const DISTANZA = "La distanza di sicurezza";
const DISTANZA_FA = "فاصله‌ی ایمنی";

export const lessonDistanzaCasi: Lesson = {
  id: "distanza-casi-particolari",
  titleFa: "دو عددِ قانون، و جاهایی که فاصله بیشتر می‌شود",
  titleIt: "20 m · 100 m · CASI PARTICOLARI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی قانون فقط کجا برای فاصله‌ی ایمنی عدد می‌گذارد (۲۰ متر پشتِ برف‌روب و نمک‌پاش، ۱۰۰ متر بینِ وسیله‌هایی که سبقتشان ممنوع شده) و چرا در بقیه‌ی موقعیت‌ها، از باران تا تونل، عددی در کار نیست و فقط فاصله را بیشتر می‌کنی.",
      why:
        "۱۸ سؤال، با دو جور دام: عددهای ساختگی («۱۰۰ متر در باران»، «۱۰ متر پشتِ برف‌روب») و موقعیت‌هایی که به‌ظاهر اجازه‌ی کم کردنِ فاصله می‌دهند («در تونل»، «پشتِ کامیون»). جوابِ دومی همیشه یکی است: فاصله کم نمی‌شود.",
      rule: `${CDS_149} c.1–3`,
    },
    {
      kind: "table",
      title: "قانون فقط دو عدد دارد",
      body:
        "در درسِ ۳ دیدی که قانون برای فاصله‌ی ایمنی معمولاً عدد نمی‌دهد؛ فقط می‌گوید فاصله باید «در هر حال» توقفِ به‌موقع را تضمین کند. دو جا استثناست. هر عددِ دیگری که در جمله‌ای دیدی، به احتمالِ زیاد دام است. قانون دلیلِ ۱۰۰ متر را نمی‌نویسد؛ نتیجه‌اش این است که خودرویی که از آن‌ها سبقت می‌گیرد، بینِ دو وسیله جا دارد.",
      columns: ["فاصله‌ی قانونی", "عددِ غلطِ بانک"],
      rows: [
        { label: "پشتِ ماشینِ برف‌روبِ در حالِ کار", it: "macchina sgombraneve in azione", values: ["دست‌کم ۲۰ متر", "۱۰ متر نه"] },
        { label: "پشتِ ماشینِ نمک‌پاشِ در حالِ کار", it: "spanditrice di sale in azione", values: ["دست‌کم ۲۰ متر", "۱۵ متر نه"] },
        {
          label: "بیرونِ آبادی، وقتی سبقت فقط برای گروهی از وسیله‌ها ممنوع است (مثلاً کامیون‌های بالای ۳٫۵ تن)، بینِ همان وسیله‌ها",
          it: "divieto di sorpasso solo per alcune categorie",
          values: ["دست‌کم ۱۰۰ متر؛ ولی نه در جاده‌ای که در هر جهت دو خط عبور یا بیشتر دارد", "«۱۰ متر بینِ autotreni» نه"],
        },
        { label: "جاده‌ی برون‌شهری به‌طورِ کلی", it: "strade extraurbane", values: ["عددِ ثابتی ندارد", "«همیشه ۷۰ متر» نه"] },
        {
          label: "سرازیریِ تند، برفِ در حالِ بارش، بارانِ شدید",
          it: "forti discese · nevicata in atto · forte pioggia",
          values: ["عددِ ثابتی ندارد؛ فاصله را بیشتر کن", "«دست‌کم ۱۰۰ متر» نه"],
        },
      ],
      takeaway:
        "۲۰ متر = پشتِ برف‌روب یا نمک‌پاشِ در حالِ کار. ۱۰۰ متر = بینِ وسیله‌هایی که سبقتشان ممنوع شده، بیرونِ آبادی، روی جاده‌ای با یک خط عبور در هر جهت. بقیه عدد ندارند.",
      rule: `${CDS_149} c.1–3`,
    },
    {
      kind: "table",
      title: "فاصله بیشتر می‌شود، هیچ‌وقت کمتر",
      body:
        "قاعده‌ی درسِ ۳ این‌جا هم کار می‌کند: هرچه پیش‌بینیِ کارِ خودروی جلو سخت‌تر باشد، یا ترمزِ ناگهانی محتمل‌تر، فاصله بیشتر. بانک این موقعیت‌ها را جدا می‌پرسد:",
      columns: ["چه کنی", "چرا"],
      rows: [
        {
          label: "پیش از شروعِ سبقت",
          it: "prima di iniziare un sorpasso",
          values: ["فاصله را نگه دار؛ به خودروی جلو نچسب", "تا وقتی کنار نرفته‌ای، هنوز پشتِ همان خودرویی؛ اگر ترمز کند باید بتوانی بایستی"],
        },
        {
          label: "رفتارِ راننده‌ی جلو قابلِ پیش‌بینی نیست",
          it: "difficile valutare il comportamento",
          values: ["فاصله را بیشتر کن", "نمی‌دانی کِی ترمز می‌کند یا می‌پیچد"],
        },
        {
          label: "بارِ خودروی جلو ناپایدار است یا ممکن است بیفتد",
          it: "carico instabile · in pericolo di cadere",
          values: ["بیشتر کن، به‌خصوص در سربالایی؛ هر وقت امن شد سبقت بگیر", "بار ممکن است جلویت بیفتد. «نزدیک شو تا دیگران سبقت نگیرند» غلط است"],
        },
        { label: "در تونل", it: "nelle gallerie", values: ["کم نکن", "تونل دلیلی برای نزدیک شدن نیست؛ «در هر حال» یعنی همه‌جا"] },
        {
          label: "پشتِ کامیون",
          it: "il veicolo che precede è un autocarro",
          values: ["کم نکن", "دلیلِ بانک («کامیون دیرتر می‌ایستد») منطقی به نظر می‌رسد، ولی کامیون هم ممکن است ناگهان بایستد، مثلاً اگر به چیزی بخورد، و پشتش جلو را نمی‌بینی"],
        },
        {
          label: "در خطِ اضطراری",
          it: "corsia d'emergenza",
          values: ["در آن رانندگی نکن", "در خطِ اضطراری فقط برای ایستادن یا دوباره راه افتادن حرکت می‌کنی؛ «فاصله‌ی بیشتر در خطِ اضطراری» جمله‌ای غلط است"],
        },
      ],
      takeaway:
        "هیچ موقعیتی اجازه‌ی کم کردنِ فاصله نمی‌دهد: نه تونل، نه آزادراه، نه کامیون. هر چیزی که جلو را نامطمئن‌تر کند، فاصله را بیشتر می‌کند.",
      rule: `${CDS_149} c.1; Codice della Strada, art. 176 c.1 lett. c`,
    },
    {
      kind: "classify",
      title: "عددِ ثابت، یا فقط «بیشتر»؟",
      body: "موقعیت را بخوان و بگو فاصله‌ی ایمنی چقدر است. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "≥ 20 m", fa: "دست‌کم ۲۰ متر" },
        { it: "≥ 100 m", fa: "دست‌کم ۱۰۰ متر" },
        { it: "nessun numero fisso", fa: "عددِ ثابتی ندارد" },
      ],
      items: [
        {
          prompt: "سواری پشتِ برف‌روبی که در گردنه برف کنار می‌زند",
          answer: 0,
          explain: "ماده‌ی ۱۴۹ بند ۳: پشتِ برف‌روب یا نمک‌پاشِ در حالِ کار، هیچ‌وقت کمتر از ۲۰ متر.",
        },
        {
          prompt: "کامیونِ ۱۲ تنی پشتِ کامیونِ دیگر، بیرونِ آبادی، یک خط عبور در هر جهت، تابلوی سبقتِ ممنوع برای کامیون‌ها",
          answer: 1,
          explain: "سبقت فقط برای همین گروه ممنوع است و جاده در هر جهت یک خط دارد: بینِ دو کامیون دست‌کم ۱۰۰ متر.",
        },
        {
          prompt: "همان دو کامیون، ولی جاده در هر جهت دو خط عبور دارد",
          answer: 2,
          explain: "بند ۲ در جاده‌ای که در هر جهت دو خط یا بیشتر دارد اجرا نمی‌شود. عددی نیست؛ فاصله‌ی ایمنیِ معمولی، با همان قاعده‌ی درسِ ۳.",
        },
        {
          prompt: "سواری پشتِ سواری، بارانِ شدید در آزادراه",
          answer: 2,
          explain: "باران فاصله را بیشتر می‌کند، ولی قانون برایش عدد نمی‌گذارد. «۱۰۰ متر در باران» دامِ بانک است.",
        },
        {
          prompt: "سواری پشتِ نمک‌پاشی که روی آزادراه کار می‌کند",
          answer: 0,
          explain: "نمک‌پاش هم مثلِ برف‌روب: دست‌کم ۲۰ متر، روی هر جاده‌ای.",
        },
        {
          prompt: "سواری پشتِ سواری، داخلِ تونل",
          answer: 2,
          explain: "تونل عدد ندارد و فاصله را هم کم نمی‌کند.",
        },
      ],
      takeaway:
        "اول بپرس: پشتِ برف‌روب یا نمک‌پاشم؟ ۲۰. وسیله‌ای هستم که سبقتش ممنوع شده، پشتِ وسیله‌ای از همان گروه، بیرونِ آبادی و با یک خط در هر جهت؟ ۱۰۰. وگرنه عددی نیست.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la spanditrice di sale", fa: "ماشینِ نمک‌پاش", note: "در متنِ قانون «spargitrice» آمده؛ همان است." },
        { it: "in azione", fa: "در حالِ کار" },
        { it: "il divieto di sorpasso", fa: "ممنوعیتِ سبقت" },
        { it: "l'autotreno", fa: "خودرو + یدک؛ دو وسیله‌ی به‌هم‌وصل" },
        { it: "almeno", fa: "دست‌کم", note: "«non inferiore a 20 m» هم یعنی دست‌کم ۲۰ متر." },
        { it: "la galleria", fa: "تونل" },
        { it: "il carico instabile", fa: "بارِ ناپایدار", note: "«in pericolo di cadere» یعنی در خطرِ افتادن." },
        { it: "la corsia di emergenza", fa: "خطِ اضطراری" },
      ],
    },
    {
      kind: "trap",
      title: "۱۰۰ متر فقط یک جا درست است",
      body: "عددِ ۱۰۰ در هر دو جمله‌ی بانک هست؛ یکی درست، یکی غلط. اولی، مثلِ چند جمله‌ی دیگرِ این گروه، در بانک بی‌کلمه‌ی اولش («In») آمده:",
      examples: [
        {
          sourceId: "4221",
          textIt:
            "strada extraurbana a una corsia per senso di marcia, la distanza fra veicoli adibiti al trasporto di merci di massa complessiva superiore a 3,5 tonnellate, cui sia stato imposto il divieto di sorpasso, deve essere di almeno 100 metri",
          answer: 1,
          chunks: [
            { it: "strada extraurbana a una corsia per senso di marcia,", fa: "جاده‌ی برون‌شهری با یک خط عبور در هر جهت،", focus: "condition" },
            { it: "la distanza fra veicoli adibiti al trasporto di merci", fa: "فاصله بینِ وسیله‌های باری" },
            { it: "di massa complessiva superiore a 3,5 tonnellate,", fa: "با جرمِ کلِ بیش از ۳٫۵ تن،" },
            { it: "cui sia stato imposto il divieto di sorpasso,", fa: "که سبقت برایشان ممنوع شده،", verb: "sia stato imposto ← imporre", focus: "condition" },
            { it: "deve essere di almeno 100 metri", fa: "باید دست‌کم ۱۰۰ متر باشد", verb: "deve ← dovere", focus: "limit" },
          ],
          translation:
            "در جاده‌ی برون‌شهری با یک خط عبور در هر جهت، فاصله بینِ وسیله‌های باریِ بیش از ۳٫۵ تن که سبقت برایشان ممنوع شده، باید دست‌کم ۱۰۰ متر باشد.",
          why: "درست است. همان بند ۲ ماده‌ی ۱۴۹: سبقت فقط برای این گروه ممنوع است، بیرونِ آبادی و با یک خط در هر جهت.",
        },
        {
          sourceId: "4338",
          textIt: "La distanza di sicurezza deve essere di almeno 100 metri, in caso di forte pioggia",
          answer: 0,
          chunks: [
            { it: DISTANZA, fa: DISTANZA_FA },
            { it: "deve essere di almeno 100 metri,", fa: "باید دست‌کم ۱۰۰ متر باشد،", verb: "deve ← dovere", focus: "limit" },
            { it: "in caso di forte pioggia", fa: "در بارانِ شدید", focus: "condition" },
          ],
          translation: "در بارانِ شدید، فاصله‌ی ایمنی باید دست‌کم ۱۰۰ متر باشد.",
          why: "غلط است. باران فاصله را بیشتر می‌کند، ولی قانون برایش عدد نمی‌گذارد. ۱۰۰ متر فقط مالِ وسیله‌هایی است که سبقتشان ممنوع شده.",
        },
      ],
      takeaway: "عدد دیدی؟ بپرس درباره‌ی کیست. ۱۰۰ = وسیله‌هایی که سبقتشان ممنوع شده؛ ۲۰ = برف‌روب و نمک‌پاش. هوا، سرازیری و نوعِ جاده عدد ندارند.",
      rule: `${CDS_149} c.2`,
    },
  ],
  practice: [
    {
      sourceId: "4216",
      textIt: "valore della distanza di sicurezza da mantenere da una macchina sgombraneve in azione è di 20 metri",
      answer: 1,
      chunks: [
        { it: VALORE, fa: VALORE_FA },
        { it: "sgombraneve in azione", fa: "برف‌روبِ در حالِ کار" },
        { it: "è di 20 metri", fa: "۲۰ متر است", verb: "è ← essere" },
      ],
      translation: "مقدارِ فاصله‌ی ایمنی‌ای که باید از ماشینِ برف‌روبِ در حالِ کار نگه داشت، ۲۰ متر است.",
      why: "درست است (قدم ۱). ماده‌ی ۱۴۹ بند ۳: پشتِ برف‌روب یا نمک‌پاشِ در حالِ کار، دست‌کم ۲۰ متر. جمله در بانک بی‌کلمه‌ی اولش («Il») آمده؛ معنایش عوض نمی‌شود.",
      rule: `${CDS_149} c.3`,
      conceptStep: 1,
    },
    {
      sourceId: "4230",
      textIt: "distanza fra autotreni, in presenza di segnali di divieto di sorpasso fra di loro, deve essere pari ad almeno 10 metri",
      answer: 0,
      chunks: [
        { it: "distanza fra autotreni,", fa: "فاصله بینِ autotreniها (خودرو + یدک)،" },
        { it: "in presenza di segnali di divieto di sorpasso fra di loro,", fa: "وقتی تابلوی ممنوعیتِ سبقتِ آن‌ها از یکدیگر هست،", focus: "condition" },
        { it: "deve essere pari ad almeno 10 metri", fa: "باید دست‌کم ۱۰ متر باشد", verb: "deve ← dovere", focus: "contrast" },
      ],
      translation: "وقتی تابلوی ممنوعیتِ سبقتِ autotreniها از یکدیگر هست، فاصله بینِ آن‌ها باید دست‌کم ۱۰ متر باشد.",
      why: "غلط است (قدم ۱). بینِ وسیله‌هایی که سبقتشان ممنوع شده، بیرونِ آبادی، دست‌کم ۱۰۰ متر است، نه ۱۰.",
      rule: `${CDS_149} c.2`,
      conceptStep: 1,
    },
    {
      sourceId: "4332",
      textIt: "La distanza di sicurezza va sempre mantenuta, anche prima di iniziare un sorpasso",
      answer: 1,
      chunks: [
        { it: DISTANZA, fa: DISTANZA_FA },
        { it: "va sempre mantenuta,", fa: "همیشه باید نگه داشته شود،", verb: "va mantenuta ← mantenere", focus: "always" },
        { it: "anche prima di iniziare un sorpasso", fa: "حتی پیش از شروعِ سبقت" },
      ],
      translation: "فاصله‌ی ایمنی همیشه باید نگه داشته شود، حتی پیش از شروعِ سبقت.",
      why: "درست است (قدم ۲). تا وقتی کنار نرفته‌ای، هنوز پشتِ همان خودرویی. چسبیدن به آن برای سبقت یعنی اگر ترمز کند، به آن می‌خوری.",
      rule: `${CDS_149} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "4339",
      textIt: "La distanza di sicurezza può essere diminuita nelle gallerie",
      answer: 0,
      chunks: [
        { it: DISTANZA, fa: DISTANZA_FA },
        { it: "può essere diminuita", fa: "می‌تواند کم شود", verb: "può ← potere" },
        { it: "nelle gallerie", fa: "در تونل‌ها", focus: "condition" },
      ],
      translation: "فاصله‌ی ایمنی در تونل‌ها می‌تواند کم شود.",
      why: "غلط است (قدم ۲). قانون می‌خواهد فاصله «در هر حال» توقفِ به‌موقع را تضمین کند؛ تونل استثنا نیست.",
      rule: `${CDS_149} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "4341",
      textIt:
        "Se il veicolo che precede è un autocarro, si deve diminuire la distanza di sicurezza, in quanto i veicoli pesanti hanno uno spazio di frenatura molto più lungo rispetto agli altri veicoli",
      answer: 0,
      chunks: [
        { it: "Se il veicolo che precede è un autocarro,", fa: "اگر خودروی جلو کامیون باشد،", verb: "precede ← precedere", focus: "condition" },
        { it: "si deve diminuire la distanza di sicurezza,", fa: "باید فاصله‌ی ایمنی را کم کرد،", verb: "si deve ← dovere" },
        { it: "in quanto", fa: "چون", focus: "reason" },
        { it: "i veicoli pesanti hanno uno spazio di frenatura", fa: "وسیله‌های سنگین مسافتِ ترمزی دارند", verb: "hanno ← avere" },
        { it: "molto più lungo rispetto agli altri veicoli", fa: "خیلی بلندتر از بقیه‌ی وسیله‌ها" },
      ],
      translation: "اگر خودروی جلو کامیون باشد، باید فاصله‌ی ایمنی را کم کرد، چون وسیله‌های سنگین مسافتِ ترمزِ خیلی بلندتری از بقیه دارند.",
      why: "غلط است (قدم ۲). دلیلش منطقی به نظر می‌رسد، ولی کامیون هم ممکن است ناگهان بایستد و پشتش جلو را نمی‌بینی. هیچ وسیله‌ای فاصله را کم نمی‌کند.",
      rule: `${CDS_149} c.1`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // the only two numbers (art. 149 c.2–3) and the bank's invented ones
      sourceIds: ["4216", "4217", "4221", "4228", "4229", "4230", "4231", "4247", "4248", "4338"],
    },
    {
      step: 2,
      // when the gap grows and never shrinks; 5693, 5694, 5703 are chapter 17 questions this module already mapped
      sourceIds: ["4250", "4332", "4333", "4339", "4341", "5693", "5694", "5703"],
    },
  ],
};
