/**
 * src/content/ch2-signs.ts
 * Chapter 2 (Segnali di pericolo): the danger signs by their bank image number,
 * with the official name of the figure in DPR 495/1992 artt. 85–103.
 */
import type { SignRef } from "./lessons.js";

const sign = (n: number, nameIt: string, nameFa: string): SignRef => ({ sign: n, nameIt, nameFa });

export const STRADA_DEFORMATA = sign(1, "STRADA DEFORMATA", "جاده‌ی ناهموار");
export const DOSSO = sign(2, "DOSSO", "برآمدگی جاده");
export const CUNETTA = sign(3, "CUNETTA", "فرورفتگی جاده");
export const CURVA_DESTRA = sign(4, "CURVA A DESTRA", "پیچ خطرناک به راست");
export const CURVA_SINISTRA = sign(5, "CURVA A SINISTRA", "پیچ خطرناک به چپ");
export const DOPPIA_DESTRA = sign(6, "DOPPIA CURVA, LA PRIMA A DESTRA", "دو پیچ، اولی به راست");
export const DOPPIA_SINISTRA = sign(7, "DOPPIA CURVA, LA PRIMA A SINISTRA", "دو پیچ، اولی به چپ");
export const PL_BARRIERE = sign(8, "PASSAGGIO A LIVELLO CON BARRIERE", "گذرگاه راه‌آهن با راه‌بند");
export const PL_SENZA = sign(9, "PASSAGGIO A LIVELLO SENZA BARRIERE", "گذرگاه راه‌آهن بدون راه‌بند");
export const CROCE = sign(10, "CROCE DI S. ANDREA", "صلیب سنت آندره");
export const DOPPIA_CROCE = sign(11, "DOPPIA CROCE DI S. ANDREA", "صلیب دوتایی سنت آندره");
export const TRAM = sign(14, "ATTRAVERSAMENTO TRANVIARIO", "تقاطع با خط تراموا");
export const PEDONI = sign(15, "ATTRAVERSAMENTO PEDONALE", "گذرگاه عابر پیاده");
export const CICLABILE = sign(16, "ATTRAVERSAMENTO CICLABILE", "گذرگاه دوچرخه");
export const DISCESA = sign(17, "DISCESA PERICOLOSA", "سرازیری خطرناک");
export const SALITA = sign(18, "SALITA RIPIDA", "سربالایی تند");
export const STRETTOIA = sign(19, "STRETTOIA SIMMETRICA", "باریک‌شدن از دو طرف");
export const STRETTOIA_SINISTRA = sign(20, "STRETTOIA ASIMMETRICA A SINISTRA", "باریک‌شدن از چپ");
export const STRETTOIA_DESTRA = sign(21, "STRETTOIA ASIMMETRICA A DESTRA", "باریک‌شدن از راست");
export const PONTE_MOBILE = sign(22, "PONTE MOBILE", "پل متحرک");
export const BANCHINA = sign(23, "BANCHINA PERICOLOSA", "شانه‌ی خطرناک");
export const SDRUCCIOLEVOLE = sign(24, "STRADA SDRUCCIOLEVOLE", "جاده‌ی لغزنده");
export const BAMBINI = sign(25, "BAMBINI", "کودکان");
export const ANIMALI_DOMESTICI = sign(26, "ANIMALI DOMESTICI", "حیوانات اهلی");
export const ANIMALI_SELVATICI = sign(27, "ANIMALI SELVATICI", "حیوانات وحشی");
export const DOPPIO_SENSO = sign(28, "DOPPIO SENSO DI CIRCOLAZIONE", "جاده دوطرفه می‌شود");
export const ROTATORIA = sign(29, "CIRCOLAZIONE ROTATORIA", "میدان");
export const MOLO = sign(30, "SBOCCO SU MOLO O SU ARGINE", "انتهای جاده به اسکله یا ساحل");
export const PIETRISCO = sign(31, "MATERIALE INSTABILE SULLA STRADA", "سنگ‌ریزه‌ی لق");
export const MASSI_SINISTRA = sign(32, "CADUTA MASSI DA SINISTRA", "ریزش سنگ از چپ");
export const MASSI_DESTRA = sign(33, "CADUTA MASSI DA DESTRA", "ریزش سنگ از راست");
export const SEMAFORO_VERTICALE = sign(34, "SEMAFORO (luci in verticale)", "چراغ راهنمایی، چراغ‌ها عمودی");
export const SEMAFORO_ORIZZONTALE = sign(35, "SEMAFORO (luci in orizzontale)", "چراغ راهنمایی، چراغ‌ها افقی");
export const AEROMOBILI = sign(36, "AEROMOBILI", "هواپیما در ارتفاع کم");
export const VENTO = sign(37, "FORTE VENTO LATERALE", "باد شدید از پهلو");
export const INCENDIO = sign(38, "PERICOLO DI INCENDIO", "خطر آتش‌سوزی");
export const ALTRI_PERICOLI = sign(39, "ALTRI PERICOLI", "خطرهای دیگر");
/** From chapter 5 (Segnali di precedenza): what may follow a narrowing. */
export const SUA_DARE = sign(45, "DARE PRECEDENZA NEL SENSO UNICO ALTERNATO", "راه دادن در باریکه");

export const SIGN = "Il segnale raffigurato";
export const SIGN_FA = "تابلوی نشان‌داده‌شده";
export const PRESENZA = "In presenza del segnale raffigurato";
export const PRESENZA_FA = "وقتی این تابلو هست";

export const range = (from: number, to: number): string[] =>
  Array.from({ length: to - from + 1 }, (_, i) => String(from + i));
