-- Separate data migration: sessions older than the 20-minute exam window could
-- only still be unfinished because the client closed before calling /finish.
-- Mark them abandoned so historical rows cannot block study explanations.

UPDATE exam_sessions
SET abandoned_at = datetime('now')
WHERE finished_at IS NULL
  AND abandoned_at IS NULL
  AND started_at < datetime('now', '-30 minutes');
