/** Access approval / manual subscription gate. */
export function renderPendingScreen(): string {
  return `
<div id="screen-pending" class="screen pending-screen">
  <main class="pending-content">
    <div class="pending-status-icon"><svg class="ui-icon"><use href="#i-clock"/></svg></div>
    <span class="page-kicker">وضعیت دسترسی</span>
    <h1 class="pending-title">در انتظار تأیید مدیریت</h1>
    <p class="pending-message" id="pending-msg">درخواستت ثبت شده است. بعد از تأیید، دسترسی کامل در همین صفحه فعال می‌شود.</p>

    <section class="pending-details" aria-labelledby="pending-details-title">
      <h2 id="pending-details-title">پس از فعال‌سازی در دسترس است</h2>
      <ul><li><svg class="ui-icon"><use href="#i-check"/></svg> بانک کامل سؤال‌های آزمون</li><li><svg class="ui-icon"><use href="#i-check"/></svg> ترجمه، توضیح تئوری و گرامر</li><li><svg class="ui-icon"><use href="#i-check"/></svg> مرور اشتباهات و تحلیل پیشرفت</li></ul>
    </section>

    <div class="field-group pending-note-field">
      <label for="fun-custom-answer-input" class="field-label">توضیح برای مدیریت <span>اختیاری</span></label>
      <input type="text" id="fun-custom-answer-input" placeholder="اگر نکته‌ای هست اینجا بنویسید" class="form-control" />
    </div>

    <button type="button" class="btn btn-primary btn-full" id="btn-submit-fun" onclick="App.submitFunAnswer()">ارسال درخواست فعال‌سازی</button>
    <div id="fun-reward-box" class="inline-success" role="status"><svg class="ui-icon"><use href="#i-check"/></svg><span>درخواستت ثبت شد و برای مدیریت ارسال شد.</span></div>
    <button class="btn btn-secondary btn-full" onclick="App.checkApprovalStatus()"><svg class="ui-icon"><use href="#i-review"/></svg> بررسی دوباره وضعیت</button>
    <button class="btn btn-quiet btn-full" onclick="App.openSupport()"><svg class="ui-icon"><use href="#i-message"/></svg> گفتگو با پشتیبانی <span id="pending-support-badge" class="profile-support-badge" hidden></span></button>
  </main>
</div>`;
}
