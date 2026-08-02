-- §16.6: Drop dead driving_explanation and grammar_explanation columns from translations_cache
ALTER TABLE translations_cache DROP COLUMN driving_explanation;
ALTER TABLE translations_cache DROP COLUMN grammar_explanation;
