/**
 * src/app/screens/pending.ts
 * Pending-approval screen (shown to users awaiting admin approval).
 */
export function renderPendingScreen(): string {
  return `
<div id="screen-pending" class="screen" style="padding:40px 20px; text-align:center; display:none; flex-direction:column; align-items:center; justify-content:center; min-height:80vh;">
  <div class="pending-icon" aria-hidden="true">
    ⏳
  </div>
  <h2 class="pending-title">در انتظار تایید مدیریت</h2>
  <p class="pending-message" id="pending-msg">
    درخواست دسترسی شما برای مدیریت ارسال گردید. پس از تایید مدیریت، دسترسی شما فعال می‌شود.
  </p>

  <!-- Commercial Value Proposition Card -->
  <div class="pending-value-card">
    <div class="pending-value-heading">
      <span aria-hidden="true">💎</span> <b>چرا سامانه هوشمند PatenteFa؟</b>
    </div>

    <p class="pending-value-body">
      با توجه به افزایش قیمت یورو و هزینه‌های سنگین <b>۱۵۰ تا ۱۶۰ یورویی</b> پکیج‌های آموزشی موجود در بازار، سامانه <b>PatenteFa</b> به گونه‌ای طراحی شده است که شما را ظرف مدت <b>۳ تا ۴ ماه</b>، با بالاترین کیفیت و تنها با <b>یک‌سوم هزینه پکیج‌های مشابه</b>، آماده قبولی در آزمون اصلی تئوری پاتنته کند.
    </p>

    <div class="pending-value-features">
      ✨ شامل ۳ دستیار هوش مصنوعی (مترجم، مربی آیین‌نامه، استاد زبان ایتالیایی)، ۷,۱۳۹ سوال رسمی و ۲۵ فصل آموزشی
    </div>

    <label for="fun-custom-answer-input" style="display:none;">پیام تکمیلی برای مدیریت</label>
    <input type="text" id="fun-custom-answer-input" placeholder="پیام یا توضیحات تکمیلی شما برای مدیریت (اختیاری)…" class="pending-fun-input" />

    <button type="button" class="btn btn-primary btn-sm btn-full" id="btn-submit-fun" onclick="App.submitFunAnswer()">
      ارسال درخواست فعال‌سازی دسترسی 🚀
    </button>

    <div id="fun-reward-box" class="pending-reward-box">
      ✅ <b>درخواست شما با موفقیت ثبت شد!</b> مدیریت به‌زودی دسترسی شما را تایید خواهد کرد.
    </div>
  </div>

  <button class="btn btn-primary btn-full pending-recheck-btn" onclick="App.checkApprovalStatus()">
    🔄 بررسی مجدد وضعیت دسترسی
  </button>
</div>
`;
}
