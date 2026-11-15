/**
 * src/content/lessons-patente.ts
 * Official chapter 20: Patente, punti e documenti. Bank group
 * `patente-punti-documenti` (groups 547–564), source ids 6126–6359, 234
 * questions, 18 groups, no images. Eleven lessons + the review, from the papers
 * a car needs to what can happen to a licence:
 *
 *  L1  ch20-documenti.ts     what a car needs on a public road; plates
 *  L2  ch20-moto.ts          AM and A1
 *  L3  ch20-moto.ts          A2 and A (gradual at 20, direct at 24)
 *  L4  ch20-auto.ts          B1 and B
 *  L5  ch20-auto.ts          trailers: B (750 kg / 3.5 t), code 96 (4.25 t), BE
 *  L6  ch20-validita.ts      the licence card; renewal; 10 / 5 / 3 / 2 years
 *  L7  ch20-punti.ts         the points system: 20, 15 at once, ×2, 6, zero
 *  L8  ch20-punti.ts         which violations cost points
 *  L9  ch20-provvedimenti.ts the four measures; immediate withdrawal (ritiro)
 *  L10 ch20-provvedimenti.ts sospensione
 *  L11 ch20-provvedimenti.ts revisione and revoca
 *  review ch20-ripasso.ts
 *
 * All 234 questions map here; no other module mapped any of them. App topic 17
 * «Veicoli e documenti» holds 184 of the 234 but they are only 28 % of its 646
 * questions (the rest belong to later chapters), so `topicIds: []`, as in
 * chapters 17 and 18. Coverage map and source flags: docs/chapter-20-coverage.md.
 */
import type { Chapter } from "./lessons.js";
import { lessonB1B, lessonRimorchi } from "./ch20-auto.js";
import { lessonDocumenti } from "./ch20-documenti.js";
import { lessonA2A, lessonAmA1 } from "./ch20-moto.js";
import { lessonRitiro, lessonRevisioneRevoca, lessonSospensione } from "./ch20-provvedimenti.js";
import { lessonPerditaPunti, lessonPuntiSistema } from "./ch20-punti.js";
import { reviewPatente } from "./ch20-ripasso.js";
import { lessonValidita } from "./ch20-validita.js";

/** First and last bank source id of chapter 20 (bank groups 547–564), for coverage checks. */
export const CHAPTER_20_SOURCE_RANGE = [6126, 6359] as const;

const LIC = (n: string) => `https://leggeinchiaro.it/articolo-${n}-codice-della-strada/`;
const BROCARDI = (n: string) => `https://www.brocardi.it/codice-della-strada/titolo-iv/art${n}.html`;

export const PATENTE_CHAPTER: Chapter = {
  id: "patente-punti-documenti",
  numbers: [20],
  topicIds: [],
  nameIt: "Patente, punti e documenti",
  titleFa: "گواهینامه، امتیاز و مدارک",
  summaryFa:
    "مدارک و پلاکِ خودرو، ردیف‌های گواهینامه از AM تا BE (با یدک و کدِ ۹۶)، اعتبار و تمدید، گواهینامه‌ی امتیازی، و چهار اتفاقی که برای گواهینامه می‌افتد: گرفتن، تعلیق، بازآزمایی، ابطال. یازده درسِ کوتاه و یک مرور.",
  reviewedOn: "2026-11-15",
  sources: [
    {
      label: "Codice della Strada (D.Lgs. 285/1992), testo vigente",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    {
      label: "Brocardi: CdS artt. 115 (età), 116 (categorie, B, codice 96, BE), 124 (macchine agricole e operatrici), 126-bis (punti) (agg. 25/04/2026), letti il 15/11/2026",
      url: BROCARDI("116"),
    },
    {
      label: "Legge in Chiaro: CdS art. 117 c.2-bis e c.5 (neopatentati: tre anni, 75 kW/t, 105 kW; sospensione), letto il 15/11/2026",
      url: LIC("117"),
    },
    {
      label: "Legge in Chiaro: CdS art. 126 (validità 10/5/3/2 anni, patenti speciali, conferma, patente scaduta), letto il 15/11/2026",
      url: LIC("126"),
    },
    {
      label: "Ministero delle Infrastrutture e dei Trasporti: tabella dei punteggi art. 126-bis (revisione 2010; raddoppio nei primi tre anni, un punto all'anno), letta il 15/11/2026",
      url: "https://www.ilportaledellautomobilista.it/documents/56611/57319/tabella_punteggi.pdf",
    },
    {
      label: "Legge in Chiaro: CdS artt. 128 (revisione), 129 (sospensione), 130 (revoca), 120 (requisiti morali), letti il 15/11/2026",
      url: LIC("128"),
    },
    {
      label: "Legge in Chiaro: CdS artt. 216, 218, 219, 223 (ritiro, sospensione, revoca come sanzioni accessorie), letti il 15/11/2026",
      url: LIC("218"),
    },
    {
      label: "Brocardi: CdS art. 218-ter, sospensione breve (L. 177/2024; agg. 25/04/2026), letto il 15/11/2026",
      url: "https://brocardi.it/codice-della-strada/titolo-vi/capo-i/sezione-ii/art218ter.html",
    },
    {
      label: "Legge in Chiaro: CdS artt. 142 (velocità, sospensione), 176 (autostrade, revoca e sospensione), 100 (targhe), 180 (documenti), letti il 15/11/2026",
      url: LIC("142"),
    },
    {
      label: "InSella: «Patente B: quali moto posso guidare» (19/11/2025; 125 cm³ e tricicli solo in Italia), letto il 15/11/2026",
      url: "https://www.insella.it/da-sapere/legge-burocrazia/patente-b-quali-moto-posso-guidare-45975",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «patente-punti-documenti»",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [
    lessonDocumenti,
    lessonAmA1,
    lessonA2A,
    lessonB1B,
    lessonRimorchi,
    lessonValidita,
    lessonPuntiSistema,
    lessonPerditaPunti,
    lessonRitiro,
    lessonSospensione,
    lessonRevisioneRevoca,
    reviewPatente,
  ],
};
