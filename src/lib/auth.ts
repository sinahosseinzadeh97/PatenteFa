/**
 * src/lib/auth.ts
 *
 * Telegram initData HMAC-SHA256 verification.
 * Spec: https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 *
 * On every /api/* request the client sends the raw initData string in the
 * X-Telegram-InitData header. This middleware verifies the signature and
 * extracts the user object from it.
 */

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface InitDataPayload {
  user: TelegramUser;
  chat_instance?: string;
  chat_type?: string;
  auth_date: number;
  hash: string;
}

/**
 * Verify the Telegram initData string and return the parsed payload.
 * Throws a Response (401) on failure so callers can just `await verifyInitData(...)`.
 */
export async function verifyInitData(
  initData: string,
  botToken: string
): Promise<InitDataPayload> {
  const params = new URLSearchParams(initData);
  const receivedHash = params.get("hash");
  if (!receivedHash) throw unauthorised("Missing hash in initData");

  // Build the data-check string: all fields except hash, sorted alphabetically, joined by \n
  params.delete("hash");
  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("\n");

  // HMAC-SHA256(data_check_string, key=HMAC-SHA256("WebAppData", bot_token))
  const enc = new TextEncoder();
  const secretKey = await crypto.subtle.importKey(
    "raw",
    enc.encode("WebAppData"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const secretKeyBytes = await crypto.subtle.sign("HMAC", secretKey, enc.encode(botToken));

  const dataKey = await crypto.subtle.importKey(
    "raw",
    secretKeyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBytes = await crypto.subtle.sign("HMAC", dataKey, enc.encode(dataCheckString));

  const expectedHash = Array.from(new Uint8Array(signatureBytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Constant-time comparison
  if (!timingSafeEqual(expectedHash, receivedHash)) {
    throw unauthorised("Invalid initData signature");
  }

  // Check auth_date freshness — allow up to 24 h so long exam sessions
  // (or users who reopen the Mini App) don't get 401 on translate/vocab calls.
  const authDate = Number(params.get("auth_date") ?? 0);
  const now = Math.floor(Date.now() / 1000);
  if (now - authDate > 86400) {
    throw unauthorised("initData expired");
  }


  const userRaw = params.get("user");
  if (!userRaw) throw unauthorised("No user in initData");

  let user: TelegramUser;
  try {
    user = JSON.parse(userRaw);
  } catch {
    throw unauthorised("Malformed user in initData");
  }

  return {
    user,
    chat_instance: params.get("chat_instance") ?? undefined,
    chat_type: params.get("chat_type") ?? undefined,
    auth_date: authDate,
    hash: receivedHash,
  };
}

/**
 * Check that the user's Telegram ID is in the allow-list env var.
 * Fails closed if ALLOWED_TELEGRAM_USER_IDS is missing or empty.
 */
export function checkAllowList(userId: number, allowedIds: string | undefined): void {
  if (!allowedIds || allowedIds.trim() === "") {
    console.warn("⚠️ SECURITY WARNING: ALLOWED_TELEGRAM_USER_IDS is missing or empty. Denying access (fail-closed).");
    throw new Response(JSON.stringify({ error: "Forbidden: ALLOWED_TELEGRAM_USER_IDS is not configured (fail-closed)" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const parts = allowedIds
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.includes("*")) {
    return; // Explicit wildcard allow all
  }

  const ids = parts.map(Number).filter(Boolean);
  if (!ids.includes(userId)) {
    throw new Response(JSON.stringify({ error: "Forbidden: user not on allow-list" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }
}

function unauthorised(msg: string): Response {
  return new Response(JSON.stringify({ error: msg }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
