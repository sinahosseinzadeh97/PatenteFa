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
- Superseded for `mode = 'exam'` (2026-10-11, §25): in exam mode the panel is behind an opt-in AI switch that starts off. The override above still holds for review and topic practice (including lesson-related practice and chapter exams).

### 19.3 Grammar tab: show infinitive alongside conjugated verbs
User feedback: when the grammar tab (analyzeGrammar()) lists a verb form from the sentence, it should also show the verb's infinitive (مصدر) next to it. Show the current analyzeGrammar() system prompt verbatim first, then add an explicit instruction: for every verb listed in vocab_suggestions or referenced in grammar_analysis, include its infinitive form alongside the conjugated form found in the sentence — e.g. "avviene (مصدر: avvenire)".

## 21. Round 11 — structured learning path (pilot chapter: Segnali di precedenza)

### 21.1 What exists
A guided loop — Learn → Practise → Understand mistakes → Review later → See progress — built on the existing features, not beside them:
- **Lessons** live under the existing فصل‌ها (topics) screen, in a «یادگیری گام‌به‌گام» section above topic practice; home shows a «مسیر امروز» card. No new bottom-nav tab.
- **Pilot chapter** (3 lessons, 4–5 min each): (1) DARE PRECEDENZA vs STOP + preavvisi, signs 40–43; (2) DIRITTO DI PRECEDENZA, its end, and junction warnings, signs 52/46/47/44; (3) SENSO UNICO ALTERNATO, signs 45/53. Organised around DPR 495/1992 art. 105 (signs where *you* give way vs signs where *others* give way to you).
- Each lesson: objective → instructional visual (side-by-side comparison, warning-sign road strip, or top-down SVG diagram) → Italian terms (TTS + existing vocab saver) → a wording trap built from two real bank statements (one VERO, one FALSO, same tempting word) → 4 real bank questions with curated feedback → completion.

### 21.2 Rules future changes must keep
- **Content is curated code** in `src/content/lessons.ts`; it is never regenerated per visit. AI (existing cached theory endpoint) is an optional extra inside feedback, labelled as AI-written.
- **Questions are referenced by `source_id` with a text + answer snapshot.** The API drops any practice question whose live row drifted (and logs it). Never edit a snapshot to match a changed bank row without re-verifying against the law. Run `npm run verify:lessons` (and `-- --remote` before deploy).
- **Faithful translation ≠ verdict.** `translation` keeps the claim's polarity even when false; correctness lives in `why`. No keyword-guessing rules: every trap step pairs a true and a false statement that share the word.
- **Question → lesson routing is explicit** (`related` lists, hand-pruned, one lesson per question). No topic-level fallback. (The pilot left taxonomy, traffic-light and motorway-placement questions unmapped; since chapter 5 was completed on 2026-11-12, see §30, every chapter-5 question is mapped.)
- **Completion ≠ mastery.** Checkpoints show not started / in progress / completed / due for review; completed is neutral ink, never green. Practice score is shown separately as "first-attempt" results.
- **Persistence:** `lesson_progress` (furthest step, monotonic; `completed_at` written once) and `lesson_answers` (first answer wins; a wrong answer is queued in `review_queue` exactly once, in one D1 batch). The client never shows a save the server did not confirm.
- Related practice (10 real questions, due review first) runs in the normal exam runner as `topic_practice`. Home pass rate now counts `mode = 'exam'` sessions only.

### 21.3 AI help during unanswered exam questions
The §19.2 user override stands for practice and review modes: an uncommitted change (2026-08-31/09-01) had re-added a verdict/theory gate; it was removed again in this round. Tutor chat remains post-answer. Exam mode: see §25.

### 21.4 Sources (reviewed 2026-09-26)
Codice della Strada artt. 140, 145; DPR 495/1992 artt. 81 c.7, 105–114 (Normattiva). Recorded in `PILOT_CHAPTER.sources` and shown to learners on each completion screen, with the 2023-bank caveat.

## 22. Round 12 — chapter 2: Precedenza negli incroci (right of way at intersections)

### 22.1 What exists
- Chapter `precedenza-incroci` in `src/content/lessons-incroci.ts`, registered after the pilot in `CHAPTERS` (`src/content/lessons.ts`). Four lessons, 4–5 min each: (1) reading a figure — letters, arrows, "your right", signs (figs 640, 633); (2) no signs: give way to the right, vehicles on rails, no privilege for bus/filobus/eccezionale (figs 614, 613); (3) turning and moving together (figs 643, 637); (4) DARE PRECEDENZA / STOP at a junction (figs 633, 655). The proposed order was changed: turning comes before signs because every sign figure in the bank also needs the left-turn rule.
- "Who goes first?" (`order` step) and guided reading (`scenario` step) render **original SVG redrawings** of bank figures (`src/content/crossings.ts`, `public/js/crossing.js`), labelled as educational exercises. Tap-to-order with undo/reset; the verdict comes from `POST /api/learn/lessons/:id/order` (pure `checkPassageOrder`, stateless, not stored); then a step-by-step explanation with highlighted vehicles/signs, playback, replay and manual stepping. Reduced motion: no animation or autoplay, static steps, full text list.
- Mistakes route back to the right lesson section through explicit `related` lists (202 questions), as in the pilot. No migration: progress is keyed by lesson id.

### 22.2 Rules future changes must keep
- **The order is the bank's, proven in tests.** Each scenario's `phases` must follow from its VERO `evidence` statements alone, and contradict every FALSO one (`tests/crossings.test.ts`). `move` must match the arm angles. Evidence snapshots are checked by `npm run verify:lessons`.
- **Never annotate or animate the bank's raster figures.** They carry a third-party mark (patentati.it) and their licence is not established by the dataset's MIT notice. Show them only as the app already does (question image, "compare with the original"); redraw anything we highlight or move.
- **Only verified figures.** Circular "everyone has someone on the right" figures (617, 638, 642), complex five-arm figures (634, 651, 652, 654, 657–668) and roundabouts are deliberately unmapped and unused.
- **No client copy of the order rule.** `public/js/crossing.js` renders the server verdict; it only uses `phases` to animate the explanation.
- Left turns are drawn passing with the junction centre on the driver's right (art. 154 c.3 lett. b).

### 22.3 Sources (reviewed 2026-10-08)
Codice della Strada (testo vigente, agg. 24/04/2026) artt. 145 c.1–4, 154 c.1 lett. a and c.3 lett. a–b, 177 c.3; DPR 495/1992 artt. 106–107. Bank statements cited by id in the content (practice, traps, scenario evidence). No conflict found between these articles and the 2023 bank answers for the figures used; the 2023-bank caveat still applies.

## 23. Round 13 — chapter 3: Velocità, distanza di sicurezza e arresto (speed, safety distance, stopping)

### 23.1 What exists
- Chapter `velocita-distanza-arresto` in `src/content/lessons-velocita.ts`, third in `CHAPTERS`; `topicIds: [10, 11]` (Velocità, Distanza di sicurezza) so both topic cards offer its lessons. Four lessons: (1) choosing an adequate speed (art. 141), (2) reaction distance, (3) braking and total stopping distance, (4) following distance (art. 149).
- Two new step kinds. **`stopping`**, the stopping-distance explorer (`public/js/stopping.js`), has three scenes: `sight` (a blind bend, 40 m visible), `hazard` (reaction / braking / total) and `following` (two cars braking alike). Predict first, then a comparison on one scale with a short explanation; speed, reaction time and surface unlock after the predictions. It offers reset, real-time replay and four manual steps; with reduced motion there is no playback and the same states are shown statically. Controls are buttons and native radios (tap and keyboard). **`factors`**: what the bank says matters (VERO) beside what it says does not (FALSO), each item backed by one bank statement.
- `Chapter.topicId` became `topicIds`. "Next lesson" (`nextLessonAfter` in `src/api/learn.ts`) now skips lessons the learner already completed, so a lesson opened directly is never offered again.

### 23.2 Rules future changes must keep
- **One model, tested, server-side.** `src/lib/stopping.ts` is the only place distances are computed: v = km/h ÷ 3.6; reaction = v·t; braking = v²/(2·μ·g) with μ = 0.7 on dry asphalt. The API ships `stoppingTable()` with explorer lessons; the client looks values up and never recomputes (test: no 3.6 / 9.81 / 0.7 in `stopping.js`).
- **No invented coefficients.** Wet and snow/ice return `brakingM: null`: braking is only "longer than dry" (the bank's claim), drawn as a dotted "؟" zone with "بیش از …" and no playback. Add a number only with a source that settles it.
- **Every prediction is checked against the model.** Option `claims` (factor, longer, fits) must make exactly one option true, and it must be `answer` (`tests/stopping.test.ts`). Explanations stay qualitative except the bank's own numbers (14 m at 50 km/h, 28 m at 100 km/h).
- **Drawn to scale, verified.** Every bar's width is metres × one px/m per drawing; the vm test checks all 132 settings and every comparison. The car and sign icons are symbols, not to scale (stated on screen).
- **Following ≠ stopping.** The minimum gap is the reaction distance when both cars brake alike (bank 4258–4262, 4335); if the car ahead stops abruptly you need your whole stopping distance; the law gives no number except 100 m (some vehicle categories, art. 149 c.2) and 20 m (snowplows, c.3). The following scene has no surface control: in the equal-braking model grip cancels out, which would wrongly suggest rain does not matter.
- **Estimates, not law.** Every view says "تخمین"; nothing is shown as a legal distance, an exact prediction or a safety guarantee.
- Scope left out on purpose (unmapped): numeric speed limits (art. 142), level crossings, servo brakes on descents, liability after crashes.

### 23.3 Sources (reviewed 2026-10-10)
Codice della Strada artt. 141, 149 (Normattiva, agg. 24/04/2026; ACI pages updated 09/10/2026); Polizia di Stato, «Comportamenti da tenere quando si guida» (reaction time, safety distance); Comune di Genova, «Determinazione dello spazio di arresto» (1 s reaction, adherence 0.65–0.72); Comune di Firenze 2023 infographic from WHO 2008 (2.5 s, 90th-percentile driver); WHO/OECD 2006 stopping distances (27/36/58 m at 50/60/80 km/h, matched within 1 m); circolare MIT 6935/2017 (exam topics: reaction times, safety distance, braking, road holding). Bank statements cited by id in the content; the 2023-bank caveat still applies.

## 24. Round 14 — chapter 4: Sorpasso e segnaletica orizzontale (overtaking and road markings)

### 24.1 What exists
- Chapter `sorpasso-segnaletica` in `src/content/lessons-sorpasso.ts`, fourth in `CHAPTERS`; `topicIds: [12, 5]` (Sorpasso, Segnaletica orizzontale). Four lessons: (1) reading the centre line from your own lane (art. 40), (2) the DIVIETO DI SORPASSO sign and its end together with the markings (DPR 495 artt. 104, 116, 119), (3) the four art. 148 c.2 checks and the places where overtaking is forbidden (c.10–13), (4) the manoeuvre stage by stage and the duties of the driver being overtaken (c.3–5, art. 154).
- Three step kinds, drawn by `public/js/overtaking.js`: **`markings`** (four centre lines; a lane switch shows the mixed line meaning the opposite from the other side), **`assess`** ("Assess the situation"), **`manoeuvre`** (five stages with playback, replay and manual steps; static under reduced motion, full text list).
- **Assess the situation** (`src/content/overtaking.ts`): four original scenes, each with a comparison scene that changes exactly one fact. Two separate questions: *law* (does a sign, a marking or the spot itself forbid it?) and *safety* (do the stated facts settle the four art. 148 c.2 checks: a check fails / not enough information / all stated and none blocks). The verdict comes from `POST /api/learn/lessons/:id/assess` (pure `judgeScene` + `assessAnswer` in `src/lib/learning.ts`, stateless, not stored), with the reason a wrong choice is wrong, the deciding facts highlighted on the drawing (the learner's mistake first), and an evidence stepper.
- Mistakes route back through explicit `related` lists (206 questions: 66 / 31 / 74 / 35 per lesson). No migration: progress is keyed by lesson id.
- **Since 2026-11-12 (§31):** lesson (1), `sorpasso-strisce`, lives in chapter 6 (`SEGNALETICA_CHAPTER`) as its lesson 2, unchanged. This chapter is now "Sorpasso", `topicIds: [12]`, three lessons.
- **Since 2026-11-14 (§40):** this is chapter 15 with seven lessons and a review. Overtaking on the right, trams, the second overtake, motorways, headlight signals and the junction/level-crossing/pedestrian exceptions listed as out of scope in §24.2 are now taught (L3–L7); only trucks over 3.5 t (c.14) stay with chapter 3.

### 24.2 Rules future changes must keep
- **Verdicts are derived, never typed.** A scene lists facts; each fact is a rule with its law and bank statements. `expect` is the reviewed answer and `tests/overtaking.test.ts` proves the rules derive it. Every rule needs an agreeing VERO statement; each `agrees` flag must match the answer key (`npm run verify:lessons` checks the snapshots against D1).
- **"Not forbidden" is never "safe".** Law and safety are separate questions. An unstated or unknown check makes the safety answer "not enough information", never "fine". Not being able to see is a *failed* check (bank 5155), not missing information.
- **Self-contained scenes.** Every scene states the centre line and something about all four checks; what a still picture cannot show is stated in text (`textOnly`). No numbers in any scene text: there is no gap calculator. No scene asks the learner to guess another driver's speed or intention.
- **The picture shows only the facts.** Drawing keys come from the facts and may not conflict (tested). The comparison outline marks only what actually differs in the drawing.
- **Centre lines: the stripe next to you decides** (art. 40 c.4, c.8). `cross` flags and every line's bank evidence are checked in tests.
- **No client copy of the rules.** `overtaking.js` labels facts with the server's `roles`; it never reads `rule.legal`, `rule.safety` or `expect` (tested).
- Every option of both questions is the correct one in at least one scene (tested), so none is a trick that is never right.
- Scope left out on purpose (unmapped): overtaking on the right and trams (art. 148 c.7–9), a second overtake on multi-lane roads (c.6), motorways, trucks over 3.5 t and their signs (c.14), cyclist/pedestrian special cases, headlight or horn signals.

### 24.3 Sources (reviewed 2026-10-10)
Codice della Strada artt. 40, 148, 154 (Normattiva, testo vigente, agg. 24/04/2026; read article by article); DPR 495/1992 artt. 104, 116 c.1 lett. c, 119 c.1 lett. c–d (Normattiva, agg. 24/02/2025); ACI pages for artt. 40 and 148 (updated 10/10/2026). Art. 148 c.9-bis (at least 1.5 m when overtaking a bicycle, where the road allows) is current law newer than the 2023 bank; it is mentioned in lesson 4 and not tested. Bank statements cited by id in the content; the 2023-bank caveat still applies.

## 25. Exam mode: answers stay open until "Finish exam"; AI help is opt-in (2026-10-11)

### 25.1 What exists
- Applies to `mode = 'exam'` only (the 30-question simulation). `review` and `topic_practice` keep immediate feedback and lock the first answer.
- A VERO/FALSO tap is a **provisional selection**: shown at once, changeable, never marked right or wrong. It is saved in `exam_answers.selected_answer`; `user_answer` and `is_correct` stay NULL until finish.
- "Finish exam" is always available (unanswered questions count as wrong; the learner is warned with the count). The finish request carries every selection; one transaction applies them, grades them (`user_answer`, `is_correct`) and scores the session. Retrying finish returns the same results.
- Every exam starts with AI help **off**: the panel is hidden and `/api/translate/:id`, `/theory` and `/grammar` answer 403 `aiLocked` for that exam's questions. A separate switch turns it on after a warning that guidance may reveal the answer. `exam_sessions.ai_enabled` is the switch; `ai_assisted_at` records that it was ever on and is never cleared.
- Assisted exams are scored and shown with an "با کمک AI" label, but are excluded from every pass rate (home `passRate`, admin overall pass rate, admin per-user passed count).
- Reload: `GET /api/exam/active` returns the open exam's questions, selections, flags, AI state and remaining time (never correctness); the client offers to continue on start-up and re-sends selections it had only stored locally.

### 25.2 Rules future changes must keep
- Nothing reachable during an open exam may reveal correctness: not `/answer`, not stats, profile or tutor routes, not `/active`. Provisional selections live only in `selected_answer`, which no stats query reads. A new reader of `user_answer`/`is_correct` is automatically safe; a new reader of `selected_answer` must not expose it as graded.
- AI requests are refused on the server while the switch is off, not only hidden in the client.
- Turning the switch off never clears `ai_assisted_at`.
- The final selection is the one that counts; the finish request's selections win over earlier saves.


## 26. Sourced learning content and error reports

- After choosing VERO/FALSO, show the question source beneath the answer controls. Unaided active exams show attribution only; answer-key links unlock after finish or explicit AI assistance. Use the same server-side AI lock as translation.
- `src/lib/question-sources.ts` matches the immutable 2023 import by source ID, Italian text, answer and image filename. Do not label the whole bank as the latest official list. Only explicitly curated citations carry official corroboration.
- `src/lib/content-quality.ts` reviews translation/explanation/theory and decides their label. Legacy caches need review. Automatic review is labelled as such; it is never presented as human verification. Preserve false statements in translations and explain their precise error separately.
- Keep old content and review metadata in `content_revisions`. Never replace a human-reviewed entry with a late automatic response. Content the review does not approve (flagged, inconclusive, or no bank evidence) is still shown, labelled as AI-written (`QUALITY_LABELS.needs_review`) and reportable — never a blank panel. An unavailable reviewer is an inconclusive review, not an error. Since 2026-10-16: withholding it hid content for 7 of the first 12 questions reviewed in production, mostly on inconclusive reviews, and users saw nothing.
- `/api/content/:id/report` records authenticated, bounded reports; only the primary admin can review them. Translation edits cannot repair or automatically close answer/source reports. Include report/revision tables in backups.
- Migration 0017 must precede deployment of this code. See `CONTENT-QUALITY.md` for audit commands, source provenance and validation limits.

## 27. Chapter 2: Segnali di pericolo (2026-10-25)

- Chapter `segnali-pericolo`, `numbers: [2]`, second in `CHAPTERS`, `topicIds: [1]`. Bank group `segnali-pericolo`, source ids 532–1193 (662 questions). 14 lessons + `ripasso-capitolo-2` in `src/content/ch2-*.ts` and `lessons-pericolo.ts`.
- Every chapter-2 question maps to one chapter-2 section except #871, #896, #963 (Velocità practises them). `tests/chapter2.test.ts` pins that list. Readable map and source conflicts: `docs/chapter-2-coverage.md`.
- Step-kind additions, all optional: `factors.sign` (the sign every item is about, shown above the lists; each item's bank image must equal it), classify item `sign` (a sign tile; `figure` stays for wide drawings), `Lesson.figures` also lists sign + panel composites (901–923) so `verify:lessons` accepts them. New drawings: `profile`, `curve`, `railway` in `public/js/road.js`.
- Chapter-wide facts live in lesson 1 (family by shape, 150 m, distance vs length panel, yellow background, ALTRI PERICOLI). A sign's own lesson teaches its placement only for the cross/panels and the pedestrian/cycle signs.
- Sources: CdS and DPR 495/1992 articles listed in the chapter's `sources`, read 2026-10-25 in the consolidated text on leggeinchiaro.it (updated 23/10/2026). The bank's 2023 caveat still applies.

## 28. Chapter 3: Segnali di divieto (2026-11-01)

- Chapter `segnali-divieto`, `numbers: [3]`, third in `CHAPTERS`, `topicIds: [2]`. Bank group `segnali-divieto`, source ids 1194–1714 (521 questions, 39 sign groups). 13 lessons + `ripasso-capitolo-3` in `src/content/ch3-*.ts` and `lessons-divieto.ts`.
- Every chapter-3 question maps to one chapter-3 section except the 30 sign-56/82 questions Chapter 15's `sorpasso-segnali` already teaches (`CHAPTER_3_MAPPED_ELSEWHERE`, pinned in `tests/chapter3.test.ts`). The heavy-vehicle overtaking ban (signs 60, 83), left out of Chapter 15 on purpose (§24.2), is chapter 3 lesson 5. Readable map and source flags: `docs/chapter-3-coverage.md`.
- No new step kinds or drawings: tables, compares, classify with sign tiles (incl. composites 940, 946–950, 955), one factors step, terms, traps.
- Chapter-wide facts live in lesson 1: family by shape, valid from the sign to the next junction, 24 h unless a panel says otherwise, end-of-prescription signs. The only "8–20" rule is DIVIETO DI SOSTA in towns (lesson 12).
- Two weights, never mixed: the truck signs (60, 68, 69, 83) use the full-load mass on the carta di circolazione and spare passenger vehicles; the mass and axle signs (78, 79) use the actual mass at the moment of transit, for every vehicle (art. 118 c.3).
- Today's path: when the learner's last active chapter has no unstarted lesson, it now continues with the next chapter in course order, not the first unstarted lesson of the course (`buildTodayPath`).
- Sources: DPR 495/1992 artt. 81, 104, 116–120 on leggeinchiaro.it (updated 26–30/10/2026); CdS artt. 50, 56, 157, 158 on aci.gov.it (updated 01/11/2026); CdS art. 156 via secondary sites only. The bank's 2023 caveat still applies.

## 29. Chapter 4: Segnali di obbligo (2026-11-07)

- Chapter `segnali-obbligo`, `numbers: [4]`, fourth in `CHAPTERS` (right after `segnali-divieto`), `topicIds: [3]`. Bank group `segnali-obbligo`, source ids 1715–2147 (433 questions, 29 sign groups). 11 lessons + `ripasso-capitolo-4` in `src/content/ch4-*.ts` and `lessons-obbligo.ts`. Not the same as Chapter 15 (`sorpasso-segnaletica`), which was the fourth module built.
- Every chapter-4 question maps to exactly one chapter-4 section; no other chapter maps one (`tests/chapter4.test.ts`). Readable map, reuse notes and source flags: `docs/chapter-4-coverage.md`.
- No new step kinds or drawings. The core move of the chapter is "blue = only this": every blue sign is taught beside the red or triangular sign with the same symbol (rotatoria 29/104, speed 58/105, pedestrians 62/108, bicycles 63/110, animals 26/116).
- Chapter-wide facts live in lesson 1: blue circle = obbligo = a prescrizione (never divieto, pericolo or indicazione); the end of an obligation is a red bar on the blue sign (unlike chapter 3's black bar on white); the ALT signs are the only red-bordered obligations (art. 123).
- Placement is per sign and must not be generalised: straight arrows stand where the obligation starts; curved arrows (preavviso) and the two-arrow signs stand before it; ROTATORIA at the threshold of the area, never on the central island; chains from the sign itself.
- "Pass on the left" = "leave the obstacle on your right" (lesson 5): keep both wordings in feedback; the bank uses both.
- The truck-only turn sign (image 150) has no figure in the current artt. 122–123; it is taught as the bank reads it and flagged in the coverage doc. Do not invent an article for it.
- Sources: DPR 495/1992 artt. 122–123 on leggeinchiaro.it (updated 28/10/2026), read 2026-11-07. The bank's 2023 caveat still applies.

## 30. Chapter 5: Segnali di precedenza (2026-11-12)

- Chapter `segnali-precedenza` (`PILOT_CHAPTER` in `src/content/lessons.ts`), `numbers: [5]`, fifth in `CHAPTERS` (right after `segnali-obbligo`), `topicIds: [4]`. Bank group `segnali-precedenza`, source ids 2148–2390 (`CHAPTER_5_SOURCE_RANGE` in `ch5-signs.ts`; 243 questions, 14 sign groups). This is the §21 pilot grown to the whole group: 9 lessons + `ripasso-capitolo-5`. New lessons in `src/content/ch5-segnali.ts` (L1, L3, L5) and `ch5-incroci.ts` (L6, L7, L9); review in `ch5-ripasso.ts`.
- **The pilot lessons keep their ids and step order** (`dare-precedenza-stop` L2, `diritto-di-precedenza` L4, `sensi-unici-alternati` L8), so saved `lesson_progress.step` still points at the same section. Add rows or sentences inside their steps if needed; never insert, remove or reorder their steps (`tests/chapter5.test.ts` pins the step kinds). Learners who finished the pilot keep those lessons completed; the new lessons start unstarted and the chapter is not completed until they and the review are done.
- Every chapter-5 question maps to exactly one chapter-5 section; no other chapter maps one. The pilot's five later-chapter mappings (#4394, #4564, #4565, #4569, #4637) are kept and pinned; the chapter that owns them must move them deliberately. Readable map, reuse notes and source flags: `docs/chapter-5-coverage.md`.
- No new step kinds or drawings. The core move of the chapter is two questions on every sign: "who gives way to whom?" (art. 105 class I vs class II) and "what is attributed to this sign that it does not say?". Lesson 9's classify settles every sign + traffic light + officer question with one order: officer > working light > sign; off or flashing yellow = the sign decides.
- Chapter-wide facts live in lesson 1: all 14 signs, including the triangular 44 and 47–51, are segnali di precedenza and therefore di prescrizione (CdS art. 39 c.1 lett. b); never pericolo, divieto or indicazione.
- In the 47–51 family the thick line is always your road and you have priority; "dare precedenza" for you is always wrong there.
- Sources: DPR 495/1992 artt. 105–114 on leggeinchiaro.it (updated 26–30/10/2026); CdS artt. 38, 39, 41, 147, 177 on leggeinchiaro.it (updated 23–27/10/2026), read 2026-11-12. The bank's 2023 caveat still applies.

## 31. Chapter 6: Segnaletica orizzontale e segni sugli ostacoli (2026-11-12)

- Chapter `segnaletica-orizzontale` (`SEGNALETICA_CHAPTER` in `src/content/lessons-segnaletica.ts`), `numbers: [6]`, sixth in `CHAPTERS` (right after `segnali-precedenza`), `topicIds: [5]`. Bank group `segnaletica-orizzontale-ostacoli`, source ids 2391–2650 (`CHAPTER_6_SOURCE_RANGE`; 260 questions, 27 groups). 10 lessons + `ripasso-capitolo-6`; lessons in `ch6-strisce.ts` (L1, L3, L4), `ch6-margini.ts` (L5–L7), `ch6-segni.ts` (L8–L10), review in `ch6-ripasso.ts`.
- **Lesson 2 is `sorpasso-strisce`, moved from the overtaking module (§24), not copied.** Keep its id and step kinds (`intro, markings, terms, trap`); `tests/chapter6.test.ts` pins them. It still maps four overtaking-group questions (#5192, #5220, #5246, #5259): kept, pinned; chapter 15 must move them deliberately.
- 256 of 260 questions map to exactly one chapter-6 section. #2543, #2546, #2582, #2583 (overtaking in curves/crests on fig. 502) stay with chapter 15's `sorpasso-valutare` (`CHAPTER_6_MAPPED_ELSEWHERE`); that lesson lists fig. 502. Colour distractors from every group map to L1.1, which teaches the colour rule (white normal, yellow special or no-parking, blue paid parking only).
- One new `anatomy` scene, `approach` in `public/js/road.js` (junction approach: dashed → continuous lane lines, arrows, lettering, stop line, crossing). Everything else uses existing step kinds; no new motion.
- Core move of the chapter: three questions on every marking: what colour, continuous or dashed, and what is attributed to it that it does not say (a stop line does not order a stop by itself; arrows bind only once the lane lines are continuous; an island blocks, a guide stripe only shows).
- Flag kept open: #2603 (painted "50" = "velocità consigliata") has no regulatory text behind it; lesson 10 says so. Full map, reuse notes and flags: `docs/chapter-6-coverage.md`.
- Sources: DPR 495/1992 artt. 88, 135, 138–141, 143–154, 179 and CdS artt. 40, 143, 144, 154, 157, 158, 176 on leggeinchiaro.it (updated 23–30/10/2026), read 2026-11-12. The bank's 2023 caveat still applies.

## 32. Chapter 7: Semafori e segnali degli agenti del traffico (2026-11-12)

- Chapter `semafori-agenti` (`SEMAFORI_CHAPTER` in `src/content/lessons-semafori.ts`), `numbers: [7]`, seventh in `CHAPTERS` (right after `segnaletica-orizzontale`), `topicIds: [6]`. Bank group `semafori-vigili`, source ids 2651–2903 (`CHAPTER_7_SOURCE_RANGE`; 253 questions, 22 groups). 10 lessons + `ripasso-capitolo-7`; lessons in `ch7-semafori.ts` (L1–L3), `ch7-luci.ts` (L4–L7), `ch7-agenti.ts` (L8–L10), review in `ch7-ripasso.ts`.
- Every chapter-7 question maps to exactly one chapter-7 section; no other chapter maps one (`tests/chapter7.test.ts`). Groups are split by concept where needed (e.g. where red sits → L1, what red orders → L2). Readable map, reuse notes and flags: `docs/chapter-7-coverage.md`.
- Two new `anatomy` scenes in `public/js/road.js`: `agente-braccia` and `agente-angolo` (junction from above, officer in the centre facing the bottom arm, one tappable car per arm with ALT / VIA). Sides are the officer's, not the learner's. The ALT/VIA in the drawing and in the part names must agree (tested). Bank figures 383–386 are never annotated (§22.2). No new step kinds, no motion.
- Core move of the chapter: "who is this light or gesture for?" (shape inside the light; where you stand relative to the officer) and "for me: stop, go, or stop if I safely can?". Fixed yellow and the raised arm share one rule: stop if you safely can, otherwise clear the junction.
- Flags kept open: CdS art. 41 c.15 vs the bank on bicycles and vehicle lights (#2683, #2752, #2780); #2841 (show the triangle on request) has no "esibire" text; DPR art. 181 describes the right-angle signal only for the left-turning flow, so the flow in front of the officer is marked "?".
- Sources: CdS artt. 41, 43, 44, 147, 162, 180 and DPR 495/1992 artt. 24, 158–168, 181, 182 on leggeinchiaro.it (updated 23–29/10/2026), art. 41 c.6/c.15 also on brocardi.it, read 2026-11-12. The bank's 2023 caveat still applies.

## 33. Chapter 8: Segnali di indicazione (2026-11-13)

- Chapter `segnali-indicazione` (`INDICAZIONE_CHAPTER` in `src/content/lessons-indicazione.ts`), `numbers: [8]`, eighth in `CHAPTERS` (right after `semafori-agenti`, before Velocità 11–12), `topicIds: []` (no app topic matches; its questions were keyword-filed under 15 topics, mostly "Altro / Misto"). Bank group `segnali-indicazione`, source ids 2904–3506 (`CHAPTER_8_SOURCE_RANGE`; 603 questions, 63 sign groups). 15 lessons + `ripasso-capitolo-8`; lessons in `ch8-strade.ts` (L1–L3), `ch8-incroci.ts` (L4–L5), `ch8-luoghi.ts` (L6–L8), `ch8-zone.ts` (L9–L10), `ch8-guida.ts` (L11–L13), `ch8-servizi.ts` (L14–L15), review in `ch8-ripasso.ts`.
- Every chapter-8 question maps to exactly one chapter-8 section; no other chapter maps one (`tests/chapter8.test.ts`). Colour-only placement questions from every group map to L1.2 and family questions to L1.1, which teach the rule once. Readable map, reuse notes and flags: `docs/chapter-8-coverage.md`.
- No new step kinds or drawings. Core move of the chapter: three questions on every sign: what the background colour says (green autostrada, blue extraurbana, white urbana, brown tourism, yellow temporary; orange only SCUOLABUS/TAXI, red SOS); what a number counts (road number next to E/A/SS/SC, distance next to a place, progressive km in the white square, advised speed in a blue square); and information or rule. An indication sign informs; any rule comes from a small round or triangular sign drawn inside it, and applies only to that branch, lane or vehicle (art. 127 c.7, c.9; art. 135 c.19).
- Blue circle = obligation (chapter 4), blue square with a number = advised speed, red circle = limit: keep the three apart in feedback.
- Flags kept open: EU border signs rely on chapter 4's reading of DPR art. 123 (not re-read, site blocked); yellow temporary-sign articles not re-read; art. 135 c.18 does not spell out that chain/tyre pictograms without a circle are a recommendation; wind advice at tunnels/bridges (#3330, #3339, #3340) is not in art. 135 c.10–11.
- Sources: DPR 495/1992 artt. 78, 124, 125, 127–132, 134–136 on leggeinchiaro.it (updated 25–29/10/2026) and CdS artt. 142, 191 on brocardi.it, read 2026-11-13. The bank's 2023 caveat still applies.

## 34. Chapter 9: Segnali complementari, segnali temporanei e di cantiere (2026-11-13)

- Chapter `segnali-complementari-cantiere` (`COMPLEMENTARI_CHAPTER` in `src/content/lessons-complementari.ts`), `numbers: [9]`, ninth in `CHAPTERS` (right after `segnali-indicazione`, before Velocità 11–12), `topicIds: [7]` (topic 7 "Segnali complementari" holds 160 of the 181 questions and nothing outside the chapter). Bank group `segnali-complementari-cantiere`, source ids 3507–3687 (`CHAPTER_9_SOURCE_RANGE`; 181 questions, 19 sign groups). 6 lessons + `ripasso-capitolo-9` (12 questions, two per lesson); lessons in `ch9-cantiere.ts` (L1–L2), `ch9-corsie.ts` (L3–L4), `ch9-delineatori.ts` (L5–L6), review in `ch9-ripasso.ts`.
- Every chapter-9 question maps to exactly one chapter-9 section, every sign to one section, and no other chapter maps one (`tests/chapter9.test.ts`). Readable map, reuse notes and flags: `docs/chapter-9-coverage.md`.
- No new step kinds or drawings. The chapter has two families. Worksite signs: yellow = temporary, removed when the work ends, and they win over permanent signs. LAVORI and the SEMAFORO warning inform; red/white barriers and cones mark the site out (cones for work of at most two days, accidents, deviations); lane panels read like maps (red = lane closed, a vehicle under an arrow = its lane); truck signs advise when they carry no circle, and a red "t" circle bans only that mass on that branch (actual mass). Complementary signs (delineators) give no orders and show the road's shape: reflectors red right / white left on two-way roads, yellow on one-way roads and in one-way tunnels; yellow-black poles on snowy mountain roads; the obstacle delineator stands inside the carriageway and is retroreflective; white-on-black chevrons point the way the curve turns (white-on-red = temporary curve), both ways at a T-junction; "1° tornante" is a number, not a distance.
- Flags kept open: barrier at a level crossing with broken bars (#3540) and the tunnel delineator at deviations (#3623) are the bank's reading, not found in artt. 32, 36, 174 as read; #3639 (guardrails) taught by purpose only.
- Sources: DPR 495/1992 artt. 30–34, 36, 38, 39, 41–43, 86, 173, 174, 177 on leggeinchiaro.it (updated 26–29/10/2026), read 2026-11-13. The bank's 2023 caveat still applies.

## 35. Chapter 10: Pannelli integrativi (2026-11-13)

- Chapter `pannelli-integrativi` (`INTEGRATIVI_CHAPTER` in `src/content/lessons-integrativi.ts`), `numbers: [10]`, tenth in `CHAPTERS` (right after `segnali-complementari-cantiere`, before Velocità 11–12), `topicIds: []` (no app topic matches; 150 of the 263 were keyword-filed under "Altro / Misto"). Bank group `pannelli-integrativi`, source ids 3688–3950 (`CHAPTER_10_SOURCE_RANGE`; 263 questions, 25 groups, 71 images). 9 lessons + `ripasso-capitolo-10` (18 questions, two per lesson); lessons in `ch10-spazio.ts` (L1–L2), `ch10-tempo.ts` (L3–L4), `ch10-pericoli.ts` (L5–L6), `ch10-altri-pericoli.ts` (L7), `ch10-sosta-strada.ts` (L8–L9), review in `ch10-ripasso.ts`.
- 261 of 263 questions map to exactly one chapter-10 section, every bank image to one section (`tests/chapter10.test.ts`). #3784 (FINE DIVIETO DI SORPASSO) stays with chapter 15's `sorpasso-segnali` and #3871 (rain → longer distance) with Velocità's `distanza-di-sicurezza` (`CHAPTER_10_MAPPED_ELSEWHERE`); moving either changes where existing mistakes route, so do it deliberately. Readable map, reuse notes and flags: `docs/chapter-10-coverage.md`.
- No new step kinds or drawings. Core move of the chapter: a panel never stands alone and answers one of four questions about the sign above it (where, when, for whom, what). Where: number alone = distance to the start, number between arrows = length; arrows point to the stretch where the rule applies (forward/← start, both = continuation, back/→ end). When: hours alone = every day, cross = holidays, hammers = working days; the sign above still decides what. For whom: picture alone = only these, «eccetto» = all but these. What: picture panels (II.6) explain a danger and ask for care; they never create a ban (snowplough: ≥ 20 m by CdS art. 149 c.3). II.7: thick line = main road with priority, not a dangerous curve.
- Step titles carry no bracketed Italian (it broke RTL wrapping at 320 px); the Italian name lives in each row's `it` cell.
- Flags kept open: arrow and cross/hammer conventions are not described in art. 83's text as read (taught from the bank's figures, consistent with every answer); #3896 (disabled-badge vehicles not clamped) goes beyond DPR art. 354 c.4 as read (removal only).
- Sources: DPR 495/1992 artt. 83, 103, 354 and CdS artt. 149, 159 on leggeinchiaro.it (updated 26–29/10/2026), read 2026-11-13. The bank's 2023 caveat still applies.

## 36. Chapter 11: Limiti di velocità (2026-11-14)

- Chapter `limiti-di-velocita` (`LIMITI_CHAPTER` in `src/content/lessons-limiti.ts`), `numbers: [11]`, eleventh in `CHAPTERS` (after `pannelli-integrativi`, before chapter 12), `topicIds: [10]`. Bank group `limiti-di-velocita`, source ids 3951–4206 (`CHAPTER_11_SOURCE_RANGE`; 256 questions, 19 groups, one image: 301). 7 lessons + `ripasso-capitolo-11` (14 questions, two per lesson); L1 is the reused `velocita-adeguata` (`lessons-velocita.ts`), L2 `ch11-strade.ts`, L3–L4 `ch11-veicoli.ts`, L5–L6 `ch11-rischi.ts`, L7 `ch11-passaggio.ts`, review `ch11-ripasso.ts`.
- **The Velocità module is split.** It used to be one chapter with `numbers: [11, 12]`. Its first lesson moved to chapter 11 with the same id; `VELOCITA_CHAPTER` is now `numbers: [12]`, `topicIds: [11]`, three lessons, content unchanged. Progress is keyed by lesson id, so nothing a learner saved changes; chapter 11's new lessons start unstarted (pinned in `tests/chapter11.test.ts`). Do not give two chapters the same number again: the chapter-11 test asserts every number appears once.
- All 256 questions map to exactly one chapter-11 section; no other module maps any of them (`tests/chapter11.test.ts`). Readable map, reuse notes and flags: `docs/chapter-11-coverage.md`.
- No new step kinds or drawings. Core move: speed has two layers. The *limit* is a number set by road (130 / 110 / 90 / 50; rain 110 / 90; only a sign raises it: 150 motorway, 70 town), by vehicle (car family vs trailer 80 / 70; moped 45, quadricycle 80, farm machine 40) and by driver (first three years 100 / 90). The *right speed* is a judgment (L1, art. 141) that is often lower. L5–L7 are where speed becomes danger: curves, junctions where right of way still leaves fault, roadside hazards, descents in neutral, level crossings.
- Numeric classify options use one label (`fa === it`), which `classifyItemHtml` already renders once.
- Flags kept open: the fog limit comes from MIT directive 335/1993, not art. 142's text; "right lane faster in parallel files" is derived from art. 144 c.1, not stated in it; servo-brake/steering answers are technical (no legal source); level-crossing details beyond art. 147 c.4 (warn the station; clear the tracks even with injured) are the bank's reading. No answer-key conflict.
- Sources: CdS artt. 54, 56, 117, 142, 144, 147 on leggeinchiaro.it (updated 12/06–27/10/2026), MIT directive 335/1993, read 2026-11-14. The bank's 2023 caveat still applies.

## 37. Chapter 12: Distanza di sicurezza (2026-11-14)

- Chapter `velocita-distanza-arresto` (`VELOCITA_CHAPTER` in `src/content/lessons-velocita.ts`; id kept), `numbers: [12]`, twelfth in `CHAPTERS` (after `limiti-di-velocita`, before chapter 14), `topicIds: [11]`, `nameIt` «Distanza di sicurezza». Bank group `distanza-di-sicurezza`, source ids 4207–4341 (135 questions, 15 groups, no images). 4 lessons + `ripasso-capitolo-12` (8 questions, two per lesson): L1–L3 kept in `lessons-velocita.ts`, L4 `distanza-casi-particolari` in `ch12-casi.ts`, review in `ch12-ripasso.ts`.
- **L1–L3 keep their ids and step kinds** (`spazio-di-reazione`, `frenatura-e-arresto`, `distanza-di-sicurezza`; pinned in `tests/chapter12.test.ts`). Never insert, remove or reorder their steps: saved `lesson_progress.step` points into them. Learners who finished them keep them; L4 and the review start unstarted.
- All 135 questions map to exactly one chapter-12 section; no other module maps any (`tests/chapter12.test.ts`). The module also keeps 26 questions from chapters 2, 10, 13, 17, 21–23, 25 that it mapped before (`OUTSIDE` in the test); the owning chapter must move them deliberately. Readable map, reuse notes and flags: `docs/chapter-12-coverage.md`.
- No new step kinds or drawings. Core move: three distances, never mixed. Reaction (before the brake; ×speed), braking (after; ×speed², grip, slope), the gap to the car ahead (minimum = your reaction distance, never "= braking distance"). The law gives the gap only two numbers (art. 149 c.2–3: ≥ 100 m between vehicles that alone are banned from overtaking, outside towns, not on 2+ lanes per direction; ≥ 20 m behind working snowploughs and salt spreaders); every other number in a statement is a trap, and no situation (tunnel, motorway, truck ahead) lets the gap shrink.
- Flags kept open: "30 km/h → circa 9 m" is 8.3 m by the formula; minimum-gap numbers, tunnels, trucks, overtaking and unstable loads have no article of their own (art. 149 c.1 applied); 28 statements (#4208–#4235) are missing their first word in the 2023 dataset and are quoted as-is. No answer-key conflict.
- Sources: CdS art. 149 (agg. 29/10/2026) and art. 176 c.1 lett. c (agg. 27/10/2026) on leggeinchiaro.it, read 2026-11-14; ACI art. 149; Polizia di Stato and Comune di Genova for reaction time and grip. The bank's 2023 caveat still applies.

## 40. Chapter 15: Sorpasso (2026-11-14)

- Chapter `sorpasso-segnaletica` (`SORPASSO_CHAPTER` in `src/content/lessons-sorpasso.ts`; id kept), `numbers: [15]`, right after chapter 14 in `CHAPTERS` (chapters 16+ may follow; tests check order, not "last"), `topicIds: [12]`. Bank group `sorpasso`, source ids 5136–5291 (156 questions, 10 groups, no images). 7 lessons + `ripasso-capitolo-15` (14 questions, two per lesson): L1–L3 kept in `lessons-sorpasso.ts`, L4 `ch15-destra.ts` (which side, trams, second overtake), L5 `ch15-incroci.ts` (junction exceptions, level crossings, pedestrians, acceleration lanes), L6 `ch15-divieti.ts` (bans the law does not have, emergency vehicles), L7 `ch15-autostrada.ts`, review `ch15-ripasso.ts`.
- **L1–L3 keep their ids and step kinds** (`sorpasso-segnali`, `sorpasso-valutare`, `sorpasso-fasi`; pinned in `tests/chapter15.test.ts`); the assess scenes and manoeuvre player are unchanged (`tests/overtaking.test.ts`). Sentences were added inside steps, never steps. L4–L7 and the review start unstarted.
- 152 of 156 questions map to exactly one chapter-15 section; #5192, #5220, #5246, #5259 stay with chapter 6's `sorpasso-strisce`. #5145 and #5199 moved from L2.1 to L1.1. #5912, #5917, #5918 stay in L3.1 (chapter 18 relies on them). Readable map, reuse notes and flags: `docs/chapter-15-coverage.md`.
- No new step kinds, drawings, motion or dependencies. Core move of the chapter: three questions on every statement. Checks: does it name all four art. 148 c.2 checks, or only one ("semplicemente", "unicamente")? Place: is this spot on the law's list of bans (curves, crests, poor visibility, junctions, level crossings, queues, pedestrians, acceleration lanes, solid lines, signs), and which named exception opens it (separate carriageways / one way / 2+ marked lanes; left-turner; bicycle; lights or officers)? A vehicle, a time of day or "carefully" is never an exception, and a bus, an off-duty police car or a right indicator is never a ban. Side: left always; right only for a left-turner that has started, a one-way stop on the left, trams; never right of a stopped tram or filobus without a salvagente.
- Flags kept open: DPR 495/1992 art. 347 (acceleration lanes; pedestrians outside crossings) read only on leggeinchiaro.it; reserved-lane articles not re-read (#5222); glossary conflict on *dosso* («برآمدگی» vs chapter 15's «قله‌ی سربالایی»). No answer-key conflict.
- Sources: CdS artt. 148, 152, 153, 176, 177 (Brocardi, agg. 25/04/2026; ACI art. 148, updated 14/11/2026) and DPR 495/1992 art. 347 (leggeinchiaro.it, agg. 29/10/2026), read 2026-11-14. The bank's 2023 caveat still applies.

## 41. Chapter 16: Fermata, sosta, arresto (2026-11-14)

- Chapter `fermata-sosta-arresto` (`FERMATA_CHAPTER` in `src/content/lessons-fermata.ts`), `numbers: [16]`, registered right after chapter 15 in `CHAPTERS`, `topicIds: [14]` (app topic «Arresto, sosta e fermata»). Bank group `fermata-sosta-arresto`, source ids 5292–5482 (`CHAPTER_16_SOURCE_RANGE`; 191 questions, 21 groups, one image: sign 84 on #5361). 7 lessons + `ripasso-capitolo-16` (14 questions, two per lesson): L1 `ch16-definizioni.ts`, L2 `ch16-posizione.ts`, L3–L4 `ch16-divieti.ts`, L5 `ch16-riservati.ts`, L6–L7 `ch16-sicurezza.ts`, review `ch16-ripasso.ts`.
- All 191 questions map to exactly one chapter-16 section; no other module maps any (`tests/chapter16.test.ts`). Nothing in the range was mapped before, so no saved progress moved; every lesson starts unstarted. Chapter 3 L11 (`divieto-sosta-fermata`, the parking signs) is linked from L1 and L4, not copied. Readable map, reuse notes and flags: `docs/chapter-16-coverage.md` (local, `docs/` is not in git) and PR description.
- No new step kinds, drawings, motion or dependencies. Core move: two questions on every statement. Is it about *fermata* (short, driver stays, never obstructs) or *sosta* (driver may leave)? And which art. 158 list holds the place: c.1 both banned (rail, tunnels and underpasses, crests and curves, hidden signs, lane markings, junctions: 5 m in towns or "near" outside, crossings, cycle paths, sidewalks), c.2 only sosta (driveways, double parking, bus/taxi/market spaces, fuel stations in opening hours, bins, emergency services, disabled spaces, reserved lanes, pedestrian areas, ZTL, verges), or neither. L4's classify («هر دو ممنوع / فقط پارک ممنوع / هر دو مجاز») is the chapter's key exercise. The bank's traps are invented numbers and conditions: "10 minutes", "3 hours" (that is the motorway emergency limit), "if short", "with hazard lights", "with the disc", "22–8", "only downhill", "only for long trips".
- Glossary: follows chapter 13's `passo carrabile` «ورودیِ خودرو به ملک», `dosso` «برآمدگی», `indicatore di direzione` «چراغ راهنما», `specchio retrovisore` «آینه» and chapter 18's `luci di posizione` «چراغ‌های موقعیت»; own rows under «Stopping and parking (chapter 16)».
- Flags kept open: point values (2 for art. 158 c.2 lett. d/h, 4 for lett. g) are from a 2025 secondary table, not Normattiva's annex; the bank only asks whether points are lost. Disco orario specifics (no paper, minutes, no moving the dial) are the bank's reading of art. 157 c.6. Acceleration-lane fermata (#5365) has no art. 158 letter; taught with art. 176 c.1 lett. d. Checking all passengers' belts (#5315) goes beyond art. 172 (the driver answers for minors). Seat, mirrors, handbrake and gear are "opportuno", not articles. No answer-key conflict.
- Sources: CdS artt. 153, 157, 158, 164, 169, 172, 176, 188 on leggeinchiaro.it (agg. 27–29/10/2026), Certifico art. 126-bis table (rev. 12/02/2025), read 2026-11-14. The bank's 2023 caveat still applies.

## 42. Chapter 18: Luci e dispositivi acustici (2026-11-14)

- Chapter `luci-dispositivi-acustici` (`LUCI_CHAPTER` in `src/content/lessons-luci.ts`), `numbers: [18]`, `topicIds: []`, after the highest-numbered chapter below 18. Bank group `luci-dispositivi-acustici`, source ids 5815–5990 (176 questions, 22 groups, images 695–698, 704–707, 721). 6 lessons + `ripasso-capitolo-18` (12 questions, two per lesson): `ch18-luci.ts` (L1 which light when, L2 parked / plate / reflectors), `ch18-abbaglianti.ts` (L3 main beam, glare, flash; horn in one row), `ch18-indicatori.ts` (L4), `ch18-spie.ts` (L5 colours and controls, L6 red fault lights), `ch18-ripasso.ts`.
- 173 questions map to exactly one chapter-18 section; #5912, #5917, #5918 stay with chapter 15 `sorpasso-fasi` (`CHAPTER_18_MAPPED_ELSEWHERE`). Each bank image is taught in one section of the lesson that lists it in `signs` (tested). Lesson ids are pinned in `tests/chapter18.test.ts`; never insert, remove or reorder their steps.
- Core moves: seeing vs being seen (position lights never replace dipped beam); dipped beam always outside towns and in tunnels, at night everywhere, in poor visibility everywhere (art. 152 c.1, 153 c.1); main beam = outside towns + dark + nobody ahead, dip for anyone it could dazzle (153 c.1–3); flash = warning or overtaking intent, any hour, anywhere (153 c.4); indicators = leaving or joining your path, either side, any road (154 c.1–2), never for following the road or stopping in lane; tell-tales by colour (UN R121: red danger, yellow caution, green on, blue main beam).
- No new step kinds, drawings or motion. Classify items show bank symbols as tiles; the shared classify image alt text is now neutral («تصویر برای دسته‌بندی»).
- Flags kept open (bank unchanged; `docs/chapter-18-coverage.md`): reflector colours and plate-light colour from UN R48 via a secondary source; "parcheggio autorizzato" read as off-carriageway; art. 154 c.2 "rallentare per fermarsi" vs the bank's no-indicator answers for stopping in lane; fault-light actions are owner-manual practice. No answer-key conflict.
- Sources: CdS artt. 152, 153, 154, 156 on leggeinchiaro.it (agg. 26–29/10/2026), Brocardi art. 153 (L. 177/2024 note), UN R121 table 1, NSAI on UN R48, read 2026-11-14. The bank's 2023 caveat still applies.
