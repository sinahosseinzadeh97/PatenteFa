#!/usr/bin/env bash
# Repoint the Telegram bot at the production domain.
#
# Needed after moving off the workers.dev subdomain: Telegram stores the webhook
# and Mini App URLs on ITS side, so a Cloudflare deploy alone doesn't move them.
# Reads credentials from .dev.vars; nothing is printed.
set -euo pipefail

cd "$(dirname "$0")/.."

BASE="${1:-https://patentefarsi.online}"

get() { grep -m1 "^$1=" .dev.vars | cut -d= -f2- | tr -d '"'"'"' ' ; }
TOKEN="$(get TELEGRAM_BOT_TOKEN)"
SECRET="$(get TELEGRAM_WEBHOOK_SECRET)"

[ -n "$TOKEN" ]  || { echo "✗ TELEGRAM_BOT_TOKEN missing from .dev.vars"; exit 1; }
[ -n "$SECRET" ] || { echo "✗ TELEGRAM_WEBHOOK_SECRET missing from .dev.vars"; exit 1; }

api() { curl -sS "https://api.telegram.org/bot${TOKEN}/$1" -H 'Content-Type: application/json' -d "$2"; }

echo "→ webhook  → ${BASE}/webhook/telegram"
api setWebhook "$(printf '{"url":"%s/webhook/telegram","secret_token":"%s","allowed_updates":["message","callback_query","channel_post"]}' "$BASE" "$SECRET")" \
  | python3 -c 'import sys,json;d=json.load(sys.stdin);print(("  ✓ " if d.get("ok") else "  ✗ ")+str(d.get("description") or d.get("result")))'

echo "→ menu button → ${BASE}/app"
api setChatMenuButton "$(printf '{"menu_button":{"type":"web_app","text":"📖 PatenteFa","web_app":{"url":"%s/app"}}}' "$BASE")" \
  | python3 -c 'import sys,json;d=json.load(sys.stdin);print(("  ✓ " if d.get("ok") else "  ✗ ")+str(d.get("description") or d.get("result")))'

echo
echo "→ verifying"
curl -sS "https://api.telegram.org/bot${TOKEN}/getWebhookInfo" | python3 -c '
import sys,json
r=json.load(sys.stdin)["result"]
print("  webhook :",r.get("url"))
print("  pending :",r.get("pending_update_count"))
print("  error   :",r.get("last_error_message") or "none")'
curl -sS "https://api.telegram.org/bot${TOKEN}/getChatMenuButton" | python3 -c '
import sys,json
print("  menu    :",json.load(sys.stdin)["result"].get("web_app",{}).get("url"))'

echo
echo "Still to do (changes the production Worker):"
echo "  echo -n \"${BASE}/app\" | npx wrangler secret put MINI_APP_URL"
