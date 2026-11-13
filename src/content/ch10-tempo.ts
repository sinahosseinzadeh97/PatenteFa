/**
 * src/content/ch10-tempo.ts
 * Chapter 10 (Pannelli integrativi), lessons 3–4: the panels that say WHEN a
 * sign applies (II.3: hours, holidays, working days) and FOR WHOM (II.4:
 * only these vehicles, or everyone "eccetto" these).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter10.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const PANEL = "Il pannello integrativo raffigurato";
const PANEL_FA = "پنلِ تکمیلیِ تصویر";
const SIGN = "Il segnale raffigurato";
const SIGN_FA = "تابلوی تصویر";
const IN_FIGURA = "Il segnale in figura";
const IN_FIGURA_FA = "تابلوی شکل";

// ── Lesson 3 ──────────────────────────────────────────────────────────────────

export const lessonOrariGiorni: Lesson = {
  id: "pannelli-orari-giorni",
  titleFa: "کی معتبر است؟ ساعت، روزِ تعطیل، روزِ کاری",
  titleIt: "FASCIA ORARIA · GIORNI FESTIVI · GIORNI LAVORATIVI",
  minutes: 5,
  signs: [123, 124, 125],
  figures: [924, 934, 935, 943, 966, 925, 936, 938, 960, 964, 965, 928, 937, 945, 961],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی پنلِ ساعت فقط «کی» را عوض می‌کند و «چه» را تابلوی بالایی می‌گوید؛ ساعتِ تنها یعنی هر روز در همان ساعت‌ها، صلیب یعنی روزهای تعطیل و دو چکش یعنی روزهای کاری. بیرون از این زمان، تابلو اعتبار ندارد.",
      why: "۳۳ سؤال. بانک صلیب را با کلیسا و قبرستان، چکش را با تعمیرگاه و موزه، و ساعت را با ساعتِ کارِ ZTL یا «رانندگی با چراغِ خاموش» عوض می‌کند. دامِ دیگر برعکس کردنِ تابلوست: ساعت روی ممنوعیت، آن را «مجاز» نمی‌کند.",
    },
    {
      kind: "table",
      title: "فقط ساعت: هر روز",
      body: "پنلِ fascia oraria فقط دو ساعت دارد. تابلوی بالایی هر روز، فقط در همین ساعت‌ها معتبر است؛ بیرون از آن انگار تابلو نیست. پنل معنای تابلو را عوض نمی‌کند: ممنوعیت همچنان ممنوعیت است.",
      columns: ["در این ساعت‌ها"],
      rows: [
        { label: "پنلِ ساعت", it: "7,30 - 19,00", sign: 123, values: ["تابلو هر روز از ۷:۳۰ تا ۱۹ معتبر است. «0 - 24» یعنی شبانه‌روزی (فصل ۳)."] },
        { label: "پارک ممنوع + ساعت", it: "vieta la sosta", sign: 943, values: ["پارک فقط ۷:۳۰ تا ۱۹ ممنوع است."] },
        { label: "عبور ممنوع + ساعت", it: "vieta il transito", sign: 924, values: ["عبور فقط ۷:۳۰ تا ۱۹ ممنوع است."] },
        { label: "پیاده ممنوع + ساعت", it: "nelle sole ore indicate", sign: 966, values: ["پنلِ A زیرِ تابلوی B: عبورِ پیاده فقط در همین ساعت‌ها ممنوع است."] },
        { label: "بوق ممنوع + ساعت", it: "divieto di segnalazioni acustiche", sign: 934, values: ["بوق زدن ۷:۳۰ تا ۱۹ ممنوع است؛ نه این‌که فقط آن موقع مجاز باشد."] },
        { label: "موتور ممنوع + ساعت", it: "transito dei motocicli", sign: 935, values: ["موتورسیکلت در این ساعت‌ها ممنوع است؛ پنل آن را «مجاز» نمی‌کند."] },
        { label: "چه نیست", it: "non è", values: ["ساعتِ کارِ ZTL، ساعتِ «رانندگی با چراغِ خاموش» یا ساعتِ پلاکِ زوج و فرد نیست."] },
      ],
      takeaway: "ساعتِ تنها = هر روز، فقط این ساعت‌ها. «چه» را تابلوی بالایی می‌گوید.",
      rule: "DPR 495/1992 art. 83 c.6 (modello II.3)",
    },
    {
      kind: "table",
      title: "صلیب: روزهای تعطیل",
      body: "صلیبِ کنارِ ساعت یعنی روزهای تعطیل (یکشنبه‌ها و تعطیلاتِ رسمی). تابلو فقط در این روزها و این ساعت‌ها معتبر است. صلیب علامتِ تقویم است، نه نشانه‌ی کلیسا یا قبرستان.",
      columns: ["فقط روزهای تعطیل"],
      rows: [
        { label: "پنلِ تعطیل", it: "giorni festivi", sign: 124, values: ["اعتبارِ تابلو محدود به روزهای تعطیل و همین ساعت‌ها؛ روزهای کاری نه."] },
        { label: "عبور ممنوع + صلیب", it: "vieta il transito", sign: 925, values: ["روزهای تعطیل از ۸ تا ۲۰ عبور ممنوع است."] },
        { label: "پارک ممنوع + صلیب", it: "vieta la sosta", sign: 938, values: ["روزهای تعطیل در این ساعت‌ها پارک ممنوع است."] },
        { label: "موتور ممنوع + صلیب", it: "transito dei motocicli", sign: 936, values: ["یکشنبه ۸ تا ۲۰ موتور ممنوع است؛ پنل آن را مجاز نمی‌کند."] },
        { label: "مسیرِ پیاده + صلیب", it: "ai soli pedoni", sign: 964, values: ["دایره‌ی آبی یعنی «فقط»: روزهای تعطیل ۸ تا ۲۰ فقط پیاده‌ها می‌توانند بروند."] },
        { label: "مسیرِ دوچرخه + صلیب", it: "ai soli ciclisti", sign: 965, values: ["روزهای تعطیل ۸ تا ۲۰ فقط دوچرخه‌سوارها."] },
        { label: "P + صلیب", it: "parcheggio", sign: 960, values: ["پارک فقط روزهای تعطیل در این ساعت‌ها؛ «هر روز» نیست."] },
        { label: "چه نیست", it: "non è", values: ["ساعتِ قبرستان، کلیسا یا مراسمِ مذهبی نیست. ساعتِ کارِ ZTL هم نیست."] },
      ],
      takeaway: "صلیب = روزهای تعطیل. در روزِ کاری این تابلو را نادیده بگیر.",
      rule: "DPR 495/1992 art. 83 c.6 (modello II.3)",
    },
    {
      kind: "table",
      title: "دو چکش: روزهای کاری",
      body: "دو چکشِ ضربدری یعنی روزهای کاری (غیرِ تعطیل). تابلو فقط در این روزها و این ساعت‌ها معتبر است؛ روزهای تعطیل اعتبار ندارد. چکش علامتِ «کار» است، نه تعمیرگاه.",
      columns: ["فقط روزهای کاری"],
      rows: [
        { label: "پنلِ روزِ کاری", it: "giorni lavorativi", sign: 125, values: ["تابلو روزهای کاری از ۸ تا ۲۰ معتبر است؛ نه هر روز، نه روزهای تعطیل."] },
        { label: "عبور ممنوع + چکش", it: "vieta il transito", sign: 928, values: ["روزهای کاری در این ساعت‌ها عبور ممنوع است."] },
        { label: "کامیون ممنوع + چکش", it: "autocarri oltre 3,5 t", sign: 937, values: ["کامیونِ بیش از ۳٫۵ تن روزهای کاری ۸ تا ۲۰ ممنوع است (عددی روی کامیون نیست، پس ۳٫۵ تن؛ فصل ۳)."] },
        { label: "پارک ممنوع + چکش", it: "vieta la sosta", sign: 945, values: ["روزهای کاری در این ساعت‌ها پارک ممنوع است."] },
        { label: "P + چکش", it: "parcheggio", sign: 961, values: ["پارک در روزهای کاری در این ساعت‌ها؛ ویژه‌ی امدادِ جاده‌ای نیست."] },
        { label: "چه نیست", it: "non è", values: ["ساعتِ کارِ تعمیرگاه یا امدادِ خودرو، یا موزه‌ی ابزار نیست. زیرِ P، پارک در روزهای تعطیل را نمی‌گوید."] },
      ],
      takeaway: "چکش = روزهای کاری. صلیب و چکش را جابه‌جا نکن.",
      rule: "DPR 495/1992 art. 83 c.6 (modello II.3)",
    },
    {
      kind: "classify",
      title: "الان معتبر است؟",
      body: "روز و ساعت را بخوان و بگو تابلو در آن لحظه اعتبار دارد یا نه. تمرینِ آموزشی است، نه سؤالِ بانک. فرض کن آن روزِ هفته تعطیلِ رسمی نیست.",
      options: [
        { it: "vale", fa: "معتبر است" },
        { it: "non vale", fa: "معتبر نیست" },
      ],
      items: [
        { prompt: "یکشنبه، ساعت ۱۰", sign: 925, answer: 0, explain: "صلیب = روزهای تعطیل، و ۱۰ بینِ ۸ و ۲۰ است: عبور ممنوع." },
        { prompt: "سه‌شنبه، ساعت ۱۰", sign: 925, answer: 1, explain: "سه‌شنبه روزِ کاری است؛ این تابلو فقط روزهای تعطیل است." },
        { prompt: "یکشنبه، ساعت ۱۰", sign: 928, answer: 1, explain: "چکش = روزهای کاری؛ یکشنبه اعتبار ندارد." },
        { prompt: "چهارشنبه، ساعت ۲۱", sign: 945, answer: 1, explain: "روزِ کاری هست، ولی ۲۱ بعد از ۲۰ است: پارک آزاد." },
        { prompt: "یکشنبه، ساعت ۸ صبح", sign: 943, answer: 0, explain: "ساعتِ تنها = هر روز؛ ۸ بینِ ۷:۳۰ و ۱۹ است: پارک ممنوع." },
        { prompt: "پنجشنبه، ساعت ۲۰", sign: 943, answer: 1, explain: "۲۰ بعد از ۱۹ است: پارک آزاد." },
      ],
      takeaway: "سه سؤال به ترتیب: کدام روزها؟ کدام ساعت‌ها؟ تابلوی بالایی چه می‌گوید؟",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la fascia oraria", fa: "بازه‌ی ساعتی" },
        { it: "i giorni festivi", fa: "روزهای تعطیل" },
        { it: "i giorni lavorativi", fa: "روزهای کاری" },
        { it: "limita la validità", base: "limitare", fa: "اعتبار را محدود می‌کند" },
        { it: "nelle sole ore indicate", fa: "فقط در ساعت‌های نوشته‌شده" },
        { it: "consente", base: "consentire", fa: "اجازه می‌دهد" },
        { it: "vieta", base: "vietare", fa: "ممنوع می‌کند" },
        { it: "la zona a traffico limitato (ZTL)", fa: "منطقه‌ی ترافیکِ محدود (این پنل نیست)" },
      ],
    },
    {
      kind: "trap",
      title: "صلیب ≠ کلیسا",
      body: "هر دو جمله درباره‌ی همان پنلِ صلیب‌دار است:",
      examples: [
        {
          sourceId: "3716",
          sign: 124,
          textIt: "Il pannello integrativo raffigurato limita la validità del segnale sotto cui è posto ai giorni festivi e alla fascia oraria indicata",
          answer: 1,
          chunks: [
            { it: PANEL, fa: PANEL_FA },
            { it: "limita la validità del segnale sotto cui è posto", fa: "اعتبارِ تابلویی را که زیرش نصب است محدود می‌کند", verb: "limita ← limitare" },
            { it: "ai giorni festivi e alla fascia oraria indicata", fa: "به روزهای تعطیل و بازه‌ی ساعتیِ نوشته‌شده", focus: "limit" },
          ],
          translation: "پنلِ تکمیلیِ تصویر اعتبارِ تابلویی را که زیرش نصب است به روزهای تعطیل و بازه‌ی ساعتیِ نوشته‌شده محدود می‌کند.",
          why: "درست است. صلیب = روزهای تعطیل، و ساعت‌ها بازه را می‌گویند.",
        },
        {
          sourceId: "3722",
          sign: 124,
          textIt: "Il pannello integrativo raffigurato indica l'orario d'ingresso nel cimitero",
          answer: 0,
          chunks: [
            { it: PANEL, fa: PANEL_FA },
            { it: "indica l'orario d'ingresso nel cimitero", fa: "ساعتِ ورود به قبرستان را نشان می‌دهد", verb: "indica ← indicare", focus: "contrast" },
          ],
          translation: "پنلِ تکمیلیِ تصویر ساعتِ ورود به قبرستان را نشان می‌دهد.",
          why: "غلط است. پنل همیشه درباره‌ی تابلوی بالایی است، نه یک مکان.",
        },
      ],
      takeaway: "هر جمله‌ای که پنل را به یک مکان (کلیسا، قبرستان، تعمیرگاه، موزه) وصل کند، دام است.",
      rule: "DPR 495/1992 art. 83 c.1, c.6",
    },
  ],
  practice: [
    {
      sourceId: "3711",
      sign: 935,
      textIt: "Il segnale raffigurato consente il transito ai motocicli nelle sole ore indicate",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "consente il transito ai motocicli", fa: "به موتورسیکلت‌ها اجازه‌ی عبور می‌دهد", verb: "consente ← consentire", focus: "contrast" },
        { it: "nelle sole ore indicate", fa: "فقط در ساعت‌های نوشته‌شده", focus: "limit" },
      ],
      translation: "تابلوی تصویر فقط در ساعت‌های نوشته‌شده به موتورسیکلت‌ها اجازه‌ی عبور می‌دهد.",
      why: "غلط است (قدم ۱). دایره‌ی قرمز ممنوعیت است: در این ساعت‌ها موتور ممنوع است، نه مجاز.",
      rule: "DPR 495/1992 art. 83 c.6",
      conceptStep: 1,
    },
    {
      sourceId: "3721",
      sign: 925,
      textIt: "Il segnale raffigurato vieta il transito dalle ore 8.00 alle ore 20.00 dei giorni festivi",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "vieta il transito", fa: "عبور را ممنوع می‌کند", verb: "vieta ← vietare" },
        { it: "dalle ore 8.00 alle ore 20.00 dei giorni festivi", fa: "از ساعت ۸ تا ۲۰ در روزهای تعطیل", focus: "limit" },
      ],
      translation: "تابلوی تصویر عبور را از ساعت ۸ تا ۲۰ روزهای تعطیل ممنوع می‌کند.",
      why: "درست است (قدم ۲). صلیب = روزهای تعطیل.",
      rule: "DPR 495/1992 art. 83 c.6",
      conceptStep: 2,
    },
    {
      sourceId: "3725",
      sign: 960,
      textIt: "Il segnale raffigurato indica che si può parcheggiare tutti i giorni nella fascia oraria indicata",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che si può parcheggiare", fa: "نشان می‌دهد که می‌شود پارک کرد", verb: "si può ← potersi" },
        { it: "tutti i giorni", fa: "همه‌ی روزها", focus: "always" },
        { it: "nella fascia oraria indicata", fa: "در بازه‌ی ساعتیِ نوشته‌شده" },
      ],
      translation: "تابلوی تصویر نشان می‌دهد که می‌شود همه‌ی روزها در بازه‌ی ساعتیِ نوشته‌شده پارک کرد.",
      why: "غلط است (قدم ۲). صلیب روزها را به روزهای تعطیل محدود می‌کند، نه «همه‌ی روزها».",
      rule: "DPR 495/1992 art. 83 c.6",
      conceptStep: 2,
    },
    {
      sourceId: "3733",
      sign: 937,
      textIt: "Il segnale raffigurato vieta il transito agli autocarri di massa complessiva superiore a 3,5 t. nell'orario indicato, dei giorni lavorativi",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "vieta il transito agli autocarri", fa: "عبورِ کامیون‌ها را ممنوع می‌کند", verb: "vieta ← vietare" },
        { it: "di massa complessiva superiore a 3,5 t.", fa: "با جرمِ کلِ بیش از ۳٫۵ تن", focus: "limit" },
        { it: "nell'orario indicato, dei giorni lavorativi", fa: "در ساعتِ نوشته‌شده، در روزهای کاری", focus: "limit" },
      ],
      translation: "تابلوی تصویر عبورِ کامیون‌های با جرمِ کلِ بیش از ۳٫۵ تن را در ساعتِ نوشته‌شده، در روزهای کاری، ممنوع می‌کند.",
      why: "درست است (قدم ۳). چکش = روزهای کاری؛ کامیونِ بدونِ عدد = بیش از ۳٫۵ تن.",
      rule: "DPR 495/1992 art. 83 c.6; art. 117",
      conceptStep: 3,
    },
    {
      sourceId: "3736",
      sign: 125,
      textIt: "Il pannello integrativo raffigurato indica la fascia oraria di apertura delle officine di soccorso stradale",
      answer: 0,
      chunks: [
        { it: PANEL, fa: PANEL_FA },
        { it: "indica la fascia oraria di apertura", fa: "ساعتِ باز بودنِ … را نشان می‌دهد", verb: "indica ← indicare", focus: "contrast" },
        { it: "delle officine di soccorso stradale", fa: "تعمیرگاه‌های امدادِ جاده‌ای" },
      ],
      translation: "پنلِ تکمیلیِ تصویر ساعتِ باز بودنِ تعمیرگاه‌های امدادِ جاده‌ای را نشان می‌دهد.",
      why: "غلط است (قدم ۳). چکش‌ها روزهای کاری‌اند؛ پنل درباره‌ی تابلوی بالایی است، نه تعمیرگاه.",
      rule: "DPR 495/1992 art. 83 c.6",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["3707", "3708", "3709", "3710", "3711", "3712", "3714", "3715"] },
    { step: 2, sourceIds: ["3713", "3716", "3717", "3718", "3719", "3720", "3721", "3722", "3723", "3724", "3725", "3726", "3727"] },
    { step: 3, sourceIds: ["3728", "3729", "3730", "3731", "3732", "3733", "3734", "3735", "3736", "3737", "3738", "3739"] },
  ],
};

// ── Lesson 4 ──────────────────────────────────────────────────────────────────

export const lessonCategorieEccetto: Lesson = {
  id: "pannelli-categorie-eccetto",
  titleFa: "برای چه کسی؟ «فقط این‌ها» یا «به‌جز این‌ها»",
  titleIt: "LIMITAZIONE · ECCETTO",
  minutes: 5,
  signs: [126, 127],
  figures: [926, 941, 954, 927, 929, 962, 967],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس دو پنلِ «چه کسی» را از هم جدا می‌کنی: تصویرِ یک وسیله به‌تنهایی یعنی تابلو فقط برای همان وسیله معتبر است؛ همان تصویر با کلمه‌ی «eccetto» یعنی تابلو برای همه معتبر است، به‌جز همان وسیله.",
      why: "۲۰ سؤال. بانک «فقط برای» و «به‌جز» را جابه‌جا می‌کند و تصویرِ کامیون را با تعمیرگاه یا پمپ‌بنزینِ کامیون‌ها عوض می‌کند.",
    },
    {
      kind: "table",
      title: "فقط برای این وسایل",
      body: "تصویرِ سیاهِ یک وسیله روی پنلِ سفید، بدونِ هیچ کلمه‌ای. دستورِ تابلوی بالایی فقط برای همین دسته است؛ بقیه آزادند. زیرِ تابلوی ممنوع یا اجباری می‌آید.",
      columns: ["قاعده"],
      rows: [
        { label: "پنلِ محدودیت", it: "vale solo per i veicoli rappresentati", sign: 126, values: ["تابلوی بالا فقط برای وسایلِ تصویر معتبر است (این‌جا: کامیونِ مفصلی، autoarticolato)."] },
        { label: "عبور ممنوع + کامیون", it: "vieta il transito ai soli veicoli indicati", sign: 926, values: ["فقط همین وسایل نمی‌توانند رد شوند؛ سواری آزاد است."] },
        { label: "پارک ممنوع + کامیون", it: "vieta la sosta agli autoarticolati", sign: 941, values: ["پارک فقط برای کامیون‌های مفصلی ممنوع است."] },
        { label: "توقف ممنوع + کامیون", it: "vieta la fermata ai veicoli indicati", sign: 954, values: ["توقف، و در نتیجه پارک، فقط برای همین وسایل ممنوع است."] },
        { label: "زیرِ P", it: "parcheggio", values: ["پارکینگ فقط برای همین دسته است؛ «همه‌ی وسایلِ سنگین» نیست."] },
        { label: "چه نیست", it: "non è", values: ["تعمیرگاه یا پمپ‌بنزینِ کامیون نیست. «فقط این‌ها مجازند» هم نیست، وقتی تابلوی بالایی ممنوع است."] },
      ],
      takeaway: "تصویرِ تنها = دستور فقط برای همین وسایل.",
      rule: "DPR 495/1992 art. 83 c.7 (modello II.4)",
    },
    {
      kind: "table",
      title: "به‌جز این وسایل",
      body: "همان تصویر، با کلمه‌ی «eccetto» (به‌جز) بالای آن. دستورِ تابلو برای همه معتبر است، فقط این دسته معاف است. این پنل هم زیرِ تابلوی ممنوع یا اجباری می‌آید و هرگز تنها نیست.",
      columns: ["قاعده"],
      rows: [
        { label: "پنلِ استثنا", it: "eccetto", sign: 127, values: ["همه باید از تابلو پیروی کنند، به‌جز اتوبوس‌ها. اتوبوس یعنی همه‌ی اتوبوس‌ها، نه فقط اتوبوسِ شهری."] },
        { label: "ورود ممنوع + eccetto", it: "consente l'accesso solo agli autobus", sign: 967, values: ["هیچ‌کس وارد نمی‌شود جز اتوبوس: پس فقط اتوبوس‌ها می‌توانند وارد شوند."] },
        { label: "همان، در سؤالی دیگر", it: "permette di transitare solo agli autobus", sign: 927, values: ["همان معنا: عبور فقط برای اتوبوس مجاز است."] },
        { label: "P + eccetto", it: "tutti tranne gli autobus", sign: 962, values: ["همه می‌توانند پارک کنند، به‌جز اتوبوس‌ها."] },
        { label: "چه نیست", it: "non è", values: ["«اتوبوس ممنوع» نیست؛ برعکس است: اتوبوس تنها وسیله‌ای است که دستور شاملش نمی‌شود."] },
      ],
      takeaway: "eccetto = همه، به‌جز این‌ها. ممنوعیت + eccetto = فقط این‌ها مجازند.",
      rule: "DPR 495/1992 art. 83 c.7 (modello II.4)",
    },
    {
      kind: "classify",
      title: "قاعده برای این وسیله هست؟",
      body: "تابلو و وسیله را ببین و بگو دستورِ تابلو شاملِ آن وسیله می‌شود یا نه. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "vale per lui", fa: "شاملش می‌شود" },
        { it: "non vale per lui", fa: "شاملش نمی‌شود" },
      ],
      items: [
        { prompt: "سواری", sign: 926, answer: 1, explain: "تصویرِ تنها: ممنوعیت فقط برای کامیونِ مفصلی است." },
        { prompt: "کامیونِ مفصلی", sign: 941, answer: 0, explain: "همین وسیله روی پنل است: پارک برایش ممنوع است." },
        { prompt: "اتوبوس", sign: 927, answer: 1, explain: "eccetto: اتوبوس معاف است و می‌تواند وارد شود." },
        { prompt: "سواری", sign: 967, answer: 0, explain: "ورود ممنوع برای همه است، به‌جز اتوبوس." },
        { prompt: "سواری", sign: 954, answer: 1, explain: "توقف ممنوع فقط برای وسایلِ تصویر است." },
      ],
      takeaway: "اول ببین «eccetto» نوشته شده یا نه. همین یک کلمه جواب را برعکس می‌کند.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "eccetto", fa: "به‌جز" },
        { it: "i veicoli rappresentati", fa: "وسایلی که در تصویر کشیده شده‌اند" },
        { it: "solo per", fa: "فقط برای" },
        { it: "tranne", fa: "به‌جز" },
        { it: "l'autoarticolato", fa: "کامیونِ مفصلی (کشنده با تریلر)" },
        { it: "può essere abbinato", base: "abbinare", fa: "می‌تواند همراه شود" },
        { it: "può trovarsi da solo", base: "trovarsi", fa: "می‌تواند تنها باشد (پنل هرگز تنها نیست)" },
      ],
    },
    {
      kind: "trap",
      title: "یک کلمه، دو جوابِ مخالف",
      body: "هر دو جمله درباره‌ی ورود ممنوع با «eccetto» و اتوبوس است:",
      examples: [
        {
          sourceId: "3943",
          sign: 927,
          textIt: "Il segnale in figura permette di transitare solo agli autobus",
          answer: 1,
          chunks: [
            { it: IN_FIGURA, fa: IN_FIGURA_FA },
            { it: "permette di transitare", fa: "اجازه‌ی عبور می‌دهد", verb: "permette ← permettere" },
            { it: "solo agli autobus", fa: "فقط به اتوبوس‌ها", focus: "limit" },
          ],
          translation: "تابلوی شکل فقط به اتوبوس‌ها اجازه‌ی عبور می‌دهد.",
          why: "درست است. همه ممنوع‌اند، به‌جز اتوبوس.",
        },
        {
          sourceId: "3948",
          sign: 927,
          textIt: "Il segnale in figura vieta il transito agli autobus",
          answer: 0,
          chunks: [
            { it: IN_FIGURA, fa: IN_FIGURA_FA },
            { it: "vieta il transito agli autobus", fa: "عبورِ اتوبوس‌ها را ممنوع می‌کند", verb: "vieta ← vietare", focus: "contrast" },
          ],
          translation: "تابلوی شکل عبورِ اتوبوس‌ها را ممنوع می‌کند.",
          why: "غلط است. «eccetto» اتوبوس را از ممنوعیت بیرون می‌آورد.",
        },
      ],
      takeaway: "تصویرِ روی پنلِ eccetto، همان کسی است که دستور شاملش نمی‌شود.",
      rule: "DPR 495/1992 art. 83 c.7",
    },
  ],
  practice: [
    {
      sourceId: "3740",
      sign: 926,
      textIt: "Il segnale raffigurato vieta il transito ai soli veicoli indicati",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "vieta il transito", fa: "عبور را ممنوع می‌کند", verb: "vieta ← vietare" },
        { it: "ai soli veicoli indicati", fa: "فقط برای وسایلِ نشان‌داده‌شده", focus: "limit" },
      ],
      translation: "تابلوی تصویر عبور را فقط برای وسایلِ نشان‌داده‌شده ممنوع می‌کند.",
      why: "درست است (قدم ۱). تصویرِ تنها روی پنل = ممنوعیت فقط برای همان وسایل.",
      rule: "DPR 495/1992 art. 83 c.7",
      conceptStep: 1,
    },
    {
      sourceId: "3748",
      sign: 941,
      textIt: "Il segnale raffigurato consente la sosta agli autoarticolati",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "consente la sosta", fa: "اجازه‌ی پارک می‌دهد", verb: "consente ← consentire", focus: "contrast" },
        { it: "agli autoarticolati", fa: "به کامیون‌های مفصلی" },
      ],
      translation: "تابلوی تصویر به کامیون‌های مفصلی اجازه‌ی پارک می‌دهد.",
      why: "غلط است (قدم ۱). تابلو پارک ممنوع است و پنل می‌گوید برای چه کسی: پارک برای همین کامیون‌ها ممنوع است.",
      rule: "DPR 495/1992 art. 83 c.7",
      conceptStep: 1,
    },
    {
      sourceId: "3947",
      sign: 929,
      textIt: "Il segnale in figura vieta l'accesso agli autobus",
      answer: 0,
      chunks: [
        { it: IN_FIGURA, fa: IN_FIGURA_FA },
        { it: "vieta l'accesso agli autobus", fa: "ورودِ اتوبوس‌ها را ممنوع می‌کند", verb: "vieta ← vietare", focus: "contrast" },
      ],
      translation: "تابلوی شکل ورودِ اتوبوس‌ها را ممنوع می‌کند.",
      why: "غلط است (قدم ۲). «eccetto» یعنی اتوبوس معاف است؛ ورود برای بقیه ممنوع است.",
      rule: "DPR 495/1992 art. 83 c.7",
      conceptStep: 2,
    },
    {
      sourceId: "3944",
      sign: 962,
      textIt: "Il segnale in figura indica che possono parcheggiare tutti i veicoli tranne gli autobus",
      answer: 1,
      chunks: [
        { it: IN_FIGURA, fa: IN_FIGURA_FA },
        { it: "indica che possono parcheggiare tutti i veicoli", fa: "نشان می‌دهد که همه‌ی وسایل می‌توانند پارک کنند", verb: "possono ← potere" },
        { it: "tranne gli autobus", fa: "به‌جز اتوبوس‌ها", focus: "contrast" },
      ],
      translation: "تابلوی شکل نشان می‌دهد که همه‌ی وسایل، به‌جز اتوبوس‌ها، می‌توانند پارک کنند.",
      why: "درست است (قدم ۲). P اجازه است و eccetto اتوبوس را از این اجازه بیرون می‌گذارد.",
      rule: "DPR 495/1992 art. 83 c.7",
      conceptStep: 2,
    },
    {
      sourceId: "3949",
      sign: 127,
      textIt: "Il pannello integrativo in figura può trovarsi da solo",
      answer: 0,
      chunks: [
        { it: "Il pannello integrativo in figura", fa: "پنلِ تکمیلیِ شکل" },
        { it: "può trovarsi da solo", fa: "می‌تواند تنها باشد", verb: "può ← potere", focus: "contrast" },
      ],
      translation: "پنلِ تکمیلیِ شکل می‌تواند تنها باشد.",
      why: "غلط است (قدم ۲). پنل فقط تابلوی بالایی را کامل می‌کند؛ بدونِ تابلو معنایی ندارد.",
      rule: "DPR 495/1992 art. 83 c.1, c.7",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["3740", "3741", "3742", "3743", "3744", "3745", "3746", "3747", "3748", "3749", "3750"] },
    { step: 2, sourceIds: ["3942", "3943", "3944", "3945", "3946", "3947", "3948", "3949", "3950"] },
  ],
};
