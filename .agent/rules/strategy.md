# PatenteFa — Part 1/4 — Strategy & Domain Context

> PatenteFa: Italian Driving Theory Trainer (Telegram Mini App). This is part 1 of 4 of the project rules, split to fit Antigravity's per-file rule size limit — read alongside architecture.md, features.md, build-plan.md in `.agent/rules/`; together they're the full spec. Defines what to build, why, the data model, the API surface, and the order of work. Sections marked **[ASSUMPTION]** were inferred by the spec author and should be confirmed or overridden by the human before/while building.

## 1. What this is

A personal Telegram bot + Mini App that helps one primary user (and up to ~3 invited people) prepare for the Italian **driving licence theory exam ("quiz della patente")** in Italian, with Persian (Farsi) support layered on top: on-demand translation, a vocabulary trainer, and a next-day review loop for missed questions.

- Primary surface: Telegram (Bot + Mini App / WebApp), no separate website needed.
- Backend: single Cloudflare Worker using **Hono**.
- Frontend: the Mini App served by the same Worker, styled with **Tailwind CSS v4**.
- AI: OpenAI API used for **translation, explanation, and light content generation** — not for authoring exam questions (see §4, this is the single biggest deviation from the original request and the reasoning matters).
- Target: user wants to sit the real exam within roughly **4 months**, studying ~1–2 hours/day.

## 2. Assumptions to confirm **[ASSUMPTION]**

| # | Assumption | Why it matters |
|---|---|---|
| 1 | Category **Patente B** (car) is the target, not A/A1 (motorcycle) or C/D. | Question bank filtering. B and A1 share the same question bank per current sources, so this is low-risk, but confirm. |
| 2 | Total users ≤ 4, invite-only, no public signup. | Lets us use a static allow-list instead of a real auth/registration system. |
| 3 | User's timezone is Europe/Rome (they're in Torino). | Used for the morning-reminder cron and "day" boundaries. |
| 4 | "Design the exam with the ChatGPT API" meant *assemble a realistic practice exam and translate it* — not literally invent new true/false statements. | See §4. Inventing questions is actively counterproductive for a real government exam; the fix below keeps everyone's stated goals intact. |
| 5 | Morning reminder time: 08:00 local, adjustable per user later. | |
| 6 | "Database in Telegram / in a channel" is a *preference for staying inside the Telegram ecosystem and having a human-readable, Telegram-native backup*, not a hard technical requirement to use chat messages as the query engine. | See §6 — this is the second deviation, also with reasoning spelled out so the human can override it. |

## 3. Exam domain reference (verified, don't re-derive from memory)

The current Italian theory exam (patente B/A1), format in effect since Dec 2021:

- **30 statements**, answered **True/False (Vero/Falso)**.
- **20 minutes** total.
- Pass with **3 or fewer errors**; a 4th wrong answer fails the attempt automatically.
- Questions are drawn from an **official Ministry of Infrastructure and Transport question bank** (Motorizzazione), organized into roughly **25 topic areas** (segnaletica, precedenza, documenti, meccanica, primo soccorso, etc.).
- The bank currently has **~7,000+ fixed, pre-written questions** — they are not generated per session, they're selected. A large share of them (signage questions) are tied to a specific road-sign image.
- Questions are fixed and public knowledge, which is exactly why serious prep apps and books (patentati.it, quizpatenteonline.it, tuttowebpatente.it, etc.) all work the same way: study the real bank directly rather than simulate it.

Reference screenshot the user provided (dark theme, official-style layout) shows the UI vocabulary to mirror:
- A row of numbered tabs (multiple practice sets, current one circled) + a flag/bookmark icon (top-right, orange) to mark a question.
- A secondary bar: "`1 di 30`" (position), countdown timer ("`19:59`"), and a completion percentage.
- A "Traduci" (Translate) toggle + target-language picker.
- Question text, large and centered.
- "Ascolta" (Listen) with a speaker icon — text-to-speech playback.
- Two large buttons: **VERO** (green) / **FALSO** (red).

Build the exam-runner screen to match this shape closely — it's a proven, familiar layout for this exact use case.

## 4. Question source — use the real bank, not GPT-generated questions

**Key decision:** OpenAI is used for *translation, explanations, and vocabulary help* — never to invent new True/False statements for the core 30-question simulations. A model can silently produce a statement that's subtly wrong, mismatched to current law, or just doesn't exist in the real bank — all of which actively hurts someone studying for a real government test with only 3 allowed mistakes.

**Recommended seed dataset:** [`Ed0ardo/QuizPatenteB`](https://github.com/Ed0ardo/QuizPatenteB) on GitHub, MIT licensed. Contains `quizPatenteB2023.json` with **7,139 questions**, of which **3,983 include a road-sign image** (images in `img_sign/`). This is a solid, ready-to-ingest starting point.

Ingestion plan:
1. Clone/download the JSON + `img_sign/` folder at build time (one-off script, see §12 `scripts/import-question-bank.ts`).
2. Normalize into the `questions` / `topics` tables (§7). Map the dataset's topic labels to the ~25 official argument categories where possible; if the dataset doesn't carry topic labels cleanly, a light one-time GPT-assisted classification pass per question is a reasonable use of the API (batch, cache the result — this is a one-time cost, not a per-session one).
3. Upload sign images to R2 (or serve them straight from a CDN mirror of the repo, keeping attribution) so the Mini App doesn't depend on GitHub raw at runtime.
4. Data is from 2023 — flag in the UI/README that it should be spot-checked against `ilportaledellautomobilista.it` for any since-changed questions before the user leans on it heavily close to exam day. This is a "good enough to study from starting today" dataset, not guaranteed byte-for-byte current.

What GPT *is* good for here, and should be used for:
- On-demand Persian translation of a question + its correct answer (§9.3).
- A short Persian explanation of *why* a statement is true/false (genuinely useful for the "trabocchetto"/trick questions style of this exam).
- Suggesting a Persian translation when the user saves a vocabulary word (§9.5), which the user can edit.
- Optional: generating mnemonic hints or topic-level summaries — clearly nice-to-have, see §11.
