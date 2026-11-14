/**
 * src/content/ch16-ripasso.ts
 * Chapter 16 (Fermata, sosta, arresto): the chapter review. Fourteen real
 * bank questions, two per lesson in lesson order, none shown inside a lesson;
 * a mistake routes back to the lesson section that teaches it
 * (tests/chapter16.test.ts).
 */
import type { Lesson } from "./lessons.js";

const SCIVOLI = "La sosta in corrispondenza degli scivoli o dei raccordi tra i marciapiedi e la carreggiata utilizzati dai veicoli per persone invalide";
const SCIVOLI_FA = "پارک جلوی سرازیری‌ها یا اتصال‌های پیاده‌رو به سواره‌رو که خودروهای معلولان از آن‌ها استفاده می‌کنند";

export const reviewFermataSosta: Lesson = {
  id: "ripasso-capitolo-16",
  titleFa: "مرور فصل ۱۶",
  titleIt: "RIPASSO · FERMATA, SOSTA, ARRESTO",
  minutes: 5,
  signs: [],
  review: true,
  steps: [
    {
      kind: "intro",
      title: "مرور فصل",
      objective:
        "چهارده سؤالِ واقعی از بانک، دو تا از هر درس. هیچ‌کدام را در درس‌ها ندیده‌ای، پس این مرور نشان می‌دهد چه چیزی واقعاً در ذهنت مانده است.",
      why: "تقریباً هر سؤالِ این فصل یکی از سه چیز را می‌پرسد: «این fermata است یا sosta؟»، «این جا در کدام فهرست است: هر دو ممنوع، فقط پارک، یا هیچ‌کدام؟» و «شرطِ جمله (همیشه، فقط، اگر کوتاه باشد) با قانون می‌خواند؟». سؤالی که این‌جا اشتباه کنی به فهرستِ مرورت اضافه می‌شود و به بخشِ درسِ مربوطش وصل است.",
    },
    {
      kind: "table",
      title: "فصل ۱۶ در هفت خط",
      body: "قبل از سؤال‌ها، نکته‌ی اصلیِ هر درس را یک بار دیگر ببین. اگر جایی برایت تازه بود، اول همان درس را دوباره باز کن.",
      columns: ["نکته‌ی اصلی"],
      rows: [
        { label: "درس ۱", it: "arresto · fermata · sosta", values: ["ترافیک = ایستادن؛ کارِ کوتاه و راننده سرِ جایش = توقف کوتاه؛ راننده می‌رود = پارک؛ خرابی یا حالِ بد = توقفِ اضطراری. توقف کوتاه عدد ندارد و مزاحم نمی‌شود"] },
        { label: "درس ۲", it: "margine destro · disco orario", values: ["داخلِ آبادی لبه‌ی راست، بی‌پیاده‌رو ۱ متر برای عابر؛ بیرونِ آبادی بیرون از سواره‌رو، نه روی مسیرِ دوچرخه یا شانه. چپِ یک‌طرفه با ۳ متر. دیسک: ساعتِ رسیدن"] },
        { label: "درس ۳", it: "fermata e sosta vietate", values: ["ریل، تونل، زیرگذر، برآمدگی، پیچ، تابلوی پوشیده، تقاطع (داخلِ آبادی ۵ متر)، گذرگاه عابر، مسیرِ دوچرخه، پیاده‌رو: هیچ‌کدام"] },
        { label: "درس ۴", it: "solo sosta vietata", values: ["ورودیِ خودرو به ملک، ردیفِ دوم، اتوبوس و تاکسی، بازار، پمپ‌بنزین (ساعتِ کار)، سطلِ زباله: فقط پارک. توقف کوتاه آن‌جا مجاز است"] },
        { label: "درس ۵", it: "spazi riservati · punti", values: ["جای معلولان، خطِ ویژه، منطقه‌ی عابر، ZTL: پارک نه، کوتاه هم نه. اتوبوس، خطِ ویژه و معلولان امتیاز هم کم می‌کنند"] },
        { label: "درس ۶", it: "cautele · portiere", values: ["ترمزِ دستی و دنده‌ی سبک در هر شیبی، چرخ به پیاده‌رو در شیبِ تند، موتور خاموش. پیش از باز کردنِ در: سمتِ خیابان وسیله‌ها، سمتِ پیاده‌رو عابرها"] },
        { label: "درس ۷", it: "prima di guidare", values: ["صندلی، آینه، فرمان‌ها، کمربندها؛ مدارک، ردیفِ گواهینامه، خودروی سالم و بارِ محکم، برای هر سفر"] },
      ],
      takeaway: "در هر جمله بپرس: fermata یا sosta؟ این جا در کدام فهرست است؟ شرطِ جمله را قانون نوشته یا بانک ساخته؟",
    },
  ],
  practice: [
    {
      sourceId: "5321",
      textIt: "La fermata di un veicolo è la temporanea sospensione della marcia per consentire la salita o la discesa delle persone",
      answer: 1,
      chunks: [
        { it: "La fermata di un veicolo è la temporanea sospensione della marcia", fa: "توقف کوتاهِ یک وسیله یعنی قطعِ موقتِ حرکت", verb: "è ← essere" },
        { it: "per consentire la salita o la discesa delle persone", fa: "برای سوار یا پیاده شدنِ آدم‌ها", focus: "reason" },
      ],
      translation: "توقف کوتاهِ یک وسیله یعنی قطعِ موقتِ حرکت برای این‌که آدم‌ها سوار یا پیاده شوند.",
      why: "درست است (درس ۱). سوار و پیاده کردن مثالِ اصلیِ توقف کوتاه است.",
      rule: "Codice della Strada, art. 157 c.1 lett. b",
      conceptStep: 1,
    },
    {
      sourceId: "5335",
      textIt: "La fermata di un veicolo è sempre consentita per chiedere informazioni agli agenti del traffico",
      answer: 0,
      chunks: [
        { it: "La fermata di un veicolo è sempre consentita", fa: "توقف کوتاهِ یک وسیله همیشه مجاز است", verb: "è consentita ← consentire", focus: "always" },
        { it: "per chiedere informazioni agli agenti del traffico", fa: "برای پرسیدن از مأمورانِ راهنمایی", focus: "reason" },
      ],
      translation: "توقف کوتاهِ یک وسیله برای پرسیدن از مأمورانِ راهنمایی همیشه مجاز است.",
      why: "غلط است (درس ۱). «همیشه» نه: اگر ترافیک را کند یا مزاحم کند، مجاز نیست.",
      rule: "Codice della Strada, art. 157 c.1 lett. b",
      conceptStep: 2,
    },
    {
      sourceId: "5393",
      textIt:
        "Fuori dei centri abitati, in caso di impossibilità a collocare il veicolo fuori della carreggiata, il conducente deve sostare il più vicino possibile al margine destro della carreggiata",
      answer: 1,
      chunks: [
        { it: "Fuori dei centri abitati,", fa: "بیرونِ آبادی،" },
        { it: "in caso di impossibilità a collocare il veicolo fuori della carreggiata,", fa: "اگر نشود خودرو را بیرون از سواره‌رو گذاشت،", focus: "condition" },
        { it: "il conducente deve sostare", fa: "راننده باید پارک کند", verb: "deve sostare ← sostare" },
        { it: "il più vicino possibile al margine destro della carreggiata", fa: "تا جای ممکن نزدیکِ لبه‌ی راستِ سواره‌رو" },
      ],
      translation: "بیرونِ آبادی، اگر نشود خودرو را بیرون از سواره‌رو گذاشت، راننده باید تا جای ممکن نزدیکِ لبه‌ی راستِ سواره‌رو پارک کند.",
      why: "درست است (درس ۲). اول بیرون از سواره‌رو؛ اگر نشد، لبه‌ی راست.",
      rule: "Codice della Strada, art. 157 c.3",
      conceptStep: 1,
    },
    {
      sourceId: "5299",
      textIt: "Se si parcheggia in una zona regolamentata mediante disco orario, bisogna trascrivere su un foglio di carta l'ora di arrivo, senza indicare i minuti",
      answer: 0,
      chunks: [
        { it: "Se si parcheggia in una zona regolamentata mediante disco orario,", fa: "اگر در منطقه‌ای با دیسکِ ساعت پارک کنی،", verb: "si parcheggia ← parcheggiare", focus: "condition" },
        { it: "bisogna trascrivere su un foglio di carta l'ora di arrivo,", fa: "باید ساعتِ رسیدن را روی یک برگ کاغذ نوشت،", verb: "bisogna ← bisognare", focus: "contrast" },
        { it: "senza indicare i minuti", fa: "بدونِ نوشتنِ دقیقه", focus: "negation" },
      ],
      translation: "اگر در منطقه‌ای با دیسکِ ساعت پارک کنی، باید ساعتِ رسیدن را بدونِ دقیقه روی یک برگ کاغذ نوشت.",
      why: "غلط است (درس ۲). ساعتِ رسیدن را روی خودِ دیسک می‌گذاری، طوری که خوب دیده شود؛ نه روی کاغذ، و نه بدونِ دقیقه.",
      rule: "Codice della Strada, art. 157 c.6",
      conceptStep: 3,
    },
    {
      sourceId: "5410",
      textIt: "Fuori dai centri abitati e sulle strade urbane di scorrimento, la sosta è vietata in prossimità dei dossi",
      answer: 1,
      chunks: [
        { it: "Fuori dai centri abitati e sulle strade urbane di scorrimento,", fa: "بیرونِ آبادی و در خیابان‌های شهریِ پرسرعت،" },
        { it: "la sosta è vietata", fa: "پارک ممنوع است", verb: "è vietata ← vietare" },
        { it: "in prossimità dei dossi", fa: "نزدیکِ برآمدگی‌ها" },
      ],
      translation: "بیرونِ آبادی و در خیابان‌های شهریِ پرسرعت، پارک نزدیکِ برآمدگی‌ها ممنوع است.",
      why: "درست است (درس ۳). روی برآمدگی همه‌جا ممنوع است؛ «نزدیکش» دقیقاً همین دو نوع جاده.",
      rule: "Codice della Strada, art. 158 c.1 lett. c",
      conceptStep: 1,
    },
    {
      sourceId: "5426",
      textIt: "La sosta ma non la fermata è vietata sugli attraversamenti pedonali",
      answer: 0,
      chunks: [
        { it: "La sosta ma non la fermata", fa: "پارک، ولی نه توقف کوتاه،", focus: "contrast" },
        { it: "è vietata", fa: "ممنوع است", verb: "è vietata ← vietare" },
        { it: "sugli attraversamenti pedonali", fa: "روی گذرگاه‌های عابر پیاده" },
      ],
      translation: "روی گذرگاه‌های عابر پیاده پارک ممنوع است، ولی توقف کوتاه نه.",
      why: "غلط است (درس ۳). گذرگاه عابر در فهرستِ اول است: توقف کوتاه هم ممنوع.",
      rule: "Codice della Strada, art. 158 c.1 lett. g",
      conceptStep: 2,
    },
    {
      sourceId: "5433",
      textIt:
        "La sosta è vietata a meno di 15 metri dal segnale di fermata di autobus, filobus e veicoli circolanti su rotaia, qualora gli spazi di stazionamento non siano delimitati",
      answer: 1,
      chunks: [
        { it: "La sosta è vietata", fa: "پارک ممنوع است", verb: "è vietata ← vietare" },
        { it: "a meno di 15 metri", fa: "در کمتر از ۱۵ متر", focus: "limit" },
        { it: "dal segnale di fermata di autobus, filobus e veicoli circolanti su rotaia,", fa: "از تابلوی ایستگاهِ اتوبوس، اتوبوس برقی و وسیله‌های ریلی،" },
        { it: "qualora gli spazi di stazionamento non siano delimitati", fa: "اگر جای ایستادنشان خط‌کشی نشده باشد", verb: "siano delimitati ← delimitare", focus: "condition" },
      ],
      translation: "اگر جای ایستادنِ اتوبوس، اتوبوس برقی و وسیله‌های ریلی خط‌کشی نشده باشد، پارک در کمتر از ۱۵ متر از تابلوی ایستگاهشان ممنوع است.",
      why: "درست است (درس ۴). بی‌خط‌کشی، ۱۵ متر از تابلو جای اتوبوس حساب می‌شود.",
      rule: "Codice della Strada, art. 158 c.2 lett. d",
      conceptStep: 1,
    },
    {
      sourceId: "5374",
      textIt: "La fermata è sempre vietata in seconda fila",
      answer: 0,
      chunks: [
        { it: "La fermata è sempre vietata", fa: "توقف کوتاه همیشه ممنوع است", verb: "è vietata ← vietare", focus: "always" },
        { it: "in seconda fila", fa: "در ردیفِ دوم" },
      ],
      translation: "توقف کوتاه در ردیفِ دوم همیشه ممنوع است.",
      why: "غلط است (درس ۴). قانون پارک در ردیفِ دوم را ممنوع کرده، نه توقف کوتاه را؛ توقف کوتاه فقط اگر مزاحمِ ترافیک شود ممنوع است.",
      rule: "Codice della Strada, art. 158 c.1–2; art. 157 c.1 lett. b",
      conceptStep: 2,
    },
    {
      sourceId: "5441",
      textIt: "La sosta è vietata in corrispondenza degli scivoli o dei raccordi tra i marciapiedi e la carreggiata utilizzati dai veicoli per persone invalide",
      answer: 1,
      chunks: [
        { it: "La sosta è vietata", fa: "پارک ممنوع است", verb: "è vietata ← vietare" },
        { it: "in corrispondenza degli scivoli o dei raccordi tra i marciapiedi e la carreggiata", fa: "جلوی سرازیری‌ها یا اتصال‌های پیاده‌رو به سواره‌رو" },
        { it: "utilizzati dai veicoli per persone invalide", fa: "که خودروهای معلولان از آن‌ها استفاده می‌کنند" },
      ],
      translation: "پارک جلوی سرازیری‌ها یا اتصال‌های پیاده‌رو به سواره‌رو که خودروهای معلولان از آن‌ها استفاده می‌کنند ممنوع است.",
      why: "درست است (درس ۵). سرازیری راهِ معلول از خودرو به پیاده‌روست؛ پارک جلویش ممنوع است.",
      rule: "Codice della Strada, art. 158 c.2 lett. g",
      conceptStep: 1,
    },
    {
      sourceId: "5466",
      textIt: `${SCIVOLI}, comporta la sospensione della patente`,
      answer: 0,
      chunks: [
        { it: `${SCIVOLI},`, fa: `${SCIVOLI_FA}،` },
        { it: "comporta la sospensione della patente", fa: "باعثِ تعلیقِ گواهینامه می‌شود", verb: "comporta ← comportare", focus: "contrast" },
      ],
      translation: `${SCIVOLI_FA}، باعثِ تعلیقِ گواهینامه می‌شود.`,
      why: "غلط است (درس ۵). جریمه دارد و امتیاز کم می‌کند، ولی تعلیقِ گواهینامه نه.",
      rule: "Codice della Strada, art. 158 c.2 lett. g; art. 126-bis (tabella dei punteggi)",
      conceptStep: 2,
    },
    {
      sourceId: "5382",
      textIt:
        "Durante la sosta nelle strade a forte pendenza, è opportuno che il conducente azioni il freno di stazionamento, inserisca il rapporto più basso del cambio di velocità e lasci il veicolo con le ruote sterzate verso il marciapiede",
      answer: 1,
      chunks: [
        { it: "Durante la sosta nelle strade a forte pendenza,", fa: "هنگامِ پارک در خیابان‌های پرشیب،", focus: "condition" },
        { it: "è opportuno che il conducente azioni il freno di stazionamento,", fa: "بهتر است راننده ترمزِ دستی را بکشد،", verb: "azioni ← azionare" },
        { it: "inserisca il rapporto più basso del cambio di velocità", fa: "سبک‌ترین دنده را بگذارد", verb: "inserisca ← inserire" },
        { it: "e lasci il veicolo con le ruote sterzate verso il marciapiede", fa: "و خودرو را با چرخ‌های چرخانده به سمتِ پیاده‌رو رها کند", verb: "lasci ← lasciare" },
      ],
      translation: "هنگامِ پارک در خیابان‌های پرشیب، بهتر است راننده ترمزِ دستی را بکشد، سبک‌ترین دنده را بگذارد و چرخ‌ها را به سمتِ پیاده‌رو بچرخاند.",
      why: "درست است (درس ۶). اگر خودرو راه بیفتد، چرخِ چرخانده به لبه‌ی پیاده‌رو می‌خورد و می‌ایستد.",
      rule: "Codice della Strada, art. 158 c.4",
      conceptStep: 1,
    },
    {
      sourceId: "5479",
      textIt: "L'apertura di uno sportello del veicolo dal lato del marciapiede comporta l'obbligo di attivare l'indicatore di direzione da quel lato",
      answer: 0,
      chunks: [
        { it: "L'apertura di uno sportello del veicolo dal lato del marciapiede", fa: "باز کردنِ یک درِ وسیله در سمتِ پیاده‌رو" },
        { it: "comporta l'obbligo di attivare l'indicatore di direzione da quel lato", fa: "این وظیفه را می‌آورد که چراغ راهنمای همان سمت روشن شود", verb: "comporta ← comportare", focus: "contrast" },
      ],
      translation: "باز کردنِ یک درِ وسیله در سمتِ پیاده‌رو این وظیفه را می‌آورد که چراغ راهنمای همان سمت را روشن کنی.",
      why: "غلط است (درس ۶). چراغ راهنما برای تغییرِ مسیر است، نه برای باز کردنِ در. کارِ تو نگاه کردن به عابرهاست.",
      rule: "Codice della Strada, art. 157 c.7",
      conceptStep: 2,
    },
    {
      sourceId: "5316",
      textIt: "Prima di iniziare a guidare un veicolo a motore bisogna regolare il contachilometri parziale",
      answer: 0,
      chunks: [
        { it: "Prima di iniziare a guidare un veicolo a motore", fa: "پیش از شروعِ رانندگیِ یک وسیله‌ی موتوری" },
        { it: "bisogna regolare il contachilometri parziale", fa: "باید کیلومترشمارِ سفر را تنظیم کرد", verb: "bisogna ← bisognare", focus: "contrast" },
      ],
      translation: "پیش از شروعِ رانندگیِ یک وسیله‌ی موتوری باید کیلومترشمارِ سفر را تنظیم کرد.",
      why: "غلط است (درس ۷). کیلومترشمارِ سفر ربطی به ایمنی ندارد و جزوِ فهرست نیست.",
      rule: "Codice della Strada, art. 169 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "5309",
      textIt:
        "Quando si guida un veicolo a motore, bisogna avere con sé tutti i documenti necessari per la guida (carta di circolazione, certificato di assicurazione, patente ecc.), e in corso di validità",
      answer: 1,
      chunks: [
        { it: "Quando si guida un veicolo a motore,", fa: "وقتی وسیله‌ی موتوری می‌رانی،", verb: "si guida ← guidare", focus: "condition" },
        { it: "bisogna avere con sé tutti i documenti necessari per la guida", fa: "باید همه‌ی مدارکِ لازم برای رانندگی همراهت باشد", verb: "bisogna ← bisognare" },
        { it: "(carta di circolazione, certificato di assicurazione, patente ecc.),", fa: "(کارتِ خودرو، بیمه‌نامه، گواهینامه و غیره)،" },
        { it: "e in corso di validità", fa: "و معتبر" },
      ],
      translation: "وقتی وسیله‌ی موتوری می‌رانی، باید همه‌ی مدارکِ لازم برای رانندگی (کارتِ خودرو، بیمه‌نامه، گواهینامه و غیره) همراهت و معتبر باشد.",
      why: "درست است (درس ۷). همراه داشتن و معتبر بودن، هر دو.",
      rule: "Codice della Strada, art. 180 c.1",
      conceptStep: 2,
    },
  ],
  related: [],
};
