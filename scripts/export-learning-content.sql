-- Read-only input for scripts/audit-learning-content.ts; no user data included.
SELECT q.id, q.source_id, q.text_it, q.correct_answer, q.image_url,
       t.translated_text, t.explanation
FROM questions q
LEFT JOIN translations_cache t ON t.question_id = q.id AND t.lang = 'fa'
ORDER BY q.id;
