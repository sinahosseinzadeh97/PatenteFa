/**
 * src/content/lessons-obbligo.ts
 * Chapter 4 of the ministerial program — "Segnali di obbligo" — question-bank
 * source ids 1715–2147 (the fourth top-level group of quizPatenteB2023.json,
 * "segnali-obbligo"). Lessons live in ch4-direzioni.ts and ch4-percorsi.ts;
 * this file adds the chapter review and the chapter itself.
 *
 * Every chapter-4 question is mapped to exactly one chapter-4 lesson section;
 * no earlier chapter mapped any of them. tests/chapter4.test.ts pins that.
 * Not to be confused with Chapter 15 (`sorpasso-segnaletica`), which was the
 * fourth learning module built, before the course followed bank order.
 */
import type { Chapter, Lesson } from "./lessons.js";
import {
  lessonDirezioneObbligatoria,
  lessonDirezioniConsentite,
  lessonPassaggioObbligatorio,
  lessonPreavvisoDirezione,
  lessonRiconoscereObbligo,
  lessonRotatoria,
} from "./ch4-direzioni.js";
import { lessonAlt, lessonCatene, lessonLimiteMinimo, lessonPercorsiMisti, lessonPercorsiPedoniBici } from "./ch4-percorsi.js";
import { SIGN, SIGN_FA } from "./ch4-signs.js";

/** First and last bank source id of chapter 4, for coverage checks. */
export const CHAPTER_4_SOURCE_RANGE = [1715, 2147] as const;

const review: Lesson = {
  id: "ripasso-capitolo-4",
  titleFa: "مرور فصل ۴",
  titleIt: "RIPASSO · SEGNALI DI OBBLIGO",
  minutes: 7,
  signs: [93, 98, 101, 105, 113, 118],
  review: true,
  steps: [
    {
      kind: "intro",
      title: "مرور فصل",
      objective:
        "یازده سؤال واقعی از بانک، یکی از هر درس. هیچ‌کدام را در درس‌ها ندیده‌ای، پس این مرور نشان می‌دهد چه چیزی واقعاً در ذهنت مانده است.",
      why: "در این فصل تقریباً هر سؤال یکی از دو چیز را می‌پرسد: «این تابلو چه چیزی را فقط مجاز می‌کند؟» و «از کجا و تا کجا؟». سؤالی که اینجا اشتباه کنی به فهرست مرورت اضافه می‌شود و به بخشِ درسِ مربوطش وصل است.",
    },
    {
      kind: "table",
      title: "فصل ۴ در یازده خط",
      body: "قبل از سؤال‌ها، نکته‌ی اصلی هر درس را یک بار دیگر ببین. اگر جایی برایت تازه بود، اول همان درس را دوباره باز کن.",
      columns: ["نکته‌ی اصلی"],
      rows: [
        { label: "درس ۱", it: "obbligo · prescrizione", sign: 93, values: ["دایره‌ی آبی = اجبار (نوعی دستور)؛ نه ممنوعیت، نه خطر، نه اطلاعات؛ پایان = نوار قرمز روی آبی"] },
        { label: "درس ۲", it: "direzione obbligatoria", sign: 94, values: ["یک فلش صاف = تنها جهت مجاز سرِ تقاطع؛ یک‌طرفه نیست"] },
        { label: "درس ۳", it: "preavviso", sign: 97, values: ["فلش خمیده = خبرِ اجبار در تقاطعِ بعدی، نه «همین الان»؛ با تصویر کامیون فقط برای کامیون‌ها"] },
        { label: "درس ۴", it: "direzioni consentite", sign: 98, values: ["دو فلش = دو جهت مجاز، انتخاب با تو؛ جهت سوم ممنوع"] },
        { label: "درس ۵", it: "passaggio", sign: 101, values: ["فلش مورب = از آن طرفِ مانع رد شو؛ مانع طرفِ مقابل می‌ماند"] },
        { label: "درس ۶", it: "rotatoria", sign: 104, values: ["سرِ ورودیِ میدان، نه وسطش؛ برای همه؛ بیرون شهر بعد از مثلث"] },
        { label: "درس ۷", it: "limite minimo", sign: 105, values: ["عدد در آبی = کف؛ تا سقفِ جاده آزاد؛ کُندتر از عدد ورود ممنوع"] },
        { label: "درس ۸", it: "catene", sign: 107, values: ["زنجیر یا لاستیک زمستانی، یکی کافی است؛ از خودِ تابلو"] },
        { label: "درس ۹", it: "pedonale · ciclabile", sign: 110, values: ["نماد در آبی = فقط همین گروه؛ در قرمز = همین گروه ممنوع"] },
        { label: "درس ۱۰", it: "contigua · promiscuo · sella", sign: 113, values: ["خط وسط = دو مسیرِ جدا؛ بدون خط = مشترک؛ اسب در آبی = مسیرِ اسب، نه خطر"] },
        { label: "درس ۱۱", it: "ALT", sign: 119, values: ["همیشه کامل بایست: گمرک، ایستِ پلیس، عوارضی آزادراه"] },
      ],
      takeaway: "جمله‌ای که به «فقط»، «همین الان»، «پیشنهادی» یا «ممنوع» تکیه می‌کند را با تصویر مقایسه کن: تابلوی اجبار می‌گوید «فقط این».",
    },
  ],
  practice: [
    {
      sourceId: "1856",
      sign: 98,
      textIt: "Il segnale raffigurato è un segnale di divieto",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "è un segnale di divieto", fa: "یک تابلوی ممنوعیت است", focus: "contrast" },
      ],
      translation: "تابلوی نشان‌داده‌شده یک تابلوی ممنوعیت است.",
      why: "غلط است (درس ۱). دایره‌ی آبی تابلوی اجبار است، حتی وقتی مستقیم رفتن را می‌بندد.",
      rule: "DPR 495/1992 art. 122 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "1795",
      sign: 95,
      textIt: "Il segnale raffigurato indica che si può svoltare soltanto a destra",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che si può svoltare", fa: "نشان می‌دهد که می‌شود پیچید", verb: "si può ← potere" },
        { it: "soltanto a destra", fa: "فقط به راست", focus: "limit" },
      ],
      translation: "تابلوی نشان‌داده‌شده نشان می‌دهد که فقط می‌شود به راست پیچید.",
      why: "درست است (درس ۲). یک فلش = تنها جهت مجاز.",
      rule: "DPR 495/1992 art. 122 c.2",
      conceptStep: 1,
    },
    {
      sourceId: "1734",
      sign: 97,
      textIt: "Il segnale raffigurato indica che non è consentito svoltare a sinistra al prossimo incrocio",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che non è consentito", fa: "نشان می‌دهد که مجاز نیست", focus: "negation", verb: "indica ← indicare" },
        { it: "svoltare a sinistra al prossimo incrocio", fa: "در تقاطع بعدی به چپ پیچید", focus: "contrast" },
      ],
      translation: "تابلوی نشان‌داده‌شده نشان می‌دهد که در تقاطع بعدی پیچیدن به چپ مجاز نیست.",
      why: "غلط است (درس ۳). برعکس: در تقاطع بعدی فقط چپ مجاز است.",
      rule: "DPR 495/1992 art. 122 c.2",
      conceptStep: 1,
    },
    {
      sourceId: "1895",
      sign: 100,
      textIt: "Il segnale raffigurato indica che è consentito soltanto svoltare a sinistra",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che è consentito", fa: "نشان می‌دهد که مجاز است", verb: "indica ← indicare" },
        { it: "soltanto svoltare a sinistra", fa: "فقط به چپ پیچیدن", focus: "limit" },
      ],
      translation: "تابلوی نشان‌داده‌شده نشان می‌دهد که فقط پیچیدن به چپ مجاز است.",
      why: "غلط است (درس ۴). مستقیم هم مجاز است.",
      rule: "DPR 495/1992 art. 122 c.3",
      conceptStep: 1,
    },
    {
      sourceId: "1922",
      sign: 101,
      textIt: "Il segnale raffigurato indica che bisogna superare il salvagente lasciandolo alla propria sinistra",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che bisogna superare il salvagente", fa: "نشان می‌دهد که باید از کنار سکوی پناه رد شد", verb: "bisogna ← bisognare" },
        { it: "lasciandolo alla propria sinistra", fa: "طوری که سکو سمت چپِ خودت بماند", focus: "contrast", verb: "lasciandolo ← lasciare" },
      ],
      translation: "تابلوی نشان‌داده‌شده نشان می‌دهد که باید از کنار سکوی پناه رد شد، طوری که سکو سمت چپِ خودت بماند.",
      why: "غلط است (درس ۵). عبور از چپ یعنی سکو سمت راستت می‌ماند.",
      rule: "DPR 495/1992 art. 122 c.4",
      conceptStep: 1,
    },
    {
      sourceId: "1970",
      sign: 104,
      textIt: "Il segnale raffigurato prescrive un obbligo di ROTATORIA solo per le autovetture",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "prescrive un obbligo di ROTATORIA", fa: "اجبارِ دور زدن در میدان را می‌گذارد", verb: "prescrive ← prescrivere" },
        { it: "solo per le autovetture", fa: "فقط برای سواری‌ها", focus: "limit" },
      ],
      translation: "تابلوی نشان‌داده‌شده اجبارِ دور زدن در میدان را فقط برای سواری‌ها می‌گذارد.",
      why: "غلط است (درس ۶). برای همه‌ی وسیله‌هاست.",
      rule: "DPR 495/1992 art. 122 c.6",
      conceptStep: 1,
    },
    {
      sourceId: "1990",
      sign: 105,
      textIt: "Il segnale raffigurato prescrive di marciare alla velocità costante di 30 km/h",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "prescrive di marciare", fa: "دستور می‌دهد حرکت کنی", verb: "prescrive ← prescrivere" },
        { it: "alla velocità costante di 30 km/h", fa: "با سرعتِ ثابتِ ۳۰ کیلومتر بر ساعت", focus: "contrast" },
      ],
      translation: "تابلوی نشان‌داده‌شده دستور می‌دهد با سرعتِ ثابتِ ۳۰ کیلومتر بر ساعت حرکت کنی.",
      why: "غلط است (درس ۷). ۳۰ کف است؛ تندتر هم مجاز است.",
      rule: "DPR 495/1992 art. 122 c.7",
      conceptStep: 1,
    },
    {
      sourceId: "2014",
      sign: 107,
      textIt: "Il segnale raffigurato vieta il transito a veicoli sprovvisti di catene o pneumatici invernali",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "vieta il transito a veicoli", fa: "عبورِ وسیله‌هایی را ممنوع می‌کند", verb: "vieta ← vietare" },
        { it: "sprovvisti di catene o pneumatici invernali", fa: "که نه زنجیر دارند نه لاستیک زمستانی" },
      ],
      translation: "تابلوی نشان‌داده‌شده عبورِ وسیله‌هایی را که نه زنجیر دارند نه لاستیک زمستانی ممنوع می‌کند.",
      why: "درست است (درس ۸). اجبار برای دیگران یعنی ممنوعیت.",
      rule: "DPR 495/1992 art. 122 c.8",
      conceptStep: 1,
    },
    {
      sourceId: "2043",
      sign: 110,
      textIt: "Il segnale raffigurato vieta il transito alle biciclette",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "vieta il transito alle biciclette", fa: "عبورِ دوچرخه‌ها را ممنوع می‌کند", focus: "contrast", verb: "vieta ← vietare" },
      ],
      translation: "تابلوی نشان‌داده‌شده عبورِ دوچرخه‌ها را ممنوع می‌کند.",
      why: "غلط است (درس ۹). دوچرخه در دایره‌ی آبی یعنی فقط دوچرخه.",
      rule: "DPR 495/1992 art. 122 c.9",
      conceptStep: 1,
    },
    {
      sourceId: "2071",
      sign: 113,
      textIt: "Il segnale raffigurato è posto in corrispondenza di una pista ciclabile a fianco del marciapiede",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "è posto in corrispondenza di una pista ciclabile", fa: "سرِ یک مسیرِ دوچرخه نصب شده", verb: "posto ← porre" },
        { it: "a fianco del marciapiede", fa: "کنارِ پیاده‌رو", focus: "contrast" },
      ],
      translation: "تابلوی نشان‌داده‌شده سرِ یک مسیرِ دوچرخه کنارِ پیاده‌رو نصب شده.",
      why: "غلط است (درس ۱۰). بدون خطِ وسط یعنی یک مسیرِ مشترک، نه دو مسیرِ کنار هم.",
      rule: "DPR 495/1992 art. 122 c.9",
      conceptStep: 1,
    },
    {
      sourceId: "2113",
      sign: 118,
      textIt: "Il segnale raffigurato obbliga a rallentare fermandosi al varco doganale solo se si hanno oggetti o merci da dichiarare",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "obbliga a rallentare fermandosi al varco doganale", fa: "مجبور می‌کند آهسته کنی و در گذرگاهِ گمرک بایستی", verb: "fermandosi ← fermarsi" },
        { it: "solo se si hanno oggetti o merci da dichiarare", fa: "فقط اگر چیز یا کالایی برای اظهار داشته باشی", focus: "condition" },
      ],
      translation: "تابلوی نشان‌داده‌شده مجبورت می‌کند فقط وقتی چیز یا کالایی برای اظهار داری آهسته کنی و در گذرگاهِ گمرک بایستی.",
      why: "غلط است (درس ۱۱). ایستادن همیشه اجباری است.",
      rule: "DPR 495/1992 art. 123 c.2",
      conceptStep: 1,
    },
  ],
  related: [],
};

export const OBBLIGO_CHAPTER: Chapter = {
  id: "segnali-obbligo",
  numbers: [4],
  // DB topic 3 was keyword-guessed at import; its practice card still benefits from these lessons.
  topicIds: [3],
  nameIt: "Segnali di obbligo",
  titleFa: "تابلوهای اجبار",
  summaryFa: "دایره‌های آبی: کدام جهت، کدام طرفِ مانع، چه سرعتی، با چه تجهیزاتی و برای چه کسانی؛ و سه تابلوی ALT. یازده درس کوتاه و یک مرور.",
  reviewedOn: "2026-11-07",
  sources: [
    {
      label: "Regolamento di esecuzione (DPR 495/1992), artt. 104, 116–117, 122–123",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1992-12-16;495",
    },
    {
      label: "Testo consolidato consultato il 07/11/2026: Legge in Chiaro, artt. 122 e 123 (aggiornati al 28/10/2026)",
      url: "https://leggeinchiaro.it/articolo-122-regolamento-codice-strada/",
    },
    {
      label: "Codice della Strada (D.Lgs. 285/1992), testo vigente: art. 142",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «segnali-obbligo»",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [
    lessonRiconoscereObbligo,
    lessonDirezioneObbligatoria,
    lessonPreavvisoDirezione,
    lessonDirezioniConsentite,
    lessonPassaggioObbligatorio,
    lessonRotatoria,
    lessonLimiteMinimo,
    lessonCatene,
    lessonPercorsiPedoniBici,
    lessonPercorsiMisti,
    lessonAlt,
    review,
  ],
};
