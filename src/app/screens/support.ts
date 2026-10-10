/** User-to-admin support conversation. */
export function renderSupportScreen(): string {
  return `
<div id="screen-support" class="screen screen-with-nav support-screen">
  <main class="page-container support-content">
    <header class="page-header support-header-bar">
      <button type="button" onclick="App.handleBackNavigation()" class="icon-button" aria-label="بازگشت"><svg class="ui-icon"><use href="#i-chevron-right"/></svg></button>
      <div><span class="page-kicker">گفتگو با پشتیبانی</span><h1>پشتیبانی PatenteFa</h1><p>پاسخ هم اینجا و هم در چت ربات به تو اطلاع داده می‌شود.</p></div>
    </header>

    <div id="support-thread" class="support-thread" role="log" aria-live="polite" aria-label="پیام‌های پشتیبانی"><div class="support-empty">در حال دریافت گفتگو…</div></div>

    <form onsubmit="App.sendSupportMessage(event)" class="support-form">
      <div class="support-field"><label for="support-input" class="field-label">پیام جدید</label><textarea id="support-input" class="support-input" rows="2" maxlength="2000" placeholder="سؤال یا مشکل خود را بنویسید…"></textarea></div>
      <button type="submit" id="support-send-btn" class="btn btn-primary support-send-btn" aria-label="ارسال پیام"><svg class="ui-icon"><use href="#i-send"/></svg><span id="support-send-label">ارسال</span></button>
    </form>
  </main>
</div>`;
}
