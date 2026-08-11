/**
 * scripts/test-sign-grounding.ts — run with: npx tsx scripts/test-sign-grounding.ts
 *
 * §20.1 guards. The تابلوها section shipped wrong content for two reasons, and
 * both are silent failures — nothing throws, you just get confident nonsense:
 *
 *  1. Stored image_urls are relative. Passed through unresolved, OpenAI rejects
 *     the request; the tutor swallowed that and rendered an empty translation.
 *  2. The explanation/theory prompts demanded a "deciding word" from the text.
 *     Image questions have no deciding word — the deciding factor is the picture —
 *     so a blind model invented one every time.
 */
import assert from "node:assert";
import { resolveImageUrl, signAnchorBlock } from "../src/lib/openai.js";

const BASE = "https://patente-fa.example.workers.dev";

// ── resolveImageUrl ────────────────────────────────────────────────────────────
// The actual stored shape (see migrations + scripts/migrate-signs-to-r2.ts):
// every one of the 3983 image rows is relative.
assert.equal(
  resolveImageUrl(BASE, "/images/signs/54.png"),
  `${BASE}/images/signs/54.png`,
  "relative paths must become absolute — this is the tutor.ts bug"
);

// Trailing slash on the env var must not produce a double slash.
assert.equal(resolveImageUrl(`${BASE}/`, "/images/signs/54.png"), `${BASE}/images/signs/54.png`);

// The deployed MINI_APP_URL is `<origin>/app` (scripts/repoint-telegram.sh), not a
// bare origin. Concatenation produced /app/images/signs/54.png, which the /app/*
// route answers with the Mini App HTML shell — 200, text/html — so OpenAI 400'd
// with invalid_image_format on every image question in the exam panel.
assert.equal(
  resolveImageUrl(`${BASE}/app`, "/images/signs/54.png"),
  `${BASE}/images/signs/54.png`,
  "the base's path must be discarded — image_urls are root-absolute"
);
assert.equal(resolveImageUrl(`${BASE}/app/`, "/images/signs/54.png"), `${BASE}/images/signs/54.png`);

// Already-absolute URLs pass through untouched (pre-R2 rows, if any resurface).
const gh = "https://raw.githubusercontent.com/Ed0ardo/QuizPatenteB/main/img_sign/54.png";
assert.equal(resolveImageUrl(BASE, gh), gh);

// No image → no vision, for the ~3k text-only questions.
assert.equal(resolveImageUrl(BASE, null), null);
assert.equal(resolveImageUrl(BASE, undefined), null);
assert.equal(resolveImageUrl(BASE, ""), null);

// Missing MINI_APP_URL must degrade to text-only, NOT emit a relative URL that
// makes OpenAI 400 and takes the whole endpoint down with it.
assert.equal(resolveImageUrl(undefined, "/images/signs/54.png"), null);
assert.equal(resolveImageUrl("", "/images/signs/54.png"), null);

// ── signAnchorBlock ───────────────────────────────────────────────────────────
// Text questions have no sign, and must not gain a stray empty anchor section.
assert.equal(signAnchorBlock(null), "");
assert.equal(signAnchorBlock(undefined), "");

// With a sign, the official name must reach the prompt. Measured on q3557
// (/images/signs/279.png, arrow pointing right): unanchored, gpt-4o called it
// «PASSAGGIO OBBLIGATORIO A SINISTRA» 3 times out of 3 — the opposite rule.
const block = signAnchorBlock({
  nameIt: "INTERSEZIONE A T SINISTRA",
  nameFa: "تقاطع تی از چپ",
  meaningFa: "نزدیک به تقاطع با جاده‌ای از سمت چپ هستید.",
});
assert.ok(block.includes("INTERSEZIONE A T SINISTRA"), "the official name must be in the prompt");
assert.ok(block.includes("نزدیک به تقاطع"), "the reviewed meaning must be in the prompt");

console.log("✓ sign grounding checks passed");
