/**
 * public/js/crossing.js
 * "Who goes first?" — draws a junction scenario (src/content/crossings.ts) as
 * SVG, lets the learner tap vehicles into an order, asks the server for the
 * verdict, then explains the verified order step by step with optional playback.
 * Also renders the guided-reading variant (lesson step kind "scenario").
 *
 * Classic script loaded before learn.js, wrapped in an IIFE so its helpers stay
 * private; shares the `state`, `api` and `App` globals. The order rule itself lives only on the server
 * (checkPassageOrder in src/lib/learning.ts) — this file never decides it.
 *
 * Motion: playback animates vehicles along their paths with rAF. With
 * prefers-reduced-motion: reduce there is no animation and no autoplay; each
 * step is shown statically and the full explanation stays readable as a list.
 */
(function() {
  'use strict';

  var LANE = 20;
  var STOP_AT = 46;          // vehicle centre distance from the stop line
  var FAR = 132;             // path end, just inside the viewBox edge
  var VIEW = 140;            // viewBox half-size
  var STEP_MS = 1100;
  var PAUSE_MS = 900;
  var COLORS = ['#E8A33D', '#4C8DF6', '#2BB3A3', '#D96BA0', '#B9BECC'];
  var SIZES = {
    car: [36, 17], truck: [50, 18], bus: [50, 17], filobus: [50, 17], eccezionale: [56, 19], tram: [62, 16],
  };
  var KIND_FA = {
    car: 'خودرو', truck: 'کامیون', bus: 'اتوبوس', filobus: 'اتوبوس برقی (filobus)',
    eccezionale: 'وسیله‌ی استثنایی (veicolo eccezionale)', tram: 'تراموا، روی ریل',
  };
  var MOVE_FA = { straight: 'مستقیم می‌رود', left: 'به چپ می‌پیچد', right: 'به راست می‌پیچد' };
  var SIDES = ['راستِ تصویر', 'بالا-راستِ تصویر', 'بالای تصویر', 'بالا-چپِ تصویر', 'چپِ تصویر', 'پایین-چپِ تصویر', 'پایینِ تصویر', 'پایین-راستِ تصویر'];

  var reduceMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

  state.crossingUi = {};      // per lesson step: { picks, result, explain, pending, error }
  state.crossingRun = null;   // the step currently on screen: { key, crossing, mode, timers, raf }

  function esc(v) { return App.escapeHtml(v == null ? '' : String(v)); }
  function fa(n) { return Number(n || 0).toLocaleString('fa-IR'); }
  function icon(id) { return '<svg class="ui-icon" aria-hidden="true"><use href="#' + id + '"/></svg>'; }
  function uiKey(index) { return state.lesson.lesson.id + ':' + index; }
  function ui(index) {
    var key = uiKey(index);
    if (!state.crossingUi[key]) state.crossingUi[key] = { picks: [], result: null, explain: 0, pending: false, error: false, checked: false };
    return state.crossingUi[key];
  }

  // ── Geometry ────────────────────────────────────────────────────────────────
  function arm(crossing, id) { return crossing.arms.find(function(a) { return a.id === id; }); }
  function halfWidth(a) { return (a.lanes || 1) * LANE; }
  function junction(crossing) {
    return Math.max.apply(null, crossing.arms.map(halfWidth)) + 8;
  }
  /** Arm-local point (x outward from the centre, y to the right of an outbound driver) → SVG point. */
  function toWorld(a, x, y) {
    var r = -a.angle * Math.PI / 180;
    return { x: x * Math.cos(r) - y * Math.sin(r), y: x * Math.sin(r) + y * Math.cos(r) };
  }
  function laneY(v, inbound) { var y = ((v.lane || 0) + 0.5) * LANE; return inbound ? -y : y; }
  function heading(a, inbound) { return inbound ? 180 - a.angle : -a.angle; }

  function geometry(crossing, v) {
    var J = junction(crossing);
    var from = arm(crossing, v.from);
    var to = arm(crossing, v.to);
    var p0 = toWorld(from, J + STOP_AT, laneY(v, true));
    var p1 = toWorld(from, J, laneY(v, true));
    var p2 = toWorld(to, J, laneY(v, false));
    var p3 = toWorld(to, FAR, laneY(v, false));
    var d = 'M' + p0.x.toFixed(1) + ' ' + p0.y.toFixed(1) + ' L' + p1.x.toFixed(1) + ' ' + p1.y.toFixed(1);
    if (v.move === 'straight') {
      d += ' L' + p2.x.toFixed(1) + ' ' + p2.y.toFixed(1);
    } else {
      // Control point where the entry and exit lane lines meet. A left turn is
      // pulled towards the centre so the centre stays on the driver's right
      // (Codice della Strada art. 154 c.3 lett. b).
      var h1 = heading(from, true) * Math.PI / 180;
      var h2 = heading(to, false) * Math.PI / 180;
      var d1 = { x: Math.cos(h1), y: Math.sin(h1) };
      var d2 = { x: Math.cos(h2), y: Math.sin(h2) };
      var den = d1.x * d2.y - d1.y * d2.x;
      var t = ((p2.x - p1.x) * d2.y - (p2.y - p1.y) * d2.x) / den;
      var c = { x: p1.x + d1.x * t, y: p1.y + d1.y * t };
      if (v.move === 'left') c = { x: c.x * 0.3, y: c.y * 0.3 };
      d += ' Q' + c.x.toFixed(1) + ' ' + c.y.toFixed(1) + ' ' + p2.x.toFixed(1) + ' ' + p2.y.toFixed(1);
    }
    d += ' L' + p3.x.toFixed(1) + ' ' + p3.y.toFixed(1);
    return { d: d, start: p0, startHeading: heading(from, true) };
  }

  function sideOf(angle) {
    var n = ((Math.round(angle / 45) % 8) + 8) % 8;
    return SIDES[n];
  }

  // ── Drawing ─────────────────────────────────────────────────────────────────
  function armRoadSvg(a) {
    var hw = halfWidth(a);
    return '<rect class="xg-road" transform="rotate(' + (-a.angle) + ')" x="0" y="' + (-hw) + '" width="' + (FAR + 20) + '" height="' + (hw * 2) + '"/>';
  }

  /** Markings, rails and signs — drawn after every road so rails cross the junction. */
  function armSvg(crossing, a) {
    var J = junction(crossing);
    var hw = halfWidth(a);
    var rot = 'rotate(' + (-a.angle) + ')';
    var out = '<g transform="' + rot + '">' +
      '<rect class="xg-arm-hi" data-arm="' + esc(a.id) + '" x="' + J + '" y="' + (-hw) + '" width="' + (FAR + 20 - J) + '" height="' + (hw * 2) + '"/>' +
      '<line class="xg-centre" x1="' + J + '" y1="0" x2="' + (FAR + 20) + '" y2="0"/>';
    for (var l = 1; l < (a.lanes || 1); l++) {
      out += '<line class="xg-lane" x1="' + J + '" y1="' + (-l * LANE) + '" x2="' + (FAR + 20) + '" y2="' + (-l * LANE) + '"/>' +
        '<line class="xg-lane" x1="' + J + '" y1="' + (l * LANE) + '" x2="' + (FAR + 20) + '" y2="' + (l * LANE) + '"/>';
    }
    if (a.tram) {
      [-LANE / 2, LANE / 2].forEach(function(y) {
        out += '<line class="xg-rail" x1="-' + J + '" y1="' + (y - 4) + '" x2="' + (FAR + 20) + '" y2="' + (y - 4) + '"/>' +
          '<line class="xg-rail" x1="-' + J + '" y1="' + (y + 4) + '" x2="' + (FAR + 20) + '" y2="' + (y + 4) + '"/>';
      });
    }
    if (a.sign) {
      // Give-way teeth (or a solid STOP line) across the inbound half, sign on the driver's right.
      for (var i = 0; i < hw / 5; i++) {
        var y0 = -i * 5;
        out += a.sign === 'stop'
          ? ''
          : '<path class="xg-teeth" d="M' + (J + 2) + ' ' + (y0 - 4.5) + ' L' + (J + 2) + ' ' + (y0 - 0.5) + ' L' + (J + 7) + ' ' + (y0 - 2.5) + 'Z"/>';
      }
      if (a.sign === 'stop') out += '<line class="xg-stopline" x1="' + (J + 3) + '" y1="' + (-hw) + '" x2="' + (J + 3) + '" y2="0"/>';
      var sx = J + 16;
      var sy = -hw - 14;
      out += '<g class="xg-sign" data-sign="' + esc(a.id) + '" transform="translate(' + sx + ' ' + sy + ') rotate(' + a.angle + ')">' +
        '<circle class="xg-sign-ring" r="16"/>' +
        (a.sign === 'stop'
          ? '<polygon points="-4,-10 4,-10 10,-4 10,4 4,10 -4,10 -10,4 -10,-4"/><text y="3" text-anchor="middle">STOP</text>'
          : '<polygon points="-11,-8 11,-8 0,11"/>') +
        '</g>';
    }
    return out + '</g>';
  }

  function vehicleSvg(crossing, v, index) {
    var size = SIZES[v.kind] || SIZES.car;
    var L = size[0], W = size[1];
    var fill = v.kind === 'tram' ? '#2E9E5B' : COLORS[index % COLORS.length];
    var body = '<rect x="' + (-L / 2) + '" y="' + (-W / 2) + '" width="' + L + '" height="' + W + '" rx="4" fill="' + fill + '"/>' +
      '<path class="xg-front" d="M' + (L / 2 - 7) + ' ' + (-W / 2 + 3) + ' L' + (L / 2 - 2) + ' 0 L' + (L / 2 - 7) + ' ' + (W / 2 - 3) + 'Z"/>';
    return '<g class="xg-vehicle" data-vehicle="' + esc(v.id) + '"' + (v.leaving ? ' data-leaving="1"' : '') + '>' +
      '<g class="xg-body">' + body + '<rect class="xg-ring" x="' + (-L / 2 - 3) + '" y="' + (-W / 2 - 3) + '" width="' + (L + 6) + '" height="' + (W + 6) + '" rx="6"/></g>' +
      '<g class="xg-badge"><circle r="8.5"/><text y="4" text-anchor="middle">' + esc(v.id) + '</text></g>' +
    '</g>';
  }

  function crossingSvg(crossing) {
    var labels = crossing.vehicles.map(function(v) {
      return v.id + ': ' + KIND_FA[v.kind] + '، از ' + sideOf(arm(crossing, v.from).angle) + '، ' + (v.leaving ? 'در حال خروج' : MOVE_FA[v.move]);
    }).join('؛ ');
    var paths = crossing.vehicles.filter(function(v) { return !v.leaving; }).map(function(v) {
      return '<path class="xg-path" data-path="' + esc(v.id) + '" d="' + geometry(crossing, v).d + '" marker-end="url(#xg-arrow)"/>';
    }).join('');
    return '<svg class="xing-svg" viewBox="' + (-VIEW) + ' ' + (-VIEW) + ' ' + (VIEW * 2) + ' ' + (VIEW * 2) + '" role="img" aria-label="' + esc('بازسازی آموزشی شکل ' + crossing.figure + '. ' + labels) + '">' +
      '<defs><marker id="xg-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z"/></marker></defs>' +
      '<rect class="xg-ground" x="' + (-VIEW) + '" y="' + (-VIEW) + '" width="' + (VIEW * 2) + '" height="' + (VIEW * 2) + '" rx="14"/>' +
      crossing.arms.map(armRoadSvg).join('') +
      crossing.arms.map(function(a) { return armSvg(crossing, a); }).join('') +
      paths +
      crossing.vehicles.map(function(v, i) { return vehicleSvg(crossing, v, i); }).join('') +
    '</svg>';
  }

  function legendHtml(crossing) {
    var rows = crossing.vehicles.map(function(v) {
      var from = arm(crossing, v.from);
      return '<li><span class="xing-letter" dir="ltr">' + esc(v.id) + '</span><span>' + esc(KIND_FA[v.kind]) + '، از ' + esc(sideOf(from.angle)) +
        '، ' + esc(v.leaving ? 'از تقاطع بیرون می‌رود (در ترتیب نیست)' : MOVE_FA[v.move]) + '</span></li>';
    });
    crossing.arms.forEach(function(a) {
      if (!a.sign) return;
      var who = crossing.vehicles.filter(function(v) { return v.from === a.id; }).map(function(v) { return v.id; });
      rows.push('<li><span class="xing-letter is-sign" aria-hidden="true">▽</span><span>جلوی ' + esc(who.join(' و ') || 'بازوی ' + sideOf(a.angle)) +
        ': تابلوی <bdi dir="ltr">' + (a.sign === 'stop' ? 'STOP' : 'DARE PRECEDENZA') + '</bdi></span></li>');
    });
    if (crossing.arms.some(function(a) { return a.tram; })) {
      rows.push('<li><span class="xing-letter is-sign" aria-hidden="true">═</span><span>ریلِ تراموا در جاده‌ی چپ–راست</span></li>');
    }
    return '<ul class="xing-legend">' + rows.join('') + '</ul>';
  }

  // ── Step HTML (called by learn.js) ──────────────────────────────────────────
  App.crossingStepHtml = function(content, index) {
    var crossing = content.crossing;
    var original = '/images/signs/' + crossing.figure + '.png';
    return '<h2 class="lesson-step-title" tabindex="-1" data-step-heading>' + esc(content.title) + '</h2>' +
      '<p class="lesson-text">' + esc(content.body) + '</p>' +
      '<figure class="xing-figure">' + crossingSvg(crossing) +
        '<figcaption class="xing-caption">' + icon('i-sign') + '<span>بازسازی آموزشی از شکل ' + fa(crossing.figure) +
          ' بانک سؤال؛ تمرین آموزشی است، نه سؤال رسمی.</span></figcaption>' +
      '</figure>' +
      '<div id="xing-panel" class="xing-panel"></div>' +
      legendHtml(crossing) +
      '<details class="xing-original"><summary>' + icon('i-book') + '<span>مقایسه با شکلِ اصلیِ بانک</span></summary>' +
        '<img src="' + original + '" alt="شکل ' + esc(fa(crossing.figure)) + ' از بانک سؤال" loading="lazy" /></details>' +
      '<p id="xing-takeaway" class="lesson-takeaway"' + (content.kind === 'order' && !ui(index).result ? ' hidden' : '') + '>' +
        icon('i-sparkles') + '<span>' + esc(content.takeaway) + '</span></p>' +
      (content.rule ? '<p class="lesson-rule">مبنا: <bdi dir="ltr">' + esc(content.rule) + '</bdi></p>' : '');
  };

  /** After learn.js has put the step HTML in the DOM. */
  App.mountCrossing = function(content, index) {
    stopRun();
    state.crossingRun = { key: uiKey(index), index: index, content: content, timers: [], raf: 0 };
    renderPanel();
  };

  /** True when "Next" may leave this step: the order was checked at least once (a retry keeps this). */
  App.crossingDone = function(index) {
    return ui(index).checked;
  };

  // ── Panel: picking → verdict + explanation ─────────────────────────────────
  function run() { return state.crossingRun; }

  function renderPanel() {
    var r = run();
    if (!r) return;
    var panel = document.getElementById('xing-panel');
    if (!panel) return;
    var content = r.content;
    if (content.kind === 'scenario') {
      panel.innerHTML = stepperHtml(content.guide.map(function(g) { return g.text; }), ui(r.index).explain, false);
      showGuide(ui(r.index).explain);
      return;
    }
    var u = ui(r.index);
    panel.innerHTML = u.result ? resultHtml(content.crossing, u) : pickerHtml(content.crossing, u);
    if (u.result) showPhase(u.explain, false);
    else showStart();
  }

  function active(crossing) { return crossing.vehicles.filter(function(v) { return !v.leaving; }); }

  function pickerHtml(crossing, u) {
    var vehicles = active(crossing);
    var slots = vehicles.map(function(_, i) {
      var id = u.picks[i];
      return '<li class="xing-slot' + (id ? ' is-filled' : '') + '"><span class="xing-slot-num">' + fa(i + 1) + '</span>' +
        (id ? '<span class="xing-letter" dir="ltr">' + esc(id) + '</span>' : '<span class="xing-slot-empty">…</span>') + '</li>';
    }).join('');
    var buttons = vehicles.map(function(v) {
      var picked = u.picks.indexOf(v.id) !== -1;
      return '<button type="button" class="xing-pick" aria-pressed="' + picked + '"' + (picked || u.pending ? ' disabled' : '') +
        ' onclick="App.crossingPick(\'' + esc(v.id) + '\')"><span class="xing-letter" dir="ltr">' + esc(v.id) + '</span>' +
        '<span class="xing-pick-copy">' + esc(KIND_FA[v.kind]) + '<small>از ' + esc(sideOf(arm(crossing, v.from).angle)) + '، ' + esc(MOVE_FA[v.move]) + '</small></span></button>';
    }).join('');
    var complete = u.picks.length === vehicles.length;
    return '<p class="xing-instruction">' + icon('i-route') + '<span>وسیله‌ها را به ترتیبِ عبور لمس کن: اول کسی که اول رد می‌شود.</span></p>' +
      '<ol class="xing-slots" aria-label="ترتیبِ انتخاب‌شده">' + slots + '</ol>' +
      '<div class="xing-picks" role="group" aria-label="انتخاب وسیله‌ها">' + buttons + '</div>' +
      '<div class="xing-actions">' +
        '<button type="button" class="btn btn-secondary btn-sm" onclick="App.crossingUndo()"' + (u.picks.length && !u.pending ? '' : ' disabled') + '>' +
          icon('i-chevron-right') + '<span>برگرداندنِ آخری</span></button>' +
        '<button type="button" class="btn btn-quiet btn-sm" onclick="App.crossingReset()"' + (u.picks.length && !u.pending ? '' : ' disabled') + '>' +
          icon('i-review') + '<span>از نو</span></button>' +
        '<button type="button" class="btn btn-primary btn-sm xing-submit" onclick="App.crossingSubmit()"' + (complete && !u.pending ? '' : ' disabled') + '>' +
          '<span>' + (u.pending ? 'در حال بررسی…' : 'بررسیِ ترتیب') + '</span></button>' +
      '</div>' +
      '<p id="xing-status" class="practice-status' + (u.error ? ' is-error' : '') + '" role="status" aria-live="polite">' +
        (u.error ? 'بررسی انجام نشد. اتصال را بررسی کن و دوباره «بررسیِ ترتیب» را بزن؛ انتخاب‌هایت سر جایش است.' : '') + '</p>';
  }

  function resultHtml(crossing, u) {
    var res = u.result;
    var together = res.phases.filter(function(g) { return g.length > 1; }).map(function(g) {
      return g.join(' و ') + ' با هم رد می‌شوند؛ هر ترتیبی بین آن‌ها قبول است.';
    });
    var verdict = res.valid
      ? '<p class="xing-verdict is-valid" tabindex="-1" id="xing-verdict">' + icon('i-check') + '<span>ترتیبت درست است: <b dir="ltr">' + esc(u.picks.join(', ')) + '</b></span></p>'
      : '<p class="xing-verdict is-invalid" tabindex="-1" id="xing-verdict">' + icon('i-x') + '<span>این ترتیب درست نیست: <b dir="ltr">' + esc(u.picks.join(', ')) + '</b></span></p>';
    var mistake = res.valid ? '' :
      '<p class="xing-mistake">«<b dir="ltr">' + esc(res.mistake.vehicle) + '</b>» را زودتر از نوبتش انتخاب کردی. ' + esc(crossing.waits[res.mistake.vehicle] || '') + '</p>';
    // Rendered left-to-right (dir="ltr"), so the arrow points forward in reading order.
    var order = res.phases.map(function(g) { return g.join(' + '); }).join(' → ');
    // Controls sit right under the verdict so the drawing and the current step fit on one phone screen.
    return verdict +
      stepperHtml(crossing.explain.map(function(e) { return e.text; }), u.explain, true) +
      mistake +
      (together.length ? '<p class="xing-note">' + esc(together.join(' ')) + '</p>' : '') +
      '<p class="xing-answer">ترتیبِ درست طبق بانک سؤال: <b dir="ltr">' + esc(order) + '</b></p>' +
      '<button type="button" class="btn btn-quiet btn-sm xing-retry" onclick="App.crossingRetry()">' + icon('i-review') + '<span>دوباره امتحان کن</span></button>';
  }

  /** Controls + the current step right under the drawing; the full text below for reading without motion. */
  function stepperHtml(texts, current, canPlay) {
    var items = texts.map(function(text, i) {
      return '<li' + (i === current ? ' class="is-current" aria-current="step"' : '') + '>' +
        '<button type="button" class="xing-step-btn" onclick="App.crossingGoTo(' + i + ')"><span class="xing-step-num">' + fa(i + 1) + '</span>' +
        '<span>' + esc(text) + '</span></button></li>';
    }).join('');
    var play = canPlay && !reduceMotion.matches
      ? '<button type="button" class="btn btn-secondary btn-sm" id="xing-play" onclick="App.crossingPlay()">' + icon('i-route') + '<span>پخشِ حرکت</span></button>'
      : '';
    return '<div class="xing-stepper">' +
      '<div class="xing-stepper-bar">' +
        '<button type="button" class="icon-button" onclick="App.crossingGoTo(' + (current - 1) + ')"' + (current > 0 ? '' : ' disabled') + ' aria-label="قدمِ قبلی">' + icon('i-chevron-right') + '</button>' +
        '<span class="xing-stepper-count">قدم ' + fa(current + 1) + ' از ' + fa(texts.length) + '</span>' +
        '<button type="button" class="icon-button" onclick="App.crossingGoTo(' + (current + 1) + ')"' + (current < texts.length - 1 ? '' : ' disabled') + ' aria-label="قدمِ بعدی">' + icon('i-chevron-left') + '</button>' +
        play +
      '</div>' +
      '<p class="xing-current" aria-live="polite">' + esc(texts[current]) + '</p>' +
      '<details class="xing-all"><summary>' + icon('i-book') + '<span>همه‌ی قدم‌ها، یک‌جا</span></summary>' +
        '<ol class="xing-steps">' + items + '</ol></details>' +
    '</div>';
  }

  // ── Actions ────────────────────────────────────────────────────────────────
  App.crossingPick = function(id) {
    var r = run();
    if (!r) return;
    var u = ui(r.index);
    if (u.pending || u.result || u.picks.indexOf(id) !== -1) return;
    u.picks.push(id);
    u.error = false;
    renderPanel();
  };

  App.crossingUndo = function() {
    var r = run();
    if (!r) return;
    var u = ui(r.index);
    if (u.pending || u.result) return;
    u.picks.pop();
    renderPanel();
  };

  App.crossingReset = function() {
    var r = run();
    if (!r) return;
    var u = ui(r.index);
    if (u.pending || u.result) return;
    u.picks = [];
    u.error = false;
    renderPanel();
  };

  App.crossingRetry = function() {
    var r = run();
    if (!r) return;
    stopRun();
    state.crossingUi[r.key] = { picks: [], result: null, explain: 0, pending: false, error: false, checked: ui(r.index).checked };
    var takeaway = document.getElementById('xing-takeaway');
    if (takeaway) takeaway.hidden = true;
    renderPanel();
  };

  App.crossingSubmit = async function() {
    var r = run();
    if (!r || !state.lesson) return;
    var u = ui(r.index);
    if (u.pending || u.result || u.picks.length !== active(r.content.crossing).length) return;
    var requestId = state.lessonRequestId;
    var key = r.key;
    u.pending = true;
    u.error = false;
    renderPanel();
    try {
      var res = await api('POST', '/learn/lessons/' + encodeURIComponent(state.lesson.lesson.id) + '/order', { step: r.index, sequence: u.picks.slice() });
      u.result = res;
      u.explain = 0;
      u.checked = true;
    } catch (e) {
      u.error = true;
    } finally {
      u.pending = false;
    }
    // The learner may have moved on while the request was in flight.
    if (requestId !== state.lessonRequestId || !run() || run().key !== key) return;
    renderPanel();
    if (u.result) {
      var takeaway = document.getElementById('xing-takeaway');
      if (takeaway) takeaway.hidden = false;
      var verdict = document.getElementById('xing-verdict');
      if (verdict) verdict.focus({ preventScroll: false });
      if (typeof App.refreshLessonDock === 'function') App.refreshLessonDock();
    }
  };

  /** Bring the drawing back on screen; the controls sit right under it. */
  function showFigure() {
    var figure = document.querySelector('.xing-figure');
    if (figure) figure.scrollIntoView({ block: 'start', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  }

  App.crossingGoTo = function(i) {
    var r = run();
    if (!r) return;
    var u = ui(r.index);
    var total = r.content.kind === 'scenario' ? r.content.guide.length : r.content.crossing.phases.length;
    if (i < 0 || i >= total) return;
    if (r.content.kind === 'order' && !u.result) return;
    stopRun();
    u.explain = i;
    renderPanel();
    showFigure();
    if (r.content.kind === 'order' && !reduceMotion.matches) showPhase(i, true);
  };

  App.crossingPlay = function() {
    var r = run();
    if (!r || reduceMotion.matches) return;
    var u = ui(r.index);
    if (!u.result) return;
    var last = r.content.crossing.phases.length - 1;
    var start = u.explain >= last ? 0 : u.explain;
    stopRun();
    showFigure();
    var playing = run();
    function step(i) {
      if (run() !== playing) return;
      u.explain = i;
      renderPanel();
      var btn = document.getElementById('xing-play');
      if (btn) { btn.innerHTML = icon('i-x') + '<span>توقف</span>'; btn.onclick = function() { stopRun(); renderPanel(); }; }
      showPhase(i, true);
      if (i < last) playing.timers.push(setTimeout(function() { step(i + 1); }, STEP_MS + PAUSE_MS));
    }
    step(start);
  };

  function stopRun() {
    var r = run();
    if (!r) return;
    r.timers.forEach(clearTimeout);
    r.timers = [];
    if (r.raf) cancelAnimationFrame(r.raf);
    r.raf = 0;
    // A fresh object identity cancels any in-flight playback callbacks.
    state.crossingRun = { key: r.key, index: r.index, content: r.content, timers: [], raf: 0 };
  }

  // ── Scene state on the SVG ──────────────────────────────────────────────────
  function svgEl() { return document.querySelector('.xing-svg'); }

  function place(el, pathEl, t) {
    var len = pathEl.getTotalLength();
    var p = pathEl.getPointAtLength(len * t);
    var q = pathEl.getPointAtLength(Math.min(len, len * t + 1));
    var back = t >= 1 ? pathEl.getPointAtLength(len - 1) : p;
    var dx = t >= 1 ? p.x - back.x : q.x - p.x;
    var dy = t >= 1 ? p.y - back.y : q.y - p.y;
    var deg = Math.atan2(dy, dx) * 180 / Math.PI;
    el.querySelector('.xg-body').setAttribute('transform', 'rotate(' + deg.toFixed(1) + ')');
    el.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ')');
  }

  function placeLeaving(crossing, el, v) {
    var to = arm(crossing, v.to);
    var p = toWorld(to, junction(crossing) + 70, laneY(v, false));
    el.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ')');
    el.querySelector('.xg-body').setAttribute('transform', 'rotate(' + heading(to, false) + ')');
  }

  function setScene(fn) {
    var svg = svgEl();
    var r = run();
    if (!svg || !r) return;
    var crossing = r.content.crossing;
    crossing.vehicles.forEach(function(v) {
      var el = svg.querySelector('[data-vehicle="' + v.id + '"]');
      var path = svg.querySelector('[data-path="' + v.id + '"]');
      if (!el) return;
      if (v.leaving) { placeLeaving(crossing, el, v); }
      fn(v, el, path);
    });
  }

  function cls(el, name, on) { if (el) el.classList.toggle(name, !!on); }

  function highlightArms(ids) {
    var svg = svgEl();
    if (!svg) return;
    svg.querySelectorAll('[data-arm]').forEach(function(el) { cls(el, 'is-on', ids.indexOf(el.getAttribute('data-arm')) !== -1); });
    svg.querySelectorAll('[data-sign]').forEach(function(el) { cls(el, 'is-on', ids.indexOf(el.getAttribute('data-sign')) !== -1); });
  }

  /** Before submitting: everyone waits at the start of their path. */
  function showStart() {
    highlightArms([]);
    var picks = ui(run().index).picks;
    setScene(function(v, el, path) {
      if (path) place(el, path, 0);
      cls(el, 'is-active', picks.indexOf(v.id) !== -1);
      cls(el, 'is-done', false);
      cls(el, 'is-dim', !!v.leaving);
      cls(path, 'is-active', false);
    });
  }

  function showGuide(i) {
    var g = run().content.guide[i];
    highlightArms(g.arms || []);
    setScene(function(v, el, path) {
      if (path) place(el, path, 0);
      var on = g.focus.indexOf(v.id) !== -1;
      cls(el, 'is-active', on);
      cls(el, 'is-done', false);
      cls(el, 'is-dim', g.focus.length > 0 && !on);
      cls(path, 'is-active', false);
    });
  }

  /** Phase i of the verified order: earlier phases have left, phase i is crossing. */
  function showPhase(i, animate) {
    var r = run();
    var crossing = r.content.crossing;
    var phaseOfVehicle = {};
    r.content.crossing.phases.forEach(function(group, p) { group.forEach(function(id) { phaseOfVehicle[id] = p; }); });
    highlightArms(crossing.explain[i].signs || []);
    var moving = [];
    setScene(function(v, el, path) {
      if (v.leaving) { cls(el, 'is-dim', true); return; }
      var p = phaseOfVehicle[v.id];
      cls(el, 'is-done', p < i);
      cls(el, 'is-active', p === i);
      cls(el, 'is-dim', p > i);
      cls(path, 'is-active', p === i);
      if (p < i) place(el, path, 1);
      else if (p > i) place(el, path, 0);
      else if (animate && !reduceMotion.matches) moving.push({ el: el, path: path });
      else place(el, path, 0.5);
    });
    if (!moving.length) return;
    var started = null;
    var current = run();
    function frame(now) {
      if (run() !== current) return;
      if (started === null) started = now;
      var t = Math.min(1, (now - started) / STEP_MS);
      var eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      moving.forEach(function(m) { place(m.el, m.path, eased); });
      if (t < 1) current.raf = requestAnimationFrame(frame);
    }
    current.raf = requestAnimationFrame(frame);
  }

  /** learn.js calls this when the lesson step changes, so playback never outlives its step. */
  App.leaveCrossing = function() {
    stopRun();
    state.crossingRun = null;
  };
})();
