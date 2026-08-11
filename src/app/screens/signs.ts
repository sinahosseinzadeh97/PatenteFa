/**
 * src/app/screens/signs.ts
 * Road-sign flashcard screen (spaced repetition over signage questions).
 *
 * Note on color: the "guide" legend below deliberately keeps a handful of
 * literal hex colors (blue/brown) as inline style="color:..." on individual
 * <li> items — those describe the actual real-world colors of Italian road
 * signs (blue = mandatory/motorway info, brown = tourist sites), which is
 * content, not UI chrome drift. Recoloring them to the app's palette would
 * make the legend factually wrong. Everything else here is classes.
 */
export function renderSignsScreen(): string {
  return `
<div id="screen-signs" class="screen" style="padding:0 0 80px;">
  <div class="signs-content">
    <div class="signs-header-row">
      <h1 class="signs-title">🚦 تابلوها</h1>
      <div id="signs-counter" class="signs-counter"></div>
    </div>
    <!-- §14.4 / §20.2: study-mode framing. This deck teaches meanings; the
         true/false drilling happens in the exam. -->
    <div class="signs-study-hint">📖 تابلو رو ببین، حدس بزن، بگردون و معنیش رو یاد بگیر</div>

    <!-- Road signs introductory guide (collapsible) -->
    <details id="signs-guide-details" class="signs-guide-card" open>
      <summary class="signs-guide-summary">
        <span>🚸 شناخت تابلوهای رانندگی ایتالیا</span>
        <span class="signs-guide-summary-en">Italian Road Signs Guide</span>
      </summary>
      <div class="signs-guide-body">

        <!-- Shape -->
        <div class="signs-guide-section-heading amber">🔷 شکل تابلو <span class="signs-guide-section-heading-en" dir="ltr">(Shape)</span></div>
        <ul class="signs-guide-list">
          <li>🔺 <b>مثلث</b>: هشدار و خطر <span class="signs-guide-en" dir="ltr">(Warning & Danger)</span></li>
          <li>🔴 <b>دایره</b>: ممنوعیت، محدودیت یا اجبار <span class="signs-guide-en" dir="ltr">(Prohibition, Restriction, or Obligation)</span></li>
          <li>🟦 <b>مربع و مستطیل</b>: اطلاعات و راهنمای مسیر <span class="signs-guide-en" dir="ltr">(Information & Direction)</span></li>
          <li>🛑 <b>هشت‌ضلعی</b>: توقف کامل <span class="signs-guide-en" dir="ltr">(Stop)</span></li>
          <li>🔻 <b>مثلث وارونه</b>: رعایت حق‌تقدم <span class="signs-guide-en" dir="ltr">(Yield / Give Way)</span></li>
          <li>♦️ <b>لوزی</b>: وضعیت حق‌تقدم جاده <span class="signs-guide-en" dir="ltr">(Priority Road)</span></li>
        </ul>

        <!-- Color — literal hex here on purpose, see file header note -->
        <div class="signs-guide-section-heading amber">🎨 رنگ تابلو <span class="signs-guide-section-heading-en" dir="ltr">(Color)</span></div>
        <ul class="signs-guide-list">
          <li style="color:var(--stop);">● <b>حاشیه قرمز</b>: <span style="color:var(--ink);">خطر، ممنوعیت یا محدودیت</span> <span class="signs-guide-en" dir="ltr">(Danger, Prohibition, Restriction)</span></li>
          <li style="color:#3b82f6;">● <b style="color:var(--ink);">زمینه آبی دایره‌ای</b>: <span style="color:var(--ink);">دستور اجباری</span> <span class="signs-guide-en" dir="ltr">(Mandatory Instruction)</span></li>
          <li style="color:#3b82f6;">● <b style="color:var(--ink);">زمینه آبی مربع/مستطیل</b>: <span style="color:var(--ink);">اطلاعات</span> <span class="signs-guide-en" dir="ltr">(Information)</span></li>
          <li style="color:var(--go);">● <b style="color:var(--ink);">سبز</b>: <span style="color:var(--ink);">اتوبان</span> <span class="signs-guide-en" dir="ltr">(Motorway / Highway)</span></li>
          <li style="color:#60a5fa;">● <b style="color:var(--ink);">آبی</b>: <span style="color:var(--ink);">جاده‌های خارج شهری</span> <span class="signs-guide-en" dir="ltr">(Out-of-town Roads)</span></li>
          <li style="color:var(--ink);">● <b>سفید</b>: مسیرهای داخل شهر <span class="signs-guide-en" dir="ltr">(Urban / City Roads)</span></li>
          <li style="color:#92400e;">● <b style="color:var(--ink);">قهوه‌ای</b>: <span style="color:var(--ink);">مکان‌های گردشگری و تاریخی</span> <span class="signs-guide-en" dir="ltr">(Tourist & Historical Sites)</span></li>
          <li style="color:var(--amber);">● <b style="color:var(--ink);">زرد</b>: <span style="color:var(--ink);">تابلوهای موقت و عملیات جاده‌ای</span> <span class="signs-guide-en" dir="ltr">(Temporary & Roadworks)</span></li>
        </ul>

        <!-- Golden Rules -->
        <div class="signs-guide-section-heading amber">⭐ قاعده‌ی مهم <span class="signs-guide-section-heading-en" dir="ltr">(Golden Rules)</span></div>
        <ul class="signs-guide-list tight">
          <li>🔺 <b style="color:var(--stop);">مثلث قرمز</b>: مواظب باش <span class="signs-guide-en" dir="ltr">(Watch out)</span></li>
          <li>🔴 <b style="color:var(--stop);">دایره قرمز</b>: انجام نده یا از حد مشخص عبور نکن <span class="signs-guide-en" dir="ltr">(Do not do or exceed limit)</span></li>
          <li>🔵 <b style="color:#3b82f6;">دایره آبی</b>: باید انجام بدهی <span class="signs-guide-en" dir="ltr">(You must do)</span></li>
          <li>🟦 <b>مربع یا مستطیل</b>: اطلاعات دریافت کن <span class="signs-guide-en" dir="ltr">(Receive information)</span></li>
          <li>🚫 <b style="color:var(--stop);">خط قرمز مورب روی تابلو</b>: معمولاً پایان آن دستور، محدودیت یا مسیر <span class="signs-guide-en" style="font-size:0.72rem;" dir="ltr">(Usually ends a command, restriction, or route)</span></li>
          <li>📋 <b>پنل زیر تابلو</b>: می‌تواند فاصله، طول مسیر، زمان اعتبار، جهت اثر تابلو، شروع، ادامه یا پایان محدودیت را مشخص کند <span class="signs-guide-en" style="font-size:0.72rem;" dir="ltr">(Panels underneath specify distance, length, validity, direction, or start/end of restriction)</span></li>
        </ul>

        <!-- Reading Order -->
        <div class="signs-guide-section-heading go">📖 روش خواندن تابلو <span class="signs-guide-section-heading-en" dir="ltr">(Reading Order)</span></div>
        <div class="signs-guide-reading-order">
          هنگام خواندن تابلو اول <b style="color:var(--amber);">شکل</b>، سپس <b style="color:var(--amber);">رنگ</b>، بعد <b style="color:var(--amber);">علامت داخل تابلو</b> و در پایان <b style="color:var(--amber);">پنل زیر آن</b> را بررسی کن.
        </div>

      </div>
    </details>

    <div class="srs-track"><div class="srs-fill" id="signs-srs-bar" style="width:0%;"></div></div>

    <!-- Flip card: front = sign image, back = verdict + statement + translation -->
    <div id="signs-flip-card" class="flip-card sign-flip-card" onclick="App.flipSign()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();App.flipSign();}" style="margin-bottom:14px;" role="button" tabindex="0" aria-label="کارت را بگردان تا جمله، درست یا نادرست بودنش و ترجمه را ببینی">
      <div class="flip-card-inner">
        <div class="flip-front">
          <img id="signs-img" style="max-width:150px;max-height:150px;object-fit:contain;" alt="تابلوی راهنمایی و رانندگی" />
          <div class="signs-flip-hint">برگردان</div>
        </div>
        <div class="flip-back">
          <!-- The sign's official name and what it tells a driver. Served from the
               reviewed sign_meanings table — no per-card AI call, nothing lazy. -->
          <div id="signs-name-it" class="signs-name-it"></div>
          <div id="signs-name-fa" class="signs-name-fa"></div>
          <div id="signs-meaning-fa" class="signs-meaning-fa"></div>
        </div>
      </div>
    </div>

    <div class="signs-answer-row">
      <button class="btn btn-signs-unknown btn-full btn-sm" onclick="App.signsReview(false)">🤔 نمی‌دونم</button>
      <button class="btn btn-signs-known btn-full btn-sm"  onclick="App.signsReview(true)">💡 می‌دونم</button>
    </div>

    <div id="signs-empty" class="signs-empty-state">
      <div class="signs-empty-icon" aria-hidden="true">✅</div>
      <div class="signs-empty-title">امروز همه تابلوها رو مرور کردی!</div>
      <div class="signs-empty-sub">فردا دوباره بیا</div>
    </div>
  </div>
</div>
`;
}
