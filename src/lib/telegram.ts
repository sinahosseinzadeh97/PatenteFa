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

export async function sendMessage(
  token: string,
  opts: SendMessageOpts
): Promise<void> {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(opts),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error("Telegram sendMessage failed:", res.status, body);
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
    body: JSON.stringify({ url, secret_token: secret, allowed_updates: ["message", "callback_query"] }),
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
