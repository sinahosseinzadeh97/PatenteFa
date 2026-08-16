/**
 * src/app/screens/topics.ts
 * Topics (Capitoli) list screen.
 */
export function renderTopicsScreen(): string {
  return `
<div id="screen-topics" class="screen" style="padding:0 0 85px;">
  <div class="topics-content">
    <div class="screen-header-bar topics-header-row">
      <button type="button" onclick="App.handleBackNavigation()" class="screen-back-btn" aria-label="بازگشت به خانه">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="screen-back-icon" aria-hidden="true"><path d="M15 18l6-6-6-6"/></svg>
      </button>
      <h1 class="topics-title screen-header-title">📚 فصل‌های آموزشی</h1>
      <span class="topics-badge">Capitoli</span>
    </div>

    <p class="topics-intro">
      فصل مورد نظر خود را برای مطالعه به دو زبان ایتالیایی و فارسی انتخاب کرده و آزمون اختصاصی ۱۵ سوالی آن را شروع کنید:
    </p>

    <!-- Search input -->
    <label for="topics-search-input" class="visually-hidden">جستجو در فصل‌ها</label>
    <input type="text" id="topics-search-input" placeholder="🔍 جستجو در نام فصل یا کلمات کلیدی (مثلاً: خطر، سبقت، سرعت)..." class="topics-search-input" oninput="App.filterTopics()" />

    <!-- Topics Grid/List Container -->
    <div id="topics-list-container" class="topics-list-container">
      <div class="topics-loading-note">در حال لود فصل‌های آموزشی… ⏳</div>
    </div>
  </div>
</div>
`;
}
