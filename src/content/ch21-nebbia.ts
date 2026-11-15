/**
 * src/content/ch21-nebbia.ts
 * Chapter 21 (Incidenti stradali e comportamenti), lesson 6: thick fog. Seeing
 * and being seen (speed within what you see, follow the road markings, fog
 * lights or dipped beams, rear fog light; the belt stays fastened) and stopping
 * (off the carriageway; on it only when forced, with hazard lights).
 * Light rules come from chapter 18, the warning triangle from chapter 17.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter21.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS = (n: string) => `Codice della Strada, art. ${n}`;
const POLIZIA = "Polizia di Stato, «Viaggiare in sicurezza: i consigli della Polizia» (24/01/2023)";
const NEBBIA = "In caso di nebbia fitta";
const NEBBIA_FA = "در مهِ غلیظ";

export const lessonNebbia: Lesson = {
  id: "nebbia-fitta",
  titleFa: "مهِ غلیظ: دیدن، دیده شدن، ایستادن",
  titleIt: "NEBBIA FITTA",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی در مهِ غلیظ چطور سرعت را با دید تنظیم کنی، چه چیزی را دنبال کنی (خط‌کشی، نه چراغِ عقبِ جلویی)، کدام چراغ‌ها را روشن کنی، و اگر مجبور شدی بایستی کجا و چطور.",
      why:
        "۱۴ سؤال. کارهای غلطِ بانک همه یک فکرِ اشتباه دارند: «بیشتر دیده شوم»: بوقِ پیوسته، زیگزاگ، راهنمای چپ، چسبیدن به جلویی. هیچ‌کدام دیده شدن را بیشتر نمی‌کند؛ فقط خطر را.",
      rule: `${CDS("141")} c.2; ${POLIZIA}`,
    },
    {
      kind: "factors",
      title: "دیدن و دیده شدن",
      body:
        "پلیس می‌گوید در مه دید و تخمینِ سرعت و فاصله‌ی جلویی سخت می‌شود و سطحِ جاده ممکن است لغزنده شود. پس با سرعتی برو که بتوانی در فاصله‌ای که می‌بینی بایستی، خط‌کشیِ روی آسفالت را دنبال کن، و چراغ‌ها را درست روشن کن: چراغِ مهِ جلو یا نورِ پایین، و وقتی دید کمتر از ۵۰ متر است چراغِ مهِ عقب (فصلِ ۱۸). کمربند همیشه بسته است (فصلِ ۱۹).",
      columns: [
        {
          title: "درست (VERO)",
          items: [
            { fa: "خط‌کشیِ روی آسفالت را دنبال کن", it: "lasciarsi guidare dalla segnaletica orizzontale", sourceId: "6412", textIt: "In caso di nebbia fitta è opportuno lasciarsi guidare dalla segnaletica orizzontale", answer: 1 },
            { fa: "چراغِ مهِ جلو، یا اگر نیست نورِ پایین", it: "accendere i proiettori fendinebbia o, in mancanza, quelli anabbaglianti", sourceId: "6417", textIt: "In caso di nebbia fitta è opportuno accendere i proiettori fendinebbia o, in mancanza, quelli anabbaglianti", answer: 1 },
            { fa: "چراغِ مهِ عقب", it: "accendere la luce posteriore per nebbia", sourceId: "6418", textIt: "In caso di nebbia fitta è opportuno accendere la luce posteriore per nebbia", answer: 1 },
          ],
        },
        {
          title: "غلط (FALSO)",
          items: [
            { fa: "فقط چراغ‌های موقعیت", it: "con le sole luci di posizioni accese", sourceId: "6420", textIt: "In caso di nebbia fitta è opportuno circolare con le sole luci di posizioni accese", answer: 0 },
            { fa: "چراغ راهنمای چپ همیشه روشن", it: "mantenere in funzione l'indicatore di direzione sinistro", sourceId: "6421", textIt: "In caso di nebbia fitta è opportuno mantenere in funzione l'indicatore di direzione sinistro", answer: 0 },
            { fa: "بوقِ پیوسته", it: "suonare continuativamente il clacson", sourceId: "6424", textIt: "In caso di nebbia fitta è opportuno suonare continuativamente il clacson", answer: 0 },
          ],
        },
      ],
      takeaway: "در مه: سرعت به اندازه‌ی دید، چشم روی خط‌کشی، چراغِ درست، کمربند بسته. بوق و زیگزاگ و راهنما دیده شدن نمی‌آورند.",
      rule: `${CDS("141")} c.2 (arresto entro il campo di visibilità); ${CDS("153")} (luci); ${POLIZIA}`,
    },
    {
      kind: "table",
      title: "ایستادن در مه",
      body:
        "خودروی ایستاده روی سواره‌رو در مه را دیر می‌بینند. پس بانک یک ترتیب می‌خواهد:",
      columns: ["قاعده"],
      rows: [
        { label: "بهتر: نایستی", it: "evitare di fermarsi sulla carreggiata", values: ["روی سواره‌رو نایست، مگر به دلیلِ قهری (forza maggiore): خرابی، مانع، تصادف."] },
        { label: "اگر لازم است", it: "fermarsi fuori dalla carreggiata", values: ["بیرون از سواره‌رو بایست: جای توقف، خطِ اضطراری، شانه‌ی جاده."] },
        {
          label: "اگر مجبوری روی سواره‌رو",
          it: "segnalazione luminosa di pericolo",
          values: ["چراغِ خطر (چهار راهنما با هم) را روشن کن. بیرونِ آبادی مثلثِ خطر هم لازم است، چون در مه از ۱۰۰ متری دیده نمی‌شوی (فصلِ ۱۷)."],
        },
      ],
      takeaway: "در مه: اول نایست؛ اگر لازم شد، بیرون از سواره‌رو؛ اگر مجبوری روی آن، چراغِ خطر (و بیرونِ آبادی مثلث).",
      rule: `${CDS("153")} c.7; ${CDS("162")} c.1`,
    },
    {
      kind: "classify",
      title: "کارِ درست یا اشتباه؟",
      body: "هر موقعیت را بخوان. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "giusto", fa: "کارِ درست" },
        { it: "sbagliato", fa: "کارِ اشتباه" },
      ],
      items: [
        { prompt: "مه غلیظ شد؛ چراغِ عقبِ خودروی جلو را از نزدیک دنبال می‌کنی تا گمش نکنی", answer: 1, explain: "اگر جلویی بایستد، جا برای ایستادن نداری. خط‌کشی را دنبال کن." },
        { prompt: "دید کمتر از ۵۰ متر شده؛ نورِ پایین و چراغِ مهِ عقب را روشن می‌کنی", answer: 0, explain: "همین ترکیب برای دیدِ کمتر از ۵۰ متر است." },
        { prompt: "خسته شده‌ای؛ از سواره‌رو بیرون می‌روی و در جای توقف می‌ایستی", answer: 0, explain: "ایستادن اگر لازم است، بیرون از سواره‌رو." },
        { prompt: "مه رفت و دید خوب شد؛ چراغِ مهِ عقب را روشن نگه می‌داری", answer: 1, explain: "چراغِ مهِ عقب فقط برای دیدِ کمتر از ۵۰ متر است (فصلِ ۱۸)." },
      ],
      takeaway: "در مه هر کاری که فاصله و زمان بدهد درست است؛ هر چیزی که فقط «شلوغ‌تر» دیده شوی نه.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la nebbia fitta", fa: "مهِ غلیظ" },
        { it: "la visibilità", fa: "دید" },
        { it: "la segnaletica orizzontale", fa: "خط‌کشی و نقش‌های روی آسفالت" },
        { it: "i proiettori fendinebbia", fa: "چراغِ مهِ جلو" },
        { it: "i proiettori anabbaglianti", fa: "نورِ پایین" },
        { it: "la luce posteriore per nebbia", fa: "چراغِ مهِ عقب" },
        { it: "le luci di posizione", fa: "چراغ‌های موقعیت" },
        { it: "per cause di forza maggiore", fa: "به دلیلِ قهری (چاره‌ناپذیر)" },
        { it: "accodarsi", fa: "پشتِ سرِ دیگری در صف رفتن" },
      ],
    },
    {
      kind: "trap",
      title: "«procedere»: چطور جلو بروی؟",
      body: "هر دو جمله درباره‌ی «جلو رفتن» در مه است. یکی سرعت را با دید تنظیم می‌کند، دیگری راهِ ساختگی برای دیده شدن است:",
      examples: [
        {
          sourceId: "6413",
          textIt: "In caso di nebbia fitta è opportuno procedere ad una velocità adeguata alla visibilità",
          answer: 1,
          chunks: [
            { it: NEBBIA, fa: NEBBIA_FA },
            { it: "è opportuno procedere ad una velocità adeguata alla visibilità", fa: "بهتر است با سرعتی متناسب با دید جلو بروی", verb: "è ← essere" },
          ],
          translation: "در مهِ غلیظ بهتر است با سرعتی متناسب با دید جلو بروی.",
          why: "درست است. باید بتوانی در فاصله‌ای که می‌بینی بایستی.",
        },
        {
          sourceId: "6422",
          textIt: "In caso di nebbia fitta è opportuno procedere a zig zag per far meglio notare la propria presenza",
          answer: 0,
          chunks: [
            { it: NEBBIA, fa: NEBBIA_FA },
            { it: "è opportuno procedere a zig zag", fa: "بهتر است زیگزاگ بروی", verb: "è ← essere", focus: "contrast" },
            { it: "per far meglio notare la propria presenza", fa: "تا حضورت بهتر دیده شود", focus: "reason" },
          ],
          translation: "در مهِ غلیظ بهتر است زیگزاگ بروی تا حضورت بهتر دیده شود.",
          why: "غلط است. زیگزاگ تو را از خطِ عبورت بیرون می‌برد، روبه‌روی خودروهای دیگر. چراغِ درست تو را دیده‌شدنی می‌کند.",
        },
      ],
      takeaway: "«procedere» در مه یعنی آهسته و در خطِ خودت. «per farsi notare» در جمله‌ی مه معمولاً یعنی غلط.",
      rule: `${CDS("141")} c.2`,
    },
  ],
  practice: [
    {
      sourceId: "6419",
      textIt: "In caso di nebbia fitta è opportuno guidare con la massima prudenza e concentrazione",
      answer: 1,
      chunks: [
        { it: NEBBIA, fa: NEBBIA_FA },
        { it: "è opportuno guidare con la massima prudenza e concentrazione", fa: "بهتر است با بیشترین احتیاط و تمرکز برانی", verb: "guidare ← guidare" },
      ],
      translation: "در مهِ غلیظ بهتر است با بیشترین احتیاط و تمرکز برانی.",
      why: "درست است (قدم ۱). پلیس می‌گوید در مه احتمالِ خطا برای همه بیشتر می‌شود؛ حواس باید کامل روی جاده باشد.",
      rule: POLIZIA,
      conceptStep: 1,
    },
    {
      sourceId: "6423",
      textIt: "In caso di nebbia fitta è opportuno accodarsi al veicolo che precede quanto più vicino possibile",
      answer: 0,
      chunks: [
        { it: NEBBIA, fa: NEBBIA_FA },
        { it: "è opportuno accodarsi al veicolo che precede", fa: "بهتر است پشتِ خودروی جلویی بروی", verb: "accodarsi ← accodarsi" },
        { it: "quanto più vicino possibile", fa: "تا جایی که ممکن است نزدیک", focus: "contrast" },
      ],
      translation: "در مهِ غلیظ بهتر است تا جایی که ممکن است نزدیک، پشتِ خودروی جلویی بروی.",
      why: "غلط است (قدم ۱). اگر جلویی ناگهان بایستد، جا برای ایستادن نداری؛ در مه فاصله باید بیشتر شود.",
      rule: `${CDS("149")} c.1; ${CDS("141")} c.2`,
      conceptStep: 1,
    },
    {
      sourceId: "6415",
      textIt: "In caso di nebbia fitta è opportuno se costretti a fermarsi sulla carreggiata, usare la segnalazione luminosa di pericolo (quattro frecce lampeggianti simultaneamente)",
      answer: 1,
      chunks: [
        { it: NEBBIA, fa: NEBBIA_FA },
        { it: "è opportuno se costretti a fermarsi sulla carreggiata,", fa: "اگر مجبور شدی روی سواره‌رو بایستی،", focus: "condition" },
        { it: "usare la segnalazione luminosa di pericolo (quattro frecce lampeggianti simultaneamente)", fa: "از چراغِ خطر (چهار راهنمای چشمک‌زن با هم) استفاده کن", verb: "usare ← usare" },
      ],
      translation: "در مهِ غلیظ، اگر مجبور شدی روی سواره‌رو بایستی، بهتر است از چراغِ خطر (چهار راهنمای چشمک‌زن با هم) استفاده کنی.",
      why: "درست است (قدم ۲). خودروی ایستاده‌ای که مانع است همان جایی است که چراغِ خطر برایش ساخته شده.",
      rule: `${CDS("153")} c.7`,
      conceptStep: 2,
    },
    {
      sourceId: "6414",
      textIt: "In caso di nebbia fitta è opportuno fermarsi, se necessario, fuori dalla carreggiata",
      answer: 1,
      chunks: [
        { it: NEBBIA, fa: NEBBIA_FA },
        { it: "è opportuno fermarsi, se necessario,", fa: "بهتر است، اگر لازم شد، بایستی", verb: "fermarsi ← fermarsi", focus: "condition" },
        { it: "fuori dalla carreggiata", fa: "بیرون از سواره‌رو" },
      ],
      translation: "در مهِ غلیظ بهتر است، اگر لازم شد، بیرون از سواره‌رو بایستی.",
      why: "درست است (قدم ۲). بیرون از سواره‌رو، خودروی ایستاده سرِ راهِ کسی نیست که دیر می‌بیندش.",
      rule: CDS("141"),
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6412", "6413", "6417", "6418", "6419", "6420", "6421", "6422", "6423", "6424", "6425"] },
    { step: 2, sourceIds: ["6414", "6415", "6416"] },
  ],
};
