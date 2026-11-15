/**
 * src/content/ch23-common.ts
 * Chapter 23 (Responsabilità civile, penale e assicurazione): strings and rule
 * labels shared by its lesson files. Kept apart from lessons-responsabilita.ts so
 * the lesson files never import the chapter module that imports them.
 */

/** Every original exercise opens with this (tests/chapter23.test.ts). */
export const DISCLAIMER =
  "تمرینِ آموزشی است، نه سؤالِ بانک؛ آدم‌ها و ماجرا ساختگی‌اند و موقعیت برای فهمیدنِ قانون ساده شده است. مشاوره‌ی حقوقی یا بیمه‌ای برای موقعیتِ واقعیِ تو نیست: در پرونده‌ی واقعی، قاضی، بیمه‌نامه‌ات و یک وکیل یا کارشناس تصمیم را روشن می‌کنند.";

export const CC_2054 = "Codice civile, art. 2054 (circolazione di veicoli)";
export const CC_2043 = "Codice civile, art. 2043 (risarcimento per fatto illecito)";
export const CP = (n: string) => `Codice penale, art. ${n}`;
export const CDS = (n: string) => `Codice della Strada, art. ${n}`;
export const CAP = (n: string) => `D.Lgs. 209/2005 (Codice delle assicurazioni private), art. ${n}`;
export const IVASS = "IVASS, «Le guide assicurative in parole semplici», vol. 3: La responsabilità civile auto (ed. 2022)";
export const COST_27 = "Costituzione, art. 27 c.1 (la responsabilità penale è personale)";
