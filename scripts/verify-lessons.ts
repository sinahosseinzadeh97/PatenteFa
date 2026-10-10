#!/usr/bin/env tsx
/**
 * scripts/verify-lessons.ts
 *
 * Read-only check that every curated lesson chapter (src/content/lessons.ts,
 * lessons-incroci.ts, crossings.ts, lessons-velocita.ts, lessons-sorpasso.ts,
 * overtaking.ts) still agrees with the
 * question bank in D1. Run after editing lesson content and before deploying:
 *
 *   npm run verify:lessons            # local D1
 *   npm run verify:lessons -- --remote  # production D1 (SELECT only)
 *
 * Fails when a practice/trap question, a "Who goes first?" evidence statement or
 * a factor's, scene rule's or centre line's evidence no longer matches its reviewed snapshot (text, answer key, image), or when a
 * mapped question is missing or shows an image outside its chapter. The API already drops drifted practice questions at
 * runtime; this script is how a human finds out.
 */
import { execFileSync } from "node:child_process";
import { CHAPTERS, relatedSourceIds, type Chapter, type Statement } from "../src/content/lessons.js";

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

const signNumber = (url: string | null) => (url ? Number(url.match(/(\d+)\.png$/)?.[1]) : null);

interface Snapshot {
  sourceId: string;
  textIt: string;
  answer: number;
  image: number | null;
}

function snapshots(chapter: Chapter): Snapshot[] {
  const statements: Statement[] = chapter.lessons.flatMap((lesson) => [
    ...lesson.practice,
    ...lesson.steps.flatMap((step) => (step.kind === "trap" ? step.examples : [])),
  ]);
  const evidence = chapter.lessons.flatMap((lesson) =>
    lesson.steps.flatMap((step) =>
      step.kind === "order" || step.kind === "scenario"
        ? step.crossing.evidence.map((e) => ({ ...e, image: step.crossing.figure }))
        : []
    )
  );
  const factors = chapter.lessons.flatMap((lesson) =>
    lesson.steps.flatMap((step) => (step.kind === "factors" ? step.columns.flatMap((column) => column.items) : []))
  );
  // Overtaking chapter: the bank statements behind each scene rule and each centre line.
  const ruleEvidence = chapter.lessons.flatMap((lesson) =>
    lesson.steps.flatMap((step) =>
      step.kind === "assess"
        ? step.scenes.flatMap((scene) => [...scene.facts, ...scene.compare.facts]).flatMap((rule) => rule.evidence)
        : step.kind === "markings"
          ? step.lines.flatMap((line) => line.evidence)
          : []
    )
  );
  return [
    ...statements.map((s) => ({ sourceId: s.sourceId, textIt: s.textIt, answer: s.answer, image: s.sign ?? s.figure ?? null })),
    ...evidence.map((e) => ({ sourceId: e.sourceId, textIt: e.textIt, answer: e.answer, image: e.image })),
    ...factors.map((f) => ({ sourceId: f.sourceId, textIt: f.textIt, answer: f.answer, image: null })),
    ...ruleEvidence.map((e) => ({ sourceId: e.sourceId, textIt: e.textIt, answer: e.answer, image: e.image ?? null })),
  ];
}

const allSnapshots = CHAPTERS.flatMap(snapshots);
const ids = [...new Set([...allSnapshots.map((s) => s.sourceId), ...CHAPTERS.flatMap((c) => c.lessons.flatMap(relatedSourceIds))])];
const rows = new Map(query(ids).map((row) => [row.source_id, row]));
const problems: string[] = [];

for (const snapshot of allSnapshots) {
  const row = rows.get(snapshot.sourceId);
  if (!row) problems.push(`${snapshot.sourceId}: missing from the bank`);
  else if (row.text_it.trim() !== snapshot.textIt.trim()) problems.push(`${snapshot.sourceId}: text changed`);
  else if (row.correct_answer !== snapshot.answer) problems.push(`${snapshot.sourceId}: answer key changed`);
  else if (snapshot.image !== signNumber(row.image_url)) problems.push(`${snapshot.sourceId}: image changed`);
}
for (const chapter of CHAPTERS) {
  const images = new Set(chapter.lessons.flatMap((lesson) => [...lesson.signs, ...(lesson.figures ?? [])]));
  for (const id of chapter.lessons.flatMap(relatedSourceIds)) {
    const row = rows.get(id);
    if (!row) problems.push(`${id}: mapped but missing from the bank`);
    else if (row.image_url && !images.has(signNumber(row.image_url) ?? -1)) {
      problems.push(`${id}: shows image ${signNumber(row.image_url)}, outside chapter ${chapter.id}`);
    }
  }
}

console.log(`Checked ${allSnapshots.length} reviewed statements and ${ids.length} mapped questions (${target}).`);
if (problems.length > 0) {
  console.error(problems.map((p) => `  ✗ ${p}`).join("\n"));
  process.exit(1);
}
console.log("All lesson mappings match the bank.");
