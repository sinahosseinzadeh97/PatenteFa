/**
 * src/content/ch17-rischi.ts
 * Chapter 17 (Norme varie, autostrade, pannelli), lessons 13–14: risk
 * awareness. Cyclists, moped riders and slow vehicles; then mass, SUVs,
 * heavy vehicles and what a driver cannot see. These statements are about
 * judgment, so their basis is the general duty of care (CdS artt. 140–141)
 * as the ministerial programme reads it, not a numbered rule.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter17.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const PRUDENZA = "Codice della Strada, artt. 140–141 (comportamento prudente); lettura del programma ministeriale";
const IL_CONDUCENTE = "Il conducente di autoveicolo";
const IL_CONDUCENTE_FA = "راننده‌ی خودرو";

// ── Lesson 13 ─────────────────────────────────────────────────────────────────

export const lessonUtentiDeboli: Lesson = {
  id: "utenti-deboli-mezzi-lenti",
  titleFa: "دوچرخه، موتور گازی و وسیله‌های کُند",
  titleIt: "VELOCIPEDI · CICLOMOTORI · MEZZI LENTI",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی چرا دوچرخه و موتور گازی در ترافیک آسیب‌پذیرند (سبک، کُند، لرزان، اغلب با راننده‌ی کم‌تجربه یا مسن)، چرا آن‌ها سرعتِ تو را درست تخمین نمی‌زنند، و چرا وسیله‌ی خیلی کُند در جاده‌ی برون‌شهری خطر است، نه ایمنی.",
      why:
        "۲۳ سؤال، همه با یک قاعده: مسئولیتِ پیش‌بینی با توست. هر جمله‌ای که بگوید «آن‌ها کُندند پس خطری نیست»، «تو مجبور نیستی اشتباهشان را پیش‌بینی کنی» یا «فاصله‌ات را راحت می‌سنجند»، غلط است.",
      rule: PRUDENZA,
    },
    {
      kind: "factors",
      title: "دوچرخه‌سوار",
      body: "دوچرخه جرمِ کم دارد، آرام می‌رود و ممکن است به چپ و راست بلرزد. بانک این‌ها را درست می‌داند و این‌ها را غلط:",
      columns: [
        {
          title: "درست (VERO)",
          items: [
            { fa: "جرمِ کم، سرعتِ کم، لرزشِ عرضی", it: "massa modesta e caratterizzati da basse velocità e possibili oscillazioni trasversali", sourceId: "5636", textIt: "Il conducente di un'autovettura deve considerare i rischi che, sulla strada, sono legati alla presenza di velocipedi, mezzi dotati di massa modesta e caratterizzati da basse velocità e possibili oscillazioni trasversali", answer: 1 },
            { fa: "سواری و موتورسیکلت هر دو رانندگی‌شان را با دوچرخه تطبیق می‌دهند", it: "adattare la propria guida anche ai rischi legati alla presenza di velocipedi", sourceId: "5637", textIt: "Il conducente di un'autovettura o di un motociclo deve adattare la propria guida anche ai rischi legati alla presenza di velocipedi nel traffico", answer: 1 },
            { fa: "دوچرخه‌سوارِ خیلی جوان و کم‌تجربه، یا مسن", it: "giovanissimi e inesperti o da anziani", sourceId: "5638", textIt: "Il conducente di un'autovettura deve prestare particolare attenzione per la presenza nel traffico di velocipedi utilizzati da conducenti giovanissimi e inesperti o da anziani", answer: 1 },
          ],
        },
        {
          title: "غلط (FALSO)",
          items: [
            { fa: "بچه‌های دوچرخه‌سوار، حتی کنارِ هم، خطری نیستند چون آرام‌اند", it: "non rappresenta un rischio", sourceId: "5642", textIt: "La presenza nel traffico extraurbano di bambini in bicicletta, anche se affiancati, non rappresenta un rischio per chi guida un autoveicolo, data la loro modesta velocità", answer: 0 },
            { fa: "راننده‌ها همیشه زمین خوردن یا لیز خوردنِ دوچرخه‌سوار را پیش‌بینی می‌کنند", it: "sono sempre capaci di prevedere", sourceId: "5643", textIt: "I ciclisti possono viaggiare in tutta sicurezza nel traffico extraurbano perché i conducenti dei veicoli a motore sono sempre capaci di prevedere eventuali loro cadute o pericolosi sbandamenti dovuti ad irregolarità del fondo stradale", answer: 0 },
          ],
        },
      ],
      takeaway: "دوچرخه: سبک، کُند، لرزان. سرعتِ کمش خطر را کم نمی‌کند؛ پیش‌بینیِ زمین خوردنش هم با توست.",
      rule: PRUDENZA,
    },
    {
      kind: "table",
      title: "موتور گازی‌سوار",
      body: "موتور گازی سریع‌تر از دوچرخه است ولی خیلی کُندتر از تو، و راننده‌اش اغلب نوجوان است. بانک چند موقعیتِ مشخص را می‌پرسد:",
      columns: ["تو چه می‌کنی", "دامِ بانک"],
      rows: [
        { label: "راننده‌ی جوان", it: "limitata esperienza di guida", values: ["یادت باشد کم‌تجربه است و ممکن است ناگهان کاری کند، مثلاً زیگزاگ برود", "«قانون را رعایت کن، پیش‌بینیِ بی‌احتیاطیِ او لازم نیست» غلط است"] },
        {
          label: "پیچیدن به چپ",
          it: "svolta a sinistra",
          values: ["برایش خطرناک است: باید از جلوی ستونِ خودروهای سریع‌تر رد شود. فاصله‌ات را با سرعتِ خودت بسنج", "«سنجیدنِ فاصله تا موتور گازی‌ای که ناگهان کند می‌کند آسان است» غلط است"],
        },
        {
          label: "کنارش",
          it: "distanza di sicurezza laterale",
          values: ["فاصله‌ی جانبیِ کافی؛ حتی کمی کج شدنِ فرمانت ممکن است تعادلش را به هم بزند", "«با فاصله‌ی جانبیِ کم ولی در حدِ سرعتِ مجاز سریع رد شو» غلط است"],
        },
      ],
      takeaway: "موتور گازی‌سوار: کم‌تجربه، کند، کم‌تعادل. فاصله‌ی جانبی بده، فرمانت را صاف نگه دار، کارِ ناگهانی‌اش را پیش‌بینی کن.",
      rule: PRUDENZA,
    },
    {
      kind: "table",
      title: "وسیله‌ی خیلی کُند در جاده‌ی برون‌شهری",
      body: "در جاده‌ی دوخطه‌ی برون‌شهری، موتور گازیِ سه‌چرخ یا ماشینِ کشاورزی ممکن است جلویت ظاهر شود. خطر از فرقِ سرعت است:",
      columns: ["قاعده"],
      rows: [
        { label: "فرقِ سرعت", it: "velocità molto diverse", values: ["وسیله‌هایی با سرعت‌های خیلی متفاوت خطر می‌سازند، نه ایمنی"] },
        { label: "تخمینِ زمان", it: "valutazione dei tempi di avvicinamento", values: ["وقتی تند می‌روی، سخت است بفهمی چقدر زود به وسیله‌ی کُند می‌رسی؛ سرعتِ ماشینِ کشاورزی را هم سخت می‌شود سنجید"] },
        { label: "حرکتِ ناگهانی", it: "manovre improvvise", values: ["موتور گازیِ سه‌چرخ با حرکتی ناگهانی خطرِ بالقوه است، حتی وقتی تو در حدِ مجاز می‌رانی"] },
      ],
      takeaway: "سرعتِ خیلی متفاوت = خطر. نزدیک شدن به وسیله‌ی کُند را زودتر از آن‌چه فکر می‌کنی حساب کن.",
      rule: PRUDENZA,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il velocipede", fa: "دوچرخه" },
        { it: "il ciclomotorista", fa: "موتور گازی‌سوار" },
        { it: "le oscillazioni trasversali", fa: "لرزش‌های عرضی (به چپ و راست)" },
        { it: "la velocità di avvicinamento", fa: "سرعتِ نزدیک شدن" },
        { it: "procedere a zig-zag", fa: "زیگزاگ رفتن" },
        { it: "la distanza di sicurezza laterale", fa: "فاصله‌ی ایمنیِ جانبی" },
        { it: "la deviazione trasversale", fa: "کج شدنِ عرضیِ مسیر" },
        { it: "il ciclomotore a tre ruote", fa: "موتور گازیِ سه‌چرخ" },
      ],
    },
    {
      kind: "trap",
      title: "چه کسی سرعت را خوب می‌سنجد",
      body: "هر دو جمله درباره‌ی دوچرخه‌سواری است که سرعتِ نزدیک شدنِ خودروها را تخمین می‌زند:",
      examples: [
        {
          sourceId: "5639",
          textIt: "Per un ciclista che si accinge ad effettuare una manovra è molto difficile valutare la velocità di avvicinamento dei veicoli a motore presenti nel traffico",
          answer: 1,
          chunks: [
            { it: "Per un ciclista che si accinge ad effettuare una manovra", fa: "برای دوچرخه‌سواری که می‌خواهد مانوری انجام دهد", verb: "si accinge ← accingersi", focus: "condition" },
            { it: "è molto difficile valutare", fa: "خیلی سخت است که بسنجد" },
            { it: "la velocità di avvicinamento dei veicoli a motore presenti nel traffico", fa: "سرعتِ نزدیک شدنِ وسیله‌های موتوریِ در ترافیک را" },
          ],
          translation: "برای دوچرخه‌سواری که می‌خواهد مانوری انجام دهد، سنجیدنِ سرعتِ نزدیک شدنِ وسیله‌های موتوری خیلی سخت است.",
          why: "درست است. پس فرض نکن تو را دیده و سرعتت را فهمیده.",
        },
        {
          sourceId: "5644",
          textIt: "La velocità di avvicinamento di un'autovettura, soprattutto su strade extraurbane, è facilmente valutabile a distanza da parte di un ciclista che procede lentamente",
          answer: 0,
          chunks: [
            { it: "La velocità di avvicinamento di un'autovettura,", fa: "سرعتِ نزدیک شدنِ یک سواری،" },
            { it: "soprattutto su strade extraurbane,", fa: "به‌خصوص در جاده‌های برون‌شهری،" },
            { it: "è facilmente valutabile a distanza", fa: "از دور به‌راحتی سنجیدنی است", focus: "contrast" },
            { it: "da parte di un ciclista che procede lentamente", fa: "برای دوچرخه‌سواری که آرام می‌رود", verb: "procede ← procedere" },
          ],
          translation: "سرعتِ نزدیک شدنِ یک سواری، به‌خصوص در جاده‌های برون‌شهری، برای دوچرخه‌سواری که آرام می‌رود از دور به‌راحتی سنجیدنی است.",
          why: "غلط است. برعکس: هرچه تو سریع‌تر، سنجیدنش برای او سخت‌تر.",
        },
      ],
      takeaway: "«difficile valutare» درست؛ «facilmente valutabile» غلط. فرضت این باشد که سرعتت را نمی‌فهمند.",
      rule: PRUDENZA,
    },
  ],
  practice: [
    {
      sourceId: "5640",
      textIt: "Il conducente di un'autovettura deve prevedere la difficoltà di valutazione della velocità del proprio veicolo da parte di un ciclista che, trovandosi sulla stessa corsia di marcia, si accinge a svoltare a sinistra",
      answer: 1,
      chunks: [
        { it: "Il conducente di un'autovettura deve prevedere", fa: "راننده‌ی سواری باید پیش‌بینی کند", verb: "deve ← dovere" },
        { it: "la difficoltà di valutazione della velocità del proprio veicolo", fa: "سختیِ سنجیدنِ سرعتِ خودرواش را" },
        { it: "da parte di un ciclista che,", fa: "برای دوچرخه‌سواری که" },
        { it: "trovandosi sulla stessa corsia di marcia,", fa: "در همان خطِ عبور است و", verb: "trovandosi ← trovarsi" },
        { it: "si accinge a svoltare a sinistra", fa: "می‌خواهد به چپ بپیچد", verb: "si accinge ← accingersi", focus: "condition" },
      ],
      translation: "راننده‌ی سواری باید پیش‌بینی کند که دوچرخه‌سواری که در همان خطِ عبور است و می‌خواهد به چپ بپیچد، سرعتِ خودروی او را سخت می‌سنجد.",
      why: "درست است (قدم ۱). او برای پیچیدن به چپ باید از جلوی تو رد شود و سرعتت را درست نمی‌فهمد؛ تو آماده‌ی ترمز باش.",
      rule: PRUDENZA,
      conceptStep: 1,
    },
    {
      sourceId: "5649",
      textIt: "Il conducente di autoveicolo o motoveicolo deve rispettare la distanza di sicurezza laterale da ciclisti o ciclomotoristi per evitare di metterne a repentaglio l'equilibrio nella guida",
      answer: 1,
      chunks: [
        { it: "Il conducente di autoveicolo o motoveicolo", fa: "راننده‌ی خودرو یا موتورسیکلت" },
        { it: "deve rispettare la distanza di sicurezza laterale", fa: "باید فاصله‌ی ایمنیِ جانبی را رعایت کند", verb: "deve ← dovere" },
        { it: "da ciclisti o ciclomotoristi", fa: "از دوچرخه‌سواران یا موتور گازی‌سواران" },
        { it: "per evitare di metterne a repentaglio l'equilibrio nella guida", fa: "تا تعادلشان را به خطر نیندازد", focus: "reason" },
      ],
      translation: "راننده‌ی خودرو یا موتورسیکلت باید فاصله‌ی ایمنیِ جانبی را از دوچرخه‌سواران یا موتور گازی‌سواران رعایت کند تا تعادلشان را به خطر نیندازد.",
      why: "درست است (قدم ۲). جریانِ هوا و نزدیکیِ تو کافی است تا یک وسیله‌ی سبک تعادلش را از دست بدهد.",
      rule: PRUDENZA,
      conceptStep: 2,
    },
    {
      sourceId: "5651",
      textIt: "Il conducente di autoveicolo deve rispettare le norme della circolazione, ma non è tenuto a prevedere le possibili imprudenze del ciclomotorista che lo affianca sulla strada",
      answer: 0,
      chunks: [
        { it: IL_CONDUCENTE, fa: IL_CONDUCENTE_FA },
        { it: "deve rispettare le norme della circolazione,", fa: "باید قوانینِ رانندگی را رعایت کند،", verb: "deve ← dovere" },
        { it: "ma non è tenuto a prevedere", fa: "ولی موظف نیست پیش‌بینی کند", verb: "è tenuto ← essere tenuto", focus: "negation" },
        { it: "le possibili imprudenze del ciclomotorista che lo affianca sulla strada", fa: "بی‌احتیاطی‌های احتمالیِ موتور گازی‌سواری را که کنارش در جاده است", verb: "affianca ← affiancare" },
      ],
      translation: "راننده‌ی خودرو باید قوانینِ رانندگی را رعایت کند، ولی موظف نیست بی‌احتیاطی‌های احتمالیِ موتور گازی‌سواری را که کنارش است پیش‌بینی کند.",
      why: "غلط است (قدم ۲). پیش‌بینیِ اشتباهِ دیگران جزوِ رانندگیِ محتاطانه است؛ قانون از تو رفتاری می‌خواهد که خطر نسازد.",
      rule: PRUDENZA,
      conceptStep: 2,
    },
    {
      sourceId: "5656",
      textIt: "Per il conducente di un'autovettura che procede a velocità regolare su strada extraurbana, può risultare difficoltosa la valutazione della velocità di una macchina agricola che, in genere, procede lentamente",
      answer: 1,
      chunks: [
        { it: "Per il conducente di un'autovettura che procede a velocità regolare su strada extraurbana,", fa: "برای راننده‌ی سواری‌ای که با سرعتِ عادی در جاده‌ی برون‌شهری می‌رود،", verb: "procede ← procedere" },
        { it: "può risultare difficoltosa la valutazione della velocità", fa: "سنجیدنِ سرعتِ … ممکن است سخت باشد", verb: "può ← potere" },
        { it: "di una macchina agricola che, in genere, procede lentamente", fa: "ماشینِ کشاورزی‌ای که معمولاً آرام می‌رود" },
      ],
      translation: "برای راننده‌ی سواری‌ای که با سرعتِ عادی در جاده‌ی برون‌شهری می‌رود، سنجیدنِ سرعتِ ماشینِ کشاورزی‌ای که معمولاً آرام می‌رود ممکن است سخت باشد.",
      why: "درست است (قدم ۳). از دور معلوم نیست چقدر کُند است؛ ناگهان می‌بینی خیلی زود به آن رسیده‌ای.",
      rule: PRUDENZA,
      conceptStep: 3,
    },
    {
      sourceId: "5657",
      textIt: "La presenza di veicoli che possono raggiungere velocità molto diverse tra loro, soprattutto su strada extraurbana, costituisce un fattore di sicurezza",
      answer: 0,
      chunks: [
        { it: "La presenza di veicoli che possono raggiungere velocità molto diverse tra loro,", fa: "حضورِ وسیله‌هایی که سرعت‌هایشان خیلی با هم فرق دارد،", verb: "possono ← potere" },
        { it: "soprattutto su strada extraurbana,", fa: "به‌خصوص در جاده‌ی برون‌شهری،" },
        { it: "costituisce un fattore di sicurezza", fa: "عاملِ ایمنی است", verb: "costituisce ← costituire", focus: "contrast" },
      ],
      translation: "حضورِ وسیله‌هایی که سرعت‌هایشان خیلی با هم فرق دارد، به‌خصوص در جاده‌ی برون‌شهری، عاملِ ایمنی است.",
      why: "غلط است (قدم ۳). فرقِ زیادِ سرعت خطر می‌سازد: رسیدنِ ناگهانی، سبقت‌های بیشتر.",
      rule: PRUDENZA,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["5636", "5637", "5638", "5639", "5640", "5641", "5642", "5643", "5644"] },
    { step: 2, sourceIds: ["5645", "5646", "5647", "5648", "5649", "5650", "5651", "5652", "5653"] },
    { step: 3, sourceIds: ["5654", "5655", "5656", "5657", "5658"] },
  ],
};

// ── Lesson 14 ─────────────────────────────────────────────────────────────────

export const lessonMassaVisibilita: Lesson = {
  id: "massa-suv-visibilita",
  titleFa: "جرم، شاسی‌بلند و آن‌چه راننده نمی‌بیند",
  titleIt: "MASSA · FUORISTRADA · CAMPO DI VISIBILITÀ",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی چرا برخوردِ دو وسیله با جرمِ خیلی متفاوت خطرناک‌تر است، چرا شاسی‌بلند (SUV) برای دیگران خطر است و در شهر سخت‌تر رانده می‌شود، و راننده‌ی کامیون و شاسی‌بلند چه چیزهایی را جلوی خودش نمی‌بیند.",
      why:
        "۲۷ سؤال، با یک دامِ تکراری: «بزرگ‌تر یعنی امن‌تر». خودروی سنگین فقط سرنشینِ خودش را کمی بیشتر محافظت می‌کند؛ برای بقیه خطرِ بزرگ‌تری است، و دیدِ رو به پایینش کمتر است.",
      rule: PRUDENZA,
    },
    {
      kind: "table",
      title: "جرمِ متفاوت",
      body: "در برخورد، وسیله‌ی سبک‌تر بیشترِ ضربه را می‌گیرد. هرچه فرقِ جرم بیشتر، برخورد برای سبک‌تر بدتر:",
      columns: ["درست", "دامِ بانک"],
      rows: [
        {
          label: "برخورد",
          it: "masse molto diverse",
          values: ["برخوردِ دو وسیله با جرمِ خیلی متفاوت خطرناک‌تر است", "«هرچه جرم‌ها متفاوت‌تر، ایمن‌تر» و «فرقِ زیادِ جرم و قدرت به ایمنی کمک می‌کند» غلط‌اند"],
        },
        {
          label: "سواریِ کوچک",
          it: "piccola autovettura",
          values: ["با سواریِ کوچک، خطرِ برخورد با سواریِ سنگین‌تر را بیشتر حساب کن", "«سواریِ سنگین برای وسیله‌های کوچک‌تر هم ضمانتِ ایمنی است» غلط است"],
        },
        {
          label: "کامیون و اتوبوس",
          it: "veicoli industriali e autobus",
          values: ["همیشه خطرِ بالقوه‌شان را بسنج، مخصوصاً وقتی از سرعتِ مجاز تندتر می‌روند", "«خطرشان از هر وسیله‌ی دیگری بیشتر نیست» غلط است"],
        },
      ],
      takeaway: "جرمِ بیشتر = ضربه‌ی بیشتر به طرفِ سبک‌تر. فرقِ جرم ایمنی نمی‌سازد.",
      rule: PRUDENZA,
    },
    {
      kind: "table",
      title: "شاسی‌بلند (SUV)",
      body: "شاسی‌بلند (fuoristrada) بلند و سنگین است. همین دو چیز برای دیگران خطر می‌سازد:",
      columns: ["درست", "دامِ بانک"],
      rows: [
        {
          label: "برای دیگران",
          it: "altezza e massa",
          values: ["بلندی و جرمش برای پیاده، دوچرخه‌سوار و سواریِ کوچک خطرِ بالقوه است", "«بیشترین ایمنی برای سرنشین‌ها و بقیه‌ی کاربرانِ جاده» غلط است"],
        },
        {
          label: "سپرِ بیرون‌زده",
          it: "paraurti sporgenti e rafforzati (bull bars)",
          values: ["سپرِ تقویت‌شده آسیبِ برخورد به وسیله‌ی کوچک‌تر را بدتر می‌کند", "«کمتر خطرناکش می‌کند» غلط است"],
        },
        {
          label: "در شهر",
          it: "particolarmente impegnativa in città",
          values: ["راندنش در شهر سخت‌تر است و در مانورهای اضطراری احتیاطِ ویژه می‌خواهد", "«مخصوصاً برای داخلِ شهر مناسب است» غلط است"],
        },
        {
          label: "دیدِ پایین",
          it: "fuori dal campo visivo",
          values: ["پیاده‌ها، مخصوصاً بچه‌ها، ممکن است جلوی آن دیده نشوند", "«بلندی‌اش دیدِ کامل به مانع‌های پایین می‌دهد» غلط است"],
        },
      ],
      takeaway: "شاسی‌بلند = بلند + سنگین: خطرِ بیشتر برای دیگران، دیدِ کمتر به پایین، سخت در شهر.",
      rule: PRUDENZA,
    },
    {
      kind: "table",
      title: "آن‌چه راننده نمی‌بیند",
      body: "هیچ خودرویی همه‌جا را نشان نمی‌دهد. پشت‌سری، ستون‌های بدنه، و در کامیون خودِ دماغه، جاهایی را پنهان می‌کنند:",
      columns: ["درست", "دامِ بانک"],
      rows: [
        {
          label: "هر خودرو",
          it: "visualizzare l'area antistante e limitrofa",
          values: ["حتی با طراحیِ خوب، جلو و کنارت را با دقت نگاه کن؛ پشت‌سری یا ستونِ بدنه ممکن است کسی را پنهان کند", "«یک نگاهِ سریع کافی است چون دید از ساخت خوب است» غلط است"],
        },
        {
          label: "شیشه‌ها",
          it: "pellicole adesive",
          values: ["روی شیشه‌ی جلو و شیشه‌های کناریِ جلو برچسبِ رنگی ممنوع است", "«اگر جداشدنی باشد مجاز است» غلط است"],
        },
        {
          label: "کامیونِ ایستاده",
          it: "zona immediatamente antistante",
          values: [
            "راننده‌ی کامیون جلوی دماغه‌اش را نمی‌بیند؛ قبل از راه افتادن، پشتِ چراغ قرمز یا در صف، به پیاده و دوچرخه‌ی چسبیده به جلو فکر کند",
            "«دیدِ کامیون همه‌ی جلو و کنار را پوشش می‌دهد» و «پیاده جلوی کامیون حتماً دیده می‌شود» غلط‌اند",
          ],
        },
      ],
      takeaway: "پیاده‌ای که جلوی دماغه‌ی کامیون یا شاسی‌بلند است، اغلب دیده نمی‌شود. با فرضِ ندیده‌شدن رفتار کن، چه پشتِ فرمان باشی، چه پیاده.",
      rule: `${PRUDENZA}; pellicole: Codice della Strada, art. 78 e circolare MIT`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la massa", fa: "جرم" },
        { it: "il tamponamento", fa: "تصادف از پشت" },
        { it: "il fuoristrada (Suv)", fa: "شاسی‌بلند" },
        { it: "il paraurti rafforzato (bull bar)", fa: "سپرِ تقویت‌شده" },
        { it: "il campo di visibilità", fa: "میدانِ دید" },
        { it: "il poggiatesta", fa: "پشت‌سری" },
        { it: "la pellicola adesiva", fa: "برچسبِ رنگیِ شیشه" },
        { it: "l'avvistamento", fa: "دیده شدن، دیدن از دور" },
      ],
    },
    {
      kind: "trap",
      title: "جرم‌های متفاوت",
      body: "هر دو جمله درباره‌ی فرقِ جرمِ وسیله‌ها هستند:",
      examples: [
        {
          sourceId: "5659",
          textIt: "Risulta maggiormente pericolosa la collisione tra veicoli dotati di masse molto diverse tra loro",
          answer: 1,
          chunks: [
            { it: "Risulta maggiormente pericolosa la collisione", fa: "برخورد خطرناک‌تر است", verb: "risulta ← risultare" },
            { it: "tra veicoli dotati di masse molto diverse tra loro", fa: "بینِ وسیله‌هایی که جرمشان خیلی با هم فرق دارد" },
          ],
          translation: "برخورد بینِ وسیله‌هایی که جرمشان خیلی با هم فرق دارد خطرناک‌تر است.",
          why: "درست است. ضربه بیشتر به وسیله‌ی سبک‌تر منتقل می‌شود.",
        },
        {
          sourceId: "5662",
          textIt: "I veicoli sono tanto più sicuri, nella circolazione, quanto più le loro masse sono differenziate",
          answer: 0,
          chunks: [
            { it: "I veicoli sono tanto più sicuri, nella circolazione,", fa: "وسیله‌ها در ترافیک ایمن‌ترند،" },
            { it: "quanto più le loro masse sono differenziate", fa: "هرچه جرمشان متفاوت‌تر باشد", focus: "contrast" },
          ],
          translation: "وسیله‌ها در ترافیک هرچه جرمشان متفاوت‌تر باشد، ایمن‌ترند.",
          why: "غلط است. برعکس: فرقِ جرم خطر را بیشتر می‌کند.",
        },
      ],
      takeaway: "«masse molto diverse» با «più pericolosa» درست است؛ با «più sicuri» غلط.",
      rule: PRUDENZA,
    },
  ],
  practice: [
    {
      sourceId: "5661",
      textIt: "Un'autovettura dotata di notevole massa costituisce, nella circolazione, una garanzia di sicurezza anche per gli altri veicoli di dimensioni e di massa inferiori",
      answer: 0,
      chunks: [
        { it: "Un'autovettura dotata di notevole massa costituisce, nella circolazione,", fa: "سواریِ سنگین در ترافیک", verb: "costituisce ← costituire" },
        { it: "una garanzia di sicurezza", fa: "ضمانتِ ایمنی است", focus: "contrast" },
        { it: "anche per gli altri veicoli di dimensioni e di massa inferiori", fa: "حتی برای وسیله‌های کوچک‌تر و سبک‌تر" },
      ],
      translation: "سواریِ سنگین در ترافیک، حتی برای وسیله‌های کوچک‌تر و سبک‌تر، ضمانتِ ایمنی است.",
      why: "غلط است (قدم ۱). برای وسیله‌ی سبک‌تر، برخورد با سواریِ سنگین بدتر است، نه امن‌تر.",
      rule: PRUDENZA,
      conceptStep: 1,
    },
    {
      sourceId: "5665",
      textIt: "I conducenti dei fuoristrada (Suv) debbono considerare i gravi danni che i paraurti sporgenti e rafforzati del proprio mezzo possono determinare nel caso di impatto con veicoli più piccoli",
      answer: 1,
      chunks: [
        { it: "I conducenti dei fuoristrada (Suv) debbono considerare i gravi danni", fa: "راننده‌های شاسی‌بلند باید آسیب‌های جدی را حساب کنند", verb: "debbono ← dovere" },
        { it: "che i paraurti sporgenti e rafforzati del proprio mezzo possono determinare", fa: "که سپرهای بیرون‌زده و تقویت‌شده‌ی وسیله‌شان می‌توانند بزنند", verb: "possono ← potere" },
        { it: "nel caso di impatto con veicoli più piccoli", fa: "در برخورد با وسیله‌های کوچک‌تر", focus: "condition" },
      ],
      translation: "راننده‌های شاسی‌بلند باید آسیب‌های جدی‌ای را که سپرهای بیرون‌زده و تقویت‌شده‌ی وسیله‌شان در برخورد با وسیله‌های کوچک‌تر می‌زنند حساب کنند.",
      why: "درست است (قدم ۲). سپرِ تقویت‌شده ضربه را بیشتر به وسیله‌ی کوچک‌تر می‌دهد.",
      rule: PRUDENZA,
      conceptStep: 2,
    },
    {
      sourceId: "5669",
      textIt: "La guida di un fuoristrada (Suv) risulta particolarmente indicata all'interno dei centri abitati",
      answer: 0,
      chunks: [
        { it: "La guida di un fuoristrada (Suv)", fa: "راندنِ شاسی‌بلند" },
        { it: "risulta particolarmente indicata", fa: "به‌خصوص مناسب است", verb: "risulta ← risultare", focus: "contrast" },
        { it: "all'interno dei centri abitati", fa: "داخلِ آبادی‌ها" },
      ],
      translation: "راندنِ شاسی‌بلند به‌خصوص داخلِ آبادی‌ها مناسب است.",
      why: "غلط است (قدم ۲). در شهر، با پیاده‌ها و فضای تنگ، شاسی‌بلند سخت‌تر رانده می‌شود و احتیاطِ بیشتری می‌خواهد.",
      rule: PRUDENZA,
      conceptStep: 2,
    },
    {
      sourceId: "5681",
      textIt: "Il conducente di un autocarro fermo al semaforo deve prevedere la presenza di pedoni e ciclisti il cui avvistamento è precluso dalla sagoma del proprio veicolo",
      answer: 1,
      chunks: [
        { it: "Il conducente di un autocarro fermo al semaforo", fa: "راننده‌ی کامیونی که پشتِ چراغ ایستاده" },
        { it: "deve prevedere la presenza di pedoni e ciclisti", fa: "باید حضورِ پیاده‌ها و دوچرخه‌سوارانی را پیش‌بینی کند", verb: "deve ← dovere" },
        { it: "il cui avvistamento è precluso dalla sagoma del proprio veicolo", fa: "که بدنه‌ی وسیله‌ی خودش جلوی دیدنشان را گرفته" },
      ],
      translation: "راننده‌ی کامیونی که پشتِ چراغ ایستاده، باید حضورِ پیاده‌ها و دوچرخه‌سوارانی را پیش‌بینی کند که بدنه‌ی وسیله‌ی خودش جلوی دیدنشان را گرفته.",
      why: "درست است (قدم ۳). جلوی دماغه‌ی کامیون نقطه‌ی کور است؛ قبل از راه افتادن باید به آن فکر کرد.",
      rule: PRUDENZA,
      conceptStep: 3,
    },
    {
      sourceId: "5684",
      textIt: "Un pedone può attraversare la strada in tutta sicurezza passando a distanza ravvicinata rispetto alla parte frontale di un autocarro fermo in colonna che sta per ripartire, in quanto sicuramente avvistabile dal conducente",
      answer: 0,
      chunks: [
        { it: "Un pedone può attraversare la strada in tutta sicurezza", fa: "پیاده می‌تواند کاملاً امن از خیابان رد شود", verb: "può ← potere" },
        { it: "passando a distanza ravvicinata rispetto alla parte frontale", fa: "با رد شدن از فاصله‌ی خیلی نزدیکِ جلوی" },
        { it: "di un autocarro fermo in colonna che sta per ripartire,", fa: "کامیونی که در صف ایستاده و دارد راه می‌افتد،", verb: "sta per ripartire ← ripartire" },
        { it: "in quanto sicuramente avvistabile dal conducente", fa: "چون راننده حتماً او را می‌بیند", focus: "reason" },
      ],
      translation: "پیاده می‌تواند با رد شدن از فاصله‌ی خیلی نزدیکِ جلوی کامیونی که در صف ایستاده و دارد راه می‌افتد، کاملاً امن از خیابان رد شود، چون راننده حتماً او را می‌بیند.",
      why: "غلط است (قدم ۳). درست همان‌جا راننده او را نمی‌بیند.",
      rule: PRUDENZA,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["5659", "5660", "5661", "5662", "5663", "5670", "5671", "5672"] },
    { step: 2, sourceIds: ["5664", "5665", "5666", "5667", "5668", "5669", "5676", "5679"] },
    { step: 3, sourceIds: ["5673", "5674", "5675", "5677", "5678", "5680", "5681", "5682", "5683", "5684", "5685"] },
  ],
};
