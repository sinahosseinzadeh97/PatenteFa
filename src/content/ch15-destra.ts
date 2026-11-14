/**
 * src/content/ch15-destra.ts
 * Chapter 15 (Sorpasso), lesson 4: which side. Left is the rule on every road
 * (CdS art. 148 c.3); right only when the vehicle ahead has signalled and
 * started a left turn, or on a one-way carriageway a stop on the left (c.7);
 * trams on the right, or either side on one-way roads (c.8); never on the
 * right of a tram or filobus stopped mid-road for passengers without a
 * salvagente (c.9). Plus the second overtake on 2+ lanes per direction (c.6).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter15.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_148 = "Codice della Strada, art. 148";
const DPR_347 = "DPR 495/1992, art. 347";
const MANOVRA = "La manovra di sorpasso";
const MANOVRA_FA = "سبقت";

export const lessonSorpassoDestra: Lesson = {
  id: "sorpasso-destra-tram",
  titleFa: "از چپ یا از راست؟ تراموا و سبقتِ دوم",
  titleIt: "SORPASSO A DESTRA · TRAM",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی سبقت همیشه از چپ است، جز در سه حالتِ مشخص، و برای هر حالت می‌گویی از کدام طرف می‌روی: وسیله‌ای که به چپ می‌پیچد، تراموا، و تراموا یا اتوبوس برقیِ ایستاده. سبقتِ دوم در جاده‌ی چندخطه را هم می‌شناسی.",
      why:
        "۱۹ سؤال، و دامِ همه‌شان یکی است: کلمه‌هایی مثلِ «sempre»، «mai» یا «indifferentemente» که یک استثنای کوچک را به قاعده‌ی کلی تبدیل می‌کنند، یا برعکس.",
      rule: `${CDS_148} c.3, c.6–9; ${DPR_347} c.2`,
    },
    {
      kind: "table",
      title: "سمتِ سبقت: قاعده و سه استثنا",
      body:
        "قاعده ساده است: از چپ، از خطِ عبوری که درست سمتِ چپِ وسیله‌ی جلوست. راست فقط وقتی است که وسیله‌ی جلو خودش سمتِ چپ را بسته باشد، یا وسیله‌ای روی ریل باشد. «علامت داده» کافی نیست: باید حرکت را شروع هم کرده باشد.",
      columns: ["از کدام طرف", "شرط"],
      rows: [
        {
          label: "همیشه، در هر جاده‌ای",
          it: "di norma, a sinistra",
          values: ["چپ", "بینِ موتورسیکلت‌ها هم، در آزادراه هم. راست «معمولاً» مجاز نیست"],
        },
        {
          label: "وسیله‌ی جلو راهنمای چپ زده و پیچیدن به چپ را شروع کرده",
          it: "intende svoltare a sinistra e abbia iniziato",
          values: ["راست، اجباری", "در تقاطعِ چراغ‌دار هم همین است. با سرعتِ معتدل و احتیاطِ زیاد"],
        },
        {
          label: "جاده‌ی یک‌طرفه: وسیله‌ی جلو علامت داده و ایستادن در سمتِ چپ را شروع کرده",
          it: "senso unico · arrestarsi a sinistra",
          values: ["راست، اجباری", "فقط در یک‌طرفه. یک‌طرفه به‌تنهایی سبقت از راست را مجاز نمی‌کند"],
        },
        {
          label: "تراموایی که مسیرِ جدا ندارد و وسط جاده روی ریل می‌رود",
          it: "tram non in sede riservata",
          values: ["راست", "اگر سمتِ راستِ ریل جا باشد"],
        },
        {
          label: "همان تراموا، در جاده‌ی یک‌طرفه",
          it: "senso unico · ambo i lati",
          values: ["هر دو طرف", "اگر پهنای سواره‌رو اجازه بدهد"],
        },
        {
          label: "تراموا یا اتوبوس برقی وسط جاده ایستاده تا مسافر سوار و پیاده شود",
          it: "tram o filobus fermi · salvagente",
          values: ["راست فقط اگر سکوی پناه عابر هست", "بدونِ سکو، سبقت از راست ممنوع است: مسافرها از وسطِ جاده به پیاده‌رو می‌روند"],
        },
      ],
      takeaway:
        "چپ مگر اینکه: جلویی به چپ می‌پیچد (یا در یک‌طرفه سمتِ چپ می‌ایستد) و شروع کرده؛ یا تراموا روی ریل است. تراموا و اتوبوس برقیِ ایستاده بدونِ سکو: از راست هرگز.",
      rule: `${CDS_148} c.3, c.7–9; ${DPR_347} c.2`,
    },
    {
      kind: "classify",
      title: "از کدام طرف؟",
      body: "موقعیت را بخوان و طرفِ درست را انتخاب کن. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "a sinistra", fa: "از چپ" },
        { it: "a destra", fa: "از راست" },
        { it: "su ambo i lati", fa: "از هر دو طرف" },
        { it: "non a destra", fa: "از راست ممنوع؛ صبر کن یا از چپ" },
      ],
      items: [
        {
          prompt: "جاده‌ی دوطرفه. سواریِ جلو راهنمای چپ زده و دارد وسطِ تقاطع می‌پیچد",
          answer: 1,
          explain: "بند ۷: علامت داده و پیچیدن را شروع کرده، پس سمتِ چپ بسته است. از راست می‌روی، آهسته و با احتیاط.",
        },
        {
          prompt: "سواریِ جلو در جاده‌ی دوطرفه راهنمای راست زده تا کنار بکشد",
          answer: 0,
          explain: "راهنمای راست سمتِ چپ را نمی‌بندد. سبقت مثلِ همیشه از چپ، اگر بررسی‌های درسِ ۲ جواب بدهند.",
        },
        {
          prompt: "تراموا روی ریلِ وسطِ خیابانِ دوطرفه حرکت می‌کند؛ سمتِ راستِ ریل جا هست",
          answer: 1,
          explain: "بند ۸: تراموایی که مسیرِ جدا ندارد از راست سبقت گرفته می‌شود.",
        },
        {
          prompt: "تراموا در خیابانِ یک‌طرفه‌ی پهن حرکت می‌کند",
          answer: 2,
          explain: "بند ۸: در یک‌طرفه، اگر پهنا اجازه بدهد، هر دو طرف مجاز است.",
        },
        {
          prompt: "اتوبوس برقی وسط جاده ایستاده، مسافر پیاده می‌شود و سکوی پناه عابر نیست",
          answer: 3,
          explain: "بند ۹: بدونِ سکو، سبقت از راست ممنوع است؛ مسافر از جلوی تو رد می‌شود.",
        },
        {
          prompt: "آزادراه، ترافیکِ روان؛ خطِ عبورِ راست خالی‌تر است",
          answer: 0,
          explain: "آزادراه قاعده را عوض نمی‌کند: سبقت از چپ. «از راست جلو زدن چون خالی است» سبقت از راست است.",
        },
      ],
      takeaway: "اول بپرس: کسی سمتِ چپ را بسته (پیچیدن به چپ، ایستادن در چپِ یک‌طرفه)؟ وسیله روی ریل است؟ اگر نه، از چپ.",
    },
    {
      kind: "factors",
      title: "سبقتِ دوم، موتورسیکلت و خطِ ویژه",
      body:
        "در جاده‌ای که در هر جهت دست‌کم دو خطِ عبور دارد، بعد از سبقتِ اول لازم نیست حتماً به راست برگردی: اگر بلافاصله باید از وسیله‌ی دیگری هم سبقت بگیری، می‌توانی در همان خط بمانی، به شرطی که جلوی تندروترهای پشتِ سر را نگیری. بقیه‌ی قاعده‌ها برای همه یکی است:",
      columns: [
        {
          title: "درست (VERO)",
          items: [
            {
              fa: "سبقتِ دوم بدونِ برگشتن به راست، در جاده‌ای با دست‌کم دو خط در هر جهت، اگر مزاحمتی نسازد",
              it: "eseguirne un' altra senza rientrare",
              sourceId: "5162",
              textIt:
                "Dopo aver eseguito una prima manovra di sorpasso, in strade ad almeno due corsie per senso di marcia, è possibile eseguirne un' altra senza rientrare a destra, se non si crea intralcio",
              answer: 1,
            },
          ],
        },
        {
          title: "غلط (FALSO)",
          items: [
            {
              fa: "پیش از سبقتِ دوم همیشه باید به راست برگشت",
              it: "senza prima essersi riportati a destra",
              sourceId: "5172",
              textIt: "E' vietato effettuare un secondo sorpasso senza prima essersi riportati a destra",
              answer: 0,
            },
            {
              fa: "در آزادراه فرقی نمی‌کند از چپ یا راست",
              it: "indifferentemente",
              sourceId: "5214",
              textIt: "In autostrada si può sorpassare indifferentemente a destra e a sinistra",
              answer: 0,
            },
            {
              fa: "موتورسیکلت‌ها از یکدیگر از هر دو طرف سبقت بگیرند",
              it: "sia a destra che a sinistra",
              sourceId: "5215",
              textIt: "Il sorpasso tra motocicli si può effettuare sia a destra che a sinistra",
              answer: 0,
            },
            {
              fa: "در ترافیکِ سنگین، موتورسوار برای سبقت از خطِ ویژه (مثلاً خطِ اتوبوس) استفاده کند",
              it: "le corsie riservate",
              sourceId: "5222",
              textIt: "In caso di intenso traffico è consentito ai motociclisti utilizzare per il sorpasso le corsie riservate",
              answer: 0,
            },
          ],
        },
      ],
      takeaway:
        "سبقتِ دوم در جاده‌ی چندخطه مجاز است، با یک شرط: مزاحمِ پشتی‌ها نشوی. نوعِ وسیله (موتورسیکلت) و نوعِ جاده (آزادراه) سمتِ سبقت را عوض نمی‌کنند، و خطِ ویژه فقط مالِ وسیله‌هایی است که برایشان ویژه شده.",
      rule: `${CDS_148} c.3, c.6`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "a destra · a sinistra", fa: "از راست · از چپ" },
        { it: "svoltare a sinistra", base: "svoltare", fa: "به چپ پیچیدن" },
        { it: "accostare", fa: "کنار کشیدن؛ نزدیکِ لبه‌ی جاده رفتن" },
        { it: "il tram", fa: "تراموا", note: "il filobus = اتوبوس برقی؛ روی ریل نیست ولی به سیمِ برق وصل است." },
        { it: "il salvagente", fa: "سکوی پناه عابر", note: "سکوی کوچکِ وسطِ جاده که مسافرِ تراموا رویش سوار و پیاده می‌شود." },
        { it: "la sede riservata", fa: "مسیرِ جدا؛ بخشی از جاده که فقط مالِ تراموا یا اتوبوس است" },
        { it: "su ambo i lati", fa: "از هر دو طرف" },
        { it: "indifferentemente", fa: "فرقی نمی‌کند؛ بی‌تفاوت", note: "در این فصل تقریباً همیشه نشانه‌ی جمله‌ی غلط است." },
        { it: "la corsia riservata", fa: "خطِ ویژه (مثلاً خطِ اتوبوس و تاکسی)" },
      ],
    },
    {
      kind: "trap",
      title: "با سکو یا «همیشه»؟",
      body: "هر دو جمله درباره‌ی تراموا یا اتوبوس برقیِ ایستاده‌اند. یکی شرط دارد، یکی شرط را برداشته:",
      examples: [
        {
          sourceId: "5166",
          textIt: "Se il tram o il filobus sono fermi la manovra di sorpasso può effettuarsi a destra se esiste il salvagente",
          answer: 1,
          chunks: [
            { it: "Se il tram o il filobus sono fermi", fa: "اگر تراموا یا اتوبوس برقی ایستاده باشند", verb: "sono ← essere", focus: "condition" },
            { it: "la manovra di sorpasso", fa: MANOVRA_FA },
            { it: "può effettuarsi a destra", fa: "می‌تواند از راست انجام شود", verb: "può ← potere" },
            { it: "se esiste il salvagente", fa: "اگر سکوی پناه عابر باشد", verb: "esiste ← esistere", focus: "condition" },
          ],
          translation: "اگر تراموا یا اتوبوس برقی ایستاده باشند، سبقت می‌تواند از راست انجام شود، اگر سکوی پناه عابر باشد.",
          why: "درست است. مسافرها روی سکو پیاده می‌شوند، نه وسطِ راهِ تو؛ پس راست مجاز است.",
        },
        {
          sourceId: "5168",
          textIt:
            "Se il tram o il filobus sono fermi per la salita e la discesa dei passeggeri, la manovra di sorpasso può sempre effettuarsi a destra",
          answer: 0,
          chunks: [
            { it: "Se il tram o il filobus sono fermi", fa: "اگر تراموا یا اتوبوس برقی ایستاده باشند", verb: "sono ← essere", focus: "condition" },
            { it: "per la salita e la discesa dei passeggeri,", fa: "برای سوار و پیاده شدنِ مسافرها،", focus: "reason" },
            { it: "la manovra di sorpasso", fa: MANOVRA_FA },
            { it: "può sempre effettuarsi a destra", fa: "همیشه می‌تواند از راست انجام شود", verb: "può ← potere", focus: "always" },
          ],
          translation: "اگر تراموا یا اتوبوس برقی برای سوار و پیاده شدنِ مسافرها ایستاده باشند، سبقت همیشه می‌تواند از راست انجام شود.",
          why: "غلط است، به‌خاطرِ «sempre». بدونِ سکو، مسافرها از وسطِ جاده به پیاده‌رو می‌روند و سبقت از راست ممنوع است.",
        },
      ],
      takeaway: "سکو هست: راست مجاز. سکو نیست: راست ممنوع. «sempre» و «mai» شرطِ سکو را پاک می‌کنند، پس جمله غلط می‌شود.",
      rule: `${CDS_148} c.9`,
    },
  ],
  practice: [
    {
      sourceId: "5163",
      textIt: "La manovra di sorpasso deve essere eseguita a destra se il conducente del veicolo da sorpassare ha segnalato l'intenzione di voler svoltare a sinistra",
      answer: 1,
      chunks: [
        { it: MANOVRA, fa: MANOVRA_FA },
        { it: "deve essere eseguita a destra", fa: "باید از راست انجام شود", verb: "deve ← dovere" },
        { it: "se il conducente del veicolo da sorpassare", fa: "اگر رانندهٔ وسیله‌ای که می‌خواهی از آن سبقت بگیری", focus: "condition" },
        { it: "ha segnalato l'intenzione di voler svoltare a sinistra", fa: "علامت داده باشد که می‌خواهد به چپ بپیچد", verb: "ha segnalato ← segnalare" },
      ],
      translation: "اگر رانندهٔ وسیله‌ای که می‌خواهی از آن سبقت بگیری علامت داده باشد که می‌خواهد به چپ بپیچد، سبقت باید از راست انجام شود.",
      why: "درست است (قدم ۱). او سمتِ چپ را برای پیچیدن گرفته؛ قانون می‌گوید از راست. متنِ قانون شرطِ «حرکت را شروع کرده» را هم دارد، ولی جوابِ این جمله عوض نمی‌شود.",
      rule: `${CDS_148} c.7`,
      conceptStep: 1,
    },
    {
      sourceId: "5247",
      textIt: "Non si può sorpassare sulla destra il tram che marcia al centro della carreggiata",
      answer: 0,
      chunks: [
        { it: "Non si può sorpassare sulla destra", fa: "نمی‌شود از راست سبقت گرفت", verb: "si può ← potere", focus: "negation" },
        { it: "il tram", fa: "از تراموایی" },
        { it: "che marcia al centro della carreggiata", fa: "که وسطِ سواره‌رو حرکت می‌کند", verb: "marcia ← marciare" },
      ],
      translation: "از تراموایی که وسطِ سواره‌رو حرکت می‌کند نمی‌شود از راست سبقت گرفت.",
      why: "غلط است (قدم ۱). برعکس: تراموایی که مسیرِ جدا ندارد و وسطِ جاده روی ریل است، از راست سبقت گرفته می‌شود، اگر جا باشد.",
      rule: `${CDS_148} c.8`,
      conceptStep: 1,
    },
    {
      sourceId: "5165",
      textIt: "La manovra di sorpasso del tram può effettuarsi su ambo i lati se la strada è a senso unico e la larghezza della carreggiata lo consente",
      answer: 1,
      chunks: [
        { it: "La manovra di sorpasso del tram", fa: "سبقت از تراموا" },
        { it: "può effettuarsi su ambo i lati", fa: "می‌تواند از هر دو طرف انجام شود", verb: "può ← potere" },
        { it: "se la strada è a senso unico", fa: "اگر جاده یک‌طرفه باشد", focus: "condition" },
        { it: "e la larghezza della carreggiata lo consente", fa: "و پهنای سواره‌رو اجازه بدهد", verb: "consente ← consentire", focus: "condition" },
      ],
      translation: "اگر جاده یک‌طرفه باشد و پهنای سواره‌رو اجازه بدهد، سبقت از تراموا می‌تواند از هر دو طرف انجام شود.",
      why: "درست است (قدم ۱). بند ۸: در یک‌طرفه کسی از روبه‌رو نمی‌آید، پس هر دو طرفِ تراموا مجاز است.",
      rule: `${CDS_148} c.8`,
      conceptStep: 1,
    },
    {
      sourceId: "5170",
      textIt: "La manovra di sorpasso può, di norma, effettuarsi a destra sulle autostrade",
      answer: 0,
      chunks: [
        { it: MANOVRA, fa: MANOVRA_FA },
        { it: "può, di norma, effettuarsi a destra", fa: "می‌تواند معمولاً از راست انجام شود", verb: "può ← potere" },
        { it: "sulle autostrade", fa: "در آزادراه‌ها", focus: "condition" },
      ],
      translation: "در آزادراه‌ها سبقت می‌تواند معمولاً از راست انجام شود.",
      why: "غلط است (قدم ۳). ماده‌ی ۱۴۸ برای همه‌ی جاده‌هاست، آزادراه هم. «معمولاً» از چپ است، نه از راست.",
      rule: `${CDS_148} c.3`,
      conceptStep: 3,
    },
  ],
  related: [
    {
      step: 1,
      // which side: left by rule; right for a left turn / stop on the left (c.7); trams (c.8); stopped tram or filobus (c.9)
      sourceIds: ["5163", "5164", "5165", "5166", "5167", "5168", "5169", "5171", "5184", "5247", "5263", "5264"],
    },
    {
      step: 3,
      // second overtake (c.6); motorcycles, motorways and reserved lanes do not change the side
      sourceIds: ["5162", "5170", "5172", "5214", "5215", "5221", "5222"],
    },
  ],
};
