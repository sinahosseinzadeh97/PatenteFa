/**
 * src/content/ch25-pneumatici.ts
 * Chapter 25 (Elementi del veicolo, manutenzione e comportamenti), lessons 6–8:
 * tyres, and what to do when something happens by the road
 * (bank groups 637–640, 642, 645).
 *
 *  L6 tyre pressure (when, how, whose value) and tyre condition (637, 645; 6935).
 *  L7 tread depth and tyre age, tubeless punctures, winter tyres, studs and chains
 *     (638, 639). 6938 is flagged: mapped, never scored (VEICOLO_FLAGGED_SOURCE_IDS).
 *  L8 a puncture by the road: safety first, the wheel change in order, the
 *     space-saver spare; a vehicle fire, with the electric/hybrid case apart (640, 642).
 *
 * No tyre pressures, no tread figures beyond the law's minimums, no ruotino
 * speed beyond "what its label says (often 80 km/h)": the manufacturer decides.
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter25.test.ts.
 */
import type { Lesson } from "./lessons.js";
import { CDS, EXERCISE, MANUALE, MODEL_NOTE, TECNICA } from "./ch25-common.js";

const BATT = "L. 142/1992, art. 66 (spessore minimo del battistrada: autoveicoli 1,6 mm, motoveicoli 1 mm, ciclomotori 0,5 mm)";
const INVERNALI = "Circolari MIT prot. 1049 del 17/01/2014 e prot. 12047 del 30/04/2020 (pneumatici invernali con codice di velocità inferiore: 15 ottobre–15 maggio)";
const CHIODATI = "Polizia di Stato, pneumatici chiodati (solo veicoli fino a 3,5 t); periodo fissato da circolare ministeriale";
const RUOTINO = "manuali d'uso Fiat e Kia: ruotino, velocità massima indicata sulla ruota (spesso 80 km/h)";
const EV_FUOCO = "manuale d'uso di un veicolo elettrico (Kia): in caso di incendio allontanarsi, chiamare i vigili del fuoco e dire che è elettrico";
const PRESS = "La pressione di gonfiaggio degli pneumatici";
const PRESS_FA = "فشارِ بادِ لاستیک‌ها";
const SOST = "Per sostituire una ruota";

export const lessonPressione: Lesson = {
  id: "pneumatici-pressione-condizioni",
  titleFa: "لاستیک: فشارِ باد و وضعیتش",
  titleIt: "PRESSIONE DI GONFIAGGIO · CONDIZIONI DEI PNEUMATICI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی فشارِ بادِ لاستیک را کِی و چطور بسنجی (سرد، با عددِ سازنده، با توجه به بار)، فشارِ نادرست چه نشانه‌ای روی لاستیک می‌گذارد، و چه چیزهایی را باید در لاستیک ببینی: دیواره‌ها، اندازه‌ی مجاز، و یکسان بودنِ لاستیک‌های یک محور.",
      why:
        "۲۱ سؤال. جمله‌ی غلط یک معیارِ ساختگی برای فشار می‌سازد (جنسِ رینگ، طولِ سفر، «مثلِ یدک»، «با گاز به‌جای هوا کمتر»)، زمانِ سنجش را وارونه می‌کند («وقتی گرم شد»)، یا یک کارِ مضر را مفید جا می‌زند («برای خنک شدن فشار را کم کن»). عددِ فشار را هیچ‌جا نمی‌دهیم: آن را سازنده می‌گوید.",
      rule: MANUALE,
    },
    {
      kind: "table",
      title: "فشار: کِی، چطور، با کدام عدد",
      body:
        "عددِ درست را سازنده‌ی خودرو می‌دهد: در دفترچه، و معمولاً روی برچسبی در لبه‌ی در یا درِ باک. اغلب دو عدد هست: برای بارِ معمولی و برای بارِ کامل. لاستیکِ داغ عددِ بالاتری نشان می‌دهد، پس فقط سرد بسنج:",
      columns: ["درست", "دام"],
      rows: [
        { label: "کِی", it: "quando la gomma è fredda", values: ["سرد، پیش از راه افتادن یا بعد از چند کیلومترِ آرام", "«وقتی گرم شد، عدد درست است»: غلط"] },
        { label: "کدام عدد", it: "quella consigliata dalla casa costruttrice", values: ["عددِ سازنده، برای همان بار و تعدادِ سرنشین", "جنسِ رینگ (فولاد، آلومینیوم) معیار نیست"] },
        { label: "بارِ بیشتر", it: "va adeguata alle condizioni di peso del veicolo", values: ["عددِ «بارِ کامل» را بزن، اگر دفترچه دارد", "«سفرِ طولانی، پس بیشتر»: معیار بار است، نه طولِ راه"] },
        { label: "یدک و کاروان", it: "uguale a quella degli pneumatici del rimorchio", values: ["هر کدام عددِ خودش را دارد", "«مثلِ لاستیک‌های خودرو»: غلط"] },
        { label: "زاپاس", it: "compresa quella della ruota di scorta", values: ["آن را هم مرتب بسنج", "زاپاسِ بی‌باد روزِ پنچری به کار نمی‌آید"] },
        { label: "باد یا نیتروژن", it: "gonfiati con l'azoto", values: ["همان عددِ سازنده", "«با نیتروژن کمتر باد بزن»: غلط"] },
      ],
      takeaway: `سرد، با عددِ سازنده، با توجه به بار؛ زاپاس هم. ${MODEL_NOTE}`,
      rule: MANUALE,
    },
    {
      kind: "table",
      title: "فشارِ نادرست چه نشانه‌ای می‌گذارد، و لاستیک را کجا ببینی",
      body:
        "لاستیکِ کم‌باد بیشتر تغییرِ شکل می‌دهد: داغ‌تر می‌شود، سوختِ بیشتری می‌خورد (فصلِ ۲۴، «سوخت کجا می‌رود: هوا، وزن، لاستیک») و لبه‌هایش زودتر می‌سایند. خودروهایی که حسگرِ فشار دارند، کم شدنِ باد را خبر می‌دهند:",
      columns: ["یعنی چه", "چه کنی"],
      rows: [
        { label: "سایشِ دو لبه", it: "l'anomalo consumo ai bordi", values: ["معمولاً فشارِ خیلی کم", "فشار را با عددِ سازنده درست کن"] },
        { label: "«کم و بیش، وسط و لبه با هم»", it: "della parte centrale e dei bordi", values: ["غلط: کم‌بادی لبه‌ها را می‌ساید، نه وسط را", "سایشِ وسط بیشتر نشانه‌ی فشارِ زیاد است"] },
        { label: "کم کردنِ باد «برای خنک شدن»", it: "per migliorare il raffreddamento", values: ["غلط: لاستیکِ کم‌باد داغ‌تر می‌شود", "نکن"] },
        { label: "دیواره‌های کناری", it: "anche sui lati", values: ["بریدگی، برآمدگی یا ترک یعنی خطرِ ترکیدن", "لاستیکِ آسیب‌دیده را تعمیرگاه ببیند"] },
        { label: "اندازه‌ی لاستیک", it: "le dimensioni previste dall'omologazione", values: ["فقط اندازه‌هایی که برای خودرو تأیید شده (کارتِ خودرو)", "لاستیک‌های یک محور: یکسان"] },
        { label: "جابه‌جا کردنِ لاستیک‌ها", it: "invertire la posizione degli pneumatici", values: ["ممنوع نیست؛ در بسیاری از دفترچه‌ها توصیه شده", "همه‌ی چرخ‌ها را بسنج، نه فقط چرخ‌های محرک"] },
        { label: "حسگرِ فشار", it: "il sistema automatico di rilevamento della pressione", values: ["ایمنی را بیشتر می‌کند", "جای سنجیدنِ مرتب را نمی‌گیرد؛ چراغش در داشبورد (فصلِ ۱۸)"] },
      ],
      takeaway: "لبه‌های ساییده = کم‌بادی. دیواره‌ها را هم ببین. لاستیک‌های یک محور یکسان، و فقط اندازه‌ی تأییدشده.",
      rule: `${MANUALE}; ${CDS("79")} (efficienza dei veicoli)`,
    },
    {
      kind: "classify",
      title: "تمرین: کارِ درست یا نادرست؟",
      body: `${EXERCISE} هر کاری که راننده با فشارِ بادِ لاستیک می‌کند را بسنج:`,
      options: [
        { it: "corretto", fa: "کارِ درست" },
        { it: "sbagliato", fa: "کارِ نادرست" },
      ],
      items: [
        { prompt: "صبح، پیش از راه افتادن، فشار را می‌سنجد", answer: 0, explain: "لاستیکِ سرد عددِ درست را نشان می‌دهد (قدمِ ۱)." },
        { prompt: "بعد از یک ساعت آزادراه، در پمپ‌بنزین فشار را بالا می‌بیند و باد را تا عددِ دفترچه خالی می‌کند", answer: 1, explain: "لاستیکِ گرم عددِ بالاتری نشان می‌دهد؛ اگر حالا خالی کند، وقتی سرد شد کم‌باد می‌ماند (قدمِ ۱)." },
        { prompt: "پیش از سفر با خودروی پر از سرنشین و بار، عددِ «بارِ کامل» را از برچسب می‌زند", answer: 0, explain: "فشار با بار و تعدادِ سرنشین تنظیم می‌شود (قدمِ ۱)." },
        { prompt: "چون راه طولانی است، کمی بیشتر از عددِ دفترچه باد می‌زند", answer: 1, explain: "طولِ راه معیار نیست؛ عددِ سازنده برای همان بار معیار است (قدمِ ۱)." },
        { prompt: "تابستان است؛ کمی باد خالی می‌کند تا لاستیک خنک‌تر بماند", answer: 1, explain: "لاستیکِ کم‌باد داغ‌تر می‌شود، نه خنک‌تر (قدمِ ۲)." },
        { prompt: "فشارِ زاپاس را هم می‌سنجد", answer: 0, explain: "زاپاس هم لاستیک است و باد از دست می‌دهد (قدمِ ۱)." },
      ],
      takeaway: "عددِ سازنده، لاستیکِ سرد، و بار. هر معیارِ دیگری دام است.",
      rule: MANUALE,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la pressione di gonfiaggio", fa: "فشارِ بادِ لاستیک" },
        { it: "lo pneumatico (gli pneumatici)", fa: "لاستیک" },
        { it: "la gomma fredda · calda", fa: "لاستیکِ سرد · گرم" },
        { it: "la casa costruttrice", fa: "سازنده‌ی خودرو" },
        { it: "la ruota di scorta", fa: "زاپاس" },
        { it: "i cerchioni", fa: "رینگ‌ها" },
        { it: "i bordi · i lati (fianchi)", fa: "لبه‌ها · دیواره‌های کناریِ لاستیک" },
        { it: "lo stesso asse", fa: "یک محور" },
        { it: "l'omologazione", fa: "تأییدیه‌ی نوعِ خودرو" },
      ],
    },
    {
      kind: "trap",
      title: "«quando la gomma è…»: سرد یا گرم؟",
      body: "هر دو جمله درباره‌ی زمانِ سنجیدنِ فشارند. یکی لاستیکِ سرد را می‌گوید، دیگری گرم:",
      examples: [
        {
          sourceId: "6920",
          textIt: "La pressione di gonfiaggio dei pneumatici deve essere controllata quando la gomma è fredda",
          answer: 1,
          chunks: [
            { it: "La pressione di gonfiaggio dei pneumatici", fa: PRESS_FA },
            { it: "deve essere controllata", fa: "باید سنجیده شود", verb: "deve ← dovere" },
            { it: "quando la gomma è fredda", fa: "وقتی لاستیک سرد است", focus: "condition" },
          ],
          translation: "فشارِ بادِ لاستیک‌ها باید وقتی لاستیک سرد است سنجیده شود.",
          why: "درست است. عددِ سازنده برای لاستیکِ سرد است.",
        },
        {
          sourceId: "6922",
          textIt: "Se si misura la pressione di gonfiaggio degli pneumatici quando la gomma è calda, si ha una corretta lettura dei valori di pressione",
          answer: 0,
          chunks: [
            { it: "Se si misura la pressione di gonfiaggio degli pneumatici", fa: "اگر فشارِ بادِ لاستیک‌ها را بسنجی", focus: "condition", verb: "si misura ← misurare" },
            { it: "quando la gomma è calda,", fa: "وقتی لاستیک گرم است،", focus: "condition" },
            { it: "si ha una corretta lettura dei valori di pressione", fa: "عددِ درستِ فشار را می‌خوانی", focus: "contrast" },
          ],
          translation: "اگر فشارِ بادِ لاستیک‌ها را وقتی لاستیک گرم است بسنجی، عددِ درستِ فشار را می‌خوانی.",
          why: "غلط است. هوای گرم منبسط می‌شود و عدد بالاتر از واقعی نشان داده می‌شود.",
        },
      ],
      takeaway: "«fredda» درست است؛ «calda» یا «appena surriscaldata» یعنی جمله غلط است.",
      rule: MANUALE,
    },
  ],
  practice: [
    {
      sourceId: "6918",
      textIt: "La corretta pressione di gonfiaggio degli pneumatici dipende dal carico del veicolo e dal numero dei passeggeri trasportati",
      answer: 1,
      chunks: [
        { it: "La corretta pressione di gonfiaggio degli pneumatici", fa: "فشارِ درستِ بادِ لاستیک‌ها" },
        { it: "dipende dal carico del veicolo", fa: "به بارِ وسیله بستگی دارد", verb: "dipende ← dipendere" },
        { it: "e dal numero dei passeggeri trasportati", fa: "و به تعدادِ سرنشین‌ها" },
      ],
      translation: "فشارِ درستِ بادِ لاستیک‌ها به بارِ وسیله و تعدادِ سرنشین‌ها بستگی دارد.",
      why: "درست است (قدم ۱). برای همین دفترچه اغلب دو عدد دارد: بارِ معمولی و بارِ کامل.",
      rule: MANUALE,
      conceptStep: 1,
    },
    {
      sourceId: "6925",
      textIt: "Prima di iniziare un lungo viaggio, è opportuno aumentare la pressione di gonfiaggio degli pneumatici",
      answer: 0,
      chunks: [
        { it: "Prima di iniziare un lungo viaggio,", fa: "پیش از شروعِ یک سفرِ طولانی،", focus: "condition" },
        { it: "è opportuno aumentare", fa: "بهتر است بیشتر کرد", focus: "contrast" },
        { it: "la pressione di gonfiaggio degli pneumatici", fa: PRESS_FA },
      ],
      translation: "پیش از شروعِ یک سفرِ طولانی، بهتر است فشارِ بادِ لاستیک‌ها را بیشتر کرد.",
      why: "غلط است (قدم ۱). معیار بار و عددِ سازنده است، نه طولِ سفر.",
      rule: MANUALE,
      conceptStep: 1,
    },
    {
      sourceId: "6987",
      textIt: "La pressione di gonfiaggio troppo bassa degli pneumatici ne provoca l'anomalo consumo ai bordi",
      answer: 1,
      chunks: [
        { it: "La pressione di gonfiaggio troppo bassa degli pneumatici", fa: "فشارِ بادِ خیلی کمِ لاستیک‌ها" },
        { it: "ne provoca l'anomalo consumo ai bordi", fa: "باعثِ سایشِ غیرعادیِ لبه‌هایشان می‌شود", verb: "provoca ← provocare" },
      ],
      translation: "فشارِ بادِ خیلی کمِ لاستیک‌ها باعثِ سایشِ غیرعادیِ لبه‌هایشان می‌شود.",
      why: "درست است (قدم ۲). لاستیکِ کم‌باد روی لبه‌ها راه می‌رود.",
      rule: MANUALE,
      conceptStep: 2,
    },
    {
      sourceId: "6988",
      textIt: "Non bisogna mai invertire la posizione degli pneumatici, per permettere loro di adattarsi meglio",
      answer: 0,
      chunks: [
        { it: "Non bisogna mai invertire la posizione degli pneumatici,", fa: "هرگز نباید جای لاستیک‌ها را عوض کرد،", focus: "always", verb: "bisogna ← bisognare" },
        { it: "per permettere loro di adattarsi meglio", fa: "تا بهتر جا بیفتند", focus: "reason" },
      ],
      translation: "هرگز نباید جای لاستیک‌ها را عوض کرد، تا بهتر جا بیفتند.",
      why: "غلط است (قدم ۲). «هرگز» دام است؛ جابه‌جا کردنِ لاستیک‌ها کمک می‌کند یکسان بسایند، و بسیاری از دفترچه‌ها توصیه‌اش می‌کنند.",
      rule: MANUALE,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6916", "6917", "6918", "6920", "6922", "6923", "6924", "6925", "6926", "6935", "6986"] },
    { step: 2, sourceIds: ["6919", "6921", "6983", "6984", "6985", "6987", "6988", "6989", "6990", "6991"] },
  ],
};

export const lessonBattistrada: Lesson = {
  id: "pneumatici-battistrada-foratura-inverno",
  titleFa: "آج، پنچری، و لاستیکِ زمستانی",
  titleIt: "BATTISTRADA · TUBELESS · PNEUMATICI INVERNALI · CATENE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس کمترین عمقِ آجِ مجاز را می‌دانی (و این‌که برای هر نوع وسیله فرق دارد)، می‌دانی لاستیک با سن هم کهنه می‌شود، لاستیکِ تیوبلس در پنچری چه رفتاری دارد، و لاستیکِ زمستانی، میخ‌دار و زنجیرِ چرخ را کِی و چطور به کار ببری.",
      why:
        "۱۵ سؤال. دام‌ها: تیوبلس و تیوب‌دار را جابه‌جا می‌کند، «میخ را فوراً بکش» را ایمن جا می‌زند، لاستیکِ میخ‌دار را روی دو چرخ مجاز می‌داند، و برای لاستیکِ زمستانی «سقفِ سرعتِ پایین‌تر» می‌سازد. سقفِ سرعتِ جاده‌ها با لاستیکِ زمستانی عوض نمی‌شود.",
      rule: `${BATT}; ${INVERNALI}`,
    },
    {
      kind: "table",
      title: "آج: کمترین عمقِ مجاز، و سنِ لاستیک",
      body:
        "آج آب را از زیرِ لاستیک بیرون می‌فرستد. هرچه کم‌عمق‌تر، روی جاده‌ی خیس زودتر روی آب سُر می‌خوری (فصلِ ۲۱، «باران و آکواپلنینگ»). قانون کمترین عمق را در شیارهای اصلیِ وسطِ آج تعیین می‌کند:",
      columns: ["کمترین عمقِ آج", "یادت باشد"],
      rows: [
        { label: "خودرو و یدک", it: "un autoveicolo · 1,6 millimetri", values: ["۱٫۶ میلی‌متر", "این کمترین حد است، نه عمقِ ایمن روی جاده‌ی خیس"] },
        { label: "موتورسیکلت", it: "un motociclo · 1,0 millimetri", values: ["۱ میلی‌متر", "—"] },
        { label: "موتور گازی", it: "ciclomotori", values: ["۰٫۵ میلی‌متر", "بانک این را نمی‌پرسد، ولی قانون جدا تعیینش کرده"] },
        { label: "سنِ لاستیک", it: "sostituire gli pneumatici dopo alcuni anni", values: ["لاستیک با گذشتِ زمان هم سفت و ترک‌دار می‌شود", "بعد از چند سال عوضش کن، حتی اگر آجش مانده؛ زمانش را سازنده‌ی لاستیک می‌گوید"] },
      ],
      takeaway: "۱٫۶ برای خودرو، ۱ برای موتورسیکلت. و لاستیکِ قدیمی، حتی با آج، کهنه است.",
      rule: BATT,
    },
    {
      kind: "table",
      title: "تیوبلس و پنچری",
      body:
        "لاستیکِ تیوبلس (بدونِ تیوب) وقتی سوراخ می‌شود، معمولاً آرام باد از دست می‌دهد، چون خودِ لاستیک دورِ سوراخ را می‌گیرد. لاستیکِ تیوب‌دار زود خالی می‌شود. پس با میخی در تیوبلس معمولاً می‌شود با احتیاط تا جای امن یا تعمیرگاه رفت:",
      columns: ["درست", "دام"],
      rows: [
        { label: "تیوبلس", it: "i pneumatici tubeless · si sgonfiano lentamente", values: ["آرام خالی می‌شود", "«تیوب‌دار آرام خالی می‌شود»: غلط"] },
        { label: "میخ در تیوبلس", it: "se in uno pneumatico tubeless si è conficcato un chiodo", values: ["آن را بیرون نکش؛ آرام تا اولین جای امن برو و تعمیرش کن", "«فوراً بکش، وگرنه می‌ترکد»: غلط؛ میخ خودش سوراخ را تا حدی می‌بندد"] },
        { label: "اگر باد زود کم شد", it: "pneumatico sgonfio", values: ["فرمان می‌کشد یا چراغِ فشار روشن شد: در جای امن بایست", "با لاستیکِ خالی رانندگی نکن؛ درسِ ۸"] },
        { label: "تعمیر", it: "riparati solo con apposite bombolette", values: ["اسپری‌های پنچرگیری یک راهِ موقت‌اند", "«فقط با اسپری»: غلط؛ تعمیرگاه لاستیک را درست تعمیر می‌کند"] },
      ],
      takeaway: "تیوبلس آرام خالی می‌شود؛ میخ را نکش؛ زود تعمیرش کن.",
      rule: TECNICA,
    },
    {
      kind: "table",
      title: "زمستان: لاستیکِ زمستانی، میخ‌دار، زنجیر",
      body:
        "در جاده‌هایی که تابلو یا دستورِ مقامات می‌خواهد، باید لاستیکِ زمستانی یا زنجیر داشته باشی (تابلویش: فصلِ ۴، «زنجیر چرخ یا لاستیک زمستانی»). این‌ها را درباره‌ی خودِ لاستیک‌ها و زنجیر بدان:",
      columns: ["قاعده", "یادت باشد"],
      rows: [
        { label: "لاستیکِ زمستانی", it: "montati su tutte le ruote", values: ["بهتر است روی هر چهار چرخ باشد", "فقط روی دو چرخ، خودرو نامتعادل می‌شود"] },
        { label: "سقفِ سرعت", it: "limiti di velocità massima inferiori", values: ["سقفِ سرعتِ جاده‌ها همان است", "ولی از سرعتی که رمزِ خودِ لاستیک اجازه می‌دهد بیشتر نرو. لاستیکِ زمستانی با رمزِ سرعتِ پایین‌تر از کارتِ خودرو فقط از ۱۵ اکتبر تا ۱۵ مه مجاز است"] },
        { label: "لاستیکِ میخ‌دار", it: "gli pneumatici chiodati", values: ["فقط در دوره‌ای از سال که مقرر شده، و روی همه‌ی چرخ‌ها", "«فقط روی دو چرخِ یک محور»: غلط"] },
        { label: "زنجیر در خودروی چهارچرخ‌محرک", it: "nei veicoli a doppia trazione (4x4)", values: ["روی کدام محور؟ دفترچه می‌گوید", "«همیشه چرخ‌های عقب»: غلط"] },
        { label: "زنجیر روی جاده‌ی بی‌برف", it: "nei tratti di strada privi di neve", values: ["لاستیک، زنجیر و سیستمِ تعلیق آسیب می‌بینند", "همین که برف تمام شد بازش کن"] },
        { label: "زنجیرِ تأییدنشده", it: "catene da neve non omologate", values: ["از زنجیرِ مطابقِ استاندارد استفاده کن", "یادداشتِ منبع: بانک (6938) می‌گوید زنجیرِ تأییدنشده مثلِ نداشتنِ زنجیر جریمه دارد. استانداردِ زنجیر را در DM 10 maggio 2011 پیدا کردیم، ولی متنی که این جریمه را بگوید نه. جوابِ بانک VERO است؛ این سؤال را برای امتیاز نمی‌آوریم."] },
      ],
      takeaway: "زمستانی روی هر چهار چرخ؛ میخ‌دار فقط در دوره‌ی مجاز و روی همه‌ی چرخ‌ها؛ زنجیر فقط روی برف. سقفِ سرعتِ جاده عوض نمی‌شود.",
      rule: `${INVERNALI}; ${CHIODATI}; DM 10 maggio 2011 (catene da neve); ${MANUALE}`,
    },
    {
      kind: "classify",
      title: "تمرین: درست است یا نه؟",
      body: `${EXERCISE} درباره‌ی هر لاستیک یا هر کار بگو درست است یا نه:`,
      options: [
        { it: "va bene", fa: "درست است" },
        { it: "non va bene", fa: "درست نیست" },
      ],
      items: [
        { prompt: "سواری با لاستیک‌هایی که شیارِ وسطشان حدودِ یک میلی‌متر عمق دارد", answer: 1, explain: "برای خودرو کمترین حد ۱٫۶ میلی‌متر است (قدمِ ۱)." },
        { prompt: "لاستیکِ زمستانی روی هر چهار چرخ", answer: 0, explain: "همین توصیه شده (قدمِ ۳)." },
        { prompt: "زنجیر بعد از تمام شدنِ برف، روی آزادراهِ خشک، روی چرخ مانده", answer: 1, explain: "روی جاده‌ی بی‌برف زنجیر و سیستمِ تعلیق آسیب می‌بینند (قدمِ ۳)." },
        { prompt: "لاستیکی با آجِ کافی، ولی خیلی قدیمی و با ترک‌های ریز روی دیواره", answer: 1, explain: "لاستیک با سن هم کهنه می‌شود؛ عوضش کن (قدمِ ۱)." },
        { prompt: "میخی در لاستیکِ تیوبلس؛ آرام تا تعمیرگاهِ نزدیک می‌روی و میخ را خودت نمی‌کشی", answer: 0, explain: "تیوبلس آرام خالی می‌شود؛ میخ را بیرون نکش (قدمِ ۲)." },
        { prompt: "لاستیکِ میخ‌دار فقط روی دو چرخِ جلو", answer: 1, explain: "میخ‌دار روی همه‌ی چرخ‌ها، و فقط در دوره‌ی مجاز (قدمِ ۳)." },
      ],
      takeaway: "حدِ قانونی، سنِ لاستیک، و «همه‌ی چرخ‌ها»: سه چیزی که بیشترِ سؤال‌ها را حل می‌کنند.",
      rule: `${BATT}; ${INVERNALI}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il battistrada", fa: "آجِ لاستیک" },
        { it: "lo spessore minimo", fa: "کمترین عمق" },
        { it: "lo pneumatico tubeless", fa: "لاستیکِ تیوبلس (بدونِ تیوب)" },
        { it: "la camera d'aria", fa: "تیوب" },
        { it: "la foratura", fa: "پنچری" },
        { it: "sgonfiarsi", fa: "باد از دست دادن", base: "sgonfiarsi" },
        { it: "il chiodo", fa: "میخ" },
        { it: "gli pneumatici invernali", fa: "لاستیکِ زمستانی" },
        { it: "gli pneumatici chiodati", fa: "لاستیکِ میخ‌دار" },
        { it: "le catene da neve", fa: "زنجیرِ چرخ" },
        { it: "la doppia trazione (4x4)", fa: "چهارچرخ‌محرک" },
      ],
    },
    {
      kind: "trap",
      title: "«si sgonfiano lentamente»: کدام لاستیک؟",
      body: "هر دو جمله یک چیز می‌گویند، درباره‌ی دو نوع لاستیکِ متفاوت:",
      examples: [
        {
          sourceId: "6931",
          textIt: "Gli pneumatici \"tubeless\", in caso di foratura, si sgonfiano lentamente",
          answer: 1,
          chunks: [
            { it: "Gli pneumatici \"tubeless\",", fa: "لاستیک‌های تیوبلس،" },
            { it: "in caso di foratura,", fa: "در پنچری،", focus: "condition" },
            { it: "si sgonfiano lentamente", fa: "آرام باد از دست می‌دهند", verb: "si sgonfiano ← sgonfiarsi" },
          ],
          translation: "لاستیک‌های تیوبلس در پنچری آرام باد از دست می‌دهند.",
          why: "درست است. خودِ لاستیک دورِ سوراخ را می‌گیرد.",
        },
        {
          sourceId: "6933",
          textIt: "Gli pneumatici con camera d'aria, in caso di foratura, si sgonfiano lentamente",
          answer: 0,
          chunks: [
            { it: "Gli pneumatici con camera d'aria,", fa: "لاستیک‌های تیوب‌دار،", focus: "contrast" },
            { it: "in caso di foratura,", fa: "در پنچری،", focus: "condition" },
            { it: "si sgonfiano lentamente", fa: "آرام باد از دست می‌دهند", verb: "si sgonfiano ← sgonfiarsi" },
          ],
          translation: "لاستیک‌های تیوب‌دار در پنچری آرام باد از دست می‌دهند.",
          why: "غلط است. تیوبِ سوراخ‌شده زود خالی می‌شود.",
        },
      ],
      takeaway: "«tubeless» = آرام. «con camera d'aria» = زود.",
      rule: TECNICA,
    },
  ],
  practice: [
    {
      sourceId: "6927",
      textIt: "Lo spessore minimo del battistrada degli pneumatici di un autoveicolo deve essere di 1,6 millimetri",
      answer: 1,
      chunks: [
        { it: "Lo spessore minimo del battistrada", fa: "کمترین عمقِ آجِ" },
        { it: "degli pneumatici di un autoveicolo", fa: "لاستیک‌های یک خودرو" },
        { it: "deve essere di 1,6 millimetri", fa: "باید ۱٫۶ میلی‌متر باشد", verb: "deve ← dovere", focus: "limit" },
      ],
      translation: "کمترین عمقِ آجِ لاستیک‌های یک خودرو باید ۱٫۶ میلی‌متر باشد.",
      why: "درست است (قدم ۱). این حدِ قانونی است؛ برای جاده‌ی خیس، آجِ بیشتر بهتر است.",
      rule: BATT,
      conceptStep: 1,
    },
    {
      sourceId: "6934",
      textIt: "Se in uno pneumatico del tipo \"tubeless\" si è conficcato un chiodo, bisogna estrarlo subito, per evitare che il pneumatico possa esplodere",
      answer: 0,
      chunks: [
        { it: "Se in uno pneumatico del tipo \"tubeless\" si è conficcato un chiodo,", fa: "اگر میخی در یک لاستیکِ تیوبلس فرو رفته باشد،", focus: "condition", verb: "si è conficcato ← conficcarsi" },
        { it: "bisogna estrarlo subito,", fa: "باید فوراً بیرونش کشید،", verb: "bisogna ← bisognare", focus: "contrast" },
        { it: "per evitare che il pneumatico possa esplodere", fa: "تا لاستیک نترکد", focus: "reason" },
      ],
      translation: "اگر میخی در یک لاستیکِ تیوبلس فرو رفته باشد، باید فوراً بیرونش کشید تا لاستیک نترکد.",
      why: "غلط است (قدم ۲). میخ سوراخ را تا حدی بسته نگه می‌دارد؛ بیرون کشیدنش باد را زودتر خالی می‌کند.",
      rule: TECNICA,
      conceptStep: 2,
    },
    {
      sourceId: "6937",
      textIt: "E' consigliabile che gli pneumatici invernali vengano montati su tutte le ruote",
      answer: 1,
      chunks: [
        { it: "E' consigliabile", fa: "توصیه می‌شود" },
        { it: "che gli pneumatici invernali vengano montati", fa: "لاستیک‌های زمستانی بسته شوند", verb: "vengano montati ← montare" },
        { it: "su tutte le ruote", fa: "روی همه‌ی چرخ‌ها", focus: "always" },
      ],
      translation: "توصیه می‌شود لاستیک‌های زمستانی روی همه‌ی چرخ‌ها بسته شوند.",
      why: "درست است (قدم ۳). با زمستانی فقط روی دو چرخ، چسبندگیِ جلو و عقب فرق می‌کند و خودرو نامتعادل می‌شود.",
      rule: MANUALE,
      conceptStep: 3,
    },
    {
      sourceId: "6942",
      textIt: "I veicoli muniti di pneumatici invernali devono rispettare limiti di velocità massima inferiori a quelli ordinari",
      answer: 0,
      chunks: [
        { it: "I veicoli muniti di pneumatici invernali", fa: "وسیله‌هایی که لاستیکِ زمستانی دارند" },
        { it: "devono rispettare limiti di velocità massima", fa: "باید سقف‌های سرعتی را رعایت کنند", verb: "devono ← dovere" },
        { it: "inferiori a quelli ordinari", fa: "پایین‌تر از سقف‌های معمولی", focus: "contrast" },
      ],
      translation: "وسیله‌هایی که لاستیکِ زمستانی دارند، باید سقف‌های سرعتی پایین‌تر از سقف‌های معمولی را رعایت کنند.",
      why: "غلط است (قدم ۳). سقفِ سرعتِ جاده‌ها عوض نمی‌شود؛ فقط از سرعتی که رمزِ خودِ لاستیک اجازه می‌دهد بیشتر نرو.",
      rule: INVERNALI,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6927", "6928", "6929"] },
    { step: 2, sourceIds: ["6930", "6931", "6932", "6933", "6934"] },
    { step: 3, sourceIds: ["6936", "6937", "6938", "6939", "6940", "6941", "6942"] },
  ],
};

export const lessonRuotaIncendio: Lesson = {
  id: "foratura-ruota-incendio",
  titleFa: "پنچری کنارِ جاده، عوض کردنِ چرخ، و آتش‌سوزیِ خودرو",
  titleIt: "SOSTITUZIONE DELLA RUOTA · RUOTINO · INCENDIO DEL VEICOLO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی پیش از دست زدن به چرخِ پنچر چه چیزی را امن کنی (جا، سرنشین‌ها، خودرو)، عوض کردنِ چرخ به چه ترتیبی است، زاپاسِ کوچک چه محدودیتی دارد، و اگر خودرو آتش گرفت اول چه کنی. هر جا خودروی دنده‌اتومات یا برقی فرق دارد، جدا گفته می‌شود.",
      why:
        "۱۷ سؤال. دام‌ها ترتیب را به هم می‌زنند («پیچ‌ها را پیش از بالا بردن کامل باز کن»)، جای جک را آزاد می‌گذارند («هر جای شاسی»، «تا جای ممکن دور از چرخ»)، زاپاسِ کوچک را مثلِ چرخِ معمولی جا می‌زنند، و در آتش‌سوزی کاری خطرناک را چاره می‌دانند («باک را خالی کن»، «مخزنِ گاز را باز کن»). این درس دفترچه‌ی تعمیر نیست؛ روشِ دقیق را دفترچه‌ی خودرو می‌گوید.",
      rule: MANUALE,
    },
    {
      kind: "table",
      title: "پیش از دست زدن به چرخ: اول ایمنی",
      body:
        "پنچری خودش معمولاً خطرناک نیست؛ ایستادن کنارِ جاده خطرناک است. اول جای امن، بعد آدم‌ها، بعد خودرو. چراغِ خطر، جلیقه و مثلث را فصلِ ۱۷ درس داده («مثلثِ خطر و جلیقه‌ی شب‌نما»)؛ در آزادراه: «توقف در آزادراه: کِی، کجا، چقدر». اگر جای امنی نیست، چرخ را عوض نکن و کمک بخواه:",
      columns: ["چه کنی", "چرا"],
      rows: [
        { label: "جای مسطح و سفت", it: "un terreno orizzontale e stabile", values: ["بیرون از سواره‌رو، روی زمینِ صاف و محکم", "جک روی شیب یا خاکِ نرم می‌لغزد"] },
        { label: "سرنشین‌ها", it: "far scendere dal veicolo tutti i passeggeri", values: ["همه پیاده، بیرون از سواره‌رو، دور از ترافیک", "کسی نباید در خودروی بالارفته بماند"] },
        { label: "دنده‌ی معمولی", it: "il freno di stazionamento · la prima marcia o la retromarcia", values: ["ترمزِ دستی، و دنده‌ی یک یا دنده‌عقب", "خودرو نباید غلت بخورد"] },
        { label: "دنده‌اتومات", it: "cambio automatico · posizione P", values: ["ترمزِ دستی، و دسته‌ی دنده روی P", `بعضی دفترچه‌ها می‌گویند زیرِ چرخِ روبه‌رو مانع بگذار؛ ${MODEL_NOTE}`] },
      ],
      takeaway: "جای امن، همه بیرون، ترمزِ دستی و دنده (یا P). بعد چرخ.",
      rule: `${MANUALE}; ${CDS("162")} (segnale mobile di pericolo)`,
    },
    {
      kind: "table",
      title: "عوض کردنِ چرخ، به ترتیب؛ و زاپاسِ کوچک",
      body:
        "ترتیب مهم است: چرخِ روی زمین نمی‌چرخد، پس پیچ‌ها را آن موقع کمی شل می‌کنی؛ و فقط وقتی خودرو دوباره روی زمین است می‌توانی محکم ببندیشان:",
      columns: ["چه کنی", "دام"],
      rows: [
        { label: "پیش از بالا بردن", it: "allentare leggermente i bulloni", values: ["پیچ‌ها را فقط کمی شل کن", "«پیچ‌ها را پیش از بالا بردن کامل باز کن»: غلط"] },
        { label: "جای جک", it: "il martinetto (cric)", values: ["فقط نقطه‌هایی که دفترچه نشان می‌دهد، نزدیکِ همان چرخ", "«هر جای شاسی» یا «تا جای ممکن دور از چرخ»: غلط"] },
        { label: "وقتی خودرو بالاست", it: "evitare di mettersi sotto il veicolo", values: ["هرگز زیرِ خودرو نرو و دست و پا را زیرش نگذار", "جک برای نگه داشتنِ کسی زیرِ خودرو ساخته نشده"] },
        { label: "بستنِ پیچ‌ها", it: "stringere leggermente · completarne il bloccaggio dopo averlo abbassato", values: ["بالا: کمی سفت؛ بعد از پایین آوردن: کامل", "روشِ دقیق را دفترچه می‌گوید؛ بعد از چند کیلومتر دوباره بسنج"] },
        { label: "زاپاسِ کوچک (ruotino)", it: "il ruotino", values: ["موقت است: آرام و فقط تا تعمیرگاه", "سرعتِ مجازش روی خودش نوشته شده (مثلاً در دفترچه‌های فیات و کیا ۸۰ کیلومتر بر ساعت)؛ نه ۱۲۰"] },
        { label: "سرنشین با زاپاسِ کوچک", it: "non è consentito trasportare passeggeri", values: ["ممنوع نیست", "حدِ بارِ خودرو و زاپاس را رعایت کن"] },
      ],
      takeaway: "شل پیش از بالا بردن، سفت بعد از پایین آوردن. جک فقط در جای خودش. هرگز زیرِ خودرو.",
      rule: `${MANUALE}; ${RUOTINO}`,
    },
    {
      kind: "table",
      title: "اگر خودرو آتش گرفت",
      body:
        "جانِ آدم‌ها از خودرو مهم‌تر است. اول همه را دور کن و به ۱۱۲ (یا آتش‌نشانی، ۱۱۵) زنگ بزن. فقط اگر آتش تازه شروع شده و بی‌خطر می‌توانی، سعی کن خاموشش کنی؛ اگر بزرگ شد، دور شو:",
      columns: ["درست", "دام"],
      rows: [
        { label: "سوئیچ", it: "spegnere il quadro elettrico girando la chiave", values: ["برقِ خودرو را خاموش کن (سوئیچ را ببند؛ در خودروی دکمه‌دار، دکمه را بزن)", "—"] },
        { label: "آتشِ تازه، بی کپسول", it: "sabbia o terra · una coperta bagnata", values: ["خاک یا ماسه پایِ شعله، یا پتوی خیس", "فقط اگر کوچک است و راهِ فرار داری"] },
        { label: "باک و مخزنِ گاز", it: "svuotarne il serbatoio · smontare il serbatoio", values: ["دست نزن", "«باک را خالی کن» یا «مخزنِ گاز را باز کن»: غلط و خطرناک"] },
        { label: "کلیدِ اینرسی", it: "interruttore inerziale", values: ["در تصادف خودبه‌خود جریانِ سوخت به موتور را قطع می‌کند", "خطرِ آتش را کمتر می‌کند، نه بیشتر"] },
        { label: "خودروی برقی یا هیبریدی", it: "veicolo elettrico o ibrido", values: ["آتشِ باتری را خودت خاموش نکن", "همه را دور کن، به ۱۱۲ بگو خودرو برقی است؛ آتشِ باتری ممکن است دوباره شعله بگیرد"] },
      ],
      takeaway: "آدم‌ها دور، ۱۱۲، سوئیچ خاموش. آتشِ کوچک: خاک یا پتوی خیس. باک و مخزن: هرگز. برقی: فقط دور شو.",
      rule: `${TECNICA}; ${EV_FUOCO}`,
    },
    {
      kind: "classify",
      title: "تمرین: این کار کِی انجام می‌شود؟",
      body: `${EXERCISE} ترتیبِ کلی است، نه دستورِ کاملِ تعمیر؛ روشِ خودروی خودت را دفترچه‌اش می‌گوید. هر کار را در جای درستش بگذار:`,
      options: [
        { it: "prima di sollevare", fa: "پیش از بالا بردنِ خودرو" },
        { it: "a veicolo sollevato", fa: "وقتی خودرو بالاست" },
        { it: "dopo averlo abbassato", fa: "بعد از پایین آوردنِ خودرو" },
      ],
      items: [
        { prompt: "همه‌ی سرنشین‌ها پیاده می‌شوند و از سواره‌رو دور می‌شوند", answer: 0, explain: "اول آدم‌ها (قدمِ ۱)." },
        { prompt: "ترمزِ دستی و دنده‌ی یک (یا P در دنده‌اتومات)", answer: 0, explain: "خودرو نباید غلت بخورد (قدمِ ۱)." },
        { prompt: "پیچ‌های چرخ را کمی شل می‌کنی", answer: 0, explain: "چرخِ روی زمین نمی‌چرخد (قدمِ ۲)." },
        { prompt: "پیچ‌ها را کامل باز می‌کنی و چرخِ پنچر را درمی‌آوری", answer: 1, explain: "حالا که چرخ از زمین جدا شده (قدمِ ۲)." },
        { prompt: "زاپاس را می‌گذاری و پیچ‌ها را کمی سفت می‌کنی", answer: 1, explain: "کمی؛ سفت کردنِ کامل بعداً (قدمِ ۲)." },
        { prompt: "پیچ‌ها را کامل سفت می‌کنی", answer: 2, explain: "وقتی چرخ روی زمین است و نمی‌چرخد (قدمِ ۲)." },
      ],
      takeaway: "آدم‌ها و خودرو را امن کن، شل کن، بالا ببر، عوض کن، پایین بیاور، سفت کن.",
      rule: MANUALE,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la sostituzione della ruota", fa: "عوض کردنِ چرخ" },
        { it: "il martinetto (cric)", fa: "جک" },
        { it: "i bulloni di fissaggio", fa: "پیچ‌های چرخ" },
        { it: "allentare · stringere", fa: "شل کردن · سفت کردن", base: "allentare · stringere" },
        { it: "sollevare · abbassare il veicolo", fa: "بالا بردن · پایین آوردنِ خودرو", base: "sollevare · abbassare" },
        { it: "il ruotino", fa: "زاپاسِ کوچک (موقت)" },
        { it: "il principio d'incendio", fa: "آتشِ تازه‌شروع‌شده" },
        { it: "l'estintore", fa: "کپسولِ آتش‌نشانی" },
        { it: "il quadro (elettrico)", fa: "سوئیچ (برقِ خودرو)" },
        { it: "l'interruttore inerziale", fa: "کلیدِ اینرسی (قطعِ خودکارِ سوخت)" },
      ],
    },
    {
      kind: "trap",
      title: "«il martinetto (cric)»: کجا، و کجا نه؟",
      body: "هر دو جمله درباره‌ی جک‌اند. یکی یک قاعده‌ی ایمنی می‌گوید، دیگری جای غلطی برای جک:",
      examples: [
        {
          sourceId: "6946",
          textIt: "Durante le operazioni di sostituzione di una ruota tramite il martinetto (cric), bisogna evitare di mettersi sotto il veicolo",
          answer: 1,
          chunks: [
            { it: "Durante le operazioni di sostituzione di una ruota", fa: "هنگامِ عوض کردنِ چرخ" },
            { it: "tramite il martinetto (cric),", fa: "با جک،" },
            { it: "bisogna evitare di mettersi sotto il veicolo", fa: "نباید زیرِ خودرو رفت", verb: "bisogna ← bisognare", focus: "negation" },
          ],
          translation: "هنگامِ عوض کردنِ چرخ با جک، نباید زیرِ خودرو رفت.",
          why: "درست است. جک برای بالا نگه داشتنِ خودرو هنگامِ عوض کردنِ چرخ است، نه برای کسی که زیرش است.",
        },
        {
          sourceId: "6951",
          textIt: "Per smontare una ruota bisogna fissare il martinetto (cric) il più lontano possibile dalla ruota da sostituire",
          answer: 0,
          chunks: [
            { it: "Per smontare una ruota", fa: "برای درآوردنِ چرخ", focus: "reason" },
            { it: "bisogna fissare il martinetto (cric)", fa: "باید جک را گذاشت", verb: "bisogna ← bisognare" },
            { it: "il più lontano possibile dalla ruota da sostituire", fa: "تا جای ممکن دور از چرخی که عوض می‌شود", focus: "contrast" },
          ],
          translation: "برای درآوردنِ چرخ، باید جک را تا جای ممکن دور از چرخی که عوض می‌شود گذاشت.",
          why: "غلط است. جک در نقطه‌ای که دفترچه نشان می‌دهد، نزدیکِ همان چرخ، گذاشته می‌شود.",
        },
      ],
      takeaway: "جک: فقط نقطه‌ی مشخص‌شده، نزدیکِ همان چرخ. و هیچ‌کس زیرِ خودرو.",
      rule: MANUALE,
    },
  ],
  practice: [
    {
      sourceId: "6944",
      textIt: "Prima di procedere alla sostituzione di una ruota, bisogna azionare il freno di stazionamento e inserire la prima marcia o la retromarcia",
      answer: 1,
      chunks: [
        { it: "Prima di procedere alla sostituzione di una ruota,", fa: "پیش از عوض کردنِ چرخ،", focus: "condition" },
        { it: "bisogna azionare il freno di stazionamento", fa: "باید ترمزِ دستی را کشید", verb: "bisogna ← bisognare" },
        { it: "e inserire la prima marcia o la retromarcia", fa: "و دنده‌ی یک یا دنده‌عقب گذاشت" },
      ],
      translation: "پیش از عوض کردنِ چرخ، باید ترمزِ دستی را کشید و دنده‌ی یک یا دنده‌عقب گذاشت.",
      why: "درست است (قدم ۱). در دنده‌اتومات به‌جای دنده، دسته را روی P بگذار.",
      rule: MANUALE,
      conceptStep: 1,
    },
    {
      sourceId: "6949",
      textIt: "Per smontare una ruota da sostituire bisogna togliere i bulloni, prima di sollevare il veicolo con il martinetto (cric)",
      answer: 0,
      chunks: [
        { it: "Per smontare una ruota da sostituire", fa: "برای درآوردنِ چرخی که باید عوض شود", focus: "reason" },
        { it: "bisogna togliere i bulloni,", fa: "باید پیچ‌ها را باز کرد،", verb: "bisogna ← bisognare", focus: "contrast" },
        { it: "prima di sollevare il veicolo con il martinetto (cric)", fa: "پیش از بالا بردنِ خودرو با جک", focus: "condition" },
      ],
      translation: "برای درآوردنِ چرخی که باید عوض شود، باید پیچ‌ها را پیش از بالا بردنِ خودرو با جک باز کرد.",
      why: "غلط است (قدم ۲). پیش از بالا بردن فقط کمی شل کن؛ باز کردنِ کامل وقتی خودرو بالاست.",
      rule: MANUALE,
      conceptStep: 2,
    },
    {
      sourceId: "6952",
      textIt: "L'applicazione del \"ruotino\" (ruota di scorta di ridotte dimensioni), consente di raggiungere la velocità di 120 km/h",
      answer: 0,
      chunks: [
        { it: "L'applicazione del \"ruotino\"", fa: "بستنِ زاپاسِ کوچک" },
        { it: "(ruota di scorta di ridotte dimensioni),", fa: "(زاپاسی با اندازه‌ی کوچک‌تر)،" },
        { it: "consente di raggiungere la velocità di 120 km/h", fa: "اجازه می‌دهد تا سرعتِ ۱۲۰ کیلومتر بر ساعت بروی", verb: "consente ← consentire", focus: "contrast" },
      ],
      translation: "بستنِ زاپاسِ کوچک (زاپاسی با اندازه‌ی کوچک‌تر) اجازه می‌دهد تا سرعتِ ۱۲۰ کیلومتر بر ساعت بروی.",
      why: "غلط است (قدم ۲). زاپاسِ کوچک موقت است؛ سرعتِ مجازش روی خودش و در دفترچه آمده و خیلی کمتر است.",
      rule: RUOTINO,
      conceptStep: 2,
    },
    {
      sourceId: "6966",
      textIt: "Dopo un incidente, se c'è un principio d'incendio del veicolo occorre svuotarne immediatamente il serbatoio del carburante",
      answer: 0,
      chunks: [
        { it: "Dopo un incidente,", fa: "بعد از تصادف،" },
        { it: "se c'è un principio d'incendio del veicolo", fa: "اگر آتش در خودرو تازه شروع شده باشد", focus: "condition" },
        { it: "occorre svuotarne immediatamente il serbatoio del carburante", fa: "باید فوراً باکِ سوختش را خالی کرد", verb: "occorre ← occorrere", focus: "contrast" },
      ],
      translation: "بعد از تصادف، اگر آتش در خودرو تازه شروع شده باشد، باید فوراً باکِ سوختش را خالی کرد.",
      why: "غلط است (قدم ۳). دست زدن به سوخت کنارِ آتش خطرناک است. آدم‌ها را دور کن، ۱۱۲ را بگیر، سوئیچ را خاموش کن.",
      rule: TECNICA,
      conceptStep: 3,
    },
    {
      sourceId: "6963",
      textIt: "Dopo un incidente, se c'è un rischio d'incendio del veicolo è opportuno spegnere il quadro elettrico girando la chiave di accensione",
      answer: 1,
      chunks: [
        { it: "Dopo un incidente,", fa: "بعد از تصادف،" },
        { it: "se c'è un rischio d'incendio del veicolo", fa: "اگر خطرِ آتش گرفتنِ خودرو هست", focus: "condition" },
        { it: "è opportuno spegnere il quadro elettrico", fa: "بهتر است برقِ خودرو را خاموش کرد" },
        { it: "girando la chiave di accensione", fa: "با چرخاندنِ سوئیچ", verb: "girando ← girare" },
      ],
      translation: "بعد از تصادف، اگر خطرِ آتش گرفتنِ خودرو هست، بهتر است برقِ خودرو را با چرخاندنِ سوئیچ خاموش کرد.",
      why: "درست است (قدم ۳). در خودرویی که دکمه‌ی روشن و خاموش دارد، همان دکمه.",
      rule: TECNICA,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6943", "6944", "6948"] },
    { step: 2, sourceIds: ["6945", "6946", "6947", "6949", "6950", "6951", "6952", "6953"] },
    { step: 3, sourceIds: ["6963", "6964", "6965", "6966", "6967", "6968"] },
  ],
};
