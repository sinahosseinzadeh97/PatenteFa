/**
 * src/content/ch25-scarico-vetri.ts
 * Chapter 25 (Elementi del veicolo, manutenzione e comportamenti), lessons 12–13:
 * the exhaust system, and visibility and the cabin (bank groups 643, 644, 653).
 *
 *  L12 what the exhaust system does; a damaged one and the law (653). 7101 is
 *      flagged: mapped, never scored (VEICOLO_FLAGGED_SOURCE_IDS). Chapter 24
 *      teaches emissions and noise and is linked by lesson title.
 *  L13 glass, wipers and washer; the cabin: loose objects, phone, navigator,
 *      child lock, variable-message signs (643, 644). Chapter 23 teaches
 *      distraction and is linked by lesson title.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter25.test.ts.
 */
import type { Lesson } from "./lessons.js";
import { CDS, EXERCISE, MANUALE, REG, TECNICA } from "./ch25-common.js";

const SCARICO = "L’impianto di scarico ha lo scopo di convogliare i gas di scarico verso l’esterno";
const SCARICO_FA = "سیستمِ اگزوز برای این است که گازِ اگزوز را به بیرون ببرد";
const SILENZ = "Circolare Min. Trasporti DC IV B/03 del 24/11/1997 (silenziatore di sostituzione omologato per il medesimo tipo di veicolo); Cass. 9988/2018";

export const lessonScarico: Lesson = {
  id: "impianto-di-scarico",
  titleFa: "سیستمِ اگزوز: چه می‌کند، و با آن چه نکنی",
  titleIt: "IMPIANTO DI SCARICO · MARMITTA · SILENZIATORE",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی سیستمِ اگزوز چه پنج کاری می‌کند (گاز را بیرون می‌برد، از سمیّت، فشار، دما و صدایش کم می‌کند)، اگزوزِ خراب چه اثری دارد، و چه کارهایی با اگزوز ممنوع است. این‌که از اگزوز چه بیرون می‌آید را فصلِ ۲۴ درس داده («از اگزوز چه بیرون می‌آید و چه می‌کند»).",
      why:
        "۱۴ سؤال. دام‌ها: یک «اجازه»ی ساختگی (بیرون از شهر بی‌صداخفه‌کن، تعمیر با نوارچسب، تغییر با «تعهدنامه‌ی شخصی»، دست‌کاری «فقط در شهر»)، یک برنامه‌ی ساختگی (عوض کردن با هر تعویضِ روغن)، و اگزوزی برای خودروی برقی که اصلاً اگزوز ندارد.",
      rule: `${TECNICA}; ${CDS("72")}; ${CDS("155")}`,
    },
    {
      kind: "table",
      title: "سیستمِ اگزوز چه کار می‌کند",
      body:
        "گازی که از موتورِ احتراقی بیرون می‌آید داغ، پرفشار، پرسروصدا و سمی است. سیستمِ اگزوز (مبدلِ کاتالیستی، صداخفه‌کن، لوله‌ی اگزوز) پیش از این‌که گاز را بیرون بدهد، همه‌ی این‌ها را کم می‌کند:",
      columns: ["چه می‌کند", "یادت باشد"],
      rows: [
        { label: "بیرون بردنِ گاز", it: "convogliare i gas di scarico verso l’esterno", values: ["گاز را از موتور تا پشتِ خودرو می‌برد", "اگزوزِ سوراخ ممکن است گاز را زیرِ خودرو یا نزدیکِ اتاق بدهد"] },
        { label: "سمیّت، فشار، دما", it: "abbassato la tossicità · la pressione · la temperatura", values: ["هر سه را پیش از بیرون دادن کم می‌کند", "مبدلِ کاتالیستی آلاینده‌ها را کم می‌کند"] },
        { label: "صدا و آلودگیِ هوا", it: "ridurre la rumorosità · ridurre l’inquinamento atmosferico", values: ["صداخفه‌کن صدا را کم می‌کند؛ مبدل، آلودگیِ هوا را", "آلودگیِ صوتی و آلودگیِ هوا: فصلِ ۲۴"] },
        { label: "«با هر تعویضِ روغن عوضش کن»", it: "a ogni cambio di lubrificante", values: ["غلط", "اگزوز وقتی عوض می‌شود که خراب یا فرسوده باشد"] },
        { label: "خودروی برقی", it: "dei veicoli elettrici", values: ["اگزوز ندارد", "«اگزوزِ برقی بیشتر سرویس می‌خواهد»: غلط"] },
      ],
      takeaway: "اگزوز گاز را بیرون می‌برد و از سمیّت، فشار، دما و صدایش کم می‌کند. برقی: بی‌اگزوز.",
      rule: TECNICA,
    },
    {
      kind: "table",
      title: "اگزوزِ خراب، و آنچه قانون می‌خواهد",
      body:
        "صداخفه‌کن و اگزوز جزوِ تجهیزاتِ تأییدشده‌ی خودرواند. اگر فرسوده شدند، با قطعه‌ای تأییدشده برای همان نوع خودرو عوضشان کن. تغییرِ سیستمِ اگزوز یا دست‌کاری‌اش جریمه دارد، و اگر سرعت، صدا یا آلاینده‌ها را بیشتر کند، تغییرِ ساختِ خودرو حساب می‌شود (فصلِ ۲۴، «صدای خودرو از کجا می‌آید»):",
      columns: ["قاعده", "دام"],
      rows: [
        { label: "اگزوزِ فرسوده", it: "la marmitta deteriorata", values: ["صدای بیشتر (آلودگیِ صوتی)", "زود عوضش کن"] },
        { label: "قطعه‌ی جایگزین", it: "altra di tipo approvato per quel tipo di veicolo", values: ["فقط تأییدشده، برای همان نوع خودرو", "—"] },
        { label: "بی‌صداخفه‌کن", it: "anche senza silenziatore", values: ["هیچ‌جا مجاز نیست", "«بیرون از آبادی مجاز است»: غلط"] },
        { label: "تعمیرِ موقت", it: "con lana di vetro e nastro isolante", values: ["نه", "پشم شیشه و نوارچسب تعمیر نیست؛ عوضش کن"] },
        { label: "تغییر یا دست‌کاری", it: "modificare l’impianto · la manomissione", values: ["جریمه دارد، هر جا که برانی", "«با تعهدنامه‌ی شخصی» یا «فقط در شهر»: غلط"] },
        { label: "چه کسی عوضش کند", it: "anche personalmente, senza rivolgersi ad un’officina autorizzata", values: ["بانک می‌گوید فقط تعمیرگاهِ مجاز", "یادداشتِ منبع: بانک (7101) را FALSO می‌داند، یعنی می‌گوید باید به تعمیرگاهِ مجاز بروی. ما قاعده‌ای پیدا کردیم که قطعه‌ی تأییدشده می‌خواهد، ولی متنی که تعمیرگاهِ مجاز را اجباری کند نه. در آزمون همان FALSO را بزن؛ این سؤال را برای امتیاز نمی‌آوریم."] },
      ],
      takeaway: "اگزوزِ فرسوده: با قطعه‌ی تأییدشده برای همان خودرو عوض کن. بی‌صداخفه‌کن، با نوارچسب، یا دست‌کاری‌شده: هیچ‌جا.",
      rule: `${CDS("72")}; ${CDS("78")}; ${CDS("155")}; ${SILENZ}`,
    },
    {
      kind: "classify",
      title: "تمرین: مجاز است یا نه؟",
      body: `${EXERCISE} هر کاری که با اگزوزِ یک سواری می‌شود را بسنج:`,
      options: [
        { it: "consentito", fa: "مجاز است" },
        { it: "non consentito", fa: "مجاز نیست" },
      ],
      items: [
        { prompt: "صداخفه‌کنِ فرسوده با یک صداخفه‌کنِ تأییدشده برای همان مدل عوض می‌شود", answer: 0, explain: "همین کارِ درست است (قدمِ ۲)." },
        { prompt: "صداخفه‌کن برداشته می‌شود و خودرو فقط در جاده‌های بیرون از شهر می‌رود", answer: 1, explain: "بی‌صداخفه‌کن هیچ‌جا مجاز نیست (قدمِ ۲)." },
        { prompt: "لوله‌ی سوراخ با نوارچسب پیچیده می‌شود تا «فعلاً» برسد", answer: 1, explain: "تعمیرِ موقت با نوار مجاز نیست (قدمِ ۲)." },
        { prompt: "اگزوزی پرصداتر و تأییدنشده بسته می‌شود، «فقط برای شهر»", answer: 1, explain: "دست‌کاری همه‌جا جریمه دارد (قدمِ ۲)." },
        { prompt: "تعمیرگاه اگزوزِ کهنه را با قطعه‌ی اصلیِ همان خودرو عوض می‌کند", answer: 0, explain: "قطعه‌ی تأییدشده برای همان نوع خودرو (قدمِ ۲)." },
      ],
      takeaway: "تأییدشده، برای همان خودرو. هر «فقط این‌جا» یا «فعلاً» یعنی مجاز نیست.",
      rule: `${CDS("72")}; ${CDS("155")}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l’impianto di scarico", fa: "سیستمِ اگزوز" },
        { it: "la marmitta", fa: "اگزوز" },
        { it: "il silenziatore", fa: "صداخفه‌کن" },
        { it: "il tubo di scarico", fa: "لوله‌ی اگزوز" },
        { it: "i gas di scarico", fa: "گازِ اگزوز" },
        { it: "la tossicità", fa: "سمیّت" },
        { it: "la rumorosità · l'inquinamento acustico", fa: "سروصدا · آلودگیِ صوتی" },
        { it: "di tipo approvato", fa: "تأییدشده" },
        { it: "la manomissione", fa: "دست‌کاری" },
      ],
    },
    {
      kind: "trap",
      title: "«L’impianto di scarico»: کارش، یا یک دروغ درباره‌ی برقی‌ها؟",
      body: "هر دو جمله با «سیستمِ اگزوز» شروع می‌شوند:",
      examples: [
        {
          sourceId: "7096",
          textIt: "L’impianto di scarico ha lo scopo di ridurre l’inquinamento atmosferico causato dai gas di scarico del veicolo",
          answer: 1,
          chunks: [
            { it: "L’impianto di scarico ha lo scopo di", fa: "سیستمِ اگزوز برای", verb: "ha ← avere" },
            { it: "ridurre l’inquinamento atmosferico", fa: "کم کردنِ آلودگیِ هواست" },
            { it: "causato dai gas di scarico del veicolo", fa: "که گازِ اگزوزِ وسیله می‌سازد" },
          ],
          translation: "سیستمِ اگزوز برای کم کردنِ آلودگیِ هوایی است که گازِ اگزوزِ وسیله می‌سازد.",
          why: "درست است. مبدلِ کاتالیستیِ آن آلاینده‌ها را کم می‌کند.",
        },
        {
          sourceId: "7098",
          textIt: "L’impianto di scarico dei veicoli elettrici necessita di manutenzione più frequente rispetto a quello dei veicoli con motore a scoppio",
          answer: 0,
          chunks: [
            { it: "L’impianto di scarico dei veicoli elettrici", fa: "سیستمِ اگزوزِ خودروهای برقی", focus: "contrast" },
            { it: "necessita di manutenzione più frequente", fa: "سرویسِ بیشتری لازم دارد", verb: "necessita ← necessitare" },
            { it: "rispetto a quello dei veicoli con motore a scoppio", fa: "تا اگزوزِ خودروهای با موتورِ احتراقی" },
          ],
          translation: "سیستمِ اگزوزِ خودروهای برقی سرویسِ بیشتری لازم دارد تا اگزوزِ خودروهای با موتورِ احتراقی.",
          why: "غلط است. خودروی برقی اصلاً اگزوز ندارد.",
        },
      ],
      takeaway: "«veicoli elettrici» کنارِ «impianto di scarico» یعنی جمله غلط است.",
      rule: TECNICA,
    },
  ],
  practice: [
    {
      sourceId: "7093",
      textIt: "L’impianto di scarico ha lo scopo di convogliare i gas di scarico verso l’esterno dopo averne abbassato la pressione",
      answer: 1,
      chunks: [
        { it: SCARICO, fa: SCARICO_FA, verb: "ha ← avere" },
        { it: "dopo averne abbassato la pressione", fa: "بعد از این‌که فشارش را کم کرد", verb: "abbassato ← abbassare" },
      ],
      translation: "سیستمِ اگزوز برای این است که گازِ اگزوز را بعد از کم کردنِ فشارش به بیرون ببرد.",
      why: "درست است (قدم ۱). گاز با فشارِ زیاد از موتور بیرون می‌آید؛ اگزوز فشار، دما، سمیّت و صدا را کم می‌کند.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "7097",
      textIt: "L’impianto di scarico deve essere integralmente sostituito a ogni cambio di lubrificante",
      answer: 0,
      chunks: [
        { it: "L’impianto di scarico", fa: "سیستمِ اگزوز" },
        { it: "deve essere integralmente sostituito", fa: "باید کامل عوض شود", verb: "deve ← dovere" },
        { it: "a ogni cambio di lubrificante", fa: "با هر تعویضِ روغن", focus: "always" },
      ],
      translation: "سیستمِ اگزوز باید با هر تعویضِ روغن کامل عوض شود.",
      why: "غلط است (قدم ۱). اگزوز به تعویضِ روغن ربطی ندارد؛ وقتی فرسوده یا خراب شد عوض می‌شود.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "7091",
      textIt: "La marmitta deteriorata deve essere sostituita con altra di tipo approvato per quel tipo di veicolo",
      answer: 1,
      chunks: [
        { it: "La marmitta deteriorata", fa: "اگزوزِ فرسوده" },
        { it: "deve essere sostituita", fa: "باید عوض شود", verb: "deve ← dovere" },
        { it: "con altra di tipo approvato per quel tipo di veicolo", fa: "با اگزوزِ تأییدشده‌ی دیگری برای همان نوع وسیله" },
      ],
      translation: "اگزوزِ فرسوده باید با اگزوزِ تأییدشده‌ی دیگری برای همان نوع وسیله عوض شود.",
      why: "درست است (قدم ۲). قطعه‌ی جایگزین باید برای همان نوع خودرو تأیید شده باشد.",
      rule: `${CDS("72")}; ${SILENZ}`,
      conceptStep: 2,
    },
    {
      sourceId: "7100",
      textIt: "Se il tubo di scarico del silenziatore si fora e non si intende sostituirlo a breve, lo si può riparare avvolgendolo con lana di vetro e nastro isolante",
      answer: 0,
      chunks: [
        { it: "Se il tubo di scarico del silenziatore si fora", fa: "اگر لوله‌ی اگزوزِ صداخفه‌کن سوراخ شود", focus: "condition", verb: "si fora ← forarsi" },
        { it: "e non si intende sostituirlo a breve,", fa: "و قصد نداری زود عوضش کنی،", verb: "si intende ← intendere" },
        { it: "lo si può riparare", fa: "می‌شود تعمیرش کرد", verb: "può ← potere", focus: "contrast" },
        { it: "avvolgendolo con lana di vetro e nastro isolante", fa: "با پیچیدنِ پشم شیشه و نوارچسبِ برق دورش", verb: "avvolgendolo ← avvolgere" },
      ],
      translation: "اگر لوله‌ی اگزوزِ صداخفه‌کن سوراخ شود و قصد نداری زود عوضش کنی، می‌شود با پیچیدنِ پشم شیشه و نوارچسبِ برق دورش تعمیرش کرد.",
      why: "غلط است (قدم ۲). این تعمیر نیست؛ اگزوزِ سوراخ را با قطعه‌ی تأییدشده عوض کن.",
      rule: CDS("72"),
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["7092", "7093", "7094", "7095", "7096", "7097", "7098"] },
    { step: 2, sourceIds: ["7090", "7091", "7099", "7100", "7101", "7102", "7103"] },
  ],
};

export const lessonVetriAbitacolo: Lesson = {
  id: "vetri-tergicristalli-abitacolo",
  titleFa: "شیشه‌ها، برف‌پاک‌کن، و داخلِ خودرو",
  titleIt: "CRISTALLI · TERGICRISTALLO · ABITACOLO",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی چه چیزهایی دیدِ راننده را تمیز و باز نگه می‌دارند (شیشه، برف‌پاک‌کن، شیشه‌شوی، کولر برای بخار) و چه چیزهایی آن را می‌بندند، و چند قاعده‌ی داخلِ خودرو را: وسیله‌ی لق زیرِ صندلی، تلفن و مسیریاب، قفلِ کودک، و تابلوهای پیامِ متغیر.",
      why:
        "۱۴ سؤال. دام‌ها: یک راه‌حلِ اشتباه برای دید (نوارچسب روی شیشه‌ی ترک‌خورده، بخارزدا برای گرد و خاک، سبقتِ فوری از خودرویی که آب می‌پاشد)، یک اجازه‌ی ساختگی (پیامک در رانندگی، تنظیمِ مسیریاب در حرکت)، و تابلوی پیامِ متغیری که «فقط خبر می‌دهد».",
      rule: `${CDS("173")}; ${REG("170")}`,
    },
    {
      kind: "table",
      title: "دیدِ راننده: شیشه، برف‌پاک‌کن، شیشه‌شوی",
      body:
        "هر چیزی روی شیشه یا جلوی آن دید را کم می‌کند. هر ابزار هم کارِ خودش را دارد: برف‌پاک‌کن و شیشه‌شوی برای کثیفی و آب، بخارزدا و کولر برای بخارِ داخلِ شیشه:",
      columns: ["درست", "دام"],
      rows: [
        { label: "برچسب، آویز و وسیله روی شیشه", it: "adesivi, ciondoli o altri oggetti", values: ["دید را کم می‌کنند", "شیشه‌ها را تمیز و خالی نگه دار"] },
        { label: "تیغه‌ی برف‌پاک‌کن", it: "le spazzole del tergicristallo", values: ["مرتب ببین؛ فرسوده شد، عوض کن", "تیغه‌ی فرسوده رگه می‌اندازد"] },
        { label: "مخزنِ شیشه‌شوی", it: "il serbatoio del dispositivo lavacristallo", values: ["همیشه پر", "—"] },
        { label: "شیشه‌ی جلوِ خاکی", it: "il parabrezza è coperto dalla polvere", values: ["شیشه‌شوی و برف‌پاک‌کن", "«بخارزدا را روشن کن»: غلط؛ بخارزدا برای بخار است، نه خاک"] },
        { label: "بخار در زمستان", it: "il climatizzatore · sbrinare velocemente il parabrezza", values: ["کولر هوا را خشک می‌کند و شیشه زود باز می‌شود", "کولر فقط برای تابستان نیست"] },
        { label: "شیشه‌ی جلوِ ترک‌خورده", it: "ripararlo con del nastro adesivo trasparente", values: ["به تعمیرگاه ببر", "«نوارچسبِ شفاف»: غلط"] },
        { label: "خودروی جلو آب می‌پاشد", it: "devo sorpassarlo immediatamente", values: ["فاصله را بیشتر کن، برف‌پاک‌کن و شیشه‌شوی", "«فوراً سبقت بگیر»: غلط؛ سبقت فقط وقتی امن است (فصلِ ۱۵)"] },
      ],
      takeaway: "دید اول است: شیشه‌ی تمیز و خالی، تیغه‌ی سالم، شیشه‌شویِ پر. هر ابزار برای کارِ خودش.",
      rule: `${CDS("79")} (efficienza dei veicoli); ${MANUALE}`,
    },
    {
      kind: "table",
      title: "داخلِ خودرو",
      body:
        "چند قاعده درباره‌ی این‌که داخلِ خودرو چه چیزی کجا باشد و چه کاری در حرکت نکنی. حواس‌پرتی را فصلِ ۲۳ مفصل درس داده («حواس‌پرتی: تلفن، مسیریاب، سرنشین‌ها»)، و صندلیِ کودک را فصلِ ۱۹ («کودک در خودرو: صندلیِ کودک، بدونِ استثنا»):",
      columns: ["قاعده", "دام"],
      rows: [
        { label: "وسیله زیرِ صندلیِ راننده", it: "sistemare oggetti sotto il sedile del conducente", values: ["نگذار: ممکن است زیرِ پدال‌ها بلغزد", "—"] },
        { label: "تلفن", it: "senza l'ausilio del viva-voce o dell'auricolare", values: ["در دست: ممنوع. هندزفری یا هدفون فقط اگر راننده با هر دو گوش خوب بشنود", "پیامک نوشتن در رانندگی: ممنوع؛ جریمه و تعلیقِ گواهینامه دارد"] },
        { label: "مسیریاب", it: "programmati mentre il veicolo è in movimento", values: ["پیش از حرکت تنظیمش کن", "«در حرکت تنظیم شود»: غلط"] },
        { label: "قفلِ کودک", it: "il dispositivo di sicurezza che impedisce l'apertura delle portiere dall'interno", values: ["وقتی بچه در خودرو است، قفلِ کودکِ درهای عقب را بزن", "جای و شکلش را دفترچه می‌گوید"] },
        { label: "تابلوی پیامِ متغیر", it: "i pannelli a messaggio variabile", values: ["می‌تواند خطر را خبر دهد یا دستور بدهد (اجبار، ممنوعیت)؛ دستورش را اجرا کن", "«فقط خبر می‌دهند، دستورشان اجباری نیست»: غلط"] },
      ],
      takeaway: "زیرِ پدال‌ها خالی، تلفن در دست نه، مسیریاب پیش از حرکت، قفلِ کودک با بچه، و تابلوی پیامِ متغیر را جدی بگیر.",
      rule: `${CDS("173")}; ${REG("170")}; ${MANUALE}`,
    },
    {
      kind: "classify",
      title: "تمرین: دید یا تمرکز را بهتر می‌کند یا بدتر؟",
      body: `${EXERCISE} هر کار را بسنج:`,
      options: [
        { it: "migliora", fa: "بهتر می‌کند" },
        { it: "peggiora", fa: "بدتر می‌کند" },
      ],
      items: [
        { prompt: "یک خوش‌بوکنِ بزرگ از آینه‌ی وسط آویزان می‌کنی", answer: 1, explain: "هر آویزی جلوی شیشه دید را کم می‌کند (قدمِ ۱)." },
        { prompt: "پیش از سفرِ زمستانی، مخزنِ شیشه‌شوی را پر می‌کنی", answer: 0, explain: "شیشه‌شوی باید همیشه پر باشد (قدمِ ۱)." },
        { prompt: "در حرکت، مقصدِ تازه را در مسیریاب تایپ می‌کنی", answer: 1, explain: "تنظیمِ مسیریاب پیش از حرکت (قدمِ ۲)." },
        { prompt: "شیشه‌ی جلو بخار گرفته؛ کولر و دمنده را روی شیشه می‌گیری", answer: 0, explain: "کولر هوا را خشک می‌کند و شیشه زود باز می‌شود (قدمِ ۱)." },
        { prompt: "یک بطری آب روی کفِ جلوی راننده رها شده", answer: 1, explain: "ممکن است زیرِ پدال برود (قدمِ ۲)." },
      ],
      takeaway: "پیش از راه افتادن: شیشه‌ها، شیشه‌شوی، مسیریاب، کفِ خودرو. در حرکت: فقط رانندگی.",
      rule: `${CDS("173")}; ${MANUALE}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il parabrezza", fa: "شیشه‌ی جلو" },
        { it: "i vetri dei finestrini", fa: "شیشه‌های پنجره" },
        { it: "il tergicristallo · le spazzole", fa: "برف‌پاک‌کن · تیغه‌های برف‌پاک‌کن" },
        { it: "il lavacristallo", fa: "شیشه‌شوی" },
        { it: "il disappannamento", fa: "بخارزدا" },
        { it: "sbrinare", fa: "یخ یا بخارِ شیشه را باز کردن", base: "sbrinare" },
        { it: "il viva voce", fa: "بلندگو (هندزفری)" },
        { it: "l'auricolare", fa: "هدفون" },
        { it: "il navigatore satellitare", fa: "مسیریاب" },
        { it: "i pannelli a messaggio variabile", fa: "تابلوهای پیامِ متغیر" },
      ],
    },
    {
      kind: "trap",
      title: "«durante la guida»: ممنوع یا مجاز؟",
      body: "هر دو جمله درباره‌ی تلفن در رانندگی‌اند:",
      examples: [
        {
          sourceId: "6970",
          textIt: "L'uso del telefono cellulare senza l'ausilio del \"viva-voce\" o dell'auricolare è vietato durante la guida",
          answer: 1,
          chunks: [
            { it: "L'uso del telefono cellulare", fa: "استفاده از تلفنِ همراه" },
            { it: "senza l'ausilio del \"viva-voce\" o dell'auricolare", fa: "بدونِ هندزفری یا هدفون", focus: "condition" },
            { it: "è vietato durante la guida", fa: "در رانندگی ممنوع است", verb: "è vietato ← vietare" },
          ],
          translation: "استفاده از تلفنِ همراه بدونِ هندزفری یا هدفون در رانندگی ممنوع است.",
          why: "درست است. تلفن در دست ممنوع است.",
        },
        {
          sourceId: "6973",
          textIt: "Durante la guida è consentito utilizzare il cellulare per comporre sms",
          answer: 0,
          chunks: [
            { it: "Durante la guida", fa: "در رانندگی" },
            { it: "è consentito", fa: "مجاز است", verb: "è consentito ← consentire", focus: "contrast" },
            { it: "utilizzare il cellulare per comporre sms", fa: "با تلفنِ همراه پیامک نوشت" },
          ],
          translation: "در رانندگی مجاز است با تلفنِ همراه پیامک نوشت.",
          why: "غلط است. نوشتنِ پیامک دست‌ها و چشم‌ها را از رانندگی می‌گیرد و ممنوع است.",
        },
      ],
      takeaway: "در رانندگی: «vietato» درست است؛ «consentito» کنارِ تلفن یا پیامک یعنی جمله غلط است.",
      rule: CDS("173"),
    },
  ],
  practice: [
    {
      sourceId: "6979",
      textIt: "Occorre verificare le spazzole del tergicristallo per sostituirle se sono consumate",
      answer: 1,
      chunks: [
        { it: "Occorre verificare le spazzole del tergicristallo", fa: "باید تیغه‌های برف‌پاک‌کن را بررسی کرد", verb: "occorre ← occorrere" },
        { it: "per sostituirle se sono consumate", fa: "تا اگر فرسوده‌اند، عوضشان کنی", focus: "condition" },
      ],
      translation: "باید تیغه‌های برف‌پاک‌کن را بررسی کرد تا اگر فرسوده‌اند، عوضشان کنی.",
      why: "درست است (قدم ۱). تیغه‌ی فرسوده شیشه را خوب پاک نمی‌کند، به‌خصوص زیرِ باران.",
      rule: MANUALE,
      conceptStep: 1,
    },
    {
      sourceId: "6982",
      textIt: "Se il parabrezza è coperto dalla polvere, bisogna utilizzare il dispositivo di disappannamento",
      answer: 0,
      chunks: [
        { it: "Se il parabrezza è coperto dalla polvere,", fa: "اگر شیشه‌ی جلو را گرد و خاک پوشانده،", focus: "condition" },
        { it: "bisogna utilizzare il dispositivo di disappannamento", fa: "باید بخارزدا را روشن کرد", verb: "bisogna ← bisognare", focus: "contrast" },
      ],
      translation: "اگر شیشه‌ی جلو را گرد و خاک پوشانده، باید بخارزدا را روشن کرد.",
      why: "غلط است (قدم ۱). بخارزدا بخار را می‌برد، نه خاک را؛ برای خاک، شیشه‌شوی و برف‌پاک‌کن.",
      rule: MANUALE,
      conceptStep: 1,
    },
    {
      sourceId: "6976",
      textIt: "Quando la strada è bagnata, se il veicolo che mi precede solleva dell'acqua che mi sporca il parabrezza, devo sorpassarlo immediatamente",
      answer: 0,
      chunks: [
        { it: "Quando la strada è bagnata,", fa: "وقتی جاده خیس است،", focus: "condition" },
        { it: "se il veicolo che mi precede solleva dell'acqua", fa: "اگر وسیله‌ی جلویی آب بپاشد", focus: "condition", verb: "solleva ← sollevare" },
        { it: "che mi sporca il parabrezza,", fa: "و شیشه‌ی جلویم را کثیف کند،", verb: "sporca ← sporcare" },
        { it: "devo sorpassarlo immediatamente", fa: "باید فوراً از آن سبقت بگیرم", verb: "devo ← dovere", focus: "contrast" },
      ],
      translation: "وقتی جاده خیس است، اگر وسیله‌ی جلویی آب بپاشد و شیشه‌ی جلویم را کثیف کند، باید فوراً از آن سبقت بگیرم.",
      why: "غلط است (قدم ۱). فاصله را بیشتر کن و برف‌پاک‌کن بزن؛ سبقت فقط وقتی امن است، نه «فوراً».",
      rule: `${CDS("148")}; ${CDS("149")}`,
      conceptStep: 1,
    },
    {
      sourceId: "6969",
      textIt: "E' sconsigliabile sistemare oggetti sotto il sedile del conducente per evitare che, scivolando durante la marcia, vadano ad intralciare i movimenti dell'autista",
      answer: 1,
      chunks: [
        { it: "E' sconsigliabile sistemare oggetti sotto il sedile del conducente", fa: "توصیه نمی‌شود وسیله زیرِ صندلیِ راننده بگذاری", focus: "negation" },
        { it: "per evitare che, scivolando durante la marcia,", fa: "تا در حرکت نلغزند و", focus: "reason", verb: "scivolando ← scivolare" },
        { it: "vadano ad intralciare i movimenti dell'autista", fa: "جلوی حرکتِ راننده را نگیرند", verb: "vadano ← andare" },
      ],
      translation: "توصیه نمی‌شود وسیله زیرِ صندلیِ راننده بگذاری، تا در حرکت نلغزند و جلوی حرکتِ راننده را نگیرند.",
      why: "درست است (قدم ۲). وسیله‌ای که زیرِ پدالِ ترمز برود، ترمز را می‌بندد.",
      rule: MANUALE,
      conceptStep: 2,
    },
    {
      sourceId: "6975",
      textIt: "I pannelli a messaggio variabile forniscono indicazioni di pericolo ma non possono avere valore prescrittivo (di obbligo, di divieto)",
      answer: 0,
      chunks: [
        { it: "I pannelli a messaggio variabile", fa: "تابلوهای پیامِ متغیر" },
        { it: "forniscono indicazioni di pericolo", fa: "خطر را خبر می‌دهند", verb: "forniscono ← fornire" },
        { it: "ma non possono avere valore prescrittivo", fa: "ولی نمی‌توانند دستورِ لازم‌الاجرا بدهند", verb: "possono ← potere", focus: "contrast" },
        { it: "(di obbligo, di divieto)", fa: "(اجبار، ممنوعیت)" },
      ],
      translation: "تابلوهای پیامِ متغیر خطر را خبر می‌دهند، ولی نمی‌توانند دستورِ لازم‌الاجرا (اجبار، ممنوعیت) بدهند.",
      why: "غلط است (قدم ۲). آیین‌نامه (ماده‌ی ۱۷۰) به آن‌ها اجازه می‌دهد هم خطر را بگویند هم دستور بدهند.",
      rule: REG("170"),
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6972", "6976", "6977", "6978", "6979", "6980", "6981", "6982"] },
    { step: 2, sourceIds: ["6969", "6970", "6971", "6973", "6974", "6975"] },
  ],
};
