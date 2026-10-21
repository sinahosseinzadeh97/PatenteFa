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
- **Brand / theme:** from the logo (`public/img/brand/`) — navy `#0B2D52` on white plus a traffic light (red / amber / green). Light is the base; the Mini App switches to a dark navy variant when Telegram's `colorScheme` is dark

## Imported Claude Cowork project instructions
