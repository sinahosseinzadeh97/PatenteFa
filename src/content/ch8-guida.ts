/**
 * src/content/ch8-guida.ts
 * Chapter 8 (Segnali di indicazione), lessons 11–13: signs useful for driving
 * (advised speed, tunnel, bridge, mountain-pass conditions); ways round on
 * dual carriageways (indirect left turn, U-turn structure, lay-by); advised
 * and obligatory diversions (white truck route, yellow roadworks signs).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter8.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const SIGN = "Il segnale raffigurato";
const SIGN_FA = "تابلوی تصویر";

// ── Lesson 11 ─────────────────────────────────────────────────────────────────

export const lessonGuidaGalleriaPonte: Lesson = {
  id: "velocita-consigliata-galleria-ponte",
  titleFa: "سرعتِ پیشنهادی، تونل، پل و گردنه‌ی کوهستانی",
  titleIt: "VELOCITÀ CONSIGLIATA · GALLERIA · PONTE · TRANSITABILITÀ",
  minutes: 5,
  signs: [226, 230, 231, 189, 193],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی عدد در مربعِ آبی سرعتِ «پیشنهادی» است، نه سقف و نه حداقل؛ تابلوهای تونل و پل را با قواعدی که یادآوری می‌کنند می‌شناسی؛ و تابلوی وضعیتِ گردنه‌ی کوهستانی را می‌خوانی: باز یا بسته، زنجیر اجباری یا فقط توصیه.",
      why: "۴۶ سؤال. «پیشنهاد» را «اجبار» می‌کنند، تونل را با پل عوض می‌کنند، و در تابلوی گردنه اجبار و توصیه‌ی زنجیر را جابه‌جا می‌کنند.",
    },
    {
      kind: "table",
      title: "سرعتِ پیشنهادی",
      body: "عدد در مربعِ آبی (نه دایره) = سرعتی که توصیه می‌شود در شرایطِ خوبِ ترافیک و هوا از آن بیشتر نروی. بیشتر در پیچ‌های خطرناک یا جاهای بادخیز.",
      columns: ["قاعده"],
      rows: [
        { label: "یعنی", it: "velocità consigliata", sign: 226, values: ["پیشنهاد است، نه قانون. با ۵۰ رفتن مجاز است؛ بیرون از شهر با ۷۰ هم مجاز است، چون سقفِ قانونی آنجا ۹۰ است."] },
        { label: "طول", it: "pannello: lunghezza del tratto", values: ["پنلی ممکن است طولِ بخشی را که این پیشنهاد در آن معتبر است بگوید."] },
        { label: "پایان", it: "barrato · fine", values: ["همان تابلو با خطِ قرمزِ مورب = پایانِ سرعتِ پیشنهادی."] },
        { label: "چه نیست", it: "non è un limite", values: ["نه سقفِ مجاز (دایره‌ی قرمز، فصل ۳)، نه حداقلِ اجباری (دایره‌ی آبی، فصل ۴)، نه فاصله‌ی ایمنی، نه کیلومترشمار، نه وزنِ ۶۰ تن."] },
      ],
      takeaway: "مربعِ آبی + عدد = پیشنهاد. دایره‌ی قرمز = سقف. دایره‌ی آبی = حداقل.",
      rule: "DPR 495/1992 art. 135 c.8",
    },
    {
      kind: "table",
      title: "تونل و پل",
      body: "هر دو مربعِ سبز (اینجا: آزادراه) هستند و ورودیِ یک سازه را خبر می‌دهند.",
      columns: ["قاعده"],
      rows: [
        { label: "تونل", it: "galleria", sign: 230, values: ["پیش از دهانه‌ی تونل. یادآوری می‌کند: چراغِ نزدیک روشن، توقف و پارک ممنوع (مگر تابلوی دیگری بگوید)، دور زدن ممنوع، اگر در ترافیک ایستادی موتور را خاموش کن. بانک اضافه می‌کند: هنگامِ بیرون آمدن فرمان را محکم بگیر، برای بادِ ناگهانی."] },
        { label: "پل", it: "ponte", sign: 231, values: ["ابتدای پل، viadotto یا روگذر. ممکن است پنلِ نام و طول داشته باشد. در بادِ شدید و بادِ پهلو احتیاط کن و فرمان را محکم بگیر."] },
        { label: "چه نیستند", it: "non vietano il sorpasso", values: ["هیچ‌کدام سبقت را ممنوع نمی‌کنند و ارتفاع را محدود نمی‌کنند. تونل «بی‌چراغ» یا «جاده‌ی بسته» یا «کارگاه» نیست. تابلوی پل یعنی از «روی» پل می‌گذری، نه از زیرِ آن."] },
      ],
      takeaway: "تونل = قواعدِ تونل را به یاد بیاور. پل = روی سازه هستی؛ مراقبِ باد باش.",
      rule: "DPR 495/1992 art. 135 c.10–11",
    },
    {
      kind: "table",
      title: "تابلوی وضعیتِ گردنه",
      body: "روی جاده‌های کوهستانی، وضعیتِ موقتِ یک گردنه (اینجا Stelvio) با سه پنل: باز یا بسته؛ زنجیر یا لاستیکِ زمستانی؛ تا کجا می‌شود رفت.",
      columns: ["یعنی"],
      rows: [
        { label: "باز + دایره‌ی آبیِ زنجیر", it: "aperto · catene obbligatorie", sign: 189, values: ["گردنه باز است، ولی فقط برای خودرویی که زنجیر یا لاستیکِ زمستانی دارد. دایره‌ی آبی اجبار است (فصل ۴، تابلوی زنجیر). «فقط پیشنهاد» یا «روی هر چهار چرخ» نیست."] },
        { label: "بسته + لاستیک و زنجیرِ بی‌دایره", it: "chiuso · fino a Trafoi", sign: 193, values: ["گردنه بسته است؛ تا Trafoi می‌شود رفت. نقشِ لاستیک و زنجیر بدونِ دایره‌ی آبی = توصیه: با احتیاط برو و تا Trafoi زنجیر یا لاستیکِ زمستانی بهتر است. اجبار یا منعِ عبور نیست."] },
        { label: "چه نیست", it: "non è una stazione sciistica", values: ["پیست اسکی یا پمپ‌بنزینِ بسته را خبر نمی‌دهد. «لاستیکِ نو» هم نمی‌خواهد."] },
      ],
      takeaway: "دایره‌ی آبی = اجبار. نقشِ تنها = توصیه. ردیفِ سبز «باز»، ردیفِ قرمز «بسته».",
      rule: "DPR 495/1992 art. 135 c.18; art. 122 (catene, fig. II.87)",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la velocità consigliata", fa: "سرعتِ پیشنهادی" },
        { it: "si consiglia di non superare", base: "consigliare", fa: "توصیه می‌شود بیشتر نروی" },
        { it: "la galleria", fa: "تونل" },
        { it: "il viadotto · il cavalcavia", fa: "پلِ دره · روگذر" },
        { it: "tenere ben saldo lo sterzo", base: "tenere", fa: "فرمان را محکم نگه داشتن" },
        { it: "le catene da neve", fa: "زنجیرِ چرخ" },
        { it: "gli pneumatici invernali", fa: "لاستیکِ زمستانی" },
        { it: "aperto · chiuso", fa: "باز · بسته" },
      ],
    },
    {
      kind: "trap",
      title: "پیشنهاد یا منع؟",
      body: "دو جمله درباره‌ی همان عدد در مربعِ آبی:",
      examples: [
        {
          sourceId: "3305",
          sign: 226,
          textIt: "Il segnale raffigurato indica la velocità che si consiglia di non superare in condizioni ottimali di traffico",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "indica la velocità", fa: "سرعتی را نشان می‌دهد", verb: "indica ← indicare" },
            { it: "che si consiglia di non superare", fa: "که توصیه می‌شود از آن بیشتر نروی", verb: "si consiglia ← consigliare" },
            { it: "in condizioni ottimali di traffico", fa: "در شرایطِ مطلوبِ ترافیک", focus: "condition" },
          ],
          translation: "تابلوی تصویر سرعتی را نشان می‌دهد که توصیه می‌شود در شرایطِ مطلوبِ ترافیک از آن بیشتر نروی.",
          why: "درست است. تعریفِ سرعتِ پیشنهادی همین است.",
        },
        {
          sourceId: "3312",
          sign: 226,
          textIt: "Il segnale raffigurato vieta di superare la velocità indicata",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "vieta", fa: "ممنوع می‌کند", verb: "vieta ← vietare", focus: "contrast" },
            { it: "di superare la velocità indicata", fa: "بیشتر رفتن از سرعتِ نوشته‌شده را" },
          ],
          translation: "تابلوی تصویر بیشتر رفتن از سرعتِ نوشته‌شده را ممنوع می‌کند.",
          why: "غلط است. منعِ سرعت دایره‌ی قرمز است. مربعِ آبی فقط توصیه می‌کند.",
        },
      ],
      takeaway: "«consiglia» درست، «vieta» یا «obbliga» غلط؛ مگر تابلو دایره باشد.",
      rule: "DPR 495/1992 art. 135 c.8",
    },
  ],
  practice: [
    {
      sourceId: "3309",
      sign: 226,
      textIt: "Il segnale raffigurato consente, sulle strade extraurbane, di viaggiare a 70 km/h",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "consente,", fa: "اجازه می‌دهد،", verb: "consente ← consentire" },
        { it: "sulle strade extraurbane,", fa: "در جاده‌های برون‌شهری،", focus: "condition" },
        { it: "di viaggiare a 70 km/h", fa: "با ۷۰ کیلومتر بر ساعت رانندگی کنی" },
      ],
      translation: "تابلوی تصویر در جاده‌های برون‌شهری اجازه می‌دهد با ۷۰ کیلومتر بر ساعت رانندگی کنی.",
      why: "درست است (قدم ۱). ۶۰ فقط پیشنهاد است؛ سقفِ قانونیِ برون‌شهری ۹۰ است. پس ۷۰ ممنوع نیست، هرچند بیشتر از پیشنهاد است.",
      rule: "DPR 495/1992 art. 135 c.8; CdS art. 142 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "3328",
      sign: 230,
      textIt: "Il segnale raffigurato ricorda di spegnere il motore in caso di arresto prolungato in galleria",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "ricorda di spegnere il motore", fa: "یادآوری می‌کند موتور را خاموش کنی", verb: "ricorda ← ricordare" },
        { it: "in caso di arresto prolungato in galleria", fa: "اگر در تونل مدتِ طولانی متوقف شدی", focus: "condition" },
      ],
      translation: "تابلوی تصویر یادآوری می‌کند که اگر در تونل مدتِ طولانی متوقف شدی، موتور را خاموش کنی.",
      why: "درست است (قدم ۲). یکی از چهار قاعده‌ای که تابلوی تونل یادآوری می‌کند.",
      rule: "DPR 495/1992 art. 135 c.10 lett. d",
      conceptStep: 2,
    },
    {
      sourceId: "3343",
      sign: 231,
      textIt: "Il segnale raffigurato indica che si sta per transitare sotto un ponte",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che si sta per transitare", fa: "نشان می‌دهد که به‌زودی عبور می‌کنی", verb: "si sta per ← stare per" },
        { it: "sotto un ponte", fa: "از زیرِ یک پل", focus: "contrast" },
      ],
      translation: "تابلوی تصویر نشان می‌دهد که به‌زودی از زیرِ یک پل عبور می‌کنی.",
      why: "غلط است (قدم ۲). ابتدای پل است: از روی پل می‌گذری.",
      rule: "DPR 495/1992 art. 135 c.11",
      conceptStep: 2,
    },
    {
      sourceId: "3185",
      sign: 189,
      textIt: "Il segnale raffigurato indica che la strada è aperta, ma solo ai veicoli che sono equipaggiati con catene o pneumatici invernali",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che la strada è aperta,", fa: "نشان می‌دهد که جاده باز است،", verb: "indica ← indicare" },
        { it: "ma solo ai veicoli", fa: "ولی فقط برای وسایلی", focus: "limit" },
        { it: "che sono equipaggiati con catene o pneumatici invernali", fa: "که زنجیر یا لاستیکِ زمستانی دارند" },
      ],
      translation: "تابلوی تصویر نشان می‌دهد که جاده باز است، ولی فقط برای وسایلی که زنجیر یا لاستیکِ زمستانی دارند.",
      why: "درست است (قدم ۳). ردیفِ سبز «aperto» و دایره‌ی آبیِ زنجیر = اجبار.",
      rule: "DPR 495/1992 art. 135 c.18; art. 122",
      conceptStep: 3,
    },
    {
      sourceId: "3198",
      sign: 193,
      textIt: "Il segnale raffigurato indica che è obbligatorio montare gli pneumatici invernali",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che è obbligatorio", fa: "نشان می‌دهد که اجباری است", verb: "indica ← indicare", focus: "always" },
        { it: "montare gli pneumatici invernali", fa: "لاستیکِ زمستانی بستن" },
      ],
      translation: "تابلوی تصویر نشان می‌دهد که بستنِ لاستیکِ زمستانی اجباری است.",
      why: "غلط است (قدم ۳). روی این تابلو لاستیک و زنجیر بدونِ دایره‌ی آبی‌اند: توصیه است، نه اجبار.",
      rule: "DPR 495/1992 art. 135 c.18",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["3305", "3306", "3307", "3308", "3309", "3310", "3311", "3312", "3313", "3314", "3315"] },
    {
      step: 2,
      sourceIds: [
        "3326", "3328", "3329", "3330", "3331", "3332", "3333", "3334", "3335", "3336",
        "3337", "3338", "3339", "3340", "3341", "3342", "3343",
      ],
    },
    {
      step: 3,
      sourceIds: [
        "3183", "3184", "3185", "3186", "3187", "3188", "3189", "3190", "3191", "3192",
        "3193", "3194", "3195", "3196", "3197", "3198", "3199", "3200",
      ],
    },
  ],
};

// ── Lesson 12 ─────────────────────────────────────────────────────────────────

export const lessonPercorsiCarreggiate: Lesson = {
  id: "svolta-indiretta-inversione-piazzola",
  titleFa: "دورِ جاده: چپِ غیرمستقیم، دور زدن و توقفگاه",
  titleIt: "SVOLTA A SINISTRA · INVERSIONE DI MARCIA · PIAZZOLA",
  minutes: 5,
  signs: [238, 239, 240],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس سه تابلو را می‌خوانی که راهِ «غیرمستقیم» را نشان می‌دهند: وقتی نمی‌شود مستقیم به چپ پیچید، مسیرِ دور زدن از دورِ بلوک؛ روگذر یا زیرگذری که در جاده‌ی دومسیره برگشتن را ممکن می‌کند؛ و توقفگاهِ کنارِ جاده.",
      why: "۲۷ سؤال. بانک این خبرها را «اجبار» می‌خواند (اجبار به چپ، اجبار به دور زدن) یا شکلِ مسیر را با پارکینگ و ایستگاهِ اتوبوس عوض می‌کند.",
    },
    {
      kind: "table",
      title: "پیچیدن به چپ، غیرمستقیم",
      body: "تابلوی سفید با بلوک‌های خاکستری و یک مسیرِ مشکی. خبر می‌دهد که جلوتر نمی‌شود مستقیم به چپ پیچید و نشان می‌دهد چطور دور بزنی.",
      columns: ["قاعده"],
      rows: [
        { label: "برای کیست", it: "chi vuole andare a sinistra", sign: 238, values: ["فقط برای کسی که می‌خواهد واردِ جاده‌ی سمتِ چپ شود: راه از راست و دورِ بلوک است."] },
        { label: "دیگران", it: "diritto e destra consentiti", values: ["مستقیم رفتن و پیچیدن به راست آزاد است."] },
        { label: "همه", it: "vale anche per bici e ciclomotori", values: ["برای دوچرخه و موتورِ کوچک هم معتبر است."] },
        { label: "چه نیست", it: "non è un parcheggio", values: ["حلقه‌ی مسیر شبیهِ P است ولی پارکینگ نیست؛ مسیرِ اتوبوس هم نیست. «در تقاطعِ بعدی حتماً به چپ بپیچ» هم نمی‌گوید."] },
      ],
      takeaway: "اگر می‌خواهی به چپ بروی، دور بزن. وگرنه این تابلو برای تو چیزی را عوض نمی‌کند.",
      rule: "DPR 495/1992 art. 135 c.16",
    },
    {
      kind: "table",
      title: "جای دور زدن در جاده‌ی دومسیره",
      body: "روی جاده‌ای که دو مسیرش با جداکننده جدا شده‌اند، نمی‌شود وسطِ جاده دور زد. این تابلو یک روگذر یا زیرگذر را نشان می‌دهد که با آن برمی‌گردی.",
      columns: ["قاعده"],
      rows: [
        { label: "یعنی", it: "inversione di marcia", sign: 239, values: ["روگذر یا زیرگذری که برگشتن به جهتِ مخالف را ممکن می‌کند. آبی: جاده‌ی دومسیره‌ی برون‌شهری؛ با زمینه‌ی سبز: آزادراه (درس ۱)."] },
        { label: "چه نیست", it: "non obbliga", values: ["اجبار به دور زدن نیست. نه جاده‌ی بسته، نه مسیرِ مستقیمِ طولانی، نه شروعِ جاده‌ی اصلی، نه تقاطعِ همسطح."] },
      ],
      takeaway: "فلشِ برگشتی روی جاده‌ی دومسیره = از اینجا می‌شود برگشت، اگر بخواهی.",
      rule: "DPR 495/1992 art. 135 c.16",
    },
    {
      kind: "table",
      title: "توقفگاهِ کنارِ جاده",
      body: "خط‌چینی که کنارِ جاده یک فرورفتگی می‌سازد: جایی بیرون از سواره‌رو برای ایستادنِ کوتاه (fermata).",
      columns: ["قاعده"],
      rows: [
        { label: "یعنی", it: "piazzola per la fermata", sign: 240, values: ["حدودِ ۱۰ متر پیش از توقفگاهی کنارِ سواره‌رو. ممکن است پنلی فاصله تا توقفگاه را بگوید."] },
        { label: "کجا", it: "strada extraurbana", values: ["آبی: جاده‌ی برون‌شهری؛ «فقط آزادراه» نیست."] },
        { label: "چه نیست", it: "non è un parcheggio", values: ["نه پارکِ ۳ ساعته، نه کمپ، نه پارکینگِ کاروان، نه ایستگاهِ اتوبوس، نه پهن شدنِ جاده."] },
      ],
      takeaway: "توقفگاه = جایی کنار برای ایستادنِ کوتاه، بیرون از مسیرِ عبور.",
      rule: "DPR 495/1992 art. 135 c.17",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "in modo diretto", fa: "به‌طورِ مستقیم" },
        { it: "il percorso", fa: "مسیر" },
        { it: "l'inversione di marcia", fa: "دور زدن؛ برگشتن" },
        { it: "il sottopassaggio", fa: "زیرگذر" },
        { it: "la strada a carreggiate separate", fa: "جاده‌ی دومسیره با جداکننده" },
        { it: "la piazzola", fa: "توقفگاهِ کنارِ جاده" },
        { it: "effettuare la fermata", base: "effettuare", fa: "توقفِ کوتاه کردن" },
      ],
    },
    {
      kind: "trap",
      title: "مسیر را نشان می‌دهد یا مجبور می‌کند؟",
      body: "دو جمله درباره‌ی تابلوی چپِ غیرمستقیم:",
      examples: [
        {
          sourceId: "3354",
          sign: 238,
          textIt: "Il segnale raffigurato indica il percorso da fare per prendere la strada di sinistra",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "indica il percorso da fare", fa: "مسیری را که باید رفت نشان می‌دهد", verb: "indica ← indicare" },
            { it: "per prendere la strada di sinistra", fa: "برای گرفتنِ جاده‌ی سمتِ چپ", focus: "condition" },
          ],
          translation: "تابلوی تصویر مسیری را که برای گرفتنِ جاده‌ی سمتِ چپ باید رفت نشان می‌دهد.",
          why: "درست است. مسیرِ مشکی راهِ رسیدن به جاده‌ی چپ است.",
        },
        {
          sourceId: "3359",
          sign: 238,
          textIt: "Il segnale raffigurato obbliga a svoltare a sinistra al prossimo incrocio",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "obbliga", fa: "مجبور می‌کند", verb: "obbliga ← obbligare", focus: "always" },
            { it: "a svoltare a sinistra al prossimo incrocio", fa: "در تقاطعِ بعدی به چپ بپیچی" },
          ],
          translation: "تابلوی تصویر مجبور می‌کند در تقاطعِ بعدی به چپ بپیچی.",
          why: "غلط است. برعکس: در تقاطعِ بعدی نمی‌شود مستقیم به چپ پیچید.",
        },
      ],
      takeaway: "این تابلوها راه را نشان می‌دهند، نه اجبار.",
      rule: "DPR 495/1992 art. 135 c.16",
    },
  ],
  practice: [
    {
      sourceId: "3355",
      sign: 238,
      textIt: "Il segnale raffigurato indica che non è possibile svoltare a sinistra in modo diretto",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che non è possibile", fa: "نشان می‌دهد که ممکن نیست", verb: "indica ← indicare", focus: "negation" },
        { it: "svoltare a sinistra in modo diretto", fa: "مستقیماً به چپ پیچید" },
      ],
      translation: "تابلوی تصویر نشان می‌دهد که نمی‌شود مستقیماً به چپ پیچید.",
      why: "درست است (قدم ۱). برای همین مسیرِ دور زدن را نشان می‌دهد.",
      rule: "DPR 495/1992 art. 135 c.16",
      conceptStep: 1,
    },
    {
      sourceId: "3373",
      sign: 239,
      textIt: "Il segnale raffigurato obbliga ad invertire il senso di marcia",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "obbliga", fa: "مجبور می‌کند", verb: "obbliga ← obbligare", focus: "always" },
        { it: "ad invertire il senso di marcia", fa: "جهتِ حرکت را برگردانی" },
      ],
      translation: "تابلوی تصویر مجبور می‌کند جهتِ حرکت را برگردانی.",
      why: "غلط است (قدم ۲). فقط خبر می‌دهد که اینجا امکانِ برگشتن هست.",
      rule: "DPR 495/1992 art. 135 c.16",
      conceptStep: 2,
    },
    {
      sourceId: "3377",
      sign: 240,
      textIt: "Il segnale raffigurato può essere abbinato ad un pannello che indica la distanza che c'è tra il segnale e la piazzola",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "può essere abbinato ad un pannello", fa: "ممکن است با یک پنل همراه شود", verb: "può ← potere", focus: "limit" },
        { it: "che indica la distanza che c'è tra il segnale e la piazzola", fa: "که فاصله‌ی بینِ تابلو و توقفگاه را نشان می‌دهد" },
      ],
      translation: "تابلوی تصویر ممکن است با پنلی همراه شود که فاصله‌ی بینِ تابلو و توقفگاه را نشان می‌دهد.",
      why: "درست است (قدم ۳). پنلِ فاصله توقفگاه را از قبل خبر می‌دهد.",
      rule: "DPR 495/1992 art. 135 c.17",
      conceptStep: 3,
    },
    {
      sourceId: "3381",
      sign: 240,
      textIt: "Il segnale raffigurato indica la fermata di un autobus",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica", fa: "نشان می‌دهد", verb: "indica ← indicare" },
        { it: "la fermata di un autobus", fa: "ایستگاهِ اتوبوس را", focus: "contrast" },
      ],
      translation: "تابلوی تصویر ایستگاهِ اتوبوس را نشان می‌دهد.",
      why: "غلط است (قدم ۳). توقفگاهِ کنارِ جاده برای همه است. ایستگاهِ اتوبوسِ برون‌شهری تابلوی خودش را دارد (درس ۱۵).",
      rule: "DPR 495/1992 art. 135 c.17",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["3354", "3355", "3356", "3357", "3358", "3359", "3360", "3361", "3362", "3363"] },
    { step: 2, sourceIds: ["3364", "3365", "3366", "3367", "3369", "3370", "3371", "3372", "3373"] },
    { step: 3, sourceIds: ["3374", "3375", "3377", "3378", "3379", "3380", "3381", "3382"] },
  ],
};

// ── Lesson 13 ─────────────────────────────────────────────────────────────────

export const lessonDeviazioni: Lesson = {
  id: "deviazioni-consigliate-obbligatorie",
  titleFa: "انحرافِ پیشنهادی یا اجباری؟ سفید یا زرد",
  titleIt: "DEVIAZIONE CONSIGLIATA · DIREZIONE OBBLIGATORIA · DEVIAZIONE TEMPORANEA",
  minutes: 5,
  signs: [250, 284, 282],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس فرقِ سه تابلوی انحراف را می‌دانی: تابلوی سفید که مسیری را به کامیون‌های بزرگ «پیشنهاد» می‌کند؛ تابلوی زردِ کارگاه با دایره‌ی آبی که جهتی را به همان کامیون‌ها «اجبار» می‌کند؛ و پیش‌آگهیِ زردِ انحرافِ موقت که طولِ انحراف را می‌گوید.",
      why: "۲۹ سؤال. هر سه تابلو کامیون یا فلش دارند و بانک «پیشنهاد» و «اجبار»، «فاصله» و «طول» را جابه‌جا می‌کند.",
    },
    {
      kind: "table",
      title: "مسیرِ پیشنهادیِ کامیون‌ها",
      body: "تابلوی سفید با فلش و تصویرِ تریلی و کامیونِ یدک‌دار. نه دایره دارد نه زمینه‌ی زرد: پیشنهاد است.",
      columns: ["قاعده"],
      rows: [
        { label: "یعنی", it: "deviazione consigliata autocarri in transito", sign: 250, values: ["به تریلی‌ها و کامیون‌های یدک‌داری که از اینجا عبور می‌کنند پیشنهاد می‌کند به راست بپیچند، معمولاً تا از داخلِ شهر نگذرند."] },
        { label: "اجبار نیست", it: "non è un segnale di obbligo", values: ["نه اجبار به پیچیدن، نه «فوراً بپیچ»، نه منعِ پیچیدن به راست. اجبار با دایره‌ی آبی است."] },
        { label: "چه نیست", it: "non porta al centro", values: ["مسیرِ مرکزِ شهر یا جابه‌جا شدن به خطِ راست برای دورِ مانع نیست؛ سبقت از راست هم نیست."] },
      ],
      takeaway: "سفید + کامیون + فلش = پیشنهاد به کامیون‌ها. اجبار نیست.",
      rule: "DPR 495/1992 art. 135 c.26",
    },
    {
      kind: "table",
      title: "تابلوهای زردِ کارگاه",
      body: "زمینه‌ی زرد = موقت، به‌خاطرِ کارگاهِ جاده (درس ۱). فقط تا پایانِ کار نصب است.",
      columns: ["یعنی"],
      rows: [
        { label: "جهتِ اجباری برای کامیون‌ها", it: "direzione obbligatoria autotreni", sign: 284, values: ["دایره‌ی آبی با فلش (اجبار) و تصویرِ تریلی و یدک‌دار: نزدیکِ کارگاه، این کامیون‌ها باید مستقیم بروند. فقط آن‌ها، نه همه‌ی وسایلِ نقلیه. پیشنهاد نیست."] },
        { label: "پیش‌آگهیِ انحرافِ موقت", it: "preavviso di deviazione temporanea", sign: 282, values: ["جاده جلوتر به‌خاطرِ کار بسته است و مسیر از کنار دور می‌زند؛ نوارا همچنان در دسترس است. لازم نیست برگردی."] },
        { label: "۲ km با دو فلش", it: "lunghezza della deviazione", values: ["پنلِ پایین با فلش در دو طرف = طولِ انحراف (همان قاعده‌ی فصل ۲: فلش دارد؟ طول). نه فاصله تا انحراف، نه طولِ کارگاه."] },
      ],
      takeaway: "زرد = موقت. دایره‌ی آبی روی زرد = اجبار برای همان وسیله‌ای که نشان می‌دهد.",
      rule: "DPR 495/1992 art. 78 c.2; art. 122",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la deviazione", fa: "انحراف؛ مسیرِ جایگزین" },
        { it: "consiglia · consigliata", base: "consigliare", fa: "پیشنهاد می‌کند · پیشنهادی" },
        { it: "obbligatoria", fa: "اجباری" },
        { it: "gli autotreni e gli autoarticolati", fa: "کامیون‌های یدک‌دار و تریلی‌ها" },
        { it: "temporaneo", fa: "موقت" },
        { it: "il cantiere · i lavori in corso", fa: "کارگاهِ جاده · کارِ در حالِ انجام" },
      ],
    },
    {
      kind: "trap",
      title: "کدام پیشنهادی است؟",
      body: "دو جمله با همان واژه‌ی «consigliata»، درباره‌ی دو تابلوی متفاوت:",
      examples: [
        {
          sourceId: "3431",
          sign: 250,
          textIt: "Il segnale raffigurato preavvisa una deviazione consigliata per gli autotreni ed autoarticolati in transito",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "preavvisa una deviazione consigliata", fa: "یک انحرافِ پیشنهادی را از قبل خبر می‌دهد", verb: "preavvisa ← preavvisare" },
            { it: "per gli autotreni ed autoarticolati in transito", fa: "برای کامیون‌های یدک‌دار و تریلی‌هایی که در حالِ عبورند" },
          ],
          translation: "تابلوی تصویر یک انحرافِ پیشنهادی برای کامیون‌های یدک‌دار و تریلی‌هایی که در حالِ عبورند از قبل خبر می‌دهد.",
          why: "درست است. تابلوی سفید بدونِ دایره: پیشنهاد.",
        },
        {
          sourceId: "3505",
          sign: 284,
          textIt: "Il segnale raffigurato preavvisa una direzione consigliata",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "preavvisa", fa: "از قبل خبر می‌دهد", verb: "preavvisa ← preavvisare" },
            { it: "una direzione consigliata", fa: "یک جهتِ پیشنهادی را", focus: "contrast" },
          ],
          translation: "تابلوی تصویر یک جهتِ پیشنهادی را از قبل خبر می‌دهد.",
          why: "غلط است. دایره‌ی آبی اجبار است: جهتِ اجباری برای این کامیون‌ها.",
        },
      ],
      takeaway: "دایره‌ی آبی را پیدا کن. هست؟ اجبار. نیست؟ پیشنهاد.",
      rule: "DPR 495/1992 art. 135 c.26; art. 122",
    },
  ],
  practice: [
    {
      sourceId: "3439",
      sign: 250,
      textIt: "Il segnale raffigurato indica che i veicoli rappresentati nel pannello devono immediatamente svoltare a destra",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che i veicoli rappresentati nel pannello", fa: "نشان می‌دهد که وسایلی که در پنل کشیده شده‌اند", verb: "indica ← indicare" },
        { it: "devono immediatamente svoltare a destra", fa: "باید فوراً به راست بپیچند", verb: "devono ← dovere", focus: "always" },
      ],
      translation: "تابلوی تصویر نشان می‌دهد که وسایلِ کشیده‌شده در پنل باید فوراً به راست بپیچند.",
      why: "غلط است (قدم ۱). پیشنهاد است، نه اجبار، و نه «فوراً».",
      rule: "DPR 495/1992 art. 135 c.26",
      conceptStep: 1,
    },
    {
      sourceId: "3434",
      sign: 250,
      textIt: "Il segnale raffigurato consiglia agli autotreni e agli autoarticolati la direzione per non attraversare il centro abitato",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "consiglia agli autotreni e agli autoarticolati la direzione", fa: "به کامیون‌های یدک‌دار و تریلی‌ها جهتی را پیشنهاد می‌کند", verb: "consiglia ← consigliare" },
        { it: "per non attraversare il centro abitato", fa: "تا از داخلِ شهر نگذرند", focus: "reason" },
      ],
      translation: "تابلوی تصویر به کامیون‌های یدک‌دار و تریلی‌ها جهتی را پیشنهاد می‌کند تا از داخلِ شهر نگذرند.",
      why: "درست است (قدم ۱). کارِ همین تابلو دور کردنِ کامیون‌های عبوری از شهر است.",
      rule: "DPR 495/1992 art. 135 c.26",
      conceptStep: 1,
    },
    {
      sourceId: "3504",
      sign: 284,
      textIt: "Il segnale raffigurato obbliga tutti i veicoli a proseguire diritto",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "obbliga tutti i veicoli", fa: "همه‌ی وسایلِ نقلیه را مجبور می‌کند", verb: "obbliga ← obbligare", focus: "always" },
        { it: "a proseguire diritto", fa: "مستقیم بروند" },
      ],
      translation: "تابلوی تصویر همه‌ی وسایلِ نقلیه را مجبور می‌کند مستقیم بروند.",
      why: "غلط است (قدم ۲). اجبار فقط برای تریلی‌ها و کامیون‌های یدک‌داری است که زیرِ دایره کشیده شده‌اند.",
      rule: "DPR 495/1992 art. 122",
      conceptStep: 2,
    },
    {
      sourceId: "3034",
      sign: 282,
      textIt: "Il segnale raffigurato indica che la deviazione si trova a 2 chilometri di distanza dal segnale",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che la deviazione si trova", fa: "نشان می‌دهد که انحراف قرار دارد", verb: "si trova ← trovarsi" },
        { it: "a 2 chilometri di distanza dal segnale", fa: "در فاصله‌ی ۲ کیلومتری از تابلو", focus: "contrast" },
      ],
      translation: "تابلوی تصویر نشان می‌دهد که انحراف در فاصله‌ی ۲ کیلومتری از تابلو است.",
      why: "غلط است (قدم ۲). ۲ کیلومتر با دو فلش طولِ انحراف است، نه فاصله تا آن.",
      rule: "DPR 495/1992 art. 78 c.2",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["3430", "3431", "3432", "3433", "3434", "3435", "3436", "3437", "3438", "3439", "3440"] },
    {
      step: 2,
      sourceIds: [
        "3500", "3501", "3502", "3503", "3504", "3505", "3506",
        "3025", "3026", "3027", "3028", "3029", "3030", "3031", "3032", "3033", "3034", "3035",
      ],
    },
  ],
};
