import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Runs the real classic script; it only assigns App.* functions at load time.
function loadGetAiRequest() {
  const App: Record<string, any> = {};
  vm.runInNewContext(readFileSync('public/js/exam.js', 'utf8'), { App, state: {}, window: {}, document: {}, TypeError });
  return App.getAiRequest as (key: string, factory: () => Promise<unknown>) => Promise<unknown>;
}

test('AI tab request retries once after a network failure ("Load failed")', async () => {
  const getAiRequest = loadGetAiRequest();
  let calls = 0;
  const result = await getAiRequest('k', async () => { if (++calls === 1) throw new TypeError('Load failed'); return 'ok'; });
  assert.equal(result, 'ok');
  assert.equal(calls, 2);
});

test('AI tab request does not retry HTTP errors', async () => {
  const getAiRequest = loadGetAiRequest();
  let calls = 0;
  await assert.rejects(getAiRequest('k', async () => { calls++; throw Object.assign(new Error('locked'), { status: 403 }); }), /locked/);
  assert.equal(calls, 1);
});
