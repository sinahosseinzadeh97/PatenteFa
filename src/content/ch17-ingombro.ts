/**
 * src/content/ch17-ingombro.ts
 * Chapter 17 (Norme varie, autostrade, pannelli), lessons 1–2: what to do when
 * your vehicle or its load blocks the carriageway (CdS art. 161), and how to
 * presignal it with the warning triangle and the high-visibility vest (art. 162).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter17.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_161 = "Codice della Strada, art. 161";
const CDS_162 = "Codice della Strada, art. 162";
const CDS_176_8 = "Codice della Strada, art. 176 c.8 (100 m in autostrada)";
const REG_357 = "DPR 495/1992 (Regolamento), art. 357";
const REG_DETAIL = "dettagli (sabbia, segnali manuali dall'altro lato) dal programma ministeriale; non nel testo dell'art. 161";
const INGOMBRO = "Nel caso di ingombro della carreggiata";
const INGOMBRO_FA = "وقتی سواره‌رو بسته شده";
const CHIUNQUE = "Chiunque non abbia potuto evitare la caduta o lo spargimento";
const CHIUNQUE_FA = "هر کسی که نتوانسته جلوی افتادن یا پخش شدنِ";

// ── Lesson 1 ──────────────────────────────────────────────────────────────────

export const lessonIngombro: Lesson = {
  id: "ingombro-carreggiata",
  titleFa: "خودرو یا بارت راه را بست",
  titleIt: "INGOMBRO DELLA CARREGGIATA",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی وقتی خودرویت خراب شده، بارت روی جاده افتاده یا چیزِ لغزنده‌ای ریخته، به چه ترتیبی کار می‌کنی: اول راه را باز می‌کنی، تا وقتی مانع هست پیش‌آگهی می‌دهی و مالکِ جاده یا پلیس را خبر می‌کنی، و هیچ‌وقت منتظر نمی‌مانی.",
      why:
        "۲۰ سؤال. دامِ همه‌شان یکی است: جمله‌ای که به‌جای کار کردن «صبر کن» می‌گوید (منتظرِ امداد بمان، چیزی را جابه‌جا نکن تا پلیس بیاید، اگر علامت دادی لازم نیست پلیس را خبر کنی). قانون هر سه را رد می‌کند.",
      rule: `${CDS_161} c.1–3`,
    },
    {
      kind: "table",
      title: "سه کار، به همین ترتیب",
      body:
        "«ingombro della carreggiata» یعنی چیزی سواره‌رو را بسته: خودروی خراب، باری که افتاده، یا خودروهای تصادفی. فرقی نمی‌کند علتش چه باشد؛ ترتیبِ کار همین است:",
      columns: ["چه کنی", "چه نکنی"],
      rows: [
        {
          label: "۱. راه را باز کن",
          it: "rendere sollecitamente libero il transito",
          values: [
            "هر چه زودتر. خودروی خراب را بیرونِ سواره‌رو هُل بده؛ اگر نشد، کنارِ راستِ سواره‌رو ببر. بارِ افتاده را اگر می‌شود بردار",
            "«ترافیک کم است، لازم نیست جابه‌جایش کنم» غلط است. «جابه‌جا نکن تا ماجرا بازسازی شود» هم غلط است: این‌جا باز کردنِ راه مقدم است",
          ],
        },
        {
          label: "۲. تا مانع هست: پیش‌آگهی",
          it: "presegnalare con il segnale mobile triangolare",
          values: [
            "با مثلثِ خطر پیش‌آگهی بده (درسِ ۲)؛ اگر مثلث نداری، با وسیله‌ی مناسبِ دیگر. در تصادف، راننده یا سرنشین‌ها این کار را می‌کنند",
            "تابلوی STOP پیش‌آگهی نیست؛ چیزی که پشتِ مانع می‌گذاری مثلثِ خطر است",
          ],
        },
        {
          label: "۳. و خبر بده",
          it: "informare l'ente proprietario o un organo di polizia",
          values: [
            "مالکِ جاده (مثلاً شرکتِ آزادراه) یا پلیس را خبر کن. وقتی مانع برداشتنی نیست، این خبر و پیش‌آگهی هر دو لازم‌اند",
            "«با علامتِ دست پیش‌آگهی دادم، پس خبر دادن لازم نیست» یا «پلیس را خبر کردم، پس پیش‌آگهی لازم نیست» هر دو غلط‌اند",
          ],
        },
        {
          label: "در تمامِ مدت",
          it: "restare a bordo",
          values: ["تو کار می‌کنی: راه را باز می‌کنی یا علامت می‌دهی", "توی خودرو نشستن و منتظرِ امداد ماندن کارِ درستی نیست"],
        },
      ],
      takeaway: "ترتیب: باز کن؛ تا مانع هست، مثلث + خبر به مالکِ جاده یا پلیس. هر جمله‌ای که «صبر کن» یا «یکی از این دو کافی است» بگوید، غلط است.",
      rule: `${CDS_161} c.1, c.3`,
    },
    {
      kind: "table",
      title: "وقتی چیزِ لغزنده یا خطرناک ریخت",
      body:
        "روغن، گازوئیل، شن، مادّه‌ی آتش‌گیر: «materie viscide, infiammabili o comunque pericolose». خطرش از خودروی خراب هم بیشتر است، چون رانندگانِ بعدی آن را دیر می‌بینند و روی آن لیز می‌خورند. خودِ قانون فقط می‌گوید «احتیاط‌های لازم برای امن کردنِ رفت‌وآمد»، پیش‌آگهی و خبر دادن؛ این سه کارِ مشخص را برنامه‌ی وزارتخانه و بانکِ سؤال از آن نتیجه گرفته‌اند:",
      columns: ["چه کنی", "دامِ بانک"],
      rows: [
        {
          label: "مثلث بگذار",
          it: "anche in mezzo alla carreggiata",
          values: ["مثلثِ خطر را بگذار، حتی وسطِ سواره‌رو اگر لازم است", "«بوق زدم، پس مثلث لازم نیست» غلط است"],
        },
        {
          label: "از آن طرف با دست علامت بده",
          it: "segnali manuali dalla parte dove non è stato posto il segnale",
          values: [
            "مثلث یک طرف را می‌پوشاند. از طرفی که مثلث ندارد، با دست علامت بده تا خودروها رد نشوند",
            "«فقط از همان طرفی که مثلث هست» برعکسِ قانون است",
          ],
        },
        {
          label: "پاک کن یا چسبندگی را برگردان",
          it: "spargere sabbia, terra, segatura",
          values: [
            "اگر می‌شود بردار، یا شن، خاک، خاک‌اره یا هر مادّه‌ی مناسبِ دیگری رویش بریز تا لاستیک دوباره بگیرد",
            "«ترافیک را منحرف کن و منتظرِ مالکِ جاده بمان» غلط است: خودت کار می‌کنی",
          ],
        },
      ],
      takeaway: "مثلث از یک طرف، دست از طرفِ دیگر، و تا جایی که می‌شود پاک کردن. باز هم: کار کن، منتظر نمان.",
      rule: `${CDS_161} c.2–3; ${REG_DETAIL}`,
    },
    {
      kind: "classify",
      title: "تو چه می‌کنی؟",
      body: "هر موقعیت را بخوان و بگو اولین کارِ درست کدام است. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "liberare il transito", fa: "راه را باز کن" },
        { it: "presegnalare e avvisare la polizia", fa: "مثلث بگذار و خبر بده" },
        { it: "segnali manuali dall'altra parte", fa: "از طرفِ دیگر با دست علامت بده" },
      ],
      items: [
        {
          prompt: "باتریِ خودرویت در جاده‌ی برون‌شهری خوابید؛ خودرو را می‌شود هُل داد",
          answer: 0,
          explain: "اول هُل بده بیرونِ سواره‌رو، یا دست‌کم کنارِ راست. «ترافیک کم است» دلیلی برای ماندن نیست.",
        },
        {
          prompt: "یک کیسه از بارِ وانتت افتاده و سبک است",
          answer: 0,
          explain: "برش دار. باری که می‌شود برداشت، باید برداشته شود.",
        },
        {
          prompt: "یک تیرآهنِ سنگین افتاده و تنهایی تکان نمی‌خورد",
          answer: 1,
          explain: "برداشتنی نیست: پیش‌آگهی با مثلث، و خبر به مالکِ جاده یا پلیس. هر دو.",
        },
        {
          prompt: "گازوئیل روی سواره‌رو ریخته؛ مثلث را پشتِ آن گذاشته‌ای",
          answer: 2,
          explain: "مثلث فقط یک طرف را می‌پوشاند. از طرفی که مثلث ندارد با دست علامت بده.",
        },
      ],
      takeaway: "اول بپرس: می‌شود راه را باز کرد؟ بله ← باز کن. نه ← مثلث و خبر به مالکِ جاده یا پلیس. مادّه‌ی لغزنده ← مثلث، دست از طرفِ دیگر، شن.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'ingombro della carreggiata", fa: "بسته شدنِ سواره‌رو (مانع روی آن)" },
        { it: "l'avaria", fa: "خرابیِ خودرو" },
        { it: "la caduta accidentale del carico", fa: "افتادنِ اتفاقیِ بار" },
        { it: "rendere libero il transito", fa: "راه را برای عبور باز کردن", base: "rendere" },
        { it: "sollecitamente", fa: "فوراً، بی‌معطلی" },
        { it: "presegnalare", fa: "از پیش علامت دادن، پیش‌آگهی دادن" },
        { it: "il segnale mobile triangolare di pericolo", fa: "مثلثِ خطر", note: "در بانک «triangolo» یا «segnale di veicolo fermo» هم آمده." },
        { it: "l'organo di polizia", fa: "پلیس (هر نهادِ پلیسی)" },
        { it: "l'ente proprietario della strada", fa: "مالکِ جاده (شهرداری، استان، شرکتِ آزادراه)" },
        { it: "le materie viscide", fa: "مادّه‌های لغزنده" },
        { it: "la segatura", fa: "خاک‌اره" },
      ],
    },
    {
      kind: "trap",
      title: "پیش‌آگهی با کدام علامت؟",
      body: "هر دو جمله می‌گویند «باید پیش‌آگهی بدهی». فقط وسیله‌اش فرق می‌کند:",
      examples: [
        {
          sourceId: "5484",
          textIt:
            "Su strada extraurbana, nel caso di ingombro della carreggiata per caduta accidentale del carico, il conducente deve presegnalare l'ostacolo mediante il segnale di veicolo fermo (triangolo)",
          answer: 1,
          chunks: [
            { it: "Su strada extraurbana,", fa: "در جاده‌ی برون‌شهری،", focus: "condition" },
            { it: "nel caso di ingombro della carreggiata", fa: INGOMBRO_FA },
            { it: "per caduta accidentale del carico,", fa: "به‌خاطرِ افتادنِ اتفاقیِ بار،", focus: "reason" },
            { it: "il conducente deve presegnalare l'ostacolo", fa: "راننده باید از پیش مانع را علامت بدهد", verb: "deve ← dovere" },
            { it: "mediante il segnale di veicolo fermo (triangolo)", fa: "با علامتِ «خودروی متوقف» (مثلث)" },
          ],
          translation: "در جاده‌ی برون‌شهری، وقتی سواره‌رو به‌خاطرِ افتادنِ اتفاقیِ بار بسته شده، راننده باید با مثلثِ خطر از پیش مانع را علامت بدهد.",
          why: "درست است. باری که برداشتنی نیست، بیرونِ آبادی با مثلثِ خطر پیش‌آگهی داده می‌شود.",
        },
        {
          sourceId: "5486",
          textIt:
            "Nel caso di ingombro della carreggiata per caduta accidentale del carico il conducente deve presegnalare l'ostacolo mediante il segnale di STOP",
          answer: 0,
          chunks: [
            { it: INGOMBRO, fa: INGOMBRO_FA },
            { it: "per caduta accidentale del carico", fa: "به‌خاطرِ افتادنِ اتفاقیِ بار", focus: "reason" },
            { it: "il conducente deve presegnalare l'ostacolo", fa: "راننده باید از پیش مانع را علامت بدهد", verb: "deve ← dovere" },
            { it: "mediante il segnale di STOP", fa: "با تابلوی STOP", focus: "contrast" },
          ],
          translation: "وقتی سواره‌رو به‌خاطرِ افتادنِ اتفاقیِ بار بسته شده، راننده باید با تابلوی STOP از پیش مانع را علامت بدهد.",
          why: "غلط است. STOP تابلوی تقاطع است و راننده آن را با خودش نمی‌برد. چیزی که پشتِ مانع می‌گذاری مثلثِ خطر است.",
        },
      ],
      takeaway: "پیش‌آگهی = مثلثِ خطر (و در مادّه‌ی لغزنده، دست از طرفِ دیگر). STOP، بوق یا علامتِ دست به‌جای مثلث، غلط.",
      rule: `${CDS_161} c.3; ${CDS_162} c.1`,
    },
  ],
  practice: [
    {
      sourceId: "5488",
      textIt:
        "In caso di ingombro della carreggiata per avaria del veicolo, il conducente deve sollecitamente rendere libero il transito per il traffico sopraggiungente",
      answer: 1,
      chunks: [
        { it: "In caso di ingombro della carreggiata", fa: INGOMBRO_FA },
        { it: "per avaria del veicolo,", fa: "به‌خاطرِ خرابیِ خودرو،", focus: "reason" },
        { it: "il conducente deve sollecitamente rendere libero il transito", fa: "راننده باید فوراً راه را باز کند", verb: "deve ← dovere" },
        { it: "per il traffico sopraggiungente", fa: "برای خودروهایی که از پشت می‌رسند" },
      ],
      translation: "وقتی سواره‌رو به‌خاطرِ خرابیِ خودرو بسته شده، راننده باید فوراً راه را برای خودروهایی که از پشت می‌رسند باز کند.",
      why: "درست است (قدم ۱). اولین کار باز کردنِ راه است: هُل دادنِ خودرو بیرونِ سواره‌رو، یا دست‌کم کنارِ راست.",
      rule: `${CDS_161} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "5492",
      textIt:
        "In caso di ingombro della carreggiata per avaria del veicolo, il conducente non è tenuto a spostarlo, in attesa dei soccorsi, se il traffico è scarso",
      answer: 0,
      chunks: [
        { it: "In caso di ingombro della carreggiata", fa: INGOMBRO_FA },
        { it: "per avaria del veicolo,", fa: "به‌خاطرِ خرابیِ خودرو،", focus: "reason" },
        { it: "il conducente non è tenuto a spostarlo,", fa: "راننده موظف نیست آن را جابه‌جا کند،", verb: "è tenuto ← essere tenuto", focus: "negation" },
        { it: "in attesa dei soccorsi,", fa: "تا امداد برسد،" },
        { it: "se il traffico è scarso", fa: "اگر ترافیک کم باشد", focus: "condition" },
      ],
      translation: "وقتی سواره‌رو به‌خاطرِ خرابیِ خودرو بسته شده، اگر ترافیک کم باشد، راننده موظف نیست تا رسیدنِ امداد خودرو را جابه‌جا کند.",
      why: "غلط است (قدم ۱). قانون می‌گوید «فوراً» راه را باز کن، بی‌شرط. ترافیکِ کم آن را عوض نمی‌کند؛ کسی که از پشت می‌آید باز هم ممکن است به خودرو بخورد.",
      rule: `${CDS_161} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "5495",
      textIt:
        "Nel caso di ingombro della carreggiata per caduta del carico non removibile, il conducente può evitare di informare un organo di polizia se presegnala la zona con efficaci segnali manuali",
      answer: 0,
      chunks: [
        { it: INGOMBRO, fa: INGOMBRO_FA },
        { it: "per caduta del carico non removibile,", fa: "به‌خاطرِ افتادنِ باری که برداشتنی نیست،", focus: "reason" },
        { it: "il conducente può evitare di informare un organo di polizia", fa: "راننده می‌تواند پلیس را خبر نکند", verb: "può ← potere" },
        { it: "se presegnala la zona con efficaci segnali manuali", fa: "اگر با علامت‌های دستیِ مؤثر محل را از پیش علامت بدهد", verb: "presegnala ← presegnalare", focus: "condition" },
      ],
      translation: "وقتی سواره‌رو به‌خاطرِ افتادنِ باری که برداشتنی نیست بسته شده، اگر راننده با علامت‌های دستیِ مؤثر محل را از پیش علامت بدهد، می‌تواند پلیس را خبر نکند.",
      why: "غلط است (قدم ۱). باری که برداشتنی نیست هم پیش‌آگهی می‌خواهد، هم خبر به مالکِ جاده یا پلیس. یکی جای دیگری را نمی‌گیرد.",
      rule: `${CDS_161} c.3`,
      conceptStep: 1,
    },
    {
      sourceId: "5498",
      textIt:
        "Chiunque non abbia potuto evitare la caduta o lo spargimento di materie viscide, infiammabili o pericolose, deve, tra l'altro, rimuoverle o spargere sul terreno, se possibile, sabbia, terra, segatura o altro materiale idoneo a ripristinare l'aderenza",
      answer: 1,
      chunks: [
        { it: CHIUNQUE, fa: CHIUNQUE_FA, verb: "abbia potuto ← potere" },
        { it: "di materie viscide, infiammabili o pericolose,", fa: "مادّه‌های لغزنده، آتش‌گیر یا خطرناک را بگیرد،" },
        { it: "deve, tra l'altro,", fa: "باید، از جمله،", verb: "deve ← dovere" },
        { it: "rimuoverle o spargere sul terreno, se possibile,", fa: "آن‌ها را بردارد یا، اگر ممکن است، روی زمین بریزد", focus: "condition" },
        { it: "sabbia, terra, segatura o altro materiale idoneo", fa: "شن، خاک، خاک‌اره یا مادّه‌ی مناسبِ دیگر" },
        { it: "a ripristinare l'aderenza", fa: "برای برگرداندنِ چسبندگیِ لاستیک به جاده" },
      ],
      translation:
        "هر کسی که نتوانسته جلوی افتادن یا پخش شدنِ مادّه‌های لغزنده، آتش‌گیر یا خطرناک را بگیرد، باید از جمله آن‌ها را بردارد یا، اگر ممکن است، شن، خاک، خاک‌اره یا مادّه‌ی مناسبِ دیگری روی زمین بریزد تا چسبندگی برگردد.",
      why: "درست است (قدم ۲). پاک کردن، یا ریختنِ چیزی که لاستیک دوباره رویش بگیرد.",
      rule: `${CDS_161} c.2; ${REG_DETAIL}`,
      conceptStep: 2,
    },
    {
      sourceId: "5502",
      textIt:
        "Chiunque non abbia potuto evitare la caduta o lo spargimento di materie pericolose deve, tra l'altro, eseguire segnali manuali atti a segnalare il pericolo, solo dalla parte dove è stato posto il segnale triangolare mobile di pericolo",
      answer: 0,
      chunks: [
        { it: CHIUNQUE, fa: CHIUNQUE_FA, verb: "abbia potuto ← potere" },
        { it: "di materie pericolose", fa: "مادّه‌های خطرناک را بگیرد" },
        { it: "deve, tra l'altro,", fa: "باید، از جمله،", verb: "deve ← dovere" },
        { it: "eseguire segnali manuali atti a segnalare il pericolo,", fa: "با دست علامت‌هایی بدهد که خطر را نشان بدهند،" },
        { it: "solo dalla parte dove è stato posto il segnale triangolare mobile di pericolo", fa: "فقط از طرفی که مثلثِ خطر گذاشته شده", verb: "è stato posto ← porre", focus: "limit" },
      ],
      translation:
        "هر کسی که نتوانسته جلوی افتادن یا پخش شدنِ مادّه‌های خطرناک را بگیرد، باید از جمله فقط از طرفی که مثلثِ خطر گذاشته شده با دست علامت بدهد.",
      why: "غلط است (قدم ۲). برعکس است: علامتِ دست برای طرفی است که مثلث ندارد؛ آن طرف را مثلث پوشانده.",
      rule: `${CDS_161} c.2–3; ${REG_DETAIL}`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // breakdown, fallen load, accident: free the road, else presignal and inform the police
      sourceIds: ["5483", "5484", "5485", "5486", "5487", "5488", "5489", "5490", "5491", "5492", "5493", "5494", "5495"],
    },
    {
      step: 2,
      // slippery or dangerous material spilled
      sourceIds: ["5496", "5497", "5498", "5499", "5500", "5501", "5502"],
    },
  ],
};

// ── Lesson 2 ──────────────────────────────────────────────────────────────────

export const lessonTriangolo: Lesson = {
  id: "triangolo-giubbotto",
  titleFa: "مثلثِ خطر و جلیقه‌ی شب‌نما",
  titleIt: "TRIANGOLO · GIUBBOTTO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی مثلثِ خطر کِی اجباری است (بیرونِ آبادی: شب بی‌چراغ، یا روز وقتی از ۱۰۰ متری دیده نمی‌شوی)، کجا می‌گذاری‌اش (دست‌کم ۵۰ متر عقب، در همان خط، دیده‌شدنی از ۱۰۰ متر) و کِی جلیقه‌ی شب‌نما می‌پوشی.",
      why:
        "۳۳ سؤال، با عددهایی که جابه‌جا می‌شوند: ۵۰ و ۱۰۰ و ۱۵۰. و کلمه‌هایی که یک حرف فرقشان است: «اجباری» در برابرِ «توصیه‌شده»، «بیرونِ آبادی» در برابرِ «حتی داخلِ آبادی».",
      rule: `${CDS_162} c.1–4-ter`,
    },
    {
      kind: "table",
      title: "مثلث کِی اجباری است",
      body:
        "مثلثِ خطر جزوِ تجهیزاتِ اجباریِ هر خودرو است و جای خالیِ چراغ‌ها را پر می‌کند. قانون آن را برای خودروی متوقف روی سواره‌رو یا بارِ افتاده می‌خواهد، بیرونِ آبادی، در دو حالت:",
      columns: ["اجباری", "دامِ بانک"],
      rows: [
        {
          label: "شب",
          it: "di notte, luci posteriori mancanti o insufficienti",
          values: ["وقتی چراغ‌های موقعیتِ عقب یا چراغِ خطر نیستند یا کافی نیستند، و همیشه برای بارِ افتاده", "«توصیه می‌شود» نه؛ «اجباری است»"],
        },
        {
          label: "روز هم",
          it: "anche di giorno, non visibile a 100 metri",
          values: ["وقتی خودرو یا بار از ۱۰۰ متری واضح دیده نمی‌شود (پیچ، سربالایی، مه)", "«۱۵۰ متر» نه؛ «اختیاری» هم نه"],
        },
        {
          label: "داخلِ آبادی",
          it: "nei centri abitati",
          values: ["قانون این اجبار را فقط برای بیرونِ آبادی می‌گذارد. دوچرخه، موتور گازیِ دوچرخ و موتورسیکلت هم کلاً از آن معاف‌اند", "«حتی داخلِ آبادی اجباری است» غلط است، چه برای خودرو، چه برای دوچرخه و موتور"],
        },
        {
          label: "داشتنش",
          it: "equipaggiamento obbligatorio degli autoveicoli",
          values: ["هر خودرو باید یک مثلثِ خطر همراه داشته باشد", "«مثلث جزوِ تجهیزاتِ اجباری نیست» غلط است"],
        },
      ],
      takeaway: "بیرونِ آبادی + (شب بی‌چراغ، یا روز وقتی از ۱۰۰ متری دیده نمی‌شوی) = مثلث اجباری. عددِ این بخش ۱۰۰ است، نه ۱۵۰.",
      rule: `${CDS_162} c.1; ${REG_357} c.1; Codice della Strada, art. 72 c.1 lett. b`,
    },
    {
      kind: "anatomy",
      title: "مثلث را کجا بگذاری",
      scene: "triangolo",
      body: "تصویر به مقیاس نیست. خودرو در خطِ راست ایستاده و تو با خودروی آبی از پشت می‌رسی. روی هر بخش بزن:",
      parts: [
        {
          id: "veicolo",
          nameIt: "Veicolo fermo",
          nameFa: "خودروی متوقف",
          text: "خودرو یا بارِ افتاده. مثلث پشتِ آن قرار می‌گیرد، نه روی آن: «مثلث را روی بار بگذار» غلط است.",
        },
        {
          id: "triangolo",
          nameIt: "Triangolo",
          nameFa: "مثلثِ خطر",
          text: "در همان خطِ عبوری که خودرو یا بار گرفته، نه در خطِ کناری‌اش در سمتِ چپ. دست‌کم یک متر از لبه‌ی بیرونیِ سواره‌رو فاصله دارد، نه از خطِ وسطِ جاده. اگر تقاطعی کمتر از ۵۰ متر عقب‌تر است، جایی پشتِ خودرو می‌گذاری که بهتر دیده شود.",
        },
        {
          id: "distanza",
          nameIt: "Almeno 50 m",
          nameFa: "دست‌کم ۵۰ متر",
          text: "فاصله‌ی مثلث تا خودرو یا مانع: دست‌کم ۵۰ متر عقب‌تر. راننده‌ی بعدی بعد از دیدنِ مثلث هنوز جا دارد سرعتش را کم کند. در آزادراه و جاده‌ی برون‌شهری اصلی، وقتی خودرو را نمی‌شود به خطِ اضطراری یا جای توقف برد، دست‌کم ۱۰۰ متر.",
        },
        {
          id: "visibilita",
          nameIt: "Visibile da 100 m",
          nameFa: "دیده‌شدنی از ۱۰۰ متر",
          text: "کسی که از پشت می‌آید باید مثلث را دست‌کم از ۱۰۰ متری ببیند. پس ۵۰ = فاصله‌ی مثلث تا خودرو، ۱۰۰ = فاصله‌ای که از آن دیده می‌شود. «دیده‌شدنی از ۵۰ متر» غلط است.",
        },
        {
          id: "giubbotto",
          nameIt: "Giubbotto",
          nameFa: "جلیقه‌ی شب‌نما",
          text: "تا وقتی بیرون از خودرو مثلث را می‌بری و می‌گذاری، جلیقه یا بندِ شب‌نما تنت است. بخشِ بعد.",
        },
      ],
      takeaway: "۵۰ = مثلث تا خودرو (در آزادراه ۱۰۰). ۱۰۰ = از کجا دیده می‌شود. جایش: همان خط، پشتِ خودرو، دست‌کم یک متر از لبه‌ی بیرونی.",
      rule: `${REG_357} c.2–3; ${CDS_176_8}`,
    },
    {
      kind: "table",
      title: "جلیقه‌ی شب‌نما",
      body:
        "«giubbotto o bretelle retroriflettenti ad alta visibilità»: جلیقه یا بندهای بازتابنده که در نورِ چراغ برق می‌زنند. مثلث خودرو را نشان می‌دهد، جلیقه تو را. بانک درباره‌اش دو جور جمله دارد: کِی واجب است، و چه کاری نمی‌کند.",
      columns: ["درست", "غلط"],
      rows: [
        {
          label: "کِی می‌پوشی",
          it: "durante le operazioni di presegnalazione",
          values: [
            "در همان موقعیت‌هایی که مثلث لازم است (بیرونِ آبادی، شب بی‌چراغ یا روز وقتی دیده نمی‌شوی)، بدونِ جلیقه پیاده شدن و روی جاده راه رفتن ممنوع است؛ حتی در خطِ اضطراری یا جای توقفِ کنارِ جاده. گذاشتنِ مثلث هم با جلیقه",
            "«اختیاری است»، «در خطِ اضطراری لازم نیست»، «حتی داخلِ آبادی اجباری است»",
          ],
        },
        {
          label: "چه جوری",
          it: "di tipo approvato",
          values: ["از نوعِ تأییدشده؛ رنگش می‌تواند زرد، نارنجی یا قرمزِ فلورسنت باشد", "«فقط زرد»؛ «یکی برای هر صندلی»؛ «جلیقه بیرونِ شهر، بند داخلِ شهر»"],
        },
        {
          label: "چه کاری نمی‌کند",
          it: "non sostituisce il triangolo",
          values: [
            "فقط دیده شدنِ تو را بیشتر می‌کند",
            "جای مثلث را نمی‌گیرد؛ در برابرِ آتش، گرما، مادّه‌ی شیمیایی یا برق محافظت نمی‌کند؛ برای کمک خواستن نیست؛ فقط برای عوض کردنِ لاستیکِ پنچر هم نیست",
          ],
        },
      ],
      takeaway: "جلیقه = دیده شدنِ تو وقتی بیرونِ آبادی روی جاده پیاده‌ای. نه جانشینِ مثلث، نه لباسِ ایمنی در برابرِ آتش.",
      rule: `${CDS_162} c.4-bis, c.4-ter; DM 30/12/2003 (colori)`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il segnale mobile triangolare di pericolo", fa: "مثلثِ خطر" },
        { it: "fuori dei centri abitati", fa: "بیرونِ آبادی" },
        { it: "le luci posteriori di posizione", fa: "چراغ‌های موقعیتِ عقب" },
        { it: "le luci di emergenza", fa: "چراغِ خطر (چهار راهنما با هم)" },
        { it: "visto nettamente a 100 metri", fa: "از ۱۰۰ متری واضح دیده‌شده", base: "vedere" },
        { it: "obbligatorio · consigliabile · facoltativo", fa: "اجباری · توصیه‌شده · اختیاری" },
        { it: "il giubbotto ad alta visibilità", fa: "جلیقه‌ی شب‌نما" },
        { it: "le bretelle retroriflettenti", fa: "بندهای بازتابنده" },
        { it: "la piazzola di sosta", fa: "جای توقفِ کنارِ جاده" },
      ],
    },
    {
      kind: "trap",
      title: "یک کلمه: «اجباری» یا «توصیه‌شده»",
      body: "دو جمله، کلمه به کلمه یکی، جز یک کلمه:",
      examples: [
        {
          sourceId: "5503",
          textIt:
            "Fuori dei centri abitati, di notte, quando mancano o sono insufficienti le luci posteriori di posizione o di emergenza, è obbligatorio presegnalare il veicolo, fermo sulla carreggiata, con il segnale triangolare mobile di pericolo",
          answer: 1,
          chunks: [
            { it: "Fuori dei centri abitati, di notte,", fa: "بیرونِ آبادی، شب،", focus: "condition" },
            { it: "quando mancano o sono insufficienti", fa: "وقتی نیستند یا کافی نیستند", verb: "mancano ← mancare", focus: "condition" },
            { it: "le luci posteriori di posizione o di emergenza,", fa: "چراغ‌های موقعیتِ عقب یا چراغِ خطر،" },
            { it: "è obbligatorio presegnalare il veicolo,", fa: "پیش‌آگهی دادنِ خودرو اجباری است،", focus: "always" },
            { it: "fermo sulla carreggiata,", fa: "خودرویی که روی سواره‌رو ایستاده،" },
            { it: "con il segnale triangolare mobile di pericolo", fa: "با مثلثِ خطر" },
          ],
          translation:
            "بیرونِ آبادی، شب، وقتی چراغ‌های موقعیتِ عقب یا چراغِ خطر نیستند یا کافی نیستند، پیش‌آگهی دادنِ خودرویی که روی سواره‌رو ایستاده با مثلثِ خطر اجباری است.",
          why: "درست است. همه‌ی شرط‌ها هست: بیرونِ آبادی، شب، چراغِ ناکافی. پس اجباری.",
        },
        {
          sourceId: "5511",
          textIt:
            "Fuori dei centri abitati, di notte, quando mancano o sono insufficienti le luci posteriori di posizione o di emergenza, è consigliabile presegnalare il veicolo fermo sulla carreggiata, con il segnale triangolare mobile di pericolo",
          answer: 0,
          chunks: [
            { it: "Fuori dei centri abitati, di notte,", fa: "بیرونِ آبادی، شب،", focus: "condition" },
            { it: "quando mancano o sono insufficienti", fa: "وقتی نیستند یا کافی نیستند", verb: "mancano ← mancare", focus: "condition" },
            { it: "le luci posteriori di posizione o di emergenza,", fa: "چراغ‌های موقعیتِ عقب یا چراغِ خطر،" },
            { it: "è consigliabile presegnalare il veicolo fermo sulla carreggiata,", fa: "توصیه می‌شود خودروی ایستاده روی سواره‌رو را پیش‌آگهی بدهی،", focus: "contrast" },
            { it: "con il segnale triangolare mobile di pericolo", fa: "با مثلثِ خطر" },
          ],
          translation:
            "بیرونِ آبادی، شب، وقتی چراغ‌های موقعیتِ عقب یا چراغِ خطر نیستند یا کافی نیستند، توصیه می‌شود خودروی ایستاده روی سواره‌رو را با مثلثِ خطر پیش‌آگهی بدهی.",
          why: "غلط است. همان موقعیت است، ولی قانون «توصیه» نمی‌کند، اجبار می‌کند.",
        },
      ],
      takeaway: "در این بخش، کلمه‌ی درست «obbligatorio» است. «consigliabile» و «facoltativo» را با شرط‌های کامل دیدی؟ غلط.",
      rule: `${CDS_162} c.1`,
    },
  ],
  practice: [
    {
      sourceId: "5505",
      textIt:
        "Fuori dei centri abitati, è obbligatorio anche di giorno presegnalare un veicolo fermo sulla carreggiata mediante il segnale triangolare di pericolo quando non può essere visto nettamente a 100 metri di distanza",
      answer: 1,
      chunks: [
        { it: "Fuori dei centri abitati,", fa: "بیرونِ آبادی،", focus: "condition" },
        { it: "è obbligatorio anche di giorno", fa: "حتی روز اجباری است", focus: "always" },
        { it: "presegnalare un veicolo fermo sulla carreggiata", fa: "پیش‌آگهی دادنِ خودرویی که روی سواره‌رو ایستاده" },
        { it: "mediante il segnale triangolare di pericolo", fa: "با مثلثِ خطر" },
        { it: "quando non può essere visto nettamente a 100 metri di distanza", fa: "وقتی از ۱۰۰ متری واضح دیده نمی‌شود", verb: "può ← potere", focus: "condition" },
      ],
      translation: "بیرونِ آبادی، وقتی خودرویی که روی سواره‌رو ایستاده از ۱۰۰ متری واضح دیده نمی‌شود، پیش‌آگهی دادنش با مثلثِ خطر حتی روز اجباری است.",
      why: "درست است (قدم ۱). شب یا روز فرقی نمی‌کند؛ ملاک این است که از ۱۰۰ متری دیده بشوی یا نه.",
      rule: `${CDS_162} c.1; ${REG_357} c.1 lett. a`,
      conceptStep: 1,
    },
    {
      sourceId: "5514",
      textIt:
        "Di notte, quando mancano o sono insufficienti le luci posteriori di posizione o di emergenza, è obbligatorio presegnalare il veicolo fermo con il segnale triangolare mobile di pericolo anche nei centri abitati",
      answer: 0,
      chunks: [
        { it: "Di notte,", fa: "شب،", focus: "condition" },
        { it: "quando mancano o sono insufficienti", fa: "وقتی نیستند یا کافی نیستند", verb: "mancano ← mancare", focus: "condition" },
        { it: "le luci posteriori di posizione o di emergenza,", fa: "چراغ‌های موقعیتِ عقب یا چراغِ خطر،" },
        { it: "è obbligatorio presegnalare il veicolo fermo", fa: "پیش‌آگهی دادنِ خودروی متوقف اجباری است" },
        { it: "con il segnale triangolare mobile di pericolo", fa: "با مثلثِ خطر" },
        { it: "anche nei centri abitati", fa: "حتی داخلِ آبادی", focus: "contrast" },
      ],
      translation: "شب، وقتی چراغ‌های موقعیتِ عقب یا چراغِ خطر نیستند یا کافی نیستند، پیش‌آگهی دادنِ خودروی متوقف با مثلثِ خطر حتی داخلِ آبادی اجباری است.",
      why: "غلط است (قدم ۱). این اجبار مالِ بیرونِ آبادی است. «anche nei centri abitati» جمله را غلط می‌کند.",
      rule: `${CDS_162} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "5510",
      textIt:
        "Il segnale mobile triangolare di pericolo deve essere posto sulla carreggiata in modo che sia visibile ad una distanza di almeno 100 metri dai veicoli sopraggiungenti",
      answer: 1,
      chunks: [
        { it: "Il segnale mobile triangolare di pericolo", fa: "مثلثِ خطر" },
        { it: "deve essere posto sulla carreggiata", fa: "باید روی سواره‌رو گذاشته شود", verb: "deve ← dovere" },
        { it: "in modo che sia visibile", fa: "طوری که دیده شود" },
        { it: "ad una distanza di almeno 100 metri", fa: "از فاصله‌ی دست‌کم ۱۰۰ متر", focus: "limit" },
        { it: "dai veicoli sopraggiungenti", fa: "برای خودروهایی که از پشت می‌رسند" },
      ],
      translation: "مثلثِ خطر باید طوری روی سواره‌رو گذاشته شود که خودروهایی که از پشت می‌رسند، آن را دست‌کم از ۱۰۰ متری ببینند.",
      why: "درست است (قدم ۲). ۱۰۰ متر فاصله‌ای است که مثلث از آن دیده می‌شود؛ ۵۰ متر فاصله‌اش تا خودرو.",
      rule: `${REG_357} c.2`,
      conceptStep: 2,
    },
    {
      sourceId: "5520",
      textIt:
        "Nel caso di carreggiata a più corsie, il segnale mobile triangolare di pericolo deve essere posto sulla corsia immediatamente a sinistra del veicolo fermo o del carico caduto",
      answer: 0,
      chunks: [
        { it: "Nel caso di carreggiata a più corsie,", fa: "وقتی سواره‌رو چند خطِ عبور دارد،", focus: "condition" },
        { it: "il segnale mobile triangolare di pericolo", fa: "مثلثِ خطر" },
        { it: "deve essere posto sulla corsia immediatamente a sinistra", fa: "باید در خطِ عبورِ درست سمتِ چپِ", verb: "deve ← dovere", focus: "contrast" },
        { it: "del veicolo fermo o del carico caduto", fa: "خودروی متوقف یا بارِ افتاده گذاشته شود" },
      ],
      translation: "وقتی سواره‌رو چند خطِ عبور دارد، مثلثِ خطر باید در خطِ عبورِ درست سمتِ چپِ خودروی متوقف یا بارِ افتاده گذاشته شود.",
      why: "غلط است (قدم ۲). مثلث در همان خطی می‌رود که خودرو یا بار گرفته؛ همان خطی که راننده‌ی پشتی باید از آن بیرون برود.",
      rule: `${REG_357} c.3`,
      conceptStep: 2,
    },
    {
      sourceId: "5690",
      textIt:
        "L'obbligo di indossare il giubbotto ad alta visibilità si ha quando si sosta fuori dai centri abitati, mentre le bretelle retroriflettenti vanno indossate nelle aree urbane",
      answer: 0,
      chunks: [
        { it: "L'obbligo di indossare il giubbotto ad alta visibilità", fa: "اجبارِ پوشیدنِ جلیقه‌ی شب‌نما" },
        { it: "si ha quando si sosta fuori dai centri abitati,", fa: "وقتی است که بیرونِ آبادی می‌ایستی،", verb: "si sosta ← sostare", focus: "condition" },
        { it: "mentre le bretelle retroriflettenti", fa: "در حالی که بندهای بازتابنده", focus: "contrast" },
        { it: "vanno indossate nelle aree urbane", fa: "را باید داخلِ شهر پوشید", verb: "vanno indossate ← indossare" },
      ],
      translation: "اجبارِ پوشیدنِ جلیقه‌ی شب‌نما وقتی است که بیرونِ آبادی می‌ایستی، در حالی که بندهای بازتابنده را باید داخلِ شهر پوشید.",
      why: "غلط است (قدم ۳). جلیقه و بند دو شکلِ یک وسیله‌اند و قانون هر کدام را قبول می‌کند؛ قاعده‌ی جداگانه‌ای برای شهر و بیرونِ شهر ندارند.",
      rule: `${CDS_162} c.4-ter`,
      conceptStep: 3,
    },
  ],
  related: [
    {
      step: 1,
      // when the triangle is mandatory, and that every car carries one
      sourceIds: ["5503", "5504", "5505", "5506", "5507", "5511", "5512", "5513", "5514", "5515"],
    },
    {
      step: 2,
      // where it goes: ≥ 50 m behind, visible from ≥ 100 m, same lane, ≥ 1 m from the outer edge
      sourceIds: ["5508", "5509", "5510", "5516", "5517", "5518", "5519", "5520", "5521"],
    },
    {
      step: 3,
      // the high-visibility vest: when, what kind, what it does not do
      sourceIds: ["5522", "5523", "5524", "5525", "5526", "5527", "5528", "5686", "5687", "5688", "5689", "5690", "5691", "5692"],
    },
  ],
};
