# Admin messaging and Back navigation — TDD evidence

## Source and user journeys

No plan file was supplied. The journeys were derived from the requested behavior:

1. As a Mini App user, I can return from every nested screen, including an unfinished exam, without guessing where navigation lives.
2. As an admin, when I message one selected user, the durable in-app message is stored and the bot immediately sends the same message to that user's stored Telegram account.
3. As an admin, I get an accurate delivery result when Telegram rejects or cannot transport the message; the in-app copy remains available.
4. As a user, I cannot access another user's thread or perform bot/admin messaging actions without a configured admin Telegram ID.

## RED → GREEN evidence

| Behavior | RED evidence | GREEN evidence |
|---|---|---|
| Central Back policy and controls | `npx tsx scripts/test-navigation.ts` failed because `public/js/navigation.js` did not exist | Same command: `✓ navigation policy: all checks passed` |
| Persist-before-deliver fallback | `npx tsx scripts/test-support-delivery.ts` failed because `src/lib/support-delivery.ts` did not exist | Same command: `✓ admin support delivery: all checks passed` |
| Concrete admin authorization | `npx tsx scripts/test-admin-auth.ts` failed because `isAdminActor` did not exist | Same command: `✓ admin authorization: all checks passed` |
| Telegram application-level rejection | Delivery check failed `true !== false` for HTTP 200 with `{ ok: false }` | Delivery check passed after Bot API payload validation |

## Test specification

| # | Guarantee | Test/command | Type | Result |
|---|---|---|---|---|
| 1 | Root screens hide Back; every nested screen resolves to the intended destination | `scripts/test-navigation.ts` | UI policy/static integration | PASS |
| 2 | Visible Back controls and Telegram's native BackButton share one handler | `scripts/test-navigation.ts` | UI integration | PASS |
| 3 | A support reply is persisted before Telegram delivery is attempted | `scripts/test-support-delivery.ts` | Unit | PASS |
| 4 | D1 failure prevents a Telegram-only orphan message | `scripts/test-support-delivery.ts` | Unit | PASS |
| 5 | Telegram HTTP, application, and transport failures return `delivered=false` without removing the in-app copy | `scripts/test-support-delivery.ts` | Unit | PASS |
| 6 | Bot message text is HTML-escaped and sent to the supplied resolved Telegram ID | `scripts/test-support-delivery.ts` | Unit | PASS |
| 7 | Wildcard/empty admin configuration fails closed | `scripts/test-admin-auth.ts` | Security unit | PASS |
| 8 | Unauthorized callback and `/approve` actors cannot reach D1 mutations | `scripts/test-admin-auth.ts` | Security integration | PASS |
| 9 | Support input normalization and unread-direction semantics remain correct | `scripts/test-support.ts` | Unit | PASS |
| 10 | Telegram relay distinguishes admin/channel messages from customer messages | `scripts/test-support-relay.ts` | Unit | PASS |
| 11 | All migrations, including `0010_support_messages.sql`, apply to an isolated D1 database | Wrangler local migration command with `/tmp/patente-support-validation.Zx1dtu` | DB integration | PASS |
| 12 | Internal `users.id` maps to exactly one stored `telegram_user_id` in the support join | Wrangler local D1 insert/select validation | DB integration | PASS |

## Regression and build evidence

- `npx tsc --noEmit` — PASS.
- `node --check public/js/app.js` — PASS.
- `node --check public/js/exam.js` — PASS.
- `node --check public/js/navigation.js` — PASS.
- Wrangler deploy dry-run with isolated config/log paths — PASS, 299.49 KiB upload / 61.77 KiB gzip.
- `npx tsx scripts/test-trial.ts` — PASS.
- `npx tsx scripts/test-srs.ts` — PASS.
- `npx tsx scripts/test-sign-grounding.ts` — PASS.
- `git diff --check` — PASS.

## Coverage and known gaps

The repository has no configured test runner or coverage command, so a numeric coverage percentage is not available. The focused self-checks exercise the new pure rules, failure paths, authorization decisions, Bot API request payload, and static screen integration; real Telegram delivery was intentionally mocked to avoid sending a message to a production user. Remote D1 migration, deployment, and a live bot delivery still require the operator's production rollout.

No TDD checkpoint commits were created because the worktree already contained user-owned changes and the repository metadata is read-only in this environment. RED/GREEN evidence is preserved here instead.
