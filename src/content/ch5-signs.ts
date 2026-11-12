/**
 * src/content/ch5-signs.ts
 * Chapter 5 (Segnali di precedenza): the precedence signs by their bank image
 * number, with the figure's name in DPR 495/1992 artt. 105–114, plus signs
 * from other chapters that chapter-5 questions confuse them with.
 */
import type { SignRef } from "./lessons.js";

const sign = (n: number, nameIt: string, nameFa: string): SignRef => ({ sign: n, nameIt, nameFa });

/** First and last bank source id of chapter 5 (bank groups 157–170), for coverage checks. */
export const CHAPTER_5_SOURCE_RANGE = [2148, 2390] as const;

export const DARE = sign(40, "DARE PRECEDENZA", "رعایت حق تقدم");
export const STOP = sign(41, "FERMARSI E DARE PRECEDENZA (STOP)", "ایست و رعایت حق تقدم");
export const PREAVVISO_DARE = sign(42, "PREAVVISO DI DARE PRECEDENZA", "پیش‌آگهی رعایت حق تقدم");
export const PREAVVISO_STOP = sign(43, "PREAVVISO DI FERMARSI E DARE PRECEDENZA", "پیش‌آگهی ایست");
export const INTERSEZIONE_DESTRA = sign(44, "INTERSEZIONE CON PRECEDENZA A DESTRA", "تقاطع؛ به راست راه بده");
export const SUA_DARE = sign(45, "DARE PRECEDENZA NEL SENSO UNICO ALTERNATO", "راه دادن در باریکه");
export const FINE_DIRITTO = sign(46, "FINE DEL DIRITTO DI PRECEDENZA", "پایان حق تقدم");
export const INTERSEZIONE_DIRITTO = sign(47, "INTERSEZIONE CON DIRITTO DI PRECEDENZA", "تقاطع؛ حق تقدم با توست");
export const T_DESTRA = sign(48, "INTERSEZIONE A T CON DIRITTO DI PRECEDENZA (DA DESTRA)", "فرعی از راست؛ حق تقدم با توست");
export const T_SINISTRA = sign(49, "INTERSEZIONE A T CON DIRITTO DI PRECEDENZA (DA SINISTRA)", "فرعی از چپ؛ حق تقدم با توست");
export const CONFLUENZA_DESTRA = sign(50, "CONFLUENZA A DESTRA", "ورود با خط شتاب از راست");
export const CONFLUENZA_SINISTRA = sign(51, "CONFLUENZA A SINISTRA", "ورود با خط شتاب از چپ");
export const DIRITTO = sign(52, "DIRITTO DI PRECEDENZA", "جاده با حق تقدم");
export const SUA_DIRITTO = sign(53, "DIRITTO DI PRECEDENZA NEL SENSO UNICO ALTERNATO", "حق تقدم در باریکه");

// Signs from other chapters, for comparisons.
export const ALT_POLIZIA = sign(119, "ALT – POLIZIA", "ایست: پلیس");

export { PRESENZA, PRESENZA_FA, SIGN, SIGN_FA, range } from "./ch2-signs.js";
