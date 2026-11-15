/**
 * src/content/lessons-cinture.ts
 * Official chapter 19: Cinture, casco e sicurezza. Bank group
 * `cinture-casco-sicurezza` (groups 535–546), source ids 5991–6125, 135
 * questions, 12 groups, no images. Seven lessons + the review, from the belt to
 * the rider's boots:
 *
 *  L1 ch19-cinture.ts        what a belt does; everyone, in any situation of motion
 *  L2 ch19-cinture.ts        approved, intact, untouched; the closed list of exemptions
 *  L3 ch19-airbag.ts         airbag (sensor, milliseconds, with the belt); headrest and whiplash
 *  L4 ch19-bambini.ts        children: under 1.50 m a suitable approved restraint; airbag off for rear-facing seats
 *  L5 ch19-casco.ts          helmet: who, when, exemptions by vehicle, sanctions
 *  L6 ch19-casco.ts          helmet: shell, foam, visor; no solvents; replace after impact
 *  L7 ch19-abbigliamento.ts  boots, gloves, jackets (certified, recommended; only the helmet is law)
 *  review ch19-ripasso.ts
 *
 * All 135 questions map here; no other module mapped any of them. App topic 20
 * «Sicurezza attiva e passiva» holds 110 of the 135 (and 110 of its own 122),
 * so `topicIds: [20]`. Coverage map and source flags: docs/chapter-19-coverage.md.
 */
import type { Chapter } from "./lessons.js";
import { lessonAbbigliamento } from "./ch19-abbigliamento.js";
import { lessonAirbagPoggiatesta } from "./ch19-airbag.js";
import { lessonBambini } from "./ch19-bambini.js";
import { lessonCascoCura, lessonCascoObbligo } from "./ch19-casco.js";
import { lessonCintureEsenzioni, lessonCinturePerche } from "./ch19-cinture.js";
import { reviewCinture } from "./ch19-ripasso.js";

/** First and last bank source id of chapter 19 (bank groups 535–546), for coverage checks. */
export const CHAPTER_19_SOURCE_RANGE = [5991, 6125] as const;

const CDS = (n: number) => `https://leggeinchiaro.it/articolo-${n}-codice-della-strada/`;

export const CINTURE_CHAPTER: Chapter = {
  id: "cinture-casco-sicurezza",
  numbers: [19],
  topicIds: [20],
  nameIt: "Cinture, casco e sicurezza",
  titleFa: "کمربند، کلاه ایمنی و تجهیزاتِ ایمنی",
  summaryFa:
    "کمربند برای همه و در هر حرکت، کسانی که معاف‌اند، کیسه‌ی هوا و پشت‌سری، صندلیِ کودک، کلاه ایمنی (چه کسی، کِی، چطور نگه‌داری) و چکمه، دستکش و کاپشنِ موتورسواری. هفت درسِ کوتاه و یک مرور.",
  reviewedOn: "2026-11-15",
  sources: [
    {
      label: "Codice della Strada (D.Lgs. 285/1992), testo vigente",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    {
      label: "Legge in Chiaro: CdS art. 172 c.1–13 (cinture, sistemi di ritenuta per bambini, airbag, sanzioni; agg. 27/10/2026), letto il 15/11/2026",
      url: CDS(172),
    },
    {
      label: "Brocardi: CdS art. 172 c.8, esenzioni lett. a–h (agg. 25/04/2026), letto il 15/11/2026",
      url: "https://www.brocardi.it/codice-della-strada/titolo-v/art172.html",
    },
    {
      label: "Legge in Chiaro: CdS art. 171 c.1–5 (casco, esenzioni, fermo, caschi non omologati; agg. 27/10/2026), letto il 15/11/2026",
      url: CDS(171),
    },
    {
      label: "Ministero delle Infrastrutture e dei Trasporti: tabella dei punteggi art. 126-bis (artt. 171 c.2 e 172 c.10–11), letta il 15/11/2026",
      url: "https://www.ilportaledellautomobilista.it/documents/56611/57319/tabella_punteggi.pdf",
    },
    {
      label: "Polizia di Stato: «Bambini in auto: ecco come portarli in modo sicuro» (15/07/2019; gruppi R44, R129 i-Size, airbag e seggiolini rivolti all'indietro), letto il 15/11/2026",
      url: "https://poliziadistato.it/articolo/pdf/171",
    },
    {
      label: "InSella: abbigliamento moto certificato (02/07/2026; EN 13595/prEN 17092, EN 13594, EN 13634; prove di abrasione e taglio; nessun obbligo in Italia), letto il 15/11/2026",
      url: "https://www.insella.it/da-sapere/legge-burocrazia/sicurezza-stradale-abbigliamento-moto-certificato-10-cose-da-sapere-45928",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «cinture-casco-sicurezza»",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [
    lessonCinturePerche,
    lessonCintureEsenzioni,
    lessonAirbagPoggiatesta,
    lessonBambini,
    lessonCascoObbligo,
    lessonCascoCura,
    lessonAbbigliamento,
    reviewCinture,
  ],
};
