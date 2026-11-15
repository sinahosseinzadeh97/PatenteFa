/**
 * src/content/ch23-civile.ts
 * Chapter 23 (Responsabilità civile, penale e assicurazione), lessons 3–4.
 *
 *  L3 civil liability: every damage caused is compensated, to persons and
 *     things, small or large, also after a death; independent from the other two
 *     kinds; insurance does not change it (bank group 601).
 *  L4 who answers and how a claim is settled: driver and owner jointly for civil
 *     damages, only the driver for crimes, the owner not when the vehicle was used
 *     against his will; paying, agreeing, repairing, a consultant (groups 603, 597).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter23.test.ts.
 */
import type { Lesson } from "./lessons.js";
import { CAP, CC_2043, CC_2054, COST_27, CP, DISCLAIMER, IVASS } from "./ch23-common.js";

const RC = "La responsabilità civile connessa al sinistro stradale";
const RC_FA = "مسئولیتِ مدنیِ ناشی از تصادف";
const RD = "La responsabilità per danni connessi alla circolazione dei veicoli";
const RD_FA = "مسئولیتِ خسارت‌های ناشی از رفت‌وآمدِ وسیله‌ها";
const CO = "Chi è civilmente obbligato a risarcire i danni provocati da un sinistro stradale";
const CO_FA = "کسی که از نظرِ مدنی موظف است خسارت‌های یک تصادف را جبران کند";

export const lessonCivile: Lesson = {
  id: "responsabilita-civile",
  titleFa: "مسئولیتِ مدنی: هر خسارتی جبران می‌شود",
  titleIt: "LA RESPONSABILITÀ CIVILE",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی مسئولیتِ مدنی چیست (وظیفه‌ی جبرانِ هر خسارتی که با تقصیرت زده‌ای)، چه چیزهایی را در بر می‌گیرد (آدم و مال، کم و زیاد، حتی بعد از مرگِ زیان‌دیده) و چرا بیمه آن را کم یا زیاد نمی‌کند.",
      why:
        "۱۰ سؤال. جمله‌ی غلط مسئولیتِ مدنی را کوچک می‌کند («فقط مال»، «نه برای خسارتِ کم»، «نه وقتی زیان‌دیده مُرد») یا آن را به بیمه گره می‌زند («بدونِ بیمه سنگین‌تر است»، «بیمه همه را می‌دهد، حتی بالای سقف»).",
      rule: `${CC_2043}; ${CC_2054}`,
    },
    {
      kind: "table",
      title: "چه چیزی جبران می‌شود",
      body:
        "قاعده‌ی پایه‌ی قانونِ مدنی: هر کس با تقصیرش به دیگری خسارت بزند، باید آن را جبران کند (ماده‌ی ۲۰۴۳). برای راننده قانون سخت‌تر است: مسئول است، مگر ثابت کند هر کاری که ممکن بود برای جلوگیری کرده است (ماده‌ی ۲۰۵۴):",
      columns: ["جبران می‌شود؟", "توضیح"],
      rows: [
        { label: "آسیب به آدم", it: "danni alle persone", values: ["بله", "درمان، روزهای کارِ ازدست‌رفته، رنج و آسیبِ ماندگار."] },
        { label: "آسیب به مال", it: "danni alle cose", values: ["بله", "خودرو، گوشی، دیوار، تابلو؛ هر چیزی که خراب شده."] },
        { label: "خسارتِ کم", it: "danni di lieve entità", values: ["بله", "کوچکیِ خسارت آن را از بین نمی‌برد. ممکن است با توافق زود حل شود، ولی هنوز «وظیفه» است."] },
        { label: "مرگِ زیان‌دیده", it: "in caso di morte del danneggiato", values: ["بله", "مسئولیت با مرگ تمام نمی‌شود: خانواده و وارثان حقِ جبران دارند."] },
        { label: "اصلِ کلی", it: "ogni danno causato deve essere risarcito", values: ["همیشه", "مسئولیتِ مدنی روی همین اصل ساخته شده: خسارتی که زدی، جبران می‌کنی."] },
      ],
      takeaway: "مسئولیتِ مدنی = جبرانِ هر خسارت: آدم و مال، کم و زیاد، و بعد از مرگ برای خانواده.",
      rule: `${CC_2043}; ${CC_2054} c.1`,
    },
    {
      kind: "table",
      title: "جدا از بقیه، و جدا از بیمه",
      body:
        "مسئولیتِ مدنی با دو راهِ دیگر جمع می‌شود ولی به آن‌ها وابسته نیست (درسِ ۱). بیمه هم فقط کسی است که پول را به جای تو می‌دهد، تا سقفی معین؛ اندازه‌ی مسئولیت را عوض نمی‌کند:",
      columns: ["درست یا غلط؟", "چرا"],
      rows: [
        { label: "مستقل از کیفری و اداری", it: "indipendente dalla responsabilità penale e amministrativa", values: ["درست", "ممکن است جرمی نباشد و تخلفی هم ثبت نشده باشد، ولی خسارت را بدهکار باشی؛ یا برعکس. هر کدام شرط‌های خودش را دارد."] },
        { label: "بر دوشِ راننده و مالک", it: "grava sul proprietario e sul conducente", values: ["درست", "زیان‌دیده می‌تواند از هر دو بخواهد (درسِ ۴)."] },
        { label: "بدونِ بیمه سنگین‌تر", it: "aggravata dalla mancata copertura assicurativa", values: ["غلط", "خسارت همان خسارت است. بدونِ بیمه خودت باید همه را بدهی و جریمه‌ی جداگانه‌ی رانندگیِ بی‌بیمه هم داری (درسِ ۸)، ولی خودِ مسئولیتِ مدنی بزرگ‌تر نمی‌شود."] },
        { label: "بیمه، حتی بالای سقف", it: "grava sull'impresa anche per danni superiori ai massimali", values: ["غلط", "شرکتِ بیمه تا سقفِ تعهدِ بیمه‌نامه می‌پردازد؛ بیشتر از آن را خودِ مسئول می‌دهد (درسِ ۷)."] },
      ],
      takeaway: "مسئولیتِ مدنی مستقل است و با بیمه کم و زیاد نمی‌شود؛ بیمه فقط تا سقفش می‌پردازد.",
      rule: `${CC_2054}; ${CAP("128")}; ${IVASS}`,
    },
    {
      kind: "classify",
      title: "تمرین: جبران می‌شود یا نه؟",
      body: `${DISCLAIMER} راننده‌ی فرضیِ B با تقصیرِ خودش به خودروی C می‌زند. C و سرنشینش آسیب دیده‌اند. برای هر خسارت بگو آیا B (یا بیمه‌اش به جای او) باید جبرانش کند:`,
      options: [
        { it: "si risarcisce", fa: "جبران می‌شود" },
        { it: "non è un danno da risarcire", fa: "خسارتی نیست که B بدهکار باشد" },
      ],
      items: [
        { prompt: "خطِ کوچکی روی سپرِ C", answer: 0, explain: "خسارتِ کم هم خسارت است (قدمِ ۱)." },
        { prompt: "گوشیِ سرنشین که در تصادف شکست", answer: 0, explain: "آسیب به مال، هر مالی." },
        { prompt: "هزینه‌ی درمان و روزهای کاری که C از دست داد", answer: 0, explain: "آسیب به آدم: درمان و درآمدِ ازدست‌رفته." },
        { prompt: "سرنشین چند هفته بعد بر اثرِ آسیب‌ها می‌میرد؛ خانواده‌اش جبران می‌خواهند", answer: 0, explain: "مسئولیت با مرگ تمام نمی‌شود؛ وارثان حق دارند." },
        { prompt: "آسیبِ خودروی خودِ B", answer: 1, explain: "تقصیر با خودِ B بود؛ کسی این را به او بدهکار نیست. فقط بیمه‌ی بدنه‌ی خودش، اگر دارد، می‌پردازد (درسِ ۷)." },
        { prompt: "جریمه‌ی پارکی که C صبحِ همان روز گرفته بود", answer: 1, explain: "این از تصادف نیامده؛ خسارتی نیست که B زده باشد." },
      ],
      takeaway: "هر چه تصادف به دیگری زد جبران می‌شود: آدم، مال، کم، زیاد، و بعد از مرگ. آنچه مالِ خودِ مقصر است یا از تصادف نیامده، نه.",
      rule: `${CC_2043}; ${CC_2054}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "risarcire i danni", fa: "جبران کردنِ خسارت", base: "risarcire" },
        { it: "danni alle persone", fa: "خسارتِ جانی" },
        { it: "danni alle cose", fa: "خسارتِ مالی" },
        { it: "di lieve entità", fa: "کم، سبک" },
        { it: "grava su", fa: "بر دوشِ … است", base: "gravare" },
        { it: "la copertura assicurativa", fa: "پوششِ بیمه" },
        { it: "i massimali", fa: "سقفِ تعهد" },
        { it: "l'impresa assicuratrice", fa: "شرکتِ بیمه" },
      ],
    },
    {
      kind: "trap",
      title: "«alle persone… alle cose»: هر دو یا فقط یکی؟",
      body: "هر دو جمله تعریف می‌کنند مسئولیتِ مدنی چه خسارتی را در بر می‌گیرد. یکی هر دو را می‌گوید؛ دیگری با «فقط» یکی را حذف می‌کند:",
      examples: [
        {
          sourceId: "6632",
          textIt: "La responsabilità civile connessa al sinistro stradale consiste nell'obbligo di risarcire i danni causati sia alle persone che alle cose",
          answer: 1,
          chunks: [
            { it: RC, fa: RC_FA },
            { it: "consiste nell'obbligo di risarcire i danni causati", fa: "عبارت است از وظیفه‌ی جبرانِ خسارت‌های واردشده", verb: "consiste ← consistere" },
            { it: "sia alle persone che alle cose", fa: "هم به آدم‌ها و هم به مال", focus: "always" },
          ],
          translation: "مسئولیتِ مدنیِ ناشی از تصادف عبارت است از وظیفه‌ی جبرانِ خسارت‌هایی که هم به آدم‌ها و هم به مال وارد شده است.",
          why: "درست است. «sia… che» یعنی هر دو.",
        },
        {
          sourceId: "6638",
          textIt: "La responsabilità civile connessa al sinistro stradale si limita al risarcimento dei danni alle sole cose",
          answer: 0,
          chunks: [
            { it: RC, fa: RC_FA },
            { it: "si limita al risarcimento dei danni alle sole cose", fa: "به جبرانِ خسارتِ فقط مالی محدود می‌شود", focus: "limit", verb: "si limita ← limitarsi" },
          ],
          translation: "مسئولیتِ مدنیِ ناشی از تصادف به جبرانِ خسارت‌های فقط مالی محدود می‌شود.",
          why: "غلط است. آسیب به آدم هم جبران می‌شود؛ «si limita… sole» آن را حذف می‌کند.",
        },
      ],
      takeaway: "در تعریفِ مسئولیتِ مدنی، «sia… che» درست است؛ «solo», «sole», «si limita», «è esclusa» معمولاً جمله‌ی غلط را می‌سازند.",
      rule: CC_2043,
    },
  ],
  practice: [
    {
      sourceId: "6636",
      textIt: "La responsabilità civile connessa al sinistro stradale è basata sul principio che ogni danno causato deve essere risarcito",
      answer: 1,
      chunks: [
        { it: RC, fa: RC_FA },
        { it: "è basata sul principio", fa: "بر این اصل استوار است", verb: "è basata ← basare" },
        { it: "che ogni danno causato deve essere risarcito", fa: "که هر خسارتِ واردشده باید جبران شود", focus: "always" },
      ],
      translation: "مسئولیتِ مدنیِ ناشی از تصادف بر این اصل استوار است که هر خسارتِ واردشده باید جبران شود.",
      why: "درست است (قدم ۱). همان اصلِ ماده‌ی ۲۰۴۳.",
      rule: CC_2043,
      conceptStep: 1,
    },
    {
      sourceId: "6639",
      textIt: "La responsabilità civile connessa al sinistro stradale è esclusa per danni di lieve entità",
      answer: 0,
      chunks: [
        { it: RC, fa: RC_FA },
        { it: "è esclusa per danni di lieve entità", fa: "برای خسارت‌های کم منتفی است", focus: "negation", verb: "è esclusa ← escludere" },
      ],
      translation: "مسئولیتِ مدنیِ ناشی از تصادف برای خسارت‌های کم منتفی است.",
      why: "غلط است (قدم ۱). خسارتِ کم هم جبران می‌شود.",
      rule: CC_2043,
      conceptStep: 1,
    },
    {
      sourceId: "6635",
      textIt: "La responsabilità civile connessa al sinistro stradale è indipendente dalla responsabilità penale e dalla responsabilità amministrativa",
      answer: 1,
      chunks: [
        { it: RC, fa: RC_FA },
        { it: "è indipendente dalla responsabilità penale e dalla responsabilità amministrativa", fa: "از مسئولیتِ کیفری و مسئولیتِ اداری مستقل است" },
      ],
      translation: "مسئولیتِ مدنیِ ناشی از تصادف از مسئولیتِ کیفری و مسئولیتِ اداری مستقل است.",
      why: "درست است (قدم ۲). «مستقل» یعنی هر کدام شرطِ خودش را دارد، نه این‌که با هم نمی‌آیند: از یک تصادف ممکن است هر سه پیش بیاید (درسِ ۱).",
      rule: `${CC_2043}; ${CP("185")}`,
      conceptStep: 2,
    },
    {
      sourceId: "6641",
      textIt: "La responsabilità civile connessa al sinistro stradale grava sull'impresa assicuratrice anche per danni superiori ai massimali",
      answer: 0,
      chunks: [
        { it: RC, fa: RC_FA },
        { it: "grava sull'impresa assicuratrice", fa: "بر دوشِ شرکتِ بیمه است", verb: "grava ← gravare" },
        { it: "anche per danni superiori ai massimali", fa: "حتی برای خسارت‌های بالاتر از سقفِ تعهد", focus: "contrast" },
      ],
      translation: "مسئولیتِ مدنیِ ناشی از تصادف حتی برای خسارت‌های بالاتر از سقفِ تعهد بر دوشِ شرکتِ بیمه است.",
      why: "غلط است (قدم ۲). بالای سقف را خودِ مسئول می‌پردازد.",
      rule: `${CAP("128")}; ${IVASS}`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6632", "6634", "6636", "6637", "6638", "6639"] },
    { step: 2, sourceIds: ["6633", "6635", "6640", "6641"] },
  ],
};

export const lessonChiRisponde: Lesson = {
  id: "chi-risponde-risarcimento",
  titleFa: "چه کسی جواب می‌دهد، و خسارت چطور حل می‌شود",
  titleIt: "CHI RISPONDE DEI DANNI · IL RISARCIMENTO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی در هر راه چه کسی جواب می‌دهد: در راهِ مدنی راننده و مالک با هم، در راهِ کیفری فقط راننده، و مالک نه وقتی خودرو بی‌رضایتش رانده شده. و می‌دانی خسارت چطور حل می‌شود: پرداخت، توافق، کمکِ کارشناس؛ و چه چیزی جایگزینِ آن نیست.",
      why:
        "۱۱ سؤال. نیمی درباره‌ی «a carico di chi» (بر دوشِ چه کسی)، نیمی درباره‌ی «chi è civilmente obbligato» (کسی که باید خسارت بدهد). جمله‌ی غلط مسئولیتِ کیفری را به مالک می‌دهد، مالک را در خسارتِ مالی کنار می‌گذارد، یا می‌گوید پول یا ابطالِ گواهینامه جای چیزِ دیگری را می‌گیرد.",
      rule: `${CC_2054}; ${COST_27}`,
    },
    {
      kind: "table",
      title: "در هر راه، چه کسی؟",
      body:
        "خودرو ممکن است مالِ کسی باشد و کسِ دیگری آن را براند. قانون برای هر راه جوابِ جدایی دارد:",
      columns: ["راننده", "مالک"],
      rows: [
        { label: "مدنی (خسارت)", it: "responsabilità civile", values: ["جواب می‌دهد، مگر ثابت کند هر کاری ممکن بود کرده", "با راننده جواب می‌دهد (هر دو در برابرِ کلِ خسارت)؛ برای آدم و برای مال"] },
        { label: "کیفری (جرم)", it: "responsabilità penale", values: ["جواب می‌دهد، اگر کارش جرم است", "نه؛ مسئولیتِ کیفری شخصی است. مالک فقط برای کاری که خودش کرده جواب می‌دهد"] },
        { label: "خودرو بی‌رضایتِ مالک", it: "circolazione contro la sua volontà", values: ["جواب می‌دهد", "اگر ثابت کند خودرو بی‌رضایتش رانده شده (مثلاً سرقتِ گزارش‌شده)، در خسارت هم جواب نمی‌دهد"] },
      ],
      takeaway: "مدنی: راننده و مالک. کیفری: فقط راننده. بی‌رضایتِ مالک (با اثبات): فقط راننده.",
      rule: `${CC_2054} c.1, c.3; ${COST_27}`,
    },
    {
      kind: "table",
      title: "خسارت چطور حل می‌شود",
      body:
        "وظیفه‌ی مدنی با جبرانِ خسارت تمام می‌شود. راه‌های معمول، و دو چیزی که بانک به اشتباه جایگزین می‌کند:",
      columns: ["ممکن است؟", "توضیح"],
      rows: [
        { label: "پرداخت", it: "si libera dall'obbligo se risarcisce", values: ["بله", "وقتی خسارت را جبران کردی (خودت یا بیمه‌ات)، وظیفه‌ی مدنی تمام است."] },
        { label: "توافق روی مبلغ", it: "accordarsi circa il valore del risarcimento", values: ["بله", "مسئول و زیان‌دیده می‌توانند روی مبلغ به توافق برسند؛ لازم نیست کار به دادگاه بکشد."] },
        { label: "تعمیرِ خودروی خودت", it: "far riparare il proprio autoveicolo", values: ["بله", "مسئول بودن مانعِ تعمیرِ خودروی خودت نیست؛ فقط هزینه‌اش را کسی به تو بدهکار نیست (درسِ ۳)."] },
        { label: "کارشناسِ تصادفات", it: "un consulente d'infortunistica stradale", values: ["بله", "هر دو طرف می‌توانند از یک کارشناس کمک بگیرند تا خسارت و چگونگیِ تصادف سنجیده شود."] },
        { label: "به جای پول، ابطالِ گواهینامه", it: "in alternativa, la revoca della patente", values: ["نه", "ابطال تصمیمِ قاضی یا اداره است (درسِ ۱)، نه انتخابی برای فرار از پرداخت."] },
        { label: "پول، به جای مجازات", it: "si libera da ogni responsabilità penale pagando", values: ["نه", "پرداخت راهِ مدنی را می‌بندد، نه کیفری را (درسِ ۲)."] },
      ],
      takeaway: "جبران کن، توافق کن، کارشناس بگیر: راهِ مدنی بسته می‌شود. ابطال یا آزادی از مجازات چیزی نیست که با پول یا انتخاب عوض شود.",
      rule: `${CC_2054}; Codice civile, art. 1965 (transazione); ${CP("162-ter")}`,
    },
    {
      kind: "classify",
      title: "تمرین: چه کسی جواب می‌دهد؟",
      body: `${DISCLAIMER} خودرو مالِ D است. هر خط یک ماجرای جداست. بگو در هر خط چه کسی جواب می‌دهد:`,
      options: [
        { it: "conducente e proprietario", fa: "راننده و مالک" },
        { it: "solo il conducente", fa: "فقط راننده" },
        { it: "non si può dire", fa: "از این اطلاعات معلوم نیست" },
      ],
      items: [
        { prompt: "D خودرو را به دوستش E قرض داده. E به خودروی پارک‌شده‌ای می‌زند. خسارتِ آن خودرو با کیست؟", answer: 0, explain: "راهِ مدنی: مالک با راننده جواب می‌دهد (بندِ ۳ ماده‌ی ۲۰۵۴). بیمه‌ی خودرو به جای آن‌ها می‌پردازد." },
        { prompt: "همان قرض. E به عابری صدمه‌ی شدید می‌زند. پرونده‌ی کیفری علیهِ کیست؟", answer: 1, explain: "مسئولیتِ کیفری شخصی است؛ فقط کسی که رانده." },
        { prompt: "همان قرض و همان عابر. هزینه‌ی درمانِ عابر با کیست؟", answer: 0, explain: "این راهِ مدنی است: مالک و راننده. این‌جا جوابِ دو خطِ قبل متفاوت است، چون راه فرق دارد." },
        { prompt: "خودرو از جلوی خانه‌ی D دزدیده شده و D سرقت را به پلیس گزارش داده. دزد به خودرویی می‌زند. خسارت با کیست؟", answer: 1, explain: "بی‌رضایتِ مالک و ثابت‌شده: فقط راننده (دزد). زیان‌دیده را صندوقِ تضمین هم جبران می‌کند (درسِ ۸)." },
        { prompt: "پسرِ بزرگسالِ D بدونِ پرسیدن سوییچ را از کشو برمی‌دارد. هیچ گزارشی داده نشده. تصادف می‌کند. خسارت با کیست؟", answer: 2, explain: "قانون می‌گوید مالک جواب نمی‌دهد «اگر ثابت کند» بی‌رضایتش بوده. این‌که D بتواند ثابت کند، از این چند خط معلوم نیست." },
      ],
      takeaway: "اول بپرس کدام راه است: کیفری همیشه فقط راننده؛ مدنی راننده و مالک، مگر مالک ثابت کند خودرو بی‌رضایتش رانده شده.",
      rule: `${CC_2054} c.3; ${COST_27}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "a carico di", fa: "بر عهده‌ی، بر دوشِ" },
        { it: "il proprietario del veicolo", fa: "مالکِ خودرو" },
        { it: "il conducente", fa: "راننده" },
        { it: "contro la sua volontà", fa: "بدونِ رضایتِ او" },
        { it: "civilmente obbligato", fa: "موظف از نظرِ مدنی" },
        { it: "liberarsi dall'obbligo", fa: "از وظیفه رها شدن", base: "liberarsi" },
        { it: "accordarsi", fa: "به توافق رسیدن", base: "accordarsi" },
        { it: "il consulente d'infortunistica stradale", fa: "کارشناسِ تصادفات" },
      ],
    },
    {
      kind: "trap",
      title: "«se si tratta di responsabilità penale»: راننده یا مالک؟",
      body: "دو جمله با یک پایان؛ فقط کسی که مسئول شمرده می‌شود فرق دارد:",
      examples: [
        {
          sourceId: "6650",
          textIt: "La responsabilità per danni connessi alla circolazione dei veicoli è a carico del conducente del veicolo, se si tratta di responsabilità penale",
          answer: 1,
          chunks: [
            { it: RD, fa: RD_FA },
            { it: "è a carico del conducente del veicolo,", fa: "بر دوشِ راننده‌ی وسیله است،" },
            { it: "se si tratta di responsabilità penale", fa: "اگر موضوع مسئولیتِ کیفری باشد", focus: "condition" },
          ],
          translation: "مسئولیتِ خسارت‌های ناشی از رفت‌وآمدِ وسیله‌ها، اگر موضوع مسئولیتِ کیفری باشد، بر دوشِ راننده‌ی وسیله است.",
          why: "درست است. مسئولیتِ کیفری شخصی است: کسی که رانده.",
        },
        {
          sourceId: "6652",
          textIt: "La responsabilità per danni connessi alla circolazione dei veicoli è a carico del proprietario del veicolo, se si tratta di responsabilità penale",
          answer: 0,
          chunks: [
            { it: RD, fa: RD_FA },
            { it: "è a carico del proprietario del veicolo,", fa: "بر دوشِ مالکِ وسیله است،", focus: "contrast" },
            { it: "se si tratta di responsabilità penale", fa: "اگر موضوع مسئولیتِ کیفری باشد", focus: "condition" },
          ],
          translation: "مسئولیتِ خسارت‌های ناشی از رفت‌وآمدِ وسیله‌ها، اگر موضوع مسئولیتِ کیفری باشد، بر دوشِ مالکِ وسیله است.",
          why: "غلط است. مالک در راهِ مدنی جواب می‌دهد، نه در راهِ کیفری، مگر خودش راننده بوده باشد.",
        },
      ],
      takeaway: "«penale» → فقط راننده. «civile» → راننده و مالک. اول کلمه‌ی آخرِ جمله را ببین.",
      rule: `${COST_27}; ${CC_2054} c.3`,
    },
  ],
  practice: [
    {
      sourceId: "6649",
      textIt: "La responsabilità per danni connessi alla circolazione dei veicoli è a carico del conducente e del proprietario del veicolo, se si tratta di responsabilità civile",
      answer: 1,
      chunks: [
        { it: RD, fa: RD_FA },
        { it: "è a carico del conducente e del proprietario del veicolo,", fa: "بر دوشِ راننده و مالکِ وسیله است،" },
        { it: "se si tratta di responsabilità civile", fa: "اگر موضوع مسئولیتِ مدنی باشد", focus: "condition" },
      ],
      translation: "مسئولیتِ خسارت‌های ناشی از رفت‌وآمدِ وسیله‌ها، اگر موضوع مسئولیتِ مدنی باشد، بر دوشِ راننده و مالکِ وسیله است.",
      why: "درست است (قدم ۱). ماده‌ی ۲۰۵۴: مالک با راننده جواب می‌دهد.",
      rule: `${CC_2054} c.1, c.3`,
      conceptStep: 1,
    },
    {
      sourceId: "6653",
      textIt: "La responsabilità per danni connessi alla circolazione dei veicoli è a carico solo del conducente del veicolo se ci sono stati danni alle cose",
      answer: 0,
      chunks: [
        { it: RD, fa: RD_FA },
        { it: "è a carico solo del conducente del veicolo", fa: "فقط بر دوشِ راننده‌ی وسیله است", focus: "limit" },
        { it: "se ci sono stati danni alle cose", fa: "اگر خسارتِ مالی بوده باشد", focus: "condition" },
      ],
      translation: "مسئولیتِ خسارت‌های ناشی از رفت‌وآمدِ وسیله‌ها، اگر خسارتِ مالی بوده باشد، فقط بر دوشِ راننده‌ی وسیله است.",
      why: "غلط است (قدم ۱). مالک برای مال هم با راننده جواب می‌دهد؛ «solo» غلط است.",
      rule: `${CC_2054} c.3`,
      conceptStep: 1,
    },
    {
      sourceId: "6603",
      textIt: "Chi è civilmente obbligato a risarcire i danni provocati da un sinistro stradale si libera dall'obbligo se risarcisce il danneggiato",
      answer: 1,
      chunks: [
        { it: CO, fa: CO_FA },
        { it: "si libera dall'obbligo", fa: "از این وظیفه رها می‌شود", verb: "si libera ← liberarsi" },
        { it: "se risarcisce il danneggiato", fa: "اگر خسارتِ زیان‌دیده را جبران کند", focus: "condition", verb: "risarcisce ← risarcire" },
      ],
      translation: "کسی که از نظرِ مدنی موظف است خسارت‌های یک تصادف را جبران کند، اگر خسارتِ زیان‌دیده را جبران کند، از این وظیفه رها می‌شود.",
      why: "درست است (قدم ۲). وظیفه‌ی مدنی همین جبران است؛ با جبران تمام می‌شود.",
      rule: CC_2043,
      conceptStep: 2,
    },
    {
      sourceId: "6607",
      textIt: "Chi è civilmente obbligato a risarcire i danni provocati da un sinistro stradale può, in alternativa, chiedere che la propria patente di guida sia revocata",
      answer: 0,
      chunks: [
        { it: CO, fa: CO_FA },
        { it: "può, in alternativa, chiedere", fa: "می‌تواند به جای آن درخواست کند", focus: "contrast", verb: "può ← potere" },
        { it: "che la propria patente di guida sia revocata", fa: "که گواهینامه‌اش باطل شود" },
      ],
      translation: "کسی که از نظرِ مدنی موظف است خسارت‌های یک تصادف را جبران کند، می‌تواند به جای آن درخواست کند که گواهینامه‌اش باطل شود.",
      why: "غلط است (قدم ۲). ابطال جایگزینِ پرداخت نیست؛ تصمیمی است که قاضی یا اداره می‌گیرد.",
      rule: `${CC_2043}; Codice della Strada, art. 219`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6649", "6650", "6651", "6652", "6653"] },
    { step: 2, sourceIds: ["6603", "6604", "6605", "6606", "6607", "6608"] },
  ],
};
