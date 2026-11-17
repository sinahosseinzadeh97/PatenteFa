-- Owner-editable text shown in access reminders and on the expired screen.
CREATE TABLE IF NOT EXISTS app_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT DEFAULT (datetime('now'))
);

-- One row per reminder sent for one access window, so a cron re-run or an
-- overlapping window never sends the same reminder twice.
CREATE TABLE IF NOT EXISTS access_reminders (
  user_id INTEGER NOT NULL REFERENCES users(id),
  kind TEXT NOT NULL CHECK (kind IN ('ends_3d', 'ends_1d', 'expired')),
  expires_at TEXT NOT NULL,
  sent_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, kind, expires_at)
);
