-- 0016_exam_deferred_answers.sql
--
-- Exam mode keeps answers provisional until "Finish exam". The selection lives
-- in selected_answer; user_answer and is_correct stay NULL until finish, so no
-- stats query or tutor route can reveal correctness mid-exam.
ALTER TABLE exam_answers ADD COLUMN selected_answer INTEGER;

-- AI help is optional in exam mode. ai_enabled is the current switch;
-- ai_assisted_at records that it was ever on and is never cleared.
ALTER TABLE exam_sessions ADD COLUMN ai_enabled INTEGER NOT NULL DEFAULT 0;
ALTER TABLE exam_sessions ADD COLUMN ai_assisted_at TEXT;

-- Sessions open at deploy stored answers the old way; retire them (they are
-- at most 30 minutes old and were never scored).
UPDATE exam_sessions SET abandoned_at = datetime('now')
 WHERE finished_at IS NULL AND abandoned_at IS NULL;
