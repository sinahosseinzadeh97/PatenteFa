-- Retain existing content for audit; the application publishes it only after checking.
ALTER TABLE translations_cache ADD COLUMN content_version TEXT;
ALTER TABLE translations_cache ADD COLUMN content_source_key TEXT;
ALTER TABLE translations_cache ADD COLUMN quality_status TEXT NOT NULL DEFAULT 'legacy';
ALTER TABLE translations_cache ADD COLUMN quality_issues TEXT;
ALTER TABLE translations_cache ADD COLUMN checked_at TEXT;
ALTER TABLE translations_cache ADD COLUMN checked_by TEXT;
ALTER TABLE translations_cache ADD COLUMN theory_checked_key TEXT;

CREATE TABLE content_revisions (
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
CREATE INDEX idx_content_revisions_question ON content_revisions(question_id, id);

CREATE TABLE content_reports (
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
CREATE UNIQUE INDEX idx_content_reports_open ON content_reports(question_id, user_id, kind) WHERE status = 'open';
CREATE INDEX idx_content_reports_status ON content_reports(status, id);

-- Correct the incomplete seed identity. This is a factual correction, not a claim
-- that every generated sign meaning has received human review.
UPDATE sign_meanings SET
  name_it = 'TRANSITO VIETATO AI VEICOLI CHE TRASPORTANO ESPLOSIVI O PRODOTTI FACILMENTE INFIAMMABILI',
  name_fa = 'حمل مواد منفجره یا به‌آسانی قابل‌اشتعال ممنوع',
  meaning_fa = 'عبور وسایل نقلیه حامل مواد منفجره یا مواد به‌آسانی قابل‌اشتعال ممنوع است. سوخت داخل مخزن خود خودرو مشمول این ممنوعیت نیست.'
WHERE image_url = '/images/signs/73.png';
