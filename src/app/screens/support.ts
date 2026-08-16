/**
 * src/app/screens/support.ts
 * Support chat — the user's side of the thread they share with the admin.
 *
 * Reachable from the profile screen and, deliberately, from the pending-approval
 * screen: a user waiting for access is exactly the one who needs to ask a
 * question. The API behind it (/api/support) is not approval-gated for the same
 * reason. Replies arrive here and as a Telegram DM from the bot; the person
 * answering is never named.
 */
export function renderSupportScreen(): string {
  return `
<div id="screen-support" class="screen" style="padding:0 0 90px;">
  <div class="support-content">

    <div class="support-header-bar">
      <button type="button" onclick="App.handleBackNavigation()" class="support-back-btn" aria-label="بازگشت">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="support-back-icon" aria-hidden="true"><path d="M15 18l6-6-6-6"/></svg>
      </button>
      <div>
        <h1 class="support-title">پشتیبانی PatenteFa</h1>
        <div class="support-subtitle">پاسخ معمولاً در چند ساعت — همچنین در چت ربات به شما اطلاع داده می‌شود</div>
      </div>
    </div>

    <div id="support-thread" class="support-thread" role="log" aria-live="polite">
      <div class="support-empty">در حال بارگذاری گفتگو…</div>
    </div>

    <form onsubmit="App.sendSupportMessage(event)" class="support-form">
      <label for="support-input" class="visually-hidden">پیام برای پشتیبانی</label>
      <textarea id="support-input" class="support-input" rows="2" maxlength="2000"
        placeholder="سوال یا مشکل خود را بنویسید…"></textarea>
      <button type="submit" id="support-send-btn" class="btn btn-primary support-send-btn">ارسال</button>
    </form>

  </div>
</div>
`;
}
