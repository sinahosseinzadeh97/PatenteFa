-- 0009_sign_meanings.sql
--
-- §20.3 — تابلوها teaches meanings, so it needs a meaning to teach.
--
-- 0008 rebuilt the deck from the exam statements the bank marks VERO. Those are
-- true, but they are exam trivia, not a definition: the tow-away sign's card
-- listed three facts about municipal impound lots and wheel clamps and never
-- said "parking is prohibited". A learner cannot read the meaning off that.
--
-- One row per distinct sign image:
--   name_it    official Italian name (e.g. "ZONA RIMOZIONE")
--   name_fa    the Persian name
--   meaning_fa one or two sentences: what the sign actually tells a driver
--
-- Seeded by scripts/generate-sign-meanings.ts, which anchors generation to the
-- sign identity already present in the source dataset (data/quizPatenteB2023.json
-- groups every question under a per-sign subtopic slug — zona-rimozione,
-- strada-dissestata, obbligo-catene) plus the image and the VERO statements. The
-- model normalises and translates a known sign; it does not get to decide which
-- sign it is looking at.
CREATE TABLE IF NOT EXISTS sign_meanings (
  image_url  TEXT PRIMARY KEY,
  slug       TEXT NOT NULL,          -- per-sign key from the source dataset
  name_it    TEXT NOT NULL,
  name_fa    TEXT NOT NULL,
  meaning_fa TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);
