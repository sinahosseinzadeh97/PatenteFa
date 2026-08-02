/**
 * src/app/screens/exam.ts
 * Exam runner screen — the core "money path" (also reused for review mode and topic practice).
 */
export function renderExamScreen(): string {
  return `
<div id="screen-exam" class="screen">
  <!-- Top bar -->
  <div class="exam-topbar">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
      <!-- Collapsible question tabs -->
      <details id="tabs-details" style="flex:1;min-width:0;">
        <summary class="tabs-summary">
          <span id="exam-position" style="font-family:'Public Sans',sans-serif;font-size:0.82rem;color:var(--ink-muted);">Q 1 / 30</span>
          <span style="font-size:0.72rem;color:var(--border);margin-right:6px;"> — ببین</span>
        </summary>
        <div class="question-tabs" id="exam-tabs"></div>
      </details>
      <button id="btn-flag" onclick="App.toggleFlag()" style="background:none;border:none;cursor:pointer;font-size:1.2rem;padding:4px 8px;border-radius:8px;margin-right:4px;opacity:0.4;flex-shrink:0;">🔖</button>
    </div>

    <!-- Road map progress bar -->
    <div class="road-container">
      <div class="road-track">
        <div class="road-answered" id="road-answered"></div>
        <div class="road-marker" id="road-marker">🏎️</div>
      </div>
    </div>
  </div>

  <!-- Ascolta + Timer row (timer relocated underneath Ascolta) -->
  <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px 0;">
    <button class="tts-btn" id="btn-tts" onclick="App.speakQuestion()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px;">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
      </svg>
      Ascolta
    </button>
    <span class="timer" id="exam-timer" style="font-size:0.95rem;flex-shrink:0;">20:00</span>
  </div>

  <!-- §15.3 — AI panel toggle row -->
  <div style="display:flex;align-items:center;justify-content:flex-end;padding:6px 16px 0;">
    <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:0.82rem;color:var(--ink-muted);">
      <span style="font-family:'Public Sans',sans-serif;">کمک AI</span>
      <input type="checkbox" id="translate-toggle" onchange="App.toggleTranslate()" style="width:36px;height:20px;cursor:pointer;accent-color:var(--amber);" />
      <span style="font-size:0.72rem;">🤖 ۳ متخصص</span>
    </label>
  </div>

  <!-- §15.3 — Three-tab AI panel (lazy loading per tab) -->
  <div id="translate-panel" class="translate-panel">
    <!-- Tab bar -->
    <div style="display:flex;border-bottom:1px solid var(--border);margin-bottom:12px;gap:0;">
      <button id="ai-tab-btn-0" onclick="App.switchAiTab(0)"
        style="flex:1;padding:8px 4px;background:none;border:none;border-bottom:2px solid var(--amber);color:var(--ink);font-size:0.72rem;font-family:'Vazirmatn',sans-serif;cursor:pointer;font-weight:600;transition:all 150ms;">
        🌐 ترجمه
      </button>
      <button id="ai-tab-btn-1" onclick="App.switchAiTab(1)"
        style="flex:1;padding:8px 4px;background:none;border:none;border-bottom:2px solid transparent;color:var(--ink-muted);font-size:0.72rem;font-family:'Vazirmatn',sans-serif;cursor:pointer;font-weight:500;transition:all 150ms;">
        🎓 تئوری
      </button>
      <button id="ai-tab-btn-2" onclick="App.switchAiTab(2)"
        style="flex:1;padding:8px 4px;background:none;border:none;border-bottom:2px solid transparent;color:var(--ink-muted);font-size:0.72rem;font-family:'Vazirmatn',sans-serif;cursor:pointer;font-weight:500;transition:all 150ms;">
        📚 گرامر
      </button>
    </div>

    <!-- Tab 0: Translation (default, loads immediately) -->
    <div id="ai-tab-0" style="display:block;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
        <span style="font-size:1.1rem;">🌐</span>
        <span class="fa-text" style="font-size:0.75rem;color:var(--ink-muted);font-weight:600;">مترجم فارسی</span>
      </div>
      <!-- §19.2: verdict badge — shown ABOVE translation, populated by showTranslation() -->
      <div id="translate-verdict" style="display:none;margin-bottom:10px;"></div>
      <div id="translate-text" class="fa-text" style="color:var(--ink);margin-bottom:8px;font-size:0.95rem;line-height:1.8;"></div>
      <div id="translate-explanation" class="fa-text" style="color:var(--ink-muted);font-size:0.875rem;border-top:1px solid var(--border);padding-top:8px;margin-top:4px;"></div>
    </div>

    <!-- Tab 1: Theory (lazy — fires on first tap of this tab) -->
    <div id="ai-tab-1" style="display:none;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;padding:8px 10px;background:rgba(22,163,74,0.07);border-radius:10px;border:1px solid rgba(22,163,74,0.15);">
        <span style="font-size:1.4rem;">🎓</span>
        <div>
          <div class="fa-text" style="font-size:0.8rem;font-weight:700;color:var(--go);">مربی تئوری</div>
          <div class="fa-text" style="font-size:0.68rem;color:var(--ink-muted);">متخصص آزمون پاتنته B — کدیچه دلا استرادا</div>
        </div>
      </div>
      <div id="theory-loading" class="fa-text" style="display:none;color:var(--ink-muted);font-size:0.85rem;text-align:center;padding:16px 0;">
        ⏳ مربی تئوری در حال آماده کردن توضیح…
      </div>
      <div id="theory-text" class="fa-text" style="color:var(--ink);font-size:0.88rem;line-height:1.9;white-space:pre-wrap;"></div>
      <div id="theory-error" class="fa-text" style="display:none;color:var(--stop);font-size:0.82rem;text-align:center;padding:12px 0;"></div>
    </div>

    <!-- Tab 2: Grammar & vocab (lazy — fires on first tap of this tab) -->
    <div id="ai-tab-2" style="display:none;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;padding:8px 10px;background:rgba(251,191,36,0.08);border-radius:10px;border:1px solid rgba(251,191,36,0.2);">
        <span style="font-size:1.4rem;">📚</span>
        <div>
          <div class="fa-text" style="font-size:0.8rem;font-weight:700;color:var(--amber);">معلم گرامر</div>
          <div class="fa-text" style="font-size:0.68rem;color:var(--ink-muted);">استاد زبان ایتالیایی — متخصص متون آزمون پاتنته</div>
        </div>
      </div>
      <div id="grammar-loading" class="fa-text" style="display:none;color:var(--ink-muted);font-size:0.85rem;text-align:center;padding:16px 0;">
        ⏳ معلم گرامر در حال بررسی جمله…
      </div>
      <div id="grammar-analysis" class="fa-text" style="color:var(--ink);font-size:0.88rem;line-height:1.9;margin-bottom:12px;"></div>
      <div id="vocab-suggestions-list" style="display:flex;flex-direction:column;gap:6px;"></div>
      <div id="grammar-error" class="fa-text" style="display:none;color:var(--stop);font-size:0.82rem;text-align:center;padding:12px 0;"></div>
    </div>
  </div>


  <!-- Question body -->
  <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px;">
    <img id="exam-sign-img" class="sign-image" style="display:none;" alt="road sign" />
    <p id="exam-question-text" class="question-text"></p>
  </div>

  <!-- VERO / FALSO buttons -->
  <div style="padding:0 16px 16px;display:flex;gap:12px;">
    <button class="btn btn-falso btn-full" id="btn-falso" onclick="App.answer(0)">✗ FALSO</button>
    <button class="btn btn-vero btn-full"  id="btn-vero"  onclick="App.answer(1)">✓ VERO</button>
  </div>
</div>
`;
}
