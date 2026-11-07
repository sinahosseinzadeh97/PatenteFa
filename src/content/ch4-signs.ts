/**
 * src/content/ch4-signs.ts
 * Chapter 4 (Segnali di obbligo): the mandatory signs by their bank image
 * number, with the figure's name in DPR 495/1992 artt. 122–123. Signs from
 * earlier chapters are re-exported where a lesson compares against them.
 */
import type { SignRef } from "./lessons.js";

const sign = (n: number, nameIt: string, nameFa: string): SignRef => ({ sign: n, nameIt, nameFa });

export const DIRITTO = sign(93, "DIREZIONE OBBLIGATORIA DIRITTO", "اجبار به مستقیم");
export const SINISTRA = sign(94, "DIREZIONE OBBLIGATORIA A SINISTRA", "اجبار به چپ");
export const DESTRA = sign(95, "DIREZIONE OBBLIGATORIA A DESTRA", "اجبار به راست");
export const PREAVVISO_DESTRA = sign(96, "PREAVVISO DI DIREZIONE OBBLIGATORIA A DESTRA", "پیش‌آگهی اجبار به راست");
export const PREAVVISO_SINISTRA = sign(97, "PREAVVISO DI DIREZIONE OBBLIGATORIA A SINISTRA", "پیش‌آگهی اجبار به چپ");
export const DESTRA_SINISTRA = sign(98, "DIREZIONI CONSENTITE DESTRA E SINISTRA", "فقط راست یا چپ");
export const DIRITTO_DESTRA = sign(99, "DIREZIONI CONSENTITE DIRITTO E DESTRA", "فقط مستقیم یا راست");
export const DIRITTO_SINISTRA = sign(100, "DIREZIONI CONSENTITE DIRITTO E SINISTRA", "فقط مستقیم یا چپ");
export const PASSAGGIO_SINISTRA = sign(101, "PASSAGGIO OBBLIGATORIO A SINISTRA", "عبور اجباری از چپِ مانع");
export const PASSAGGIO_DESTRA = sign(102, "PASSAGGIO OBBLIGATORIO A DESTRA", "عبور اجباری از راستِ مانع");
export const PASSAGGI_CONSENTITI = sign(103, "PASSAGGI CONSENTITI", "عبور از هر دو طرفِ مانع");
export const ROTATORIA_OBBLIGO = sign(104, "ROTATORIA", "میدان: دور زدن در جهت فلش‌ها");
export const MINIMO = sign(105, "LIMITE MINIMO DI VELOCITÀ", "کمینه‌ی سرعت");
export const FINE_MINIMO = sign(106, "FINE DEL LIMITE MINIMO DI VELOCITÀ", "پایان کمینه‌ی سرعت");
export const CATENE = sign(107, "CATENE PER NEVE OBBLIGATORIE", "زنجیر چرخ یا لاستیک زمستانی اجباری");
export const PEDONALE = sign(108, "PERCORSO PEDONALE", "مسیر ویژه‌ی پیاده");
export const FINE_PEDONALE = sign(109, "FINE DEL PERCORSO PEDONALE", "پایان مسیر پیاده");
export const CICLABILE = sign(110, "PISTA CICLABILE", "مسیر ویژه‌ی دوچرخه");
export const FINE_CICLABILE = sign(111, "FINE PISTA CICLABILE", "پایان مسیر دوچرخه");
export const AFFIANCATI = sign(112, "PISTA CICLABILE CONTIGUA AL MARCIAPIEDE", "مسیر دوچرخه کنار مسیر پیاده (جدا از هم)");
export const PROMISCUO = sign(113, "PERCORSO PEDONALE E CICLABILE", "مسیر مشترک پیاده و دوچرخه");
export const FINE_AFFIANCATI = sign(114, "FINE PISTA CICLABILE CONTIGUA AL MARCIAPIEDE", "پایان مسیرهای کنار هم");
export const FINE_PROMISCUO = sign(115, "FINE PERCORSO PEDONALE E CICLABILE", "پایان مسیر مشترک");
export const SELLA = sign(116, "PERCORSO RISERVATO AI QUADRUPEDI DA SOMA O DA SELLA", "مسیر ویژه‌ی چارپایان سواری و باری");
export const FINE_SELLA = sign(117, "FINE DEL PERCORSO RISERVATO AI QUADRUPEDI DA SOMA O DA SELLA", "پایان مسیر چارپایان");
export const ALT_DOGANA = sign(118, "ALT – DOGANA", "ایست: گمرک");
export const ALT_POLIZIA = sign(119, "ALT – POLIZIA", "ایست: پلیس");
export const ALT_STAZIONE = sign(120, "ALT – STAZIONE", "ایست: عوارضی آزادراه");
export const SVOLTA_AUTOCARRI = sign(150, "PREAVVISO DI SVOLTA OBBLIGATORIA PER AUTOCARRI", "پیش‌آگهی گردش اجباری برای کامیون‌ها");

// Signs from earlier chapters, for comparisons.
export const ROTATORIA_PERICOLO = sign(29, "CIRCOLAZIONE ROTATORIA", "خطر: میدان در پیش");
export const ANIMALI_DOMESTICI = sign(26, "ANIMALI DOMESTICI", "خطر: حیوانات اهلی");
export const LIMITE_MASSIMO = sign(58, "LIMITE MASSIMO DI VELOCITÀ", "بیشینه‌ی سرعت");
export const VIETATO_PEDONI = sign(62, "TRANSITO VIETATO AI PEDONI", "عبور پیاده ممنوع");
export const VIETATO_BICI = sign(63, "TRANSITO VIETATO ALLE BICICLETTE", "عبور دوچرخه ممنوع");

export { PRESENZA, PRESENZA_FA, SIGN, SIGN_FA, range } from "./ch2-signs.js";
