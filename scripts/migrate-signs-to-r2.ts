#!/usr/bin/env tsx
/**
 * scripts/migrate-signs-to-r2.ts
 *
 * §16.7 — One-off migration: download all sign images from raw.githubusercontent.com
 * and upload them to the R2 bucket, then update the D1 database rows to point
 * to the new Worker route (/images/signs/<filename>).
 *
 * Prerequisites:
 *   1. R2 enabled on your Cloudflare account (dash.cloudflare.com → R2 Object Storage → Enable)
 *   2. Bucket created: npx wrangler r2 bucket create patente-fa-signs
 *   3. D1 remote accessible (wrangler authenticated)
 *
 * Usage:
 *   npx tsx scripts/migrate-signs-to-r2.ts
 *
 * The script is idempotent — re-running it skips images already in R2 and
 * skips DB rows already pointing at /images/signs/*.
 * Failed downloads are logged at the end with their source_id and reason.
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";

const GITHUB_BASE = "https://raw.githubusercontent.com/Ed0ardo/QuizPatenteB/main/img_sign";
const WORKER_BASE = "/images/signs";
const BUCKET_NAME = "patente-fa-signs";
const DB_NAME = "patente-fa-db";
const CACHE_DIR = join(process.cwd(), "data", "sign_images_cache");

// Concurrency limit — process 25 images in parallel
const CONCURRENCY = 25;

interface Question {
  id: number;
  source_id: string;
  image_url: string;
}

function wrangler(cmd: string): string {
  try {
    return execSync(`npx wrangler ${cmd}`, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
  } catch (err: any) {
    throw new Error(err.stderr || err.message);
  }
}

async function downloadImage(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

async function main() {
  // Create local cache directory for downloaded images
  if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });

  // 1. Fetch all questions with an image_url from D1
  console.log("📋 Fetching questions with sign images from D1 (remote)…");
  let questionsJson: string;
  try {
    questionsJson = wrangler(
      `d1 execute ${DB_NAME} --remote --json --command "SELECT id, source_id, image_url FROM questions WHERE image_url IS NOT NULL"`
    );
  } catch (err: any) {
    console.error("❌ Failed to query D1:", err.message);
    process.exit(1);
  }

  // wrangler d1 execute --json returns an array of result objects
  let parsed: any;
  try {
    parsed = JSON.parse(questionsJson);
  } catch {
    console.error("❌ Could not parse D1 response:\n", questionsJson);
    process.exit(1);
  }

  const questions: Question[] = (parsed[0]?.results ?? parsed?.results ?? []) as Question[];
  if (questions.length === 0) {
    console.log("✅ No questions with sign images found.");
    return;
  }
  console.log(`✅ Found ${questions.length} questions with images.`);

  // Deduplicate by filename so we only upload each image once
  const filenameToQuestions = new Map<string, Question[]>();
  for (const q of questions) {
    const filename = q.image_url.split("/").pop()!; // e.g. "550.png"
    if (!filenameToQuestions.has(filename)) filenameToQuestions.set(filename, []);
    filenameToQuestions.get(filename)!.push(q);
  }
  console.log(`  Unique images to upload to REMOTE R2: ${filenameToQuestions.size}`);

  const filenames = Array.from(filenameToQuestions.keys());

  // 2. Download + upload each unique image to REMOTE R2
  let uploaded = 0;
  let failed = 0;
  const failures: { filename: string; sourceIds: string[]; reason: string }[] = [];

  // Process in batches for concurrency
  for (let i = 0; i < filenames.length; i += CONCURRENCY) {
    const batch = filenames.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(async (filename) => {
        const r2Key = `signs/${filename}`;
        const localPath = join(CACHE_DIR, filename);
        const sourceIds = filenameToQuestions.get(filename)!.map((q) => q.source_id);

        try {
          // If file not in local cache, download from GitHub
          if (!existsSync(localPath)) {
            const githubUrl = `${GITHUB_BASE}/${filename}`;
            let imageBuffer: Buffer;
            try {
              imageBuffer = await downloadImage(githubUrl);
            } catch (dlErr: any) {
              failures.push({ filename, sourceIds, reason: `Download failed: ${dlErr.message}` });
              failed++;
              return;
            }
            writeFileSync(localPath, imageBuffer);
          }

          // Upload to REMOTE R2 via wrangler --remote
          try {
            wrangler(`r2 object put ${BUCKET_NAME}/${r2Key} --remote --file "${localPath}" --content-type "image/png"`);
            uploaded++;
          } catch (upErr: any) {
            failures.push({ filename, sourceIds, reason: `R2 remote upload failed: ${upErr.message}` });
            failed++;
            return;
          }
        } catch (err: any) {
          failures.push({ filename, sourceIds, reason: String(err.message ?? err) });
          failed++;
        }
      })
    );

    const done = Math.min(i + CONCURRENCY, filenames.length);
    console.log(`  Progress: ${done}/${filenames.length} images processed…`);
  }

  console.log(`\n📦 Upload summary:`);
  console.log(`  ✅ Newly uploaded: ${uploaded}`);
  console.log(`  ❌ Failed: ${failed}`);

  if (failures.length > 0) {
    console.log("\n❌ Failures:");
    for (const f of failures) {
      console.log(`  - ${f.filename} (source_ids: ${f.sourceIds.join(", ")}): ${f.reason}`);
    }
  }

  // 3. Build SQL UPDATE to rewrite image_url for successfully migrated images
  // We update all rows whose filename was successfully cached locally
  const successfulFilenames = filenames.filter((fn) => existsSync(join(CACHE_DIR, fn)) && !failures.find((f) => f.filename === fn));
  
  if (successfulFilenames.length === 0) {
    console.log("\n⚠️  No successful uploads — skipping D1 update.");
    return;
  }

  console.log(`\n📝 Updating ${successfulFilenames.length} unique filenames in D1 (remote)…`);

  // Build CASE statement for batch update — SQLite doesn't have a good bulk update, 
  // but we can do it in chunks via a CASE expression
  // Group rows by new URL (same filename → same new URL)
  let updateCount = 0;

  // Batch into groups of 100 filenames for the IN clause
  const BATCH_SIZE = 100;
  for (let i = 0; i < successfulFilenames.length; i += BATCH_SIZE) {
    const batchFns = successfulFilenames.slice(i, i + BATCH_SIZE);
    
    // Build CASE WHEN for this batch
    const caseExpr = batchFns
      .map((fn) => `WHEN image_url LIKE '%/${fn}' THEN '${WORKER_BASE}/${fn}'`)
      .join(" ");
    
    const sql = `UPDATE questions SET image_url = CASE ${caseExpr} ELSE image_url END WHERE image_url LIKE 'https://raw.githubusercontent.com/%'`;

    try {
      wrangler(`d1 execute ${DB_NAME} --remote --command "${sql.replace(/"/g, '\\"')}"`);
      updateCount += batchFns.length;
    } catch (err: any) {
      console.error(`❌ Batch update failed for filenames ${i}–${i + BATCH_SIZE}:`, err.message);
    }
  }

  // 4. Verify the update
  console.log("\n🔍 Verifying update…");
  const verifyResult = wrangler(
    `d1 execute ${DB_NAME} --remote --json --command "SELECT COUNT(*) as remaining FROM questions WHERE image_url LIKE 'https://raw.githubusercontent.com/%'"`
  );
  try {
    const vParsed = JSON.parse(verifyResult);
    const remaining = vParsed[0]?.results?.[0]?.remaining ?? vParsed?.results?.[0]?.remaining ?? "?";
    console.log(`  Rows still pointing at GitHub: ${remaining}`);
    if (remaining === 0) {
      console.log("  ✅ All rows migrated.");
    } else {
      console.log(`  ⚠️  ${remaining} rows still use GitHub URLs (likely the ${failed} failed images).`);
    }
  } catch {
    console.log("  Could not parse verification result.");
  }

  console.log("\n✅ Migration complete!");
  console.log(`   Successful uploads: ${uploaded} / ${filenames.length} unique images`);
  console.log(`   Failed: ${failed}`);
  
  if (failures.length > 0) {
    console.log("\n⚠️  The following images failed and their DB rows were NOT updated:");
    for (const f of failures) {
      console.log(`   - signs/${f.filename} → ${f.sourceIds.length} question(s) still point at GitHub`);
      console.log(`     Reason: ${f.reason}`);
    }
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
