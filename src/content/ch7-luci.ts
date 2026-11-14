/**
 * src/content/ch7-luci.ts
 * Chapter 7 (Semafori e segnali degli agenti del traffico), lessons 4–7: the
 * other luminous signals. Lane arrows and reversible lanes (images 155, 159),
 * pedestrian / bicycle / public-transport lights (157, 158, 156), the single
 * flashing yellow lights and the green wave (160, 161), and the flashing red
 * lights at level crossings, movable bridges and ferry piers (162).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter7.test.ts
 * and `npm run verify:lessons`.
 *
 * Flag (bank unchanged): CdS art. 41 c.15 says that without bicycle lights
 * "i ciclisti sulle intersezioni semaforizzate devono assumere il comportamento
 * dei pedoni". The bank (#2683, #2752, #2780) treats vehicle lights as valid
 * for bicycles, which matches a cyclist riding in the carriageway (a vehicle,
 * art. 47). Lessons 1 and 5 teach the bank's reading and keep the bicycle light
 * for cyclists leaving a cycle path (art. 41 c.6). See docs/chapter-7-coverage.md.
 */
import type { Lesson } from "./lessons.js";

const SEMAFORI = "I semafori in figura";
const SEMAFORI_FA = "چراغ‌های تصویر";
const SEGNALI = "I segnali luminosi in figura";
const SEGNALI_FA = "چراغ‌های تصویر";
const SEMAFORO = "Il semaforo in figura";
const SEMAFORO_FA = "چراغِ تصویر";
const REVERSIBILI = "Il semaforo di corsie reversibili in figura";
const REVERSIBILI_FA = "چراغِ خط‌های برگشت‌پذیرِ تصویر";
const LUCI = "Le luci rosse accese lampeggianti in figura";
const LUCI_FA = "چراغ‌های قرمزِ روشن و چشمک‌زنِ تصویر";
const LUCI_PL = "Le luci in figura";
const LUCI_PL_FA = "چراغ‌های تصویر";
const AVVICINANDOSI = "Avvicinandosi ad un passaggio a livello con luci rosse accese e semibarriera ancora alzata,";
const AVVICINANDOSI_FA = "وقتی به گذرگاهِ راه‌آهنی نزدیک می‌شوی که چراغ‌های قرمزش روشن است و نیم‌راه‌بندش هنوز بالاست،";

// ── Lesson 4 ──────────────────────────────────────────────────────────────────

export const lessonCorsieReversibili: Lesson = {
  id: "semafori-corsia-reversibili",
  titleFa: "چراغِ فلش‌دار: فقط برای مسیرِ خودت",
  titleIt: "SEMAFORI DI CORSIA · CORSIE REVERSIBILI",
  minutes: 5,
  signs: [155, 159],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس دو چراغِ فلش‌دار را از هم جدا می‌کنی: چراغِ خط (فلش‌های سه‌رنگ سرِ تقاطع، هر فلش فقط برای جهتِ خودش) و چراغِ خطِ برگشت‌پذیر (ضربدرِ قرمز و فلشِ سبز بالای هر خط).",
      why:
        "۳۵ سؤال. بانک این دو چراغ را با هم، و با چراغِ اتوبوس، گذرگاهِ راه‌آهن و پل متحرک عوض می‌کند. اگر شکلشان را بشناسی، نیمی از جمله‌ها همان‌جا حل می‌شوند.",
    },
    {
      kind: "table",
      title: "چراغِ خط: هر فلش فقط برای جهتِ خودش",
      body: "همان چراغِ وسایلِ نقلیه است، ولی جای دایره، فلش دارد. هر ستون مالِ خودروهایی است که به سمتِ آن فلش می‌روند.",
      columns: ["قاعده"],
      rows: [
        {
          label: "چه چیزی است",
          it: "semafori di corsia",
          sign: 155,
          values: ["سه فلشِ قرمز، زرد و سبز روی زمینه‌ی سیاه؛ برای هر جهت یک ستون. سرِ تقاطع‌هایی که برای هر جهت خطِ جدا دارند."],
        },
        { label: "فلشِ سبز", it: "freccia verde", values: ["فقط به سمتِ فلشِ سبز می‌توانی بروی. فلشِ سبزِ رو به بالا یعنی «مستقیم»، نه «همه‌ی جهت‌ها»."] },
        { label: "فلشِ قرمز", it: "freccia rossa", values: ["خودروهایی که به سمتِ فلشِ قرمز می‌روند پشتِ خط می‌ایستند. «با احتیاط برو» نیست."] },
        { label: "فلشِ زردِ ثابت", it: "freccia gialla fissa", values: ["مثلِ زردِ معمولی: اگر وارد تقاطع شده‌ای فوراً خالی‌اش کن، وگرنه اگر بی‌خطر می‌شود بایست."] },
        { label: "زردِ چشمک‌زن یا خاموش", it: "lampeggiante · spento", values: ["رد شدن مجاز است، با احتیاطِ ویژه."] },
        { label: "برای چه کسی", it: "anche le biciclette", values: ["همه‌ی وسایلِ نقلیه‌ای که به آن جهت می‌روند، دوچرخه هم."] },
      ],
      takeaway: "فلش = فقط جهتِ خودش. رنگ‌ها همان معنیِ چراغِ معمولی را دارند.",
      rule: "Codice della Strada art. 41 c.3, c.12, c.17–18; DPR 495/1992 art. 160",
    },
    {
      kind: "table",
      title: "اشتباهش نگیر",
      body: "بانک این چراغ را به هر جایی که چراغِ ویژه دارد نسبت می‌دهد. همه‌ی این‌ها غلط‌اند:",
      columns: ["چرا نیست"],
      rows: [
        { label: "چراغِ اتوبوس", it: "trasporto pubblico", values: ["چراغِ خطِ عمومی نوارِ سفید و مثلثِ زرد دارد، نه فلشِ رنگی (درس ۵)."] },
        { label: "تراموا و قطار", it: "veicoli su rotaie", values: ["این چراغ برای وسایلِ روی ریل نیست؛ برای خطوطِ خودروهای جاده است."] },
        {
          label: "پل متحرک، اسکله، راه‌آهن",
          it: "ponte mobile · pontile · passaggio a livello",
          values: ["آنجا چراغِ قرمزِ چشمک‌زن است (درس ۷). ورودیِ تونل هم جای این چراغ نیست."],
        },
        { label: "خطِ برگشت‌پذیر", it: "corsie reversibili", values: ["آن چراغ ضربدرِ قرمز و فلشِ سبزِ رو به پایین دارد، بالای خودِ خط (قدمِ بعد)."] },
      ],
      takeaway: "فلش‌های سه‌رنگ سرِ تقاطع = چراغِ خط. نه اتوبوس، نه ریل، نه پل و اسکله.",
      rule: "DPR 495/1992 art. 160; art. 161; art. 164; art. 166",
    },
    {
      kind: "table",
      title: "خطِ برگشت‌پذیر: ضربدر، فلشِ سبز، فلشِ زرد",
      body: "در بعضی جاده‌ها جهتِ یک خط در ساعت‌های مختلف عوض می‌شود. بالای هر خط یک چراغ می‌گوید الان می‌شود در آن راند یا نه.",
      columns: ["قاعده"],
      rows: [
        {
          label: "کجاست",
          it: "carreggiata con tre o più corsie",
          sign: 159,
          values: ["بالای خطوطِ سواره‌رویی با سه خط یا بیشتر (یا سرِ عوارضی و ایست‌ها). فقط برای جاده‌ی یک‌طرفه نیست."],
        },
        { label: "ضربدرِ قرمز", it: "luce rossa a forma di X", values: ["وارد این خط نشو و در آن نران. «بایست و منتظرِ زرد بمان» نیست؛ جلوی این چراغ ایستادن ممنوع است."] },
        { label: "فلشِ سبزِ رو به پایین", it: "freccia verde", values: ["می‌توانی در این خط برانی."] },
        { label: "فلشِ زردِ مایلِ چشمک‌زن", it: "freccia gialla lampeggiante", values: ["باید این خط را ترک کنی و به خطی بروی که فلش نشان می‌دهد."] },
        {
          label: "برای چه کسی",
          it: "veicoli, non pedoni",
          values: ["وسایلِ نقلیه، دوچرخه هم؛ برای عابر نیست. خطِ کندرو، خطِ توقفِ اضطراری یا خطِ سبقت هم نیست."],
        },
      ],
      takeaway: "ضربدر = این خط بسته است. فلشِ سبز = باز است. فلشِ زردِ چشمک‌زن = از این خط بیرون برو.",
      rule: "Codice della Strada art. 41 c.7, c.16; DPR 495/1992 art. 164",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il semaforo di corsia", fa: "چراغِ خط (فلش‌دار)" },
        { it: "la freccia", fa: "فلش" },
        { it: "nella direzione della freccia", fa: "به سمتِ فلش" },
        { it: "la corsia reversibile", fa: "خطِ برگشت‌پذیر (جهتش عوض می‌شود)" },
        { it: "a forma di X", fa: "به شکلِ ضربدر" },
        { it: "occupare la corsia", base: "occupare", fa: "وارد خط شدن و در آن بودن" },
        { it: "abbandonare la corsia", base: "abbandonare", fa: "خط را ترک کردن" },
        { it: "spostarsi", fa: "جابه‌جا شدن؛ رفتن به خطِ دیگر" },
      ],
    },
    {
      kind: "trap",
      title: "ضربدرِ قرمز: بایستی یا وارد نشوی؟",
      body: "هر دو جمله درباره‌ی ضربدرِ قرمزِ بالای خط است. فقط یکی درست است:",
      examples: [
        {
          sourceId: "2771",
          sign: 159,
          textIt: "Il semaforo in figura non consente di occupare la corsia indicata con luce rossa a forma di X",
          answer: 1,
          chunks: [
            { it: SEMAFORO, fa: SEMAFORO_FA },
            { it: "non consente di occupare la corsia", fa: "اجازه نمی‌دهد وارد خطی شوی", verb: "consente ← consentire", focus: "negation" },
            { it: "indicata con luce rossa a forma di X", fa: "که با چراغِ قرمزِ ضربدری نشان داده شده" },
          ],
          translation: "چراغِ تصویر اجازه نمی‌دهد وارد خطی شوی که با چراغِ قرمزِ ضربدری نشان داده شده.",
          why: "درست است. ضربدرِ قرمز یعنی این خط برای تو بسته است.",
        },
        {
          sourceId: "2779",
          sign: 159,
          textIt: "Nei semafori in figura, la luce rossa a forma di X impone di arrestarsi ed attendere la luce gialla",
          answer: 0,
          chunks: [
            { it: "Nei semafori in figura,", fa: "در چراغ‌های تصویر،" },
            { it: "la luce rossa a forma di X", fa: "چراغِ قرمزِ ضربدری" },
            { it: "impone di arrestarsi ed attendere la luce gialla", fa: "مجبور می‌کند بایستی و منتظرِ زرد بمانی", verb: "impone ← imporre", focus: "contrast" },
          ],
          translation: "در چراغ‌های تصویر، چراغِ قرمزِ ضربدری مجبور می‌کند بایستی و منتظرِ زرد بمانی.",
          why: "غلط است. ضربدر چراغِ «صبر کن» نیست؛ می‌گوید در این خط نران. جلویش ایستادن هم ممنوع است.",
        },
      ],
      takeaway: "ضربدر خط را می‌بندد، نوبت نمی‌دهد. به خطِ باز برو، نه اینکه بایستی.",
      rule: "Codice della Strada art. 41 c.16",
    },
  ],
  practice: [
    {
      sourceId: "2684",
      sign: 155,
      textIt: "Nel semaforo in figura le frecce verdi accese, rivolte verso l'alto, indicano che si può proseguire in tutte le direzioni",
      answer: 0,
      chunks: [
        { it: "Nel semaforo in figura", fa: "در چراغِ تصویر" },
        { it: "le frecce verdi accese, rivolte verso l'alto,", fa: "فلش‌های سبزِ روشنِ رو به بالا" },
        { it: "indicano che si può proseguire", fa: "نشان می‌دهند که می‌شود ادامه داد", verb: "indicano ← indicare" },
        { it: "in tutte le direzioni", fa: "به همه‌ی جهت‌ها", focus: "always" },
      ],
      translation: "در چراغِ تصویر، فلش‌های سبزِ روشنِ رو به بالا نشان می‌دهند که می‌شود به همه‌ی جهت‌ها ادامه داد.",
      why: "غلط است (قدم ۱). فلشِ رو به بالا یعنی فقط مستقیم. هر فلش فقط جهتِ خودش را باز می‌کند.",
      rule: "Codice della Strada art. 41 c.3, c.12",
      conceptStep: 1,
    },
    {
      sourceId: "2683",
      sign: 155,
      textIt: "I segnali luminosi in figura valgono anche per le biciclette",
      answer: 1,
      chunks: [
        { it: SEGNALI, fa: SEGNALI_FA },
        { it: "valgono", fa: "معتبرند", verb: "valgono ← valere" },
        { it: "anche per le biciclette", fa: "برای دوچرخه‌ها هم" },
      ],
      translation: "چراغ‌های تصویر برای دوچرخه‌ها هم معتبرند.",
      why: "درست است (قدم ۱). چراغِ خط مالِ وسایلِ نقلیه‌ای است که به آن جهت می‌روند؛ دوچرخه هم وسیله‌ی نقلیه است.",
      rule: "Codice della Strada art. 41 c.12",
      conceptStep: 1,
    },
    {
      sourceId: "2687",
      sign: 155,
      textIt: "I segnali luminosi in figura sono semafori per i veicoli su rotaie (tram, treni)",
      answer: 0,
      chunks: [
        { it: SEGNALI, fa: SEGNALI_FA },
        { it: "sono semafori per i veicoli su rotaie (tram, treni)", fa: "چراغ‌هایی برای وسایلِ روی ریل (تراموا، قطار) هستند", focus: "contrast" },
      ],
      translation: "چراغ‌های تصویر چراغ‌هایی برای وسایلِ روی ریل (تراموا، قطار) هستند.",
      why: "غلط است (قدم ۲). این‌ها چراغِ خطِ خودروهای جاده‌اند، نه چراغِ وسایلِ ریلی.",
      rule: "DPR 495/1992 art. 160",
      conceptStep: 2,
    },
    {
      sourceId: "2776",
      sign: 159,
      textIt: "Il semaforo di corsie reversibili in figura, con freccia gialla lampeggiante impone al conducente di abbandonare quella corsia e di spostarsi in quella indicata",
      answer: 1,
      chunks: [
        { it: "Il semaforo di corsie reversibili in figura,", fa: "چراغِ خط‌های برگشت‌پذیرِ تصویر،" },
        { it: "con freccia gialla lampeggiante", fa: "با فلشِ زردِ چشمک‌زن", focus: "condition" },
        { it: "impone al conducente di abbandonare quella corsia", fa: "راننده را مجبور می‌کند آن خط را ترک کند", verb: "impone ← imporre" },
        { it: "e di spostarsi in quella indicata", fa: "و به خطی که نشان داده شده برود" },
      ],
      translation: "چراغِ خط‌های برگشت‌پذیرِ تصویر، با فلشِ زردِ چشمک‌زن، راننده را مجبور می‌کند آن خط را ترک کند و به خطی که نشان داده شده برود.",
      why: "درست است (قدم ۳). فلشِ زردِ چشمک‌زن یعنی این خط به‌زودی بسته می‌شود: بیرون برو.",
      rule: "DPR 495/1992 art. 164 c.2",
      conceptStep: 3,
    },
    {
      sourceId: "2784",
      sign: 159,
      textIt: "Il semaforo di corsie reversibili in figura è posto solo su carreggiate a senso unico di circolazione",
      answer: 0,
      chunks: [
        { it: REVERSIBILI, fa: REVERSIBILI_FA },
        { it: "è posto", fa: "نصب می‌شود", verb: "è posto ← porre" },
        { it: "solo su carreggiate a senso unico di circolazione", fa: "فقط روی سواره‌روهای یک‌طرفه", focus: "limit" },
      ],
      translation: "چراغِ خط‌های برگشت‌پذیرِ تصویر فقط روی سواره‌روهای یک‌طرفه نصب می‌شود.",
      why: "غلط است (قدم ۳). خطِ برگشت‌پذیر یعنی جهتش عوض می‌شود؛ این روی سواره‌روی دوطرفه با سه خط یا بیشتر معنی دارد. «فقط یک‌طرفه» درست نیست.",
      rule: "DPR 495/1992 art. 164 c.1–2",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2673", "2674", "2675", "2676", "2677", "2678", "2679", "2680", "2681", "2682", "2683", "2684", "2685"] },
    { step: 2, sourceIds: ["2686", "2687", "2688", "2689", "2690", "2691", "2692"] },
    {
      step: 3,
      sourceIds: ["2770", "2771", "2772", "2773", "2774", "2775", "2776", "2777", "2778", "2779", "2780", "2781", "2782", "2783", "2784"],
    },
  ],
};

// ── Lesson 5 ──────────────────────────────────────────────────────────────────

export const lessonPedoniBiciBus: Lesson = {
  id: "semafori-pedoni-bici-bus",
  titleFa: "چراغِ عابر، دوچرخه و اتوبوس: این چراغ برای کیست؟",
  titleIt: "SEMAFORO PEDONALE · BICICLETTE · TRASPORTO PUBBLICO",
  minutes: 5,
  signs: [157, 158, 156, 154, 155],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس از روی شکل می‌گویی یک چراغ مالِ عابر است، مالِ دوچرخه یا مالِ اتوبوس و ترامِ خطِ عمومی، و هر رنگ یا نوار برای همان گروه چه معنایی دارد.",
      why:
        "۴۷ سؤال، و بیشترشان یک ترفند دارند: چراغ را به جای دیگری نسبت می‌دهند (مدرسه، آسانسور، مسابقه، کارگاه، قطار). شکلِ داخلِ چراغ همیشه جواب را می‌گوید.",
    },
    {
      kind: "table",
      title: "چراغِ عابر: آدمکِ رنگی",
      body: "شکلِ آدم داخلِ چراغ یعنی این چراغ با عابرِ پیاده حرف می‌زند، نه با تو.",
      columns: ["قاعده"],
      rows: [
        {
          label: "شکل و جا",
          it: "semaforo pedonale",
          sign: 157,
          values: ["آدمکِ قرمز و زرد (ایستاده) و سبز (در حالِ راه رفتن). سرِ تقاطع، برای عابرهایی که از سواره‌رو عبور می‌کنند."],
        },
        { label: "سبز", it: "verde", values: ["عابر وارد سواره‌رو می‌شود و عبور می‌کند. خودرویی که می‌پیچد به او راه می‌دهد، نه برعکس."] },
        { label: "زرد", it: "giallo", values: ["عابری که روی گذرگاه است سریع آن را خالی کند."] },
        { label: "قرمز", it: "rosso", values: ["عابر عبور نمی‌کند."] },
        {
          label: "چه نیست",
          it: "scuola · ascensore · metropolitana",
          values: ["نشانه‌ی مدرسه، پله‌برقی، آسانسور، ورودیِ مترو، ورزشگاه یا بندر، یا مسابقه‌ی دو نیست. چراغِ خودروها هم نیست."],
        },
      ],
      takeaway: "آدمک = عابر. سبزِ عابر یعنی خودروی در حالِ پیچیدن باید صبر کند.",
      rule: "Codice della Strada art. 41 c.5, c.9; DPR 495/1992 art. 162",
    },
    {
      kind: "table",
      title: "چراغِ دوچرخه: فقط برای دوچرخه‌ها",
      body: "شکلِ دوچرخه داخلِ چراغ. جایی است که مسیرِ دوچرخه به خیابان می‌رسد.",
      columns: ["قاعده"],
      rows: [
        {
          label: "شکل و جا",
          it: "semaforo per biciclette",
          sign: 158,
          values: ["دوچرخه‌ی قرمز، زرد و سبز. سرِ گذرگاهِ دوچرخه: جایی که دوچرخه‌سوار از مسیرِ دوچرخه بیرون می‌آید و از خیابان رد می‌شود."],
        },
        { label: "معنی", it: "rosso · giallo · verde", values: ["مثلِ چراغِ معمولی، فقط برای دوچرخه: قرمز بایست؛ زرد اگر وارد شده‌ای سریع خالی کن؛ سبز فقط دوچرخه‌ها رد شوند."] },
        {
          label: "چه نیست",
          it: "ciclomotori · motocicli",
          values: ["برای همه‌ی دوچرخه‌ای‌ها نیست؛ خطِ ویژه‌ی موتور گازی یا موتورسیکلت، مسابقه‌ی دوچرخه، کارگاهِ ساختِ مسیر یا «ورودِ دوچرخه ممنوع» هم نیست."],
        },
      ],
      takeaway: "دوچرخه = فقط دوچرخه‌سوارِ مسیرِ دوچرخه. موتورسیکلت و موتور گازی به چراغِ معمولی نگاه می‌کنند.",
      rule: "Codice della Strada art. 41 c.6, c.14; DPR 495/1992 art. 163",
    },
    {
      kind: "table",
      title: "چراغِ حمل‌ونقلِ عمومی: نوارِ سفید",
      body: "رنگ ندارد، نوار دارد. فقط اتوبوس و ترامِ خطِ عمومی به آن نگاه می‌کنند؛ جایی که چراغِ معمولی ممکن است گیج‌کننده باشد.",
      columns: ["قاعده"],
      rows: [
        {
          label: "شکل",
          it: "barre bianche · triangolo giallo",
          sign: 156,
          values: ["زمینه‌ی سیاه: نوارِ سفیدِ افقی بالا، مثلثِ زرد وسط، نوارِ سفیدِ عمودی پایین."],
        },
        { label: "نوارِ افقیِ بالا", it: "barra orizzontale", values: ["بایست (مثلِ قرمز)."] },
        { label: "مثلثِ زرد", it: "triangolo giallo", values: ["پیش‌آگهیِ ایستادن (مثلِ زرد). برای موتور یا خبرِ کارگاه نیست."] },
        { label: "نوارِ عمودیِ پایین", it: "barra verticale", values: ["حرکت کن (مثلِ سبز). نوارِ مایل یعنی به آن سمت بپیچ."] },
        {
          label: "برای چه کسی",
          it: "veicoli in servizio di linea",
          values: ["وسایلِ نقلیه‌ی خطِ عمومیِ مسافربری: اتوبوس، اتوبوسِ برقی، ترامِ خط. «فقط تراموا و قطار» غلط است؛ عابر، خودروی نظامی، گذرگاهِ راه‌آهن، اسکله یا ایستگاهِ قطار هم نیست."],
        },
      ],
      takeaway: "نوارِ سفید = اتوبوس و ترامِ خطِ عمومی. افقی بایست، عمودی برو، مثلث آماده‌ی ایستادن.",
      rule: "Codice della Strada art. 41 c.4, c.12; DPR 495/1992 art. 161",
    },
    {
      kind: "classify",
      title: "این چراغ برای کیست؟",
      body: "به شکلِ داخلِ چراغ نگاه کن، نه به جایی که بانک می‌گوید.",
      options: [
        { it: "VEICOLI", fa: "همه‌ی وسایلِ نقلیه" },
        { it: "PEDONI", fa: "عابرها" },
        { it: "BICICLETTE", fa: "دوچرخه‌ها" },
        { it: "TRASPORTO PUBBLICO", fa: "اتوبوس و ترامِ خطِ عمومی" },
      ],
      items: [
        { prompt: "سه دایره‌ی رنگیِ ساده.", sign: 154, answer: 0, explain: "چراغِ معمولیِ وسایلِ نقلیه (درس ۱)." },
        { prompt: "آدمکِ رنگی.", sign: 157, answer: 1, explain: "چراغِ عابر." },
        { prompt: "دوچرخه‌ی رنگی.", sign: 158, answer: 2, explain: "چراغِ دوچرخه، برای کسی که از مسیرِ دوچرخه می‌آید." },
        { prompt: "نوارهای سفید و مثلثِ زرد.", sign: 156, answer: 3, explain: "چراغِ حمل‌ونقلِ عمومی." },
        { prompt: "فلش‌های رنگی، برای هر جهت یک ستون.", sign: 155, answer: 0, explain: "چراغِ خط است؛ باز هم برای وسایلِ نقلیه، فقط برای جهتِ فلش (درس ۴)." },
        {
          prompt: "دوچرخه‌سواری در سواره‌رو به تقاطعی می‌رسد که فقط سه دایره‌ی رنگی دارد.",
          answer: 0,
          explain: "در سواره‌رو دوچرخه وسیله‌ی نقلیه است و از چراغِ وسایلِ نقلیه پیروی می‌کند.",
        },
      ],
      takeaway: "شکلِ داخلِ چراغ می‌گوید برای کیست: دایره و فلش وسایلِ نقلیه، آدمک عابر، دوچرخه دوچرخه، نوارِ سفید خطِ عمومی.",
      rule: "Codice della Strada art. 41 c.2–6",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il pedone", fa: "عابرِ پیاده" },
        { it: "impegnare la carreggiata", base: "impegnare", fa: "وارد سواره‌رو شدن" },
        { it: "liberare l'attraversamento", base: "liberare", fa: "گذرگاه را خالی کردن" },
        { it: "il conducente di biciclette", fa: "دوچرخه‌سوار" },
        { it: "la pista ciclabile", fa: "مسیرِ ویژه‌ی دوچرخه" },
        { it: "i veicoli in servizio di linea per trasporto di persone", fa: "وسایلِ نقلیه‌ی خطِ عمومیِ مسافربری" },
        { it: "la barra bianca", fa: "نوارِ سفید" },
        { it: "il triangolo giallo", fa: "مثلثِ زرد" },
      ],
    },
    {
      kind: "trap",
      title: "چراغِ دوچرخه: فقط دوچرخه، یا همه‌ی دوچرخه‌ای‌ها؟",
      body: "هر دو جمله می‌گویند چراغِ دوچرخه برای چه کسی است. فقط یکی درست است:",
      examples: [
        {
          sourceId: "2808",
          sign: 158,
          textIt: "Il semaforo in figura, con luce verde accesa, consente soltanto ai conducenti di biciclette di attraversare l'incrocio",
          answer: 1,
          chunks: [
            { it: "Il semaforo in figura,", fa: "چراغِ تصویر،" },
            { it: "con luce verde accesa,", fa: "وقتی سبزش روشن است،", focus: "condition" },
            { it: "consente soltanto ai conducenti di biciclette", fa: "فقط به دوچرخه‌سوارها اجازه می‌دهد", verb: "consente ← consentire", focus: "limit" },
            { it: "di attraversare l'incrocio", fa: "از تقاطع عبور کنند" },
          ],
          translation: "چراغِ تصویر، وقتی سبزش روشن است، فقط به دوچرخه‌سوارها اجازه می‌دهد از تقاطع عبور کنند.",
          why: "درست است. سبزِ چراغِ دوچرخه فقط برای دوچرخه‌هاست.",
        },
        {
          sourceId: "2814",
          sign: 158,
          textIt: "Il semaforo in figura vale per tutti i veicoli a due ruote",
          answer: 0,
          chunks: [
            { it: SEMAFORO, fa: SEMAFORO_FA },
            { it: "vale", fa: "معتبر است", verb: "vale ← valere" },
            { it: "per tutti i veicoli a due ruote", fa: "برای همه‌ی وسایلِ دوچرخه‌ای", focus: "always" },
          ],
          translation: "چراغِ تصویر برای همه‌ی وسایلِ دوچرخه‌ای معتبر است.",
          why: "غلط است. موتورسیکلت و موتور گازی هم دو چرخ دارند، ولی این چراغ فقط برای دوچرخه است.",
        },
      ],
      takeaway: "«soltanto biciclette» درست، «tutti i veicoli a due ruote» غلط. شکلِ داخلِ چراغ دوچرخه است، نه موتور.",
      rule: "Codice della Strada art. 41 c.6",
    },
  ],
  practice: [
    {
      sourceId: "2794",
      sign: 157,
      textIt: "La luce verde accesa del semaforo in figura obbliga i pedoni a dare la precedenza ai veicoli che svoltano",
      answer: 0,
      chunks: [
        { it: "La luce verde accesa del semaforo in figura", fa: "چراغِ سبزِ روشنِ چراغِ تصویر" },
        { it: "obbliga i pedoni", fa: "عابرها را مجبور می‌کند", verb: "obbliga ← obbligare" },
        { it: "a dare la precedenza ai veicoli che svoltano", fa: "به خودروهایی که می‌پیچند راه بدهند", verb: "svoltano ← svoltare", focus: "contrast" },
      ],
      translation: "چراغِ سبزِ روشنِ چراغِ تصویر عابرها را مجبور می‌کند به خودروهایی که می‌پیچند راه بدهند.",
      why: "غلط است (قدم ۱). برعکس: با سبزِ عابر، خودرویی که می‌پیچد به عابر راه می‌دهد.",
      rule: "Codice della Strada art. 41 c.9",
      conceptStep: 1,
    },
    {
      sourceId: "2790",
      sign: 157,
      textIt: "Il semaforo in figura, con luce gialla fissa accesa, impone ai pedoni che hanno già occupato l'attraversamento pedonale di liberarlo rapidamente",
      answer: 1,
      chunks: [
        { it: "Il semaforo in figura,", fa: "چراغِ تصویر،" },
        { it: "con luce gialla fissa accesa,", fa: "وقتی زردِ ثابتش روشن است،", focus: "condition" },
        { it: "impone ai pedoni", fa: "عابرهایی را مجبور می‌کند", verb: "impone ← imporre" },
        { it: "che hanno già occupato l'attraversamento pedonale", fa: "که روی گذرگاه هستند", verb: "hanno occupato ← occupare" },
        { it: "di liberarlo rapidamente", fa: "که سریع خالی‌اش کنند", verb: "liberarlo ← liberare" },
      ],
      translation: "چراغِ تصویر، وقتی زردِ ثابتش روشن است، عابرهایی را که روی گذرگاه‌اند مجبور می‌کند سریع خالی‌اش کنند.",
      why: "درست است (قدم ۱). زردِ عابر مثلِ زردِ خودروهاست: کسی که وسطِ عبور است بیرون می‌رود.",
      rule: "Codice della Strada art. 41 c.5",
      conceptStep: 1,
    },
    {
      sourceId: "2804",
      sign: 158,
      textIt: "Il semaforo in figura si trova all'uscita di una pista ciclabile, per regolare l'attraversamento della strada",
      answer: 1,
      chunks: [
        { it: SEMAFORO, fa: SEMAFORO_FA },
        { it: "si trova all'uscita di una pista ciclabile,", fa: "در خروجیِ یک مسیرِ دوچرخه قرار دارد،", verb: "si trova ← trovarsi" },
        { it: "per regolare l'attraversamento della strada", fa: "تا عبور از خیابان را تنظیم کند", focus: "reason" },
      ],
      translation: "چراغِ تصویر در خروجیِ یک مسیرِ دوچرخه قرار دارد تا عبور از خیابان را تنظیم کند.",
      why: "درست است (قدم ۲). چراغِ دوچرخه سرِ گذرگاهِ دوچرخه است، جایی که مسیرِ دوچرخه به خیابان می‌رسد.",
      rule: "Codice della Strada art. 41 c.6; DPR 495/1992 art. 163 c.1, c.4",
      conceptStep: 2,
    },
    {
      sourceId: "2726",
      sign: 156,
      textIt: "Il semaforo in figura impone l'arresto ai veicoli in servizio di linea per trasporto di persone quando è accesa la barra bianca in alto",
      answer: 1,
      chunks: [
        { it: SEMAFORO, fa: SEMAFORO_FA },
        { it: "impone l'arresto", fa: "توقف را اجباری می‌کند", verb: "impone ← imporre" },
        { it: "ai veicoli in servizio di linea per trasporto di persone", fa: "برای وسایلِ نقلیه‌ی خطِ عمومیِ مسافربری" },
        { it: "quando è accesa la barra bianca in alto", fa: "وقتی نوارِ سفیدِ بالا روشن است", focus: "condition" },
      ],
      translation: "چراغِ تصویر وقتی نوارِ سفیدِ بالا روشن است، برای وسایلِ نقلیه‌ی خطِ عمومیِ مسافربری توقف را اجباری می‌کند.",
      why: "درست است (قدم ۳). نوارِ افقیِ بالا همان قرمزِ اتوبوس است.",
      rule: "Codice della Strada art. 41 c.4; DPR 495/1992 art. 161 c.2",
      conceptStep: 3,
    },
    {
      sourceId: "2733",
      sign: 156,
      textIt: "Il semaforo in figura è valido solo per i veicoli che marciano su rotaie (tram, treni)",
      answer: 0,
      chunks: [
        { it: SEMAFORO, fa: SEMAFORO_FA },
        { it: "è valido", fa: "معتبر است" },
        { it: "solo per i veicoli che marciano su rotaie (tram, treni)", fa: "فقط برای وسایلی که روی ریل حرکت می‌کنند (تراموا، قطار)", verb: "marciano ← marciare", focus: "limit" },
      ],
      translation: "چراغِ تصویر فقط برای وسایلی که روی ریل حرکت می‌کنند (تراموا، قطار) معتبر است.",
      why: "غلط است (قدم ۳). برای همه‌ی وسایلِ خطِ عمومی است، اتوبوس هم. قطار هم از این چراغ پیروی نمی‌کند.",
      rule: "DPR 495/1992 art. 161 c.1",
      conceptStep: 3,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        "2785", "2786", "2787", "2788", "2789", "2790", "2791", "2792", "2793", "2794",
        "2795", "2796", "2797", "2798", "2799", "2800", "2801", "2802", "2803",
      ],
    },
    { step: 2, sourceIds: ["2804", "2805", "2806", "2807", "2808", "2809", "2810", "2811", "2812", "2813", "2814"] },
    {
      step: 3,
      sourceIds: [
        "2722", "2723", "2724", "2725", "2726", "2727", "2728", "2729", "2730", "2731",
        "2732", "2733", "2734", "2735", "2736", "2737", "2738",
      ],
    },
  ],
};

// ── Lesson 6 ──────────────────────────────────────────────────────────────────

export const lessonLampeggiantiOndaVerde: Lesson = {
  id: "lampeggianti-gialle-onda-verde",
  titleFa: "زردِ چشمک‌زنِ تکی و چراغِ موجِ سبز",
  titleIt: "LANTERNE GIALLE LAMPEGGIANTI · ONDA VERDE",
  minutes: 4,
  signs: [160, 161],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس سه نوع چراغِ زردِ چشمک‌زنِ تکی (A ساده، B با آدمک، C با دوچرخه) را می‌شناسی و می‌دانی هر کدام کجاست، و چراغِ «موجِ سبز» را به‌عنوانِ سرعتِ پیشنهادی، نه اجباری، می‌خوانی.",
      why:
        "۲۸ سؤال. دو اشتباهِ اصلی: B و C را «خطِ ویژه» فکر کردن، و عددِ موجِ سبز را «حدِ سرعت» دانستن.",
    },
    {
      kind: "table",
      title: "سه نوع زردِ چشمک‌زنِ تکی: A، B، C",
      body: "یک چراغِ تنها که زرد چشمک می‌زند. هیچ‌وقت نمی‌گوید بایست؛ می‌گوید مراقب باش، و B و C می‌گویند مراقبِ چه کسی.",
      columns: ["قاعده"],
      rows: [
        {
          label: "A: دایره‌ی زردِ ساده",
          it: "tipo A",
          sign: 160,
          values: ["خطرِ عمومی: سرعت را کم کن و با احتیاطِ ویژه برو. سرِ تقاطع یا نقطه‌های خطرناکِ جاده. پیش از پل متحرک یا اسکله نیست (آنجا قرمز است، درس ۷) و چراغِ اتوبوس هم نیست."],
        },
        {
          label: "B: آدمکِ زرد",
          it: "tipo B",
          values: ["کنارِ چراغِ وسایلِ نقلیه. وقتی به راست می‌پیچی، عابرهای روی گذرگاه ممکن است همزمان سبز داشته باشند: به آن‌ها راه بده. «پیاده‌روِ ویژه» نیست."],
        },
        {
          label: "C: دوچرخه‌ی زرد",
          it: "tipo C",
          values: ["کنارِ چراغِ وسایلِ نقلیه. وقتی به راست می‌پیچی، به دوچرخه‌هایی که از گذرگاهِ دوچرخه رد می‌شوند راه بده. خطِ ویژه‌ی دوچرخه، موتور گازی یا همه‌ی دوچرخه‌ای‌ها نیست."],
        },
      ],
      takeaway: "A = خطر، آهسته کن. B و C کنارِ چراغِ اصلی‌اند و می‌گویند هنگامِ پیچیدن به عابر یا دوچرخه راه بده.",
      rule: "DPR 495/1992 art. 165 c.1–4; Codice della Strada art. 41 c.17",
    },
    {
      kind: "table",
      title: "چراغِ موجِ سبز: سرعتِ پیشنهادی",
      body: "عددهای سفید روی دایره‌ی سیاه. اگر با این سرعت بروی، چراغِ بعدی را سبز می‌بینی.",
      columns: ["قاعده"],
      rows: [
        { label: "شکل", it: "onda verde", sign: 161, values: ["چند عددِ سفید روی دایره‌های سیاه. هر بار فقط یکی روشن است."] },
        { label: "معنی", it: "velocità consigliata", values: ["سرعتِ پیشنهادی برای رسیدن به سبزِ چراغِ بعدی. توصیه است: نه اجبار، نه حداکثرِ سرعت."] },
        {
          label: "کجا",
          it: "semafori sincronizzati",
          values: ["خیابان‌هایی با چند تقاطعِ پشتِ سرِ هم که چراغ‌هایشان هماهنگ (زمان‌بندی‌شده) است، در خروجیِ تقاطع. در آزادراه نیست؛ آزادراه چراغِ راهنمایی ندارد."],
        },
        {
          label: "چه نیست",
          it: "obbligo · distanza · lavori",
          values: ["سرعتِ اجباری، حدِ سرعتِ انواعِ خودرو، فاصله‌ی ایمنی، فاصله تا عوارضی یا خبرِ کارگاه نیست. معنی‌اش «با احتیاط برو» هم نیست. خاموش که باشد چیزی نمی‌گوید."],
        },
      ],
      takeaway: "عددِ موجِ سبز «پیشنهاد» است. حدِ سرعت و بقیه‌ی قواعد سرِ جایشان‌اند.",
      rule: "DPR 495/1992 art. 166 c.1, c.4–6",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la luce gialla lampeggiante", fa: "چراغِ زردِ چشمک‌زن" },
        { it: "affiancata al semaforo veicolare", base: "affiancare", fa: "کنارِ چراغِ وسایلِ نقلیه" },
        { it: "punti pericolosi della strada", fa: "نقطه‌های خطرناکِ جاده" },
        { it: "l'onda verde", fa: "موجِ سبز (چراغ‌های هماهنگ)" },
        { it: "consigliare", fa: "پیشنهاد کردن؛ توصیه کردن" },
        { it: "sincronizzati (temporizzati)", fa: "هماهنگ (زمان‌بندی‌شده)" },
        { it: "obbligatoriamente", fa: "اجباری" },
        { it: "usufruire", fa: "بهره بردن؛ استفاده کردن" },
      ],
    },
    {
      kind: "trap",
      title: "عددِ موجِ سبز: توصیه یا اجبار؟",
      body: "هر دو جمله درباره‌ی سرعتِ روی همین چراغ است. یک فعل فرقشان است:",
      examples: [
        {
          sourceId: "2824",
          sign: 161,
          textIt: "Il semaforo in figura consiglia la velocità da mantenere, per trovare la luce verde al semaforo successivo",
          answer: 1,
          chunks: [
            { it: SEMAFORO, fa: SEMAFORO_FA },
            { it: "consiglia la velocità da mantenere,", fa: "سرعتی را که باید حفظ کنی پیشنهاد می‌کند،", verb: "consiglia ← consigliare" },
            { it: "per trovare la luce verde al semaforo successivo", fa: "تا چراغِ بعدی را سبز ببینی", focus: "reason" },
          ],
          translation: "چراغِ تصویر سرعتی را که باید حفظ کنی پیشنهاد می‌کند تا چراغِ بعدی را سبز ببینی.",
          why: "درست است. «consiglia» یعنی پیشنهاد؛ همین است.",
        },
        {
          sourceId: "2828",
          sign: 161,
          textIt: "Il semaforo in figura obbliga a mantenere la velocità indicata",
          answer: 0,
          chunks: [
            { it: SEMAFORO, fa: SEMAFORO_FA },
            { it: "obbliga a mantenere la velocità indicata", fa: "مجبور می‌کند سرعتِ نشان‌داده‌شده را حفظ کنی", verb: "obbliga ← obbligare", focus: "contrast" },
          ],
          translation: "چراغِ تصویر مجبور می‌کند سرعتِ نشان‌داده‌شده را حفظ کنی.",
          why: "غلط است. این چراغ اجبار نمی‌کند، پیشنهاد می‌کند.",
        },
      ],
      takeaway: "«consiglia» درست؛ «obbliga»، «non consente di superare» و «velocità obbligatoria» غلط.",
      rule: "DPR 495/1992 art. 166 c.6",
    },
  ],
  practice: [
    {
      sourceId: "2709",
      sign: 160,
      textIt: "La luce circolare gialla lampeggiante (tipo A di figura) può essere posta prima di un ponte mobile",
      answer: 0,
      chunks: [
        { it: "La luce circolare gialla lampeggiante (tipo A di figura)", fa: "چراغِ زردِ گردِ چشمک‌زن (نوعِ A در تصویر)" },
        { it: "può essere posta", fa: "می‌تواند نصب شود", verb: "può ← potere" },
        { it: "prima di un ponte mobile", fa: "پیش از یک پل متحرک", focus: "contrast" },
      ],
      translation: "چراغِ زردِ گردِ چشمک‌زن (نوعِ A در تصویر) می‌تواند پیش از یک پل متحرک نصب شود.",
      why: "غلط است (قدم ۱). ورودیِ پل متحرک چراغِ قرمزِ چشمک‌زن دارد که می‌گوید بایست، نه زردی که فقط می‌گوید آهسته.",
      rule: "DPR 495/1992 art. 165 c.2; art. 166 c.2",
      conceptStep: 1,
    },
    {
      sourceId: "2817",
      sign: 160,
      textIt: "La luce gialla lampeggiante, del tipo B in figura, indica che nello svoltare a destra i veicoli debbono dare la precedenza ai pedoni",
      answer: 1,
      chunks: [
        { it: "La luce gialla lampeggiante, del tipo B in figura,", fa: "چراغِ زردِ چشمک‌زن، از نوعِ B در تصویر،" },
        { it: "indica che nello svoltare a destra", fa: "نشان می‌دهد که هنگامِ پیچیدن به راست", verb: "indica ← indicare", focus: "condition" },
        { it: "i veicoli debbono dare la precedenza ai pedoni", fa: "خودروها باید به عابرها راه بدهند", verb: "debbono ← dovere" },
      ],
      translation: "چراغِ زردِ چشمک‌زن، از نوعِ B در تصویر، نشان می‌دهد که هنگامِ پیچیدن به راست خودروها باید به عابرها راه بدهند.",
      why: "درست است (قدم ۱). آدمکِ زرد هشدار می‌دهد که عابرهای گذرگاهِ پیشِ رو ممکن است سبز داشته باشند.",
      rule: "DPR 495/1992 art. 165 c.3–4",
      conceptStep: 1,
    },
    {
      sourceId: "2819",
      sign: 160,
      textIt: "La luce gialla lampeggiante, del tipo C in figura, indica una corsia riservata a tutti i veicoli a due ruote",
      answer: 0,
      chunks: [
        { it: "La luce gialla lampeggiante, del tipo C in figura,", fa: "چراغِ زردِ چشمک‌زن، از نوعِ C در تصویر،" },
        { it: "indica una corsia riservata", fa: "یک خطِ ویژه را نشان می‌دهد", verb: "indica ← indicare", focus: "contrast" },
        { it: "a tutti i veicoli a due ruote", fa: "برای همه‌ی وسایلِ دوچرخه‌ای", focus: "always" },
      ],
      translation: "چراغِ زردِ چشمک‌زن، از نوعِ C در تصویر، یک خطِ ویژه برای همه‌ی وسایلِ دوچرخه‌ای را نشان می‌دهد.",
      why: "غلط است (قدم ۱). C خطِ ویژه نیست؛ هشدار است که هنگامِ پیچیدن به دوچرخه‌های گذرگاه راه بدهی.",
      rule: "DPR 495/1992 art. 165 c.3–4",
      conceptStep: 1,
    },
    {
      sourceId: "2827",
      sign: 161,
      textIt: "Delle tre luci del semaforo in figura se ne accende soltanto una, mentre le altre sono spente",
      answer: 1,
      chunks: [
        { it: "Delle tre luci del semaforo in figura", fa: "از سه چراغِ تصویر" },
        { it: "se ne accende soltanto una,", fa: "فقط یکی روشن می‌شود،", verb: "accende ← accendersi", focus: "limit" },
        { it: "mentre le altre sono spente", fa: "و بقیه خاموش‌اند" },
      ],
      translation: "از سه چراغِ تصویر فقط یکی روشن می‌شود و بقیه خاموش‌اند.",
      why: "درست است (قدم ۲). در هر لحظه یک سرعتِ پیشنهادی نشان داده می‌شود.",
      rule: "DPR 495/1992 art. 166 c.4",
      conceptStep: 2,
    },
    {
      sourceId: "2833",
      sign: 161,
      textIt: "Il semaforo di onda verde in figura viene posto anche sulle autostrade",
      answer: 0,
      chunks: [
        { it: "Il semaforo di onda verde in figura", fa: "چراغِ موجِ سبزِ تصویر" },
        { it: "viene posto", fa: "نصب می‌شود", verb: "viene posto ← porre" },
        { it: "anche sulle autostrade", fa: "در آزادراه‌ها هم", focus: "contrast" },
      ],
      translation: "چراغِ موجِ سبزِ تصویر در آزادراه‌ها هم نصب می‌شود.",
      why: "غلط است (قدم ۲). موجِ سبز برای مسیری با چند تقاطعِ چراغ‌دار است؛ آزادراه تقاطعِ چراغ‌دار ندارد.",
      rule: "DPR 495/1992 art. 166 c.5",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2705", "2706", "2707", "2709", "2710", "2815", "2816", "2817", "2818", "2819", "2820", "2821", "2822"] },
    {
      step: 2,
      sourceIds: ["2823", "2824", "2825", "2826", "2827", "2828", "2829", "2830", "2831", "2832", "2833", "2834", "2835", "2836", "2837"],
    },
  ],
};

// ── Lesson 7 ──────────────────────────────────────────────────────────────────

export const lessonLuciRossePL: Lesson = {
  id: "luci-rosse-passaggi-livello",
  titleFa: "چراغِ قرمزِ چشمک‌زن و گذرگاهِ راه‌آهن",
  titleIt: "LUCI ROSSE LAMPEGGIANTI · PASSAGGIO A LIVELLO",
  minutes: 5,
  signs: [162],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی دو چراغِ قرمزی که یکی‌درمیان چشمک می‌زنند کجا هستند (گذرگاهِ راه‌آهن، پل متحرک، اسکله‌ی فِری)، کِی روشن می‌شوند، و چرا وقتی روشن‌اند هیچ بهانه‌ای برای رد شدن نیست.",
      why:
        "۳۲ سؤال. در فصل ۲ تابلوهای خطرِ گذرگاهِ راه‌آهن و تابلوهای فاصله‌نما را دیدی. اینجا خودِ چراغ‌های سرِ گذرگاه است. بانک بهانه می‌سازد: «قطاری نمی‌بینم»، «فقط یک ریل است».",
    },
    {
      kind: "table",
      title: "کجا این چراغ را می‌بینی",
      body: "دو چراغِ قرمزِ گرد که یکی‌درمیان چشمک می‌زنند، سمتِ راستِ جاده، همراه با زنگِ هشدار.",
      columns: ["قاعده"],
      rows: [
        {
          label: "گذرگاهِ راه‌آهن",
          it: "passaggio a livello",
          sign: 162,
          values: ["گذرگاهِ بدونِ راه‌بند یا با نیم‌راه‌بند. سرِ خودِ گذرگاه است؛ نه ۱۵۰ متر پیش از آن و نه روی تابلوهای فاصله‌نما."],
        },
        { label: "پل متحرک و اسکله", it: "ponte mobile · pontile d'imbarco", values: ["ورودیِ پل متحرک و اسکله‌ی سوار شدن به کشتیِ فِری هم همین چراغ‌های قرمز را دارند."] },
        {
          label: "چه نیست",
          it: "posto di blocco · ponte stretto · confine",
          values: ["ایستِ پلیس، پلِ باریک، خروجیِ اجباریِ آزادراه، مرزِ کشور، یا «الان سبز می‌شود» نیست. چراغِ رانندگانِ قطار هم نیست؛ رو به رانندگانِ جاده است."],
        },
      ],
      takeaway: "دو قرمزِ چشمک‌زنِ یکی‌درمیان = ریل، پل متحرک یا اسکله. همیشه سرِ همان نقطه.",
      rule: "Codice della Strada art. 44 c.2, c.2-bis; DPR 495/1992 art. 166 c.1–2",
    },
    {
      kind: "table",
      title: "وقتی روشن است",
      body: "قرمزِ چشمک‌زن «احتیاط» نیست؛ همان دستورِ قرمزِ ثابت است: بایست.",
      columns: ["قاعده"],
      rows: [
        { label: "چه کنی", it: "fermarsi prima della striscia di arresto", values: ["پیش از خطِ توقف بایست. نه خودرو رد می‌شود نه عابر."] },
        {
          label: "کِی روشن می‌شود",
          it: "poco prima dell'arrivo del treno",
          values: ["کمی پیش از رسیدنِ قطار، درست پیش از پایین آمدنِ نیم‌راه‌بندها، و تا گذشتنِ کاملِ قطار روشن می‌ماند. این چراغ برای خبر دادنِ «بسته شدن» است؛ روشن شدنش هنگامِ بالا رفتنِ راه‌بند در بانک غلط است. ولی تا راه‌بند در حرکت است، پایین یا بالا، وارد نشو."],
        },
        {
          label: "راه‌بند هنوز بالاست",
          it: "semibarriera ancora alzata",
          values: ["چراغ‌ها روشن‌اند ولی نیم‌راه‌بند هنوز پایین نیامده؟ آماده‌ی ایستادن شو و روی خطِ توقف بایست. گاز نده تا پیش از پایین آمدن رد شوی."],
        },
        {
          label: "بهانه‌های غلط",
          it: "se non si vede il treno",
          values: ["«قطاری دیده نمی‌شود»، «سوتِ قطار هنوز نیامده»، «فقط یک ریل است»، «کسِ دیگری منتظر نیست»: هیچ‌کدام اجازه‌ی عبور نمی‌دهد."],
        },
      ],
      takeaway: "چراغ روشن = پشتِ خطِ توقف بایست، تا خاموش شود. هیچ «اگر قطار نیامد»ی وجود ندارد.",
      rule: "Codice della Strada art. 147 c.2-bis, c.3; DPR 495/1992 art. 166 c.3",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il passaggio a livello", fa: "گذرگاهِ راه‌آهن" },
        { it: "le semibarriere", fa: "نیم‌راه‌بندها" },
        { it: "lampeggianti alternativamente", base: "lampeggiare", fa: "یکی‌درمیان چشمک‌زن" },
        { it: "il ponte mobile", fa: "پلِ متحرک" },
        { it: "il pontile d'imbarco di navi traghetto", fa: "اسکله‌ی سوار شدن به کشتیِ فِری" },
        { it: "il dispositivo di segnalazione acustica", fa: "وسیله‌ی هشدارِ صوتی (زنگ)" },
        { it: "predisporsi all'arresto", base: "predisporsi", fa: "آماده‌ی ایستادن شدن" },
        { it: "il pannello distanziometrico", fa: "تابلوی فاصله‌نما (خط‌های قرمز)" },
      ],
    },
    {
      kind: "trap",
      title: "کجا بایستی؟",
      body: "هر دو جمله جای ایستادن را می‌گویند وقتی چراغ‌ها روشن‌اند و نیم‌راه‌بند هنوز بالاست. فقط یکی درست است:",
      examples: [
        {
          sourceId: "2896",
          textIt: "Avvicinandosi ad un passaggio a livello con luci rosse accese e semibarriera ancora alzata, è necessario fermarsi sulla linea d'arresto",
          answer: 1,
          chunks: [
            { it: AVVICINANDOSI, fa: AVVICINANDOSI_FA, verb: "avvicinandosi ← avvicinarsi", focus: "condition" },
            { it: "è necessario fermarsi sulla linea d'arresto", fa: "لازم است روی خطِ توقف بایستی" },
          ],
          translation: "وقتی به گذرگاهِ راه‌آهنی نزدیک می‌شوی که چراغ‌های قرمزش روشن است و نیم‌راه‌بندش هنوز بالاست، لازم است روی خطِ توقف بایستی.",
          why: "درست است. چراغ روشن یعنی بایست؛ جایش خطِ توقف است، نه زیرِ راه‌بند.",
        },
        {
          sourceId: "2900",
          textIt: "Avvicinandosi ad un passaggio a livello con luci rosse accese e semibarriera ancora alzata, bisogna fermarsi in corrispondenza del terzo pannello distanziometrico",
          answer: 0,
          chunks: [
            { it: AVVICINANDOSI, fa: AVVICINANDOSI_FA, verb: "avvicinandosi ← avvicinarsi", focus: "condition" },
            { it: "bisogna fermarsi", fa: "باید بایستی", verb: "bisogna ← bisognare" },
            { it: "in corrispondenza del terzo pannello distanziometrico", fa: "کنارِ سومین تابلوی فاصله‌نما", focus: "contrast" },
          ],
          translation: "وقتی به گذرگاهِ راه‌آهنی نزدیک می‌شوی که چراغ‌های قرمزش روشن است و نیم‌راه‌بندش هنوز بالاست، باید کنارِ سومین تابلوی فاصله‌نما بایستی.",
          why: "غلط است. تابلوهای فاصله‌نما فقط فاصله را می‌شمارند (فصل ۲). جای ایستادن خطِ توقف است.",
        },
      ],
      takeaway: "جای ایستادن همیشه خطِ توقف است: «sulla linea d'arresto» درست، «pannello distanziometrico» غلط.",
      rule: "Codice della Strada art. 147 c.2-bis, c.3",
    },
  ],
  practice: [
    {
      sourceId: "2714",
      sign: 162,
      textIt: "Le luci rosse accese lampeggianti in figura obbligano ad arrestarsi all'accesso di un pontile d'imbarco di navi traghetto",
      answer: 1,
      chunks: [
        { it: LUCI, fa: LUCI_FA },
        { it: "obbligano ad arrestarsi", fa: "مجبور می‌کنند بایستی", verb: "obbligano ← obbligare" },
        { it: "all'accesso di un pontile d'imbarco di navi traghetto", fa: "سرِ ورودیِ اسکله‌ی سوار شدن به کشتیِ فِری" },
      ],
      translation: "چراغ‌های قرمزِ روشن و چشمک‌زنِ تصویر مجبور می‌کنند سرِ ورودیِ اسکله‌ی سوار شدن به کشتیِ فِری بایستی.",
      why: "درست است (قدم ۱). اسکله‌ی فِری هم مثلِ گذرگاهِ راه‌آهن و پلِ متحرک این چراغ را دارد.",
      rule: "DPR 495/1992 art. 166 c.2",
      conceptStep: 1,
    },
    {
      sourceId: "2717",
      sign: 162,
      textIt: "Le luci rosse accese lampeggianti in figura si trovano in vicinanza di un posto di blocco della polizia",
      answer: 0,
      chunks: [
        { it: LUCI, fa: LUCI_FA },
        { it: "si trovano", fa: "قرار دارند", verb: "si trovano ← trovarsi" },
        { it: "in vicinanza di un posto di blocco della polizia", fa: "نزدیکِ یک ایستِ بازرسیِ پلیس", focus: "contrast" },
      ],
      translation: "چراغ‌های قرمزِ روشن و چشمک‌زنِ تصویر نزدیکِ یک ایستِ بازرسیِ پلیس قرار دارند.",
      why: "غلط است (قدم ۱). این چراغ‌ها مالِ ریل، پلِ متحرک و اسکله‌اند. پلیس با مأمور و علامتِ خودش متوقف می‌کند.",
      rule: "DPR 495/1992 art. 166 c.2",
      conceptStep: 1,
    },
    {
      sourceId: "2767",
      sign: 162,
      textIt: "Le luci in figura si possono trovare 150 metri prima di un passaggio a livello con barriere",
      answer: 0,
      chunks: [
        { it: LUCI_PL, fa: LUCI_PL_FA },
        { it: "si possono trovare", fa: "ممکن است باشند", verb: "possono ← potere" },
        { it: "150 metri prima di un passaggio a livello con barriere", fa: "۱۵۰ متر پیش از یک گذرگاهِ راه‌آهنِ راه‌بنددار", focus: "contrast" },
      ],
      translation: "چراغ‌های تصویر ممکن است ۱۵۰ متر پیش از یک گذرگاهِ راه‌آهنِ راه‌بنددار باشند.",
      why: "غلط است (قدم ۱). ۱۵۰ متر جای تابلوی خطر است (فصل ۲). این چراغ‌ها سرِ خودِ گذرگاه‌اند، کنارِ خطِ توقف.",
      rule: "Codice della Strada art. 44 c.2–2-bis",
      conceptStep: 1,
    },
    {
      sourceId: "2761",
      sign: 162,
      textIt: "Le luci in figura si accendono subito prima dell'inizio dell'abbassamento delle semibarriere",
      answer: 1,
      chunks: [
        { it: LUCI_PL, fa: LUCI_PL_FA },
        { it: "si accendono", fa: "روشن می‌شوند", verb: "si accendono ← accendersi" },
        { it: "subito prima dell'inizio dell'abbassamento delle semibarriere", fa: "درست پیش از اینکه نیم‌راه‌بندها شروع به پایین آمدن کنند" },
      ],
      translation: "چراغ‌های تصویر درست پیش از اینکه نیم‌راه‌بندها شروع به پایین آمدن کنند روشن می‌شوند.",
      why: "درست است (قدم ۲). کارشان این است که بسته شدن را از پیش خبر بدهند.",
      rule: "Codice della Strada art. 44 c.2",
      conceptStep: 2,
    },
    {
      sourceId: "2764",
      sign: 162,
      textIt: "Avvicinandosi ad un passaggio a livello con luci rosse lampeggianti alternativamente e semibarriera ancora alzata, si può passare velocemente, se non si vede sopraggiungere alcun treno",
      answer: 0,
      chunks: [
        { it: "Avvicinandosi ad un passaggio a livello", fa: "وقتی به گذرگاهِ راه‌آهنی نزدیک می‌شوی", verb: "avvicinandosi ← avvicinarsi" },
        { it: "con luci rosse lampeggianti alternativamente e semibarriera ancora alzata,", fa: "که چراغ‌های قرمزش یکی‌درمیان چشمک می‌زنند و نیم‌راه‌بندش هنوز بالاست،", focus: "condition" },
        { it: "si può passare velocemente,", fa: "می‌شود سریع رد شد،", verb: "può ← potere" },
        { it: "se non si vede sopraggiungere alcun treno", fa: "اگر قطاری دیده نمی‌شود که برسد", focus: "condition" },
      ],
      translation: "وقتی به گذرگاهِ راه‌آهنی نزدیک می‌شوی که چراغ‌های قرمزش یکی‌درمیان چشمک می‌زنند و نیم‌راه‌بندش هنوز بالاست، اگر قطاری دیده نمی‌شود می‌شود سریع رد شد.",
      why: "غلط است (قدم ۲). چراغِ روشن یعنی بایست. ندیدنِ قطار بهانه نیست.",
      rule: "Codice della Strada art. 147 c.3 lett. c",
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: ["2712", "2713", "2714", "2715", "2717", "2718", "2719", "2720", "2721", "2756", "2757", "2759", "2765", "2767", "2768"],
    },
    {
      step: 2,
      sourceIds: [
        "2716", "2758", "2760", "2761", "2762", "2763", "2764", "2766", "2769",
        "2896", "2897", "2898", "2899", "2900", "2901", "2902", "2903",
      ],
    },
  ],
};
