-- 0008_reset_image_question_explanations.sql
--
-- §20.1 — Explanations and theory text for image questions were generated blind.
--
-- translateQuestion() attached the sign image to the translation call only; the
-- explanation call was text-only, and explainTheory() was text-only by design
-- ("we're reasoning about the rule, not the sign"). For the ~4k questions whose
-- entire content is a figure — "Il segnale raffigurato vieta il sorpasso", the
-- intersection diagrams asking which vehicle goes first — the model was reasoning
-- about a picture it had never seen.
--
-- It could not decline, either: the prompt demanded a "deciding word" and a
-- concrete numbered rule. Image questions usually have no deciding word (the
-- deciding factor is which sign is depicted), so the model picked an arbitrary
-- word and invented a justification. Sampled output was fabricated in every case,
-- e.g. q559 (an uneven-road warning triangle) explained as being about overtaking
-- rules, and diagram questions answered with a generic "the vehicle from the right
-- has priority".
--
-- Both calls now receive the image, and the prompts branch on its presence, so
-- clear the poisoned rows and let them regenerate lazily on next view.
-- Scoped to image questions: text-question explanations were never affected.
--
-- translated_text is NOT cleared — same reasoning as 0007. The translations are
-- linguistically fine and re-running ~4k of them costs money for no gain.
--
-- Regeneration cost: ~4k questions × (~500 prompt + 255 image + ~200 completion)
-- tokens at gpt-4o-mini rates ≈ $0.90 total, spread lazily across real views.

UPDATE translations_cache
SET explanation = NULL, theory_text = NULL
WHERE question_id IN (
  SELECT id FROM questions WHERE image_url IS NOT NULL AND image_url != ''
);
