/**
 * src/content/ch11-strade.ts
 * Chapter 11 (Limiti di velocità), lesson 2: the general speed limits by road
 * type (CdS art. 142 c.1), what a sign can and cannot change, and what the
 * weather changes (precipitation, fog). Lesson 1 is Velocità's
 * `velocita-adeguata`, reused unchanged (src/content/lessons-velocita.ts).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter11.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_142 = "Codice della Strada, art. 142";
const LIMITE = "Il limite massimo di velocità";
const LIMITE_FA = "حداکثرِ سرعتِ مجاز";

export const lessonLimitiStrade: Lesson = {
  id: "limiti-tipo-strada",
  titleFa: "سقفِ سرعت روی هر جاده",
  titleIt: "LIMITI MASSIMI · AUTOSTRADE · EXTRAURBANE · CENTRI ABITATI",
  minutes: 5,
  signs: [197, 58],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس سقفِ سرعتِ سواری را روی چهار نوع جاده می‌دانی (۱۳۰، ۱۱۰، ۹۰، ۵۰)، می‌دانی فقط تابلو می‌تواند این عدد را بالا یا پایین ببرد، و می‌دانی باران و برف و مه چه عددی را عوض می‌کنند.",
      why:
        "۴۱ سؤال. بانک عددها را جابه‌جا می‌کند (۱۱۰ را ۱۰۰ می‌گوید، ۹۰ را ۷۰) و با کلمه‌هایی مثلِ «sempre»، «qualsiasi» و «ordinariamente» بازی می‌کند. درسِ ۱ گفت حدِ مجاز سقف است، نه هدف؛ این درس خودِ سقف‌ها را یاد می‌دهد.",
      rule: `${CDS_142} c.1`,
    },
    {
      kind: "table",
      title: "چهار جاده، چهار سقف",
      body:
        "قانون برای هر نوعِ جاده یک سقفِ عمومی می‌گذارد. «ordinariamente» و «salvo diversa segnalazione» یعنی «اگر تابلویی چیزِ دیگری نگوید». نوعِ جاده را از تابلوی شروعش می‌شناسی (فصلِ ۸، درسِ ۷). این سقف‌ها برای سواری است؛ درس‌های ۳ و ۴ می‌گویند کدام وسیله‌ها و کدام راننده‌ها سقفِ پایین‌تری دارند.",
      columns: ["سقفِ سواری"],
      rows: [
        { label: "بزرگراه", it: "autostrade", values: ["۱۳۰ km/h"] },
        { label: "برون‌شهریِ اصلی", it: "strade extraurbane principali", values: ["۱۱۰ km/h"] },
        { label: "برون‌شهریِ فرعی و محلی", it: "strade extraurbane secondarie", values: ["۹۰ km/h"] },
        { label: "داخلِ آبادی", it: "centri abitati", values: ["۵۰ km/h"] },
        { label: "تابلوی مرز", it: "limiti generali", sign: 197, values: ["همین چهار عدد، برای کسی که از خارج وارد ایتالیا می‌شود. کشورهای دیگرِ اروپا عددهای دیگری دارند."] },
        { label: "چه نیست", it: "non è", values: ["شهر ۶۰ یا ۸۰ نیست؛ اصلی ۱۰۰ نیست؛ فرعی ۷۰ یا ۱۰۰ نیست. سقفِ شهر هم «تا یک کیلومتر بعد از تابلوی پایانِ آبادی» ادامه پیدا نمی‌کند: همان‌جا تمام می‌شود."] },
      ],
      takeaway: "۱۳۰ · ۱۱۰ · ۹۰ · ۵۰ = بزرگراه · اصلی · فرعی · شهر، اگر تابلویی چیزِ دیگری نگوید.",
      rule: `${CDS_142} c.1; DPR 495/1992 art. 135 c.27`,
    },
    {
      kind: "table",
      title: "فقط تابلو عدد را عوض می‌کند",
      body:
        "مالکِ جاده می‌تواند با تابلوی LIMITE MASSIMO DI VELOCITÀ سقف را پایین‌تر بیاورد، و فقط در دو حالت بالاتر ببرد. هیچ چیزِ دیگری (تعدادِ خط‌ها، شب، سرازیری، خطِ سبقت) عدد را بالا نمی‌برد.",
      columns: ["قاعده"],
      rows: [
        { label: "بزرگراه تا ۱۵۰", it: "fino a 150 km/h", values: ["فقط روی بزرگراهی که در هر جهت سه خط و یک خطِ اضطراری دارد، سیستمِ کنترلِ سرعتِ میانگین دارد و تابلو گذاشته شده. «هر بزرگراهی» نه."] },
        { label: "شهر تا ۷۰", it: "fino a 70 km/h", values: ["فقط روی خیابان‌هایی که ساختارشان اجازه می‌دهد و تابلو دارند. پس سقفِ شهر نه «همیشه ۵۰» است، نه «همیشه ۷۰»."] },
        { label: "پایین‌تر", it: "limiti inferiori", sign: 58, values: ["هر جا که تابلو بگذارند. عددِ داخلِ دایره‌ی قرمز سقفِ همان بخش است (فصل ۳)."] },
        { label: "چیزهایی که عدد را بالا نمی‌برند", it: "non aumentano il limite", values: ["چهار خط («۱۷۰»)، شب با نورِ بالا، «روز ۱۵۰ و شب ۱۳۰»، سرازیری. جاده‌ی برون‌شهریِ اصلی هرگز ۱۳۰ نمی‌شود."] },
        { label: "خطِ سبقت", it: "corsia di sorpasso", values: ["سقفِ جداگانه‌ی ۱۱۰ ندارد؛ سقف، سقفِ همان جاده است."] },
        { label: "چند ردیفِ موازی", it: "file parallele · canalizzazione", values: ["وقتی ترافیک در چند ردیف یا در خط‌های جداشده حرکت می‌کند، هر ردیف با سرعتِ خودروهای جلویش می‌رود؛ پس ممکن است ردیفِ راست تندتر از چپ برود. این سبقت از راست حساب نمی‌شود."] },
      ],
      takeaway: "عدد را تابلو عوض می‌کند. ۱۵۰ فقط بزرگراهِ سه‌خطه با تابلو، ۷۰ فقط خیابانِ شهریِ مناسب با تابلو.",
      rule: `${CDS_142} c.1–2; CdS art. 144 c.1`,
    },
    {
      kind: "table",
      title: "باران، برف، مه؛ و شب",
      body:
        "دو چیز سقف را بدونِ تابلوی تازه پایین می‌آورند: بارش، و تابلوی موقتِ مه. بقیه‌ی شرایط عدد را عوض نمی‌کنند، ولی طبقِ درسِ ۱ باید سرعت را با آن‌ها تنظیم کنی.",
      columns: ["سقف"],
      rows: [
        { label: "هر نوع بارش", it: "precipitazioni atmosferiche", values: ["باران، برف یا تگرگ: بزرگراه ۱۱۰، برون‌شهریِ اصلی ۹۰. «di qualsiasi natura» یعنی نوعش مهم نیست."] },
        { label: "فرعی و شهر در باران", it: "secondarie · centri abitati", values: ["عددِ تازه‌ای ندارند (۹۰ و ۵۰ می‌مانند)؛ ولی سرعت را با جاده‌ی خیس تنظیم می‌کنی."] },
        { label: "مهِ غلیظ", it: "nebbia · visibilità < 100 m", values: ["روی بعضی بخش‌های بزرگراه و برون‌شهریِ اصلی، وقتی دید کمتر از ۱۰۰ متر است، می‌توانند با تابلو سقفِ موقتِ حداکثر ۵۰ بگذارند. «می‌توانند»: همه‌جا خودکار نیست."] },
        { label: "شب و غروب", it: "tramonto · ore notturne", values: ["عدد عوض نمی‌شود. «نیم ساعت بعد از غروب تا نیم ساعت قبل از طلوع» قاعده‌ی روشن کردنِ چراغ است، نه کم کردنِ سرعت."] },
        { label: "حداقلِ عمومی", it: "velocità minima", values: ["قانونِ «همیشه بیش از ۳۰» وجود ندارد. فقط نباید بی‌دلیل آن‌قدر آهسته بروی که جریان را کند کنی (درسِ ۱)."] },
      ],
      takeaway: "بارش = ۱۱۰ در بزرگراه و ۹۰ در برون‌شهریِ اصلی. مه = تا ۵۰، فقط جایی که تابلو هست.",
      rule: `${CDS_142} c.1–2; Direttiva MIT prot. 335 del 16/02/1993; CdS art. 141 c.6, art. 152`,
    },
    {
      kind: "classify",
      title: "سقف کدام است؟",
      body: "سواری، بدونِ هیچ تابلوی سرعت. جاده و هوا را بخوان و سقف را انتخاب کن. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "130", fa: "130" },
        { it: "110", fa: "110" },
        { it: "90", fa: "90" },
        { it: "50", fa: "50" },
      ],
      items: [
        { prompt: "بزرگراه، آسمانِ صاف، ساعت ۲ بامداد", answer: 0, explain: "شب عدد را عوض نمی‌کند: ۱۳۰. (سرعتِ مناسب ممکن است کمتر باشد.)" },
        { prompt: "بزرگراه، باران می‌بارد", answer: 1, explain: "بارش: بزرگراه ۱۱۰." },
        { prompt: "برون‌شهریِ اصلی، برف می‌بارد", answer: 2, explain: "هر نوع بارش: برون‌شهریِ اصلی ۹۰." },
        { prompt: "برون‌شهریِ اصلی، هوای خشک", answer: 1, explain: "سقفِ عمومیِ اصلی ۱۱۰ است." },
        { prompt: "برون‌شهریِ فرعی، باران", answer: 2, explain: "فرعی در باران عددِ تازه‌ای ندارد: ۹۰ می‌ماند." },
        { prompt: "خیابانِ داخلِ شهر، هیچ تابلویی", answer: 3, explain: "داخلِ آبادی ۵۰. ۷۰ فقط با تابلو." },
      ],
      takeaway: "اول نوعِ جاده، بعد بارش، بعد تابلو. شب، تعدادِ خط و سرازیری عدد را عوض نمی‌کنند.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il limite massimo di velocità", fa: "حداکثرِ سرعتِ مجاز؛ سقف" },
        { it: "ordinariamente", fa: "به‌طورِ معمول؛ اگر تابلویی چیزِ دیگری نگوید" },
        { it: "salvo diversa segnalazione", fa: "مگر این‌که تابلو چیزِ دیگری بگوید" },
        { it: "in presenza di apposito segnale", fa: "وقتی تابلوی مخصوصش باشد" },
        { it: "le precipitazioni atmosferiche", fa: "بارش (باران، برف، تگرگ)" },
        { it: "la grandine", fa: "تگرگ" },
        { it: "la nebbia fitta", fa: "مهِ غلیظ" },
        { it: "il centro abitato", fa: "آبادی؛ داخلِ شهر یا روستا" },
        { it: "possono essere imposti", base: "imporre", fa: "می‌توانند اجبار کنند (نه همیشه)" },
      ],
    },
    {
      kind: "trap",
      title: "«ordinariamente» درست، «sempre» غلط",
      body: "هر دو جمله درباره‌ی سقفِ سرعتِ سواری داخلِ آبادی است. فقط یک کلمه فرق دارد:",
      examples: [
        {
          sourceId: "4011",
          textIt: "Il limite massimo di velocità per un'autovettura nei centri abitati è ordinariamente di 50 km/h",
          answer: 1,
          chunks: [
            { it: LIMITE, fa: LIMITE_FA },
            { it: "per un'autovettura nei centri abitati", fa: "برای سواری داخلِ آبادی‌ها" },
            { it: "è ordinariamente di 50 km/h", fa: "به‌طورِ معمول ۵۰ کیلومتر بر ساعت است", verb: "è ← essere", note: "«ordinariamente» = اگر تابلو چیزِ دیگری نگوید." },
          ],
          translation: "حداکثرِ سرعتِ مجازِ سواری داخلِ آبادی‌ها به‌طورِ معمول ۵۰ کیلومتر بر ساعت است.",
          why: "درست است. ۵۰ سقفِ عمومی است؛ «به‌طورِ معمول» جا را برای تابلوی ۷۰ یا عددِ کمتر باز می‌گذارد.",
        },
        {
          sourceId: "4028",
          textIt: "Il limite massimo di velocità per un'autovettura nei centri abitati è sempre di 50 km/h",
          answer: 0,
          chunks: [
            { it: LIMITE, fa: LIMITE_FA },
            { it: "per un'autovettura nei centri abitati", fa: "برای سواری داخلِ آبادی‌ها" },
            { it: "è sempre di 50 km/h", fa: "همیشه ۵۰ کیلومتر بر ساعت است", verb: "è ← essere", focus: "always" },
          ],
          translation: "حداکثرِ سرعتِ مجازِ سواری داخلِ آبادی‌ها همیشه ۵۰ کیلومتر بر ساعت است.",
          why: "غلط است. روی خیابان‌های مناسب، با تابلو، سقف می‌تواند ۷۰ باشد. «sempre» این استثنا را حذف می‌کند.",
        },
      ],
      takeaway: "در جمله‌های سقفِ سرعت، «sempre» و «qualsiasi» معمولاً نشانه‌ی دام‌اند؛ «ordinariamente» و «salvo diversa segnalazione» نشانه‌ی جمله‌ی دقیق.",
      rule: `${CDS_142} c.1`,
    },
  ],
  practice: [
    {
      sourceId: "4009",
      textIt: "Il limite massimo di velocità per un'autovettura sulle strade extraurbane principali è ordinariamente di 110 km/h",
      answer: 1,
      chunks: [
        { it: LIMITE, fa: LIMITE_FA },
        { it: "per un'autovettura", fa: "برای سواری" },
        { it: "sulle strade extraurbane principali", fa: "در جاده‌های برون‌شهریِ اصلی" },
        { it: "è ordinariamente di 110 km/h", fa: "به‌طورِ معمول ۱۱۰ کیلومتر بر ساعت است", verb: "è ← essere" },
      ],
      translation: "حداکثرِ سرعتِ مجازِ سواری در جاده‌های برون‌شهریِ اصلی به‌طورِ معمول ۱۱۰ کیلومتر بر ساعت است.",
      why: "درست است (قدم ۱). اصلی = ۱۱۰، اگر تابلو چیزِ دیگری نگوید.",
      rule: `${CDS_142} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "4136",
      textIt: "Salvo diversa segnalazione, il limite massimo di velocità nei centri abitati è di 60 km/h, valido fino ad un chilometro dopo l'uscita del paese",
      answer: 0,
      chunks: [
        { it: "Salvo diversa segnalazione,", fa: "مگر این‌که تابلو چیزِ دیگری بگوید،", focus: "condition" },
        { it: "il limite massimo di velocità nei centri abitati", fa: "حداکثرِ سرعتِ مجاز داخلِ آبادی‌ها" },
        { it: "è di 60 km/h,", fa: "۶۰ کیلومتر بر ساعت است،", verb: "è ← essere", focus: "contrast" },
        { it: "valido fino ad un chilometro dopo l'uscita del paese", fa: "و تا یک کیلومتر بعد از خروج از آبادی معتبر است" },
      ],
      translation: "مگر این‌که تابلو چیزِ دیگری بگوید، حداکثرِ سرعتِ مجاز داخلِ آبادی‌ها ۶۰ کیلومتر بر ساعت است و تا یک کیلومتر بعد از خروج از آبادی معتبر است.",
      why: "غلط است (قدم ۱). داخلِ آبادی ۵۰ است، و سقفِ شهر با تابلوی پایانِ آبادی تمام می‌شود.",
      rule: `${CDS_142} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "4077",
      textIt: "In presenza di apposito segnale, il limite massimo di velocità consentito può essere di 150 km/h su tratti di autostrade con particolari caratteristiche",
      answer: 1,
      chunks: [
        { it: "In presenza di apposito segnale,", fa: "وقتی تابلوی مخصوصش باشد،", focus: "condition" },
        { it: "il limite massimo di velocità consentito", fa: "حداکثرِ سرعتِ مجاز" },
        { it: "può essere di 150 km/h", fa: "می‌تواند ۱۵۰ کیلومتر بر ساعت باشد", verb: "può ← potere" },
        { it: "su tratti di autostrade con particolari caratteristiche", fa: "در بخش‌هایی از بزرگراه که ویژگی‌های خاصی دارند", focus: "limit" },
      ],
      translation: "وقتی تابلوی مخصوصش باشد، حداکثرِ سرعتِ مجاز در بخش‌هایی از بزرگراه که ویژگی‌های خاصی دارند می‌تواند ۱۵۰ کیلومتر بر ساعت باشد.",
      why: "درست است (قدم ۲). هر سه شرط در جمله هست: تابلو، بزرگراه، و بخشِ خاص (سه خط و خطِ اضطراری).",
      rule: `${CDS_142} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "4146",
      textIt: "Sulle autostrade è consentito superare, nelle ore notturne, la velocità di 130 km/h, purché si usino i proiettori a luce abbagliante",
      answer: 0,
      chunks: [
        { it: "Sulle autostrade", fa: "در بزرگراه‌ها" },
        { it: "è consentito superare,", fa: "مجاز است که از … بیشتر بروی،", verb: "è consentito ← consentire", focus: "contrast" },
        { it: "nelle ore notturne,", fa: "در ساعت‌های شب،" },
        { it: "la velocità di 130 km/h,", fa: "سرعتِ ۱۳۰ کیلومتر بر ساعت،" },
        { it: "purché si usino i proiettori a luce abbagliante", fa: "به شرطِ این‌که نورِ بالا روشن باشد", focus: "condition", verb: "si usino ← usare" },
      ],
      translation: "در بزرگراه‌ها مجاز است شب‌ها از ۱۳۰ کیلومتر بر ساعت بیشتر بروی، به شرطِ این‌که نورِ بالا روشن باشد.",
      why: "غلط است (قدم ۲). فقط تابلو سقف را بالا می‌برد. شب و نورِ بالا هیچ ربطی به عدد ندارند.",
      rule: `${CDS_142} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "4083",
      textIt: "Salvo diversa segnalazione, il limite massimo di velocità consentito su strade extraurbane principali è di 90 km/h in caso di grandine",
      answer: 1,
      chunks: [
        { it: "Salvo diversa segnalazione,", fa: "مگر این‌که تابلو چیزِ دیگری بگوید،", focus: "condition" },
        { it: "il limite massimo di velocità consentito", fa: "حداکثرِ سرعتِ مجاز" },
        { it: "su strade extraurbane principali", fa: "در جاده‌های برون‌شهریِ اصلی" },
        { it: "è di 90 km/h", fa: "۹۰ کیلومتر بر ساعت است", verb: "è ← essere" },
        { it: "in caso di grandine", fa: "هنگامِ تگرگ", focus: "condition" },
      ],
      translation: "مگر این‌که تابلو چیزِ دیگری بگوید، حداکثرِ سرعتِ مجاز در جاده‌های برون‌شهریِ اصلی هنگامِ تگرگ ۹۰ کیلومتر بر ساعت است.",
      why: "درست است (قدم ۳). تگرگ هم بارش است: اصلی ۹۰، بزرگراه ۱۱۰.",
      rule: `${CDS_142} c.1`,
      conceptStep: 3,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: ["4008", "4009", "4010", "4011", "4025", "4026", "4034", "4078", "4079", "4085", "4086", "4090", "4107", "4135", "4136", "4154"],
    },
    {
      step: 2,
      sourceIds: [
        "4016", "4017", "4024", "4027", "4028", "4077", "4084", "4092",
        "4142", "4143", "4144", "4145", "4146", "4147", "4148", "4149", "4150",
      ],
    },
    { step: 3, sourceIds: ["4018", "4019", "4066", "4082", "4083", "4125", "4129", "4134"] },
  ],
};
