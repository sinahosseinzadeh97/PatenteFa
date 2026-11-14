/**
 * src/content/ch13-precedenze.ts
 * Chapter 13 (Norme di circolazione), lesson 9: who gives way where the place
 * itself does not decide. At a roundabout the general rule (give way to the
 * right) applies unless a DARE PRECEDENZA sign says otherwise; the ROTATORIA
 * sign and a flashing yellow light do not change that; DARE PRECEDENZA stops at
 * the line of triangles, STOP always means stop. On a steep road where two
 * vehicles cannot pass, the one going downhill stops (art. 150 c.2).
 *
 * The signs themselves are chapter 5 (it maps #4394, 4564, 4565, 4569, 4637).
 * Legal basis: CdS art. 145 c.1–2, c.4–5, art. 150 c.2. Trust rules as in
 * src/content/lessons.ts; checked by tests/chapter13.test.ts and
 * `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_145 = "Codice della Strada, art. 145";
const CDS_150 = "Codice della Strada, art. 150 c.2";
const GIUNGENDO = "Giungendo ad un incrocio in cui la circolazione è regolata con rotatoria,";
const GIUNGENDO_FA = "وقتی به تقاطعی می‌رسی که حرکت در آن به‌صورتِ میدان تنظیم شده،";

export const lessonRotatoriaPendenza: Lesson = {
  id: "norme-rotatoria-pendenza",
  titleFa: "میدان، خطِ ایست، و جاده‌ی سربالایی",
  titleIt: "ROTATORIA · FORTE PENDENZA",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی در میدان چه کسی راه می‌دهد (اگر تابلو نیست، قاعده‌ی کلیِ راه دادن به راست؛ اگر تابلوی رعایت حق تقدم هست، واردشونده به کسی که در میدان است)، جلوی تابلوی رعایت حق تقدم و تابلوی ایست کجا می‌ایستی، و در جاده‌ی سربالاییِ باریک کدام راننده می‌ایستد.",
      why:
        "۱۷ سؤال. دامِ اصلی «همیشه» است: «در میدان همیشه به چپ راه بده»، «همیشه به کسی که در میدان است». بانک می‌خواهد بدانی این قاعده از تابلو می‌آید، نه از خودِ میدان. و در سربالایی، جمله‌ها جای «سربالا» و «سرازیر» را عوض می‌کنند.",
      rule: `${CDS_145} c.1–2, c.4–5; ${CDS_150}`,
    },
    {
      kind: "table",
      title: "میدان: تابلو تصمیم می‌گیرد، نه شکلِ تقاطع",
      body:
        "قانون برای میدان قاعده‌ی جدایی ندارد. میدان یک تقاطع است: اگر تابلویی نیست، همان قاعده‌ی کلی (به کسی که از راست می‌آید راه بده، فصل ۱۴). بیشترِ میدان‌ها پیش از هر ورودی تابلوی رعایت حق تقدم دارند؛ آن‌وقت تو که وارد می‌شوی به کسی که در حلقه است، یعنی از چپِ تو، راه می‌دهی. خودِ تابلوها را در فصل ۵ دیدی.",
      columns: ["حکم", "دامِ بانک"],
      rows: [
        {
          label: "میدان بدونِ تابلو",
          it: "in assenza di specifico segnale",
          values: ["قاعده‌ی کلی: به راست راه بده", "«همیشه به کسی که در میدان است» یا «همیشه به چپ» غلط است"],
        },
        {
          label: "تابلوی رعایت حق تقدم پیش از ورودی",
          it: "solo se vi è il segnale DARE PRECEDENZA",
          values: ["واردشونده به کسانی که در حلقه‌اند راه می‌دهد (از چپ)", "قانون اجازه می‌دهد میدان این‌طور تنظیم شود؛ تابلو است که این را می‌گوید"],
        },
        {
          label: "تابلوی آبیِ میدان",
          it: "il segnale ROTATORIA",
          values: ["فقط می‌گوید دورِ میدان بچرخ (تابلوی اجبار، فصل ۴)", "«با این تابلو باید به راست و چپ راه بدهی» غلط است"],
        },
        {
          label: "پیش از ورود",
          it: "moderare la velocità ed usare la massima prudenza",
          values: ["سرعت را کم کن و رفتارِ بقیه را ببین", "حتی وقتی حق تقدم با توست"],
        },
        {
          label: "درونِ حلقه",
          it: "retromarcia · sorpasso a destra e a sinistra",
          values: ["دنده‌عقب نه؛ «سبقت هم از راست هم از چپ» هم نه", "بانک هر دو را غلط می‌داند؛ قاعده‌های معمولیِ حرکت و سبقت (فصل ۱۵) در حلقه هم برقرارند"],
        },
        {
          label: "جلوی تابلوی رعایت حق تقدم",
          it: "striscia trasversale formata da una serie di triangoli bianchi",
          values: ["فقط اگر لازم شد می‌ایستی، و آن‌وقت روی خطِ مثلث‌های سفید", "«همیشه بایست» مالِ تابلوی ایست است، نه این"],
        },
        {
          label: "جلوی تابلوی ایست",
          it: "segnale di STOP",
          values: ["همیشه کاملاً می‌ایستی، روی خطِ ممتدِ ایست؛ اگر خط نیست، جایی که تقاطع را می‌بینی", "«بی‌خط و بی‌ماشین لازم نیست بایستی» غلط است"],
        },
        {
          label: "چراغِ زردِ چشمک‌زن",
          it: "semaforo a luce gialla lampeggiante",
          values: ["احتیاط؛ حق تقدم با تابلوها و قاعده‌ی کلی است (فصل ۷)", "«باید به همه راه بدهی» غلط است"],
        },
      ],
      takeaway: "میدان بی‌تابلو = به راست راه بده. میدان با تابلوی رعایت حق تقدم = به کسی که در حلقه است (از چپ). تابلوی آبیِ میدان فقط جهتِ چرخش را می‌گوید.",
      rule: `${CDS_145} c.1–2, c.4`,
    },
    {
      kind: "table",
      title: "سربالاییِ باریک: کسی که پایین می‌آید می‌ایستد",
      body:
        "در جاده‌ی کوهستانی یا شیب‌دار که دو خودرو به‌سختی از کنارِ هم رد می‌شوند، قانون می‌گوید چه کسی کنار بکشد. منطقش ساده است: برای کسی که بالا می‌رود ایستادن و دوباره راه افتادن در شیب سخت‌تر است. دو جمله‌ی بانک (۴۶۳۰ و ۴۶۳۶) کاملاً یکی‌اند.",
      columns: ["چه کسی", "چه می‌کند"],
      rows: [
        {
          label: "به‌طورِ معمول",
          it: "il conducente che procede in discesa",
          values: ["کسی که سرازیر می‌آید", "می‌ایستد و تا جای ممکن به راست می‌کشد؛ بانک می‌گوید «و در صورتِ لزوم دنده‌عقب می‌رود». «کسی که سربالا می‌رود» غلط است"],
        },
        {
          label: "اگر کنارِ یکی جای کنار کشیدن هست",
          it: "una piazzola di scambio",
          values: ["همان که به آن نزدیک است", "کنار می‌کشد و می‌گذارد دیگری رد شود؛ قانون: اگر سربالارونده جای کنار کشیدن دارد و راهِ دیگر دنده‌عقب است، او همان‌جا می‌ایستد"],
        },
      ],
      takeaway: "سرازیر می‌ایستد، سربالا ادامه می‌دهد؛ مگر یکی کنارِ جای کنار کشیدن باشد: آن‌وقت همان یکی کنار می‌کشد.",
      rule: CDS_150,
    },
    {
      kind: "classify",
      title: "چه کسی راه می‌دهد؟",
      body: "هر موقعیت را بخوان و بگو تو باید راه بدهی یا دیگری. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "do la precedenza io", fa: "من راه می‌دهم" },
        { it: "la dà l'altro", fa: "دیگری راه می‌دهد" },
      ],
      items: [
        { prompt: "به میدانی می‌رسی که پیش از ورودی‌اش تابلوی رعایت حق تقدم دارد؛ خودرویی در حلقه از چپت می‌آید", answer: 0, explain: "تابلو تو را واردشونده‌ای می‌کند که به حلقه راه می‌دهد." },
        { prompt: "میدانِ کوچکی بدونِ هیچ تابلویی؛ تو در حلقه‌ای و خودرویی از ورودیِ سمتِ راستت وارد می‌شود", answer: 0, explain: "بی‌تابلو قاعده‌ی کلی است: کسی که از راست می‌آید حق تقدم دارد، حتی اگر تو در حلقه باشی." },
        { prompt: "همان میدانِ بی‌تابلو؛ تو وارد می‌شوی و خودرویی در حلقه از چپت می‌آید", answer: 1, explain: "تو از راستِ او می‌آیی؛ بی‌تابلو او به تو راه می‌دهد. با احتیاط وارد شو." },
        { prompt: "در جاده‌ی کوهستانیِ باریک سرازیر می‌روی؛ خودرویی سربالا می‌آید و هیچ جای کنار کشیدنی نیست", answer: 0, explain: "سرازیرآینده می‌ایستد و به راست می‌کشد." },
        { prompt: "سرازیر می‌روی؛ سربالارونده درست کنارِ یک جای کنار کشیدن است", answer: 1, explain: "کسی که کنارِ جای کنار کشیدن است کنار می‌کشد." },
      ],
      takeaway: "میدان: اول دنبالِ تابلو بگرد. سربالایی: اول دنبالِ جای کنار کشیدن، بعد سرازیر می‌ایستد.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la circolazione rotatoria · la rotatoria", fa: "میدان" },
        { it: "l'anello", fa: "حلقه‌ی میدان" },
        { it: "in assenza di specifico segnale", fa: "وقتی تابلوی مشخصی نیست" },
        { it: "la striscia trasversale di triangoli bianchi", fa: "خطِ عرضی از مثلث‌های سفید", note: "جای ایستادن جلوی تابلوی رعایت حق تقدم؛ جلوی تابلوی ایست خطِ ممتد است." },
        { it: "la forte pendenza", fa: "شیبِ تند" },
        { it: "procedere in discesa · in salita", fa: "سرازیر رفتن · سربالا رفتن", base: "procedere" },
        { it: "la piazzola di scambio", fa: "جای کنار کشیدن (برای رد شدنِ خودروی روبه‌رو)" },
        { it: "accostare", fa: "کنار کشیدن", base: "accostare" },
      ],
    },
    {
      kind: "trap",
      title: "«به چپ راه بده» فقط با تابلو",
      body: "هر دو جمله درباره‌ی راه دادن به کسی است که در میدان از چپ می‌آید. فرقشان چهار کلمه است:",
      examples: [
        {
          sourceId: "4625",
          textIt:
            "Giungendo ad un incrocio in cui la circolazione è regolata con rotatoria, bisogna dare la precedenza ai veicoli provenienti da sinistra, solo se vi è il segnale DARE PRECEDENZA",
          answer: 1,
          chunks: [
            { it: GIUNGENDO, fa: GIUNGENDO_FA, verb: "giungendo ← giungere" },
            { it: "bisogna dare la precedenza ai veicoli provenienti da sinistra,", fa: "باید به وسیله‌هایی که از چپ می‌آیند راه داد،", verb: "bisogna ← bisognare" },
            { it: "solo se vi è il segnale DARE PRECEDENZA", fa: "فقط اگر تابلوی رعایت حق تقدم باشد", focus: "limit" },
          ],
          translation: "وقتی به تقاطعی می‌رسی که حرکت در آن به‌صورتِ میدان تنظیم شده، فقط اگر تابلوی رعایت حق تقدم باشد باید به وسیله‌هایی که از چپ می‌آیند راه داد.",
          why: "درست است. تابلو واردشونده را موظف می‌کند به حلقه راه بدهد؛ بی‌تابلو قاعده‌ی کلیِ راه دادن به راست برقرار است.",
        },
        {
          sourceId: "4632",
          textIt: "Giungendo ad un incrocio in cui la circolazione è regolata con rotatoria, è obbligatorio dare la precedenza ai veicoli provenienti da sinistra",
          answer: 0,
          chunks: [
            { it: GIUNGENDO, fa: GIUNGENDO_FA, verb: "giungendo ← giungere" },
            { it: "è obbligatorio dare la precedenza ai veicoli provenienti da sinistra", fa: "واجب است به وسیله‌هایی که از چپ می‌آیند راه بدهی", focus: "always" },
          ],
          translation: "وقتی به تقاطعی می‌رسی که حرکت در آن به‌صورتِ میدان تنظیم شده، واجب است به وسیله‌هایی که از چپ می‌آیند راه بدهی.",
          why: "غلط است. بدونِ شرطِ تابلو، این جمله میدان را قاعده‌ای جدا می‌کند که قانون ندارد.",
        },
      ],
      takeaway: "در میدان «از چپ» همیشه با «اگر تابلوی رعایت حق تقدم هست» همراه است. بدونِ آن، غلط.",
      rule: `${CDS_145} c.2, c.4`,
    },
  ],
  practice: [
    {
      sourceId: "4626",
      textIt: "Negli incroci regolati con circolazione rotatoria, in assenza di specifico segnale, vale la regola generale di dare la precedenza a destra",
      answer: 1,
      chunks: [
        { it: "Negli incroci regolati con circolazione rotatoria,", fa: "در تقاطع‌هایی که به‌صورتِ میدان تنظیم شده‌اند،" },
        { it: "in assenza di specifico segnale,", fa: "وقتی تابلوی مشخصی نیست،", focus: "condition" },
        { it: "vale la regola generale", fa: "قاعده‌ی کلی برقرار است", verb: "vale ← valere" },
        { it: "di dare la precedenza a destra", fa: "یعنی راه دادن به راست" },
      ],
      translation: "در تقاطع‌هایی که به‌صورتِ میدان تنظیم شده‌اند، وقتی تابلوی مشخصی نیست، قاعده‌ی کلیِ راه دادن به راست برقرار است.",
      why: "درست است (قدم ۱). میدان قاعده‌ی جدایی ندارد؛ بی‌تابلو همان ماده‌ی ۱۴۵ بند ۲ است.",
      rule: `${CDS_145} c.2`,
      conceptStep: 1,
    },
    {
      sourceId: "4639",
      textIt: "In presenza del segnale di STOP non occorre arrestarsi, se non vi è la linea trasversale di arresto e non si vedono sopraggiungere veicoli",
      answer: 0,
      chunks: [
        { it: "In presenza del segnale di STOP", fa: "وقتی تابلوی ایست هست" },
        { it: "non occorre arrestarsi,", fa: "لازم نیست کاملاً بایستی،", focus: "negation", verb: "occorre ← occorrere" },
        { it: "se non vi è la linea trasversale di arresto", fa: "اگر خطِ عرضیِ ایست کشیده نشده", focus: "condition" },
        { it: "e non si vedono sopraggiungere veicoli", fa: "و وسیله‌ای دیده نمی‌شود که بیاید" },
      ],
      translation: "وقتی تابلوی ایست هست، اگر خطِ عرضیِ ایست کشیده نشده و وسیله‌ای دیده نمی‌شود که بیاید، لازم نیست کاملاً بایستی.",
      why: "غلط است (قدم ۱). تابلوی ایست همیشه یعنی ایستادنِ کامل (فصل ۵)؛ اگر خط نیست، جایی می‌ایستی که دید داری، پیش از ورود به تقاطع.",
      rule: `${CDS_145} c.5`,
      conceptStep: 1,
    },
    {
      sourceId: "4638",
      textIt:
        "Qualora in una strada a forte pendenza il passaggio tra veicoli risulti difficoltoso, se uno dei due conducenti si trova in vicinanza di una piazzola di scambio, spetta a lui accostare e lasciar passare l’altro conducente",
      answer: 1,
      chunks: [
        { it: "Qualora in una strada a forte pendenza", fa: "اگر در جاده‌ای با شیبِ تند", focus: "condition" },
        { it: "il passaggio tra veicoli risulti difficoltoso,", fa: "رد شدنِ وسیله‌ها از کنارِ هم دشوار باشد،", verb: "risulti ← risultare" },
        { it: "se uno dei due conducenti si trova in vicinanza di una piazzola di scambio,", fa: "و یکی از دو راننده نزدیکِ یک جای کنار کشیدن باشد،", focus: "condition", verb: "si trova ← trovarsi" },
        { it: "spetta a lui accostare e lasciar passare l’altro conducente", fa: "اوست که باید کنار بکشد و بگذارد دیگری رد شود", verb: "spetta ← spettare" },
      ],
      translation: "اگر در جاده‌ای با شیبِ تند رد شدنِ وسیله‌ها از کنارِ هم دشوار باشد و یکی از دو راننده نزدیکِ یک جای کنار کشیدن باشد، اوست که باید کنار بکشد و بگذارد دیگری رد شود.",
      why: "درست است (قدم ۲). جای کنار کشیدن قاعده‌ی «سرازیر می‌ایستد» را کنار می‌زند: کسی که به آن نزدیک است کنار می‌کشد.",
      rule: CDS_150,
      conceptStep: 2,
    },
    {
      sourceId: "4640",
      textIt: "Se in una strada a forte pendenza, il passaggio tra veicoli non è facilmente possibile, in genere spetta al conducente che procede in salita arrestarsi",
      answer: 0,
      chunks: [
        { it: "Se in una strada a forte pendenza,", fa: "اگر در جاده‌ای با شیبِ تند،", focus: "condition" },
        { it: "il passaggio tra veicoli non è facilmente possibile,", fa: "رد شدنِ وسیله‌ها از کنارِ هم آسان نباشد،" },
        { it: "in genere spetta al conducente che procede in salita arrestarsi", fa: "معمولاً راننده‌ای که سربالا می‌رود باید بایستد", verb: "spetta ← spettare", focus: "contrast" },
      ],
      translation: "اگر در جاده‌ای با شیبِ تند رد شدنِ وسیله‌ها از کنارِ هم آسان نباشد، معمولاً راننده‌ای که سربالا می‌رود باید بایستد.",
      why: "غلط است (قدم ۲). برعکس: کسی که سرازیر می‌آید می‌ایستد، چون دوباره راه افتادن در سربالایی سخت‌تر است.",
      rule: CDS_150,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // roundabouts: the general rule unless a DARE PRECEDENZA sign; ROTATORIA sign; flashing yellow; the triangle line; STOP
      sourceIds: ["4625", "4626", "4627", "4628", "4629", "4632", "4633", "4634", "4635", "4566", "4567", "4631", "4639"],
    },
    {
      step: 2,
      // steep roads (art. 150 c.2); 4630 and 4636 are the same statement
      sourceIds: ["4630", "4636", "4638", "4640"],
    },
  ],
};
