/**
 * src/app/screens/home.ts
 * Home / personalized dashboard screen.
 */
export function renderHomeScreen(): string {
  return `
<div id="screen-home" class="screen" style="padding:0 0 85px;">
  <div class="home-content">
    <!-- User Profile Header Card -->
    <div class="user-profile-header card home-profile-card">
      <div class="home-profile-top">
        <!-- Profile Info (Avatar + Name) -->
        <div class="home-profile-identity">
          <div id="user-avatar-container" class="home-avatar-wrap">
            <img id="user-photo" src="" alt="عکس پروفایل کاربر" class="home-avatar-photo" />
            <div id="user-initials-avatar" class="home-avatar-initials" aria-hidden="true">
              👤
            </div>
            <span class="home-avatar-status-dot" title="حساب فعال"></span>
          </div>

          <div class="home-name-block">
            <div id="user-full-name" class="home-full-name">
              کاربر پاتنته
            </div>
            <div class="home-name-badges">
              <span id="user-username" class="home-username">@user</span>
              <span class="home-dashboard-badge">داشبورد اختصاصی</span>
              <button type="button" onclick="App.showGuideModal()" class="home-guide-btn">💡 راهنما و راز قبولی</button>
            </div>
          </div>
        </div>

        <!-- Streak Badge -->
        <div id="home-streak" class="home-streak-badge">
          <div class="home-streak-value" id="streak-value">0</div>
          <div class="home-streak-label">🔥 استریک</div>
        </div>
      </div>

      <!-- Key Metrics Row (3 Chips) -->
      <div class="home-metrics-row">
        <div class="stat-chip home-metric-chip clickable" onclick="App.openExamDateModal()" role="button" tabindex="0" aria-label="تنظیم تاریخ آزمون">
          <div class="home-metric-label">📅 روز تا آزمون</div>
          <div class="stat-chip-value home-metric-value amber" id="home-days">—</div>
          <div class="home-metric-sub amber">تنظیم ✏️</div>
        </div>

        <div class="stat-chip home-metric-chip">
          <div class="home-metric-label">📊 درصد قبولی</div>
          <div class="stat-chip-value home-metric-value go" id="home-pass-rate">—</div>
          <div class="home-metric-sub muted" id="home-total-exams">۰ آزمون</div>
        </div>

        <div class="stat-chip home-metric-chip">
          <div class="home-metric-label">🔁 مرور اشتباهات</div>
          <div class="stat-chip-value home-metric-value stop" id="home-review">0</div>
          <div class="home-metric-sub muted">سوال معوقه</div>
        </div>
      </div>
    </div>

    <!-- Weak-topic focus card -->
    <div id="home-focus-card" class="topic-focus-card" style="display:none; margin-bottom:16px;">
      <div class="home-focus-card-row">
        <div>
          <div class="home-focus-eyebrow">⚡ تمرین هدفمند موضوع ضعیف</div>
          <div id="home-weakest" class="home-focus-weakest"></div>
        </div>
        <button class="btn btn-go-outline btn-sm" style="white-space:nowrap; flex-shrink:0;" onclick="App.startTopicPractice()">
          شروع کن
        </button>
      </div>
    </div>

    <!-- Recent Exam History Feed -->
    <div id="home-recent-section" class="home-recent-section">
      <div class="home-recent-heading">📜 آخرین آزمون‌های من</div>
      <div id="home-recent-list" class="home-recent-list"></div>
    </div>

    <!-- Data notice -->
    <div class="home-data-notice">
      ⚠️ بانک سوال از ۲۰۲۳ — قبل از آزمون با سایت رسمی چک کن.
    </div>
  </div>

  <!-- Action buttons -->
  <div class="home-actions">
    <button class="btn btn-primary btn-full" id="btn-start-exam" onclick="App.startExam()">
      🚗 آزمون جامع جدید — ۳۰ سوال (۲۰ دقیقه)
    </button>
    <button class="btn btn-amber-outline btn-full" onclick="App.showScreen('topics')">
      📚 ۲۵ فصل آموزشی پاتنته B (Capitoli)
    </button>
    <button class="btn btn-ghost btn-full" id="btn-start-review" onclick="App.startReview()" style="display:none;">
      🔁 مرور اشتباهات
    </button>
    <button class="btn btn-ghost btn-full" onclick="App.showScreen('signs')">
      🚦 تمرین تابلوها
    </button>
    <!-- Profile & Analysis entry point (§13.4) -->
    <button class="btn btn-full btn-profile-entry" onclick="App.showScreen('profile')">
      <span style="font-size:1rem;" aria-hidden="true">👤</span>
      <span>پروفایل و تحلیل عملکرد</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px;opacity:0.6; flex-shrink:0;" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
    </button>
  </div>
</div>
`;
}
