-- Invite links (features.md §53).
-- Each user's personal code, created the first time they open their invite card.
ALTER TABLE users ADD COLUMN referral_code TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_referral_code ON users(referral_code);

-- Who invited whom. One inviter per invitee (the first one wins); rewarded_at
-- is set once, on the invitee's first payment, so a reward is never given twice.
CREATE TABLE IF NOT EXISTS referrals (
  invitee_user_id INTEGER PRIMARY KEY REFERENCES users(id),
  referrer_user_id INTEGER NOT NULL REFERENCES users(id),
  created_at TEXT DEFAULT (datetime('now')),
  rewarded_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_user_id);
