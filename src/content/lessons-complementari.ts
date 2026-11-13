/**
 * src/content/lessons-complementari.ts
 * Official chapter 9: Segnali complementari, segnali temporanei e di cantiere.
 * Bank group `segnali-complementari-cantiere` (groups 283–301), source ids
 * 3507–3687, 181 questions, 19 signs. Six lessons + the review:
 *
 *  L1 ch9-cantiere.ts     yellow = temporary; LAVORI; worksite traffic-light warning
 *  L2 ch9-cantiere.ts     barrier, cone, rear panel of a works vehicle
 *  L3 ch9-corsie.ts       lane closed, lanes available per vehicle, mobile worksite
 *  L4 ch9-corsie.ts       advised truck direction; detour map with a mass limit
 *  L5 ch9-delineatori.ts  edge delineators (two-way / one-way), tunnel, mountain, obstacle
 *  L6 ch9-delineatori.ts  curve chevrons, numbered hairpin panel, T-junction
 *
 * Every chapter-9 question maps to exactly one chapter-9 section; no earlier
 * module mapped any of them. Related lessons elsewhere are linked in the text,
 * not duplicated: chapter 2 (yellow temporary danger signs, SEMAFORO, the
 * hairpin-series sign, dangerous-curve triangles), chapter 3 (the mass-limit
 * sign and massa effettiva), chapter 4 (passaggio obbligatorio), chapter 5
 * (senso unico alternato), chapter 8 (lane-count signs, the white truck route
 * and the yellow temporary signs 282/284).
 *
 * Topic 7 ("Segnali complementari") holds 160 of the 181 questions and nothing
 * outside this chapter, so it is this chapter's topic; the other 21 were
 * keyword-filed elsewhere. Coverage map, reuse notes and source flags:
 * docs/chapter-9-coverage.md.
 */
import type { Chapter } from "./lessons.js";
import { lessonBarriereConi, lessonLavoriSemaforo } from "./ch9-cantiere.js";
import { lessonCorsieCantiere, lessonDeviazioniMezziPesanti } from "./ch9-corsie.js";
import { lessonDelineatoriCurve, lessonDelineatoriMargine } from "./ch9-delineatori.js";
import { reviewComplementari } from "./ch9-ripasso.js";

/** First and last bank source id of chapter 9 (bank groups 283–301), for coverage checks. */
export const CHAPTER_9_SOURCE_RANGE = [3507, 3687] as const;

const LEGGE = (n: number) => `https://leggeinchiaro.it/articolo-${n}-regolamento-codice-strada/`;

export const COMPLEMENTARI_CHAPTER: Chapter = {
  id: "segnali-complementari-cantiere",
  numbers: [9],
  topicIds: [7],
  nameIt: "Segnali complementari, segnali temporanei e di cantiere",
  titleFa: "علائمِ تکمیلی و علائمِ موقتِ کارگاه",
  summaryFa:
    "دو خانواده: تابلوهای زردِ کارگاه که موقت‌اند (LAVORI، چراغِ موقت، راه‌بند و مخروط، خط‌های بسته و انحرافِ کامیون‌ها) و مسیرنماهایی که دستور نمی‌دهند و فقط شکلِ جاده را نشان می‌دهند (لبه‌ها، تونل، کوهستان، مانع، پیچ، سنجاقی و تقاطعِ T). شش درسِ کوتاه و یک مرور.",
  reviewedOn: "2026-11-13",
  sources: [
    {
      label: "Regolamento di esecuzione (DPR 495/1992), testo vigente",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1992-12-16;495",
    },
    {
      label: "Legge in Chiaro: DPR 495/1992 artt. 30–34, 36, 38, 39, 41–43 (cantieri; agg. 26–29/10/2026), letti il 13/11/2026",
      url: LEGGE(31),
    },
    {
      label: "Legge in Chiaro: DPR 495/1992 artt. 173, 174, 177 (delineatori; agg. 26–29/10/2026), letti il 13/11/2026",
      url: LEGGE(174),
    },
    {
      label: "Legge in Chiaro: DPR 495/1992 art. 86 (tornanti; agg. 29/10/2026), letto il 13/11/2026",
      url: LEGGE(86),
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «segnali-complementari-cantiere»",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [
    lessonLavoriSemaforo,
    lessonBarriereConi,
    lessonCorsieCantiere,
    lessonDeviazioniMezziPesanti,
    lessonDelineatoriMargine,
    lessonDelineatoriCurve,
    reviewComplementari,
  ],
};
