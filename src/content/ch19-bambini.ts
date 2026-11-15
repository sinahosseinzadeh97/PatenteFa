/**
 * src/content/ch19-bambini.ts
 * Chapter 19 (Cinture, casco e sicurezza), lesson 4: children on board.
 * Under 1.50 m an approved restraint suited to the child (CdS art. 172 c.1);
 * no child under 3 in a car without restraints (c.3); the bank's invented
 * exceptions (town, 40 km/h, front seat, an adult's lap); rear-facing seat in
 * front only with the airbag off (c.5). Weight groups and i-Size from Polizia
 * di Stato. #6037 reads c.5 more strictly than the law (any seat in front only
 * with a switch): taught as the bank reads it and flagged in the coverage doc.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter19.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_172 = "Codice della Strada, art. 172";

export const lessonBambini: Lesson = {
  id: "bambini-sistemi-ritenuta",
  titleFa: "کودک در خودرو: صندلیِ کودک، بدونِ استثنا",
  titleIt: "SISTEMI DI RITENUTA PER BAMBINI · SEGGIOLINI · AIRBAG",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی کودکِ کوتاه‌تر از ۱٫۵۰ متر فقط با سیستمِ نگه‌دارنده‌ی تأییدشده‌ی مناسبِ خودش سوار می‌شود، هیچ مسیرِ کوتاه، سرعتِ کم یا آغوشِ بزرگسالی جای آن را نمی‌گیرد، و صندلیِ کودکِ رو به عقب روی صندلیِ جلو فقط وقتی مجاز است که کیسه‌ی هوای آن طرف خاموش باشد.",
      why:
        "۱۵ سؤال. سه چیز را به خاطر بسپار: ۱٫۵۰ متر (مرزِ صندلیِ کودک)، ۳ سال (خودروی بی‌سیستمِ نگه‌دارنده) و گروه‌بندی بر اساسِ وزن. بانک عدد را عوض می‌کند (۱٫۳۰ متر) یا شرط اضافه می‌کند: «در شهر»، «تا ۴۰ کیلومتر»، «در آغوشِ بزرگسال».",
      rule: `${CDS_172} c.1, c.3, c.5`,
    },
    {
      kind: "table",
      title: "کدام کودک، چه سیستمی",
      body:
        "قانون مرز را با قد می‌گذارد، نه سن: کودکِ کوتاه‌تر از ۱٫۵۰ متر باید با سیستمِ نگه‌دارنده‌ی تأییدشده‌ای که برای او مناسب است بسته شود. کمربندِ بزرگسال برای بدنِ کوچک ساخته نشده: نوارِ شانه روی گردن و نوارِ لگن روی شکم می‌افتد.",
      columns: ["قاعده"],
      rows: [
        { label: "زیرِ ۱٫۵۰ متر", it: "statura inferiore a 1,50 m", values: ["سیستمِ نگه‌دارنده‌ی تأییدشده، مناسبِ قد و وزن. کمربندِ معمولی به‌تنهایی نه، حتی برای کودکِ ۱٫۳۰ یا ۱٫۴۰ متری."] },
        { label: "گروه‌ها", it: "gruppi 0, 0+, 1, 2, 3", values: ["یک نوع برای همه نیست. صندلی‌های R44 بر اساسِ وزن گروه‌بندی می‌شوند، از نوزاد تا حدودِ ۳۶ کیلو؛ صندلی‌های جدیدترِ i-Size (R129) بر اساسِ قد. برچسبِ تأیید روی خودِ صندلی است."] },
        { label: "تأییدشده و سالم", it: "omologati e mantenuti sempre efficienti", values: ["فقط مدلِ تأییدشده. صندلیِ دست‌ساز، حتی با نظرِ یک کارشناس، مجاز نیست."] },
        { label: "خودروی بی‌سیستمِ نگه‌دارنده", it: "autovetture sprovviste di sistemi di ritenuta", values: ["کودکِ زیرِ ۳ سال اصلاً نباید سوار شود. بزرگ‌ترها فقط عقب؛ جلو فقط اگر بلندتر از ۱٫۵۰ متر باشند."] },
        { label: "زیرِ ۴ سال", it: "dispositivo antiabbandono", values: ["قانونِ امروز دستگاهِ هشدارِ «جا ماندنِ کودک» را هم می‌خواهد. بانکِ ۲۰۲۳ درباره‌اش سؤالی ندارد."] },
      ],
      takeaway: "زیرِ ۱٫۵۰ متر: سیستمِ نگه‌دارنده‌ی تأییدشده و مناسب، همیشه.",
      rule: `${CDS_172} c.1, c.1-bis, c.3; Polizia di Stato (gruppi R44, R129)`,
    },
    {
      kind: "table",
      title: "شرط‌های ساختگی، و تنها استثنای واقعی",
      body:
        "بانک چهار راه برای «بدونِ صندلی» پیشنهاد می‌کند و هیچ‌کدام در قانون نیست. آغوشِ بزرگسال از همه خطرناک‌تر است: در ترمزِ شدید هیچ دستی وزنِ پرتاب‌شده‌ی یک کودک را نگه نمی‌دارد، و کمربندِ بزرگسال کودک را بینِ خودش و بدنِ بزرگسال فشار می‌دهد.",
      columns: ["بدونِ صندلی مجاز است؟"],
      rows: [
        { label: "مسیرِ شهری", it: "percorsi urbani", values: ["نه."] },
        { label: "حداکثر ۴۰ کیلومتر بر ساعت", it: "velocità massima di 40 km/h", values: ["نه."] },
        { label: "صندلیِ جلو، دمِ دستِ راننده", it: "a portata di braccio del conducente", values: ["نه."] },
        { label: "در آغوشِ یک بزرگسال", it: "in braccio a persona maggiorenne", values: ["نه؛ با کمربندِ بزرگسال هم نه."] },
        { label: "تاکسی و خودروی کرایه با راننده", it: "taxi · noleggio con conducente", values: ["تنها استثنای واقعی (در بانک نیست): کودک بدونِ صندلی، فقط روی صندلیِ عقب و همراهِ کسی که حداقل ۱۶ سال دارد."] },
      ],
      takeaway: "شهر، سرعتِ کم، صندلیِ جلو یا آغوش: هیچ‌کدام صندلیِ کودک را حذف نمی‌کند.",
      rule: `${CDS_172} c.1, c.4`,
    },
    {
      kind: "table",
      title: "صندلیِ رو به عقب و کیسه‌ی هوا",
      body:
        "صندلیِ رو به عقب (پشتش رو به شیشه‌ی جلو) سرِ نوزاد را درست جلوی داشبورد می‌گذارد. کیسه‌ی هوا با نیروی زیادی باز می‌شود و به صندلیِ کودک می‌خورد. پس:",
      columns: ["قاعده"],
      rows: [
        { label: "خودرو کلیدِ خاموش کردن دارد", it: "comando di disabilitazione", values: ["قبل از گذاشتنِ صندلیِ رو به عقب روی صندلیِ جلو، کیسه‌ی هوای سرنشین را خاموش کن."] },
        { label: "خودرو کلید ندارد", it: "non muniti del comando", values: ["صندلیِ رو به عقب هرگز روی صندلیِ جلو؛ فقط عقب."] },
        { label: "خوانشِ بانک", it: "solo se il veicolo è dotato di comando", values: ["بانک می‌گوید در خودروی دارای کیسه‌ی هوا، صندلیِ کودک فقط وقتی جلو می‌رود که خودرو کلیدِ خاموش کردن داشته باشد. برای امتحان همین را بپذیر؛ امن‌ترین جا همیشه صندلیِ عقب است."] },
      ],
      takeaway: "رو به عقب و جلو یعنی کیسه‌ی هوای خاموش. کلید نداری؟ صندلیِ عقب.",
      rule: `${CDS_172} c.5`,
    },
    {
      kind: "classify",
      title: "مجاز است یا نه؟",
      body: "هر موقعیت را بخوان. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "consentito", fa: "مجاز" },
        { it: "vietato", fa: "ممنوع" },
      ],
      items: [
        { prompt: "صندلیِ رو به عقب روی صندلیِ جلو، کیسه‌ی هوای سرنشین خاموش", answer: 0, explain: "همین شرطِ قانون است." },
        { prompt: "صندلیِ رو به عقب روی صندلیِ جلو، خودرو کلیدِ خاموش کردن ندارد", answer: 1, explain: "بی‌کلید، رو به عقب فقط روی صندلیِ عقب." },
        { prompt: "کودکِ ۴ ساله در آغوشِ مادر روی صندلیِ جلو، فقط تا سرِ کوچه", answer: 1, explain: "آغوش و مسیرِ کوتاه هیچ‌کدام استثنا نیستند." },
        { prompt: "کودکِ ۹ ساله‌ی ۱٫۳۵ متری، فقط با کمربندِ معمولیِ صندلیِ عقب", answer: 1, explain: "زیرِ ۱٫۵۰ متر است؛ سیستمِ نگه‌دارنده لازم دارد." },
        { prompt: "نوجوانِ ۱٫۵۵ متری با کمربندِ معمولی", answer: 0, explain: "از ۱٫۵۰ متر بلندتر است." },
        { prompt: "کودک روی صندلیِ تأییدشده‌ی مناسبِ وزنش، روی صندلیِ عقب", answer: 0, explain: "درست و امن‌ترین جا." },
      ],
      takeaway: "زیرِ ۱٫۵۰ متر: صندلیِ تأییدشده. رو به عقب در جلو: کیسه‌ی هوای خاموش.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il sistema di ritenuta per bambini", fa: "سیستمِ نگه‌دارنده‌ی کودک" },
        { it: "il seggiolino", fa: "صندلیِ کودک" },
        { it: "la statura, l’altezza", fa: "قد" },
        { it: "il peso", fa: "وزن" },
        { it: "con lo schienale rivolto verso la strada", fa: "رو به عقب (پشتِ صندلی رو به جاده)" },
        { it: "disattivare l’airbag", base: "disattivare", fa: "کیسه‌ی هوا را خاموش کردن" },
        { it: "in braccio", fa: "در آغوش" },
        { it: "maggiorenne", fa: "بزرگسال (۱۸ سال به بالا)" },
        { it: "di costruzione artigianale", fa: "دست‌ساز" },
      ],
    },
    {
      kind: "trap",
      title: "«1,50 metri» درست، «1,30 metri» غلط",
      body: "هر دو جمله درباره‌ی قدِ کودک است. یکی مرزِ قانون را می‌گوید، دیگری مرزِ ساختگی:",
      examples: [
        {
          sourceId: "6035",
          textIt: "I bambini di altezza inferiore a 1,50 metri, quando sono trasportati su una autovettura, devono essere trattenuti da sistemi di ritenuta omologati, adeguati alla loro statura e peso",
          answer: 1,
          chunks: [
            { it: "I bambini di altezza inferiore a 1,50 metri,", fa: "کودکانِ کوتاه‌تر از ۱٫۵۰ متر،", focus: "limit" },
            { it: "quando sono trasportati su una autovettura,", fa: "وقتی با سواری جابه‌جا می‌شوند،", verb: "sono trasportati ← trasportare" },
            { it: "devono essere trattenuti da sistemi di ritenuta omologati,", fa: "باید با سیستم‌های نگه‌دارنده‌ی تأییدشده نگه داشته شوند،", verb: "devono ← dovere" },
            { it: "adeguati alla loro statura e peso", fa: "مناسبِ قد و وزنشان" },
          ],
          translation: "کودکانِ کوتاه‌تر از ۱٫۵۰ متر، وقتی با سواری جابه‌جا می‌شوند، باید با سیستم‌های نگه‌دارنده‌ی تأییدشده و مناسبِ قد و وزنشان نگه داشته شوند.",
          why: "درست است. مرزِ قانون ۱٫۵۰ متر است.",
        },
        {
          sourceId: "6045",
          textIt: "Si possono utilizzare le cinture di sicurezza al posto dei sistemi di ritenuta per trasportare un bambino, purché sia di altezza superiore a 1,30 metri",
          answer: 0,
          chunks: [
            { it: "Si possono utilizzare le cinture di sicurezza", fa: "می‌شود از کمربندِ ایمنی استفاده کرد", verb: "si possono ← potere" },
            { it: "al posto dei sistemi di ritenuta", fa: "به‌جای سیستم‌های نگه‌دارنده", focus: "contrast" },
            { it: "per trasportare un bambino,", fa: "برای جابه‌جا کردنِ کودک،" },
            { it: "purché sia di altezza superiore a 1,30 metri", fa: "به شرطی که قدش بیشتر از ۱٫۳۰ متر باشد", verb: "sia ← essere", focus: "condition" },
          ],
          translation: "برای جابه‌جا کردنِ کودک می‌شود به‌جای سیستم‌های نگه‌دارنده از کمربندِ ایمنی استفاده کرد، به شرطی که قدش بیشتر از ۱٫۳۰ متر باشد.",
          why: "غلط است. ۱٫۳۰ متر در قانون نیست؛ تا ۱٫۵۰ متر سیستمِ نگه‌دارنده لازم است.",
        },
      ],
      takeaway: "عددِ قد را دقیق بخوان: فقط ۱٫۵۰ متر.",
      rule: `${CDS_172} c.1`,
    },
  ],
  practice: [
    {
      sourceId: "6036",
      textIt: "I bambini di età inferiore a 3 anni non possono viaggiare su autovetture sprovviste degli idonei sistemi di ritenuta",
      answer: 1,
      chunks: [
        { it: "I bambini di età inferiore a 3 anni", fa: "کودکانِ زیرِ ۳ سال", focus: "limit" },
        { it: "non possono viaggiare", fa: "نمی‌توانند سفر کنند", verb: "possono ← potere", focus: "negation" },
        { it: "su autovetture sprovviste degli idonei sistemi di ritenuta", fa: "در سواری‌هایی که سیستم‌های نگه‌دارنده‌ی مناسب ندارند", focus: "condition" },
      ],
      translation: "کودکانِ زیرِ ۳ سال نمی‌توانند در سواری‌هایی که سیستم‌های نگه‌دارنده‌ی مناسب ندارند سفر کنند.",
      why: "درست است (قدم ۱). در خودروی بی‌سیستمِ نگه‌دارنده، کودکِ زیرِ ۳ سال اصلاً سوار نمی‌شود.",
      rule: `${CDS_172} c.3`,
      conceptStep: 1,
    },
    {
      sourceId: "6040",
      textIt: "I sistemi di ritenuta per bambini sono di un unico tipo e sono tutti utilizzabili per trasportare bambini fino a 1,50 metri di altezza",
      answer: 0,
      chunks: [
        { it: "I sistemi di ritenuta per bambini", fa: "سیستم‌های نگه‌دارنده‌ی کودک" },
        { it: "sono di un unico tipo", fa: "یک نوع‌اند", verb: "sono ← essere", focus: "always" },
        { it: "e sono tutti utilizzabili", fa: "و همه قابلِ استفاده‌اند", verb: "sono ← essere", focus: "always" },
        { it: "per trasportare bambini fino a 1,50 metri di altezza", fa: "برای جابه‌جا کردنِ کودکان تا قدِ ۱٫۵۰ متر" },
      ],
      translation: "سیستم‌های نگه‌دارنده‌ی کودک یک نوع‌اند و همه برای جابه‌جا کردنِ کودکان تا قدِ ۱٫۵۰ متر قابلِ استفاده‌اند.",
      why: "غلط است (قدم ۱). چند گروه هست (بر اساسِ وزن، یا قد در i-Size)؛ هر صندلی برای یک اندازه‌ی کودک است.",
      rule: `${CDS_172} c.1; Polizia di Stato (gruppi R44, R129)`,
      conceptStep: 1,
    },
    {
      sourceId: "6043",
      textIt: "E’ consentito il trasporto di bambini senza che siano assicurati a sistemi di ritenuta, purché sui sedili anteriori e a portata di braccio del conducente",
      answer: 0,
      chunks: [
        { it: "E’ consentito il trasporto di bambini", fa: "جابه‌جا کردنِ کودکان مجاز است", verb: "è consentito ← consentire" },
        { it: "senza che siano assicurati a sistemi di ritenuta,", fa: "بدونِ این‌که با سیستمِ نگه‌دارنده بسته شده باشند،", verb: "siano ← essere", focus: "negation" },
        { it: "purché sui sedili anteriori e a portata di braccio del conducente", fa: "به شرطی که روی صندلی‌های جلو و دمِ دستِ راننده باشند", focus: "condition" },
      ],
      translation: "جابه‌جا کردنِ کودکان بدونِ این‌که با سیستمِ نگه‌دارنده بسته شده باشند مجاز است، به شرطی که روی صندلی‌های جلو و دمِ دستِ راننده باشند.",
      why: "غلط است (قدم ۲). دستِ راننده کودک را در ترمزِ شدید نگه نمی‌دارد؛ این شرط در قانون نیست.",
      rule: `${CDS_172} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "6034",
      textIt: "L’uso delle cinture di sicurezza consente il trasporto di bambini sui sedili anteriori in braccio a un adulto, senza pericoli",
      answer: 0,
      chunks: [
        { it: "L’uso delle cinture di sicurezza", fa: "استفاده از کمربندِ ایمنی" },
        { it: "consente il trasporto di bambini sui sedili anteriori", fa: "جابه‌جا کردنِ کودکان روی صندلی‌های جلو را ممکن می‌کند", verb: "consente ← consentire" },
        { it: "in braccio a un adulto,", fa: "در آغوشِ یک بزرگسال،", focus: "condition" },
        { it: "senza pericoli", fa: "بی‌خطر" },
      ],
      translation: "استفاده از کمربندِ ایمنی جابه‌جا کردنِ کودکان روی صندلی‌های جلو و در آغوشِ یک بزرگسال را بی‌خطر می‌کند.",
      why: "غلط است (قدم ۲). کمربندِ بزرگسال در ضربه کودک را بینِ خودش و بدنِ بزرگسال فشار می‌دهد؛ کودک صندلیِ خودش را لازم دارد.",
      rule: `${CDS_172} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "5996",
      textIt: "Nei veicoli che non sono muniti del comando per disabilitare l'airbag dal lato passeggero, il seggiolino per bambini non deve essere sistemato sul sedile anteriore, con lo schienale rivolto verso la strada",
      answer: 1,
      chunks: [
        { it: "Nei veicoli che non sono muniti del comando", fa: "در خودروهایی که کلید ندارند", verb: "sono ← essere", focus: "condition" },
        { it: "per disabilitare l'airbag dal lato passeggero,", fa: "برای خاموش کردنِ کیسه‌ی هوای سمتِ سرنشین،" },
        { it: "il seggiolino per bambini", fa: "صندلیِ کودک" },
        { it: "non deve essere sistemato sul sedile anteriore,", fa: "نباید روی صندلیِ جلو گذاشته شود،", verb: "deve ← dovere", focus: "negation" },
        { it: "con lo schienale rivolto verso la strada", fa: "رو به عقب (پشتش رو به جاده)" },
      ],
      translation: "در خودروهایی که کلیدِ خاموش کردنِ کیسه‌ی هوای سمتِ سرنشین را ندارند، صندلیِ کودک نباید رو به عقب (پشتش رو به جاده) روی صندلیِ جلو گذاشته شود.",
      why: "درست است (قدم ۳). بی‌کلید نمی‌توانی کیسه‌ی هوا را خاموش کنی؛ صندلیِ رو به عقب فقط عقب می‌رود.",
      rule: `${CDS_172} c.5`,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6035", "6036", "6038", "6039", "6040", "6045", "6046"] },
    { step: 2, sourceIds: ["6034", "6041", "6042", "6043", "6044"] },
    { step: 3, sourceIds: ["5995", "5996", "6037"] },
  ],
};
