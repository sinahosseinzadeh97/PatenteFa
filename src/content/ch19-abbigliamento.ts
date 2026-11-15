/**
 * src/content/ch19-abbigliamento.ts
 * Chapter 19 (Cinture, casco e sicurezza), lesson 7: motorcycle boots, gloves
 * and jackets. Only the helmet is required by law (CdS art. 171); the rest is
 * certified protective equipment (EN 13634 boots, EN 13594 gloves, EN 17092
 * garments: abrasion, tear and cut tests). The rider is the `motociclista`
 * drawing in public/js/road.js. Technical statements, no CdS article: flagged
 * in the coverage doc.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter19.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const EN = "Norme EN 13634 (stivali), EN 13594 (guanti), EN 17092 (indumenti); il CdS impone solo il casco (art. 171)";

export const lessonAbbigliamento: Lesson = {
  id: "abbigliamento-moto",
  titleFa: "چکمه، دستکش و کاپشنِ موتورسواری",
  titleIt: "STIVALI · GUANTI · GIACCHE AD USO MOTOCICLISTICO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی چکمه، دستکش و کاپشنِ مخصوصِ موتورسواری از کجای بدن و در برابرِ چه چیزی محافظت می‌کنند، چه ویژگی‌هایی دارند، و این‌که مدل‌های تأییدشده با آزمون‌های استاندارد وجود دارند. فرقِ مهم با کلاه: کلاه را قانون می‌خواهد، بقیه توصیه‌ی جدیِ ایمنی‌اند.",
      why:
        "۳۲ سؤال. دامِ بانک جایگزین‌های اشتباه است (کفشِ کوهنوردی، دستکشِ اسکی)، ویژگی‌های ساختگی (کفِ فولادی، تا بالای زانو، فقط مشکی، دو بندِ کفش) و «فقط زمستان». سؤالِ کلیدیِ هر جمله: این وسیله در افتادن و سُر خوردن روی آسفالت چه می‌کند؟",
    },
    {
      kind: "anatomy",
      scene: "motociclista",
      title: "از سر تا پا",
      body:
        "در افتادن از موتور، بدن روی آسفالت سُر می‌خورد و به چیزهای سخت می‌خورد. هر وسیله برای یک بخشِ بدن ساخته شده، در برابرِ سایش (ساییده شدن روی آسفالت) و ضربه. چکمه، دستکش و کاپشنِ تأییدشده با استانداردهای اروپایی آزمون می‌شوند: مقاومت در برابرِ سایش و بریدگی، نه شستشو یا رنگ. قانون فقط کلاه را اجباری کرده؛ بقیه توصیه است. روی هر بخش بزن.",
      parts: [
        {
          id: "casco",
          nameIt: "casco",
          nameFa: "کلاه ایمنی",
          text: "تنها وسیله‌ای که قانون اجباری کرده است (درس‌های ۵ و ۶).",
        },
        {
          id: "giacca",
          nameIt: "giacca ad uso motociclistico",
          nameFa: "کاپشنِ موتورسواری",
          text: "در سُر خوردن روی آسفالت در برابرِ سایش مقاومت می‌کند و روی مفصل‌ها (شانه، آرنج) محافظِ سخت دارد. مدلِ تابستانی هم دارد و هر رنگی می‌تواند باشد.",
        },
        {
          id: "guanti",
          nameIt: "guanti ad uso motociclistico",
          nameFa: "دستکشِ موتورسواری",
          text: "پشتِ دست را در برابرِ ضربه و کفِ دست را در سُر خوردن حفظ می‌کند، گرفتنِ دسته‌ها را مطمئن‌تر می‌کند و بندی دارد که در افتادن از دست درنیاید. فقط تا مچ.",
        },
        {
          id: "stivali",
          nameIt: "stivali ad uso motociclistico",
          nameFa: "چکمه‌ی موتورسواری",
          text: "پا و مچ را در برابرِ ضربه، پیچ‌خوردگی، سایش و سرما حفظ می‌کند. بندِ آزاد یا بندِ کفش ندارد که به رکاب گیر کند و در افتادن از پا درنمی‌آید. زیرِ زانو تمام می‌شود.",
        },
      ],
      takeaway: "سایش و ضربه: کاپشن، دستکش و چکمه‌ی مخصوص، با برچسبِ تأیید. فقط کلاه قانونی است؛ بقیه را خودت انتخاب می‌کنی، و باید انتخاب کنی.",
      rule: EN,
    },
    {
      kind: "table",
      title: "چکمه",
      body: "چکمه‌ی موتورسواری با کفشِ معمولی، حتی کفشِ کوهنوردی، فرق دارد: برای افتادن و سُر خوردن ساخته شده است.",
      columns: ["ویژگی"],
      rows: [
        { label: "محافظت", it: "piedi e caviglie", values: ["پا و مچ را در برابرِ ضربه، پیچ‌خوردگی (وقتی پا را بد روی زمین می‌گذاری) و سرما حفظ می‌کند."] },
        { label: "سایش", it: "abrasioni sull’asfalto", values: ["در افتادن، پا را روی آسفالت حفظ می‌کند."] },
        { label: "بی‌بند", it: "privi di nastri liberi o stringhe", values: ["بندِ آزاد یا بندِ کفش ندارد تا به رکاب و پدال گیر نکند. «دو بندِ کفش» غلط است."] },
        { label: "از پا درنمی‌آید", it: "progettate per non scalzarsi", values: ["طوری ساخته شده که در افتادن از پا درنیاید."] },
        { label: "چیزهایی که ندارد", it: "suola in acciaio · sopra il ginocchio · gomma ignifuga", values: ["کفِ فولادی ندارد، تا بالای زانو نمی‌آید، و لازم نیست تمام‌لاستیکی باشد."] },
        { label: "جایگزین", it: "scarpe da trekking · caccia · pesca", values: ["کفشِ کوهنوردی، شکار یا ماهیگیری جایش را نمی‌گیرد؛ چکمه‌ی مخصوصِ موتورسواری وجود دارد."] },
      ],
      takeaway: "مچ، سایش، بی‌بند، از پا درنمی‌آید. کفشِ کوهنوردی چکمه‌ی موتورسواری نیست.",
      rule: EN,
    },
    {
      kind: "factors",
      title: "دستکش",
      body:
        "در افتادن، بی‌اختیار دست را جلو می‌بری؛ دست معمولاً اولین جایی است که به زمین می‌خورد. دستکشِ موتورسواری فقط تا مچ است، نه آرنج، و کنترل را کم نمی‌کند، بیشتر می‌کند. ستونِ اول ویژگی‌های واقعی است، ستونِ دوم ادعاهای ساختگیِ بانک.",
      columns: [
        {
          title: "دستکشِ موتورسواری",
          items: [
            {
              fa: "کفِ دست در سُر خوردن روی آسفالت",
              it: "proteggono il palmo della mano",
              sourceId: "6108",
              textIt: "I guanti da motociclisti proteggono il palmo della mano in caso di caduta con strisciamento sull’asfalto",
              answer: 1,
            },
            {
              fa: "حسِ دست و گرفتنِ مطمئنِ دسته‌ها",
              it: "la giusta sensibilità durante la guida e una presa più sicura sui comandi",
              sourceId: "6109",
              textIt: "I guanti da motociclisti garantiscono la giusta sensibilità durante la guida e una presa più sicura sui comandi",
              answer: 1,
            },
            {
              fa: "بندی که در افتادن از دست درنیاید",
              it: "speciali sistemi di aggancio",
              sourceId: "6112",
              textIt: "I guanti ad uso motociclistico hanno speciali sistemi di aggancio per impedire il loro sfilamento in caso di caduta",
              answer: 1,
            },
            {
              fa: "لایه‌ی داخلیِ متفاوت برای هر فصل",
              it: "imbottiture diverse a seconde della stagione",
              sourceId: "6110",
              textIt: "I guanti da motociclisti possono avere imbottiture diverse a seconde della stagione",
              answer: 1,
            },
          ],
        },
        {
          title: "ادعای ساختگی",
          items: [
            {
              fa: "دستکشِ اسکی هم می‌شود، در زمستان",
              it: "possono essere sostituiti dai guanti da sci",
              sourceId: "6114",
              textIt: "I guanti ad uso motociclistico possono essere sostituiti dai guanti da sci, ma solo nella stagione fredda",
              answer: 0,
            },
            {
              fa: "مشکی، با نقشِ موتور روی مچ",
              it: "di colore nero e con una sagoma di moto stampigliata sul polso",
              sourceId: "6116",
              textIt: "I guanti ad uso motociclistico si riconoscono perché di colore nero e con una sagoma di moto stampigliata sul polso",
              answer: 0,
            },
            {
              fa: "برای موتور گازی مناسب نیست",
              it: "non sono idonei alla guida di ciclomotori a due ruote",
              sourceId: "6118",
              textIt: "I guanti ad uso motociclistico non sono idonei alla guida di ciclomotori a due ruote",
              answer: 0,
            },
          ],
        },
      ],
      takeaway: "دستکشِ مخصوص، در هر فصل و روی هر دوچرخه‌ی موتوری. بی‌دستکش کنترلت بهتر نمی‌شود.",
      rule: EN,
    },
    {
      kind: "table",
      title: "کاپشن",
      body: "کاپشنِ موتورسواری دو کار دارد: پوست را روی آسفالت نگه می‌دارد و مفصل‌ها را در ضربه.",
      columns: ["ویژگی"],
      rows: [
        { label: "سایش", it: "protezione all’abrasione", values: ["در سُر خوردن روی آسفالت پاره و ساییده نمی‌شود."] },
        { label: "محافظِ سخت", it: "inserti rigidi protettivi", values: ["روی مفصل‌ها: شانه و آرنج."] },
        { label: "تابستان", it: "utilizzo estivo", values: ["مدل‌های تابستانیِ تهویه‌دار هم هست؛ تابستان بهانه نیست."] },
        { label: "رنگ", it: "unicamente di colore nero", values: ["رنگ ربطی به تأیید ندارد؛ رنگِ روشن حتی دیده شدن را بهتر می‌کند."] },
      ],
      takeaway: "کاپشن یعنی مقاومت در برابرِ سایش و محافظِ مفصل، در هر فصل و هر رنگ.",
      rule: EN,
    },
    {
      kind: "classify",
      title: "کدام وسیله؟",
      body: "هر ویژگی را به وسیله‌اش وصل کن. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "stivali", fa: "چکمه" },
        { it: "guanti", fa: "دستکش" },
        { it: "giacca", fa: "کاپشن" },
      ],
      items: [
        { prompt: "بندِ کفش ندارد تا به رکاب گیر نکند", answer: 0, explain: "چکمه، بی‌بند." },
        { prompt: "پشتِ دست را در برابرِ ضربه به چیزهای سخت حفظ می‌کند", answer: 1, explain: "دستکش." },
        { prompt: "روی شانه و آرنج محافظِ سخت دارد", answer: 2, explain: "کاپشن." },
        { prompt: "کفِ دست را در سُر خوردن روی آسفالت حفظ می‌کند", answer: 1, explain: "دستکش." },
        { prompt: "مچِ پا را از پیچ‌خوردگی و سرما حفظ می‌کند", answer: 0, explain: "چکمه." },
        { prompt: "تنه و بازوها را در سُر خوردن روی آسفالت از سایش حفظ می‌کند", answer: 2, explain: "کاپشن." },
      ],
      takeaway: "پا: چکمه. دست: دستکش. تنه و مفصل‌ها: کاپشن.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "gli stivali ad uso motociclistico", fa: "چکمه‌ی موتورسواری" },
        { it: "i guanti", fa: "دستکش" },
        { it: "la giacca", fa: "کاپشن" },
        { it: "l’abrasione", fa: "سایش" },
        { it: "la caviglia", fa: "مچِ پا" },
        { it: "il dorso della mano", fa: "پشتِ دست" },
        { it: "il palmo della mano", fa: "کفِ دست" },
        { it: "le stringhe", fa: "بندِ کفش" },
        { it: "gli inserti rigidi", fa: "محافظ‌های سخت" },
        { it: "scalzarsi", fa: "از پا درآمدن (کفش)" },
      ],
    },
    {
      kind: "trap",
      title: "«anche d’estate» درست، «inutile l’estate» غلط",
      body: "هر دو جمله درباره‌ی دستکش در تابستان است. یکی کارِ اصلیِ دستکش را می‌داند، دیگری آن را با گرم نگه داشتن اشتباه گرفته:",
      examples: [
        {
          sourceId: "6111",
          textIt: "Quando si circola a bordo di un motociclo, è opportuno indossare gli specifici guanti anche d’estate",
          answer: 1,
          chunks: [
            { it: "Quando si circola a bordo di un motociclo,", fa: "وقتی سوار بر موتورسیکلت می‌رانی،", verb: "si circola ← circolare" },
            { it: "è opportuno indossare gli specifici guanti", fa: "بهتر است دستکشِ مخصوص بپوشی", verb: "è ← essere" },
            { it: "anche d’estate", fa: "حتی در تابستان", focus: "always" },
          ],
          translation: "وقتی سوار بر موتورسیکلت می‌رانی، بهتر است حتی در تابستان دستکشِ مخصوص بپوشی.",
          why: "درست است. سایش و ضربه فصل نمی‌شناسند.",
        },
        {
          sourceId: "6119",
          textIt: "I guanti ad uso motociclistico hanno come principale scopo quello di proteggere dal freddo, pertanto è inutile usarli l’estate",
          answer: 0,
          chunks: [
            { it: "I guanti ad uso motociclistico", fa: "دستکش‌های موتورسواری" },
            { it: "hanno come principale scopo quello di proteggere dal freddo,", fa: "کارِ اصلی‌شان محافظت در برابرِ سرماست،", verb: "hanno ← avere", focus: "reason" },
            { it: "pertanto è inutile usarli l’estate", fa: "پس در تابستان استفاده‌شان بی‌فایده است", verb: "è ← essere", focus: "negation" },
          ],
          translation: "کارِ اصلیِ دستکش‌های موتورسواری محافظت در برابرِ سرماست، پس در تابستان استفاده‌شان بی‌فایده است.",
          why: "غلط است. کارِ اصلی محافظت در افتادن است، نه گرما.",
        },
      ],
      takeaway: "تجهیزاتِ موتورسواری برای افتادن است؛ «فقط زمستان» همیشه غلط است.",
      rule: EN,
    },
  ],
  practice: [
    {
      sourceId: "6106",
      textIt: "Guidando ciclomotori o motocicli è consigliabile utilizzare guanti protettivi per le mani",
      answer: 1,
      chunks: [
        { it: "Guidando ciclomotori o motocicli", fa: "وقتی موتور گازی یا موتورسیکلت می‌رانی", verb: "guidando ← guidare", focus: "condition" },
        { it: "è consigliabile", fa: "توصیه می‌شود", verb: "è ← essere" },
        { it: "utilizzare guanti protettivi per le mani", fa: "از دستکشِ محافظ استفاده کنی" },
      ],
      translation: "وقتی موتور گازی یا موتورسیکلت می‌رانی، توصیه می‌شود از دستکشِ محافظ استفاده کنی.",
      why: "درست است (قدم ۱). دستکش اجباری نیست، ولی جدی توصیه می‌شود؛ فقط کلاه را قانون می‌خواهد.",
      rule: EN,
      conceptStep: 1,
    },
    {
      sourceId: "6102",
      textIt: "Gli stivali ad uso motociclistico hanno la suola in acciaio",
      answer: 0,
      chunks: [
        { it: "Gli stivali ad uso motociclistico", fa: "چکمه‌های موتورسواری" },
        { it: "hanno la suola in acciaio", fa: "کفِ فولادی دارند", verb: "hanno ← avere", focus: "contrast" },
      ],
      translation: "چکمه‌های موتورسواری کفِ فولادی دارند.",
      why: "غلط است (قدم ۲). کفِ فولادی ویژگیِ کفشِ کار است، نه چکمه‌ی موتورسواری.",
      rule: EN,
      conceptStep: 2,
    },
    {
      sourceId: "6115",
      textIt: "Se si guida un motociclo senza guanti si può intervenire più rapidamente sui comandi",
      answer: 0,
      chunks: [
        { it: "Se si guida un motociclo senza guanti", fa: "اگر بی‌دستکش موتورسیکلت برانی", verb: "si guida ← guidare", focus: "condition" },
        { it: "si può intervenire più rapidamente sui comandi", fa: "می‌توانی سریع‌تر با دسته‌ها کار کنی", verb: "si può ← potere", focus: "contrast" },
      ],
      translation: "اگر بی‌دستکش موتورسیکلت برانی، می‌توانی سریع‌تر با دسته‌ها کار کنی.",
      why: "غلط است (قدم ۳). دستکشِ مخصوص حسِ دست را نگه می‌دارد و گرفتن را مطمئن‌تر می‌کند.",
      rule: EN,
      conceptStep: 3,
    },
    {
      sourceId: "6121",
      textIt: "Le giacche ad uso motociclistico hanno inserti rigidi protettivi in corrispondenza delle articolazioni",
      answer: 1,
      chunks: [
        { it: "Le giacche ad uso motociclistico", fa: "کاپشن‌های موتورسواری" },
        { it: "hanno inserti rigidi protettivi", fa: "محافظ‌های سخت دارند", verb: "hanno ← avere" },
        { it: "in corrispondenza delle articolazioni", fa: "روی مفصل‌ها" },
      ],
      translation: "کاپشن‌های موتورسواری روی مفصل‌ها محافظ‌های سخت دارند.",
      why: "درست است (قدم ۴). شانه و آرنج در افتادن ضربه می‌خورند؛ محافظِ سخت همان‌جاست.",
      rule: EN,
      conceptStep: 4,
    },
    {
      sourceId: "6124",
      textIt: "Le giacche ad uso motociclistico non sono previste per utilizzo estivo",
      answer: 0,
      chunks: [
        { it: "Le giacche ad uso motociclistico", fa: "کاپشن‌های موتورسواری" },
        { it: "non sono previste per utilizzo estivo", fa: "برای استفاده در تابستان پیش‌بینی نشده‌اند", verb: "sono previste ← prevedere", focus: "negation" },
      ],
      translation: "کاپشن‌های موتورسواری برای استفاده در تابستان پیش‌بینی نشده‌اند.",
      why: "غلط است (قدم ۴). مدل‌های تابستانیِ تهویه‌دار هم هست.",
      rule: EN,
      conceptStep: 4,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6098", "6105", "6106", "6113", "6122", "6123"] },
    { step: 2, sourceIds: ["6094", "6095", "6096", "6097", "6099", "6100", "6101", "6102", "6103", "6104"] },
    { step: 3, sourceIds: ["6107", "6108", "6109", "6110", "6111", "6112", "6114", "6115", "6116", "6117", "6118", "6119"] },
    { step: 4, sourceIds: ["6120", "6121", "6124", "6125"] },
  ],
};
