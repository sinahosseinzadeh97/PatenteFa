/**
 * src/content/ch21-incidente.ts
 * Chapter 21 (Incidenti stradali e comportamenti), lesson 7: what a driver
 * involved in an accident must do (CdS art. 189: stop, assist the injured, make
 * the road safe, preserve traces as far as safety allows, clear the road when
 * only property is damaged, give your details; the CAI form), and what the
 * bank invents about the warning triangle and the vehicle afterwards.
 *
 * Steps 3–5 are original "what should you do next?" exercises (classify): each
 * shows every fact needed, several actions can be right, and each answer is
 * fixed in this file and explained. They are simplified teaching cases, not
 * emergency instructions, and say so. First aid is chapter 22, not taught here.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter21.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS = (n: string) => `Codice della Strada, art. ${n}`;
const CDS_189 = "Codice della Strada, art. 189";
const CAP_143 = "D.Lgs. 209/2005 (Codice delle assicurazioni private), art. 143 c.1–2";
const CONDUCENTE = "Il conducente coinvolto in un incidente stradale";
const CONDUCENTE_FA = "راننده‌ای که در تصادف درگیر است";
const DOPO = "Dopo un incidente stradale";
const DOPO_FA = "بعد از تصادف";
const DISCLAIMER =
  "تمرینِ آموزشی است، نه سؤالِ بانک؛ موقعیتی ساده‌شده برای فهمیدنِ قانون، نه دستورِ اضطراری برای موقعیتِ واقعیِ تو. در تصادفِ واقعی از دستورهای اپراتورِ شماره‌ی اضطراری و پلیس پیروی کن.";
const ACTIONS = [
  { it: "fallo", fa: "انجامش بده" },
  { it: "non è richiesto", fa: "لازم نیست" },
  { it: "non farlo", fa: "نکن" },
];

export const lessonIncidente: Lesson = {
  id: "incidente-obblighi",
  titleFa: "بعد از تصادف: وظیفه‌های راننده",
  titleIt: "OBBLIGHI DOPO UN INCIDENTE STRADALE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس وظیفه‌های قانونیِ راننده‌ی درگیر در تصادف را می‌دانی: ایستادن، کمک رساندن به زخمی‌ها، امن کردنِ ترافیک، دست نزدن به آثار تا جایی که ایمنی اجازه می‌دهد، باز کردنِ راه وقتی فقط خسارتِ مالی است، و دادنِ مشخصات. و در سه موقعیت می‌بینی که جوابِ درست به واقعیت‌ها بستگی دارد: آیا کسی زخمی شده، خطری مانده، امداد رسیده؟",
      why:
        "۹ سؤال. چهار تا وظیفه‌های واقعی‌اند؛ پنج تا چیزهایی را «اجباری» می‌گویند که نیستند. ترتیبِ کارها هم همیشه یکی نیست: تصادفِ کوچکِ شهری با تصادفِ شبانه‌ی بیرونِ شهر با یک زخمی فرق دارد.",
      rule: `${CDS_189} c.1–7`,
    },
    {
      kind: "table",
      title: "وظیفه‌های راننده‌ی درگیر",
      body:
        "ماده‌ی ۱۸۹ برای هر کسی است که تصادف به رفتارش ربط دارد. شش قاعده، که بعضی به واقعیت‌های صحنه بستگی دارند؛ در موقعیت‌های بعد، «بندِ ۱، ۲…» یعنی بندهای همین ماده:",
      columns: ["قاعده"],
      rows: [
        { label: "بایست", it: "l'obbligo di fermarsi", values: ["همیشه، حتی اگر فقط خسارتِ مالی است. نایستادن با خسارتِ مالی جریمه دارد (و گاهی تعلیقِ گواهینامه)؛ نایستادن وقتی کسی زخمی شده جرم است و حبس دارد."] },
        { label: "کمک برسان", it: "prestare l'assistenza occorrente", values: ["به کسی که آسیبِ جسمی دیده «کمکِ لازم» برسان؛ اگر هنوز کسی خبر نکرده، یعنی دست‌کم کمک خبر کنی. نرساندنِ کمک جرم است. کمک‌های اولیه موضوعِ فصلِ ۲۲ است."] },
        { label: "اول ایمنی، بعد آثار", it: "sicurezza della circolazione · le tracce", values: ["اول هر کاری که ترافیک را امن کند (چراغِ خطر؛ بیرونِ آبادی در شرایطِ لازم مثلث و جلیقه). در کنارش، تا جایی که با ایمنی جور است، نگذار وضعِ صحنه و آثاری که برای فهمیدنِ چگونگیِ تصادف لازم است عوض شود."] },
        { label: "فقط خسارتِ مالی", it: "danni alle sole cose", values: ["اگر کسی زخمی نشده، تا جایی که ممکن است راه را باز کن تا ترافیک گیر نکند. پلیس می‌تواند دستورِ برداشتنِ فوری بدهد."] },
        { label: "مشخصات بده", it: "fornire le proprie generalità", values: ["در هر حال به آسیب‌دیده‌ها مشخصاتِ هویتی و اطلاعاتِ لازم برای خسارت را بده: گواهینامه، پلاک، بیمه. اگر آن‌جا نیستند، از هر راهِ ممکن به دستشان برسان."] },
        { label: "فرمِ توافقی", it: "modulo CAI (constatazione amichevole)", values: ["برای اعلامِ تصادف به بیمه، فرمِ چاپیِ بیمه‌ات (CAI) هست. اگر هر دو راننده امضا کنند، فرض می‌شود تصادف همان‌طور رخ داده که نوشته‌اید. قانون نمی‌گوید باید همان‌جا پرش کنید؛ اعلام به بیمه معمولاً تا سه روز است، مگر بیمه‌نامه مهلتِ دیگری بگوید."] },
      ],
      takeaway: "بایست، امن کن، کمک برسان یا خبر کن، مشخصات بده. با زخمی: صحنه را تا جای ممکن دست نزن. فقط خسارتِ مالی: راه را باز کن.",
      rule: `${CDS_189} c.1–7; ${CAP_143}; Codice civile, art. 1913 (tre giorni)`,
    },
    {
      kind: "table",
      title: "مثلث و خودرو: چیزهایی که اجباری نیستند",
      body:
        "پنج جمله‌ی بانک چیزی را «اجباری» می‌گویند که قانون نمی‌خواهد. قاعده‌ی مثلث همان فصلِ ۱۷ است: بیرونِ آبادی، برای خودروی ایستاده روی سواره‌رو، وقتی شب چراغِ کافی ندارد یا روز از ۱۰۰ متری دیده نمی‌شود؛ روی جاده، دست‌کم ۵۰ متر پشتِ آن.",
      columns: ["چرا غلط است"],
      rows: [
        { label: "روی شیشه‌ی عقب، موقعِ رفتن", it: "sul lunotto posteriore, prima di andar via", values: ["مثلث روی جاده و پشتِ خودرو گذاشته می‌شود، تا وقتی خودرو آن‌جا ایستاده؛ وقتی می‌روی برش می‌داری."] },
        { label: "فقط شب", it: "solo di notte", values: ["روز هم، وقتی خودرو از ۱۰۰ متری دیده نمی‌شود."] },
        { label: "حتی داخلِ آبادی", it: "anche nei centri abitati", values: ["قانون این اجبار را برای بیرونِ آبادی گذاشته است."] },
        { label: "پوشاندنِ خودرو با نایلون", it: "coprire il veicolo con un telo di plastica", values: ["چنین قاعده‌ای وجود ندارد."] },
        { label: "فوراً روی پیاده‌رو", it: "collocare subito il veicolo sul marciapiede", values: ["پیاده‌رو جای عابر است. «فوراً» هم درست نیست: با زخمی، صحنه را تا جایی که ایمنی اجازه می‌دهد دست نزن؛ با خسارتِ مالیِ تنها، راه را باز کن، ولی نه روی پیاده‌رو."] },
      ],
      takeaway: "مثلث: بیرونِ آبادی، روی جاده، پشتِ خودرو، شب یا دیدِ کم. خودرو: نه روی پیاده‌رو، نه «فوراً» بی‌فکر.",
      rule: `${CDS("162")} c.1; DPR 495/1992, art. 357; ${CDS_189} c.2–3`,
    },
    {
      kind: "classify",
      title: "موقعیتِ ۱: تصادفِ کوچک در شهر",
      body: `${DISCLAIMER} داخلِ آبادی، روز. پشتِ چراغ قرمز به عقبِ خودروی جلو زده‌ای. هر دو راننده بیرون آمده‌اند، راه می‌روند و می‌گویند آسیبی ندیده‌اند؛ کسِ دیگری در خودروها نیست. دو خودرو یک خطِ عبور را بسته‌اند و ترافیک از خطِ کناری رد می‌شود. چیزی روی جاده نریخته. برای هر کار بگو:`,
      options: ACTIONS,
      items: [
        { prompt: "می‌ایستی و پیاده می‌شوی", answer: 0, explain: "ایستادن همیشه لازم است، حتی با خسارتِ مالیِ تنها (بندِ ۱)." },
        { prompt: "نام، گواهینامه، پلاک و بیمه را با راننده‌ی دیگر رد و بدل می‌کنی", answer: 0, explain: "در هر حال لازم است (بندِ ۴)." },
        { prompt: "مثلثِ خطر را ۵۰ متر عقب‌تر می‌گذاری", answer: 1, explain: "داخلِ آبادی مثلث اجباری نیست؛ چراغِ خطرِ خودروهای ایستاده آن‌ها را نشان می‌دهد." },
        { prompt: "وقتی جای خودروها را ثبت کردید (مثلاً با عکس)، آن‌ها را کنارِ خیابان می‌برید تا خط باز شود", answer: 0, explain: "کسی زخمی نشده: تا جایی که ممکن است راه را باز کنید (بندِ ۳)." },
        { prompt: "خودروها را روی پیاده‌رو می‌برید", answer: 2, explain: "پیاده‌رو جای عابر است؛ راه باز کردن یعنی کنارِ سواره‌رو یا جای مجاز." },
        { prompt: "همان‌جا فرمِ توافقی را پر می‌کنید", answer: 1, explain: "می‌توانید، ولی اجباری نیست همان‌جا باشد؛ لازم، رد و بدل کردنِ مشخصات و اعلام به بیمه است." },
        { prompt: "چون کسی آسیب ندیده، بدونِ دادنِ مشخصات می‌روی", answer: 2, explain: "نایستادن و ندادنِ مشخصات با خسارتِ مالی هم جریمه دارد (بندِ ۴ و ۵)." },
      ],
      takeaway: "بی‌زخمی و در شهر: بایست، مشخصات بده، راه را باز کن. مثلث و فرم اختیاری‌اند؛ پیاده‌رو و رفتن ممنوع.",
      rule: `${CDS_189} c.1, c.3–5; ${CDS("162")} c.1`,
    },
    {
      kind: "classify",
      title: "موقعیتِ ۲: بیرونِ آبادی، شب، یک زخمی",
      body: `${DISCLAIMER} بیرونِ آبادی، شب، جاده‌ی بی‌چراغ. خودروی تو با خودرویی دیگر تصادف کرده و هر دو در خطِ عبور ایستاده‌اند. سرنشینِ خودروی دیگر می‌گوید گردنش درد می‌کند و در خودرو نشسته است. هنوز کسی کمک خبر نکرده و هیچ امدادگر یا پلیسی آن‌جا نیست. نشتی یا آتشی نمی‌بینی. برای هر کار بگو:`,
      options: ACTIONS,
      items: [
        { prompt: "چراغِ خطر را روشن می‌کنی، جلیقه‌ی شب‌نما می‌پوشی و مثلث را دست‌کم ۵۰ متر عقب‌تر می‌گذاری", answer: 0, explain: "بیرونِ آبادی و شب: مثلث و جلیقه لازم‌اند (فصلِ ۱۷)؛ اول ایمنیِ ترافیک (بندِ ۲)." },
        { prompt: "با شماره‌ی اضطراری تماس می‌گیری: ۱۱۲ (شماره‌ی اضطراریِ اروپایی) یا ۱۱۸ (اورژانس)", answer: 0, explain: "هنوز کسی خبر نکرده؛ خبر کردن بخشِ اصلیِ «کمکِ لازم» است. ۱۱۲ هنوز در همه‌ی منطقه‌های ایتالیا مرکزِ واحد ندارد، ولی هر دو شماره به امداد می‌رسند." },
        { prompt: "پیش از رسیدنِ پلیس خودروها را جابه‌جا می‌کنی تا جاده تمیز شود", answer: 2, explain: "کسی زخمی شده: تا جایی که ایمنی اجازه می‌دهد صحنه و آثار را عوض نکن (بندِ ۲). ترافیک را با چراغِ خطر و مثلث امن کرده‌ای." },
        { prompt: "چون حالِ زخمی بد به نظر نمی‌رسد، مشخصاتت را می‌دهی و می‌روی", answer: 2, explain: "با زخمی، رفتن و کمک نرساندن جرم است (بندِ ۶ و ۷)." },
        { prompt: "وقتی ترافیک امن شد و امداد خبر شد، مشخصات و بیمه را با راننده‌ی دیگر رد و بدل می‌کنی", answer: 0, explain: "در هر حال لازم است (بندِ ۴)." },
        { prompt: "قبل از هر کاری فرمِ توافقی را پر می‌کنی", answer: 1, explain: "الان اولویت ایمنی و کمک است؛ فرم بعداً هم ممکن است و اجباری نیست." },
      ],
      takeaway: "با زخمی و بی‌امداد: اول امن کن، بعد خبر کن، بمان و صحنه را دست نزن. فرم و جابه‌جایی صبر می‌کنند.",
      rule: `${CDS_189} c.1–2, c.4, c.6–7; ${CDS("162")} c.1, c.4-ter`,
    },
    {
      kind: "classify",
      title: "موقعیتِ ۳: تصادفِ دیگران، امداد رسیده",
      body: `${DISCLAIMER} بیرونِ آبادی، روز، دیدِ خوب. جلوتر دو خودروی دیگر تصادف کرده‌اند؛ تو درگیر نبوده‌ای. آمبولانس و پلیس از قبل آن‌جا هستند و پلیس با دست ترافیک را هدایت می‌کند. برای هر کار بگو:`,
      options: ACTIONS,
      items: [
        { prompt: "آهسته می‌کنی و از علامت‌های پلیس پیروی می‌کنی", answer: 0, explain: "دستورِ مأمورِ پلیس بر تابلو و چراغ مقدم است (فصلِ ۷)." },
        { prompt: "می‌ایستی تا کمک کنی، چون آن‌جا زخمی هست", answer: 1, explain: "تو درگیر نیستی و امداد و پلیس از قبل آن‌جا هستند؛ کمک و خبر دادن انجام شده. اگر امدادی نبود، دست‌کم خبر کردن لازم بود." },
        { prompt: "کنارِ صحنه آهسته می‌کنی تا با گوشی فیلم بگیری", answer: 2, explain: "حواس‌پرتی در ترافیکِ کند همان علتِ تصادف از پشت است (درسِ ۲)؛ رفتاری که برای دیگران خطر دارد ممنوع است." },
        { prompt: "فاصله‌ات را با خودروی جلو بیشتر می‌کنی، چون صفِ کنارِ تصادف ناگهان می‌ایستد", answer: 0, explain: "همان قاعده‌ی تصادف از پشت (درسِ ۲): فاصله زمان می‌دهد که به‌موقع بایستی." },
        { prompt: "چون پلیس آن‌جاست، با فاصله‌ی کم پشتِ صف می‌روی", answer: 2, explain: "صفِ کنارِ تصادف ناگهان می‌ایستد؛ فاصله‌ی ایمنی همیشه لازم است." },
      ],
      takeaway: "درگیر نیستی و امداد رسیده: آهسته و با فاصله از کنارش رد شو و از پلیس پیروی کن. توقف و تماشا کمک نیست.",
      rule: `${CDS("140")} c.1; ${CDS("43")}; Codice penale, art. 593 c.2 (assistenza o avviso all'Autorità)`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'incidente stradale", fa: "تصادف" },
        { it: "il conducente coinvolto", fa: "راننده‌ی درگیر در تصادف" },
        { it: "i feriti", fa: "زخمی‌ها" },
        { it: "prestare assistenza", fa: "کمک رساندن" },
        { it: "le generalità", fa: "مشخصاتِ هویتی" },
        { it: "le tracce", fa: "آثارِ تصادف" },
        { it: "la dinamica dell'incidente", fa: "چگونگیِ رخ دادنِ تصادف" },
        { it: "il modulo CAI (constatazione amichevole)", fa: "فرمِ توافقیِ تصادف (CAI)" },
        { it: "la denuncia all'assicurazione", fa: "اعلامِ تصادف به بیمه" },
        { it: "il segnale mobile di pericolo", fa: "مثلثِ خطر" },
        { it: "il lunotto posteriore", fa: "شیشه‌ی عقب" },
      ],
    },
    {
      kind: "trap",
      title: "«obbligo»: وظیفه‌ی واقعی یا ساختگی؟",
      body: "هر دو جمله از «اجبار» حرف می‌زنند. یکی وظیفه‌ی واقعیِ ماده‌ی ۱۸۹ است؛ دیگری شرطی ساختگی به مثلث اضافه می‌کند:",
      examples: [
        {
          sourceId: "6426",
          textIt: "Il conducente coinvolto in un incidente stradale ha l'obbligo di fermarsi e di prestare assistenza agli eventuali feriti",
          answer: 1,
          chunks: [
            { it: CONDUCENTE, fa: CONDUCENTE_FA },
            { it: "ha l'obbligo di fermarsi", fa: "موظف است بایستد", verb: "ha ← avere", focus: "always" },
            { it: "e di prestare assistenza agli eventuali feriti", fa: "و به زخمی‌های احتمالی کمک برساند" },
          ],
          translation: "راننده‌ای که در تصادف درگیر است موظف است بایستد و به زخمی‌های احتمالی کمک برساند.",
          why: "درست است. همان بندِ ۱ ماده‌ی ۱۸۹.",
        },
        {
          sourceId: "6432",
          textIt: "Dopo un incidente stradale è obbligatorio, solo di notte, apporre il segnale mobile di pericolo in prossimità del veicolo",
          answer: 0,
          chunks: [
            { it: DOPO, fa: DOPO_FA },
            { it: "è obbligatorio, solo di notte,", fa: "فقط شب اجباری است", verb: "è ← essere", focus: "limit" },
            { it: "apporre il segnale mobile di pericolo in prossimità del veicolo", fa: "مثلثِ خطر را نزدیکِ خودرو گذاشتن" },
          ],
          translation: "بعد از تصادف، فقط شب اجباری است که مثلثِ خطر را نزدیکِ خودرو بگذاری.",
          why: "غلط است. مثلث روز هم لازم است وقتی خودرو از ۱۰۰ متری دیده نمی‌شود؛ و جایش دست‌کم ۵۰ متر پشتِ خودروست، نه «نزدیکِ» آن.",
        },
      ],
      takeaway: "در جمله‌های «obbligatorio» بعد از تصادف، شرط را بسنج: «فقط شب»، «حتی در شهر»، «روی شیشه»، «فوراً» نشانه‌ی جمله‌ی ساختگی‌اند.",
      rule: `${CDS_189} c.1; ${CDS("162")} c.1`,
    },
  ],
  practice: [
    {
      sourceId: "6427",
      textIt: "Il conducente coinvolto in un incidente stradale deve fornire le proprie generalità e gli estremi della patente, della targa e dell'assicurazione del veicolo alle persone danneggiate",
      answer: 1,
      chunks: [
        { it: CONDUCENTE, fa: CONDUCENTE_FA },
        { it: "deve fornire le proprie generalità", fa: "باید مشخصاتِ هویتیِ خود را بدهد", verb: "deve ← dovere" },
        { it: "e gli estremi della patente, della targa e dell'assicurazione del veicolo", fa: "و اطلاعاتِ گواهینامه، پلاک و بیمه‌ی خودرو را" },
        { it: "alle persone danneggiate", fa: "به کسانی که آسیب دیده‌اند" },
      ],
      translation: "راننده‌ای که در تصادف درگیر است باید مشخصاتِ هویتیِ خود و اطلاعاتِ گواهینامه، پلاک و بیمه‌ی خودرو را به کسانی که آسیب دیده‌اند بدهد.",
      why: "درست است (قدم ۱). بندِ ۴: در هر حال، مشخصات و اطلاعاتِ لازم برای خسارت.",
      rule: `${CDS_189} c.4`,
      conceptStep: 1,
    },
    {
      sourceId: "6428",
      textIt: "Il conducente coinvolto in un incidente stradale deve evitare che vengano modificate le tracce, se occorre ricostruire la dinamica dell'incidente",
      answer: 1,
      chunks: [
        { it: CONDUCENTE, fa: CONDUCENTE_FA },
        { it: "deve evitare che vengano modificate le tracce,", fa: "باید نگذارد آثار عوض شوند", verb: "deve ← dovere" },
        { it: "se occorre ricostruire la dinamica dell'incidente", fa: "اگر لازم باشد چگونگیِ تصادف بازسازی شود", focus: "condition" },
      ],
      translation: "راننده‌ای که در تصادف درگیر است، اگر لازم باشد چگونگیِ تصادف بازسازی شود، باید نگذارد آثار عوض شوند.",
      why: "درست است (قدم ۱). بندِ ۲: تا جایی که با ایمنیِ ترافیک جور است، صحنه و آثار را حفظ کن.",
      rule: `${CDS_189} c.2`,
      conceptStep: 1,
    },
    {
      sourceId: "6434",
      textIt: "Dopo un incidente stradale, è obbligatorio segnalare il veicolo fermo con il segnale mobile di pericolo anche nei centri abitati",
      answer: 0,
      chunks: [
        { it: "Dopo un incidente stradale,", fa: "بعد از تصادف،" },
        { it: "è obbligatorio segnalare il veicolo fermo con il segnale mobile di pericolo", fa: "اجباری است خودروی ایستاده را با مثلثِ خطر نشان بدهی", verb: "è ← essere" },
        { it: "anche nei centri abitati", fa: "حتی داخلِ آبادی", focus: "contrast" },
      ],
      translation: "بعد از تصادف، اجباری است خودروی ایستاده را حتی داخلِ آبادی با مثلثِ خطر نشان بدهی.",
      why: "غلط است (قدم ۲). قانون مثلث را برای بیرونِ آبادی اجباری می‌کند (فصلِ ۱۷).",
      rule: `${CDS("162")} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "6433",
      textIt: "Dopo un incidente stradale è obbligatorio collocare subito il veicolo sul marciapiede",
      answer: 0,
      chunks: [
        { it: DOPO, fa: DOPO_FA },
        { it: "è obbligatorio collocare subito il veicolo sul marciapiede", fa: "اجباری است خودرو را فوراً روی پیاده‌رو ببری", verb: "è ← essere", focus: "contrast" },
      ],
      translation: "بعد از تصادف اجباری است خودرو را فوراً روی پیاده‌رو ببری.",
      why: "غلط است (قدم ۲). پیاده‌رو جای عابر است؛ و با زخمی، صحنه را تا جای ممکن دست نمی‌زنی.",
      rule: `${CDS_189} c.2–3`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6426", "6427", "6428", "6429"] },
    { step: 2, sourceIds: ["6430", "6431", "6432", "6433", "6434"] },
  ],
};
