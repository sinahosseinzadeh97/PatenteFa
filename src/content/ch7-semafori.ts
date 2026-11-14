/**
 * src/content/ch7-semafori.ts
 * Chapter 7 (Semafori e segnali degli agenti del traffico), lessons 1–3: the
 * ordinary vehicle traffic light (image 154): what it is and how it lights,
 * red and green, and fixed yellow / flashing yellow / switched off.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter7.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const SEMAFORO = "Il semaforo in figura";
const SEMAFORO_FA = "چراغِ تصویر";
const VERDE = "Quando è accesa la luce verde del semaforo in figura";
const VERDE_FA = "وقتی چراغِ سبزِ چراغ‌راهنمای تصویر روشن است";
const ROSSA = "La luce rossa accesa del semaforo";
const ROSSA_FA = "چراغِ قرمزِ روشن";
const GIALLA = "La luce gialla fissa";
const GIALLA_FA = "چراغِ زردِ ثابت";
const INCONTRANDO = "Incontrando il semaforo in figura";
const INCONTRANDO_FA = "وقتی به چراغِ تصویر می‌رسی،";

// ── Lesson 1 ──────────────────────────────────────────────────────────────────

export const lessonSemaforoVeicolare: Lesson = {
  id: "semaforo-veicolare",
  titleFa: "چراغِ راهنمایی: برای کیست و چطور روشن می‌شود",
  titleIt: "SEMAFORO VEICOLARE",
  minutes: 4,
  signs: [154],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی چراغِ راهنماییِ معمولی برای چه کسانی است و کجا گذاشته می‌شود، رنگ‌ها در چراغِ عمودی و افقی کجا هستند، و رنگ‌ها به چه ترتیبی روشن و خاموش می‌شوند.",
      why:
        "این فصل همه‌اش درباره‌ی چراغ‌ها و مأمورِ راهنمایی است. پیش از اینکه بپرسیم «با قرمز چه کنم؟»، بانک می‌پرسد این چراغ اصلاً برای کیست و زرد کِی روشن می‌شود. ۱۵ سؤال فقط همین را می‌سنجند.",
    },
    {
      kind: "table",
      title: "این چراغ برای کیست و کجاست",
      body: "سه دایره‌ی رنگی روی زمینه‌ی سیاه: چراغِ راهنماییِ «وسایلِ نقلیه». هر جا بانک آن را به گروهِ دیگری نسبت می‌دهد، این جدول جواب است.",
      columns: ["توضیح"],
      rows: [
        {
          label: "برای چه کسی",
          it: "semaforo per i veicoli",
          sign: 154,
          values: ["همه‌ی وسایلِ نقلیه: سواری، کامیون، موتور، اتوبوسِ خطِ عمومی و دوچرخه. اتوبوس فقط وقتی تابعِ آن نیست که چراغِ مخصوصِ خودش آنجا باشد (درس ۵)."],
        },
        {
          label: "دوچرخه",
          it: "la bicicletta è un veicolo",
          values: ["دوچرخه وسیله‌ی نقلیه است؛ وقتی در سواره‌رو می‌راند، همین چراغ برای اوست. چراغِ شکلِ دوچرخه فقط برای کسی است که از مسیرِ دوچرخه بیرون می‌آید."],
        },
        {
          label: "کجاست",
          it: "di norma, in un incrocio",
          values: ["معمولاً سرِ تقاطع، تا نوبتِ عبورِ جریان‌های خودرو را تقسیم کند. «معمولاً»، چون گاهی وسطِ مسیر هم هست، مثلاً سرِ یک باریکه."],
        },
        {
          label: "کجا نیست",
          it: "casello · binari ferroviari",
          values: ["چراغِ کنارِ ریلِ قطار چیزِ دیگری است: دو چراغِ قرمزِ چشمک‌زن (درس ۷). در «همه‌ی» عوارضی‌های آزادراه هم چنین چراغی نیست."],
        },
      ],
      takeaway: "سه دایره‌ی رنگی = چراغِ وسایلِ نقلیه، سرِ تقاطع. برای همه است، اتوبوس و دوچرخه هم.",
      rule: "Codice della Strada art. 41 c.1 lett. c, c.9–11; DPR 495/1992 art. 158",
    },
    {
      kind: "table",
      title: "رنگ‌ها کجا هستند و به چه ترتیبی روشن می‌شوند",
      body: "در هر لحظه فقط یک رنگ روشن است. ترتیب همیشه یکی است و بانک دقیقاً همین را می‌پرسد.",
      columns: ["قاعده"],
      rows: [
        { label: "چراغِ عمودی", it: "in verticale", values: ["قرمز بالا، زرد وسط، سبز پایین."] },
        { label: "چراغِ افقی", it: "in orizzontale", values: ["وقتی چراغ روی تابلوی بالای سواره‌رو است: قرمز چپ، زرد وسط، سبز راست."] },
        { label: "اندازه", it: "luce rossa più grande", values: ["قرمز می‌تواند بزرگ‌تر از بقیه باشد (۳۰ سانتی‌متر به‌جای ۲۰) تا بهتر دیده شود."] },
        {
          label: "ترتیب",
          it: "verde → giallo → rosso",
          values: ["سبز خاموش می‌شود و همان لحظه زرد روشن می‌شود؛ زرد خاموش می‌شود و قرمز روشن می‌شود. زرد تنها روشن است: نه همراهِ سبز، نه همراهِ قرمز."],
        },
      ],
      takeaway: "قرمز همیشه بالا (یا چپ). زردِ ثابت تنها می‌آید: بعد از سبز، پیش از قرمز.",
      rule: "DPR 495/1992 art. 159 c.1–3; art. 167 c.1",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il semaforo", fa: "چراغِ راهنمایی" },
        { it: "la lanterna semaforica", fa: "چراغِ راهنمایی (اسمِ رسمی در قانون)" },
        { it: "la luce rossa · gialla · verde", fa: "چراغِ قرمز · زرد · سبز" },
        { it: "si accende", base: "accendersi", fa: "روشن می‌شود" },
        { it: "si spegne", base: "spegnersi", fa: "خاموش می‌شود" },
        { it: "fissa", fa: "ثابت (چشمک نمی‌زند)" },
        { it: "di norma", fa: "معمولاً؛ به‌طورِ عادی" },
        { it: "regolare il passaggio", base: "regolare", fa: "نوبتِ عبور را تنظیم کردن" },
      ],
    },
    {
      kind: "trap",
      title: "زرد با چه چیزی روشن است؟",
      body: "دو جمله درباره‌ی لحظه‌ی روشن شدنِ زرد. یکی درست است و یکی غلط:",
      examples: [
        {
          sourceId: "2697",
          sign: 154,
          textIt: "La luce gialla fissa si accende quando il verde e il rosso sono spenti",
          answer: 1,
          chunks: [
            { it: GIALLA, fa: GIALLA_FA },
            { it: "si accende", fa: "روشن می‌شود", verb: "si accende ← accendersi" },
            { it: "quando il verde e il rosso sono spenti", fa: "وقتی سبز و قرمز خاموش‌اند", focus: "condition" },
          ],
          translation: "چراغِ زردِ ثابت وقتی روشن می‌شود که سبز و قرمز خاموش‌اند.",
          why: "درست است. زرد تنها روشن است: سبز تازه خاموش شده و قرمز هنوز روشن نشده.",
        },
        {
          sourceId: "2701",
          sign: 154,
          textIt: "La luce gialla fissa si accende quando è ancora accesa quella rossa",
          answer: 0,
          chunks: [
            { it: GIALLA, fa: GIALLA_FA },
            { it: "si accende", fa: "روشن می‌شود", verb: "si accende ← accendersi" },
            { it: "quando è ancora accesa quella rossa", fa: "وقتی قرمز هنوز روشن است", focus: "contrast" },
          ],
          translation: "چراغِ زردِ ثابت وقتی روشن می‌شود که قرمز هنوز روشن است.",
          why: "غلط است. ترتیب سبز ← زرد ← قرمز است. زرد هیچ‌وقت همراهِ قرمز روشن نیست.",
        },
      ],
      takeaway: "زردِ ثابت همیشه تنهاست. هر جمله‌ای که زرد را «همراهِ» رنگِ دیگری روشن کند غلط است.",
      rule: "DPR 495/1992 art. 159 c.3",
    },
  ],
  practice: [
    {
      sourceId: "2745",
      sign: 154,
      textIt: "Il semaforo in figura è posto, di norma, in un incrocio",
      answer: 1,
      chunks: [
        { it: SEMAFORO, fa: SEMAFORO_FA },
        { it: "è posto,", fa: "قرار داده می‌شود،", verb: "è posto ← porre" },
        { it: "di norma,", fa: "معمولاً،", focus: "limit" },
        { it: "in un incrocio", fa: "سرِ یک تقاطع" },
      ],
      translation: "چراغِ تصویر معمولاً سرِ یک تقاطع قرار داده می‌شود.",
      why: "درست است (قدم ۱). کارش تقسیمِ نوبتِ عبور در تقاطع است. «di norma» جمله را درست نگه می‌دارد.",
      rule: "DPR 495/1992 art. 158",
      conceptStep: 1,
    },
    {
      sourceId: "2753",
      sign: 154,
      textIt: "Il semaforo in figura si trova in tutti i caselli autostradali",
      answer: 0,
      chunks: [
        { it: SEMAFORO, fa: SEMAFORO_FA },
        { it: "si trova", fa: "قرار دارد", verb: "si trova ← trovarsi" },
        { it: "in tutti i caselli autostradali", fa: "در همه‌ی عوارضی‌های آزادراه", focus: "always" },
      ],
      translation: "چراغِ تصویر در همه‌ی عوارضی‌های آزادراه قرار دارد.",
      why: "غلط است (قدم ۱). جای عادی‌اش تقاطع است. «همه‌ی عوارضی‌ها» ادعای ساختگی است.",
      rule: "DPR 495/1992 art. 158",
      conceptStep: 1,
    },
    {
      sourceId: "2751",
      sign: 154,
      textIt: "Il semaforo in figura non vale per i veicoli in servizio di linea per trasporto di persone",
      answer: 0,
      chunks: [
        { it: SEMAFORO, fa: SEMAFORO_FA },
        { it: "non vale", fa: "معتبر نیست", verb: "vale ← valere", focus: "negation" },
        { it: "per i veicoli in servizio di linea per trasporto di persone", fa: "برای وسایلِ نقلیه‌ی خطِ عمومیِ مسافربری (مثلِ اتوبوس)" },
      ],
      translation: "چراغِ تصویر برای وسایلِ نقلیه‌ی خطِ عمومیِ مسافربری معتبر نیست.",
      why: "غلط است (قدم ۱). اتوبوسِ خطِ عمومی هم وسیله‌ی نقلیه است و از همین چراغ پیروی می‌کند، مگر چراغِ مخصوصِ خودش آنجا باشد.",
      rule: "Codice della Strada art. 41 c.9–11",
      conceptStep: 1,
    },
    {
      sourceId: "2652",
      sign: 154,
      textIt: "Nei semafori sistemati in verticale la luce rossa si trova in alto, in quelli posti in orizzontale si trova a sinistra",
      answer: 1,
      chunks: [
        { it: "Nei semafori sistemati in verticale", fa: "در چراغ‌هایی که عمودی نصب شده‌اند", focus: "condition" },
        { it: "la luce rossa si trova in alto,", fa: "قرمز بالاست،", verb: "si trova ← trovarsi" },
        { it: "in quelli posti in orizzontale", fa: "در چراغ‌هایی که افقی‌اند", focus: "condition" },
        { it: "si trova a sinistra", fa: "سمتِ چپ است" },
      ],
      translation: "در چراغ‌هایی که عمودی نصب شده‌اند قرمز بالاست، در چراغ‌های افقی سمتِ چپ است.",
      why: "درست است (قدم ۲). عمودی: قرمز بالا. افقی: قرمز چپ.",
      rule: "DPR 495/1992 art. 159 c.1–2",
      conceptStep: 2,
    },
    {
      sourceId: "2702",
      sign: 154,
      textIt: "La luce gialla fissa si spegne insieme con il verde",
      answer: 0,
      chunks: [
        { it: GIALLA, fa: GIALLA_FA },
        { it: "si spegne", fa: "خاموش می‌شود", verb: "si spegne ← spegnersi" },
        { it: "insieme con il verde", fa: "همراهِ سبز", focus: "contrast" },
      ],
      translation: "چراغِ زردِ ثابت همراهِ سبز خاموش می‌شود.",
      why: "غلط است (قدم ۲). زرد وقتی روشن می‌شود که سبز خاموش شده؛ زرد پیش از روشن شدنِ قرمز خاموش می‌شود.",
      rule: "DPR 495/1992 art. 159 c.3",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2744", "2745", "2746", "2751", "2752", "2753", "2754"] },
    { step: 2, sourceIds: ["2652", "2653", "2693", "2694", "2697", "2701", "2702", "2703"] },
  ],
};

// ── Lesson 2 ──────────────────────────────────────────────────────────────────

export const lessonRossoVerde: Lesson = {
  id: "rosso-e-verde",
  titleFa: "قرمز یعنی پشتِ خط؛ سبز یعنی برو، با دو شرط",
  titleIt: "LUCE ROSSA · LUCE VERDE",
  minutes: 5,
  signs: [154],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی با چراغِ قرمز دقیقاً کجا می‌ایستی و هیچ استثنایی ندارد، و با چراغِ سبز به کدام جهت‌ها می‌شود رفت و دو شرطِ سبز چیست: راه دادن هنگامِ پیچیدن به چپ، و ورود فقط وقتی می‌توانی تقاطع را خالی کنی.",
      why:
        "۲۴ سؤال. بانک برای قرمز «استثنا» می‌سازد (به راست بپیچ، اگر خالی است رد شو) و برای سبز «حقِ مطلق» (حق تقدم داری، باید مستقیم بروی). هر دو غلط‌اند.",
    },
    {
      kind: "table",
      title: "قرمز: کجا و تا کِی می‌ایستی",
      body: "قرمز یک دستورِ ساده است: از خطِ توقف رد نشو. هر جمله‌ای که برایش «مگر اینکه…» بیاورد، غلط است.",
      columns: ["قاعده"],
      rows: [
        {
          label: "کجا",
          it: "prima della striscia di arresto",
          sign: 154,
          values: ["پیش از خطِ عرضیِ توقف. اگر خطی نیست: پیش از تقاطع، پیش از گذرگاهِ عابر یا پیش از خودِ چراغ."],
        },
        {
          label: "بدونِ استثنا",
          it: "nessuna eccezione",
          values: ["تا وقتی قرمز روشن است رد نمی‌شوی: نه برای پیچیدن به راست، نه چون تقاطع خالی است، نه آهسته و با احتیاط."],
        },
        {
          label: "چراغِ دیگران",
          it: "il giallo per gli altri",
          values: ["زرد یا قرمز شدنِ چراغِ جهتِ دیگر برای تو اجازه نیست. فقط وقتی چراغِ خودت سبز شد حرکت کن."],
        },
        { label: "عجله نه", it: "non affrettarsi", values: ["قرمز نمی‌گوید «زود تقاطع را خالی کن». می‌گوید «وارد نشو»."] },
      ],
      takeaway: "قرمز = پشتِ خطِ توقف بایست، تا سبزِ خودت. هیچ «مگر اینکه»ای ندارد.",
      rule: "Codice della Strada art. 41 c.11",
    },
    {
      kind: "table",
      title: "سبز: برو، ولی با دو شرط",
      body: "سبز اجازه است، نه حقِ مطلق. سه جهت باز است و دو شرط همیشه سرِ جایش است.",
      columns: ["قاعده"],
      rows: [
        {
          label: "کدام جهت",
          it: "diritto · a destra · a sinistra",
          values: ["مستقیم، راست یا چپ؛ هر سه مجازند، چه سواره‌رو خط‌کشیِ جدا داشته باشد چه نه. سبز «فقط مستقیم» نیست."],
        },
        {
          label: "شرطِ ۱: پیچیدن به چپ",
          it: "dare la precedenza a chi viene di fronte",
          values: ["خودروهای روبه‌رو هم سبز دارند. وقتی به چپ می‌پیچی، به آن‌هایی که مستقیم یا به راست می‌روند راه بده. حق تقدم با تو نیست."],
        },
        {
          label: "شرطِ ۲: خالی کردنِ تقاطع",
          it: "sgomberare prima del rosso",
          values: ["فقط وقتی وارد تقاطع شو که مطمئنی پیش از قرمز از آن بیرون می‌روی. اگر آن طرف صف ایستاده، پشتِ خط بمان."],
        },
        {
          label: "عابرها",
          it: "pedoni",
          values: ["وقتی می‌پیچی، به عابرها و دوچرخه‌هایی که سبزِ خودشان را دارند راه بده. وقتی مستقیم می‌روی، عابری که جلویت عبور کند قرمز دارد؛ «سبز، ولی به عابر راه بده» برای مستقیم غلط است."],
        },
        {
          label: "سبزِ طولانی",
          it: "verde da molto tempo",
          values: ["اگر سبز از مدتی پیش روشن است، هر لحظه ممکن است زرد شود: با احتیاط برو و آماده‌ی ایستادن باش. گاز دادن و نگاه نکردن به چراغ غلط است."],
        },
      ],
      takeaway: "سبز = مستقیم، راست یا چپ، با احتیاط. شرط‌ها: هنگامِ پیچیدن به چپ به روبه‌رو راه بده، و فقط وقتی وارد شو که بیرون رفتن ممکن است.",
      rule: "Codice della Strada art. 41 c.9; art. 154 c.1",
    },
    {
      kind: "classify",
      title: "رد می‌شوی یا پشتِ خط می‌مانی؟",
      body: "در هر مثال فقط چراغِ وسایلِ نقلیه هست، بدونِ مأمور. اول رنگ را بخوان، بعد شرط را.",
      options: [
        { it: "PASSO", fa: "رد می‌شوم" },
        { it: "RESTO FERMO", fa: "پشتِ خط می‌مانم" },
      ],
      items: [
        { prompt: "چراغ قرمز است و تقاطع کاملاً خالی است.", answer: 1, explain: "قرمز استثنا ندارد؛ خالی بودنِ تقاطع اجازه نیست." },
        { prompt: "چراغ قرمز است و می‌خواهی به راست بپیچی؛ عابری نیست.", answer: 1, explain: "با قرمز به راست پیچیدن هم ممنوع است. فقط فلشِ سبزِ جدا برای راست چنین اجازه‌ای می‌دهد." },
        { prompt: "چراغ سبز است و آن طرفِ تقاطع جا هست.", answer: 0, explain: "سبز است و می‌توانی تقاطع را خالی کنی: با احتیاط برو." },
        { prompt: "چراغ سبز است، ولی صفِ خودروها آن طرفِ تقاطع ایستاده و جا نیست.", answer: 1, explain: "شرطِ ۲: اگر نمی‌توانی پیش از قرمز بیرون بروی، وارد نشو." },
        { prompt: "چراغِ تو قرمز است و چراغِ جهتِ دیگر تازه زرد شد.", answer: 1, explain: "چراغِ دیگران برای تو اجازه نیست؛ منتظرِ سبزِ خودت بمان." },
        { prompt: "چراغ سبز است و می‌خواهی به چپ بپیچی؛ از روبه‌رو کسی نمی‌آید.", answer: 0, explain: "کسی نیست که به او راه بدهی؛ با احتیاط بپیچ." },
      ],
      takeaway: "دو سؤال به ترتیب: رنگِ چراغِ «خودم» چیست؟ و اگر سبز است، شرط‌ها برقرارند؟",
      rule: "Codice della Strada art. 41 c.9, c.11; DPR 495/1992 art. 159 c.5",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la striscia trasversale di arresto", fa: "خطِ عرضیِ توقف" },
        { it: "arrestarsi", fa: "ایستادن؛ توقفِ کامل" },
        { it: "impegnare l'incrocio", base: "impegnare", fa: "وارد تقاطع شدن" },
        { it: "sgomberare l'incrocio", base: "sgomberare", fa: "تقاطع را خالی کردن؛ از آن بیرون رفتن" },
        { it: "svoltare a sinistra", base: "svoltare", fa: "به چپ پیچیدن" },
        { it: "proseguire diritto", base: "proseguire", fa: "مستقیم ادامه دادن" },
        { it: "affrettarsi", fa: "عجله کردن" },
        { it: "purché", fa: "به شرطِ اینکه" },
      ],
    },
    {
      kind: "trap",
      title: "پیچیدن به چپ با سبز: حق تقدم با کیست؟",
      body: "هر دو جمله درباره‌ی پیچیدن به چپ با سبز و خودروهای روبه‌روست. فقط یکی درست است:",
      examples: [
        {
          sourceId: "2661",
          sign: 154,
          textIt: "Quando è accesa la luce verde del semaforo in figura è possibile svoltare a sinistra, dando la precedenza ai veicoli che arrivano di fronte",
          answer: 1,
          chunks: [
            { it: VERDE, fa: VERDE_FA, focus: "condition" },
            { it: "è possibile svoltare a sinistra,", fa: "می‌شود به چپ پیچید،" },
            { it: "dando la precedenza ai veicoli che arrivano di fronte", fa: "با راه دادن به خودروهایی که از روبه‌رو می‌آیند", verb: "dando ← dare" },
          ],
          translation: "وقتی چراغِ سبزِ چراغ‌راهنمای تصویر روشن است، می‌شود به چپ پیچید، با راه دادن به خودروهایی که از روبه‌رو می‌آیند.",
          why: "درست است. روبه‌رویی‌ها هم سبز دارند و تو باید به آن‌ها راه بدهی.",
        },
        {
          sourceId: "2669",
          sign: 154,
          textIt: "Quando è accesa la luce verde del semaforo in figura, il conducente che svolta a sinistra ha la precedenza sui veicoli che provengono di fronte",
          answer: 0,
          chunks: [
            { it: "Quando è accesa la luce verde del semaforo in figura,", fa: "وقتی چراغِ سبزِ چراغ‌راهنمای تصویر روشن است،", focus: "condition" },
            { it: "il conducente che svolta a sinistra", fa: "راننده‌ای که به چپ می‌پیچد", verb: "svolta ← svoltare" },
            { it: "ha la precedenza", fa: "حق تقدم دارد", verb: "ha ← avere", focus: "contrast" },
            { it: "sui veicoli che provengono di fronte", fa: "بر خودروهایی که از روبه‌رو می‌آیند" },
          ],
          translation: "وقتی چراغِ سبزِ چراغ‌راهنمای تصویر روشن است، راننده‌ای که به چپ می‌پیچد بر خودروهایی که از روبه‌رو می‌آیند حق تقدم دارد.",
          why: "غلط است. برعکس: کسی که به چپ می‌پیچد به روبه‌رویی‌ها راه می‌دهد.",
        },
      ],
      takeaway: "سبز به همه‌ی جهت‌ها اجازه می‌دهد، ولی میانِ خودشان قاعده‌ی حق تقدم سرِ جایش است: چپ‌گرد صبر می‌کند.",
      rule: "Codice della Strada art. 41 c.9",
    },
  ],
  practice: [
    {
      sourceId: "2656",
      sign: 154,
      textIt: "La luce rossa accesa del semaforo consente di svoltare a destra con prudenza, dando precedenza ai pedoni che attraversano la strada",
      answer: 0,
      chunks: [
        { it: ROSSA, fa: ROSSA_FA },
        { it: "consente di svoltare a destra con prudenza,", fa: "اجازه می‌دهد با احتیاط به راست بپیچی،", verb: "consente ← consentire", focus: "contrast" },
        { it: "dando precedenza ai pedoni che attraversano la strada", fa: "با راه دادن به عابرهایی که از خیابان عبور می‌کنند", verb: "dando ← dare" },
      ],
      translation: "چراغِ قرمزِ روشن اجازه می‌دهد با احتیاط به راست بپیچی، با راه دادن به عابرهایی که از خیابان عبور می‌کنند.",
      why: "غلط است (قدم ۱). در ایتالیا قرمز برای پیچیدن به راست هم استثنا ندارد.",
      rule: "Codice della Strada art. 41 c.11",
      conceptStep: 1,
    },
    {
      sourceId: "2659",
      sign: 154,
      textIt: "La luce rossa accesa del semaforo consente l'attraversamento dell'incrocio, purché sia libero",
      answer: 0,
      chunks: [
        { it: ROSSA, fa: ROSSA_FA },
        { it: "consente l'attraversamento dell'incrocio,", fa: "اجازه‌ی عبور از تقاطع را می‌دهد،", verb: "consente ← consentire" },
        { it: "purché sia libero", fa: "به شرطِ اینکه خالی باشد", focus: "condition" },
      ],
      translation: "چراغِ قرمزِ روشن، به شرطِ اینکه تقاطع خالی باشد، اجازه‌ی عبور از آن را می‌دهد.",
      why: "غلط است (قدم ۱). «purché» یک استثنای ساختگی است. قرمز یعنی بایست، خالی یا پر.",
      rule: "Codice della Strada art. 41 c.11",
      conceptStep: 1,
    },
    {
      sourceId: "2664",
      sign: 154,
      textIt: "Quando è accesa la luce verde del semaforo in figura si può impegnare l'incrocio, soltanto avendo la certezza di poterlo sgomberare prima dell'accensione della luce rossa",
      answer: 1,
      chunks: [
        { it: VERDE, fa: VERDE_FA, focus: "condition" },
        { it: "si può impegnare l'incrocio,", fa: "می‌شود وارد تقاطع شد،", verb: "può ← potere" },
        { it: "soltanto avendo la certezza", fa: "فقط وقتی مطمئنی", focus: "limit" },
        { it: "di poterlo sgomberare", fa: "که می‌توانی از آن بیرون بروی" },
        { it: "prima dell'accensione della luce rossa", fa: "پیش از روشن شدنِ قرمز" },
      ],
      translation: "وقتی چراغِ سبزِ چراغ‌راهنمای تصویر روشن است، فقط وقتی می‌شود وارد تقاطع شد که مطمئنی پیش از روشن شدنِ قرمز از آن بیرون می‌روی.",
      why: "درست است (قدم ۲). این شرطِ ۲ است: با صفِ آن طرف، وارد نشو.",
      rule: "Codice della Strada art. 41 c.9",
      conceptStep: 2,
    },
    {
      sourceId: "2672",
      sign: 154,
      textIt: "Quando è accesa la luce verde del semaforo in figura si può proseguire diritto, dando però la precedenza ai pedoni",
      answer: 0,
      chunks: [
        { it: VERDE, fa: VERDE_FA, focus: "condition" },
        { it: "si può proseguire diritto,", fa: "می‌شود مستقیم رفت،", verb: "può ← potere" },
        { it: "dando però la precedenza ai pedoni", fa: "ولی با راه دادن به عابرها", verb: "dando ← dare", focus: "contrast" },
      ],
      translation: "وقتی چراغِ سبزِ چراغ‌راهنمای تصویر روشن است، می‌شود مستقیم رفت، ولی با راه دادن به عابرها.",
      why: "غلط است (قدم ۲). وقتی مستقیم می‌روی، عابری که جلویت عبور می‌کند قرمز دارد. راه دادن به عابرِ سبزدار وظیفه‌ی کسی است که می‌پیچد.",
      rule: "Codice della Strada art. 41 c.9",
      conceptStep: 2,
    },
    {
      sourceId: "2667",
      sign: 154,
      textIt: "Avvicinandosi ad un semaforo, che già da molto tempo ha la luce verde accesa, occorre accelerare, senza che vi sia necessità di guardare la luce del semaforo",
      answer: 0,
      chunks: [
        { it: "Avvicinandosi ad un semaforo,", fa: "وقتی به چراغی نزدیک می‌شوی", verb: "avvicinandosi ← avvicinarsi" },
        { it: "che già da molto tempo ha la luce verde accesa,", fa: "که از مدتی پیش سبز است،", focus: "condition" },
        { it: "occorre accelerare,", fa: "باید گاز بدهی،", verb: "occorre ← occorrere" },
        { it: "senza che vi sia necessità di guardare la luce del semaforo", fa: "بی‌آنکه لازم باشد به چراغ نگاه کنی", focus: "negation" },
      ],
      translation: "وقتی به چراغی نزدیک می‌شوی که از مدتی پیش سبز است، باید گاز بدهی، بی‌آنکه لازم باشد به چراغ نگاه کنی.",
      why: "غلط است (قدم ۲). سبزِ طولانی یعنی زرد نزدیک است: با احتیاط برو و آماده‌ی ایستادن باش.",
      rule: "Codice della Strada art. 41 c.9–10",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2651", "2654", "2655", "2656", "2657", "2658", "2659", "2660", "2748", "2749", "2750"] },
    { step: 2, sourceIds: ["2661", "2662", "2663", "2664", "2665", "2666", "2667", "2668", "2669", "2670", "2671", "2672", "2739"] },
  ],
};

// ── Lesson 3 ──────────────────────────────────────────────────────────────────

export const lessonGialloSpento: Lesson = {
  id: "giallo-lampeggiante-spento",
  titleFa: "زرد، زردِ چشمک‌زن و چراغِ خاموش",
  titleIt: "GIALLO FISSO · LAMPEGGIANTE · SPENTO",
  minutes: 5,
  signs: [154],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی زردِ ثابت کِی می‌گوید بایست و کِی می‌گوید رد شو، و با زردِ چشمک‌زن یا چراغِ خاموش و خراب چطور رد می‌شوی.",
      why:
        "۱۴ سؤال. بانک زرد را یا «همیشه برو» یا «در هر حال بایست» معرفی می‌کند؛ هر دو غلط‌اند، چون زرد یک شرط دارد. فرقِ زردِ ثابت و زردِ چشمک‌زن هم بسیار پرسیده می‌شود.",
    },
    {
      kind: "table",
      title: "زردِ ثابت: «اگر بی‌خطر می‌توانی، بایست»",
      body: "زرد بینِ سبز و قرمز است. پاسخ به یک سؤال بستگی دارد: الان کجای راهی؟",
      columns: ["چه کنی"],
      rows: [
        {
          label: "هنوز به خط نرسیده‌ای",
          it: "prima del punto di arresto",
          sign: 154,
          values: ["اگر می‌توانی بی‌خطر بایستی (بدونِ ترمزِ ناگهانی، بدونِ خطر برای پشتی)، پیش از خطِ توقف بایست."],
        },
        { label: "خیلی نزدیکی", it: "non puoi fermarti in sicurezza", values: ["اگر دیگر نمی‌توانی بی‌خطر بایستی، رد شو. این تنها حالتی است که زرد اجازه‌ی عبور می‌دهد."] },
        { label: "وارد تقاطع شده‌ای", it: "incrocio già impegnato", values: ["تقاطع را هر چه زودتر خالی کن. برنگرد و دنده‌عقب نرو، حتی اگر از خطِ توقف گذشته‌ای."] },
        { label: "دو جمله‌ی غلط", it: "in ogni caso", values: ["«زرد در هر حال اجازه‌ی عبور می‌دهد» غلط است؛ «زرد در هر حال یعنی بایست» هم غلط است. شرط تعیین می‌کند."] },
      ],
      takeaway: "زردِ ثابت: پیش از خط و با امکانِ توقفِ بی‌خطر ← بایست. داخلِ تقاطع یا خیلی نزدیک ← بیرون برو.",
      rule: "Codice della Strada art. 41 c.10",
    },
    {
      kind: "table",
      title: "زردِ چشمک‌زن یا چراغِ خاموش",
      body: "وقتی چراغ دیگر نوبت نمی‌دهد، رد شدن مجاز است، ولی مسئولیتِ احتیاط با خودِ توست.",
      columns: ["قاعده"],
      rows: [
        {
          label: "زردِ چشمک‌زن",
          it: "giallo lampeggiante",
          values: ["وقتی قرمز و سبز خاموش‌اند. رد می‌شوی، ولی آهسته و با احتیاطِ زیاد. ایستادنِ اجباری پیش از تقاطع نیست."],
        },
        {
          label: "چه کسی اول است",
          it: "norme di precedenza",
          values: ["چراغ دیگر نوبت نمی‌دهد: تابلوها و قاعده‌ی حق تقدم تصمیم می‌گیرند. همان ترتیبِ فصل ۵ (درس ۹): مأمور، بعد چراغی که کار می‌کند، بعد تابلو."],
        },
        {
          label: "خاموش یا خراب",
          it: "spento · guasto",
          values: ["رد شدن مجاز است، ولی با کمترین سرعت و حداکثرِ احتیاط: ممکن است چراغِ جهتِ دیگر سبز باشد."],
        },
        {
          label: "ترکیبی که وجود ندارد",
          it: "giallo lampeggiante + rosso",
          values: ["زردِ چشمک‌زن همراهِ قرمز روشن نمی‌شود. جمله‌ای که این دو را با هم بیاورد غلط است."],
        },
      ],
      takeaway: "چشمک‌زن یا خاموش: رد می‌شوی، آهسته و با احتیاط، و حق تقدم را از تابلوها و قاعده‌ی عمومی می‌گیری.",
      rule: "Codice della Strada art. 41 c.17–18",
    },
    {
      kind: "classify",
      title: "چه می‌کنی؟",
      body: "هر مثال یک لحظه از رسیدن به چراغ است. اول رنگ و حالتش (ثابت، چشمک‌زن، خاموش)، بعد جای خودت.",
      options: [
        { it: "MI FERMO", fa: "پیش از خط می‌ایستم" },
        { it: "LIBERO L'INCROCIO", fa: "رد می‌شوم و تقاطع را خالی می‌کنم" },
        { it: "PASSO CON PRUDENZA", fa: "آهسته و با احتیاط رد می‌شوم" },
      ],
      items: [
        { prompt: "چراغ زرد شد؛ هنوز چند ده متر تا خط داری و پشتت کسی نزدیک نیست.", answer: 0, explain: "می‌توانی بی‌خطر بایستی، پس زرد می‌گوید بایست." },
        { prompt: "چراغ زرد شد؛ همین حالا وسطِ تقاطعی.", answer: 1, explain: "وارد شده‌ای: هر چه زودتر بیرون برو. برنگرد." },
        { prompt: "چراغ زرد شد؛ آن‌قدر نزدیکِ خطی که ترمزِ ناگهانی خطرناک است.", answer: 1, explain: "نمی‌توانی بی‌خطر بایستی؛ زرد اجازه‌ی عبور می‌دهد." },
        { prompt: "قرمز و سبز خاموش‌اند و زرد چشمک می‌زند.", answer: 2, explain: "زردِ چشمک‌زن: آهسته و با احتیاط، با قاعده‌ی حق تقدم." },
        { prompt: "چراغ کاملاً خاموش است.", answer: 2, explain: "چراغِ خاموش یا خراب: کمترین سرعت و حداکثرِ احتیاط." },
      ],
      takeaway: "زردِ ثابت به جای تو بستگی دارد. چشمک‌زن و خاموش همیشه یک جواب دارند: آهسته و با احتیاط.",
      rule: "Codice della Strada art. 41 c.10, c.17–18",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la luce gialla fissa", fa: "زردِ ثابت" },
        { it: "lampeggiante", base: "lampeggiare", fa: "چشمک‌زن" },
        { it: "il punto di arresto", fa: "جای توقف (خطِ توقف)" },
        { it: "senza creare pericolo", fa: "بدونِ ایجادِ خطر" },
        { it: "liberare l'incrocio", base: "liberare", fa: "تقاطع را خالی کردن" },
        { it: "il semaforo guasto", fa: "چراغِ خراب" },
        { it: "moderare la velocità", base: "moderare", fa: "سرعت را کم کردن" },
        { it: "tornare indietro", base: "tornare", fa: "برگشتن؛ عقب رفتن" },
      ],
    },
    {
      kind: "trap",
      title: "زرد: «به شرطِ اینکه» یا «در هر حال»؟",
      body: "هر دو جمله می‌گویند زرد ما را به ایستادن مجبور می‌کند. یک عبارت فرقشان است:",
      examples: [
        {
          sourceId: "2696",
          sign: 154,
          textIt: "La luce gialla fissa obbliga a fermarsi prima del punto di arresto, purché lo si possa fare senza creare pericolo",
          answer: 1,
          chunks: [
            { it: GIALLA, fa: GIALLA_FA },
            { it: "obbliga a fermarsi prima del punto di arresto,", fa: "مجبور می‌کند پیش از جای توقف بایستی،", verb: "obbliga ← obbligare" },
            { it: "purché lo si possa fare senza creare pericolo", fa: "به شرطِ اینکه بتوانی بدونِ ایجادِ خطر این کار را بکنی", verb: "possa ← potere", focus: "condition" },
          ],
          translation: "چراغِ زردِ ثابت مجبور می‌کند پیش از جای توقف بایستی، به شرطِ اینکه بتوانی بدونِ ایجادِ خطر این کار را بکنی.",
          why: "درست است. این دقیقاً قاعده‌ی زرد است: توقف، اگر بی‌خطر ممکن باشد.",
        },
        {
          sourceId: "2700",
          sign: 154,
          textIt: "La luce gialla fissa ci obbliga ad arrestarci in ogni caso, senza impegnare l'incrocio",
          answer: 0,
          chunks: [
            { it: GIALLA, fa: GIALLA_FA },
            { it: "ci obbliga ad arrestarci", fa: "ما را مجبور می‌کند بایستیم", verb: "obbliga ← obbligare" },
            { it: "in ogni caso,", fa: "در هر حال،", focus: "always" },
            { it: "senza impegnare l'incrocio", fa: "بی‌آنکه وارد تقاطع شویم" },
          ],
          translation: "چراغِ زردِ ثابت ما را مجبور می‌کند در هر حال بایستیم، بی‌آنکه وارد تقاطع شویم.",
          why: "غلط است. «in ogni caso» شرط را پاک کرده: اگر نمی‌توانی بی‌خطر بایستی، یا داخلِ تقاطعی، باید رد شوی.",
        },
      ],
      takeaway: "در جمله‌های زرد دنبالِ شرط بگرد: «purché… senza pericolo» درست است، «in ogni caso» غلط.",
      rule: "Codice della Strada art. 41 c.10",
    },
  ],
  practice: [
    {
      sourceId: "2698",
      sign: 154,
      textIt: "La luce gialla fissa consente in ogni caso di proseguire impegnando l'incrocio",
      answer: 0,
      chunks: [
        { it: GIALLA, fa: GIALLA_FA },
        { it: "consente", fa: "اجازه می‌دهد", verb: "consente ← consentire" },
        { it: "in ogni caso", fa: "در هر حال", focus: "always" },
        { it: "di proseguire impegnando l'incrocio", fa: "که ادامه بدهی و وارد تقاطع شوی", verb: "impegnando ← impegnare" },
      ],
      translation: "چراغِ زردِ ثابت در هر حال اجازه می‌دهد ادامه بدهی و وارد تقاطع شوی.",
      why: "غلط است (قدم ۱). زرد فقط وقتی اجازه‌ی عبور می‌دهد که نمی‌توانی بی‌خطر بایستی.",
      rule: "Codice della Strada art. 41 c.10",
      conceptStep: 1,
    },
    {
      sourceId: "2699",
      sign: 154,
      textIt: "La luce gialla fissa obbliga il conducente a tornare indietro se ha già superato la striscia trasversale di arresto",
      answer: 0,
      chunks: [
        { it: GIALLA, fa: GIALLA_FA },
        { it: "obbliga il conducente a tornare indietro", fa: "راننده را مجبور می‌کند برگردد", verb: "obbliga ← obbligare", focus: "contrast" },
        { it: "se ha già superato la striscia trasversale di arresto", fa: "اگر از خطِ عرضیِ توقف گذشته باشد", verb: "ha superato ← superare", focus: "condition" },
      ],
      translation: "چراغِ زردِ ثابت راننده را، اگر از خطِ عرضیِ توقف گذشته باشد، مجبور می‌کند برگردد.",
      why: "غلط است (قدم ۱). اگر گذشته‌ای، تقاطع را خالی کن. برگشتن خطرناک است و هیچ‌جا خواسته نشده.",
      rule: "Codice della Strada art. 41 c.10",
      conceptStep: 1,
    },
    {
      sourceId: "2741",
      sign: 154,
      textIt: "Incontrando il semaforo in figura è consentito il passaggio quando è accesa la luce gialla lampeggiante, usando però la massima prudenza e moderando la velocità",
      answer: 1,
      chunks: [
        { it: INCONTRANDO, fa: INCONTRANDO_FA, verb: "incontrando ← incontrare" },
        { it: "è consentito il passaggio", fa: "عبور مجاز است", verb: "è consentito ← consentire" },
        { it: "quando è accesa la luce gialla lampeggiante,", fa: "وقتی زردِ چشمک‌زن روشن است،", focus: "condition" },
        { it: "usando però la massima prudenza e moderando la velocità", fa: "ولی با حداکثرِ احتیاط و کم کردنِ سرعت", verb: "moderando ← moderare" },
      ],
      translation: "وقتی به چراغِ تصویر می‌رسی، اگر زردِ چشمک‌زن روشن است عبور مجاز است، ولی با حداکثرِ احتیاط و کم کردنِ سرعت.",
      why: "درست است (قدم ۲). زردِ چشمک‌زن نوبت نمی‌دهد و توقف نمی‌خواهد؛ احتیاط می‌خواهد.",
      rule: "Codice della Strada art. 41 c.17",
      conceptStep: 2,
    },
    {
      sourceId: "2708",
      sign: 154,
      textIt: "Nel semaforo la luce gialla lampeggiante impone l'arresto sempre prima dell'incrocio",
      answer: 0,
      chunks: [
        { it: "Nel semaforo", fa: "در چراغ‌راهنما" },
        { it: "la luce gialla lampeggiante", fa: "زردِ چشمک‌زن" },
        { it: "impone l'arresto", fa: "توقف را اجباری می‌کند", verb: "impone ← imporre", focus: "contrast" },
        { it: "sempre prima dell'incrocio", fa: "همیشه پیش از تقاطع", focus: "always" },
      ],
      translation: "در چراغ‌راهنما، زردِ چشمک‌زن همیشه توقفِ پیش از تقاطع را اجباری می‌کند.",
      why: "غلط است (قدم ۲). زردِ چشمک‌زن توقف نمی‌خواهد؛ آهسته و با احتیاط رد می‌شوی. ایستادن را تابلو (مثلاً STOP) تعیین می‌کند، نه این چراغ.",
      rule: "Codice della Strada art. 41 c.17",
      conceptStep: 2,
    },
    {
      sourceId: "2742",
      sign: 154,
      textIt: "Incontrando il semaforo in figura è consentito il passaggio quando esso è spento, usando però la massima prudenza",
      answer: 1,
      chunks: [
        { it: INCONTRANDO, fa: INCONTRANDO_FA, verb: "incontrando ← incontrare" },
        { it: "è consentito il passaggio", fa: "عبور مجاز است", verb: "è consentito ← consentire" },
        { it: "quando esso è spento,", fa: "وقتی چراغ خاموش است،", focus: "condition" },
        { it: "usando però la massima prudenza", fa: "ولی با حداکثرِ احتیاط", verb: "usando ← usare" },
      ],
      translation: "وقتی به چراغِ تصویر می‌رسی، اگر خاموش است عبور مجاز است، ولی با حداکثرِ احتیاط.",
      why: "درست است (قدم ۲). چراغِ خاموش نوبت نمی‌دهد: کمترین سرعت، حداکثرِ احتیاط.",
      rule: "Codice della Strada art. 41 c.18",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2695", "2696", "2698", "2699", "2700", "2740", "2747"] },
    { step: 2, sourceIds: ["2704", "2708", "2711", "2741", "2742", "2743", "2755"] },
  ],
};
