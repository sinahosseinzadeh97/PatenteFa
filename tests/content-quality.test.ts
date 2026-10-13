import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createSqliteD1, signedInitData } from './helpers/sqlite-d1.js';
import worker from '../src/index.js';
import type { AppEnv } from '../src/types.js';
import { getQuestionSource, getQuestionEvidence, reviewedContent } from '../src/lib/question-sources.js';
import { getLearningContent, CONTENT_VERSION } from '../src/lib/content-quality.js';

const motor = { id: 7114, source_id: '7114', text_it: "Per facilitare lo spegnimento del motore, i veicoli a motore a due ruote sono equipaggiati di un interruttore d'emergenza azionabile con la pressione del piede destro", correct_answer: 0, image_url: null };
const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;
function setup() {
  const { db, raw } = createSqliteD1();
  raw.exec("INSERT INTO users (id, telegram_user_id, is_approved) VALUES (1, 9001, 1), (2, 9002, 1)");
  raw.prepare('INSERT INTO questions (id, source_id, text_it, correct_answer, image_url) VALUES (?, ?, ?, ?, ?)').run(motor.id, motor.source_id, motor.text_it, 0, null);
  const env = { DB: db, TELEGRAM_BOT_TOKEN: 'test:content', ALLOWED_TELEGRAM_USER_IDS: '9001', PRIMARY_ADMIN_TELEGRAM_USER_ID: '9001', OPENAI_API_KEY: 'test' } as AppEnv;
  const call = (path: string, body?: unknown, user = 9001, method = 'POST') => worker.fetch(new Request('https://test/api' + path, {
    method, headers: { 'Content-Type': 'application/json', 'X-Telegram-InitData': signedInitData('test:content', user) },
    body: body === undefined ? undefined : JSON.stringify(body),
  }), env, ctx);
  return { db, raw, env, call };
}

test('exact bank question has traceable source and official corroboration; edited text must not inherit it', () => {
  const source = getQuestionSource(motor);
  assert.match(source.url!, /github.com\/Ed0ardo\/QuizPatenteB\/blob\/[a-f0-9]{40}/);
  assert.match(source.official!.url!, /ilportaledellautomobilista/);
  const changed = getQuestionSource({ ...motor, text_it: motor.text_it + ' sempre' });
  assert.equal(changed.url, null);
  assert.equal(changed.official, null);
  assert.equal(reviewedContent({ ...motor, correct_answer: 1 }), null);
});

test('locked exam source contains attribution but no links to answer keys', () => {
  const source = getQuestionSource(motor, false);
  assert.ok(source.title);
  assert.equal(source.url, null);
  assert.equal(source.official?.url, null);
});

test('motor explanation is grounded in true statements about the handlebar, not the false claim', () => {
  const evidence = getQuestionEvidence(motor);
  assert.ok(evidence.some(e => e.textIt.includes('posto sul manubrio')));
  assert.ok(evidence.every(e => e.correctAnswer === 1));
  const fixed = reviewedContent(motor)!;
  assert.match(fixed.translatedText, /پای راست/);
  assert.match(fixed.explanation, /فرمان/);
  assert.doesNotMatch(fixed.explanation, /وجود ندارد/);
});

test('curated corrections supersede old cache without calling AI and preserve a revision record', async () => {
  const { db, raw, env } = setup();
  raw.prepare("INSERT INTO translations_cache (question_id, lang, translated_text, explanation) VALUES (?, 'fa', 'ترجمه قبلی نمونه', 'این کلید وجود ندارد')").run(motor.id);
  const result = await getLearningContent(env, motor, 1);
  assert.equal(result.qualityStatus, 'source_checked');
  assert.match(result.explanation, /فرمان/);
  assert.equal(raw.prepare('SELECT content_version FROM translations_cache').get()!.content_version, CONTENT_VERSION);
  assert.equal(raw.prepare('SELECT COUNT(*) AS n FROM content_revisions').get()!.n, 1);
  await getLearningContent(env, motor, 1);
  assert.equal(raw.prepare('SELECT COUNT(*) AS n FROM content_revisions').get()!.n, 1);
});

test('unknown question gets no invented explanation or false verified badge', async () => {
  const { env } = setup();
  const result = await getLearningContent(env, { ...motor, text_it: 'Un testo diverso.' }, 1);
  assert.equal(result.qualityStatus, 'needs_review');
  assert.equal(result.explanation, '');
});

test('content report is authenticated, bounded and deduplicated; non-admin cannot read reports', async () => {
  const { call, raw } = setup();
  assert.equal((await call('/content/7114/report', { kind: 'explanation', note: 'این کلید روی فرمان است' }, 9002)).status, 201);
  assert.equal((await call('/content/7114/report', { kind: 'explanation', note: 'گزارش تکراری' }, 9002)).status, 200);
  assert.equal(raw.prepare('SELECT COUNT(*) AS n FROM content_reports').get()!.n, 1);
  assert.equal((await call('/content/7114/report', { kind: 'answer', note: 'x'.repeat(1001) })).status, 400);
  assert.equal((await call('/content/999/report', { kind: 'translation' })).status, 404);
  assert.equal((await call('/admin/content-reports', undefined, 9002, 'GET')).status, 403);
  const list = await call('/admin/content-reports', undefined, 9001, 'GET');
  assert.equal(list.status, 200);
  assert.equal((await list.json() as any).reports.length, 1);
});

test('exam source endpoint respects the AI lock, then opens citations after finish', async () => {
  const { call, raw } = setup();
  raw.exec("INSERT INTO exam_sessions (id, user_id, mode) VALUES (1, 1, 'exam'); INSERT INTO exam_answers (session_id, question_id, position) VALUES (1, 7114, 1)");
  const active = await call('/content/7114/source', undefined, 9001, 'GET');
  const before = await active.json() as any;
  assert.equal(before.source.url, null);
  assert.equal(before.source.official?.url, null);
  raw.exec("UPDATE exam_sessions SET finished_at = datetime('now') WHERE id = 1");
  const after = await (await call('/content/7114/source', undefined, 9001, 'GET')).json() as any;
  assert.match(after.source.url, /^https:/);
});

test('source and reporting controls are present on the exam screen', () => {
  const screen = readFileSync('src/app/screens/exam.ts', 'utf8');
  assert.match(screen, /id="exam-question-source"/);
  assert.match(screen, /id="translate-quality"/);
});

// Exercise the publication gate, including malformed reviewers and concurrent edits.
import provenance from '../src/content/question-provenance.json';
import { sourceKey } from '../src/lib/question-sources.js';
import { verifyLearningContent, saveReviewedContent, getTheoryContent } from '../src/lib/content-quality.js';

function ordinaryQuestion() {
  const [text, answer, image] = provenance.entries[0];
  return { id: 1, source_id: '1', text_it: String(text), correct_answer: Number(answer), image_url: image ? '/images/signs/' + image : null };
}
function seedOrdinary(raw: ReturnType<typeof setup>['raw']) {
  const q = ordinaryQuestion();
  raw.prepare('INSERT INTO questions (id, source_id, text_it, correct_answer, image_url) VALUES (?, ?, ?, ?, ?)').run(q.id, q.source_id, q.text_it, q.correct_answer, q.image_url);
  raw.exec("INSERT INTO translations_cache (question_id, lang, translated_text, explanation) VALUES (1, 'fa', 'ترجمهٔ نمونه برای بررسی', 'توضیح نمونه برای بررسی')");
  return q;
}
const completion = (value: unknown, finish = 'stop') => Response.json({ choices: [{ finish_reason: finish, message: { content: typeof value === 'string' ? value : JSON.stringify(value) } }] });
function acceptance(q = ordinaryQuestion()) {
  return { translationFaithful: true, explanationSupported: true, verdictConsistent: true, evidenceIds: [getQuestionEvidence(q)[0].sourceId], issues: [] };
}

test('only a complete review citing supplied evidence can approve content', async t => {
  const { env } = setup();
  const q = ordinaryQuestion();
  const evidence = getQuestionEvidence(q);
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  for (const [payload, finish] of [
    ['invalid json', 'stop'],
    [{ ...acceptance(), translationFaithful: 'true' }, 'stop'],
    [{ ...acceptance(), evidenceIds: ['made-up'] }, 'stop'],
    [{ ...acceptance(), evidenceIds: [] }, 'stop'],
    [{ ...acceptance(), issues: [12] }, 'stop'],
    [acceptance(), 'length'],
  ] as const) {
    globalThis.fetch = async () => completion(payload, finish);
    const check = await verifyLearningContent(env, q, { translatedText: 'متن نمونه', explanation: 'توضیح' }, evidence, 1);
    assert.equal(check.explanationSupported, false);
  }
  globalThis.fetch = async () => completion(acceptance());
  assert.equal((await verifyLearningContent(env, q, { translatedText: 'نمونه', explanation: 'توضیح' }, evidence, 1)).explanationSupported, true);
});

test('verified legacy content is versioned, reused without another API call and kept in history', async t => {
  const { env, raw } = setup(); const q = seedOrdinary(raw);
  let calls = 0;
  const original = globalThis.fetch; t.after(() => { globalThis.fetch = original; });
  globalThis.fetch = async () => { calls++; return completion(acceptance()); };
  const first = await getLearningContent(env, q, 1);
  assert.equal(first.qualityStatus, 'machine_checked');
  assert.equal(first.explanation, 'توضیح نمونه برای بررسی');
  const second = await getLearningContent(env, q, 1);
  assert.equal(second.cached, true);
  assert.equal(calls, 1);
  assert.equal(raw.prepare('SELECT COUNT(*) AS n FROM content_revisions').get()!.n, 1);
});

test('rejected explanations are hidden and retained; faithful translation survives regeneration', async t => {
  const { env, raw } = setup(); const q = seedOrdinary(raw);
  const original = globalThis.fetch; t.after(() => { globalThis.fetch = original; });
  let calls = 0;
  globalThis.fetch = async (_input, init) => {
    calls++;
    const body = JSON.parse(String(init?.body));
    if (body.messages[0].content.includes('بازبین مستقل')) return completion({ ...acceptance(), explanationSupported: false, issues: ['توضیح شاهد کافی ندارد'] });
    assert.ok(body.messages[0].content.includes('توضیح‌دهنده'), 'a faithful translation must not be regenerated');
    return completion({ explanation: 'توضیح تولیدشدهٔ بی‌شاهد' });
  };
  const result = await getLearningContent(env, q, 1);
  assert.equal(result.qualityStatus, 'needs_review');
  assert.equal(result.explanation, '');
  assert.equal(result.translatedText, 'ترجمهٔ نمونه برای بررسی');
  assert.equal(calls, 3);
  assert.equal(raw.prepare("SELECT COUNT(*) AS n FROM content_revisions WHERE quality_status = 'rejected'").get()!.n, 1);
  await getLearningContent(env, q, 1);
  assert.equal(calls, 3, 'a rejected version must not cause repeated automatic spending');
});

test('review failure does not leak a legacy explanation', async t => {
  const { env, raw } = setup(); const q = seedOrdinary(raw);
  const original = globalThis.fetch; t.after(() => { globalThis.fetch = original; });
  globalThis.fetch = async () => new Response('', { status: 503 });
  assert.equal((await getLearningContent(env, q, 1)).explanation, '');
  assert.equal(raw.prepare('SELECT explanation FROM translations_cache').get()!.explanation, 'توضیح نمونه برای بررسی');
});

test('an in-flight automatic review cannot overwrite a human edit or return its stale result', async t => {
  const { env, raw } = setup(); const q = seedOrdinary(raw);
  const original = globalThis.fetch; t.after(() => { globalThis.fetch = original; });
  globalThis.fetch = async () => {
    await saveReviewedContent(env, q, 'ترجمهٔ اصلاح‌شده توسط مدیر', 'توضیح دقیق اصلاح‌شده توسط مدیر', 'human_reviewed', 'admin:1');
    return completion(acceptance());
  };
  const result = await getLearningContent(env, q, 1);
  assert.equal(result.qualityStatus, 'human_reviewed');
  assert.equal(result.explanation, 'توضیح دقیق اصلاح‌شده توسط مدیر');
  assert.equal(raw.prepare('SELECT quality_status FROM translations_cache').get()!.quality_status, 'human_reviewed');
});

test('human review stays pinned after a content-version upgrade; corrupt approved cache is withheld', async () => {
  const { env, raw } = setup();
  await saveReviewedContent(env, motor, 'ترجمهٔ بازبینی‌شده توسط مدیر', 'این کلید روی فرمان قرار دارد.', 'human_reviewed', 'admin:1');
  raw.exec("UPDATE translations_cache SET content_version = 'previous-version'");
  assert.equal((await getLearningContent(env, motor, 1)).qualityStatus, 'human_reviewed');
  raw.exec("UPDATE translations_cache SET explanation = ''");
  assert.equal((await getLearningContent(env, motor, 1)).qualityStatus, 'needs_review');
});

test('expanded theory is verified and cannot replace an intervening human correction', async t => {
  const { env, raw } = setup(); const q = seedOrdinary(raw);
  await saveReviewedContent(env, q, 'ترجمهٔ نمونه برای بررسی', 'توضیح نمونه برای بررسی', 'machine_checked', 'reviewer');
  const original = globalThis.fetch; t.after(() => { globalThis.fetch = original; });
  globalThis.fetch = async (_input, init) => {
    const body = JSON.parse(String(init?.body));
    if (body.messages[0].content.includes('بازبین مستقل')) {
      await saveReviewedContent(env, q, 'ترجمهٔ اصلاح‌شده توسط مدیر', 'توضیح دقیق اصلاح‌شده توسط مدیر', 'human_reviewed', 'admin:1');
      return completion(acceptance());
    }
    return completion('تئوری تولیدشده برای بررسی');
  };
  const result = await getTheoryContent(env, q, 1);
  assert.equal(result.qualityStatus, 'human_reviewed');
  assert.equal(result.theoryText, 'توضیح دقیق اصلاح‌شده توسط مدیر');
  assert.equal(raw.prepare('SELECT theory_checked_key FROM translations_cache').get()!.theory_checked_key, null);
});

test('admin correction records the decision, preserves the old content, and leaves the answer key unchanged', async () => {
  const { call, raw, env } = setup();
  await getLearningContent(env, motor, 1);
  await call('/content/7114/report', { kind: 'explanation', note: 'اشکال در توضیح' }, 9002);
  const response = await call('/admin/content-reports/1/resolve', { status: 'resolved', note: 'تطبیق با سند رسمی صفحه ۱۲۹', translatedText: 'ترجمهٔ بازبینی‌شده توسط مدیر', explanation: 'کلید قطع اضطراری روی فرمان قرار دارد.' });
  assert.equal(response.status, 200);
  assert.equal(raw.prepare('SELECT status FROM content_reports').get()!.status, 'resolved');
  assert.equal(raw.prepare('SELECT quality_status FROM translations_cache').get()!.quality_status, 'human_reviewed');
  assert.equal(raw.prepare('SELECT correct_answer FROM questions').get()!.correct_answer, 0);
  assert.ok(raw.prepare('SELECT COUNT(*) AS n FROM content_revisions').get()!.n);
  assert.equal((await call('/admin/content-reports/1/resolve', { status: 'dismissed', note: 'تکراری' })).status, 404);
});

test('all 7,139 indexed questions match their own provenance; methane and trailer corrections preserve the original claims', () => {
  for (const [i, [text, answer, image]] of provenance.entries.entries()) {
    const q = { source_id: String(i + 1), text_it: String(text), correct_answer: Number(answer), image_url: image ? '/images/signs/' + image : null };
    assert.ok(sourceKey(q), 'source id ' + q.source_id);
    if (q.source_id === '1461') assert.match(reviewedContent(q)!.explanation, /مخزن/);
    if (q.source_id === '5723') assert.match(reviewedContent(q)!.translatedText, /لازم نیست/);
  }
});

import { DatabaseSync } from 'node:sqlite';
import { readdirSync } from 'node:fs';

test('migration preserves prior cache, corrects sign 73, and fresh schema is repeatable', () => {
  const db = new DatabaseSync(':memory:');
  for (const file of readdirSync('migrations').filter(f => f.endsWith('.sql') && f < '0017').sort()) db.exec(readFileSync('migrations/' + file, 'utf8'));
  db.exec("INSERT INTO questions (id, source_id, text_it, correct_answer) VALUES (7114, '7114', 'example', 0); INSERT INTO translations_cache (question_id, lang, translated_text, explanation) VALUES (7114, 'fa', 'متن قبلی', 'توضیح قبلی'); INSERT INTO sign_meanings (image_url, slug, name_it, name_fa, meaning_fa) VALUES ('/images/signs/73.png', 'sign-73', 'old', 'قبلی', 'قبلی')");
  db.exec(readFileSync('migrations/0017_content_quality.sql', 'utf8'));
  assert.deepEqual(db.prepare('SELECT translated_text, explanation, quality_status FROM translations_cache').get(), Object.assign(Object.create(null), { translated_text: 'متن قبلی', explanation: 'توضیح قبلی', quality_status: 'legacy' }));
  assert.match(String(db.prepare('SELECT name_it FROM sign_meanings').get()!.name_it), /INFIAMMABILI/);
  db.close();
  const fresh = createSqliteD1();
  assert.doesNotThrow(() => fresh.raw.exec(readFileSync('src/db/schema.sql', 'utf8')));
});

test('answer/source reports cannot be closed by a prose-only edit; other reports require a recorded reason', async () => {
  const { call } = setup();
  await call('/content/7114/report', { kind: 'answer' });
  assert.equal((await call('/admin/content-reports/1/resolve', { status: 'resolved', note: 'باید بانک بررسی شود', translatedText: 'ترجمهٔ نمونه برای بررسی', explanation: 'توضیح نمونه برای بررسی' })).status, 409);
  assert.equal((await call('/admin/content-reports/1/resolve', { status: 'dismissed', note: '' })).status, 400);
  assert.equal((await call('/admin/content-reports/1/resolve', { status: 'dismissed', note: 'پاسخ بانک با سند مطابقت دارد' })).status, 200);
});

test('report limit bounds daily submissions without leaking the cached answer or explanation', async () => {
  const { raw, call } = setup();
  for (let i = 0; i < 20; i++) raw.prepare("INSERT INTO content_reports (question_id, user_id, kind, content_snapshot, status) VALUES (7114, 1, 'translation', '{}', 'resolved')").run();
  assert.equal((await call('/content/7114/report', { kind: 'explanation' })).status, 429);
  const response = await call('/content/7114/report', { kind: 'explanation' }, 9002);
  assert.deepEqual(await response.json(), { recorded: true, duplicate: false });
});

import { runNightlyBackup } from '../src/jobs/nightlyJournalAndBackup.js';
test('the existing nightly backup includes content reports and revision history', async t => {
  const { env, call } = setup();
  await getLearningContent(env, motor, 1);
  await saveReviewedContent(env, motor, 'ترجمهٔ اصلاح‌شده توسط مدیر', 'توضیح دقیق اصلاح‌شده توسط مدیر', 'human_reviewed', 'admin:1');
  await call('/content/7114/report', { kind: 'explanation' });
  const original = globalThis.fetch; t.after(() => { globalThis.fetch = original; });
  let backup: any;
  globalThis.fetch = async (_url, init) => {
    const form = init?.body as FormData;
    backup = JSON.parse(await (form.get('document') as File).text());
    return Response.json({ ok: true, result: {} });
  };
  await runNightlyBackup({ DB: env.DB, TELEGRAM_BOT_TOKEN: 'test:content', LOG_CHANNEL_ID: 'local-test' });
  assert.equal(backup.tables.content_reports.length, 1);
  assert.equal(backup.tables.content_revisions.length, 1);
});
