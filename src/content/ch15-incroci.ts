/**
 * src/content/ch15-incroci.ts
 * Chapter 15 (Sorpasso), lesson 5: the places where overtaking is banned
 * outright and their exceptions. Junctions (CdS art. 148 c.12: banned, except
 * a) left turn started, b) priority road with separated carriageways / one
 * way / 2+ marked lanes, c) a non-motor two-wheeler without crossing into the
 * opposite side, d) lights or officers); queues at level crossings, lights and
 * in congestion (c.11); unbarriered level crossings unless there are lights
 * (c.13); a vehicle stopped or slowing for pedestrians (c.13; DPR 495/1992
 * art. 347 c.3, not limited to crossings); acceleration and deceleration
 * lanes (DPR 495/1992 art. 347 c.1).
 *
 * The bans themselves were introduced in lesson 2 step 2 (sorpasso-valutare),
 * which keeps the questions it already mapped; this lesson teaches the
 * exceptions and the cases that lesson left out.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter15.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_148 = "Codice della Strada, art. 148";
const DPR_347 = "DPR 495/1992, art. 347";
const CONSENTITO = "E' consentito il sorpasso";
const CONSENTITO_FA = "سبقت مجاز است";

export const lessonSorpassoIncroci: Lesson = {
  id: "sorpasso-incroci-pedoni",
  titleFa: "تقاطع، گذرگاهِ راه‌آهن، عابر",
  titleIt: "INTERSEZIONI · PASSAGGI A LIVELLO · PEDONI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی سبقت نزدیکِ تقاطع ممنوع است و چهار استثنایش را می‌شناسی؛ می‌دانی در گذرگاهِ راه‌آهنِ بی‌راه‌بند، پشتِ صف، کنارِ عابر و در خطِ شتاب چه می‌کنی، و چرا «قطار دور است» یا «کسی از راست نمی‌آید» هیچ‌وقت دلیلِ سبقت نیست.",
      why:
        "۱۱ سؤال. در درسِ ۲ دیدی این جاها ممنوع‌اند. این‌جا استثناها را می‌بینی: بانک بیشتر از همه همین‌ها را می‌پرسد، چون جمله‌ی «مجاز است» درباره‌ی جایی که معمولاً ممنوع است، به نظرِ اکثرِ آدم‌ها غلط می‌آید.",
      rule: `${CDS_148} c.11–13; ${DPR_347} c.1, c.3`,
    },
    {
      kind: "table",
      title: "تقاطع: ممنوع، با چهار استثنا",
      body:
        "نزدیکِ تقاطع یا وسطِ آن سبقت ممنوع است، چون کسی ممکن است از راه‌های دیگر وارد شود یا بپیچد. قانون چهار حالت را جدا کرده که خطرش این نیست. هر جمله‌ای که سبقت در تقاطع را «مجاز» بداند، باید یکی از این چهار را داشته باشد:",
      columns: ["چرا مجاز است"],
      rows: [
        {
          label: "وسیله‌ی جلو راهنمای چپ زده و پیچیدن را شروع کرده",
          it: "intende svoltare a sinistra e abbia iniziato",
          values: ["از راستش رد می‌شوی؛ همان قاعده‌ی درسِ ۴"],
        },
        {
          label: "تو روی جاده‌ی با حق تقدمی که دو سواره‌روی جدا دارد، یا یک‌طرفه است، یا دست‌کم دو خطِ عبورِ هم‌جهتِ خط‌کشی‌شده",
          it: "strada a precedenza · carreggiate separate · corsie delimitate",
          values: ["کسی از روبه‌رو در خطِ تو نیست و خط‌ها جدا شده‌اند"],
        },
        {
          label: "وسیله‌ای که از آن جلو می‌زنی دوچرخه است (دوچرخِ بی‌موتور)",
          it: "veicolo a due ruote non a motore",
          values: ["فقط اگر لازم نباشد به سمتِ مقابل بروی. موتورسیکلت و موتور گازی این استثنا را ندارند"],
        },
        {
          label: "چراغِ راهنمایی یا مأمورِ راهنمایی تقاطع را اداره می‌کند",
          it: "regolate da semafori o da agenti del traffico",
          values: ["چراغ یا مأمور می‌گوید چه کسی کِی برود؛ خطرِ «کسی از کنار وارد شود» برداشته شده"],
        },
      ],
      takeaway:
        "تقاطع = ممنوع، مگر یکی از چهار حالت: پیچیدنِ جلویی به چپ، جاده‌ی با حق تقدمِ جداشده، دوچرخه بدونِ رفتن به سمتِ مقابل، چراغ یا مأمور. «کسی از راست نمی‌آید» یکی از آن‌ها نیست.",
      rule: `${CDS_148} c.12`,
    },
    {
      kind: "table",
      title: "راه‌آهن، صف، عابر و خطِ شتاب",
      body:
        "این پنج جا هم قاعده‌ی خودشان را دارند. نکته‌ی مشترک: هر جا جلوی تو کسی ایستاده یا آهسته کرده، ممکن است دلیلش چیزی باشد که تو نمی‌بینی.",
      columns: ["سبقت", "نکته"],
      rows: [
        {
          label: "نزدیکِ گذرگاهِ راه‌آهنِ بی‌راه‌بند",
          it: "passaggi a livello senza barriere",
          values: ["ممنوع", "مگر اینکه چراغِ راهنمایی عبور را اداره کند. «قطار دور است» استثنا نیست"],
        },
        {
          label: "صفِ ایستاده یا کُند پشتِ گذرگاهِ راه‌آهن، پشتِ چراغِ قرمز یا در ترافیکِ سنگین",
          it: "fermi o in lento movimento · semafori · congestione",
          values: ["ممنوع، اگر باید به سمتِ مقابل بروی", "صف دلیل دارد؛ جلوی صف ممکن است قطار، عابر یا تصادف باشد"],
        },
        {
          label: "وسیله‌ای که برای عبورِ عابر ایستاده یا آهسته کرده",
          it: "per consentire l'attraversamento dei pedoni",
          values: ["ممنوع", "در گذرگاهِ عابر پیاده، و حتی بیرون از آن: بقیه‌ی خط‌های عبور هم باید بایستند"],
        },
        {
          label: "خطِ شتاب و خطِ کاهشِ سرعت",
          it: "corsie di accelerazione o di decelerazione",
          values: ["ممنوع", "این خط‌ها فقط برای وارد شدن و خارج شدن‌اند. «با دقت» آن را مجاز نمی‌کند"],
        },
      ],
      takeaway:
        "راه‌آهنِ بی‌راه‌بند: فقط با چراغ. صف پشتِ راه‌آهن یا چراغ: نه، اگر باید به سمتِ مقابل بروی. وسیله‌ای که برای عابر ایستاده: هرگز. خطِ شتاب و کاهشِ سرعت: هرگز.",
      rule: `${CDS_148} c.11, c.13; ${DPR_347} c.1, c.3`,
    },
    {
      kind: "classify",
      title: "این‌جا سبقت مجاز است؟",
      body: "هر موقعیت را با قاعده‌ی دو قدمِ قبل بسنج. فقط پرسشِ قانون است؛ بررسی‌های ایمنیِ درسِ ۲ همیشه سرِ جایشان‌اند. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "consentito", fa: "مجاز است" },
        { it: "vietato", fa: "ممنوع است" },
      ],
      items: [
        { prompt: "تقاطعی بی‌چراغ در جاده‌ی دوطرفه؛ از راست کسی نمی‌آید", answer: 1, explain: "تقاطع ممنوع است. خالی بودنِ سمتِ راست هیچ‌کدام از چهار استثنا نیست." },
        { prompt: "تقاطعی با چراغِ راهنمایی که سبز است", answer: 0, explain: "استثنای «د»: چراغ تقاطع را اداره می‌کند." },
        {
          prompt: "تقاطع در جاده‌ی دوطرفه؛ از یک دوچرخه جلو می‌زنی و در خطِ خودت جا هست",
          answer: 0,
          explain: "استثنای «ج»: دوچرخه، بدونِ رفتن به سمتِ مقابل. فاصله‌ی جانبیِ کافی (هر جا ممکن است ۱٫۵ متر) فراموش نشود.",
        },
        { prompt: "همان تقاطع، ولی جلوی تو موتور گازی است", answer: 1, explain: "استثنا فقط برای دوچرخِ بی‌موتور است؛ موتور گازی موتور دارد." },
        { prompt: "گذرگاهِ راه‌آهنِ بی‌راه‌بند و بی‌چراغ؛ قطار دیده نمی‌شود", answer: 1, explain: "بی‌راه‌بند و بی‌چراغ: ممنوع. اینکه قطار را نمی‌بینی چیزی را عوض نمی‌کند." },
        { prompt: "خودرویی بیرون از گذرگاهِ عابر پیاده ایستاده تا کسی از خیابان رد شود", answer: 1, explain: "برای عابر ایستاده: ممنوع، حتی بیرون از گذرگاه. عابر پشتِ آن خودرو پنهان است." },
        { prompt: "در خطِ شتابِ ورودیِ آزادراه، کامیونِ جلو آهسته است", answer: 1, explain: "در خطِ شتاب سبقت ممنوع است. پشتش شتاب بگیر و وقتی امن شد وارد شو." },
      ],
      takeaway: "در هر موقعیتِ «ممنوع»، بپرس کدام استثنا آن را باز می‌کند. اگر نتوانستی یکی از فهرست را نام ببری، جوابت «ممنوع» است.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'intersezione", fa: "تقاطع", note: "«in prossimità o in corrispondenza» = نزدیکِ آن یا درست روی آن." },
        { it: "la strada a precedenza", fa: "جاده‌ی با حق تقدم" },
        { it: "il passaggio a livello senza barriere", fa: "گذرگاه راه‌آهنِ بی‌راه‌بند" },
        { it: "in lento movimento", fa: "در حالِ حرکتِ کُند" },
        { it: "la congestione della circolazione", fa: "ترافیکِ سنگین؛ راه‌بندان" },
        { it: "l'attraversamento pedonale", fa: "گذرگاه عابر پیاده", note: "در بعضی سؤال‌ها «passaggio pedonale» آمده؛ همان است." },
        { it: "la corsia di accelerazione", fa: "خطِ شتاب", note: "la corsia di decelerazione = خطِ کاهشِ سرعت (برای خروج)." },
        { it: "regolato da semafori", base: "regolare", fa: "که چراغِ راهنمایی اداره‌اش می‌کند" },
      ],
    },
    {
      kind: "trap",
      title: "قطار دور است، یا چراغ هست؟",
      body: "هر دو جمله سبقت در گذرگاهِ راه‌آهنِ بی‌راه‌بند را مجاز می‌دانند. فقط یکی دلیلِ درستی دارد:",
      examples: [
        {
          sourceId: "5188",
          textIt: "E' consentito il sorpasso in prossimità o in corrispondenza di passaggi a livello senza barriere se la circolazione è regolata da semafori",
          answer: 1,
          chunks: [
            { it: CONSENTITO, fa: CONSENTITO_FA, verb: "E' consentito ← consentire" },
            { it: "in prossimità o in corrispondenza", fa: "نزدیکِ یا روی" },
            { it: "di passaggi a livello senza barriere", fa: "گذرگاه‌های راه‌آهنِ بی‌راه‌بند" },
            { it: "se la circolazione è regolata da semafori", fa: "اگر عبور را چراغِ راهنمایی اداره کند", focus: "condition" },
          ],
          translation: "نزدیکِ یا روی گذرگاه‌های راه‌آهنِ بی‌راه‌بند سبقت مجاز است، اگر عبور را چراغِ راهنمایی اداره کند.",
          why: "درست است. بند ۱۳ همین یک استثنا را دارد: وقتی چراغ هست.",
        },
        {
          sourceId: "5207",
          textIt: "E' consentito il sorpasso di veicoli fermi ai passaggi a livello senza barriere se il treno è distante",
          answer: 0,
          chunks: [
            { it: CONSENTITO, fa: CONSENTITO_FA, verb: "E' consentito ← consentire" },
            { it: "di veicoli fermi", fa: "از وسیله‌های ایستاده" },
            { it: "ai passaggi a livello senza barriere", fa: "پشتِ گذرگاه‌های راه‌آهنِ بی‌راه‌بند" },
            { it: "se il treno è distante", fa: "اگر قطار دور باشد", focus: "condition" },
          ],
          translation: "سبقت از وسیله‌هایی که پشتِ گذرگاه‌های راه‌آهنِ بی‌راه‌بند ایستاده‌اند مجاز است، اگر قطار دور باشد.",
          why: "غلط است. «قطار دور است» قضاوتِ توست، نه استثنای قانون؛ و آن‌ها دلیلی برای ایستادن دارند.",
        },
      ],
      takeaway: "استثنا را قانون می‌دهد (چراغ)، نه حدسِ تو (قطار دور است، کسی از راست نمی‌آید، با دقت انجامش می‌دهم).",
      rule: `${CDS_148} c.11, c.13`,
    },
  ],
  practice: [
    {
      sourceId: "5186",
      textIt: "E' consentito il sorpasso in corrispondenza delle intersezioni se si supera un veicolo a due ruote non a motore e non si invade il lato riservato al senso opposto",
      answer: 1,
      chunks: [
        { it: CONSENTITO, fa: CONSENTITO_FA, verb: "E' consentito ← consentire" },
        { it: "in corrispondenza delle intersezioni", fa: "روی تقاطع‌ها" },
        { it: "se si supera un veicolo a due ruote non a motore", fa: "اگر از یک وسیله‌ی دوچرخِ بی‌موتور جلو بزنی", focus: "condition", verb: "si supera ← superare" },
        { it: "e non si invade il lato riservato al senso opposto", fa: "و واردِ سمتِ مخصوصِ جهتِ مقابل نشوی", focus: "negation", verb: "si invade ← invadere" },
      ],
      translation: "روی تقاطع‌ها سبقت مجاز است، اگر از یک وسیله‌ی دوچرخِ بی‌موتور جلو بزنی و واردِ سمتِ مخصوصِ جهتِ مقابل نشوی.",
      why: "درست است (قدم ۱). استثنای «ج» با هر دو شرطش: دوچرخِ بی‌موتور، و ماندن در سمتِ خودت.",
      rule: `${CDS_148} c.12 lett. c`,
      conceptStep: 1,
    },
    {
      sourceId: "5183",
      textIt: "E' consentito il sorpasso in prossimità o in corrispondenza delle intersezioni se regolate dai semafori",
      answer: 1,
      chunks: [
        { it: CONSENTITO, fa: CONSENTITO_FA, verb: "E' consentito ← consentire" },
        { it: "in prossimità o in corrispondenza delle intersezioni", fa: "نزدیکِ یا روی تقاطع‌ها" },
        { it: "se regolate dai semafori", fa: "اگر چراغِ راهنمایی اداره‌شان کند", focus: "condition" },
      ],
      translation: "نزدیکِ یا روی تقاطع‌ها سبقت مجاز است، اگر چراغِ راهنمایی اداره‌شان کند.",
      why: "درست است (قدم ۱). استثنای «د». بقیه‌ی بررسی‌ها و ممنوعیت‌ها، مثلاً خطِ ممتد یا صفِ پشتِ چراغ، سرِ جایشان‌اند.",
      rule: `${CDS_148} c.12 lett. d`,
      conceptStep: 1,
    },
    {
      sourceId: "5201",
      textIt: "E' vietato il sorpasso se il veicolo da superare si è fermato per dare precedenza ai pedoni, anche fuori dagli attraversamenti pedonali",
      answer: 1,
      chunks: [
        { it: "E' vietato il sorpasso", fa: "سبقت ممنوع است", verb: "E' ← essere" },
        { it: "se il veicolo da superare si è fermato", fa: "اگر وسیله‌ای که می‌خواهی از آن جلو بزنی ایستاده باشد", focus: "condition", verb: "si è fermato ← fermarsi" },
        { it: "per dare precedenza ai pedoni,", fa: "تا به عابرها حق تقدم بدهد،", focus: "reason" },
        { it: "anche fuori dagli attraversamenti pedonali", fa: "حتی بیرون از گذرگاه‌های عابر پیاده" },
      ],
      translation: "اگر وسیله‌ای که می‌خواهی از آن جلو بزنی ایستاده باشد تا به عابرها حق تقدم بدهد، سبقت ممنوع است، حتی بیرون از گذرگاه‌های عابر پیاده.",
      why: "درست است (قدم ۲). عابری که از جلوی آن وسیله رد می‌شود از دیدِ تو پنهان است. آیین‌نامه می‌گوید وقتی وسیله‌ای برای عابر می‌ایستد، بقیه‌ی خط‌ها هم بایستند، و این را به گذرگاه محدود نکرده است.",
      rule: `${CDS_148} c.13; ${DPR_347} c.3`,
      conceptStep: 2,
    },
    {
      sourceId: "5210",
      textIt: "E' consentito il sorpasso sulle corsie d'accelerazione purché la manovra venga effettuata con attenzione",
      answer: 0,
      chunks: [
        { it: CONSENTITO, fa: CONSENTITO_FA, verb: "E' consentito ← consentire" },
        { it: "sulle corsie d'accelerazione", fa: "در خط‌های شتاب" },
        { it: "purché la manovra venga effettuata con attenzione", fa: "به شرطی که با دقت انجام شود", focus: "condition", verb: "venga effettuata ← effettuare" },
      ],
      translation: "در خط‌های شتاب سبقت مجاز است، به شرطی که با دقت انجام شود.",
      why: "غلط است (قدم ۲). آیین‌نامه سبقت در خطِ شتاب و کاهشِ سرعت را ممنوع کرده است، بی‌شرط. «با دقت» ممنوعیت را برنمی‌دارد.",
      rule: `${DPR_347} c.1`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // the four junction exceptions (c.12 lett. a–d); the junction ban itself (5209, 4584) stays in sorpasso-valutare
      sourceIds: ["5183", "5185", "5186", "5187"],
    },
    {
      step: 2,
      // queues at lights (c.11), unbarriered level crossings (c.13), pedestrians (c.13; DPR art. 347 c.3), acceleration lanes (DPR art. 347 c.1)
      sourceIds: ["5181", "5188", "5191", "5201", "5207", "5208", "5210"],
    },
  ],
};
