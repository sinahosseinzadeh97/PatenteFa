/**
 * src/content/ch5-segnali.ts
 * Chapter 5 (Segnali di precedenza), new lessons 1, 3 and 5: recognising a
 * precedence sign, where DARE PRECEDENZA / STOP and their preavvisi stand (and
 * why STOP is not ALT), and the yellow diamond in detail. Lessons 2, 4 and 8
 * are the pilot's original lessons in src/content/lessons.ts.
 *
 * Trust rules as in src/content/lessons.ts: every statement is a real bank
 * row (text, answer key and image snapshotted, checked by
 * tests/chapter5.test.ts and `npm run verify:lessons`); `translation` keeps
 * the claim's polarity; `related` maps each question to the one section that
 * teaches its fact.
 */
import type { Lesson } from "./lessons.js";
import { ALT_POLIZIA, PRESENZA, PRESENZA_FA, SIGN, SIGN_FA, STOP } from "./ch5-signs.js";

// ── Lesson 1 ──────────────────────────────────────────────────────────────────

export const lessonRiconoscerePrecedenza: Lesson = {
  id: "riconoscere-segnali-precedenza",
  titleFa: "تابلوی حق تقدم را بشناس",
  titleIt: "SEGNALI DI PRECEDENZA · PRESCRIZIONE",
  minutes: 4,
  signs: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس هر چهارده تابلوی این فصل را جزو خانواده‌ی «حق تقدم» می‌شناسی، حتی وقتی شکلش شبیه تابلوی خطر یا ممنوعیت است، و می‌گویی هر کدام به تو می‌گوید «راه بده» یا «دیگران به تو راه می‌دهند».",
      why: "زیر تقریباً هر تابلوی این فصل جمله‌ای هست مثل «این تابلوی خطر است» یا «این تابلوی دستوری است». این‌ها را نمی‌شود از روی شکل حدس زد؛ باید خانواده را بدانی.",
    },
    {
      kind: "table",
      title: "یک خانواده، شکل‌های مختلف",
      body: "آیین‌نامه تابلوها را سه دسته می‌کند: خطر، دستوری (prescrizione) و اطلاعاتی. تابلوهای حق تقدم زیرگروهِ تابلوهای دستوری‌اند، کنار ممنوعیت (فصل ۳) و اجبار (فصل ۴). پس هر تابلوی این فصل هم «segnale di precedenza» است و هم «segnale di prescrizione».",
      columns: ["شکل", "خانواده"],
      rows: [
        { label: "راه بده", it: "DARE PRECEDENZA", sign: 40, values: ["مثلث وارونه", "حق تقدم (دستوری). نه خطر است، نه خطرِ عمومی."] },
        { label: "ایست", it: "STOP", sign: 41, values: ["هشت‌ضلعی قرمز", "حق تقدم (دستوری)."] },
        { label: "پیش‌آگهی", it: "PREAVVISO", sign: 43, values: ["مثلث وارونه با پنل بالای آن", "حق تقدم (دستوری)؛ با اینکه از چیزی جلوتر خبر می‌دهد، تابلوی خطر نیست."] },
        { label: "باریکه", it: "SENSO UNICO ALTERNATO", sign: 45, values: ["دایره با حاشیه‌ی قرمز", "حق تقدم (دستوری)؛ شبیه ممنوعیت است ولی تابلوی ممنوعیت نیست."] },
        { label: "تقاطع در پیش", it: "INTERSEZIONE", sign: 48, values: ["مثلث با حاشیه‌ی قرمز", "حق تقدم. شکلش مثل تابلوی خطر است، ولی آیین‌نامه آن را جزو تابلوهای حق تقدم آورده است. همین‌طور ۴۴، ۴۷ و ۴۹ تا ۵۱."] },
        { label: "لوزی زرد و پایانش", it: "DIRITTO · FINE", sign: 46, values: ["لوزی", "حق تقدم (دستوری)؛ تابلوی اطلاعاتی نیست، حتی پایانش."] },
      ],
      takeaway: "در این فصل جواب «è un segnale di precedenza» و «è un segnale di prescrizione» همیشه درست است. «pericolo»، «divieto» و «indicazione» برای این تابلوها غلط است.",
      rule: "Codice della Strada art. 39 c.1 lett. b; DPR 495/1992 art. 105 c.1",
    },
    {
      kind: "classify",
      title: "تو راه می‌دهی یا به تو راه می‌دهند؟",
      body: "آیین‌نامه تابلوهای حق تقدم را دو کلاس می‌کند: کلاس ۱ به تو می‌گوید باید راه بدهی؛ کلاس ۲ می‌گوید دیگران باید به تو راه بدهند. هر تابلو را در یکی از دو دسته بگذار.",
      options: [
        { it: "DARE", fa: "تو باید راه بدهی" },
        { it: "AVERE", fa: "حق تقدم با توست" },
      ],
      items: [
        { prompt: "این تابلو؟", sign: 40, answer: 0, explain: "مثلث وارونه: به خودروهای جاده‌ای که واردش می‌شوی راه بده (درس ۲)." },
        { prompt: "این تابلو؟", sign: 52, answer: 1, explain: "لوزی زرد: جاده‌ی تو حق تقدم دارد (درس ۴)." },
        { prompt: "این تابلو؟", sign: 44, answer: 0, explain: "ضربدر در مثلث: در تقاطع بعدی قاعده‌ی عمومی برقرار است، یعنی به راست راه بده (درس ۴)." },
        { prompt: "این تابلو؟", sign: 49, answer: 1, explain: "خط پهن جاده‌ی توست و فرعی از چپ به آن می‌رسد: آن‌ها باید به تو راه بدهند (درس ۶)." },
        { prompt: "این تابلو؟", sign: 46, answer: 0, explain: "لوزی با نوار سیاه: حق تقدمت تمام شد، از این به بعد خودت باید راه بدهی (درس‌های ۴ و ۵)." },
        { prompt: "این تابلو؟", sign: 53, answer: 1, explain: "مربع آبی: در باریکه حق تقدم با توست؛ فلش قرمز جهتِ مقابل است که باید صبر کند (درس ۸)." },
      ],
      takeaway: "اول خانواده را بشناس (حق تقدم)، بعد کلاس را: «من راه می‌دهم» یا «به من راه می‌دهند». نیمی از سؤال‌های فصل همین دو قدم‌اند.",
      rule: "DPR 495/1992 art. 105 c.1 (classe I lett. a–f, classe II lett. g–i)",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il segnale di precedenza", fa: "تابلوی حق تقدم" },
        { it: "il segnale di prescrizione", fa: "تابلوی دستوری" },
        { it: "il segnale di pericolo", fa: "تابلوی خطر" },
        { it: "il segnale di divieto", fa: "تابلوی ممنوعیت" },
        { it: "il segnale di indicazione", fa: "تابلوی اطلاعاتی" },
        { it: "generico", fa: "عمومی؛ کلی", note: "«pericolo generico» یعنی «خطرهای دیگر» (فصل ۲)، نه تابلوهای این فصل." },
      ],
    },
    {
      kind: "trap",
      title: "شکلِ آشنا خانواده را عوض نمی‌کند",
      body: "تابلوی باریکه دایره‌ای با حاشیه‌ی قرمز است، درست مثل تابلوهای ممنوعیت و نزدیک به تابلوهای خطر. این دو جمله‌ی بانک درباره‌ی همین یک تابلوست:",
      examples: [
        {
          sourceId: "2236",
          sign: 45,
          textIt: "Il segnale raffigurato è un segnale di prescrizione",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "è un segnale di prescrizione", fa: "یک تابلوی دستوری است" },
          ],
          translation: "تابلوی نشان‌داده‌شده یک تابلوی دستوری است.",
          why: "درست است. تابلوی حق تقدم است و تابلوهای حق تقدم زیرگروهِ تابلوهای دستوری‌اند.",
        },
        {
          sourceId: "2256",
          sign: 45,
          textIt: "Il segnale raffigurato è un segnale di pericolo",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "è un segnale di pericolo", fa: "یک تابلوی خطر است", focus: "contrast" },
          ],
          translation: "تابلوی نشان‌داده‌شده یک تابلوی خطر است.",
          why: "غلط است. دستور می‌دهد (به جهت مقابل راه بده)، پس دستوری است، نه خطر. هشدارِ «باریکه در پیش» یک مثلث جداست (فصل ۲).",
        },
      ],
      takeaway: "«segnale di …» را با خانواده بسنج، نه با شکل یا رنگ. در این فصل خانواده همیشه «حق تقدم» است که نوعی «دستور» است.",
    },
  ],
  practice: [
    {
      sourceId: "2156",
      sign: 40,
      textIt: "Il segnale raffigurato è un segnale di prescrizione",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "è un segnale di prescrizione", fa: "یک تابلوی دستوری است" },
      ],
      translation: "تابلوی نشان‌داده‌شده یک تابلوی دستوری است.",
      why: "درست است (قدم ۱). DARE PRECEDENZA دستور می‌دهد راه بدهی؛ تابلوی حق تقدم نوعی تابلوی دستوری است.",
      rule: "Codice della Strada art. 39 c.1 lett. b; DPR 495/1992 art. 105 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2217",
      sign: 43,
      textIt: "Il segnale raffigurato è un segnale di pericolo",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "è un segnale di pericolo", fa: "یک تابلوی خطر است", focus: "contrast" },
      ],
      translation: "تابلوی نشان‌داده‌شده یک تابلوی خطر است.",
      why: "غلط است (قدم ۱). پیش‌آگهیِ STOP از قبل خبر می‌دهد، ولی خانواده‌اش حق تقدم است، نه خطر.",
      rule: "DPR 495/1992 art. 105 c.1; art. 108",
      conceptStep: 1,
    },
    {
      sourceId: "2302",
      sign: 48,
      textIt: "Il segnale raffigurato è un segnale di precedenza",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "è un segnale di precedenza", fa: "یک تابلوی حق تقدم است" },
      ],
      translation: "تابلوی نشان‌داده‌شده یک تابلوی حق تقدم است.",
      why: "درست است (قدم ۱). مثلثی است با حاشیه‌ی قرمز، ولی آیین‌نامه آن را تابلوی حق تقدم می‌داند: خبر می‌دهد که در تقاطع بعدی حق تقدم با توست.",
      rule: "DPR 495/1992 art. 105 c.1; art. 112 c.2",
      conceptStep: 1,
    },
    {
      sourceId: "2272",
      sign: 46,
      textIt: "Il segnale raffigurato è un segnale di indicazione",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "è un segnale di indicazione", fa: "یک تابلوی اطلاعاتی است", focus: "contrast" },
      ],
      translation: "تابلوی نشان‌داده‌شده یک تابلوی اطلاعاتی است.",
      why: "غلط است (قدم ۱). پایانِ حق تقدم هم تابلوی حق تقدم است، چون رفتارت را عوض می‌کند: از این به بعد باید راه بدهی.",
      rule: "DPR 495/1992 art. 105 c.1; art. 111",
      conceptStep: 1,
    },
    {
      sourceId: "2253",
      sign: 45,
      textIt: "Il segnale raffigurato è un segnale di divieto",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "è un segnale di divieto", fa: "یک تابلوی ممنوعیت است", focus: "contrast" },
      ],
      translation: "تابلوی نشان‌داده‌شده یک تابلوی ممنوعیت است.",
      why: "غلط است (قدم ۱). حاشیه‌ی قرمزِ دایره گول‌زننده است؛ این تابلو چیزی را ممنوع نمی‌کند، فقط می‌گوید در باریکه چه کسی اول برود.",
      rule: "DPR 495/1992 art. 105 c.1; art. 110",
      conceptStep: 1,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        "2148", "2156", "2167", "2191", "2209", "2217", "2221", "2236", "2253", "2256", "2264", "2272", "2302", "2314",
        "2350", "2352",
      ],
    },
  ],
};

// ── Lesson 3 ──────────────────────────────────────────────────────────────────

export const lessonDoveDareStop: Lesson = {
  id: "dove-dare-precedenza-stop",
  titleFa: "DARE PRECEDENZA و STOP کجا هستند؟",
  titleIt: "DARE PRECEDENZA · STOP · PREAVVISO · DOVE",
  minutes: 4,
  signs: [40, 41, 42, 43, 119],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی DARE PRECEDENZA، STOP و پیش‌آگهی‌هایشان کجا نصب می‌شوند (شهر، بیرون شهر، ورودی آزادراه، گذرگاه راه‌آهن) و STOP را با ایستِ پلیس، گمرک یا عوارضی اشتباه نمی‌گیری.",
      why: "درس ۲ گفت این تابلوها چه دستوری می‌دهند. بانک سؤال جدا می‌پرسد «کجا؟» و «فقط شهری؟»، و STOP را کنار ایست‌های دیگر می‌گذارد تا ببیند فرقشان را می‌دانی.",
    },
    {
      kind: "table",
      title: "هر تابلو کجا ایستاده است",
      body: "قاعده‌ی ساده: DARE PRECEDENZA و STOP همان‌جایی هستند که باید راه بدهی. پیش‌آگهی‌شان قبل از آن است، با پنلِ فاصله.",
      columns: ["کجا", "نکته"],
      rows: [
        {
          label: "راه بده",
          it: "DARE PRECEDENZA",
          sign: 40,
          values: [
            "هر جا از جاده‌ای بدون حق تقدم وارد جاده‌ی دیگری می‌شوی؛ هم داخل شهر، هم بیرون شهر. سرِ رمپِ ورود به آزادراه و خط شتابش هم همین تابلوست.",
            "خودِ تابلو در نقطه‌ی راه دادن است (حداکثر ۲۵ متر بیرون شهر، ۱۰ متر داخل شهر تا لبه‌ی جاده‌ی اصلی). دستورش احتیاط کامل برای پیشگیری از تصادف است.",
          ],
        },
        {
          label: "ایست",
          it: "STOP",
          sign: 41,
          values: [
            "سرِ تقاطع‌هایی که دید کم است یا خطرناک‌اند؛ و همچنین سرِ گذرگاه راه‌آهن بدون راه‌بند.",
            "سرِ گذرگاه راه‌آهن هم همان دستور: پشت خط توقف کامل بایست و فقط اگر قطاری دیده نمی‌شود رد شو.",
          ],
        },
        {
          label: "پیش‌آگهی",
          it: "PREAVVISO",
          sign: 43,
          values: [
            "بیرون شهر همیشه قبل از تقاطع نصب می‌شود. داخل شهر فقط وقتی جاده‌ی اصلی سرعت مجاز بالاتر از معمول دارد یا ترافیک لازمش کند.",
            "پس «فقط در شهر» و «فقط بیرون شهر» هر دو غلط‌اند. پیش‌آگهی از هر شکل تقاطعی می‌تواند خبر بدهد، مثلاً تقاطع T.",
          ],
        },
        {
          label: "۱۵۰ متر",
          values: [
            "فاصله‌ی معمولِ تابلوهای هشدارِ مثلثی تا تقاطع است (درس‌های ۴ و ۶).",
            "DARE PRECEDENZA هیچ‌جا، حتی در آزادراه، ۱۵۰ متر یا بیشتر قبل از نقطه‌ی ورود نیست؛ و ربطی به فاصله از پمپ‌بنزین یا محوطه‌ی خدمات ندارد.",
          ],
        },
      ],
      takeaway: "DARE و STOP = «همین‌جا». پیش‌آگهی = «جلوتر، به فاصله‌ی روی پنل». ۱۵۰ متر مال مثلث‌های هشدار است.",
      rule: "DPR 495/1992 art. 106 c.1–2; art. 107 c.1–4; art. 108 c.1–3; Codice della Strada art. 147 c.2 lett. b",
    },
    {
      kind: "compare",
      title: "STOP یا ALT؟ هر دو می‌گویند «بایست»",
      body: "در فصل ۴ سه تابلوی ALT را دیدی. آن‌ها هم توقف را اجباری می‌کنند، ولی دلیل و جایشان فرق دارد.",
      items: [STOP, ALT_POLIZIA],
      rows: [
        { label: "شکل", values: ["هشت‌ضلعی قرمز با نوشته‌ی STOP", "دایره با حاشیه‌ی قرمز و نوشته‌ی ALT"] },
        { label: "چرا می‌ایستی", values: ["تا به خودروهای جاده‌ای که واردش می‌شوی (یا به قطار) راه بدهی.", "چون پلیس، گمرک یا باجه‌ی عوارضیِ آزادراه آنجاست (فصل ۴، درس ۱۱)."] },
        {
          label: "پیش‌آگهی",
          values: [
            "مثلث وارونه با پنل «STOP … m»: فقط از STOP در تقاطعِ بعدی خبر می‌دهد؛ نه از گمرک، باجه‌ی عوارضی، ایست پلیس یا چراغ راهنمایی.",
            "پیش‌آگهیِ STOP برای آن به کار نمی‌رود.",
          ],
        },
        {
          label: "چه چیزی نیست",
          values: [
            "«عبور ممنوع» نیست: بعد از ایستادن و راه دادن رد می‌شوی. به باریکه‌ی یک‌طرفه‌ی نوبتی هم ربطی ندارد (درس ۸).",
            "تابلوی حق تقدم نیست؛ تابلوی اجبار است.",
          ],
        },
      ],
      takeaway: "STOP یعنی «بایست و راه بده». هر جمله‌ای که STOP یا پیش‌آگهی‌اش را به گمرک، پلیس، عوارضی، چراغ راهنمایی یا عبور ممنوع ربط بدهد غلط است.",
      rule: "DPR 495/1992 art. 107 c.1; art. 108 c.1, c.3; art. 123",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la rampa di raccordo", fa: "رمپ اتصال؛ راهِ ورود به آزادراه" },
        { it: "la corsia di accelerazione", fa: "خط شتاب؛ خطی که با آن سرعت می‌گیری و وارد می‌شوی" },
        { it: "l'immissione", fa: "ورود به جاده‌ی دیگر", note: "از فعل «immettersi»: وارد شدن." },
        { it: "il passaggio a livello", fa: "گذرگاه راه‌آهن (تقاطع جاده با ریل)" },
        { it: "il posto di blocco", fa: "ایست بازرسیِ پلیس" },
        { it: "il varco doganale", fa: "گذرگاه گمرک" },
        { it: "il casello autostradale", fa: "باجه‌ی عوارضیِ آزادراه" },
        { it: "solo", fa: "فقط", note: "«si trova solo su strade urbane» یعنی «فقط در جاده‌های شهری دیده می‌شود»." },
      ],
    },
    {
      kind: "trap",
      title: "«autostrada» هم جواب را لو نمی‌دهد",
      body: "هر دو جمله DARE PRECEDENZA را به آزادراه ربط می‌دهند. یکی جای واقعی تابلو را می‌گوید، دیگری فاصله‌ای را که مال تابلوهای هشدار است.",
      examples: [
        {
          sourceId: "2152",
          sign: 40,
          textIt: "Il segnale raffigurato si trova sulle corsie di accelerazione per l'immissione in autostrada",
          answer: 1,
          chunks: [
            { it: "Il segnale raffigurato si trova", fa: "تابلوی نشان‌داده‌شده دیده می‌شود", verb: "si trova ← trovarsi" },
            { it: "sulle corsie di accelerazione", fa: "روی خط‌های شتاب" },
            { it: "per l'immissione in autostrada", fa: "برای ورود به آزادراه" },
          ],
          translation: "تابلوی نشان‌داده‌شده روی خط‌های شتابِ ورود به آزادراه دیده می‌شود.",
          why: "درست است. کسی که وارد آزادراه می‌شود حق تقدم ندارد و باید به خودروهای آزادراه راه بدهد.",
        },
        {
          sourceId: "2164",
          sign: 40,
          textIt: "Il segnale raffigurato, lungo le autostrade, viene posto a distanza maggiore di 150 m",
          answer: 0,
          chunks: [
            { it: "Il segnale raffigurato,", fa: "تابلوی نشان‌داده‌شده،" },
            { it: "lungo le autostrade,", fa: "در طول آزادراه‌ها،" },
            { it: "viene posto", fa: "نصب می‌شود", verb: "viene posto ← porre" },
            { it: "a distanza maggiore di 150 m", fa: "با فاصله‌ای بیشتر از ۱۵۰ متر", focus: "contrast" },
          ],
          translation: "تابلوی نشان‌داده‌شده در طول آزادراه‌ها با فاصله‌ای بیشتر از ۱۵۰ متر نصب می‌شود.",
          why: "غلط است. DARE PRECEDENZA همان‌جایی است که باید راه بدهی، نه با فاصله‌ی ۱۵۰ متر یا بیشتر. این فاصله مال تابلوهای هشدار است.",
        },
      ],
      takeaway: "کلمه‌ی «autostrada» نه جمله را درست می‌کند نه غلط. بپرس: این تابلو کجای راه است؟ DARE PRECEDENZA همیشه سرِ نقطه‌ی راه دادن است.",
    },
  ],
  practice: [
    {
      sourceId: "2159",
      sign: 40,
      textIt: "Il segnale raffigurato si trova sulle rampe di raccordo per l'immissione in autostrada",
      answer: 1,
      chunks: [
        { it: "Il segnale raffigurato si trova", fa: "تابلوی نشان‌داده‌شده دیده می‌شود", verb: "si trova ← trovarsi" },
        { it: "sulle rampe di raccordo", fa: "روی رمپ‌های اتصال" },
        { it: "per l'immissione in autostrada", fa: "برای ورود به آزادراه" },
      ],
      translation: "تابلوی نشان‌داده‌شده روی رمپ‌های اتصالِ ورود به آزادراه دیده می‌شود.",
      why: "درست است (قدم ۱). رمپ ورود جاده‌ی بدون حق تقدم است؛ آنجا باید به خودروهای آزادراه راه بدهی.",
      rule: "DPR 495/1992 art. 106 c.1; art. 112 c.2–3",
      conceptStep: 1,
    },
    {
      sourceId: "2172",
      sign: 40,
      textIt: "Il segnale raffigurato si trova solo su strade extraurbane",
      answer: 0,
      chunks: [
        { it: "Il segnale raffigurato si trova", fa: "تابلوی نشان‌داده‌شده دیده می‌شود", verb: "si trova ← trovarsi" },
        { it: "solo su strade extraurbane", fa: "فقط در جاده‌های بیرون شهر", focus: "limit" },
      ],
      translation: "تابلوی نشان‌داده‌شده فقط در جاده‌های بیرون شهر دیده می‌شود.",
      why: "غلط است (قدم ۱). DARE PRECEDENZA داخل شهر هم هست؛ آیین‌نامه حتی فاصله‌ی جداگانه‌ای برای داخل شهر دارد (۱۰ متر).",
      rule: "DPR 495/1992 art. 106 c.2",
      conceptStep: 1,
    },
    {
      sourceId: "2181",
      sign: 41,
      textIt: "Il segnale raffigurato può trovarsi in corrispondenza di un passaggio a livello",
      answer: 1,
      chunks: [
        { it: "Il segnale raffigurato può trovarsi", fa: "تابلوی نشان‌داده‌شده ممکن است باشد", verb: "può ← potere" },
        { it: "in corrispondenza di un passaggio a livello", fa: "سرِ یک گذرگاه راه‌آهن" },
      ],
      translation: "تابلوی نشان‌داده‌شده ممکن است سرِ یک گذرگاه راه‌آهن باشد.",
      why: "درست است (قدم ۱). سرِ گذرگاه بدون راه‌بند ممکن است STOP باشد؛ آنجا هم باید پشت خط توقف کامل بایستی.",
      rule: "Codice della Strada art. 147 c.2 lett. b",
      conceptStep: 1,
    },
    {
      sourceId: "2189",
      sign: 41,
      textIt: "Il segnale raffigurato preannuncia l'obbligo di arresto ad un posto di blocco istituito dagli organi di polizia",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "preannuncia l'obbligo di arresto", fa: "از قبل خبرِ اجبارِ ایستادن را می‌دهد", verb: "preannuncia ← preannunciare" },
        { it: "ad un posto di blocco", fa: "در یک ایست بازرسی", focus: "contrast" },
        { it: "istituito dagli organi di polizia", fa: "که پلیس برقرار کرده", verb: "istituito ← istituire" },
      ],
      translation: "تابلوی نشان‌داده‌شده از قبل خبر می‌دهد که باید در یک ایست بازرسیِ پلیس بایستی.",
      why: "غلط است (قدم ۲). STOP برای راه دادن در تقاطع است؛ ایست پلیس تابلوی خودش را دارد: ALT – POLIZIA.",
      rule: "DPR 495/1992 art. 107 c.1; art. 123",
      conceptStep: 2,
    },
    {
      sourceId: "2212",
      sign: 43,
      textIt: "Il segnale raffigurato si trova solo nelle strade urbane",
      answer: 0,
      chunks: [
        { it: "Il segnale raffigurato si trova", fa: "تابلوی نشان‌داده‌شده دیده می‌شود", verb: "si trova ← trovarsi" },
        { it: "solo nelle strade urbane", fa: "فقط در جاده‌های شهری", focus: "limit" },
      ],
      translation: "تابلوی نشان‌داده‌شده فقط در جاده‌های شهری دیده می‌شود.",
      why: "غلط است (قدم ۱). برعکس: بیرون شهر پیش‌آگهی همیشه لازم است و داخل شهر فقط گاهی.",
      rule: "DPR 495/1992 art. 108 c.1",
      conceptStep: 1,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2152", "2159", "2160", "2164", "2166", "2170", "2172", "2181", "2196", "2212"] },
    { step: 2, sourceIds: ["2182", "2183", "2187", "2189", "2203", "2213", "2214", "2215"] },
  ],
};

// ── Lesson 5 ──────────────────────────────────────────────────────────────────

export const lessonStradaDiritto: Lesson = {
  id: "strada-con-diritto-di-precedenza",
  titleFa: "لوزی زرد: کجا، تا کجا، و چه چیزی نیست",
  titleIt: "DIRITTO DI PRECEDENZA · FINE · PANNELLO",
  minutes: 4,
  signs: [52, 46, 80, 81, 106, 224],
  figures: [972],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی لوزی زرد روی چه جاده‌هایی است، حق تقدمش تا کجا ادامه دارد، در برابر چه کسی کنار می‌رود، و نوار سیاه روی آن دقیقاً پایانِ چه چیزی است.",
      why: "درس ۴ معنی لوزی و پایانش را گفت. بانک سؤال چیزهای زیادی را به این دو تابلو نسبت می‌دهد که نمی‌گویند: جاده‌ی دولتی، آزادراه، خروج از شهر، پایان همه‌ی ممنوعیت‌ها.",
    },
    {
      kind: "table",
      title: "لوزی زرد: قاعده‌ها",
      body: "لوزی زرد فقط یک چیز می‌گوید: این تکه از جاده حق تقدم دارد. بقیه‌ی چیزها را از آن نتیجه نگیر.",
      columns: ["قاعده"],
      rows: [
        { label: "چه جاده‌ای", it: "strada statale", sign: 52, values: ["هر جاده‌ای که حق تقدم دارد، داخل یا بیرون شهر. ممکن است جاده‌ی دولتی (strada statale) باشد، ولی فقط مال آن نیست و ربطی به شروع یا پایان جاده‌ی دولتی ندارد. فقط مال جاده‌های پرترافیکِ بیرون شهر هم نیست."] },
        { label: "آزادراه", values: ["سرِ ورودیِ آزادراه نصب نمی‌شود؛ آزادراه تابلوی سبزِ خودش را دارد و تقاطع هم‌سطح ندارد."] },
        { label: "تا کجا", values: ["تا تابلوی پایان حق تقدم؛ نه تا خروج از شهر."] },
        { label: "تکرار", it: "formato piccolo", values: ["ممکن است قبل و بعد از هر تقاطع در اندازه‌ی کوچک تکرار شود، گاهی با پنلی زیرش که شکل تقاطع را نشان می‌دهد: خط پهن جاده‌ی اصلی است، خط‌های باریک فرعی‌ها."] },
        { label: "آژیر و چراغ آبی", values: ["حق تقدمِ لوزی زرد در برابر خودرویی که چراغ گردان آبی و آژیر روشن دارد کنار می‌رود: راه را باز کن و اگر لازم شد بایست."] },
        { label: "چه چیزی نیست", values: ["از گذرگاه عابر پیاده، خط ویژه‌ی اتوبوس یا کارگاه جاده‌ای خبر نمی‌دهد."] },
      ],
      takeaway: "لوزی زرد = حق تقدم، از اینجا تا تابلوی پایانش. نه نوع جاده را می‌گوید، نه آمبولانس را کنار می‌زند.",
      rule: "DPR 495/1992 art. 113 c.1–2; art. 111 c.1; Codice della Strada art. 177 c.3",
    },
    {
      kind: "table",
      title: "نوار سیاه روی لوزی: پایانِ فقط یک چیز",
      body: "خیلی از تابلوهای «پایان» نوار مورب دارند. لوزی با نوار سیاه فقط حق تقدم را تمام می‌کند؛ پایانِ چیزهای دیگر تابلوی خودشان را دارند.",
      columns: ["پایانِ چه چیزی؟"],
      rows: [
        { label: "پایان حق تقدم", it: "FINE DEL DIRITTO DI PRECEDENZA", sign: 46, values: ["فقط پایان حق تقدم؛ هم بیرون شهر هم داخل شهر."] },
        { label: "پایان همه‌ی ممنوعیت‌ها", it: "VIA LIBERA", sign: 80, values: ["تابلوی دیگری است (فصل ۳)."] },
        { label: "پایان محدودیت سرعت", it: "FINE LIMITAZIONE DI VELOCITÀ", sign: 81, values: ["تابلوی دیگری است (فصل ۳)."] },
        { label: "پایانِ یک اجبار", it: "FINE DEL LIMITE MINIMO", sign: 106, values: ["پایانِ اجبار آبی است با نوار قرمز (فصل ۴)."] },
        { label: "بن‌بست", it: "STRADA SENZA USCITA", sign: 224, values: ["تابلوی اطلاعاتی است، نه حق تقدم."] },
        { label: "پایان آزادراه، یک‌طرفه یا دوطرفه", values: ["هر کدام تابلوی خودشان را دارند. لوزی با نوار سیاه درباره‌ی نوع یا جهت جاده چیزی نمی‌گوید."] },
        { label: "شکل جاده‌ی اصلی", values: ["آن را پنلِ زیرِ لوزیِ کوچک نشان می‌دهد (قدم قبل)، نه تابلوی پایان."] },
      ],
      takeaway: "لوزی + نوار سیاه = «دیگر حق تقدم نداری». هر «پایانِ» دیگری در جمله‌ی سؤال یعنی غلط.",
      rule: "DPR 495/1992 art. 111 c.1–4",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la strada statale", fa: "جاده‌ی دولتی (ملی)" },
        { it: "esclusivamente", fa: "منحصراً؛ فقط", note: "مثل «solo»؛ جمله را محدود می‌کند." },
        { it: "il lampeggiante blu", fa: "چراغ گردانِ آبی" },
        { it: "la sirena", fa: "آژیر" },
        { it: "in formato piccolo", fa: "در اندازه‌ی کوچک" },
        { it: "il pannello integrativo", fa: "پنل تکمیلی؛ تابلوی کوچکِ زیرِ تابلوی اصلی" },
        { it: "l'andamento della strada", fa: "شکل و مسیرِ جاده" },
        { it: "fino all'uscita del centro abitato", fa: "تا خروج از شهر" },
      ],
    },
    {
      kind: "trap",
      title: "«può» یا «esclusivamente»؟",
      body: "هر دو جمله لوزی زرد را به جاده‌ی دولتی ربط می‌دهند. فقط یک کلمه فرق دارد:",
      examples: [
        {
          sourceId: "2348",
          sign: 52,
          textIt: "Il segnale raffigurato può essere posto su una strada statale",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "può essere posto", fa: "ممکن است نصب شود", focus: "condition", verb: "può ← potere" },
            { it: "su una strada statale", fa: "روی یک جاده‌ی دولتی" },
          ],
          translation: "تابلوی نشان‌داده‌شده ممکن است روی یک جاده‌ی دولتی نصب شود.",
          why: "درست است. جاده‌ی دولتی می‌تواند حق تقدم داشته باشد.",
        },
        {
          sourceId: "2366",
          sign: 52,
          textIt: "Il segnale raffigurato si trova esclusivamente all'inizio di una strada statale",
          answer: 0,
          chunks: [
            { it: "Il segnale raffigurato si trova", fa: "تابلوی نشان‌داده‌شده دیده می‌شود", verb: "si trova ← trovarsi" },
            { it: "esclusivamente", fa: "منحصراً", focus: "limit" },
            { it: "all'inizio di una strada statale", fa: "در ابتدای یک جاده‌ی دولتی" },
          ],
          translation: "تابلوی نشان‌داده‌شده منحصراً در ابتدای یک جاده‌ی دولتی دیده می‌شود.",
          why: "غلط است. هر جاده‌ای که حق تقدم دارد، دولتی یا نه، شهری یا بیرون شهری، این تابلو را دارد.",
        },
      ],
      takeaway: "«può» یک امکان را می‌گوید؛ «esclusivamente» همه‌ی امکان‌های دیگر را می‌بندد. بپرس: واقعاً فقط همین؟",
    },
  ],
  practice: [
    {
      sourceId: "2349",
      sign: 52,
      textIt: "In presenza del segnale raffigurato bisogna comunque dare la precedenza ai veicoli che hanno in funzione il lampeggiante blu e sirena",
      answer: 1,
      chunks: [
        { it: PRESENZA, fa: PRESENZA_FA },
        { it: "bisogna comunque dare la precedenza", fa: "در هر حال باید حق تقدم داد", focus: "always", verb: "bisogna ← bisognare" },
        { it: "ai veicoli che hanno in funzione", fa: "به خودروهایی که روشن دارند" },
        { it: "il lampeggiante blu e sirena", fa: "چراغ گردان آبی و آژیر" },
      ],
      translation: "وقتی این تابلو هست، در هر حال باید به خودروهایی که چراغ گردان آبی و آژیر روشن دارند حق تقدم داد.",
      why: "درست است (قدم ۱). خودروی امدادی با چراغ آبی و آژیر بر حق تقدمِ لوزی زرد مقدم است.",
      rule: "Codice della Strada art. 177 c.3",
      conceptStep: 1,
    },
    {
      sourceId: "2370",
      sign: 52,
      textIt: "Il segnale raffigurato indica che si ha la precedenza fino all'uscita del centro abitato",
      answer: 0,
      chunks: [
        { it: "Il segnale raffigurato indica", fa: "تابلوی نشان‌داده‌شده نشان می‌دهد", verb: "indica ← indicare" },
        { it: "che si ha la precedenza", fa: "که حق تقدم داری" },
        { it: "fino all'uscita del centro abitato", fa: "تا خروج از شهر", focus: "limit" },
      ],
      translation: "تابلوی نشان‌داده‌شده نشان می‌دهد که تا خروج از شهر حق تقدم داری.",
      why: "غلط است (قدم ۱). حق تقدم تا تابلوی پایانش ادامه دارد، نه تا مرز شهر.",
      rule: "DPR 495/1992 art. 111 c.1; art. 113 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2365",
      sign: 52,
      textIt: "Il segnale raffigurato si trova all'inizio di un'autostrada",
      answer: 0,
      chunks: [
        { it: "Il segnale raffigurato si trova", fa: "تابلوی نشان‌داده‌شده دیده می‌شود", verb: "si trova ← trovarsi" },
        { it: "all'inizio di un'autostrada", fa: "در ابتدای یک آزادراه", focus: "contrast" },
      ],
      translation: "تابلوی نشان‌داده‌شده در ابتدای یک آزادراه دیده می‌شود.",
      why: "غلط است (قدم ۱). شروعِ آزادراه تابلوی سبزِ خودش را دارد؛ لوزی زرد فقط حق تقدم را نشان می‌دهد.",
      rule: "DPR 495/1992 art. 113 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2271",
      sign: 46,
      textIt: "Il segnale raffigurato indica la fine del diritto di precedenza anche sulle strade urbane",
      answer: 1,
      chunks: [
        { it: "Il segnale raffigurato indica", fa: "تابلوی نشان‌داده‌شده نشان می‌دهد", verb: "indica ← indicare" },
        { it: "la fine del diritto di precedenza", fa: "پایان حق تقدم را" },
        { it: "anche sulle strade urbane", fa: "در جاده‌های شهری هم", focus: "always" },
      ],
      translation: "تابلوی نشان‌داده‌شده پایان حق تقدم را در جاده‌های شهری هم نشان می‌دهد.",
      why: "درست است (قدم ۲). هر جا لوزی زرد بوده، چه در شهر چه بیرون، پایانش همین تابلوست.",
      rule: "DPR 495/1992 art. 111 c.1–3",
      conceptStep: 2,
    },
    {
      sourceId: "2283",
      sign: 46,
      textIt: "Il segnale raffigurato indica la fine di tutti i divieti",
      answer: 0,
      chunks: [
        { it: "Il segnale raffigurato indica", fa: "تابلوی نشان‌داده‌شده نشان می‌دهد", verb: "indica ← indicare" },
        { it: "la fine di tutti i divieti", fa: "پایان همه‌ی ممنوعیت‌ها را", focus: "contrast" },
      ],
      translation: "تابلوی نشان‌داده‌شده پایان همه‌ی ممنوعیت‌ها را نشان می‌دهد.",
      why: "غلط است (قدم ۲). فقط پایان حق تقدم است. پایان همه‌ی ممنوعیت‌ها تابلوی VIA LIBERA است (فصل ۳).",
      rule: "DPR 495/1992 art. 111 c.1",
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: ["2348", "2349", "2355", "2359", "2360", "2362", "2363", "2365", "2366", "2369", "2370"],
    },
    { step: 2, sourceIds: ["2271", "2275", "2277", "2278", "2279", "2280", "2281", "2282", "2283"] },
  ],
};
