/**
 * src/content/lessons-autostrade.ts
 * Official chapter 17: Norme varie, autostrade, pannelli. Bank group
 * `norme-varie-autostrade-pannelli` (groups 473–512), source ids 5483–5814,
 * 332 questions, 40 groups, images 279, 302–305. Fourteen lessons + the review:
 *
 *  L1  ch17-ingombro.ts    a blocked carriageway: free it, presignal, inform (art. 161)
 *  L2  ch17-ingombro.ts    the warning triangle and the high-visibility vest (art. 162, Reg. 357)
 *  L3  ch17-autostrada.ts  who may not use motorways and main extra-urban roads (art. 175)
 *  L4  ch17-autostrada.ts  driving there: no U-turn, reverse, emergency lane; entry, exit, jams (art. 176)
 *  L5  ch17-autostrada.ts  stopping: 3 h emergency, 24 h service areas, no lifts, broken-down drivers
 *  L6  ch17-carico.ts      passengers, animals, motorcycles (artt. 54, 169, 170)
 *  L7  ch17-carico.ts      arranging the load and how far it may protrude (art. 164)
 *  L8  ch17-carico.ts      rear panels 302, 303, 304, 305
 *  L9  ch17-traino.ts      towing a broken-down vehicle (artt. 63, 165)
 *  L10 ch17-traino.ts      the trailer as a vehicle: plate, insurance, numbers, driver rules
 *  L11 ch17-rimorchio.ts   inertia brake, hitch, upkeep
 *  L12 ch17-rimorchio.ts   driving with a trailer, loading a caravan (road.js scene "rimorchio")
 *  L13 ch17-rischi.ts      cyclists, moped riders, slow vehicles
 *  L14 ch17-rischi.ts      mass, SUVs, what drivers cannot see
 *
 * 328 questions map to a chapter-17 section; four stay with chapter 12, which
 * mapped them first (5693, 5694, 5703 → `distanza-casi-particolari`; 5705 →
 * `frenatura-e-arresto`). Coverage map, source flags and the one law change
 * after the 2023 bank (art. 175 c.2-bis): docs/chapter-17-coverage.md.
 */
import type { Chapter } from "./lessons.js";
import { lessonAutostradaAccesso, lessonAutostradaGuida, lessonAutostradaSosta } from "./ch17-autostrada.js";
import { lessonCarico, lessonPannelli, lessonPasseggeri } from "./ch17-carico.js";
import { lessonIngombro, lessonTriangolo } from "./ch17-ingombro.js";
import { lessonGuidaRimorchio, lessonRimorchioFreni } from "./ch17-rimorchio.js";
import { reviewAutostrade } from "./ch17-ripasso.js";
import { lessonMassaVisibilita, lessonUtentiDeboli } from "./ch17-rischi.js";
import { lessonRimorchioRegole, lessonTrainoAvaria } from "./ch17-traino.js";

/** First and last bank source id of chapter 17 (bank groups 473–512), for coverage checks. */
export const CHAPTER_17_SOURCE_RANGE = [5483, 5814] as const;

/** Chapter-17 questions chapter 12 mapped before this chapter existed; they stay there. */
export const CHAPTER_17_MAPPED_ELSEWHERE = ["5693", "5694", "5703", "5705"] as const;

const BROCARDI = (n: number) => `https://www.brocardi.it/codice-della-strada/titolo-v/art${n}.html`;

export const AUTOSTRADE_CHAPTER: Chapter = {
  id: "norme-varie-autostrade-pannelli",
  numbers: [17],
  // The bank's own topic guesses scatter these questions over 19 app topics (104 under "Altro / Misto").
  topicIds: [],
  nameIt: "Norme varie, autostrade, pannelli",
  titleFa: "آزادراه، بار، یدک و پنل‌ها",
  summaryFa:
    "وقتی راه بسته شد چه می‌کنی و مثلث و جلیقه را کجا و کِی؛ آزادراه: چه کسی وارد نمی‌شود، چه کاری هیچ‌وقت مجاز نیست، کجا و چقدر می‌ایستی؛ سرنشین، حیوان و بار، و پنل‌های پشتِ وسیله؛ یدک کشیدن و رانندگی با یدک؛ و خطرِ دوچرخه، وسیله‌ی کُند، جرم و نقطه‌ی کور. چهارده درسِ کوتاه و یک مرور.",
  reviewedOn: "2026-11-14",
  sources: [
    {
      label: "Codice della Strada (D.Lgs. 285/1992), testo vigente",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    { label: "Brocardi: CdS art. 161 (ingombro della carreggiata; agg. 25/04/2026), letto il 14/11/2026", url: BROCARDI(161) },
    { label: "Brocardi: CdS art. 162 (segnalazione di veicolo fermo, giubbotto c.4-ter; agg. 25/04/2026), letto il 14/11/2026", url: BROCARDI(162) },
    {
      label: "Legge in Chiaro: DPR 495/1992 artt. 357 (segnale mobile di pericolo), 361 (pannello carichi sporgenti), 372 (80 km/h); agg. 29/10/2026, letti il 14/11/2026",
      url: "https://leggeinchiaro.it/",
    },
    { label: "Brocardi: CdS art. 175 (autostrade: divieti, c.2-bis L. 177/2024; agg. 25/04/2026), letto il 14/11/2026", url: BROCARDI(175) },
    { label: "Brocardi: CdS art. 176 (comportamenti in autostrada; agg. 25/04/2026), letto il 14/11/2026", url: BROCARDI(176) },
    { label: "Brocardi: CdS artt. 164 (carico), 165 (traino in avaria), 169–170 (persone, animali, motocicli), letti il 14/11/2026", url: BROCARDI(164) },
    {
      label: "Brocardi: CdS artt. 54, 56, 63, 72, 80, 100, 116, 142, 152, 158, 186-bis (veicoli, rimorchi, luci, alcol), letti il 14/11/2026",
      url: "https://www.brocardi.it/codice-della-strada/",
    },
    {
      label: "Normattiva: DM 24 gennaio 2003 n. 40 (pannelli retroriflettenti per veicoli pesanti e lunghi)",
      url: "https://www.normattiva.it/eli/id/2003/03/14//003G0056/CONSOLIDATED",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «norme-varie-autostrade-pannelli»",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [
    lessonIngombro,
    lessonTriangolo,
    lessonAutostradaAccesso,
    lessonAutostradaGuida,
    lessonAutostradaSosta,
    lessonPasseggeri,
    lessonCarico,
    lessonPannelli,
    lessonTrainoAvaria,
    lessonRimorchioRegole,
    lessonRimorchioFreni,
    lessonGuidaRimorchio,
    lessonUtentiDeboli,
    lessonMassaVisibilita,
    reviewAutostrade,
  ],
};
