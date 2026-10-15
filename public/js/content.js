/* Question attribution, quality labels and the content-report workflow. */
(function() {
  'use strict';
  const App = window.App;
  const kinds = { translation: 'ترجمه', explanation: 'توضیح پاسخ', answer: 'پاسخ سؤال', source: 'منبع سؤال' };

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function link(citation) {
    if (!citation || !citation.url) return null;
    let url;
    try { url = new URL(citation.url); } catch (_) { return null; }
    if (url.protocol !== 'https:' || !['github.com', 'www.ilportaledellautomobilista.it'].includes(url.hostname)) return null;
    const a = element('a', citation.title + (citation.reference ? ' · ' + citation.reference : ''));
    a.href = url.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    return a;
  }

  App.renderSourceBlock = function(container, source, questionId, locked) {
    container.replaceChildren();
    container.classList.add('question-source');
    container.hidden = false;
    container.appendChild(element('span', 'منبع: ' + (source ? source.title : 'در حال دریافت…'), 'source-title'));
    if (container.classList.contains('compact-source')) {
      const details = element('button', 'منبع و گزارش', 'content-report-button');
      details.type = 'button';
      details.onclick = function() { App.openQuestionSource(source, questionId, locked); };
      container.appendChild(details);
      return;
    }
    if (source) {
      [source, source.official].forEach(function(item) {
        const citation = locked ? null : link(item);
        if (citation) container.appendChild(citation);
      });
      if (locked) container.appendChild(element('span', 'لینک پاسخ‌دار پس از پایان آزمون باز می‌شود.', 'source-note'));
      else if (source.note) container.appendChild(element('span', source.note, 'source-note'));
    }
    const report = element('button', 'گزارش اشتباه', 'content-report-button');
    report.type = 'button';
    report.onclick = function() { App.openContentReport(questionId); };
    container.appendChild(report);
  };

  App.openQuestionSource = function(source, questionId, locked) {
    const dialog = element('dialog', '', 'content-report-dialog');
    dialog.setAttribute('aria-label', 'منبع سؤال');
    const body = element('div');
    App.renderSourceBlock(body, source, questionId, locked);
    // Close the source dialog before opening the reporting form.
    body.querySelector('.content-report-button').onclick = function() { dialog.close(); App.openContentReport(questionId); };
    const close = element('button', 'بستن', 'btn btn-secondary'); close.type = 'button';
    close.onclick = function() { dialog.close(); };
    dialog.append(body, close);
    dialog.addEventListener('close', function() { dialog.remove(); });
    document.body.appendChild(dialog);
    dialog.showModal();
  };

  App.renderQuestionSource = function(q) {
    const box = document.getElementById('exam-question-source');
    if (!box) return;
    const answered = state.answers[q.questionId] !== undefined;
    box.hidden = !answered;
    if (!answered) { box.replaceChildren(); return; }
    const locked = App.isDeferredExam() && !state.aiEnabled;
    App.renderSourceBlock(box, q.source, q.questionId, locked);
    const mode = locked ? 'locked' : 'open';
    if (q.sourceFetchMode === mode || q.sourcePending) return;
    q.sourcePending = true;
    const sessionId = state.sessionId;
    api('GET', '/content/' + q.questionId + '/source').then(function(data) {
      q.source = data.source;
      q.sourceFetchMode = mode;
      const current = state.questions[state.currentIndex];
      if (state.sessionId === sessionId && current && current.questionId === q.questionId) {
        // Re-evaluate the current lock; a slow response must not undo a toggle.
        App.renderSourceBlock(box, q.source, q.questionId, App.isDeferredExam() && !state.aiEnabled);
      }
    }).catch(function() {
      const current = state.questions[state.currentIndex];
      if (state.sessionId === sessionId && current && current.questionId === q.questionId) {
        App.renderSourceBlock(box, { title: 'دریافت منبع انجام نشد؛ دوباره تلاش کن.', url: null }, q.questionId, locked);
        const retry = element('button', 'دوباره', 'content-report-button');
        retry.type = 'button';
        retry.onclick = function() { App.renderQuestionSource(q); };
        box.appendChild(retry);
      }
    }).finally(function() {
      q.sourcePending = false;
      const current = state.questions[state.currentIndex];
      const nextMode = App.isDeferredExam() && !state.aiEnabled ? 'locked' : 'open';
      if (state.sessionId === sessionId && current === q && mode !== nextMode) App.renderQuestionSource(q);
    });
  };

  App.renderContentQuality = function(container, data) {
    container.replaceChildren();
    container.classList.add('content-quality');
    // Approved content speaks for itself; only tell the learner when it is still pending.
    if (data.qualityStatus === 'needs_review') container.appendChild(element('p', data.qualityLabel));
    if (data.source && data.questionId) {
      const sourceBox = element('div');
      App.renderSourceBlock(sourceBox, data.source, data.questionId, false);
      container.appendChild(sourceBox);
    }
  };

  App.openContentReport = function(questionId) {
    const previous = document.getElementById('content-report-dialog');
    if (previous) previous.remove();
    const dialog = element('dialog', '', 'content-report-dialog');
    dialog.id = 'content-report-dialog';
    dialog.setAttribute('aria-labelledby', 'content-report-title');
    const form = element('form');
    const title = element('h2', 'گزارش اشکال این سؤال');
    title.id = 'content-report-title';
    const kindLabel = element('label', 'کدام بخش اشکال دارد؟');
    const select = element('select');
    select.name = 'kind';
    Object.keys(kinds).forEach(function(kind) { const option = element('option', kinds[kind]); option.value = kind; select.appendChild(option); });
    kindLabel.appendChild(select);
    const noteLabel = element('label', 'توضیح کوتاه (اختیاری)');
    const note = element('textarea');
    note.name = 'note';
    note.maxLength = 1000;
    note.rows = 4;
    noteLabel.appendChild(note);
    const status = element('p', '', 'content-report-status');
    status.setAttribute('role', 'status');
    const send = element('button', 'ثبت گزارش', 'btn btn-primary');
    send.type = 'submit';
    const cancel = element('button', 'بستن', 'btn btn-secondary');
    cancel.type = 'button';
    cancel.onclick = function() { dialog.close(); };
    [title, kindLabel, noteLabel, status, send, cancel].forEach(function(node) { form.appendChild(node); });
    form.onsubmit = async function(event) {
      event.preventDefault(); send.disabled = true;
      try {
        await api('POST', '/content/' + questionId + '/report', { kind: select.value, note: note.value });
        status.textContent = 'گزارش ثبت شد و در فهرست بررسی مدیر قرار گرفت.';
        send.hidden = true;
      } catch (error) { status.textContent = error.message || 'گزارش ثبت نشد؛ دوباره تلاش کن.'; send.disabled = false; }
    };
    const opener = document.activeElement;
    dialog.addEventListener('close', function() { dialog.remove(); if (opener && opener.isConnected) opener.focus(); });
    dialog.appendChild(form);
    document.body.appendChild(dialog);
    dialog.showModal();
  };

  App.loadContentReports = async function(offset) {
    const container = document.getElementById('admin-content-reports');
    if (!container) return;
    offset = Number(offset) || 0;
    container.textContent = 'در حال دریافت گزارش‌ها…';
    try {
      const data = await api('GET', '/admin/content-reports?offset=' + offset);
      container.replaceChildren();
      const summary = document.getElementById('content-audit-summary');
      if (summary) summary.textContent = data.total + ' گزارش باز · ' + (data.audit || []).map(function(item) {
        const label = { legacy: 'بررسی‌نشده', needs_review: 'نیازمند بررسی', source_checked: 'تطبیق رسمی', machine_checked: 'بررسی خودکار', human_reviewed: 'بازبینی مدیر' }[item.quality_status] || item.quality_status;
        return item.count + ' ' + label;
      }).join(' · ');
      if (!data.reports.length) container.textContent = 'گزارش بازی وجود ندارد.';
      data.reports.forEach(function(report) {
        const card = element('details', '', 'content-review-card');
        card.appendChild(element('summary', 'سؤال ' + report.question_id + ' · ' + (kinds[report.kind] || report.kind)));
        const text = element('p', report.text_it); text.dir = 'ltr'; card.appendChild(text);
        card.appendChild(element('p', 'پاسخ بانک: ' + (report.correct_answer === 1 ? 'VERO' : 'FALSO')));
        card.appendChild(element('p', 'گزارش کاربر: ' + (report.note || 'بدون توضیح')));
        let snapshot;
        try { snapshot = JSON.parse(report.content_snapshot || '{}'); } catch (_) { snapshot = {}; }
        if (snapshot.content) {
          const original = element('details');
          original.appendChild(element('summary', 'متن ذخیره‌شده هنگام گزارش'));
          original.appendChild(element('p', snapshot.content.translated_text || 'ترجمه موجود نبود'));
          original.appendChild(element('p', snapshot.content.explanation || 'توضیح موجود نبود'));
          card.appendChild(original);
        }
        const source = element('div'); App.renderSourceBlock(source, report.source, report.question_id, false); card.appendChild(source);
        const translation = field('ترجمهٔ بازبینی‌شده', report.translated_text || '', 2000);
        const explanation = field('توضیح بازبینی‌شده', report.explanation || '', 4000);
        const reason = field('دلیل تصمیم و شاهد بررسی', '', 1000);
        card.append(translation.label, explanation.label, reason.label);
        const status = element('p'); status.setAttribute('role', 'status'); card.appendChild(status);
        const publish = element('button', 'ثبت اصلاح و بستن گزارش', 'btn btn-primary btn-sm'); publish.type = 'button';
        if (report.kind === 'answer' || report.kind === 'source') {
          publish.hidden = true;
          card.appendChild(element('p', 'این گزارش نیاز به بررسی بانک سؤال دارد. ویرایش ترجمه، پاسخ یا منبع بانک را تغییر نمی‌دهد. تا زمان اصلاح بانک، گزارش را باز نگه دار.'));
        }
        const dismiss = element('button', 'محتوا درست است؛ بستن گزارش', 'btn btn-secondary btn-sm'); dismiss.type = 'button';
        async function resolve(decision) {
          publish.disabled = dismiss.disabled = true;
          try {
            await api('POST', '/admin/content-reports/' + report.id + '/resolve', { status: decision, note: reason.input.value, translatedText: translation.input.value, explanation: explanation.input.value });
            state.translationCache = {}; state.theoryCache = {};
            App.loadContentReports();
          } catch (error) { status.textContent = error.message; publish.disabled = dismiss.disabled = false; }
        }
        publish.onclick = function() { resolve('resolved'); };
        dismiss.onclick = function() { resolve('dismissed'); };
        card.append(publish, dismiss);
        container.appendChild(card);
      });
      if (offset > 0) pageButton('گزارش‌های قبلی', Math.max(0, offset - 50));
      if (offset + data.reports.length < data.total) pageButton('گزارش‌های بعدی', offset + 50);
      function pageButton(label, next) { const button = element('button', label, 'btn btn-secondary btn-sm'); button.type = 'button'; button.onclick = function() { App.loadContentReports(next); }; container.appendChild(button); }
    } catch (error) { container.textContent = 'دریافت گزارش‌ها انجام نشد: ' + error.message; }
    function field(labelText, value, max) {
      const label = element('label', labelText);
      const input = element('textarea'); input.value = value; input.maxLength = max; input.rows = 4;
      label.appendChild(input); return { label: label, input: input };
    }
  };
})();
