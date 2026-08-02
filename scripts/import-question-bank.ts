#!/usr/bin/env tsx
/**
 * scripts/import-question-bank.ts
 *
 * One-off script that ingests the Ed0ardo/QuizPatenteB question bank into
 * the local D1 database (or generates SQL files for remote apply).
 *
 * Usage:
 *   npm run import                  # writes data/insert_topics.sql + data/insert_questions.sql
 *   wrangler d1 execute patente-fa-db --local --file data/insert_topics.sql
 *   wrangler d1 execute patente-fa-db --local --file data/insert_questions.sql
 *
 * The script downloads the JSON from GitHub if not already cached in data/.
 * Sign images are left as GitHub raw URLs in the DB for now; a follow-up
 * step can push them to R2 using `wrangler r2 object put`.
 *
 * Data source: https://github.com/Ed0ardo/QuizPatenteB (MIT licence)
 * Note: Data is from 2023 — spot-check against ilportaledellautomobilista.it
 * for any since-updated questions before the exam.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const JSON_PATH = join(DATA_DIR, "quizPatenteB2023.json");
const JSON_URL =
  "https://raw.githubusercontent.com/Ed0ardo/QuizPatenteB/main/quizPatenteB2023.json";

// ── Official topic categories (25 argument areas from Motorizzazione) ────────
const OFFICIAL_TOPICS: { name_it: string; name_fa: string; sort_order: number }[] = [
  { name_it: "Segnali di pericolo", name_fa: "علائم خطر", sort_order: 1 },
  { name_it: "Segnali di divieto", name_fa: "علائم منع", sort_order: 2 },
  { name_it: "Segnali di obbligo", name_fa: "علائم اجبار", sort_order: 3 },
  { name_it: "Segnali di precedenza", name_fa: "علائم اولویت", sort_order: 4 },
  { name_it: "Segnaletica orizzontale", name_fa: "خط‌کشی‌های افقی", sort_order: 5 },
  { name_it: "Segnali luminosi", name_fa: "چراغ‌های راهنمایی", sort_order: 6 },
  { name_it: "Segnali complementari", name_fa: "علائم تکمیلی", sort_order: 7 },
  { name_it: "Norme di comportamento", name_fa: "قوانین رفتاری", sort_order: 8 },
  { name_it: "Precedenza", name_fa: "حق تقدم", sort_order: 9 },
  { name_it: "Velocità", name_fa: "سرعت", sort_order: 10 },
  { name_it: "Distanza di sicurezza", name_fa: "فاصله ایمنی", sort_order: 11 },
  { name_it: "Sorpasso", name_fa: "سبقت", sort_order: 12 },
  { name_it: "Cambio di direzione", name_fa: "تغییر مسیر", sort_order: 13 },
  { name_it: "Arresto, sosta e fermata", name_fa: "توقف و پارک", sort_order: 14 },
  { name_it: "Uso dei dispositivi di illuminazione", name_fa: "استفاده از چراغ‌ها", sort_order: 15 },
  { name_it: "Norme sulla circolazione", name_fa: "قوانین تردد", sort_order: 16 },
  { name_it: "Veicoli e documenti", name_fa: "وسایل نقلیه و مدارک", sort_order: 17 },
  { name_it: "Responsabilità civile e penale", name_fa: "مسئولیت مدنی و کیفری", sort_order: 18 },
  { name_it: "Meccanica e tecnologia", name_fa: "مکانیک و فناوری", sort_order: 19 },
  { name_it: "Sicurezza attiva e passiva", name_fa: "ایمنی فعال و غیرفعال", sort_order: 20 },
  { name_it: "Primo soccorso", name_fa: "کمک‌های اولیه", sort_order: 21 },
  { name_it: "Guida in condizioni particolari", name_fa: "رانندگی در شرایط خاص", sort_order: 22 },
  { name_it: "Impatto ambientale", name_fa: "تأثیر زیست‌محیطی", sort_order: 23 },
  { name_it: "Alcol, droghe e farmaci", name_fa: "الکل، مواد مخدر و دارو", sort_order: 24 },
  { name_it: "Altro / Misto", name_fa: "متفرقه", sort_order: 25 },
];

// Map common topic keywords from the dataset to our canonical topic IDs (1-based)
const TOPIC_KEYWORD_MAP: [RegExp, number][] = [
  [/pericolo/i, 1],
  [/divieto/i, 2],
  [/obbligo/i, 3],
  [/precedenza/i, 4],
  [/segnaletic.*orizz/i, 5],
  [/luminoso|semaforo|semafor/i, 6],
  [/complementar/i, 7],
  [/comportamento/i, 8],
  [/precedenza/i, 9],
  [/velocit/i, 10],
  [/distanza/i, 11],
  [/sorpass/i, 12],
  [/direzione|svolt/i, 13],
  [/sosta|fermata|arresto/i, 14],
  [/illuminazion|fanale|faro/i, 15],
  [/circolazion/i, 16],
  [/documento|patente|veicolo|targhe/i, 17],
  [/responsabilit|penale|civile|multa|sanzione/i, 18],
  [/meccanica|tecnolog|motore|pneumatico|freno|sterzo/i, 19],
  [/sicurezza|cintura|airbag|casco/i, 20],
  [/soccorso|infortun|ferito/i, 21],
  [/nebbia|ghiaccio|pioggia|notturna|tunnel/i, 22],
  [/ambient|inquinamento|emissioni/i, 23],
  [/alcol|droga|farmaci|stupefacent/i, 24],
];

function guessTopicId(text: string, categoryField?: string): number {
  const haystack = [text, categoryField ?? ""].join(" ");
  for (const [pattern, id] of TOPIC_KEYWORD_MAP) {
    if (pattern.test(haystack)) return id;
  }
  return 25; // "Altro / Misto"
}

function esc(s: string): string {
  return s.replace(/'/g, "''");
}

interface RawQuestion {
  id?: string | number;
  q?: string;
  domanda?: string;
  question?: string;
  a?: string | boolean | number;
  risposta?: string | boolean | number;
  answer?: string | boolean | number;
  argomento?: string;
  categoria?: string;
  img?: string;
  immagine?: string;
  image?: string;
}

function flattenJson(data: any): RawQuestion[] {
  if (Array.isArray(data)) return data;
  const list: RawQuestion[] = [];

  function traverse(obj: any, catPath: string[] = []) {
    if (!obj) return;
    if (Array.isArray(obj)) {
      for (const item of obj) {
        if (typeof item === "object" && item !== null) {
          list.push({
            ...item,
            argomento: catPath.join(" "),
          });
        }
      }
      return;
    }
    if (typeof obj === "object") {
      for (const [key, val] of Object.entries(obj)) {
        traverse(val, [...catPath, key]);
      }
    }
  }

  traverse(data);
  return list;
}

async function downloadJson(): Promise<void> {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  if (existsSync(JSON_PATH)) {
    console.log("✓ JSON already cached at", JSON_PATH);
    return;
  }
  console.log("⬇  Downloading question bank from GitHub…");
  const res = await fetch(JSON_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${JSON_URL}`);
  const text = await res.text();
  writeFileSync(JSON_PATH, text, "utf-8");
  console.log(`✓ Saved ${text.length} bytes to ${JSON_PATH}`);
}

function parseCorrectAnswer(raw: string | boolean | number | undefined): number {
  if (raw === undefined || raw === null) return 1;
  if (typeof raw === "boolean") return raw ? 1 : 0;
  if (typeof raw === "number") return raw ? 1 : 0;
  const s = String(raw).trim().toLowerCase();
  return s === "true" || s === "vero" || s === "1" ? 1 : 0;
}

function buildImageUrl(immagine: string | undefined): string | null {
  if (!immagine) return null;
  const filename = immagine.replace(/^.*[\\/]/, "");
  return `https://raw.githubusercontent.com/Ed0ardo/QuizPatenteB/main/img_sign/${filename}`;
}

async function main() {
  await downloadJson();

  const rawJson = JSON.parse(readFileSync(JSON_PATH, "utf-8"));
  const raw: RawQuestion[] = flattenJson(rawJson);
  console.log(`✓ Loaded ${raw.length} raw questions`);

  // ── Topics SQL ─────────────────────────────────────────────────────────────
  const topicLines = OFFICIAL_TOPICS.map(
    (t) =>
      `INSERT OR IGNORE INTO topics (id, name_it, name_fa, sort_order) VALUES (${t.sort_order}, '${esc(t.name_it)}', '${esc(t.name_fa)}', ${t.sort_order});`
  );
  const topicsSql = topicLines.join("\n");
  writeFileSync(join(DATA_DIR, "insert_topics.sql"), topicsSql, "utf-8");
  console.log(`✓ Wrote insert_topics.sql (${topicLines.length} rows)`);

  // ── Questions SQL ───────────────────────────────────────────────────────────
  const lines: string[] = [];
  let skipped = 0;
  let index = 1;

  for (const q of raw) {
    const text = (q.domanda ?? q.question ?? q.q ?? "").trim();
    if (!text) { skipped++; continue; }

    const sourceId = String(q.id ?? index++).trim();
    const topicId = guessTopicId(text, q.argomento ?? q.categoria);
    const correctAnswer = parseCorrectAnswer(q.risposta ?? q.answer ?? q.a);
    const imageUrl = buildImageUrl(q.immagine ?? q.image ?? q.img);

    const sourceIdSql = `'${esc(sourceId)}'`;
    const imageUrlSql = imageUrl ? `'${esc(imageUrl)}'` : "NULL";

    lines.push(
      `INSERT OR IGNORE INTO questions (source_id, topic_id, text_it, correct_answer, image_url) VALUES (${sourceIdSql}, ${topicId}, '${esc(text)}', ${correctAnswer}, ${imageUrlSql});`
    );
  }

  const questionsSql = lines.join("\n");
  writeFileSync(join(DATA_DIR, "insert_questions.sql"), questionsSql, "utf-8");
  console.log(`✓ Wrote insert_questions.sql (${lines.length} rows, ${skipped} skipped)`);
  console.log("");
  console.log("Next steps:");
  console.log("  wrangler d1 execute patente-fa-db --local --file data/insert_topics.sql");
  console.log("  wrangler d1 execute patente-fa-db --local --file data/insert_questions.sql");
  console.log("  # Then for remote:");
  console.log("  wrangler d1 execute patente-fa-db --remote --file data/insert_topics.sql");
  console.log("  wrangler d1 execute patente-fa-db --remote --file data/insert_questions.sql");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
