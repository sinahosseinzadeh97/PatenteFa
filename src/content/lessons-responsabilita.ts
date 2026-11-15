/**
 * src/content/lessons-responsabilita.ts
 * Official chapter 23: Responsabilità civile, penale e assicurazione. Bank group
 * `responsabilita-civile-penale-e-assicurazione` (groups 597–611), source ids
 * 6603–6751, 149 questions, 15 groups, no images. Twelve lessons + the review:
 *
 *  L1  ch23-responsabilita.ts  one crash, three kinds of consequence (598); drawing `conseguenze`
 *  L2  ch23-responsabilita.ts  when a crash is a crime, what does not erase it (599, 600)
 *  L3  ch23-civile.ts          civil liability (601)
 *  L4  ch23-civile.ts          who answers; settling a claim (603, 597)
 *  L5  ch23-rca.ts             RCA: law vs policy, certificate, bonus-malus (610, 608)
 *  L6  ch23-rca.ts             what RCA covers; direct compensation (609, 602)
 *  L7  ch23-limiti.ts          massimali, franchigia, rivalsa; optional policies (607, 606)
 *  L8  ch23-limiti.ts          without insurance; Fondo di garanzia (604, 605)
 *  L9  ch23-psicologia.ts      senses, attention, emotions (611)
 *  L10 ch23-psicologia.ts      distractions (611)
 *  L11 ch23-regole.ts          judging yourself and others (611)
 *  L12 ch23-regole.ts          why rules always hold; alcohol myths (611)
 *  review ch23-ripasso.ts
 *
 * 148 map here. 6713 (attention falls with tiredness) was mapped first by
 * chapter 12 and stays there. Licence measures are chapter 20, art. 189 and the
 * CAI form chapter 21, alcohol chapter 22: linked by lesson title, not repeated.
 * POLICY_DEPENDENT_SOURCE_IDS hold bank answers that depend on contract terms
 * (indemnity limit, theft abroad): mapped and explained, never scored.
 * Coverage map and flags: docs/chapter-23-coverage.md (local).
 */
import type { Chapter } from "./lessons.js";
import { lessonChiRisponde, lessonCivile } from "./ch23-civile.js";
import { lessonMassimaliPolizze, lessonSenzaAssicurazione } from "./ch23-limiti.js";
import { lessonAttenzione, lessonDistrazioni } from "./ch23-psicologia.js";
import { lessonRcaCopertura, lessonRcaObbligo } from "./ch23-rca.js";
import { lessonPercheRegole, lessonValutare } from "./ch23-regole.js";
import { lessonPenale, lessonTreConseguenze } from "./ch23-responsabilita.js";
import { reviewResponsabilita } from "./ch23-ripasso.js";

/** First and last bank source id of chapter 23 (bank groups 597–611), for coverage checks. */
export const CHAPTER_23_SOURCE_RANGE = [6603, 6751] as const;

/** Bank answer holds as a general rule but the detail is set by each policy; explained, never scored. */
export const POLICY_DEPENDENT_SOURCE_IDS = ["6669", "6670"] as const;

const LIC = (n: string) => `https://leggeinchiaro.it/articolo-${n}-codice-della-strada/`;
const BROCARDI_CAP = (part: string, n: string) => `https://brocardi.it/codice-delle-assicurazioni-private/${part}/art${n}.html`;

export const RESPONSABILITA_CHAPTER: Chapter = {
  id: "responsabilita-civile-penale-assicurazione",
  numbers: [23],
  topicIds: [],
  nameIt: "Responsabilità civile, penale e assicurazione",
  titleFa: "مسئولیتِ مدنی و کیفری، و بیمه",
  summaryFa:
    "یک تصادف و سه نوع پیامد که با هم جمع می‌شوند: جبرانِ خسارت (مدنی)، مجازات وقتی کار جرم است (کیفری)، و جریمه و امتیاز (اداری). بعد بیمه‌ی شخص ثالث: آنچه قانون می‌خواهد، آنچه می‌پوشاند و نمی‌پوشاند، سقفِ تعهد، بیمه‌های اختیاری، و وقتی بیمه‌ای نیست. آخر، روان‌شناسیِ ترافیک: توجه، حواس‌پرتی و چرا قاعده‌ها همیشه معتبرند. دوازده درسِ کوتاه و یک مرور؛ مشاوره‌ی حقوقی یا بیمه‌ای نیست.",
  reviewedOn: "2026-11-15",
  sources: [
    {
      label: "Brocardi: Codice civile art. 2054, circolazione di veicoli (agg. 31/10/2026), letto il 15/11/2026",
      url: "https://www.brocardi.it/codice-civile/libro-quarto/titolo-ix/art2054.html",
    },
    {
      label: "Brocardi: Codice penale art. 590 (lesioni colpose, a querela) e art. 590-bis (lesioni stradali gravi o gravissime; procedibilità dopo D.Lgs. 150/2022) (agg. 31/10/2026), letti il 15/11/2026",
      url: "https://www.brocardi.it/codice-penale/libro-secondo/titolo-xii/capo-i/art590bis.html",
    },
    {
      label: "Brocardi: Codice penale art. 45 (caso fortuito o forza maggiore) e art. 162-ter (estinzione per condotte riparatorie) (agg. 31/10/2026), letti il 15/11/2026",
      url: "https://www.brocardi.it/codice-penale/libro-primo/titolo-vi/capo-i/art162ter.html",
    },
    {
      label: "Legge in Chiaro: CdS art. 222, sanzioni accessorie dopo un reato con lesioni o morte (agg. 26/10/2026), letto il 15/11/2026",
      url: LIC("222"),
    },
    {
      label: "Legge in Chiaro: CdS art. 193, circolazione senza assicurazione: sanzione, sequestro, confisca (agg. 11/11/2026), letto il 15/11/2026",
      url: LIC("193"),
    },
    {
      label: "Legge in Chiaro: CdS art. 173 c.2 e c.3-bis, telefono e dispositivi alla guida (agg. 27/10/2026), letto il 15/11/2026",
      url: LIC("173"),
    },
    {
      label: "Brocardi: D.Lgs. 209/2005 (Codice delle assicurazioni private) art. 122, obbligo e terzi trasportati (dopo D.Lgs. 184/2023; agg. 12/08/2026), letto il 15/11/2026",
      url: BROCARDI_CAP("titolo-x/capo-i", "122"),
    },
    {
      label: "Brocardi: D.Lgs. 209/2005 art. 129, soggetti esclusi (agg. 12/08/2026), letto il 15/11/2026",
      url: BROCARDI_CAP("titolo-x/capo-i", "129"),
    },
    {
      label: "Brocardi: D.Lgs. 209/2005 art. 149, procedura di risarcimento diretto (agg. 12/08/2026), letto il 15/11/2026",
      url: BROCARDI_CAP("titolo-x/capo-iv", "149"),
    },
    {
      label: "IVASS, «Le guide assicurative in parole semplici», vol. 3: La responsabilità civile auto (ed. 2022): massimali, franchigia, rivalsa, 15 giorni di tolleranza, certificato a bordo, bonus malus, risarcimento diretto, polizze furto e incendio; letto il 15/11/2026",
      url: "https://www.ivass.it/consumatori/imparaconivass/guide/Guida_3_RC_Auto_versione_web.pdf",
    },
    {
      label: "Consap, Fondo di Garanzia per le Vittime della Strada (casi coperti, danni a persone e a cose); letto tramite l'indice di ricerca il 15/11/2026",
      url: "https://www.consap.it/fondo-di-garanzia-per-le-vittime-della-strada/",
    },
    {
      label: "Codice della Strada (D.Lgs. 285/1992), testo vigente",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «responsabilita-civile-penale-e-assicurazione»",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [
    lessonTreConseguenze,
    lessonPenale,
    lessonCivile,
    lessonChiRisponde,
    lessonRcaObbligo,
    lessonRcaCopertura,
    lessonMassimaliPolizze,
    lessonSenzaAssicurazione,
    lessonAttenzione,
    lessonDistrazioni,
    lessonValutare,
    lessonPercheRegole,
    reviewResponsabilita,
  ],
};
