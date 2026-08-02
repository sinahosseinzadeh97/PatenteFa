-- §15.2: three-tab AI panel cache columns
-- Each column is nullable and populated independently as the tab is first opened.
-- theory_text      — 🎓 مربی تئوری (full traffic-code rule explanation)
-- grammar_analysis — 📚 معلم گرامر (grammar breakdown)
-- vocab_suggestions — JSON array [{term_it, term_fa}] for quick-save buttons

ALTER TABLE translations_cache ADD COLUMN theory_text TEXT;
ALTER TABLE translations_cache ADD COLUMN grammar_analysis TEXT;
ALTER TABLE translations_cache ADD COLUMN vocab_suggestions TEXT; -- JSON [{term_it, term_fa}]
