/**
 * src/content/ch15-ripasso.ts
 * Chapter 15 (Sorpasso): the chapter review. Fourteen real bank questions,
 * two per lesson in lesson order, none shown inside a lesson; a mistake routes
 * back to the lesson section that teaches it (tests/chapter15.test.ts).
 */
import type { Lesson } from "./lessons.js";

const CDS_148 = "Codice della Strada, art. 148";
const INTENDE = "Il conducente che intende sorpassare";
const INTENDE_FA = "راننده‌ای که می‌خواهد سبقت بگیرد";
const DA_SORPASSARE = "Il conducente del veicolo da sorpassare ha l'obbligo di";
const DA_SORPASSARE_FA = "رانندهٔ وسیله‌ای که از آن سبقت می‌گیرند موظف است";

export const reviewSorpasso: Lesson = {
  id: "ripasso-capitolo-15",
  titleFa: "مرور فصل ۱۵",
  titleIt: "RIPASSO · SORPASSO",
  minutes: 6,
  signs: [],
  review: true,
  steps: [
    {
      kind: "intro",
      title: "مرور فصل",
      objective:
        "چهارده سؤالِ واقعی از بانک، دو تا از هر درس. هیچ‌کدام را در درس‌ها ندیده‌ای، پس این مرور نشان می‌دهد چه چیزی واقعاً در ذهنت مانده است.",
      why: "تقریباً هر سؤالِ این فصل یکی از سه چیز را می‌پرسد: «پیش از سبقت چه چیزی را باید سنجید؟»، «این‌جا قانون سبقت را ممنوع کرده، و کدام استثنا بازش می‌کند؟» و «از کدام طرف؟». سؤالی که این‌جا اشتباه کنی به فهرستِ مرورت اضافه می‌شود و به بخشِ درسِ مربوطش وصل است.",
    },
    {
      kind: "table",
      title: "فصل ۱۵ در هفت خط",
      body: "قبل از سؤال‌ها، نکته‌ی اصلیِ هر درس را یک بار دیگر ببین. اگر جایی برایت تازه بود، اول همان درس را دوباره باز کن.",
      columns: ["نکته‌ی اصلی"],
      rows: [
        { label: "درس ۱", it: "DIVIETO DI SORPASSO", values: ["پیش از سبقت ببین تابلویی ممنوعش نکرده. تابلو سبقت از وسیله‌های موتوری را منع می‌کند، جز موتورسیکلت و موتور گازی؛ با خط‌چین یا بی‌آن"] },
        { label: "درس ۲", it: "visibilità · spazio · traffico", values: ["دید، رانندهٔ جلویی، پشتِ سر، فضای جلو؛ همه با هم. فضای لازم با طول و با فرقِ کمِ سرعت بیشتر می‌شود. پیچ و قله و دیدِ کم در جاده‌ی دوطرفه: ممنوع"] },
        { label: "درس ۳", it: "le fasi", values: ["بررسی، راهنما، عبورِ سریع در حدِ مجاز با فاصله‌ی جانبی، آینه، برگشتن هر وقت ممکن شد. رانندهٔ جلو شتاب نمی‌گیرد و راست می‌ماند"] },
        { label: "درس ۴", it: "a destra · tram", values: ["همیشه چپ. راست وقتی جلویی به چپ می‌پیچد (یا در یک‌طرفه چپ می‌ایستد) و شروع کرده، یا تراموا روی ریل است. تراموای ایستاده بی‌سکو: از راست نه"] },
        { label: "درس ۵", it: "intersezioni · passaggi a livello", values: ["تقاطع ممنوع، مگر پیچیدنِ جلویی به چپ، جاده‌ی با حق تقدمِ جداشده، دوچرخه، یا چراغ و مأمور. راه‌آهنِ بی‌راه‌بند فقط با چراغ. عابر و خطِ شتاب: هرگز"] },
        { label: "درس ۶", it: "falsi divieti", values: ["اتوبوس، پلیسِ بی‌آژیر، راهنمای راست، شب، پارکینگ: ممنوع نیست. آژیر روشن: راه باز کن و دنبالش نرو"] },
        { label: "درس ۷", it: "autostrada", values: ["همان قاعده‌ها در سرعتِ بالا: آینه، فاصله، راهنماهای جلو، زیاد در خطِ سبقت نمان، باد. «۱۰۰ متر» عددِ ساختگی است"] },
      ],
      takeaway: "در هر جمله بپرس: درباره‌ی بررسی‌هاست، جای ممنوع، یا سمتِ سبقت؟ اگر «مجاز است»، کدام استثنا؟ اگر «ممنوع است»، قانون واقعاً نامش را برده؟",
    },
  ],
  practice: [
    {
      sourceId: "5145",
      textIt: "Il conducente che intende sorpassare deve accertarsi che nessun segnale verticale vieti la manovra",
      answer: 1,
      chunks: [
        { it: INTENDE, fa: INTENDE_FA, verb: "intende ← intendere" },
        { it: "deve accertarsi", fa: "باید مطمئن شود", verb: "deve ← dovere" },
        { it: "che nessun segnale verticale vieti la manovra", fa: "که هیچ تابلویی این کار را ممنوع نکند", focus: "negation", verb: "vieti ← vietare" },
      ],
      translation: "راننده‌ای که می‌خواهد سبقت بگیرد باید مطمئن شود که هیچ تابلویی این کار را ممنوع نکند.",
      why: "درست است (درس ۱). تابلو یکی از بررسی‌هاست. یادت باشد: «فقط تابلو» کافی نیست، ولی تابلو هم باید اجازه بدهد.",
      rule: `${CDS_148} c.2; DPR 495/1992, art. 116`,
      conceptStep: 1,
    },
    {
      sourceId: "5199",
      textIt: "E' obbligatorio accertarsi prima di effettuare il sorpasso che non vi siano segnali che lo vietino",
      answer: 1,
      chunks: [
        { it: "E' obbligatorio accertarsi", fa: "اجباری است مطمئن شوی", verb: "E' ← essere" },
        { it: "prima di effettuare il sorpasso", fa: "پیش از سبقت" },
        { it: "che non vi siano segnali che lo vietino", fa: "که تابلویی نباشد که ممنوعش کند", focus: "negation", verb: "vietino ← vietare" },
      ],
      translation: "اجباری است پیش از سبقت مطمئن شوی که تابلویی نباشد که آن را ممنوع کند.",
      why: "درست است (درس ۱). همان بررسی، با کلماتِ دیگر.",
      rule: `${CDS_148} c.2; DPR 495/1992, art. 116`,
      conceptStep: 1,
    },
    {
      sourceId: "5141",
      textIt: "Il conducente che intende sorpassare deve valutare lo spazio necessario per la manovra anche in relazione alla differenza di velocità tra il proprio veicolo e quello da sorpassare",
      answer: 1,
      chunks: [
        { it: INTENDE, fa: INTENDE_FA, verb: "intende ← intendere" },
        { it: "deve valutare lo spazio necessario per la manovra", fa: "باید فضای لازم برای سبقت را بسنجد", verb: "deve ← dovere" },
        { it: "anche in relazione alla differenza di velocità", fa: "با توجه به فرقِ سرعت هم" },
        { it: "tra il proprio veicolo e quello da sorpassare", fa: "بینِ وسیله‌ی خودش و وسیله‌ای که از آن سبقت می‌گیرد" },
      ],
      translation: "راننده‌ای که می‌خواهد سبقت بگیرد باید فضای لازم برای سبقت را با توجه به فرقِ سرعتِ وسیله‌ی خودش و وسیله‌ای که از آن سبقت می‌گیرد هم بسنجد.",
      why: "درست است (درس ۲). فرقِ سرعتِ کم یعنی مدتِ بیشتری کنارِ او و در سمتِ مقابلی، پس فضای بیشتری لازم است.",
      rule: `${CDS_148} c.2`,
      conceptStep: 1,
    },
    {
      sourceId: "5204",
      textIt: "Il sorpasso è consentito in caso di scarsa visibilità purché si lampeggi durante la manovra",
      answer: 0,
      chunks: [
        { it: "Il sorpasso è consentito", fa: "سبقت مجاز است", verb: "è consentito ← consentire" },
        { it: "in caso di scarsa visibilità", fa: "در دیدِ کم", focus: "condition" },
        { it: "purché si lampeggi durante la manovra", fa: "به شرطی که حینِ سبقت چراغ بزنی", focus: "condition", verb: "si lampeggi ← lampeggiare" },
      ],
      translation: "در دیدِ کم سبقت مجاز است، به شرطی که حینِ سبقت چراغ بزنی.",
      why: "غلط است (درس ۲). دیدِ کم یکی از جاهای ممنوع است. چراغ زدن کمک می‌کند دیگران تو را ببینند، ولی تو را قادر نمی‌کند جاده را ببینی.",
      rule: `${CDS_148} c.10`,
      conceptStep: 2,
    },
    {
      sourceId: "5256",
      textIt: "Nella fase di sorpasso, il conducente è tenuto a mantenere una velocità almeno doppia di quella del veicolo sorpassato",
      answer: 0,
      chunks: [
        { it: "Nella fase di sorpasso,", fa: "هنگامِ سبقت،" },
        { it: "il conducente è tenuto a mantenere", fa: "راننده موظف است نگه دارد", verb: "è tenuto ← tenere" },
        { it: "una velocità almeno doppia", fa: "سرعتی دست‌کم دو برابر", focus: "limit" },
        { it: "di quella del veicolo sorpassato", fa: "سرعتِ وسیله‌ای که از آن سبقت می‌گیرد" },
      ],
      translation: "هنگامِ سبقت، راننده موظف است سرعتی دست‌کم دو برابرِ سرعتِ وسیله‌ای که از آن سبقت می‌گیرد نگه دارد.",
      why: "غلط است (درس ۳). قانون نسبتی نمی‌دهد: سریع رد شو، ولی در حدِ مجاز. دو برابرِ ۷۰ یعنی ۱۴۰.",
      rule: `${CDS_148} c.3; Codice della Strada, art. 142`,
      conceptStep: 1,
    },
    {
      sourceId: "5269",
      textIt: "Il conducente del veicolo da sorpassare ha l'obbligo di tenersi il più possibile vicino al margine destro su strade ad unica corsia per senso di marcia",
      answer: 1,
      chunks: [
        { it: DA_SORPASSARE, fa: DA_SORPASSARE_FA },
        { it: "tenersi il più possibile vicino al margine destro", fa: "تا جای ممکن نزدیکِ لبه‌ی راست بماند", verb: "tenersi ← tenere" },
        { it: "su strade ad unica corsia per senso di marcia", fa: "در جاده‌هایی که در هر جهت یک خطِ عبور دارند", focus: "condition" },
      ],
      translation: "رانندهٔ وسیله‌ای که از آن سبقت می‌گیرند موظف است در جاده‌هایی که در هر جهت یک خطِ عبور دارند تا جای ممکن نزدیکِ لبه‌ی راست بماند.",
      why: "درست است (درس ۳). وظیفه‌ی رانندهٔ دوم: کمک کند، شتاب نگیرد، راست بماند.",
      rule: `${CDS_148} c.4`,
      conceptStep: 2,
    },
    {
      sourceId: "5167",
      textIt: "Se il tram o il filobus sono fermi la manovra di sorpasso non può effettuarsi a destra se manca il salvagente",
      answer: 1,
      chunks: [
        { it: "Se il tram o il filobus sono fermi", fa: "اگر تراموا یا اتوبوس برقی ایستاده باشند", focus: "condition", verb: "sono ← essere" },
        { it: "la manovra di sorpasso", fa: "سبقت" },
        { it: "non può effettuarsi a destra", fa: "نمی‌تواند از راست انجام شود", focus: "negation", verb: "può ← potere" },
        { it: "se manca il salvagente", fa: "اگر سکوی پناه عابر نباشد", focus: "condition", verb: "manca ← mancare" },
      ],
      translation: "اگر تراموا یا اتوبوس برقی ایستاده باشند و سکوی پناه عابر نباشد، سبقت نمی‌تواند از راست انجام شود.",
      why: "درست است (درس ۴). بی‌سکو، مسافرها از وسطِ جاده رد می‌شوند؛ سبقت از راست ممنوع است.",
      rule: `${CDS_148} c.9`,
      conceptStep: 1,
    },
    {
      sourceId: "5221",
      textIt: "E' consentito il sorpasso a destra dei motocicli se vi è spazio sufficiente",
      answer: 0,
      chunks: [
        { it: "E' consentito il sorpasso a destra", fa: "سبقت از راست مجاز است", verb: "E' consentito ← consentire" },
        { it: "dei motocicli", fa: "از موتورسیکلت‌ها" },
        { it: "se vi è spazio sufficiente", fa: "اگر جای کافی باشد", focus: "condition", verb: "vi è ← esserci" },
      ],
      translation: "اگر جای کافی باشد، سبقت از راستِ موتورسیکلت‌ها مجاز است.",
      why: "غلط است (درس ۴). موتورسیکلت هم مثلِ هر وسیله‌ی دیگر از چپ سبقت گرفته می‌شود. «جا هست» یکی از استثناها نیست.",
      rule: `${CDS_148} c.3`,
      conceptStep: 3,
    },
    {
      sourceId: "5187",
      textIt: "E' consentito il sorpasso nelle intersezioni regolate da agenti del traffico",
      answer: 1,
      chunks: [
        { it: "E' consentito il sorpasso", fa: "سبقت مجاز است", verb: "E' consentito ← consentire" },
        { it: "nelle intersezioni regolate da agenti del traffico", fa: "در تقاطع‌هایی که مأمورِ راهنمایی اداره‌شان می‌کند", focus: "condition" },
      ],
      translation: "در تقاطع‌هایی که مأمورِ راهنمایی اداره‌شان می‌کند، سبقت مجاز است.",
      why: "درست است (درس ۵). استثنای «د»: چراغ یا مأمور.",
      rule: `${CDS_148} c.12 lett. d`,
      conceptStep: 1,
    },
    {
      sourceId: "5191",
      textIt: "E' vietato sorpassare sulle corsie di accelerazione o di decelerazione",
      answer: 1,
      chunks: [
        { it: "E' vietato sorpassare", fa: "سبقت گرفتن ممنوع است", verb: "E' ← essere" },
        { it: "sulle corsie di accelerazione o di decelerazione", fa: "در خط‌های شتاب یا کاهشِ سرعت" },
      ],
      translation: "در خط‌های شتاب یا کاهشِ سرعت سبقت گرفتن ممنوع است.",
      why: "درست است (درس ۵). این خط‌ها فقط برای ورود و خروج‌اند؛ آیین‌نامه سبقت را در آن‌ها ممنوع کرده است.",
      rule: "DPR 495/1992, art. 347 c.1",
      conceptStep: 2,
    },
    {
      sourceId: "5213",
      textIt: "E' vietato il sorpasso di veicoli della polizia",
      answer: 0,
      chunks: [
        { it: "E' vietato il sorpasso", fa: "سبقت ممنوع است", verb: "E' ← essere" },
        { it: "di veicoli della polizia", fa: "از خودروهای پلیس" },
      ],
      translation: "سبقت از خودروهای پلیس ممنوع است.",
      why: "غلط است (درس ۶). پلیس در فهرستِ ممنوعیت‌ها نیست. فقط وقتی آژیر و چراغ گردانِ آبی روشن است راه را باز می‌کنی.",
      rule: `${CDS_148} c.10–13; Codice della Strada, art. 177 c.3`,
      conceptStep: 1,
    },
    {
      sourceId: "5280",
      textIt: "Sulle autostrade a tre corsie per senso di marcia è consentito sorpassare un'auto della polizia, anche se in servizio di emergenza",
      answer: 0,
      chunks: [
        { it: "Sulle autostrade a tre corsie per senso di marcia", fa: "در آزادراه‌هایی که در هر جهت سه خطِ عبور دارند" },
        { it: "è consentito sorpassare un'auto della polizia,", fa: "سبقت از خودروی پلیس مجاز است،", verb: "è consentito ← consentire" },
        { it: "anche se in servizio di emergenza", fa: "حتی اگر در مأموریتِ اضطراری باشد", focus: "condition" },
      ],
      translation: "در آزادراه‌هایی که در هر جهت سه خطِ عبور دارند، سبقت از خودروی پلیس مجاز است، حتی اگر در مأموریتِ اضطراری باشد.",
      why: "غلط است (درس ۶). با آژیر، وظیفه‌ات باز کردنِ راه است؛ تعدادِ خط‌ها این را عوض نمی‌کند.",
      rule: "Codice della Strada, art. 177 c.3",
      conceptStep: 2,
    },
    {
      sourceId: "5286",
      textIt: "Durante un sorpasso in autostrada, può essere causa di incidente l'improvviso spostamento sulla corsia di sorpasso di uno dei veicoli che precedono",
      answer: 1,
      chunks: [
        { it: "Durante un sorpasso in autostrada,", fa: "هنگامِ سبقت در آزادراه،" },
        { it: "può essere causa di incidente", fa: "می‌تواند علتِ تصادف باشد", verb: "può ← potere" },
        { it: "l'improvviso spostamento sulla corsia di sorpasso", fa: "آمدنِ ناگهانی به خطِ سبقت" },
        { it: "di uno dei veicoli che precedono", fa: "از سوی یکی از خودروهای جلو", verb: "precedono ← precedere" },
      ],
      translation: "هنگامِ سبقت در آزادراه، آمدنِ ناگهانیِ یکی از خودروهای جلو به خطِ سبقت می‌تواند علتِ تصادف باشد.",
      why: "درست است (درس ۷). برای همین فاصله نگه می‌داری و به راهنماهای جلو نگاه می‌کنی.",
      rule: `${CDS_148} c.2`,
      conceptStep: 1,
    },
    {
      sourceId: "5289",
      textIt: "Il sorpasso in autostrada può essere motivo di incidente, se il forte vento laterale compromette la stabilità dei veicoli",
      answer: 1,
      chunks: [
        { it: "Il sorpasso in autostrada può essere motivo di incidente,", fa: "سبقت در آزادراه می‌تواند علتِ تصادف باشد،", verb: "può ← potere" },
        { it: "se il forte vento laterale", fa: "اگر بادِ پهلوی شدید", focus: "condition" },
        { it: "compromette la stabilità dei veicoli", fa: "پایداریِ وسیله‌ها را به خطر بیندازد", verb: "compromette ← compromettere" },
      ],
      translation: "سبقت در آزادراه می‌تواند علتِ تصادف باشد، اگر بادِ پهلوی شدید پایداریِ وسیله‌ها را به خطر بیندازد.",
      why: "درست است (درس ۷). کنارِ کامیون باد قطع می‌شود و بعد دوباره می‌زند؛ هر دو وسیله ممکن است تکان بخورند.",
      rule: `${CDS_148} c.2`,
      conceptStep: 1,
    },
  ],
  related: [],
};
