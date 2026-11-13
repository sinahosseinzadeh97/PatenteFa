/**
 * src/content/ch9-ripasso.ts
 * Chapter 9 (Segnali complementari, segnali temporanei e di cantiere): the
 * chapter review. Twelve real bank questions, two per lesson in lesson order,
 * none shown inside a lesson; a mistake routes back to the lesson section that
 * teaches it (tests/chapter9.test.ts).
 */
import type { Lesson } from "./lessons.js";

const SIGN = "Il segnale raffigurato";
const SIGN_FA = "تابلوی تصویر";
const ONE = "Il delineatore raffigurato";
const ONE_FA = "مسیرنمای تصویر";

export const reviewComplementari: Lesson = {
  id: "ripasso-capitolo-9",
  titleFa: "مرور فصل ۹",
  titleIt: "RIPASSO · SEGNALI COMPLEMENTARI E DI CANTIERE",
  minutes: 7,
  signs: [275, 297, 276, 279, 285, 280, 251, 283, 289, 299, 295, 294],
  review: true,
  steps: [
    {
      kind: "intro",
      title: "مرور فصل",
      objective:
        "دوازده سؤالِ واقعی از بانک، دو تا از هر درس. هیچ‌کدام را در درس‌ها ندیده‌ای، پس این مرور نشان می‌دهد چه چیزی واقعاً در ذهنت مانده است.",
      why: "تقریباً هر سؤالِ این فصل یکی از سه چیز را می‌پرسد: «زرد است؟ پس موقت و مالِ کارگاه»، «خبر است یا دستور؟ (دایره هست یا نه)» و «کجا ایستاده و به کدام طرف اشاره می‌کند؟». سؤالی که اینجا اشتباه کنی به فهرستِ مرورت اضافه می‌شود و به بخشِ درسِ مربوطش وصل است.",
    },
    {
      kind: "table",
      title: "فصل ۹ در شش خط",
      body: "قبل از سؤال‌ها، نکته‌ی اصلیِ هر درس را یک بار دیگر ببین. اگر جایی برایت تازه بود، اول همان درس را دوباره باز کن.",
      columns: ["نکته‌ی اصلی"],
      rows: [
        { label: "درس ۱", it: "LAVORI · semaforo di cantiere", values: ["زرد = موقت. LAVORI خبر می‌دهد، حق تقدم نمی‌دهد. مثلثِ چراغ = چراغِ موقتِ کارگاه با زردِ چشمک‌زن"] },
        { label: "درس ۲", it: "barriera · cono · veicolo operativo", values: ["راه‌بند مرزِ کارگاه، شب با قرمزِ ثابت. مخروط برای کارِ کوتاه و حادثه. فلشِ پشتِ ماشین = سمتِ سبقت"] },
        { label: "درس ۳", it: "corsie in cantiere", values: ["قرمز = خطِ بسته؛ فلش‌ها را بشمار. وسیله‌ی زیرِ فلش = خطِ مجاز برایش"] },
        { label: "درس ۴", it: "deviazioni per mezzi pesanti", values: ["بی‌دایره = پیشنهاد. دایره‌ی قرمزِ «t» روی یک شاخه = ممنوعیت فقط برای همان وزن. هر دو نزدیکِ تقاطعِ قبل از کارگاه"] },
        { label: "درس ۵", it: "delineatori · ostacolo", values: ["علامتِ تکمیلی. زرد = یک‌طرفه، قرمز و سفید = دوطرفه؛ در لبه‌ها. مسیرنمای مانع داخلِ سواره‌رو و شبرنگ"] },
        { label: "درس ۶", it: "curve · tornante · incrocio a T", values: ["نوکِ سفید = جهتِ پیچ. «1°» شماره است، نه فاصله. نوک به دو طرف = تقاطعِ T"] },
      ],
      takeaway: "در هر جمله بپرس: زرد است؟ دایره دارد؟ کجا ایستاده و به کدام طرف اشاره می‌کند؟",
    },
  ],
  practice: [
    {
      sourceId: "3533",
      sign: 275,
      textIt: "Il segnale raffigurato preavvisa l'obbligo di dare la precedenza ai veicoli che provengono in senso opposto",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "preavvisa l'obbligo di dare la precedenza", fa: "از قبل از اجبارِ حق تقدم دادن خبر می‌دهد", verb: "preavvisa ← preavvisare", focus: "contrast" },
        { it: "ai veicoli che provengono in senso opposto", fa: "به وسایلی که از روبه‌رو می‌آیند" },
      ],
      translation: "تابلوی تصویر از قبل از اجبارِ حق تقدم دادن به وسایلی که از روبه‌رو می‌آیند خبر می‌دهد.",
      why: "غلط است (درس ۱). LAVORI فقط کار را خبر می‌دهد. راه دادن به روبه‌رو تابلوی باریکه‌ی خودش را دارد.",
      rule: "DPR 495/1992 art. 31",
      conceptStep: 1,
    },
    {
      sourceId: "3674",
      sign: 297,
      textIt: "Nel segnale raffigurato il disco al centro è a luce gialla lampeggiante",
      answer: 1,
      chunks: [
        { it: "Nel segnale raffigurato", fa: "در تابلوی تصویر" },
        { it: "il disco al centro", fa: "دایره‌ی وسط" },
        { it: "è a luce gialla lampeggiante", fa: "چراغِ زردِ چشمک‌زن است" },
      ],
      translation: "در تابلوی تصویر، دایره‌ی وسط چراغِ زردِ چشمک‌زن است.",
      why: "درست است (درس ۱). به‌جای دایره‌ی زردِ نقاشی‌شده، چراغِ زردِ چشمک‌زن گذاشته می‌شود.",
      rule: "DPR 495/1992 art. 42",
      conceptStep: 2,
    },
    {
      sourceId: "3543",
      sign: 276,
      textIt: "La barriera raffigurata segnala un parcheggio riservato ai veicoli per lavori stradali",
      answer: 0,
      chunks: [
        { it: "La barriera raffigurata", fa: "راه‌بندِ تصویر" },
        { it: "segnala un parcheggio riservato", fa: "یک پارکینگِ رزروشده را نشان می‌دهد", verb: "segnala ← segnalare", focus: "contrast" },
        { it: "ai veicoli per lavori stradali", fa: "برای ماشین‌های کارِ جاده" },
      ],
      translation: "راه‌بندِ تصویر یک پارکینگِ رزروشده برای ماشین‌های کارِ جاده را نشان می‌دهد.",
      why: "غلط است (درس ۲). راه‌بند محدوده‌ی خودِ کار را می‌بندد، نه جای پارک.",
      rule: "DPR 495/1992 art. 32",
      conceptStep: 1,
    },
    {
      sourceId: "3558",
      sign: 279,
      textIt: "Il segnale raffigurato può essere posto sui veicoli per la manutenzione stradale in sosta sulla carreggiata",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "può essere posto sui veicoli per la manutenzione stradale", fa: "ممکن است روی ماشین‌های نگه‌داریِ جاده نصب شود", verb: "può ← potere" },
        { it: "in sosta sulla carreggiata", fa: "که روی سواره‌رو ایستاده‌اند", focus: "condition" },
      ],
      translation: "تابلوی تصویر ممکن است روی ماشین‌های نگه‌داریِ جاده که روی سواره‌رو ایستاده‌اند نصب شود.",
      why: "درست است (درس ۲). ایستاده یا آهسته، فرقی نمی‌کند: پنل می‌گوید از کدام طرف رد شوی.",
      rule: "DPR 495/1992 art. 38",
      conceptStep: 3,
    },
    {
      sourceId: "3589",
      sign: 285,
      textIt: "Il segnale raffigurato si trova in vicinanza di un incrocio",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "si trova", fa: "قرار دارد", verb: "si trova ← trovarsi" },
        { it: "in vicinanza di un incrocio", fa: "نزدیکِ یک تقاطع", focus: "contrast" },
      ],
      translation: "تابلوی تصویر نزدیکِ یک تقاطع قرار دارد.",
      why: "غلط است (درس ۳). خطِ بسته به‌خاطرِ کارگاه است؛ این تابلو کنارِ کارگاه است، نه تقاطع. (تابلوهای کامیونِ درس ۴ برعکس، نزدیکِ تقاطع‌اند.)",
      rule: "DPR 495/1992 art. 43",
      conceptStep: 1,
    },
    {
      sourceId: "3566",
      sign: 280,
      textIt: "Il segnale raffigurato può essere installato su un veicolo per preavvisare un cantiere stradale",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "può essere installato su un veicolo", fa: "می‌تواند روی یک وسیله‌ی نقلیه نصب شود", verb: "può ← potere" },
        { it: "per preavvisare un cantiere stradale", fa: "تا از قبل از یک کارگاهِ جاده خبر دهد", focus: "reason" },
      ],
      translation: "تابلوی تصویر می‌تواند روی یک وسیله‌ی نقلیه نصب شود تا از قبل از یک کارگاهِ جاده خبر دهد.",
      why: "درست است (درس ۳). کارگاهِ متحرک جلو می‌رود؛ پیش‌آگهی‌اش هم روی ماشینی همراهش می‌آید.",
      rule: "DPR 495/1992 art. 39",
      conceptStep: 3,
    },
    {
      sourceId: "3521",
      sign: 251,
      textIt: "Il segnale raffigurato si trova in vicinanza di un incrocio che precede un cantiere stradale",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "si trova in vicinanza di un incrocio", fa: "نزدیکِ یک تقاطع قرار دارد", verb: "si trova ← trovarsi" },
        { it: "che precede un cantiere stradale", fa: "که قبل از یک کارگاهِ جاده است", focus: "condition" },
      ],
      translation: "تابلوی تصویر نزدیکِ تقاطعی قرار دارد که قبل از یک کارگاهِ جاده است.",
      why: "درست است (درس ۴). کامیون باید قبل از رسیدن به کارگاه راهش را عوض کند، پس تابلو سرِ تقاطعِ قبلی است.",
      rule: "DPR 495/1992 art. 43",
      conceptStep: 1,
    },
    {
      sourceId: "3579",
      sign: 283,
      textIt: "Il segnale raffigurato obbliga tutti i veicoli a svoltare a destra al bivio seguente",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "obbliga tutti i veicoli", fa: "همه‌ی وسایل را مجبور می‌کند", verb: "obbliga ← obbligare", focus: "always" },
        { it: "a svoltare a destra al bivio seguente", fa: "در دوراهیِ بعدی به راست بپیچند" },
      ],
      translation: "تابلوی تصویر همه‌ی وسایل را مجبور می‌کند در دوراهیِ بعدی به راست بپیچند.",
      why: "غلط است (درس ۴). فقط وسایلِ با وزنِ واقعیِ بیش از ۷ تن باید منحرف شوند.",
      rule: "DPR 495/1992 art. 43",
      conceptStep: 2,
    },
    {
      sourceId: "3603",
      sign: 289,
      textIt: "I delineatori raffigurati sono dei segnali complementari",
      answer: 1,
      chunks: [
        { it: "I delineatori raffigurati", fa: "مسیرنماهای تصویر" },
        { it: "sono dei segnali complementari", fa: "علامت‌های تکمیلی‌اند" },
      ],
      translation: "مسیرنماهای تصویر علامت‌های تکمیلی‌اند.",
      why: "درست است (درس ۵). مسیرنماها دستور نمی‌دهند؛ شکلِ جاده را نمایان می‌کنند.",
      rule: "DPR 495/1992 art. 173",
      conceptStep: 1,
    },
    {
      sourceId: "3687",
      sign: 299,
      textIt: "Il delineatore raffigurato si trova fuori della carreggiata",
      answer: 0,
      chunks: [
        { it: ONE, fa: ONE_FA },
        { it: "si trova", fa: "قرار دارد", verb: "si trova ← trovarsi" },
        { it: "fuori della carreggiata", fa: "بیرون از سواره‌رو", focus: "contrast" },
      ],
      translation: "مسیرنمای تصویر بیرون از سواره‌رو قرار دارد.",
      why: "غلط است (درس ۵). مسیرنمای مانع داخلِ سواره‌رو است، جلوی خودِ مانع.",
      rule: "DPR 495/1992 art. 177",
      conceptStep: 3,
    },
    {
      sourceId: "3666",
      sign: 295,
      textIt: "Il delineatore raffigurato indica una curva pericolosa a sinistra",
      answer: 0,
      chunks: [
        { it: ONE, fa: ONE_FA },
        { it: "indica una curva pericolosa", fa: "یک پیچِ خطرناک را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "a sinistra", fa: "به چپ", focus: "contrast" },
      ],
      translation: "مسیرنمای تصویر یک پیچِ خطرناک به چپ را نشان می‌دهد.",
      why: "غلط است (درس ۶). نوکِ این مربع به راست است: پیچ به راست.",
      rule: "DPR 495/1992 art. 174",
      conceptStep: 1,
    },
    {
      sourceId: "3654",
      sign: 294,
      textIt: "Il delineatore raffigurato è installato ad un incrocio a forma di \"T\"",
      answer: 1,
      chunks: [
        { it: ONE, fa: ONE_FA },
        { it: "è installato", fa: "نصب شده", verb: "è installato ← installare" },
        { it: "ad un incrocio a forma di \"T\"", fa: "در تقاطعی به شکلِ «T»" },
      ],
      translation: "مسیرنمای تصویر در تقاطعی به شکلِ «T» نصب شده است.",
      why: "درست است (درس ۶). نوک‌ها به دو طرف: انتهای جاده، راست یا چپ.",
      rule: "DPR 495/1992 art. 174",
      conceptStep: 3,
    },
  ],
  related: [],
};
