/** Vocabulary add/list/review screen. */
export function renderVocabScreen(): string {
  return `
<div id="screen-vocab" class="screen screen-with-nav">
  <main class="page-container vocab-content">
    <header class="page-header page-header-simple"><div><span class="page-kicker">یادگیری زبان آزمون</span><h1>واژه‌نامه</h1></div><svg class="ui-icon page-header-icon"><use href="#i-book"/></svg></header>

    <section class="vocab-add-card" aria-labelledby="vocab-add-title">
      <div class="section-heading-row"><div><span class="section-kicker">واژه جدید</span><h2 id="vocab-add-title">افزودن به واژه‌نامه</h2></div></div>
      <div class="field-group">
        <label for="vocab-it-input" class="field-label">واژه یا عبارت ایتالیایی</label>
        <input type="text" id="vocab-it-input" placeholder="مثلاً: precedenza" dir="ltr" class="form-control ltr" autocomplete="off" />
      </div>
      <div class="field-group">
        <div class="field-label-row"><label for="vocab-fa-input" class="field-label">معنی فارسی</label><button type="button" class="text-button" onclick="App.suggestVocab()"><svg class="ui-icon"><use href="#i-sparkles"/></svg> پیشنهاد ترجمه</button></div>
        <input type="text" id="vocab-fa-input" placeholder="معنی را بنویسید" class="form-control" autocomplete="off" />
      </div>
      <button class="btn btn-primary btn-full" onclick="App.saveVocab()">ذخیره واژه</button>
    </section>

    <section id="vocab-due-section" class="vocab-due-section" aria-labelledby="vocab-due-heading">
      <div class="section-heading-row"><div><span class="section-kicker">مرور امروز</span><h2 id="vocab-due-heading"><span id="vocab-due-count">۰</span> واژه آماده مرور</h2></div></div>
      <div id="vocab-flip-card" class="flip-card" onclick="App.flipVocab()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();App.flipVocab();}" role="button" tabindex="0" aria-label="کارت را برگردان تا ترجمه را ببینی">
        <div class="flip-card-inner"><div class="flip-front"><div id="vocab-front-text" class="vocab-flip-front-text"></div><div class="flip-hint">برای دیدن معنی لمس کن</div></div><div class="flip-back"><div id="vocab-back-text" class="vocab-flip-back-text"></div></div></div>
      </div>
      <div class="vocab-review-row">
        <button class="btn btn-secondary btn-full" onclick="App.vocabReview(false)"><svg class="ui-icon"><use href="#i-review"/></svg> دوباره مرور می‌کنم</button>
        <button class="btn btn-primary btn-full" onclick="App.vocabReview(true)"><svg class="ui-icon"><use href="#i-check"/></svg> یادم بود</button>
      </div>
    </section>

    <section class="home-section" aria-labelledby="vocab-list-heading">
      <div class="section-heading-row"><div><span class="section-kicker">آرشیو شخصی</span><h2 id="vocab-list-heading">همه واژه‌ها</h2></div></div>
      <div id="vocab-list" class="vocab-list"><div class="empty-state"><svg class="ui-icon"><use href="#i-book"/></svg><strong>هنوز واژه‌ای ذخیره نکردی</strong><span>از یک سؤال شروع کن یا واژه‌ای را همین بالا اضافه کن.</span></div></div>
    </section>
  </main>
</div>`;
}
