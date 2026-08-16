/**
 * src/lib/telegram.ts
 * Thin fetch() wrapper around the Telegram Bot API.
 */

export interface SendMessageOpts {
  chat_id: number | string;
  text: string;
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
  reply_markup?: object;
  disable_web_page_preview?: boolean;
}

export interface InlineKeyboardButton {
  text: string;
  url?: string;
  callback_data?: string;
  web_app?: { url: string };
}

/** Returns whether Telegram accepted the message. Existing callers may ignore it. */
export async function sendMessage(
  token: string,
  opts: SendMessageOpts
): Promise<boolean> {
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(opts),
    });
    const body = await res.text();
    if (!res.ok) {
      console.error("Telegram sendMessage failed:", res.status, body);
      return false;
    }

    if (body) {
      try {
        const payload = JSON.parse(body) as { ok?: boolean; description?: string };
        if (payload.ok === false) {
          console.error("Telegram sendMessage rejected:", payload.description || "unknown Bot API error");
          return false;
        }
      } catch {
        // A successful non-JSON proxy response is still an accepted HTTP send.
      }
    }
    return true;
  } catch (error) {
    // Bot API transport failures are expected operational failures (timeouts,
    // DNS, a blocked bot). Callers can keep their durable in-app fallback and
    // accurately report delivered=false instead of turning the request into 500.
    console.error("Telegram sendMessage transport failed:", error);
    return false;
  }
}

export async function editMessageText(
  token: string,
  opts: {
    chat_id: number | string;
    message_id: number;
    text: string;
    parse_mode?: "HTML" | "Markdown";
    reply_markup?: object;
  }
): Promise<void> {
  const res = await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(opts),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error("Telegram editMessageText failed:", res.status, body);
  }
}

/** Escape text interpolated into a parse_mode: "HTML" message. */
export function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Inline keyboard shown on an inbound support message in the log channel. */
export function supportCardKeyboard(targetUserId: number): { inline_keyboard: InlineKeyboardButton[][] } {
  return {
    inline_keyboard: [
      [{ text: "💬 پاسخ به کاربر", callback_data: `reply_user:${targetUserId}` }],
      [
        { text: "✅ تایید دسترسی", callback_data: `approve_user:${targetUserId}` },
        { text: "❌ رد درخواست", callback_data: `reject_user:${targetUserId}` },
      ],
    ],
  };
}

/**
 * Post an inbound support message into the log channel with a reply
 * affordance. Both entry points (a DM to the bot, and the Mini App support
 * screen) go through here so the admin sees one consistent card.
 */
export async function notifySupportMessage(
  token: string,
  logChannelId: string,
  msg: {
    telegramUserId: number;
    firstName: string;
    username?: string | null;
    text: string;
    via: "app" | "telegram";
  }
): Promise<void> {
  const channel = logChannelId || "@patente_fa_logs";
  const usernameSafe = msg.username ? "@" + esc(msg.username) : "ندارد";
  const viaLabel = msg.via === "app" ? "مینی‌اپ" : "چت ربات";

  await sendMessage(token, {
    chat_id: channel,
    text:
      `📨 <b>پیام جدید از کاربر</b> <i>(${viaLabel})</i>\n\n` +
      `👤 <b>نام</b>: ${esc(msg.firstName)}\n` +
      `🏷️ <b>نام کاربری</b>: ${usernameSafe}\n` +
      `🆔 <b>آیدی</b>: <code>${msg.telegramUserId}</code>\n\n` +
      `💬 «<i>${esc(msg.text)}</i>»`,
    parse_mode: "HTML",
    reply_markup: supportCardKeyboard(msg.telegramUserId),
  });
}

/**
 * Deliver a support reply to the user as an anonymous DM from the bot.
 *
 * The single place that formats an outbound reply: no admin name, no admin id,
 * no forwarded message — the customer only ever sees "پشتیبانی PatenteFa".
 * Returns whether Telegram accepted it. A blocked/unstarted bot, Bot API
 * rejection, or transport failure returns false; the in-app reply still lives.
 */
export async function sendSupportReply(
  token: string,
  telegramUserId: number,
  text: string
): Promise<boolean> {
  return sendMessage(token, {
    chat_id: telegramUserId,
    text:
      `💬 <b>پیام از پشتیبانی PatenteFa</b>\n\n` +
      `${esc(text)}\n\n` +
      `<i>برای پاسخ، همین‌جا بنویسید.</i>`,
    parse_mode: "HTML",
  });
}

export async function notifyAdminNewUserRequest(
  token: string,
  logChannelId: string,
  user: { telegramUserId: number; firstName: string; username?: string; funAnswer?: string }
): Promise<void> {
  const channel = logChannelId || "@patente_fa_logs";
  const nameSafe = user.firstName.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const usernameSafe = user.username ? "@" + user.username.replace(/</g, "&lt;") : "ندارد";
  const answerSafe = user.funAnswer
    ? user.funAnswer.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    : "آره خیلی زیاد!";

  const text =
    `🔔 <b>درخواست دسترسی جدید به PatenteFa</b>\n\n` +
    `👤 <b>کاربر</b>: ${nameSafe}\n` +
    `🆔 <b>آیدی تلگرام</b>: <code>${user.telegramUserId}</code>\n` +
    `🏷️ <b>نام کاربری</b>: ${usernameSafe}\n\n` +
    `💬 <b>توضیحات / پیام کاربر</b>:\n` +
    `«<i>${answerSafe}</i>»\n\n` +
    `🎯 <i>هدف: قبولی در آزمون تئوری در ۴ ماه با بالاترین آمادگی 🚗💨</i>\n\n` +
    `لطفاً جهت بررسی و فعال‌سازی دسترسی، دکمه زیر را انتخاب کنید:`;

  const reply_markup = {
    inline_keyboard: [
      [
        { text: "✅ تایید دسترسی", callback_data: `approve_user:${user.telegramUserId}` },
        { text: "❌ رد درخواست", callback_data: `reject_user:${user.telegramUserId}` },
      ],
      [
        { text: "💬 پاسخ به کاربر", callback_data: `reply_user:${user.telegramUserId}` },
      ],
      [
        { text: "👥 لیست و مدیریت کاربران", callback_data: "admin_list_users" },
      ],
    ],
  };

  await sendMessage(token, {
    chat_id: channel,
    text,
    parse_mode: "HTML",
    reply_markup,
  });
}

export async function sendDocument(
  token: string,
  chatId: number | string,
  filename: string,
  content: string,
  caption?: string
): Promise<void> {
  const form = new FormData();
  form.append("chat_id", String(chatId));
  form.append("document", new Blob([content], { type: "application/json" }), filename);
  if (caption) form.append("caption", caption);

  const res = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const body = await res.text();
    console.error("Telegram sendDocument failed:", res.status, body);
  }
}

export async function setWebhook(
  token: string,
  url: string,
  secret: string
): Promise<void> {
  const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // channel_post is not optional: the admin's replies are posted in the log
    // channel, and leaving it out silently kills the outbound leg of the
    // support relay. Keep in sync with scripts/repoint-telegram.sh.
    body: JSON.stringify({
      url,
      secret_token: secret,
      allowed_updates: ["message", "callback_query", "channel_post"],
    }),
  });
  const body = await res.json() as { ok: boolean; description?: string };
  if (!body.ok) throw new Error(`setWebhook failed: ${body.description}`);
  console.log("Webhook set:", url);
}

export async function answerCallbackQuery(
  token: string,
  callbackQueryId: string,
  text?: string
): Promise<void> {
  await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callback_query_id: callbackQueryId, text }),
  });
}

export function buildMiniAppButton(
  text: string,
  miniAppUrl: string
): { inline_keyboard: InlineKeyboardButton[][] } {
  return {
    inline_keyboard: [[{ text, web_app: { url: miniAppUrl } }]],
  };
}

export function buildUrlButton(
  text: string,
  url: string
): { inline_keyboard: InlineKeyboardButton[][] } {
  return { inline_keyboard: [[{ text, url }]] };
}
