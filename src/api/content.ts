import { Hono } from 'hono';
import type { AppEnv, AppVariables } from '../types.js';
import { getQuestionById, isAiLockedForQuestion } from '../db/queries.js';
import { getQuestionSource } from '../lib/question-sources.js';

const content = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

content.get('/:questionId/source', async c => {
  const id = Number(c.req.param('questionId'));
  if (!Number.isSafeInteger(id) || id < 1) return c.json({ error: 'Invalid question' }, 400);
  const q = await getQuestionById(c.env.DB, id);
  if (!q) return c.json({ error: 'Question not found' }, 404);
  const locked = await isAiLockedForQuestion(c.env.DB, c.get('userId'), id);
  return c.json({ questionId: id, source: getQuestionSource(q, !locked), linksLocked: locked });
});

content.post('/:questionId/report', async c => {
  const id = Number(c.req.param('questionId'));
  const body = await c.req.json().catch(() => null) as { kind?: unknown; note?: unknown } | null;
  const kinds = ['translation', 'explanation', 'answer', 'source'];
  if (!Number.isSafeInteger(id) || id < 1 || !body || typeof body.kind !== 'string' || !kinds.includes(body.kind)
    || (body.note !== undefined && (typeof body.note !== 'string' || body.note.length > 1000))) return c.json({ error: 'گزارش معتبر نیست؛ متن حداکثر ۱۰۰۰ نویسه باشد.' }, 400);
  const q = await getQuestionById(c.env.DB, id);
  if (!q) return c.json({ error: 'Question not found' }, 404);
  const userId = c.get('userId');
  const existing = await c.env.DB.prepare("SELECT id FROM content_reports WHERE question_id = ? AND user_id = ? AND kind = ? AND status = 'open'").bind(id, userId, body.kind).first();
  if (existing) return c.json({ recorded: true, duplicate: true });
  const count = await c.env.DB.prepare("SELECT COUNT(*) AS n FROM content_reports WHERE user_id = ? AND created_at >= datetime('now', '-1 day')").bind(userId).first<{ n: number }>();
  if ((count?.n || 0) >= 20) return c.json({ error: 'گزارش‌های امروز ثبت شده‌اند؛ فردا دوباره تلاش کن.' }, 429);
  const cache = await c.env.DB.prepare("SELECT translated_text, explanation, content_version, quality_status FROM translations_cache WHERE question_id = ? AND lang = 'fa'").bind(id).first();
  const result = await c.env.DB.prepare("INSERT OR IGNORE INTO content_reports (question_id, user_id, kind, note, content_snapshot) VALUES (?, ?, ?, ?, ?)")
    .bind(id, userId, body.kind, typeof body.note === 'string' ? body.note.trim() : '', JSON.stringify({ question: { source_id: q.source_id, text_it: q.text_it, correct_answer: q.correct_answer, image_url: q.image_url }, content: cache || {} })).run();
  // Only acknowledgement is returned: snapshots and answer keys are admin-only.
  return c.json({ recorded: true, duplicate: result.meta.changes === 0 }, result.meta.changes === 0 ? 200 : 201);
});
export { content };
