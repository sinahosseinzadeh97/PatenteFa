/**
 * src/content/ch19-casco.ts
 * Chapter 19 (Cinture, casco e sicurezza), lessons 5–6: the helmet.
 *  L5 who must wear it and how (CdS art. 171 c.1): driver and passenger of
 *     ciclomotori and motoveicoli, any age or licence, always fastened, approved;
 *     exempt only by the vehicle (closed body, crash-proof cell + restraints,
 *     c.1-bis); Quad without bodywork yes, "any quadricycle" no; sanctions
 *     (c.2–5; points from the art. 126-bis table).
 *  L6 choosing and caring for it: shell, foam liner, visor, vents, strap
 *     (the `casco` cutaway in public/js/road.js); no solvents; replace after a
 *     strong impact. Technical practice, no CdS article: flagged in the coverage doc.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter19.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_171 = "Codice della Strada, art. 171";
const TECH = "Indicazioni tecniche dei produttori (nessun articolo del CdS)";

export const lessonCascoObbligo: Lesson = {
  id: "casco-obbligo",
  titleFa: "کلاه ایمنی: چه کسی، کِی — همه، همیشه",
  titleIt: "CASCO PROTETTIVO · OBBLIGO · ESENZIONI · SANZIONI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی کلاه ایمنی برای راننده و سرنشینِ موتور گازی و موتورسیکلت در هر سن، با هر گواهینامه و در هر مسیری اجباری است، باید تأییدشده باشد و بندش همیشه بسته باشد، کدام وسیله‌ها با بدنه‌ی بسته یا اتاقکِ ایمنی معاف‌اند، و نگذاشتنش چه پیامدی دارد.",
      why:
        "۱۹ سؤال. مثلِ کمربند، دامِ اصلیِ بانک «شرطِ ساختگی» است: «فقط زیرِ ۱۸ سال»، «نه برای دارنده‌ی گواهینامه‌ی B»، «نه زیرِ ۳۰ کیلومتر»، «نه بالای ۳۰ درجه»، «بند فقط بیرونِ شهر». و یک جفت که باید از هم جدا کنی: کوادِ بی‌بدنه (کلاه لازم است) و «هر چهارچرخ موتوری» (غلط).",
      rule: `${CDS_171} c.1, c.1-bis`,
    },
    {
      kind: "table",
      title: "چه کسی کلاه می‌گذارد",
      body:
        "قانون می‌گوید راننده و سرنشینِ موتور گازی و موتورسیکلت هنگامِ حرکت باید کلاه ایمنیِ تأییدشده بگذارند و بندش را بسته نگه دارند. معافیت فقط به خودِ وسیله بستگی دارد، نه به آدم: سن، گواهینامه و تجربه هیچ‌کدام معافیت نمی‌آورند.",
      columns: ["کلاه ایمنی"],
      rows: [
        { label: "راننده‌ی موتور گازی", it: "conducente di ciclomotore", values: ["اجباری، در هر سنی، با یا بدونِ گواهینامه‌ی B."] },
        { label: "راننده‌ی موتورسیکلت", it: "conducente di motociclo", values: ["اجباری، با هر مقدار تجربه."] },
        { label: "سرنشین", it: "passeggero", values: ["اجباری، حتی اگر بزرگسال باشد."] },
        { label: "کوادِ بی‌بدنه", it: "quadriciclo privo di carrozzeria (Quad)", values: ["اجباری."] },
        { label: "سه‌چرخ یا چهارچرخ با بدنه‌ی بسته", it: "carrozzeria chiusa", values: ["معاف. پس «روی هر چهارچرخ موتوری» غلط است."] },
        { label: "دوچرخ با اتاقکِ ایمنی و کمربند", it: "cellula di sicurezza e sistemi di ritenuta", values: ["معاف."] },
      ],
      takeaway: "روی موتور گازی یا موتورسیکلت، راننده و سرنشین: کلاه. فقط بدنه‌ی بسته یا اتاقکِ ایمنی معاف می‌کند.",
      rule: `${CDS_171} c.1, c.1-bis`,
    },
    {
      kind: "table",
      title: "همیشه، تأییدشده، با بندِ بسته",
      body:
        "در افتادن یا تصادف، سر آسیب‌پذیرترین جاست و کلاه اثرِ ضربه را کم می‌کند. کلاهی که بندش باز است در تصادف از سر جدا می‌شود؛ برای همین قانون «گذاشتن» و «بسته نگه داشتن» را با هم می‌خواهد.",
      columns: ["قاعده"],
      rows: [
        { label: "کارش", it: "ridurre gli effetti degli urti alla testa", values: ["اثرِ ضربه به سر را کم می‌کند."] },
        { label: "بند", it: "correttamente allacciato", values: ["همیشه بسته، در هر مسیر. کلاهِ باز یا بدپوشیده در افتادن از سر درمی‌آید و خطرِ جدی دارد."] },
        { label: "هر مسیر، هر هوا", it: "spostamenti brevi · bassa velocità · caldo", values: ["مسیرِ کوتاه، سرعتِ کم، منطقه‌ی ۳۰، گرمای تابستان: همه با کلاه."] },
        { label: "تأییدشده", it: "di tipo omologato", values: ["کلاهِ موتور گازی هم باید تأییدشده باشد؛ کلاهِ تأییدنشده توقیف می‌شود."] },
        { label: "پیامد", it: "sanzione · decurtazione dei punti · fermo", values: ["جریمه، کم شدنِ امتیازِ گواهینامه، و توقیفِ موتور به مدتِ ۶۰ روز (۹۰ روز اگر در دو سال دو بار تکرار شود)."] },
      ],
      takeaway: "کلاهِ تأییدشده، بندِ بسته، هر بار که راه می‌افتی.",
      rule: `${CDS_171} c.1–5; art. 126-bis (tabella dei punteggi)`,
    },
    {
      kind: "classify",
      title: "کلاه لازم است؟",
      body: "هر موقعیت را بخوان. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "obbligatorio", fa: "لازم است" },
        { it: "esente", fa: "معاف" },
      ],
      items: [
        { prompt: "سرنشینِ ۳۰ ساله‌ی موتور گازی", answer: 0, explain: "سرنشین هم، بزرگسال هم." },
        { prompt: "موتورسیکلت در منطقه‌ی ۳۰، فقط دو خیابان", answer: 0, explain: "مسیر و سرعت شرط نیستند." },
        { prompt: "سه‌چرخِ موتوری با بدنه‌ی بسته", answer: 1, explain: "بدنه‌ی بسته معاف می‌کند." },
        { prompt: "کوادِ بی‌بدنه", answer: 0, explain: "بی‌بدنه یعنی کلاه." },
        { prompt: "موتورسیکلتِ دارای اتاقکِ ایمنیِ ضدِ ضربه و کمربند", answer: 1, explain: "اتاقکِ ایمنی و سیستمِ نگه‌دارنده معاف می‌کنند." },
        { prompt: "موتور گازی در گرمای ۳۵ درجه‌ی تابستان", answer: 0, explain: "دما شرط نیست." },
      ],
      takeaway: "معافیت را در خودِ وسیله پیدا کن، نه در آدم یا مسیر.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il casco protettivo", fa: "کلاه ایمنی" },
        { it: "allacciare il casco", base: "allacciare", fa: "بندِ کلاه را بستن" },
        { it: "il ciclomotore", fa: "موتور گازی" },
        { it: "il motociclo", fa: "موتورسیکلت" },
        { it: "il passeggero", fa: "سرنشین" },
        { it: "la carrozzeria chiusa", fa: "بدنه‌ی بسته" },
        { it: "la cellula di sicurezza", fa: "اتاقکِ ایمنی" },
        { it: "il quadriciclo a motore", fa: "چهارچرخ موتوری" },
        { it: "maggiorenne · minorenne", fa: "بزرگسال · زیرِ ۱۸ سال" },
        { it: "la decurtazione dei punti", fa: "کم شدنِ امتیازِ گواهینامه" },
      ],
    },
    {
      kind: "trap",
      title: "«anche se maggiorenne» درست، «solo se minorenni» غلط",
      body: "هر دو جمله سن را به کلاه ربط می‌دهند. یکی می‌گوید سن مهم نیست، دیگری سن را شرط می‌کند:",
      examples: [
        {
          sourceId: "6011",
          textIt: "Il casco è obbligatorio per il passeggero di un ciclomotore a due ruote, anche se maggiorenne",
          answer: 1,
          chunks: [
            { it: "Il casco è obbligatorio", fa: "کلاه ایمنی اجباری است", verb: "è ← essere" },
            { it: "per il passeggero di un ciclomotore a due ruote,", fa: "برای سرنشینِ موتور گازیِ دوچرخ،" },
            { it: "anche se maggiorenne", fa: "حتی اگر بزرگسال باشد", focus: "always" },
          ],
          translation: "کلاه ایمنی برای سرنشینِ موتور گازیِ دوچرخ اجباری است، حتی اگر بزرگسال باشد.",
          why: "درست است. سن معافیت نمی‌آورد.",
        },
        {
          sourceId: "6012",
          textIt: "Il casco è obbligatorio per i conducenti di ciclomotori a due ruote, solo se minorenni",
          answer: 0,
          chunks: [
            { it: "Il casco è obbligatorio", fa: "کلاه ایمنی اجباری است", verb: "è ← essere" },
            { it: "per i conducenti di ciclomotori a due ruote,", fa: "برای راننده‌های موتور گازیِ دوچرخ،" },
            { it: "solo se minorenni", fa: "فقط اگر زیرِ ۱۸ سال باشند", focus: "limit" },
          ],
          translation: "کلاه ایمنی برای راننده‌های موتور گازیِ دوچرخ فقط اگر زیرِ ۱۸ سال باشند اجباری است.",
          why: "غلط است. «فقط» شرطی ساخته که در قانون نیست؛ برای همه اجباری است.",
        },
      ],
      takeaway: "در جمله‌های کلاه، هر «solo se» درباره‌ی سن، گواهینامه یا مسیر غلط است.",
      rule: `${CDS_171} c.1`,
    },
  ],
  practice: [
    {
      sourceId: "6009",
      textIt: "Il casco è obbligatorio per i conducenti di motocicli non dotati di cellula di sicurezza e di dispositivi di ritenuta",
      answer: 1,
      chunks: [
        { it: "Il casco è obbligatorio", fa: "کلاه ایمنی اجباری است", verb: "è ← essere" },
        { it: "per i conducenti di motocicli", fa: "برای راننده‌های موتورسیکلت‌هایی" },
        { it: "non dotati di cellula di sicurezza e di dispositivi di ritenuta", fa: "که اتاقکِ ایمنی و سیستمِ نگه‌دارنده ندارند", focus: "condition" },
      ],
      translation: "کلاه ایمنی برای راننده‌های موتورسیکلت‌هایی که اتاقکِ ایمنی و سیستمِ نگه‌دارنده ندارند اجباری است.",
      why: "درست است (قدم ۱). این همان موتورسیکلتِ معمولی است؛ فقط اتاقکِ ایمنی همراهِ سیستمِ نگه‌دارنده معاف می‌کند.",
      rule: `${CDS_171} c.1, c.1-bis lett. b`,
      conceptStep: 1,
    },
    {
      sourceId: "6013",
      textIt: "Il casco non è obbligatorio per i conducenti di ciclomotori a due ruote, titolari di patente della categoria B",
      answer: 0,
      chunks: [
        { it: "Il casco non è obbligatorio", fa: "کلاه ایمنی اجباری نیست", verb: "è ← essere", focus: "negation" },
        { it: "per i conducenti di ciclomotori a due ruote,", fa: "برای راننده‌های موتور گازیِ دوچرخ" },
        { it: "titolari di patente della categoria B", fa: "که گواهینامه‌ی B دارند", focus: "condition" },
      ],
      translation: "کلاه ایمنی برای راننده‌های موتور گازیِ دوچرخ که گواهینامه‌ی B دارند اجباری نیست.",
      why: "غلط است (قدم ۱). گواهینامه معافیت نمی‌آورد؛ معافیت فقط به وسیله بستگی دارد.",
      rule: `${CDS_171} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "6075",
      textIt: "Il casco deve essere indossato anche a bordo dei quadricicli a motore privi di carrozzeria (Quad)",
      answer: 1,
      chunks: [
        { it: "Il casco deve essere indossato", fa: "کلاه ایمنی باید پوشیده شود", verb: "deve ← dovere" },
        { it: "anche a bordo dei quadricicli a motore", fa: "حتی سوار بر چهارچرخ‌های موتوری", focus: "always" },
        { it: "privi di carrozzeria (Quad)", fa: "بی‌بدنه (کواد)", focus: "condition" },
      ],
      translation: "کلاه ایمنی باید حتی سوار بر چهارچرخ‌های موتوریِ بی‌بدنه (کواد) هم پوشیده شود.",
      why: "درست است (قدم ۱). معافیت فقط برای بدنه‌ی بسته است؛ کوادِ بی‌بدنه کلاه می‌خواهد.",
      rule: `${CDS_171} c.1, c.1-bis lett. a`,
      conceptStep: 1,
    },
    {
      sourceId: "6074",
      textIt: "Il casco deve essere indossato anche per spostamenti brevi e a bassa velocità",
      answer: 1,
      chunks: [
        { it: "Il casco deve essere indossato", fa: "کلاه ایمنی باید پوشیده شود", verb: "deve ← dovere" },
        { it: "anche per spostamenti brevi e a bassa velocità", fa: "حتی برای مسیرهای کوتاه و با سرعتِ کم", focus: "always" },
      ],
      translation: "کلاه ایمنی باید حتی برای مسیرهای کوتاه و با سرعتِ کم هم پوشیده شود.",
      why: "درست است (قدم ۲). قانون «هنگامِ حرکت» می‌گوید، بی‌شرطِ مسافت یا سرعت.",
      rule: `${CDS_171} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "6083",
      textIt: "Quando si circola nelle zone a velocità controllata inferiore a 30 km/h, non è obbligatorio l’uso del casco",
      answer: 0,
      chunks: [
        { it: "Quando si circola nelle zone a velocità controllata inferiore a 30 km/h,", fa: "وقتی در منطقه‌هایی با سرعتِ کنترل‌شده‌ی کمتر از ۳۰ کیلومتر بر ساعت می‌رانی،", verb: "si circola ← circolare", focus: "condition" },
        { it: "non è obbligatorio l’uso del casco", fa: "استفاده از کلاه ایمنی اجباری نیست", verb: "è ← essere", focus: "negation" },
      ],
      translation: "وقتی در منطقه‌هایی با سرعتِ کنترل‌شده‌ی کمتر از ۳۰ کیلومتر بر ساعت می‌رانی، استفاده از کلاه ایمنی اجباری نیست.",
      why: "غلط است (قدم ۲). منطقه‌ی ۳۰ هم «هنگامِ حرکت» است؛ عددِ ۳۰ شرطِ ساختگی است، مثلِ کمربند.",
      rule: `${CDS_171} c.1`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6008", "6009", "6010", "6011", "6012", "6013", "6014", "6075", "6084", "6088"] },
    { step: 2, sourceIds: ["6065", "6072", "6073", "6074", "6079", "6082", "6083", "6089", "6093"] },
  ],
};

export const lessonCascoCura: Lesson = {
  id: "casco-scelta-cura",
  titleFa: "کلاه ایمنی: ساختار، تمیز کردن، تعویض",
  titleIt: "CASCO · CALOTTA · VISIERA · PULIZIA · SOSTITUZIONE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی کلاه از چه ساخته شده (پوسته، لایه‌ی فوم، طلق، بند، دریچه‌های هوا)، کلاهِ تمام‌صورت چه چیزی اضافه دارد، با چه چیزی تمیزش کنی و با چه چیزی نه، و کِی باید کلاه یا طلق را عوض کنی، حتی وقتی ظاهرش سالم است.",
      why:
        "۲۱ سؤال. سؤال‌ها دنبالِ سه اشتباهِ رایج‌اند: تمیز کردن با بنزین یا حلال، تعمیرِ ترک یا خط با چسب، و نگه داشتنِ کلاه بعد از ضربه یا سال‌ها. چیزی که هر سه را توضیح می‌دهد زیرِ پوسته است: لایه‌ی فوم.",
    },
    {
      kind: "anatomy",
      scene: "casco",
      title: "کلاه را از وسط ببین",
      body:
        "پوسته‌ی سخت ضربه را پخش می‌کند. زیرِ آن لایه‌ی فوم (پلی‌استایرن، EPS) با له شدن انرژیِ ضربه را می‌گیرد و له‌شده دیگر به حالتِ اول برنمی‌گردد. کلاهِ تمام‌صورت (integrale) چانه و صورت را هم می‌پوشاند و در شهر و روی موتور گازی هم مجاز و مفید است. کلاه باید به اندازه‌ی سرِ تو باشد. روی هر بخش بزن.",
      parts: [
        {
          id: "calotta",
          nameIt: "calotta esterna",
          nameFa: "پوسته‌ی کلاه",
          text: "سخت، ولی حساس به حلال‌ها: بنزین، تینر، رنگ و چسبِ حلال‌دار مقاومتش را کم می‌کنند. نور و گرما هم به مرور پیرش می‌کنند.",
        },
        {
          id: "imbottitura",
          nameIt: "calotta interna (EPS)",
          nameFa: "لایه‌ی فوم",
          text: "انرژیِ ضربه را با له شدن می‌گیرد. بعد از ضربه‌ی شدید ممکن است له شده باشد بی‌آن‌که پوسته‌ی بیرونی چیزی نشان دهد؛ برای همین کلاه را عوض می‌کنی.",
        },
        {
          id: "visiera",
          nameIt: "visiera",
          nameFa: "طلقِ کلاه",
          text: "چشم و صورت را از باد، باران، حشره و سنگریزه حفظ می‌کند. دید را بدتر نمی‌کند؛ باید در هر نوری دیدِ کامل بدهد.",
        },
        {
          id: "aerazione",
          nameIt: "prese d'aria",
          nameFa: "دریچه‌های هوا",
          text: "هوا را جابه‌جا می‌کنند تا طلق بخار نگیرد.",
        },
        {
          id: "cinturino",
          nameIt: "cinturino",
          nameFa: "بندِ زیرِ چانه",
          text: "کلاه را روی سر نگه می‌دارد. همیشه بسته. کلاهِ گشاد در افتادن می‌چرخد یا درمی‌آید؛ اندازه‌ی درست را بخر.",
        },
      ],
      takeaway: "پوسته پخش می‌کند، فوم می‌گیرد، طلق محافظت می‌کند و دید می‌دهد، بند نگه می‌دارد.",
      rule: TECH,
    },
    {
      kind: "table",
      title: "تمیز کردن: دشمنانِ پوسته",
      body:
        "پوسته‌ی بیشترِ کلاه‌ها پلاستیکِ فنی یا کامپوزیت است. حلال‌ها در آن نفوذ می‌کنند و بی‌آن‌که چیزی دیده شود مقاومتش را کم می‌کنند.",
      columns: ["با کلاه چه کنی"],
      rows: [
        { label: "شستن", it: "detersivi non corrosivi", values: ["آب و پاک‌کننده‌ی ملایم و غیرخورنده."] },
        { label: "حلال، بنزین، تینر", it: "solventi · benzina · acquaragia", values: ["هرگز، حتی برای پاک کردنِ حشره."] },
        { label: "برچسب و رنگ", it: "adesivi · vernici · colle", values: ["برچسب، رنگ یا چسبی که حلال دارد پوسته را ضعیف می‌کند. «هر برچسبی، به شرطی که روی طلق نباشد» غلط است."] },
        { label: "نور و گرما", it: "invecchiamento dovuto a luce e calore", values: ["کلاه با نور و گرما پیر می‌شود؛ زیرِ آفتاب یا کنارِ منبعِ گرما نگهش ندار."] },
      ],
      takeaway: "آب و پاک‌کننده‌ی ملایم. هیچ حلالی، هیچ برچسبِ حلال‌دار.",
      rule: TECH,
    },
    {
      kind: "table",
      title: "کِی عوضش کنی",
      body: "کلاه و طلق را تعمیر نمی‌کنی، عوض می‌کنی. چیزی که امنیت را می‌دهد یا دیده نمی‌شود (فوم) یا با چسب خراب می‌شود (طلق).",
      columns: ["قاعده"],
      rows: [
        { label: "بعد از ضربه‌ی شدید", it: "dopo un forte urto", values: ["عوض کن، حتی اگر پوسته سالم به نظر برسد: فومِ زیرِ آن ممکن است له شده باشد."] },
        { label: "عمرِ کلاه", it: "periodi lunghissimi", values: ["کلاه همیشگی نیست. سازنده‌ها معمولاً حدودِ پنج سال می‌گویند؛ «بیش از بیست سال» غلط است."] },
        { label: "ترک در پوسته", it: "nastro adesivo", values: ["با چسب‌نوار تعمیر نمی‌شود، هر قدر هم کوچک: عوض کن."] },
        { label: "طلقِ خط‌افتاده", it: "visiera rigata o danneggiata", values: ["عوض کن؛ چسبِ شفاف هم دید را خراب می‌کند. طلق باید در هر نوری دیدِ کامل بدهد."] },
      ],
      takeaway: "ضربه‌ی شدید، ترک یا طلقِ خراب: تعویض، نه تعمیر.",
      rule: TECH,
    },
    {
      kind: "classify",
      title: "کارِ درست یا آسیب‌زا؟",
      body: "هر کار را بخوان. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "corretto", fa: "کارِ درست" },
        { it: "dannoso", fa: "آسیب می‌زند" },
      ],
      items: [
        { prompt: "شستنِ کلاه با آب و صابونِ ملایم", answer: 0, explain: "پاک‌کننده‌ی غیرخورنده." },
        { prompt: "پاک کردنِ حشره‌ها با دستمالِ بنزینی", answer: 1, explain: "بنزین حلال است و پوسته را ضعیف می‌کند." },
        { prompt: "چسباندنِ برچسبِ تزیینی با چسبِ حلال‌دار", answer: 1, explain: "حلالِ چسب به پوسته نفوذ می‌کند." },
        { prompt: "تمامِ تابستان کلاه روی داشبوردِ آفتاب‌گیر می‌ماند", answer: 1, explain: "نور و گرما کلاه را پیر می‌کنند." },
        { prompt: "خریدنِ کلاهِ نو بعد از زمین خوردن، با این‌که پوسته سالم به نظر می‌رسد", answer: 0, explain: "فوم ممکن است له شده باشد." },
        { prompt: "چسب‌نوار روی یک ترکِ دو سانتی‌متری", answer: 1, explain: "ترک تعمیر نمی‌شود؛ کلاه عوض می‌شود." },
      ],
      takeaway: "حلال، چسب، آفتاب: دشمنِ کلاه. ضربه: کلاهِ نو.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il casco integrale", fa: "کلاه ایمنیِ تمام‌صورت" },
        { it: "la calotta", fa: "پوسته‌ی کلاه" },
        { it: "la visiera", fa: "طلقِ کلاه" },
        { it: "il cinturino", fa: "بندِ زیرِ چانه" },
        { it: "il solvente", fa: "حلال" },
        { it: "il detersivo", fa: "پاک‌کننده" },
        { it: "rigata", fa: "خط‌افتاده" },
        { it: "l’appannamento", fa: "بخار گرفتنِ طلق" },
        { it: "la taglia", fa: "اندازه" },
        { it: "sostituire", fa: "عوض کردن" },
      ],
    },
    {
      kind: "trap",
      title: "«non … con solventi» درست، «con benzina o acquaragia» غلط",
      body: "هر دو جمله درباره‌ی تمیز کردنِ کلاه است. یکی حلال را منع می‌کند، دیگری توصیه‌اش می‌کند:",
      examples: [
        {
          sourceId: "6063",
          textIt: "Il casco non deve essere pulito con solventi",
          answer: 1,
          chunks: [
            { it: "Il casco", fa: "کلاه ایمنی" },
            { it: "non deve essere pulito", fa: "نباید تمیز شود", verb: "deve ← dovere", focus: "negation" },
            { it: "con solventi", fa: "با حلال" },
          ],
          translation: "کلاه ایمنی نباید با حلال تمیز شود.",
          why: "درست است. حلال پوسته را ضعیف می‌کند.",
        },
        {
          sourceId: "6081",
          textIt: "Il casco deve essere periodicamente pulito con benzina o acquaragia per sgrassarlo ed eliminare resti di insetti",
          answer: 0,
          chunks: [
            { it: "Il casco", fa: "کلاه ایمنی" },
            { it: "deve essere periodicamente pulito", fa: "باید گاه‌به‌گاه تمیز شود", verb: "deve ← dovere" },
            { it: "con benzina o acquaragia", fa: "با بنزین یا تینر", focus: "contrast" },
            { it: "per sgrassarlo ed eliminare resti di insetti", fa: "تا چربی و باقی‌مانده‌ی حشره‌ها پاک شود", focus: "reason" },
          ],
          translation: "کلاه ایمنی باید گاه‌به‌گاه با بنزین یا تینر تمیز شود تا چربی و باقی‌مانده‌ی حشره‌ها پاک شود.",
          why: "غلط است. بنزین و تینر حلال‌اند؛ دلیلِ «حشره» این را درست نمی‌کند.",
        },
      ],
      takeaway: "بنزین، تینر، حلال: همیشه نه.",
      rule: TECH,
    },
  ],
  practice: [
    {
      sourceId: "6066",
      textIt: "Il casco integrale protegge anche il viso da traumi e lesioni in caso di incidente",
      answer: 1,
      chunks: [
        { it: "Il casco integrale", fa: "کلاه ایمنیِ تمام‌صورت" },
        { it: "protegge anche il viso", fa: "صورت را هم محافظت می‌کند", verb: "protegge ← proteggere", focus: "always" },
        { it: "da traumi e lesioni in caso di incidente", fa: "در برابرِ ضربه و آسیب در تصادف" },
      ],
      translation: "کلاه ایمنیِ تمام‌صورت در تصادف صورت را هم در برابرِ ضربه و آسیب محافظت می‌کند.",
      why: "درست است (قدم ۱). تمام‌صورت چانه و صورت را هم می‌پوشاند.",
      rule: TECH,
      conceptStep: 1,
    },
    {
      sourceId: "6087",
      textIt: "Il casco integrale è inutile se si circola a bordo di un ciclomotore a due ruote",
      answer: 0,
      chunks: [
        { it: "Il casco integrale", fa: "کلاه ایمنیِ تمام‌صورت" },
        { it: "è inutile", fa: "بی‌فایده است", verb: "è ← essere", focus: "negation" },
        { it: "se si circola a bordo di un ciclomotore a due ruote", fa: "اگر سوار بر موتور گازیِ دوچرخ می‌رانی", verb: "si circola ← circolare", focus: "condition" },
      ],
      translation: "اگر سوار بر موتور گازیِ دوچرخ می‌رانی، کلاه ایمنیِ تمام‌صورت بی‌فایده است.",
      why: "غلط است (قدم ۱). روی موتور گازی هم صورت در افتادن آسیب می‌بیند؛ تمام‌صورت آن‌جا هم محافظت می‌کند.",
      rule: TECH,
      conceptStep: 1,
    },
    {
      sourceId: "6080",
      textIt: "Sul casco possono essere applicati adesivi di qualunque tipo, purché non coprano la visiera",
      answer: 0,
      chunks: [
        { it: "Sul casco", fa: "روی کلاه ایمنی" },
        { it: "possono essere applicati adesivi di qualunque tipo,", fa: "می‌شود هر نوع برچسبی چسباند،", verb: "possono ← potere", focus: "always" },
        { it: "purché non coprano la visiera", fa: "به شرطی که طلق را نپوشانند", verb: "coprano ← coprire", focus: "condition" },
      ],
      translation: "روی کلاه ایمنی می‌شود هر نوع برچسبی چسباند، به شرطی که طلق را نپوشانند.",
      why: "غلط است (قدم ۲). چسبِ بعضی برچسب‌ها حلال دارد و پوسته را ضعیف می‌کند؛ «هر نوع» غلط است.",
      rule: TECH,
      conceptStep: 2,
    },
    {
      sourceId: "6070",
      textIt: "Il casco deve essere sostituito dopo che abbia subito un forte urto, anche se non mostra deformazioni sulla calotta esterna",
      answer: 1,
      chunks: [
        { it: "Il casco deve essere sostituito", fa: "کلاه ایمنی باید عوض شود", verb: "deve ← dovere" },
        { it: "dopo che abbia subito un forte urto,", fa: "بعد از این‌که ضربه‌ی شدیدی خورده باشد،", verb: "abbia subito ← subire", focus: "condition" },
        { it: "anche se non mostra deformazioni sulla calotta esterna", fa: "حتی اگر روی پوسته‌ی بیرونی تغییرِ شکلی دیده نشود", verb: "mostra ← mostrare", focus: "always" },
      ],
      translation: "کلاه ایمنی بعد از این‌که ضربه‌ی شدیدی خورده باشد باید عوض شود، حتی اگر روی پوسته‌ی بیرونی تغییرِ شکلی دیده نشود.",
      why: "درست است (قدم ۳). فومِ زیرِ پوسته ممکن است له شده باشد و دیده نمی‌شود.",
      rule: TECH,
      conceptStep: 3,
    },
    {
      sourceId: "6091",
      textIt: "La calotta del casco può essere riparata con nastro adesivo di tipo speciale, se presenta una rottura inferiore ai tre centimetri",
      answer: 0,
      chunks: [
        { it: "La calotta del casco", fa: "پوسته‌ی کلاه" },
        { it: "può essere riparata con nastro adesivo di tipo speciale,", fa: "می‌تواند با چسب‌نوارِ مخصوص تعمیر شود،", verb: "può ← potere" },
        { it: "se presenta una rottura inferiore ai tre centimetri", fa: "اگر ترکش کمتر از سه سانتی‌متر باشد", verb: "presenta ← presentare", focus: "limit" },
      ],
      translation: "اگر ترکِ پوسته‌ی کلاه کمتر از سه سانتی‌متر باشد، می‌تواند با چسب‌نوارِ مخصوص تعمیر شود.",
      why: "غلط است (قدم ۳). ترک تعمیر نمی‌شود، هر قدر کوچک؛ کلاه عوض می‌شود. «سه سانتی‌متر» عددِ ساختگی است.",
      rule: TECH,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6066", "6067", "6068", "6069", "6078", "6086", "6087", "6090"] },
    { step: 2, sourceIds: ["6061", "6062", "6063", "6064", "6071", "6080", "6081"] },
    { step: 3, sourceIds: ["6070", "6076", "6077", "6085", "6091", "6092"] },
  ],
};
