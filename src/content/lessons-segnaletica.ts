/**
 * src/content/lessons-segnaletica.ts
 * Official chapter 6: Segnaletica orizzontale e segni sugli ostacoli. Bank
 * group `segnaletica-orizzontale-ostacoli` (groups 171–197), source ids
 * 2391–2650, 260 questions. Ten lessons + the review:
 *
 *  L1  ch6-strisce.ts   colours and shapes of road paint
 *  L2  lessons-sorpasso.ts `lessonStrisce`: centre lines from your side.
 *      Built for the overtaking module before the course followed the bank's
 *      order; moved here unchanged (same id and step order) so saved progress
 *      and its 62 question mappings keep pointing at the same section. It also
 *      still maps four overtaking-group questions about centre lines (#5192,
 *      #5220, #5246, #5259); chapter 15 must move them deliberately if wanted.
 *  L3  ch6-strisce.ts   one-way vs two-way carriageways
 *  L4  ch6-strisce.ts   arrows and preselection lanes
 *  L5  ch6-margini.ts   edge lines and the emergency lane
 *  L6  ch6-margini.ts   traffic islands vs guide stripes
 *  L7  ch6-margini.ts   transverse lines
 *  L8  ch6-segni.ts     pedestrian crossings
 *  L9  ch6-segni.ts     yellow markings: kerbs, bus stops, reserved bays
 *  L10 ch6-segni.ts     writing on the road, speed reducers, level crossings
 *
 * Coverage map, reuse notes and source flags: docs/chapter-6-coverage.md.
 */
import type { Chapter } from "./lessons.js";
import { lessonFrecceCorsie, lessonFormeColori, lessonSensoUnicoDoppio } from "./ch6-strisce.js";
import { lessonIsoleGuida, lessonMargineEmergenza, lessonTrasversali } from "./ch6-margini.js";
import { lessonGialli, lessonPedonali, lessonScritteRallentatori } from "./ch6-segni.js";
import { reviewSegnaletica } from "./ch6-ripasso.js";
import { lessonStrisce } from "./lessons-sorpasso.js";

/** First and last bank source id of chapter 6 (bank groups 171–197), for coverage checks. */
export const CHAPTER_6_SOURCE_RANGE = [2391, 2650] as const;

/**
 * Chapter-6 questions about overtaking in curves and near crests on a given
 * line (#2543, #2546 one-way; #2582, #2583 two-way). They test art. 148, and
 * chapter 15's `sorpasso-valutare` teaches and maps them; they stay there.
 */
export const CHAPTER_6_MAPPED_ELSEWHERE = ["2543", "2546", "2582", "2583"] as const;

export const SEGNALETICA_CHAPTER: Chapter = {
  id: "segnaletica-orizzontale",
  numbers: [6],
  topicIds: [5],
  nameIt: "Segnaletica orizzontale e segni sugli ostacoli",
  titleFa: "خط‌کشی و نشانه‌های روی جاده",
  summaryFa:
    "خط‌کشیِ روی آسفالت را بخوان: رنگ و شکل، خطِ وسط، یک‌طرفه و دوطرفه، فلش‌ها، لبه‌ی جاده، جزیره، خطِ ایست، گذرگاهِ عابر، نقش‌های زرد و نوشته‌ها. ده درسِ کوتاه و یک مرور.",
  reviewedOn: "2026-11-12",
  sources: [
    {
      label: "Codice della Strada (D.Lgs. 285/1992), testo vigente",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    {
      label: "Regolamento di esecuzione (DPR 495/1992), testo vigente",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1992-12-16;495",
    },
    {
      label: "Legge in Chiaro: DPR 495/1992 artt. 88, 135, 138–141, 143–154, 179 (agg. 26–30/10/2026), letti il 12/11/2026",
      url: "https://leggeinchiaro.it/articolo-138-regolamento-codice-strada/",
    },
    {
      label: "Legge in Chiaro: Codice della Strada artt. 40, 143, 144, 154, 157, 158, 176 (agg. 23–27/10/2026), letti il 12/11/2026",
      url: "https://leggeinchiaro.it/articolo-40-codice-della-strada/",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023)",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [
    lessonFormeColori,
    lessonStrisce,
    lessonSensoUnicoDoppio,
    lessonFrecceCorsie,
    lessonMargineEmergenza,
    lessonIsoleGuida,
    lessonTrasversali,
    lessonPedonali,
    lessonGialli,
    lessonScritteRallentatori,
    reviewSegnaletica,
  ],
};
