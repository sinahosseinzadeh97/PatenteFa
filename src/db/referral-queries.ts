/**
 * src/db/referral-queries.ts
 * Invite links (features.md §53): one code per user, who invited whom, the
 * friend's welcome bonus, and the inviter's one-time reward on the friend's first payment.
 */

import { INVITEE_BONUS_DAYS, newReferralCode, referralCodeFromStart, REFERRER_REWARD_DAYS } from "../lib/referral.js";
import { getUserById, grantAccess, type DbUser } from "./queries.js";

const CODE_ATTEMPTS = 5;

/** The user's invite code, created on first use. */
export async function getOrCreateReferralCode(db: D1Database, userId: number): Promise<string> {
  for (let attempt = 0; attempt < CODE_ATTEMPTS; attempt++) {
    const row = await db.prepare(`SELECT referral_code FROM users WHERE id = ?`).bind(userId).first<{ referral_code: string | null }>();
    if (!row) throw new Error(`referral code: user ${userId} not found`);
    if (row.referral_code) return row.referral_code;
    try {
      await db.prepare(`UPDATE users SET referral_code = ? WHERE id = ? AND referral_code IS NULL`).bind(newReferralCode(), userId).run();
    } catch (error) {
      // Only a collision with another user's code (the UNIQUE index) is expected; retry with a new one.
      if (!String(error).includes("UNIQUE")) throw error;
    }
  }
  throw new Error(`referral code: no free code for user ${userId} after ${CODE_ATTEMPTS} attempts`);
}

/**
 * A brand-new user who started the bot with someone's link: record who invited
 * them and add the welcome bonus. Returns the updated user, or null when the
 * start text carries no valid code. First inviter wins; self and blocked inviters never count.
 */
export async function applyInviteBonus(db: D1Database, inviteeId: number, startText: string): Promise<DbUser | null> {
  const code = referralCodeFromStart(startText);
  if (!code) return null;
  const recorded = await db
    .prepare(
      `INSERT OR IGNORE INTO referrals (invitee_user_id, referrer_user_id)
       SELECT ?, id FROM users WHERE referral_code = ? AND id <> ? AND is_approved <> -1`
    )
    .bind(inviteeId, code, inviteeId)
    .run();
  if ((recorded.meta.changes ?? 0) === 0) return null;
  return grantAccess(db, inviteeId, { kind: "gift", days: INVITEE_BONUS_DAYS, note: "referral: invite bonus" });
}

/**
 * On a friend's payment: 30 days for whoever invited them, the first time only.
 * Returns the inviter when their access changed now. An inviter with unlimited
 * access is left unlimited (a gift would cut them down to 30 days); the payment
 * still counts in their stats.
 */
export async function rewardReferrer(db: D1Database, inviteeId: number): Promise<DbUser | null> {
  // Claim first: a concurrent second payment finds rewarded_at set and gives nothing.
  const claim = await db
    .prepare(
      `UPDATE referrals SET rewarded_at = datetime('now')
       WHERE invitee_user_id = ? AND rewarded_at IS NULL
       RETURNING referrer_user_id`
    )
    .bind(inviteeId)
    .first<{ referrer_user_id: number }>();
  if (!claim) return null;
  const inviter = await getUserById(db, claim.referrer_user_id);
  if (!inviter || (inviter.is_approved === 1 && inviter.access_expires_at === null)) return null;
  return grantAccess(db, inviter.id, { kind: "gift", days: REFERRER_REWARD_DAYS, note: `referral: user #${inviteeId} paid` });
}

export async function getReferralStats(db: D1Database, userId: number): Promise<{ invited: number; paid: number }> {
  const row = await db
    .prepare(
      `SELECT COUNT(*) AS invited, COALESCE(SUM(rewarded_at IS NOT NULL), 0) AS paid
       FROM referrals WHERE referrer_user_id = ?`
    )
    .bind(userId)
    .first<{ invited: number; paid: number }>();
  return { invited: row?.invited ?? 0, paid: row?.paid ?? 0 };
}
