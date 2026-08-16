/**
 * src/app/screens/tutor.ts
 * AI exam tutor review screen (post-results wrong-answer walkthrough + chat).
 */
export function renderTutorScreen(): string {
  return `
<div id="screen-tutor" class="screen" style="padding:0 0 90px;display:none;flex-direction:column;">
  <!-- Header -->
  <div class="tutor-header">
    <button onclick="App.handleBackNavigation()" class="tutor-back-btn" aria-label="بازگشت به نتایج">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="screen-back-icon" aria-hidden="true"><path d="M15 18l6-6-6-6"/></svg>
    </button>
    <div class="tutor-header-title-wrap">
      <h1 class="tutor-header-title">🎓 استاد رفع اشکال هوش مصنوعی</h1>
      <span id="tutor-progress-badge" class="tutor-header-sub">در حال دریافت اطلاعات...</span>
    </div>
    <div class="tutor-header-spacer"></div>
  </div>

  <!-- Loading State -->
  <div id="tutor-loading" class="tutor-loading">
    <div class="spinner" style="margin:0 auto 16px;"></div>
    <div class="tutor-loading-title">در حال تحلیل آزمون و استخراج نکات توسط استاد AI...</div>
    <div class="tutor-loading-sub">تله‌های سوالات، قوانین آیین‌نامه و لغات در حال استخراج است.</div>
  </div>

  <!-- Content Container -->
  <div id="tutor-content" class="tutor-content">

    <!-- Question Stepper -->
    <div id="tutor-stepper" class="tutor-stepper"></div>

    <!-- Active Question Tutor Card -->
    <div id="tutor-card" class="card tutor-card">

      <!-- Question Badge & Answers comparison -->
      <div class="tutor-card-header-row">
        <span id="tutor-q-badge" class="badge tutor-q-badge">سوال اشتباه</span>
        <span id="tutor-q-answers-cmp" class="tutor-q-cmp" dir="ltr"></span>
      </div>

      <!-- Question Image -->
      <div id="tutor-q-image-container" class="tutor-q-image-wrap">
        <img id="tutor-q-image" src="" class="tutor-q-image" alt="تصویر سوال" />
      </div>

      <!-- Italian Question Text -->
      <div id="tutor-q-text-it" dir="ltr" class="tutor-q-text-it"></div>

      <!-- Persian Translation -->
      <div id="tutor-q-text-fa" class="tutor-q-text-fa"></div>

      <hr class="tutor-divider" />

      <!-- Trap / Misconception -->
      <div class="tutor-info-block">
        <div class="tutor-info-heading warn">
          <span aria-hidden="true">⚠️</span>
          <span>تله سوال و علت اشتباه</span>
        </div>
        <div id="tutor-trap-box" class="tutor-info-box warn"></div>
      </div>

      <!-- Rule & Tips -->
      <div class="tutor-info-block">
        <div class="tutor-info-heading rule">
          <span aria-hidden="true">📜</span>
          <span>اصل قانون رسمی آیین‌نامه ایتالیا</span>
        </div>
        <div id="tutor-rule-box" class="tutor-info-box rule"></div>
      </div>

      <!-- Key Vocab -->
      <div id="tutor-vocab-section" class="tutor-info-block">
        <div class="tutor-info-heading vocab">
          <span aria-hidden="true">🔑</span>
          <span>کلمات و افعال کلیدی سوال</span>
        </div>
        <div id="tutor-vocab-list" class="tutor-vocab-list"></div>
      </div>

      <!-- Navigation buttons -->
      <div class="tutor-nav-row">
        <button id="tutor-prev-btn" onclick="App.prevTutorQuestion()" class="btn btn-ghost">← سوال قبلی</button>
        <button id="tutor-next-btn" onclick="App.nextTutorQuestion()" class="btn btn-primary">سوال بعدی →</button>
      </div>

    </div>

    <!-- Live Interactive Chat -->
    <div class="card tutor-chat-card">
      <div class="tutor-chat-header-row">
        <div class="tutor-chat-header-label">
          <span aria-hidden="true">💬</span>
          <span>گفتگوی تعاملی با استاد رفع اشکال</span>
        </div>
        <span class="tutor-chat-header-sub">پرسش سوالات تکمیلی</span>
      </div>

      <!-- Chat History -->
      <div id="tutor-chat-box" class="tutor-chat-box" role="log" aria-live="polite">
        <div class="tutor-chat-empty">
          هر سوال یا ابهامی در مورد این تست داری بنویس تا استاد برات توضیح بده.
        </div>
      </div>

      <!-- Chat Input Form -->
      <form onsubmit="App.sendTutorChatMessage(event)" class="tutor-chat-form">
        <label for="tutor-chat-input" class="visually-hidden">پیام به استاد رفع اشکال</label>
        <input id="tutor-chat-input" type="text" placeholder="سوال خود را بنویسید (مثلاً: چرا گزینه VERO غلط بود؟)" class="tutor-chat-input" />
        <button id="tutor-chat-send-btn" type="submit" class="btn btn-primary tutor-chat-send-btn">ارسال</button>
      </form>
    </div>

  </div>
</div>
`;
}
