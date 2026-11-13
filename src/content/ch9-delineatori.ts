/**
 * src/content/ch9-delineatori.ts
 * Chapter 9 (Segnali complementari, segnali temporanei e di cantiere),
 * lessons 5–6: the complementary signs. Delineators along the edge (two-way
 * vs one-way colours, tunnel, snowy mountain road) and inside the carriageway
 * (obstacle); white-on-black chevrons for curves, numbered hairpins and the
 * T-junction.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter9.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const ONE = "Il delineatore raffigurato";
const ONE_FA = "مسیرنمای تصویر";
const MANY = "I delineatori raffigurati";
const MANY_FA = "مسیرنماهای تصویر";

// ── Lesson 5 ──────────────────────────────────────────────────────────────────

export const lessonDelineatoriMargine: Lesson = {
  id: "delineatori-margine-ostacolo",
  titleFa: "مسیرنماها: لبه‌ی جاده، تونل، کوهستان و مانع",
  titleIt: "DELINEATORI DI MARGINE · GALLERIA · MONTAGNA · OSTACOLO",
  minutes: 5,
  signs: [290, 289, 291, 292, 299],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی مسیرنما (delineatore) یک «علامتِ تکمیلی» است: دستور نمی‌دهد، فقط شکلِ جاده را از دور نشان می‌دهد، به‌خصوص در شب و مه. از رنگِ شبرنگش می‌فهمی جاده دوطرفه است یا یک‌طرفه، و جای هر مسیرنما را می‌دانی: کنارِ جاده، در تونل، در جاده‌ی برفیِ کوهستان، یا داخلِ سواره‌رو جلوی یک مانع.",
      why: "۴۸ سؤال. بانک یک‌طرفه و دوطرفه را جابه‌جا می‌کند، مسیرنمای کناری را «وسطِ جاده» یا «تقسیم‌کننده‌ی خط‌ها» می‌نامد و می‌پرسد چراغ دارد یا شبرنگ است.",
    },
    {
      kind: "table",
      title: "رنگِ شبرنگ: دوطرفه یا یک‌طرفه",
      body: "تیرک‌های سفید کنارِ جاده با سرِ سیاه و شبرنگ. نورِ چراغت به شبرنگ می‌خورد و برمی‌گردد، پس شب، در مه و باران هم شکلِ جاده پیداست. روز هم دیده می‌شوند؛ فقط در دیدِ کم مفیدترند. سمت‌ها را از جای راننده بخوان.",
      columns: ["سمتِ راستِ تو", "سمتِ چپِ تو"],
      rows: [
        { label: "جاده‌ی دوطرفه", it: "strada a doppio senso", sign: 290, values: ["شبرنگِ قرمز", "شبرنگِ سفید"] },
        { label: "جاده‌ی یک‌طرفه", it: "strada a senso unico", sign: 289, values: ["یک شبرنگِ زردِ مستطیلی", "دو شبرنگِ زردِ گرد"] },
        { label: "فاصله", it: "distanza tra i delineatori", values: ["در مسیرِ مستقیمِ برون‌شهری حداکثر ۵۰ متر", "در پیچ نزدیک‌تر؛ در مه هم نزدیک‌تر"] },
      ],
      takeaway: "زرد در هر دو طرف = یک‌طرفه. قرمز و سفید = دوطرفه. همیشه در لبه‌ها، هیچ‌وقت وسطِ جاده.",
      rule: "DPR 495/1992 art. 173",
    },
    {
      kind: "table",
      title: "تونل و کوهستان",
      body: "دو مسیرنمای مخصوص، باز هم در لبه‌ها و باز هم بی‌چراغ (شبرنگ).",
      columns: ["یعنی"],
      rows: [
        { label: "تونلِ یک‌طرفه", it: "delineatore per gallerie", sign: 291, values: ["پنلِ زردِ بلند کنارِ تونلِ یک‌طرفه (زرد، مثلِ مسیرنمای یک‌طرفه). بانک: برای نشان دادنِ انحراف یا باریکه‌ی سواره‌رو هم به کار می‌رود."] },
        { label: "کوهستانِ برفی", it: "delineatore per strade di montagna", sign: 292, values: ["تیرکِ بلند با نوارهای زرد و سیاه کنارِ جاده‌های کوهستانیِ برف‌گیر. وقتی برف لبه‌ها را پوشانده، جای لبه‌ی سواره‌رو را نشان می‌دهد."] },
        { label: "چه نیستند", it: "non sono", values: ["وسطِ جاده نیستند و سواره‌رو را به خط تقسیم نمی‌کنند. علامتِ تقاطع، جاده‌ی بسته، ایستگاهِ اتوبوس، گذرگاهِ عابر، ممنوعیتِ توقف یا جای بستنِ دوچرخه هم نیستند."] },
      ],
      takeaway: "زرد در تونل = تونلِ یک‌طرفه. نوارهای زرد و سیاهِ بلند = لبه‌ی جاده زیرِ برف.",
      rule: "DPR 495/1992 art. 174",
    },
    {
      kind: "table",
      title: "مسیرنمای مانع",
      body: "این یکی برخلافِ بقیه داخلِ سواره‌رو است: سرِ یک جزیره‌ی ترافیکی یا جلوی مانعی وسطِ جاده. بالایش همان دایره‌ی آبیِ «عبورِ اجباری» فصل ۴ (درس ۵) است که می‌گوید از کدام طرفِ مانع بگذری؛ پایه‌اش نوارِ زردِ شبرنگ دارد. جزیره‌ی ترافیکی را در فصل ۱ (درس ۴) و خط‌کشیِ جلویش را در فصل ۶ (درس ۶) دیدی.",
      columns: ["یعنی"],
      rows: [
        { label: "یعنی", it: "delineatore speciale di ostacolo", sign: 299, values: ["مانعی جلوی توست، مثلاً ابتدای یک جزیره‌ی ترافیکی. داخلِ سواره‌رو نصب می‌شود."] },
        { label: "نور", it: "rifrangente", values: ["کاملاً شبرنگ است تا شب دیده شود؛ چراغِ خودش را ندارد."] },
        { label: "چه نیست", it: "non è", values: ["کنارِ جاده یا بیرونِ سواره‌رو نیست؛ مسیرِ دوچرخه را جدا نمی‌کند و خطِ اتوبوس یا تاکسی را خبر نمی‌دهد."] },
      ],
      takeaway: "مسیرنمای کناری در لبه است؛ مسیرنمای مانع داخلِ سواره‌رو.",
      rule: "DPR 495/1992 art. 177",
    },
    {
      kind: "classify",
      title: "دوطرفه یا یک‌طرفه؟",
      body: "از رنگِ شبرنگ بگو در چه جاده‌ای هستی.",
      options: [
        { it: "doppio senso", fa: "دوطرفه" },
        { it: "senso unico", fa: "یک‌طرفه" },
      ],
      items: [
        { prompt: "این دو تیرک", sign: 290, answer: 0, explain: "سمتِ راست قرمز، سمتِ چپ سفید: دوطرفه." },
        { prompt: "این دو تیرک", sign: 289, answer: 1, explain: "هر دو طرف زرد: یک‌طرفه." },
        { prompt: "این پنلِ کنارِ دیواره‌ی تونل", sign: 291, answer: 1, explain: "زرد در تونل یعنی تونلِ یک‌طرفه." },
        { prompt: "شب، سمتِ راستت فقط شبرنگ‌های قرمز می‌بینی", answer: 0, explain: "قرمز در راست مالِ جاده‌ی دوطرفه است." },
      ],
      takeaway: "زرد = یک‌طرفه. قرمز و سفید = دوطرفه.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il delineatore", fa: "مسیرنما: تیرک یا پنلی که لبه و شکلِ جاده را نشان می‌دهد" },
        { it: "il segnale complementare", fa: "علامتِ تکمیلی (کمکی، بی‌دستور)" },
        { it: "il margine della strada", fa: "لبه‌ی جاده" },
        { it: "visualizzare l'andamento della strada", base: "visualizzare", fa: "شکل و مسیرِ جاده را نمایان کردن" },
        { it: "rifrangente", fa: "شبرنگ؛ نور را برمی‌گرداند" },
        { it: "la luce propria", fa: "چراغِ خودی (برق دارد)" },
        { it: "la galleria", fa: "تونل" },
        { it: "soggetta ad innevamento", fa: "برف‌گیر" },
      ],
    },
    {
      kind: "trap",
      title: "لبه یا وسط؟",
      body: "یک جمله «وسطِ جاده» می‌گوید و غلط است، دیگری «داخلِ سواره‌رو» می‌گوید و درست است. فرق در نوعِ مسیرنماست:",
      examples: [
        {
          sourceId: "3608",
          sign: 289,
          textIt: "I delineatori raffigurati sono posti al centro della carreggiata",
          answer: 0,
          chunks: [
            { it: MANY, fa: MANY_FA },
            { it: "sono posti", fa: "نصب شده‌اند", verb: "sono posti ← porre" },
            { it: "al centro della carreggiata", fa: "وسطِ سواره‌رو", focus: "contrast" },
          ],
          translation: "مسیرنماهای تصویر وسطِ سواره‌رو نصب شده‌اند.",
          why: "غلط است. تیرک‌های زرد در دو لبه‌ی جاده‌ی یک‌طرفه‌اند.",
        },
        {
          sourceId: "3680",
          sign: 299,
          textIt: "Il delineatore raffigurato viene posto all'interno della carreggiata, in presenza di un ostacolo",
          answer: 1,
          chunks: [
            { it: ONE, fa: ONE_FA },
            { it: "viene posto all'interno della carreggiata,", fa: "داخلِ سواره‌رو نصب می‌شود", verb: "viene posto ← porre" },
            { it: "in presenza di un ostacolo", fa: "وقتی مانعی هست", focus: "condition" },
          ],
          translation: "مسیرنمای تصویر وقتی مانعی هست، داخلِ سواره‌رو نصب می‌شود.",
          why: "درست است. مسیرنمای مانع جلوی خودِ مانع است، داخلِ سواره‌رو.",
        },
      ],
      takeaway: "تیرکِ شبرنگ‌دار = لبه. دایره‌ی آبی روی پایه‌ی زرد = داخلِ سواره‌رو جلوی مانع.",
      rule: "DPR 495/1992 art. 173; art. 177",
    },
  ],
  practice: [
    {
      sourceId: "3614",
      sign: 290,
      textIt: "I delineatori raffigurati sono posti ai margini di una strada a doppio senso",
      answer: 1,
      chunks: [
        { it: MANY, fa: MANY_FA },
        { it: "sono posti ai margini", fa: "در لبه‌های … نصب شده‌اند", verb: "sono posti ← porre" },
        { it: "di una strada a doppio senso", fa: "یک جاده‌ی دوطرفه" },
      ],
      translation: "مسیرنماهای تصویر در لبه‌های یک جاده‌ی دوطرفه نصب شده‌اند.",
      why: "درست است (قدم ۱). قرمز در راست و سفید در چپ یعنی دوطرفه.",
      rule: "DPR 495/1992 art. 173",
      conceptStep: 1,
    },
    {
      sourceId: "3606",
      sign: 289,
      textIt: "I delineatori raffigurati sono posti su strada a doppio senso",
      answer: 0,
      chunks: [
        { it: MANY, fa: MANY_FA },
        { it: "sono posti", fa: "نصب شده‌اند", verb: "sono posti ← porre" },
        { it: "su strada a doppio senso", fa: "روی جاده‌ی دوطرفه", focus: "contrast" },
      ],
      translation: "مسیرنماهای تصویر روی جاده‌ی دوطرفه نصب شده‌اند.",
      why: "غلط است (قدم ۱). شبرنگِ زرد در هر دو طرف یعنی یک‌طرفه.",
      rule: "DPR 495/1992 art. 173",
      conceptStep: 1,
    },
    {
      sourceId: "3634",
      sign: 292,
      textIt: "Il delineatore raffigurato viene utilizzato per rendere meglio visibili i bordi della carreggiata di una strada innevata",
      answer: 1,
      chunks: [
        { it: ONE, fa: ONE_FA },
        { it: "viene utilizzato per rendere meglio visibili", fa: "به کار می‌رود تا بهتر دیده شوند", verb: "viene utilizzato ← utilizzare" },
        { it: "i bordi della carreggiata di una strada innevata", fa: "لبه‌های سواره‌روی یک جاده‌ی برف‌گرفته" },
      ],
      translation: "مسیرنمای تصویر به کار می‌رود تا لبه‌های سواره‌روی یک جاده‌ی برف‌گرفته بهتر دیده شوند.",
      why: "درست است (قدم ۲). تیرکِ بلندِ زرد و سیاه از برف بیرون می‌ماند و لبه را نشان می‌دهد.",
      rule: "DPR 495/1992 art. 174",
      conceptStep: 2,
    },
    {
      sourceId: "3682",
      sign: 299,
      textIt: "Il delineatore raffigurato può segnalare l'inizio di un'isola di traffico",
      answer: 1,
      chunks: [
        { it: ONE, fa: ONE_FA },
        { it: "può segnalare", fa: "می‌تواند خبر دهد", verb: "può ← potere" },
        { it: "l'inizio di un'isola di traffico", fa: "از ابتدای یک جزیره‌ی ترافیکی" },
      ],
      translation: "مسیرنمای تصویر می‌تواند از ابتدای یک جزیره‌ی ترافیکی خبر دهد.",
      why: "درست است (قدم ۳). سرِ جزیره‌ی ترافیکی همان مانعی است که این مسیرنما نشانش می‌دهد.",
      rule: "DPR 495/1992 art. 177",
      conceptStep: 3,
    },
    {
      sourceId: "3683",
      sign: 299,
      textIt: "Il delineatore raffigurato è dotato di luce propria",
      answer: 0,
      chunks: [
        { it: ONE, fa: ONE_FA },
        { it: "è dotato", fa: "مجهز است", verb: "è dotato ← dotare" },
        { it: "di luce propria", fa: "به چراغِ خودی", focus: "contrast" },
      ],
      translation: "مسیرنمای تصویر چراغِ خودی دارد.",
      why: "غلط است (قدم ۳). کاملاً شبرنگ است؛ نورِ چراغِ تو را برمی‌گرداند.",
      rule: "DPR 495/1992 art. 177",
      conceptStep: 3,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        "3602", "3603", "3604", "3605", "3606", "3607", "3608", "3609", "3610", "3611",
        "3612", "3613", "3614", "3615", "3616", "3617", "3618", "3619", "3620",
      ],
    },
    {
      step: 2,
      sourceIds: [
        "3621", "3622", "3623", "3624", "3625", "3626", "3627", "3628", "3629", "3630",
        "3631", "3632", "3633", "3634", "3635", "3636", "3637", "3638", "3639", "3640",
      ],
    },
    { step: 3, sourceIds: ["3679", "3680", "3681", "3682", "3683", "3684", "3685", "3686", "3687"] },
  ],
};

// ── Lesson 6 ──────────────────────────────────────────────────────────────────

const PANNELLO = "Il pannello raffigurato";
const PANNELLO_FA = "پنلِ تصویر";

export const lessonDelineatoriCurve: Lesson = {
  id: "delineatori-curve-tornanti",
  titleFa: "پیچ، سنجاقی و تقاطعِ T: نوک‌های سفید روی سیاه",
  titleIt: "CURVA STRETTA · DELINEATORE MODULARE · TORNANTE · INCROCIO A T",
  minutes: 5,
  signs: [293, 295, 144, 294],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس از جهتِ نوک‌های سفید می‌گویی پیچ به کدام طرف است، می‌دانی پنلِ «1° tornante» شماره‌ی سنجاقی است نه فاصله، و مسیرنمای تقاطعِ T را می‌شناسی: مستقیم نمی‌شود رفت.",
      why: "۴۰ سؤال. بانک جهتِ پیچ را برعکس می‌پرسد، شماره را «کیلومتر» می‌خواند و این پنل‌ها را به کارگاه، گذرگاهِ راه‌آهن یا ورودیِ تونل نسبت می‌دهد.",
    },
    {
      kind: "table",
      title: "نوک‌ها به سمتِ پیچ",
      body: "پنلِ سیاه با نوک‌های سفید، لبه‌ی بیرونیِ پیچ را نشان می‌دهد. نوک‌ها به سمتی اشاره می‌کنند که جاده می‌پیچد. معمولاً بعد از مثلثِ «پیچِ خطرناک» (فصل ۲ درس ۶) می‌آیند، روی خودِ پیچ، نه ۱۵۰ متر قبلش.",
      columns: ["یعنی"],
      rows: [
        { label: "پنلِ پیچِ تند", it: "delineatore di curva stretta", sign: 293, values: ["نوک‌ها به چپ: پیچِ تند و کم‌دید به چپ. معمولاً بعد از تابلوی CURVA PERICOLOSA A SINISTRA. همین پنل به رنگِ سفید و قرمز = پیچِ موقتِ کارگاه."] },
        { label: "مسیرنمای ماژولار", it: "delineatore modulare di curva", sign: 295, values: ["یک مربعِ تنها؛ چندتایش پشتِ سرِ هم در لبه‌ی پیچ می‌ایستند تا پیچ بهتر دیده شود. نوک به راست: پیچ به راست."] },
        { label: "چه نیستند", it: "non sono", values: ["کارگاه، سربالایی و سرپایینی، مانعِ بیرون‌زده، گذرگاهِ راه‌آهن یا ورودیِ تونل نیستند. فقط مالِ جاده‌های برون‌شهریِ اصلی یا یک‌طرفه هم نیستند."] },
      ],
      takeaway: "نوکِ سفید را دنبال کن: جاده همان طرف می‌پیچد.",
      rule: "DPR 495/1992 art. 174; art. 33 (curva provvisoria)",
    },
    {
      kind: "table",
      title: "پنلِ سنجاقی",
      body: "مربعِ سفید با عدد و کلمه‌ی tornante. سنجاقی (tornante) پیچی است با شعاعِ خیلی کم، معمولاً در کوهستان و چندتا پشتِ سرِ هم. در فصل ۲ (درس ۶) تابلوی مثلثیِ سریِ سنجاقی‌ها را دیدی؛ این پنل هر کدام را شماره می‌زند.",
      columns: ["یعنی"],
      rows: [
        { label: "یعنی", it: "1° tornante", sign: 144, values: ["نزدیکِ یک پیچِ تند هستی: اولین سنجاقیِ یک سری. عدد شماره‌ی ترتیبیِ همین پیچ است."] },
        { label: "کجا", it: "al centro della curva", values: ["لبه‌ی بیرونیِ جاده، وسطِ همان پیچ."] },
        { label: "عدد چه نیست", it: "non è", values: ["کیلومتر تا سنجاقیِ بعدی، کیلومتر برای برگشتن، تعدادِ تقاطع‌های ردشده یا شماره‌ی روگذر نیست. میدان هم نیست."] },
      ],
      takeaway: "عدد روی پنلِ tornante شماره است، نه فاصله.",
      rule: "DPR 495/1992 art. 86",
    },
    {
      kind: "table",
      title: "تقاطعِ T",
      body: "پنلِ سیاه با نوک‌هایی به هر دو طرف و یک لوزیِ سفید در وسط، روبه‌روی تو در انتهای جاده.",
      columns: ["یعنی"],
      rows: [
        { label: "یعنی", it: "delineatore di intersezione a T", sign: 294, values: ["جاده جلوتر تمام می‌شود و به جاده‌ی دیگری می‌خورد: یا راست یا چپ. مستقیم نمی‌شود رفت. نوک‌ها دو جهتِ ممکن را نشان می‌دهند."] },
        { label: "اجباری", it: "obbligatorio", values: ["قانون آن را در تقاطعِ T اجباری می‌داند، چون تنها چیزی است که از این نقطه‌ی غیرعادی خبر می‌دهد."] },
        { label: "چه نیست", it: "non è", values: ["گذرگاهِ راه‌آهن، پلِ متحرک، جاده‌ی بسته برای کار، اضافه شدنِ خط، پیچِ یک‌طرفه یا ورودیِ تونل نیست."] },
      ],
      takeaway: "نوک به هر دو طرف = تقاطعِ T: راست یا چپ.",
      rule: "DPR 495/1992 art. 174",
    },
    {
      kind: "classify",
      title: "جاده به کدام طرف می‌رود؟",
      body: "نوک‌ها را دنبال کن.",
      options: [
        { it: "a destra", fa: "به راست" },
        { it: "a sinistra", fa: "به چپ" },
        { it: "a destra o a sinistra", fa: "راست یا چپ (T)" },
      ],
      items: [
        { prompt: "این پنل", sign: 293, answer: 1, explain: "همه‌ی نوک‌ها به چپ‌اند: پیچ به چپ." },
        { prompt: "این مربع", sign: 295, answer: 0, explain: "نوک به راست است: پیچ به راست." },
        { prompt: "این پنل", sign: 294, answer: 2, explain: "نوک‌ها به دو طرف‌اند: تقاطعِ T." },
        { prompt: "سه مربعِ ماژولار پشتِ سرِ هم، نوک‌ها به چپ", answer: 1, explain: "چند مربع کنارِ هم فقط پیچ را پررنگ‌تر می‌کنند؛ نوک به چپ یعنی پیچ به چپ." },
      ],
      takeaway: "یک طرف = پیچ به همان طرف. دو طرف = تقاطعِ T.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la curva stretta", fa: "پیچِ تند" },
        { it: "il tornante", fa: "سنجاقی؛ پیچِ خیلی تندِ کوهستانی" },
        { it: "il numero progressivo", fa: "شماره‌ی ترتیبی" },
        { it: "la punta di freccia", fa: "نوکِ فلش" },
        { it: "il delineatore modulare", fa: "مسیرنمای ماژولار (مربعی، چندتایی)" },
        { it: "provvisoria", fa: "موقت" },
        { it: "l'incrocio a forma di T", fa: "تقاطعِ T شکل" },
        { it: "proseguire diritto", base: "proseguire", fa: "مستقیم ادامه دادن" },
      ],
    },
    {
      kind: "trap",
      title: "عدد = شماره",
      body: "دو جمله درباره‌ی همان پنل. یکی عدد را شماره می‌خواند، دیگری فاصله:",
      examples: [
        {
          sourceId: "3510",
          sign: 144,
          textIt: "Il pannello raffigurato, in una serie di tornanti, ne indica il numero progressivo",
          answer: 1,
          chunks: [
            { it: "Il pannello raffigurato,", fa: PANNELLO_FA },
            { it: "in una serie di tornanti,", fa: "در یک سری سنجاقی", focus: "condition" },
            { it: "ne indica il numero progressivo", fa: "شماره‌ی ترتیبیِ آن را نشان می‌دهد", verb: "indica ← indicare" },
          ],
          translation: "پنلِ تصویر در یک سری سنجاقی، شماره‌ی ترتیبیِ آن را نشان می‌دهد.",
          why: "درست است. «1°» یعنی «اولین».",
        },
        {
          sourceId: "3515",
          sign: 144,
          textIt: "Il pannello raffigurato indica a quanti chilometri di distanza si trova il prossimo tornante",
          answer: 0,
          chunks: [
            { it: PANNELLO, fa: PANNELLO_FA },
            { it: "indica a quanti chilometri di distanza", fa: "نشان می‌دهد در چند کیلومتری", verb: "indica ← indicare", focus: "contrast" },
            { it: "si trova il prossimo tornante", fa: "سنجاقیِ بعدی قرار دارد", verb: "si trova ← trovarsi" },
          ],
          translation: "پنلِ تصویر نشان می‌دهد سنجاقیِ بعدی در چند کیلومتری است.",
          why: "غلط است. عدد شماره‌ی همین پیچ است، نه فاصله.",
        },
      ],
      takeaway: "علامتِ «°» کنارِ عدد یعنی «ـمین»: ترتیب، نه کیلومتر.",
      rule: "DPR 495/1992 art. 86",
    },
  ],
  practice: [
    {
      sourceId: "3643",
      sign: 293,
      textIt: "Il delineatore raffigurato, se di colore bianco e rosso, indica una curva provvisoria a sinistra",
      answer: 1,
      chunks: [
        { it: "Il delineatore raffigurato,", fa: ONE_FA },
        { it: "se di colore bianco e rosso,", fa: "اگر سفید و قرمز باشد", focus: "condition" },
        { it: "indica una curva provvisoria a sinistra", fa: "یک پیچِ موقت به چپ را نشان می‌دهد", verb: "indica ← indicare" },
      ],
      translation: "مسیرنمای تصویر اگر سفید و قرمز باشد، یک پیچِ موقت به چپ را نشان می‌دهد.",
      why: "درست است (قدم ۱). قرمز به‌جای سیاه یعنی پیچِ موقتِ کارگاه؛ نوک‌ها هنوز به چپ‌اند.",
      rule: "DPR 495/1992 art. 33",
      conceptStep: 1,
    },
    {
      sourceId: "3649",
      sign: 293,
      textIt: "Il delineatore raffigurato segnala una curva pericolosa a destra",
      answer: 0,
      chunks: [
        { it: ONE, fa: ONE_FA },
        { it: "segnala una curva pericolosa", fa: "یک پیچِ خطرناک را خبر می‌دهد", verb: "segnala ← segnalare" },
        { it: "a destra", fa: "به راست", focus: "contrast" },
      ],
      translation: "مسیرنمای تصویر یک پیچِ خطرناک به راست را خبر می‌دهد.",
      why: "غلط است (قدم ۱). نوک‌ها به چپ‌اند: پیچ به چپ است.",
      rule: "DPR 495/1992 art. 174",
      conceptStep: 1,
    },
    {
      sourceId: "3665",
      sign: 295,
      textIt: "Il delineatore raffigurato indica una curva pericolosa a destra",
      answer: 1,
      chunks: [
        { it: ONE, fa: ONE_FA },
        { it: "indica una curva pericolosa", fa: "یک پیچِ خطرناک را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "a destra", fa: "به راست" },
      ],
      translation: "مسیرنمای تصویر یک پیچِ خطرناک به راست را نشان می‌دهد.",
      why: "درست است (قدم ۱). نوکِ این مربع به راست است.",
      rule: "DPR 495/1992 art. 174",
      conceptStep: 1,
    },
    {
      sourceId: "3512",
      sign: 144,
      textIt: "Il pannello raffigurato indica che fra un chilometro troveremo un tornante",
      answer: 0,
      chunks: [
        { it: PANNELLO, fa: PANNELLO_FA },
        { it: "indica che fra un chilometro", fa: "نشان می‌دهد که یک کیلومتر دیگر", verb: "indica ← indicare", focus: "contrast" },
        { it: "troveremo un tornante", fa: "به یک سنجاقی می‌رسیم", verb: "troveremo ← trovare" },
      ],
      translation: "پنلِ تصویر نشان می‌دهد که یک کیلومتر دیگر به یک سنجاقی می‌رسیم.",
      why: "غلط است (قدم ۲). پنل وسطِ خودِ پیچ است و «1°» شماره است، نه یک کیلومتر.",
      rule: "DPR 495/1992 art. 86",
      conceptStep: 2,
    },
    {
      sourceId: "3655",
      sign: 294,
      textIt: "Il delineatore raffigurato è posto in un incrocio dove non è possibile proseguire diritto",
      answer: 1,
      chunks: [
        { it: ONE, fa: ONE_FA },
        { it: "è posto in un incrocio", fa: "در تقاطعی نصب شده", verb: "è posto ← porre" },
        { it: "dove non è possibile proseguire diritto", fa: "که در آن نمی‌شود مستقیم رفت", focus: "negation" },
      ],
      translation: "مسیرنمای تصویر در تقاطعی نصب شده که در آن نمی‌شود مستقیم رفت.",
      why: "درست است (قدم ۳). تقاطعِ T: فقط راست یا چپ.",
      rule: "DPR 495/1992 art. 174",
      conceptStep: 3,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        "3641", "3642", "3643", "3644", "3645", "3646", "3647", "3648", "3649", "3650", "3651",
        "3662", "3663", "3664", "3665", "3666", "3667", "3668", "3669", "3670",
      ],
    },
    { step: 2, sourceIds: ["3507", "3508", "3509", "3510", "3511", "3512", "3513", "3514", "3515", "3516"] },
    { step: 3, sourceIds: ["3652", "3653", "3654", "3655", "3656", "3657", "3658", "3659", "3660", "3661"] },
  ],
};
