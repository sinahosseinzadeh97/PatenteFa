/** Chapter 0: searchable list of driving words, Italian and Persian. Filled by public/js/glossary.js. */
export function renderGlossaryScreen(): string {
  return `
<div id="screen-glossary" class="screen screen-with-nav">
  <main class="page-container glossary-content">
    <header class="page-header">
      <button type="button" onclick="App.handleBackNavigation()" class="icon-button" aria-label="بازگشت به فصل‌ها"><svg class="ui-icon"><use href="#i-chevron-right"/></svg></button>
      <div><span class="page-kicker">فصل ۰، پیش از شروع</span><h1>واژه‌های تخصصی</h1><p>اسمِ قطعه‌ها، بخش‌های راه، تابلوها و کارهایی که در سؤال‌ها می‌آیند، به ایتالیایی و فارسی.</p></div>
    </header>

    <div class="search-field">
      <svg class="ui-icon"><use href="#i-search"/></svg>
      <label for="glossary-search-input" class="visually-hidden">جستجو در واژه‌ها</label>
      <input type="search" id="glossary-search-input" dir="auto" placeholder="ایتالیایی یا فارسی، مثلاً frizione یا کلاچ" class="form-control" oninput="App.filterGlossary()" autocomplete="off" enterkeyhint="search" />
    </div>
    <p id="glossary-count" class="glossary-count" role="status" aria-live="polite"></p>

    <div id="glossary-list" class="glossary-list"><div class="loading-state"><div class="skeleton-line wide"></div><div class="skeleton-line"></div><div class="skeleton-line wide"></div></div></div>
  </main>
</div>`;
}
