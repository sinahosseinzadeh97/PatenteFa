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
  App.startExam = async function(mode) {
    mode = mode || 'exam';
    const returnScreen = state.currentScreen && state.currentScreen !== 'exam'
      ? state.currentScreen
      : 'home';
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
      state.examMode = mode;
      state.examReturnScreen = returnScreen;

      App.showScreen('exam');
      document.getElementById('bottom-nav').style.display = 'none';
      App.applyExamMode();
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

  // ── §15.3 AI Panel — three independent tabs ──────────────────────────────────
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

    if (tabIndex === 0) {
      // Translation tab — load immediately (same as before)
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
        document.getElementById('translate-text').textContent = '⚠ خطا: ' + (e.message || 'ترجمه در دسترس نیست');
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
    // §19.2: render verdict badge ABOVE translated text
    const verdictEl = document.getElementById('translate-verdict');
    if (verdictEl) {
      const isVero = data.verdictVero === true;
      const label = isVero ? 'VERO' : 'FALSO';
      const labelFa = 'پاسخ: ' + label;
      verdictEl.innerHTML =
        '<span class="fa-text" style="display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:20px;font-size:0.82rem;font-weight:700;' +
        (isVero
          ? 'background:rgba(22,163,74,0.15);color:var(--go);border:1px solid rgba(22,163,74,0.35);'
          : 'background:rgba(220,38,38,0.12);color:var(--stop);border:1px solid rgba(220,38,38,0.3);') +
        '">' + (isVero ? '✅' : '❌') + ' ' + labelFa + '</span>';
      verdictEl.style.display = 'block';
    }
    document.getElementById('translate-text').textContent = data.translatedText || '';
    document.getElementById('translate-explanation').textContent = data.explanation || '';
    document.getElementById('exam-question-text').classList.add('translated');
  };

  // loadTheoryTab: fetches theory once per question, caches in state.theoryCache
  App.loadTheoryTab = async function(questionId) {
    if (state.theoryCache && state.theoryCache[questionId]) {
      App.renderRichText(document.getElementById('theory-text'), state.theoryCache[questionId]);
      return;
    }
    const loadingEl = document.getElementById('theory-loading');
    const textEl = document.getElementById('theory-text');
    const errorEl = document.getElementById('theory-error');
    loadingEl.style.display = 'block';
    textEl.textContent = '';
    errorEl.style.display = 'none';
    try {
      const data = await api('POST', '/translate/' + questionId + '/theory');
      if (!state.theoryCache) state.theoryCache = {};
      state.theoryCache[questionId] = data.theoryText || '';
      App.renderRichText(textEl, data.theoryText || '');
    } catch (e) {
      errorEl.textContent = 'مربی تئوری در دسترس نیست — دوباره تلاش کنید';
      errorEl.style.display = 'block';
    } finally {
      loadingEl.style.display = 'none';
    }
  };

  // loadGrammarTab: fetches grammar+vocab once per question, caches in state.grammarCache
  App.loadGrammarTab = async function(questionId) {
    if (state.grammarCache && state.grammarCache[questionId]) {
      const cached = state.grammarCache[questionId];
      App.renderRichText(document.getElementById('grammar-analysis'), cached.grammarAnalysis || '');
      App.renderVocabSuggestions(cached.vocabSuggestions || [], questionId);
      return;
    }
    const loadingEl = document.getElementById('grammar-loading');
    const analysisEl = document.getElementById('grammar-analysis');
    const errorEl = document.getElementById('grammar-error');
    const listEl = document.getElementById('vocab-suggestions-list');
    loadingEl.style.display = 'block';
    analysisEl.textContent = '';
    listEl.innerHTML = '';
    errorEl.style.display = 'none';
    try {
      const data = await api('POST', '/translate/' + questionId + '/grammar');
      if (!state.grammarCache) state.grammarCache = {};
      state.grammarCache[questionId] = { grammarAnalysis: data.grammarAnalysis, vocabSuggestions: data.vocabSuggestions };
      App.renderRichText(analysisEl, data.grammarAnalysis || '');
      App.renderVocabSuggestions(data.vocabSuggestions || [], questionId);
    } catch (e) {
      errorEl.textContent = 'معلم گرامر در دسترس نیست — دوباره تلاش کنید';
      errorEl.style.display = 'block';
    } finally {
      loadingEl.style.display = 'none';
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
      row.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:7px 10px;background:var(--surface-2);border-radius:8px;border:1px solid var(--border);gap:8px;';
      const wordPair = document.createElement('div');
      wordPair.style.cssText = 'display:flex;flex-direction:column;gap:2px;min-width:0;flex:1;';
      const itSpan = document.createElement('span');
      itSpan.style.cssText = 'font-family:"Public Sans",sans-serif;font-size:0.82rem;font-weight:600;color:var(--ink);';
      itSpan.textContent = item.term_it || '';
      const faSpan = document.createElement('span');
      faSpan.style.cssText = 'font-family:"Vazirmatn",sans-serif;font-size:0.75rem;color:var(--ink-muted);direction:rtl;';
      faSpan.textContent = item.term_fa || '';
      wordPair.appendChild(itSpan);
      wordPair.appendChild(faSpan);
      const addBtn = document.createElement('button');
      addBtn.style.cssText = 'flex-shrink:0;padding:5px 10px;background:none;border:1px solid var(--border);border-radius:6px;color:var(--ink-muted);font-size:0.72rem;cursor:pointer;font-family:"Vazirmatn",sans-serif;transition:all 150ms;white-space:nowrap;';
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

  App._resetAiPanel = function() {
    state.translateOpen = false;
    const tog = document.getElementById('translate-toggle');
    if (tog) tog.checked = false;
    const panel = document.getElementById('translate-panel');
    if (panel) panel.classList.remove('open');
    document.getElementById('exam-question-text').className = 'question-text';
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
      btn.textContent = '⏳';
    }
    try {
      await api('POST', '/vocab', {
        termIt: termIt,
        termFa: termFa,
        sourceQuestionId: sourceQuestionId
      });
      App.toast('به واژه‌نامه اضافه شد! 📚');
      if (btn) {
        btn.textContent = '✓ اضافه شد';
        btn.style.color = 'var(--go-light)';
      }
    } catch (e) {
      App.toast('خطا در ثبت واژه');
      if (btn) {
        btn.disabled = false;
        btn.textContent = '➕ افزودن';
      }
    }
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
    state.examMode = null;
    App.applyExamMode();
    App.renderResults(data);
    App.showScreen('results');
  };

  // ── Results ─────────────────────────────────────────────────────────────────
  App.renderResults = function(data) {
    state.lastFinishedSessionId = data.sessionId;

    const tutorBanner = document.getElementById('results-tutor-banner');
    if (tutorBanner) {
      if (data.wrongCount > 0) {
        tutorBanner.style.display = 'block';
        const bannerText = document.getElementById('results-tutor-banner-text');
        if (bannerText) {
          bannerText.textContent = 'تحلیل و رفع اشکال ' + data.wrongCount + ' سوال غلط با استاد AI';
        }
      } else {
        tutorBanner.style.display = 'none';
      }
    }

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
      // Full text, wrapped — truncating to one line hid the question the
      // translation below it is explaining.
      questionLine.className = 'result-question-line';
      questionLine.textContent = a.position + '. ' + a.textIt;

      const answerLine = document.createElement('div');
      answerLine.className = 'result-answer-line';
      answerLine.dir = 'ltr';
      answerLine.textContent =
        'Risposta: ' + (a.correctAnswer === 1 ? 'VERO' : 'FALSO') +
        (a.userAnswer !== null ? ' · Tu: ' + (a.userAnswer === 1 ? 'VERO' : 'FALSO') : ' · Saltato');

      const translateBtn = document.createElement('button');
      translateBtn.className = 'result-translate-btn';
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

  // §14.1: simplified — no more driving/grammar rendering in results
  App.translateResult = async function(questionId, btn) {
    btn.disabled = true;
    btn.textContent = '⏳';
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
        (isVero ? '✅' : '❌') + ' پاسخ: ' + label + '</span></div>';
      content += '<div class="result-translation-text">🌐 ' + App.escapeHtml(data.translatedText) + '</div>';
      if (data.explanation) {
        content += '<div class="result-translation-explanation">💡 ' + App.escapeHtml(data.explanation) + '</div>';
      }

      block.innerHTML = content;
      container.insertBefore(block, btn);
      btn.style.display = 'none';
      // The row grows a lot when the explanation lands — bring it into view.
      block.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (e) {
      btn.textContent = '⟳ دوباره';
      btn.disabled = false;
    }
  };

