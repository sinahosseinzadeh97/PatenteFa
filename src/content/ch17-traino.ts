/**
 * src/content/ch17-traino.ts
 * Chapter 17 (Norme varie, autostrade, pannelli), lessons 9–10: towing a
 * broken-down vehicle in an emergency (CdS artt. 63, 165), and the trailer as
 * a vehicle of its own: plate, insurance, numbers, mirrors, the driver's rules
 * (artt. 56, 72, 100, 116, 142, 158, 176, 186-bis).
 *
 * Several trailer statements in the bank have no article we could read
 * (towing ratios, 20 cm mirrors, the tow ball, insurance while detached); their
 * `rule` says so and docs/chapter-17-coverage.md lists them.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter17.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_63 = "Codice della Strada, art. 63";
const CDS_165 = "Codice della Strada, art. 165";
const PROGRAMMA = "programma ministeriale (nessun articolo letto lo dice)";
const TECNICA = "nozione tecnica, non una norma";
const IL_TRAINO = "Il traino per incombente situazione di emergenza di un veicolo in avaria";
const IL_TRAINO_FA = "یدک کشیدنِ خودروی خراب در اضطرار";
const I_RIMORCHI = "I rimorchi";

// ── Lesson 9 ──────────────────────────────────────────────────────────────────

export const lessonTrainoAvaria: Lesson = {
  id: "traino-veicolo-avaria",
  titleFa: "یدک کشیدنِ خودروی خراب",
  titleIt: "TRAINO DI UN VEICOLO IN AVARIA",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی کِی می‌شود خودرویی را که خراب شده با خودروی خودت بکشی، با چه وسیله‌ای و چه علامتی، و راننده‌ی خودروی یدک‌شده چه می‌کند.",
      why:
        "۱۵ سؤال. دام‌ها: «هر دلیلِ جدی» به‌جای «خرابی»، اتصالی که «لازم نیست علامت داشته باشد»، و ادعاهای فنیِ غلط درباره‌ی فرمان و دنده‌ی خودروی یدک‌شده.",
      rule: `${CDS_63} c.1–2; ${CDS_165}`,
    },
    {
      kind: "table",
      title: "قاعده‌های یدک کشیدن",
      body:
        "این یدکِ معمولی نیست؛ یک خودرو خودروی دیگری را که دیگر نمی‌تواند حرکت کند تا تعمیرگاه می‌کشد. قانون آن را با چند شرط مجاز می‌داند:",
      columns: ["قانون", "دامِ بانک"],
      rows: [
        {
          label: "چه چیزی",
          it: "non più atto a circolare per avaria",
          values: ["خودرویی که یدک نیست و به‌خاطرِ خرابی یا نبودِ قطعه‌ی اساسی دیگر نمی‌تواند حرکت کند", "«به هر دلیلِ جدی» غلط است"],
        },
        {
          label: "چندتا",
          it: "più di un veicolo",
          values: ["هر وسیله فقط یکی را می‌کشد و فقط با یکی کشیده می‌شود (به‌جز حمل‌ونقلِ ویژه)", ""],
        },
        {
          label: "با چه",
          it: "fune, catena, cavo, barra rigida",
          values: ["اتصالِ محکم: طناب، زنجیر، کابل یا میله‌ی سخت؛ و علامت‌دار، تا دیگران آن را ببینند", "«حتی اگر نشود علامتش زد» غلط است"],
        },
        {
          label: "خودروی یدک‌شده",
          it: "luci di emergenza · pannello · triangolo",
          values: ["چراغِ خطرش روشن است؛ اگر کار نمی‌کند، پنلِ ۳۰۲ یا مثلث", "«فقط چراغ‌های عقبش روشن باشد» غلط است"],
        },
        {
          label: "کجا نه",
          it: "in autostrada",
          values: ["در آزادراه فقط امدادِ مجاز یدک می‌کشد (درسِ ۵)", ""],
        },
      ],
      takeaway: "یکی پشتِ یکی، فقط برای خرابی، با اتصالِ محکم و علامت‌دار، و هرگز خودت در آزادراه. اتصالِ نامطمئن جریمه و کسرِ امتیاز دارد.",
      rule: `${CDS_63} c.1–2; ${CDS_165} c.1–3; Codice della Strada, art. 175 c.7`,
    },
    {
      kind: "table",
      title: "پشتِ فرمانِ خودروی یدک‌شده",
      body:
        "خودروی یدک‌شده هنوز فرمان و ترمز می‌خواهد، پس کسی که پشتِ فرمانش می‌نشیند در عمل رانندگی می‌کند. موتورش خاموش است، و همین چند چیز را عوض می‌کند:",
      columns: ["درست", "دامِ بانک"],
      rows: [
        {
          label: "گواهینامه",
          it: "privo di patente",
          values: ["راننده‌ی خودروی یدک‌شده گواهینامه دارد", "«می‌تواند بی‌گواهینامه باشد» غلط است"],
        },
        {
          label: "خودروی جلو",
          it: "patente di guida della categoria E",
          values: ["برای کشیدنِ خودروی خراب با سواری، همان گواهینامه‌ی B کافی است: این یدک (rimorchio) نیست", "«گواهینامه‌ی E لازم است» غلط است"],
        },
        {
          label: "فرمان",
          it: "servosterzo",
          values: ["بی‌موتور، فرمانِ هیدرولیک سنگین می‌شود و چرخاندنش زور می‌خواهد", "«همیشه قفل است» غلط است"],
        },
        {
          label: "دنده",
          it: "quarta marcia",
          values: ["خلاص", "«دنده‌ی چهار» غلط است"],
        },
        {
          label: "فاصله",
          it: "almeno 3 metri",
          values: ["قانون عددی برای فاصله‌ی دو خودرو نمی‌گذارد", "«دست‌کم ۳ متر» ساختگی است"],
        },
      ],
      takeaway: "خودروی یدک‌شده: راننده‌ی گواهینامه‌دار، دنده خلاص، فرمانِ سنگین. خودروی جلو: گواهینامه‌ی معمولیِ خودش.",
      rule: `${PROGRAMMA}; servosterzo: ${TECNICA}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il traino", fa: "یدک کشیدن" },
        { it: "il veicolo in avaria", fa: "خودروی خراب" },
        { it: "la mancanza di organi essenziali", fa: "نبودِ قطعه‌های اساسی" },
        { it: "il solido collegamento", fa: "اتصالِ محکم" },
        { it: "la fune · la catena · la barra rigida", fa: "طناب · زنجیر · میله‌ی سخت" },
        { it: "idoneamente segnalato", fa: "به‌درستی علامت‌گذاری‌شده" },
        { it: "il servosterzo", fa: "فرمانِ هیدرولیک (کمکی)" },
        { it: "la sottrazione di punti", fa: "کسرِ امتیازِ گواهینامه" },
      ],
    },
    {
      kind: "trap",
      title: "اتصال: علامت‌دار یا نه",
      body: "هر دو جمله از «اتصالِ محکم» حرف می‌زنند. فقط یکی شرطِ دوم را نگه داشته:",
      examples: [
        {
          sourceId: "5630",
          textIt:
            "Il traino per incombente situazione di emergenza di un veicolo in avaria deve avvenire attraverso un solido collegamento, purché idoneamente segnalato per rendere i veicoli chiaramente avvistabili dagli altri utenti della strada",
          answer: 1,
          chunks: [
            { it: IL_TRAINO, fa: IL_TRAINO_FA },
            { it: "deve avvenire attraverso un solido collegamento,", fa: "باید با اتصالی محکم انجام شود،", verb: "deve ← dovere" },
            { it: "purché idoneamente segnalato", fa: "به شرطی که درست علامت‌گذاری شده باشد", focus: "condition" },
            { it: "per rendere i veicoli chiaramente avvistabili dagli altri utenti della strada", fa: "تا دیگرانِ در جاده خودروها را به‌روشنی ببینند" },
          ],
          translation: "یدک کشیدنِ خودروی خراب در اضطرار باید با اتصالی محکم انجام شود، به شرطی که درست علامت‌گذاری شده باشد تا دیگران خودروها را به‌روشنی ببینند.",
          why: "درست است. محکم و علامت‌دار: هر دو.",
        },
        {
          sourceId: "5633",
          textIt:
            "Il traino per incombente situazione di emergenza di un veicolo in avaria deve avvenire attraverso un solido collegamento, anche se non è possibile segnalarlo",
          answer: 0,
          chunks: [
            { it: IL_TRAINO, fa: IL_TRAINO_FA },
            { it: "deve avvenire attraverso un solido collegamento,", fa: "باید با اتصالی محکم انجام شود،", verb: "deve ← dovere" },
            { it: "anche se non è possibile segnalarlo", fa: "حتی اگر نشود علامتش زد", focus: "contrast" },
          ],
          translation: "یدک کشیدنِ خودروی خراب در اضطرار باید با اتصالی محکم انجام شود، حتی اگر نشود علامتش زد.",
          why: "غلط است. طنابی که دیده نشود تله است؛ کسی که بینِ دو خودرو رد شود به آن می‌خورد. علامت شرط است.",
        },
      ],
      takeaway: "«solido» و «segnalato» با هم. هر جمله‌ای که یکی را بردارد، غلط است.",
      rule: `${CDS_165} c.1`,
    },
  ],
  practice: [
    {
      sourceId: "5627",
      textIt: "Nessun veicolo può trainare o essere trainato da più di un veicolo (salvo il caso di trasporti eccezionali)",
      answer: 1,
      chunks: [
        { it: "Nessun veicolo può trainare o essere trainato", fa: "هیچ وسیله‌ای نمی‌تواند بکشد یا کشیده شود", verb: "può ← potere", focus: "negation" },
        { it: "da più di un veicolo", fa: "بیش از یک وسیله را، یا با بیش از یک وسیله", focus: "limit" },
        { it: "(salvo il caso di trasporti eccezionali)", fa: "(به‌جز حمل‌ونقلِ ویژه)", focus: "contrast" },
      ],
      translation: "هیچ وسیله‌ای نمی‌تواند بیش از یک وسیله را بکشد یا با بیش از یک وسیله کشیده شود (به‌جز حمل‌ونقلِ ویژه).",
      why: "درست است (قدم ۱). یکی پشتِ یکی؛ زنجیره‌ی سه‌تایی ممنوع است.",
      rule: `${CDS_63} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "5632",
      textIt: "In autostrada, un autoveicolo può trainare un veicolo che non sia un rimorchio, se questo non può più circolare per qualsiasi grave motivo",
      answer: 0,
      chunks: [
        { it: "In autostrada,", fa: "در آزادراه،", focus: "condition" },
        { it: "un autoveicolo può trainare un veicolo che non sia un rimorchio,", fa: "یک خودرو می‌تواند وسیله‌ای را که یدک نیست بکشد،", verb: "può ← potere" },
        { it: "se questo non può più circolare per qualsiasi grave motivo", fa: "اگر آن وسیله به هر دلیلِ جدی دیگر نتواند حرکت کند", focus: "condition" },
      ],
      translation: "در آزادراه، یک خودرو می‌تواند وسیله‌ای را که یدک نیست بکشد، اگر آن وسیله به هر دلیلِ جدی دیگر نتواند حرکت کند.",
      why: "غلط است (قدم ۱). دو اشکال: در آزادراه فقط امدادِ مجاز یدک می‌کشد، و دلیلِ مجاز «خرابی» است، نه «هر دلیلِ جدی».",
      rule: `${CDS_63} c.2; Codice della Strada, art. 175 c.7 lett. a`,
      conceptStep: 1,
    },
    {
      sourceId: "5634",
      textIt: "Durante le operazioni di traino di un veicolo in avaria, il veicolo trainato deve mantenere accese le luci posteriori in mancanza di altra idonea segnalazione",
      answer: 0,
      chunks: [
        { it: "Durante le operazioni di traino di un veicolo in avaria,", fa: "هنگامِ یدک کشیدنِ خودروی خراب،" },
        { it: "il veicolo trainato deve mantenere accese le luci posteriori", fa: "خودروی یدک‌شده باید چراغ‌های عقبش را روشن نگه دارد", verb: "deve ← dovere", focus: "contrast" },
        { it: "in mancanza di altra idonea segnalazione", fa: "اگر علامتِ مناسبِ دیگری نیست", focus: "condition" },
      ],
      translation: "هنگامِ یدک کشیدنِ خودروی خراب، اگر علامتِ مناسبِ دیگری نیست، خودروی یدک‌شده باید چراغ‌های عقبش را روشن نگه دارد.",
      why: "غلط است (قدم ۱). قانون چراغِ خطر می‌خواهد؛ اگر کار نمی‌کند، پنلِ ۳۰۲ یا مثلثِ خطر. چراغ‌های معمولیِ عقب کافی نیستند.",
      rule: `${CDS_165} c.2`,
      conceptStep: 1,
    },
    {
      sourceId: "5709",
      textIt: "Quando un veicolo guasto, munito di servosterzo, viene trainato, può risultare faticoso manovrare lo sterzo",
      answer: 1,
      chunks: [
        { it: "Quando un veicolo guasto, munito di servosterzo, viene trainato,", fa: "وقتی خودروی خرابی که فرمانِ هیدرولیک دارد یدک کشیده می‌شود،", verb: "viene trainato ← trainare", focus: "condition" },
        { it: "può risultare faticoso manovrare lo sterzo", fa: "ممکن است چرخاندنِ فرمان سخت باشد", verb: "può ← potere" },
      ],
      translation: "وقتی خودروی خرابی که فرمانِ هیدرولیک دارد یدک کشیده می‌شود، ممکن است چرخاندنِ فرمان سخت باشد.",
      why: "درست است (قدم ۲). کمکِ هیدرولیک از موتور می‌آید؛ بی‌موتور فرمان سنگین می‌شود، ولی قفل نمی‌شود.",
      rule: TECNICA,
      conceptStep: 2,
    },
    {
      sourceId: "5718",
      textIt: "Il conducente a bordo di un veicolo guasto, che viene trainato, può essere privo di patente di guida",
      answer: 0,
      chunks: [
        { it: "Il conducente a bordo di un veicolo guasto,", fa: "راننده‌ای که در خودروی خراب نشسته،" },
        { it: "che viene trainato,", fa: "که یدک کشیده می‌شود،", verb: "viene trainato ← trainare" },
        { it: "può essere privo di patente di guida", fa: "می‌تواند گواهینامه نداشته باشد", verb: "può ← potere" },
      ],
      translation: "راننده‌ای که در خودروی خرابِ یدک‌شده نشسته، می‌تواند گواهینامه نداشته باشد.",
      why: "غلط است (قدم ۲). او فرمان می‌دهد و ترمز می‌کند، یعنی رانندگی می‌کند؛ گواهینامه لازم است.",
      rule: PROGRAMMA,
      conceptStep: 2,
    },
  ],
  related: [
    // 5631 / 5635 (2 vs 4 points): 2 points per the art. 126-bis table as cited by secondary sources; flagged in docs
    { step: 1, sourceIds: ["5627", "5628", "5629", "5630", "5631", "5632", "5633", "5634", "5635"] },
    { step: 2, sourceIds: ["5709", "5717", "5718", "5719", "5722", "5725"] },
  ],
};

// ── Lesson 10 ─────────────────────────────────────────────────────────────────

export const lessonRimorchioRegole: Lesson = {
  id: "rimorchio-regole",
  titleFa: "یدک: یک وسیله‌ی جدا با قاعده‌های خودش",
  titleIt: "RIMORCHI · TARGA, ASSICURAZIONE, LIMITI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی یدک (rimorchio) وسیله‌ای جداست، با پلاک و بیمه‌ی خودش؛ عددهای بانک را برایش از هم جدا می‌کنی (نسبتِ یدک‌کشی ۱ و ۰٫۵، آینه ۲۰ سانتی‌متر، ۳٫۵ تن، ۷ متر) و قاعده‌هایی را که برای راننده‌اش عوض می‌شود می‌شناسی.",
      why:
        "۲۸ سؤال، پر از عدد و استثنای ساختگی: «یدکِ زیرِ ۷۵۰ کیلو پلاک نمی‌خواهد»، «پلاکِ خودرو را پشتِ یدک بزن»، «بی‌جرمِ مجاز یعنی هر جرمی». تقریباً همه‌ی «استثناها» غلط‌اند.",
      rule: "Codice della Strada, artt. 56, 100, 186-bis",
    },
    {
      kind: "table",
      title: "یدک خودش یک وسیله است",
      body: "یدک جزوِ خودروی کشنده (motrice) نیست؛ ثبت می‌شود، پلاک دارد و می‌شود آن را به خودروی دیگری بست:",
      columns: ["درست", "دامِ بانک"],
      rows: [
        {
          label: "پلاک",
          it: "targa propria",
          values: ["هر یدک پلاکِ خودش را دارد", "«زیرِ ۷۵۰ کیلو ثبت لازم ندارد» و «پلاکِ خودرو را بکن و پشتِ یدک بزن» غلط‌اند"],
        },
        {
          label: "بیمه",
          it: "la stessa polizza della motrice · rischio statico",
          values: ["در حرکت، با همان بیمه‌نامه‌ی خودروی کشنده؛ وقتی جداست، بیمه‌ای که خطرِ ایستاده را هم بپوشاند", ""],
        },
        {
          label: "به کدام خودرو",
          it: "parte integrante del veicolo",
          values: ["یدک «جزوِ» یک خودرو نیست و می‌شود آن را به خودروی دیگری بست", "«تا ۳٫۵ تن جزوِ خودرو است» یا «فقط به همان خودروی معاینه» غلط‌اند"],
        },
        {
          label: "معاینه",
          it: "revisione periodica",
          values: ["یدکِ بالای ۳٫۵ تن هر سال جداگانه معاینه می‌شود", "«همراهِ خودروی کشنده معاینه می‌شود» غلط است"],
        },
      ],
      takeaway: "یدک = وسیله‌ی مستقل: پلاک، ثبت و معاینه‌ی خودش. تنها چیزی که با خودروی کشنده مشترک است، بیمه‌ی هنگامِ حرکت است.",
      rule: `Codice della Strada, artt. 56, 80 c.4, 93, 100 c.3; assicurazione: ${PROGRAMMA}`,
    },
    {
      kind: "table",
      title: "عددها و تجهیزات",
      body: "این‌ها عددهایی‌اند که بانک برای یدک می‌پرسد. ستونِ دوم دامی است که کنارِ هر عدد آمده:",
      columns: ["قاعده", "دامِ بانک"],
      rows: [
        {
          label: "نسبتِ یدک‌کشی",
          it: "rapporto di traino",
          values: ["جرمِ یدک به جرمِ خودرو: یدکِ ترمزدارِ تا ۳٫۵ تن حداکثر ۱؛ یدکِ بی‌ترمز حداکثر ۰٫۵", "«اگر کارتِ خودرو جرمِ مجازِ یدک را ننوشته، هر جرمی مجاز است» غلط است: یعنی خودرو برای یدک‌کشی تأیید نشده"],
        },
        {
          label: "آینه‌ها",
          it: "specchietti · 20 centimetri",
          values: ["اگر یدک پهن‌تر است، آینه‌های بیرونیِ خودرو را بلندتر می‌کنی؛ حداکثر ۲۰ سانتی‌متر بیرون از پهن‌ترین نقطه. آینه‌ی راست حتی با کاروان لازم است", "«تا ۵۰ سانتی‌متر»؛ «یدک نباید از خودرو پهن‌تر باشد»"],
        },
        {
          label: "قلابِ بی‌کار",
          it: "sfilata, smontata o ripiegata",
          values: ["وقتی یدک نمی‌کشی، بخشِ بیرون‌زده‌ی قلاب را درمی‌آوری یا تا می‌کنی", ""],
        },
        {
          label: "علامت‌ها",
          it: "strisce retroriflettenti · contrassegni dei limiti di velocità",
          values: ["نوارهای بازتابنده‌ی کنار و عقب فقط برای بالای ۳٫۵ تن اجباری است. برچسبِ حدِ سرعت پشتِ یدک لازم است، حتی زیرِ ۳٫۵ تن", "«نوار برای یدکِ تا ۳٫۵ تن هم لازم است» و «زیرِ ۳٫۵ تن برچسب لازم نیست» غلط‌اند"],
        },
        {
          label: "بارِ یدک",
          it: "sporgere dalla parte anteriore",
          values: ["همان قاعده‌های درسِ ۷: از جلو هیچ؛ بیرون‌زدگیِ عقب حتی روی یدکِ سبک پنل می‌خواهد", "«تا ۳/۱۰ طولِ کلِ مجموعه از جلو» غلط است"],
        },
        {
          label: "یدکِ TATS",
          it: "rimorchi T.A.T.S.",
          values: ["یدکِ حملِ وسایلِ تفریحی و ورزشی (قایق، گلایدر)، نه برای کالای تجاری. قایقش هم نباید از حدِ عرضِ مجاز بیرون بزند", "«قایق تا ۵۰ سانتی‌متر از هر طرف بیرون بزند» غلط است"],
        },
      ],
      takeaway: "۱ = نسبتِ یدکِ ترمزدار تا ۳٫۵ تن، ۰٫۵ = بی‌ترمز. ۲۰ سانتی‌متر = آینه. نوار = بالای ۳٫۵ تن. برچسبِ سرعت = همیشه.",
      rule: `Codice della Strada, artt. 56 c.2 lett. f, 72 c.2-bis, 142 c.4, 164; rapporto di traino, specchietti, gancio: ${PROGRAMMA}`,
    },
    {
      kind: "table",
      title: "برای راننده چه عوض می‌شود",
      body: "یدک فقط خودرو را عوض نمی‌کند؛ چند قاعده هم برای کسی که آن را می‌کشد عوض می‌شود:",
      columns: ["قاعده"],
      rows: [
        { label: "پارک", it: "nei centri abitati", values: ["داخلِ آبادی یدکِ جداشده از خودرو را پارک نمی‌کنی، مگر تابلو اجازه بدهد"] },
        { label: "الکل", it: "tasso alcolemico zero", values: ["اگر جرمِ کلِ خودرو و یدک بیش از ۳٫۵ تن است، حدِ الکلِ خونِ تو صفر است"] },
        { label: "آزادراهِ سه‌خطه", it: "lunghezza superiore a 7 metri", values: ["مجموعه‌ی بلندتر از ۷ متر فقط از دو خطِ سمتِ راست استفاده می‌کند"] },
        { label: "گواهینامه", it: "BE · C · CE", values: ["BE و C با هم CE نمی‌شوند؛ CE گواهینامه‌ی جداگانه است"] },
        { label: "یدکِ اسب", it: "van per cavalli", values: ["در آزادراه مجاز است؛ چراغِ خطر هم برای حملِ حیوان روشن نمی‌شود"] },
      ],
      takeaway: "یدکِ سنگین: الکلِ صفر. مجموعه‌ی بلند: دو خطِ راست. یدکِ جداشده: نه داخلِ آبادی.",
      rule: "Codice della Strada, artt. 116 c.3 lett. m, 158 c.3, 176 c.9, 186-bis c.1 lett. d",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il rimorchio", fa: "یدک" },
        { it: "la motrice", fa: "خودروی کشنده" },
        { it: "la targa propria", fa: "پلاکِ خودش" },
        { it: "la polizza", fa: "بیمه‌نامه" },
        { it: "il rapporto di traino", fa: "نسبتِ یدک‌کشی (جرمِ یدک به جرمِ خودرو)" },
        { it: "la massa rimorchiabile", fa: "جرمِ مجازِ یدک" },
        { it: "il gancio di traino", fa: "قلابِ یدک‌کش" },
        { it: "staccato dalla motrice", fa: "جداشده از خودروی کشنده" },
        { it: "il tasso alcolemico", fa: "میزانِ الکلِ خون" },
      ],
    },
    {
      kind: "trap",
      title: "پلاکِ یدک",
      body: "هر دو جمله درباره‌ی پلاکِ یدک‌اند. یکی قاعده است، دیگری میان‌بُرِ ساختگی:",
      examples: [
        {
          sourceId: "5714",
          textIt: "I rimorchi devono avere targa propria",
          answer: 1,
          chunks: [
            { it: I_RIMORCHI, fa: "یدک‌ها" },
            { it: "devono avere targa propria", fa: "باید پلاکِ خودشان را داشته باشند", verb: "devono ← dovere" },
          ],
          translation: "یدک‌ها باید پلاکِ خودشان را داشته باشند.",
          why: "درست است. یدک ثبت می‌شود و پلاکِ خودش را دارد.",
        },
        {
          sourceId: "5783",
          textIt: "Quando si traina un rimorchio occorre staccare la targa della motrice e applicarla nella parte posteriore del rimorchio",
          answer: 0,
          chunks: [
            { it: "Quando si traina un rimorchio", fa: "وقتی یدک می‌کشی", verb: "si traina ← trainare", focus: "condition" },
            { it: "occorre staccare la targa della motrice", fa: "باید پلاکِ خودروی کشنده را بکنی", verb: "occorre ← occorrere" },
            { it: "e applicarla nella parte posteriore del rimorchio", fa: "و پشتِ یدک بزنی" },
          ],
          translation: "وقتی یدک می‌کشی، باید پلاکِ خودروی کشنده را بکنی و پشتِ یدک بزنی.",
          why: "غلط است. یدک پلاکِ خودش را دارد؛ پلاکِ خودرو سرِ جایش می‌ماند.",
        },
      ],
      takeaway: "یدک = پلاکِ خودش. هر جمله‌ای که پلاک را جابه‌جا کند یا برای یدکِ سبک حذفش کند، غلط است.",
      rule: "Codice della Strada, art. 100 c.3",
    },
  ],
  practice: [
    {
      sourceId: "5773",
      textIt: "E' possibile trainare rimorchi non immatricolati, se di massa inferiore ai 750 chilogrammi",
      answer: 0,
      chunks: [
        { it: "E' possibile trainare rimorchi non immatricolati,", fa: "می‌شود یدک‌های ثبت‌نشده را کشید،" },
        { it: "se di massa inferiore ai 750 chilogrammi", fa: "اگر جرمشان کمتر از ۷۵۰ کیلوگرم باشد", focus: "condition" },
      ],
      translation: "اگر جرمِ یدک کمتر از ۷۵۰ کیلوگرم باشد، می‌شود یدکِ ثبت‌نشده را کشید.",
      why: "غلط است (قدم ۱). هر یدکی ثبت می‌شود و پلاکِ خودش را دارد؛ ۷۵۰ کیلو استثنا نمی‌سازد.",
      rule: "Codice della Strada, artt. 93, 100 c.3",
      conceptStep: 1,
    },
    {
      sourceId: "5764",
      textIt: "Durante la circolazione, i rimorchi devono essere assicurati con la stessa polizza della motrice",
      answer: 1,
      chunks: [
        { it: "Durante la circolazione,", fa: "هنگامِ حرکت،", focus: "condition" },
        { it: "i rimorchi devono essere assicurati", fa: "یدک‌ها باید بیمه شده باشند", verb: "devono ← dovere" },
        { it: "con la stessa polizza della motrice", fa: "با همان بیمه‌نامه‌ی خودروی کشنده" },
      ],
      translation: "هنگامِ حرکت، یدک‌ها باید با همان بیمه‌نامه‌ی خودروی کشنده بیمه شده باشند.",
      why: "درست است (قدم ۱). در حرکت، مجموعه یک بیمه دارد: بیمه‌ی خودروی کشنده.",
      rule: PROGRAMMA,
      conceptStep: 1,
    },
    {
      sourceId: "5767",
      textIt: "Il massimo rapporto di traino per un rimorchio sprovvisto di qualsiasi dispositivo di frenatura è di 0,5",
      answer: 1,
      chunks: [
        { it: "Il massimo rapporto di traino", fa: "بیشترین نسبتِ یدک‌کشی" },
        { it: "per un rimorchio sprovvisto di qualsiasi dispositivo di frenatura", fa: "برای یدکی که هیچ ترمزی ندارد", focus: "condition" },
        { it: "è di 0,5", fa: "۰٫۵ است", verb: "è ← essere", focus: "limit" },
      ],
      translation: "بیشترین نسبتِ یدک‌کشی برای یدکی که هیچ ترمزی ندارد ۰٫۵ است.",
      why: "درست است (قدم ۲). یدکِ بی‌ترمز حداکثر نصفِ جرمِ خودرو؛ یدکِ ترمزدار تا ۳٫۵ تن حداکثر هم‌جرمِ آن (۱).",
      rule: PROGRAMMA,
      conceptStep: 2,
    },
    {
      sourceId: "5784",
      textIt: "Se nella carta di circolazione manca il valore della massa rimorchiabile, ciò significa che il veicolo è atto al traino di rimorchi di qualsiasi massa",
      answer: 0,
      chunks: [
        { it: "Se nella carta di circolazione manca il valore della massa rimorchiabile,", fa: "اگر در کارتِ خودرو عددِ جرمِ مجازِ یدک نیامده باشد،", verb: "manca ← mancare", focus: "condition" },
        { it: "ciò significa che il veicolo è atto al traino", fa: "یعنی خودرو برای کشیدنِ", verb: "significa ← significare" },
        { it: "di rimorchi di qualsiasi massa", fa: "یدک با هر جرمی مناسب است", focus: "contrast" },
      ],
      translation: "اگر در کارتِ خودرو عددِ جرمِ مجازِ یدک نیامده باشد، یعنی خودرو برای کشیدنِ یدک با هر جرمی مناسب است.",
      why: "غلط است (قدم ۲). نبودنِ عدد یعنی خودرو برای یدک‌کشی تأیید نشده، نه این‌که هیچ حدی ندارد.",
      rule: "Codice della Strada, art. 63 c.4",
      conceptStep: 2,
    },
    {
      sourceId: "5770",
      textIt:
        "I conducenti di autoveicoli trainanti un rimorchio, quando la massa complessiva a pieno carico del complesso veicolare è superiore a 3,5 tonnellate, sono considerati in stato di ebbrezza qualora sia stato accertato un valore corrispondente ad un tasso alcolemico superiore a zero grammi per litro",
      answer: 1,
      chunks: [
        { it: "I conducenti di autoveicoli trainanti un rimorchio,", fa: "راننده‌های خودروهایی که یدک می‌کشند،" },
        { it: "quando la massa complessiva a pieno carico del complesso veicolare è superiore a 3,5 tonnellate,", fa: "وقتی جرمِ کلِ مجموعه با بارِ کامل بیش از ۳٫۵ تن است،", focus: "condition" },
        { it: "sono considerati in stato di ebbrezza", fa: "مست به حساب می‌آیند", verb: "sono considerati ← considerare" },
        { it: "qualora sia stato accertato un valore corrispondente", fa: "اگر مقداری ثابت شود" },
        { it: "ad un tasso alcolemico superiore a zero grammi per litro", fa: "با الکلِ خونِ بیش از صفر گرم در لیتر", focus: "limit" },
      ],
      translation:
        "راننده‌های خودروهایی که یدک می‌کشند، وقتی جرمِ کلِ مجموعه با بارِ کامل بیش از ۳٫۵ تن است، اگر الکلِ خونشان بیش از صفر گرم در لیتر ثابت شود، مست به حساب می‌آیند.",
      why: "درست است (قدم ۳). برای این مجموعه‌ها حدِ الکل صفر است.",
      rule: "Codice della Strada, art. 186-bis c.1 lett. d",
      conceptStep: 3,
    },
  ],
  related: [
    // the trailer as a vehicle: plate, registration, insurance, revision
    { step: 1, sourceIds: ["5712", "5714", "5764", "5773", "5774", "5776", "5783", "5785"] },
    // numbers and equipment
    { step: 2, sourceIds: ["5765", "5766", "5767", "5768", "5769", "5772", "5775", "5777", "5778", "5779", "5781", "5784", "5786", "5787"] },
    // what changes for the driver
    { step: 3, sourceIds: ["5763", "5770", "5771", "5780", "5782", "5788"] },
  ],
};
