/**
 * src/app/screens/signs.ts
 * Road-sign flashcard screen (spaced repetition over signage questions).
 */
export function renderSignsScreen(): string {
  return `
<div id="screen-signs" class="screen" style="padding:0 0 80px;">
  <div style="padding:20px 16px 0;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
      <h1 style="margin:0;font-family:'Barlow Condensed',sans-serif;font-size:1.8rem;font-weight:700;">🚦 تابلوها</h1>
      <div id="signs-counter" style="font-size:0.78rem;color:var(--ink-muted);"></div>
    </div>
    <!-- §14.4: study-mode framing text -->
    <div style="font-size:0.78rem;color:var(--ink-muted);margin-bottom:14px;line-height:1.5;">📖 تابلو رو ببین، بگردون، خودتو بسنج</div>

    <!-- Road signs introductory guide (collapsible) -->
    <details id="signs-guide-details" class="signs-guide-card" open>
      <summary style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;padding:12px 14px;font-family:'Vazirmatn',sans-serif;font-size:0.88rem;font-weight:700;color:var(--ink);user-select:none;">
        <span>🚸 شناخت تابلوهای رانندگی ایتالیا</span>
        <span style="font-size:0.68rem;color:var(--ink-muted);font-weight:500;">Italian Road Signs Guide</span>
      </summary>
      <div style="padding:0 14px 14px;font-family:'Vazirmatn',sans-serif;font-size:0.78rem;line-height:1.8;color:var(--ink);">

        <!-- Shape -->
        <div style="font-weight:700;color:var(--amber);margin-bottom:6px;font-size:0.82rem;">🔷 شکل تابلو <span style="font-weight:500;color:var(--ink-muted);font-size:0.72rem;" dir="ltr">(Shape)</span></div>
        <ul style="list-style:none;padding:0;margin:0 0 14px;display:flex;flex-direction:column;gap:4px;">
          <li>🔺 <b>مثلث</b>: هشدار و خطر <span style="color:var(--ink-muted);" dir="ltr">(Warning & Danger)</span></li>
          <li>🔴 <b>دایره</b>: ممنوعیت، محدودیت یا اجبار <span style="color:var(--ink-muted);" dir="ltr">(Prohibition, Restriction, or Obligation)</span></li>
          <li>🟦 <b>مربع و مستطیل</b>: اطلاعات و راهنمای مسیر <span style="color:var(--ink-muted);" dir="ltr">(Information & Direction)</span></li>
          <li>🛑 <b>هشت‌ضلعی</b>: توقف کامل <span style="color:var(--ink-muted);" dir="ltr">(Stop)</span></li>
          <li>🔻 <b>مثلث وارونه</b>: رعایت حق‌تقدم <span style="color:var(--ink-muted);" dir="ltr">(Yield / Give Way)</span></li>
          <li>♦️ <b>لوزی</b>: وضعیت حق‌تقدم جاده <span style="color:var(--ink-muted);" dir="ltr">(Priority Road)</span></li>
        </ul>

        <!-- Color -->
        <div style="font-weight:700;color:var(--amber);margin-bottom:6px;font-size:0.82rem;">🎨 رنگ تابلو <span style="font-weight:500;color:var(--ink-muted);font-size:0.72rem;" dir="ltr">(Color)</span></div>
        <ul style="list-style:none;padding:0;margin:0 0 14px;display:flex;flex-direction:column;gap:4px;">
          <li style="color:var(--stop);">● <b>حاشیه قرمز</b>: <span style="color:var(--ink);">خطر، ممنوعیت یا محدودیت</span> <span style="color:var(--ink-muted);" dir="ltr">(Danger, Prohibition, Restriction)</span></li>
          <li style="color:#3b82f6;">● <b style="color:var(--ink);">زمینه آبی دایره‌ای</b>: <span style="color:var(--ink);">دستور اجباری</span> <span style="color:var(--ink-muted);" dir="ltr">(Mandatory Instruction)</span></li>
          <li style="color:#3b82f6;">● <b style="color:var(--ink);">زمینه آبی مربع/مستطیل</b>: <span style="color:var(--ink);">اطلاعات</span> <span style="color:var(--ink-muted);" dir="ltr">(Information)</span></li>
          <li style="color:var(--go);">● <b style="color:var(--ink);">سبز</b>: <span style="color:var(--ink);">اتوبان</span> <span style="color:var(--ink-muted);" dir="ltr">(Motorway / Highway)</span></li>
          <li style="color:#60a5fa;">● <b style="color:var(--ink);">آبی</b>: <span style="color:var(--ink);">جاده‌های خارج شهری</span> <span style="color:var(--ink-muted);" dir="ltr">(Out-of-town Roads)</span></li>
          <li style="color:var(--ink);">● <b>سفید</b>: مسیرهای داخل شهر <span style="color:var(--ink-muted);" dir="ltr">(Urban / City Roads)</span></li>
          <li style="color:#92400e;">● <b style="color:var(--ink);">قهوه‌ای</b>: <span style="color:var(--ink);">مکان‌های گردشگری و تاریخی</span> <span style="color:var(--ink-muted);" dir="ltr">(Tourist & Historical Sites)</span></li>
          <li style="color:var(--amber);">● <b style="color:var(--ink);">زرد</b>: <span style="color:var(--ink);">تابلوهای موقت و عملیات جاده‌ای</span> <span style="color:var(--ink-muted);" dir="ltr">(Temporary & Roadworks)</span></li>
        </ul>

        <!-- Golden Rules -->
        <div style="font-weight:700;color:var(--amber);margin-bottom:6px;font-size:0.82rem;">⭐ قاعده‌ی مهم <span style="font-weight:500;color:var(--ink-muted);font-size:0.72rem;" dir="ltr">(Golden Rules)</span></div>
        <ul style="list-style:none;padding:0;margin:0 0 14px;display:flex;flex-direction:column;gap:5px;">
          <li>🔺 <b style="color:var(--stop);">مثلث قرمز</b>: مواظب باش <span style="color:var(--ink-muted);" dir="ltr">(Watch out)</span></li>
          <li>🔴 <b style="color:var(--stop);">دایره قرمز</b>: انجام نده یا از حد مشخص عبور نکن <span style="color:var(--ink-muted);" dir="ltr">(Do not do or exceed limit)</span></li>
          <li>🔵 <b style="color:#3b82f6;">دایره آبی</b>: باید انجام بدهی <span style="color:var(--ink-muted);" dir="ltr">(You must do)</span></li>
          <li>🟦 <b>مربع یا مستطیل</b>: اطلاعات دریافت کن <span style="color:var(--ink-muted);" dir="ltr">(Receive information)</span></li>
          <li>🚫 <b style="color:var(--stop);">خط قرمز مورب روی تابلو</b>: معمولاً پایان آن دستور، محدودیت یا مسیر <span style="color:var(--ink-muted);font-size:0.72rem;" dir="ltr">(Usually ends a command, restriction, or route)</span></li>
          <li>📋 <b>پنل زیر تابلو</b>: می‌تواند فاصله، طول مسیر، زمان اعتبار، جهت اثر تابلو، شروع، ادامه یا پایان محدودیت را مشخص کند <span style="color:var(--ink-muted);font-size:0.72rem;" dir="ltr">(Panels underneath specify distance, length, validity, direction, or start/end of restriction)</span></li>
        </ul>

        <!-- Reading Order -->
        <div style="font-weight:700;color:var(--go);margin-bottom:6px;font-size:0.82rem;">📖 روش خواندن تابلو <span style="font-weight:500;color:var(--ink-muted);font-size:0.72rem;" dir="ltr">(Reading Order)</span></div>
        <div style="background:rgba(27,122,61,0.1);border:1px solid rgba(27,122,61,0.25);border-radius:10px;padding:10px 12px;font-size:0.78rem;line-height:1.7;">
          هنگام خواندن تابلو اول <b style="color:var(--amber);">شکل</b>، سپس <b style="color:var(--amber);">رنگ</b>، بعد <b style="color:var(--amber);">علامت داخل تابلو</b> و در پایان <b style="color:var(--amber);">پنل زیر آن</b> را بررسی کن.
        </div>

      </div>
    </details>

    <div class="srs-track"><div class="srs-fill" id="signs-srs-bar" style="width:0%;"></div></div>

    <!-- Flip card: front = sign image, back = name + translation -->
    <div id="signs-flip-card" class="flip-card sign-flip-card" onclick="App.flipSign()" style="margin-bottom:14px;">
      <div class="flip-card-inner">
        <div class="flip-front">
          <img id="signs-img" style="max-width:150px;max-height:150px;object-fit:contain;" alt="road sign" />
          <div style="font-size:0.72rem;color:var(--ink-muted);margin-top:8px;">برگردان</div>
        </div>
        <div class="flip-back">
          <!-- Italian name — primary, always shown -->
          <div id="signs-name-it" style="font-family:'Public Sans',sans-serif;font-size:1.05rem;font-weight:700;direction:ltr;text-align:center;color:var(--ink);margin-bottom:8px;"></div>
          <!-- Farsi translation — loaded lazily on first flip -->
          <div id="signs-name-fa" style="font-family:'Vazirmatn',sans-serif;font-size:0.95rem;font-weight:500;direction:rtl;text-align:center;color:var(--ink-muted);min-height:1.4em;"></div>
        </div>
      </div>
    </div>

    <div style="display:flex;gap:10px;">
      <button class="btn btn-signs-unknown btn-full btn-sm" onclick="App.signsReview(false)">🤔 نمی‌دونم</button>
      <button class="btn btn-signs-known btn-full btn-sm"  onclick="App.signsReview(true)">💡 می‌دونم</button>
    </div>

    <div id="signs-empty" style="display:none;text-align:center;padding:40px 0;color:var(--ink-muted);">
      <div style="font-size:2rem;margin-bottom:8px;">✅</div>
      <div style="font-size:0.95rem;">امروز همه تابلوها رو مرور کردی!</div>
      <div style="font-size:0.78rem;margin-top:4px;">فردا دوباره بیا</div>
    </div>
  </div>
</div>
`;
}
