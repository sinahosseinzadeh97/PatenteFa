/**
 * src/app/screens/shared.ts
 * Chrome shared across every screen: the initial loading state, the bottom
 * nav bar, the toast element, and the three global bottom-sheet/modal
 * overlays (long-press-to-vocab sheet, exam target-date picker, onboarding
 * guide modal).
 */
export function renderLoading(): string {
  return `
<div id="loading">
  <div class="spinner"></div>
  <p style="color:var(--ink-muted);font-size:0.9rem;">در حال بارگذاری…</p>
</div>
`;
}

export function renderBottomNav(): string {
  return `
<nav class="bottom-nav" id="bottom-nav">
  <button class="nav-item active" id="nav-home" onclick="App.showScreen('home')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    خانه
  </button>
  <button class="nav-item" id="nav-exam" onclick="App.startExam()">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
    آزمون
  </button>
  <button class="nav-item" id="nav-signs" onclick="App.showScreen('signs')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="8.5" x2="22" y2="8.5"/><line x1="2" y1="15.5" x2="22" y2="15.5"/></svg>
    تابلوها
  </button>
  <button class="nav-item" id="nav-vocab" onclick="App.showScreen('vocab')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    لغات
  </button>
  <button class="nav-item" id="nav-profile" onclick="App.showScreen('profile')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    پروفایل
  </button>
  <button class="nav-item" id="nav-admin" onclick="App.showScreen('admin')" style="display:none; color:var(--amber);">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1-2.83 0l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    مدیریت
  </button>
</nav>
`;
}

export function renderToast(): string {
  return `<div class="toast" id="toast"></div>`;
}

export function renderVocabSheet(): string {
  return `
<div id="vocab-sheet" role="dialog" aria-modal="true" aria-labelledby="vocab-sheet-word-display">
  <div class="vocab-sheet-backdrop" onclick="App.closeVocabSheet()"></div>
  <div class="vocab-sheet-panel">
    <div class="vocab-sheet-drag"></div>
    <div class="vocab-sheet-word" id="vocab-sheet-word-display"></div>
    <div class="vocab-sheet-hint">افزودن به لغت‌نامه</div>
    <input type="text" id="vocab-sheet-fa" class="vocab-sheet-input"
      placeholder="ترجمه فارسی…" />
    <div class="vocab-sheet-actions">
      <button class="btn btn-ghost btn-full btn-sm" onclick="App.closeVocabSheet()">انصراف</button>
      <button class="btn btn-primary btn-full btn-sm" id="vocab-sheet-save-btn" onclick="App.saveVocabFromSheet()">ذخیره ✓</button>
    </div>
  </div>
</div>
`;
}

export function renderExamDateModal(): string {
  return `
<div id="exam-date-modal" style="position:fixed; inset:0; z-index:350; display:none; flex-direction:column; justify-content:flex-end;">
  <div class="exam-date-modal-overlay" onclick="App.closeExamDateModal()"></div>
  <div class="exam-date-modal-panel">
    <div class="exam-date-modal-handle"></div>
    <h3 class="exam-date-modal-title">📅 تعیین تاریخ آزمون تئوری</h3>
    <p class="exam-date-modal-sub">تاریخ آزمون تئوری خود را انتخاب کنید تا روزهای باقی‌مانده در داشبورد محاسبه شوند:</p>
    <label for="exam-date-input" class="visually-hidden">تاریخ آزمون</label>
    <input type="date" id="exam-date-input" class="exam-date-input" />
    <div class="exam-date-actions-row">
      <button class="btn btn-primary" style="flex:1;" onclick="App.saveExamTargetDate()">ذخیره تاریخ 💾</button>
      <button class="btn btn-ghost" onclick="App.closeExamDateModal()">انصراف</button>
    </div>
  </div>
</div>
`;
}

export function renderGuideModal(): string {
  return `
<div id="modal-guide" class="guide-modal-backdrop" onclick="if(event.target===this) App.closeGuideModal()">
  <div class="card guide-modal-card">

    <!-- Modal Header -->
    <div class="guide-modal-header">
      <div class="guide-modal-header-left">
        <div class="guide-modal-icon-badge" aria-hidden="true">
          💎
        </div>
        <div>
          <h3 class="guide-modal-title">راهنما و راز قبولی تضمینی</h3>
          <span class="guide-modal-subtitle">نقشه راه آمادگی کامل در آزمون تئوری Patente B</span>
        </div>
      </div>
      <button type="button" onclick="App.closeGuideModal()" class="guide-modal-close-btn" aria-label="بستن راهنما">✕</button>
    </div>

    <!-- Content Body -->
    <div class="guide-modal-body">

      <!-- Value Proposition Commercial Banner -->
      <div class="guide-modal-banner">
        <div class="guide-modal-banner-heading">
          <span aria-hidden="true">🎯</span> <b>چرا هزینه اضافه بپردازید؟</b>
        </div>
        <div class="guide-modal-banner-body">
          با توجه به صعود قیمت یورو و هزینه‌های سنگین <b>۱۵۰ تا ۱۶۰ یورویی</b> پکیج‌های موجود در بازار، سامانه <b>PatenteFa</b> به گونه‌ای هوشمند طراحی شده است که شما را ظرف مدت <b>۳ تا ۴ ماه</b>، با بالاترین کیفیت و تنها با <b>یک‌سوم هزینه پکیج‌های بازار</b>، آماده قبولی قطعی در آزمون اصلی تئوری کند.
        </div>
      </div>

      <!-- Translation feature -->
      <div class="guide-modal-feature-card">
        <div class="guide-modal-feature-text">
          با فعال‌سازی گزینه <b>Traduci (ترجمه)</b> در هر سوال، ترجمه روان فارسی + دلیل درست یا نادرست بودن جواب را می‌بینید. سوالاتی که تابلو دارند، تصویر تابلو هم برای مترجم ارسال می‌شود.
        </div>
      </div>

      <!-- Additional Value Badge -->
      <div class="guide-modal-value-badge">
        ⚡ <b>بانک جامع ۷,۱۳۹ سوال رسمی</b> + ۲۵ فصل آموزشی استاندارد + مرور هوشمند فلش‌کارت‌ها و تابلوها برای قبولی قطعی شما در اولین تلاش!
      </div>

    </div>

    <!-- Action Button -->
    <button class="btn btn-full guide-modal-cta" onclick="App.closeGuideModal()">
      شروع تمرین و آمادگی 🚀
    </button>
  </div>
</div>
`;
}
