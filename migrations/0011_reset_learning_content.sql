-- 0011_reset_learning_content.sql
--
-- Translation explanations and theory answers generated before this migration
-- used dense, specialist-first prompts. Grammar vocabulary was explicitly capped
-- at 3–6 terms, which left the second half of longer sentences unexplained.
-- Clear only generated learning content so each tab regenerates lazily with the
-- beginner-first prompts and full-sentence vocabulary coverage checks.
-- The accurate translated_text remains cached and is not regenerated.

UPDATE translations_cache
SET explanation = NULL,
    theory_text = NULL,
    grammar_analysis = NULL,
    vocab_suggestions = NULL;
