/** Topic list and topic-practice entry. */
export function renderTopicsScreen(): string {
  return `
<div id="screen-topics" class="screen screen-with-nav">
  <main class="page-container topics-content">
    <header class="page-header">
      <button type="button" onclick="App.handleBackNavigation()" class="icon-button" aria-label="بازگشت به خانه"><svg class="ui-icon"><use href="#i-chevron-right"/></svg></button>
      <div><span class="page-kicker">تمرین موضوعی</span><h1>فصل‌های آموزشی</h1><p>یک فصل را انتخاب کن و با ۱۵ سؤال روی همان موضوع تمرکز کن.</p></div>
    </header>

    <div class="search-field">
      <svg class="ui-icon"><use href="#i-search"/></svg>
      <label for="topics-search-input" class="visually-hidden">جستجو در فصل‌ها</label>
      <input type="search" id="topics-search-input" placeholder="نام فصل یا کلمه کلیدی" class="form-control" oninput="App.filterTopics()" autocomplete="off" />
    </div>

    <div id="topics-list-container" class="topics-list-container" aria-live="polite"><div class="loading-state"><div class="skeleton-line wide"></div><div class="skeleton-line"></div><div class="skeleton-line wide"></div></div></div>
  </main>
</div>`;
}
