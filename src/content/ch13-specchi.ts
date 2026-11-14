/**
 * src/content/ch13-specchi.ts
 * Chapter 13 (Norme di circolazione), lesson 13: the rear-view mirrors. When
 * you look (before every manoeuvre that moves you sideways or backwards),
 * what they cannot show (the blind spot, distorted distance in the convex
 * left mirror) and why a direct look completes them; then the mirrors as
 * equipment: how to adjust them, the interior mirror's anti-glare position,
 * and why they may not be removed or replaced at will.
 *
 * No legal text sets how to adjust or use a mirror: those answers are driving
 * technique as the bank states it. The mirrors themselves are compulsory
 * equipment of type-approved vehicles (CdS art. 72). Chapter 15
 * (`sorpasso-fasi`) keeps the overtaking mirror checks #4690, #4691, #4708,
 * #4711. #4702 lost its first word («Gli») in the 2023 dataset.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter13.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const ART_72 = "Codice della Strada, art. 72 (dispositivi di equipaggiamento)";
const TECNICA = "Tecnica di guida (banca dati ministeriale)";
const GLI_SPECCHI = "Gli specchi retrovisori devono essere utilizzati per un controllo della strada dietro al veicolo,";
const GLI_SPECCHI_FA = "آینه‌ها باید برای وارسیِ جاده‌ی پشتِ خودرو به کار بروند،";
const SINISTRO = "Lo specchio retrovisore laterale sinistro";
const SINISTRO_FA = "آینه‌ی بغلِ چپ";

export const lessonSpecchi: Lesson = {
  id: "norme-specchi",
  titleFa: "آینه‌ها: کِی نگاه کنی، چه نمی‌بینی، چطور تنظیم کنی",
  titleIt: "SPECCHI RETROVISORI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی پیش از کدام مانورها به آینه نگاه می‌کنی، آینه چه چیزی را نشانت نمی‌دهد و چرا یک نگاهِ مستقیم کاملش می‌کند، و آینه‌ی وسط و بغلِ چپ را چطور تنظیم می‌کنی.",
      why:
        "۳۷ سؤال. بیشترشان دو دام دارند: «آینه همه‌چیز را نشان می‌دهد، پس نگاهِ مستقیم لازم نیست» و قاعده‌های ساختگی درباره‌ی آینه («با سنسور لازم نیست»، «هر هزار کیلومتر تنظیم کن»، «اندازه‌اش به حجمِ موتور بستگی دارد»).",
      rule: `${ART_72}; ${TECNICA}`,
    },
    {
      kind: "table",
      title: "کِی نگاه کنی، و آینه چه را نشان نمی‌دهد",
      body:
        "آینه‌ها دیدِ دوروبرت را کامل‌تر می‌کنند، ولی نه کامل: آینه‌ی بغلِ چپ محدب است، فاصله و سرعتِ خودروهای پشتی را نادرست نشان می‌دهد و نقطه‌ی کورِ بزرگی دارد. پس هر مانوری که تو را به پهلو یا عقب می‌برد، با آینه شروع می‌شود و با یک نگاهِ سریعِ مستقیم کامل.",
      columns: ["چه کنی", "دامِ بانک"],
      rows: [
        {
          label: "پیش از کدام مانورها",
          it: "prima di svoltare · cambio corsia · parcheggio in retromarcia",
          values: ["پیش از پیچیدن، عوض کردنِ خط عبور به چپ، پیچیدن به چپ، پارکِ دنده‌عقب، و واردِ جریانِ ترافیک شدن", "«هر بار که سرِ تقاطع مستقیم می‌روی» قاعده نیست"],
        },
        {
          label: "آینه‌ی بغلِ چپ",
          it: "falsa la percezione della distanza",
          values: ["بیشترِ جاده‌ی کنارِ خودرو را نشان می‌دهد، ولی فاصله و سرعت را نادرست؛ و نقطه‌ی کورش بزرگ است", "«آینه‌ها روی هم همه‌ی اطرافِ خودرو را نشان می‌دهند» غلط است"],
        },
        {
          label: "نگاهِ مستقیم",
          it: "controllo visivo diretto",
          values: ["پیش از واردِ ترافیک شدن (و پیش از سبقت)، آینه + یک نگاهِ سریع از روی شانه", "«نگاهِ مستقیم نکن تا حواست پرت نشود» غلط است"],
        },
        {
          label: "سنسورِ پارک",
          it: "sensori di parcheggio",
          values: ["کمک است، جای آینه را نمی‌گیرد", "«با سنسور لازم نیست به آینه نگاه کنی» غلط است"],
        },
        {
          label: "در شهر و در جاده‌ی کوهستانی",
          it: "centri abitati · strade strette di montagna",
          values: ["همه‌جا به آینه نیاز داری", "«در شهر لازم نیست» یا «در جاده‌ی باریکِ کوهستان آینه‌ی چپ را ببند» غلط است"],
        },
      ],
      takeaway: "آینه پیش از هر حرکتِ به پهلو یا عقب؛ نقطه‌ی کور را با یک نگاهِ مستقیم پر کن. سبقت: فصل ۱۵.",
      rule: TECNICA,
    },
    {
      kind: "table",
      title: "آینه‌ها چطور تنظیم می‌شوند و چه نمی‌شود با آن‌ها کرد",
      body:
        "تنظیم یک ترتیب دارد: اول صندلی، بعد آینه‌ها، با خودروی ایستاده. آینه‌ی وسط باید در میدانِ دیدت باشد و کلِ شیشه‌ی عقب را نشان دهد؛ معمولاً تخت است تا فاصله را کمتر از بقیه نادرست نشان دهد. آینه‌ی بغلِ چپ را طوری بگذار که در یک‌سومِ راستش کمی از بدنه‌ی خودرویت را ببینی و بقیه‌اش جاده‌ی کنارت باشد. آینه‌ها تجهیزاتِ اجباریِ خودروی تأییدشده‌اند؛ برداشتن یا عوض کردنشان دلخواه نیست.",
      columns: ["قاعده", "دامِ بانک"],
      rows: [
        { label: "ترتیب و زمان", it: "dopo il sedile", values: ["بعد از تنظیمِ صندلی، با خودروی ایستاده", "«در حالِ حرکت» یا «هر حدودِ هزار کیلومتر» غلط است"] },
        {
          label: "آینه‌ی وسط",
          it: "l'intero lunotto posteriore",
          values: ["در میدانِ دیدت، کلِ شیشه‌ی عقب را نشان دهد", "«خودروی با پشت‌سریِ صندلیِ عقب آینه‌ی وسط ندارد» یا «می‌شود صفحه‌ی مسیریاب کردش» غلط است"],
        },
        {
          label: "حالتِ ضدِ تابش",
          it: "posizione antiriflesso",
          values: ["شب، برای نورِ خودروهای پشتِ سر؛ در آزادراه هم", "«شب نباید» یا «در آزادراه نمی‌شود» غلط است؛ برای نورِ روبه‌رو هم نیست (درس ۱۱)"],
        },
        {
          label: "آینه‌ی بغلِ چپ",
          it: "nel suo terzo di destra, la coda del veicolo",
          values: ["یک‌سومِ راستش کمی از بدنه، بقیه جاده‌ی کنار", "«برای دیدنِ بچه‌های صندلیِ عقب» غلط است"],
        },
        {
          label: "تجهیزاتِ اجباری",
          it: "specchi retrovisori",
          values: ["همیشه باید باشند و از نوعِ تأییدشده", "«آینه‌ی وسط را اگر آینه‌ی چپ هست بردار»، «کمپر بی‌آینه»، «با نوعِ دیگری عوضش کن اگر بزرگ‌تر است»، «بی‌آینه با ۵۰ و چراغِ خطر» همه غلط‌اند"],
        },
        {
          label: "قاعده‌های ساختگی",
          values: ["—", "«اندازه‌ی آینه به حجمِ موتور بستگی دارد»، «چراغِ داخلِ آینه با چراغِ کوچک روشن می‌شود»، «آینه‌ی وسیله‌ی دوچرخ ثابت است و تنظیم نمی‌شود» غلط‌اند"],
        },
      ],
      takeaway: "صندلی، بعد آینه، با خودروی ایستاده. وسط = کلِ شیشه‌ی عقب؛ چپ = یک‌سومِ راست بدنه. آینه برداشتنی و عوض‌کردنی نیست.",
      rule: `${ART_72}; ${TECNICA}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "lo specchio retrovisore", fa: "آینه" },
        { it: "lo specchio retrovisore centrale", fa: "آینه‌ی وسط" },
        { it: "lo specchio retrovisore laterale sinistro", fa: "آینه‌ی بغلِ چپ" },
        { it: "l'angolo cieco", fa: "نقطه‌ی کور" },
        { it: "la posizione antiriflesso · antiabbagliante", fa: "حالتِ ضدِ تابش" },
        { it: "il lunotto posteriore", fa: "شیشه‌ی عقب" },
        { it: "regolare", fa: "تنظیم کردن" },
        { it: "falsare", fa: "نادرست نشان دادن", note: "«falsa la percezione della distanza» یعنی فاصله را نادرست نشان می‌دهد." },
      ],
    },
    {
      kind: "trap",
      title: "پارکِ دنده‌عقب: آینه لازم است یا سنسور کافی است؟",
      body: "هر دو جمله درباره‌ی همان مانورند. یکی آینه را لازم می‌داند، یکی می‌گوید سنسور جایش را می‌گیرد:",
      examples: [
        {
          sourceId: "4689",
          textIt: "Gli specchi retrovisori devono essere utilizzati per un controllo della strada dietro al veicolo, prima di iniziare una manovra di parcheggio in retromarcia",
          answer: 1,
          chunks: [
            { it: GLI_SPECCHI, fa: GLI_SPECCHI_FA, verb: "devono ← dovere" },
            { it: "prima di iniziare una manovra di parcheggio in retromarcia", fa: "پیش از شروعِ پارکِ دنده‌عقب", focus: "condition" },
          ],
          translation: "آینه‌ها باید پیش از شروعِ پارکِ دنده‌عقب برای وارسیِ جاده‌ی پشتِ خودرو به کار بروند.",
          why: "درست است. پیش از هر حرکت به عقب، با آینه‌ها پشتِ سرت را وارسی می‌کنی.",
        },
        {
          sourceId: "4698",
          textIt: "Durante una manovra di parcheggio in retromarcia, non è necessario utilizzare gli specchi retrovisori se il veicolo è dotato di sensori di parcheggio",
          answer: 0,
          chunks: [
            { it: "Durante una manovra di parcheggio in retromarcia,", fa: "هنگامِ پارکِ دنده‌عقب،" },
            { it: "non è necessario utilizzare gli specchi retrovisori", fa: "لازم نیست از آینه‌ها استفاده کنی", focus: "negation" },
            { it: "se il veicolo è dotato di sensori di parcheggio", fa: "اگر خودرو سنسورِ پارک داشته باشد", focus: "condition", verb: "è dotato ← dotare" },
          ],
          translation: "هنگامِ پارکِ دنده‌عقب، اگر خودرو سنسورِ پارک داشته باشد، لازم نیست از آینه‌ها استفاده کنی.",
          why: "غلط است. سنسور فقط نزدیکِ سپر را حس می‌کند و جای نگاه در آینه را نمی‌گیرد.",
        },
      ],
      takeaway: "هر دستیاری (سنسور، دوربین) کمک است؛ آینه و نگاهِ خودت حذف نمی‌شوند.",
      rule: TECNICA,
    },
  ],
  practice: [
    {
      sourceId: "4710",
      textIt: "Lo specchio retrovisore laterale sinistro ha un angolo cieco molto ampio",
      answer: 1,
      chunks: [
        { it: SINISTRO, fa: SINISTRO_FA },
        { it: "ha un angolo cieco molto ampio", fa: "نقطه‌ی کورِ خیلی بزرگی دارد", verb: "ha ← avere" },
      ],
      translation: "آینه‌ی بغلِ چپ نقطه‌ی کورِ خیلی بزرگی دارد.",
      why: "درست است (قدم ۱). بخشی از کنارِ عقبِ خودرو در آینه دیده نمی‌شود؛ برای همین پیش از حرکت به پهلو یک نگاهِ مستقیم هم می‌کنی.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "4716",
      textIt:
        "Se durante una manovra di inserimento nella circolazione si utilizza lo specchio retrovisore è bene non controllare anche con uno sguardo diretto per non distrarre l’attenzione dalla guida",
      answer: 0,
      chunks: [
        { it: "Se durante una manovra di inserimento nella circolazione", fa: "اگر هنگامِ واردِ ترافیک شدن", focus: "condition" },
        { it: "si utilizza lo specchio retrovisore", fa: "از آینه استفاده می‌کنی،", verb: "si utilizza ← utilizzare" },
        { it: "è bene non controllare anche con uno sguardo diretto", fa: "بهتر است با نگاهِ مستقیم دیگر وارسی نکنی", focus: "negation" },
        { it: "per non distrarre l’attenzione dalla guida", fa: "تا حواست از رانندگی پرت نشود", focus: "reason" },
      ],
      translation: "اگر هنگامِ واردِ ترافیک شدن از آینه استفاده می‌کنی، بهتر است با نگاهِ مستقیم دیگر وارسی نکنی تا حواست از رانندگی پرت نشود.",
      why: "غلط است (قدم ۱). آینه نقطه‌ی کور دارد؛ نگاهِ سریعِ مستقیم همان چیزی را نشان می‌دهد که آینه نمی‌بیند. حواس‌پرتی نیست، بخشی از وارسی است.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "4704",
      textIt: "Lo specchio retrovisore laterale sinistro deve essere regolato in modo da scorgere, nel suo terzo di destra, la coda del veicolo",
      answer: 1,
      chunks: [
        { it: SINISTRO, fa: SINISTRO_FA },
        { it: "deve essere regolato in modo da scorgere,", fa: "باید طوری تنظیم شود که ببینی،", verb: "deve ← dovere" },
        { it: "nel suo terzo di destra,", fa: "در یک‌سومِ راستش،" },
        { it: "la coda del veicolo", fa: "عقبِ خودرو را" },
      ],
      translation: "آینه‌ی بغلِ چپ باید طوری تنظیم شود که در یک‌سومِ راستش عقبِ خودرو را ببینی.",
      why: "درست است (قدم ۲). کمی از بدنه‌ی خودِ تو نقطه‌ی مرجع است؛ بقیه‌ی آینه جاده‌ی کنارت را نشان می‌دهد.",
      rule: TECNICA,
      conceptStep: 2,
    },
    {
      sourceId: "4701",
      textIt: "La regolazione degli specchi retrovisori deve di norma essere effettuata con il veicolo in marcia",
      answer: 0,
      chunks: [
        { it: "La regolazione degli specchi retrovisori", fa: "تنظیمِ آینه‌ها" },
        { it: "deve di norma essere effettuata", fa: "معمولاً باید انجام شود", verb: "deve ← dovere" },
        { it: "con il veicolo in marcia", fa: "در حالی که خودرو حرکت می‌کند", focus: "condition" },
      ],
      translation: "تنظیمِ آینه‌ها معمولاً باید در حالی انجام شود که خودرو حرکت می‌کند.",
      why: "غلط است (قدم ۲). آینه‌ها را با خودروی ایستاده و بعد از تنظیمِ صندلی تنظیم می‌کنی؛ در حرکت، دست و نگاهت باید برای رانندگی باشند.",
      rule: TECNICA,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // when to look, what the mirrors cannot show, the direct look
      sourceIds: ["4680", "4686", "4689", "4694", "4698", "4699", "4706", "4707", "4709", "4710", "4712", "4714", "4715", "4716"],
    },
    {
      step: 2,
      // adjusting the mirrors, the anti-glare position, mirrors as compulsory equipment
      sourceIds: [
        "4681", "4682", "4683", "4684", "4685", "4687", "4688", "4692", "4693", "4695", "4696", "4697",
        "4700", "4701", "4702", "4703", "4704", "4705", "4713", "4717", "4718", "4719", "4720",
      ],
    },
  ],
};
