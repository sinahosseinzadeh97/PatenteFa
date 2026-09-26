/** Exam runner shared by full exam, review, and topic practice. */
export function renderExamScreen(): string {
  return `
<div id="screen-exam" class="screen exam-screen">
  <header class="exam-topbar">
    <div class="exam-topbar-row">
      <button id="btn-exit-exam" type="button" class="icon-button exam-exit-btn" onclick="App.handleBackNavigation()" aria-label="خروج از آزمون" title="خروج از آزمون">
        <svg class="ui-icon"><use href="#i-chevron-right"/></svg>
      </button>
      <details id="tabs-details" class="exam-question-menu">
        <summary class="tabs-summary">
          <span class="exam-position-badge">
            <span class="exam-position-label">سؤال</span>
            <span id="exam-position" class="exam-position" aria-live="polite" aria-atomic="true">1 / 30</span>
          </span>
          <svg class="ui-icon"><use href="#i-chevron-down"/></svg>
        </summary>
        <div class="question-tabs" id="exam-tabs" aria-label="فهرست سؤال‌ها"></div>
      </details>
      <span class="timer exam-timer-inline" id="exam-timer" aria-label="زمان باقی‌مانده">20:00</span>
      <button id="btn-flag" type="button" class="icon-button exam-flag-btn" onclick="App.toggleFlag()" aria-label="نشان‌کردن این سؤال برای مرور بعدی" aria-pressed="false">
        <svg class="ui-icon"><use href="#i-bookmark"/></svg>
      </button>
    </div>

    <div class="road-container">
      <div class="road-track" role="progressbar" aria-label="پیشرفت آزمون" aria-valuemin="0" aria-valuemax="30" aria-valuenow="0">
        <div class="road-answered" id="road-answered"></div>
        <div class="road-marker" id="road-marker" aria-hidden="true"><svg class="ui-icon"><use href="#i-exam"/></svg></div>
      </div>
    </div>
  </header>

  <main class="exam-workspace">
    <section class="exam-question-body" aria-labelledby="exam-question-text">
      <div class="question-section-label"><span>متن سؤال</span><span class="question-language">Italiano</span></div>
      <img id="exam-sign-img" class="sign-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" style="display:none;" alt="تصویر مرتبط با سؤال آزمون رانندگی" />
      <p id="exam-question-text" class="question-text"></p>
    </section>

    <div class="exam-tools-row" aria-label="ابزارهای سؤال">
      <button class="tool-button" id="btn-tts" onclick="App.speakQuestion()" aria-label="خواندن متن سؤال با صدای ایتالیایی">
        <svg class="ui-icon"><use href="#i-audio"/></svg><span>پخش ایتالیایی</span>
      </button>
      <label class="tool-button ai-toggle-label" for="translate-toggle">
        <svg class="ui-icon"><use href="#i-sparkles"/></svg><span class="ai-toggle-text">کمک آموزشی</span>
        <input type="checkbox" id="translate-toggle" onchange="App.toggleTranslate()" class="ai-toggle-checkbox" aria-describedby="ai-toggle-sub" />
        <span class="switch-control" aria-hidden="true"></span>
      </label>
    </div>
    <p id="ai-toggle-sub" class="ai-toggle-sub">ترجمه، تئوری و گرامر — همین حالا قابل استفاده است</p>
    <p id="exam-lesson-hint" class="exam-lesson-hint" role="note" hidden></p>

    <section id="translate-panel" class="translate-panel" aria-label="کمک آموزشی سؤال">
      <div class="ai-tabs-bar" role="tablist" aria-label="نوع توضیح">
        <button id="ai-tab-btn-0" class="ai-tab-btn active" onclick="App.switchAiTab(0)" role="tab" aria-selected="true">
          <svg class="ui-icon"><use href="#i-globe"/></svg><span>ترجمه</span>
        </button>
        <button id="ai-tab-btn-1" class="ai-tab-btn" onclick="App.switchAiTab(1)" role="tab" aria-selected="false">
          <svg class="ui-icon"><use href="#i-graduation"/></svg><span>تئوری</span>
        </button>
        <button id="ai-tab-btn-2" class="ai-tab-btn" onclick="App.switchAiTab(2)" role="tab" aria-selected="false">
          <svg class="ui-icon"><use href="#i-book"/></svg><span>گرامر و لغات</span>
        </button>
      </div>

      <div id="ai-tab-0" role="tabpanel" style="display:block;">
        <div class="ai-panel-heading"><svg class="ui-icon"><use href="#i-globe"/></svg><span>ترجمه فارسی</span></div>
        <div id="translate-verdict" class="translate-verdict" style="display:none;"></div>
        <div id="translate-text" class="fa-text translate-text-body"></div>
        <div id="translate-explanation" class="fa-text translate-explanation-body"></div>
      </div>

      <div id="ai-tab-1" role="tabpanel" style="display:none;">
        <div class="ai-panel-heading"><svg class="ui-icon"><use href="#i-graduation"/></svg><span>مربی تئوری</span></div>
        <p class="ai-panel-subtitle">قاعده پشت سؤال و نکته‌ای که باید به خاطر بسپاری</p>
        <div id="theory-loading" class="fa-text ai-loading-msg">در حال آماده‌سازی توضیح…</div>
        <div id="theory-text" class="fa-text theory-text-body"></div>
        <div id="theory-error" class="fa-text ai-error-msg" role="alert"></div>
      </div>

      <div id="ai-tab-2" role="tabpanel" style="display:none;">
        <div class="ai-panel-heading"><svg class="ui-icon"><use href="#i-book"/></svg><span>گرامر و واژگان</span></div>
        <p class="ai-panel-subtitle">ساختار جمله، معنی و واژه‌های مهم</p>
        <div id="grammar-loading" class="fa-text ai-loading-msg">در حال بررسی جمله…</div>
        <div id="grammar-analysis" class="fa-text grammar-analysis-body"></div>
        <div id="vocab-suggestions-list" class="vocab-suggestions-list"></div>
        <div id="grammar-error" class="fa-text ai-error-msg" role="alert"></div>
      </div>
    </section>
  </main>

  <div class="exam-answer-dock">
    <div id="exam-answer-feedback" class="exam-answer-feedback fa-text" role="status" aria-live="polite" aria-atomic="true"></div>
    <div class="exam-answer-row" role="group" aria-label="انتخاب پاسخ">
      <button class="btn btn-falso btn-full" id="btn-falso" onclick="App.answer(0)"><svg class="ui-icon"><use href="#i-x"/></svg><span>FALSO</span></button>
      <button class="btn btn-vero btn-full" id="btn-vero" onclick="App.answer(1)"><svg class="ui-icon"><use href="#i-check"/></svg><span>VERO</span></button>
    </div>
    <div class="exam-continue-slot">
      <button class="btn btn-primary btn-full exam-next-btn" id="btn-next-question" onclick="App.nextQuestion()">
        سؤال بعدی <svg class="ui-icon"><use href="#i-chevron-left"/></svg>
      </button>
      <button class="btn btn-primary btn-full exam-finish-btn" id="btn-finish-exam" onclick="App.finishExam()">پایان آزمون و دیدن نتیجه</button>
    </div>
  </div>
</div>`;
}
