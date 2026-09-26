/** Shared shell chrome, reusable SVG icons, feedback, and modal/sheet surfaces. */

export function renderIconSprite(): string {
  return `
<svg class="icon-sprite" aria-hidden="true" focusable="false">
  <symbol id="i-home" viewBox="0 0 24 24"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z"/></symbol>
  <symbol id="i-exam" viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3.5h6V6H9zM8 11h8M8 15h5"/></symbol>
  <symbol id="i-sign" viewBox="0 0 24 24"><path d="M12 3 3 12l9 9 9-9-9-9Z"/><path d="M12 8v5M12 17h.01"/></symbol>
  <symbol id="i-book" viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/></symbol>
  <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></symbol>
  <symbol id="i-settings" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.05.05-2.83 2.83-.05-.05a1.7 1.7 0 0 0-2.91 1.2V21h-4v-.1a1.7 1.7 0 0 0-2.91-1.2l-.05.05-2.83-2.83.05-.05A1.7 1.7 0 0 0 3.1 14H3v-4h.1a1.7 1.7 0 0 0 1.2-2.91l-.05-.05 2.83-2.83.05.05A1.7 1.7 0 0 0 10 3.1V3h4v.1a1.7 1.7 0 0 0 2.91 1.2l.05-.05 2.83 2.83-.05.05A1.7 1.7 0 0 0 20.9 10h.1v4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></symbol>
  <symbol id="i-chevron-right" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></symbol>
  <symbol id="i-chevron-left" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></symbol>
  <symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></symbol>
  <symbol id="i-help" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.5 2.5 0 1 1 3.7 2.2c-.9.5-1.5 1.1-1.5 2.3M12 17h.01"/></symbol>
  <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></symbol>
  <symbol id="i-trend" viewBox="0 0 24 24"><path d="m4 17 5-5 4 4 7-8"/><path d="M15 8h5v5"/></symbol>
  <symbol id="i-review" viewBox="0 0 24 24"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/></symbol>
  <symbol id="i-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></symbol>
  <symbol id="i-history" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/></symbol>
  <symbol id="i-alert" viewBox="0 0 24 24"><path d="M10.3 4.3 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></symbol>
  <symbol id="i-bookmark" viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4-6 4V3Z"/></symbol>
  <symbol id="i-audio" viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"/></symbol>
  <symbol id="i-sparkles" viewBox="0 0 24 24"><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3ZM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14ZM19 13l.8 2.2L22 16l-2.2.8L19 19l-.8-2.2L16 16l2.2-.8L19 13Z"/></symbol>
  <symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></symbol>
  <symbol id="i-graduation" viewBox="0 0 24 24"><path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11.5V16c3 2.6 9 2.6 12 0v-4.5M22 9v6"/></symbol>
  <symbol id="i-message" viewBox="0 0 24 24"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/></symbol>
  <symbol id="i-send" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></symbol>
  <symbol id="i-x" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
  <symbol id="i-lock" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></symbol>
  <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></symbol>
</svg>`;
}

export function renderLoading(): string {
  return `
<div id="loading" role="status" aria-live="polite">
  <div class="spinner" aria-hidden="true"></div>
  <p>در حال آماده‌سازی مسیر مطالعه…</p>
</div>`;
}

export function renderBottomNav(): string {
  return `
<nav class="bottom-nav" id="bottom-nav" aria-label="ناوبری اصلی">
  <div class="bottom-nav-inner">
    <button type="button" class="nav-item active" id="nav-home" onclick="App.showScreen('home')">
      <svg class="ui-icon"><use href="#i-home"/></svg><span>خانه</span>
    </button>
    <button type="button" class="nav-item" id="nav-exam" onclick="App.startExam()">
      <svg class="ui-icon"><use href="#i-exam"/></svg><span>آزمون</span>
    </button>
    <button type="button" class="nav-item" id="nav-signs" onclick="App.showScreen('signs')">
      <svg class="ui-icon"><use href="#i-sign"/></svg><span>تابلوها</span>
    </button>
    <button type="button" class="nav-item" id="nav-vocab" onclick="App.showScreen('vocab')">
      <svg class="ui-icon"><use href="#i-book"/></svg><span>لغات</span>
    </button>
    <button type="button" class="nav-item" id="nav-profile" onclick="App.showScreen('profile')">
      <svg class="ui-icon"><use href="#i-user"/></svg><span>پروفایل</span>
    </button>
  </div>
</nav>`;
}

export function renderToast(): string {
  return `<div class="toast" id="toast" role="status" aria-live="polite" aria-atomic="true"></div>`;
}

export function renderVocabSheet(): string {
  return `
<div id="vocab-sheet" role="dialog" aria-modal="true" aria-labelledby="vocab-sheet-title">
  <div class="vocab-sheet-backdrop" onclick="App.closeVocabSheet()"></div>
  <div class="vocab-sheet-panel">
    <div class="vocab-sheet-drag" aria-hidden="true"></div>
    <div id="vocab-sheet-title" class="sheet-title">افزودن به واژه‌نامه</div>
    <div class="vocab-sheet-word" id="vocab-sheet-word-display" dir="ltr"></div>
    <label for="vocab-sheet-fa" class="field-label">ترجمه فارسی</label>
    <input type="text" id="vocab-sheet-fa" class="vocab-sheet-input" placeholder="ترجمه را بنویسید" />
    <div class="vocab-sheet-actions">
      <button type="button" class="btn btn-secondary btn-full btn-sm" onclick="App.closeVocabSheet()">انصراف</button>
      <button type="button" class="btn btn-primary btn-full btn-sm" id="vocab-sheet-save-btn" onclick="App.saveVocabFromSheet()">ذخیره واژه</button>
    </div>
  </div>
</div>`;
}

export function renderExamDateModal(): string {
  return `
<div id="exam-date-modal" class="sheet-shell" role="dialog" aria-modal="true" aria-labelledby="exam-date-title">
  <div class="sheet-overlay" onclick="App.closeExamDateModal()"></div>
  <div class="sheet-panel">
    <div class="sheet-handle" aria-hidden="true"></div>
    <h2 id="exam-date-title" class="sheet-title">تاریخ آزمون تئوری</h2>
    <p class="sheet-description">تاریخ را ثبت کن تا برنامه، زمان باقی‌مانده را دقیق نشان دهد.</p>
    <label for="exam-date-input" class="field-label">تاریخ آزمون</label>
    <input type="date" id="exam-date-input" class="form-control" />
    <div class="sheet-actions">
      <button type="button" class="btn btn-primary btn-full" onclick="App.saveExamTargetDate()">ذخیره تاریخ</button>
      <button type="button" class="btn btn-secondary btn-full" onclick="App.closeExamDateModal()">انصراف</button>
    </div>
  </div>
</div>`;
}

export function renderGuideModal(): string {
  return `
<div id="modal-guide" class="guide-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="guide-title" onclick="if(event.target===this) App.closeGuideModal()">
  <div class="guide-modal-card">
    <div class="guide-modal-header">
      <div class="guide-modal-heading">
        <svg class="ui-icon"><use href="#i-help"/></svg>
        <div><h2 id="guide-title" class="guide-modal-title">شروع کار با PatenteFa</h2><p>سه قدم برای یک جلسه مؤثر</p></div>
      </div>
      <button type="button" onclick="App.closeGuideModal()" class="icon-button" aria-label="بستن راهنما"><svg class="ui-icon"><use href="#i-close"/></svg></button>
    </div>
    <ol class="guide-steps">
      <li><span>۱</span><div><strong>سؤال ایتالیایی را کامل بخوان</strong><p>اول پاسخ خودت را انتخاب کن؛ ترجمه برای فهم دقیق‌تر کنارت هست.</p></div></li>
      <li><span>۲</span><div><strong>اشتباه‌ها را همان روز مرور کن</strong><p>بخش مرور، سؤال‌های دشوار را دوباره در مسیرت قرار می‌دهد.</p></div></li>
      <li><span>۳</span><div><strong>پیشرفت را از پروفایل ببین</strong><p>موضوع‌های ضعیف، پوشش بانک و روند نمره‌ات را پیگیری کن.</p></div></li>
    </ol>
    <div class="guide-note"><svg class="ui-icon"><use href="#i-alert"/></svg><span>بانک سؤال مربوط به ۲۰۲۳ است؛ نزدیک آزمون، تغییرات احتمالی را با منبع رسمی بررسی کن.</span></div>
    <button type="button" class="btn btn-primary btn-full" onclick="App.closeGuideModal()">متوجه شدم، شروع کنیم</button>
  </div>
</div>`;
}
