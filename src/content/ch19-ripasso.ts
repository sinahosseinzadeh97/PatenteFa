/**
 * src/content/ch19-ripasso.ts
 * Chapter 19 (Cinture, casco e sicurezza): the chapter review. Fourteen real
 * bank questions, two per lesson in lesson order, none shown inside a lesson;
 * a mistake routes back to the lesson section that teaches it
 * (tests/chapter19.test.ts).
 */
import type { Lesson } from "./lessons.js";

const CDS_171 = "Codice della Strada, art. 171";
const CDS_172 = "Codice della Strada, art. 172";
const TECH = "Funzione tecnica / indicazioni dei produttori (nessun articolo del CdS)";

export const reviewCinture: Lesson = {
  id: "ripasso-capitolo-19",
  titleFa: "مرور فصل ۱۹",
  titleIt: "RIPASSO · CINTURE, CASCO E SICUREZZA",
  minutes: 8,
  signs: [],
  review: true,
  steps: [
    {
      kind: "intro",
      title: "مرور فصل",
      objective:
        "چهارده سؤالِ واقعی از بانک، دو تا از هر درس. هیچ‌کدام را در درس‌ها ندیده‌ای، پس این مرور نشان می‌دهد چه چیزی واقعاً در ذهنت مانده است.",
      why: "تقریباً هر سؤالِ این فصل یکی از دو چیز را می‌پرسد: «این شرط واقعاً در قانون هست؟» (سرعت، مسافت، سن، گواهینامه، فصل) و «این وسیله دقیقاً چه کار می‌کند؟». سؤالی که این‌جا اشتباه کنی به فهرستِ مرورت اضافه می‌شود و به بخشِ درسِ مربوطش وصل است.",
    },
    {
      kind: "table",
      title: "فصل ۱۹ در هفت خط",
      body: "قبل از سؤال‌ها، نکته‌ی اصلیِ هر درس را یک بار دیگر ببین. اگر جایی برایت تازه بود، اول همان درس را دوباره باز کن.",
      columns: ["نکته‌ی اصلی"],
      rows: [
        { label: "درس ۱", it: "cinture · in qualsiasi situazione di marcia", values: ["کمربند بدن را روی صندلی نگه می‌دارد. راننده و همه‌ی سرنشین‌ها، جلو و عقب، در هر حرکت؛ بی‌شرطِ سرعت، مسافت، شهر یا کیسه‌ی هوا"] },
        { label: "درس ۲", it: "omologate · esenzioni", values: ["تأییدشده، سالم، دست‌نخورده. معاف: اضطرار، مربی هنگامِ آموزش، بیماری یا بارداریِ پرخطر با گواهی. نه سن، نه پستچی، نه foglio rosa"] },
        { label: "درس ۳", it: "airbag · poggiatesta", values: ["کیسه‌ی هوا: حسگر، چند میلی‌ثانیه، ضربه‌ی شدید، همراهِ کمربند. پشت‌سری: ضربه‌ی شلاقیِ گردن، تنظیمِ ارتفاع و شیب"] },
        { label: "درس ۴", it: "seggiolini · 1,50 m", values: ["زیرِ ۱٫۵۰ متر: سیستمِ نگه‌دارنده‌ی تأییدشده و مناسب. بی‌استثنا. رو به عقب در جلو: کیسه‌ی هوای خاموش"] },
        { label: "درس ۵", it: "casco · obbligo", values: ["موتور گازی و موتورسیکلت، راننده و سرنشین، هر سن و گواهینامه، بندِ بسته. معاف: فقط بدنه‌ی بسته یا اتاقکِ ایمنی"] },
        { label: "درس ۶", it: "calotta · visiera · pulizia", values: ["بی‌حلال و بی‌بنزین. بعد از ضربه‌ی شدید عوض کن، حتی سالم به نظر. ترک و طلقِ خط‌افتاده: تعویض، نه چسب"] },
        { label: "درس ۷", it: "stivali · guanti · giacche", values: ["تأییدشده، برای سایش و ضربه، هر فصل و هر رنگ. فقط کلاه را قانون می‌خواهد"] },
      ],
      takeaway: "در هر جمله بپرس: این شرط در قانون هست؟ این وسیله در ضربه یا افتادن دقیقاً چه می‌کند؟",
    },
  ],
  practice: [
    {
      sourceId: "6019",
      textIt: "Le cinture di sicurezza hanno lo scopo di mantenere il corpo attaccato al sedile in caso di urto violento",
      answer: 1,
      chunks: [
        { it: "Le cinture di sicurezza", fa: "کمربندهای ایمنی" },
        { it: "hanno lo scopo di mantenere il corpo attaccato al sedile", fa: "کارشان این است که بدن را به صندلی چسبیده نگه دارند", verb: "hanno ← avere", focus: "reason" },
        { it: "in caso di urto violento", fa: "در ضربه‌ی شدید", focus: "condition" },
      ],
      translation: "کارِ کمربندهای ایمنی این است که در ضربه‌ی شدید بدن را به صندلی چسبیده نگه دارند.",
      why: "درست است (درس ۱). این کارِ اصلیِ کمربند است.",
      rule: `${CDS_172} c.1; funzione tecnica del dispositivo`,
      conceptStep: 1,
    },
    {
      sourceId: "5997",
      textIt: "Se un veicolo è dotato di air-bag, non vi è l’obbligo di indossare le cinture di sicurezza durante la marcia",
      answer: 0,
      chunks: [
        { it: "Se un veicolo è dotato di air-bag,", fa: "اگر خودرویی کیسه‌ی هوا داشته باشد،", verb: "è ← essere", focus: "condition" },
        { it: "non vi è l’obbligo", fa: "اجباری نیست", verb: "è ← essere", focus: "negation" },
        { it: "di indossare le cinture di sicurezza durante la marcia", fa: "هنگامِ حرکت کمربندِ ایمنی ببندی" },
      ],
      translation: "اگر خودرویی کیسه‌ی هوا داشته باشد، بستنِ کمربندِ ایمنی هنگامِ حرکت اجباری نیست.",
      why: "غلط است (درس ۱). کیسه‌ی هوا کمربند را کامل می‌کند، جایش را نمی‌گیرد.",
      rule: `${CDS_172} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "6030",
      textIt: "Le persone obese possono utilizzare appositi strumenti che evitano che la cintura di sicurezza stia aderente al corpo",
      answer: 0,
      chunks: [
        { it: "Le persone obese", fa: "افرادِ درشت‌اندام" },
        { it: "possono utilizzare appositi strumenti", fa: "می‌توانند از وسایلِ مخصوصی استفاده کنند", verb: "possono ← potere" },
        { it: "che evitano che la cintura di sicurezza stia aderente al corpo", fa: "که نمی‌گذارند کمربندِ ایمنی به بدن بچسبد", verb: "evitano ← evitare", focus: "negation" },
      ],
      translation: "افرادِ درشت‌اندام می‌توانند از وسایلِ مخصوصی استفاده کنند که نمی‌گذارند کمربندِ ایمنی به بدن بچسبد.",
      why: "غلط است (درس ۲). چنین وسیله‌ای کارِ کمربند را مختل می‌کند و ممنوع است.",
      rule: `${CDS_172} c.11`,
      conceptStep: 1,
    },
    {
      sourceId: "6002",
      textIt: "Le donne in stato di gravidanza con particolari condizioni di rischio certificate non sono obbligate ad agganciare la cintura di sicurezza",
      answer: 1,
      chunks: [
        { it: "Le donne in stato di gravidanza", fa: "زنانِ باردار" },
        { it: "con particolari condizioni di rischio certificate", fa: "با شرایطِ پرخطرِ خاصِ دارای گواهی", focus: "condition" },
        { it: "non sono obbligate", fa: "موظف نیستند", verb: "sono ← essere", focus: "negation" },
        { it: "ad agganciare la cintura di sicurezza", fa: "کمربندِ ایمنی ببندند" },
      ],
      translation: "زنانِ باردار با شرایطِ پرخطرِ خاصِ دارای گواهی، موظف نیستند کمربندِ ایمنی ببندند.",
      why: "درست است (درس ۲). شرطش گواهیِ پزشک درباره‌ی خطرِ خاص است، نه خودِ بارداری.",
      rule: `${CDS_172} c.8 lett. f`,
      conceptStep: 2,
    },
    {
      sourceId: "6056",
      textIt: "L’airbag deve essere gonfiato periodicamente per verificarne l’efficienza",
      answer: 0,
      chunks: [
        { it: "L’airbag", fa: "کیسه‌ی هوا" },
        { it: "deve essere gonfiato periodicamente", fa: "باید گاه‌به‌گاه باد شود", verb: "deve ← dovere", focus: "always" },
        { it: "per verificarne l’efficienza", fa: "تا سالم بودنش بررسی شود", focus: "reason" },
      ],
      translation: "کیسه‌ی هوا باید گاه‌به‌گاه باد شود تا سالم بودنش بررسی شود.",
      why: "غلط است (درس ۳). کیسه‌ی هوا یک بار در ضربه باز می‌شود؛ کسی برای امتحان بادش نمی‌کند.",
      rule: TECH,
      conceptStep: 1,
    },
    {
      sourceId: "5999",
      textIt: "Il poggiatesta è utile se viene regolato correttamente, sia in altezza che in inclinazione",
      answer: 1,
      chunks: [
        { it: "Il poggiatesta è utile", fa: "پشت‌سری مفید است", verb: "è ← essere" },
        { it: "se viene regolato correttamente,", fa: "اگر درست تنظیم شود،", verb: "viene regolato ← regolare", focus: "condition" },
        { it: "sia in altezza che in inclinazione", fa: "هم در ارتفاع و هم در شیب" },
      ],
      translation: "پشت‌سری اگر درست تنظیم شود، هم در ارتفاع و هم در شیب، مفید است.",
      why: "درست است (درس ۳). پشت‌سریِ پایین یا دور سر را نگه نمی‌دارد.",
      rule: TECH,
      conceptStep: 3,
    },
    {
      sourceId: "6038",
      textIt: "I sistemi di ritenuta per bambini sono classificati in gruppi, in funzione del peso del bambino che possono accogliere",
      answer: 1,
      chunks: [
        { it: "I sistemi di ritenuta per bambini", fa: "سیستم‌های نگه‌دارنده‌ی کودک" },
        { it: "sono classificati in gruppi,", fa: "در گروه‌هایی دسته‌بندی می‌شوند،", verb: "sono classificati ← classificare" },
        { it: "in funzione del peso del bambino che possono accogliere", fa: "بر اساسِ وزنِ کودکی که می‌توانند جا بدهند", verb: "possono ← potere", focus: "reason" },
      ],
      translation: "سیستم‌های نگه‌دارنده‌ی کودک بر اساسِ وزنِ کودکی که می‌توانند جا بدهند در گروه‌هایی دسته‌بندی می‌شوند.",
      why: "درست است (درس ۴). گروه‌های ۰ تا ۳ بر اساسِ وزن‌اند (صندلی‌های i-Size بر اساسِ قد).",
      rule: `${CDS_172} c.1; Polizia di Stato (gruppi R44)`,
      conceptStep: 1,
    },
    {
      sourceId: "6044",
      textIt: "E’ consentito il trasporto di bambini senza che siano assicurati a sistemi di ritenuta, purché sui sedili anteriori in braccio a persona maggiorenne",
      answer: 0,
      chunks: [
        { it: "E’ consentito il trasporto di bambini", fa: "جابه‌جا کردنِ کودکان مجاز است", verb: "è consentito ← consentire" },
        { it: "senza che siano assicurati a sistemi di ritenuta,", fa: "بدونِ این‌که با سیستمِ نگه‌دارنده بسته شده باشند،", verb: "siano ← essere", focus: "negation" },
        { it: "purché sui sedili anteriori in braccio a persona maggiorenne", fa: "به شرطی که روی صندلی‌های جلو در آغوشِ یک بزرگسال باشند", focus: "condition" },
      ],
      translation: "جابه‌جا کردنِ کودکان بدونِ این‌که با سیستمِ نگه‌دارنده بسته شده باشند مجاز است، به شرطی که روی صندلی‌های جلو در آغوشِ یک بزرگسال باشند.",
      why: "غلط است (درس ۴). آغوش هیچ‌وقت جای صندلیِ کودک را نمی‌گیرد.",
      rule: `${CDS_172} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "6014",
      textIt: "Il casco non è obbligatorio per i conducenti di ciclomotori a due ruote",
      answer: 0,
      chunks: [
        { it: "Il casco non è obbligatorio", fa: "کلاه ایمنی اجباری نیست", verb: "è ← essere", focus: "negation" },
        { it: "per i conducenti di ciclomotori a due ruote", fa: "برای راننده‌های موتور گازیِ دوچرخ" },
      ],
      translation: "کلاه ایمنی برای راننده‌های موتور گازیِ دوچرخ اجباری نیست.",
      why: "غلط است (درس ۵). برای راننده و سرنشینِ موتور گازی اجباری است.",
      rule: `${CDS_171} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "6079",
      textIt: "Il conducente che non indossa il casco è soggetto alla decurtazione di punti dalla patente di guida",
      answer: 1,
      chunks: [
        { it: "Il conducente che non indossa il casco", fa: "راننده‌ای که کلاه ایمنی نمی‌گذارد", verb: "indossa ← indossare", focus: "negation" },
        { it: "è soggetto alla decurtazione di punti dalla patente di guida", fa: "مشمولِ کم شدنِ امتیازِ گواهینامه است", verb: "è ← essere" },
      ],
      translation: "راننده‌ای که کلاه ایمنی نمی‌گذارد مشمولِ کم شدنِ امتیازِ گواهینامه است.",
      why: "درست است (درس ۵). جریمه، کم شدنِ امتیاز و توقیفِ موتور.",
      rule: `${CDS_171} c.2; art. 126-bis (tabella dei punteggi)`,
      conceptStep: 2,
    },
    {
      sourceId: "6069",
      textIt: "Il casco deve essere di taglia corretta",
      answer: 1,
      chunks: [
        { it: "Il casco", fa: "کلاه ایمنی" },
        { it: "deve essere di taglia corretta", fa: "باید اندازه‌ی درست داشته باشد", verb: "deve ← dovere" },
      ],
      translation: "کلاه ایمنی باید اندازه‌ی درست داشته باشد.",
      why: "درست است (درس ۶). کلاهِ گشاد در افتادن می‌چرخد یا از سر درمی‌آید.",
      rule: TECH,
      conceptStep: 1,
    },
    {
      sourceId: "6085",
      textIt: "Il casco conserva invariate le sue caratteristiche protettive per periodi lunghissimi, di oltre venti anni",
      answer: 0,
      chunks: [
        { it: "Il casco conserva invariate le sue caratteristiche protettive", fa: "کلاه ایمنی ویژگی‌های محافظتی‌اش را بی‌تغییر نگه می‌دارد", verb: "conserva ← conservare" },
        { it: "per periodi lunghissimi,", fa: "برای مدت‌های خیلی طولانی،", focus: "always" },
        { it: "di oltre venti anni", fa: "بیش از بیست سال", focus: "limit" },
      ],
      translation: "کلاه ایمنی ویژگی‌های محافظتی‌اش را برای مدت‌های خیلی طولانی، بیش از بیست سال، بی‌تغییر نگه می‌دارد.",
      why: "غلط است (درس ۶). نور و گرما کلاه را پیر می‌کنند؛ عمرش محدود است.",
      rule: TECH,
      conceptStep: 3,
    },
    {
      sourceId: "6097",
      textIt: "Gli stivali ad uso motociclistico proteggono i piedi da abrasioni sull’asfalto in caso di caduta",
      answer: 1,
      chunks: [
        { it: "Gli stivali ad uso motociclistico", fa: "چکمه‌های موتورسواری" },
        { it: "proteggono i piedi da abrasioni sull’asfalto", fa: "پا را از سایش روی آسفالت حفظ می‌کنند", verb: "proteggono ← proteggere" },
        { it: "in caso di caduta", fa: "در افتادن", focus: "condition" },
      ],
      translation: "چکمه‌های موتورسواری در افتادن پا را از سایش روی آسفالت حفظ می‌کنند.",
      why: "درست است (درس ۷). سایش یکی از دو خطرِ اصلیِ افتادن است.",
      rule: "Norma EN 13634 (stivali)",
      conceptStep: 2,
    },
    {
      sourceId: "6117",
      textIt: "I guanti ad uso motociclistico coprono anche il gomito per proteggere meglio in caso di caduta",
      answer: 0,
      chunks: [
        { it: "I guanti ad uso motociclistico", fa: "دستکش‌های موتورسواری" },
        { it: "coprono anche il gomito", fa: "آرنج را هم می‌پوشانند", verb: "coprono ← coprire", focus: "contrast" },
        { it: "per proteggere meglio in caso di caduta", fa: "تا در افتادن بهتر محافظت کنند", focus: "reason" },
      ],
      translation: "دستکش‌های موتورسواری آرنج را هم می‌پوشانند تا در افتادن بهتر محافظت کنند.",
      why: "غلط است (درس ۷). دستکش تا مچ است؛ آرنج را محافظِ کاپشن می‌پوشاند.",
      rule: "Norma EN 13594 (guanti)",
      conceptStep: 3,
    },
  ],
  related: [],
};
