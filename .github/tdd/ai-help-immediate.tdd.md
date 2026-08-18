# Immediate exam AI help — TDD evidence

## Source and user journey

No plan file was supplied. The journey came from the user's screenshot and request:

1. As a learner, I can open translation, theory, or grammar help on the current unanswered exam question, so I can use the exam as an open-book study session.

## RED → GREEN evidence

| Behavior | RED evidence | GREEN evidence |
|---|---|---|
| AI toggle is enabled before answering | Focused `npm test` run failed because the markup still had `disabled` and `public/js/exam.js` still called `canUseAiForCurrentQuestion()` | The same focused run passed after the answer-dependent client guard was removed |
| Translation and theory work before answering | Focused `npm test` run failed because both endpoints still called `hasUnansweredActiveExamQuestion()` and returned `answerRequired` | The same focused run passed after both server guards and the unused query helper were removed |

RED checkpoint: `aa7e8bc test: reproduce immediately available AI help`  
GREEN checkpoint: `fb355a3 fix: enable exam AI help before answering`

## Test specification

| # | Guarantee | Test/command | Type | Result |
|---|---|---|---|---|
| 1 | The AI checkbox renders enabled and explains that it is immediately usable | `tests/learning-experience.test.ts` | UI/static integration | PASS |
| 2 | The client does not reject an unanswered current question | `tests/learning-experience.test.ts` | Client regression | PASS |
| 3 | Translation and theory endpoints do not require an existing answer | `tests/learning-experience.test.ts` | API/static integration | PASS |
| 4 | The separate results tutor chat remains post-answer | `tests/learning-experience.test.ts` | API security/regression | PASS |
| 5 | With zero answers, clicking the enabled checkbox opens the panel and renders cached translation/verdict content | Local Wrangler + headless Chrome at 390×844 | Browser interaction | PASS |

## Regression, coverage, and known gaps

- `npm test` — PASS, 21/21 tests.
- `npm run typecheck` — PASS.
- `npm run test:coverage` — PASS: 96.57% lines, 82.58% branches, 90.63% functions overall; `src/app/screens/exam.ts` has 100% line/function coverage.
- `git diff --check` — PASS.
- Browser state evidence before click: zero answers, checkbox enabled and unchecked. After click: zero answers, checkbox checked, panel open, translation rendered, verdict visible.
- Visual regression is INCONCLUSIVE because the repository has no committed baseline for this exact state. The mobile screenshot was inspected for the requested interaction and showed no toggle/panel defect.
- The local browser had no Telegram `initData`, so unrelated authenticated background API requests returned 401 as expected. The focused test used cached AI content to keep browser QA read-only and avoid a real OpenAI call.
