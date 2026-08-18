-- PatenteFa D1 Schema
-- Applied via: wrangler d1 migrations apply patente-fa-db --local / --remote

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  telegram_user_id INTEGER UNIQUE NOT NULL,
  first_name TEXT,
  username TEXT,
  target_exam_date TEXT,               -- ISO date, optional e.g. '2026-11-22'
  daily_reminder_hour INTEGER DEFAULT 8,
  timezone TEXT DEFAULT 'Europe/Rome',
  is_approved INTEGER DEFAULT 0,
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
  source_id TEXT UNIQUE,               -- id from the imported dataset, for traceability
  topic_id INTEGER REFERENCES topics(id),
  text_it TEXT NOT NULL,
  correct_answer INTEGER NOT NULL,     -- 1 = VERO, 0 = FALSO
  image_url TEXT,                      -- R2 public URL, nullable
  wrong_rate REAL DEFAULT 0,           -- rolling stat, recomputed from exam_answers
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_questions_wrong_rate ON questions(wrong_rate DESC);

CREATE TABLE IF NOT EXISTS translations_cache (
  question_id INTEGER REFERENCES questions(id),
  lang TEXT NOT NULL,                  -- 'fa'
  translated_text TEXT NOT NULL,
  explanation TEXT,
  theory_text TEXT,                    -- 🎓 مربی تئوری (full theory explanation)
  grammar_analysis TEXT,               -- 📚 معلم گرامر (grammar analysis)
  vocab_suggestions TEXT,              -- JSON array with term, translation, POS, and infinitive
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (question_id, lang)
);


CREATE TABLE IF NOT EXISTS exam_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  mode TEXT DEFAULT 'exam',            -- 'exam' | 'topic_practice' | 'review'
  started_at TEXT DEFAULT (datetime('now')),
  finished_at TEXT,
  duration_seconds INTEGER,
  score INTEGER,
  wrong_count INTEGER,
  passed INTEGER                       -- 1/0, computed as wrong_count <= 3 for mode='exam'
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON exam_sessions(user_id, started_at DESC);

CREATE TABLE IF NOT EXISTS exam_answers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER REFERENCES exam_sessions(id),
  question_id INTEGER REFERENCES questions(id),
  position INTEGER,                    -- 1..30
  user_answer INTEGER,                 -- 1/0, NULL if skipped/timed-out
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

-- Support inbox — one thread per user, written by both the Mini App and the
-- Telegram relay. See migrations/0010_support_messages.sql for the direction
-- and read_at semantics.
CREATE TABLE IF NOT EXISTS support_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  direction TEXT NOT NULL,             -- 'in' = user → support, 'out' = support → user
  body TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'app',  -- 'app' | 'telegram'
  read_at TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_support_user ON support_messages(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_support_unread ON support_messages(direction, read_at);
