/**
 * src/content/ch18-luci.ts
 * Chapter 18 (Luci e dispositivi acustici), lessons 1–2: which lights must be
 * on while driving (CdS art. 152; the rear fog light, art. 153), and being seen
 * when stopped: parking lights, the plate light and reflectors (catadiottri),
 * which only reflect.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter18.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_152 = "Codice della Strada, art. 152";
const CDS_153 = "Codice della Strada, art. 153";
const MARCIA = "Durante la marcia,";
const MARCIA_FA = "هنگامِ حرکت،";
const CATADIOTTRI = "I catadiottri";
const CATADIOTTRI_FA = "شبرنگ‌ها";

// ── Lesson 1 ──────────────────────────────────────────────────────────────────

export const lessonLuciQuando: Lesson = {
  id: "luci-quando-accenderle",
  titleFa: "کدام چراغ، کِی؟",
  titleIt: "LUCI DI POSIZIONE · ANABBAGLIANTI · GALLERIE · NEBBIA",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس چراغ‌های خودرو را از هم جدا می‌کنی، می‌دانی نورِ پایین کجا همیشه واجب است (بیرون از آبادی، تونل، دیدِ کم) و کجا فقط شب، و می‌دانی چراغِ مهِ عقب فقط برای مهِ غلیظ، بارانِ شدید و برفِ سنگین است.",
      why:
        "۱۸ سؤال. بانک چراغ‌ها را جابه‌جا می‌کند (چراغِ موقعیت به‌جای نورِ پایین، نورِ بالا به‌جای نورِ پایین) و با «solo»، «sempre» و «anche di giorno» بازی می‌کند. اول باید بدانی هر چراغ برای چیست؛ بعد قاعده‌ها خودشان معنا پیدا می‌کنند.",
      rule: `${CDS_152}; ${CDS_153}`,
    },
    {
      kind: "table",
      title: "هر چراغ برای چیست",
      body:
        "دو کار با هم فرق دارند: «دیده شدن» و «دیدن». چراغ‌های موقعیت فقط می‌گویند «این‌جا یک خودرو است و این‌قدر پهن است»؛ جاده را روشن نمی‌کنند. برای دیدنِ جاده نورِ پایین لازم است. بانک بارها می‌پرسد آیا اولی می‌تواند جای دومی را بگیرد. جواب منفی است.",
      columns: ["کارش"],
      rows: [
        { label: "چراغ‌های موقعیت", it: "luci di posizione", values: ["چراغ‌های کوچک: جلو سفید، عقب قرمز. خودرو و پهنایش را نشان می‌دهند. رنگشان را خودت انتخاب نمی‌کنی؛ قانون و تأییدِ نوعِ چراغ تعیینش کرده‌اند."] },
        { label: "نورِ پایین", it: "proiettori anabbaglianti", values: ["چراغِ معمولِ حرکت. جاده‌ی جلو را روشن می‌کند و رو به پایین است تا چشمِ راننده‌ی روبه‌رو را نزند. همیشه با چراغ‌های موقعیت روشن می‌شود."] },
        { label: "چراغِ روز", it: "luci di marcia diurna", values: ["فقط برای روز، برای دیده شدن. بیرون از آبادی در روز می‌تواند جای نورِ پایین را بگیرد، اگر خودرو آن را دارد. جاده را روشن نمی‌کند؛ پس در شب، تونل و دیدِ کم نورِ پایین لازم است."] },
        { label: "نورِ بالا", it: "proiettori di profondità · abbaglianti", values: ["دورتر را روشن می‌کند و چشم را می‌زند. هیچ‌جا «همیشه واجب» نیست: نه در روز، نه از غروب به بعد. کی مجاز است و کی باید خاموشش کنی، درسِ ۳."] },
        { label: "چراغِ مهِ عقب", it: "luce posteriore per nebbia", values: ["یک چراغِ قرمزِ پرنور در عقب. فقط در دیدِ خیلی کم (قدمِ ۳)."] },
        { label: "چراغِ پارک و پلاک", it: "luci di sosta · luce della targa", values: ["برای خودروی ایستاده، و برای خواندنِ پلاک. درسِ ۲."] },
        { label: "چه نیست", it: "non è", values: ["چراغ‌های موقعیت در حرکت جای نورِ پایین را نمی‌گیرند: نه «همیشه»، نه در روزِ آفتابی بیرون از آبادی. نورِ بالا در روز واجب نیست. هر رنگی برای چراغ‌های موقعیت مجاز نیست."] },
      ],
      takeaway: "موقعیت = دیده شدن. نورِ پایین = دیدن بی‌آن‌که چشم بزنی. نورِ بالا = دیدنِ دور، فقط وقتی کسی جلویت نیست.",
      rule: `${CDS_152} c.1; ${CDS_153} c.1`,
    },
    {
      kind: "table",
      title: "نورِ پایین کجا واجب است",
      body:
        "قاعده در چهار جا خلاصه می‌شود. «بیرون از آبادی» و «تونل» به ساعت کاری ندارند: روز هم واجب است. داخلِ آبادی قاعده با ساعت است. دیدِ کم همه‌جا قاعده را روشن می‌کند. چراغ‌های موقعیت همیشه همراهِ نورِ پایین روشن‌اند.",
      columns: ["قاعده"],
      rows: [
        { label: "بیرون از آبادی", it: "fuori dei centri abitati", values: ["در حرکت همیشه، روز و شب. در روز چراغِ روز هم قبول است، اگر خودرو دارد. آزادراه و جاده‌ی برون‌شهری هر دو «بیرون از آبادی»‌اند."] },
        { label: "شب، داخلِ آبادی هم", it: "da mezz'ora dopo il tramonto a mezz'ora prima del sorgere", values: ["همه‌جا، از نیم ساعت بعد از غروب تا نیم ساعت قبل از طلوع. داخلِ آبادی هم، حتی وقتی چراغ‌های خیابان خوب روشن‌اند: آن‌ها کمک می‌کنند تو ببینی، ولی چراغِ تو برای این است که دیگران تو را ببینند."] },
        { label: "تونل", it: "in galleria", values: ["همیشه، روز و شب، چه تونل روشن باشد چه تاریک. «فقط در تونلِ کم‌نور» غلط است؛ «در تونلِ روشن مجاز نیست» هم غلط است."] },
        { label: "دیدِ کم", it: "scarsa visibilità", values: ["مه، برف یا باران که دید را کم کند: همه‌جا، داخلِ آبادی هم، روز هم. چراغ‌های موقعیت و نورِ پایین با هم. چراغِ روز این‌جا و در تونل کافی نیست."] },
        { label: "موتورسیکلت و موتور گازی", it: "motocicli · ciclomotori", values: ["داخلِ آبادی هم همیشه، روز و شب."] },
        { label: "چه نیست", it: "non è", values: ["نورِ بالا از غروب تا طلوع واجب نیست. برای سبقت از خودروی پلیس هیچ چراغِ خاصی لازم نیست."] },
      ],
      takeaway: "بیرون از آبادی و تونل: همیشه. داخلِ آبادی: شب. دیدِ کم: همه‌جا.",
      rule: `${CDS_152} c.1; ${CDS_153} c.1`,
    },
    {
      kind: "table",
      title: "چراغِ مهِ عقب، فقط برای دیدِ خیلی کم",
      body:
        "چراغِ مهِ عقب آن‌قدر پرنور است که در هوای معمولی چشمِ راننده‌ی پشتی را می‌زند و چراغِ ترمزت را پنهان می‌کند. برای همین فقط وقتی روشنش می‌کنی که دید واقعاً کم شده است. بانک همیشه می‌گوید «se il veicolo ne è dotato»: اگر خودرو آن را دارد.",
      columns: ["کی"],
      rows: [
        { label: "مه", it: "nebbia · visibilità inferiore a 50 metri", values: ["وقتی دید کمتر از ۵۰ متر است، همراهِ نورِ پایین."] },
        { label: "بارانِ شدید", it: "pioggia intensa", values: ["همراهِ نورِ پایین. بارانِ ریز با دیدِ خوب کافی نیست."] },
        { label: "برفِ سنگین", it: "fitta nevicata", values: ["همراهِ نورِ پایین."] },
        { label: "چراغِ مهِ جلو", it: "proiettori fendinebbia anteriori", values: ["اختیاری. در مه، برف یا بارانِ شدید می‌تواند جای نورِ پایین و نورِ بالا را بگیرد."] },
        { label: "چه نیست", it: "non è", values: ["چراغِ مهِ عقب جای نورِ پایین را نمی‌گیرد؛ کنارِ آن روشن می‌شود. وقتی دید برگشت، خاموشش کن."] },
      ],
      takeaway: "مه زیرِ ۵۰ متر، بارانِ شدید، برفِ سنگین: نورِ پایین + چراغِ مهِ عقب.",
      rule: `${CDS_153} c.8`,
    },
    {
      kind: "classify",
      title: "این‌جا چه چراغی لازم است؟",
      body: "سواری در حال حرکت. جا و هوا را بخوان و بگو قانون چه چراغی می‌خواهد. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "anabbaglianti", fa: "نورِ پایین" },
        { it: "anabbaglianti + luce posteriore per nebbia", fa: "نورِ پایین + چراغِ مهِ عقب" },
        { it: "nessun obbligo", fa: "چراغ واجب نیست" },
      ],
      items: [
        { prompt: "آزادراه، ظهرِ آفتابی", answer: 0, explain: "بیرون از آبادی همیشه. در روز چراغِ روز هم قبول است." },
        { prompt: "خیابانِ شهر، ظهرِ آفتابی، دیدِ خوب", answer: 2, explain: "داخلِ آبادی، روز و دیدِ خوب: قانون چراغ نمی‌خواهد." },
        { prompt: "خیابانِ شهر با چراغ‌های پرنور، ساعتِ ۱۱ شب", answer: 0, explain: "داخلِ آبادی بعد از غروب واجب است، حتی وقتی خیابان روشن است." },
        { prompt: "تونلِ روشن داخلِ شهر، ظهر", answer: 0, explain: "تونل: همیشه، روشن یا تاریک." },
        { prompt: "جاده‌ی برون‌شهری، مه، دیدِ حدودِ ۳۰ متر", answer: 1, explain: "دیدِ کمتر از ۵۰ متر در مه: چراغِ مهِ عقب هم." },
        { prompt: "آزادراه، شب، بارانِ شدید", answer: 1, explain: "بارانِ شدید: نورِ پایین و چراغِ مهِ عقب." },
      ],
      takeaway: "اول بپرس کجایی (بیرون از آبادی، تونل، شهر)، بعد ساعت، بعد دید.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "le luci di posizione", fa: "چراغ‌های موقعیت" },
        { it: "i proiettori anabbaglianti", fa: "نورِ پایین" },
        { it: "le luci di marcia diurna", fa: "چراغِ روز" },
        { it: "i proiettori abbaglianti", fa: "نورِ بالا", note: "همان «proiettori di profondità»" },
        { it: "la luce posteriore per nebbia", fa: "چراغِ مهِ عقب" },
        { it: "la scarsa visibilità", fa: "دیدِ کم" },
        { it: "il tramonto · il sorgere del sole", fa: "غروب · طلوع" },
        { it: "transitare", fa: "عبور کردن", note: "«si transita in galleria» = از تونل رد می‌شوی" },
        { it: "se il veicolo ne è dotato", fa: "اگر خودرو آن را دارد" },
      ],
    },
    {
      kind: "trap",
      title: "«anche di giorno» درست، «solo se» غلط",
      body: "هر دو جمله درباره‌ی نورِ پایین در تونل است. یکی قاعده را برای همه‌ی تونل‌ها می‌گوید، دیگری آن را به تونل‌های کم‌نور محدود می‌کند:",
      examples: [
        {
          sourceId: "5831",
          textIt: "E' obbligatorio accendere i proiettori anabbaglianti, anche di giorno, quando si transita in galleria",
          answer: 1,
          chunks: [
            { it: "E' obbligatorio accendere i proiettori anabbaglianti,", fa: "روشن کردنِ نورِ پایین واجب است،", verb: "è ← essere" },
            { it: "anche di giorno,", fa: "حتی در روز،", focus: "always" },
            { it: "quando si transita in galleria", fa: "وقتی از تونل رد می‌شوی", verb: "si transita ← transitare", focus: "condition" },
          ],
          translation: "روشن کردنِ نورِ پایین، حتی در روز، وقتی از تونل رد می‌شوی واجب است.",
          why: "درست است. در تونل نورِ پایین همیشه واجب است، ساعتِ روز مهم نیست.",
        },
        {
          sourceId: "5833",
          textIt: "E' obbligatorio accendere i proiettori anabbaglianti nelle gallerie stradali, solo se scarsamente illuminate",
          answer: 0,
          chunks: [
            { it: "E' obbligatorio accendere i proiettori anabbaglianti", fa: "روشن کردنِ نورِ پایین واجب است", verb: "è ← essere" },
            { it: "nelle gallerie stradali,", fa: "در تونل‌های جاده‌ای،" },
            { it: "solo se scarsamente illuminate", fa: "فقط اگر کم‌نور باشند", focus: "limit" },
          ],
          translation: "روشن کردنِ نورِ پایین در تونل‌های جاده‌ای فقط وقتی واجب است که کم‌نور باشند.",
          why: "غلط است. قاعده برای همه‌ی تونل‌هاست؛ «solo se» استثنایی می‌سازد که قانون ندارد.",
        },
      ],
      takeaway: "در جمله‌های چراغ، «solo» و «sempre» را جدی بگیر: قاعده‌ی تونل و بیرون از آبادی بدونِ استثنای ساعت است.",
      rule: `${CDS_153} c.1`,
    },
  ],
  practice: [
    {
      sourceId: "5840",
      textIt: "Durante la marcia, l'uso delle luci di posizione è sempre consentito in alternativa a quelle anabbaglianti",
      answer: 0,
      chunks: [
        { it: MARCIA, fa: MARCIA_FA },
        { it: "l'uso delle luci di posizione", fa: "استفاده از چراغ‌های موقعیت" },
        { it: "è sempre consentito", fa: "همیشه مجاز است", verb: "è consentito ← consentire", focus: "always" },
        { it: "in alternativa a quelle anabbaglianti", fa: "به‌جای نورِ پایین", focus: "contrast" },
      ],
      translation: "هنگامِ حرکت، استفاده از چراغ‌های موقعیت به‌جای نورِ پایین همیشه مجاز است.",
      why: "غلط است (قدم ۱). چراغ‌های موقعیت فقط خودرو را نشان می‌دهند و جاده را روشن نمی‌کنند؛ هر جا نورِ پایین واجب است، جای آن را نمی‌گیرند.",
      rule: `${CDS_152} c.1; ${CDS_153} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "5815",
      textIt: "Nelle autostrade e strade extraurbane, è obbligatorio accendere i fari anabbaglianti anche di giorno o, in alternativa, le luci di marcia diurna",
      answer: 1,
      chunks: [
        { it: "Nelle autostrade e strade extraurbane,", fa: "در آزادراه‌ها و جاده‌های برون‌شهری،" },
        { it: "è obbligatorio accendere i fari anabbaglianti", fa: "روشن کردنِ نورِ پایین واجب است", verb: "è ← essere" },
        { it: "anche di giorno", fa: "حتی در روز", focus: "always" },
        { it: "o, in alternativa, le luci di marcia diurna", fa: "یا به‌جایش چراغِ روز", focus: "condition" },
      ],
      translation: "در آزادراه‌ها و جاده‌های برون‌شهری روشن کردنِ نورِ پایین حتی در روز واجب است، یا به‌جایش چراغِ روز.",
      why: "درست است (قدم ۲). بیرون از آبادی نورِ پایین همیشه واجب است؛ در روز چراغِ روز هم قبول است.",
      rule: `${CDS_152} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "5828",
      textIt: "Durante la marcia, è obbligatorio tenere accese le luci abbaglianti, a partire dal tramonto del sole fino al suo sorgere",
      answer: 0,
      chunks: [
        { it: MARCIA, fa: MARCIA_FA },
        { it: "è obbligatorio tenere accese le luci abbaglianti,", fa: "روشن نگه داشتنِ نورِ بالا واجب است،", verb: "è ← essere", focus: "contrast" },
        { it: "a partire dal tramonto del sole fino al suo sorgere", fa: "از غروبِ خورشید تا طلوعش" },
      ],
      translation: "هنگامِ حرکت، روشن نگه داشتنِ نورِ بالا از غروبِ خورشید تا طلوعش واجب است.",
      why: "غلط است (قدم ۲). شب‌ها نورِ پایین واجب است، نه نورِ بالا. نورِ بالا هیچ‌جا «همیشه واجب» نیست و چشمِ دیگران را می‌زند.",
      rule: `${CDS_152} c.1; ${CDS_153} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "5839",
      textIt: "Durante la marcia, l'uso delle luci anabbaglianti non è consentito nelle gallerie illuminate",
      answer: 0,
      chunks: [
        { it: MARCIA, fa: MARCIA_FA },
        { it: "l'uso delle luci anabbaglianti", fa: "استفاده از نورِ پایین" },
        { it: "non è consentito", fa: "مجاز نیست", verb: "è consentito ← consentire", focus: "negation" },
        { it: "nelle gallerie illuminate", fa: "در تونل‌های روشن", focus: "condition" },
      ],
      translation: "هنگامِ حرکت، استفاده از نورِ پایین در تونل‌های روشن مجاز نیست.",
      why: "غلط است (قدم ۲). در هر تونلی، روشن یا تاریک، نورِ پایین نه‌تنها مجاز که واجب است.",
      rule: `${CDS_153} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "5826",
      textIt: "Durante la marcia, in caso di nebbia con visibilità inferiore a 50 metri, bisogna usare la luce posteriore per nebbia, se il veicolo ne è dotato",
      answer: 1,
      chunks: [
        { it: MARCIA, fa: MARCIA_FA },
        { it: "in caso di nebbia con visibilità inferiore a 50 metri,", fa: "در مه با دیدِ کمتر از ۵۰ متر،", focus: "condition" },
        { it: "bisogna usare la luce posteriore per nebbia,", fa: "باید چراغِ مهِ عقب را روشن کنی،", verb: "bisogna ← bisognare" },
        { it: "se il veicolo ne è dotato", fa: "اگر خودرو آن را دارد", focus: "condition" },
      ],
      translation: "هنگامِ حرکت، در مه با دیدِ کمتر از ۵۰ متر باید چراغِ مهِ عقب را روشن کنی، اگر خودرو آن را دارد.",
      why: "درست است (قدم ۳). مه زیرِ ۵۰ متر یکی از سه حالتِ چراغِ مهِ عقب است، کنارِ نورِ پایین.",
      rule: `${CDS_153} c.8`,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["5820", "5821", "5823", "5840"] },
    { step: 2, sourceIds: ["5815", "5824", "5825", "5828", "5831", "5832", "5833", "5835", "5836", "5839", "5841"] },
    { step: 3, sourceIds: ["5826", "5834", "5837"] },
  ],
};

// ── Lesson 2 ──────────────────────────────────────────────────────────────────

export const lessonSostaCatadiottri: Lesson = {
  id: "luci-sosta-targa-catadiottri",
  titleFa: "دیده شدن وقتی ایستاده‌ای",
  titleIt: "LUCI DI SOSTA · TARGA · CATADIOTTRI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی خودروی پارک‌شده کِی چراغ لازم دارد و کِی نه، چرا پلاکِ عقب نورِ سفید دارد و کِی روشن است، و شبرنگ‌ها چه هستند: چیزی که روشن نمی‌شود و فقط نورِ دیگران را برمی‌گرداند.",
      why:
        "۲۳ سؤال. بانک شبرنگ را با چراغ قاطی می‌کند («روشنشان کن»، «جای چراغِ موقعیت یا راهنما») و پارک بیرون از سواره‌رو را با پارک روی سواره‌رو. درسِ ۱ درباره‌ی دیدن و دیده شدن در حرکت بود؛ این درس درباره‌ی دیده شدن وقتی ایستاده‌ای.",
      rule: `${CDS_152}; ${CDS_153}`,
    },
    {
      kind: "table",
      title: "پارک در شب: روی سواره‌رو یا بیرون از آن",
      body:
        "خودروی ایستاده فقط وقتی باید دیده شود که سرِ راهِ بقیه است و دیده نمی‌شود. پس دو سؤال: روی سواره‌رو پارک کرده‌ای یا بیرون از آن؟ و آیا چراغ‌های خیابان خودرو را کاملاً دیدنی می‌کنند؟",
      columns: ["چراغ"],
      rows: [
        { label: "روی سواره‌رو", it: "in sosta sulla carreggiata", values: ["شب، در تونل و در دیدِ کم، خودروی ایستاده هم باید با چراغ‌های موقعیت دیده شود؛ مگر این‌که چراغ‌های خیابان آن را کاملاً دیدنی کنند."] },
        { label: "داخلِ آبادی، کنارِ سواره‌رو", it: "al margine della carreggiata · luci di sosta", values: ["به‌جای چراغ‌های موقعیت، چراغِ پارک کافی است (برای خودروی تا ۶ متر طول و ۲ متر پهنا)."] },
        { label: "بیرون از سواره‌رو", it: "fuori della carreggiata", values: ["هیچ چراغی واجب نیست: نه نورِ پایین، نه چراغِ موقعیت، نه چراغِ پارک. محوطه‌ی پارکینگ هم بیرون از سواره‌رو است."] },
        { label: "چراغِ پارک", it: "luci di sosta", values: ["چراغِ موقعیتِ یک طرفِ خودرو، طرفِ ترافیک."] },
        { label: "چه نیست", it: "non è", values: ["نورِ پایین برای خودروی ایستاده نیست. «تمامِ مدت در پارکینگِ مجاز» هم واجب نیست."] },
      ],
      takeaway: "پارک روی سواره‌رو در شب = دیده شو (موقعیت یا پارک). پارک بیرون از سواره‌رو = هیچ چراغی.",
      rule: `${CDS_153} c.5–6`,
    },
    {
      kind: "table",
      title: "چراغِ پلاک",
      body: "پلاکِ عقب نور دارد تا شماره‌اش را بشود خواند. قانون می‌خواهد هر وقت چراغ‌های موقعیت روشن‌اند، چراغِ پلاک هم روشن باشد.",
      columns: ["قاعده"],
      rows: [
        { label: "برای چه", it: "facile lettura dei caratteri", values: ["تا حروف و عددهای پلاک راحت خوانده شوند."] },
        { label: "چه رنگی", it: "luce bianca", values: ["سفید."] },
        { label: "کِی", it: "con le luci di posizione", values: ["هر بار که چراغ‌های موقعیت روشن‌اند: شب، و روز هم در تونل یا بیرون از آبادی. پس «فقط شب» غلط است."] },
        { label: "چه نیست", it: "non è", values: ["برای خودروی پارک‌شده بیرون از جاده روشن ماندنش واجب نیست."] },
      ],
      takeaway: "پلاکِ عقب = نورِ سفید، همراهِ چراغ‌های موقعیت، برای خواندنِ شماره.",
      rule: `${CDS_153} c.1; Regolamento UN/ECE n. 48`,
    },
    {
      kind: "table",
      title: "شبرنگ: روشن نمی‌شود، برمی‌گرداند",
      body:
        "شبرنگ (catadiottro) لامپ ندارد. نورِ چراغِ خودروی دیگری به آن می‌خورد و همان نور را برمی‌گرداند. پس نه «روشنش می‌کنی»، نه «همراهِ چراغ‌های موقعیت روشن می‌شود». رنگش نشان می‌دهد کدام طرفِ وسیله را می‌بینی.",
      columns: ["رنگ و شکل"],
      rows: [
        { label: "عقبِ هر وسیله", it: "parte posteriore", values: ["قرمز."] },
        { label: "عقبِ یدک و carrello appendice", it: "rimorchi e carrelli-appendice", values: ["قرمز و مثلثی. مثلث نشان می‌دهد پشتِ این چیز موتوری نیست و کشیده می‌شود."] },
        { label: "جلوی یدک", it: "parte davanti", values: ["سفید. یدک و نیم‌یدک از جلو هم شبرنگِ سفید دارند."] },
        { label: "چه نیست", it: "non è", values: ["روشن و خاموش نمی‌شود. شبرنگِ سفید ربطی به بارِ آتش‌گیر ندارد."] },
      ],
      takeaway: "شبرنگ = بی‌لامپ. عقب قرمز (یدک: مثلثِ قرمز)، جلوی یدک سفید.",
      rule: "Regolamento UN/ECE n. 48 (catadiottri)",
    },
    {
      kind: "table",
      title: "شبرنگ چه کاری می‌کند و چه کاری نه",
      body: "شبرنگ فقط وقتی کار می‌کند که نوری به آن بخورد. برای همین کمک است، نه جانشین.",
      columns: ["قاعده"],
      rows: [
        { label: "کارش", it: "presenza e ingombro", values: ["نشان می‌دهد وسیله آن‌جاست و چقدر جا گرفته (پهنا)."] },
        { label: "در شب", it: "se illuminati", values: ["وسیله‌ی ایستاده یا یدکِ پارک‌شده را، وقتی نورِ خودرویی به آن می‌خورد، از دور دیدنی می‌کند."] },
        { label: "چراغِ خراب", it: "luci di posizione guaste", values: ["اگر چراغِ موقعیتِ عقب خراب باشد، شبرنگ هنوز خودرو را دیدنی‌تر می‌کند. کمک است؛ چراغ را باید تعمیر کنی."] },
        { label: "چه نیست", it: "non è", values: ["جای چراغ راهنما را نمی‌گیرد و پیچیدن را خبر نمی‌دهد. جای چراغ‌های موقعیت در خیابان‌های شهر را هم نمی‌گیرد."] },
      ],
      takeaway: "شبرنگ می‌گوید «من این‌جایم»، فقط وقتی نوری به آن بخورد. هیچ چراغی را جانشین نمی‌شود.",
      rule: "Regolamento UN/ECE n. 48 (catadiottri)",
    },
    {
      kind: "classify",
      title: "روشن می‌شود یا فقط برمی‌گرداند؟",
      body: "هر چیز را در دسته‌ی درستش بگذار. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "si accende", fa: "روشن می‌شود (لامپ دارد)" },
        { it: "riflette soltanto", fa: "فقط نور را برمی‌گرداند" },
      ],
      items: [
        { prompt: "مثلثِ قرمزِ پشتِ یدک", answer: 1, explain: "شبرنگ است؛ لامپ ندارد." },
        { prompt: "نورِ سفیدِ بالای پلاکِ عقب", answer: 0, explain: "چراغِ پلاک است؛ لامپ دارد و با چراغ‌های موقعیت روشن است." },
        { prompt: "چراغِ پارکِ طرفِ خیابان", answer: 0, explain: "چراغِ موقعیتِ یک طرف است؛ لامپ دارد." },
        { prompt: "تکه‌ی سفیدِ جلوی نیم‌یدک", answer: 1, explain: "شبرنگِ سفیدِ جلوی یدک است." },
        { prompt: "تکه‌ی قرمزِ عقبِ سواری، زیرِ چراغ‌ها", answer: 1, explain: "شبرنگِ قرمزِ عقب است." },
      ],
      takeaway: "اگر کلید ندارد و فقط وقتی نور به آن می‌خورد دیده می‌شود، شبرنگ است.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "le luci di sosta", fa: "چراغِ پارک" },
        { it: "in sosta sulla carreggiata", fa: "پارک‌شده روی سواره‌رو" },
        { it: "fuori della carreggiata", fa: "بیرون از سواره‌رو" },
        { it: "il catadiottro", fa: "شبرنگ (بازتابنده)" },
        { it: "riflettere", fa: "برگرداندنِ نور؛ بازتاباندن" },
        { it: "l'ingombro", fa: "جایی که وسیله می‌گیرد؛ پهنا" },
        { it: "il carrello-appendice", fa: "یدکِ سبک (carrello appendice)" },
        { it: "la targa posteriore", fa: "پلاکِ عقب" },
        { it: "guasto", fa: "خراب" },
      ],
    },
    {
      kind: "trap",
      title: "کمک می‌کند، جانشین نمی‌شود",
      body: "هر دو جمله شبرنگ را کنارِ چراغ‌های موقعیت می‌گذارند. یکی می‌گوید وقتی چراغ خراب است کمک می‌کند؛ دیگری می‌گوید جای چراغ را می‌گیرد:",
      examples: [
        {
          sourceId: "5853",
          textIt: "I catadiottri rendono più visibile un veicolo guasto, nel caso in cui non funzionino le luci di posizione posteriori",
          answer: 1,
          chunks: [
            { it: CATADIOTTRI, fa: CATADIOTTRI_FA },
            { it: "rendono più visibile un veicolo guasto,", fa: "خودروی خراب را دیدنی‌تر می‌کنند،", verb: "rendono ← rendere" },
            { it: "nel caso in cui non funzionino le luci di posizione posteriori", fa: "وقتی چراغ‌های موقعیتِ عقب کار نمی‌کنند", verb: "funzionino ← funzionare", focus: "condition" },
          ],
          translation: "شبرنگ‌ها خودروی خراب را، وقتی چراغ‌های موقعیتِ عقب کار نمی‌کنند، دیدنی‌تر می‌کنند.",
          why: "درست است. شبرنگ لامپ ندارد، پس با چراغِ خراب هم نورِ دیگران را برمی‌گرداند.",
        },
        {
          sourceId: "5849",
          textIt: "I catadiottri sostituiscono le luci di posizione durante la circolazione nelle strade urbane",
          answer: 0,
          chunks: [
            { it: CATADIOTTRI, fa: CATADIOTTRI_FA },
            { it: "sostituiscono le luci di posizione", fa: "جای چراغ‌های موقعیت را می‌گیرند", verb: "sostituiscono ← sostituire", focus: "contrast" },
            { it: "durante la circolazione nelle strade urbane", fa: "هنگامِ رانندگی در خیابان‌های شهر" },
          ],
          translation: "شبرنگ‌ها هنگامِ رانندگی در خیابان‌های شهر جای چراغ‌های موقعیت را می‌گیرند.",
          why: "غلط است. شبرنگ فقط وقتی دیده می‌شود که نوری به آن بخورد؛ هیچ‌جا جای چراغی را نمی‌گیرد.",
        },
      ],
      takeaway: "«rendono più visibile» درست؛ «sostituiscono» غلط.",
      rule: "Regolamento UN/ECE n. 48 (catadiottri)",
    },
  ],
  practice: [
    {
      sourceId: "5829",
      textIt: "Di notte, in caso di sosta fuori dalla carreggiata, è obbligatorio tenere accese le luci anabbaglianti",
      answer: 0,
      chunks: [
        { it: "Di notte,", fa: "در شب،" },
        { it: "in caso di sosta fuori dalla carreggiata,", fa: "هنگامِ پارک بیرون از سواره‌رو،", focus: "condition" },
        { it: "è obbligatorio tenere accese le luci anabbaglianti", fa: "روشن نگه داشتنِ نورِ پایین واجب است", verb: "è ← essere" },
      ],
      translation: "در شب، هنگامِ پارک بیرون از سواره‌رو، روشن نگه داشتنِ نورِ پایین واجب است.",
      why: "غلط است (قدم ۱). بیرون از سواره‌رو هیچ چراغی واجب نیست؛ و نورِ پایین اصلاً چراغِ خودروی ایستاده نیست.",
      rule: `${CDS_153} c.5`,
      conceptStep: 1,
    },
    {
      sourceId: "5858",
      textIt: "La targa posteriore di un autoveicolo deve essere illuminata con una luce bianca",
      answer: 1,
      chunks: [
        { it: "La targa posteriore di un autoveicolo", fa: "پلاکِ عقبِ خودرو" },
        { it: "deve essere illuminata con una luce bianca", fa: "باید با نورِ سفید روشن شود", verb: "deve ← dovere" },
      ],
      translation: "پلاکِ عقبِ خودرو باید با نورِ سفید روشن شود.",
      why: "درست است (قدم ۲). نورِ پلاک سفید است تا شماره راحت خوانده شود.",
      rule: "Regolamento UN/ECE n. 48; CdS art. 153 c.1",
      conceptStep: 2,
    },
    {
      sourceId: "5844",
      textIt: "I catadiottri installati nella parte posteriore di rimorchi e carrelli-appendice sono di colore rosso e di forma triangolare",
      answer: 1,
      chunks: [
        { it: CATADIOTTRI, fa: CATADIOTTRI_FA },
        { it: "installati nella parte posteriore di rimorchi e carrelli-appendice", fa: "که پشتِ یدک‌ها و carrello appendiceها نصب شده‌اند" },
        { it: "sono di colore rosso e di forma triangolare", fa: "قرمز و مثلثی‌اند", verb: "sono ← essere" },
      ],
      translation: "شبرنگ‌هایی که پشتِ یدک‌ها و carrello appendiceها نصب شده‌اند قرمز و مثلثی‌اند.",
      why: "درست است (قدم ۳). مثلثِ قرمز = عقبِ چیزی که کشیده می‌شود.",
      rule: "Regolamento UN/ECE n. 48 (catadiottri)",
      conceptStep: 3,
    },
    {
      sourceId: "5848",
      textIt: "I catadiottri vanno accesi insieme alle luci di posizione",
      answer: 0,
      chunks: [
        { it: CATADIOTTRI, fa: CATADIOTTRI_FA },
        { it: "vanno accesi", fa: "باید روشن شوند", verb: "vanno ← andare", focus: "contrast" },
        { it: "insieme alle luci di posizione", fa: "همراهِ چراغ‌های موقعیت" },
      ],
      translation: "شبرنگ‌ها باید همراهِ چراغ‌های موقعیت روشن شوند.",
      why: "غلط است (قدم ۳). شبرنگ لامپ ندارد و روشن نمی‌شود؛ فقط نوری را که به آن می‌خورد برمی‌گرداند.",
      rule: "Regolamento UN/ECE n. 48 (catadiottri)",
      conceptStep: 3,
    },
    {
      sourceId: "5856",
      textIt: "I catadiottri possono sostituire gli indicatori di direzione",
      answer: 0,
      chunks: [
        { it: CATADIOTTRI, fa: CATADIOTTRI_FA },
        { it: "possono sostituire gli indicatori di direzione", fa: "می‌توانند جای چراغ راهنما را بگیرند", verb: "possono ← potere", focus: "contrast" },
      ],
      translation: "شبرنگ‌ها می‌توانند جای چراغ راهنما را بگیرند.",
      why: "غلط است (قدم ۴). شبرنگ چشمک نمی‌زند و چیزی را خبر نمی‌دهد؛ فقط حضور و پهنای وسیله را نشان می‌دهد.",
      rule: "Regolamento UN/ECE n. 48 (catadiottri)",
      conceptStep: 4,
    },
  ],
  related: [
    { step: 1, sourceIds: ["5822", "5827", "5829", "5830"] },
    { step: 2, sourceIds: ["5857", "5858", "5859", "5860"] },
    { step: 3, sourceIds: ["5842", "5843", "5844", "5845", "5846", "5847", "5848", "5849", "5851", "5855"] },
    { step: 4, sourceIds: ["5850", "5852", "5853", "5854", "5856"] },
  ],
};
