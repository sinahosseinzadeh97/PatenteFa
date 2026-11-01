/**
 * src/content/ch3-signs.ts
 * Chapter 3 (Segnali di divieto): the prohibition, end-of-prohibition and
 * parking signs by their bank image number, with the figure's name in
 * DPR 495/1992 artt. 116–120.
 */
import type { SignRef } from "./lessons.js";

const sign = (n: number, nameIt: string, nameFa: string): SignRef => ({ sign: n, nameIt, nameFa });

export const DIVIETO_TRANSITO = sign(54, "DIVIETO DI TRANSITO", "عبور ممنوع");
export const SENSO_VIETATO = sign(55, "SENSO VIETATO", "ورود ممنوع");
export const DIVIETO_SORPASSO = sign(56, "DIVIETO DI SORPASSO", "سبقت ممنوع");
export const DISTANZA_MINIMA = sign(57, "DISTANZIAMENTO MINIMO OBBLIGATORIO", "فاصله‌ی کمینه‌ی اجباری");
export const LIMITE_VELOCITA = sign(58, "LIMITE MASSIMO DI VELOCITÀ", "بیشینه‌ی سرعت");
export const CLACSON = sign(59, "DIVIETO DI SEGNALAZIONI ACUSTICHE", "بوق ممنوع");
export const SORPASSO_PESANTI = sign(60, "DIVIETO DI SORPASSO PER I VEICOLI PESANTI", "سبقت برای کامیون‌های بالای ۳٫۵ تن ممنوع");
export const VIA_LIBERA = sign(80, "VIA LIBERA", "پایان همه‌ی ممنوعیت‌ها");
export const FINE_LIMITE = sign(81, "FINE LIMITAZIONE DI VELOCITÀ", "پایان محدودیت سرعت");
export const FINE_SORPASSO = sign(82, "FINE DEL DIVIETO DI SORPASSO", "پایان سبقت ممنوع");
export const FINE_SORPASSO_PESANTI = sign(83, "FINE DEL DIVIETO DI SORPASSO PER I VEICOLI PESANTI", "پایان سبقت ممنوع برای کامیون‌ها");
export const PESANTI_35 = sign(68, "TRANSITO VIETATO AI VEICOLI DI MASSA SUPERIORE A 3,5 t", "عبور وسیله‌ی باریِ بالای ۳٫۵ تن ممنوع");
export const MASSA = sign(78, "TRANSITO VIETATO AI VEICOLI AVENTI MASSA SUPERIORE A … t", "عبور وسیله‌ی سنگین‌تر از … تن ممنوع");
export const DIVIETO_SOSTA = sign(84, "DIVIETO DI SOSTA", "پارک ممنوع");
export const DIVIETO_FERMATA = sign(85, "DIVIETO DI FERMATA", "توقف ممنوع");
export const PASSO_CARRABILE = sign(90, "PASSO CARRABILE", "ورودی خودرو، پارک ممنوع");
export const INVALIDI = sign(91, "SOSTA CONSENTITA A PARTICOLARI CATEGORIE", "پارک فقط برای خودروی معلولان");

export { PRESENZA, PRESENZA_FA, SIGN, SIGN_FA, range } from "./ch2-signs.js";
