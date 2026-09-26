/** Profile and performance analysis. */
export function renderProfileScreen(): string {
  return `
<div id="screen-profile" class="screen screen-with-nav">
  <main class="page-container profile-content">
    <header class="page-header">
      <button type="button" onclick="App.handleBackNavigation()" class="icon-button" aria-label="بازگشت به خانه"><svg class="ui-icon"><use href="#i-chevron-right"/></svg></button>
      <div><span class="page-kicker">حساب و پیشرفت</span><h1>پروفایل</h1></div>
    </header>

    <section class="profile-level-card" aria-label="سطح یادگیری">
      <div class="shield-badge" id="profile-shield"><span class="shield-level" id="profile-level">۰</span><span class="shield-label">سطح</span></div>
      <div class="profile-name-block">
        <h2 id="profile-name" class="profile-name">…</h2>
        <div id="profile-username" class="profile-username">@—</div>
        <div class="profile-xp-row"><div class="xp-road-track"><div class="xp-road-fill" id="profile-xp-fill" style="width:0%;"></div></div><span id="profile-xp-label" class="profile-xp-label">۰ XP</span></div>
        <div id="profile-xp-detail" class="profile-xp-detail">۰ از ۱۰۰ XP تا سطح بعد</div>
      </div>
    </section>

    <section class="profile-stat-row" aria-label="آمار کلی">
      <div class="profile-stat-tile"><svg class="ui-icon"><use href="#i-target"/></svg><span class="tile-value" id="profile-streak">۰</span><span class="tile-label">روز پیوسته</span></div>
      <div class="profile-stat-tile"><svg class="ui-icon"><use href="#i-exam"/></svg><span class="tile-value" id="profile-exams">۰</span><span class="tile-label">آزمون</span></div>
      <div class="profile-stat-tile"><svg class="ui-icon"><use href="#i-trend"/></svg><span class="tile-value" id="profile-coverage-pct">۰٪</span><span class="tile-label">پوشش بانک</span></div>
      <div class="profile-stat-tile"><svg class="ui-icon"><use href="#i-book"/></svg><span class="tile-value" id="profile-vocab">۰</span><span class="tile-label">واژه</span></div>
    </section>

    <div class="profile-link-list">
      <button type="button" class="profile-link" onclick="App.openSupport()">
        <svg class="ui-icon"><use href="#i-message"/></svg><span><strong>پشتیبانی</strong><small>سؤال، مشکل یا پیشنهادت را بنویس</small></span><span id="profile-support-badge" class="profile-support-badge" hidden></span><svg class="ui-icon link-chevron"><use href="#i-chevron-left"/></svg>
      </button>
      <button type="button" class="profile-link" id="btn-admin-panel" onclick="App.openAdminPanel()" style="display:none;">
        <svg class="ui-icon"><use href="#i-settings"/></svg><span><strong>مدیریت کاربران</strong><small>دسترسی، پیام‌ها و هزینه API</small></span><svg class="ui-icon link-chevron"><use href="#i-chevron-left"/></svg>
      </button>
    </div>

    <section class="profile-analysis-section" aria-labelledby="profile-analysis-heading">
      <div class="section-heading-row"><div><span class="section-kicker">داده‌های مطالعه</span><h2 id="profile-analysis-heading">تحلیل عملکرد</h2></div></div>

      <section class="analysis-block">
        <div class="analysis-block-heading"><span>پوشش بانک سؤال</span><strong id="profile-coverage-label">— از ۷٬۱۳۹</strong></div>
        <div class="coverage-road" role="progressbar" aria-label="درصد پوشش بانک سؤال"><div class="coverage-road-fill" id="profile-coverage-fill" style="width:0%;"></div></div>
        <p id="profile-coverage-sub" class="analysis-note">در حال بارگذاری…</p>
      </section>

      <section class="analysis-block">
        <div class="analysis-block-heading"><span>نیاز به تمرین بیشتر</span><small>بیشترین اشتباه</small></div>
        <div id="profile-nmw-list" class="analysis-list"><div class="loading-note">در حال بارگذاری…</div></div>
      </section>

      <section class="analysis-block">
        <div class="analysis-block-heading"><span>دقت بر اساس موضوع</span><small>ضعیف‌ترین موضوع اول</small></div>
        <div id="profile-topic-chart"><div class="loading-note">در حال بارگذاری…</div></div>
      </section>

      <section class="analysis-block">
        <div class="analysis-block-heading"><span>روند نمره</span><small id="profile-trend-range">۱۵ آزمون اخیر</small></div>
        <div class="sparkline-wrap">
          <svg id="profile-sparkline" viewBox="0 0 300 80" preserveAspectRatio="none" role="img" aria-label="نمودار روند نمره در ۱۵ آزمون اخیر">
            <line x1="0" y1="" x2="300" y2="" id="sparkline-pass-line" stroke="rgba(35,130,74,.55)" stroke-width="1" stroke-dasharray="4 4"/>
            <polyline id="sparkline-line" points="" fill="none" stroke="var(--amber)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
            <circle id="sparkline-dot" cx="0" cy="0" r="4" fill="var(--amber)"/>
            <text id="sparkline-empty" x="150" y="42" text-anchor="middle" fill="var(--ink-muted)" font-size="11" font-family="Vazirmatn, sans-serif">هنوز آزمونی ثبت نشده</text>
          </svg>
        </div>
        <div class="profile-sparkline-footer"><span id="sparkline-min-label">کمترین: —</span><span>خط قبولی: ۲۷</span><span id="sparkline-max-label">بیشترین: —</span></div>
      </section>
    </section>
  </main>
</div>`;
}
