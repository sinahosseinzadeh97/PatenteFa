# Learning content and question sources

Implemented on top of upstream `609fe29`. Local validation: 13 October 2026.
**Deployed with user approval on 13 October 2026. A full semantic audit is still outstanding.**
Production release: Worker `60a6e18c-385e-4f53-b046-9b02a53ed6ed`, migration
`0017_content_quality.sql`. See `RELEASE-2026-10-13.md` for live verification and backup details.
Cloudflare access was restored on 13 October 2026. A read-only joined export contains
7,139 questions, all matching the pinned bank's text, answer and image filename.
There are 808 records with both Persian translation and explanation, 1,046 with
translation only, and 5,285 with neither. Missing cache is expected for content
generated on demand; it is not itself a translation error.

## User-visible behavior

- After VERO/FALSO is selected, the source appears immediately beneath the answer buttons. “منبع و گزارش” opens the original bank link, any separately checked official citation, and a report form.
- An unaided exam shows attribution but withholds links containing answer keys until finish. Practice, review, assisted exams and finished results can show the links.
- The original import is QuizPatenteB **2023**, pinned to commit `512dd5d2193d5ca805fbd4c0a9789d9670207dfe`. It is not presented as a current official 2026 bank. Each of the 7,139 records has its original line link; source ID, Italian text, answer and image filename must all match before attribution is offered.
- Three reported questions have separate official corroboration: source IDs **7114**, **1461**, **5723**. The trailer citation is explicitly a related positive statement, not an exact official ID match for the false question. These corrections are versioned in `src/lib/question-sources.ts`; the meaning of sign 73 is also corrected by migration 0017.
- Translation preserves false claims, negation, conditions, numbers and body parts. Explanation is a separate operation. A second model call checks both against true statements from the same original subtopic and image. Its label explicitly says automatic review, not human approval.
- Legacy cache is not silently trusted. It is checked on access; failed candidates are withheld and retained for review. Failed expanded theory falls back to the checked short explanation. Translation, theory, tutor and reels use this publication gate.
- Reports are authenticated, limited to 20 per user per day, deduplicated, and retain a snapshot. Admin decisions preserve prior content. Automatic requests finishing late cannot overwrite a human edit. Answer/source reports stay open for bank-level work; changing Persian prose cannot close them as a repaired answer key.
- New report and revision tables are included in the existing nightly backup.

## Scope of evidence

The deterministic provenance check covers all 7,139 bundled records. This is **not** a semantic review of all translations, nor an assertion that the 2023 bank matches today's full official list. Only the three named corrections have the separate official references in code. Evidence-constrained model review reduces risk but does not guarantee correctness.

The local `explanations_sample.json` contains 30 explanations, no Italian text/source IDs and no translations. The joined production export now confirms all 30 internal-ID mappings and exact explanation strings. The findings below are editorial concerns to prioritize, not a completed independent semantic certification:

| Confirmed source ID | Finding | Bank evidence / next step |
|---|---|---|
| 2371 | Explanation removes the requirement to ensure oncoming traffic yields and suggests continuing without stopping. | True statements 2371–2374 explicitly require caution and assurance of priority. |
| 2294 | Having priority becomes an unconditional invitation to pass without yielding/stopping. | 2290 requires slowing to verify priority; 2288 names the officer exception. |
| 2937 | `strada comunale` is rendered as an urban road, conflating municipal classification with being inside a city. | Preserve “راه تحت مدیریت شهرداری”; confirm terminology against an official reference. |
| 3064 | A direction-diagram explanation adds a blanket right-of-way rule for all roundabouts. | Related true statements 3061–3065 describe directions only; remove unsupported extra rule. |
| 2464 | A ban on crossing the solid line becomes a blanket ban on overtaking. | 2459 supports “do not cross the continuous center line”; avoid expanding the claim. |
| 4919 / 4765 | Order is supported but the explanation invents or generalizes a sign/right-of-way rationale. | Confirm against the actual intersection drawings before retaining the rationale. |
| 3493 / 3577 | Adds specific distance/country or simplifies the vehicle/destination restriction. | Inspect images; 3572/3574 specify actual mass and destination. |

Other sampled explanations are not certified merely because they do not appear in this table. No sample-derived bulk overwrite was made.

## Read-only full-cache audit

Export **joined** records (includes no users or session data):

```sh
npx wrangler d1 execute patente-fa-db --remote --command "$(cat scripts/export-learning-content.sql)" --json > /private/tmp/patente-content-export.json
npx tsx scripts/audit-learning-content.ts --input /private/tmp/patente-content-export.json --output /private/tmp/patente-content-audit.json
```

Use `--command` for this SELECT: the current Wrangler remote `--file` path returns import-operation metadata rather than the result rows needed by the audit.

The default run checks source matching and missing content, with no API charges or database writes. The actual production run completed with **zero source mismatches**, 808 complete records awaiting semantic review and 6,331 missing at least one cache field. The three screenshot records contain the same explanation text as the screenshots: 7114 wrongly denies the emergency switch exists; 1461 omits inflammable cargo; 5723 correctly explains why the negative statement is false and receives clearer wording plus attribution.

For bounded semantic review, supply `OPENAI_API_KEY` through the environment and optionally `OPENAI_REVIEW_MODEL`, then add `--verify --limit 30`. Output is a local review report only: it does not publish content or modify answer keys. Review flagged items against official evidence; an automatic pass is not a human sign-off. The script refuses snapshots with guessed IDs or an output path equal to its input.

The user explicitly authorized the 33-question payload (the 30 existing sample records plus the three screenshot records), and the real OpenAI audit subsequently completed: **14 machine passes, 7 explicit flags, 12 inconclusive responses rejected by the evidence validator**. These are not counts of correct/incorrect translations. The reviewer missed the known defect in 1461, rejected 2294's faithful preservation of a false claim, and contradicted true evidence about priority from the right in 2224. No automatic bulk corrections were published. See `CONTENT-AUDIT-2026-10-13.md` and `audits/content-review-2026-10-13.json`.

Execution note: an inherited environment key initially caused HTTP 401. The successful run explicitly loaded the project's existing key from `.dev.vars` into the process without printing it. With Node's `--env-file`, an already exported value takes precedence, so use the intended project environment. Two follow-up calls on the same authorized records (2937 and 5723) confirmed complete JSON responses with empty evidence IDs, not truncation; the validator conservatively withheld approval. No additional questions or user data were sent.

## Deployment sequence

1. Confirm authorized Cloudflare access to the configured D1 ID. This was completed successfully; no alternate database was used.
2. Export a backup and the joined content snapshot; inspect audit findings. Preserve the snapshot outside Git.
3. Apply `migrations/0017_content_quality.sql` through the normal migration command **before** deploying the Worker. It preserves old translation/theory rows, adds review metadata/tables and corrects sign 73. Existing code tolerates the new additive fields.
4. Deploy the tested branch after user approval, then verify a real Telegram practice answer, unaided exam source lock, the three fixed explanations and admin report handling.
5. A code rollback may leave the additive migration in place. Do not drop review history or user reports. Old code would resume serving unchecked cache, so assess that tradeoff before rollback.

## Source attribution

The derived server-only provenance index uses [Ed0ardo/QuizPatenteB](https://github.com/Ed0ardo/QuizPatenteB/tree/512dd5d2193d5ca805fbd4c0a9789d9670207dfe), MIT © 2023 Edoardo. Its license is retained in `licenses/QuizPatenteB-MIT.txt`. The index builder rejects source bytes whose SHA-256 differs from the pinned upstream file. To reproduce, pass that exact upstream JSON to `scripts/build-question-provenance.ts`; the local imported bank must also match structurally.

## Validation evidence

User journeys were derived from the screenshots and the request to display sources after answering. RED checkpoint: `bdc7c1e`, missing provenance/content publication implementation. The same focused tests subsequently passed. Final command totals and remaining visual checks are recorded below before delivery.

| Guarantee | Validation | Result |
|---|---|---|
| Exact source matching; no invented attribution; locked answer links | `tests/content-quality.test.ts` + deferred exam suite | PASS |
| Three source-backed corrections; false claim preserved in translation | Focused content tests | PASS |
| Reject malformed/truncated/unsupported reviews; retain old content; protect human edits against in-flight generation | Focused content tests with controlled API responses and real SQLite | PASS |
| Report auth, rate bound, deduplication, admin-only decision, no answer-key edits | Real worker/API integration tests | PASS |
| Existing migration sequence preserves prior cache and corrects sign 73; fresh schema repeatable | All migrations 0001–0017 on in-memory SQLite | PASS |
| Reports and revision history remain in backups | Backup test with intercepted outgoing request | PASS |
| Entire repository regression suite | `npm run test:coverage` | **154/154 PASS**; lines **85.26%**, branches **85.48%**, functions **81.63%** |
| Worker and scripts compile | `npm run typecheck`; syntax checks for three changed browser scripts | PASS |
| Deployable bundle, without publishing | `wrangler deploy --dry-run` | PASS, gzip **307.83 KiB** |
| Sign prompt/image regressions | `scripts/test-sign-grounding.ts` | PASS |
| Read-only audit export matching and malformed input refusal | CLI fixtures plus actual joined production export | PASS; all 7,139 source records match; all 30 legacy sample mappings confirmed |
| Mobile source/report journey | Local in-memory preview, 390×844, CUA browser | Source appears after selection, disappears on next question, locked source dialog has no links, report submission acknowledged; report appears in admin list |

Visual limitation: the in-app browser automation stalled on the native AI-assistance confirmation. The assisted-mode, final-results and admin-edit behavior are covered by API tests but their complete visual journeys still require a real Telegram visual smoke test. Authenticated production API checks now confirm all three sourced corrections, source links and the admin report list. A real production model review of 693 produced an inconclusive result and the gate withheld its content as designed; this is not a semantic pass. Model requests in automated tests are mocked; they prove gate behavior, not model accuracy. The separate real 33-question audit demonstrates both useful flags and reviewer errors. A full production semantic audit remains outstanding.
