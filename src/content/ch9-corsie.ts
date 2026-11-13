/**
 * src/content/ch9-corsie.ts
 * Chapter 9 (Segnali complementari, segnali temporanei e di cantiere),
 * lessons 3–4: yellow lane panels at worksites (lane closed, lanes available
 * per vehicle, the mobile-worksite warning) and the two yellow truck signs
 * (advised direction, detour map with a mass limit).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter9.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const SIGN = "Il segnale raffigurato";
const SIGN_FA = "تابلوی تصویر";

// ── Lesson 3 ──────────────────────────────────────────────────────────────────

export const lessonCorsieCantiere: Lesson = {
  id: "corsie-cantiere",
  titleFa: "خطِ بسته، خط‌های در دسترس و کارگاهِ متحرک",
  titleIt: "CORSIA CHIUSA · CORSIE DISPONIBILI · CANTIERE MOBILE",
  minutes: 5,
  signs: [285, 288, 280],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس تابلوهای زردِ خط را مثل نقشه می‌خوانی: فلشِ سیاه یعنی خطی که باز می‌ماند، نوارِ قرمز یعنی خطی که بسته می‌شود، و وسیله‌ای که زیرِ یک فلش کشیده شده فقط در همان خط می‌رود. همین را روی کارگاهِ متحرک هم پیاده می‌کنی.",
      why: "۲۷ سؤال. بانک خطِ بسته را با سبقت از راست، دور زدن، تقاطع یا ایستگاهِ اتوبوس عوض می‌کند و تعدادِ خط‌ها را می‌پرسد: از چند به چند؟",
    },
    {
      kind: "table",
      title: "یک خط بسته می‌شود",
      body: "همان تابلوی «کاهشِ خط‌ها» فصل ۸ (درس ۱۰)، این بار زرد و به‌خاطرِ کارگاه. بشمار: چند فلش بالا می‌رود و کدام خط با نوارِ قرمز تمام می‌شود.",
      columns: ["قاعده"],
      rows: [
        { label: "یعنی", it: "chiusura della corsia di destra", sign: 285, values: ["خطِ راست به‌خاطرِ کار بسته می‌شود: از دو خط یکی می‌ماند. سواره‌رو باریک می‌شود و خودروهای خطِ راست باید به چپ بروند. کنارِ کارگاه نصب می‌شود."] },
        { label: "پنل", it: "distanza dalla chiusura", values: ["پنلی ممکن است فاصله تا نقطه‌ی بسته شدنِ خط را بگوید."] },
        { label: "چه نیست", it: "non è", values: ["اجازه‌ی سبقت از راست، خروجیِ دور زدن، تقاطع، ایستگاهِ اتوبوس یا بسته شدنِ خطِ مخصوصِ وسایلِ کُند نیست، و حق تقدم را عوض نمی‌کند."] },
      ],
      takeaway: "قرمز = خطِ بسته. فلش‌های سیاه را بشمار: همین‌قدر خط می‌ماند.",
      rule: "DPR 495/1992 art. 43",
    },
    {
      kind: "table",
      title: "کدام خط مالِ کیست؟",
      body: "زیرِ هر فلش وسیله‌ای کشیده شده. وسیله‌ای که زیرِ یک فلش هست در همان خط می‌رود؛ وسیله‌ای که زیرِ یک فلش نیست، آن خط مالش نیست.",
      columns: ["قاعده"],
      rows: [
        { label: "یعنی", it: "corsie disponibili · uso corsie", sign: 288, values: ["سواری‌ها از هر دو خط می‌روند؛ کامیون‌های با وزنِ کلِ بیش از ۳٫۵ تن فقط از خطِ راست. کنارِ کارگاه نصب می‌شود و استفاده از خط‌ها را نشان می‌دهد."] },
        { label: "چه نیست", it: "non è", values: ["نزدیک شدنِ عوارضی نیست؛ کامیون‌ها را مجبور به حرکتِ ردیفی یا «فقط سبقت از راست» نمی‌کند؛ موتورسیکلت را از خطِ چپ منع نمی‌کند (موتور اصلاً در تصویر نیست)."] },
      ],
      takeaway: "وسیله‌ی زیرِ فلش = خطِ مجاز برای آن وسیله. چیزی را که کشیده نشده نخوان.",
      rule: "DPR 495/1992 art. 43",
    },
    {
      kind: "table",
      title: "کارگاهِ متحرک",
      body: "کارِ جاده‌ای که آرام جلو می‌رود، مثلاً رنگ زدنِ خطوط. پیش‌آگهی‌اش ترکیبی است: تابلوی زردِ خط‌ها، مثلثِ LAVORI و فاصله، معمولاً با چراغ‌های زردِ چشمک‌زن.",
      columns: ["قاعده"],
      rows: [
        { label: "یعنی", it: "cantiere mobile · strettoia a sinistra", sign: 280, values: ["جلوتر کارگاهِ متحرک است و خطِ چپ بسته می‌شود: از سه خط دو تا می‌ماند. ۵۰۰ m فاصله تا کارگاه است."] },
        { label: "روی ماشین", it: "installato su un veicolo", values: ["می‌تواند روی ماشینی نصب شود که جلوتر از کارگاه حرکت می‌کند و همراهِ کار جلو می‌رود."] },
        { label: "چه نیست", it: "non è", values: ["نمی‌گوید چند وسیله هم‌زمان می‌توانند رد شوند؛ توقفگاه در سمتِ چپ هم نیست."] },
      ],
      takeaway: "تابلوی خط‌ها می‌گوید کدام خط باز است؛ LAVORI و عدد می‌گویند کار کجاست.",
      rule: "DPR 495/1992 art. 39",
    },
    {
      kind: "classify",
      title: "کدام خط بسته است؟",
      body: "به هر تابلو نگاه کن و بگو کدام خط بسته می‌شود.",
      options: [
        { it: "corsia di destra", fa: "خطِ راست" },
        { it: "corsia di sinistra", fa: "خطِ چپ" },
        { it: "nessuna", fa: "هیچ‌کدام" },
      ],
      items: [
        { prompt: "این تابلو", sign: 285, answer: 0, explain: "نوارِ قرمز سمتِ راست است: خطِ راست بسته می‌شود، از دو خط یکی می‌ماند." },
        { prompt: "تابلوی سمتِ چپِ این ترکیب", sign: 280, answer: 1, explain: "نوارِ قرمز سمتِ چپ است: از سه خط دو تا می‌ماند." },
        { prompt: "این تابلو", sign: 288, answer: 2, explain: "هر دو خط بازند. تابلو فقط می‌گوید کامیون‌ها از کدام خط بروند." },
      ],
      takeaway: "اول قرمز را پیدا کن. قرمز نیست؟ هیچ خطی بسته نیست.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la corsia chiusa", fa: "خطِ بسته" },
        { it: "la diminuzione da due a una corsia", fa: "کم شدن از دو خط به یک خط" },
        { it: "le corsie disponibili", fa: "خط‌های در دسترس" },
        { it: "debbono circolare", base: "dovere", fa: "باید حرکت کنند" },
        { it: "la strettoia", fa: "باریکه؛ جای باریکِ جاده" },
        { it: "il cantiere mobile", fa: "کارگاهِ متحرک" },
        { it: "le luci gialle lampeggianti", fa: "چراغ‌های زردِ چشمک‌زن" },
      ],
    },
    {
      kind: "trap",
      title: "فقط چیزی را بخوان که کشیده شده",
      body: "هر دو جمله درباره‌ی تابلوی خط‌ها با کامیون است:",
      examples: [
        {
          sourceId: "3596",
          sign: 288,
          textIt: "Il segnale raffigurato indica agli autocarri di massa complessiva superiore a 3,5 tonnellate quale corsia debbono percorrere",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "indica agli autocarri di massa complessiva superiore a 3,5 tonnellate", fa: "به کامیون‌های با وزنِ کلِ بیش از ۳٫۵ تن نشان می‌دهد", verb: "indica ← indicare" },
            { it: "quale corsia debbono percorrere", fa: "از کدام خط باید بروند", verb: "debbono ← dovere" },
          ],
          translation: "تابلوی تصویر به کامیون‌های با وزنِ کلِ بیش از ۳٫۵ تن نشان می‌دهد از کدام خط باید بروند.",
          why: "درست است. کامیون زیرِ فلشِ راست کشیده شده.",
        },
        {
          sourceId: "3601",
          sign: 288,
          textIt: "Il segnale raffigurato vieta ai motocicli di circolare sulla corsia di sinistra",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "vieta ai motocicli", fa: "موتورسیکلت‌ها را منع می‌کند", verb: "vieta ← vietare", focus: "contrast" },
            { it: "di circolare sulla corsia di sinistra", fa: "از حرکت در خطِ چپ" },
          ],
          translation: "تابلوی تصویر موتورسیکلت‌ها را از حرکت در خطِ چپ منع می‌کند.",
          why: "غلط است. در تابلو موتوری نیست؛ تابلو چیزی درباره‌ی آن‌ها نمی‌گوید.",
        },
      ],
      takeaway: "تابلوی خط‌ها فقط درباره‌ی وسیله‌هایی حرف می‌زند که در آن کشیده شده‌اند.",
      rule: "DPR 495/1992 art. 43",
    },
  ],
  practice: [
    {
      sourceId: "3586",
      sign: 285,
      textIt: "Il segnale raffigurato indica restringimento della carreggiata per lavori in corso",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica restringimento della carreggiata", fa: "باریک شدنِ سواره‌رو را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "per lavori in corso", fa: "به‌خاطرِ کارِ در حالِ انجام", focus: "reason" },
      ],
      translation: "تابلوی تصویر باریک شدنِ سواره‌رو را به‌خاطرِ کارِ در حالِ انجام نشان می‌دهد.",
      why: "درست است (قدم ۱). یک خط کم شود، سواره‌رو باریک می‌شود؛ زمینه‌ی زرد می‌گوید به‌خاطرِ کار.",
      rule: "DPR 495/1992 art. 43",
      conceptStep: 1,
    },
    {
      sourceId: "3597",
      sign: 288,
      textIt: "Il segnale raffigurato indica che gli autocarri di massa complessiva superiore a 3,5 tonnellate possono percorrere solo la corsia di destra",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che gli autocarri di massa complessiva superiore a 3,5 tonnellate", fa: "نشان می‌دهد که کامیون‌های با وزنِ کلِ بیش از ۳٫۵ تن", verb: "indica ← indicare" },
        { it: "possono percorrere solo la corsia di destra", fa: "فقط می‌توانند از خطِ راست بروند", verb: "possono ← potere", focus: "limit" },
      ],
      translation: "تابلوی تصویر نشان می‌دهد که کامیون‌های با وزنِ کلِ بیش از ۳٫۵ تن فقط می‌توانند از خطِ راست بروند.",
      why: "درست است (قدم ۲). کامیون فقط زیرِ فلشِ راست کشیده شده.",
      rule: "DPR 495/1992 art. 43",
      conceptStep: 2,
    },
    {
      sourceId: "3599",
      sign: 288,
      textIt: "Il segnale raffigurato obbliga gli autocarri a circolare per file parallele",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "obbliga gli autocarri", fa: "کامیون‌ها را مجبور می‌کند", verb: "obbliga ← obbligare" },
        { it: "a circolare per file parallele", fa: "که در ردیف‌های موازی حرکت کنند", focus: "contrast" },
      ],
      translation: "تابلوی تصویر کامیون‌ها را مجبور می‌کند در ردیف‌های موازی حرکت کنند.",
      why: "غلط است (قدم ۲). کامیون فقط یک خط دارد، پس اصلاً نمی‌تواند در دو ردیف کنارِ هم برود.",
      rule: "DPR 495/1992 art. 43",
      conceptStep: 2,
    },
    {
      sourceId: "3568",
      sign: 280,
      textIt: "Il segnale raffigurato indica una diminuzione da tre a due corsie",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica una diminuzione", fa: "یک کاهش را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "da tre a due corsie", fa: "از سه خط به دو خط", focus: "limit" },
      ],
      translation: "تابلوی تصویر کاهش از سه خط به دو خط را نشان می‌دهد.",
      why: "درست است (قدم ۳). سه خط کشیده شده و چپی با قرمز تمام می‌شود: دو تا می‌ماند.",
      rule: "DPR 495/1992 art. 39",
      conceptStep: 3,
    },
    {
      sourceId: "3571",
      sign: 280,
      textIt: "Il segnale raffigurato indica una piazzola di sosta sul lato sinistro",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica una piazzola di sosta", fa: "یک توقفگاه را نشان می‌دهد", verb: "indica ← indicare", focus: "contrast" },
        { it: "sul lato sinistro", fa: "در سمتِ چپ" },
      ],
      translation: "تابلوی تصویر یک توقفگاه در سمتِ چپ را نشان می‌دهد.",
      why: "غلط است (قدم ۳). قرمزِ سمتِ چپ خطی است که بسته می‌شود، نه جای ایستادن.",
      rule: "DPR 495/1992 art. 39",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["3582", "3583", "3584", "3585", "3586", "3587", "3588", "3589", "3590", "3591", "3592"] },
    { step: 2, sourceIds: ["3593", "3594", "3595", "3596", "3597", "3598", "3599", "3600", "3601"] },
    { step: 3, sourceIds: ["3565", "3566", "3567", "3568", "3569", "3570", "3571"] },
  ],
};

// ── Lesson 4 ──────────────────────────────────────────────────────────────────

export const lessonDeviazioniMezziPesanti: Lesson = {
  id: "deviazioni-mezzi-pesanti-cantiere",
  titleFa: "کامیون‌ها کنارِ کارگاه: مسیرِ پیشنهادی و انحرافِ وزنی",
  titleIt: "DIREZIONE CONSIGLIATA AUTOCARRI · PREAVVISO DI DEVIAZIONE",
  minutes: 5,
  signs: [251, 283],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس دو تابلوی زردِ کامیون را از هم جدا می‌کنی: یکی جهتی را به کامیون‌های بالای ۳٫۵ تن فقط «پیشنهاد» می‌کند، دیگری نقشه‌ای است که می‌گوید کدام وسایل به‌خاطرِ محدودیتِ وزن نباید مستقیم بروند و از کدام راهِ فرعی بروند.",
      why: "۲۰ سؤال. «پیشنهاد» را «اجبار» می‌کنند، محدودیت را به همه‌ی وسایل تعمیم می‌دهند و تُن را با متر عوض می‌کنند.",
    },
    {
      kind: "table",
      title: "مسیرِ پیشنهادی برای کامیون‌ها",
      body: "زمینه‌ی زرد، فلش و تصویرِ کامیون. نه دایره‌ی آبی دارد نه دایره‌ی قرمز، پس پیشنهاد است؛ همان فکرِ تابلوی سفیدِ کامیون‌ها در فصل ۸ (درس ۱۳)، این بار موقت و به‌خاطرِ کارگاه.",
      columns: ["قاعده"],
      rows: [
        { label: "یعنی", it: "direzione consigliata autocarri", sign: 251, values: ["به کامیون‌های با وزنِ کلِ با بار کاملِ بیش از ۳٫۵ تن پیشنهاد می‌کند به راست بپیچند. در خودِ نقطه‌ی انحراف نصب می‌شود."] },
        { label: "کجا", it: "incrocio che precede il cantiere", values: ["نزدیکِ تقاطعی که قبل از کارگاه است. ممکن است قبلش تابلوی پیش‌آگهی هم باشد."] },
        { label: "چه نیست", it: "non è", values: ["اجبار به راست نیست، منعِ پیچیدن به چپ نیست، توقفگاهِ کامیون یا راهِ زباله‌دانی نیست، و یک‌طرفه‌ی مخصوصِ کامیون هم نیست."] },
      ],
      takeaway: "زرد + کامیون + فلش، بدونِ دایره = پیشنهاد به کامیون‌ها.",
      rule: "DPR 495/1992 art. 43",
    },
    {
      kind: "table",
      title: "نقشه‌ی انحراف با محدودیتِ وزن",
      body: "تابلوی زردِ بزرگ با نقشه. روی مسیرِ مستقیم دایره‌ی قرمزِ «7 t» است: همان ممنوعیتِ وزنِ فصل ۳ (درس ۱۰) که وزنِ واقعیِ همین لحظه (massa effettiva) را می‌سنجد. دایره فقط روی همان شاخه اعمال می‌شود.",
      columns: ["قاعده"],
      rows: [
        { label: "وزنِ واقعیِ بیش از ۷ t", it: "massa effettiva > 7 t", sign: 283, values: ["کسی که به لوکا می‌رود نمی‌تواند مستقیم برود؛ باید از مسیرِ فرعیِ سمتِ راست برود که از سان مارچلو پیستویزه و پونته‌پتری می‌گذرد."] },
        { label: "بقیه", it: "altri veicoli", values: ["سواری‌ها و کامیون‌هایی که حتی با بارِ کامل زیرِ ۷ تن‌اند می‌توانند مستقیم به لوکا بروند."] },
        { label: "کجا", it: "segnale temporaneo di cantiere", values: ["تابلوی موقتِ کارگاه، نزدیکِ تقاطعی که قبل از کارگاه است."] },
        { label: "چه نیست", it: "non è", values: ["ممنوعیتِ سبقت یا ممنوعیتِ طولِ ۷ متر نیست، همه را به پیچیدن مجبور نمی‌کند، و راهِ لوکا را برای همه نمی‌بندد."] },
      ],
      takeaway: "دایره‌ی قرمز روی یک شاخه = ممنوعیت فقط برای همان وسایل و همان شاخه.",
      rule: "DPR 495/1992 art. 43",
    },
    {
      kind: "classify",
      title: "چه کسی مستقیم به لوکا می‌رود؟",
      body: "با همین تابلو، هر وسیله را در دسته‌ی درست بگذار. یادت باشد: «7 t» وزنِ واقعیِ همین لحظه است.",
      options: [
        { it: "prosegue diritto", fa: "مستقیم می‌رود" },
        { it: "deve deviare", fa: "از مسیرِ فرعی می‌رود" },
      ],
      items: [
        { prompt: "سواری‌ای با وزنِ ۱٫۵ تن", sign: 283, answer: 0, explain: "زیرِ ۷ تن است؛ ممنوعیت شاملش نمی‌شود." },
        { prompt: "کامیونی که الان با بارش ۹ تن وزن دارد", sign: 283, answer: 1, explain: "وزنِ واقعی‌اش بیش از ۷ تن است: باید از مسیرِ فرعی برود." },
        { prompt: "کامیونی که وزنِ با بارِ کاملش (در کارتِ خودرو) ۶ تن است", sign: 283, answer: 0, explain: "حتی پرِ پر هم به ۷ تن نمی‌رسد؛ مستقیم می‌رود." },
        { prompt: "اتوبوسی با وزنِ واقعیِ ۱۲ تن", sign: 283, answer: 1, explain: "ممنوعیت درباره‌ی وزن است، نه نوعِ وسیله: باید منحرف شود." },
        { prompt: "کامیونِ ۸ متری با وزنِ واقعیِ ۵ تن", sign: 283, answer: 0, explain: "عدد تُن است، نه متر. طول اینجا محدود نیست." },
      ],
      takeaway: "اول واحد را ببین (t یا m)، بعد وزنِ واقعی را با عدد مقایسه کن.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'autocarro", fa: "کامیونِ باری" },
        { it: "la massa complessiva a pieno carico", fa: "وزنِ کل با بارِ کامل (در کارتِ خودرو)" },
        { it: "la massa effettiva", fa: "وزنِ واقعیِ همین لحظه" },
        { it: "consigliata", fa: "پیشنهادی" },
        { it: "proseguire diritto", base: "proseguire", fa: "مستقیم ادامه دادن" },
        { it: "cambiare strada", fa: "راه را عوض کردن" },
        { it: "la limitazione di transito", fa: "محدودیتِ عبور" },
      ],
    },
    {
      kind: "trap",
      title: "پیشنهاد یا ممنوعیت؟",
      body: "دو تابلوی زردِ کامیون، دو جمله:",
      examples: [
        {
          sourceId: "3526",
          sign: 251,
          textIt: "Il segnale raffigurato obbliga gli autocarri a svoltare a destra",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "obbliga gli autocarri", fa: "کامیون‌ها را مجبور می‌کند", verb: "obbliga ← obbligare", focus: "contrast" },
            { it: "a svoltare a destra", fa: "که به راست بپیچند" },
          ],
          translation: "تابلوی تصویر کامیون‌ها را مجبور می‌کند به راست بپیچند.",
          why: "غلط است. دایره‌ی آبی ندارد: پیشنهاد است، نه اجبار.",
        },
        {
          sourceId: "3574",
          sign: 283,
          textIt: "Il segnale raffigurato non consente ai veicoli di massa effettiva superiore a 7 tonnellate diretti a Lucca di proseguire diritto",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "non consente ai veicoli di massa effettiva superiore a 7 tonnellate", fa: "به وسایلِ با وزنِ واقعیِ بیش از ۷ تن اجازه نمی‌دهد", verb: "consente ← consentire", focus: "negation" },
            { it: "diretti a Lucca", fa: "که به لوکا می‌روند" },
            { it: "di proseguire diritto", fa: "مستقیم ادامه دهند" },
          ],
          translation: "تابلوی تصویر به وسایلِ با وزنِ واقعیِ بیش از ۷ تن که به لوکا می‌روند اجازه نمی‌دهد مستقیم ادامه دهند.",
          why: "درست است. دایره‌ی قرمز روی مسیرِ مستقیم ممنوعیت است، فقط برای بیش از ۷ تن.",
        },
      ],
      takeaway: "دایره نیست: پیشنهاد. دایره‌ی قرمز هست: ممنوعیت برای همان وزن.",
      rule: "DPR 495/1992 art. 43",
    },
  ],
  practice: [
    {
      sourceId: "3517",
      sign: 251,
      textIt: "Il segnale raffigurato indica la direzione consigliata per gli autocarri di massa complessiva a pieno carico superiore a 3,5 tonnellate",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica la direzione consigliata", fa: "جهتِ پیشنهادی را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "per gli autocarri di massa complessiva a pieno carico superiore a 3,5 tonnellate", fa: "برای کامیون‌های با وزنِ کلِ با بارِ کاملِ بیش از ۳٫۵ تن" },
      ],
      translation: "تابلوی تصویر جهتِ پیشنهادی را برای کامیون‌های با وزنِ کلِ با بارِ کاملِ بیش از ۳٫۵ تن نشان می‌دهد.",
      why: "درست است (قدم ۱). تصویرِ کامیون یعنی همین گروه، و بی‌دایره یعنی پیشنهاد.",
      rule: "DPR 495/1992 art. 43",
      conceptStep: 1,
    },
    {
      sourceId: "3522",
      sign: 251,
      textIt: "Il segnale raffigurato indica che è vietato svoltare a sinistra",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica che è vietato", fa: "نشان می‌دهد که ممنوع است", verb: "indica ← indicare", focus: "contrast" },
        { it: "svoltare a sinistra", fa: "به چپ پیچیدن" },
      ],
      translation: "تابلوی تصویر نشان می‌دهد که پیچیدن به چپ ممنوع است.",
      why: "غلط است (قدم ۱). تابلو فقط جهتی را به کامیون‌ها پیشنهاد می‌کند و چیزی را ممنوع نمی‌کند.",
      rule: "DPR 495/1992 art. 43",
      conceptStep: 1,
    },
    {
      sourceId: "3573",
      sign: 283,
      textIt: "Il segnale raffigurato consente agli autocarri di massa a pieno carico inferiore a 7 tonnellate di proseguire diritto",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "consente agli autocarri di massa a pieno carico inferiore a 7 tonnellate", fa: "به کامیون‌های با وزنِ با بارِ کاملِ کمتر از ۷ تن اجازه می‌دهد", verb: "consente ← consentire", focus: "limit" },
        { it: "di proseguire diritto", fa: "مستقیم ادامه دهند" },
      ],
      translation: "تابلوی تصویر به کامیون‌های با وزنِ با بارِ کاملِ کمتر از ۷ تن اجازه می‌دهد مستقیم ادامه دهند.",
      why: "درست است (قدم ۲). اگر حتی با بارِ کامل زیرِ ۷ تن باشد، وزنِ واقعی‌اش هرگز از ۷ تن بیشتر نیست.",
      rule: "DPR 495/1992 art. 43",
      conceptStep: 2,
    },
    {
      sourceId: "3578",
      sign: 283,
      textIt: "Il segnale raffigurato indica, a tutti i veicoli, che non è possibile proseguire diritto per Lucca",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica, a tutti i veicoli,", fa: "به همه‌ی وسایل نشان می‌دهد", verb: "indica ← indicare", focus: "always" },
        { it: "che non è possibile proseguire diritto per Lucca", fa: "که نمی‌شود مستقیم به لوکا رفت", focus: "negation" },
      ],
      translation: "تابلوی تصویر به همه‌ی وسایل نشان می‌دهد که نمی‌شود مستقیم به لوکا رفت.",
      why: "غلط است (قدم ۲). ممنوعیت فقط برای وزنِ واقعیِ بیش از ۷ تن است، نه همه.",
      rule: "DPR 495/1992 art. 43",
      conceptStep: 2,
    },
    {
      sourceId: "3581",
      sign: 283,
      textIt: "Il segnale raffigurato vieta il transito ai veicoli che superano 7 metri di lunghezza",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "vieta il transito ai veicoli", fa: "عبورِ وسایلی را ممنوع می‌کند", verb: "vieta ← vietare" },
        { it: "che superano 7 metri di lunghezza", fa: "که طولشان بیش از ۷ متر است", focus: "contrast" },
      ],
      translation: "تابلوی تصویر عبورِ وسایلی را که طولشان بیش از ۷ متر است ممنوع می‌کند.",
      why: "غلط است (قدم ۲). روی دایره «t» نوشته: تُن، یعنی وزن، نه طول.",
      rule: "DPR 495/1992 art. 43",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["3517", "3518", "3519", "3520", "3521", "3522", "3523", "3524", "3525", "3526"] },
    { step: 2, sourceIds: ["3572", "3573", "3574", "3575", "3576", "3577", "3578", "3579", "3580", "3581"] },
  ],
};
