/**
 * src/content/ch23-ripasso.ts
 * Chapter 23 (Responsabilità civile, penale e assicurazione): the chapter review.
 * Twenty-four real bank questions, two per lesson in lesson order, none shown
 * inside a lesson and none of the policy-dependent statements; a mistake routes
 * back to the lesson section that teaches it (tests/chapter23.test.ts).
 */
import type { Lesson } from "./lessons.js";
import { CAP, CC_2054, CDS, COST_27, CP, IVASS } from "./ch23-common.js";

const CDS_140 = CDS("140");
const CHI = "Chi è penalmente e civilmente responsabile di un sinistro stradale";
const CHI_FA = "کسی که از نظرِ کیفری و مدنی مسئولِ یک تصادف است";
const RP = "La responsabilità penale connessa al sinistro stradale";
const RP_FA = "مسئولیتِ کیفریِ ناشی از تصادف";
const RC = "La responsabilità civile connessa al sinistro stradale";
const RC_FA = "مسئولیتِ مدنیِ ناشی از تصادف";
const AR = "L'assicurazione per la responsabilità civile auto (R.C.A.)";
const AR_FA = "بیمه‌ی شخص ثالث (R.C.A.)";
const QS = "Quando l'assicurazione per la responsabilità civile auto è scaduta di validità";
const QS_FA = "وقتی اعتبارِ بیمه‌ی شخص ثالث تمام شده";

export const reviewResponsabilita: Lesson = {
  id: "ripasso-capitolo-23",
  titleFa: "مرور فصل ۲۳",
  titleIt: "RIPASSO · RESPONSABILITÀ CIVILE, PENALE E ASSICURAZIONE",
  minutes: 10,
  signs: [],
  review: true,
  steps: [
    {
      kind: "intro",
      title: "مرور فصل",
      objective:
        "بیست‌وچهار سؤالِ واقعی از بانک، دو تا از هر درس: چهار درس درباره‌ی مسئولیت، چهار درس درباره‌ی بیمه و چهار درس درباره‌ی روان‌شناسیِ ترافیک. هیچ‌کدام را در درس‌ها ندیده‌ای.",
      why: "دو حرکت در کلِ فصل تکرار می‌شود. در مسئولیت و بیمه، جمله‌ی غلط یکی از سه راه (مدنی، کیفری، اداری) را با پول یا بیمه «می‌بندد»، یا پوششی می‌سازد که نیست. در روان‌شناسی، جمله‌ی غلط اجازه یا استثنایی ساختگی می‌دهد («وقتی خطری نیست»، «فقط وقتی…»). سؤالی که این‌جا اشتباه کنی به فهرستِ مرورت اضافه می‌شود و به بخشِ درسِ مربوطش وصل است. این مرور مشاوره‌ی حقوقی یا بیمه‌ای نیست.",
    },
    {
      kind: "table",
      title: "فصل ۲۳ در دوازده خط",
      body: "قبل از سؤال‌ها، نکته‌ی اصلیِ هر درس را یک بار دیگر ببین. اگر جایی برایت تازه بود، اول همان درس را دوباره باز کن.",
      columns: ["نکته‌ی اصلی"],
      rows: [
        { label: "درس ۱", it: "civile · penale · amministrativa", values: ["یک تصادف، سه راهِ مستقل که با هم جمع می‌شوند؛ تعلیق، ابطال، بازآزمایی «ممکن»"] },
        { label: "درس ۲", it: "quando è reato", values: ["جرم = آسیب به آدم یا مرگ؛ مالِ تنها نه؛ فقط قوه‌ی قاهره پاکش می‌کند، نه پول، بیمه یا کمک"] },
        { label: "درس ۳", it: "responsabilità civile", values: ["هر خسارتی جبران می‌شود: آدم و مال، کم و زیاد، بعد از مرگ؛ بیمه آن را عوض نمی‌کند"] },
        { label: "درس ۴", it: "chi risponde · risarcimento", values: ["مدنی: راننده و مالک؛ کیفری: فقط راننده؛ بی‌رضایتِ مالک با اثبات: فقط راننده"] },
        { label: "درس ۵", it: "obbligo · certificato · bonus malus", values: ["قانون: بیمه، گواهی، همراه داشتنش؛ بونوس‌مالوس سالانه با تصادف، برای موتور هم"] },
        { label: "درس ۶", it: "cosa copre · risarcimento diretto", values: ["دیگران، آدم و مال، اروپا، تا سقف؛ نه مجازات، نه جریمه. مستقیم: دو وسیله، صدمه‌ی سبک"] },
        { label: "درس ۷", it: "massimali · polizze facoltative", values: ["سقف = حداکثرِ پرداختِ شرکت، حداقلش با قانون؛ سرقت، آتش‌سوزی، بدنه اختیاری"] },
        { label: "درس ۸", it: "senza assicurazione · Fondo", values: ["بی‌بیمه نه راندن، نه پارک؛ جریمه، توقیف، مصادره. صندوق: بی‌بیمه، ناشناس، دزدیده"] },
        { label: "درس ۹", it: "sensi · attenzione · emozioni", values: ["حواس و توجه حد دارند؛ محیط و احساسات اثر دارند؛ شنوایی مهم است؛ توجه تمرین‌پذیر است"] },
        { label: "درس ۱۰", it: "distrazioni", values: ["گوشی در دست ممنوع؛ بلندگو مجاز ولی حواس‌پرت‌کن؛ مسیریاب و آینه پیش از حرکت"] },
        { label: "درس ۱۱", it: "sé stessi e gli altri", values: ["توانت را دست‌بالا نگیر؛ دیگران را پیش‌بینی کن؛ تقاطعِ نامطمئن: بایست"] },
        { label: "درس ۱۲", it: "rispetto delle norme", values: ["قاعده برای همه و همیشه؛ «فقط وقتی…» غلط؛ الکل هیچ‌وقت کمک نمی‌کند"] },
      ],
      takeaway: "پول و بیمه فقط راهِ مدنی را حل می‌کنند و فقط تا سقف. قاعده‌ها و توجه استثنا ندارند.",
    },
  ],
  practice: [
    {
      sourceId: "6610",
      textIt: "Chi è penalmente e civilmente responsabile di un sinistro stradale è tenuto al risarcimento dei danni",
      answer: 1,
      chunks: [
        { it: CHI, fa: CHI_FA },
        { it: "è tenuto al risarcimento dei danni", fa: "موظف به جبرانِ خسارت است", verb: "è tenuto ← tenere" },
      ],
      translation: "کسی که از نظرِ کیفری و مدنی مسئولِ یک تصادف است، موظف به جبرانِ خسارت است.",
      why: "درست است (درس ۱). «civilmente responsabile» یعنی راهِ مدنی باز است: جبرانِ خسارت.",
      rule: `${CC_2054}; ${CP("185")}`,
      conceptStep: 1,
    },
    {
      sourceId: "6617",
      textIt: "Chi è penalmente e civilmente responsabile di un sinistro stradale è in ogni caso assoggettato alla revoca della patente",
      answer: 0,
      chunks: [
        { it: CHI, fa: CHI_FA },
        { it: "è in ogni caso assoggettato alla revoca della patente", fa: "در هر حال گواهینامه‌اش باطل می‌شود", focus: "always" },
      ],
      translation: "کسی که از نظرِ کیفری و مدنی مسئولِ یک تصادف است، در هر حال گواهینامه‌اش باطل می‌شود.",
      why: "غلط است (درس ۱). ابطال «ممکن» است، برای محکومیت‌های جدی؛ «in ogni caso» غلط است.",
      rule: CDS("222"),
      conceptStep: 2,
    },
    {
      sourceId: "6631",
      textIt: "La responsabilità penale connessa al sinistro stradale sorge nei confronti del proprietario del veicolo se il conducente non è stato identificato",
      answer: 0,
      chunks: [
        { it: RP, fa: RP_FA },
        { it: "sorge nei confronti del proprietario del veicolo", fa: "برای مالکِ وسیله پیش می‌آید", verb: "sorge ← sorgere", focus: "contrast" },
        { it: "se il conducente non è stato identificato", fa: "اگر راننده شناسایی نشده باشد", focus: "condition" },
      ],
      translation: "اگر راننده شناسایی نشده باشد، مسئولیتِ کیفریِ ناشی از تصادف برای مالکِ وسیله پیش می‌آید.",
      why: "غلط است (درس ۲). مسئولیتِ کیفری شخصی است و به مالک منتقل نمی‌شود.",
      rule: COST_27,
      conceptStep: 1,
    },
    {
      sourceId: "6622",
      textIt: "La responsabilità penale connessa al sinistro stradale è esclusa quando si sia prestato soccorso alla vittima",
      answer: 0,
      chunks: [
        { it: RP, fa: RP_FA },
        { it: "è esclusa", fa: "از بین می‌رود", verb: "è esclusa ← escludere" },
        { it: "quando si sia prestato soccorso alla vittima", fa: "وقتی به قربانی کمک رسانده شده باشد", focus: "condition" },
      ],
      translation: "مسئولیتِ کیفریِ ناشی از تصادف از بین می‌رود، وقتی به قربانی کمک رسانده شده باشد.",
      why: "غلط است (درس ۲). کمک رساندن وظیفه است؛ جرم را پاک نمی‌کند.",
      rule: `${CDS("189")}; ${CP("590-bis")}`,
      conceptStep: 2,
    },
    {
      sourceId: "6637",
      textIt: "La responsabilità civile connessa al sinistro stradale è esclusa in caso di morte del danneggiato",
      answer: 0,
      chunks: [
        { it: RC, fa: RC_FA },
        { it: "è esclusa in caso di morte del danneggiato", fa: "در صورتِ مرگِ زیان‌دیده منتفی است", focus: "negation", verb: "è esclusa ← escludere" },
      ],
      translation: "مسئولیتِ مدنیِ ناشی از تصادف در صورتِ مرگِ زیان‌دیده منتفی است.",
      why: "غلط است (درس ۳). خانواده و وارثان حقِ جبران دارند.",
      rule: "Codice civile, artt. 2043, 2054",
      conceptStep: 1,
    },
    {
      sourceId: "6640",
      textIt: "La responsabilità civile connessa al sinistro stradale è aggravata dalla mancata copertura assicurativa",
      answer: 0,
      chunks: [
        { it: RC, fa: RC_FA },
        { it: "è aggravata dalla mancata copertura assicurativa", fa: "با نبودنِ پوششِ بیمه سنگین‌تر می‌شود", verb: "è aggravata ← aggravare", focus: "contrast" },
      ],
      translation: "مسئولیتِ مدنیِ ناشی از تصادف با نبودنِ پوششِ بیمه سنگین‌تر می‌شود.",
      why: "غلط است (درس ۳). خسارت همان است؛ فقط خودت باید بدهی و جریمه‌ی جداگانه هم داری.",
      rule: `${CC_2054}; ${CDS("193")}`,
      conceptStep: 2,
    },
    {
      sourceId: "6651",
      textIt: "La responsabilità per danni connessi alla circolazione dei veicoli non è a carico del proprietario del veicolo se prova che la circolazione è avvenuta contro la sua volontà",
      answer: 1,
      chunks: [
        { it: "La responsabilità per danni connessi alla circolazione dei veicoli", fa: "مسئولیتِ خسارت‌های ناشی از رفت‌وآمدِ وسیله‌ها" },
        { it: "non è a carico del proprietario del veicolo", fa: "بر دوشِ مالکِ وسیله نیست", focus: "negation" },
        { it: "se prova che la circolazione è avvenuta contro la sua volontà", fa: "اگر ثابت کند که خودرو بدونِ رضایتش رانده شده", focus: "condition", verb: "prova ← provare" },
      ],
      translation: "مسئولیتِ خسارت‌های ناشی از رفت‌وآمدِ وسیله‌ها بر دوشِ مالکِ وسیله نیست، اگر ثابت کند که خودرو بدونِ رضایتش رانده شده.",
      why: "درست است (درس ۴). بندِ ۳ ماده‌ی ۲۰۵۴؛ کلیدش «se prova» است.",
      rule: `${CC_2054} c.3`,
      conceptStep: 1,
    },
    {
      sourceId: "6608",
      textIt: "Chi è civilmente obbligato a risarcire i danni provocati da un sinistro stradale si libera da ogni forma di responsabilità penale pagandone l'ammontare del danno",
      answer: 0,
      chunks: [
        { it: "Chi è civilmente obbligato a risarcire i danni provocati da un sinistro stradale", fa: "کسی که از نظرِ مدنی موظف است خسارت‌های یک تصادف را جبران کند" },
        { it: "si libera da ogni forma di responsabilità penale", fa: "از هر نوع مسئولیتِ کیفری رها می‌شود", verb: "si libera ← liberarsi", focus: "always" },
        { it: "pagandone l'ammontare del danno", fa: "با پرداختِ مبلغِ خسارت", focus: "reason" },
      ],
      translation: "کسی که از نظرِ مدنی موظف است خسارت‌های یک تصادف را جبران کند، با پرداختِ مبلغِ خسارت از هر نوع مسئولیتِ کیفری رها می‌شود.",
      why: "غلط است (درس ۴). پول راهِ مدنی را می‌بندد، نه کیفری را.",
      rule: CP("162-ter"),
      conceptStep: 2,
    },
    {
      sourceId: "6693",
      textIt: "Il certificato di assicurazione obbligatoria deve essere sempre tenuto a bordo del veicolo",
      answer: 1,
      chunks: [
        { it: "Il certificato di assicurazione obbligatoria", fa: "گواهیِ بیمه‌ی اجباری" },
        { it: "deve essere sempre tenuto a bordo del veicolo", fa: "باید همیشه همراهِ خودرو باشد", verb: "deve ← dovere", focus: "always" },
      ],
      translation: "گواهیِ بیمه‌ی اجباری باید همیشه همراهِ خودرو باشد.",
      why: "درست است (درس ۵). روی گوشی هم می‌شود نشانش داد.",
      rule: `${CDS("180")}; ${IVASS}`,
      conceptStep: 1,
    },
    {
      sourceId: "6682",
      textIt: "La formula assicurativa “bonus malus” non si applica per i motocicli",
      answer: 0,
      chunks: [
        { it: "La formula assicurativa “bonus malus”", fa: "فرمولِ بیمه‌ایِ «بونوس‌مالوس»" },
        { it: "non si applica per i motocicli", fa: "برای موتورسیکلت به کار نمی‌رود", focus: "negation", verb: "si applica ← applicarsi" },
      ],
      translation: "فرمولِ بیمه‌ایِ «بونوس‌مالوس» برای موتورسیکلت به کار نمی‌رود.",
      why: "غلط است (درس ۵). سواری، موتورسیکلت و موتور گازی همه می‌توانند با بونوس‌مالوس بیمه شوند.",
      rule: IVASS,
      conceptStep: 2,
    },
    {
      sourceId: "6688",
      textIt: "L'assicurazione per la responsabilità civile auto (R.C.A.) copre ogni danno causato, anche se superiore al massimale stabilito",
      answer: 0,
      chunks: [
        { it: AR, fa: AR_FA },
        { it: "copre ogni danno causato,", fa: "هر خسارتی را می‌پوشاند،", verb: "copre ← coprire", focus: "always" },
        { it: "anche se superiore al massimale stabilito", fa: "حتی اگر بالاتر از سقفِ تعیین‌شده باشد", focus: "contrast" },
      ],
      translation: "بیمه‌ی شخص ثالث (R.C.A.) هر خسارتی را می‌پوشاند، حتی اگر بالاتر از سقفِ تعیین‌شده باشد.",
      why: "غلط است (درس ۶). بالاتر از سقف با خودِ مسئول است.",
      rule: CAP("128"),
      conceptStep: 1,
    },
    {
      sourceId: "6645",
      textIt: "La procedura di risarcimento diretto non è applicabile se vi sono più di due veicoli coinvolti",
      answer: 1,
      chunks: [
        { it: "La procedura di risarcimento diretto", fa: "روشِ جبرانِ مستقیم" },
        { it: "non è applicabile", fa: "به کار نمی‌رود", focus: "negation" },
        { it: "se vi sono più di due veicoli coinvolti", fa: "اگر بیش از دو وسیله درگیر باشند", focus: "condition" },
      ],
      translation: "اگر بیش از دو وسیله درگیر باشند، روشِ جبرانِ مستقیم به کار نمی‌رود.",
      why: "درست است (درس ۶). فقط دو وسیله.",
      rule: CAP("149"),
      conceptStep: 2,
    },
    {
      sourceId: "6677",
      textIt: "I massimali della polizza di assicurazione R.C.A. (responsabilità civile auto) possono essere aumentati, a scelta del cliente, pagando una maggiore somma di denaro (premio assicurativo)",
      answer: 1,
      chunks: [
        { it: "I massimali della polizza di assicurazione R.C.A. (responsabilità civile auto)", fa: "سقف‌های تعهدِ بیمه‌نامه‌ی شخص ثالث" },
        { it: "possono essere aumentati, a scelta del cliente,", fa: "به انتخابِ مشتری می‌توانند بالا بروند،", verb: "possono ← potere" },
        { it: "pagando una maggiore somma di denaro (premio assicurativo)", fa: "با پرداختِ پولِ بیشتر (حقِ بیمه)", focus: "condition" },
      ],
      translation: "سقف‌های تعهدِ بیمه‌نامه‌ی شخص ثالث به انتخابِ مشتری و با پرداختِ پولِ بیشتر (حقِ بیمه) می‌توانند بالا بروند.",
      why: "درست است (درس ۷). سقفِ بالاتر، حقِ بیمه‌ی بیشتر.",
      rule: `${CAP("128")}; ${IVASS}`,
      conceptStep: 1,
    },
    {
      sourceId: "6674",
      textIt: "Le polizze assicurative contro il rischio d'incendio del veicolo coprono, normalmente, solo i danni causati da incendi dolosi (intenzionali) e non quelli provocati da incendi accidentali (casuali)",
      answer: 0,
      chunks: [
        { it: "Le polizze assicurative contro il rischio d'incendio del veicolo coprono, normalmente,", fa: "بیمه‌نامه‌های آتش‌سوزیِ خودرو معمولاً می‌پوشانند", verb: "coprono ← coprire" },
        { it: "solo i danni causati da incendi dolosi (intenzionali)", fa: "فقط خسارتِ آتش‌سوزیِ عمدی را", focus: "limit" },
        { it: "e non quelli provocati da incendi accidentali (casuali)", fa: "و نه آتش‌سوزیِ اتفاقی را", focus: "negation" },
      ],
      translation: "بیمه‌نامه‌های آتش‌سوزیِ خودرو معمولاً فقط خسارتِ آتش‌سوزیِ عمدی را می‌پوشانند و نه آتش‌سوزیِ اتفاقی را.",
      why: "غلط است (درس ۷). آتش‌سوزیِ اتفاقی هم پوشش دارد.",
      rule: IVASS,
      conceptStep: 2,
    },
    {
      sourceId: "6656",
      textIt: "Quando l'assicurazione per la responsabilità civile auto è scaduta di validità si può incorrere nella confisca del veicolo",
      answer: 1,
      chunks: [
        { it: QS, fa: QS_FA },
        { it: "si può incorrere nella confisca del veicolo", fa: "ممکن است خودرو مصادره شود", verb: "si può ← potere" },
      ],
      translation: "وقتی اعتبارِ بیمه‌ی شخص ثالث تمام شده، ممکن است خودرو مصادره شود.",
      why: "درست است (درس ۸). ماده‌ی ۱۹۳ بندِ ۴.",
      rule: `${CDS("193")} c.4`,
      conceptStep: 1,
    },
    {
      sourceId: "6667",
      textIt: "Il \"fondo di garanzia per le vittime della strada\" risarcisce i danni arrecati dai conducenti minorenni",
      answer: 0,
      chunks: [
        { it: "Il \"fondo di garanzia per le vittime della strada\"", fa: "«صندوقِ تضمینِ قربانیانِ جاده»" },
        { it: "risarcisce i danni arrecati dai conducenti minorenni", fa: "خسارت‌هایی را که راننده‌های زیرِ سن زده‌اند جبران می‌کند", verb: "risarcisce ← risarcire", focus: "contrast" },
      ],
      translation: "«صندوقِ تضمینِ قربانیانِ جاده» خسارت‌هایی را که راننده‌های زیرِ سن زده‌اند جبران می‌کند.",
      why: "غلط است (درس ۸). صندوق برای خودروی بی‌بیمه، ناشناس یا دزدیده است، نه برای سنِ راننده.",
      rule: CAP("283"),
      conceptStep: 2,
    },
    {
      sourceId: "6751",
      textIt: "L'udito non è un senso importante quando si guida",
      answer: 0,
      chunks: [
        { it: "L'udito", fa: "شنوایی" },
        { it: "non è un senso importante quando si guida", fa: "هنگامِ رانندگی حسِ مهمی نیست", focus: "negation" },
      ],
      translation: "شنوایی هنگامِ رانندگی حسِ مهمی نیست.",
      why: "غلط است (درس ۹). آژیر، بوق و صدای جاده را با گوش می‌گیری.",
      rule: CDS_140,
      conceptStep: 1,
    },
    {
      sourceId: "6742",
      textIt: "L'attenzione alla guida è importante solo quando si compiono manovre pericolose quali, ad esempio, un sorpasso",
      answer: 0,
      chunks: [
        { it: "L'attenzione alla guida è importante", fa: "توجه در رانندگی مهم است" },
        { it: "solo quando si compiono manovre pericolose", fa: "فقط وقتی مانورهای خطرناک انجام می‌دهی", focus: "limit" },
        { it: "quali, ad esempio, un sorpasso", fa: "مثلاً سبقت" },
      ],
      translation: "توجه در رانندگی فقط وقتی مهم است که مانورهای خطرناکی مثلِ سبقت انجام می‌دهی.",
      why: "غلط است (درس ۹). توجه در همه‌ی مسیر لازم است.",
      rule: CDS_140,
      conceptStep: 1,
    },
    {
      sourceId: "6710",
      textIt: "Utilizzare il cellulare alla guida è pericoloso perché riduce l'attenzione alla strada",
      answer: 1,
      chunks: [
        { it: "Utilizzare il cellulare alla guida è pericoloso", fa: "استفاده از تلفنِ همراه هنگامِ رانندگی خطرناک است" },
        { it: "perché riduce l'attenzione alla strada", fa: "چون توجه به جاده را کم می‌کند", focus: "reason", verb: "riduce ← ridurre" },
      ],
      translation: "استفاده از تلفنِ همراه هنگامِ رانندگی خطرناک است، چون توجه به جاده را کم می‌کند.",
      why: "درست است (درس ۱۰). گوشی چشم، دست و ذهن را با هم از جاده می‌گیرد؛ با گوشیِ در دست، ممنوع هم هست.",
      rule: CDS("173"),
      conceptStep: 1,
    },
    {
      sourceId: "6707",
      textIt: "Quando si è alla guida, la capacità di attenzione può essere influenzata anche dall'ascolto di musica a volume molto alto",
      answer: 1,
      chunks: [
        { it: "Quando si è alla guida,", fa: "هنگامِ رانندگی،" },
        { it: "la capacità di attenzione può essere influenzata", fa: "توانِ توجه ممکن است تحتِ تأثیر قرار بگیرد", verb: "può ← potere" },
        { it: "anche dall'ascolto di musica a volume molto alto", fa: "حتی با گوش دادن به موسیقیِ خیلی بلند", focus: "contrast" },
      ],
      translation: "هنگامِ رانندگی، توانِ توجه ممکن است حتی با گوش دادن به موسیقیِ خیلی بلند تحتِ تأثیر قرار بگیرد.",
      why: "درست است (درس ۱۰). صدای بلند هم توجه را می‌گیرد، هم صدای جاده را می‌پوشاند.",
      rule: CDS_140,
      conceptStep: 2,
    },
    {
      sourceId: "6723",
      textIt: "A volte ci si espone a situazioni più rischiose di quelle che si è in grado di gestire",
      answer: 1,
      chunks: [
        { it: "A volte ci si espone a situazioni più rischiose", fa: "گاهی خودمان را در موقعیت‌های پرخطرتری می‌اندازیم", verb: "ci si espone ← esporsi" },
        { it: "di quelle che si è in grado di gestire", fa: "از آن‌هایی که از پسشان برمی‌آییم", focus: "contrast" },
      ],
      translation: "گاهی خودمان را در موقعیت‌هایی پرخطرتر از آن‌هایی می‌اندازیم که از پسشان برمی‌آییم.",
      why: "درست است (درس ۱۱). برای همین توانت را دست‌بالا نمی‌گیری.",
      rule: CDS_140,
      conceptStep: 1,
    },
    {
      sourceId: "6726",
      textIt: "Il conducente che intende passare per primo in un incrocio deve sopraggiungervi più velocemente",
      answer: 0,
      chunks: [
        { it: "Il conducente che intende passare per primo in un incrocio", fa: "راننده‌ای که می‌خواهد اول از تقاطع رد شود", verb: "intende ← intendere" },
        { it: "deve sopraggiungervi più velocemente", fa: "باید سریع‌تر به آن برسد", verb: "deve ← dovere", focus: "contrast" },
      ],
      translation: "راننده‌ای که می‌خواهد اول از تقاطع رد شود، باید سریع‌تر به آن برسد.",
      why: "غلط است (درس ۱۱). حق تقدم با قاعده است، نه با سرعت.",
      rule: CDS("145"),
      conceptStep: 2,
    },
    {
      sourceId: "6737",
      textIt: "Il rispetto delle norme di circolazione è importante solo se la loro violazione comporta una sanzione economica elevata",
      answer: 0,
      chunks: [
        { it: "Il rispetto delle norme di circolazione", fa: "رعایتِ قاعده‌های رفت‌وآمد" },
        { it: "è importante solo se la loro violazione comporta una sanzione economica elevata", fa: "فقط وقتی مهم است که نقضشان جریمه‌ی سنگینی داشته باشد", focus: "limit" },
      ],
      translation: "رعایتِ قاعده‌های رفت‌وآمد فقط وقتی مهم است که نقضشان جریمه‌ی سنگینی داشته باشد.",
      why: "غلط است (درس ۱۲). قاعده برای ایمنی است، نه به اندازه‌ی جریمه.",
      rule: CDS_140,
      conceptStep: 1,
    },
    {
      sourceId: "6743",
      textIt: "Bere un liquore ad alta gradazione alcolica permette di migliorare l'attenzione dopo circa 10 minuti dall'ingestione",
      answer: 0,
      chunks: [
        { it: "Bere un liquore ad alta gradazione alcolica", fa: "نوشیدنِ یک لیکورِ پرالکل" },
        { it: "permette di migliorare l'attenzione dopo circa 10 minuti dall'ingestione", fa: "حدودِ ده دقیقه بعد توجه را بهتر می‌کند", verb: "permette ← permettere", focus: "contrast" },
      ],
      translation: "نوشیدنِ یک لیکورِ پرالکل حدودِ ده دقیقه بعد توجه را بهتر می‌کند.",
      why: "غلط است (درس ۱۲). الکل هیچ‌وقت توجه را بهتر نمی‌کند (فصلِ ۲۲).",
      rule: CDS("186"),
      conceptStep: 2,
    },
  ],
  related: [],
};
