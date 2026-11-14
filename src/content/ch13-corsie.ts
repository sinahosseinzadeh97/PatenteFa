/**
 * src/content/ch13-corsie.ts
 * Chapter 13 (Norme di circolazione), lesson 4: changing lane. The checks
 * before the move (ahead, behind, the line between the lanes, mirror then
 * indicator) and the bank's invented duties (horn, compulsory slowing,
 * "indicator optional when the road is clear"); then the wrong preselection
 * lane near a junction: follow its arrows, never stop, reverse or cut across.
 * Legal basis: CdS art. 154 c.1–2, c.5; art. 144 c.3; continuous lane lines
 * before junctions: DPR 495/1992 art. 147 (chapter 6, lesson 4).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter13.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_154 = "Codice della Strada, art. 154";
const CHI = "Chi intende cambiare corsia";
const CHI_FA = "کسی که می‌خواهد خطِ عبورش را عوض کند";
const QUANDO = "Quando si vuole cambiare corsia";
const QUANDO_FA = "وقتی می‌خواهی خطِ عبور را عوض کنی،";
const PRESEL = "Quando, giunti in prossimità di un incrocio, ci accorgiamo di aver sbagliato la corsia di preselezione";
const PRESEL_FA = "وقتی نزدیکِ تقاطع می‌فهمیم خطِ عبورِ انتخابِ جهت را اشتباه رفته‌ایم،";

export const lessonCambioCorsia: Lesson = {
  id: "norme-cambio-corsia",
  titleFa: "عوض کردنِ خطِ عبور",
  titleIt: "CAMBIO DI CORSIA · PRESELEZIONE",
  minutes: 5,
  signs: [],
  figures: [570],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی پیش از عوض کردنِ خطِ عبور چه چیزهایی را و به چه ترتیبی بررسی می‌کنی (جلو، پشت، خطِ میانِ دو خط عبور، آینه و بعد راهنما)، و اگر نزدیکِ تقاطع دیدی در خطِ عبورِ اشتباهی، چرا همان مسیرِ خطِ خودت را ادامه می‌دهی.",
      why:
        "۳۳ سؤال. بانک دو جور دام دارد: وظیفه‌های ساختگی («باید بوق بزنی»، «برای سبقت باید سرعت را کم کنی»، «وقتی جاده خالی است راهنما لازم نیست») و راه‌حل‌های غلط برای خطِ اشتباه («بایست»، «دنده‌عقب برو»، «همان پیچی را بزن که می‌خواستی»).",
      rule: `${CDS_154} c.1–2, c.5; Codice della Strada, art. 144 c.3`,
    },
    {
      kind: "table",
      title: "پیش از عوض کردنِ خط: چهار نگاه و یک علامت",
      body:
        "عوض کردنِ خط یک «مانور» است، مثلِ پیچیدن یا راه افتادن. ماده‌ی ۱۵۴ برای هر مانوری دو چیز می‌خواهد: مطمئن شوی که بی‌خطر است، و نیتت را از قبل نشان بدهی. ترتیبِ درست: آینه، راهنما، یک نگاهِ دیگر، بعد حرکتِ نرم. هر جمله‌ای که چیزی جز این اضافه کند، باید به آن شک کنی.",
      columns: ["چه کنی", "دامِ بانک"],
      rows: [
        {
          label: "جلو",
          it: "libera davanti per un tratto sufficiente",
          values: ["خطِ عبورِ مقصد باید به اندازه‌ی کافی جلوتر هم خالی باشد", "—"],
        },
        {
          label: "پشت",
          it: "libera dietro · non stiano arrivando altri veicoli",
          values: ["در آینه ببین کسی در خطِ مقصد نزدیک نمی‌شود؛ آینه را پیش از زدنِ راهنما نگاه کن", "«برای رفتن به خطِ راست دقتِ خاصی لازم نیست» غلط است: به راست هم همان بررسی‌ها"],
        },
        {
          label: "خطِ میانِ دو خط عبور",
          it: "striscia tratteggiata",
          values: ["باید خط‌چین باشد؛ از خطِ ممتد رد نمی‌شوی", "«باید مطمئن شوی خطِ میان ممتد است» برعکس است"],
        },
        {
          label: "اگر برای سبقت است",
          it: "non abbia segnalato l'inizio della stessa manovra",
          values: ["خودروی جلو خودش برای همان کار راهنما نزده باشد", "«برای سبقت باید سرعت را کم کنی» غلط است؛ فقط ترمزِ ناگهانی ممنوع است"],
        },
        {
          label: "علامت",
          it: "indicatore di direzione · in anticipo",
          values: ["چراغ راهنما، زودتر از حرکت و در تمامِ مدتِ آن؛ حتی وقتی جاده خالی است و حتی روی خط‌چین", "«با جاده‌ی خالی یا خط‌چین راهنما اختیاری است» و «باید بوق بزنی» هر دو غلط‌اند"],
        },
        {
          label: "در تمامِ مدت",
          it: "non creare intralcio o pericolo",
          values: ["برای کسی که در خطِ مقصد می‌آید خطر یا مزاحمت نساز", "«در شهر برای پیچیدن می‌شود روی خطِ میانِ دو خط راند» غلط است: در خطِ خودت بمان"],
        },
      ],
      takeaway:
        "آینه ← راهنما ← نگاهِ دوباره ← حرکت. جلو خالی، پشت خالی، خطِ میان خط‌چین. بوق و کم کردنِ اجباریِ سرعت جزوِ قاعده نیستند.",
      rule: `${CDS_154} c.1 lett. a–b, c.2, c.5; Codice della Strada, art. 144 c.2–3`,
    },
    {
      kind: "table",
      title: "خطِ عبورِ اشتباه، نزدیکِ تقاطع",
      body:
        "پیش از تقاطع، خط‌های میانِ خط‌های عبور ممتد می‌شوند و روی هر خط فلشِ جهت هست (فصل ۶، درسِ ۴). شکلِ ۵۷۰ همین را نشان می‌دهد: عقب‌تر خط‌چین، نزدیکِ تقاطع ممتد. اگر آن‌جا فهمیدی خطت اشتباه است، دیگر وقتِ درست کردنش نیست: هر کاری جز ادامه دادن، برای پشتِ سری‌ها خطر می‌سازد. بعد از تقاطع، از راهِ دیگری برگرد.",
      columns: ["چه کنی", "چرا"],
      rows: [
        {
          label: "پیش‌گیری",
          it: "spostarsi per tempo sulla corsia destinata",
          values: ["به‌موقع به خطی برو که به جهتِ تو می‌رود", "وقتی خط‌ها ممتد شدند دیگر نمی‌شود"],
        },
        {
          label: "ادامه بده",
          it: "seguire la direzione consentita dalla segnaletica",
          values: ["در جهتی برو که فلش‌ها و خط‌کشیِ خطِ خودت اجازه می‌دهند، با رعایتِ حق تقدم", "«همان پیچی را بزن که می‌خواستی، با راه دادن به همه» غلط است: از خطِ اشتباه پیچیدن یعنی بریدنِ مسیرِ دیگران"],
        },
        {
          label: "خط عوض نکن",
          it: "non effettuare cambiamenti di corsia",
          values: ["نه حالا، نه با رسیدن به چراغ", "«همیشه تا خطِ ایست می‌شود خط عوض کرد» و «پشتِ چراغ صبر کن تا اجازه‌ی عوض کردن بدهد» هر دو غلط‌اند"],
        },
        {
          label: "نایست",
          it: "non arrestarsi bruscamente",
          values: ["ترمزِ ناگهانی نکن، برای پرسیدنِ راه نایست، کنار نکش تا صفِ پشتی رد شود، از مأمور هم نپرس", "ایستادنِ ناگهانی یعنی زدنِ پشتی به تو و شلوغی"],
        },
        {
          label: "عقب نرو",
          it: "retrocedere",
          values: ["دنده‌عقب تا جایی که خط‌ها خط‌چین می‌شوند ممنوع و خطرناک است", "پشتت صف است"],
        },
        {
          label: "چراغِ خطر نه",
          it: "accensione simultanea di tutti gli indicatori",
          values: ["چراغِ خطر (چهار راهنما با هم) برای این وضع نیست", "اشتباهِ خط «خطر» نیست؛ فقط ادامه بده"],
        },
      ],
      takeaway:
        "خطِ اشتباه = راهِ اشتباه، نه مانورِ اشتباه. همان جهتی را برو که خطت نشان می‌دهد و بعد از تقاطع برگرد.",
      rule: `${CDS_154} c.1, c.5; DPR 495/1992 art. 147 c.2, c.4`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "cambiare corsia", fa: "خطِ عبور را عوض کردن", base: "cambiare" },
        { it: "la corsia di preselezione", fa: "خطِ عبورِ انتخابِ جهت", note: "خطی پیش از تقاطع که فلشش می‌گوید از آن به کدام جهت می‌روی." },
        { it: "la striscia tratteggiata (discontinua)", fa: "خط‌چین", note: "می‌شود از آن رد شد." },
        { it: "la striscia continua", fa: "خطِ ممتد", note: "نباید از آن رد شد." },
        { it: "l'indicatore di direzione", fa: "چراغ راهنما" },
        { it: "lo specchietto retrovisore", fa: "آینه" },
        { it: "in anticipo", fa: "از قبل، زودتر از حرکت" },
        { it: "retrocedere", fa: "عقب رفتن", base: "retrocedere" },
        { it: "intralciare", fa: "مزاحمِ کسی شدن، راهش را بند آوردن", base: "intralciare" },
      ],
    },
    {
      kind: "trap",
      title: "خطِ میان: خط‌چین یا ممتد؟",
      body: "هر دو جمله درباره‌ی خطِ میانِ دو خط عبور است و فقط یک کلمه فرق دارند:",
      examples: [
        {
          sourceId: "4521",
          textIt: "Quando si vuole cambiare corsia si deve controllare che la striscia che divide le corsie sia tratteggiata",
          answer: 1,
          chunks: [
            { it: QUANDO, fa: QUANDO_FA },
            { it: "si deve controllare", fa: "باید بررسی کرد", verb: "si deve ← dovere" },
            { it: "che la striscia che divide le corsie", fa: "که خطی که خط‌های عبور را جدا می‌کند", verb: "divide ← dividere" },
            { it: "sia tratteggiata", fa: "خط‌چین باشد", verb: "sia ← essere", focus: "condition" },
          ],
          translation: "وقتی می‌خواهی خطِ عبور را عوض کنی، باید بررسی کنی که خطی که خط‌های عبور را جدا می‌کند خط‌چین باشد.",
          why: "درست است. از خط‌چین می‌شود رد شد؛ از خطِ ممتد نه.",
        },
        {
          sourceId: "4482",
          textIt: "Prima di cambiare corsia è necessario accertare che le corsie siano separate da una striscia continua",
          answer: 0,
          chunks: [
            { it: "Prima di cambiare corsia", fa: "پیش از عوض کردنِ خطِ عبور" },
            { it: "è necessario accertare", fa: "لازم است مطمئن شوی", verb: "è ← essere" },
            { it: "che le corsie siano separate", fa: "که خط‌های عبور جدا شده باشند", verb: "siano separate ← separare" },
            { it: "da una striscia continua", fa: "با یک خطِ ممتد", focus: "contrast" },
          ],
          translation: "پیش از عوض کردنِ خطِ عبور لازم است مطمئن شوی که خط‌های عبور با یک خطِ ممتد از هم جدا شده‌اند.",
          why: "غلط است. برعکس: خطِ ممتد یعنی نمی‌توانی از آن رد شوی و خطت را عوض کنی.",
        },
      ],
      takeaway: "در جمله‌ای درباره‌ی عوض کردنِ خط، «tratteggiata» یعنی اجازه، «continua» یعنی ممنوع.",
      rule: "DPR 495/1992 art. 147 c.2",
    },
  ],
  practice: [
    {
      sourceId: "4390",
      textIt: "L'uso corretto della strada comporta che si guardino gli specchi retrovisori prima di azionare l'indicatore di direzione per cambiare corsia",
      answer: 1,
      chunks: [
        { it: "L'uso corretto della strada comporta", fa: "استفاده‌ی درست از راه یعنی", verb: "comporta ← comportare" },
        { it: "che si guardino gli specchi retrovisori", fa: "که آینه‌ها را نگاه کنی", verb: "si guardino ← guardare" },
        { it: "prima di azionare l'indicatore di direzione", fa: "پیش از زدنِ چراغ راهنما", focus: "condition" },
        { it: "per cambiare corsia", fa: "برای عوض کردنِ خطِ عبور" },
      ],
      translation: "استفاده‌ی درست از راه یعنی پیش از زدنِ چراغ راهنما برای عوض کردنِ خطِ عبور، آینه‌ها را نگاه کنی.",
      why: "درست است (قدم ۱). اول آینه، بعد راهنما: اگر کسی در خطِ مقصد نزدیک می‌شود، اصلاً راهنما نمی‌زنی و صبر می‌کنی.",
      rule: `${CDS_154} c.1 lett. a`,
      conceptStep: 1,
    },
    {
      sourceId: "4480",
      textIt: "Chi intende cambiare corsia non deve azionare l'indicatore di direzione se la strada è libera",
      answer: 0,
      chunks: [
        { it: CHI, fa: CHI_FA, verb: "intende ← intendere" },
        { it: "non deve azionare l'indicatore di direzione", fa: "نباید چراغ راهنما را بزند", verb: "deve ← dovere", focus: "negation" },
        { it: "se la strada è libera", fa: "اگر جاده خالی باشد", focus: "condition" },
      ],
      translation: "کسی که می‌خواهد خطِ عبورش را عوض کند، اگر جاده خالی باشد نباید چراغ راهنما را بزند.",
      why: "غلط است (قدم ۱). راهنما همیشه لازم است، با جاده‌ی خالی هم. ممکن است کسی را که در آینه ندیده‌ای، او تو را ببیند.",
      rule: `${CDS_154} c.1 lett. b, c.2`,
      conceptStep: 1,
    },
    {
      sourceId: "4397",
      textIt:
        "Quando, giunti in prossimità di un incrocio, ci accorgiamo di aver sbagliato la corsia di preselezione non dobbiamo effettuare cambiamenti di corsia, anche per non intralciare i veicoli che seguono",
      answer: 1,
      chunks: [
        { it: PRESEL, fa: PRESEL_FA, verb: "ci accorgiamo ← accorgersi" },
        { it: "non dobbiamo effettuare cambiamenti di corsia,", fa: "نباید خطِ عبور را عوض کنیم،", verb: "dobbiamo ← dovere", focus: "negation" },
        { it: "anche per non intralciare i veicoli che seguono", fa: "از جمله برای این‌که مزاحمِ خودروهای پشتی نشویم", focus: "reason", verb: "seguono ← seguire" },
      ],
      translation: "وقتی نزدیکِ تقاطع می‌فهمیم خطِ عبورِ انتخابِ جهت را اشتباه رفته‌ایم، نباید خطِ عبور را عوض کنیم، از جمله برای این‌که مزاحمِ خودروهای پشتی نشویم.",
      why: "درست است (قدم ۲). آن‌جا خط‌ها معمولاً ممتدند و پشتت صف است؛ در همان خط ادامه بده و بعد از تقاطع برگرد.",
      rule: `${CDS_154} c.1; DPR 495/1992 art. 147 c.2`,
      conceptStep: 2,
    },
    {
      sourceId: "4407",
      textIt:
        "Quando, giunti in prossimità di un incrocio, ci accorgiamo di aver sbagliato la corsia di preselezione cerchiamo di retrocedere, con prudenza, fino al punto in cui cessano le strisce continue di corsia",
      answer: 0,
      chunks: [
        { it: PRESEL, fa: PRESEL_FA, verb: "ci accorgiamo ← accorgersi" },
        { it: "cerchiamo di retrocedere, con prudenza,", fa: "سعی می‌کنیم با احتیاط عقب برویم،", verb: "cerchiamo ← cercare" },
        { it: "fino al punto in cui cessano le strisce continue di corsia", fa: "تا جایی که خط‌های ممتدِ میانِ خط‌ها تمام می‌شوند", verb: "cessano ← cessare" },
      ],
      translation: "وقتی نزدیکِ تقاطع می‌فهمیم خطِ عبورِ انتخابِ جهت را اشتباه رفته‌ایم، سعی می‌کنیم با احتیاط عقب برویم تا جایی که خط‌های ممتدِ میانِ خط‌ها تمام می‌شوند.",
      why: "غلط است (قدم ۲). «با احتیاط» دام است: پشتت خودروها می‌آیند و دنده‌عقب در صف خطرِ تصادف می‌سازد. در همان خط ادامه بده.",
      rule: `${CDS_154} c.1`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // the checks and the signal before a lane change; 4363 and 4390 (mirror before the indicator) come from other bank groups
      sourceIds: [
        "4475", "4476", "4477", "4478", "4479", "4480", "4481", "4482",
        "4518", "4519", "4520", "4521", "4522", "4523", "4524", "4525", "4526", "4528",
        "4363", "4390",
      ],
    },
    {
      step: 2,
      // the wrong preselection lane; 4527 (fig 570) and 4571 (choose the lane in time)
      sourceIds: ["4396", "4397", "4398", "4399", "4400", "4403", "4404", "4405", "4406", "4407", "4408", "4527", "4571"],
    },
  ],
};
