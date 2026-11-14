/**
 * src/content/ch13-file.ts
 * Chapter 13 (Norme di circolazione), lesson 3 `norme-file-parallele`: when
 * driving in parallel files is allowed (CdS art. 144 c.1: dense traffic on
 * carreggiate with at least two lanes per direction, an officer's
 * authorisation, or the stretch leading to a junction with traffic lights or
 * officers), what it permits (stay in your lane; change lane only for the
 * reasons of c.3) and, in heavy traffic, the lanes you still may not use.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter13.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_144 = "Codice della Strada, art. 144";
const FILE = "viaggiare per file parallele";
const FILE_FA = "در ردیف‌های موازی راندن";

export const lessonFileParallele: Lesson = {
  id: "norme-file-parallele",
  titleFa: "ردیف‌های موازی و ترافیکِ سنگین",
  titleIt: "FILE PARALLELE · TRAFFICO INTENSO",
  minutes: 5,
  signs: [],
  figures: [502, 511, 550, 552, 554],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی «ردیف‌های موازی» چیست، فقط در کدام سه موقعیت مجاز است، در آن چه کاری می‌شود کرد و چه کاری نه، و در ترافیکِ سنگین کدام خط‌ها همچنان ممنوع‌اند.",
      why:
        "۲۹ سؤال. دامِ اصلی این است که «دو خط در هر جهت» را کافی بدانی («همیشه مجاز است»، «اجباری است»)، یا جاده‌ی دوطرفه‌ی دو یا سه‌خطه را با آن قاطی کنی. در ترافیکِ سنگین هم بانک هر خطِ خالی را پیشنهاد می‌دهد: خطِ اتوبوس، خطِ اضطراری، مسیرِ دوچرخه.",
      rule: `${CDS_144} c.1–3`,
    },
    {
      kind: "table",
      title: "ردیف‌های موازی: کی مجاز، و یعنی چه",
      body:
        "ردیف‌های موازی یعنی خودروها در چند خط عبورِ یک جهت کنارِ هم می‌روند و هر کس در خطِ خودش می‌ماند، بی‌آن‌که لازم باشد به لبه‌ی راست بچسبد. ماده‌ی ۱۴۴ فقط سه موقعیت را مجاز می‌داند، و هر کدام کافی است: (۱) ترافیکِ سنگین روی سواره‌رویی با دست‌کم دو خط در هر جهت، (۲) وقتی مأمور اجازه بدهد، (۳) در مسیری که به تقاطعِ دارای چراغ یا مأمور می‌رسد. مجاز است، نه اجباری. شکلِ ۵۵۴ را بانک یک بار «دوطرفه با سه خط» و یک بار «یک‌طرفه با سه خط» می‌نامد: جواب را متنِ جمله تعیین می‌کند، نه شکل.",
      columns: ["مجاز است؟", "چرا"],
      rows: [
        {
          label: "دست‌کم دو خط در هر جهت، ترافیکِ سنگین (شکل ۵۵۰)",
          it: "almeno due corsie per senso · traffico intenso",
          values: ["بله", "موقعیتِ اول. یک‌طرفه‌ی سه‌خطه هم، در ترافیکِ سنگین، همین است"],
        },
        {
          label: "همان جاده، ولی ترافیک کم",
          it: "sempre consentito",
          values: ["نه", "دو خط شرطِ لازم است، نه کافی؛ «همیشه مجاز» غلط است"],
        },
        {
          label: "وقتی مأمور اجازه می‌دهد",
          it: "autorizzata dagli agenti del traffico",
          values: ["بله", "موقعیتِ دوم"],
        },
        {
          label: "مسیرِ منتهی به تقاطعِ دارای چراغ یا مأمور",
          it: "incrocio regolato da semaforo o da agenti",
          values: ["بله", "موقعیتِ سوم. اگر تقاطع چراغ یا مأمور ندارد، نه"],
        },
        {
          label: "جاده‌ی دوطرفه با دو یا سه خط عبور (شکل ۵۰۲ و ۵۵۴)",
          it: "doppio senso, due o tre corsie",
          values: ["نه", "خطِ چپ یا وسط مالِ سبقت و جهتِ مخالف است، نه یک ردیفِ دیگر (درسِ ۲)"],
        },
        {
          label: "در آبادی، در هر وضعِ ترافیک",
          it: "in qualunque condizione di traffico",
          values: ["نه", "آبادی هم همان سه موقعیت را لازم دارد"],
        },
        {
          label: "«فقط چون سواره‌رو یکی است، مجاز نیست»",
          it: "una sola carreggiata",
          values: ["غلط", "ملاک تعدادِ خط در هر جهت است، نه تعدادِ سواره‌رو"],
        },
        {
          label: "در ردیف‌ها: عوض کردنِ خط",
          it: "cambiare corsia per effettuare manovre di svolta",
          values: ["فقط با راهنما و برای دلیل", "برای رسیدن به راست‌ترین خط و پیچیدن به راست، چپ‌ترین خط و پیچیدن به چپ، یا کم کردنِ سرعت و ایستادن کنارِ لبه. در یک‌طرفه، پیچِ چپ از چپ‌ترین خط، نه «هر خطی»"],
        },
        {
          label: "در ردیف‌ها: راهنمای چپ روشن، یا موتورسیکلت لای خودروها",
          it: "indicatore sinistro · passando tra i veicoli",
          values: ["نه", "هر کس در خطِ خودش؛ راهنما فقط برای مانور است"],
        },
      ],
      takeaway:
        "سه دلیل، هر کدام کافی: ترافیکِ سنگین با دست‌کم دو خط در هر جهت، اجازه‌ی مأمور، نزدیکیِ تقاطعِ چراغ‌دار یا مأموردار. مجاز است، نه اجباری؛ هر کس در خطِ خودش، و عوض کردنِ خط فقط برای پیچیدن یا ایستادن.",
      rule: `${CDS_144} c.1–3`,
    },
    {
      kind: "table",
      title: "ترافیکِ سنگین: با جریان برو، خطِ دیگران را نگیر",
      body:
        "در ترافیکِ سنگین وسوسه این است که هر جای خالی را بگیری. بانک برای همین جمله‌هایی می‌سازد که در آن‌ها یک خطِ ممنوع «چون خالی است» مجاز می‌شود. قاعده این است: سرعتت را با جریانِ خطِ خودت یکی کن، فاصله را نگه دار (فصل ۱۲) و خط را بی‌دلیل عوض نکن.",
      columns: ["چه کنی", "چرا"],
      rows: [
        {
          label: "سرعت",
          it: "uniformandola alla corrente di traffico",
          values: ["تا جای ممکن با جریانِ خطِ خودت یکی کن", "تفاوتِ سرعت در صف، ترمزِ ناگهانی و تصادف از پشت می‌سازد"],
        },
        {
          label: "بوق برای این‌که جلویی‌ها تندتر بروند",
          it: "suonare il clacson",
          values: ["نزن", "بوق فقط برای خطر است (ماده‌ی ۱۵۶)؛ صف را تند نمی‌کند"],
        },
        {
          label: "مدام عوض کردنِ خط به سمتِ خالی‌ترین",
          it: "cambiare ripetutamente corsia",
          values: ["نکن", "ماده‌ی ۱۴۴ بند ۳ عوض کردنِ خط را فقط برای دلیل‌های مشخص مجاز می‌داند"],
        },
        {
          label: "چراغِ خطر (چهار راهنما با هم) در ترافیکِ سنگین",
          it: "lampeggio simultaneo",
          values: ["لازم نیست", "چراغِ خطر برای خطر یا خودروی ایستاده است، نه برای هر ترافیکی"],
        },
        {
          label: "خطِ ویژه‌ی اتوبوس و وسیله‌های عمومی",
          it: "corsie riservate ai veicoli in servizio pubblico",
          values: ["نه، حتی اگر خالی است", "آن خط مالِ همان وسیله‌هاست؛ ردیفِ اضافه نیست"],
        },
        {
          label: "خطِ اضطراری، با موتورسیکلت",
          it: "corsie di emergenza",
          values: ["نه", "در خطِ اضطراری فقط برای ایستادن و دوباره راه افتادن حرکت می‌کنی (ماده‌ی ۱۷۶)"],
        },
        {
          label: "مسیر ویژه‌ی دوچرخه، با موتور گازی یا موتورسیکلت، «زیرِ ۲۰ کیلومتر» (شکل ۵۱۱)",
          it: "pista ciclabile",
          values: ["نه", "مسیرِ دوچرخه مالِ دوچرخه است؛ عددِ ۲۰ ساختگی است"],
        },
        {
          label: "موتور گازی در خطِ چپ، دو خط در هر جهت (شکل ۵۵۰)",
          it: "i ciclomotori sulla corsia di sinistra",
          values: ["نه", "موتور گازی و وسیله‌ی بی‌موتور حتی در ردیف‌های موازی کنارِ لبه‌ی راست می‌مانند (ماده‌ی ۱۴۴ بند ۲)"],
        },
      ],
      takeaway: "در صف: با جریان برو، فاصله نگه دار، خط عوض نکن. خطِ اتوبوس، خطِ اضطراری و مسیرِ دوچرخه «چون خالی‌اند» مجاز نمی‌شوند؛ موتور گازی سمتِ راست می‌ماند.",
      rule: `${CDS_144} c.2–3; Codice della Strada, artt. 141 c.1, 156 c.1, 176 c.1 lett. c`,
    },
    {
      kind: "classify",
      title: "این‌جا ردیف‌های موازی مجاز است؟",
      body: "هر موقعیت را بخوان و بگو ماده‌ی ۱۴۴ اجازه می‌دهد یا نه. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "consentito", fa: "مجاز" },
        { it: "non consentito", fa: "مجاز نیست" },
      ],
      items: [
        {
          prompt: "جاده‌ای با دو خط در هر جهت، صفِ طولانیِ ساعتِ شلوغی",
          answer: 0,
          explain: "موقعیتِ اول: ترافیکِ سنگین با دست‌کم دو خط در هر جهت.",
        },
        {
          prompt: "همان جاده، نیمه‌شب و خالی",
          answer: 1,
          explain: "هیچ‌کدام از سه دلیل نیست؛ خالی‌ترین خطِ راست را می‌گیری.",
        },
        {
          prompt: "جاده‌ی دوطرفه با دو خط عبور، ترافیکِ سنگین",
          answer: 1,
          explain: "خطِ چپ مالِ جهتِ مخالف و سبقت است؛ ترافیک چیزی را عوض نمی‌کند.",
        },
        {
          prompt: "مأمورِ راهنمایی با دست نشان می‌دهد که در دو ردیف بروید",
          answer: 0,
          explain: "موقعیتِ دوم: اجازه‌ی مأمور.",
        },
        {
          prompt: "نزدیکِ تقاطعی با چراغ، دو خط در هر جهت، ترافیکِ کم",
          answer: 0,
          explain: "موقعیتِ سوم: مسیرِ منتهی به تقاطعِ چراغ‌دار.",
        },
        {
          prompt: "نزدیکِ تقاطعی بی‌چراغ و بی‌مأمور، دو خط در هر جهت، ترافیکِ کم",
          answer: 1,
          explain: "تقاطعِ بی‌چراغ و بی‌مأمور دلیل نیست، و ترافیک هم سنگین نیست.",
        },
      ],
      takeaway: "یکی از سه دلیل را پیدا کن: ترافیکِ سنگین (با دو خط در هر جهت)، مأمور، تقاطعِ چراغ‌دار یا مأموردار. نبود؟ مجاز نیست.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la marcia per file parallele", fa: "حرکت در ردیف‌های موازی" },
        { it: "il traffico intenso", fa: "ترافیکِ سنگین", note: "«traffico denso» هم همین است." },
        { it: "regolato da semaforo o da agenti", fa: "با چراغ یا مأمور کنترل‌شده" },
        { it: "la corsia riservata ai mezzi pubblici", fa: "خطِ عبورِ ویژه‌ی وسیله‌های عمومی (اتوبوس، تاکسی)" },
        { it: "la corsia di emergenza", fa: "خطِ اضطراری" },
        { it: "la pista ciclabile", fa: "مسیر ویژه‌ی دوچرخه" },
        { it: "affiancati", fa: "کنارِ هم" },
        { it: "uniformare la velocità", fa: "سرعت را با جریان یکی کردن", base: "uniformare" },
      ],
    },
    {
      kind: "trap",
      title: "تقاطع: با چراغ یا مأمور، یا بدونِ آن؟",
      body: "هر دو جمله ردیف‌های موازی را نزدیکِ تقاطع می‌برند. یک کلمه فرق می‌کند:",
      examples: [
        {
          sourceId: "4546",
          textIt: "E' consentita la marcia per file parallele su strade a due corsie per senso di marcia ad un incrocio regolato da semaforo",
          answer: 1,
          chunks: [
            { it: "E' consentita la marcia per file parallele", fa: "حرکت در ردیف‌های موازی مجاز است", verb: "è consentita ← consentire" },
            { it: "su strade a due corsie per senso di marcia", fa: "در جاده‌هایی با دو خط عبور در هر جهت" },
            { it: "ad un incrocio regolato da semaforo", fa: "در تقاطعی که با چراغ کنترل می‌شود", focus: "condition" },
          ],
          translation: "در جاده‌هایی با دو خط عبور در هر جهت، در تقاطعی که با چراغ کنترل می‌شود، حرکت در ردیف‌های موازی مجاز است.",
          why: "درست است. ماده‌ی ۱۴۴ بند ۱: مسیرِ منتهی به تقاطعِ دارای چراغ یکی از سه دلیل است.",
        },
        {
          sourceId: "4551",
          textIt: "E' consentito viaggiare per file parallele lungo il tratto di strada che porta ad un incrocio non regolato da semaforo o da agenti del traffico",
          answer: 0,
          chunks: [
            { it: `E' consentito ${FILE}`, fa: `مجاز است ${FILE_FA}`, verb: "è consentito ← consentire" },
            { it: "lungo il tratto di strada che porta ad un incrocio", fa: "در مسیری که به یک تقاطع می‌رسد", verb: "porta ← portare" },
            { it: "non regolato da semaforo o da agenti del traffico", fa: "که با چراغ یا مأمور کنترل نمی‌شود", focus: "negation" },
          ],
          translation: "در مسیری که به تقاطعی بی‌چراغ و بی‌مأمور می‌رسد، راندن در ردیف‌های موازی مجاز است.",
          why: "غلط است. تقاطع به‌تنهایی دلیل نیست؛ باید چراغ یا مأمور داشته باشد. «non» جمله را غلط کرده است.",
        },
      ],
      takeaway: "تقاطع فقط وقتی دلیل است که «regolato da semaforo o da agenti» باشد. «non regolato» را ببین.",
      rule: `${CDS_144} c.1`,
    },
  ],
  practice: [
    {
      sourceId: "4547",
      textIt: "Su strade con almeno due corsie per senso di marcia, come in figura, qualora il traffico sia intenso, si può viaggiare per file parallele",
      answer: 1,
      figure: 550,
      chunks: [
        { it: "Su strade con almeno due corsie per senso di marcia, come in figura,", fa: "در جاده‌هایی با دست‌کم دو خط عبور در هر جهت، مثلِ تصویر،", focus: "condition" },
        { it: "qualora il traffico sia intenso,", fa: "اگر ترافیک سنگین باشد،", verb: "sia ← essere", focus: "condition" },
        { it: `si può ${FILE}`, fa: `می‌شود ${FILE_FA}`, verb: "si può ← potere" },
      ],
      translation: "در جاده‌هایی با دست‌کم دو خط عبور در هر جهت، مثلِ تصویر، اگر ترافیک سنگین باشد، می‌شود در ردیف‌های موازی راند.",
      why: "درست است (قدم ۱). موقعیتِ اولِ ماده‌ی ۱۴۴: هر دو شرط هست، دو خط در هر جهت و ترافیکِ سنگین.",
      rule: `${CDS_144} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "4553",
      textIt: "E' sempre consentito viaggiare per file parallele se la carreggiata a doppio senso ha almeno due corsie per ogni senso di marcia, come quella in figura",
      answer: 0,
      figure: 550,
      chunks: [
        { it: `E' sempre consentito ${FILE}`, fa: `همیشه مجاز است ${FILE_FA}`, verb: "è consentito ← consentire", focus: "always" },
        { it: "se la carreggiata a doppio senso ha almeno due corsie per ogni senso di marcia,", fa: "اگر سواره‌روی دوطرفه در هر جهت دست‌کم دو خط عبور داشته باشد،", verb: "ha ← avere", focus: "condition" },
        { it: "come quella in figura", fa: "مثلِ سواره‌روی تصویر" },
      ],
      translation: "اگر سواره‌روی دوطرفه، مثلِ تصویر، در هر جهت دست‌کم دو خط عبور داشته باشد، راندن در ردیف‌های موازی همیشه مجاز است.",
      why: "غلط است (قدم ۱). دو خط در هر جهت شرطِ لازم است، نه کافی. باید ترافیک سنگین باشد، یا مأمور اجازه بدهد، یا به تقاطعِ چراغ‌دار برسی. «sempre» جمله را غلط کرده.",
      rule: `${CDS_144} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "4453",
      textIt:
        "In caso di traffico intenso il conducente deve regolare la propria velocità uniformandola il più possibile a quella della corrente di traffico che scorre lungo la corsia occupata",
      answer: 1,
      chunks: [
        { it: "In caso di traffico intenso", fa: "در ترافیکِ سنگین", focus: "condition" },
        { it: "il conducente deve regolare la propria velocità", fa: "راننده باید سرعتش را تنظیم کند", verb: "deve ← dovere" },
        { it: "uniformandola il più possibile a quella della corrente di traffico", fa: "و تا جای ممکن آن را با سرعتِ جریانِ ترافیک یکی کند", verb: "uniformandola ← uniformare" },
        { it: "che scorre lungo la corsia occupata", fa: "که در خطِ عبوری که در آن است جریان دارد", verb: "scorre ← scorrere" },
      ],
      translation: "در ترافیکِ سنگین، راننده باید سرعتش را تنظیم کند و تا جای ممکن آن را با سرعتِ جریانِ ترافیکِ خطی که در آن است یکی کند.",
      why: "درست است (قدم ۲). در صف، تفاوتِ سرعت با بقیه به ترمزِ ناگهانی و زدن به عقبِ خودروی جلو می‌رسد. با جریانِ خطِ خودت برو.",
      rule: "Codice della Strada, artt. 141 c.1, 144 c.1",
      conceptStep: 2,
    },
    {
      sourceId: "4514",
      textIt: "Su strade a 2 corsie per senso di marcia, in caso di intenso traffico i ciclomotori possono circolare sulla corsia di sinistra",
      answer: 0,
      figure: 550,
      chunks: [
        { it: "Su strade a 2 corsie per senso di marcia,", fa: "در جاده‌هایی با ۲ خط عبور در هر جهت،" },
        { it: "in caso di intenso traffico", fa: "در ترافیکِ سنگین", focus: "condition" },
        { it: "i ciclomotori possono circolare sulla corsia di sinistra", fa: "موتور گازی‌ها می‌توانند در خطِ چپ حرکت کنند", verb: "possono ← potere", focus: "contrast" },
      ],
      translation: "در جاده‌هایی با ۲ خط عبور در هر جهت، در ترافیکِ سنگین، موتور گازی‌ها می‌توانند در خطِ چپ حرکت کنند.",
      why: "غلط است (قدم ۲). ماده‌ی ۱۴۴ بند ۲: موتور گازی و وسیله‌ی بی‌موتور حتی در ردیف‌های موازی کنارِ لبه‌ی راست می‌مانند.",
      rule: `${CDS_144} c.2`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // the three cases of art. 144 c.1, what parallel files permit (c.2–3), two-way roads where they never apply
      sourceIds: [
        "4473", "4497", "4504", "4507",
        "4544", "4545", "4546", "4547", "4548", "4549", "4550", "4551", "4552", "4553", "4554", "4555", "4556", "4557", "4558",
      ],
    },
    {
      step: 2,
      // heavy traffic: keep to the flow and your lane; bus lanes, emergency lanes, cycle paths, mopeds keep right
      sourceIds: ["4453", "4455", "4456", "4457", "4458", "4508", "4514", "4515", "4516", "4517"],
    },
  ],
};
