/** Read-only audit of an exported cache; never writes to D1 or publishes drafts. */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { getQuestionSource, getQuestionEvidence, sourceKey, reviewedContent, type SourceQuestion } from '../src/lib/question-sources.js';
import { verifyLearningContent, CONTENT_VERSION } from '../src/lib/content-quality.js';

type Row = SourceQuestion & { id: number; translated_text?: string; explanation?: string; quality_status?: string };
async function main() {
  const args = process.argv.slice(2);
  const input = args[args.indexOf('--input') + 1];
  const output = args[args.indexOf('--output') + 1];
  const verify = args.includes('--verify');
  const limit = args.includes('--limit') ? Number(args[args.indexOf('--limit') + 1]) : 30;
  if (!args.includes('--input') || !args.includes('--output') || !input || !output || !Number.isSafeInteger(limit) || limit < 1 || limit > 10000) {
    throw new Error('Usage: tsx scripts/audit-learning-content.ts --input export.json --output report.json [--verify --limit 30]');
  }
  if (resolve(input) === resolve(output)) throw new Error('Audit output must not overwrite the input snapshot');
  const parsed = JSON.parse(readFileSync(input, 'utf8'));
  const rows: Row[] = Array.isArray(parsed) && parsed[0]?.results ? parsed.flatMap((page: { results: Row[] }) => page.results) : parsed;
  if (!Array.isArray(rows) || rows.some(r => !Number.isSafeInteger(r.id) || typeof r.source_id !== 'string' || typeof r.text_it !== 'string' || ![0, 1].includes(r.correct_answer) || !(r.image_url === null || typeof r.image_url === 'string'))) {
    throw new Error('Export must include real question id, source_id, text_it, correct_answer, image_url, translated_text and explanation. Do not infer source_id from internal question_id.');
  }
  if (verify && !process.env.OPENAI_API_KEY) throw new Error('--verify requires OPENAI_API_KEY in the process environment');
  let checked = 0;
  const report: Record<string, unknown>[] = [];
  for (const row of rows) {
    const evidence = getQuestionEvidence(row);
    let status = !sourceKey(row) ? 'source_mismatch' : !row.translated_text || !row.explanation ? 'missing_content' : 'not_semantically_checked';
    let review: unknown = null;
    if (verify && checked < limit && status === 'not_semantically_checked' && evidence.length) {
      checked++;
      try {
        const result = await verifyLearningContent({ OPENAI_API_KEY: process.env.OPENAI_API_KEY!, OPENAI_REVIEW_MODEL: process.env.OPENAI_REVIEW_MODEL }, row,
          { translatedText: row.translated_text!, explanation: row.explanation! }, evidence, 0);
        review = result;
        status = result.translationFaithful && result.explanationSupported && result.verdictConsistent && !result.issues.length ? 'machine_pass' : 'needs_review';
      } catch (error) { status = 'check_failed'; review = error instanceof Error ? error.message : 'unknown'; }
    }
    report.push({ questionId: row.id, sourceId: row.source_id, status, evidenceCount: evidence.length, source: getQuestionSource(row), reviewedReplacement: reviewedContent(row), review });
    // Save every item so an interruption does not discard paid review results.
    if (review !== null || report.length % 100 === 0 || report.length === rows.length) writeFileSync(output, JSON.stringify({ contentVersion: CONTENT_VERSION, generatedAt: new Date().toISOString(), readOnly: true, inputCount: rows.length, completed: report.length, modelChecks: checked, records: report }, null, 2));
  }
  if (!rows.length) writeFileSync(output, JSON.stringify({ contentVersion: CONTENT_VERSION, readOnly: true, inputCount: 0, completed: 0, modelChecks: 0, records: [] }, null, 2));
  const counts: Record<string, number> = {};
  for (const row of report) counts[String(row.status)] = (counts[String(row.status)] || 0) + 1;
  console.log(JSON.stringify({ inputCount: rows.length, modelChecks: checked, counts, output }));
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
