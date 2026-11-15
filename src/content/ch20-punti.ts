/**
 * src/content/ch20-punti.ts
 * Chapter 20 (Patente, punti e documenti), lessons 7–8: the points licence.
 *  L7 the system (art. 126-bis and its table): 20 points at issue; only the
 *     violations in the table cost points; at most 15 at once unless the
 *     violation brings suspension or revocation; doubled (not tripled) in the
 *     first three years of a first B; back to 20 after two clean years; +2 bonus
 *     every two clean years once at 20, up to 30 at most; a course gives back 6
 *     (A, B; 9 for professional drivers), never above 20; zero → revisione
 *     (exam), not revoca.
 *  L8 which violations cost points: conduct on the road that creates danger
 *     (speed over 10 km/h, overtaking, phone, helmet, distance with a crash,
 *     lights, overload, glasses, racing, emergency lane, drugs) vs paperwork,
 *     parking at a passo carrabile (art. 158 c.2 lett. a is not in the table),
 *     the vehicle's periodic inspection, and invented doublings by engine power.
 *
 * Point values are not taught: the bank does not test them and the MIT table
 * we read is the 2010 revision. Trust rules as in src/content/lessons.ts.
 */
import type { Lesson } from "./lessons.js";

const ART = "Codice della Strada, art. 126-bis";
const TABLE = "Tabella dei punteggi previsti dall'art. 126-bis (MIT)";

export const lessonPuntiSistema: Lesson = {
  id: "punti-patente-sistema",
  titleFa: "گواهینامه‌ی امتیازی: ۲۰ امتیاز، چطور می‌رود و چطور برمی‌گردد",
  titleIt: "PATENTE A PUNTI · DECURTAZIONE · RECUPERO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس عددهای گواهینامه‌ی امتیازی را بلدی: ۲۰ امتیاز در شروع، حداکثر ۱۵ امتیاز با هم، دو برابر در سه سالِ اول، ۶ امتیاز با دوره، بازگشت به ۲۰ بعد از دو سالِ بی‌تخلف. و می‌دانی وقتی امتیاز به صفر برسد چه می‌شود.",
      why:
        "۱۵ سؤال. بانک تقریباً فقط عددها را عوض می‌کند: ۳۰ به جای ۲۰، ۱۰ به جای ۱۵، سه برابر به جای دو برابر، ۹ به جای ۶، ابطال به جای بازآزمایی. عددِ ۳۰ واقعاً در قانون هست، ولی فقط به‌عنوانِ سقفِ جایزه‌ها؛ نه شروع است و نه بازگشت.",
      rule: `${ART}; ${TABLE}`,
    },
    {
      kind: "table",
      title: "۲۰ امتیاز و کم شدنش",
      body:
        "هر گواهینامه با ۲۰ امتیاز شروع می‌شود. امتیاز فقط برای تخلف‌هایی کم می‌شود که در جدولِ قانون آمده‌اند، با عددِ خودشان (درسِ بعد می‌گوید کدام‌ها). هر کم شدن در صورت‌جلسه‌ی پلیس ثبت می‌شود.",
      columns: ["قاعده"],
      rows: [
        { label: "شروع", it: "20 punti", values: ["۲۰ امتیاز. نه ۳۰."] },
        { label: "کدام تخلف‌ها", it: "particolari infrazioni", values: ["فقط تخلف‌های فهرستِ جدول؛ نه «هر تخلفی»، و نه «فقط آن‌هایی که تعلیق دارند»."] },
        { label: "چند تخلف با هم", it: "al massimo 15 punti", values: ["حداکثر ۱۵ امتیاز با هم کم می‌شود؛ مگر یکی از تخلف‌ها تعلیق یا ابطالِ گواهینامه داشته باشد."] },
        { label: "سه سالِ اول", it: "il doppio dei punti", values: ["اگر اولین گواهینامه‌ی B (یا بالاتر) را گرفته‌ای، تا سه سال هر کم شدن دو برابر است. نه سه برابر."] },
        { label: "جایزه‌ی تازه‌کار", it: "un punto all’anno", values: ["در همان سه سال، هر سالِ بی‌تخلف ۱ امتیاز جایزه، حداکثر ۳."] },
      ],
      takeaway: "۲۰ در شروع؛ فقط تخلف‌های جدول؛ حداکثر ۱۵ با هم؛ سه سالِ اولِ B: دو برابر.",
      rule: `${ART} c.1, c.1-bis; ${TABLE} (nota finale)`,
    },
    {
      kind: "table",
      title: "برگشتنِ امتیاز، و صفر",
      body:
        "امتیاز از سه راه برمی‌گردد یا بالا می‌رود. و اگر به صفر برسد، گواهینامه باطل نمی‌شود: باید دوباره آزمون بدهی.",
      columns: ["چه می‌شود"],
      rows: [
        { label: "دو سالِ بی‌تخلف", it: "per due anni nessuna violazione", values: ["اگر زیرِ ۲۰ هستی، دوباره ۲۰ می‌شوی. نه ۳۰."] },
        { label: "جایزه‌ی دو ساله", it: "credito di 2 punti", values: ["اگر ۲۰ داری، هر دو سالِ بی‌تخلف ۲ امتیاز اضافه، تا ۱۰ امتیاز؛ پس سقفِ نهایی ۳۰ است."] },
        { label: "دوره‌ی آموزشی", it: "corso e esame", values: ["دوره و قبولی در آزمونش: ۶ امتیاز برای A و B (۹ برای راننده‌های حرفه‌ای)، بی‌آن‌که از ۲۰ بالاتر بروی."] },
        { label: "صفر شد", it: "esaurimento dei punti", values: ["بازآزماییِ گواهینامه (آزمونِ دوباره)، نه ابطال. اگر ظرفِ ۳۰ روز نروی، گواهینامه تا آزمون تعلیق می‌شود (درس ۱۱)."] },
      ],
      takeaway: "دو سال پاک: ۲۰. دوره: ۶ تا سقفِ ۲۰. صفر: بازآزمایی، نه ابطال. ۳۰ فقط سقفِ جایزه است.",
      rule: `${ART} c.4–6`,
    },
    {
      kind: "classify",
      title: "حالا چه می‌شود؟",
      body: "فرض کن ده سال است گواهینامه داری. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "torna a 20 punti", fa: "۲۰ می‌شود" },
        { it: "non cambia", fa: "تغییری نمی‌کند" },
        { it: "revisione", fa: "بازآزمایی" },
      ],
      items: [
        { prompt: "۱۲ امتیاز داری و دو سال است تخلفی نکرده‌ای", answer: 0, explain: "دو سالِ بی‌تخلف: دوباره ۲۰." },
        { prompt: "۱۲ امتیاز داری و یک سال است تخلفی نکرده‌ای", answer: 1, explain: "هنوز دو سال نشده." },
        { prompt: "امتیازت به صفر رسید", answer: 2, explain: "صفر یعنی آزمونِ دوباره." },
        { prompt: "۱۴ امتیاز داری و دوره را با قبولی تمام کردی", answer: 0, explain: "۱۴ + ۶ = ۲۰." },
        { prompt: "۱۸ امتیاز داری و دوره را با قبولی تمام کردی", answer: 0, explain: "دوره بیشتر از ۲۰ نمی‌دهد." },
        { prompt: "۱۶ امتیاز داری؛ تخلفی نکرده‌ای ولی هنوز یک سال نشده", answer: 1, explain: "تا دو سالِ کامل نشود، عدد همان می‌ماند." },
      ],
      takeaway: "ببین: دو سالِ پاک؟ دوره؟ صفر؟ عددِ پایانی هیچ‌وقت از این راه‌ها بالای ۲۰ نمی‌رود.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la patente a punti", fa: "گواهینامه‌ی امتیازی" },
        { it: "il punteggio", fa: "امتیاز" },
        { it: "la decurtazione dei punti", fa: "کم شدنِ امتیازِ گواهینامه" },
        { it: "l’attribuzione iniziale", fa: "امتیازِ اولیه" },
        { it: "contemporaneamente", fa: "هم‌زمان، با هم" },
        { it: "il corso di aggiornamento", fa: "دوره‌ی آموزشی" },
        { it: "recuperare", fa: "پس گرفتن" },
        { it: "esaurire", fa: "تمام کردن" },
        { it: "la revisione della patente", fa: "بازآزماییِ گواهینامه" },
      ],
    },
    {
      kind: "trap",
      title: "«attribuzione iniziale»: ۲۰، نه ۳۰",
      body: "هر دو جمله عددِ شروع را می‌گویند:",
      examples: [
        {
          sourceId: "6302",
          textIt: "Ogni patente di guida ha un’attribuzione iniziale di 20 punti",
          answer: 1,
          chunks: [
            { it: "Ogni patente di guida", fa: "هر گواهینامه" },
            { it: "ha un’attribuzione iniziale", fa: "امتیازِ اولیه‌ای دارد", verb: "ha ← avere" },
            { it: "di 20 punti", fa: "از ۲۰ امتیاز", focus: "limit" },
          ],
          translation: "هر گواهینامه ۲۰ امتیازِ اولیه دارد.",
          why: "درست است. شروع همیشه ۲۰ است.",
        },
        {
          sourceId: "6309",
          textIt: "Ogni patente di guida ha un’attribuzione iniziale di 30 punti",
          answer: 0,
          chunks: [
            { it: "Ogni patente di guida", fa: "هر گواهینامه" },
            { it: "ha un’attribuzione iniziale", fa: "امتیازِ اولیه‌ای دارد", verb: "ha ← avere" },
            { it: "di 30 punti", fa: "از ۳۰ امتیاز", focus: "limit" },
          ],
          translation: "هر گواهینامه ۳۰ امتیازِ اولیه دارد.",
          why: "غلط است. ۳۰ فقط سقفِ نهاییِ جایزه‌هاست؛ شروع ۲۰ است.",
        },
      ],
      takeaway: "در جمله‌های امتیاز، ۳۰ فقط وقتی درست است که از «جایزه‌ی دو ساله تا ۱۰ امتیاز» حرف بزند.",
      rule: `${ART} c.1, c.5`,
    },
  ],
  practice: [
    {
      sourceId: "6307",
      textIt: "Se si commettono contemporaneamente più violazioni che comportano perdita di punti sulla patente, possono essere decurtati al massimo 15 punti, salvo che si tratti di infrazioni che comportano la sospensione della patente",
      answer: 1,
      chunks: [
        { it: "Se si commettono contemporaneamente più violazioni", fa: "اگر چند تخلف با هم انجام شود", verb: "si commettono ← commettere", focus: "condition" },
        { it: "che comportano perdita di punti sulla patente,", fa: "که کم شدنِ امتیازِ گواهینامه دارند،", verb: "comportano ← comportare" },
        { it: "possono essere decurtati al massimo 15 punti,", fa: "حداکثر ۱۵ امتیاز می‌تواند کم شود،", verb: "possono ← potere", focus: "limit" },
        { it: "salvo che si tratti di infrazioni che comportano la sospensione della patente", fa: "مگر تخلف‌هایی باشند که تعلیقِ گواهینامه دارند", focus: "contrast" },
      ],
      translation: "اگر چند تخلف که کم شدنِ امتیازِ گواهینامه دارند با هم انجام شود، حداکثر ۱۵ امتیاز می‌تواند کم شود، مگر تخلف‌هایی باشند که تعلیقِ گواهینامه دارند.",
      why: "درست است (قدم ۱). سقفِ ۱۵ برای چند تخلفِ هم‌زمان است؛ تخلفی که تعلیق یا ابطال دارد از این سقف بیرون است.",
      rule: `${ART} c.1-bis`,
      conceptStep: 1,
    },
    {
      sourceId: "6312",
      textIt: "Le violazioni che comportano decurtazione di punti, commesse entro i primi tre anni dal rilascio della prima patente, sono sanzionate con il triplo dei punti previsti",
      answer: 0,
      chunks: [
        { it: "Le violazioni che comportano decurtazione di punti,", fa: "تخلف‌هایی که کم شدنِ امتیاز دارند،", verb: "comportano ← comportare" },
        { it: "commesse entro i primi tre anni", fa: "اگر در سه سالِ اول انجام شوند", verb: "commesse ← commettere", focus: "condition" },
        { it: "dal rilascio della prima patente,", fa: "از صدورِ اولین گواهینامه،" },
        { it: "sono sanzionate con il triplo dei punti previsti", fa: "با سه برابرِ امتیازِ تعیین‌شده جریمه می‌شوند", verb: "sono sanzionate ← sanzionare", focus: "limit" },
      ],
      translation: "تخلف‌هایی که کم شدنِ امتیاز دارند، اگر در سه سالِ اول از صدورِ اولین گواهینامه انجام شوند، با سه برابرِ امتیازِ تعیین‌شده جریمه می‌شوند.",
      why: "غلط است (قدم ۱). در سه سالِ اول امتیاز «دو برابر» کم می‌شود، نه سه برابر.",
      rule: `${TABLE} (nota finale)`,
      conceptStep: 1,
    },
    {
      sourceId: "6305",
      textIt: "La frequenza di apposito corso e il superamento di uno specifico esame consentono al titolare di patente A o B di recuperare 6 punti, arrivando al massimo a 20 punti",
      answer: 1,
      chunks: [
        { it: "La frequenza di apposito corso", fa: "شرکت در دوره‌ی مخصوص" },
        { it: "e il superamento di uno specifico esame", fa: "و قبولی در یک آزمونِ مشخص" },
        { it: "consentono al titolare di patente A o B", fa: "به دارنده‌ی گواهینامه‌ی A یا B اجازه می‌دهند", verb: "consentono ← consentire" },
        { it: "di recuperare 6 punti,", fa: "۶ امتیاز را پس بگیرد،", focus: "limit" },
        { it: "arrivando al massimo a 20 punti", fa: "و حداکثر به ۲۰ امتیاز برسد", verb: "arrivando ← arrivare", focus: "limit" },
      ],
      translation: "شرکت در دوره‌ی مخصوص و قبولی در یک آزمونِ مشخص به دارنده‌ی گواهینامه‌ی A یا B اجازه می‌دهد ۶ امتیاز را پس بگیرد و حداکثر به ۲۰ امتیاز برسد.",
      why: "درست است (قدم ۲). دوره ۶ امتیاز می‌دهد و از ۲۰ بالاتر نمی‌برد.",
      rule: `${ART} c.4`,
      conceptStep: 2,
    },
    {
      sourceId: "6316",
      textIt: "Quando ha esaurito la sua dotazione di punti sulla patente, al conducente viene revocata la patente",
      answer: 0,
      chunks: [
        { it: "Quando ha esaurito la sua dotazione di punti sulla patente,", fa: "وقتی همه‌ی امتیازهای گواهینامه‌اش تمام شده،", verb: "ha esaurito ← esaurire", focus: "condition" },
        { it: "al conducente viene revocata la patente", fa: "گواهینامه‌ی راننده باطل می‌شود", verb: "viene revocata ← revocare" },
      ],
      translation: "وقتی همه‌ی امتیازهای گواهینامه‌ی راننده تمام شده، گواهینامه‌اش باطل می‌شود.",
      why: "غلط است (قدم ۲). صفر امتیاز یعنی بازآزمایی (آزمونِ دوباره)، نه ابطال.",
      rule: `${ART} c.6`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6302", "6303", "6306", "6307", "6309", "6310", "6311", "6312", "6314"] },
    { step: 2, sourceIds: ["6304", "6305", "6308", "6313", "6315", "6316"] },
  ],
};

export const lessonPerditaPunti: Lesson = {
  id: "punti-quali-violazioni",
  titleFa: "کدام تخلف امتیاز کم می‌کند؟",
  titleIt: "PERDITA DI PUNTI · QUALI VIOLAZIONI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس تشخیص می‌دهی کدام تخلف امتیاز کم می‌کند: کارهای پشتِ فرمان که برای دیگران خطر دارند. و می‌دانی مدرکِ همراه نداشتن، پارک جلوی ورودیِ خودرو به ملک یا معاینه‌ی فنیِ عقب‌افتاده جریمه دارند ولی امتیاز نه.",
      why:
        "۲۳ سؤال. یک سؤال کافی است: «این کار در جاده کسی را به خطر می‌اندازد؟» سرعت، سبقت، تلفن، کلاه، فاصله، چراغ، بارِ اضافه، عینک، مسابقه، خطِ اضطراری، مواد: بله. کاغذ، پارکِ معمولی، معاینه‌ی فنی و توانِ موتور: نه.",
      rule: `${ART}; ${TABLE}`,
    },
    {
      kind: "table",
      title: "رفتاری که خطر می‌سازد: امتیاز کم می‌کند",
      body:
        "جدولِ امتیاز تقریباً فهرستِ رفتارهای پرخطر پشتِ فرمان است. این‌ها همه امتیاز کم می‌کنند (عددها را بانک نمی‌پرسد):",
      columns: ["امتیاز؟"],
      rows: [
        { label: "سرعت", it: "superamento dei limiti di oltre 10 km/h", values: ["بیش از ۱۰ کیلومتر بر ساعت بالای سقف: بله."] },
        { label: "سبقت", it: "manovra di sorpasso", values: ["سبقتِ خلافِ قاعده: بله (فصلِ ۱۵)."] },
        { label: "تلفن", it: "telefono senza auricolare o viva voce", values: ["تلفن در دست بی‌هدفون یا بلندگو: بله."] },
        { label: "کلاه و کمربند", it: "casco · cinture", values: ["بی‌کلاه یا با کلاهِ نبسته، بی‌کمربند: بله (فصلِ ۱۹)."] },
        { label: "فاصله با تصادف", it: "distanza di sicurezza · incidente", values: ["رعایت نکردنِ فاصله‌ای که به تصادف رسیده: بله (فصلِ ۱۲)."] },
        { label: "چراغ‌ها", it: "luci", values: ["روشن نکردن یا استفاده‌ی نادرست: بله (فصلِ ۱۸)."] },
        { label: "بار و مسافرِ اضافه", it: "sovraccarico · sovrannumero", values: ["بیش از ظرفیت: بله."] },
        { label: "عینکِ تجویزشده", it: "lenti prescritte", values: ["رانندگی بی‌عینک یا لنزی که در گواهینامه آمده: بله."] },
        { label: "مسابقه در جاده‌ی عمومی", it: "gareggiare in velocità", values: ["بله، با امتیازِ زیاد."] },
        { label: "خطِ اضطراریِ آزادراه", it: "corsia di emergenza", values: ["حرکت در آن بی‌دلیلِ مجاز: بله (فصلِ ۱۷)."] },
        { label: "مواد و الکل", it: "sostanze stupefacenti · ebbrezza", values: ["بله، با امتیازِ زیاد."] },
      ],
      takeaway: "امتیاز برای رفتارِ پرخطر پشتِ فرمان است.",
      rule: TABLE,
    },
    {
      kind: "factors",
      title: "کاغذ، پارکِ معمولی و دو برابرِ ساختگی",
      body:
        "ستونِ اول دو تخلفِ امتیازدارِ دیگر است. ستونِ دوم چیزهایی است که جریمه یا اصلاحِ مدرک دارند، ولی امتیاز نه: مدرکی که همراهت نیست (گواهینامه، کارتِ خودرو، سندِ مالکیت)، پارک جلوی ورودیِ خودرو به ملک، معاینه‌ی فنیِ عقب‌افتاده. بعضی جمله‌ها اصلاً تخلف نیستند: راندنِ خودروی کسِ دیگر اجازه‌ی اداره‌ی موتوریتزاتسیونه نمی‌خواهد؛ کسی که گواهینامه‌ی C دارد، B هم دارد و سواریِ هشت‌نفره را مجاز می‌راند؛ تازه‌کار در آزادراه فقط سقفِ سرعتِ پایین‌تر دارد (فصلِ ۱۱)، نه منعِ ورود. دو برابر شدنِ امتیاز هم فقط برای سه سالِ اولِ گواهینامه است (درسِ قبل)؛ توانِ موتور یا خودرو آن را عوض نمی‌کند.",
      columns: [
        {
          title: "امتیاز کم می‌کند",
          items: [
            {
              fa: "عینکِ تجویزشده را نزدن",
              it: "L’omesso uso di lenti durante la guida, se prescritte",
              sourceId: "6324",
              textIt: "L’omesso uso di lenti durante la guida, se prescritte, comporta una perdita di punti sulla patente",
              answer: 1,
            },
            {
              fa: "حرکت در خطِ اضطراریِ آزادراه",
              it: "Circolare sulla corsia di emergenza in autostrada, al di fuori dei casi previsti",
              sourceId: "6326",
              textIt: "Circolare sulla corsia di emergenza in autostrada, al di fuori dei casi previsti, comporta una perdita di punti sulla patente",
              answer: 1,
            },
          ],
        },
        {
          title: "امتیاز کم نمی‌کند",
          items: [
            {
              fa: "گواهینامه همراهت نیست",
              it: "Guidare senza avere con sé la patente",
              sourceId: "6330",
              textIt: "Guidare senza avere con sé la patente comporta una perdita di punti sulla patente",
              answer: 0,
            },
            {
              fa: "پارک جلوی ورودیِ خودرو به ملک",
              it: "Lasciare in sosta l’auto davanti a un passo carrabile",
              sourceId: "6329",
              textIt: "Lasciare in sosta l’auto davanti a un passo carrabile comporta una perdita di punti sulla patente",
              answer: 0,
            },
            {
              fa: "دو برابر برای موتورسیکلتِ بالای ۳۵ کیلووات",
              it: "alla guida di motociclo di potenza superiore a 35 kW",
              sourceId: "6334",
              textIt: "La perdita di punti sulla patente per infrazione al codice della strada è raddoppiata se effettuata alla guida di motociclo di potenza superiore a 35 kW",
              answer: 0,
            },
            {
              fa: "معاینه‌ی فنیِ دوره‌ای انجام نشده",
              it: "non sia stato sottoposto alla prescritta revisione periodica",
              sourceId: "6339",
              textIt: "Circolare con veicolo che non sia stato sottoposto alla prescritta revisione periodica comporta una perdita di punti sulla patente",
              answer: 0,
            },
          ],
        },
      ],
      takeaway: "مدرکی که همراه نیست یا معاینه‌ی فنیِ عقب‌افتاده: جریمه، نه امتیاز. دو برابر فقط برای تازه‌کارها.",
      rule: `${TABLE}; Codice della Strada, artt. 80, 158 c.2 lett. a, 180`,
    },
    {
      kind: "classify",
      title: "امتیاز کم می‌شود؟",
      body: "هر تخلف را بخوان. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "sì, perdita di punti", fa: "بله" },
        { it: "no", fa: "نه" },
      ],
      items: [
        { prompt: "۲۵ کیلومتر بر ساعت بالای سقفِ سرعت", answer: 0, explain: "بیش از ۱۰ کیلومتر: امتیاز." },
        { prompt: "کارتِ خودرو را در خانه جا گذاشته‌ای", answer: 1, explain: "مدرکِ همراه نداشتن فقط جریمه است." },
        { prompt: "شش نفر در سواریِ پنج‌نفره", answer: 0, explain: "مسافرِ اضافه: امتیاز." },
        { prompt: "پیام دادن با گوشی در دست، پشتِ فرمان", answer: 0, explain: "تلفن بی‌هدفون: امتیاز." },
        { prompt: "معاینه‌ی فنیِ خودرو دو ماه عقب افتاده", answer: 1, explain: "جریمه و توقفِ خودرو تا معاینه، ولی امتیاز نه." },
        { prompt: "مسابقه‌ی سرعت در پیستِ خصوصی", answer: 1, explain: "قانونِ جاده در پیستِ خصوصی نیست." },
      ],
      takeaway: "پشتِ فرمان و خطرناک: امتیاز. کاغذ، معاینه یا جایی بیرون از جاده: نه.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "comportare una perdita di punti", base: "comportare", fa: "امتیاز کم کردن" },
        { it: "il telefono cellulare", fa: "تلفنِ همراه" },
        { it: "l’auricolare", fa: "هدفون" },
        { it: "il viva voce", fa: "بلندگو (هندزفری)" },
        { it: "gareggiare in velocità", base: "gareggiare", fa: "مسابقه‌ی سرعت دادن" },
        { it: "il sovraccarico", fa: "بارِ اضافه" },
        { it: "il sovrannumero", fa: "مسافرِ اضافه" },
        { it: "le lenti prescritte", fa: "عینک یا لنزِ تجویزشده" },
        { it: "il passo carrabile", fa: "ورودیِ خودرو به ملک" },
        { it: "la revisione periodica", fa: "معاینه‌ی فنیِ دوره‌ای" },
      ],
    },
    {
      kind: "trap",
      title: "«gareggiare in velocità»: جاده‌ی عمومی آری، پیستِ خصوصی نه",
      body: "هر دو جمله درباره‌ی مسابقه‌ی سرعت است. فقط جایش فرق دارد:",
      examples: [
        {
          sourceId: "6325",
          textIt: "Gareggiare in velocità su strade pubbliche, comporta una perdita di punti sulla patente",
          answer: 1,
          chunks: [
            { it: "Gareggiare in velocità", fa: "مسابقه‌ی سرعت دادن" },
            { it: "su strade pubbliche,", fa: "در جاده‌های عمومی،", focus: "condition" },
            { it: "comporta una perdita di punti sulla patente", fa: "امتیازِ گواهینامه را کم می‌کند", verb: "comporta ← comportare" },
          ],
          translation: "مسابقه‌ی سرعت در جاده‌های عمومی امتیازِ گواهینامه را کم می‌کند.",
          why: "درست است. این از سنگین‌ترین تخلف‌های جدول است.",
        },
        {
          sourceId: "6328",
          textIt: "Gareggiare in velocità su piste private, avendo meno di 24 anni e la sola patente B, comporta una perdita di punti sulla patente",
          answer: 0,
          chunks: [
            { it: "Gareggiare in velocità", fa: "مسابقه‌ی سرعت دادن" },
            { it: "su piste private,", fa: "در پیست‌های خصوصی،", focus: "condition" },
            { it: "avendo meno di 24 anni e la sola patente B,", fa: "با کمتر از ۲۴ سال و فقط گواهینامه‌ی B،", verb: "avendo ← avere", focus: "limit" },
            { it: "comporta una perdita di punti sulla patente", fa: "امتیازِ گواهینامه را کم می‌کند", verb: "comporta ← comportare" },
          ],
          translation: "مسابقه‌ی سرعت در پیست‌های خصوصی، با کمتر از ۲۴ سال و فقط گواهینامه‌ی B، امتیازِ گواهینامه را کم می‌کند.",
          why: "غلط است. پیستِ خصوصی جاده‌ی عمومی نیست؛ سن و ردیفِ گواهینامه هم این‌جا بی‌ربط‌اند.",
        },
      ],
      takeaway: "امتیاز مالِ رفتار در جاده‌ی عمومی است. جزئیاتِ اضافه (سن، ردیف) حواست را پرت نکند.",
      rule: TABLE,
    },
  ],
  practice: [
    {
      sourceId: "6317",
      textIt: "Il superamento dei limiti di velocità di oltre 10 km/h durante la guida comporta una perdita di punti sulla patente",
      answer: 1,
      chunks: [
        { it: "Il superamento dei limiti di velocità", fa: "بالاتر رفتن از سقفِ سرعت" },
        { it: "di oltre 10 km/h", fa: "بیش از ۱۰ کیلومتر بر ساعت", focus: "limit" },
        { it: "durante la guida", fa: "هنگامِ رانندگی" },
        { it: "comporta una perdita di punti sulla patente", fa: "امتیازِ گواهینامه را کم می‌کند", verb: "comporta ← comportare" },
      ],
      translation: "بالاتر رفتن از سقفِ سرعت به اندازه‌ی بیش از ۱۰ کیلومتر بر ساعت هنگامِ رانندگی، امتیازِ گواهینامه را کم می‌کند.",
      why: "درست است (قدم ۱). سرعتِ بیش از ۱۰ کیلومتر بالای سقف در جدولِ امتیاز است.",
      rule: `${TABLE} (art. 142 c.8–9-bis)`,
      conceptStep: 1,
    },
    {
      sourceId: "6321",
      textIt: "Il mancato rispetto della distanza di sicurezza da cui sia derivato un incidente, comporta una perdita di punti sulla patente",
      answer: 1,
      chunks: [
        { it: "Il mancato rispetto della distanza di sicurezza", fa: "رعایت نکردنِ فاصله‌ی ایمنی" },
        { it: "da cui sia derivato un incidente,", fa: "که از آن تصادفی پیش آمده باشد،", verb: "sia derivato ← derivare", focus: "condition" },
        { it: "comporta una perdita di punti sulla patente", fa: "امتیازِ گواهینامه را کم می‌کند", verb: "comporta ← comportare" },
      ],
      translation: "رعایت نکردنِ فاصله‌ی ایمنی که از آن تصادفی پیش آمده باشد، امتیازِ گواهینامه را کم می‌کند.",
      why: "درست است (قدم ۱). فاصله‌ای که به تصادف برسد در جدولِ امتیاز است.",
      rule: `${TABLE} (art. 149 c.5)`,
      conceptStep: 1,
    },
    {
      sourceId: "6331",
      textIt: "Circolare senza avere con sé la carta di circolazione del veicolo di cui si è alla guida comporta una perdita di punti sulla patente",
      answer: 0,
      chunks: [
        { it: "Circolare senza avere con sé", fa: "رانندگی بدونِ همراه داشتنِ", focus: "negation" },
        { it: "la carta di circolazione del veicolo di cui si è alla guida", fa: "کارتِ خودروی وسیله‌ای که می‌رانی" },
        { it: "comporta una perdita di punti sulla patente", fa: "امتیازِ گواهینامه را کم می‌کند", verb: "comporta ← comportare" },
      ],
      translation: "رانندگی بدونِ همراه داشتنِ کارتِ خودروی وسیله‌ای که می‌رانی، امتیازِ گواهینامه را کم می‌کند.",
      why: "غلط است (قدم ۲). مدرکِ همراه نداشتن جریمه دارد و باید بعداً نشانش بدهی، ولی امتیاز کم نمی‌کند.",
      rule: "Codice della Strada, art. 180",
      conceptStep: 2,
    },
    {
      sourceId: "6338",
      textIt: "Circolare, in un giorno festivo, con un autocarro carico, di massa complessiva a pieno carico inferiore a 3,5 tonnellate, comporta una perdita di punti sulla patente",
      answer: 0,
      chunks: [
        { it: "Circolare, in un giorno festivo,", fa: "رانندگی در روزِ تعطیل،", focus: "condition" },
        { it: "con un autocarro carico,", fa: "با کامیونِ پُر،" },
        { it: "di massa complessiva a pieno carico inferiore a 3,5 tonnellate,", fa: "با وزنِ کلِ پُر کمتر از ۳٫۵ تن،", focus: "limit" },
        { it: "comporta una perdita di punti sulla patente", fa: "امتیازِ گواهینامه را کم می‌کند", verb: "comporta ← comportare" },
      ],
      translation: "رانندگی در روزِ تعطیل با کامیونِ پُری که وزنِ کلِ پُرش کمتر از ۳٫۵ تن است، امتیازِ گواهینامه را کم می‌کند.",
      why: "غلط است (قدم ۲). منعِ روزهای تعطیل برای کامیون‌های سنگین است؛ کامیونِ زیرِ ۳٫۵ تن تخلفی نکرده.",
      rule: "Codice della Strada, art. 6 c.1; DM calendario dei divieti festivi (veicoli oltre 7,5 t)",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6317", "6318", "6319", "6320", "6321", "6322", "6323", "6324", "6325", "6326", "6327"] },
    {
      step: 2,
      sourceIds: ["6328", "6329", "6330", "6331", "6332", "6333", "6334", "6335", "6336", "6337", "6338", "6339"],
    },
  ],
};
