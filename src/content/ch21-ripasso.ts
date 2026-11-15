/**
 * src/content/ch21-ripasso.ts
 * Chapter 21 (Incidenti stradali e comportamenti): the chapter review. Sixteen
 * real bank questions, two per lesson in lesson order, none shown inside a
 * lesson; a mistake routes back to the lesson section that teaches it
 * (tests/chapter21.test.ts).
 */
import type { Lesson } from "./lessons.js";

const CDS = (n: string) => `Codice della Strada, art. ${n}`;
const POLIZIA = "Polizia di Stato, «Viaggiare in sicurezza: i consigli della Polizia» (24/01/2023)";
const CAUSA = "Causa probabile di incidenti dovuti alla struttura della strada";
const CAUSA_FA = "علتِ احتمالیِ تصادف‌های ناشی از ساختارِ جاده";
const NEVE = "Su strade coperte di neve";
const NEVE_FA = "روی جاده‌های پوشیده از برف";
const GHIACCIO = "In presenza di tratti di strada ghiacciati";
const GHIACCIO_FA = "وقتی بخش‌هایی از جاده یخ زده است";
const NEBBIA = "In caso di nebbia fitta";
const NEBBIA_FA = "در مهِ غلیظ";

export const reviewIncidenti: Lesson = {
  id: "ripasso-capitolo-21",
  titleFa: "مرور فصل ۲۱",
  titleIt: "RIPASSO · INCIDENTI STRADALI E COMPORTAMENTI",
  minutes: 8,
  signs: [335],
  review: true,
  steps: [
    {
      kind: "intro",
      title: "مرور فصل",
      objective:
        "شانزده سؤالِ واقعی از بانک، دو تا از هر درس. هیچ‌کدام را در درس‌ها ندیده‌ای، پس این مرور نشان می‌دهد چه چیزی واقعاً در ذهنت مانده است.",
      why: "بیشترِ جمله‌های این فصل یک حرکت دارند: کارِ درست را برعکس می‌کنند (تند به جای نرم، نزدیک به جای دور، کامل به جای تدریجی) یا شرطی اضافه می‌کنند که قانون ندارد. سؤالی که این‌جا اشتباه کنی به فهرستِ مرورت اضافه می‌شود و به بخشِ درسِ مربوطش وصل است.",
    },
    {
      kind: "table",
      title: "فصل ۲۱ در هشت خط",
      body: "قبل از سؤال‌ها، نکته‌ی اصلیِ هر درس را یک بار دیگر ببین. اگر جایی برایت تازه بود، اول همان درس را دوباره باز کن.",
      columns: ["نکته‌ی اصلی"],
      rows: [
        { label: "درس ۱", it: "cause · strada · veicolo", values: ["علت: غافلگیری یا چسبندگیِ کم (باریکی، بی‌علامتی، سطحِ بد). جدا کردن، راهنمایی، محافظت علت نیست. خودرو: سالم و بی‌دست‌کاری"] },
        { label: "درس ۲", it: "tamponamenti · portiere", values: ["تصادف از پشت: سرعت، فاصله، بی‌توجهی. در: فقط ایستاده، طرفِ پیاده‌رو، بعد از نگاه؛ هیچ دری بی‌خطر نیست"] },
        { label: "درس ۳", it: "pioggia · aquaplaning", values: ["باران: آهسته، دور، نرم، شیشه روشن؛ چراغِ خطر نه. آکواپلنینگ: سرعت، آجِ فرسوده، آب، خودروی سبک؛ چسبندگی از بین می‌رود"] },
        { label: "درس ۴", it: "neve · infossamento", values: ["زمستانی روی همه یا زنجیر روی چرخ‌های محرک؛ آهسته، دور، نرم. گیر کردی: چیزی زیرِ چرخ، دنده‌ی بالاتر"] },
        { label: "درس ۵", it: "ghiaccio · aderenza", values: ["یخ از برف هم لغزنده‌تر؛ دنده‌ی سنگین در سرازیری، دقت در سایه، دور از روبه‌رویی؛ ترمز تدریجی، نه دنده خلاص"] },
        { label: "درس ۶", it: "nebbia fitta", values: ["سرعت به اندازه‌ی دید، خط‌کشی را دنبال کن، چراغِ درست، کمربند بسته؛ ایستادن بیرون از سواره‌رو، وگرنه چراغِ خطر"] },
        { label: "درس ۷", it: "obblighi dopo l'incidente", values: ["بایست، امن کن، کمک برسان یا خبر کن، مشخصات بده؛ با زخمی صحنه را دست نزن؛ مثلث فقط بیرونِ آبادی، روی جاده"] },
        { label: "درس ۸", it: "gallerie · incendio", values: ["صف: فاصله‌ی بیشتر. آتش: خودرو را رها کن، دور نزن، به خروجی برو؛ دستورِ کارکنان بر تابلو مقدم. سبز = راهِ فرار"] },
      ],
      takeaway: "در هر جمله بپرس: این کار فاصله و زمان می‌دهد، یا خطر را بیشتر می‌کند؟ و این «اجبار» واقعاً در قانون هست؟",
    },
  ],
  practice: [
    {
      sourceId: "6367",
      textIt: "Causa probabile di incidenti dovuti alla struttura della strada può essere strada suddivisa in corsie",
      answer: 0,
      chunks: [
        { it: CAUSA, fa: CAUSA_FA },
        { it: "può essere", fa: "می‌تواند باشد", verb: "può ← potere" },
        { it: "strada suddivisa in corsie", fa: "جاده‌ای که به خطوطِ عبور تقسیم شده", focus: "contrast" },
      ],
      translation: "علتِ احتمالیِ تصادف‌های ناشی از ساختارِ جاده می‌تواند جاده‌ای باشد که به خطوطِ عبور تقسیم شده.",
      why: "غلط است (درس ۱). خطوطِ عبور ترافیک را منظم می‌کنند؛ مثلِ سواره‌روهای جدا، علتِ تصادف نیستند.",
      rule: CDS("14"),
      conceptStep: 1,
    },
    {
      sourceId: "6441",
      textIt: "È consentito aumentare le prestazioni del proprio veicolo modificandone le impostazioni elettroniche della centralina che controlla l’iniezione di carburante",
      answer: 0,
      chunks: [
        { it: "È consentito", fa: "مجاز است", verb: "è ← essere", focus: "contrast" },
        { it: "aumentare le prestazioni del proprio veicolo", fa: "عملکردِ خودروی خود را بالا بردن" },
        { it: "modificandone le impostazioni elettroniche della centralina", fa: "با تغییرِ تنظیماتِ الکترونیکیِ واحدِ کنترل", verb: "modificandone ← modificare" },
        { it: "che controlla l’iniezione di carburante", fa: "که پاشِ سوخت را کنترل می‌کند" },
      ],
      translation: "مجاز است عملکردِ خودروی خود را با تغییرِ تنظیماتِ الکترونیکیِ واحدِ کنترلی که پاشِ سوخت را کنترل می‌کند بالا برد.",
      why: "غلط است (درس ۱). تغییرِ ویژگی‌های ساختیِ تأییدشده بدونِ بازدید و آزمایش مجاز نیست.",
      rule: `${CDS("78")} c.1, c.3`,
      conceptStep: 2,
    },
    {
      sourceId: "6454",
      textIt: "I tamponamenti stradali avvengono principalmente tra autoveicoli dotati di servosterzo",
      answer: 0,
      chunks: [
        { it: "I tamponamenti stradali", fa: "تصادف‌های از پشت" },
        { it: "avvengono principalmente", fa: "بیشتر رخ می‌دهند", verb: "avvengono ← avvenire", focus: "reason" },
        { it: "tra autoveicoli dotati di servosterzo", fa: "بینِ خودروهایی که فرمانِ کمکی دارند", focus: "contrast" },
      ],
      translation: "تصادف‌های از پشت بیشتر بینِ خودروهایی رخ می‌دهند که فرمانِ کمکی دارند.",
      why: "غلط است (درس ۲). فرمانِ کمکی ربطی به تصادف از پشت ندارد؛ علت‌های اصلی سرعت، فاصله و بی‌توجهی‌اند.",
      rule: CDS("149"),
      conceptStep: 1,
    },
    {
      sourceId: "6444",
      textIt: "Quando si deve far salire o scendere un passeggero dal veicolo, bisogna farlo attendere fino a che il veicolo sia completamente fermo",
      answer: 1,
      chunks: [
        { it: "Quando si deve far salire o scendere un passeggero dal veicolo,", fa: "وقتی باید مسافری را سوار یا پیاده کنی،", verb: "deve ← dovere" },
        { it: "bisogna farlo attendere", fa: "باید او را منتظر نگه داشت", verb: "bisogna ← bisognare" },
        { it: "fino a che il veicolo sia completamente fermo", fa: "تا خودرو کاملاً بایستد", focus: "condition" },
      ],
      translation: "وقتی باید مسافری را سوار یا پیاده کنی، باید او را منتظر نگه داشت تا خودرو کاملاً بایستد.",
      why: "درست است (درس ۲). سوار و پیاده شدن فقط با خودروی کاملاً ایستاده.",
      rule: `${CDS("157")} c.7`,
      conceptStep: 2,
    },
    {
      sourceId: "6380",
      textIt: "In caso di pioggia occorre frenare energicamente",
      answer: 0,
      chunks: [
        { it: "In caso di pioggia", fa: "در باران" },
        { it: "occorre frenare energicamente", fa: "باید محکم ترمز کرد", verb: "occorre ← occorrere", focus: "contrast" },
      ],
      translation: "در باران باید محکم ترمز کرد.",
      why: "غلط است (درس ۳). روی جاده‌ی خیس ترمزِ تند خودرو را لیز می‌دهد؛ در باران نرم ترمز کن.",
      rule: POLIZIA,
      conceptStep: 1,
    },
    {
      sourceId: "6383",
      textIt: "Il fenomeno dell'aquaplaning fa scivolare le ruote sullo strato di acqua",
      answer: 1,
      chunks: [
        { it: "Il fenomeno dell'aquaplaning", fa: "پدیده‌ی آکواپلنینگ" },
        { it: "fa scivolare le ruote", fa: "چرخ‌ها را سُر می‌دهد", verb: "fa scivolare ← fare scivolare" },
        { it: "sullo strato di acqua", fa: "روی لایه‌ی آب" },
      ],
      translation: "پدیده‌ی آکواپلنینگ چرخ‌ها را روی لایه‌ی آب سُر می‌دهد.",
      why: "درست است (درس ۳). گوه‌ی آب لاستیک را از آسفالت جدا می‌کند و چرخ روی آب می‌لغزد.",
      rule: POLIZIA,
      conceptStep: 2,
    },
    {
      sourceId: "6398",
      textIt: "Su strade coperte di neve occorre alla partenza, accelerare al massimo",
      answer: 0,
      chunks: [
        { it: NEVE, fa: NEVE_FA },
        { it: "occorre alla partenza,", fa: "باید موقعِ راه افتادن", verb: "occorre ← occorrere" },
        { it: "accelerare al massimo", fa: "گاز را تا ته داد", verb: "accelerare ← accelerare", focus: "contrast" },
      ],
      translation: "روی جاده‌های پوشیده از برف باید موقعِ راه افتادن گاز را تا ته داد.",
      why: "غلط است (درس ۴). گازِ کامل چرخ را درجا می‌چرخاند؛ روی برف نرم راه بیفت.",
      rule: POLIZIA,
      conceptStep: 1,
    },
    {
      sourceId: "6396",
      textIt: "Su strade coperte di neve occorre evitare brusche accelerazioni",
      answer: 1,
      chunks: [
        { it: NEVE, fa: NEVE_FA },
        { it: "occorre evitare brusche accelerazioni", fa: "باید از گازِ تند پرهیز کرد", verb: "occorre ← occorrere", focus: "negation" },
      ],
      translation: "روی جاده‌های پوشیده از برف باید از گازِ تند پرهیز کرد.",
      why: "درست است (درس ۴). گازِ تند چرخ را روی برف درجا می‌چرخاند.",
      rule: POLIZIA,
      conceptStep: 1,
    },
    {
      sourceId: "6404",
      textIt: "In presenza di tratti di strada ghiacciati è opportuno, in discesa, procedere con marce basse",
      answer: 1,
      chunks: [
        { it: GHIACCIO, fa: GHIACCIO_FA },
        { it: "è opportuno, in discesa,", fa: "بهتر است در سرازیری", verb: "è ← essere", focus: "condition" },
        { it: "procedere con marce basse", fa: "با دنده‌های سنگین جلو بروی" },
      ],
      translation: "وقتی بخش‌هایی از جاده یخ زده است، بهتر است در سرازیری با دنده‌های سنگین جلو بروی.",
      why: "درست است (درس ۵). دنده‌ی سنگین سرعت را نگه می‌دارد و کمتر به ترمز نیاز داری.",
      rule: POLIZIA,
      conceptStep: 1,
    },
    {
      sourceId: "6408",
      textIt: "In presenza di tratti di strada ghiacciati è opportuno marciare molto vicino alla barriera laterale",
      answer: 0,
      chunks: [
        { it: GHIACCIO, fa: GHIACCIO_FA },
        { it: "è opportuno marciare molto vicino alla barriera laterale", fa: "بهتر است خیلی نزدیکِ گاردریل برانی", verb: "è ← essere", focus: "contrast" },
      ],
      translation: "وقتی بخش‌هایی از جاده یخ زده است، بهتر است خیلی نزدیکِ گاردریل برانی.",
      why: "غلط است (درس ۵). اگر خودرو لیز بخورد، جایی نمی‌ماند؛ دور از روبه‌رویی، ولی نه چسبیده به کنار.",
      rule: CDS("141"),
      conceptStep: 1,
    },
    {
      sourceId: "6425",
      textIt: "In caso di nebbia fitta è opportuno tenere la cintura di sicurezza sganciata per essere più pronti ad abbandonare il veicolo in caso di incidente",
      answer: 0,
      chunks: [
        { it: NEBBIA, fa: NEBBIA_FA },
        { it: "è opportuno tenere la cintura di sicurezza sganciata", fa: "بهتر است کمربندِ ایمنی باز بماند", verb: "tenere ← tenere", focus: "contrast" },
        { it: "per essere più pronti ad abbandonare il veicolo in caso di incidente", fa: "تا در تصادف زودتر بتوانی از خودرو بیرون بروی", focus: "reason" },
      ],
      translation: "در مهِ غلیظ بهتر است کمربندِ ایمنی باز بماند تا در تصادف زودتر بتوانی از خودرو بیرون بروی.",
      why: "غلط است (درس ۶). کمربند همیشه بسته است؛ در تصادف همان است که تو را نگه می‌دارد (فصلِ ۱۹).",
      rule: CDS("172"),
      conceptStep: 1,
    },
    {
      sourceId: "6416",
      textIt: "In caso di nebbia fitta è opportuno evitare di fermarsi sulla carreggiata, se non per cause di forza maggiore",
      answer: 1,
      chunks: [
        { it: NEBBIA, fa: NEBBIA_FA },
        { it: "è opportuno evitare di fermarsi sulla carreggiata,", fa: "بهتر است روی سواره‌رو نایستی،", verb: "evitare ← evitare", focus: "negation" },
        { it: "se non per cause di forza maggiore", fa: "مگر به دلیلِ قهری", focus: "condition" },
      ],
      translation: "در مهِ غلیظ بهتر است روی سواره‌رو نایستی، مگر به دلیلِ قهری.",
      why: "درست است (درس ۶). خودروی ایستاده در مه را دیر می‌بینند.",
      rule: CDS("141"),
      conceptStep: 2,
    },
    {
      sourceId: "6429",
      textIt: "Il conducente coinvolto in un incidente stradale per la denunzia all'assicurazione può avvalersi degli appositi moduli prestampati forniti dalla propria assicurazione",
      answer: 1,
      chunks: [
        { it: "Il conducente coinvolto in un incidente stradale", fa: "راننده‌ای که در تصادف درگیر است" },
        { it: "per la denunzia all'assicurazione", fa: "برای اعلامِ تصادف به بیمه", focus: "reason" },
        { it: "può avvalersi degli appositi moduli prestampati", fa: "می‌تواند از فرم‌های چاپیِ مخصوص استفاده کند", verb: "può ← potere" },
        { it: "forniti dalla propria assicurazione", fa: "که بیمه‌ی خودش می‌دهد" },
      ],
      translation: "راننده‌ای که در تصادف درگیر است، برای اعلامِ تصادف به بیمه، می‌تواند از فرم‌های چاپیِ مخصوصی استفاده کند که بیمه‌ی خودش می‌دهد.",
      why: "درست است (درس ۷). همان فرمِ توافقیِ تصادف (CAI).",
      rule: "D.Lgs. 209/2005, art. 143 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "6430",
      textIt: "Dopo un incidente stradale è obbligatorio apporre il segnale mobile di pericolo sul lunotto posteriore del veicolo, prima di andar via",
      answer: 0,
      chunks: [
        { it: "Dopo un incidente stradale", fa: "بعد از تصادف" },
        { it: "è obbligatorio apporre il segnale mobile di pericolo", fa: "اجباری است مثلثِ خطر را بگذاری", verb: "è ← essere" },
        { it: "sul lunotto posteriore del veicolo,", fa: "روی شیشه‌ی عقبِ خودرو،", focus: "contrast" },
        { it: "prima di andar via", fa: "پیش از رفتن" },
      ],
      translation: "بعد از تصادف اجباری است پیش از رفتن مثلثِ خطر را روی شیشه‌ی عقبِ خودرو بگذاری.",
      why: "غلط است (درس ۷). مثلث روی جاده و پشتِ خودروی ایستاده است؛ وقتی می‌روی برش می‌داری.",
      rule: `${CDS("162")} c.1; DPR 495/1992, art. 357`,
      conceptStep: 2,
    },
    {
      sourceId: "6455",
      textIt: "Percorrendo un lungo tunnel o traforo, in caso di formazione di lunghe file di veicoli, è opportuno aumentare la distanza di sicurezza, per scongiurare, in caso d'incendio, il rapido propagarsi delle fiamme",
      answer: 1,
      chunks: [
        { it: "Percorrendo un lungo tunnel o traforo,", fa: "در تونل یا تونلِ کوهستانیِ طولانی،" },
        { it: "in caso di formazione di lunghe file di veicoli,", fa: "وقتی صف‌های طولانی درست می‌شود،", focus: "condition" },
        { it: "è opportuno aumentare la distanza di sicurezza,", fa: "بهتر است فاصله‌ی ایمنی را بیشتر کنی،", verb: "è ← essere" },
        { it: "per scongiurare, in caso d'incendio, il rapido propagarsi delle fiamme", fa: "تا اگر آتش‌سوزی شد، آتش سریع پخش نشود", focus: "reason" },
      ],
      translation: "در تونل یا تونلِ کوهستانیِ طولانی، وقتی صف‌های طولانی درست می‌شود، بهتر است فاصله‌ی ایمنی را بیشتر کنی تا اگر آتش‌سوزی شد، آتش سریع پخش نشود.",
      why: "درست است (درس ۸). فاصله آتش را از خودرو به خودرو کند می‌کند و جا برای بیرون رفتن می‌گذارد.",
      rule: "TCS, «Guidare in galleria»",
      conceptStep: 1,
    },
    {
      sourceId: "6459",
      textIt: "Il pannello in figura, posto all'interno di una galleria, indica la presenza di un estintore",
      answer: 1,
      sign: 335,
      chunks: [
        { it: "Il pannello in figura,", fa: "پنلِ تصویر،" },
        { it: "posto all'interno di una galleria,", fa: "که داخلِ تونل نصب شده،" },
        { it: "indica la presenza di un estintore", fa: "نشان می‌دهد کپسولِ آتش‌نشانی این‌جاست", verb: "indica ← indicare" },
      ],
      translation: "پنلِ تصویر، که داخلِ تونل نصب شده، نشان می‌دهد کپسولِ آتش‌نشانی این‌جاست.",
      why: "درست است (درس ۸). کپسول با شعله‌ی قرمز = کپسولِ آتش‌نشانی.",
      rule: "D.Lgs. 264/2006, all. 4-bis",
      conceptStep: 2,
    },
  ],
  related: [],
};
