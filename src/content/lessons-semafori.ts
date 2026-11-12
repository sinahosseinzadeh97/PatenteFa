/**
 * src/content/lessons-semafori.ts
 * Official chapter 7: Semafori e segnali degli agenti del traffico. Bank group
 * `semafori-vigili` (groups 198–219), source ids 2651–2903, 253 questions.
 * Ten lessons + the review:
 *
 *  L1  ch7-semafori.ts  the vehicle traffic light: who, where, layout, sequence
 *  L2  ch7-semafori.ts  red and green
 *  L3  ch7-semafori.ts  fixed yellow, flashing yellow, switched off
 *  L4  ch7-luci.ts      lane arrows and reversible lanes
 *  L5  ch7-luci.ts      pedestrian, bicycle and public-transport lights
 *  L6  ch7-luci.ts      single flashing yellow lights A/B/C, green wave
 *  L7  ch7-luci.ts      flashing red lights, level crossings, bridges, piers
 *  L8  ch7-agenti.ts    officer: arms open (front / profile), arm raised
 *  L9  ch7-agenti.ts    officer: arms at a right angle, prolonged whistle
 *  L10 ch7-agenti.ts    recognising officers, documents to show
 *
 * Every chapter-7 question maps to exactly one chapter-7 section; no earlier
 * module mapped any of them. Related lessons elsewhere are linked in the text,
 * not duplicated: chapter 2 `semaforo-e-ponte-mobile` (the danger signs that
 * announce a light or a movable bridge) and `passaggi-a-livello` /
 * `croce-e-pannelli` (level-crossing signs and distance panels); chapter 5
 * `semaforo-agente-precedenza` (officer > working light > sign).
 *
 * Coverage map, reuse notes and source flags: docs/chapter-7-coverage.md.
 */
import type { Chapter } from "./lessons.js";
import { lessonAgenteAngolo, lessonAgenteBraccia, lessonAgentiDocumenti } from "./ch7-agenti.js";
import { lessonCorsieReversibili, lessonLampeggiantiOndaVerde, lessonLuciRossePL, lessonPedoniBiciBus } from "./ch7-luci.js";
import { reviewSemafori } from "./ch7-ripasso.js";
import { lessonGialloSpento, lessonRossoVerde, lessonSemaforoVeicolare } from "./ch7-semafori.js";

/** First and last bank source id of chapter 7 (bank groups 198–219), for coverage checks. */
export const CHAPTER_7_SOURCE_RANGE = [2651, 2903] as const;

export const SEMAFORI_CHAPTER: Chapter = {
  id: "semafori-agenti",
  numbers: [7],
  topicIds: [6],
  nameIt: "Semafori e segnali degli agenti del traffico",
  titleFa: "چراغ‌های راهنمایی و علامت‌های مأمور",
  summaryFa:
    "چراغِ راهنمایی را بخوان: قرمز، سبز، زرد، چشمک‌زن و خاموش؛ چراغِ فلش‌دار و خطِ برگشت‌پذیر؛ چراغِ عابر، دوچرخه و اتوبوس؛ چراغِ قرمزِ گذرگاهِ راه‌آهن؛ و ژست‌ها و سوتِ مأمور. ده درسِ کوتاه و یک مرور.",
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
      label: "Legge in Chiaro: Codice della Strada artt. 41, 43, 44, 147, 162, 180 (agg. 23–29/10/2026), letti il 12/11/2026",
      url: "https://leggeinchiaro.it/articolo-41-codice-della-strada/",
    },
    {
      label: "Legge in Chiaro: DPR 495/1992 artt. 24, 158–168, 181, 182 (agg. 26–29/10/2026), letti il 12/11/2026",
      url: "https://leggeinchiaro.it/articolo-158-regolamento-codice-strada/",
    },
    {
      label: "Brocardi: Codice della Strada art. 41 c.6 e c.15 (testo), letto il 12/11/2026",
      url: "https://www.brocardi.it/codice-della-strada/titolo-ii/capo-ii/art41.html",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «semafori-vigili»",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [
    lessonSemaforoVeicolare,
    lessonRossoVerde,
    lessonGialloSpento,
    lessonCorsieReversibili,
    lessonPedoniBiciBus,
    lessonLampeggiantiOndaVerde,
    lessonLuciRossePL,
    lessonAgenteBraccia,
    lessonAgenteAngolo,
    lessonAgentiDocumenti,
    reviewSemafori,
  ],
};
