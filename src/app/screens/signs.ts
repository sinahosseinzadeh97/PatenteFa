/** Road-sign flashcards with optional compact reference guide. */
export function renderSignsScreen(): string {
  return `
<div id="screen-signs" class="screen screen-with-nav">
  <main class="page-container signs-content">
    <header class="page-header page-header-simple">
      <div><span class="page-kicker">فلش‌کارت تصویری</span><h1>تابلوهای رانندگی</h1><p>تابلو را ببین، معنایش را حدس بزن و کارت را برگردان.</p></div>
      <div id="signs-counter" class="signs-counter" aria-live="polite"></div>
    </header>

    <details id="signs-guide-details" class="reference-disclosure">
      <summary><span><svg class="ui-icon"><use href="#i-help"/></svg><strong>راهنمای سریع خواندن تابلو</strong></span><svg class="ui-icon disclosure-chevron"><use href="#i-chevron-down"/></svg></summary>
      <div class="signs-guide-body">
        <section><h2>اول شکل را بخوان</h2><ul class="signs-guide-list"><li><b>مثلث:</b> هشدار و خطر</li><li><b>دایره:</b> ممنوعیت، محدودیت یا اجبار</li><li><b>مربع و مستطیل:</b> اطلاعات و راهنمای مسیر</li><li><b>هشت‌ضلعی:</b> توقف کامل</li><li><b>مثلث وارونه:</b> رعایت حق‌تقدم</li></ul></section>
        <section><h2>بعد رنگ را بررسی کن</h2><ul class="signs-guide-list color-list"><li><span class="sign-color red"></span><b>قرمز:</b> خطر، ممنوعیت یا محدودیت</li><li><span class="sign-color blue"></span><b>آبی:</b> دستور اجباری یا اطلاعات</li><li><span class="sign-color green"></span><b>سبز:</b> اتوبان</li><li><span class="sign-color brown"></span><b>قهوه‌ای:</b> مکان گردشگری یا تاریخی</li><li><span class="sign-color amber"></span><b>زرد:</b> وضعیت موقت یا عملیات جاده‌ای</li></ul></section>
        <p class="signs-reading-order">ترتیب پیشنهادی: <b>شکل</b>، <b>رنگ</b>، <b>علامت داخل تابلو</b> و در پایان <b>پنل زیر آن</b>.</p>
      </div>
    </details>

    <div class="srs-track" role="progressbar" aria-label="پیشرفت مرور تابلوها"><div class="srs-fill" id="signs-srs-bar" style="width:0%;"></div></div>

    <div id="signs-flip-card" class="flip-card sign-flip-card" onclick="App.flipSign()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();App.flipSign();}" role="button" tabindex="0" aria-label="کارت را برگردان تا نام و معنی تابلو را ببینی">
      <div class="flip-card-inner">
        <div class="flip-front">
          <img id="signs-img" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" alt="تابلوی راهنمایی و رانندگی" />
          <div class="flip-hint">برای دیدن معنی لمس کن</div>
        </div>
        <div class="flip-back"><div id="signs-name-it" class="signs-name-it" dir="ltr"></div><div id="signs-name-fa" class="signs-name-fa"></div><div id="signs-meaning-fa" class="signs-meaning-fa"></div></div>
      </div>
    </div>

    <div class="signs-answer-row">
      <button class="btn btn-signs-unknown btn-full" onclick="App.signsReview(false)"><svg class="ui-icon"><use href="#i-review"/></svg> دوباره می‌بینم</button>
      <button class="btn btn-signs-known btn-full" onclick="App.signsReview(true)"><svg class="ui-icon"><use href="#i-check"/></svg> معنایش را می‌دانم</button>
    </div>

    <div id="signs-empty" class="empty-state signs-empty-state">
      <svg class="ui-icon"><use href="#i-check"/></svg><strong>مرور امروز کامل شد</strong><span>تابلوهای بعدی در زمان مناسب دوباره نمایش داده می‌شوند.</span>
    </div>
  </main>
</div>`;
}
