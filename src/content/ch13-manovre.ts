/**
 * src/content/ch13-manovre.ts
 * Chapter 13 (Norme di circolazione), lessons 7 and 8: manoeuvres that cut
 * across other people's path.
 *
 *  L7 `norme-inversione`  how to U-turn (give way to all, indicator for the whole
 *                         manoeuvre, give up in heavy traffic or poor visibility)
 *                         and where never (junctions, curves, dossi, poor
 *                         visibility, autostrade).
 *  L8 `norme-immettersi`  entering the flow: setting off from the margin, leaving
 *                         private property or a passo carrabile, reversing out
 *                         (bank figure 676), and stopping at the right margin;
 *                         the points that follow.
 *
 * Legal basis: CdS art. 154 c.1–3, c.5–8 (manoeuvres, signalling, U-turn),
 * art. 145 c.6 (leaving places not open to public traffic), art. 176 c.1
 * lett. a (no U-turn on autostrade), artt. 171–172 (helmet, seat belt),
 * art. 126-bis table (points). Trust rules as in src/content/lessons.ts;
 * checked by tests/chapter13.test.ts and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_154 = "Codice della Strada, art. 154";
const INV = "Il conducente che intende effettuare l'inversione di marcia su una strada a doppio senso";
const INV_FA = "راننده‌ای که می‌خواهد در جاده‌ی دوطرفه دور بزند";
const IMM = "Il conducente che intende immettersi nel flusso della circolazione";
const IMM_FA = "راننده‌ای که می‌خواهد واردِ جریانِ ترافیک شود";
const PART = "Il conducente che parte dal margine della carreggiata e si immette nel flusso della circolazione";
const PART_FA = "راننده‌ای که از لبه‌ی سواره‌رو راه می‌افتد و واردِ جریانِ ترافیک می‌شود";
const RETRO = "Il veicolo S, muovendosi in retromarcia per immettersi nella circolazione,";
const RETRO_FA = "خودروی S، که با دنده‌عقب حرکت می‌کند تا واردِ ترافیک شود،";
const FERM = "Il conducente che intende fermarsi sul margine destro della carreggiata";
const FERM_FA = "راننده‌ای که می‌خواهد کنارِ لبه‌ی راستِ سواره‌رو بایستد";

// ── Lesson 7 ──────────────────────────────────────────────────────────────────

export const lessonInversione: Lesson = {
  id: "norme-inversione",
  titleFa: "دور زدن: چطور، و کجا هرگز",
  titleIt: "INVERSIONE DI MARCIA",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی دور زدن در جاده‌ی دوطرفه چه شرط‌هایی دارد (به همه راه بدهی، چراغ راهنما را تا آخرِ مانور روشن نگه داری، و در ترافیکِ سنگین یا دیدِ کم از آن بگذری) و کجاها اصلاً ممنوع است: نزدیکِ تقاطع، پیچ و برآمدگی، هر جا دید کم است، و در آزادراه.",
      why:
        "۲۱ سؤال. دامِ اصلی دو جور است: شرط‌هایی که قانون ندارد («فقط در جاده‌ی پهن»، «اگر خطِ وسط خط‌چین باشد با دیدِ کم هم می‌شود»، «با چراغِ خطر») و ممنوعیت‌هایی که وجود ندارد («بیرونِ آبادی ممنوع است»، «بدونِ خط‌کشی ممنوع است»).",
      rule: `${CDS_154} c.1–2, c.6; Codice della Strada, art. 176 c.1 lett. a`,
    },
    {
      kind: "table",
      title: "دور زدن چطور انجام می‌شود",
      body:
        "دور زدن یعنی از جلوی هر دو جهتِ ترافیک رد شوی. برای همین قانون از تو همان سه چیزی را می‌خواهد که برای هر مانورِ دیگری: مطمئن شوی خطر یا مزاحمتی نمی‌سازی، از قبل اعلامش کنی، و به کسانی که در حرکت‌اند راه بدهی.",
      columns: ["چه کنی", "دامِ بانک"],
      rows: [
        {
          label: "به همه راه بده",
          it: "dare la precedenza ai veicoli che sopraggiungono",
          values: ["از هر دو طرف؛ تو داری مسیرِ همه را قطع می‌کنی", "«اگر به همه راه بدهی، در پیچ هم می‌شود» غلط است: پیچ همیشه ممنوع است"],
        },
        {
          label: "چراغ راهنما",
          it: "l'indicatore di direzione · per l'intera durata della manovra",
          values: ["از قبل روشنش کن و تا پایانِ مانور روشن بماند", "«چراغِ خطر (چهار راهنما با هم)» غلط است؛ آن برای خودروی متوقف یا خطر است، نه مانور"],
        },
        {
          label: "ترافیکِ سنگین و پیوسته",
          it: "traffico intenso e continuo",
          values: ["دور نزن؛ از آن بگذر", "جای خالی پیدا نمی‌کنی بی‌آن‌که کسی را مجبور به ترمز کنی"],
        },
        {
          label: "دیدِ کم",
          it: "scarsa visibilità",
          values: ["دور نزن", "«با دیدِ کم، اگر خطِ وسط خط‌چین باشد، می‌شود» غلط است: خط‌چین فقط اجازه‌ی رد شدن از خط است، نه اجازه‌ی دور زدن بی‌دید"],
        },
        {
          label: "جاده‌ی باریک",
          it: "solo sulle strade larghe … con una sola manovra",
          values: ["اگر جا و دید هست، با چند حرکتِ جلو و عقب هم مجاز است", "«فقط در جاده‌ی پهن و با یک حرکت» شرطی است که قانون ندارد"],
        },
        {
          label: "خطِ وسط",
          it: "la linea di mezzeria è continua",
          values: [
            "از خطِ ممتد نمی‌شود رد شد (فصل ۶)، پس جایی که خطِ وسط ممتد است دور نمی‌زنی",
            "با این حال بانک جمله‌ی «راننده باید بررسی کند خطِ وسط ممتد است یا نه» را غلط می‌داند؛ آن را همان‌طور که بانک می‌گوید یاد بگیر. وارسی‌هایی که این ماده می‌خواهد ترافیک، دید و جای مانور است",
          ],
        },
      ],
      takeaway: "دور زدن = چراغ راهنما از اول تا آخر + راه دادن به همه + نبودنِ ترافیکِ سنگین و دیدِ کم. چراغِ خطر هیچ‌وقت.",
      rule: `${CDS_154} c.1–2`,
    },
    {
      kind: "table",
      title: "کجا هرگز دور نمی‌زنی",
      body:
        "جای ممنوع، جایی است که کسی که می‌آید تو را دیر می‌بیند یا تو او را. ماده‌ی ۱۵۴ سه جا را نام می‌برد: تقاطع، پیچ، برآمدگی. بانک «هر دیدِ کم» را هم کنارشان می‌گذارد، چون با دیدِ کم نمی‌توانی مطمئن شوی مانور بی‌خطر است (بند ۱). آزادراه قاعده‌ی خودش را دارد. بقیه‌ی «ممنوعیت»هایی که در جمله‌ها می‌بینی ساختگی‌اند.",
      columns: ["حکم", "چرا"],
      rows: [
        { label: "نزدیک یا روی تقاطع", it: "in vicinanza o in corrispondenza degli incroci", values: ["ممنوع", "ماشین‌ها از چند جهت می‌رسند و انتظارِ دور زدن ندارند"] },
        { label: "نزدیک یا در پیچ", it: "in vicinanza o in corrispondenza di curve", values: ["ممنوع", "کسی که از پشتِ پیچ می‌آید تو را نمی‌بیند"] },
        { label: "نزدیک یا روی برآمدگی", it: "in vicinanza o in corrispondenza di dossi", values: ["ممنوع", "پشتِ برآمدگی دیده نمی‌شود"] },
        { label: "هر جا که دید کم است", it: "in tutti i casi di scarsa visibilità", values: ["ممنوع", "مه، شب بی‌چراغ، باران: همان دلیلِ پیچ و برآمدگی"] },
        { label: "آزادراه و جاده‌ی برون‌شهریِ اصلی", it: "autostrade · strade extraurbane principali", values: ["ممنوع، با هر تعداد خط عبور", "حتی از بریدگیِ جداکننده‌ی وسط هم نمی‌شود رد شد"] },
        { label: "بیرونِ آبادی", it: "fuori dai centri abitati", values: ["به‌خودیِ‌خود ممنوع نیست", "ممنوعیت به جا (تقاطع، پیچ، برآمدگی، دید) و نوعِ جاده بستگی دارد، نه به آبادی"] },
        { label: "جاده‌ی بی‌خط‌کشی، یا خطِ کناریِ ممتد", it: "manca la segnaletica orizzontale · linea di margine continua", values: ["به‌خودیِ‌خود ممنوع نیست", "خطِ کناری لبه‌ی سواره‌رو را نشان می‌دهد، نه این‌که دور زدن ممنوع است"] },
      ],
      takeaway: "سه جای ممنوعِ همیشگی: تقاطع، پیچ، برآمدگی؛ به‌اضافه‌ی هر دیدِ کم و آزادراه. «بیرونِ آبادی» و «بی‌خط‌کشی» ممنوعیت نیستند.",
      rule: `${CDS_154} c.6; Codice della Strada, art. 176 c.1 lett. a`,
    },
    {
      kind: "classify",
      title: "این‌جا می‌شود دور زد؟",
      body: "هر موقعیت را بخوان. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "vietata", fa: "ممنوع" },
        { it: "consentita, con le cautele", fa: "مجاز، با رعایتِ شرط‌ها" },
      ],
      items: [
        { prompt: "جاده‌ی دوطرفه‌ی خلوت بیرونِ آبادی، مستقیم، روز، خطِ وسطِ خط‌چین", answer: 1, explain: "نه تقاطع است، نه پیچ، نه برآمدگی، دید هم خوب است. با چراغ راهنما و راه دادن به همه مجاز است." },
        { prompt: "بیست متر پیش از یک تقاطع، جاده خالی", answer: 0, explain: "نزدیکِ تقاطع همیشه ممنوع است، حتی اگر جاده خالی باشد." },
        { prompt: "روی برآمدگیِ یک جاده‌ی روستایی", answer: 0, explain: "پشتِ برآمدگی دیده نمی‌شود: ممنوع." },
        { prompt: "آزادراهِ سه‌خطه، شب، هیچ ماشینی نیست", answer: 0, explain: "در آزادراه دور زدن همیشه ممنوع است." },
        { prompt: "خیابانِ دوطرفه‌ی باریک در آبادی، دید خوب، با دو بار جلو و عقب", answer: 1, explain: "جاده‌ی باریک ممنوعیت نیست؛ چند حرکت مجاز است اگر خطر یا مزاحمت نسازی." },
        { prompt: "جاده‌ی مستقیم در مهِ غلیظ", answer: 0, explain: "دیدِ کم یعنی ممنوع." },
      ],
      takeaway: "اول جا را بپرس (تقاطع، پیچ، برآمدگی، آزادراه)، بعد دید را، بعد ترافیک را.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'inversione di marcia · l'inversione del senso di marcia", fa: "دور زدن" },
        { it: "rinunciare a compiere la manovra", fa: "از مانور صرف‌نظر کردن", base: "rinunciare" },
        { it: "il traffico intenso e continuo", fa: "ترافیکِ سنگین و پیوسته" },
        { it: "la scarsa visibilità", fa: "دیدِ کم" },
        { it: "in vicinanza o in corrispondenza di", fa: "نزدیکِ … یا درست روی …" },
        { it: "il dosso", fa: "برآمدگی" },
        { it: "la linea di mezzeria", fa: "خطِ وسط", note: "continua = ممتد، tratteggiata = خط‌چین" },
        { it: "la segnalazione luminosa di pericolo", fa: "چراغِ خطر (چهار راهنما با هم)" },
      ],
    },
    {
      kind: "trap",
      title: "«دیدِ کم» همیشه یعنی نه",
      body: "هر دو جمله درباره‌ی دیدِ کم است. اولی می‌گوید از مانور بگذر، دومی یک شرط (خط‌چین) می‌سازد که دیدِ کم را بی‌اثر کند:",
      examples: [
        {
          sourceId: "4609",
          textIt: "Il conducente che intende effettuare l'inversione di marcia su una strada a doppio senso deve rinunciare ad eseguire la manovra, se vi è scarsa visibilità",
          answer: 1,
          chunks: [
            { it: INV, fa: INV_FA, verb: "intende ← intendere" },
            { it: "deve rinunciare ad eseguire la manovra,", fa: "باید از انجامِ مانور صرف‌نظر کند،", verb: "deve ← dovere" },
            { it: "se vi è scarsa visibilità", fa: "اگر دید کم باشد", focus: "condition" },
          ],
          translation: "راننده‌ای که می‌خواهد در جاده‌ی دوطرفه دور بزند، اگر دید کم باشد باید از انجامِ مانور صرف‌نظر کند.",
          why: "درست است. دیدِ کم یعنی کسی که می‌آید تو را دیر می‌بیند. قانون می‌خواهد پیش از هر مانور مطمئن شوی خطری نمی‌سازی، و با دیدِ کم نمی‌توانی؛ بانک این را ممنوعیتِ کامل می‌خواند.",
        },
        {
          sourceId: "4615",
          textIt: "Il conducente che intende effettuare l'inversione di marcia su una strada a doppio senso può compiere la manovra anche con scarsa visibilità, se la linea di mezzeria è tratteggiata",
          answer: 0,
          chunks: [
            { it: INV, fa: INV_FA, verb: "intende ← intendere" },
            { it: "può compiere la manovra anche con scarsa visibilità,", fa: "می‌تواند حتی با دیدِ کم مانور را انجام دهد،", verb: "può ← potere", focus: "contrast" },
            { it: "se la linea di mezzeria è tratteggiata", fa: "اگر خطِ وسط خط‌چین باشد", focus: "condition" },
          ],
          translation: "راننده‌ای که می‌خواهد در جاده‌ی دوطرفه دور بزند، اگر خطِ وسط خط‌چین باشد، می‌تواند حتی با دیدِ کم مانور را انجام دهد.",
          why: "غلط است. خط‌چین فقط می‌گوید از خط می‌شود رد شد؛ دیدِ کم را جبران نمی‌کند.",
        },
      ],
      takeaway: "هیچ خط‌کشی یا شرطی دیدِ کم را برای دور زدن جبران نمی‌کند.",
      rule: `${CDS_154} c.1, c.6`,
    },
  ],
  practice: [
    {
      sourceId: "4608",
      textIt: "Il conducente che intende effettuare l'inversione di marcia su una strada a doppio senso deve rinunciare a compiere la manovra, qualora vi sia traffico intenso e continuo",
      answer: 1,
      chunks: [
        { it: INV, fa: INV_FA, verb: "intende ← intendere" },
        { it: "deve rinunciare a compiere la manovra,", fa: "باید از انجامِ مانور صرف‌نظر کند،", verb: "deve ← dovere" },
        { it: "qualora vi sia traffico intenso e continuo", fa: "اگر ترافیکِ سنگین و پیوسته باشد", focus: "condition", verb: "sia ← essere" },
      ],
      translation: "راننده‌ای که می‌خواهد در جاده‌ی دوطرفه دور بزند، اگر ترافیکِ سنگین و پیوسته باشد باید از انجامِ مانور صرف‌نظر کند.",
      why: "درست است (قدم ۱). در ترافیکِ پیوسته جای خالی پیدا نمی‌کنی بی‌آن‌که کسی را مجبور به ترمز کنی؛ این همان «خطر یا مزاحمت» است که ماده‌ی ۱۵۴ منع می‌کند.",
      rule: `${CDS_154} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "4613",
      textIt: "Il conducente che intende effettuare l'inversione di marcia su una strada a doppio senso può compiere la manovra anche in curva, se dà precedenza a tutti i veicoli",
      answer: 0,
      chunks: [
        { it: INV, fa: INV_FA, verb: "intende ← intendere" },
        { it: "può compiere la manovra anche in curva,", fa: "می‌تواند حتی در پیچ مانور را انجام دهد،", verb: "può ← potere", focus: "contrast" },
        { it: "se dà precedenza a tutti i veicoli", fa: "اگر به همه‌ی وسیله‌ها راه بدهد", focus: "condition", verb: "dà ← dare" },
      ],
      translation: "راننده‌ای که می‌خواهد در جاده‌ی دوطرفه دور بزند، اگر به همه‌ی وسیله‌ها راه بدهد، می‌تواند حتی در پیچ مانور را انجام دهد.",
      why: "غلط است (قدم ۱). راه دادن به همه شرطِ هر دور زدنی است، ولی جای ممنوع را مجاز نمی‌کند: در پیچ کسی که می‌آید تو را نمی‌بیند.",
      rule: `${CDS_154} c.6`,
      conceptStep: 1,
    },
    {
      sourceId: "4619",
      textIt: "Nelle strade a doppio senso non è consentito effettuare l'inversione del senso di marcia in tutti i casi di scarsa visibilità",
      answer: 1,
      chunks: [
        { it: "Nelle strade a doppio senso", fa: "در جاده‌های دوطرفه" },
        { it: "non è consentito effettuare l'inversione del senso di marcia", fa: "دور زدن مجاز نیست", focus: "negation" },
        { it: "in tutti i casi di scarsa visibilità", fa: "در هر حالتی که دید کم است", focus: "always" },
      ],
      translation: "در جاده‌های دوطرفه، در هر حالتی که دید کم است، دور زدن مجاز نیست.",
      why: "درست است (قدم ۲). دیدِ کم همان مشکلِ پیچ و برآمدگی را دارد: کسی که می‌آید تو را به‌موقع نمی‌بیند.",
      rule: `${CDS_154} c.1, c.6`,
      conceptStep: 2,
    },
    {
      sourceId: "4623",
      textIt: "Fuori dai centri abitati non è consentito effettuare l'inversione di marcia",
      answer: 0,
      chunks: [
        { it: "Fuori dai centri abitati", fa: "بیرون از آبادی‌ها", focus: "condition" },
        { it: "non è consentito effettuare l'inversione di marcia", fa: "دور زدن مجاز نیست", focus: "negation" },
      ],
      translation: "بیرون از آبادی‌ها دور زدن مجاز نیست.",
      why: "غلط است (قدم ۲). ممنوعیت به جا بستگی دارد (تقاطع، پیچ، برآمدگی، دیدِ کم) و به نوعِ جاده (آزادراه)، نه به بیرونِ آبادی بودن.",
      rule: `${CDS_154} c.6`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // how: give way to all, indicator for the whole manoeuvre, give up in heavy traffic or poor visibility
      sourceIds: ["4607", "4608", "4609", "4610", "4611", "4612", "4613", "4614", "4615", "4616", "4532", "4561"],
    },
    {
      step: 2,
      // where never: junctions, curves, dossi, poor visibility, autostrade; invented bans
      sourceIds: ["4617", "4618", "4619", "4620", "4621", "4622", "4623", "4624", "4581"],
    },
  ],
};

// ── Lesson 8 ──────────────────────────────────────────────────────────────────

export const lessonImmettersi: Lesson = {
  id: "norme-immettersi",
  titleFa: "راه افتادن، دنده‌عقب و کنار کشیدن",
  titleIt: "IMMETTERSI · RETROMARCIA · FERMARSI AL MARGINE",
  minutes: 5,
  signs: [],
  figures: [676],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی وقتی از حالتِ ایستاده واردِ ترافیک می‌شوی (از لبه‌ی سواره‌رو، از ملکِ خصوصی یا ورودیِ خودرو به ملک، یا با دنده‌عقب) و وقتی کنارِ لبه‌ی راست می‌ایستی، همیشه همان سه کار را می‌کنی: مطمئن می‌شوی خطری نمی‌سازی، با چراغ راهنما از قبل اعلام می‌کنی، و به کسانی که در حرکت‌اند راه می‌دهی.",
      why:
        "۴۹ سؤال، تقریباً همه با یک الگو. دام‌ها هم تکراری‌اند: «اگر کسی نمی‌آید چراغ راهنما لازم نیست»، «فقط به یک جهت یا جز دوچرخه‌ها راه بده»، «چراغِ خطر یا بوق بزن»، «تند برو تا زودتر تمام شود»، «کمربند را بعد ببند».",
      rule: `${CDS_154} c.1–3, c.5, c.8; Codice della Strada, art. 145 c.6`,
    },
    {
      kind: "table",
      title: "از حالتِ ایستاده واردِ ترافیک شدن",
      body:
        "کسی که در جاده حرکت می‌کند از تو انتظار ندارد. پس هر بار که از لبه‌ی سواره‌رو، از یک ملکِ خصوصی یا از ورودیِ خودرو به ملک بیرون می‌آیی، تو باید راه بدهی، از هر دو طرف.",
      columns: ["چه کنی", "دامِ بانک"],
      rows: [
        {
          label: "اول نگاه کن",
          it: "posizione, distanza, direzione degli altri utenti",
          values: ["جای دیگران، فاصله‌شان و جهتِ حرکتشان را بسنج؛ در آینه نگاه کن و با چشم هم وارسی کن", "«اگر کسی نمی‌آید لازم نیست» در هیچ جمله‌ای درست نیست"],
        },
        {
          label: "چراغ راهنما، از قبل",
          it: "l'indicatore di direzione con sufficiente anticipo",
          values: ["همیشه، حتی اگر جاده خالی به نظر برسد", "«اگر کسی نمی‌آید می‌شود روشنش نکرد» غلط است"],
        },
        {
          label: "به همه‌ی کسانی که در حرکت‌اند راه بده",
          it: "dare la precedenza ai veicoli in transito",
          values: ["از راست و از چپ، دوچرخه‌ها هم", "«فقط وقتی تابلو هست» و «جز دوچرخه‌ها» غلط است: این وظیفه از قانون می‌آید، نه از تابلو"],
        },
        {
          label: "بیرون آمدن از ملکِ خصوصی یا ورودیِ خودرو به ملک",
          it: "uscire da una proprietà privata · da un passo carrabile",
          values: ["آهسته، با احتیاط، به‌خصوص با دنده‌عقب؛ به عابرِ پیاده‌رو هم راه بده", "«تو بر عابر حق تقدم داری» و «باید بوق بزنی» غلط است"],
        },
        {
          label: "کمربند و کلاه ایمنی",
          it: "allacciare la cintura · indossare il casco",
          values: ["پیش از راه افتادن، نه بعد از مانور", "«بعد از تمام شدنِ مانور» غلط است. موتورسیکلت‌سوار نورِ پایین را هم روشن می‌کند"],
        },
      ],
      takeaway: "از حالتِ ایستاده: کمربند یا کلاه → آینه و نگاه → چراغ راهنما → به همه راه بده. هیچ تابلویی لازم نیست تا این وظیفه‌ها باشند.",
      rule: `${CDS_154} c.1, c.3 lett. c; Codice della Strada, art. 145 c.6; artt. 171–172`,
    },
    {
      kind: "table",
      title: "بیرون آمدن با دنده‌عقب",
      body:
        "شکلِ ۶۷۶ بانک خودرویی را نشان می‌دهد که با دنده‌عقب از جای پارک بیرون می‌آید. این همان واردِ ترافیک شدن است، با یک سختیِ بیشتر: پشتِ سرت را خوب نمی‌بینی. یکی از جمله‌های بانک به‌جای «S» نوشته «E»؛ موضوع همان است.",
      columns: ["چه کنی", "دامِ بانک"],
      rows: [
        { label: "به همه راه بده", it: "precedenza a tutti i veicoli · sia da destra che da sinistra", values: ["از هر دو جهت", "«فقط به کسانی که در جهتِ خودت می‌آیند» و «جز دوچرخه‌ها» غلط است"] },
        { label: "عابرِ پشتِ سر", it: "pedoni in transito dietro di esso", values: ["مراقبش باش و به او راه بده", "عابر پشتِ خودرو کوتاه و دیرپیداست، به‌خصوص بچه"] },
        { label: "چراغ راهنما", it: "azionare gli indicatori di direzione", values: ["روشن کن؛ نشان می‌دهد به کدام طرف می‌روی", "«چراغِ خطر» و «چراغِ مه‌شکنِ عقب» غلط است"] },
        { label: "آهسته و با احتیاط", it: "con particolare prudenza", values: ["مطمئن شو جاده خالی است، آرام حرکت کن", "«تند مانور بده تا جای پارک زود خالی شود» و «پشتِ سرِ هم بوق بزن» غلط است"] },
      ],
      takeaway: "دنده‌عقب برای واردِ ترافیک شدن: همان چراغ راهنما و راه دادن به همه، به‌اضافه‌ی عابرِ پشتِ سر. چراغِ خطر، مه‌شکن، بوق و عجله نه.",
      rule: `${CDS_154} c.1–3 lett. c`,
    },
    {
      kind: "table",
      title: "کنار کشیدن و ایستادن کنارِ لبه‌ی راست",
      body:
        "ایستادن کنارِ جاده همان مانور است، برعکس: از جریانِ ترافیک بیرون می‌آیی. کسی که پشتِ توست باید بداند می‌خواهی بایستی، پیش از آن‌که ترمز کنی.",
      columns: ["چه کنی", "دامِ بانک"],
      rows: [
        { label: "از قبل اعلام کن", it: "segnalare con sufficiente anticipo", values: ["با چراغ راهنما", "«چراغِ خطر» یا «چند بار نور دادن» غلط است؛ «اگر ترافیک کم است لازم نیست» هم غلط است"] },
        { label: "دیگران را بسنج", it: "posizione, distanza, direzione", values: ["مثلِ راه افتادن: جای، فاصله و جهتِ بقیه", "به‌خصوص دوچرخه و موتورسیکلتی که از پشت در لبه‌ی راست می‌آید"] },
        { label: "ترمزِ ناگهانی نه", it: "evitare brusche frenate", values: ["آرام کم کن", "خودروی پشت فرصتِ واکنش لازم دارد (فصل ۱۲)"] },
        { label: "امتیازِ گواهینامه", it: "la perdita di punti", values: ["مانورِ بی‌اعلام = ۲ امتیاز کم می‌شود، به‌اضافه‌ی جریمه", "«امتیاز کم نمی‌شود، فقط جریمه» غلط است؛ «۴ امتیاز» هم غلط است. دور زدنِ نزدیکِ تقاطع، پیچ یا برآمدگی ۸ امتیاز است"] },
      ],
      takeaway: "ایستادن کنارِ جاده هم مانور است: چراغ راهنما از قبل، آرام، با چشم به دوچرخه‌ها. تخلف = ۲ امتیاز.",
      rule: `${CDS_154} c.1, c.5, c.8; Codice della Strada, art. 126-bis (tabella)`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "immettersi nel flusso della circolazione", fa: "واردِ جریانِ ترافیک شدن", base: "immettersi" },
        { it: "i veicoli in transito", fa: "وسیله‌هایی که در حال عبورند" },
        { it: "con sufficiente anticipo", fa: "به‌اندازه‌ی کافی از قبل" },
        { it: "la retromarcia", fa: "دنده‌عقب" },
        { it: "il passo carrabile", fa: "ورودیِ خودرو به ملک" },
        { it: "la proprietà privata", fa: "ملکِ خصوصی" },
        { it: "allacciare la cintura di sicurezza", fa: "کمربندِ ایمنی را بستن", base: "allacciare" },
        { it: "la brusca frenata", fa: "ترمزِ ناگهانی" },
        { it: "la sottrazione di punti dalla patente", fa: "کم شدنِ امتیاز از گواهینامه" },
      ],
    },
    {
      kind: "trap",
      title: "راه دادن تابلو نمی‌خواهد",
      body: "هر دو جمله می‌گویند به وسیله‌هایی که در حال عبورند راه بده. دومی یک «فقط» اضافه می‌کند:",
      examples: [
        {
          sourceId: "4652",
          textIt: "Il conducente che intende immettersi nel flusso della circolazione deve dare la precedenza ai veicoli in transito",
          answer: 1,
          chunks: [
            { it: IMM, fa: IMM_FA, verb: "intende ← intendere" },
            { it: "deve dare la precedenza ai veicoli in transito", fa: "باید به وسیله‌هایی که در حال عبورند راه بدهد", verb: "deve ← dovere" },
          ],
          translation: "راننده‌ای که می‌خواهد واردِ جریانِ ترافیک شود، باید به وسیله‌هایی که در حال عبورند راه بدهد.",
          why: "درست است. ماده‌ی ۱۵۴ بند ۳: کسی که واردِ ترافیک می‌شود به کسانی که در حرکتِ عادی‌اند راه می‌دهد.",
        },
        {
          sourceId: "4654",
          textIt: "Il conducente che intende immettersi nel flusso della circolazione deve dare la precedenza ai veicoli in transito solo in presenza di apposito segnale",
          answer: 0,
          chunks: [
            { it: IMM, fa: IMM_FA, verb: "intende ← intendere" },
            { it: "deve dare la precedenza ai veicoli in transito", fa: "باید به وسیله‌هایی که در حال عبورند راه بدهد", verb: "deve ← dovere" },
            { it: "solo in presenza di apposito segnale", fa: "فقط وقتی تابلوی مخصوص هست", focus: "limit" },
          ],
          translation: "راننده‌ای که می‌خواهد واردِ جریانِ ترافیک شود، فقط وقتی تابلوی مخصوص هست باید به وسیله‌هایی که در حال عبورند راه بدهد.",
          why: "غلط است. این وظیفه از خودِ قانون می‌آید؛ تابلو لازم ندارد.",
        },
      ],
      takeaway: "«فقط با تابلو»، «فقط از یک طرف» و «جز دوچرخه‌ها» سه شکلِ یک دام‌اند: وارد شونده به همه راه می‌دهد.",
      rule: `${CDS_154} c.3 lett. c`,
    },
  ],
  practice: [
    {
      sourceId: "4660",
      textIt: "Il conducente che parte dal margine della carreggiata e si immette nel flusso della circolazione può allacciare la cintura di sicurezza dopo avere concluso tale manovra",
      answer: 0,
      chunks: [
        { it: PART, fa: PART_FA, verb: "parte ← partire; si immette ← immettersi" },
        { it: "può allacciare la cintura di sicurezza", fa: "می‌تواند کمربندِ ایمنی را ببندد", verb: "può ← potere" },
        { it: "dopo avere concluso tale manovra", fa: "بعد از تمام کردنِ این مانور", focus: "contrast" },
      ],
      translation: "راننده‌ای که از لبه‌ی سواره‌رو راه می‌افتد و واردِ جریانِ ترافیک می‌شود، می‌تواند کمربندِ ایمنی را بعد از تمام کردنِ این مانور ببندد.",
      why: "غلط است (قدم ۱). کمربند (و برای موتورسیکلت، کلاه ایمنی) پیش از راه افتادن بسته می‌شود؛ مانور هم بخشی از رانندگی است.",
      rule: "Codice della Strada, artt. 171–172",
      conceptStep: 1,
    },
    {
      sourceId: "4344",
      textIt: "Il veicolo S, muovendosi in retromarcia per immettersi nella circolazione, deve fare attenzione agli eventuali pedoni in transito dietro di esso e dar loro la precedenza",
      answer: 1,
      figure: 676,
      chunks: [
        { it: RETRO, fa: RETRO_FA, verb: "muovendosi ← muoversi" },
        { it: "deve fare attenzione agli eventuali pedoni in transito dietro di esso", fa: "باید مراقبِ عابرانی باشد که احتمالاً پشتِ آن رد می‌شوند", verb: "deve ← dovere" },
        { it: "e dar loro la precedenza", fa: "و به آن‌ها راه بدهد" },
      ],
      translation: "خودروی S، که با دنده‌عقب حرکت می‌کند تا واردِ ترافیک شود، باید مراقبِ عابرانی باشد که احتمالاً پشتِ آن رد می‌شوند و به آن‌ها راه بدهد.",
      why: "درست است (قدم ۲). پشتِ خودرو کمتر دیده می‌شود و عابر، به‌خصوص بچه، ممکن است درست همان‌جا باشد.",
      rule: `${CDS_154} c.1, c.3 lett. c`,
      conceptStep: 2,
    },
    {
      sourceId: "4347",
      textIt: "Il veicolo S, muovendosi in retromarcia per immettersi nella circolazione, deve azionare la segnalazione luminosa di pericolo",
      answer: 0,
      figure: 676,
      chunks: [
        { it: RETRO, fa: RETRO_FA, verb: "muovendosi ← muoversi" },
        { it: "deve azionare la segnalazione luminosa di pericolo", fa: "باید چراغِ خطر (چهار راهنما با هم) را روشن کند", verb: "deve ← dovere" },
      ],
      translation: "خودروی S، که با دنده‌عقب حرکت می‌کند تا واردِ ترافیک شود، باید چراغِ خطر (چهار راهنما با هم) را روشن کند.",
      why: "غلط است (قدم ۲). این مانور با چراغ راهنما اعلام می‌شود؛ چراغِ خطر نمی‌گوید به کدام طرف می‌روی.",
      rule: `${CDS_154} c.1–2`,
      conceptStep: 2,
    },
    {
      sourceId: "4671",
      textIt: "Il conducente che intende fermarsi sul margine destro della carreggiata deve evitare di creare pericolo ai conducenti di veicoli a due ruote sopraggiungenti",
      answer: 1,
      chunks: [
        { it: FERM, fa: FERM_FA, verb: "intende ← intendere" },
        { it: "deve evitare di creare pericolo", fa: "باید از ایجادِ خطر پرهیز کند", verb: "deve ← dovere" },
        { it: "ai conducenti di veicoli a due ruote sopraggiungenti", fa: "برای رانندگانِ وسیله‌های دوچرخی‌ای که از پشت می‌رسند" },
      ],
      translation: "راننده‌ای که می‌خواهد کنارِ لبه‌ی راستِ سواره‌رو بایستد، باید از ایجادِ خطر برای رانندگانِ وسیله‌های دوچرخی‌ای که از پشت می‌رسند پرهیز کند.",
      why: "درست است (قدم ۳). دوچرخه و موتورسیکلت معمولاً درست در لبه‌ی راست می‌آیند؛ کنار کشیدنِ ناگهانی راهشان را می‌بندد.",
      rule: `${CDS_154} c.1`,
      conceptStep: 3,
    },
    {
      sourceId: "4679",
      textIt:
        "In caso di fermata sul margine destro della carreggiata senza segnalare con sufficiente anticipo l'intenzione di effettuare tale manovra, è disposta la sottrazione di 4 punti dalla patente del conducente",
      answer: 0,
      chunks: [
        { it: "In caso di fermata sul margine destro della carreggiata", fa: "در صورتِ ایستادن کنارِ لبه‌ی راستِ سواره‌رو", focus: "condition" },
        { it: "senza segnalare con sufficiente anticipo l'intenzione di effettuare tale manovra,", fa: "بی‌آن‌که قصدِ این مانور به‌اندازه‌ی کافی از قبل اعلام شود،" },
        { it: "è disposta la sottrazione di 4 punti", fa: "۴ امتیاز کم می‌شود", verb: "è disposta ← disporre", focus: "contrast" },
        { it: "dalla patente del conducente", fa: "از گواهینامه‌ی راننده" },
      ],
      translation: "اگر راننده کنارِ لبه‌ی راستِ سواره‌رو بایستد بی‌آن‌که قصدش را به‌اندازه‌ی کافی از قبل اعلام کند، ۴ امتیاز از گواهینامه‌اش کم می‌شود.",
      why: "غلط است (قدم ۳). امتیاز کم می‌شود، ولی ۲ تا، نه ۴ (ماده‌ی ۱۵۴ بند ۸ در جدولِ امتیازها). ۸ امتیاز مالِ دور زدنِ نزدیکِ تقاطع، پیچ یا برآمدگی است.",
      rule: `${CDS_154} c.8; Codice della Strada, art. 126-bis (tabella)`,
      conceptStep: 3,
    },
  ],
  related: [
    {
      step: 1,
      // entering the flow, setting off from the margin, leaving private property or a passo carrabile
      sourceIds: [
        "4649", "4650", "4651", "4652", "4653", "4654", "4655", "4656", "4657", "4658", "4659", "4660", "4661",
        "4560", "4563", "4594", "4595", "4596", "4598", "4599",
      ],
    },
    {
      step: 2,
      // reversing out (bank figure 676)
      sourceIds: [
        "4342", "4343", "4344", "4345", "4346", "4347", "4348", "4349", "4350", "4351",
        "4662", "4663", "4664", "4665", "4666", "4667", "4668", "4562",
      ],
    },
    {
      step: 3,
      // stopping at the right margin; points for these manoeuvres
      sourceIds: ["4669", "4670", "4671", "4672", "4673", "4674", "4675", "4676", "4677", "4678", "4679"],
    },
  ],
};
