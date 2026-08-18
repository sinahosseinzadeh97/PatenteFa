/**
 * src/app/screens/exam.ts
 * Exam runner screen — the core "money path" (also reused for review mode and topic practice).
 */
export function renderExamScreen(): string {
  return `
<div id="screen-exam" class="screen">
  <!-- Top bar -->
  <div class="exam-topbar">
    <div class="exam-topbar-row">
      <!-- Collapsible question tabs -->
      <details id="tabs-details" style="flex:1;min-width:0;">
        <summary class="tabs-summary">
          <span class="exam-position-badge">
            <span class="exam-position-label">سؤال جاری</span>
            <span id="exam-position" class="exam-position" aria-live="polite" aria-atomic="true">1 / 30</span>
          </span>
          <span class="exam-tabs-hint">فهرست سؤال‌ها</span>
        </summary>
        <div class="question-tabs" id="exam-tabs"></div>
      </details>
      <button id="btn-flag" class="btn-icon" onclick="App.toggleFlag()" aria-label="نشان‌کردن این سوال برای مرور بعدی" aria-pressed="false">🔖</button>
      <button id="btn-exit-exam" class="btn-icon exam-exit-btn" onclick="App.handleBackNavigation()" aria-label="خروج از آزمون" title="خروج از آزمون">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="screen-back-icon" aria-hidden="true"><path d="M15 18l6-6-6-6"/></svg>
      </button>
    </div>

    <!-- Road map progress bar -->
    <div class="road-container">
      <div class="road-track" role="progressbar" aria-label="پیشرفت آزمون" aria-valuemin="0" aria-valuemax="30" aria-valuenow="0">
        <div class="road-answered" id="road-answered"></div>
        <div class="road-marker" id="road-marker" aria-hidden="true">🏎️</div>
      </div>
    </div>
  </div>

  <!-- Ascolta + Timer row (timer relocated underneath Ascolta) -->
  <div class="exam-tts-row">
    <button class="tts-btn" id="btn-tts" onclick="App.speakQuestion()" aria-label="خواندن متن سوال با صدای ایتالیایی">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="tts-icon" aria-hidden="true">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
      </svg>
      Ascolta
    </button>
    <span class="timer exam-timer-inline" id="exam-timer">20:00</span>
  </div>

  <!-- §15.3 — AI panel toggle row -->
  <div class="ai-toggle-row">
    <label class="ai-toggle-label" for="translate-toggle">
      <span class="ai-toggle-text">کمک AI</span>
      <input type="checkbox" id="translate-toggle" onchange="App.toggleTranslate()" class="ai-toggle-checkbox" aria-describedby="ai-toggle-sub" />
      <span id="ai-toggle-sub" class="ai-toggle-sub">همین حالا قابل استفاده است</span>
    </label>
  </div>

  <!-- §15.3 — Three-tab AI panel (lazy loading per tab) -->
  <div id="translate-panel" class="translate-panel">
    <!-- Tab bar -->
    <div class="ai-tabs-bar" role="tablist">
      <button id="ai-tab-btn-0" class="ai-tab-btn active" onclick="App.switchAiTab(0)" role="tab" aria-selected="true">
        🌐 ترجمه
      </button>
      <button id="ai-tab-btn-1" class="ai-tab-btn" onclick="App.switchAiTab(1)" role="tab" aria-selected="false">
        🎓 تئوری
      </button>
      <button id="ai-tab-btn-2" class="ai-tab-btn" onclick="App.switchAiTab(2)" role="tab" aria-selected="false">
        📚 گرامر
      </button>
    </div>

    <!-- Tab 0: Translation (default, loads immediately) -->
    <div id="ai-tab-0" role="tabpanel" style="display:block;">
      <div class="ai-tab-header-row">
        <span class="ai-tab-header-icon">🌐</span>
        <span class="fa-text translate-mentor-label">مترجم فارسی</span>
      </div>
      <!-- §19.2: verdict badge — shown ABOVE translation, populated by showTranslation() -->
      <div id="translate-verdict" style="display:none;margin-bottom:10px;"></div>
      <div id="translate-text" class="fa-text translate-text-body"></div>
      <div id="translate-explanation" class="fa-text translate-explanation-body"></div>
    </div>

    <!-- Tab 1: Theory (lazy — fires on first tap of this tab) -->
    <div id="ai-tab-1" role="tabpanel" style="display:none;">
      <div class="ai-agent-header theory">
        <span class="ai-agent-icon">🎓</span>
        <div>
          <div class="fa-text ai-agent-name theory">مربی تئوری</div>
          <div class="fa-text ai-agent-sub">متخصص آزمون پاتنته B — کدیچه دلا استرادا</div>
        </div>
      </div>
      <div id="theory-loading" class="fa-text ai-loading-msg">
        ⏳ مربی تئوری در حال آماده کردن توضیح…
      </div>
      <div id="theory-text" class="fa-text theory-text-body"></div>
      <div id="theory-error" class="fa-text ai-error-msg"></div>
    </div>

    <!-- Tab 2: Grammar & vocab (lazy — fires on first tap of this tab) -->
    <div id="ai-tab-2" role="tabpanel" style="display:none;">
      <div class="ai-agent-header grammar">
        <span class="ai-agent-icon">📚</span>
        <div>
          <div class="fa-text ai-agent-name grammar">معلم گرامر</div>
          <div class="fa-text ai-agent-sub">استاد زبان ایتالیایی — متخصص متون آزمون پاتنته</div>
        </div>
      </div>
      <div id="grammar-loading" class="fa-text ai-loading-msg">
        ⏳ معلم گرامر در حال بررسی جمله…
      </div>
      <div id="grammar-analysis" class="fa-text grammar-analysis-body"></div>
      <div id="vocab-suggestions-list" class="vocab-suggestions-list"></div>
      <div id="grammar-error" class="fa-text ai-error-msg"></div>
    </div>
  </div>


  <!-- Question body -->
  <div class="exam-question-body">
    <img id="exam-sign-img" class="sign-image" style="display:none;" alt="تابلوی راهنمایی و رانندگی مربوط به این سوال" />
    <p id="exam-question-text" class="question-text"></p>
  </div>

  <!-- VERO / FALSO buttons -->
  <div class="exam-answer-row">
    <button class="btn btn-falso btn-full" id="btn-falso" onclick="App.answer(0)">✗ FALSO</button>
    <button class="btn btn-vero btn-full"  id="btn-vero"  onclick="App.answer(1)">✓ VERO</button>
  </div>
  <button class="btn btn-primary btn-full exam-finish-btn" id="btn-finish-exam" onclick="App.finishExam()">
    پایان آزمون و دیدن نتیجه
  </button>
</div>
`;
}
