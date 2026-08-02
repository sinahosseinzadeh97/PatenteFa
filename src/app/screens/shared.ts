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
  <div style="position:absolute; inset:0; background:rgba(0,0,0,0.65); backdrop-filter:blur(3px);" onclick="App.closeExamDateModal()"></div>
  <div style="position:relative; z-index:1; background:var(--surface); border-top:1px solid var(--border); border-radius:20px 20px 0 0; padding:20px 20px calc(24px + env(safe-area-inset-bottom, 0px));">
    <div style="width:36px; height:4px; background:var(--border); border-radius:2px; margin:0 auto 16px;"></div>
    <h3 style="margin:0 0 8px; font-size:1.1rem; color:var(--ink);">📅 تعیین تاریخ آزمون تئوری</h3>
    <p style="margin:0 0 16px; font-size:0.8rem; color:var(--ink-muted);">تاریخ آزمون تئوری خود را انتخاب کنید تا روزهای باقی‌مانده در داشبورد محاسبه شوند:</p>
    <input type="date" id="exam-date-input" style="width:100%; padding:12px; background:var(--surface-2); border:1px solid var(--border); border-radius:12px; color:var(--ink); font-family:sans-serif; font-size:1rem; margin-bottom:16px;" />
    <div style="display:flex; gap:10px;">
      <button class="btn btn-primary" style="flex:1;" onclick="App.saveExamTargetDate()">ذخیره تاریخ 💾</button>
      <button class="btn btn-ghost" onclick="App.closeExamDateModal()">انصراف</button>
    </div>
  </div>
</div>
`;
}

export function renderGuideModal(): string {
  return `
<div id="modal-guide" style="position:fixed; inset:0; z-index:9999; display:none; align-items:center; justify-content:center; padding:16px; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px);" onclick="if(event.target===this) App.closeGuideModal()">
  <div class="card" style="max-width:460px; width:100%; max-height:88vh; overflow-y:auto; background:linear-gradient(135deg, #161820, #202330); border:1px solid rgba(232,163,61,0.35); border-radius:24px; padding:24px; box-shadow:0 24px 60px rgba(0,0,0,0.8); color:var(--ink);">
    
    <!-- Modal Header -->
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:18px; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:14px;">
      <div style="display:flex; align-items:center; gap:12px;">
        <div style="width:44px; height:44px; border-radius:14px; background:linear-gradient(135deg, rgba(232,163,61,0.2), rgba(37,99,235,0.2)); border:1px solid rgba(232,163,61,0.4); display:flex; align-items:center; justify-content:center; font-size:1.5rem;">
          💎
        </div>
        <div>
          <h3 style="font-size:1.15rem; font-weight:700; color:var(--amber); margin:0;">راهنما و راز قبولی تضمینی</h3>
          <span style="font-size:0.75rem; color:var(--ink-muted);">نقشه راه آمادگی کامل در آزمون تئوری Patente B</span>
        </div>
      </div>
      <button type="button" onclick="App.closeGuideModal()" style="background:none; border:none; color:var(--ink-muted); font-size:1.4rem; cursor:pointer; padding:4px;">✕</button>
    </div>

    <!-- Content Body -->
    <div style="font-size:0.88rem; line-height:1.75; color:#d1d5db;">
      
      <!-- Value Proposition Commercial Banner -->
      <div style="background:linear-gradient(135deg, rgba(37,99,235,0.18), rgba(124,58,237,0.18)); border:1px solid rgba(59,130,246,0.4); border-radius:16px; padding:16px; margin-bottom:18px;">
        <div style="font-size:0.95rem; font-weight:700; color:#60a5fa; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
          <span>🎯</span> <b>چرا هزینه اضافه بپردازید؟</b>
        </div>
        <div style="font-size:0.83rem; color:#e2e8f0; line-height:1.65;">
          با توجه به صعود قیمت یورو و هزینه‌های سنگین <b>۱۵۰ تا ۱۶۰ یورویی</b> پکیج‌های موجود در بازار، سامانه <b>PatenteFa</b> به گونه‌ای هوشمند طراحی شده است که شما را ظرف مدت <b>۳ تا ۴ ماه</b>، با بالاترین کیفیت و تنها با <b>یک‌سوم هزینه پکیج‌های بازار</b>، آماده قبولی قطعی در آزمون اصلی تئوری کند.
        </div>
      </div>

      <!-- Translation feature -->
        <div style="background:rgba(37,99,235,0.12); border:1px solid rgba(59,130,246,0.3); border-radius:14px; padding:12px 14px;">
          <div style="font-size:0.78rem; color:#cbd5e1; line-height:1.55;">
            با فعال‌سازی گزینه <b>Traduci (ترجمه)</b> در هر سوال، ترجمه روان فارسی + دلیل درست یا نادرست بودن جواب را می‌بینید. سوالاتی که تابلو دارند، تصویر تابلو هم برای مترجم ارسال می‌شود.
          </div>
        </div>
      </div>

      <!-- Additional Value Badge -->
      <div style="background:rgba(232,163,61,0.1); border:1px solid rgba(232,163,61,0.3); border-radius:14px; padding:12px 14px; margin-bottom:20px; font-size:0.8rem; color:#fde68a; line-height:1.6;">
        ⚡ <b>بانک جامع ۷,۱۳۹ سوال رسمی</b> + ۲۵ فصل آموزشی استاندارد + مرور هوشمند فلش‌کارت‌ها و تابلوها برای قبولی قطعی شما در اولین تلاش!
      </div>

    </div>

    <!-- Action Button -->
    <button class="btn btn-primary btn-full" onclick="App.closeGuideModal()" style="border-radius:14px; padding:13px; font-size:0.95rem; font-weight:700; background:linear-gradient(135deg, #16a34a, #15803d); border:none; box-shadow:0 6px 20px rgba(22,163,74,0.35);">
      شروع تمرین و آمادگی 🚀
    </button>
  </div>
</div>
`;
}
