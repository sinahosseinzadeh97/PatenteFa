/**
 * src/app/screens/tutor.ts
 * AI exam tutor review screen (post-results wrong-answer walkthrough + chat).
 */
export function renderTutorScreen(): string {
  return `
<div id="screen-tutor" class="screen" style="padding:0 0 90px;display:none;flex-direction:column;">
  <!-- Header -->
  <div style="position:sticky;top:0;z-index:10;background:var(--asphalt);padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
    <button onclick="App.showScreen('results', 'back')" style="background:none;border:none;color:var(--ink);font-size:1.2rem;cursor:pointer;padding:4px 8px;">←</button>
    <div style="text-align:center;">
      <h1 style="font-size:1rem;font-weight:700;margin:0;color:var(--ink);">🎓 استاد رفع اشکال هوش مصنوعی</h1>
      <span id="tutor-progress-badge" style="font-size:0.75rem;color:var(--ink-muted);">در حال دریافت اطلاعات...</span>
    </div>
    <div style="width:32px;"></div>
  </div>

  <!-- Loading State -->
  <div id="tutor-loading" style="padding:60px 20px;text-align:center;">
    <div class="spinner" style="margin:0 auto 16px;"></div>
    <div style="font-size:0.92rem;font-weight:600;color:var(--ink);">در حال تحلیل آزمون و استخراج نکات توسط استاد AI...</div>
    <div style="font-size:0.78rem;color:var(--ink-muted);margin-top:6px;">تله‌های سوالات، قوانین آیین‌نامه و لغات در حال استخراج است.</div>
  </div>

  <!-- Content Container -->
  <div id="tutor-content" style="display:none;padding:16px;">
    
    <!-- Question Stepper -->
    <div id="tutor-stepper" style="display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;margin-bottom:12px;scroll-behavior:smooth;"></div>

    <!-- Active Question Tutor Card -->
    <div id="tutor-card" class="card" style="background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:16px;margin-bottom:16px;">
      
      <!-- Question Badge & Answers comparison -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <span id="tutor-q-badge" class="badge" style="background:rgba(220,38,38,0.15);color:#ef4444;font-weight:700;padding:4px 10px;border-radius:8px;font-size:0.78rem;">سوال اشتباه</span>
        <span id="tutor-q-answers-cmp" style="font-size:0.8rem;color:var(--ink-muted);font-family:'Public Sans',sans-serif;" dir="ltr"></span>
      </div>

      <!-- Question Image -->
      <div id="tutor-q-image-container" style="display:none;margin-bottom:12px;text-align:center;">
        <img id="tutor-q-image" src="" style="max-height:160px;border-radius:8px;object-fit:contain;border:1px solid var(--border);" alt="سوال" />
      </div>

      <!-- Italian Question Text -->
      <div id="tutor-q-text-it" dir="ltr" style="font-family:'Public Sans',sans-serif;font-size:0.95rem;font-weight:600;color:var(--ink);line-height:1.4;margin-bottom:8px;background:rgba(255,255,255,0.03);padding:12px;border-radius:10px;border:1px solid var(--border);"></div>

      <!-- Persian Translation -->
      <div id="tutor-q-text-fa" style="font-size:0.88rem;color:var(--ink-muted);line-height:1.5;margin-bottom:14px;padding:0 4px;"></div>

      <hr style="border:none;border-top:1px dashed var(--border);margin:12px 0;" />

      <!-- Trap / Misconception -->
      <div style="margin-bottom:14px;">
        <div style="display:flex;align-items:center;gap:6px;color:#f59e0b;font-weight:700;font-size:0.88rem;margin-bottom:6px;">
          <span>⚠️</span>
          <span>تله سوال و علت اشتباه</span>
        </div>
        <div id="tutor-trap-box" style="font-size:0.85rem;color:var(--ink);line-height:1.6;background:rgba(245,158,11,0.08);border-right:3px solid #f59e0b;padding:10px 12px;border-radius:6px 10px 10px 6px;"></div>
      </div>

      <!-- Rule & Tips -->
      <div style="margin-bottom:14px;">
        <div style="display:flex;align-items:center;gap:6px;color:#10b981;font-weight:700;font-size:0.88rem;margin-bottom:6px;">
          <span>📜</span>
          <span>اصل قانون رسمی آیین‌نامه ایتالیا</span>
        </div>
        <div id="tutor-rule-box" style="font-size:0.85rem;color:var(--ink);line-height:1.6;background:rgba(16,185,129,0.08);border-right:3px solid #10b981;padding:10px 12px;border-radius:6px 10px 10px 6px;"></div>
      </div>

      <!-- Key Vocab -->
      <div id="tutor-vocab-section" style="margin-bottom:14px;">
        <div style="display:flex;align-items:center;gap:6px;color:#3b82f6;font-weight:700;font-size:0.88rem;margin-bottom:6px;">
          <span>🔑</span>
          <span>کلمات و افعال کلیدی سوال</span>
        </div>
        <div id="tutor-vocab-list" style="display:flex;flex-wrap:wrap;gap:8px;"></div>
      </div>

      <!-- Navigation buttons -->
      <div style="display:flex;gap:10px;margin-top:16px;">
        <button id="tutor-prev-btn" onclick="App.prevTutorQuestion()" class="btn btn-ghost" style="flex:1;">← سوال قبلی</button>
        <button id="tutor-next-btn" onclick="App.nextTutorQuestion()" class="btn btn-primary" style="flex:1;">سوال بعدی →</button>
      </div>

    </div>

    <!-- Live Interactive Chat -->
    <div class="card" style="background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:16px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:8px;font-weight:700;font-size:0.9rem;color:var(--ink);">
          <span>💬</span>
          <span>گفتگوی تعاملی با استاد رفع اشکال</span>
        </div>
        <span style="font-size:0.75rem;color:var(--ink-muted);">پرسش سوالات تکمیلی</span>
      </div>

      <!-- Chat History -->
      <div id="tutor-chat-box" style="max-height:220px;overflow-y:auto;display:flex;flex-direction:column;gap:10px;padding:10px;background:rgba(0,0,0,0.2);border-radius:12px;border:1px solid var(--border);margin-bottom:12px;">
        <div style="font-size:0.82rem;color:var(--ink-muted);text-align:center;padding:8px;">
          هر سوال یا ابهامی در مورد این تست داری بنویس تا استاد برات توضیح بده.
        </div>
      </div>

      <!-- Chat Input Form -->
      <form onsubmit="App.sendTutorChatMessage(event)" style="display:flex;gap:8px;">
        <input id="tutor-chat-input" type="text" placeholder="سوال خود را بنویسید (مثلاً: چرا گزینه VERO غلط بود؟)" style="flex:1;background:var(--asphalt);border:1px solid var(--border);color:var(--ink);padding:10px 12px;border-radius:10px;font-size:0.85rem;font-family:Vazirmatn,sans-serif;" />
        <button id="tutor-chat-send-btn" type="submit" class="btn btn-primary" style="padding:10px 16px;font-size:0.85rem;">ارسال</button>
      </form>
    </div>

  </div>
</div>
`;
}
