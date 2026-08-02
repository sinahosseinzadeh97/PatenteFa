/**
 * src/app/screens/results.ts
 * Results screen — score, pass/fail, per-question sign-flip reveal.
 */
export function renderResultsScreen(): string {
  return `
<div id="screen-results" class="screen" style="padding:0 0 80px;">
  <div class="results-header">
    <div id="results-badge" class="result-badge pass"></div>
    <div class="results-score-value" id="results-score"></div>
    <div class="results-detail" id="results-detail"></div>
    <div class="results-time" id="results-time"></div>
  </div>

  <div id="results-tutor-banner" class="results-tutor-banner-wrap">
    <button onclick="App.openTutorReview()" class="btn btn-full results-tutor-banner-btn">
      <span class="results-tutor-banner-icon" aria-hidden="true">🎓</span>
      <span id="results-tutor-banner-text">تحلیل و رفع اشکال سوالات غلط با استاد AI</span>
    </button>
  </div>

  <div class="results-actions-row">
    <button class="btn btn-primary btn-full" onclick="App.startExam()">🚗 آزمون جدید</button>
    <button class="btn btn-ghost btn-full" onclick="App.navigateBack()">🏠 خانه</button>
  </div>

  <div class="results-list-wrap">
    <h2 class="results-list-heading">جزئیات سوالات</h2>
    <div id="results-list"></div>
  </div>
</div>
`;
}
