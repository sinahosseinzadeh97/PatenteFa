/**
 * src/content/ch10-pericoli.ts
 * Chapter 10 (Pannelli integrativi), lessons 5–6: the picture panels
 * (modello II.6) that explain a danger: ice, rain, flooding (L5); an
 * accident, a queue, lorries slowing on a climb (L6). They inform and ask for
 * care; they never create a ban or a new obligation.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter10.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const PANEL = "Il pannello integrativo raffigurato";
const PANEL_FA = "پنلِ تکمیلیِ تصویر";
const SIGN = "Il segnale raffigurato";
const SIGN_FA = "تابلوی تصویر";

// ── Lesson 5 ──────────────────────────────────────────────────────────────────

export const lessonGhiaccioPioggiaAllagamento: Lesson = {
  id: "pannelli-ghiaccio-pioggia-allagamento",
  titleFa: "یخ، باران، آب‌گرفتگی: پنل‌هایی که خطر را توضیح می‌دهند",
  titleIt: "STRADA GHIACCIATA · STRADA SDRUCCIOLEVOLE PER PIOGGIA · ZONA SOGGETTA AD ALLAGAMENTO",
  minutes: 5,
  signs: [138, 139, 135],
  figures: [916, 904],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی پنل‌های تصویری چه می‌کنند (خطرِ تابلوی بالایی را دقیق‌تر توضیح می‌دهند، دستور نمی‌دهند) و سه پنلِ هوا را می‌شناسی: دانه‌های برف روی آبی = احتمالِ یخ‌زدگی، ابر و باران = لغزنده در باران، موج‌های آبی = آب‌گرفتگی در بارانِ شدید.",
      why: "۳۴ سؤال. بانک این پنل‌ها را با جاهای دیدنی (پیست اسکی، کارواش، استخر، ایستگاه هواشناسی) یا «جایی که زیاد برف یا باران می‌آید» عوض می‌کند.",
    },
    {
      kind: "table",
      title: "یخ",
      body: "پنلِ آبی با دو دانه‌ی برفِ سفید، زیرِ تابلوی STRADA SDRUCCIOLEVOLE (جاده‌ی لغزنده). می‌گوید لغزندگیِ این بخش از یخ است: وقتی هوا سرد است، یا روی جاده‌ی برفی، ممکن است تکه‌های یخ‌زده پیدا کنی.",
      columns: ["قاعده"],
      rows: [
        { label: "پنلِ یخ", it: "tratti ghiacciati", sign: 138, values: ["در دمای پایین ممکن است بخش‌هایی از جاده یخ بزند؛ روی جاده‌ی برفی هم خطرِ یخ هست. احتیاطِ بیشتر."] },
        { label: "با تابلوی لغزنده", it: "sdrucciolevole per ghiaccio", sign: 916, values: ["جاده‌ی لغزنده به‌خاطرِ یخ، در دمای پایین."] },
        { label: "چه نیست", it: "non è", values: ["تله‌کابین، پیستِ اسکی یا راهِ آلپ نیست. «جایی که زیاد برف می‌بارد» هم نیست: خطر یخ است، نه بارش. به چراغِ خطر یا نورِ بالا هم کاری ندارد."] },
      ],
      takeaway: "برف روی آبی = ممکن است یخ زده باشد. سرعت کم، حرکت نرم.",
      rule: "DPR 495/1992 art. 83 c.9–10 (II.6/h)",
    },
    {
      kind: "table",
      title: "باران",
      body: "پنلِ سفید با ابر و خط‌های باران. وقتی باران می‌آید این بخش لغزنده می‌شود، مثلاً چون گِل روی آسفالت می‌آید. سرعت را کم کن؛ فاصله‌ی ایمنی هم در باران بیشتر لازم است (فصل ۱۲، درسِ فاصله‌ی ایمنی).",
      columns: ["قاعده"],
      rows: [
        { label: "پنلِ باران", it: "pericoloso in caso di pioggia", sign: 139, values: ["بخشی که در باران خطرناک و لغزنده می‌شود؛ ممکن است گِل روی جاده باشد. سرعت کم."] },
        { label: "چه نیست", it: "non è", values: ["کارواش، ایستگاهِ هواشناسی، ریزشِ بار از کامیون، گرد و غبار یا سنگِ ریزشی نیست. «جایی که زیاد باران می‌آید» هم نیست: خطر لغزندگی در باران است."] },
      ],
      takeaway: "ابر و باران = وقتی خیس است، لغزنده است.",
      rule: "DPR 495/1992 art. 83 c.9–10 (II.6/i)",
    },
    {
      kind: "table",
      title: "آب‌گرفتگی",
      body: "پنلِ سفید با سه موجِ آبی. این بخش در بارانِ شدید (یا موجِ بلندِ دریا در جاده‌های ساحلی) ممکن است زیرِ آب برود.",
      columns: ["قاعده"],
      rows: [
        { label: "پنلِ آب‌گرفتگی", it: "si può allagare", sign: 135, values: ["جاده در بارانِ شدید یا mareggiata (طوفانِ دریا) ممکن است آب بگیرد."] },
        { label: "با تابلوی خطر", it: "in caso di forte pioggia", sign: 904, values: ["همان پیام زیرِ تابلوی خطر: در رگبار آب جمع می‌شود."] },
        { label: "چه نیست", it: "non è", values: ["استخر، جاده‌ی برفی، شانه‌ی نرم، مه یا سرعت‌گیر نیست. ممنوعیتِ حملِ بارِ آلاینده‌ی آب هم نیست."] },
      ],
      takeaway: "موج‌های آبی = ممکن است آب بگیرد. وارد آبِ ایستاده نشو.",
      rule: "DPR 495/1992 art. 83 c.9–10 (II.6/e)",
    },
    {
      kind: "classify",
      title: "کدام پنل؟",
      body: "برای هر وضعیت بگو کدام پنل را جلوتر انتظار داری. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "ghiaccio", fa: "یخ" },
        { it: "pioggia", fa: "باران" },
        { it: "allagamento", fa: "آب‌گرفتگی" },
      ],
      items: [
        { prompt: "صبحِ زمستان، دمای زیرِ صفر، روی پلی که آفتاب نمی‌گیرد", answer: 0, explain: "سرما = یخ. پنلِ آبی با دانه‌ی برف." },
        { prompt: "جاده‌ای کنارِ مزرعه که در باران گِل روی آسفالتش می‌آید", answer: 1, explain: "لغزنده در باران: پنلِ ابر و باران." },
        { prompt: "جاده‌ی ساحلی که در طوفانِ دریا موج رویش می‌آید", answer: 2, explain: "mareggiata: پنلِ موج‌ها." },
        { prompt: "زیرگذری که در رگبار پر از آب می‌شود", answer: 2, explain: "آب‌گرفتگی در بارانِ شدید." },
        { prompt: "جاده‌ی کوهستانیِ برفی که شب یخ می‌بندد", answer: 0, explain: "روی برف هم خطرِ یخ هست." },
      ],
      takeaway: "یخ = سرما. باران = لغزندگی. موج = آب‌گرفتگی.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "ghiacciato", fa: "یخ‌زده" },
        { it: "in caso di bassa temperatura", fa: "در دمای پایین" },
        { it: "sdrucciolevole", fa: "لغزنده" },
        { it: "il fango", fa: "گِل" },
        { it: "allagarsi", fa: "آب گرفتن، زیرِ آب رفتن" },
        { it: "la mareggiata", fa: "طوفان و موجِ بلندِ دریا" },
        { it: "usare particolare prudenza", base: "usare", fa: "احتیاطِ ویژه کردن" },
      ],
    },
    {
      kind: "trap",
      title: "خطرِ یخ ≠ جایی که برف می‌بارد",
      body: "هر دو جمله درباره‌ی پنلِ آبی با دانه‌های برف است:",
      examples: [
        {
          sourceId: "3861",
          sign: 138,
          textIt: "Il pannello integrativo raffigurato indica, su strade coperte di neve, il pericolo di formazione di ghiaccio",
          answer: 1,
          chunks: [
            { it: PANEL, fa: PANEL_FA },
            { it: "indica, su strade coperte di neve,", fa: "روی جاده‌های پوشیده از برف نشان می‌دهد", verb: "indica ← indicare", focus: "condition" },
            { it: "il pericolo di formazione di ghiaccio", fa: "خطرِ تشکیلِ یخ را" },
          ],
          translation: "پنلِ تکمیلیِ تصویر روی جاده‌های پوشیده از برف خطرِ تشکیلِ یخ را نشان می‌دهد.",
          why: "درست است. پیامِ این پنل خطرِ یخ است.",
        },
        {
          sourceId: "3869",
          sign: 138,
          textIt: "Il pannello integrativo raffigurato indica una zona dove nevica spesso",
          answer: 0,
          chunks: [
            { it: PANEL, fa: PANEL_FA },
            { it: "indica una zona dove nevica spesso", fa: "منطقه‌ای را نشان می‌دهد که زیاد برف می‌بارد", verb: "nevica ← nevicare", focus: "contrast" },
          ],
          translation: "پنلِ تکمیلیِ تصویر منطقه‌ای را نشان می‌دهد که زیاد برف می‌بارد.",
          why: "غلط است. پنل از یخِ روی جاده خبر می‌دهد، نه از آب و هوای منطقه.",
        },
      ],
      takeaway: "این پنل‌ها خطرِ روی آسفالت را می‌گویند، نه آب و هوا یا جاذبه‌ی منطقه.",
      rule: "DPR 495/1992 art. 83 c.10",
    },
  ],
  practice: [
    {
      sourceId: "3866",
      sign: 138,
      textIt: "Il pannello integrativo raffigurato indica la presenza nelle vicinanze di una stazione sciistica",
      answer: 0,
      chunks: [
        { it: PANEL, fa: PANEL_FA },
        { it: "indica la presenza nelle vicinanze", fa: "وجودِ … را در نزدیکی نشان می‌دهد", verb: "indica ← indicare", focus: "contrast" },
        { it: "di una stazione sciistica", fa: "یک پیستِ اسکی" },
      ],
      translation: "پنلِ تکمیلیِ تصویر وجودِ یک پیستِ اسکی را در نزدیکی نشان می‌دهد.",
      why: "غلط است (قدم ۱). دانه‌های برف روی آبی = احتمالِ یخ روی جاده.",
      rule: "DPR 495/1992 art. 83 c.10",
      conceptStep: 1,
    },
    {
      sourceId: "3873",
      sign: 139,
      textIt: "Il pannello integrativo raffigurato indica che in caso di pioggia si può trovare del fango sulla strada",
      answer: 1,
      chunks: [
        { it: PANEL, fa: PANEL_FA },
        { it: "indica che in caso di pioggia", fa: "نشان می‌دهد که هنگامِ باران", verb: "indica ← indicare", focus: "condition" },
        { it: "si può trovare del fango sulla strada", fa: "ممکن است گِل روی جاده باشد", verb: "si può ← potersi" },
      ],
      translation: "پنلِ تکمیلیِ تصویر نشان می‌دهد که هنگامِ باران ممکن است گِل روی جاده باشد.",
      why: "درست است (قدم ۲). گِلِ باران یکی از دلیل‌های لغزندگی است.",
      rule: "DPR 495/1992 art. 83 c.10",
      conceptStep: 2,
    },
    {
      sourceId: "3880",
      sign: 139,
      textIt: "Il pannello raffigurato indica una zona dove piove spesso",
      answer: 0,
      chunks: [
        { it: "Il pannello raffigurato", fa: "پنلِ تصویر" },
        { it: "indica una zona dove piove spesso", fa: "منطقه‌ای را نشان می‌دهد که زیاد باران می‌آید", verb: "piove ← piovere", focus: "contrast" },
      ],
      translation: "پنلِ تصویر منطقه‌ای را نشان می‌دهد که زیاد باران می‌آید.",
      why: "غلط است (قدم ۲). می‌گوید «وقتی باران بیاید، لغزنده است»، نه این‌که آن‌جا زیاد باران می‌آید.",
      rule: "DPR 495/1992 art. 83 c.10",
      conceptStep: 2,
    },
    {
      sourceId: "3829",
      sign: 135,
      textIt: "Il pannello integrativo raffigurato indica il pericolo di allagamento della carreggiata in caso di pioggia o forte mareggiata",
      answer: 1,
      chunks: [
        { it: PANEL, fa: PANEL_FA },
        { it: "indica il pericolo di allagamento della carreggiata", fa: "خطرِ آب‌گرفتگیِ سواره‌رو را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "in caso di pioggia o forte mareggiata", fa: "در باران یا طوفانِ شدیدِ دریا", focus: "condition" },
      ],
      translation: "پنلِ تکمیلیِ تصویر خطرِ آب‌گرفتگیِ سواره‌رو را در باران یا طوفانِ شدیدِ دریا نشان می‌دهد.",
      why: "درست است (قدم ۳). موج‌های آبی = ممکن است آب بگیرد.",
      rule: "DPR 495/1992 art. 83 c.10",
      conceptStep: 3,
    },
    {
      sourceId: "3834",
      sign: 135,
      textIt: "Il pannello integrativo raffigurato indica un tratto di strada dove è possibile trovare nebbia",
      answer: 0,
      chunks: [
        { it: PANEL, fa: PANEL_FA },
        { it: "indica un tratto di strada", fa: "بخشی از جاده را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "dove è possibile trovare nebbia", fa: "که ممکن است در آن مه باشد", focus: "contrast" },
      ],
      translation: "پنلِ تکمیلیِ تصویر بخشی از جاده را نشان می‌دهد که ممکن است در آن مه باشد.",
      why: "غلط است (قدم ۳). موج‌ها آب‌اند، نه مه: جاده ممکن است آب بگیرد.",
      rule: "DPR 495/1992 art. 83 c.10",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["3858", "3859", "3860", "3861", "3862", "3863", "3864", "3865", "3866", "3867", "3868", "3869"] },
    { step: 2, sourceIds: ["3870", "3872", "3873", "3874", "3875", "3876", "3877", "3878", "3879", "3880", "3881"] },
    { step: 3, sourceIds: ["3826", "3827", "3828", "3829", "3830", "3831", "3832", "3833", "3834", "3835"] },
  ],
};

// ── Lesson 6 ──────────────────────────────────────────────────────────────────

export const lessonIncidenteCodeAutocarri: Lesson = {
  id: "pannelli-incidente-code-autocarri",
  titleFa: "جلوتر کند است: تصادف، صف، کامیونِ کند در سربالایی",
  titleIt: "INCIDENTE · CODA · AUTOCARRI IN RALLENTAMENTO",
  minutes: 5,
  signs: [132, 136, 140],
  figures: [968],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس سه پنلی را می‌شناسی که می‌گویند جلوتر ترافیک کند یا ایستاده است: تصادف، صفِ خودروها، و کامیون‌هایی که در سربالاییِ تند آهسته می‌روند. هر سه یک جواب دارند: سرعت را کم کن و مراقبِ خودروهای ایستاده یا کند باش.",
      why: "۳۳ سؤال. بانک این پنل‌ها را به دستورهایی تبدیل می‌کند که در آن‌ها نیست: «بایست و به راست حق تقدم بده»، «با سرعتِ قدم‌زدن برو»، «فاصله‌ی ایمنی را کم کن»، «سبقت از کامیون ممنوع»، «بوق بزن».",
    },
    {
      kind: "table",
      title: "تصادف",
      body: "پنلِ مربعیِ قرمز با دو خودروی سفید که به هم خورده‌اند. هر جای شبکه‌ی راه ممکن است بیاید، نه فقط در آزادراه. یعنی سواره‌رو را خودروهای تصادفی گرفته‌اند.",
      columns: ["قاعده"],
      rows: [
        { label: "پنلِ تصادف", it: "incidente", sign: 132, values: ["جلوتر تصادف شده و خودروهای تصادفی روی سواره‌رو هستند: سرعت را کم کن."] },
        { label: "چه نیست", it: "non è", values: ["جاده‌ی لغزنده، «بایست و به راست حق تقدم بده»، پارک ممنوع، گاراژِ خودروهای تصادفی یا «چراغ روشن کن» نیست. فقط مالِ آزادراه هم نیست."] },
      ],
      takeaway: "قرمز با دو خودرو = تصادفِ جلوتر. آهسته.",
      rule: "DPR 495/1992 art. 83 c.10 (II.6/b)",
    },
    {
      kind: "table",
      title: "صف",
      body: "پنلِ مربعی با ردیف‌های خودرو که چراغِ ترمزشان قرمز است. ممکن است ترافیکِ سنگین یا صفِ ایستاده جلوتر باشد. در ورودیِ آزادراه یا روی خودِ آزادراه دیده می‌شود و حتی ممکن است پیشنهاد کند خارج شوی تا در صف نمانی.",
      columns: ["قاعده"],
      rows: [
        { label: "پنلِ صف", it: "coda", sign: 136, values: ["احتمالِ ترافیکِ سنگین و خودروهای ایستاده در صف؛ مراقب باش به عقبِ آن‌ها نزنی."] },
        { label: "در آزادراه", it: "all'ingresso delle autostrade", values: ["در ورودی: آن تو خودروها آهسته می‌روند. روی آزادراه: ممکن است بگوید از خروجیِ بعد بیرون برو."] },
        { label: "چه نیست", it: "non è", values: ["پارکینگ، خطِ تله‌پس، جاده‌ی یک‌طرفه یا «فقط از چپ سبقت بگیر» نیست. «فاصله‌ی ایمنی را کم کن» و «با سرعتِ قدم‌زدن برو» هم غلط‌اند."] },
      ],
      takeaway: "صفِ خودرو = ممکن است جلوتر ایستاده باشند. فاصله کم نکن، بیشتر کن.",
      rule: "DPR 495/1992 art. 83 c.10 (II.6/f)",
    },
    {
      kind: "table",
      title: "کامیونِ کند در سربالایی",
      body: "پنلِ مربعی: کامیونی در سربالایی و خودرویی پشتِ سرش. در سربالاییِ تند، کامیون‌ها مجبورند آهسته بروند؛ سرعتت را طوری تنظیم کن که به آن‌ها نزنی. معمولاً زیرِ تابلوی SALITA RIPIDA (سربالاییِ تند) است.",
      columns: ["قاعده"],
      rows: [
        { label: "پنلِ کامیون", it: "autocarri in rallentamento", sign: 140, values: ["احتمالِ کامیون‌ها و وسایلِ سنگینِ آهسته؛ سرعتِ محتاطانه."] },
        { label: "با سربالاییِ تند", it: "moderare la velocità", sign: 968, values: ["سربالاییِ ۱۰٪ + پنل: باید سرعت را کم کنی."] },
        { label: "چه نیست", it: "non è", values: ["جاده‌ی بسته به‌خاطرِ تصادف، سبقت ممنوع از کامیون، اسکله‌ی کشتی، «چراغ روشن کن»، «با هر سبقت بوق بزن» یا «یدک کشیده شدن» نیست. فاصله را هم کم نکن."] },
      ],
      takeaway: "کامیون در سربالایی = جلوتر وسیله‌ی کند. از قبل آهسته کن.",
      rule: "DPR 495/1992 art. 83 c.10 (II.6/l)",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'incidente stradale", fa: "تصادفِ جاده‌ای" },
        { it: "i veicoli incidentati", fa: "خودروهای تصادفی" },
        { it: "la colonna di veicoli", fa: "صفِ خودروها" },
        { it: "tamponare", fa: "از پشت به خودرو زدن" },
        { it: "in lento movimento", fa: "در حالِ حرکتِ آهسته" },
        { it: "la salita ripida", fa: "سربالاییِ تند" },
        { it: "moderare la velocità", base: "moderare", fa: "سرعت را کم کردن" },
        { it: "il passo d'uomo", fa: "سرعتِ قدم‌زدن (این پنل‌ها نمی‌گویند)" },
      ],
    },
    {
      kind: "trap",
      title: "احتیاط بله، دستورِ عجیب نه",
      body: "هر دو جمله درباره‌ی پنلِ صف است:",
      examples: [
        {
          sourceId: "3839",
          sign: 136,
          textIt: "Il pannello integrativo raffigurato invita ad usare prudenza, per non tamponare veicoli fermi per intasamento del traffico",
          answer: 1,
          chunks: [
            { it: PANEL, fa: PANEL_FA },
            { it: "invita ad usare prudenza,", fa: "دعوت به احتیاط می‌کند", verb: "invita ← invitare" },
            { it: "per non tamponare veicoli fermi", fa: "تا به خودروهای ایستاده از پشت نزنی", focus: "reason" },
            { it: "per intasamento del traffico", fa: "که به‌خاطرِ راه‌بندان ایستاده‌اند" },
          ],
          translation: "پنلِ تکمیلیِ تصویر دعوت به احتیاط می‌کند تا به خودروهایی که به‌خاطرِ راه‌بندان ایستاده‌اند از پشت نزنی.",
          why: "درست است. پنل از صف خبر می‌دهد و احتیاط می‌خواهد.",
        },
        {
          sourceId: "3846",
          sign: 136,
          textIt: "Il pannello integrativo raffigurato obbliga i veicoli a circolare a passo d'uomo",
          answer: 0,
          chunks: [
            { it: PANEL, fa: PANEL_FA },
            { it: "obbliga i veicoli", fa: "وسایل را مجبور می‌کند", verb: "obbliga ← obbligare", focus: "contrast" },
            { it: "a circolare a passo d'uomo", fa: "با سرعتِ قدم‌زدن حرکت کنند" },
          ],
          translation: "پنلِ تکمیلیِ تصویر وسایل را مجبور می‌کند با سرعتِ قدم‌زدن حرکت کنند.",
          why: "غلط است. پنلِ تصویری خبر می‌دهد؛ سرعتِ مشخصی را اجباری نمی‌کند.",
        },
      ],
      takeaway: "«invita / indica / segnala» معمولاً درست است؛ «obbliga / vieta» در این پنل‌ها دام است.",
      rule: "DPR 495/1992 art. 83 c.9–10",
    },
  ],
  practice: [
    {
      sourceId: "3801",
      sign: 132,
      textIt: "Il pannello integrativo raffigurato si trova solo se l'incidente è avvenuto in autostrada",
      answer: 0,
      chunks: [
        { it: PANEL, fa: PANEL_FA },
        { it: "si trova solo se", fa: "فقط وقتی دیده می‌شود که", verb: "si trova ← trovarsi", focus: "limit" },
        { it: "l'incidente è avvenuto in autostrada", fa: "تصادف در آزادراه رخ داده باشد", verb: "è avvenuto ← avvenire" },
      ],
      translation: "پنلِ تکمیلیِ تصویر فقط وقتی دیده می‌شود که تصادف در آزادراه رخ داده باشد.",
      why: "غلط است (قدم ۱). تصادف هر جا ممکن است؛ پنل فقط مالِ آزادراه نیست.",
      rule: "DPR 495/1992 art. 83 c.10",
      conceptStep: 1,
    },
    {
      sourceId: "3838",
      sign: 136,
      textIt: "Il pannello integrativo raffigurato si può trovare all'ingresso delle autostrade, per indicare che vi sono veicoli in lento movimento",
      answer: 1,
      chunks: [
        { it: PANEL, fa: PANEL_FA },
        { it: "si può trovare all'ingresso delle autostrade,", fa: "ممکن است در ورودیِ آزادراه‌ها باشد", verb: "si può ← potersi" },
        { it: "per indicare che vi sono veicoli in lento movimento", fa: "تا نشان دهد آن‌جا وسایلی آهسته حرکت می‌کنند", focus: "reason" },
      ],
      translation: "پنلِ تکمیلیِ تصویر ممکن است در ورودیِ آزادراه‌ها باشد تا نشان دهد آن‌جا وسایل آهسته حرکت می‌کنند.",
      why: "درست است (قدم ۲). در ورودیِ آزادراه از صف و ترافیکِ کند خبر می‌دهد.",
      rule: "DPR 495/1992 art. 83 c.10",
      conceptStep: 2,
    },
    {
      sourceId: "3845",
      sign: 136,
      textIt: "Il pannello integrativo raffigurato indica di diminuire la distanza di sicurezza",
      answer: 0,
      chunks: [
        { it: PANEL, fa: PANEL_FA },
        { it: "indica di diminuire", fa: "می‌گوید کم کن", focus: "contrast" },
        { it: "la distanza di sicurezza", fa: "فاصله‌ی ایمنی را" },
      ],
      translation: "پنلِ تکمیلیِ تصویر می‌گوید فاصله‌ی ایمنی را کم کن.",
      why: "غلط است (قدم ۲). جلوی صف خودروها ناگهان می‌ایستند؛ فاصله باید بیشتر شود، نه کمتر.",
      rule: "DPR 495/1992 art. 83 c.10; CdS art. 149",
      conceptStep: 2,
    },
    {
      sourceId: "3885",
      sign: 968,
      textIt: "In presenza del segnale raffigurato il conducente deve moderare la velocità per la possibile presenza di autocarri in lento movimento",
      answer: 1,
      chunks: [
        { it: "In presenza del segnale raffigurato", fa: "وقتی این تابلو هست", focus: "condition" },
        { it: "il conducente deve moderare la velocità", fa: "راننده باید سرعت را کم کند", verb: "deve ← dovere" },
        { it: "per la possibile presenza di autocarri in lento movimento", fa: "به‌خاطرِ احتمالِ کامیون‌هایی که آهسته می‌روند", focus: "reason" },
      ],
      translation: "وقتی این تابلو هست، راننده باید به‌خاطرِ احتمالِ کامیون‌هایی که آهسته می‌روند سرعت را کم کند.",
      why: "درست است (قدم ۳). سربالاییِ تند + پنلِ کامیون = جلوتر وسیله‌ی کند.",
      rule: "DPR 495/1992 art. 83 c.10",
      conceptStep: 3,
    },
    {
      sourceId: "3888",
      sign: 140,
      textIt: "Il pannello integrativo raffigurato indica che è vietato sorpassare gli autocarri",
      answer: 0,
      chunks: [
        { it: PANEL, fa: PANEL_FA },
        { it: "indica che è vietato sorpassare", fa: "نشان می‌دهد که سبقت ممنوع است", verb: "è vietato ← vietare", focus: "contrast" },
        { it: "gli autocarri", fa: "از کامیون‌ها" },
      ],
      translation: "پنلِ تکمیلیِ تصویر نشان می‌دهد که سبقت از کامیون‌ها ممنوع است.",
      why: "غلط است (قدم ۳). پنل خبر می‌دهد کامیون‌ها کندند؛ سبقت را ممنوع نمی‌کند.",
      rule: "DPR 495/1992 art. 83 c.10",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["3795", "3796", "3797", "3798", "3799", "3800", "3801", "3802", "3803", "3804"] },
    { step: 2, sourceIds: ["3836", "3837", "3838", "3839", "3840", "3841", "3842", "3843", "3844", "3845", "3846"] },
    { step: 3, sourceIds: ["3882", "3883", "3884", "3885", "3886", "3887", "3888", "3889", "3890", "3891", "3892", "3893"] },
  ],
};
