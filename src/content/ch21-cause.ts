/**
 * src/content/ch21-cause.ts
 * Chapter 21 (Incidenti stradali e comportamenti), lessons 1–2.
 *  L1 why accidents happen: the road (what surprises the driver or lowers grip is
 *     a cause; what separates, guides or protects is not) and the vehicle (kept
 *     at full efficiency, never modified without approval). The five vehicle
 *     statements (6435, 6437–6439, 6441) sit in the bank's "obblighi dopo
 *     incidente" group although they are about the vehicle.
 *  L2 rear-end collisions (speed, distance, attention) and passengers getting
 *     in and out (doors). 6436 (reaction distance) and 6451 (distance) belong to
 *     chapter 12 (lessons-velocita.ts), which mapped them first; linked, not taken.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter21.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS = (n: string) => `Codice della Strada, art. ${n}`;
const CAUSA = "Causa probabile di incidenti dovuti alla struttura della strada";
const CAUSA_FA = "علتِ احتمالیِ تصادف‌های ناشی از ساختارِ جاده";
const TAMP = "I tamponamenti stradali";
const TAMP_FA = "تصادف‌های از پشت";

// ── Lesson 1 ──────────────────────────────────────────────────────────────────

export const lessonCause: Lesson = {
  id: "incidenti-cause-strada-veicolo",
  titleFa: "چرا تصادف می‌شود: جاده و خودرو",
  titleIt: "CAUSE DEGLI INCIDENTI · STRADA · VEICOLO",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی کدام ویژگی‌های جاده می‌توانند علتِ تصادف باشند (هر چیزی که راننده را غافلگیر می‌کند یا چسبندگیِ لاستیک را کم می‌کند) و کدام نه (هر چیزی که جهت‌ها را جدا می‌کند، راه را نشان می‌دهد یا محافظت می‌کند). و می‌دانی چرا خودروی خراب یا دست‌کاری‌شده هم علتِ تصادف است.",
      why:
        "۱۸ سؤال. سیزده تا یک جمله‌ی ثابت دارند («می‌تواند علتِ احتمالیِ تصادف باشد») و فقط آخرشان عوض می‌شود. پنج تای دیگر درباره‌ی خودروست: ترمز، چراغِ روغن، حجمِ موتور و تنظیماتِ موتور.",
      rule: `${CDS("14")} c.1; ${CDS("141")} c.1–2`,
    },
    {
      kind: "factors",
      title: "جاده: علت هست یا نیست؟",
      body:
        "کلید یک سؤال است: این ویژگی راننده را غافلگیر می‌کند یا چسبندگی را کم می‌کند؟ اگر بله، می‌تواند علت باشد. چیزی که برای ایمنی ساخته شده (سواره‌روهای جدا، خطوطِ عبور، یک‌طرفه، گاردریل، چراغ راهنمایی) علت نیست. نگهداری و علامت‌گذاریِ جاده کارِ مالکِ جاده است، ولی راننده هم همیشه سرعتش را با وضعِ جاده تنظیم می‌کند.",
      columns: [
        {
          title: "می‌تواند علت باشد (VERO)",
          items: [
            { fa: "باریک بودنِ جاده", it: "ristrettezza della strada", sourceId: "6360", textIt: "Causa probabile di incidenti dovuti alla struttura della strada può essere ristrettezza della strada", answer: 1 },
            { fa: "تقاطعی که علامت ندارد", it: "mancata segnalazione degli incroci", sourceId: "6361", textIt: "Causa probabile di incidenti dovuti alla struttura della strada può essere mancata segnalazione degli incroci", answer: 1 },
            { fa: "سطحِ جاده‌ی تغییرشکل‌داده (چاله، فرورفتگی)", it: "fondo stradale deformato", sourceId: "6363", textIt: "Causa probabile di incidenti dovuti alla struttura della strada può essere fondo stradale deformato", answer: 1 },
            { fa: "باریکه‌ای که تابلو ندارد", it: "presenza di strettoie non segnalate", sourceId: "6365", textIt: "Causa probabile di incidenti dovuti alla struttura della strada può essere presenza di strettoie non segnalate", answer: 1 },
          ],
        },
        {
          title: "علت نیست (FALSO)",
          items: [
            { fa: "جاده‌ای با سواره‌روهای جدا", it: "strada suddivisa in carreggiate", sourceId: "6366", textIt: "Causa probabile di incidenti dovuti alla struttura della strada può essere strada suddivisa in carreggiate", answer: 0 },
            { fa: "سواره‌روی یک‌طرفه", it: "carreggiata a senso unico di circolazione", sourceId: "6368", textIt: "Causa probabile di incidenti dovuti alla struttura della strada può essere carreggiata a senso unico di circolazione", answer: 0 },
            { fa: "گاردریلِ جذب‌کننده‌ی ضربه", it: "barriere laterali ad assorbimento d'urto (guardrails)", sourceId: "6370", textIt: "Causa probabile di incidenti dovuti alla struttura della strada può essere presenza di barriere laterali ad assorbimento d'urto (guardrails)", answer: 0 },
            { fa: "کنترلِ تردد با چراغ راهنمایی", it: "regolamentazione semaforica", sourceId: "6371", textIt: "Causa probabile di incidenti dovuti alla struttura della strada può essere regolamentazione semaforica", answer: 0 },
          ],
        },
      ],
      takeaway: "غافلگیری یا چسبندگیِ کم = علت. جدا کردن، راهنمایی، محافظت = علت نیست.",
      rule: `${CDS("14")} c.1 (manutenzione e segnaletica a carico dell'ente proprietario); ${CDS("141")} c.2`,
    },
    {
      kind: "table",
      title: "خودرو: سالم، و همان‌طور که تأیید شده",
      body:
        "قانون می‌خواهد خودرو در حرکت «در حداکثرِ کارآمدی» نگه داشته شود تا ایمن باشد. و هر تغییری در ویژگی‌های ساختیِ آن باید در اداره‌ی موتوریتزاتسیونه (Motorizzazione) بازدید و آزمایش شود و در کارتِ خودرو ثبت شود؛ رانندگی با تغییرِ تأییدنشده جریمه دارد. پنج جمله‌ی بانک همین را می‌سنجند و هر پنج تا غلط‌اند:",
      columns: ["قاعده"],
      rows: [
        {
          label: "ترمزِ نامتعادل",
          it: "freni squilibrati",
          values: ["ترمزی که خودرو را به یک طرف می‌کشد باید تعمیر شود. «اگر راننده با فرمان جبرانش کند لازم نیست» غلط است: در ترمزِ ناگهانی یا روی جاده‌ی لغزنده جبران ممکن نیست."],
        },
        {
          label: "چراغِ قرمزِ روغن",
          it: "spia rossa dell’olio",
          values: ["چراغِ نشانگرِ قرمز یعنی ایراد، نه سلامت. اگر چراغِ روغن در حرکت روشن بماند، فشارِ روغن کافی نیست (فصلِ ۱۸)."],
        },
        {
          label: "حجمِ موتور، ECU",
          it: "cilindrata · centralina",
          values: ["بالا بردنِ حجمِ موتور یا تغییرِ تنظیماتِ الکترونیکیِ واحدِ کنترلِ موتور برای قدرتِ بیشتر، تغییرِ ساختی است: بدونِ بازدید و تأیید مجاز نیست."],
        },
        {
          label: "پمپِ انژکتور",
          it: "pompa di iniezione",
          values: ["قطعه‌ای دقیق است و تعمیرش کارِ تعمیرگاهِ متخصص است. بانک «بهتر است راننده خودش انجامش دهد» را غلط می‌داند."],
        },
      ],
      takeaway: "ایرادِ ترمز را تعمیر کن، چراغِ قرمز را جدی بگیر، قدرتِ موتور را بی‌تأیید دست نزن.",
      rule: `${CDS("79")} c.1; ${CDS("78")} c.1, c.3; pompa di iniezione: indicazione tecnica, nessun articolo del CdS`,
    },
    {
      kind: "classify",
      title: "علت هست یا نیست؟",
      body: "هر مورد را دسته‌بندی کن. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "può essere causa", fa: "می‌تواند علت باشد" },
        { it: "non è causa", fa: "علت نیست" },
      ],
      items: [
        { prompt: "پیچی تند پشتِ یک سربالایی، بدونِ تابلوی خطر", answer: 0, explain: "پیچِ بی‌علامت راننده را غافلگیر می‌کند." },
        { prompt: "جزیره‌ای وسطِ جاده که دو جهت را از هم جدا می‌کند", answer: 1, explain: "جدا کردنِ جهت‌ها برای ایمنی است، مثلِ سواره‌روهای جدا." },
        { prompt: "لکه‌ی روغن روی آسفالت", answer: 0, explain: "سطحِ لغزنده چسبندگی را کم می‌کند." },
        { prompt: "خط‌کشیِ تازه و روشن", answer: 1, explain: "خط‌کشی راه را نشان می‌دهد؛ نبودنش است که می‌تواند علت باشد." },
        { prompt: "ترمزی که موقعِ ترمز خودرو را به چپ می‌کشد", answer: 0, explain: "خودرو در حداکثرِ کارآمدی نیست." },
      ],
      takeaway: "سه منبعِ علت: جاده‌ی غافلگیرکننده یا لغزنده، خودروی ناسالم، و راننده (درسِ بعد).",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la causa probabile", fa: "علتِ احتمالی" },
        { it: "la ristrettezza della strada", fa: "باریکیِ جاده" },
        { it: "la strettoia", fa: "باریکه" },
        { it: "il fondo stradale deformato · scivoloso", fa: "سطحِ جاده‌ی تغییرشکل‌داده · لغزنده" },
        { it: "le barriere laterali (guardrail)", fa: "گاردریل" },
        { it: "la regolamentazione semaforica", fa: "کنترلِ تردد با چراغ راهنمایی" },
        { it: "i freni squilibrati", fa: "ترمزِ نامتعادل" },
        { it: "la cilindrata", fa: "حجمِ موتور" },
        { it: "la centralina", fa: "واحدِ کنترلِ موتور (ECU)" },
      ],
    },
    {
      kind: "trap",
      title: "«mancanza»: نبودِ چه چیزی؟",
      body: "هر دو جمله «نبودِ» چیزی را علت می‌دانند. فرق در این است که چه چیزی نیست:",
      examples: [
        {
          sourceId: "6362",
          textIt: "Causa probabile di incidenti dovuti alla struttura della strada può essere mancanza di segnaletica orizzontale",
          answer: 1,
          chunks: [
            { it: CAUSA, fa: CAUSA_FA },
            { it: "può essere", fa: "می‌تواند باشد", verb: "può ← potere" },
            { it: "mancanza di segnaletica orizzontale", fa: "نبودِ خط‌کشی و نقش‌های روی آسفالت", focus: "negation" },
          ],
          translation: "علتِ احتمالیِ تصادف‌های ناشی از ساختارِ جاده می‌تواند نبودِ خط‌کشی و نقش‌های روی آسفالت باشد.",
          why: "درست است. خط‌کشی خطوطِ عبور و لبه‌ی جاده را نشان می‌دهد؛ بی آن، به‌خصوص شب یا در مه، راننده جایش را گم می‌کند.",
        },
        {
          sourceId: "6372",
          textIt: "Causa probabile di incidenti dovuti alla struttura della strada può essere mancanza di curve pericolose",
          answer: 0,
          chunks: [
            { it: CAUSA, fa: CAUSA_FA },
            { it: "può essere", fa: "می‌تواند باشد", verb: "può ← potere" },
            { it: "mancanza di curve pericolose", fa: "نبودِ پیچ‌های خطرناک", focus: "contrast" },
          ],
          translation: "علتِ احتمالیِ تصادف‌های ناشی از ساختارِ جاده می‌تواند نبودِ پیچ‌های خطرناک باشد.",
          why: "غلط است. نبودِ پیچِ خطرناک جاده را امن‌تر می‌کند. «mancanza» فقط وقتی علت است که چیزِ ایمنی‌ساز نباشد.",
        },
      ],
      takeaway: "در «mancanza di …» بپرس: آن چیز ایمنی می‌آورد یا خطر؟ نبودنِ ایمنی علت است، نبودنِ خطر نه.",
      rule: `${CDS("14")} c.1`,
    },
  ],
  practice: [
    {
      sourceId: "6364",
      textIt: "Causa probabile di incidenti dovuti alla struttura della strada può essere fondo stradale scivoloso",
      answer: 1,
      chunks: [
        { it: CAUSA, fa: CAUSA_FA },
        { it: "può essere", fa: "می‌تواند باشد", verb: "può ← potere" },
        { it: "fondo stradale scivoloso", fa: "سطحِ لغزنده‌ی جاده" },
      ],
      translation: "علتِ احتمالیِ تصادف‌های ناشی از ساختارِ جاده می‌تواند سطحِ لغزنده‌ی جاده باشد.",
      why: "درست است (قدم ۱). سطحِ لغزنده چسبندگی را کم می‌کند و ترمز کردن و پیچیدن را سخت.",
      rule: `${CDS("14")} c.1; ${CDS("141")} c.2`,
      conceptStep: 1,
    },
    {
      sourceId: "6369",
      textIt: "Causa probabile di incidenti dovuti alla struttura della strada può essere strada a percorso pianeggiante",
      answer: 0,
      chunks: [
        { it: CAUSA, fa: CAUSA_FA },
        { it: "può essere", fa: "می‌تواند باشد", verb: "può ← potere" },
        { it: "strada a percorso pianeggiante", fa: "جاده‌ی هموار (بی‌سربالایی و سرازیری)", focus: "contrast" },
      ],
      translation: "علتِ احتمالیِ تصادف‌های ناشی از ساختارِ جاده می‌تواند جاده‌ی هموار باشد.",
      why: "غلط است (قدم ۱). جاده‌ی هموار نه غافلگیر می‌کند نه چسبندگی را کم؛ علتِ تصادف نیست.",
      rule: CDS("14"),
      conceptStep: 1,
    },
    {
      sourceId: "6438",
      textIt: "È consentito migliorare le prestazioni del proprio veicolo aumentando la cilindrata del motore",
      answer: 0,
      chunks: [
        { it: "È consentito", fa: "مجاز است", verb: "è ← essere", focus: "contrast" },
        { it: "migliorare le prestazioni del proprio veicolo", fa: "عملکردِ خودروی خود را بهتر کردن" },
        { it: "aumentando la cilindrata del motore", fa: "با بالا بردنِ حجمِ موتور", verb: "aumentando ← aumentare" },
      ],
      translation: "مجاز است عملکردِ خودروی خود را با بالا بردنِ حجمِ موتور بهتر کرد.",
      why: "غلط است (قدم ۲). حجمِ موتور جزوِ ویژگی‌های ساختیِ تأییدشده است؛ تغییرش بدونِ بازدید و آزمایش و ثبت در کارتِ خودرو مجاز نیست.",
      rule: `${CDS("78")} c.1, c.3`,
      conceptStep: 2,
    },
    {
      sourceId: "6437",
      textIt: "Il corretto funzionamento del motore è garantito dal fatto che la spia rossa dell’olio di lubrificazione rimane costantemente accesa",
      answer: 0,
      chunks: [
        { it: "Il corretto funzionamento del motore", fa: "درست کار کردنِ موتور" },
        { it: "è garantito dal fatto", fa: "تضمین می‌شود با این‌که", verb: "è garantito ← garantire" },
        { it: "che la spia rossa dell’olio di lubrificazione", fa: "چراغِ نشانگرِ قرمزِ روغن" },
        { it: "rimane costantemente accesa", fa: "همیشه روشن بماند", verb: "rimane ← rimanere", focus: "always" },
      ],
      translation: "درست کار کردنِ موتور با این تضمین می‌شود که چراغِ نشانگرِ قرمزِ روغن همیشه روشن بماند.",
      why: "غلط است (قدم ۲). قرمز یعنی ایراد: چراغِ روغن که در حرکت روشن می‌ماند یعنی فشارِ روغن کافی نیست (فصلِ ۱۸).",
      rule: `${CDS("79")} c.1; DPR 495/1992 (spie)`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6360", "6361", "6362", "6363", "6364", "6365", "6366", "6367", "6368", "6369", "6370", "6371", "6372"] },
    { step: 2, sourceIds: ["6435", "6437", "6438", "6439", "6441"] },
  ],
};

// ── Lesson 2 ──────────────────────────────────────────────────────────────────

export const lessonTamponamentiPortiere: Lesson = {
  id: "tamponamenti-portiere",
  titleFa: "تصادف از پشت، و درِ خودرو",
  titleIt: "TAMPONAMENTI · SALITA E DISCESA DEI PASSEGGERI",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس سه علتِ اصلیِ تصادف از پشت را می‌دانی (سرعتِ زیاد، فاصله‌ی ایمنیِ کم، بی‌توجهی) و دو بهانه‌ی ساختگیِ بانک را کنار می‌گذاری. و می‌دانی مسافر کِی، از کدام طرف و با چه احتیاطی سوار و پیاده می‌شود.",
      why:
        "۹ سؤال (دو سؤالِ دیگرِ این گروه، درباره‌ی فاصله و زمانِ واکنش، در فصلِ ۱۲ تمرین می‌شوند). این دو موضوع یک چیزِ مشترک دارند: هر دو تصادفِ روزمره‌اند و هر دو با توجه به اطراف پیش‌گیری می‌شوند، نه با شانس.",
      rule: `${CDS("149")} c.1; ${CDS("157")} c.7`,
    },
    {
      kind: "table",
      title: "تصادف از پشت: سه علتِ اصلی",
      body:
        "وقتی خودروی جلویی ناگهان ترمز می‌کند، راننده‌ی پشتی فقط وقتی به‌موقع می‌ایستد که سه چیز درست باشد: سرعتش، فاصله‌اش و حواسش. سرعت هر دو بخشِ مسافتِ توقف را بلند می‌کند: هم مسافتی که در زمانِ واکنش طی می‌شود، هم مسافتِ ترمز (فصلِ ۱۲).",
      columns: ["چرا"],
      rows: [
        { label: "سرعتِ زیاد", it: "la forte velocità", values: ["مسافتِ توقف بلندتر می‌شود؛ در همان یک ثانیه‌ی واکنش، خودروی سریع‌تر راهِ بیشتری می‌رود."] },
        { label: "فاصله‌ی ایمنیِ کم", it: "non rispettare la distanza di sicurezza", values: ["اگر جلویی ترمز کند، جایی برای ایستادن نمی‌ماند."] },
        { label: "بی‌توجهی", it: "la disattenzione dei conducenti", values: ["گوشی، صحبت، خستگی: زمانِ واکنش بلندتر می‌شود و ترمزِ جلویی دیر دیده می‌شود."] },
        {
          label: "بهانه‌های ساختگی",
          it: "freno di stazionamento · servosterzo",
          values: ["ترمزِ دستی برای پارک است و در حرکت کار نمی‌کند؛ فرمانِ کمکی (هیدرولیک یا برقی) هم تصادف از پشت را بیشتر نمی‌کند. بانک این دو را «علتِ اصلی» می‌گوید تا غلط باشد."],
        },
      ],
      takeaway: "تصادف از پشت = سرعت + فاصله + حواس. خرابیِ ناگهانی یا نوعِ فرمان علتِ اصلی نیست.",
      rule: `${CDS("141")} c.1–2; ${CDS("149")} c.1`,
    },
    {
      kind: "table",
      title: "سوار و پیاده شدن: کِی، کدام طرف، کدام در",
      body:
        "قانون باز کردنِ در، پیاده شدن یا باز گذاشتنِ در را بدونِ اطمینان از این‌که برای دیگران خطر یا مزاحمت ندارد ممنوع می‌کند (فصلِ ۱۶). بانک همین را از زاویه‌ی مسافر می‌پرسد:",
      columns: ["قاعده"],
      rows: [
        { label: "کِی", it: "a veicolo completamente fermo", values: ["مسافر فقط وقتی خودرو کاملاً ایستاده سوار یا پیاده می‌شود."] },
        { label: "کدام طرف", it: "dal lato del marciapiede", values: ["از طرفِ پیاده‌رو؛ اگر پیاده‌رو نیست، از طرفی که ترافیک در آن نیست."] },
        { label: "در را کِی باز کنی", it: "solamente quando non si causa pericolo", values: ["فقط وقتی برای دیگران خطری ندارد: اول آینه و پشتِ سر را نگاه کن."] },
        { label: "درِ راست هم", it: "la portiera di destra", values: ["بی‌خطر نیست: دوچرخه، موتور گازی و عابرِ پیاده از راست می‌رسند."] },
        { label: "کودک", it: "il controllo di un adulto", values: ["کودک با نظارتِ یک بزرگسال سوار و پیاده می‌شود."] },
      ],
      takeaway: "اول بایست، بعد نگاه کن، بعد باز کن؛ از طرفِ پیاده‌رو. هیچ دری «بی‌خطر» نیست.",
      rule: `${CDS("157")} c.7`,
    },
    {
      kind: "classify",
      title: "درست یا اشتباه؟",
      body: "هر موقعیت را بخوان. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "va bene", fa: "درست است" },
        { it: "è un errore", fa: "اشتباه است" },
      ],
      items: [
        { prompt: "پشتِ چراغ قرمز، مسافرِ عقب درِ سمتِ خیابان را باز می‌کند تا زودتر به ایستگاه برسد", answer: 1, explain: "خودرو در ترافیک است و در به سمتِ ترافیک باز می‌شود." },
        { prompt: "کنارِ پیاده‌رو کاملاً می‌ایستی و مسافر از درِ سمتِ پیاده‌رو پیاده می‌شود", answer: 0, explain: "خودرو ایستاده و طرفِ پیاده‌رو است." },
        { prompt: "در ترافیکِ کند به گوشی نگاه می‌کنی، چون جلویی تکان نمی‌خورد", answer: 1, explain: "بی‌توجهی یکی از سه علتِ اصلیِ تصادف از پشت است؛ صف هر لحظه ممکن است حرکت کند یا بایستد." },
        { prompt: "در باران فاصله‌ات را با خودروی جلو بیشتر می‌کنی", answer: 0, explain: "روی جاده‌ی خیس ترمز بلندتر می‌شود؛ فاصله‌ی بیشتر جبرانش می‌کند." },
        { prompt: "کودک خودش در را باز می‌کند و پیاده می‌شود، بزرگسال هنوز داخل است", answer: 1, explain: "کودک با نظارتِ بزرگسال پیاده می‌شود." },
      ],
      takeaway: "تصادف از پشت و ضربه‌ی در هر دو با یک عادت کم می‌شوند: قبل از هر حرکت، اطراف را ببین.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il tamponamento", fa: "تصادف از پشت" },
        { it: "la distanza di sicurezza", fa: "فاصله‌ی ایمنی" },
        { it: "la disattenzione", fa: "بی‌توجهی" },
        { it: "il tempo di reazione", fa: "زمانِ واکنش" },
        { it: "il freno di stazionamento", fa: "ترمزِ دستی" },
        { it: "il servosterzo", fa: "فرمانِ کمکی (هیدرولیک یا برقی)" },
        { it: "la portiera", fa: "درِ خودرو" },
        { it: "il lato del marciapiede", fa: "طرفِ پیاده‌رو" },
        { it: "completamente fermo", fa: "کاملاً ایستاده" },
      ],
    },
    {
      kind: "trap",
      title: "«principalmente»: علتِ اصلی یا بهانه؟",
      body: "هر دو جمله با «بیشتر به‌خاطرِ» شروع می‌شوند. یکی علتِ واقعی را می‌گوید، یکی چیزی که فقط ممکن است:",
      examples: [
        {
          sourceId: "6452",
          textIt: "I tamponamenti stradali avvengono principalmente per la disattenzione dei conducenti",
          answer: 1,
          chunks: [
            { it: TAMP, fa: TAMP_FA },
            { it: "avvengono principalmente", fa: "بیشتر رخ می‌دهند", verb: "avvengono ← avvenire", focus: "reason" },
            { it: "per la disattenzione dei conducenti", fa: "به‌خاطرِ بی‌توجهیِ رانندگان" },
          ],
          translation: "تصادف‌های از پشت بیشتر به‌خاطرِ بی‌توجهیِ رانندگان رخ می‌دهند.",
          why: "درست است. بی‌توجهی ترمزِ جلویی را دیر نشان می‌دهد؛ یکی از سه علتِ اصلی است.",
        },
        {
          sourceId: "6453",
          textIt: "I tamponamenti stradali avvengono principalmente per l'improvviso guasto del freno di stazionamento",
          answer: 0,
          chunks: [
            { it: TAMP, fa: TAMP_FA },
            { it: "avvengono principalmente", fa: "بیشتر رخ می‌دهند", verb: "avvengono ← avvenire", focus: "reason" },
            { it: "per l'improvviso guasto del freno di stazionamento", fa: "به‌خاطرِ خرابیِ ناگهانیِ ترمزِ دستی", focus: "contrast" },
          ],
          translation: "تصادف‌های از پشت بیشتر به‌خاطرِ خرابیِ ناگهانیِ ترمزِ دستی رخ می‌دهند.",
          why: "غلط است. ترمزِ دستی برای پارک است؛ خرابی‌اش علتِ اصلیِ تصادف از پشت نیست.",
        },
      ],
      takeaway: "«principalmente» یعنی علتِ اصلی و رایج. علت‌های اصلی کارِ راننده‌اند: سرعت، فاصله، حواس.",
      rule: `${CDS("141")}; ${CDS("149")} c.1`,
    },
  ],
  practice: [
    {
      sourceId: "6450",
      textIt: "I tamponamenti stradali avvengono principalmente per la forte velocità",
      answer: 1,
      chunks: [
        { it: TAMP, fa: TAMP_FA },
        { it: "avvengono principalmente", fa: "بیشتر رخ می‌دهند", verb: "avvengono ← avvenire", focus: "reason" },
        { it: "per la forte velocità", fa: "به‌خاطرِ سرعتِ زیاد" },
      ],
      translation: "تصادف‌های از پشت بیشتر به‌خاطرِ سرعتِ زیاد رخ می‌دهند.",
      why: "درست است (قدم ۱). سرعتِ زیاد مسافتِ توقف را بلند می‌کند و جا برای ایستادن نمی‌گذارد.",
      rule: `${CDS("141")} c.1–2`,
      conceptStep: 1,
    },
    {
      sourceId: "6443",
      textIt: "Quando si deve far salire o scendere un passeggero dal veicolo, bisogna aprire la portiera solamente quando non si causa pericolo agli altri utenti della strada",
      answer: 1,
      chunks: [
        { it: "Quando si deve far salire o scendere un passeggero dal veicolo,", fa: "وقتی باید مسافری را سوار یا پیاده کنی،", verb: "deve ← dovere" },
        { it: "bisogna aprire la portiera", fa: "درِ خودرو را باید باز کرد", verb: "bisogna ← bisognare" },
        { it: "solamente quando non si causa pericolo", fa: "فقط وقتی خطری ایجاد نمی‌شود", focus: "condition" },
        { it: "agli altri utenti della strada", fa: "برای دیگر کاربرانِ راه" },
      ],
      translation: "وقتی باید مسافری را سوار یا پیاده کنی، درِ خودرو را فقط وقتی باید باز کرد که برای دیگر کاربرانِ راه خطری ایجاد نشود.",
      why: "درست است (قدم ۲). باز کردنِ در بدونِ اطمینان از نبودِ خطر برای دیگران ممنوع است.",
      rule: `${CDS("157")} c.7`,
      conceptStep: 2,
    },
    {
      sourceId: "6446",
      textIt: "Quando si deve far scendere un passeggero, bisogna tenere presente che l'apertura della portiera di destra è priva di qualsiasi rischio e pericolo",
      answer: 0,
      chunks: [
        { it: "Quando si deve far scendere un passeggero,", fa: "وقتی باید مسافری را پیاده کنی،", verb: "deve ← dovere" },
        { it: "bisogna tenere presente", fa: "باید در نظر داشت", verb: "bisogna ← bisognare" },
        { it: "che l'apertura della portiera di destra", fa: "که باز کردنِ درِ سمتِ راست" },
        { it: "è priva di qualsiasi rischio e pericolo", fa: "هیچ خطری ندارد", verb: "è ← essere", focus: "always" },
      ],
      translation: "وقتی باید مسافری را پیاده کنی، باید در نظر داشت که باز کردنِ درِ سمتِ راست هیچ خطری ندارد.",
      why: "غلط است (قدم ۲). از راست هم دوچرخه، موتور گازی و عابرِ پیاده می‌آیند؛ هیچ دری بی‌خطر نیست.",
      rule: `${CDS("157")} c.7`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6450", "6452", "6453", "6454"] },
    { step: 2, sourceIds: ["6442", "6443", "6444", "6445", "6446"] },
  ],
};
