/**
 * src/app/screens/admin.ts
 * Admin dashboard screen (operator tool — KPIs, cost breakdown, user list,
 * live event stream) plus the per-user activity timeline modal it opens.
 * This is an internal operator tool, not a public screen (design.md §18.7)
 * — allowed to be denser/more utilitarian than the exam UI, but still on
 * the same asphalt/ink/go/stop/amber palette.
 */
export function renderAdminScreen(): string {
  return `
<div id="screen-admin" class="screen screen-with-nav">
  <div class="page-container admin-content">

    <!-- ── Section 1: Header + KPI bar ────────────────────────────────────── -->
    <div class="admin-header-row">
      <div class="admin-header-left">
        <button type="button" onclick="App.handleBackNavigation()" class="icon-button" aria-label="بازگشت به خانه"><svg class="ui-icon"><use href="#i-chevron-right"/></svg></button>
        <svg class="ui-icon admin-header-icon"><use href="#i-settings"/></svg>
        <div>
          <h1 class="admin-title">پنل مدیریت</h1>
          <div class="admin-title-meta"><span class="admin-private-badge"><svg class="ui-icon"><use href="#i-lock"/></svg> فقط مدیر اصلی</span><span class="admin-kpi-sub" id="admin-kpi-sub">در حال بارگذاری…</span></div>
        </div>
      </div>
      <button type="button" class="btn btn-secondary btn-sm admin-refresh-btn" onclick="App.loadAdminData()"><svg class="ui-icon"><use href="#i-review"/></svg> به‌روزرسانی</button>
    </div>

    <!-- Tabs: one job per view, so user management is the first thing on screen -->
    <div class="admin-tabs" role="tablist" aria-label="بخش‌های پنل مدیریت">
      <button type="button" role="tab" id="admin-tab-users" class="admin-tab active" aria-selected="true" aria-controls="admin-panel-users" onclick="App.switchAdminTab('users')">کاربران <span id="admin-tab-pending" class="admin-tab-badge" hidden></span></button>
      <button type="button" role="tab" id="admin-tab-messages" class="admin-tab" aria-selected="false" aria-controls="admin-panel-messages" onclick="App.switchAdminTab('messages')">پیام‌ها <span id="admin-support-unread" class="admin-tab-badge" hidden></span></button>
      <button type="button" role="tab" id="admin-tab-reports" class="admin-tab" aria-selected="false" aria-controls="admin-panel-reports" onclick="App.switchAdminTab('reports')">گزارش‌ها</button>
      <button type="button" role="tab" id="admin-tab-stats" class="admin-tab" aria-selected="false" aria-controls="admin-panel-stats" onclick="App.switchAdminTab('stats')">آمار</button>
    </div>

    <!-- ── Users ───────────────────────────────────────────────────────────── -->
    <div id="admin-panel-users" class="admin-tab-panel" role="tabpanel" aria-labelledby="admin-tab-users">
      <div class="admin-filter-row">
        <label for="admin-search-input" class="visually-hidden">جستجوی کاربر</label>
        <input type="search" id="admin-search-input" placeholder="جستجوی کاربر با نام یا آیدی"
          class="admin-search-input" oninput="App.debouncedAdminSearch()" />
        <label for="admin-status-filter" class="visually-hidden">فیلتر وضعیت کاربر</label>
        <select id="admin-status-filter" onchange="App.loadAdminUsers()" class="admin-status-select">
          <option value="all">همه کاربران</option>
          <option value="approved">دسترسی فعال</option>
          <option value="expired">منقضی‌شده</option>
          <option value="pending">در انتظار</option>
          <option value="blocked">مسدود</option>
        </select>
      </div>
      <div class="admin-list-header-row">
        <h2 class="admin-list-heading">فهرست کاربران</h2>
        <span id="admin-user-count" class="admin-user-count"></span>
      </div>
      <div id="admin-users-table" class="admin-users-table"></div>
    </div>

    <!-- ── Messages: broadcast + one-to-one inbox ──────────────────────────── -->
    <div id="admin-panel-messages" class="admin-tab-panel" role="tabpanel" aria-labelledby="admin-tab-messages" hidden>
      <div class="admin-section-card">
        <div class="admin-section-header-row"><h2 class="admin-section-heading">پیام همگانی</h2></div>
        <form class="admin-broadcast-form" onsubmit="App.sendAdminBroadcast(event)">
          <label for="admin-broadcast-input" class="visually-hidden">متن پیام همگانی</label>
          <textarea id="admin-broadcast-input" class="support-input" rows="3" maxlength="2000" placeholder="متن اطلاعیه برای همه کاربران…"></textarea>
          <div class="admin-broadcast-options">
            <label for="admin-broadcast-audience" class="visually-hidden">گیرندگان</label>
            <select id="admin-broadcast-audience" class="admin-status-select">
              <option value="active">کاربران با دسترسی فعال</option>
              <option value="all">همه کاربران (به‌جز مسدود)</option>
            </select>
            <label class="admin-broadcast-pin"><input type="checkbox" id="admin-broadcast-pin" checked /> سنجاق بالای چت ربات</label>
          </div>
          <button type="submit" id="admin-broadcast-send-btn" class="btn btn-primary">ارسال همگانی</button>
        </form>
        <p class="admin-broadcast-hint">پیام با عنوان «📢 اطلاعیه» و دکمه باز کردن اپ می‌رسد. برای پیام به یک نفر، روی گفتگوی او در پایین یا دکمه «پیام» در تب کاربران بزنید.</p>
      </div>

      <div class="admin-section-card">
        <div class="admin-section-header-row"><h2 class="admin-section-heading">گفتگوهای پشتیبانی</h2></div>
        <div id="admin-support-threads" class="admin-support-threads">
          <div class="admin-loading-note">در حال بارگذاری…</div>
        </div>
      </div>
    </div>

    <!-- ── Content reports ─────────────────────────────────────────────────── -->
    <div id="admin-panel-reports" class="admin-tab-panel" role="tabpanel" aria-labelledby="admin-tab-reports" hidden>
      <section class="admin-content-reports" aria-labelledby="content-reports-heading">
        <h2 id="content-reports-heading">گزارش اشکال محتوا</h2>
        <p id="content-audit-summary"></p>
        <div id="admin-content-reports"></div>
        <button type="button" class="btn btn-secondary btn-sm" onclick="App.loadContentReports()">به‌روزرسانی گزارش‌ها</button>
      </section>
    </div>

    <!-- ── Stats: KPIs, API cost, live events ──────────────────────────────── -->
    <div id="admin-panel-stats" class="admin-tab-panel" role="tabpanel" aria-labelledby="admin-tab-stats" hidden>
      <!-- KPI row: 6-cell grid, 3 per row on small screens -->
      <div class="admin-kpi-grid">
        <div class="admin-kpi-tile">
          <div class="admin-kpi-label">کاربران</div>
          <div id="admin-total-users" class="admin-kpi-value amber">—</div>
          <div id="admin-pending-users" class="admin-kpi-sub-value amber"></div>
        </div>
        <div class="admin-kpi-tile">
          <div class="admin-kpi-label">فعال امروز</div>
          <div id="admin-active-today" class="admin-kpi-value go">—</div>
          <div id="admin-active-now" class="admin-kpi-sub-value"></div>
        </div>
        <div class="admin-kpi-tile">
          <div class="admin-kpi-label">آزمون‌ها</div>
          <div id="admin-total-exams" class="admin-kpi-value ink">—</div>
          <div id="admin-pass-rate" class="admin-kpi-sub-value">قبولی: —</div>
        </div>
        <div class="admin-kpi-tile">
          <div class="admin-kpi-label">حضور (دقیقه)</div>
          <div id="admin-total-mins" class="admin-kpi-value ink">—</div>
          <div class="admin-kpi-sub-value">مجموع همه کاربران</div>
        </div>
        <div class="admin-kpi-tile">
          <div class="admin-kpi-label">هزینه API</div>
          <div id="admin-total-cost" class="admin-kpi-value stop">—</div>
          <div id="admin-total-api-calls" class="admin-kpi-sub-value">— فراخوانی</div>
        </div>
        <div id="admin-pending-alert" class="admin-pending-alert">
          <div class="admin-pending-alert-label">در انتظار تأیید</div>
          <div id="admin-pending-count" class="admin-pending-alert-value">—</div>
          <div class="admin-pending-alert-sub">کاربر جدید</div>
        </div>
      </div>

      <!-- Cost breakdown by action (§18.4) -->
      <div class="admin-section-card">
        <div class="admin-section-header-row">
          <h2 class="admin-section-heading">هزینه API به تفکیک نوع عملیات</h2>
          <div class="admin-cost-tabs">
            <button type="button" id="cost-tab-today" class="admin-cost-tab-btn active" onclick="App.switchCostTab('today')">امروز</button>
            <button type="button" id="cost-tab-week" class="admin-cost-tab-btn" onclick="App.switchCostTab('week')">۷ روز</button>
            <button type="button" id="cost-tab-total" class="admin-cost-tab-btn" onclick="App.switchCostTab('total')">کل</button>
          </div>
        </div>
        <div id="admin-cost-breakdown" style="display:flex; flex-direction:column; gap:6px;">
          <div class="admin-loading-note">در حال بارگذاری…</div>
        </div>
      </div>

      <!-- Live event stream -->
      <div class="admin-events-title-row"><div><h2 class="admin-events-heading">رویدادهای اخیر</h2><p>مسیر صفحه و کنترل کلیک‌شده ثبت می‌شود؛ متن فرم‌ها و پیام‌ها هرگز ذخیره نمی‌شود.</p></div><span id="admin-events-logged" class="admin-event-total"></span></div>
      <div id="admin-events-stream" class="admin-events-stream"></div>
    </div>
  </div>
</div>
`;
}

/**
 * Support thread panel. Opens from the inbox or from any row in the user list,
 * so a conversation can be started with a user who has never written first.
 * Nothing here shows or sends an admin identity — replies leave as the bot.
 */
export function renderAdminSupportModal(): string {
  return `
<div id="admin-support-modal" class="admin-support-modal" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="admin-support-modal-title">
  <div class="admin-user-modal-overlay" onclick="App.closeAdminThread()"></div>
  <div class="admin-user-modal-panel">
    <div class="admin-user-modal-header-row">
      <div>
        <h3 id="admin-support-modal-title" class="admin-user-modal-title">گفتگو با کاربر</h3>
        <div id="admin-support-modal-sub" class="admin-support-modal-sub">پاسخ به‌صورت ناشناس از طرف ربات ارسال می‌شود</div>
      </div>
      <button type="button" id="admin-support-close" class="icon-button" onclick="App.closeAdminThread()" aria-label="بستن"><svg class="ui-icon"><use href="#i-close"/></svg></button>
    </div>

    <div id="admin-support-thread" class="support-thread admin-support-thread" role="log" aria-live="polite"></div>

    <form onsubmit="App.sendAdminReply(event)" class="support-form">
      <label for="admin-support-input" class="visually-hidden">پاسخ به کاربر</label>
      <textarea id="admin-support-input" class="support-input" rows="2" maxlength="2000"
        placeholder="پاسخ خود را بنویسید…"></textarea>
      <button type="submit" id="admin-support-send-btn" class="btn btn-primary support-send-btn">ارسال</button>
    </form>
  </div>
</div>
`;
}

export function renderAdminUserModal(): string {
  return `
<div id="admin-user-modal" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="admin-user-modal-title" style="position:fixed; inset:0; z-index:360; display:none; flex-direction:column; justify-content:flex-end;">
  <div class="admin-user-modal-overlay" onclick="App.closeAdminUserModal()"></div>
  <div class="admin-user-modal-panel">
    <div class="admin-user-modal-header-row">
      <h3 id="admin-user-modal-title" class="admin-user-modal-title">جزئیات فعالیت کاربر</h3>
      <button type="button" id="admin-user-close" class="icon-button" onclick="App.closeAdminUserModal()" aria-label="بستن"><svg class="ui-icon"><use href="#i-close"/></svg></button>
    </div>
    <div id="admin-user-modal-content"></div>
  </div>
</div>
`;
}
