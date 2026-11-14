/**
 * src/content/ch16-definizioni.ts
 * Chapter 16 (Fermata, sosta, arresto), lesson 1: the four kinds of stop the
 * law names (CdS art. 157 c.1: arresto, fermata, sosta, sosta di emergenza),
 * the numbers the bank invents for them, and what a fermata requires of the
 * driver (present, ready to leave, no obstruction).
 *
 * Chapter 3 L11 (`divieto-sosta-fermata`) uses the same three words to read
 * the two signs; this lesson is about the words themselves and is linked from
 * there, not copied. Trust rules as in src/content/lessons.ts; checked by
 * tests/chapter16.test.ts and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_157 = "Codice della Strada, art. 157";
const FERMATA = "La fermata di un veicolo è la temporanea sospensione della marcia";
const FERMATA_FA = "توقف کوتاهِ یک وسیله یعنی قطعِ موقتِ حرکت";
const DURANTE = "Durante la fermata il conducente";
const DURANTE_FA = "در توقف کوتاه، راننده";

export const lessonFermataSostaDefinizioni: Lesson = {
  id: "fermata-sosta-definizioni",
  titleFa: "چهار جور ایستادن",
  titleIt: "ARRESTO · FERMATA · SOSTA · SOSTA DI EMERGENZA",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس چهار کلمه‌ی قانون را از هم جدا می‌کنی: arresto (ایستادن به خاطرِ ترافیک)، fermata (توقف کوتاه)، sosta (پارک) و sosta di emergenza (توقفِ اضطراری)، و می‌دانی در توقف کوتاه راننده چه باید بکند.",
      why:
        "۲۵ سؤال، و بقیه‌ی فصل روی همین چهار کلمه ساخته شده: هر قاعده‌ی بعدی می‌گوید «توقف کوتاه هم ممنوع است» یا «فقط پارک». دامِ اصلیِ بانک عددهای ساختگی است («حداکثر ده دقیقه»، «بیش از یک مسافر») و جابه‌جا کردنِ دلیلِ ایستادن.",
      rule: `${CDS_157} c.1`,
    },
    {
      kind: "table",
      title: "چرا ایستاده‌ای؟",
      body:
        "قانون ایستادن را با دلیلش نام‌گذاری می‌کند، نه با مدتش. اول بپرس «چه کسی یا چه چیزی مجبورم کرد بایستم؟»، بعد «راننده می‌تواند برود یا نه؟». در فصلِ ۳ (درسِ ۱۱) همین سه کلمه را برای خواندنِ تابلوها دیدی؛ این‌جا خودِ تعریف‌ها را دقیق می‌کنیم. در آزادراه، روی سواره‌رو، رمپ و تقاطع‌های غیرهم‌سطح، توقف کوتاه و پارک هر دو ممنوع‌اند، جز در اضطرار.",
      columns: ["چرا می‌ایستی", "راننده", "دامِ بانک"],
      rows: [
        {
          label: "ایستادن",
          it: "l'arresto",
          values: [
            "ترافیک مجبورت می‌کند: چراغِ قرمز، صف، عابری که رد می‌شود",
            "پشتِ فرمان",
            "«به خاطرِ نیازِ راننده یا مسافر» نه؛ آن توقف کوتاه است",
          ],
        },
        {
          label: "توقف کوتاه",
          it: "la fermata",
          values: [
            "به انتخابِ خودت، برای کارِ خیلی کوتاه: سوار و پیاده کردنِ کسی، پرسیدنِ نشانی از مأمور",
            "سرِ جایش، آماده‌ی حرکت",
            "«حداکثر ده دقیقه» یا «بیش از یک مسافر ممنوع» نه؛ قانون عدد ندارد. «به خاطرِ ترافیک» هم نه؛ آن ایستادن است",
          ],
        },
        {
          label: "پارک",
          it: "la sosta",
          values: ["ایستادنی که طول می‌کشد", "می‌تواند از خودرو دور شود", "«بیش از سه ساعت نه» نه؛ پارک سقفِ عمومی ندارد"],
        },
        {
          label: "توقفِ اضطراری",
          it: "la sosta di emergenza",
          values: [
            "خودرو خراب شده و راه نمی‌رود، یا حالِ راننده یا مسافری بد شده",
            "هر کاری که اضطرار لازم دارد؛ در آزادراه سه ساعت سقف دارد",
            "«برای پیاده یا سوار کردنِ معلول» یا «به خاطرِ ترافیک» نه",
          ],
        },
      ],
      takeaway: "ترافیک = ایستادن. کارِ کوتاه و راننده سرِ جایش = توقف کوتاه. راننده می‌رود = پارک. خرابی یا حالِ بد = توقفِ اضطراری.",
      rule: `${CDS_157} c.1 lett. a–d; Codice della Strada, art. 176 c.5–6`,
    },
    {
      kind: "table",
      title: "توقف کوتاه چه شرطی دارد",
      body:
        "توقف کوتاه همه‌جا که ممنوع نباشد مجاز است، ولی سه شرط دارد. اگر یکی را نقض کنی، دیگر توقف کوتاهِ مجاز نیست.",
      columns: ["شرط"],
      rows: [
        { label: "مزاحمِ ترافیک نباشد", it: "non deve arrecare intralcio", values: ["جریانِ عادیِ ترافیک را نبندد و خطری برای دیگران نسازد"] },
        { label: "راننده بماند", it: "il conducente deve essere presente", values: ["پشتِ فرمان و آماده‌ی حرکت؛ حتی «یک لحظه» هم دور نمی‌شود. اگر دور شدی، دیگر توقف کوتاه نیست، پارک است"] },
        { label: "احتیاط", it: "le opportune cautele", values: ["هر احتیاطی که از تصادف جلوگیری کند، مثلِ پارک"] },
        {
          label: "پرسیدن از مأمور",
          it: "chiedere informazioni agli agenti",
          values: ["دلیلِ درستی برای توقف کوتاه است، ولی «همیشه» نه: اگر ترافیک را کند یا مزاحم کند، مجاز نیست"],
        },
      ],
      takeaway: "توقف کوتاه = کوتاه، بی‌مزاحمت، راننده سرِ جایش. «همیشه مجاز» و «یک لحظه دور شدن» هر دو دام‌اند.",
      rule: `${CDS_157} c.1 lett. b; Codice della Strada, art. 158 c.4`,
    },
    {
      kind: "classify",
      title: "کدام کلمه؟",
      body: "هر موقعیت را بخوان و بگو قانون اسمش را چه می‌گذارد. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "ARRESTO", fa: "ایستادن به خاطرِ ترافیک" },
        { it: "FERMATA", fa: "توقف کوتاه" },
        { it: "SOSTA", fa: "پارک" },
        { it: "SOSTA DI EMERGENZA", fa: "توقفِ اضطراری" },
      ],
      items: [
        { prompt: "پشتِ خطِ ایست ایستاده‌ای چون عابری از گذرگاه رد می‌شود.", answer: 0, explain: "ترافیک مجبورت کرده: ایستادن." },
        { prompt: "کنارِ خیابان می‌ایستی تا مادرت با سه کیسه خرید پیاده شود؛ پشتِ فرمان می‌مانی.", answer: 1, explain: "کوتاه، ارادی، راننده سرِ جایش. تعدادِ مسافر و کیسه فرقی نمی‌کند." },
        { prompt: "از پنجره از مأمورِ پلیس نشانی می‌پرسی؛ پشتت خیابان خالی است.", answer: 1, explain: "کارِ خیلی کوتاه و بی‌مزاحمت: توقف کوتاه." },
        { prompt: "موتور را خاموش می‌کنی و دو دقیقه می‌روی نامه‌ای در صندوق بیندازی.", answer: 2, explain: "از خودرو دور شدی؛ مدتش هرچه باشد، پارک است." },
        { prompt: "تسمه‌ی موتور پاره شده و خودرو دیگر راه نمی‌رود.", answer: 3, explain: "خودرو به خاطرِ خرابی قابلِ استفاده نیست: توقفِ اضطراری." },
        { prompt: "مسافرِ کنارت ناگهان حالش بد می‌شود و می‌ایستی.", answer: 3, explain: "حالِ بدِ راننده یا مسافر هم توقفِ اضطراری است." },
      ],
      takeaway: "مدت را فراموش کن. دلیل را بپرس، و این‌که راننده می‌رود یا می‌ماند.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'arresto", fa: "ایستادن به خاطرِ ترافیک" },
        { it: "la fermata", fa: "توقف کوتاه" },
        { it: "la sosta", fa: "پارک" },
        { it: "la sosta di emergenza", fa: "توقفِ اضطراری" },
        { it: "la sospensione della marcia", fa: "قطعِ حرکت", note: "«temporanea» = موقت، «protratta nel tempo» = طولانی." },
        { it: "le esigenze della circolazione", fa: "ضرورت‌های ترافیک", note: "دلیلِ ایستادن (arresto)." },
        { it: "di brevissima durata", fa: "خیلی کوتاه" },
        { it: "l'avaria", fa: "خرابیِ فنی" },
        { it: "il malessere fisico", fa: "حالِ بدِ جسمی" },
        { it: "arrecare intralcio", fa: "مزاحمت ایجاد کردن", base: "arrecare" },
      ],
    },
    {
      kind: "trap",
      title: "ترافیک یا انتخابِ خودت؟",
      body: "هر دو جمله با «L'arresto è» شروع می‌شوند. فقط دلیلِ ایستادن عوض شده:",
      examples: [
        {
          sourceId: "5320",
          textIt: "L'arresto è l'interruzione della marcia del veicolo dovuta ad esigenze della circolazione, come ad esempio ad un semaforo rosso",
          answer: 1,
          chunks: [
            { it: "L'arresto è", fa: "ایستادن (arresto) یعنی", verb: "è ← essere" },
            { it: "l'interruzione della marcia del veicolo", fa: "قطعِ حرکتِ وسیله" },
            { it: "dovuta ad esigenze della circolazione,", fa: "به خاطرِ ضرورت‌های ترافیک،", focus: "reason" },
            { it: "come ad esempio ad un semaforo rosso", fa: "مثلاً پشتِ چراغِ قرمز" },
          ],
          translation: "ایستادن (arresto) یعنی قطعِ حرکتِ وسیله به خاطرِ ضرورت‌های ترافیک، مثلاً پشتِ چراغِ قرمز.",
          why: "درست است. ترافیک مجبورت کرده، نه انتخابِ خودت.",
        },
        {
          sourceId: "5324",
          textIt: "L'arresto è la temporanea sospensione della marcia per esigenze del conducente o dei passeggeri di un veicolo",
          answer: 0,
          chunks: [
            { it: "L'arresto è", fa: "ایستادن (arresto) یعنی", verb: "è ← essere" },
            { it: "la temporanea sospensione della marcia", fa: "قطعِ موقتِ حرکت" },
            { it: "per esigenze del conducente o dei passeggeri di un veicolo", fa: "به خاطرِ نیازِ راننده یا مسافرانِ یک وسیله", focus: "reason" },
          ],
          translation: "ایستادن (arresto) یعنی قطعِ موقتِ حرکت به خاطرِ نیازِ راننده یا مسافرانِ یک وسیله.",
          why: "غلط است. این تعریفِ توقف کوتاه (fermata) است. arresto را ترافیک تحمیل می‌کند.",
        },
      ],
      takeaway: "«esigenze della circolazione» = ایستادن. «esigenze del conducente / dei passeggeri» یا «salita e discesa» = توقف کوتاه.",
      rule: `${CDS_157} c.1 lett. a–b`,
    },
  ],
  practice: [
    {
      sourceId: "5322",
      textIt:
        "La fermata di un veicolo è la temporanea sospensione della marcia per esigenze di brevissima durata, come ad esempio per chiedere informazioni agli agenti del traffico",
      answer: 1,
      chunks: [
        { it: FERMATA, fa: FERMATA_FA, verb: "è ← essere" },
        { it: "per esigenze di brevissima durata,", fa: "برای کاری خیلی کوتاه،", focus: "reason" },
        { it: "come ad esempio per chiedere informazioni agli agenti del traffico", fa: "مثلاً برای پرسیدن از مأمورانِ راهنمایی" },
      ],
      translation: "توقف کوتاهِ یک وسیله یعنی قطعِ موقتِ حرکت برای کاری خیلی کوتاه، مثلاً پرسیدن از مأمورانِ راهنمایی.",
      why: "درست است (قدم ۱). دلیلش انتخابِ خودت است و کار خیلی کوتاه: توقف کوتاه.",
      rule: `${CDS_157} c.1 lett. b`,
      conceptStep: 1,
    },
    {
      sourceId: "5326",
      textIt: "La fermata per esigenze del conducente può avere la durata massima di dieci minuti",
      answer: 0,
      chunks: [
        { it: "La fermata per esigenze del conducente", fa: "توقف کوتاه به خاطرِ نیازِ راننده" },
        { it: "può avere la durata massima di dieci minuti", fa: "می‌تواند حداکثر ده دقیقه طول بکشد", verb: "può ← potere", focus: "limit" },
      ],
      translation: "توقف کوتاه به خاطرِ نیازِ راننده می‌تواند حداکثر ده دقیقه طول بکشد.",
      why: "غلط است (قدم ۱). قانون برای توقف کوتاه عدد نمی‌گذارد؛ «خیلی کوتاه» است و راننده سرِ جایش می‌ماند. ده دقیقه عددِ ساختگیِ بانک است.",
      rule: `${CDS_157} c.1 lett. b`,
      conceptStep: 1,
    },
    {
      sourceId: "5469",
      textIt:
        "La sosta di emergenza è l'interruzione della marcia nel caso in cui il veicolo deve arrestarsi per malessere fisico del conducente o di un passeggero",
      answer: 1,
      chunks: [
        { it: "La sosta di emergenza è", fa: "توقفِ اضطراری یعنی", verb: "è ← essere" },
        { it: "l'interruzione della marcia", fa: "قطعِ حرکت" },
        { it: "nel caso in cui il veicolo deve arrestarsi", fa: "وقتی وسیله باید بایستد", verb: "deve arrestarsi ← arrestarsi", focus: "condition" },
        { it: "per malessere fisico del conducente o di un passeggero", fa: "به خاطرِ حالِ بدِ جسمیِ راننده یا یک مسافر", focus: "reason" },
      ],
      translation: "توقفِ اضطراری یعنی قطعِ حرکت وقتی وسیله باید بایستد چون حالِ جسمیِ راننده یا یک مسافر بد شده.",
      why: "درست است (قدم ۱). قانون دو دلیل برای توقفِ اضطراری می‌شمارد: خرابیِ خودرو و حالِ بدِ راننده یا مسافر.",
      rule: `${CDS_157} c.1 lett. d`,
      conceptStep: 1,
    },
    {
      sourceId: "5331",
      textIt: "Durante la fermata il conducente deve essere sempre presente e pronto a riprendere la marcia",
      answer: 1,
      chunks: [
        { it: DURANTE, fa: DURANTE_FA },
        { it: "deve essere sempre presente", fa: "باید همیشه حاضر باشد", verb: "deve ← dovere", focus: "always" },
        { it: "e pronto a riprendere la marcia", fa: "و آماده‌ی ادامه‌ی حرکت" },
      ],
      translation: "در توقف کوتاه، راننده باید همیشه حاضر و آماده‌ی ادامه‌ی حرکت باشد.",
      why: "درست است (قدم ۲). همین است که توقف کوتاه را از پارک جدا می‌کند.",
      rule: `${CDS_157} c.1 lett. b`,
      conceptStep: 2,
    },
    {
      sourceId: "5334",
      textIt: "Durante la fermata il conducente può allontanarsi per brevissimo tempo prima di riprendere la marcia",
      answer: 0,
      chunks: [
        { it: DURANTE, fa: DURANTE_FA },
        { it: "può allontanarsi per brevissimo tempo", fa: "می‌تواند برای مدتِ خیلی کوتاهی دور شود", verb: "può allontanarsi ← allontanarsi", focus: "contrast" },
        { it: "prima di riprendere la marcia", fa: "پیش از ادامه‌ی حرکت" },
      ],
      translation: "در توقف کوتاه، راننده می‌تواند پیش از ادامه‌ی حرکت برای مدتِ خیلی کوتاهی دور شود.",
      why: "غلط است (قدم ۲). در توقف کوتاه راننده دور نمی‌شود، حتی یک لحظه. اگر دور شد، کارش پارک است.",
      rule: `${CDS_157} c.1 lett. b–c`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // the four definitions, the bank's invented limits, the motorway emergency
      sourceIds: ["5320", "5321", "5322", "5323", "5324", "5325", "5326", "5327", "5363", "5376", "5377", "5468", "5469", "5470", "5471", "5472"],
    },
    {
      step: 2,
      // what a fermata requires of the driver
      sourceIds: ["5328", "5329", "5330", "5331", "5332", "5333", "5334", "5335", "5336"],
    },
  ],
};
