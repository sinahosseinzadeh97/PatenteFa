/**
 * src/content/lessons-definizioni.ts
 * Chapter 1 of the ministerial program — "Definizioni generali e doveri
 * nell'uso della strada" — question-bank source ids 1–531 (the first top-level
 * group of quizPatenteB2023.json). Lessons live in ch1-strada.ts, ch1-veicoli.ts
 * and ch1-doveri.ts; this file adds the chapter review and the chapter itself.
 *
 * The review's questions are real bank rows, one per lesson, none of which a
 * lesson already shows. They are mapped (`related`) in their own lessons, so the
 * review maps nothing itself and mistakes route back to the teaching lesson.
 */
import type { Chapter, Lesson } from "./lessons.js";
import { lessonAutostrade, lessonCorsie, lessonElementi, lessonFigure, lessonIncrociZone, lessonStrada } from "./ch1-strada.js";
import { lessonAutoveicoli, lessonDueRuote, lessonMacchinePannelli } from "./ch1-veicoli.js";
import { lessonBambini, lessonCiclisti, lessonDivieti, lessonPedoni, lessonTraffico } from "./ch1-doveri.js";

/** First and last bank source id of chapter 1, for coverage checks. */
export const CHAPTER_1_SOURCE_RANGE = [1, 531] as const;

const review: Lesson = {
  id: "ripasso-capitolo-1",
  titleFa: "مرور فصل ۱",
  titleIt: "RIPASSO · DEFINIZIONI GENERALI E DOVERI",
  minutes: 8,
  signs: [305],
  figures: [562],
  review: true,
  steps: [
    {
      kind: "intro",
      title: "مرور فصل",
      objective:
        "چهارده سؤال واقعی از بانک، یکی از هر درس. هیچ‌کدام را در درس‌ها ندیده‌ای، پس این مرور نشان می‌دهد چه چیزی واقعاً در ذهنت مانده است.",
      why: "خواندن درس با به خاطر سپردن فرق دارد. سؤالی که اینجا اشتباه کنی به فهرست مرورت اضافه می‌شود و به درسِ مربوطش وصل است.",
    },
    {
      kind: "table",
      title: "فصل ۱ در چهارده خط",
      body: "قبل از سؤال‌ها، نکته‌ی اصلی هر درس را یک بار دیگر ببین. اگر جایی برایت تازه بود، اول همان درس را دوباره باز کن.",
      columns: ["نکته‌ی اصلی"],
      rows: [
        { label: "درس ۱", it: "strada · carreggiata", values: ["carreggiata فقط جای حرکت خودروهاست؛ banchina، marciapiede و pista ciclabile بیرون آن ولی داخل strada هستند"] },
        { label: "درس ۲", it: "corsie", values: ["corsia یک ردیف و یک جهت است؛ accelerazione برای ورود، decelerazione برای خروج"] },
        { label: "درس ۳", it: "carreggiate in figura", values: ["مانع فیزیکی سواره‌روها را جدا می‌کند؛ خط‌کشی فقط خط‌ها را"] },
        { label: "درس ۴", it: "elementi", values: ["روی خط عابر نه fermata نه sosta؛ جلوی passo carrabile فقط fermata؛ isola خودروها را هدایت می‌کند، salvagente از عابر محافظت"] },
        { label: "درس ۵", it: "autostrade", values: ["آزادراه ۱۳۰ و سبز، برون‌شهری اصلی ۱۱۰ و آبی؛ هر دو سواره‌روی جدا و بدون تقاطع هم‌سطح"] },
        { label: "درس ۶", it: "incroci · zone", values: ["a raso یعنی هم‌سطح؛ گذرگاه راه‌آهن چراغ قرمز دارد؛ ZTL محدود است، area pedonale بسته"] },
        { label: "درس ۷", it: "due ruote", values: ["مرز موپد: ۵۰ سی‌سی و ۴۵ کیلومتر، دو یا سه چرخ؛ چهارچرخ سبک مثل موپد حساب می‌شود"] },
        { label: "درس ۸", it: "autoveicoli", values: ["autoveicolo: موتوری با حداقل چهار چرخ، جز quadricicli؛ سواری حداکثر ۹ صندلی؛ caravan یدک است، camper نه"] },
        { label: "درس ۹", it: "pannelli", values: ["نوار مورب زرد و قرمز: کامیون بالای ۳٫۵ تن؛ زرد با حاشیه‌ی قرمز: یدک؛ ماشین کشاورزی حداکثر ۴۰"] },
        { label: "درس ۱۰", it: "traffico", values: ["تقاطع، خط عابر، ریل و دهانه‌ی خیابان‌ها را در صف خالی بگذار؛ حق تقدم تو را از احتیاط معاف نمی‌کند"] },
        { label: "درس ۱۱", it: "divieti", values: ["دست زدن به تابلو، مسابقه‌ی بی‌مجوز و کثیف کردن جاده استثنا ندارند"] },
        { label: "درس ۱۲", it: "ciclisti", values: ["آینه، ستون‌ها و در خودرو؛ در سبقت از دوچرخه حداقل ۱٫۵ متر هر جا ممکن است"] },
        { label: "درس ۱۳", it: "pedoni", values: ["جلوی عصای سفید یا سفید و قرمز بایست، حتی بیرون خط عابر؛ به عابر عجله نده"] },
        { label: "درس ۱۴", it: "bambini", values: ["از بچه‌ها رفتار درست انتظار نداشته باش؛ کنار اتوبوس مدرسه به‌خصوص آهسته کن"] },
      ],
      takeaway: "کلمه‌هایی مثل «sempre»، «solo» و «si può essere certi» در این فصل بیشتر وقت‌ها تله‌اند.",
    },
  ],
  practice: [
    {
      sourceId: "203",
      textIt: "La banchina è parte della carreggiata, destinata alla sosta dei veicoli",
      answer: 0,
      chunks: [
        { it: "La banchina", fa: "شانه‌ی جاده" },
        { it: "è parte della carreggiata,", fa: "بخشی از سواره‌رو است،" },
        { it: "destinata alla sosta dei veicoli", fa: "که برای پارک وسایل نقلیه است" },
      ],
      translation: "شانه‌ی جاده بخشی از سواره‌رو است که برای پارک وسایل نقلیه است.",
      why: "غلط است (درس ۱). شانه بیرون سواره‌رو است.",
      rule: "CdS art. 3 c.1 n.4",
      conceptStep: 1,
    },
    {
      sourceId: "196",
      textIt: "La corsia di decelerazione serve ad entrare in autostrada",
      answer: 0,
      chunks: [
        { it: "La corsia di decelerazione", fa: "خط کاهش سرعت" },
        { it: "serve ad entrare", fa: "برای وارد شدن است", verb: "entrare ← entrare" },
        { it: "in autostrada", fa: "به آزادراه" },
      ],
      translation: "خط کاهش سرعت برای وارد شدن به آزادراه است.",
      why: "غلط است (درس ۲). برای ورود خط افزایش سرعت هست؛ خط کاهش سرعت برای خروج است.",
      rule: "CdS art. 3 c.1 n.13, n.14",
      conceptStep: 1,
    },
    {
      sourceId: "19",
      figure: 562,
      textIt: "Nella strada rappresentata la carreggiata centrale è, di norma, a doppio senso di circolazione",
      answer: 1,
      chunks: [
        { it: "Nella strada rappresentata", fa: "در جاده‌ی نشان‌داده‌شده" },
        { it: "la carreggiata centrale", fa: "سواره‌روی وسط" },
        { it: "è, di norma,", fa: "معمولاً" },
        { it: "a doppio senso di circolazione", fa: "دوطرفه است" },
      ],
      translation: "در جاده‌ی نشان‌داده‌شده سواره‌روی وسط معمولاً دوطرفه است.",
      why: "درست است (درس ۳). خط ممتد دوبل وسطِ سواره‌روی میانی دو جهت را جدا می‌کند.",
      rule: "CdS art. 3 c.1 n.7",
      conceptStep: 1,
    },
    {
      sourceId: "60",
      textIt: "L'isola di traffico è una parte della strada sulla quale è vietato il transito dei veicoli",
      answer: 1,
      chunks: [
        { it: "L'isola di traffico", fa: "جزیره‌ی ترافیکی" },
        { it: "è una parte della strada", fa: "بخشی از جاده است" },
        { it: "sulla quale è vietato il transito dei veicoli", fa: "که عبور وسایل نقلیه روی آن ممنوع است", focus: "negation" },
      ],
      translation: "جزیره‌ی ترافیکی بخشی از جاده است که عبور وسایل نقلیه روی آن ممنوع است.",
      why: "درست است (درس ۴). جزیره غیرقابل عبور است.",
      rule: "CdS art. 3 c.1 n.27",
      conceptStep: 1,
    },
    {
      sourceId: "47",
      textIt: "Sulle strade extraurbane principali è consentito circolare alla stessa velocità massima prevista per le autostrade",
      answer: 0,
      chunks: [
        { it: "Sulle strade extraurbane principali", fa: "در جاده‌های برون‌شهری اصلی" },
        { it: "è consentito circolare", fa: "مجاز است حرکت کرد", verb: "consentito ← consentire" },
        { it: "alla stessa velocità massima prevista per le autostrade", fa: "با همان حداکثر سرعتِ آزادراه‌ها" },
      ],
      translation: "در جاده‌های برون‌شهری اصلی مجاز است با همان حداکثر سرعتِ آزادراه‌ها حرکت کرد.",
      why: "غلط است (درس ۵). آزادراه ۱۳۰، برون‌شهری اصلی ۱۱۰.",
      rule: "CdS art. 142 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "114",
      textIt: "Nelle aree pedonali possono transitare i veicoli al servizio di persone diversamente abili",
      answer: 1,
      chunks: [
        { it: "Nelle aree pedonali", fa: "در منطقه‌های عابر پیاده" },
        { it: "possono transitare", fa: "می‌توانند عبور کنند", verb: "possono ← potere" },
        { it: "i veicoli al servizio di persone diversamente abili", fa: "وسایلِ در خدمت افراد دارای معلولیت" },
      ],
      translation: "در منطقه‌های عابر پیاده وسایلِ در خدمت افراد دارای معلولیت می‌توانند عبور کنند.",
      why: "درست است (درس ۶). این یکی از استثناهای خودِ تعریف قانونی است.",
      rule: "CdS art. 3 c.1 n.2",
      conceptStep: 1,
    },
    {
      sourceId: "232",
      textIt: "Non tutti i veicoli a motore a due ruote vengono classificati ciclomotori",
      answer: 1,
      chunks: [
        { it: "Non tutti", fa: "نه همه‌ی", focus: "negation" },
        { it: "i veicoli a motore a due ruote", fa: "وسایل موتوری دوچرخ" },
        { it: "vengono classificati ciclomotori", fa: "موپد دسته‌بندی می‌شوند", verb: "classificati ← classificare" },
      ],
      translation: "همه‌ی وسایل موتوری دوچرخ موپد دسته‌بندی نمی‌شوند.",
      why: "درست است (درس ۷). بالای ۵۰ سی‌سی یا ۴۵ کیلومتر، موتورسیکلت است.",
      rule: "CdS artt. 52, 53",
      conceptStep: 1,
    },
    {
      sourceId: "327",
      textIt: "Il triciclo a motore è un autoveicolo",
      answer: 0,
      chunks: [
        { it: "Il triciclo a motore", fa: "سه‌چرخ موتوری" },
        { it: "è un autoveicolo", fa: "یک autoveicolo است" },
      ],
      translation: "سه‌چرخ موتوری یک autoveicolo است.",
      why: "غلط است (درس ۸). autoveicolo حداقل چهار چرخ دارد.",
      rule: "CdS art. 54",
      conceptStep: 1,
    },
    {
      sourceId: "300",
      sign: 305,
      textIt: "Il conducente che vede i pannelli in figura sta seguendo un rimorchio o semirimorchio per trasporto di cose con massa a pieno carico superiore a 3,5 tonnellate",
      answer: 1,
      chunks: [
        { it: "Il conducente che vede i pannelli in figura", fa: "راننده‌ای که تابلوهای تصویر را می‌بیند", verb: "vede ← vedere" },
        { it: "sta seguendo", fa: "پشت سرِ … حرکت می‌کند", verb: "seguendo ← seguire" },
        { it: "un rimorchio o semirimorchio per trasporto di cose", fa: "یک یدک یا نیم‌یدک باری" },
        { it: "con massa a pieno carico superiore a 3,5 tonnellate", fa: "با جرم کل بیش از ۳٫۵ تن" },
      ],
      translation: "راننده‌ای که تابلوهای تصویر را می‌بیند، پشت سرِ یک یدک یا نیم‌یدک باری با جرم کل بیش از ۳٫۵ تن حرکت می‌کند.",
      why: "درست است (درس ۹). زرد با حاشیه‌ی قرمز تابلوی یدک است.",
      rule: "DM 24 gennaio 2003 n. 40 (Reg. ECE/ONU 70)",
      conceptStep: 1,
    },
    {
      sourceId: "362",
      textIt: "Per agevolare il traffico, è opportuno lasciare liberi gli sbocchi delle strade laterali quando si viaggia dietro ad una fila di veicoli",
      answer: 1,
      chunks: [
        { it: "Per agevolare il traffico,", fa: "برای روان کردن ترافیک،", focus: "reason" },
        { it: "è opportuno lasciare liberi", fa: "بهتر است خالی بگذاری" },
        { it: "gli sbocchi delle strade laterali", fa: "دهانه‌ی خیابان‌های فرعی را" },
        { it: "quando si viaggia dietro ad una fila di veicoli", fa: "وقتی پشت یک صف خودرو حرکت می‌کنی", focus: "condition" },
      ],
      translation: "برای روان کردن ترافیک، وقتی پشت یک صف خودرو حرکت می‌کنی بهتر است دهانه‌ی خیابان‌های فرعی را خالی بگذاری.",
      why: "درست است (درس ۱۰). خودروهای خیابان فرعی هم باید بتوانند وارد یا خارج شوند.",
      rule: "CdS art. 140",
      conceptStep: 1,
    },
    {
      sourceId: "400",
      textIt: "Se, uscendo da un sentiero fangoso, si sporca notevolmente la strada, si può incorrere in una sanzione amministrativa",
      answer: 1,
      chunks: [
        { it: "Se, uscendo da un sentiero fangoso,", fa: "اگر هنگام بیرون آمدن از یک راه گِلی،", focus: "condition", verb: "uscendo ← uscire" },
        { it: "si sporca notevolmente la strada,", fa: "جاده خیلی کثیف شود،", verb: "sporca ← sporcare" },
        { it: "si può incorrere in una sanzione amministrativa", fa: "ممکن است جریمه‌ی اداری بشوی", verb: "può ← potere" },
      ],
      translation: "اگر هنگام بیرون آمدن از یک راه گِلی جاده خیلی کثیف شود، ممکن است جریمه‌ی اداری بشوی.",
      why: "درست است (درس ۱۱). ریختن گل روی جاده ممنوع است و جریمه دارد.",
      rule: "CdS art. 15 c.1 lett. f",
      conceptStep: 1,
    },
    {
      sourceId: "512",
      textIt: "Quando la carreggiata è occupata da ciclisti o pedoni, per sorpassarli è prudente mantenere un'adeguata distanza di sicurezza laterale",
      answer: 1,
      chunks: [
        { it: "Quando la carreggiata è occupata da ciclisti o pedoni,", fa: "وقتی دوچرخه‌سوار یا عابر روی سواره‌رو است،", focus: "condition" },
        { it: "per sorpassarli", fa: "برای سبقت از آن‌ها" },
        { it: "è prudente mantenere", fa: "محتاطانه است که حفظ کنی" },
        { it: "un'adeguata distanza di sicurezza laterale", fa: "فاصله‌ی ایمنیِ کناریِ کافی را" },
      ],
      translation: "وقتی دوچرخه‌سوار یا عابر روی سواره‌رو است، برای سبقت از آن‌ها محتاطانه است که فاصله‌ی ایمنیِ کناریِ کافی را حفظ کنی.",
      why: "درست است (درس ۱۲). برای دوچرخه قانون فعلی حداقل ۱٫۵ متر هر جا ممکن است می‌خواهد.",
      rule: "CdS art. 148 c.9-bis (L. 177/2024)",
      conceptStep: 1,
    },
    {
      sourceId: "459",
      textIt: "Il conducente deve dare la precedenza al pedone non vedente con il bastone bianco che attraversa la strada fuori dalle strisce pedonali, anche se non è accompagnato da un cane guida",
      answer: 1,
      chunks: [
        { it: "Il conducente deve dare la precedenza", fa: "راننده باید حق تقدم بدهد", verb: "deve ← dovere" },
        { it: "al pedone non vedente con il bastone bianco", fa: "به عابر نابینا با عصای سفید" },
        { it: "che attraversa la strada fuori dalle strisce pedonali,", fa: "که بیرون از خط عابر از خیابان رد می‌شود،", verb: "attraversa ← attraversare" },
        { it: "anche se non è accompagnato da un cane guida", fa: "حتی اگر سگ راهنما همراهش نباشد", focus: "condition" },
      ],
      translation: "راننده باید به عابر نابینا با عصای سفید که بیرون از خط عابر از خیابان رد می‌شود حق تقدم بدهد، حتی اگر سگ راهنما همراهش نباشد.",
      why: "درست است (درس ۱۳). عصای سفید به‌تنهایی کافی است.",
      rule: "CdS art. 191 c.3",
      conceptStep: 1,
    },
    {
      sourceId: "504",
      textIt: "Alla guida di un veicolo, in vicinanza di una piazzola di fermata di autobus per scolari, non è necessario rallentare se lo scuolabus è fermo",
      answer: 0,
      chunks: [
        { it: "Alla guida di un veicolo,", fa: "هنگام رانندگی،" },
        { it: "in vicinanza di una piazzola di fermata di autobus per scolari,", fa: "نزدیک ایستگاه اتوبوس مدرسه،" },
        { it: "non è necessario rallentare", fa: "لازم نیست آهسته کنی", focus: "negation" },
        { it: "se lo scuolabus è fermo", fa: "اگر اتوبوس مدرسه متوقف است", focus: "condition" },
      ],
      translation: "هنگام رانندگی، نزدیک ایستگاه اتوبوس مدرسه، اگر اتوبوس مدرسه متوقف است لازم نیست آهسته کنی.",
      why: "غلط است (درس ۱۴). اتوبوس متوقف یعنی بچه‌ها ممکن است همین حالا سوار یا پیاده شوند؛ باید به‌خصوص آهسته کنی.",
      rule: "CdS art. 140; art. 141",
      conceptStep: 1,
    },
  ],
  related: [],
};

export const DEFINIZIONI_CHAPTER: Chapter = {
  id: "definizioni-generali",
  numbers: [1],
  // The DB topics were keyword-guessed at import and do not match this chapter.
  topicIds: [],
  nameIt: "Definizioni generali e doveri nell'uso della strada",
  titleFa: "تعریف‌های کلی و وظایف در جاده",
  summaryFa: "جاده از چه بخش‌هایی ساخته شده، وسیله‌ها چه دسته‌هایی دارند و با کاربرهای دیگر، مخصوصاً آسیب‌پذیرها، چطور رفتار کنی.",
  reviewedOn: "2026-10-23",
  sources: [
    {
      label: "Codice della Strada (D.Lgs. 285/1992), testo vigente: artt. 2, 3, 9-ter, 15, 50–58, 72, 80, 140–148, 158, 175, 191",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    {
      label: "Legge 25 novembre 2024, n. 177 (riforma del Codice della Strada, in vigore dal 14/12/2024)",
      url: "https://www.gazzettaufficiale.it/eli/id/2024/11/29/24G00198/sg",
    },
    {
      label: "Regolamento di esecuzione (DPR 495/1992), artt. 78, 87, 89, 361",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1992-12-16;495",
    },
    {
      label: "DM 24 gennaio 2003, n. 40 (pannelli retroriflettenti, Reg. ECE/ONU 70 e 104)",
      url: "https://www.normattiva.it/eli/id/2003/03/14//003G0056/CONSOLIDATED",
    },
    {
      label: "Regolamento (UE) 168/2013 (categorie di veicoli L1e–L7e)",
      url: "https://eur-lex.europa.eu/eli/reg/2013/168/oj",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «definizioni-generali-doveri-strada»",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [
    lessonStrada,
    lessonCorsie,
    lessonFigure,
    lessonElementi,
    lessonAutostrade,
    lessonIncrociZone,
    lessonDueRuote,
    lessonAutoveicoli,
    lessonMacchinePannelli,
    lessonTraffico,
    lessonDivieti,
    lessonCiclisti,
    lessonPedoni,
    lessonBambini,
    review,
  ],
};
