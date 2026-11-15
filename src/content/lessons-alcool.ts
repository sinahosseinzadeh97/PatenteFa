/**
 * src/content/lessons-alcool.ts
 * Official chapter 22: Alcool, droga e primo soccorso. Bank group
 * `alcool-droga-primo-soccorso` (groups 576–596), source ids 6462–6602, 141
 * questions, 21 groups, no images. Eleven lessons + the review, impairment first
 * and first aid second:
 *
 *  L1  ch22-alcol.ts     what alcohol does to driving (581, 595)
 *  L2  ch22-alcol.ts     only time; myths; the law: artt. 186, 186-bis (577, 580, 581)
 *  L3  ch22-sostanze.ts  drugs and medicines; art. 187 (578, 579)
 *  L4  ch22-idoneita.ts  tiredness, meals, emotions; glasses and code 01 (576, 580, 581, 596)
 *  L5  ch22-soccorso.ts  the duty to help; what a rescuer does (582, 593)
 *  L6  ch22-soccorso.ts  aims of first aid; an unconscious casualty (583, 589)
 *  L7  ch22-ferite.ts    bleeding wounds; heavy bleeding (584, 585)
 *  L8  ch22-shock.ts     shock: causes and signs (594, 587)
 *  L9  ch22-shock.ts     positions: shock and chest injuries, drawing `posizioni` (588, 590)
 *  L10 ch22-traumi.ts    broken limbs; something in the eye (591, 586)
 *  L11 ch22-traumi.ts    burns (592)
 *  review ch22-ripasso.ts
 *
 * 135 map here. Six (6463, 6482, 6488, 6586, 6587, 6590: tiredness and
 * distance, heavy food, alcohol and reaction time) were mapped first by
 * chapter 12 (lessons-velocita.ts) and stay there, so saved progress and
 * mistake routing do not move. Topics are scattered, so `topicIds: []`, as in
 * chapters 18, 20 and 21. Duties after an accident (art. 189) are chapter 21
 * lesson 7, linked from L5, not repeated.
 *
 * DISPUTED_SOURCE_IDS are statements whose bank answer differs from current
 * first-aid guidance. They stay mapped (a mistake in an exam still routes to the
 * section that explains the difference) but never appear as a scored lesson or
 * review question, a trap example or a factor item (tests/chapter22.test.ts).
 * Coverage map and flags: docs/chapter-22-coverage.md (local).
 */
import type { Chapter } from "./lessons.js";
import { lessonAlcolEffetti, lessonAlcolTempoLegge } from "./ch22-alcol.js";
import { lessonFeriteEmorragia } from "./ch22-ferite.js";
import { lessonStanchezzaVista } from "./ch22-idoneita.js";
import { reviewAlcool } from "./ch22-ripasso.js";
import { lessonPosizioniShockTorace, lessonShockCauseSegni } from "./ch22-shock.js";
import { lessonPrimoSoccorsoIncosciente, lessonSoccorsoObbligo } from "./ch22-soccorso.js";
import { lessonDrogheFarmaci } from "./ch22-sostanze.js";
import { lessonFrattureOcchio, lessonUstioni } from "./ch22-traumi.js";

/** First and last bank source id of chapter 22 (bank groups 576–596), for coverage checks. */
export const CHAPTER_22_SOURCE_RANGE = [6462, 6602] as const;

/**
 * Bank answer differs from current guidance; mapped, explained, never scored here.
 * 6518 water to a heavily bleeding casualty · 6578, 6581 emotion as a cause of
 * shock · 6550 pressing a cloth on an open chest wound.
 */
export const DISPUTED_SOURCE_IDS = ["6518", "6550", "6578", "6581"] as const;

const LIC = (n: string) => `https://leggeinchiaro.it/articolo-${n}-codice-della-strada/`;

export const ALCOOL_CHAPTER: Chapter = {
  id: "alcool-droga-primo-soccorso",
  numbers: [22],
  topicIds: [],
  nameIt: "Alcool, droga e primo soccorso",
  titleFa: "الکل، مواد مخدر و کمک‌های اولیه",
  summaryFa:
    "اول آمادگی برای رانندگی: الکل با توانایی‌هایت چه می‌کند، چرا فقط زمان کمک می‌کند و قانون چه می‌گوید، مواد مخدر و دارو، خستگی و عینک. بعد کمک‌های اولیه برای کسی که آموزش ندیده: وظیفه‌ی قانونی، خبر کردنِ ۱۱۲ و پیروی از اپراتور، بیهوشی، خونریزی، شوک، شکستگی، چشم و سوختگی. یازده درسِ کوتاه و یک مرور؛ گواهیِ کمک‌های اولیه نیست.",
  reviewedOn: "2026-11-15",
  sources: [
    {
      label: "Codice della Strada (D.Lgs. 285/1992), testo vigente",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    {
      label: "Legge in Chiaro: CdS art. 186, guida sotto l'influenza dell'alcool (c.1–2, c.9-ter alcolock; agg. 23/10/2026), letto il 15/11/2026",
      url: LIC("186"),
    },
    {
      label: "Legge in Chiaro: CdS art. 186-bis, conducenti under 21, neopatentati e professionali: limite 0 g/l (agg. 04/11/2026), letto il 15/11/2026",
      url: LIC("186-bis"),
    },
    {
      label: "Legge in Chiaro: CdS art. 187, guida dopo l'assunzione di sostanze stupefacenti (testo dopo L. 177/2024; agg. 29/10/2026), letto il 15/11/2026",
      url: LIC("187"),
    },
    {
      label: "Corte costituzionale, sentenza n. 10/2026 (art. 187: serve un'influenza ancora in atto alla guida); letta tramite i commenti di Sistema Penale e il comunicato stampa, non nel testo integrale",
      url: "https://giurcost.org/decisioni/2026/0010s-26.html",
    },
    {
      label: "Cass. pen. sez. IV n. 4893/2015: la guida in stato di ebbrezza è reato anche in bicicletta, senza sospensione della patente (letta tramite commento)",
      url: "https://www.diritto.it/guida-in-stato-di-ebbrezza-vale-anche-per-ciclisti/",
    },
    {
      label: "Legge in Chiaro: CdS art. 173 c.1 e c.3, obbligo di lenti prescritte sulla patente (agg. 27/10/2026), letto il 15/11/2026",
      url: LIC("173"),
    },
    {
      label: "Prefettura, allegato 8: codici armonizzati UE sulla patente (01 correzione della vista; 01.01 occhiali, 01.02 lenti a contatto, 01.06 occhiali o lenti), letto il 15/11/2026",
      url: "https://prefettura.interno.gov.it/sites/default/files/57/2024-01/allegato_8_-_codici_armonizzati_patenti.pdf",
    },
    {
      label: "Brocardi: Codice penale art. 593 c.2, omissione di soccorso (agg. 31/10/2026); per i conducenti coinvolti, CdS art. 189 (capitolo 21)",
      url: "https://www.brocardi.it/codice-penale/libro-secondo/titolo-xii/capo-i/art593.html",
    },
    {
      label: "Ministero della Salute, pieghevole «Alcol» (Osservatorio Nazionale Alcol – ISS, 2018): nessun livello sicuro per chi guida, nessun trucco, alcol con farmaci o droghe pericoloso; letto il 15/11/2026",
      url: "https://www.epicentro.iss.it/ALCOL/apd2018/pieghevole-alcol.pdf",
    },
    {
      label: "AIFA, riassunto delle caratteristiche e foglio illustrativo (dove leggere gli effetti di un farmaco sulla guida)",
      url: "https://www.aifa.gov.it/riassunto-caratteristiche-e-foglio-illustrativo",
    },
    {
      label: "European Resuscitation Council, Guidelines 2025 First Aid (Resuscitation 215, 2025, 110752; pubblicate il 27/10/2025): ABCDE, chiamare il 112, shock, emorragia, ferite aperte del torace, colonna cervicale; letto il 15/11/2026",
      url: "https://www.erc.edu/media/i2vllpae/gl2025-12-faid-e.pdf",
    },
    {
      label: "NHS, «Burns and scalds» (rev. 31/03/2026), letto il 15/11/2026",
      url: "https://www.nhs.uk/conditions/burns-and-scalds/",
    },
    {
      label: "NHS, «Broken arm or wrist» (rev. 02/10/2026), letto il 15/11/2026",
      url: "https://www.nhs.uk/conditions/broken-arm-or-wrist/",
    },
    {
      label: "NHS, «Eye injuries» (rev. 12/03/2026), letto il 15/11/2026",
      url: "https://www.nhs.uk/conditions/eye-injuries/",
    },
    {
      label: "Mayo Clinic, «Shock: First aid» (non dare da mangiare né da bere); la pagina non si apriva il 15/11/2026, letta tramite l'indice di ricerca",
      url: "https://www.mayoclinic.org/first-aid/first-aid-shock/basics/art-20056620",
    },
    {
      label: "Numero Unico di Emergenza 112: attivo in 16 Regioni e 2 Province autonome (febbraio 2026); 118 resta raggiungibile",
      url: "https://www.aziendazero.piemonte.it/wp-content/uploads/2026/02/cs-Giornata-Europea-NUE-112.pdf",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «alcool-droga-primo-soccorso»",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [
    lessonAlcolEffetti,
    lessonAlcolTempoLegge,
    lessonDrogheFarmaci,
    lessonStanchezzaVista,
    lessonSoccorsoObbligo,
    lessonPrimoSoccorsoIncosciente,
    lessonFeriteEmorragia,
    lessonShockCauseSegni,
    lessonPosizioniShockTorace,
    lessonFrattureOcchio,
    lessonUstioni,
    reviewAlcool,
  ],
};
