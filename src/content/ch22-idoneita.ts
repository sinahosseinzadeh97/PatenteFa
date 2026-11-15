/**
 * src/content/ch22-idoneita.ts
 * Chapter 22 (Alcool, droga e primo soccorso), lesson 4: being fit to drive
 * beyond alcohol and drugs: tiredness (group 576), heavy meals (580), emotional
 * state (581), and glasses or contact lenses required by the licence (596, CdS
 * art. 173; harmonised code 01). 6463 (keeping a distance when tired) and 6482
 * (heavy food and reaction time) stay in chapter 12 and are linked.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter22.test.ts.
 */
import type { Lesson } from "./lessons.js";

const CDS = (n: string) => `Codice della Strada, art. ${n}`;
const CODICI = "Codici armonizzati UE sulla patente (Dir. 2006/126/CE, all. I; Prefettura, allegato 8): 01 correzione della vista";
const OCCHIALI = "Durante la guida, si devono usare gli occhiali da vista o le lenti a contatto";
const OCCHIALI_FA = "هنگامِ رانندگی باید عینکِ طبی یا لنزِ تماسی زد";
const OCCHIALI_DEVE = "Durante la guida, si deve fare uso di occhiali da vista o di lenti a contatto";
const SELF_CHECK =
  "تمرینِ آموزشی است، نه سؤالِ بانک. مثال‌ها ساختگی‌اند و جواب‌ها ثابت؛ چیزی ذخیره نمی‌شود.";

export const lessonStanchezzaVista: Lesson = {
  id: "stanchezza-pasti-vista",
  titleFa: "خستگی، غذا، احساسات و عینک",
  titleIt: "STANCHEZZA, ALIMENTAZIONE, EMOZIONI, OCCHIALI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی وقتی خسته‌ای چه کنی، چرا غذای سنگین و حالِ عصبی رانندگی را بدتر می‌کنند، و دقیقاً کِی باید عینک یا لنز بزنی: هر وقت گواهینامه‌ات می‌گوید، نه بیشتر و نه کمتر.",
      why:
        "۱۱ سؤال. سه تا درباره‌ی خستگی، غذا و احساسات؛ هشت تا درباره‌ی عینک. تله‌ی عینک: بانک شرط‌هایی می‌سازد (۶ دیوپتر، شب، دیدِ کم، فقط آزادراه) در حالی که تنها شرط گواهینامه است.",
      rule: `${CDS("173")} c.1`,
    },
    {
      kind: "table",
      title: "خستگی، غذا، احساسات",
      body:
        "این‌ها مثلِ الکل همان سه توانایی را پایین می‌آورند: توجه، سنجیدن و واکنش. فرقشان این است که حس‌شان می‌کنی، پس می‌توانی کاری بکنی:",
      columns: ["کارِ درست"],
      rows: [
        { label: "نشانه‌های خستگی", it: "segni di stanchezza", values: ["خمیازه، پلکِ سنگین، یادت نمی‌آید چند کیلومترِ اخیر را چطور آمده‌ای: به نزدیک‌ترین پارکینگِ کوچکِ کنارِ راه برو و استراحت کن. نزدیک شدن به خودروی جلو کمک نیست؛ فاصله را بیشتر کن (فصلِ ۱۲، «فاصله‌ی ایمنی با خودروی جلو»)."] },
        { label: "غذای سنگین", it: "alimentazione pesante ed eccessiva", values: ["غذای زیاد و دیرهضم خواب‌آلودگی می‌آورد، توجه را کم و واکنش را کُند می‌کند (فصلِ ۱۲). قبل از رانندگی سبک بخور."] },
        { label: "حالِ عصبی", it: "stato emotivo alterato", values: ["خشم، غم یا هیجانِ شدید توجه را از جاده می‌گیرد و تصمیم را تند می‌کند. اگر به‌هم‌ریخته‌ای، اول آرام شو، بعد بران."] },
      ],
      takeaway: "خسته: بایست و استراحت کن. سیر و سنگین: صبر کن. عصبانی: آرام شو. هیچ‌کدام با «تمرکزِ بیشتر» حل نمی‌شود.",
    },
    {
      kind: "table",
      title: "عینک یا لنز: وقتی گواهینامه می‌گوید",
      body:
        "اگر هنگامِ صدور یا تمدید، پزشک تشخیص دهد که برای دیدنِ کافی به عینک یا لنز نیاز داری، روی گواهینامه (بخشِ ۱۲، فصلِ ۲۰) کدِ ۰۱ نوشته می‌شود. از آن به بعد، در هر رانندگی، باید آن را بزنی؛ نزدن جریمه دارد (ماده‌ی ۱۷۳). شرطِ دیگری وجود ندارد:",
      columns: ["معنی"],
      rows: [
        { label: "کدِ ۰۱", it: "codice armonizzato \"01\"", values: ["اصلاحِ بینایی: باید عینک یا لنز بزنی."] },
        { label: "۰۱.۰۱ / ۰۱.۰۲ / ۰۱.۰۶", it: "occhiali · lenti a contatto · occhiali o lenti", values: ["زیرکدها نوعش را می‌گویند: فقط عینک، فقط لنز، یا هر کدام."] },
        { label: "به‌صورتِ کامل یا کد", it: "per esteso o sotto forma di codice", values: ["اجبار ممکن است با کلمه یا با کد نوشته شده باشد؛ در هر دو حالت یکی است."] },
        { label: "شرط‌های ساختگی", it: "6 diottrie · tramonto · scarsa visibilità · autostrade", values: ["هیچ‌کدام در قانون نیست. «نیم ساعت بعد از غروب» قاعده‌ی روشن کردنِ چراغ‌هاست (فصلِ ۱۸)، نه عینک."] },
      ],
      takeaway: "عینک یا لنز: همیشه، اگر گواهینامه می‌گوید؛ نه به شمارِ دیوپتر، نه به ساعت، نه به نوعِ جاده.",
      rule: `${CDS("173")} c.1, c.3; ${CODICI}`,
    },
    {
      kind: "classify",
      title: "این‌جا باید عینک بزنی؟",
      body: `${SELF_CHECK} برای هر راننده بگو عینک یا لنز طبقِ قانون لازم است یا نه:`,
      options: [
        { it: "obbligatorio", fa: "لازم است" },
        { it: "non obbligatorio", fa: "طبقِ گواهینامه لازم نیست" },
      ],
      items: [
        { prompt: "گواهینامه کدِ ۰۱ دارد؛ ظهرِ آفتابی، پنج دقیقه تا نانوایی", answer: 0, explain: "کد در هر رانندگی معتبر است، کوتاه یا بلند، روز یا شب." },
        { prompt: "گواهینامه کدِ ۰۱.۰۲ دارد و او لنز زده", answer: 0, explain: "۰۱.۰۲ یعنی لنز؛ او همان را زده و قانون را رعایت کرده." },
        { prompt: "گواهینامه هیچ کدی ندارد و او بی‌عینک خوب می‌بیند", answer: 1, explain: "اجبار از گواهینامه می‌آید. اگر حس کنی دیدت بدتر شده، چشمت را معاینه کن." },
        { prompt: "گواهینامه کدِ ۰۱ دارد، ولی فقط در آزادراه عینک می‌زند", answer: 0, explain: "«فقط در آزادراه» شرطِ ساختگیِ بانک است؛ همه‌جا لازم است." },
        { prompt: "گواهینامه کدی ندارد؛ شب است", answer: 1, explain: "شب شرطِ عینک نیست؛ قاعده‌ی شب برای چراغ‌هاست." },
      ],
      takeaway: "فقط یک سؤال بپرس: گواهینامه‌ام چه می‌گوید؟",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "i segni di stanchezza", fa: "نشانه‌های خستگی" },
        { it: "la piazzola di sosta", fa: "پارکینگِ کوچکِ کنارِ راه" },
        { it: "i cibi di difficile digestione", fa: "غذاهای دیرهضم" },
        { it: "lo stato emotivo alterato", fa: "حالِ عصبی و به‌هم‌ریخته" },
        { it: "gli occhiali da vista", fa: "عینکِ طبی" },
        { it: "le lenti a contatto", fa: "لنزِ تماسی" },
        { it: "il codice armonizzato 01", fa: "کدِ ۰۱" },
        { it: "la miopia", fa: "نزدیک‌بینی" },
      ],
    },
    {
      kind: "trap",
      title: "«si devono usare gli occhiali»: گواهینامه یا دیوپتر؟",
      body: "هر دو جمله با «هنگامِ رانندگی باید عینک زد» شروع می‌شوند. فقط شرطشان فرق دارد:",
      examples: [
        {
          sourceId: "6595",
          textIt: "Durante la guida, si devono usare gli occhiali da vista o le lenti a contatto se nella patente si trova indicato tale obbligo",
          answer: 1,
          chunks: [
            { it: OCCHIALI, fa: OCCHIALI_FA, verb: "devono ← dovere" },
            { it: "se nella patente si trova indicato tale obbligo", fa: "اگر این اجبار در گواهینامه نوشته شده باشد", focus: "condition" },
          ],
          translation: "هنگامِ رانندگی، اگر این اجبار در گواهینامه نوشته شده باشد، باید عینکِ طبی یا لنزِ تماسی زد.",
          why: "درست است. اجبار از گواهینامه می‌آید (ماده‌ی ۱۷۳).",
        },
        {
          sourceId: "6599",
          textIt: "Durante la guida, si deve fare uso di occhiali da vista o di lenti a contatto solo quando la miopia supera 6 diottrie",
          answer: 0,
          chunks: [
            { it: OCCHIALI_DEVE, fa: OCCHIALI_FA, verb: "deve ← dovere" },
            { it: "solo quando la miopia supera 6 diottrie", fa: "فقط وقتی نزدیک‌بینی از ۶ دیوپتر بیشتر است", focus: "limit" },
          ],
          translation: "هنگامِ رانندگی فقط وقتی نزدیک‌بینی از ۶ دیوپتر بیشتر است باید عینکِ طبی یا لنزِ تماسی زد.",
          why: "غلط است. قانون عددِ دیوپتر نمی‌گذارد؛ گواهینامه تعیین می‌کند.",
        },
      ],
      takeaway: "«solo quando …» یا «soltanto …» در جمله‌های عینک یعنی غلط؛ تنها شرطِ درست «nella patente» است.",
      rule: `${CDS("173")} c.1`,
    },
  ],
  practice: [
    {
      sourceId: "6462",
      textIt: "E' opportuno, per il conducente che accusa segni di stanchezza, raggiungere la più vicina piazzola di sosta e riposare",
      answer: 1,
      chunks: [
        { it: "E' opportuno, per il conducente che accusa segni di stanchezza,", fa: "برای راننده‌ای که نشانه‌های خستگی دارد بهتر است", verb: "accusa ← accusare" },
        { it: "raggiungere la più vicina piazzola di sosta e riposare", fa: "به نزدیک‌ترین پارکینگِ کوچکِ کنارِ راه برود و استراحت کند" },
      ],
      translation: "برای راننده‌ای که نشانه‌های خستگی دارد بهتر است به نزدیک‌ترین پارکینگِ کوچکِ کنارِ راه برود و استراحت کند.",
      why: "درست است (قدم ۱). خستگی با استراحت حل می‌شود، نه با ادامه دادن.",
      rule: "Indicazione di sicurezza, senza un articolo del CdS (come nel capitolo 12)",
      conceptStep: 1,
    },
    {
      sourceId: "6596",
      textIt: "Durante la guida, si devono usare gli occhiali da vista o le lenti a contatto se nella patente è stato inserito il codice armonizzato \"01\"",
      answer: 1,
      chunks: [
        { it: OCCHIALI, fa: OCCHIALI_FA, verb: "devono ← dovere" },
        { it: "se nella patente è stato inserito il codice armonizzato \"01\"", fa: "اگر در گواهینامه کدِ هماهنگِ «۰۱» آمده باشد", focus: "condition" },
      ],
      translation: "هنگامِ رانندگی، اگر در گواهینامه کدِ هماهنگِ «۰۱» آمده باشد، باید عینکِ طبی یا لنزِ تماسی زد.",
      why: "درست است (قدم ۲). کدِ ۰۱ یعنی اصلاحِ بینایی.",
      rule: CODICI,
      conceptStep: 2,
    },
    {
      sourceId: "6600",
      textIt: "Durante la guida, si deve fare uso di occhiali da vista o di lenti a contatto da mezz'ora dopo il tramonto del sole a mezz'ora prima del suo sorgere",
      answer: 0,
      chunks: [
        { it: OCCHIALI_DEVE, fa: OCCHIALI_FA, verb: "deve ← dovere" },
        { it: "da mezz'ora dopo il tramonto del sole a mezz'ora prima del suo sorgere", fa: "از نیم ساعت بعد از غروب تا نیم ساعت قبل از طلوع", focus: "limit" },
      ],
      translation: "هنگامِ رانندگی، از نیم ساعت بعد از غروبِ خورشید تا نیم ساعت قبل از طلوعش باید عینکِ طبی یا لنزِ تماسی زد.",
      why: "غلط است (قدم ۲). این ساعت‌ها قاعده‌ی چراغ‌هاست (فصلِ ۱۸)؛ عینک را گواهینامه تعیین می‌کند، همیشه.",
      rule: `${CDS("173")} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "6602",
      textIt: "Durante la guida, si deve fare uso di occhiali da vista o di lenti a contatto soltanto sulle autostrade e sulle strade extraurbane principali",
      answer: 0,
      chunks: [
        { it: OCCHIALI_DEVE, fa: OCCHIALI_FA, verb: "deve ← dovere" },
        { it: "soltanto sulle autostrade e sulle strade extraurbane principali", fa: "فقط در آزادراه‌ها و جاده‌های برون‌شهریِ اصلی", focus: "limit" },
      ],
      translation: "هنگامِ رانندگی فقط در آزادراه‌ها و جاده‌های برون‌شهریِ اصلی باید عینکِ طبی یا لنزِ تماسی زد.",
      why: "غلط است (قدم ۲). نوعِ جاده شرط نیست؛ همه‌جا.",
      rule: `${CDS("173")} c.1`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6462", "6481", "6486"] },
    { step: 2, sourceIds: ["6595", "6596", "6597", "6598", "6599", "6600", "6601", "6602"] },
  ],
};
