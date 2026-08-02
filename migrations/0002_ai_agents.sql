-- Migration: 0002_ai_agents
-- Created: 2026-07-26
-- Adds driving_explanation and grammar_explanation columns to translations_cache

ALTER TABLE translations_cache ADD COLUMN driving_explanation TEXT;
ALTER TABLE translations_cache ADD COLUMN grammar_explanation TEXT;
