/**
 * src/content/ch13-carico.ts
 * Chapter 13 (Norme di circolazione), lesson 12: the load. On cars (CdS
 * art. 164: secured, does not block the view or the driver's movements,
 * nothing at the front, at the rear up to 3/10 of the length, sideways at
 * most 30 cm, overhang marked with retroreflective square panels; the
 * portata from the carta di circolazione, art. 167) and on motorcycles
 * (art. 170 c.5: secured, ≤ 50 cm, animals only in a cage).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter13.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS = (n: number) => `Codice della Strada, art. ${n}`;
const SISTEMATO = "Il carico deve essere sistemato sugli autoveicoli";
const SISTEMATO_FA = "بار روی خودرو باید طوری چیده شود";

export const lessonCarico: Lesson = {
  id: "norme-carico",
  titleFa: "بار روی خودرو و موتورسیکلت",
  titleIt: "IL CARICO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی بار را چطور روی خودرو و موتورسیکلت می‌گذاری: محکم، بی‌آن‌که جلوی دید یا دست و پایت را بگیرد، و بیرون‌زدگیِ آن از کدام طرف و تا چقدر مجاز است.",
      why:
        "۱۵ سؤال، و تقریباً همه با عدد بازی می‌کنند: «سه‌دهم» درست است ولی فقط از عقب؛ «۱۰ درصد بیشتر از ظرفیت» و «۱۰ درصد بلندتر» اصلاً وجود ندارند. عددِ درست را با جهتش یاد بگیر.",
      rule: `${CDS(164)} c.1–3, c.6; ${CDS(167)}; ${CDS(170)} c.5`,
    },
    {
      kind: "table",
      title: "بار روی خودرو",
      body:
        "اول سه شرطِ همیشگی: بار نباید بیفتد یا پخش شود، نباید دیدِ راننده را کم کند، و نباید آزادیِ حرکتِ او را برای رانندگی بگیرد. بعد بیرون‌زدگی، که هر طرف قاعده‌ی خودش را دارد. وزن هم سقف دارد: ظرفیتِ نوشته‌شده در کارتِ خودرو (carta di circolazione)، بی‌هیچ درصدی اضافه.",
      columns: ["قاعده", "دامِ بانک"],
      rows: [
        { label: "جلو", it: "parte anteriore", values: ["هیچ بیرون‌زدگی‌ای مجاز نیست", "«تا سه‌دهمِ طول از جلو» غلط است"] },
        {
          label: "عقب",
          it: "parte posteriore · tre decimi",
          values: ["فقط چیزِ تقسیم‌ناشدنی، تا سه‌دهمِ طولِ خودرو", "بانک همین سه‌دهم را به جلو یا پهلو می‌چسباند؛ آن‌جا غلط است"],
        },
        { label: "پهلو", it: "sporgenza laterale", values: ["حداکثر ۳۰ سانتی‌متر از چراغ‌های کوچک (luci di posizione)", "«تا سه‌دهمِ طول از پهلو» غلط است"] },
        {
          label: "علامتِ بیرون‌زدگیِ عقب",
          it: "pannello quadrangolare retroriflettente",
          values: ["یک یا دو تابلوی مربعیِ بازتاب‌دهنده با راه‌راهِ قرمز و سفید، شب و روز", "«روز یک پارچه‌ی قرمز» یا «راه‌راهِ زرد و قرمز» غلط است"],
        },
        {
          label: "وزن",
          it: "portata indicata nella carta di circolazione",
          values: ["از ظرفیتِ نوشته‌شده در کارتِ خودرو بیشتر نشود", "«تا ۱۰٪ بیشتر از ظرفیت» غلط است"],
        },
        { label: "ارتفاع", it: "altezza massima", values: ["از ابعادِ مجازِ خودرو بیرون نزند", "«تا ۱۰٪ بلندتر، ولی زیرِ ۴ متر» قاعده نیست"] },
      ],
      takeaway: "جلو هیچ، عقب سه‌دهم، پهلو ۳۰ سانت. وزن تا ظرفیتِ کارت، نه یک درصد بیشتر.",
      rule: `${CDS(164)} c.1–3, c.6; ${CDS(167)}`,
    },
    {
      kind: "table",
      title: "بار روی موتورسیکلت",
      body:
        "روی موتورسیکلت هم بار مجاز است، با شرط‌های سخت‌تر، چون تعادلِ وسیله و دستِ راننده درگیرند. قانون می‌گوید بار باید محکم بسته شود، از محورِ وسیله به پهلو یا از بدنه به جلو و عقب بیش از ۵۰ سانتی‌متر بیرون نزند، و جلوی دید را نگیرد. حیوان فقط در قفس یا جعبه‌ی مخصوص.",
      columns: ["قاعده", "دامِ بانک"],
      rows: [
        { label: "بار به‌طورِ کلی", it: "trasportare un carico", values: ["مجاز است، با شرط‌های زیر", "«روی موتورسیکلت در هیچ حالی بار مجاز نیست» غلط است"] },
        { label: "بستن", it: "saldamente assicurati", values: ["محکم بسته شود", "«کیسه‌ی خرید، حتی اگر محکم نباشد» غلط است"] },
        { label: "بیرون‌زدگی", it: "50 cm", values: ["به پهلو یا جلو و عقب، بیش از ۵۰ سانتی‌متر نه", "قاعده‌ی سه‌دهمِ خودرو این‌جا کاربرد ندارد"] },
        { label: "حیوان", it: "in apposita gabbia", values: ["فقط در قفس یا جعبه‌ی مخصوص", "حیوانِ آزاد روی ترک یا در بغلِ سرنشین نه"] },
      ],
      takeaway: "موتورسیکلت: بار آری، ولی محکم، حداکثر ۵۰ سانت بیرون‌زدگی، و حیوان فقط در قفس.",
      rule: `${CDS(170)} c.5`,
    },
    {
      kind: "classify",
      title: "این بار مجاز است؟",
      body: "هر مورد را بخوان و بگو طبقِ قاعده مجاز است یا نه. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "consentito", fa: "مجاز" },
        { it: "vietato", fa: "مجاز نیست" },
      ],
      items: [
        { prompt: "سواریِ ۴ متری با نردبانی که ۱ متر از عقب بیرون زده و تابلوی راه‌راهِ قرمز و سفید دارد", answer: 0, explain: "سه‌دهمِ ۴ متر ۱٫۲ متر است؛ ۱ متر کمتر است و علامت هم دارد." },
        { prompt: "همان نردبان، ولی ۳۰ سانتی‌متر از جلوی خودرو بیرون زده", answer: 1, explain: "از جلو هیچ بیرون‌زدگی‌ای مجاز نیست." },
        { prompt: "جعبه‌هایی روی صندلیِ عقب که آینه‌ی وسط را کامل پوشانده‌اند", answer: 1, explain: "بار نباید دیدِ راننده را کم کند." },
        { prompt: "گربه‌ای در قفسِ مخصوص، محکم‌بسته روی ترکِ موتورسیکلت", answer: 0, explain: "حیوان روی موتورسیکلت فقط در قفس یا جعبه‌ی مخصوص؛ این‌جا همین است." },
        { prompt: "کیسه‌های خرید آویزان از فرمانِ موتورسیکلت، بی‌آن‌که بسته شده باشند", answer: 1, explain: "بار باید محکم بسته شود و نباید جلوی حرکتِ راننده را بگیرد." },
      ],
      takeaway: "اول جهت (جلو، عقب، پهلو)، بعد عدد، بعد سه شرطِ همیشگی: نیفتد، جلوی دید را نگیرد، جلوی حرکت را نگیرد.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il carico", fa: "بار" },
        { it: "sistemare", fa: "چیدن؛ جا دادن" },
        { it: "sporgere · la sporgenza", fa: "بیرون زدن · بیرون‌زدگی" },
        { it: "anteriore · posteriore · laterale", fa: "جلو · عقب · پهلو" },
        { it: "tre decimi della lunghezza", fa: "سه‌دهمِ طول", note: "یعنی ۳۰٪ طولِ خودرو." },
        { it: "la portata (utile)", fa: "ظرفیتِ بار", note: "در کارتِ خودرو (carta di circolazione) نوشته شده." },
        { it: "il pannello retroriflettente", fa: "تابلوی بازتاب‌دهنده" },
        { it: "la gabbia", fa: "قفس" },
      ],
    },
    {
      kind: "trap",
      title: "سه‌دهم، ولی از کدام طرف؟",
      body: "«سه‌دهمِ طول» در هر دو جمله هست. یکی جهتِ درست را می‌گوید، یکی همان عدد را به جهتِ غلط می‌چسباند:",
      examples: [
        {
          sourceId: "4375",
          textIt: "Il carico deve essere sistemato sugli autoveicoli in modo da non sporgere dalla parte posteriore per più dei tre decimi della lunghezza del veicolo",
          answer: 1,
          chunks: [
            { it: SISTEMATO, fa: SISTEMATO_FA, verb: "deve ← dovere" },
            { it: "in modo da non sporgere dalla parte posteriore", fa: "که از عقب بیرون نزند", focus: "negation" },
            { it: "per più dei tre decimi della lunghezza del veicolo", fa: "بیش از سه‌دهمِ طولِ خودرو", focus: "limit" },
          ],
          translation: "بار روی خودرو باید طوری چیده شود که از عقب بیش از سه‌دهمِ طولِ خودرو بیرون نزند.",
          why: "درست است. سه‌دهم فقط سقفِ بیرون‌زدگیِ عقب است (و فقط برای بارِ تقسیم‌ناشدنی).",
        },
        {
          sourceId: "4377",
          textIt: "Il carico deve essere sistemato sugli autoveicoli in modo da evitare la sporgenza laterale dello stesso per più di tre decimi della lunghezza del veicolo",
          answer: 0,
          chunks: [
            { it: SISTEMATO, fa: SISTEMATO_FA, verb: "deve ← dovere" },
            { it: "in modo da evitare la sporgenza laterale dello stesso", fa: "که بیرون‌زدگیِ پهلویی‌اش", focus: "contrast" },
            { it: "per più di tre decimi della lunghezza del veicolo", fa: "بیش از سه‌دهمِ طولِ خودرو نشود", focus: "limit" },
          ],
          translation: "بار روی خودرو باید طوری چیده شود که بیرون‌زدگیِ پهلویی‌اش بیش از سه‌دهمِ طولِ خودرو نشود.",
          why: "غلط است. سه‌دهم مالِ عقب است. از پهلو حداکثر ۳۰ سانتی‌متر از چراغ‌های کوچک مجاز است.",
        },
      ],
      takeaway: "عدد را با جهتش حفظ کن: عقب = سه‌دهمِ طول، پهلو = ۳۰ سانت، جلو = صفر.",
      rule: `${CDS(164)} c.2–3`,
    },
  ],
  practice: [
    {
      sourceId: "4372",
      textIt: "Il carico deve essere sistemato sugli autoveicoli in modo da non diminuire la visibilità del conducente",
      answer: 1,
      chunks: [
        { it: SISTEMATO, fa: SISTEMATO_FA, verb: "deve ← dovere" },
        { it: "in modo da non diminuire la visibilità del conducente", fa: "که دیدِ راننده را کم نکند", focus: "negation" },
      ],
      translation: "بار روی خودرو باید طوری چیده شود که دیدِ راننده را کم نکند.",
      why: "درست است (قدم ۱). یکی از سه شرطِ همیشگیِ بار: نیفتد، جلوی دید را نگیرد، جلوی حرکتِ راننده را نگیرد.",
      rule: `${CDS(164)} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "4379",
      textIt: "Il carico deve essere sistemato sugli autoveicoli in modo da non superare di oltre il 10% la portata utile indicata sul documento di circolazione",
      answer: 0,
      chunks: [
        { it: SISTEMATO, fa: SISTEMATO_FA, verb: "deve ← dovere" },
        { it: "in modo da non superare di oltre il 10%", fa: "که بیش از ۱۰٪ بیشتر نشود از", focus: "limit" },
        { it: "la portata utile indicata sul documento di circolazione", fa: "ظرفیتِ باری که در کارتِ خودرو نوشته شده" },
      ],
      translation: "بار روی خودرو باید طوری چیده شود که بیش از ۱۰٪ از ظرفیتِ نوشته‌شده در کارتِ خودرو بیشتر نشود.",
      why: "غلط است (قدم ۱). ظرفیتِ کارتِ خودرو سقف است؛ هیچ ۱۰٪ اضافه‌ای مجاز نیست.",
      rule: `${CDS(167)}`,
      conceptStep: 1,
    },
    {
      sourceId: "4370",
      textIt: "Sui motocicli è consentito il trasporto di animali se custoditi in apposita gabbia",
      answer: 1,
      chunks: [
        { it: "Sui motocicli", fa: "روی موتورسیکلت‌ها" },
        { it: "è consentito il trasporto di animali", fa: "حملِ حیوان مجاز است", verb: "è consentito ← consentire" },
        { it: "se custoditi in apposita gabbia", fa: "اگر در قفسِ مخصوص نگه داشته شوند", focus: "condition", verb: "custoditi ← custodire" },
      ],
      translation: "روی موتورسیکلت‌ها حملِ حیوان مجاز است، اگر در قفسِ مخصوص نگه داشته شوند.",
      why: "درست است (قدم ۲). قانون حملِ حیوان را روی موتورسیکلت فقط در قفس یا جعبه‌ی مخصوص اجازه می‌دهد.",
      rule: `${CDS(170)} c.5`,
      conceptStep: 2,
    },
    {
      sourceId: "4383",
      textIt: "Sui motocicli in nessun caso è consentito trasportare un carico",
      answer: 0,
      chunks: [
        { it: "Sui motocicli", fa: "روی موتورسیکلت‌ها" },
        { it: "in nessun caso", fa: "در هیچ حالی", focus: "always" },
        { it: "è consentito trasportare un carico", fa: "حملِ بار مجاز است", verb: "è consentito ← consentire" },
      ],
      translation: "روی موتورسیکلت‌ها در هیچ حالی حملِ بار مجاز نیست.",
      why: "غلط است (قدم ۲). بار مجاز است، به شرطِ این‌که محکم بسته شود، بیش از ۵۰ سانتی‌متر بیرون نزند و جلوی دید را نگیرد.",
      rule: `${CDS(170)} c.5`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // load on cars: the three conditions, the overhang by direction, signalling, weight
      sourceIds: ["4372", "4373", "4374", "4375", "4376", "4377", "4378", "4379", "4380", "4381", "4382"],
    },
    {
      step: 2,
      // load and animals on motorcycles
      sourceIds: ["4370", "4371", "4383", "4384"],
    },
  ],
};
