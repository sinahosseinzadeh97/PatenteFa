
(function() {
  'use strict';

  // ── Telegram WebApp init ────────────────────────────────────────────────────
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
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
      throw new Error(err.error || 'درخواست ناموفق بود');
    }
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
    translateOpen: false,
    translationCache: {},
    // Vocab
    vocabItems: [],
    dueVocab: [],
    dueVocabIndex: 0,
    vocabFlipped: false,
    // Signs (SRS stored in localStorage)
    signsQueue: [],
    signsIndex: 0,
    signsFlipped: false,
    allSignQuestions: [],
  };

  // ── Screen routing (with slide transition) ───────────────────────────────────
  window.App = {};

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

    if (name === 'home')  App.loadHome();
    if (name === 'vocab') App.loadVocab();
    if (name === 'stats') App.loadStats();
    if (name === 'signs') App.loadSigns();
  };

  App.navigateBack = function() {
    const dest = state.prevScreen || 'home';
    App.showScreen(dest, 'back');
  };

  // ── Toast ───────────────────────────────────────────────────────────────────
  App.toast = function(msg, duration) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), duration || 2500);
  };

  // ── Home ────────────────────────────────────────────────────────────────────
  App.loadHome = async function() {
    try {
      const data = await api('GET', '/stats');
      document.getElementById('streak-value').textContent = data.streak || 0;
      document.getElementById('home-days').textContent =
        data.daysToExam !== null ? data.daysToExam : '—';
      document.getElementById('home-review').textContent = data.reviewCount || 0;

      if (data.reviewCount > 0) {
        document.getElementById('btn-start-review').style.display = '';
      }

      // Weak-topic focus card
      if (data.weakestTopic && data.totalSessions > 0) {
        const card = document.getElementById('home-focus-card');
        card.style.display = '';
        const pct = Math.round(data.weakestTopic.accuracy * 100);
        document.getElementById('home-weakest').textContent =
          data.weakestTopic.name_it + ' — ' + pct + '% درست';
      }
    } catch (e) {
      // First run — no stats yet, that's fine
    }
  };

  // ── Start exam ──────────────────────────────────────────────────────────────
  App.startExam = async function(mode) {
    mode = mode || 'exam';
    try {
      const data = await api('POST', '/exam/start', { mode });
      state.sessionId = data.sessionId;
      state.questions = data.questions;
      state.currentIndex = 0;
      state.answers = {};
      state.flags = new Set();
      state.startedAt = Date.now();
      state.translateOpen = false;
      state.translationCache = {};
      state.secondsLeft = 1200;

      App.showScreen('exam');
      document.getElementById('bottom-nav').style.display = 'none';
      App.renderExamTabs();
      App.renderQuestion();
      App.startTimer();
    } catch (e) {
      App.toast('خطا: ' + e.message);
    }
  };

  App.startReview = function() {
    App.startExam('review');
  };

  App.startTopicPractice = function() {
    App.startExam('topic_practice');
  };

  // ── Timer ───────────────────────────────────────────────────────────────────
  App.startTimer = function() {
    clearInterval(state.timerInterval);
    App.updateTimerUI();
    state.timerInterval = setInterval(function() {
      state.secondsLeft--;
      App.updateTimerUI();
      if (state.secondsLeft <= 0) {
        clearInterval(state.timerInterval);
        App.finishExam();
      }
    }, 1000);
  };

  App.updateTimerUI = function() {
    const m = Math.floor(state.secondsLeft / 60);
    const s = state.secondsLeft % 60;
    const el = document.getElementById('exam-timer');
    el.textContent = m + ':' + String(s).padStart(2, '0');
    el.className = 'timer';
    if (state.secondsLeft <= 60) el.classList.add('danger');
    else if (state.secondsLeft <= 300) el.classList.add('warning');
  };

  // ── Exam tabs ───────────────────────────────────────────────────────────────
  App.renderExamTabs = function() {
    const container = document.getElementById('exam-tabs');
    container.innerHTML = '';
    const total = state.questions.length;
    const answered = Object.keys(state.answers).length;

    // Update the summary label
    const posEl = document.getElementById('exam-position');
    if (posEl) {
      posEl.textContent = 'Q ' + (state.currentIndex + 1) + ' / ' + total;
    }

    state.questions.forEach(function(q, i) {
      const tab = document.createElement('button');
      tab.className = 'q-tab' + (i === state.currentIndex ? ' active' : '');
      tab.textContent = i + 1;
      tab.onclick = function() {
        state.currentIndex = i;
        App.renderQuestion();
        App.renderExamTabs();
      };
      if (state.flags.has(q.questionId)) tab.classList.add('flagged');
      container.appendChild(tab);
    });

    // Update road marker position
    App.updateRoad(answered, total);
  };

  // ── Road progress ───────────────────────────────────────────────────────────
  App.updateRoad = function(answered, total) {
    const pct = total > 0 ? (answered / total) * 100 : 0;
    const markerPct = total > 0
      ? Math.max(2, Math.min(96, ((answered + 0.5) / total) * 96)) // clamp so marker stays on road
      : 2;

    const marker = document.getElementById('road-marker');
    const fill   = document.getElementById('road-answered');
    if (marker) marker.style.left = markerPct + '%';
    if (fill)   fill.style.width  = pct + '%';
  };

  // ── Render question ─────────────────────────────────────────────────────────
  App.renderQuestion = function() {
    const q = state.questions[state.currentIndex];
    if (!q) return;

    document.getElementById('exam-question-text').textContent = q.textIt;

    const img = document.getElementById('exam-sign-img');
    if (q.imageUrl) {
      img.src = q.imageUrl;
      img.style.display = 'block';
    } else {
      img.style.display = 'none';
    }

    document.getElementById('btn-flag').style.opacity =
      state.flags.has(q.questionId) ? '1' : '0.4';

    // Reset translate panel on question switch
    state.translateOpen = false;
    const tog = document.getElementById('translate-toggle');
    if (tog) tog.checked = false;
    document.getElementById('translate-panel').classList.remove('open');
    document.getElementById('exam-question-text').className = 'question-text';
  };

  // ── Answer ──────────────────────────────────────────────────────────────────
  App.answer = async function(value) {
    const q = state.questions[state.currentIndex];
    if (!q) return;
    if (state.answers[q.questionId] !== undefined) return; // already answered

    state.answers[q.questionId] = value;

    document.getElementById('btn-vero').classList.add('btn-disabled');
    document.getElementById('btn-falso').classList.add('btn-disabled');

    // Update road immediately on answer
    App.renderExamTabs();

    try {
      await api('POST', '/exam/' + state.sessionId + '/answer', {
        questionId: q.questionId,
        answer: value,
      });
    } catch (e) {
      // Offline — continue locally
    }

    setTimeout(function() {
      document.getElementById('btn-vero').classList.remove('btn-disabled');
      document.getElementById('btn-falso').classList.remove('btn-disabled');

      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex++;
        App.renderExamTabs();
        App.renderQuestion();
      } else {
        App.finishExam();
      }
    }, 320);
  };

  // ── Flag / bookmark ─────────────────────────────────────────────────────────
  App.toggleFlag = async function() {
    const q = state.questions[state.currentIndex];
    if (!q) return;
    const wasFlagged = state.flags.has(q.questionId);
    if (wasFlagged) state.flags.delete(q.questionId);
    else state.flags.add(q.questionId);
    document.getElementById('btn-flag').style.opacity =
      state.flags.has(q.questionId) ? '1' : '0.4';
    App.renderExamTabs();
    try {
      await api('POST', '/exam/' + state.sessionId + '/flag', {
        questionId: q.questionId, flagged: !wasFlagged,
      });
    } catch (e) {}
  };

  // ── TTS ─────────────────────────────────────────────────────────────────────
  App.speakQuestion = function() {
    const text = document.getElementById('exam-question-text').textContent;
    if (!text) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'it-IT'; utt.rate = 0.9;
      window.speechSynthesis.speak(utt);
    } else {
      App.toast('TTS در این مرورگر پشتیبانی نمی‌شود');
    }
  };

  // ── Translate ───────────────────────────────────────────────────────────────
  App.toggleTranslate = async function() {
    state.translateOpen = !state.translateOpen;
    const panel = document.getElementById('translate-panel');
    if (!state.translateOpen) {
      panel.classList.remove('open');
      document.getElementById('exam-question-text').className = 'question-text';
      return;
    }
    panel.classList.add('open');
    const q = state.questions[state.currentIndex];
    if (!q) return;

    if (state.translationCache[q.questionId]) {
      App.showTranslation(state.translationCache[q.questionId]);
      return;
    }

    document.getElementById('translate-text').textContent = '⏳ در حال ترجمه…';
    document.getElementById('translate-explanation').textContent = '';

    try {
      const data = await api('POST', '/translate/' + q.questionId);
      state.translationCache[q.questionId] = data;
      App.showTranslation(data);
    } catch (e) {
      document.getElementById('translate-text').textContent = 'ترجمه در دسترس نیست — دوباره امتحان کن';
    }
  };

  App.showTranslation = function(data) {
    document.getElementById('translate-text').textContent = data.translatedText || '';
    document.getElementById('translate-explanation').textContent = data.explanation || '';
    document.getElementById('exam-question-text').classList.add('translated');
  };

  // ── Finish exam ─────────────────────────────────────────────────────────────
  App.finishExam = async function() {
    clearInterval(state.timerInterval);
    const durationSeconds = Math.round((Date.now() - state.startedAt) / 1000);
    let data;
    try {
      data = await api('POST', '/exam/' + state.sessionId + '/finish', { durationSeconds });
    } catch (e) {
      App.toast('خطا در ثبت نتایج: ' + e.message);
      return;
    }
    document.getElementById('bottom-nav').style.display = '';
    App.renderResults(data);
    App.showScreen('results');
  };

  // ── Results ─────────────────────────────────────────────────────────────────
  App.renderResults = function(data) {
    const badge = document.getElementById('results-badge');
    badge.className = 'result-badge ' + (data.passed ? 'pass' : 'fail');
    badge.textContent = data.passed ? 'قبول' : 'رد';

    // New copy voice from design.md
    document.getElementById('results-score').textContent =
      data.score + ' از ۳۰';
    document.getElementById('results-detail').textContent =
      data.passed
        ? data.wrongCount + ' اشتباه — قبول شدی! 🎉'
        : data.wrongCount + ' اشتباه — بیشتر از ۳ — دوباره تلاش کن';

    const min = Math.floor(data.durationSeconds / 60);
    const sec = String(data.durationSeconds % 60).padStart(2, '0');
    document.getElementById('results-time').textContent = '⏱ ' + min + ':' + sec;

    // Build result rows with sign-flip animation
    const list = document.getElementById('results-list');
    list.innerHTML = '';

    data.answers.forEach(function(a, idx) {
      const wrapper = document.createElement('div');
      wrapper.style.marginBottom = '6px';

      // Result row with icon
      const row = document.createElement('div');
      row.className = 'result-row';

      const icon = document.createElement('div');
      icon.className = 'result-icon ' + (a.isCorrect ? 'correct' : 'wrong');
      icon.textContent = a.isCorrect ? '✓' : '✗';

      // Sign-flip card
      const signCard = document.createElement('div');
      signCard.className = 'sign-card';
      signCard.style.flex = '1';

      const inner = document.createElement('div');
      inner.className = 'sign-card-inner';

      // We don't need two faces visible — just animate the single back face in
      const back = document.createElement('div');
      back.className = 'sign-card-back';

      const questionLine = document.createElement('div');
      questionLine.dir = 'ltr';
      questionLine.style.cssText = 'font-size:0.83rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--ink);';
      questionLine.style.fontFamily = 'Public Sans, sans-serif';
      questionLine.textContent = a.position + '. ' + a.textIt;

      const answerLine = document.createElement('div');
      answerLine.style.cssText = 'font-size:0.72rem;color:var(--ink-muted);margin-top:3px;';
      answerLine.style.fontFamily = 'Public Sans, sans-serif';
      answerLine.dir = 'ltr';
      answerLine.textContent =
        'Risposta: ' + (a.correctAnswer === 1 ? 'VERO' : 'FALSO') +
        (a.userAnswer !== null ? ' · Tu: ' + (a.userAnswer === 1 ? 'VERO' : 'FALSO') : ' · Saltato');

      const translateBtn = document.createElement('button');
      translateBtn.style.cssText = 'background:none;border:1px solid var(--border);border-radius:6px;color:var(--ink-muted);font-size:0.68rem;padding:3px 7px;cursor:pointer;margin-top:4px;';
      translateBtn.style.fontFamily = 'Vazirmatn, sans-serif';
      translateBtn.textContent = 'ترجمه';
      translateBtn.onclick = function() { App.translateResult(a.questionId, translateBtn); };

      back.appendChild(questionLine);
      back.appendChild(answerLine);
      back.appendChild(translateBtn);
      inner.appendChild(back);
      signCard.appendChild(inner);
      row.appendChild(icon);
      row.appendChild(signCard);
      wrapper.appendChild(row);
      list.appendChild(wrapper);

      // Staggered flip-in animation
      const delay = Math.min(idx * 60, 1200); // cap at 1.2s total stagger
      setTimeout(function() {
        signCard.classList.add('revealed');
      }, delay);
    });
  };

  App.translateResult = async function(questionId, btn) {
    btn.disabled = true;
    btn.textContent = '⏳';
    try {
      const data = await api('POST', '/translate/' + questionId);
      const container = btn.parentElement;
      const fa = document.createElement('div');
      fa.className = 'fa-text';
      fa.style.cssText = 'font-size:0.8rem;color:var(--ink-muted);padding-top:4px;';
      fa.textContent = data.translatedText;
      container.insertBefore(fa, btn);
      btn.style.display = 'none';
    } catch (e) {
      btn.textContent = 'خطا — دوباره';
      btn.disabled = false;
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
        list.innerHTML = '<div style="color:var(--ink-muted);font-size:0.9rem;padding:16px 0;text-align:center;">هنوز لغتی ذخیره نکردی — از یه سؤال شروع کن</div>';
        return;
      }

      state.vocabItems.forEach(function(item) {
        const el = document.createElement('div');
        el.className = 'card-sm';
        el.style.marginBottom = '8px';
        el.innerHTML =
          '<div class="ltr" style="font-weight:600;">' + item.term_it + '</div>' +
          '<div class="fa-text" style="color:var(--ink-muted);font-size:0.9rem;margin-top:2px;">' + item.term_fa + '</div>';
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

  // ── Road-sign flashcard mode ─────────────────────────────────────────────────
  // SRS state stored in localStorage: key = 'signs_srs', value = JSON map of questionId → {interval, nextDate}

  function getSignsSRS() {
    try { return JSON.parse(localStorage.getItem('signs_srs') || '{}'); } catch (e) { return {}; }
  }
  function saveSignsSRS(srs) {
    try { localStorage.setItem('signs_srs', JSON.stringify(srs)); } catch (e) {}
  }
  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  App.loadSigns = async function() {
    // Fetch sign questions if not yet loaded
    if (state.allSignQuestions.length === 0) {
      try {
        // We reuse the stats endpoint to get question bank, but we need sign questions.
        // Use a dedicated endpoint if available, otherwise draw a fresh exam and keep image questions.
        // Since there's no dedicated sign listing endpoint, we call the exam start with mode=exam
        // and filter for imageUrl questions from the bank.
        // Better: fetch via /api/signs if available, else show a loading state.
        const data = await api('GET', '/signs');
        state.allSignQuestions = data.questions || [];
      } catch (e) {
        // Fallback: show a helpful message
        document.getElementById('signs-empty').style.display = '';
        document.getElementById('signs-flip-card').style.display = 'none';
        document.querySelector('#screen-signs > div > div:last-of-type[style*="gap"]') &&
          (document.querySelector('#screen-signs .btn-vero').closest('div').style.display = 'none');
        App.toast('برای استفاده از تابلوها ابتدا یک آزمون بده');
        return;
      }
    }

    const srs = getSignsSRS();
    const today = todayISO();

    // Queue: questions due today (nextDate <= today or not set)
    const due = state.allSignQuestions.filter(function(q) {
      const entry = srs[q.questionId];
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
    const q = state.signsQueue[state.signsIndex];
    if (!q) return;

    state.signsFlipped = false;
    document.getElementById('signs-flip-card').classList.remove('flipped');

    const img = document.getElementById('signs-img');
    img.src = q.imageUrl || '';

    document.getElementById('signs-name-it').textContent = q.textIt || '';
    document.getElementById('signs-name-fa').textContent = q.nameFa || '';

    const total = state.signsQueue.length;
    const idx = state.signsIndex + 1;
    document.getElementById('signs-counter').textContent = idx + ' / ' + total;

    // Progress bar
    const pct = ((idx - 1) / total) * 100;
    document.getElementById('signs-srs-bar').style.width = pct + '%';
  };

  App.flipSign = function() {
    state.signsFlipped = !state.signsFlipped;
    document.getElementById('signs-flip-card').classList.toggle('flipped', state.signsFlipped);
  };

  App.signsReview = function(correct) {
    const q = state.signsQueue[state.signsIndex];
    if (!q) return;

    const srs = getSignsSRS();
    const entry = srs[q.questionId] || { interval: 1 };

    const newInterval = correct
      ? Math.min(entry.interval * 2, 64) // double, cap at 64 days
      : 1;                                // reset on miss

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + newInterval);

    srs[q.questionId] = {
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
})();
