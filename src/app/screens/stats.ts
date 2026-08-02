/**
 * src/app/screens/stats.ts
 * Legacy stats screen (per-topic accuracy) — superseded by the profile screen but still nav-reachable.
 */
export function renderStatsScreen(): string {
  return `
<div id="screen-stats" class="screen" style="padding:0 0 80px;">
  <div style="padding:20px 16px 0;">
    <h1 style="margin:0 0 20px;font-family:'Barlow Condensed',sans-serif;font-size:1.8rem;font-weight:700;">📊 آمار</h1>

    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:20px;">
      <div class="stat-chip"><div class="stat-chip-value" id="stats-streak">0</div><div class="stat-chip-label">🔥 روز</div></div>
      <div class="stat-chip"><div class="stat-chip-value" id="stats-sessions">0</div><div class="stat-chip-label">آزمون</div></div>
      <div class="stat-chip"><div class="stat-chip-value" id="stats-pass-rate">—</div><div class="stat-chip-label">% قبولی</div></div>
    </div>

    <h2 style="font-size:0.88rem;font-weight:700;margin:0 0 14px;color:var(--ink-muted);">دقت بر اساس موضوع</h2>
    <div id="stats-topic-bars"></div>

    <div style="margin-top:20px;">
      <button class="btn btn-full" onclick="App.showScreen('profile')" style="background:linear-gradient(135deg,rgba(27,122,61,0.15),rgba(232,163,61,0.12));border:1px solid rgba(27,122,61,0.35);color:var(--ink);font-weight:700;">
        👤 مشاهده پروفایل کامل و تحلیل عملکرد
      </button>
    </div>
  </div>
</div>
`;
}
