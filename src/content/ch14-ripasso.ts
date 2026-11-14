/**
 * src/content/ch14-ripasso.ts
 * Chapter 14 (Precedenza negli incroci): the chapter review. Twelve real bank
 * questions, two per lesson in lesson order, none shown inside a lesson; a
 * mistake routes back to the lesson section that teaches it
 * (tests/chapter14.test.ts).
 */
import type { Lesson } from "./lessons.js";

const NELL_INCROCIO = "Nell'incrocio rappresentato nella figura";
const NELL_INCROCIO_FA = "در تقاطعِ نشان‌داده‌شده در شکل";
const SECONDO_NELL = "Secondo le norme di precedenza nell'incrocio rappresentato in figura";
const SECONDO_NELL_FA = "طبق قواعد حق تقدم، در تقاطعِ نشان‌داده‌شده در شکل";
const NELLA_SITUAZIONE = "Nella situazione rappresentata in figura";
const NELLA_SITUAZIONE_FA = "در وضعیتِ نشان‌داده‌شده در شکل";
const CDS_145 = "Codice della Strada, art. 145 c.2";
const STALLO = "Codice della Strada, art. 145 c.1–2; art. 154 c.3 lett. b";

export const reviewIncroci: Lesson = {
  id: "ripasso-capitolo-14",
  titleFa: "مرور فصل ۱۴",
  titleIt: "RIPASSO · PRECEDENZA NEGLI INCROCI",
  minutes: 6,
  signs: [],
  review: true,
  steps: [
    {
      kind: "intro",
      title: "مرور فصل",
      objective:
        "دوازده سؤالِ واقعی از بانک، دو تا از هر درس. هیچ‌کدام را در درس‌ها ندیده‌ای، پس این مرور نشان می‌دهد چه چیزی واقعاً در ذهنت مانده است.",
      why: "تقریباً هر سؤالِ این فصل با چهار پرسش حل می‌شود: (۱) هر وسیله رو به کجا می‌راند و راستش کجاست؟ (۲) تابلو یا ریل هست؟ (۳) کسی به چپ می‌پیچد یا مسیرها اصلاً قطع نمی‌شوند؟ (۴) زنجیره بسته می‌شود؟ سؤالی که این‌جا اشتباه کنی به فهرستِ مرورت اضافه می‌شود و به بخشِ درسِ مربوطش وصل است.",
    },
    {
      kind: "table",
      title: "فصل ۱۴ در شش خط",
      body: "قبل از سؤال‌ها، نکته‌ی اصلیِ هر درس را یک بار دیگر ببین. اگر جایی برایت تازه بود، اول همان درس را دوباره باز کن.",
      columns: ["نکته‌ی اصلی"],
      rows: [
        { label: "درس ۱", it: "leggere la figura", values: ["هر حرف یک وسیله است. «راست» یعنی سمتِ دستِ راستِ همان راننده در جهتِ حرکتش، نه راستِ صفحه. تابلو مالِ بازویی است که جلویش نصب شده"] },
        { label: "درس ۲", it: "precedenza a destra · tram", values: ["بدون تابلو: اول کسی که راستش خالی است، بعد زنجیره. فقط وسیله‌ی روی ریل امتیاز دارد؛ اتوبوس، اتوبوس برقی، کامیون و وسیله‌ی بزرگ نه"] },
        { label: "درس ۳", it: "svoltare · contemporaneamente", values: ["کسی که به چپ می‌پیچد به روبه‌رو هم راه می‌دهد، نه به همه. گردشِ کوتاه به راست معمولاً با کسی تلاقی ندارد. مسیرهایی که قطع نمی‌شوند با هم می‌روند"] },
        { label: "درس ۴", it: "dare precedenza · stop", values: ["اول گروهِ بدون تابلو، بعد گروهِ با تابلو؛ درونِ هر گروه همان قاعده‌های درس ۲ و ۳. پشتِ تابلو به هر دو جهت راه بده"] },
        { label: "درس ۵", it: "incroci a più bracci", values: ["بازوی مورب قاعده را عوض نمی‌کند: راستِ هر راننده را از جهتِ خودش پیدا کن و فقط مسیرهایی را بشمار که مسیرش را قطع می‌کنند"] },
        { label: "درس ۶", it: "stallo", values: ["وقتی زنجیره بسته می‌شود، آن که به چپ می‌پیچد تا مرکز جلو می‌رود، می‌ایستد و آخر بیرون می‌رود. فقط در گره، و فقط او"] },
      ],
      takeaway: "در هر جمله بپرس: این وسیله به چه کسی راه می‌دهد و چرا؟ «حق تقدم داشتن» با «اول تمام کردن» یکی نیست.",
    },
  ],
  practice: [
    {
      sourceId: "4727",
      figure: 642,
      textIt: "Nella situazione rappresentata in figura il veicolo A nello svoltare a sinistra ha la destra libera",
      answer: 0,
      chunks: [
        { it: NELLA_SITUAZIONE, fa: NELLA_SITUAZIONE_FA },
        { it: "il veicolo A", fa: "وسیله‌ی A" },
        { it: "nello svoltare a sinistra", fa: "هنگامِ پیچیدن به چپ", focus: "condition" },
        { it: "ha la destra libera", fa: "راستش خالی است", verb: "ha ← avere" },
      ],
      translation: "در وضعیتِ نشان‌داده‌شده در شکل، وسیله‌ی A هنگامِ پیچیدن به چپ راستش خالی است.",
      why: "غلط است (درس ۱). A از چپِ تصویر می‌آید؛ پیش از پیچیدن کسی از پایین نمی‌آید، ولی هنگامِ پیچیدن به چپ، تراموا و M که از روبه‌رو می‌آیند از راستِ A وارد مسیرش می‌شوند (درس ۳). راستش در تمامِ پیچیدن خالی نیست.",
      rule: "Codice della Strada, art. 145 c.2; art. 154 c.3 lett. b",
      conceptStep: 1,
    },
    {
      sourceId: "4856",
      figure: 638,
      textIt: "Nell'incrocio rappresentato nella figura il conducente del veicolo B ha la destra libera, durante tutta la manovra di svolta",
      answer: 0,
      chunks: [
        { it: NELL_INCROCIO, fa: NELL_INCROCIO_FA },
        { it: "il conducente del veicolo B", fa: "راننده‌ی وسیله‌ی B" },
        { it: "ha la destra libera,", fa: "راستش خالی است،", verb: "ha ← avere" },
        { it: "durante tutta la manovra di svolta", fa: "در تمامِ مدتِ پیچیدن", focus: "always" },
      ],
      translation: "در تقاطعِ نشان‌داده‌شده در شکل، راستِ راننده‌ی وسیله‌ی B در تمامِ مدتِ پیچیدن خالی است.",
      why: "غلط است (درس ۱). B از بالا پایین می‌آید؛ راستش سمت چپِ تصویر است و آنجا خالی است. ولی B به چپ می‌پیچد و N از روبه‌رو مستقیم می‌آید؛ وسطِ پیچیدن، N از راستِ B می‌آید. «durante tutta» جمله را غلط می‌کند.",
      rule: "Codice della Strada, art. 145 c.2; art. 154 c.3 lett. b",
      conceptStep: 1,
    },
    {
      sourceId: "5033",
      figure: 614,
      textIt: "Nell'incrocio rappresentato nella figura il veicolo T deve attendere il transito dei veicoli R ed A",
      answer: 1,
      chunks: [
        { it: NELL_INCROCIO, fa: NELL_INCROCIO_FA },
        { it: "il veicolo T deve attendere", fa: "وسیله‌ی T باید منتظر بماند", verb: "deve ← dovere" },
        { it: "il transito dei veicoli R ed A", fa: "تا وسیله‌های R و A رد شوند" },
      ],
      translation: "در تقاطعِ نشان‌داده‌شده در شکل، وسیله‌ی T باید منتظر بماند تا وسیله‌های R و A رد شوند.",
      why: "درست است (درس ۲). همان شکلِ قدمِ اولِ درس ۲: R راستش خالی است و اول می‌رود، A منتظرِ R است، و T که به چپ می‌پیچد A را سمتِ راستش دارد. ترتیب: R، A، T.",
      rule: CDS_145,
      conceptStep: 1,
    },
    {
      sourceId: "4967",
      figure: 650,
      textIt: "Secondo le norme di precedenza nell'incrocio rappresentato in figura il veicolo R (filobus) ha la precedenza sugli altri veicoli",
      answer: 0,
      chunks: [
        { it: SECONDO_NELL, fa: SECONDO_NELL_FA },
        { it: "il veicolo R (filobus)", fa: "وسیله‌ی R (اتوبوس برقی)" },
        { it: "ha la precedenza", fa: "حق تقدم دارد", verb: "ha ← avere" },
        { it: "sugli altri veicoli", fa: "نسبت به وسیله‌های دیگر" },
      ],
      translation: "طبق قواعد حق تقدم، در تقاطعِ نشان‌داده‌شده در شکل، وسیله‌ی R (اتوبوس برقی) نسبت به وسیله‌های دیگر حق تقدم دارد.",
      why: "غلط است (درس ۲). اتوبوس برقی روی ریل نیست و امتیازی ندارد. L به راست می‌پیچد و اول است، بعد E، بعد کامیونِ N، و R که به چپ می‌پیچد و N را سمتِ راستش دارد آخر است: L، E، N، R.",
      rule: "Codice della Strada, art. 145 c.2–3",
      conceptStep: 2,
    },
    {
      sourceId: "5018",
      figure: 651,
      textIt: "Nell'incrocio rappresentato nella figura il conducente del veicolo D non ha l'obbligo di dare la precedenza ad alcun veicolo",
      answer: 1,
      chunks: [
        { it: NELL_INCROCIO, fa: NELL_INCROCIO_FA },
        { it: "il conducente del veicolo D", fa: "راننده‌ی وسیله‌ی D" },
        { it: "non ha l'obbligo", fa: "اجباری ندارد", focus: "negation", verb: "ha ← avere" },
        { it: "di dare la precedenza ad alcun veicolo", fa: "که به هیچ وسیله‌ای حق تقدم بدهد" },
      ],
      translation: "در تقاطعِ نشان‌داده‌شده در شکل، راننده‌ی وسیله‌ی D اجباری ندارد که به هیچ وسیله‌ای حق تقدم بدهد.",
      why: "درست است (درس ۳). D از چپ می‌آید؛ راستش پایینِ تصویر است و خالی است. D به چپ می‌پیچد، ولی تنها وسیله‌ی روبه‌رو، A، خودش هم به چپ می‌پیچد؛ دو پیچِ چپِ روبه‌رو به هم راه نمی‌دهند. ترتیب: D، E، S، A.",
      rule: "Codice della Strada, art. 145 c.2; art. 154 c.3 lett. b",
      conceptStep: 1,
    },
    {
      sourceId: "5101",
      figure: 660,
      textIt: "Nell'incrocio rappresentato in figura il veicolo D deve attendere che il veicolo B sia transitato",
      answer: 0,
      chunks: [
        { it: "Nell'incrocio rappresentato in figura", fa: NELL_INCROCIO_FA },
        { it: "il veicolo D deve attendere", fa: "وسیله‌ی D باید منتظر بماند", verb: "deve ← dovere" },
        { it: "che il veicolo B sia transitato", fa: "تا وسیله‌ی B رد شده باشد", verb: "sia transitato ← transitare" },
      ],
      translation: "در تقاطعِ نشان‌داده‌شده در شکل، وسیله‌ی D باید منتظر بماند تا وسیله‌ی B رد شده باشد.",
      why: "غلط است (درس ۳). B از چپ می‌آید و به چپ (بالا) می‌پیچد؛ D روبه‌رویش مستقیم می‌آید، پس B به D راه می‌دهد، نه برعکس. D فقط منتظرِ H است که به راست می‌پیچد و اول می‌رود. ترتیب: H، D، B.",
      rule: "Codice della Strada, art. 145 c.2; art. 154 c.3",
      conceptStep: 1,
    },
    {
      sourceId: "4920",
      figure: 654,
      textIt: "Nella situazione rappresentata in figura i veicoli transitano nell'ordine: C, R, A, H",
      answer: 1,
      chunks: [
        { it: NELLA_SITUAZIONE, fa: NELLA_SITUAZIONE_FA },
        { it: "i veicoli transitano", fa: "وسیله‌ها عبور می‌کنند", verb: "transitano ← transitare" },
        { it: "nell'ordine:", fa: "به این ترتیب:" },
        { it: "C, R, A, H", fa: "C، R، A، H" },
      ],
      translation: "در وضعیتِ نشان‌داده‌شده در شکل، وسیله‌ها به این ترتیب عبور می‌کنند: C، R، A، H.",
      why: "درست است (درس ۴). جلوی A و H تابلوی DARE PRECEDENZA است؛ C و R تابلو ندارند و اول می‌روند: C (راستش خالی)، بعد R که C را سمتِ راستش دارد. بعد گروهِ با تابلو: A، و آخر H که A را سمتِ راستش دارد.",
      rule: "Codice della Strada, art. 145 c.2, c.4",
      conceptStep: 2,
    },
    {
      sourceId: "4958",
      figure: 648,
      textIt: "Nell'incrocio rappresentato nella figura il conducente del veicolo P deve dare la precedenza solo al veicolo proveniente dalla sua destra",
      answer: 0,
      chunks: [
        { it: NELL_INCROCIO, fa: NELL_INCROCIO_FA },
        { it: "il conducente del veicolo P deve dare la precedenza", fa: "راننده‌ی وسیله‌ی P باید حق تقدم بدهد", verb: "deve ← dovere" },
        { it: "solo", fa: "فقط", focus: "limit" },
        { it: "al veicolo proveniente dalla sua destra", fa: "به وسیله‌ای که از راستش می‌آید", verb: "proveniente ← provenire" },
      ],
      translation: "در تقاطعِ نشان‌داده‌شده در شکل، راننده‌ی وسیله‌ی P باید فقط به وسیله‌ای که از راستش می‌آید حق تقدم بدهد.",
      why: "غلط است (درس ۴). جلوی P تابلوی DARE PRECEDENZA است: به هر دو جهتِ جاده‌ی بدون تابلو راه می‌دهد، هم به تراموای T از راست و هم به G از چپ. ترتیب: T، G، P، B.",
      rule: "Codice della Strada, art. 145 c.3–4; DPR 495/1992, art. 106 c.1",
      conceptStep: 2,
    },
    {
      sourceId: "4776",
      figure: 659,
      textIt: "Secondo le norme di precedenza nell'incrocio rappresentato in figura i veicoli passano nell'ordine: R, A, C",
      answer: 1,
      chunks: [
        { it: SECONDO_NELL, fa: SECONDO_NELL_FA },
        { it: "i veicoli passano", fa: "وسیله‌ها رد می‌شوند", verb: "passano ← passare" },
        { it: "nell'ordine:", fa: "به این ترتیب:" },
        { it: "R, A, C", fa: "R، A، C" },
      ],
      translation: "طبق قواعد حق تقدم، در تقاطعِ نشان‌داده‌شده در شکل، وسیله‌ها به این ترتیب رد می‌شوند: R، A، C.",
      why: "درست است (درس ۵). همان چیدمانِ قدمِ اولِ درس ۵: R راستِ خالی دارد، A از بازوی مورب پایین-راست R را سمتِ راستش دارد، و C از بازوی پایین-چپ هر دو را.",
      rule: CDS_145,
      conceptStep: 1,
    },
    {
      sourceId: "4881",
      figure: 669,
      textIt: "Dovendo attraversare l'incrocio rappresentato in figura i veicoli devono transitare nel seguente ordine: E, C, A, L, R",
      answer: 0,
      chunks: [
        { it: "Dovendo attraversare l'incrocio rappresentato in figura", fa: "وقتی باید از تقاطعِ شکل عبور کنند", verb: "dovendo ← dovere" },
        { it: "i veicoli devono transitare", fa: "وسیله‌ها باید عبور کنند", verb: "devono ← dovere" },
        { it: "nel seguente ordine:", fa: "به این ترتیب:" },
        { it: "E, C, A, L, R", fa: "E، C، A، L، R" },
      ],
      translation: "وقتی باید از تقاطعِ شکل عبور کنند، وسیله‌ها باید به این ترتیب عبور کنند: E، C، A، L، R.",
      why: "غلط است (درس ۵). E از راست رو به چپ می‌راند و R و L را در بازوهای بالا، سمتِ راستش، دارد؛ پس E آخر است، نه اول. C که به پایین-چپ می‌پیچد مسیرِ E را قطع نمی‌کند و اول است. ترتیب درست: C، A، L، R، E.",
      rule: CDS_145,
      conceptStep: 2,
    },
    {
      sourceId: "5003",
      figure: 617,
      textIt: "Nell'incrocio rappresentato nella figura il conducente del veicolo R deve dare la precedenza al veicolo A",
      answer: 0,
      chunks: [
        { it: NELL_INCROCIO, fa: NELL_INCROCIO_FA },
        { it: "il conducente del veicolo R", fa: "راننده‌ی وسیله‌ی R" },
        { it: "deve dare la precedenza al veicolo A", fa: "باید به وسیله‌ی A حق تقدم بدهد", verb: "deve ← dovere" },
      ],
      translation: "در تقاطعِ نشان‌داده‌شده در شکل، راننده‌ی وسیله‌ی R باید به وسیله‌ی A حق تقدم بدهد.",
      why: "غلط است (درس ۶). R رو به چپ می‌راند؛ A از پایین می‌آید، یعنی از چپِ R. برعکس است: A به R راه می‌دهد. R فقط به N راه می‌دهد، و چون N در مرکز می‌ایستد، R اول تمام می‌کند.",
      rule: STALLO,
      conceptStep: 1,
    },
    {
      sourceId: "4845",
      figure: 638,
      textIt: "Secondo le norme di precedenza nell'incrocio rappresentato in figura il veicolo B nell'impegnare l'incrocio deve fermarsi al centro di esso",
      answer: 1,
      chunks: [
        { it: SECONDO_NELL, fa: SECONDO_NELL_FA },
        { it: "il veicolo B", fa: "وسیله‌ی B" },
        { it: "nell'impegnare l'incrocio", fa: "هنگامِ ورود به تقاطع" },
        { it: "deve fermarsi al centro di esso", fa: "باید در مرکزِ آن بایستد", verb: "deve ← dovere" },
      ],
      translation: "طبق قواعد حق تقدم، در تقاطعِ نشان‌داده‌شده در شکل، وسیله‌ی B هنگامِ ورود به تقاطع باید در مرکزِ آن بایستد.",
      why: "درست است (درس ۶). گره است: R به B راه می‌دهد، B به N، و N و D به R. B که به چپ می‌پیچد تا مرکز می‌رود و می‌ایستد؛ R، بعد D و N با هم رد می‌شوند و B آخر پیچیدنش را تمام می‌کند.",
      rule: STALLO,
      conceptStep: 2,
    },
  ],
  related: [],
};
