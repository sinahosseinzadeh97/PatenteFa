/**
 * src/content/ch21-pioggia.ts
 * Chapter 21 (Incidenti stradali e comportamenti), lesson 3: driving in rain
 * (less grip, less sight; hazard lights are not for rain) and aquaplaning
 * (speed, worn tread, deep water and light vehicles bring it on sooner; it
 * removes grip, it never adds it). Original side-view drawing "aquaplaning".
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter21.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS = (n: string) => `Codice della Strada, art. ${n}`;
const POLIZIA = "Polizia di Stato, «Viaggiare in sicurezza: i consigli della Polizia» (24/01/2023)";
const AQUA = "Il fenomeno dell'aquaplaning";
const AQUA_FA = "پدیده‌ی آکواپلنینگ";
const PIOGGIA = "In caso di pioggia";
const PIOGGIA_FA = "در باران";

export const lessonPioggia: Lesson = {
  id: "pioggia-aquaplaning",
  titleFa: "باران و آکواپلنینگ",
  titleIt: "PIOGGIA · AQUAPLANING",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی باران چه چیزی را عوض می‌کند (چسبندگی و دید) و هر کارِ درست در باران کدام را جبران می‌کند. و می‌فهمی آکواپلنینگ چیست، چه چیزهایی آن را زودتر می‌آورند و چرا چسبندگی را از بین می‌برد، نه این‌که بیشترش کند.",
      why:
        "۱۸ سؤال: نه تا درباره‌ی رانندگی در باران، نه تا درباره‌ی آکواپلنینگ (سؤالِ فاصله‌ی ایمنی در باران در فصلِ ۱۲ است). در دومی بانک جهت‌ها را برعکس می‌کند: سرعتِ کم به جای زیاد، چسبندگیِ بیشتر به جای کمتر.",
      rule: `${CDS("141")} c.1–2; ${POLIZIA}`,
    },
    {
      kind: "factors",
      title: "در باران: چه کنی، چه نکنی",
      body:
        "باران دو چیز را کم می‌کند: چسبندگیِ لاستیک (ترمز بلندتر می‌شود) و دید (شیشه‌ی خیس و بخارگرفته، آبی که خودروهای دیگر می‌پاشند). هر کارِ درست یکی از این دو را جبران می‌کند: آهسته‌تر، دورتر، نرم‌تر، شیشه‌های روشن. چراغِ خطر در حرکت برای باران نیست؛ برای وقتی است که خودروی ایستاده‌ات مانع است یا ترافیک ناگهان کند می‌شود (فصلِ ۱۸).",
      columns: [
        {
          title: "لازم است (VERO)",
          items: [
            { fa: "برف‌پاک‌کن روشن", it: "tenere in funzione i tergicristalli", sourceId: "6374", textIt: "In caso di pioggia occorre tenere in funzione i tergicristalli", answer: 1 },
            { fa: "سرعت را کم کن", it: "ridurre la velocità", sourceId: "6373", textIt: "In caso di pioggia occorre ridurre la velocità", answer: 1 },
            { fa: "نگذاری شیشه‌ها بخار بگیرند", it: "evitare l'appannamento dei vetri", sourceId: "6376", textIt: "In caso di pioggia occorre evitare l'appannamento dei vetri", answer: 1 },
          ],
        },
        {
          title: "غلط (FALSO)",
          items: [
            { fa: "تند رد شدن از چاله‌ی آب تا گیر نکنی", it: "passare velocemente sulle pozzanghere", sourceId: "6378", textIt: "In caso di pioggia occorre passare velocemente sulle pozzanghere per evitare di rimanere impantanati", answer: 0 },
            { fa: "پوشاندنِ رادیاتور با روکش", it: "coprire il radiatore con l'apposita mascherina", sourceId: "6379", textIt: "In caso di pioggia occorre coprire il radiatore con l'apposita mascherina", answer: 0 },
            { fa: "رانندگی با کلاچِ فشرده", it: "con il pedale della frizione abbassato", sourceId: "6382", textIt: "In caso di pioggia occorre procedere, di norma, con il pedale della frizione abbassato", answer: 0 },
          ],
        },
      ],
      takeaway: "در باران: آهسته‌تر، دورتر، نرم‌تر، شیشه‌ها روشن. چاله‌ی آب را آهسته رد کن؛ چراغِ خطر برای باران نیست.",
      rule: `${CDS("141")} c.1–2; ${CDS("149")} c.1; ${CDS("153")} c.7 (quattro frecce); ${POLIZIA}`,
    },
    {
      kind: "anatomy",
      title: "آکواپلنینگ: لاستیک روی آب",
      scene: "aquaplaning",
      body: "تصویر از کنار است و به مقیاس نیست. لاستیک به راست می‌رود. روی هر بخش بزن:",
      parts: [
        {
          id: "velo",
          nameIt: "Velo d'acqua",
          nameFa: "لایه‌ی آب",
          text: "هرچه لایه‌ی آب ضخیم‌تر باشد (بارانِ شدید، چاله‌ی آب)، خطر بیشتر است. شیبِ عرضیِ جاده آب را به کنار می‌برد؛ پس «در جاده‌ی با شیبِ عرضیِ زیاد بیشتر می‌شود» غلط است.",
        },
        {
          id: "velocita",
          nameIt: "Velocità",
          nameFa: "سرعت",
          text: "هرچه سریع‌تر بروی، آب وقتِ کمتری برای بیرون رفتن از زیرِ لاستیک دارد. آکواپلنینگ با سرعتِ زیاد می‌آید، نه با سرعتِ کم.",
        },
        {
          id: "battistrada",
          nameIt: "Battistrada",
          nameFa: "آجِ لاستیک",
          text: "شیارهای آج آب را از زیرِ لاستیک بیرون می‌فرستند. آجِ فرسوده و کم‌عمق آب را کمتر بیرون می‌برد، پس آکواپلنینگ در سرعتِ کمتری شروع می‌شود. عمق و طرحِ آج مهم است.",
        },
        {
          id: "cuneo",
          nameIt: "Cuneo d'acqua",
          nameFa: "گوه‌ی آب",
          text: "آبی که فرصتِ بیرون رفتن ندارد جلوی لاستیک جمع می‌شود و آن را بلند می‌کند. خودروی سبک‌تر راحت‌تر بلند می‌شود.",
        },
        {
          id: "contatto",
          nameIt: "Contatto con l'asfalto",
          nameFa: "تماس با آسفالت",
          text: "جای تماسِ لاستیک با آسفالت کوچک می‌شود تا جایی که چرخ روی آب سُر می‌خورد. چسبندگی کم می‌شود، نه زیاد؛ فرمان و ترمز جواب نمی‌دهند و خودرو ممکن است به پهلو لیز بخورد.",
        },
      ],
      takeaway:
        "سرعتِ زیاد، آجِ فرسوده، آبِ زیاد و خودروی سبک آکواپلنینگ را زودتر می‌آورند. پیش‌گیری به گفته‌ی پلیس: سرعتِ کمتر، فاصله‌ی ایمنیِ مناسب، بی گاز و ترمز و فرمانِ ناگهانی.",
      rule: `${POLIZIA}; fisica del pneumatico: indicazione tecnica, nessun articolo del CdS`,
    },
    {
      kind: "classify",
      title: "کارِ درست یا اشتباه؟",
      body: "هر موقعیت را بخوان. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "giusto", fa: "کارِ درست" },
        { it: "sbagliato", fa: "کارِ اشتباه" },
      ],
      items: [
        { prompt: "باران شروع شده؛ آهسته‌تر از همیشه می‌روی و فاصله‌ات را با جلویی بیشتر می‌کنی", answer: 0, explain: "هر دو چسبندگیِ کمتر را جبران می‌کنند." },
        { prompt: "جلویت چاله‌ی بزرگِ آب است؛ گاز می‌دهی تا سریع رد شوی", answer: 1, explain: "سرعت روی آبِ زیاد همان چیزی است که آکواپلنینگ می‌آورد." },
        { prompt: "شیشه بخار گرفته؛ هوای فن را روی شیشه می‌گیری", answer: 0, explain: "دیدِ روشن نصفِ ایمنی در باران است." },
        { prompt: "خودرو روی آب سبک شده؛ ترمز را محکم فشار می‌دهی و فرمان را تند می‌چرخانی", answer: 1, explain: "ترمز و فرمانِ ناگهانی روی آب خودرو را بیشتر از کنترل خارج می‌کند." },
        { prompt: "در باران چراغِ خطر را در حرکت روشن می‌گذاری تا دیده شوی", answer: 1, explain: "چراغِ خطر برای خودروی ایستاده یا کند شدنِ ناگهانیِ ترافیک است، نه برای باران." },
      ],
      takeaway: "در باران همه‌چیز نرم‌تر: گاز، ترمز، فرمان.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la pioggia", fa: "باران" },
        { it: "l'aquaplaning", fa: "آکواپلنینگ", note: "سُر خوردنِ لاستیک روی لایه‌ی آب" },
        { it: "l'aderenza", fa: "چسبندگی (لاستیک به جاده)" },
        { it: "il battistrada", fa: "آجِ لاستیک" },
        { it: "il pneumatico consumato", fa: "لاستیکِ فرسوده" },
        { it: "la pozzanghera", fa: "چاله‌ی آب" },
        { it: "i tergicristalli", fa: "برف‌پاک‌کن" },
        { it: "l'appannamento dei vetri", fa: "بخار گرفتنِ شیشه‌ها" },
        { it: "lo sbandamento", fa: "لیز خوردن به پهلو" },
        { it: "la pendenza laterale", fa: "شیبِ عرضیِ جاده" },
      ],
    },
    {
      kind: "trap",
      title: "«più facilmente»: کِی زودتر؟",
      body: "هر دو جمله می‌گویند آکواپلنینگ «راحت‌تر رخ می‌دهد». یکی شرطِ درست را می‌گوید، دیگری برعکسش را:",
      examples: [
        {
          sourceId: "6385",
          textIt: "Il fenomeno dell'aquaplaning si verifica più facilmente nei veicoli più leggeri",
          answer: 1,
          chunks: [
            { it: AQUA, fa: AQUA_FA },
            { it: "si verifica più facilmente", fa: "راحت‌تر رخ می‌دهد", verb: "si verifica ← verificarsi" },
            { it: "nei veicoli più leggeri", fa: "در وسایلِ سبک‌تر", focus: "condition" },
          ],
          translation: "پدیده‌ی آکواپلنینگ در وسایلِ سبک‌تر راحت‌تر رخ می‌دهد.",
          why: "درست است. وزنِ کمتر لاستیک را کمتر به آسفالت فشار می‌دهد و گوه‌ی آب راحت‌تر بلندش می‌کند.",
        },
        {
          sourceId: "6386",
          textIt: "Il fenomeno dell'aquaplaning si verifica più facilmente a bassa velocità",
          answer: 0,
          chunks: [
            { it: AQUA, fa: AQUA_FA },
            { it: "si verifica più facilmente", fa: "راحت‌تر رخ می‌دهد", verb: "si verifica ← verificarsi" },
            { it: "a bassa velocità", fa: "در سرعتِ کم", focus: "contrast" },
          ],
          translation: "پدیده‌ی آکواپلنینگ در سرعتِ کم راحت‌تر رخ می‌دهد.",
          why: "غلط است. برعکس: هرچه سریع‌تر، آب وقتِ کمتری برای بیرون رفتن دارد.",
        },
      ],
      takeaway: "آکواپلنینگ را چهار چیز زودتر می‌آورد: سرعتِ زیاد، آجِ فرسوده، آبِ زیاد، خودروی سبک. هر جمله‌ای که یکی را برعکس کند غلط است.",
      rule: POLIZIA,
    },
  ],
  practice: [
    {
      sourceId: "6377",
      textIt: "In caso di pioggia occorre manovrare con prudenza lo sterzo",
      answer: 1,
      chunks: [
        { it: PIOGGIA, fa: PIOGGIA_FA },
        { it: "occorre manovrare con prudenza lo sterzo", fa: "باید فرمان را با احتیاط چرخاند", verb: "occorre ← occorrere" },
      ],
      translation: "در باران باید فرمان را با احتیاط چرخاند.",
      why: "درست است (قدم ۱). روی جاده‌ی خیس فرمانِ ناگهانی چسبندگیِ کم را از بین می‌برد.",
      rule: POLIZIA,
      conceptStep: 1,
    },
    {
      sourceId: "6381",
      textIt: "In caso di pioggia occorre utilizzare, durante la marcia, la segnalazione luminosa di pericolo (quattro frecce lampeggianti simultaneamente)",
      answer: 0,
      chunks: [
        { it: PIOGGIA, fa: PIOGGIA_FA },
        { it: "occorre utilizzare, durante la marcia,", fa: "باید در حرکت استفاده کرد از", verb: "occorre ← occorrere", focus: "condition" },
        { it: "la segnalazione luminosa di pericolo (quattro frecce lampeggianti simultaneamente)", fa: "چراغِ خطر (چهار راهنما با هم)" },
      ],
      translation: "در باران باید در حرکت از چراغِ خطر (چهار راهنمای چشمک‌زن با هم) استفاده کرد.",
      why: "غلط است (قدم ۱). چراغِ خطر برای خودروی ایستاده‌ای است که مانع است یا برای کند شدنِ ناگهانیِ ترافیک؛ باران به‌تنهایی دلیلش نیست (فصلِ ۱۸).",
      rule: `${CDS("153")} c.7`,
      conceptStep: 1,
    },
    {
      sourceId: "6384",
      textIt: "Il fenomeno dell'aquaplaning inizia a velocità più bassa se il pneumatico è molto consumato",
      answer: 1,
      chunks: [
        { it: AQUA, fa: AQUA_FA },
        { it: "inizia a velocità più bassa", fa: "در سرعتِ کمتری شروع می‌شود", verb: "inizia ← iniziare" },
        { it: "se il pneumatico è molto consumato", fa: "اگر لاستیک خیلی فرسوده باشد", focus: "condition" },
      ],
      translation: "پدیده‌ی آکواپلنینگ اگر لاستیک خیلی فرسوده باشد در سرعتِ کمتری شروع می‌شود.",
      why: "درست است (قدم ۲). آجِ کم‌عمق آب را کمتر بیرون می‌برد، پس حتی با سرعتِ کمتر لاستیک روی آب می‌رود.",
      rule: "Fisica del pneumatico: indicazione tecnica",
      conceptStep: 2,
    },
    {
      sourceId: "6389",
      textIt: "Il fenomeno dell'aquaplaning aumenta l'aderenza sul fondo stradale",
      answer: 0,
      chunks: [
        { it: AQUA, fa: AQUA_FA },
        { it: "aumenta l'aderenza sul fondo stradale", fa: "چسبندگی روی سطحِ جاده را بیشتر می‌کند", verb: "aumenta ← aumentare", focus: "contrast" },
      ],
      translation: "پدیده‌ی آکواپلنینگ چسبندگی روی سطحِ جاده را بیشتر می‌کند.",
      why: "غلط است (قدم ۲). برعکس: لاستیک روی آب سُر می‌خورد و چسبندگی تقریباً از بین می‌رود.",
      rule: POLIZIA,
      conceptStep: 2,
    },
    {
      sourceId: "6391",
      textIt: "Il fenomeno dell'aquaplaning non dipende dallo spessore e dal disegno del battistrada",
      answer: 0,
      chunks: [
        { it: AQUA, fa: AQUA_FA },
        { it: "non dipende", fa: "بستگی ندارد", verb: "dipende ← dipendere", focus: "negation" },
        { it: "dallo spessore e dal disegno del battistrada", fa: "به عمق و طرحِ آجِ لاستیک" },
      ],
      translation: "پدیده‌ی آکواپلنینگ به عمق و طرحِ آجِ لاستیک بستگی ندارد.",
      why: "غلط است (قدم ۲). شیارهای آج آب را بیرون می‌برند؛ عمق و طرحشان تعیین می‌کند آکواپلنینگ کِی شروع شود.",
      rule: "Fisica del pneumatico: indicazione tecnica",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6373", "6374", "6376", "6377", "6378", "6379", "6380", "6381", "6382"] },
    { step: 2, sourceIds: ["6383", "6384", "6385", "6386", "6387", "6388", "6389", "6390", "6391"] },
  ],
};
