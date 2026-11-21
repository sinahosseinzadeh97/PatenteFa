/**
 * public/js/glossary.js
 * Chapter 0 («واژه‌های تخصصی»): the searchable word list from GET /api/learn/glossary.
 * Classic script loaded after learn.js; shares the `state`, `api` and `App` globals
 * (see src/app/client.ts). Wrapped in a function so its helpers never replace
 * learn.js's global ones.
 */
(function() {
  'use strict';

  state.glossary = null;        // { groups, savedTerms } once loaded
  state.glossaryPromise = null;

  function esc(value) { return App.escapeHtml(value == null ? '' : String(value)); }
  function fa(n) { return Number(n || 0).toLocaleString('fa-IR'); }
  function icon(id) { return '<svg class="ui-icon" aria-hidden="true"><use href="#' + id + '"/></svg>'; }

  /**
   * One form for whatever a learner types: lower case, no Italian accents, no Persian
   * diacritics (ezafe, madda, hamza), Arabic ي/ك as Persian ی/ک, and no spaces or ZWNJ,
   * so «پیاده رو», «پیاده‌رو» and «پیادهرو» all find the same word.
   */
  function fold(text) {
    return String(text == null ? '' : text).toLowerCase().normalize('NFD')
      .replace(/[̀-ًͯ-ٰٟ]/g, '')
      .replace(/[يى]/g, 'ی').replace(/ك/g, 'ک').replace(/’/g, "'")
      .replace(/[\s‌‍ـ]/g, '');
  }

  /** True when the query is empty or appears in the term's Italian, Persian or other names. */
  App.glossaryMatches = function(term, query) {
    var q = fold(query);
    return !q || fold([term.it, term.fa].concat(term.alt || []).join('|')).indexOf(q) !== -1;
  };

  // Italian words inside a Persian note keep their own direction and font.
  function noteHtml(text) {
    return String(text).split(/([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’ .]*[A-Za-zÀ-ÿ.…]|[A-Za-zÀ-ÿ])/).map(function(part, i) {
      return i % 2 ? '<bdi dir="ltr" lang="it">' + esc(part) + '</bdi>' : esc(part);
    }).join('');
  }

  function termAt(gi, ti) {
    var group = state.glossary && state.glossary.groups[gi];
    return (group && group.terms[ti]) || null;
  }

  function saveButton(gi, ti, isSaved) {
    return '<button type="button" class="btn btn-secondary btn-sm term-save' + (isSaved ? ' is-saved' : '') + '"' + (isSaved ? ' disabled' : '') +
      ' onclick="App.saveGlossaryTerm(' + gi + ',' + ti + ', this)">' +
      (isSaved ? icon('i-check') + '<span>در واژه‌نامه</span>' : '<span>+ واژه‌نامه</span>') + '</button>';
  }

  function termRow(term, gi, ti, isSaved) {
    return '<li class="term-row">' +
      '<div class="term-copy">' +
        '<span class="term-it" dir="ltr" lang="it">' + esc(term.it) + '</span>' +
        '<span class="term-fa">' + esc(term.fa) + '</span>' +
        (term.note ? '<span class="term-note">' + noteHtml(term.note) + '</span>' : '') +
      '</div>' +
      '<div class="term-actions">' +
        '<button type="button" class="icon-button" onclick="App.speakGlossaryTerm(' + gi + ',' + ti + ')" aria-label="شنیدن تلفظ ' + esc(term.it) + '">' + icon('i-audio') + '</button>' +
        saveButton(gi, ti, isSaved) +
      '</div>' +
    '</li>';
  }

  function renderGlossary() {
    var box = document.getElementById('glossary-list');
    if (!box || !state.glossary) return;
    var saved = state.glossary.savedTerms || [];
    box.innerHTML = state.glossary.groups.map(function(group, gi) {
      var rows = group.terms.map(function(term, ti) { return termRow(term, gi, ti, saved.indexOf(term.it) !== -1); }).join('');
      return '<section class="glossary-group" aria-labelledby="glossary-group-' + gi + '">' +
        '<h2 id="glossary-group-' + gi + '" class="glossary-group-title">' + esc(group.titleFa) +
          '<span class="glossary-group-it" dir="ltr" lang="it">' + esc(group.titleIt) + '</span></h2>' +
        '<ul class="term-list">' + rows + '</ul>' +
      '</section>';
    }).join('') +
      '<div id="glossary-empty" class="empty-state" hidden>' + icon('i-search') +
        '<strong>واژه‌ای پیدا نشد</strong><span>املای دیگری را امتحان کن یا فقط بخشی از کلمه را بنویس.</span></div>';
    App.filterGlossary();
  }

  function renderGlossaryError() {
    var box = document.getElementById('glossary-list');
    var count = document.getElementById('glossary-count');
    if (count) count.textContent = '';
    if (!box) return;
    box.innerHTML = '<div class="empty-state" role="alert">' + icon('i-alert') +
      '<strong>واژه‌ها بارگذاری نشدند</strong><span>اتصال را بررسی کن و دوباره تلاش کن.</span>' +
      '<button type="button" class="btn btn-secondary btn-sm" onclick="App.loadGlossary()">' + icon('i-review') + '<span>تلاش دوباره</span></button></div>';
  }

  App.loadGlossary = function() {
    if (state.glossary) {
      App.filterGlossary();
      return Promise.resolve(state.glossary);
    }
    if (state.glossaryPromise) return state.glossaryPromise;
    state.glossaryPromise = api('GET', '/learn/glossary')
      .then(function(data) {
        state.glossary = data;
        renderGlossary();
        return data;
      })
      .catch(function() {
        renderGlossaryError();
        return null;
      })
      .then(function(result) {
        state.glossaryPromise = null;
        return result;
      });
    return state.glossaryPromise;
  };

  App.filterGlossary = function() {
    var box = document.getElementById('glossary-list');
    if (!box || !state.glossary) return;
    var input = document.getElementById('glossary-search-input');
    var query = input ? input.value : '';
    var groups = state.glossary.groups;
    var shown = 0;
    box.querySelectorAll('.glossary-group').forEach(function(section, gi) {
      var visible = 0;
      section.querySelectorAll('.term-row').forEach(function(row, ti) {
        var match = App.glossaryMatches(groups[gi].terms[ti], query);
        row.hidden = !match;
        if (match) visible++;
      });
      section.hidden = visible === 0;
      shown += visible;
    });
    var empty = document.getElementById('glossary-empty');
    if (empty) empty.hidden = shown > 0;
    var count = document.getElementById('glossary-count');
    if (count) count.textContent = fold(query) ? fa(shown) + ' واژه پیدا شد' : fa(shown) + ' واژه در ' + fa(groups.length) + ' بخش';
  };

  App.speakGlossaryTerm = function(gi, ti) {
    var term = termAt(gi, ti);
    if (term) App.speakItalian(term.it);
  };

  App.saveGlossaryTerm = async function(gi, ti, btn) {
    var term = termAt(gi, ti);
    if (!term || btn.disabled) return;
    btn.disabled = true;
    btn.innerHTML = '<span>در حال ذخیره…</span>';
    try {
      await api('POST', '/vocab', { termIt: term.it, termFa: term.fa, note: term.note || undefined });
      state.glossary.savedTerms = (state.glossary.savedTerms || []).concat(term.it);
      btn.classList.add('is-saved');
      btn.innerHTML = icon('i-check') + '<span>در واژه‌نامه</span>';
      App.toast('«' + term.it + '» به واژه‌نامه اضافه شد.');
    } catch (e) {
      btn.disabled = false;
      btn.innerHTML = '<span>ذخیره نشد، دوباره</span>';
    }
  };
})();
