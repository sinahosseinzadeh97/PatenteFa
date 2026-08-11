
/**
 * src/app/screens/profile.ts
 * Profile & analysis screen — level/XP, coverage, needs-more-work, topic accuracy, score trend.
 */
export function renderProfileScreen(): string {
  return `
<div id="screen-profile" class="screen" style="padding:0 0 90px;">

  <!-- ── Profile header ── -->
  <div class="profile-content">

    <!-- Back header bar -->
    <div class="profile-header-bar">
      <button type="button" onclick="App.showScreen('home','back')" class="profile-back-btn" aria-label="بازگشت به خانه">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="profile-back-icon" aria-hidden="true"><path d="M15 18l6-6-6-6"/></svg>
      </button>
      <h1 class="profile-title">پروفایل</h1>
    </div>

    <!-- ── Level / XP card ── -->
    <div class="card profile-level-card">
      <div class="profile-level-row">

        <!-- Autostrada shield badge -->
        <div class="shield-badge" id="profile-shield">
          <span class="shield-level" id="profile-level">0</span>
          <span class="shield-label">LVL</span>
        </div>

        <!-- Name + XP progress -->
        <div class="profile-name-block">
          <div id="profile-name" class="profile-name">…</div>
          <div id="profile-username" class="profile-username">@—</div>

          <!-- XP bar -->
          <div class="profile-xp-row">
            <div class="xp-road-track profile-xp-track-wrap">
              <div class="xp-road-fill" id="profile-xp-fill" style="width:0%;"></div>
            </div>
            <span id="profile-xp-label" class="profile-xp-label">0 XP</span>
          </div>
          <div class="profile-xp-detail">
            <span id="profile-xp-detail">0 از 100 XP تا سطح بعد</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── 4-icon stat row ── -->
    <div class="profile-stat-row">
      <div class="profile-stat-tile">
        <span class="tile-icon" aria-hidden="true">🔥</span>
        <span class="tile-value" id="profile-streak">0</span>
        <span class="tile-label">روز استریک</span>
      </div>
      <div class="profile-stat-tile">
        <span class="tile-icon" aria-hidden="true">📝</span>
        <span class="tile-value" id="profile-exams">0</span>
        <span class="tile-label">آزمون داده</span>
      </div>
      <div class="profile-stat-tile">
        <span class="tile-icon" aria-hidden="true">🗺️</span>
        <span class="tile-value" id="profile-coverage-pct">0%</span>
        <span class="tile-label">پوشش بانک</span>
      </div>
      <div class="profile-stat-tile">
        <span class="tile-icon" aria-hidden="true">📖</span>
        <span class="tile-value" id="profile-vocab">0</span>
        <span class="tile-label">لغت یادگرفته</span>
      </div>
    </div>

    <!-- ─────────────── ANALYSIS SECTION ─────────────── -->
    <div class="profile-analysis-section">
      <h2 class="profile-analysis-heading">📊 تحلیل عملکرد</h2>

      <!-- Coverage bar -->
      <div class="card profile-card">
        <div class="profile-card-row">
          <span class="profile-card-label">🗺️ پوشش بانک سوال</span>
          <span id="profile-coverage-label" class="profile-coverage-value">— از ۷٬۱۳۹</span>
        </div>
        <div class="coverage-road" role="progressbar" aria-label="درصد پوشش بانک سوال">
          <div class="coverage-road-fill" id="profile-coverage-fill" style="width:0%;"></div>
        </div>
        <div id="profile-coverage-sub" class="profile-coverage-note">در حال بارگذاری…</div>
      </div>

      <!-- Needs more work -->
      <div class="card profile-card">
        <div class="profile-card-row center">
          <span class="profile-card-label warn">⚠️ نیاز به تمرین بیشتر</span>
          <span class="profile-card-sub">بیشترین اشتباه</span>
        </div>
        <div id="profile-nmw-list" style="display:flex; flex-direction:column; gap:8px;">
          <div class="profile-loading-note">در حال بارگذاری…</div>
        </div>
      </div>

      <!-- Per-topic accuracy chart -->
      <div class="card profile-card">
        <div class="profile-topic-heading">📈 دقت بر اساس موضوع — بدترین اول</div>
        <div id="profile-topic-chart">
          <div class="profile-loading-note">در حال بارگذاری…</div>
        </div>
      </div>

      <!-- Score trend sparkline -->
      <div class="card profile-card">
        <div class="profile-trend-heading-row">
          <span class="profile-card-label">📉 روند نمره — ۱۵ آزمون اخیر</span>
          <span class="profile-card-sub" id="profile-trend-range"></span>
        </div>
        <div class="sparkline-wrap">
          <svg id="profile-sparkline" viewBox="0 0 300 80" preserveAspectRatio="none"
               xmlns="http://www.w3.org/2000/svg" role="img" aria-label="نمودار روند نمره در ۱۵ آزمون اخیر">
            <!-- pass line at score=27 (30 - 3 errors) -->
            <line x1="0" y1="" x2="300" y2="" id="sparkline-pass-line"
                  stroke="rgba(27,122,61,0.4)" stroke-width="1" stroke-dasharray="4 4"/>
            <polyline id="sparkline-line" points="" fill="none"
                      stroke="var(--amber)" stroke-width="2"
                      stroke-linejoin="round" stroke-linecap="round"/>
            <circle id="sparkline-dot" cx="0" cy="0" r="4" fill="var(--amber)"/>
            <text id="sparkline-empty" x="150" y="42" text-anchor="middle"
                  fill="rgba(255,255,255,0.3)" font-size="11"
                  font-family="Vazirmatn, sans-serif">هنوز آزمونی نداده‌ای</text>
          </svg>
        </div>
        <div class="profile-sparkline-footer">
          <span id="sparkline-min-label">کمترین: —</span>
          <span class="profile-sparkline-passline-label">خط قبولی (۲۷)</span>
          <span id="sparkline-max-label">بیشترین: —</span>
        </div>
      </div>

    </div>
  </div>
</div>
`;
}
