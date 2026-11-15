/**
 * src/content/ch22-alcol.ts
 * Chapter 22 (Alcool, droga e primo soccorso), lessons 1–2: what alcohol does to
 * the abilities driving needs (bank groups 581, 595), and why only time brings a
 * driver back, plus what the law says (groups 577, 580, 581: CdS artt. 186,
 * 186-bis). Reaction time and drowsiness (6586, 6587, 6488, 6590) stay in
 * chapter 12 lesson «یک ثانیه، بدون ترمز» and are linked, not copied.
 *
 * Deliberately no "how many drinks / how many hours" numbers anywhere: the
 * course never helps a learner estimate when they are "safe" to drive.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter22.test.ts.
 */
import type { Lesson } from "./lessons.js";

const CDS = (n: string) => `Codice della Strada, art. ${n}`;
const MINSAL = "Ministero della Salute, pieghevole «Alcol» (Osservatorio Nazionale Alcol – ISS, 2018)";
const ALCOOL = "L'assunzione di alcool";
const ALCOOL_FA = "مصرفِ الکل";
const ECCESSO = "Un conducente che ha assunto una quantità eccessiva di bevande alcoliche";
const ECCESSO_FA = "راننده‌ای که بیش از حد نوشیدنیِ الکلی خورده";
const RECUPERARE = "può recuperare velocemente l'idoneità alla guida";
const RECUPERARE_FA = "می‌تواند به‌سرعت آمادگی برای رانندگی را دوباره به دست بیاورد";
const SELF_CHECK =
  "تمرینِ آموزشی است، نه سؤالِ بانک. مثال‌ها ساختگی‌اند و جواب‌ها ثابت؛ چیزی ذخیره نمی‌شود.";

export const lessonAlcolEffetti: Lesson = {
  id: "alcol-effetti-guida",
  titleFa: "الکل با رانندگی چه می‌کند",
  titleIt: "ALCOOL E CAPACITÀ DI GUIDA",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی الکل کدام توانایی‌های رانندگی را خراب می‌کند: سنجیدنِ خطر، توجه و تمرکز، و واکنش. و چهار ادعای رایج را می‌شناسی که الکل را «کمک» جلوه می‌دهند.",
      why:
        "۸ سؤال. نیمی از آن‌ها اثرِ واقعیِ الکل را می‌گویند (درست)، نیمی ادعا می‌کنند الکل رانندگی را بهتر می‌کند (غلط). کلید ساده است: الکل هیچ توانایی‌ای را بیشتر نمی‌کند.",
      rule: MINSAL,
    },
    {
      kind: "table",
      title: "سه چیزی که الکل خراب می‌کند",
      body:
        "الکل حالِ آدم را «خوب» می‌کند و همین خطرناک است: حسِ اعتمادبه‌نفس بالا می‌رود، در حالی که توانایی پایین آمده. به گفته‌ی وزارتِ بهداشتِ ایتالیا، الکل درکِ خطر را به‌شدت پایین می‌آورد و واکنش به آنچه می‌بینی و می‌شنوی را ضعیف می‌کند. سه گروهِ اثر:",
      columns: ["اثر", "در رانندگی یعنی"],
      rows: [
        { label: "سنجیدنِ خطر", it: "euforia · eccitazione · imprudenza", values: ["سرخوشی و هیجان؛ خطر را کمتر از واقع می‌بینی", "تندتر می‌روی، با فاصله‌ی کم سبقت می‌گیری، به چیزی که «حتماً می‌شود» تکیه می‌کنی"] },
        { label: "توجه و تمرکز", it: "concentrazione e attenzione", values: ["تمرکز و توجه کم می‌شود؛ خواب‌آلودگی می‌آورد", "تابلو، عابر یا ترمزِ خودروی جلو را دیرتر می‌بینی یا اصلاً نمی‌بینی"] },
        { label: "واکنش", it: "rallentare i riflessi", values: ["بازتاب‌ها کُند می‌شوند", "از دیدن تا ترمز زمانِ بیشتری می‌گذرد و خودرو در این مدت بی‌ترمز جلو می‌رود؛ این را در فصلِ ۱۲، درسِ «یک ثانیه، بدون ترمز»، با متر دیده‌ای"] },
      ],
      takeaway: "الکل حس را بالا می‌برد و توانایی را پایین. هر جمله‌ای که بگوید الکل یکی از این سه را «بهتر» می‌کند، غلط است.",
      rule: MINSAL,
    },
    {
      kind: "table",
      title: "چهار ادعا که الکل را کمک جلوه می‌دهند",
      body: "بانک همان چیزهایی را که الکل خراب می‌کند برعکس می‌گوید. هر چهار ادعا غلط‌اند:",
      columns: ["ادعا", "واقعیت"],
      rows: [
        { label: "تمرکز بیشتر", it: "fa aumentare la capacità di concentrazione", values: ["«الکل تمرکز را بالا می‌برد»", "تمرکز را پایین می‌آورد"] },
        { label: "هوشیار و دقیق", it: "rende più vigili e attenti", values: ["«الکل آدم را هوشیارتر و دقیق‌تر می‌کند»", "توجه کم می‌شود و خواب‌آلودگی می‌آید"] },
        { label: "امن‌تر و شادتر", it: "più sicura, più allegra e meno noiosa", values: ["«رانندگی امن‌تر، شادتر و کم‌ملال‌تر می‌شود»", "شاد شدن همان سرخوشی‌ای است که خطر را کوچک نشان می‌دهد"] },
        { label: "دیدِ بهتر", it: "migliora la vista", values: ["«الکل بینایی را بهتر می‌کند»", "الکل هیچ کمکی به بینایی نمی‌کند؛ دیدن و واکنش به آنچه می‌بینی ضعیف‌تر می‌شود"] },
      ],
      takeaway: "«facilita»، «più sicura»، «migliora»، «più vigili» کنارِ الکل یعنی جمله غلط است.",
      rule: MINSAL,
    },
    {
      kind: "classify",
      title: "این اثر به کدام توانایی می‌خورد؟",
      body: `${SELF_CHECK} هر موقعیت درباره‌ی راننده‌ای است که پیش از رانندگی نوشیده. بگو کدام توانایی آسیب دیده:`,
      options: [
        { it: "valutare il pericolo", fa: "سنجیدنِ خطر" },
        { it: "attenzione", fa: "توجه و تمرکز" },
        { it: "riflessi", fa: "واکنش" },
      ],
      items: [
        { prompt: "مطمئن است پیچ را با سرعتِ زیاد هم می‌گیرد و آهسته نمی‌کند", answer: 0, explain: "سرخوشی خطر را کوچک نشان می‌دهد: تصمیمِ بد، نه دیدنِ بد." },
        { prompt: "تابلوی «ایست» را که جلوی چشمش بوده اصلاً ندیده", answer: 1, explain: "دیدن به توجه نیاز دارد؛ الکل توجه را کم می‌کند." },
        { prompt: "چراغِ ترمزِ جلویی را دیده، ولی پایش دیرتر از همیشه به ترمز رسیده", answer: 2, explain: "دیده و فهمیده، ولی بازتاب کُند بوده: واکنش." },
        { prompt: "پلک‌هایش سنگین شده و چند لحظه حواسش از جاده رفته", answer: 1, explain: "خواب‌آلودگی همان افتِ توجه است." },
        { prompt: "پشتِ یک کامیون، با دیدِ کم، سبقت می‌گیرد چون «حتماً جا هست»", answer: 0, explain: "خطرِ واقعی را کم سنجیده؛ این بی‌احتیاطیِ ناشی از الکل است." },
        { prompt: "عابری ناگهان وارد خیابان می‌شود و او فرمان را دیر می‌چرخاند", answer: 2, explain: "واکنش به یک اتفاقِ ناگهانی کُند شده." },
      ],
      takeaway: "الکل در هر سه مرحله آسیب می‌زند: دیدن، تصمیم گرفتن، و انجام دادن.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'assunzione di alcool", fa: "مصرفِ الکل" },
        { it: "l'euforia", fa: "سرخوشی" },
        { it: "la sottovalutazione del pericolo", fa: "کم گرفتنِ خطر" },
        { it: "l'imprudenza", fa: "بی‌احتیاطی" },
        { it: "i riflessi", fa: "بازتاب‌ها (واکنش‌های سریعِ بدن)" },
        { it: "la sonnolenza", fa: "خواب‌آلودگی" },
        { it: "la concentrazione", fa: "تمرکز" },
        { it: "vigile", fa: "هوشیار", note: "plurale: vigili" },
      ],
    },
    {
      kind: "trap",
      title: "«attenzione» و «attenti»: کم یا زیاد؟",
      body: "هر دو جمله درباره‌ی توجه حرف می‌زنند. یکی می‌گوید الکل آن را کم می‌کند، دیگری زیاد:",
      examples: [
        {
          sourceId: "6589",
          textIt: "L'assunzione di alcool può far diminuire il livello di attenzione",
          answer: 1,
          chunks: [
            { it: ALCOOL, fa: ALCOOL_FA },
            { it: "può far diminuire", fa: "می‌تواند پایین بیاورد", verb: "può ← potere" },
            { it: "il livello di attenzione", fa: "سطحِ توجه را" },
          ],
          translation: "مصرفِ الکل می‌تواند سطحِ توجه را پایین بیاورد.",
          why: "درست است. افتِ توجه یکی از سه اثرِ اصلیِ الکل است.",
        },
        {
          sourceId: "6592",
          textIt: "L'assunzione di alcool facilita la guida, perché rende più vigili e attenti",
          answer: 0,
          chunks: [
            { it: ALCOOL, fa: ALCOOL_FA },
            { it: "facilita la guida,", fa: "رانندگی را آسان‌تر می‌کند،", verb: "facilita ← facilitare", focus: "contrast" },
            { it: "perché rende più vigili e attenti", fa: "چون آدم را هوشیارتر و دقیق‌تر می‌کند", focus: "reason" },
          ],
          translation: "مصرفِ الکل رانندگی را آسان‌تر می‌کند، چون آدم را هوشیارتر و دقیق‌تر می‌کند.",
          why: "غلط است. الکل توجه را کم می‌کند و خواب‌آلودگی می‌آورد.",
        },
      ],
      takeaway: "جهت را ببین: «diminuire» کنارِ الکل درست است؛ «più vigili»، «aumentare la concentrazione» غلط.",
      rule: MINSAL,
    },
  ],
  practice: [
    {
      sourceId: "6484",
      textIt: "L'alcool può causare uno stato di euforia, con conseguente sottovalutazione del pericolo",
      answer: 1,
      chunks: [
        { it: "L'alcool può causare uno stato di euforia,", fa: "الکل می‌تواند حالتِ سرخوشی بیاورد،", verb: "può ← potere" },
        { it: "con conseguente sottovalutazione del pericolo", fa: "و در نتیجه خطر کم گرفته شود", focus: "reason" },
      ],
      translation: "الکل می‌تواند حالتِ سرخوشی بیاورد و در نتیجه خطر کم گرفته شود.",
      why: "درست است (قدم ۱). سرخوشی حس را بالا می‌برد و خطر را کوچک نشان می‌دهد.",
      rule: MINSAL,
      conceptStep: 1,
    },
    {
      sourceId: "6585",
      textIt: "L'assunzione di alcool rende meno sicura la guida, poiché può provocare eccitazione e imprudenza",
      answer: 1,
      chunks: [
        { it: ALCOOL, fa: ALCOOL_FA },
        { it: "rende meno sicura la guida,", fa: "رانندگی را کم‌ایمن‌تر می‌کند،", verb: "rende ← rendere" },
        { it: "poiché può provocare eccitazione e imprudenza", fa: "چون می‌تواند هیجان و بی‌احتیاطی بیاورد", focus: "reason" },
      ],
      translation: "مصرفِ الکل رانندگی را کم‌ایمن‌تر می‌کند، چون می‌تواند هیجان و بی‌احتیاطی بیاورد.",
      why: "درست است (قدم ۱). هیجان و بی‌احتیاطی همان سنجیدنِ بدِ خطر است.",
      rule: MINSAL,
      conceptStep: 1,
    },
    {
      sourceId: "6591",
      textIt: "L'assunzione di alcool facilita la guida, perché fa aumentare la capacità di concentrazione",
      answer: 0,
      chunks: [
        { it: ALCOOL, fa: ALCOOL_FA },
        { it: "facilita la guida,", fa: "رانندگی را آسان‌تر می‌کند،", verb: "facilita ← facilitare", focus: "contrast" },
        { it: "perché fa aumentare la capacità di concentrazione", fa: "چون توانِ تمرکز را بالا می‌برد", focus: "reason" },
      ],
      translation: "مصرفِ الکل رانندگی را آسان‌تر می‌کند، چون توانِ تمرکز را بالا می‌برد.",
      why: "غلط است (قدم ۲). الکل تمرکز را پایین می‌آورد، نه بالا.",
      rule: MINSAL,
      conceptStep: 2,
    },
    {
      sourceId: "6594",
      textIt: "L'assunzione di alcool migliora la vista",
      answer: 0,
      chunks: [
        { it: ALCOOL, fa: ALCOOL_FA },
        { it: "migliora la vista", fa: "بینایی را بهتر می‌کند", verb: "migliora ← migliorare", focus: "contrast" },
      ],
      translation: "مصرفِ الکل بینایی را بهتر می‌کند.",
      why: "غلط است (قدم ۲). الکل هیچ توانایی‌ای، از جمله بینایی، را بهتر نمی‌کند.",
      rule: MINSAL,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6484", "6585", "6588", "6589"] },
    { step: 2, sourceIds: ["6591", "6592", "6593", "6594"] },
  ],
};

export const lessonAlcolTempoLegge: Lesson = {
  id: "alcol-tempo-legge",
  titleFa: "فقط زمان؛ و آنچه قانون می‌گوید",
  titleIt: "ALCOOL: TEMPO, MITI E LEGGE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی که فقط گذشتِ زمان الکل را از خون بیرون می‌برد و قهوه، غذای شور یا غذای زیاد این کار را نمی‌کند. و می‌دانی قانونِ ایتالیا برای راننده‌ی مست چه می‌گوید: حدِ الکل، حدِ صفر برای راننده‌ی تازه‌کار، «arresto»، و اینکه دوچرخه هم استثنا نیست.",
      why:
        "۷ سؤال. چهار تا درباره‌ی «زود خوب شدن» است، یکی درباره‌ی الکل با غذا، دو تا درباره‌ی مجازات. این درس عمداً هیچ حسابی مثلِ «چند لیوان، چند ساعت» ندارد: هیچ عددی نمی‌گوید تو الان آماده‌ی رانندگی هستی.",
      rule: `${CDS("186")}; ${CDS("186-bis")}`,
    },
    {
      kind: "table",
      title: "فقط زمان الکل را پایین می‌آورد",
      body:
        "کبد الکل را با سرعتِ خودش تجزیه می‌کند و هیچ ترفندی آن را تند نمی‌کند. این سرعت از آدمی به آدمِ دیگر فرق دارد و تو آن را حس نمی‌کنی: «حالم خوب است» دلیلِ آماده بودن نیست. وزارتِ بهداشتِ ایتالیا می‌گوید برای کسی که می‌خواهد رانندگی کند سطحِ امنی از الکل وجود ندارد. آنچه بانک می‌پرسد:",
      columns: ["چه می‌گوید", "چرا"],
      rows: [
        { label: "چند ساعت لازم است", it: "è necessario che trascorrano alcune ore", values: ["درست", "زیاده‌روی یعنی ساعت‌ها؛ چقدر دقیقاً، از بیرون معلوم نیست"] },
        { label: "با دارو، کُندتر", it: "specie se ha assunto anche dei farmaci", values: ["درست", "الکل و بعضی داروها اثرِ هم را بیشتر می‌کنند (درسِ ۳)"] },
        { label: "قهوه‌ی تلخ", it: "se assume caffè amaro", values: ["غلط", "قهوه شاید خواب را کمی دور کند، ولی الکلِ خون را کم نمی‌کند"] },
        { label: "غذای شور", it: "se assume cibi piuttosto salati", values: ["غلط", "نمک هیچ اثری روی تجزیه‌ی الکل ندارد"] },
        { label: "الکلِ قوی با غذای زیاد", it: "superalcoliche, durante un pasto abbondante", values: ["غلط", "غذا الکل را بی‌اثر نمی‌کند؛ و غذای سنگین خودش توجه را کم می‌کند (درسِ ۴)"] },
      ],
      takeaway: "اگر قرار است رانندگی کنی، ننوش. اگر نوشیده‌ای، رانندگی نکن: کسِ دیگری براند، یا تاکسی و حمل‌ونقلِ عمومی.",
      rule: `${MINSAL}: «Non esiste un livello sicuro di alcol per chi si metta alla guida»`,
    },
    {
      kind: "table",
      title: "قانون: حد، صفر، و «arresto»",
      body:
        "ماده‌ی ۱۸۶ رانندگی در حالتِ مستی را ممنوع می‌کند و مجازات را با مقدارِ الکلِ خون (گرم در لیتر) بالا می‌برد. ماده‌ی ۱۸۶-bis برای بعضی راننده‌ها حد را صفر می‌گذارد. عددها فقط برای فهمیدنِ قانون‌اند: تو الکلِ خونت را حس نمی‌کنی و نمی‌توانی با آن حساب کنی.",
      columns: ["قاعده"],
      rows: [
        { label: "حدِ صفر", it: "art. 186-bis: 0 g/l", values: ["راننده‌ی زیرِ ۲۱ سال، راننده در سه سالِ اولِ گواهینامه‌ی B، و راننده‌های حرفه‌ای (مسافر، بار، خودروهای سنگین) نباید هیچ الکلی در خون داشته باشند. هر مقدارِ بیش از صفر تخلف است. اگر تازه گواهینامه گرفته‌ای، این قاعده‌ی توست."] },
        { label: "حدِ عمومی", it: "art. 186: 0,5 g/l", values: ["برای بقیه، بیش از ۰٫۵ تخلف است؛ از ۰٫۸ به بالا جرم (reato) است. مجازات پله‌پله سنگین‌تر می‌شود: جریمه، تعلیقِ گواهینامه، و در دو پله‌ی بالاتر «arresto»؛ در بالاترین پله توقیفِ خودرو هم."] },
        { label: "«arresto» یعنی حبس", it: "rischia l'arresto", values: ["در این ماده «arresto» مجازاتِ حبس است، نه «ایستادن» در فصلِ ۱۶. «rischia l'arresto» یعنی ممکن است به حبس محکوم شود."] },
        { label: "دوچرخه هم", it: "veicolo senza motore", values: ["ماده‌ی ۱۸۶ درباره‌ی «هر کسی که رانندگی می‌کند» است. دیوانِ عالیِ کشور (Cassazione) گفته دوچرخه‌سوارِ مست هم مرتکبِ جرم می‌شود؛ فقط تعلیقِ گواهینامه برایش اعمال نمی‌شود، چون دوچرخه گواهینامه نمی‌خواهد."] },
        { label: "بعد از محکومیت", it: "codici 68 e 69 (alcolock)", values: ["کسی که در دو پله‌ی بالا محکوم شود، روی گواهینامه‌اش کدهای ۶۸ و ۶۹ می‌آید: فقط خودرویی با الکل‌سنجِ قفل‌کننده (alcolock) که بی‌الکل بودن را می‌سنجد."] },
      ],
      takeaway: "تازه‌کار: صفر. بقیه: ۰٫۵، ولی «زیرِ حد» یعنی «بی‌خطر» نیست. حبس در کار است، و دوچرخه استثنا نیست.",
      rule: `${CDS("186")} c.1–2, c.9-ter; ${CDS("186-bis")} c.1–2; Cass. pen. sez. IV n. 4893/2015 (bicicletta)`,
    },
    {
      kind: "classify",
      title: "درست یا باورِ غلط؟",
      body: `${SELF_CHECK} هر جمله را بخوان و بگو درست است یا یک باورِ غلطِ رایج:`,
      options: [
        { it: "vero", fa: "درست" },
        { it: "falso mito", fa: "باورِ غلط" },
      ],
      items: [
        { prompt: "یک فنجان قهوه‌ی تلخ الکل را سریع‌تر از خون بیرون می‌برد", answer: 1, explain: "قهوه الکلِ خون را کم نمی‌کند؛ فقط ممکن است حسِ خواب را کمی دور کند، و همین حسِ کاذبِ آماده بودن خطرناک است." },
        { prompt: "دوشِ آبِ سرد یا هوای تازه آدم را برای رانندگی آماده می‌کند", answer: 1, explain: "حس عوض می‌شود، الکل نه. فقط زمان." },
        { prompt: "فقط گذشتِ زمان الکلِ خون را پایین می‌آورد", answer: 0, explain: "کبد با سرعتِ خودش کار می‌کند و این سرعت را نمی‌شود بالا برد." },
        { prompt: "اگر حالم خوب است، یعنی الکلِ خونم پایین است", answer: 1, explain: "الکل همان چیزی را خراب می‌کند که با آن خودت را می‌سنجی؛ حسِ خوب نشانه‌ی آماده بودن نیست." },
        { prompt: "برای راننده‌ای که دو سال پیش گواهینامه‌ی B گرفته، هر مقدار الکل در خون تخلف است", answer: 0, explain: "ماده‌ی ۱۸۶-bis: سه سالِ اول، حد صفر است." },
        { prompt: "الکل همراهِ بعضی داروها اثرِ هر دو را بیشتر می‌کند", answer: 0, explain: "برای همین بانک می‌گوید با دارو «specie» دیرتر خوب می‌شوی؛ درسِ ۳." },
      ],
      takeaway: "هر چیزی که «زود خوبت کند» افسانه است. تنها راهِ مطمئن: نوشیدن و رانندگی را از هم جدا کن.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "le bevande alcoliche", fa: "نوشیدنی‌های الکلی" },
        { it: "le bevande superalcoliche", fa: "نوشیدنی‌های الکلیِ قوی" },
        { it: "l'idoneità alla guida", fa: "آمادگی برای رانندگی" },
        { it: "recuperare", fa: "دوباره به دست آوردن" },
        { it: "lo stato di ebbrezza", fa: "حالتِ مستی" },
        { it: "il tasso alcolemico", fa: "الکلِ خون" },
        { it: "l'arresto (pena)", fa: "حبس", note: "non «arresto» del veicolo (capitolo 16)" },
        { it: "il pasto abbondante", fa: "غذای زیاد" },
      ],
    },
    {
      kind: "trap",
      title: "«recuperare l'idoneità»: چند ساعت یا «velocemente»؟",
      body: "هر دو جمله درباره‌ی دوباره آماده شدن برای رانندگی‌اند. یکی زمان را شرط می‌گذارد، دیگری یک ترفند:",
      examples: [
        {
          sourceId: "6464",
          textIt: "E' necessario che trascorrano alcune ore affinché un conducente che abbia assunto una quantità eccessiva di bevande alcoliche recuperi l'idoneità alla guida",
          answer: 1,
          chunks: [
            { it: "E' necessario che trascorrano alcune ore", fa: "لازم است چند ساعت بگذرد", verb: "trascorrano ← trascorrere", focus: "condition" },
            { it: "affinché un conducente che abbia assunto una quantità eccessiva di bevande alcoliche", fa: "تا راننده‌ای که بیش از حد نوشیدنیِ الکلی خورده" },
            { it: "recuperi l'idoneità alla guida", fa: "آمادگی برای رانندگی را دوباره به دست بیاورد", verb: "recuperi ← recuperare" },
          ],
          translation: "لازم است چند ساعت بگذرد تا راننده‌ای که بیش از حد نوشیدنیِ الکلی خورده آمادگی برای رانندگی را دوباره به دست بیاورد.",
          why: "درست است. فقط زمان؛ و «چند ساعت» حداقلِ مبهمی است که از بیرون نمی‌شود دقیقش کرد.",
        },
        {
          sourceId: "6467",
          textIt: "Un conducente che ha assunto una quantità eccessiva di bevande alcoliche può recuperare velocemente l'idoneità alla guida se assume caffè amaro",
          answer: 0,
          chunks: [
            { it: ECCESSO, fa: ECCESSO_FA },
            { it: RECUPERARE, fa: RECUPERARE_FA, verb: "può ← potere", focus: "contrast" },
            { it: "se assume caffè amaro", fa: "اگر قهوه‌ی تلخ بخورد", focus: "condition" },
          ],
          translation: "راننده‌ای که بیش از حد نوشیدنیِ الکلی خورده، اگر قهوه‌ی تلخ بخورد، می‌تواند به‌سرعت آمادگی برای رانندگی را دوباره به دست بیاورد.",
          why: "غلط است. قهوه الکلِ خون را کم نمی‌کند.",
        },
      ],
      takeaway: "«velocemente» کنارِ الکل همیشه غلط است، با هر «se …» که بیاید: قهوه، نمک، غذا.",
      rule: MINSAL,
    },
  ],
  practice: [
    {
      sourceId: "6465",
      textIt: "Un conducente che ha assunto una quantità eccessiva di bevande alcoliche non può recuperare velocemente l'idoneità alla guida, specie se ha assunto anche dei farmaci",
      answer: 1,
      chunks: [
        { it: ECCESSO, fa: ECCESSO_FA },
        { it: "non può recuperare velocemente l'idoneità alla guida,", fa: "نمی‌تواند به‌سرعت آمادگی برای رانندگی را دوباره به دست بیاورد،", verb: "può ← potere", focus: "negation" },
        { it: "specie se ha assunto anche dei farmaci", fa: "به‌خصوص اگر دارو هم خورده باشد", focus: "condition" },
      ],
      translation: "راننده‌ای که بیش از حد نوشیدنیِ الکلی خورده نمی‌تواند به‌سرعت آمادگی برای رانندگی را دوباره به دست بیاورد، به‌خصوص اگر دارو هم خورده باشد.",
      why: "درست است (قدم ۱). فقط زمان، و دارو اثر را بیشتر و طولانی‌تر می‌کند.",
      rule: MINSAL,
      conceptStep: 1,
    },
    {
      sourceId: "6485",
      textIt: "Chi guida in stato di ebbrezza alcolica rischia l'arresto",
      answer: 1,
      chunks: [
        { it: "Chi guida in stato di ebbrezza alcolica", fa: "کسی که در حالتِ مستی رانندگی کند", verb: "guida ← guidare" },
        { it: "rischia l'arresto", fa: "در خطرِ حبس است", verb: "rischia ← rischiare" },
      ],
      translation: "کسی که در حالتِ مستی رانندگی کند در خطرِ حبس است.",
      why: "درست است (قدم ۲). در دو پله‌ی بالای ماده‌ی ۱۸۶ مجازاتِ «arresto»، یعنی حبس، هست.",
      rule: `${CDS("186")} c.2 lett. b–c`,
      conceptStep: 2,
    },
    {
      sourceId: "6487",
      textIt: "Chi guida un veicolo senza motore, con una concentrazione di alcool nel sangue superiore al limite stabilito, non è soggetto ad alcuna sanzione",
      answer: 0,
      chunks: [
        { it: "Chi guida un veicolo senza motore,", fa: "کسی که وسیله‌ای بی‌موتور می‌راند،", verb: "guida ← guidare" },
        { it: "con una concentrazione di alcool nel sangue superiore al limite stabilito,", fa: "با الکلِ خونِ بیش از حدِ تعیین‌شده،" },
        { it: "non è soggetto ad alcuna sanzione", fa: "مشمولِ هیچ مجازاتی نیست", verb: "è ← essere", focus: "negation" },
      ],
      translation: "کسی که با الکلِ خونِ بیش از حدِ تعیین‌شده وسیله‌ای بی‌موتور می‌راند، مشمولِ هیچ مجازاتی نیست.",
      why: "غلط است (قدم ۲). ماده‌ی ۱۸۶ برای هر راننده‌ای است؛ دوچرخه‌سوارِ مست هم مجازات می‌شود، فقط بی‌تعلیقِ گواهینامه.",
      rule: `${CDS("186")} c.2; Cass. pen. sez. IV n. 4893/2015`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6464", "6465", "6466", "6467", "6483"] },
    { step: 2, sourceIds: ["6485", "6487"] },
  ],
};
