/**
 * public/js/overtaking.js
 * The overtaking chapter's three step kinds (src/content/lessons-sorpasso.ts):
 *
 *  - "markings": centre lines read from either lane. Who may cross is a data
 *    lookup (`line.cross`), checked against the law and the bank in tests.
 *  - "assess": "Assess the situation". Draws the scene from its facts, asks
 *    two questions, and shows the server's verdict (POST …/assess) with the
 *    evidence highlighted on the drawing. This file never decides a verdict.
 *  - "manoeuvre": the overtaking stages, with playback, replay and manual
 *    steps. With prefers-reduced-motion: reduce there is no playback and every
 *    stage is shown statically, with the full text list.
 *
 * Classic script loaded before learn.js, wrapped in an IIFE so its helpers stay
 * private; shares the `state`, `api` and `App` globals. Every drawing is an
 * original educational illustration, not to scale.
 */
(function() {
  'use strict';

  var reduceMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var STEP_MS = 1200;
  var PAUSE_MS = 1100;

  state.assessUi = {};        // per lesson step: { scene, variant, picks, results, checked, pending, error, evidence }
  state.assessRun = null;     // the assess step on screen: { index, content, key }
  state.markingsSide = 'lower';
  state.manoeuvreRun = null;  // the stage player on screen: { key, content, stage, raf, timers, pose }

  function esc(v) { return App.escapeHtml(v == null ? '' : String(v)); }
  function fa(n) { return Number(n || 0).toLocaleString('fa-IR'); }
  function icon(id) { return '<svg class="ui-icon" aria-hidden="true"><use href="#' + id + '"/></svg>'; }
  function itSpan(text, cls) { return '<span class="' + (cls || 'it-text') + '" dir="ltr" lang="it">' + esc(text) + '</span>'; }
  function heading(title) { return '<h2 class="lesson-step-title" tabindex="-1" data-step-heading>' + esc(title) + '</h2>'; }
  function ruleLine(rule) { return rule ? '<p class="lesson-rule">مبنا: <bdi dir="ltr">' + esc(rule) + '</bdi></p>' : ''; }
  function takeaway(text, id, hidden) {
    return '<p' + (id ? ' id="' + id + '"' : '') + ' class="lesson-takeaway"' + (hidden ? ' hidden' : '') + '>' + icon('i-sparkles') + '<span>' + esc(text) + '</span></p>';
  }
  function stepKey(index) { return state.lesson.lesson.id + ':' + index; }

  // ── Shared drawing: a two-lane road, you drive left → right in the lower lane ──
  var ROAD_TOP = 44, ROAD_MID = 100, ROAD_BOTTOM = 156;
  var LOWER_Y = 128, UPPER_Y = 72;

  /** A vehicle seen from above, its front (the wedge) pointing in `dir` (1 = right, -1 = left). */
  function vehicle(cx, cy, kind, cls, dir, label) {
    var size = { car: [40, 20], moto: [24, 10], truck: [78, 26] }[kind] || [40, 20];
    var L = size[0], W = size[1];
    var x = cx - L / 2, y = cy - W / 2;
    var front = dir > 0
      ? 'M' + (x + L - 8) + ' ' + (y + 3) + ' L' + (x + L - 2) + ' ' + cy + ' L' + (x + L - 8) + ' ' + (y + W - 3) + 'Z'
      : 'M' + (x + 8) + ' ' + (y + 3) + ' L' + (x + 2) + ' ' + cy + ' L' + (x + 8) + ' ' + (y + W - 3) + 'Z';
    var body = kind === 'truck'
      ? '<rect class="ov-body" x="' + x + '" y="' + y + '" width="' + L + '" height="' + W + '" rx="3"/>' +
        '<rect class="ov-cab" x="' + (dir > 0 ? x + L - 16 : x) + '" y="' + (y + 2) + '" width="16" height="' + (W - 4) + '" rx="3"/>'
      : '<rect class="ov-body" x="' + x + '" y="' + y + '" width="' + L + '" height="' + W + '" rx="5"/>';
    return '<g class="ov-veh ' + cls + '">' + body + '<path class="ov-front" d="' + front + '"/>' +
      (label ? '<g class="ov-badge"><circle cx="' + cx + '" cy="' + cy + '" r="9"/><text x="' + cx + '" y="' + (cy + 3.6) + '" text-anchor="middle">' + esc(label) + '</text></g>' : '') +
      '</g>';
  }

  /** Stripes of a centre line at y, the stripe next to the lower lane first. */
  function stripesSvg(stripes, y, x0, x1) {
    var gap = stripes.length > 1 ? 3.5 : 0;
    return stripes.map(function(kind, i) {
      var sy = stripes.length > 1 ? (i === 0 ? y + gap : y - gap) : y;
      return '<line class="ov-stripe' + (kind === 'dashed' ? ' is-dashed' : '') + '" x1="' + x0 + '" y1="' + sy + '" x2="' + x1 + '" y2="' + sy + '"/>';
    }).join('');
  }

  function hiRect(x, y, w, h) {
    return '<rect class="ov-hi" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8"/>';
  }

  // ── Markings ───────────────────────────────────────────────────────────────
  var SIDE_FA = { lower: 'خطِ عبورِ پایینی: به راست می‌روی', upper: 'خطِ عبورِ بالایی: به چپ می‌روی' };

  function lineSvg(line, side) {
    var youLower = side === 'lower';
    return '<svg class="ov-line-svg" viewBox="0 0 300 92" role="img" aria-label="' +
      esc(line.nameFa + '؛ تو در ' + SIDE_FA[side]) + '">' +
      '<rect class="ov-ground" x="0" y="0" width="300" height="92" rx="10"/>' +
      '<rect class="ov-road" x="0" y="8" width="300" height="76"/>' +
      '<line class="ov-edge" x1="0" y1="10" x2="300" y2="10"/><line class="ov-edge" x1="0" y1="82" x2="300" y2="82"/>' +
      stripesSvg(line.stripes, 46, 0, 300) +
      vehicle(youLower ? 92 : 208, youLower ? 65 : 27, 'car', 'is-you', youLower ? 1 : -1, 'تو') +
      vehicle(youLower ? 208 : 92, youLower ? 27 : 65, 'car', 'is-faint', youLower ? -1 : 1, '') +
    '</svg>';
  }

  function linesHtml(content) {
    var side = state.markingsSide;
    return content.lines.map(function(line) {
      var yes = line.cross[side];
      return '<li class="ov-line-card">' +
        lineSvg(line, side) +
        '<div class="ov-line-copy">' +
          '<p class="ov-line-name">' + itSpan(line.nameIt, 'ov-line-it') + '<span>' + esc(line.nameFa) + '</span></p>' +
          '<p class="ov-pill ' + (yes ? 'is-yes' : 'is-no') + '">' + icon(yes ? 'i-check' : 'i-x') +
            '<span>' + (yes ? 'از سمتِ تو: می‌توانی عبور کنی' : 'از سمتِ تو: نباید عبور کنی') + '</span></p>' +
          '<p class="ov-line-note">' + esc(line.note) + '</p>' +
        '</div>' +
      '</li>';
    }).join('');
  }

  App.markingsStepHtml = function(content) {
    var radios = ['lower', 'upper'].map(function(side) {
      return '<label class="ov-seg"><input type="radio" name="ov-side" value="' + side + '"' + (state.markingsSide === side ? ' checked' : '') +
        ' onchange="App.markingsSide(\'' + side + '\')"/><span>' + esc(SIDE_FA[side]) + '</span></label>';
    }).join('');
    return heading(content.title) +
      '<p class="lesson-text">' + esc(content.body) + '</p>' +
      '<fieldset class="ov-side"><legend>تو کجایی؟</legend>' + radios + '</fieldset>' +
      '<p id="ov-side-status" class="visually-hidden" role="status" aria-live="polite"></p>' +
      '<ul id="ov-lines" class="ov-lines">' + linesHtml(content) + '</ul>' +
      '<p class="ov-caption">' + icon('i-sign') + '<span>تصویرِ آموزشی، به مقیاس نیست.</span></p>' +
      takeaway(content.takeaway) + ruleLine(content.rule);
  };

  App.markingsSide = function(side) {
    if (side !== 'lower' && side !== 'upper') return;
    state.markingsSide = side;
    var step = state.lesson && state.lesson.lesson.steps.find(function(s) { return s.kind === 'markings'; });
    var list = document.getElementById('ov-lines');
    if (step && list) list.innerHTML = linesHtml(step);
    var status = document.getElementById('ov-side-status');
    if (status) status.textContent = 'جواب‌ها برای ' + SIDE_FA[side];
  };

  // ── Assess the situation ─────────────────────────────────────────────────────
  var LEGAL_FA = { forbidden: 'ممنوع است', not_forbidden: 'ممنوع نیست' };
  var SAFETY_FA = {
    fails: 'بله: یک بررسی همین حالا رد است، پس الان نه',
    unknown: 'نه: اطلاعات کافی نیست',
    clear: 'بله: همه‌ی بررسی‌ها گفته شده و هیچ‌کدام مانع نیست',
  };
  var ROLE_FA = { forbids: 'ممنوع می‌کند', allows: 'منع نمی‌کند', ok: 'جواب داده؛ مانع نیست', fails: 'رد شده', unknown: 'بی‌جواب' };
  var MARK_ICON = { line: 'i-route', sign: 'i-sign', ahead: 'i-target', view: 'i-globe', behind: 'i-review' };

  function assessUi(index) {
    var key = stepKey(index);
    if (!state.assessUi[key]) state.assessUi[key] = { scene: 0, variant: 'base', picks: {}, results: {}, checked: {}, pending: false, error: false, evidence: 0 };
    return state.assessUi[key];
  }
  function variantKey(u) { return u.scene + ':' + u.variant; }
  function currentRun() { return state.assessRun; }
  function variantOf(content, u) { var scene = content.scenes[u.scene]; return u.variant === 'compare' ? scene.compare : scene; }

  /** Merge the facts' drawing keys: the picture shows only what the facts state. */
  function drawOf(facts) {
    return facts.reduce(function(draw, rule) {
      Object.keys(rule.draw).forEach(function(k) { draw[k] = rule.draw[k]; });
      return draw;
    }, {});
  }

  /** Which drawn element each drawing key belongs to. */
  var DRAW_MARK = { line: 'line', sign: 'sign', ahead: 'ahead', gap: 'view', view: 'view', behind: 'behind' };

  /** Comparison view only: the drawn elements that differ from the base scene. */
  function changedMarks(content, u) {
    if (u.variant !== 'compare') return [];
    var scene = content.scenes[u.scene];
    var before = drawOf(scene.facts);
    var after = drawOf(scene.compare.facts);
    return Object.keys(DRAW_MARK).filter(function(k) { return before[k] !== after[k]; }).map(function(k) { return DRAW_MARK[k]; });
  }

  function sceneSvg(facts, changed) {
    var d = drawOf(facts);
    var youX = d.gap === 'far' ? 64 : d.gap === 'close' ? 118 : 104;
    var aheadX = d.ahead === 'truck' ? 204 : 196;
    var aheadKind = d.ahead || 'car';
    var marked = function(mark, inner, box) {
      return '<g class="ov-mark' + (changed.indexOf(mark) !== -1 ? ' is-changed' : '') + '" data-mark="' + mark + '">' + hiRect(box[0], box[1], box[2], box[3]) + inner + '</g>';
    };
    var parts = [];
    parts.push('<rect class="ov-ground" x="0" y="0" width="360" height="200" rx="14"/>');
    parts.push('<rect class="ov-road" x="0" y="' + ROAD_TOP + '" width="360" height="' + (ROAD_BOTTOM - ROAD_TOP) + '"/>');
    parts.push('<line class="ov-edge" x1="0" y1="' + (ROAD_TOP + 3) + '" x2="360" y2="' + (ROAD_TOP + 3) + '"/>');
    parts.push('<line class="ov-edge" x1="0" y1="' + (ROAD_BOTTOM - 3) + '" x2="360" y2="' + (ROAD_BOTTOM - 3) + '"/>');
    if (d.line) {
      var stripes = d.line === 'dashed' ? ['dashed'] : d.line === 'solid-dashed' ? ['solid', 'dashed'] : ['dashed', 'solid'];
      parts.push(marked('line', stripesSvg(stripes, ROAD_MID, 0, 360), [0, ROAD_MID - 10, 360, 20]));
    }
    if (d.view === 'blocked') {
      var from = aheadX + 40;
      parts.push(marked('view',
        '<rect class="ov-hidden" x="' + from + '" y="' + ROAD_TOP + '" width="' + (360 - from) + '" height="' + (ROAD_BOTTOM - ROAD_TOP) + '"/>' +
        '<text class="ov-q-glyph" x="' + ((from + 360) / 2) + '" y="' + (ROAD_MID + 12) + '" text-anchor="middle">؟</text>' +
        '<text class="ov-label" x="' + ((from + 360) / 2) + '" y="' + (ROAD_TOP - 10) + '" text-anchor="middle">جلوتر دیده نمی‌شود</text>',
        [from - 2, ROAD_TOP - 26, 362 - from, ROAD_BOTTOM - ROAD_TOP + 28]));
    } else if (d.view === 'clear') {
      parts.push(marked('view',
        (d.ahead === 'truck' ? '<line class="ov-sight" x1="' + (youX + 14) + '" y1="' + (LOWER_Y - 6) + '" x2="340" y2="' + (UPPER_Y - 10) + '"/>' : '') +
        '<line class="ov-clear" x1="250" y1="' + UPPER_Y + '" x2="346" y2="' + UPPER_Y + '" marker-end="url(#ov-arrow)"/>' +
        '<text class="ov-label" x="298" y="' + (ROAD_TOP - 10) + '" text-anchor="middle">تا دوردست خالی</text>',
        [244, ROAD_TOP - 26, 112, UPPER_Y - ROAD_TOP + 40]));
    }
    if (d.sign) {
      parts.push(marked('sign',
        '<line class="ov-post" x1="34" y1="166" x2="34" y2="196"/>' +
        '<image href="/images/signs/' + d.sign + '.png" x="17" y="160" width="34" height="34"/>',
        [12, 156, 44, 42]));
    }
    var aheadBox = aheadKind === 'truck' ? [aheadX - 44, LOWER_Y - 18, 88, 36] : [aheadX - 26, LOWER_Y - 16, 52, 32];
    parts.push(marked('ahead', vehicle(aheadX, LOWER_Y, aheadKind, aheadKind === 'truck' ? 'is-truck' : 'is-other', 1, ''), aheadBox));
    if (d.behind === 'unknown') {
      parts.push(marked('behind',
        '<rect class="ov-hidden" x="0" y="' + ROAD_TOP + '" width="' + (youX - 28) + '" height="' + (ROAD_BOTTOM - ROAD_TOP) + '"/>' +
        '<text class="ov-q-glyph" x="' + ((youX - 28) / 2) + '" y="' + (ROAD_MID + 12) + '" text-anchor="middle">؟</text>',
        [0, ROAD_TOP - 2, youX - 26, ROAD_BOTTOM - ROAD_TOP + 4]));
    } else if (d.behind === 'overtaking') {
      parts.push(marked('behind',
        '<g transform="rotate(-12 ' + (youX - 40) + ' ' + (UPPER_Y + 14) + ')">' + vehicle(youX - 40, UPPER_Y + 14, 'car', 'is-behind', 1, '') + '</g>' +
        '<line class="ov-move" x1="' + (youX - 14) + '" y1="' + (UPPER_Y + 6) + '" x2="' + (youX + 26) + '" y2="' + (UPPER_Y + 2) + '" marker-end="url(#ov-arrow)"/>',
        [youX - 66, UPPER_Y - 14, 98, 44]));
    } else if (d.behind === 'checked') {
      parts.push(marked('behind',
        '<g class="ov-mirror"><rect x="' + (youX - 58) + '" y="' + (LOWER_Y - 9) + '" width="26" height="18" rx="5"/>' +
        '<path d="M' + (youX - 51) + ' ' + LOWER_Y + ' l4 4 l8 -8"/></g>',
        [youX - 64, LOWER_Y - 15, 38, 30]));
    }
    parts.push(vehicle(youX, LOWER_Y, 'car', 'is-you', 1, 'تو'));
    var label = 'تصویر آموزشی: ' + facts.map(function(rule) { return rule.fact; }).join(' ');
    return '<svg class="ov-svg" viewBox="0 0 360 200" role="img" aria-label="' + esc(label) + '">' +
      '<defs><marker id="ov-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z"/></marker></defs>' +
      parts.join('') + '</svg>';
  }

  App.assessStepHtml = function(content, index) {
    var done = App.assessDone(index);
    return heading(content.title) +
      '<p class="lesson-text">' + esc(content.body) + '</p>' +
      '<div id="ov-tabs" class="ov-tabs"></div>' +
      '<div id="ov-top"></div>' +
      '<figure class="ov-figure"><div id="ov-figure"></div>' +
        '<figcaption class="ov-caption">' + icon('i-sign') + '<span>تصویرِ آموزشیِ ساخته‌ی خودمان، به مقیاس نیست؛ تمرینِ آموزشی است، نه سؤالِ رسمیِ آزمون. ' +
        'جهتِ تو: از چپ به راست، در خطِ عبورِ پایینی.</span></figcaption></figure>' +
      // After the verdict: evidence right under the drawing it highlights, then actions, then the facts.
      '<div id="ov-evidence"></div>' +
      '<div id="ov-scene" class="ov-scene"></div>' +
      '<div id="ov-panel" class="ov-panel"></div>' +
      takeaway(content.takeaway, 'ov-takeaway', !done) + ruleLine(content.rule);
  };

  App.mountAssess = function(content, index) {
    state.assessRun = { index: index, content: content, key: stepKey(index) };
    renderAssess();
  };

  App.leaveAssess = function() { state.assessRun = null; };

  /** True once every base scene has been checked at least once (a retry keeps this; comparisons are optional). */
  App.assessDone = function(index) {
    var content = state.lesson.lesson.steps[index];
    var u = assessUi(index);
    return content.scenes.every(function(_, i) { return !!u.checked[i]; });
  };

  function renderAssess() {
    var r = currentRun();
    if (!r) return;
    var u = assessUi(r.index);
    var content = r.content;
    var scene = content.scenes[u.scene];
    var variant = variantOf(content, u);
    var result = u.results[variantKey(u)];
    var changed = changedMarks(content, u);

    var tabs = document.getElementById('ov-tabs');
    if (tabs) {
      tabs.innerHTML = content.scenes.length > 1
        ? '<div class="ov-tablist" role="group" aria-label="صحنه‌ها">' + content.scenes.map(function(s, i) {
            var checked = !!u.checked[i];
            return '<button type="button" class="ov-tab' + (i === u.scene ? ' is-current' : '') + '" aria-pressed="' + (i === u.scene) + '" onclick="App.assessScene(' + i + ')">' +
              (checked ? icon('i-check') : '<span class="ov-tab-num">' + fa(i + 1) + '</span>') + '<span>' + esc(s.title) + '</span></button>';
          }).join('') + '</div>'
        : '';
    }
    var figure = document.getElementById('ov-figure');
    if (figure) figure.innerHTML = sceneSvg(variant.facts, result ? [] : changed);

    var sceneBox = document.getElementById('ov-scene');
    if (sceneBox) {
      var facts = variant.facts.map(function(rule, i) {
        var isChanged = u.variant === 'compare' && !(scene.facts[i] && scene.facts[i].id === rule.id);
        var role = result ? result.roles[i] : null;
        return '<li class="ov-fact' + (isChanged ? ' is-changed' : '') + '">' + icon(MARK_ICON[rule.marks[0]] || 'i-route') +
          '<span class="ov-fact-copy"><span>' + esc(rule.fact) + '</span>' +
          (rule.textOnly ? '<small class="ov-tag">فقط در متن؛ تصویرِ ثابت نشانش نمی‌دهد</small>' : '') +
          (isChanged ? '<small class="ov-tag is-changed">' + icon('i-review') + 'فقط همین عوض شد</small>' : '') +
          (role ? '<small class="ov-tag is-role-' + role + '">' + esc(ROLE_FA[role]) + '</small>' : '') +
          '</span></li>';
      }).join('');
      sceneBox.innerHTML =
        '<p class="ov-setting">' + esc(scene.setting) + '</p>' +
        '<h3 class="ov-facts-title">' + (result ? 'آنچه می‌دانستی' : 'آنچه می‌دانی') + '</h3><ol class="ov-facts">' + facts + '</ol>';
    }
    var top = document.getElementById('ov-top');
    if (top) {
      top.innerHTML =
        (u.variant === 'compare' ? '<p class="ov-change" role="note">' + icon('i-review') + '<span>صحنه‌ی مقایسه. ' + esc(scene.compare.change) + '</span></p>' : '') +
        (result ? verdictsHtml(content, u, result) : '');
    }
    var evidence = document.getElementById('ov-evidence');
    if (evidence) evidence.innerHTML = result ? evidenceHtml(u, variant, result) : '';
    var panel = document.getElementById('ov-panel');
    if (panel) panel.innerHTML = result ? actionsHtml(content, u) : questionsHtml(u);
    if (result) showEvidence(u, variant, result);
    var take = document.getElementById('ov-takeaway');
    if (take) take.hidden = !App.assessDone(r.index);
  }

  function radios(name, labels, picked, disabled) {
    return Object.keys(labels).map(function(value) {
      return '<label class="ov-opt"><input type="radio" name="ov-' + name + '" value="' + value + '"' + (picked === value ? ' checked' : '') + (disabled ? ' disabled' : '') +
        ' onchange="App.assessPick(\'' + name + '\', \'' + value + '\')"/><span>' + esc(labels[value]) + '</span></label>';
    }).join('');
  }

  function questionsHtml(u) {
    var pick = u.picks[variantKey(u)] || {};
    var ready = pick.legal && pick.safety && !u.pending;
    return '<fieldset class="ov-q"><legend><b>۱. قانون:</b> آیا تابلو، خط‌کشی یا خودِ این نقطه سبقت را این‌جا ممنوع می‌کند؟</legend>' +
        radios('legal', LEGAL_FA, pick.legal, u.pending) + '</fieldset>' +
      '<fieldset class="ov-q"><legend><b>۲. ایمنی:</b> با همین اطلاعات، می‌شود درباره‌ی ایمن بودنِ سبقت قضاوت کرد؟</legend>' +
        radios('safety', SAFETY_FA, pick.safety, u.pending) + '</fieldset>' +
      '<div class="ov-actions"><button type="button" class="btn btn-primary btn-sm" id="ov-submit" onclick="App.assessSubmit()"' + (ready ? '' : ' disabled') + '>' +
        '<span>' + (u.pending ? 'در حال بررسی…' : 'بررسیِ جواب‌ها') + '</span></button></div>' +
      '<p id="ov-status" class="practice-status' + (u.error ? ' is-error' : '') + '" role="status" aria-live="polite">' +
        (u.error ? 'بررسی انجام نشد. اتصال را بررسی کن و دوباره «بررسیِ جواب‌ها» را بزن؛ انتخاب‌هایت سرِ جایش است.' : '') + '</p>';
  }

  function verdictHtml(number, title, labels, part, extra) {
    var head = part.correct
      ? icon('i-check') + '<span><b>' + number + '. ' + title + ':</b> درست جواب دادی: «' + esc(labels[part.answer]) + '»</span>'
      : icon('i-x') + '<span><b>' + number + '. ' + title + ':</b> جوابِ تو «' + esc(labels[part.chosen]) + '» بود؛ جوابِ درست: «' + esc(labels[part.answer]) + '»</span>';
    return '<div class="ov-verdict ' + (part.correct ? 'is-right' : 'is-wrong') + '">' +
      '<p class="ov-verdict-head">' + head + '</p>' +
      (part.note ? '<p class="ov-verdict-note">' + esc(part.note) + '</p>' : '') + (extra || '') + '</div>';
  }

  /** Evidence order: first what decides the answer the learner got wrong, then the law, then safety, then the rest. */
  function evidenceOrder(variant, result) {
    var order = (result.legal.correct ? [] : result.legal.decisive)
      .concat(result.safety.correct ? [] : result.safety.decisive)
      .concat(result.legal.decisive, result.safety.decisive);
    variant.facts.forEach(function(_, i) { order.push(i); });
    return order.filter(function(i, n) { return order.indexOf(i) === n; });
  }

  function verdictsHtml(content, u, result) {
    var missing = result.safety.answer === 'unknown' && result.safety.missing.length
      ? '<p class="ov-missing">' + icon('i-help') + '<span>بی‌جواب: ' + esc(result.safety.missing.map(function(m) { return m.fa; }).join('، ')) + '</span></p>'
      : '';
    var compare = '';
    var other = u.results[u.scene + ':' + (u.variant === 'base' ? 'compare' : 'base')];
    if (u.variant === 'compare' && other) {
      compare = '<p class="ov-compare-line">' + icon('i-review') + '<span>صحنه‌ی اصلی: «' + esc(LEGAL_FA[other.legal.answer]) + '» و «' + esc(SAFETY_FA[other.safety.answer]) +
        '». این‌جا: «' + esc(LEGAL_FA[result.legal.answer]) + '» و «' + esc(SAFETY_FA[result.safety.answer]) + '».</span></p>';
    }
    return '<div id="ov-verdicts" tabindex="-1" class="ov-verdicts">' +
        verdictHtml('۱', 'قانون', LEGAL_FA, result.legal, '') +
        verdictHtml('۲', 'ایمنی', SAFETY_FA, result.safety, missing) +
      '</div>' + compare;
  }

  function evidenceHtml(u, variant, result) {
    var order = evidenceOrder(variant, result);
    var current = order[Math.min(u.evidence, order.length - 1)];
    var rule = variant.facts[current];
    var decisive = result.legal.decisive.concat(result.safety.decisive).indexOf(current) !== -1;
    var items = order.map(function(i, n) {
      return '<li' + (n === u.evidence ? ' class="is-current" aria-current="step"' : '') + '><button type="button" class="xing-step-btn" onclick="App.assessEvidence(' + n + ')">' +
        '<span class="xing-step-num">' + fa(n + 1) + '</span><span>' + esc(variant.facts[i].fact) + '</span></button></li>';
    }).join('');
    return '<div class="xing-stepper ov-evidence">' +
        '<div class="xing-stepper-bar">' +
          '<button type="button" class="icon-button" onclick="App.assessEvidence(' + (u.evidence - 1) + ')"' + (u.evidence > 0 ? '' : ' disabled') + ' aria-label="شاهدِ قبلی">' + icon('i-chevron-right') + '</button>' +
          '<span class="xing-stepper-count">شاهد ' + fa(u.evidence + 1) + ' از ' + fa(order.length) + '</span>' +
          '<button type="button" class="icon-button" onclick="App.assessEvidence(' + (u.evidence + 1) + ')"' + (u.evidence < order.length - 1 ? '' : ' disabled') + ' aria-label="شاهدِ بعدی">' + icon('i-chevron-left') + '</button>' +
        '</div>' +
        '<div class="xing-current ov-evidence-now" aria-live="polite">' +
          '<p class="ov-evidence-fact"><span class="ov-tag is-role-' + result.roles[current] + '">' + esc(ROLE_FA[result.roles[current]]) + '</span>' +
            (decisive ? '<span class="ov-tag is-decisive">تعیین‌کننده</span>' : '') + esc(rule.fact) + '</p>' +
          '<p>' + esc(rule.explain) + '</p>' + ruleLine(rule.law) +
        '</div>' +
        '<details class="xing-all"><summary>' + icon('i-book') + '<span>همه‌ی شواهد، یک‌جا</span></summary><ol class="xing-steps">' + items + '</ol></details>' +
      '</div>';
  }

  function actionsHtml(content, u) {
    var nextScene = u.scene < content.scenes.length - 1
      ? '<button type="button" class="btn btn-secondary btn-sm" onclick="App.assessScene(' + (u.scene + 1) + ')">' + icon('i-chevron-left') + '<span>صحنه‌ی بعد</span></button>'
      : '';
    var switchVariant = u.variant === 'base'
      ? '<button type="button" class="btn btn-primary btn-sm" onclick="App.assessVariant(\'compare\')">' + icon('i-review') + '<span>صحنه‌ی مقایسه: یک چیز عوض می‌شود</span></button>'
      : '<button type="button" class="btn btn-secondary btn-sm" onclick="App.assessVariant(\'base\')">' + icon('i-chevron-right') + '<span>برگشت به صحنه‌ی اصلی</span></button>';
    return '<div class="ov-actions">' + switchVariant + nextScene +
      '<button type="button" class="btn btn-quiet btn-sm" onclick="App.assessRetry()">' + icon('i-review') + '<span>دوباره امتحان کن</span></button></div>';
  }

  function showEvidence(u, variant, result) {
    var svg = document.querySelector('.ov-svg');
    if (!svg) return;
    var order = evidenceOrder(variant, result);
    var rule = variant.facts[order[Math.min(u.evidence, order.length - 1)]];
    svg.querySelectorAll('[data-mark]').forEach(function(el) {
      el.classList.toggle('is-on', rule.marks.indexOf(el.getAttribute('data-mark')) !== -1);
    });
  }

  App.assessPick = function(question, value) {
    var r = currentRun();
    if (!r || (question !== 'legal' && question !== 'safety')) return;
    var u = assessUi(r.index);
    if (u.pending || u.results[variantKey(u)]) return;
    var key = variantKey(u);
    u.picks[key] = u.picks[key] || {};
    u.picks[key][question] = value;
    u.error = false;
    var submit = document.getElementById('ov-submit');
    if (submit) submit.disabled = !(u.picks[key].legal && u.picks[key].safety);
  };

  App.assessSubmit = async function() {
    var r = currentRun();
    if (!r || !state.lesson) return;
    var u = assessUi(r.index);
    var key = variantKey(u);
    var pick = u.picks[key] || {};
    if (u.pending || u.results[key] || !pick.legal || !pick.safety) return;
    var requestId = state.lessonRequestId;
    u.pending = true;
    u.error = false;
    renderAssess();
    try {
      var res = await api('POST', '/learn/lessons/' + encodeURIComponent(state.lesson.lesson.id) + '/assess', {
        step: r.index, scene: u.scene, variant: u.variant, legal: pick.legal, safety: pick.safety,
      });
      u.results[key] = res;
      u.evidence = 0;
      if (u.variant === 'base') u.checked[u.scene] = true;
    } catch (e) {
      u.error = true;
    } finally {
      u.pending = false;
    }
    // The learner may have left the step while the request was in flight.
    if (requestId !== state.lessonRequestId || !currentRun() || currentRun().key !== r.key) return;
    renderAssess();
    if (u.results[key]) {
      var verdicts = document.getElementById('ov-verdicts');
      if (verdicts) verdicts.focus({ preventScroll: false });
      if (typeof App.refreshLessonDock === 'function') App.refreshLessonDock();
    }
  };

  App.assessRetry = function() {
    var r = currentRun();
    if (!r) return;
    var u = assessUi(r.index);
    var key = variantKey(u);
    // `checked` stays, so "Next" stays open; only this scene's answers reset.
    delete u.results[key];
    delete u.picks[key];
    u.evidence = 0;
    renderAssess();
  };

  App.assessScene = function(i) {
    var r = currentRun();
    if (!r || i < 0 || i >= r.content.scenes.length) return;
    var u = assessUi(r.index);
    u.scene = i;
    u.variant = 'base';
    u.evidence = 0;
    renderAssess();
    var figure = document.querySelector('.ov-figure');
    if (figure) figure.scrollIntoView({ block: 'start', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  };

  App.assessVariant = function(variant) {
    var r = currentRun();
    if (!r || (variant !== 'base' && variant !== 'compare')) return;
    var u = assessUi(r.index);
    u.variant = variant;
    u.evidence = 0;
    renderAssess();
    var figure = document.querySelector('.ov-figure');
    if (figure) figure.scrollIntoView({ block: 'start', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  };

  App.assessEvidence = function(n) {
    var r = currentRun();
    if (!r) return;
    var u = assessUi(r.index);
    var variant = variantOf(r.content, u);
    var result = u.results[variantKey(u)];
    if (!result || n < 0 || n >= variant.facts.length) return;
    u.evidence = n;
    renderAssess();
  };

  // ── Manoeuvre: overtaking stage by stage ─────────────────────────────────────
  var M_LANE = [102, 47];
  function mx(x) { return 22 + x * 2.65; }
  function my(lane) { return M_LANE[0] + (M_LANE[1] - M_LANE[0]) * lane; }

  function manoeuvreSvg(stage) {
    return '<svg class="ov-svg ov-man-svg" viewBox="0 0 360 150" role="img" aria-label="' + esc('تصویر آموزشی، به مقیاس نیست: ' + stage.title) + '">' +
      '<defs><marker id="ov-arrow-m" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z"/></marker></defs>' +
      '<rect class="ov-ground" x="0" y="0" width="360" height="150" rx="14"/>' +
      '<rect class="ov-road" x="0" y="20" width="360" height="110"/>' +
      '<line class="ov-edge" x1="0" y1="23" x2="360" y2="23"/><line class="ov-edge" x1="0" y1="127" x2="360" y2="127"/>' +
      '<line class="ov-stripe is-dashed" x1="0" y1="75" x2="360" y2="75"/>' +
      '<g id="ov-m-marks"></g>' +
      '<g id="ov-m-other">' + vehicle(0, 0, 'car', 'is-other', 1, '') + '</g>' +
      '<g id="ov-m-you">' + vehicle(0, 0, 'car', 'is-you', 1, 'تو') +
        '<g class="ov-ind is-left"><path d="M-6 -15 L0 -21 L6 -15Z"/></g>' +
        '<g class="ov-ind is-right"><path d="M-6 15 L0 21 L6 15Z"/></g>' +
      '</g>' +
    '</svg>';
  }

  function stageHtml(content, i) {
    var stage = content.stages[i];
    return '<p class="ov-stage-title"><span class="xing-step-num">' + fa(i + 1) + '</span><b>' + esc(stage.title) + '</b></p>' +
      '<p class="ov-stage-line"><span class="ov-who is-you">تو</span><span>' + esc(stage.you) + '</span></p>' +
      '<p class="ov-stage-line"><span class="ov-who">رانندهٔ جلویی</span><span>' + esc(stage.other) + '</span></p>' +
      ruleLine(stage.rule);
  }

  App.manoeuvreStepHtml = function(content) {
    var all = content.stages.map(function(stage, i) {
      return '<li><button type="button" class="xing-step-btn" onclick="App.manoeuvreGoTo(' + i + ')"><span class="xing-step-num">' + fa(i + 1) + '</span>' +
        '<span><b>' + esc(stage.title) + '.</b> ' + esc(stage.you) + ' <i>رانندهٔ جلویی:</i> ' + esc(stage.other) + '</span></button></li>';
    }).join('');
    return heading(content.title) +
      '<p class="lesson-text">' + esc(content.body) + '</p>' +
      '<figure class="ov-figure"><div id="ov-m-figure">' + manoeuvreSvg(content.stages[0]) + '</div>' +
        '<figcaption class="ov-caption">' + icon('i-sign') + '<span>تصویرِ آموزشیِ ساخته‌ی خودمان، به مقیاس نیست. تو: خودروی نارنجی، از چپ به راست.</span></figcaption></figure>' +
      '<div class="xing-stepper">' +
        '<div id="ov-m-bar" class="xing-stepper-bar"></div>' +
        '<div id="ov-m-stage" class="xing-current ov-stage" aria-live="polite"></div>' +
        '<details class="xing-all"><summary>' + icon('i-book') + '<span>همه‌ی مرحله‌ها، یک‌جا</span></summary><ol class="xing-steps">' + all + '</ol></details>' +
      '</div>' +
      takeaway(content.takeaway) + ruleLine(content.rule);
  };

  function barHtml(content, i, playing) {
    var last = content.stages.length - 1;
    var play = reduceMotion.matches ? '' : playing
      ? '<button type="button" class="btn btn-secondary btn-sm" id="ov-m-play" onclick="App.manoeuvreStop()">' + icon('i-x') + '<span>توقف</span></button>'
      : '<button type="button" class="btn btn-secondary btn-sm" id="ov-m-play" onclick="App.manoeuvrePlay()">' + icon('i-route') +
          '<span>' + (i === last ? 'پخشِ دوباره از اول' : 'پخشِ حرکت') + '</span></button>';
    return '<button type="button" class="icon-button" onclick="App.manoeuvreGoTo(' + (i - 1) + ')"' + (i > 0 ? '' : ' disabled') + ' aria-label="مرحله‌ی قبلی">' + icon('i-chevron-right') + '</button>' +
      '<span class="xing-stepper-count">مرحله ' + fa(i + 1) + ' از ' + fa(content.stages.length) + '</span>' +
      '<button type="button" class="icon-button" onclick="App.manoeuvreGoTo(' + (i + 1) + ')"' + (i < last ? '' : ' disabled') + ' aria-label="مرحله‌ی بعدی">' + icon('i-chevron-left') + '</button>' +
      play;
  }

  function place(id, x, lane) {
    var el = document.getElementById(id);
    if (el) el.setAttribute('transform', 'translate(' + mx(x).toFixed(1) + ' ' + my(lane).toFixed(1) + ')');
  }

  /** Draw a pose: both cars, the indicator, and the stage's marks (mirror, view, lateral gap). */
  function drawPose(pose, stage) {
    place('ov-m-you', pose.you[0], pose.you[1]);
    place('ov-m-other', pose.other[0], pose.other[1]);
    var svg = document.querySelector('.ov-man-svg');
    if (svg) {
      svg.querySelectorAll('.ov-ind').forEach(function(el) {
        el.classList.toggle('is-on', el.classList.contains('is-' + stage.indicator));
      });
    }
    var marks = document.getElementById('ov-m-marks');
    if (!marks) return;
    var yx = mx(pose.you[0]), yy = my(pose.you[1]), ox = mx(pose.other[0]), oy = my(pose.other[1]);
    var out = '';
    if (stage.marks.indexOf('view') !== -1) {
      out += '<line class="ov-clear" x1="' + (yx + 26) + '" y1="' + my(1) + '" x2="350" y2="' + my(1) + '" marker-end="url(#ov-arrow-m)"/>';
    }
    if (stage.marks.indexOf('mirror') !== -1) {
      out += '<g class="ov-mirror is-on"><rect x="' + (yx - 52) + '" y="' + (yy - 9) + '" width="24" height="18" rx="5"/><circle cx="' + (yx - 40) + '" cy="' + yy + '" r="3"/></g>';
    }
    if (stage.marks.indexOf('gap') !== -1 && Math.abs(yy - oy) > 20) {
      var gx = (Math.max(yx, ox) + Math.min(yx, ox)) / 2;
      out += '<g class="ov-gap"><line x1="' + gx + '" y1="' + (yy + 11) + '" x2="' + gx + '" y2="' + (oy - 11) + '"/>' +
        '<line x1="' + (gx - 5) + '" y1="' + (yy + 11) + '" x2="' + (gx + 5) + '" y2="' + (yy + 11) + '"/>' +
        '<line x1="' + (gx - 5) + '" y1="' + (oy - 11) + '" x2="' + (gx + 5) + '" y2="' + (oy - 11) + '"/></g>';
    }
    marks.innerHTML = out;
  }

  function mRun() { return state.manoeuvreRun; }

  function renderStage(playing) {
    var r = mRun();
    if (!r) return;
    var bar = document.getElementById('ov-m-bar');
    var box = document.getElementById('ov-m-stage');
    if (bar) bar.innerHTML = barHtml(r.content, r.stage, playing);
    if (box) box.innerHTML = stageHtml(r.content, r.stage);
    var svg = document.querySelector('.ov-man-svg');
    if (svg) svg.setAttribute('aria-label', 'تصویر آموزشی، به مقیاس نیست. مرحله‌ی ' + fa(r.stage + 1) + ': ' + r.content.stages[r.stage].title);
  }

  function stopAnimation() {
    var r = mRun();
    if (!r) return;
    r.timers.forEach(clearTimeout);
    r.timers = [];
    if (r.raf) cancelAnimationFrame(r.raf);
    r.raf = 0;
    r.token = {};
  }

  /** Move to stage i: animated from the previous stage's pose, or static with reduced motion. */
  function showStage(i, animate) {
    var r = mRun();
    var stage = r.content.stages[i];
    var target = stage.pose;
    var from = i > 0 ? r.content.stages[i - 1].pose : target;
    r.stage = i;
    if (!animate || reduceMotion.matches || from === target) {
      r.pose = target;
      drawPose(target, stage);
      return;
    }
    // The new stage's indicator shows at once; the cars follow frame by frame.
    drawPose(from, stage);
    var token = r.token;
    var started = null;
    function frame(now) {
      if (mRun() !== r || r.token !== token) return;
      if (started === null) started = now;
      var t = Math.min(1, (now - started) / STEP_MS);
      var e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      var lane = function(a, b) { var s = e * e * (3 - 2 * e); return a + (b - a) * s; };
      var pose = {
        you: [from.you[0] + (target.you[0] - from.you[0]) * e, lane(from.you[1], target.you[1])],
        other: [from.other[0] + (target.other[0] - from.other[0]) * e, lane(from.other[1], target.other[1])],
      };
      r.pose = pose;
      drawPose(pose, stage);
      if (t < 1) r.raf = requestAnimationFrame(frame);
    }
    r.raf = requestAnimationFrame(frame);
  }

  App.mountManoeuvre = function(content, index) {
    App.leaveManoeuvre();
    state.manoeuvreRun = { key: stepKey(index), content: content, stage: 0, raf: 0, timers: [], token: {}, pose: content.stages[0].pose };
    showStage(0, false);
    renderStage(false);
  };

  App.manoeuvreGoTo = function(i) {
    var r = mRun();
    if (!r || i < 0 || i >= r.content.stages.length) return;
    stopAnimation();
    var forward = i === r.stage + 1;
    showStage(i, forward);
    renderStage(false);
  };

  /** Play from the current stage to the end; at the end, replay from the start. */
  App.manoeuvrePlay = function() {
    var r = mRun();
    if (!r || reduceMotion.matches) return;
    stopAnimation();
    var last = r.content.stages.length - 1;
    var first = r.stage >= last ? 0 : r.stage;
    var token = r.token;
    function step(i) {
      if (mRun() !== r || r.token !== token) return;
      showStage(i, i > first);
      renderStage(i < last);
      if (i < last) r.timers.push(setTimeout(function() { step(i + 1); }, i === first ? PAUSE_MS : STEP_MS + PAUSE_MS));
    }
    step(first);
  };

  App.manoeuvreStop = function() {
    stopAnimation();
    var r = mRun();
    if (!r) return;
    var stage = r.content.stages[r.stage];
    r.pose = stage.pose;
    drawPose(stage.pose, stage);
    renderStage(false);
  };

  /** learn.js calls this when the lesson step changes, so playback never outlives its step. */
  App.leaveManoeuvre = function() {
    stopAnimation();
    state.manoeuvreRun = null;
  };
})();
