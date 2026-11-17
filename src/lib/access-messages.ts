/**
 * src/lib/access-messages.ts
 * Text of the automatic access reminders. Every message answers the four
 * questions a user has: what is ending, when, what it costs, how to pay —
 * and ends with the one next step (reply here with the receipt).
 */
import { esc, formatDateFa } from "./telegram.js";
import type { AccessOfferSettings } from "../db/queries.js";

export type AccessReminderKind = "ends_3d" | "ends_1d" | "expired";

export interface AccessReminderInput {
  kind: AccessReminderKind;
  firstName: string | null;
  expiresAt: string; // UTC 'YYYY-MM-DD HH:MM:SS'
  isTrial: boolean;
  offer: AccessOfferSettings;
}

function offerBlock(offer: AccessOfferSettings, keepsDays: boolean): string {
  const plans = offer.plansText.trim();
  const payment = offer.paymentText.trim();
  if (!plans && !payment) return "برای تمدید، همین‌جا به پشتیبانی پیام بده. 💬";
  return (
    (plans ? `<b>اشتراک:</b>\n${esc(plans)}\n\n` : "") +
    (payment ? `💳 <b>روش پرداخت:</b>\n${esc(payment)}\n\n` : "") +
    `بعد از پرداخت، رسیدش رو همین‌جا بفرست تا دسترسی‌ات همون روز تمدید بشه.` +
    (keepsDays ? ` روزهای باقی‌مونده هم از بین نمی‌ره و به اشتراک اضافه می‌شه.` : "")
  );
}

export function buildAccessReminder(input: AccessReminderInput): { html: string; plain: string } {
  const name = input.firstName?.trim() ? `${esc(input.firstName.trim())}، ` : "";
  const what = input.isTrial ? "دوره رایگانت" : "دسترسی‌ات";
  const date = esc(formatDateFa(input.expiresAt));

  const head =
    input.kind === "ends_3d"
      ? `⏳ <b>${name}${what} به پتنت فارسی رو به اتمامه</b>\n\nتاریخ پایان: <b>${date}</b>`
      : input.kind === "ends_1d"
      ? `⏰ <b>${name}کمتر از ۲۴ ساعت از ${what} باقی مونده</b>\n\nتاریخ پایان: <b>${date}</b>`
      : `🔒 <b>${name}${what} به پتنت فارسی تموم شد</b>\n\nتمرین‌ها و پیشرفتت ذخیره شده؛ با تمدید از همون‌جا ادامه می‌دی.`;

  const html = `${head}\n\n${offerBlock(input.offer, input.kind !== "expired")}`;
  // Plain copy for the support thread, so the admin sees exactly what was sent.
  const plain = html
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
  return { html, plain };
}
