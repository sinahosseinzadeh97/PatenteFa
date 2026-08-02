/**
 * src/app/screens/vocab.ts
 * Vocabulary screen — add/review saved terms (spaced repetition).
 */
export function renderVocabScreen(): string {
  return `
<div id="screen-vocab" class="screen" style="padding:0 0 80px;">
  <div class="vocab-content">
    <h1 class="vocab-title">📖 لغت‌نامه</h1>

    <!-- Add new term -->
    <div class="card vocab-add-card">
      <div class="vocab-add-label">افزودن لغت جدید</div>
      <label for="vocab-it-input" class="visually-hidden">واژه ایتالیایی</label>
      <input type="text" id="vocab-it-input" placeholder="Termine italiano" dir="ltr" class="vocab-input-it" />
      <div class="vocab-input-fa-row">
        <label for="vocab-fa-input" class="visually-hidden">ترجمه فارسی</label>
        <input type="text" id="vocab-fa-input" placeholder="ترجمه فارسی" class="vocab-input-fa" />
        <button class="btn btn-ghost btn-sm" onclick="App.suggestVocab()">AI ✨</button>
      </div>
      <button class="btn btn-primary btn-full btn-sm" onclick="App.saveVocab()">ذخیره</button>
    </div>

    <!-- Due items -->
    <div id="vocab-due-section" class="vocab-due-section">
      <h2 class="vocab-due-heading">باید مرور کنی (<span id="vocab-due-count">0</span>)</h2>
      <div id="vocab-flip-card" class="flip-card" onclick="App.flipVocab()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();App.flipVocab();}" role="button" tabindex="0" aria-label="لغت را بگردان تا ترجمه را ببینی">
        <div class="flip-card-inner">
          <div class="flip-front">
            <div id="vocab-front-text" class="vocab-flip-front-text"></div>
            <div class="vocab-flip-hint">برگردان</div>
          </div>
          <div class="flip-back">
            <div id="vocab-back-text" class="vocab-flip-back-text"></div>
          </div>
        </div>
      </div>
      <div class="vocab-review-row">
        <button class="btn btn-falso btn-full btn-sm" onclick="App.vocabReview(false)">✗ اشتباه</button>
        <button class="btn btn-vero btn-full btn-sm"  onclick="App.vocabReview(true)">✓ درست</button>
      </div>
    </div>

    <!-- All items -->
    <h2 class="vocab-list-heading">همه لغات</h2>
    <div id="vocab-list"></div>
  </div>
</div>
`;
}
