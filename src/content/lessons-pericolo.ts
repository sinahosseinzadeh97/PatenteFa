/**
 * src/content/lessons-pericolo.ts
 * Chapter 2 of the ministerial program — "Segnali di pericolo" — question-bank
 * source ids 532–1193 (the second top-level group of quizPatenteB2023.json,
 * "segnali-pericolo"). Lessons live in ch2-strada.ts, ch2-tracciato.ts and
 * ch2-utenti.ts; this file adds the chapter review and the chapter itself.
 *
 * Every chapter-2 question is mapped to one chapter-2 lesson section, except
 * #871, #896 and #963: Velocità (lessons-velocita.ts) practises them, so their
 * mistakes keep routing there. tests/chapter2.test.ts pins that list.
 */
import type { Chapter, Lesson } from "./lessons.js";
import { lessonAderenza, lessonDossoCunetta, lessonFondo, lessonForma, lessonPendenza } from "./ch2-strada.js";
import { lessonCroce, lessonCurve, lessonPassaggiLivello, lessonStrettoie } from "./ch2-tracciato.js";
import { lessonAmbiente, lessonBambiniAnimali, lessonPedoni, lessonSemafori, lessonTram } from "./ch2-utenti.js";
import { SIGN, SIGN_FA } from "./ch2-signs.js";

/** First and last bank source id of chapter 2, for coverage checks. */
export const CHAPTER_2_SOURCE_RANGE = [532, 1193] as const;

/** Chapter-2 questions practised (and so mapped) by another chapter's lesson. */
export const CHAPTER_2_MAPPED_ELSEWHERE = ["871", "896", "963"] as const;

const review: Lesson = {
  id: "ripasso-capitolo-2",
  titleFa: "مرور فصل ۲",
  titleIt: "RIPASSO · SEGNALI DI PERICOLO",
  minutes: 8,
  signs: [2, 8, 37],
  review: true,
  steps: [
    {
      kind: "intro",
      title: "مرور فصل",
      objective:
        "چهارده سؤال واقعی از بانک، یکی از هر درس. هیچ‌کدام را در درس‌ها ندیده‌ای، پس این مرور نشان می‌دهد چه چیزی واقعاً در ذهنت مانده است.",
      why: "در این فصل اول باید تابلو را بشناسی، بعد جمله را بخوانی. سؤالی که اینجا اشتباه کنی به فهرست مرورت اضافه می‌شود و به درسِ مربوطش وصل است.",
    },
    {
      kind: "table",
      title: "فصل ۲ در چهارده خط",
      body: "قبل از سؤال‌ها، نکته‌ی اصلی هر درس را یک بار دیگر ببین. اگر جایی برایت تازه بود، اول همان درس را دوباره باز کن.",
      columns: ["نکته‌ی اصلی"],
      rows: [
        { label: "درس ۱", it: "triangolo · 150 m", sign: 39, values: ["مثلث رو به بالا = خطر؛ معمولاً ۱۵۰ متر قبل؛ عدد با فلش = طول، بدون فلش = فاصله؛ زمینه‌ی زرد = کارگاه"] },
        { label: "درس ۲", it: "dosso · cunetta", sign: 2, values: ["برآمدگی: بالا بعد پایین، دید کم؛ فرورفتگی: پایین بعد بالا، آب و گل"] },
        { label: "درس ۳", it: "discesa · salita", sign: 17, values: ["عدد = درصد شیب، نه سرعت؛ در سرازیری دنده‌ی سنگین و ترمز کوتاه"] },
        { label: "درس ۴", it: "deformata · banchina · massi", sign: 1, values: ["آسفالت خراب، شانه‌ی نرم، سنگ از کوه؛ هیچ‌کدام سبقت را ممنوع نمی‌کنند"] },
        { label: "درس ۵", it: "sdrucciolevole · pietrisco", sign: 24, values: ["چسبندگی کم = ترمز طولانی‌تر: آهسته، نرم، با فاصله‌ی بیشتر"] },
        { label: "درس ۶", it: "curve", sign: 6, values: ["جهت را از پیچ اول بخوان؛ در پیچ سمت راست، بدون سبقت، توقف یا دور زدن"] },
        { label: "درس ۷", it: "strettoia · doppio senso", sign: 19, values: ["باریک‌شدن نوبت را تعیین نمی‌کند؛ دو فلش مخالف = از اینجا دوطرفه"] },
        { label: "درس ۸", it: "passaggio a livello", sign: 8, values: ["نرده = راه‌بند هست؛ لوکوموتیو = نیست؛ با چراغ روشن یا زنگ بایست"] },
        { label: "درس ۹", it: "croce · pannelli", sign: 11, values: ["سه، دو، یک خط = ۱۵۰، ۱۰۰، ۵۰ متر؛ صلیب کنار ریل؛ صلیب دوتایی = بیش از یک ریل"] },
        { label: "درس ۱۰", it: "tram", sign: 14, values: ["سبقت از راست؛ از تراموای ایستاده فقط با salvagente؛ روی ریل بدون مزاحمت"] },
        { label: "درس ۱۱", it: "pedoni · ciclisti", sign: 15, values: ["مثلث قبل از گذرگاه است؛ عابر و دوچرخه روی خط‌کشی حق تقدم دارند"] },
        { label: "درس ۱۲", it: "bambini · animali", sign: 25, values: ["ممنوعیت نیست، عدد سرعت هم نیست؛ آهسته و آماده‌ی ترمز؛ بوق نزن"] },
        { label: "درس ۱۳", it: "semaforo · ponte mobile", sign: 34, values: ["فقط دایره‌ی زرد چشمک‌زن می‌شود؛ پل متحرک: با چراغ قرمز چشمک‌زن بایست"] },
        { label: "درس ۱۴", it: "vento · aerei · incendio · molo", sign: 37, values: ["جوراب بادنما = باد؛ پهلوی بزرگ و وزن کم = خطر بیشتر"] },
      ],
      takeaway: "جمله‌هایی که تابلوی خطر را ممنوعیت، اجبار یا حق تقدم جلوه می‌دهند در این فصل تقریباً همیشه غلط‌اند.",
    },
  ],
  practice: [
    {
      sourceId: "1092",
      sign: 34,
      textIt: "Il segnale raffigurato è a fondo giallo se posto prima di un cantiere stradale",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "è a fondo giallo", fa: "زمینه‌اش زرد است" },
        { it: "se posto prima di un cantiere stradale", fa: "اگر قبل از کارگاه جاده‌ای نصب شده باشد", focus: "condition", verb: "posto ← porre" },
      ],
      translation: "تابلوی نشان‌داده‌شده اگر قبل از کارگاه جاده‌ای نصب شده باشد، زمینه‌اش زرد است.",
      why: "درست است (درس ۱). تابلوی خطر موقتِ کارگاه زمینه‌ی زرد دارد.",
      rule: "DPR 495/1992 art. 31 c.4 lett. f",
      conceptStep: 1,
    },
    {
      sourceId: "601",
      sign: 3,
      textIt: "Il segnale raffigurato preannuncia un dosso",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "preannuncia un dosso", fa: "از یک برآمدگی خبر می‌دهد", verb: "preannuncia ← preannunciare" },
      ],
      translation: "تابلوی نشان‌داده‌شده از یک برآمدگی خبر می‌دهد.",
      why: "غلط است (درس ۲). گودی به پایین است: cunetta.",
      rule: "DPR 495/1992 art. 85 c.3",
      conceptStep: 1,
    },
    {
      sourceId: "884",
      sign: 17,
      textIt: "Il segnale raffigurato preannuncia una salita pericolosa",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "preannuncia una salita pericolosa", fa: "از یک سربالایی خطرناک خبر می‌دهد", verb: "preannuncia ← preannunciare" },
      ],
      translation: "تابلوی نشان‌داده‌شده از یک سربالایی خطرناک خبر می‌دهد.",
      why: "غلط است (درس ۳). شکل سیاه در جهت حرکت پایین می‌آید: سرازیری خطرناک.",
      rule: "DPR 495/1992 art. 89",
      conceptStep: 1,
    },
    {
      sourceId: "1168",
      sign: 23,
      textIt: "Il segnale raffigurato preannuncia un tratto di strada con banchina non praticabile",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "preannuncia un tratto di strada", fa: "از بخشی از جاده خبر می‌دهد", verb: "preannuncia ← preannunciare" },
        { it: "con banchina non praticabile", fa: "که شانه‌اش قابل استفاده نیست", focus: "negation" },
      ],
      translation: "تابلوی نشان‌داده‌شده از بخشی از جاده خبر می‌دهد که شانه‌اش قابل استفاده نیست.",
      why: "درست است (درس ۴). شانه‌ی نرم یا غیرقابل استفاده.",
      rule: "DPR 495/1992 art. 92 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "968",
      sign: 24,
      textIt: "Il segnale raffigurato invita a diminuire la distanza di sicurezza",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "invita a diminuire la distanza di sicurezza", fa: "می‌خواهد فاصله‌ی ایمنی را کم کنی", verb: "invita ← invitare" },
      ],
      translation: "تابلوی نشان‌داده‌شده می‌خواهد فاصله‌ی ایمنی را کم کنی.",
      why: "غلط است (درس ۵). روی جاده‌ی لغزنده ترمز طولانی‌تر است؛ فاصله باید بیشتر شود.",
      rule: "CdS art. 149 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "680",
      sign: 6,
      textIt: "In presenza del segnale raffigurato, posto su strada a due corsie e a doppio senso di circolazione, è consentito sorpassare nelle ore diurne",
      answer: 0,
      chunks: [
        { it: "In presenza del segnale raffigurato,", fa: "وقتی این تابلو هست،" },
        { it: "posto su strada a due corsie e a doppio senso di circolazione,", fa: "در جاده‌ی دوطرفه با دو خط،", verb: "posto ← porre" },
        { it: "è consentito sorpassare", fa: "سبقت مجاز است" },
        { it: "nelle ore diurne", fa: "در ساعت‌های روز", focus: "condition" },
      ],
      translation: "وقتی این تابلو در جاده‌ی دوطرفه با دو خط نصب شده، سبقت در ساعت‌های روز مجاز است.",
      why: "غلط است (درس ۶). روشنایی روز پشت پیچ را نشانت نمی‌دهد؛ سبقت ممنوع است.",
      rule: "CdS art. 148 c.10",
      conceptStep: 1,
    },
    {
      sourceId: "937",
      sign: 21,
      textIt: "Il segnale raffigurato obbliga a dare la precedenza ai veicoli provenienti dal senso opposto",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "obbliga a dare la precedenza", fa: "مجبور می‌کند راه بدهی", verb: "obbliga ← obbligare" },
        { it: "ai veicoli provenienti dal senso opposto", fa: "به وسایلی که از جهت مقابل می‌آیند" },
      ],
      translation: "تابلوی نشان‌داده‌شده مجبورت می‌کند به وسایلی که از جهت مقابل می‌آیند راه بدهی.",
      why: "غلط است (درس ۷). مثلث باریک‌شدن نوبت را تعیین نمی‌کند.",
      rule: "DPR 495/1992 art. 90",
      conceptStep: 1,
    },
    {
      sourceId: "710",
      sign: 8,
      textIt: "Dopo il segnale raffigurato, se ci sono le semibarriere, è installato un dispositivo a luci rosse lampeggianti",
      answer: 1,
      chunks: [
        { it: "Dopo il segnale raffigurato,", fa: "بعد از تابلوی نشان‌داده‌شده،" },
        { it: "se ci sono le semibarriere,", fa: "اگر نیم‌راه‌بند باشد،", focus: "condition" },
        { it: "è installato un dispositivo a luci rosse lampeggianti", fa: "یک دستگاه چراغ قرمز چشمک‌زن نصب است", verb: "installato ← installare" },
      ],
      translation: "بعد از تابلوی نشان‌داده‌شده، اگر نیم‌راه‌بند باشد، یک دستگاه چراغ قرمز چشمک‌زن نصب است.",
      why: "درست است (درس ۸). نیم‌راه‌بند همیشه دو چراغ قرمز یکی‌درمیان دارد.",
      rule: "CdS art. 44 c.2",
      conceptStep: 1,
    },
    {
      sourceId: "772",
      sign: 10,
      textIt: "Il segnale raffigurato si trova, di norma, a 150 metri dai binari",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "si trova, di norma,", fa: "معمولاً قرار دارد", verb: "si trova ← trovarsi" },
        { it: "a 150 metri dai binari", fa: "۱۵۰ متر مانده به ریل", focus: "limit" },
      ],
      translation: "تابلوی نشان‌داده‌شده معمولاً ۱۵۰ متر مانده به ریل قرار دارد.",
      why: "غلط است (درس ۹). صلیب سنت آندره درست کنار ریل است؛ ۱۵۰ متر جای تابلوی مثلثی گذرگاه است.",
      rule: "DPR 495/1992 art. 87 c.2",
      conceptStep: 1,
    },
    {
      sourceId: "816",
      sign: 14,
      textIt: "Il segnale raffigurato vieta il sorpasso dei tram",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "vieta il sorpasso dei tram", fa: "سبقت از تراموا را ممنوع می‌کند", verb: "vieta ← vietare" },
      ],
      translation: "تابلوی نشان‌داده‌شده سبقت از تراموا را ممنوع می‌کند.",
      why: "غلط است (درس ۱۰). سبقت از تراموا مجاز است، از راست، به شرطی که جا باشد.",
      rule: "CdS art. 148 c.8",
      conceptStep: 1,
    },
    {
      sourceId: "853",
      sign: 16,
      textIt: "Il segnale raffigurato preannuncia un attraversamento per ciclisti, contraddistinto dagli appositi segni sulla carreggiata",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "preannuncia un attraversamento per ciclisti,", fa: "از یک گذرگاه دوچرخه خبر می‌دهد،", verb: "preannuncia ← preannunciare" },
        { it: "contraddistinto dagli appositi segni sulla carreggiata", fa: "که با خط‌کشی مخصوص روی سواره‌رو مشخص شده", verb: "contraddistinto ← contraddistinguere" },
      ],
      translation: "تابلوی نشان‌داده‌شده از گذرگاه دوچرخه‌ای خبر می‌دهد که با خط‌کشی مخصوص روی سواره‌رو مشخص شده.",
      why: "درست است (درس ۱۱).",
      rule: "DPR 495/1992 art. 88 c.3",
      conceptStep: 1,
    },
    {
      sourceId: "1010",
      sign: 27,
      textIt: "Il segnale raffigurato richiede di rallentare e all'occorrenza di arrestarsi se gli animali danno segno di spavento",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "richiede di rallentare e all'occorrenza di arrestarsi", fa: "می‌خواهد آهسته کنی و اگر لازم شد بایستی", verb: "richiede ← richiedere" },
        { it: "se gli animali danno segno di spavento", fa: "اگر حیوان‌ها نشانه‌ی ترس نشان دهند", focus: "condition" },
      ],
      translation: "تابلوی نشان‌داده‌شده می‌خواهد آهسته کنی و اگر لازم شد بایستی، اگر حیوان‌ها نشانه‌ی ترس نشان دهند.",
      why: "درست است (درس ۱۲).",
      rule: "CdS art. 141 c.4",
      conceptStep: 1,
    },
    {
      sourceId: "1188",
      sign: 35,
      textIt: "Il segnale raffigurato può avere il disco rosso sostituito da una luce rossa lampeggiante",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "può avere il disco rosso sostituito", fa: "می‌تواند دایره‌ی قرمزش عوض شود", verb: "sostituito ← sostituire" },
        { it: "da una luce rossa lampeggiante", fa: "با یک چراغ قرمز چشمک‌زن", focus: "contrast" },
      ],
      translation: "دایره‌ی قرمزِ تابلوی نشان‌داده‌شده می‌تواند با یک چراغ قرمز چشمک‌زن عوض شود.",
      why: "غلط است (درس ۱۳). فقط دایره‌ی زرد می‌تواند چراغ چشمک‌زن باشد.",
      rule: "DPR 495/1992 art. 99 c.2",
      conceptStep: 1,
    },
    {
      sourceId: "1131",
      sign: 37,
      textIt: "Il segnale raffigurato preannuncia, in caso di forte vento laterale, un pericolo maggiore all'entrata delle gallerie per i veicoli stretti e alti",
      answer: 0,
      chunks: [
        { it: "Il segnale raffigurato preannuncia,", fa: "تابلوی نشان‌داده‌شده خبر می‌دهد،", verb: "preannuncia ← preannunciare" },
        { it: "in caso di forte vento laterale,", fa: "در باد شدید از پهلو،", focus: "condition" },
        { it: "un pericolo maggiore all'entrata delle gallerie", fa: "از خطر بیشتر در ورودی تونل‌ها", focus: "contrast" },
        { it: "per i veicoli stretti e alti", fa: "برای خودروهای باریک و بلند" },
      ],
      translation: "تابلوی نشان‌داده‌شده خبر می‌دهد که در باد شدید از پهلو، خطر در ورودی تونل‌ها برای خودروهای باریک و بلند بیشتر است.",
      why: "غلط است (درس ۱۴). باد در خروجیِ تونل ناگهان می‌زند، نه در ورودی؛ داخل تونل باد نیست.",
      rule: "DPR 495/1992 art. 101",
      conceptStep: 1,
    },
  ],
  related: [],
};

export const PERICOLO_CHAPTER: Chapter = {
  id: "segnali-pericolo",
  numbers: [2],
  // DB topic 1 was keyword-guessed at import; its practice card still benefits from these lessons.
  topicIds: [1],
  nameIt: "Segnali di pericolo",
  titleFa: "تابلوهای خطر",
  summaryFa: "مثلث‌های قرمز: هر تابلو از قبل چه خطری را خبر می‌دهد و تو چه کنی. چهارده درس کوتاه و یک مرور.",
  reviewedOn: "2026-10-25",
  sources: [
    {
      label: "Codice della Strada (D.Lgs. 285/1992), testo vigente: artt. 39, 40, 44, 126-bis, 141, 143, 147, 148, 149, 154, 158, 191",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    {
      label: "Regolamento di esecuzione (DPR 495/1992), artt. 31, 81, 84–103, 110",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1992-12-16;495",
    },
    {
      label: "Testo consolidato consultato il 25/10/2026: Legge in Chiaro (articoli aggiornati al 23/10/2026)",
      url: "https://leggeinchiaro.it/articolo-84-regolamento-codice-strada/",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «segnali-pericolo»",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [
    lessonForma,
    lessonDossoCunetta,
    lessonPendenza,
    lessonFondo,
    lessonAderenza,
    lessonCurve,
    lessonStrettoie,
    lessonPassaggiLivello,
    lessonCroce,
    lessonTram,
    lessonPedoni,
    lessonBambiniAnimali,
    lessonSemafori,
    lessonAmbiente,
    review,
  ],
};
