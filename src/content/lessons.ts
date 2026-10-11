/**
 * src/content/lessons.ts
 * Lesson content model, the pilot chapter (Segnali di precedenza), and the
 * chapter registry. Later chapters live in their own files
 * (src/content/lessons-incroci.ts, -velocita.ts, -sorpasso.ts) and are
 * registered in CHAPTERS below.
 *
 * This file is the single source of truth for lesson text. It is written and
 * reviewed by hand, versioned with the code that renders it, and never
 * regenerated per visit. Per-user state (progress, answers) lives in D1 —
 * see migrations/0015_learning_progress.sql.
 *
 * Trust rules for this file:
 *  - Practice questions are real bank questions, referenced by `sourceId`
 *    (questions.source_id). `textIt` and `answer` are snapshots of the bank row;
 *    the API drops a question whose live row no longer matches (src/api/learn.ts),
 *    so a changed answer key can never silently disagree with the feedback here.
 *  - Every practice question was checked against the source dataset
 *    (image + text) and against the rule cited in `rule`.
 *  - `translation` is a faithful translation of the Italian claim — same
 *    polarity even when the claim is false. Whether it is true lives in `why`.
 *  - `related` lists (question → lesson section) are explicit and hand-pruned:
 *    only questions whose tested fact the section actually teaches. Questions
 *    about sign taxonomy, traffic lights, or motorway placement are excluded.
 *  - Re-run `npm run verify:lessons` after editing anything below.
 */

// The chapter files (and overtaking.ts) only import *types* from this file
// (erased at build), so this is not a runtime import cycle.
import { INCROCI_CHAPTER } from "./lessons-incroci.js";
import { SORPASSO_CHAPTER } from "./lessons-sorpasso.js";
import { VELOCITA_CHAPTER } from "./lessons-velocita.js";
import type { StoppingSetting } from "../lib/stopping.js";

export type BankAnswer = 0 | 1;

/** How a chunk changes the meaning of the sentence. Rendered as a text tag, never colour alone. */
export type ChunkFocus = "negation" | "limit" | "always" | "condition" | "reason" | "contrast";

export interface ItalianChunk {
  it: string;
  fa: string;
  focus?: ChunkFocus;
  /** Conjugated verb in this chunk → its infinitive, e.g. "obbliga ← obbligare". */
  verb?: string;
  note?: string;
}

export interface Statement {
  sourceId: string;
  /** Snapshot of questions.text_it. */
  textIt: string;
  /** Snapshot of questions.correct_answer (1 = VERO). */
  answer: BankAnswer;
  /** Sign image number from the bank (img_sign/N.png), when the question has one. */
  sign?: number;
  /** Bank intersection figure (img_sign/N.png) — a whole diagram, shown large. */
  figure?: number;
  chunks: ItalianChunk[];
  /** Faithful Persian translation of the claim — never corrected to match the answer. */
  translation: string;
  /** Why the bank answer is right, in Persian. */
  why: string;
}

export interface PracticeQuestion extends Statement {
  /** Legal basis the answer was verified against. */
  rule: string;
  /** Index into Lesson.steps of the section that teaches this concept. */
  conceptStep: number;
}

export interface SignRef {
  sign: number;
  nameIt: string;
  nameFa: string;
}

export interface Term {
  it: string;
  fa: string;
  /** Infinitive, when `it` contains a conjugated or reflexive verb. */
  base?: string;
  note?: string;
}

/** A junction arm: compass direction from the centre (0 = east / right of the
 *  figure, 90 = north / top), copied from the bank figure's layout. */
export interface CrossingArm {
  id: string;
  angle: number;
  /** Lanes per direction (default 1). */
  lanes?: number;
  sign?: "dare" | "stop";
  /** Tram tracks run along this arm (lane 0 in both directions). */
  tram?: boolean;
}

export type VehicleKind = "car" | "truck" | "bus" | "tram" | "filobus" | "eccezionale";
export type Movement = "straight" | "left" | "right";

export interface CrossingVehicle {
  /** The letter printed on the bank figure. */
  id: string;
  kind: VehicleKind;
  from: string;
  to: string;
  move: Movement;
  /** 0 = lane next to the centre line (default), 1 = the next lane out. */
  lane?: number;
  /** Already leaving the junction in the figure: drawn, but not part of the order. */
  leaving?: boolean;
}

/**
 * A real bank statement about this figure's order, as constraints:
 * `before` [a, b] = a passes strictly before b; `together` [a, b] = same moment.
 * A VERO statement must satisfy every constraint, a FALSO one must break one.
 */
export interface OrderEvidence {
  sourceId: string;
  textIt: string;
  answer: BankAnswer;
  before?: [string, string][];
  together?: [string, string][];
}

/**
 * An original redrawing of one bank intersection figure, used as an
 * educational exercise (never presented as a bank question). The order in
 * `phases` is the bank's, cross-checked against `evidence` in tests.
 */
export interface Crossing {
  id: string;
  /** Bank figure this redraws (img_sign/N.png). */
  figure: number;
  arms: CrossingArm[];
  vehicles: CrossingVehicle[];
  /** Verified passage order; vehicles in one group move at the same time. */
  phases: string[][];
  /** One Persian explanation per phase: who moves now and why. */
  explain: { text: string; signs?: string[] }[];
  /** Per vehicle: why it cannot go earlier (shown when picked too early). */
  waits: Record<string, string>;
  evidence: OrderEvidence[];
}

/** A distance a prediction option makes a claim about. "gap" is the shortest
 *  following distance when both cars brake alike (src/lib/stopping.ts). */
export type DistancePart = "reaction" | "braking" | "total" | "gap";

/** What one prediction option says; tests/stopping.test.ts checks it against the model. */
export type PredictionClaim =
  /** rows[1] ÷ rows[0] for this distance (1 = unchanged). */
  | { part: DistancePart; factor: number }
  /** rows[1] is longer by an amount the model does not state (wet, snow). */
  | { part: DistancePart; longer: true }
  /** rows[row] does or does not stop within the step's `sight`. */
  | { row: number; fits: boolean };

/** Predict first, then see the settings compared on one scale. */
export interface Prediction {
  question: string;
  rows: StoppingSetting[];
  options: { text: string; claims: PredictionClaim[] }[];
  answer: number;
  explain: string;
}

/** One factor, backed by a real bank statement whose answer matches its column. */
export interface FactorItem {
  fa: string;
  /** Exact words from `textIt`, shown as the Italian key phrase. */
  it: string;
  sourceId: string;
  textIt: string;
  answer: BankAnswer;
}

// ── Chapter 4: overtaking (src/content/overtaking.ts, lessons-sorpasso.ts) ──

/** Question 1 of "Assess the situation": does a sign, a marking or the spot itself forbid overtaking? */
export type LegalVerdict = "forbidden" | "not_forbidden";
/** Question 2: from what the scene states, can you judge whether overtaking can be done safely now? */
export type SafetyVerdict = "fails" | "unknown" | "clear";
/** The four checks Codice della Strada art. 148 c.2 requires before overtaking. */
export type SafetyCheck = "visibility" | "ahead" | "behind" | "space";
/** A drawn element of the scene, highlighted when the fact about it is explained. */
export type SceneMark = "line" | "sign" | "ahead" | "view" | "behind";

/** How a scene is drawn; every key comes from one of its facts, so the picture can only show what is stated. */
export interface SceneDraw {
  /** Centre line, the stripe next to you first: "solid-dashed" = solid on your side (bank fig. 567). */
  line?: "dashed" | "solid-dashed" | "dashed-solid";
  /** Prohibition sign you passed (bank sign image). */
  sign?: 56;
  ahead?: "car" | "moto" | "truck";
  /** Your distance behind the vehicle ahead. */
  gap?: "close" | "far";
  view?: "clear" | "blocked";
  behind?: "checked" | "overtaking" | "unknown";
}

/** A bank statement behind a rule. `agrees` is our reading: a statement that agrees must be VERO, one that contradicts FALSO. */
export interface RuleEvidence {
  sourceId: string;
  textIt: string;
  answer: BankAnswer;
  /** Bank image number, when the statement shows one. */
  image?: number;
  agrees: boolean;
}

/** One condition a scene can state, with what it does to each question. */
export interface AssessRule {
  id: string;
  /** The condition as the learner reads it in the scene, in Persian. */
  fact: string;
  /** Why it matters, shown after the verdict. */
  explain: string;
  /** True when a still picture cannot show it (a blinking indicator, a mirror check): the text states it. */
  textOnly?: boolean;
  law: string;
  /** Effect on question 1; omitted when the fact says nothing about legality. */
  legal?: "forbids" | "allows";
  /** Effect on question 2: which art. 148 c.2 checks it settles, and how. */
  safety?: { checks: SafetyCheck[]; result: "ok" | "fails" | "unknown" };
  draw: SceneDraw;
  marks: SceneMark[];
  evidence: RuleEvidence[];
}

export interface AssessVariant {
  facts: AssessRule[];
  /** Reviewed answers; tests/overtaking.test.ts checks them against the rules. */
  expect: { legal: LegalVerdict; safety: SafetyVerdict };
}

/** A self-contained road scene: an original educational drawing, never a bank question. */
export interface AssessScene extends AssessVariant {
  id: string;
  title: string;
  /** The situation in words: road type, who is where, what you want to do. */
  setting: string;
  /** The same scene with exactly one fact changed. */
  compare: AssessVariant & { change: string };
}

/** A centre line as both drivers see it. `stripes` lists the stripe next to the lower lane first. */
export interface LineMarking {
  id: string;
  nameIt: string;
  nameFa: string;
  stripes: ("dashed" | "solid")[];
  /** May the driver in this lane cross it? (CdS art. 40 c.4, c.8) */
  cross: { lower: boolean; upper: boolean };
  note: string;
  /** Bank statements about crossing it, read from the side whose nearest stripe is `adjacent`. */
  evidence: (RuleEvidence & { adjacent: "dashed" | "solid"; claimsCrossable: boolean })[];
}

/** One stage of the overtaking manoeuvre: what each driver does, and where both cars are at its end. */
export interface ManoeuvreStage {
  title: string;
  you: string;
  other: string;
  rule: string;
  /** Position along the road (0–120, not to scale) and lane (0 = right, 1 = left) at the end of the stage. */
  pose: { you: [number, number]; other: [number, number] };
  indicator: "off" | "left" | "right";
  marks: ("mirror" | "view" | "gap")[];
}

interface StepBase {
  title: string;
  /** Legal basis for the facts in this step. */
  rule?: string;
}

export type LessonStep =
  | (StepBase & { kind: "intro"; objective: string; why: string })
  | (StepBase & {
      kind: "compare";
      body?: string;
      items: [SignRef, SignRef];
      rows: { label: string; values: [string, string] }[];
      takeaway: string;
    })
  | (StepBase & {
      kind: "sequence";
      body: string;
      lanes: { from: SignRef; to: SignRef; caption: string }[];
      takeaway: string;
    })
  | (StepBase & {
      kind: "diagram";
      diagram: "junction" | "narrowing";
      body: string;
      callouts: string[];
      takeaway: string;
    })
  | (StepBase & {
      kind: "scenario";
      body: string;
      crossing: Crossing;
      /** Guided reading: each step highlights vehicles and arms. */
      guide: { text: string; focus: string[]; arms?: string[] }[];
      takeaway: string;
    })
  | (StepBase & { kind: "order"; body: string; crossing: Crossing; takeaway: string })
  | (StepBase & {
      /** The stopping-distance explorer (public/js/stopping.js), drawn from the model's table. */
      kind: "stopping";
      /** hazard: you approach a hazard · following: you behind a braking car · sight: stop within what you can see */
      scene: "hazard" | "following" | "sight";
      body: string;
      start: StoppingSetting;
      /** Clear road visible ahead, in metres (scene "sight"). */
      sight?: number;
      /** Unlocked once the predictions are done; the rest stay as in `start`. */
      controls: ("speed" | "reaction" | "surface")[];
      predictions: Prediction[];
      takeaway: string;
    })
  | (StepBase & {
      /** Two columns: what the bank says matters (VERO), and what it says does not (FALSO). */
      kind: "factors";
      body: string;
      columns: [{ title: string; items: FactorItem[] }, { title: string; items: FactorItem[] }];
      takeaway: string;
    })
  | (StepBase & {
      /** Centre lines read from either lane (public/js/overtaking.js). */
      kind: "markings";
      body: string;
      lines: LineMarking[];
      takeaway: string;
    })
  | (StepBase & {
      /** "Assess the situation": two questions per scene; the verdict comes from POST …/assess. */
      kind: "assess";
      body: string;
      scenes: AssessScene[];
      takeaway: string;
    })
  | (StepBase & {
      /** The overtaking manoeuvre stage by stage, with playback and manual stepping. */
      kind: "manoeuvre";
      body: string;
      stages: ManoeuvreStage[];
      takeaway: string;
    })
  | (StepBase & { kind: "terms"; terms: Term[] })
  | (StepBase & { kind: "trap"; body: string; examples: Statement[]; takeaway: string });

export interface Lesson {
  id: string;
  titleFa: string;
  titleIt: string;
  minutes: number;
  signs: number[];
  /** Bank intersection figures this lesson's questions may show. */
  figures?: number[];
  steps: LessonStep[];
  practice: PracticeQuestion[];
  /** Explicit question → section mapping used to route mistakes back here. */
  related: { step: number; sourceIds: string[] }[];
}

export interface Source {
  label: string;
  url: string;
}

export interface Chapter {
  id: string;
  /** topics.id of the matching bank chapters (broad practice lives there). */
  topicIds: number[];
  nameIt: string;
  titleFa: string;
  summaryFa: string;
  reviewedOn: string;
  sources: Source[];
  lessons: Lesson[];
}

const DARE: SignRef = { sign: 40, nameIt: "DARE PRECEDENZA", nameFa: "رعایت حق تقدم" };
const STOP: SignRef = { sign: 41, nameIt: "FERMARSI E DARE PRECEDENZA (STOP)", nameFa: "ایست و رعایت حق تقدم" };
const PREAVVISO_DARE: SignRef = { sign: 42, nameIt: "PREAVVISO DI DARE PRECEDENZA", nameFa: "پیش‌آگهی رعایت حق تقدم" };
const PREAVVISO_STOP: SignRef = { sign: 43, nameIt: "PREAVVISO DI FERMARSI E DARE PRECEDENZA", nameFa: "پیش‌آگهی ایست" };
const DIRITTO: SignRef = { sign: 52, nameIt: "DIRITTO DI PRECEDENZA", nameFa: "جاده با حق تقدم" };
const FINE_DIRITTO: SignRef = { sign: 46, nameIt: "FINE DEL DIRITTO DI PRECEDENZA", nameFa: "پایان حق تقدم" };
const INTERSEZIONE_DIRITTO: SignRef = { sign: 47, nameIt: "INTERSEZIONE CON DIRITTO DI PRECEDENZA", nameFa: "تقاطع؛ حق تقدم با توست" };
const INTERSEZIONE_DESTRA: SignRef = { sign: 44, nameIt: "INTERSEZIONE CON PRECEDENZA A DESTRA", nameFa: "تقاطع؛ به راست راه بده" };
const SUA_DARE: SignRef = { sign: 45, nameIt: "DARE PRECEDENZA NEL SENSO UNICO ALTERNATO", nameFa: "راه دادن در باریکه" };
const SUA_DIRITTO: SignRef = { sign: 53, nameIt: "DIRITTO DI PRECEDENZA NEL SENSO UNICO ALTERNATO", nameFa: "حق تقدم در باریکه" };

const SIGN = "Il segnale raffigurato";
const SIGN_FA = "تابلوی نشان‌داده‌شده";
const PRESENZA = "In presenza del segnale raffigurato";
const PRESENZA_FA = "وقتی این تابلو هست";

// ── Lesson 1 ──────────────────────────────────────────────────────────────────

const lessonDareStop: Lesson = {
  id: "dare-precedenza-stop",
  titleFa: "رعایت حق تقدم یا توقف کامل؟",
  titleIt: "DARE PRECEDENZA · STOP",
  minutes: 4,
  signs: [40, 41, 42, 43],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی پشت کدام تابلو فقط باید آماده‌ی ایستادن باشی و پشت کدام حتماً باید کامل بایستی؛ تابلوی پیش‌آگهیِ هر کدام را هم تشخیص می‌دهی.",
      why:
        "در بانک سؤال بیش از ۷۰ جمله درباره‌ی همین چهار تابلو هست و بسیاری از آن‌ها یک چیز را می‌سنجند: فرق «راه دادن» با «ایستادن اجباری».",
    },
    {
      kind: "compare",
      title: "دو تابلو، دو دستور متفاوت",
      items: [DARE, STOP],
      rows: [
        { label: "شکل", values: ["مثلث وارونه با حاشیه‌ی قرمز", "هشت‌ضلعی قرمز با نوشته‌ی STOP"] },
        {
          label: "چه باید بکنی",
          values: [
            "سرعت را کم کن و به خودروهای هر دو جهتِ جاده‌ای که واردش می‌شوی راه بده. فقط اگر لازم باشد می‌ایستی.",
            "همیشه روی خط توقف کامل بایست، حتی اگر کسی نمی‌آید. بعد به هر دو جهت راه بده.",
          ],
        },
        {
          label: "کجا نصب می‌شود",
          values: [
            "روی جاده‌ی فرعی، سرِ تقاطع: حداکثر ۲۵ متر (بیرون شهر) یا ۱۰ متر (داخل شهر) تا لبه‌ی جاده‌ی اصلی.",
            "سرِ تقاطع یا تا جای ممکن نزدیک آن؛ جایی که دید کافی نیست یا تقاطع خطرناک است.",
          ],
        },
      ],
      takeaway: "هر دو تابلو یعنی حق تقدم با تو نیست. فرقشان این است که پشت STOP ایستادن اختیاری نیست.",
      rule: "DPR 495/1992, art. 106 c.1–2; art. 107 c.1–2, c.4",
    },
    {
      kind: "sequence",
      title: "پیش‌آگهی: همان مثلث، با یک فاصله بالای سرش",
      body:
        "بیرون از شهر، قبل از تقاطع یک تابلوی پیش‌آگهی می‌بینی: همان مثلث وارونه با پنلی بالای آن. عدد پنل فاصله تا خط توقفِ تقاطع است. اگر روی پنل «STOP» هم نوشته شده باشد، سرِ تقاطع تابلوی STOP منتظرت است.",
      lanes: [
        { from: PREAVVISO_DARE, to: DARE, caption: "۳۲۰ متر جلوتر: DARE PRECEDENZA — اگر لازم شد بایست" },
        { from: PREAVVISO_STOP, to: STOP, caption: "۳۲۰ متر جلوتر: STOP — آنجا حتماً کامل بایست" },
      ],
      takeaway:
        "پیش‌آگهی فقط خبر می‌دهد؛ جای ایستادن سرِ تقاطع است، نه کنار پیش‌آگهی. عدد ۳۲۰ فقط نمونه‌ی تصویر بانک سؤال است؛ روی هر تابلو فاصله‌ی واقعی نوشته می‌شود.",
      rule: "DPR 495/1992, art. 108 c.1, c.3",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "dare la precedenza", base: "dare", fa: "حق تقدم دادن؛ راه دادن" },
        { it: "fermarsi", fa: "ایستادن؛ توقف کردن", note: "در سؤال‌ها «fermarsi» و «arrestarsi» هر دو به معنی ایستادن می‌آیند." },
        { it: "arrestarsi", fa: "توقف کامل کردن" },
        { it: "la striscia di arresto", fa: "خط توقف؛ خط عرضی روی آسفالت" },
        { it: "impegnare l'incrocio", base: "impegnare", fa: "وارد تقاطع شدن" },
        { it: "il preavviso", fa: "پیش‌آگهی؛ تابلویی که از قبل خبر می‌دهد" },
        { it: "occorre", base: "occorrere", fa: "لازم است" },
      ],
    },
    {
      kind: "trap",
      title: "«solo» جواب را لو نمی‌دهد",
      body:
        "بعضی‌ها یاد گرفته‌اند که «solo» یا «soltanto» یعنی جمله غلط است. این قاعده نیست. این دو جمله‌ی واقعیِ بانک را ببین:",
      examples: [
        {
          sourceId: "2184",
          sign: 41,
          textIt: "Il segnale raffigurato obbliga ad arrestarsi soltanto in caso di incrocio con altri veicoli",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "obbliga ad arrestarsi", fa: "مجبور می‌کند کامل بایستی", verb: "obbliga ← obbligare" },
            { it: "soltanto in caso di", fa: "فقط در صورتِ", focus: "limit" },
            { it: "incrocio con altri veicoli", fa: "تلاقی با خودروهای دیگر" },
          ],
          translation:
            "تابلوی نشان‌داده‌شده فقط در صورتی مجبورت می‌کند کامل بایستی که با خودروهای دیگر تلاقی داشته باشی.",
          why: "غلط است، چون دستور STOP شرط ندارد: همیشه باید روی خط توقف کامل بایستی، حتی اگر هیچ خودرویی نیاید.",
        },
        {
          sourceId: "4637",
          textIt:
            "In presenza del segnale DARE PRECEDENZA occorre usare prudenza e moderare la velocità, ma occorre arrestarsi solo in caso di necessità",
          answer: 1,
          chunks: [
            { it: "In presenza del segnale DARE PRECEDENZA", fa: "وقتی تابلوی DARE PRECEDENZA هست" },
            { it: "occorre usare prudenza", fa: "باید احتیاط کرد", verb: "occorre ← occorrere" },
            { it: "e moderare la velocità,", fa: "و سرعت را کم کرد،" },
            { it: "ma occorre arrestarsi", fa: "اما ایستادن لازم است" },
            { it: "solo in caso di necessità", fa: "فقط در صورت لزوم", focus: "limit" },
          ],
          translation:
            "وقتی تابلوی DARE PRECEDENZA هست، باید احتیاط کرد و سرعت را کم کرد، اما ایستادن فقط در صورت لزوم لازم است.",
          why: "درست است، چون قاعده‌ی DARE PRECEDENZA دقیقاً همین است: راه بده و اگر لازم شد بایست.",
        },
      ],
      takeaway:
        "هر دو جمله «solo/soltanto» دارند؛ یکی غلط است و یکی درست. در بانک سؤال ده‌ها جمله‌ی درست هم با «solo» هست. همیشه با قاعده‌ی خودِ تابلو بسنج، نه با یک کلمه.",
    },
  ],
  practice: [
    {
      sourceId: "2165",
      sign: 40,
      textIt: "Il segnale raffigurato obbliga a fermarsi prima di impegnare l'incrocio",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "obbliga a fermarsi", fa: "مجبور می‌کند بایستی", verb: "obbliga ← obbligare" },
        { it: "prima di impegnare l'incrocio", fa: "قبل از وارد شدن به تقاطع" },
      ],
      translation: "تابلوی نشان‌داده‌شده مجبورت می‌کند قبل از وارد شدن به تقاطع بایستی.",
      why:
        "غلط است. DARE PRECEDENZA ایستادن را اجباری نمی‌کند؛ باید راه بدهی و فقط اگر خودرویی می‌آید بایستی. ایستادنِ همیشگی دستور STOP است.",
      rule: "DPR 495/1992, art. 106 c.1; art. 107 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2155",
      sign: 40,
      textIt:
        "In presenza del segnale raffigurato non occorre fermarsi all'incrocio se, rallentando, si ha modo di vedere che non vi sono veicoli in arrivo, sia da destra che da sinistra",
      answer: 1,
      chunks: [
        { it: PRESENZA, fa: PRESENZA_FA },
        {
          it: "non occorre fermarsi",
          fa: "لازم نیست بایستی",
          focus: "negation",
          verb: "occorre ← occorrere",
          note: "«non occorre» یعنی «لازم نیست»، نه «نباید».",
        },
        { it: "all'incrocio", fa: "سرِ تقاطع" },
        { it: "se, rallentando,", fa: "اگر، وقتی سرعت را کم می‌کنی،", focus: "condition", verb: "rallentando ← rallentare" },
        { it: "si ha modo di vedere", fa: "بتوانی ببینی" },
        { it: "che non vi sono veicoli in arrivo,", fa: "که خودرویی در راه نیست،" },
        { it: "sia da destra che da sinistra", fa: "چه از راست، چه از چپ" },
      ],
      translation:
        "وقتی این تابلو هست، اگر هنگام کم کردن سرعت بتوانی ببینی که چه از راست و چه از چپ خودرویی در راه نیست، لازم نیست سرِ تقاطع بایستی.",
      why:
        "درست است. جمله منفی است ولی دقیقاً قاعده‌ی DARE PRECEDENZA را می‌گوید: اگر کسی نمی‌آید، ایستادن اجباری نیست.",
      rule: "DPR 495/1992, art. 106 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2190",
      sign: 41,
      textIt: "Il segnale raffigurato obbliga ad arrestarsi solo se sopraggiungono altri veicoli",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "obbliga ad arrestarsi", fa: "مجبور می‌کند کامل بایستی", verb: "obbliga ← obbligare" },
        { it: "solo se", fa: "فقط اگر", focus: "limit" },
        { it: "sopraggiungono altri veicoli", fa: "خودروهای دیگری از راه برسند", verb: "sopraggiungono ← sopraggiungere" },
      ],
      translation: "تابلوی نشان‌داده‌شده فقط در صورتی مجبورت می‌کند کامل بایستی که خودروهای دیگری از راه برسند.",
      why:
        "غلط است، ولی نه به‌خاطر «solo». دلیلش قاعده‌ی STOP است: ایستادن روی خط توقف همیشه لازم است، چه خودرویی بیاید چه نیاید.",
      rule: "DPR 495/1992, art. 107 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2207",
      sign: 43,
      textIt: "Il segnale raffigurato preannuncia di fermarsi 320 metri dopo il segnale e dare la precedenza",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "preannuncia di fermarsi", fa: "از قبل خبر می‌دهد که باید بایستی", verb: "preannuncia ← preannunciare" },
        { it: "320 metri dopo il segnale", fa: "۳۲۰ متر بعد از تابلو" },
        { it: "e dare la precedenza", fa: "و حق تقدم بدهی" },
      ],
      translation: "تابلوی نشان‌داده‌شده از قبل خبر می‌دهد که ۳۲۰ متر بعد از تابلو باید بایستی و حق تقدم بدهی.",
      why:
        "درست است. پنل «STOP 320 m» یعنی ۳۲۰ متر جلوتر، سرِ تقاطع، تابلوی STOP هست. خودِ این تابلو فقط پیش‌آگهی است؛ ایستادن سرِ تقاطع انجام می‌شود.",
      rule: "DPR 495/1992, art. 108 c.1, c.3",
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        // DARE PRECEDENZA (img 40)
        "2149", "2150", "2151", "2154", "2155", "2157", "2162", "2163", "2165", "2168", "2171", "4394",
        // STOP (img 41)
        "2173", "2174", "2175", "2178", "2180", "2184", "2185", "2186", "2190", "4564",
        // DARE PRECEDENZA rule, no image
        "4637",
      ],
    },
    {
      step: 2,
      sourceIds: [
        "2153", "2169", "2179",
        // PREAVVISO DI DARE PRECEDENZA (img 42)
        "2192", "2193", "2194", "2195", "2197", "2198", "2199", "2200", "2201", "2202",
        // PREAVVISO DI STOP (img 43)
        "2204", "2205", "2206", "2207", "2208", "2210", "2211", "2216",
      ],
    },
  ],
};

// ── Lesson 2 ──────────────────────────────────────────────────────────────────

const lessonDiritto: Lesson = {
  id: "diritto-di-precedenza",
  titleFa: "جاده‌ای که حق تقدم دارد",
  titleIt: "DIRITTO DI PRECEDENZA",
  minutes: 5,
  signs: [52, 46, 47, 44],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "تشخیص بدهی کِی جاده‌ی تو حق تقدم دارد، کجا این حق تمام می‌شود، و از روی تابلوی هشدارِ قبل از تقاطع بفهمی چه کسی باید راه بدهد.",
      why:
        "آیین‌نامه تابلوهای حق تقدم را دو دسته می‌کند: تابلوهایی که می‌گویند «تو راه بده» (درس قبل) و تابلوهایی که می‌گویند «دیگران باید به تو راه بدهند». این درس دسته‌ی دوم است.",
      rule: "DPR 495/1992, art. 105 c.1",
    },
    {
      kind: "diagram",
      diagram: "junction",
      title: "دو روی یک تقاطع",
      body:
        "لوزی زرد یعنی از اینجا جاده‌ی تو حق تقدم دارد. جاده‌های فرعی‌ای که به آن می‌رسند تابلوی DARE PRECEDENZA یا STOP دارند؛ همان تابلوهای درس قبل، از طرف دیگرِ همان تقاطع.",
      callouts: [
        "لوزی زرد روی جاده‌ی اصلی: از اینجا حق تقدم داری.",
        "DARE PRECEDENZA یا STOP روی جاده‌ی فرعی: آن‌ها باید به تو راه بدهند.",
        "تو: حق تقدم داری، ولی نزدیک تقاطع باز هم با نهایت احتیاط می‌رانی.",
      ],
      takeaway:
        "حق تقدم داشتن یعنی دیگران باید راه بدهند، نه اینکه دیگر لازم نیست مراقب باشی. قانون نزدیک هر تقاطع نهایت احتیاط را لازم می‌داند.",
      rule: "DPR 495/1992, art. 112 c.3, art. 113 c.1; Codice della Strada, art. 145 c.1",
    },
    {
      kind: "compare",
      title: "شروع و پایان حق تقدم",
      items: [DIRITTO, FINE_DIRITTO],
      rows: [
        { label: "شکل", values: ["لوزی زرد با حاشیه‌ی سفید", "همان لوزی، با یک نوار سیاه مورب روی آن"] },
        {
          label: "یعنی",
          values: [
            "از اینجا جاده‌ی تو حق تقدم دارد. ممکن است قبل و بعد از هر تقاطع در اندازه‌ی کوچک تکرار شود.",
            "جاده دیگر حق تقدم ندارد. از اینجا، اگر تابلوی دیگری نباشد، قاعده‌ی عمومی برمی‌گردد: به خودرویی که از راست می‌آید راه بده.",
          ],
        },
        {
          label: "نکته",
          values: [
            "این تابلو یعنی «دیگران باید راه بدهند»، نه اینکه احتیاط لازم نیست.",
            "فقط جایی نصب می‌شود که قبلاً لوزی زرد بوده. بیرون شهر، قبل از نقطه‌ی پایان دست‌کم یک بار با پنل فاصله تکرار می‌شود.",
          ],
        },
      ],
      takeaway: "بعد از نوار سیاه، حق تقدمِ تو دیگر خودکار نیست؛ به تابلوی تقاطع بعدی نگاه کن.",
      rule: "DPR 495/1992, art. 111, art. 113; Codice della Strada, art. 145 c.2",
    },
    {
      kind: "compare",
      title: "هشدار قبل از تقاطع: حق تقدم با کیست؟",
      items: [INTERSEZIONE_DIRITTO, INTERSEZIONE_DESTRA],
      rows: [
        {
          label: "علامت داخل مثلث",
          values: [
            "یک خط پهن که از وسط بالا می‌رود و یک خط باریک که آن را قطع می‌کند: خط پهن جاده‌ی توست.",
            "ضربدر ساده: هیچ‌کدام از جاده‌ها بر دیگری برتری ندارد.",
          ],
        },
        {
          label: "در تقاطع",
          values: [
            "حق تقدم با توست؛ خودروهای جاده‌های فرعیِ هر دو طرف باید راه بدهند.",
            "قاعده‌ی عمومی: به خودرویی که از راست می‌آید راه بده.",
          ],
        },
        {
          label: "کجا",
          values: [
            "معمولاً ۱۵۰ متر قبل از تقاطع. شکل‌های دیگرش: تقاطع T (فرعی فقط از یک طرف) و confluenza (ورود با خط شتاب).",
            "معمولاً ۱۵۰ متر قبل از تقاطع، بیشتر در جاده‌های بیرون شهر.",
          ],
        },
      ],
      takeaway: "هر دو مثلثِ هشدارند و فقط از قبل خبر می‌دهند؛ فرقشان این است که حق تقدم با کیست.",
      rule: "DPR 495/1992, art. 81 c.7, art. 105 c.4, art. 109, art. 112 c.1–2",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il diritto di precedenza", fa: "حق تقدم؛ حقِ اول رد شدن" },
        { it: "avere la precedenza", base: "avere", fa: "حق تقدم داشتن" },
        { it: "la strada secondaria", fa: "جاده‌ی فرعی" },
        { it: "l'intersezione", fa: "تقاطع", note: "در سؤال‌ها «l'incrocio» هم به همین معنی می‌آید." },
        { it: "provenienti da destra", base: "provenire", fa: "که از راست می‌آیند" },
        { it: "salvo", fa: "مگر؛ به‌جز", note: "استثنا می‌سازد: «salvo diversa segnalazione» یعنی «مگر اینکه تابلوی دیگری باشد»." },
        { it: "di norma", fa: "معمولاً؛ طبق قاعده‌ی عادی" },
      ],
    },
    {
      kind: "trap",
      title: "«sempre» هم جواب را لو نمی‌دهد",
      body:
        "«sempre» یعنی «همیشه». جمله‌ای با «sempre» فقط وقتی غلط است که واقعاً استثنایی وجود داشته باشد. این دو جمله‌ی بانک را مقایسه کن:",
      examples: [
        {
          sourceId: "2276",
          sign: 46,
          textIt: "Il segnale raffigurato preannuncia sempre un incrocio con precedenza a destra",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "preannuncia", fa: "از قبل خبر می‌دهد", verb: "preannuncia ← preannunciare" },
            { it: "sempre", fa: "همیشه", focus: "always" },
            { it: "un incrocio con precedenza a destra", fa: "از تقاطعی با حق تقدمِ راست" },
          ],
          translation: "تابلوی نشان‌داده‌شده همیشه از قبل از تقاطعی با حق تقدمِ راست خبر می‌دهد.",
          why:
            "غلط است: بعد از پایان حق تقدم، تقاطع بعدی ممکن است تابلوی خودش را داشته باشد، مثلاً STOP. پس «همیشه» اینجا درست نیست.",
        },
        {
          sourceId: "409",
          textIt:
            "Quando si avvicina ad un incrocio, il conducente deve sempre usare la massima prudenza, anche quando gli altri conducenti devono dargli la precedenza",
          answer: 1,
          chunks: [
            { it: "Quando si avvicina ad un incrocio,", fa: "وقتی به تقاطعی نزدیک می‌شود،", verb: "si avvicina ← avvicinarsi" },
            { it: "il conducente deve", fa: "راننده باید", verb: "deve ← dovere" },
            { it: "sempre", fa: "همیشه", focus: "always" },
            { it: "usare la massima prudenza,", fa: "نهایت احتیاط را به کار ببرد،" },
            { it: "anche quando", fa: "حتی وقتی که", focus: "condition" },
            { it: "gli altri conducenti devono dargli la precedenza", fa: "رانندگان دیگر باید به او حق تقدم بدهند" },
          ],
          translation:
            "وقتی راننده به تقاطعی نزدیک می‌شود، همیشه باید نهایت احتیاط را به کار ببرد، حتی وقتی رانندگان دیگر باید به او حق تقدم بدهند.",
          why: "درست است: قانون نزدیک تقاطع همیشه نهایت احتیاط را لازم می‌داند، حتی اگر حق تقدم با تو باشد.",
        },
      ],
      takeaway:
        "هر دو جمله «sempre» دارند؛ یکی غلط، یکی درست. در بانک سؤال ده‌ها جمله‌ی درست با «sempre» هست. از خودت بپرس: آیا واقعاً استثنایی وجود دارد؟",
      rule: "Codice della Strada, art. 145 c.1–2",
    },
  ],
  practice: [
    {
      sourceId: "2356",
      sign: 52,
      textIt: "Il segnale raffigurato comporta la presenza sulle strade che si incrociano del segnale DARE PRECEDENZA o STOP",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "comporta la presenza", fa: "یعنی وجود دارد", verb: "comporta ← comportare" },
        { it: "sulle strade che si incrociano", fa: "روی جاده‌هایی که با آن تقاطع دارند", verb: "si incrociano ← incrociarsi" },
        { it: "del segnale DARE PRECEDENZA o STOP", fa: "تابلوی DARE PRECEDENZA یا STOP" },
      ],
      translation:
        "تابلوی نشان‌داده‌شده یعنی روی جاده‌هایی که با این جاده تقاطع دارند، تابلوی DARE PRECEDENZA یا STOP وجود دارد.",
      why:
        "درست است. جاده‌ی لوزی‌دار حق تقدم دارد، پس جاده‌های فرعیِ تقاطع‌هایش DARE PRECEDENZA یا STOP دارند؛ همان «دو روی یک تقاطع».",
      rule: "DPR 495/1992, art. 112 c.3, art. 113 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2367",
      sign: 52,
      textIt: "In presenza del segnale raffigurato non occorrono particolari cautele perché si ha la precedenza",
      answer: 0,
      chunks: [
        { it: PRESENZA, fa: PRESENZA_FA },
        { it: "non occorrono particolari cautele", fa: "احتیاط خاصی لازم نیست", focus: "negation", verb: "occorrono ← occorrere" },
        { it: "perché si ha la precedenza", fa: "چون حق تقدم داری", focus: "reason" },
      ],
      translation: "وقتی این تابلو هست، احتیاط خاصی لازم نیست، چون حق تقدم داری.",
      why:
        "غلط است. حق تقدم داشتن احتیاط را حذف نمی‌کند؛ قانون نزدیک تقاطع نهایت احتیاط را لازم می‌داند. دلیلِ جمله («چون حق تقدم داری») نتیجه‌ی غلطی گرفته است.",
      rule: "Codice della Strada, art. 145 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2294",
      sign: 47,
      textIt:
        "Il segnale raffigurato preannuncia un incrocio con precedenza rispetto ai veicoli provenienti da sinistra mentre si deve dare la precedenza a quelli provenienti da destra",
      answer: 0,
      chunks: [
        { it: "Il segnale raffigurato preannuncia un incrocio", fa: "تابلو از تقاطعی خبر می‌دهد", verb: "preannuncia ← preannunciare" },
        { it: "con precedenza rispetto ai veicoli provenienti da sinistra", fa: "که در آن نسبت به خودروهای سمت چپ حق تقدم داری" },
        { it: "mentre", fa: "در حالی که", focus: "contrast" },
        { it: "si deve dare la precedenza", fa: "باید حق تقدم داد", verb: "deve ← dovere" },
        { it: "a quelli provenienti da destra", fa: "به آن‌هایی که از راست می‌آیند" },
      ],
      translation:
        "تابلوی نشان‌داده‌شده از تقاطعی خبر می‌دهد که در آن نسبت به خودروهایی که از چپ می‌آیند حق تقدم داری، در حالی که باید به خودروهایی که از راست می‌آیند حق تقدم بدهی.",
      why:
        "غلط است. با این تابلو حق تقدم در تقاطع با توست، هم نسبت به راست و هم نسبت به چپ. «به راست راه بده» معنیِ تابلوی ضربدر است.",
      rule: "DPR 495/1992, art. 105 c.1 (classe II), art. 112 c.1",
      conceptStep: 3,
    },
    {
      sourceId: "2270",
      sign: 46,
      textIt: "Il segnale raffigurato indica che dopo di esso si dovrà, di norma, dare la precedenza a destra",
      answer: 1,
      chunks: [
        { it: "Il segnale raffigurato indica", fa: "تابلوی نشان‌داده‌شده نشان می‌دهد", verb: "indica ← indicare" },
        { it: "che dopo di esso", fa: "که بعد از آن" },
        { it: "si dovrà,", fa: "باید (از این به بعد)،", verb: "dovrà ← dovere (آینده)" },
        { it: "di norma,", fa: "معمولاً،", focus: "condition", note: "«di norma» یعنی «اگر تابلوی دیگری نباشد»." },
        { it: "dare la precedenza a destra", fa: "به راست حق تقدم داد" },
      ],
      translation: "تابلوی نشان‌داده‌شده نشان می‌دهد که بعد از آن، معمولاً باید به راست حق تقدم داد.",
      why:
        "درست است. بعد از پایان حق تقدم، قاعده‌ی عمومی برمی‌گردد: راه دادن به راست. «di norma» جا را برای استثنا باز می‌گذارد، مثلاً اگر تابلوی STOP باشد.",
      rule: "DPR 495/1992, art. 111 c.1; Codice della Strada, art. 145 c.2",
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        // DIRITTO DI PRECEDENZA (img 52)
        "2347", "2351", "2353", "2356", "2357", "2358", "2361", "2364", "2367",
        // The other side of the same junction: DARE PRECEDENZA / STOP placement
        "2161", "2177",
        // Prudence at junctions, no image
        "409",
      ],
    },
    {
      step: 2,
      sourceIds: [
        "2354", "2368",
        // FINE DEL DIRITTO DI PRECEDENZA (img 46)
        "2262", "2263", "2265", "2266", "2267", "2268", "2269", "2270", "2273", "2274", "2276",
      ],
    },
    {
      step: 3,
      sourceIds: [
        // INTERSEZIONE CON DIRITTO DI PRECEDENZA (img 47)
        "2284", "2285", "2286", "2287", "2289", "2290", "2291", "2294", "2296", "2297", "4569",
        // INTERSEZIONE CON PRECEDENZA A DESTRA (img 44)
        "2218", "2220", "2222", "2226", "4565",
      ],
    },
  ],
};

// ── Lesson 3 ──────────────────────────────────────────────────────────────────

const lessonSensiUnici: Lesson = {
  id: "sensi-unici-alternati",
  titleFa: "باریکه‌ای که هر بار یک طرف رد می‌شود",
  titleIt: "SENSO UNICO ALTERNATO",
  minutes: 4,
  signs: [45, 53],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "در باریکه‌ای که هر بار فقط یک جهت می‌تواند رد شود، از روی تابلو بفهمی باید صبر کنی یا حق تقدم با توست.",
      why:
        "این دو تابلو فلش‌های تقریباً یکسانی دارند و معنی‌شان برعکس است. در بانک سؤال بیش از ۵۰ جمله درباره‌ی همین دو تابلو هست.",
    },
    {
      kind: "compare",
      title: "فلش‌های مشابه، دستور برعکس",
      items: [SUA_DARE, SUA_DIRITTO],
      rows: [
        { label: "شکل", values: ["دایره با حاشیه‌ی قرمز", "مربع آبی"] },
        {
          label: "فلش قرمز",
          values: ["فلشِ رو به بالا (جهت تو) قرمز است.", "فلشِ رو به پایین (جهت مقابل) قرمز است."],
        },
        {
          label: "یعنی",
          values: [
            "به خودروهایی که از روبه‌رو می‌آیند راه بده؛ صبر کن تا باریکه خالی شود.",
            "حق تقدم با توست و خودروهای روبه‌رو باید صبر کنند؛ ولی قبل از ورود مطمئن شو که واقعاً راه داده‌اند.",
          ],
        },
      ],
      takeaway: "در هر دو تابلو، فلشِ رو به بالا جهتِ خودِ توست و فلشِ قرمز جهتی است که باید صبر کند.",
      rule: "DPR 495/1992, art. 110 c.1, art. 114",
    },
    {
      kind: "diagram",
      diagram: "narrowing",
      title: "دو سرِ یک باریکه",
      body:
        "باریکه‌ای که فقط یک ردیف خودرو از آن رد می‌شود، در دو سرش دو تابلوی متفاوت دارد: یک طرف دایره (راه بده)، طرف دیگر مربع (حق تقدم با توست).",
      callouts: [
        "سمت تو: تابلوی دایره‌ای. صبر کن تا خودروی روبه‌رو رد شود.",
        "سمت مقابل: تابلوی مربعی. آن‌ها حق تقدم دارند.",
        "خودِ باریکه: هر بار فقط یک جهت رد می‌شود.",
      ],
      takeaway:
        "این تابلوها برای هر باریک شدنِ جاده نیستند؛ فقط جایی که عبور نوبتی و یک‌طرفه برقرار شده. اگر دو سرِ باریکه از هم دیده نشوند یا بیش از ۵۰ متر فاصله داشته باشند، قانون برای آن چراغ راهنمایی (یا هدایت دستی ترافیک) در نظر گرفته است.",
      rule: "DPR 495/1992, art. 110 c.1, c.3; art. 114",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la strettoia", fa: "باریکه؛ جایی که جاده تنگ می‌شود" },
        { it: "il senso unico alternato", fa: "یک‌طرفه‌ی نوبتی؛ هر بار یک جهت رد می‌شود" },
        { it: "il senso opposto", fa: "جهت مخالف", note: "«il senso contrario» هم همین معنی را دارد." },
        { it: "provenienti di fronte", base: "provenire", fa: "که از روبه‌رو می‌آیند" },
        { it: "accertarsi", fa: "مطمئن شدن", note: "در سؤال‌ها به شکل «accertandosi» هم می‌آید." },
        { it: "contemporaneamente", fa: "هم‌زمان" },
      ],
    },
    {
      kind: "trap",
      title: "جمله‌ای با دلیلِ غلط، غلط است",
      body:
        "گاهی نیمه‌ی اول جمله درست است ولی بعد از «perché» (چون) دلیلی می‌آید که غلط است. این دو جمله را مقایسه کن:",
      examples: [
        {
          sourceId: "2384",
          sign: 53,
          textIt:
            "In presenza del segnale raffigurato si deve usare prudenza nella strettoia perché la circolazione si svolge a doppio senso",
          answer: 0,
          chunks: [
            { it: PRESENZA, fa: PRESENZA_FA },
            { it: "si deve usare prudenza", fa: "باید احتیاط کرد", verb: "deve ← dovere" },
            { it: "nella strettoia", fa: "در باریکه" },
            { it: "perché", fa: "چون", focus: "reason" },
            { it: "la circolazione si svolge a doppio senso", fa: "تردد دوطرفه انجام می‌شود", verb: "si svolge ← svolgersi" },
          ],
          translation: "وقتی این تابلو هست، باید در باریکه احتیاط کرد، چون تردد در آن دوطرفه انجام می‌شود.",
          why: "غلط است. احتیاط لازم است، ولی دلیلش غلط است: در باریکه تردد نوبتی و یک‌طرفه است، نه هم‌زمان دوطرفه.",
        },
        {
          sourceId: "2262",
          sign: 46,
          textIt: "Il segnale raffigurato invita a maggiore prudenza perché non si ha più diritto di precedenza",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "invita a maggiore prudenza", fa: "به احتیاط بیشتر دعوت می‌کند", verb: "invita ← invitare" },
            { it: "perché", fa: "چون", focus: "reason" },
            { it: "non si ha più", fa: "دیگر نداری", focus: "negation", note: "«non … più» یعنی «دیگر … نه»." },
            { it: "diritto di precedenza", fa: "حق تقدم" },
          ],
          translation: "تابلوی نشان‌داده‌شده به احتیاط بیشتر دعوت می‌کند، چون دیگر حق تقدم نداری.",
          why: "درست است: این تابلوی پایان حق تقدم است (درس ۲) و دلیلش هم درست است.",
        },
      ],
      takeaway: "وقتی «perché» می‌بینی، دو چیز را جدا بسنج: خودِ ادعا و دلیلش. هر دو باید درست باشند.",
    },
  ],
  practice: [
    {
      sourceId: "2239",
      sign: 45,
      textIt: "Il segnale raffigurato impone di dare la precedenza ai veicoli provenienti dal senso opposto",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "impone di dare la precedenza", fa: "دستور می‌دهد حق تقدم بدهی", verb: "impone ← imporre" },
        { it: "ai veicoli provenienti dal senso opposto", fa: "به خودروهایی که از جهت مخالف می‌آیند" },
      ],
      translation: "تابلوی نشان‌داده‌شده دستور می‌دهد به خودروهایی که از جهت مخالف می‌آیند حق تقدم بدهی.",
      why: "درست است. دایره‌ی قرمز با فلشِ قرمزِ رو به بالا یعنی جهت تو باید صبر کند و به جهت مقابل راه بدهد.",
      rule: "DPR 495/1992, art. 110 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2380",
      sign: 53,
      textIt: "In presenza del segnale raffigurato si deve dare la precedenza ai veicoli che provengono dal senso opposto",
      answer: 0,
      chunks: [
        { it: PRESENZA, fa: PRESENZA_FA },
        { it: "si deve dare la precedenza", fa: "باید حق تقدم داد", verb: "deve ← dovere" },
        { it: "ai veicoli che provengono dal senso opposto", fa: "به خودروهایی که از جهت مخالف می‌آیند", verb: "provengono ← provenire" },
      ],
      translation: "وقتی این تابلو هست، باید به خودروهایی که از جهت مخالف می‌آیند حق تقدم داد.",
      why:
        "غلط است. ادعا تقریباً همان جمله‌ی سؤال قبل است، ولی تابلو فرق دارد: مربع آبی یعنی حق تقدم با توست و جهت مقابل (فلش قرمز) باید صبر کند.",
      rule: "DPR 495/1992, art. 114",
      conceptStep: 1,
    },
    {
      sourceId: "2373",
      sign: 53,
      textIt: "In presenza del segnale raffigurato dobbiamo procedere con cautela, anche se abbiamo la precedenza",
      answer: 1,
      chunks: [
        { it: PRESENZA, fa: PRESENZA_FA },
        { it: "dobbiamo procedere con cautela,", fa: "باید با احتیاط جلو برویم،", verb: "dobbiamo ← dovere" },
        { it: "anche se", fa: "حتی اگر", focus: "condition" },
        { it: "abbiamo la precedenza", fa: "حق تقدم داریم", verb: "abbiamo ← avere" },
      ],
      translation: "وقتی این تابلو هست، باید با احتیاط جلو برویم، حتی اگر حق تقدم داریم.",
      why: "درست است. حق تقدم با توست، ولی قبل از ورود به باریکه باید مطمئن شوی خودروی روبه‌رو واقعاً راه داده است.",
      rule: "DPR 495/1992, art. 114; Codice della Strada, art. 140 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2252",
      sign: 45,
      textIt: "Il segnale raffigurato si incontra prima di un qualsiasi restringimento della carreggiata",
      answer: 0,
      chunks: [
        { it: "Il segnale raffigurato si incontra", fa: "این تابلو دیده می‌شود", verb: "si incontra ← incontrarsi" },
        { it: "prima di", fa: "قبل از" },
        { it: "un qualsiasi", fa: "هر نوع", focus: "always", note: "«qualsiasi» یعنی «هر… بدون استثنا»." },
        { it: "restringimento della carreggiata", fa: "باریک شدنِ سواره‌رو" },
      ],
      translation: "تابلوی نشان‌داده‌شده قبل از هر نوع باریک شدنِ سواره‌رو دیده می‌شود.",
      why:
        "غلط است. این تابلو فقط سرِ باریکه‌هایی نصب می‌شود که عبور در آن‌ها نوبتی و یک‌طرفه است. برای باریک شدنِ معمولی جاده، تابلوی هشدارِ مثلثیِ جداگانه‌ای وجود دارد.",
      rule: "DPR 495/1992, art. 110 c.1",
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        // DARE PRECEDENZA NEL SENSO UNICO ALTERNATO (img 45)
        "2229", "2231", "2232", "2233", "2239", "2240", "2247", "2250", "2255", "2257",
        // DIRITTO DI PRECEDENZA NEL SENSO UNICO ALTERNATO (img 53)
        "2371", "2372", "2373", "2374", "2380", "2381",
      ],
    },
    {
      step: 2,
      sourceIds: [
        "2230", "2234", "2235", "2238", "2241", "2248", "2249", "2251", "2252", "2254",
        "2382", "2383", "2384",
      ],
    },
  ],
};

export const PILOT_CHAPTER: Chapter = {
  id: "segnali-precedenza",
  topicIds: [4],
  nameIt: "Segnali di precedenza",
  titleFa: "تابلوهای حق تقدم",
  summaryFa: "چه کسی اول رد می‌شود؟ سه درس کوتاه درباره‌ی تابلوهایی که این را تعیین می‌کنند.",
  reviewedOn: "2026-09-26",
  sources: [
    {
      label: "Codice della Strada (D.Lgs. 285/1992), artt. 140, 145",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    {
      label: "Regolamento di esecuzione (DPR 495/1992), artt. 81, 105–114",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1992-12-16;495",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023)",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [lessonDareStop, lessonDiritto, lessonSensiUnici],
};

/** Content steps + one step per practice question + the completion step. */
export function lessonStepCount(lesson: Lesson): number {
  return lesson.steps.length + lesson.practice.length + 1;
}

/** Every chapter, in the order learners are guided through them. */
export const CHAPTERS: Chapter[] = [PILOT_CHAPTER, INCROCI_CHAPTER, VELOCITA_CHAPTER, SORPASSO_CHAPTER];

export function findLesson(lessonId: string): Lesson | null {
  for (const chapter of CHAPTERS) {
    const lesson = chapter.lessons.find((l) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return null;
}

export function chapterOfLesson(lessonId: string): Chapter | null {
  return CHAPTERS.find((chapter) => chapter.lessons.some((l) => l.id === lessonId)) ?? null;
}

export interface LessonLink {
  lessonId: string;
  titleFa: string;
  step: number;
}

const LESSON_BY_SOURCE_ID = new Map<string, LessonLink>();
for (const chapter of CHAPTERS) {
  for (const lesson of chapter.lessons) {
    for (const group of lesson.related) {
      for (const sourceId of group.sourceIds) {
        LESSON_BY_SOURCE_ID.set(sourceId, { lessonId: lesson.id, titleFa: lesson.titleFa, step: group.step });
      }
    }
  }
}

/** The lesson section that teaches this bank question, if an explicit mapping exists. */
export function lessonLinkForSourceId(sourceId: string | null | undefined): LessonLink | null {
  return sourceId ? LESSON_BY_SOURCE_ID.get(sourceId) ?? null : null;
}

/** All mapped source ids of a lesson, practice questions first. */
export function relatedSourceIds(lesson: Lesson): string[] {
  const ids = new Set(lesson.practice.map((question) => question.sourceId));
  for (const group of lesson.related) group.sourceIds.forEach((id) => ids.add(id));
  return [...ids];
}
