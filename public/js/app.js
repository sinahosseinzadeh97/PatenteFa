/**
 * public/js/app.js
 * PatenteFa Mini App client logic — classic (non-module) script, served as a
 * static asset via wrangler's `assets` binding and loaded from shell.tsx.
 * Home, topics, vocab, stats, profile, admin, signs, tutor, reels — the exam
 * runner + results + AI panel live in public/js/exam.js (loaded before this
 * file) and share the same `state`/`api`/`App` globals via the classic-script
 * shared lexical scope (no bundler, no ES modules — intentional, see
 * src/app/client.ts).
 */
window.App = window.App || {};
App.escapeHtml = function(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Render AI prose (**bold** headings + newlines) into `el`.
 * The theory/grammar/tutor prompts all answer in bold-headed sections;
 * textContent rendered the asterisks literally and turned the explanation
 * into an unreadable wall. Escapes first, so this stays XSS-safe.
 */
App.renderRichText = function(el, text) {
  if (!el) return;
  el.innerHTML = App.escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong class="ai-heading">$1</strong>')
    .replace(/\n/g, '<br>');
};

  'use strict';


  // ── Telegram WebApp init ────────────────────────────────────────────────────
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
    if (typeof tg.requestFullscreen === 'function') {
      try {
        tg.requestFullscreen();
      } catch (e) {}
    }
    if (typeof tg.disableVerticalSwipes === 'function') {
      try {
        tg.disableVerticalSwipes();
      } catch (e) {}
    }
    tg.setHeaderColor('#14151A');
    tg.setBackgroundColor('#14151A');
  }
  const initData = tg?.initData || '';

  // ── API helpers ─────────────────────────────────────────────────────────────
  async function api(method, path, body) {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json', 'X-Telegram-InitData': initData },
    };
    if (body !== undefined) opts.body = JSON.stringify(body);
    const res = await fetch('/api' + path, opts);
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'خطای شبکه' }));
      if (res.status === 403 && err.isApproved === false) {
        // Not while the user is in the support thread: that screen is reachable
        // without approval on purpose, and a background call (telemetry) hitting
        // the gate would otherwise throw them out mid-message.
        if (state.currentScreen !== 'support') App.showPendingScreen(err.error);
        throw new Error(err.error || 'در انتظار تایید مدیریت');
      }
      throw new Error(err.error || 'درخواست ناموفق بود');
    }
    // Trial clock rides along on every API response; absent for paid/admin users.
    App.renderTrialBanner(res.headers.get('X-Trial-Ms-Left'));
    return res.json();
  }

  // ── State ───────────────────────────────────────────────────────────────────
  const state = {
    currentScreen: 'home',
    prevScreen: null,
    // Exam
    sessionId: null,
    questions: [],
    currentIndex: 0,
    answers: {},
    flags: new Set(),
    startedAt: null,
    timerInterval: null,
    secondsLeft: 1200,
    examReturnScreen: 'home',
    translateOpen: false,
    translationCache: {},
    theoryCache: {},    // §15.3: per-question theory explanations (lazy)
    grammarCache: {},   // §15.3: per-question grammar+vocab (lazy)
    // Vocab
    vocabItems: [],
    dueVocab: [],
    dueVocabIndex: 0,
    vocabFlipped: false,
    // Signs (SRS stored in localStorage)
    signsQueue: [],
    signsIndex: 0,
    signsFlipped: false,
    allSigns: [],
    // Long-press vocab (§12.2)
    longPressTimer: null,
    longPressWord: null,
    vocabSheetQuestionId: null,
    // Patente Reels (Vertical Feed)
    reelsFeed: [],
    reelsLoading: false,
    reelsAnswered: {},
    reelsLiked: new Set(),
  };

  // ── Screen routing (with slide transition) ───────────────────────────────────
  window.App = window.App || {};


  App.showScreen = function(name, direction) {
    // direction: 'forward' (default) | 'back'
    const dir = direction || 'forward';
    const current = document.querySelector('.screen.active');
    const next = document.getElementById('screen-' + name);
    if (!next) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (current && current !== next && !prefersReduced) {
      const outClass = dir === 'back' ? 'slide-out-right' : 'slide-out-left';
      const inClass  = dir === 'back' ? 'slide-in-left'  : 'slide-in-right';

      current.classList.add(outClass);
      next.style.display = 'flex';
      next.classList.add(inClass);

      current.addEventListener('animationend', function handler() {
        current.classList.remove('active', outClass);
        current.style.display = '';
        current.removeEventListener('animationend', handler);
      });
      next.addEventListener('animationend', function handler() {
        next.classList.remove(inClass);
        next.removeEventListener('animationend', handler);
      });
      next.classList.add('active');
    } else {
      document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.style.display = '';
      });
      next.classList.add('active');
    }

    // Nav highlight
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const nav = document.getElementById('nav-' + name);
    if (nav) nav.classList.add('active');

    state.prevScreen = state.currentScreen;
    state.currentScreen = name;

    if (name === 'home')    App.loadHome();
    if (name === 'topics')  App.loadTopics();
    if (name === 'vocab')   App.loadVocab();
    if (name === 'stats')   App.loadStats();
    if (name === 'signs')   App.loadSigns();
    if (name === 'reels')   App.loadReels();
    if (name === 'admin')   App.loadAdminData();
    if (name === 'profile') App.loadProfile();
    if (name === 'support') App.loadSupport();

    App.syncTelegramBackButton();
    App.trackEvent('screen_view', { screen: name });
  };

  // ── Client Telemetry & Admin Management ────────────────────────────────────
  App.trackEvent = function(eventType, eventData, durationSeconds) {
    try {
      api('POST', '/telemetry/event', {
        eventType: eventType,
        eventData: eventData,
        durationSeconds: durationSeconds || 0
      }).catch(function() {});
    } catch (e) {}
  };

  // Heartbeat active duration tracking every 60 seconds
  setInterval(function() {
    if (document.visibilityState === 'visible') {
      App.trackEvent('heartbeat', { screen: state.currentScreen || 'home' }, 60);
    }
  }, 60000);

  state.adminUsers = [];
  state.costBreakdown = [];
  state.costTab = 'today';
  state.adminSearchTimer = null;
  state.adminThreadUserId = null;   // open support thread in the admin panel
  state.adminThreadName = '';
  state.supportFrom = null;         // screen to return to from the support thread

  // ── §18.3: relative time formatter ──────────────────────────────────────────
  App.relativeTime = function(isoStr) {
    if (!isoStr) return null;
    // Avoid lookbehind regex — unsupported in iOS WebView / older JavaScriptCore.
    var s = (isoStr + '').replace(' ', 'T');
    if (!/Z$|[+-]\d{2}:\d{2}$/.test(s)) s += 'Z';
    var d = new Date(s);
    var diff = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diff < 0)     diff = 0;
    if (diff < 60)    return 'همین الان';
    if (diff < 3600)  return Math.floor(diff / 60) + ' دقیقه پیش';
    if (diff < 86400) return Math.floor(diff / 3600) + ' ساعت پیش';
    if (diff < 172800) return 'دیروز';
    return Math.floor(diff / 86400) + ' روز پیش';
  };

  // ── §18.4: cost-by-action tab switcher + renderer ────────────────────────────
  App.switchCostTab = function(tab) {
    state.costTab = tab;
    ['today','week','total'].forEach(function(t) {
      var btn = document.getElementById('cost-tab-' + t);
      if (!btn) return;
      btn.classList.toggle('active', t === tab);
    });
    App.renderCostBreakdown(state.costBreakdown);
  };

  App.renderCostBreakdown = function(breakdown) {
    var el = document.getElementById('admin-cost-breakdown');
    if (!el) return;
    if (!breakdown || breakdown.length === 0) {
      el.innerHTML = '<div class="admin-loading-note">هنوز هیچ فراخوانی API ثبت نشده است.</div>';
      return;
    }
    var tab = state.costTab || 'today';
    var costKey = 'cost_' + tab;
    var callsKey = 'calls_' + tab;
    var maxCost = 0;
    var totalCost = 0;
    breakdown.forEach(function(r) {
      if ((r[costKey] || 0) > maxCost) maxCost = r[costKey];
      totalCost += (r[costKey] || 0);
    });
    var actionLabels = {
      'translate_question': '🌐 ترجمه سوال',
      'theory_explain':     '🎓 توضیح تئوری',
      'grammar_analyze':    '📚 آنالیز گرامر',
      'tutor_chat':         '💬 مکالمه مربی',
      'suggest_vocab':      '📖 پیشنهاد لغت'
    };
    var html = '';
    breakdown.forEach(function(r) {
      var cost   = r[costKey]  || 0;
      var calls  = r[callsKey] || 0;
      var pct    = maxCost  > 0 ? Math.round((cost / maxCost)  * 100) : 0;
      var tPct   = totalCost > 0 ? Math.round((cost / totalCost) * 100) : 0;
      var label  = actionLabels[r.action] || r.action;
      html += '<div class="admin-cost-row">' +
        '<div class="admin-cost-row-top">' +
          '<span class="admin-cost-row-label">' + label + '</span>' +
          '<span class="admin-cost-row-meta">' + calls + ' calls | <b class="admin-cost-row-cost">$' + cost.toFixed(5) + '</b> (' + tPct + '%)</span>' +
        '</div>' +
        '<div class="admin-cost-bar-track">' +
          '<div class="admin-cost-bar-fill" style="width:' + pct + '%;"></div>' +
        '</div>' +
      '</div>';
    });
    el.innerHTML = html;
  };

  // ── §18.6: debounced server-side search ──────────────────────────────────────
  App.debouncedAdminSearch = function() {
    clearTimeout(state.adminSearchTimer);
    state.adminSearchTimer = setTimeout(function() { App.loadAdminUsers(); }, 350);
  };

  App.loadAdminUsers = async function() {
    var search = ((document.getElementById('admin-search-input') || {}).value || '').trim();
    var status = ((document.getElementById('admin-status-filter') || {}).value || 'all');
    try {
      var qs = [];
      if (search) qs.push('search=' + encodeURIComponent(search));
      if (status !== 'all') qs.push('status=' + encodeURIComponent(status));
      var res = await api('GET', '/admin/users' + (qs.length ? '?' + qs.join('&') : ''));
      state.adminUsers = res.users || [];
      App.renderAdminUsers(state.adminUsers);
    } catch (err) {
      App.toast('خطا در جستجوی کاربران');
    }
  };

  // kept for backward compat (status-filter onchange was calling filterAdminUsers)
  App.filterAdminUsers = function() { App.loadAdminUsers(); };

  App.loadAdminData = async function() {
    try {
      const [overview, usersRes, eventsRes, costRes, supportRes] = await Promise.all([
        api('GET', '/admin/overview'),
        api('GET', '/admin/users'),
        api('GET', '/admin/events'),
        api('GET', '/admin/cost'),
        api('GET', '/admin/support'),
      ]);

      state.adminUsers = usersRes.users || [];

      // KPI chips
      var el = function(id) { return document.getElementById(id); };
      if (el('admin-total-users'))    el('admin-total-users').textContent    = String(overview.totalUsers || 0);
      if (el('admin-active-today'))   el('admin-active-today').textContent   = String(overview.activeTodayUsers || 0);
      if (el('admin-events-logged'))  el('admin-events-logged').textContent  = (overview.totalEventsLogged || 0) + ' رویداد کل';  // §18.3
      if (el('admin-total-exams'))    el('admin-total-exams').textContent    = String(overview.totalExams || 0);
      if (el('admin-pass-rate'))      el('admin-pass-rate').textContent      = 'قبولی: ' + (overview.overallPassRate !== null ? overview.overallPassRate + '%' : '—');
      if (el('admin-total-mins'))     el('admin-total-mins').textContent     = String(overview.totalActiveMinutes || 0);
      if (el('admin-total-cost'))     el('admin-total-cost').textContent     = '$' + (overview.totalApiCostUsd || 0).toFixed(4);
      if (el('admin-total-api-calls')) el('admin-total-api-calls').textContent = (overview.totalApiCalls || 0) + ' فراخوانی';
      if (el('admin-kpi-sub'))        el('admin-kpi-sub').textContent        = 'مدیریت کاربران، لاگ‌ها، زمان حضور و هزینه‌های API';

      // §18.3: pending-users alert chip
      var pending = overview.pendingUsers || 0;
      if (el('admin-pending-users')) el('admin-pending-users').textContent = pending > 0 ? pending + ' در انتظار تایید' : '';
      if (el('admin-pending-alert')) el('admin-pending-alert').style.display = pending > 0 ? 'block' : 'none';
      if (el('admin-pending-count')) el('admin-pending-count').textContent = String(pending);

      // §18.4: cost breakdown
      state.costBreakdown = costRes.breakdown || [];
      App.renderCostBreakdown(state.costBreakdown);

      App.renderAdminUsers(state.adminUsers);
      App.renderAdminEvents(eventsRes.events || []);
      App.renderAdminSupport(supportRes.threads || [], supportRes.unreadTotal || 0);
    } catch (err) {
      App.toast('خطا در دریافت اطلاعات مدیریت (فقط ادمین دسترسی دارد)');
    }
  };

  // ── Support inbox (admin side) ──────────────────────────────────────────────
  App.renderAdminSupport = function(threads, unreadTotal) {
    var box = document.getElementById('admin-support-threads');
    var pill = document.getElementById('admin-support-unread');
    if (pill) {
      pill.textContent = unreadTotal > 0 ? unreadTotal + ' پیام خوانده‌نشده' : '';
      pill.hidden = !(unreadTotal > 0);
    }
    if (!box) return;

    if (!threads || threads.length === 0) {
      box.innerHTML = '<div class="admin-loading-note">هنوز پیامی از کاربران دریافت نشده. برای شروع گفتگو، دکمه 💬 روی کارت هر کاربر را بزنید.</div>';
      return;
    }

    var html = '';
    threads.forEach(function(t) {
      var name = App.escapeHtml(t.first_name || 'کاربر');
      var preview = App.escapeHtml(String(t.last_body || '').slice(0, 80));
      var when = App.relativeTime(t.last_at) || '';
      var arrow = t.last_direction === 'out' ? '↩️' : '📨';
      // Only the id crosses into the onclick attribute — a name interpolated
      // there would be re-decoded by the HTML parser and could break out of the
      // JS string. The panel takes its title from the API response instead.
      html += '<button type="button" class="admin-support-row' + (t.unread > 0 ? ' unread' : '') + '"' +
        ' onclick="App.openAdminThread(' + t.user_id + ')">' +
        '<div class="admin-support-row-top">' +
          '<span class="admin-support-row-name">' + name +
            (t.username ? ' <span class="admin-user-username">@' + App.escapeHtml(t.username) + '</span>' : '') +
          '</span>' +
          (t.unread > 0 ? '<span class="admin-support-row-badge">' + t.unread + '</span>' : '<span class="admin-support-row-time">' + App.escapeHtml(when) + '</span>') +
        '</div>' +
        '<div class="admin-support-row-preview">' + arrow + ' ' + preview + '</div>' +
      '</button>';
    });
    box.innerHTML = html;
  };

  App.openAdminThread = async function(userId) {
    var modal = document.getElementById('admin-support-modal');
    var box = document.getElementById('admin-support-thread');
    var title = document.getElementById('admin-support-modal-title');
    if (!modal || !box) return;

    state.adminThreadUserId = userId;
    state.adminThreadName = 'کاربر';
    modal.style.display = 'flex';
    if (title) title.textContent = '💬 گفتگو با کاربر';
    box.innerHTML = '<div class="support-empty">در حال بارگذاری…</div>';

    try {
      var data = await api('GET', '/admin/support/' + userId);
      state.adminThreadName = (data.user && data.user.firstName) || 'کاربر';
      if (title) title.textContent = '💬 گفتگو با ' + state.adminThreadName;
      App.renderSupportThread(box, data.messages || [], 'admin', state.adminThreadName);
    } catch (err) {
      box.innerHTML = '<div class="support-empty">دریافت گفتگو ناموفق بود.</div>';
    }
  };

  App.closeAdminThread = function() {
    var modal = document.getElementById('admin-support-modal');
    if (modal) modal.style.display = 'none';
    state.adminThreadUserId = null;
    App.loadAdminData(); // refresh unread counts after reading a thread
  };

  App.sendAdminReply = async function(e) {
    if (e && e.preventDefault) e.preventDefault();
    var input = document.getElementById('admin-support-input');
    var btn = document.getElementById('admin-support-send-btn');
    var box = document.getElementById('admin-support-thread');
    var text = input ? input.value.trim() : '';
    if (!text || !state.adminThreadUserId) return;

    if (btn) { btn.disabled = true; btn.textContent = '⏳'; }
    try {
      var res = await api('POST', '/admin/support/' + state.adminThreadUserId + '/reply', { text: text });
      if (input) input.value = '';
      var data = await api('GET', '/admin/support/' + state.adminThreadUserId);
      App.renderSupportThread(box, data.messages || [], 'admin', state.adminThreadName);
      App.toast(res.delivered
        ? 'پیام در مینی‌اپ ثبت و در تلگرام ارسال شد ✅'
        : 'پیام در مینی‌اپ ثبت شد، اما ارسال تلگرام ناموفق بود؛ کاربر همچنان آن را داخل برنامه می‌بیند.');
    } catch (err) {
      App.toast(err.message || 'ارسال پاسخ ناموفق بود');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = 'ارسال'; }
    }
  };

  // ── §18.7: per-user card renderer ────────────────────────────────────────────
  App.renderAdminUsers = function(users) {
    var container = document.getElementById('admin-users-table');
    var countEl   = document.getElementById('admin-user-count');
    if (!container) return;
    if (countEl) countEl.textContent = (users.length) + ' کاربر';

    if (!users || users.length === 0) {
      container.innerHTML = '<div class="admin-loading-note">هیچ کاربری یافت نشد</div>';
      return;
    }

    var html = '';
    users.forEach(function(u) {
      var statusBadge = u.is_approved === 1
        ? '<span class="admin-status-badge approved">✅ تایید</span>'
        : u.is_approved === -1
        ? '<span class="admin-status-badge blocked">🔴 مسدود</span>'
        : '<span class="admin-status-badge pending">⏳ انتظار</span>';

      // §18.3: last_active_at relative time
      var relTime = u.last_active_at ? App.relativeTime(u.last_active_at) : null;
      var lastSeenHtml = relTime
        ? ' <span style="font-size:0.68rem; color:var(--ink-muted);">🕐 ' + relTime + '</span>'
        : '';

      // §18.4: api-per-exam waste signal
      var wasteHtml = '';
      if (u.total_exams > 0) {
        var ratio = u.api_per_exam;
        var wasteClass = ratio > 5 ? 'high' : ratio > 2 ? 'medium' : 'low';
        wasteHtml = '<span class="admin-waste-badge ' + wasteClass + '">⚡ ' + ratio + ' API/آزمون</span>';
      }

      html += '<div class="admin-user-card">' +
        // Header
        '<div class="admin-user-card-top">' +
          '<div>' +
            '<div class="admin-user-name">' +
              App.escapeHtml(u.first_name || 'کاربر') +
              (u.username ? ' <span class="admin-user-username">@' + App.escapeHtml(u.username) + '</span>' : '') +
            '</div>' +
            '<div class="admin-user-meta">🆔 ' + u.telegram_user_id + lastSeenHtml + '</div>' +
          '</div>' +
          '<div class="admin-user-badges">' + wasteHtml + statusBadge + '</div>' +
        '</div>' +
        // Stats grid — §18.5: vocab_count / vocab_due; §18.4: api_per_exam via wasteHtml
        '<div class="admin-user-stats-grid">' +
          '<div><div class="stat-label">آزمون</div><b>' + u.total_exams + '</b> <span class="stat-value go">(' + u.passed_exams + '✓)</span></div>' +
          '<div><div class="stat-label">حضور</div><b>' + u.total_active_minutes + '</b> د</div>' +
          '<div><div class="stat-label">هزینه</div><b class="stat-value stop">$' + (u.total_api_cost_usd || 0).toFixed(4) + '</b></div>' +
          '<div><div class="stat-label">لغات</div><b>' + (u.vocab_count || 0) + '</b></div>' +
          '<div><div class="stat-label">مرور امروز</div><b>' + (u.vocab_due || 0) + '</b></div>' +
          '<div><div class="stat-label">API calls</div><b>' + u.total_api_calls + '</b></div>' +
        '</div>' +
        // Actions
        '<div class="admin-user-actions-row">' +
          '<button type="button" class="btn btn-ghost btn-sm" onclick="App.viewAdminUserTimeline(' + u.id + ')">📊 لاگ</button>' +
          '<button type="button" class="btn btn-ghost btn-sm" onclick="App.openAdminThread(' + u.id + ')">💬 پیام</button>' +
          (u.is_approved === 1
            ? '<button type="button" class="btn btn-falso btn-sm" onclick="App.setAdminUserStatus(' + u.id + ', -1)">🚫 لغو</button>'
            : '<button type="button" class="btn btn-vero btn-sm" onclick="App.setAdminUserStatus(' + u.id + ', 1)">✅ تایید</button>'
          ) +
        '</div>' +
      '</div>';
    });

    container.innerHTML = html;
  };


  App.renderAdminEvents = function(events) {
    var streamEl = document.getElementById('admin-events-stream');
    if (!streamEl) return;
    if (!events || events.length === 0) {
      streamEl.innerHTML = '<div class="admin-loading-note">هیچ رویدادی ثبت نشده.</div>';
      return;
    }
    var html = '<div style="display:flex; flex-direction:column; gap:5px;">';
    events.forEach(function(ev) {
      var name    = ev.first_name ? App.escapeHtml(ev.first_name) : 'کاربر';
      var details = ev.event_data ? ' <span class="admin-event-meta">('+App.escapeHtml(String(ev.event_data).slice(0,60))+')</span>' : '';
      var dur     = (ev.duration_seconds > 0) ? ' <span class="admin-event-duration">+' + ev.duration_seconds + 's</span>' : ''; // §18.3
      html += '<div class="admin-event-row">' +
        '<div><b>' + name + '</b>: <span class="admin-event-type">' + ev.event_type + '</span>' + details + dur + '</div>' +
        '<div class="admin-event-time">' + String(ev.created_at).slice(11,16) + '</div>' +
      '</div>';
    });
    html += '</div>';
    streamEl.innerHTML = html;
  };


  App.setAdminUserStatus = async function(userId, status) {
    try {
      await api('POST', '/admin/users/' + userId + '/status', { isApproved: status });
      App.toast(status === 1 ? 'کاربر تایید شد ✅' : 'دسترسی کاربر لغو شد 🚫');
      App.loadAdminData();
    } catch (err) {
      App.toast('خطا در تغییر وضعیت کاربر');
    }
  };

  App.viewAdminUserTimeline = async function(userId) {
    const modal = document.getElementById('admin-user-modal');
    const content = document.getElementById('admin-user-modal-content');
    const title = document.getElementById('admin-user-modal-title');
    if (!modal || !content) return;

    modal.style.display = 'flex';
    content.innerHTML = '<div class="admin-modal-loading"><div class="spinner" style="margin:0 auto;"></div><div class="admin-modal-loading-note">در حال دریافت لاگ کامل کاربر…</div></div>';

    try {
      const data = await api('GET', '/admin/users/' + userId + '/activity');
      if (title && data.user) {
        title.textContent = '📊 لاگ فعالیت: ' + App.escapeHtml(data.user.first_name || 'کاربر') + ' (' + data.user.telegram_user_id + ')';
      }

      let html = '<div style="display:flex; flex-direction:column; gap:16px;">';

      // User summary info
      html += '<div class="admin-modal-summary-box">' +
        '<div>📅 عضویت: ' + (data.user ? data.user.created_at : '—') + '</div>' +
        '<div>🎯 تاریخ هدف آزمون: ' + (data.user && data.user.target_exam_date ? data.user.target_exam_date : 'تعیین نشده') + '</div>' +
      '</div>';

      // Events timeline
      html += '<div><h4 class="admin-modal-section-heading amber">📜 کلیک‌ها و فعالیت‌های اخیر</h4>';
      if (data.events && data.events.length > 0) {
        html += '<div style="display:flex; flex-direction:column; gap:6px;">';
        data.events.forEach(function(ev) {
          const details = ev.event_data ? ' <span style="color:var(--ink-muted); font-size:0.75rem;">(' + App.escapeHtml(ev.event_data) + ')</span>' : '';
          html += '<div class="admin-modal-row">' +
            '<div><b style="color:var(--amber);">' + ev.event_type + '</b>' + details + '</div>' +
            '<div style="font-size:0.7rem; color:var(--ink-muted);">' + ev.created_at + '</div>' +
          '</div>';
        });
        html += '</div>';
      } else {
        html += '<div class="admin-modal-empty-note">هنوز هیچ کلیکی ثبت نشده است.</div>';
      }
      html += '</div>';

      // Exam sessions history
      html += '<div><h4 class="admin-modal-section-heading ink">📝 آزمون‌های برگزارشده</h4>';
      if (data.sessions && data.sessions.length > 0) {
        html += '<div style="display:flex; flex-direction:column; gap:6px;">';
        data.sessions.forEach(function(s) {
          const statusStr = s.passed === 1 ? '<span style="color:var(--go-light);">✅ قبول</span>' : '<span style="color:var(--stop-light);">❌ مردود</span>';
          html += '<div class="admin-modal-row">' +
            '<div> حالت <b>' + s.mode + '</b> | نمره: <b>' + (s.score || 0) + '</b> | ' + statusStr + '</div>' +
            '<div style="font-size:0.7rem; color:var(--ink-muted);">' + s.started_at + '</div>' +
          '</div>';
        });
        html += '</div>';
      } else {
        html += '<div class="admin-modal-empty-note">هنوز آزمونی برگزار نشده است.</div>';
      }
      html += '</div>';

      // OpenAI API logs
      html += '<div><h4 class="admin-modal-section-heading stop">💰 فراخوانی‌های API هوش مصنوعی</h4>';
      if (data.apiLogs && data.apiLogs.length > 0) {
        html += '<div style="display:flex; flex-direction:column; gap:6px;">';
        data.apiLogs.forEach(function(apiLog) {
          html += '<div class="admin-modal-row">' +
            '<div><b>' + apiLog.action + '</b> <span style="font-size:0.72rem; color:var(--ink-muted);">(' + apiLog.prompt_tokens + ' p / ' + apiLog.completion_tokens + ' c)</span></div>' +
            '<div style="color:var(--stop-light); font-weight:700;">$' + apiLog.estimated_cost_usd.toFixed(4) + '</div>' +
          '</div>';
        });
        html += '</div>';
      } else {
        html += '<div class="admin-modal-empty-note">فراخوانی API هوش مصنوعی برای این کاربر ثبت نشده است.</div>';
      }
      html += '</div>';

      html += '</div>';
      content.innerHTML = html;
    } catch (err) {
      content.innerHTML = '<div class="admin-modal-error">خطا در دریافت اطلاعات کاربر</div>';
    }
  };

  App.closeAdminUserModal = function() {
    const modal = document.getElementById('admin-user-modal');
    if (modal) modal.style.display = 'none';
  };

  /**
   * Free-trial countdown. Driven by the X-Trial-Ms-Left response header, which
   * the API sets only while a trial is running — approved/paid users get no
   * header and therefore no banner. Passing null removes it.
   */
  App.renderTrialBanner = function(msLeftRaw) {
    var el = document.getElementById('trial-banner');
    var ms = msLeftRaw === null || msLeftRaw === undefined ? NaN : Number(msLeftRaw);

    if (!isFinite(ms) || ms <= 0) {
      if (el) el.remove();
      return;
    }

    if (!el) {
      var root = document.getElementById('app-root');
      if (!root) return;
      el = document.createElement('div');
      el.id = 'trial-banner';
      el.className = 'trial-banner';
      root.insertBefore(el, root.firstChild);
    }

    // Under an hour, minutes are the honest unit — "۱ ساعت" for 3 minutes left
    // reads as more runway than the user actually has.
    var hours = Math.ceil(ms / 3600000);
    var label = hours > 1
      ? hours.toLocaleString('fa-IR') + ' ساعت'
      : Math.max(1, Math.ceil(ms / 60000)).toLocaleString('fa-IR') + ' دقیقه';

    el.innerHTML = '<span aria-hidden="true">🎁</span> دوره آزمایشی رایگان — <b>' +
      label + '</b> باقی مانده';
  };

  App.showPendingScreen = function(msg) {
    document.querySelectorAll('.screen').forEach(function(s) {
      s.classList.remove('active');
      s.style.display = 'none';
    });
    const pendingScreen = document.getElementById('screen-pending');
    if (pendingScreen) {
      pendingScreen.style.display = 'flex';
      pendingScreen.classList.add('active');
    }
    const msgEl = document.getElementById('pending-msg');
    if (msgEl && msg) msgEl.textContent = msg;
    const nav = document.getElementById('bottom-nav');
    if (nav) nav.style.display = 'none';
    state.currentScreen = 'pending';
    App.syncTelegramBackButton();
    App.refreshSupportBadge();
  };

  App.checkApprovalStatus = async function() {
    try {
      await App.loadHome();
      const nav = document.getElementById('bottom-nav');
      if (nav) nav.style.display = 'flex';
      App.showScreen('home');
      App.toast('دسترسی شما با موفقیت تایید شد! 🎉');
    } catch(e) {
      App.toast('هنوز در انتظار تایید مدیریت است ⏳');
    }
  };

  App.submitFunAnswer = async function() {
    const inputEl = document.getElementById('fun-custom-answer-input');
    const val = inputEl ? inputEl.value.trim() : '';
    const btn = document.getElementById('btn-submit-fun');

    if (btn) {
      btn.disabled = true;
      btn.textContent = '⏳ در حال ارسال…';
    }

    try {
      await fetch('/api/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Telegram-InitData': window.Telegram?.WebApp?.initData || '' },
        body: JSON.stringify({ funAnswer: val || 'آره خیلی زیاد!' }),
      });
      const rewardBox = document.getElementById('fun-reward-box');
      if (rewardBox) rewardBox.style.display = 'block';
      if (btn) btn.textContent = 'پاسخ ارسال شد ✓';
      App.toast('درخواست شما برای پشتیبانی ارسال شد! 💌');
    } catch (e) {
      App.toast('پاسخ شما ثبت گردید ✓');
    }
  };

  // ── Support thread (user side) ──────────────────────────────────────────────
  // Uses its own fetch rather than api(): /api/support sits outside the approval
  // gate on purpose, so a pending, trial-expired or blocked user can still reach
  // the admin.
  async function supportApi(method, body, path) {
    const opts = {
      method: method,
      headers: { 'Content-Type': 'application/json', 'X-Telegram-InitData': initData },
    };
    if (body !== undefined) opts.body = JSON.stringify(body);
    const res = await fetch('/api/support' + (path || ''), opts);
    if (!res.ok) {
      const err = await res.json().catch(function() { return {}; });
      throw new Error(err.error || 'ارتباط با پشتیبانی برقرار نشد');
    }
    return res.json();
  }

  App.openSupport = function() {
    // Read before showScreen() overwrites it — this is how the back button
    // knows to return a pending user to the pending screen.
    state.supportFrom = state.currentScreen;
    App.showScreen('support');
  };

  App.closeSupport = function() {
    if (state.supportFrom === 'pending') {
      App.showPendingScreen();
      return;
    }
    App.showScreen(state.supportFrom || 'home', 'back');
  };

  /**
   * Shared thread renderer. `side` is who is looking:
   * for the user, their own messages are 'in'; for the admin, 'out'.
   */
  App.renderSupportThread = function(box, messages, side, peerName) {
    if (!box) return;
    if (!messages || messages.length === 0) {
      box.innerHTML = '<div class="support-empty">' +
        (side === 'admin'
          ? 'هنوز پیامی بین شما و این کاربر رد و بدل نشده. اولین پیام را بنویسید.'
          : 'هنوز پیامی ندارید. سوال یا مشکل خود را بنویسید — پاسخ را همین‌جا و در چت ربات دریافت می‌کنید.') +
        '</div>';
      return;
    }

    var html = '';
    messages.forEach(function(m) {
      var mine = side === 'admin' ? m.direction === 'out' : m.direction === 'in';
      var who = m.direction === 'out'
        ? (side === 'admin' ? 'پشتیبانی (شما)' : 'پشتیبانی')
        : (side === 'admin' ? (peerName || 'کاربر') : 'شما');
      var when = App.relativeTime(m.createdAt) || '';
      html += '<div class="support-bubble ' + (mine ? 'mine' : 'theirs') + '">' +
        '<div class="support-bubble-meta">' + App.escapeHtml(who) +
          (when ? ' · ' + App.escapeHtml(when) : '') + '</div>' +
        // Newlines survive via white-space: pre-wrap — no <br> injection needed.
        '<div class="support-bubble-body">' + App.escapeHtml(m.body) + '</div>' +
      '</div>';
    });
    box.innerHTML = html;
    box.scrollTop = box.scrollHeight;
  };

  App.loadSupport = async function() {
    var box = document.getElementById('support-thread');
    if (!box) return;
    try {
      var data = await supportApi('GET');
      App.renderSupportThread(box, data.messages || [], 'user');
      App.setSupportBadge(0); // opening the thread marks replies read server-side
    } catch (e) {
      box.innerHTML = '<div class="support-empty">دریافت گفتگو ناموفق بود. اتصال اینترنت را بررسی کنید.</div>';
    }
  };

  App.sendSupportMessage = async function(e) {
    if (e && e.preventDefault) e.preventDefault();
    var input = document.getElementById('support-input');
    var btn = document.getElementById('support-send-btn');
    var text = input ? input.value.trim() : '';
    if (!text) return;

    if (btn) { btn.disabled = true; btn.textContent = '⏳'; }
    try {
      await supportApi('POST', { text: text });
      if (input) input.value = '';
      await App.loadSupport();
      App.toast('پیام شما برای پشتیبانی ارسال شد 🙏');
    } catch (err) {
      App.toast(err.message || 'ارسال پیام ناموفق بود');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = 'ارسال'; }
    }
  };

  App.setSupportBadge = function(count) {
    ['profile-support-badge', 'pending-support-badge'].forEach(function(id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.textContent = count > 0 ? String(count) : '';
      el.hidden = !(count > 0);
    });
  };

  App.refreshSupportBadge = function() {
    supportApi('GET', undefined, '/unread')
      .then(function(d) { App.setSupportBadge(d.unread || 0); })
      .catch(function() {});
  };

  App.currentBackAction = function() {
    return App.resolveBackNavigation(state.currentScreen, {
      supportFrom: state.supportFrom,
      examReturnScreen: state.examReturnScreen,
    });
  };

  App.syncTelegramBackButton = function() {
    const backButton = tg && tg.BackButton;
    if (!backButton) return;
    const action = App.currentBackAction();
    try {
      if (action.kind === 'none') backButton.hide();
      else backButton.show();
    } catch (e) {}
  };

  App.handleBackNavigation = function() {
    const action = App.currentBackAction();
    if (action.kind === 'none') return;
    if (action.kind === 'close-support') {
      App.closeSupport();
      return;
    }
    if (action.kind === 'exit-exam') {
      if (typeof App.exitExam === 'function') App.exitExam();
      return;
    }
    if (action.target === 'pending') {
      App.showPendingScreen();
      return;
    }
    App.showScreen(action.target || 'home', 'back');
  };

  // Compatibility for older inline handlers and one native Telegram control.
  App.navigateBack = App.handleBackNavigation;
  if (tg && tg.BackButton && typeof tg.BackButton.onClick === 'function') {
    tg.BackButton.onClick(App.handleBackNavigation);
  }

  // ── Toast ───────────────────────────────────────────────────────────────────
  App.toast = function(msg, duration) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), duration || 2500);
  };

  App.showGuideModal = function() {
    const modal = document.getElementById('modal-guide');
    if (modal) modal.style.display = 'flex';
  };

  App.closeGuideModal = function() {
    const modal = document.getElementById('modal-guide');
    if (modal) modal.style.display = 'none';
    try {
      localStorage.setItem('patente_guide_seen', 'true');
    } catch(e) {}
  };

  // ── 25 Chapters (Capitoli 1–25) ──────────────────────────────────────────────
  state.allTopics = [];

  App.loadTopics = async function() {
    try {
      const data = await api('GET', '/topics');
      state.allTopics = data.topics || [];
      App.renderTopics(state.allTopics);
    } catch(e) {
      App.toast('خطا در دریافت لیست فصل‌های آموزشی');
    }
  };

  App.renderTopics = function(list) {
    const container = document.getElementById('topics-list-container');
    if (!container) return;

    if (!list || list.length === 0) {
      container.innerHTML = '<div class="topics-empty-note">فصلی یافت نشد.</div>';
      return;
    }

    let html = '';
    // Hide topics that have no questions (safety-net placeholders like topic 25/13)
    const visible = list.filter(function(t) { return (t.question_count || 0) > 0; });
    if (visible.length === 0) {
      container.innerHTML = '<div class="topics-empty-note">فصلی یافت نشد.</div>';
      return;
    }
    visible.forEach(function(t) {
      const accStr = t.accuracy !== null ? (t.accuracy + '% دقت') : 'شروع‌نشده';
      const accClass = t.accuracy === null ? 'muted' : (t.accuracy >= 70 ? 'go' : 'stop');
      const qCount = t.question_count || 0;
      // Distinct questions seen, not attempts — re-answering one shouldn't look
      // like progress through the chapter.
      const answered = t.answered_count || 0;
      const remaining = t.remaining_count != null ? t.remaining_count : Math.max(0, qCount - answered);

      html += '<div class="topic-card">';
      html += '  <div class="topic-card-row">';
      html += '    <div>';
      html += '      <span class="topic-chapter-badge">فصل ' + t.sort_order + '</span>';
      html += '      <div class="topic-name-it">' + App.escapeHtml(t.name_it) + '</div>';
      html += '      <div class="topic-name-fa">' + App.escapeHtml(t.name_fa || '') + '</div>';
      html += '      <div class="topic-progress">';
      html += '        <span class="topic-progress-done">✅ ' + answered + ' پاسخ‌داده</span>';
      html += '        <span class="topic-progress-left"> • ⏳ ' + remaining + ' باقی‌مانده</span>';
      html += '      </div>';
      html += '    </div>';
      html += '    <div class="topic-acc-block">';
      html += '      <div class="topic-acc-value ' + accClass + '">' + accStr + '</div>';
      html += '      <div class="topic-qcount">🌐 ' + qCount + ' سوال</div>';
      html += '    </div>';
      html += '  </div>';

      html += '  <div class="topic-card-actions">';
      html += '    <button type="button" class="btn btn-primary btn-sm btn-full" onclick="App.startTopicExam(' + t.id + ')">✍️ شروع آزمون این فصل (۱۵ سوال)</button>';
      html += '  </div>';
      html += '</div>';
    });

    container.innerHTML = html;
  };

  App.filterTopics = function() {
    const input = document.getElementById('topics-search-input');
    const q = (input ? input.value : '').trim().toLowerCase();
    if (!q) {
      App.renderTopics(state.allTopics);
      return;
    }
    const filtered = state.allTopics.filter(function(t) {
      if ((t.question_count || 0) === 0) return false;
      return (t.name_it && t.name_it.toLowerCase().includes(q)) ||
             (t.name_fa && t.name_fa.toLowerCase().includes(q)) ||
             (String(t.sort_order) === q);
    });
    App.renderTopics(filtered);
  };

  App.startTopicExam = async function(topicId) {
    const returnScreen = state.currentScreen || 'topics';
    try {
      App.toast('در حال لود آزمون فصل… ⏳');
      const data = await api('POST', '/topics/' + topicId + '/exam');
      state.sessionId = data.sessionId;
      state.questions = data.questions || [];
      state.currentIndex = 0;
      state.answers = {};
      state.flags = new Set();
      state.startedAt = Date.now();
      state.secondsLeft = 600; // 10 minutes for 15 chapter questions
      state.examMode = 'topic_practice';
      state.examReturnScreen = returnScreen;

      App.showScreen('exam');
      const nav = document.getElementById('bottom-nav');
      if (nav) nav.style.display = 'none';
      App.applyExamMode();
      App.renderExamTabs();
      App.renderQuestion();
      App.startTimer();
    } catch(e) {
      App.toast(e.message || 'خطا در شروع آزمون فصل');
    }
  };

  // ── Home ────────────────────────────────────────────────────────────────────
  App.loadHome = async function() {
    // Show guide modal automatically on first visit
    try {
      if (!localStorage.getItem('patente_guide_seen')) {
        setTimeout(function() { App.showGuideModal(); }, 600);
      }
    } catch(e) {}

    // 1. Populate user info from Telegram WebApp
    let tgUser = null;
    try {
      tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    } catch(e) {}

    const firstName = tgUser?.first_name || 'کاربر پاتنته';
    const lastName = tgUser?.last_name || '';
    const fullName = (firstName + ' ' + lastName).trim();
    const username = tgUser?.username ? '@' + tgUser.username : (tgUser?.id ? '🆔 ' + tgUser.id : '');
    const photoUrl = tgUser?.photo_url || '';

    const nameEl = document.getElementById('user-full-name');
    if (nameEl) nameEl.textContent = fullName;

    const unameEl = document.getElementById('user-username');
    if (unameEl) unameEl.textContent = username;

    const photoEl = document.getElementById('user-photo');
    const initialsEl = document.getElementById('user-initials-avatar');
    if (photoUrl && photoEl) {
      photoEl.src = photoUrl;
      photoEl.style.display = 'block';
      if (initialsEl) initialsEl.style.display = 'none';
    } else if (initialsEl) {
      if (photoEl) photoEl.style.display = 'none';
      initialsEl.style.display = 'flex';
      const initials = (firstName.charAt(0) + (lastName ? lastName.charAt(0) : '')).toUpperCase() || '👤';
      initialsEl.textContent = initials;
    }

    App.refreshSupportBadge();

    // 2. Fetch stats & user profile from backend
    try {
      const data = await api('GET', '/stats');
      document.getElementById('streak-value').textContent = data.streak || 0;
      document.getElementById('home-days').textContent =
        data.daysToExam !== null ? data.daysToExam + ' روز' : 'تعیین نشده';
      document.getElementById('home-review').textContent = data.reviewCount || 0;

      const passRateEl = document.getElementById('home-pass-rate');
      if (passRateEl) passRateEl.textContent = data.passRate !== null ? data.passRate + '٪' : '—';

      const totalExamsEl = document.getElementById('home-total-exams');
      if (totalExamsEl) totalExamsEl.textContent = (data.totalSessions || 0) + ' آزمون';

      if (data.reviewCount > 0) {
        document.getElementById('btn-start-review').style.display = '';
      } else {
        document.getElementById('btn-start-review').style.display = 'none';
      }

      // Weak-topic focus card
      if (data.weakestTopic && data.totalSessions > 0) {
        const card = document.getElementById('home-focus-card');
        card.style.display = '';
        const pct = Math.round(data.weakestTopic.accuracy * 100);
        document.getElementById('home-weakest').textContent =
          data.weakestTopic.name_it + ' — ' + pct + '% درست';
      } else {
        const card = document.getElementById('home-focus-card');
        if (card) card.style.display = 'none';
      }

      // Recent sessions
      if (Array.isArray(data.recentSessions) && data.recentSessions.length > 0) {
        const sec = document.getElementById('home-recent-section');
        const list = document.getElementById('home-recent-list');
        if (sec && list) {
          sec.style.display = 'block';
          let html = '';
          data.recentSessions.slice(0, 3).forEach(function(s) {
            const isPass = s.passed;
            const badgeClass = isPass ? 'pass' : 'fail';
            const badgeText = isPass ? 'قبول 🟢' : 'مردود 🔴';
            const modeText = s.mode === 'exam' ? '🚗 شبیه‌ساز ۳۰ سوالی' : '🎯 تمرین موضوعی';
            const scoreText = (s.score !== null ? s.score : (30 - (s.wrongCount || 0))) + ' / ۳۰';
            html += '<div class="home-recent-row">' +
              '<div><div class="home-recent-mode">' + modeText + '</div><div class="home-recent-score">امتیاز: ' + scoreText + '</div></div>' +
              '<span class="home-recent-badge ' + badgeClass + '">' + badgeText + '</span>' +
              '</div>';
          });
          list.innerHTML = html;
        }
      } else {
        const sec = document.getElementById('home-recent-section');
        if (sec) sec.style.display = 'none';
      }

      // Admin check — enable admin features if user is admin
      api('GET', '/admin/overview').then(function() {
        const adminNav = document.getElementById('nav-admin');
        const adminBtn = document.getElementById('btn-admin-panel');
        if (adminNav) adminNav.style.display = 'flex';
        if (adminBtn) adminBtn.style.display = 'flex';
      }).catch(function() {});
    } catch (e) {
      // First run — no stats yet
    }
  };

  App.openExamDateModal = function() {
    const modal = document.getElementById('exam-date-modal');
    if (modal) modal.style.display = 'flex';
  };

  App.closeExamDateModal = function() {
    const modal = document.getElementById('exam-date-modal');
    if (modal) modal.style.display = 'none';
  };

  App.saveExamTargetDate = async function() {
    const dateInput = document.getElementById('exam-date-input');
    const val = dateInput ? dateInput.value : '';
    if (!val) {
      App.toast('لطفاً یک تاریخ معتبر انتخاب کنید.');
      return;
    }
    try {
      await api('POST', '/stats/target-date', { targetExamDate: val });
      App.toast('تاریخ آزمون ذخیره شد! 📅');
      App.closeExamDateModal();
      App.loadHome();
    } catch(e) {
      App.toast('خطا در ذخیره تاریخ: ' + e.message);
    }
  };


  // ── Vocab ────────────────────────────────────────────────────────────────────
  App.loadVocab = async function() {
    try {
      const data = await api('GET', '/vocab');
      state.vocabItems = data.items || [];
      state.dueVocab = state.vocabItems.filter(i => i.isDue);
      state.dueVocabIndex = 0;
      state.vocabFlipped = false;

      if (state.dueVocab.length > 0) {
        document.getElementById('vocab-due-section').style.display = '';
        document.getElementById('vocab-due-count').textContent = state.dueVocab.length;
        App.showDueVocab();
      } else {
        document.getElementById('vocab-due-section').style.display = 'none';
      }

      const list = document.getElementById('vocab-list');
      list.innerHTML = '';

      if (state.vocabItems.length === 0) {
        list.innerHTML = '<div class="vocab-empty-note">هنوز لغتی ذخیره نکردی — از یه سؤال شروع کن</div>';
        return;
      }

      state.vocabItems.forEach(function(item) {
        const el = document.createElement('div');
        el.className = 'card-sm';
        el.style.marginBottom = '8px';
        el.innerHTML =
          '<div class="ltr vocab-item-it">' + App.escapeHtml(item.term_it) + '</div>' +
          '<div class="fa-text vocab-item-fa">' + App.escapeHtml(item.term_fa) + '</div>';
        list.appendChild(el);
      });
    } catch (e) {
      App.toast('خطا: ' + e.message);
    }
  };

  App.showDueVocab = function() {
    const item = state.dueVocab[state.dueVocabIndex];
    if (!item) return;
    state.vocabFlipped = false;
    document.getElementById('vocab-flip-card').classList.remove('flipped');
    document.getElementById('vocab-front-text').textContent = item.term_it;
    document.getElementById('vocab-back-text').textContent = item.term_fa;
  };

  App.flipVocab = function() {
    state.vocabFlipped = !state.vocabFlipped;
    document.getElementById('vocab-flip-card').classList.toggle('flipped', state.vocabFlipped);
  };

  App.vocabReview = async function(correct) {
    const item = state.dueVocab[state.dueVocabIndex];
    if (!item) return;
    try {
      await api('POST', '/vocab/' + item.id + '/review', {
        correct, currentIntervalDays: item.interval_days || 1,
      });
    } catch (e) {}
    state.dueVocabIndex++;
    if (state.dueVocabIndex < state.dueVocab.length) {
      App.showDueVocab();
    } else {
      document.getElementById('vocab-due-section').style.display = 'none';
      App.toast('مرور تموم شد! 🎉');
    }
  };

  App.suggestVocab = async function() {
    const term = document.getElementById('vocab-it-input').value.trim();
    if (!term) { App.toast('یه لغت ایتالیایی بنویس'); return; }
    try {
      const data = await api('POST', '/vocab/suggest', { termIt: term });
      document.getElementById('vocab-fa-input').value = data.suggestion || '';
    } catch (e) {
      App.toast('خطا در پیشنهاد ترجمه — دوباره امتحان کن');
    }
  };

  App.saveVocab = async function() {
    const termIt = document.getElementById('vocab-it-input').value.trim();
    const termFa = document.getElementById('vocab-fa-input').value.trim();
    if (!termIt || !termFa) { App.toast('هر دو فیلد رو پر کن'); return; }
    try {
      await api('POST', '/vocab', { termIt, termFa });
      document.getElementById('vocab-it-input').value = '';
      document.getElementById('vocab-fa-input').value = '';
      App.toast('ذخیره شد ✓');
      App.loadVocab();
    } catch (e) {
      App.toast('خطا: ' + e.message);
    }
  };

  // ── Stats ────────────────────────────────────────────────────────────────────
  App.loadStats = async function() {
    try {
      const data = await api('GET', '/stats');
      document.getElementById('stats-streak').textContent = data.streak || 0;
      document.getElementById('stats-sessions').textContent = data.totalSessions || 0;
      document.getElementById('stats-pass-rate').textContent =
        data.passRate !== null ? data.passRate + '%' : '—';

      const bars = document.getElementById('stats-topic-bars');
      bars.innerHTML = '';

      if (!data.topicAccuracy?.length) {
        bars.innerHTML = '<div style="color:var(--ink-muted);font-size:0.9rem;padding:8px 0;">هنوز آزمونی نداده‌ای — برو امتحان بده!</div>';
        return;
      }

      (data.topicAccuracy || []).forEach(function(t) {
        const pct = Math.round(t.accuracy * 100);
        const cls = pct >= 80 ? 'good' : pct >= 60 ? 'medium' : 'poor';
        const row = document.createElement('div');
        row.className = 'stat-bar-row';
        row.innerHTML =
          '<div style="font-size:0.75rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--ink-muted);" dir="ltr">' + t.name_it + '</div>' +
          '<div class="stat-bar-track"><div class="stat-bar-fill ' + cls + '" style="width:' + pct + '%"></div></div>' +
          '<div style="font-size:0.78rem;font-weight:700;text-align:left;" dir="ltr">' + pct + '%</div>';
        bars.appendChild(row);
      });
    } catch (e) {}
  };

  // ── Profile & Analysis screen (\u00a713) ──────────────────────────────────────────

  App.loadProfile = async function() {
    try {
      const data = await api('GET', '/profile');

      // Header: name + username
      var name = data.user && data.user.firstName ? data.user.firstName : 'کاربر';
      var username = data.user && data.user.username ? '@' + data.user.username : '';
      document.getElementById('profile-name').textContent = name;
      document.getElementById('profile-username').textContent = username;

      // Level / XP
      document.getElementById('profile-level').textContent = data.level || 0;
      var xpPct = Math.min(100, Math.round((data.xpInLevel / data.xpForNextLevel) * 100));
      document.getElementById('profile-xp-fill').style.width = xpPct + '%';
      document.getElementById('profile-xp-label').textContent = (data.xp || 0).toLocaleString() + ' XP';
      document.getElementById('profile-xp-detail').textContent =
        data.xpInLevel + ' از ' + data.xpForNextLevel + ' XP تا سطح ' + ((data.level || 0) + 1);

      // Stat row
      var stats = data.stats || {};
      document.getElementById('profile-streak').textContent = stats.streak || 0;
      document.getElementById('profile-exams').textContent = stats.examsFinished || 0;
      var cov = stats.bankCoverage || {};
      document.getElementById('profile-coverage-pct').textContent = (cov.pct || 0) + '%';
      document.getElementById('profile-vocab').textContent = stats.vocabLearned || 0;

      // Coverage bar
      var fillPct = Math.min(100, cov.pct || 0);
      setTimeout(function() {
        document.getElementById('profile-coverage-fill').style.width = fillPct + '%';
      }, 80);
      document.getElementById('profile-coverage-label').textContent =
        (cov.seen || 0).toLocaleString() + ' از ' + (cov.total || 7139).toLocaleString();
      document.getElementById('profile-coverage-sub').textContent =
        'از ' + (cov.total || 7139).toLocaleString() + ' سوال بانک دیده‌ای — ' +
        (cov.seenMoreThanOnce || 0).toLocaleString() + ' سوال را بیش از یک‌بار دیده‌ای';

      // Needs-more-work list
      var nmwList = document.getElementById('profile-nmw-list');
      nmwList.innerHTML = '';
      if (!data.needsMoreWork || data.needsMoreWork.length === 0) {
        nmwList.innerHTML = '<div style="color:var(--go);font-size:0.85rem;text-align:center;padding:12px 0;">👏 عالی! هیچ سوالی با اشتباه مکرر نداری</div>';
      } else {
        data.needsMoreWork.forEach(function(item) {
          var wrongPct = Math.round((item.wrongRate || 0) * 100);
          var cls = wrongPct >= 70 ? 'var(--stop)' : 'var(--amber)';
          var row = document.createElement('div');
          row.className = 'nmw-row';
          row.setAttribute('role', 'button');
          row.setAttribute('tabindex', '0');
          row.onclick = function() { App.startFocusedReview(item.questionId); };
          row.innerHTML =
            '<span class="nmw-badge">' + item.wrongCount + '✗</span>' +
            '<span class="nmw-text" dir="ltr">' + App.escapeHtml(item.textIt.slice(0, 90)) + (item.textIt.length > 90 ? '…' : '') + '</span>' +
            '<span style="flex-shrink:0;font-size:0.72rem;font-weight:700;color:' + cls + ';">' + wrongPct + '%</span>';
          nmwList.appendChild(row);
        });
      }

      // Per-topic accuracy chart (worst-first — already sorted by API)
      var chart = document.getElementById('profile-topic-chart');
      chart.innerHTML = '';
      if (!data.topicAccuracy || data.topicAccuracy.length === 0) {
        chart.innerHTML = '<div style="color:var(--ink-muted);font-size:0.85rem;text-align:center;padding:12px 0;">هنوز آزمونی نداده‌ای</div>';
      } else {
        data.topicAccuracy.forEach(function(t) {
          var pct = Math.round((t.accuracy || 0) * 100);
          var cls = pct >= 80 ? 'good' : pct >= 60 ? 'medium' : 'poor';
          var row = document.createElement('div');
          row.className = 'topic-acc-row';
          row.innerHTML =
            '<div class="ta-name" dir="ltr" title="' + App.escapeHtml(t.name_it || '') + '">' + App.escapeHtml(t.name_it || '—') + '</div>' +
            '<div class="ta-track"><div class="ta-fill ' + cls + '" style="width:' + pct + '%;"></div></div>' +
            '<div class="ta-pct">' + pct + '%</div>';
          chart.appendChild(row);
        });
      }

      // Score trend sparkline
      App._renderSparkline(data.scoreTrend || []);

    } catch (e) {
      console.error('loadProfile error', e);
    }
  };

  App._renderSparkline = function(trend) {
    var line   = document.getElementById('sparkline-line');
    var dot    = document.getElementById('sparkline-dot');
    var empty  = document.getElementById('sparkline-empty');
    var passLn = document.getElementById('sparkline-pass-line');
    var minLbl = document.getElementById('sparkline-min-label');
    var maxLbl = document.getElementById('sparkline-max-label');
    var rng    = document.getElementById('profile-trend-range');

    if (!trend || trend.length === 0) {
      if (line)  line.setAttribute('points', '');
      if (dot)   { dot.setAttribute('cx', '-9'); dot.setAttribute('cy', '-9'); }
      if (empty) empty.style.display = '';
      if (passLn){ passLn.setAttribute('y1',''); passLn.setAttribute('y2',''); }
      if (rng)   rng.textContent = '';
      return;
    }
    if (empty) empty.style.display = 'none';

    // Viewbox is 300x80
    var W = 300, H = 80, pad = 8;
    var scores = trend.map(function(s) { return s.score !== null && s.score !== undefined ? s.score : 0; });
    var minS = Math.max(0, Math.min.apply(null, scores) - 1);
    var maxS = Math.min(30, Math.max.apply(null, scores) + 1);
    var range = maxS - minS || 1;

    function toX(i) { return pad + (i / Math.max(trend.length - 1, 1)) * (W - 2 * pad); }
    function toY(s) { return H - pad - ((s - minS) / range) * (H - 2 * pad); }

    // Pass line at score=27
    var passY = toY(27);
    if (passLn) {
      passLn.setAttribute('y1', passY.toFixed(1));
      passLn.setAttribute('y2', passY.toFixed(1));
    }

    // Build points string
    var pts = trend.map(function(s, i) {
      return toX(i).toFixed(1) + ',' + toY(s.score || 0).toFixed(1);
    }).join(' ');
    if (line) line.setAttribute('points', pts);

    // Latest point dot
    var last = trend[trend.length - 1];
    var lx = toX(trend.length - 1), ly = toY(last.score || 0);
    if (dot) { dot.setAttribute('cx', lx.toFixed(1)); dot.setAttribute('cy', ly.toFixed(1)); }

    // Labels
    var minVal = Math.min.apply(null, scores);
    var maxVal = Math.max.apply(null, scores);
    if (minLbl) minLbl.textContent = 'کمترین: ' + minVal + '/30';
    if (maxLbl) maxLbl.textContent = 'بیشترین: ' + maxVal + '/30';
    if (rng) rng.textContent = trend.length + ' آزمون';
  };

  // Focused review: starts a review-mode session filtered toward a specific question
  App.startFocusedReview = async function(questionId) {
    App.toast('در حال شروع مرور هدفمند…');
    try {
      // Piggyback on the existing startReview flow — the review_queue will
      // include this question if it's been marked wrong. We navigate to review.
      App.showScreen('home');
      App.startReview();
    } catch (e) {
      App.toast('خطا در شروع مرور');
    }
  };

  // ── Road-sign flashcard mode ─────────────────────────────────────────────────
  // SRS state in localStorage: JSON map of imageUrl → {interval, nextDate}.
  // §20.2: keyed by sign, not by question. The old 'signs_srs' key mapped
  // questionId → schedule back when the deck was one card per exam statement;
  // those keys mean nothing now that a card is a sign, so this uses a new key
  // rather than silently misreading the old schedule.
  function getSignsSRS() {
    try { return JSON.parse(localStorage.getItem('signs_srs_v2') || '{}'); } catch (e) { return {}; }
  }
  function saveSignsSRS(srs) {
    try { localStorage.setItem('signs_srs_v2', JSON.stringify(srs)); } catch (e) {}
  }
  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  App.loadSigns = async function() {
    // Signs guide collapse memory — remember user's preference
    var guideEl = document.getElementById('signs-guide-details');
    if (guideEl) {
      var guideClosed = localStorage.getItem('patentefa_signs_guide_closed');
      if (guideClosed === '1') guideEl.removeAttribute('open');
      guideEl.ontoggle = function() {
        localStorage.setItem('patentefa_signs_guide_closed', guideEl.open ? '0' : '1');
      };
    }

    // Fetch the sign deck if not yet loaded
    if (state.allSigns.length === 0) {
      try {
        const data = await api('GET', '/signs');
        state.allSigns = data.signs || [];
      } catch (e) {
        // Fallback: show a helpful message
        document.getElementById('signs-empty').style.display = '';
        document.getElementById('signs-flip-card').style.display = 'none';
        document.querySelector('#screen-signs > div > div:last-of-type[style*="gap"]') &&
          (document.querySelector('#screen-signs .btn-signs-known').closest('div').style.display = 'none');
        App.toast('برای استفاده از تابلوها ابتدا یک آزمون بده');
        return;
      }
    }

    const srs = getSignsSRS();
    const today = todayISO();

    // Queue: signs due today (nextDate <= today or not set)
    const due = state.allSigns.filter(function(s) {
      const entry = srs[s.imageUrl];
      if (!entry) return true; // never seen
      return entry.nextDate <= today;
    });

    if (due.length === 0) {
      document.getElementById('signs-empty').style.display = '';
      document.getElementById('signs-flip-card').style.display = 'none';
      document.getElementById('signs-counter').textContent = '';
      return;
    }

    // Shuffle
    for (let i = due.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [due[i], due[j]] = [due[j], due[i]];
    }

    state.signsQueue = due;
    state.signsIndex = 0;
    state.signsFlipped = false;

    document.getElementById('signs-empty').style.display = 'none';
    document.getElementById('signs-flip-card').style.display = '';
    App.showCurrentSign();
  };

  App.showCurrentSign = function() {
    const sign = state.signsQueue[state.signsIndex];
    if (!sign) return;

    state.signsFlipped = false;
    document.getElementById('signs-flip-card').classList.remove('flipped');

    const img = document.getElementById('signs-img');
    img.src = sign.imageUrl || '';

    // Back face: the sign's name and what it means. Comes straight from the
    // reviewed sign_meanings table — no translation call, nothing lazy (§20.3).
    document.getElementById('signs-name-it').textContent = sign.nameIt || '';
    document.getElementById('signs-name-fa').textContent = sign.nameFa || '';
    document.getElementById('signs-meaning-fa').textContent = sign.meaningFa || '';

    App.fitSignCard();

    const total = state.signsQueue.length;
    const idx = state.signsIndex + 1;
    document.getElementById('signs-counter').textContent = idx + ' / ' + total;

    // Progress bar
    const pct = ((idx - 1) / total) * 100;
    document.getElementById('signs-srs-bar').style.width = pct + '%';
  };

  // Grow the card to fit the back face. The faces are absolutely positioned (the
  // 3D flip needs that), so a fixed height clipped the content — a card carries
  // up to 26 true statements. Called again after each lazy Farsi translation
  // lands, since that changes the height.
  App.fitSignCard = function() {
    const card = document.getElementById('signs-flip-card');
    const back = card && card.querySelector('.flip-back');
    if (!back) return;
    // scrollHeight leaves out the bottom padding when the content overflows, so
    // add it back — otherwise the last statement sits on the card's border.
    const padBottom = parseFloat(getComputedStyle(back).paddingBottom) || 0;
    // Reset to the floor first: the back face is inset:0, so its scrollHeight can
    // never report less than the card's current height — without this, a card
    // that grew for a long sign would stay tall for every short one after.
    card.style.height = '260px';
    // Then two passes: applying a height re-lays out the flex column and changes
    // what it reports, so one pass left the tallest cards short.
    // Reading scrollHeight flushes layout, so the second pass sees the new value.
    for (var i = 0; i < 2; i++) {
      card.style.height = Math.max(260, back.scrollHeight + padBottom) + 'px';
    }
  };

  // §20.3: no lazy fetch here any more. The name and meaning ship with the deck
  // from /api/signs, so flipping is instant and costs nothing.
  App.flipSign = function() {
    state.signsFlipped = !state.signsFlipped;
    document.getElementById('signs-flip-card').classList.toggle('flipped', state.signsFlipped);
  };

  App.signsReview = function(correct) {
    const sign = state.signsQueue[state.signsIndex];
    if (!sign) return;

    const srs = getSignsSRS();
    const entry = srs[sign.imageUrl] || { interval: 1 };

    const newInterval = correct
      ? Math.min(entry.interval * 2, 64) // double, cap at 64 days
      : 1;                                // reset on miss

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + newInterval);

    srs[sign.imageUrl] = {
      interval: newInterval,
      nextDate: nextDate.toISOString().slice(0, 10),
    };
    saveSignsSRS(srs);

    state.signsIndex++;
    if (state.signsIndex < state.signsQueue.length) {
      App.showCurrentSign();
    } else {
      // All done
      document.getElementById('signs-empty').style.display = '';
      document.getElementById('signs-flip-card').style.display = 'none';
      document.getElementById('signs-counter').textContent = '';
      App.toast('همه تابلوهای امروز رو مرور کردی! ✅');
    }
  };

  // ── Long-press-to-vocab (§12.2) ──────────────────────────────────────────────
  // Wraps every word in the given element with a tappable span.
  // Detects long-press via pointerdown → 500ms timeout, cancelled on move/up.
  App.wrapWordsForLongPress = function(el, questionId) {
    const text = el.textContent || '';
    el.textContent = ''; // clear

    // Split keeping whitespace tokens as separate text nodes between spans
    const parts = text.split(/(\s+)/);
    parts.forEach(function(part) {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        el.appendChild(document.createTextNode(part));
        return;
      }
      const span = document.createElement('span');
      span.className = 'word-tap';
      span.textContent = part;

      let timer = null;

      span.addEventListener('pointerdown', function(e) {
        // Only respond to primary pointer (finger / left-click)
        if (!e.isPrimary) return;
        span.classList.add('pressing');
        timer = setTimeout(function() {
          timer = null;
          span.classList.remove('pressing');
          App.openVocabSheet(part, questionId);
        }, 500);
      });

      function cancel() {
        if (timer !== null) {
          clearTimeout(timer);
          timer = null;
        }
        span.classList.remove('pressing');
      }

      span.addEventListener('pointermove', cancel);
      span.addEventListener('pointerup', cancel);
      span.addEventListener('pointercancel', cancel);
      // Prevent the browser from stealing the pointer (important in WebView)
      span.addEventListener('pointerdown', function(e) { e.preventDefault(); }, { passive: false });

      el.appendChild(span);
    });
  };

  // Opens the vocab bottom sheet, pre-fills the word, fetches a GPT suggestion.
  App.openVocabSheet = function(word, questionId) {
    state.longPressWord = word;
    state.vocabSheetQuestionId = questionId;

    document.getElementById('vocab-sheet-word-display').textContent = word;
    const faInput = document.getElementById('vocab-sheet-fa');
    faInput.value = '';
    faInput.placeholder = '⏳ در حال پیشنهاد…';

    const sheet = document.getElementById('vocab-sheet');
    sheet.classList.add('open');
    // Re-animate: remove and re-add the panel to restart the animation
    const panel = sheet.querySelector('.vocab-sheet-panel');
    panel.style.animation = 'none';
    panel.offsetHeight; // reflow
    panel.style.animation = '';

    // Fetch GPT suggestion in the background
    api('POST', '/vocab/suggest', { termIt: word })
      .then(function(data) {
        // Only populate if the sheet is still open for this word
        if (state.longPressWord === word) {
          faInput.value = data.suggestion || '';
          faInput.placeholder = 'ترجمه فارسی…';
          faInput.focus();
        }
      })
      .catch(function() {
        if (state.longPressWord === word) {
          faInput.placeholder = 'ترجمه فارسی…';
        }
      });
  };

  App.closeVocabSheet = function() {
    document.getElementById('vocab-sheet').classList.remove('open');
    state.longPressWord = null;
    state.vocabSheetQuestionId = null;
  };

  App.saveVocabFromSheet = async function() {
    const termIt = state.longPressWord;
    const termFa = document.getElementById('vocab-sheet-fa').value.trim();
    const sourceId = state.vocabSheetQuestionId;

    if (!termIt || !termFa) {
      App.toast('ترجمه فارسی رو وارد کن');
      return;
    }

    const saveBtn = document.getElementById('vocab-sheet-save-btn');
    saveBtn.textContent = '⏳';
    saveBtn.disabled = true;

    try {
      await api('POST', '/vocab', {
        termIt: termIt,
        termFa: termFa,
        sourceQuestionId: sourceId || undefined,
      });
      App.closeVocabSheet();
      App.toast('"' + termIt + '" ذخیره شد ✓');
    } catch (e) {
      App.toast('خطا: ' + e.message);
    } finally {
      saveBtn.textContent = 'ذخیره ✓';
      saveBtn.disabled = false;
    }
  };

  // ── Patente Reels (Vertical Educational Feed) ──────────────────────────────
  App.loadReels = async function() {
    if (state.reelsFeed && state.reelsFeed.length > 0) {
      return; // Already loaded initial batch
    }

    state.reelsFeed = [];
    state.reelsAnswered = {};
    state.reelsLiked = new Set();
    state.reelsLoading = true;

    const viewport = document.getElementById('reels-viewport');
    if (viewport) {
      viewport.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100dvh;color:var(--ink-muted);font-weight:600;direction:rtl;">در حال بارگذاری ریلزهای آموزشی… ⚡</div>';
    }

    try {
      const data = await api('GET', '/reels/feed?limit=20');
      state.reelsFeed = data.items || [];
      App.renderReelCards(state.reelsFeed, true);
    } catch (e) {
      if (viewport) {
        viewport.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100dvh;color:var(--danger);gap:12px;direction:rtl;"><div style="font-size:2rem;">⚠️</div><div>خطا در دریافت ریلزها</div><button class="btn btn-sm btn-ghost" onclick="App.loadReels()">تلاش مجدد</button></div>';
      }
    } finally {
      state.reelsLoading = false;
    }
  };

  App.renderReelCards = function(items, replace) {
    const viewport = document.getElementById('reels-viewport');
    if (!viewport) return;

    if (replace) {
      viewport.innerHTML = '';
    }

    items.forEach(function(item, idx) {
      const cardEl = document.createElement('div');
      cardEl.className = 'reel-card';
      cardEl.id = 'reel-card-' + item.question_id;

      const isSign = item.type === 'sign';
      const isTip = item.type === 'tip';
      const badgeClass = isSign ? 'reel-badge-sign' : isTip ? 'reel-badge-tip' : 'reel-badge-question';
      const badgeText = isSign ? '🚦 تابلو راهنمایی' : isTip ? '💡 نکته طلایی امتحانی' : '❓ تست سریع';
      const initialLikes = Math.floor(120 + (item.question_id * 17) % 850);

      let bodyHtml = '';

      if (item.image_url) {
        bodyHtml += '<div class="reel-img-container"><img src="' + item.image_url + '" class="reel-img" alt="Sign Image" /></div>';
      }

      if (isTip) {
        bodyHtml += '<div class="reel-tip-card">' +
          '<div class="reel-tip-title">' + (item.tip_title_fa || 'نکته طلایی امتحانی') + '</div>' +
          (item.tip_keyword_it ? '<span class="reel-tip-kw">' + item.tip_keyword_it + '</span>' : '') +
          '<div class="reel-text-it long-pressable" id="reel-text-it-' + item.question_id + '">' + item.text_it + '</div>' +
          '</div>';
      } else {
        bodyHtml += '<div class="reel-text-it long-pressable" id="reel-text-it-' + item.question_id + '">' + item.text_it + '</div>';
      }

      if (!isTip) {
        bodyHtml += '<div class="reel-quiz-row" id="reel-quiz-row-' + item.question_id + '">' +
          '<button class="btn-reel-quiz btn-reel-vero" onclick="App.answerReelQuestion(' + item.question_id + ', 1, ' + item.correct_answer + ')">✓ VERO (درست)</button>' +
          '<button class="btn-reel-quiz btn-reel-falso" onclick="App.answerReelQuestion(' + item.question_id + ', 0, ' + item.correct_answer + ')">✗ FALSO (نادرست)</button>' +
          '</div>' +
          '<div class="reel-quiz-feedback" id="reel-feedback-' + item.question_id + '"></div>';
      }

      bodyHtml += '<div class="reel-translation-box" id="reel-trans-box-' + item.question_id + '">' +
        '<div style="width:36px;height:4px;background:rgba(255,255,255,0.2);border-radius:2px;margin:0 auto 10px;"></div>' +
        '<div class="reel-trans-text" id="reel-trans-text-' + item.question_id + '">' +
        (item.translated_text || 'در حال دریافت ترجمه فارسی… ⏳') +
        '</div>' +
        '<div class="reel-trans-expl" id="reel-trans-expl-' + item.question_id + '">' +
        (item.explanation || '') +
        '</div>' +
        '</div>';

      cardEl.innerHTML =
        '<div class="reel-card-header">' +
          '<div class="reel-badge-pill">' + badgeText + '</div>' +
          '<div class="reel-topic-name">' + (item.topic_name_fa || 'سوال آزمون') + '</div>' +
        '</div>' +

        '<div class="reel-main-body">' +
          (item.image_url ?
            '<div class="reel-sign-frame">' +
              '<img src="' + item.image_url + '" class="reel-sign-image" alt="Road Sign" />' +
            '</div>' +
            '<div class="reel-divider-rule">' +
              '<div class="reel-divider-line"></div>' +
              '<div class="reel-divider-text">📝 سوال آزمون</div>' +
              '<div class="reel-divider-line"></div>' +
            '</div>'
          : '') +

          '<div class="reel-question-card">' +
            '<div class="reel-question-text long-pressable" id="reel-text-it-' + item.question_id + '">' + item.text_it + '</div>' +
          '</div>' +

          (!isTip ?
            '<div class="reel-divider-rule">' +
              '<div class="reel-divider-line"></div>' +
              '<div class="reel-divider-text">⚡ پاسخ درست یا نادرست؟</div>' +
              '<div class="reel-divider-line"></div>' +
            '</div>' +
            '<div class="reel-quiz-grid" id="reel-quiz-row-' + item.question_id + '">' +
              '<button class="btn-quiz-option btn-quiz-vero" onclick="App.answerReelQuestion(' + item.question_id + ', 1, ' + item.correct_answer + ')">✓ VERO (درست)</button>' +
              '<button class="btn-quiz-option btn-quiz-falso" onclick="App.answerReelQuestion(' + item.question_id + ', 0, ' + item.correct_answer + ')">✗ FALSO (نادرست)</button>' +
            '</div>' +
            '<div class="reel-feedback-banner" id="reel-feedback-' + item.question_id + '"></div>'
          : '') +

          '<div class="reel-trans-drawer" id="reel-trans-box-' + item.question_id + '">' +
            '<div class="reel-trans-title" id="reel-trans-text-' + item.question_id + '">' +
            (item.translated_text || 'در حال دریافت ترجمه فارسی… ⏳') +
            '</div>' +
            '<div class="reel-trans-detail" id="reel-trans-expl-' + item.question_id + '">' +
            (item.explanation || '') +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="reel-footer-actions">' +
          '<button class="reel-footer-btn" id="reel-like-btn-' + item.question_id + '" onclick="App.toggleReelLike(this, ' + item.question_id + ')">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>' +
            '<span id="reel-like-count-' + item.question_id + '">' + initialLikes + '</span>' +
          '</button>' +

          '<button class="reel-footer-btn" id="reel-trans-btn-' + item.question_id + '" onclick="App.toggleReelTranslate(' + item.question_id + ')">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' +
            '<span>ترجمه</span>' +
          '</button>' +

          '<button class="reel-footer-btn" id="reel-audio-btn-' + item.question_id + '" onclick="App.speakReelText(' + item.question_id + ')">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>' +
            '<span>صوت</span>' +
          '</button>' +

          '<button class="reel-footer-btn" onclick="App.saveReelVocab(' + item.question_id + ')">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>' +
            '<span>ذخیره</span>' +
          '</button>' +
        '</div>';

      viewport.appendChild(cardEl);

      // Setup Double-Tap to Like on Instagram Reel Card
      let lastTap = 0;
      cardEl.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
          e.preventDefault();
          App.popHeartAnimation(item.question_id);
        }
        lastTap = currentTime;
      });

      // Long press setup for words
      const textEl = document.getElementById('reel-text-it-' + item.question_id);
      if (textEl && App.wrapWordsForLongPress) {
        App.wrapWordsForLongPress(textEl, item.question_id);
      }
    });

    App.updateReelsHeaderProgress();
  };

  App.popHeartAnimation = function(questionId) {
    const heartEl = document.getElementById('reel-heart-pop-' + questionId);
    const likeBtn = document.getElementById('reel-like-btn-' + questionId);
    if (heartEl) {
      heartEl.classList.remove('pop');
      void heartEl.offsetWidth; // trigger reflow
      heartEl.classList.add('pop');
    }
    if (likeBtn && !likeBtn.classList.contains('liked')) {
      App.toggleReelLike(likeBtn, questionId);
    }
  };

  App.updateReelsHeaderProgress = function() {
    const viewport = document.getElementById('reels-viewport');
    const fill = document.getElementById('reels-progress-fill');
    const counter = document.getElementById('reels-counter');
    if (!viewport || state.reelsFeed.length === 0) return;

    const cardHeight = viewport.clientHeight || 1;
    const currentIdx = Math.min(
      Math.floor((viewport.scrollTop + cardHeight / 2) / cardHeight),
      state.reelsFeed.length - 1
    );

    const total = state.reelsFeed.length;
    const pct = Math.min(((currentIdx + 1) / total) * 100, 100);
    if (fill) fill.style.width = pct + '%';
    if (counter) counter.textContent = (currentIdx + 1) + ' / ' + total;
  };

  App.onReelsScroll = function(e) {
    App.updateReelsHeaderProgress();

    const el = e.target;
    if (state.reelsLoading) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 600) {
      state.reelsLoading = true;
      api('GET', '/reels/feed?limit=10')
        .then(function(data) {
          if (data.items && data.items.length > 0) {
            state.reelsFeed = state.reelsFeed.concat(data.items);
            App.renderReelCards(data.items, false);
          }
        })
        .catch(function(err) {})
        .finally(function() {
          state.reelsLoading = false;
        });
    }
  };

  App.answerReelQuestion = function(questionId, userAnswer, correctAnswer) {
    const feedbackEl = document.getElementById('reel-feedback-' + questionId);
    if (!feedbackEl) return;

    const isCorrect = userAnswer === correctAnswer;
    const correctLabel = correctAnswer === 1 ? 'VERO (درست)' : 'FALSO (نادرست)';

    if (isCorrect) {
      feedbackEl.className = 'reel-feedback-banner correct';
      feedbackEl.textContent = '🎉 آفرین! پاسخ صحیح است (' + correctLabel + ')';
    } else {
      feedbackEl.className = 'reel-feedback-banner incorrect';
      feedbackEl.textContent = '❌ اشتباه بود! پاسخ صحیح: ' + correctLabel;
    }

    // Auto-open translation after answering
    App.toggleReelTranslate(questionId, true);
  };

  App.toggleReelTranslate = async function(questionId, forceOpen) {
    const box = document.getElementById('reel-trans-box-' + questionId);
    const btn = document.getElementById('reel-trans-btn-' + questionId);
    if (!box) return;

    const isOpen = box.classList.contains('active');
    if (forceOpen || !isOpen) {
      box.classList.add('active');
      if (btn) btn.classList.add('active');

      const textEl = document.getElementById('reel-trans-text-' + questionId);
      if (textEl && textEl.textContent.includes('در حال دریافت')) {
        try {
          const res = await api('POST', '/translate/' + questionId);
          if (res.translatedText) {
            textEl.textContent = res.translatedText;
            const explEl = document.getElementById('reel-trans-expl-' + questionId);
            if (explEl && res.explanation) explEl.textContent = res.explanation;
          }
        } catch (e) {
          if (textEl) textEl.textContent = 'خطا در دریافت ترجمه';
        }
      }
    } else {
      box.classList.remove('active');
      if (btn) btn.classList.remove('active');
    }
  };

  App.speakReelText = function(questionId) {
    const item = (state.reelsFeed || []).find(function(q) { return q.question_id === questionId; });
    const text = item ? item.text_it : '';
    if (!text) return;

    const btn = document.getElementById('reel-audio-btn-' + questionId);
    if (btn) {
      btn.innerHTML = '<span style="font-size:0.8rem;">🔊 پخش…</span>';
    }

    if (!('speechSynthesis' in window)) {
      App.toast('مرورگر شما از پخش صوت پشتیبانی نمی‌کند');
      if (btn) btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg><span>صوت</span>';
      return;
    }

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'it-IT';
    u.rate = 0.9;

    u.onend = u.onerror = function() {
      if (btn) {
        btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg><span>صوت</span>';
      }
    };

    window.speechSynthesis.speak(u);
  };

  App.toggleReelLike = function(btn, questionId) {
    const isLiked = btn.classList.contains('liked');
    const countEl = document.getElementById('reel-like-count-' + questionId);
    let count = countEl ? parseInt(countEl.textContent || '120', 10) : 120;

    if (!isLiked) {
      btn.classList.add('liked');
      if (countEl) countEl.textContent = String(count + 1);
      App.toast('به لایک‌های شما اضافه شد ❤️');
    } else {
      btn.classList.remove('liked');
      if (countEl) countEl.textContent = String(Math.max(0, count - 1));
    }
  };

  App.saveReelVocab = function(questionId) {
    const item = (state.reelsFeed || []).find(function(q) { return q.question_id === questionId; });
    if (!item) return;
    App.openVocabSheet(item.text_it.split(' ')[0] || 'Patente', questionId);
  };

  // ── AI Exam Tutor Agent ──────────────────────────────────────────────────────
  App.openTutorReview = async function(sessionId) {
    const sid = sessionId || state.lastFinishedSessionId || state.sessionId;
    if (!sid) {
      App.toast('جلسه آزمونی برای رفع اشکال یافت نشد.');
      return;
    }

    state.tutorSessionId = sid;
    state.tutorChatHistory = {};

    App.showScreen('tutor');

    const loading = document.getElementById('tutor-loading');
    const content = document.getElementById('tutor-content');
    if (loading) loading.style.display = 'block';
    if (content) content.style.display = 'none';

    try {
      const data = await api('POST', '/tutor/explain-wrong', { sessionId: sid });
      if (data.wrongCount === 0 || !data.questions || data.questions.length === 0) {
        App.toast('شما هیچ سوال اشتباهی در این آزمون نداشتید! 🎉');
        App.showScreen('results');
        return;
      }

      state.tutorQuestions = data.questions;
      state.tutorCurrentIndex = 0;

      if (loading) loading.style.display = 'none';
      if (content) content.style.display = 'block';

      App.renderTutorCurrentQuestion();
    } catch (e) {
      App.toast('خطا در دریافت تحلیل استاد AI: ' + (e.message || e));
      if (loading) loading.style.display = 'none';
    }
  };

  App.renderTutorCurrentQuestion = function() {
    if (!state.tutorQuestions || state.tutorQuestions.length === 0) return;

    const q = state.tutorQuestions[state.tutorCurrentIndex];
    const total = state.tutorQuestions.length;

    // Progress badge
    const badge = document.getElementById('tutor-progress-badge');
    if (badge) badge.textContent = 'سوال ' + (state.tutorCurrentIndex + 1) + ' از ' + total + ' اشتباه';

    // Stepper dots
    const stepper = document.getElementById('tutor-stepper');
    if (stepper) {
      stepper.innerHTML = '';
      state.tutorQuestions.forEach(function(item, idx) {
        const pill = document.createElement('button');
        pill.className = 'tutor-stepper-pill' + (idx === state.tutorCurrentIndex ? ' active' : '');
        pill.setAttribute('aria-current', idx === state.tutorCurrentIndex ? 'true' : 'false');
        pill.textContent = 'سوال #' + item.position;
        pill.onclick = function() {
          state.tutorCurrentIndex = idx;
          App.renderTutorCurrentQuestion();
        };
        stepper.appendChild(pill);
      });
    }

    // Question header & comparison
    const qBadge = document.getElementById('tutor-q-badge');
    if (qBadge) qBadge.textContent = 'سوال اشتباه #' + q.position;

    const qCmp = document.getElementById('tutor-q-answers-cmp');
    if (qCmp) {
      const correctText = q.correctAnswer === 1 ? 'VERO' : 'FALSO';
      const userText = q.userAnswer === 1 ? 'VERO' : (q.userAnswer === 0 ? 'FALSO' : 'Saltato');
      qCmp.textContent = 'Correct: ' + correctText + ' · Tu: ' + userText;
    }

    // Image
    const imgContainer = document.getElementById('tutor-q-image-container');
    const imgEl = document.getElementById('tutor-q-image');
    if (imgContainer && imgEl) {
      if (q.imageUrl) {
        imgEl.src = q.imageUrl;
        imgContainer.style.display = 'block';
      } else {
        imgContainer.style.display = 'none';
      }
    }

    // Text
    const textItEl = document.getElementById('tutor-q-text-it');
    if (textItEl) textItEl.textContent = q.position + '. ' + q.textIt;

    const textFaEl = document.getElementById('tutor-q-text-fa');
    if (textFaEl) textFaEl.textContent = q.translatedText || 'در حال ترجمه...';

    // Trap Box (§14.1: simplified — use explanation only)
    const trapBox = document.getElementById('tutor-trap-box');
    if (trapBox) {
      App.renderRichText(
        trapBox,
        q.explanation || 'این سوال به دلیل دقت در قیدها یا کلمات حساس آیین‌نامه مطرح شده است.'
      );
    }

    // Rule Box (§14.1: driving_explanation removed — show generic guidance)
    const ruleBox = document.getElementById('tutor-rule-box');
    if (ruleBox) {
      ruleBox.innerHTML = 'قانون مرتبط: همیشه به تابلوها، حق تقدم و سرعت مجاز اعلام شده در قانون راهنمایی‌ورانندگی ایتالیا توجه کنید.';
    }

    // Vocab List (§14.1: grammar_explanation removed — hide vocab section)
    const vocabList = document.getElementById('tutor-vocab-list');
    const vocabSection = document.getElementById('tutor-vocab-section');
    if (vocabList && vocabSection) {
      vocabList.innerHTML = '';
      vocabSection.style.display = 'none';
    }

    // Prev / Next button states
    const prevBtn = document.getElementById('tutor-prev-btn');
    const nextBtn = document.getElementById('tutor-next-btn');
    if (prevBtn) prevBtn.disabled = state.tutorCurrentIndex === 0;
    if (nextBtn) {
      if (state.tutorCurrentIndex === total - 1) {
        nextBtn.textContent = 'پایان رفع اشکال 🎉';
      } else {
        nextBtn.textContent = 'سوال بعدی →';
      }
    }

    // Render chat history for current question
    App.renderTutorChatHistory(q.questionId);
  };

  App.prevTutorQuestion = function() {
    if (state.tutorCurrentIndex > 0) {
      state.tutorCurrentIndex--;
      App.renderTutorCurrentQuestion();
    }
  };

  App.nextTutorQuestion = function() {
    if (state.tutorCurrentIndex < state.tutorQuestions.length - 1) {
      state.tutorCurrentIndex++;
      App.renderTutorCurrentQuestion();
    } else {
      App.toast('رفع اشکال تمامی سوالات با موفقیت به پایان رسید! 👏');
      App.showScreen('results', 'back');
    }
  };

  App.renderTutorChatHistory = function(questionId) {
    const box = document.getElementById('tutor-chat-box');
    if (!box) return;

    const history = state.tutorChatHistory[questionId] || [];
    if (history.length === 0) {
      box.innerHTML = '<div class="tutor-chat-empty">هر سوال یا ابهامی در مورد این تست داری بنویس تا استاد برات توضیح بده.</div>';
      return;
    }

    box.innerHTML = '';
    history.forEach(function(msg) {
      const isUser = msg.role === 'user';
      const msgDiv = document.createElement('div');
      msgDiv.className = 'tutor-chat-bubble ' + (isUser ? 'user' : 'assistant');

      App.renderRichText(msgDiv, msg.content);
      box.appendChild(msgDiv);
    });

    box.scrollTop = box.scrollHeight;
  };

  App.sendTutorChatMessage = async function(e) {
    if (e) e.preventDefault();

    const input = document.getElementById('tutor-chat-input');
    const sendBtn = document.getElementById('tutor-chat-send-btn');
    if (!input) return;

    const userMessage = input.value.trim();
    if (!userMessage) return;

    const q = state.tutorQuestions[state.tutorCurrentIndex];
    if (!q) return;

    if (!state.tutorChatHistory[q.questionId]) {
      state.tutorChatHistory[q.questionId] = [];
    }

    // Push user message
    state.tutorChatHistory[q.questionId].push({ role: 'user', content: userMessage });
    input.value = '';
    App.renderTutorChatHistory(q.questionId);

    if (sendBtn) {
      sendBtn.disabled = true;
      sendBtn.textContent = '…';
    }

    try {
      const res = await api('POST', '/tutor/chat', {
        sessionId: state.tutorSessionId,
        questionId: q.questionId,
        userMessage: userMessage,
        history: state.tutorChatHistory[q.questionId],
      });

      if (res.response) {
        state.tutorChatHistory[q.questionId].push({ role: 'assistant', content: res.response });
        App.renderTutorChatHistory(q.questionId);
      }
    } catch (err) {
      App.toast('خطا در پاسخ استاد: ' + (err.message || err));
    } finally {
      if (sendBtn) {
        sendBtn.disabled = false;
        sendBtn.textContent = 'ارسال';
      }
    }
  };

  App.saveVocabDirect = async function(termIt, termFa, btn, sourceQuestionId) {
    if (btn) {
      btn.disabled = true;
      btn.textContent = '…';
    }
    try {
      await api('POST', '/vocab', {
        termIt: termIt,
        termFa: termFa,
        sourceQuestionId: sourceQuestionId || null,
      });
      if (btn) {
        btn.textContent = '✓ ذخیره شد';
        btn.style.background = 'var(--go-dim)';
        btn.style.color = 'var(--go-light)';
      }
      App.toast('کلمه "' + termIt + '" در لیست لغات ذخیره شد');
    } catch (e) {
      App.toast('خطا در ذخیره لغت: ' + (e.message || e));
      if (btn) {
        btn.disabled = false;
        btn.textContent = '+ ذخیره';
      }
    }
  };

  // ── Init ─────────────────────────────────────────────────────────────────────

  function init() {
    document.getElementById('loading').style.display = 'none';

    const params = new URLSearchParams(window.location.search);
    const screen = params.get('screen') || 'home';

    if (screen === 'exam') {
      App.showScreen('home');
      App.startExam('exam');
    } else if (screen === 'review') {
      App.showScreen('home');
      App.startExam('review');
    } else {
      App.showScreen(screen);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
