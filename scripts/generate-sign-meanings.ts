#!/usr/bin/env tsx
/**
 * scripts/generate-sign-meanings.ts
 *
 * §20.3 — One-off (idempotent) seeding of the sign_meanings table.
 *
 * تابلوها shows what a sign means. Nothing in the repo held that, so it is
 * generated once per sign and reviewed before users see it.
 *
 * The model is NOT asked "what sign is this?" — that question is what produced
 * the hallucinated explanations this whole line of work started from. The sign's
 * identity is already known from the source dataset: data/quizPatenteB2023.json
 * groups every question under a per-sign subtopic slug (zona-rimozione,
 * strada-dissestata, obbligo-catene). 384 of 413 images map to exactly one slug;
 * the rest take their dominant slug by question count.
 *
 * So each call gets the slug, the image, and the statements the exam marks VERO,
 * and is asked only to normalise the Italian name and write the Persian. Getting
 * the sign wrong would require contradicting three independent anchors.
 *
 * Usage:
 *   npx tsx scripts/generate-sign-meanings.ts            # write SQL + review file
 *   npx tsx scripts/generate-sign-meanings.ts --limit 5  # smoke-test a few first
 *
 * Writes:
 *   data/sign_meanings.sql   — apply with: wrangler d1 execute ... --file
 *   data/sign_meanings.md    — human review sheet
 *
 * Re-running rebuilds both files from scratch; the SQL uses INSERT OR REPLACE so
 * applying it twice is safe.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { resolveImageUrl } from "../src/lib/openai.js";

const ROOT = process.cwd();
const BANK = join(ROOT, "data", "quizPatenteB2023.json");
const OUT_SQL = join(ROOT, "data", "sign_meanings.sql");
const OUT_MD = join(ROOT, "data", "sign_meanings.md");
const CONCURRENCY = 6;

// ── env ──────────────────────────────────────────────────────────────────────
function readDevVars(): Record<string, string> {
  const p = join(ROOT, ".dev.vars");
  if (!existsSync(p)) return {};
  const out: Record<string, string> = {};
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const i = line.indexOf("=");
    if (i > 0 && !line.trim().startsWith("#")) {
      out[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  return out;
}
const vars = readDevVars();
const API_KEY = process.env.OPENAI_API_KEY ?? vars.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_VISION_MODEL ?? vars.OPENAI_VISION_MODEL ?? "gpt-4o";
const BASE = (process.env.MINI_APP_URL ?? vars.MINI_APP_URL ?? "").replace(/\/$/, "");
if (!API_KEY) throw new Error("OPENAI_API_KEY not found (env or .dev.vars)");
if (!BASE) throw new Error("MINI_APP_URL not found (env or .dev.vars)");

// ── 1. Build image → {slug, veroStatements} from the source dataset ──────────
interface Q { img?: string; q: string; a: boolean }
const bank = JSON.parse(readFileSync(BANK, "utf8")) as Record<string, Record<string, Q[]>>;

const slugCounts = new Map<string, Map<string, number>>();
const veroByImage = new Map<string, string[]>();
for (const subs of Object.values(bank)) {
  for (const [slug, qs] of Object.entries(subs)) {
    for (const q of qs) {
      if (!q.img) continue;
      const counts = slugCounts.get(q.img) ?? new Map<string, number>();
      counts.set(slug, (counts.get(slug) ?? 0) + 1);
      slugCounts.set(q.img, counts);
      if (q.a === true) {
        const list = veroByImage.get(q.img) ?? [];
        list.push(q.q);
        veroByImage.set(q.img, list);
      }
    }
  }
}

interface Target { imageUrl: string; slug: string; vero: string[] }
const targets: Target[] = [...slugCounts.entries()]
  .map(([srcImg, counts]) => {
    // Dominant slug wins for the 29 images that appear under several subtopics
    // (traffic lights show up under semaforo-rosso/verde/giallo, etc.).
    const slug = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
    const file = srcImg.split("/").pop()!;
    return { imageUrl: `/images/signs/${file}`, slug, vero: veroByImage.get(srcImg) ?? [] };
  })
  .sort((a, b) => a.imageUrl.localeCompare(b.imageUrl, undefined, { numeric: true }));

// --missing resumes: OpenAI occasionally times out fetching an image, and
// regenerating all 413 to recover two rows is pure waste.
const existing = new Set<string>();
if (process.argv.includes("--missing") && existsSync(OUT_SQL)) {
  for (const m of readFileSync(OUT_SQL, "utf8").matchAll(/VALUES \('([^']+)'/g)) {
    existing.add(m[1]);
  }
}
const limitArg = process.argv.indexOf("--limit");
let work = existing.size ? targets.filter((t) => !existing.has(t.imageUrl)) : targets;
if (limitArg > -1) work = work.slice(0, Number(process.argv[limitArg + 1]));
console.log(
  `${targets.length} signs mapped; ${existing.size} already done; generating ${work.length} with ${MODEL}`
);

// ── 2. Generate ──────────────────────────────────────────────────────────────
interface Meaning { name_it: string; name_fa: string; meaning_fa: string }

const SYSTEM = `شما یک مربی مدرسه رانندگی ایتالیا (scuola guida) هستید که به فارسی‌زبانان تابلوهای راهنمایی و رانندگی ایتالیا را آموزش می‌دهد.

به شما یک تابلو داده می‌شود که هویتش از قبل مشخص است: شناسه رسمی آن (slug) و جمله‌هایی از آزمون رسمی که درباره‌اش صادق هستند. تصویر تابلو هم ضمیمه است.

وظیفه شما فقط این است:
۱. name_it — نام رسمی ایتالیایی تابلو با حروف بزرگ (مثال: «ZONA RIMOZIONE»، «STRADA DISSESTATA»، «DIVIETO DI TRANSITO»). این نام باید همان تابلوی مشخص‌شده باشد؛ هرگز تابلوی دیگری انتخاب نکنید.
۲. name_fa — نام فارسی کوتاه و رایج همان تابلو (حداکثر ۵ کلمه).
۳. meaning_fa — یک یا دو جمله ساده که به راننده می‌گوید این تابلو در عمل چه حکمی دارد.

قوانین meaning_fa:
• مهم‌ترین حکم را اول بنویسید (مثلاً «توقف ممنوع است»)، نه جزئیات فرعی
• جزئیات حاشیه‌ای آزمون (استثناها، معلولان، جریمه، انبار شهرداری) را ننویسید مگر آنکه اصل معنای تابلو باشند
• ساده و کوتاه بنویسید، انگار به یک نوآموز توضیح می‌دهید
• هرگز جمله‌های آزمون را کلمه‌به‌کلمه ترجمه نکنید — معنا را خلاصه کنید

خروجی دقیقاً JSON:
{"name_it": "...", "name_fa": "...", "meaning_fa": "..."}`;

async function generate(t: Target): Promise<Meaning> {
  // MINI_APP_URL ends in /app — concatenating hits the Mini App shell, not R2.
  const imageUrl = resolveImageUrl(BASE, t.imageUrl);
  if (!imageUrl) throw new Error(`Could not resolve image URL for ${t.imageUrl}`);

  const veroBlock = t.vero.length
    ? t.vero.map((v) => `- ${v}`).join("\n")
    : "(هیچ جمله صادقی در بانک سوال برای این تابلو نیست — فقط از تصویر و شناسه استفاده کنید)";

  const userText = `شناسه رسمی تابلو (slug): "${t.slug}"

جمله‌های آزمون که درباره این تابلو صادق هستند:
${veroBlock}

تصویر تابلو ضمیمه شده است. خروجی JSON را بنویسید:`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM },
        {
          role: "user",
          content: [
            { type: "text", text: userText },
            { type: "image_url", image_url: { url: imageUrl, detail: "high" } },
          ],
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
      max_tokens: 400,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { choices: { message: { content: string } }[] };
  const parsed = JSON.parse(data.choices[0]?.message?.content ?? "{}") as Partial<Meaning>;
  if (!parsed.name_it || !parsed.name_fa || !parsed.meaning_fa) {
    throw new Error(`incomplete response for ${t.imageUrl}: ${JSON.stringify(parsed)}`);
  }
  return parsed as Meaning;
}

const results: Array<Target & Meaning> = [];
const failures: Array<{ imageUrl: string; reason: string }> = [];

let cursor = 0;
async function worker() {
  while (cursor < work.length) {
    const t = work[cursor++];
    try {
      const m = await generate(t);
      results.push({ ...t, ...m });
    } catch (err) {
      failures.push({ imageUrl: t.imageUrl, reason: err instanceof Error ? err.message : String(err) });
    }
    if ((results.length + failures.length) % 25 === 0) {
      console.log(`  ${results.length + failures.length}/${work.length}`);
    }
  }
}

async function main() {
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
results.sort((a, b) => a.imageUrl.localeCompare(b.imageUrl, undefined, { numeric: true }));

// ── 3. Emit SQL + review sheet ───────────────────────────────────────────────
// Merge with anything a previous run already wrote (--missing), so resuming
// appends rather than truncating the file down to just the retried rows.
if (existing.size) {
  const prior = readFileSync(OUT_SQL, "utf8")
    .split("\n")
    .filter((l) => l.startsWith("INSERT"));
  for (const line of prior) {
    const m = line.match(
      /VALUES \('([^']*)', '((?:[^']|'')*)', '((?:[^']|'')*)', '((?:[^']|'')*)', '((?:[^']|'')*)'\)/
    );
    if (!m) continue;
    const un = (s: string) => s.replace(/''/g, "'");
    results.push({
      imageUrl: m[1], slug: un(m[2]), vero: [],
      name_it: un(m[3]), name_fa: un(m[4]), meaning_fa: un(m[5]),
    });
  }
  results.sort((a, b) => a.imageUrl.localeCompare(b.imageUrl, undefined, { numeric: true }));
}

const esc = (s: string) => s.replace(/'/g, "''");
const sql = [
  "-- Generated by scripts/generate-sign-meanings.ts — review data/sign_meanings.md before applying.",
  ...results.map(
    (r) =>
      `INSERT OR REPLACE INTO sign_meanings (image_url, slug, name_it, name_fa, meaning_fa) VALUES ('${esc(
        r.imageUrl
      )}', '${esc(r.slug)}', '${esc(r.name_it)}', '${esc(r.name_fa)}', '${esc(r.meaning_fa)}');`
  ),
].join("\n");
writeFileSync(OUT_SQL, sql + "\n");

const md = [
  "# Sign meanings — review sheet",
  "",
  `Generated with \`${MODEL}\` from the sign's dataset slug + image + its true exam statements.`,
  "",
  "Correct anything wrong directly in `data/sign_meanings.sql`, then apply it.",
  "",
  `${results.length} generated${failures.length ? `, ${failures.length} failed` : ""}.`,
  "",
  "| # | image | slug | name_it | name_fa | meaning_fa |",
  "|---|---|---|---|---|---|",
  ...results.map(
    (r, i) =>
      `| ${i + 1} | ${r.imageUrl.split("/").pop()} | \`${r.slug}\` | ${r.name_it} | ${r.name_fa} | ${r.meaning_fa.replace(/\|/g, "\\|")} |`
  ),
  ...(failures.length
    ? ["", "## Failed", "", ...failures.map((f) => `- ${f.imageUrl} — ${f.reason}`)]
    : []),
].join("\n");
writeFileSync(OUT_MD, md + "\n");

console.log(`\nwrote ${results.length} rows`);
console.log(`  ${OUT_SQL}`);
console.log(`  ${OUT_MD}`);
if (failures.length) console.log(`  ${failures.length} failed — listed at the end of the .md`);
}

main();
