/**
 * src/content/ch23-rca.ts
 * Chapter 23 (Responsabilità civile, penale e assicurazione), lessons 5–6.
 *
 *  L5 compulsory third-party insurance (RCA) as a contract: what the law requires
 *     (the obligation, the certificate on board, cover for whoever drives) versus
 *     what depends on the policy; the bonus-malus formula (groups 610, 608).
 *  L6 what RCA covers and what it never covers (fines, crimes, above the
 *     massimale), and the direct-compensation procedure (groups 609, 602).
 *
 * Chapter 20 lesson 1 already says RCA is compulsory and kasko is not; it is
 * linked by title, not repeated. The CAI form is chapter 21 lesson 7, linked.
 * Statute and policy terms are kept apart in every table and in the L5 exercise.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter23.test.ts.
 */
import type { Lesson } from "./lessons.js";
import { CAP, CDS, CC_2054, DISCLAIMER, IVASS } from "./ch23-common.js";

const AR = "L'assicurazione per la responsabilità civile auto (R.C.A.)";
const AR_FA = "بیمه‌ی شخص ثالث (R.C.A.)";
const DF = "Dopo la firma del contratto di assicurazione R.C.A. (responsabilità civile auto),";
const DF_FA = "بعد از امضای قراردادِ بیمه‌ی شخص ثالث،";
const BM = "Nell'assicurazione per la responsabilità civile auto (R.C.A.), il contratto con la formula \"bonus malus\"";
const BM_FA = "در بیمه‌ی شخص ثالث، قرارداد با فرمولِ «بونوس‌مالوس»";
const CAP_149 = `${CAP("149")} (procedura di risarcimento diretto); DPR 254/2006`;

export const lessonRcaObbligo: Lesson = {
  id: "rca-obbligo-contratto",
  titleFa: "بیمه‌ی شخص ثالث: آنچه قانون می‌خواهد، آنچه قرارداد می‌گوید",
  titleIt: "RCA: OBBLIGO, CERTIFICATO, BONUS MALUS",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس جدا می‌کنی چه چیزی را قانون می‌خواهد (بیمه‌ی شخص ثالث برای هر وسیله‌ی موتوری، گواهیِ بیمه، همراه داشتنش، پوشش برای هر راننده‌ای) و چه چیزی فقط در بعضی بیمه‌نامه‌هاست. و می‌دانی بونوس‌مالوس چطور حقِ بیمه را هر سال با تصادف‌هایی که مقصرشان بوده‌ای عوض می‌کند.",
      why:
        "۱۱ سؤال. در بخشِ اول، جمله‌ی غلط چیزی به وظیفه‌های شرکتِ بیمه اضافه می‌کند (فهرستِ تعمیرگاه، کتابچه‌ی کمک‌های اولیه، راهنمای رانندگی) یا پوشش را به «فقط مالک» محدود می‌کند. در بخشِ دوم، بونوس‌مالوس را چیزی می‌سازد که نیست: کارِ قاضی، باطل شدن بعد از دو تصادف، نه برای موتورسیکلت.",
      rule: `${CAP("122")}; ${CDS("180")}; ${CDS("193")}`,
    },
    {
      kind: "table",
      title: "قانون می‌خواهد، یا فقط بعضی بیمه‌نامه‌ها؟",
      body:
        "در فصلِ ۲۰ (درسِ «مدارک و پلاکِ خودرو: چه چیزی واقعاً لازم است») دیدی که بیمه‌ی شخص ثالث اجباری است و بیمه‌ی بدنه نه. این‌جا: قرارداد که بسته شد، چه چیزی از قانون می‌آید و چه چیزی از بیمه‌نامه‌ی خاصِ تو:",
      columns: ["از کجا می‌آید", "توضیح"],
      rows: [
        { label: "بیمه‌ی شخص ثالث", it: "obbligatoria per legge", values: ["قانون", "هر وسیله‌ی موتوری (سواری، موتورسیکلت، موتور گازی…) باید آن را داشته باشد؛ برای این‌که زیان‌دیده حتماً پولش را بگیرد."] },
        { label: "گواهیِ بیمه", it: "il certificato di assicurazione", values: ["قانون", "شرکتِ بیمه بعد از قرارداد و پرداخت آن را می‌دهد: کاغذی، یا با رضایتِ تو با ایمیل. برچسبِ بیمه روی شیشه از ۲۰۱۵ حذف شده؛ پلیس پوشش را در پایگاهِ داده می‌بیند."] },
        { label: "همیشه همراهِ خودرو", it: "sempre tenuto a bordo", values: ["قانون", "گواهی باید در خودرو باشد و به پلیس نشان داده شود؛ نشان دادنش روی گوشی هم پذیرفته است (راهنمای IVASS)."] },
        { label: "پوشش برای هر راننده", it: "anche se non guida il proprietario", values: ["قانون", "بیمه خسارتِ زیان‌دیده را می‌دهد، هر کس رانده باشد. بیمه‌نامه‌ای که «فقط یک راننده‌ی معین» نوشته باشد ارزان‌تر است، ولی اگر کسِ دیگری براند، زیان‌دیده باز هم پولش را می‌گیرد و بیمه بعداً ممکن است از تو پس بخواهد (درسِ ۷)."] },
        { label: "فهرستِ تعمیرگاه‌های طرفِ قرارداد", it: "elenco delle autocarrozzerie convenzionate", values: ["فقط بعضی بیمه‌نامه‌ها", "بعضی بیمه‌نامه‌ها «تعمیرِ مستقیم» در تعمیرگاهِ طرفِ قرارداد را پیشنهاد می‌کنند؛ قانون دادنِ چنین فهرستی را وظیفه نکرده است."] },
        { label: "کتابچه‌ی کمک‌های اولیه، راهنمای رانندگی", it: "libretto di pronto soccorso · manuale", values: ["هیچ‌کدام", "شرکتِ بیمه چنین وظیفه‌ای ندارد."] },
      ],
      takeaway: "قانون: بیمه‌ی شخص ثالث، گواهیِ بیمه، گواهی همراهِ خودرو، پوشش برای زیان‌دیده هر کس که براند. بقیه یا از بیمه‌نامه‌ی خاص می‌آید یا اصلاً نیست.",
      rule: `${CAP("122")}; ${CAP("127")}; ${CDS("180")} c.1; ${IVASS}`,
    },
    {
      kind: "table",
      title: "بونوس‌مالوس: حقِ بیمه و سابقه‌ات",
      body:
        "بونوس‌مالوس رایج‌ترین فرمولِ قیمت‌گذاریِ بیمه‌ی شخص ثالث است (فرمولِ دیگر «با فرانشیز» است). مالکِ خودرو در یکی از ۱۸ «طبقه‌ی سابقه»ی سراسری (CU) است: ۱ بهترین و ارزان‌ترین، ۱۸ بدترین؛ کسی که اولین بار بیمه می‌خرد از ۱۴ شروع می‌کند:",
      columns: ["چطور کار می‌کند"],
      rows: [
        { label: "تغییرِ سالانه", it: "variazione annuale del premio", values: ["هر سال، حقِ بیمه با تصادف‌هایی که در آن‌ها مقصرِ اصلی بوده‌ای عوض می‌شود: بی‌تصادف یک طبقه پایین‌تر، با تصادف چند طبقه بالاتر (در مثالِ IVASS دو طبقه)."] },
        { label: "برای همه‌ی وسیله‌ها", it: "autovetture, motocicli, ciclomotori", values: ["سواری، موتورسیکلت و موتور گازی همه می‌توانند با بونوس‌مالوس بیمه شوند."] },
        { label: "باطل نمی‌شود", it: "non viene annullato", values: ["با تصادف قرارداد خودکار باطل نمی‌شود؛ فقط طبقه و حقِ بیمه بالا می‌رود."] },
        { label: "کارِ قاضی نیست", it: "non lo stabilisce il giudice", values: ["قرارداد را تو و شرکتِ بیمه می‌بندید و قاعده‌های طبقه را مقرراتِ IVASS تعیین می‌کند؛ قاضی در آن نقشی ندارد."] },
      ],
      takeaway: "بونوس‌مالوس = حقِ بیمه‌ای که هر سال با تصادف‌های تقصیری بالا و پایین می‌رود؛ برای سواری و موتور؛ نه باطل‌شدنی، نه کارِ قاضی.",
      rule: `${CAP("133")}; ${IVASS}`,
    },
    {
      kind: "classify",
      title: "تمرین: قانون، بیمه‌نامه، یا هیچ‌کدام؟",
      body: `${DISCLAIMER} راننده‌ی فرضیِ F برای سواری‌اش بیمه می‌خرد. برای هر چیز بگو از کجا می‌آید:`,
      options: [
        { it: "lo vuole la legge", fa: "قانون می‌خواهد" },
        { it: "dipende dalla polizza", fa: "به بیمه‌نامه بستگی دارد" },
        { it: "non esiste", fa: "چنین چیزی نیست" },
      ],
      items: [
        { prompt: "داشتنِ بیمه‌ی شخص ثالث برای همان سواری", answer: 0, explain: "قانون آن را برای هر وسیله‌ی موتوری اجباری کرده است (قدمِ ۱)." },
        { prompt: "گرفتنِ گواهیِ بیمه از شرکت، بعد از قرارداد", answer: 0, explain: "شرکت باید آن را بدهد." },
        { prompt: "همراه داشتنِ گواهی و نشان دادنش به پلیس", answer: 0, explain: "قانون می‌خواهد؛ روی گوشی هم می‌شود نشانش داد." },
        { prompt: "تعمیرِ خودرو در تعمیرگاهِ طرفِ قراردادِ بیمه، بی‌پرداختِ پیش", answer: 1, explain: "فقط اگر بیمه‌نامه‌ات «تعمیرِ مستقیم» داشته باشد." },
        { prompt: "این‌که فقط خودِ F حق دارد براند و نرخش ارزان‌تر است", answer: 1, explain: "شرطی از بیمه‌نامه است («راننده‌ی انحصاری»)، نه قانون. زیان‌دیده در هر حال پولش را می‌گیرد." },
        { prompt: "فرمولِ بونوس‌مالوس یا فرمولِ با فرانشیز", answer: 1, explain: "هر دو فرمولِ قیمت‌گذاری‌اند؛ کدام را داری در قرارداد نوشته شده." },
        { prompt: "چسباندنِ برچسبِ بیمه روی شیشه‌ی جلو", answer: 2, explain: "از ۲۰۱۵ حذف شده؛ پوشش در پایگاهِ داده دیده می‌شود." },
        { prompt: "این‌که قاضی هر سال طبقه‌ی سابقه‌ی F را تعیین کند", answer: 2, explain: "طبقه را قاعده‌های بونوس‌مالوس و شرکتِ بیمه تعیین می‌کنند." },
      ],
      takeaway: "سه سؤال بپرس: قانون می‌خواهد؟ فقط در بیمه‌نامه‌ی خاص است؟ یا اصلاً وجود ندارد؟ بانک بیشتر از دسته‌ی سوم جمله‌ی غلط می‌سازد.",
      rule: `${CAP("122")}; ${CAP("133")}; ${CDS("180")}; ${IVASS}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'assicurazione per la responsabilità civile auto (R.C.A.)", fa: "بیمه‌ی شخص ثالث" },
        { it: "il contratto di assicurazione", fa: "قراردادِ بیمه" },
        { it: "la polizza", fa: "بیمه‌نامه" },
        { it: "il certificato di assicurazione", fa: "گواهیِ بیمه" },
        { it: "il contrassegno", fa: "برچسبِ بیمه", note: "از ۲۰۱۵ حذف شده" },
        { it: "tenere a bordo", fa: "همراهِ خودرو داشتن", base: "tenere" },
        { it: "il premio di assicurazione", fa: "حقِ بیمه" },
        { it: "la formula bonus malus", fa: "فرمولِ بونوس‌مالوس" },
        { it: "la classe di merito", fa: "طبقه‌ی سابقه" },
        { it: "rilasciare", fa: "صادر کردن، دادنِ سند", base: "rilasciare" },
      ],
    },
    {
      kind: "trap",
      title: "«deve rilasciare»: چه چیزی واقعاً باید بدهد؟",
      body: "هر دو جمله با «بعد از امضای قرارداد، شرکت باید بدهد…» شروع می‌شوند. فقط یکی وظیفه‌ی واقعی است:",
      examples: [
        {
          sourceId: "6691",
          textIt: "Dopo la firma del contratto di assicurazione R.C.A. (responsabilità civile auto), l'impresa assicuratrice deve rilasciare al cliente il certificato di assicurazione",
          answer: 1,
          chunks: [
            { it: DF, fa: DF_FA },
            { it: "l'impresa assicuratrice deve rilasciare al cliente il certificato di assicurazione", fa: "شرکتِ بیمه باید گواهیِ بیمه را به مشتری بدهد", verb: "deve ← dovere" },
          ],
          translation: "بعد از امضای قراردادِ بیمه‌ی شخص ثالث، شرکتِ بیمه باید گواهیِ بیمه را به مشتری بدهد.",
          why: "درست است. گواهیِ بیمه همان سندی است که باید همراهِ خودرو باشد.",
        },
        {
          sourceId: "6694",
          textIt: "Dopo la firma del contratto di assicurazione R.C.A. (responsabilità civile auto), l'impresa assicuratrice deve rilasciare al cliente un elenco delle autocarrozzerie convenzionate, da contattare in caso d'incidente",
          answer: 0,
          chunks: [
            { it: DF, fa: DF_FA },
            { it: "l'impresa assicuratrice deve rilasciare al cliente un elenco delle autocarrozzerie convenzionate,", fa: "شرکتِ بیمه باید فهرستی از تعمیرگاه‌های طرفِ قرارداد به مشتری بدهد،", verb: "deve ← dovere", focus: "contrast" },
            { it: "da contattare in caso d'incidente", fa: "که در صورتِ تصادف با آن‌ها تماس بگیرد" },
          ],
          translation: "بعد از امضای قراردادِ بیمه‌ی شخص ثالث، شرکتِ بیمه باید فهرستی از تعمیرگاه‌های طرفِ قرارداد به مشتری بدهد که در صورتِ تصادف با آن‌ها تماس بگیرد.",
          why: "غلط است. تعمیرگاهِ طرفِ قرارداد فقط در بعضی بیمه‌نامه‌هاست؛ وظیفه‌ی قانونی نیست.",
        },
      ],
      takeaway: "تنها سندی که شرکت «باید» بدهد گواهیِ بیمه است. فهرست، کتابچه و راهنما ساختگی‌اند.",
      rule: `${CAP("127")}; ${IVASS}`,
    },
  ],
  practice: [
    {
      sourceId: "6692",
      textIt: "L'assicurazione per la responsabilità civile auto (R.C.A.) è obbligatoria per legge",
      answer: 1,
      chunks: [
        { it: AR, fa: AR_FA },
        { it: "è obbligatoria per legge", fa: "طبقِ قانون اجباری است", focus: "always" },
      ],
      translation: "بیمه‌ی شخص ثالث (R.C.A.) طبقِ قانون اجباری است.",
      why: "درست است (قدم ۱). هر وسیله‌ی موتوری باید بیمه‌ی شخص ثالث داشته باشد؛ بدونِ آن نه راندن ممکن است نه پارک روی جاده‌ی عمومی (درسِ ۸).",
      rule: `${CAP("122")}; ${CDS("193")}`,
      conceptStep: 1,
    },
    {
      sourceId: "6697",
      textIt: "L'assicurazione per la responsabilità civile auto (R.C.A.), obbligatoria per legge, comprende il risarcimento dei danni provocati dal veicolo, purché guidato dal proprietario",
      answer: 0,
      chunks: [
        { it: "L'assicurazione per la responsabilità civile auto (R.C.A.), obbligatoria per legge,", fa: "بیمه‌ی شخص ثالث، که طبقِ قانون اجباری است،" },
        { it: "comprende il risarcimento dei danni provocati dal veicolo,", fa: "جبرانِ خسارت‌هایی را که خودرو زده در بر می‌گیرد،", verb: "comprende ← comprendere" },
        { it: "purché guidato dal proprietario", fa: "به شرطی که مالک رانده باشد", focus: "condition" },
      ],
      translation: "بیمه‌ی شخص ثالث، که طبقِ قانون اجباری است، جبرانِ خسارت‌هایی را که خودرو زده در بر می‌گیرد، به شرطی که مالک رانده باشد.",
      why: "غلط است (قدم ۱). زیان‌دیده پولش را می‌گیرد هر کس رانده باشد؛ مالک و راننده هر دو پوشش دارند.",
      rule: `${CAP("122")}; ${CC_2054}`,
      conceptStep: 1,
    },
    {
      sourceId: "6681",
      textIt: "Nell'assicurazione per la responsabilità civile auto (R.C.A.), il contratto con la formula \"bonus malus\" comporta una variazione annuale del premio di assicurazione, in base al numero di incidenti causati",
      answer: 1,
      chunks: [
        { it: BM, fa: BM_FA },
        { it: "comporta una variazione annuale del premio di assicurazione,", fa: "تغییرِ سالانه‌ی حقِ بیمه را در پی دارد،", verb: "comporta ← comportare" },
        { it: "in base al numero di incidenti causati", fa: "بر اساسِ تعدادِ تصادف‌هایی که مقصرشان بوده‌ای", focus: "reason" },
      ],
      translation: "در بیمه‌ی شخص ثالث، قرارداد با فرمولِ «بونوس‌مالوس» تغییرِ سالانه‌ی حقِ بیمه را بر اساسِ تعدادِ تصادف‌هایی که مقصرشان بوده‌ای در پی دارد.",
      why: "درست است (قدم ۲). همین تعریفِ بونوس‌مالوس است.",
      rule: `${CAP("133")}; ${IVASS}`,
      conceptStep: 2,
    },
    {
      sourceId: "6683",
      textIt: "Nell'assicurazione per la responsabilità civile auto (R.C.A.), il contratto con la formula \"bonus malus\" viene automaticamente annullato se si provocano più di due incidenti",
      answer: 0,
      chunks: [
        { it: BM, fa: BM_FA },
        { it: "viene automaticamente annullato", fa: "خودکار باطل می‌شود", focus: "always", verb: "viene annullato ← annullare" },
        { it: "se si provocano più di due incidenti", fa: "اگر بیش از دو تصادف ایجاد شود", focus: "condition" },
      ],
      translation: "در بیمه‌ی شخص ثالث، قرارداد با فرمولِ «بونوس‌مالوس»، اگر بیش از دو تصادف ایجاد شود، خودکار باطل می‌شود.",
      why: "غلط است (قدم ۲). تصادف طبقه و حقِ بیمه را بالا می‌برد؛ قرارداد را باطل نمی‌کند.",
      rule: `${CAP("133")}; ${IVASS}`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6691", "6692", "6693", "6694", "6695", "6696", "6697"] },
    { step: 2, sourceIds: ["6681", "6682", "6683", "6684"] },
  ],
};

export const lessonRcaCopertura: Lesson = {
  id: "rca-cosa-copre",
  titleFa: "بیمه‌ی شخص ثالث چه چیزی را می‌پوشاند",
  titleIt: "COSA COPRE LA RCA · RISARCIMENTO DIRETTO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی بیمه‌ی شخص ثالث خسارتِ چه کسانی را می‌دهد (آدم و مال، سرنشین‌ها، در ایتالیا و اتحادیه‌ی اروپا) و چه چیزی را هیچ‌وقت نمی‌دهد (مجازات، جریمه، بالاتر از سقف، آسیبِ خودِ مقصر). و می‌دانی «جبرانِ مستقیم» چیست و کِی می‌شود از آن استفاده کرد.",
      why:
        "۱۳ سؤال. جمله‌ی غلط یا پوشش را کوچک می‌کند («فقط آدم»، «فقط سرنشینِ تاکسی»، «فقط مسئولیتِ راننده») یا بزرگ («مسئولیتِ کیفری هم»، «جریمه هم»، «هر خسارتی، بالای سقف هم»). در جبرانِ مستقیم، جمله‌ی غلط شرطی می‌سازد که نیست: موتورسیکلت ممنوع، عکس اجباری.",
      rule: `${CAP("122")}; ${CAP("129")}; ${CAP_149}`,
    },
    {
      kind: "table",
      title: "می‌پوشاند / نمی‌پوشاند",
      body:
        "بیمه‌ی شخص ثالث مسئولیتِ مدنی‌ات را در برابرِ دیگران به جای تو می‌پردازد (درسِ ۳)، تا سقفِ تعهد. پس هر چه «مدنی» و «برای دیگران» است، و فقط آن:",
      columns: ["می‌پوشاند؟", "توضیح"],
      rows: [
        { label: "آسیب به آدم و مال", it: "danni alle persone e alle cose", values: ["بله", "هر دو، در یک قرارداد. برای مال قراردادِ دیگری لازم نیست."] },
        { label: "سرنشین‌ها", it: "terzi trasportati", values: ["بله", "سرنشینِ هر وسیله‌ای که اجازه‌ی حملِ آدم دارد، با هر عنوانی سوار شده باشد؛ نه فقط تاکسی."] },
        { label: "کجا", it: "aree pubbliche o aperte al pubblico · Unione Europea", values: ["بله", "روی جاده‌ها و محوطه‌های عمومی یا باز به روی عموم؛ و در کشورهای اتحادیه‌ی اروپا (و کشورهای «کارتِ سبز»). از ۲۳ دسامبرِ ۲۰۲۳ قانون پوشش را به هر زمینی هم کشانده که خودرو در آن مثلِ وسیله‌ی نقلیه به کار رود."] },
        { label: "مسئولیتِ راننده و مالک", it: "conducente e proprietario", values: ["بله", "هر دو را، که در راهِ مدنی با هم جواب می‌دهند (درسِ ۴)."] },
        { label: "خودِ راننده‌ی مقصر", it: "il conducente responsabile", values: ["نه", "راننده‌ی مقصر برای آسیبِ خودش «شخصِ ثالث» نیست؛ خودروی خودش را هم فقط بیمه‌ی بدنه می‌پوشاند (درسِ ۷)."] },
        { label: "مسئولیتِ کیفری", it: "la responsabilità penale", values: ["نه", "مجازات شخصی است؛ هیچ حقِ بیمه‌ای آن را نمی‌خرد (درسِ ۲)."] },
        { label: "جریمه‌های اداری", it: "le sanzioni amministrative pecuniarie", values: ["نه", "جریمه را خودت می‌دهی."] },
        { label: "بالاتر از سقف", it: "superiore al massimale", values: ["نه", "بالای سقف را خودِ مسئول می‌دهد (درسِ ۷)."] },
      ],
      takeaway: "می‌پوشاند: خسارتِ دیگران (آدم، مال، سرنشین)، در ایتالیا و اروپا، تا سقف. نمی‌پوشاند: مجازات، جریمه، بالای سقف، آسیبِ خودِ مقصر.",
      rule: `${CAP("122")} c.1–4; ${CAP("129")}; ${CAP("128")}; ${IVASS}`,
    },
    {
      kind: "table",
      title: "جبرانِ مستقیم: از بیمه‌ی خودت",
      body:
        "معمولاً زیان‌دیده از بیمه‌ی مقصر پول می‌خواهد. در «جبرانِ مستقیم» از بیمه‌ی خودش می‌خواهد و بعد شرکت‌ها بینِ خودشان حساب می‌کنند؛ سریع‌تر است. شرط‌ها:",
      columns: ["شرط"],
      rows: [
        { label: "دو وسیله", it: "non più di due veicoli", values: ["فقط دو وسیله‌ی موتوری، که با هم برخورد کرده‌اند. سه خودرو یا بیشتر: روشِ معمولی."] },
        { label: "شناخته و بیمه‌شده", it: "identificati e assicurati, targa italiana", values: ["هر دو شناخته‌شده، بیمه‌شده و با پلاکِ ایتالیایی. با خودروی پلاکِ خارجی این روش نیست."] },
        { label: "چه خسارتی", it: "danni al veicolo · lesioni di lieve entità", values: ["خسارتِ خودرو و چیزهای داخلش، و صدمه‌ی سبکِ راننده‌ی بی‌تقصیر (تا ۹ درصد آسیبِ ماندگار). صدمه‌ی شدید: روشِ معمولی."] },
        { label: "موتورسیکلت", it: "anche un motociclo", values: ["موتورسیکلت مانعی نیست؛ شرط این است که دو وسیله‌ی موتوریِ شناخته‌شده و بیمه‌شده باشند."] },
        { label: "عکس", it: "fotografie", values: ["قانون عکس نخواسته. درخواست باید مشخصات و چگونگیِ تصادف را بگوید؛ فرمِ توافقی (CAI) کار را آسان می‌کند (فصلِ ۲۱، درسِ «بعد از تصادف: وظیفه‌های راننده»)."] },
      ],
      takeaway: "جبرانِ مستقیم: دو وسیله‌ی موتوری، پلاکِ ایتالیایی، بیمه‌شده، خسارتِ خودرو و صدمه‌ی سبک. موتورسیکلت هم؛ عکس اجباری نیست.",
      rule: `${CAP_149}; ${CAP("139")}; ${IVASS}`,
    },
    {
      kind: "classify",
      title: "تمرین: جبرانِ مستقیم یا روشِ معمولی؟",
      body: `${DISCLAIMER} در هر خط، تو راننده‌ی بی‌تقصیری. اگر خلافش نوشته نشده، همه‌ی وسیله‌ها پلاکِ ایتالیایی دارند و بیمه‌شده‌اند. بگو:`,
      options: [
        { it: "risarcimento diretto", fa: "جبرانِ مستقیم (بیمه‌ی خودت)" },
        { it: "procedura ordinaria", fa: "روشِ معمولی (بیمه‌ی مقصر)" },
        { it: "non si può dire", fa: "از این اطلاعات معلوم نیست" },
      ],
      items: [
        { prompt: "دو سواری؛ از پشت به تو زده‌اند؛ فقط سپر فرو رفته.", answer: 0, explain: "دو وسیله، برخورد، خسارتِ خودرو." },
        { prompt: "یک سواری و یک موتورسیکلت (تو موتورسواری)؛ کمی کوفتگی که چند روزه خوب می‌شود.", answer: 0, explain: "موتورسیکلت مانع نیست و صدمه سبک است." },
        { prompt: "سه سواری پشتِ هم به هم خورده‌اند.", answer: 1, explain: "بیش از دو وسیله: روشِ معمولی." },
        { prompt: "دو سواری؛ تو با صدمه‌ی شدید در بیمارستانی.", answer: 1, explain: "صدمه‌ی شدید از جبرانِ مستقیم بیرون است." },
        { prompt: "دو سواری؛ خودروی دیگر پلاکِ آلمانی دارد.", answer: 1, explain: "وسیله‌ی شماره‌گذاری‌شده در خارج این روش را ندارد." },
        { prompt: "دو سواری؛ هنوز نمی‌دانی خودروی دیگر بیمه دارد یا نه.", answer: 2, explain: "اگر بیمه داشته باشد، جبرانِ مستقیم؛ اگر نه، صندوقِ تضمین (درسِ ۸). هنوز معلوم نیست." },
      ],
      takeaway: "بشمار (دو؟)، ببین (پلاکِ ایتالیایی و بیمه؟)، بسنج (صدمه سبک؟). هر سه بله: جبرانِ مستقیم.",
      rule: `${CAP_149}; ${CAP("283")}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "coprire", fa: "پوشش دادن", note: "copre = می‌پوشاند" },
        { it: "i terzi", fa: "شخصِ ثالث" },
        { it: "i terzi trasportati", fa: "سرنشین‌ها (به‌عنوانِ شخصِ ثالث)" },
        { it: "aree aperte al pubblico", fa: "محوطه‌های باز به روی عموم" },
        { it: "il massimale", fa: "سقفِ تعهد" },
        { it: "le sanzioni amministrative pecuniarie", fa: "جریمه‌های نقدیِ اداری" },
        { it: "il risarcimento diretto", fa: "جبرانِ مستقیم (از بیمه‌ی خودت)" },
        { it: "la Carta Verde", fa: "کارتِ سبز (گواهیِ بینِ‌المللیِ بیمه)" },
      ],
    },
    {
      kind: "trap",
      title: "«anche»: کجا درست است، کجا ساختگی؟",
      body: "هر دو جمله با «همچنین» چیزی به پوشش اضافه می‌کنند. یکی درست اضافه می‌کند؛ دیگری چیزی را که هیچ بیمه‌ای نمی‌خرد:",
      examples: [
        {
          sourceId: "6685",
          textIt: "L'assicurazione per la responsabilità civile auto (R.C.A.) è valida anche per gli incidenti avvenuti nei Paesi dell'Unione Europea",
          answer: 1,
          chunks: [
            { it: AR, fa: AR_FA },
            { it: "è valida anche per gli incidenti avvenuti nei Paesi dell'Unione Europea", fa: "برای تصادف‌هایی که در کشورهای اتحادیه‌ی اروپا رخ می‌دهد هم معتبر است", focus: "contrast" },
          ],
          translation: "بیمه‌ی شخص ثالث (R.C.A.) برای تصادف‌هایی که در کشورهای اتحادیه‌ی اروپا رخ می‌دهد هم معتبر است.",
          why: "درست است. پوشش در کشورهای اتحادیه هم کار می‌کند (ماده‌ی ۱۲۲ بندِ ۴).",
        },
        {
          sourceId: "6686",
          textIt: "L'assicurazione per la responsabilità civile auto (R.C.A.) copre anche la responsabilità penale in base al premio pagato",
          answer: 0,
          chunks: [
            { it: AR, fa: AR_FA },
            { it: "copre anche la responsabilità penale", fa: "مسئولیتِ کیفری را هم می‌پوشاند", verb: "copre ← coprire", focus: "contrast" },
            { it: "in base al premio pagato", fa: "بر اساسِ حقِ بیمه‌ای که پرداخت شده", focus: "reason" },
          ],
          translation: "بیمه‌ی شخص ثالث (R.C.A.) بر اساسِ حقِ بیمه‌ای که پرداخت شده، مسئولیتِ کیفری را هم می‌پوشاند.",
          why: "غلط است. مسئولیتِ کیفری شخصی است و با پول خریدنی نیست؛ بیمه فقط مسئولیتِ مدنی را می‌پوشاند.",
        },
      ],
      takeaway: "«anche» با جا (اروپا) یا آدم‌ها (سرنشین، مالک) درست است؛ با مجازات، جریمه یا «بالای سقف» غلط است.",
      rule: `${CAP("122")} c.4; Costituzione, art. 27`,
    },
  ],
  practice: [
    {
      sourceId: "6690",
      textIt: "L'assicurazione per la responsabilità civile auto (R.C.A.) copre solo i danni arrecati alle persone, perché per i danni alle cose occorre un altro tipo di contratto",
      answer: 0,
      chunks: [
        { it: AR, fa: AR_FA },
        { it: "copre solo i danni arrecati alle persone,", fa: "فقط خسارت‌هایی را که به آدم‌ها وارد شده می‌پوشاند،", verb: "copre ← coprire", focus: "limit" },
        { it: "perché per i danni alle cose occorre un altro tipo di contratto", fa: "چون برای خسارتِ مالی نوعِ دیگری قرارداد لازم است", focus: "reason" },
      ],
      translation: "بیمه‌ی شخص ثالث (R.C.A.) فقط خسارت‌هایی را که به آدم‌ها وارد شده می‌پوشاند، چون برای خسارتِ مالی نوعِ دیگری قرارداد لازم است.",
      why: "غلط است (قدم ۱). آدم و مال هر دو در همین قرارداد هستند.",
      rule: `${CAP("122")}; ${IVASS}`,
      conceptStep: 1,
    },
    {
      // replaces #6643 («aree pubbliche…»), which the ministry removed in 2025 (retired-questions.ts)
      sourceId: "6642",
      textIt: "L'assicurazione obbligatoria RCA copre i danni subiti dai terzi trasportati se il veicolo è autorizzato al trasporto di persone",
      answer: 1,
      chunks: [
        { it: "L'assicurazione obbligatoria RCA", fa: "بیمه‌ی اجباریِ شخص ثالث" },
        { it: "copre i danni subiti dai terzi trasportati", fa: "خسارت‌هایی را می‌پوشاند که سرنشین‌ها دیده‌اند", verb: "copre ← coprire" },
        { it: "se il veicolo è autorizzato al trasporto di persone", fa: "اگر وسیله اجازه‌ی حملِ آدم داشته باشد", focus: "condition" },
      ],
      translation: "بیمه‌ی اجباریِ شخص ثالث خسارت‌هایی را می‌پوشاند که سرنشین‌ها دیده‌اند، اگر وسیله اجازه‌ی حملِ آدم داشته باشد.",
      why: "درست است (قدم ۱). سرنشینِ هر وسیله‌ای که اجازه‌ی حملِ آدم دارد هم شخصِ ثالث حساب می‌شود.",
      rule: CAP("122"),
      conceptStep: 1,
    },
    {
      sourceId: "6644",
      textIt: "Il risarcimento diretto nei sinistri stradali si applica se vi sono danni al veicolo e lesioni di lieve entità al conducente",
      answer: 1,
      chunks: [
        { it: "Il risarcimento diretto nei sinistri stradali", fa: "جبرانِ مستقیم در تصادف‌ها" },
        { it: "si applica", fa: "به کار می‌رود", verb: "si applica ← applicarsi" },
        { it: "se vi sono danni al veicolo e lesioni di lieve entità al conducente", fa: "اگر خسارتِ خودرو و صدمه‌ی سبکِ راننده باشد", focus: "condition" },
      ],
      translation: "جبرانِ مستقیم در تصادف‌ها به کار می‌رود اگر خسارتِ خودرو و صدمه‌ی سبکِ راننده باشد.",
      why: "درست است (قدم ۲). دقیقاً دو خسارتی که این روش می‌پوشاند.",
      rule: `${CAP_149}; ${CAP("139")}`,
      conceptStep: 2,
    },
    {
      sourceId: "6646",
      textIt: "Il risarcimento diretto è escluso se nel sinistro è coinvolto un motociclo",
      answer: 0,
      chunks: [
        { it: "Il risarcimento diretto è escluso", fa: "جبرانِ مستقیم ممنوع است", verb: "è escluso ← escludere", focus: "negation" },
        { it: "se nel sinistro è coinvolto un motociclo", fa: "اگر در تصادف یک موتورسیکلت درگیر باشد", focus: "condition" },
      ],
      translation: "اگر در تصادف یک موتورسیکلت درگیر باشد، جبرانِ مستقیم ممنوع است.",
      why: "غلط است (قدم ۲). موتورسیکلت هم وسیله‌ی موتوریِ بیمه‌شده است؛ مانعی نیست.",
      rule: CAP_149,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6685", "6686", "6687", "6688", "6689", "6690", "6642", "6643", "6648"] },
    { step: 2, sourceIds: ["6644", "6645", "6646", "6647"] },
  ],
};
