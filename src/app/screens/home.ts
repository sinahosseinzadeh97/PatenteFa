/** Home / personalized study dashboard. */
export function renderHomeScreen(): string {
  return `
<div id="screen-home" class="screen screen-with-nav">
  <main class="page-container home-content">
    <header class="home-header">
      <div class="home-profile-identity">
        <div id="user-avatar-container" class="home-avatar-wrap">
          <img id="user-photo" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" alt="عکس پروفایل کاربر" class="home-avatar-photo" />
          <div id="user-initials-avatar" class="home-avatar-initials" aria-hidden="true">پ</div>
          <span class="home-avatar-status-dot"><span class="visually-hidden">حساب فعال</span></span>
        </div>
        <div class="home-name-block">
          <p class="home-kicker">برنامه مطالعه امروز</p>
          <h1 id="user-full-name" class="home-full-name">کاربر پاتنته</h1>
          <span id="user-username" class="home-username">@user</span>
        </div>
      </div>
      <button type="button" onclick="App.showGuideModal()" class="icon-button" aria-label="راهنمای استفاده">
        <svg class="ui-icon"><use href="#i-help"/></svg>
      </button>
    </header>

    <section id="home-today" class="today-card" aria-labelledby="home-today-title" aria-busy="true">
      <div class="today-head">
        <span class="eyebrow"><svg class="ui-icon"><use href="#i-route"/></svg> مسیر امروز</span>
        <span id="home-today-minutes" class="today-minutes"></span>
      </div>
      <h2 id="home-today-title" class="today-title">در حال آماده‌سازی مسیر امروز…</h2>
      <ol id="home-today-list" class="today-list"></ol>
      <div id="home-today-actions" class="today-actions"></div>
    </section>

    <section class="home-primary" aria-labelledby="home-primary-title">
      <div class="home-primary-copy">
        <span class="eyebrow"><svg class="ui-icon"><use href="#i-exam"/></svg> شبیه‌ساز آزمون اصلی</span>
        <h2 id="home-primary-title">آماده‌ای یک آزمون کامل بدهی؟</h2>
        <p>۳۰ سؤال رسمی، ۲۰ دقیقه، با همان حد مجاز ۳ اشتباه.</p>
      </div>
      <button class="btn btn-secondary btn-full home-start-btn" id="btn-start-exam" onclick="App.startExam()">
        شروع آزمون جامع
        <svg class="ui-icon"><use href="#i-chevron-left"/></svg>
      </button>
    </section>

    <section class="home-progress" aria-label="خلاصه پیشرفت">
      <button type="button" class="home-metric" onclick="App.openExamDateModal()" aria-label="تنظیم تاریخ آزمون">
        <svg class="ui-icon"><use href="#i-calendar"/></svg>
        <span class="home-metric-copy"><span class="home-metric-label">تا آزمون</span><strong id="home-days">—</strong></span>
      </button>
      <div class="home-metric">
        <svg class="ui-icon"><use href="#i-trend"/></svg>
        <span class="home-metric-copy"><span class="home-metric-label">قبولی</span><strong id="home-pass-rate">—</strong><small id="home-total-exams">۰ آزمون</small></span>
      </div>
      <div class="home-metric">
        <svg class="ui-icon"><use href="#i-target"/></svg>
        <span class="home-metric-copy"><span class="home-metric-label">پیوستگی</span><strong id="streak-value">۰ روز</strong></span>
      </div>
    </section>

    <section id="home-focus-card" class="home-focus-card" style="display:none;">
      <div>
        <span class="eyebrow"><svg class="ui-icon"><use href="#i-target"/></svg> پیشنهاد بعدی</span>
        <h2>موضوع ضعیفت را تقویت کن</h2>
        <p id="home-weakest" dir="auto"></p>
      </div>
      <button class="btn btn-secondary" onclick="App.startTopicPractice()">شروع تمرین</button>
    </section>

    <section class="home-section" aria-labelledby="home-tools-heading">
      <div class="section-heading-row"><div><span class="section-kicker">مسیرهای کوتاه‌تر</span><h2 id="home-tools-heading">انتخاب نوع مطالعه</h2></div></div>
      <div class="home-tool-grid">
        <button type="button" class="home-tool" onclick="App.showScreen('topics')">
          <svg class="ui-icon"><use href="#i-book"/></svg><span><strong>فصل‌ها</strong><small>درس‌ها و تمرین موضوعی</small></span><svg class="ui-icon home-tool-arrow"><use href="#i-chevron-left"/></svg>
        </button>
        <button type="button" class="home-tool" onclick="App.showScreen('signs')">
          <svg class="ui-icon"><use href="#i-sign"/></svg><span><strong>تابلوها</strong><small>فلش‌کارت تصویری</small></span><svg class="ui-icon home-tool-arrow"><use href="#i-chevron-left"/></svg>
        </button>
        <button type="button" class="home-tool home-tool-review" id="btn-start-review" onclick="App.startReview()" style="display:none;">
          <svg class="ui-icon"><use href="#i-review"/></svg><span><strong>مرور اشتباهات</strong><small><b id="home-review">۰</b> سؤال آماده مرور</small></span><svg class="ui-icon home-tool-arrow"><use href="#i-chevron-left"/></svg>
        </button>
      </div>
    </section>

    <section id="home-recent-section" class="home-section home-recent-section">
      <div class="section-heading-row"><div><span class="section-kicker">روند اخیر</span><h2>آخرین آزمون‌ها</h2></div><svg class="ui-icon"><use href="#i-history"/></svg></div>
      <div id="home-recent-list" class="home-recent-list"></div>
    </section>

    <aside class="data-notice">
      <svg class="ui-icon"><use href="#i-alert"/></svg>
      <span>بانک سؤال مربوط به ۲۰۲۳ است؛ نزدیک آزمون، تغییرات احتمالی را با منبع رسمی بررسی کن.</span>
    </aside>
  </main>
</div>`;
}
