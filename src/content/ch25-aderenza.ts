/**
 * src/content/ch25-aderenza.ts
 * Chapter 25 (Elementi del veicolo, manutenzione e comportamenti), lessons 1–2:
 * grip between tyre and road, and what a curve does to a vehicle
 * (bank groups 627–635).
 *
 *  L1 what grip does, what raises or lowers it, low grip, two-wheelers on rails
 *     and wet markings (627–632). 6868–6877 (braking distance, speed) stay with
 *     chapters 11 and 12 and are linked by lesson title.
 *  L2 the outward push in a curve, skid or rollover, what makes a rollover
 *     easier (633–635). Drawing `ribaltamento`.
 *
 * Physics in words, no coefficients: the bank gives none, so neither do the
 * lessons. Trust rules as in src/content/lessons.ts; checked by tests/chapter25.test.ts.
 */
import type { Lesson } from "./lessons.js";
import { CHOICES, COMPARE, EXERCISE, FISICA, MANUALE } from "./ch25-common.js";

const FA = "La forza aderente";
const FA_FA = "نیروی چسبندگی";
const RIB = "Il ribaltamento in curva del veicolo è favorito da";
const RIB_FA = "واژگون شدنِ وسیله در پیچ آسان‌تر می‌شود با";

export const lessonAderenza: Lesson = {
  id: "aderenza-pneumatico-strada",
  titleFa: "چسبندگی: جایی که لاستیک به جاده می‌رسد",
  titleIt: "FORZA ADERENTE · ADERENZA · FONDO STRADALE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی نیروی چسبندگی چیست و چه کاری برای خودرو می‌کند: راه افتادن، ماندن در مسیر، و سُر نخوردن. و می‌دانی چه چیزی آن را کم یا زیاد می‌کند: سطحِ جاده، آب، برگ، یخ، گِل، روغن، فشارِ بادِ لاستیک؛ و برای موتورسیکلت، ریل و خط‌کشیِ خیس.",
      why:
        "۲۶ سؤال. جمله‌ی غلط معمولاً یکی از این دو کار را می‌کند: یک سطحِ لغزنده (خیس، برگ، یخ، گِل) را «چسبنده‌تر» جا می‌زند، یا چسبندگی را از چیزی جدا می‌کند که به آن ربط دارد («به فشارِ لاستیک ربط ندارد»، «در برابرِ بادِ پهلو کاری نمی‌کند»). یک قاعده همه را حل می‌کند: هر چیزی که بینِ لاستیک و آسفالت بنشیند یا تماسِ لاستیک را بد کند، چسبندگی را کم می‌کند.",
      rule: FISICA,
    },
    {
      kind: "factors",
      title: "نیروی چسبندگی چه کار می‌کند",
      body:
        "نیروی چسبندگی همان نیرویی است که بینِ لاستیک و آسفالت کار می‌کند و نمی‌گذارد لاستیک روی جاده سُر بخورد. خودرو فقط از همین راه می‌تواند راه بیفتد، بپیچد و بایستد: موتور، فرمان و ترمز همه از طریقِ همین چند سانتیمترِ تماسِ لاستیک کار می‌کنند. این‌ها را بانک درست و غلط می‌داند:",
      columns: [
        {
          title: "درست است (VERO)",
          items: [
            { fa: "حرکتِ خودرو را ممکن می‌کند", it: "consente il movimento del veicolo", sourceId: "6855", textIt: "La forza aderente consente il movimento del veicolo", answer: 1 },
            { fa: "نمی‌گذارد خودرو در پیچ به بیرون سُر بخورد", it: "si oppone allo slittamento verso l'esterno della curva", sourceId: "6856", textIt: "La forza aderente si oppone allo slittamento verso l'esterno della curva", answer: 1 },
            { fa: "خودرو را در مسیری که می‌خواهی نگه می‌دارد", it: "consente al veicolo di percorrere la traiettoria voluta", sourceId: "6857", textIt: "La forza aderente consente al veicolo di percorrere la traiettoria voluta", answer: 1 },
          ],
        },
        {
          title: "غلط است (FALSO)",
          items: [
            { fa: "اگر زیاد باشد، ترمز را داغ می‌کند", it: "se eccessiva, comporta il surriscaldamento dei freni", sourceId: "6860", textIt: "La forza aderente, se eccessiva, comporta il surriscaldamento dei freni", answer: 0 },
          ],
        },
      ],
      takeaway: "چسبندگیِ «زیاد» هیچ‌وقت مشکل نیست؛ هرچه بیشتر، خودرو بهتر راه می‌افتد، می‌پیچد و می‌ایستد. داغ شدنِ ترمز موضوعِ دیگری است (درسِ ۴).",
      rule: FISICA,
    },
    {
      kind: "table",
      title: "چه چیزی چسبندگی را بیشتر یا کمتر می‌کند",
      body:
        "بهترین حالت آسفالتِ خشک، تمیز و زبر است. هر چیزی که بینِ لاستیک و آسفالت بنشیند (آب، برگ، گِل، یخ، روغن) مثل یک لایه‌ی لغزنده عمل می‌کند. وضعِ خودِ لاستیک هم مهم است:",
      columns: ["اثر بر چسبندگی", "چه کنی"],
      rows: [
        { label: "آسفالتِ خشک، تمیز و زبر", it: "asciutto e pulito · rugoso", values: ["بیشترین چسبندگی", "حتی این‌جا هم حدی دارد؛ با سرعتِ مناسب برو"] },
        { label: "آسفالتِ خیس", it: "l'asfalto è bagnato", values: ["کمتر", "آرام‌تر برو و فاصله را بیشتر کن؛ آب‌گرفتگی: فصلِ ۲۱، «باران و آکواپلنینگ»"] },
        { label: "برگ، گِل، یخ", it: "foglie · fango · ghiaccio", values: ["کمتر، گاهی خیلی کمتر", "پیش از رسیدن سرعت کم کن، نه روی خودِ لایه؛ یخ: فصلِ ۲۱، «یخ، و چسبندگیِ لاستیک»"] },
        { label: "روغن روی جاده", it: "la strada è sporca di olio", values: ["کمتر", "ترمز و پیچِ تند روی لکه نه"] },
        { label: "فشارِ بادِ لاستیک", it: "la pressione dei pneumatici", values: ["فشارِ نادرست تماسِ لاستیک را بد می‌کند و چسبندگی کم می‌شود", "فشارِ سازنده، با لاستیکِ سرد (درسِ ۶)"] },
      ],
      takeaway: "خیس، برگ، یخ، گِل، روغن: همه «کمتر». هیچ کدام چسبندگی را «بیشتر» نمی‌کنند.",
      rule: FISICA,
    },
    {
      kind: "table",
      title: "وقتی چسبندگی کم است",
      body:
        "ضریبِ چسبندگی می‌گوید لاستیک روی یک سطح چقدر می‌چسبد. وقتی کم است، همان کاری که روی آسفالتِ خشک بی‌خطر بود، این‌جا می‌تواند لاستیک را سُر بدهد. دو موضوعِ نزدیک را فصل‌های قبل درس داده‌اند: مسافتِ ترمز (فصلِ ۱۲، «ترمز و کل مسافتِ توقف») و سرعتِ مناسب (فصلِ ۱۱، «سرعتِ مناسبِ همان لحظه»).",
      columns: ["چه می‌شود", "چه کنی"],
      rows: [
        { label: "راه افتادن و گاز دادن", it: "le ruote motrici potrebbero pattinare", values: ["چرخ‌های محرک ممکن است درجا بچرخند", "آرام گاز بده"] },
        { label: "پیچ", it: "favorisce lo slittamento in curva", values: ["خودرو راحت‌تر به بیرونِ پیچ سُر می‌خورد", "پیش از پیچ سرعت کم کن"] },
        { label: "ترمزِ ناگهانی", it: "rende pericolose le frenate brusche", values: ["چرخ‌ها راحت‌تر قفل می‌شوند یا خودرو منحرف می‌شود", "زودتر و نرم‌تر ترمز کن؛ ABS: درسِ ۳"] },
        { label: "مصرفِ سوخت", it: "diminuisce i consumi di carburante", values: ["ربطی ندارد؛ چسبندگیِ کم مصرف را کم نمی‌کند", "—"] },
      ],
      takeaway: "چسبندگیِ کم یعنی همه چیز سخت‌تر: راه افتادن، پیچیدن، ایستادن. جوابش همیشه سرعتِ کمتر و حرکتِ نرم‌تر است.",
      rule: FISICA,
    },
    {
      kind: "table",
      title: "دوچرخ‌ها: ریل، خط‌کشی و ترک‌نشین",
      body:
        "موتورسیکلت فقط دو نقطه‌ی تماسِ کوچک دارد، و وقتی خم شده در پیچ است، کمترین تغییرِ سطح حس می‌شود. بانک سه جای مشخص را نام می‌برد:",
      columns: ["اثر بر چسبندگی", "چه کنی"],
      rows: [
        { label: "ریلِ تراموا یا قطار", it: "sulle rotaie specialmente in caso di pioggia", values: ["کمتر، به‌خصوص زیرِ باران", "ریل را تا جایی که می‌شود صاف و عمود رد کن، نه در حالِ خم شدن یا ترمز"] },
        { label: "خط‌کشیِ روی آسفالت، خیس", it: "sulle strisce della segnaletica orizzontale", values: ["کمتر از آسفالتِ کنارش", "روی خط ترمزِ تند و خم شدنِ زیاد نه"] },
        { label: "نوعِ سطحِ جاده", it: "il tipo di pavimentazione stradale", values: ["مهم است: آسفالت، سنگ‌فرش و ریل یکسان نیستند", "سطح را از دور بخوان"] },
        { label: "ترک‌نشین", it: "quando trasporta un passeggero", values: ["به گفته‌ی بانک چسبندگی را کم نمی‌کند؛ وزنِ بیشتر لاستیک را محکم‌تر هم روی جاده فشار می‌دهد", "ولی تعادل و رفتارِ موتور عوض می‌شود؛ نرم‌تر برو"] },
      ],
      takeaway: "برای موتورسوار، ریل و خط‌کشیِ خیس دو جای همیشه‌ی لغزنده‌اند. ترک‌نشین چسبندگی را کم نمی‌کند، رفتارِ موتور را عوض می‌کند.",
      rule: FISICA,
    },
    {
      kind: "classify",
      title: "تمرین: چسبندگی بیشتر می‌شود، کمتر، یا عوض نمی‌شود؟",
      body: `${EXERCISE} برای هر موقعیت بگو چسبندگیِ لاستیک به جاده چه می‌شود:`,
      options: [
        { it: "più aderenza", fa: "چسبندگیِ بیشتر" },
        { it: "meno aderenza", fa: "چسبندگیِ کمتر" },
        { it: "l'aderenza non cambia", fa: "چسبندگی عوض نمی‌شود" },
      ],
      items: [
        { prompt: "جاده‌ای که بعد از چند روز باران حالا خشک و تمیز شده، با آسفالتِ زبر", answer: 0, explain: "خشک، تمیز و زبر بهترین حالت است (قدمِ ۲)." },
        { prompt: "آسفالتی که رویش برگِ خیس ریخته", answer: 1, explain: "برگ و آب هر دو لایه‌ی لغزنده می‌سازند (قدمِ ۲)." },
        { prompt: "موتورسیکلت روی ریلِ تراموا، زیرِ باران", answer: 1, explain: "ریلِ خیس برای دوچرخ‌ها خیلی لغزنده است؛ صاف و عمود ردش کن (قدمِ ۴)." },
        { prompt: "همان خودرو و همان جاده، فقط بادِ تندی از پهلو شروع می‌شود", answer: 2, explain: "باد خودِ چسبندگی را عوض نمی‌کند؛ نیرویی است که چسبندگی باید در برابرش خودرو را نگه دارد. برای همین در باد آرام‌تر برو (قدمِ ۱)." },
        { prompt: "لاستیک‌هایی که فشارشان خیلی کمتر از مقدارِ سازنده است", answer: 1, explain: "فشارِ نادرست تماسِ لاستیک با جاده را بد می‌کند (قدمِ ۲)." },
        { prompt: "موتورسیکلتی که حالا یک ترک‌نشین دارد، روی همان آسفالتِ خشک", answer: 2, explain: "بانک می‌گوید ترک‌نشین چسبندگی را کم نمی‌کند. ولی تعادل، ترمز گرفتن و رفتارِ موتور عوض می‌شود (قدمِ ۴)." },
      ],
      takeaway: "پیش از جواب بپرس: چیزی بینِ لاستیک و جاده آمده، یا فقط نیروی دیگری به خودرو وارد شده؟",
      rule: FISICA,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la forza aderente", fa: "نیروی چسبندگی" },
        { it: "l'aderenza", fa: "چسبندگی (لاستیک به جاده)" },
        { it: "il coefficiente di aderenza", fa: "ضریبِ چسبندگی" },
        { it: "lo slittamento", fa: "سُر خوردن" },
        { it: "pattinare", fa: "درجا چرخیدنِ چرخ", base: "pattinare" },
        { it: "le ruote motrici", fa: "چرخ‌های محرک" },
        { it: "l'asfalto rugoso", fa: "آسفالتِ زبر" },
        { it: "la pavimentazione stradale", fa: "سطحِ جاده (روسازی)" },
        { it: "le rotaie", fa: "ریل‌ها" },
        { it: "la segnaletica orizzontale", fa: "خط‌کشیِ روی آسفالت" },
      ],
    },
    {
      kind: "trap",
      title: "«aumenta se l'asfalto è…»: کدام سطح؟",
      body: "هر دو جمله با «نیروی چسبندگی بیشتر می‌شود اگر آسفالت…» شروع می‌شوند. فقط کلمه‌ی آخر فرق دارد:",
      examples: [
        {
          sourceId: "6861",
          textIt: "La forza aderente aumenta se l'asfalto è rugoso",
          answer: 1,
          chunks: [
            { it: FA, fa: FA_FA },
            { it: "aumenta", fa: "بیشتر می‌شود", verb: "aumenta ← aumentare" },
            { it: "se l'asfalto è rugoso", fa: "اگر آسفالت زبر باشد", focus: "condition" },
          ],
          translation: "نیروی چسبندگی بیشتر می‌شود اگر آسفالت زبر باشد.",
          why: "درست است. آسفالتِ زبر لاستیک را بهتر نگه می‌دارد.",
        },
        {
          sourceId: "6863",
          textIt: "La forza aderente aumenta se l'asfalto è bagnato",
          answer: 0,
          chunks: [
            { it: FA, fa: FA_FA },
            { it: "aumenta", fa: "بیشتر می‌شود", verb: "aumenta ← aumentare", focus: "contrast" },
            { it: "se l'asfalto è bagnato", fa: "اگر آسفالت خیس باشد", focus: "condition" },
          ],
          translation: "نیروی چسبندگی بیشتر می‌شود اگر آسفالت خیس باشد.",
          why: "غلط است. آب بینِ لاستیک و آسفالت می‌نشیند و چسبندگی را کم می‌کند.",
        },
      ],
      takeaway: "کنارِ «aumenta» فقط «rugoso» یا «asciutto e pulito» درست است؛ bagnato، foglie، ghiaccio، fango یعنی جمله غلط است.",
      rule: FISICA,
    },
  ],
  practice: [
    {
      sourceId: "6858",
      textIt: "La forza aderente si oppone allo slittamento dello pneumatico sull'asfalto",
      answer: 1,
      chunks: [
        { it: FA, fa: FA_FA },
        { it: "si oppone allo slittamento", fa: "جلوی سُر خوردن را می‌گیرد", verb: "si oppone ← opporsi" },
        { it: "dello pneumatico sull'asfalto", fa: "ی لاستیک روی آسفالت" },
      ],
      translation: "نیروی چسبندگی جلوی سُر خوردنِ لاستیک روی آسفالت را می‌گیرد.",
      why: "درست است (قدم ۱). کارِ اصلیِ چسبندگی همین است: لاستیک روی جاده نلغزد.",
      rule: FISICA,
      conceptStep: 1,
    },
    {
      sourceId: "6859",
      textIt: "La forza aderente non si oppone allo slittamento causato dal vento laterale",
      answer: 0,
      chunks: [
        { it: FA, fa: FA_FA },
        { it: "non si oppone allo slittamento", fa: "جلوی سُر خوردن را نمی‌گیرد", verb: "si oppone ← opporsi", focus: "negation" },
        { it: "causato dal vento laterale", fa: "که بادِ پهلو باعثش شده" },
      ],
      translation: "نیروی چسبندگی جلوی سُر خوردنی را که بادِ پهلو باعثش شده نمی‌گیرد.",
      why: "غلط است (قدم ۱). چسبندگی در برابرِ هر نیرویی که خودرو را به پهلو هل بدهد کار می‌کند، باد هم.",
      rule: FISICA,
      conceptStep: 1,
    },
    {
      sourceId: "6888",
      textIt: "La forza aderente non dipende dalla pressione dei pneumatici",
      answer: 0,
      chunks: [
        { it: FA, fa: FA_FA },
        { it: "non dipende", fa: "بستگی ندارد", verb: "dipende ← dipendere", focus: "negation" },
        { it: "dalla pressione dei pneumatici", fa: "به فشارِ بادِ لاستیک‌ها" },
      ],
      translation: "نیروی چسبندگی به فشارِ بادِ لاستیک‌ها بستگی ندارد.",
      why: "غلط است (قدم ۲). فشارِ کم یا زیاد شکلِ تماسِ لاستیک با جاده را عوض می‌کند و چسبندگی کم می‌شود.",
      rule: `${FISICA}; ${MANUALE}`,
      conceptStep: 2,
    },
    {
      sourceId: "6879",
      textIt: "Il coefficiente di aderenza basso riduce lo slittamento in curva",
      answer: 0,
      chunks: [
        { it: "Il coefficiente di aderenza basso", fa: "ضریبِ چسبندگیِ کم" },
        { it: "riduce lo slittamento in curva", fa: "سُر خوردن در پیچ را کم می‌کند", verb: "riduce ← ridurre", focus: "contrast" },
      ],
      translation: "ضریبِ چسبندگیِ کم سُر خوردن در پیچ را کم می‌کند.",
      why: "غلط است (قدم ۳). وارونه است: چسبندگیِ کم سُر خوردن در پیچ را آسان‌تر می‌کند.",
      rule: FISICA,
      conceptStep: 3,
    },
    {
      sourceId: "6881",
      textIt: "Chi conduce un motociclo deve considerare che l'aderenza diminuisce sulle strisce della segnaletica orizzontale in caso di pioggia",
      answer: 1,
      chunks: [
        { it: "Chi conduce un motociclo deve considerare", fa: "کسی که موتورسیکلت می‌راند باید در نظر بگیرد", verb: "conduce ← condurre" },
        { it: "che l'aderenza diminuisce", fa: "که چسبندگی کم می‌شود", verb: "diminuisce ← diminuire" },
        { it: "sulle strisce della segnaletica orizzontale", fa: "روی خط‌کشیِ روی آسفالت" },
        { it: "in caso di pioggia", fa: "وقتی باران می‌آید", focus: "condition" },
      ],
      translation: "کسی که موتورسیکلت می‌راند باید در نظر بگیرد که وقتی باران می‌آید، چسبندگی روی خط‌کشیِ روی آسفالت کم می‌شود.",
      why: "درست است (قدم ۴). رنگِ خط‌کشی، خیس که باشد، از آسفالتِ کنارش لغزنده‌تر است.",
      rule: FISICA,
      conceptStep: 4,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6855", "6856", "6857", "6858", "6859", "6860"] },
    { step: 2, sourceIds: ["6861", "6862", "6863", "6864", "6865", "6866", "6884", "6885", "6886", "6887", "6888"] },
    { step: 3, sourceIds: ["6867", "6873", "6875", "6878", "6879"] },
    { step: 4, sourceIds: ["6880", "6881", "6882", "6883"] },
  ],
};

export const lessonCurva: Lesson = {
  id: "curva-sbandamento-ribaltamento",
  titleFa: "پیچ: لیز خوردن یا واژگون شدن",
  titleIt: "CURVA · SBANDAMENTO · RIBALTAMENTO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی در پیچ چه نیرویی خودرو را به بیرون می‌برد، چرا سرعتِ زیاد یا لیز خوردن می‌آورد یا واژگونی، و چه چیزی واژگونی را آسان‌تر می‌کند: بارِ بالا، بارِ لق، فاصله‌ی کمِ چرخ‌ها و پیچِ تنگ.",
      why:
        "۱۵ سؤال. جمله‌ی غلط جهت را برمی‌گرداند (نیرو «به داخل»)، چاره را وارونه می‌کند («تندتر برو تا لیز نخوری»)، یا یک عاملِ ایمن را خطرناک جا می‌زند (بارِ پایین، چرخ‌های پهن، پیچِ باز). یک کلمه هم دام است: این‌جا carreggiata یعنی فاصله‌ی چرخ‌های یک محور، نه سواره‌روی جاده.",
      rule: FISICA,
    },
    {
      kind: "anatomy",
      title: "یک وسیله‌ی بلند در پیچ، از پشت",
      scene: "ribaltamento",
      body:
        "تصویر یک ون را از پشت نشان می‌دهد که به چپ می‌پیچد؛ مرکزِ پیچ سمتِ چپ است. هر بخش را لمس کن. تصویر ساده است و اندازه‌ها واقعی نیستند.",
      parts: [
        { id: "esterno", nameIt: "la forza verso l'esterno (centrifuga)", nameFa: "نیرویی که به بیرونِ پیچ می‌برد", text: "در هر پیچ نیرویی خودرو را به بیرونِ پیچ می‌کشد، نه به داخل. با سرعتِ بیشتر خیلی سریع‌تر بیشتر می‌شود (با توانِ دوِ سرعت)، و در پیچِ تنگ‌تر هم بیشتر است." },
        { id: "aderente", nameIt: "la forza aderente", nameFa: "نیروی چسبندگی", text: "لاستیک‌ها با چسبندگی خودرو را به سمتِ مرکزِ پیچ نگه می‌دارند. اگر نیروی بیرون‌بر از چسبندگی بیشتر شود، خودرو لیز می‌خورد (sbandamento)." },
        { id: "baricentro", nameIt: "il baricentro", nameFa: "مرکزِ ثقل", text: "نقطه‌ای که وزنِ وسیله انگار آن‌جا جمع شده. هرچه بالاتر باشد، نیروی بیرون‌بر راحت‌تر وسیله را روی چرخ‌های بیرونی می‌خواباند." },
        { id: "carico", nameIt: "il carico posto in alto", nameFa: "بارِ بالا", text: "بار روی سقف یا بالای قفسه مرکزِ ثقل را بالا می‌برد. بارِ لق در پیچ جابه‌جا می‌شود و یک‌باره به سمتِ بیرون فشار می‌آورد." },
        { id: "carreggiata", nameIt: "la carreggiata (del veicolo)", nameFa: "فاصله‌ی چرخ‌های یک محور", text: "در این‌جا carreggiata یعنی فاصله‌ی بینِ دو چرخِ یک محور، نه سواره‌روی جاده. هرچه این فاصله کمتر باشد، وسیله راحت‌تر واژگون می‌شود." },
        { id: "raggio", nameIt: "il raggio di curvatura", nameFa: "شعاعِ پیچ", text: "پیچِ تنگ یعنی شعاعِ کوچک. با همان سرعت، در پیچِ تنگ نیروی بیرون‌بر بیشتر است تا در پیچِ باز." },
      ],
      takeaway: "در پیچ نیرو همیشه به بیرون است. چسبندگی آن را نگه می‌دارد؛ مرکزِ ثقلِ پایین و چرخ‌های پهن جلوی واژگونی را می‌گیرند.",
      rule: FISICA,
    },
    {
      kind: "table",
      title: "دو خطرِ سرعتِ زیاد در پیچ",
      body:
        "اگر نیروی بیرون‌بر از چیزی که وسیله تحمل می‌کند بیشتر شود، یکی از دو اتفاق می‌افتد. کدام زودتر؟ به خودرو بستگی دارد:",
      columns: ["چه می‌شود", "کدام وسیله‌ها بیشتر"],
      rows: [
        { label: "لیز خوردن", it: "lo sbandamento", values: ["لاستیک‌ها دیگر نمی‌گیرند و خودرو به بیرونِ پیچ می‌رود", "سواری‌ها با مرکزِ ثقلِ پایین معمولاً اول لیز می‌خورند"] },
        { label: "واژگونی", it: "il ribaltamento", values: ["وسیله روی چرخ‌های بیرونی بلند می‌شود و می‌افتد", "وسیله‌ی بلند و پربار (ون، کامیون، بارِ روی سقف) زودتر واژگون می‌شود"] },
        { label: "سرعتِ بیشتر", it: "la forza ribaltante aumenta all'aumentare della velocità", values: ["نیروی واژگون‌کننده بیشتر می‌شود، و خیلی سریع: دو برابرِ سرعت، چهار برابرِ نیرو", "هر دو خطر با سرعت بزرگ‌تر می‌شوند"] },
        { label: "«تندتر برو تا لیز نخوری»", it: "si deve aumentare la velocità", values: ["غلط: سرعتِ بیشتر هر دو خطر را بیشتر می‌کند", "پیش از پیچ، در مسیرِ صاف، سرعت را کم کن"] },
      ],
      takeaway: "در پیچ، چاره همیشه سرعتِ کمتر است، و آن را پیش از پیچ کم کن.",
      rule: FISICA,
    },
    {
      kind: "factors",
      title: "چه چیزی واژگونی را آسان‌تر می‌کند",
      body:
        "همه‌ی جمله‌های این گروه با «واژگون شدنِ وسیله در پیچ آسان‌تر می‌شود با…» شروع می‌شوند. هر کدام را با تصویرِ قدمِ ۱ بسنج: مرکزِ ثقل را بالا می‌برد؟ چرخ‌ها را به هم نزدیک می‌کند؟ پیچ را تنگ‌تر می‌کند؟",
      columns: [
        {
          title: "آسان‌ترش می‌کند (VERO)",
          items: [
            { fa: "بارِ بالا", it: "un carico posto in alto", sourceId: "6895", textIt: "Il ribaltamento in curva del veicolo è favorito da un carico posto in alto", answer: 1 },
            { fa: "فاصله‌ی کمِ چرخ‌های یک محور", it: "una ridotta distanza fra ruote dello stesso asse (carreggiata stretta)", sourceId: "6897", textIt: "Il ribaltamento in curva del veicolo è favorito da una ridotta distanza fra ruote dello stesso asse (carreggiata stretta)", answer: 1 },
          ],
        },
        {
          title: "آسان‌ترش نمی‌کند (FALSO)",
          items: [
            { fa: "فاصله‌ی زیادِ چرخ‌های یک محور", it: "una ampia distanza fra ruote dello stesso asse (carreggiata larga)", sourceId: "6899", textIt: "Il ribaltamento in curva del veicolo è favorito da una ampia distanza fra ruote dello stesso asse (carreggiata larga)", answer: 0 },
            { fa: "بارِ پایین", it: "un carico posto in basso", sourceId: "6900", textIt: "Il ribaltamento in curva del veicolo è favorito da un carico posto in basso", answer: 0 },
          ],
        },
      ],
      takeaway: "بالا، لق، باریک، تنگ: واژگونی آسان‌تر. پایین، محکم، پهن، باز: سخت‌تر. بارگیری: فصلِ ۱۷، «بار: چیدن، بیرون‌زدگی، پشتِ بارِ لق».",
      rule: FISICA,
    },
    {
      kind: "classify",
      title: "مقایسه کن: کدام زودتر واژگون می‌شود؟",
      body: `${COMPARE} برای هر جفت بگو کدام وسیله در پیچ زودتر واژگون می‌شود:`,
      options: CHOICES,
      items: [
        {
          pair: { a: "ونی با بارِ سنگین روی باربندِ سقف", b: "همان ون و همان بار، این بار کفِ صندوق", differs: "جای بار: بالا یا پایین" },
          prompt: "کدام زودتر واژگون می‌شود؟",
          answer: 0,
          explain: "بارِ بالا مرکزِ ثقل را بالا می‌برد (قدمِ ۳).",
        },
        {
          pair: { a: "همان خودرو در پیچی باز", b: "همان خودرو با همان سرعت در پیچی تنگ", differs: "شعاعِ پیچ" },
          prompt: "کدام زودتر واژگون می‌شود؟",
          answer: 1,
          explain: "شعاعِ کوچک یعنی نیروی بیرون‌برِ بیشتر با همان سرعت (قدمِ ۱).",
        },
        {
          pair: { a: "همان کامیون، آرام‌تر", b: "همان کامیون، در همان پیچ، تندتر", differs: "سرعت" },
          prompt: "کدام زودتر واژگون می‌شود؟",
          answer: 1,
          explain: "نیروی واژگون‌کننده با سرعت بیشتر می‌شود (قدمِ ۲).",
        },
        {
          pair: { a: "وسیله‌ای با چرخ‌های نزدیک به هم", b: "وسیله‌ای با همان ارتفاع و بار، با چرخ‌های دورتر از هم", differs: "فاصله‌ی چرخ‌های یک محور" },
          prompt: "کدام زودتر واژگون می‌شود؟",
          answer: 0,
          explain: "carreggiata stretta یعنی فاصله‌ی کمِ چرخ‌ها؛ واژگونی آسان‌تر (قدمِ ۳).",
        },
        {
          pair: { a: "بارِ بالا، ولی آرام‌تر", b: "بارِ پایین، ولی تندتر", differs: "جای بار و سرعت، هر دو با هم" },
          prompt: "کدام زودتر واژگون می‌شود؟",
          answer: 2,
          explain: "دو چیز با هم عوض شده و هر کدام به یک طرف می‌کشد. فقط می‌دانیم هر دو (بارِ بالا و سرعتِ بیشتر) خطر را بیشتر می‌کنند.",
        },
        {
          pair: { a: "باری که محکم بسته شده", b: "همان بار، لق و بسته‌نشده", differs: "بستنِ بار" },
          prompt: "کدام زودتر واژگون می‌شود؟",
          answer: 1,
          explain: "بارِ لق در پیچ به سمتِ بیرون سُر می‌خورد و یک‌باره فشار می‌آورد (قدمِ ۳).",
        },
      ],
      takeaway: "هر عامل را جدا بسنج. اگر دو عامل با هم عوض شوند، جوابِ صادقانه اغلب «نمی‌شود گفت» است.",
      rule: FISICA,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la curva", fa: "پیچ" },
        { it: "la forza centrifuga", fa: "نیروی گریز از مرکز (نیرویی که به بیرونِ پیچ می‌برد)", note: "بانک می‌نویسد: una forza che tende a spostarlo verso l'esterno" },
        { it: "lo sbandamento", fa: "لیز خوردن به پهلو" },
        { it: "il ribaltamento", fa: "واژگونی" },
        { it: "la forza ribaltante", fa: "نیروی واژگون‌کننده" },
        { it: "il baricentro", fa: "مرکزِ ثقل" },
        { it: "la carreggiata (del veicolo)", fa: "فاصله‌ی چرخ‌های یک محور", note: "در این گروه، نه سواره‌روی جاده" },
        { it: "il raggio di curvatura", fa: "شعاعِ پیچ" },
        { it: "il carico non stabilmente fissato", fa: "بارِ لق (محکم‌بسته‌نشده)" },
      ],
    },
    {
      kind: "trap",
      title: "«raggio di curvatura»: کوچک یا بزرگ؟",
      body: "هر دو جمله درباره‌ی شعاعِ پیچ‌اند. یکی پیچِ تنگ را خطرناک‌تر می‌داند، دیگری پیچِ باز را:",
      examples: [
        {
          sourceId: "6898",
          textIt: "Il ribaltamento in curva del veicolo è favorito da un raggio di curvatura della strada piccolo (curva stretta)",
          answer: 1,
          chunks: [
            { it: RIB, fa: RIB_FA, verb: "è favorito ← favorire" },
            { it: "un raggio di curvatura della strada piccolo", fa: "شعاعِ کوچکِ پیچِ جاده" },
            { it: "(curva stretta)", fa: "(پیچِ تنگ)" },
          ],
          translation: "واژگون شدنِ وسیله در پیچ با شعاعِ کوچکِ پیچِ جاده (پیچِ تنگ) آسان‌تر می‌شود.",
          why: "درست است. با همان سرعت، پیچِ تنگ نیروی بیرون‌برِ بیشتری می‌سازد.",
        },
        {
          sourceId: "6901",
          textIt: "Il ribaltamento in curva del veicolo è favorito da un raggio di curvatura della strada ampio (curva larga)",
          answer: 0,
          chunks: [
            { it: RIB, fa: RIB_FA, verb: "è favorito ← favorire" },
            { it: "un raggio di curvatura della strada ampio", fa: "شعاعِ بزرگِ پیچِ جاده", focus: "contrast" },
            { it: "(curva larga)", fa: "(پیچِ باز)" },
          ],
          translation: "واژگون شدنِ وسیله در پیچ با شعاعِ بزرگِ پیچِ جاده (پیچِ باز) آسان‌تر می‌شود.",
          why: "غلط است. پیچِ باز با همان سرعت نیروی کمتری می‌سازد.",
        },
      ],
      takeaway: "شعاعِ کوچک = پیچِ تنگ = خطرِ بیشتر. «ampio» یا «larga» کنارِ «è favorito» یعنی جمله غلط است.",
      rule: FISICA,
    },
  ],
  practice: [
    {
      sourceId: "6889",
      textIt: "Quando il veicolo percorre una curva è assoggettato ad una forza che tende a spostarlo verso l'esterno",
      answer: 1,
      chunks: [
        { it: "Quando il veicolo percorre una curva", fa: "وقتی وسیله از پیچی می‌گذرد", focus: "condition", verb: "percorre ← percorrere" },
        { it: "è assoggettato ad una forza", fa: "زیرِ اثرِ نیرویی است", verb: "è assoggettato ← assoggettare" },
        { it: "che tende a spostarlo verso l'esterno", fa: "که می‌خواهد آن را به بیرون ببرد", verb: "tende ← tendere" },
      ],
      translation: "وقتی وسیله از پیچی می‌گذرد، زیرِ اثرِ نیرویی است که می‌خواهد آن را به بیرون ببرد.",
      why: "درست است (قدم ۱). نیرو همیشه به بیرونِ پیچ است.",
      rule: FISICA,
      conceptStep: 1,
    },
    {
      sourceId: "6892",
      textIt: "Quando il veicolo percorre una curva è assoggettato ad una forza che tende a spostarlo verso l'interno",
      answer: 0,
      chunks: [
        { it: "Quando il veicolo percorre una curva", fa: "وقتی وسیله از پیچی می‌گذرد", focus: "condition", verb: "percorre ← percorrere" },
        { it: "è assoggettato ad una forza", fa: "زیرِ اثرِ نیرویی است", verb: "è assoggettato ← assoggettare" },
        { it: "che tende a spostarlo verso l'interno", fa: "که می‌خواهد آن را به داخل ببرد", verb: "tende ← tendere", focus: "contrast" },
      ],
      translation: "وقتی وسیله از پیچی می‌گذرد، زیرِ اثرِ نیرویی است که می‌خواهد آن را به داخل ببرد.",
      why: "غلط است (قدم ۱). جهت وارونه است: نیرو به بیرون می‌برد؛ چسبندگی است که به سمتِ داخل نگه می‌دارد.",
      rule: FISICA,
      conceptStep: 1,
    },
    {
      sourceId: "6893",
      textIt: "Quando il veicolo percorre una curva si deve aumentare la velocità per evitare lo slittamento",
      answer: 0,
      chunks: [
        { it: "Quando il veicolo percorre una curva", fa: "وقتی وسیله از پیچی می‌گذرد", focus: "condition", verb: "percorre ← percorrere" },
        { it: "si deve aumentare la velocità", fa: "باید سرعت را بیشتر کرد", verb: "si deve ← dovere", focus: "contrast" },
        { it: "per evitare lo slittamento", fa: "تا سُر نخورد", focus: "reason" },
      ],
      translation: "وقتی وسیله از پیچی می‌گذرد، باید سرعت را بیشتر کرد تا سُر نخورد.",
      why: "غلط است (قدم ۲). سرعتِ بیشتر نیروی بیرون‌بر را بیشتر می‌کند و سُر خوردن را آسان‌تر.",
      rule: FISICA,
      conceptStep: 2,
    },
    {
      sourceId: "6902",
      textIt: "La forza ribaltante in curva aumenta all'aumentare della velocità",
      answer: 1,
      chunks: [
        { it: "La forza ribaltante in curva", fa: "نیروی واژگون‌کننده در پیچ" },
        { it: "aumenta", fa: "بیشتر می‌شود", verb: "aumenta ← aumentare" },
        { it: "all'aumentare della velocità", fa: "با بیشتر شدنِ سرعت", focus: "condition" },
      ],
      translation: "نیروی واژگون‌کننده در پیچ با بیشتر شدنِ سرعت بیشتر می‌شود.",
      why: "درست است (قدم ۲). و سریع‌تر از خودِ سرعت: دو برابرِ سرعت، چهار برابرِ نیرو.",
      rule: FISICA,
      conceptStep: 2,
    },
    {
      sourceId: "6896",
      textIt: "Il ribaltamento in curva del veicolo è favorito dal carico non stabilmente fissato",
      answer: 1,
      chunks: [
        { it: "Il ribaltamento in curva del veicolo è favorito", fa: "واژگون شدنِ وسیله در پیچ آسان‌تر می‌شود", verb: "è favorito ← favorire" },
        { it: "dal carico non stabilmente fissato", fa: "با باری که محکم بسته نشده" },
      ],
      translation: "واژگون شدنِ وسیله در پیچ با باری که محکم بسته نشده آسان‌تر می‌شود.",
      why: "درست است (قدم ۳). بارِ لق در پیچ به سمتِ بیرون جابه‌جا می‌شود و یک‌باره فشار می‌آورد. «non» این‌جا جمله را غلط نمی‌کند؛ بخشی از «لق» است.",
      rule: FISICA,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6889", "6892"] },
    { step: 2, sourceIds: ["6890", "6891", "6893", "6894", "6902", "6903"] },
    { step: 3, sourceIds: ["6895", "6896", "6897", "6898", "6899", "6900", "6901"] },
  ],
};
