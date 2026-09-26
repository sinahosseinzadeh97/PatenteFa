/** Guided lesson: one short step at a time, with its own prev/next dock. Filled by public/js/learn.js. */
export function renderLessonScreen(): string {
  return `
<div id="screen-lesson" class="screen lesson-screen">
  <header class="lesson-topbar">
    <div class="lesson-topbar-row">
      <button type="button" class="icon-button" onclick="App.handleBackNavigation()" aria-label="بازگشت به مسیر یادگیری">
        <svg class="ui-icon"><use href="#i-chevron-right"/></svg>
      </button>
      <div class="lesson-topbar-copy">
        <span id="lesson-kicker" class="lesson-topbar-kicker"></span>
        <strong id="lesson-topbar-title" class="lesson-topbar-title"></strong>
      </div>
      <span id="lesson-step-count" class="lesson-step-count" aria-live="polite"></span>
    </div>
    <div id="lesson-progress" class="lesson-progress" role="progressbar" aria-label="پیشرفت درس" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
      <div id="lesson-progress-fill" class="lesson-progress-fill"></div>
    </div>
    <div id="lesson-save-status" class="lesson-save-status" role="status" aria-live="polite" hidden></div>
  </header>

  <main id="lesson-body" class="lesson-body"></main>

  <div id="lesson-dock" class="lesson-dock">
    <button type="button" id="lesson-prev" class="btn btn-secondary" onclick="App.lessonPrev()">
      <svg class="ui-icon"><use href="#i-chevron-right"/></svg><span>قبلی</span>
    </button>
    <button type="button" id="lesson-next" class="btn btn-primary" onclick="App.lessonNext()">
      <span id="lesson-next-label">بعدی</span><svg class="ui-icon"><use href="#i-chevron-left"/></svg>
    </button>
  </div>
</div>`;
}
