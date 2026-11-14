/**
 * src/content/ch13-principi.ts
 * Chapter 13 (Norme di circolazione), lessons 1–2.
 *
 *  L1 `norme-pericolo-intralcio`: the general duty of CdS art. 140 (never be a
 *     danger or an obstruction), what the bank counts as one (racing, too slow
 *     without reason, not signalling, stopping on tram tracks) and what it does
 *     not; rules plus prudence, with no "always" shortcut.
 *  L2 `norme-posizione`: keep right (art. 143 c.1–3: near the right margin,
 *     "as close as possible" for slow vehicles, animals, and for everyone when
 *     meeting, on curves and crests) and which lane or carreggiata (c.4–5).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter13.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_140 = "Codice della Strada, art. 140 c.1";
const CDS_143 = "Codice della Strada, art. 143";
const VIETATO = "E' vietato, in quanto costituisce pericolo o intralcio per la circolazione,";
const VIETATO_FA = "ممنوع است، چون برای ترافیک خطر یا مزاحمت می‌سازد،";
const USO = "L'uso corretto della strada comporta che";
const USO_FA = "استفاده‌ی درست از جاده یعنی این‌که";
const DOPPIO_DUE = "Su strada a doppio senso di marcia con due corsie, come in figura,";

// ── Lesson 1 ──────────────────────────────────────────────────────────────────

export const lessonPericoloIntralcio: Lesson = {
  id: "norme-pericolo-intralcio",
  titleFa: "نه خطر، نه مزاحمت: قاعده‌ی پایه",
  titleIt: "PERICOLO O INTRALCIO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی قاعده‌ی پایه‌ی همه‌ی رفتارها در جاده چیست («برای ترافیک خطر یا مزاحمت نساز»)، کدام رفتارها از نظرِ بانک خطر یا مزاحمت‌اند و کدام نه، و چرا رعایتِ عددها (سقفِ سرعت، حداقلِ سرعت) به‌تنهایی کافی نیست.",
      why:
        "۲۳ سؤال. بانک دو جور دام می‌گذارد: کارهای عادی را ممنوع جلوه می‌دهد («واردِ جاده شدن از خیابانِ فرعی ممنوع است») و یک قاعده‌ی ساده را جای همه‌چیز می‌نشاند («فقط سقفِ سرعت را رعایت کن»، «همیشه با سرعتِ ثابت برو»). جوابِ هر دو با همین یک قاعده پیدا می‌شود.",
      rule: `${CDS_140}; Codice della Strada, art. 141 c.5–6`,
    },
    {
      kind: "table",
      title: "خطر یا مزاحمت یعنی چه؟",
      body:
        "ماده‌ی ۱۴۰ قانون را در یک جمله می‌گوید: هر کس در جاده است باید طوری رفتار کند که برای ترافیک خطر یا مزاحمت نسازد، و ایمنی «در هر حال» حفظ شود. بقیه‌ی قانون‌های رانندگی همین جمله را باز می‌کنند. بانک برای این گروه یک الگو دارد: «… ممنوع است، چون خطر یا مزاحمت می‌سازد». بپرس: این کار جلوی دیگران را می‌گیرد یا غافلگیرشان می‌کند؟",
      columns: ["ممنوع است؟", "چرا"],
      rows: [
        {
          label: "برای پیچیدن به راست، سمتِ چپِ سواره‌رو ماندن",
          it: "tenersi sul margine sinistro per svoltare a destra",
          values: ["بله", "پشتِ سری و کسی که از راست می‌آید انتظارش را ندارند؛ برای پیچیدن به راست، نزدیکِ لبه‌ی راست می‌مانی (درسِ ۵)"],
        },
        {
          label: "پارک کردن روی ریل‌های تراموا",
          it: "sostare sui binari tramviari",
          values: ["بله", "تراموا نمی‌تواند دورت بزند؛ روی ریل فقط تا وقتی می‌شود رفت که جلوی تراموا را نگیری"],
        },
        {
          label: "تغییرِ جهت بدونِ این‌که به‌موقع راهنما بزنی",
          it: "senza segnalare con sufficiente anticipo",
          values: ["بله", "دیگران نمی‌توانند خودشان را آماده کنند؛ راهنما باید پیش از مانور روشن شود"],
        },
        {
          label: "مسابقه‌ی سرعت",
          it: "gareggiare in velocità",
          values: ["بله", "ماده‌ی ۱۴۱ بند ۵ جدا هم ممنوعش کرده"],
        },
        {
          label: "رانندگی با سرعتِ خیلی کم، بی‌دلیلِ موجه",
          it: "velocità troppo bassa senza giustificato motivo",
          values: ["بله", "ماده‌ی ۱۴۱ بند ۶: سرعتی آن‌قدر کم که مزاحمت یا خطر بسازد. با دلیل (مه، یخ، بارِ سنگین) فرق می‌کند"],
        },
        {
          label: "واردِ جاده شدن از خیابانِ فرعی",
          it: "immettersi provenendo da strade laterali",
          values: ["نه", "کارِ عادیِ رانندگی است؛ فقط باید درست انجامش بدهی (حق تقدم، راهنما؛ درسِ ۸)"],
        },
        {
          label: "تنظیمِ سرعت با وضعِ جاده",
          it: "regolare la velocità",
          values: ["نه", "این خودش وظیفه است، نه ممنوعیت"],
        },
        {
          label: "توقفِ کوتاه کنارِ لبه‌ی راستِ سواره‌روی یک‌طرفه",
          it: "fermare momentaneamente lungo il margine destro",
          values: ["نه", "جای عادیِ توقفِ کوتاه است، جایی که تابلو منعش نکرده (فصل ۱۶)"],
        },
        {
          label: "«فقط» سقفِ سرعت یا حداقلِ سرعت را رعایت کنی",
          it: "limitarsi ad osservare i limiti",
          values: ["کافی نیست", "باید با وسیله، جاده و ترافیک جور برانی؛ قانون به‌علاوه‌ی عقلِ سلیم و حسِ مسئولیت"],
        },
        {
          label: "«همیشه» با سرعتِ ثابت، یا «در هر حال» به همه راه بدهی",
          it: "sempre a velocità costante · comunque la precedenza a tutti",
          values: ["غلط", "سرعت با شرایط عوض می‌شود؛ حق تقدم قاعده دارد (فصل ۱۴). راه دادن به همه، بی‌قاعده، خودش مزاحمت می‌سازد"],
        },
      ],
      takeaway:
        "خطر یا مزاحمت = کاری که دیگران انتظارش را ندارند یا جلویشان را می‌گیرد: مسابقه، سرعتِ بی‌دلیل کم، مانورِ بی‌راهنما، ایستادن روی ریل. واردِ جاده شدن و توقفِ کوتاهِ درست، کارِ عادی‌اند.",
      rule: `${CDS_140}; Codice della Strada, art. 141 c.5–6; art. 143 c.8; art. 154 c.1 lett. b, c.3`,
    },
    {
      kind: "table",
      title: "قانون به‌علاوه‌ی احتیاط؛ میان‌بُرِ «همیشه» نداریم",
      body:
        "جمله‌های این بخش با «Chi guida un veicolo …» یا «L'uso corretto della strada comporta …» شروع می‌شوند. وقتی جمله یک قاعده را «همیشه» یا «در هر حال» می‌کند، شک کن؛ وقتی می‌گوید «با شرایط جور کن» یا «قانون و احتیاط»، معمولاً درست است.",
      columns: ["درست یا غلط", "چرا"],
      rows: [
        {
          label: "خودروی پرقدرت هم نباید از سقفِ سرعت بیشتر برود",
          it: "anche se ad elevate prestazioni",
          values: ["درست", "سقفِ سرعت برای همه است؛ قدرتِ موتور چیزی را عوض نمی‌کند (فصل ۱۱)"],
        },
        {
          label: "راننده نباید برای دیگران خطر بسازد",
          it: "evitare di costituire pericolo",
          values: ["درست", "همان ماده‌ی ۱۴۰"],
        },
        {
          label: "سرعت با وضعِ جاده و ترافیک جور باشد؛ قانون و احتیاطِ معمول رعایت شود",
          it: "velocità adeguata · comune prudenza",
          values: ["درست", "ماده‌ی ۱۴۱ بند ۱؛ احتیاط بخشی از قانون است"],
        },
        {
          label: "چراغ زردِ ثابت روشن شد و نمی‌توانی ایمن پیش از خطِ ایست بایستی",
          it: "la luce gialla fissa",
          values: ["درست: زودتر تقاطع را خالی کن", "زرد یعنی بایست، مگر نتوانی ایمن بایستی؛ آن‌وقت تقاطع را سریع ترک می‌کنی (فصل ۷)"],
        },
        {
          label: "«همیشه» وسطِ جاده برانی، فقط خطِ جداکننده را رد نکنی",
          it: "sempre al centro della strada",
          values: ["غلط", "جای تو سمتِ راست است، نزدیکِ لبه‌ی راست (درسِ ۲)"],
        },
        {
          label: "«همیشه» تا جای ممکن سریع واردِ سواره‌رو شوی",
          it: "il più rapidamente possibile",
          values: ["غلط", "ورود باید ایمن باشد، نه سریع؛ اول حق تقدم (درسِ ۸)"],
        },
        {
          label: "با سرعتِ بالا برانی تا مزاحمت نسازی",
          it: "velocità elevata per non creare intralcio",
          values: ["غلط", "سرعتِ بی‌دلیل کم مزاحمت است، ولی راه‌حلش سرعتِ زیاد نیست؛ سرعتِ مناسب است"],
        },
      ],
      takeaway:
        "عددها حدِ بیرونی‌اند، نه کلِ قانون. «همیشه سریع»، «همیشه وسط»، «همیشه ثابت» غلط‌اند؛ «با شرایط جور کن» و «قانون + احتیاط» درست.",
      rule: `${CDS_140}; Codice della Strada, artt. 141 c.1, 142, 143 c.1; art. 41 (luce gialla, chapter 7)`,
    },
    {
      kind: "classify",
      title: "خطر یا مزاحمت، یا رانندگیِ عادی؟",
      body: "هر موقعیت را بخوان و بگو بانک آن را خطر یا مزاحمت می‌داند یا کارِ عادی. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "pericolo o intralcio", fa: "خطر یا مزاحمت (ممنوع)" },
        { it: "comportamento normale", fa: "رانندگیِ عادی" },
      ],
      items: [
        {
          prompt: "پشتِ چراغ قرمز، با دوستت که کنارت ایستاده قرار می‌گذاری که با سبز شدن کدام زودتر برسد",
          answer: 0,
          explain: "مسابقه‌ی سرعت؛ ماده‌ی ۱۴۱ بند ۵ صریحاً ممنوعش کرده.",
        },
        {
          prompt: "در جاده‌ی خلوت و آفتابیِ برون‌شهری، بی‌دلیل با ۳۰ کیلومتر بر ساعت می‌روی و صفی پشتت درست شده",
          answer: 0,
          explain: "سرعتِ خیلی کم بی‌دلیلِ موجه: مزاحمت.",
        },
        {
          prompt: "از کوچه‌ی فرعی، بعد از راه دادن به خودروهای جاده، با راهنما واردِ خیابانِ اصلی می‌شوی",
          answer: 1,
          explain: "کارِ عادی؛ واردِ جاده شدن ممنوع نیست، فقط باید درست انجام شود.",
        },
        {
          prompt: "چند دقیقه روی ریل‌های تراموا پارک می‌کنی تا کسی سوار شود",
          answer: 0,
          explain: "تراموا نمی‌تواند دورت بزند؛ ایستادن روی ریل مزاحمت است.",
        },
        {
          prompt: "در خیابانِ یک‌طرفه، جایی که تابلو منع نکرده، لحظه‌ای کنارِ لبه‌ی راست می‌ایستی تا مسافر پیاده شود",
          answer: 1,
          explain: "توقفِ کوتاهِ عادی، کنارِ لبه‌ی راست.",
        },
        {
          prompt: "در مه، چون جلو را خوب نمی‌بینی، آهسته‌تر از بقیه می‌رانی",
          answer: 1,
          explain: "این دلیلِ موجه است؛ سرعتِ کم با دلیل مزاحمت نیست، وظیفه است.",
        },
      ],
      takeaway: "بپرس: دلیلی دارد؟ دیگران انتظارش را دارند؟ مسابقه و سرعتِ بی‌دلیل کم و ایستادن روی ریل ممنوع‌اند؛ ورود و توقفِ کوتاهِ درست عادی‌اند.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "costituire pericolo o intralcio", fa: "خطر یا مزاحمت ساختن", base: "costituire" },
        { it: "l'intralcio", fa: "مزاحمت", note: "یعنی جلوی حرکتِ عادیِ دیگران را گرفتن، حتی بی‌تصادف." },
        { it: "gareggiare in velocità", fa: "مسابقه‌ی سرعت دادن", base: "gareggiare" },
        { it: "senza giustificato motivo", fa: "بی‌دلیلِ موجه" },
        { it: "i binari tramviari", fa: "ریل‌های تراموا" },
        { it: "la comune prudenza", fa: "احتیاطِ معمول" },
        { it: "il buonsenso", fa: "عقلِ سلیم" },
        { it: "ad elevate prestazioni", fa: "پرقدرت (با موتورِ قوی)" },
        { it: "sgombrare l'incrocio", fa: "تقاطع را خالی کردن", base: "sgombrare" },
      ],
    },
    {
      kind: "trap",
      title: "کند رفتن مزاحمت است؛ تند رفتن راه‌حلش نیست",
      body: "هر دو جمله درباره‌ی سرعت و مزاحمت‌اند. یکی درست، یکی غلط:",
      examples: [
        {
          sourceId: "4356",
          textIt: "E' vietato, in quanto costituisce pericolo o intralcio per la circolazione, circolare a velocità troppo bassa senza giustificato motivo",
          answer: 1,
          chunks: [
            { it: VIETATO, fa: VIETATO_FA, verb: "costituisce ← costituire" },
            { it: "circolare a velocità troppo bassa", fa: "با سرعتِ خیلی کم رانندگی کردن" },
            { it: "senza giustificato motivo", fa: "بی‌دلیلِ موجه", focus: "condition" },
          ],
          translation: "رانندگی با سرعتِ خیلی کم بی‌دلیلِ موجه ممنوع است، چون برای ترافیک خطر یا مزاحمت می‌سازد.",
          why: "درست است. ماده‌ی ۱۴۱ بند ۶: سرعتی آن‌قدر کم که مزاحمت یا خطر بسازد ممنوع است. کلیدِ جمله «بی‌دلیلِ موجه» است.",
        },
        {
          sourceId: "4395",
          textIt: "L'uso corretto della strada comporta che si proceda a velocità elevata per non creare intralcio",
          answer: 0,
          chunks: [
            { it: USO, fa: USO_FA, verb: "comporta ← comportare" },
            { it: "si proceda a velocità elevata", fa: "با سرعتِ بالا رانده شود", verb: "si proceda ← procedere", focus: "contrast" },
            { it: "per non creare intralcio", fa: "تا مزاحمت ساخته نشود", focus: "reason" },
          ],
          translation: "استفاده‌ی درست از جاده یعنی این‌که با سرعتِ بالا رانده شود تا مزاحمت ساخته نشود.",
          why: "غلط است. سرعتِ بالا خودش خطر است. وظیفه سرعتِ مناسب با شرایط است، نه سرعتِ بالا.",
        },
      ],
      takeaway: "«خیلی کم بی‌دلیل» = مزاحمت. «بالا برای این‌که مزاحم نباشی» = غلط. درستش همیشه «مناسب با شرایط» است.",
      rule: "Codice della Strada, art. 141 c.1, c.6",
    },
  ],
  practice: [
    {
      sourceId: "4353",
      textIt: "E' vietato, in quanto costituisce pericolo o intralcio per la circolazione, sostare sui binari tramviari",
      answer: 1,
      chunks: [
        { it: VIETATO, fa: VIETATO_FA, verb: "costituisce ← costituire" },
        { it: "sostare sui binari tramviari", fa: "پارک کردن روی ریل‌های تراموا" },
      ],
      translation: "پارک کردن روی ریل‌های تراموا ممنوع است، چون برای ترافیک خطر یا مزاحمت می‌سازد.",
      why: "درست است (قدم ۱). تراموا نمی‌تواند دورت بزند. روی ریل فقط تا جایی می‌شود رفت که جلوی تراموا را نگیری؛ ایستادن رویش مزاحمت است.",
      rule: `${CDS_140}; Codice della Strada, art. 143 c.8`,
      conceptStep: 1,
    },
    {
      sourceId: "4357",
      textIt: "E' vietato, in quanto costituisce pericolo o intralcio per la circolazione, immettersi nel flusso della circolazione provenendo da strade laterali",
      answer: 0,
      chunks: [
        { it: VIETATO, fa: VIETATO_FA, verb: "costituisce ← costituire" },
        { it: "immettersi nel flusso della circolazione", fa: "واردِ جریانِ ترافیک شدن" },
        { it: "provenendo da strade laterali", fa: "با آمدن از خیابان‌های فرعی", verb: "provenendo ← provenire" },
      ],
      translation: "واردِ جریانِ ترافیک شدن از خیابان‌های فرعی ممنوع است، چون برای ترافیک خطر یا مزاحمت می‌سازد.",
      why: "غلط است (قدم ۱). واردِ جاده شدن کارِ عادیِ رانندگی است. خطرناکش نوعِ انجام دادنش است (بی‌راهنما، بی‌راه دادن)، نه خودِ کار؛ درسِ ۸.",
      rule: `${CDS_140}; Codice della Strada, art. 154 c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "4387",
      textIt:
        "L'uso corretto della strada comporta che ci si affretti a sgombrare l'incrocio, quando compaia sul semaforo la luce gialla fissa e non si è in grado di arrestare il veicolo in sicurezza prima della striscia di arresto",
      answer: 1,
      chunks: [
        { it: USO, fa: USO_FA, verb: "comporta ← comportare" },
        { it: "ci si affretti a sgombrare l'incrocio,", fa: "عجله کنی تا تقاطع را خالی کنی،", verb: "ci si affretti ← affrettarsi" },
        { it: "quando compaia sul semaforo la luce gialla fissa", fa: "وقتی روی چراغ، زردِ ثابت روشن می‌شود", verb: "compaia ← comparire", focus: "condition" },
        { it: "e non si è in grado di arrestare il veicolo in sicurezza", fa: "و نمی‌توانی خودرو را ایمن نگه داری", focus: "condition" },
        { it: "prima della striscia di arresto", fa: "پیش از خطِ ایست" },
      ],
      translation:
        "استفاده‌ی درست از جاده یعنی این‌که وقتی روی چراغ زردِ ثابت روشن می‌شود و نمی‌توانی خودرو را ایمن پیش از خطِ ایست نگه داری، عجله کنی تا تقاطع را خالی کنی.",
      why: "درست است (قدم ۲). زردِ ثابت یعنی بایست، مگر نتوانی ایمن بایستی؛ آن‌وقت ماندن وسطِ تقاطع خطر است و باید زود خالی‌اش کنی (فصل ۷).",
      rule: "Codice della Strada, art. 41 (luce gialla fissa); art. 140 c.1",
      conceptStep: 2,
    },
    {
      sourceId: "4365",
      textIt: "Chi guida un veicolo deve guidare sempre al centro della strada, però senza superare la striscia di corsia",
      answer: 0,
      chunks: [
        { it: "Chi guida un veicolo", fa: "کسی که وسیله‌ای را می‌راند", verb: "guida ← guidare" },
        { it: "deve guidare sempre al centro della strada,", fa: "باید همیشه وسطِ جاده براند،", verb: "deve ← dovere", focus: "always" },
        { it: "però senza superare la striscia di corsia", fa: "ولی بدونِ رد کردنِ خطِ جداکننده‌ی خط عبور", focus: "condition" },
      ],
      translation: "کسی که وسیله‌ای را می‌راند باید همیشه وسطِ جاده براند، ولی بدونِ رد کردنِ خطِ جداکننده‌ی خط عبور.",
      why: "غلط است (قدم ۲). جای تو سمتِ راستِ سواره‌رو است، نزدیکِ لبه‌ی راست، حتی وقتی جاده خلوت است (درسِ ۲). «همیشه وسط» قاعده نیست.",
      rule: `${CDS_143} c.1`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // what the bank counts as pericolo o intralcio (4352–4359) and why limits alone are not enough (4446–4452)
      sourceIds: ["4352", "4353", "4354", "4355", "4356", "4357", "4358", "4359", "4446", "4447", "4448", "4449", "4450", "4451", "4452"],
    },
    {
      step: 2,
      // rules plus prudence; the "always" and "whatever happens" sentences
      sourceIds: ["4360", "4362", "4365", "4385", "4386", "4387", "4391", "4395"],
    },
  ],
};

// ── Lesson 2 ──────────────────────────────────────────────────────────────────

export const lessonPosizione: Lesson = {
  id: "norme-posizione",
  titleFa: "سمتِ راست: جای تو روی جاده",
  titleIt: "POSIZIONE SULLA CARREGGIATA",
  minutes: 5,
  signs: [],
  figures: [502, 536, 550, 552, 554, 558, 559, 562],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی روی سواره‌رو کجا می‌رانی (سمتِ راست، نزدیکِ لبه‌ی راست، حتی وقتی جاده خالی است)، کی باید «تا جای ممکن» به لبه‌ی راست بچسبی، و روی جاده‌ی دو یا سه‌خطه و سواره‌روهای جدا از کدام خط یا سواره‌رو استفاده می‌کنی.",
      why:
        "۲۱ سؤال، بیشترشان با شکلِ جاده. دام‌ها: «وسط برو چون جاده خالی است»، «در پیچِ چپِ یک‌طرفه، چپ بمان»، «خطِ وسطِ جاده‌ی سه‌خطه برای حرکتِ عادی است» و «سواره‌روی چپ برای سبقت است».",
      rule: `${CDS_143} c.1–5`,
    },
    {
      kind: "table",
      title: "سمتِ راست، و کی «تا جای ممکن» به راست",
      body:
        "ماده‌ی ۱۴۳ دو درجه دارد. درجه‌ی اول برای همه و همیشه: سمتِ راستِ سواره‌رو، نزدیکِ لبه‌ی راست، «حتی وقتی جاده خالی است». درجه‌ی دوم سخت‌تر است: «تا جای ممکن نزدیکِ لبه‌ی راست». این برای وسیله‌های بی‌موتور و حیوان‌ها همیشه است، و برای بقیه وقتی از کنارِ خودروی روبه‌رو رد می‌شوند، در پیچ و روی برآمدگی؛ ولی فقط روی سواره‌روی دوطرفه. روی سواره‌روهای جدا، جاده‌ای با دو خط یا بیشتر در هر جهت و جاده‌ی یک‌طرفه، درجه‌ی دوم اجرا نمی‌شود؛ درجه‌ی اول همچنان هست.",
      columns: ["کجا", "چرا"],
      rows: [
        {
          label: "همه‌ی وسیله‌ها، همیشه",
          it: "parte destra della carreggiata, vicino al margine destro",
          values: ["سمتِ راست، نزدیکِ لبه‌ی راست", "«وسط برو چون جاده خالی است» غلط است؛ ماده خالی بودن را هم گفته"],
        },
        {
          label: "دوچرخه و وسیله‌های بی‌موتور، و کسی که حیوان می‌برد",
          it: "veicoli senza motore · animali",
          values: ["تا جای ممکن نزدیکِ لبه‌ی راست", "آهسته‌اند؛ باید جا برای بقیه بماند"],
        },
        {
          label: "رد شدن از کنارِ خودروی روبه‌رو، در جاده‌ی دوطرفه",
          it: "incrociando altri veicoli",
          values: ["تا جای ممکن نزدیکِ لبه‌ی راست", "فاصله‌ی دو خودرو بیشتر می‌شود. «incrociare» این‌جا یعنی از کنارِ هم رد شدن، نه تقاطع"],
        },
        {
          label: "پیچ و برآمدگی، در جاده‌ی دوطرفه (مثلاً سربالاییِ برآمدگی)",
          it: "curve · tratto in salita di un dosso",
          values: ["تا جای ممکن نزدیکِ لبه‌ی راست", "خودروی روبه‌رو را دیر می‌بینی؛ نباید سمتِ او باشی"],
        },
        {
          label: "پیچِ چپ در جاده‌ی یک‌طرفه",
          it: "senso unico, curva a sinistra",
          values: ["سمتِ راست، نه لبه‌ی چپ", "یک‌طرفه از «تا جای ممکن» معاف است، نه از «سمتِ راست»"],
        },
        {
          label: "برآمدگی روی جاده با دو سواره‌روی جدا",
          it: "carreggiate separate, dosso",
          values: ["سمتِ راست، نه لبه‌ی چپ", "روبه‌رویی در کار نیست، ولی جای عادیِ تو همچنان راست است"],
        },
        {
          label: "اتوبوس برقی",
          it: "il filobus",
          values: ["مثلِ بقیه، سمتِ راست", "«نزدیکِ لبه‌ی چپ» قاعده‌ای ندارد"],
        },
      ],
      takeaway:
        "همه: سمتِ راست، نزدیکِ لبه، حتی در جاده‌ی خالی. «تا جای ممکن» به راست: دوچرخه و حیوان همیشه؛ بقیه در جاده‌ی دوطرفه وقتی از کنارِ روبه‌رو رد می‌شوند، در پیچ و روی برآمدگی. هیچ‌جا «لبه‌ی چپ» نیست.",
      rule: `${CDS_143} c.1–3`,
    },
    {
      kind: "table",
      title: "کدام خط عبور، کدام سواره‌رو",
      body:
        "وقتی سواره‌رو چند خط دارد، قاعده همان است: راست برای حرکتِ عادی، چپ برای سبقت (ماده‌ی ۱۴۳ بند ۵). وقتی جاده چند سواره‌روی جدا دارد، هر سواره‌رو یک جهت است و سمتِ راست را نسبت به جهتِ خودت انتخاب می‌کنی (بند ۴). «سواره‌روی سبقت» وجود ندارد؛ سبقت داخلِ سواره‌روی خودت انجام می‌شود.",
      columns: ["کجا برانی", "دامِ بانک"],
      rows: [
        {
          label: "دوطرفه، دو خط عبور (شکل ۵۰۲)",
          it: "doppio senso, due corsie",
          values: ["خطِ راست؛ خطِ چپ فقط برای سبقت", "«ردیف‌های موازی» این‌جا مجاز نیست (درسِ ۳)"],
        },
        {
          label: "دوطرفه، سه خط عبور (شکل ۵۵۴)",
          it: "doppio senso, tre corsie",
          values: ["خطِ راست؛ خطِ وسط فقط برای سبقت", "«خطِ وسط برای حرکتِ عادی» غلط است؛ وسط مالِ هر دو جهت است"],
        },
        {
          label: "سه خط در هر جهت (شکل ۵۵۲)",
          it: "tre corsie per senso di marcia",
          values: ["خالی‌ترین خط از سمتِ راست؛ خط‌های چپ برای سبقت", "اگر خطِ راست پر است، خطِ بعدیِ خالی؛ نه هر خطی"],
        },
        {
          label: "پیچ، با دو خط در هر جهت (شکل ۵۵۰)",
          it: "curva, due corsie per senso",
          values: ["داخلِ خطِ خودت بمان", "«اگر جاده خالی است از روی خطِ نقطه‌چین برو» غلط است؛ پیچ را میان‌بُر نمی‌زنی"],
        },
        {
          label: "دو سواره‌روی جدا (شکل ۵۵۸ و ۵۵۹)",
          it: "due carreggiate separate",
          values: ["سواره‌روی راست نسبت به جهتت", "«راست برای حرکت، چپ برای سبقت» غلط است؛ سواره‌روی چپ جهتِ مخالف است"],
        },
        {
          label: "سه سواره‌روی جدا (شکل ۵۶۲)",
          it: "tre carreggiate separate",
          values: ["سواره‌روی وسط یا راست نسبت به جهتت", "مگر تابلو چیزِ دیگری بگوید"],
        },
        {
          label: "چهار سواره‌روی جدا",
          it: "quattro carreggiate separate",
          values: ["طبقِ جهت و تابلوها", "«سواره‌روهای وسط برای سبقت‌اند» غلط است؛ هیچ سواره‌رویی مالِ سبقت نیست"],
        },
        {
          label: "جاده‌ی برون‌شهریِ اصلی: پارک",
          it: "strade extraurbane principali, sosta",
          values: ["فقط در جاهای مخصوص", "روی سواره‌رو و رمپ‌ها پارک و توقف ممنوع است، جز اضطرار (ماده‌ی ۱۷۶ بند ۵)"],
        },
      ],
      takeaway: "یک خط برای هر جهت نداری؟ راست برای حرکت، چپ (یا وسط) فقط برای سبقت. سواره‌روهای جدا؟ راستِ خودت، و سبقت داخلِ همان سواره‌رو.",
      rule: `${CDS_143} c.4–5; Codice della Strada, art. 176 c.5`,
    },
    {
      kind: "classify",
      title: "فقط سمتِ راست، یا تا جای ممکن به راست؟",
      body: "هر موقعیت را بخوان و بگو ماده‌ی ۱۴۳ چه می‌خواهد. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "il più possibile vicino al margine destro", fa: "تا جای ممکن نزدیکِ لبه‌ی راست" },
        { it: "parte destra, vicino al margine", fa: "سمتِ راست، نزدیکِ لبه (نه لزوماً چسبیده)" },
      ],
      items: [
        {
          prompt: "با دوچرخه در خیابانی دوطرفه",
          answer: 0,
          explain: "وسیله‌ی بی‌موتور: همیشه تا جای ممکن به راست.",
        },
        {
          prompt: "با سواری در جاده‌ی دوطرفه‌ی خالی، مستقیم و بی‌روبه‌رو",
          answer: 1,
          explain: "درجه‌ی اول: سمتِ راست، نزدیکِ لبه. نه وسط، ولی لازم نیست به لبه بچسبی.",
        },
        {
          prompt: "با سواری در جاده‌ی دوطرفه، بالای یک برآمدگی",
          answer: 0,
          explain: "روی برآمدگی در جاده‌ی دوطرفه، تا جای ممکن به راست: روبه‌رو را نمی‌بینی.",
        },
        {
          prompt: "با سواری در جاده‌ی باریکِ دوطرفه، کامیونی از روبه‌رو می‌آید",
          answer: 0,
          explain: "وقتی از کنارِ روبه‌رو رد می‌شوی، تا جای ممکن به راست.",
        },
        {
          prompt: "با سواری در خیابانِ یک‌طرفه، در یک پیچِ چپ",
          answer: 1,
          explain: "یک‌طرفه از «تا جای ممکن» معاف است؛ ولی همچنان سمتِ راست، نه لبه‌ی چپ.",
        },
      ],
      takeaway: "بپرس: وسیله‌ام بی‌موتور است؟ یا در جاده‌ی دوطرفه از کنارِ روبه‌رو، در پیچ یا روی برآمدگی‌ام؟ پس تا جای ممکن به راست. وگرنه سمتِ راست کافی است.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il margine destro della carreggiata", fa: "لبه‌ی راستِ سواره‌رو" },
        { it: "la carreggiata a doppio senso di marcia", fa: "سواره‌روی دوطرفه" },
        { it: "le carreggiate separate", fa: "سواره‌روهای جدا", note: "هر سواره‌رو یک جهت است." },
        { it: "il dosso", fa: "برآمدگی" },
        { it: "incrociare altri veicoli", fa: "از کنارِ خودروهای روبه‌رو رد شدن", base: "incrociare", note: "نه «تقاطع»؛ تقاطع incrocio است." },
        { it: "la corsia più libera a destra", fa: "خالی‌ترین خط عبور از سمتِ راست" },
        { it: "i veicoli senza motore", fa: "وسیله‌های بی‌موتور" },
        { it: "impegnare la corsia", fa: "واردِ خط عبور شدن و در آن بودن", base: "impegnare" },
      ],
    },
    {
      kind: "trap",
      title: "برآمدگی: لبه‌ی راست، نه لبه‌ی چپ",
      body: "هر دو جمله درباره‌ی برآمدگی‌اند. یکی درست، یکی غلط:",
      examples: [
        {
          sourceId: "4502",
          textIt:
            "Su strada a doppio senso di marcia con due corsie, come in figura, i veicoli che percorrono il tratto in salita di un dosso devono tenersi il più possibile vicino al margine destro della carreggiata",
          answer: 1,
          figure: 536,
          chunks: [
            { it: DOPPIO_DUE, fa: "در جاده‌ی دوطرفه با دو خط عبور، مثلِ تصویر،", focus: "condition" },
            { it: "i veicoli che percorrono il tratto in salita di un dosso", fa: "وسیله‌هایی که سربالاییِ یک برآمدگی را می‌روند", verb: "percorrono ← percorrere" },
            { it: "devono tenersi il più possibile vicino", fa: "باید تا جای ممکن نزدیک بمانند", verb: "devono tenersi ← tenersi" },
            { it: "al margine destro della carreggiata", fa: "به لبه‌ی راستِ سواره‌رو" },
          ],
          translation: "در جاده‌ی دوطرفه با دو خط عبور، مثلِ تصویر، وسیله‌هایی که سربالاییِ یک برآمدگی را می‌روند باید تا جای ممکن نزدیکِ لبه‌ی راستِ سواره‌رو بمانند.",
          why: "درست است. روی برآمدگی، در جاده‌ی دوطرفه، روبه‌رو را نمی‌بینی؛ ماده‌ی ۱۴۳ بند ۳ می‌گوید تا جای ممکن به راست.",
        },
        {
          sourceId: "4510",
          textIt: "Su strada a due carreggiate separate, come in figura, i veicoli che percorrono un dosso devono tenersi vicino al margine sinistro della carreggiata",
          answer: 0,
          figure: 558,
          chunks: [
            { it: "Su strada a due carreggiate separate, come in figura,", fa: "در جاده‌ای با دو سواره‌روی جدا، مثلِ تصویر،", focus: "condition" },
            { it: "i veicoli che percorrono un dosso", fa: "وسیله‌هایی که از روی برآمدگی می‌گذرند", verb: "percorrono ← percorrere" },
            { it: "devono tenersi vicino al margine sinistro della carreggiata", fa: "باید نزدیکِ لبه‌ی چپِ سواره‌رو بمانند", verb: "devono tenersi ← tenersi", focus: "contrast" },
          ],
          translation: "در جاده‌ای با دو سواره‌روی جدا، مثلِ تصویر، وسیله‌هایی که از روی برآمدگی می‌گذرند باید نزدیکِ لبه‌ی چپِ سواره‌رو بمانند.",
          why: "غلط است. سواره‌روهای جدا از «تا جای ممکن به راست» معاف‌اند، ولی جای عادی همچنان سمتِ راست است. «لبه‌ی چپ» هیچ‌جا قاعده نیست.",
        },
      ],
      takeaway: "لبه‌ی چپ هرگز. سؤال فقط این است که «سمتِ راست» کافی است یا «تا جای ممکن به راست».",
      rule: `${CDS_143} c.1, c.3`,
    },
  ],
  practice: [
    {
      sourceId: "4492",
      textIt: "I veicoli devono, di norma, circolare sulla parte destra della carreggiata ed in vicinanza del margine destro",
      answer: 1,
      chunks: [
        { it: "I veicoli devono, di norma,", fa: "وسیله‌ها معمولاً باید", verb: "devono ← dovere" },
        { it: "circolare sulla parte destra della carreggiata", fa: "در سمتِ راستِ سواره‌رو حرکت کنند" },
        { it: "ed in vicinanza del margine destro", fa: "و نزدیکِ لبه‌ی راست" },
      ],
      translation: "وسیله‌ها معمولاً باید در سمتِ راستِ سواره‌رو و نزدیکِ لبه‌ی راست حرکت کنند.",
      why: "درست است (قدم ۱). ماده‌ی ۱۴۳ بند ۱، درجه‌ی اول، برای همه و حتی وقتی جاده خالی است.",
      rule: `${CDS_143} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "4506",
      textIt: "E' possibile circolare al centro della carreggiata quando la strada è libera",
      answer: 0,
      chunks: [
        { it: "E' possibile circolare al centro della carreggiata", fa: "می‌شود وسطِ سواره‌رو حرکت کرد" },
        { it: "quando la strada è libera", fa: "وقتی جاده خالی است", focus: "condition" },
      ],
      translation: "وقتی جاده خالی است، می‌شود وسطِ سواره‌رو حرکت کرد.",
      why: "غلط است (قدم ۱). ماده‌ی ۱۴۳ بند ۱ صریحاً می‌گوید سمتِ راست «حتی وقتی جاده خالی است». خودروی روبه‌رو یا عابر ممکن است ناگهان پیدا شود.",
      rule: `${CDS_143} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "4495",
      textIt:
        "In una carreggiata a doppio senso di marcia con due corsie, come in figura, i veicoli devono circolare nella corsia di destra, impegnando solo quella di sinistra per il sorpasso",
      answer: 1,
      figure: 502,
      chunks: [
        { it: "In una carreggiata a doppio senso di marcia con due corsie, come in figura,", fa: "در سواره‌روی دوطرفه با دو خط عبور، مثلِ تصویر،", focus: "condition" },
        { it: "i veicoli devono circolare nella corsia di destra,", fa: "وسیله‌ها باید در خطِ راست حرکت کنند،", verb: "devono ← dovere" },
        { it: "impegnando solo quella di sinistra per il sorpasso", fa: "و خطِ چپ را فقط برای سبقت بگیرند", verb: "impegnando ← impegnare", focus: "limit" },
      ],
      translation: "در سواره‌روی دوطرفه با دو خط عبور، مثلِ تصویر، وسیله‌ها باید در خطِ راست حرکت کنند و خطِ چپ را فقط برای سبقت بگیرند.",
      why: "درست است (قدم ۲). خطِ چپ این‌جا خطِ جهتِ مخالف است؛ فقط برای سبقت، وقتی آزاد است.",
      rule: `${CDS_143} c.1, c.5`,
      conceptStep: 2,
    },
    {
      sourceId: "4503",
      textIt: "Su strada a doppio senso di marcia con tre corsie, come in figura, i veicoli possono usare la corsia centrale per la marcia normale",
      answer: 0,
      figure: 554,
      chunks: [
        { it: "Su strada a doppio senso di marcia con tre corsie, come in figura,", fa: "در جاده‌ی دوطرفه با سه خط عبور، مثلِ تصویر،", focus: "condition" },
        { it: "i veicoli possono usare la corsia centrale", fa: "وسیله‌ها می‌توانند از خطِ وسط استفاده کنند", verb: "possono ← potere" },
        { it: "per la marcia normale", fa: "برای حرکتِ عادی", focus: "contrast" },
      ],
      translation: "در جاده‌ی دوطرفه با سه خط عبور، مثلِ تصویر، وسیله‌ها می‌توانند برای حرکتِ عادی از خطِ وسط استفاده کنند.",
      why: "غلط است (قدم ۲). خطِ وسط مالِ هر دو جهت است و فقط برای سبقت. حرکتِ عادی در خطِ راست.",
      rule: `${CDS_143} c.5`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // keep right; "as close as possible" for slow vehicles, animals, meeting, curves and crests
      sourceIds: ["4492", "4498", "4499", "4500", "4502", "4506", "4509", "4510", "4513"],
    },
    {
      step: 2,
      // which lane on 2/3-lane roads and which carreggiata on divided roads; sosta on strade extraurbane principali
      sourceIds: ["4469", "4470", "4471", "4472", "4474", "4493", "4494", "4495", "4496", "4501", "4503", "4511"],
    },
  ],
};
