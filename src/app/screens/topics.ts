/**
 * src/app/screens/topics.ts
 * Topics (Capitoli) list screen.
 */
export function renderTopicsScreen(): string {
  return `
<div id="screen-topics" class="screen" style="padding:0 0 85px;">
  <div style="padding:20px 16px 0;">
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
      <h1 style="margin:0; font-family:'Barlow Condensed',sans-serif; font-size:1.7rem; font-weight:700;">📚 فصل‌های آموزشی</h1>
      <span style="font-size:0.78rem; background:rgba(232,163,61,0.15); color:var(--amber); padding:3px 8px; border-radius:10px; font-weight:700;">Capitoli</span>
    </div>
    
    <p style="font-size:0.8rem; color:var(--ink-muted); margin:0 0 16px; line-height:1.5;">
      فصل مورد نظر خود را برای مطالعه به دو زبان ایتالیایی و فارسی انتخاب کرده و آزمون اختصاصی ۱۵ سوالی آن را شروع کنید:
    </p>

    <!-- Search input -->
    <input type="text" id="topics-search-input" placeholder="🔍 جستجو در نام فصل یا کلمات کلیدی (مثلاً: خطر، سبقت، سرعت)..." style="width:100%; padding:10px 14px; background:var(--surface-2); border:1px solid var(--border); border-radius:12px; color:var(--ink); font-family:'Vazirmatn',sans-serif; font-size:0.85rem; margin-bottom:16px; direction:rtl;" oninput="App.filterTopics()" />

    <!-- Topics Grid/List Container -->
    <div id="topics-list-container" style="display:flex; flex-direction:column; gap:12px;">
      <div style="text-align:center; padding:30px; color:var(--ink-muted);">در حال لود فصل‌های آموزشی… ⏳</div>
    </div>
  </div>
</div>
`;
}
