#!/usr/bin/env tsx
/**
 * scripts/verify-lessons.ts
 *
 * Read-only check that the curated pilot lessons (src/content/lessons.ts)
 * still agree with the question bank in D1. Run after editing lesson content
 * and before deploying:
 *
 *   npm run verify:lessons            # local D1
 *   npm run verify:lessons -- --remote  # production D1 (SELECT only)
 *
 * Fails when a practice/trap question's text or answer key no longer matches
 * its reviewed snapshot, or when a mapped question is missing or shows a sign
 * outside this chapter. The API already drops drifted practice questions at
 * runtime; this script is how a human finds out.
 */
import { execFileSync } from "node:child_process";
import { PILOT_CHAPTER, relatedSourceIds, type Statement } from "../src/content/lessons.js";

interface Row {
  source_id: string;
  text_it: string;
  correct_answer: number;
  image_url: string | null;
}

const target = process.argv.includes("--remote") ? "--remote" : "--local";

function query(sourceIds: string[]): Row[] {
  const rows: Row[] = [];
  for (let i = 0; i < sourceIds.length; i += 90) {
    const list = sourceIds.slice(i, i + 90).map((id) => `'${id.replace(/'/g, "")}'`).join(",");
    const out = execFileSync(
      "npx",
      [
        "wrangler", "d1", "execute", "patente-fa-db", target, "--json", "--command",
        `SELECT source_id, text_it, correct_answer, image_url FROM questions WHERE source_id IN (${list})`,
      ],
      { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }
    );
    rows.push(...(JSON.parse(out)[0]?.results ?? []));
  }
  return rows;
}

const chapterSigns = new Set(PILOT_CHAPTER.lessons.flatMap((lesson) => lesson.signs));
const signNumber = (url: string | null) => (url ? Number(url.match(/(\d+)\.png$/)?.[1]) : null);

const snapshots: Statement[] = PILOT_CHAPTER.lessons.flatMap((lesson) => [
  ...lesson.practice,
  ...lesson.steps.flatMap((step) => (step.kind === "trap" ? step.examples : [])),
]);
const ids = [...new Set([...snapshots.map((s) => s.sourceId), ...PILOT_CHAPTER.lessons.flatMap(relatedSourceIds)])];
const rows = new Map(query(ids).map((row) => [row.source_id, row]));
const problems: string[] = [];

for (const statement of snapshots) {
  const row = rows.get(statement.sourceId);
  if (!row) problems.push(`${statement.sourceId}: missing from the bank`);
  else if (row.text_it.trim() !== statement.textIt.trim()) problems.push(`${statement.sourceId}: text changed`);
  else if (row.correct_answer !== statement.answer) problems.push(`${statement.sourceId}: answer key changed`);
  else if ((statement.sign ?? null) !== signNumber(row.image_url)) problems.push(`${statement.sourceId}: image changed`);
}
for (const id of ids) {
  const row = rows.get(id);
  if (!row) problems.push(`${id}: mapped but missing from the bank`);
  else if (row.image_url && !chapterSigns.has(signNumber(row.image_url) ?? -1)) {
    problems.push(`${id}: shows sign ${signNumber(row.image_url)}, outside this chapter`);
  }
}

console.log(`Checked ${snapshots.length} reviewed statements and ${ids.length} mapped questions (${target}).`);
if (problems.length > 0) {
  console.error(problems.map((p) => `  ✗ ${p}`).join("\n"));
  process.exit(1);
}
console.log("All pilot lesson mappings match the bank.");
