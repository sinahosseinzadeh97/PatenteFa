/**
 * src/content/lessons-integrativi.ts
 * Official chapter 10: Pannelli integrativi (supplementary panels).
 * Bank group `pannelli-integrativi` (groups 302–326), source ids 3688–3950,
 * 263 questions, 25 groups. Nine lessons + the review, ordered
 * where → when → who → what:
 *
 *  L1 ch10-spazio.ts         what a panel is; distance (II.1) vs length (II.2)
 *  L2 ch10-spazio.ts         start / continuation / end arrows (II.5)
 *  L3 ch10-tempo.ts          hours, holidays (cross), working days (hammers) (II.3)
 *  L4 ch10-tempo.ts          only these vehicles vs "eccetto" (II.4)
 *  L5 ch10-pericoli.ts       ice, rain, flooding (II.6)
 *  L6 ch10-pericoli.ts       accident, queue, slow lorries (II.6)
 *  L7 ch10-altri-pericoli.ts snowplough (20 m), work machines, markings, shunting tracks (II.6)
 *  L8 ch10-sosta-strada.ts   tow-away zone, street cleaning (II.6)
 *  L9 ch10-sosta-strada.ts   lane panel, hairpins (II.6), main-road shape (II.7)
 *
 * 261 of 263 questions map to exactly one chapter-10 section. #3784 (the
 * FINE DIVIETO DI SORPASSO sign, filed in this group) stays with chapter 15's
 * `sorpasso-segnali`, and #3871 (rain → longer safety distance) with
 * Velocità's `distanza-di-sicurezza`; both lessons already teach them
 * (`CHAPTER_10_MAPPED_ELSEWHERE`). Related lessons elsewhere are linked in the
 * text, not duplicated: chapter 2 L1 (distance vs length under danger signs,
 * ALTRI PERICOLI), chapter 3 (parking-ban panels, 0–24, truck mass), chapter 5
 * (right-of-way signs), chapter 8 (lane signs), chapter 9 (yellow worksite
 * signs, "1° tornante").
 *
 * No app topic matches: 150 of these questions were keyword-filed under
 * "Altro / Misto", the rest under 15 other topics, so `topicIds: []`.
 * Coverage map, reuse notes and source flags: docs/chapter-10-coverage.md.
 */
import type { Chapter } from "./lessons.js";
import { lessonAltriPericoli } from "./ch10-altri-pericoli.js";
import { lessonGhiaccioPioggiaAllagamento, lessonIncidenteCodeAutocarri } from "./ch10-pericoli.js";
import { reviewIntegrativi } from "./ch10-ripasso.js";
import { lessonCorsiaTornantiIncrocio, lessonRimozionePulizia } from "./ch10-sosta-strada.js";
import { lessonDistanzaEstesa, lessonInizioContinuazioneFine } from "./ch10-spazio.js";
import { lessonCategorieEccetto, lessonOrariGiorni } from "./ch10-tempo.js";

/** First and last bank source id of chapter 10 (bank groups 302–326), for coverage checks. */
export const CHAPTER_10_SOURCE_RANGE = [3688, 3950] as const;

/** Chapter-10 questions another module already teaches and maps (see the header). */
export const CHAPTER_10_MAPPED_ELSEWHERE = ["3784", "3871"] as const;

const LEGGE = (n: number) => `https://leggeinchiaro.it/articolo-${n}-regolamento-codice-strada/`;
const CDS = (n: number) => `https://leggeinchiaro.it/articolo-${n}-codice-della-strada/`;

export const INTEGRATIVI_CHAPTER: Chapter = {
  id: "pannelli-integrativi",
  numbers: [10],
  topicIds: [],
  nameIt: "Pannelli integrativi",
  titleFa: "پنل‌های تکمیلی",
  summaryFa:
    "مستطیل‌های کوچکِ زیرِ تابلو که هرگز تنها نیستند و تابلو را کامل می‌کنند: کجا (فاصله، طول، شروع و پایان، کدام خط)، کی (ساعت، تعطیل، روزِ کاری)، برای چه کسی (فقط این‌ها یا eccetto)، و تصویرهایی که خطر را توضیح می‌دهند. نُه درسِ کوتاه و یک مرور.",
  reviewedOn: "2026-11-13",
  sources: [
    {
      label: "Regolamento di esecuzione (DPR 495/1992), testo vigente",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1992-12-16;495",
    },
    {
      label: "Legge in Chiaro: DPR 495/1992 art. 83 (pannelli integrativi; agg. 26/10/2026), letto il 13/11/2026",
      url: LEGGE(83),
    },
    {
      label: "Legge in Chiaro: DPR 495/1992 artt. 103 (ALTRI PERICOLI) e 354 (rimozione; agg. 29/10/2026), letti il 13/11/2026",
      url: LEGGE(103),
    },
    {
      label: "Legge in Chiaro: CdS artt. 149 c.3 (sgombraneve, 20 m) e 159 (rimozione e blocco; agg. 29/10/2026), letti il 13/11/2026",
      url: CDS(149),
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «pannelli-integrativi»",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [
    lessonDistanzaEstesa,
    lessonInizioContinuazioneFine,
    lessonOrariGiorni,
    lessonCategorieEccetto,
    lessonGhiaccioPioggiaAllagamento,
    lessonIncidenteCodeAutocarri,
    lessonAltriPericoli,
    lessonRimozionePulizia,
    lessonCorsiaTornantiIncrocio,
    reviewIntegrativi,
  ],
};
