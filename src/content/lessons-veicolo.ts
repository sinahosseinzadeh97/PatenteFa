/**
 * src/content/lessons-veicolo.ts
 * Official chapter 25: Elementi del veicolo, manutenzione e comportamenti, the
 * last group of the question bank and the end of the learning route. Bank group
 * `elementi-veicolo-manutenzione-comportamenti` (groups 627–656), source ids
 * 6855–7139, 285 questions, 30 groups, no images. Fourteen lessons + the review:
 *
 *  L1  ch25-aderenza.ts      grip between tyre and road (627–632)
 *  L2  ch25-aderenza.ts      curves: skid or rollover (633–635); drawing `ribaltamento`
 *  L3  ch25-freni.ts         ABS and emergency braking (636; 6954, 6959, 7003)
 *  L4  ch25-freni.ts         heat, descents, servo and fluid, parking brake (641, 646; 7008, 7010, 7023)
 *  L5  ch25-freni.ts         weak or uneven braking (647)
 *  L6  ch25-pneumatici.ts    tyre pressure and condition (637, 645; 6935)
 *  L7  ch25-pneumatici.ts    tread, tubeless punctures, winter tyres, chains (638, 639)
 *  L8  ch25-pneumatici.ts    wheel change and vehicle fire (640, 642)
 *  L9  ch25-sospensioni.ts   suspension (648, 649); drawing `sospensione`
 *  L10 ch25-sospensioni.ts   shock absorbers (650, 651)
 *  L11 ch25-sterzo.ts        steering and power steering (652)
 *  L12 ch25-scarico-vetri.ts the exhaust system (653)
 *  L13 ch25-scarico-vetri.ts glass, wipers and the cabin (643, 644)
 *  L14 ch25-moto.ts          two-wheelers: engine-stop switch, chain, levels (654–656); drawing `moto`
 *  review ch25-ripasso.ts    "Know the vehicle" map (drawing `veicolo`) + 28 questions
 *
 * 276 map here. 6868–6872, 6874, 6876, 6877 and 6910 were mapped first by
 * chapters 11 and 12 and stay there, so no saved mistake routing moves; L1 and
 * L3 link those lessons by title. VEICOLO_FLAGGED_SOURCE_IDS keep their bank
 * answers and mappings but are never scored; their sections explain why in a
 * «یادداشتِ منبع». Coverage map and flags: docs/chapter-25-coverage.md (local).
 */
import type { Chapter } from "./lessons.js";
import { lessonAderenza, lessonCurva } from "./ch25-aderenza.js";
import { lessonAbs, lessonFrenaturaInefficiente, lessonFreniImpianto } from "./ch25-freni.js";
import { lessonMoto } from "./ch25-moto.js";
import { lessonBattistrada, lessonPressione, lessonRuotaIncendio } from "./ch25-pneumatici.js";
import { reviewVeicolo } from "./ch25-ripasso.js";
import { lessonScarico, lessonVetriAbitacolo } from "./ch25-scarico-vetri.js";
import { lessonAmmortizzatori, lessonSospensioni } from "./ch25-sospensioni.js";
import { lessonSterzo } from "./ch25-sterzo.js";

/** First and last bank source id of chapter 25 (bank groups 627–656), for coverage checks. */
export const CHAPTER_25_SOURCE_RANGE = [6855, 7139] as const;

/** Chapter 25 questions mapped by earlier chapters, which keep them (saved mistakes route there). */
export const MAPPED_ELSEWHERE = ["6868", "6869", "6870", "6871", "6872", "6874", "6876", "6877", "6910"] as const;

/**
 * Bank answers kept but never scored:
 *  6938 non-approved snow chains fined "as if without chains": the chain standard (DM 10/05/2011) was found, the sanction was not.
 *  7101 exhaust replaced only at an authorised workshop (FALSO "personally"): the rule found requires an approved part, not a workshop.
 *  7131 motorcycle oil checked "not on the stand": Honda manuals read say to use the centre stand or hold it upright.
 */
export const VEICOLO_FLAGGED_SOURCE_IDS = ["6938", "7101", "7131"] as const;

const LIC = (n: string) => `https://leggeinchiaro.it/articolo-${n}-codice-della-strada/`;

export const VEICOLO_CHAPTER: Chapter = {
  id: "elementi-veicolo-manutenzione-comportamenti",
  numbers: [25],
  topicIds: [],
  nameIt: "Elementi del veicolo, manutenzione e comportamenti",
  titleFa: "خودرو را بشناس: چسبندگی، ترمز، لاستیک، تعلیق، فرمان",
  summaryFa:
    "قطعه‌هایی که خودرو را روی جاده نگه می‌دارند و می‌ایستانند: چسبندگی و پیچ، ABS و ترمز، لاستیک، سیستمِ تعلیق و کمک‌فنر، فرمان، اگزوز و شیشه‌ها، و دوچرخ‌ها. هر قطعه چه می‌کند، خرابی‌اش چطور پیدا است، و راننده چه چیزی را خودش می‌بیند و چه چیزی را به تعمیرگاه می‌سپارد. هر جا خودروی دنده‌اتومات، هیبریدی یا برقی فرق دارد، جدا گفته شده. آخرین فصلِ مسیر: چهارده درسِ کوتاه و یک مرور با نقشه‌ی «خودرو را بشناس».",
  reviewedOn: "2026-11-15",
  sources: [
    { label: "Normattiva: L. 19 febbraio 1992 n. 142, art. 66, spessore minimo del battistrada (1,6 mm autoveicoli e rimorchi, 1 mm motoveicoli, 0,5 mm ciclomotori), letto il 15/11/2026", url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:1992-02-19;142~art66" },
    { label: "MIT, circolare prot. 12047 del 30/04/2020 (richiama la circ. 1049 del 17/01/2014): pneumatici invernali con codice di velocità inferiore, 15 ottobre–15 maggio, letta il 15/11/2026", url: "https://sicurauto.it/wp-content/uploads/2022/11/M_DIP.MOT_.REGISTRO_UFFICIALEU.0012047.30-04-2020-1.pdf" },
    { label: "Polizia di Stato: pneumatici invernali e chiodati (chiodati solo fino a 3,5 t), letto il 15/11/2026", url: "https://www.poliziadistato.it/articolo/pdf/3863bd514a9f5b1607182432" },
    { label: "DM 10 maggio 2011 (GU n. 185 del 10/08/2011): catene da neve conformi a UNI 11313 / ÖNORM V5117 (aggiornato dal DM 23/02/2023, via fonte secondaria), letto il 15/11/2026", url: "https://www.certifico.com/id/18063" },
    { label: "Legge in Chiaro: DPR 495/1992 art. 170, segnali a messaggio variabile: indicazioni di pericolo o di prescrizione (agg. 29/10/2026), letto il 15/11/2026", url: "https://leggeinchiaro.it/articolo-170-regolamento-codice-strada/" },
    { label: "Brocardi: CdS art. 173, uso di dispositivi durante la guida (L. 177/2024) (agg. 25/04/2026), letto il 15/11/2026", url: "https://www.brocardi.it/codice-della-strada/titolo-v/art173.html" },
    { label: "Fiat 600, libretto d'uso (06/2023): ABS, freno di stazionamento elettrico, sostituzione ruota (P, freno, luci di emergenza), ruotino max 80 km/h, letto il 15/11/2026", url: "https://aftersales.fiat.com/eLumData/IT/00/365_FIAT600/00_365_FIAT600_603.85.924_IT_03_06.23_L_LG/00_365_FIAT600_603.85.924_IT_03_06.23_L_LG.pdf" },
    { label: "Kia, owner's manual: servofreno a motore spento, ABS «non pompare», servosterzo elettrico, ruotino, incendio del veicolo elettrico, letto il 15/11/2026", url: "https://ownersmanual.kia.com/full_webhelp/CD/2024/it_IT/topics/chapter6_10_5.html" },
    { label: "Hella Tech World: pompe a vuoto elettriche (ibridi ed elettrici) e liquido freni igroscopico, bolle di vapore, intervalli del costruttore, letto il 15/11/2026", url: "https://www.hella.com/techworld/en/technical/brakes/changing-the-brake-fluid/" },
    { label: "Pirelli: pressione da misurare a gomme fredde; durata e battistrada, letto il 15/11/2026", url: "https://pirelli.com/tyres/it-it/auto/consigli/controllare-pressione-pneumatici" },
    { label: "Honda, owner's manuals (GL1800, CB1000, CMX300): interruttore di arresto motore; controllo olio con la moto verticale (cavalletto centrale), letti il 15/11/2026", url: "https://www.bike-parts.fr/thumbs/pdf_url/img/owner_manuals/owner_CB1000CAH_NAH_EN/2500_2500/0070.pdf" },
    { label: "Circolare Min. Trasporti DC IV B/03 del 24/11/1997: silenziatore di sostituzione omologato per il medesimo tipo di veicolo (copia non ufficiale), letta il 15/11/2026", url: "https://www.quellidellelica.com/vaq/ScarichiCircolareMTCC.pdf" },
    { label: "Legge in Chiaro: CdS artt. 72, 78, 79, 155, 162 (dispositivi, modifiche, efficienza, rumori, segnale mobile di pericolo); citati, non riletti in questa sessione", url: LIC("79") },
    { label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «elementi-veicolo-manutenzione-comportamenti»", url: "https://github.com/Ed0ardo/QuizPatenteB" },
  ],
  lessons: [
    lessonAderenza,
    lessonCurva,
    lessonAbs,
    lessonFreniImpianto,
    lessonFrenaturaInefficiente,
    lessonPressione,
    lessonBattistrada,
    lessonRuotaIncendio,
    lessonSospensioni,
    lessonAmmortizzatori,
    lessonSterzo,
    lessonScarico,
    lessonVetriAbitacolo,
    lessonMoto,
    reviewVeicolo,
  ],
};
