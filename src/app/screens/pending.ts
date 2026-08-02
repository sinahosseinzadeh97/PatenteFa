/**
 * src/app/screens/pending.ts
 * Pending-approval screen (shown to users awaiting admin approval).
 */
export function renderPendingScreen(): string {
  return `
<div id="screen-pending" class="screen" style="padding:40px 20px; text-align:center; display:none; flex-direction:column; align-items:center; justify-content:center; min-height:80vh;">
  <div style="width:80px; height:80px; border-radius:50%; background:rgba(232,163,61,0.15); border:2px solid var(--amber); display:flex; align-items:center; justify-content:center; font-size:2.5rem; margin-bottom:20px; box-shadow:0 0 30px rgba(232,163,61,0.3); animation:pulse 2s infinite;">
    ⏳
  </div>
  <h2 style="font-size:1.4rem; color:var(--amber); margin:0 0 10px; font-weight:700;">در انتظار تایید مدیریت</h2>
  <p style="font-size:0.9rem; color:var(--ink-muted); max-width:320px; line-height:1.6; margin:0 0 24px;" id="pending-msg">
    درخواست دسترسی شما برای مدیریت ارسال گردید. پس از تایید مدیریت، دسترسی شما فعال می‌شود.
  </p>
  
  <!-- Commercial Value Proposition Card -->
  <div style="background: linear-gradient(135deg, rgba(37,99,235,0.15), rgba(168,85,247,0.15)); border: 1px solid rgba(59,130,246,0.35); border-radius:18px; padding:18px; margin-bottom:20px; max-width:380px; text-align:right; color:var(--ink);">
    <div style="font-size:0.98rem; font-weight:700; color:#60a5fa; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
      <span>💎</span> <b>چرا سامانه هوشمند PatenteFa؟</b>
    </div>
    
    <p style="font-size:0.82rem; color:#d1d5db; line-height:1.75; margin:0 0 12px;">
      با توجه به افزایش قیمت یورو و هزینه‌های سنگین <b>۱۵۰ تا ۱۶۰ یورویی</b> پکیج‌های آموزشی موجود در بازار، سامانه <b>PatenteFa</b> به گونه‌ای طراحی شده است که شما را ظرف مدت <b>۳ تا ۴ ماه</b>، با بالاترین کیفیت و تنها با <b>یک‌سوم هزینه پکیج‌های مشابه</b>، آماده قبولی در آزمون اصلی تئوری پاتنته کند.
    </p>

    <div style="background:var(--surface-2); border:1px solid var(--border); border-radius:12px; padding:12px; font-size:0.78rem; line-height:1.6; color:var(--ink-muted); margin-bottom:12px;">
      ✨ شامل ۳ دستیار هوش مصنوعی (مترجم، مربی آیین‌نامه، استاد زبان ایتالیایی)، ۷,۱۳۹ سوال رسمی و ۲۵ فصل آموزشی
    </div>

    <input type="text" id="fun-custom-answer-input" placeholder="پیام یا توضیحات تکمیلی شما برای مدیریت (اختیاری)…" style="width:100%; padding:10px 12px; background:var(--surface-2); border:1px solid rgba(59,130,246,0.4); border-radius:10px; color:var(--ink); font-family:'Vazirmatn',sans-serif; font-size:0.85rem; margin-bottom:10px; direction:rtl;" />
    
    <button type="button" class="btn btn-sm btn-full" style="background:linear-gradient(135deg, #2563eb, #7c3aed); color:#ffffff; font-weight:700; font-size:0.88rem; padding:10px; border-radius:10px;" id="btn-submit-fun" onclick="App.submitFunAnswer()">
      ارسال درخواست فعال‌سازی دسترسی 🚀
    </button>

    <div id="fun-reward-box" style="display:none; margin-top:10px; background:rgba(16,185,129,0.2); border:1px solid rgba(16,185,129,0.4); border-radius:12px; padding:12px; font-size:0.82rem; color:#6ee7b7; line-height:1.6; text-align:center;">
      ✅ <b>درخواست شما با موفقیت ثبت شد!</b> مدیریت به‌زودی دسترسی شما را تایید خواهد کرد.
    </div>
  </div>

  <button class="btn btn-primary btn-full" onclick="App.checkApprovalStatus()" style="max-width:280px;">
    🔄 بررسی مجدد وضعیت دسترسی
  </button>
</div>
`;
}
