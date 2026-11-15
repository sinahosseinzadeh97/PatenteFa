/**
 * src/content/lessons-incidenti.ts
 * Official chapter 21: Incidenti stradali e comportamenti. Bank group
 * `incidenti-stradali-comportamenti` (groups 565–575), source ids 6360–6461,
 * 102 questions, 11 groups, two images (334, 335). Eight lessons + the review,
 * from why accidents happen, through bad weather, to what to do after one:
 *
 *  L1 ch21-cause.ts      causes: the road (13) and the vehicle (5)
 *  L2 ch21-cause.ts      rear-end collisions; passengers getting in and out
 *  L3 ch21-pioggia.ts    rain and aquaplaning
 *  L4 ch21-neve.ts       snow; getting stuck in snow or sand
 *  L5 ch21-neve.ts       ice; grip from dry to ice; braking on slippery roads
 *  L6 ch21-nebbia.ts     thick fog
 *  L7 ch21-incidente.ts  duties after an accident (art. 189) + three scenarios
 *  L8 ch21-galleria.ts   long tunnels: queues, fire, the two panels
 *  review ch21-ripasso.ts
 *
 * The bank's "obblighi dopo incidente" group also holds seven statements about
 * the vehicle and braking (6435–6441); they are taught in L1 and L5. 97 map
 * here; five (6375, 6394, 6402, 6436, 6451: distance and reaction distance)
 * were mapped first by chapter 12 (lessons-velocita.ts) and stay there, so
 * saved progress and mistake routing do not move. Topics are scattered (36 in
 * "Altro / Misto", 17 in "Veicoli e documenti", 15 of the 36 in "Guida in
 * condizioni particolari"), so `topicIds: []`, as in chapters 18 and 20.
 * Coverage map and source flags: docs/chapter-21-coverage.md.
 */
import type { Chapter } from "./lessons.js";
import { lessonCause, lessonTamponamentiPortiere } from "./ch21-cause.js";
import { lessonGalleria } from "./ch21-galleria.js";
import { lessonIncidente } from "./ch21-incidente.js";
import { lessonNebbia } from "./ch21-nebbia.js";
import { lessonGhiaccio, lessonNeve } from "./ch21-neve.js";
import { lessonPioggia } from "./ch21-pioggia.js";
import { reviewIncidenti } from "./ch21-ripasso.js";

/** First and last bank source id of chapter 21 (bank groups 565–575), for coverage checks. */
export const CHAPTER_21_SOURCE_RANGE = [6360, 6461] as const;

const LIC = (n: string) => `https://leggeinchiaro.it/articolo-${n}-codice-della-strada/`;

export const INCIDENTI_CHAPTER: Chapter = {
  id: "incidenti-stradali-comportamenti",
  numbers: [21],
  topicIds: [],
  nameIt: "Incidenti stradali e comportamenti",
  titleFa: "تصادف‌ها و رفتارِ درست",
  summaryFa:
    "چرا تصادف می‌شود (جاده، خودرو، راننده)، رانندگی در باران، برف، یخ و مه، وظیفه‌های قانونیِ راننده بعد از تصادف با سه موقعیتِ «حالا چه کنی؟»، و تونلِ طولانی هنگامِ آتش‌سوزی. هشت درسِ کوتاه و یک مرور.",
  reviewedOn: "2026-11-15",
  sources: [
    {
      label: "Codice della Strada (D.Lgs. 285/1992), testo vigente",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285",
    },
    {
      label: "Legge in Chiaro: CdS art. 189, comportamento in caso di incidente (c.1–7; agg. 27/10/2026), letto il 15/11/2026",
      url: LIC("189"),
    },
    {
      label: "Legge in Chiaro: CdS artt. 78 (modifiche, visita e prova) e 79 c.1 (massima efficienza) (agg. 27/10/2026), letti il 15/11/2026",
      url: LIC("79"),
    },
    {
      label: "Legge in Chiaro: CdS art. 6 c.4 lett. e (ordinanze: pneumatici invernali o mezzi antisdrucciolevoli), letto il 15/11/2026",
      url: LIC("6"),
    },
    {
      label: "Legge in Chiaro: D.Lgs. 209/2005 art. 143 (denuncia di sinistro, modulo CAI; agg. 27/10/2026), letto il 15/11/2026",
      url: "https://leggeinchiaro.it/articolo-143-assicurazioni-private-dlgs-209-2005-denuncia-di-sinistro/",
    },
    {
      label: "Brocardi: Codice penale art. 593 c.2, omissione di soccorso (agg. 31/10/2026), letto il 15/11/2026",
      url: "https://www.brocardi.it/codice-penale/libro-secondo/titolo-xii/capo-i/art593.html",
    },
    {
      label: "Polizia di Stato: «Viaggiare in sicurezza: i consigli della Polizia» (24/01/2023; nebbia, pioggia e aquaplaning, neve e catene), letto il 15/11/2026",
      url: "https://poliziadistato.it/articolo/pdf/1563ce686d9df4e662441665",
    },
    {
      label: "TCS: «Guidare in galleria» (coda, guasto, incendio: motore spento, chiave inserita, mai invertire la marcia), letto il 15/11/2026",
      url: "https://www.tcs.ch/it/test-consigli/consigli/regole-della-circolazione/galleria.php",
    },
    {
      label: "ANAS: «Guidare sicuri in galleria» (incendio: uscire col veicolo se possibile, estinguere solo all'inizio, vie di fuga); il PDF non si apriva il 15/11/2026, contenuto letto tramite l'indice di ricerca",
      url: "https://www.stradeanas.it/sites/default/files/pdf/Guidare%20sicuri%20in%20galleria.pdf",
    },
    {
      label: "D.Lgs. 264/2006, sicurezza delle gallerie (all. 4-bis, segnaletica: uscite e stazioni di emergenza, estintori), testo coordinato VV.F.",
      url: "https://www.vigilfuoco.it/sites/default/files/2025-08/COORD_DLGS_05_10_2006_n_264.pdf",
    },
    {
      label: "Numero Unico di Emergenza 112: attivo in 16 Regioni e 2 Province autonome (febbraio 2026); 118, 113, 115 restano raggiungibili",
      url: "https://www.aziendazero.piemonte.it/wp-content/uploads/2026/02/cs-Giornata-Europea-NUE-112.pdf",
    },
    {
      label: "Question bank: Ed0ardo/QuizPatenteB (2023), group «incidenti-stradali-comportamenti»",
      url: "https://github.com/Ed0ardo/QuizPatenteB",
    },
  ],
  lessons: [
    lessonCause,
    lessonTamponamentiPortiere,
    lessonPioggia,
    lessonNeve,
    lessonGhiaccio,
    lessonNebbia,
    lessonIncidente,
    lessonGalleria,
    reviewIncidenti,
  ],
};
