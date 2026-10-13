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
  access_expires_at TEXT,              -- NULL = unlimited; otherwise UTC expiry
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
  content_version TEXT,
  content_source_key TEXT,
  quality_status TEXT NOT NULL DEFAULT 'legacy',
  quality_issues TEXT,
  checked_at TEXT,
  checked_by TEXT,
  theory_checked_key TEXT,
  PRIMARY KEY (question_id, lang)
);


CREATE TABLE IF NOT EXISTS exam_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  mode TEXT DEFAULT 'exam',            -- 'exam' | 'topic_practice' | 'review'
  started_at TEXT DEFAULT (datetime('now')),
  finished_at TEXT,
  abandoned_at TEXT,                   -- left without scoring; answers remain for progress
  duration_seconds INTEGER,
  score INTEGER,
  wrong_count INTEGER,
  passed INTEGER,                      -- 1/0, computed as wrong_count <= 3 for mode='exam'
  ai_enabled INTEGER NOT NULL DEFAULT 0, -- exam mode: AI help currently switched on
  ai_assisted_at TEXT                  -- exam mode: first time AI help was switched on; never cleared
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON exam_sessions(user_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_active ON exam_sessions(user_id, finished_at, abandoned_at);

CREATE TABLE IF NOT EXISTS exam_answers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER REFERENCES exam_sessions(id),
  question_id INTEGER REFERENCES questions(id),
  position INTEGER,                    -- 1..30
  user_answer INTEGER,                 -- 1/0, NULL if skipped/timed-out
  is_correct INTEGER,
  flagged INTEGER DEFAULT 0,
  answered_at TEXT,
  selected_answer INTEGER              -- exam mode: provisional 1/0, promoted to user_answer at finish
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

CREATE TABLE IF NOT EXISTS user_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  event_type TEXT NOT NULL,
  event_data TEXT,
  duration_seconds INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_user_events_user ON user_events(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_events_type ON user_events(event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_events_user_type_created ON user_events(user_id, event_type, created_at DESC);

CREATE TABLE IF NOT EXISTS api_usage_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  service TEXT NOT NULL DEFAULT 'openai',
  model TEXT,
  action TEXT NOT NULL,
  prompt_tokens INTEGER DEFAULT 0,
  completion_tokens INTEGER DEFAULT 0,
  estimated_cost_usd REAL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_api_usage_user ON api_usage_logs(user_id, created_at DESC);

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

-- Learning path — per-user lesson state. Content lives in src/content/lessons.ts.
-- See migrations/0015_learning_progress.sql for the idempotency rules.
CREATE TABLE IF NOT EXISTS lesson_progress (
  user_id INTEGER NOT NULL REFERENCES users(id),
  lesson_id TEXT NOT NULL,
  step INTEGER NOT NULL DEFAULT 0,     -- furthest step reached (resume point)
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT,                   -- written once, never cleared
  PRIMARY KEY (user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS lesson_answers (
  user_id INTEGER NOT NULL REFERENCES users(id),
  lesson_id TEXT NOT NULL,
  question_id INTEGER NOT NULL REFERENCES questions(id),
  user_answer INTEGER NOT NULL,        -- first answer only
  is_correct INTEGER NOT NULL,
  review_queued INTEGER NOT NULL DEFAULT 0,
  answered_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, lesson_id, question_id)
);

-- Retain existing content for audit; the application publishes it only after checking.

CREATE TABLE IF NOT EXISTS content_revisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_id INTEGER NOT NULL REFERENCES questions(id),
  lang TEXT NOT NULL,
  translated_text TEXT,
  explanation TEXT,
  theory_text TEXT,
  quality_status TEXT,
  content_version TEXT,
  content_source_key TEXT,
  checked_at TEXT,
  checked_by TEXT,
  reason TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_content_revisions_question ON content_revisions(question_id, id);

CREATE TABLE IF NOT EXISTS content_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_id INTEGER NOT NULL REFERENCES questions(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  kind TEXT NOT NULL CHECK (kind IN ('translation', 'explanation', 'answer', 'source')),
  note TEXT NOT NULL DEFAULT '',
  content_snapshot TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved', 'dismissed')),
  resolution_note TEXT,
  resolved_by INTEGER REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  resolved_at TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_content_reports_open ON content_reports(question_id, user_id, kind) WHERE status = 'open';
CREATE INDEX IF NOT EXISTS idx_content_reports_status ON content_reports(status, id);
