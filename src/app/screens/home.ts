/**
 * src/app/screens/home.ts
 * Home / personalized dashboard screen.
 */
export function renderHomeScreen(): string {
  return `
<div id="screen-home" class="screen" style="padding:0 0 85px;">
  <div style="padding:20px 16px 0;">
    <!-- User Profile Header Card -->
    <div class="user-profile-header card" style="background: linear-gradient(135deg, rgba(31,33,40,0.95), rgba(40,43,53,0.95)); border: 1px solid rgba(232,163,61,0.25); box-shadow: 0 8px 32px rgba(0,0,0,0.3); margin-bottom: 20px; padding: 20px;">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:14px; margin-bottom: 16px;">
        <!-- Profile Info (Avatar + Name) -->
        <div style="display:flex; align-items:center; gap:14px; min-width:0;">
          <div id="user-avatar-container" style="position:relative; flex-shrink:0;">
            <img id="user-photo" src="" alt="Profile" style="display:none; width:54px; height:54px; border-radius:50%; object-fit:cover; border:2px solid var(--amber); box-shadow: 0 4px 14px rgba(232,163,61,0.3);" />
            <div id="user-initials-avatar" style="width:54px; height:54px; border-radius:50%; background: linear-gradient(135deg, #16a34a, #2563eb); display:flex; align-items:center; justify-content:center; color:#ffffff; font-family:'Barlow Condensed', sans-serif; font-size:1.4rem; font-weight:700; border:2px solid rgba(255,255,255,0.2); box-shadow: 0 4px 14px rgba(37,99,235,0.4);">
              👤
            </div>
            <span style="position:absolute; bottom:0; right:0; width:14px; height:14px; background:#10b981; border:2px solid var(--surface); border-radius:50%;" title="حساب فعال"></span>
          </div>
          
          <div style="min-width:0;">
            <div id="user-full-name" style="font-size:1.1rem; font-weight:700; color:var(--ink); line-height:1.2; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
              کاربر پاتنته
            </div>
            <div style="display:flex; align-items:center; gap:6px; margin-top:4px; flex-wrap:wrap;">
              <span id="user-username" style="font-size:0.75rem; color:var(--amber); font-family:'Public Sans', sans-serif; direction:ltr;">@user</span>
              <span style="font-size:0.68rem; background:rgba(27,122,61,0.2); color:#4ade80; border:1px solid rgba(27,122,61,0.4); padding:1px 6px; border-radius:10px; font-weight:600;">داشبورد اختصاصی</span>
              <button type="button" onclick="App.showGuideModal()" style="font-size:0.68rem; background:rgba(232,163,61,0.18); color:var(--amber); border:1px solid rgba(232,163,61,0.4); padding:1px 8px; border-radius:10px; font-weight:700; cursor:pointer;">💡 راهنما و راز قبولی</button>
            </div>
          </div>
        </div>

        <!-- Streak Badge -->
        <div id="home-streak" style="text-align:center; background:var(--surface-2); border:1px solid rgba(232,163,61,0.3); border-radius:14px; padding:10px 14px; flex-shrink:0;">
          <div style="font-size:1.5rem; font-weight:700; color:var(--amber); line-height:1;" id="streak-value">0</div>
          <div style="font-size:0.68rem; color:var(--ink-muted); margin-top:2px;">🔥 استریک</div>
        </div>
      </div>

      <!-- Key Metrics Row (3 Chips) -->
      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:10px; margin-top:14px;">
        <div class="stat-chip" style="background:var(--surface-2); border:1px solid var(--border); border-radius:12px; padding:10px 6px; text-align:center; cursor:pointer;" onclick="App.openExamDateModal()">
          <div style="font-size:0.7rem; color:var(--ink-muted); margin-bottom:2px;">📅 روز تا آزمون</div>
          <div class="stat-chip-value" id="home-days" style="font-size:1.1rem; font-weight:700; color:var(--amber);">—</div>
          <div style="font-size:0.65rem; color:#60a5fa; margin-top:2px; font-weight:600;">تنظیم ✏️</div>
        </div>
        
        <div class="stat-chip" style="background:var(--surface-2); border:1px solid var(--border); border-radius:12px; padding:10px 6px; text-align:center;">
          <div style="font-size:0.7rem; color:var(--ink-muted); margin-bottom:2px;">📊 درصد قبولی</div>
          <div class="stat-chip-value" id="home-pass-rate" style="font-size:1.1rem; font-weight:700; color:#10b981;">—</div>
          <div style="font-size:0.65rem; color:var(--ink-muted); margin-top:2px;" id="home-total-exams">۰ آزمون</div>
        </div>

        <div class="stat-chip" style="background:var(--surface-2); border:1px solid var(--border); border-radius:12px; padding:10px 6px; text-align:center;">
          <div style="font-size:0.7rem; color:var(--ink-muted); margin-bottom:2px;">🔁 مرور اشتباهات</div>
          <div class="stat-chip-value" id="home-review" style="font-size:1.1rem; font-weight:700; color:#ef4444;">0</div>
          <div style="font-size:0.65rem; color:var(--ink-muted); margin-top:2px;">سوال معوقه</div>
        </div>
      </div>
    </div>

    <!-- Weak-topic focus card -->
    <div id="home-focus-card" class="topic-focus-card" style="display:none; margin-bottom:16px;">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
        <div>
          <div style="font-size:0.72rem; color:var(--go); font-weight:700; letter-spacing:0.04em; margin-bottom:4px;">⚡ تمرین هدفمند موضوع ضعیف</div>
          <div id="home-weakest" style="font-size:0.95rem; font-weight:600; color:var(--ink);"></div>
        </div>
        <button class="btn btn-go-outline btn-sm" style="white-space:nowrap; flex-shrink:0;" onclick="App.startTopicPractice()">
          شروع کن
        </button>
      </div>
    </div>

    <!-- Recent Exam History Feed -->
    <div id="home-recent-section" style="margin-bottom:20px; display:none;">
      <div style="font-size:0.85rem; font-weight:700; color:var(--ink-muted); margin-bottom:8px;">📜 آخرین آزمون‌های من</div>
      <div id="home-recent-list" style="display:flex; flex-direction:column; gap:8px;"></div>
    </div>

    <!-- Data notice -->
    <div style="background:rgba(232,163,61,0.08); border:1px solid rgba(232,163,61,0.2); border-radius:10px; padding:10px 14px; margin-bottom:16px; font-size:0.76rem; color:var(--amber); line-height:1.5;">
      ⚠️ بانک سوال از ۲۰۲۳ — قبل از آزمون با سایت رسمی چک کن.
    </div>
  </div>

  <!-- Action buttons -->
  <div style="padding:0 16px; display:flex; flex-direction:column; gap:10px;">
    <button class="btn btn-primary btn-full" id="btn-start-exam" onclick="App.startExam()">
      🚗 آزمون جامع جدید — ۳۰ سوال (۲۰ دقیقه)
    </button>
    <button class="btn btn-full" onclick="App.showScreen('topics')" style="background:linear-gradient(135deg, rgba(37,99,235,0.2), rgba(168,85,247,0.2)); border:1px solid rgba(59,130,246,0.4); color:#93c5fd; font-weight:700;">
      📚 ۲۵ فصل آموزشی پاتنته B (Capitoli)
    </button>
    <button class="btn btn-ghost btn-full" id="btn-start-review" onclick="App.startReview()" style="display:none;">
      🔁 مرور اشتباهات
    </button>
    <button class="btn btn-ghost btn-full" onclick="App.showScreen('signs')">
      🚦 تمرین تابلوها
    </button>
    <!-- Profile & Analysis entry point (§13.4) -->
    <button class="btn btn-full" onclick="App.showScreen('profile')" style="background:linear-gradient(135deg, rgba(27,122,61,0.15), rgba(232,163,61,0.12)); border:1px solid rgba(27,122,61,0.35); color:var(--ink); font-weight:700; display:flex; align-items:center; justify-content:center; gap:8px;">
      <span style="font-size:1rem;">👤</span>
      <span>پروفایل و تحلیل عملکرد</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px;opacity:0.6; flex-shrink:0;"><path d="M9 18l6-6-6-6"/></svg>
    </button>
  </div>
</div>
`;
}
