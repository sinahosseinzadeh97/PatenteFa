/**
 * src/content/ch23-psicologia.ts
 * Chapter 23 (Responsabilità civile, penale e assicurazione), lessons 9–10:
 * the bank's «psicologia del traffico» group (611), first half.
 *
 *  L9  senses and attention are limited; what changes perception (weather and
 *      light, emotions, anxiety, stress); attention can be trained.
 *  L10 distractions: phone (art. 173 c.2: in hand forbidden, hands-free allowed
 *      but still a load), navigator, radio, mirrors, eyes off the road, passengers.
 *
 * 6713 (attention falls with tiredness) is mapped by chapter 12 and stays there;
 * L9 links chapter 12 and chapter 22 by lesson title. Mirror adjustment is
 * chapter 13, linked by title.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter23.test.ts.
 */
import type { Lesson } from "./lessons.js";
import { CDS, DISCLAIMER } from "./ch23-common.js";

const POLIZIA = "Polizia di Stato, «Viaggiare in sicurezza» (24/01/2023): la distrazione tra le cause di incidente";
const CDS_173 = `${CDS("173")} c.2, c.3-bis (dispositivi alla guida)`;
const CDS_140 = `${CDS("140")} (principio informatore: comportarsi in modo da non costituire pericolo)`;
const PERCEZIONE = "Durante la guida, la percezione di un pericolo e la conseguente reazione del conducente";
const PERCEZIONE_FA = "هنگامِ رانندگی، تشخیصِ یک خطر و واکنشِ راننده به آن";

export const lessonAttenzione: Lesson = {
  id: "attenzione-sensi-emozioni",
  titleFa: "حواس، توجه و احساسات",
  titleIt: "PSICOLOGIA DEL TRAFFICO: SENSI E ATTENZIONE",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی چرا هیچ راننده‌ای همه چیز را نمی‌بیند و نمی‌شنود: حواس و توجه محدودند و هوا، نور و احساسات آن‌ها را عوض می‌کنند. و می‌دانی چه چیزی واقعاً کمک می‌کند: آرامش، استراحت، و عادتِ نگاه کردن که با تمرین ساخته می‌شود.",
      why:
        "۱۳ سؤال. جمله‌ی غلط انسان را بی‌حد نشان می‌دهد («همه‌ی محرک‌ها»، «توجهِ نامحدود»، «هر شدتی»)، شرایط را بی‌اثر می‌کند، یا راهی عجیب برای آرام ماندن می‌دهد: خطر را دست‌کم بگیر، استرس بیدارت نگه می‌دارد.",
      rule: CDS_140,
    },
    {
      kind: "table",
      title: "حواس و توجه حد دارند",
      body:
        "مغز در هر لحظه فقط بخشی از آنچه دور و برت هست را می‌گیرد و پردازش می‌کند. خستگی آن بخش را کوچک‌تر می‌کند (فصلِ ۱۲، درسِ «یک ثانیه، بدون ترمز»؛ و فصلِ ۲۲، درسِ «خستگی، غذا، احساسات و عینک»):",
      columns: ["چه می‌دانیم"],
      rows: [
        { label: "همه‌ی محرک‌ها؟", it: "tutti gli stimoli presenti nell'ambiente", values: ["نه. چیزهای زیادی در صحنه هست که چشم و گوش نمی‌گیرند؛ برای همین راننده نگاهش را مرتب جابه‌جا می‌کند."] },
        { label: "هر شدتی؟", it: "stimoli di qualunque intensità", values: ["نه. نورِ خیلی کم، صدای خیلی آرام یا چیزی که خیلی سریع رد می‌شود ممکن است اصلاً حس نشود."] },
        { label: "توجهِ بی‌حد؟", it: "attenzione illimitata", values: ["نه. توجه مقدارِ محدودی دارد؛ هر کارِ دیگری (تلفن، بحث) از همان مقدار برمی‌دارد (درسِ ۱۰)."] },
        { label: "فقط در مانورِ خطرناک؟", it: "solo quando si compiono manovre pericolose", values: ["نه. خطر معمولاً وقتی پیش می‌آید که فکر می‌کنی چیزی نیست؛ توجه در همه‌ی رانندگی لازم است، نه فقط در سبقت."] },
        { label: "شنوایی", it: "l'udito", values: ["مهم است: آژیر، بوق، صدای موتور و لاستیک، دوچرخه‌ای که نمی‌بینی."] },
        { label: "تمرین", it: "allenare l'attenzione", values: ["توجه را می‌شود تمرین داد: عادتِ نگاه کردن به دور، کناره‌ها و آینه‌ها، با رانندگیِ آرام و استراحتِ کافی."] },
      ],
      takeaway: "نه همه چیز را حس می‌کنی، نه توجهت بی‌حد است. پس نگاهت را بچرخان، گوشت را باز بگذار، و توجه را در همه‌ی مسیر نگه دار.",
      rule: CDS_140,
    },
    {
      kind: "factors",
      title: "چه چیزی تشخیصِ خطر را عوض می‌کند",
      body:
        "تشخیصِ خطر و واکنش به آن فقط به چشم بستگی ندارد. شب، باران، مه، آفتابِ روبه‌رو، و حالِ درونیِ تو (خشم، اضطراب، استرس) همه آن را عوض می‌کنند. بانک چهار جمله را این‌طور دسته می‌کند:",
      columns: [
        {
          title: "درست (VERO)",
          items: [
            { fa: "شرایطِ محیط روی تشخیص و واکنش اثر دارد", it: "sono influenzate dalle condizioni ambientali", sourceId: "6716", textIt: "Durante la guida, la percezione di un pericolo e la conseguente reazione del conducente sono influenzate dalle condizioni ambientali", answer: 1 },
            { fa: "احساسات روی توجه اثر دارند", it: "Le emozioni influenzano la nostra attenzione", sourceId: "6722", textIt: "Le emozioni influenzano la nostra attenzione", answer: 1 },
          ],
        },
        {
          title: "غلط (FALSO)",
          items: [
            { fa: "شرایطِ محیط اثری ندارد", it: "non sono influenzate dalle condizioni ambientali", sourceId: "6730", textIt: "Durante la guida, la percezione di un pericolo e la conseguente reazione del conducente non sono influenzate dalle condizioni ambientali", answer: 0 },
            { fa: "استرس در ترافیکِ سنگین بیدار نگهت می‌دارد", it: "lo stress può aiutare il conducente a mantenersi vigile", sourceId: "6750", textIt: "In condizioni di traffico intenso lo stress può aiutare il conducente a mantenersi vigile", answer: 0 },
          ],
        },
      ],
      takeaway: "محیط و احساسات تشخیصِ خطر را عوض می‌کنند. اضطراب و استرس توجه را کم می‌کنند؛ آرام ماندن یعنی خطر را درست دیدن، نه کوچک دیدنش.",
      rule: CDS_140,
    },
    {
      kind: "classify",
      title: "تمرین: درست یا باورِ غلط؟",
      body: `${DISCLAIMER} این جمله‌ها ساختگی‌اند، نه از بانک. هر کدام را دسته کن:`,
      options: [
        { it: "vero", fa: "درست" },
        { it: "mito", fa: "باورِ غلط" },
      ],
      items: [
        { prompt: "راننده‌ی باتجربه همه چیزِ دور و برش را خودبه‌خود می‌بیند", answer: 1, explain: "تجربه کمک می‌کند کجا را نگاه کنی، ولی حدِ حواس را برنمی‌دارد (قدمِ ۱)." },
        { prompt: "زیرِ باران و در شب، خطر را دیرتر تشخیص می‌دهی", answer: 0, explain: "شرایطِ محیط تشخیص و واکنش را عوض می‌کند." },
        { prompt: "عصبانیت واکنشت را سریع‌تر می‌کند", answer: 1, explain: "احساسِ شدید توجه را به یک چیز می‌چسباند و بقیه را از دست می‌دهی." },
        { prompt: "پادکستِ خیلی بلند مانعِ شنیدنِ آژیرِ آمبولانس نمی‌شود", answer: 1, explain: "شنوایی بخشی از رانندگی است؛ صدای بلند آن را می‌پوشاند (درسِ ۱۰)." },
        { prompt: "عادتِ نگاه کردن به آینه‌ها و کناره‌ها را می‌شود تمرین کرد", answer: 0, explain: "توجه را می‌شود تمرین داد." },
        { prompt: "برای این‌که مضطرب نشوی، بهتر است خطر را کوچک فرض کنی", answer: 1, explain: "خطرِ کوچک‌فرض‌شده خطرِ دیده‌نشده است. آرامش از درست دیدن و فاصله‌ی کافی می‌آید." },
      ],
      takeaway: "باورِ غلطِ رایج: «من همه چیز را می‌بینم» و «احساسات روی رانندگی‌ام اثر ندارد». هر دو را کنار بگذار.",
      rule: CDS_140,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "i sensi", fa: "حواس (پنج‌گانه)" },
        { it: "gli stimoli", fa: "محرک‌ها" },
        { it: "cogliere", fa: "گرفتن، دریافتن", base: "cogliere" },
        { it: "l'attenzione", fa: "توجه" },
        { it: "la percezione del pericolo", fa: "تشخیصِ خطر" },
        { it: "le condizioni ambientali", fa: "شرایطِ محیط" },
        { it: "le emozioni", fa: "احساسات" },
        { it: "l'ansia", fa: "اضطراب" },
        { it: "lo stress", fa: "استرس" },
        { it: "sottostimare", fa: "دست‌کم گرفتن", base: "sottostimare" },
        { it: "l'udito", fa: "شنوایی" },
      ],
    },
    {
      kind: "trap",
      title: "«riescono / non riescono»: یک «non» همه چیز را عوض می‌کند",
      body: "دو جمله تقریباً یکی‌اند؛ فقط یکی «non» دارد:",
      examples: [
        {
          sourceId: "6721",
          textIt: "I nostri sensi non riescono a cogliere tutti gli stimoli presenti nell'ambiente",
          answer: 1,
          chunks: [
            { it: "I nostri sensi", fa: "حواسِ ما" },
            { it: "non riescono a cogliere", fa: "نمی‌توانند بگیرند", focus: "negation", verb: "riescono ← riuscire" },
            { it: "tutti gli stimoli presenti nell'ambiente", fa: "همه‌ی محرک‌هایی را که در محیط هست", focus: "always" },
          ],
          translation: "حواسِ ما نمی‌توانند همه‌ی محرک‌هایی را که در محیط هست بگیرند.",
          why: "درست است. حواس حد دارند.",
        },
        {
          sourceId: "6748",
          textIt: "I nostri sensi riescono a cogliere tutti gli stimoli presenti nell'ambiente",
          answer: 0,
          chunks: [
            { it: "I nostri sensi", fa: "حواسِ ما" },
            { it: "riescono a cogliere", fa: "می‌توانند بگیرند", verb: "riescono ← riuscire" },
            { it: "tutti gli stimoli presenti nell'ambiente", fa: "همه‌ی محرک‌هایی را که در محیط هست", focus: "always" },
          ],
          translation: "حواسِ ما می‌توانند همه‌ی محرک‌هایی را که در محیط هست بگیرند.",
          why: "غلط است. «tutti» بدونِ «non» غیرِ ممکن را می‌گوید.",
        },
      ],
      takeaway: "در جمله‌های روان‌شناسیِ ترافیک، «tutti», «illimitata», «qualunque» درباره‌ی توانِ انسان معمولاً جمله‌ی غلط‌اند.",
      rule: CDS_140,
    },
  ],
  practice: [
    {
      sourceId: "6746",
      textIt: "La quantità di attenzione che si può prestare alla strada mentre si guida è illimitata",
      answer: 0,
      chunks: [
        { it: "La quantità di attenzione", fa: "مقدارِ توجهی" },
        { it: "che si può prestare alla strada mentre si guida", fa: "که هنگامِ رانندگی می‌شود به جاده داد", verb: "si può ← potere" },
        { it: "è illimitata", fa: "نامحدود است", focus: "always" },
      ],
      translation: "مقدارِ توجهی که هنگامِ رانندگی می‌شود به جاده داد نامحدود است.",
      why: "غلط است (قدم ۱). توجه محدود است؛ هر کارِ دیگری از آن کم می‌کند.",
      rule: CDS_140,
      conceptStep: 1,
    },
    {
      sourceId: "6705",
      textIt: "Si può \"allenare\" l'attenzione alla guida",
      answer: 1,
      chunks: [
        { it: "Si può \"allenare\"", fa: "می‌شود «تمرین داد»", verb: "si può ← potere" },
        { it: "l'attenzione alla guida", fa: "توجه در رانندگی را" },
      ],
      translation: "می‌شود توجه در رانندگی را «تمرین داد».",
      why: "درست است (قدم ۱). عادتِ نگاه کردن با تمرین ساخته می‌شود.",
      rule: CDS_140,
      conceptStep: 1,
    },
    {
      sourceId: "6708",
      textIt: "L'ansia può ridurre la capacità di prestare attenzione ai pericoli",
      answer: 1,
      chunks: [
        { it: "L'ansia", fa: "اضطراب" },
        { it: "può ridurre la capacità di prestare attenzione ai pericoli", fa: "ممکن است توانِ توجه به خطرها را کم کند", verb: "può ← potere" },
      ],
      translation: "اضطراب ممکن است توانِ توجه به خطرها را کم کند.",
      why: "درست است (قدم ۲). احساسات و اضطراب روی توجه اثر می‌گذارند.",
      rule: CDS_140,
      conceptStep: 2,
    },
    {
      sourceId: "6731",
      textIt: "Un conducente deve sempre sottostimare le situazioni di pericolo per non farsi travolgere dall'ansia durante la guida",
      answer: 0,
      chunks: [
        { it: "Un conducente deve sempre sottostimare le situazioni di pericolo", fa: "راننده باید همیشه موقعیت‌های خطر را دست‌کم بگیرد", verb: "deve ← dovere", focus: "always" },
        { it: "per non farsi travolgere dall'ansia durante la guida", fa: "تا هنگامِ رانندگی اضطراب او را از پا درنیاورد", focus: "reason" },
      ],
      translation: "راننده باید همیشه موقعیت‌های خطر را دست‌کم بگیرد تا هنگامِ رانندگی اضطراب او را از پا درنیاورد.",
      why: "غلط است (قدم ۲). خطرِ دست‌کم‌گرفته دیر دیده می‌شود. اضطراب را با آرامش و فاصله کم کن، نه با ندیدنِ خطر.",
      rule: CDS_140,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6705", "6721", "6742", "6746", "6748", "6749", "6751"] },
    { step: 2, sourceIds: ["6708", "6716", "6722", "6730", "6731", "6750"] },
  ],
};

export const lessonDistrazioni: Lesson = {
  id: "distrazioni-a-bordo",
  titleFa: "حواس‌پرتی: تلفن، مسیریاب، سرنشین‌ها",
  titleIt: "PSICOLOGIA DEL TRAFFICO: LE DISTRAZIONI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی کدام کارها هنگامِ رانندگی ممنوع‌اند (تلفن در دست، هدفونِ روی هر دو گوش)، کدام مجازند ولی باز هم توجه را می‌برند (بلندگو، رادیو، سرنشینِ پرسروصدا)، و کدام را باید پیش از حرکت یا ایستاده انجام دهی (مسیریاب، تنظیمِ آینه).",
      why:
        "۱۶ سؤال. جمله‌ی غلط همیشه یک «اجازه» می‌سازد: «وقتی خطرِ فوری نیست»، «وقتی پشتِ تقاطع ایستاده‌ای»، «هر وقت خواستی»، «چون عادت داری». بانک درست می‌گوید: هر نگاهی که از جاده برداری، حتی کوتاه، خطر است.",
      rule: `${CDS_173}; ${CDS_140}`,
    },
    {
      kind: "table",
      title: "تلفن، مسیریاب، رادیو، آینه",
      body:
        "قانون فقط کارهایی را ممنوع کرده که دست را از فرمان برمی‌دارند؛ ولی «مجاز» یعنی «بی‌خطر» نیست. قاعده و ریسک را جدا ببین:",
      columns: ["قانون", "ریسک"],
      rows: [
        { label: "تلفن در دست", it: "il cellulare in mano", values: ["ممنوع (ماده‌ی ۱۷۳). در متنی که در ۱۵ نوامبرِ ۲۰۲۶ خوانده شد: بارِ اول ۲۵۰ تا ۱۰۰۰ یورو و تعلیقِ گواهینامه ۱۵ روز تا ۲ ماه.", "چشم، دست و ذهن هم‌زمان از جاده جدا می‌شوند. شماره گرفتن یا پیام دادن، حتی «وقتی خطری نیست»، همین است."] },
        { label: "بلندگو یا هدفونِ یک‌گوش", it: "viva voce · auricolare", values: ["مجاز، اگر هر دو گوش شنوایی کافی دارند. هدفونِ روی هر دو گوش ممنوع است.", "باز هم توجه را می‌گیرد: گفت‌وگو ذهن را از جاده می‌برد، حتی با دو دستِ روی فرمان."] },
        { label: "پیام پشتِ تقاطع", it: "in prossimità di un incrocio, un rapido messaggio", values: ["پشتِ تقاطع هنوز در حالِ رانندگی هستی.", "وضعِ تقاطع در یک لحظه عوض می‌شود؛ همان لحظه را با گوشی از دست می‌دهی."] },
        { label: "مسیریاب", it: "il navigatore satellitare", values: ["تنظیمش با دست هنگامِ حرکت، همان حکمِ گوشی را دارد.", "مقصد را پیش از حرکت یا ایستاده در جای امن وارد کن. حتی دنبال کردنِ صفحه‌اش هم حواس را می‌برد؛ صدایش را گوش کن."] },
        { label: "رادیو با دست", it: "sintonizzare manualmente l'autoradio", values: ["مجاز.", "«عادت دارم» توجه را برنمی‌گرداند: چشم و دست باز هم از جاده و فرمان جدا می‌شوند."] },
        { label: "تنظیمِ آینه", it: "regolare gli specchi retrovisori", values: ["پیش از حرکت (فصلِ ۱۳، درسِ «آینه‌ها: کِی نگاه کنی، چه نمی‌بینی، چطور تنظیم کنی»).", "در حرکت، تنظیمِ آینه یعنی چند ثانیه نگاه نکردن به جلو."] },
      ],
      takeaway: "در دست: ممنوع. بلندگو: مجاز، ولی حواس را می‌برد. مسیریاب و آینه: پیش از حرکت. «وقتی خطری نیست» و «عادت دارم» اجازه نیستند.",
      rule: `${CDS_173}; ${CDS_140}`,
    },
    {
      kind: "factors",
      title: "یک نگاهِ کوتاه، و آدم‌های داخلِ خودرو",
      body:
        "با ۵۰ کیلومتر در ساعت، خودرو در هر ثانیه حدودِ ۱۴ متر جلو می‌رود؛ دو ثانیه نگاه به گوشی یعنی حدودِ ۲۸ مترِ کور. سرنشین‌ها هم بخشی از همین داستان‌اند: بحثِ تند و سروصدا تمرکز را می‌گیرد. بانک:",
      columns: [
        {
          title: "درست (VERO)",
          items: [
            { fa: "حواس‌پرتی یکی از علت‌های اصلیِ تصادف است", it: "una delle principali cause di incidenti stradali", sourceId: "6712", textIt: "La distrazione durante la guida è una delle principali cause di incidenti stradali", answer: 1 },
            { fa: "حواس‌پرتی ممکن است تصادفِ جدی بسازد", it: "possono comportare gravi conseguenze", sourceId: "6719", textIt: "Distrarsi alla guida può causare incidenti stradali che possono comportare gravi conseguenze", answer: 1 },
            { fa: "بحثِ تند با سرنشین روی رانندگی اثرِ بد دارد", it: "Parlare animosamente con altre persone a bordo", sourceId: "6704", textIt: "Parlare animosamente con altre persone a bordo del veicolo può influenzare negativamente il comportamento di guida", answer: 1 },
          ],
        },
        {
          title: "غلط (FALSO)",
          items: [
            { fa: "وقتی خطرِ فوری نیست، می‌شود از جاده چشم برداشت", it: "quando ritiene che non ci sia pericolo imminente", sourceId: "6724", textIt: "Il conducente può distogliere lo sguardo dalla strada quando ritiene che non ci sia pericolo imminente di incidente", answer: 0 },
          ],
        },
      ],
      takeaway: "چشم روی جاده، همیشه. «فکر می‌کنم خطری نیست» همان لحظه‌ای است که خطرِ دیده‌نشده می‌رسد.",
      rule: `${CDS_140}; ${POLIZIA}`,
    },
    {
      kind: "classify",
      title: "تمرین: ممنوع، مجاز ولی حواس‌پرت‌کن، یا پیش از حرکت؟",
      body: `${DISCLAIMER} راننده‌ی فرضیِ H در شهر می‌راند. برای هر کار بگو:`,
      options: [
        { it: "vietato", fa: "ممنوع" },
        { it: "consentito, ma distrae", fa: "مجاز، ولی حواس را می‌برد" },
        { it: "prima di partire o da fermo in un posto sicuro", fa: "پیش از حرکت، یا ایستاده در جای امن" },
      ],
      items: [
        { prompt: "گوشی را در دست می‌گیرد تا پیامی را بخواند", answer: 0, explain: "دست از فرمان و چشم از جاده جدا می‌شود؛ ماده‌ی ۱۷۳ (قدمِ ۱)." },
        { prompt: "تماسی کوتاه با بلندگوی خودرو، دو دست روی فرمان", answer: 1, explain: "مجاز است، ولی گفت‌وگو هم توجه می‌گیرد." },
        { prompt: "مقصدِ تازه را در مسیریاب تایپ می‌کند", answer: 2, explain: "مسیریاب را پیش از حرکت یا ایستاده در جای امن تنظیم کن." },
        { prompt: "آینه‌ی بغل را تنظیم می‌کند", answer: 2, explain: "آینه پیش از حرکت تنظیم می‌شود (فصلِ ۱۳)." },
        { prompt: "با هدفون روی هر دو گوش موسیقی گوش می‌دهد", answer: 0, explain: "هدفونِ روی هر دو گوش ممنوع است؛ آژیر و بوق را نمی‌شنوی." },
        { prompt: "سرنشین‌های عقب بلند می‌خندند و داد می‌زنند", answer: 1, explain: "ممنوع نیست، ولی تمرکز را می‌گیرد؛ اگر لازم است، آرام‌شان کن یا جای امن بایست." },
        { prompt: "ایستگاهِ رادیو را با دست عوض می‌کند", answer: 1, explain: "مجاز است؛ «عادت دارم» حواس‌پرتی را صفر نمی‌کند." },
      ],
      takeaway: "سه دسته: دست‌وگوش‌بند (ممنوع)، گفت‌وگو و سروصدا (مجاز ولی حواس‌پرت‌کن)، تنظیم‌ها (پیش از حرکت).",
      rule: `${CDS_173}; ${CDS_140}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la distrazione", fa: "حواس‌پرتی" },
        { it: "distogliere lo sguardo", fa: "چشم برداشتن", base: "distogliere" },
        { it: "il cellulare", fa: "تلفنِ همراه" },
        { it: "il viva voce", fa: "بلندگو (هندزفری)" },
        { it: "l'auricolare", fa: "هدفون" },
        { it: "il navigatore satellitare", fa: "مسیریاب" },
        { it: "impostare, programmare", fa: "تنظیم کردن", base: "impostare" },
        { it: "sintonizzare l'autoradio", fa: "ایستگاهِ رادیو را تنظیم کردن", base: "sintonizzare" },
        { it: "schiamazzare", fa: "سروصدا کردن، داد و بیداد", base: "schiamazzare" },
        { it: "il pericolo imminente", fa: "خطرِ فوری" },
      ],
    },
    {
      kind: "trap",
      title: "«il navigatore»: کِی تنظیمش کنی؟",
      body: "هر دو جمله درباره‌ی تنظیمِ مسیریاب در حرکت‌اند. یکی خطرش را می‌گوید، دیگری اجازه‌ی همیشگی می‌دهد:",
      examples: [
        {
          sourceId: "6711",
          textIt: "Impostare il navigatore satellitare mentre si guida riduce l'attenzione alla strada",
          answer: 1,
          chunks: [
            { it: "Impostare il navigatore satellitare", fa: "تنظیم کردنِ مسیریاب" },
            { it: "mentre si guida", fa: "هنگامِ رانندگی", focus: "condition" },
            { it: "riduce l'attenzione alla strada", fa: "توجه به جاده را کم می‌کند", verb: "riduce ← ridurre" },
          ],
          translation: "تنظیم کردنِ مسیریاب هنگامِ رانندگی توجه به جاده را کم می‌کند.",
          why: "درست است. چشم و دست از جاده و فرمان جدا می‌شوند.",
        },
        {
          sourceId: "6734",
          textIt: "Mentre il veicolo è in marcia, il conducente può programmare il navigatore in qualsiasi momento",
          answer: 0,
          chunks: [
            { it: "Mentre il veicolo è in marcia,", fa: "وقتی خودرو در حرکت است،", focus: "condition" },
            { it: "il conducente può programmare il navigatore", fa: "راننده می‌تواند مسیریاب را تنظیم کند", verb: "può ← potere" },
            { it: "in qualsiasi momento", fa: "هر وقت که بخواهد", focus: "always" },
          ],
          translation: "وقتی خودرو در حرکت است، راننده می‌تواند هر وقت که بخواهد مسیریاب را تنظیم کند.",
          why: "غلط است. مسیریاب را پیش از حرکت یا ایستاده تنظیم کن.",
        },
      ],
      takeaway: "در جمله‌های حواس‌پرتی، «può … in qualsiasi momento», «quando ritiene che non ci sia pericolo» و «perché si è abituati» اجازه‌های ساختگی‌اند.",
      rule: `${CDS_173}; ${CDS_140}`,
    },
  ],
  practice: [
    {
      sourceId: "6714",
      textIt: "Utilizzare il cellulare alla guida, anche se con impianto viva-voce, può ridurre l'attenzione alla strada",
      answer: 1,
      chunks: [
        { it: "Utilizzare il cellulare alla guida,", fa: "استفاده از تلفنِ همراه هنگامِ رانندگی،" },
        { it: "anche se con impianto viva-voce,", fa: "حتی با بلندگو،", focus: "contrast" },
        { it: "può ridurre l'attenzione alla strada", fa: "ممکن است توجه به جاده را کم کند", verb: "può ← potere" },
      ],
      translation: "استفاده از تلفنِ همراه هنگامِ رانندگی، حتی با بلندگو، ممکن است توجه به جاده را کم کند.",
      why: "درست است (قدم ۱). بلندگو قانونی است، ولی گفت‌وگو باز هم توجه می‌گیرد.",
      rule: `${CDS_173}; ${CDS_140}`,
      conceptStep: 1,
    },
    {
      sourceId: "6727",
      textIt: "Durante la guida, qualora il conducente ritenga non vi sia pericolo imminente, può comporre un numero di telefono con il cellulare, senza fermarsi",
      answer: 0,
      chunks: [
        { it: "Durante la guida,", fa: "هنگامِ رانندگی،" },
        { it: "qualora il conducente ritenga non vi sia pericolo imminente,", fa: "اگر راننده فکر کند خطرِ فوری‌ای نیست،", focus: "condition", verb: "ritenga ← ritenere" },
        { it: "può comporre un numero di telefono con il cellulare,", fa: "می‌تواند با تلفنِ همراه شماره بگیرد،", verb: "può ← potere" },
        { it: "senza fermarsi", fa: "بی‌آن‌که بایستد", focus: "negation" },
      ],
      translation: "هنگامِ رانندگی، اگر راننده فکر کند خطرِ فوری‌ای نیست، می‌تواند بی‌آن‌که بایستد با تلفنِ همراه شماره بگیرد.",
      why: "غلط است (قدم ۱). شماره گرفتن با گوشی در دست ممنوع است؛ «فکر می‌کند خطری نیست» اجازه نیست.",
      rule: CDS_173,
      conceptStep: 1,
    },
    {
      sourceId: "6744",
      textIt: "Sintonizzare manualmente l'autoradio non comporta perdita di attenzione alla strada, perché è un compito che si è abituati a svolgere",
      answer: 0,
      chunks: [
        { it: "Sintonizzare manualmente l'autoradio", fa: "تنظیمِ دستیِ رادیوی خودرو" },
        { it: "non comporta perdita di attenzione alla strada,", fa: "توجه به جاده را کم نمی‌کند،", focus: "negation", verb: "comporta ← comportare" },
        { it: "perché è un compito che si è abituati a svolgere", fa: "چون کاری است که به انجامش عادت داریم", focus: "reason" },
      ],
      translation: "تنظیمِ دستیِ رادیوی خودرو توجه به جاده را کم نمی‌کند، چون کاری است که به انجامش عادت داریم.",
      why: "غلط است (قدم ۱). عادت چشم و دست را به جاده و فرمان برنمی‌گرداند.",
      rule: CDS_140,
      conceptStep: 1,
    },
    {
      sourceId: "6717",
      textIt: "E' pericoloso, durante la guida, distogliere lo sguardo dalla strada, anche per pochi millisecondi",
      answer: 1,
      chunks: [
        { it: "E' pericoloso, durante la guida,", fa: "هنگامِ رانندگی خطرناک است" },
        { it: "distogliere lo sguardo dalla strada,", fa: "که چشم از جاده برداری،" },
        { it: "anche per pochi millisecondi", fa: "حتی برای چند هزارمِ ثانیه", focus: "contrast" },
      ],
      translation: "هنگامِ رانندگی خطرناک است که چشم از جاده برداری، حتی برای چند هزارمِ ثانیه.",
      why: "درست است (قدم ۲). در هر لحظه‌ی نگاه نکردن، خودرو کور جلو می‌رود.",
      rule: CDS_140,
      conceptStep: 2,
    },
    {
      sourceId: "6702",
      textIt: "La presenza di passeggeri che schiamazzano a bordo del veicolo può influenzare la concentrazione del conducente",
      answer: 1,
      chunks: [
        { it: "La presenza di passeggeri che schiamazzano a bordo del veicolo", fa: "بودنِ سرنشین‌هایی که در خودرو سروصدا می‌کنند", verb: "schiamazzano ← schiamazzare" },
        { it: "può influenzare la concentrazione del conducente", fa: "ممکن است روی تمرکزِ راننده اثر بگذارد", verb: "può ← potere" },
      ],
      translation: "بودنِ سرنشین‌هایی که در خودرو سروصدا می‌کنند ممکن است روی تمرکزِ راننده اثر بگذارد.",
      why: "درست است (قدم ۲). سروصدا و بحث تمرکز را می‌گیرد.",
      rule: CDS_140,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6700", "6710", "6711", "6714", "6725", "6727", "6734", "6736", "6744"] },
    { step: 2, sourceIds: ["6702", "6704", "6707", "6712", "6717", "6719", "6724"] },
  ],
};
