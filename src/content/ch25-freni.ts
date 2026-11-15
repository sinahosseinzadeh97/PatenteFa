/**
 * src/content/ch25-freni.ts
 * Chapter 25 (Elementi del veicolo, manutenzione e comportamenti), lessons 3–5:
 * braking (bank groups 636, 641, 646, 647).
 *
 *  L3 what ABS does and does not do; emergency braking with ABS (636; 6954,
 *     6959, 7003). 6910 stays with chapter 12 and is linked by lesson title.
 *  L4 brakes turn motion into heat; long descents and engine braking; the brake
 *     servo and the brake fluid; the parking brake (641, 646; 7008, 7010, 7023).
 *     What changes for automatic, hybrid and electric cars is said where it matters.
 *  L5 weak or uneven braking: real causes, unrelated ones, and how uneven brakes show (647).
 *
 * No intervals, no fluid specifications, no brake procedures: those are the
 * manufacturer's and the workshop's. Trust rules as in src/content/lessons.ts;
 * checked by tests/chapter25.test.ts.
 */
import type { Lesson } from "./lessons.js";
import { EXERCISE, MANUALE, MODEL_NOTE, TECNICA } from "./ch25-common.js";

const ABS_IT = "L'A.B.S.";
const EMERG = "In caso di frenata di emergenza, con entrata in azione dell'ABS,";
const EMERG_FA = "در ترمزِ اضطراری، وقتی ABS واردِ کار می‌شود،";
const POCO = "Una frenatura poco efficiente o squilibrata può essere causata";
const POCO_FA = "ترمزِ ضعیف یا نامتعادل ممکن است ناشی از";
const SQUIL = "Con freni squilibrati";
const SQUIL_FA = "با ترمزهای نامتعادل،";
const SERVO_FA = "ترمزِ کمکیِ مکشی";

export const lessonAbs: Lesson = {
  id: "abs-frenata-emergenza",
  titleFa: "ABS و ترمزِ اضطراری",
  titleIt: "A.B.S. · FRENATA DI EMERGENZA",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی ABS (ترمزِ ضدِقفل) دقیقاً چه کاری می‌کند: نمی‌گذارد چرخ‌ها قفل شوند، تا بتوانی در ترمز فرمان بدهی و از بیشترین چسبندگی استفاده کنی. می‌دانی چه کاری نمی‌کند: چسبندگیِ تازه نمی‌سازد. و می‌دانی در ترمزِ اضطراری با ABS پایت را چه کنی.",
      why:
        "۱۴ سؤال. جمله‌ی غلط کارِ ABS را برمی‌گرداند («قفل شدن را آسان می‌کند»، «نمی‌گذارد فرمان بدهی»)، آن را به چند چرخ محدود می‌کند («روی چرخ‌های محرک کار نمی‌کند»)، یا رفتارِ درست را وارونه می‌کند («وقتی ABS کار کرد، پا را سبک کن»). مسافتِ ترمز با ABS را فصلِ ۱۲ درس داده («ترمز و کل مسافتِ توقف»).",
      rule: `${TECNICA}; ${MANUALE}`,
    },
    {
      kind: "factors",
      title: "ABS چه می‌کند",
      body:
        "وقتی چرخی قفل می‌شود، دیگر نمی‌غلتد و روی جاده می‌لغزد؛ چرخِ لغزان کمتر می‌گیرد و فرمان هم دیگر کار نمی‌کند. ABS فشارِ ترمزِ همان چرخی را که دارد قفل می‌شود، در کسری از ثانیه کم و زیاد می‌کند تا دوباره بغلتد. این کار را روی هر چرخ جدا انجام می‌دهد، محرک یا نه:",
      columns: [
        {
          title: "درست است (VERO)",
          items: [
            { fa: "نمی‌گذارد چرخ‌ها قفل شوند", it: "impedisce alle ruote di bloccarsi", sourceId: "6904", textIt: "L'A.B.S. impedisce alle ruote di bloccarsi", answer: 1 },
            { fa: "در ترمز از بیشترین نیروی چسبندگی استفاده می‌کند", it: "consente di utilizzare la massima forza aderente, in frenata", sourceId: "6906", textIt: "L'A.B.S. consente di utilizzare la massima forza aderente, in frenata", answer: 1 },
            { fa: "روی همه‌ی چرخ‌ها کار می‌کند، هر بار روی چرخی که دارد قفل می‌شود", it: "è in grado di agire su tutte le ruote", sourceId: "6907", textIt: "L’A.B.S. è in grado di agire su tutte le ruote, intervenendo di volta in volta su quelle che stanno per bloccarsi durante la frenata", answer: 1 },
          ],
        },
        {
          title: "غلط است (FALSO)",
          items: [
            { fa: "قفل شدنِ چرخ‌ها را آسان می‌کند", it: "favorisce il bloccaggio delle ruote", sourceId: "6911", textIt: "L'A.B.S. favorisce il bloccaggio delle ruote", answer: 0 },
            { fa: "نمی‌گذارد از بیشترین چسبندگی استفاده کنی", it: "impedisce di utilizzare la massima forza aderente", sourceId: "6913", textIt: "L'A.B.S. impedisce di utilizzare la massima forza aderente, in frenata", answer: 0 },
            { fa: "روی چرخ‌های محرک کار نمی‌کند", it: "non agisce sulle ruote motrici", sourceId: "6914", textIt: "L'A.B.S. non agisce sulle ruote motrici", answer: 0 },
          ],
        },
      ],
      takeaway: "ABS = چرخ قفل نمی‌شود، پس هنوز می‌توانی فرمان بدهی. روی همه‌ی چرخ‌ها.",
      rule: TECNICA,
    },
    {
      kind: "table",
      title: "ABS کِی کار می‌کند، و حدش کجاست",
      body:
        "ABS روی جاده‌ی خیس و با لاستیکِ فرسوده هم کار می‌کند. ولی چسبندگی نمی‌سازد: فقط از همان چسبندگی‌ای که هست بهترین استفاده را می‌کند. پس روی جاده‌ی لغزنده، با ABS هم، ترمز بلندتر است:",
      columns: ["ABS", "یادت باشد"],
      rows: [
        { label: "جاده‌ی خیس", it: "quando l'asfalto è bagnato", values: ["کار می‌کند", "چسبندگی کمتر است؛ ترمز بلندتر می‌شود، با ABS هم"] },
        { label: "لاستیکِ فرسوده", it: "quando gli pneumatici sono usurati", values: ["کار می‌کند", "لاستیکِ فرسوده کمتر می‌گیرد؛ ABS این را جبران نمی‌کند (درسِ ۷)"] },
        { label: "فاصله با خودروی جلو", it: "rende la frenata più sicura", values: ["ترمز را امن‌تر می‌کند، نه کوتاه‌تر به‌خودی‌خود", "فاصله‌ی ایمنی را کم نکن چون ABS داری (فصلِ ۱۲)"] },
        { label: "همه‌ی وسیله‌ها ABS ندارند", it: "veicoli dotati di ABS", values: ["خودروهای قدیمی و بعضی دوچرخ‌های کوچک ندارند", `چراغِ نشانگرِ ABS در داشبورد خرابی را نشان می‌دهد (فصلِ ۱۸)؛ ${MODEL_NOTE}`] },
      ],
      takeaway: "ABS فرمان را نگه می‌دارد، چسبندگی را نه. لاستیکِ خوب و سرعتِ مناسب هنوز کارِ توست.",
      rule: `${TECNICA}; ${MANUALE}`,
    },
    {
      kind: "table",
      title: "ترمزِ اضطراری با ABS: محکم، بی‌وقفه، و فرمان بده",
      body:
        "وقتی ABS کار می‌کند، پدال زیرِ پایت می‌لرزد یا ضربه می‌زند و صدایی می‌شنوی. این یعنی ABS دارد کارش را می‌کند، نه این‌که خراب است:",
      columns: ["چه کنی", "چرا"],
      rows: [
        { label: "پدال را محکم فشار بده و نگه دار", it: "continuare a premere con forza il pedale", values: ["تا خودرو بایستد یا خطر رد شود", "ABS فقط وقتی کار می‌کند که پدال فشرده باشد"] },
        { label: "پا را سبک نکن", it: "diminuire la pressione esercitata sul pedale", values: ["حتی وقتی پدال می‌لرزد", "پای سبک یعنی ترمزِ کمتر و مسافتِ بیشتر"] },
        { label: "فرمان بده", it: "correggere la traiettoria", values: ["اگر لازم است، دورِ مانع بپیچ", "چرخ‌ها قفل نیستند، پس فرمان کار می‌کند"] },
        { label: "دنده‌عقب نه", it: "inserire rapidamente la retromarcia", values: ["هرگز در ترمزِ اضطراری", "کمکی به ترمز نمی‌کند و گیربکس را خراب می‌کند"] },
        { label: "خودرو ABS ندارد", it: "veicoli senza ABS", values: ["چرخ‌ها ممکن است قفل شوند", `${MODEL_NOTE} درست ترمز گرفتن بدونِ ABS را در دفترچه و با مربی تمرین کن`] },
      ],
      takeaway: "با ABS: پا تا ته، و فرمان. لرزشِ پدال طبیعی است.",
      rule: `${TECNICA}; ${MANUALE}`,
    },
    {
      kind: "classify",
      title: "تمرین: در ترمزِ اضطراری با ABS، درست یا غلط؟",
      body: `${EXERCISE} خودرو ABS دارد و ناگهان باید بایستی. هر کار را درست یا غلط بدان:`,
      options: [
        { it: "giusto", fa: "درست" },
        { it: "sbagliato", fa: "غلط" },
      ],
      items: [
        { prompt: "پدال را تا جایی که می‌توانی فشار می‌دهی و نگه می‌داری", answer: 0, explain: "همین کار ABS را فعال نگه می‌دارد (قدمِ ۳)." },
        { prompt: "پدال لرزید؛ پایت را برمی‌داری چون فکر می‌کنی خراب شده", answer: 1, explain: "لرزش یعنی ABS دارد کار می‌کند. پا را برنداری (قدمِ ۳)." },
        { prompt: "همان‌طور که ترمز گرفته‌ای، فرمان را می‌چرخانی تا از کنارِ مانع رد شوی", answer: 0, explain: "چرخ‌ها قفل نیستند، پس فرمان کار می‌کند (قدمِ ۱)." },
        { prompt: "پدال را پشتِ سرِ هم فشار می‌دهی و رها می‌کنی", answer: 1, explain: "با ABS لازم نیست؛ خودِ ABS این کار را خیلی سریع‌تر انجام می‌دهد. تو پدال را محکم نگه دار (قدمِ ۳)." },
        { prompt: "چون ABS داری، نزدیک‌تر از معمول پشتِ خودروی جلو می‌روی", answer: 1, explain: "ABS ترمز را امن‌تر می‌کند، نه کوتاه‌تر روی هر جاده‌ای (قدمِ ۲)." },
      ],
      takeaway: "ABS کارِ فشار دادن و رها کردن را خودش می‌کند. کارِ تو: فشارِ محکم و بی‌وقفه، و فرمان.",
      rule: MANUALE,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'A.B.S. (sistema antibloccaggio)", fa: "ABS (ترمزِ ضدِقفل)" },
        { it: "il bloccaggio delle ruote", fa: "قفل شدنِ چرخ‌ها" },
        { it: "bloccarsi", fa: "قفل شدن", base: "bloccarsi" },
        { it: "la frenata di emergenza", fa: "ترمزِ اضطراری" },
        { it: "il pedale del freno", fa: "پدالِ ترمز" },
        { it: "premere con forza", fa: "محکم فشار دادن", base: "premere" },
        { it: "la traiettoria", fa: "مسیرِ حرکت" },
        { it: "gli pneumatici usurati", fa: "لاستیک‌های فرسوده" },
        { it: "la retromarcia", fa: "دنده‌عقب" },
      ],
    },
    {
      kind: "trap",
      title: "وقتی ABS واردِ کار شد: «continuare» یا «diminuire»؟",
      body: "هر دو جمله با همان موقعیت شروع می‌شوند. فقط کاری که پا می‌کند فرق دارد:",
      examples: [
        {
          sourceId: "6954",
          textIt: "In caso di frenata di emergenza, con entrata in azione dell'ABS, bisogna continuare a premere con forza il pedale, senza allentare la pressione",
          answer: 1,
          chunks: [
            { it: EMERG, fa: EMERG_FA, focus: "condition" },
            { it: "bisogna continuare a premere con forza il pedale,", fa: "باید پدال را همچنان محکم فشار داد،", verb: "bisogna ← bisognare" },
            { it: "senza allentare la pressione", fa: "بی‌آن‌که فشار را کم کنی", verb: "allentare ← allentare", focus: "negation" },
          ],
          translation: "در ترمزِ اضطراری، وقتی ABS واردِ کار می‌شود، باید پدال را همچنان محکم فشار داد، بی‌آن‌که فشار را کم کنی.",
          why: "درست است. ABS فقط وقتی کار می‌کند که پدال فشرده بماند.",
        },
        {
          sourceId: "6959",
          textIt: "In caso di frenata di emergenza, con entrata in azione dell'ABS, bisogna immediatamente diminuire la pressione esercitata sul pedale del freno",
          answer: 0,
          chunks: [
            { it: EMERG, fa: EMERG_FA, focus: "condition" },
            { it: "bisogna immediatamente diminuire la pressione", fa: "باید فوراً فشار را کم کرد", verb: "bisogna ← bisognare", focus: "contrast" },
            { it: "esercitata sul pedale del freno", fa: "که روی پدالِ ترمز وارد می‌شود" },
          ],
          translation: "در ترمزِ اضطراری، وقتی ABS واردِ کار می‌شود، باید فوراً فشاری را که روی پدالِ ترمز وارد می‌شود کم کرد.",
          why: "غلط است. پای سبک یعنی ترمزِ کمتر؛ لرزشِ پدال طبیعی است.",
        },
      ],
      takeaway: "با ABS، «continuare a premere» درست است؛ «diminuire» یا «allentare» یعنی جمله غلط است.",
      rule: MANUALE,
    },
  ],
  practice: [
    {
      sourceId: "6905",
      textIt: "L'A.B.S. consente di correggere la traiettoria del veicolo anche durante una frenata di emergenza",
      answer: 1,
      chunks: [
        { it: ABS_IT, fa: "ABS" },
        { it: "consente di correggere la traiettoria del veicolo", fa: "اجازه می‌دهد مسیرِ وسیله را اصلاح کنی", verb: "consente ← consentire" },
        { it: "anche durante una frenata di emergenza", fa: "حتی در ترمزِ اضطراری" },
      ],
      translation: "ABS اجازه می‌دهد حتی در ترمزِ اضطراری مسیرِ وسیله را اصلاح کنی.",
      why: "درست است (قدم ۱). چرخی که قفل نشده هنوز به فرمان جواب می‌دهد.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "6912",
      textIt: "L'A.B.S. impedisce, durante la frenata, di modificare la traiettoria del veicolo",
      answer: 0,
      chunks: [
        { it: ABS_IT, fa: "ABS" },
        { it: "impedisce, durante la frenata,", fa: "در هنگامِ ترمز نمی‌گذارد", verb: "impedisce ← impedire", focus: "contrast" },
        { it: "di modificare la traiettoria del veicolo", fa: "مسیرِ وسیله را تغییر دهی" },
      ],
      translation: "ABS در هنگامِ ترمز نمی‌گذارد مسیرِ وسیله را تغییر دهی.",
      why: "غلط است (قدم ۱). وارونه است: چون چرخ‌ها قفل نمی‌شوند، در ترمز هم می‌توانی فرمان بدهی.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "6915",
      textIt: "L'A.B.S. non si attiva se gli pneumatici sono usurati",
      answer: 0,
      chunks: [
        { it: ABS_IT, fa: "ABS" },
        { it: "non si attiva", fa: "فعال نمی‌شود", verb: "si attiva ← attivarsi", focus: "negation" },
        { it: "se gli pneumatici sono usurati", fa: "اگر لاستیک‌ها فرسوده باشند", focus: "condition" },
      ],
      translation: "اگر لاستیک‌ها فرسوده باشند، ABS فعال نمی‌شود.",
      why: "غلط است (قدم ۲). ABS با لاستیکِ فرسوده هم کار می‌کند؛ فقط چسبندگیِ ازدست‌رفته را برنمی‌گرداند.",
      rule: TECNICA,
      conceptStep: 2,
    },
    {
      sourceId: "7003",
      textIt: "In caso di frenata di emergenza, il conducente deve inserire rapidamente la retromarcia",
      answer: 0,
      chunks: [
        { it: "In caso di frenata di emergenza,", fa: "در ترمزِ اضطراری،", focus: "condition" },
        { it: "il conducente deve inserire rapidamente la retromarcia", fa: "راننده باید فوراً دنده‌عقب بگذارد", verb: "deve ← dovere", focus: "contrast" },
      ],
      translation: "در ترمزِ اضطراری، راننده باید فوراً دنده‌عقب بگذارد.",
      why: "غلط است (قدم ۳). ترمزِ اضطراری یعنی پدالِ ترمز، محکم و بی‌وقفه؛ دنده‌عقب هیچ کمکی نمی‌کند.",
      rule: MANUALE,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6904", "6905", "6906", "6907", "6911", "6912", "6913", "6914"] },
    { step: 2, sourceIds: ["6908", "6909", "6915"] },
    { step: 3, sourceIds: ["6954", "6959", "7003"] },
  ],
};

export const lessonFreniImpianto: Lesson = {
  id: "freni-calore-discese-stazionamento",
  titleFa: "ترمز چطور کار می‌کند: گرما، سرازیری، ترمزِ دستی",
  titleIt: "IMPIANTO FRENANTE · FRENO MOTORE · SERVOFRENO · FRENO DI STAZIONAMENTO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی ترمز حرکت را با اصطکاک به گرما تبدیل می‌کند و چرا ترمزِ داغ ضعیف می‌شود؛ در سرازیریِ طولانی چه کنی؛ ترمزِ کمکی و روغنِ ترمز چه نقشی دارند؛ و ترمزِ دستی برای چیست و برای چه نیست. هر جا خودروی دنده‌اتومات، هیبریدی یا برقی فرق دارد، جدا گفته می‌شود.",
      why:
        "۲۱ سؤال. جمله‌ی غلط یا ترمزِ دستی را جای ترمزِ پایی می‌گذارد («در سرازیری با آن ترمز کن»)، یا دنده خلاص را صرفه‌جویی جا می‌زند، یا چیزی را «بی‌نیاز از بررسی» می‌خواند («مدارِ ترمز بسته است، سطحش را نگاه نکن»)، یا ترمزِ کمکیِ مکشی را با موتورِ خاموش «فعال» می‌داند.",
      rule: `${TECNICA}; ${MANUALE}`,
    },
    {
      kind: "table",
      title: "ترمز حرکت را به گرما تبدیل می‌کند",
      body:
        "ترمز با اصطکاکِ لنت روی دیسک یا کاسه، انرژیِ حرکتِ خودرو را به گرما تبدیل می‌کند. لنت‌ها بیشترین گرما را تحمل می‌کنند. اگر پشتِ سرِ هم و طولانی ترمز کنی، گرما فرصتِ رفتن ندارد و ترمز ضعیف می‌شود:",
      columns: ["چه می‌شود", "چه کنی"],
      rows: [
        { label: "انرژیِ حرکت ← گرما", it: "l'energia cinetica viene trasformata in calore", values: ["همیشه، در هر ترمز", "—"] },
        { label: "لنتِ ترمز", it: "le guarnizioni di attrito", values: ["بیشترین گرما را تحمل می‌کند", "لنتِ فرسوده یا داغ ترمز را ضعیف می‌کند (درسِ ۵)"] },
        { label: "ترمزِ طولانی و پشتِ سرِ هم", it: "l'uso prolungato e ripetuto dei freni", values: ["ترمز داغ و ضعیف می‌شود", "در سرازیری از ترمزِ موتور کمک بگیر (قدمِ ۲)"] },
        { label: "بعد از شستنِ خودرو", it: "dopo il lavaggio del veicolo", values: ["دیسک و لنتِ خیس کمتر می‌گیرند", "در جای امن و آرام یک ترمزِ آزمایشی بگیر"] },
      ],
      takeaway: "ترمزِ داغ ترمزِ ضعیف است. ترمز را پشتِ سرِ هم نکش؛ کمکش کن.",
      rule: TECNICA,
    },
    {
      kind: "table",
      title: "سرازیریِ طولانی: ترمزِ موتور، نه ترمزِ دستی",
      body:
        "در سرازیریِ طولانی و تند، دنده‌ی سنگین بگذار تا موتور سرعت را نگه دارد و ترمز داغ نشود. این را ترمزِ موتور می‌گویند و در دنده‌ی یک از همه قوی‌تر است. فصلِ ۱۱ («سرازیریِ طولانی: نه دنده خلاص، نه موتورِ خاموش») همین را از طرفِ سرعت و ترمزِ کمکی درس داده:",
      columns: ["درست یا نه", "یادت باشد"],
      rows: [
        { label: "دنده‌ی سنگین", it: "inserire una marcia bassa", values: ["درست: ترمزِ موتور کمک می‌کند", "دنده‌ی یک بیشترین ترمزِ موتور را دارد"] },
        { label: "دنده خلاص «برای صرفه‌جویی»", it: "marciare con il cambio in folle", values: ["غلط", "ترمزِ موتور از دست می‌رود و ترمز زودتر داغ می‌شود"] },
        { label: "ترمزِ دستیِ نیمه‌کشیده", it: "il freno a mano inserito parzialmente", values: ["غلط", "ترمزِ دستی برای ترمز گرفتن در حرکت نیست؛ داغ و خراب می‌شود"] },
        { label: "دنده‌اتومات", it: "cambio automatico", values: ["همان فکر", `از وضعیتِ دنده‌ی سنگین (مثلاً L یا حالتِ دستی) استفاده کن؛ ${MODEL_NOTE}`] },
        { label: "هیبریدی و برقی", it: "frenata rigenerativa", values: ["موتورِ برقی هم خودرو را کند می‌کند و انرژی را به باتری برمی‌گرداند", "دفترچه می‌گوید این ترمز را چطور بیشتر کنی؛ ترمزِ پایی را باز هم نرم و کوتاه بگیر"] },
      ],
      takeaway: "سرازیری: دنده‌ی سنگین (یا حالتِ مشابه)، ترمزِ پایی کوتاه و گاه‌به‌گاه. نه دنده خلاص، نه ترمزِ دستی.",
      rule: `${TECNICA}; ${MANUALE}`,
    },
    {
      kind: "table",
      title: "ترمزِ کمکی و روغنِ ترمز",
      body:
        "در بیشترِ خودروهای سبک، فشارِ پا را ترمزِ کمکی (servofreno) بیشتر می‌کند. ترمزِ کمکیِ مکشی مکشش را از موتورِ روشن می‌گیرد. فشار را روغنِ ترمز در لوله‌ها تا چرخ‌ها می‌برد:",
      columns: ["چه می‌کند", "یادت باشد"],
      rows: [
        { label: "ترمزِ کمکی", it: "il servofreno", values: ["با همان فشارِ پا ترمزِ بیشتری می‌دهد", "در وسیله‌های سبک رایج است"] },
        { label: "ترمزِ کمکیِ مکشی، موتور خاموش", it: "il servofreno a depressione · a motore spento", values: ["کار نمی‌کند (بعد از چند بار ترمز، کمک تمام می‌شود)", "ترمز هنوز هست، ولی پدال سفت می‌شود؛ روشن بودنِ سوئیچ کافی نیست"] },
        { label: "هیبریدی و برقی", it: "veicoli ibridi ed elettrici", values: ["موتورِ برقی مکش نمی‌سازد؛ کمکِ ترمز در بسیاری از آن‌ها با پمپ یا سیستمِ برقی است", `بعضی هیبریدی‌ها برای ترمزِ کمکی هنوز به موتورِ بنزینی تکیه دارند؛ ${MODEL_NOTE}`] },
        { label: "روغنِ ترمز", it: "il liquido idraulico dei freni", values: ["فشار را تا ترمزِ هر چرخ می‌برد", "سطحش را مرتب در مخزنش ببین؛ مدارِ ترمز «بسته» است، ولی بی‌نیاز از بررسی نیست"] },
      ],
      takeaway: "موتورِ احتراقیِ خاموش یعنی ترمزِ کمکیِ مکشی هم خاموش. روغنِ ترمز را مرتب نگاه کن؛ عوض کردنش کارِ تعمیرگاه است، با زمانی که سازنده می‌گوید.",
      rule: `${TECNICA}; ${MANUALE}`,
    },
    {
      kind: "table",
      title: "ترمزِ دستی: برای پارک و اضطرار",
      body:
        "ترمزِ دستی (freno di stazionamento) خودروی ایستاده را نگه می‌دارد، حتی در سربالایی و سرازیری. ترمزِ پایی (freno di servizio) برای کند کردن و ایستادن در حرکت است. همه‌ی خودروها هم اهرمِ دستی ندارند:",
      columns: ["برای چیست", "یادت باشد"],
      rows: [
        { label: "پارک، حتی در شیب", it: "bloccare il veicolo in sosta · anche su strade in pendenza", values: ["بله: همیشه بکش", "باید خودرو را در شیب هم نگه دارد؛ اگر نمی‌دارد، بدهِ تعمیرگاه"] },
        { label: "اضطرار", it: "per situazioni di emergenza", values: ["بله", "مثلاً اگر ترمزِ پایی دیگر کار نکند"] },
        { label: "ترمز گرفتن در حرکت", it: "per la frenatura di servizio", values: ["نه", "این کارِ ترمزِ پایی است"] },
        { label: "شکلِ کنترل", it: "con comando manuale", values: ["همیشه اهرمِ دستی نیست", "در بعضی خودروها دکمه‌ی برقی است، در بعضی پدالِ کوچک؛ دفترچه را بخوان"] },
      ],
      takeaway: "ترمزِ دستی = خودروی ایستاده، یا اضطرار. برای کند کردن در حرکت، ترمزِ پایی.",
      rule: `${TECNICA}; ${MANUALE}`,
    },
    {
      kind: "classify",
      title: "تمرین: کدام ترمز؟",
      body: `${EXERCISE} برای هر موقعیت، ترمزی را انتخاب کن که کار اصلاً برایش ساخته شده:`,
      options: [
        { it: "freno di servizio (pedale)", fa: "ترمزِ پایی" },
        { it: "freno motore (marcia bassa)", fa: "ترمزِ موتور (دنده‌ی سنگین)" },
        { it: "freno di stazionamento", fa: "ترمزِ دستی" },
      ],
      items: [
        { prompt: "پشتِ چراغِ قرمز کند می‌شوی و می‌ایستی", answer: 0, explain: "ایستادن در حرکت کارِ ترمزِ پایی است (قدمِ ۴)." },
        { prompt: "سرازیریِ طولانیِ کوهستانی؛ نمی‌خواهی سرعت بالا برود", answer: 1, explain: "دنده‌ی سنگین سرعت را نگه می‌دارد و ترمز داغ نمی‌شود (قدمِ ۲)." },
        { prompt: "خودرو را در یک خیابانِ شیب‌دار پارک کرده‌ای", answer: 2, explain: "ترمزِ دستی خودروی ایستاده را در شیب نگه می‌دارد (قدمِ ۴)." },
        { prompt: "ناگهان بچه‌ای جلوی خودرو می‌دود", answer: 0, explain: "ترمزِ اضطراری با پدال، محکم و بی‌وقفه (درسِ ۳)." },
        { prompt: "چرخ را عوض می‌کنی و خودرو نباید تکان بخورد", answer: 2, explain: "ترمزِ دستی، به‌اضافه‌ی دنده یا P (درسِ ۸)." },
      ],
      takeaway: "پدال برای کند شدن، دنده برای نگه داشتنِ سرعت در سرازیری، ترمزِ دستی برای ایستاده ماندن.",
      rule: MANUALE,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'impianto frenante", fa: "سیستمِ ترمز" },
        { it: "le guarnizioni di attrito", fa: "لنتِ ترمز" },
        { it: "il surriscaldamento", fa: "داغ شدنِ بیش از حد" },
        { it: "il freno motore", fa: "ترمزِ موتور" },
        { it: "la marcia bassa", fa: "دنده‌ی سنگین" },
        { it: "in folle", fa: "دنده خلاص" },
        { it: "il servofreno a depressione", fa: SERVO_FA },
        { it: "il liquido dei freni", fa: "روغنِ ترمز (مایعِ ترمز، نه روغنِ موتور)" },
        { it: "il freno di stazionamento", fa: "ترمزِ دستی" },
        { it: "la frenatura di servizio", fa: "ترمز گرفتن با ترمزِ پایی" },
      ],
    },
    {
      kind: "trap",
      title: "«a motore spento»: ترمزِ کمکی کار می‌کند؟",
      body: "هر دو جمله درباره‌ی ترمزِ کمکیِ مکشی با موتورِ خاموش‌اند. دومی یک «شرط» هم اضافه می‌کند:",
      examples: [
        {
          sourceId: "6998",
          textIt: "Il servofreno a depressione non può funzionare a motore spento",
          answer: 1,
          chunks: [
            { it: "Il servofreno a depressione", fa: SERVO_FA },
            { it: "non può funzionare", fa: "نمی‌تواند کار کند", verb: "può ← potere", focus: "negation" },
            { it: "a motore spento", fa: "با موتورِ خاموش", focus: "condition" },
          ],
          translation: "ترمزِ کمکیِ مکشی با موتورِ خاموش نمی‌تواند کار کند.",
          why: "درست است. مکش را موتورِ روشن می‌سازد.",
        },
        {
          sourceId: "7002",
          textIt: "Il servofreno a depressione può funzionare anche a motore spento, purché sia inserita la chiave di accensione nel quadro",
          answer: 0,
          chunks: [
            { it: "Il servofreno a depressione", fa: SERVO_FA },
            { it: "può funzionare anche a motore spento,", fa: "با موتورِ خاموش هم می‌تواند کار کند،", verb: "può ← potere", focus: "contrast" },
            { it: "purché sia inserita la chiave di accensione nel quadro", fa: "به شرطِ این‌که سوئیچ در جایش باشد", focus: "condition" },
          ],
          translation: "ترمزِ کمکیِ مکشی با موتورِ خاموش هم می‌تواند کار کند، به شرطِ این‌که سوئیچ در جایش باشد.",
          why: "غلط است. سوئیچ مکش نمی‌سازد؛ موتور می‌سازد.",
        },
      ],
      takeaway: "«purché sia inserita la chiave» یک شرطِ ساختگی است. ترمزِ کمکیِ مکشی فقط با موتورِ روشن.",
      rule: TECNICA,
    },
  ],
  practice: [
    {
      sourceId: "6994",
      textIt: "Le parti dell’impianto frenante maggiormente sollecitate dalle alte temperature sono le guarnizioni di attrito",
      answer: 1,
      chunks: [
        { it: "Le parti dell’impianto frenante", fa: "بخش‌هایی از سیستمِ ترمز" },
        { it: "maggiormente sollecitate dalle alte temperature", fa: "که بیشتر از همه زیرِ فشارِ دمای بالا هستند" },
        { it: "sono le guarnizioni di attrito", fa: "لنت‌های ترمزند", verb: "sono ← essere" },
      ],
      translation: "بخش‌هایی از سیستمِ ترمز که بیشتر از همه زیرِ فشارِ دمای بالا هستند، لنت‌های ترمزند.",
      why: "درست است (قدم ۱). اصطکاک روی لنت است، پس گرما هم بیشتر آن‌جاست.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "6962",
      textIt: "Percorrendo lunghe e ripide discese è opportuno marciare con il cambio in folle per risparmiare carburante e freni",
      answer: 0,
      chunks: [
        { it: "Percorrendo lunghe e ripide discese", fa: "در سرازیری‌های طولانی و تند", focus: "condition", verb: "percorrendo ← percorrere" },
        { it: "è opportuno marciare con il cambio in folle", fa: "بهتر است با دنده خلاص رفت", focus: "contrast" },
        { it: "per risparmiare carburante e freni", fa: "تا در سوخت و ترمز صرفه‌جویی شود", focus: "reason" },
      ],
      translation: "در سرازیری‌های طولانی و تند، بهتر است با دنده خلاص رفت تا در سوخت و ترمز صرفه‌جویی شود.",
      why: "غلط است (قدم ۲). دنده خلاص ترمزِ موتور را حذف می‌کند و ترمز زودتر داغ و ضعیف می‌شود.",
      rule: TECNICA,
      conceptStep: 2,
    },
    {
      sourceId: "6957",
      textIt: "Percorrendo lunghe e ripide discese è necessario inserire una marcia bassa per evitare di surriscaldare i freni",
      answer: 1,
      chunks: [
        { it: "Percorrendo lunghe e ripide discese", fa: "در سرازیری‌های طولانی و تند", focus: "condition", verb: "percorrendo ← percorrere" },
        { it: "è necessario inserire una marcia bassa", fa: "لازم است دنده‌ی سنگین گذاشت" },
        { it: "per evitare di surriscaldare i freni", fa: "تا ترمزها بیش از حد داغ نشوند", focus: "reason" },
      ],
      translation: "در سرازیری‌های طولانی و تند، لازم است دنده‌ی سنگین گذاشت تا ترمزها بیش از حد داغ نشوند.",
      why: "درست است (قدم ۲). ترمزِ موتور بخشی از کار را از دوشِ ترمز برمی‌دارد.",
      rule: TECNICA,
      conceptStep: 2,
    },
    {
      sourceId: "7000",
      textIt: "Il circuito frenante dei veicoli leggeri è di tipo a circuito sigillato, pertanto non è necessario un periodico controllo del livello del liquido idraulico",
      answer: 0,
      chunks: [
        { it: "Il circuito frenante dei veicoli leggeri", fa: "مدارِ ترمزِ وسیله‌های سبک" },
        { it: "è di tipo a circuito sigillato,", fa: "از نوعِ مدارِ بسته است،" },
        { it: "pertanto non è necessario", fa: "پس لازم نیست", focus: "negation" },
        { it: "un periodico controllo del livello del liquido idraulico", fa: "سطحِ روغنِ ترمز را مرتب بررسی کرد" },
      ],
      translation: "مدارِ ترمزِ وسیله‌های سبک از نوعِ مدارِ بسته است، پس لازم نیست سطحِ روغنِ ترمز را مرتب بررسی کرد.",
      why: "غلط است (قدم ۳). سطحِ روغنِ ترمز را باید مرتب در مخزنش دید؛ کم شدنش می‌تواند نشانه‌ی خرابی یا لنتِ فرسوده باشد.",
      rule: MANUALE,
      conceptStep: 3,
    },
    {
      sourceId: "6960",
      textIt: "Tutti i veicoli sono dotati del freno di stazionamento che si aziona con comando manuale",
      answer: 0,
      chunks: [
        { it: "Tutti i veicoli", fa: "همه‌ی وسیله‌ها", focus: "always" },
        { it: "sono dotati del freno di stazionamento", fa: "ترمزِ دستی دارند", verb: "sono dotati ← dotare" },
        { it: "che si aziona con comando manuale", fa: "که با کنترلِ دستی کار می‌کند", verb: "si aziona ← azionare" },
      ],
      translation: "همه‌ی وسیله‌ها ترمزِ دستی‌ای دارند که با کنترلِ دستی کار می‌کند.",
      why: "غلط است (قدم ۴). «همه» دام است: در بعضی خودروها ترمزِ دستی دکمه‌ی برقی یا پدالِ پایی است.",
      rule: MANUALE,
      conceptStep: 4,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6956", "6958", "6993", "6994", "7008", "7010"] },
    { step: 2, sourceIds: ["6955", "6957", "6962", "7001", "7023"] },
    { step: 3, sourceIds: ["6992", "6996", "6998", "7000", "7002"] },
    { step: 4, sourceIds: ["6960", "6961", "6995", "6997", "6999"] },
  ],
};

export const lessonFrenaturaInefficiente: Lesson = {
  id: "frenatura-poco-efficiente",
  titleFa: "ترمزِ ضعیف یا یک‌طرفه: علتِ واقعی و علتِ ساختگی",
  titleIt: "FRENATURA POCO EFFICIENTE · FRENI SQUILIBRATI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی چه چیزهایی ترمز را ضعیف یا نامتعادل (یک‌طرفه) می‌کنند، و چه چیزهایی که ربطی ندارند فقط شبیهِ علت‌اند. و می‌دانی ترمزِ نامتعادل چطور خودش را نشان می‌دهد و چرا تعمیرش کارِ تعمیرگاه است.",
      why:
        "۱۸ سؤال. همه‌ی جمله‌های این گروه با «ترمزِ ضعیف یا نامتعادل ممکن است ناشی از…» شروع می‌شوند. برای هر کدام بپرس: این چیز به خودِ ترمز، به فشارِ روغنِ ترمز، یا به چسبندگیِ چرخ‌ها ربط دارد؟ اگر نه (فرمانِ کمکی، کلاچ، سوختِ متان)، علت نیست.",
      rule: TECNICA,
    },
    {
      kind: "factors",
      title: "علت هست یا نیست؟",
      body:
        "ترمز سه جا ضعیف می‌شود: خودِ قطعه‌ها (لنت، دیسک، کاسه)، مدارِ هیدرولیک (هوا یا بخار در روغنِ ترمز)، و چسبندگیِ چرخ‌ها (فشارِ متفاوتِ لاستیک‌های یک محور، بارِ زیاد یا بد چیده‌شده). هر چیزِ دیگری فقط شبیهِ علت است:",
      columns: [
        {
          title: "می‌تواند علت باشد (VERO)",
          items: [
            { fa: "لنتِ خیلی فرسوده", it: "dal consumo eccessivo delle guarnizioni frenanti", sourceId: "7005", textIt: "Una frenatura poco efficiente o squilibrata può essere causata dal consumo eccessivo delle guarnizioni frenanti", answer: 1 },
            { fa: "سایشِ نامنظمِ دیسک یا کاسه", it: "dal consumo irregolare dei tamburi o dei dischi", sourceId: "7006", textIt: "Una frenatura poco efficiente o squilibrata può essere causata dal consumo irregolare dei tamburi o dei dischi", answer: 1 },
            { fa: "بارِ زیاد یا بد چیده‌شده", it: "dal carico eccessivo o mal ripartito", sourceId: "7009", textIt: "Una frenatura poco efficiente o squilibrata può essere causata dal carico eccessivo o mal ripartito", answer: 1 },
          ],
        },
        {
          title: "علت نیست (FALSO)",
          items: [
            { fa: "فرسودگیِ قطعه‌های ترمزِ دستی", it: "dal consumo eccessivo dei meccanismi del freno di stazionamento", sourceId: "7014", textIt: "Una frenatura poco efficiente o squilibrata può essere causata dal consumo eccessivo dei meccanismi del freno di stazionamento", answer: 0 },
            { fa: "لقیِ زیادِ پدالِ کلاچ", it: "dall’eccessivo gioco del pedale della frizione", sourceId: "7016", textIt: "Una frenatura poco efficiente o squilibrata può essere causata dall’eccessivo gioco del pedale della frizione", answer: 0 },
            { fa: "داشتنِ فرمانِ کمکی در خودروی کوچک", it: "dalla presenza del servosterzo su veicoli di piccola cilindrata", sourceId: "7017", textIt: "Una frenatura poco efficiente o squilibrata può essere causata dalla presenza del servosterzo su veicoli di piccola cilindrata", answer: 0 },
            { fa: "ترمزِ دیسکی روی محورِ عقب", it: "dalla presenza di freni a disco sull’asse posteriore", sourceId: "7018", textIt: "Una frenatura poco efficiente o squilibrata può essere causata dalla presenza di freni a disco sull’asse posteriore", answer: 0 },
            { fa: "لاستیکِ زمستانی روی هر چهار چرخ", it: "da pneumatici invernali montati su tutte e quattro le ruote", sourceId: "7019", textIt: "Una frenatura poco efficiente o squilibrata può essere causata da pneumatici invernali montati su tutte e quattro le ruote", answer: 0 },
            { fa: "خودروی گازسوز (متان) در جاده‌ی کوهستانی", it: "dall’utilizzo di veicoli con alimentazione a metano su strade di montagna", sourceId: "7021", textIt: "Una frenatura poco efficiente o squilibrata può essere causata dall’utilizzo di veicoli con alimentazione a metano su strade di montagna", answer: 0 },
          ],
        },
      ],
      takeaway: "لنت، دیسک، کاسه، روغنِ ترمز، فشارِ لاستیک، بار: علت. ترمزِ دستی، کلاچ، فرمانِ کمکی، نوعِ سوخت: علت نیست.",
      rule: TECNICA,
    },
    {
      kind: "table",
      title: "ترمزِ نامتعادل چطور خودش را نشان می‌دهد",
      body:
        "ترمزِ نامتعادل یعنی ترمزِ یک طرف (یا یک چرخ) بیشتر از طرفِ دیگر می‌گیرد. نشانه‌هایش را بشناس، و اگر دیدی، خودرو را به تعمیرگاه ببر:",
      columns: ["چه می‌بینی", "چرا"],
      rows: [
        { label: "فقط چرخ‌های یک طرف قفل می‌شوند", it: "si blocchino soltanto le ruote di un lato", values: ["در ترمزِ محکم", "ترمزِ آن طرف زودتر و بیشتر می‌گیرد"] },
        { label: "خودرو به یک طرف می‌کشد", it: "dirigendosi verso il lato della ruota che si blocca per prima", values: ["به سمتِ چرخی که اول قفل می‌شود", "همان طرف بیشتر ترمز می‌کند"] },
        { label: "سایشِ نامنظمِ آج", it: "un’usura irregolare e non omogenea dei battistrada", values: ["لاستیک‌ها یکسان نمی‌سایند", "یک چرخ بیشتر از بقیه می‌لغزد"] },
        { label: "داغ شدنِ مایعِ خنک‌کننده", it: "un surriscaldamento del liquido refrigerante del motore", values: ["ربطی ندارد", "مایعِ خنک‌کننده مالِ موتور است، نه ترمز (فصلِ ۱۸)"] },
        { label: "عوض کردنِ لنت", it: "il cambio delle pastiglie dei freni", values: ["کارِ هر راننده‌ای نیست", "ترمز قطعه‌ی ایمنی است؛ تعمیر و تعویضش را به تعمیرگاه بسپار"] },
      ],
      takeaway: "خودرو در ترمز به یک طرف کشید؟ احتمالاً ترمزِ نامتعادل یا فشارِ نابرابرِ لاستیک‌ها. بررسی‌اش کارِ تعمیرگاه است.",
      rule: TECNICA,
    },
    {
      kind: "classify",
      title: "تمرین: علت هست یا نیست؟",
      body: `${EXERCISE} راننده‌ای می‌گوید ترمزش ضعیف شده یا خودرو در ترمز به یک طرف می‌کشد. هر توضیح را بسنج:`,
      options: [
        { it: "può esserne la causa", fa: "می‌تواند علت باشد" },
        { it: "non c'entra", fa: "ربطی ندارد" },
      ],
      items: [
        { prompt: "لاستیکِ جلوِ چپ خیلی کم‌بادتر از جلوِ راست است", answer: 0, explain: "فشارِ متفاوت در یک محور یعنی چسبندگیِ متفاوت؛ ترمز یک‌طرفه می‌شود (قدمِ ۱)." },
        { prompt: "خودرو فرمانِ کمکی دارد", answer: 1, explain: "فرمانِ کمکی به ترمز ربطی ندارد (قدمِ ۱)." },
        { prompt: "تمامِ بارِ سنگین در یک گوشه‌ی صندوق است", answer: 0, explain: "بارِ بد چیده‌شده وزن را روی چرخ‌ها نابرابر می‌کند (قدمِ ۱)." },
        { prompt: "بعد از یک سرازیریِ طولانی که مدام ترمز گرفته، پدال نرم شده", answer: 0, explain: "گرمای زیاد می‌تواند در روغنِ ترمز بخار بسازد و لنت را ضعیف کند (قدمِ ۱؛ درسِ ۴)." },
        { prompt: "خودرو با گازِ مایع (LPG) کار می‌کند", answer: 1, explain: "مثلِ متان: نوعِ سوخت روی ترمز اثری ندارد (قدمِ ۱)." },
      ],
      takeaway: "علتِ واقعی یا به خودِ ترمز برمی‌گردد، یا به روغنِ ترمز، یا به چسبندگیِ چرخ‌ها.",
      rule: TECNICA,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la frenatura poco efficiente", fa: "ترمزِ ضعیف" },
        { it: "squilibrato", fa: "نامتعادل (یک‌طرفه)" },
        { it: "le guarnizioni frenanti", fa: "لنتِ ترمز" },
        { it: "le pastiglie dei freni", fa: "لنت‌های دیسکی" },
        { it: "i dischi · i tamburi", fa: "دیسکِ ترمز · کاسه‌ی ترمز" },
        { it: "il circuito frenante idraulico", fa: "مدارِ هیدرولیکِ ترمز" },
        { it: "l'aria o il vapore", fa: "هوا یا بخار" },
        { it: "il carico mal ripartito", fa: "بارِ بد چیده‌شده" },
        { it: "il battistrada", fa: "آجِ لاستیک" },
      ],
    },
    {
      kind: "trap",
      title: "«Con freni squilibrati»: چه چیزی داغ می‌شود؟",
      body: "هر دو جمله با «با ترمزهای نامتعادل» شروع می‌شوند. یکی نشانه‌ی واقعی را می‌گوید، دیگری چیزی بی‌ربط:",
      examples: [
        {
          sourceId: "7011",
          textIt: "Con freni squilibrati può avvenire che, in frenata, si blocchino soltanto le ruote di un lato",
          answer: 1,
          chunks: [
            { it: SQUIL, fa: SQUIL_FA, focus: "condition" },
            { it: "può avvenire che, in frenata,", fa: "ممکن است هنگامِ ترمز پیش بیاید که", verb: "può ← potere" },
            { it: "si blocchino soltanto le ruote di un lato", fa: "فقط چرخ‌های یک طرف قفل شوند", verb: "si blocchino ← bloccarsi", focus: "limit" },
          ],
          translation: "با ترمزهای نامتعادل، ممکن است هنگامِ ترمز پیش بیاید که فقط چرخ‌های یک طرف قفل شوند.",
          why: "درست است. ترمزِ آن طرف زودتر و بیشتر می‌گیرد.",
        },
        {
          sourceId: "7022",
          textIt: "Con freni squilibrati si manifesta in genere un surriscaldamento del liquido refrigerante del motore",
          answer: 0,
          chunks: [
            { it: SQUIL, fa: SQUIL_FA, focus: "condition" },
            { it: "si manifesta in genere", fa: "معمولاً دیده می‌شود", verb: "si manifesta ← manifestarsi" },
            { it: "un surriscaldamento del liquido refrigerante del motore", fa: "داغ شدنِ بیش از حدِ مایعِ خنک‌کننده‌ی موتور", focus: "contrast" },
          ],
          translation: "با ترمزهای نامتعادل، معمولاً داغ شدنِ بیش از حدِ مایعِ خنک‌کننده‌ی موتور دیده می‌شود.",
          why: "غلط است. مایعِ خنک‌کننده موتور را خنک می‌کند، ربطی به ترمز ندارد.",
        },
      ],
      takeaway: "نشانه‌های ترمزِ نامتعادل در چرخ‌ها و لاستیک‌هاست: قفل شدنِ یک طرف، کشیدن به یک طرف، سایشِ نامنظم.",
      rule: TECNICA,
    },
  ],
  practice: [
    {
      sourceId: "7004",
      textIt: "Una frenatura poco efficiente o squilibrata può essere causata dalla presenza d’aria o vapore nel circuito frenante idraulico",
      answer: 1,
      chunks: [
        { it: POCO, fa: POCO_FA, verb: "può ← potere" },
        { it: "dalla presenza d’aria o vapore", fa: "وجودِ هوا یا بخار باشد" },
        { it: "nel circuito frenante idraulico", fa: "در مدارِ هیدرولیکِ ترمز" },
      ],
      translation: "ترمزِ ضعیف یا نامتعادل ممکن است ناشی از وجودِ هوا یا بخار در مدارِ هیدرولیکِ ترمز باشد.",
      why: "درست است (قدم ۱). روغنِ ترمز فشرده نمی‌شود، ولی هوا و بخار فشرده می‌شوند؛ پدال نرم می‌شود و ترمز کم می‌گیرد.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "7015",
      textIt: "Una frenatura poco efficiente o squilibrata può essere causata dall’insufficiente lubrificazione dei tamburi o dei dischi",
      answer: 0,
      chunks: [
        { it: POCO, fa: POCO_FA, verb: "può ← potere" },
        { it: "dall’insufficiente lubrificazione dei tamburi o dei dischi", fa: "روغن‌کاریِ ناکافیِ کاسه یا دیسک باشد", focus: "contrast" },
      ],
      translation: "ترمزِ ضعیف یا نامتعادل ممکن است ناشی از روغن‌کاریِ ناکافیِ کاسه یا دیسک باشد.",
      why: "غلط است (قدم ۱). دیسک و کاسه هیچ‌وقت روغن‌کاری نمی‌شوند؛ ترمز با اصطکاک کار می‌کند و روغن روی آن‌ها خودش ترمز را ضعیف می‌کند.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "7012",
      textIt: "Con freni squilibrati può avvenire che, in frenata, il veicolo sbandi, dirigendosi verso il lato della ruota che si blocca per prima",
      answer: 1,
      chunks: [
        { it: SQUIL, fa: SQUIL_FA, focus: "condition" },
        { it: "può avvenire che, in frenata, il veicolo sbandi,", fa: "ممکن است هنگامِ ترمز وسیله منحرف شود،", verb: "sbandi ← sbandare" },
        { it: "dirigendosi verso il lato della ruota", fa: "و به سمتِ چرخی برود", verb: "dirigendosi ← dirigersi" },
        { it: "che si blocca per prima", fa: "که اول قفل می‌شود", verb: "si blocca ← bloccarsi" },
      ],
      translation: "با ترمزهای نامتعادل، ممکن است هنگامِ ترمز وسیله منحرف شود و به سمتِ چرخی برود که اول قفل می‌شود.",
      why: "درست است (قدم ۲). طرفی که بیشتر ترمز می‌کند، خودرو را به سمتِ خودش می‌کشد.",
      rule: TECNICA,
      conceptStep: 2,
    },
    {
      sourceId: "7024",
      textIt: "Il cambio delle pastiglie dei freni è un’operazione di manutenzione ordinaria che può essere svolta da qualunque conducente",
      answer: 0,
      chunks: [
        { it: "Il cambio delle pastiglie dei freni", fa: "عوض کردنِ لنت‌های دیسکی" },
        { it: "è un’operazione di manutenzione ordinaria", fa: "یک کارِ نگهداریِ معمولی است" },
        { it: "che può essere svolta da qualunque conducente", fa: "که هر راننده‌ای می‌تواند انجامش دهد", verb: "può ← potere", focus: "always" },
      ],
      translation: "عوض کردنِ لنت‌های دیسکی یک کارِ نگهداریِ معمولی است که هر راننده‌ای می‌تواند انجامش دهد.",
      why: "غلط است (قدم ۲). ترمز قطعه‌ی ایمنی است؛ تعویضِ لنت را باید تعمیرگاه انجام دهد و درست بودنش را بسنجد.",
      rule: MANUALE,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["7004", "7005", "7006", "7007", "7009", "7014", "7015", "7016", "7017", "7018", "7019", "7020", "7021"] },
    { step: 2, sourceIds: ["7011", "7012", "7013", "7022", "7024"] },
  ],
};
