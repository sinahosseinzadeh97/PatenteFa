/**
 * src/content/lessons-norme.ts
 * Official chapter 13: Norme di circolazione. Bank group `norme-di-circolazione`
 * (groups 361–398), source ids 4342–4720, 379 questions, 38 groups. Thirteen
 * lessons + the review, from the general duty to each manoeuvre and then to
 * the people, lights, loads and mirrors around it:
 *
 *  L1  ch13-principi.ts    no danger, no obstruction (art. 140, 141 c.5–6); rules + prudence
 *  L2  ch13-principi.ts    keep right; which lane and which carriageway (art. 143)
 *  L3  ch13-file.ts        parallel files and heavy traffic (art. 144)
 *  L4  ch13-corsie.ts      changing lanes; the wrong lane before a junction (art. 154 c.1–2, 144 c.3)
 *  L5  ch13-svolte.ts      turning right and left; lorries that swing wide (art. 154 c.3)
 *  L6  ch13-svolte.ts      approaching, entering and clearing a junction (art. 145 c.1, c.7)
 *  L7  ch13-manovre.ts     U-turns: how, and where never (art. 154 c.6, 176 c.1 lett. a)
 *  L8  ch13-manovre.ts     setting off, entering the flow, reversing out, stopping at the edge (art. 154)
 *  L9  ch13-precedenze.ts  roundabouts, the give-way line, steep roads (art. 145, 150)
 *  L10 ch13-altri.ts       pedestrians, processions, slow starters, the horn (art. 156, 163, 191)
 *  L11 ch13-altri.ts       dazzled at night; police roof displays (art. 153, 192)
 *  L12 ch13-carico.ts      loads on cars and motorcycles (art. 164, 170)
 *  L13 ch13-specchi.ts     mirrors: when to look, how to adjust
 *
 * 354 of the 379 questions map to exactly one chapter-13 section. The other
 * 25 stay with the modules that already taught them (CHAPTER_13_MAPPED_ELSEWHERE):
 * moving one changes where existing mistakes route, so do it deliberately.
 * Coverage map, reuse notes and source flags: docs/chapter-13-coverage.md.
 */
import type { Chapter } from "./lessons.js";
import { lessonPedoniCortei, lessonNottePolizia } from "./ch13-altri.js";
import { lessonCarico } from "./ch13-carico.js";
import { lessonCambioCorsia } from "./ch13-corsie.js";
import { lessonFileParallele } from "./ch13-file.js";
import { lessonImmettersi, lessonInversione } from "./ch13-manovre.js";
import { lessonRotatoriaPendenza } from "./ch13-precedenze.js";
import { lessonPericoloIntralcio, lessonPosizione } from "./ch13-principi.js";
import { reviewNorme } from "./ch13-ripasso.js";
import { lessonSpecchi } from "./ch13-specchi.js";
import { lessonIncrocio, lessonSvolte } from "./ch13-svolte.js";

/** First and last bank source id of chapter 13 (bank groups 361–398), for coverage checks. */
export const CHAPTER_13_SOURCE_RANGE = [4342, 4720] as const;

/** Chapter-13 questions another module already maps, by owning lesson id. Kept so saved mistakes still route there. */
export const CHAPTER_13_MAPPED_ELSEWHERE: Record<string, string[]> = {
  // chapter 5: what a give-way / stop / priority sign orders
  "dare-precedenza-stop": ["4394", "4564", "4637"],
  "diritto-di-precedenza": ["4565", "4569"],
  // chapter 12: the gap in heavy traffic
  "distanza-di-sicurezza": ["4454"],
  // chapter 14: who goes first (right-hand rule, rails, turning left)
  "precedenza-a-destra": ["4361", "4559", "4576", "4591", "4597"],
  "svolte-e-contemporanei": ["4468", "4483", "4486", "4487", "4490", "4530", "4538", "4568"],
  // chapter 15: overtaking checks and mirrors before overtaking
  "sorpasso-valutare": ["4367", "4584"],
  "sorpasso-fasi": ["4690", "4691", "4708", "4711"],
};

const CDS = (n: number) => `https://leggeinchiaro.it/articolo-${n}-codice-della-strada/`;

export const NORME_CHAPTER: Chapter = {
  id: "norme-di-circolazione",
  numbers: [13],
  topicIds: [16],
  nameIt: "Norme di circolazione",
  titleFa: "قواعدِ حرکت در جاده",
  summaryFa:
    "قاعده‌ی پایه این است: نه خطر، نه مزاحمت. بعد جایت روی سواره‌رو، ردیف‌های موازی، عوض کردنِ خط عبور، گردش به راست و چپ، تقاطع، دور زدن، راه افتادن و دنده‌عقب، میدان و سرازیری. در آخر عابر و دسته‌ی راهپیمایی، نورِ چراغِ روبه‌رو و پلیس، بار و آینه‌ها. سیزده درسِ کوتاه و یک مرور.",
  reviewedOn: "2026-11-14",
  sources: [
    {
      label: "Codice della Strada (D.Lgs. 285/1992), testo vigente",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    { label: "Legge in Chiaro: CdS artt. 140, 141 (principio; velocità; agg. 23–27/10/2026), letti il 14/11/2026", url: CDS(140) },
    { label: "Legge in Chiaro: CdS artt. 143, 144 (posizione; file parallele; agg. 23–27/10/2026), letti il 14/11/2026", url: CDS(143) },
    { label: "Legge in Chiaro: CdS artt. 145, 150 (precedenza; strade di montagna; agg. 27/10/2026), letti il 14/11/2026", url: CDS(145) },
    { label: "Legge in Chiaro: CdS art. 154 (cambiamento di direzione o di corsia, inversione; agg. 26/10/2026), letto il 14/11/2026", url: CDS(154) },
    { label: "Legge in Chiaro: CdS artt. 153, 156 (luci; segnalazioni acustiche; agg. 27–29/10/2026), letti il 14/11/2026", url: CDS(153) },
    { label: "Legge in Chiaro: CdS artt. 163, 191, 192 (cortei; pedoni; agenti; agg. 23–27/10/2026), letti il 14/11/2026", url: CDS(191) },
    { label: "Legge in Chiaro: CdS artt. 164, 170 (carico; veicoli a due ruote; agg. 27–29/10/2026), letti il 14/11/2026", url: CDS(164) },
    { label: "Legge in Chiaro: CdS art. 176 c.1 lett. a, c.5 (autostrade e strade extraurbane principali; agg. 27/10/2026), letto il 14/11/2026", url: CDS(176) },
    {
      label: "Tabella punti, CdS art. 126-bis: art. 154 c.7 = 8 punti, c.8 = 2 punti (tabelle SicurAUTO e ARAG), letta il 14/11/2026",
      url: "https://www.sicurauto.it/guide-utili/patente/patente-a-punti-la-tabella-delle-decurtazioni/",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «norme-di-circolazione»",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [
    lessonPericoloIntralcio,
    lessonPosizione,
    lessonFileParallele,
    lessonCambioCorsia,
    lessonSvolte,
    lessonIncrocio,
    lessonInversione,
    lessonImmettersi,
    lessonRotatoriaPendenza,
    lessonPedoniCortei,
    lessonNottePolizia,
    lessonCarico,
    lessonSpecchi,
    reviewNorme,
  ],
};
