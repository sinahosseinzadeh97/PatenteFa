/** Legacy topic statistics route retained for deep links. */
export function renderStatsScreen(): string {
  return `
<div id="screen-stats" class="screen screen-with-nav">
  <main class="page-container stats-content">
    <header class="page-header"><button type="button" onclick="App.handleBackNavigation()" class="icon-button" aria-label="بازگشت به خانه"><svg class="ui-icon"><use href="#i-chevron-right"/></svg></button><div><span class="page-kicker">نمای سریع</span><h1>آمار مطالعه</h1></div></header>
    <section class="stats-chip-row" aria-label="آمار کلی"><div class="stat-chip"><strong id="stats-streak">۰</strong><span>روز پیوسته</span></div><div class="stat-chip"><strong id="stats-sessions">۰</strong><span>آزمون</span></div><div class="stat-chip"><strong id="stats-pass-rate">—</strong><span>قبولی</span></div></section>
    <section class="analysis-block"><div class="analysis-block-heading"><span>دقت بر اساس موضوع</span></div><div id="stats-topic-bars"></div></section>
    <button class="btn btn-primary btn-full" onclick="App.showScreen('profile')">مشاهده تحلیل کامل</button>
  </main>
</div>`;
}
