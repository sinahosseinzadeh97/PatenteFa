/**
 * src/content/ch22-ferite.ts
 * Chapter 22 (Alcool, droga e primo soccorso), lesson 7: a bleeding wound
 * (bank group 584) and heavy external bleeding (585), against ERC Guidelines
 * 2025 First Aid (direct pressure first; tourniquet only for the trained).
 *
 * Two statements are not used in scored practice (tests/chapter22.test.ts):
 *  - 6518 (FALSO in the bank: "you absolutely may not give water"): current
 *    guidance is not to give a seriously injured person anything to drink.
 *    Taught as a discrepancy: the bank's answer for the exam, the guidance for
 *    real life.
 *  - 6505 (VERO: wash a dirty bleeding wound with clean water at once): right
 *    for a small wound; with heavy bleeding, pressure comes first. Taught with
 *    that caveat.
 *
 * Trust rules as in src/content/lessons.ts.
 */
import type { Lesson } from "./lessons.js";

const ERC = "European Resuscitation Council, Guidelines 2025 First Aid (Resuscitation 215, 2025, 110752)";
const NO_DRINK = "NHS, «Broken arm or wrist» (rev. 02/10/2026): non mangiare né bere, potrebbe servire un intervento; Mayo Clinic, «Shock: First aid» (letto tramite indice di ricerca)";
const DISCLAIMER =
  "تمرینِ آموزشی است، نه سؤالِ بانک؛ موقعیتی ساده‌شده برای فهمیدنِ درس، نه دستورِ اضطراری برای موقعیتِ واقعیِ تو و نه جایگزینِ دوره‌ی عملیِ کمک‌های اولیه. در موقعیتِ واقعی با ۱۱۲ (یا ۱۱۸) تماس بگیر و از دستورهای اپراتور پیروی کن.";
const ACTIONS = [
  { it: "fallo", fa: "انجامش بده" },
  { it: "non è richiesto", fa: "لازم نیست" },
  { it: "non farlo", fa: "نکن" },
];
const FERITA = "Se un infortunato della strada ha una ferita sanguinante";
const FERITA_FA = "اگر مصدومِ تصادف زخمی دارد که خون می‌آید";
const EMORRAGIA = "Se un infortunato della strada ha un'abbondante emorragia esterna,";
const EMORRAGIA_FA = "اگر مصدومِ تصادف خونریزیِ بیرونیِ شدید دارد،";

export const lessonFeriteEmorragia: Lesson = {
  id: "ferite-emorragia",
  titleFa: "زخمِ خون‌ریز و خونریزیِ شدید",
  titleIt: "FERITE SANGUINANTI ED EMORRAGIA ESTERNA",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی با زخمی که خون می‌آید چه کنی: بپوشان و فشار بده، جسمِ فرورفته را بیرون نکش، و با خونریزیِ شدید فوراً خبر کن، فشار را ادامه بده و مصدوم را بنشان یا دراز کن. یک جمله‌ی بانک با رهنمودِ امروز فرق دارد؛ هر دو را می‌بینی.",
      why:
        "۱۵ سؤال. تقریباً همه‌ی جمله‌های غلط کاری را پیشنهاد می‌کنند که خونریزی را بیشتر یا آسیب را بدتر می‌کند: نپوشاندن، آبِ داغ، بیرون کشیدنِ جسم، راه بردن، نوشیدنی به بیهوش.",
      rule: ERC,
    },
    {
      kind: "table",
      title: "زخمی که خون می‌آید",
      body:
        "قاعده‌ی اصلی: خون را با پوشاندن و فشار نگه دار. «tamponare» این‌جا یعنی گاز یا پارچه را روی زخم فشار دادن؛ ربطی به «tamponamento» (تصادف از پشت، فصلِ ۲۱) ندارد. اگر دستکش داری بپوش.",
      columns: ["در بانک", "چه کنی"],
      rows: [
        { label: "بپوشان", it: "coprire con materiale sterile o pulito", values: ["درست", "با گازِ استریل یا تمیزترین پارچه‌ای که داری بپوشان تا خون بند بیاید"] },
        { label: "فشار بده", it: "tamponarla con garze sterili o panni puliti", values: ["درست", "گاز یا پارچه را روی زخم بگذار و فشار بده"] },
        { label: "زخمِ خاکی", it: "lavarla con acqua pulita", values: ["درست", "زخمِ کوچکِ خاکی را با آبِ تمیز بشوی. ولی اگر خون زیاد می‌آید، اول و فقط فشار؛ شستن صبر می‌کند تا امداد برسد"] },
        { label: "جسمِ فرورفته", it: "corpi estranei conficcati", values: ["درست (بیرون نکش)", "شیشه یا تکه‌ای که در زخم فرو رفته را بیرون نکش؛ ممکن است جلوی خون را گرفته باشد. دورِ آن را بپوشان و به اپراتور بگو"] },
        { label: "اول بیرون کشیدن", it: "togliere subito i corpi estranei", values: ["غلط", "بیرون کشیدن ممکن است خونریزی را شدیدتر کند"] },
        { label: "نپوشاندن", it: "non bisogna coprirla", values: ["غلط", "زخمِ باز خون بیشتری از دست می‌دهد و آلوده می‌شود"] },
        { label: "آبِ داغ", it: "versarvi sopra acqua calda", values: ["غلط", "آبِ داغ خونریزی را بند نمی‌آورد و می‌سوزاند"] },
        { label: "آب یا چای به بیهوش", it: "dargli da bere acqua o tè", values: ["غلط", "بیهوش نمی‌تواند قورت بدهد؛ نوشیدنی راهِ تنفس را می‌بندد (درسِ ۶)"] },
      ],
      takeaway: "بپوشان، فشار بده، جسم را بیرون نکش. شستن فقط برای زخمِ کوچک.",
      rule: ERC,
    },
    {
      kind: "table",
      title: "خونریزیِ شدید",
      body:
        "خونریزیِ شدید در چند دقیقه جان را تهدید می‌کند. شورای احیای اروپا (۲۰۲۵): فشارِ مستقیم و محکم روی محلِ خونریزی، با گاز یا پارچه، و کمک خبر کن. یک جمله‌ی این گروه با رهنمودِ امروز جور نیست؛ آخرِ جدول:",
      columns: ["چه کنی"],
      rows: [
        { label: "فشار، فوراً", it: "tamponare subito, facendo pressione", values: ["با پارچه‌ی تمیز یا گازِ استریل، محکم و پیوسته روی زخم فشار بده. اگر خون از پارچه رد شد، برش ندار؛ یکی دیگر رویش بگذار و فشار را ادامه بده."] },
        { label: "خبر کن", it: "chiamare subito i soccorsi", values: ["۱۱۲ (یا ۱۱۸)، همان اول. اگر کسِ دیگری هست، او زنگ بزند و تو فشار بده."] },
        { label: "بند بیاید", it: "arrestare la fuoriuscita del sangue", values: ["هدف بند آمدنِ خون است، نه «فقط پانسمان کردن». اگر فشار خون را بند نیاورد، به اپراتور بگو و فشار را رها نکن. رهنمودها برای خونریزیِ شدیدِ دست یا پا تورنیکه را هم می‌گویند، ولی فقط برای کسی که آموزش دیده و ابزارش را دارد."] },
        { label: "بنشان یا دراز کن", it: "in posizione seduta o sdraiata", values: ["تا امداد برسد، بنشیند یا دراز بکشد؛ ممکن است دچارِ شوک شود (درسِ ۸)."] },
        { label: "راه بردن", it: "far camminare l'infortunato", values: ["غلط: حرکت خونریزی را بیشتر می‌کند و ممکن است بیفتد."] },
        { label: "جمله‌ی مورد اختلاف", it: "non si può assolutamente dargli da bere acqua", values: ["جمله‌ی بانک: «به مصدومِ خونریزیِ شدید مطلقاً نمی‌شود آب داد.» جوابِ بانک: FALSO. رهنمودِ امروز: به مصدومِ شدیدِ خونریزی یا شوک چیزی برای خوردن و نوشیدن نده؛ ممکن است استفراغ کند یا عمل لازم شود. در امتحان جوابِ بانک FALSO است؛ در واقعیت آب نده، مگر اپراتور بگوید. این جمله در تمرین‌های امتیازیِ این دوره نمی‌آید."] },
      ],
      takeaway: "خونریزیِ شدید: فشار بده و ادامه بده، خبر کن، بنشان یا دراز کن. راه نبر؛ نوشیدنی نده.",
      rule: `${ERC}; ${NO_DRINK}`,
    },
    {
      kind: "classify",
      title: "حالا چه کنی؟ خونریزی از ساعد",
      body: `${DISCLAIMER} داخلِ آبادی، روز. بعد از یک تصادفِ کوچک، راننده‌ای با ساعدِ بریده از خودرو پیاده شده؛ خون زیاد و پیوسته می‌آید. هوشیار است و حرف می‌زند. در ساعدش تکه‌ای شیشه فرو رفته. صحنه امن است. هنوز کسی خبر نکرده. کیفِ کمک‌های اولیه‌ی خودروی تو گاز و دستکش دارد. برای هر کار بگو:`,
      options: ACTIONS,
      items: [
        { prompt: "به ۱۱۲ (یا ۱۱۸) زنگ می‌زنی یا از رهگذری می‌خواهی زنگ بزند", answer: 0, explain: "خونریزیِ شدید یعنی فوراً امداد." },
        { prompt: "دستکش می‌پوشی و با گاز، دورِ شیشه را محکم فشار می‌دهی", answer: 0, explain: "فشارِ مستقیم؛ جسمِ فرورفته را بیرون نمی‌کشی و دورش فشار می‌دهی." },
        { prompt: "او را می‌نشانی یا دراز می‌کنی", answer: 0, explain: "ممکن است شوک کند یا از حال برود." },
        { prompt: "شیشه را بیرون می‌کشی تا زخم را تمیز کنی", answer: 2, explain: "بیرون کشیدن ممکن است خونریزی را شدیدتر کند." },
        { prompt: "زخم را زیرِ آبِ داغ می‌گیری تا خون بند بیاید", answer: 2, explain: "آبِ داغ خون را بند نمی‌آورد و می‌سوزاند." },
        { prompt: "با او تا داروخانه‌ی سرِ خیابان پیاده می‌روی", answer: 2, explain: "راه رفتن خونریزی را بیشتر می‌کند؛ امداد باید بیاید." },
        { prompt: "گاز خیس شد؛ گازِ دیگری رویش می‌گذاری و فشار را ادامه می‌دهی", answer: 0, explain: "برداشتنِ گازِ اول لخته را می‌کند؛ رویش اضافه کن." },
        { prompt: "پیش از هر کاری از زخم عکس می‌گیری", answer: 1, explain: "کمکی به بند آمدنِ خون نمی‌کند؛ اولویت فشار و خبر کردن است." },
      ],
      takeaway: "فشار، خبر کردن، نشاندن. شیشه را رها کن؛ آبِ داغ و راه رفتن نه.",
      rule: ERC,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la ferita sanguinante", fa: "زخمِ خون‌ریز" },
        { it: "l'emorragia esterna", fa: "خونریزیِ بیرونی" },
        { it: "tamponare (una ferita)", fa: "روی زخم فشار دادن", note: "non «tamponamento» (capitolo 21)" },
        { it: "la garza sterile", fa: "گازِ استریل" },
        { it: "il materiale pulito", fa: "پارچه یا وسیله‌ی تمیز" },
        { it: "il corpo estraneo conficcato", fa: "جسمِ خارجیِ فرورفته" },
        { it: "fare pressione", fa: "فشار دادن" },
        { it: "medicare", fa: "پانسمان کردن" },
        { it: "il sanguinamento", fa: "خونریزی" },
      ],
    },
    {
      kind: "trap",
      title: "«coprire» یا «non coprire»؟",
      body: "هر دو جمله درباره‌ی پوشاندنِ زخمِ خون‌ریزند. یکی کارِ درست را می‌گوید، دیگری برعکسش را با یک دلیلِ ساختگی:",
      examples: [
        {
          sourceId: "6507",
          textIt: "Se un infortunato della strada ha una ferita sanguinante, bisogna tamponarla con garze sterili o panni puliti",
          answer: 1,
          chunks: [
            { it: `${FERITA},`, fa: `${FERITA_FA}،` },
            { it: "bisogna tamponarla", fa: "باید روی آن فشار داد", verb: "bisogna ← bisognare" },
            { it: "con garze sterili o panni puliti", fa: "با گازِ استریل یا پارچه‌ی تمیز" },
          ],
          translation: "اگر مصدومِ تصادف زخمی دارد که خون می‌آید، باید با گازِ استریل یا پارچه‌ی تمیز روی آن فشار داد.",
          why: "درست است. فشارِ مستقیم با وسیله‌ی تمیز.",
        },
        {
          sourceId: "6510",
          textIt: "Se un infortunato della strada ha una ferita sanguinante non bisogna coprirla, per facilitare l'arresto spontaneo del sangue",
          answer: 0,
          chunks: [
            { it: FERITA, fa: FERITA_FA },
            { it: "non bisogna coprirla,", fa: "نباید آن را پوشاند،", verb: "bisogna ← bisognare", focus: "negation" },
            { it: "per facilitare l'arresto spontaneo del sangue", fa: "تا خون خودبه‌خود بند بیاید", focus: "reason" },
          ],
          translation: "اگر مصدومِ تصادف زخمی دارد که خون می‌آید، نباید آن را پوشاند تا خون خودبه‌خود بند بیاید.",
          why: "غلط است. پوشاندن و فشار است که خون را بند می‌آورد. «arresto» این‌جا یعنی بند آمدن، نه حبس (درسِ ۲).",
        },
      ],
      takeaway: "در زخمِ خون‌ریز، «coprire / tamponare / pressione» درست است؛ «non coprire»، «acqua calda»، «togliere subito» غلط.",
      rule: ERC,
    },
  ],
  practice: [
    {
      sourceId: "6504",
      textIt: "Se un infortunato della strada ha una ferita sanguinante la si deve coprire con materiale sterile o quanto più possibile pulito, per bloccare il sanguinamento",
      answer: 1,
      chunks: [
        { it: FERITA, fa: FERITA_FA },
        { it: "la si deve coprire con materiale sterile o quanto più possibile pulito,", fa: "باید آن را با وسیله‌ی استریل یا تا جای ممکن تمیز پوشاند،", verb: "deve ← dovere" },
        { it: "per bloccare il sanguinamento", fa: "تا خونریزی بند بیاید", focus: "reason" },
      ],
      translation: "اگر مصدومِ تصادف زخمی دارد که خون می‌آید، باید آن را با وسیله‌ی استریل یا تا جای ممکن تمیز پوشاند تا خونریزی بند بیاید.",
      why: "درست است (قدم ۱). پوشاندن و فشار.",
      rule: ERC,
      conceptStep: 1,
    },
    {
      sourceId: "6508",
      textIt: "Durante un intervento di primo soccorso, se l'infortunato ha una ferita sanguinante, si devono togliere subito gli eventuali corpi estranei in essa presenti e, successivamente, coprire la ferita",
      answer: 0,
      chunks: [
        { it: "Durante un intervento di primo soccorso, se l'infortunato ha una ferita sanguinante,", fa: "در کمک‌های اولیه، اگر مصدوم زخمی دارد که خون می‌آید،" },
        { it: "si devono togliere subito gli eventuali corpi estranei in essa presenti", fa: "باید فوراً جسم‌های خارجیِ احتمالیِ درونِ آن را بیرون آورد", verb: "devono ← dovere", focus: "contrast" },
        { it: "e, successivamente, coprire la ferita", fa: "و بعد زخم را پوشاند" },
      ],
      translation: "در کمک‌های اولیه، اگر مصدوم زخمی دارد که خون می‌آید، باید فوراً جسم‌های خارجیِ احتمالیِ درونِ آن را بیرون آورد و بعد زخم را پوشاند.",
      why: "غلط است (قدم ۱). جسمِ فرورفته را بیرون نمی‌کشی؛ دورش را می‌پوشانی.",
      rule: ERC,
      conceptStep: 1,
    },
    {
      sourceId: "6513",
      textIt: "Se un infortunato della strada ha un'abbondante emorragia esterna, si deve tamponare subito la ferita, facendo pressione con del materiale pulito o possibilmente sterile",
      answer: 1,
      chunks: [
        { it: EMORRAGIA, fa: EMORRAGIA_FA },
        { it: "si deve tamponare subito la ferita,", fa: "باید فوراً روی زخم فشار داد،", verb: "deve ← dovere" },
        { it: "facendo pressione con del materiale pulito o possibilmente sterile", fa: "با وسیله‌ای تمیز، و اگر شد استریل", verb: "facendo ← fare" },
      ],
      translation: "اگر مصدومِ تصادف خونریزیِ بیرونیِ شدید دارد، باید فوراً با وسیله‌ای تمیز، و اگر شد استریل، روی زخم فشار داد.",
      why: "درست است (قدم ۲). فشارِ مستقیم و محکم، همان اول.",
      rule: ERC,
      conceptStep: 2,
    },
    {
      sourceId: "6517",
      textIt: "Se un infortunato della strada ha un'abbondante emorragia esterna, si deve coprire la ferita e far camminare l'infortunato",
      answer: 0,
      chunks: [
        { it: EMORRAGIA, fa: EMORRAGIA_FA },
        { it: "si deve coprire la ferita", fa: "باید زخم را پوشاند", verb: "deve ← dovere" },
        { it: "e far camminare l'infortunato", fa: "و مصدوم را راه برد", focus: "contrast" },
      ],
      translation: "اگر مصدومِ تصادف خونریزیِ بیرونیِ شدید دارد، باید زخم را پوشاند و مصدوم را راه برد.",
      why: "غلط است (قدم ۲). پوشاندن درست است، راه بردن نه: بنشیند یا دراز بکشد.",
      rule: ERC,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6504", "6505", "6506", "6507", "6508", "6509", "6510", "6511"] },
    { step: 2, sourceIds: ["6512", "6513", "6514", "6515", "6516", "6517", "6518"] },
  ],
};
