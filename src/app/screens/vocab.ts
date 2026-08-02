/**
 * src/app/screens/vocab.ts
 * Vocabulary screen — add/review saved terms (spaced repetition).
 */
export function renderVocabScreen(): string {
  return `
<div id="screen-vocab" class="screen" style="padding:0 0 80px;">
  <div style="padding:20px 16px 0;">
    <h1 style="margin:0 0 16px;font-family:'Barlow Condensed',sans-serif;font-size:1.8rem;font-weight:700;">📖 لغت‌نامه</h1>

    <!-- Add new term -->
    <div class="card" style="margin-bottom:16px;">
      <div style="font-size:0.8rem;font-weight:700;margin-bottom:12px;color:var(--ink-muted);">افزودن لغت جدید</div>
      <input type="text" id="vocab-it-input" placeholder="Termine italiano" dir="ltr"
        style="width:100%;padding:10px 12px;background:var(--surface-2);border:1px solid var(--border);border-radius:8px;color:var(--ink);font-family:'Public Sans',sans-serif;font-size:0.95rem;margin-bottom:8px;" />
      <div style="display:flex;gap:8px;margin-bottom:8px;">
        <input type="text" id="vocab-fa-input" placeholder="ترجمه فارسی"
          style="flex:1;padding:10px 12px;background:var(--surface-2);border:1px solid var(--border);border-radius:8px;color:var(--ink);font-family:'Vazirmatn',sans-serif;font-size:0.95rem;direction:rtl;" />
        <button class="btn btn-ghost btn-sm" onclick="App.suggestVocab()">AI ✨</button>
      </div>
      <button class="btn btn-primary btn-full btn-sm" onclick="App.saveVocab()">ذخیره</button>
    </div>

    <!-- Due items -->
    <div id="vocab-due-section" style="display:none;margin-bottom:16px;">
      <h2 style="font-size:0.88rem;font-weight:700;margin:0 0 10px;">باید مرور کنی (<span id="vocab-due-count">0</span>)</h2>
      <div id="vocab-flip-card" class="flip-card" onclick="App.flipVocab()">
        <div class="flip-card-inner">
          <div class="flip-front">
            <div id="vocab-front-text" style="font-family:'Public Sans',sans-serif;font-size:1.3rem;font-weight:600;direction:ltr;text-align:center;"></div>
            <div style="font-size:0.75rem;color:var(--ink-muted);">برگردان</div>
          </div>
          <div class="flip-back">
            <div id="vocab-back-text" style="font-family:'Vazirmatn',sans-serif;font-size:1.3rem;font-weight:600;direction:rtl;text-align:center;color:var(--ink);"></div>
          </div>
        </div>
      </div>
      <div style="display:flex;gap:10px;margin-top:10px;">
        <button class="btn btn-falso btn-full btn-sm" onclick="App.vocabReview(false)">✗ اشتباه</button>
        <button class="btn btn-vero btn-full btn-sm"  onclick="App.vocabReview(true)">✓ درست</button>
      </div>
    </div>

    <!-- All items -->
    <h2 style="font-size:0.88rem;font-weight:700;margin:0 0 10px;">همه لغات</h2>
    <div id="vocab-list"></div>
  </div>
</div>
`;
}
