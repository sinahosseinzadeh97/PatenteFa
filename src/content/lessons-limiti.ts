/**
 * src/content/lessons-limiti.ts
 * Official chapter 11: Limiti di velocità. Bank group `limiti-di-velocita`
 * (groups 327–345), source ids 3951–4206, 256 questions, 19 groups. Seven
 * lessons + the review, from "how fast should I go now" to the numbers and
 * then to the situations where speed turns into danger:
 *
 *  L1 lessons-velocita.ts  `velocita-adeguata`, reused: adapt speed (art. 141), stop within sight
 *  L2 ch11-strade.ts       130 / 110 / 90 / 50, what a sign changes (150, 70), rain and fog
 *  L3 ch11-veicoli.ts      like a car (motorcycles, ≤ 3.5 t, carrello appendice) or with a trailer (80 / 70)
 *  L4 ch11-veicoli.ts      mopeds 45, quadricycles 80, farm machines 40, new drivers 100 / 90, rear discs
 *  L5 ch11-rischi.ts       curves and fuel, right of way ≠ no blame, roadside hazards
 *  L6 ch11-rischi.ts       long descents in neutral with the engine off
 *  L7 ch11-passaggio.ts    level crossings: approach, barriers closing, stuck on the tracks
 *
 * Until 2026-11-14 L1 sat in the Velocità module, which then covered
 * chapters 11 and 12 together; its id, content and saved progress are
 * unchanged, only its chapter is. Every chapter-11 question maps to exactly
 * one chapter-11 section; no other module maps any of them.
 * Coverage map, reuse notes and source flags: docs/chapter-11-coverage.md.
 */
import type { Chapter } from "./lessons.js";
import { lessonPassaggioLivello } from "./ch11-passaggio.js";
import { reviewLimiti } from "./ch11-ripasso.js";
import { lessonDiscesaFolle, lessonVelocitaRischi } from "./ch11-rischi.js";
import { lessonLimitiStrade } from "./ch11-strade.js";
import { lessonLimitiNeopatentati, lessonLimitiRimorchi } from "./ch11-veicoli.js";
import { lessonAdeguata } from "./lessons-velocita.js";

/** First and last bank source id of chapter 11 (bank groups 327–345), for coverage checks. */
export const CHAPTER_11_SOURCE_RANGE = [3951, 4206] as const;

const CDS = (n: number) => `https://leggeinchiaro.it/articolo-${n}-codice-della-strada/`;

export const LIMITI_CHAPTER: Chapter = {
  id: "limiti-di-velocita",
  numbers: [11],
  topicIds: [10],
  nameIt: "Limiti di velocità",
  titleFa: "سرعت و حدِ مجاز",
  summaryFa:
    "اول سرعتِ مناسبِ همان لحظه، بعد خودِ عددها: سقفِ هر جاده، هر وسیله و سه سالِ اولِ گواهینامه، و این‌که باران و تابلو چه را عوض می‌کنند. بعد جاهایی که سرعت خطر می‌سازد: پیچ، تقاطع، کنارِ جاده، سرازیری و گذرگاهِ راه‌آهن. هفت درسِ کوتاه و یک مرور.",
  reviewedOn: "2026-11-14",
  sources: [
    {
      label: "Codice della Strada (D.Lgs. 285/1992), testo vigente",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    {
      label: "Legge in Chiaro: CdS art. 142 (limiti di velocità; agg. 12/06/2026), letto il 14/11/2026",
      url: CDS(142),
    },
    {
      label: "Legge in Chiaro: CdS art. 117 c.2 (neopatentati: 100 / 90 km/h; agg. 27/10/2026), letto il 14/11/2026",
      url: CDS(117),
    },
    {
      label: "Legge in Chiaro: CdS artt. 54 c.1 lett. h (autotreni) e 56 c.2, c.4 (rimorchi, carrelli appendice; agg. 23–27/10/2026), letti il 14/11/2026",
      url: CDS(56),
    },
    {
      label: "Legge in Chiaro: CdS art. 147 (passaggi a livello; agg. 27/10/2026), letto il 14/11/2026",
      url: CDS(147),
    },
    {
      label: "Legge in Chiaro: CdS art. 144 c.1 (file parallele), letto il 14/11/2026",
      url: CDS(144),
    },
    {
      label: "MIT, Direttiva prot. 335 del 16/02/1993: limiti temporanei ≤ 50 km/h con nebbia (visibilità < 100 m)",
      url: "https://www.mit.gov.it/index.php/node/2584",
    },
    {
      label: "SicurAUTO, «Servofreno: a cosa serve e come funziona» (motore spento: pedale duro, frenata più lunga), letto il 14/11/2026",
      url: "https://www.sicurauto.it/ricambi-e-accessori/tecnica-e-manutenzione/servofreno-auto-a-cosa-serve-e-come-funziona/",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «limiti-di-velocita»",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [
    lessonAdeguata,
    lessonLimitiStrade,
    lessonLimitiRimorchi,
    lessonLimitiNeopatentati,
    lessonVelocitaRischi,
    lessonDiscesaFolle,
    lessonPassaggioLivello,
    reviewLimiti,
  ],
};
