/**
 * src/content/ch18-abbaglianti.ts
 * Chapter 18 (Luci e dispositivi acustici), lesson 3: main beam (proiettori di
 * profondità): where it is needed, when it must give way to dipped beam, what
 * dazzles (also badly aimed or unapproved lamps), and the intermittent flash
 * as a warning or to announce overtaking. The horn (art. 156) is summarised
 * here; the bank's horn questions live in chapters 1–3, 13, 15 and 24.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter18.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_153 = "Codice della Strada, art. 153";
const USO = "L’uso dei proiettori a luce abbagliante";
const USO_FA = "استفاده از نورِ بالا";
const INTERMITTENTE = "E’ consentito l’uso intermittente dei proiettori di profondità (a luce abbagliante),";
const INTERMITTENTE_FA = "چشمک زدن با نورِ بالا مجاز است،";
const FUORI = "Fuori dei centri abitati, i conducenti devono spegnere i proiettori di profondità procedendo con quelli anabbaglianti,";
const FUORI_FA = "بیرون از آبادی، راننده‌ها باید نورِ بالا را خاموش کنند و با نورِ پایین ادامه دهند،";

export const lessonAbbaglianti: Lesson = {
  id: "abbaglianti-lampeggio",
  titleFa: "نورِ بالا: کِی روشن، کِی پایین، کِی چشمک",
  titleIt: "PROIETTORI DI PROFONDITÀ · ABBAGLIAMENTO · LAMPEGGIO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی نورِ بالا فقط کجا به کار می‌آید (بیرون از آبادی، جاده‌ی تاریک، کسی جلو و روبه‌رو نیست)، کِی باید فوراً نورِ پایین بزنی تا چشمِ کسی را نزنی، و چشمک زدن با نورِ بالا کِی مجاز است.",
      why:
        "۲۹ سؤال. بانک برای نورِ بالا بهانه می‌سازد («مجروح می‌برم»، «مهِ غلیظ»، «رو به آفتاب») و چشمک را محدود می‌کند («فقط روز»، «فقط بیرون از شهر»، «فقط خطرِ فوری»). درسِ ۱ گفت نورِ بالا هیچ‌جا «همیشه واجب» نیست؛ این درس می‌گوید کجا لازم است و کجا ممنوع.",
      rule: CDS_153,
    },
    {
      kind: "table",
      title: "نورِ بالا کجا لازم است، کجا نه",
      body:
        "نورِ بالا برای دیدنِ دور در جاده‌ی تاریک است. سه شرط با هم: بیرون از آبادی، چراغِ خیابان نیست یا کم است، و کسی را روبه‌رو یا نزدیکِ جلویت نداری. اگر یکی از این سه نباشد، نورِ پایین.",
      columns: ["قاعده"],
      rows: [
        { label: "بیرون از آبادی، جاده‌ی تاریک", it: "illuminazione pubblica insufficiente o mancante", values: ["لازم است، تا وقتی کسی را روبه‌رو نداری. دیدِ دور یعنی خطر را زودتر می‌بینی."] },
        { label: "داخلِ آبادی", it: "nei centri abitati · di norma vietato", values: ["به‌طورِ معمول ممنوع. خیابان روشن است و آدم‌ها نزدیک‌اند؛ نورِ بالا فقط چشم می‌زند."] },
        { label: "مه", it: "nebbia fitta", values: ["کمک نمی‌کند: نور به قطره‌های مه می‌خورد و به چشمِ خودت برمی‌گردد. در مه نورِ پایین (و چراغِ مه)."] },
        { label: "چه نیست", it: "non è", values: ["حملِ مجروح یا بیمارِ بدحال بهانه‌ی نورِ بالا نیست؛ آن استثنا فقط برای بوق است. در تونلِ شهری لازم نیست. روز، رو به آفتاب در آزادراه، هم لازم نیست."] },
      ],
      takeaway: "نورِ بالا = بیرون از آبادی + جاده‌ی تاریک + کسی جلویت نیست. بقیه‌ی جاها نورِ پایین.",
      rule: `${CDS_153} c.1–2`,
    },
    {
      kind: "table",
      title: "کِی باید نورِ پایین بزنی",
      body:
        "قاعده یک کلمه است: abbagliare، یعنی «چشمِ کسی را زدن». هر جا ممکن است نورِ بالای تو چشمِ کسی را بزند، نورِ پایین. این فقط رانندگانِ روبه‌رو نیستند. نورِ پایینِ بد تنظیم‌شده هم می‌تواند همین کار را بکند.",
      columns: ["قاعده"],
      rows: [
        { label: "خودروی روبه‌رو", it: "incrociare altri veicoli", values: ["وقتی به خودرویی از روبه‌رو می‌رسی."] },
        { label: "پشتِ یک خودرو", it: "seguire un veicolo a breve distanza", values: ["وقتی با فاصله‌ی کم پشتِ هر وسیله‌ای هستی، نه فقط سواری: نورت در آینه‌اش می‌افتد."] },
        { label: "عابر و دیگران", it: "pedoni · altri utenti", values: ["عابرِ کنارِ جاده و هر کسِ دیگری که ممکن است چشمش را بزنی."] },
        { label: "جاده‌ی کناری", it: "veicoli circolanti su altre strade", values: ["رانندگانِ جاده‌ی دیگری که کنارِ جاده‌ی تو است؛ قانون ریل و آبراهِ کنارِ جاده را هم می‌گوید."] },
        { label: "چراغِ بد تنظیم یا غیراستاندارد", it: "orientamento errato · lampade non omologate", values: ["اگر جهتِ چراغ درست تنظیم نشده یا لامپ تأییدشده نیست، حتی نورِ پایین چشم می‌زند و دیدِ خودت هم کم می‌شود. روی وسیله‌ی موتوری فقط لامپِ تأییدشده مجاز است."] },
        { label: "چه نیست", it: "non è", values: ["دلیلِ خاموش کردن «خالی نشدنِ باتری» نیست؛ چشم نزدنِ دیگران است."] },
      ],
      takeaway: "هر کس که نورِ بالا چشمش را بزند (روبه‌رو، جلو، عابر، جاده‌ی کناری) = نورِ پایین.",
      rule: `${CDS_153} c.3; Regolamento UN/ECE n. 48`,
    },
    {
      kind: "table",
      title: "چشمک با نورِ بالا، و بوق",
      body:
        "چشمک زدن با نورِ بالا (lampeggio) با روشن نگه داشتنش فرق دارد: یک پیامِ کوتاه است. قانون دو پیام را مجاز می‌داند، و برای آن‌ها ساعت و جا مهم نیست.",
      columns: ["قاعده"],
      rows: [
        { label: "هشدار برای جلوگیری از تصادف", it: "avvertimenti utili al fine di evitare incidenti", values: ["مجاز، روز و شب، داخلِ آبادی هم."] },
        { label: "خبرِ سبقت به خودروی جلو", it: "l’intenzione di sorpassare", values: ["مجاز، روز و شب، داخلِ آبادی هم. خودِ سبقت با چراغ راهنما خبر داده می‌شود (درسِ ۴ و فصلِ ۱۵)."] },
        { label: "چه نیست", it: "non è", values: ["«فقط بیرون از شهر»، «فقط روز»، «فقط با مجروح»، «فقط وقتی خیابان تاریک است» و «فقط خطرِ فوری»: همه غلط."] },
        { label: "بوق", it: "dispositivi acustici · clacson", values: ["با نهایتِ احتیاط، کوتاه، و فقط برای ایمنی. بیرون از آبادی وقتی لازم است (مثلاً هنگامِ سبقت)؛ شب چشمکِ کوتاه می‌تواند جایش را بگیرد. داخلِ آبادی ممنوع، مگر خطرِ واقعی و فوری. کسی که مجروح یا بیمارِ بدحال می‌برد از این محدودیت معاف است. سؤال‌های بانک درباره‌ی بوق در فصل‌های دیگر است (تابلوی منعِ بوق در فصلِ ۳)."] },
      ],
      takeaway: "چشمک = هشدار یا خبرِ سبقت، هر ساعت، هر جا.",
      rule: `${CDS_153} c.4; Codice della Strada, art. 156`,
    },
    {
      kind: "classify",
      title: "نورِ بالا، نورِ پایین، یا چشمک؟",
      body: "شب و روز، شهر و جاده. بگو چه می‌کنی. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "abbaglianti", fa: "نورِ بالا" },
        { it: "anabbaglianti", fa: "نورِ پایین" },
        { it: "lampeggio", fa: "چشمک با نورِ بالا" },
      ],
      items: [
        { prompt: "شب، جاده‌ی برون‌شهریِ بی‌چراغ، نه کسی جلو نه روبه‌رو", answer: 0, explain: "هر سه شرط هست: نورِ بالا لازم است." },
        { prompt: "همان جاده، یک خودرو از روبه‌رو پیدا می‌شود", answer: 1, explain: "به خودروی روبه‌رو می‌رسی: نورِ پایین." },
        { prompt: "شب بیرون از آبادی، با فاصله‌ی کم پشتِ یک کامیون", answer: 1, explain: "پشتِ هر وسیله‌ای با فاصله‌ی کم: نورِ پایین." },
        { prompt: "شب، خیابانِ شهر، هیچ‌کس نیست", answer: 1, explain: "داخلِ آبادی نورِ بالا به‌طورِ معمول ممنوع است." },
        { prompt: "روز، جاده‌ی دوطرفه؛ می‌خواهی به خودروی جلو بگویی سبقت می‌گیری", answer: 2, explain: "خبرِ سبقت با چشمک، روز هم مجاز است." },
        { prompt: "داخلِ شهر، خودرویی تو را ندیده و دارد از پارکینگ بیرون می‌آید", answer: 2, explain: "هشدار برای جلوگیری از تصادف: داخلِ شهر هم مجاز است." },
      ],
      takeaway: "روشن نگه داشتنِ نورِ بالا شرط دارد؛ چشمک زدن فقط هدف دارد: هشدار یا خبرِ سبقت.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "i proiettori di profondità", fa: "نورِ بالا", note: "همان «abbaglianti»" },
        { it: "abbagliare", fa: "چشم زدن (با نور)" },
        { it: "incrociare", fa: "از کنارِ خودروی روبه‌رو گذشتن" },
        { it: "l’illuminazione pubblica", fa: "چراغ‌های خیابان" },
        { it: "l’uso intermittente", fa: "چشمک زدن (روشن و خاموشِ کوتاه)" },
        { it: "dare avvertimenti", base: "dare", fa: "هشدار دادن" },
        { it: "l’orientamento dei proiettori", fa: "تنظیمِ جهتِ چراغ‌ها" },
        { it: "omologato", fa: "تأییدشده (استاندارد)" },
        { it: "il clacson · l’avvisatore acustico", fa: "بوق" },
      ],
    },
    {
      kind: "trap",
      title: "«sia di giorno che di notte» درست، «esclusivamente» غلط",
      body: "هر دو جمله درباره‌ی چشمک زدن با نورِ بالاست. یکی هدفش را می‌گوید، دیگری آن را به یک حالت محدود می‌کند:",
      examples: [
        {
          sourceId: "5930",
          textIt: "E’ consentito l’uso intermittente dei proiettori di profondità (a luce abbagliante), sia di giorno che di notte, per dare avvertimenti utili al fine di evitare incidenti",
          answer: 1,
          chunks: [
            { it: INTERMITTENTE, fa: INTERMITTENTE_FA, verb: "è consentito ← consentire" },
            { it: "sia di giorno che di notte,", fa: "هم روز هم شب،", focus: "always" },
            { it: "per dare avvertimenti utili al fine di evitare incidenti", fa: "برای هشدارهای مفید تا از تصادف جلوگیری شود", focus: "reason" },
          ],
          translation: "چشمک زدن با نورِ بالا، هم روز هم شب، برای هشدارهای مفید تا از تصادف جلوگیری شود مجاز است.",
          why: "درست است. هشدار برای جلوگیری از تصادف یکی از دو هدفِ مجازِ چشمک است، و ساعت مهم نیست.",
        },
        {
          sourceId: "5938",
          textIt: "E’ consentito l’uso intermittente dei proiettori di profondità (a luce abbagliante), esclusivamente nei casi di pericolo immediato",
          answer: 0,
          chunks: [
            { it: INTERMITTENTE, fa: INTERMITTENTE_FA, verb: "è consentito ← consentire" },
            { it: "esclusivamente nei casi di pericolo immediato", fa: "فقط در خطرِ فوری", focus: "limit" },
          ],
          translation: "چشمک زدن با نورِ بالا فقط در خطرِ فوری مجاز است.",
          why: "غلط است. خبر دادنِ سبقت هم مجاز است، و هشدار لازم نیست «خطرِ فوری» باشد؛ «esclusivamente» آن را حذف می‌کند.",
        },
      ],
      takeaway: "در جمله‌های چشمک، «solo»، «soltanto»، «unicamente» و «esclusivamente» تقریباً همیشه دام‌اند.",
      rule: `${CDS_153} c.4`,
    },
  ],
  practice: [
    {
      sourceId: "5922",
      textIt: "L’uso dei proiettori a luce abbagliante è vietato, di norma, durante la marcia nei centri abitati",
      answer: 1,
      chunks: [
        { it: USO, fa: USO_FA },
        { it: "è vietato, di norma,", fa: "به‌طورِ معمول ممنوع است،", verb: "è vietato ← vietare", focus: "negation" },
        { it: "durante la marcia nei centri abitati", fa: "هنگامِ حرکت داخلِ آبادی‌ها", focus: "condition" },
      ],
      translation: "استفاده از نورِ بالا هنگامِ حرکت داخلِ آبادی‌ها به‌طورِ معمول ممنوع است.",
      why: "درست است (قدم ۱). نورِ بالا فقط بیرون از آبادی مجاز است؛ «di norma» جا را برای چشمکِ مجاز باز می‌گذارد (قدمِ ۳).",
      rule: `${CDS_153} c.1–2`,
      conceptStep: 1,
    },
    {
      sourceId: "5929",
      textIt: "L’uso dei proiettori a luce abbagliante è necessario, di giorno, se si circola su un’autostrada viaggiando controsole",
      answer: 0,
      chunks: [
        { it: USO, fa: USO_FA },
        { it: "è necessario, di giorno,", fa: "در روز لازم است،", verb: "è ← essere", focus: "contrast" },
        { it: "se si circola su un’autostrada viaggiando controsole", fa: "اگر در آزادراه رو به آفتاب می‌رانی", verb: "si circola ← circolare", focus: "condition" },
      ],
      translation: "استفاده از نورِ بالا در روز لازم است، اگر در آزادراه رو به آفتاب می‌رانی.",
      why: "غلط است (قدم ۱). نورِ بالا برای جاده‌ی تاریک است؛ رو به آفتاب کمکی به دیدنت نمی‌کند و فقط چشمِ دیگران را می‌زند.",
      rule: `${CDS_153} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "5943",
      textIt: "Fuori dei centri abitati, i conducenti devono spegnere i proiettori di profondità procedendo con quelli anabbaglianti, quando seguono un veicolo a breve distanza",
      answer: 1,
      chunks: [
        { it: FUORI, fa: FUORI_FA, verb: "devono ← dovere" },
        { it: "quando seguono un veicolo a breve distanza", fa: "وقتی با فاصله‌ی کم پشتِ یک وسیله می‌روند", verb: "seguono ← seguire", focus: "condition" },
      ],
      translation: "بیرون از آبادی، راننده‌ها وقتی با فاصله‌ی کم پشتِ یک وسیله می‌روند باید نورِ بالا را خاموش کنند و با نورِ پایین ادامه دهند.",
      why: "درست است (قدم ۲). نورِ بالا در آینه‌ی خودروی جلو می‌افتد و چشمِ راننده‌اش را می‌زند.",
      rule: `${CDS_153} c.3`,
      conceptStep: 2,
    },
    {
      sourceId: "5944",
      textIt: "Fuori dei centri abitati, i conducenti devono spegnere i proiettori di profondità procedendo con quelli anabbaglianti, dopo un loro uso prolungato, per evitare di scaricare la batteria",
      answer: 0,
      chunks: [
        { it: FUORI, fa: FUORI_FA, verb: "devono ← dovere" },
        { it: "dopo un loro uso prolungato,", fa: "بعد از استفاده‌ی طولانی،" },
        { it: "per evitare di scaricare la batteria", fa: "تا باتری خالی نشود", focus: "reason" },
      ],
      translation: "بیرون از آبادی، راننده‌ها باید بعد از استفاده‌ی طولانی نورِ بالا را خاموش کنند و با نورِ پایین ادامه دهند تا باتری خالی نشود.",
      why: "غلط است (قدم ۲). دلیلِ قانونیِ خاموش کردن چشم نزدنِ دیگران است، نه باتری.",
      rule: `${CDS_153} c.3`,
      conceptStep: 2,
    },
    {
      sourceId: "5933",
      textIt: "E’ consentito l’uso intermittente dei proiettori di profondità (a luce abbagliante) per segnalare al veicolo che precede, anche all’interno dei centri abitati, l’intenzione di sorpassare",
      answer: 1,
      chunks: [
        { it: "E’ consentito l’uso intermittente dei proiettori di profondità (a luce abbagliante)", fa: "چشمک زدن با نورِ بالا مجاز است", verb: "è consentito ← consentire" },
        { it: "per segnalare al veicolo che precede,", fa: "تا به وسیله‌ی جلویی خبر بدهی،", verb: "precede ← precedere" },
        { it: "anche all’interno dei centri abitati,", fa: "داخلِ آبادی هم،", focus: "always" },
        { it: "l’intenzione di sorpassare", fa: "که می‌خواهی سبقت بگیری" },
      ],
      translation: "چشمک زدن با نورِ بالا مجاز است تا، داخلِ آبادی هم، به وسیله‌ی جلویی خبر بدهی که می‌خواهی سبقت بگیری.",
      why: "درست است (قدم ۳). خبرِ سبقت یکی از دو هدفِ مجازِ چشمک است، داخلِ شهر هم.",
      rule: `${CDS_153} c.4`,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["5922", "5923", "5924", "5926", "5927", "5928", "5929"] },
    {
      step: 2,
      sourceIds: ["5816", "5817", "5818", "5819", "5838", "5925", "5939", "5940", "5941", "5942", "5943", "5944", "5945"],
    },
    { step: 3, sourceIds: ["5930", "5931", "5932", "5933", "5934", "5935", "5936", "5937", "5938"] },
  ],
};
