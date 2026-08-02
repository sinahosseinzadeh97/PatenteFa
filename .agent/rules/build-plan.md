# PatenteFa — Part 4/4 — Repo Structure, Env & Build Phases

> Part 4 of 4 of the PatenteFa project rules (split to fit Antigravity's per-file rule size limit). Read alongside strategy.md, architecture.md, features.md, build-plan.md in `.agent/rules/` — together they are the full spec.

## 12. Suggested repo structure

```
/
├── AGENTS.md
├── package.json
├── wrangler.toml
├── tsconfig.json
├── src/
│   ├── index.ts                  # Hono app entry
│   ├── bot/
│   │   ├── webhook.ts
│   │   ├── commands.ts
│   │   └── telegram.ts           # thin fetch() wrapper around Bot API
│   ├── api/
│   │   ├── exam.ts
│   │   ├── translate.ts
│   │   ├── review.ts
│   │   ├── vocab.ts
│   │   └── stats.ts
│   ├── app/                      # Mini App, served by the same Worker
│   │   ├── shell.tsx             # Hono JSX layout
│   │   ├── screens/
│   │   │   ├── exam.tsx
│   │   │   ├── results.tsx
│   │   │   ├── review.tsx
│   │   │   ├── vocab.tsx
│   │   │   └── stats.tsx
│   │   ├── client.ts              # Telegram.WebApp init, fetch calls
│   │   └── styles.css             # Tailwind v4 entry: @import "tailwindcss";
│   ├── db/
│   │   ├── schema.sql
│   │   └── queries.ts
│   ├── lib/
│   │   ├── openai.ts
│   │   ├── auth.ts                # Telegram initData HMAC verification
│   │   └── srs.ts
│   └── jobs/
│       ├── morningReminder.ts
│       └── nightlyJournalAndBackup.ts
├── scripts/
│   └── import-question-bank.ts    # one-off: ingest QuizPatenteB JSON + images
└── data/                          # gitignored, populated by the import script
```

## 13. Environment variables / secrets

| Name | Purpose |
|---|---|
| `TELEGRAM_BOT_TOKEN` | From @BotFather |
| `TELEGRAM_WEBHOOK_SECRET` | Random string, verified on incoming webhook calls |
| `OPENAI_API_KEY` | Translation/explanation/TTS-fallback calls |
| `ALLOWED_TELEGRAM_USER_IDS` | Comma-separated allow-list, up to ~4 IDs |
| `LOG_CHANNEL_ID` | Private Telegram channel for the journal/backup job (§6) |
| `MINI_APP_URL` | Public Worker URL, needed for the BotFather Menu Button and deep links |
| `DEFAULT_TIMEZONE` | `Europe/Rome` |

Cloudflare free-tier is comfortably enough for this scale (≤4 users, a few sessions/day each): Workers allows 100K requests/day, D1 allows 5GB storage with 5M row-reads/day and 100K row-writes/day, KV allows 1GB with 100K reads/day, R2 allows 10GB storage. None of these are close to being touched here — the paid $5/mo tier is not needed unless the CPU-time-per-request ceiling on the free plan (10ms) turns out to be tight for a specific endpoint, which is unlikely for simple D1 queries.

## 14. Build phases (do them roughly in this order)

1. **Setup** — `wrangler` project, D1/KV/R2 bindings, bot created via BotFather, webhook registered, `/health` route deployed and reachable.
2. **Data ingestion** — run `scripts/import-question-bank.ts`, populate `questions`/`topics`, upload images to R2, spot-check ~20 random entries by hand.
3. **Auth & bot skeleton** — `initData` verification middleware, `/start` flow, Mini App opens and shows a "hello, N days to your exam" dashboard shell.
4. **Exam engine** — start/answer/finish endpoints + the exam-runner screen matching §3's layout, correct pass/fail rule (≤3 wrong).
5. **Results + translation** — results screen, per-question translate button, `translations_cache` wired up.
6. **Review loop** — `review_queue` population on finish, morning cron + Telegram push, review-mode runner.
7. **Vocabulary + TTS** — vocab CRUD screen, Web Speech "Ascolta" button, OpenAI TTS fallback flag.
8. **Stats + journal/backup** — stats screen, nightly D1→JSON→channel backup job, per-session summary post to the log channel.
9. **Polish + optional features from §11**, roughly in the priority order listed.

## 15. Open questions for the human (not the agent)

- Confirm Patente B vs. another category (§2.1).
- Confirm the hybrid storage approach in §6, or explicitly request literal channel-as-DB instead.
- Provide the 3 other users' Telegram numeric IDs when ready (not usernames — the allow-list needs the numeric `telegram_user_id`).
- Decide on a project/bot name (this doc uses the placeholder "PatenteFa").
