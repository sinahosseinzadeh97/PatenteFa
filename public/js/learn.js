/**
 * public/js/learn.js
 * Learning path client: "today's path" on home, the chapter route on topics,
 * and the guided lesson screen. Classic script loaded after app.js and exam.js;
 * shares their `state`, `api` and `App` globals (see src/app/client.ts).
 *
 * Persistence rule: nothing is shown as saved until the server confirmed it.
 * Reading steps works offline once a lesson is loaded; progress saves are
 * monotonic on the server, so a retry can never move the learner backwards.
 */
'use strict';

  state.learn = null;
  state.learnPromise = null;
  state.lesson = null;
  state.lessonStep = 0;
  state.lessonMaxStep = 0;
  state.lessonReturnScreen = 'topics';
  state.lessonRequestId = 0;
  state.lessonSaveFailed = false;
  state.lessonAnswerPending = false;
  state.lessonFinishPending = false;
  state.lessonCompletion = null;
  state.lessonBackToPractice = null;
  state.lessonTheoryCache = {};

  var FOCUS_LABELS = {
    negation: 'نفی',
    limit: 'محدودکننده',
    always: 'بدون استثنا',
    condition: 'شرط',
    reason: 'دلیل',
    contrast: 'تقابل',
  };

  function esc(value) { return App.escapeHtml(value == null ? '' : String(value)); }
  function fa(n) { return Number(n || 0).toLocaleString('fa-IR'); }
  function signUrl(n) { return '/images/signs/' + n + '.png'; }
  function itSpan(text, cls) {
    return '<span class="' + (cls || 'it-text') + '" dir="ltr" lang="it">' + esc(text) + '</span>';
  }
  function icon(id) { return '<svg class="ui-icon" aria-hidden="true"><use href="#' + id + '"/></svg>'; }
  function minutesLabel(n) { return 'حدود ' + fa(n) + ' دقیقه'; }

  // ── Loading /api/learn ──────────────────────────────────────────────────────
  App.loadLearn = function() {
    if (state.learnPromise) return state.learnPromise;
    if (!state.learn) App.renderLearnLoading();
    var request = api('GET', '/learn')
      .then(function(data) {
        state.learn = data;
        App.renderTodayPath();
        App.renderChapterRoute();
        // The topic list shows a "lessons" button only for chapters that have them.
        if (state.allTopics && state.allTopics.length) App.filterTopics();
        return data;
      })
      .catch(function(e) {
        if (!state.learn) App.renderLearnError(e);
        return null;
      })
      .then(function(result) {
        state.learnPromise = null;
        return result;
      });
    state.learnPromise = request;
    return request;
  };

  App.renderLearnLoading = function() {
    var today = document.getElementById('home-today');
    if (today) today.setAttribute('aria-busy', 'true');
  };

  App.renderLearnError = function() {
    var retry = '<button type="button" class="btn btn-secondary btn-sm" onclick="App.loadLearn()">' + icon('i-review') + '<span>تلاش دوباره</span></button>';
    var title = document.getElementById('home-today-title');
    var list = document.getElementById('home-today-list');
    var actions = document.getElementById('home-today-actions');
    var minutes = document.getElementById('home-today-minutes');
    if (title) title.textContent = 'مسیر امروز بارگذاری نشد';
    if (list) list.innerHTML = '<li class="today-error" role="alert">اتصال برقرار نشد. پیشرفتت محفوظ است؛ دوباره تلاش کن.</li>';
    if (actions) actions.innerHTML = retry;
    if (minutes) minutes.textContent = '';
    var today = document.getElementById('home-today');
    if (today) today.setAttribute('aria-busy', 'false');
    var chapter = document.getElementById('learn-chapter');
    if (chapter) {
      chapter.innerHTML = '<div class="empty-state" role="alert">' + icon('i-alert') +
        '<strong>درس‌ها بارگذاری نشدند</strong><span>اتصال را بررسی کن و دوباره تلاش کن.</span>' + retry + '</div>';
    }
  };

  function allLessons() {
    return (state.learn.chapters || []).reduce(function(list, chapter) { return list.concat(chapter.lessons); }, []);
  }

  // ── Today's path (home) ─────────────────────────────────────────────────────
  function todayCopy(item) {
    if (item.kind === 'lesson') {
      var resume = item.mode === 'continue';
      return {
        icon: 'i-book',
        tag: 'درس',
        title: item.titleFa,
        detail: resume
          ? 'از قدم ' + fa(Math.min(item.step + 1, item.stepCount)) + ' از ' + fa(item.stepCount) + ' ادامه بده'
          : 'درس کوتاه با توضیح، تصویر و چند سؤال واقعی',
        action: resume ? 'ادامه‌ی درس' : 'شروع درس',
      };
    }
    if (item.kind === 'review') {
      return {
        icon: 'i-review',
        tag: 'مرور',
        title: fa(item.count) + ' سؤال برای مرور امروز',
        detail: 'سؤال‌هایی که قبلاً جوابشان با پاسخ بانک فرق داشت',
        action: 'شروع مرور',
      };
    }
    return {
      icon: 'i-target',
      tag: 'تمرین',
      title: fa(item.count) + ' سؤال واقعی مرتبط با درس‌هایت',
      detail: 'از بانک سؤال، درباره‌ی درس‌هایی که خواندی',
      action: 'شروع تمرین',
    };
  }

  App.renderTodayPath = function() {
    var card = document.getElementById('home-today');
    if (!card || !state.learn) return;
    var today = state.learn.today || { items: [], minutes: 0 };
    var items = today.items || [];
    var lessons = allLessons();
    var isNewLearner = lessons.every(function(l) { return l.state === 'not_started'; }) && !state.learn.reviewDue;

    document.getElementById('home-today-title').textContent = items.length === 0
      ? 'برای امروز کاری باقی نمانده'
      : isNewLearner ? 'از اینجا شروع کن' : 'قدم بعدی‌ات آماده است';
    document.getElementById('home-today-minutes').textContent = today.minutes ? minutesLabel(today.minutes) : '';

    var list = document.getElementById('home-today-list');
    list.innerHTML = items.map(function(item, i) {
      var copy = todayCopy(item);
      var inner =
        '<span class="today-dot" aria-hidden="true">' + fa(i + 1) + '</span>' +
        '<span class="today-copy"><span class="today-tag">' + icon(copy.icon) + copy.tag + '</span>' +
        '<strong>' + esc(copy.title) + '</strong><small>' + esc(copy.detail) + '</small></span>' +
        '<span class="today-item-min">' + fa(item.minutes) + ' دقیقه</span>';
      // The first item is the primary action below; later items stay tappable but quiet.
      return i === 0
        ? '<li class="today-item is-next">' + inner + '</li>'
        : '<li class="today-item"><button type="button" class="today-item-btn" onclick="App.startTodayItem(' + i + ')">' + inner + '</button></li>';
    }).join('');

    var actions = document.getElementById('home-today-actions');
    actions.innerHTML = items.length
      ? '<button type="button" class="btn btn-primary btn-full today-primary" onclick="App.startTodayItem(0)">' +
          '<span>' + esc(todayCopy(items[0]).action) + '</span>' + icon('i-chevron-left') + '</button>'
      : '<button type="button" class="btn btn-secondary btn-full" onclick="App.showScreen(\'topics\')">دیدن مسیر درس‌ها</button>';
    card.setAttribute('aria-busy', 'false');
  };

  App.startTodayItem = function(index) {
    var item = state.learn && state.learn.today && state.learn.today.items[index];
    if (!item) return;
    if (item.kind === 'lesson') App.openLesson(item.lessonId, undefined, state.currentScreen || 'home');
    else if (item.kind === 'review') App.startReview();
    else App.startLessonPractice(null);
  };

  // ── Chapter route (topics) ──────────────────────────────────────────────────
  function stopState(lesson, currentId) {
    if (lesson.state === 'completed') return { cls: 'is-done', label: 'خوانده شد' };
    if (lesson.state === 'in_progress') {
      return {
        cls: 'is-current',
        label: 'نیمه‌کاره، قدم ' + fa(Math.min(lesson.step + 1, lesson.stepCount)) + ' از ' + fa(lesson.stepCount),
      };
    }
    return { cls: lesson.id === currentId ? 'is-next' : 'is-todo', label: 'شروع‌نشده' };
  }

  App.renderChapterRoute = function() {
    var box = document.getElementById('learn-chapter');
    if (!box || !state.learn) return;
    var chapters = state.learn.chapters || [];
    // One recommended stop across all chapters: the lesson today's path starts with.
    var first = (state.learn.today && state.learn.today.items || []).find(function(i) { return i.kind === 'lesson'; });
    box.innerHTML = chapters.map(function(chapter, ci) {
      return chapterCardHtml(chapter, ci, first ? first.lessonId : null);
    }).join('') +
      '<p class="chapter-note">«خوانده شد» یعنی درس را تا آخر رفته‌ای، نه اینکه به آن مسلطی. تسلط را مرورها و تمرین‌های بعدی نشان می‌دهند.</p>';
  };

  function chapterCardHtml(chapter, ci, recommendedId) {
    var lessons = chapter.lessons;
    var current = lessons.find(function(l) { return l.state === 'in_progress'; }) ||
      lessons.find(function(l) { return l.id === recommendedId; }) ||
      lessons.find(function(l) { return l.state === 'not_started'; });
    var doneCount = lessons.filter(function(l) { return l.state === 'completed'; }).length;

    var stops = lessons.map(function(lesson, i) {
      var st = stopState(lesson, recommendedId);
      var marker = lesson.state === 'completed' ? icon('i-check') : fa(i + 1);
      var meta = [st.label, fa(lesson.minutes) + ' دقیقه'];
      if (lesson.practice.answered > 0) {
        meta.push('تمرین: ' + fa(lesson.practice.correct) + ' از ' + fa(lesson.practice.total) + ' درست در اولین تلاش');
      }
      var due = lesson.dueReview > 0
        ? '<button type="button" class="route-due" onclick="App.startLessonPractice(\'' + esc(lesson.id) + '\')">' +
            icon('i-review') + '<span>مرور امروز: ' + fa(lesson.dueReview) + ' سؤال</span></button>'
        : '';
      return '<li class="route-stop ' + st.cls + (lesson.dueReview > 0 ? ' has-due' : '') + '">' +
        '<span class="route-marker" aria-hidden="true">' + marker + '</span>' +
        '<div class="route-stop-main">' +
          '<button type="button" class="route-stop-body" onclick="App.openLesson(\'' + esc(lesson.id) + '\', undefined, \'topics\')">' +
            '<span class="route-stop-title">' + esc(lesson.titleFa) + '</span>' +
            itSpan(lesson.titleIt, 'route-stop-it') +
            '<span class="route-stop-meta">' + esc(meta.join('، ')) + '</span>' +
          '</button>' + due +
        '</div>' +
      '</li>';
    }).join('');

    var primary = current
      ? '<button type="button" class="btn ' + (current.id === recommendedId || current.state === 'in_progress' ? 'btn-primary' : 'btn-secondary') +
          ' btn-full" onclick="App.openLesson(\'' + esc(current.id) + '\', undefined, \'topics\')">' +
          '<span>' + (current.state === 'in_progress' ? 'ادامه‌ی درس ' : 'شروع درس ') + fa(lessons.indexOf(current) + 1) + '</span>' + icon('i-chevron-left') + '</button>'
      : '';
    var practice = doneCount > 0
      ? '<button type="button" class="btn btn-secondary btn-full" onclick="App.startLessonPractice(null)">' +
          icon('i-target') + '<span>تمرین ۱۰ سؤال واقعی از درس‌های خوانده‌شده</span></button>'
      : '';

    return '<article class="chapter-card">' +
        '<header class="chapter-head">' +
          '<div class="chapter-head-copy">' +
            '<span class="chapter-kicker">فصل ' + fa(ci + 1) + ' از ' + fa(state.learn.chapters.length) + '، ' + fa(lessons.length) + ' درس کوتاه</span>' +
            '<h3 class="chapter-title">' + esc(chapter.titleFa) + '</h3>' +
            itSpan(chapter.nameIt, 'chapter-it') +
            '<p class="chapter-summary">' + esc(chapter.summaryFa) + '</p>' +
          '</div>' +
          '<div class="chapter-count"><strong>' + fa(doneCount) + ' از ' + fa(lessons.length) + '</strong><small>خوانده شده</small></div>' +
        '</header>' +
        '<ol class="route" aria-label="مسیر درس‌های ' + esc(chapter.titleFa) + '">' + stops + '</ol>' +
        '<div class="chapter-actions">' + primary + practice + '</div>' +
      '</article>';
  }

  App.focusLearnSection = function() {
    var section = document.getElementById('learn-section');
    if (!section) return;
    section.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    section.focus({ preventScroll: true });
  };

  // ── Related practice (runs in the normal exam runner) ───────────────────────
  App.startLessonPractice = async function(lessonId) {
    if (state.examStartPending) return;
    state.examStartPending = true;
    var returnScreen = state.currentScreen === 'lesson'
      ? (state.lessonReturnScreen || 'topics')
      : (state.currentScreen || 'home');
    try {
      App.toast('در حال آماده‌سازی تمرین…');
      var data = await api('POST', '/learn/practice', lessonId ? { lessonId: lessonId } : {});
      App.initializeExamState(data, { secondsLeft: 600, mode: 'topic_practice', returnScreen: returnScreen });
      App.showScreen('exam');
      App.applyExamMode();
      App.renderExamTabs();
      App.renderQuestion();
      App.startTimer();
    } catch (e) {
      App.toast(e.message || 'تمرین شروع نشد. دوباره تلاش کن.');
    } finally {
      state.examStartPending = false;
    }
  };

  // ── Lesson screen ───────────────────────────────────────────────────────────
  function lessonSteps() {
    var lesson = state.lesson.lesson;
    var steps = lesson.steps.map(function(content, index) { return { type: 'content', content: content, index: index }; });
    lesson.practice.forEach(function(question, i) {
      steps.push({ type: 'practice', question: question, number: i + 1, total: lesson.practice.length });
    });
    steps.push({ type: 'done' });
    return steps;
  }

  App.openLesson = async function(lessonId, step, returnScreen) {
    var requestId = ++state.lessonRequestId;
    state.lessonReturnScreen = returnScreen || (state.currentScreen !== 'lesson' ? state.currentScreen : state.lessonReturnScreen) || 'topics';
    state.lesson = null;
    state.lessonCompletion = null;
    state.lessonBackToPractice = null;
    state.lessonSaveFailed = false;
    state.lessonAnswerPending = false;
    state.lessonFinishPending = false;
    App.showScreen('lesson');
    setSaveStatus(null);
    document.getElementById('lesson-topbar-title').textContent = '';
    document.getElementById('lesson-kicker').textContent = '';
    document.getElementById('lesson-step-count').textContent = '';
    document.getElementById('lesson-dock').hidden = true;
    document.getElementById('lesson-body').innerHTML =
      '<div class="loading-state lesson-loading" role="status"><div class="spinner" aria-hidden="true"></div><strong>در حال باز کردن درس…</strong></div>';

    try {
      var data = await api('GET', '/learn/lessons/' + encodeURIComponent(lessonId));
      if (requestId !== state.lessonRequestId) return;
      state.lesson = data;
      var last = data.lesson.stepCount - 1;
      var start = typeof step === 'number'
        ? step
        : data.progress.state === 'completed' ? 0 : data.progress.step;
      // The completion step is only reached through a confirmed /complete call.
      state.lessonStep = Math.max(0, Math.min(start, last - 1));
      state.lessonMaxStep = Math.max(state.lessonStep, data.progress.step);
      App.renderLessonStep({ focus: true });
      if (data.progress.state === 'not_started') App.saveLessonProgress();
    } catch (e) {
      if (requestId !== state.lessonRequestId) return;
      document.getElementById('lesson-body').innerHTML =
        '<div class="empty-state lesson-error" role="alert">' + icon('i-alert') +
        '<strong>درس باز نشد</strong><span>اتصال را بررسی کن. پیشرفت قبلی‌ات محفوظ است.</span>' +
        '<button type="button" class="btn btn-secondary btn-sm" onclick="App.openLesson(\'' + esc(lessonId) + '\', ' +
        (typeof step === 'number' ? step : 'undefined') + ', \'' + esc(state.lessonReturnScreen) + '\')">تلاش دوباره</button></div>';
    }
  };

  function setSaveStatus(kind) {
    var el = document.getElementById('lesson-save-status');
    if (!el) return;
    if (!kind) {
      el.hidden = true;
      el.innerHTML = '';
      return;
    }
    el.hidden = false;
    el.innerHTML = kind === 'finish'
      ? icon('i-alert') + '<span>پایان درس ثبت نشد.</span><button type="button" class="text-button" onclick="App.finishLesson()">تلاش دوباره</button>'
      : icon('i-alert') + '<span>پیشرفتت ذخیره نشد.</span><button type="button" class="text-button" onclick="App.saveLessonProgress()">تلاش دوباره</button>';
  }

  App.saveLessonProgress = function() {
    if (!state.lesson) return Promise.resolve();
    var requestId = state.lessonRequestId;
    var lessonId = state.lesson.lesson.id;
    var step = state.lessonMaxStep;
    return api('POST', '/learn/lessons/' + encodeURIComponent(lessonId) + '/progress', { step: step })
      .then(function(res) {
        if (requestId !== state.lessonRequestId) return;
        state.lesson.progress.step = Math.max(state.lesson.progress.step, res.step);
        if (state.lesson.progress.state === 'not_started') state.lesson.progress.state = 'in_progress';
        state.lessonSaveFailed = false;
        setSaveStatus(null);
      })
      .catch(function() {
        if (requestId !== state.lessonRequestId) return;
        state.lessonSaveFailed = true;
        setSaveStatus('progress');
      });
  };

  App.lessonGoTo = function(index, direction) {
    if (!state.lesson) return;
    var steps = lessonSteps();
    var target = Math.max(0, Math.min(index, steps.length - 2));
    state.lessonStep = target;
    App.renderLessonStep({ focus: true, direction: direction });
    if (target > state.lessonMaxStep || state.lessonSaveFailed) {
      state.lessonMaxStep = Math.max(state.lessonMaxStep, target);
      App.saveLessonProgress();
    }
  };

  App.lessonNext = function() {
    if (!state.lesson) return;
    var steps = lessonSteps();
    var step = steps[state.lessonStep];
    if (step.type === 'practice' && !state.lesson.answers[step.question.questionId]) return;
    if (orderPending(step)) return;
    if (steps[state.lessonStep + 1] && steps[state.lessonStep + 1].type === 'done') {
      App.finishLesson();
      return;
    }
    App.lessonGoTo(state.lessonStep + 1, 'forward');
  };

  App.lessonPrev = function() {
    if (state.lesson && state.lessonStep > 0) App.lessonGoTo(state.lessonStep - 1, 'back');
  };

  /** From practice feedback: reread the section that teaches this question. */
  App.lessonReread = function(conceptStep) {
    state.lessonBackToPractice = state.lessonStep;
    App.lessonGoTo(conceptStep, 'back');
  };

  App.lessonReturnToPractice = function() {
    var target = state.lessonBackToPractice;
    state.lessonBackToPractice = null;
    if (typeof target === 'number') App.lessonGoTo(target, 'forward');
  };

  App.renderLessonStep = function(options) {
    var data = state.lesson;
    if (!data) return;
    options = options || {};
    var steps = lessonSteps();
    var step = steps[state.lessonStep];
    var body = document.getElementById('lesson-body');

    document.getElementById('lesson-kicker').textContent =
      'درس ' + fa(data.position.index) + ' از ' + fa(data.position.total) + '، ' + data.chapter.titleFa;
    document.getElementById('lesson-topbar-title').textContent = data.lesson.titleFa;
    document.getElementById('lesson-step-count').textContent = 'قدم ' + fa(state.lessonStep + 1) + ' از ' + fa(steps.length);
    var pct = Math.round(((state.lessonStep + 1) / steps.length) * 100);
    document.getElementById('lesson-progress-fill').style.width = pct + '%';
    document.getElementById('lesson-progress').setAttribute('aria-valuenow', String(pct));

    var html;
    if (step.type === 'content') html = contentStepHtml(step.content, step.index);
    else if (step.type === 'practice') html = practiceStepHtml(step);
    else html = doneStepHtml();

    var banner = typeof state.lessonBackToPractice === 'number' && step.type === 'content'
      ? '<button type="button" class="lesson-return-banner" onclick="App.lessonReturnToPractice()">' + icon('i-chevron-left') +
          '<span>بازگشت به سؤال تمرین</span></button>'
      : '';
    body.innerHTML = '<div class="lesson-step' + (options.direction === 'back' ? ' enter-back' : ' enter-forward') + '">' + banner + html + '</div>';
    if (step.type === 'content' && (step.content.kind === 'scenario' || step.content.kind === 'order')) App.mountCrossing(step.content, step.index);
    else App.leaveCrossing();
    if (step.type === 'content' && step.content.kind === 'stopping') App.mountStopping(step.content, step.index);
    else App.leaveStopping();
    if (step.type === 'content' && step.content.kind === 'assess') App.mountAssess(step.content, step.index);
    else App.leaveAssess();
    if (step.type === 'content' && step.content.kind === 'manoeuvre') App.mountManoeuvre(step.content, step.index);
    else App.leaveManoeuvre();

    if (step.type === 'practice') {
      var statement = document.getElementById('lesson-statement');
      if (statement && !state.lesson.answers[step.question.questionId]) {
        App.wrapWordsForLongPress(statement, step.question.questionId);
      }
    }
    updateLessonDock(step, steps);

    if (options.focus) {
      window.scrollTo(0, 0);
      var heading = body.querySelector('[data-step-heading]');
      if (heading) heading.focus({ preventScroll: true });
    }
  };

  function updateLessonDock(step, steps) {
    var dock = document.getElementById('lesson-dock');
    var prev = document.getElementById('lesson-prev');
    var next = document.getElementById('lesson-next');
    var label = document.getElementById('lesson-next-label');
    dock.hidden = step.type === 'done';
    prev.disabled = state.lessonStep === 0;
    var nextIsDone = steps[state.lessonStep + 1] && steps[state.lessonStep + 1].type === 'done';
    if (step.type === 'practice' && !state.lesson.answers[step.question.questionId]) {
      next.disabled = true;
      label.textContent = 'اول جواب بده';
    } else if (orderPending(step)) {
      next.disabled = true;
      label.textContent = step.content.kind === 'stopping' ? 'اول پیش‌بینی کن'
        : step.content.kind === 'assess' ? 'اول صحنه‌ها را بسنج' : 'اول ترتیب را بررسی کن';
    } else {
      next.disabled = state.lessonFinishPending;
      label.textContent = state.lessonFinishPending ? 'در حال ثبت…' : nextIsDone ? 'پایان درس' : 'بعدی';
    }
  }

  /** "Who goes first?", the stopping explorer and "Assess the situation" block Next only the first time through. */
  function orderPending(step) {
    if (step.type !== 'content' || state.lessonStep < state.lessonMaxStep || state.lesson.progress.state === 'completed') return false;
    if (step.content.kind === 'order') return !App.crossingDone(step.index);
    if (step.content.kind === 'stopping') return !App.stoppingDone(step.index);
    if (step.content.kind === 'assess') return !App.assessDone(step.index);
    return false;
  }

  App.refreshLessonDock = function() {
    if (!state.lesson) return;
    var steps = lessonSteps();
    updateLessonDock(steps[state.lessonStep], steps);
  };

  function stepHeading(title) {
    return '<h2 class="lesson-step-title" tabindex="-1" data-step-heading>' + esc(title) + '</h2>';
  }

  function ruleLine(rule) {
    return rule ? '<p class="lesson-rule">مبنا: <bdi dir="ltr">' + esc(rule) + '</bdi></p>' : '';
  }

  function signFigure(ref, cls) {
    return '<figure class="' + (cls || 'sign-figure') + '">' +
      '<span class="sign-tile"><img src="' + signUrl(ref.sign) + '" alt="تابلوی ' + esc(ref.nameIt) + '" loading="lazy" /></span>' +
      '<figcaption>' + itSpan(ref.nameIt, 'sign-name-it') + '<span class="sign-name-fa">' + esc(ref.nameFa) + '</span></figcaption>' +
    '</figure>';
  }

  function contentStepHtml(content, index) {
    if (content.kind === 'intro') return introHtml(content);
    if (content.kind === 'compare') return compareHtml(content);
    if (content.kind === 'sequence') return sequenceHtml(content);
    if (content.kind === 'diagram') return diagramHtml(content);
    if (content.kind === 'terms') return termsHtml(content, index);
    if (content.kind === 'trap') return trapHtml(content, index);
    if (content.kind === 'scenario' || content.kind === 'order') return App.crossingStepHtml(content, index);
    if (content.kind === 'stopping') return App.stoppingStepHtml(content, index);
    if (content.kind === 'factors') return factorsHtml(content);
    if (content.kind === 'markings') return App.markingsStepHtml(content, index);
    if (content.kind === 'assess') return App.assessStepHtml(content, index);
    if (content.kind === 'manoeuvre') return App.manoeuvreStepHtml(content, index);
    return '';
  }

  /** What the bank says matters (VERO) next to what it says does not (FALSO); labelled, never colour alone. */
  function factorsHtml(content) {
    var columns = content.columns.map(function(column, i) {
      var items = column.items.map(function(item) {
        return '<li class="factor-item"><span class="factor-fa">' + esc(item.fa) + '</span>' + itSpan(item.it, 'factor-it') + '</li>';
      }).join('');
      return '<section class="factor-col ' + (i === 0 ? 'is-yes' : 'is-no') + '">' +
        '<h3 class="factor-title">' + icon(i === 0 ? 'i-check' : 'i-x') + '<span>' + esc(column.title) + '</span></h3>' +
        '<ul class="factor-list">' + items + '</ul></section>';
    }).join('');
    return stepHeading(content.title) +
      '<p class="lesson-text">' + esc(content.body) + '</p>' +
      '<div class="factors">' + columns + '</div>' +
      '<p class="lesson-takeaway">' + icon('i-sparkles') + '<span>' + esc(content.takeaway) + '</span></p>' +
      ruleLine(content.rule);
  }

  function introHtml(content) {
    var lesson = state.lesson.lesson;
    var signs = lesson.signs.map(function(n) {
      return '<span class="sign-tile sign-tile-sm"><img src="' + signUrl(n) + '" alt="" loading="lazy" /></span>';
    }).join('');
    return '<p class="lesson-meta">' + minutesLabel(lesson.minutes) + '، ' + fa(lesson.stepCount) + ' قدم کوتاه</p>' +
      '<h2 class="lesson-step-title lesson-hero-title" tabindex="-1" data-step-heading>' + esc(lesson.titleFa) + '</h2>' +
      itSpan(lesson.titleIt, 'lesson-hero-it') +
      (signs ? '<div class="lesson-sign-strip" aria-hidden="true">' + signs + '</div>' : '') +
      '<section class="lesson-block"><h3>' + icon('i-target') + 'هدف این درس</h3><p>' + esc(content.objective) + '</p></section>' +
      '<section class="lesson-block"><h3>' + icon('i-help') + 'چرا مهم است</h3><p>' + esc(content.why) + '</p></section>' +
      ruleLine(content.rule);
  }

  function compareHtml(content) {
    var rows = content.rows.map(function(row) {
      return '<div class="compare-row"><p class="compare-label">' + esc(row.label) + '</p>' +
        '<div class="compare-cells"><p>' + esc(row.values[0]) + '</p><p>' + esc(row.values[1]) + '</p></div></div>';
    }).join('');
    return stepHeading(content.title) +
      (content.body ? '<p class="lesson-text">' + esc(content.body) + '</p>' : '') +
      '<div class="compare"><div class="compare-head">' + signFigure(content.items[0]) + signFigure(content.items[1]) + '</div>' + rows + '</div>' +
      '<p class="lesson-takeaway">' + icon('i-sparkles') + '<span>' + esc(content.takeaway) + '</span></p>' +
      ruleLine(content.rule);
  }

  function sequenceHtml(content) {
    var lanes = content.lanes.map(function(lane) {
      return '<div class="seq-lane">' +
        '<div class="seq-road" role="img" aria-label="' + esc(lane.caption) + '">' +
          '<span class="sign-tile seq-sign"><img src="' + signUrl(lane.from.sign) + '" alt="" loading="lazy" /></span>' +
          '<span class="seq-track"><span class="seq-arrow" aria-hidden="true">' + icon('i-chevron-left') + '</span></span>' +
          '<span class="seq-end"><span class="seq-stopline" aria-hidden="true"></span>' +
            '<span class="sign-tile seq-sign"><img src="' + signUrl(lane.to.sign) + '" alt="" loading="lazy" /></span></span>' +
        '</div>' +
        '<p class="seq-caption">' + esc(lane.caption) + '</p>' +
      '</div>';
    }).join('');
    return stepHeading(content.title) +
      '<p class="lesson-text">' + esc(content.body) + '</p>' +
      '<div class="seq">' + lanes + '</div>' +
      '<p class="lesson-takeaway">' + icon('i-sparkles') + '<span>' + esc(content.takeaway) + '</span></p>' +
      ruleLine(content.rule);
  }

  function callout(x, y, n) {
    return '<g class="dg-callout"><circle cx="' + x + '" cy="' + y + '" r="11"/><text x="' + x + '" y="' + (y + 4.5) + '" text-anchor="middle">' + fa(n) + '</text></g>';
  }

  function carShape(x, y, w, h, cls, dir) {
    // dir: 'right' | 'left' | 'up' — a small wedge marks the front of the car.
    var wedge = dir === 'right'
      ? 'M' + (x + w - 7) + ' ' + (y + 4) + ' L' + (x + w - 2) + ' ' + (y + h / 2) + ' L' + (x + w - 7) + ' ' + (y + h - 4) + 'Z'
      : dir === 'left'
        ? 'M' + (x + 7) + ' ' + (y + 4) + ' L' + (x + 2) + ' ' + (y + h / 2) + ' L' + (x + 7) + ' ' + (y + h - 4) + 'Z'
        : 'M' + (x + 4) + ' ' + (y + 7) + ' L' + (x + w / 2) + ' ' + (y + 2) + ' L' + (x + w - 4) + ' ' + (y + 7) + 'Z';
    return '<g class="dg-car ' + cls + '"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="5"/><path class="dg-car-front" d="' + wedge + '"/></g>';
  }

  function junctionSvg() {
    return '<svg class="lesson-diagram" viewBox="0 0 320 210" role="img" aria-labelledby="dg-title">' +
      '<title id="dg-title">نمای بالای یک تقاطع: جاده‌ی اصلی افقی با لوزی زرد، جاده‌ی فرعی از پایین با مثلث وارونه.</title>' +
      '<rect class="dg-ground" x="0" y="0" width="320" height="210" rx="14"/>' +
      '<rect class="dg-road" x="0" y="58" width="320" height="64"/>' +
      '<rect class="dg-road" x="138" y="122" width="64" height="88"/>' +
      '<line class="dg-lane" x1="0" y1="90" x2="320" y2="90"/>' +
      '<line class="dg-lane" x1="170" y1="138" x2="170" y2="210"/>' +
      '<line class="dg-giveway" x1="171" y1="129" x2="201" y2="129"/>' +
      carShape(46, 97, 38, 18, 'dg-car-you', 'right') +
      carShape(177, 146, 18, 32, 'dg-car-other', 'up') +
      '<image href="' + signUrl(52) + '" x="10" y="130" width="42" height="42"/>' +
      '<image href="' + signUrl(40) + '" x="208" y="142" width="38" height="34"/>' +
      callout(64, 150, 1) + callout(262, 158, 2) + callout(98, 88, 3) +
    '</svg>';
  }

  function narrowingSvg() {
    return '<svg class="lesson-diagram" viewBox="0 0 320 200" role="img" aria-labelledby="dg-title">' +
      '<title id="dg-title">نمای بالای یک باریکه: سمت چپ تابلوی دایره‌ای برای تو، سمت راست تابلوی مربعی برای جهت مقابل.</title>' +
      '<rect class="dg-ground" x="0" y="0" width="320" height="200" rx="14"/>' +
      '<path class="dg-road" d="M0 60 H108 L128 80 H192 L212 60 H320 V140 H212 L192 120 H128 L108 140 H0 Z"/>' +
      '<line class="dg-lane" x1="0" y1="100" x2="104" y2="100"/>' +
      '<line class="dg-lane" x1="216" y1="100" x2="320" y2="100"/>' +
      '<line class="dg-giveway" x1="104" y1="104" x2="104" y2="138"/>' +
      carShape(58, 110, 38, 18, 'dg-car-you', 'right') +
      carShape(146, 91, 38, 18, 'dg-car-other', 'left') +
      '<image href="' + signUrl(45) + '" x="62" y="148" width="40" height="40"/>' +
      '<image href="' + signUrl(53) + '" x="218" y="12" width="40" height="40"/>' +
      callout(114, 168, 1) + callout(270, 32, 2) + callout(165, 140, 3) +
    '</svg>';
  }

  function diagramHtml(content) {
    var svg = content.diagram === 'junction' ? junctionSvg() : narrowingSvg();
    var legend = content.callouts.map(function(text, i) {
      return '<li><span class="legend-num" aria-hidden="true">' + fa(i + 1) + '</span><span>' + esc(text) + '</span></li>';
    }).join('');
    return stepHeading(content.title) +
      '<p class="lesson-text">' + esc(content.body) + '</p>' +
      '<figure class="diagram-figure">' + svg + '<figcaption><ol class="diagram-legend">' + legend + '</ol></figcaption></figure>' +
      '<p class="lesson-takeaway">' + icon('i-sparkles') + '<span>' + esc(content.takeaway) + '</span></p>' +
      ruleLine(content.rule);
  }

  function termsHtml(content, stepIndex) {
    var saved = state.lesson.savedTerms || [];
    var rows = content.terms.map(function(term, i) {
      var isSaved = saved.indexOf(term.it) !== -1;
      return '<li class="term-row">' +
        '<div class="term-copy">' +
          itSpan(term.it, 'term-it') +
          (term.base ? '<span class="term-base">مصدر: <bdi dir="ltr" lang="it">' + esc(term.base) + '</bdi></span>' : '') +
          '<span class="term-fa">' + esc(term.fa) + '</span>' +
          (term.note ? '<span class="term-note">' + esc(term.note) + '</span>' : '') +
        '</div>' +
        '<div class="term-actions">' +
          '<button type="button" class="icon-button" onclick="App.speakLessonTerm(' + stepIndex + ',' + i + ')" aria-label="شنیدن تلفظ ' + esc(term.it) + '">' + icon('i-audio') + '</button>' +
          '<button type="button" class="btn btn-secondary btn-sm term-save' + (isSaved ? ' is-saved' : '') + '"' + (isSaved ? ' disabled' : '') +
            ' onclick="App.saveLessonTerm(' + stepIndex + ',' + i + ', this)">' + (isSaved ? icon('i-check') + '<span>در واژه‌نامه</span>' : '<span>+ واژه‌نامه</span>') + '</button>' +
        '</div>' +
      '</li>';
    }).join('');
    return stepHeading(content.title) +
      '<p class="lesson-text">این‌ها کلمه‌هایی هستند که در سؤال‌های همین درس می‌بینی. هر کدام را بشنو و اگر خواستی به واژه‌نامه‌ات اضافه کن.</p>' +
      '<ul class="term-list">' + rows + '</ul>';
  }

  function chunksHtml(chunks) {
    var cells = chunks.map(function(chunk) {
      var verb = chunk.verb ? chunk.verb.split(' ← ')[1] : '';
      return '<span class="chunk' + (chunk.focus ? ' is-focus' : '') + '">' +
        itSpan(chunk.it, 'chunk-it') +
        '<span class="chunk-fa" dir="rtl" lang="fa">' + esc(chunk.fa) + '</span>' +
        (chunk.focus ? '<span class="chunk-tag" dir="rtl">' + esc(FOCUS_LABELS[chunk.focus] || '') + '</span>' : '') +
        (verb ? '<span class="chunk-verb" dir="rtl">مصدر: <bdi dir="ltr" lang="it">' + esc(verb) + '</bdi></span>' : '') +
      '</span>';
    }).join('');
    var notes = chunks.filter(function(chunk) { return chunk.note; }).map(function(chunk) {
      return '<li>' + itSpan(chunk.it, 'chunk-note-it') + ' — ' + esc(chunk.note) + '</li>';
    }).join('');
    return '<div class="chunks" dir="ltr">' + cells + '</div>' + (notes ? '<ul class="chunk-notes">' + notes + '</ul>' : '');
  }

  function verdictPill(answer) {
    return '<span class="result-verdict-pill ' + (answer === 1 ? 'vero' : 'falso') + '">' +
      icon(answer === 1 ? 'i-check' : 'i-x') + '<span dir="ltr">' + (answer === 1 ? 'VERO' : 'FALSO') + '</span></span>';
  }

  function trapHtml(content, stepIndex) {
    var examples = content.examples.map(function(example, i) {
      var id = 'trap-' + stepIndex + '-' + i;
      return '<article class="trap-example">' +
        '<div class="trap-statement">' +
          (example.sign ? '<span class="sign-tile sign-tile-sm"><img src="' + signUrl(example.sign) + '" alt="تصویر تابلوی همین سؤال" loading="lazy" /></span>' : '') +
          '<p class="statement-it" dir="ltr" lang="it">' + esc(example.textIt) + '</p>' +
        '</div>' +
        (example.figure ? '<figure class="practice-sign is-figure"><img src="' + signUrl(example.figure) + '" alt="شکل ' + esc(fa(example.figure)) + ' از بانک سؤال" loading="lazy" /></figure>' : '') +
        chunksHtml(example.chunks) +
        '<p class="faithful"><span class="faithful-label">ترجمه‌ی وفادار</span>' + esc(example.translation) + '</p>' +
        '<button type="button" class="btn btn-secondary btn-sm" aria-expanded="false" aria-controls="' + id + '" onclick="App.revealTrap(\'' + id + '\', this)">درست است یا غلط؟ ببین</button>' +
        '<div id="' + id + '" class="trap-verdict" hidden>' + verdictPill(example.answer) + '<p>' + esc(example.why) + '</p></div>' +
      '</article>';
    }).join('');
    return stepHeading(content.title) +
      '<p class="lesson-text">' + esc(content.body) + '</p>' +
      examples +
      '<p class="lesson-takeaway">' + icon('i-sparkles') + '<span>' + esc(content.takeaway) + '</span></p>' +
      ruleLine(content.rule);
  }

  App.revealTrap = function(id, btn) {
    var box = document.getElementById(id);
    if (!box) return;
    box.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    btn.hidden = true;
  };

  function practiceStepHtml(step) {
    var q = step.question;
    var answer = state.lesson.answers[q.questionId];
    var lesson = state.lesson.lesson;
    var concept = lesson.steps[q.conceptStep];
    var head = '<p class="lesson-meta">تمرین ' + fa(step.number) + ' از ' + fa(step.total) + '، سؤال واقعی بانک</p>' +
      '<h2 class="visually-hidden" tabindex="-1" data-step-heading>تمرین ' + fa(step.number) + '</h2>';
    var sign = q.imageUrl
      ? '<figure class="practice-sign' + (q.isFigure ? ' is-figure' : '') + '"><img src="' + esc(q.imageUrl) + '" alt="' +
          (q.isFigure ? 'شکلِ تقاطعِ مربوط به این سؤال' : 'تصویر تابلوی مربوط به این سؤال') + '" /></figure>'
      : '';
    var statement = '<p id="lesson-statement" class="statement-it practice-statement" dir="ltr" lang="it">' + esc(q.textIt) + '</p>';
    var tools = '<div class="practice-tools">' +
      '<button type="button" class="tool-button" onclick="App.speakLessonQuestion()">' + icon('i-audio') + '<span>پخش ایتالیایی</span></button>' +
      (answer ? '' : '<button type="button" class="tool-button" aria-expanded="false" aria-controls="practice-help" onclick="App.toggleLessonHelp(this)">' +
        icon('i-globe') + '<span>کمک: ترجمه و ساختار</span></button>') +
      '</div>';
    var help = answer ? '' :
      '<div id="practice-help" class="practice-help" hidden>' +
        chunksHtml(q.chunks) +
        '<p class="faithful"><span class="faithful-label">ترجمه‌ی وفادار</span>' + esc(q.translation) + '</p>' +
      '</div>';

    if (!answer) {
      return head + sign + statement + tools + help +
        '<p class="practice-hint">نگه داشتن انگشت روی هر کلمه آن را به واژه‌نامه می‌برد.</p>' +
        '<div class="practice-answer-row" role="group" aria-label="انتخاب پاسخ">' +
          '<button type="button" class="btn btn-falso btn-full" id="lesson-btn-falso" onclick="App.lessonAnswer(0)">' + icon('i-x') + '<span>FALSO</span></button>' +
          '<button type="button" class="btn btn-vero btn-full" id="lesson-btn-vero" onclick="App.lessonAnswer(1)">' + icon('i-check') + '<span>VERO</span></button>' +
        '</div>' +
        '<p id="practice-status" class="practice-status" role="status" aria-live="polite"></p>';
    }

    var correct = answer.isCorrect;
    var verdict = correct
      ? icon('i-check') + '<span>درست جواب دادی، پاسخ بانک: <b dir="ltr">' + (q.correctAnswer === 1 ? 'VERO' : 'FALSO') + '</b></span>'
      : icon('i-x') + '<span>پاسخت با پاسخ بانک یکی نبود، پاسخ درست: <b dir="ltr">' + (q.correctAnswer === 1 ? 'VERO' : 'FALSO') + '</b></span>';
    var theory = state.lessonTheoryCache[q.questionId];
    return head + sign + statement + tools +
      '<section class="practice-feedback ' + (correct ? 'is-correct' : 'is-wrong') + '" aria-labelledby="practice-verdict">' +
        '<p id="practice-verdict" class="feedback-verdict">' + verdict + '</p>' +
        '<div class="feedback-block"><h3>چرا؟</h3><p>' + esc(q.why) + '</p>' + ruleLine(q.rule) + '</div>' +
        '<div class="feedback-block"><h3>جمله، تکه‌به‌تکه</h3>' + chunksHtml(q.chunks) + '</div>' +
        '<div class="feedback-block"><h3>ترجمه‌ی وفادار</h3><p>' + esc(q.translation) + '</p>' +
          '<p class="feedback-small">این ترجمه همان ادعای سؤال است، حتی وقتی غلط است؛ درست یا غلط بودنش را بخش «چرا؟» می‌گوید.</p></div>' +
        (correct ? '' :
          '<p class="feedback-review">' + icon('i-review') + '<span>این سؤال به فهرست مرورت اضافه شد و فردا دوباره می‌آید.</span></p>') +
        '<div class="feedback-actions">' +
          (concept ? '<button type="button" class="btn btn-secondary btn-sm" onclick="App.lessonReread(' + q.conceptStep + ')">' +
            icon('i-book') + '<span>دوباره ببین: ' + esc(concept.title) + '</span></button>' : '') +
          (theory ? '' : '<button type="button" class="btn btn-quiet btn-sm" id="lesson-theory-btn" onclick="App.lessonTheory(' + q.questionId + ', this)">' +
            icon('i-graduation') + '<span>توضیح بیشتر از مربی تئوری</span></button>') +
        '</div>' +
        '<div id="lesson-theory" class="lesson-theory"' + (theory ? '' : ' hidden') + '>' +
          '<p class="feedback-small">این توضیح را هوش مصنوعی نوشته است؛ پاسخ مرجع همان پاسخ بانک سؤال است.</p>' +
          '<div id="lesson-theory-text" class="theory-text-body"></div>' +
        '</div>' +
      '</section>';
  }

  App.toggleLessonHelp = function(btn) {
    var box = document.getElementById('practice-help');
    if (!box) return;
    box.hidden = !box.hidden;
    btn.setAttribute('aria-expanded', box.hidden ? 'false' : 'true');
  };

  App.speakLessonQuestion = function() {
    var steps = lessonSteps();
    var step = steps[state.lessonStep];
    if (step && step.type === 'practice') App.speakItalian(step.question.textIt);
  };

  App.speakLessonTerm = function(stepIndex, termIndex) {
    var content = state.lesson && state.lesson.lesson.steps[stepIndex];
    if (content && content.terms && content.terms[termIndex]) App.speakItalian(content.terms[termIndex].it);
  };

  App.saveLessonTerm = async function(stepIndex, termIndex, btn) {
    var content = state.lesson && state.lesson.lesson.steps[stepIndex];
    var term = content && content.terms && content.terms[termIndex];
    if (!term || btn.disabled) return;
    btn.disabled = true;
    btn.innerHTML = '<span>در حال ذخیره…</span>';
    try {
      await api('POST', '/vocab', {
        termIt: term.it,
        termFa: term.fa,
        note: term.base ? 'مصدر: ' + term.base : (term.note || undefined),
      });
      state.lesson.savedTerms.push(term.it);
      btn.classList.add('is-saved');
      btn.innerHTML = icon('i-check') + '<span>در واژه‌نامه</span>';
      App.toast('«' + term.it + '» به واژه‌نامه اضافه شد.');
    } catch (e) {
      btn.disabled = false;
      btn.innerHTML = '<span>ذخیره نشد — دوباره</span>';
    }
  };

  App.lessonAnswer = async function(value) {
    if (!state.lesson || state.lessonAnswerPending) return;
    var step = lessonSteps()[state.lessonStep];
    if (!step || step.type !== 'practice') return;
    var q = step.question;
    if (state.lesson.answers[q.questionId]) return;

    var requestId = state.lessonRequestId;
    var lessonId = state.lesson.lesson.id;
    var buttons = [document.getElementById('lesson-btn-falso'), document.getElementById('lesson-btn-vero')];
    var status = document.getElementById('practice-status');
    state.lessonAnswerPending = true;
    buttons.forEach(function(b) { if (b) b.disabled = true; });
    if (status) { status.className = 'practice-status'; status.textContent = 'در حال ثبت پاسخ…'; }

    try {
      var res = await api('POST', '/learn/lessons/' + encodeURIComponent(lessonId) + '/answer', {
        questionId: q.questionId,
        answer: value,
      });
      if (requestId !== state.lessonRequestId) return;
      // The server's stored first answer wins, even if this tap was a retry.
      state.lesson.answers[q.questionId] = { userAnswer: res.userAnswer, isCorrect: res.isCorrect };
      var current = lessonSteps()[state.lessonStep];
      if (current && current.type === 'practice' && current.question.questionId === q.questionId) {
        App.renderLessonStep();
        var verdict = document.getElementById('practice-verdict');
        if (verdict) {
          verdict.setAttribute('tabindex', '-1');
          verdict.focus({ preventScroll: true });
          verdict.scrollIntoView({ block: 'nearest', behavior: 'auto' });
        }
      }
    } catch (e) {
      if (requestId !== state.lessonRequestId) return;
      buttons.forEach(function(b) { if (b) b.disabled = false; });
      if (status) {
        status.className = 'practice-status is-error';
        status.setAttribute('role', 'alert');
        status.textContent = 'پاسخ ثبت نشد. اتصال را بررسی کن و دوباره انتخاب کن.';
      }
    } finally {
      if (requestId === state.lessonRequestId) state.lessonAnswerPending = false;
    }
  };

  App.lessonTheory = async function(questionId, btn) {
    var box = document.getElementById('lesson-theory');
    var text = document.getElementById('lesson-theory-text');
    if (!box || !text) return;
    var requestId = state.lessonRequestId;
    btn.disabled = true;
    btn.innerHTML = '<span>در حال آماده‌سازی توضیح…</span>';
    try {
      var data = await api('POST', '/translate/' + questionId + '/theory');
      if (requestId !== state.lessonRequestId) return;
      state.lessonTheoryCache[questionId] = data.theoryText || '';
      App.renderRichText(text, state.lessonTheoryCache[questionId]);
      box.hidden = false;
      btn.hidden = true;
    } catch (e) {
      if (requestId !== state.lessonRequestId) return;
      btn.disabled = false;
      btn.innerHTML = '<span>توضیح آماده نشد — دوباره</span>';
    }
  };

  App.finishLesson = async function() {
    if (!state.lesson || state.lessonFinishPending) return;
    var requestId = state.lessonRequestId;
    var lessonId = state.lesson.lesson.id;
    state.lessonFinishPending = true;
    updateLessonDock(lessonSteps()[state.lessonStep], lessonSteps());
    try {
      var res = await api('POST', '/learn/lessons/' + encodeURIComponent(lessonId) + '/complete');
      if (requestId !== state.lessonRequestId) return;
      state.lessonCompletion = res;
      state.lesson.progress.state = 'completed';
      state.lesson.progress.completedAt = res.completedAt;
      setSaveStatus(null);
      state.lessonFinishPending = false;
      state.lessonStep = lessonSteps().length - 1;
      App.renderLessonStep({ focus: true });
    } catch (e) {
      if (requestId !== state.lessonRequestId) return;
      state.lessonFinishPending = false;
      var missing = e && e.status === 409 && e.payload && e.payload.missing;
      if (missing && missing.length) {
        var target = lessonSteps().findIndex(function(s) { return s.type === 'practice' && missing.indexOf(s.question.questionId) !== -1; });
        App.toast('اول به این سؤال جواب بده.');
        if (target !== -1) App.lessonGoTo(target, 'back');
        return;
      }
      setSaveStatus('finish');
      updateLessonDock(lessonSteps()[state.lessonStep], lessonSteps());
    }
  };

  function doneStepHtml() {
    var data = state.lesson;
    var c = state.lessonCompletion || { practice: { total: 0, correct: 0, queuedForReview: 0 }, next: data.next };
    var sources = data.chapter.sources.map(function(source) {
      return '<li><a href="' + esc(source.url) + '" target="_blank" rel="noopener noreferrer" onclick="return App.openExternalLink(this.href)" dir="ltr">' + esc(source.label) + '</a></li>';
    }).join('');
    var reviewed = new Date(data.chapter.reviewedOn + 'T12:00:00Z').toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
    var primary = c.next
      ? '<button type="button" class="btn btn-primary btn-full" onclick="App.openLesson(\'' + esc(c.next.lessonId) + '\', undefined, \'' + esc(state.lessonReturnScreen) + '\')">' +
          '<span>' + (c.next.chapterTitleFa ? 'فصل بعد، «' + esc(c.next.chapterTitleFa) + '»: ' : 'درس بعدی: ') + esc(c.next.titleFa) + '</span>' + icon('i-chevron-left') + '</button>'
      : '<button type="button" class="btn btn-primary btn-full" onclick="App.startLessonPractice(null)">' + icon('i-target') +
          '<span>تمرین ۱۰ سؤال واقعی از همه‌ی درس‌ها</span></button>';

    return '<div class="lesson-done">' +
      '<div class="done-route" aria-hidden="true"><span class="done-road"></span><span class="done-marker">' + icon('i-check') + '</span></div>' +
      '<p class="lesson-meta">درس ' + fa(data.position.index) + ' از ' + fa(data.position.total) + '</p>' +
      '<h2 class="lesson-step-title lesson-hero-title" tabindex="-1" data-step-heading>درس تمام شد</h2>' +
      '<p class="done-title">' + esc(data.lesson.titleFa) + '</p>' +
      '<ul class="done-stats">' +
        '<li>' + icon('i-check') + '<span>تمرین: ' + fa(c.practice.correct) + ' از ' + fa(c.practice.total) + ' درست در اولین تلاش</span></li>' +
        (c.practice.queuedForReview > 0
          ? '<li>' + icon('i-review') + '<span>' + fa(c.practice.queuedForReview) + ' سؤال برای مرور فردا کنار گذاشته شد</span></li>'
          : '') +
      '</ul>' +
      '<p class="done-honest">خواندن درس قدم اول است. تسلط وقتی معلوم می‌شود که چند روز بعد هم درست جواب بدهی؛ برای همین سؤال‌های مرتبط در مرور و تمرین دوباره می‌آیند.</p>' +
      '<div class="done-actions">' + primary +
        '<button type="button" class="btn btn-secondary btn-full" onclick="App.startLessonPractice(\'' + esc(data.lesson.id) + '\')">' + icon('i-target') +
          '<span>۱۰ سؤال واقعی درباره‌ی همین درس</span></button>' +
        '<button type="button" class="btn btn-quiet btn-full" onclick="App.lessonGoTo(0, \'back\')">مرور دوباره‌ی درس از اول</button>' +
      '</div>' +
      '<details class="lesson-sources"><summary>' + icon('i-book') + '<span>منابع این درس</span></summary>' +
        '<ul>' + sources + '</ul>' +
        '<p>متن‌های قانونی در ' + reviewed + ' بررسی شده‌اند. سؤال‌ها از بانک سال ۲۰۲۳ هستند و ممکن است با نسخه‌ی رسمی فعلی فرق داشته باشند؛ نزدیک آزمون با منبع رسمی چک کن.</p>' +
      '</details>' +
    '</div>';
  }

  App.openExternalLink = function(url) {
    var tg = window.Telegram && window.Telegram.WebApp;
    if (tg && typeof tg.openLink === 'function') {
      try {
        tg.openLink(url);
        return false;
      } catch (e) {}
    }
    return true;
  };
