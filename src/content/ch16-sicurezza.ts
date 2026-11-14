/**
 * src/content/ch16-sicurezza.ts
 * Chapter 16 (Fermata, sosta, arresto), lessons 6–7: the driver's side of
 * stopping. L6: leaving the car parked safely (handbrake, lowest gear, wheels
 * to the kerb, engine off, no use without consent; CdS art. 157 c.2, c.7-bis,
 * art. 158 c.4; lights art. 153 c.5) and getting out without endangering
 * anyone (art. 157 c.7). L7: what to check before driving off (seat, mirrors,
 * controls, belts; documents and licence category; efficiency and load;
 * artt. 79, 116, 164, 169, 172, 180).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter16.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_157 = "Codice della Strada, art. 157";
const CDS_158 = "Codice della Strada, art. 158";
const DURANTE = "Durante la sosta";
const DURANTE_FA = "در هنگامِ پارک";
const PRIMA = "Prima di iniziare a guidare";
const PRIMA_FA = "پیش از شروعِ رانندگیِ";

// ── Lesson 6 ──────────────────────────────────────────────────────────────────

export const lessonSostaSicura: Lesson = {
  id: "sosta-sicura-portiere",
  titleFa: "پارکِ امن، و پیاده شدن",
  titleIt: "CAUTELE DURANTE LA SOSTA · APERTURA DELLE PORTIERE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی خودروی پارک‌شده را چطور بی‌حرکت و امن بگذاری (ترمزِ دستی، دنده‌ی سبک، چرخ‌ها، موتور) و پیش از باز کردنِ در یا پیاده شدن به چه کسی و در کدام سمت نگاه کنی.",
      why:
        "۲۶ سؤال. دام‌ها دو جورند: عددها و استثناهای ساختگی («حداکثر سه ساعت»، «دنده‌ی چهار»، «فقط در سرازیری»، «برای کولر موتور روشن بماند») و قاعده‌های نصفه («فقط پشت را نگاه کن، جلو را نه»، «باز کردنِ درِ سمتِ خیابان ممنوع است»).",
      rule: `${CDS_157} c.2, c.7, c.7-bis; ${CDS_158} c.4`,
    },
    {
      kind: "table",
      title: "خودرو باید سرِ جایش بماند",
      body:
        "قانون از راننده‌ی پارک‌کرده دو چیز می‌خواهد: احتیاطی که از تصادف جلوگیری کند، و این‌که کسی بی‌اجازه‌اش از خودرو استفاده نکند. بقیه‌ی ردیف‌ها همین دو خواسته‌اند، به زبانِ عمل. شیبِ جاده مهم نیست: خودرو همیشه باید بی‌حرکت بماند.",
      columns: ["چه کنی", "دامِ بانک"],
      rows: [
        {
          label: "ترمز و دنده",
          values: ["ترمزِ دستی را بکش و سبک‌ترین دنده را بگذار (دنده‌ی یک، یا عقب)، در هر شیبی", "«دنده‌ی چهار در سربالایی»، «دنده خلاص» یا «ترمزِ دستی فقط در سرازیری» نه"],
        },
        { label: "سرازیری یا سربالاییِ تند", values: ["علاوه بر آن، چرخ‌ها را به سمتِ پیاده‌رو بچرخان", "—"] },
        {
          label: "موتور",
          values: ["خاموش؛ پیش از پیاده شدن مطمئن شو خاموش است", "«برای مدتِ کوتاه روشن بماند» یا «برای کار کردنِ کولر» نه"],
        },
        { label: "استفاده‌ی بی‌اجازه", values: ["کاری کن که کسی بی‌اجازه‌ی تو نتواند از خودرو استفاده کند: سوئیچ را بردار، درها را قفل کن", "—"] },
        { label: "دور شدن", values: ["در پارک می‌توانی از خودرو دور شوی", "«حداکثر سه ساعت» نه؛ سه ساعت سقفِ توقفِ اضطراری در آزادراه است"] },
        {
          label: "چراغ در شب",
          values: ["چراغ‌های موقعیت معمولاً روشن می‌مانند", "«در هر حال» نه: اگر روشناییِ خیابان خودرو را کاملاً نشان دهد، یا خودرو بیرون از سواره‌رو باشد، لازم نیست"],
        },
      ],
      takeaway: "ترمزِ دستی + دنده‌ی سبک، همیشه؛ چرخ‌ها به سمتِ پیاده‌رو در شیبِ تند؛ موتور خاموش. هیچ سقفِ زمانی برای پارک نیست.",
      rule: `${CDS_157} c.2, c.7-bis; ${CDS_158} c.4; Codice della Strada, art. 153 c.5`,
    },
    {
      kind: "table",
      title: "پیش از باز کردنِ در",
      body:
        "باز کردنِ در یا پیاده شدن از هر دو سمت مجاز است؛ قانون فقط می‌خواهد مطمئن باشی خطر یا مزاحمتی برای دیگران نمی‌سازد. هر سمت آدم‌های خودش را دارد.",
      columns: ["به چه کسی نگاه کنی"],
      rows: [
        { label: "سمتِ وسطِ خیابان", values: ["وسیله‌هایی که از پشت می‌رسند، با آینه و با نگاه. پیاده شدن از این سمت ممنوع نیست"] },
        { label: "سمتِ پیاده‌رو", values: ["عابرها، و دوچرخه‌هایی که از کنار رد می‌شوند"] },
        { label: "خیابانِ باریک", values: ["وسیله‌هایی که از پشت می‌آیند و وسیله‌هایی که از روبه‌رو می‌آیند"] },
        {
          label: "مسافرها",
          values: ["به مسافری که در را باز می‌کند یادآوری کن: در راست به عابرها، در چپِ خیابانِ یک‌طرفه به وسیله‌هایی که می‌رسند"],
        },
        { label: "چراغ راهنما", values: ["لازم نیست؛ باز کردنِ در با چراغ راهنما اعلام نمی‌شود"] },
      ],
      takeaway: "هر دو سمت مجاز، به شرطِ نگاه کردن: سمتِ خیابان وسیله‌ها، سمتِ پیاده‌رو عابرها؛ در خیابانِ باریک هر دو جهت.",
      rule: `${CDS_157} c.7`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il freno di stazionamento", fa: "ترمزِ دستی", note: "«il freno a mano» هم همین است." },
        { it: "il rapporto più basso del cambio", fa: "سبک‌ترین دنده" },
        { it: "in folle", fa: "دنده خلاص" },
        { it: "le ruote sterzate verso il marciapiede", fa: "چرخ‌های چرخانده به سمتِ پیاده‌رو" },
        { it: "a forte pendenza", fa: "با شیبِ تند" },
        { it: "il motore spento", fa: "موتورِ خاموش" },
        { it: "senza il suo consenso", fa: "بدونِ اجازه‌ی او" },
        { it: "la portiera · lo sportello", fa: "درِ خودرو" },
        { it: "i veicoli che sopraggiungono", fa: "وسیله‌هایی که از راه می‌رسند", base: "sopraggiungere" },
        { it: "lo specchietto retrovisore", fa: "آینه" },
      ],
    },
    {
      kind: "trap",
      title: "فقط پشت، یا پشت و جلو؟",
      body: "هر دو جمله درباره‌ی نگاه کردن پیش از پیاده شدن‌اند. یکی می‌گوید با آینه هم نگاه کن؛ دیگری نصفِ جاده را از قلم انداخته:",
      examples: [
        {
          sourceId: "5477",
          textIt:
            "Allorché si accinge a scendere dall'autoveicolo, il conducente deve assicurarsi, anche mediante lo specchietto retrovisore, che non sopraggiungano altri veicoli",
          answer: 1,
          chunks: [
            { it: "Allorché si accinge a scendere dall'autoveicolo,", fa: "وقتی می‌خواهد از خودرو پیاده شود،", verb: "si accinge ← accingersi", focus: "condition" },
            { it: "il conducente deve assicurarsi,", fa: "راننده باید مطمئن شود،", verb: "deve assicurarsi ← assicurarsi" },
            { it: "anche mediante lo specchietto retrovisore,", fa: "با آینه هم،" },
            { it: "che non sopraggiungano altri veicoli", fa: "که وسیله‌ی دیگری از راه نمی‌رسد", verb: "sopraggiungano ← sopraggiungere", focus: "negation" },
          ],
          translation: "وقتی راننده می‌خواهد از خودرو پیاده شود، باید، با آینه هم، مطمئن شود که وسیله‌ی دیگری از راه نمی‌رسد.",
          why: "درست است. آینه نشان می‌دهد چه کسی از پشت می‌آید؛ نگاهِ مستقیم هم لازم است.",
        },
        {
          sourceId: "5305",
          textIt:
            "Il conducente di un autoveicolo in sosta su una strada stretta, prima di scendere deve preoccuparsi dei veicoli che sopraggiungono da dietro, ma non di quelli di fronte",
          answer: 0,
          chunks: [
            { it: "Il conducente di un autoveicolo in sosta su una strada stretta,", fa: "راننده‌ی خودرویی که در خیابانی باریک پارک کرده،" },
            { it: "prima di scendere deve preoccuparsi", fa: "پیش از پیاده شدن باید مراقب باشد", verb: "deve preoccuparsi ← preoccuparsi" },
            { it: "dei veicoli che sopraggiungono da dietro,", fa: "به وسیله‌هایی که از پشت می‌رسند،", verb: "sopraggiungono ← sopraggiungere" },
            { it: "ma non di quelli di fronte", fa: "ولی نه به آن‌هایی که از روبه‌رو می‌آیند", focus: "negation" },
          ],
          translation: "راننده‌ی خودرویی که در خیابانی باریک پارک کرده، پیش از پیاده شدن باید مراقبِ وسیله‌هایی باشد که از پشت می‌رسند، ولی نه آن‌هایی که از روبه‌رو می‌آیند.",
          why: "غلط است. در خیابانِ باریک، وسیله‌ای که از روبه‌رو می‌آید هم از کنارِ درِ تو رد می‌شود.",
        },
      ],
      takeaway: "«ma non di quelli di fronte» قاعده را نصف کرده. در خیابانِ باریک هر دو جهت.",
      rule: `${CDS_157} c.7`,
    },
  ],
  practice: [
    {
      sourceId: "5380",
      textIt: "Durante la sosta è opportuno che il conducente azioni il freno di stazionamento ed inserisca il rapporto più basso del cambio di velocità",
      answer: 1,
      chunks: [
        { it: DURANTE, fa: DURANTE_FA },
        { it: "è opportuno che il conducente azioni il freno di stazionamento", fa: "بهتر است راننده ترمزِ دستی را بکشد", verb: "azioni ← azionare" },
        { it: "ed inserisca il rapporto più basso del cambio di velocità", fa: "و سبک‌ترین دنده را بگذارد", verb: "inserisca ← inserire" },
      ],
      translation: "در هنگامِ پارک بهتر است راننده ترمزِ دستی را بکشد و سبک‌ترین دنده را بگذارد.",
      why: "درست است (قدم ۱). ترمزِ دستی خودرو را نگه می‌دارد و دنده‌ی سبکِ درگیر، اگر ترمز شل شود، جلوی حرکتِ چرخ‌ها را می‌گیرد.",
      rule: `${CDS_158} c.4`,
      conceptStep: 1,
    },
    {
      sourceId: "5387",
      textIt: "Durante la sosta il conducente deve posizionare il cambio di velocità dell'autovettura in folle",
      answer: 0,
      chunks: [
        { it: DURANTE, fa: DURANTE_FA },
        { it: "il conducente deve posizionare", fa: "راننده باید بگذارد", verb: "deve ← dovere" },
        { it: "il cambio di velocità dell'autovettura in folle", fa: "دنده‌ی سواری را در حالتِ خلاص", focus: "contrast" },
      ],
      translation: "در هنگامِ پارک، راننده باید دنده‌ی سواری را خلاص بگذارد.",
      why: "غلط است (قدم ۱). در خلاص چیزی جز ترمزِ دستی خودرو را نگه نمی‌دارد. سبک‌ترین دنده را بگذار.",
      rule: `${CDS_158} c.4`,
      conceptStep: 1,
    },
    {
      sourceId: "5481",
      textIt: "Il conducente può lasciare il veicolo in sosta con il motore acceso per consentire il funzionamento dell'aria condizionata",
      answer: 0,
      chunks: [
        { it: "Il conducente può lasciare il veicolo in sosta", fa: "راننده می‌تواند خودرو را پارک‌شده بگذارد", verb: "può ← potere" },
        { it: "con il motore acceso", fa: "با موتورِ روشن", focus: "contrast" },
        { it: "per consentire il funzionamento dell'aria condizionata", fa: "تا کولر کار کند", focus: "reason" },
      ],
      translation: "راننده می‌تواند خودرو را با موتورِ روشن پارک کند تا کولر کار کند.",
      why: "غلط است (قدم ۱). قانون دقیقاً همین را جدا ممنوع کرده (ماده‌ی ۱۵۷ بند ۷-bis): در پارک موتور خاموش است، کولر هم دلیل نیست.",
      rule: `${CDS_157} c.2, c.7-bis`,
      conceptStep: 1,
    },
    {
      sourceId: "5474",
      textIt: "Prima di aprire lo sportello di un veicolo dal lato rivolto verso il centro della strada bisogna assicurarsi che non sopraggiungano altri veicoli",
      answer: 1,
      chunks: [
        { it: "Prima di aprire lo sportello di un veicolo", fa: "پیش از باز کردنِ درِ وسیله" },
        { it: "dal lato rivolto verso il centro della strada", fa: "در سمتی که رو به وسطِ خیابان است" },
        { it: "bisogna assicurarsi", fa: "باید مطمئن شد", verb: "bisogna ← bisognare" },
        { it: "che non sopraggiungano altri veicoli", fa: "که وسیله‌ی دیگری از راه نمی‌رسد", verb: "sopraggiungano ← sopraggiungere", focus: "negation" },
      ],
      translation: "پیش از باز کردنِ درِ وسیله در سمتی که رو به وسطِ خیابان است، باید مطمئن شد که وسیله‌ی دیگری از راه نمی‌رسد.",
      why: "درست است (قدم ۲). سمتِ خیابان: وسیله‌هایی که از پشت می‌رسند.",
      rule: `${CDS_157} c.7`,
      conceptStep: 2,
    },
    {
      sourceId: "5480",
      textIt: "L'apertura degli sportelli del veicolo dal lato rivolto verso il centro della strada è vietato",
      answer: 0,
      chunks: [
        { it: "L'apertura degli sportelli del veicolo", fa: "باز کردنِ درهای وسیله" },
        { it: "dal lato rivolto verso il centro della strada", fa: "در سمتی که رو به وسطِ خیابان است" },
        { it: "è vietato", fa: "ممنوع است", verb: "è vietato ← vietare", focus: "contrast" },
      ],
      translation: "باز کردنِ درهای وسیله در سمتی که رو به وسطِ خیابان است ممنوع است.",
      why: "غلط است (قدم ۲). ممنوع نیست؛ فقط باید مطمئن شوی خطر یا مزاحمتی برای کسی نمی‌سازد.",
      rule: `${CDS_157} c.7`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // immobilise, engine off, no use without consent, lights, no time limit
      sourceIds: ["5304", "5378", "5379", "5380", "5381", "5382", "5383", "5384", "5385", "5386", "5387", "5478", "5481", "5482"],
    },
    {
      step: 2,
      // doors and getting out, on both sides
      sourceIds: ["5300", "5301", "5302", "5303", "5305", "5473", "5474", "5475", "5476", "5477", "5479", "5480"],
    },
  ],
};

// ── Lesson 7 ──────────────────────────────────────────────────────────────────

export const lessonPrimaDiPartire: Lesson = {
  id: "prima-di-partire",
  titleFa: "پیش از راه افتادن",
  titleIt: "PRIMA DI INIZIARE A GUIDARE",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس فهرستِ کارهای پیش از راه افتادن را می‌دانی: صندلی، آینه‌ها، فرمان‌ها و کمربندها؛ مدارک و ردیفِ گواهینامه؛ سلامتِ خودرو و بارش. و چند کارِ ساختگی را که بانک لای این فهرست گذاشته می‌شناسی.",
      why:
        "۱۴ سؤال، ده تا درست و چهار تا غلط. غلط‌ها یا چیزی بی‌ربط‌اند (کیلومترشمارِ سفر، پیش‌کشِ کمربند)، یا خطرناک (خاموش کردنِ کیسه‌ی هوای راننده)، یا شرطِ ساختگی («فقط برای سفرِ طولانی»).",
      rule: "Codice della Strada, artt. 79, 116, 164, 169, 172, 180",
    },
    {
      kind: "table",
      title: "تو، صندلی و خودرو",
      body: "اول جای خودت را درست کن، بعد بدان هر دکمه و اهرم چه می‌کند. هر چیزی که این‌جا نیامده، مثلِ صفر کردنِ کیلومترشمار، بی‌ربط است.",
      columns: ["چه کنی", "چه نه"],
      rows: [
        { label: "صندلی و پشت‌سری", values: ["به اندازه‌ی قدِ خودت تنظیم کن", "—"] },
        { label: "آینه‌ها", values: ["آینه‌ی داخل و آینه‌های بیرون؛ روی موتورسیکلت هم آینه‌ها", "—"] },
        { label: "فرمان‌ها", values: ["اهرم‌ها و دکمه‌های لازم برای رانندگی را پیدا کن و بدان چه می‌کنند", "«کیلومترشمارِ سفر را تنظیم کن» نه؛ ربطی به ایمنی ندارد"] },
        { label: "کمربندها", values: ["نگاه کن مسافرها کمربند بسته‌اند", "«ببین کمربندها پیش‌کش دارند» نه"] },
        { label: "کیسه‌ی هوا", values: ["کیسه‌ی هوای راننده همیشه فعال", "«خاموشش کن» نه. فقط کیسه‌ی هوای صندلیِ جلوی مسافر، وقتی صندلیِ کودکِ رو به عقب آن‌جاست، خاموش می‌شود"] },
      ],
      takeaway: "صندلی، آینه، فرمان‌ها، کمربندها. کیسه‌ی هوای راننده را هیچ‌وقت خاموش نکن.",
      rule: "Codice della Strada, artt. 169 c.1, 172 c.1, c.5",
    },
    {
      kind: "table",
      title: "مدرک، گواهینامه، خودرو، بار",
      body: "چهار چیز که پیش از هر سفری، کوتاه یا بلند، باید درست باشد:",
      columns: ["قاعده"],
      rows: [
        { label: "مدارک", values: ["کارتِ خودرو، بیمه‌نامه، گواهینامه و بقیه، همراهت و معتبر"] },
        { label: "ردیفِ گواهینامه", values: ["گواهینامه‌ات اجازه‌ی راندنِ همین وسیله را بدهد"] },
        { label: "سلامتِ خودرو", values: ["خودرو کاملاً سالم باشد، پیش از هر سفر؛ «فقط پیش از سفرِ طولانی» نه"] },
        { label: "بار", values: ["طوری چیده شود که نیفتد یا پخش نشود"] },
        { label: "دید", values: ["مسافرها و بار دیدِ عقب و کنار را نبندند"] },
      ],
      takeaway: "مدارک همراه، ردیفِ درست، خودروی سالم، بارِ محکم، دیدِ باز: برای هر سفر.",
      rule: "Codice della Strada, artt. 79 c.1, 116, 164 c.1, 169 c.4, 180",
    },
    {
      kind: "classify",
      title: "لازم است یا نه؟",
      body: "پیش از راه افتادن کدام کار جزوِ فهرست است؟ تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "sì", fa: "جزوِ فهرست است" },
        { it: "no", fa: "لازم نیست، یا غلط است" },
      ],
      items: [
        { prompt: "خودروی دوستت را قرض گرفته‌ای؛ می‌گردی ببینی چراغ‌ها و برف‌پاک‌کن کجایند.", answer: 0, explain: "فرمان‌هایی که لازم داری را پیش از حرکت پیدا کن." },
        { prompt: "پنج دقیقه تا نانوایی می‌روی، پس لاستیک‌ها و چراغ‌ها را نگاه نمی‌کنی.", answer: 1, explain: "سلامتِ خودرو برای هر سفری است، نه فقط سفرِ طولانی." },
        { prompt: "کارتن‌ها را تا سقفِ صندوقِ عقب چیده‌ای و آینه‌ی وسط دیگر چیزی نشان نمی‌دهد.", answer: 1, explain: "بار نباید دیدِ عقب را ببندد؛ این کار جزوِ فهرست نیست، اشتباه است." },
        { prompt: "کیلومترشمارِ سفر را صفر می‌کنی.", answer: 1, explain: "شاید مفید باشد، ولی ربطی به ایمنی یا قانون ندارد." },
        { prompt: "پیش از حرکت به مسافرِ عقب یادآوری می‌کنی کمربندش را ببندد.", answer: 0, explain: "بانک این را از کارهای راننده می‌داند." },
      ],
      takeaway: "سؤال این است: به ایمنی یا به قانونی بودنِ رانندگی ربط دارد؟ اگر نه، جزوِ فهرست نیست.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il sedile e il poggiatesta", fa: "صندلی و پشت‌سری" },
        { it: "gli specchi retrovisori interni ed esterni", fa: "آینه‌های داخل و بیرون" },
        { it: "i comandi (leve e pulsanti)", fa: "فرمان‌ها (اهرم‌ها و دکمه‌ها)" },
        { it: "la carta di circolazione", fa: "کارتِ خودرو" },
        { it: "il certificato di assicurazione", fa: "بیمه‌نامه" },
        { it: "la categoria di patente", fa: "ردیفِ گواهینامه" },
        { it: "lo stato di efficienza del mezzo", fa: "سالم بودنِ خودرو" },
        { it: "il pretensionatore", fa: "پیش‌کشِ کمربند" },
        { it: "il contachilometri parziale", fa: "کیلومترشمارِ سفر" },
        { it: "disinserire l'airbag", fa: "کیسه‌ی هوا را خاموش کردن", base: "disinserire" },
      ],
    },
    {
      kind: "trap",
      title: "همیشه، یا فقط پیش از سفرِ طولانی؟",
      body: "هر دو جمله درباره‌ی سلامتِ خودرو پیش از رانندگی‌اند. دومی یک شرطِ ساختگی اضافه کرده:",
      examples: [
        {
          sourceId: "5311",
          textIt: "Prima di iniziare a guidare un veicolo, bisogna essere certi del perfetto stato di efficienza del mezzo",
          answer: 1,
          chunks: [
            { it: `${PRIMA} un veicolo,`, fa: `${PRIMA_FA} یک وسیله،` },
            { it: "bisogna essere certi", fa: "باید مطمئن بود", verb: "bisogna ← bisognare" },
            { it: "del perfetto stato di efficienza del mezzo", fa: "از سالم بودنِ کاملِ خودرو" },
          ],
          translation: "پیش از شروعِ رانندگیِ یک وسیله، باید از سالم بودنِ کاملِ خودرو مطمئن بود.",
          why: "درست است. وسیله‌ای که در جاده است باید سالم باشد؛ پیش از هر سفری.",
        },
        {
          sourceId: "5319",
          textIt: "Prima di iniziare a guidare un veicolo, bisogna verificarne lo stato di efficienza solo se si deve intraprendere un lungo viaggio",
          answer: 0,
          chunks: [
            { it: `${PRIMA} un veicolo,`, fa: `${PRIMA_FA} یک وسیله،` },
            { it: "bisogna verificarne lo stato di efficienza", fa: "باید سالم بودنش را بررسی کرد", verb: "bisogna ← bisognare" },
            { it: "solo se si deve intraprendere un lungo viaggio", fa: "فقط اگر قرار است سفرِ طولانی‌ای شروع شود", verb: "si deve intraprendere ← intraprendere", focus: "limit" },
          ],
          translation: "پیش از شروعِ رانندگیِ یک وسیله، فقط اگر قرار است سفرِ طولانی‌ای شروع شود باید سالم بودنش را بررسی کرد.",
          why: "غلط است. «فقط» شرطی ساختگی است؛ یک ترمزِ خراب در مسیرِ کوتاه هم همان‌قدر خطرناک است.",
        },
      ],
      takeaway: "«solo se» در این گروه همیشه جمله را غلط می‌کند: فهرست برای هر سفری است.",
      rule: "Codice della Strada, art. 79 c.1",
    },
  ],
  practice: [
    {
      sourceId: "5306",
      textIt: "Prima di iniziare a guidare un autoveicolo è opportuno regolare il sedile e il poggiatesta, secondo la propria statura",
      answer: 1,
      chunks: [
        { it: `${PRIMA} un autoveicolo`, fa: `${PRIMA_FA} یک خودرو` },
        { it: "è opportuno regolare il sedile e il poggiatesta,", fa: "بهتر است صندلی و پشت‌سری را تنظیم کرد،", verb: "è ← essere" },
        { it: "secondo la propria statura", fa: "به اندازه‌ی قدِ خود" },
      ],
      translation: "پیش از شروعِ رانندگیِ یک خودرو، بهتر است صندلی و پشت‌سری را به اندازه‌ی قدِ خود تنظیم کرد.",
      why: "درست است (قدم ۱). پشت‌سریِ درست در تصادف از گردن محافظت می‌کند و صندلیِ درست به تو آزادیِ حرکت می‌دهد.",
      rule: "Codice della Strada, art. 169 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "5317",
      textIt: "Prima di iniziare a guidare un veicolo a motore bisogna disinserire l'airbag del lato conducente",
      answer: 0,
      chunks: [
        { it: `${PRIMA} un veicolo a motore`, fa: `${PRIMA_FA} یک وسیله‌ی موتوری` },
        { it: "bisogna disinserire", fa: "باید خاموش کرد", verb: "bisogna ← bisognare", focus: "contrast" },
        { it: "l'airbag del lato conducente", fa: "کیسه‌ی هوای سمتِ راننده را" },
      ],
      translation: "پیش از شروعِ رانندگیِ یک وسیله‌ی موتوری باید کیسه‌ی هوای سمتِ راننده را خاموش کرد.",
      why: "غلط است (قدم ۱). کیسه‌ی هوای راننده همیشه فعال می‌ماند. فقط کیسه‌ی هوای مسافرِ جلو، با صندلیِ کودکِ رو به عقب، خاموش می‌شود.",
      rule: "Codice della Strada, art. 172 c.5",
      conceptStep: 1,
    },
    {
      sourceId: "5318",
      textIt: "Prima di iniziare a guidare un autoveicolo, bisogna verificare che le cinture di sicurezza siano dotate di pretensionatore",
      answer: 0,
      chunks: [
        { it: `${PRIMA} un autoveicolo,`, fa: `${PRIMA_FA} یک خودرو،` },
        { it: "bisogna verificare", fa: "باید بررسی کرد", verb: "bisogna ← bisognare" },
        { it: "che le cinture di sicurezza siano dotate di pretensionatore", fa: "که کمربندهای ایمنی پیش‌کش داشته باشند", verb: "siano ← essere", focus: "contrast" },
      ],
      translation: "پیش از شروعِ رانندگیِ یک خودرو، باید بررسی کرد که کمربندهای ایمنی پیش‌کش داشته باشند.",
      why: "غلط است (قدم ۱). پیش‌کش جزوِ ساختِ کمربند است، نه چیزی که راننده پیش از هر حرکت بررسی کند. کارِ تو این است که مسافرها کمربند ببندند.",
      rule: "Codice della Strada, art. 172 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "5310",
      textIt: "Prima di iniziare a guidare un veicolo a motore bisogna essere certi che la categoria di patente posseduta ne consenta la guida",
      answer: 1,
      chunks: [
        { it: `${PRIMA} un veicolo a motore`, fa: `${PRIMA_FA} یک وسیله‌ی موتوری` },
        { it: "bisogna essere certi", fa: "باید مطمئن بود", verb: "bisogna ← bisognare" },
        { it: "che la categoria di patente posseduta", fa: "که ردیفِ گواهینامه‌ای که داری" },
        { it: "ne consenta la guida", fa: "اجازه‌ی راندنش را بدهد", verb: "consenta ← consentire" },
      ],
      translation: "پیش از شروعِ رانندگیِ یک وسیله‌ی موتوری باید مطمئن بود که ردیفِ گواهینامه‌ات اجازه‌ی راندنش را می‌دهد.",
      why: "درست است (قدم ۲). هر ردیفِ گواهینامه وسیله‌های خودش را دارد.",
      rule: "Codice della Strada, art. 116",
      conceptStep: 2,
    },
    {
      sourceId: "5313",
      textIt:
        "Prima di iniziare a guidare un veicolo, bisogna controllare che non sia compromessa la visibilità posteriore e laterale, per la presenza di passeggeri o per il carico mal posizionato",
      answer: 1,
      chunks: [
        { it: `${PRIMA} un veicolo,`, fa: `${PRIMA_FA} یک وسیله،` },
        { it: "bisogna controllare", fa: "باید بررسی کرد", verb: "bisogna ← bisognare" },
        { it: "che non sia compromessa la visibilità posteriore e laterale,", fa: "که دیدِ عقب و کنار بسته نشده باشد،", verb: "sia compromessa ← compromettere", focus: "negation" },
        { it: "per la presenza di passeggeri o per il carico mal posizionato", fa: "به خاطرِ مسافرها یا بارِ بدچیده", focus: "reason" },
      ],
      translation: "پیش از شروعِ رانندگیِ یک وسیله، باید بررسی کرد که مسافرها یا بارِ بدچیده دیدِ عقب و کنار را نبسته باشند.",
      why: "درست است (قدم ۲). مسافر و بار نباید دیدِ راننده را کم کنند.",
      rule: "Codice della Strada, artt. 164 c.1, 169 c.4",
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // seat, mirrors, controls, belts, airbag; the irrelevant items
      sourceIds: ["5306", "5307", "5308", "5314", "5315", "5316", "5317", "5318"],
    },
    {
      step: 2,
      // documents, licence category, efficiency, load, visibility
      sourceIds: ["5309", "5310", "5311", "5312", "5313", "5319"],
    },
  ],
};
