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
<div id="screen-admin" class="screen" style="padding:0 0 80px;">
  <div class="admin-content">

    <!-- ── Section 1: Header + KPI bar ────────────────────────────────────── -->
    <div class="admin-header-row">
      <div class="admin-header-left">
        <span class="admin-header-icon" aria-hidden="true">🎛️</span>
        <div>
          <h1 class="admin-title">پنل مدیریت PatenteFa</h1>
          <div class="admin-kpi-sub" id="admin-kpi-sub">در حال بارگذاری…</div>
        </div>
      </div>
      <button type="button" class="btn btn-ghost btn-sm admin-refresh-btn" onclick="App.loadAdminData()">🔄 به‌روزرسانی</button>
    </div>

    <!-- KPI row: 6-cell grid, 3 per row on small screens -->
    <div class="admin-kpi-grid">
      <div class="admin-kpi-tile">
        <div class="admin-kpi-label">👥 کاربران</div>
        <div id="admin-total-users" class="admin-kpi-value amber">—</div>
        <div id="admin-pending-users" class="admin-kpi-sub-value amber"></div>
      </div>
      <div class="admin-kpi-tile">
        <div class="admin-kpi-label">✅ فعال امروز</div>
        <div id="admin-active-today" class="admin-kpi-value go">—</div>
        <div id="admin-events-logged" class="admin-kpi-sub-value"></div>
      </div>
      <div class="admin-kpi-tile">
        <div class="admin-kpi-label">📝 آزمون‌ها</div>
        <div id="admin-total-exams" class="admin-kpi-value ink">—</div>
        <div id="admin-pass-rate" class="admin-kpi-sub-value">قبولی: —</div>
      </div>
      <div class="admin-kpi-tile">
        <div class="admin-kpi-label">⏱️ حضور (دقیقه)</div>
        <div id="admin-total-mins" class="admin-kpi-value ink">—</div>
        <div class="admin-kpi-sub-value">مجموع همه کاربران</div>
      </div>
      <div class="admin-kpi-tile">
        <div class="admin-kpi-label">💰 هزینه API</div>
        <div id="admin-total-cost" class="admin-kpi-value stop">—</div>
        <div id="admin-total-api-calls" class="admin-kpi-sub-value">— فراخوانی</div>
      </div>
      <div id="admin-pending-alert" class="admin-pending-alert">
        <div class="admin-pending-alert-label">⏳ در انتظار تایید</div>
        <div id="admin-pending-count" class="admin-pending-alert-value">—</div>
        <div class="admin-pending-alert-sub">کاربر جدید</div>
      </div>
    </div>

    <!-- ── Section 2: Cost breakdown by action (§18.4) ─────────────────────── -->
    <div class="admin-section-card">
      <div class="admin-section-header-row">
        <h2 class="admin-section-heading">💸 هزینه API به تفکیک نوع عملیات</h2>
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

    <!-- ── Section 3: User list ─────────────────────────────────────────────── -->
    <div class="admin-filter-row">
      <label for="admin-search-input" class="visually-hidden">جستجوی کاربر</label>
      <input type="text" id="admin-search-input" placeholder="🔍 جستجوی کاربر با نام یا آیدی…"
        class="admin-search-input" oninput="App.debouncedAdminSearch()" />
      <label for="admin-status-filter" class="visually-hidden">فیلتر وضعیت کاربر</label>
      <select id="admin-status-filter" onchange="App.loadAdminUsers()" class="admin-status-select">
        <option value="all">همه کاربران</option>
        <option value="approved">✅ تایید شده</option>
        <option value="pending">⏳ در انتظار</option>
        <option value="blocked">🔴 مسدود</option>
      </select>
    </div>
    <div class="admin-list-header-row">
      <h2 class="admin-list-heading">👤 لیست کاربران</h2>
      <span id="admin-user-count" class="admin-user-count"></span>
    </div>
    <div id="admin-users-table" class="admin-users-table"></div>

    <!-- ── Section 4: Live event stream ────────────────────────────────────── -->
    <h2 class="admin-events-heading">⚡ لاگ زنده رویدادها</h2>
    <div id="admin-events-stream" class="admin-events-stream"></div>
  </div>
</div>
`;
}

export function renderAdminUserModal(): string {
  return `
<div id="admin-user-modal" style="position:fixed; inset:0; z-index:360; display:none; flex-direction:column; justify-content:flex-end;">
  <div class="admin-user-modal-overlay" onclick="App.closeAdminUserModal()"></div>
  <div class="admin-user-modal-panel">
    <div class="admin-user-modal-header-row">
      <h3 id="admin-user-modal-title" class="admin-user-modal-title">📊 جزئیات فعالیت کاربر</h3>
      <button type="button" class="btn btn-ghost btn-sm" onclick="App.closeAdminUserModal()">✕ بستن</button>
    </div>
    <div id="admin-user-modal-content"></div>
  </div>
</div>
`;
}
