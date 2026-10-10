-- Admin access windows and telemetry-query indexes.
-- NULL access_expires_at means unlimited access for existing approved users.

ALTER TABLE users ADD COLUMN access_expires_at TEXT;

CREATE INDEX IF NOT EXISTS idx_users_access
  ON users(is_approved, access_expires_at);

CREATE INDEX IF NOT EXISTS idx_user_events_user_type_created
  ON user_events(user_id, event_type, created_at DESC);
