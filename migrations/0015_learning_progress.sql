-- 0015_learning_progress.sql
--
-- Per-user state for the structured learning path (pilot: Segnali di precedenza).
-- Lesson content itself is curated code in src/content/lessons.ts; only what a
-- learner did is stored here.

-- One row per (user, lesson). `step` is the furthest step reached, so resume
-- never moves backwards when a retried or out-of-order save arrives late.
-- completed_at is written once and never cleared.
CREATE TABLE IF NOT EXISTS lesson_progress (
  user_id INTEGER NOT NULL REFERENCES users(id),
  lesson_id TEXT NOT NULL,
  step INTEGER NOT NULL DEFAULT 0,
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT,
  PRIMARY KEY (user_id, lesson_id)
);

-- First answer to each in-lesson practice question. The primary key makes a
-- retried request a no-op; review_queued makes the review-queue insert for a
-- wrong answer happen exactly once.
CREATE TABLE IF NOT EXISTS lesson_answers (
  user_id INTEGER NOT NULL REFERENCES users(id),
  lesson_id TEXT NOT NULL,
  question_id INTEGER NOT NULL REFERENCES questions(id),
  user_answer INTEGER NOT NULL,
  is_correct INTEGER NOT NULL,
  review_queued INTEGER NOT NULL DEFAULT 0,
  answered_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, lesson_id, question_id)
);
