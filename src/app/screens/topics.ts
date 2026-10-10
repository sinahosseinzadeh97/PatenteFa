/** Topic list and topic-practice entry. */
export function renderTopicsScreen(): string {
  return `
<div id="screen-topics" class="screen screen-with-nav">
  <main class="page-container topics-content">
    <header class="page-header">
      <button type="button" onclick="App.handleBackNavigation()" class="icon-button" aria-label="بازگشت به خانه"><svg class="ui-icon"><use href="#i-chevron-right"/></svg></button>
      <div><span class="page-kicker">یادگیری و تمرین</span><h1>فصل‌های آموزشی</h1><p>اول درس را بخوان، بعد با سؤال‌های واقعی بانک تمرین کن.</p></div>
    </header>

    <section id="learn-section" class="learn-section" aria-labelledby="learn-heading" tabindex="-1">
      <div class="section-heading-row"><div><span class="section-kicker">یادگیری گام‌به‌گام</span><h2 id="learn-heading">درس‌ها</h2></div><svg class="ui-icon"><use href="#i-route"/></svg></div>
      <div id="learn-chapter" class="learn-chapter" aria-live="polite"><div class="loading-state"><div class="skeleton-line wide"></div><div class="skeleton-line"></div></div></div>
    </section>

    <div class="section-heading-row practice-heading-row"><div><span class="section-kicker">تمرین با سؤال‌های واقعی</span><h2>تمرین موضوعی</h2></div></div>

    <div class="search-field">
      <svg class="ui-icon"><use href="#i-search"/></svg>
      <label for="topics-search-input" class="visually-hidden">جستجو در فصل‌ها</label>
      <input type="search" id="topics-search-input" placeholder="نام فصل یا کلمه کلیدی" class="form-control" oninput="App.filterTopics()" autocomplete="off" />
    </div>

    <div id="topics-list-container" class="topics-list-container" aria-live="polite"><div class="loading-state"><div class="skeleton-line wide"></div><div class="skeleton-line"></div><div class="skeleton-line wide"></div></div></div>
  </main>
</div>`;
}
