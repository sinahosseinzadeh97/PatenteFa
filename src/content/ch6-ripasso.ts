/**
 * src/content/ch6-ripasso.ts
 * Chapter 6 (Segnaletica orizzontale e segni sugli ostacoli): the chapter
 * review. Ten real bank questions, one per lesson and none shown inside a
 * lesson; a mistake routes back to the lesson section that teaches it
 * (tests/chapter6.test.ts).
 */
import type { Lesson } from "./lessons.js";

const SEGNALETICA = "La segnaletica in figura";
const SEGNALETICA_FA = "خط‌کشیِ تصویر";
const DOPPIA = "La doppia striscia continua in figura";
const DOPPIA_FA = "دو خطِ ممتدِ کنارِ همِ تصویر";

export const reviewSegnaletica: Lesson = {
  id: "ripasso-capitolo-6",
  titleFa: "مرور فصل ۶",
  titleIt: "RIPASSO · SEGNALETICA ORIZZONTALE",
  minutes: 6,
  signs: [],
  figures: [502, 509, 512, 517, 543, 546, 563, 565],
  review: true,
  steps: [
    {
      kind: "intro",
      title: "مرور فصل",
      objective:
        "ده سؤالِ واقعی از بانک، یکی از هر درس. هیچ‌کدام را در درس‌ها ندیده‌ای، پس این مرور نشان می‌دهد چه چیزی واقعاً در ذهنت مانده است.",
      why: "تقریباً هر سؤالِ این فصل یکی از سه چیز را می‌پرسد: «چه رنگی؟»، «ممتد یا خط‌چین؟» و «چه چیزی به این خط‌کشی نسبت داده شده که نمی‌گوید؟». سؤالی که اینجا اشتباه کنی به فهرستِ مرورت اضافه می‌شود و به بخشِ درسِ مربوطش وصل است.",
    },
    {
      kind: "table",
      title: "فصل ۶ در ده خط",
      body: "قبل از سؤال‌ها، نکته‌ی اصلیِ هر درس را یک بار دیگر ببین. اگر جایی برایت تازه بود، اول همان درس را دوباره باز کن.",
      columns: ["نکته‌ی اصلی"],
      rows: [
        { label: "درس ۱", it: "colori · forme", values: ["سفید = عادی؛ زرد = ویژه یا پارک ممنوع؛ آبی = فقط پارکِ پولی. گل‌میخ فقط جای خطِ ممتد"] },
        { label: "درس ۲", it: "strisce longitudinali", values: ["خطِ سمتِ خودت را بخوان؛ از ممتد عبور نکن؛ روی هیچ خطی نران"] },
        { label: "درس ۳", it: "senso unico · doppio senso", values: ["یک‌طرفه: برای چپ به چپ، دور زدن هرگز. دوطرفه: برای چپ به وسط"] },
        { label: "درس ۴", it: "frecce · preselezione", values: ["خط‌چین = هنوز خط عوض کن؛ ممتد = فلشِ خطِ خودت را برو"] },
        { label: "درس ۵", it: "margine · emergenza", values: ["خط‌چینِ کناری = ورودی یا خروجی؛ ممتد = شانه یا خطِ اضطراری؛ اضطراری حداکثر سه ساعت"] },
        { label: "درس ۶", it: "isola · strisce di guida", values: ["جزیره مسیر را می‌بندد؛ خطِ راهنما فقط نشان می‌دهد و قابلِ عبور است"] },
        { label: "درس ۷", it: "striscia di arresto", values: ["خطِ عرضیِ ممتد = جای ایستادن با چراغ، STOP یا مأمور؛ مثلث‌ها = DARE"] },
        { label: "درس ۸", it: "attraversamento pedonale", values: ["نوارهای پهن = عابر؛ خودرو رد می‌شود ولی برای عابر می‌ایستد"] },
        { label: "درس ۹", it: "giallo · sosta · fermata", values: ["زرد و سیاه و ایستگاهِ اتوبوس: پارک نه، توقفِ کوتاه آره"] },
        { label: "درس ۱۰", it: "iscrizioni · rallentatori · PL", values: ["فقط نوشته‌ی ترافیکی؛ سرعت‌گیرها یعنی آهسته؛ PL پیش از هر گذرگاهِ راه‌آهن"] },
      ],
      takeaway: "در هر جمله سه سؤال بپرس: «چه رنگی؟»، «ممتد یا خط‌چین؟» و «چه چیزی به آن نسبت داده شده که نمی‌گوید؟».",
    },
  ],
  practice: [
    {
      sourceId: "2422",
      figure: 509,
      textIt: "La doppia striscia continua in figura è di colore azzurro nei parcheggi a pagamento",
      answer: 0,
      chunks: [
        { it: DOPPIA, fa: DOPPIA_FA },
        { it: "è di colore azzurro", fa: "آبی‌رنگ است", focus: "contrast" },
        { it: "nei parcheggi a pagamento", fa: "در پارکینگ‌های پولی", focus: "condition" },
      ],
      translation: "دو خطِ ممتدِ کنارِ همِ تصویر در پارکینگ‌های پولی آبی‌رنگ است.",
      why: "غلط است (درس ۱). خطِ وسط همیشه سفید است. آبی فقط دورِ جای پارکِ پولی است، نه خطِ وسطِ جاده.",
      rule: "DPR 495/1992 art. 139 c.1; art. 149 c.3",
      conceptStep: 1,
    },
    {
      sourceId: "2417",
      figure: 509,
      textIt: "La doppia striscia continua in figura non consente l'inversione del senso di marcia",
      answer: 1,
      chunks: [
        { it: DOPPIA, fa: DOPPIA_FA },
        { it: "non consente l'inversione del senso di marcia", fa: "اجازه‌ی دور زدن نمی‌دهد", verb: "consente ← consentire", focus: "negation" },
      ],
      translation: "دو خطِ ممتدِ کنارِ همِ تصویر اجازه‌ی دور زدن نمی‌دهد.",
      why: "درست است (درس ۲). برای دور زدن باید از خطِ وسط عبور کنی، و از خطِ ممتد عبور نمی‌کنی.",
      rule: "Codice della Strada art. 40 c.8",
      conceptStep: 1,
    },
    {
      sourceId: "2406",
      figure: 502,
      textIt: "La striscia bianca discontinua in figura nelle strade a senso unico è posta nei dossi, per dividere i due sensi di marcia",
      answer: 0,
      chunks: [
        { it: "La striscia bianca discontinua in figura", fa: "خط‌چینِ سفیدِ تصویر" },
        { it: "nelle strade a senso unico", fa: "در جاده‌های یک‌طرفه", focus: "condition" },
        { it: "è posta nei dossi,", fa: "روی تپه‌ها کشیده می‌شود،", verb: "è posta ← porre" },
        { it: "per dividere i due sensi di marcia", fa: "برای جدا کردنِ دو جهتِ حرکت", focus: "reason" },
      ],
      translation: "خط‌چینِ سفیدِ تصویر در جاده‌های یک‌طرفه روی تپه‌ها کشیده می‌شود تا دو جهتِ حرکت را جدا کند.",
      why: "غلط است (درس ۳). جاده‌ی یک‌طرفه دو جهت ندارد که خطی آن‌ها را جدا کند.",
      rule: "Codice della Strada art. 40 c.3; DPR 495/1992 art. 138 c.2",
      conceptStep: 1,
    },
    {
      sourceId: "2522",
      figure: 565,
      textIt: "La corsia C rappresentata in figura consente al conducente solo la svolta a destra",
      answer: 0,
      chunks: [
        { it: "La corsia C rappresentata in figura", fa: "خطِ عبورِ C در تصویر" },
        { it: "consente al conducente", fa: "به راننده اجازه می‌دهد", verb: "consente ← consentire" },
        { it: "solo la svolta a destra", fa: "فقط به راست بپیچد", focus: "limit" },
      ],
      translation: "خطِ عبورِ C در تصویر به راننده فقط اجازه‌ی پیچیدن به راست را می‌دهد.",
      why: "غلط است (درس ۴). فلشِ C ترکیبی است: مستقیم و راست. «فقط راست» نیست.",
      rule: "DPR 495/1992 art. 147 c.2 lett. d",
      conceptStep: 1,
    },
    {
      sourceId: "2619",
      figure: 512,
      textIt: "La striscia bianca laterale discontinua in figura individua il bordo della strada principale, separandolo da quello della strada secondaria",
      answer: 1,
      chunks: [
        { it: "La striscia bianca laterale discontinua in figura", fa: "خط‌چینِ سفیدِ کناریِ تصویر" },
        { it: "individua il bordo della strada principale,", fa: "لبه‌ی جاده‌ی اصلی را مشخص می‌کند،", verb: "individua ← individuare" },
        { it: "separandolo da quello della strada secondaria", fa: "و آن را از لبه‌ی جاده‌ی فرعی جدا می‌کند", verb: "separandolo ← separare" },
      ],
      translation: "خط‌چینِ سفیدِ کناریِ تصویر لبه‌ی جاده‌ی اصلی را مشخص می‌کند و آن را از لبه‌ی جاده‌ی فرعی جدا می‌کند.",
      why: "درست است (درس ۵). دهانه‌ی جاده‌ی فرعی یک «در» در لبه‌ی جاده است، برای همین خط آنجا خط‌چین است.",
      rule: "DPR 495/1992 art. 141 c.3",
      conceptStep: 1,
    },
    {
      sourceId: "2425",
      figure: 543,
      textIt: "Le strisce di guida in figura, di norma, si trovano dove la svolta a sinistra si effettua lasciando alla nostra destra il centro dell'incrocio",
      answer: 1,
      chunks: [
        { it: "Le strisce di guida in figura,", fa: "خط‌های راهنمای تصویر،" },
        { it: "di norma,", fa: "معمولاً،", focus: "limit" },
        { it: "si trovano dove la svolta a sinistra si effettua", fa: "جایی هستند که پیچیدن به چپ انجام می‌شود", verb: "si trovano ← trovare" },
        { it: "lasciando alla nostra destra il centro dell'incrocio", fa: "با نگه داشتنِ مرکزِ تقاطع در سمتِ راستِ ما", verb: "lasciando ← lasciare" },
      ],
      translation: "خط‌های راهنمای تصویر معمولاً جایی هستند که پیچیدن به چپ با نگه داشتنِ مرکزِ تقاطع در سمتِ راستِ ما انجام می‌شود.",
      why: "درست است (درس ۶). این همان قاعده‌ی عمومیِ پیچیدن به چپ است، و خطِ راهنما مسیرش را می‌کشد.",
      rule: "Codice della Strada art. 154 c.3 lett. b; DPR 495/1992 art. 143 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2570",
      figure: 563,
      textIt: "La striscia bianca trasversale in figura può essere completata con la scritta STOP, dipinta sulla pavimentazione stradale",
      answer: 1,
      chunks: [
        { it: "La striscia bianca trasversale in figura", fa: "خطِ سفیدِ عرضیِ تصویر" },
        { it: "può essere completata", fa: "می‌تواند کامل شود", verb: "può ← potere" },
        { it: "con la scritta STOP,", fa: "با کلمه‌ی STOP،" },
        { it: "dipinta sulla pavimentazione stradale", fa: "که روی آسفالت رنگ شده", verb: "dipinta ← dipingere" },
      ],
      translation: "خطِ سفیدِ عرضیِ تصویر می‌تواند با کلمه‌ی STOP، که روی آسفالت رنگ شده، کامل شود.",
      why: "درست است (درس ۷). با تابلوی STOP، کلمه‌ی STOP هم پیش از خطِ ایست روی آسفالت نوشته می‌شود.",
      rule: "DPR 495/1992 art. 148 c.8",
      conceptStep: 1,
    },
    {
      sourceId: "2568",
      figure: 517,
      textIt: "La segnaletica in figura non consente il transito ai pedoni",
      answer: 0,
      chunks: [
        { it: SEGNALETICA, fa: SEGNALETICA_FA },
        { it: "non consente il transito ai pedoni", fa: "به عابرها اجازه‌ی عبور نمی‌دهد", verb: "consente ← consentire", focus: "negation" },
      ],
      translation: "خط‌کشیِ تصویر به عابرها اجازه‌ی عبور نمی‌دهد.",
      why: "غلط است (درس ۸). برعکس: گذرگاهِ عابر جای عبورِ عابرهاست.",
      rule: "DPR 495/1992 art. 145 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2486",
      figure: 546,
      textIt: "La segnaletica in figura indica lo spazio per la fermata di autosnodati in servizio pubblico di linea",
      answer: 1,
      chunks: [
        { it: SEGNALETICA, fa: SEGNALETICA_FA },
        { it: "indica lo spazio per la fermata", fa: "جای توقف را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "di autosnodati in servizio pubblico di linea", fa: "برای اتوبوس‌های مفصلیِ خطِ عمومی" },
      ],
      translation: "خط‌کشیِ تصویر جای توقفِ اتوبوس‌های مفصلیِ خطِ عمومی را نشان می‌دهد.",
      why: "درست است (درس ۹). ایستگاهِ اتوبوس برای همه‌ی اتوبوس‌های خطِ عمومی است، مفصلی هم.",
      rule: "DPR 495/1992 art. 151 c.1–2",
      conceptStep: 1,
    },
    {
      sourceId: "2541",
      textIt: "E' regolamentare trovare sulla pavimentazione la scritta GIOCHI, in vicinanza di giardini pubblici",
      answer: 0,
      chunks: [
        { it: "E' regolamentare", fa: "طبقِ مقررات است" },
        { it: "trovare sulla pavimentazione", fa: "که روی آسفالت ببینی" },
        { it: "la scritta GIOCHI,", fa: "کلمه‌ی GIOCHI («بازی»)،", focus: "contrast" },
        { it: "in vicinanza di giardini pubblici", fa: "نزدیکِ پارک‌های عمومی" },
      ],
      translation: "طبقِ مقررات است که نزدیکِ پارک‌های عمومی، روی آسفالت کلمه‌ی GIOCHI («بازی») را ببینی.",
      why: "غلط است (درس ۱۰). این کلمه نه نامِ مکان است نه دستورِ ترافیکی؛ بدونِ مجوز روی آسفالت نوشته نمی‌شود.",
      rule: "DPR 495/1992 art. 148 c.1–2, c.12",
      conceptStep: 1,
    },
  ],
  related: [],
};
