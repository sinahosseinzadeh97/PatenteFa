# PatenteFa

> Agent rules for this repository are in `.agent/rules/`:
> - `strategy.md` — what to build & why
> - `architecture.md` — data model, Cloudflare stack
> - `features.md` — UX & feature specs
> - `build-plan.md` — repo layout, env vars, build phases
> - `design.md` — UI design tokens, aesthetics & component styling

Read all five before making any significant changes.

## Key facts for any agent

- **Runtime:** Cloudflare Worker (Hono), D1 (SQLite), R2, KV, Cron Triggers
- **Frontend:** Hono JSX + Tailwind CSS v4, served by the same Worker at `/app/*`
- **Auth:** Telegram `initData` HMAC-SHA256 verification in `src/lib/auth.ts` — every `/api/*` route must call `verifyInitData()` and extract `userId` from it
- **Allow-list:** `ALLOWED_TELEGRAM_USER_IDS` env var (comma-separated integers) — checked on every auth call
- **OpenAI:** translation/explanation only — never used to invent exam questions
- **Question bank:** ~7,139 questions from `Ed0ardo/QuizPatenteB`, seeded via `scripts/import-question-bank.ts`
- **Pass rule:** ≤ 3 wrong answers out of 30 = pass (matches real Italian exam)
- **Dark theme:** green (#16a34a) / white / red (#dc2626) accent palette — both Italian and Iranian flags share these colours

## Imported Claude Cowork project instructions
