/** Post-results wrong-answer walkthrough and tutor chat. */
export function renderTutorScreen(): string {
  return `
<div id="screen-tutor" class="screen screen-with-nav tutor-screen">
  <main class="page-container tutor-content-shell">
    <header class="page-header tutor-header">
      <button onclick="App.handleBackNavigation()" class="icon-button" aria-label="بازگشت به نتایج"><svg class="ui-icon"><use href="#i-chevron-right"/></svg></button>
      <div><span class="page-kicker">مرور اشتباهات</span><h1>مربی رفع اشکال</h1><span id="tutor-progress-badge" class="page-subtitle">در حال دریافت اطلاعات…</span></div>
    </header>

    <div id="tutor-loading" class="loading-state tutor-loading"><div class="spinner"></div><strong>در حال آماده‌سازی تحلیل آزمون…</strong><span>نکته‌ها و تله‌های سؤال‌ها استخراج می‌شوند.</span></div>

    <div id="tutor-content" class="tutor-content">
      <div id="tutor-stepper" class="tutor-stepper" aria-label="فهرست سؤال‌های اشتباه"></div>

      <article id="tutor-card" class="tutor-card">
        <div class="tutor-card-header-row"><span id="tutor-q-badge" class="badge tutor-q-badge">سؤال اشتباه</span><span id="tutor-q-answers-cmp" class="tutor-q-cmp"></span></div>
        <div id="tutor-q-image-container" class="tutor-q-image-wrap"><img id="tutor-q-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" class="tutor-q-image" alt="تصویر مرتبط با سؤال" /></div>
        <div class="tutor-source-block"><span class="content-label">متن ایتالیایی</span><div id="tutor-q-text-it" dir="ltr" class="tutor-q-text-it"></div></div>
        <div class="tutor-translation-block"><span class="content-label">ترجمه فارسی</span><div id="tutor-q-text-fa" class="tutor-q-text-fa"></div></div>

        <section class="tutor-info-block"><div class="tutor-info-heading warn"><svg class="ui-icon"><use href="#i-alert"/></svg><h2>تله سؤال و علت اشتباه</h2></div><div id="tutor-trap-box" class="tutor-info-box warn"></div></section>
        <section class="tutor-info-block"><div class="tutor-info-heading rule"><svg class="ui-icon"><use href="#i-graduation"/></svg><h2>قاعده‌ای که باید به خاطر بسپاری</h2></div><div id="tutor-rule-box" class="tutor-info-box rule"></div></section>
        <section id="tutor-vocab-section" class="tutor-info-block"><div class="tutor-info-heading vocab"><svg class="ui-icon"><use href="#i-book"/></svg><h2>واژه‌ها و افعال کلیدی</h2></div><div id="tutor-vocab-list" class="tutor-vocab-list"></div></section>

        <div class="tutor-nav-row"><button id="tutor-prev-btn" onclick="App.prevTutorQuestion()" class="btn btn-secondary"><svg class="ui-icon"><use href="#i-chevron-right"/></svg> سؤال قبلی</button><button id="tutor-next-btn" onclick="App.nextTutorQuestion()" class="btn btn-primary"><span id="tutor-next-label">سؤال بعدی</span><svg class="ui-icon"><use href="#i-chevron-left"/></svg></button></div>
      </article>

      <section class="tutor-chat-card" aria-labelledby="tutor-chat-title">
        <div class="section-heading-row"><div><span class="section-kicker">پرسش تکمیلی</span><h2 id="tutor-chat-title">گفتگو با مربی</h2></div><svg class="ui-icon"><use href="#i-message"/></svg></div>
        <div id="tutor-chat-box" class="tutor-chat-box" role="log" aria-live="polite"><div class="tutor-chat-empty">ابهامت را درباره همین سؤال بنویس.</div></div>
        <form onsubmit="App.sendTutorChatMessage(event)" class="tutor-chat-form"><label for="tutor-chat-input" class="field-label">سؤال از مربی</label><div class="tutor-chat-composer"><input id="tutor-chat-input" type="text" placeholder="مثلاً: چرا پاسخ VERO بود؟" class="form-control" /><button id="tutor-chat-send-btn" type="submit" class="btn btn-primary" aria-label="ارسال سؤال"><svg class="ui-icon"><use href="#i-send"/></svg></button></div></form>
      </section>
    </div>
  </main>
</div>`;
}
