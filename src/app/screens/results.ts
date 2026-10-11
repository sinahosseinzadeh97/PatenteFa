/** Results summary and per-question review. */
export function renderResultsScreen(): string {
  return `
<div id="screen-results" class="screen screen-with-nav">
  <main class="page-container results-page">
    <header class="page-header results-nav-header">
      <button type="button" onclick="App.handleBackNavigation()" class="icon-button" aria-label="بازگشت به خانه"><svg class="ui-icon"><use href="#i-chevron-right"/></svg></button>
      <div><span class="page-kicker">پایان جلسه</span><h1>نتیجه آزمون</h1></div>
    </header>

    <section class="results-summary" aria-labelledby="results-score">
      <div id="results-badge" class="result-badge pass"></div>
      <div class="results-score-value" id="results-score"></div>
      <div class="results-detail" id="results-detail"></div>
      <div class="results-time" id="results-time"></div>
      <p id="results-assisted-note" class="results-assisted-note" hidden>این آزمون با کمک هوش مصنوعی انجام شد و در درصد قبولی حساب نمی‌شود.</p>

      <div class="results-stat-grid" aria-label="خلاصه پاسخ‌ها">
        <div class="results-stat correct"><span>درست</span><strong id="results-correct-count">۰</strong></div>
        <div class="results-stat wrong"><span>غلط</span><strong id="results-wrong-count">۰</strong></div>
        <div class="results-stat unanswered"><span>بی‌پاسخ</span><strong id="results-unanswered-count">۰</strong></div>
      </div>
    </section>

    <section id="results-next-step" class="results-next-step" aria-labelledby="results-next-title">
      <span class="section-kicker">قدم بعدی پیشنهادی</span>
      <h2 id="results-next-title">اشتباه‌ها را همین حالا مرور کن</h2>
      <p id="results-next-copy">مرور فوری کمک می‌کند تله‌های سؤال در ذهنت تثبیت نشوند.</p>
      <button id="results-review-btn" class="btn btn-primary btn-full" onclick="App.startReview()"><svg class="ui-icon"><use href="#i-review"/></svg><span>مرور سؤال‌های غلط</span></button>
    </section>

    <div id="results-tutor-banner" class="results-tutor-banner-wrap">
      <button onclick="App.openTutorReview()" class="btn btn-secondary btn-full results-tutor-banner-btn">
        <svg class="ui-icon"><use href="#i-graduation"/></svg><span id="results-tutor-banner-text">تحلیل سؤال‌های غلط با مربی</span>
      </button>
    </div>

    <div class="results-actions-row">
      <button class="btn btn-secondary btn-full" onclick="App.startExam()">آزمون جدید</button>
      <button class="btn btn-quiet btn-full" onclick="App.showScreen('home')">بازگشت به خانه</button>
    </div>

    <section class="results-list-wrap" aria-labelledby="results-list-heading">
      <div class="section-heading-row"><div><span class="section-kicker">مرور پاسخ‌ها</span><h2 id="results-list-heading">جزئیات ۳۰ سؤال</h2></div></div>
      <div id="results-list" class="results-list"></div>
    </section>
  </main>
</div>`;
}
