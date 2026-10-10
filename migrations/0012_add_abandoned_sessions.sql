-- Track sessions the user explicitly left without treating them as completed,
-- scored exams. The nullable column is an additive, low-risk schema expansion.
-- Rollback strategy: deploy code that ignores this column; remove it only in a
-- later forward migration if SQLite/D1 table-rebuild risk is justified.

ALTER TABLE exam_sessions ADD COLUMN abandoned_at TEXT;

CREATE INDEX IF NOT EXISTS idx_sessions_active
ON exam_sessions(user_id, finished_at, abandoned_at);
