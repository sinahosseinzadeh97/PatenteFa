/**
 * src/content/ch8-zone.ts
 * Chapter 8 (Segnali di indicazione), lessons 9–10: pedestrian areas, limited
 * traffic zones, pedestrian and cycle crossings, the school bus; lane-use and
 * lane-count signs.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter8.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const SIGN = "Il segnale raffigurato";
const SIGN_FA = "تابلوی تصویر";

// ── Lesson 9 ──────────────────────────────────────────────────────────────────

export const lessonZoneAttraversamenti: Lesson = {
  id: "zone-pedonali-attraversamenti",
  titleFa: "جای عابر و دوچرخه: منطقه‌ی پیاده، ZTL، گذرگاه‌ها و سرویسِ مدرسه",
  titleIt: "AREA PEDONALE · ZTL · ATTRAVERSAMENTI · SCUOLABUS",
  minutes: 5,
  signs: [186, 187, 218, 236, 219],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس فرقِ «منطقه‌ی پیاده» (ورودِ وسایلِ نقلیه ممنوع، جز استثناهای پنل) و «منطقه‌ی ترافیکِ محدود» (فقط دسته‌های مجاز) را می‌دانی؛ تابلوی آبیِ گذرگاهِ عابر و دوچرخه را از مثلثِ خطرشان جدا می‌کنی؛ و تابلوی نارنجیِ سرویسِ مدرسه را می‌شناسی.",
      why: "۴۴ سؤال. بانک ZTL را «منعِ همه» یا «فقط ساکنان» معرفی می‌کند، جای تابلوی گذرگاه را با جای مثلثِ هشدار عوض می‌کند، و تابلوی دوچرخه را «مسیرِ دوچرخه» می‌خواند.",
    },
    {
      kind: "table",
      title: "منطقه‌ی پیاده و منطقه‌ی ترافیکِ محدود",
      body: "هر دو در ورودیِ یک منطقه‌اند و پنلِ زیرشان می‌گوید چه کسی می‌تواند وارد شود. همان تابلو با خطِ قرمز = پایانِ منطقه.",
      columns: ["قاعده"],
      rows: [
        { label: "منطقه‌ی پیاده", it: "area pedonale", sign: 186, values: ["شروعِ منطقه‌ای که رفت‌وآمدِ وسایلِ نقلیه در آن ممنوع است. پنل استثناها را می‌گوید: خودروی معلولان، پلیس و آمبولانس در اورژانس، بارگیری در ساعت‌های مشخص."] },
        { label: "ترافیکِ محدود", it: "zona a traffico limitato", sign: 187, values: ["شروعِ منطقه‌ای که ورود و رفت‌وآمد فقط برای بعضی دسته‌های وسیله‌ی نقلیه (و گاهی فقط در بعضی ساعت‌ها) آزاد است. پنل دسته‌های مجاز را می‌گوید."] },
        { label: "چه نیستند", it: "non vietano tutto", values: ["ZTL «منعِ همه‌ی وسایلِ نقلیه» یا «فقط ساکنان» نیست؛ پنل می‌گوید. منطقه‌ی پیاده هم «فقط برای معلولان» نیست. هیچ‌کدام پاسگاهِ پلیس، منطقه‌ی نظامی یا دست‌فروش نیستند."] },
      ],
      takeaway: "منطقه‌ی پیاده = وسایلِ نقلیه نه، جز استثناها. ZTL = فقط دسته‌های مجاز. پنل را بخوان.",
      rule: "DPR 495/1992 art. 135 c.13–14",
    },
    {
      kind: "table",
      title: "تابلوی آبیِ گذرگاه: درست سرِ خط‌کشی",
      body: "مثلثِ قرمز (فصل ۲) از دور هشدار می‌دهد. مربعِ آبی خودِ گذرگاه را مشخص می‌کند: کنارِ خط‌کشی، از دو طرف.",
      columns: ["قاعده"],
      rows: [
        { label: "گذرگاهِ عابر", it: "attraversamento pedonale", sign: 218, values: ["گذرگاهِ عابرِ بدونِ چراغ. درست کنارِ خط‌کشی‌ها، دوطرفه. بیرون از شهر پیش از آن مثلثِ خطرِ «گذرگاهِ عابر» می‌آید؛ مربعِ آبی ۱۵۰ متر قبل نیست."] },
        { label: "با عابر چه کنی", it: "dare la precedenza ai pedoni", values: ["به عابری که روی خط‌کشی است راه بده: آرام کن و اگر لازم شد بایست. از خودرویی که برای عابر ایستاده سبقت نگیر."] },
        { label: "گذرگاهِ دوچرخه", it: "attraversamento ciclabile", sign: 236, values: ["جایی که مسیرِ دوچرخه از عرضِ جاده می‌گذرد، با خط‌کشیِ مخصوص. به دوچرخه‌سوارِ روی خط‌کشی راه بده. «مسیرِ دوچرخه» نیست و دوچرخه را منع نمی‌کند."] },
      ],
      takeaway: "مثلث = هشدار از دور. مربعِ آبی = اینجا، سرِ خط‌کشی. روی خط‌کشی به عابر و دوچرخه راه بده.",
      rule: "DPR 495/1992 art. 135 c.3, c.15; CdS art. 191 c.1; art. 40 c.11; art. 148 c.13",
    },
    {
      kind: "table",
      title: "سرویسِ مدرسه",
      body: "مربعِ نارنجی با دو بچه‌ی دوان. نارنجی فقط برای همین تابلو و تاکسی است.",
      columns: ["قاعده"],
      rows: [
        { label: "کنارِ پیاده‌رو", it: "fermata dello scuolabus", sign: 219, values: ["ایستگاهِ اتوبوسِ مدرسه."] },
        { label: "روی اتوبوس", it: "sul retro dell'autobus", values: ["این اتوبوس بچه‌ها را جابه‌جا می‌کند."] },
        { label: "یعنی برای تو", it: "attenzione ai bambini", values: ["حواست به بچه‌هایی باشد که پیاده شده‌اند و ممکن است ناگهان از جاده بگذرند. خودِ تابلو عبورِ بچه‌ی تنها را منع نمی‌کند و پارک را خبر نمی‌دهد."] },
      ],
      takeaway: "نارنجی + بچه‌ها = ایستگاه یا اتوبوسِ مدرسه. آهسته کن و منتظرِ بچه‌ی ناگهانی باش.",
      rule: "DPR 495/1992 art. 135 c.4; art. 78 c.2",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'area pedonale", fa: "منطقه‌ی پیاده" },
        { it: "la zona a traffico limitato (ZTL)", fa: "منطقه‌ی ترافیکِ محدود" },
        { it: "le categorie di veicoli ammessi", base: "ammettere", fa: "دسته‌های وسایلِ نقلیه‌ی مجاز" },
        { it: "il pannello aggiuntivo", fa: "پنلِ تکمیلیِ زیرِ تابلو" },
        { it: "l'attraversamento pedonale · ciclabile", fa: "گذرگاهِ عابر · گذرگاهِ دوچرخه" },
        { it: "non regolato", base: "regolare", fa: "بدونِ چراغ یا مأمور" },
        { it: "lo scuolabus", fa: "اتوبوسِ مدرسه" },
      ],
    },
    {
      kind: "trap",
      title: "سرِ خط‌کشی یا ۱۵۰ متر قبل؟",
      body: "دو جمله درباره‌ی جای تابلوی آبیِ گذرگاهِ عابر:",
      examples: [
        {
          sourceId: "3264",
          sign: 218,
          textIt: "Il segnale raffigurato si trova direttamente in corrispondenza delle strisce dell'attraversamento pedonale",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "si trova direttamente", fa: "مستقیماً قرار دارد", verb: "si trova ← trovarsi" },
            { it: "in corrispondenza delle strisce dell'attraversamento pedonale", fa: "درست کنارِ خط‌کشی‌های گذرگاهِ عابر" },
          ],
          translation: "تابلوی تصویر مستقیماً درست کنارِ خط‌کشی‌های گذرگاهِ عابر قرار دارد.",
          why: "درست است. مربعِ آبی جای خودِ گذرگاه را نشان می‌دهد.",
        },
        {
          sourceId: "3267",
          sign: 218,
          textIt: "Il segnale raffigurato è posto 150 metri prima di un attraversamento pedonale",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "è posto", fa: "نصب شده است", verb: "è posto ← porre" },
            { it: "150 metri prima di un attraversamento pedonale", fa: "۱۵۰ متر پیش از یک گذرگاهِ عابر", focus: "contrast" },
          ],
          translation: "تابلوی تصویر، ۱۵۰ متر پیش از یک گذرگاهِ عابر نصب شده است.",
          why: "غلط است. «۱۵۰ متر قبل» مالِ مثلثِ خطر است (فصل ۲). مربعِ آبی سرِ خط‌کشی است.",
        },
      ],
      takeaway: "شکل جای تابلو را می‌گوید: مثلث پیش از خطر؛ مربعِ آبی سرِ خودِ گذرگاه.",
      rule: "DPR 495/1992 art. 135 c.3",
    },
  ],
  practice: [
    {
      sourceId: "3178",
      sign: 187,
      textIt: "Il segnale raffigurato vieta il transito di tutti i veicoli",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "vieta il transito", fa: "عبور را ممنوع می‌کند", verb: "vieta ← vietare" },
        { it: "di tutti i veicoli", fa: "برای همه‌ی وسایلِ نقلیه", focus: "always" },
      ],
      translation: "تابلوی تصویر عبورِ همه‌ی وسایلِ نقلیه را ممنوع می‌کند.",
      why: "غلط است (قدم ۱). در ZTL دسته‌هایی که پنل می‌گوید می‌توانند وارد شوند.",
      rule: "DPR 495/1992 art. 135 c.14",
      conceptStep: 1,
    },
    {
      sourceId: "3263",
      sign: 218,
      textIt: "Il segnale raffigurato fuori dei centri abitati si trova dopo il segnale di pericolo ATTRAVERSAMENTO PEDONALE",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "fuori dei centri abitati", fa: "بیرون از شهرها", focus: "condition" },
        { it: "si trova dopo il segnale di pericolo ATTRAVERSAMENTO PEDONALE", fa: "بعد از تابلوی خطرِ «گذرگاهِ عابر» قرار دارد", verb: "si trova ← trovarsi" },
      ],
      translation: "تابلوی تصویر بیرون از شهرها بعد از تابلوی خطرِ «گذرگاهِ عابر» قرار دارد.",
      why: "درست است (قدم ۲). بیرون از شهر اول مثلثِ هشدار می‌آید، بعد سرِ گذرگاه مربعِ آبی.",
      rule: "DPR 495/1992 art. 135 c.3",
      conceptStep: 2,
    },
    {
      sourceId: "3351",
      sign: 236,
      textIt: "Il segnale raffigurato indica una pista ciclabile",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica", fa: "نشان می‌دهد", verb: "indica ← indicare" },
        { it: "una pista ciclabile", fa: "یک مسیرِ دوچرخه را", focus: "contrast" },
      ],
      translation: "تابلوی تصویر یک مسیرِ دوچرخه را نشان می‌دهد.",
      why: "غلط است (قدم ۲). مربعِ آبی گذرگاهِ دوچرخه است: جایی که مسیرِ دوچرخه از عرضِ جاده می‌گذرد. مسیرِ دوچرخه تابلوی گردِ آبیِ اجبار است (فصل ۴).",
      rule: "DPR 495/1992 art. 135 c.15",
      conceptStep: 2,
    },
    {
      sourceId: "3272",
      sign: 219,
      textIt: "Il segnale raffigurato, se posto all'esterno di un autobus, segnala che esso trasporta scolari",
      answer: 1,
      chunks: [
        { it: "Il segnale raffigurato,", fa: "تابلوی تصویر،" },
        { it: "se posto all'esterno di un autobus,", fa: "اگر بیرونِ یک اتوبوس نصب شده باشد،", focus: "condition" },
        { it: "segnala che esso trasporta scolari", fa: "خبر می‌دهد که دانش‌آموز می‌برد", verb: "trasporta ← trasportare" },
      ],
      translation: "تابلوی تصویر، اگر بیرونِ یک اتوبوس نصب شده باشد، خبر می‌دهد که آن اتوبوس دانش‌آموز می‌برد.",
      why: "درست است (قدم ۳). روی اتوبوس یعنی این اتوبوس بچه‌ها را جابه‌جا می‌کند.",
      rule: "DPR 495/1992 art. 135 c.4",
      conceptStep: 3,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        "3165", "3166", "3167", "3168", "3169", "3170", "3171", "3172",
        "3173", "3174", "3175", "3176", "3177", "3178", "3179", "3180", "3181", "3182",
      ],
    },
    {
      step: 2,
      sourceIds: [
        "3262", "3263", "3264", "3265", "3266", "3267", "3269", "3270",
        "3344", "3345", "3346", "3347", "3348", "3349", "3350", "3351", "3352", "3353",
      ],
    },
    { step: 3, sourceIds: ["3271", "3272", "3273", "3274", "3275", "3276", "3277", "3278"] },
  ],
};

// ── Lesson 10 ─────────────────────────────────────────────────────────────────

export const lessonUsoCorsie: Lesson = {
  id: "uso-corsie",
  titleFa: "خطوطِ جاده: هر خط برای کیست و چند خط داری",
  titleIt: "USO CORSIE · VARIAZIONE CORSIE DISPONIBILI",
  minutes: 5,
  signs: [242, 243, 245, 247, 248],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس تابلوی «استفاده از خطوط» را می‌خوانی: هر فلش یک خط است و تابلوی گردِ کوچکِ روی آن قاعده‌ی همان خط است (کامیون ممنوع، حداقلِ سرعت، مخصوصِ اتوبوس). تابلوی افزایش و کاهشِ تعدادِ خطوط را هم می‌شناسی.",
      why: "۴۰ سؤال. بانک قاعده‌ی یک خط را به همه‌ی خطوط یا همه‌ی وسایل تعمیم می‌دهد، حداقلِ سرعت را «پیشنهادی» می‌خواند و کاهشِ خط را «کارگاه» یا «حق تقدم».",
    },
    {
      kind: "table",
      title: "یک خط، یک قاعده",
      body: "تابلوی اطلاعاتی خطوط را می‌کشد؛ دستور از تابلوی گردِ کوچکِ روی هر فلش می‌آید و فقط برای همان خط است.",
      columns: ["قاعده"],
      rows: [
        { label: "کامیون روی خطِ چپ نه", it: "uso corsie · autocarri", sign: 242, values: ["آبی، برون‌شهری، دو خط در یک جهت. روی خطِ چپ تابلوی منعِ کامیون: کامیونِ بالای ۳٫۵ تن فقط خطِ راست. سواری، موتور و اتوبوس هر دو خط."] },
        { label: "خطِ ویژه‌ی اتوبوس", it: "corsia riservata autobus", sign: 245, values: ["سفید، داخلِ شهر. خطِ راست، جداشده با خطِ زرد، مخصوصِ اتوبوس‌های خطِ عمومیِ شهری (دایره‌ی آبیِ اتوبوس = اجبار). خطوطِ چپ برای همه. نه تاکسی، نه دوچرخه."] },
        { label: "چه نیست", it: "non è per tutti gli autocarri", values: ["منع فقط برای کامیونِ بالای ۳٫۵ تن است، نه «همه‌ی کامیون‌ها». تابلو اجازه‌ی سبقت از راست نمی‌دهد. «فقط جاده‌ی دوطرفه» هم نیست: خطوطِ یک جهت را نشان می‌دهد."] },
      ],
      takeaway: "تابلوی گردِ کوچک = قاعده‌ی همان خط، برای همان وسیله‌ای که نشان می‌دهد.",
      rule: "DPR 495/1992 art. 135 c.19; art. 127 c.9",
    },
    {
      kind: "table",
      title: "حداقلِ سرعت در هر خط",
      body: "سبز، آزادراه، سه خط. عددِ داخلِ دایره‌ی آبی «حداقلِ سرعتِ اجباری» است (همان تابلوی اجبارِ فصل ۴)، فقط برای همان خط.",
      columns: ["قاعده"],
      rows: [
        { label: "خطِ چپ: ۹۰", it: "minimo 90 km/h", sign: 243, values: ["کمتر از ۹۰ نمی‌توانی در این خط بمانی. با ۸۰ این خط مالِ تو نیست."] },
        { label: "خطِ وسط: ۶۰", it: "minimo 60 km/h", values: ["دست‌کم ۶۰. با ۱۰۰ می‌توانی در خطِ وسط باشی."] },
        { label: "خطِ راست", it: "nessun minimo", values: ["حداقل ندارد. با ۵۰ باید در خطِ راست باشی."] },
        { label: "سقف", it: "massimo 130", values: ["حداقل‌ها سقف را برنمی‌دارند: در آزادراه سقف ۱۳۰ است؛ «۱۶۰ در هر سه خط» غلط است."] },
      ],
      takeaway: "دایره‌ی آبی با عدد = حداقلِ اجباری، نه سرعتِ پیشنهادی.",
      rule: "DPR 495/1992 art. 135 c.19; art. 122 c.7; CdS art. 142 c.1",
    },
    {
      kind: "table",
      title: "تعدادِ خطوط عوض می‌شود",
      body: "دو تابلوی «تغییرِ تعدادِ خطوط». ممکن است پنلی هم فاصله تا نقطه‌ی تغییر را بگوید.",
      columns: ["یعنی"],
      rows: [
        { label: "افزایش", it: "aumento delle corsie", sign: 247, values: ["آبی، برون‌شهری: از یک خط به دو خط. نه پیش‌انتخاب، نه خطِ کاهشِ سرعت، نه اجازه‌ی سبقت از راست، نه اجبار به راست، نه دوراهیِ دورِ مانع."] },
        { label: "کاهش", it: "diminuzione delle corsie", sign: 248, values: ["سبز، آزادراه: از سه خط به دو خط. سرعت را کم کن. نه کارگاه، نه اجبار به چپ، نه حق تقدم به ورودی‌ها، نه روگذرِ دور زدن."] },
      ],
      takeaway: "فلشِ خمیده که به خطِ دیگر می‌پیوندد = خطی کم می‌شود؛ فلشی که از کنار جدا می‌شود = خطی اضافه می‌شود.",
      rule: "DPR 495/1992 art. 135 c.20",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la corsia", fa: "خطِ عبور (لاین)" },
        { it: "la carreggiata", fa: "سواره‌رو؛ مسیرِ یک جهت" },
        { it: "la massa a pieno carico", fa: "وزن با بارِ کامل" },
        { it: "la velocità minima obbligatoria", fa: "حداقلِ سرعتِ اجباری" },
        { it: "riservata agli autobus", base: "riservare", fa: "مخصوصِ اتوبوس" },
        { it: "l'aumento · la diminuzione", fa: "افزایش · کاهش" },
        { it: "il restringimento", fa: "باریک شدن" },
      ],
    },
    {
      kind: "trap",
      title: "با این سرعت، کدام خط؟",
      body: "دو جمله درباره‌ی همان آزادراهِ سه‌خطه با حداقل‌های ۹۰ و ۶۰:",
      examples: [
        {
          sourceId: "3396",
          sign: 243,
          textIt: "Il segnale raffigurato consente ad un veicolo che viaggia a 100 km/h di percorrere la corsia di mezzo",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "consente ad un veicolo che viaggia a 100 km/h", fa: "به وسیله‌ای که با ۱۰۰ کیلومتر بر ساعت می‌رود اجازه می‌دهد", verb: "consente ← consentire" },
            { it: "di percorrere la corsia di mezzo", fa: "در خطِ وسط برود" },
          ],
          translation: "تابلوی تصویر به وسیله‌ای که با ۱۰۰ کیلومتر بر ساعت می‌رود اجازه می‌دهد در خطِ وسط برود.",
          why: "درست است. حداقلِ خطِ وسط ۶۰ است؛ ۱۰۰ بیشتر است.",
        },
        {
          sourceId: "3400",
          sign: 243,
          textIt: "Il segnale raffigurato consente ad un veicolo che viaggia alla velocità di 80 km/h di stare sulla corsia di sinistra",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "consente ad un veicolo che viaggia alla velocità di 80 km/h", fa: "به وسیله‌ای که با سرعتِ ۸۰ کیلومتر بر ساعت می‌رود اجازه می‌دهد", verb: "consente ← consentire" },
            { it: "di stare sulla corsia di sinistra", fa: "در خطِ چپ بماند", focus: "contrast" },
          ],
          translation: "تابلوی تصویر به وسیله‌ای که با سرعتِ ۸۰ کیلومتر بر ساعت می‌رود اجازه می‌دهد در خطِ چپ بماند.",
          why: "غلط است. حداقلِ خطِ چپ ۹۰ است؛ ۸۰ کمتر است.",
        },
      ],
      takeaway: "سرعتت را با عددِ هر خط مقایسه کن: باید بیشتر یا مساوی باشد.",
      rule: "DPR 495/1992 art. 135 c.19; art. 122 c.7",
    },
  ],
  practice: [
    {
      sourceId: "3391",
      sign: 242,
      textIt: "Il segnale raffigurato vieta a tutti gli autocarri di circolare sulla corsia di sinistra",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "vieta a tutti gli autocarri", fa: "برای همه‌ی کامیون‌ها ممنوع می‌کند", verb: "vieta ← vietare", focus: "always" },
        { it: "di circolare sulla corsia di sinistra", fa: "رفت‌وآمد در خطِ چپ را" },
      ],
      translation: "تابلوی تصویر رفت‌وآمد در خطِ چپ را برای همه‌ی کامیون‌ها ممنوع می‌کند.",
      why: "غلط است (قدم ۱). فقط کامیونِ بالای ۳٫۵ تن (با بارِ کامل)، نه همه‌ی کامیون‌ها.",
      rule: "DPR 495/1992 art. 135 c.19",
      conceptStep: 1,
    },
    {
      sourceId: "3404",
      sign: 245,
      textIt: "Il segnale raffigurato indica che la corsia di destra è riservata agli autobus dei servizi pubblici urbani",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che la corsia di destra", fa: "نشان می‌دهد که خطِ راست", verb: "indica ← indicare" },
        { it: "è riservata agli autobus dei servizi pubblici urbani", fa: "مخصوصِ اتوبوس‌های حمل‌ونقلِ عمومیِ شهری است" },
      ],
      translation: "تابلوی تصویر نشان می‌دهد که خطِ راست مخصوصِ اتوبوس‌های حمل‌ونقلِ عمومیِ شهری است.",
      why: "درست است (قدم ۱). دایره‌ی آبیِ اتوبوس روی خطِ راست، جداشده با خطِ زرد.",
      rule: "DPR 495/1992 art. 135 c.19",
      conceptStep: 1,
    },
    {
      sourceId: "3399",
      sign: 243,
      textIt: "Il segnale raffigurato riporta le velocità che si consiglia di non superare",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "riporta le velocità", fa: "سرعت‌هایی را نشان می‌دهد", verb: "riporta ← riportare" },
        { it: "che si consiglia di non superare", fa: "که توصیه می‌شود از آن‌ها بیشتر نروی", focus: "contrast" },
      ],
      translation: "تابلوی تصویر سرعت‌هایی را نشان می‌دهد که توصیه می‌شود از آن‌ها بیشتر نروی.",
      why: "غلط است (قدم ۲). دایره‌ی آبی با عدد حداقلِ اجباری است، نه سقفِ پیشنهادی.",
      rule: "DPR 495/1992 art. 122 c.7",
      conceptStep: 2,
    },
    {
      sourceId: "3422",
      sign: 248,
      textIt: "Il segnale raffigurato indica una riduzione da tre a due corsie",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica una riduzione", fa: "یک کاهش را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "da tre a due corsie", fa: "از سه خط به دو خط" },
      ],
      translation: "تابلوی تصویر کاهش از سه خط به دو خط را نشان می‌دهد.",
      why: "درست است (قدم ۳). خطِ راست با فلشِ خمیده به خطِ کناری می‌پیوندد.",
      rule: "DPR 495/1992 art. 135 c.20",
      conceptStep: 3,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        "3384", "3385", "3386", "3388", "3389", "3390", "3391", "3392", "3393",
        "3403", "3404", "3405", "3407", "3408", "3410",
      ],
    },
    { step: 2, sourceIds: ["3394", "3396", "3397", "3398", "3399", "3400", "3401", "3402"] },
    {
      step: 3,
      sourceIds: [
        "3411", "3412", "3413", "3415", "3416", "3417", "3418", "3419", "3420",
        "3421", "3422", "3423", "3424", "3426", "3427", "3428", "3429",
      ],
    },
  ],
};
