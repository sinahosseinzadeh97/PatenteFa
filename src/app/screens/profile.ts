/**
 * src/app/screens/profile.ts
 * Profile & analysis screen — level/XP, coverage, needs-more-work, topic accuracy, score trend.
 */
export function renderProfileScreen(): string {
  return `
<div id="screen-profile" class="screen" style="padding:0 0 90px;">

  <!-- ── Profile header ── -->
  <div style="padding:20px 16px 0;">

    <!-- Back header bar -->
    <div style="display:flex; align-items:center; gap:10px; margin-bottom:20px;">
      <button type="button" onclick="App.showScreen('home','back')" style="background:none;border:none;color:var(--ink-muted);cursor:pointer;padding:4px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:22px;height:22px;"><path d="M15 18l6-6-6-6"/></svg>
      </button>
      <h1 style="margin:0;font-family:'Barlow Condensed',sans-serif;font-size:1.7rem;font-weight:700;color:var(--ink);">پروفایل</h1>
    </div>

    <!-- ── Level / XP card ── -->
    <div class="card" style="margin-bottom:16px; background:linear-gradient(135deg,rgba(27,122,61,0.12),rgba(31,33,40,1)); border-color:rgba(27,122,61,0.3);">
      <div style="display:flex; align-items:center; gap:16px; margin-bottom:14px;">

        <!-- Autostrada shield badge -->
        <div class="shield-badge" id="profile-shield">
          <span class="shield-level" id="profile-level">0</span>
          <span class="shield-label">LVL</span>
        </div>

        <!-- Name + XP progress -->
        <div style="flex:1; min-width:0;">
          <div id="profile-name" style="font-size:1.1rem; font-weight:700; color:var(--ink); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">…</div>
          <div id="profile-username" style="font-size:0.75rem; color:var(--amber); font-family:'Public Sans',sans-serif; direction:ltr; margin-bottom:8px;">@—</div>

          <!-- XP bar -->
          <div style="display:flex; align-items:center; gap:8px;">
            <div class="xp-road-track" style="flex:1;">
              <div class="xp-road-fill" id="profile-xp-fill" style="width:0%;"></div>
            </div>
            <span id="profile-xp-label" style="font-size:0.72rem; font-weight:700; color:var(--go); white-space:nowrap;">0 XP</span>
          </div>
          <div style="font-size:0.62rem; color:var(--ink-muted); margin-top:3px;">
            <span id="profile-xp-detail">0 از 100 XP تا سطح بعد</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── 4-icon stat row ── -->
    <div style="display:flex; gap:8px; margin-bottom:20px;">
      <div class="profile-stat-tile">
        <span class="tile-icon">🔥</span>
        <span class="tile-value" id="profile-streak">0</span>
        <span class="tile-label">روز استریک</span>
      </div>
      <div class="profile-stat-tile">
        <span class="tile-icon">📝</span>
        <span class="tile-value" id="profile-exams">0</span>
        <span class="tile-label">آزمون داده</span>
      </div>
      <div class="profile-stat-tile">
        <span class="tile-icon">🗺️</span>
        <span class="tile-value" id="profile-coverage-pct">0%</span>
        <span class="tile-label">پوشش بانک</span>
      </div>
      <div class="profile-stat-tile">
        <span class="tile-icon">📖</span>
        <span class="tile-value" id="profile-vocab">0</span>
        <span class="tile-label">لغت یادگرفته</span>
      </div>
    </div>

    <!-- ─────────────── ANALYSIS SECTION ─────────────── -->
    <div style="border-top:1px solid var(--border); padding-top:20px;">
      <h2 style="margin:0 0 16px; font-family:'Barlow Condensed',sans-serif; font-size:1.4rem; font-weight:700;">📊 تحلیل عملکرد</h2>

      <!-- Coverage bar -->
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px;">
          <span style="font-size:0.82rem; font-weight:700; color:var(--ink);">🗺️ پوشش بانک سوال</span>
          <span id="profile-coverage-label" style="font-size:0.78rem; color:var(--go); font-weight:700;">— از ۷٬۱۳۹</span>
        </div>
        <div class="coverage-road">
          <div class="coverage-road-fill" id="profile-coverage-fill" style="width:0%;"></div>
        </div>
        <div id="profile-coverage-sub" style="font-size:0.7rem; color:var(--ink-muted); margin-top:6px;">در حال بارگذاری…</div>
      </div>

      <!-- Needs more work -->
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span style="font-size:0.85rem; font-weight:700; color:var(--stop);">⚠️ نیاز به تمرین بیشتر</span>
          <span style="font-size:0.7rem; color:var(--ink-muted);">بیشترین اشتباه</span>
        </div>
        <div id="profile-nmw-list" style="display:flex; flex-direction:column; gap:8px;">
          <div style="color:var(--ink-muted); font-size:0.85rem; text-align:center; padding:12px 0;">در حال بارگذاری…</div>
        </div>
      </div>

      <!-- Per-topic accuracy chart -->
      <div class="card" style="margin-bottom:16px;">
        <div style="font-size:0.85rem; font-weight:700; margin-bottom:12px; color:var(--ink);">📈 دقت بر اساس موضوع — بدترین اول</div>
        <div id="profile-topic-chart">
          <div style="color:var(--ink-muted); font-size:0.85rem; text-align:center; padding:12px 0;">در حال بارگذاری…</div>
        </div>
      </div>

      <!-- Score trend sparkline -->
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <span style="font-size:0.85rem; font-weight:700; color:var(--ink);">📉 روند نمره — ۱۵ آزمون اخیر</span>
          <span style="font-size:0.7rem; color:var(--ink-muted);" id="profile-trend-range"></span>
        </div>
        <div class="sparkline-wrap">
          <svg id="profile-sparkline" viewBox="0 0 300 80" preserveAspectRatio="none"
               xmlns="http://www.w3.org/2000/svg">
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
        <div style="display:flex; justify-content:space-between; margin-top:4px; font-size:0.65rem; color:var(--ink-muted);">
          <span id="sparkline-min-label">کمترین: —</span>
          <span style="color:rgba(27,122,61,0.8); font-size:0.62rem;">خط قبولی (۲۷)</span>
          <span id="sparkline-max-label">بیشترین: —</span>
        </div>
      </div>

    </div>
  </div>
</div>
`;
}
