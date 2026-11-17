CREATE TABLE IF NOT EXISTS access_grants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  kind TEXT NOT NULL CHECK (kind IN ('trial','paid','gift','set','unlimited','block','legacy')),
  days INTEGER,
  expires_at TEXT,
  amount_eur REAL,
  note TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_access_grants_user ON access_grants(user_id, created_at DESC);

-- Preserve existing access and prevent previously blocked users receiving a trial.
-- Pending users deliberately have no grant: their next contact starts the trial.
INSERT INTO access_grants (user_id, kind, expires_at)
SELECT id, CASE WHEN is_approved = 1 THEN 'legacy' ELSE 'block' END, access_expires_at
FROM users
WHERE is_approved IN (1, -1)
  AND NOT EXISTS (SELECT 1 FROM access_grants WHERE user_id = users.id);
