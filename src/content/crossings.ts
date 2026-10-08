/**
 * src/content/crossings.ts
 * Intersection scenarios for the "Who goes first?" exercises
 * (chapter: Precedenza negli incroci).
 *
 * Each scenario is an original redrawing of one bank figure: same arms, same
 * vehicle letters, same paths, same signs. The bank's own drawings carry a
 * third-party mark (patentati.it) and their licence is not established, so we
 * never annotate or animate them — we redraw the facts and label the result
 * as an educational exercise.
 *
 * Trust rules:
 *  - `phases` is the bank's order, not ours. tests/crossings.test.ts proves it
 *    follows from the VERO statements in `evidence` and contradicts every
 *    FALSO one; `npm run verify:lessons` checks those snapshots against D1.
 *  - Every figure below was read by hand (vehicle, entry arm, exit arm, signs,
 *    rails). Figures whose geometry or order we could not verify with
 *    confidence (e.g. the circular "everyone has someone on the right" cases,
 *    617/638/642) are deliberately not used.
 *  - Arm angles: 0 = right of the figure, 90 = top. `move` is checked against
 *    the angles in tests, so a typo cannot turn a left turn into a right one.
 */
import type { Crossing } from "./lessons.js";

const CROSS = [
  { id: "E", angle: 0 },
  { id: "N", angle: 90 },
  { id: "W", angle: 180 },
  { id: "S", angle: 270 },
];

/** Figure 640 — four-way junction, no signs, three vehicles straight on, L already leaving. */
export const FIG_640: Crossing = {
  id: "fig-640",
  figure: 640,
  arms: CROSS,
  vehicles: [
    { id: "R", kind: "car", from: "E", to: "W", move: "straight" },
    { id: "D", kind: "car", from: "S", to: "N", move: "straight" },
    { id: "B", kind: "truck", from: "W", to: "E", move: "straight" },
    { id: "L", kind: "car", from: "W", to: "E", move: "straight", leaving: true },
  ],
  phases: [["R"], ["D"], ["B"]],
  explain: [
    { text: "R از راستِ تصویر می‌آید و رو به چپ می‌راند؛ پس راستِ R بالای تصویر است و آنجا کسی نیست. تابلو و ریل هم نیست. R اول رد می‌شود." },
    { text: "D از پایین می‌آید و رو به بالا می‌راند؛ راستش سمت راستِ تصویر است، جایی که R بود. حالا که R رد شده، نوبت D است." },
    { text: "B (کامیون) از چپ می‌آید و رو به راستِ تصویر می‌راند؛ راستش پایینِ تصویر است، جایی که D بود. B آخر رد می‌شود. L از تقاطع بیرون رفته و در این ترتیب نیست." },
  ],
  waits: {
    D: "D باید صبر کند تا R رد شود: D رو به بالا می‌راند، پس راستش سمت راستِ تصویر است و R از آنجا می‌آید.",
    B: "B باید صبر کند تا D رد شود: B رو به راستِ تصویر می‌راند، پس راستش پایینِ تصویر است و D از آنجا می‌آید.",
  },
  evidence: [
    {
      sourceId: "4781",
      textIt: "Secondo le norme di precedenza possono impegnare l'incrocio rappresentato in figura il veicolo D dopo l'attraversamento del veicolo R",
      answer: 1,
      before: [["R", "D"]],
    },
    {
      sourceId: "4784",
      textIt: "Secondo le norme di precedenza possono impegnare l'incrocio rappresentato in figura il veicolo B dopo l'attraversamento dei veicoli R e D",
      answer: 1,
      before: [["R", "B"], ["D", "B"]],
    },
    {
      sourceId: "4786",
      textIt: "Secondo le norme di precedenza possono impegnare l'incrocio rappresentato in figura il veicolo D prima degli altri veicoli",
      answer: 0,
      before: [["D", "R"], ["D", "B"]],
    },
    {
      sourceId: "4785",
      textIt: "Secondo le norme di precedenza possono impegnare l'incrocio rappresentato in figura il veicolo B contemporaneamente al veicolo R e prima di quello D",
      answer: 0,
      together: [["B", "R"]],
      before: [["B", "D"]],
    },
  ],
};

/** Figure 633 — DARE PRECEDENZA on the left and right arms; N (no sign) turns left. */
export const FIG_633: Crossing = {
  id: "fig-633",
  figure: 633,
  arms: [
    { id: "E", angle: 0, sign: "dare" },
    { id: "N", angle: 90 },
    { id: "W", angle: 180, sign: "dare" },
    { id: "S", angle: 270 },
  ],
  vehicles: [
    { id: "N", kind: "car", from: "S", to: "W", move: "left" },
    { id: "A", kind: "car", from: "E", to: "W", move: "straight" },
    { id: "R", kind: "car", from: "W", to: "N", move: "left" },
  ],
  phases: [["N"], ["A"], ["R"]],
  explain: [
    {
      text: "بازوی N تابلو ندارد؛ جلوی A و R تابلوی DARE PRECEDENZA و مثلث‌های سفید است. پس A و R به N راه می‌دهند، حتی با اینکه N به چپ می‌پیچد و از چپِ A می‌آید. N اول رد می‌شود.",
      signs: ["E", "W"],
    },
    {
      text: "حالا A و R می‌مانند؛ هر دو تابلو دارند، پس بین خودشان قاعده‌ی عادی است. R به چپ می‌پیچد و A روبه‌رویش مستقیم می‌آید: هنگام پیچیدن، A از راستِ R وارد مسیرش می‌شود. پس A زودتر رد می‌شود.",
    },
    { text: "R آخر رد می‌شود: اول به N (به‌خاطر تابلو) و بعد به A (چون به چپ می‌پیچد) راه داده است." },
  ],
  waits: {
    A: "A باید صبر کند تا N رد شود: جلوی A تابلوی DARE PRECEDENZA است و بازوی N تابلو ندارد. تابلو یعنی به هر دو جهت راه بده، نه فقط به راست.",
    R: "R باید صبر کند تا N و A رد شوند: جلوی R تابلوی DARE PRECEDENZA است، و چون به چپ می‌پیچد به A که از روبه‌رو می‌آید هم راه می‌دهد.",
  },
  evidence: [
    {
      sourceId: "5050",
      textIt: "Nell'intersezione di figura l'ordine di transito dei veicoli è: N, A, R",
      answer: 1,
      before: [["N", "A"], ["A", "R"]],
    },
    {
      sourceId: "5052",
      textIt: "Nell'intersezione di figura il veicolo A può transitare prima del veicolo R, ma dopo il veicolo N",
      answer: 1,
      before: [["A", "R"], ["N", "A"]],
    },
    {
      sourceId: "5053",
      textIt: "Nell'intersezione di figura l'ordine di transito dei veicoli è: A, N, R",
      answer: 0,
      before: [["A", "N"], ["N", "R"]],
    },
    {
      sourceId: "5054",
      textIt: "Nell'intersezione di figura l'ordine di precedenza dei veicoli è: N, R, A",
      answer: 0,
      before: [["N", "R"], ["R", "A"]],
    },
  ],
};

/** Figure 614 — no signs, one diagonal road; T turns left. A pure "right-hand" chain. */
export const FIG_614: Crossing = {
  id: "fig-614",
  figure: 614,
  arms: [
    { id: "E", angle: 0 },
    { id: "NW", angle: 127 },
    { id: "W", angle: 180 },
    { id: "SE", angle: -53 },
  ],
  vehicles: [
    { id: "R", kind: "car", from: "W", to: "E", move: "straight" },
    { id: "A", kind: "car", from: "NW", to: "SE", move: "straight" },
    { id: "T", kind: "car", from: "E", to: "SE", move: "left" },
  ],
  phases: [["R"], ["A"], ["T"]],
  explain: [
    { text: "R از چپِ تصویر رو به راست می‌راند؛ راستش پایینِ تصویر است و جاده‌ی پایین خالی است. تابلو و ریل هم نیست. R اول رد می‌شود." },
    { text: "A از بالا-چپ مورب پایین می‌آید؛ راستش سمت چپِ تصویر است، جایی که R بود. بعد از R نوبت A است." },
    { text: "T از راستِ تصویر رو به چپ می‌راند و به چپ می‌پیچد؛ راستش بالای تصویر است و A از آنجا می‌آمد. پس T آخر است (مسیر R را هم قطع می‌کرد)." },
  ],
  waits: {
    A: "A باید صبر کند تا R رد شود: A به سمت پایین-راست می‌راند، پس راستش سمت چپِ تصویر است و R از آنجا می‌آید.",
    T: "T باید صبر کند تا A رد شود: T رو به چپِ تصویر می‌راند، پس راستش بالای تصویر است و A از آنجا می‌آید.",
  },
  evidence: [
    {
      sourceId: "5034",
      textIt: "Nell'incrocio rappresentato nella figura i veicoli transitano nell'ordine: R, A, T",
      answer: 1,
      before: [["R", "A"], ["A", "T"]],
    },
    {
      sourceId: "5032",
      textIt: "Nell'incrocio rappresentato nella figura il veicolo A deve attendere il transito del veicolo R",
      answer: 1,
      before: [["R", "A"]],
    },
    {
      sourceId: "5036",
      textIt: "Nell'incrocio rappresentato nella figura i veicoli transitano nell'ordine: R, T, A",
      answer: 0,
      before: [["R", "T"], ["T", "A"]],
    },
    {
      sourceId: "5037",
      textIt: "Nell'incrocio rappresentato nella figura i veicoli transitano nell'ordine: T, A, R",
      answer: 0,
      before: [["T", "A"], ["A", "R"]],
    },
    {
      sourceId: "5038",
      textIt: "Nell'incrocio rappresentato nella figura il veicolo T transita prima degli altri veicoli",
      answer: 0,
      before: [["T", "R"], ["T", "A"]],
    },
  ],
};

/** Figure 613 — tram tracks along the left–right road; the tram goes first. */
export const FIG_613: Crossing = {
  id: "fig-613",
  figure: 613,
  arms: [
    { id: "E", angle: 0, lanes: 2, tram: true },
    { id: "N", angle: 90 },
    { id: "W", angle: 180, lanes: 2, tram: true },
    { id: "S", angle: 270 },
  ],
  vehicles: [
    { id: "T", kind: "tram", from: "E", to: "W", move: "straight", lane: 0 },
    { id: "A", kind: "truck", from: "E", to: "W", move: "straight", lane: 1 },
    { id: "O", kind: "car", from: "N", to: "S", move: "straight" },
  ],
  phases: [["T"], ["O"], ["A"]],
  explain: [
    { text: "T تراموا است و روی ریل حرکت می‌کند. سرِ خط تراموا، همه به وسیله‌ی ریلی راه می‌دهند (اگر تابلوی دیگری نباشد). T اول رد می‌شود." },
    { text: "O از بالا رو به پایین می‌راند؛ راستش سمت چپِ تصویر است و آنجا کسی نیست. فقط منتظر تراموا بود. حالا O رد می‌شود." },
    { text: "A (کامیون) رو به چپِ تصویر می‌راند؛ راستش بالای تصویر است، جایی که O بود. پس A آخر است. کامیون بودن امتیازی نمی‌دهد." },
  ],
  waits: {
    O: "O باید صبر کند تا تراموا رد شود: مسیر O از روی ریل می‌گذرد و وسیله‌ی ریلی حق تقدم دارد.",
    A: "A باید صبر کند تا O رد شود: A رو به چپِ تصویر می‌راند، پس راستش بالای تصویر است و O از آنجا می‌آید.",
  },
  evidence: [
    {
      sourceId: "4934",
      textIt: "Secondo le norme di precedenza nell'incrocio rappresentato in figura i veicoli transitano nell'ordine: T, O, A",
      answer: 1,
      before: [["T", "O"], ["O", "A"]],
    },
    {
      sourceId: "4932",
      textIt: "Secondo le norme di precedenza nell'incrocio rappresentato in figura il veicolo A deve attendere il transito del veicolo O",
      answer: 1,
      before: [["O", "A"]],
    },
    {
      sourceId: "4939",
      textIt: "Secondo le norme di precedenza nell'incrocio rappresentato in figura i veicoli transitano nell'ordine: T, A, O",
      answer: 0,
      before: [["T", "A"], ["A", "O"]],
    },
    {
      sourceId: "4940",
      textIt: "Secondo le norme di precedenza nell'incrocio rappresentato in figura i veicoli A e T transitano contemporaneamente",
      answer: 0,
      together: [["A", "T"]],
    },
    {
      sourceId: "4936",
      textIt: "Secondo le norme di precedenza nell'incrocio rappresentato in figura il veicolo T deve attendere il transito del veicolo O",
      answer: 0,
      before: [["O", "T"]],
    },
  ],
};

/** Figure 643 — a right turn, two straight on, and a left turn that still beats L. */
export const FIG_643: Crossing = {
  id: "fig-643",
  figure: 643,
  arms: CROSS,
  vehicles: [
    { id: "H", kind: "car", from: "N", to: "W", move: "right" },
    { id: "D", kind: "car", from: "E", to: "W", move: "straight" },
    { id: "B", kind: "car", from: "S", to: "W", move: "left" },
    { id: "L", kind: "car", from: "W", to: "E", move: "straight" },
  ],
  phases: [["H"], ["D"], ["B"], ["L"]],
  explain: [
    { text: "H از بالا می‌آید و نزدیک لبه به راست می‌پیچد. این مسیرِ کوتاه با مسیر هیچ‌کس قطع نمی‌شود، و قاعده‌ی راست فقط جایی است که مسیرها قطع شوند. H اول رد می‌شود." },
    { text: "D از راستِ تصویر رو به چپ می‌راند؛ راستش بالای تصویر است، جایی که H بود. بعد از H نوبت D است." },
    { text: "B از پایین می‌آید و به چپ می‌پیچد؛ راستش سمت راستِ تصویر است، جایی که D بود. روبه‌رویش کسی مستقیم نمی‌آید (H پیچیده و رفته). پس B سوم است، با اینکه به چپ می‌پیچد." },
    { text: "L از چپِ تصویر رو به راست می‌راند؛ راستش پایینِ تصویر است، جایی که B بود. L آخر است: مستقیم رفتن حق تقدم نمی‌آورد." },
  ],
  waits: {
    D: "D باید صبر کند تا H رد شود: D رو به چپِ تصویر می‌راند، پس راستش بالای تصویر است و H از آنجا می‌آید.",
    B: "B باید صبر کند تا D رد شود: B رو به بالا می‌راند، پس راستش سمت راستِ تصویر است و D از آنجا می‌آید.",
    L: "L باید صبر کند تا B رد شود: L رو به راستِ تصویر می‌راند، پس راستش پایینِ تصویر است و B از آنجا می‌آید. اینکه B به چپ می‌پیچد چیزی را عوض نمی‌کند.",
  },
  evidence: [
    {
      sourceId: "4827",
      textIt: "Giungendo all'incrocio rappresentato in figura i veicoli passano nel seguente ordine: H, D, B, L",
      answer: 1,
      before: [["H", "D"], ["D", "B"], ["B", "L"]],
    },
    {
      sourceId: "4837",
      textIt: "Giungendo all'incrocio rappresentato in figura i veicoli passano nel seguente ordine: H, D, L, B",
      answer: 0,
      before: [["H", "D"], ["D", "L"], ["L", "B"]],
    },
    {
      sourceId: "4836",
      textIt: "Giungendo all'incrocio rappresentato in figura i veicoli L e D passano contemporaneamente",
      answer: 0,
      together: [["L", "D"]],
    },
    {
      sourceId: "4835",
      textIt: "Giungendo all'incrocio rappresentato in figura il veicolo H deve attendere che siano transitati i veicoli D e B",
      answer: 0,
      before: [["D", "H"], ["B", "H"]],
    },
  ],
};

/** Figure 637 — C and A leave the same arm without crossing paths, so they move together. */
export const FIG_637: Crossing = {
  id: "fig-637",
  figure: 637,
  arms: [
    { id: "E", angle: 0 },
    { id: "N", angle: 90 },
    { id: "W", angle: 180 },
    { id: "S", angle: 270, lanes: 2 },
  ],
  vehicles: [
    { id: "L", kind: "car", from: "E", to: "W", move: "straight" },
    { id: "D", kind: "car", from: "W", to: "E", move: "straight" },
    { id: "A", kind: "car", from: "S", to: "W", move: "left", lane: 0 },
    { id: "C", kind: "car", from: "S", to: "N", move: "straight", lane: 1 },
  ],
  phases: [["L"], ["C", "A"], ["D"]],
  explain: [
    { text: "L از راستِ تصویر رو به چپ می‌راند؛ راستش بالای تصویر است و آنجا کسی نیست. L اول رد می‌شود." },
    { text: "C و A هر دو از پایین می‌آیند و L را در سمت راستشان داشتند. C مستقیم می‌رود و A از خطِ کنارِ وسط به چپ می‌پیچد؛ مسیرشان همدیگر را قطع نمی‌کند، پس با هم رد می‌شوند." },
    { text: "D از چپِ تصویر رو به راست می‌راند؛ راستش پایینِ تصویر است، جایی که C و A بودند. D آخر است." },
  ],
  waits: {
    C: "C باید صبر کند تا L رد شود: C رو به بالا می‌راند، پس راستش سمت راستِ تصویر است و L از آنجا می‌آید.",
    A: "A باید صبر کند تا L رد شود: A رو به بالا می‌راند، پس راستش سمت راستِ تصویر است و L از آنجا می‌آید.",
    D: "D باید صبر کند تا C و A رد شوند: D رو به راستِ تصویر می‌راند، پس راستش پایینِ تصویر است و آن دو از آنجا می‌آیند.",
  },
  evidence: [
    {
      sourceId: "4815",
      textIt: "Nell'attraversare l'incrocio in figura i veicoli C e A passano contemporaneamente dopo il veicolo L",
      answer: 1,
      together: [["C", "A"]],
      before: [["L", "C"], ["L", "A"]],
    },
    {
      sourceId: "4813",
      textIt: "Nell'attraversare l'incrocio in figura il veicolo L passa per primo",
      answer: 1,
      before: [["L", "C"], ["L", "A"], ["L", "D"]],
    },
    {
      sourceId: "4814",
      textIt: "Nell'attraversare l'incrocio in figura il veicolo D è l'ultimo a passare",
      answer: 1,
      before: [["L", "D"], ["C", "D"], ["A", "D"]],
    },
    {
      sourceId: "4822",
      textIt: "Nell'attraversare l'incrocio in figura i veicoli passano nel seguente ordine: C, A, D, L",
      answer: 0,
      before: [["C", "A"], ["A", "D"], ["D", "L"]],
    },
    {
      sourceId: "4823",
      textIt: "Nell'attraversare l'incrocio in figura i veicoli passano nel seguente ordine: C, L, A, D",
      answer: 0,
      before: [["C", "L"], ["L", "A"], ["A", "D"]],
    },
    {
      sourceId: "4824",
      textIt: "Nell'attraversare l'incrocio in figura i veicoli D e L passano contemporaneamente prima del veicolo A",
      answer: 0,
      together: [["D", "L"]],
      before: [["D", "A"], ["L", "A"]],
    },
  ],
};

/** Figure 655 — top/bottom road has no signs; left and right arms have DARE PRECEDENZA. */
export const FIG_655: Crossing = {
  id: "fig-655",
  figure: 655,
  arms: [
    { id: "E", angle: 0, sign: "dare" },
    { id: "N", angle: 90 },
    { id: "W", angle: 180, sign: "dare" },
    { id: "S", angle: 270 },
  ],
  vehicles: [
    { id: "A", kind: "car", from: "N", to: "E", move: "left" },
    { id: "S", kind: "truck", from: "S", to: "N", move: "straight" },
    { id: "R", kind: "truck", from: "E", to: "S", move: "left" },
    { id: "E", kind: "car", from: "W", to: "E", move: "straight" },
  ],
  phases: [["S"], ["A"], ["E"], ["R"]],
  explain: [
    {
      text: "بازوهای بالا و پایین تابلو ندارند؛ جلوی R و E تابلوی DARE PRECEDENZA است. پس اول A و S. S مستقیم می‌رود و A از روبه‌رو به چپ می‌پیچد؛ هنگام پیچیدن، S از راستِ A می‌آید. S اول رد می‌شود.",
      signs: ["E", "W"],
    },
    { text: "A تابلو ندارد، پس با اینکه به چپ می‌پیچد، E و R باید به او راه بدهند. فقط منتظر S بود. حالا A رد می‌شود." },
    { text: "حالا E و R، که هر دو تابلو دارند. R به چپ می‌پیچد و E روبه‌رویش مستقیم می‌آید؛ پس R به E راه می‌دهد. E رد می‌شود.", signs: ["W"] },
    { text: "R آخر است: به‌خاطر تابلو به S و A، و چون به چپ می‌پیچد به E راه داده است.", signs: ["E"] },
  ],
  waits: {
    A: "A باید صبر کند تا S رد شود: A به چپ می‌پیچد و S روبه‌رویش مستقیم می‌آید؛ هنگام پیچیدن، S از راستِ A می‌آید.",
    E: "E باید صبر کند تا S و A رد شوند: جلوی E تابلوی DARE PRECEDENZA است و آن دو در جاده‌ی بدون تابلو هستند.",
    R: "R باید صبر کند تا S، A و E رد شوند: جلوی R تابلوی DARE PRECEDENZA است، و چون به چپ می‌پیچد به E که از روبه‌رو می‌آید هم راه می‌دهد.",
  },
  evidence: [
    {
      sourceId: "4910",
      textIt: "Secondo le norme di precedenza nell'incrocio rappresentato in figura i veicoli transitano nell'ordine: S, A, E, R",
      answer: 1,
      before: [["S", "A"], ["A", "E"], ["E", "R"]],
    },
    {
      sourceId: "4917",
      textIt: "Secondo le norme di precedenza nell'incrocio rappresentato in figura i veicoli transitano nell'ordine: E, R, S, A",
      answer: 0,
      before: [["E", "R"], ["R", "S"], ["S", "A"]],
    },
    {
      sourceId: "4916",
      textIt: "Secondo le norme di precedenza nell'incrocio rappresentato in figura il veicolo A deve transitare per ultimo",
      answer: 0,
      before: [["S", "A"], ["E", "A"], ["R", "A"]],
    },
    {
      sourceId: "4918",
      textIt: "Secondo le norme di precedenza nell'incrocio rappresentato in figura il veicolo A deve attendere che siano transitati i veicoli S ed E",
      answer: 0,
      before: [["S", "A"], ["E", "A"]],
    },
  ],
};

export const CROSSINGS: Crossing[] = [FIG_640, FIG_633, FIG_614, FIG_613, FIG_643, FIG_637, FIG_655];
