/**
 * src/content/ch10-altri-pericoli.ts
 * Chapter 10 (Pannelli integrativi), lesson 7: picture panels (modello II.6)
 * that the bank pairs with ALTRI PERICOLI or with worksites: snowploughs at
 * work (20 m, CdS art. 149 c.3), work machines, road markings being redone,
 * shunting tracks.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter10.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const PANEL = "Il pannello integrativo raffigurato";
const PANEL_FA = "پنلِ تکمیلیِ تصویر";

export const lessonAltriPericoli: Lesson = {
  id: "pannelli-altri-pericoli",
  titleFa: "زیرِ «خطرهای دیگر»: برف‌روب، ماشین‌آلات، خط‌کشی، ریلِ مانور",
  titleIt: "SGOMBRANEVE · MEZZI DI LAVORO · SEGNI ORIZZONTALI IN RIFACIMENTO · BINARI DI MANOVRA",
  minutes: 5,
  signs: [39, 134, 137, 131, 133],
  figures: [919],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی تابلوی «!» (ALTRI PERICOLI) همیشه پنلی دارد که می‌گوید چه خطری است، و چهار پنلِ آن را می‌شناسی: برف‌روبِ در حالِ کار (دست‌کم ۲۰ متر فاصله)، ماشین‌آلاتِ کارگاه، خط‌کشیِ در حالِ تجدید، و ریلِ مانورِ قطار.",
      why: "۴۱ سؤال. بانک عددِ ۲۰ متر را ۱۰۰ متر می‌کند، برف‌روب را با زنجیرچرخ و ماشینِ زباله عوض می‌کند، و دو لوکوموتیو را «گذرگاهِ راه‌آهن با دو ریل» یا «تراموا» می‌خواند.",
    },
    {
      kind: "table",
      title: "برف‌روبِ در حالِ کار",
      body: "پنلِ سفید با یک دانه‌ی برف و ماشینِ برف‌روب، زیرِ تابلوی ALTRI PERICOLI، روی جاده‌ی برفی. یعنی ممکن است برف‌روب جلوتر کار کند. قانون می‌گوید با نهایتِ احتیاط برو و دست‌کم ۲۰ متر از برف‌روب یا ماشینِ نمک‌پاش فاصله بگیر.",
      columns: ["قاعده"],
      rows: [
        { label: "تابلوی «!»", it: "ALTRI PERICOLI", sign: 39, values: ["برای خطری که تابلوی خودش را ندارد؛ همیشه با پنلی که خطر را می‌گوید (فصل ۲ درس ۱)."] },
        { label: "پنلِ برف‌روب", it: "macchine sgombraneve in funzione", sign: 134, values: ["برف‌روب ممکن است روی جاده کار کند: سرعت را کم کن، حواست باشد، و فاصله‌ات دست‌کم ۲۰ متر باشد."] },
        { label: "چه نیست", it: "non è", values: ["«۱۰۰ متر فاصله» نیست (۲۰ متر)، ممنوعیتِ برف‌روب، اجبارِ زنجیرچرخ، «فقط بعد از رد شدنِ برف‌روب برو»، ماشینِ زباله یا پارکِ بازی نیست."] },
      ],
      takeaway: "برف‌روب = احتیاط و دست‌کم ۲۰ متر.",
      rule: "DPR 495/1992 art. 83 c.10 (II.6/d); art. 103; CdS art. 149 c.3",
    },
    {
      kind: "table",
      title: "ماشین‌آلاتِ کار",
      body: "پنلِ سفید با بیلِ مکانیکیِ زنجیری و راننده‌اش. ممکن است روی جاده یا خطِ تو بیل مکانیکی و لودر در حالِ کار و حرکت باشند، معمولاً در کارگاهِ جاده.",
      columns: ["قاعده"],
      rows: [
        { label: "پنلِ ماشین‌آلات", it: "pale meccaniche · escavatori", sign: 137, values: ["ماشین‌آلاتِ کار (بیل، لودر) ممکن است در حرکت باشند: احتیاطِ ویژه."] },
        { label: "چه نیست", it: "non è", values: ["وسایلِ نظامی، محلِ تخلیه‌ی زباله، پارکینگِ ماشین‌آلات یا جاده‌ی ویژه‌ی آن‌ها نیست. عبورِ آن‌ها یا وسایلِ زنجیری را هم ممنوع نمی‌کند."] },
      ],
      takeaway: "بیلِ مکانیکی روی پنل = ماشین‌آلاتِ در حالِ کار جلوتر.",
      rule: "DPR 495/1992 art. 83 c.10 (II.6/g)",
    },
    {
      kind: "table",
      title: "خط‌کشی در حالِ تجدید",
      body: "پنلِ خاکستری با یک قلم‌موی رنگ. خط‌کشیِ کفِ جاده موقتاً نیست، چون در حالِ رنگ‌کردنِ دوباره است. زیرِ ALTRI PERICOLI می‌آید.",
      columns: ["قاعده"],
      rows: [
        { label: "پنلِ خط‌کشی", it: "segnaletica orizzontale in rifacimento", sign: 131, values: ["بخشی که خط‌کشیِ افقی موقتاً ندارد، یا دارند آن را دوباره می‌کشند."] },
        { label: "چه نیست", it: "non è", values: ["جاده‌ی بسته یا برفی، گذرگاهِ عابر، شروعِ یک‌طرفه نیست. درباره‌ی «عبور نکردن از خطِ ممتد» هم چیزی نمی‌گوید: خط آن‌جا اصلاً نیست."] },
      ],
      takeaway: "قلم‌مو = خط‌ها فعلاً نیستند. خودت مسیرت را با دقت نگه دار.",
      rule: "DPR 495/1992 art. 83 c.10 (II.6/a)",
    },
    {
      kind: "table",
      title: "ریلِ مانور",
      body: "پنلِ سفید با دو لوکوموتیوِ بخاری. ریل‌های مانور یا ریل‌های اتصال، معمولاً نزدیکِ ایستگاه‌های بار، از عرضِ جاده رد می‌شوند. همراهِ ALTRI PERICOLI می‌آید و می‌گوید سرعت را کم کن.",
      columns: ["قاعده"],
      rows: [
        { label: "پنلِ ریلِ مانور", it: "binari di manovra o di raccordo", sign: 133, values: ["ریل‌های مانور یا اتصال نزدیکِ ایستگاهِ بار؛ ممکن است واگن یا لوکوموتیو از عرضِ جاده رد شود."] },
        { label: "با ALTRI PERICOLI", it: "invita a diminuire la velocità", sign: 919, values: ["عبور از ریل‌های مانور: سرعت را کم کن."] },
        { label: "چه نیست", it: "non è", values: ["گذرگاهِ راه‌آهن با دو ریل نیست (دو لوکوموتیو تعدادِ ریل را نمی‌شمارد)، تراموا نیست، برای رانندگانِ قطار نیست، زمینِ ماکت‌سازی هم نیست."] },
      ],
      takeaway: "دو لوکوموتیو = ریلِ مانور، نه گذرگاهِ معمولی.",
      rule: "DPR 495/1992 art. 83 c.10 (II.6/c); art. 103",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "ALTRI PERICOLI", fa: "خطرهای دیگر (تابلوی «!»)" },
        { it: "lo sgombraneve in funzione", fa: "برف‌روبِ در حالِ کار" },
        { it: "almeno 20 metri", fa: "دست‌کم ۲۰ متر" },
        { it: "la pala meccanica", fa: "لودر، بیلِ مکانیکی" },
        { it: "l'escavatore", fa: "بیلِ حفاری" },
        { it: "il rifacimento della segnaletica", fa: "تجدیدِ خط‌کشی" },
        { it: "i binari di manovra o di raccordo", fa: "ریل‌های مانور یا اتصال" },
        { it: "lo scalo merci", fa: "ایستگاهِ بار" },
      ],
    },
    {
      kind: "trap",
      title: "دو لوکوموتیو، دو ادعا",
      body: "هر دو جمله درباره‌ی همان پنلِ دو لوکوموتیو است:",
      examples: [
        {
          sourceId: "3807",
          sign: 133,
          textIt: "Il pannello integrativo raffigurato preavvisa la presenza di binari di manovra o di raccordo in prossimità di scali merci",
          answer: 1,
          chunks: [
            { it: PANEL, fa: PANEL_FA },
            { it: "preavvisa la presenza di binari di manovra o di raccordo", fa: "از وجودِ ریل‌های مانور یا اتصال از قبل خبر می‌دهد", verb: "preavvisa ← preavvisare" },
            { it: "in prossimità di scali merci", fa: "نزدیکِ ایستگاه‌های بار" },
          ],
          translation: "پنلِ تکمیلیِ تصویر از وجودِ ریل‌های مانور یا اتصال نزدیکِ ایستگاه‌های بار از قبل خبر می‌دهد.",
          why: "درست است. همین است معنای دو لوکوموتیو.",
        },
        {
          sourceId: "3813",
          sign: 133,
          textIt: "Il pannello integrativo raffigurato indica un passaggio a livello con due binari",
          answer: 0,
          chunks: [
            { it: PANEL, fa: PANEL_FA },
            { it: "indica un passaggio a livello", fa: "یک گذرگاهِ راه‌آهن را نشان می‌دهد", verb: "indica ← indicare", focus: "contrast" },
            { it: "con due binari", fa: "با دو ریل" },
          ],
          translation: "پنلِ تکمیلیِ تصویر یک گذرگاهِ راه‌آهن با دو ریل را نشان می‌دهد.",
          why: "غلط است. دو لوکوموتیو تعدادِ ریل نیست؛ گذرگاهِ راه‌آهن تابلوهای خودش را دارد (فصل ۲).",
        },
      ],
      takeaway: "تصویرِ پنل را شمارش نکن؛ معنایش را بخوان.",
      rule: "DPR 495/1992 art. 83 c.10",
    },
  ],
  practice: [
    {
      sourceId: "3817",
      sign: 134,
      textIt: "Il pannello integrativo raffigurato invita a mantenere una distanza di almeno 20 metri dalle macchine sgombraneve in funzione",
      answer: 1,
      chunks: [
        { it: PANEL, fa: PANEL_FA },
        { it: "invita a mantenere una distanza di almeno 20 metri", fa: "می‌خواهد دست‌کم ۲۰ متر فاصله حفظ کنی", verb: "invita ← invitare", focus: "limit" },
        { it: "dalle macchine sgombraneve in funzione", fa: "از برف‌روب‌های در حالِ کار" },
      ],
      translation: "پنلِ تکمیلیِ تصویر می‌خواهد از برف‌روب‌های در حالِ کار دست‌کم ۲۰ متر فاصله حفظ کنی.",
      why: "درست است (قدم ۱). قانون: دست‌کم ۲۰ متر از برف‌روب یا نمک‌پاشِ در حالِ کار.",
      rule: "CdS art. 149 c.3; DPR 495/1992 art. 83 c.10",
      conceptStep: 1,
    },
    {
      sourceId: "3851",
      sign: 137,
      textIt: "Il pannello integrativo raffigurato indica la presenza di cantieri stradali con escavatori e pale meccaniche in azione",
      answer: 1,
      chunks: [
        { it: PANEL, fa: PANEL_FA },
        { it: "indica la presenza di cantieri stradali", fa: "وجودِ کارگاه‌های جاده را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "con escavatori e pale meccaniche in azione", fa: "با بیل‌ها و لودرهای در حالِ کار" },
      ],
      translation: "پنلِ تکمیلیِ تصویر وجودِ کارگاه‌های جاده با بیل‌ها و لودرهای در حالِ کار را نشان می‌دهد.",
      why: "درست است (قدم ۲). بیلِ مکانیکی روی پنل = ماشین‌آلاتِ در حالِ کار.",
      rule: "DPR 495/1992 art. 83 c.10",
      conceptStep: 2,
    },
    {
      sourceId: "3856",
      sign: 137,
      textIt: "Il pannello integrativo raffigurato indica divieto di transito a tutti i veicoli con i cingoli",
      answer: 0,
      chunks: [
        { it: PANEL, fa: PANEL_FA },
        { it: "indica divieto di transito", fa: "ممنوعیتِ عبور را نشان می‌دهد", verb: "indica ← indicare", focus: "contrast" },
        { it: "a tutti i veicoli con i cingoli", fa: "برای همه‌ی وسایلِ زنجیری", focus: "always" },
      ],
      translation: "پنلِ تکمیلیِ تصویر ممنوعیتِ عبور برای همه‌ی وسایلِ زنجیری را نشان می‌دهد.",
      why: "غلط است (قدم ۲). پنلِ تصویری از خطر خبر می‌دهد؛ چیزی را ممنوع نمی‌کند.",
      rule: "DPR 495/1992 art. 83 c.9–10",
      conceptStep: 2,
    },
    {
      sourceId: "3794",
      sign: 131,
      textIt: "Il pannello integrativo raffigurato indica che non è consentito superare la linea continua",
      answer: 0,
      chunks: [
        { it: PANEL, fa: PANEL_FA },
        { it: "indica che non è consentito", fa: "نشان می‌دهد که مجاز نیست", verb: "è consentito ← consentire", focus: "negation" },
        { it: "superare la linea continua", fa: "از خطِ ممتد عبور کردن" },
      ],
      translation: "پنلِ تکمیلیِ تصویر نشان می‌دهد که عبور از خطِ ممتد مجاز نیست.",
      why: "غلط است (قدم ۳). پنل می‌گوید خط‌کشی فعلاً نیست؛ درباره‌ی خطِ ممتد قاعده‌ای نمی‌گذارد.",
      rule: "DPR 495/1992 art. 83 c.10",
      conceptStep: 3,
    },
    {
      sourceId: "3808",
      sign: 919,
      textIt: "Il segnale raffigurato invita a diminuire la velocità",
      answer: 1,
      chunks: [
        { it: "Il segnale raffigurato", fa: "تابلوی تصویر" },
        { it: "invita a diminuire la velocità", fa: "دعوت می‌کند سرعت را کم کنی", verb: "invita ← invitare" },
      ],
      translation: "تابلوی تصویر دعوت می‌کند سرعت را کم کنی.",
      why: "درست است (قدم ۴). ALTRI PERICOLI + ریلِ مانور = آهسته، قطار ممکن است رد شود.",
      rule: "DPR 495/1992 art. 83 c.10; art. 103",
      conceptStep: 4,
    },
  ],
  related: [
    { step: 1, sourceIds: ["3814", "3815", "3816", "3817", "3818", "3819", "3820", "3821", "3822", "3823", "3824", "3825"] },
    { step: 2, sourceIds: ["3847", "3848", "3849", "3850", "3851", "3852", "3853", "3854", "3855", "3856", "3857"] },
    { step: 3, sourceIds: ["3786", "3787", "3788", "3789", "3790", "3791", "3792", "3793", "3794"] },
    { step: 4, sourceIds: ["3805", "3806", "3807", "3808", "3809", "3810", "3811", "3812", "3813"] },
  ],
};
