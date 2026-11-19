/**
 * Bank questions the ministry removed from the exam database. They became
 * inexact after the Codice della Strada reform (Legge 25/11/2024 n. 177), so no
 * learner meets them again: every query that serves questions skips them
 * (`NOT_RETIRED` in src/db/queries.ts), and the bank-coverage total leaves them out.
 *
 * Source: NECA, "Quiz eliminati 2025" (listato patente A-B),
 * https://neca.it/files/pdf/QuizOscurati_2025.pdf, read 2026-11-19.
 * tests/retired-questions.test.ts pins each entry to the ministry's statement.
 *
 * `code` is the ministry's statement code (V = VERO, F = FALSO); `figure` the sign image.
 */
export const RETIRED_QUESTIONS: readonly { sourceId: string; code: string; figure?: number }[] = [
  { sourceId: "6035", code: "29007/V01" },
  { sourceId: "6258", code: "30013/V06" },
  { sourceId: "6285", code: "30015/V05" },
  { sourceId: "6327", code: "30017/V10" },
  { sourceId: "6214", code: "30009/F04" },
  { sourceId: "6295", code: "30015/F05" },
  { sourceId: "4498", code: "23018/V01" },
  { sourceId: "5529", code: "27008/V01" },
  { sourceId: "6643", code: "33006/V02" },
  { sourceId: "6126", code: "30001/V01" },
  { sourceId: "6654", code: "33008/V01" },
  { sourceId: "6655", code: "33008/V02" },
  { sourceId: "2061", code: "14031/V05", figure: 112 },
  { sourceId: "2070", code: "14032/V04", figure: 113 },
  { sourceId: "2039", code: "14029/V02", figure: 110 },
  { sourceId: "2058", code: "14031/V02", figure: 112 },
  { sourceId: "2050", code: "14030/V03", figure: 111 },
  { sourceId: "6209", code: "30009/V09" },
  { sourceId: "5560", code: "27012/V04" },
  { sourceId: "1444", code: "13021/V07", figure: 71 },
  { sourceId: "1448", code: "13021/F04", figure: 71 },
];
