/**
 * src/content/ch25-common.ts
 * Chapter 25 (Elementi del veicolo, manutenzione e comportamenti): strings and
 * rule labels shared by its lesson files. Kept apart from lessons-veicolo.ts so
 * the lesson files never import the chapter module that imports them.
 */

/** Every original exercise opens with this (tests/chapter25.test.ts). */
export const EXERCISE = "تمرینِ آموزشی است، نه سؤالِ بانک؛ موقعیت‌ها ساختگی و ساده شده‌اند.";

/** "Compare the choices": one factor changes per pair; two at once means "cannot tell". */
export const COMPARE =
  `${EXERCISE} در هر جفت فقط یک چیز عوض می‌شود و بقیه یکسان است. اگر دو چیز با هم عوض شده باشد، جوابِ درست «با این اطلاعات نمی‌شود گفت» است.`;

/** Options of every "compare the choices" exercise; the third is right when the facts do not settle it. */
export const CHOICES = [
  { it: "A", fa: "الف" },
  { it: "B", fa: "ب" },
  { it: "non si può dire", fa: "با این اطلاعات نمی‌شود گفت" },
];

/** Said wherever a procedure, a value or a control differs between vehicles. */
export const MODEL_NOTE = "عدد، جا و روشِ دقیق را دفترچه‌ی همان خودرو می‌گوید؛ همه‌ی خودروها یکی نیستند.";

export const CDS = (n: string) => `Codice della Strada, art. ${n}`;
export const REG = (n: string) => `DPR 495/1992 (Regolamento del CdS), art. ${n}`;
export const TECNICA = "nozione tecnica sul funzionamento del veicolo (nessun articolo del CdS)";
export const FISICA = "nozione tecnica: aderenza e forze in curva (nessun articolo del CdS)";
export const MANUALE = "manuale d'uso e manutenzione del veicolo (indicazioni del costruttore)";
