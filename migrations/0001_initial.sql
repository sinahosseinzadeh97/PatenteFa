-- Migration: 0001_initial
-- Created: 2026-07-22
-- Apply: wrangler d1 migrations apply patente-fa-db --local / --remote

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  telegram_user_id INTEGER UNIQUE NOT NULL,
  first_name TEXT,
  username TEXT,
  target_exam_date TEXT,
  daily_reminder_hour INTEGER DEFAULT 8,
  timezone TEXT DEFAULT 'Europe/Rome',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS topics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_it TEXT NOT NULL,
  name_fa TEXT,
  sort_order INTEGER
);

CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_id TEXT UNIQUE,
  topic_id INTEGER REFERENCES topics(id),
  text_it TEXT NOT NULL,
  correct_answer INTEGER NOT NULL,
  image_url TEXT,
  wrong_rate REAL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_questions_wrong_rate ON questions(wrong_rate DESC);

CREATE TABLE IF NOT EXISTS translations_cache (
  question_id INTEGER REFERENCES questions(id),
  lang TEXT NOT NULL,
  translated_text TEXT NOT NULL,
  explanation TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (question_id, lang)
);

CREATE TABLE IF NOT EXISTS exam_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  mode TEXT DEFAULT 'exam',
  started_at TEXT DEFAULT (datetime('now')),
  finished_at TEXT,
  duration_seconds INTEGER,
  score INTEGER,
  wrong_count INTEGER,
  passed INTEGER
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON exam_sessions(user_id, started_at DESC);

CREATE TABLE IF NOT EXISTS exam_answers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER REFERENCES exam_sessions(id),
  question_id INTEGER REFERENCES questions(id),
  position INTEGER,
  user_answer INTEGER,
  is_correct INTEGER,
  flagged INTEGER DEFAULT 0,
  answered_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_answers_session ON exam_answers(session_id);
CREATE INDEX IF NOT EXISTS idx_answers_question ON exam_answers(question_id);

CREATE TABLE IF NOT EXISTS review_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  question_id INTEGER REFERENCES questions(id),
  wrong_count INTEGER DEFAULT 1,
  last_wrong_at TEXT DEFAULT (datetime('now')),
  next_review_at TEXT,
  cleared INTEGER DEFAULT 0,
  UNIQUE(user_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_review_user ON review_queue(user_id, cleared, next_review_at);

CREATE TABLE IF NOT EXISTS vocab_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  term_it TEXT NOT NULL,
  term_fa TEXT NOT NULL,
  note TEXT,
  source_question_id INTEGER REFERENCES questions(id),
  interval_days INTEGER DEFAULT 1,
  next_review_at TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_vocab_user ON vocab_items(user_id, next_review_at);
