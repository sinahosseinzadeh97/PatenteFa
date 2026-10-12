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
