/**
 * src/api/referral.ts
 * GET /api/referral — the user's invite link and how it has done (features.md §53).
 */

import { Hono } from "hono";
import type { AppEnv, AppVariables } from "../types.js";
import { getOrCreateReferralCode, getReferralStats } from "../db/referral-queries.js";
import { TRIAL_DAYS } from "../db/queries.js";
import { INVITEE_BONUS_DAYS, REFERRER_REWARD_DAYS, referralLink } from "../lib/referral.js";

const referral = new Hono<{ Bindings: AppEnv; Variables: AppVariables }>();

referral.get("/", async (c) => {
  const userId: number = c.get("userId" as never);
  const [code, stats] = await Promise.all([
    getOrCreateReferralCode(c.env.DB, userId),
    getReferralStats(c.env.DB, userId),
  ]);
  return c.json({
    link: referralLink(code),
    invited: stats.invited,
    paid: stats.paid,
    rewardDays: stats.paid * REFERRER_REWARD_DAYS,
    trialDays: TRIAL_DAYS,
    inviteeBonusDays: INVITEE_BONUS_DAYS,
    rewardDaysPerFriend: REFERRER_REWARD_DAYS,
  });
});

export { referral };
