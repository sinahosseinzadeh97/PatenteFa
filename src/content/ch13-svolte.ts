/**
 * src/content/ch13-svolte.ts
 * Chapter 13 (Norme di circolazione), lessons 5 and 6.
 *
 *  L5 `norme-svolte`   turning: right (right margin, its lane, signal early, slow down,
 *                      pedestrians even on green; a lorry with trailer turning right
 *                      may slow and swing left) and left (towards the centre line on
 *                      two-way roads, left margin on one-way roads, leave the junction
 *                      centre on your right — figs 601 vs 599 — go round it only with
 *                      ROTATORIA, fig 602; fig 572). Who goes first is chapter 14, lesson 3.
 *  L6 `norme-incrocio` approaching a junction (precedence, lane and signal in time,
 *                      enter only if you can clear it, prudence when unsure) and what is
 *                      really forbidden at or near it against the bank's invented bans.
 *
 * Legal basis: CdS art. 140; art. 141; art. 144 c.3; art. 145 c.1–2, c.7;
 * art. 153; art. 154 c.1–3, c.5; art. 156 c.2–3; art. 191 c.1.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter13.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_154 = "Codice della Strada, art. 154";
const CDS_145 = "Codice della Strada, art. 145";
const AUTOTRENO = "Se un autotreno intende svoltare a destra in una strada stretta,";
const AUTOTRENO_FA = "اگر یک کامیون با یدک بخواهد در یک خیابانِ باریک به راست بپیچد،";
const DOPPIO = "In una carreggiata a doppio senso di circolazione per svoltare a sinistra";
const DOPPIO_FA = "در سواره‌روی دوطرفه، برای پیچیدن به چپ";
const VICINANZA = "In vicinanza o in corrispondenza degli incroci";
const VICINANZA_FA = "نزدیکِ تقاطع‌ها یا درست در آن‌ها";
const GIUNGENDO = "Giungendo ad un incrocio,";
const GIUNGENDO_FA = "وقتی به تقاطع می‌رسی،";

// ── Lesson 5 ──────────────────────────────────────────────────────────────────

export const lessonSvolte: Lesson = {
  id: "norme-svolte",
  titleFa: "پیچیدن به راست و به چپ",
  titleIt: "SVOLTA A DESTRA · SVOLTA A SINISTRA",
  minutes: 5,
  signs: [],
  figures: [601, 599, 602, 572],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی برای پیچیدن کجای سواره‌رو و در کدام خطِ عبور باشی، کِی راهنما بزنی و سرعت را کم کنی، و در خودِ تقاطع از کدام طرفِ مرکز بگذری. این‌که چه کسی اول رد می‌شود موضوعِ فصل ۱۴، درسِ ۳ است.",
      why:
        "۳۶ سؤال. بانک جای‌ها را جابه‌جا می‌کند («برای پیچیدن به چپ کنارِ لبه‌ی راست بمان»، «برای پیچیدن به راست برو خطِ چپ») و چیزهایی اضافه می‌کند که لازم نیست: بوق، تند رفتن، ایستادنِ اجباری، دور زدنِ مرکزِ تقاطع بدونِ تابلو.",
      rule: `${CDS_154} c.1–3; Codice della Strada, art. 191 c.1`,
    },
    {
      kind: "table",
      title: "پیچیدن به راست",
      body:
        "قاعده ساده است: هر چه به جهتِ پیچ نزدیک‌تر، مسیرت کوتاه‌تر و برای دیگران روشن‌تر. برای راست یعنی نزدیکِ لبه‌ی راستِ سواره‌رو، در خطی که پیچ به راست را اجازه می‌دهد. پیش از آن راهنما، و هر چه نزدیک‌تر، آهسته‌تر.",
      columns: ["چه کنی", "دامِ بانک"],
      rows: [
        {
          label: "جا",
          it: "il più vicino possibile al margine destro",
          values: ["تا جای ممکن نزدیکِ لبه‌ی راستِ سواره‌رو، در خطی که به راست می‌رود", "«نزدیکِ لبه‌ی چپ» و «در خطِ عبورِ چپ» غلط‌اند"],
        },
        {
          label: "علامت",
          it: "segnalare in anticipo",
          values: ["چراغ راهنما، زودتر از پیچ؛ برای هر تغییرِ جهت همین", "«برای تغییرِ جهت بوق لازم است» غلط است؛ بوق جای راهنما نیست"],
        },
        {
          label: "سرعت",
          it: "moderando la velocità",
          values: ["هر چه به پیچ نزدیک‌تر، آهسته‌تر؛ بی‌خطر و بی‌مزاحمت برای دیگران", "—"],
        },
        {
          label: "عابر",
          it: "dare la precedenza ai pedoni",
          values: ["به عابری که از خیابانِ مقصد رد می‌شود راه بده، حتی وقتی چراغِ تو سبز است", "«با چراغ سبز هیچ‌وقت لازم نیست به عابر راه بدهی» غلط است"],
        },
        {
          label: "مرکزِ تقاطع",
          it: "colonnina luminosa al centro",
          values: ["برای راست هیچ‌وقت مرکزِ تقاطع یا ستونِ چراغ‌دارِ وسط را دور نمی‌زنی", "دور زدنِ ستونِ وسط برای پیچِ راست غلط است"],
        },
        {
          label: "کامیون با یدکِ جلوی تو به راست می‌پیچد",
          it: "autotreno · si allarghi",
          values: [
            "حساب کن که خیلی آهسته شود و برای پیچیدن اول کمی به چپ بکشد؛ نزدیکش نشو (شاید دنده‌عقب بخواهد)؛ از آن سبقت نگیر",
            "«فوراً از چپ سبقت بگیر»، «همین که راهنما زد سبقت بگیر» و «چراغِ خطرت را روشن کن» غلط‌اند؛ کامیون جلوی دیدت به تابلوها و خودروهای کناری را هم می‌گیرد",
          ],
        },
      ],
      takeaway: "راست = لبه‌ی راست، خطِ راست، راهنما، آهسته، و راه دادن به عابر. پشتِ کامیونی که به راست می‌پیچد صبر کن.",
      rule: `${CDS_154} c.1–3 lett. a; Codice della Strada, art. 191 c.1`,
    },
    {
      kind: "table",
      title: "پیچیدن به چپ",
      body:
        "برای چپ هم همان قاعده: به سمتِ پیچ نزدیک شو. در جاده‌ی دوطرفه یعنی کنارِ خطِ وسط (نه آن طرفش)، در جاده‌ی یک‌طرفه یعنی کنارِ لبه‌ی چپ. در خودِ تقاطع از قسمتِ چپِ آن می‌پیچی و مرکزِ تقاطع سمتِ راستت می‌ماند (شکلِ ۶۰۱)، نه این‌که دورش بزنی (شکلِ ۵۹۹). دور زدنِ مرکز فقط وقتی درست است که تابلوی آبیِ میدان باشد (شکلِ ۶۰۲). چه کسی اول رد شود: فصل ۱۴، درسِ ۳.",
      columns: ["چه کنی", "دامِ بانک"],
      rows: [
        {
          label: "جاده‌ی دوطرفه",
          it: "avvicinarsi al centro della carreggiata",
          values: ["به خطِ وسط نزدیک شو، ولی در نیمه‌ی خودت بمان", "«کنارِ لبه‌ی راست بمان» غلط است؛ «برو آن طرفِ خطِ ممتدِ وسط» هم غلط است"],
        },
        {
          label: "جاده‌ی یک‌طرفه",
          it: "tenersi sul margine sinistro",
          values: ["کنارِ لبه‌ی چپِ سواره‌رو برو و از قبل راهنما بزن", "—"],
        },
        {
          label: "خطِ عبور",
          it: "corsie che consentono di proseguire in tale direzione",
          values: [
            "در خطی بمان که اجازه‌ی رفتن به چپ را دارد؛ معمولاً چپ‌ترین خط",
            "شکلِ ۵۷۲: خودرو در خطِ وسطِ نیم‌سواره‌روی سه‌خطه است و خط‌ها ممتدند. «برای چپ باید خطِ وسط را گرفت» غلط است؛ «این خودرو می‌تواند به راست بپیچد» هم غلط است",
          ],
        },
        {
          label: "در تقاطع",
          it: "lasciare il centro dell'incrocio alla nostra destra",
          values: ["از قسمتِ چپِ تقاطع بپیچ؛ مرکز سمتِ راستت بماند (شکلِ ۶۰۱)", "«مرکز را دور بزن» (شکلِ ۵۹۹) و «از سمتِ راستِ تقاطع بپیچ» غلط‌اند، مگر با تابلوی میدان (شکلِ ۶۰۲)"],
        },
        {
          label: "خیابانِ مقصد",
          it: "non prendere contromano la strada",
          values: ["در نیمه‌ی راستِ خیابانی که به آن می‌پیچی وارد شو، نه خلافِ جهت", "—"],
        },
        {
          label: "رفتار",
          it: "velocemente · clacson · arrestarsi",
          values: ["آرام و بدونِ مزاحمت؛ فقط اگر کسی می‌آید که باید به او راه بدهی می‌ایستی", "«سریع بپیچ تا از خودروها فرار کنی»، «بوق بزن» و «همیشه پیش از پایانِ پیچ بایست» غلط‌اند"],
        },
      ],
      takeaway: "چپ در دوطرفه = کنارِ خطِ وسط؛ در یک‌طرفه = کنارِ لبه‌ی چپ. مرکزِ تقاطع سمتِ راستت می‌ماند، مگر تابلوی میدان باشد.",
      rule: `${CDS_154} c.1–3 lett. b; Codice della Strada, art. 144 c.3`,
    },
    {
      kind: "classify",
      title: "پیش از پیچ، کجای سواره‌رو؟",
      body: "برای هر موقعیت بگو پیش از پیچیدن کجای سواره‌رو باشی. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "vicino al margine destro", fa: "نزدیکِ لبه‌ی راست" },
        { it: "vicino al centro della carreggiata", fa: "نزدیکِ خطِ وسط" },
        { it: "vicino al margine sinistro", fa: "نزدیکِ لبه‌ی چپ" },
      ],
      items: [
        { prompt: "پیچیدن به راست در خیابانِ دوطرفه", answer: 0, explain: "راست همیشه از کنارِ لبه‌ی راست." },
        { prompt: "پیچیدن به چپ در جاده‌ی دوطرفه با یک خط عبور در هر جهت", answer: 1, explain: "به خطِ وسط نزدیک شو و در نیمه‌ی خودت بمان." },
        { prompt: "پیچیدن به چپ در خیابانِ یک‌طرفه", answer: 2, explain: "در یک‌طرفه کسی از روبه‌رو نمی‌آید؛ تا لبه‌ی چپ می‌روی." },
        { prompt: "پیچیدن به راست در خیابانِ یک‌طرفه", answer: 0, explain: "باز هم لبه‌ی راست." },
        {
          prompt: "پیچیدن به چپ در جاده‌ی دوطرفه‌ای که خطِ وسطش ممتد است",
          answer: 1,
          explain: "نزدیکِ خطِ وسط، ولی از خطِ ممتد رد نمی‌شوی تا پیش از آن بروی؛ فقط در خودِ تقاطع می‌پیچی.",
        },
      ],
      takeaway: "راست ← لبه‌ی راست. چپ ← دوطرفه: خطِ وسط؛ یک‌طرفه: لبه‌ی چپ.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "svoltare a destra / a sinistra", fa: "به راست / به چپ پیچیدن", base: "svoltare" },
        { it: "il margine destro della carreggiata", fa: "لبه‌ی راستِ سواره‌رو" },
        { it: "il centro dell'incrocio", fa: "مرکزِ تقاطع" },
        { it: "la colonnina luminosa", fa: "ستونِ چراغ‌دارِ وسطِ تقاطع" },
        { it: "contromano", fa: "خلافِ جهت" },
        { it: "la linea di mezzeria", fa: "خطِ وسط" },
        { it: "la semicarreggiata", fa: "نیم‌سواره‌رو؛ نیمه‌ای از سواره‌رو که مالِ جهتِ توست" },
        { it: "l'autotreno", fa: "کامیون با یدک" },
        { it: "allargarsi", fa: "برای پیچیدن، اول به سمتِ دیگر کشیدن", base: "allargarsi", note: "در بانک: «si sposti a sinistra (si allarghi)»." },
      ],
    },
    {
      kind: "trap",
      title: "لبه‌ی راست: برای کدام پیچ؟",
      body: "«margine destro» در هر دو جمله هست؛ فرق فقط در جهتِ پیچ است:",
      examples: [
        {
          sourceId: "4459",
          textIt: "Per effettuare la svolta a destra occorre tenersi il più vicino possibile al margine destro della carreggiata",
          answer: 1,
          chunks: [
            { it: "Per effettuare la svolta a destra", fa: "برای پیچیدن به راست" },
            { it: "occorre tenersi", fa: "باید بمانی", verb: "occorre ← occorrere; tenersi ← tenere" },
            { it: "il più vicino possibile al margine destro della carreggiata", fa: "تا جای ممکن نزدیکِ لبه‌ی راستِ سواره‌رو" },
          ],
          translation: "برای پیچیدن به راست باید تا جای ممکن نزدیکِ لبه‌ی راستِ سواره‌رو بمانی.",
          why: "درست است. پیچِ راست از کنارِ لبه‌ی راست.",
        },
        {
          sourceId: "4512",
          textIt: "I veicoli che vogliono effettuare una svolta a sinistra devono tenersi il più possibile vicino al margine destro della carreggiata",
          answer: 0,
          chunks: [
            { it: "I veicoli che vogliono effettuare una svolta a sinistra", fa: "وسیله‌هایی که می‌خواهند به چپ بپیچند", verb: "vogliono ← volere", focus: "condition" },
            { it: "devono tenersi", fa: "باید بمانند", verb: "devono ← dovere" },
            { it: "il più possibile vicino al margine destro della carreggiata", fa: "تا جای ممکن نزدیکِ لبه‌ی راستِ سواره‌رو", focus: "contrast" },
          ],
          translation: "وسیله‌هایی که می‌خواهند به چپ بپیچند باید تا جای ممکن نزدیکِ لبه‌ی راستِ سواره‌رو بمانند.",
          why: "غلط است. برای چپ به سمتِ چپ نزدیک می‌شوی: در دوطرفه به خطِ وسط، در یک‌طرفه به لبه‌ی چپ.",
        },
      ],
      takeaway: "اول ببین جمله درباره‌ی کدام پیچ است. لبه‌ی راست فقط برای راست درست است.",
      rule: `${CDS_154} c.3 lett. a–b`,
    },
  ],
  practice: [
    {
      sourceId: "4466",
      textIt: "La svolta a destra si effettua senza mai dare la precedenza ai pedoni, se il semaforo ha la luce verde accesa",
      answer: 0,
      chunks: [
        { it: "La svolta a destra si effettua", fa: "پیچیدن به راست انجام می‌شود", verb: "si effettua ← effettuare" },
        { it: "senza mai dare la precedenza ai pedoni,", fa: "بدونِ این‌که هیچ‌وقت به عابرها راه بدهی،", focus: "always" },
        { it: "se il semaforo ha la luce verde accesa", fa: "اگر چراغ سبز روشن باشد", focus: "condition" },
      ],
      translation: "اگر چراغ سبز روشن باشد، پیچیدن به راست بدونِ این‌که هیچ‌وقت به عابرها راه بدهی انجام می‌شود.",
      why: "غلط است (قدم ۱). چراغِ سبزِ تو معمولاً هم‌زمان با سبزِ عابرهای خیابانِ مقصد است. وقتی برای آن‌ها ممنوع نیست، به آن‌ها راه می‌دهی.",
      rule: "Codice della Strada, art. 191 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "4602",
      textIt:
        "Se un autotreno intende svoltare a destra in una strada stretta, non bisogna stargli troppo vicino, per non essere d'intralcio, in caso sia necessaria la manovra di retromarcia",
      answer: 1,
      chunks: [
        { it: AUTOTRENO, fa: AUTOTRENO_FA, verb: "intende ← intendere" },
        { it: "non bisogna stargli troppo vicino,", fa: "نباید خیلی نزدیکش بمانی،", focus: "negation" },
        { it: "per non essere d'intralcio,", fa: "تا مزاحم نباشی،", focus: "reason" },
        { it: "in caso sia necessaria la manovra di retromarcia", fa: "اگر لازم شود دنده‌عقب برود", focus: "condition", verb: "sia ← essere" },
      ],
      translation: "اگر یک کامیون با یدک بخواهد در یک خیابانِ باریک به راست بپیچد، نباید خیلی نزدیکش بمانی تا اگر لازم شد دنده‌عقب برود، مزاحمش نباشی.",
      why: "درست است (قدم ۱). وسیله‌ی بلند در خیابانِ باریک گاهی با یک حرکت نمی‌پیچد و باید کمی عقب بیاید؛ فاصله بگیر.",
      rule: "Codice della Strada, art. 140",
      conceptStep: 1,
    },
    {
      sourceId: "4484",
      textIt:
        "In una carreggiata a doppio senso di circolazione per svoltare a sinistra occorre, di norma, occupare l'area sinistra dell'incrocio, come i veicoli in figura, salvo diversa segnalazione",
      answer: 1,
      figure: 601,
      chunks: [
        { it: DOPPIO, fa: DOPPIO_FA },
        { it: "occorre, di norma,", fa: "معمولاً لازم است" },
        { it: "occupare l'area sinistra dell'incrocio,", fa: "از قسمتِ چپِ تقاطع بگذری،" },
        { it: "come i veicoli in figura,", fa: "مثلِ وسیله‌های تصویر،" },
        { it: "salvo diversa segnalazione", fa: "مگر این‌که تابلو یا خط‌کشی چیز دیگری بگوید", focus: "condition" },
      ],
      translation: "در سواره‌روی دوطرفه، برای پیچیدن به چپ معمولاً لازم است از قسمتِ چپِ تقاطع بگذری، مثلِ وسیله‌های تصویر، مگر این‌که علامتِ دیگری باشد.",
      why: "درست است (قدم ۲). در شکلِ ۶۰۱ هر دو خودرو پیش از مرکز می‌پیچند و مرکزِ تقاطع سمتِ راستشان می‌ماند.",
      rule: `${CDS_154} c.3 lett. b`,
      conceptStep: 2,
    },
    {
      sourceId: "4536",
      textIt: "Viaggiando su semicarreggiata a tre corsie, come in figura, per svoltare a sinistra si deve utilizzare la corsia centrale",
      answer: 0,
      figure: 572,
      chunks: [
        { it: "Viaggiando su semicarreggiata a tre corsie,", fa: "وقتی در نیم‌سواره‌رویی با سه خط عبور می‌رانی،", verb: "viaggiando ← viaggiare" },
        { it: "come in figura,", fa: "مثلِ تصویر،" },
        { it: "per svoltare a sinistra", fa: "برای پیچیدن به چپ" },
        { it: "si deve utilizzare la corsia centrale", fa: "باید از خطِ عبورِ وسط استفاده کرد", verb: "si deve ← dovere", focus: "contrast" },
      ],
      translation: "وقتی در نیم‌سواره‌رویی با سه خط عبور می‌رانی، مثلِ تصویر، برای پیچیدن به چپ باید از خطِ عبورِ وسط استفاده کرد.",
      why: "غلط است (قدم ۲). برای چپ به سمتِ چپ می‌روی: چپ‌ترین خط، یا خطی که فلشِ چپ دارد؛ نه خطِ وسط.",
      rule: "Codice della Strada, art. 144 c.3; art. 154 c.3 lett. b",
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // right turns, signalling any change of direction, and the lorry with trailer turning right
      sourceIds: [
        "4459", "4460", "4461", "4462", "4463", "4464", "4465", "4466", "4467",
        "4364", "4529", "4535",
        "4600", "4601", "4602", "4603", "4604", "4605", "4606",
      ],
    },
    {
      step: 2,
      // left turns: position, lane and path through the junction (figs 601, 599, 602, 572); order of passage is chapter 14
      sourceIds: [
        "4484", "4485", "4488", "4489", "4491", "4505", "4512",
        "4531", "4533", "4534", "4536", "4537", "4539", "4540", "4541", "4542", "4543",
      ],
    },
  ],
};

// ── Lesson 6 ──────────────────────────────────────────────────────────────────

export const lessonIncrocio: Lesson = {
  id: "norme-incrocio",
  titleFa: "نزدیکِ تقاطع و درونِ آن",
  titleIt: "IN PROSSIMITÀ DEGLI INCROCI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی وقتی به تقاطع نزدیک می‌شوی چه آمادگی‌هایی لازم است، کِی اجازه داری واردش شوی، و کدام ممنوعیت‌های نزدیکِ تقاطع واقعی‌اند و کدام را بانک ساخته است.",
      why:
        "۲۲ سؤال. نیمی از آن‌ها با «non è consentito» (مجاز نیست) شروع می‌شوند: بعضی ممنوعیتِ واقعی‌اند (زیگزاگ، تغییرِ ناگهانیِ جهت، پارک و توقفِ کوتاه در تقاطعِ برون‌شهری) و بعضی ساختگی (نورِ پایین، ۶۰ کیلومتر، بوق). تشخیصشان کارِ اصلیِ این درس است.",
      rule: `${CDS_145} c.1–2, c.7; ${CDS_154} c.1, c.5`,
    },
    {
      kind: "table",
      title: "نزدیک شدن به تقاطع",
      body:
        "ماده‌ی ۱۴۵ با یک جمله شروع می‌کند: نزدیکِ تقاطع «بیشترین احتیاط» را به کار ببر. بقیه‌ی کارها از همین می‌آیند: زودتر آماده شو تا در خودِ تقاطع کارِ غافل‌گیرکننده‌ای نکنی.",
      columns: ["چه کنی", "چرا / دامِ بانک"],
      rows: [
        {
          label: "آماده‌ی حق تقدم",
          it: "predisporsi ad osservare le norme di precedenza",
          values: ["سرعت را کم کن و ببین به چه کسی باید راه بدهی", "قاعده‌ها در فصل‌های ۵ و ۱۴؛ «همیشه پیش از خودروهای سمتِ راست رد شو» غلط است"],
        },
        {
          label: "خط و راهنما به‌موقع",
          it: "segnalare per tempo l'intenzione di svoltare",
          values: ["خطِ عبورِ جهتت را زود بگیر و پیش از تقاطع راهنما بزن", "«برای پیچیدن به راست، نزدیکِ تقاطع از چپ سریع سبقت بگیر» غلط است"],
        },
        {
          label: "با دوچرخه یا موتور",
          it: "incolonnarsi dietro gli altri veicoli",
          values: ["پشتِ صفِ خودروهای منتظر بایست", "از لای خودروها تا جلوی صف نرو؛ بانک این را جدا می‌پرسد"],
        },
        {
          label: "ورود به تقاطع",
          it: "impegnarlo solo se si ha la possibilità di proseguire e liberarlo",
          values: ["فقط وقتی وارد شو که بتوانی ادامه بدهی و تقاطع را خالی کنی", "اگر آن طرف صف است، حتی با چراغ سبز پشتِ خط بمان تا تقاطع را بند نیاوری"],
        },
        {
          label: "نمی‌دانی حق تقدم با کیست",
          it: "procedere con prudenza e accortezza",
          values: ["آهسته و با دقت جلو برو", "«اگر مستقیم می‌روی، بدونِ کم کردنِ سرعت ادامه بده» غلط است"],
        },
        {
          label: "دو خودرو هم‌زمان می‌رسند",
          it: "giungono contemporaneamente",
          values: ["هر دو سرعت را کم می‌کنند؛ معمولاً آن که از چپ می‌آید راه می‌دهد (فصل ۱۴، درسِ ۱)", "حق تقدم داشتن یعنی بی‌احتیاطی نکنی"],
        },
        {
          label: "کسی بی‌حق رد می‌شود",
          it: "prudenti e tolleranti",
          values: ["با احتیاط و تحمل؛ اصرار نکن", "تصادف با کسی که حق نداشت هم تصادف است"],
        },
        {
          label: "بوق",
          it: "suonare il clacson",
          values: ["در آبادی بوق فقط برای خطرِ واقعی و فوری", "«نزدیکِ تقاطعِ شهری باید بوق زد» غلط است"],
        },
      ],
      takeaway: "پیش از تقاطع: آهسته، خطِ درست، راهنما. فقط وقتی وارد شو که بتوانی خارج شوی. مطمئن نیستی؟ آهسته‌تر.",
      rule: `${CDS_145} c.1–2, c.7; ${CDS_154} c.1 lett. b; Codice della Strada, art. 156 c.3`,
    },
    {
      kind: "table",
      title: "ممنوعِ واقعی، ممنوعِ ساختگی",
      body:
        "«non è consentito» در جمله‌های این گروه همیشه دام نیست. سؤال را این‌طور بسنج: آیا این کار در تقاطع کسی را غافل‌گیر می‌کند یا راه را بند می‌آورد؟ اگر بله، ممنوع است. اگر نه (روشن بودنِ نورِ پایین، بوق برای جلوگیری از تصادف بیرونِ آبادی)، بانک ممنوعیت ساخته است.",
      columns: ["حکم", "چرا"],
      rows: [
        {
          label: "زیگزاگ رفتن، حتی وقتی خط‌های میان خط‌چین‌اند",
          it: "procedere a zig zag",
          values: ["ممنوع", "خط‌چین اجازه‌ی یک بار عوض کردنِ خط با بررسی است، نه رفت‌وآمد میانِ خط‌ها"],
        },
        {
          label: "تغییرِ ناگهانیِ جهت",
          it: "cambiare improvvisamente la direzione di marcia",
          values: ["ممنوع", "هر مانوری باید از قبل علامت داده شود و ناگهانی نباشد"],
        },
        {
          label: "پارک و توقفِ کوتاه در تقاطعِ برون‌شهری",
          it: "sosta · fermata",
          values: ["ممنوع", "خودروی ایستاده دیدِ بقیه را می‌گیرد؛ قاعده‌های پارک در فصل ۱۶"],
        },
        {
          label: "روشن کردنِ نورِ پایین",
          it: "fari anabbaglianti",
          values: ["مجاز", "نورِ پایین کسی را خیره نمی‌کند؛ هیچ ممنوعیتی ندارد"],
        },
        {
          label: "بیش از ۶۰ کیلومتر در تقاطعِ برون‌شهری",
          it: "60 km/h",
          values: ["عددِ ساختگی", "قانون برای تقاطع عدد نمی‌گذارد؛ سرعتِ مناسب (فصل ۱۱، درسِ ۱)"],
        },
        {
          label: "راهنما نزدن برای پیچِ راست در تقاطعِ شهری",
          it: "non azionare l'indicatore",
          values: ["مجاز نیست", "راهنما برای هر پیچ لازم است، در شهر هم"],
        },
        {
          label: "سبقت در تقاطعِ چراغ‌دار",
          it: "incroci regolati da semaforo",
          values: ["به‌طورِ کلی ممنوع نیست", "سبقت نزدیکِ تقاطع قاعده‌ی خودش را دارد (فصل ۱۵)؛ «همیشه ممنوع» غلط است"],
        },
        {
          label: "آهسته نکردن با چراغ زرد چشمک‌زن",
          it: "luce gialla lampeggiante",
          values: ["غلط", "زردِ چشمک‌زن یعنی «با احتیاط»؛ آهسته کن (فصل ۷)"],
        },
        {
          label: "بوق در تقاطعِ برون‌شهری",
          it: "dispositivi di segnalazione acustica",
          values: ["ممنوع نیست", "بیرونِ آبادی بوق برای جلوگیری از تصادف مجاز است، کوتاه"],
        },
        {
          label: "ایستادن روی خط‌کشی عابر پیاده وقتی چراغِ عابر قرمز است",
          it: "arrestarsi sulle strisce pedonali",
          values: ["مجاز نیست", "پیش از خطِ ایست می‌ایستی؛ خط‌کشی عابر پیاده را خالی می‌گذاری"],
        },
      ],
      takeaway: "ممنوعِ واقعی کسی را غافل‌گیر می‌کند یا راه را بند می‌آورد. نورِ پایین، بوقِ بیرونِ آبادی و «۶۰ کیلومتر» دام‌اند.",
      rule: `${CDS_154} c.1, c.5; Codice della Strada, art. 141 c.1; art. 153 c.1; art. 156 c.2`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "giungere in vicinanza di un incrocio", fa: "به نزدیکِ تقاطع رسیدن", base: "giungere" },
        { it: "in corrispondenza dell'incrocio", fa: "درست در تقاطع" },
        { it: "impegnare l'incrocio", fa: "واردِ تقاطع شدن", base: "impegnare" },
        { it: "liberare (sgombrare) l'incrocio", fa: "تقاطع را خالی کردن", base: "liberare" },
        { it: "incolonnarsi", fa: "پشتِ صف قرار گرفتن", base: "incolonnarsi" },
        { it: "contemporaneamente", fa: "هم‌زمان" },
        { it: "a zig zag", fa: "زیگزاگ، با عوض کردنِ پشتِ سرِ همِ خط" },
        { it: "non è consentito", fa: "مجاز نیست", note: "در این گروه گاهی درست است و گاهی دام." },
      ],
    },
    {
      kind: "trap",
      title: "«non è consentito»: یکی واقعی، یکی ساختگی",
      body: "هر دو جمله با «در تقاطع‌های برون‌شهری مجاز نیست» شروع می‌شوند:",
      examples: [
        {
          sourceId: "4582",
          textIt: "In corrispondenza di incroci extraurbani non è consentito effettuare la sosta",
          answer: 1,
          chunks: [
            { it: "In corrispondenza di incroci extraurbani", fa: "درست در تقاطع‌های برون‌شهری" },
            { it: "non è consentito", fa: "مجاز نیست", focus: "negation" },
            { it: "effettuare la sosta", fa: "پارک کردن" },
          ],
          translation: "درست در تقاطع‌های برون‌شهری، پارک کردن مجاز نیست.",
          why: "درست است. خودروی پارک‌شده در تقاطع دیدِ دیگران را می‌گیرد و راه را تنگ می‌کند.",
        },
        {
          sourceId: "4586",
          textIt: "In vicinanza o in corrispondenza degli incroci extraurbani non è consentito superare la velocità di 60 km/h",
          answer: 0,
          chunks: [
            { it: "In vicinanza o in corrispondenza degli incroci extraurbani", fa: "نزدیکِ تقاطع‌های برون‌شهری یا درست در آن‌ها" },
            { it: "non è consentito", fa: "مجاز نیست", focus: "negation" },
            { it: "superare la velocità di 60 km/h", fa: "از سرعتِ ۶۰ کیلومتر بر ساعت بیشتر رفتن", focus: "limit" },
          ],
          translation: "نزدیکِ تقاطع‌های برون‌شهری یا درست در آن‌ها، رفتن با سرعتِ بیش از ۶۰ کیلومتر بر ساعت مجاز نیست.",
          why: "غلط است. قانون برای تقاطع عددی نمی‌گذارد؛ سرعتی می‌خواهد که با آن بتوانی به‌موقع بایستی و راه بدهی.",
        },
      ],
      takeaway: "پشتِ «non è consentito» را بخوان: اگر عددی آمده که قانون نگفته، دام است.",
      rule: "Codice della Strada, art. 141 c.1",
    },
  ],
  practice: [
    {
      sourceId: "4574",
      textIt: "Giungendo ad un incrocio è consentito impegnarlo solo se si ha la possibilità di proseguire e liberarlo",
      answer: 1,
      chunks: [
        { it: "Giungendo ad un incrocio", fa: "وقتی به تقاطع می‌رسی،", verb: "giungendo ← giungere" },
        { it: "è consentito impegnarlo", fa: "اجازه داری واردش شوی", verb: "impegnarlo ← impegnare" },
        { it: "solo se si ha la possibilità", fa: "فقط اگر امکانش را داشته باشی", focus: "limit" },
        { it: "di proseguire e liberarlo", fa: "که ادامه بدهی و آن را خالی کنی", verb: "liberarlo ← liberare" },
      ],
      translation: "وقتی به تقاطع می‌رسی، فقط اگر امکانِ ادامه دادن و خالی کردنِ آن را داشته باشی، اجازه داری واردش شوی.",
      why: "درست است (قدم ۱). خودرویی که وسطِ تقاطع گیر کند، راهِ همه‌ی جهت‌ها را می‌بندد.",
      rule: `${CDS_145} c.7`,
      conceptStep: 1,
    },
    {
      sourceId: "4402",
      textIt: "Giungendo ad un incrocio, se non si è in grado di capire subito chi ha la precedenza, si può proseguire senza rallentare, se si sceglie di andare diritto",
      answer: 0,
      chunks: [
        { it: GIUNGENDO, fa: GIUNGENDO_FA, verb: "giungendo ← giungere" },
        { it: "se non si è in grado di capire subito chi ha la precedenza,", fa: "اگر نتوانی فوراً بفهمی حق تقدم با کیست،", focus: "condition" },
        { it: "si può proseguire senza rallentare,", fa: "می‌توانی بدونِ کم کردنِ سرعت ادامه بدهی،", verb: "si può ← potere" },
        { it: "se si sceglie di andare diritto", fa: "اگر تصمیم بگیری مستقیم بروی", focus: "condition", verb: "si sceglie ← scegliere" },
      ],
      translation: "وقتی به تقاطع می‌رسی، اگر نتوانی فوراً بفهمی حق تقدم با کیست، اگر تصمیم بگیری مستقیم بروی می‌توانی بدونِ کم کردنِ سرعت ادامه بدهی.",
      why: "غلط است (قدم ۱). مستقیم رفتن حق تقدم نمی‌دهد. وقتی مطمئن نیستی، آهسته و با احتیاط جلو برو.",
      rule: `${CDS_145} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "4579",
      textIt: "In vicinanza o in corrispondenza degli incroci non è consentito procedere a zig zag, anche se le corsie direzionali sono segnate da strisce discontinue (tratteggiate)",
      answer: 1,
      chunks: [
        { it: VICINANZA, fa: VICINANZA_FA },
        { it: "non è consentito procedere a zig zag,", fa: "زیگزاگ رفتن مجاز نیست،", focus: "negation" },
        { it: "anche se le corsie direzionali sono segnate", fa: "حتی اگر خط‌های عبورِ جهت‌دار با … مشخص شده باشند", focus: "condition", verb: "sono segnate ← segnare" },
        { it: "da strisce discontinue (tratteggiate)", fa: "خط‌های خط‌چین" },
      ],
      translation: "نزدیکِ تقاطع‌ها یا درست در آن‌ها زیگزاگ رفتن مجاز نیست، حتی اگر خط‌های عبورِ جهت‌دار با خط‌های خط‌چین مشخص شده باشند.",
      why: "درست است (قدم ۲). خط‌چین اجازه‌ی یک بار عوض کردنِ خط با بررسی است؛ رفت‌وآمدِ پشتِ سرِ هم میانِ خط‌ها نزدیکِ تقاطع دیگران را غافل‌گیر می‌کند.",
      rule: `${CDS_154} c.1; Codice della Strada, art. 144 c.3`,
      conceptStep: 2,
    },
    {
      sourceId: "4589",
      textIt: "In vicinanza o in corrispondenza degli incroci non si deve rallentare se il semaforo è a luce gialla lampeggiante",
      answer: 0,
      chunks: [
        { it: VICINANZA, fa: VICINANZA_FA },
        { it: "non si deve rallentare", fa: "نباید سرعت را کم کرد", verb: "si deve ← dovere", focus: "negation" },
        { it: "se il semaforo è a luce gialla lampeggiante", fa: "اگر چراغ زرد چشمک‌زن باشد", focus: "condition" },
      ],
      translation: "نزدیکِ تقاطع‌ها یا درست در آن‌ها، اگر چراغ زرد چشمک‌زن باشد نباید سرعت را کم کرد.",
      why: "غلط است (قدم ۲). زردِ چشمک‌زن یعنی چراغ تقاطع را تنظیم نمی‌کند؛ حق تقدم با تابلوها و قاعده‌ی راست است، پس آهسته‌تر می‌روی (فصل ۷).",
      rule: `${CDS_145} c.1`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // approaching a junction: precedence, lane and signal in time, entering only if you can clear it, prudence
      sourceIds: ["4570", "4572", "4573", "4574", "4575", "4577", "4578", "4401", "4402", "4592", "4593"],
    },
    {
      step: 2,
      // at or near the junction: real bans (zig-zag, sudden turns, parking at extra-urban junctions) and invented ones
      sourceIds: ["4579", "4580", "4582", "4583", "4585", "4586", "4587", "4588", "4589", "4590", "4641"],
    },
  ],
};
