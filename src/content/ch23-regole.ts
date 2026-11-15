/**
 * src/content/ch23-regole.ts
 * Chapter 23 (Responsabilità civile, penale e assicurazione), lessons 11–12:
 * the bank's «psicologia del traffico» group (611), second half.
 *
 *  L11 judging yourself (do not overestimate; risk you cannot handle; passengers
 *      who push) and others (watch ahead and the edges, expect others' mistakes;
 *      at a junction, if unsure, stop and wait; where to look; the right mirror).
 *  L12 why rules hold always: safety for everyone, flow, every vehicle; not only
 *      when the fine is high, in heavy traffic or for weak users; and three
 *      alcohol myths, linked to chapter 22 by lesson title.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter23.test.ts.
 */
import type { Lesson } from "./lessons.js";
import { CDS, DISCLAIMER } from "./ch23-common.js";

const CDS_140 = `${CDS("140")} (principio informatore della circolazione)`;
const NORME = "Il rispetto delle norme di circolazione";
const NORME_FA = "رعایتِ قاعده‌های رفت‌وآمد";
const ALTRI = "il comportamento degli altri utenti della strada";

export const lessonValutare: Lesson = {
  id: "valutare-se-e-gli-altri",
  titleFa: "خودت را درست بسنج، دیگران را پیش‌بینی کن",
  titleIt: "PSICOLOGIA DEL TRAFFICO: SÉ STESSI E GLI ALTRI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی چرا راننده همیشه توانِ خودش را درست نمی‌سنجد و چه کاری جلوی خطای «من از پسش برمی‌آیم» را می‌گیرد. و یاد می‌گیری دیگران را هم بخوانی: جلو و کناره‌ها را ببینی، اشتباهِ آن‌ها را پیش‌بینی کنی، و در تقاطع وقتی مطمئن نیستی بایستی.",
      why:
        "۱۳ سؤال. جمله‌ی غلط یا راننده را بی‌نیاز از دیگران نشان می‌دهد («رفتارِ دیگران بی‌اثر است»، «اگر قانون را رعایت نمی‌کنند، حسابشان نکن»)، یا راه‌حلی خطرناک می‌دهد («سریع‌تر برس تا اول رد شوی»، «فقط سه متر جلو را ببین»، «به خواسته‌ی سرنشین تندتر برو»).",
      rule: CDS_140,
    },
    {
      kind: "table",
      title: "خودت را بسنج",
      body:
        "بیشترِ ما توانِ رانندگیِ خودمان را بیشتر از آنچه هست حساب می‌کنیم، و گاهی بی‌آن‌که بفهمیم واردِ موقعیتی می‌شویم که از توانمان بیشتر است:",
      columns: ["چه کنی"],
      rows: [
        { label: "دست‌بالا نگیر", it: "non sopravvalutare la propria abilità", values: ["هیچ‌وقت توانت را دست‌بالا نگیر؛ همیشه برای اشتباه جا بگذار: سرعتِ کمتر، فاصله‌ی بیشتر."] },
        { label: "همیشه درست نمی‌سنجی", it: "non sempre in grado di valutare", values: ["خستگی، عجله و عادت سنجیدنِ خودت را خراب می‌کنند؛ این را بدان و برایش حاشیه بگذار."] },
        { label: "ریسکِ بیش از توان", it: "situazioni più rischiose di quelle che si è in grado di gestire", values: ["گاهی خودمان را در خطری می‌اندازیم که از پسش برنمی‌آییم؛ سبقتِ تنگ یا پیچِ تند همین است."] },
        { label: "سرنشینی که می‌گوید «تندتر»", it: "gli inviti dei passeggeri a guidare più velocemente", values: ["قبول نکن. سرعت را تو و جاده تعیین می‌کنید، نه کسی که پشتِ فرمان نیست."] },
      ],
      takeaway: "توانت را دست‌بالا نگیر، بدان که گاهی اشتباه می‌سنجی، و نگذار کسی تو را از توانت جلوتر ببرد.",
      rule: CDS_140,
    },
    {
      kind: "table",
      title: "دیگران را بخوان، و در تقاطع",
      body:
        "رانندگیِ امن یعنی کارِ دیگران را پیش‌بینی کنی، نه فقط کارِ خودت را درست انجام بدهی. بیشترِ این‌ها را در فصل‌های ۱۳ و ۱۴ دیده‌ای (آینه‌ها، حق تقدم):",
      columns: ["چه کنی"],
      rows: [
        { label: "جلو و کناره‌ها", it: "davanti e ai bordi della strada", values: ["هم کسانی را که جلوی تو هستند ببین، هم کنارِ جاده: عابر، کودک، دوچرخه، خودرویی که از پارک بیرون می‌آید."] },
        { label: "رفتارِ دیگران", it: ALTRI, values: ["همیشه مهم است، و وقتی قانون را رعایت نمی‌کنند مهم‌تر: اشتباهشان را پیش‌بینی کن تا به تصادف نرسد."] },
        { label: "کجا را نگاه کنی", it: "non solo tre metri antistante", values: ["دور را ببین، نه فقط چند متر جلوی سپر؛ وگرنه خطر را وقتی می‌بینی که دیگر جای ایستادن نیست."] },
        { label: "آینه‌ی راست", it: "lo specchio retrovisore destro", values: ["برای همه است، نه فقط باتجربه‌ها (فصلِ ۱۳)."] },
        { label: "تقاطع", it: "attraversare un incrocio", values: ["بیشترین تمرکز. اگر مطمئن نیستی که امن رد می‌شوی، بایست و صبر کن همه‌ی کسانی که ممکن است با آن‌ها برخورد کنی رد شوند."] },
        { label: "«سریع‌تر برس تا اول رد شوی»", it: "sopraggiungervi più velocemente", values: ["غلط. حق تقدم با قاعده است، نه با سرعت (فصلِ ۱۴)؛ نزدیک شدنِ تند فقط فرصتِ ایستادن را کم می‌کند."] },
      ],
      takeaway: "دور و کناره‌ها را ببین، اشتباهِ دیگران را پیش‌بینی کن، و در تقاطعِ نامطمئن بایست. سرعت هیچ‌وقت حق تقدم نمی‌دهد.",
      rule: `${CDS_140}; ${CDS("145")}; ${CDS("154")}`,
    },
    {
      kind: "classify",
      title: "تمرین: محتاطانه یا پرخطر؟",
      body: `${DISCLAIMER} برای هر رفتارِ راننده‌ی فرضیِ K بگو:`,
      options: [
        { it: "prudente", fa: "محتاطانه" },
        { it: "rischioso", fa: "پرخطر" },
      ],
      items: [
        { prompt: "به تقاطعی بی‌چراغ می‌رسد و از سمتِ راست خوب نمی‌بیند؛ می‌ایستد تا مطمئن شود", answer: 0, explain: "اگر مطمئن نیستی، بایست و صبر کن (قدمِ ۲)." },
        { prompt: "تند می‌کند تا پیش از خودروی دیگر به تقاطع برسد", answer: 1, explain: "سرعت حق تقدم نمی‌دهد و جای ایستادن را کم می‌کند." },
        { prompt: "دوستانش می‌گویند «تندتر برو»؛ آرام جواب می‌دهد و سرعتش را نگه می‌دارد", answer: 0, explain: "سرعت را راننده و جاده تعیین می‌کنند (قدمِ ۱)." },
        { prompt: "خودرویی جلوتر بی‌راهنما کم‌کم به چپ می‌رود؛ K فاصله‌اش را بیشتر می‌کند", answer: 0, explain: "اشتباهِ دیگران را پیش‌بینی کن." },
        { prompt: "دوچرخه‌سواری را کنارِ جاده نادیده می‌گیرد، چون «دوچرخه‌ها همیشه قانون را رعایت نمی‌کنند»", answer: 1, explain: "دقیقاً برای همین باید ببینی‌اش." },
        { prompt: "چون مسیر را خوب می‌شناسد، فقط به چند متر جلوی سپر نگاه می‌کند", answer: 1, explain: "دور را ببین؛ آشنایی با مسیر خطرِ تازه را پیش‌بینی نمی‌کند." },
      ],
      takeaway: "محتاط یعنی برای اشتباه جا گذاشتن: اشتباهِ خودت و دیگران.",
      rule: CDS_140,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "sopravvalutare", fa: "دست‌بالا گرفتن", base: "sopravvalutare" },
        { it: "l'abilità di guida", fa: "مهارتِ رانندگی" },
        { it: "valutare", fa: "سنجیدن", base: "valutare" },
        { it: "gli utenti della strada", fa: "استفاده‌کنندگانِ راه" },
        { it: "ai bordi della strada", fa: "کنارِ جاده" },
        { it: "ininfluente", fa: "بی‌اثر" },
        { it: "tenere conto di", fa: "حساب کردن روی، در نظر گرفتن", base: "tenere" },
        { it: "il pericolo di collisione", fa: "خطرِ برخورد" },
        { it: "sopraggiungere", fa: "از راه رسیدن", base: "sopraggiungere" },
      ],
    },
    {
      kind: "trap",
      title: "«il comportamento degli altri»: مهم است یا نه؟",
      body: "هر دو جمله درباره‌ی رفتارِ دیگران در راه‌اند. یکی می‌گوید بسنج؛ دیگری می‌گوید بی‌اثر است:",
      examples: [
        {
          sourceId: "6715",
          textIt: "Per prevenire il rischio di incidenti, il conducente dovrà valutare attentamente il comportamento degli altri utenti della strada",
          answer: 1,
          chunks: [
            { it: "Per prevenire il rischio di incidenti,", fa: "برای پیشگیری از خطرِ تصادف،", focus: "reason" },
            { it: "il conducente dovrà valutare attentamente", fa: "راننده باید با دقت بسنجد", verb: "dovrà ← dovere" },
            { it: ALTRI, fa: "رفتارِ دیگر استفاده‌کنندگانِ راه را" },
          ],
          translation: "برای پیشگیری از خطرِ تصادف، راننده باید رفتارِ دیگر استفاده‌کنندگانِ راه را با دقت بسنجد.",
          why: "درست است. پیش‌بینیِ کارِ دیگران بخشی از رانندگیِ امن است.",
        },
        {
          sourceId: "6728",
          textIt: "Il comportamento degli altri utenti della strada è ininfluente per una guida sicura",
          answer: 0,
          chunks: [
            { it: "Il comportamento degli altri utenti della strada", fa: "رفتارِ دیگر استفاده‌کنندگانِ راه" },
            { it: "è ininfluente per una guida sicura", fa: "برای رانندگیِ امن بی‌اثر است", focus: "negation" },
          ],
          translation: "رفتارِ دیگر استفاده‌کنندگانِ راه برای رانندگیِ امن بی‌اثر است.",
          why: "غلط است. بیشترِ تصادف‌ها از برخوردِ اشتباهِ یکی با بی‌توجهیِ دیگری می‌آیند.",
        },
      ],
      takeaway: "«ininfluente», «può non tenere conto» درباره‌ی دیگران همیشه غلط‌اند.",
      rule: CDS_140,
    },
  ],
  practice: [
    {
      sourceId: "6698",
      textIt: "Il conducente non deve mai sopravvalutare la propria abilità di guida",
      answer: 1,
      chunks: [
        { it: "Il conducente", fa: "راننده" },
        { it: "non deve mai sopravvalutare", fa: "هرگز نباید دست‌بالا بگیرد", focus: "negation", verb: "deve ← dovere" },
        { it: "la propria abilità di guida", fa: "مهارتِ رانندگیِ خودش را" },
      ],
      translation: "راننده هرگز نباید مهارتِ رانندگیِ خودش را دست‌بالا بگیرد.",
      why: "درست است (قدم ۱). کسی که توانش را دست‌بالا می‌گیرد برای اشتباه جا نمی‌گذارد: سرعتِ بیشتر، فاصله‌ی کمتر.",
      rule: CDS_140,
      conceptStep: 1,
    },
    {
      sourceId: "6732",
      textIt: "Il conducente deve accogliere gli inviti dei passeggeri a guidare più velocemente",
      answer: 0,
      chunks: [
        { it: "Il conducente deve accogliere", fa: "راننده باید بپذیرد", verb: "deve ← dovere" },
        { it: "gli inviti dei passeggeri a guidare più velocemente", fa: "خواسته‌ی سرنشین‌ها را برای تندتر راندن", focus: "contrast" },
      ],
      translation: "راننده باید خواسته‌ی سرنشین‌ها را برای تندتر راندن بپذیرد.",
      why: "غلط است (قدم ۱). سرعت را راننده و شرایطِ جاده تعیین می‌کنند.",
      rule: `${CDS_140}; ${CDS("141")}`,
      conceptStep: 1,
    },
    {
      sourceId: "6703",
      textIt: "Se non si è certi di attraversare in tutta sicurezza un incrocio, è necessario arrestarsi ed aspettare che transitino tutti i veicoli con cui vi può essere un pericolo di collisione",
      answer: 1,
      chunks: [
        { it: "Se non si è certi di attraversare in tutta sicurezza un incrocio,", fa: "اگر مطمئن نیستی که با ایمنیِ کامل از تقاطع رد می‌شوی،", focus: "condition" },
        { it: "è necessario arrestarsi ed aspettare", fa: "باید بایستی و صبر کنی" },
        { it: "che transitino tutti i veicoli con cui vi può essere un pericolo di collisione", fa: "تا همه‌ی وسیله‌هایی که ممکن است با آن‌ها برخورد کنی رد شوند", verb: "transitino ← transitare" },
      ],
      translation: "اگر مطمئن نیستی که با ایمنیِ کامل از تقاطع رد می‌شوی، باید بایستی و صبر کنی تا همه‌ی وسیله‌هایی که ممکن است با آن‌ها برخورد کنی رد شوند.",
      why: "درست است (قدم ۲). در تقاطعِ نامطمئن، ایستادن همیشه انتخابِ امن است.",
      rule: `${CDS("145")}; ${CDS_140}`,
      conceptStep: 2,
    },
    {
      sourceId: "6729",
      textIt: "Il conducente può non tenere conto del comportamento degli altri utenti della strada, se questi ultimi non rispettano le regole del codice della strada",
      answer: 0,
      chunks: [
        { it: "Il conducente può non tenere conto del comportamento degli altri utenti della strada,", fa: "راننده می‌تواند رفتارِ دیگر استفاده‌کنندگانِ راه را در نظر نگیرد،", focus: "negation", verb: "può ← potere" },
        { it: "se questi ultimi non rispettano le regole del codice della strada", fa: "اگر آن‌ها قاعده‌های قانونِ راهنمایی‌ورانندگی را رعایت نکنند", focus: "condition" },
      ],
      translation: "راننده می‌تواند رفتارِ دیگر استفاده‌کنندگانِ راه را در نظر نگیرد، اگر آن‌ها قاعده‌های قانونِ راهنمایی‌ورانندگی را رعایت نکنند.",
      why: "غلط است (قدم ۲). کسی که قانون را رعایت نمی‌کند، همان کسی است که بیشتر باید پیش‌بینی‌اش کنی.",
      rule: CDS_140,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6698", "6706", "6723", "6732"] },
    { step: 2, sourceIds: ["6701", "6703", "6715", "6720", "6726", "6728", "6729", "6733", "6735"] },
  ],
};

export const lessonPercheRegole: Lesson = {
  id: "perche-le-regole",
  titleFa: "چرا قاعده‌ها همیشه معتبرند",
  titleIt: "PSICOLOGIA DEL TRAFFICO: IL RISPETTO DELLE NORME",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی قاعده‌های رفت‌وآمد برای چیست (ایمنیِ همه، روان بودنِ ترافیک، برای هر وسیله‌ای) و چرا «فقط وقتی…» درباره‌شان غلط است. و سه باورِ غلط درباره‌ی الکل را که بانک در همین بخش آورده، با فصلِ ۲۲ کنار می‌گذاری.",
      why:
        "۱۱ سؤال. جمله‌ی غلط قاعده را شرطی می‌کند: «فقط اگر جریمه سنگین است»، «فقط برای کاربرانِ آسیب‌پذیر»، «فقط در ترافیکِ سنگین»، «بعد از ده دقیقه پشتِ خودروی کند»، «قاعده‌ای فرعی است». یا می‌گوید کمی الکل توجه یا تمرکز را بهتر می‌کند.",
      rule: CDS_140,
    },
    {
      kind: "table",
      title: "قاعده برای چیست، و «فقط وقتی…» نداریم",
      body:
        "قاعده‌ها برای این‌اند که همه بتوانند کارِ همدیگر را پیش‌بینی کنند. قاعده‌ای که «گاهی» رعایت شود، همین پیش‌بینی را خراب می‌کند:",
      columns: ["درست یا غلط", "چرا"],
      rows: [
        { label: "برای ایمنیِ همه", it: "maggior sicurezza per tutti gli utenti", values: ["درست", "راننده، عابر، دوچرخه‌سوار؛ همه."] },
        { label: "کمتر شدنِ مزاحمت", it: "limitare l'intralcio alla circolazione", values: ["درست", "وقتی همه قاعده را رعایت کنند، ترافیک روان‌تر است."] },
        { label: "برای هر وسیله", it: "sia a motore, sia privi", values: ["درست", "وسیله‌ی موتوری و بی‌موتور (دوچرخه، گاری) هر دو."] },
        { label: "فقط با جریمه‌ی سنگین", it: "solo se la sanzione è elevata", values: ["غلط", "جریمه پیامد است، نه دلیلِ قاعده؛ خطر به اندازه‌ی جریمه بستگی ندارد."] },
        { label: "فقط برای آسیب‌پذیرها", it: "per gli utenti deboli, ma non per gli autoveicoli", values: ["غلط", "قاعده برای راننده‌ی خودرو هم هست؛ اتفاقاً اوست که می‌تواند بیشترین آسیب را بزند."] },
        { label: "فقط در ترافیکِ سنگین", it: "non quando la circolazione è scorrevole", values: ["غلط", "در جاده‌ی خلوت سرعت‌ها بالاترند و اشتباه گران‌تر است."] },
        { label: "سبقت بعد از ده دقیقه", it: "in coda da più di 10 minuti", values: ["غلط", "ممنوعیتِ سبقت با صبر کردن تمام نمی‌شود؛ فقط با تابلوی پایان یا جایی که دیگر ممنوع نیست (فصلِ ۱۵)."] },
        { label: "جای خودرو روی سواره‌رو", it: "la posizione sulla carreggiata", values: ["غلط که «فرعی» باشد", "راست رفتن و نگه داشتنِ خطِ عبور قاعده‌ی اصلی است (فصلِ ۱۳)، نه پیشنهاد."] },
      ],
      takeaway: "قاعده‌ها برای همه، با هر وسیله، در هر ترافیکی‌اند. «فقط وقتی…» و «اگر صبر کردم» استثنای ساختگی‌اند.",
      rule: `${CDS_140}; ${CDS("143")}; ${CDS("148")}`,
    },
    {
      kind: "table",
      title: "سه باورِ غلط درباره‌ی الکل",
      body:
        "این سه جمله در بخشِ روان‌شناسیِ بانک آمده‌اند، ولی موضوعشان فصلِ ۲۲ است (درس‌های «الکل با رانندگی چه می‌کند» و «فقط زمان؛ و آنچه قانون می‌گوید»). هر سه غلط‌اند:",
      columns: ["چرا غلط است"],
      rows: [
        { label: "لیکور، ده دقیقه بعد", it: "un liquore ad alta gradazione", values: ["الکل هیچ‌وقت توجه را بهتر نمی‌کند؛ نه بعد از ده دقیقه، نه هیچ وقتِ دیگر."] },
        { label: "مستیِ «سبک»", it: "stato di ebbrezza lieve", values: ["مستیِ سبک هم سنجیدنِ خطر و واکنش را خراب می‌کند؛ «با این حال امن» وجود ندارد."] },
        { label: "۰٫۵ گرم در لیتر", it: "0,5 grammi per litro", values: ["۰٫۵ حدِ قانونیِ عمومی است، نه حدِ «تمرکزِ بهتر». زیرِ آن هم توانایی کم می‌شود، و برای راننده‌ی تازه‌کار و زیرِ ۲۱ سال حد صفر است (فصلِ ۲۲)."] },
      ],
      takeaway: "هیچ مقدارِ الکلی توجه یا تمرکز را بهتر نمی‌کند. حدِ قانونی مرزِ جریمه است، نه مرزِ امنیت.",
      rule: `${CDS("186")}; ${CDS("186-bis")}`,
    },
    {
      kind: "classify",
      title: "تمرین: همیشه معتبر یا باورِ غلط؟",
      body: `${DISCLAIMER} این جمله‌ها ساختگی‌اند، نه از بانک. دسته کن:`,
      options: [
        { it: "vale sempre", fa: "همیشه معتبر است" },
        { it: "è un mito", fa: "باورِ غلط است" },
      ],
      items: [
        { prompt: "شبِ خلوت می‌شود چراغ قرمز را با احتیاط رد کرد", answer: 1, explain: "قاعده در ترافیکِ کم هم معتبر است (قدمِ ۱)." },
        { prompt: "حدِ سرعت برای دوچرخه‌سوار مهم نیست، چون موتور ندارد", answer: 1, explain: "قاعده‌ها برای وسیله‌های بی‌موتور هم هستند." },
        { prompt: "رعایتِ قاعده‌ها کارِ دیگران را برایت قابلِ پیش‌بینی می‌کند", answer: 0, explain: "همین دلیلِ اصلیِ قاعده است." },
        { prompt: "یک لیوان پیش از راه افتادن آدم را هوشیارتر می‌کند", answer: 1, explain: "الکل هیچ‌وقت هوشیاری را بالا نمی‌برد (قدمِ ۲)." },
        { prompt: "وقتی پلیسی در کار نیست، قاعده همان قاعده است", answer: 0, explain: "قاعده برای ایمنی است، نه برای پلیس." },
      ],
      takeaway: "هر «فقط وقتی…» درباره‌ی قاعده‌ها، و هر «کمی الکل کمک می‌کند»، باورِ غلط است.",
      rule: CDS_140,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "le norme di circolazione", fa: "قاعده‌های رفت‌وآمد" },
        { it: "il rispetto delle norme", fa: "رعایتِ قاعده‌ها" },
        { it: "l'intralcio alla circolazione", fa: "مزاحمت برای ترافیک" },
        { it: "gli utenti deboli", fa: "استفاده‌کنندگانِ آسیب‌پذیرِ راه (عابر، دوچرخه)" },
        { it: "la circolazione scorrevole", fa: "ترافیکِ روان" },
        { it: "il divieto di sorpasso", fa: "ممنوعیتِ سبقت" },
        { it: "la posizione sulla carreggiata", fa: "جای خودرو روی سواره‌رو" },
        { it: "lo stato di ebbrezza", fa: "حالتِ مستی" },
      ],
    },
    {
      kind: "trap",
      title: "«il rispetto delle norme»: همیشه یا فقط گاهی؟",
      body: "هر دو جمله با «رعایتِ قاعده‌های رفت‌وآمد» شروع می‌شوند. یکی برای همه می‌گوید، دیگری مرزی ساختگی می‌کشد:",
      examples: [
        {
          sourceId: "6718",
          textIt: "Il rispetto delle norme di circolazione permette di limitare i rischi connessi alla guida di tutti i veicoli, sia di quelli a motore, sia di quelli che ne sono privi",
          answer: 1,
          chunks: [
            { it: NORME, fa: NORME_FA },
            { it: "permette di limitare i rischi connessi alla guida di tutti i veicoli,", fa: "خطرهای راندنِ همه‌ی وسیله‌ها را کم می‌کند،", verb: "permette ← permettere", focus: "always" },
            { it: "sia di quelli a motore, sia di quelli che ne sono privi", fa: "هم موتوری‌ها، هم بی‌موتورها" },
          ],
          translation: "رعایتِ قاعده‌های رفت‌وآمد خطرهای راندنِ همه‌ی وسیله‌ها را کم می‌کند، هم موتوری‌ها، هم بی‌موتورها.",
          why: "درست است. «tutti… sia… sia» یعنی برای همه.",
        },
        {
          sourceId: "6739",
          textIt: "Il rispetto delle norme di circolazione è importante quando il traffico è molto intenso, ma non quando si è in condizioni di circolazione scorrevole",
          answer: 0,
          chunks: [
            { it: NORME, fa: NORME_FA },
            { it: "è importante quando il traffico è molto intenso,", fa: "وقتی ترافیک خیلی سنگین است مهم است،", focus: "condition" },
            { it: "ma non quando si è in condizioni di circolazione scorrevole", fa: "ولی نه وقتی ترافیک روان است", focus: "contrast" },
          ],
          translation: "رعایتِ قاعده‌های رفت‌وآمد وقتی ترافیک خیلی سنگین است مهم است، ولی نه وقتی ترافیک روان است.",
          why: "غلط است. قاعده در هر ترافیکی معتبر است.",
        },
      ],
      takeaway: "«ma non quando…», «solo se…», «per… ma non per…» کنارِ قاعده‌ها نشانه‌ی جمله‌ی غلط‌اند.",
      rule: CDS_140,
    },
  ],
  practice: [
    {
      sourceId: "6699",
      textIt: "Le norme di circolazione sono stabilite per garantire una maggior sicurezza di guida per tutti gli utenti della strada",
      answer: 1,
      chunks: [
        { it: "Le norme di circolazione sono stabilite", fa: "قاعده‌های رفت‌وآمد وضع شده‌اند", verb: "sono stabilite ← stabilire" },
        { it: "per garantire una maggior sicurezza di guida per tutti gli utenti della strada", fa: "تا ایمنیِ بیشتری برای همه‌ی استفاده‌کنندگانِ راه تضمین کنند", focus: "reason" },
      ],
      translation: "قاعده‌های رفت‌وآمد وضع شده‌اند تا ایمنیِ بیشتری برای همه‌ی استفاده‌کنندگانِ راه تضمین کنند.",
      why: "درست است (قدم ۱). قاعده‌ها برای این‌اند که همه، با هر وسیله‌ای، کارِ همدیگر را پیش‌بینی کنند.",
      rule: CDS_140,
      conceptStep: 1,
    },
    {
      sourceId: "6740",
      textIt: "Il divieto di sorpasso può non essere osservato se si è in coda dietro a un veicolo lento da più di 10 minuti e si ritiene di poter sorpassare senza pericoli",
      answer: 0,
      chunks: [
        { it: "Il divieto di sorpasso può non essere osservato", fa: "می‌شود ممنوعیتِ سبقت را رعایت نکرد", focus: "negation", verb: "può ← potere" },
        { it: "se si è in coda dietro a un veicolo lento da più di 10 minuti", fa: "اگر بیش از ده دقیقه پشتِ یک وسیله‌ی کند در صف باشی", focus: "condition" },
        { it: "e si ritiene di poter sorpassare senza pericoli", fa: "و فکر کنی می‌توانی بی‌خطر سبقت بگیری", verb: "si ritiene ← ritenere" },
      ],
      translation: "اگر بیش از ده دقیقه پشتِ یک وسیله‌ی کند در صف باشی و فکر کنی می‌توانی بی‌خطر سبقت بگیری، می‌شود ممنوعیتِ سبقت را رعایت نکرد.",
      why: "غلط است (قدم ۱). ممنوعیت با صبر کردن یا با «فکر می‌کنم بی‌خطر است» تمام نمی‌شود.",
      rule: CDS("148"),
      conceptStep: 1,
    },
    {
      sourceId: "6738",
      textIt: "Il rispetto delle norme di circolazione è importante per gli utenti deboli, ma non per i conducenti degli autoveicoli",
      answer: 0,
      chunks: [
        { it: NORME, fa: NORME_FA },
        { it: "è importante per gli utenti deboli,", fa: "برای استفاده‌کنندگانِ آسیب‌پذیر مهم است،" },
        { it: "ma non per i conducenti degli autoveicoli", fa: "ولی نه برای راننده‌های خودرو", focus: "contrast" },
      ],
      translation: "رعایتِ قاعده‌های رفت‌وآمد برای استفاده‌کنندگانِ آسیب‌پذیر مهم است، ولی نه برای راننده‌های خودرو.",
      why: "غلط است (قدم ۱). قاعده برای همه است، راننده‌ی خودرو هم.",
      rule: CDS_140,
      conceptStep: 1,
    },
    {
      sourceId: "6747",
      textIt: "Con 0,5 grammi per litro di alcool nel sangue si riesce a concentrarsi meglio",
      answer: 0,
      chunks: [
        { it: "Con 0,5 grammi per litro di alcool nel sangue", fa: "با ۰٫۵ گرم در لیتر الکلِ خون" },
        { it: "si riesce a concentrarsi meglio", fa: "بهتر می‌شود تمرکز کرد", verb: "si riesce ← riuscire", focus: "contrast" },
      ],
      translation: "با ۰٫۵ گرم در لیتر الکلِ خون بهتر می‌شود تمرکز کرد.",
      why: "غلط است (قدم ۲). الکل تمرکز را بهتر نمی‌کند؛ ۰٫۵ مرزِ قانونی است، نه مرزِ امنیت.",
      rule: CDS("186"),
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6699", "6709", "6718", "6737", "6738", "6739", "6740", "6741"] },
    { step: 2, sourceIds: ["6743", "6745", "6747"] },
  ],
};
