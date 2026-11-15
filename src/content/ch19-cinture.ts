/**
 * src/content/ch19-cinture.ts
 * Chapter 19 (Cinture, casco e sicurezza), lessons 1–2: seat belts.
 *  L1 what a belt does in a crash; who wears it and when (everyone, in any
 *     situation of motion — CdS art. 172 c.1). The bank's FALSO statements add
 *     conditions the law does not have: a speed, a distance, the rear seat, an airbag.
 *  L2 approved, intact, never tampered with (c.2, c.11–13); the closed list of
 *     exemptions (c.8): instructors yes, learners, postmen and the elderly no.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter19.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_172 = "Codice della Strada, art. 172";
const PURPOSE = "funzione tecnica del dispositivo";

export const lessonCinturePerche: Lesson = {
  id: "cinture-scopo-obbligo",
  titleFa: "کمربندِ ایمنی: چه می‌کند و چه کسی، کِی",
  titleIt: "CINTURE DI SICUREZZA · SCOPO · OBBLIGO IN OGNI SITUAZIONE",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی کمربندِ ایمنی در تصادف دقیقاً چه می‌کند، و این‌که در خودرویی که کمربند دارد، راننده و همه‌ی سرنشین‌ها، جلو و عقب، در هر حرکتی باید آن را ببندند: هیچ سرعت، مسافت، خیابانِ شهری یا کیسه‌ی هوایی این قاعده را عوض نمی‌کند.",
      why:
        "۱۶ سؤال. تقریباً همه‌ی جمله‌های غلطِ این درس یک «شرطِ ساختگی» به قانون اضافه می‌کنند: «فقط بالای ۳۰ کیلومتر»، «برای عقب فقط توصیه»، «نه برای کمتر از یک کیلومتر»، «نه اگر کیسه‌ی هوا هست». قانون فقط یک جمله دارد: در هر وضعیتِ حرکت.",
      rule: `${CDS_172} c.1`,
    },
    {
      kind: "table",
      title: "کمربند در تصادف چه می‌کند",
      body:
        "در ترمزِ ناگهانی یا تصادف، خودرو می‌ایستد ولی بدنِ تو با همان سرعت به جلو ادامه می‌دهد. کمربند بدن را به صندلی می‌بندد و نیرو را روی استخوان‌های محکم، لگن و قفسه‌ی سینه، پخش می‌کند. کارش کم کردنِ آسیب به راننده و سرنشین‌هاست.",
      columns: ["بدونِ کمربند", "با کمربند"],
      rows: [
        { label: "ترمزِ ناگهانی", it: "frenata improvvisa", values: ["بدن به جلو پرت می‌شود و می‌تواند به شیشه‌ی جلو بخورد.", "بدن روی صندلی می‌ماند."] },
        { label: "داخلِ خودرو", it: "parti interne del veicolo", values: ["سر و سینه به فرمان، داشبورد و شیشه می‌خورند.", "به بخش‌های داخلیِ خودرو نمی‌خوری."] },
        { label: "ضربه‌ی شدید", it: "urto violento", values: ["ممکن است از خودرو بیرون پرت شوی.", "داخلِ خودرو می‌مانی."] },
        { label: "در شهر", it: "circolazione urbana", values: ["تصادف با سرعتِ شهری هم آسیبِ جدی می‌زند.", "در شهر هم همان‌قدر مفید است."] },
      ],
      takeaway: "کمربند بدن را روی صندلی نگه می‌دارد: به داخلِ خودرو نمی‌خوری و بیرون پرت نمی‌شوی. در شهر هم.",
      rule: `${CDS_172} c.1; ${PURPOSE}`,
    },
    {
      kind: "factors",
      title: "همه، در هر حرکت",
      body:
        "قانون می‌گوید راننده و سرنشین‌های خودرویی که کمربند دارد «در هر وضعیتِ حرکت» باید آن را ببندند؛ قبل از راه افتادن، نه بعدش (فصلِ ۱۳). ستونِ اول همین را می‌گوید. جمله‌های ستونِ دوم شرطی اضافه کرده‌اند که در قانون نیست. «که کمربند داشته باشد» یعنی اگر خودرویی اصلاً کمربند ندارد، کسی را برای نبستن جریمه نمی‌کنند.",
      columns: [
        {
          title: "قانون همین را می‌گوید",
          items: [
            {
              fa: "راننده و سرنشین‌ها، هر دو",
              it: "sia dal conducente che dai passeggeri",
              sourceId: "6016",
              textIt: "Le cinture di sicurezza devono essere indossate sia dal conducente che dai passeggeri delle autovetture che ne siano dotate",
              answer: 1,
            },
            {
              fa: "در هر وضعیتِ حرکت",
              it: "in qualsiasi situazione di marcia",
              sourceId: "6022",
              textIt: "Le cinture di sicurezza devono essere utilizzate in qualsiasi situazione di marcia",
              answer: 1,
            },
          ],
        },
        {
          title: "شرطِ ساختگی",
          items: [
            {
              fa: "فقط از ۳۰ کیلومتر بر ساعت به بالا",
              it: "solo se si circola a velocità uguale o superiore a 30 km/h",
              sourceId: "5994",
              textIt: "Le cinture di sicurezza vanno agganciate solo se si circola a velocità uguale o superiore a 30 km/h",
              answer: 0,
            },
            {
              fa: "نه برای کمتر از یک کیلومتر در آبادی",
              it: "tragitti di lunghezza inferiore a un chilometro all’interno dei centri abitati",
              sourceId: "6033",
              textIt: "Non è obbligatorio utilizzare le cinture di sicurezza su una autovettura quando si effettuano tragitti di lunghezza inferiore a un chilometro all’interno dei centri abitati",
              answer: 0,
            },
            {
              fa: "نه اگر کیسه‌ی هوای جلو و بغل هست",
              it: "Se il veicolo è dotato di airbag frontali e laterali",
              sourceId: "5993",
              textIt: "Se il veicolo è dotato di airbag frontali e laterali, si può fare a meno di allacciare la cintura di sicurezza",
              answer: 0,
            },
          ],
        },
      ],
      takeaway: "یک قاعده، بی‌استثنا برای سرعت، مسافت، جای نشستن یا کیسه‌ی هوا. معافیت‌های واقعی فقط برای چند گروهِ مشخص است (درسِ بعد).",
      rule: `${CDS_172} c.1`,
    },
    {
      kind: "classify",
      title: "کمربند لازم است؟",
      body: "هر موقعیت را بخوان. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "obbligatoria", fa: "باید بست" },
        { it: "non obbligatoria", fa: "لازم نیست" },
      ],
      items: [
        { prompt: "در شهر فقط ۵۰۰ متر تا نانوایی می‌روی", answer: 0, explain: "مسافت شرط نیست." },
        { prompt: "در صفِ ترافیک با ۱۰ کیلومتر بر ساعت جلو می‌روی", answer: 0, explain: "سرعت شرط نیست." },
        { prompt: "روی صندلیِ عقبِ سواری نشسته‌ای", answer: 0, explain: "سرنشینِ عقب هم باید ببندد." },
        { prompt: "خودرو هشت کیسه‌ی هوا دارد", answer: 0, explain: "کیسه‌ی هوا کمربند را کامل می‌کند، جایش را نمی‌گیرد." },
        { prompt: "خودرو پارک است و موتور خاموش؛ داخلش منتظر نشسته‌ای", answer: 1, explain: "قانون درباره‌ی حرکت است؛ خودروی پارک‌شده حرکت نمی‌کند." },
        { prompt: "روی صندلیِ عقبِ خودرویی خیلی قدیمی نشسته‌ای که از کارخانه کمربندِ عقب ندارد", answer: 1, explain: "قانون برای صندلی‌هایی است که کمربند دارند. ولی کودکِ زیرِ ۳ سال در چنین خودرویی نباید سوار شود (درس ۴)." },
      ],
      takeaway: "تا وقتی خودرو حرکت می‌کند و صندلی کمربند دارد: بستن.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la cintura di sicurezza", fa: "کمربندِ ایمنی" },
        { it: "allacciare la cintura", base: "allacciare", fa: "کمربند را بستن" },
        { it: "agganciare la cintura", base: "agganciare", fa: "کمربند را قفل کردن (بستن)" },
        { it: "in qualsiasi situazione di marcia", fa: "در هر وضعیتِ حرکت" },
        { it: "i sedili posteriori", fa: "صندلی‌های عقب" },
        { it: "essere proiettati", base: "proiettare", fa: "پرت شدن" },
        { it: "il parabrezza", fa: "شیشه‌ی جلو" },
        { it: "l’urto violento", fa: "ضربه‌ی شدید" },
        { it: "il centro abitato", fa: "آبادی" },
      ],
    },
    {
      kind: "trap",
      title: "«posteriori»: اجباری، نه «توصیه‌شده»",
      body: "هر دو جمله درباره‌ی سرنشینِ صندلیِ عقب است. یکی اجبار می‌گوید، دیگری آن را به توصیه کوچک می‌کند:",
      examples: [
        {
          sourceId: "6023",
          textIt: "Le cinture di sicurezza devono essere utilizzate anche dai passeggeri dei sedili posteriori delle autovetture",
          answer: 1,
          chunks: [
            { it: "Le cinture di sicurezza", fa: "کمربندهای ایمنی" },
            { it: "devono essere utilizzate", fa: "باید استفاده شوند", verb: "devono ← dovere" },
            { it: "anche dai passeggeri dei sedili posteriori", fa: "حتی توسطِ سرنشین‌های صندلی‌های عقب", focus: "always" },
            { it: "delle autovetture", fa: "در سواری‌ها" },
          ],
          translation: "کمربندهای ایمنی باید حتی توسطِ سرنشین‌های صندلی‌های عقبِ سواری‌ها هم استفاده شوند.",
          why: "درست است. قانون همه‌ی سرنشین‌ها را می‌گوید، جلو و عقب.",
        },
        {
          sourceId: "6026",
          textIt: "Non è obbligatorio, ma è consigliato, indossare le cinture di sicurezza se si occupano i posti posteriori di una autovettura",
          answer: 0,
          chunks: [
            { it: "Non è obbligatorio,", fa: "اجباری نیست،", verb: "è ← essere", focus: "negation" },
            { it: "ma è consigliato,", fa: "ولی توصیه می‌شود،", verb: "è consigliato ← consigliare", focus: "contrast" },
            { it: "indossare le cinture di sicurezza", fa: "کمربندِ ایمنی بستن" },
            { it: "se si occupano i posti posteriori", fa: "اگر روی صندلی‌های عقب نشسته‌ای", verb: "si occupano ← occupare", focus: "condition" },
            { it: "di una autovettura", fa: "یک سواری" },
          ],
          translation: "اگر روی صندلی‌های عقبِ یک سواری نشسته‌ای، بستنِ کمربندِ ایمنی اجباری نیست ولی توصیه می‌شود.",
          why: "غلط است. برای عقب هم اجباری است؛ «توصیه» قانون را کوچک کرده است.",
        },
      ],
      takeaway: "در جمله‌های کمربند، «consigliato» یا «non è obbligatorio» برای یک سرنشینِ عادی همیشه غلط است.",
      rule: `${CDS_172} c.1`,
    },
  ],
  practice: [
    {
      sourceId: "5992",
      textIt: "Se non si allaccia la cintura di sicurezza, in caso d'improvvisa frenata si può essere proiettati contro il parabrezza",
      answer: 1,
      chunks: [
        { it: "Se non si allaccia la cintura di sicurezza,", fa: "اگر کمربندِ ایمنی را نبندی،", verb: "si allaccia ← allacciare", focus: "condition" },
        { it: "in caso d'improvvisa frenata", fa: "در ترمزِ ناگهانی" },
        { it: "si può essere proiettati contro il parabrezza", fa: "ممکن است به شیشه‌ی جلو پرت شوی", verb: "si può ← potere" },
      ],
      translation: "اگر کمربندِ ایمنی را نبندی، در ترمزِ ناگهانی ممکن است به شیشه‌ی جلو پرت شوی.",
      why: "درست است (قدم ۱). خودرو می‌ایستد ولی بدن با همان سرعت به جلو می‌رود؛ کمربند همین حرکت را نگه می‌دارد.",
      rule: `${CDS_172} c.1; ${PURPOSE}`,
      conceptStep: 1,
    },
    {
      sourceId: "6032",
      textIt: "Le cinture di sicurezza sono di utilità trascurabile nella circolazione urbana",
      answer: 0,
      chunks: [
        { it: "Le cinture di sicurezza", fa: "کمربندهای ایمنی" },
        { it: "sono di utilità trascurabile", fa: "فایده‌ی ناچیزی دارند", verb: "sono ← essere", focus: "contrast" },
        { it: "nella circolazione urbana", fa: "در رانندگیِ شهری", focus: "condition" },
      ],
      translation: "کمربندهای ایمنی در رانندگیِ شهری فایده‌ی ناچیزی دارند.",
      why: "غلط است (قدم ۱). تصادف با سرعتِ شهری هم بدن را به جلو پرت می‌کند؛ کمربند در شهر هم همان کار را می‌کند.",
      rule: `${CDS_172} c.1; ${PURPOSE}`,
      conceptStep: 1,
    },
    {
      sourceId: "6025",
      textIt: "Non è obbligatorio utilizzare le cinture di sicurezza su una autovettura quando si circola ad una velocità inferiore ai 30 km/h",
      answer: 0,
      chunks: [
        { it: "Non è obbligatorio", fa: "اجباری نیست", verb: "è ← essere", focus: "negation" },
        { it: "utilizzare le cinture di sicurezza su una autovettura", fa: "استفاده از کمربندِ ایمنی در سواری" },
        { it: "quando si circola ad una velocità inferiore ai 30 km/h", fa: "وقتی با سرعتِ کمتر از ۳۰ کیلومتر بر ساعت می‌رانی", verb: "si circola ← circolare", focus: "limit" },
      ],
      translation: "وقتی با سرعتِ کمتر از ۳۰ کیلومتر بر ساعت می‌رانی، استفاده از کمربندِ ایمنی در سواری اجباری نیست.",
      why: "غلط است (قدم ۲). قانون عددی ندارد: «در هر وضعیتِ حرکت». ۳۰ کیلومتر شرطِ ساختگیِ بانک است.",
      rule: `${CDS_172} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "6028",
      textIt: "Non è obbligatorio l’uso delle cinture di sicurezza sui veicoli muniti di air-bag",
      answer: 0,
      chunks: [
        { it: "Non è obbligatorio l’uso delle cinture di sicurezza", fa: "استفاده از کمربندِ ایمنی اجباری نیست", verb: "è ← essere", focus: "negation" },
        { it: "sui veicoli muniti di air-bag", fa: "در وسایلِ نقلیه‌ای که کیسه‌ی هوا دارند", focus: "condition" },
      ],
      translation: "در وسایلِ نقلیه‌ای که کیسه‌ی هوا دارند، استفاده از کمربندِ ایمنی اجباری نیست.",
      why: "غلط است (قدم ۲). کیسه‌ی هوا کنارِ کمربند کار می‌کند و جایش را نمی‌گیرد (درس ۳). کمربند همچنان اجباری است.",
      rule: `${CDS_172} c.1`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["5992", "6015", "6019", "6020", "6021", "6032"] },
    { step: 2, sourceIds: ["5993", "5994", "5997", "6016", "6022", "6023", "6025", "6026", "6028", "6033"] },
  ],
};

export const lessonCintureEsenzioni: Lesson = {
  id: "cinture-efficienza-esenzioni",
  titleFa: "کمربندِ سالم و دست‌نخورده، و کسانی که معاف‌اند",
  titleIt: "CINTURE · OMOLOGAZIONE E MANUTENZIONE · ESENZIONI",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی کمربند باید تأییدشده و سالم بماند و کسی حق ندارد کارش را مختل کند (نه گیره، نه خاموش کردنِ چراغِ نشانگر، نه دست بردن در جمع‌کن)، و دقیقاً چه کسانی از بستنِ آن معاف‌اند: فهرستی کوتاه که سن، شغلِ معمولی و مجوزِ تمرین در آن نیست.",
      why:
        "۱۴ سؤال. بانک دو جور دام دارد: «ترفندهای راحتی» (گیره برای آدمِ درشت‌اندام، خاموش کردنِ چراغ، دست بردن در جمع‌کن) که همه ممنوع‌اند، و «معافیت‌های ساختگی» (پستچی، بالای ۶۵ یا ۷۰ سال، هنرجو با foglio rosa) کنارِ معافیت‌های واقعی (مربی، بیماری یا بارداری با گواهی).",
      rule: `${CDS_172} c.2, c.8, c.11`,
    },
    {
      kind: "table",
      title: "تأییدشده، سالم، دست‌نخورده",
      body:
        "قانون دو چیز می‌خواهد: کمربند از نوعِ تأییدشده باشد، و راننده مطمئن شود همیشه درست کار می‌کند. هر چیزی که کارِ عادی‌اش را مختل کند جریمه دارد، حتی اگر کمربند را بسته باشی.",
      columns: ["قاعده"],
      rows: [
        { label: "تأییدشده", it: "di tipo omologato", values: ["فقط کمربندِ تأییدشده. وسیله‌ی نگه‌دارنده‌ی تأییدنشده، حتی نصب‌شده، توقیف می‌شود."] },
        { label: "بازدیدِ دوره‌ای", it: "stato di usura e di efficienza", values: ["گاه‌به‌گاه نوار (پارگی، ساییدگی)، قفل و جمع شدنش را بررسی کن."] },
        { label: "دست نزن", it: "alterare od ostacolare il normale funzionamento", values: ["گیره‌ای که کمربند را شل نگه دارد یا دست بردن در جمع‌کن، حتی برای راحتیِ سرنشین: ممنوع و جریمه‌دار، با کمربندِ بسته هم."] },
        { label: "آدمِ درشت‌اندام", it: "persone obese", values: ["برای او هم کمربند باید به بدن بچسبد. وسیله‌ای که کمربند را از بدن دور نگه دارد ممنوع است."] },
        { label: "چراغِ نشانگر", it: "spia delle cinture", values: ["راننده کلیدی روی داشبورد ندارد که چراغِ کمربند را خاموش کند؛ راه حل بستنِ کمربند است (فصلِ ۱۸)."] },
      ],
      takeaway: "کمربند باید به بدن بچسبد و آزادانه جمع شود. هر چیزی که این را عوض کند، دست‌کاری است.",
      rule: `${CDS_172} c.1–2, c.11–13`,
    },
    {
      kind: "table",
      title: "معافیت‌ها: فقط این فهرست",
      body:
        "قانون فهرستی بسته از معاف‌ها دارد. اگر کسی در این فهرست نیست، معاف نیست: سن، تجربه یا شغل به‌تنهایی معافیت نمی‌آورد.",
      columns: ["معاف؟"],
      rows: [
        { label: "پلیس، آتش‌نشانی، آمبولانس", it: "servizio di emergenza", values: ["معاف، فقط در مأموریتِ اضطراری."] },
        { label: "مربیِ رانندگی", it: "istruttori di guida", values: ["معاف، وقتی کنارِ هنرجو کارِ آموزش را انجام می‌دهد."] },
        { label: "بیماریِ خاص", it: "particolari malattie certificate", values: ["معاف، با گواهیِ پزشکی که بستنِ کمربند را برایش منع کرده باشد."] },
        { label: "بارداری", it: "stato di gravidanza", values: ["معاف، فقط با گواهیِ پزشکِ زنان درباره‌ی خطرِ خاص. بارداری به‌تنهایی معافیت نیست."] },
        { label: "چند گروهِ دیگر", it: "igiene ambientale · scorte · passeggeri in piedi", values: ["خودروهای جمع‌آوریِ زباله در شهر، نگهبان‌های اسکورت، مسافرِ ایستاده‌ی اتوبوسِ شهری: معاف."] },
        { label: "پستچی", it: "postino", values: ["معاف نیست."] },
        { label: "سالمند", it: "persone anziane (65, 70 anni)", values: ["معاف نیست؛ قانون هیچ معافیتِ سنی ندارد."] },
        { label: "هنرجو با مجوزِ تمرین", it: "foglio rosa", values: ["معاف نیست. مربی معاف است، هنرجویی که پشتِ فرمان است نه."] },
      ],
      takeaway: "معافیت یعنی اضطرار، آموزش دادن، یا گواهیِ پزشکی. سن، شغلِ معمولی و foglio rosa در فهرست نیستند.",
      rule: `${CDS_172} c.8`,
    },
    {
      kind: "classify",
      title: "معاف است یا نه؟",
      body: "هر شخص را بخوان. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "esente", fa: "معاف" },
        { it: "obbligato", fa: "باید ببندد" },
      ],
      items: [
        { prompt: "مربیِ رانندگی، در کلاسِ عملی کنارِ هنرجو", answer: 0, explain: "در فهرستِ قانون است." },
        { prompt: "هنرجویی که با foglio rosa پشتِ فرمان است", answer: 1, explain: "معافیت مالِ مربی است، نه هنرجو." },
        { prompt: "سرنشینِ ۷۲ ساله‌ی صندلیِ جلو", answer: 1, explain: "سن معافیت نمی‌آورد." },
        { prompt: "زنِ باردار با گواهیِ پزشکِ زنان درباره‌ی خطرِ خاص", answer: 0, explain: "گواهی شرطِ معافیت است." },
        { prompt: "پستچی وسطِ پخشِ نامه‌ها", answer: 1, explain: "شغلش در فهرست نیست." },
        { prompt: "خدمه‌ی آمبولانس در راهِ یک مأموریتِ فوری", answer: 0, explain: "اضطرار در فهرست است." },
      ],
      takeaway: "اول بپرس: این شخص در فهرستِ قانون هست؟ اگر نیست، باید ببندد.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "di tipo omologato", fa: "تأییدشده" },
        { it: "l’arrotolatore", fa: "جمع‌کنِ کمربند" },
        { it: "alterare il funzionamento", base: "alterare", fa: "کارِ چیزی را مختل کردن" },
        { it: "la spia", fa: "چراغِ نشانگر" },
        { it: "non essere tenuto", base: "tenere", fa: "موظف نبودن" },
        { it: "l’istruttore di guida", fa: "مربیِ رانندگی" },
        { it: "il foglio rosa", fa: "مجوزِ تمرینِ رانندگی" },
        { it: "lo stato di gravidanza", fa: "بارداری" },
        { it: "certificato", fa: "با گواهی" },
      ],
    },
    {
      kind: "trap",
      title: "«non è obbligato»: مربی آری، هنرجو نه",
      body: "هر دو جمله می‌گویند کسی موظف به بستنِ کمربند نیست. یکی در فهرستِ قانون است، دیگری نه:",
      examples: [
        {
          sourceId: "6004",
          textIt: "Gli istruttori di guida nello svolgimento della loro professione non sono obbligati ad agganciare la cintura di sicurezza",
          answer: 1,
          chunks: [
            { it: "Gli istruttori di guida", fa: "مربی‌های رانندگی" },
            { it: "nello svolgimento della loro professione", fa: "هنگامِ انجامِ کارِ حرفه‌ای‌شان", focus: "condition" },
            { it: "non sono obbligati", fa: "موظف نیستند", verb: "sono ← essere", focus: "negation" },
            { it: "ad agganciare la cintura di sicurezza", fa: "کمربندِ ایمنی ببندند" },
          ],
          translation: "مربی‌های رانندگی هنگامِ انجامِ کارِ حرفه‌ای‌شان موظف نیستند کمربندِ ایمنی ببندند.",
          why: "درست است. مربی هنگامِ آموزش در فهرستِ معاف‌هاست.",
        },
        {
          sourceId: "6007",
          textIt: "Chi guida un’autovettura munito di autorizzazione ad esercitarsi alla guida (foglio rosa), non è obbligato ad utilizzare la cintura di sicurezza",
          answer: 0,
          chunks: [
            { it: "Chi guida un’autovettura", fa: "کسی که سواری می‌راند", verb: "guida ← guidare" },
            { it: "munito di autorizzazione ad esercitarsi alla guida (foglio rosa),", fa: "با مجوزِ تمرینِ رانندگی (foglio rosa)،", focus: "condition" },
            { it: "non è obbligato", fa: "موظف نیست", verb: "è ← essere", focus: "negation" },
            { it: "ad utilizzare la cintura di sicurezza", fa: "از کمربندِ ایمنی استفاده کند" },
          ],
          translation: "کسی که با مجوزِ تمرینِ رانندگی (foglio rosa) سواری می‌راند، موظف نیست از کمربندِ ایمنی استفاده کند.",
          why: "غلط است. معافیت برای مربی است؛ هنرجویی که پشتِ فرمان است مثلِ هر راننده‌ی دیگری کمربند می‌بندد.",
        },
      ],
      takeaway: "در جمله‌های معافیت فقط یک سؤال: این شخص در فهرستِ قانون هست؟",
      rule: `${CDS_172} c.8 lett. d`,
    },
  ],
  practice: [
    {
      sourceId: "5991",
      textIt: "Sono previste sanzioni per chi, pur facendo uso della cintura di sicurezza, ne alteri o ostacoli il normale funzionamento",
      answer: 1,
      chunks: [
        { it: "Sono previste sanzioni", fa: "جریمه پیش‌بینی شده است", verb: "sono previste ← prevedere" },
        { it: "per chi,", fa: "برای کسی که،" },
        { it: "pur facendo uso della cintura di sicurezza,", fa: "با وجودِ استفاده از کمربندِ ایمنی،", verb: "facendo ← fare", focus: "contrast" },
        { it: "ne alteri o ostacoli il normale funzionamento", fa: "کارِ عادیِ آن را مختل کند یا مانعش شود", verb: "alteri ← alterare" },
      ],
      translation: "برای کسی که با وجودِ استفاده از کمربندِ ایمنی، کارِ عادیِ آن را مختل کند یا مانعش شود، جریمه پیش‌بینی شده است.",
      why: "درست است (قدم ۱). قانون جدا از «نبستن»، برای «دست‌کاری با کمربندِ بسته» هم جریمه گذاشته است.",
      rule: `${CDS_172} c.11`,
      conceptStep: 1,
    },
    {
      sourceId: "6029",
      textIt: "La spia che indica il mancato agganciamento delle cinture può essere disabilitata dal conducente con apposito comando posto sul cruscotto",
      answer: 0,
      chunks: [
        { it: "La spia", fa: "چراغِ نشانگری" },
        { it: "che indica il mancato agganciamento delle cinture", fa: "که نبستنِ کمربندها را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "può essere disabilitata dal conducente", fa: "می‌تواند توسطِ راننده غیرفعال شود", verb: "può ← potere", focus: "contrast" },
        { it: "con apposito comando posto sul cruscotto", fa: "با کلیدِ مخصوصی روی داشبورد" },
      ],
      translation: "چراغِ نشانگری که نبستنِ کمربندها را نشان می‌دهد، می‌تواند توسطِ راننده با کلیدِ مخصوصی روی داشبورد غیرفعال شود.",
      why: "غلط است (قدم ۱). چنین کلیدی برای راننده نیست؛ چراغ برای این است که کمربند بسته شود، نه این‌که خاموشش کنی.",
      rule: `${CDS_172} c.2, c.11`,
      conceptStep: 1,
    },
    {
      sourceId: "6003",
      textIt: "Le persone che soffrono di particolari malattie certificate non sono tenute ad agganciare la cintura di sicurezza",
      answer: 1,
      chunks: [
        { it: "Le persone", fa: "کسانی" },
        { it: "che soffrono di particolari malattie certificate", fa: "که بیماری‌های خاصِ دارای گواهی دارند", verb: "soffrono ← soffrire", focus: "condition" },
        { it: "non sono tenute", fa: "موظف نیستند", verb: "sono ← essere", focus: "negation" },
        { it: "ad agganciare la cintura di sicurezza", fa: "کمربندِ ایمنی ببندند" },
      ],
      translation: "کسانی که بیماری‌های خاصِ دارای گواهی دارند، موظف نیستند کمربندِ ایمنی ببندند.",
      why: "درست است (قدم ۲). گواهیِ پزشکی که بستنِ کمربند را منع کند در فهرستِ معافیت‌هاست.",
      rule: `${CDS_172} c.8 lett. e`,
      conceptStep: 2,
    },
    {
      sourceId: "6005",
      textIt: "Il postino, durante l'attività lavorativa, non ha l'obbligo di agganciare la cintura di sicurezza",
      answer: 0,
      chunks: [
        { it: "Il postino,", fa: "پستچی،" },
        { it: "durante l'attività lavorativa,", fa: "هنگامِ کار،", focus: "condition" },
        { it: "non ha l'obbligo", fa: "موظف نیست", verb: "ha ← avere", focus: "negation" },
        { it: "di agganciare la cintura di sicurezza", fa: "کمربندِ ایمنی ببندد" },
      ],
      translation: "پستچی هنگامِ کار موظف نیست کمربندِ ایمنی ببندد.",
      why: "غلط است (قدم ۲). پستچی در فهرستِ معاف‌ها نیست؛ شغل به‌تنهایی معافیت نمی‌آورد.",
      rule: `${CDS_172} c.8`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["5991", "6017", "6018", "6024", "6029", "6030", "6031"] },
    { step: 2, sourceIds: ["6002", "6003", "6004", "6005", "6006", "6007", "6027"] },
  ],
};
