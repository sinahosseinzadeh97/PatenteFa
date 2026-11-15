/**
 * src/content/ch22-traumi.ts
 * Chapter 22 (Alcool, droga e primo soccorso), lessons 10–11:
 *  L10 broken limbs (bank group 591) and something in the eye (586): the shared
 *      rule is "do not move, do not remove";
 *  L11 burns (592).
 *
 * ERC 2025 dropped burns, fracture straightening and chemical eye injuries from
 * its scope, so these lessons use NHS guidance (burns rev. 31/03/2026, broken
 * arm rev. 02/10/2026, eye injuries rev. 12/03/2026). No bank statement in these
 * groups conflicts with it; where current guidance adds something the bank does
 * not ask (rinsing dust or chemicals out of an eye, 20 minutes of cool water, no
 * ice), the lesson says so as context.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter22.test.ts.
 */
import type { Lesson } from "./lessons.js";

const NHS_FRATTURA = "NHS, «Broken arm or wrist» (rev. 02/10/2026)";
const NHS_OCCHIO = "NHS, «Eye injuries» (rev. 12/03/2026)";
const NHS_USTIONI = "NHS, «Burns and scalds» (rev. 31/03/2026)";
const DISCLAIMER =
  "تمرینِ آموزشی است، نه سؤالِ بانک؛ موقعیتی ساده‌شده برای فهمیدنِ درس، نه دستورِ اضطراری برای موقعیتِ واقعیِ تو و نه جایگزینِ دوره‌ی عملیِ کمک‌های اولیه. در موقعیتِ واقعی با ۱۱۲ (یا ۱۱۸) تماس بگیر و از دستورهای اپراتور پیروی کن.";
const ACTIONS = [
  { it: "fallo", fa: "انجامش بده" },
  { it: "non è richiesto", fa: "لازم نیست" },
  { it: "non farlo", fa: "نکن" },
];
const FRATTURE = "Se un infortunato della strada ha riportato fratture agli arti";
const FRATTURE_FA = "اگر دست یا پای مصدومِ تصادف شکسته";
const OCCHIO = "Se ad un infortunato della strada è entrato un corpo estraneo in un occhio,";
const OCCHIO_FA = "اگر جسمی خارجی در چشمِ مصدومِ تصادف رفته،";
const USTIONATO = "Se un ferito della strada si è ustionato";
const USTIONATO_FA = "اگر زخمیِ تصادف دچارِ سوختگی شده";

export const lessonFrattureOcchio: Lesson = {
  id: "fratture-occhio",
  titleFa: "شکستگیِ دست و پا؛ جسمی در چشم",
  titleIt: "FRATTURE AGLI ARTI E CORPO ESTRANEO NELL'OCCHIO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی با دست یا پای شکسته و با جسمی که در چشم رفته چه کنی. هر دو یک قاعده دارند: تکان نده و بیرون نکش. عضوِ شکسته را همان‌طور که هست بی‌حرکت نگه دار؛ چشم را دست نزن و آرام بپوشان تا متخصص برسد.",
      why:
        "۱۵ سؤال. جمله‌های غلط تقریباً همه یک کارِ «فعال» پیشنهاد می‌کنند: راه بردن، تکان دادن، برگرداندنِ استخوان، بیرون آوردنِ جسم، باز نگه داشتنِ چشم، مالیدنِ پلک. کمک‌رسانِ آموزش‌ندیده هیچ‌کدام را نمی‌کند.",
      rule: `${NHS_FRATTURA}; ${NHS_OCCHIO}`,
    },
    {
      kind: "table",
      title: "دست یا پای شکسته",
      body:
        "«bloccare» در جمله‌های بانک یعنی بی‌حرکت نگه داشتن، همان‌طور که هست؛ نه صاف کردن و نه آتل بستنِ حرفه‌ای. رهنمودهای امروز می‌گویند عضوِ کج را صاف نکن، و تا امداد برسد چیزی نخورد و ننوشد، چون ممکن است عمل لازم شود.",
      columns: ["در بانک", "چه کنی"],
      rows: [
        { label: "تکان نده", it: "non bisogna muovere gli arti fratturati", values: ["درست", "عضوِ شکسته را جابه‌جا نکن"] },
        { label: "بی‌حرکت نگه دار", it: "bloccarglieli, senza procedere ad altre manovre", values: ["درست", "همان‌طور که هست با دست یا لباسِ تاشده نگهش دار؛ کارِ دیگری نکن"] },
        { label: "زخم را بپوشان", it: "coprire le eventuali ferite con materiale pulito", values: ["درست", "اگر روی شکستگی زخم هست، با وسیله‌ی تمیز بپوشان"] },
        { label: "بعد، شوک", it: "le normali misure anti-shock", values: ["درست", "دراز، گرم، خبر کن (درسِ ۹)؛ ولی پای شکسته را بالا نبر"] },
        { label: "راه بردن", it: "farlo camminare", values: ["غلط", "درد را کم نمی‌کند و آسیب را بیشتر می‌کند"] },
        { label: "خواستنِ تکان دادن", it: "chiedergli di muoverli", values: ["غلط", "تشخیص کارِ پزشک است، نه آزمایشِ تو"] },
        { label: "برگرداندنِ استخوانِ بیرون‌زده", it: "riposizionarlo nei tessuti", values: ["غلط", "هرگز؛ زخم را آرام بپوشان و خبر کن"] },
        { label: "الکلِ قوی", it: "bevanda superalcolica", values: ["غلط", "هیچ نوشیدنی‌ای نده"] },
      ],
      takeaway: "شکستگی: تکان نده، صاف نکن، بپوشان، بعد شوک. نه راه رفتن، نه نوشیدنی.",
      rule: NHS_FRATTURA,
    },
    {
      kind: "table",
      title: "جسمی در چشم",
      body:
        "بانک درباره‌ی تکه‌ی شیشه، چوب یا چیزِ مشابه می‌پرسد: چیزی که ممکن است در چشم فرو رفته باشد. رهنمودِ امروز هم همین را می‌گوید: جسمی را که در چشم فرو رفته بیرون نیاور و چشم را نمال. (برای گرد و خاکِ معمولی، شستن با آبِ تمیز و برای مواد شیمیایی شستنِ طولانی با آبِ زیاد توصیه می‌شود؛ بانک این دو را نمی‌پرسد.)",
      columns: ["در بانک", "چه کنی"],
      rows: [
        { label: "آرام بپوشان", it: "bendarglielo, senza procedere ad altre manovre", values: ["درست", "چشم را بی‌فشار بپوشان و کارِ دیگری نکن"] },
        { label: "دست نزن", it: "non toccare l'occhio danneggiato", values: ["درست", "به او بگو چشمش را لمس نکند و نمالد"] },
        { label: "تا متخصص", it: "fino all'intervento dello specialista", values: ["درست", "پوشیده بماند تا پزشک ببیند؛ خبر کن"] },
        { label: "همیشه بیرون آوردن", it: "cercare sempre e comunque di toglierglielo", values: ["غلط", "بیرون آوردنِ جسم چشم را بیشتر زخم می‌کند"] },
        { label: "باز نگه داشتن به زور", it: "costringerlo a tenere gli occhi aperti", values: ["غلط", "حرکتِ چشم و پلک آسیب را بیشتر می‌کند"] },
        { label: "مالیدنِ پلک", it: "massaggiargli delicatamente la palpebra", values: ["غلط", "حتی «آرام» هم جسم را جابه‌جا می‌کند"] },
        { label: "«هرگز نپوشان»", it: "non bisogna mai bendargli l'occhio ferito", values: ["غلط", "پوشاندنِ آرام کارِ درست است"] },
      ],
      takeaway: "جسم در چشم: دست نزن، نمال، بیرون نیاور، آرام بپوشان، خبر کن.",
      rule: NHS_OCCHIO,
    },
    {
      kind: "classify",
      title: "حالا چه کنی؟ پا و چشم",
      body: `${DISCLAIMER} بیرونِ آبادی، روز. دو خودرو با سرعتِ کم به هم خورده‌اند و صحنه امن است. یک سرنشین روی شانه‌ی جاده نشسته؛ ساقِ پایش کج مانده و درد دارد. دیگری می‌گوید تکه‌ی کوچکی از شیشه‌ی شکسته در چشمش رفته. امداد خبر شده و در راه است. برای هر کار بگو:`,
      options: ACTIONS,
      items: [
        { prompt: "پای کج را همان‌طور که هست با یک کاپشنِ تاشده از دو طرف بی‌حرکت نگه می‌داری", answer: 0, explain: "بی‌حرکت، همان‌طور که هست." },
        { prompt: "پا را آرام صاف می‌کنی تا بهتر شود", answer: 2, explain: "صاف کردن کارِ امدادگرِ آموزش‌دیده است؛ آسیب را بیشتر می‌کند." },
        { prompt: "از او می‌خواهی چند قدم راه برود تا ببینید شکسته یا نه", answer: 2, explain: "تشخیص کارِ پزشک است؛ راه رفتن آسیب را بیشتر می‌کند." },
        { prompt: "او را با کاپشن گرم نگه می‌داری و حالش را می‌بینی", answer: 0, explain: "اقدامِ ضدِ شوک، بی‌آنکه پای شکسته را بالا ببری." },
        { prompt: "به نفرِ دوم می‌گویی چشمش را نمالد و آن را آرام با گازِ تمیز می‌پوشانی", answer: 0, explain: "دست نزن، نمال، آرام بپوشان." },
        { prompt: "با گوشه‌ی دستمال سعی می‌کنی تکه‌ی شیشه را بیرون بیاوری", answer: 2, explain: "بیرون آوردن چشم را بیشتر زخم می‌کند." },
        { prompt: "دوباره به ۱۱۲ زنگ می‌زنی تا بپرسی امداد کِی می‌رسد", answer: 1, explain: "امداد خبر شده و در راه است؛ اگر حالِ کسی بدتر شد، دوباره زنگ بزن." },
      ],
      takeaway: "پای کج: نگه دار، صاف نکن، گرم کن. چشم: نمال، بیرون نیاور، بپوشان.",
      rule: `${NHS_FRATTURA}; ${NHS_OCCHIO}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "le fratture", fa: "شکستگی‌ها" },
        { it: "gli arti", fa: "دست و پا (اندام‌ها)" },
        { it: "bloccare", fa: "بی‌حرکت نگه داشتن" },
        { it: "la fuoriuscita di un osso", fa: "بیرون زدنِ استخوان" },
        { it: "le misure anti-shock", fa: "اقدام‌های ضدِ شوک" },
        { it: "il corpo estraneo", fa: "جسمِ خارجی" },
        { it: "bendare", fa: "پوشاندن (با باند یا گاز)" },
        { it: "la palpebra", fa: "پلک" },
        { it: "lo specialista", fa: "پزشکِ متخصص" },
      ],
    },
    {
      kind: "trap",
      title: "«muovere»: نه، یا «chiedergli di muoverli»؟",
      body: "هر دو جمله درباره‌ی تکان دادنِ عضوِ شکسته‌اند. یکی می‌گوید نکن، دیگری آن را راهِ تشخیص جا می‌زند:",
      examples: [
        {
          sourceId: "6555",
          textIt: "Se un infortunato della strada ha riportato fratture agli arti non bisogna muovere gli arti fratturati",
          answer: 1,
          chunks: [
            { it: FRATTURE, fa: FRATTURE_FA },
            { it: "non bisogna muovere gli arti fratturati", fa: "نباید عضوِ شکسته را تکان داد", verb: "bisogna ← bisognare", focus: "negation" },
          ],
          translation: "اگر دست یا پای مصدومِ تصادف شکسته، نباید عضوِ شکسته را تکان داد.",
          why: "درست است. بی‌حرکت، همان‌طور که هست.",
        },
        {
          sourceId: "6560",
          textIt: "Se un infortunato della strada ha riportato fratture agli arti, bisogna chiedergli di muoverli, per valutare il tipo di lesione",
          answer: 0,
          chunks: [
            { it: `${FRATTURE},`, fa: `${FRATTURE_FA}،` },
            { it: "bisogna chiedergli di muoverli,", fa: "باید از او خواست آن‌ها را تکان دهد،", verb: "bisogna ← bisognare", focus: "contrast" },
            { it: "per valutare il tipo di lesione", fa: "تا نوعِ آسیب سنجیده شود", focus: "reason" },
          ],
          translation: "اگر دست یا پای مصدومِ تصادف شکسته، باید از او خواست آن‌ها را تکان دهد تا نوعِ آسیب سنجیده شود.",
          why: "غلط است. سنجیدنِ آسیب کارِ پزشک است؛ تکان دادن آن را بدتر می‌کند.",
        },
      ],
      takeaway: "در شکستگی و چشم، هر جمله‌ای که کاری «فعال» برای دیدن یا درست کردن پیشنهاد کند، غلط است.",
      rule: NHS_FRATTURA,
    },
  ],
  practice: [
    {
      sourceId: "6557",
      textIt: "Se un infortunato della strada ha riportato fratture agli arti, bisogna coprire le eventuali ferite con materiale pulito",
      answer: 1,
      chunks: [
        { it: `${FRATTURE},`, fa: `${FRATTURE_FA}،` },
        { it: "bisogna coprire le eventuali ferite con materiale pulito", fa: "باید زخم‌های احتمالی را با وسیله‌ی تمیز پوشاند", verb: "bisogna ← bisognare" },
      ],
      translation: "اگر دست یا پای مصدومِ تصادف شکسته، باید زخم‌های احتمالی را با وسیله‌ی تمیز پوشاند.",
      why: "درست است (قدم ۱). زخمِ روی شکستگی را تمیز بپوشان.",
      rule: NHS_FRATTURA,
      conceptStep: 1,
    },
    {
      sourceId: "6561",
      textIt: "Se un infortunato della strada ha riportato fratture agli arti, con fuoriuscita di un osso, bisogna cercare di riposizionarlo nei tessuti",
      answer: 0,
      chunks: [
        { it: `${FRATTURE},`, fa: `${FRATTURE_FA}،` },
        { it: "con fuoriuscita di un osso,", fa: "و استخوانی بیرون زده،", focus: "condition" },
        { it: "bisogna cercare di riposizionarlo nei tessuti", fa: "باید سعی کرد آن را به درونِ بافت برگرداند", verb: "bisogna ← bisognare", focus: "contrast" },
      ],
      translation: "اگر دست یا پای مصدومِ تصادف شکسته و استخوانی بیرون زده، باید سعی کرد آن را به درونِ بافت برگرداند.",
      why: "غلط است (قدم ۱). هرگز؛ آرام بپوشان و خبر کن.",
      rule: NHS_FRATTURA,
      conceptStep: 1,
    },
    {
      sourceId: "6520",
      textIt: "Se ad un infortunato della strada è entrato un corpo estraneo in un occhio, bisogna consigliargli di non toccare l'occhio danneggiato, per evitare danni maggiori",
      answer: 1,
      chunks: [
        { it: OCCHIO, fa: OCCHIO_FA },
        { it: "bisogna consigliargli di non toccare l'occhio danneggiato,", fa: "باید به او گفت به چشمِ آسیب‌دیده دست نزند،", verb: "bisogna ← bisognare" },
        { it: "per evitare danni maggiori", fa: "تا آسیب بیشتر نشود", focus: "reason" },
      ],
      translation: "اگر جسمی خارجی در چشمِ مصدومِ تصادف رفته، باید به او گفت به چشمِ آسیب‌دیده دست نزند تا آسیب بیشتر نشود.",
      why: "درست است (قدم ۲). دست زدن و مالیدن جسم را جابه‌جا می‌کند.",
      rule: NHS_OCCHIO,
      conceptStep: 2,
    },
    {
      sourceId: "6522",
      textIt: "Se ad un infortunato della strada è entrato un corpo estraneo in un occhio, bisogna cercare sempre e comunque di toglierglielo",
      answer: 0,
      chunks: [
        { it: OCCHIO, fa: OCCHIO_FA },
        { it: "bisogna cercare sempre e comunque di toglierglielo", fa: "باید همیشه و در هر حال سعی کرد آن را بیرون آورد", verb: "bisogna ← bisognare", focus: "always" },
      ],
      translation: "اگر جسمی خارجی در چشمِ مصدومِ تصادف رفته، باید همیشه و در هر حال سعی کرد آن را بیرون آورد.",
      why: "غلط است (قدم ۲). جسمِ فرورفته را بیرون نمی‌آوری؛ «sempre e comunque» نشانه‌ی جمله‌ی ساختگی است.",
      rule: NHS_OCCHIO,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6555", "6556", "6557", "6558", "6559", "6560", "6561", "6562"] },
    { step: 2, sourceIds: ["6519", "6520", "6521", "6522", "6523", "6524", "6525"] },
  ],
};

export const lessonUstioni: Lesson = {
  id: "ustioni",
  titleFa: "سوختگی",
  titleIt: "FERITO USTIONATO",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی با سوختگیِ بعد از تصادف چه کنی: شعله را با پتو خفه کن، با آبِ خنک سرد کن، لباسِ چسبیده را نکن، با وسیله‌ی تمیز بپوشان، و خبر کن. و می‌دانی الکل و پماد روی سوختگی جایی ندارند.",
      why:
        "۷ سؤال. هر سه جمله‌ی غلط کاری را برعکس می‌گویند: صبر برای خاموش شدنِ خودبه‌خودِ شعله، کندنِ لباسِ چسبیده، ضدعفونی با الکل.",
      rule: NHS_USTIONI,
    },
    {
      kind: "table",
      title: "قدم‌به‌قدم با سوختگی",
      body:
        "رهنمودهای امروز (NHS، ۲۰۲۶): هر چه زودتر، بیست دقیقه زیرِ آبِ خنکِ روان؛ نه یخ، نه کِرِم، نه کره. سوختگیِ بزرگ، عمیق، روی صورت، یا ناشی از مواد شیمیایی یا برق یعنی ۱۱۲ (یا ۱۱۸). خودت را هم نسوزان: اگر آتش هنوز در خودرو هست، اول ایمنی (فصلِ ۲۱).",
      columns: ["در بانک", "چه کنی"],
      rows: [
        { label: "شعله را خفه کن", it: "spegnerle, soffocandole, con una coperta", values: ["درست", "با پتو یا پارچه‌ی کلفت (نه پلاستیکی) بپوشان تا شعله خاموش شود؛ صبر نکن"] },
        { label: "سرد کن", it: "fare uso di acqua fredda", values: ["درست", "آبِ خنکِ روان، حدودِ بیست دقیقه؛ درد را کم می‌کند و آسیب را محدود. یخ نه. بقیه‌ی بدن را گرم نگه دار"] },
        { label: "لباسِ چسبیده بماند", it: "non togliere i vestiti attaccati alla pelle", values: ["درست", "آنچه به پوست چسبیده را نکن؛ انگشتر، ساعت و لباسِ نچسبیده‌ی نزدیکِ سوختگی را پیش از ورم بیرون بیاور"] },
        { label: "بپوشان", it: "coprirle con materiale pulito, possibilmente sterile", values: ["درست", "با وسیله‌ی تمیز یا استریل، شل، بی‌فشار؛ مثلاً نایلونِ تمیزِ آشپزخانه بی‌آنکه دورِ عضو بپیچی"] },
        { label: "صبر برای شعله", it: "aspettare che si spengano da sole", values: ["غلط", "هر ثانیه سوختگی را عمیق‌تر می‌کند"] },
        { label: "کندنِ لباسِ چسبیده", it: "sempre togliere le parti dei vestiti", values: ["غلط", "پوست را با خودش می‌کند"] },
        { label: "الکل", it: "disinfettare le bruciature con l'alcool", values: ["غلط", "درد و آسیب را بیشتر می‌کند؛ هیچ ماده‌ای روی سوختگی نریز جز آبِ خنک"] },
      ],
      takeaway: "خفه کن، خنک کن، چسبیده را رها کن، تمیز بپوشان، خبر کن. نه یخ، نه الکل، نه پماد.",
      rule: NHS_USTIONI,
    },
    {
      kind: "classify",
      title: "حالا چه کنی؟ دستِ سوخته",
      body: `${DISCLAIMER} بیرونِ آبادی، روز. بعد از تصادف، آتشِ کوچکی در موتورِ یک خودرو بود که آتش‌نشان‌ها خاموش کرده‌اند و صحنه امن است. راننده هوشیار است؛ دست و ساعدش سوخته و آستینِ پیراهن در یک نقطه به پوست چسبیده. امداد خبر شده. یک بطری آبِ معدنیِ خنک داری. برای هر کار بگو:`,
      options: [
        { it: "fallo", fa: "انجامش بده" },
        { it: "non farlo", fa: "نکن" },
      ],
      items: [
        { prompt: "دست را با آبِ خنک، پیوسته و چند دقیقه، سرد می‌کنی", answer: 0, explain: "سرد کردن با آبِ خنک، هر چه زودتر و تا حدودِ بیست دقیقه." },
        { prompt: "یخ را مستقیم روی سوختگی می‌گذاری", answer: 1, explain: "یخ به پوستِ سوخته آسیب می‌زند؛ آبِ خنک، نه یخ." },
        { prompt: "آستینِ چسبیده را آرام از پوست جدا می‌کنی", answer: 1, explain: "لباسِ چسبیده می‌ماند؛ کندنش پوست را می‌کند." },
        { prompt: "ساعتِ همان دست را پیش از ورم کردن درمی‌آوری", answer: 0, explain: "چیزهای نچسبیده‌ی نزدیکِ سوختگی را پیش از ورم بیرون بیاور." },
        { prompt: "روی سوختگی الکل می‌ریزی تا عفونت نکند", answer: 1, explain: "الکل درد و آسیب را بیشتر می‌کند." },
        { prompt: "بعد از سرد کردن، سوختگی را شل با گاز یا نایلونِ تمیز می‌پوشانی", answer: 0, explain: "پوشاندنِ تمیز و بی‌فشار." },
        { prompt: "تاول‌ها را می‌ترکانی تا زودتر خوب شود", answer: 1, explain: "تاول از زخم محافظت می‌کند؛ دست نزن." },
      ],
      takeaway: "خنک، نه یخ. چسبیده بماند. تمیز بپوشان. هیچ ماده‌ای جز آب.",
      rule: NHS_USTIONI,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "si è ustionato", fa: "دچارِ سوختگی شده", base: "ustionarsi" },
        { it: "le ustioni, le bruciature", fa: "سوختگی‌ها" },
        { it: "le fiamme", fa: "شعله‌ها" },
        { it: "soffocare (le fiamme)", fa: "خفه کردنِ شعله" },
        { it: "la coperta", fa: "پتو" },
        { it: "l'acqua fredda", fa: "آبِ خنک" },
        { it: "attaccati alla pelle", fa: "چسبیده به پوست" },
        { it: "disinfettare", fa: "ضدعفونی کردن" },
        { it: "il busto", fa: "بالاتنه" },
      ],
    },
    {
      kind: "trap",
      title: "«vestiti attaccati»: بماند یا «sempre togliere»؟",
      body: "هر دو جمله درباره‌ی لباسی‌اند که به پوستِ سوخته چسبیده. یکی می‌گوید نکن، دیگری با «sempre» می‌گوید بکن:",
      examples: [
        {
          sourceId: "6564",
          textIt: "Se un ferito della strada si è ustionato, è consigliabile non togliere i vestiti rimasti attaccati alla pelle bruciata",
          answer: 1,
          chunks: [
            { it: `${USTIONATO},`, fa: `${USTIONATO_FA}،`, verb: "si è ustionato ← ustionarsi" },
            { it: "è consigliabile non togliere i vestiti rimasti attaccati alla pelle bruciata", fa: "بهتر است لباسی را که به پوستِ سوخته چسبیده جدا نکنی", verb: "è ← essere", focus: "negation" },
          ],
          translation: "اگر زخمیِ تصادف دچارِ سوختگی شده، بهتر است لباسی را که به پوستِ سوخته چسبیده جدا نکنی.",
          why: "درست است. کندنِ لباس پوست را با خودش می‌کند.",
        },
        {
          sourceId: "6568",
          textIt: "Se un ferito della strada si è ustionato, bisogna sempre togliere le parti dei vestiti che sono rimaste attaccate alla pelle",
          answer: 0,
          chunks: [
            { it: `${USTIONATO},`, fa: `${USTIONATO_FA}،`, verb: "si è ustionato ← ustionarsi" },
            { it: "bisogna sempre togliere le parti dei vestiti che sono rimaste attaccate alla pelle", fa: "باید همیشه تکه‌های لباسِ چسبیده به پوست را جدا کرد", verb: "bisogna ← bisognare", focus: "always" },
          ],
          translation: "اگر زخمیِ تصادف دچارِ سوختگی شده، باید همیشه تکه‌های لباسی را که به پوست چسبیده جدا کرد.",
          why: "غلط است. برعکس: آنچه چسبیده می‌ماند.",
        },
      ],
      takeaway: "در سوختگی «non togliere» و «acqua fredda» درست‌اند؛ «sempre togliere»، «alcool» و «aspettare» غلط.",
      rule: NHS_USTIONI,
    },
  ],
  practice: [
    {
      sourceId: "6563",
      textIt: "Se un ferito della strada si è ustionato e sono ancora presenti delle residue fiamme, bisogna spegnerle, soffocandole, ad esempio, con una coperta",
      answer: 1,
      chunks: [
        { it: USTIONATO, fa: USTIONATO_FA, verb: "si è ustionato ← ustionarsi" },
        { it: "e sono ancora presenti delle residue fiamme,", fa: "و هنوز شعله‌ای مانده،", focus: "condition" },
        { it: "bisogna spegnerle, soffocandole, ad esempio, con una coperta", fa: "باید آن را خاموش کرد، با خفه کردن، مثلاً با پتو", verb: "soffocandole ← soffocare" },
      ],
      translation: "اگر زخمیِ تصادف دچارِ سوختگی شده و هنوز شعله‌ای مانده، باید آن را خاموش کرد، با خفه کردن، مثلاً با پتو.",
      why: "درست است (قدم ۱). پتو هوا را از شعله می‌گیرد.",
      rule: NHS_USTIONI,
      conceptStep: 1,
    },
    {
      sourceId: "6567",
      textIt: "Se un ferito della strada si è ustionato e sono ancora presenti delle residue fiamme, bisogna aspettare che si spengano da sole, prima di intervenire",
      answer: 0,
      chunks: [
        { it: USTIONATO, fa: USTIONATO_FA, verb: "si è ustionato ← ustionarsi" },
        { it: "e sono ancora presenti delle residue fiamme,", fa: "و هنوز شعله‌ای مانده،", focus: "condition" },
        { it: "bisogna aspettare che si spengano da sole, prima di intervenire", fa: "باید صبر کرد خودبه‌خود خاموش شوند، پیش از هر کاری", verb: "si spengano ← spegnersi", focus: "contrast" },
      ],
      translation: "اگر زخمیِ تصادف دچارِ سوختگی شده و هنوز شعله‌ای مانده، باید پیش از هر کاری صبر کرد تا خودبه‌خود خاموش شوند.",
      why: "غلط است (قدم ۱). هر ثانیه سوختگی را عمیق‌تر می‌کند؛ با پتو خفه کن.",
      rule: NHS_USTIONI,
      conceptStep: 1,
    },
    {
      sourceId: "6569",
      textIt: "Se un ferito della strada si è ustionato, bisogna disinfettare le bruciature con l'alcool",
      answer: 0,
      chunks: [
        { it: `${USTIONATO},`, fa: `${USTIONATO_FA}،`, verb: "si è ustionato ← ustionarsi" },
        { it: "bisogna disinfettare le bruciature con l'alcool", fa: "باید سوختگی‌ها را با الکل ضدعفونی کرد", verb: "bisogna ← bisognare", focus: "contrast" },
      ],
      translation: "اگر زخمیِ تصادف دچارِ سوختگی شده، باید سوختگی‌ها را با الکل ضدعفونی کرد.",
      why: "غلط است (قدم ۱). الکل درد و آسیب را بیشتر می‌کند؛ فقط آبِ خنک.",
      rule: NHS_USTIONI,
      conceptStep: 1,
    },
  ],
  related: [{ step: 1, sourceIds: ["6563", "6564", "6565", "6566", "6567", "6568", "6569"] }],
};
