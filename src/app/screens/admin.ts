/**
 * src/app/screens/admin.ts
 * Admin dashboard screen (operator tool — KPIs, cost breakdown, user list,
 * live event stream) plus the per-user activity timeline modal it opens.
 */
export function renderAdminScreen(): string {
  return `
<div id="screen-admin" class="screen" style="padding:0 0 80px;">
  <div style="padding:20px 16px 0;">

    <!-- ── Section 1: Header + KPI bar ────────────────────────────────────── -->
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
      <div style="display:flex; align-items:center; gap:10px;">
        <span style="font-size:1.8rem;">🎛️</span>
        <div>
          <h1 style="margin:0; font-family:'Barlow Condensed',sans-serif; font-size:1.8rem; font-weight:700;">پنل مدیریت PatenteFa</h1>
          <div style="font-size:0.75rem; color:var(--ink-muted);" id="admin-kpi-sub">در حال بارگذاری…</div>
        </div>
      </div>
      <button type="button" class="btn btn-ghost btn-sm" onclick="App.loadAdminData()" style="border-radius:10px;">🔄 به‌روزرسانی</button>
    </div>

    <!-- KPI row: 6-cell grid, 3 per row on small screens -->
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; margin-bottom:8px;">
      <div style="background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:12px; text-align:right;">
        <div style="font-size:0.7rem; color:var(--ink-muted);">👥 کاربران</div>
        <div id="admin-total-users" style="font-size:1.5rem; font-weight:700; color:var(--amber);">—</div>
        <div id="admin-pending-users" style="font-size:0.68rem; color:#f59e0b;"></div>
      </div>
      <div style="background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:12px; text-align:right;">
        <div style="font-size:0.7rem; color:var(--ink-muted);">✅ فعال امروز</div>
        <div id="admin-active-today" style="font-size:1.5rem; font-weight:700; color:#4ade80;">—</div>
        <div id="admin-events-logged" style="font-size:0.68rem; color:var(--ink-muted);"></div>
      </div>
      <div style="background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:12px; text-align:right;">
        <div style="font-size:0.7rem; color:var(--ink-muted);">📝 آزمون‌ها</div>
        <div id="admin-total-exams" style="font-size:1.5rem; font-weight:700; color:var(--ink);">—</div>
        <div id="admin-pass-rate" style="font-size:0.68rem; color:var(--ink-muted);">قبولی: —</div>
      </div>
      <div style="background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:12px; text-align:right;">
        <div style="font-size:0.7rem; color:var(--ink-muted);">⏱️ حضور (دقیقه)</div>
        <div id="admin-total-mins" style="font-size:1.5rem; font-weight:700; color:#38bdf8;">—</div>
        <div style="font-size:0.68rem; color:var(--ink-muted);">مجموع همه کاربران</div>
      </div>
      <div style="background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:12px; text-align:right;">
        <div style="font-size:0.7rem; color:var(--ink-muted);">💰 هزینه API</div>
        <div id="admin-total-cost" style="font-size:1.5rem; font-weight:700; color:#f43f5e;">—</div>
        <div id="admin-total-api-calls" style="font-size:0.68rem; color:var(--ink-muted);">— فراخوانی</div>
      </div>
      <div id="admin-pending-alert" style="background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.4); border-radius:12px; padding:12px; text-align:right; display:none;">
        <div style="font-size:0.7rem; color:#f59e0b;">⏳ در انتظار تایید</div>
        <div id="admin-pending-count" style="font-size:1.5rem; font-weight:700; color:#f59e0b;">—</div>
        <div style="font-size:0.68rem; color:#f59e0b;">کاربر جدید</div>
      </div>
    </div>

    <!-- ── Section 2: Cost breakdown by action (§18.4) ─────────────────────── -->
    <div style="background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:14px; margin-bottom:16px;">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
        <h2 style="margin:0; font-size:0.88rem; font-weight:700; color:var(--ink);">💸 هزینه API به تفکیک نوع عملیات</h2>
        <div style="display:flex; gap:8px;">
          <button type="button" id="cost-tab-today" onclick="App.switchCostTab('today')" style="font-size:0.7rem; padding:3px 10px; border-radius:6px; border:1px solid var(--border); background:var(--go); color:#fff; cursor:pointer;">امروز</button>
          <button type="button" id="cost-tab-week" onclick="App.switchCostTab('week')" style="font-size:0.7rem; padding:3px 10px; border-radius:6px; border:1px solid var(--border); background:var(--surface-2); color:var(--ink-muted); cursor:pointer;">۷ روز</button>
          <button type="button" id="cost-tab-total" onclick="App.switchCostTab('total')" style="font-size:0.7rem; padding:3px 10px; border-radius:6px; border:1px solid var(--border); background:var(--surface-2); color:var(--ink-muted); cursor:pointer;">کل</button>
        </div>
      </div>
      <div id="admin-cost-breakdown" style="display:flex; flex-direction:column; gap:6px;">
        <div style="color:var(--ink-muted); font-size:0.8rem; text-align:center; padding:10px;">در حال بارگذاری…</div>
      </div>
    </div>

    <!-- ── Section 3: User list ─────────────────────────────────────────────── -->
    <div style="display:flex; gap:8px; margin-bottom:12px; flex-wrap:wrap;">
      <input type="text" id="admin-search-input" placeholder="🔍 جستجوی کاربر با نام یا آیدی…"
        style="flex:1; min-width:170px; padding:9px 12px; background:var(--surface-2); border:1px solid var(--border); border-radius:12px; color:var(--ink); font-size:0.85rem;"
        oninput="App.debouncedAdminSearch()" />
      <select id="admin-status-filter" onchange="App.loadAdminUsers()"
        style="padding:9px 12px; background:var(--surface-2); border:1px solid var(--border); border-radius:12px; color:var(--ink); font-size:0.85rem;">
        <option value="all">همه کاربران</option>
        <option value="approved">✅ تایید شده</option>
        <option value="pending">⏳ در انتظار</option>
        <option value="blocked">🔴 مسدود</option>
      </select>
    </div>
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
      <h2 style="margin:0; font-size:0.88rem; font-weight:700; color:var(--ink);">👤 لیست کاربران</h2>
      <span id="admin-user-count" style="font-size:0.75rem; color:var(--ink-muted);"></span>
    </div>
    <div id="admin-users-table" style="display:flex; flex-direction:column; gap:10px;"></div>

    <!-- ── Section 4: Live event stream ────────────────────────────────────── -->
    <h2 style="font-size:0.88rem; font-weight:700; margin:20px 0 8px; color:var(--ink);">⚡ لاگ زنده رویدادها</h2>
    <div id="admin-events-stream" style="background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:12px; max-height:280px; overflow-y:auto; font-size:0.78rem;"></div>
  </div>
</div>
`;
}

export function renderAdminUserModal(): string {
  return `
<div id="admin-user-modal" style="position:fixed; inset:0; z-index:360; display:none; flex-direction:column; justify-content:flex-end;">
  <div style="position:absolute; inset:0; background:rgba(0,0,0,0.7); backdrop-filter:blur(4px);" onclick="App.closeAdminUserModal()"></div>
  <div style="position:relative; z-index:1; background:var(--surface); border-top:1px solid var(--border); border-radius:20px 20px 0 0; padding:20px; max-height:88vh; overflow-y:auto;">
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;">
      <h3 id="admin-user-modal-title" style="margin:0; font-size:1.05rem; color:var(--ink);">📊 جزئیات فعالیت کاربر</h3>
      <button type="button" class="btn btn-ghost btn-sm" onclick="App.closeAdminUserModal()">✕ بستن</button>
    </div>
    <div id="admin-user-modal-content"></div>
  </div>
</div>
`;
}
