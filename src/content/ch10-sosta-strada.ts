/**
 * src/content/ch10-sosta-strada.ts
 * Chapter 10 (Pannelli integrativi), lessons 8–9: panels under a parking ban
 * (tow-away zone, street cleaning) and panels that show the road (the lane a
 * sign refers to, hairpins, the shape of the main road at a junction, II.7).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter10.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const PANEL = "Il pannello integrativo raffigurato";
const PANEL_FA = "پنلِ تکمیلیِ تصویر";
const IN_FIGURA = "Il pannello integrativo in figura";
const IN_FIGURA_FA = "پنلِ تکمیلیِ شکل";
const PANNELLI = "I pannelli integrativi in figura";
const PANNELLI_FA = "پنل‌های تکمیلیِ شکل";

// ── Lesson 8 ──────────────────────────────────────────────────────────────────

export const lessonRimozionePulizia: Lesson = {
  id: "pannelli-rimozione-pulizia",
  titleFa: "زیرِ پارک ممنوع: جرثقیل و نظافتِ خیابان",
  titleIt: "ZONA RIMOZIONE · PULIZIA DELLA STRADA",
  minutes: 4,
  signs: [141, 145],
  figures: [942],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس دو پنلِ زیرِ پارک ممنوع را می‌شناسی: جرثقیل یعنی خودرو را می‌شود برد یا با قفلِ چرخ بست؛ ماشینِ جاروب با روز و ساعت یعنی پارک فقط وقتِ نظافتِ خیابان ممنوع است.",
      why: "۱۹ سؤال. بانک جرثقیل را با تعمیرگاه، امدادِ جاده‌ای و قطارِ خودروبر عوض می‌کند و «بعد از سه ساعت» را اضافه می‌کند. ماشینِ جاروب را هم «وسیله‌ای که نباید پارک کند» می‌خواند. این دو پنل را در فصل ۳ (درسِ پارک ممنوع) کوتاه دیدی.",
    },
    {
      kind: "table",
      title: "جرثقیل",
      body: "پنلِ سفید با جرثقیلی که سواری را می‌کشد، زیرِ تابلوی پارک ممنوع. این‌جا پارکِ خلاف ممکن است به برده شدنِ خودرو با جرثقیل به پارکینگِ شهرداری، یا بستنِ چرخ با قفل (ganasce) برسد. از لحظه‌ی پارکِ خلاف؛ «بعد از سه ساعت» نیست.",
      columns: ["قاعده"],
      rows: [
        { label: "پنلِ جرثقیل", it: "zona rimozione", sign: 141, values: ["منطقه‌ی پارک ممنوع با بردنِ خودرو: جرثقیل ممکن است خودروی پارک‌شده را ببرد."] },
        { label: "پارک ممنوع + جرثقیل", it: "depositeria · ganasce", sign: 942, values: ["خودرو ممکن است به پارکینگِ شهرداری (depositeria) برده شود، یا با قفلِ چرخ بسته شود."] },
        { label: "خودروی معلول", it: "contrassegno", values: ["خودرویی که در خدمتِ فردِ دارای معلولیت است و کارتِ مخصوص (contrassegno) دارد، برده نمی‌شود. بانک می‌گوید قفلِ چرخ هم نمی‌خورد."] },
        { label: "چه نیست", it: "non è", values: ["تعمیرگاه، امدادِ جاده‌ای یا تعویضِ روغن نیست؛ «فقط خودروهای امداد می‌توانند پارک کنند» یا «سوار کردنِ خودرو روی قطار» هم نیست. جاده‌ی بسته به‌خاطرِ تصادف هم نیست."] },
      ],
      takeaway: "جرثقیل = پارکِ خلاف، خودرو را می‌برند یا قفل می‌کنند.",
      rule: "CdS art. 159 c.1 lett. a, c.3; DPR 495/1992 art. 83 c.10 (II.6/m); art. 354 c.4",
    },
    {
      kind: "table",
      title: "نظافتِ خیابان",
      body: "پنلِ مربعی با روزها، ساعت‌ها و ماشینِ جاروب، زیرِ پارک ممنوع. پارک فقط در همین روزها و ساعت‌ها ممنوع است، چون ماشینِ جاروب خیابان را می‌شوید. «lun - ven» یعنی دوشنبه تا جمعه. ماشینِ جاروب دلیلِ ممنوعیت است، نه وسیله‌ای که ممنوع شده.",
      columns: ["قاعده"],
      rows: [
        { label: "پنلِ نظافت", it: "pulizia con autospazzatrici", sign: 145, values: ["روزها و ساعت‌هایی که ماشینِ جاروب خیابان را تمیز می‌کند؛ پارک فقط در این زمان ممنوع است."] },
        { label: "بیرون از این زمان", it: "solo in determinate ore", values: ["در روزها و ساعت‌های دیگر، این پارک ممنوع اعتبار ندارد."] },
        { label: "چه نیست", it: "non è", values: ["ساعتِ گذاشتنِ زباله، روزهای کارِ کارواش یا «حق تقدم به کامیون» نیست. «وسایلِ تصویر نمی‌توانند پارک کنند» هم نیست: تصویر دلیل است."] },
      ],
      takeaway: "ماشینِ جاروب + روز و ساعت = پارک فقط وقتِ نظافت ممنوع.",
      rule: "DPR 495/1992 art. 83 c.10 (II.6/q); CdS art. 159 c.1",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la rimozione", fa: "بردنِ خودرو با جرثقیل" },
        { it: "il carro-attrezzi", fa: "جرثقیل، خودروی یدک‌کش" },
        { it: "la depositeria comunale", fa: "پارکینگِ توقیفِ شهرداری" },
        { it: "le ganasce", fa: "قفلِ چرخ" },
        { it: "il contrassegno", fa: "کارتِ مخصوص (معلولیت)" },
        { it: "l'autospazzatrice", fa: "ماشینِ جاروبِ خیابان" },
        { it: "in determinate ore dei giorni indicati", fa: "در ساعت‌های معینِ روزهای نوشته‌شده" },
      ],
    },
    {
      kind: "trap",
      title: "جرثقیل ساعت‌شمار ندارد",
      body: "هر دو جمله درباره‌ی پنلِ جرثقیل زیرِ پارک ممنوع است:",
      examples: [
        {
          sourceId: "3895",
          sign: 942,
          textIt: "Il segnale raffigurato indica che il veicolo può essere spostato in una depositeria comunale",
          answer: 1,
          chunks: [
            { it: "Il segnale raffigurato", fa: "تابلوی تصویر" },
            { it: "indica che il veicolo può essere spostato", fa: "نشان می‌دهد که خودرو ممکن است برده شود", verb: "può ← potere" },
            { it: "in una depositeria comunale", fa: "به پارکینگِ توقیفِ شهرداری" },
          ],
          translation: "تابلوی تصویر نشان می‌دهد که خودرو ممکن است به پارکینگِ توقیفِ شهرداری برده شود.",
          why: "درست است. همین معنای جرثقیل است.",
        },
        {
          sourceId: "3903",
          sign: 141,
          textIt: "Il pannello integrativo raffigurato indica che dopo tre ore il veicolo lasciato in sosta viene rimosso o bloccato",
          answer: 0,
          chunks: [
            { it: PANEL, fa: PANEL_FA },
            { it: "indica che dopo tre ore", fa: "نشان می‌دهد که بعد از سه ساعت", verb: "indica ← indicare", focus: "contrast" },
            { it: "il veicolo lasciato in sosta", fa: "خودرویی که پارک شده" },
            { it: "viene rimosso o bloccato", fa: "برده یا قفل می‌شود", verb: "viene rimosso ← rimuovere" },
          ],
          translation: "پنلِ تکمیلیِ تصویر نشان می‌دهد که خودروی پارک‌شده بعد از سه ساعت برده یا قفل می‌شود.",
          why: "غلط است. پنل مهلتی نمی‌دهد؛ پارکِ خلاف از همان لحظه خلاف است.",
        },
      ],
      takeaway: "عددِ ساعت در جمله‌ی جرثقیل، اگر روی خودِ تابلو نباشد، دام است.",
      rule: "CdS art. 159",
    },
  ],
  practice: [
    {
      sourceId: "3897",
      sign: 141,
      textIt: "Il pannello integrativo raffigurato indica una zona di divieto di sosta con rimozione del veicolo",
      answer: 1,
      chunks: [
        { it: PANEL, fa: PANEL_FA },
        { it: "indica una zona di divieto di sosta", fa: "منطقه‌ی پارک ممنوع را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "con rimozione del veicolo", fa: "با بردنِ خودرو" },
      ],
      translation: "پنلِ تکمیلیِ تصویر منطقه‌ی پارک ممنوع با بردنِ خودرو را نشان می‌دهد.",
      why: "درست است (قدم ۱). جرثقیل = zona rimozione.",
      rule: "CdS art. 159 c.1 lett. a",
      conceptStep: 1,
    },
    {
      sourceId: "3901",
      sign: 141,
      textIt: "Il pannello integrativo raffigurato indica un'officina meccanica attrezzata per il cambio d'olio",
      answer: 0,
      chunks: [
        { it: PANEL, fa: PANEL_FA },
        { it: "indica un'officina meccanica", fa: "یک تعمیرگاه را نشان می‌دهد", verb: "indica ← indicare", focus: "contrast" },
        { it: "attrezzata per il cambio d'olio", fa: "که برای تعویضِ روغن مجهز است" },
      ],
      translation: "پنلِ تکمیلیِ تصویر تعمیرگاهی را نشان می‌دهد که برای تعویضِ روغن مجهز است.",
      why: "غلط است (قدم ۱). پنل درباره‌ی تابلوی بالایی است: خودروی پارک‌شده را می‌برند.",
      rule: "DPR 495/1992 art. 83 c.10",
      conceptStep: 1,
    },
    {
      sourceId: "3898",
      sign: 942,
      textIt: "Il segnale raffigurato prevede lo spostamento del veicolo o il suo blocco tramite ganasce",
      answer: 1,
      chunks: [
        { it: "Il segnale raffigurato", fa: "تابلوی تصویر" },
        { it: "prevede lo spostamento del veicolo", fa: "بردنِ خودرو را پیش‌بینی می‌کند", verb: "prevede ← prevedere" },
        { it: "o il suo blocco tramite ganasce", fa: "یا بستنش با قفلِ چرخ" },
      ],
      translation: "تابلوی تصویر بردنِ خودرو یا بستنش با قفلِ چرخ را پیش‌بینی می‌کند.",
      why: "درست است (قدم ۱). قانون قفلِ چرخ را جایگزینِ بردن هم می‌داند.",
      rule: "CdS art. 159 c.1, c.3",
      conceptStep: 1,
    },
    {
      sourceId: "3926",
      sign: 145,
      textIt: "Il pannello integrativo in figura indica i giorni e le ore in cui si effettuano operazioni di pulizia della strada con autospazzatrici",
      answer: 1,
      chunks: [
        { it: IN_FIGURA, fa: IN_FIGURA_FA },
        { it: "indica i giorni e le ore", fa: "روزها و ساعت‌هایی را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "in cui si effettuano operazioni di pulizia della strada", fa: "که در آن‌ها خیابان را تمیز می‌کنند", verb: "si effettuano ← effettuare" },
        { it: "con autospazzatrici", fa: "با ماشینِ جاروب" },
      ],
      translation: "پنلِ تکمیلیِ شکل روزها و ساعت‌هایی را نشان می‌دهد که خیابان با ماشینِ جاروب تمیز می‌شود.",
      why: "درست است (قدم ۲). روز و ساعت + ماشینِ جاروب = زمانِ نظافت.",
      rule: "DPR 495/1992 art. 83 c.10",
      conceptStep: 2,
    },
    {
      sourceId: "3931",
      sign: 145,
      textIt: "Il pannello integrativo in figura, posto sotto il segnale DIVIETO DI SOSTA, indica che non possono sostare i veicoli rappresentati",
      answer: 0,
      chunks: [
        { it: IN_FIGURA + ",", fa: IN_FIGURA_FA },
        { it: "posto sotto il segnale DIVIETO DI SOSTA,", fa: "وقتی زیرِ تابلوی پارک ممنوع نصب شده", verb: "posto ← porre", focus: "condition" },
        { it: "indica che non possono sostare", fa: "نشان می‌دهد که نمی‌توانند پارک کنند", verb: "possono ← potere", focus: "negation" },
        { it: "i veicoli rappresentati", fa: "وسایلِ تصویر" },
      ],
      translation: "پنلِ تکمیلیِ شکل، وقتی زیرِ پارک ممنوع است، نشان می‌دهد که وسایلِ تصویر نمی‌توانند پارک کنند.",
      why: "غلط است (قدم ۲). ماشینِ جاروب دلیلِ ممنوعیت است؛ پارک برای همه در آن ساعت‌ها ممنوع است.",
      rule: "DPR 495/1992 art. 83 c.10",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["3894", "3895", "3896", "3897", "3898", "3899", "3900", "3901", "3902", "3903", "3904"] },
    { step: 2, sourceIds: ["3924", "3925", "3926", "3927", "3928", "3929", "3930", "3931"] },
  ],
};

// ── Lesson 9 ──────────────────────────────────────────────────────────────────

export const lessonCorsiaTornantiIncrocio: Lesson = {
  id: "pannelli-corsia-tornanti-incrocio",
  titleFa: "شکلِ راه: کدام خط، چند پیچِ تند، جاده‌ی اصلی کدام است",
  titleIt: "CORSIA · TORNANTI · ANDAMENTO DELLA STRADA PRINCIPALE",
  minutes: 5,
  signs: [142, 143, 146],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس سه پنلی را می‌خوانی که شکلِ راه را نشان می‌دهند: فلشِ رو به پایین بالای سواره‌رو یعنی تابلو فقط برای خطِ زیرش است؛ «tornante» یا «3 tornanti» یعنی پیچ‌های تند یا سنجاقی جلوتر؛ خطِ پهن یعنی مسیرِ جاده‌ی اصلی در تقاطع.",
      why: "۲۹ سؤال. بانک فلشِ خط را با ایستگاهِ اتوبوس یا «پایانِ دستور» عوض می‌کند، عددِ پیچ‌ها را با تعدادِ خط یا خروجی، و خطِ پهنِ تقاطع را با پیچِ خطرناک یا آزادراه.",
    },
    {
      kind: "table",
      title: "کدام خط؟",
      body: "پنلِ سفید با یک فلشِ پهنِ رو به پایین، روی دروازه‌ی بالای سواره‌رو، همراهِ یک تابلو. فلش به خطی که زیرش است اشاره می‌کند: تابلوی بالایی فقط برای همان خط است. مثلاً اگر تابلو یک شهر را بگوید، این همان خطی است که به آن شهر می‌رود (فصل ۸).",
      columns: ["قاعده"],
      rows: [
        { label: "پنلِ خط", it: "vale per la sola corsia indicata", sign: 142, values: ["تابلوی بالای پنل فقط برای خطِ زیرِ فلش است؛ با تابلوی مقصد، خطی را نشان می‌دهد که باید بگیری."] },
        { label: "چه نیست", it: "non è", values: ["ایستگاهِ اتوبوس، «حق تقدم با روبه‌رو»، پایانِ یک دستور یا پایانِ حداکثرِ سرعت نیست. فلشِ «پایان» در درسِ ۲ کوچک است و تهِ یک پنلِ باریکِ عمودی؛ این فلش بزرگ است و وسطِ یک پنلِ افقی."] },
      ],
      takeaway: "فلشِ بزرگِ رو به پایین بالای جاده = «این تابلو برای همین خط».",
      rule: "DPR 495/1992 art. 83 c.10 (II.6/n)",
    },
    {
      kind: "table",
      title: "پیچ‌های تند",
      body: "دو پنلِ نوشته‌دار زیرِ تابلوی پیچ یا پیچِ دوتایی: «tornante» (یک پیچِ سنجاقی) یا «3 tornanti» (سه پیچِ سنجاقی پشتِ سرِ هم). هر دو یعنی یک یا چند پیچِ تند و بسیار خطرناک نزدیک است. در فصل ۹ (درس ۶) پنلِ «1° tornante» را دیدی که شماره‌ی هر پیچ است؛ این‌جا عدد تعدادِ پیچ‌هاست.",
      columns: ["قاعده"],
      rows: [
        { label: "پنلِ پیچ‌ها", it: "tornante · 3 tornanti", sign: 143, values: ["یک یا چند پیچِ تند یا سنجاقی نزدیک است؛ زیرِ تابلوی CURVA یا DOPPIA CURVA."] },
        { label: "چه نیست", it: "non è", values: ["تعدادِ خط‌ها، تعدادِ خودروهایی که هم‌زمان از پیچ رد می‌شوند، کیلومتر تا پلِ دورزدن، تعدادِ خروجی‌های آزادراه یا تقاطع با جاده‌ی کامیون‌های معدن نیست."] },
      ],
      takeaway: "«tornanti» = پیچِ سنجاقی؛ عدد = چند تا پشتِ سرِ هم.",
      rule: "DPR 495/1992 art. 83 c.10 (II.6/p); art. 86",
    },
    {
      kind: "table",
      title: "مسیرِ جاده‌ی اصلی",
      figures: [146],
      body: "سه پنلِ مربعی با یک خطِ پهن و خط‌های باریک. خطِ پهن جاده‌ی اصلی است که حق تقدم دارد؛ خط‌های باریک جاده‌های فرعی‌اند. پنل شکلِ تقاطع و مسیرِ جاده‌ی اصلی را نشان می‌دهد و زیرِ تابلوهای حق تقدم می‌آید: تابلوی جاده با حق تقدم یا تابلوی تقاطع با حق تقدم (فصل ۵).",
      columns: ["پنل‌های A، B و C"],
      rows: [
        { label: "A", it: "strada principale diritta", values: ["جاده‌ی اصلی مستقیم می‌رود؛ دو فرعی از چپ و راست، کمی جابه‌جا."] },
        { label: "B و C", it: "strada principale che svolta", values: ["جاده‌ی اصلی در تقاطع به راست می‌پیچد؛ فرعی‌ها مستقیم یا مورب ادامه دارند. پیچِ خطرناک نیست؛ شکلِ تقاطع است."] },
        { label: "کجا نیست", it: "non in autostrada", values: ["در آزادراه نیست، چون آزادراه تقاطعِ هم‌سطح ندارد."] },
        { label: "چه نیست", it: "non è", values: ["راهنمای پارک، جاده‌ی بن‌بست، زیرگذر یا «جاده‌های قطع‌شده» نیست."] },
      ],
      takeaway: "خطِ پهن = جاده‌ی اصلی با حق تقدم؛ پنل فقط مسیرش را نشان می‌دهد.",
      rule: "DPR 495/1992 art. 83 c.11 (modello II.7)",
    },
    {
      kind: "classify",
      title: "اصلی یا فرعی؟",
      body: "به پنل‌های A، B و C نگاه کن و بگو هر راه اصلی است یا فرعی. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "principale", fa: "جاده‌ی اصلی" },
        { it: "secondaria", fa: "جاده‌ی فرعی" },
      ],
      items: [
        { prompt: "در A، خطِ عمودی", sign: 146, answer: 0, explain: "خطِ پهن: جاده‌ی اصلی مستقیم می‌رود." },
        { prompt: "در A، دو خطِ افقیِ کوتاه", sign: 146, answer: 1, explain: "خط‌های باریک: فرعی‌ها." },
        { prompt: "در B، راهی که به راست می‌پیچد", sign: 146, answer: 0, explain: "خطِ پهن به راست خم می‌شود: جاده‌ی اصلی." },
        { prompt: "در B، راهی که مستقیم بالا می‌رود", sign: 146, answer: 1, explain: "باریک است: اگر مستقیم بروی، جاده‌ی اصلی را ترک کرده‌ای." },
        { prompt: "در C، راهِ مورب به چپ", sign: 146, answer: 1, explain: "خطِ باریک: فرعی." },
      ],
      takeaway: "به پهنای خط نگاه کن، نه به جهتش.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la corsia", fa: "خطِ عبور" },
        { it: "posto in alto sulla carreggiata", base: "porre", fa: "بالای سواره‌رو نصب‌شده" },
        { it: "il tornante", fa: "پیچِ سنجاقی" },
        { it: "le curve strette", fa: "پیچ‌های تند" },
        { it: "l'andamento della strada principale", fa: "مسیرِ جاده‌ی اصلی" },
        { it: "la strada secondaria", fa: "جاده‌ی فرعی" },
        { it: "il diritto di precedenza", fa: "حق تقدم" },
      ],
    },
    {
      kind: "trap",
      title: "خط که می‌پیچد، پیچِ خطرناک نیست",
      body: "هر دو جمله درباره‌ی پنل‌های خطِ پهن و باریک است:",
      examples: [
        {
          sourceId: "3934",
          sign: 146,
          textIt: "I pannelli integrativi in figura posti in vicinanza di una intersezione, indicano l'andamento della strada principale",
          answer: 1,
          chunks: [
            { it: PANNELLI, fa: PANNELLI_FA },
            { it: "posti in vicinanza di una intersezione,", fa: "وقتی نزدیکِ تقاطع نصب شده‌اند", verb: "posti ← porre", focus: "condition" },
            { it: "indicano l'andamento della strada principale", fa: "مسیرِ جاده‌ی اصلی را نشان می‌دهند", verb: "indicano ← indicare" },
          ],
          translation: "پنل‌های تکمیلیِ شکل، وقتی نزدیکِ تقاطع نصب شده‌اند، مسیرِ جاده‌ی اصلی را نشان می‌دهند.",
          why: "درست است. خطِ پهن = جاده‌ی اصلی و مسیرش.",
        },
        {
          sourceId: "3936",
          sign: 146,
          textIt: "I pannelli in figura (B) e (C) indicano una curva pericolosa",
          answer: 0,
          chunks: [
            { it: "I pannelli in figura (B) e (C)", fa: "پنل‌های شکلِ (B) و (C)" },
            { it: "indicano una curva pericolosa", fa: "پیچِ خطرناکی را نشان می‌دهند", verb: "indicano ← indicare", focus: "contrast" },
          ],
          translation: "پنل‌های شکلِ (B) و (C) پیچِ خطرناکی را نشان می‌دهند.",
          why: "غلط است. خمِ خطِ پهن یعنی جاده‌ی اصلی در تقاطع می‌پیچد؛ تابلوی پیچِ خطرناک مثلث است.",
        },
      ],
      takeaway: "مربعِ سفید با خطِ پهن و باریک = نقشه‌ی تقاطع، نه خطر.",
      rule: "DPR 495/1992 art. 83 c.11",
    },
  ],
  practice: [
    {
      sourceId: "3911",
      sign: 142,
      textIt: "Il pannello integrativo in figura indica la fine del segnale LIMITE MASSIMO DI VELOCITA'",
      answer: 0,
      chunks: [
        { it: IN_FIGURA, fa: IN_FIGURA_FA },
        { it: "indica la fine del segnale", fa: "پایانِ تابلوی … را نشان می‌دهد", verb: "indica ← indicare", focus: "contrast" },
        { it: "LIMITE MASSIMO DI VELOCITA'", fa: "حداکثرِ سرعت" },
      ],
      translation: "پنلِ تکمیلیِ شکل پایانِ تابلوی حداکثرِ سرعت را نشان می‌دهد.",
      why: "غلط است (قدم ۱). این فلشِ بزرگ خط را نشان می‌دهد، نه پایانِ یک دستور.",
      rule: "DPR 495/1992 art. 83 c.10",
      conceptStep: 1,
    },
    {
      sourceId: "3915",
      sign: 143,
      textIt: "Il pannello integrativo in figura (B) si può trovare sotto il segnale di CURVA o DOPPIA CURVA",
      answer: 1,
      chunks: [
        { it: "Il pannello integrativo in figura (B)", fa: "پنلِ تکمیلیِ شکلِ (B)" },
        { it: "si può trovare sotto il segnale", fa: "ممکن است زیرِ تابلوی … باشد", verb: "si può ← potersi" },
        { it: "di CURVA o DOPPIA CURVA", fa: "پیچ یا پیچِ دوتایی" },
      ],
      translation: "پنلِ تکمیلیِ شکلِ (B) ممکن است زیرِ تابلوی پیچ یا پیچِ دوتایی باشد.",
      why: "درست است (قدم ۲). «3 tornanti» خطرِ پیچ را دقیق‌تر می‌کند.",
      rule: "DPR 495/1992 art. 83 c.10",
      conceptStep: 2,
    },
    {
      sourceId: "3920",
      sign: 143,
      textIt: "Il pannello integrativo di figura B indica quanti veicoli contemporaneamente possono percorrere la curva",
      answer: 0,
      chunks: [
        { it: "Il pannello integrativo di figura B", fa: "پنلِ تکمیلیِ شکلِ B" },
        { it: "indica quanti veicoli contemporaneamente", fa: "نشان می‌دهد چند وسیله هم‌زمان", verb: "indica ← indicare", focus: "contrast" },
        { it: "possono percorrere la curva", fa: "می‌توانند از پیچ رد شوند", verb: "possono ← potere" },
      ],
      translation: "پنلِ تکمیلیِ شکلِ B نشان می‌دهد چند وسیله هم‌زمان می‌توانند از پیچ رد شوند.",
      why: "غلط است (قدم ۲). عدد تعدادِ پیچ‌های سنجاقی است، نه وسایل.",
      rule: "DPR 495/1992 art. 83 c.10",
      conceptStep: 2,
    },
    {
      sourceId: "3935",
      sign: 146,
      textIt: "I pannelli integrativi in figura possono trovarsi sotto il segnale INTERSEZIONE CON DIRITTO DI PRECEDENZA",
      answer: 1,
      chunks: [
        { it: PANNELLI, fa: PANNELLI_FA },
        { it: "possono trovarsi sotto il segnale", fa: "ممکن است زیرِ تابلوی … باشند", verb: "possono ← potere" },
        { it: "INTERSEZIONE CON DIRITTO DI PRECEDENZA", fa: "تقاطع با حق تقدم" },
      ],
      translation: "پنل‌های تکمیلیِ شکل ممکن است زیرِ تابلوی تقاطع با حق تقدم باشند.",
      why: "درست است (قدم ۳). پنل نشان می‌دهد جاده‌ی اصلیِ صاحبِ حق تقدم در تقاطع کدام است.",
      rule: "DPR 495/1992 art. 83 c.11",
      conceptStep: 3,
    },
    {
      sourceId: "3938",
      sign: 146,
      textIt: "I pannelli integrativi in figura vengono posti anche sulle autostrade",
      answer: 0,
      chunks: [
        { it: PANNELLI, fa: PANNELLI_FA },
        { it: "vengono posti", fa: "نصب می‌شوند", verb: "vengono posti ← porre" },
        { it: "anche sulle autostrade", fa: "در آزادراه‌ها هم", focus: "contrast" },
      ],
      translation: "پنل‌های تکمیلیِ شکل در آزادراه‌ها هم نصب می‌شوند.",
      why: "غلط است (قدم ۳). آزادراه تقاطعِ هم‌سطح ندارد؛ این پنل‌ها مالِ تقاطع‌اند.",
      rule: "DPR 495/1992 art. 83 c.11",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["3905", "3906", "3907", "3908", "3909", "3910", "3911"] },
    { step: 2, sourceIds: ["3912", "3913", "3914", "3915", "3916", "3917", "3918", "3919", "3920", "3921", "3922", "3923"] },
    { step: 3, sourceIds: ["3932", "3933", "3934", "3935", "3936", "3937", "3938", "3939", "3940", "3941"] },
  ],
};
