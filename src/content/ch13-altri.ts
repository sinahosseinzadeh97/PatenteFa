/**
 * src/content/ch13-altri.ts
 * Chapter 13 (Norme di circolazione), lessons 10 and 11: the other people on
 * the road. L10: a pedestrian outside the crossing who does not give way,
 * a corteo in town, the car ahead slow to start at green, and what the horn
 * may and may not do (CdS artt. 156, 163, 191). L11: dazzled by oncoming high
 * beams at night, the right use of the beams (art. 153), and the luminous
 * messages on police cars (art. 192 c.1, read with art. 140).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter13.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS = (n: number) => `Codice della Strada, art. ${n}`;

const PEDONE = "In un centro abitato, quando un pedone, fuori delle strisce di attraversamento, non accenni a darci la precedenza,";
const PEDONE_FA = "در آبادی، وقتی عابری بیرون از خط‌کشی عابر پیاده نشانه‌ای از راه دادن به ما نشان نمی‌دهد،";
const CORTEO = "Quando, in un centro abitato, il conducente di un veicolo si imbatte in un corteo,";
const CORTEO_FA = "وقتی راننده در آبادی به یک دسته‌ی راهپیمایی برمی‌خورد،";
const NOTTE = "Allorché di notte, su strada extraurbana, incrociamo un veicolo con fari a luce abbagliante accesi,";
const NOTTE_FA = "وقتی شب، در جاده‌ی برون‌شهری، از کنارِ خودرویی رد می‌شویم که نورِ بالایش روشن است،";

export const lessonPedoniCortei: Lesson = {
  id: "norme-pedoni-cortei",
  titleFa: "عابر، دسته‌ی راهپیمایی و کسی که دیر راه می‌افتد",
  titleIt: "PEDONI · CORTEI · CLACSON",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی وقتی در شهر کسی سرِ راهت است، چه می‌کنی: عابری که بیرون از خط‌کشی رد می‌شود، دسته‌ی راهپیمایی، و خودرویی که سرِ چراغِ سبز دیر راه می‌افتد. و می‌دانی بوق کِی مجاز است و کِی نه.",
      why:
        "۳۱ سؤال، با یک دامِ تکراری: «حق تقدم با من است، پس ادامه می‌دهم» یا «با بوق کارش را راه می‌اندازم». جوابِ این فصل تقریباً همیشه یکی است: سرعت را کم کن، صبر کن، و بوق فقط برای خطرِ واقعی و فوری.",
      rule: `${CDS(191)} c.1–3; ${CDS(163)} c.2; ${CDS(156)} c.1–3`,
    },
    {
      kind: "table",
      title: "عابری که راه نمی‌دهد",
      body:
        "حق تقدم به تو اجازه‌ی زدن به کسی را نمی‌دهد. اگر عابری بیرون از خط‌کشی شروع به رد شدن کرده، قانون می‌خواهد بگذاری به آن طرف برسد؛ اگر روی گذرگاه عابر پیاده است، باید برایش آهسته کنی و بایستی. ولی «همیشه جلوی هر گذرگاه بایست» هم غلط است: می‌ایستی وقتی کسی رد می‌شود.",
      columns: ["چه کنی", "دامِ بانک"],
      rows: [
        {
          label: "عابر بیرون از خط‌کشی، و راه نمی‌دهد",
          it: "pedone fuori delle strisce",
          values: ["سرعت را کم کن و اگر لازم شد به‌موقع بایست تا به او نزنی", "«ادامه بده، حق تقدم با ماست» غلط است"],
        },
        {
          label: "خطرِ فوری است",
          it: "in caso di pericolo immediato",
          values: ["آهسته کن و با یک بوقِ کوتاه خبرش کن", "«با هر وسیله‌ای حواسش را جلب کن» یا «شب نورِ بالا بزن تا ببیند» غلط است"],
        },
        {
          label: "عابر روی گذرگاه عابر پیاده رد می‌شود",
          it: "pedoni che attraversano sugli attraversamenti",
          values: ["حق تقدم با اوست؛ آهسته کن و بایست", "«همیشه جلوی گذرگاه بایست و فقط اگر کسی نیامد راه بیفت» غلط است؛ ایستادن برای عابری است که رد می‌شود"],
        },
      ],
      takeaway: "عابر جلوی توست؟ سرعت کم، آماده‌ی ایستادن. بوق فقط یک ضربه‌ی کوتاه و فقط در خطرِ فوری.",
      rule: `${CDS(191)} c.1–3; ${CDS(156)} c.3`,
    },
    {
      kind: "table",
      title: "دسته‌ی راهپیمایی در شهر",
      body:
        "قانون قطع کردنِ دسته‌ی راهپیمایی، دسته‌های مذهبی و صفِ سربازان یا دانش‌آموزان را ممنوع می‌کند. بقیه‌ی جواب‌های بانک از همین یک قاعده می‌آیند: نمی‌توانی از میانشان رد شوی، پس کنار می‌کشی و صبر می‌کنی، یا اگر درست می‌شود از خیابانِ دیگری می‌روی.",
      columns: ["چه کنی", "چه نکنی"],
      rows: [
        {
          label: "به دسته رسیدی",
          it: "si imbatte in un corteo",
          values: ["سمتِ راست بایست و صبر کن تا سواره‌رو خالی شود", "به دسته بزنی یا از میانش راه باز کنی، حتی «با احتیاط»"],
        },
        {
          label: "پیش از دوباره راه افتادن",
          it: "che esso sia transitato completamente",
          values: ["مطمئن شو همه‌ی دسته رد شده", "بر اساسِ «کم‌جمعیت بودنِ» دسته از آن بگذری یا قطعش کنی"],
        },
        {
          label: "بوق",
          it: "evitare di suonare il clacson",
          values: ["بوق نزن", "«آرام بوق بزن تا زودتر راه را باز کنند» یا «اگر عجله داری با بوقِ پیوسته رد شو»"],
        },
        {
          label: "راهِ دیگر",
          it: "imbocchi una strada laterale",
          values: ["اگر می‌شود درست انجامش داد، به خیابانِ فرعی بپیچ", "تند دنده‌عقب تا تقاطعِ قبلی، یا دور زدن، وقتی جریانِ ترافیک را می‌بندد"],
        },
        {
          label: "چراغ‌ها",
          it: "luci di profondità",
          values: ["چراغِ معمولی", "«نورِ بالا روشن کن تا بهتر ببینی»"],
        },
      ],
      takeaway: "دسته‌ی راهپیمایی را قطع نمی‌کنی: بایست سمتِ راست، بی‌بوق، و صبر کن تا تمامش رد شود.",
      rule: `${CDS(163)} c.2; ${CDS(156)} c.3`,
    },
    {
      kind: "table",
      title: "چراغ سبز شد و خودروی جلو راه نمی‌افتد",
      body:
        "در آبادی بوق ممنوع است مگر برای خطرِ واقعی و فوری. خودرویی که سرِ سبز دیر راه می‌افتد خطر نیست، پس بوق برای «بجنب» ممنوع است. همین قاعده چند دامِ دیگرِ بانک را هم جواب می‌دهد.",
      columns: ["قاعده", "دامِ بانک"],
      rows: [
        {
          label: "خودروی جلو سرِ سبز دیر راه می‌افتد",
          it: "il veicolo che precede tarda a riprendere la marcia",
          values: ["با حوصله صبر کن؛ اگر لازم است و بی‌خطر، به راننده‌ی مانده کمک کن", "«پشتِ سرِ هم بوق بزن»، «با بوق بقیه را خبر کن»، «ترمزدستی بکش و برو مأمور بیاور»"],
        },
        {
          label: "رد شدن از او",
          it: "manovre pericolose",
          values: ["با مانورِ خطرناک از او سبقت نگیر", "«هرطور شده زود سواره‌رو را خالی کن، حتی با دور زدن»"],
        },
        {
          label: "بوق در آبادی",
          it: "uso del segnalatore acustico",
          values: ["فقط در خطرِ واقعی و فوری، و تا جای ممکن کوتاه", "«نزدیکِ هر گذرگاه دوچرخه بوق بزن» غلط است"],
        },
        {
          label: "بوقِ دوصدایی",
          it: "trombe bitonali",
          values: ["مالِ وسیله‌های امدادی است؛ روی خودروی معمولی نصب نمی‌کنی", "«نصب کن ولی فقط بیرونِ آبادی بزن» غلط است"],
        },
      ],
      takeaway: "بوق ابزارِ هشدار در خطر است، نه ابزارِ عجله. در آبادی: فقط خطرِ فوری، فقط کوتاه.",
      rule: `${CDS(156)} c.1–3; ${CDS(140)} c.1`,
    },
    {
      kind: "classify",
      title: "بوق بزنم یا نه؟",
      body: "موقعیت را بخوان و بگو بوق جایز است یا نه. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "un breve colpo", fa: "یک بوقِ کوتاه جایز است" },
        { it: "niente clacson", fa: "بوق نزن" },
      ],
      items: [
        {
          prompt: "در شهر، کودکی ناگهان از پشتِ خودروی پارک‌شده به سمتِ خیابان می‌دود",
          answer: 0,
          explain: "خطرِ واقعی و فوری: آهسته کن، آماده‌ی ایستادن باش، و یک بوقِ کوتاه اشکالی ندارد.",
        },
        {
          prompt: "چراغ سبز شده و خودروی جلویی هنوز راه نیفتاده",
          answer: 1,
          explain: "خطری در کار نیست. در آبادی بوق برای «راه بیفت» ممنوع است؛ صبر کن.",
        },
        {
          prompt: "یک دسته‌ی راهپیمایی خیابان را گرفته و تو عجله داری",
          answer: 1,
          explain: "دسته را قطع نمی‌کنی و بوق هم نمی‌زنی. کنار بکش و صبر کن، یا اگر درست می‌شود از خیابانِ دیگری برو.",
        },
        {
          prompt: "در شهر به یک گذرگاه دوچرخه نزدیک می‌شوی و کسی آن‌جا نیست",
          answer: 1,
          explain: "گذرگاه به‌تنهایی خطرِ فوری نیست؛ آهسته کن و نگاه کن، بوق لازم نیست.",
        },
      ],
      takeaway: "سؤالِ اصلی: خطرِ واقعی و فوری هست؟ اگر نه، در آبادی بوق نمی‌زنی.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il pedone", fa: "عابر پیاده" },
        { it: "accennare", fa: "نشانه‌ای نشان دادن؛ قصدِ کاری را نشان دادن", note: "«non accenni a darci la precedenza» یعنی نشانه‌ای از راه دادن نشان نمی‌دهد." },
        { it: "il corteo", fa: "دسته‌ی راهپیمایی" },
        { it: "imbattersi in", fa: "برخوردن به؛ ناگهان رسیدن به", base: "imbattersi" },
        { it: "il clacson · il segnalatore acustico", fa: "بوق" },
        { it: "sollecitare", fa: "به عجله واداشتن؛ هُل دادن کسی به کاری" },
        { it: "tardare a riprendere la marcia", fa: "دیر دوباره راه افتادن", base: "tardare" },
        { it: "le trombe bitonali", fa: "بوقِ دوصدایی (مخصوصِ وسیله‌های امدادی)" },
      ],
    },
    {
      kind: "trap",
      title: "یک بوقِ کوتاه، یا بوقی برای راه باز کردن؟",
      body: "هر دو جمله از بوق حرف می‌زنند و هر دو «آرام» به نظر می‌رسند. فرق در دلیلِ بوق است:",
      examples: [
        {
          sourceId: "4410",
          textIt:
            "In un centro abitato, quando un pedone, fuori delle strisce di attraversamento, non accenni a darci la precedenza, è opportuno rallentare e avvisarlo con un breve colpo di clacson, in caso di pericolo immediato",
          answer: 1,
          chunks: [
            { it: PEDONE, fa: PEDONE_FA, verb: "accenni ← accennare", focus: "condition" },
            { it: "è opportuno rallentare", fa: "بهتر است آهسته کنی", verb: "è ← essere" },
            { it: "e avvisarlo con un breve colpo di clacson,", fa: "و با یک بوقِ کوتاه خبرش کنی،", verb: "avvisarlo ← avvisare" },
            { it: "in caso di pericolo immediato", fa: "در صورتِ خطرِ فوری", focus: "condition" },
          ],
          translation:
            "در آبادی، وقتی عابری بیرون از خط‌کشی عابر پیاده نشانه‌ای از راه دادن به ما نشان نمی‌دهد، بهتر است آهسته کنیم و در صورتِ خطرِ فوری با یک بوقِ کوتاه خبرش کنیم.",
          why: "درست است. در آبادی بوق فقط در خطرِ واقعی و فوری مجاز است، و باید تا جای ممکن کوتاه باشد. این‌جا هر دو شرط هست.",
        },
        {
          sourceId: "4421",
          textIt:
            "Quando, in un centro abitato, il conducente di un veicolo si imbatte in un corteo, deve suonare discretamente onde avvertire il corteo di far cessare al più presto l'ingombro",
          answer: 0,
          chunks: [
            { it: CORTEO, fa: CORTEO_FA, verb: "si imbatte ← imbattersi" },
            { it: "deve suonare discretamente", fa: "باید آرام بوق بزند", verb: "deve ← dovere" },
            { it: "onde avvertire il corteo", fa: "تا به دسته هشدار دهد", focus: "reason" },
            { it: "di far cessare al più presto l'ingombro", fa: "که هرچه زودتر راه را باز کنند" },
          ],
          translation:
            "وقتی راننده در آبادی به یک دسته‌ی راهپیمایی برمی‌خورد، باید آرام بوق بزند تا به دسته هشدار دهد که هرچه زودتر راه را باز کنند.",
          why: "غلط است. دسته‌ی راهپیمایی خطرِ فوری نیست؛ بوق زدن برای این‌که زودتر کنار بروند در آبادی ممنوع است، هرقدر هم «آرام» باشد. باید صبر کنی.",
        },
      ],
      takeaway: "پیش از بوق بپرس: خطرِ فوری است یا فقط عجله‌ی من؟ اولی یک بوقِ کوتاه؛ دومی هیچ.",
      rule: `${CDS(156)} c.3`,
    },
  ],
  practice: [
    {
      sourceId: "4409",
      textIt:
        "In un centro abitato, quando un pedone, fuori delle strisce di attraversamento, non accenni a darci la precedenza, è necessario ridurre la velocità e, occorrendo, fermarsi per non investirlo",
      answer: 1,
      chunks: [
        { it: PEDONE, fa: PEDONE_FA, verb: "accenni ← accennare", focus: "condition" },
        { it: "è necessario ridurre la velocità e, occorrendo, fermarsi", fa: "لازم است سرعت را کم کنی و اگر لازم شد بایستی", verb: "occorrendo ← occorrere" },
        { it: "per non investirlo", fa: "تا به او نزنی", focus: "reason", verb: "investirlo ← investire" },
      ],
      translation:
        "در آبادی، وقتی عابری بیرون از خط‌کشی عابر پیاده نشانه‌ای از راه دادن به ما نشان نمی‌دهد، لازم است سرعت را کم کنیم و اگر لازم شد بایستیم تا به او نزنیم.",
      why: "درست است (قدم ۱). عابری که رد شدن را شروع کرده باید بتواند به آن طرف برسد؛ تو سرعت را کم می‌کنی و آماده‌ی ایستادن هستی.",
      rule: `${CDS(191)} c.2`,
      conceptStep: 1,
    },
    {
      sourceId: "4414",
      textIt:
        "In un centro abitato, quando un pedone, fuori delle strisce di attraversamento, non accenni a darci la precedenza, è necessario proseguire, senza curarci di lui, perché abbiamo la precedenza",
      answer: 0,
      chunks: [
        { it: PEDONE, fa: PEDONE_FA, verb: "accenni ← accennare", focus: "condition" },
        { it: "è necessario proseguire,", fa: "لازم است ادامه دهی،" },
        { it: "senza curarci di lui,", fa: "بی‌آن‌که به او اهمیت دهیم،", verb: "curarci ← curarsi" },
        { it: "perché abbiamo la precedenza", fa: "چون حق تقدم با ماست", focus: "reason", verb: "abbiamo ← avere" },
      ],
      translation:
        "در آبادی، وقتی عابری بیرون از خط‌کشی عابر پیاده نشانه‌ای از راه دادن به ما نشان نمی‌دهد، لازم است بی‌توجه به او ادامه دهیم، چون حق تقدم با ماست.",
      why: "غلط است (قدم ۱). حق تقدم اجازه‌ی زدن به کسی را نمی‌دهد. عابری که در سواره‌روست، حتی بیرون از خط‌کشی، باید بتواند سالم به آن طرف برسد.",
      rule: `${CDS(191)} c.2`,
      conceptStep: 1,
    },
    {
      sourceId: "4418",
      textIt: "Quando, in un centro abitato, il conducente di un veicolo si imbatte in un corteo, deve accertarsi, prima di passare, che esso sia transitato completamente",
      answer: 1,
      chunks: [
        { it: CORTEO, fa: CORTEO_FA, verb: "si imbatte ← imbattersi" },
        { it: "deve accertarsi, prima di passare,", fa: "باید پیش از رد شدن مطمئن شود" },
        { it: "che esso sia transitato completamente", fa: "که دسته کاملاً رد شده است", verb: "sia transitato ← transitare" },
      ],
      translation: "وقتی راننده در آبادی به یک دسته‌ی راهپیمایی برمی‌خورد، باید پیش از رد شدن مطمئن شود که دسته کاملاً رد شده است.",
      why: "درست است (قدم ۲). قطع کردنِ دسته ممنوع است؛ پس تا آخرین نفر رد نشده، راه نمی‌افتی.",
      rule: `${CDS(163)} c.2`,
      conceptStep: 2,
    },
    {
      sourceId: "4422",
      textIt: "Quando, in un centro abitato, il conducente di un veicolo si imbatte in un corteo, deve cercare di farsi strada interrompendo il corteo, ma con estrema prudenza",
      answer: 0,
      chunks: [
        { it: CORTEO, fa: CORTEO_FA, verb: "si imbatte ← imbattersi" },
        { it: "deve cercare di farsi strada", fa: "باید سعی کند برای خودش راه باز کند", verb: "deve ← dovere" },
        { it: "interrompendo il corteo,", fa: "با قطع کردنِ دسته،", verb: "interrompendo ← interrompere" },
        { it: "ma con estrema prudenza", fa: "ولی با نهایتِ احتیاط", focus: "contrast" },
      ],
      translation: "وقتی راننده در آبادی به یک دسته‌ی راهپیمایی برمی‌خورد، باید سعی کند با قطع کردنِ دسته برای خودش راه باز کند، ولی با نهایتِ احتیاط.",
      why: "غلط است (قدم ۲). قطع کردنِ دسته‌ی راهپیمایی ممنوع است، با احتیاط یا بی‌احتیاط. «ma con estrema prudenza» جمله را درست نمی‌کند.",
      rule: `${CDS(163)} c.2`,
      conceptStep: 2,
    },
    {
      sourceId: "4430",
      textIt:
        "Nei centri abitati è vietato l'uso del segnalatore acustico per sollecitare il conducente del veicolo che precede a riprendere la marcia quando il semaforo diventa verde",
      answer: 1,
      chunks: [
        { it: "Nei centri abitati", fa: "در آبادی‌ها", focus: "condition" },
        { it: "è vietato l'uso del segnalatore acustico", fa: "استفاده از بوق ممنوع است", verb: "è vietato ← vietare", focus: "negation" },
        { it: "per sollecitare il conducente del veicolo che precede", fa: "برای این‌که راننده‌ی خودروی جلو را به عجله واداری", focus: "reason" },
        { it: "a riprendere la marcia", fa: "که دوباره راه بیفتد" },
        { it: "quando il semaforo diventa verde", fa: "وقتی چراغ سبز می‌شود", verb: "diventa ← diventare" },
      ],
      translation: "در آبادی‌ها استفاده از بوق برای این‌که راننده‌ی خودروی جلو را وقتی چراغ سبز می‌شود به راه افتادن واداری، ممنوع است.",
      why: "درست است (قدم ۳). در آبادی بوق فقط برای خطرِ واقعی و فوری است. دیر راه افتادنِ خودروی جلو خطر نیست.",
      rule: `${CDS(156)} c.3`,
      conceptStep: 3,
    },
  ],
  related: [
    {
      step: 1,
      // a pedestrian outside the crossing; pedestrians on the crossing
      sourceIds: ["4409", "4410", "4411", "4412", "4413", "4414", "4388", "4392"],
    },
    {
      step: 2,
      // a corteo in town
      sourceIds: ["4415", "4416", "4417", "4418", "4419", "4420", "4421", "4422", "4423", "4424", "4425", "4426"],
    },
    {
      step: 3,
      // the car ahead slow at green; what the horn may not do
      sourceIds: ["4427", "4428", "4429", "4430", "4431", "4432", "4433", "4434", "4435", "4368", "4369"],
    },
  ],
};

export const lessonNottePolizia: Lesson = {
  id: "norme-notte-polizia",
  titleFa: "شب، نورِ بالای روبه‌رو، و پیام‌های خودروی پلیس",
  titleIt: "ABBAGLIAMENTO · POLIZIA",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی وقتی شب نورِ بالای خودروی روبه‌رو چشمت را می‌زند چه کنی، کِی نورِ بالا و کِی نورِ پایین روشن می‌کنی، و پیام‌های نوشته روی سقفِ خودروی پلیس از تو چه می‌خواهند.",
      why:
        "۲۰ سؤال. دامِ اول «تلافی» است: او نورِ بالا دارد، پس من هم. دامِ دوم «حواسم را جای دیگر ببرم»: آینه‌ی وسط را تنظیم کنم یا دستم را جلوی چشمم بگیرم. دامِ سوم در پیام‌های پلیس است: «فقط برای کامیون‌هاست» یا «یعنی بپیچ».",
      rule: `${CDS(153)} c.1–3; ${CDS(192)} c.1; ${CDS(140)} c.1`,
    },
    {
      kind: "table",
      title: "نورِ بالای روبه‌رو چشمت را زد",
      body:
        "قانون از راننده‌ی روبه‌رو می‌خواهد پیش از رسیدن به تو نورِ بالا را خاموش کند. اگر نکرد، تو با نورِ پایین، آهسته و محتاط ادامه می‌دهی. همین قاعده کلِ استفاده از نورِ بالا را هم توضیح می‌دهد: بیرونِ آبادی، وقتی روشناییِ خیابان نیست یا کم است؛ و هر بار که ممکن است کسی را خیره کنی، نورِ پایین.",
      columns: ["چه کنی", "دامِ بانک"],
      rows: [
        {
          label: "چراغ‌های خودت",
          it: "usando le luci anabbaglianti",
          values: ["نورِ پایین را نگه دار و با احتیاط برو", "«تو هم نورِ بالا بزن تا جاده را بهتر ببینی» غلط است: دو راننده‌ی خیره‌شده به‌جای یکی"],
        },
        {
          label: "چشم‌هایت",
          it: "distogliere lo sguardo",
          values: ["نگاهت را از نورش بگیر (به لبه‌ی راستِ جاده)", "«دست‌هایت را جلوی چشمت بگیر» غلط است: دست باید روی فرمان باشد"],
        },
        {
          label: "سرعت و فرمان",
          it: "rallentare · evitare brusche manovre",
          values: ["آهسته کن و اگر لازم شد بایست؛ مانورِ ناگهانی و عوض کردنِ خط عبور نه؛ دیدِ کم‌شده را در نظر بگیر", "«فوراً بایست» غلط است: ایستادنِ ناگهانی خودش خطر است"],
        },
        {
          label: "آینه‌ی وسط",
          it: "retrovisore in posizione antiabbagliante",
          values: ["کمکی نمی‌کند: نورِ روبه‌رو از جلو می‌آید", "حالتِ ضدِ تابشِ آینه برای نورِ خودروی پشتِ سر است (درس ۱۳)"],
        },
        {
          label: "بوق",
          it: "trombe bitonali",
          values: ["نه بوق، نه بوقِ دوصدایی", "«با بوقِ دوصدایی حواسش را جلب کن» غلط است"],
        },
        {
          label: "نورِ بالا و پایین به‌طورِ کلی",
          it: "abbaglianti · anabbaglianti",
          values: ["شب در آبادی نورِ پایین؛ نورِ بالا فقط بیرونِ آبادی و بی‌روشنایی، و نه هنگامِ رسیدن به خودروی روبه‌رو", "«همیشه نورِ بالا» یا «روز هم در شهر نورِ بالا» غلط است"],
        },
      ],
      takeaway: "خیره شدی؟ نورِ پایین، نگاه به راست، سرعت کم. هیچ‌وقت تلافی با نورِ بالا.",
      rule: `${CDS(153)} c.1–3`,
    },
    {
      kind: "table",
      title: "پیام‌های روی سقفِ خودروی پلیس",
      body:
        "قانون می‌گوید باید به دعوتِ مأموران برای ایستادن، که با علامتِ مناسب داده می‌شود، بایستی. پیامِ نوشته روی سقفِ خودروی پلیس یکی از همین علامت‌هاست. متنِ قانونی‌ای که تک‌تکِ این پیام‌ها را تعریف کند پیدا نکردیم؛ جدولِ زیر برداشتِ بانک است و با همه‌ی جواب‌هایش می‌خواند.",
      columns: ["یعنی چه", "دامِ بانک"],
      rows: [
        {
          label: "خودروی پلیس با آژیر از تو سبقت گرفته و جلویت آمده",
          it: "ACCOSTARE",
          values: ["کنار بکش و بایست", "«یعنی باید بپیچی» غلط است"],
        },
        {
          label: "همان، با نوشته‌ی",
          it: "ALT POLIZIA",
          values: ["فقط تو باید بایستی: پیام برای خودرویی است که پلیس جلویش آمده", "«همه‌ی خودروهای اطراف باید بایستند» نه"],
        },
        {
          label: "روی سقف نوشته",
          it: "INCIDENTE",
          values: ["جلوتر تصادف شده؛ سرعت را کم کن", "«یعنی این‌جا منطقه‌ی پرتصادف است» غلط است"],
        },
        {
          label: "روی سقف نوشته",
          it: "RALLENTARE",
          values: ["همه آهسته کنند", "«فقط برای وسیله‌های سنگین است» غلط است"],
        },
        {
          label: "هر پیامِ دیگری روی خودروی پلیس",
          it: "scritte luminose sui veicoli della polizia",
          values: ["هشدار یا دستورش را رعایت کن", "«فقط پیام است، اجباری نیست» نه"],
        },
      ],
      takeaway: "پیامِ روی خودروی پلیس هشدار یا دستور است و برای همه، مگر خودش بگوید برای کیست (ALT POLIZIA جلوی تو = فقط تو).",
      rule: `${CDS(192)} c.1; ${CDS(140)} c.1`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "i fari a luce abbagliante · gli abbaglianti", fa: "نورِ بالا", note: "در بانک «proiettori di profondità» و «luci di profondità» هم آمده؛ همان است." },
        { it: "gli anabbaglianti", fa: "نورِ پایین" },
        { it: "incrociare un veicolo", fa: "از کنارِ خودروی روبه‌رو رد شدن", base: "incrociare" },
        { it: "essere abbagliati", fa: "خیره شدن (از نور)", base: "abbagliare" },
        { it: "distogliere lo sguardo", fa: "نگاه را برگرداندن", base: "distogliere" },
        { it: "la posizione antiabbagliante", fa: "حالتِ ضدِ تابشِ آینه‌ی وسط" },
        { it: "la scritta luminosa", fa: "نوشته‌ی نورانی" },
        { it: "accostare", fa: "کنار کشیدن" },
      ],
    },
    {
      kind: "trap",
      title: "نورِ پایین، یا نورِ بالا برای بهتر دیدن؟",
      body: "هر دو جمله از چراغ‌های خودِ تو در همان لحظه حرف می‌زنند. یکی ایمنی را بالا می‌برد، یکی خطر را دوبرابر می‌کند:",
      examples: [
        {
          sourceId: "4436",
          textIt: "Allorché di notte, su strada extraurbana, incrociamo un veicolo con fari a luce abbagliante accesi, occorre procedere con prudenza, usando le luci anabbaglianti",
          answer: 1,
          chunks: [
            { it: NOTTE, fa: NOTTE_FA, verb: "incrociamo ← incrociare", focus: "condition" },
            { it: "occorre procedere con prudenza,", fa: "باید با احتیاط ادامه داد،", verb: "occorre ← occorrere" },
            { it: "usando le luci anabbaglianti", fa: "با نورِ پایین", verb: "usando ← usare" },
          ],
          translation: "وقتی شب، در جاده‌ی برون‌شهری، از کنارِ خودرویی رد می‌شویم که نورِ بالایش روشن است، باید با احتیاط و با نورِ پایین ادامه داد.",
          why: "درست است. هنگامِ رسیدن به خودروی روبه‌رو نورِ پایین واجب است، حتی اگر او قاعده را رعایت نکند.",
        },
        {
          sourceId: "4442",
          textIt: "Allorché di notte, su strada extraurbana, incrociamo un veicolo con fari a luce abbagliante accesi, occorre procedere a nostra volta con i fari abbaglianti, per veder meglio la strada",
          answer: 0,
          chunks: [
            { it: NOTTE, fa: NOTTE_FA, verb: "incrociamo ← incrociare", focus: "condition" },
            { it: "occorre procedere a nostra volta con i fari abbaglianti,", fa: "باید ما هم با نورِ بالا ادامه دهیم،", verb: "occorre ← occorrere" },
            { it: "per veder meglio la strada", fa: "تا جاده را بهتر ببینیم", focus: "reason", verb: "veder ← vedere" },
          ],
          translation: "وقتی شب، در جاده‌ی برون‌شهری، از کنارِ خودرویی رد می‌شویم که نورِ بالایش روشن است، باید ما هم با نورِ بالا ادامه دهیم تا جاده را بهتر ببینیم.",
          why: "غلط است. با نورِ بالا راننده‌ی روبه‌رو را خیره می‌کنی و حالا هر دو کم می‌بینید. «per veder meglio» دلیلی است که منطقی به نظر می‌رسد، ولی قانون هنگامِ رسیدن به خودروی روبه‌رو نورِ پایین می‌خواهد.",
        },
      ],
      takeaway: "خودروی روبه‌رو نزدیک است؟ نورِ پایین، هر کاری که او بکند.",
      rule: `${CDS(153)} c.3`,
    },
  ],
  practice: [
    {
      sourceId: "4437",
      textIt: "Allorché di notte, su strada extraurbana, incrociamo un veicolo con fari a luce abbagliante accesi, occorre distogliere lo sguardo dal fascio luminoso per non essere abbagliati",
      answer: 1,
      chunks: [
        { it: NOTTE, fa: NOTTE_FA, verb: "incrociamo ← incrociare", focus: "condition" },
        { it: "occorre distogliere lo sguardo dal fascio luminoso", fa: "باید نگاه را از پرتوِ نور برگرداند" },
        { it: "per non essere abbagliati", fa: "تا خیره نشویم", focus: "reason", verb: "essere abbagliati ← abbagliare" },
      ],
      translation: "وقتی شب، در جاده‌ی برون‌شهری، از کنارِ خودرویی رد می‌شویم که نورِ بالایش روشن است، باید نگاه را از پرتوِ نور برگرداند تا خیره نشویم.",
      why: "درست است (قدم ۱). به‌جای نگاه به چراغ‌ها، به لبه‌ی راستِ جاده نگاه کن؛ این‌طور چشمت کمتر خیره می‌شود و مسیرت را هم می‌بینی.",
      rule: `${CDS(153)} c.3`,
      conceptStep: 1,
    },
    {
      sourceId: "4441",
      textIt: "Allorché di notte, su strada extraurbana, incrociamo un veicolo con fari a luce abbagliante accesi, occorre disporre il retrovisore interno in posizione antiabbagliante",
      answer: 0,
      chunks: [
        { it: NOTTE, fa: NOTTE_FA, verb: "incrociamo ← incrociare", focus: "condition" },
        { it: "occorre disporre il retrovisore interno", fa: "باید آینه‌ی وسط را گذاشت" },
        { it: "in posizione antiabbagliante", fa: "در حالتِ ضدِ تابش" },
      ],
      translation: "وقتی شب، در جاده‌ی برون‌شهری، از کنارِ خودرویی رد می‌شویم که نورِ بالایش روشن است، باید آینه‌ی وسط را در حالتِ ضدِ تابش گذاشت.",
      why: "غلط است (قدم ۱). نورِ خودروی روبه‌رو از جلو می‌آید، نه از آینه. حالتِ ضدِ تابشِ آینه‌ی وسط برای نورِ خودروی پشتِ سر است.",
      rule: `${CDS(153)} c.3`,
      conceptStep: 1,
    },
    {
      sourceId: "4643",
      textIt: 'Se un\'auto della polizia, con sirena in funzione, vi sorpassa ponendosi davanti e sul tetto ha un display con la scritta luminosa "ACCOSTARE", avete l\'obbligo di arrestarvi',
      answer: 1,
      chunks: [
        { it: "Se un'auto della polizia, con sirena in funzione,", fa: "اگر یک خودروی پلیس با آژیرِ روشن،", focus: "condition" },
        { it: "vi sorpassa ponendosi davanti", fa: "از شما سبقت بگیرد و جلویتان قرار بگیرد", verb: "sorpassa ← sorpassare" },
        { it: 'e sul tetto ha un display con la scritta luminosa "ACCOSTARE",', fa: "و روی سقفش صفحه‌ای با نوشته‌ی نورانیِ «ACCOSTARE» (کنار بکش) باشد،", verb: "ha ← avere" },
        { it: "avete l'obbligo di arrestarvi", fa: "موظفید بایستید", verb: "arrestarvi ← arrestarsi" },
      ],
      translation: "اگر یک خودروی پلیس با آژیرِ روشن از شما سبقت بگیرد، جلویتان قرار بگیرد و روی سقفش صفحه‌ای با نوشته‌ی نورانیِ «ACCOSTARE» باشد، موظفید بایستید.",
      why: "درست است (قدم ۲). مأموران می‌توانند با علامتِ مناسب دستورِ ایستادن بدهند؛ «ACCOSTARE» یعنی کنار بکش و بایست.",
      rule: `${CDS(192)} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "4648",
      textIt: 'Se sul tetto di un\'auto della polizia è presente un display con la scritta luminosa "RALLENTARE", l\'obbligo è rivolto ai soli veicoli pesanti.',
      answer: 0,
      chunks: [
        { it: "Se sul tetto di un'auto della polizia", fa: "اگر روی سقفِ یک خودروی پلیس", focus: "condition" },
        { it: 'è presente un display con la scritta luminosa "RALLENTARE",', fa: "صفحه‌ای با نوشته‌ی نورانیِ «RALLENTARE» (آهسته کن) باشد،", verb: "è ← essere" },
        { it: "l'obbligo è rivolto ai soli veicoli pesanti.", fa: "این دستور فقط برای وسیله‌های سنگین است.", focus: "limit" },
      ],
      translation: "اگر روی سقفِ یک خودروی پلیس صفحه‌ای با نوشته‌ی نورانیِ «RALLENTARE» باشد، این دستور فقط برای وسیله‌های سنگین است.",
      why: "غلط است (قدم ۲). پیام هیچ گروهی را جدا نمی‌کند؛ هر کس آن را می‌بیند آهسته می‌کند.",
      rule: `${CDS(192)} c.1; ${CDS(140)} c.1`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // dazzled by oncoming high beams; when high and dipped beams are used
      sourceIds: ["4436", "4437", "4438", "4439", "4440", "4441", "4442", "4443", "4444", "4445", "4366", "4389", "4393"],
    },
    {
      step: 2,
      // luminous messages on police cars
      sourceIds: ["4642", "4643", "4644", "4645", "4646", "4647", "4648"],
    },
  ],
};
