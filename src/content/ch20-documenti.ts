/**
 * src/content/ch20-documenti.ts
 * Chapter 20 (Patente, punti e documenti), lesson 1: what a car needs before it
 * may use a public road, and its plates.
 *  step 1 needed: third-party insurance (RCA), the right licence, registration,
 *         plates, carta di circolazione, warning triangle. Not needed: the bollo
 *         receipt, the ownership certificate on board, a warranty, kasko cover,
 *         the driver being the owner. A trade plate (targa prova) is legal.
 *  step 2 plates: fixed, readable, clean, untouched, never bent; "P" panels on
 *         learner cars.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter20.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS = (n: string) => `Codice della Strada, art. ${n}`;

export const lessonDocumenti: Lesson = {
  id: "documenti-veicolo-targhe",
  titleFa: "مدارک و پلاکِ خودرو: چه چیزی واقعاً لازم است",
  titleIt: "VEICOLI SU STRADA · DOCUMENTI · TARGHE",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی خودرو برای این‌که در جاده‌ی عمومی حرکت کند واقعاً چه چیزهایی لازم دارد (بیمه‌ی شخص ثالث، گواهینامه‌ی مناسب، شماره‌گذاری، پلاک، کارتِ خودرو، مثلثِ خطر) و چه چیزهایی بانک فقط برای فریب کنارشان گذاشته است. و می‌دانی پلاک باید چطور باشد.",
      why:
        "۱۸ سؤال. بانک کنارِ مدارکِ واقعی چیزهایی می‌گذارد که آشنا به نظر می‌رسند ولی شرطِ حرکت نیستند: رسیدِ مالیاتِ خودرو، سندِ مالکیت، گارانتی، بیمه‌ی بدنه، یا این‌که راننده خودش صاحبِ خودرو باشد. قاعده ساده است: قانون چیزی را می‌خواهد که رانندگی را ایمن و قابلِ پیگیری کند.",
      rule: `${CDS("93")}, ${CDS("100")}, ${CDS("180")}, ${CDS("193")}`,
    },
    {
      kind: "factors",
      title: "لازم است / لازم نیست",
      body:
        "خودرویی که در جاده‌ی عمومی می‌رود باید شماره‌گذاری‌شده باشد، پلاک و کارتِ خودرو داشته باشد، بیمه‌ی شخص ثالث داشته باشد، و راننده‌اش گواهینامه‌ی ردیفِ همان وسیله را. مثلثِ خطر هم جزوِ تجهیزاتِ اجباری است (فصلِ ۱۷). ستونِ دوم چیزهایی است که شرطِ حرکت نیستند. «پلاکِ آزمایشی» (targa prova) هم مجاز است: نمایشگاه‌ها و سازنده‌ها با آن خودروی هنوز شماره‌نشده را آزمایش می‌کنند. از ۲۰۲۱ خودروهای تازه به جای کارتِ خودرو و سندِ مالکیتِ جدا، یک «سندِ واحد» (Documento Unico) می‌گیرند؛ آن را هم همراه داشته باش.",
      columns: [
        {
          title: "شرطِ حرکت",
          items: [
            {
              fa: "گواهینامه‌ی لازم برای همان نوع وسیله",
              it: "la patente di guida necessaria per quel tipo di veicolo",
              sourceId: "6127",
              textIt: "E' vietato condurre un autoveicolo sulle strade pubbliche quando non si possiede la patente di guida necessaria per quel tipo di veicolo",
              answer: 1,
            },
            {
              fa: "پلاک، تا صاحبِ خودرو پیدا شود",
              it: "munito delle targhe identificative",
              sourceId: "6134",
              textIt: "Un autoveicolo per poter circolare deve essere munito delle targhe identificative, affinché sia possibile risalire all'intestatario del mezzo",
              answer: 1,
            },
            {
              fa: "مثلثِ خطر",
              it: "segnale mobile di pericolo (triangolo)",
              sourceId: "6136",
              textIt: "Un autoveicolo per poter circolare deve essere munito del segnale mobile di pericolo (triangolo)",
              answer: 1,
            },
          ],
        },
        {
          title: "شرطِ حرکت نیست",
          items: [
            {
              fa: "همراه داشتنِ رسیدِ مالیاتِ مالکیت",
              it: "la ricevuta di avvenuto pagamento della tassa di possesso",
              sourceId: "6129",
              textIt: "E' vietato utilizzare un autoveicolo sulle strade pubbliche quando non si ha con sé la ricevuta di avvenuto pagamento della tassa di possesso",
              answer: 0,
            },
            {
              fa: "کارتِ خودرو به نامِ کسِ دیگری است",
              it: "intestata a persona diversa dal conducente",
              sourceId: "6131",
              textIt: "E' vietato utilizzare un autoveicolo sulle strade pubbliche quando la carta di circolazione è intestata a persona diversa dal conducente",
              answer: 0,
            },
            {
              fa: "گارانتیِ خودرو تمام شده",
              it: "se la garanzia è scaduta di validità",
              sourceId: "6132",
              textIt: "Sulle strade pubbliche è vietato utilizzare un autoveicolo se la garanzia è scaduta di validità",
              answer: 0,
            },
          ],
        },
      ],
      takeaway:
        "بیمه‌ی شخص ثالث، گواهینامه‌ی درست، شماره‌گذاری، پلاک، کارتِ خودرو، مثلث: لازم. رسیدِ مالیات، سندِ مالکیت، گارانتی، بیمه‌ی بدنه، صاحب بودن: شرطِ حرکت نیستند.",
      rule: `${CDS("93")}, ${CDS("100")}, ${CDS("116")}, ${CDS("162")}, ${CDS("180")}, ${CDS("193")}`,
    },
    {
      kind: "table",
      title: "پلاک: محکم، خوانا، دست‌نخورده",
      body:
        "پلاک برای این است که هر کسی، از پلیس تا دوربین، بتواند خودرو را بشناسد. سواری جلو و عقب پلاک دارد. هر چیزی که خواندنش را سخت کند جریمه دارد؛ پلاکِ جعلی یا دست‌کاری‌شده جرم است.",
      columns: ["قاعده"],
      rows: [
        { label: "محکم و سرِ جایش", it: "apposte saldamente e in posizione corretta", values: ["پلاک باید محکم و در جای پیش‌بینی‌شده نصب شود، نه کج، نه شل."] },
        { label: "همیشه خوانا", it: "sempre ben leggibili", values: ["گل، برف، قابِ تزئینی یا دوچرخه‌ی روی باربند نباید آن را بپوشاند."] },
        { label: "تمیز", it: "non devono essere sporche", values: ["پلاکِ کثیف یعنی پلاکِ ناخوانا."] },
        { label: "دست‌نخورده", it: "non manomesse o contraffatte", values: ["پلاکِ دست‌کاری‌شده یا جعلی ممنوع است و مجازاتِ سنگین دارد."] },
        { label: "خم نکن", it: "non piegate", values: ["خم کردنِ پلاک برای جا شدن روی پایه ممنوع است؛ شکلش را عوض نکن."] },
        { label: "خودروی آموزش", it: "pannelli con la lettera \"P\"", values: ["خودرویی که با آن رانندگی تمرین می‌کنند، جلو و عقب پنلِ بازتابنده با حرفِ P (principiante، تازه‌کار) دارد."] },
      ],
      takeaway: "پلاک باید هر لحظه خوانده شود: محکم، تمیز، دست‌نخورده، صاف.",
      rule: `${CDS("100")}; DPR 495/1992 artt. 258–262; ${CDS("122")}`,
    },
    {
      kind: "classify",
      title: "می‌شود حرکت کرد؟",
      body: "هر موقعیت را بخوان. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "si può circolare", fa: "می‌شود" },
        { it: "è vietato", fa: "ممنوع است" },
      ],
      items: [
        { prompt: "خودروی دوستت را قرض گرفته‌ای؛ کارتِ خودرو به نامِ اوست", answer: 0, explain: "لازم نیست راننده صاحبِ خودرو باشد." },
        { prompt: "بیمه‌ی شخص ثالثِ خودرو دیروز تمام شده", answer: 1, explain: "بیمه‌ی شخص ثالث شرطِ حرکت در جاده‌ی عمومی است." },
        { prompt: "گارانتیِ کارخانه سالِ پیش تمام شد", answer: 0, explain: "گارانتی قراردادی تجاری است، نه شرطِ حرکت." },
        { prompt: "پلاکِ عقب را خم کرده‌ای تا روی پایه‌ی تازه جا شود", answer: 1, explain: "پلاک نباید خم شود." },
        { prompt: "خودرو فقط بیمه‌ی شخص ثالث دارد، بیمه‌ی بدنه نه", answer: 0, explain: "بیمه‌ی بدنه اختیاری است." },
        { prompt: "رسیدِ مالیاتِ خودرو را در خانه جا گذاشته‌ای", answer: 0, explain: "رسیدِ مالیات را لازم نیست همراه داشته باشی." },
      ],
      takeaway: "اول بپرس: این چیز رانندگی را ایمن یا قابلِ پیگیری می‌کند؟ اگر نه، احتمالاً شرطِ حرکت نیست.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l’assicurazione per la responsabilità civile", fa: "بیمه‌ی شخص ثالث" },
        { it: "la polizza kasko", fa: "بیمه‌ی بدنه" },
        { it: "immatricolato", fa: "شماره‌گذاری‌شده" },
        { it: "la carta di circolazione", fa: "کارتِ خودرو" },
        { it: "il certificato di proprietà", fa: "سندِ مالکیت" },
        { it: "la tassa di possesso (bollo)", fa: "مالیاتِ مالکیتِ خودرو (bollo)" },
        { it: "la targa", fa: "پلاک" },
        { it: "la targa prova", fa: "پلاکِ آزمایشی" },
        { it: "l’intestatario", fa: "کسی که خودرو به نامِ اوست" },
        { it: "manomesso", fa: "دست‌کاری‌شده" },
      ],
    },
    {
      kind: "trap",
      title: "«assicurazione»: شخص ثالث آری، بدنه نه",
      body: "هر دو جمله درباره‌ی بیمه است. یکی بیمه‌ای را می‌گوید که قانون می‌خواهد، دیگری بیمه‌ای اختیاری را:",
      examples: [
        {
          sourceId: "6126",
          textIt: "E' vietato utilizzare un autoveicolo sulle strade pubbliche quando il veicolo non è coperto dall'assicurazione per la responsabilità civile",
          answer: 1,
          chunks: [
            { it: "E' vietato utilizzare un autoveicolo", fa: "استفاده از خودرو ممنوع است", verb: "è ← essere" },
            { it: "sulle strade pubbliche", fa: "در جاده‌های عمومی" },
            { it: "quando il veicolo non è coperto", fa: "وقتی خودرو پوشش ندارد", verb: "è coperto ← coprire", focus: "condition" },
            { it: "dall'assicurazione per la responsabilità civile", fa: "از بیمه‌ی شخص ثالث" },
          ],
          translation: "استفاده از خودرو در جاده‌های عمومی ممنوع است وقتی خودرو بیمه‌ی شخص ثالث ندارد.",
          why: "درست است. بیمه‌ی شخص ثالث خسارتی را که به دیگران می‌زنی جبران می‌کند و اجباری است.",
        },
        {
          sourceId: "6137",
          textIt: "Un'autovettura per poter circolare deve avere la polizza assicurativa del tipo \"kasko\"",
          answer: 0,
          chunks: [
            { it: "Un'autovettura", fa: "یک سواری" },
            { it: "per poter circolare", fa: "برای این‌که بتواند حرکت کند", focus: "reason" },
            { it: "deve avere", fa: "باید داشته باشد", verb: "deve ← dovere", focus: "always" },
            { it: "la polizza assicurativa del tipo \"kasko\"", fa: "بیمه‌نامه‌ی نوعِ «بدنه»" },
          ],
          translation: "یک سواری برای این‌که بتواند حرکت کند باید بیمه‌نامه‌ی نوعِ «بدنه» داشته باشد.",
          why: "غلط است. بیمه‌ی بدنه خسارتِ خودِ خودرو را می‌دهد و اختیاری است؛ فقط بیمه‌ی شخص ثالث اجباری است.",
        },
      ],
      takeaway: "در جمله‌های بیمه بپرس: خسارتِ دیگران (شخص ثالث، اجباری) یا خسارتِ خودِ من (بدنه، اختیاری)؟",
      rule: CDS("193"),
    },
  ],
  practice: [
    {
      sourceId: "6128",
      textIt: "E’ di norma vietato condurre sulle strade pubbliche un autoveicolo non immatricolato",
      answer: 1,
      chunks: [
        { it: "E’ di norma vietato", fa: "به طورِ معمول ممنوع است", verb: "è ← essere", focus: "always" },
        { it: "condurre sulle strade pubbliche", fa: "در جاده‌های عمومی راندن" },
        { it: "un autoveicolo non immatricolato", fa: "خودرویی که شماره‌گذاری نشده", focus: "negation" },
      ],
      translation: "راندنِ خودرویی که شماره‌گذاری نشده، در جاده‌های عمومی به طورِ معمول ممنوع است.",
      why: "درست است (قدم ۱). خودرو باید شماره‌گذاری شود تا پلاک و کارتِ خودرو بگیرد. «به طورِ معمول» برای استثنایی مثلِ پلاکِ آزمایشی است.",
      rule: CDS("93"),
      conceptStep: 1,
    },
    {
      sourceId: "6133",
      textIt: "E' vietato utilizzare un autoveicolo sulle strade pubbliche quando non si ha con sé il certificato di proprietà",
      answer: 0,
      chunks: [
        { it: "E' vietato utilizzare un autoveicolo", fa: "استفاده از خودرو ممنوع است", verb: "è ← essere" },
        { it: "sulle strade pubbliche", fa: "در جاده‌های عمومی" },
        { it: "quando non si ha con sé", fa: "وقتی همراهت نیست", verb: "si ha ← avere", focus: "negation" },
        { it: "il certificato di proprietà", fa: "سندِ مالکیت" },
      ],
      translation: "استفاده از خودرو در جاده‌های عمومی ممنوع است وقتی سندِ مالکیت همراهت نیست.",
      why: "غلط است (قدم ۱). سندِ مالکیت لازم نیست در خودرو باشد؛ کارتِ خودرو (یا سندِ واحد) لازم است.",
      rule: CDS("180"),
      conceptStep: 1,
    },
    {
      sourceId: "6141",
      textIt: "Le targhe dei veicoli non devono essere manomesse o contraffatte",
      answer: 1,
      chunks: [
        { it: "Le targhe dei veicoli", fa: "پلاک‌های وسایلِ نقلیه" },
        { it: "non devono essere", fa: "نباید باشند", verb: "devono ← dovere", focus: "negation" },
        { it: "manomesse o contraffatte", fa: "دست‌کاری‌شده یا جعلی" },
      ],
      translation: "پلاک‌های وسایلِ نقلیه نباید دست‌کاری‌شده یا جعلی باشند.",
      why: "درست است (قدم ۲). پلاکِ دست‌کاری‌شده یا جعلی ممنوع است و مجازاتِ کیفری دارد.",
      rule: `${CDS("100")} c.12, c.14`,
      conceptStep: 2,
    },
    {
      sourceId: "6143",
      textIt: "Le targhe dei veicoli possono essere piegate per adattarle meglio al loro supporto",
      answer: 0,
      chunks: [
        { it: "Le targhe dei veicoli", fa: "پلاک‌های وسایلِ نقلیه" },
        { it: "possono essere piegate", fa: "می‌توانند خم شوند", verb: "possono ← potere", focus: "contrast" },
        { it: "per adattarle meglio al loro supporto", fa: "تا بهتر روی پایه‌شان جا شوند", focus: "reason" },
      ],
      translation: "پلاک‌های وسایلِ نقلیه را می‌شود خم کرد تا بهتر روی پایه‌شان جا شوند.",
      why: "غلط است (قدم ۲). پلاک باید صاف و خوانا بماند؛ خم کردنش برای جا شدن ممنوع است.",
      rule: `${CDS("100")}; DPR 495/1992 art. 260`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6126", "6127", "6128", "6129", "6130", "6131", "6132", "6133", "6134", "6135", "6136", "6137"] },
    { step: 2, sourceIds: ["6138", "6139", "6140", "6141", "6142", "6143"] },
  ],
};
