# PatenteFa — Part 3/4 — UX & Feature Specs

> Part 3 of 4 of the PatenteFa project rules (split to fit Antigravity's per-file rule size limit). Read alongside strategy.md, architecture.md, features.md, build-plan.md in `.agent/rules/` — together they are the full spec.

## 8. Telegram bot & Mini App UX

**Bot commands**
- `/start` — registers the user if their Telegram ID is on the allow-list; opens the Mini App.
- `/oggi` ("today") — quick shortcut to start a new 30-question simulation.
- `/review` — opens review mode for yesterday's mistakes.
- `/vocab` — opens the vocabulary list.
- `/stats` — quick text summary (streak, days to target date, weakest topic).

**Mini App screens**
1. **Home / dashboard** — days remaining to target exam date, current streak, weakest topic, "Start new simulation" button, "Review N mistakes" button if any are pending.
2. **Exam runner** — mirrors the reference screenshot: position/timer/progress bar up top, question (+ sign image if applicable) centered, "Ascolta" TTS button, VERO/FALSO buttons, bookmark/flag icon.
3. **Results** — score, pass/fail (≤3 wrong = pass, matching the real exam rule), list of all 30 with correct/incorrect marking, a **"ترجمه به فارسی" (Translate to Persian)** button per question that fetches/caches the translation + short explanation.
4. **Review mode** — same runner UI, sourced from `review_queue` instead of a fresh random draw.
5. **Vocabulary** — add a term (Italian + Persian, Persian can be pre-filled by GPT and edited), list due for review, simple flip-card review.
6. **Stats** — per-topic accuracy bar chart, trend over time.

**Visual language:** the reference screenshot is dark-themed; keep that. A nice, low-effort branding touch given this is explicitly an "Italian-Iranian" app: **green–white–red** is literally shared by both flags (vertical bands for Italy, horizontal for Iran), so it's a natural accent palette — green for VERO/correct, red for FALSO/incorrect, white/neutral for structure. Worth using deliberately rather than as a coincidence.

## 9. Core feature specs

### 9.1 Start a simulation
`POST /api/exam/start` — pulls 30 questions: distribute across topics roughly the way the real exam does (spread across the ~25 argument areas, not clustered in one), lightly weighted toward questions currently in the user's `review_queue` and toward this user's historically high `wrong_rate` topics, but keep it majority-random so it still resembles a real draw. Returns the session id + first question.

### 9.2 Answer / progress
`POST /api/exam/:sessionId/answer` — records the answer, returns whether it was correct (client decides whether to reveal immediately or only at the end — match the real exam and only reveal at the end, that's better practice).

### 9.3 Finish & translate
`POST /api/exam/:sessionId/finish` — scores it, marks pass/fail, pushes every wrong question into `review_queue` (increment `wrong_count`, set `next_review_at` to next morning).
`POST /api/translate/:questionId` — checks `translations_cache` first; on miss, calls OpenAI once, stores the result permanently. Since the bank is finite (~7,000 questions), this cost is bounded and mostly one-time — after the first few weeks nearly every translation the user needs will already be cached.

### 9.4 Morning review nudge
Cron job (~08:00 Europe/Rome) — for each user with a non-empty `review_queue`, send a Telegram message ("۵ سوال دیروز رو اشتباه زدی — بریم مرور کنیم؟") with an inline button that deep-links into the Mini App in review mode.

### 9.5 Vocabulary saver
`POST /api/vocab` — save an Italian term; server calls OpenAI for a suggested Persian translation the user can accept or edit. Simple interval bump on review (double the interval on a correct recall, reset on a miss — lightweight SRS, no need for a full algorithm at this scale).

### 9.6 Stats
`GET /api/stats` — per-topic accuracy (from `exam_answers` joined to `questions.topic_id`), current streak (consecutive days with ≥1 finished session), days remaining to `target_exam_date`.

### 9.7 Multi-user
Everything above is scoped by `user_id`. Access control is a static allow-list of Telegram user IDs (env var, §13) checked on `/start` and on every API call via the validated `initData`. No public registration.

## 10. OpenAI usage — keep it cheap and cached

- Translation + explanation: cached forever per `(question_id, lang)` — never re-request the same question.
- Vocabulary translation suggestions: cheap, one call per saved word, no caching needed (each is unique to the user's input).
- **Text-to-speech ("Ascolta"):** default to the browser's built-in **Web Speech API** (`speechSynthesis`, `it-IT` voice) — free, no API call, works fine inside the Telegram WebView on most platforms. Only fall back to OpenAI's TTS endpoint if a platform's WebView doesn't expose speech synthesis (worth testing on both iOS and Android Telegram clients early, since WebView speech support is the one part of this that's genuinely inconsistent).
- Model choice: don't hardcode a specific model name in code — check `platform.openai.com` for the current cheapest model suitable for short-form translation at build time, since offerings change.

## 11. Nice-to-have additions (optional, roughly in priority order)

- **Weak-topic focused practice** — a mode that pulls only from the 2-3 topics with the worst accuracy, separate from the full 30-question simulation. Every serious prep site has this; it's probably the single highest-value addition beyond what was asked for.
- **Road-sign flashcard mode** — segnaletica (signage) is the most image-heavy and most-missed category in the real exam per the sources reviewed; a dedicated "see sign → guess meaning" flip-card mode reusing `vocab`-style spaced repetition would target this directly.
- **Trick-question tagging** — after enough sessions, auto-flag questions this user gets wrong more than twice as "insidiose" (tricky) and surface them in their own review bucket.
- **Pace planner** — given `target_exam_date` and the size of the question bank, show "cover ~60 new questions/day to see the full bank once before your target date" style guidance on the dashboard.
- **Streaks & light gamification** — daily streak counter, maybe a tiny leaderboard across the ≤4 users (opt-in, since it's a shared small group).
- **Vocabulary export** — a "download as CSV" (Anki-importable) button for the saved word list.
- **Offline resilience** — cache the current session's questions client-side so a flaky connection mid-exam doesn't lose progress.

## 12. Round 2 — fixes & additions

### 12.1 Bug: signage text must stay Italian-primary
Same rule as the rest of this spec (strategy.md §4, design.md's bidi section): the official Italian text is what's actually tested and what the user needs to memorize. Every screen that shows sign content — the flashcard mode and anywhere else — must show the Italian name/caption as the primary text, with Farsi as a secondary line or an on-demand translation, never Farsi-only. Audit every screen with sign content for this, not just the newest one.

### 12.2 Long-press-to-vocab
While reading a question in the exam runner or review mode, long-pressing a word opens a small "add to vocab" affordance for that word, pre-filled with a GPT-suggested Persian translation (reuse the same suggestion call as `POST /api/vocab` in §9.5), editable before saving, with `source_question_id` automatically set to the current question — the column already exists in `vocab_items`, no schema change needed.

Implementation note: don't rely on native OS text-selection context menus, they're inconsistent across the iOS/Android Telegram WebViews. Wrap each word in its own tappable span and detect a long-press with pointerdown → ~500ms timeout, cancelled on pointermove/pointerup before the threshold fires. Keep v1 to single-word selection; multi-word phrase selection can come later if it turns out to be needed.

## 13. Round 3 — profile & analysis screen

### 13.1 Reference & why
The user shared a screenshot of another one of their own apps (an Italian-fluency trainer) as a structural reference: a profile header (avatar, name, tagline), a level/progress card (badge + XP-style bar), a row of 4 stat icons, and edit/share actions. Reuse this *structure*, not the navy/gold color scheme — apply it through design.md's asphalt/road/green-red-amber system so it stays visually consistent with the rest of the app. A route-marker shield shape (like Italian autostrada route signs) is a good fit for the level badge instead of a generic hexagon — it matches the road motif without introducing a new shape language.

### 13.2 What the numbers should actually mean
No new tables needed — everything below is computable from the existing `exam_answers` / `exam_sessions` / `vocab_items` (architecture.md §7):

- **Bank coverage**: `COUNT(DISTINCT question_id)` from this user's `exam_answers`, out of the total row count in `questions` (~7,300 after import). Show as "N از ۷,۳۰۰" plus a percentage.
- **Repetition**: for each `question_id`, `COUNT(*)` across this user's `exam_answers`. Anything ≥2 counts as "seen more than once"; surface the count of such questions, and let the analysis section (13.3) list the worst offenders.
- **Exams taken**: `COUNT(*)` on `exam_sessions` where `mode='exam'` and `finished_at IS NOT NULL`.
- **Streak**: consecutive days with ≥1 finished session (features.md §9.6 already defines this — reuse it, don't recompute it differently here).
- **Vocab learned**: `COUNT(*)` on `vocab_items` for this user.
- **Level/XP** (the gamified framing from the reference): compute, don't store — `XP = (correct_answers * 10) + (exams_finished * 50) + (streak_days * 5)`. Level thresholds can start simple (every 100 XP = 1 level) and be tuned later; the point is it reflects real study activity, not an arbitrary counter.

### 13.3 Analysis section (new — not in the reference screenshot)
Add a dedicated section below the stat row:
- **Coverage bar**: the bank-coverage percentage from 13.2, rendered along the road motif (ties back to design.md's signature element instead of introducing a second, different progress-bar style).
- **Needs more work**: a short list of questions with the highest wrong-rate for this user (group `exam_answers` by `question_id`, filter where the wrong count is 2 or more), each linking straight into a focused review session — the direct, actionable payoff of the analysis section, not just a chart to look at.
- **Per-topic accuracy**: bar chart across the ~25 topics, worst-first (extends the plain stats bar chart already spec'd in §9.6 with a richer presentation, same underlying query).
- **Trend**: a simple line/sparkline of score-per-exam over the last ~15 sessions, so the user can see whether they're actually improving over time.

### 13.4 Scope
Build this as its own screen reachable from the dashboard (a "پروفایل" entry point, matching the reference's pattern), not crammed into the existing dashboard card. Style with Tailwind v4 utility classes directly, following design.md throughout — this is exactly the kind of screen where the asphalt background, green/red/amber accents, and Barlow/Vazirmatn pairing should read as obviously part of the same app as the exam runner, not a bolted-on page.

## 14. Round 4 — translation reliability & flashcard mode fixes

Based on the investigation report (translate.ts, openai.ts, shell.tsx) from the previous session. Two real problems found, fix both.

### 14.1 Simplify the translation response schema
Drop `driving_explanation` and `grammar_explanation` from `translateQuestion()` in openai.ts — go back to the original scope: just `translated_text` and a short `explanation` of why the statement is true/false. This removes the token-pressure problem at its source instead of just raising the ceiling on a call asking for more than this feature actually needs. Reduce `max_tokens` accordingly (300-400 comfortably covers two short Persian fields; leave headroom, don't cut it exactly to the expected size).

Update the cache validity check in translate.ts (currently requires `driving_explanation && grammar_explanation` to be truthy before trusting a cached row) to instead check that `translated_text` is present and reasonably long — those two fields are going away so this check has to change regardless, and this also fixes the "a truncated translated_text can get cached forever" risk the investigation flagged.

Remove the now-unused `driving_explanation`/`grammar_explanation` rendering wherever the results screen shows the translation, so nothing breaks when those fields simply stop existing.

### 14.2 Fix image-blind translations
For any question with `image_url` set (roughly 56% of the bank per the investigation), the current call sends only the question text — the model is explaining a sign it can't see. Switch `translateQuestion()` to a vision-capable call for these questions, passing the actual sign image (already in R2) alongside the question text, so the translation and explanation are grounded in what's actually shown. Questions without an image keep the current text-only call. This is cached per-question exactly like today, so it's a one-time cost per question, not a per-request one.

### 14.3 Testing note (not a code change)
The client also keeps an in-memory translation cache for the current session (shell.tsx) — after deploying 14.1/14.2, a hard reload is needed to see corrected translations for any question already fetched once this session. Not a bug, just something to remember while testing.

### 14.4 Road-sign flashcard mode — visual language fix
No logic change needed — the flip, see answer, self-assess flow is already correct learning behavior. The problem is purely visual: the "می‌دونم / نمی‌دونم" buttons currently reuse the exam's `btn-vero`/`btn-falso` classes (same red/green, same checkmark/cross), which reads as a quiz. Give this screen its own button styling, visually distinct from the exam runner — per design.md's palette, the amber accent plus a neutral/muted tone reads as self-assessment rather than pass/fail, instead of reusing green/red. Also add a short line on the signs screen itself (not just the dashboard entry button) framing it as study mode, e.g. "تابلو رو ببین، بگردون، خودتو بسنج" placed near the header — the dashboard button text already hints at this, but a user who navigates here from the nav tab never sees the dashboard button, so the screen needs its own framing.

### 14.5 Implementation notes (recorded after building, for future reference)
- Vision calls for image questions use **gpt-4o-mini** with **`detail: "low"`** — sign icons don't need high-resolution detail, and this keeps cost minimal. No reason to upgrade the model for this specific call.
- Actual measured cost: ~$0.0002 per translate request for image questions (cheaper than the old 3-agent version's ~$0.0006-0.001). One-time cost to backfill translations for the full ~4,000 image-question set: ~$0.80-1.20 total, ever (cached per-question, shared across all users).
- Signs-mode buttons: `.btn-signs-known` (amber) / `.btn-signs-unknown` (muted slate), icons 🤔/💡 rather than ✗/✓ — deliberately avoids checkmark/cross imagery so it doesn't echo the exam.

## 15. Round 5 — three-tab AI panel, done reliably this time

### 15.1 Why this is a redo, not a revert
An earlier version of this app had a single request asking for translation + theory + grammar all in one JSON response, which is exactly what caused the truncated/incomplete-translation bug fixed in §14.1/14.2 (shared token budget across three agents in one call). This round rebuilds the same three-expert experience the business wants, but as three independent, lazily-triggered requests instead of one combined one — each gets its own generous token budget, and none of them can starve the others.

### 15.2 Schema
Add three nullable columns to `translations_cache` (same row per `question_id`+`lang`, populated independently as each tab is opened for the first time):

```sql
ALTER TABLE translations_cache ADD COLUMN theory_text TEXT;
ALTER TABLE translations_cache ADD COLUMN grammar_analysis TEXT;
ALTER TABLE translations_cache ADD COLUMN vocab_suggestions TEXT; -- JSON array of {term_it, term_fa}
```

### 15.3 Three tabs, three endpoints
1. **ترجمه (Translation)** — existing `POST /api/translate/:questionId` from §14.1, unchanged, loads immediately when the translate panel opens.
2. **توضیح کامل تئوری (Full theory)** — new `POST /api/translate/:questionId/theory`, own ~600-800 max_tokens, lazy — only called when this tab is tapped, checks `theory_text` cache first. Persona: an exam-prep instructor explaining the traffic-code rule behind the question in full, including why it's a common mistake and what to watch for. Give this agent a name + small avatar in the UI (e.g. "🎓 مربی تئوری") — this is worth doing well since it's a feature meant to impress prospective users/buyers, not just a plain text block.
3. **گرامر و لغات (Grammar & vocab)** — new `POST /api/translate/:questionId/grammar`, own ~600-800 max_tokens, lazy, checks `grammar_analysis`/`vocab_suggestions` cache first. Persona: a Persian-speaking Italian grammar teacher, same naming/avatar treatment (e.g. "📚 معلم گرامر"). Returns a short grammar breakdown of the sentence plus a list of key vocabulary words extracted from the question (Italian term + Persian translation). Each extracted word renders as a row with a "+" button that calls the existing `POST /api/vocab` endpoint (§9.5/§12.2) to save it — reuse that flow exactly, don't build a second vocab-add mechanism.

### 15.4 Scope note
Image-based questions: tabs 2 and 3 don't need the vision call from §14.2 (they're reasoning about the text/grammar, not describing the sign) — text-only is fine for these two endpoints even when the question has an image.

## 16. Round 6 — audit-driven hardening (no payment build; manual/cash + existing approval flow is the gate)

### 16.1 Why
Payment integration is deferred — the existing approval flow (request access → pending → admin approves via bot or admin panel) plus manual/cash collection outside the app IS the monetization gate for now. This makes that approval check the single point of failure for the whole business model, so its fail-open behavior needs to become fail-closed.

### 16.2 Fix: fail-closed on missing ALLOWED_TELEGRAM_USER_IDS
Currently, if `ALLOWED_TELEGRAM_USER_IDS` is empty/undefined/`"*"`, `checkAllowList()` allows everyone through, including admin routes. Since manual approval is now the entire gate keeping this a paid product instead of a free one, this must fail closed: if the env var is missing or empty, deny access on admin routes rather than open up, and log a loud warning so a misconfiguration is never silent.

### 16.3 Fix: morning reminder should skip non-approved/rejected users
`morningReminder.ts` iterates all users regardless of `is_approved`. Add the same approval check used elsewhere so pending/rejected users don't get review nudges for an app they don't (or no longer) have access to.

### 16.4 Finish the nightly backup (currently a no-op)
`nightlyJournalAndBackup.ts` logs a skip message and does nothing — `dumpTable` exists but is never called. Wire it up per architecture.md §6: dump the core tables to JSON, post as a document to `LOG_CHANNEL_ID`. This is a private channel only the operator sees, so there's no per-user privacy concern — it's a second copy of data the operator already has full access to via D1.

### 16.5 Investigate sign-image hosting
The `SIGNS` R2 bucket is declared in code but never bound in wrangler.jsonc or used. Find out where `questions.image_url` values actually point right now (likely an external URL from the original dataset import) and report back — if it's a third-party host, that's a reliability risk worth knowing about for a product people are paying for, even if we don't fix it in this round.

### 16.6 Small safe cleanups now that we have full visibility
- Drop the dead `driving_explanation`/`grammar_explanation` columns from `translations_cache` (migration + remove from the `DbTranslation` interface in queries.ts) — confirmed unused since §14.1.
- `DEFAULT_TIMEZONE` is declared but never read; leave the hardcoded `Europe/Rome` default as-is for now, just note it's intentionally unused rather than a bug.
- Add `design.md` to the file list referenced at the top of AGENTS.md — it's currently a real, load-bearing spec file that isn't mentioned there.

### 16.7 Migrate sign images to R2 (decision: yes, now)
Per §16.5's findings, all ~3,983 sign images are hotlinked from `raw.githubusercontent.com/Ed0ardo/QuizPatenteB` — this affects both the exam UI (56% of the question bank) and the vision-based translate calls (§14.2), not just the flashcard screen. GitHub doesn't guarantee raw-content hotlinking stays available at scale, and the fix is cheap, so do it now rather than wait for it to break under paying users.

Steps:
1. Add the `SIGNS` R2 bucket binding to wrangler.jsonc (the interface already expects it in types.ts).
2. One-off migration script: for every question with an `image_url` on `raw.githubusercontent.com`, download it once and upload to R2 under a stable key (e.g. `signs/<source_id>.png`).
3. Add a Worker route (e.g. `GET /images/signs/:key`) that serves from the R2 binding with sensible cache headers — this becomes the canonical way to serve these images, not a public R2 bucket URL.
4. Update every `questions.image_url` row to point at this new route.
5. Confirm the vision-based translate call (§14.2) still works unchanged after migrating — it just takes whatever URL is in `image_url`, so this should be a drop-in swap, but verify with a couple of real translate requests on migrated questions.

## 17. Round 7 — translation prompt rewrite for natural Persian

### 17.1 User feedback & root cause

Users reported that Persian translations read like "word-by-word Google Translate output" rather than natural Persian. Investigation of the live system (conversation `53af6b9b`) confirmed the root cause: the `translateQuestion()` system prompt was a single-line instruction with no stylistic guidance, no few-shot examples, and no framing for how Persian automotive-domain sentences should actually read. The correct answer is still passed in explicitly so the model has no room to misstate the fact — the prompt change only affects how the sentence is *phrased*, not *what* it says.

### 17.2 Updated system prompt

Replace the current two-line system prompt in `translateQuestion()` (openai.ts) with the expanded prompt below. The user-prompt (question text + correct answer + JSON schema request) stays unchanged.

```
شما مترجم تخصصی آزمون تئوری رانندگی (Patente B) ایتالیا هستید که برای فارسی‌زبانان ایرانی مقیم ایتالیا ترجمه می‌کنید.

هدف: ترجمه فارسی باید دقیقاً مثل جمله‌ای باشد که یک راننده ایرانی باتجربه می‌نویسد — روان، طبیعی، و بدون ساختار ترجمه‌وار.

قوانین سبک:
• از کلمه‌به‌کلمه پرهیز کنید — معنا را منتقل کنید، نه ساختار دستوری ایتالیایی را
• از واژگان فارسی رایج در حوزه رانندگی استفاده کنید (مثال: «راه‌بند» نه «مانع»، «چراغ راهنما» نه «سیگنال»)
• افعال منفی را طبیعی بنویسید: «نباید» نه «نمی‌بایست»، «مجاز نیست» نه «اجازه داده نمی‌شود»
• جمله‌های شرطی را با «اگر … باید/می‌توان» بنویسید، نه با ترجمه تحت‌اللفظی «qualora/salvo che»
• اعداد و واحدها را به فارسی بنویسید: «۵۰ کیلومتر بر ساعت» نه «50 km/h»
• اگر تصویر تابلو یا علامت راهنمایی ضمیمه شده، محتوای آن را در ترجمه لحاظ کنید

نمونه (برای کالیبراسیون — این‌ها را کپی نکنید، فقط سبک را بگیرید):
• ایتالیایی: «È vietato sorpassare quando non si ha la visibilità necessaria.»
  فارسی خوب: «وقتی دید کافی ندارید، سبقت گرفتن ممنوع است.»
  فارسی بد: «سبقت گرفتن در زمانی که دید لازم وجود ندارد ممنوع است.»

• ایتالیایی: «Il conducente deve arrestare il veicolo prima della striscia d'arresto.»
  فارسی خوب: «راننده باید قبل از خط توقف، ماشین را متوقف کند.»
  فارسی بد: «راننده ملزم است وسیله نقلیه را قبل از خط توقف متوقف نماید.»
```

### 17.3 Temperature

Bump from `0.2` to `0.4`. This is a minor secondary lever — the examples above are the real fix — but a little more freedom helps natural phrasing without risking factual drift, since the underlying fact (`correct_answer`) is still passed in explicitly and isn't something the model is free to reinterpret.

### 17.4 Invalidate existing cached translations

Every already-cached translation was generated under the old bare prompt, so fixing the prompt alone won't fix what users already see for previously-viewed questions. Run:

```sql
UPDATE translations_cache SET translated_text = '', explanation = '' WHERE lang = 'fa';
```

This leaves `theory_text`/`grammar_analysis`/`vocab_suggestions` (§15) untouched — they're a different prompt and don't need to change. It also doesn't need a schema change: the existing cache-validity check already treats `translated_text.length > 10` as invalid, so this forces clean regeneration under the new prompt on next request, without deleting rows or breaking foreign keys.

### 17.5 Follow-up fixes found during verification (applied in same session)

Post-deploy verification against the 5 benchmark questions (conversation `c923a7cc`) revealed two correctness bugs not addressed by §17.2–17.4:

**Bug A — Polarity drift (Q3):** The model was flipping the negation in `translated_text` to state the *correct* answer instead of faithfully translating the *literal Italian claim*. Root cause: `correct_answer` is passed in the user-prompt, and without an explicit rule the model tries to be "helpful" by correcting the false claim in the translation itself. This contaminates `translated_text` — which should be a neutral translation of what the question actually says — with the answer.

Fix added to system prompt:
```
قانون مهم — حفظ قطبیت جمله:
ادعای اصلی جمله ایتالیایی را عیناً ترجمه کنید، حتی اگر آن ادعا نادرست باشد.
هرگز ادعا را برای مطابقت با پاسخ صحیح تغییر ندهید — این کار فقط وظیفه‌ی فیلد explanation است، نه translated_text.
```

**Bug B — È+adjective rendered as interrogative (Q5):** `E' regolamentare…` and similar `È + adjective` openers were being translated as questions («آیا … ؟») rather than declarative statements. These are always statements about a legal rule or fact, never questions.

Fix added to system prompt (general form covering all adjectives, not just 4 specific words):
```
قانون مهم — جمله‌های «È + صفت»:
جمله‌هایی که با «È» یا «E'» + صفت شروع می‌شوند (مثل vietato، obbligatorio، consentito،
necessario، possibile، corretto، regolamentare و مشابه آنها) همیشه جمله‌ی خبری درباره یک
قانون یا واقعیت هستند، نه سؤال. همیشه به‌صورت خبری ترجمه کنید، هرگز با «آیا … ؟» شروع نکنید.
```

**Verification:** 21 questions tested (Q3 polarity retest + 20 fresh `E'`-prefix questions drawn randomly from D1). Result: **21/21 ✅** — no `آیا`/`؟` bugs, Q3 polarity correctly preserved. Cache re-invalidated (309 rows) and re-deployed (`d94f9448`).



## 18. Round 8 — professional admin panel redesign

### 18.1 Why
The admin screen is functionally wired (search/filter/approve/revoke/activity modal all work) but a lot of already-computed, already-fetched data is silently discarded — most notably `last_active_at`, which directly answers the operator's top priority: how present each user is. There's also no view of where API cost actually concentrates, only the aggregate total, which matters since minimizing API spend is an explicit goal here.

### 18.2 Confirm attendance calculation first
Before touching layout: report exactly how the current "زمان حضور" figure is calculated per user and in the KPI bar — which query, which fields, what unit. If it isn't derived from `user_events.duration_seconds` / `exam_sessions.duration_seconds`, check whether those fields would produce a more accurate figure and switch to them if so. This blocks 18.3-18.7 — get this right first since it's the number the operator explicitly cares about most.

### 18.3 Surface what's already computed but hidden (free wins, no new queries)
- `last_active_at` on every user card, formatted as relative time ("۲ ساعت پیش", "دیروز").
- `pendingUsers` and `totalEventsLogged` in the KPI bar — both already returned by the overview endpoint, currently unused.
- In the activity modal: `sessions.wrong_count` / `finished_at`, `apiLogs.model` / `created_at`, `events.duration_seconds` — all already fetched, none rendered.

### 18.4 Cost-minimization view (new)
Add a breakdown of API cost by `action` (translate_question, theory_explain, grammar_analyze, tutor_chat, suggest_vocab) using the already-tracked `api_usage_logs.action` field, for today and this week — this answers "where is the spend going," not just the total. Per-user, add a simple ratio: API calls ÷ finished exams, so a user burning API without progressing is visible at a glance — this is the actionable signal for reducing waste.

### 18.5 Round out per-user visibility
Add vocab_items count and review_queue depth per user — existing tables, zero current admin exposure, no schema change needed.

### 18.6 Make search/filter server-side
The client currently filters an in-memory snapshot even though a server `LIKE` endpoint already exists and is unused. Wire the search bar to call it for real — matters more as the user base grows.

### 18.7 Visual pass
Restructure from one long flat stack into clear sections (KPI summary → cost breakdown → user list → live event stream), per design.md's palette/typography. This is an operator tool, not a public screen, so it can be more data-dense/utilitarian than the exam UI, but should still feel like the same product.

## 19. Round 9 — theory repetitiveness, verdict-before-explanation, grammar infinitives

### 19.1 Theory tab: reduce repetitive boilerplate
User feedback: theory tab (explainTheory()) responses overuse a fixed opening reference to "Codice della Strada" / "قوانین راهنمایی و رانندگی" across many questions, making it feel templated. Show the current explainTheory() system prompt verbatim first, then add a rule: don't open every response with a fixed boilerplate reference to the legal code; vary the opening and get to the substantive point directly; only name the code specifically when citing something concrete (a specific rule/article), not as a reflexive habit.

### 19.2 Translate tab: show the verdict before the explanation — no AI/prompt change needed
User feedback: the translate panel should clearly show VERO/FALSO before the explanation text, not launch straight into explaining. We already know the correct answer from questions.correct_answer in our own DB — this needs zero model/prompt changes, it's a pure display-order fix:
- Confirm POST /api/translate/:questionId's response includes the question's correct_answer (VERO/FALSO) alongside translated_text/explanation — add it if it's missing.
- In shell.tsx's translate panel render, show a clear verdict badge ("پاسخ: VERO" / "پاسخ: FALSO", styled per design.md green/red) ABOVE translated_text and explanation, not after.
- User override (2026-08-18): the three-tab AI panel is intentionally available immediately on a live, unanswered exam question. Translation, theory, grammar, and the VERO/FALSO verdict may be used as an open-book study aid before answering; do not restore a client or server answer gate.

### 19.3 Grammar tab: show infinitive alongside conjugated verbs
User feedback: when the grammar tab (analyzeGrammar()) lists a verb form from the sentence, it should also show the verb's infinitive (مصدر) next to it. Show the current analyzeGrammar() system prompt verbatim first, then add an explicit instruction: for every verb listed in vocab_suggestions or referenced in grammar_analysis, include its infinitive form alongside the conjugated form found in the sentence — e.g. "avviene (مصدر: avvenire)".
