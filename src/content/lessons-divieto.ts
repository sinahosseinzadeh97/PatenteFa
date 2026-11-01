/**
 * src/content/lessons-divieto.ts
 * Chapter 3 of the ministerial program — "Segnali di divieto" — question-bank
 * source ids 1194–1714 (the third top-level group of quizPatenteB2023.json,
 * "segnali-divieto"). Lessons live in ch3-circolazione.ts, ch3-veicoli.ts and
 * ch3-sosta.ts; this file adds the chapter review and the chapter itself.
 *
 * Every chapter-3 question is mapped to one chapter-3 lesson section, except
 * the 30 overtaking-ban questions that Chapter 15 lesson 2 (`sorpasso-segnali`,
 * lessons-sorpasso.ts) already teaches and practises; their mistakes keep
 * routing there. tests/chapter3.test.ts pins that list.
 */
import type { Chapter, Lesson } from "./lessons.js";
import { lessonClacson, lessonRiconoscere, lessonSorpassoPesanti, lessonTransitoSensoVietato, lessonVelocitaDistanza } from "./ch3-circolazione.js";
import { lessonOrariPannelli, lessonParcheggio, lessonSostaFermata } from "./ch3-sosta.js";
import { lessonAutoveicoli, lessonDimensioni, lessonMerciPericolose, lessonPesanti, lessonUtenti } from "./ch3-veicoli.js";
import { SIGN, SIGN_FA } from "./ch3-signs.js";

/** First and last bank source id of chapter 3, for coverage checks. */
export const CHAPTER_3_SOURCE_RANGE = [1194, 1714] as const;

/** Chapter-3 questions taught (and so mapped) by Chapter 15's `sorpasso-segnali`. */
export const CHAPTER_3_MAPPED_ELSEWHERE = [
  "1227", "1230", "1231", "1232", "1233", "1234", "1236", "1237", "1238", "1239", "1240", "1241", "1242", "1243",
  "1244", "1245", "1247", "1248", "1249", "1250", "1252", "1256", "1258", "1259", "1260", "1261",
  "1554", "1555", "1556", "1561",
] as const;

const review: Lesson = {
  id: "ripasso-capitolo-3",
  titleFa: "مرور فصل ۳",
  titleIt: "RIPASSO · SEGNALI DI DIVIETO",
  minutes: 8,
  signs: [54, 84, 85],
  review: true,
  steps: [
    {
      kind: "intro",
      title: "مرور فصل",
      objective:
        "سیزده سؤال واقعی از بانک، یکی از هر درس. هیچ‌کدام را در درس‌ها ندیده‌ای، پس این مرور نشان می‌دهد چه چیزی واقعاً در ذهنت مانده است.",
      why: "در این فصل تقریباً هر سؤال یکی از دو چیز را می‌پرسد: «چه چیزی ممنوع است؟» و «چه کسی هنوز آزاد است؟». سؤالی که اینجا اشتباه کنی به فهرست مرورت اضافه می‌شود و به درسِ مربوطش وصل است.",
    },
    {
      kind: "table",
      title: "فصل ۳ در سیزده خط",
      body: "قبل از سؤال‌ها، نکته‌ی اصلی هر درس را یک بار دیگر ببین. اگر جایی برایت تازه بود، اول همان درس را دوباره باز کن.",
      columns: ["نکته‌ی اصلی"],
      rows: [
        { label: "درس ۱", it: "divieto · 24 ore", sign: 80, values: ["دایره‌ی قرمز = ممنوع؛ از خود تابلو تا تقاطع بعد؛ شبانه‌روزی مگر پنل بگوید؛ سفید با نوار سیاه = پایان"] },
        { label: "درس ۲", it: "transito · senso vietato", sign: 55, values: ["دایره‌ی خالی = خیابان از دو طرف بسته؛ نوار سفید = ورود از این سر ممنوع؛ پیاده آزاد"] },
        { label: "درس ۳", it: "km/h · m", sign: 58, values: ["سرعت: بیشترش ممنوع؛ فاصله: کمترش ممنوع؛ پایان سرعت = برگشت به سقف عمومی"] },
        { label: "درس ۴", it: "clacson", sign: 59, values: ["بوق فقط برای خطر فوری یا رساندن مجروح"] },
        { label: "درس ۵", it: "sorpasso · 3,5 t", sign: 60, values: ["کامیونِ باریِ بالای ۳٫۵ تن (کارت خودرو) از هیچ وسیله‌ی موتوری سبقت نمی‌گیرد؛ اتوبوس و کاروان آزاد"] },
        { label: "درس ۶", it: "pedoni · bici · moto", sign: 63, values: ["فقط گروه تصویر ممنوع؛ دوچرخه ≠ موتور گازی ≠ موتورسیکلت"] },
        { label: "درس ۷", it: "autoveicoli · autobus", sign: 66, values: ["همه‌ی خودروها = چهارچرخ‌ها + سه‌چرخه و چهارچرخه‌ی موتوری؛ دوچرخ‌های موتوری آزاد"] },
        { label: "درس ۸", it: "3,5 t · rimorchio", sign: 70, values: ["عدد کارت خودرو؛ فقط باری‌ها؛ carrello appendice یدک نیست؛ تصویر زیر دایره = فقط همان‌ها"] },
        { label: "درس ۹", it: "merci pericolose", sign: 73, values: ["بار را می‌پرسد، نه سوخت باک؛ زودسوز هم مثل منفجره"] },
        { label: "درس ۱۰", it: "massa effettiva", sign: 78, values: ["اندازه و وزنِ واقعی، برای همه؛ برابرِ عدد مجاز است"] },
        { label: "درس ۱۱", it: "sosta · fermata", sign: 85, values: ["یک خط: توقف کوتاه آزاد؛ ضربدر: هیچ؛ پارک ممنوع فقط همین سمت تا تقاطع بعد"] },
        { label: "درس ۱۲", it: "8–20", sign: 92, values: ["۸ تا ۲۰ فقط پارک ممنوع در شهر؛ فلش = جا، صلیب و چکش = روز، ساعت روی تابلو مقدم است"] },
        { label: "درس ۱۳", it: "P · passo carrabile", sign: 91, values: ["P = پارک مجاز؛ ورودی خودرو: توقف آره، پارک نه؛ نشان معلول فقط با کارت"] },
      ],
      takeaway: "جمله‌ای که به گروهِ شبیهِ تصویر، به ساعت ۸ تا ۲۰ یا به «فقط باری‌ها» تکیه می‌کند را دو بار بخوان.",
    },
  ],
  practice: [
    {
      sourceId: "1540",
      sign: 80,
      textIt: "Il segnale raffigurato indica la fine di un centro abitato",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica la fine di un centro abitato", fa: "پایانِ یک منطقه‌ی شهری را نشان می‌دهد", focus: "contrast", verb: "indica ← indicare" },
      ],
      translation: "تابلوی نشان‌داده‌شده پایانِ یک منطقه‌ی شهری را نشان می‌دهد.",
      why: "غلط است (درس ۱). VIA LIBERA پایانِ ممنوعیت‌های قبلی است، نه مرز شهر.",
      rule: "DPR 495/1992 art. 119 c.1 lett. a",
      conceptStep: 1,
    },
    {
      sourceId: "1220",
      sign: 55,
      textIt: "Il segnale raffigurato non consente la circolazione dei veicoli in quella strada",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "non consente la circolazione dei veicoli", fa: "اجازه‌ی رفت‌وآمد وسیله‌ها را نمی‌دهد", focus: "negation", verb: "consente ← consentire" },
        { it: "in quella strada", fa: "در آن خیابان" },
      ],
      translation: "تابلوی نشان‌داده‌شده اجازه‌ی رفت‌وآمد وسیله‌ها را در آن خیابان نمی‌دهد.",
      why: "غلط است (درس ۲). در آن خیابان رفت‌وآمد هست، فقط از سرِ دیگر و در یک جهت.",
      rule: "DPR 495/1992 art. 116 c.1 lett. b",
      conceptStep: 1,
    },
    {
      sourceId: "1286",
      sign: 58,
      textIt: "Il segnale raffigurato impone di mantenere una distanza di sicurezza di almeno 80 metri",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "impone di mantenere", fa: "مجبور می‌کند نگه داری", verb: "impone ← imporre" },
        { it: "una distanza di sicurezza di almeno 80 metri", fa: "فاصله‌ی ایمنی دست‌کم ۸۰ متر", focus: "contrast" },
      ],
      translation: "تابلوی نشان‌داده‌شده مجبورت می‌کند فاصله‌ی ایمنی دست‌کم ۸۰ متر نگه داری.",
      why: "غلط است (درس ۳). عدد بدون «m» و بدون دو خودرو یعنی سرعت به کیلومتر بر ساعت.",
      rule: "DPR 495/1992 art. 116 c.1 lett. e",
      conceptStep: 1,
    },
    {
      sourceId: "1308",
      sign: 59,
      textIt: "Il segnale raffigurato consente l'uso del clacson nei casi di ingorgo stradale",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "consente l'uso del clacson", fa: "اجازه‌ی بوق زدن می‌دهد", verb: "consente ← consentire" },
        { it: "nei casi di ingorgo stradale", fa: "در راهبندان", focus: "condition" },
      ],
      translation: "تابلوی نشان‌داده‌شده در راهبندان اجازه‌ی بوق زدن می‌دهد.",
      why: "غلط است (درس ۴). راهبندان خطر فوری نیست.",
      rule: "DPR 495/1992 art. 116 c.1 lett. f",
      conceptStep: 1,
    },
    {
      sourceId: "1313",
      sign: 60,
      textIt: "Il segnale raffigurato consente ad un autobus di massa a pieno carico pari a 18 tonnellate di sorpassare un autotreno",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "consente ad un autobus di massa a pieno carico pari a 18 tonnellate", fa: "به اتوبوسی با وزن با بار کامل ۱۸ تن اجازه می‌دهد", verb: "consente ← consentire" },
        { it: "di sorpassare un autotreno", fa: "از یک کامیون با یدک سبقت بگیرد" },
      ],
      translation: "تابلوی نشان‌داده‌شده به اتوبوسی با وزن با بار کامل ۱۸ تن اجازه می‌دهد از یک کامیون با یدک سبقت بگیرد.",
      why: "درست است (درس ۵). اتوبوس مسافربر است؛ تابلو فقط وسیله‌های باری را محدود می‌کند.",
      rule: "DPR 495/1992 art. 117 c.1 lett. a",
      conceptStep: 1,
    },
    {
      sourceId: "1370",
      sign: 64,
      textIt: "Il segnale raffigurato vieta il transito ai ciclomotori",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "vieta il transito ai ciclomotori", fa: "عبور موتور گازی‌ها را ممنوع می‌کند", focus: "contrast", verb: "vieta ← vietare" },
      ],
      translation: "تابلوی نشان‌داده‌شده عبور موتور گازی‌ها را ممنوع می‌کند.",
      why: "غلط است (درس ۶). فقط موتورسیکلت ممنوع است؛ موتور گازی گروه دیگری است.",
      rule: "DPR 495/1992 art. 117 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "1393",
      sign: 66,
      textIt: "In presenza del segnale raffigurato è consentito il transito alle autovetture adibite al servizio di taxi",
      answer: 0,
      chunks: [
        { it: "In presenza del segnale raffigurato", fa: "وقتی این تابلو هست" },
        { it: "è consentito il transito alle autovetture", fa: "عبور سواری‌ها مجاز است" },
        { it: "adibite al servizio di taxi", fa: "که تاکسی‌اند", focus: "contrast", verb: "adibite ← adibire" },
      ],
      translation: "وقتی این تابلو هست، عبور سواری‌هایی که تاکسی‌اند مجاز است.",
      why: "غلط است (درس ۷). تاکسی هم سواری است.",
      rule: "DPR 495/1992 art. 117 c.1 lett. g",
      conceptStep: 1,
    },
    {
      sourceId: "1423",
      sign: 69,
      textIt: "In presenza del segnale raffigurato è consentito il transito agli autocarri di massa complessiva pari a 7,5 tonnellate",
      answer: 0,
      chunks: [
        { it: "In presenza del segnale raffigurato", fa: "وقتی این تابلو هست" },
        { it: "è consentito il transito agli autocarri", fa: "عبور کامیون‌ها مجاز است" },
        { it: "di massa complessiva pari a 7,5 tonnellate", fa: "با وزن کل ۷٫۵ تن", focus: "limit" },
      ],
      translation: "وقتی این تابلو هست، عبور کامیون‌هایی با وزن کل ۷٫۵ تن مجاز است.",
      why: "غلط است (درس ۸). ۷٫۵ بیشتر از ۶٫۵ است.",
      rule: "DPR 495/1992 art. 117 c.1 lett. i",
      conceptStep: 1,
    },
    {
      sourceId: "1453",
      sign: 72,
      textIt: "Il segnale raffigurato vieta il transito alle autocisterne che trasportano benzina",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "vieta il transito alle autocisterne", fa: "عبور تانکرها را ممنوع می‌کند", verb: "vieta ← vietare" },
        { it: "che trasportano benzina", fa: "که بنزین حمل می‌کنند", verb: "trasportano ← trasportare" },
      ],
      translation: "تابلوی نشان‌داده‌شده عبور تانکرهایی را که بنزین حمل می‌کنند ممنوع می‌کند.",
      why: "درست است (درس ۹). بنزینِ بار، بار خطرناک است.",
      rule: "DPR 495/1992 art. 117 c.1 lett. n",
      conceptStep: 1,
    },
    {
      sourceId: "1495",
      sign: 76,
      textIt: "Il segnale raffigurato indica un passaggio alto 3,50 metri",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica un passaggio alto 3,50 metri", fa: "گذرگاهی به ارتفاع ۳٫۵۰ متر را نشان می‌دهد", focus: "contrast", verb: "indica ← indicare" },
      ],
      translation: "تابلوی نشان‌داده‌شده گذرگاهی به ارتفاع ۳٫۵۰ متر را نشان می‌دهد.",
      why: "غلط است (درس ۱۰). عدد بیشترین بلندیِ مجازِ وسیله است، نه ارتفاع زیرگذر.",
      rule: "DPR 495/1992 art. 118 c.1 lett. b",
      conceptStep: 1,
    },
    {
      sourceId: "1635",
      sign: 85,
      textIt: "Il segnale raffigurato vieta la fermata, ma consente la sosta",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "vieta la fermata,", fa: "توقف کوتاه را ممنوع می‌کند،", verb: "vieta ← vietare" },
        { it: "ma consente la sosta", fa: "ولی پارک را مجاز می‌کند", focus: "contrast", verb: "consente ← consentire" },
      ],
      translation: "تابلوی نشان‌داده‌شده توقف کوتاه را ممنوع می‌کند، ولی پارک را مجاز می‌داند.",
      why: "غلط است (درس ۱۱). وقتی حتی توقف کوتاه ممنوع است، پارک حتماً ممنوع است.",
      rule: "DPR 495/1992 art. 120 c.1 lett. b",
      conceptStep: 1,
    },
    {
      sourceId: "1690",
      sign: 92,
      textIt: "Il segnale raffigurato vieta la sosta dalle ore 7.00 alle ore 9.00",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "vieta la sosta", fa: "پارک را ممنوع می‌کند", verb: "vieta ← vietare" },
        { it: "dalle ore 7.00 alle ore 9.00", fa: "از ساعت ۷ تا ۹", focus: "limit" },
      ],
      translation: "تابلوی نشان‌داده‌شده پارک را از ساعت ۷ تا ۹ ممنوع می‌کند.",
      why: "درست است (درس ۱۲). ساعت‌های کنار تابلوی پارک ممنوع را بخوان.",
      rule: "DPR 495/1992 art. 120 c.1 lett. a",
      conceptStep: 1,
    },
    {
      sourceId: "1668",
      sign: 90,
      textIt: "Il segnale raffigurato, per essere valido, deve contenere l'indicazione dell'ente che ha concesso l'autorizzazione, il numero e l'anno del rilascio",
      answer: 1,
      chunks: [
        { it: "Il segnale raffigurato, per essere valido,", fa: "تابلوی نشان‌داده‌شده برای این‌که معتبر باشد،", focus: "condition" },
        { it: "deve contenere l'indicazione dell'ente", fa: "باید نام اداره‌ای را داشته باشد", verb: "deve ← dovere" },
        { it: "che ha concesso l'autorizzazione,", fa: "که مجوز را داده،", verb: "concesso ← concedere" },
        { it: "il numero e l'anno del rilascio", fa: "و شماره و سال صدور را" },
      ],
      translation: "تابلوی نشان‌داده‌شده برای این‌که معتبر باشد، باید نام اداره‌ی صادرکننده‌ی مجوز و شماره و سال صدور را داشته باشد.",
      why: "درست است (درس ۱۳). بدون این‌ها ممنوعیت اعتبار ندارد.",
      rule: "DPR 495/1992 art. 120 c.1 lett. e",
      conceptStep: 1,
    },
  ],
  related: [],
};

export const DIVIETO_CHAPTER: Chapter = {
  id: "segnali-divieto",
  numbers: [3],
  // DB topic 2 was keyword-guessed at import; its practice card still benefits from these lessons.
  topicIds: [2],
  nameIt: "Segnali di divieto",
  titleFa: "تابلوهای ممنوعیت",
  summaryFa: "دایره‌های قرمز: هر تابلو چه چیزی را ممنوع می‌کند، برای چه کسی، از کجا و تا کی؛ و پارک و توقف. سیزده درس کوتاه و یک مرور.",
  reviewedOn: "2026-11-01",
  sources: [
    {
      label: "Codice della Strada (D.Lgs. 285/1992), testo vigente: artt. 50, 56, 142, 156, 157, 158, 159",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    {
      label: "Regolamento di esecuzione (DPR 495/1992), artt. 81 c.8, 104, 116–120",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1992-12-16;495",
    },
    {
      label: "Testo consolidato consultato il 01/11/2026: Legge in Chiaro (artt. 81, 104, 116–120 aggiornati al 26–30/10/2026)",
      url: "https://leggeinchiaro.it/articolo-116-regolamento-codice-strada/",
    },
    {
      label: "ACI, Codice della Strada artt. 50, 56, 157, 158 (pagine aggiornate al 01/11/2026)",
      url: "https://aci.gov.it/codice-della-strada/art-157/",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «segnali-divieto»",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [
    lessonRiconoscere,
    lessonTransitoSensoVietato,
    lessonVelocitaDistanza,
    lessonClacson,
    lessonSorpassoPesanti,
    lessonUtenti,
    lessonAutoveicoli,
    lessonPesanti,
    lessonMerciPericolose,
    lessonDimensioni,
    lessonSostaFermata,
    lessonOrariPannelli,
    lessonParcheggio,
    review,
  ],
};
