/**
 * src/app/screens/stats.ts
 * Legacy stats screen (per-topic accuracy) — superseded by the profile
 * screen and no longer linked from any button or nav item, but kept (not
 * deleted) since it's still reachable via /app?screen=stats and App.loadStats
 * is still live code. See final report for the "keep vs. delete" call.
 */
export function renderStatsScreen(): string {
  return `
<div id="screen-stats" class="screen" style="padding:0 0 80px;">
  <div class="stats-content">
    <div class="screen-header-bar">
      <button type="button" onclick="App.handleBackNavigation()" class="screen-back-btn" aria-label="بازگشت به خانه">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="screen-back-icon" aria-hidden="true"><path d="M15 18l6-6-6-6"/></svg>
      </button>
      <h1 class="stats-title screen-header-title">📊 آمار</h1>
    </div>

    <div class="stats-chip-row">
      <div class="stat-chip"><div class="stat-chip-value" id="stats-streak">0</div><div class="stat-chip-label">🔥 روز</div></div>
      <div class="stat-chip"><div class="stat-chip-value" id="stats-sessions">0</div><div class="stat-chip-label">آزمون</div></div>
      <div class="stat-chip"><div class="stat-chip-value" id="stats-pass-rate">—</div><div class="stat-chip-label">% قبولی</div></div>
    </div>

    <h2 class="stats-section-heading">دقت بر اساس موضوع</h2>
    <div id="stats-topic-bars"></div>

    <div class="stats-profile-cta-wrap">
      <button class="btn btn-full btn-profile-entry" onclick="App.showScreen('profile')">
        👤 مشاهده پروفایل کامل و تحلیل عملکرد
      </button>
    </div>
  </div>
</div>
`;
}
