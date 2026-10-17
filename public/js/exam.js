/**
 * public/js/exam.js
 * PatenteFa exam runner + results + three-tab AI panel (translate/theory/grammar) —
 * the "money path". Classic (non-module) script, served as a static asset.
 * Must load AFTER public/js/app.js — depends on its shared `state`, `api()`,
 * and `App` globals via the classic-script shared lexical scope (see app.js
 * header for why there's no bundler/ES modules here).
 */
'use strict';

  // ── Start exam ──────────────────────────────────────────────────────────────
  App.initializeExamState = function(data, options) {
    options = options || {};
    state.examMode = options.mode || data.mode || 'exam';
    // 'deferred' (exam mode): selections stay changeable and nothing reveals
    // correctness until finish. 'immediate': practice and review modes.
    state.examFeedback = data.feedback || (state.examMode === 'exam' ? 'deferred' : 'immediate');
    state.aiEnabled = data.aiEnabled === true;
    state.aiAssisted = data.aiAssisted === true;
    state.selectionSaves = {};
    state.sessionId = data.sessionId;
    state.questions = data.questions || [];
    state.currentIndex = 0;
    state.answers = {};
    state.answerResults = {};
    state.recordedAnswers = new Set();
    state.flags = new Set();
    state.startedAt = typeof options.startedAt === 'number' ? options.startedAt : Date.now();
    state.translateOpen = false;
    state.translationCache = {};
    state.theoryCache = {};
    state.grammarCache = {};
    state.aiPendingRequests = {};
    state.aiRequestGeneration = (state.aiRequestGeneration || 0) + 1;
    state.answerPending = {};
    state.finishPending = false;
    state.secondsLeft = typeof options.secondsLeft === 'number' ? options.secondsLeft : 1200;
    state.examReturnScreen = options.returnScreen || 'home';
  };

  App.isDeferredExam = function() {
    return state.examFeedback === 'deferred';
  };

  App.enterExamScreen = function() {
    App.showScreen('exam');
    document.getElementById('bottom-nav').style.display = 'none';
    App.applyExamMode();
    App.renderExamTabs();
    App.renderQuestion();
    App.startTimer();
  };

  App.startExam = async function(mode) {
    if (state.examStartPending) return;
    state.examStartPending = true;
    mode = mode || 'exam';
    const returnScreen = state.currentScreen && state.currentScreen !== 'exam'
      ? state.currentScreen
      : 'home';
    try {
      const data = await api('POST', '/exam/start', { mode });
      App.initializeExamState(data, { mode: mode, returnScreen: returnScreen });
      App.enterExamScreen();
    } catch (e) {
      App.toast('خطا: ' + e.message);
    } finally {
      state.examStartPending = false;
    }
  };

  // ── Resume an exam after a reload ───────────────────────────────────────────
  // Selections are mirrored to localStorage until the exam ends, so a choice
  // whose save had not reached the server yet survives a reload too.
  const EXAM_SELECTIONS_KEY = 'patente_exam_selections_v1';

  App.storeExamSelections = function() {
    if (!App.isDeferredExam() || !state.sessionId) return;
    try {
      localStorage.setItem(EXAM_SELECTIONS_KEY, JSON.stringify({ sessionId: state.sessionId, answers: state.answers }));
    } catch (e) {}
  };

  App.readStoredExamSelections = function(sessionId) {
    try {
      const stored = JSON.parse(localStorage.getItem(EXAM_SELECTIONS_KEY) || 'null');
      return stored && stored.sessionId === sessionId && stored.answers ? stored.answers : {};
    } catch (e) {
      return {};
    }
  };

  App.clearStoredExamSelections = function() {
    try { localStorage.removeItem(EXAM_SELECTIONS_KEY); } catch (e) {}
  };

  App.offerExamResume = async function() {
    if (state.sessionId || state.examStartPending) return;
    let data;
    try {
      data = await api('GET', '/exam/active');
    } catch (e) {
      return; // not approved yet, offline, … — nothing to resume
    }
    const active = data && data.session;
    if (!active || state.sessionId) return;

    const stored = App.readStoredExamSelections(active.sessionId);
    const answers = Object.assign({}, active.selections, stored);
    const answered = Object.keys(answers).length;
    const ok = window.confirm(
      'یک آزمون نیمه‌کاره داری (' + answered + ' از ' + active.questions.length + ' سؤال پاسخ داده شده).\n' +
      'ادامه‌اش می‌دهی؟ اگر نه، این آزمون بسته می‌شود و نمره‌ای ثبت نمی‌شود.'
    );
    if (!ok) {
      App.clearStoredExamSelections();
      api('POST', '/exam/' + active.sessionId + '/abandon').catch(function() {});
      return;
    }
    if (state.sessionId) return;

    App.initializeExamState(active, {
      mode: 'exam',
      returnScreen: 'home',
      secondsLeft: active.secondsLeft,
      startedAt: Date.now() - (1200 - active.secondsLeft) * 1000,
    });
    state.answers = answers;
    state.flags = new Set(active.flags || []);
    App.storeExamSelections();
    // Re-send anything the server does not have yet (saved locally, lost in transit).
    Object.keys(stored).forEach(function(questionId) {
      if (active.selections[questionId] !== stored[questionId]) App.saveSelection(Number(questionId));
    });
    App.enterExamScreen();
    if (active.secondsLeft <= 0) App.finishExam({ auto: true });
  };

  App.startReview = function() {
    App.startExam('review');
  };

  App.startTopicPractice = function() {
    App.startExam('topic_practice');
  };

  // ── Leave an unfinished session ─────────────────────────────────────────────
  // Answers are persisted as they are given, but an abandoned session is not
  // finished/scored and therefore never changes the pass rate.
  App.applyExamMode = function() {
    const btn = document.getElementById('btn-exit-exam');
    if (!btn) return;
    btn.setAttribute(
      'aria-label',
      state.examMode === 'topic_practice' ? 'بازگشت از تمرین' : 'خروج از آزمون'
    );
    btn.title = state.examMode === 'topic_practice' ? 'بازگشت از تمرین' : 'خروج از آزمون';
  };

  App.exitExam = function() {
    const answered = Object.keys(state.answers).length;
    const total = state.questions.length;
    if (answered > 0) {
      const modeLabel = state.examMode === 'topic_practice' ? 'تمرین' : 'آزمون';
      const ok = window.confirm(
        'از این ' + modeLabel + ' خارج می‌شوید؟\n' +
        answered + ' سوال از ' + total + ' را پاسخ داده‌اید. این جلسه نهایی و در آمار قبولی حساب نمی‌شود.'
      );
      if (!ok) return;
    }

    clearInterval(state.timerInterval);
    const abandonedSessionId = state.sessionId;
    // Invalidate first: delayed answer/finish callbacks capture the old ID and
    // must become no-ops before the asynchronous abandon request is sent.
    state.sessionId = null;
    state.aiRequestGeneration = (state.aiRequestGeneration || 0) + 1;
    state.answerPending = {};
    state.finishPending = false;
    App.clearStoredExamSelections();
    if (abandonedSessionId) {
      api('POST', '/exam/' + abandonedSessionId + '/abandon').catch(function() {});
    }
    state.examMode = null;
    App.applyExamMode();

    const nav = document.getElementById('bottom-nav');
    if (nav) nav.style.display = '';
    App.showScreen(state.examReturnScreen || 'home', 'back');
  };

  // Backwards-compatible name for any stale cached markup.
  App.exitTopicPractice = App.exitExam;

  // ── Timer ───────────────────────────────────────────────────────────────────
  App.startTimer = function() {
    clearInterval(state.timerInterval);
    App.updateTimerUI();
    state.timerInterval = setInterval(function() {
      state.secondsLeft--;
      App.updateTimerUI();
      if (state.secondsLeft <= 0) {
        clearInterval(state.timerInterval);
        App.finishExam({ auto: true });
      }
    }, 1000);
  };

  App.updateTimerUI = function() {
    const left = Math.max(0, state.secondsLeft);
    const m = Math.floor(left / 60);
    const s = left % 60;
    const el = document.getElementById('exam-timer');
    el.textContent = m + ':' + String(s).padStart(2, '0');
    el.className = 'timer exam-timer-inline';
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
      posEl.textContent = (state.currentIndex + 1) + ' / ' + total;
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
      if (App.isDeferredExam() && state.answers[q.questionId] !== undefined) {
        const save = state.selectionSaves[q.questionId];
        tab.classList.add(save && save.status === 'failed' ? 'save-failed' : 'answered');
      }
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

    const textEl = document.getElementById('exam-question-text');
    textEl.textContent = q.textIt;
    // Wrap words for long-press-to-vocab (§12.2)
    App.wrapWordsForLongPress(textEl, q.questionId);

    const img = document.getElementById('exam-sign-img');
    if (q.imageUrl) {
      img.src = q.imageUrl;
      img.style.display = 'block';
    } else {
      img.style.display = 'none';
    }

    App._setFlagButtonState(state.flags.has(q.questionId));

    // §15.3: reset AI panel on question switch (uses centralized helper)
    App._resetAiPanel();
    const quality = document.getElementById('translate-quality');
    if (quality) quality.replaceChildren();
    App.renderAnswerState(q);
    App.updateFinishAvailability();
  };

  App.renderAnswerState = function(q) {
    App.renderQuestionSource(q);
    if (App.isDeferredExam()) {
      App.renderSelectionState(q);
      return;
    }
    const veroBtn = document.getElementById('btn-vero');
    const falsoBtn = document.getElementById('btn-falso');
    const feedback = document.getElementById('exam-answer-feedback');
    const nextBtn = document.getElementById('btn-next-question');
    const result = state.answerResults[q.questionId];
    const answered = state.recordedAnswers.has(q.questionId);

    [veroBtn, falsoBtn].forEach(function(btn) {
      if (!btn) return;
      btn.disabled = answered;
      btn.removeAttribute('aria-pressed');
      btn.classList.remove(
        'btn-disabled',
        'answer-selected',
        'answer-correct-choice',
        'answer-wrong-choice'
      );
    });

    if (feedback) {
      feedback.textContent = '';
      feedback.className = 'exam-answer-feedback fa-text';
      feedback.style.display = 'block';
    }
    if (nextBtn) {
      nextBtn.style.display = answered && state.currentIndex < state.questions.length - 1
        ? 'inline-flex'
        : 'none';
    }

    if (!answered || !result) {
      App.renderExamLessonHint(null);
      return;
    }

    const selectedBtn = state.answers[q.questionId] === 1 ? veroBtn : falsoBtn;
    const correctBtn = result.correctAnswer === 1 ? veroBtn : falsoBtn;
    if (selectedBtn) selectedBtn.classList.add('answer-selected');
    if (correctBtn) correctBtn.classList.add('answer-correct-choice');
    if (!result.isCorrect && selectedBtn) selectedBtn.classList.add('answer-wrong-choice');

    App.renderExamLessonHint(result);

    if (feedback) {
      const correctLabel = result.correctAnswer === 1 ? 'VERO' : 'FALSO';
      feedback.textContent = result.isCorrect
        ? 'درست انتخاب کردی — پاسخ صحیح: ' + correctLabel
        : 'انتخابت نادرست بود — پاسخ صحیح: ' + correctLabel;
      feedback.classList.add(result.isCorrect ? 'correct' : 'wrong', 'is-visible');
    }
  };

  // Exam mode: show the current selection only. Both buttons stay usable so
  // the learner can change their mind; nothing here says whether it is right.
  App.renderSelectionState = function(q) {
    const veroBtn = document.getElementById('btn-vero');
    const falsoBtn = document.getElementById('btn-falso');
    const feedback = document.getElementById('exam-answer-feedback');
    const nextBtn = document.getElementById('btn-next-question');
    const selected = state.answers[q.questionId];
    const save = state.selectionSaves[q.questionId];

    [veroBtn, falsoBtn].forEach(function(btn) {
      if (!btn) return;
      btn.disabled = false;
      btn.setAttribute('aria-pressed', 'false');
      btn.classList.remove('btn-disabled', 'answer-selected', 'answer-correct-choice', 'answer-wrong-choice');
    });
    const selectedBtn = selected === 1 ? veroBtn : selected === 0 ? falsoBtn : null;
    if (selectedBtn) {
      selectedBtn.classList.add('answer-selected');
      selectedBtn.setAttribute('aria-pressed', 'true');
    }
    if (veroBtn && veroBtn.parentElement) {
      veroBtn.parentElement.classList.toggle('has-selection', !!selectedBtn);
    }

    if (feedback) {
      const failed = !!(selectedBtn && save && save.status === 'failed');
      feedback.className = 'exam-answer-feedback fa-text' + (failed ? ' pending is-visible' : '');
      feedback.textContent = failed
        ? 'انتخابت هنوز به سرور نرسیده؛ با «پایان آزمون» دوباره فرستاده می‌شود.'
        : '';
    }
    if (nextBtn) {
      nextBtn.style.display = state.currentIndex < state.questions.length - 1 ? 'inline-flex' : 'none';
    }
    App.renderExamLessonHint(null);
  };

  // After a wrong answer, point to the lesson section that teaches this exact
  // question (explicit mapping from the server). Text only: leaving mid-session
  // would abandon it, so the button to open the lesson lives on the results screen.
  App.renderExamLessonHint = function(result) {
    const hint = document.getElementById('exam-lesson-hint');
    if (!hint) return;
    const link = result && !result.isCorrect ? result.lessonLink : null;
    hint.hidden = !link;
    hint.textContent = link
      ? 'این سؤال در درس «' + link.titleFa + '» توضیح داده شده است. بعد از پایان جلسه می‌توانی از صفحه‌ی نتیجه بازش کنی.'
      : '';
  };

  App.nextQuestion = function() {
    const q = state.questions[state.currentIndex];
    if (!q) return;
    if (!App.isDeferredExam() && !state.recordedAnswers.has(q.questionId)) return;
    if (state.currentIndex >= state.questions.length - 1) {
      if (App.isDeferredExam()) return;
      App.finishExam();
      return;
    }
    state.currentIndex += 1;
    App.renderExamTabs();
    App.renderQuestion();
  };

  App.updateFinishAvailability = function() {
    const btn = document.getElementById('btn-finish-exam');
    if (!btn) return;
    const lastQuestion = state.questions[state.questions.length - 1];
    // Exam mode can be finished at any point; unanswered questions count as wrong.
    const canFinish = !!(
      state.sessionId &&
      lastQuestion &&
      (App.isDeferredExam() || state.recordedAnswers.has(lastQuestion.questionId))
    );
    btn.style.display = canFinish ? 'inline-flex' : 'none';
  };

  // ── Answer ──────────────────────────────────────────────────────────────────
  App.answer = async function(value) {
    if (App.isDeferredExam()) {
      App.selectAnswer(value);
      return;
    }
    const q = state.questions[state.currentIndex];
    if (!q) return;
    if (state.answers[q.questionId] !== undefined) return; // already answered
    if (state.answerPending[q.questionId]) return;

    const sessionId = state.sessionId;
    state.answerPending[q.questionId] = true;

    document.getElementById('btn-vero').classList.add('btn-disabled');
    document.getElementById('btn-falso').classList.add('btn-disabled');

    try {
      const result = await api('POST', '/exam/' + sessionId + '/answer', {
        questionId: q.questionId,
        answer: value,
      });
      if (state.sessionId !== sessionId) return;
      state.answers[q.questionId] = value;
      state.answerResults[q.questionId] = {
        isCorrect: result.isCorrect === true,
        correctAnswer: result.correctAnswer === 1 ? 1 : 0,
      };
      state.recordedAnswers.add(q.questionId);
      state.answerResults[q.questionId].lessonLink = result.lessonLink || null;
      q.source = result.source || q.source;
      App.renderExamTabs();
      App.updateFinishAvailability();
      const currentQuestion = state.questions[state.currentIndex];
      if (currentQuestion && currentQuestion.questionId === q.questionId) {
        App.renderAnswerState(q);
      }
    } catch (e) {
      const message = e && typeof e.status === 'number'
        ? 'پاسخ ذخیره نشد: ' + e.message
        : 'وضعیت شبکه نامشخص است؛ برای تلاش دوباره پاسخ را بزنید.';
      App.toast(message);
      document.getElementById('btn-vero').classList.remove('btn-disabled');
      document.getElementById('btn-falso').classList.remove('btn-disabled');
      return;
    } finally {
      if (state.sessionId === sessionId) delete state.answerPending[q.questionId];
    }
  };

  // Exam mode: a tap only selects. The selection is shown at once, backed up
  // locally, and saved in the background; it can change until finish.
  App.selectAnswer = function(value) {
    const q = state.questions[state.currentIndex];
    if (!q || !state.sessionId || state.finishPending) return;
    state.answers[q.questionId] = value;
    App.storeExamSelections();
    App.saveSelection(q.questionId);
    App.renderAnswerState(q);
    App.renderExamTabs();
  };

  // One save in flight per question; when it returns, the latest selection is
  // sent if it changed meanwhile, so saves never land out of order.
  // ponytail: ordering is per tab only; add a revision column if one exam is
  // ever answered from two devices at once. "Finish" sends every selection anyway.
  App.saveSelection = async function(questionId) {
    const sessionId = state.sessionId;
    const saves = state.selectionSaves;
    const save = saves[questionId] || (saves[questionId] = {});
    if (!sessionId || save.inFlight) return;
    const value = state.answers[questionId];
    save.inFlight = true;
    save.status = 'saving';
    try {
      await api('POST', '/exam/' + sessionId + '/answer', { questionId: questionId, answer: value });
      save.status = 'saved';
    } catch (e) {
      save.status = 'failed';
    } finally {
      save.inFlight = false;
    }
    if (state.sessionId !== sessionId) return;
    if (state.answers[questionId] !== value) {
      App.saveSelection(questionId);
      return;
    }
    App.renderExamTabs();
    const current = state.questions[state.currentIndex];
    if (current && current.questionId === questionId) App.renderAnswerState(current);
  };

  // ── AI help switch (exam mode) ──────────────────────────────────────────────
  // Every exam starts with AI help off and the server refuses AI requests for
  // its questions. Switching it on marks the exam as assisted for good.
  App.toggleExamAssistance = async function(checkbox) {
    const sessionId = state.sessionId;
    if (!sessionId || !App.isDeferredExam()) return;
    const enable = checkbox.checked;
    if (enable) {
      const ok = window.confirm(
        'کمک هوش مصنوعی (ترجمه، تئوری و گرامر) ممکن است پاسخ درست را لو بدهد.\n' +
        'با روشن کردنش، این آزمون «با کمک» ثبت می‌شود و در درصد قبولی حساب نمی‌شود — حتی اگر بعداً خاموشش کنی.'
      );
      if (!ok) {
        checkbox.checked = false;
        return;
      }
    } else {
      // Hide first; the server is told right after.
      state.aiEnabled = false;
      App._resetAiPanel();
      const current = state.questions[state.currentIndex];
      if (current) App.renderQuestionSource(current);
    }

    checkbox.disabled = true;
    try {
      const result = await api('POST', '/exam/' + sessionId + '/assistance', { enabled: enable });
      if (state.sessionId !== sessionId) return;
      state.aiEnabled = result.enabled === true;
      state.aiAssisted = result.assisted === true;
    } catch (e) {
      if (state.sessionId !== sessionId) return;
      if (enable) state.aiEnabled = false;
      App.toast(enable ? 'کمک هوش مصنوعی روشن نشد؛ دوباره امتحان کن.' : 'خاموش شدن کمک در سرور ثبت نشد؛ پنل بسته ماند.');
    } finally {
      checkbox.disabled = false;
    }
    App._updateAiAvailability();
    const current = state.questions[state.currentIndex];
    if (current) App.renderQuestionSource(current);
  };

  // ── Flag / bookmark ─────────────────────────────────────────────────────────
  App.toggleFlag = async function() {
    const q = state.questions[state.currentIndex];
    if (!q) return;
    const wasFlagged = state.flags.has(q.questionId);
    if (wasFlagged) state.flags.delete(q.questionId);
    else state.flags.add(q.questionId);
    App._setFlagButtonState(state.flags.has(q.questionId));
    App.renderExamTabs();
    try {
      await api('POST', '/exam/' + state.sessionId + '/flag', {
        questionId: q.questionId, flagged: !wasFlagged,
      });
    } catch (e) {}
  };

  // ── TTS ─────────────────────────────────────────────────────────────────────
  App.speakQuestion = function() {
    App.speakItalian(document.getElementById('exam-question-text').textContent);
  };

  // Shared by the exam runner and lessons (Web Speech it-IT voice, §10).
  App.speakItalian = function(text) {
    if (!text) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'it-IT'; utt.rate = 0.9;
      window.speechSynthesis.speak(utt);
    } else {
      App.toast('پخش صدا روی این دستگاه پشتیبانی نمی‌شود');
    }
  };

  // ── §15.3 AI Panel — three independent tabs ──────────────────────────────────
  // features.md §19.2 user override: all three tabs, including the verdict, are
  // an open-book study aid on a live, unanswered question. No answer gate.
  // toggleTranslate: checkbox onchange — opens/closes the whole panel.
  // Opening always shows tab 0 (translation) and fires its request.
  // Tabs 1 and 2 only fire when the user explicitly taps them.
  App.toggleTranslate = async function() {
    state.translateOpen = !state.translateOpen;
    const panel = document.getElementById('translate-panel');
    if (!state.translateOpen) {
      panel.classList.remove('open');
      document.getElementById('exam-question-text').className = 'question-text';
      return;
    }
    panel.classList.add('open');
    // Always open to tab 0 on fresh open
    App.switchAiTab(0);
  };

  // switchAiTab: show the selected tab content; lazy-load if not yet fetched.
  App.switchAiTab = async function(tabIndex) {
    // Update tab button styles
    for (let i = 0; i <= 2; i++) {
      const btn = document.getElementById('ai-tab-btn-' + i);
      const content = document.getElementById('ai-tab-' + i);
      if (btn) {
        btn.classList.toggle('active', i === tabIndex);
        btn.setAttribute('aria-selected', i === tabIndex ? 'true' : 'false');
      }
      if (content) {
        content.style.display = i === tabIndex ? 'block' : 'none';
      }
    }

    const q = state.questions[state.currentIndex];
    if (!q) return;
    const requestGeneration = state.aiRequestGeneration;

    if (tabIndex === 0) {
      // Translation tab — load immediately (same as before)
      if (state.translationCache[q.questionId]) {
        App.showTranslation(state.translationCache[q.questionId]);
        return;
      }
      document.getElementById('translate-text').textContent = 'در حال ترجمه…';
      document.getElementById('translate-explanation').textContent = '';
      document.getElementById('translate-explanation').style.display = 'none';
      document.getElementById('translate-verdict').style.display = 'none';
      try {
        const data = await App.getAiRequest(
          requestGeneration + ':translation:' + q.questionId,
          function() { return api('POST', '/translate/' + q.questionId); }
        );
        // An empty answer is not cached, so reopening the panel retries it.
        if (data.translatedText) state.translationCache[q.questionId] = data;
        if (!App.isAiRequestCurrent(q.questionId, requestGeneration)) return;
        App.showTranslation(data);
      } catch (e) {
        if (!App.isAiRequestCurrent(q.questionId, requestGeneration)) return;
        document.getElementById('translate-text').textContent = 'ترجمه در دسترس نیست: ' + (e.message || 'دوباره تلاش کنید');
      }
    } else if (tabIndex === 1) {
      // Theory tab — lazy: only fires on first tap for this question
      await App.loadTheoryTab(q.questionId);
    } else if (tabIndex === 2) {
      // Grammar tab — lazy: only fires on first tap for this question
      await App.loadGrammarTab(q.questionId);
    }
  };

  App.showTranslation = function(data) {
    const verdictEl = document.getElementById('translate-verdict');
    const explanationEl = document.getElementById('translate-explanation');

    // §19.2: verdict first, then the faithful translation, then the explanation.
    if (verdictEl) {
      const isVero = data.verdictVero === true;
      const label = isVero ? 'VERO' : 'FALSO';
      verdictEl.innerHTML = '<span class="result-verdict-pill ' + (isVero ? 'vero' : 'falso') + '">پاسخ: ' + label + '</span>';
      verdictEl.style.display = 'block';
    }
    document.getElementById('translate-text').textContent = data.translatedText || 'ترجمه فعلاً در دسترس نیست.';
    const quality = document.getElementById('translate-quality');
    if (quality) App.renderContentQuality(quality, data);
    if (explanationEl) {
      explanationEl.style.display = data.explanation ? 'block' : 'none';
      App.renderRichText(explanationEl, data.explanation || '');
    }
    document.getElementById('exam-question-text').classList.add('translated');
  };

  // loadTheoryTab: fetches theory once per question, caches in state.theoryCache
  App.loadTheoryTab = async function(questionId) {
    const loadingEl = document.getElementById('theory-loading');
    const textEl = document.getElementById('theory-text');
    const errorEl = document.getElementById('theory-error');
    const qualityEl = document.getElementById('theory-quality');
    const render = function(data) {
      App.renderRichText(textEl, data.theoryText || 'توضیح این سؤال فعلاً در دسترس نیست.');
      if (qualityEl) App.renderContentQuality(qualityEl, data);
    };
    if (state.theoryCache && state.theoryCache[questionId]) {
      loadingEl.style.display = 'none';
      errorEl.style.display = 'none';
      render(state.theoryCache[questionId]);
      return;
    }
    const requestGeneration = state.aiRequestGeneration;
    loadingEl.style.display = 'block';
    textEl.textContent = '';
    if (qualityEl) qualityEl.replaceChildren();
    errorEl.style.display = 'none';
    try {
      const data = await App.getAiRequest(
        requestGeneration + ':theory:' + questionId,
        function() { return api('POST', '/translate/' + questionId + '/theory'); }
      );
      if (!state.theoryCache) state.theoryCache = {};
      if (data.theoryText) state.theoryCache[questionId] = data;
      if (!App.isAiRequestCurrent(questionId, requestGeneration)) return;
      render(data);
    } catch (e) {
      if (!App.isAiRequestCurrent(questionId, requestGeneration)) return;
      errorEl.textContent = 'مربی تئوری در دسترس نیست — دوباره تلاش کنید';
      errorEl.style.display = 'block';
    } finally {
      if (App.isAiRequestCurrent(questionId, requestGeneration)) {
        loadingEl.style.display = 'none';
      }
    }
  };

  // loadGrammarTab: fetches grammar+vocab once per question, caches in state.grammarCache
  App.loadGrammarTab = async function(questionId) {
    const loadingEl = document.getElementById('grammar-loading');
    const analysisEl = document.getElementById('grammar-analysis');
    const errorEl = document.getElementById('grammar-error');
    const listEl = document.getElementById('vocab-suggestions-list');
    if (state.grammarCache && state.grammarCache[questionId]) {
      const cached = state.grammarCache[questionId];
      loadingEl.style.display = 'none';
      errorEl.style.display = 'none';
      App.renderRichText(analysisEl, cached.grammarAnalysis || '');
      App.renderVocabSuggestions(cached.vocabSuggestions || [], questionId);
      return;
    }
    const requestGeneration = state.aiRequestGeneration;
    loadingEl.style.display = 'block';
    analysisEl.textContent = '';
    listEl.innerHTML = '';
    errorEl.style.display = 'none';
    try {
      const data = await App.getAiRequest(
        requestGeneration + ':grammar:' + questionId,
        function() { return api('POST', '/translate/' + questionId + '/grammar'); }
      );
      if (!state.grammarCache) state.grammarCache = {};
      state.grammarCache[questionId] = { grammarAnalysis: data.grammarAnalysis, vocabSuggestions: data.vocabSuggestions };
      if (!App.isAiRequestCurrent(questionId, requestGeneration)) return;
      App.renderRichText(analysisEl, data.grammarAnalysis || '');
      App.renderVocabSuggestions(data.vocabSuggestions || [], questionId);
    } catch (e) {
      if (!App.isAiRequestCurrent(questionId, requestGeneration)) return;
      errorEl.textContent = 'معلم گرامر در دسترس نیست — دوباره تلاش کنید';
      errorEl.style.display = 'block';
    } finally {
      if (App.isAiRequestCurrent(questionId, requestGeneration)) {
        loadingEl.style.display = 'none';
      }
    }
  };

  // renderVocabSuggestions: renders each vocab word as a row with a + save button
  // Each + button calls addVocabFromAgent — same flow as long-press-to-vocab (§12.2)
  App.renderVocabSuggestions = function(vocabItems, questionId) {
    const listEl = document.getElementById('vocab-suggestions-list');
    listEl.innerHTML = '';
    if (!vocabItems || vocabItems.length === 0) return;
    vocabItems.forEach(function(item) {
      const row = document.createElement('div');
      row.className = 'vocab-suggestion-row';
      const wordPair = document.createElement('div');
      wordPair.className = 'vocab-suggestion-copy';
      const itSpan = document.createElement('span');
      itSpan.className = 'vocab-suggestion-it';
      itSpan.textContent = item.term_it || '';
      const faSpan = document.createElement('span');
      faSpan.className = 'vocab-suggestion-fa';
      faSpan.textContent = item.term_fa || '';
      wordPair.appendChild(itSpan);
      wordPair.appendChild(faSpan);
      const addBtn = document.createElement('button');
      addBtn.className = 'text-button vocab-suggestion-add';
      addBtn.textContent = '+ واژه‌نامه';
      addBtn.onclick = function() {
        // Reuse existing addVocabFromAgent — identical to long-press flow (§12.2)
        App.addVocabFromAgent(item.term_it, item.term_fa, questionId, addBtn);
      };
      row.appendChild(wordPair);
      row.appendChild(addBtn);
      listEl.appendChild(row);
    });
  };

  // §15: clear AI tab caches when switching question so stale data never shows
  // Bookmark/flag icon button — toggles both the visual "active" state and
  // aria-pressed so screen readers announce whether this question is flagged.
  App._setFlagButtonState = function(flagged) {
    const btn = document.getElementById('btn-flag');
    if (!btn) return;
    btn.classList.toggle('active', flagged);
    btn.setAttribute('aria-pressed', flagged ? 'true' : 'false');
  };

  App.isAiRequestCurrent = function(questionId, requestGeneration) {
    const q = state.questions[state.currentIndex];
    return (
      !!q &&
      q.questionId === questionId &&
      state.translateOpen &&
      state.aiRequestGeneration === requestGeneration
    );
  };

  App.getAiRequest = function(key, requestFactory) {
    if (!state.aiPendingRequests) state.aiPendingRequests = {};
    if (state.aiPendingRequests[key]) return state.aiPendingRequests[key];

    const pending = Promise.resolve().then(requestFactory);
    state.aiPendingRequests[key] = pending;
    const clear = function() {
      if (state.aiPendingRequests[key] === pending) {
        delete state.aiPendingRequests[key];
      }
    };
    pending.then(clear, clear);
    return pending;
  };

  App._updateAiAvailability = function() {
    const toggle = document.getElementById('translate-toggle');
    const label = toggle ? toggle.closest('.ai-toggle-label') : null;
    const sub = document.getElementById('ai-toggle-sub');
    const deferred = App.isDeferredExam();
    const locked = deferred && !state.aiEnabled;

    // Practice and review: the panel is open-book (§19.2). Exam mode: only
    // after the learner switches AI help on.
    if (toggle) toggle.disabled = locked;
    if (label) {
      label.classList.remove('locked');
      label.hidden = locked;
    }
    if (sub) {
      sub.textContent = !deferred
        ? 'ترجمه، تئوری و گرامر — همین حالا قابل استفاده است'
        : locked
          ? 'آزمون بدون کمک: پاسخ‌ها تا پایان آزمون مشخص نمی‌شوند.'
          : 'کمک روشن است و ممکن است پاسخ را لو بدهد.';
    }

    const toolsRow = document.querySelector('.exam-tools-row');
    if (toolsRow) {
      toolsRow.classList.toggle('has-ai-switch', deferred);
      toolsRow.classList.toggle('ai-locked', locked);
    }
    const switchRow = document.getElementById('exam-ai-switch-row');
    if (switchRow) switchRow.hidden = !deferred;
    const switchInput = document.getElementById('exam-ai-switch');
    if (switchInput) switchInput.checked = deferred && state.aiEnabled;
    const badge = document.getElementById('exam-assisted-badge');
    if (badge) badge.hidden = !(deferred && state.aiAssisted);
  };

  App._resetAiPanel = function() {
    state.translateOpen = false;
    const tog = document.getElementById('translate-toggle');
    if (tog) tog.checked = false;
    const panel = document.getElementById('translate-panel');
    if (panel) panel.classList.remove('open');
    document.getElementById('exam-question-text').className = 'question-text';
    App._updateAiAvailability();
  };


  App.addVocabFromChip = async function(btn) {
    if (!btn) return;
    const termIt = btn.getAttribute('data-term-it') || '';
    const termFa = btn.getAttribute('data-term-fa') || '';
    const sourceQId = Number(btn.getAttribute('data-qid')) || null;
    await App.addVocabFromAgent(termIt, termFa, sourceQId, btn);
  };

  App.addVocabFromAgent = async function(termIt, termFa, sourceQuestionId, btn) {

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'در حال ذخیره…';
    }
    try {
      await api('POST', '/vocab', {
        termIt: termIt,
        termFa: termFa,
        sourceQuestionId: sourceQuestionId
      });
      App.toast('به واژه‌نامه اضافه شد.');
      if (btn) {
        btn.textContent = '✓ اضافه شد';
        btn.style.color = 'var(--go-light)';
      }
    } catch (e) {
      App.toast('خطا در ثبت واژه');
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'افزودن';
      }
    }
  };


  // ── Finish exam ─────────────────────────────────────────────────────────────
  App.finishExam = async function(options) {
    options = options || {};
    const finishingSessionId = state.sessionId;
    if (!finishingSessionId || state.finishPending) return;
    const deferred = App.isDeferredExam();
    if (deferred && !options.auto) {
      const unanswered = state.questions.length - Object.keys(state.answers).length;
      if (unanswered > 0) {
        const ok = window.confirm(
          unanswered + ' سؤال بی‌پاسخ مانده و غلط حساب می‌شود.\nآزمون را تمام می‌کنی؟'
        );
        if (!ok || state.sessionId !== finishingSessionId) return;
      }
    }
    if (!deferred && Object.keys(state.answerPending).length > 0) {
      setTimeout(function() {
        if (state.sessionId === finishingSessionId) App.finishExam();
      }, 250);
      return;
    }

    state.finishPending = true;
    const finishBtn = document.getElementById('btn-finish-exam');
    if (finishBtn) finishBtn.disabled = true;
    clearInterval(state.timerInterval);
    const durationSeconds = Math.round((Date.now() - state.startedAt) / 1000);
    let data;
    try {
      // Exam mode sends every selection, so one whose save failed still counts.
      data = await api('POST', '/exam/' + finishingSessionId + '/finish', deferred
        ? { durationSeconds: durationSeconds, answers: state.answers }
        : { durationSeconds: durationSeconds });
    } catch (e) {
      if (state.sessionId === finishingSessionId) {
        App.toast('خطا در ثبت نتایج: ' + e.message);
      }
      return;
    } finally {
      if (state.sessionId === finishingSessionId) {
        state.finishPending = false;
        if (finishBtn) finishBtn.disabled = false;
      }
    }
    if (state.sessionId !== finishingSessionId) return;
    state.sessionId = null;
    App.clearStoredExamSelections();
    document.getElementById('bottom-nav').style.display = '';
    state.examMode = null;
    App.applyExamMode();
    App.renderResults(data);
    App.showScreen('results');
  };

  // ── Results ─────────────────────────────────────────────────────────────────
  App.renderResults = function(data) {
    state.lastFinishedSessionId = data.sessionId;

    const tutorBanner = document.getElementById('results-tutor-banner');
    const reviewBtn = document.getElementById('results-review-btn');
    const nextStep = document.getElementById('results-next-step');
    if (tutorBanner) {
      if (data.wrongCount > 0) {
        tutorBanner.style.display = 'block';
        if (nextStep) nextStep.style.display = 'block';
        if (reviewBtn) reviewBtn.style.display = 'inline-flex';
        const bannerText = document.getElementById('results-tutor-banner-text');
        if (bannerText) {
          bannerText.textContent = 'تحلیل و رفع اشکال ' + data.wrongCount + ' سوال غلط با استاد AI';
        }
      } else {
        tutorBanner.style.display = 'none';
        if (nextStep) nextStep.style.display = 'none';
        if (reviewBtn) reviewBtn.style.display = 'none';
      }
    }

    const badge = document.getElementById('results-badge');
    badge.className = 'result-badge ' + (data.passed ? 'pass' : 'fail');
    badge.textContent = data.passed ? 'قبول شدی' : 'نیاز به مرور';

    // New copy voice from design.md. Practice sessions are shorter than 30 and
    // finishExamSession allows 1 mistake up to 10 questions, 3 above that.
    const totalQuestions = Array.isArray(data.answers) && data.answers.length ? data.answers.length : 30;
    const allowedWrong = totalQuestions <= 10 ? 1 : 3;
    document.getElementById('results-score').textContent =
      data.score.toLocaleString('fa-IR') + ' از ' + totalQuestions.toLocaleString('fa-IR');
    document.getElementById('results-detail').textContent =
      data.passed
        ? data.wrongCount.toLocaleString('fa-IR') + ' اشتباه؛ حد قبولی را رد نکردی.'
        : data.wrongCount.toLocaleString('fa-IR') + ' اشتباه؛ برای قبولی حداکثر ' + allowedWrong.toLocaleString('fa-IR') + ' اشتباه مجاز است.';
    const assistedNote = document.getElementById('results-assisted-note');
    if (assistedNote) assistedNote.hidden = data.aiAssisted !== true;
    const listHeading = document.getElementById('results-list-heading');
    if (listHeading) listHeading.textContent = 'جزئیات ' + totalQuestions.toLocaleString('fa-IR') + ' سؤال';

    const correctCount = Array.isArray(data.answers)
      ? data.answers.filter(function(answer) { return Boolean(answer.isCorrect); }).length
      : data.score;
    const unansweredCount = Array.isArray(data.answers)
      ? data.answers.filter(function(answer) { return answer.userAnswer === null; }).length
      : Math.max(0, 30 - correctCount - data.wrongCount);
    const answeredWrongCount = Array.isArray(data.answers)
      ? data.answers.filter(function(answer) {
          return answer.userAnswer !== null && !answer.isCorrect;
        }).length
      : Math.max(0, data.wrongCount - unansweredCount);
    const correctEl = document.getElementById('results-correct-count');
    const wrongEl = document.getElementById('results-wrong-count');
    const unansweredEl = document.getElementById('results-unanswered-count');
    if (correctEl) correctEl.textContent = String(correctCount);
    if (wrongEl) wrongEl.textContent = String(answeredWrongCount);
    if (unansweredEl) unansweredEl.textContent = String(unansweredCount);

    const min = Math.floor(data.durationSeconds / 60);
    const sec = String(data.durationSeconds % 60).padStart(2, '0');
    document.getElementById('results-time').textContent = 'زمان پاسخ‌گویی ' + min + ':' + sec;

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
      // Full text, wrapped — truncating to one line hid the question the
      // translation below it is explaining.
      questionLine.className = 'result-question-line';
      questionLine.textContent = a.position + '. ' + a.textIt;

      const answerLine = document.createElement('div');
      answerLine.className = 'result-answer-line';
      answerLine.dir = 'ltr';
      answerLine.textContent =
        'Risposta corretta: ' + (a.correctAnswer === 1 ? 'VERO' : 'FALSO') +
        (a.userAnswer !== null ? ' · La tua risposta: ' + (a.userAnswer === 1 ? 'VERO' : 'FALSO') : ' · Senza risposta');

      const translateBtn = document.createElement('button');
      translateBtn.className = 'result-translate-btn';
      translateBtn.textContent = 'ترجمه';
      translateBtn.onclick = function() { App.translateResult(a.questionId, translateBtn); };

      back.appendChild(questionLine);
      back.appendChild(answerLine);
      const sourceBlock = document.createElement('div');
      App.renderSourceBlock(sourceBlock, a.source, a.questionId, false);
      back.appendChild(sourceBlock);
      back.appendChild(translateBtn);
      // Route a mistake back to the exact lesson section that teaches it —
      // only when the curated mapping exists. The copy stays neutral: we do
      // not know why the answer was wrong.
      if (!a.isCorrect && a.lessonLink) {
        const lessonBtn = document.createElement('button');
        lessonBtn.type = 'button';
        lessonBtn.className = 'result-lesson-btn';
        lessonBtn.textContent = 'مرور همین مبحث در درس «' + a.lessonLink.titleFa + '»';
        lessonBtn.onclick = function() { App.openLesson(a.lessonLink.lessonId, a.lessonLink.step, 'results'); };
        back.appendChild(lessonBtn);
      }
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

  // §14.1: simplified — no more driving/grammar rendering in results
  App.translateResult = async function(questionId, btn) {
    btn.disabled = true;
    btn.textContent = 'در حال ترجمه…';
    try {
      const data = await api('POST', '/translate/' + questionId);
      const container = btn.parentElement;

      const block = document.createElement('div');
      block.className = 'fa-text result-translation-block';

      // §19.2: verdict badge first, then translation, then explanation
      const isVero = data.verdictVero === true;
      const label = isVero ? 'VERO' : 'FALSO';
      let content =
        '<div class="result-verdict-row">' +
        '<span class="result-verdict-pill ' + (isVero ? 'vero' : 'falso') + '">' +
        (isVero ? 'درست: ' : 'نادرست: ') + label + '</span></div>';
      content += '<div class="result-translation-label">ترجمه فارسی</div><div class="result-translation-text">' + App.escapeHtml(data.translatedText) + '</div>';
      block.innerHTML = content;
      const quality = document.createElement('div');
      App.renderContentQuality(quality, data);
      block.appendChild(quality);
      if (data.explanation) {
        const explanationBlock = document.createElement('div');
        explanationBlock.className = 'result-translation-explanation';
        const explanationIcon = document.createElement('span');
        explanationIcon.className = 'result-explanation-label';
        explanationIcon.textContent = 'چرا؟';
        const explanationBody = document.createElement('div');
        App.renderRichText(explanationBody, data.explanation);
        explanationBlock.appendChild(explanationIcon);
        explanationBlock.appendChild(explanationBody);
        block.appendChild(explanationBlock);
      }
      container.insertBefore(block, btn);
      btn.style.display = 'none';
      // The row grows a lot when the explanation lands — bring it into view.
      block.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (e) {
      btn.textContent = '⟳ دوباره';
      btn.disabled = false;
    }
  };
