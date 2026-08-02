# PatenteFa — Part 2/4 — Architecture & Data Model

> Part 2 of 4 of the PatenteFa project rules (split to fit Antigravity's per-file rule size limit). Read alongside strategy.md, architecture.md, features.md, build-plan.md in `.agent/rules/` — together they are the full spec.

## 5. Architecture overview

```
Telegram client
   │
   ├── Bot chat  ───────────────► Cloudflare Worker (Hono)
   │                                  ├── /webhook/telegram   (bot updates)
   │                                  ├── /api/*              (Mini App REST API)
   │                                  └── /app/*               (Mini App static/SSR shell)
   └── Mini App (WebView) ───────► same Worker, loaded via Telegram.WebApp

Cloudflare bindings:
   D1        → primary relational store (questions, sessions, answers, vocab, users)
   R2        → road-sign images, nightly JSON backups
   KV        → short-lived cache (initData validation nonces, rate limiting)
   Cron Trigger → daily morning-review push, nightly backup/journal job
```

Single Worker, single deploy target, no separate hosting needed — fits the "everything lives on Cloudflare + Telegram" goal well.

## 6. On "the database should live in Telegram (a channel)"

Worth being direct about this one instead of quietly overriding it.

**Why not literally use a Telegram channel as the database:** channels/chats are a messaging surface, not a query engine. Concretely: Telegram rate-limits how fast a bot can post to the same chat (on the order of ~1 message/second, tighter in bursts), there's no `WHERE`/index/join, no atomic updates beyond editing a single message's text, and reconstructing "state" means re-reading and re-parsing message history. For 30-question sessions happening daily plus translation caching plus vocab review, this turns into a lot of fragile plumbing for something SQLite (via D1) does natively, for free, in this exact hosting setup.

**What this spec does instead, to keep the spirit of the request:**
- **D1** is the real database (fast, free at this scale — see §13).
- A **private Telegram channel** (the user creates it, bot is added as admin) is used as:
  1. A **human-readable activity journal** — after each finished exam, the bot posts a short summary ("Exam #23 — 27/30, 3 wrong, topic: Segnaletica" etc., in Persian).
  2. An **automatic nightly backup** — a scheduled job dumps the D1 tables to JSON and posts them to the channel as a document. If D1 is ever lost or the user wants to inspect/export their data, it's sitting right there in Telegram, exactly like they wanted.

This gets the "it's all inside Telegram, I can see my history, nothing depends on a service I don't control" outcome without the reliability problems of using chat messages as live storage. If the human still wants literal channel-as-DB after reading this, that's a viable but meaningfully more fragile alternative — flag it back to whoever's building this and it can be swapped in for the journal/backup role only, not recommended for live reads/writes.

## 7. Data model (Cloudflare D1 / SQLite)

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  telegram_user_id INTEGER UNIQUE NOT NULL,
  first_name TEXT,
  username TEXT,
  target_exam_date TEXT,               -- ISO date, optional
  daily_reminder_hour INTEGER DEFAULT 8,
  timezone TEXT DEFAULT 'Europe/Rome',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE topics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_it TEXT NOT NULL,
  name_fa TEXT,
  sort_order INTEGER
);

CREATE TABLE questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_id TEXT UNIQUE,                -- id from the imported dataset, for traceability
  topic_id INTEGER REFERENCES topics(id),
  text_it TEXT NOT NULL,
  correct_answer INTEGER NOT NULL,      -- 1 = VERO, 0 = FALSO
  image_url TEXT,                       -- R2 URL, nullable
  wrong_rate REAL DEFAULT 0,            -- rolling stat, recomputed from exam_answers
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE translations_cache (
  question_id INTEGER REFERENCES questions(id),
  lang TEXT NOT NULL,                   -- 'fa'
  translated_text TEXT NOT NULL,
  explanation TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (question_id, lang)
);

CREATE TABLE exam_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  mode TEXT DEFAULT 'exam',             -- 'exam' | 'topic_practice' | 'review'
  started_at TEXT DEFAULT (datetime('now')),
  finished_at TEXT,
  duration_seconds INTEGER,
  score INTEGER,
  passed INTEGER                        -- 1/0, computed as wrong_count <= 3 for mode='exam'
);

CREATE TABLE exam_answers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER REFERENCES exam_sessions(id),
  question_id INTEGER REFERENCES questions(id),
  position INTEGER,                     -- 1..30
  user_answer INTEGER,                  -- 1/0, NULL if skipped
  is_correct INTEGER,
  flagged INTEGER DEFAULT 0,
  answered_at TEXT
);

CREATE TABLE review_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  question_id INTEGER REFERENCES questions(id),
  wrong_count INTEGER DEFAULT 1,
  last_wrong_at TEXT DEFAULT (datetime('now')),
  next_review_at TEXT,
  cleared INTEGER DEFAULT 0
);

CREATE TABLE vocab_items (
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
```
