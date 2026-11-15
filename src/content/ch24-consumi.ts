/**
 * src/content/ch24-consumi.ts
 * Chapter 24 (Consumi, ambiente e inquinamento), lessons 1–2: what makes a
 * vehicle need more energy (bank groups 612, 620, 623 in part).
 *
 *  L1 air, weight, tyres and towing: roof box, open windows and sunroof, snow
 *     on the roof, load, under-inflated tyres, a trailer. Drawing `resistenze`.
 *  L2 electrical loads and air conditioning, then the vehicle type: a load costs
 *     fuel in a combustion car and range in an electric one; hybrids, methane,
 *     LPG and electric cars; recirculation in a tunnel queue.
 *
 * No savings figures: the official guide gives none that holds for every car,
 * so neither do the lessons. Trust rules as in
 * src/content/lessons.ts; checked by tests/chapter24.test.ts.
 */
import type { Lesson } from "./lessons.js";
import { CDS, CHOICES, COMPARE, EEA_AIR, GUIDA_CO2, MANUALE, TECNICA } from "./ch24-common.js";

const MENO = "Per consumare meno carburante";
const MENO_FA = "برای این‌که سوختِ کمتری مصرف شود،";

export const lessonResistenze: Lesson = {
  id: "consumi-aria-peso-pneumatici",
  titleFa: "سوخت کجا می‌رود: هوا، وزن، لاستیک",
  titleIt: "CONSUMI: ARIA · PESO · PNEUMATICI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی خودرو انرژی‌اش را صرفِ چه می‌کند: کنار زدنِ هوا، بالا بردن و راه انداختنِ وزن، و غلتیدنِ لاستیک. و می‌دانی کدام کارِ تو هر کدام را بیشتر یا کمتر می‌کند: باربند، پنجره‌ی باز، بارِ اضافه، فشارِ بادِ لاستیک و یدک.",
      why:
        "۱۳ سؤال. جمله‌ی غلط معمولاً یک کارِ بی‌فایده یا مضر را «صرفه‌جویی» جا می‌زند: «بار را روی سقف بگذار»، «سان‌روف را باز کن»، «یدک مصرف را بیشتر نمی‌کند». قاعده‌ی پشتِ همه یکی است: هر چیزی که جلوی هوا را بگیرد، وزن اضافه کند یا غلتیدن را سخت کند، انرژیِ بیشتری می‌خواهد.",
      rule: GUIDA_CO2,
    },
    {
      kind: "anatomy",
      title: "یک خودرو، چند جا برای هدر رفتنِ انرژی",
      scene: "resistenze",
      body:
        "هر بخش را لمس کن. برای خودروی بنزینی یا دیزلی، انرژیِ بیشتر یعنی سوختِ بیشتر. برای خودروی برقی، همان چیزها برقِ بیشتری از باتری می‌گیرند و بُرد (مسافتی که با یک شارژ می‌رود) کم می‌شود. سازوکار یکی است؛ فقط چیزی که خرج می‌شود فرق دارد.",
      parts: [
        { id: "aria", nameIt: "la resistenza dell'aria", nameFa: "مقاومتِ هوا", text: "خودرو در حرکت باید هوا را کنار بزند. هرچه تندتر بروی، این کار سخت‌تر می‌شود، و هر برآمدگی روی بدنه آن را سخت‌تر می‌کند." },
        { id: "tetto", nameIt: "il portapacchi", nameFa: "باربند", text: "باربند یا جعبه‌ی روی سقف، حتی خالی، شکلِ خودرو را بد می‌کند و جلوی هوا را می‌گیرد. بعد از استفاده بازش کن و بار را داخلِ خودرو بگذار." },
        { id: "finestrino", nameIt: "il finestrino aperto", nameFa: "پنجره‌ی باز", text: "پنجره یا سان‌روفِ باز در سرعتِ بالا هوا را به داخلِ اتاق می‌کشد و گرداب می‌سازد؛ این گرداب مثل ترمزِ کوچکی جلوی حرکت را می‌گیرد." },
        { id: "peso", nameIt: "il peso del veicolo", nameFa: "وزن", text: "هر کیلوی اضافه را موتور باید راه بیندازد و از سربالایی بالا ببرد. چیزی را که لازم نداری، در صندوق نگه ندار." },
        { id: "pneumatico", nameIt: "la pressione di gonfiaggio", nameFa: "فشارِ بادِ لاستیک", text: "لاستیکِ کم‌باد بیشتر تغییرِ شکل می‌دهد و سخت‌تر می‌غلتد؛ مصرف بیشتر می‌شود و لاستیک زودتر می‌ساید. فشار را همان بگذار که سازنده گفته، وقتی لاستیک سرد است." },
        { id: "impianti", nameIt: "impianti elettrici · climatizzatore", nameFa: "وسیله‌های برقی و کولر", text: "این‌ها هم انرژی می‌خواهند، ولی از راهِ دیگری؛ درسِ بعد («برق، کولر، و نوعِ خودرو») جدا درباره‌شان است." },
      ],
      takeaway: "هوا، وزن و لاستیک: هر سه انرژی می‌گیرند، چه خودرو بنزینی باشد، چه دیزلی، چه برقی.",
      rule: GUIDA_CO2,
    },
    {
      kind: "table",
      title: "هوا: هر چیزی که شکلِ خودرو را بد کند",
      body:
        "خودرو طوری ساخته شده که هوا راحت از رویش رد شود. هر چیزی که این شکل را عوض کند، مصرف را بیشتر می‌کند، و اثرش با سرعت بیشتر می‌شود:",
      columns: ["اثر", "چه کنی"],
      rows: [
        { label: "بار روی سقف", it: "bagagli sul tetto · portapacchi", values: ["مصرفِ بیشتر", "بار را داخلِ خودرو بگذار؛ باربندِ خالی را باز کن"] },
        { label: "برفِ ضخیم روی سقف", it: "uno spesso strato di neve sul tetto", values: ["وزن و شکلِ بد؛ مصرفِ بیشتر", "پیش از راه افتادن پاکش کن؛ برفی که در راه می‌افتد برای پشتی‌ها هم خطر است"] },
        { label: "پنجره‌ی باز در سرعتِ بالا", it: "finestrini chiusi ad alta velocità", values: ["گرداب در اتاق، مصرفِ بیشتر", "در سرعتِ متوسط و بالا پنجره‌ها را ببند و از دریچه‌های هوا استفاده کن"] },
        { label: "سان‌روفِ باز", it: "il tettuccio aperto", values: ["همان گرداب؛ مصرفِ بیشتر، نه کمتر", "در سرعتِ بالا ببندش"] },
        { label: "آرام در شهر", it: "a bassa velocità", values: ["اثرِ هوا کم است", "بانک فقط درباره‌ی سرعتِ متوسط و بالا حکم می‌دهد؛ آستانه‌ی دقیقی وجود ندارد"] },
      ],
      takeaway: "«بار روی سقف» و «سان‌روفِ باز» هیچ‌وقت مصرف را کم نمی‌کنند. پنجره را در سرعتِ بالا ببند.",
      rule: GUIDA_CO2,
    },
    {
      kind: "table",
      title: "وزن، لاستیک و یدک",
      body:
        "این سه کار را سخت می‌کنند چون خودرو باید جرمِ بیشتری را جابه‌جا کند یا لاستیک سخت‌تر بغلتد. برای موتورِ احتراقی، سوختِ بیشتر یعنی گازِ اگزوزِ بیشتر هم، پس همین کارها آلودگیِ هوا را هم کم یا زیاد می‌کنند:",
      columns: ["اثر", "چه کنی"],
      rows: [
        { label: "وزنِ بیشتر", it: "aumenta con l’aumentare del peso", values: ["مصرفِ بیشتر، به‌خصوص در شهر و سربالایی", "چیزِ بی‌مصرف در صندوق نگه ندار؛ هیچ‌وقت از حداکثر وزنِ مجازِ کارتِ خودرو بیشتر بار نزن"] },
        { label: "سبک کردن، کمتر آلودن", it: "si alleggerisce il peso del veicolo", values: ["سوختِ کمتر، گازِ اگزوزِ کمتر", "همان کارِ بالا؛ در خودروی برقی: برقِ کمتر، بُردِ بیشتر"] },
        { label: "لاستیکِ کم‌باد", it: "l'insufficiente pressione di gonfiaggio", values: ["سخت‌تر می‌غلتد؛ مصرفِ بیشتر، سایشِ بیشتر", "ماهی یک بار و پیش از سفرِ طولانی، با لاستیکِ سرد، فشار را بسنج"] },
        { label: "لاستیکِ پرباد «برای صرفه‌جویی»", it: "la pressione indicata dal costruttore", values: ["چسبندگی و ترمز بدتر می‌شود", "نکن. فشارِ درست همان است که در دفترچه یا برچسبِ خودرو آمده"] },
        { label: "یدک", it: "trainare un rimorchio", values: ["وزن و هوای بیشتر؛ مصرفِ بیشتر، حتی آرام", "رانندگی با یدک: فصلِ ۱۷، درسِ «رانندگی با یدک و کاروان»"] },
      ],
      takeaway: "وزنِ اضافه و لاستیکِ کم‌باد سوخت می‌خورند؛ لاستیک را پرباد هم نکن، فشارِ سازنده درست است.",
      rule: `${GUIDA_CO2}; ${MANUALE}; ${CDS("167")} (massa)`,
    },
    {
      kind: "classify",
      title: "مقایسه کن: کدام انرژیِ کمتری می‌خواهد؟",
      body: `${COMPARE} برای هر جفت، به سؤالِ زیرِ آن جواب بده:`,
      options: CHOICES,
      items: [
        {
          pair: { a: "خودروی بنزینی در آزادراه، با باربندِ خالی روی سقف", b: "همان خودرو و همان مسیر، بی‌باربند", differs: "باربندِ روی سقف" },
          prompt: "کدام سوختِ کمتری مصرف می‌کند؟",
          answer: 1,
          explain: "باربند، حتی خالی، جلوی هوا را می‌گیرد و اثرش در سرعتِ بالا بیشتر است (قدمِ ۲).",
        },
        {
          pair: { a: "لاستیک‌ها با فشاری که دفترچه گفته، سرد سنجیده شده", b: "لاستیک‌ها کم‌باد، چون مدت‌هاست کسی نسنجیده", differs: "فشارِ بادِ لاستیک" },
          prompt: "کدام سوختِ کمتری مصرف می‌کند؟",
          answer: 0,
          explain: "لاستیکِ کم‌باد سخت‌تر می‌غلتد (قدمِ ۳). جوابِ درست پرباد کردن نیست؛ فشارِ سازنده است.",
        },
        {
          pair: { a: "خودروی برقی با جعبه‌ی بار روی سقف", b: "همان خودروی برقی، بار داخلِ صندوق", differs: "جعبه‌ی روی سقف (خودروی برقی)" },
          prompt: "کدام برقِ کمتری از باتری می‌گیرد؟",
          answer: 1,
          explain: "خودروی برقی سوخت نمی‌سوزاند، ولی هوا را همان‌طور باید کنار بزند؛ جعبه‌ی روی سقف بُرد را کم می‌کند.",
        },
        {
          pair: { a: "در جاده‌ی برون‌شهری با سرعتِ بالا، پنجره‌ها باز، کولر خاموش", b: "همان سرعت، پنجره‌ها بسته، دریچه‌ی هوا باز، کولر خاموش", differs: "پنجره‌ی باز یا بسته" },
          prompt: "کدام سوختِ کمتری مصرف می‌کند؟",
          answer: 1,
          explain: "تنها فرق پنجره است. در سرعتِ بالا پنجره‌ی باز گرداب می‌سازد و مصرف را بالا می‌برد (قدمِ ۲).",
        },
        {
          pair: { a: "در شهر با سرعتِ کم، پنجره‌ها باز، کولر خاموش", b: "همان‌جا، پنجره‌ها بسته، کولر روشن", differs: "پنجره و کولر، هر دو با هم" },
          prompt: "کدام سوختِ کمتری مصرف می‌کند؟",
          answer: 2,
          explain: "این‌جا دو چیز با هم عوض شده: پنجره و کولر. جوابش به سرعت، گرما و خودرو بستگی دارد، و نه بانک نه راهنمای رسمی آستانه‌ای می‌دهد که همیشه درست باشد.",
        },
        {
          pair: { a: "صندوق پر از وسیله‌هایی که هفته‌هاست لازم نشده‌اند", b: "صندوق خالی", differs: "وزنِ وسیله‌های اضافه در صندوق" },
          prompt: "در مسیری با سربالایی و ترافیکِ ایست‌وحرکت، کدام سوختِ کمتری مصرف می‌کند؟",
          answer: 1,
          explain: "هر بار راه افتادن و هر سربالایی وزن را بالا می‌برد؛ وزنِ کمتر یعنی سوختِ کمتر (قدمِ ۳).",
        },
      ],
      takeaway: "یک عامل را عوض کن و ببین چه می‌شود. اگر دو عامل با هم عوض شوند، جوابِ صادقانه اغلب «نمی‌شود گفت» است.",
      rule: GUIDA_CO2,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il consumo di carburante", fa: "مصرفِ سوخت" },
        { it: "il portapacchi", fa: "باربند" },
        { it: "il tettuccio (scorrevole)", fa: "سان‌روف" },
        { it: "il finestrino", fa: "پنجره‌ی خودرو" },
        { it: "la pressione di gonfiaggio", fa: "فشارِ بادِ لاستیک" },
        { it: "gli pneumatici", fa: "لاستیک‌ها" },
        { it: "il peso del veicolo", fa: "وزنِ خودرو" },
        { it: "alleggerire", fa: "سبک کردن", base: "alleggerire" },
        { it: "le turbolenze", fa: "گرداب (هوا)" },
        { it: "trainare un rimorchio", fa: "یدک کشیدن", base: "trainare" },
      ],
    },
    {
      kind: "trap",
      title: "«bagagli sul tetto»: بیشتر یا کمتر؟",
      body: "هر دو جمله درباره‌ی بارِ روی سقف‌اند. یکی می‌گوید مصرف بیشتر می‌شود، دیگری آن را راهِ صرفه‌جویی می‌داند:",
      examples: [
        {
          sourceId: "6759",
          textIt: "Collocare i bagagli sul tetto del veicolo comporta un maggior consumo di carburante",
          answer: 1,
          chunks: [
            { it: "Collocare i bagagli sul tetto del veicolo", fa: "گذاشتنِ بار روی سقفِ خودرو" },
            { it: "comporta un maggior consumo di carburante", fa: "مصرفِ سوخت را بیشتر می‌کند", verb: "comporta ← comportare" },
          ],
          translation: "گذاشتنِ بار روی سقفِ خودرو مصرفِ سوخت را بیشتر می‌کند.",
          why: "درست است. بار روی سقف جلوی هوا را می‌گیرد.",
        },
        {
          sourceId: "6763",
          textIt: "Per consumare meno carburante è opportuno collocare i bagagli sul tetto del veicolo",
          answer: 0,
          chunks: [
            { it: MENO, fa: MENO_FA, focus: "reason" },
            { it: "è opportuno collocare i bagagli sul tetto del veicolo", fa: "بهتر است بار را روی سقفِ خودرو بگذاری", focus: "contrast" },
          ],
          translation: "برای این‌که سوختِ کمتری مصرف شود، بهتر است بار را روی سقفِ خودرو بگذاری.",
          why: "غلط است. همان کار است، با نتیجه‌ی وارونه.",
        },
      ],
      takeaway: "بار روی سقف همیشه مصرف را «بیشتر» می‌کند؛ «per consumare meno» کنارش یعنی جمله غلط است.",
      rule: GUIDA_CO2,
    },
  ],
  practice: [
    {
      sourceId: "6833",
      textIt: "Viaggiare a forte velocità con il tettuccio del veicolo aperto comporta un aumento dei consumi di carburante",
      answer: 1,
      chunks: [
        { it: "Viaggiare a forte velocità", fa: "با سرعتِ زیاد رفتن", focus: "condition" },
        { it: "con il tettuccio del veicolo aperto", fa: "با سان‌روفِ باز" },
        { it: "comporta un aumento dei consumi di carburante", fa: "مصرفِ سوخت را بیشتر می‌کند", verb: "comporta ← comportare" },
      ],
      translation: "با سرعتِ زیاد و سان‌روفِ باز رفتن مصرفِ سوخت را بیشتر می‌کند.",
      why: "درست است (قدم ۲). سان‌روفِ باز در سرعتِ زیاد گرداب می‌سازد و شکلِ خودرو را بد می‌کند.",
      rule: GUIDA_CO2,
      conceptStep: 2,
    },
    {
      sourceId: "6760",
      textIt: "Tenere aperto il tettuccio scorrevole del veicolo comporta un minor consumo di carburante",
      answer: 0,
      chunks: [
        { it: "Tenere aperto il tettuccio scorrevole del veicolo", fa: "باز نگه داشتنِ سان‌روفِ خودرو" },
        { it: "comporta un minor consumo di carburante", fa: "مصرفِ سوخت را کمتر می‌کند", verb: "comporta ← comportare", focus: "contrast" },
      ],
      translation: "باز نگه داشتنِ سان‌روفِ خودرو مصرفِ سوخت را کمتر می‌کند.",
      why: "غلط است (قدم ۲). سان‌روفِ باز مصرف را کم نمی‌کند؛ در سرعتِ بالا بیشترش هم می‌کند.",
      rule: GUIDA_CO2,
      conceptStep: 2,
    },
    {
      sourceId: "6758",
      textIt: "L'insufficiente pressione di gonfiaggio degli pneumatici comporta un maggior consumo di carburante",
      answer: 1,
      chunks: [
        { it: "L'insufficiente pressione di gonfiaggio degli pneumatici", fa: "فشارِ بادِ کمِ لاستیک‌ها" },
        { it: "comporta un maggior consumo di carburante", fa: "مصرفِ سوخت را بیشتر می‌کند", verb: "comporta ← comportare" },
      ],
      translation: "فشارِ بادِ کمِ لاستیک‌ها مصرفِ سوخت را بیشتر می‌کند.",
      why: "درست است (قدم ۳). لاستیکِ کم‌باد سخت‌تر می‌غلتد. فشارِ درست را دفترچه‌ی خودرو می‌گوید؛ بیشتر از آن هم نزن.",
      rule: `${GUIDA_CO2}; ${MANUALE}`,
      conceptStep: 3,
    },
    {
      sourceId: "6836",
      textIt: "Trainare un rimorchio non comporta un aumento dei consumi di carburante",
      answer: 0,
      chunks: [
        { it: "Trainare un rimorchio", fa: "یدک کشیدن" },
        { it: "non comporta un aumento dei consumi di carburante", fa: "مصرفِ سوخت را بیشتر نمی‌کند", focus: "negation", verb: "comporta ← comportare" },
      ],
      translation: "یدک کشیدن مصرفِ سوخت را بیشتر نمی‌کند.",
      why: "غلط است (قدم ۳). یدک هم وزن اضافه می‌کند، هم جلوی هوا را می‌گیرد؛ مصرف بیشتر می‌شود.",
      rule: GUIDA_CO2,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 2, sourceIds: ["6756", "6759", "6760", "6763", "6814", "6830", "6831", "6832", "6833"] },
    { step: 3, sourceIds: ["6754", "6758", "6809", "6836"] },
  ],
};

export const lessonImpiantiTipi: Lesson = {
  id: "consumi-impianti-tipi-veicolo",
  titleFa: "برق، کولر، و نوعِ خودرو",
  titleIt: "CONSUMI: IMPIANTI ELETTRICI · CLIMATIZZATORE · IBRIDI · ELETTRICI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی چرا رادیو، چراغ، گرم‌کنِ شیشه و کولر در خودروی بنزینی یا دیزلی سوخت می‌خورند، و همین‌ها در خودروی برقی از کجا می‌خورند. و یاد می‌گیری خودروی هیبریدی، گازسوز و برقی را درست ببینی: هر کدام چه چیزی را کم می‌کند و چه چیزی را نه.",
      why:
        "۷ سؤال. جمله‌ی غلط یا کولر را صرفه‌جو نشان می‌دهد («مصرف را کم می‌کند»، «آلودگی را کم می‌کند»)، یا هیبریدی را به خاطرِ «دو موتور» آلوده‌تر می‌داند، یا گردشِ داخلیِ هوا را در صفِ تونل خطرناک جلوه می‌دهد.",
      rule: GUIDA_CO2,
    },
    {
      kind: "table",
      title: "برق و کولر از کجا می‌آیند",
      body:
        "در خودروی بنزینی یا دیزلی، برقِ خودرو را دینام می‌سازد و دینام را موتور می‌چرخاند؛ کمپرسورِ کولر هم با موتور کار می‌کند. پس هر وسیله‌ی برقی و کولر در نهایت سوخت می‌خورد. در خودروی برقی همه از باتری می‌آید و بُرد را کم می‌کند:",
      columns: ["خودروی بنزینی یا دیزلی", "خودروی برقی"],
      rows: [
        { label: "رادیو، چراغ، گرم‌کنِ شیشه‌ی عقب، فن", it: "apparecchi a corrente elettrica", values: ["سوختِ بیشتر", "برقِ بیشتر، بُردِ کمتر"] },
        { label: "کولر", it: "il climatizzatore", values: ["سوختِ بیشتر؛ کم و فقط وقتی لازم است", "برقِ بیشتر؛ همین قاعده"] },
        { label: "«کولر آلودگی را کم می‌کند»", it: "diminuisce se si lascia acceso il climatizzatore", values: ["غلط: سوختِ بیشتر یعنی گازِ اگزوزِ بیشتر", "اگزوزی نیست؛ ولی برق هم جایی تولید می‌شود"] },
        { label: "استثنا: شیشه‌ی بخارگرفته", it: "vetri appannati", values: ["دید اول است: گرم‌کن، فن یا کولر را برای پاک کردنِ شیشه بزن", "همین"] },
        { label: "صفِ طولانی در تونل", it: "il ricircolo dell'aria", values: ["گردشِ داخلیِ هوا گازِ اگزوزِ بیرون را راه نمی‌دهد؛ خطرناک نیست", "همین؛ ولی نه برای همیشه: اگر شیشه بخار گرفت، هوای بیرون را باز کن"] },
      ],
      takeaway: "وسیله‌ی برقی و کولر هیچ‌وقت «مجانی» نیستند: در خودروی احتراقی سوخت، در برقی بُرد. ایمنی (دیدِ شیشه) همیشه اول است.",
      rule: `${GUIDA_CO2}; ${MANUALE} (ricircolo)`,
    },
    {
      kind: "table",
      title: "سه نوع خودرو، سه جوابِ متفاوت",
      body:
        "توصیه‌ای که برای خودروی بنزینی درست است، خودبه‌خود برای هیبریدی یا برقی درست نیست. این جدول نشان می‌دهد هر کدام چه چیزی بیرون می‌دهد. فشارِ لاستیک، وزن و شکلِ بدنه برای هر سه مهم‌اند:",
      columns: ["بنزینی یا دیزلی (و گازسوز)", "هیبریدی", "برقی"],
      rows: [
        { label: "انرژی از کجا", it: "carburante · batteria", values: ["سوخت (بنزین، گازوئیل، متان یا گازِ مایع)", "سوخت، و یک موتورِ برقی که به آن کمک می‌کند", "باتری"] },
        { label: "گازِ اگزوز", it: "gas di scarico", values: ["دارد", "دارد، چون هنوز سوخت می‌سوزاند", "ندارد"] },
        { label: "ذره‌های لاستیک و ترمز", it: "usura di pneumatici e freni", values: ["دارد", "دارد", "دارد؛ اگزوز ندارد، ولی این ذره‌ها سر جایشان‌اند"] },
        { label: "«دو موتور، دو برابر آلودگی»", it: "inquinano di più perché azionati da due motori", values: ["—", "غلط: دو موتور با هم کار می‌کنند تا سوختِ کمتری بسوزد، نه بیشتر", "—"] },
        { label: "متان و گازِ مایع", it: "metano o GPL", values: ["هنوز می‌سوزند و اگزوز دارند؛ بانک آن‌ها را راهی برای کم کردنِ آلودگیِ هوا می‌داند، نه صفر", "—", "—"] },
      ],
      takeaway: "برقی اگزوز ندارد، ولی بی‌اثر هم نیست: لاستیک، ترمز و تولیدِ برق می‌مانند. هیبریدی «دو برابر» نمی‌آلاید.",
      rule: `${EEA_AIR}; ${GUIDA_CO2}; ${TECNICA}`,
    },
    {
      kind: "classify",
      title: "مقایسه کن: انرژی، آلودگی، هوای داخلِ اتاق",
      body: `${COMPARE} سؤالِ هر جفت را دقیق بخوان؛ همه درباره‌ی یک چیز نیستند:`,
      options: CHOICES,
      items: [
        {
          pair: { a: "خودروی بنزینی، ده دقیقه منتظرِ کسی، موتور روشن برای کولر", b: "همان خودرو، همان‌جا، موتور خاموش", differs: "موتورِ روشن برای کولر" },
          prompt: "کدام سوخت و گازِ اگزوزِ کمتری دارد؟",
          answer: 1,
          explain: "موتورِ خاموش هیچ نمی‌سوزاند. در پارک، روشن نگه داشتنِ موتور برای کولر را قانون جدا ممنوع کرده (ماده‌ی ۱۵۷، فصلِ ۱۶، درسِ «پارکِ امن، و پیاده شدن»).",
        },
        {
          pair: { a: "خودروی برقی در شهر، گرمایش روشن در زمستان", b: "همان سفر، گرمایش خاموش، شیشه‌ها شفاف", differs: "گرمایش روشن یا خاموش" },
          prompt: "کدام برقِ کمتری از باتری می‌گیرد؟",
          answer: 1,
          explain: "گرمایش در خودروی برقی از باتری می‌آید (قدمِ ۱). ولی اگر شیشه بخار بگیرد، گرمایش برای دید لازم است و ایمنی اول است.",
        },
        {
          pair: { a: "صفِ ایستاده در تونل، گردشِ داخلیِ هوا روشن", b: "همان صف، هوای بیرون به داخل می‌آید", differs: "گردشِ داخلیِ هوا یا هوای بیرون" },
          prompt: "در کدام گازِ اگزوزِ خودروهای دیگر کمتر واردِ اتاق می‌شود؟",
          answer: 0,
          explain: "گردشِ داخلی دریچه‌ی هوای بیرون را می‌بندد. برای مدتِ کوتاه؛ اگر شیشه بخار گرفت، هوای بیرون را باز کن (قدمِ ۱).",
        },
        {
          pair: { a: "خودروی بنزینی در شهر", b: "خودروی برقی، همان مسیر", differs: "نوعِ خودرو: بنزینی یا برقی" },
          prompt: "کدام از لوله‌ی اگزوز آلاینده بیرون نمی‌دهد؟",
          answer: 1,
          explain: "برقی اگزوز ندارد. ولی ذره‌های لاستیک و ترمز را هر دو دارند (قدمِ ۲).",
        },
        {
          pair: { a: "خودروی هیبریدی", b: "خودروی بنزینیِ دیگری با اندازه‌ی متفاوت، در مسیرِ دیگر", differs: "خودرو، اندازه و مسیر، همه با هم" },
          prompt: "کدام در کلِ سال سوختِ کمتری مصرف می‌کند؟",
          answer: 2,
          explain: "خودرو، اندازه و مسیر همه با هم عوض شده‌اند. تنها چیزِ مطمئن این است که «دو موتور» به‌تنهایی آلودگیِ بیشتر نمی‌سازد.",
        },
      ],
      takeaway: "قبل از جواب دادن بپرس: سؤال درباره‌ی سوخت است، برق، اگزوز، یا هوای داخلِ اتاق؟ جوابِ هر کدام جداست.",
      rule: `${GUIDA_CO2}; ${EEA_AIR}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il climatizzatore", fa: "کولرِ خودرو" },
        { it: "il lunotto termico", fa: "گرم‌کنِ شیشه‌ی عقب" },
        { it: "la corrente elettrica", fa: "برق" },
        { it: "il veicolo ibrido", fa: "خودروی هیبریدی" },
        { it: "il motore a scoppio", fa: "موتورِ احتراقی (بنزینی)" },
        { it: "l'alimentazione elettrica", fa: "نیروی برق (خودروی برقی)" },
        { it: "il metano · il GPL", fa: "گازِ طبیعی (متان) · گازِ مایع (LPG)" },
        { it: "il ricircolo dell'aria", fa: "گردشِ داخلیِ هوا" },
        { it: "l'autonomia", fa: "بُردِ خودروی برقی" },
      ],
    },
    {
      kind: "trap",
      title: "«il climatizzatore»: کمتر یا فقط وقتی لازم است؟",
      body: "هر دو جمله درباره‌ی کولرند. یکی آن را صرفه‌جو می‌داند، دیگری می‌گوید کم و فقط وقتی لازم است:",
      examples: [
        {
          sourceId: "6761",
          textIt: "L'uso del climatizzatore comporta minor consumo di carburante",
          answer: 0,
          chunks: [
            { it: "L'uso del climatizzatore", fa: "استفاده از کولر" },
            { it: "comporta minor consumo di carburante", fa: "مصرفِ سوخت را کمتر می‌کند", verb: "comporta ← comportare", focus: "contrast" },
          ],
          translation: "استفاده از کولر مصرفِ سوخت را کمتر می‌کند.",
          why: "غلط است. کمپرسورِ کولر با موتور کار می‌کند و سوخت می‌خورد.",
        },
        {
          sourceId: "6826",
          textIt:
            "Per risparmiare carburante e salvaguardare l'ambiente dall'inquinamento atmosferico, è consigliabile azionare il climatizzatore il meno possibile e soltanto quando serve effettivamente",
          answer: 1,
          chunks: [
            { it: "Per risparmiare carburante e salvaguardare l'ambiente dall'inquinamento atmosferico,", fa: "برای صرفه‌جویی در سوخت و حفظِ محیط‌زیست از آلودگیِ هوا،", focus: "reason" },
            { it: "è consigliabile azionare il climatizzatore il meno possibile", fa: "بهتر است کولر را تا جایی که می‌شود کم روشن کنی" },
            { it: "e soltanto quando serve effettivamente", fa: "و فقط وقتی واقعاً لازم است", focus: "limit" },
          ],
          translation: "برای صرفه‌جویی در سوخت و حفظِ محیط‌زیست از آلودگیِ هوا، بهتر است کولر را تا جایی که می‌شود کم و فقط وقتی واقعاً لازم است روشن کنی.",
          why: "درست است. «soltanto quando serve» برای شیشه‌ی بخارگرفته هم جا می‌گذارد.",
        },
      ],
      takeaway: "کولر هیچ‌وقت «minor consumo» یا «diminuisce l'inquinamento» نمی‌آورد؛ «il meno possibile» درست است.",
      rule: GUIDA_CO2,
    },
  ],
  practice: [
    {
      sourceId: "6752",
      textIt: "Gli apparecchi e i dispositivi che funzionano a corrente elettrica (radio, luci, lunotto termico, ecc.) fanno aumentare i consumi di carburante del veicolo",
      answer: 1,
      chunks: [
        { it: "Gli apparecchi e i dispositivi che funzionano a corrente elettrica", fa: "دستگاه‌ها و وسیله‌هایی که با برق کار می‌کنند", verb: "funzionano ← funzionare" },
        { it: "(radio, luci, lunotto termico, ecc.)", fa: "(رادیو، چراغ‌ها، گرم‌کنِ شیشه‌ی عقب و…)" },
        { it: "fanno aumentare i consumi di carburante del veicolo", fa: "مصرفِ سوختِ خودرو را بیشتر می‌کنند", verb: "fanno ← fare" },
      ],
      translation: "دستگاه‌ها و وسیله‌هایی که با برق کار می‌کنند (رادیو، چراغ‌ها، گرم‌کنِ شیشه‌ی عقب و…) مصرفِ سوختِ خودرو را بیشتر می‌کنند.",
      why: "درست است (قدم ۱). برق را دینام می‌سازد و دینام را موتور می‌چرخاند؛ پس برق هم سوخت است. این جمله درباره‌ی خودروی سوختی است؛ در برقی، بُرد کم می‌شود.",
      rule: GUIDA_CO2,
      conceptStep: 1,
    },
    {
      sourceId: "6800",
      textIt: "L'inquinamento dell'aria prodotto dai veicoli diminuisce se si lascia acceso il climatizzatore",
      answer: 0,
      chunks: [
        { it: "L'inquinamento dell'aria prodotto dai veicoli", fa: "آلودگیِ هوای ناشی از وسیله‌ها" },
        { it: "diminuisce se si lascia acceso il climatizzatore", fa: "کم می‌شود اگر کولر را روشن بگذاری", verb: "diminuisce ← diminuire", focus: "contrast" },
      ],
      translation: "آلودگیِ هوای ناشی از وسیله‌ها کم می‌شود اگر کولر را روشن بگذاری.",
      why: "غلط است (قدم ۱). کولر سوختِ بیشتری می‌خواهد، و سوختِ بیشتر یعنی گازِ اگزوزِ بیشتر.",
      rule: GUIDA_CO2,
      conceptStep: 1,
    },
    {
      sourceId: "6762",
      textIt: "I veicoli ibridi (con due motori, a scoppio ed elettrico) inquinano di più perché azionati da due motori",
      answer: 0,
      chunks: [
        { it: "I veicoli ibridi", fa: "خودروهای هیبریدی" },
        { it: "(con due motori, a scoppio ed elettrico)", fa: "(با دو موتور، احتراقی و برقی)" },
        { it: "inquinano di più", fa: "بیشتر می‌آلایند", verb: "inquinano ← inquinare", focus: "contrast" },
        { it: "perché azionati da due motori", fa: "چون با دو موتور کار می‌کنند", focus: "reason" },
      ],
      translation: "خودروهای هیبریدی (با دو موتور، احتراقی و برقی) بیشتر می‌آلایند، چون با دو موتور کار می‌کنند.",
      why: "غلط است (قدم ۲). موتورِ برقی به موتورِ احتراقی کمک می‌کند تا سوختِ کمتری بسوزد؛ «دو موتور» یعنی دو برابر آلودگی نیست.",
      rule: `${GUIDA_CO2}; ${TECNICA}`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6752", "6761", "6800", "6826", "6834"] },
    { step: 2, sourceIds: ["6762", "6810"] },
  ],
};
