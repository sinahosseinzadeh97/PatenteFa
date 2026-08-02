# PatenteFa 🇮🇹🇮🇷

> تمرین آزمون تئوری پاتنته ایتالیا — به فارسی
> Italian driving theory exam trainer with Persian language support.

A Telegram Bot + Mini App for studying the Italian *patente B* theory exam.
Runs entirely on **Cloudflare Workers** (Hono + D1 + R2 + KV + Cron) — no separate hosting needed.

---

## ⚠️ Data Notice

The question bank is sourced from [`Ed0ardo/QuizPatenteB`](https://github.com/Ed0ardo/QuizPatenteB) (MIT), which was last updated in 2023.
**Spot-check against [ilportaledellautomobilista.it](https://www.ilportaledellautomobilista.it) before your exam date** for any questions that may have changed.

---

## Setup

### Prerequisites

- [Node.js](https://nodejs.org) ≥ 18
- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier is sufficient)
- A Telegram bot created via [@BotFather](https://t.me/BotFather)

### 1. Install dependencies

```bash
npm install
```

### 2. Login to Cloudflare

```bash
npx wrangler login
```

### 3. Create Cloudflare resources

```bash
# D1 database
npx wrangler d1 create patente-fa-db
# → Copy the database_id into wrangler.jsonc

# KV namespace
npx wrangler kv namespace create patente-fa-kv
# → Copy the id into wrangler.jsonc

# R2 bucket (for road-sign images and backups)
npx wrangler r2 bucket create patente-fa-signs
```

Update `wrangler.jsonc` with the IDs you get from the above commands.

### 4. Configure secrets

Copy `.dev.vars.example` to `.dev.vars` and fill in your values:

```bash
cp .dev.vars.example .dev.vars
```

| Variable | Where to get it |
|---|---|
| `TELEGRAM_BOT_TOKEN` | @BotFather → `/newbot` |
| `TELEGRAM_WEBHOOK_SECRET` | Any random string (e.g. `openssl rand -hex 32`) |
| `OPENAI_API_KEY` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| `OPENAI_MODEL` | Recommended: `gpt-4o-mini` |
| `ALLOWED_TELEGRAM_USER_IDS` | Your numeric Telegram ID (get it from @userinfobot) |
| `LOG_CHANNEL_ID` | Create a private channel, add the bot as admin, get the channel ID |
| `MINI_APP_URL` | Your deployed Worker URL (see step 7) |
| `DEFAULT_TIMEZONE` | `Europe/Rome` |

### 5. Apply the database schema

```bash
npm run db:migrate:local
```

### 6. Import the question bank

```bash
npm run import
# Then apply the generated SQL:
npx wrangler d1 execute patente-fa-db --local --file data/insert_topics.sql
npx wrangler d1 execute patente-fa-db --local --file data/insert_questions.sql
```

### 7. Deploy

```bash
npm run deploy
```

Copy the deployed Worker URL and set it as `MINI_APP_URL` in your `.dev.vars` and as a Cloudflare secret:

```bash
npx wrangler secret put MINI_APP_URL
# (paste the URL when prompted)
```

Apply the production secrets:

```bash
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_WEBHOOK_SECRET
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put OPENAI_MODEL
npx wrangler secret put ALLOWED_TELEGRAM_USER_IDS
npx wrangler secret put LOG_CHANNEL_ID
```

Apply schema to production:

```bash
npm run db:migrate:remote
npx wrangler d1 execute patente-fa-db --remote --file data/insert_topics.sql
npx wrangler d1 execute patente-fa-db --remote --file data/insert_questions.sql
```

### 8. Register the Telegram webhook

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://<YOUR_WORKER>.workers.dev/webhook/telegram",
    "secret_token": "<YOUR_WEBHOOK_SECRET>",
    "allowed_updates": ["message", "callback_query"]
  }'
```

### 9. Set the Mini App button in BotFather

In BotFather: `/mybots` → your bot → `Bot Settings` → `Menu Button` → enter your Worker URL.

---

## Local development

```bash
npm run dev
```

For cron testing:

```bash
npx wrangler dev --test-scheduled
# Then visit http://localhost:8787/__scheduled?cron=0+6+*+*+*
```

---

## Architecture

```
Telegram client
   ├── Bot chat  → Cloudflare Worker (Hono)
   │                  ├── /webhook/telegram   (bot updates)
   │                  ├── /api/*              (Mini App REST API)
   │                  └── /app               (Mini App HTML shell)
   └── Mini App (WebView) → same Worker

Cloudflare:
   D1    → questions, sessions, vocab, users
   R2    → road-sign images, nightly backups
   KV    → rate limiting / nonce cache
   Cron  → 08:00 review reminder, 01:00 nightly backup
```

---

## Bot commands

| Command | Action |
|---|---|
| `/start` | Register + open Mini App |
| `/oggi` | Start a new 30-question simulation |
| `/review` | Start review mode for pending mistakes |
| `/vocab` | Open vocabulary list |
| `/stats` | Quick stats summary |

---

## Pass rule (real Italian exam)

**30 statements, 20 minutes, ≤ 3 wrong answers = pass.**
A 4th wrong answer is a fail. This app enforces the same rule.
