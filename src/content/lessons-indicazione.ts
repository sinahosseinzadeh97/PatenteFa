/**
 * src/content/lessons-indicazione.ts
 * Official chapter 8: Segnali di indicazione. Bank group `segnali-indicazione`
 * (groups 220–282), source ids 2904–3506, 603 questions, 63 signs.
 * Fifteen lessons + the review:
 *
 *  L1  ch8-strade.ts   what an indication sign is; background colours
 *  L2  ch8-strade.ts   road identification badges E, A, SS, SC
 *  L3  ch8-strade.ts   confirmation, progressive distance, exit signs
 *  L4  ch8-incroci.ts  junction advance signs (close junctions, roundabout, signs on a branch)
 *  L5  ch8-incroci.ts  lane preselection, junction splits
 *  L6  ch8-luoghi.ts   start/end of town, river name, EU border
 *  L7  ch8-luoghi.ts   main extra-urban road, motor-vehicle road, general limits
 *  L8  ch8-luoghi.ts   one-way and dead-end streets
 *  L9  ch8-zone.ts     pedestrian area, ZTL, crossings, school bus
 *  L10 ch8-zone.ts     lane use, minimum speeds per lane, lane count
 *  L11 ch8-guida.ts    advised speed, tunnel, bridge, mountain pass
 *  L12 ch8-guida.ts    indirect left turn, U-turn structure, lay-by
 *  L13 ch8-guida.ts    advised vs obligatory diversions (white / yellow)
 *  L14 ch8-servizi.ts  road services
 *  L15 ch8-servizi.ts  hospital, first aid, taxi, bus, park-and-ride, car on train
 *
 * Every chapter-8 question maps to exactly one chapter-8 section; no earlier
 * module mapped any of them. Related lessons elsewhere are linked in the text,
 * not duplicated: chapter 2 (danger triangles for crossings; distance vs length
 * panels), chapter 3 (truck ban sign), chapter 4 (blue-circle obligations:
 * minimum speed, chains, ALT – DOGANA), chapter 5 (sign 224 named in tables).
 *
 * No app topic matches this chapter (its questions were keyword-filed under
 * several topics, mostly "Altro / Misto"), so `topicIds` is empty, as in
 * chapter 1. Coverage map, reuse notes and source flags:
 * docs/chapter-8-coverage.md.
 */
import type { Chapter } from "./lessons.js";
import { lessonPreavvisiIntersezione, lessonPreselezioneDiramazione } from "./ch8-incroci.js";
import { lessonDeviazioni, lessonGuidaGalleriaPonte, lessonPercorsiCarreggiate } from "./ch8-guida.js";
import { lessonLocalitaConfini, lessonSensoUnicoSenzaUscita, lessonTipoStradaLimiti } from "./ch8-luoghi.js";
import { reviewIndicazione } from "./ch8-ripasso.js";
import { lessonServiziSaluteTrasporti, lessonServiziViaggio } from "./ch8-servizi.js";
import { lessonDistanzeAutostrada, lessonIndicazioneColori, lessonNumeriStrade } from "./ch8-strade.js";
import { lessonUsoCorsie, lessonZoneAttraversamenti } from "./ch8-zone.js";

/** First and last bank source id of chapter 8 (bank groups 220–282), for coverage checks. */
export const CHAPTER_8_SOURCE_RANGE = [2904, 3506] as const;

export const INDICAZIONE_CHAPTER: Chapter = {
  id: "segnali-indicazione",
  numbers: [8],
  topicIds: [],
  nameIt: "Segnali di indicazione",
  titleFa: "تابلوهای اطلاعاتی (راهنما)",
  summaryFa:
    "تابلوهایی که خبر می‌دهند، نه دستور: رنگِ زمینه و نوعِ جاده، شماره‌ی جاده و فاصله‌ها، پیش‌آگهیِ تقاطع و انتخابِ خط، شهر و مرز، یک‌طرفه و بن‌بست، خطوط و حداقلِ سرعت، تونل و پل، انحراف‌ها و تابلوهای خدمات. پانزده درسِ کوتاه و یک مرور.",
  reviewedOn: "2026-11-13",
  sources: [
    {
      label: "Regolamento di esecuzione (DPR 495/1992), testo vigente",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:presidente.repubblica:decreto:1992-12-16;495",
    },
    {
      label: "Codice della Strada (D.Lgs. 285/1992), testo vigente",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    {
      label: "Legge in Chiaro: DPR 495/1992 art. 78 (colori, agg. 25/10/2026), letto il 13/11/2026",
      url: "https://leggeinchiaro.it/articolo-78-regolamento-codice-strada/",
    },
    {
      label: "Legge in Chiaro: DPR 495/1992 artt. 124, 125, 127–132, 134–136 (agg. 26–29/10/2026), letti il 13/11/2026",
      url: "https://leggeinchiaro.it/articolo-124-regolamento-codice-strada/",
    },
    {
      label: "Brocardi: Codice della Strada artt. 142 c.1 e 191 c.1, letti il 13/11/2026",
      url: "https://www.brocardi.it/codice-della-strada/titolo-v/art142.html",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «segnali-indicazione»",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [
    lessonIndicazioneColori,
    lessonNumeriStrade,
    lessonDistanzeAutostrada,
    lessonPreavvisiIntersezione,
    lessonPreselezioneDiramazione,
    lessonLocalitaConfini,
    lessonTipoStradaLimiti,
    lessonSensoUnicoSenzaUscita,
    lessonZoneAttraversamenti,
    lessonUsoCorsie,
    lessonGuidaGalleriaPonte,
    lessonPercorsiCarreggiate,
    lessonDeviazioni,
    lessonServiziViaggio,
    lessonServiziSaluteTrasporti,
    reviewIndicazione,
  ],
};
