-- Migration: 0010_support_messages
-- One support thread per user, shared by both surfaces: the Mini App support
-- screen and the Telegram bot relay write the same rows, so a conversation
-- started in one place continues in the other.
--
-- direction is written from the *user's* point of view:
--   'in'  = user → support   (unread until an admin opens the thread)
--   'out' = support → user   (unread until the user opens the thread)
-- One read_at column covers both, because a message is only ever unread for
-- the side that did not send it.
--
-- No admin identity is stored. Outbound messages are attributed to
-- "پشتیبانی PatenteFa" everywhere; that anonymity is the point of the feature.

CREATE TABLE IF NOT EXISTS support_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  direction TEXT NOT NULL,             -- 'in' | 'out'
  body TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'app',  -- 'app' | 'telegram' — where it entered/left
  read_at TEXT,                        -- when the *other* side read it
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_support_user ON support_messages(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_support_unread ON support_messages(direction, read_at);
