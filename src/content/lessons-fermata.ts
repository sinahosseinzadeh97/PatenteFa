/**
 * src/content/lessons-fermata.ts
 * Official chapter 16: Fermata, sosta, arresto. Bank group
 * `fermata-sosta-arresto` (groups 452–472), source ids 5292–5482, 191
 * questions, 21 groups, one image (sign 84). Seven lessons + the review,
 * from "what kind of stop is this" to "where may I stop" to the driver's own
 * duties when parked and before driving off:
 *
 *  L1 ch16-definizioni.ts  arresto / fermata / sosta / sosta di emergenza; what a fermata requires
 *  L2 ch16-posizione.ts    right edge, 1 m, off the carriageway; one-way left (3 m), bays; disco orario, parchimetro
 *  L3 ch16-divieti.ts      art. 158 c.1: fermata AND sosta banned (rail, tunnels, crests, curves, signs, junctions, crossings)
 *  L4 ch16-divieti.ts      art. 158 c.2: only sosta banned (driveways, double parking, bus/taxi/market, fuel, bins)
 *  L5 ch16-riservati.ts    disabled spaces, reserved lanes, pedestrian areas, ZTL; which offences cost points
 *  L6 ch16-sicurezza.ts    leaving the car parked safely; opening doors and getting out
 *  L7 ch16-sicurezza.ts    before driving off: seat, mirrors, controls, belts, documents, efficiency, load
 *
 * Every chapter-16 question maps to exactly one chapter-16 section; no other
 * module maps any of them. Chapter 3 L11 (`divieto-sosta-fermata`) teaches the
 * two parking signs with the same three words and is linked, not copied.
 * Coverage map, reuse notes and source flags: docs/chapter-16-coverage.md.
 */
import type { Chapter } from "./lessons.js";
import { lessonFermataSostaDefinizioni } from "./ch16-definizioni.js";
import { lessonFermataSostaVietate, lessonSoloSostaVietata } from "./ch16-divieti.js";
import { lessonDoveCollocare } from "./ch16-posizione.js";
import { reviewFermataSosta } from "./ch16-ripasso.js";
import { lessonSpaziRiservati } from "./ch16-riservati.js";
import { lessonPrimaDiPartire, lessonSostaSicura } from "./ch16-sicurezza.js";

/** First and last bank source id of chapter 16, for coverage checks. */
export const CHAPTER_16_SOURCE_RANGE = [5292, 5482] as const;

const CDS = (n: number | string) => `https://leggeinchiaro.it/articolo-${n}-codice-della-strada/`;

export const FERMATA_CHAPTER: Chapter = {
  id: "fermata-sosta-arresto",
  numbers: [16],
  topicIds: [14],
  nameIt: "Fermata, sosta, arresto",
  titleFa: "توقف کوتاه، پارک و ایستادن",
  summaryFa:
    "اول چهار کلمه‌ی قانون: ایستادن به خاطرِ ترافیک، توقف کوتاه، پارک و توقفِ اضطراری. بعد خودرو را کجای جاده بگذاری، کجا هر دو ممنوع‌اند، کجا فقط پارک، و کدام پارکِ ممنوع امتیاز هم کم می‌کند. آخر کارهای خودِ راننده: پارکِ امن، باز کردنِ در، و پیش از راه افتادن. هفت درسِ کوتاه و یک مرور.",
  reviewedOn: "2026-11-14",
  sources: [
    {
      label: "Codice della Strada (D.Lgs. 285/1992), testo vigente",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    {
      label: "Legge in Chiaro: CdS art. 157 (arresto, fermata, sosta; agg. 27/10/2026), letto il 14/11/2026",
      url: CDS(157),
    },
    {
      label: "Legge in Chiaro: CdS art. 158 (divieti di fermata e di sosta; agg. 27/10/2026), letto il 14/11/2026",
      url: CDS(158),
    },
    {
      label: "Legge in Chiaro: CdS art. 176 c.1, c.5–6 (autostrade: sosta di emergenza, corsie di variazione di velocità; agg. 27/10/2026), letto il 14/11/2026",
      url: CDS(176),
    },
    {
      label: "Legge in Chiaro: CdS art. 188 c.3 (veicoli al servizio di persone invalide e limiti di tempo; agg. 27/10/2026), letto il 14/11/2026",
      url: CDS(188),
    },
    {
      label: "Legge in Chiaro: CdS art. 153 c.5 (luci durante la sosta notturna; agg. 27/10/2026), letto il 14/11/2026",
      url: CDS(153),
    },
    {
      label: "Legge in Chiaro: CdS artt. 164 c.1, 169 c.1 e c.4, 172 c.1 e c.5 (carico, visibilità, cinture, airbag; agg. 27–29/10/2026), letti il 14/11/2026",
      url: CDS(172),
    },
    {
      label: "Certifico, tabella punti patente (art. 126-bis; art. 158 c.2 lett. d, h: 2 punti; lett. g: 4 punti, D.L. 121/2021), rev. 12/02/2025, letta il 14/11/2026",
      url: "https://www.certifico.com/trasporto/news-trasporto/tabella-punti-patente-codice-della-strada",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «fermata-sosta-arresto»",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [
    lessonFermataSostaDefinizioni,
    lessonDoveCollocare,
    lessonFermataSostaVietate,
    lessonSoloSostaVietata,
    lessonSpaziRiservati,
    lessonSostaSicura,
    lessonPrimaDiPartire,
    reviewFermataSosta,
  ],
};
