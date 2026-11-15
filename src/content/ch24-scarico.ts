/**
 * src/content/ch24-scarico.ts
 * Chapter 24 (Consumi, ambiente e inquinamento), lessons 5–6: what a vehicle
 * puts into the air and what keeps it low (bank groups 617–621, 623, 624 in part).
 *
 *  L5 four different things, kept apart: fuel or energy use, CO₂ (climate),
 *     local pollutants (health, smog, acid rain) and noise; non-exhaust
 *     particles; Euro classes, the catalyst, and the law on modified engines
 *     and exhausts. Drawing `scarico`.
 *  L6 maintenance that matters for exhaust (air filter, injectors, an engine
 *     running badly) and what does not (cabin filter, clutch, shock absorbers,
 *     softer tyres); dark smoke means get the engine checked.
 *
 * Two bank answers are kept but never scored (FLAGGED_SOURCE_IDS in
 * lessons-ambiente.ts): 6807 (exhaust as "most" of vehicle pollution, true for
 * gases, dated for particles) and 6813 (fine plus withdrawal of the registration
 * document for excess emissions; the withdrawal was found in art. 78, for
 * unapproved changes). Their sections say so in a «یادداشتِ منبع».
 * Trust rules as in src/content/lessons.ts; tests/chapter24.test.ts.
 */
import type { Lesson } from "./lessons.js";
import { CDS, CHOICES, COMPARE, EEA_AIR, EXERCISE, GUIDA_CO2, MANUALE, TECNICA } from "./ch24-common.js";

const INQ = "L'inquinamento dell'aria prodotto dai veicoli";
const INQ_FA = "آلودگیِ هوای ناشی از وسیله‌ها";
const DIM = "Per diminuire l'inquinamento dell'aria provocato dai veicoli,";
const DIM_FA = "برای کم کردنِ آلودگیِ هوای ناشی از وسیله‌ها،";
const EURO_REG = "Regolamento (CE) 715/2007 (Euro 5 e 6) e direttive precedenti: limiti di emissione per classe Euro";

export const lessonCosaEsce: Lesson = {
  id: "cosa-esce-dallo-scarico",
  titleFa: "از اگزوز چه بیرون می‌آید و چه می‌کند",
  titleIt: "INQUINAMENTO: GAS DI SCARICO · CO₂ · CLASSI EURO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس چهار چیز را از هم جدا می‌کنی که بانک گاهی در یک جمله می‌آورد: مصرفِ سوخت یا انرژی، دی‌اکسیدِ کربن (گازِ گلخانه‌ای)، آلاینده‌هایی که نفس می‌کشیم، و صدا. و می‌دانی کم کردنِ یکی خودبه‌خود بقیه را صفر نمی‌کند. بعد کلاس‌های یورو، مبدلِ کاتالیستی و قانونِ دست بردن در موتور و اگزوز.",
      why:
        "۱۰ سؤال. جمله‌ی غلط علت را جای دیگری می‌گذارد («به رطوبتِ هوا بستگی دارد»)، چیزی را صفر می‌کند که صفر نیست («در یورو ۰ آلودگی صفر است»)، کلاس‌ها را وارونه می‌کند («یورو ۴ از یورو ۰ بیشتر می‌آلاید»)، یا دست بردن در موتور و اگزوز را آزاد می‌داند.",
      rule: EEA_AIR,
    },
    {
      kind: "anatomy",
      title: "از باک تا لوله‌ی اگزوز",
      scene: "scarico",
      body:
        "سوخت از سمتِ چپ وارد می‌شود و از سمتِ راست سه چیزِ جدا بیرون می‌آید. هر بخش را لمس کن. این تصویر برای خودروی بنزینی یا دیزلی است؛ خودروی برقی باک، موتورِ احتراقی و اگزوز ندارد.",
      parts: [
        { id: "carburante", nameIt: "il carburante", nameFa: "سوخت", text: "مصرفِ سوخت یعنی چقدر از این‌جا برداشته می‌شود. هرچه بیشتر بسوزد، دی‌اکسیدِ کربنِ بیشتری بیرون می‌آید." },
        { id: "filtro", nameIt: "il filtro dell'aria", nameFa: "فیلترِ هوا", text: "موتور برای سوزاندن هوا می‌خواهد. فیلترِ کثیف هوا را کم می‌کند و سوختن ناقص می‌شود (درسِ بعد)." },
        { id: "motore", nameIt: "il motore", nameFa: "موتور", text: "سوخت این‌جا می‌سوزد. موتوری که نامنظم کار می‌کند یا انژکتورِ خراب دارد، سوخت را ناقص می‌سوزاند و آلاینده‌ی بیشتری می‌سازد." },
        { id: "catalizzatore", nameIt: "la marmitta catalitica", nameFa: "مبدلِ کاتالیستی", text: "بخشی از گازهای سمی را پیش از بیرون رفتن کم‌خطرتر می‌کند. فقط وقتی داغ است خوب کار می‌کند، و اگر فرسوده شود باید عوض شود." },
        { id: "silenziatore", nameIt: "il silenziatore", nameFa: "صداخفه‌کن", text: "صدای انفجارِ داخلِ موتور را کم می‌کند. آلاینده را کم نمی‌کند؛ کارش صداست (درس‌های صدا)." },
        { id: "co2", nameIt: "l'anidride carbonica (CO₂)", nameFa: "دی‌اکسیدِ کربن", text: "گازِ گلخانه‌ای: به اثرِ گلخانه‌ای و گرم شدنِ زمین کمک می‌کند. سمی نیست، ولی کاتالیست هم کمش نمی‌کند؛ فقط سوختن کمتر کمش می‌کند." },
        { id: "inquinanti", nameIt: "NOx · particolato (PM) · CO", nameFa: "آلاینده‌ها", text: "اکسیدهای نیتروژن، ذره‌های ریز، مونوکسیدِ کربن و سوختِ نسوخته: به ریه و چشم آسیب می‌زنند و در اسموگ و باران اسیدی نقش دارند. به سلامتِ موتور و کاتالیست و سرد یا گرم بودن بستگی دارند، نه فقط به مقدارِ سوخت." },
        { id: "rumore", nameIt: "il rumore", nameFa: "صدا", text: "سومین خروجی. صدا را صداخفه‌کن، لاستیک و شیوه‌ی رانندگی تعیین می‌کنند؛ آلودگیِ صوتی جدا از آلودگیِ هواست." },
      ],
      takeaway: "سوختِ کمتر یعنی CO₂ کمتر. ولی آلاینده‌ها و صدا هر کدام راهِ خودشان را دارند.",
      rule: `${EEA_AIR}; ${TECNICA}`,
    },
    {
      kind: "table",
      title: "چهار چیزِ جدا",
      body:
        "بانک می‌گوید آلودگیِ خودروها «اسموگ، باران اسیدی و اثرِ گلخانه‌ای» را بیشتر می‌کند. هر سه درست‌اند، ولی کارِ گازهای متفاوت‌اند. این جدول آن‌ها را جدا می‌کند:",
      columns: ["چیست", "به چه آسیب می‌زند", "چه کمش می‌کند"],
      rows: [
        { label: "مصرفِ سوخت یا انرژی", it: "consumo di carburante · di energia", values: ["چقدر سوخت یا برق خرج می‌شود", "جیب، و منابع", "رانندگیِ نرم، وزنِ کم، لاستیکِ درست (درس‌های ۱ تا ۴)"] },
        { label: "دی‌اکسیدِ کربن", it: "CO₂ · effetto serra", values: ["گازِ گلخانه‌ای؛ با هر لیتر سوخت بیرون می‌آید", "آب‌وهوای زمین", "سوختِ کمتر؛ کاتالیست کمش نمی‌کند"] },
        { label: "آلاینده‌های هوا", it: "NOx · PM · CO · smog · piogge acide", values: ["گازها و ذره‌های سمی", "ریه و چشم؛ اسموگ؛ باران اسیدی", "موتورِ سالم، کاتالیستِ داغ و سالم، کلاسِ یوروی جدیدتر، سفرِ کوتاهِ کمتر"] },
        { label: "ذره‌های لاستیک، ترمز و جاده", it: "emissioni non allo scarico", values: ["ذره‌هایی که از اگزوز نمی‌آیند", "ریه", "ترمزِ نرم، سرعتِ کمتر؛ در خودروی برقی هم هست"] },
        { label: "صدا", it: "inquinamento acustico", values: ["صدای موتور، اگزوز، لاستیک، بوق", "خواب و سلامت", "درس‌های ۷ و ۸"] },
        { label: "«به رطوبتِ هوا بستگی دارد»", it: "dipende principalmente dall'umidità", values: ["غلط", "—", "آلودگی از سوختن می‌آید، نه از هوا"] },
        {
          label: "یادداشتِ منبع: «بیشترش از اگزوز است»",
          it: "per la maggior parte ai gas di scarico",
          values: [
            "برای گازها درست است و بانک آن را درست می‌داند",
            "—",
            "برای ذره‌ها کامل نیست: آژانسِ محیط‌زیستِ اروپا (EEA، فوریه‌ی ۲۰۲۶) می‌گوید ذره‌های غیرِ اگزوز از ۱۹۹۰ بیشتر شده‌اند. این جمله‌ی بانک را برای امتیاز نمی‌آوریم.",
          ],
        },
      ],
      takeaway: "سوختِ کمتر → CO₂ کمتر. موتور و کاتالیستِ سالم → آلاینده‌ی کمتر. هیچ کدام صدا یا ذره‌ی لاستیک را صفر نمی‌کند.",
      rule: `${EEA_AIR}; ${GUIDA_CO2}`,
    },
    {
      kind: "table",
      title: "یورو، کاتالیست، و قانون",
      body:
        "کلاسِ یورو (روی کارتِ خودرو) حدِ آلاینده‌هایی است که خودروی نو هنگامِ تأیید باید رعایت کند. هر کلاسِ جدیدتر حدِ سخت‌تری دارد. «یورو ۰» یعنی خودروهای پیش از اولین حد، نه «بی‌آلودگی»:",
      columns: ["یعنی چه", "درست یا غلط"],
      rows: [
        { label: "یورو ۰", it: "normativa \"Euro 0\"", values: ["پیش از هر حدِ اروپایی", "«آلودگیِ صفر» غلط است؛ بیشترین آلاینده‌ها را دارد"] },
        { label: "یورو ۴ در برابرِ یورو ۰", it: "\"Euro 4\" … \"Euro 0\"", values: ["یورو ۴ حدِ خیلی سخت‌تری دارد", "«یورو ۴ بیشتر می‌آلاید» غلط است"] },
        { label: "کاتالیستِ فرسوده", it: "marmitta catalitica deteriorata o esausta", values: ["دیگر گازها را کم نمی‌کند", "باید عوض شود؛ برای موتورِ احتراقی"] },
        { label: "دست بردن در موتور و اگزوز", it: "modificare il motore e la marmitta", values: ["بدونِ بازدید و آزمایشِ فنی در Motorizzazione ممنوع است", "جریمه‌ی سنگین و گرفتنِ کارتِ خودرو (ماده‌ی ۷۸)؛ «آزاد است برای کم کردنِ آلودگی» غلط است"] },
        { label: "کارایی", it: "condizioni di massima efficienza", values: ["خودرو باید طوری نگه داشته شود که آلودگی و صدا در حدِ مجاز بمانند", "تغییرِ ساختار: جریمه (ماده‌ی ۷۹)"] },
        {
          label: "یادداشتِ منبع: اگزوزِ بیش از حد",
          it: "troppi gas di scarico inquinanti",
          values: [
            "بانک می‌گوید «جریمه و گرفتنِ کارتِ خودرو»",
            "جریمه را ماده‌ی ۷۹ می‌گوید؛ گرفتنِ کارتِ خودرو را ماده‌ی ۷۸ برای تغییرِ تأییدنشده. متنی که هر دو را مستقیم برای اگزوزِ زیاد بگوید پیدا نکردیم؛ جوابِ بانک را نگه می‌داریم، ولی برای امتیاز نمی‌آوریم.",
          ],
        },
        { label: "محدودیت‌های محلی", it: "limitazioni alla circolazione", values: ["بعضی شهرها و استان‌ها خودروهای یوروی قدیمی را در منطقه یا ساعتی محدود می‌کنند", "قاعده‌ی محلی است، با تاریخ و منطقه‌ی خودش؛ قانونِ سراسری نیست. پیش از رفتن سایتِ همان شهر را ببین"] },
      ],
      takeaway: "یوروی جدیدتر یعنی حدِ سخت‌تر، نه صفر. کاتالیستِ خراب را عوض کن. در موتور و اگزوز بی‌مجوز دست نبر.",
      rule: `${EURO_REG}; ${CDS("78")} c.1, 3–4; ${CDS("79")} c.1, 4`,
    },
    {
      kind: "classify",
      title: "مقایسه کن: کدام بیرون می‌دهد کمتر؟",
      body: `${COMPARE} سؤالِ هر جفت را دقیق بخوان: CO₂ همان آلاینده‌ها نیست:`,
      options: CHOICES,
      items: [
        {
          pair: { a: "خودروی بنزینی که در این سفر کمتر سوخت می‌سوزاند", b: "خودروی بنزینیِ دیگری که در همین سفر بیشتر می‌سوزاند", differs: "مقدارِ سوختی که می‌سوزد" },
          prompt: "کدام دی‌اکسیدِ کربنِ کمتری بیرون می‌دهد؟",
          answer: 0,
          explain: "برای یک نوع سوخت، CO₂ با مقدارِ سوخت بالا و پایین می‌رود (قدمِ ۲).",
        },
        {
          pair: { a: "خودروی بنزینی که در این سفر کمتر سوخت می‌سوزاند، کاتالیستش فرسوده است", b: "خودروی بنزینیِ دیگری که بیشتر می‌سوزاند، کاتالیستش سالم است", differs: "مقدارِ سوخت و سلامتِ کاتالیست، هر دو با هم" },
          prompt: "کدام اکسیدِ نیتروژن (NOx) کمتری بیرون می‌دهد؟",
          answer: 2,
          explain: "این‌جا سوختِ کمتر به‌تنهایی جواب نیست: آلاینده‌ها به سلامتِ کاتالیست و موتور هم بستگی دارند، و این دو با هم عوض شده‌اند (قدمِ ۲).",
        },
        {
          pair: { a: "همان خودرو با کاتالیستِ فرسوده", b: "همان خودرو بعد از تعویضِ کاتالیست", differs: "کاتالیستِ فرسوده یا نو" },
          prompt: "کدام آلاینده‌ی کمتری بیرون می‌دهد؟",
          answer: 1,
          explain: "تنها فرق کاتالیست است؛ کاتالیستِ فرسوده دیگر گازها را کم نمی‌کند (قدمِ ۳).",
        },
        {
          pair: { a: "خودروی یورو ۶", b: "خودروی یورو ۰", differs: "کلاسِ یورو" },
          prompt: "کدام زیرِ حدِ سخت‌تری تأیید شده است؟",
          answer: 0,
          explain: "هر کلاسِ جدیدتر حدِ سخت‌تری دارد؛ یورو ۰ پیش از هر حدی است (قدمِ ۳).",
        },
        {
          pair: { a: "خودروی برقی", b: "خودروی بنزینی، همان مسیر و همان سرعت", differs: "نوعِ خودرو: برقی یا بنزینی" },
          prompt: "کدام گازِ اگزوز ندارد، ولی باز هم ذره‌ی لاستیک و ترمز می‌سازد؟",
          answer: 0,
          explain: "برقی اگزوز ندارد؛ ولی لاستیک و ترمز را هر دو دارند و هر دو ذره می‌سازند (قدمِ ۲).",
        },
      ],
      takeaway: "اول بپرس سؤال درباره‌ی کدام خروجی است: CO₂، آلاینده، ذره‌ی لاستیک یا صدا. جوابِ یکی جوابِ بقیه نیست.",
      rule: EEA_AIR,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il gas di scarico", fa: "گازِ اگزوز" },
        { it: "la combustione", fa: "سوختن (احتراق)" },
        { it: "l'effetto serra", fa: "اثرِ گلخانه‌ای" },
        { it: "lo smog", fa: "اسموگ (دود و مه)" },
        { it: "le piogge acide", fa: "باران اسیدی" },
        { it: "le vie respiratorie", fa: "راه‌های تنفسی" },
        { it: "la normativa antinquinamento", fa: "استانداردِ آلایندگی (یورو)" },
        { it: "omologato", fa: "تأییدشده" },
        { it: "la marmitta", fa: "اگزوز" },
        { it: "le sanzioni amministrative", fa: "جریمه‌ی اداری" },
      ],
    },
    {
      kind: "trap",
      title: "«L'inquinamento … prodotto dai veicoli»: چه چیزی درباره‌اش درست است؟",
      body: "هر دو جمله درباره‌ی آلودگیِ هوای خودروهاست. یکی پیامدهایش را می‌گوید، دیگری آن را در یک کلاسِ قدیمی صفر می‌کند:",
      examples: [
        {
          sourceId: "6806",
          textIt: "L'inquinamento dell'aria prodotto dai veicoli fa aumentare lo smog, le piogge acide e l'effetto serra",
          answer: 1,
          chunks: [
            { it: INQ, fa: INQ_FA },
            { it: "fa aumentare lo smog, le piogge acide e l'effetto serra", fa: "اسموگ، باران اسیدی و اثرِ گلخانه‌ای را بیشتر می‌کند", verb: "fa ← fare" },
          ],
          translation: "آلودگیِ هوای ناشی از وسیله‌ها اسموگ، باران اسیدی و اثرِ گلخانه‌ای را بیشتر می‌کند.",
          why: "درست است. سه پیامد، از گازهای متفاوت: اسموگ و باران اسیدی از آلاینده‌ها، اثرِ گلخانه‌ای از CO₂.",
        },
        {
          sourceId: "6801",
          textIt: "L'inquinamento atmosferico è nullo nei veicoli che rispettano la normativa antinquinamento \"Euro 0\"",
          answer: 0,
          chunks: [
            { it: "L'inquinamento atmosferico è nullo", fa: "آلودگیِ هوا صفر است", focus: "always" },
            { it: "nei veicoli che rispettano la normativa antinquinamento \"Euro 0\"", fa: "در وسیله‌هایی که استانداردِ آلایندگیِ «یورو ۰» را رعایت می‌کنند" },
          ],
          translation: "در وسیله‌هایی که استانداردِ آلایندگیِ «یورو ۰» را رعایت می‌کنند، آلودگیِ هوا صفر است.",
          why: "غلط است. یورو ۰ یعنی پیش از هر حدی؛ هیچ خودروی سوختی آلودگیِ صفر ندارد.",
        },
      ],
      takeaway: "«nullo», «scompare del tutto» درباره‌ی آلودگیِ خودروی سوختی همیشه غلط‌اند.",
      rule: `${EEA_AIR}; ${EURO_REG}`,
    },
  ],
  practice: [
    {
      sourceId: "6805",
      textIt: "L'inquinamento dell'aria prodotto dai veicoli può causare danni alle vie respiratorie e irritazione agli occhi",
      answer: 1,
      chunks: [
        { it: INQ, fa: INQ_FA },
        { it: "può causare danni alle vie respiratorie e irritazione agli occhi", fa: "ممکن است به راه‌های تنفسی آسیب بزند و چشم را بسوزاند", verb: "può ← potere" },
      ],
      translation: "آلودگیِ هوای ناشی از وسیله‌ها ممکن است به راه‌های تنفسی آسیب بزند و چشم را بسوزاند.",
      why: "درست است (قدم ۲). این کارِ آلاینده‌هاست (NOx، ذره‌ها، اوزونِ اسموگ)، نه CO₂.",
      rule: EEA_AIR,
      conceptStep: 2,
    },
    {
      sourceId: "6808",
      textIt: "L'inquinamento atmosferico prodotto dai veicoli dipende principalmente dall'umidità presente nell'aria",
      answer: 0,
      chunks: [
        { it: "L'inquinamento atmosferico prodotto dai veicoli", fa: "آلودگیِ هوای ناشی از وسیله‌ها" },
        { it: "dipende principalmente dall'umidità presente nell'aria", fa: "بیشتر به رطوبتِ هوا بستگی دارد", verb: "dipende ← dipendere", focus: "reason" },
      ],
      translation: "آلودگیِ هوای ناشی از وسیله‌ها بیشتر به رطوبتِ هوا بستگی دارد.",
      why: "غلط است (قدم ۲). آلودگی از سوختنِ سوخت و از سایشِ لاستیک و ترمز می‌آید، نه از رطوبت.",
      rule: EEA_AIR,
      conceptStep: 2,
    },
    {
      sourceId: "6835",
      textIt: "I veicoli che rispettano la normativa antinquinamento \"Euro 4\" emettono una quantità di gas inquinanti maggiore di quelli omologati secondo la normativa \"Euro 0\"",
      answer: 0,
      chunks: [
        { it: "I veicoli che rispettano la normativa antinquinamento \"Euro 4\"", fa: "وسیله‌هایی که استانداردِ آلایندگیِ «یورو ۴» را رعایت می‌کنند" },
        { it: "emettono una quantità di gas inquinanti maggiore", fa: "گازِ آلاینده‌ی بیشتری بیرون می‌دهند", verb: "emettono ← emettere", focus: "contrast" },
        { it: "di quelli omologati secondo la normativa \"Euro 0\"", fa: "از آن‌هایی که با استانداردِ «یورو ۰» تأیید شده‌اند" },
      ],
      translation: "وسیله‌هایی که استانداردِ آلایندگیِ «یورو ۴» را رعایت می‌کنند، از آن‌هایی که با استانداردِ «یورو ۰» تأیید شده‌اند گازِ آلاینده‌ی بیشتری بیرون می‌دهند.",
      why: "غلط است (قدم ۳). وارونه است: هر کلاسِ جدیدتر حدِ سخت‌تری دارد.",
      rule: EURO_REG,
      conceptStep: 3,
    },
    {
      sourceId: "6838",
      textIt: "E' consentito modificare liberamente il motore e la marmitta di un veicolo per diminuire l'inquinamento atmosferico",
      answer: 0,
      chunks: [
        { it: "E' consentito modificare liberamente", fa: "آزادانه می‌شود تغییر داد", focus: "always" },
        { it: "il motore e la marmitta di un veicolo", fa: "موتور و اگزوزِ وسیله را" },
        { it: "per diminuire l'inquinamento atmosferico", fa: "برای کم کردنِ آلودگیِ هوا", focus: "reason" },
      ],
      translation: "برای کم کردنِ آلودگیِ هوا، آزادانه می‌شود موتور و اگزوزِ وسیله را تغییر داد.",
      why: "غلط است (قدم ۳). هر تغییر در موتور یا اگزوز بازدید و آزمایشِ فنی می‌خواهد، حتی با نیتِ خوب (ماده‌ی ۷۸).",
      rule: `${CDS("78")} c.1, 3`,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 2, sourceIds: ["6805", "6806", "6807", "6808"] },
    { step: 3, sourceIds: ["6789", "6801", "6813", "6835", "6837", "6838"] },
  ],
};

export const lessonMotoreSano: Lesson = {
  id: "motore-sano",
  titleFa: "موتورِ سالم، هوای تمیزتر: فیلتر، انژکتور، دود",
  titleIt: "MANUTENZIONE: FILTRO DELL'ARIA · INIETTORI · FUMO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی کدام نگه‌داری واقعاً به آلودگیِ اگزوز ربط دارد (فیلترِ هوا، انژکتورها، موتوری که نامنظم کار می‌کند) و کدام نه (فیلترِ کابین، کلاچ، کمک‌فنر، کم کردنِ بادِ لاستیک). و می‌دانی دودِ بیشتر یا تیره‌تر یعنی موتور باید بررسی شود.",
      why:
        "۱۴ سؤال. بانک کارهای درستِ نگه‌داری را کنارِ کارهایی می‌گذارد که به اگزوز ربطی ندارند: «فیلترِ کابین را عوض کن تا اگزوز تمیز شود»، «کلاچ و دیفرانسیل را مرتب بسنج»، «فیلترِ روغن را هر فصل عوض کن». بپرس: این قطعه در سوختن نقش دارد یا نه؟",
      rule: MANUALE,
    },
    {
      kind: "table",
      title: "در سوختن نقش دارد یا نه؟",
      body:
        "آلاینده‌ها وقتی بیشتر می‌شوند که سوخت ناقص بسوزد: هوای کم، سوختِ بد پاشیده، موتورِ ناسالم. قطعه‌ای که در این کار نقشی ندارد، هرچقدر هم مهم، اگزوز را تمیز نمی‌کند:",
      columns: ["به اگزوز ربط دارد؟", "چرا"],
      rows: [
        { label: "فیلترِ هوا", it: "il filtro dell'aria", values: ["بله", "فیلترِ کثیف یا گرفته هوای موتور را کم می‌کند؛ سر موقع عوضش کن"] },
        { label: "انژکتورها و پمپِ انژکتور (دیزل)", it: "pompa di iniezione ed iniettori", values: ["بله", "انژکتورِ خراب سوخت را بد می‌پاشد؛ مرتب بررسی شود"] },
        { label: "موتورِ نامنظم", it: "funzionamento irregolare del motore", values: ["بله", "سوختنِ ناقص؛ مصرف و آلودگیِ بیشتر"] },
        { label: "مصرف و بازدهِ درست", it: "condizioni ottimali di consumo e rendimento", values: ["بله", "نگه‌داریِ سر موقع، طبقِ دفترچه"] },
        { label: "فیلترِ کابین", it: "il filtro antipolline", values: ["نه", "هوای داخلِ اتاق را برای سرنشین‌ها تمیز می‌کند، نه گازِ اگزوز را"] },
        { label: "فیلترِ روغن «هر فصل»", it: "ad ogni cambio di stagione", values: ["نه", "روغن و فیلترش با فاصله‌ای که دفترچه می‌گوید عوض می‌شوند، نه با فصل"] },
        { label: "کلاچ، دیفرانسیل، کمک‌فنر", it: "frizione · differenziale · ammortizzatori", values: ["نه", "برای ایمنی و راحتی مهم‌اند (کمک‌فنرِ خراب ترمز و فرمان را بد می‌کند)، ولی در سوختن نقشی ندارند"] },
        { label: "کم کردنِ بادِ لاستیک", it: "ridurre la pressione di gonfiaggio", values: ["بدتر", "مصرف و آلودگی را بیشتر می‌کند (درسِ ۱)"] },
      ],
      takeaway: "فیلترِ هوا، انژکتور، موتورِ سالم: بله. فیلترِ کابین، کلاچ، کمک‌فنر: برای چیزهای دیگر مهم‌اند، نه برای اگزوز.",
      rule: `${MANUALE}; ${TECNICA}`,
    },
    {
      kind: "table",
      title: "دود چه می‌گوید",
      body:
        "دود نشانه‌ای است که می‌شود دید. لازم نیست خودت علت را پیدا کنی؛ کافی است بدانی کِی باید موتور را نشانِ تعمیرکار بدهی:",
      columns: ["یعنی", "چه کنی"],
      rows: [
        { label: "دودِ بیشتر از همیشه", it: "maggiore emissione di fumo", values: ["آلودگیِ بیشتر از موتور", "بدهی بررسی کنند"] },
        { label: "دودِ تیره", it: "fumo di colore scuro", values: ["سوختنِ ناقص، آلودگیِ بیشتر", "موتور را بدهی بررسی کنند؛ تا معاینه‌ی فنیِ بعدی صبر نکن"] },
        { label: "معاینه‌ی فنیِ دوره‌ای", it: "revisione", values: ["گازِ اگزوز هم سنجیده می‌شود", "جای نگه‌داریِ منظم را نمی‌گیرد"] },
        { label: "خودروی برقی", it: "veicolo elettrico", values: ["اگزوز و دود ندارد", "نگه‌داری‌اش متفاوت است؛ دفترچه‌ی همان خودرو را ببین. لاستیک و ترمز همان اهمیت را دارند"] },
      ],
      takeaway: "دودِ بیشتر یا تیره‌تر = آلودگیِ بیشتر = موتور را بدهی بررسی کنند.",
      rule: `${MANUALE}; ${CDS("80")} (revisione)`,
    },
    {
      kind: "classify",
      title: "تمرین: آلودگیِ اگزوز را چه می‌کند؟",
      body: `${EXERCISE} این کارها ساختگی‌اند، نه از بانک. برای یک خودروی بنزینی یا دیزلی دسته کن:`,
      options: [
        { it: "la riduce", fa: "کمش می‌کند" },
        { it: "non c'entra", fa: "به اگزوز ربطی ندارد" },
        { it: "la aumenta", fa: "بیشترش می‌کند" },
      ],
      items: [
        { prompt: "فیلترِ هوای گرفته را سر موقع عوض کردن", answer: 0, explain: "موتور هوای کافی می‌گیرد و بهتر می‌سوزاند (قدمِ ۱)." },
        { prompt: "فیلترِ کابین را عوض کردن تا اگزوز تمیزتر شود", answer: 1, explain: "فیلترِ کابین هوای داخل را تمیز می‌کند، نه اگزوز را (قدمِ ۱)." },
        { prompt: "کمک‌فنرهای فرسوده را عوض کردن", answer: 1, explain: "برای ایمنی مهم است، ولی در سوختن نقشی ندارد (قدمِ ۱)." },
        { prompt: "دودِ تیره را تا معاینه‌ی فنیِ سالِ بعد نادیده گرفتن", answer: 2, explain: "تا آن موقع موتور با سوختنِ ناقص می‌آلاید (قدمِ ۲)." },
        { prompt: "انژکتورهای دیزل را طبقِ دفترچه بررسی کردن", answer: 0, explain: "سوخت درست پاشیده می‌شود (قدمِ ۱)." },
        { prompt: "بادِ لاستیک‌ها را کمتر از فشارِ دفترچه کردن", answer: 2, explain: "لاستیکِ کم‌باد مصرف را بالا می‌برد، پس اگزوز هم بیشتر می‌شود (درسِ ۱)." },
      ],
      takeaway: "بپرس: این قطعه در سوختن نقش دارد؟ اگر نه، اگزوز را تمیز نمی‌کند، حتی اگر برای ایمنی لازم باشد.",
      rule: MANUALE,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il filtro dell'aria", fa: "فیلترِ هوا" },
        { it: "intasato", fa: "گرفته (مسدود)" },
        { it: "il filtro antipolline", fa: "فیلترِ کابین" },
        { it: "il filtro dell'olio", fa: "فیلترِ روغن" },
        { it: "gli iniettori", fa: "انژکتورها" },
        { it: "la pompa di iniezione", fa: "پمپِ انژکتور" },
        { it: "il funzionamento irregolare", fa: "کارِ نامنظم" },
        { it: "il fumo di scarico", fa: "دودِ اگزوز" },
        { it: "gli ammortizzatori", fa: "کمک‌فنرها" },
        { it: "il differenziale", fa: "دیفرانسیل" },
      ],
    },
    {
      kind: "trap",
      title: "«filtro»: کدام فیلتر؟",
      body: "هر دو جمله می‌گویند «فیلتر را مرتب عوض کن تا آلودگی کم شود». فرقشان فقط نامِ فیلتر است:",
      examples: [
        {
          sourceId: "6818",
          textIt: "Per diminuire l'inquinamento atmosferico provocato dai veicoli, bisogna far sostituire periodicamente il filtro dell'aria",
          answer: 1,
          chunks: [
            { it: "Per diminuire l'inquinamento atmosferico provocato dai veicoli,", fa: "برای کم کردنِ آلودگیِ هوای ناشی از وسیله‌ها،", focus: "reason" },
            { it: "bisogna far sostituire periodicamente il filtro dell'aria", fa: "باید فیلترِ هوا را مرتب عوض کرد", verb: "bisogna ← bisognare" },
          ],
          translation: "برای کم کردنِ آلودگیِ هوای ناشی از وسیله‌ها، باید فیلترِ هوا را مرتب عوض کرد.",
          why: "درست است. فیلترِ هوای موتور در سوختن نقش دارد.",
        },
        {
          sourceId: "6824",
          textIt: "Per diminuire l'inquinamento dell'aria provocato dai gas di scarico del veicolo, bisogna sostituire periodicamente il filtro antipolline",
          answer: 0,
          chunks: [
            { it: "Per diminuire l'inquinamento dell'aria provocato dai gas di scarico del veicolo,", fa: "برای کم کردنِ آلودگیِ هوای ناشی از گازِ اگزوزِ وسیله،", focus: "reason" },
            { it: "bisogna sostituire periodicamente il filtro antipolline", fa: "باید فیلترِ کابین را مرتب عوض کرد", verb: "bisogna ← bisognare", focus: "contrast" },
          ],
          translation: "برای کم کردنِ آلودگیِ هوای ناشی از گازِ اگزوزِ وسیله، باید فیلترِ کابین را مرتب عوض کرد.",
          why: "غلط است. فیلترِ کابین هوای داخلِ اتاق را تمیز می‌کند؛ با اگزوز کاری ندارد.",
        },
      ],
      takeaway: "«filtro dell'aria» (موتور) بله؛ «filtro antipolline» (کابین) و «filtro dell'olio ogni stagione» برای اگزوز نه.",
      rule: MANUALE,
    },
  ],
  practice: [
    {
      sourceId: "6802",
      textIt: "L'inquinamento dell'aria prodotto dai veicoli aumenta se gli iniettori sono difettosi",
      answer: 1,
      chunks: [
        { it: INQ, fa: INQ_FA },
        { it: "aumenta se gli iniettori sono difettosi", fa: "بیشتر می‌شود اگر انژکتورها خراب باشند", verb: "aumenta ← aumentare", focus: "condition" },
      ],
      translation: "آلودگیِ هوای ناشی از وسیله‌ها بیشتر می‌شود اگر انژکتورها خراب باشند.",
      why: "درست است (قدم ۱). انژکتورِ خراب سوخت را بد می‌پاشد و سوختن ناقص می‌شود.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "6791",
      textIt: "Per diminuire l'inquinamento dell'aria provocato dai veicoli, bisogna controllare spesso gli organi di sospensione (ammortizzatori)",
      answer: 0,
      chunks: [
        { it: DIM, fa: DIM_FA, focus: "reason" },
        { it: "bisogna controllare spesso gli organi di sospensione (ammortizzatori)", fa: "باید سیستمِ تعلیق (کمک‌فنرها) را مرتب بررسی کرد", verb: "bisogna ← bisognare", focus: "contrast" },
      ],
      translation: "برای کم کردنِ آلودگیِ هوای ناشی از وسیله‌ها، باید سیستمِ تعلیق (کمک‌فنرها) را مرتب بررسی کرد.",
      why: "غلط است (قدم ۱). کمک‌فنر برای ایمنی مهم است، ولی در سوختن نقشی ندارد؛ آلودگی را کم نمی‌کند.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "6825",
      textIt: "Per diminuire l'inquinamento dell'aria provocato dai veicoli, bisogna sostituire il filtro dell'olio ad ogni cambio di stagione",
      answer: 0,
      chunks: [
        { it: DIM, fa: DIM_FA, focus: "reason" },
        { it: "bisogna sostituire il filtro dell'olio ad ogni cambio di stagione", fa: "باید فیلترِ روغن را با هر عوض شدنِ فصل عوض کرد", verb: "bisogna ← bisognare", focus: "always" },
      ],
      translation: "برای کم کردنِ آلودگیِ هوای ناشی از وسیله‌ها، باید فیلترِ روغن را با هر عوض شدنِ فصل عوض کرد.",
      why: "غلط است (قدم ۱). فیلترِ روغن با فاصله‌ای که دفترچه می‌گوید عوض می‌شود، نه با فصل؛ و راهِ کم کردنِ آلودگیِ اگزوز نیست.",
      rule: MANUALE,
      conceptStep: 1,
    },
    {
      sourceId: "6804",
      textIt: "L'inquinamento dell'aria prodotto dai veicoli è maggiore se il fumo di scarico presenta colore scuro",
      answer: 1,
      chunks: [
        { it: INQ, fa: INQ_FA },
        { it: "è maggiore se il fumo di scarico presenta colore scuro", fa: "بیشتر است اگر دودِ اگزوز تیره باشد", focus: "condition" },
      ],
      translation: "آلودگیِ هوای ناشی از وسیله‌ها بیشتر است اگر دودِ اگزوز تیره باشد.",
      why: "درست است (قدم ۲). دودِ تیره نشانه‌ی سوختنِ ناقص است؛ موتور را بدهی بررسی کنند.",
      rule: TECNICA,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6790", "6791", "6792", "6795", "6796", "6798", "6802", "6818", "6819", "6824", "6825"] },
    { step: 2, sourceIds: ["6803", "6804", "6820"] },
  ],
};

