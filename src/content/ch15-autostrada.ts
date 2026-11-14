/**
 * src/content/ch15-autostrada.ts
 * Chapter 15 (Sorpasso), lesson 7: overtaking on the motorway. The rules are
 * the art. 148 ones (left, check behind, return as soon as possible, do not
 * follow someone who is overtaking); the bank asks which situations cause
 * crashes at motorway speed: fast traffic behind, short following distance,
 * a vehicle ahead pulling out, lingering in the overtaking lane, tailing an
 * overtaker, side wind. Laybys, dipped headlights and a "100 m" return gap
 * are the invented ones.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter15.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_148 = "Codice della Strada, art. 148";
const CDS_149 = "Codice della Strada, art. 149";
const DURANTE = "Durante un sorpasso in autostrada,";
const DURANTE_FA = "هنگامِ سبقت در آزادراه،";
const MOTIVO = "Il sorpasso in autostrada può essere motivo di incidente,";
const MOTIVO_FA = "سبقت در آزادراه می‌تواند علتِ تصادف باشد،";

export const lessonSorpassoAutostrada: Lesson = {
  id: "sorpasso-autostrada",
  titleFa: "سبقت در آزادراه",
  titleIt: "SORPASSO IN AUTOSTRADA",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس شش موقعیتی را که در آزادراه سبقت را به تصادف تبدیل می‌کنند نام می‌بری، و سه چیزی را که بانک به دروغ «علتِ تصادف» یا «قانون» می‌خواند کنار می‌گذاری.",
      why:
        "۹ سؤال. قاعده‌ها همان قاعده‌های درس‌های ۲ و ۳ است؛ فرق در سرعت است. در ۱۳۰ کیلومتر بر ساعت هر ثانیه ۳۶ متر می‌روی، پس هر اشتباهِ کوچک بزرگ می‌شود.",
      rule: `${CDS_148} c.2–3, c.11; ${CDS_149} c.1`,
    },
    {
      kind: "table",
      title: "شش علتِ واقعی، سه علتِ ساختگی",
      body:
        "در آزادراه کسی از روبه‌رو نمی‌آید، ولی خطر از پشت و از کنار می‌آید. ردیف‌ها را با چهار بررسیِ درسِ ۲ مقایسه کن: تقریباً هر علتِ واقعی یکی از همان‌هاست، در سرعتِ بالا.",
      columns: ["علتِ تصادف؟", "چرا"],
      rows: [
        { label: "به خودروهای پشتِ سر کم توجه کنی", it: "scarsa attenzione ai veicoli che seguono", values: ["بله", "خودروی پشتی ممکن است خیلی تندتر بیاید؛ پیش از رفتن به چپ، آینه و یک نگاهِ سریع به کنار"] },
        { label: "فاصله‌ی ایمنیِ کافی نداشته باشی", it: "insufficiente distanza di sicurezza", values: ["بله", "پیش از سبقت هنوز پشتِ همان خودرویی؛ در سرعتِ بالا مسافتِ واکنش هم بلند است"] },
        { label: "یکی از خودروهای جلو ناگهان به خطِ سبقت بیاید", it: "improvviso spostamento sulla corsia di sorpasso", values: ["بله", "فاصله و توجه به راهنماهای جلو؛ رانندهٔ جلویی شاید تو را ندیده باشد"] },
        { label: "خیلی طولانی در خطِ سبقت بمانی", it: "mantenersi troppo a lungo sulla corsia di sorpasso", values: ["بله، مزاحمت", "سبقت که تمام شد، هر وقت ممکن شد به راست برگرد"] },
        { label: "پشتِ خودرویی که دارد سبقت می‌گیرد بچسبی و با او سبقت بگیری", it: "accodandosi ad un veicolo che sta sorpassando", values: ["بله", "جلو را نمی‌بینی؛ اگر او ترمز کند یا برگردد، تو در خطِ سبقت گیر می‌کنی"] },
        { label: "بادِ شدیدِ پهلو", it: "forte vento laterale", values: ["بله", "کنارِ کامیون، باد ناگهان قطع و دوباره وصل می‌شود و خودرو را تکان می‌دهد"] },
        { label: "نزدیکِ پارکینگِ کنارِ راه (piazzola) سبقت بگیری", it: "in vicinanza di una piazzola di sosta", values: ["نه", "پارکینگِ کنارِ راه خارج از خط‌های عبور است و سبقت را خطرناک نمی‌کند"] },
        { label: "نورِ پایین (anabbaglianti) همیشه روشن باشد", it: "luci anabbaglianti sempre accese", values: ["نه", "نورِ پایین دیده شدنِ تو را بیشتر می‌کند، نه خطر را"] },
        { label: "«بعد از سبقت، دست‌کم ۱۰۰ متر از خودروی سبقت‌گرفته‌شده فاصله بگیر، بعد برگرد»", it: "almeno 100 m", values: ["قانون نیست", "قانون عددی نمی‌دهد: وقتی در آینه دیدی با فاصله پشتِ سرت است، برگرد"] },
      ],
      takeaway:
        "آزادراه = همان قاعده‌ها با سرعتِ بیشتر: آینه پیش از رفتن، فاصله پیش از سبقت، چشم به راهنماهای جلو، بی‌معطلی برگشتن، دنبالِ سبقت‌گیرنده نرفتن، و احتیاط در باد. «۱۰۰ متر» مالِ این‌جا نیست.",
      rule: `${CDS_148} c.2–3, c.11; ${CDS_149} c.1`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la corsia di sorpasso", fa: "خطِ سبقت؛ خطِ عبورِ چپ در آزادراه" },
        { it: "i veicoli che seguono", fa: "خودروهای پشتِ سر" },
        { it: "lo spostamento improvviso", fa: "جابه‌جاییِ ناگهانی (به خطِ دیگر)" },
        { it: "il vento laterale", fa: "بادِ پهلو", note: "forte vento laterale = بادِ پهلوی شدید." },
        { it: "la piazzola di sosta", fa: "پارکینگِ کوچکِ کنارِ راه" },
        { it: "gli anabbaglianti", fa: "نورِ پایین", note: "gli abbaglianti = نورِ بالا." },
        { it: "essere motivo di incidente", fa: "علتِ تصادف بودن" },
      ],
    },
    {
      kind: "trap",
      title: "زیاد در خطِ سبقت، یا «۱۰۰ متر»؟",
      body: "هر دو جمله درباره‌ی پایانِ سبقت در آزادراه‌اند. یکی می‌گوید زود برگرد، دیگری عددی می‌سازد:",
      examples: [
        {
          sourceId: "5287",
          textIt: "Durante un sorpasso in autostrada, mantenersi troppo a lungo sulla corsia di sorpasso può essere motivo di intralcio",
          answer: 1,
          chunks: [
            { it: DURANTE, fa: DURANTE_FA },
            { it: "mantenersi troppo a lungo", fa: "زیادی طولانی ماندن", verb: "mantenersi ← mantenere", focus: "limit" },
            { it: "sulla corsia di sorpasso", fa: "در خطِ سبقت" },
            { it: "può essere motivo di intralcio", fa: "می‌تواند باعثِ مزاحمت شود", verb: "può ← potere" },
          ],
          translation: "هنگامِ سبقت در آزادراه، زیادی طولانی ماندن در خطِ سبقت می‌تواند باعثِ مزاحمت شود.",
          why: "درست است. پشتِ سرِ تو کسانی می‌خواهند سبقت بگیرند. قانون می‌گوید هر وقت ممکن شد به راست برگرد.",
        },
        {
          sourceId: "5261",
          textIt: "Nella fase di rientro dal sorpasso in autostrada, il conducente deve distanziarsi di almeno 100 m dal veicolo sorpassato",
          answer: 0,
          chunks: [
            { it: "Nella fase di rientro dal sorpasso in autostrada,", fa: "در مرحله‌ی برگشتن بعد از سبقت در آزادراه،" },
            { it: "il conducente deve distanziarsi", fa: "راننده باید فاصله بگیرد", verb: "deve ← dovere" },
            { it: "di almeno 100 m", fa: "دست‌کم ۱۰۰ متر", focus: "limit" },
            { it: "dal veicolo sorpassato", fa: "از وسیله‌ای که از آن سبقت گرفته" },
          ],
          translation: "در مرحله‌ی برگشتن بعد از سبقت در آزادراه، راننده باید دست‌کم ۱۰۰ متر از وسیله‌ای که از آن سبقت گرفته فاصله بگیرد.",
          why: "غلط است. قانون عددی نمی‌دهد. ۱۰۰ متر در فصلِ ۱۲ مالِ فاصله بینِ وسیله‌هایی است که سبقتشان ممنوع شده، نه برگشتن بعد از سبقت.",
        },
      ],
      takeaway: "برگشتن = «هر وقت ممکن شد، بدونِ بریدنِ راه»، نه یک عددِ ثابت. ۱۰۰ متر را در جمله‌ی سبقت دیدی، به احتمالِ زیاد دام است.",
      rule: `${CDS_148} c.3`,
    },
  ],
  practice: [
    {
      sourceId: "5288",
      textIt: "Il sorpasso in autostrada può essere motivo di incidente, se viene effettuato accodandosi ad un veicolo che sta sorpassando",
      answer: 1,
      chunks: [
        { it: MOTIVO, fa: MOTIVO_FA, verb: "può ← potere" },
        { it: "se viene effettuato", fa: "اگر انجام شود", focus: "condition", verb: "viene effettuato ← effettuare" },
        { it: "accodandosi ad un veicolo che sta sorpassando", fa: "با چسبیدن به دنبالِ وسیله‌ای که دارد سبقت می‌گیرد", verb: "accodandosi ← accodarsi" },
      ],
      translation: "سبقت در آزادراه می‌تواند علتِ تصادف باشد، اگر با چسبیدن به دنبالِ وسیله‌ای انجام شود که دارد سبقت می‌گیرد.",
      why: "درست است (قدم ۱). پشتِ او جلو را نمی‌بینی و اگر ترمز کند فاصله نداری. همان قاعده‌ی درسِ ۲: سبقت از کسی که خودش سبقت می‌گیرد.",
      rule: `${CDS_148} c.2, c.11`,
      conceptStep: 1,
    },
    {
      sourceId: "5285",
      textIt: "Durante un sorpasso in autostrada, l'insufficiente distanza di sicurezza può essere causa di incidente",
      answer: 1,
      chunks: [
        { it: DURANTE, fa: DURANTE_FA },
        { it: "l'insufficiente distanza di sicurezza", fa: "فاصله‌ی ایمنیِ ناکافی" },
        { it: "può essere causa di incidente", fa: "می‌تواند علتِ تصادف باشد", verb: "può ← potere" },
      ],
      translation: "هنگامِ سبقت در آزادراه، فاصله‌ی ایمنیِ ناکافی می‌تواند علتِ تصادف باشد.",
      why: "درست است (قدم ۱). تا وقتی به چپ نرفته‌ای، هنوز پشتِ همان خودرویی. چسبیدن به او برای سبقت یعنی اگر ترمز کند، به او می‌خوری.",
      rule: `${CDS_149} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "5290",
      textIt: "Il sorpasso in autostrada può essere motivo di incidente, se viene effettuato in vicinanza di una piazzola di sosta",
      answer: 0,
      chunks: [
        { it: MOTIVO, fa: MOTIVO_FA, verb: "può ← potere" },
        { it: "se viene effettuato", fa: "اگر انجام شود", focus: "condition", verb: "viene effettuato ← effettuare" },
        { it: "in vicinanza di una piazzola di sosta", fa: "نزدیکِ پارکینگِ کوچکِ کنارِ راه" },
      ],
      translation: "سبقت در آزادراه می‌تواند علتِ تصادف باشد، اگر نزدیکِ پارکینگِ کوچکِ کنارِ راه انجام شود.",
      why: "غلط است (قدم ۱). پارکینگِ کنارِ راه بیرون از خط‌های عبور است و سبقت را خطرناک‌تر نمی‌کند.",
      rule: `${CDS_148} c.2`,
      conceptStep: 1,
    },
    {
      sourceId: "5291",
      textIt: "Il sorpasso in autostrada può essere motivo di incidente, se si viaggia con le luci anabbaglianti sempre accese",
      answer: 0,
      chunks: [
        { it: MOTIVO, fa: MOTIVO_FA, verb: "può ← potere" },
        { it: "se si viaggia", fa: "اگر رانندگی کنی", focus: "condition", verb: "si viaggia ← viaggiare" },
        { it: "con le luci anabbaglianti sempre accese", fa: "با نورِ پایینِ همیشه روشن", focus: "always" },
      ],
      translation: "سبقت در آزادراه می‌تواند علتِ تصادف باشد، اگر با نورِ پایینِ همیشه روشن رانندگی کنی.",
      why: "غلط است (قدم ۱). نورِ پایین فقط دیده شدنت را بیشتر می‌کند؛ بیرون از آبادی، از جمله در آزادراه، روشن بودنش (یا چراغِ روشناییِ روز) اجباری هم هست.",
      rule: `${CDS_148} c.2; Codice della Strada, art. 152 c.1`,
      conceptStep: 1,
    },
  ],
  related: [
    {
      step: 1,
      // what makes a motorway overtake dangerous, and the invented causes and numbers
      sourceIds: ["5261", "5284", "5285", "5286", "5287", "5288", "5289", "5290", "5291"],
    },
  ],
};
