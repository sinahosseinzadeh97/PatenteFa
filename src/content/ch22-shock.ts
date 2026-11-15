/**
 * src/content/ch22-shock.ts
 * Chapter 22 (Alcool, droga e primo soccorso), lessons 8–9:
 *  L8 shock: what it is, its causes (bank group 594) and its signs (587);
 *  L9 positions: a casualty in shock (588) and a chest injury (590), with the
 *     original side-view drawing `posizioni` (public/js/road.js).
 *
 * Statements not used in scored practice (tests/chapter22.test.ts):
 *  - 6578 (VERO) and 6581 (FALSO): the bank counts a strong emotion as a cause
 *    of shock. Medically, shock is acute circulatory failure (ERC 2025, after
 *    ESICM); a strong emotion can make someone faint, which is not shock.
 *  - 6550 (VERO: press a deep open chest wound with a cloth): ERC 2025 says to
 *    leave an open chest wound uncovered and press only to stop local bleeding.
 * Both are taught as discrepancies: the bank's answer for the exam, the
 * guidance for real life.
 *
 * Trust rules as in src/content/lessons.ts.
 */
import type { Lesson } from "./lessons.js";

const ERC = "European Resuscitation Council, Guidelines 2025 First Aid (Resuscitation 215, 2025, 110752)";
const NO_DRINK = "Mayo Clinic, «Shock: First aid» (non mangiare né bere; letto tramite indice di ricerca)";
const DISCLAIMER =
  "تمرینِ آموزشی است، نه سؤالِ بانک؛ موقعیتی ساده‌شده برای فهمیدنِ درس، نه دستورِ اضطراری برای موقعیتِ واقعیِ تو و نه جایگزینِ دوره‌ی عملیِ کمک‌های اولیه. در موقعیتِ واقعی با ۱۱۲ (یا ۱۱۸) تماس بگیر و از دستورهای اپراتور پیروی کن.";
const CAUSATO = "Lo stato di shock può essere causato da";
const CAUSATO_FA = "شوک ممکن است به خاطرِ … پیش بیاید:";
const SI_MANIFESTA = "Lo stato di shock si manifesta";
const SI_MANIFESTA_FA = "شوک خودش را نشان می‌دهد";
const SHOCK_FERITO = "Un ferito in stato di shock";
const SHOCK_FERITO_FA = "زخمی‌ای که در شوک است";
const TORACE = "Se un infortunato della strada";
const TORACE_FA = "اگر مصدومِ تصادف";

export const lessonShockCauseSegni: Lesson = {
  id: "shock-cause-segni",
  titleFa: "شوک: چیست، از کجا می‌آید، چطور پیدا است",
  titleIt: "LO STATO DI SHOCK: CAUSE E SEGNI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی شوک چیست (گردشِ خون دیگر به اندازه‌ی کافی به بدن نمی‌رسد و جان در خطر است)، چه چیزی آن را می‌آورد (خونریزیِ زیاد، ضربه‌ی شدید، دردِ شدید) و چطور آن را می‌شناسی: پوستِ رنگ‌پریده و سرد، عرقِ سرد، لرز، قلبِ تند، گیجی.",
      why:
        "۱۶ سؤال. جمله‌های غلط یا می‌گویند شوک «هرگز» در یک موقعیت نمی‌آید یا خطرناک نیست، یا نشانه‌هایی می‌سازند که شوک ندارد (تبِ بالا، لکه‌ی تیره، پوستِ سرخ). دو جمله درباره‌ی «احساسات» با پزشکیِ امروز فرق دارند؛ هر دو را می‌بینی.",
      rule: ERC,
    },
    {
      kind: "table",
      title: "شوک چیست و از کجا می‌آید",
      body:
        "شوک در پزشکی یعنی گردشِ خون از کار افتاده: خونِ کافی و اکسیژن به اندام‌ها نمی‌رسد. خطرناک است و ممکن است بدتر شود؛ پس هر وقت به آن شک داری، ۱۱۲ (یا ۱۱۸) را بگیر. در تصادف، این‌ها آن را می‌آورند:",
      columns: ["در بانک", "چرا"],
      rows: [
        { label: "خونریزیِ زیاد", it: "una forte perdita di sangue", values: ["درست", "خونِ کمتر یعنی گردشِ کمتر؛ شایع‌ترین علت در تصادف (درسِ ۷)"] },
        { label: "ضربه‌ی شدید", it: "un forte trauma", values: ["درست", "آسیبِ شدید، حتی بی‌خونریزیِ دیدنی، ممکن است خونریزیِ داخلی داشته باشد"] },
        { label: "دردِ شدید", it: "un forte dolore", values: ["درست", "دردِ شدید وضعِ گردشِ خون را بدتر می‌کند"] },
        { label: "«هرگز» بعد از ضربه یا خونریزی", it: "non si verifica mai", values: ["غلط", "برعکس: همین‌ها علت‌های اصلی‌اند"] },
        { label: "«خطرناک نیست»", it: "non rappresenta un pericolo", values: ["غلط", "شوک جان را تهدید می‌کند"] },
        { label: "جمله‌های مورد اختلاف", it: "una forte emozione (gioia, rabbia)", values: ["جمله‌ها", "بانک «هیجانِ شدید (شادی، خشم)» را هم علتِ شوک می‌داند: «può essere causato da una forte emozione» را VERO و «non può dipendere da forti emozioni» را FALSO گرفته. رهنمودِ امروز شوک را از کار افتادنِ گردشِ خون تعریف می‌کند؛ هیجان ممکن است آدم را از حال ببرد (غش)، ولی آن شوکِ پزشکی نیست. در امتحان جوابِ بانک را بده؛ این دو جمله در تمرین‌های امتیازیِ این دوره نمی‌آیند."] },
      ],
      takeaway: "علت‌های شوک در تصادف: خونِ ازدست‌رفته، ضربه، درد. «mai» و «non è pericoloso» غلط‌اند.",
      rule: ERC,
    },
    {
      kind: "table",
      title: "نشانه‌های شوک",
      body:
        "شوک ممکن است کمی بعد از تصادف بیاید، حتی وقتی مصدوم می‌گوید «حالم خوب است». نشانه‌هایی که بانک و رهنمودها می‌گویند:",
      columns: ["نشانه", "در بانک"],
      rows: [
        { label: "پوست", it: "pelle molto pallida e fredda", values: ["خیلی رنگ‌پریده و سرد", "درست"] },
        { label: "عرق", it: "sudore freddo alla fronte", values: ["عرقِ سرد روی پیشانی", "درست"] },
        { label: "لرز", it: "brividi", values: ["لرز، همراه با رنگ‌پریدگی و عرقِ سرد", "درست"] },
        { label: "قلب", it: "frequenti battiti del cuore", values: ["ضربانِ تند", "درست"] },
        { label: "گیجی", it: "frasi e parole senza senso", values: ["ناگهان حرف‌های بی‌معنی می‌زند، گیج یا بی‌قرار است", "درست"] },
        { label: "تبِ بالا", it: "sempre con un forte aumento della temperatura", values: ["ساختگی: شوک بدن را سرد می‌کند، نه داغ", "غلط"] },
        { label: "لکه‌ی تیره", it: "ampie macchie scure sulla pelle", values: ["ساختگی", "غلط"] },
        { label: "پوستِ سرخ و گُر گرفتن", it: "colorito rosso · vampate di calore", values: ["در شوکِ تصادف پوست رنگ‌پریده است، نه سرخ", "غلط"] },
      ],
      takeaway: "شوک: رنگ‌پریده، سرد، عرقِ سرد، لرز، قلبِ تند، گیج. هر چه «داغ» و «سرخ» و «لکه» است، غلط.",
      rule: ERC,
    },
    {
      kind: "classify",
      title: "نشانه‌ی شوک هست یا نه؟",
      body: `${DISCLAIMER} طبقِ همین درس بگو هر مورد نشانه‌ی شوک است یا نه:`,
      options: [
        { it: "segno di shock", fa: "نشانه‌ی شوک" },
        { it: "non è un segno di shock", fa: "نشانه‌ی شوک نیست" },
      ],
      items: [
        { prompt: "صورتش ناگهان خیلی سفید شده و دستش سرد است", answer: 0, explain: "رنگ‌پریدگی و پوستِ سرد: خونِ کمتری به پوست می‌رسد." },
        { prompt: "پیشانی‌اش خیس از عرقِ سرد است و می‌لرزد", answer: 0, explain: "عرقِ سرد و لرز، دو نشانه‌ی شوک در جدولِ قدمِ ۲." },
        { prompt: "تبِ بالا دارد و پوستش داغ است", answer: 1, explain: "شوکِ تصادف بدن را سرد می‌کند." },
        { prompt: "قلبش خیلی تند می‌زند", answer: 0, explain: "ضربانِ تند: قلب تند می‌زند تا کمبودِ خون را جبران کند." },
        { prompt: "جمله‌هایش بی‌ربط شده و نمی‌داند کجاست", answer: 0, explain: "گیجی؛ ممکن است مغز خونِ کافی نگیرد." },
        { prompt: "روی پوستش لکه‌های بزرگِ تیره پیدا شده", answer: 1, explain: "در بانک FALSO است؛ نشانه‌ی شوک نیست." },
      ],
      takeaway: "شک به شوک یعنی خبر کردن؛ نشانه‌ها را به اپراتور بگو.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "lo stato di shock", fa: "شوک" },
        { it: "la perdita di sangue", fa: "از دست رفتنِ خون" },
        { it: "il trauma", fa: "ضربه، آسیبِ شدید" },
        { it: "la pelle pallida", fa: "پوستِ رنگ‌پریده" },
        { it: "il sudore freddo", fa: "عرقِ سرد" },
        { it: "i brividi", fa: "لرز" },
        { it: "i battiti del cuore", fa: "ضربانِ قلب" },
        { it: "si manifesta", fa: "خود را نشان می‌دهد", base: "manifestarsi" },
      ],
    },
    {
      kind: "trap",
      title: "«perdita di sangue»: علت، یا «mai»؟",
      body: "هر دو جمله شوک را به خونِ ازدست‌رفته ربط می‌دهند. یکی آن را علت می‌داند، دیگری با «mai» ردش می‌کند:",
      examples: [
        {
          sourceId: "6579",
          textIt: "Lo stato di shock può essere causato da una forte perdita di sangue",
          answer: 1,
          chunks: [
            { it: CAUSATO, fa: CAUSATO_FA, verb: "può ← potere" },
            { it: "una forte perdita di sangue", fa: "از دست رفتنِ زیادِ خون" },
          ],
          translation: "شوک ممکن است به خاطرِ از دست رفتنِ زیادِ خون پیش بیاید.",
          why: "درست است. شایع‌ترین علت در تصادف.",
        },
        {
          sourceId: "6583",
          textIt: "Lo stato di shock non si verifica mai nelle persone che hanno perso molto sangue",
          answer: 0,
          chunks: [
            { it: "Lo stato di shock non si verifica mai", fa: "شوک هرگز پیش نمی‌آید", verb: "si verifica ← verificarsi", focus: "always" },
            { it: "nelle persone che hanno perso molto sangue", fa: "در کسانی که خونِ زیادی از دست داده‌اند" },
          ],
          translation: "شوک هرگز در کسانی که خونِ زیادی از دست داده‌اند پیش نمی‌آید.",
          why: "غلط است. برعکس: خونریزیِ زیاد علتِ اصلیِ شوک است.",
        },
      ],
      takeaway: "«non … mai» در جمله‌های شوک تقریباً همیشه غلط است.",
      rule: ERC,
    },
  ],
  practice: [
    {
      sourceId: "6577",
      textIt: "Lo stato di shock può essere causato da un forte dolore",
      answer: 1,
      chunks: [
        { it: CAUSATO, fa: CAUSATO_FA, verb: "può ← potere" },
        { it: "un forte dolore", fa: "دردِ شدید" },
      ],
      translation: "شوک ممکن است به خاطرِ دردِ شدید پیش بیاید.",
      why: "درست است (قدم ۱). دردِ شدید یکی از علت‌هاست.",
      rule: ERC,
      conceptStep: 1,
    },
    {
      sourceId: "6584",
      textIt: "Lo stato di shock non rappresenta un pericolo per la salute",
      answer: 0,
      chunks: [
        { it: "Lo stato di shock", fa: "شوک" },
        { it: "non rappresenta un pericolo per la salute", fa: "خطری برای سلامت نیست", verb: "rappresenta ← rappresentare", focus: "negation" },
      ],
      translation: "شوک خطری برای سلامت نیست.",
      why: "غلط است (قدم ۱). شوک جان را تهدید می‌کند؛ خبر کن.",
      rule: ERC,
      conceptStep: 1,
    },
    {
      sourceId: "6529",
      textIt: "Lo stato di shock si manifesta con pelle molto pallida, sudorazione fredda, frequenti battiti del cuore",
      answer: 1,
      chunks: [
        { it: SI_MANIFESTA, fa: SI_MANIFESTA_FA, verb: "si manifesta ← manifestarsi" },
        { it: "con pelle molto pallida, sudorazione fredda, frequenti battiti del cuore", fa: "با پوستِ خیلی رنگ‌پریده، عرقِ سرد و ضربانِ تندِ قلب" },
      ],
      translation: "شوک با پوستِ خیلی رنگ‌پریده، عرقِ سرد و ضربانِ تندِ قلب خودش را نشان می‌دهد.",
      why: "درست است (قدم ۲). سه نشانه‌ی اصلی.",
      rule: ERC,
      conceptStep: 2,
    },
    {
      sourceId: "6531",
      textIt: "Lo stato di shock si manifesta sempre con un forte aumento della temperatura corporea",
      answer: 0,
      chunks: [
        { it: SI_MANIFESTA, fa: SI_MANIFESTA_FA, verb: "si manifesta ← manifestarsi" },
        { it: "sempre con un forte aumento della temperatura corporea", fa: "همیشه با بالا رفتنِ شدیدِ دمای بدن", focus: "always" },
      ],
      translation: "شوک همیشه با بالا رفتنِ شدیدِ دمای بدن خودش را نشان می‌دهد.",
      why: "غلط است (قدم ۲). شوک بدن را سرد می‌کند؛ «sempre» هم نشانه‌ی جمله‌ی ساختگی است.",
      rule: ERC,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6577", "6578", "6579", "6580", "6581", "6582", "6583", "6584"] },
    { step: 2, sourceIds: ["6526", "6527", "6528", "6529", "6530", "6531", "6532", "6533"] },
  ],
};

export const lessonPosizioniShockTorace: Lesson = {
  id: "posizioni-shock-torace",
  titleFa: "چطور بخوابانی: شوک و آسیبِ قفسه‌ی سینه",
  titleIt: "POSIZIONI: SHOCK E TRAUMA TORACICO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی مصدومِ در شوک را دراز می‌کنی و گرم نگه می‌داری (پاها کمی بالا، فقط اگر آسیبی مانع نیست)، و مصدومِ هوشیار با آسیبِ قفسه‌ی سینه را نیمه‌نشسته می‌کنی تا راحت‌تر نفس بکشد. یک جمله‌ی بانک درباره‌ی زخمِ بازِ قفسه‌ی سینه با رهنمودِ امروز فرق دارد.",
      why:
        "۱۳ سؤال. کلید این است که وضعیتِ درست را با مشکل جفت کنی: شوک ← دراز؛ قفسه‌ی سینه و هوشیار ← نیمه‌نشسته. جمله‌های غلط جای این دو را عوض می‌کنند یا کاری می‌گویند که بدتر می‌کند: راه بردن، سیلی، نفسِ عمیق، الکل.",
      rule: ERC,
    },
    {
      kind: "table",
      title: "مصدومِ در شوک",
      body:
        "شورای احیای اروپا (۲۰۲۵): مصدومِ در شوک را به پشت دراز کن و مدام حالش را ببین. بالا بردنِ پاها کمکِ کوتاه و موقتی است؛ وقتی آسیبی در پاها، لگن یا ستونِ مهره‌ها نیست و درد نمی‌آورد. بانک همین را با «se possibile» و «possibilmente» می‌گوید:",
      columns: ["در بانک", "چه کنی"],
      rows: [
        { label: "روی زمین، دراز", it: "messo a terra · disteso", values: ["درست", "به پشت دراز کن"] },
        { label: "پاها بالا، اگر می‌شود", it: "le gambe sollevate, se possibile", values: ["درست", "فقط اگر پا، لگن یا ستونِ مهره آسیب ندیده و دردی نمی‌آورد؛ وگرنه صاف دراز بماند"] },
        { label: "گرم نگه دار", it: "coperto per evitare che si raffreddi", values: ["درست", "با پتو یا کاپشن بپوشان؛ زیرِ بدن هم اگر بی‌حرکت دادنش ممکن است"] },
        { label: "راه بردن", it: "farlo camminare", values: ["غلط", "گردشِ خون با راه رفتن «فعال» نمی‌شود؛ ممکن است از حال برود"] },
        { label: "نشاندن", it: "in posizione seduta", values: ["غلط", "در شوک دراز، نه نشسته"] },
        { label: "سیلی زدن", it: "piccoli schiaffi", values: ["غلط", "کمکی نمی‌کند و ممکن است آسیب بزند"] },
        { label: "الکلِ قوی", it: "superalcolici", values: ["غلط", "هیچ نوشیدنی نده؛ نه الکل، نه آب (درسِ ۷)"] },
      ],
      takeaway: "شوک: دراز، گرم، پاها کمی بالا اگر آسیبی مانع نیست، بی‌نوشیدنی، و خبر کن.",
      rule: `${ERC}; ${NO_DRINK}`,
    },
    {
      kind: "table",
      title: "آسیبِ قفسه‌ی سینه",
      body:
        "ضربه به قفسه‌ی سینه (فرمان، کمربند، برخورد) نفس کشیدن را سخت می‌کند. مصدومِ هوشیار معمولاً خودش وضعیتی را پیدا می‌کند که راحت‌تر نفس بکشد؛ اغلب نیمه‌نشسته:",
      columns: ["چه کنی"],
      rows: [
        { label: "هوشیار: نیمه‌نشسته", it: "semi-seduto per facilitargli la respirazione", values: ["کمکش کن نیمه‌نشسته باشد، با تکیه به پشت. هرگز به زور در وضعیتی نگذار که نمی‌خواهد."] },
        { label: "کنارش بمان", it: "assisterlo fino all'arrivo del soccorso medico", values: ["تا رسیدنِ امداد بمان، تنفسش را ببین و به اپراتور بگو."] },
        { label: "نفسِ عمیق نه", it: "fargli fare profondi respiri", values: ["غلط: نفسِ عمیق با دنده‌ی آسیب‌دیده درد و آسیب را بیشتر می‌کند."] },
        { label: "دراز با پاهای بالا نه", it: "distesa, con le gambe sollevate", values: ["غلط: این وضعیتِ شوک است و نفس کشیدن با آسیبِ قفسه‌ی سینه را سخت‌تر می‌کند."] },
        { label: "سرِ پا نه", it: "farlo stare alzato", values: ["غلط: ایستادن خونریزی را کم نمی‌کند و ممکن است بیفتد."] },
        { label: "جمله‌ی مورد اختلاف", it: "ferita visibile e profonda, comprimere subito con un panno pulito", values: ["جمله‌ی بانک: «با زخمِ دیدنی و عمیقِ قفسه‌ی سینه، فوراً با پارچه‌ی تمیز فشار بده.» جوابِ بانک: VERO. رهنمودِ امروز (شورای احیای اروپا، ۲۰۲۵): زخمِ بازِ قفسه‌ی سینه را باز بگذار، نپوشان و نبند؛ فقط اگر لازم است برای بند آوردنِ خونریزی دورش را فشار بده، و به اپراتور بگو. در امتحان جوابِ بانک VERO است؛ در واقعیت زخم را نبند. این جمله در تمرین‌های امتیازیِ این دوره نمی‌آید."] },
      ],
      takeaway: "قفسه‌ی سینه و هوشیار: نیمه‌نشسته، کنارش بمان. نه نفسِ عمیق، نه پاها بالا، نه سرِ پا.",
      rule: ERC,
    },
    {
      kind: "anatomy",
      title: "سه وضعیت کنارِ هم",
      scene: "posizioni",
      body: "سه وضعیتِ این فصل را مقایسه کن. روی هر کدام بزن تا ببینی برای کیست. تصویرِ ساده است، نه آموزشِ عملی:",
      parts: [
        { id: "gambe", nameIt: "disteso, gambe sollevate", nameFa: "دراز، پاها کمی بالا", text: "مصدومِ در شوک (درسِ ۸)، وقتی پا، لگن و ستونِ مهره آسیب ندیده‌اند. گرم نگه دار و خبر کن." },
        { id: "semiseduto", nameIt: "posizione semiseduta", nameFa: "نیمه‌نشسته", text: "مصدومِ هوشیار با آسیبِ قفسه‌ی سینه که به‌سختی نفس می‌کشد. هرگز برای بیهوش (درسِ ۶)." },
        { id: "fermo", nameIt: "disteso, senza muoverlo", nameFa: "دراز، بی‌حرکت", text: "مصدومِ بیهوشِ تصادف، یا هر کسی که ممکن است آسیبِ ستونِ مهره داشته باشد: جابه‌جا نکن، مگر خطرِ فوری؛ تنفس را بپا (درسِ ۶)." },
      ],
      takeaway: "شوک ← دراز و پاها بالا اگر می‌شود. قفسه‌ی سینه و هوشیار ← نیمه‌نشسته. بیهوش یا ستونِ مهره ← بی‌حرکت.",
      rule: ERC,
    },
    {
      kind: "classify",
      title: "کدام وضعیت؟",
      body: `${DISCLAIMER} برای هر مصدوم بگو کدام وضعیتِ این درس مناسب است:`,
      options: [
        { it: "disteso, gambe sollevate", fa: "دراز، پاها کمی بالا" },
        { it: "semiseduto", fa: "نیمه‌نشسته" },
        { it: "non muoverlo", fa: "جابه‌جا نکن" },
      ],
      items: [
        { prompt: "عابری بعد از خونریزی از دست، رنگ‌پریده و با عرقِ سرد روی زمین نشسته؛ پاهایش سالم‌اند", answer: 0, explain: "نشانه‌های شوک، بی‌آسیبِ پا: دراز، پاها کمی بالا، گرم." },
        { prompt: "راننده‌ای هوشیار بعد از برخوردِ سینه با فرمان، به‌سختی نفس می‌کشد", answer: 1, explain: "آسیبِ قفسه‌ی سینه و هوشیار: نیمه‌نشسته." },
        { prompt: "موتورسواری روی جاده افتاده، جواب نمی‌دهد و نفس می‌کشد؛ خطری از ترافیک نیست", answer: 2, explain: "بیهوش و احتمالِ آسیبِ ستونِ مهره: بی‌حرکت، تنفس را بپا، اپراتور." },
        { prompt: "سرنشینی هوشیار از دردِ قفسه‌ی سینه می‌نالد و می‌خواهد کمی بنشیند", answer: 1, explain: "اگر خودش راحت‌تر است، نیمه‌نشسته؛ به زور دراز نکن." },
        { prompt: "رهگذری بعد از تصادف رنگ‌پریده و لرزان است، قلبش تند می‌زند، آسیبی در پا ندارد", answer: 0, explain: "نشانه‌های شوک: دراز و گرم؛ پاها کمی بالا." },
      ],
      takeaway: "اول مشکل را بشناس، بعد وضعیت را: شوک، قفسه‌ی سینه، یا بیهوش.",
      rule: ERC,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "disteso", fa: "دراز کشیده" },
        { it: "le gambe sollevate", fa: "پاهای بالا آمده" },
        { it: "la posizione seduta", fa: "نشسته" },
        { it: "semi-seduto", fa: "نیمه‌نشسته" },
        { it: "coprire", fa: "پوشاندن (گرم نگه داشتن)" },
        { it: "raffreddarsi", fa: "سرد شدن" },
        { it: "la gabbia toracica", fa: "قفسه‌ی سینه" },
        { it: "la respirazione", fa: "تنفس" },
        { it: "gli schiaffi", fa: "سیلی" },
      ],
    },
    {
      kind: "trap",
      title: "«disteso» یا «seduto»؟",
      body: "هر دو جمله درباره‌ی وضعیتِ زخمیِ در شوک‌اند. یکی درست است، دیگری وضعیتِ قفسه‌ی سینه را جای آن گذاشته:",
      examples: [
        {
          sourceId: "6536",
          textIt: "Un ferito in stato di shock va disteso, tenendo possibilmente le gambe sollevate",
          answer: 1,
          chunks: [
            { it: SHOCK_FERITO, fa: SHOCK_FERITO_FA },
            { it: "va disteso,", fa: "باید دراز شود،", verb: "va ← andare" },
            { it: "tenendo possibilmente le gambe sollevate", fa: "و اگر شد پاهایش بالا نگه داشته شود", verb: "tenendo ← tenere", focus: "condition" },
          ],
          translation: "زخمی‌ای که در شوک است باید دراز شود و اگر شد پاهایش بالا نگه داشته شود.",
          why: "درست است. «possibilmente»: فقط اگر آسیبی در پا، لگن یا ستونِ مهره نیست.",
        },
        {
          sourceId: "6538",
          textIt: "Un ferito in stato di shock va messo in posizione seduta",
          answer: 0,
          chunks: [
            { it: SHOCK_FERITO, fa: SHOCK_FERITO_FA },
            { it: "va messo in posizione seduta", fa: "باید نشانده شود", verb: "va ← andare", focus: "contrast" },
          ],
          translation: "زخمی‌ای که در شوک است باید نشانده شود.",
          why: "غلط است. شوک ← دراز. نشستن (نیمه‌نشسته) برای آسیبِ قفسه‌ی سینه است.",
        },
      ],
      takeaway: "va disteso + shock = VERO؛ seduta + shock = FALSO. semi-seduto + gabbia toracica + cosciente = VERO.",
      rule: ERC,
    },
  ],
  practice: [
    {
      sourceId: "6535",
      textIt: "Un ferito in stato di shock va coperto come meglio possibile, per evitare che si raffreddi",
      answer: 1,
      chunks: [
        { it: SHOCK_FERITO, fa: SHOCK_FERITO_FA },
        { it: "va coperto come meglio possibile,", fa: "باید تا جای ممکن پوشانده شود،", verb: "va ← andare" },
        { it: "per evitare che si raffreddi", fa: "تا سرد نشود", verb: "si raffreddi ← raffreddarsi", focus: "reason" },
      ],
      translation: "زخمی‌ای که در شوک است باید تا جای ممکن پوشانده شود تا سرد نشود.",
      why: "درست است (قدم ۱). گرم نگه داشتن بخشی از کمک به شوک است.",
      rule: ERC,
      conceptStep: 1,
    },
    {
      sourceId: "6537",
      textIt: "In presenza di un ferito in stato di shock, occorre farlo camminare, per riattivargli la circolazione del sangue",
      answer: 0,
      chunks: [
        { it: "In presenza di un ferito in stato di shock,", fa: "وقتی زخمی در شوک است،" },
        { it: "occorre farlo camminare,", fa: "باید او را راه برد،", verb: "occorre ← occorrere", focus: "contrast" },
        { it: "per riattivargli la circolazione del sangue", fa: "تا گردشِ خونش دوباره راه بیفتد", focus: "reason" },
      ],
      translation: "وقتی زخمی در شوک است، باید او را راه برد تا گردشِ خونش دوباره راه بیفتد.",
      why: "غلط است (قدم ۱). شوک ← دراز؛ راه رفتن ممکن است او را از حال ببرد.",
      rule: ERC,
      conceptStep: 1,
    },
    {
      sourceId: "6549",
      textIt: "Se un infortunato della strada è cosciente, ma ha avuto un trauma della gabbia toracica, bisogna cercare di facilitargli la respirazione mettendolo semi-seduto",
      answer: 1,
      chunks: [
        { it: `${TORACE} è cosciente,`, fa: `${TORACE_FA} هوشیار است،` },
        { it: "ma ha avuto un trauma della gabbia toracica,", fa: "ولی قفسه‌ی سینه‌اش ضربه خورده،", focus: "condition" },
        { it: "bisogna cercare di facilitargli la respirazione mettendolo semi-seduto", fa: "باید با نیمه‌نشسته کردنش نفس کشیدن را برایش آسان کرد", verb: "bisogna ← bisognare" },
      ],
      translation: "اگر مصدومِ تصادف هوشیار است ولی قفسه‌ی سینه‌اش ضربه خورده، باید با نیمه‌نشسته کردنش نفس کشیدن را برایش آسان کرد.",
      why: "درست است (قدم ۲). قفسه‌ی سینه و هوشیار ← نیمه‌نشسته.",
      rule: ERC,
      conceptStep: 2,
    },
    {
      sourceId: "6553",
      textIt: "Se un infortunato della strada ha avuto un trauma della gabbia toracica, bisogna metterlo in posizione distesa, con le gambe sollevate",
      answer: 0,
      chunks: [
        { it: `${TORACE} ha avuto un trauma della gabbia toracica,`, fa: `${TORACE_FA} قفسه‌ی سینه‌اش ضربه خورده،` },
        { it: "bisogna metterlo in posizione distesa, con le gambe sollevate", fa: "باید او را دراز کرد و پاهایش را بالا برد", verb: "bisogna ← bisognare", focus: "contrast" },
      ],
      translation: "اگر قفسه‌ی سینه‌ی مصدومِ تصادف ضربه خورده، باید او را دراز کرد و پاهایش را بالا برد.",
      why: "غلط است (قدم ۲). این وضعیتِ شوک است؛ با آسیبِ قفسه‌ی سینه نفس کشیدن را سخت‌تر می‌کند.",
      rule: ERC,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6534", "6535", "6536", "6537", "6538", "6539", "6540"] },
    { step: 2, sourceIds: ["6549", "6550", "6551", "6552", "6553", "6554"] },
  ],
};
