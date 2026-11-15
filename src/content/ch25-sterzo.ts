/**
 * src/content/ch25-sterzo.ts
 * Chapter 25 (Elementi del veicolo, manutenzione e comportamenti), lesson 11:
 * steering and power steering (bank group 652).
 *
 * Hydraulic power steering needs the engine running; electric power steering
 * depends on the vehicle (on many cars the assistance also needs the engine
 * running). Without assistance the steering still works, only heavier.
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter25.test.ts.
 */
import type { Lesson } from "./lessons.js";
import { EXERCISE, MANUALE, MODEL_NOTE, TECNICA } from "./ch25-common.js";

const FORATURA = "In caso di foratura di un pneumatico, lo sterzo tira nella direzione";
const FORATURA_FA = "در پنچریِ یک لاستیک، فرمان به سمتِ";
const PREC = "La precisione della sterzata è influenzata";
const PREC_FA = "دقتِ فرمان گرفتن تحتِ تأثیرِ";

export const lessonSterzo: Lesson = {
  id: "sterzo-servosterzo",
  titleFa: "فرمان و فرمانِ کمکی: چه چیزی را خبر می‌دهند",
  titleIt: "STERZO · SERVOSTERZO · VOLANTE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی فرمانِ کمکی چه می‌کند و وقتی خراب شود چه حس می‌کنی، فرمان چه نشانه‌هایی از لاستیک، چرخ و تعلیق به تو می‌دهد (کشیدن، سنگینی، لرزش، لقی)، و غربیلکِ فرمان را چطور نگه داری و تنظیم کنی.",
      why:
        "۱۸ سؤال. جمله‌ی غلط جهت را برمی‌گرداند («به سمتِ مخالفِ چرخِ پنچر»، «بالانسِ چرخ‌های عقب»)، خرابی را وارونه نشان می‌دهد («فرمان خیلی سبک می‌شود»)، کارِ فرمانِ کمکی را به ترمز می‌کشد، یا چیزهای بی‌ربط به فرمان را مؤثر می‌داند (فشارِ روغنِ موتور، دمای مایعِ خنک‌کننده).",
      rule: TECNICA,
    },
    {
      kind: "table",
      title: "فرمانِ کمکی",
      body:
        "فرمانِ کمکی (servosterzo) چرخاندنِ فرمان را سبک می‌کند. نوعِ هیدرولیک با پمپی کار می‌کند که موتور می‌چرخاند؛ نوعِ برقی با یک موتورِ برقی. بی‌کمک هم فرمان کار می‌کند، فقط خیلی سنگین‌تر (فصلِ ۱۱ همین را در «سرازیریِ طولانی: نه دنده خلاص، نه موتورِ خاموش» گفته):",
      columns: ["چه می‌شود", "یادت باشد"],
      rows: [
        { label: "خرابیِ فرمانِ کمکی", it: "in caso di mal funzionamento del servosterzo", values: ["فرمان «سنگین» می‌شود", "«خیلی سبک می‌شود»: غلط"] },
        { label: "هیدرولیک، موتور خاموش", it: "il servosterzo idraulico · se il motore è spento", values: ["کار نمی‌کند", "فرمان هنوز می‌چرخد، با زورِ خیلی بیشتر"] },
        { label: "برقی", it: "servosterzo elettrico", values: ["به خودرو بستگی دارد", `در بسیاری از خودروها کمکش هم با موتورِ روشن است؛ ${MODEL_NOTE}`] },
        { label: "پنچری", it: "in caso di foratura di un pneumatico", values: ["فرمانِ کمکی کمک می‌کند خودرو را در مسیر نگه داری", "فرمان را محکم با دو دست نگه دار و نرم کند شو"] },
        { label: "ترمز", it: "migliora l'azione frenante", values: ["ربطی ندارد", "فرمانِ کمکی ترمز را بهتر نمی‌کند"] },
      ],
      takeaway: "فرمانِ کمکیِ خراب = فرمانِ سنگین. هیدرولیک فقط با موتورِ روشن.",
      rule: `${TECNICA}; ${MANUALE}`,
    },
    {
      kind: "table",
      title: "فرمان چه چیزی را خبر می‌دهد",
      body:
        "دقتِ فرمان به لاستیک، چرخ‌ها و سیستمِ تعلیق بستگی دارد. هر کدام نشانه‌ی خودش را در غربیلک می‌گذارد. این نشانه‌ها سرنخ‌اند؛ علت را تعمیرگاه پیدا می‌کند:",
      columns: ["احتمالاً از چیست", "یادت باشد"],
      rows: [
        { label: "به یک طرف می‌کشد", it: "lo sterzo tira nella direzione della ruota forata", values: ["پنچری: به سمتِ همان چرخِ پنچر", "«به سمتِ مخالف»: غلط"] },
        { label: "سنگین شده", it: "la “durezza” dello sterzo", values: ["می‌تواند از کم‌بادیِ لاستیک باشد", "فشار را بسنج (درسِ ۶)"] },
        { label: "می‌لرزد", it: "se lo sterzo vibra", values: ["بالانسِ چرخ‌های جلو", "«چرخ‌های عقب»: غلط"] },
        { label: "لقی دارد", it: "eccessivi giochi allo sterzo", values: ["مسیرِ خودرو نادقیق می‌شود", "لقیِ فرمان را مرتب بررسی کن"] },
        { label: "تنظیمِ زاویه‌ی چرخ‌ها", it: "la convergenza delle ruote", values: ["روی دقتِ فرمان اثر دارد", "—"] },
        { label: "تعلیق و کمک‌فنر", it: "le cattive condizioni delle sospensioni e degli ammortizzatori", values: ["روی دقتِ فرمان اثر دارند", "«اثر ندارند»: غلط (درس‌های ۹ و ۱۰)"] },
        { label: "فشارِ روغنِ موتور، دمای مایعِ خنک‌کننده", it: "la pressione dell’olio · la temperatura del liquido di raffreddamento", values: ["ربطی ندارند", "این‌ها مالِ موتورند؛ چراغ‌هایشان: فصلِ ۱۸"] },
      ],
      takeaway: "کشیدن = پنچری یا فشار؛ سنگینی = فشار یا فرمانِ کمکی؛ لرزش = بالانسِ جلو؛ لقی = مسیرِ نادقیق.",
      rule: TECNICA,
    },
    {
      kind: "table",
      title: "دست روی فرمان",
      body:
        "غربیلک را با دو دست، روی لبه‌اش و در دو طرف نگه دار (تقریباً جایی که عقربه‌های ساعت روی ۹ و ۳ هستند). دست‌ها پایین و زیرِ پره‌ها کنترل را کم می‌کنند و اگر کیسه‌ی هوا باز شود، در مسیرش‌اند:",
      columns: ["درست", "دام"],
      rows: [
        { label: "جای دست‌ها", it: "impugnato nella sua parte bassa", values: ["دو دست روی لبه، در دو طرف", "«پایینِ غربیلک، هر دو دست زیرِ پره‌ها»: غلط"] },
        { label: "تنظیمِ غربیلک", it: "il volante non può essere regolato in altezza", values: ["در بسیاری از خودروها ارتفاع (و گاهی فاصله) تنظیم می‌شود", `پیش از راه افتادن تنظیمش کن، هرگز در حرکت؛ ${MODEL_NOTE}`] },
      ],
      takeaway: "دو دست، دو طرفِ لبه. تنظیمِ صندلی و غربیلک پیش از حرکت.",
      rule: `${TECNICA}; ${MANUALE}`,
    },
    {
      kind: "classify",
      title: "تمرین: فرمان چه می‌گوید؟",
      body: `${EXERCISE} هر نشانه را به محتمل‌ترین علت وصل کن. سرنخ است، نه تشخیص؛ تعمیرگاه مطمئن می‌کند:`,
      options: [
        { it: "pressione dei pneumatici", fa: "فشارِ لاستیک‌ها" },
        { it: "bilanciatura delle ruote anteriori", fa: "بالانسِ چرخ‌های جلو" },
        { it: "servosterzo o giochi dello sterzo", fa: "فرمانِ کمکی یا لقیِ فرمان" },
      ],
      items: [
        { prompt: "غربیلک در یک سرعتِ مشخص شروع به لرزیدن می‌کند", answer: 1, explain: "لرزشِ فرمان = بالانسِ چرخ‌های جلو (قدمِ ۲)." },
        { prompt: "فرمان کمی سنگین شده و یکی از لاستیک‌ها کم‌باد به نظر می‌رسد", answer: 0, explain: "سنگینیِ فرمان می‌تواند از کم‌بادی باشد (قدمِ ۲)." },
        { prompt: "در حرکتِ آرام، فرمان ناگهان خیلی سنگین شد، با موتورِ روشن", answer: 2, explain: "فرمانِ کمکی احتمالاً از کار افتاده (قدمِ ۱)." },
        { prompt: "غربیلک را کمی می‌چرخانی و چرخ‌ها هنوز واکنش نمی‌دهند؛ خودرو در مسیرِ مستقیم این‌ور و آن‌ور می‌رود", answer: 2, explain: "لقیِ زیادِ فرمان مسیر را نادقیق می‌کند (قدمِ ۲)." },
        { prompt: "خودرو ناگهان به راست کشید و صدای تق‌تقِ لاستیک آمد", answer: 0, explain: "احتمالاً پنچریِ چرخِ راست؛ فرمان به سمتِ چرخِ پنچر می‌کشد. محکم نگه دار و نرم کند شو (قدمِ ۲)." },
      ],
      takeaway: "فرمان زبانِ لاستیک‌ها و چرخ‌هاست. یاد بگیر به آن گوش بدهی.",
      rule: TECNICA,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "lo sterzo", fa: "فرمان" },
        { it: "il volante", fa: "غربیلکِ فرمان" },
        { it: "il servosterzo (idraulico · elettrico)", fa: "فرمانِ کمکی (هیدرولیک یا برقی)" },
        { it: "pesante · la durezza", fa: "سنگین · سنگینیِ فرمان" },
        { it: "i giochi dello sterzo", fa: "لقیِ فرمان" },
        { it: "la convergenza delle ruote", fa: "تنظیمِ زاویه‌ی چرخ‌ها" },
        { it: "la bilanciatura", fa: "بالانسِ چرخ" },
        { it: "tirare", fa: "کشیدن (به یک طرف)", base: "tirare" },
        { it: "le razze", fa: "پره‌های غربیلک" },
        { it: "vibrare", fa: "لرزیدن", base: "vibrare" },
      ],
    },
    {
      kind: "trap",
      title: "«tira nella direzione…»: کدام طرف؟",
      body: "هر دو جمله درباره‌ی کشیدنِ فرمان در پنچری‌اند. فقط جهت فرق دارد:",
      examples: [
        {
          sourceId: "7073",
          textIt: "In caso di foratura di un pneumatico, lo sterzo tira nella direzione della ruota forata",
          answer: 1,
          chunks: [
            { it: FORATURA, fa: FORATURA_FA, focus: "condition", verb: "tira ← tirare" },
            { it: "della ruota forata", fa: "چرخِ پنچر می‌کشد" },
          ],
          translation: "در پنچریِ یک لاستیک، فرمان به سمتِ چرخِ پنچر می‌کشد.",
          why: "درست است. چرخِ خالی بیشتر می‌کشد و خودرو را به سمتِ خودش می‌برد.",
        },
        {
          sourceId: "7082",
          textIt: "In caso di foratura di un pneumatico, lo sterzo tira nella direzione opposta a quella della ruota forata",
          answer: 0,
          chunks: [
            { it: FORATURA, fa: FORATURA_FA, focus: "condition", verb: "tira ← tirare" },
            { it: "opposta a quella della ruota forata", fa: "مخالفِ چرخِ پنچر می‌کشد", focus: "contrast" },
          ],
          translation: "در پنچریِ یک لاستیک، فرمان به سمتِ مخالفِ چرخِ پنچر می‌کشد.",
          why: "غلط است. جهت وارونه است.",
        },
      ],
      takeaway: "پنچری: فرمان به سمتِ «ruota forata». «opposta» یعنی جمله غلط است.",
      rule: TECNICA,
    },
  ],
  practice: [
    {
      sourceId: "7076",
      textIt: "Il servosterzo idraulico non funziona se il motore è spento",
      answer: 1,
      chunks: [
        { it: "Il servosterzo idraulico", fa: "فرمانِ کمکیِ هیدرولیک" },
        { it: "non funziona", fa: "کار نمی‌کند", verb: "funziona ← funzionare", focus: "negation" },
        { it: "se il motore è spento", fa: "اگر موتور خاموش باشد", focus: "condition" },
      ],
      translation: "اگر موتور خاموش باشد، فرمانِ کمکیِ هیدرولیک کار نمی‌کند.",
      why: "درست است (قدم ۱). پمپش را موتور می‌چرخاند. فرمان هنوز می‌چرخد، با زورِ خیلی بیشتر.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "7084",
      textIt: "La rottura del servosterzo si manifesta con un’eccessiva facilità di manovra dello sterzo",
      answer: 0,
      chunks: [
        { it: "La rottura del servosterzo", fa: "خرابیِ فرمانِ کمکی" },
        { it: "si manifesta con un’eccessiva facilità di manovra dello sterzo", fa: "با سبکیِ بیش از حدِ فرمان خودش را نشان می‌دهد", verb: "si manifesta ← manifestarsi", focus: "contrast" },
      ],
      translation: "خرابیِ فرمانِ کمکی با سبکیِ بیش از حدِ فرمان خودش را نشان می‌دهد.",
      why: "غلط است (قدم ۱). وارونه است: فرمان سنگین می‌شود.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "7079",
      textIt: "Se lo sterzo vibra è bene far controllare la bilanciatura delle ruote anteriori",
      answer: 1,
      chunks: [
        { it: "Se lo sterzo vibra", fa: "اگر فرمان بلرزد", focus: "condition", verb: "vibra ← vibrare" },
        { it: "è bene far controllare", fa: "خوب است بدهی بررسی کنند" },
        { it: "la bilanciatura delle ruote anteriori", fa: "بالانسِ چرخ‌های جلو را" },
      ],
      translation: "اگر فرمان بلرزد، خوب است بدهی بالانسِ چرخ‌های جلو را بررسی کنند.",
      why: "درست است (قدم ۲). چرخ‌های جلو به فرمان وصل‌اند؛ بالانسِ بدشان در غربیلک حس می‌شود.",
      rule: TECNICA,
      conceptStep: 2,
    },
    {
      sourceId: "7088",
      textIt: "La precisione della sterzata è influenzata dalla scarsa pressione dell’olio di lubrificazione",
      answer: 0,
      chunks: [
        { it: PREC, fa: PREC_FA, verb: "è influenzata ← influenzare" },
        { it: "dalla scarsa pressione dell’olio di lubrificazione", fa: "فشارِ کمِ روغنِ موتور است", focus: "contrast" },
      ],
      translation: "دقتِ فرمان گرفتن تحتِ تأثیرِ فشارِ کمِ روغنِ موتور است.",
      why: "غلط است (قدم ۲). فشارِ روغن مالِ موتور است؛ اگر کم شود، چراغِ قرمزش روشن می‌شود (فصلِ ۱۸)، ولی فرمان دقتش را از دست نمی‌دهد.",
      rule: TECNICA,
      conceptStep: 2,
    },
    {
      sourceId: "7085",
      textIt: "Il volante deve essere impugnato nella sua parte bassa, con entrambe le mani sotto le razze",
      answer: 0,
      chunks: [
        { it: "Il volante deve essere impugnato", fa: "غربیلکِ فرمان را باید گرفت", verb: "deve ← dovere" },
        { it: "nella sua parte bassa,", fa: "از پایینش،", focus: "contrast" },
        { it: "con entrambe le mani sotto le razze", fa: "با هر دو دست زیرِ پره‌ها" },
      ],
      translation: "غربیلکِ فرمان را باید از پایینش، با هر دو دست زیرِ پره‌ها، گرفت.",
      why: "غلط است (قدم ۳). دو دست روی لبه، در دو طرف؛ از پایین کنترل کمتر است.",
      rule: MANUALE,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["7072", "7076", "7080", "7081", "7084"] },
    { step: 2, sourceIds: ["7073", "7074", "7075", "7077", "7078", "7079", "7082", "7083", "7087", "7088", "7089"] },
    { step: 3, sourceIds: ["7085", "7086"] },
  ],
};
