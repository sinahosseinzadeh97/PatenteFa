/**
 * src/content/ch18-spie.ts
 * Chapter 18 (Luci e dispositivi acustici), lessons 5–6: the dashboard.
 * L5: the tell-tale colour code (UN R121: red = danger, yellow = caution,
 * green = on, blue = main beam), the light-control symbols 695–697 and the
 * hazard warning 698 (CdS art. 153 c.7). L6: the red warning lights that mean
 * a fault: coolant temperature 704, oil pressure 706, battery charging 705,
 * brake system 721, seat belt 707.
 *
 * The same symbol is printed on the switch (comando) and on the tell-tale
 * (spia); the bank uses both words. Trust rules as in src/content/lessons.ts;
 * checked by tests/chapter18.test.ts and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const R121 = "Regolamento UN/ECE n. 121 (simboli e colori delle spie)";
const SIMBOLO = "Il simbolo raffigurato";
const SIMBOLO_FA = "نمادِ نشان‌داده‌شده";
const SPIA_ROSSA = "Una spia di colore rosso contrassegnata dal simbolo di figura, se accesa durante la marcia,";
const SPIA_ROSSA_FA = "چراغِ نشانگرِ قرمز با نمادِ تصویر، اگر هنگامِ حرکت روشن شود،";
const MANUALE = "manuale d'uso del veicolo";

// ── Lesson 5 ──────────────────────────────────────────────────────────────────

export const lessonSpieColori: Lesson = {
  id: "spie-colori-comandi",
  titleFa: "داشبورد: رنگ‌ها و نمادهای چراغ",
  titleIt: "SPIE · COLORI · ABBAGLIANTI · ANABBAGLIANTI · FRECCE · QUATTRO FRECCE",
  minutes: 5,
  signs: [695, 696, 697, 698],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس از رنگِ هر چراغِ نشانگر می‌فهمی چه می‌گوید (قرمز خطر، زرد توجه، سبز روشن است، آبی نورِ بالا)، چهار نمادِ چراغ‌ها را می‌شناسی، و می‌دانی چراغِ خطر (چهار راهنما با هم) کِی روشن می‌شود.",
      why:
        "۳۶ سؤال. نیمی از این‌ها فقط می‌پرسند «این چراغ چه رنگی است؟». بانک رنگ‌ها را جابه‌جا می‌کند (نورِ بالا سبز، راهنما قرمز) و نمادِ نورِ بالا و نورِ پایین را که شبیهِ هم‌اند جای هم می‌گذارد. اگر رنگ را بفهمی، نیازی به حفظ کردنِ تک‌تکشان نیست.",
      rule: R121,
    },
    {
      kind: "table",
      title: "رنگ یعنی پیام",
      body:
        "چراغ‌های کوچکِ پشتِ فرمان (spie) با رنگشان حرف می‌زنند. این رنگ‌ها در قاعده‌ی مشترکِ اروپایی برای همه‌ی خودروها یکی است. بانک فقط یک چیز را زیاد می‌پرسد: کدام قرمز است و کدام نه.",
      columns: ["کدام چراغ‌ها"],
      rows: [
        { label: "قرمز = خطر یا کارِ مهم", it: "rosso", values: ["چراغِ خطر، دمای مایعِ خنک‌کننده، فشارِ روغن، کمربندِ ایمنی، ترمزِ دستی و سیستمِ ترمز، شارژِ باتری."] },
        { label: "زرد = توجه", it: "giallo · ambra", values: ["چراغِ مهِ عقب، گرم‌کن و بخارزدای شیشه‌ی جلو."] },
        { label: "سبز = روشن است، کار می‌کند", it: "verde", values: ["نورِ پایین، چراغ راهنما (چشمک می‌زند)، چراغِ مهِ جلو، چراغ‌های موقعیت."] },
        { label: "آبی", it: "blu", values: ["فقط نورِ بالا."] },
        { label: "چه نیست", it: "non è rosso", values: ["راهنما، نورِ پایین، نورِ بالا، چراغِ مه و گرم‌کنِ شیشه قرمز نیستند."] },
      ],
      takeaway: "قرمز = خطر. زرد = توجه. سبز = روشن است. آبی = نورِ بالا.",
      rule: R121,
    },
    {
      kind: "table",
      title: "سه نمادِ چراغ: نورِ بالا، نورِ پایین، راهنما",
      body:
        "یک نماد هم روی کلید (comando) است و هم روی چراغِ نشانگر (spia) که می‌گوید آن چراغ روشن است. نورِ بالا و نورِ پایین شبیه‌اند: فرق در جهتِ خط‌هاست. خط‌های صاف و افقی = نورِ بالا، رو به جلو. خط‌های کج و رو به پایین = نورِ پایین.",
      columns: ["چیست", "رنگِ نشانگر"],
      rows: [
        { label: "نورِ بالا", it: "proiettori di profondità", sign: 695, values: ["کلیدِ نورِ بالا", "آبی"] },
        { label: "نورِ پایین", it: "proiettori anabbaglianti", sign: 696, values: ["کلیدِ نورِ پایین", "سبز"] },
        { label: "راهنما", it: "indicatori di direzione", sign: 697, values: ["کلیدِ راهنما؛ نشانگرِ راهنمایی که زده‌ای چشمک می‌زند", "سبز"] },
        { label: "چه نیست", it: "non è", values: ["هیچ‌کدام چراغِ مهِ عقب یا چراغ‌های موقعیت نیست؛ و هیچ‌کدام چیزی را «یادآوری» نمی‌کند.", "هیچ‌کدام قرمز نیست."] },
      ],
      takeaway: "خط‌های صاف + آبی = نورِ بالا. خط‌های رو به پایین + سبز = نورِ پایین. دو فلش + سبز = راهنما.",
      rule: R121,
    },
    {
      kind: "table",
      title: "چراغِ خطر: مثلثِ قرمز روی کلید",
      body:
        "کلیدی با مثلثِ قرمز هر چهار راهنما را با هم روشن می‌کند (چراغِ خطر). نشانگرش قرمز است. وسیله‌ی اضطراری است و خودت روشنش می‌کنی.",
      columns: ["قاعده"],
      rows: [
        { label: "نماد", it: "segnalazione luminosa di pericolo", sign: 698, values: ["مثلث روی کلید و روی نشانگرِ قرمز."] },
        { label: "کِی", it: "casi di emergenza", values: ["وقتی خودروی ایستاده‌ات مانعِ سواره‌رو است، وقتی مثلثِ خطر را می‌گذاری یا برمی‌داری، وقتی به‌خاطرِ خرابی خیلی آهسته می‌روی، وقتی ترافیک ناگهان کند می‌شود یا صف درست می‌شود."] },
        { label: "چه نیست", it: "non è", values: ["مثلثِ خطری که روی زمین می‌گذاری نیست (آن segnale mobile di pericolo است). ترمزِ دستی نیست. بعد از تصادف خودش روشن نمی‌شود."] },
      ],
      takeaway: "مثلثِ قرمز = چراغِ خطر: هر چهار راهنما با هم، با دستِ خودت، فقط در اضطرار.",
      rule: `Codice della Strada, art. 153 c.7; ${R121}`,
    },
    {
      kind: "classify",
      title: "چه رنگی؟",
      body: "رنگِ چراغِ نشانگر را انتخاب کن. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "rosso", fa: "قرمز" },
        { it: "giallo", fa: "زرد" },
        { it: "verde", fa: "سبز" },
        { it: "blu", fa: "آبی" },
      ],
      items: [
        { prompt: "این نماد", sign: 695, answer: 3, explain: "نورِ بالا: آبی." },
        { prompt: "این نماد", sign: 696, answer: 2, explain: "نورِ پایین: سبز." },
        { prompt: "این نماد", sign: 697, answer: 2, explain: "راهنما: سبز، چشمک‌زن." },
        { prompt: "این نماد", sign: 698, answer: 0, explain: "چراغِ خطر: قرمز." },
        { prompt: "کمربندِ ایمنی بسته نیست", answer: 0, explain: "کمربند: قرمز." },
        { prompt: "چراغِ مهِ عقب روشن است", answer: 1, explain: "چراغِ مهِ عقب: زرد." },
        { prompt: "ترمزِ دستی کشیده است", answer: 0, explain: "ترمزِ دستی: قرمز." },
      ],
      takeaway: "اول بپرس: خطر است (قرمز)، توجه (زرد)، یا فقط «روشن است» (سبز، آبی)؟",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la spia", fa: "چراغِ نشانگر (پشتِ فرمان)" },
        { it: "il comando di accensione", fa: "کلیدِ روشن کردن" },
        { it: "di colore rosso · verde · blu · giallo", fa: "قرمز · سبز · آبی · زرد" },
        { it: "lampeggiante", fa: "چشمک‌زن" },
        { it: "la segnalazione luminosa di pericolo", fa: "چراغِ خطر (چهار راهنما با هم)" },
        { it: "il segnale mobile di pericolo", fa: "مثلثِ خطر (روی زمین)" },
        { it: "il freno a mano", fa: "ترمزِ دستی" },
        { it: "sbrinare · disappannare", fa: "یخ‌زدایی · بخارزدایی" },
        { it: "contemporanea", fa: "هم‌زمان" },
      ],
    },
    {
      kind: "trap",
      title: "یک جمله، دو تصویر",
      body: "متنِ این دو سؤال یکی است. فقط تصویر فرق دارد، و همان جواب را عوض می‌کند. همیشه اول به تصویر نگاه کن:",
      examples: [
        {
          sourceId: "5877",
          textIt: "Il simbolo raffigurato è posto sul comando di accensione dei proiettori anabbaglianti",
          answer: 1,
          sign: 696,
          chunks: [
            { it: SIMBOLO, fa: SIMBOLO_FA },
            { it: "è posto sul comando di accensione", fa: "روی کلیدِ روشن کردنِ … است", verb: "è posto ← porre" },
            { it: "dei proiettori anabbaglianti", fa: "نورِ پایین" },
          ],
          translation: "نمادِ نشان‌داده‌شده روی کلیدِ روشن کردنِ نورِ پایین است.",
          why: "درست است. خط‌های رو به پایین = نورِ پایین.",
        },
        {
          sourceId: "5874",
          textIt: "Il simbolo raffigurato è posto sul comando di accensione dei proiettori anabbaglianti",
          answer: 0,
          sign: 695,
          chunks: [
            { it: SIMBOLO, fa: SIMBOLO_FA },
            { it: "è posto sul comando di accensione", fa: "روی کلیدِ روشن کردنِ … است", verb: "è posto ← porre" },
            { it: "dei proiettori anabbaglianti", fa: "نورِ پایین", focus: "contrast" },
          ],
          translation: "نمادِ نشان‌داده‌شده روی کلیدِ روشن کردنِ نورِ پایین است.",
          why: "غلط است. این‌جا خط‌ها صاف و افقی‌اند: نمادِ نورِ بالاست.",
        },
      ],
      takeaway: "در سؤال‌های «Il simbolo raffigurato» جواب در تصویر است، نه در جمله.",
      rule: R121,
    },
  ],
  practice: [
    {
      sourceId: "5866",
      textIt: "La spia di accensione degli indicatori di direzione è di colore rosso",
      answer: 0,
      chunks: [
        { it: "La spia di accensione degli indicatori di direzione", fa: "چراغِ نشانگرِ روشن بودنِ راهنما" },
        { it: "è di colore rosso", fa: "قرمز است", verb: "è ← essere", focus: "contrast" },
      ],
      translation: "چراغِ نشانگرِ روشن بودنِ راهنما قرمز است.",
      why: "غلط است (قدم ۱). نشانگرِ راهنما سبز است و چشمک می‌زند؛ قرمز برای خطر است.",
      rule: R121,
      conceptStep: 1,
    },
    {
      sourceId: "5872",
      textIt: "Il simbolo raffigurato è posto su una spia a luce blu",
      answer: 1,
      sign: 695,
      chunks: [
        { it: SIMBOLO, fa: SIMBOLO_FA },
        { it: "è posto su una spia a luce blu", fa: "روی یک چراغِ نشانگرِ آبی است", verb: "è posto ← porre" },
      ],
      translation: "نمادِ نشان‌داده‌شده روی یک چراغِ نشانگرِ آبی است.",
      why: "درست است (قدم ۲). خط‌های صاف و افقی = نورِ بالا، و نشانگرِ نورِ بالا تنها چراغِ آبی است.",
      rule: R121,
      conceptStep: 2,
    },
    {
      sourceId: "5881",
      textIt: "Il simbolo raffigurato è posto sulla spia delle luci abbaglianti accese",
      answer: 0,
      sign: 696,
      chunks: [
        { it: SIMBOLO, fa: SIMBOLO_FA },
        { it: "è posto sulla spia delle luci abbaglianti accese", fa: "روی نشانگرِ روشن بودنِ نورِ بالاست", verb: "è posto ← porre", focus: "contrast" },
      ],
      translation: "نمادِ نشان‌داده‌شده روی نشانگرِ روشن بودنِ نورِ بالاست.",
      why: "غلط است (قدم ۲). خط‌های رو به پایین = نورِ پایین (سبز)، نه نورِ بالا (آبی).",
      rule: R121,
      conceptStep: 2,
    },
    {
      sourceId: "5892",
      textIt: "Il simbolo raffigurato è posto su una spia di colore rosso",
      answer: 1,
      sign: 698,
      chunks: [
        { it: SIMBOLO, fa: SIMBOLO_FA },
        { it: "è posto su una spia di colore rosso", fa: "روی یک چراغِ نشانگرِ قرمز است", verb: "è posto ← porre" },
      ],
      translation: "نمادِ نشان‌داده‌شده روی یک چراغِ نشانگرِ قرمز است.",
      why: "درست است (قدم ۳). مثلث = چراغِ خطر، و نشانگرش قرمز است.",
      rule: R121,
      conceptStep: 3,
    },
    {
      sourceId: "5896",
      textIt: "Il simbolo raffigurato indica un dispositivo che si accende automaticamente ad ogni incidente",
      answer: 0,
      sign: 698,
      chunks: [
        { it: SIMBOLO, fa: SIMBOLO_FA },
        { it: "indica un dispositivo", fa: "وسیله‌ای را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "che si accende automaticamente ad ogni incidente", fa: "که بعد از هر تصادف خودش روشن می‌شود", verb: "si accende ← accendersi", focus: "contrast" },
      ],
      translation: "نمادِ نشان‌داده‌شده وسیله‌ای را نشان می‌دهد که بعد از هر تصادف خودش روشن می‌شود.",
      why: "غلط است (قدم ۳). چراغِ خطر را خودت با کلید روشن می‌کنی.",
      rule: "Codice della Strada, art. 153 c.7",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["5861", "5862", "5863", "5864", "5865", "5866", "5867", "5868", "5869", "5870"] },
    {
      step: 2,
      sourceIds: [
        "5871", "5872", "5873", "5874", "5875", "5876", "5877", "5878", "5879", "5880",
        "5881", "5882", "5883", "5884", "5885", "5886", "5887", "5888", "5889",
      ],
    },
    { step: 3, sourceIds: ["5890", "5891", "5892", "5893", "5894", "5895", "5896"] },
  ],
};

// ── Lesson 6 ──────────────────────────────────────────────────────────────────

export const lessonSpieGuasti: Lesson = {
  id: "spie-rosse-guasti",
  titleFa: "چراغِ قرمز روشن شد: موتور، باتری، ترمز، کمربند",
  titleIt: "SPIE ROSSE · RAFFREDDAMENTO · OLIO · BATTERIA · FRENI · CINTURE",
  minutes: 5,
  signs: [704, 706, 705, 721, 707],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس پنج چراغِ قرمزِ خرابی را می‌شناسی (دمای مایعِ خنک‌کننده، فشارِ روغن، شارژِ باتری، سیستمِ ترمز، کمربند)، می‌دانی هر کدام دقیقاً چه می‌گوید، و می‌دانی کدام یعنی «همین حالا بایست» و کدام «زود تعمیرش کن».",
      why:
        "۴۵ سؤال. بانک هر نماد را با چیزِ نزدیک به آن قاطی می‌کند: دما با سطحِ آب یا دمای روغن، فشارِ روغن با کم یا کهنه بودنِ روغن، «باتری شارژ نمی‌شود» با «باتری خالی است»، ترمز با سرویسِ دوره‌ای. هر چراغ دقیقاً یک چیز را می‌سنجد.",
      rule: R121,
    },
    {
      kind: "table",
      title: "گرما و روغن: موتور در خطر است",
      body:
        "این دو چراغ می‌گویند خودِ موتور در خطرِ خرابیِ جدی است. فشارِ روغن فوری‌ترین است: موتور را همان‌جا که امن است خاموش کن.",
      columns: ["چه می‌گوید", "چه نمی‌گوید"],
      rows: [
        { label: "دمای مایعِ خنک‌کننده", it: "temperatura del liquido di raffreddamento", sign: 704, values: ["قرمز: موتور بیش از حد داغ شده؛ دمای مایعِ خنک‌کننده از حدِ سازنده بالاتر رفته. کنارِ عقربه‌ی دما است.", "سطحِ آبِ رادیاتور نیست، دمای روغنِ موتور یا گیربکس نیست، درِ مخزنِ آبِ شیشه‌شوی نیست."] },
        { label: "فشارِ روغن", it: "pressione dell’olio", sign: 706, values: ["قرمز (نه زرد): فشارِ روغنِ موتور کم است. موتور را فوراً خاموش کن تا خرابِ جدی نشود. خاموش بودنش یعنی فشار درست است.", "دمای پایینِ روغن، مصرفِ زیادِ روغن، غلیظ بودنِ روغنِ گیربکس یا «وقتِ تعویضِ روغن» نیست."] },
      ],
      takeaway: "دما = موتور داغ کرده. روغن = فشار کم است، همین حالا موتور را خاموش کن.",
      rule: `${R121}; ${MANUALE}`,
    },
    {
      kind: "table",
      title: "باتری و ترمز: زود تعمیرش کن",
      body:
        "این دو چراغ می‌گویند یک سیستم درست کار نمی‌کند. خودرو شاید هنوز راه برود، ولی نباید همین‌طور ادامه بدهی.",
      columns: ["چه می‌گوید", "چه نمی‌گوید"],
      rows: [
        { label: "شارژِ باتری", it: "batteria · alternatore", sign: 705, values: ["قرمز، در حالِ حرکت: دینام باتری را شارژ نمی‌کند. خودرو از باتری مصرف می‌کند و باتری کم‌کم خالی می‌شود.", "«باتری کاملاً خالی است»، «باتری را عوض کن»، «باتری بیش از حد شارژ شده» یا «کابل‌ها را برعکس ببند» نیست."] },
        { label: "سیستمِ ترمز", it: "impianto frenante", sign: 721, values: ["قرمز: بخشی از سیستمِ ترمز ایراد دارد، مثلاً لنت‌ها خیلی ساییده شده‌اند یا روغنِ ترمز کم است. زود تعمیرش کن.", "خرابیِ واحدِ الکترونیکی، سرویسِ دوره‌ای در ۵۰۰ کیلومتر، معاینه‌ی فنی در یک ماه، جای کپسولِ آتش‌نشانی، برقِ فشارِ قوی یا درِ باز نیست."] },
      ],
      takeaway: "باتری = دینام شارژ نمی‌کند. ترمز = لنت یا روغنِ ترمز؛ زود به تعمیرگاه.",
      rule: `${R121}; ${MANUALE}`,
    },
    {
      kind: "table",
      title: "کمربند: آدمی بدونِ کمربند",
      body: "این چراغ خرابی نیست؛ رفتار است. تا کمربند بسته نشود، خاموش نمی‌شود.",
      columns: ["قاعده"],
      rows: [
        { label: "کمربندِ ایمنی", it: "cinture di sicurezza", sign: 707, values: ["قرمز، در حالِ حرکت: راننده یا یک سرنشین کمربند نبسته. معمولاً با یک صدای هشدار هم همراه است."] },
        { label: "چه نیست", it: "non è", values: ["زرد نیست. با کلیدی روی داشبورد خاموش نمی‌شود. کلیدِ تنظیمِ پیش‌کشنده‌ی کمربند هم نیست."] },
      ],
      takeaway: "چراغِ کمربند = کسی کمربند نبسته؛ راهِ خاموش کردنش بستنِ کمربند است.",
      rule: R121,
    },
    {
      kind: "classify",
      title: "این چراغ چه می‌گوید؟",
      body: "هر نماد را به چیزی که می‌سنجد وصل کن. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "temperatura", fa: "دمای مایعِ خنک‌کننده" },
        { it: "pressione olio", fa: "فشارِ روغن" },
        { it: "carica batteria", fa: "شارژِ باتری" },
        { it: "impianto frenante", fa: "سیستمِ ترمز" },
        { it: "cinture", fa: "کمربند" },
      ],
      items: [
        { prompt: "این نماد", sign: 704, answer: 0, explain: "دماسنج در مایع: دمای مایعِ خنک‌کننده." },
        { prompt: "این نماد", sign: 706, answer: 1, explain: "روغن‌دان: فشارِ روغن." },
        { prompt: "این نماد", sign: 705, answer: 2, explain: "باتری: دینام شارژ نمی‌کند." },
        { prompt: "این نماد", sign: 721, answer: 3, explain: "دایره در پرانتز: سیستمِ ترمز." },
        { prompt: "این نماد", sign: 707, answer: 4, explain: "آدم با کمربند: کمربندِ بسته‌نشده." },
        { prompt: "در حالِ حرکت عقربه‌ی دما بالا رفته و چراغی قرمز کنارش روشن شده", answer: 0, explain: "موتور داغ کرده." },
      ],
      takeaway: "هر چراغ یک چیز را می‌سنجد؛ گزینه‌ی غلط معمولاً چیزِ نزدیکِ همان است.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il liquido di raffreddamento", fa: "مایعِ خنک‌کننده (آبِ رادیاتور)" },
        { it: "l’eccessivo riscaldamento del motore", fa: "داغ کردنِ بیش از حدِ موتور" },
        { it: "la pressione dell’olio di lubrificazione", fa: "فشارِ روغنِ موتور" },
        { it: "l’alternatore · il generatore di corrente", fa: "دینام" },
        { it: "ricaricare la batteria", base: "ricaricare", fa: "شارژ کردنِ باتری" },
        { it: "l’impianto frenante", fa: "سیستمِ ترمز" },
        { it: "le guarnizioni dei freni", fa: "لنتِ ترمز" },
        { it: "il liquido idraulico dei freni", fa: "روغنِ ترمز" },
        { it: "le cinture di sicurezza", fa: "کمربندِ ایمنی" },
        { it: "il pretensionatore", fa: "پیش‌کشنده‌ی کمربند" },
      ],
    },
    {
      kind: "trap",
      title: "«non si sta ricaricando» درست، «completamente scarica» غلط",
      body: "هر دو جمله درباره‌ی همین چراغِ باتری است. یکی می‌گوید باتری شارژ نمی‌شود، دیگری می‌گوید خالی است:",
      examples: [
        {
          sourceId: "5957",
          textIt: "Una spia di colore rosso contrassegnata dal simbolo di figura, se accesa durante la marcia, indica che la batteria non si sta ricaricando come previsto",
          answer: 1,
          sign: 705,
          chunks: [
            { it: SPIA_ROSSA, fa: SPIA_ROSSA_FA, focus: "condition" },
            { it: "indica che la batteria", fa: "نشان می‌دهد که باتری", verb: "indica ← indicare" },
            { it: "non si sta ricaricando come previsto", fa: "آن‌طور که باید شارژ نمی‌شود", verb: "si sta ricaricando ← ricaricarsi", focus: "negation" },
          ],
          translation: "چراغِ نشانگرِ قرمز با نمادِ تصویر، اگر هنگامِ حرکت روشن شود، نشان می‌دهد که باتری آن‌طور که باید شارژ نمی‌شود.",
          why: "درست است. چراغ دربارهٔ شارژ شدن است: دینام کارش را نمی‌کند.",
        },
        {
          sourceId: "5960",
          textIt: "Una spia di colore rosso contrassegnata dal simbolo di figura, se accesa durante la marcia, indica che la batteria è completamente scarica",
          answer: 0,
          sign: 705,
          chunks: [
            { it: SPIA_ROSSA, fa: SPIA_ROSSA_FA, focus: "condition" },
            { it: "indica che la batteria", fa: "نشان می‌دهد که باتری", verb: "indica ← indicare" },
            { it: "è completamente scarica", fa: "کاملاً خالی است", verb: "è ← essere", focus: "contrast" },
          ],
          translation: "چراغِ نشانگرِ قرمز با نمادِ تصویر، اگر هنگامِ حرکت روشن شود، نشان می‌دهد که باتری کاملاً خالی است.",
          why: "غلط است. اگر باتری کاملاً خالی بود، چراغ هم روشن نمی‌شد؛ چراغ فقط می‌گوید شارژ نمی‌شود.",
        },
      ],
      takeaway: "چراغِ باتری = «شارژ نمی‌شود»، نه «خالی است» یا «عوضش کن».",
      rule: R121,
    },
  ],
  practice: [
    {
      sourceId: "5953",
      textIt: "Il simbolo raffigurato è posto sulla spia luminosa che indica la temperatura dell’olio di lubrificazione del motore",
      answer: 0,
      sign: 704,
      chunks: [
        { it: SIMBOLO, fa: SIMBOLO_FA },
        { it: "è posto sulla spia luminosa", fa: "روی چراغِ نشانگری است", verb: "è posto ← porre" },
        { it: "che indica la temperatura dell’olio di lubrificazione del motore", fa: "که دمای روغنِ موتور را نشان می‌دهد", verb: "indica ← indicare", focus: "contrast" },
      ],
      translation: "نمادِ نشان‌داده‌شده روی چراغِ نشانگری است که دمای روغنِ موتور را نشان می‌دهد.",
      why: "غلط است (قدم ۱). دماسنج در مایع = دمای مایعِ خنک‌کننده، نه دمای روغن.",
      rule: R121,
      conceptStep: 1,
    },
    {
      sourceId: "5968",
      textIt: "Una spia di colore rosso contrassegnata dal simbolo di figura, se accesa durante la marcia, indica di arrestare subito il motore per evitare gravi danni",
      answer: 1,
      sign: 706,
      chunks: [
        { it: SPIA_ROSSA, fa: SPIA_ROSSA_FA, focus: "condition" },
        { it: "indica di arrestare subito il motore", fa: "می‌گوید موتور را فوراً خاموش کن", verb: "indica ← indicare" },
        { it: "per evitare gravi danni", fa: "تا خرابیِ جدی پیش نیاید", focus: "reason" },
      ],
      translation: "چراغِ نشانگرِ قرمز با نمادِ تصویر، اگر هنگامِ حرکت روشن شود، می‌گوید موتور را فوراً خاموش کن تا خرابیِ جدی پیش نیاید.",
      why: "درست است (قدم ۱). فشارِ کمِ روغن یعنی قطعه‌های موتور بی‌روغن می‌چرخند؛ موتور را خاموش کن.",
      rule: `${R121}; ${MANUALE}`,
      conceptStep: 1,
    },
    {
      sourceId: "5978",
      textIt: "Una spia di colore rosso contrassegnata dal simbolo di figura, se accesa durante la marcia, comporta di provvedere rapidamente a una manutenzione o riparazione dell’impianto frenante",
      answer: 1,
      sign: 721,
      chunks: [
        { it: SPIA_ROSSA, fa: SPIA_ROSSA_FA, focus: "condition" },
        { it: "comporta di provvedere rapidamente", fa: "یعنی باید زود اقدام کنی", verb: "comporta ← comportare" },
        { it: "a una manutenzione o riparazione dell’impianto frenante", fa: "برای سرویس یا تعمیرِ سیستمِ ترمز" },
      ],
      translation: "چراغِ نشانگرِ قرمز با نمادِ تصویر، اگر هنگامِ حرکت روشن شود، یعنی باید زود برای سرویس یا تعمیرِ سیستمِ ترمز اقدام کنی.",
      why: "درست است (قدم ۲). چراغِ ترمز = بخشی از سیستمِ ترمز ایراد دارد؛ زود به تعمیرگاه.",
      rule: `${R121}; ${MANUALE}`,
      conceptStep: 2,
    },
    {
      sourceId: "5961",
      textIt: "Una spia di colore rosso contrassegnata dal simbolo di figura, se accesa durante la marcia, indica di sostituire subito la batteria",
      answer: 0,
      sign: 705,
      chunks: [
        { it: SPIA_ROSSA, fa: SPIA_ROSSA_FA, focus: "condition" },
        { it: "indica di sostituire subito la batteria", fa: "می‌گوید باتری را فوراً عوض کن", verb: "indica ← indicare", focus: "contrast" },
      ],
      translation: "چراغِ نشانگرِ قرمز با نمادِ تصویر، اگر هنگامِ حرکت روشن شود، می‌گوید باتری را فوراً عوض کن.",
      why: "غلط است (قدم ۲). چراغ می‌گوید باتری شارژ نمی‌شود؛ ایراد معمولاً در دینام است، نه در خودِ باتری.",
      rule: R121,
      conceptStep: 2,
    },
    {
      sourceId: "5988",
      textIt: "La spia rossa contraddistinta dal simbolo in figura può essere disattivata con apposito comando posto sul cruscotto",
      answer: 0,
      sign: 707,
      chunks: [
        { it: "La spia rossa contraddistinta dal simbolo in figura", fa: "چراغِ نشانگرِ قرمز با نمادِ تصویر" },
        { it: "può essere disattivata", fa: "می‌تواند خاموش شود", verb: "può ← potere", focus: "contrast" },
        { it: "con apposito comando posto sul cruscotto", fa: "با کلیدِ مخصوصی روی داشبورد" },
      ],
      translation: "چراغِ نشانگرِ قرمز با نمادِ تصویر را می‌شود با کلیدِ مخصوصی روی داشبورد خاموش کرد.",
      why: "غلط است (قدم ۳). چراغِ کمربند با بستنِ کمربند خاموش می‌شود، نه با کلید.",
      rule: R121,
      conceptStep: 3,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        "5946", "5947", "5948", "5949", "5950", "5951", "5952", "5953", "5954", "5955",
        "5964", "5965", "5966", "5967", "5968", "5969", "5970", "5971", "5972", "5973",
      ],
    },
    {
      step: 2,
      sourceIds: [
        "5956", "5957", "5958", "5959", "5960", "5961", "5962", "5963",
        "5974", "5975", "5976", "5977", "5978", "5979", "5980", "5981", "5982", "5983", "5984",
      ],
    },
    { step: 3, sourceIds: ["5985", "5986", "5987", "5988", "5989", "5990"] },
  ],
};
