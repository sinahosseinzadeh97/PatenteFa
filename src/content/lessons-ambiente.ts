/**
 * src/content/lessons-ambiente.ts
 * Official chapter 24: Consumi, ambiente e inquinamento. Bank group
 * `consumi-ambiente-inquinamento` (groups 612–626), source ids 6752–6854,
 * 103 questions, 15 groups, no images. Ten lessons + the review:
 *
 *  L1  ch24-consumi.ts  air, weight, tyres, towing (612, 620, 623); drawing `resistenze`
 *  L2  ch24-consumi.ts  electrics, air conditioning, vehicle type (612, 618, 620, 622, 623)
 *  L3  ch24-guida.ts    smooth driving and gears (612, 617, 618, 620, 621)
 *  L4  ch24-guida.ts    throttle myths, cold engine, idling (617, 618, 620–622)
 *  L5  ch24-scarico.ts  what leaves the exhaust; Euro; modifications (617–619, 623, 624); drawing `scarico`
 *  L6  ch24-scarico.ts  maintenance and smoke (617–619, 621)
 *  L7  ch24-rumore.ts   where vehicle noise comes from; the silencer (613–616)
 *  L8  ch24-rumore.ts   noise from driving; the horn (613–615)
 *  L9  ch24-rifiuti.ts  vehicle waste (625)
 *  L10 ch24-rifiuti.ts  bans on every road, and bans that are not (626)
 *  review ch24-ripasso.ts
 *
 * All 103 map here; no other chapter mapped any of them, so no saved progress
 * or mistake routing moved. Chapters 1, 11, 12, 13, 16, 17 and 18 are linked by
 * lesson title, not repeated. FLAGGED_SOURCE_IDS keep their bank answers and
 * mappings but are never scored; their sections explain why in a «یادداشتِ منبع».
 * Coverage map and flags: docs/chapter-24-coverage.md (local).
 */
import type { Chapter } from "./lessons.js";
import { lessonImpiantiTipi, lessonResistenze } from "./ch24-consumi.js";
import { lessonGuidaFluida, lessonMitiMotore } from "./ch24-guida.js";
import { lessonDivietiStrade, lessonRifiuti } from "./ch24-rifiuti.js";
import { reviewAmbiente } from "./ch24-ripasso.js";
import { lessonRumoreGuida, lessonRumoreVeicolo } from "./ch24-rumore.js";
import { lessonCosaEsce, lessonMotoreSano } from "./ch24-scarico.js";

/** First and last bank source id of chapter 24 (bank groups 612–626), for coverage checks. */
export const CHAPTER_24_SOURCE_RANGE = [6752, 6854] as const;

/**
 * Bank answers kept but never scored:
 *  6807 exhaust gas is "most" of vehicle air pollution: true for gases; for particles EEA (2026) reports non-exhaust rising.
 *  6813 fine and withdrawal of the registration document for excess emissions: fine in art. 79, withdrawal found only in art. 78.
 *  6841 the retailer takes the old battery back free: the 2008 decree read gives free return at collection centres.
 */
export const FLAGGED_SOURCE_IDS = ["6807", "6813", "6841"] as const;

const LIC = (n: string) => `https://leggeinchiaro.it/articolo-${n}-codice-della-strada/`;
const BROCARDI_AMB = (n: string) => `https://www.brocardi.it/codice-dell-ambiente/parte-quarta/titolo-vi/capo-i/art${n}.html`;

export const AMBIENTE_CHAPTER: Chapter = {
  id: "consumi-ambiente-inquinamento",
  numbers: [24],
  topicIds: [],
  nameIt: "Consumi, ambiente e inquinamento",
  titleFa: "مصرفِ سوخت، محیط‌زیست و آلودگی",
  summaryFa:
    "خودرو انرژی‌اش را کجا خرج می‌کند و رانندگیِ تو چطور آن را کم یا زیاد می‌کند؛ از اگزوز چه بیرون می‌آید و چرا مصرف، دی‌اکسیدِ کربن، آلاینده‌های هوا و صدا چهار چیزِ جدا هستند؛ موتورِ سالم، صداخفه‌کن و بوق؛ و زباله‌های خودرو کجا می‌روند. هر جا توصیه برای خودروی بنزینی، هیبریدی یا برقی فرق دارد، جدا گفته شده. ده درسِ کوتاه و یک مرور.",
  reviewedOn: "2026-11-15",
  sources: [
    {
      label: "MIMIT–MASE–MIT, Guida sul risparmio di carburante e sulle emissioni di CO₂ delle autovetture, ed. 2025 (GU n. 281 del 3/12/2025): «Consigli agli automobilisti» (condizioni del veicolo, stile di guida); letta il 15/11/2026",
      url: "https://www.mimit.gov.it/it/per-i-media/pubblicazioni/guida-sul-risparmio-di-carburante-e-sulle-emissioni-di-co2-delle-autovetture-edizione-2025",
    },
    {
      label: "EEA, Sustainability of Europe's mobility systems 2025: air pollution (pubbl. 10/02/2026): emissioni allo scarico e non allo scarico, ozono e smog, veicoli elettrici; letto il 15/11/2026",
      url: "https://www.eea.europa.eu/en/analysis/publications/sustainability-of-europes-mobility-systems-2025/air-pollution",
    },
    {
      label: "ISPRA, metodologie di stima delle emissioni da trasporto stradale (sovra-emissioni a motore freddo); consultato tramite l'indice di ricerca il 15/11/2026",
      url: "https://groupware.sinanet.isprambiente.it/expert_panel/library/report/metodologie_trasportipdf/download/en/1/metodologie_emis_trasporti.pdf",
    },
    { label: "Legge in Chiaro: CdS art. 15, atti vietati (agg. 27/10/2026), letto il 15/11/2026", url: LIC("15") },
    { label: "Legge in Chiaro: CdS art. 61, sagoma limite: 12 m per i veicoli isolati (agg. 29/10/2026), letto il 15/11/2026", url: LIC("61") },
    { label: "Legge in Chiaro: CdS art. 78, modifiche costruttive: visita e prova, sanzione e ritiro della carta di circolazione (agg. 27/10/2026), letto il 15/11/2026", url: LIC("78") },
    { label: "Legge in Chiaro: CdS art. 79, efficienza dei veicoli (agg. 27/10/2026), letto il 15/11/2026", url: LIC("79") },
    { label: "Legge in Chiaro: CdS art. 122 c.5-bis, esercitazioni in autostrada o su strade extraurbane (agg. 27/10/2026), letto il 15/11/2026", url: LIC("122") },
    { label: "Legge in Chiaro: CdS art. 155, limitazione dei rumori (agg. 27/10/2026), letto il 15/11/2026", url: LIC("155") },
    { label: "Legge in Chiaro: CdS art. 156, dispositivi di segnalazione acustica (agg. 27/10/2026), letto il 15/11/2026", url: LIC("156") },
    { label: "Legge in Chiaro: CdS art. 157 c.7-bis, motore acceso in sosta per il climatizzatore (agg. 27/10/2026), letto il 15/11/2026", url: LIC("157") },
    { label: "Legge in Chiaro: CdS art. 185 c.4, scarico delle autocaravan (agg. 27/10/2026), letto il 15/11/2026", url: LIC("185") },
    { label: "Normattiva: D.Lgs. 209/2003 art. 5, consegna del veicolo fuori uso (vigente dal 20/02/2026), letto il 15/11/2026", url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2003-06-24;209~art5" },
    { label: "MASE: D.Lgs. 188/2008 art. 7, raccolta di accumulatori per veicoli (testo GU, stampa 2018), letto il 15/11/2026", url: "https://www.mase.gov.it/portale/sites/default/files/archivio/normativa/dl_20_11_2008_188.pdf" },
    { label: "Brocardi: D.Lgs. 152/2006 artt. 255, 255-bis, 255-ter (abbandono di rifiuti pericolosi, D.L. 116/2025) (agg. 09/10/2026), letti il 15/11/2026", url: BROCARDI_AMB("255ter") },
    { label: "Polestar, manuale d'uso: ricircolo dell'aria (blocca gas di scarico; condensa se troppo a lungo); letto il 15/11/2026", url: "https://www.polestar.com/it/manual/polestar-1/2021/article/f1a1a1e589e8e45fc0a8015172eac597/" },
    { label: "Codice della Strada (D.Lgs. 285/1992), testo vigente", url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285" },
    { label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «consumi-ambiente-inquinamento»", url: "https://github.com/Ed0ardo/QuizPatenteB" },
  ],
  lessons: [
    lessonResistenze,
    lessonImpiantiTipi,
    lessonGuidaFluida,
    lessonMitiMotore,
    lessonCosaEsce,
    lessonMotoreSano,
    lessonRumoreVeicolo,
    lessonRumoreGuida,
    lessonRifiuti,
    lessonDivietiStrade,
    reviewAmbiente,
  ],
};
