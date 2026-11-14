/**
 * src/content/ch16-posizione.ts
 * Chapter 16 (Fermata, sosta, arresto), lesson 2: where the car goes once
 * stopping is allowed. In towns: right edge, parallel, with the traffic, and
 * ≥ 1 m for pedestrians when there is no raised sidewalk (CdS art. 157 c.2).
 * Outside towns: off the carriageway, not on cycle paths or verges, else at
 * the right edge (c.3). One-way streets: the left side too if ≥ 3 m remain
 * (c.4). Bays and time-limited parking: disco orario, parchimetro, and the
 * disabled-permit time exemption (c.5–6; art. 188 c.3).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter16.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_157 = "Codice della Strada, art. 157";
const SENSO_UNICO = "Nelle strade urbane a senso unico di marcia,";
const SENSO_UNICO_FA = "در خیابان‌های یک‌طرفه‌ی داخلِ آبادی،";
const DISCO = "In una zona in cui la sosta è regolamentata mediante disco orario,";
const DISCO_FA = "در منطقه‌ای که پارک با دیسکِ ساعت تنظیم شده،";

export const lessonDoveCollocare: Lesson = {
  id: "fermata-sosta-posizione",
  titleFa: "خودرو را کجای جاده بگذاری",
  titleIt: "MARGINE DESTRO · FUORI DELLA CARREGGIATA · DISCO ORARIO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی وقتی توقف کوتاه یا پارک مجاز است، خودرو را دقیقاً کجا بگذاری: داخلِ آبادی، بیرونِ آبادی، سمتِ چپِ خیابانِ یک‌طرفه و جای پارکِ خط‌کشی‌شده؛ و پارکِ زمان‌دار با دیسکِ ساعت یا پارکومتر چه می‌خواهد.",
      why:
        "۳۳ سؤال. این‌جا بانک یک کلمه را عوض می‌کند و جواب برمی‌گردد: «همیشه» به جای «به شرطِ این‌که»، «حتی بی‌پیاده‌رو» به جای «با پیاده‌روی بلند»، «روی مسیرِ دوچرخه» به جای «نه روی مسیرِ دوچرخه». یک قاعده دو بار می‌آید، یک بار برای توقف کوتاه و یک بار برای پارک، و جوابش یکی است.",
      rule: `${CDS_157} c.2–6`,
    },
    {
      kind: "table",
      title: "داخلِ آبادی، بیرونِ آبادی",
      body:
        "قاعده برای توقف کوتاه و پارک یکی است. داخلِ آبادی خودرو کنارِ لبه‌ی راست می‌ایستد؛ بیرونِ آبادی، اگر بشود، کلاً از سواره‌رو بیرون می‌رود. کنارِ لبه‌ی راست ایستادن جای درست است، نه جای ممنوع.",
      columns: ["داخلِ آبادی", "بیرونِ آبادی"],
      rows: [
        {
          label: "جای خودرو",
          values: ["تا جای ممکن نزدیکِ لبه‌ی راستِ سواره‌رو، موازی با آن و در جهتِ حرکت", "بیرون از سواره‌رو، اگر ممکن باشد"],
        },
        {
          label: "پیاده‌روی بلند نیست",
          it: "non esiste marciapiede rialzato",
          values: ["دست‌کم ۱ متر برای عبورِ عابر جا بگذار؛ پس «تا جای ممکن نزدیک» نه", "همین قاعده‌ی ۱ متر"],
        },
        {
          label: "کجا نه",
          values: ["—", "نه روی مسیرِ ویژه‌ی دوچرخه؛ نه روی شانه‌ی جاده، مگر تابلو اجازه دهد"],
        },
        {
          label: "بیرون رفتن ممکن نیست",
          values: ["—", "تا جای ممکن نزدیکِ لبه‌ی راست، موازی و در جهتِ حرکت. «پس نباید پارک کرد» نه"],
        },
      ],
      takeaway: "داخلِ آبادی: لبه‌ی راست، و اگر پیاده‌رو نیست ۱ متر برای عابر. بیرونِ آبادی: بیرون از سواره‌رو، ولی نه روی مسیرِ دوچرخه یا شانه‌ی جاده.",
      rule: `${CDS_157} c.2–3`,
    },
    {
      kind: "table",
      title: "یک‌طرفه و جای پارکِ خط‌کشی‌شده",
      body:
        "دو استثنا بر «لبه‌ی راست» و یک قاعده برای جای پارکِ کشیده‌شده. «همیشه» در هیچ‌کدام درست نیست.",
      columns: ["قاعده"],
      rows: [
        {
          label: "سمتِ چپِ خیابانِ یک‌طرفه",
          it: "margine sinistro",
          values: ["داخلِ آبادی پارک هم مجاز است، به شرطِ این‌که دست‌کم یک ردیف خودرو بتواند رد شود و این فضا کمتر از ۳ متر نباشد. توقف کوتاه آن‌جا هم ممنوع نیست"],
        },
        { label: "منطقه‌ی پارکِ آماده‌شده", it: "zone di sosta predisposte", values: ["خودرو را همان‌طور بگذار که تابلو و خط‌کشی می‌گویند (موازی، مورب، عمود)"] },
        {
          label: "جای پارکِ کشیده‌شده",
          it: "lo stallo",
          values: ["همیشه داخلِ یک جای پارک، بی‌آن‌که به جای کناری برود؛ حتی برای مدتِ کوتاه"],
        },
        {
          label: "خیابان بی‌خط‌کشی",
          values: ["پارک ممنوع نیست؛ خط‌کشی فقط جای پارک را مرتب می‌کند. ممنوعیت از تابلو یا از قانون می‌آید (درس‌های ۳ تا ۵)"],
        },
      ],
      takeaway: "چپِ یک‌طرفه: فقط با ۳ متر جا. جای پارکِ کشیده: داخلِ خطوط. نبودنِ خط ممنوعیت نمی‌سازد.",
      rule: `${CDS_157} c.4–5`,
    },
    {
      kind: "table",
      title: "پارکِ زمان‌دار: دیسکِ ساعت و پارکومتر",
      body:
        "جایی که پارک زمان‌دار یا پولی است، قاعده فقط درباره‌ی پارک است. توقف کوتاه، مثلاً پیاده کردنِ مسافر، پارک نیست و پول یا دیسک نمی‌خواهد. پارکِ کوتاه ولی هنوز پارک است.",
      columns: ["چه کنی", "دامِ بانک"],
      rows: [
        {
          label: "دیسکِ ساعت",
          it: "il disco orario",
          values: ["ساعتِ رسیدن را روی دیسک بگذار و طوری بگذارش که از بیرون خوب دیده شود", "«ساعتِ پایان» یا «روی یک کاغذ، بدونِ دقیقه» نه"],
        },
        {
          label: "وقتت تمام می‌شود",
          values: ["خودرو را جابه‌جا کن", "«بدونِ جابه‌جایی، ساعت را جلو بکش» نه؛ این یعنی ساعتِ شروعِ دروغ"],
        },
        {
          label: "پارکومتر",
          it: "il parchimetro",
          values: ["پول بده و تیکت را طوری بگذار که از بیرون خوب دیده شود", "«برای پارکِ کوتاه لازم نیست» نه. فقط توقف کوتاه، مثلِ پیاده کردنِ مسافر، تیکت نمی‌خواهد"],
        },
        {
          label: "خودروی در خدمتِ معلول (با کارتِ ویژه)",
          values: ["در پارکِ زمان‌دار به سقفِ زمان مقید نیست", "—"],
        },
      ],
      takeaway: "دیسک: ساعتِ رسیدن، خوب دیده شود، و با تمام شدنِ وقت خودرو را جابه‌جا کن. پارکومتر: هر پارکی، هرچقدر کوتاه.",
      rule: `${CDS_157} c.1, c.6; Codice della Strada, art. 188 c.3`,
    },
    {
      kind: "classify",
      title: "خودرو را کجا می‌گذاری؟",
      body: "پارک در این‌جاها مجاز است. فقط بگو خودرو کجا قرار می‌گیرد. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "margine destro", fa: "کنارِ لبه‌ی راست، تا جای ممکن نزدیک" },
        { it: "margine destro, 1 m", fa: "کنارِ لبه‌ی راست، با ۱ متر جا برای عابر" },
        { it: "fuori della carreggiata", fa: "بیرون از سواره‌رو" },
      ],
      items: [
        { prompt: "خیابانِ شهری با پیاده‌روی بلند.", answer: 0, explain: "عابر پیاده‌رو دارد: نزدیکِ لبه‌ی راست، موازی، در جهتِ حرکت." },
        { prompt: "کوچه‌ای در شهر بدونِ پیاده‌رو.", answer: 1, explain: "عابر جای دیگری ندارد: دست‌کم ۱ متر برایش بگذار." },
        { prompt: "جاده‌ی بیرونِ آبادی، کنارش زمینِ خاکیِ صاف و جادار.", answer: 2, explain: "بیرونِ آبادی، وقتی ممکن است، خودرو از سواره‌رو بیرون می‌رود." },
        {
          prompt: "جاده‌ی بیرونِ آبادی؛ کنارش فقط یک مسیرِ ویژه‌ی دوچرخه است و جای دیگری نیست.",
          answer: 0,
          explain: "روی مسیرِ دوچرخه نه. بیرون رفتن ممکن نیست، پس تا جای ممکن نزدیکِ لبه‌ی راستِ سواره‌رو.",
        },
        {
          prompt: "جاده‌ی بیرونِ آبادی با شانه‌ای که هیچ تابلویی پارک روی آن را اجازه نمی‌دهد، و جای دیگری نیست.",
          answer: 0,
          explain: "شانه‌ی جاده فقط با تابلو. بیرون رفتن ممکن نیست: لبه‌ی راستِ سواره‌رو.",
        },
      ],
      takeaway: "بیرونِ آبادی اول بپرس «می‌توانم از سواره‌رو بیرون بروم، جایی که مسیرِ دوچرخه یا شانه‌ی جاده نیست؟». داخلِ آبادی بپرس «پیاده‌رو هست؟».",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il margine destro della carreggiata", fa: "لبه‌ی راستِ سواره‌رو" },
        { it: "parallelamente e secondo il senso di marcia", fa: "موازی و در جهتِ حرکت" },
        { it: "il marciapiede rialzato", fa: "پیاده‌روی بلند (بالاتر از سطحِ جاده)" },
        { it: "fuori della carreggiata", fa: "بیرون از سواره‌رو" },
        { it: "la banchina", fa: "شانه‌ی جاده" },
        { it: "la pista ciclabile", fa: "مسیرِ ویژه‌ی دوچرخه" },
        { it: "il margine sinistro", fa: "لبه‌ی چپ" },
        { it: "lo stallo", fa: "جای پارکِ خط‌کشی‌شده (یک خانه)" },
        { it: "il disco orario", fa: "دیسکِ ساعت (برای پارکِ زمان‌دار)" },
        { it: "il parchimetro", fa: "پارکومتر" },
        { it: "il tagliando", fa: "تیکتِ پارک" },
      ],
    },
    {
      kind: "trap",
      title: "«purché» یا «sempre»",
      body: "هر دو جمله درباره‌ی سمتِ چپِ خیابانِ یک‌طرفه‌اند. یکی شرط دارد، دیگری شرط را برداشته:",
      examples: [
        {
          sourceId: "5397",
          textIt:
            "Nelle strade urbane a senso unico di marcia, la sosta è consentita anche lungo il margine sinistro della carreggiata, purché rimanga uno spazio sufficiente al transito almeno di una fila di veicoli",
          answer: 1,
          chunks: [
            { it: SENSO_UNICO, fa: SENSO_UNICO_FA },
            { it: "la sosta è consentita anche lungo il margine sinistro della carreggiata,", fa: "پارک کنارِ لبه‌ی چپِ سواره‌رو هم مجاز است،", verb: "è consentita ← consentire" },
            { it: "purché rimanga uno spazio sufficiente", fa: "به شرطِ این‌که جای کافی بماند", verb: "rimanga ← rimanere", focus: "condition" },
            { it: "al transito almeno di una fila di veicoli", fa: "برای عبورِ دست‌کم یک ردیف خودرو" },
          ],
          translation: "در خیابان‌های یک‌طرفه‌ی داخلِ آبادی، پارک کنارِ لبه‌ی چپِ سواره‌رو هم مجاز است، به شرطِ این‌که جای کافی برای عبورِ دست‌کم یک ردیف خودرو بماند.",
          why: "درست است. ماده‌ی ۱۵۷ بند ۴؛ این فضا هم نباید کمتر از ۳ متر باشد.",
        },
        {
          sourceId: "5401",
          textIt: "Nelle strade urbane a senso unico di marcia, la sosta è sempre consentita anche lungo il margine sinistro della carreggiata",
          answer: 0,
          chunks: [
            { it: SENSO_UNICO, fa: SENSO_UNICO_FA },
            { it: "la sosta è sempre consentita", fa: "پارک همیشه مجاز است", verb: "è consentita ← consentire", focus: "always" },
            { it: "anche lungo il margine sinistro della carreggiata", fa: "کنارِ لبه‌ی چپِ سواره‌رو هم" },
          ],
          translation: "در خیابان‌های یک‌طرفه‌ی داخلِ آبادی، پارک کنارِ لبه‌ی چپِ سواره‌رو هم همیشه مجاز است.",
          why: "غلط است. «همیشه» شرط را پاک کرده: فقط وقتی دست‌کم ۳ متر برای یک ردیف خودرو می‌ماند.",
        },
      ],
      takeaway: "«purché» = به شرطِ این‌که؛ شرط را نگه دار. «sempre» در این فصل تقریباً همیشه نشانه‌ی جمله‌ی غلط است.",
      rule: `${CDS_157} c.4`,
    },
  ],
  practice: [
    {
      sourceId: "5341",
      textIt:
        "In caso di fermata su strada urbana in cui non esiste il marciapiede rialzato, il conducente deve collocare il veicolo il più vicino possibile al margine destro della carreggiata",
      answer: 0,
      chunks: [
        { it: "In caso di fermata su strada urbana", fa: "در توقف کوتاه روی خیابانِ شهری" },
        { it: "in cui non esiste il marciapiede rialzato,", fa: "که پیاده‌روی بلند ندارد،", verb: "esiste ← esistere", focus: "condition" },
        { it: "il conducente deve collocare il veicolo", fa: "راننده باید خودرو را بگذارد", verb: "deve ← dovere" },
        { it: "il più vicino possibile al margine destro della carreggiata", fa: "تا جای ممکن نزدیکِ لبه‌ی راستِ سواره‌رو", focus: "contrast" },
      ],
      translation: "در توقف کوتاه روی خیابانِ شهری که پیاده‌روی بلند ندارد، راننده باید خودرو را تا جای ممکن نزدیکِ لبه‌ی راستِ سواره‌رو بگذارد.",
      why: "غلط است (قدم ۱). بی‌پیاده‌رو، عابر از کنارِ جاده رد می‌شود؛ باید دست‌کم ۱ متر برایش بماند، پس «تا جای ممکن نزدیک» نه.",
      rule: `${CDS_157} c.2`,
      conceptStep: 1,
    },
    {
      sourceId: "5390",
      textIt: "Fuori dei centri abitati, il conducente che deve sostare ha l'obbligo di collocare il veicolo, ove possibile, fuori della carreggiata",
      answer: 1,
      chunks: [
        { it: "Fuori dei centri abitati,", fa: "بیرونِ آبادی،" },
        { it: "il conducente che deve sostare", fa: "راننده‌ای که باید پارک کند", verb: "deve sostare ← sostare" },
        { it: "ha l'obbligo di collocare il veicolo,", fa: "موظف است خودرو را بگذارد", verb: "ha ← avere" },
        { it: "ove possibile,", fa: "هر جا ممکن باشد،", focus: "condition" },
        { it: "fuori della carreggiata", fa: "بیرون از سواره‌رو" },
      ],
      translation: "بیرونِ آبادی، راننده‌ای که باید پارک کند موظف است خودرو را، هر جا ممکن باشد، بیرون از سواره‌رو بگذارد.",
      why: "درست است (قدم ۱). «ove possibile» شرطِ درست را نگه داشته: اگر ممکن نیست، لبه‌ی راست.",
      rule: `${CDS_157} c.3`,
      conceptStep: 1,
    },
    {
      sourceId: "5400",
      textIt:
        "Nelle zone nelle quali gli spazi di sosta sono delimitati da segnaletica orizzontale, il conducente deve sempre sistemare il proprio veicolo entro uno degli appositi spazi(stalli), senza invadere quelli contigui",
      answer: 1,
      chunks: [
        { it: "Nelle zone nelle quali gli spazi di sosta", fa: "در منطقه‌هایی که جاهای پارک" },
        { it: "sono delimitati da segnaletica orizzontale,", fa: "با خط‌کشی مشخص شده‌اند،", verb: "sono delimitati ← delimitare", focus: "condition" },
        { it: "il conducente deve sempre sistemare il proprio veicolo", fa: "راننده باید همیشه خودرویش را بگذارد", verb: "deve ← dovere", focus: "always" },
        { it: "entro uno degli appositi spazi(stalli),", fa: "داخلِ یکی از همان جاهای پارک (stallo)،" },
        { it: "senza invadere quelli contigui", fa: "بی‌آن‌که به جاهای کناری برود", focus: "negation" },
      ],
      translation: "در منطقه‌هایی که جاهای پارک با خط‌کشی مشخص شده‌اند، راننده باید همیشه خودرویش را داخلِ یکی از آن جاها بگذارد، بی‌آن‌که به جاهای کناری برود.",
      why: "درست است (قدم ۲). این‌جا «همیشه» درست است: کوتاه یا بلند، داخلِ خطوطِ یک جای پارک.",
      rule: `${CDS_157} c.5`,
      conceptStep: 2,
    },
    {
      sourceId: "5297",
      textIt:
        "In una zona in cui la sosta è regolamentata mediante disco orario, prima che scada il tempo di validità della sosta è consentito aggiornare l'orario, senza che il veicolo venga spostato",
      answer: 0,
      chunks: [
        { it: DISCO, fa: DISCO_FA, verb: "è regolamentata ← regolamentare" },
        { it: "prima che scada il tempo di validità della sosta", fa: "پیش از این‌که مدتِ مجازِ پارک تمام شود", verb: "scada ← scadere" },
        { it: "è consentito aggiornare l'orario,", fa: "می‌شود ساعت را به‌روز کرد،", verb: "è consentito ← consentire" },
        { it: "senza che il veicolo venga spostato", fa: "بی‌آن‌که خودرو جابه‌جا شود", verb: "venga spostato ← spostare", focus: "negation" },
      ],
      translation: "در منطقه‌ای که پارک با دیسکِ ساعت تنظیم شده، پیش از تمام شدنِ مدتِ مجاز می‌شود ساعت را به‌روز کرد، بی‌آن‌که خودرو جابه‌جا شود.",
      why: "غلط است (قدم ۳). دیسک ساعتِ شروعِ پارک را نشان می‌دهد. جلو کشیدنش بدونِ جابه‌جایی یعنی ساعتی دروغ؛ وقت که تمام شد، خودرو باید برود.",
      rule: `${CDS_157} c.6`,
      conceptStep: 3,
    },
    {
      sourceId: "5294",
      textIt:
        "In una zona in cui la sosta è regolamentata con parchimetro, non occorre utilizzarlo se ci si ferma soltanto per far salire o scendere un passeggero",
      answer: 1,
      chunks: [
        { it: "In una zona in cui la sosta è regolamentata con parchimetro,", fa: "در منطقه‌ای که پارک با پارکومتر تنظیم شده،", verb: "è regolamentata ← regolamentare" },
        { it: "non occorre utilizzarlo", fa: "لازم نیست از آن استفاده کنی", verb: "occorre ← occorrere", focus: "negation" },
        { it: "se ci si ferma soltanto", fa: "اگر فقط می‌ایستی", verb: "ci si ferma ← fermarsi", focus: "condition" },
        { it: "per far salire o scendere un passeggero", fa: "برای سوار یا پیاده کردنِ یک مسافر", focus: "reason" },
      ],
      translation: "در منطقه‌ای که پارک با پارکومتر تنظیم شده، اگر فقط برای سوار یا پیاده کردنِ یک مسافر می‌ایستی، لازم نیست از پارکومتر استفاده کنی.",
      why: "درست است (قدم ۳). سوار و پیاده کردن توقف کوتاه است، نه پارک؛ پارکومتر فقط برای پارک است.",
      rule: `${CDS_157} c.1, c.6`,
      conceptStep: 3,
    },
  ],
  related: [
    {
      step: 1,
      // town vs outside: right edge, 1 m, off the carriageway, not on cycle paths or verges
      sourceIds: ["5337", "5338", "5339", "5340", "5341", "5342", "5350", "5388", "5389", "5390", "5391", "5392", "5393", "5394", "5395", "5396"],
    },
    {
      step: 2,
      // one-way left side (3 m), signed zones, bays, no stripes ≠ ban
      sourceIds: ["5351", "5397", "5398", "5399", "5400", "5401", "5402", "5403"],
    },
    {
      step: 3,
      // disco orario, parchimetro, disabled-permit time exemption
      sourceIds: ["5292", "5293", "5294", "5295", "5296", "5297", "5298", "5299", "5404"],
    },
  ],
};
