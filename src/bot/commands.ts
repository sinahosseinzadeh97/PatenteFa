/**
 * src/bot/commands.ts
 * Telegram bot command handlers.
 */

import {
  sendMessage,
  buildMiniAppButton,
  buildUrlButton,
  answerCallbackQuery,
  editMessageText,
  notifyAdminNewUserRequest,
} from "../lib/telegram.js";
import {
  upsertUser,
  setUserApproval,
  getAllUsers,
  getPendingReviewCount,
  getStreak,
  getTopicAccuracy,
  getUserByTelegramId,
} from "../db/queries.js";
import { checkAllowList } from "../lib/auth.js";

export interface BotContext {
  db: D1Database;
  token: string;
  allowedIds: string;
  logChannelId?: string;
  miniAppUrl: string;
}

interface TelegramUpdate {
  message?: {
    message_id: number;
    from?: {
      id: number;
      first_name: string;
      username?: string;
    };
    chat: { id: number };
    text?: string;
  };
  channel_post?: {
    message_id: number;
    from?: {
      id: number;
      first_name: string;
      username?: string;
    };
    chat: { id: number };
    text?: string;
  };
  callback_query?: {
    id: string;
    from: { id: number; first_name: string; username?: string };
    data?: string;
    message?: { chat: { id: number }; message_id: number };
  };
}

export async function handleUpdate(
  update: TelegramUpdate,
  ctx: BotContext
): Promise<void> {
  // Handle inline callback buttons for user approval/revocation/list from log channel
  if (update.callback_query) {
    const cb = update.callback_query;
    const data = cb.data || "";

    if (data === "admin_list_users") {
      await answerCallbackQuery(ctx.token, cb.id, "در حال بروزرسانی لیست کاربران… 🔄");
      if (cb.message) {
        await handleListUsers(cb.message.chat.id, ctx, cb.message.message_id);
      }
      return;
    }

    if (data.startsWith("approve_user:")) {
      const targetUserId = Number(data.split(":")[1]);
      await setUserApproval(ctx.db, targetUserId, 1);
      await answerCallbackQuery(ctx.token, cb.id, "کاربر با موفقیت تایید شد! ✅");

      if (cb.message) {
        await editMessageText(ctx.token, {
          chat_id: cb.message.chat.id,
          message_id: cb.message.message_id,
          text: `✅ <b>دسترسی تایید شد</b>\n👤 آیدی کاربر: <code>${targetUserId}</code> توسط مدیریت تایید گردید.`,
          parse_mode: "HTML",
        });
      }

      // Send private notification to approved user
      await sendMessage(ctx.token, {
        chat_id: targetUserId,
        text: `🎉 <b>تبریک! حساب کاربری شما تایید شد.</b>\n\nاکنون می‌توانید مینی‌اپ PatenteFa را باز کرده و تمرینات را آغاز کنید. 🚗`,
        parse_mode: "HTML",
        reply_markup: buildMiniAppButton("🚗 باز کردن PatenteFa", ctx.miniAppUrl),
      });
      return;
    }

    if (data.startsWith("reject_user:") || data.startsWith("revoke_user:")) {
      const targetUserId = Number(data.split(":")[1]);
      await setUserApproval(ctx.db, targetUserId, -1);
      await answerCallbackQuery(ctx.token, cb.id, "دسترسی کاربر لغو گردید 🚫");

      if (cb.message) {
        await editMessageText(ctx.token, {
          chat_id: cb.message.chat.id,
          message_id: cb.message.message_id,
          text: `🚫 <b>دسترسی کاربر لغو گردید</b>\n👤 آیدی کاربر: <code>${targetUserId}</code> توسط مدیریت لغو شد.`,
          parse_mode: "HTML",
        });
      }

      // Send notification to revoked user
      await sendMessage(ctx.token, {
        chat_id: targetUserId,
        text: `🚫 <b>دسترسی شما به مینی‌اپ PatenteFa لغو گردید.</b>\n\nدر صورت نیاز می‌توانید مجدداً از طریق مینی‌اپ درخواست تایید ارسال کنید.`,
        parse_mode: "HTML",
      });
      return;
    }
  }

  // Handle standard messages AND channel posts
  const msg = update.message || update.channel_post;
  if (!msg?.text) return;

  const telegramUserId = msg.from?.id || msg.chat.id;
  const firstName = msg.from?.first_name || "مدیریت";
  const username = msg.from?.username;
  const chatId = msg.chat.id;
  const text = msg.text.trim();

  // Command dispatch
  if (text.startsWith("/start") || text.startsWith("/panel") || text.startsWith("/admin")) {
    await handleStart(telegramUserId, firstName, username, chatId, ctx);
  } else if (text.startsWith("/users") || text.startsWith("/list")) {
    await handleListUsers(chatId, ctx);
  } else if (text.startsWith("/approve")) {
    const parts = text.split(" ");
    const targetId = Number(parts[1]);
    if (targetId) {
      await setUserApproval(ctx.db, targetId, 1);
      await sendMessage(ctx.token, {
        chat_id: chatId,
        text: `✅ دسترسی کاربر <code>${targetId}</code> با موفقیت تایید شد.`,
        parse_mode: "HTML",
      });
      await sendMessage(ctx.token, {
        chat_id: targetId,
        text: `🎉 <b>حساب کاربری شما تایید شد!</b>\nاکنون می‌توانید مینی‌اپ PatenteFa را باز کنید. 🚗`,
        parse_mode: "HTML",
        reply_markup: buildMiniAppButton("🚗 باز کردن PatenteFa", ctx.miniAppUrl),
      });
    }
  } else if (text.startsWith("/revoke") || text.startsWith("/block")) {
    const parts = text.split(" ");
    const targetId = Number(parts[1]);
    if (targetId) {
      await setUserApproval(ctx.db, targetId, -1);
      await sendMessage(ctx.token, {
        chat_id: chatId,
        text: `🚫 دسترسی کاربر <code>${targetId}</code> لغو شد.`,
        parse_mode: "HTML",
      });
      await sendMessage(ctx.token, {
        chat_id: targetId,
        text: `🚫 <b>دسترسی شما به مینی‌اپ PatenteFa لغو گردید.</b>`,
        parse_mode: "HTML",
      });
    }
  } else if (text.startsWith("/oggi")) {
    await handleOggi(telegramUserId, chatId, ctx);
  } else if (text.startsWith("/review")) {
    await handleReview(telegramUserId, chatId, ctx);
  } else if (text.startsWith("/vocab")) {
    await handleVocab(telegramUserId, chatId, ctx);
  } else if (text.startsWith("/stats")) {
    await handleStats(telegramUserId, chatId, ctx);
  }
}

async function handleListUsers(
  chatId: number | string,
  ctx: BotContext,
  editMessageId?: number
): Promise<void> {
  const users = await getAllUsers(ctx.db);
  if (!users || users.length === 0) {
    const text = "هیچ کاربری در دیتابیس ثبت نشده است.";
    if (editMessageId) {
      await editMessageText(ctx.token, { chat_id: chatId, message_id: editMessageId, text });
    } else {
      await sendMessage(ctx.token, { chat_id: chatId, text });
    }
    return;
  }

  let text = `👥 <b>پنل مدیریت کاربران PatenteFa</b> (مجموع: ${users.length} نفر)\n\n`;
  const inlineKeyboard: any[][] = [];

  users.forEach((u, i) => {
    const statusEmoji =
      u.is_approved === 1
        ? "✅ تایید شده"
        : u.is_approved === -1
        ? "🔴 لغو شده / مسدود"
        : "⏳ در انتظار تایید";
    const nameStr = (u.first_name || "کاربر").replace(/</g, "&lt;");
    const unameStr = u.username ? "@" + u.username : "ندارد";

    text += `${i + 1}. <b>${nameStr}</b> (${unameStr})\n`;
    text += `   🆔 <code>${u.telegram_user_id}</code> | وضعیت: ${statusEmoji}\n\n`;

    if (u.is_approved === 1) {
      inlineKeyboard.push([
        { text: `🚫 لغو دسترسی ${nameStr}`, callback_data: `revoke_user:${u.telegram_user_id}` },
      ]);
    } else {
      inlineKeyboard.push([
        { text: `✅ تایید ${nameStr}`, callback_data: `approve_user:${u.telegram_user_id}` },
      ]);
    }
  });

  // Refresh button at bottom
  inlineKeyboard.push([
    { text: "🔄 بروزرسانی لیست کاربران", callback_data: "admin_list_users" },
  ]);

  const reply_markup = { inline_keyboard: inlineKeyboard.slice(0, 15) };

  if (editMessageId) {
    await editMessageText(ctx.token, {
      chat_id: chatId,
      message_id: editMessageId,
      text,
      parse_mode: "HTML",
      reply_markup,
    });
  } else {
    await sendMessage(ctx.token, {
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      reply_markup,
    });
  }
}

async function handleStart(
  telegramUserId: number,
  firstName: string,
  username: string | undefined,
  chatId: number,
  ctx: BotContext
): Promise<void> {
  const allowedParts = (ctx.allowedIds || "").split(",").map((s) => s.trim()).filter(Boolean);
  const isAdmin = allowedParts.map(Number).includes(telegramUserId);

  const dbUser = await upsertUser(ctx.db, telegramUserId, firstName, username, isAdmin);

  if (dbUser.is_approved !== 1) {
    if (!isAdmin) {
      await setUserApproval(ctx.db, telegramUserId, 0);
    }
    await notifyAdminNewUserRequest(ctx.token, ctx.logChannelId || "@patente_fa_logs", {
      telegramUserId,
      firstName,
      username,
    });

    await sendMessage(ctx.token, {
      chat_id: chatId,
      text:
        `سلام ${firstName}! 👋\n\n` +
        `درخواست دسترسی شما برای مدیریت ارسال گردید. ⏳\n` +
        `به محض تایید مدیریت در کانال اطلاع‌رسانی، دسترسی شما فعال می‌شود و پیام تایید برای شما ارسال خواهد شد.`,
    });
    return;
  }

  let daysToExam: number | null = null;
  if (dbUser.target_exam_date) {
    const target = new Date(dbUser.target_exam_date);
    const now = new Date();
    daysToExam = Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86_400_000));
  }

  const greeting =
    `سلام ${firstName}! 👋\n` +
    `به **PatenteFa** خوش آمدید 🇮🇹🇮🇷\n\n` +
    `💎 **راهکار هوشمند قبولی در آزمون تئوری پاتنته B**\n\n` +
    `با توجه به افزایش قیمت یورو و هزینه‌های سنگین ۱۵۰ تا ۱۶۰ یورویی پکیج‌های آموزشی موجود در بازار، سامانه **PatenteFa** به گونه‌ای طراحی شده است که شما را ظرف مدت ۳ تا ۴ ماه، با بالاترین کیفیت و تنها با یک‌سوم هزینه پکیج‌های مشابه، آماده قبولی در آزمون اصلی تئوری کند.\n\n` +
    (daysToExam !== null
      ? `📅 ${daysToExam} روز تا تاریخ آزمون شما باقی مانده است.\n\n`
      : "") +
    `جهت ورود به مینی‌اپ و شروع تمرین، روی دکمه زیر کلیک کنید 👇`;

  await sendMessage(ctx.token, {
    chat_id: chatId,
    text: greeting,
    parse_mode: "Markdown",
    reply_markup: buildMiniAppButton("🚗 باز کردن PatenteFa", ctx.miniAppUrl),
  });
}

async function handleOggi(
  telegramUserId: number,
  chatId: number,
  ctx: BotContext
): Promise<void> {
  try { checkAllowList(telegramUserId, ctx.allowedIds); } catch { return; }

  const url = `${ctx.miniAppUrl}?screen=exam`;
  await sendMessage(ctx.token, {
    chat_id: chatId,
    text: "بریم یه آزمون جدید! 🚦",
    reply_markup: buildMiniAppButton("📝 شروع آزمون", url),
  });
}

async function handleReview(
  telegramUserId: number,
  chatId: number,
  ctx: BotContext
): Promise<void> {
  try { checkAllowList(telegramUserId, ctx.allowedIds); } catch { return; }

  const user = await getUserByTelegramId(ctx.db, telegramUserId);
  if (!user) return;

  const count = await getPendingReviewCount(ctx.db, user.id);
  if (count === 0) {
    await sendMessage(ctx.token, {
      chat_id: chatId,
      text: "هیچ سوالی برای مرور نداری! 🎉 برو یه آزمون جدید بزن.",
    });
    return;
  }

  const url = `${ctx.miniAppUrl}?screen=review`;
  await sendMessage(ctx.token, {
    chat_id: chatId,
    text: `${count} سوال برای مرور داری 📚 بریم!`,
    reply_markup: buildMiniAppButton("🔁 مرور اشتباهات", url),
  });
}

async function handleVocab(
  telegramUserId: number,
  chatId: number,
  ctx: BotContext
): Promise<void> {
  try { checkAllowList(telegramUserId, ctx.allowedIds); } catch { return; }

  const url = `${ctx.miniAppUrl}?screen=vocab`;
  await sendMessage(ctx.token, {
    chat_id: chatId,
    text: "لغات ایتالیایی-فارسی 📖",
    reply_markup: buildMiniAppButton("📚 لغت‌نامه", url),
  });
}

async function handleStats(
  telegramUserId: number,
  chatId: number,
  ctx: BotContext
): Promise<void> {
  try { checkAllowList(telegramUserId, ctx.allowedIds); } catch { return; }

  const user = await getUserByTelegramId(ctx.db, telegramUserId);
  if (!user) return;

  const [streak, topicAccuracy] = await Promise.all([
    getStreak(ctx.db, user.id),
    getTopicAccuracy(ctx.db, user.id),
  ]);

  let daysToExam: number | null = null;
  if (user.target_exam_date) {
    const target = new Date(user.target_exam_date);
    const now = new Date();
    daysToExam = Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86_400_000));
  }

  const weakest = topicAccuracy[0];
  const statsText =
    `📊 آمار شما:\n\n` +
    `🔥 streak: ${streak} روز\n` +
    (daysToExam !== null ? `📅 ${daysToExam} روز تا آزمون\n` : "") +
    (weakest
      ? `⚠️ ضعیف‌ترین: ${weakest.name_it} (${Math.round(weakest.accuracy * 100)}%)\n`
      : "");

  await sendMessage(ctx.token, {
    chat_id: chatId,
    text: statsText,
    reply_markup: buildMiniAppButton("📈 آمار کامل", `${ctx.miniAppUrl}?screen=stats`),
  });
}
