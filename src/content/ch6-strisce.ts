/**
 * src/content/ch6-strisce.ts
 * Chapter 6 (Segnaletica orizzontale e segni sugli ostacoli), lessons 1, 3 and 4:
 * shapes and colours of road paint, one-way vs two-way carriageways with lanes,
 * and arrows / preselection lanes before a junction. Lesson 2 is the existing
 * centre-line lesson `sorpasso-strisce` (src/content/lessons-sorpasso.ts),
 * moved here unchanged.
 *
 * Trust rules as in src/content/lessons.ts: every statement is a real bank
 * row (text, answer key and image snapshotted, checked by
 * tests/chapter6.test.ts and `npm run verify:lessons`); `translation` keeps
 * the claim's polarity; `related` maps each question to the one section that
 * teaches its fact.
 */
import type { Lesson } from "./lessons.js";

const STRISCIA_502 = "La striscia bianca discontinua in figura";
const STRISCIA_502_FA = "خط‌چینِ سفیدِ تصویر";
const SEGNALETICA = "con la segnaletica indicata in figura";
const SEGNALETICA_FA = "با خط‌کشیِ تصویر";
const SENSO_UNICO = "In una strada a senso unico di circolazione";
const SENSO_UNICO_FA = "در جاده‌ای یک‌طرفه";
const DOPPIO_SENSO = "In una strada a doppio senso di circolazione";
const DOPPIO_SENSO_FA = "در جاده‌ای دوطرفه";
const FRECCE = "Le frecce direzionali in figura";
const FRECCE_FA = "فلش‌های جهتِ تصویر";
const REGOLAMENTARE = "E' regolamentare";
const REGOLAMENTARE_FA = "طبقِ مقررات است";
const SULLA_PAVIMENTAZIONE = "trovare sulla pavimentazione";
const SULLA_PAVIMENTAZIONE_FA = "که روی آسفالت ببینی";

// ── Lesson 1 ──────────────────────────────────────────────────────────────────

export const lessonFormeColori: Lesson = {
  id: "segnaletica-orizzontale-forme-colori",
  titleFa: "خط‌کشیِ روی آسفالت: شکل و رنگ",
  titleIt: "SEGNALETICA ORIZZONTALE · COLORI · FORME",
  minutes: 4,
  signs: [],
  figures: [502, 509, 547, 595, 546, 563, 517, 531],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس هر نقشِ روی آسفالت را در خانواده‌اش می‌گذاری (خطِ طولی، خطِ عرضی، گذرگاه، جزیره، نوشته) و از رنگش می‌فهمی همگانی است یا ویژه: سفید، زرد یا آبی.",
      why:
        "تقریباً در هر گروهِ سؤالِ این فصل یک جمله‌ی غلط با رنگ ساخته شده: خطِ وسطِ آبی، فلشِ زرد، TAXIِ سفید. قاعده‌ی رنگ را یک بار یاد بگیری، همه‌ی این جمله‌ها را جواب داده‌ای.",
    },
    {
      kind: "table",
      title: "سه رنگ، سه معنی",
      body:
        "خط‌کشیِ روی آسفالت (segnaletica orizzontale) هم مثل تابلوها دستور می‌دهد یا راه نشان می‌دهد. رنگش اولین چیزی است که باید بخوانی.",
      columns: ["معنی", "نمونه‌ها"],
      rows: [
        {
          label: "سفید",
          it: "bianco",
          values: [
            "رنگِ عادیِ همه‌ی خط‌کشی‌ها، در شهر و در آزادراه",
            "خطِ وسط و خط‌های عبور، خطِ کنارِ سواره‌رو، فلش‌ها، خطِ ایست، گذرگاهِ عابر، خط‌های اریبِ جزیره‌ی ترافیکی، نامِ شهرها",
          ],
        },
        {
          label: "زرد",
          it: "giallo",
          values: [
            "چیزی ویژه یا محدود: جای رزرو، یا جایی که پارک ممنوع است",
            "ایستگاهِ اتوبوس و کلمه‌ی BUS، کلمه‌های TAXI و TRAM، جای پارکِ معلول، زرد و سیاهِ لبه‌ی جدول (درس ۹)",
          ],
        },
        {
          label: "آبی",
          it: "azzurro",
          values: ["فقط جای پارکِ پولی", "خط‌های دورِ جای پارک کنار خیابان، وقتی پارک پولی است"],
        },
      ],
      takeaway:
        "خطِ وسط، فلش و جزیره همیشه سفیدند، در شهر و در آزادراه. آبی فقط مالِ جای پارکِ پولی است. BUS، TAXI و ایستگاهِ اتوبوس زردند، هرگز سفید.",
      rule: "DPR 495/1992 art. 139 c.1; art. 141 c.1; art. 147 c.1; art. 148 c.4; art. 149 c.3; art. 150 c.2; art. 151 c.1",
    },
    {
      kind: "table",
      title: "ممتد یا خط‌چین؟ و گل‌میخ‌ها",
      body:
        "شکلِ خط هم معنی دارد. خطِ طولی در درازای جاده کشیده می‌شود؛ خطِ عرضی از یک لبه‌ی خطِ عبور به لبه‌ی دیگر.",
      columns: ["معنی"],
      rows: [
        { label: "خطِ طولیِ ممتد", it: "striscia longitudinale continua", values: ["از آن عبور نکن و رویش نران."] },
        {
          label: "خطِ طولیِ خط‌چین",
          it: "striscia longitudinale discontinua",
          values: ["می‌شود از آن عبور کرد، اگر بقیه‌ی قواعد اجازه بدهند. رویش راندن ممنوع است."],
        },
        { label: "خطِ عرضیِ ممتد", it: "striscia trasversale continua", values: ["اگر باید بایستی، جلوی همین خط بایست (درس ۷)."] },
        { label: "ردیفِ مثلث‌های عرضی", it: "triangoli · discontinua", values: ["فقط اگر برای راه دادن لازم است، اینجا بایست (درس ۷)."] },
        {
          label: "گل‌میخ‌ها",
          it: "chiodi · inserti",
          values: [
            "ردیفی از گل‌میخ‌ها می‌تواند فقط جای خطِ ممتد بنشیند، و فقط جایی که خطِ ممتد لازم است؛ فاصله‌شان حداکثر یک متر. جای خط‌چین را نمی‌گیرند.",
          ],
        },
      ],
      takeaway: "ردیفِ گل‌میخ یعنی خطِ ممتد. پس هر جمله‌ای که می‌گوید خط‌چین را می‌شود با گل‌میخ ساخت، غلط است.",
      rule: "Codice della Strada art. 40 c.3, c.5–6, c.8, c.10 lett. b; DPR 495/1992 art. 154 c.2–3",
    },
    {
      kind: "classify",
      title: "این نقش از کدام خانواده است؟",
      body: "پنج تصویر از بانک سؤال. برای هر کدام بگو نقشِ اصلیِ تصویر چیست. جزئیاتِ هر خانواده را در درس‌های بعد می‌بینی.",
      options: [
        { it: "striscia longitudinale", fa: "خطِ طولی" },
        { it: "striscia trasversale", fa: "خطِ عرضی" },
        { it: "attraversamento pedonale", fa: "گذرگاهِ عابر" },
        { it: "isola di traffico", fa: "جزیره‌ی ترافیکی" },
        { it: "iscrizione", fa: "نوشته یا نماد" },
      ],
      items: [
        { prompt: "خط‌های میانِ این جاده؟", figure: 509, answer: 0, explain: "دو خطِ ممتدِ کنارِ هم، در درازای جاده: خطِ طولی (درس ۲)." },
        { prompt: "خطِ سفیدِ پهن در انتهای جاده‌ی فرعی؟", figure: 563, answer: 1, explain: "از یک لبه‌ی خطِ عبور تا لبه‌ی دیگر کشیده شده: جای ایستادن (درس ۷)." },
        { prompt: "نوارهای پهنِ سفید؟", figure: 517, answer: 2, explain: "نوارهای موازی با جهتِ حرکتِ خودروها: گذرگاهِ عابر (درس ۸)." },
        { prompt: "سطحِ راه‌راهِ اریب کنارِ تقاطع؟", figure: 595, answer: 3, explain: "خط‌های اریبِ سفید در یک قاب: جزیره‌ی ترافیکی؛ رویش نه حرکت، نه پارک (درس ۶)." },
        { prompt: "ضربدر با حروفِ P و L روی خطِ عبور؟", figure: 531, answer: 4, explain: "نوشته روی آسفالت: گذرگاهِ راه‌آهن نزدیک است (درس ۱۰)." },
      ],
      takeaway: "اول خانواده را بشناس، بعد دو سؤال بپرس: چه رنگی است؟ ممتد است یا خط‌چین؟",
      rule: "Codice della Strada art. 40 c.2",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la segnaletica orizzontale", fa: "خط‌کشی و نقش‌های روی آسفالت" },
        { it: "la striscia", fa: "خط (رنگ‌شده)", note: "longitudinale = طولی؛ trasversale = عرضی." },
        { it: "continua", fa: "ممتد" },
        { it: "discontinua", fa: "خط‌چین", note: "در سؤال‌ها «tratteggiata» هم به همین معنی است." },
        { it: "azzurro", fa: "آبیِ روشن", note: "در این سؤال‌ها «blu» هم می‌آید؛ هر دو فقط برای پارکِ پولی درست‌اند." },
        { it: "i chiodi", fa: "گل‌میخ‌های جاده" },
        { it: "la pavimentazione", fa: "سطحِ جاده؛ آسفالت" },
        { it: "regolamentare", fa: "طبقِ مقررات؛ مجاز" },
      ],
    },
    {
      kind: "trap",
      title: "TAXI روی آسفالت: کدام رنگ؟",
      body: "دو جمله‌ی بانک درباره‌ی یک کلمه‌اند. فقط رنگ فرق دارد، و همان جواب را عوض می‌کند:",
      examples: [
        {
          sourceId: "2531",
          textIt:
            "E' regolamentare trovare sulla pavimentazione la scritta TAXI di colore giallo, per indicare zone riservate alla sosta dei taxi in servizio",
          answer: 1,
          chunks: [
            { it: REGOLAMENTARE, fa: REGOLAMENTARE_FA },
            { it: SULLA_PAVIMENTAZIONE, fa: SULLA_PAVIMENTAZIONE_FA },
            { it: "la scritta TAXI di colore giallo,", fa: "کلمه‌ی TAXI به رنگِ زرد،", focus: "contrast" },
            { it: "per indicare zone riservate alla sosta dei taxi in servizio", fa: "برای نشان دادنِ جای پارکِ ویژه‌ی تاکسی‌های در حالِ کار", focus: "reason" },
          ],
          translation: "طبقِ مقررات است که روی آسفالت کلمه‌ی TAXI را به رنگِ زرد ببینی، برای نشان دادنِ جای پارکِ ویژه‌ی تاکسی‌های در حالِ کار.",
          why: "درست است. نوشته‌ها سفیدند، جز BUS، TRAM و TAXI که باید زرد باشند.",
        },
        {
          sourceId: "2540",
          textIt: "E' regolamentare trovare sulla pavimentazione la scritta TAXI, di colore bianco, nei parcheggi per taxi",
          answer: 0,
          chunks: [
            { it: REGOLAMENTARE, fa: REGOLAMENTARE_FA },
            { it: SULLA_PAVIMENTAZIONE, fa: SULLA_PAVIMENTAZIONE_FA },
            { it: "la scritta TAXI,", fa: "کلمه‌ی TAXI،" },
            { it: "di colore bianco,", fa: "به رنگِ سفید،", focus: "contrast" },
            { it: "nei parcheggi per taxi", fa: "در پارکینگِ تاکسی‌ها" },
          ],
          translation: "طبقِ مقررات است که روی آسفالت کلمه‌ی TAXI را به رنگِ سفید، در پارکینگِ تاکسی‌ها، ببینی.",
          why: "غلط است. TAXI جای ویژه است و جای ویژه زرد است. سفید برای TAXI مجاز نیست.",
        },
      ],
      takeaway: "سفید = عادی. زرد = ویژه یا پارک ممنوع. آبی = پارکِ پولی. رنگِ غلط کلِ جمله را غلط می‌کند.",
      rule: "DPR 495/1992 art. 148 c.4",
    },
  ],
  practice: [
    {
      sourceId: "2411",
      textIt: "Le strisce lungo il centro della carreggiata possono essere bianche o azzurre",
      answer: 0,
      chunks: [
        { it: "Le strisce lungo il centro della carreggiata", fa: "خط‌های درازای وسطِ سواره‌رو" },
        { it: "possono essere bianche", fa: "می‌توانند سفید باشند", verb: "possono ← potere" },
        { it: "o azzurre", fa: "یا آبی", focus: "contrast" },
      ],
      translation: "خط‌های درازای وسطِ سواره‌رو می‌توانند سفید یا آبی باشند.",
      why: "غلط است (قدم ۱). خطِ وسط همیشه سفید است. آبی فقط دورِ جای پارکِ پولی کشیده می‌شود.",
      rule: "DPR 495/1992 art. 139 c.1; art. 149 c.3",
      conceptStep: 1,
    },
    {
      sourceId: "2443",
      figure: 547,
      textIt: "Le frecce direzionali in figura sono di colore blu nelle autostrade",
      answer: 0,
      chunks: [
        { it: FRECCE, fa: FRECCE_FA },
        { it: "sono di colore blu", fa: "آبی‌رنگ‌اند", focus: "contrast" },
        { it: "nelle autostrade", fa: "در آزادراه‌ها", focus: "condition" },
      ],
      translation: "فلش‌های جهتِ تصویر در آزادراه‌ها آبی‌رنگ‌اند.",
      why: "غلط است (قدم ۱). فلش‌ها همه‌جا سفیدند. تابلوهای آزادراه سبزند، ولی این ربطی به خط‌کشیِ روی آسفالت ندارد.",
      rule: "DPR 495/1992 art. 147 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2402",
      figure: 502,
      textIt: 'La striscia bianca discontinua in figura può essere sostituita da una serie di "chiodi" per segnaletica stradale',
      answer: 0,
      chunks: [
        { it: STRISCIA_502, fa: STRISCIA_502_FA },
        { it: "può essere sostituita", fa: "می‌تواند جایش را بدهد به", verb: "può essere sostituita ← sostituire" },
        { it: 'da una serie di "chiodi" per segnaletica stradale', fa: "یک ردیف «گل‌میخِ» خط‌کشیِ جاده" },
      ],
      translation: "خط‌چینِ سفیدِ تصویر را می‌شود با یک ردیف «گل‌میخِ» خط‌کشیِ جاده جایگزین کرد.",
      why: "غلط است (قدم ۲). ردیفِ گل‌میخ فقط می‌تواند جای خطِ ممتد بنشیند، نه جای خط‌چین.",
      rule: "DPR 495/1992 art. 154 c.2",
      conceptStep: 2,
    },
    {
      sourceId: "2530",
      textIt:
        "E' regolamentare, nelle zone destinate alla fermata degli autobus in servizio pubblico di linea, trovare sulla pavimentazione la scritta BUS di colore giallo",
      answer: 1,
      chunks: [
        { it: "E' regolamentare,", fa: "طبقِ مقررات است،" },
        { it: "nelle zone destinate alla fermata degli autobus in servizio pubblico di linea,", fa: "در محل‌های توقفِ اتوبوس‌های خطِ عمومی،" },
        { it: SULLA_PAVIMENTAZIONE, fa: SULLA_PAVIMENTAZIONE_FA },
        { it: "la scritta BUS di colore giallo", fa: "کلمه‌ی BUS به رنگِ زرد" },
      ],
      translation: "طبقِ مقررات است که در محل‌های توقفِ اتوبوس‌های خطِ عمومی، روی آسفالت کلمه‌ی BUS را به رنگِ زرد ببینی.",
      why: "درست است (قدم ۱). ایستگاهِ اتوبوس جای ویژه است: خط‌ها و کلمه‌ی BUS زردند.",
      rule: "DPR 495/1992 art. 148 c.4; art. 151 c.4",
      conceptStep: 1,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2411", "2422", "2441", "2442", "2443", "2450", "2491", "2530", "2531", "2540"] },
    { step: 2, sourceIds: ["2402", "2412"] },
  ],
};

// ── Lesson 3 ──────────────────────────────────────────────────────────────────

export const lessonSensoUnicoDoppio: Lesson = {
  id: "senso-unico-doppio-senso",
  titleFa: "یک‌طرفه یا دوطرفه: خط‌چین چه چیزی را جدا می‌کند؟",
  titleIt: "SENSO UNICO · DOPPIO SENSO",
  minutes: 4,
  signs: [],
  figures: [502, 509],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی یک خط‌چینِ سفید در جاده‌ی یک‌طرفه و دوطرفه چه چیزی را جدا می‌کند، و در هر کدام برای پیچیدن به چپ، دور زدن و رانندگیِ چند ردیف کنار هم چه باید بکنی.",
      why:
        "بانک یک تصویر (خط‌چینِ ۵۰۲) را با دو شروعِ مختلف می‌پرسد: «در جاده‌ی یک‌طرفه…» و «در جاده‌ی دوطرفه…». جوابِ درست به همین چند کلمه‌ی اول بستگی دارد، نه به تصویر.",
    },
    {
      kind: "table",
      title: "همان خط، دو جاده",
      body: "خط‌چین در هر دو جاده یک شکل دارد. کاری که تو باید بکنی فرق دارد، چون در یکی همه هم‌جهت‌اند و در دیگری نیمی از جاده مالِ جهتِ مقابل است.",
      columns: ["senso unico", "doppio senso"],
      rows: [
        { label: "خط‌چین جدا می‌کند", values: ["دو خطِ عبورِ هم‌جهت را", "دو جهتِ حرکت را؛ در هر جهت یک خطِ عبور"] },
        { label: "دو جهتِ حرکت", values: ["ندارد؛ پس هیچ خطی «دو جهت را جدا» نمی‌کند، نه روی تپه، نه جای دیگر", "دارد؛ خطِ وسط آن‌ها را جدا می‌کند"] },
        {
          label: "خطِ عبورِ چپ",
          values: [
            "معمولاً برای سبقت است؛ عادی در خطِ آزادِ سمتِ راست برو",
            "خطِ عبورِ جهتِ مقابل است؛ فقط موقتاً برای سبقت یا پیچیدن. جای توقفِ اضطراری هم نیست",
          ],
        },
        { label: "پیچیدن به چپ", values: ["تا جای ممکن به لبه‌ی چپ برو", "به وسطِ سواره‌رو، کنارِ خطِ وسط، نزدیک شو"] },
        {
          label: "دور زدن",
          values: [
            "هرگز؛ برگشتن یعنی رانندگی در خلافِ جهت",
            "فقط جایی که خط‌چین است و مجاز و بی‌خطر؛ و ناچار از خطِ عبورِ مقابل می‌گذری",
          ],
        },
        {
          label: "چند ردیف کنار هم",
          values: [
            "فقط با ترافیکِ سنگین یا وقتی مأمور اجازه بدهد؛ نه «همیشه»",
            "با یک خطِ عبور در هر جهت، نه. خطِ ممتدِ دوتایی هم این اجازه را نمی‌دهد",
          ],
        },
      ],
      takeaway:
        "اول بپرس: یک‌طرفه است یا دوطرفه؟ یک‌طرفه: برای چپ به چپ برو، دور زدن هرگز. دوطرفه: برای چپ به وسط برو، دور زدن فقط با خط‌چین و با اشغالِ خطِ مقابل.",
      rule: "Codice della Strada art. 143 c.5; art. 144 c.1; art. 154 c.3 lett. b; art. 40 c.3, c.8",
    },
    {
      kind: "classify",
      title: "کجا قرار بگیری؟",
      body: "چهار موقعیتِ ساختگی. برای هر کدام بگو پیش از مانور کجا قرار می‌گیری، یا اینکه اصلاً ممکن نیست.",
      options: [
        { it: "verso il centro", fa: "به وسطِ سواره‌رو نزدیک شو" },
        { it: "margine sinistro", fa: "به لبه‌ی چپ برو" },
        { it: "non si può", fa: "اینجا ممکن نیست" },
      ],
      items: [
        {
          prompt: "جاده‌ی دوطرفه، یک خطِ عبور در هر جهت، خط‌چین در وسط. می‌خواهی در تقاطعِ بعدی به چپ بپیچی.",
          answer: 0,
          explain: "در جاده‌ی دوطرفه برای پیچیدن به چپ به خطِ وسط نزدیک می‌شوی، نه به لبه‌ی چپ (آنجا خطِ عبورِ مقابل است).",
        },
        {
          prompt: "جاده‌ی یک‌طرفه با دو خطِ عبور. می‌خواهی در تقاطعِ بعدی به چپ بپیچی.",
          answer: 1,
          explain: "در یک‌طرفه همه‌ی جاده هم‌جهتِ توست؛ برای چپ تا جای ممکن به لبه‌ی چپ می‌روی. ماندن در خطِ راست غلط است.",
        },
        {
          prompt: "جاده‌ی یک‌طرفه با دو خطِ عبور. می‌خواهی دور بزنی و برگردی.",
          answer: 2,
          explain: "در جاده‌ی یک‌طرفه دور زدن ممکن نیست، چه خط‌چین باشد چه نه: بعد از دور زدن در خلافِ جهت می‌رانی.",
        },
        {
          prompt: "جاده‌ی دوطرفه با دو خطِ ممتدِ کنارِ هم در وسط. می‌خواهی دور بزنی.",
          answer: 2,
          explain: "برای دور زدن باید از خطِ وسط عبور کنی، و از خطِ ممتد، تکی یا دوتایی، نباید عبور کرد.",
        },
      ],
      takeaway: "پیش از هر مانور به چپ، دو چیز را بخوان: جهتِ جاده (یک‌طرفه یا دوطرفه) و خطِ وسط (ممتد یا خط‌چین).",
      rule: "Codice della Strada art. 154 c.3 lett. b; art. 40 c.8",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il senso unico", fa: "یک‌طرفه" },
        { it: "il doppio senso", fa: "دوطرفه" },
        { it: "l'inversione di marcia", fa: "دور زدن", note: "«l'inversione del senso di marcia» هم همین است." },
        { it: "svoltare a sinistra", base: "svoltare", fa: "به چپ پیچیدن" },
        { it: "spostarsi verso il centro", base: "spostarsi", fa: "به سمتِ وسط رفتن" },
        { it: "per file parallele", fa: "چند ردیف کنارِ هم" },
        { it: "riservata al sorpasso", fa: "مخصوصِ سبقت" },
        { it: "di norma", fa: "معمولاً؛ به‌طورِ عادی", note: "یعنی استثنا ممکن است؛ «sempre» یعنی هیچ استثنایی نیست." },
      ],
    },
    {
      kind: "trap",
      title: "«برای پیچیدن به چپ»: کجا بروی؟",
      body: "دو جمله‌ی بانک با یک تصویر و یک هدف. فقط نوعِ جاده فرق می‌کند:",
      examples: [
        {
          sourceId: "2581",
          figure: 502,
          textIt:
            "In una strada a doppio senso di circolazione con la segnaletica indicata in figura per svoltare a sinistra bisogna spostarsi verso il centro della carreggiata",
          answer: 1,
          chunks: [
            { it: DOPPIO_SENSO, fa: DOPPIO_SENSO_FA, focus: "condition" },
            { it: SEGNALETICA, fa: SEGNALETICA_FA },
            { it: "per svoltare a sinistra", fa: "برای پیچیدن به چپ", focus: "reason" },
            { it: "bisogna spostarsi verso il centro della carreggiata", fa: "باید به سمتِ وسطِ سواره‌رو بروی", verb: "bisogna ← bisognare" },
          ],
          translation: "در جاده‌ای دوطرفه با خط‌کشیِ تصویر، برای پیچیدن به چپ باید به سمتِ وسطِ سواره‌رو بروی.",
          why: "درست است. در دوطرفه، نیمه‌ی چپ مالِ جهتِ مقابل است؛ پس تا خطِ وسط می‌روی، نه بیشتر.",
        },
        {
          sourceId: "2550",
          figure: 502,
          textIt:
            "In una strada a senso unico di circolazione con la segnaletica indicata in figura per svoltare a sinistra bisogna rimanere nella corsia di destra",
          answer: 0,
          chunks: [
            { it: SENSO_UNICO, fa: SENSO_UNICO_FA, focus: "condition" },
            { it: SEGNALETICA, fa: SEGNALETICA_FA },
            { it: "per svoltare a sinistra", fa: "برای پیچیدن به چپ", focus: "reason" },
            { it: "bisogna rimanere nella corsia di destra", fa: "باید در خطِ عبورِ راست بمانی", verb: "bisogna ← bisognare", focus: "contrast" },
          ],
          translation: "در جاده‌ای یک‌طرفه با خط‌کشیِ تصویر، برای پیچیدن به چپ باید در خطِ عبورِ راست بمانی.",
          why: "غلط است. در یک‌طرفه کلِ سواره‌رو هم‌جهتِ توست؛ برای چپ به لبه‌ی چپ، یعنی به خطِ عبورِ چپ، می‌روی.",
        },
      ],
      takeaway: "«per svoltare a sinistra» را با نوعِ جاده بخوان: دوطرفه → وسط؛ یک‌طرفه → لبه‌ی چپ.",
      rule: "Codice della Strada art. 154 c.3 lett. b",
    },
  ],
  practice: [
    {
      sourceId: "2403",
      figure: 502,
      textIt: "La striscia bianca discontinua in figura consente l'inversione di marcia nelle strade a senso unico",
      answer: 0,
      chunks: [
        { it: STRISCIA_502, fa: STRISCIA_502_FA },
        { it: "consente l'inversione di marcia", fa: "اجازه‌ی دور زدن را می‌دهد", verb: "consente ← consentire" },
        { it: "nelle strade a senso unico", fa: "در جاده‌های یک‌طرفه", focus: "condition" },
      ],
      translation: "خط‌چینِ سفیدِ تصویر در جاده‌های یک‌طرفه اجازه‌ی دور زدن را می‌دهد.",
      why: "غلط است (قدم ۱). در یک‌طرفه خط‌چین فقط دو خطِ عبورِ هم‌جهت را جدا می‌کند؛ دور زدن آنجا یعنی رانندگی در خلافِ جهت.",
      rule: "Codice della Strada art. 143; art. 154",
      conceptStep: 1,
    },
    {
      sourceId: "2548",
      figure: 502,
      textIt:
        "In una strada a senso unico di circolazione con la segnaletica indicata in figura si può fare l'inversione del senso di marcia",
      answer: 0,
      chunks: [
        { it: SENSO_UNICO, fa: SENSO_UNICO_FA, focus: "condition" },
        { it: SEGNALETICA, fa: SEGNALETICA_FA },
        { it: "si può fare l'inversione del senso di marcia", fa: "می‌شود دور زد", verb: "si può ← potere" },
      ],
      translation: "در جاده‌ای یک‌طرفه با خط‌کشیِ تصویر، می‌شود دور زد.",
      why: "غلط است (قدم ۱). خط‌چین در یک‌طرفه اجازه‌ی عوض کردنِ خطِ عبور را می‌دهد، نه برگشتن در خلافِ جهت.",
      rule: "Codice della Strada art. 143; art. 154",
      conceptStep: 1,
    },
    {
      sourceId: "2584",
      figure: 502,
      textIt:
        "In una strada a doppio senso di circolazione con la segnaletica indicata in figura si può fare l'inversione di marcia, ma senza occupare l'altra corsia",
      answer: 0,
      chunks: [
        { it: DOPPIO_SENSO, fa: DOPPIO_SENSO_FA, focus: "condition" },
        { it: SEGNALETICA, fa: SEGNALETICA_FA },
        { it: "si può fare l'inversione di marcia,", fa: "می‌شود دور زد،", verb: "si può ← potere" },
        { it: "ma senza occupare l'altra corsia", fa: "ولی بدون اشغالِ خطِ عبورِ دیگر", focus: "limit" },
      ],
      translation: "در جاده‌ای دوطرفه با خط‌کشیِ تصویر، می‌شود دور زد، ولی بدون اشغالِ خطِ عبورِ دیگر.",
      why: "غلط است (قدم ۱). دور زدن در جاده‌ی دوطرفه یعنی رفتن به خطِ عبورِ مقابل؛ بدونِ اشغالِ آن ممکن نیست. شرطِ «ma senza» جمله را غلط کرده است.",
      rule: "Codice della Strada art. 40 c.8; art. 154",
      conceptStep: 1,
    },
    {
      sourceId: "2545",
      figure: 502,
      textIt:
        "In una strada a senso unico di circolazione con la segnaletica indicata in figura la corsia di sinistra è, di norma, riservata al sorpasso",
      answer: 1,
      chunks: [
        { it: SENSO_UNICO, fa: SENSO_UNICO_FA, focus: "condition" },
        { it: SEGNALETICA, fa: SEGNALETICA_FA },
        { it: "la corsia di sinistra è,", fa: "خطِ عبورِ چپ" },
        { it: "di norma,", fa: "معمولاً،", focus: "limit" },
        { it: "riservata al sorpasso", fa: "مخصوصِ سبقت است" },
      ],
      translation: "در جاده‌ای یک‌طرفه با خط‌کشیِ تصویر، خطِ عبورِ چپ معمولاً مخصوصِ سبقت است.",
      why: "درست است (قدم ۱). وقتی در یک جهت دو خطِ عبور هست، در خطِ آزادِ سمتِ راست می‌رانی و خطِ چپ برای سبقت است. «di norma» استثناها را باز می‌گذارد.",
      rule: "Codice della Strada art. 143 c.5",
      conceptStep: 1,
    },
  ],
  related: [{ step: 1, sourceIds: ["2403", "2406", "2420", "2545", "2547", "2548", "2550", "2581", "2584", "2585"] }],
};

// ── Lesson 4 ──────────────────────────────────────────────────────────────────

export const lessonFrecceCorsie: Lesson = {
  id: "frecce-corsie-preselezione",
  titleFa: "فلش‌ها و انتخابِ خطِ عبور قبل از تقاطع",
  titleIt: "FRECCE DIREZIONALI · CORSIE DI PRESELEZIONE",
  minutes: 5,
  signs: [],
  figures: [547, 564, 565, 574],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی فلش‌های روی آسفالت چه جهت‌هایی را مجاز می‌کنند، تا کجا هنوز می‌توانی خطِ عبورت را عوض کنی، و از کجا به فلشِ خطِ عبورِ خودت متعهدی.",
      why:
        "۳۵ سؤالِ این فصل درباره‌ی همین چند ده متر پیش از تقاطع است. همه یک کلید دارند: خطِ بینِ خط‌های عبور هنوز خط‌چین است یا ممتد شده؟",
    },
    {
      kind: "anatomy",
      title: "رسیدن به تقاطع، از بالا",
      scene: "approach",
      body: "تو در خطِ عبورِ وسط به سمتِ تقاطع می‌روی. روی هر بخشِ خط‌کشی بزن تا ببینی چه می‌گوید.",
      parts: [
        {
          id: "tratteggio",
          nameIt: "STRISCE DI CORSIA DISCONTINUE",
          nameFa: "خط‌چینِ بینِ خط‌های عبور",
          text: "تا وقتی خط‌چین است می‌توانی، با راهنما و بدون مزاحمت، به خطِ عبوری بروی که فلشش جهتِ تو را دارد. اینجا هنوز فلش‌ها تو را مجبور نمی‌کنند.",
        },
        {
          id: "continua",
          nameIt: "STRISCE DI CORSIA CONTINUE",
          nameFa: "خطِ ممتدِ بینِ خط‌های عبور",
          text: "بخشِ آخر پیش از خطِ ایست، دست‌کم ۳۰ متر. از اینجا عوض کردنِ خطِ عبور ممنوع است؛ هر خطی که در آن هستی، باید طبقِ فلشش بروی.",
        },
        {
          id: "frecce",
          nameIt: "FRECCE DIREZIONALI",
          nameFa: "فلش‌های جهت",
          text: "سفیدند و جهت‌های مجازِ هر خطِ عبور را نشان می‌دهند: اینجا چپ، مستقیم، و مستقیم-راست. فلشِ ترکیبی یعنی هر دو جهت؛ جهتی که فلش ندارد مجاز نیست. ربطی به توقفِ اضطراری یا پارک ندارند.",
        },
        {
          id: "scritta",
          nameIt: "ISCRIZIONE",
          nameFa: "نوشته‌ی مقصد",
          text: "کنارِ فلش می‌شود نامِ شهر یا محله‌ای را نوشت که از این خطِ عبور به آن می‌رسی. به انتخابِ خطِ عبورِ درست کمک می‌کند.",
        },
        {
          id: "mezzeria",
          nameIt: "STRISCIA CONTINUA DI MEZZERIA",
          nameFa: "خطِ وسطِ ممتد",
          text: "نزدیکِ تقاطع خطِ وسط ممتد است: نه برای سبقت از آن عبور کن، نه برای دور زدن.",
        },
        {
          id: "arresto",
          nameIt: "STRISCIA DI ARRESTO",
          nameFa: "خطِ ایست",
          text: "خطِ عرضیِ ممتد: وقتی چراغ قرمز است، تابلوی STOP هست یا مأمور می‌گوید، جلوی آن بایست (درس ۷).",
        },
        {
          id: "pedonale",
          nameIt: "ATTRAVERSAMENTO PEDONALE",
          nameFa: "گذرگاهِ عابر",
          text: "بعد از خطِ ایست است. عابری که روی آن است یا می‌خواهد عبور کند حق تقدم دارد (درس ۸).",
        },
      ],
      takeaway: "خط‌چین = هنوز انتخاب داری. ممتد = انتخاب کرده‌ای و فلشِ خطِ عبورت تعیین می‌کند کجا بروی.",
      rule: "DPR 495/1992 art. 139 c.2 lett. b; art. 140 c.4; art. 147 c.1–2, c.4; art. 148 c.2; Codice della Strada art. 40 c.8",
    },
    {
      kind: "classify",
      title: "هر خطِ عبور به کجا می‌رود؟",
      body:
        "سه تصویر از بانک سؤال. برای هر خطِ عبور بگو چه جهت‌هایی مجاز است. در تصویرِ بی‌فلش (۵۷۴) قاعده‌ی عمومی را به کار ببر: برای چپ خطِ چپ، برای راست خطِ راست، و خطِ وسط برای مستقیم.",
      options: [
        { it: "solo a sinistra", fa: "فقط چپ" },
        { it: "diritto o a sinistra", fa: "مستقیم یا چپ" },
        { it: "solo diritto", fa: "فقط مستقیم" },
        { it: "diritto o a destra", fa: "مستقیم یا راست" },
        { it: "solo a destra", fa: "فقط راست" },
        { it: "a sinistra o a destra", fa: "چپ یا راست" },
      ],
      items: [
        { prompt: "خطِ عبورِ A", figure: 564, answer: 0, explain: "فلشِ A فقط به چپ می‌پیچد." },
        { prompt: "خطِ عبورِ B", figure: 564, answer: 5, explain: "فلشِ B دو شاخه دارد: چپ و راست. مستقیم نه؛ در این تصویر هیچ خطی مستقیم نمی‌رود." },
        { prompt: "خطِ عبورِ C", figure: 564, answer: 4, explain: "فلشِ C فقط به راست می‌پیچد." },
        { prompt: "خطِ عبورِ A", figure: 565, answer: 0, explain: "فلشِ A فقط به چپ می‌پیچد. ولی A تنها خطِ چپ نیست: B هم به چپ می‌رود." },
        { prompt: "خطِ عبورِ B", figure: 565, answer: 1, explain: "فلشِ ترکیبی: مستقیم و چپ." },
        { prompt: "خطِ عبورِ C", figure: 565, answer: 3, explain: "مستقیم و راست. تنها خطی است که به راست می‌رود، ولی «فقط راست» نیست." },
        { prompt: "بی‌فلش: خطِ عبورِ چپ (همان که خودرو در آن است)", figure: 574, answer: 1, explain: "خطِ چپ برای مستقیم و برای پیچیدن به چپ است؛ خودرو بدونِ عوض کردنِ خط می‌تواند به چپ بپیچد." },
        { prompt: "بی‌فلش: خطِ عبورِ وسط", figure: 574, answer: 2, explain: "خطِ وسط فقط برای مستقیم است؛ برای پیچیدن باید پیش‌تر به خطِ کناری رفته باشی." },
        { prompt: "بی‌فلش: خطِ عبورِ راست", figure: 574, answer: 3, explain: "خطِ راست برای مستقیم و برای پیچیدن به راست است. مخصوصِ خودروهای کُند نیست." },
      ],
      takeaway: "در بخشِ ممتد، فلشِ خطِ عبورِ تو تنها جوابِ «کجا می‌توانم بروم؟» است. «فقط» را در جمله پیدا کن و با فلش بسنج.",
      rule: "DPR 495/1992 art. 147 c.2, c.4; Codice della Strada art. 154 c.3",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la freccia direzionale", fa: "فلشِ جهت" },
        { it: "la corsia di preselezione", fa: "خطِ عبورِ انتخابِ جهت (پیش از تقاطع)" },
        { it: "proseguire diritto", base: "proseguire", fa: "مستقیم ادامه دادن" },
        { it: "svoltare", fa: "پیچیدن" },
        { it: "immettersi nella corsia", base: "immettersi", fa: "واردِ خطِ عبور شدن" },
        { it: "cambiare corsia", base: "cambiare", fa: "خطِ عبور عوض کردن" },
        { it: "combinata", base: "combinare", fa: "ترکیبی", note: "«freccia combinata diritta-destra» = فلشی که هم مستقیم است هم راست." },
        { it: "la località", fa: "مقصد؛ نامِ شهر یا محل" },
      ],
    },
    {
      kind: "trap",
      title: "فلش کِی اجبار می‌شود؟",
      body: "دو جمله‌ی بانک درباره‌ی یک تصویر. فرقشان یک شرط است: خط‌ها ممتدند یا خط‌چین.",
      examples: [
        {
          sourceId: "2434",
          figure: 547,
          textIt: "Le frecce direzionali in figura obbligano a seguire la direzione indicata se le strisce di corsia sono continue",
          answer: 1,
          chunks: [
            { it: FRECCE, fa: FRECCE_FA },
            { it: "obbligano a seguire la direzione indicata", fa: "مجبور می‌کنند جهتِ نشان‌داده‌شده را بروی", verb: "obbligano ← obbligare" },
            { it: "se le strisce di corsia sono continue", fa: "اگر خط‌های بینِ خط‌های عبور ممتد باشند", focus: "condition" },
          ],
          translation: "فلش‌های جهتِ تصویر، اگر خط‌های بینِ خط‌های عبور ممتد باشند، مجبورت می‌کنند جهتِ نشان‌داده‌شده را بروی.",
          why: "درست است. از خطِ ممتد نمی‌توانی عبور کنی، پس در خطِ عبورت می‌مانی و فقط جهتِ فلشِ همان خط برایت می‌ماند.",
        },
        {
          sourceId: "2438",
          figure: 547,
          textIt:
            "Le frecce direzionali in figura obbligano a seguire la direzione indicata, anche se le strisce di corsia sono discontinue (tratteggiate)",
          answer: 0,
          chunks: [
            { it: FRECCE, fa: FRECCE_FA },
            { it: "obbligano a seguire la direzione indicata,", fa: "مجبور می‌کنند جهتِ نشان‌داده‌شده را بروی،", verb: "obbligano ← obbligare" },
            { it: "anche se le strisce di corsia sono discontinue (tratteggiate)", fa: "حتی اگر خط‌های بینِ خط‌های عبور خط‌چین باشند", focus: "contrast" },
          ],
          translation: "فلش‌های جهتِ تصویر مجبورت می‌کنند جهتِ نشان‌داده‌شده را بروی، حتی اگر خط‌های بینِ خط‌های عبور خط‌چین باشند.",
          why: "غلط است. در بخشِ خط‌چین هنوز می‌توانی به خطِ عبوری بروی که فلشش جهتِ تو را دارد.",
        },
      ],
      takeaway: "فلش + خط‌چین = راهنما، هنوز می‌توانی خط عوض کنی. فلش + ممتد = دستور.",
      rule: "Codice della Strada art. 40 c.8; DPR 495/1992 art. 140 c.4; art. 147",
    },
  ],
  practice: [
    {
      sourceId: "2433",
      figure: 547,
      textIt:
        "Le frecce direzionali in figura consentono di immettersi nella corsia scelta quando le strisce sono ancora discontinue (tratteggiate)",
      answer: 1,
      chunks: [
        { it: FRECCE, fa: FRECCE_FA },
        { it: "consentono di immettersi nella corsia scelta", fa: "اجازه می‌دهند واردِ خطِ عبورِ انتخابی‌ات شوی", verb: "consentono ← consentire" },
        { it: "quando le strisce sono ancora discontinue (tratteggiate)", fa: "وقتی خط‌ها هنوز خط‌چین‌اند", focus: "condition" },
      ],
      translation: "فلش‌های جهتِ تصویر اجازه می‌دهند، وقتی خط‌ها هنوز خط‌چین‌اند، واردِ خطِ عبورِ انتخابی‌ات شوی.",
      why: "درست است (قدم ۱). بخشِ خط‌چین جای انتخاب است: فلش‌ها را می‌خوانی و به خطِ عبورِ جهتِ خودت می‌روی.",
      rule: "Codice della Strada art. 40 c.8; DPR 495/1992 art. 147",
      conceptStep: 1,
    },
    {
      sourceId: "2440",
      figure: 547,
      textIt: "Le frecce direzionali in figura ci consentono di cambiare corsia se le strisce sono continue",
      answer: 0,
      chunks: [
        { it: FRECCE, fa: FRECCE_FA },
        { it: "ci consentono di cambiare corsia", fa: "به ما اجازه می‌دهند خطِ عبور را عوض کنیم", verb: "consentono ← consentire" },
        { it: "se le strisce sono continue", fa: "اگر خط‌ها ممتد باشند", focus: "condition" },
      ],
      translation: "فلش‌های جهتِ تصویر به ما اجازه می‌دهند، اگر خط‌ها ممتد باشند، خطِ عبور را عوض کنیم.",
      why: "غلط است (قدم ۱). از خطِ ممتد نمی‌شود عبور کرد؛ هیچ فلشی این را عوض نمی‌کند.",
      rule: "Codice della Strada art. 40 c.8",
      conceptStep: 1,
    },
    {
      sourceId: "2510",
      figure: 564,
      textIt: "La corsia A, rappresentata in figura, consente al conducente di svoltare solo a sinistra",
      answer: 1,
      chunks: [
        { it: "La corsia A, rappresentata in figura,", fa: "خطِ عبورِ A در تصویر،" },
        { it: "consente al conducente", fa: "به راننده اجازه می‌دهد", verb: "consente ← consentire" },
        { it: "di svoltare solo a sinistra", fa: "فقط به چپ بپیچد", focus: "limit" },
      ],
      translation: "خطِ عبورِ A در تصویر به راننده اجازه می‌دهد فقط به چپ بپیچد.",
      why: "درست است (قدم ۲). فلشِ A فقط به چپ است.",
      rule: "DPR 495/1992 art. 147 c.2 lett. c",
      conceptStep: 2,
    },
    {
      sourceId: "2517",
      figure: 565,
      textIt: "In presenza della segnaletica in figura, la corsia C è l'unica che consente di svoltare a destra.",
      answer: 1,
      chunks: [
        { it: "In presenza della segnaletica in figura,", fa: "با خط‌کشیِ تصویر،" },
        { it: "la corsia C è l'unica", fa: "خطِ عبورِ C تنها خطی است", focus: "limit" },
        { it: "che consente di svoltare a destra.", fa: "که اجازه‌ی پیچیدن به راست را می‌دهد.", verb: "consente ← consentire" },
      ],
      translation: "با خط‌کشیِ تصویر، خطِ عبورِ C تنها خطی است که اجازه‌ی پیچیدن به راست را می‌دهد.",
      why: "درست است (قدم ۲). فقط فلشِ C شاخه‌ی راست دارد (مستقیم-راست). «تنها خطِ راست» درست است، «فقط راست» نه.",
      rule: "DPR 495/1992 art. 147 c.2 lett. d",
      conceptStep: 2,
    },
    {
      sourceId: "2501",
      figure: 574,
      textIt: "La corsia di mezzo rappresentata in figura consente al conducente solo di proseguire diritto",
      answer: 1,
      chunks: [
        { it: "La corsia di mezzo rappresentata in figura", fa: "خطِ عبورِ وسطِ تصویر" },
        { it: "consente al conducente", fa: "به راننده اجازه می‌دهد", verb: "consente ← consentire" },
        { it: "solo di proseguire diritto", fa: "فقط مستقیم ادامه دهد", focus: "limit" },
      ],
      translation: "خطِ عبورِ وسطِ تصویر به راننده اجازه می‌دهد فقط مستقیم ادامه دهد.",
      why: "درست است (قدم ۲). از سه خطِ عبور، برای پیچیدن به چپ خطِ چپ و برای راست خطِ راست است؛ خطِ وسط فقط مستقیم می‌رود.",
      rule: "Codice della Strada art. 154 c.3",
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: ["2431", "2432", "2433", "2434", "2435", "2436", "2437", "2438", "2439", "2440", "2503", "2508", "2511", "2518", "2535"],
    },
    {
      step: 2,
      sourceIds: [
        "2499", "2500", "2501", "2502", "2504", "2505", "2506", "2507", "2509", "2510", "2512", "2513", "2514", "2515", "2516",
        "2517", "2519", "2520", "2521", "2522",
      ],
    },
  ],
};
