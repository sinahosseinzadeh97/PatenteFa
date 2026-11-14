/**
 * src/content/ch16-riservati.ts
 * Chapter 16 (Fermata, sosta, arresto), lesson 5: spaces reserved for people
 * and services (disabled spaces and ramps, reserved lanes, pedestrian areas,
 * ZTL, verges; CdS art. 158 c.2 lett. f–l) and the parking offences that also
 * cost licence points (art. 158 c.2 lett. d, g, h in the art. 126-bis table).
 *
 * Point values: 2 for lett. d (bus/tram stops) and h (reserved lanes), 4 for
 * lett. g (disabled spaces, since DL 121/2021). The bank only asks whether
 * points are lost, never how many. Trust rules as in src/content/lessons.ts;
 * checked by tests/chapter16.test.ts and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_158 = "Codice della Strada, art. 158";
const PUNTI = "Codice della Strada, art. 126-bis (tabella dei punteggi)";
const INVALIDI = "La sosta negli spazi riservati alla fermata e alla sosta dei veicoli per persone invalide";
const INVALIDI_FA = "پارک در جاهای مخصوصِ توقف و پارکِ خودروهای معلولان";
const BUS = "La sosta negli spazi riservati allo stazionamento e alla fermata di autobus, filobus e veicoli circolanti su rotaia";
const BUS_FA = "پارک در جاهای مخصوصِ ایستادن و توقفِ اتوبوس، اتوبوس برقی و وسیله‌های ریلی";

export const lessonSpaziRiservati: Lesson = {
  id: "spazi-riservati-punti",
  titleFa: "جاهای مخصوص، و امتیازِ گواهینامه",
  titleIt: "SPAZI RISERVATI · DECURTAZIONE DEI PUNTI",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس جاهایی را می‌شناسی که برای آدم‌ها یا خدماتِ خاصی کنار گذاشته شده‌اند (معلولان، اتوبوس، عابرِ پیاده، منطقه‌ی تردد محدود) و می‌دانی کدام پارکِ ممنوع علاوه بر جریمه امتیازِ گواهینامه را هم کم می‌کند.",
      why:
        "۱۸ سؤال. دو دام: «اگر کوتاه باشد مجاز است» برای جاهای مخصوص، و ترفندهایی که پارکِ ممنوع را قانونی نشان می‌دهند: دیسکِ ساعت، چراغِ خطر، «از ساعت ۲۲ تا ۸». هیچ‌کدام کار نمی‌کند.",
      rule: `${CDS_158} c.2; ${PUNTI}`,
    },
    {
      kind: "table",
      title: "جاهایی که مالِ دیگران است",
      body:
        "این‌ها هم در فهرستِ دومِ ماده‌ی ۱۵۸ هستند: پارک ممنوع است، برای مدتِ کوتاه هم. فرقشان با درسِ ۴ این است که جای آدم‌ها یا وسیله‌های خاصی‌اند، نه جای رفت‌وآمد.",
      columns: ["پارک ممنوع است"],
      rows: [
        { label: "جای مخصوصِ خودروهای معلولان", it: "spazi riservati ai veicoli per persone invalide", values: ["ممنوع، «کوتاه» هم نه"] },
        {
          label: "سرازیریِ پیاده‌رو برای معلولان",
          it: "scivoli · raccordi tra marciapiede e carreggiata",
          values: ["جلوی سرازیری‌هایی که خودروی معلول از آن استفاده می‌کند"],
        },
        { label: "خط یا سواره‌روی ویژه‌ی وسیله‌های عمومی", it: "corsie riservate ai mezzi pubblici", values: ["ممنوع، در هر ساعتی که تابلو چیز دیگری نگوید"] },
        { label: "منطقه‌ی عابرِ پیاده", it: "aree pedonali urbane", values: ["ممنوع؛ پارکِ کوتاه هم نه"] },
        { label: "منطقه‌ی تردد محدود (ZTL)", it: "zone a traffico limitato", values: ["برای خودروهایی که مجوز ندارند"] },
        { label: "شانه‌ی جاده", it: "la banchina", values: ["ممنوع، مگر تابلو اجازه دهد (درسِ ۲)"] },
      ],
      takeaway: "جای مخصوص مالِ کسی است که برایش ساخته شده. کوتاه بودن، چراغِ خطر یا دیسکِ ساعت آن را مالِ تو نمی‌کند.",
      rule: `${CDS_158} c.2 lett. f–l`,
    },
    {
      kind: "table",
      title: "کدام پارک امتیاز کم می‌کند",
      body:
        "بیشترِ پارک‌های ممنوع فقط جریمه‌ی نقدی دارند. سه مورد، علاوه بر جریمه، امتیازِ گواهینامه را هم کم می‌کنند. بانک فقط می‌پرسد امتیاز کم می‌شود یا نه؛ عددش را نمی‌پرسد.",
      columns: ["امتیاز", "دامِ بانک"],
      rows: [
        {
          label: "جای ایستگاهِ اتوبوس، اتوبوس برقی، تراموا؛ یا تا ۱۵ متر از تابلوی ایستگاهِ خط‌کشی‌نشده",
          values: ["کم می‌شود (۲ امتیاز)", "«با دیسکِ ساعت مجاز است» یا «با چهار راهنمای چشمک‌زن» نه"],
        },
        {
          label: "خط یا سواره‌روی ویژه‌ی وسیله‌های عمومی",
          values: ["کم می‌شود (۲ امتیاز)", "«داخلِ آبادی از ۲۲ تا ۸ مجاز است» نه"],
        },
        {
          label: "جای مخصوصِ معلولان، و سرازیری‌هایشان",
          values: ["کم می‌شود (۴ امتیاز)", "«فقط جریمه، بدونِ امتیاز» نه؛ «تعلیقِ گواهینامه» هم نه"],
        },
      ],
      takeaway: "اتوبوس، خطِ ویژه، معلولان: جریمه + امتیاز. «تعلیقِ گواهینامه» در این فصل نیست.",
      rule: `${PUNTI}: art. 158 c.2 lett. d, g, h`,
    },
    {
      kind: "classify",
      title: "امتیاز کم می‌شود یا نه؟",
      body: "همه‌ی این پارک‌ها ممنوع‌اند. بگو کدام علاوه بر جریمه امتیاز هم کم می‌کند. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "multa + punti", fa: "جریمه و کم شدنِ امتیاز" },
        { it: "solo multa", fa: "فقط جریمه" },
      ],
      items: [
        { prompt: "روی جای خط‌کشی‌شده‌ی ایستگاهِ اتوبوس.", answer: 0, explain: "جای اتوبوس: امتیاز هم کم می‌شود." },
        { prompt: "۱۰ متر از تابلوی ایستگاهِ اتوبوسی که جایش خط‌کشی نشده.", answer: 0, explain: "کمتر از ۱۵ متر، وقتی خط‌کشی نیست: مثلِ جای اتوبوس." },
        { prompt: "روی جای مخصوصِ معلولان، «فقط پنج دقیقه».", answer: 0, explain: "جای معلولان: امتیاز کم می‌شود، و کوتاه بودن فرقی نمی‌کند." },
        { prompt: "در خطِ ویژه‌ی اتوبوس، ساعت ۱۱ شب.", answer: 0, explain: "خطِ ویژه: امتیاز کم می‌شود. ساعت چیزی را عوض نمی‌کند." },
        { prompt: "جلوی ورودیِ خودرو به ملک.", answer: 1, explain: "پارکِ ممنوع است، ولی در جدولِ امتیازها نیست." },
        { prompt: "جلوی سطل‌های زباله.", answer: 1, explain: "ممنوع، فقط جریمه." },
      ],
      takeaway: "امتیاز فقط جایی کم می‌شود که پارکِ تو کارِ وسیله‌ی عمومی یا معلول را مختل کند.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la persona invalida", fa: "فردِ معلول", note: "«diversamente abile» هم همین است." },
        { it: "lo scivolo", fa: "سرازیریِ کوتاهِ پیاده‌رو" },
        { it: "i mezzi pubblici", fa: "وسیله‌های حمل‌ونقلِ عمومی" },
        { it: "la corsia riservata", fa: "خطِ عبورِ ویژه" },
        { it: "l'area pedonale urbana", fa: "منطقه‌ی عابرِ پیاده در شهر" },
        { it: "la zona a traffico limitato (ZTL)", fa: "منطقه‌ی تردد محدود" },
        { it: "la sanzione pecuniaria", fa: "جریمه‌ی نقدی" },
        { it: "la sottrazione di punti dalla patente", fa: "کم شدنِ امتیازِ گواهینامه", note: "«decurtazione dei punti» هم همین است." },
        { it: "la sospensione della patente", fa: "تعلیقِ گواهینامه" },
        { it: "tra l'altro", fa: "از جمله، علاوه بر چیزهای دیگر" },
      ],
    },
    {
      kind: "trap",
      title: "«tra l'altro» یا «ma non»",
      body: "هر دو جمله درباره‌ی جای معلولان‌اند. اولی می‌گوید امتیاز هم کم می‌شود؛ دومی می‌گوید فقط جریمه:",
      examples: [
        {
          sourceId: "5460",
          textIt:
            "La sosta negli spazi riservati alla fermata e alla sosta dei veicoli per persone invalide, comporta, tra l'altro, la sottrazione di punti dalla patente",
          answer: 1,
          chunks: [
            { it: `${INVALIDI},`, fa: `${INVALIDI_FA}،` },
            { it: "comporta, tra l'altro,", fa: "از جمله باعثِ این می‌شود که", verb: "comporta ← comportare" },
            { it: "la sottrazione di punti dalla patente", fa: "امتیازِ گواهینامه کم شود" },
          ],
          translation: "پارک در جاهای مخصوصِ توقف و پارکِ خودروهای معلولان، از جمله باعث می‌شود امتیازِ گواهینامه کم شود.",
          why: "درست است. ماده‌ی ۱۵۸ بند ۲ حرفِ g در جدولِ امتیازهاست.",
        },
        {
          sourceId: "5465",
          textIt:
            "La sosta negli spazi riservati alla fermata e alla sosta dei veicoli per persone invalide comporta una sanzione pecuniaria, ma non la sottrazione di punti dalla patente del conducente",
          answer: 0,
          chunks: [
            { it: INVALIDI, fa: INVALIDI_FA },
            { it: "comporta una sanzione pecuniaria,", fa: "جریمه‌ی نقدی دارد،", verb: "comporta ← comportare" },
            { it: "ma non la sottrazione di punti dalla patente del conducente", fa: "ولی امتیازِ گواهینامه‌ی راننده کم نمی‌شود", focus: "negation" },
          ],
          translation: "پارک در جاهای مخصوصِ توقف و پارکِ خودروهای معلولان جریمه‌ی نقدی دارد، ولی امتیازِ گواهینامه‌ی راننده را کم نمی‌کند.",
          why: "غلط است. جریمه دارد و امتیاز هم کم می‌شود.",
        },
      ],
      takeaway: "«tra l'altro» = علاوه بر جریمه. «ma non» در این گروه همیشه جمله را غلط می‌کند.",
      rule: `${PUNTI}: art. 158 c.2 lett. g`,
    },
  ],
  practice: [
    {
      sourceId: "5446",
      textIt: "La sosta è vietata nelle aree pedonali urbane",
      answer: 1,
      chunks: [
        { it: "La sosta è vietata", fa: "پارک ممنوع است", verb: "è vietata ← vietare" },
        { it: "nelle aree pedonali urbane", fa: "در منطقه‌های عابرِ پیاده‌ی شهری" },
      ],
      translation: "پارک در منطقه‌های عابرِ پیاده‌ی شهری ممنوع است.",
      why: "درست است (قدم ۱). منطقه‌ی عابرِ پیاده مالِ عابرهاست؛ پارکِ کوتاه هم نه.",
      rule: `${CDS_158} c.2 lett. i`,
      conceptStep: 1,
    },
    {
      sourceId: "5444",
      textIt: "La sosta è consentita negli spazi riservati alla fermata o alla sosta dei veicoli per persone invalide purché di breve durata",
      answer: 0,
      chunks: [
        { it: "La sosta è consentita", fa: "پارک مجاز است", verb: "è consentita ← consentire" },
        { it: "negli spazi riservati alla fermata o alla sosta dei veicoli per persone invalide", fa: "در جاهای مخصوصِ توقف یا پارکِ خودروهای معلولان" },
        { it: "purché di breve durata", fa: "به شرطِ این‌که کوتاه باشد", focus: "condition" },
      ],
      translation: "پارک در جاهای مخصوصِ توقف یا پارکِ خودروهای معلولان مجاز است، به شرطِ این‌که کوتاه باشد.",
      why: "غلط است (قدم ۱). جای معلولان برای هیچ مدتی مالِ تو نیست؛ امتیاز هم کم می‌شود.",
      rule: `${CDS_158} c.2 lett. g`,
      conceptStep: 1,
    },
    {
      sourceId: "5458",
      textIt:
        "La sosta negli spazi riservati allo stazionamento e alla fermata di autobus, filobus e veicoli circolanti su rotaia comporta, tra l'altro, la sottrazione di punti dalla patente.",
      answer: 1,
      chunks: [
        { it: BUS, fa: BUS_FA },
        { it: "comporta, tra l'altro,", fa: "از جمله باعثِ این می‌شود که", verb: "comporta ← comportare" },
        { it: "la sottrazione di punti dalla patente.", fa: "امتیازِ گواهینامه کم شود." },
      ],
      translation: "پارک در جاهای مخصوصِ ایستادن و توقفِ اتوبوس، اتوبوس برقی و وسیله‌های ریلی، از جمله باعث می‌شود امتیازِ گواهینامه کم شود.",
      why: "درست است (قدم ۲). جای اتوبوس و تراموا در جدولِ امتیازهاست.",
      rule: `${PUNTI}: art. 158 c.2 lett. d`,
      conceptStep: 2,
    },
    {
      sourceId: "5463",
      textIt:
        "La sosta negli spazi riservati allo stazionamento e alla fermata di autobus, filobus e veicoli circolanti su rotaia, è consentita se si utilizza il disco orario",
      answer: 0,
      chunks: [
        { it: `${BUS},`, fa: `${BUS_FA}،` },
        { it: "è consentita", fa: "مجاز است", verb: "è consentita ← consentire" },
        { it: "se si utilizza il disco orario", fa: "اگر از دیسکِ ساعت استفاده شود", verb: "si utilizza ← utilizzare", focus: "condition" },
      ],
      translation: "پارک در جاهای مخصوصِ ایستادن و توقفِ اتوبوس، اتوبوس برقی و وسیله‌های ریلی، اگر از دیسکِ ساعت استفاده شود مجاز است.",
      why: "غلط است (قدم ۲). دیسکِ ساعت فقط جایی کار می‌کند که پارکِ زمان‌دار مجاز است. جای اتوبوس ممنوع است و امتیاز هم کم می‌کند.",
      rule: `${CDS_158} c.2 lett. d; Codice della Strada, art. 157 c.6`,
      conceptStep: 2,
    },
    {
      sourceId: "5467",
      textIt: "La sosta nelle corsie o carreggiate riservate ai mezzi pubblici, è consentita, nei centri abitati, dalle ore 22.00 alle ore 8.00",
      answer: 0,
      chunks: [
        { it: "La sosta nelle corsie o carreggiate riservate ai mezzi pubblici,", fa: "پارک در خط‌ها یا سواره‌روهای ویژه‌ی وسیله‌های عمومی،" },
        { it: "è consentita, nei centri abitati,", fa: "داخلِ آبادی مجاز است،", verb: "è consentita ← consentire" },
        { it: "dalle ore 22.00 alle ore 8.00", fa: "از ساعت ۲۲ تا ساعت ۸", focus: "limit" },
      ],
      translation: "پارک در خط‌ها یا سواره‌روهای ویژه‌ی وسیله‌های عمومی، داخلِ آبادی از ساعت ۲۲ تا ۸ مجاز است.",
      why: "غلط است (قدم ۲). قانون چنین ساعتی ندارد؛ پارک در خطِ ویژه ممنوع است و امتیاز هم کم می‌کند.",
      rule: `${CDS_158} c.2 lett. h; ${PUNTI}`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // disabled spaces and ramps, reserved lanes, pedestrian areas, ZTL, verges
      sourceIds: ["5439", "5440", "5441", "5444", "5445", "5446", "5447", "5450"],
    },
    {
      step: 2,
      // which parking offences also cost points, and the tricks that do not make them legal
      sourceIds: ["5458", "5459", "5460", "5461", "5462", "5463", "5464", "5465", "5466", "5467"],
    },
  ],
};
