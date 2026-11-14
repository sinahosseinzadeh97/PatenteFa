/**
 * src/content/lessons-luci.ts
 * Official chapter 18: Luci e dispositivi acustici. Bank group
 * `luci-dispositivi-acustici` (groups 513–534), source ids 5815–5990,
 * 176 questions, 22 groups, 9 bank images (695–698, 704–707, 721). Six lessons
 * + the review, from "which light, when" to the dashboard:
 *
 *  L1 ch18-luci.ts         the lights, dipped beam (outside towns, tunnels, night, poor visibility), rear fog light
 *  L2 ch18-luci.ts         parked at night, the plate light, reflectors (they only reflect)
 *  L3 ch18-abbaglianti.ts  main beam: where, when to dip (glare, bad aim, unapproved lamps), flashing; the horn in one row
 *  L4 ch18-indicatori.ts   indicators: every sideways move or stop, either side, any road; when not
 *  L5 ch18-spie.ts         tell-tale colours, the symbols 695–697, the hazard warning 698
 *  L6 ch18-spie.ts         red fault lights 704, 706, 705, 721 and the seat belt 707
 *  review ch18-ripasso.ts
 *
 * 173 questions map here; #5912, #5917, #5918 (indicators when overtaking)
 * stay in chapter 15 (`sorpasso-fasi`). The bank group has no horn question:
 * those are in chapters 1–3, 13, 15 and 24. No app topic matches (78 of these
 * were keyword-filed under "Altro / Misto", the rest under 14 others), so
 * `topicIds: []`. Coverage map and source flags: docs/chapter-18-coverage.md.
 */
import type { Chapter } from "./lessons.js";
import { lessonAbbaglianti } from "./ch18-abbaglianti.js";
import { lessonIndicatori } from "./ch18-indicatori.js";
import { lessonLuciQuando, lessonSostaCatadiottri } from "./ch18-luci.js";
import { reviewLuci } from "./ch18-ripasso.js";
import { lessonSpieColori, lessonSpieGuasti } from "./ch18-spie.js";

/** First and last bank source id of chapter 18 (bank groups 513–534), for coverage checks. */
export const CHAPTER_18_SOURCE_RANGE = [5815, 5990] as const;

/** Chapter 18 questions taught (and mapped) by chapter 15's overtaking lesson. */
export const CHAPTER_18_MAPPED_ELSEWHERE = ["5912", "5917", "5918"] as const;

const CDS = (n: number) => `https://leggeinchiaro.it/articolo-${n}-codice-della-strada/`;

export const LUCI_CHAPTER: Chapter = {
  id: "luci-dispositivi-acustici",
  numbers: [18],
  topicIds: [],
  nameIt: "Luci e dispositivi acustici",
  titleFa: "چراغ‌ها، راهنما و داشبورد",
  summaryFa:
    "کدام چراغ کجا و کِی: نورِ پایین، چراغِ مه، پارک در شب، پلاک و شبرنگ. بعد نورِ بالا و چشمک، چراغ راهنما برای هر حرکتِ به کنار، و در آخر داشبورد: رنگِ هر چراغِ نشانگر و چراغ‌های قرمزی که می‌گویند چیزی خراب است. شش درسِ کوتاه و یک مرور.",
  reviewedOn: "2026-11-14",
  sources: [
    {
      label: "Codice della Strada (D.Lgs. 285/1992), testo vigente",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    {
      label: "Legge in Chiaro: CdS art. 152 c.1 (luci fuori dei centri abitati, luci di marcia diurna; agg. 27/10/2026), letto il 14/11/2026",
      url: CDS(152),
    },
    {
      label: "Legge in Chiaro: CdS art. 153 c.1–8 (notte, gallerie, abbaglianti, lampeggio, sosta, segnalazione di pericolo, retronebbia; agg. 29/10/2026), letto il 14/11/2026",
      url: CDS(153),
    },
    {
      label: "Brocardi: CdS art. 153 (agg. 25/04/2026; nota sulla L. 177/2024), letto il 14/11/2026",
      url: "https://www.brocardi.it/codice-della-strada/titolo-v/art153.html",
    },
    {
      label: "Legge in Chiaro: CdS art. 154 c.1–2, c.5 (indicatori di direzione; agg. 26/10/2026), letto il 14/11/2026",
      url: CDS(154),
    },
    {
      label: "Legge in Chiaro: CdS art. 156 (dispositivi acustici; agg. 27/10/2026), letto il 14/11/2026",
      url: CDS(156),
    },
    {
      label: "UN Regulation No. 121, tabella 1 (simboli e colori di comandi e spie), testo MLIT, letto il 14/11/2026",
      url: "https://www.mlit.go.jp/jidosha/un/UN_R121.pdf",
    },
    {
      label: "NSAI, installazione dei dispositivi di illuminazione secondo UN R48 (catadiottri: colori e forme), letto il 14/11/2026",
      url: "https://www.nsai.ie/images/uploads/certification-automotive/Appendix-II-Light-installation.pdf",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «luci-dispositivi-acustici»",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [
    lessonLuciQuando,
    lessonSostaCatadiottri,
    lessonAbbaglianti,
    lessonIndicatori,
    lessonSpieColori,
    lessonSpieGuasti,
    reviewLuci,
  ],
};
