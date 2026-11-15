/**
 * src/content/ch24-common.ts
 * Chapter 24 (Consumi, ambiente e inquinamento): strings and rule labels shared
 * by its lesson files. Kept apart from lessons-ambiente.ts so the lesson files
 * never import the chapter module that imports them.
 */

/** Every original exercise opens with this (tests/chapter24.test.ts). */
export const EXERCISE = "تمرینِ آموزشی است، نه سؤالِ بانک؛ موقعیت‌ها ساختگی و ساده شده‌اند.";

/** "Compare the choices": one factor changes per pair, and no savings figures are given. */
export const COMPARE =
  `${EXERCISE} در هر جفت فقط یک چیز عوض می‌شود و بقیه (خودرو، جاده، هوا، ترافیک) یکسان است. عدد یا درصدِ صرفه‌جویی نمی‌دهیم، چون به خودرو و شرایط بستگی دارد.`;

/** Options of every "compare the choices" exercise; the third is right when the facts do not settle it. */
export const CHOICES = [
  { it: "A", fa: "الف" },
  { it: "B", fa: "ب" },
  { it: "non si può dire", fa: "با این اطلاعات نمی‌شود گفت" },
];

export const CDS = (n: string) => `Codice della Strada, art. ${n}`;
export const AMB = (n: string) => `D.Lgs. 152/2006 (Codice dell'ambiente), art. ${n}`;
export const GUIDA_CO2 =
  "MIMIT–MASE–MIT, Guida sul risparmio di carburante e sulle emissioni di CO₂ delle autovetture, ed. 2025, «Consigli agli automobilisti» (GU n. 281 del 3/12/2025)";
export const EEA_AIR = "EEA, Sustainability of Europe's mobility systems 2025: air pollution (10/02/2026)";
export const ISPRA_FREDDO = "ISPRA, metodologie di stima delle emissioni da trasporto stradale: sovra-emissioni a motore freddo";
export const TECNICA = "nozione tecnica sul funzionamento del veicolo (nessun articolo del CdS)";
export const MANUALE = "manuale d'uso e manutenzione del veicolo (indicazioni del costruttore)";
export const VFU = "D.Lgs. 209/2003 (veicoli fuori uso), art. 5 c.1";
export const PILE = "D.Lgs. 188/2008 (pile e accumulatori), art. 7 c.5–6";
