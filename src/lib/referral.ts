/**
 * src/lib/referral.ts
 * Invite links (features.md §53). Pure helpers: no DB, no network.
 */

/** The bot's public username; public/index.html links to the same bot. */
export const BOT_USERNAME = "Govahinamehitalybot";
/** Extra trial days for a friend who starts the bot with someone's link. */
export const INVITEE_BONUS_DAYS = 7;
/** Days added for the inviter when that friend first pays. */
export const REFERRER_REWARD_DAYS = 30;

const START_CODE = /^\/start\s+r_([a-z0-9]{8})(?:\s|$)/;
const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

/** "/start r_ab12cd34" → "ab12cd34". Any other start (start=web, no payload) → null. */
export function referralCodeFromStart(text: string): string | null {
  return START_CODE.exec(text.trim())?.[1] ?? null;
}

/** 8 random characters from a–z0–9: unguessable, short enough for a link, reveals no user id. */
export function newReferralCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

export function referralLink(code: string): string {
  return `https://t.me/${BOT_USERNAME}?start=r_${code}`;
}
