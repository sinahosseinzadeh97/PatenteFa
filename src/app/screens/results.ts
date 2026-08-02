/**
 * src/app/screens/results.ts
 * Results screen — score, pass/fail, per-question sign-flip reveal.
 */
export function renderResultsScreen(): string {
  return `
<div id="screen-results" class="screen" style="padding:0 0 80px;">
  <div style="padding:24px 16px 0;text-align:center;">
    <div id="results-badge" class="result-badge pass"></div>
    <div style="font-family:'Barlow Condensed',sans-serif;font-size:3.5rem;font-weight:700;line-height:1;margin:10px 0 4px;" id="results-score"></div>
    <div style="color:var(--ink-muted);font-size:0.88rem;" id="results-detail"></div>
    <div style="color:var(--ink-muted);font-size:0.78rem;margin-top:4px;" id="results-time"></div>
  </div>

  <div id="results-tutor-banner" style="display:none;margin:16px 16px 0;">
    <button onclick="App.openTutorReview()" class="btn btn-full" style="background:linear-gradient(135deg, #15803d, #166534);color:#ffffff;padding:14px 16px;border-radius:14px;border:1px solid rgba(255,255,255,0.2);box-shadow:0 4px 14px rgba(22,101,52,0.4);display:flex;align-items:center;justify-content:center;gap:8px;font-weight:700;font-size:0.95rem;cursor:pointer;">
      <span style="font-size:1.2rem;">🎓</span>
      <span id="results-tutor-banner-text">تحلیل و رفع اشکال سوالات غلط با استاد AI</span>
    </button>
  </div>

  <div style="padding:16px;display:flex;gap:10px;">
    <button class="btn btn-primary btn-full" onclick="App.startExam()">🚗 آزمون جدید</button>
    <button class="btn btn-ghost btn-full" onclick="App.navigateBack()">🏠 خانه</button>
  </div>

  <div style="padding:0 16px 16px;">
    <h2 style="font-size:0.9rem;font-weight:700;margin-bottom:12px;color:var(--ink-muted);">جزئیات سوالات</h2>
    <div id="results-list"></div>
  </div>
</div>
`;
}
