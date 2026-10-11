/**
 * src/content/overtaking.ts
 * "Assess the situation" — road scenes for the overtaking chapter
 * (src/content/lessons-sorpasso.ts).
 *
 * A scene is a list of stated facts. Each fact is a rule below: what the
 * learner is told, what it does to each of the two questions, the law it rests
 * on, and real bank statements that back it. The verdict is never written by
 * hand into the logic: judgeScene (src/lib/learning.ts) derives it from the
 * rules, and tests/overtaking.test.ts checks it against each scene's reviewed
 * `expect`.
 *
 * The two questions are deliberately separate:
 *  1. Law — does a sign, a marking or the spot itself (curve, crest,
 *     junction…) forbid overtaking here? These are the "divieti" of CdS
 *     art. 148 c.10–13, art. 40 c.8 and the DIVIETO DI SORPASSO sign.
 *  2. Safety — art. 148 c.2 lists four checks (visibility, the driver ahead,
 *     the driver behind, free road for the whole manoeuvre). They are legal
 *     duties too, but they depend on the moment, so they are asked apart:
 *     "not forbidden" never means "safe".
 *
 * Trust rules:
 *  - Every rule cites the law (Normattiva, testo vigente, reviewed 2026-10-10)
 *    and at least one VERO bank statement that agrees with it. `agrees` is our
 *    reading; tests check it against the bank's answer key, and
 *    `npm run verify:lessons` checks the snapshots against D1.
 *  - Scenes never ask the learner to guess another driver's speed or
 *    intention: what a still picture cannot show is stated in words
 *    (`textOnly`). No distances are computed or shown: this is not a gap
 *    calculator.
 *  - Drawings are original educational illustrations built from the facts
 *    (public/js/overtaking.js), so the picture can only show what is stated.
 */
import type { AssessRule, AssessScene, LegalVerdict, SafetyCheck, SafetyVerdict } from "./lessons.js";

const CDS_40 = "Codice della Strada, art. 40";
const CDS_148 = "Codice della Strada, art. 148";

// ── Rules ─────────────────────────────────────────────────────────────────────

const lineDashed: AssessRule = {
  id: "line-dashed",
  fact: "خطِ وسط خط‌چین (مقطع) است.",
  explain: "از خط‌چین می‌شود برای سبقت عبور کرد، به شرطِ رعایتِ بقیه‌ی قواعد. پس خودِ خط مانع نیست؛ ولی اجازه‌ی خط هنوز یعنی «ایمن است» نیست.",
  law: `${CDS_40} c.3, c.8`,
  legal: "allows",
  draw: { line: "dashed" },
  marks: ["line"],
  evidence: [
    {
      sourceId: "2394",
      textIt: "La striscia bianca discontinua in figura consente, in caso si voglia sorpassare, di occupare momentaneamente l'altra corsia di marcia",
      answer: 1,
      image: 502,
      agrees: true,
    },
    {
      sourceId: "2587",
      textIt: "In una carreggiata a doppio senso di circolazione la striscia di mezzo, se discontinua (tratteggiata), può essere superata durante un sorpasso",
      answer: 1,
      agrees: true,
    },
    {
      sourceId: "5220",
      textIt: "Il sorpasso è vietato se si è costretti a superare la linea longitudinale tratteggiata",
      answer: 0,
      agrees: false,
    },
  ],
};

const lineSolidNear: AssessRule = {
  id: "line-solid-near",
  fact: "خطِ وسط دوتایی است: سمتِ تو ممتد، سمتِ مقابل خط‌چین.",
  explain: "قاعده را خطی تعیین می‌کند که به تو نزدیک‌تر است. سمتِ تو ممتد است، پس نباید از آن عبور کنی؛ خط‌چینِ آن طرف فقط برای جهتِ مقابل است.",
  law: `${CDS_40} c.4, c.8`,
  legal: "forbids",
  draw: { line: "solid-dashed" },
  marks: ["line"],
  evidence: [
    { sourceId: "2459", textIt: "Il veicolo in figura non può superare la striscia continua centrale", answer: 1, image: 567, agrees: true },
    {
      sourceId: "2464",
      textIt: "Il veicolo in figura può effettuare un sorpasso anche superando la striscia continua centrale",
      answer: 0,
      image: 567,
      agrees: false,
    },
  ],
};

const lineDashedNear: AssessRule = {
  id: "line-dashed-near",
  fact: "خطِ وسط دوتایی است: سمتِ تو خط‌چین، سمتِ مقابل ممتد.",
  explain: "خطِ نزدیک به تو خط‌چین است، و قانون به کسی که سمتِ خط‌چین است اجازه می‌دهد از هر دو خط عبور کند. خطِ ممتدِ آن طرف برای جهتِ مقابل است.",
  law: `${CDS_40} c.4, c.8`,
  legal: "allows",
  draw: { line: "dashed-solid" },
  marks: ["line"],
  evidence: [
    {
      sourceId: "2466",
      textIt:
        "Rispetto al veicolo che procede nel senso della freccia, la striscia discontinua in figura consente di effettuare un sorpasso anche superando tutte e due le strisce",
      answer: 1,
      image: 566,
      agrees: true,
    },
    {
      sourceId: "5246",
      textIt: "E’ vietato il sorpasso se alla sinistra del veicolo si trova una linea bianca discontinua affiancata da una continua",
      answer: 0,
      agrees: false,
    },
  ],
};

const SIGN_PASSED = "چند ده متر عقب‌تر از تابلوی DIVIETO DI SORPASSO رد شدی؛ از آن به بعد نه تابلوی پایانش آمده و نه تقاطعی.";

const signCarAhead: AssessRule = {
  id: "sign-car-ahead",
  fact: `${SIGN_PASSED} وسیله‌ی جلویی یک سواریِ کند است.`,
  explain:
    "این تابلو سبقت از وسیله‌های موتوری را ممنوع می‌کند، جز موتورسیکلت و موتور گازی؛ با خط‌چین یا خطِ ممتد، و حتی اگر وسیله‌ی جلویی خیلی کند باشد. سواری وسیله‌ی موتوری است.",
  law: "DPR 495/1992, art. 116 c.1 lett. c; art. 104 c.2",
  legal: "forbids",
  draw: { sign: 56, ahead: "car" },
  marks: ["sign", "ahead"],
  evidence: [
    {
      sourceId: "1232",
      textIt: "Il segnale raffigurato vieta il sorpasso fra autoveicoli, anche se la manovra può compiersi entro la semicarreggiata",
      answer: 1,
      image: 56,
      agrees: true,
    },
    {
      sourceId: "1249",
      textIt: "Il segnale raffigurato consente il sorpasso tra autovetture se non vi è la striscia bianca continua",
      answer: 0,
      image: 56,
      agrees: false,
    },
    {
      sourceId: "1260",
      textIt: "In presenza del segnale raffigurato è consentito il sorpasso dei veicoli a motore che procedono molto lentamente",
      answer: 0,
      image: 56,
      agrees: false,
    },
  ],
};

const signMotoAhead: AssessRule = {
  id: "sign-moto-ahead",
  fact: `${SIGN_PASSED} وسیله‌ی جلویی یک موتورسیکلتِ کند است.`,
  explain: "همین تابلو سبقت از موتورسیکلت و موتور گازی را منع نمی‌کند. پس این‌جا تابلو مانع نیست، و خط‌چین هم مانع نیست.",
  law: "DPR 495/1992, art. 116 c.1 lett. c",
  legal: "allows",
  draw: { sign: 56, ahead: "moto" },
  marks: ["sign", "ahead"],
  evidence: [
    {
      sourceId: "1240",
      textIt: "In presenza del segnale raffigurato è consentito il sorpasso dei motocicli",
      answer: 1,
      image: 56,
      agrees: true,
    },
    {
      sourceId: "1227",
      textIt: "Il segnale raffigurato consente ad un'autovettura di sorpassare un motociclo",
      answer: 1,
      image: 56,
      agrees: true,
    },
    {
      sourceId: "1252",
      textIt: "In presenza del segnale raffigurato è vietato sorpassare qualsiasi veicolo",
      answer: 0,
      image: 56,
      agrees: false,
    },
  ],
};

const SEE_FAR = {
  sourceId: "5136",
  textIt: "Il conducente che intende sorpassare deve accertarsi che la visibilità sia tale da consentire la manovra",
  answer: 1 as const,
  agrees: true,
};
const ROAD_FREE = {
  sourceId: "5140",
  textIt: "Il conducente che intende sorpassare deve accertarsi che la strada sia libera per consentire la completa esecuzione del sorpasso",
  answer: 1 as const,
  agrees: true,
};

const roadAheadClear: AssessRule = {
  id: "road-ahead-clear",
  fact: "جاده صاف و هموار است، تا دوردست را می‌بینی، و در تمامِ این مسیر هیچ خودرویی از روبه‌رو نمی‌آید.",
  explain: "دید کافی است و جاده‌ی جلو، تا جایی که می‌بینی، خالی است. همین جمله دو بررسی را جواب می‌دهد: دید، و فضای خالی برای تمام کردنِ سبقت.",
  law: `${CDS_148} c.2 lett. a, d`,
  safety: { checks: ["visibility", "space"], result: "ok" },
  draw: { view: "clear" },
  marks: ["view"],
  evidence: [
    SEE_FAR,
    ROAD_FREE,
    {
      sourceId: "5142",
      textIt: "Il conducente che intende sorpassare deve tener conto di eventuali veicoli che provengono dalla direzione opposta",
      answer: 1,
      agrees: true,
    },
  ],
};

const viewBlocked: AssessRule = {
  id: "view-blocked",
  fact: "درست پشتِ یک کامیونِ بلند و کندی و از پشتِ آن جاده‌ی جلو را نمی‌بینی.",
  explain:
    "نمی‌دانی جلوی کامیون چه خبر است، ولی همین را می‌دانی که نمی‌بینی. قانون می‌گوید اگر فضایی که دیده می‌شود برای تمام کردنِ سبقت کافی نیست، سبقت نکن. پس این بررسی رد شده است، نه بی‌جواب.",
  law: `${CDS_148} c.2 lett. a, d`,
  safety: { checks: ["visibility", "space"], result: "fails" },
  draw: { ahead: "truck", gap: "close", view: "blocked" },
  marks: ["ahead", "view"],
  evidence: [
    {
      sourceId: "5155",
      textIt: "La manovra di sorpasso non va effettuata se lo spazio visibile risulta insufficiente per completarla in sicurezza",
      answer: 1,
      agrees: true,
    },
    {
      sourceId: "5161",
      textIt: "La manovra di sorpasso si effettua anche se lo spazio visibile risulta insufficiente per completarla in sicurezza",
      answer: 0,
      agrees: false,
    },
    SEE_FAR,
  ],
};

const viewPastTruck: AssessRule = {
  id: "view-past-truck",
  fact: "پشتِ یک کامیونِ بلند و کندی، با فاصله‌ی بیشتر، و از کنارِ آن جاده را می‌بینی: صاف است، تا دوردست دیده می‌شود و هیچ خودرویی از روبه‌رو نمی‌آید.",
  explain: "حالا که از کنارِ کامیون جاده را می‌بینی، دو بررسیِ «دید» و «فضای خالیِ جلو» جواب دارند و هیچ‌کدام مانع نیست.",
  law: `${CDS_148} c.2 lett. a, d`,
  safety: { checks: ["visibility", "space"], result: "ok" },
  draw: { ahead: "truck", gap: "far", view: "clear" },
  marks: ["view"],
  evidence: [SEE_FAR, ROAD_FREE],
};

const aheadNotSignalling: AssessRule = {
  id: "ahead-not-signalling",
  fact: "رانندهٔ جلویی راهنما نزده است.",
  explain: "اگر رانندهٔ جلویی برای همین کار راهنما زده بود، باید صبر می‌کردی. راهنما نزده، پس این بررسی مانعی نشان نمی‌دهد.",
  textOnly: true,
  law: `${CDS_148} c.2 lett. b`,
  safety: { checks: ["ahead"], result: "ok" },
  draw: {},
  marks: ["ahead"],
  evidence: [
    {
      sourceId: "5138",
      textIt:
        "Il conducente che intende sorpassare deve accertarsi che il conducente che lo precede nella stessa corsia non abbia segnalato di voler compiere analoga manovra",
      answer: 1,
      agrees: true,
    },
  ],
};

const BEHIND_STARTED = {
  sourceId: "5139",
  textIt: "Il conducente che intende sorpassare deve accertarsi che il conducente che lo segue sulla stessa carreggiata non abbia iniziato il sorpasso",
  answer: 1 as const,
  agrees: true,
};

const behindChecked: AssessRule = {
  id: "behind-checked",
  fact: "در آینه‌ها و با یک نگاهِ سریع به کنار دیده‌ای که هیچ‌کس پشتِ سرت سبقت را شروع نکرده است.",
  explain: "قانون می‌خواهد پیش از سبقت مطمئن شوی کسی از پشت سبقت را شروع نکرده. آینه به‌تنهایی کافی نیست؛ یک نگاهِ سریع به کنار هم لازم است.",
  textOnly: true,
  law: `${CDS_148} c.2 lett. c`,
  safety: { checks: ["behind"], result: "ok" },
  draw: { behind: "checked" },
  marks: ["behind"],
  evidence: [
    BEHIND_STARTED,
    {
      sourceId: "4711",
      textIt:
        "Il controllo dello specchio retrovisore laterale sinistro deve essere integrato con un rapido controllo visivo laterale diretto, prima di iniziare un sorpasso",
      answer: 1,
      agrees: true,
    },
  ],
};

const behindOvertaking: AssessRule = {
  id: "behind-overtaking",
  fact: "در آینه می‌بینی خودروی پشتِ سرت همین حالا به سمتِ چپ آمده و دارد از تو سبقت می‌گیرد.",
  explain: "کسی که از پشت سبقت را شروع کرده، همان جایی است که تو می‌خواهی بروی. قانون صریح است: پیش از سبقت باید مطمئن شوی هیچ‌کس پشتِ سرت سبقت را شروع نکرده؛ این‌جا شروع کرده است.",
  law: `${CDS_148} c.2 lett. c`,
  safety: { checks: ["behind"], result: "fails" },
  draw: { behind: "overtaking" },
  marks: ["behind"],
  evidence: [
    BEHIND_STARTED,
    {
      sourceId: "5200",
      textIt: "La pericolosità del sorpasso nasce dalla possibilità di urtare altri veicoli che, davanti o dietro, intendano compiere la stessa manovra",
      answer: 1,
      agrees: true,
    },
  ],
};

const behindUnknown: AssessRule = {
  id: "behind-unknown",
  fact: "این تصویر آینه‌ها را نشان نمی‌دهد و صحنه نمی‌گوید پشتِ سرت کسی سبقت را شروع کرده یا نه: هنوز نگاه نکرده‌ای.",
  explain: "تا آینه‌ها و کنار را نگاه نکنی، یکی از بررسی‌های لازم بی‌جواب است. «ممنوع نیست» یعنی «حالا بررسی کن»، نه «برو».",
  textOnly: true,
  law: `${CDS_148} c.2 lett. c`,
  safety: { checks: ["behind"], result: "unknown" },
  draw: { behind: "unknown" },
  marks: ["behind"],
  evidence: [
    BEHIND_STARTED,
    {
      sourceId: "4690",
      textIt: "Gli specchi retrovisori devono essere utilizzati per un controllo della strada dietro al veicolo, prima di iniziare una manovra di sorpasso",
      answer: 1,
      agrees: true,
    },
  ],
};

/** Every rule a scene may use, by id. */
export const ASSESS_RULES: AssessRule[] = [
  lineDashed,
  lineSolidNear,
  lineDashedNear,
  signCarAhead,
  signMotoAhead,
  roadAheadClear,
  viewBlocked,
  viewPastTruck,
  aheadNotSignalling,
  behindChecked,
  behindOvertaking,
  behindUnknown,
];

// ── Scenes ────────────────────────────────────────────────────────────────────

const ROAD = "جاده‌ی بیرون‌شهریِ دوطرفه، با یک خطِ عبور در هر جهت.";

/** Lesson 2: a sign beats a dashed line; the motorcycle exception. */
export const SCENE_SIGN: AssessScene = {
  id: "sign-dashed",
  title: "تابلو و خط‌چین",
  setting: `${ROAD} می‌خواهی از وسیله‌ی جلویی سبقت بگیری.`,
  facts: [signCarAhead, lineDashed, roadAheadClear, aheadNotSignalling, behindChecked],
  expect: { legal: "forbidden", safety: "clear" },
  compare: {
    change: "فقط وسیله‌ی جلویی عوض شد: حالا یک موتورسیکلتِ کند است.",
    facts: [signMotoAhead, lineDashed, roadAheadClear, aheadNotSignalling, behindChecked],
    expect: { legal: "not_forbidden", safety: "clear" },
  },
};

/** Lesson 2: the mixed line is read from your side; not forbidden is not "go". */
export const SCENE_MIXED: AssessScene = {
  id: "mixed-line",
  title: "خطِ وسطِ دوتایی",
  setting: `${ROAD} پشتِ یک سواریِ کندی و می‌خواهی از آن سبقت بگیری.`,
  facts: [lineSolidNear, roadAheadClear, aheadNotSignalling, behindUnknown],
  expect: { legal: "forbidden", safety: "unknown" },
  compare: {
    change: "فقط خطِ وسط برعکس شد: حالا خطِ نزدیک به تو خط‌چین است.",
    facts: [lineDashedNear, roadAheadClear, aheadNotSignalling, behindUnknown],
    expect: { legal: "not_forbidden", safety: "unknown" },
  },
};

/** Lesson 3: you cannot see past a truck — that is a failed check, not missing information. */
export const SCENE_TRUCK: AssessScene = {
  id: "truck-view",
  title: "پشتِ کامیون",
  setting: `${ROAD} پشتِ یک کامیونِ کندی و می‌خواهی از آن سبقت بگیری.`,
  facts: [lineDashed, viewBlocked, aheadNotSignalling, behindChecked],
  expect: { legal: "not_forbidden", safety: "fails" },
  compare: {
    change: "فقط دیدت عوض شد: با فاصله‌ی بیشتر، از کنارِ کامیون جاده‌ی جلو را می‌بینی.",
    facts: [lineDashed, viewPastTruck, aheadNotSignalling, behindChecked],
    expect: { legal: "not_forbidden", safety: "clear" },
  },
};

/** Lesson 3: someone behind has already started to overtake you. */
export const SCENE_BEHIND: AssessScene = {
  id: "mirror",
  title: "نگاه در آینه",
  setting: `${ROAD} پشتِ یک سواریِ کندی و می‌خواهی از آن سبقت بگیری.`,
  facts: [lineDashed, roadAheadClear, aheadNotSignalling, behindOvertaking],
  expect: { legal: "not_forbidden", safety: "fails" },
  compare: {
    change: "فقط آینه عوض شد: حالا هیچ‌کس پشتِ سرت سبقت را شروع نکرده است.",
    facts: [lineDashed, roadAheadClear, aheadNotSignalling, behindChecked],
    expect: { legal: "not_forbidden", safety: "clear" },
  },
};

export const ASSESS_SCENES: AssessScene[] = [SCENE_SIGN, SCENE_MIXED, SCENE_TRUCK, SCENE_BEHIND];

// ── Copy used by the verdict (src/lib/learning.ts assessAnswer) ──────────────

/** Persian names of the art. 148 c.2 checks. */
export const SAFETY_CHECK_FA: Record<SafetyCheck, string> = {
  visibility: "دید به جلو",
  ahead: "رانندهٔ جلویی برای سبقت راهنما نزده باشد",
  behind: "کسی پشتِ سرت سبقت را شروع نکرده باشد",
  space: "جاده‌ی جلو تا پایانِ سبقت خالی باشد",
};

/** Why a chosen answer is wrong, keyed "chosen>correct". "{missing}" lists the unanswered checks. */
export const ASSESS_NOTES: {
  legal: Record<`${LegalVerdict}>${LegalVerdict}`, string>;
  safety: Record<`${SafetyVerdict}>${SafetyVerdict}`, string>;
} = {
  legal: {
    "not_forbidden>forbidden":
      "این‌جا یک ممنوعیت برقرار است (روی تصویر نشانش دادیم). وقتی ممنوعیتی هست، خوب بودنِ بقیه‌ی شرایط، مثل دیدِ کافی یا جاده‌ی خالی، آن را برنمی‌دارد.",
    "forbidden>not_forbidden":
      "هیچ تابلو، خط‌کشی یا محلی این‌جا سبقت را ممنوع نمی‌کند. اگر چیزی ناامن یا نامعلوم است، جایش در پرسشِ دوم است: «ممنوع» یعنی قانونِ همین نقطه اجازه نمی‌دهد.",
    "forbidden>forbidden": "",
    "not_forbidden>not_forbidden": "",
  },
  safety: {
    "clear>fails": "یکی از بررسی‌ها همین حالا رد شده است (روی تصویر). خالی به نظر رسیدنِ بقیه‌ی جاده یا ممنوع نبودن، این را جبران نمی‌کند.",
    "clear>unknown": "همه‌ی بررسی‌ها جواب ندارند. بی‌جواب: {missing}. چیزی را که نمی‌دانی نمی‌شود «مانعی نیست» حساب کرد.",
    "unknown>fails":
      "اطلاعات کم نیست: چیزی که گفته شده همین حالا سبقت را ناامن می‌کند. وقتی یک بررسی رد شده، برای گفتنِ «الان نه» به بقیه نیازی نیست.",
    "unknown>clear":
      "هر چهار بررسی (دید، رانندهٔ جلویی، پشتِ سر، فضای خالیِ جلو) در صحنه گفته شده و هیچ‌کدام مانع نیست. اطلاعات کافی است؛ تصمیمِ آخر با توست، و اگر چیزی عوض شد سبقت را شروع نمی‌کنی.",
    "fails>unknown": "هیچ بررسی‌ای رد نشده؛ یکی بی‌جواب مانده: {missing}. «نمی‌دانم» با «نه» فرق دارد: اول باید نگاه کنی.",
    "fails>clear":
      "هیچ‌کدام از چیزهایی که گفته شده سبقت را ناامن نمی‌کند و هر چهار بررسی جواب دارند. اگر به‌خاطرِ تابلو یا خط «نه» گفتی: آن پرسشِ اول است؛ این پرسش فقط درباره‌ی ایمنی است.",
    "fails>fails": "",
    "unknown>unknown": "",
    "clear>clear": "",
  },
};
