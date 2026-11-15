/**
 * src/content/ch20-validita.ts
 * Chapter 20 (Patente, punti e documenti), lesson 6: the licence card and how
 * long it lasts.
 *  step 1 a made-up EU licence card (original drawing `patente` in
 *         public/js/road.js, no real person): issue and expiry dates, categories,
 *         codes. Renewal (conferma) needs only a medical check by an authorised
 *         doctor; the ministry then confirms it. No driving test, no Prefetto,
 *         one check for every category, no days of grace after expiry.
 *  step 2 durations (art. 126 c.2, c.5–6): AM–BE 10 years under 50, 5 from 50,
 *         3 from 70, 2 from 80; special licence (B speciale) 5 years, 3 from 70.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter20.test.ts.
 */
import type { Lesson } from "./lessons.js";

const ART_126 = "Codice della Strada, art. 126";

export const lessonValidita: Lesson = {
  id: "patente-validita-conferma",
  titleFa: "کارتِ گواهینامه، اعتبار و تمدید",
  titleIt: "VALIDITÀ E CONFERMA DELLA PATENTE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس روی کارتِ گواهینامه تاریخِ انقضا، ردیف‌ها و کدها را پیدا می‌کنی، می‌دانی تمدید فقط با معاینه‌ی پزشکی است، و مدتِ اعتبارِ B را در هر سنی بلدی: ۱۰، ۵، ۳، ۲ سال.",
      why:
        "۲۰ سؤال. دو دام: «چیزهای اضافه برای تمدید» (آزمونِ رانندگیِ دوره‌ای، شرایطِ اخلاقی پیشِ فرماندار، دو معاینه برای دو ردیف، چند روز مهلت بعد از انقضا) و «عددِ اشتباه» (۸ به جای ۵، ۵ به جای ۱۰، «۱۰ سال در هر حال»).",
      rule: `${ART_126} c.1–2, c.8, c.11`,
    },
    {
      kind: "anatomy",
      title: "کارتِ گواهینامه: کجا چه نوشته",
      scene: "patente",
      body:
        "این یک کارتِ ساختگی است، با نامِ «ESEMPIO»؛ مالِ هیچ‌کس نیست. روی هر خانه بزن. تمدید (conferma) فقط به یک چیز بستگی دارد: این‌که هنوز شرایطِ جسمی و روانیِ رانندگی را داری. پزشکِ مجاز معاینه‌ات می‌کند و وزارتِ زیرساخت و حمل‌ونقل تمدید را ثبت می‌کند و کارتِ تازه را می‌فرستد. یک معاینه برای همه‌ی ردیف‌های A و B کافی است.",
      parts: [
        { id: "foto", nameIt: "fotografia", nameFa: "عکس", text: "عکسِ دارنده. کارتِ تمدیدشده عکسِ تازه دارد." },
        { id: "dati", nameIt: "1. cognome · 2. nome", nameFa: "نام و نامِ خانوادگی", text: "این‌جا ساختگی است. روی کارتِ واقعی هیچ‌وقت عکس یا اطلاعاتِ گواهینامه‌ات را برای غریبه‌ها نفرست." },
        { id: "rilascio", nameIt: "4a. data di rilascio", nameFa: "تاریخِ صدور", text: "روزی که این کارت صادر شده. سه سالِ «تازه‌کار» و دو برابر شدنِ امتیازها (درس ۷) از اولین گواهینامه‌ی B حساب می‌شود." },
        { id: "scadenza", nameIt: "4b. data di scadenza", nameFa: "تاریخِ انقضا", text: "بعد از این روز گواهینامه معتبر نیست؛ حتی یک روز مهلت ندارد. رانندگی با گواهینامه‌ی منقضی جریمه دارد و پلیس گواهینامه را می‌گیرد (درس ۹)." },
        { id: "categorie", nameIt: "9. categorie", nameFa: "ردیف‌ها", text: "ردیف‌هایی که داری، مثلاً AM و B. برای تمدید همه با هم یک معاینه کافی است." },
        { id: "codici", nameIt: "12. codici", nameFa: "کدها", text: "کدهای هماهنگِ اروپایی: مثلاً ۰۱ یعنی باید عینک یا لنز بزنی، ۹۶ یعنی یدکِ سنگین‌تر (درس ۵). محدودیتی که این‌جا آمده می‌تواند مدتِ اعتبار را هم کوتاه کند." },
      ],
      takeaway: "تمدید = معاینه‌ی پزشکی، نه آزمونِ رانندگی و نه فرماندار. بعد از تاریخِ 4b، رانندگی نه.",
      rule: `${ART_126} c.1, c.8, c.11; Direttiva 2006/126/CE, allegato I (modello comunitario)`,
    },
    {
      kind: "table",
      title: "چند سال اعتبار دارد",
      body:
        "عدد به سنِ تو در روزِ صدور یا تمدید بستگی دارد. ردیف‌های AM، A1، A2، A، B1، B و BE همه یک قاعده دارند. جمله‌های بانک همه با «salvo diversa limitazione … o salvo allineamento alla data del compleanno» شروع می‌شوند: یعنی «مگر این‌که روی خودِ کارت مدتِ کوتاه‌تری آمده باشد، یا تاریخ با روزِ تولدت میزان شده باشد». این بخش را کنار بگذار و فقط سن و عدد را ببین.",
      columns: ["اعتبار"],
      rows: [
        { label: "زیرِ ۵۰ سال", it: "fino a 50 anni", values: ["۱۰ سال (برای B، BE و A یکسان)"] },
        { label: "۵۰ تا ۷۰ سال", it: "tra i 50 e i 70 anni", values: ["۵ سال"] },
        { label: "۷۰ تا ۸۰ سال", it: "tra i 70 e gli 80 anni", values: ["۳ سال"] },
        { label: "بالای ۸۰ سال", it: "oltre gli 80 anni", values: ["۲ سال؛ پس بالای ۸۰ هم تمدید می‌شود"] },
        { label: "گواهینامه‌ی ویژه (BS)", it: "patente B speciale", values: ["برای کسانی که با خودروی تطبیق‌داده‌شده می‌رانند: ۵ سال تا ۷۰، بعد ۳ سال"] },
      ],
      takeaway: "۱۰، ۵، ۳، ۲: زیرِ ۵۰، تا ۷۰، تا ۸۰، بالای ۸۰. «۱۰ سال در هر حال» یا «بی‌انقضا تا ۵۰» غلط است.",
      rule: `${ART_126} c.2, c.5, c.6`,
    },
    {
      kind: "classify",
      title: "تمدیدش چند سال اعتبار دارد؟",
      body: "سنِ شخص در روزِ تمدیدِ گواهینامه‌ی B را ببین. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "10 anni", fa: "۱۰ سال" },
        { it: "5 anni", fa: "۵ سال" },
        { it: "3 anni", fa: "۳ سال" },
        { it: "2 anni", fa: "۲ سال" },
      ],
      items: [
        { prompt: "۳۲ ساله", answer: 0, explain: "زیرِ ۵۰: ۱۰ سال." },
        { prompt: "۵۵ ساله", answer: 1, explain: "۵۰ تا ۷۰: ۵ سال." },
        { prompt: "۷۴ ساله", answer: 2, explain: "۷۰ تا ۸۰: ۳ سال." },
        { prompt: "۸۲ ساله", answer: 3, explain: "بالای ۸۰: ۲ سال." },
        { prompt: "۴۸ ساله، با B و BE", answer: 0, explain: "BE همان قاعده‌ی B را دارد." },
        { prompt: "۶۰ ساله با گواهینامه‌ی ویژه (BS)", answer: 1, explain: "گواهینامه‌ی ویژه: ۵ سال تا ۷۰." },
      ],
      takeaway: "سن را ببین، بعد عدد را: ۱۰، ۵، ۳، ۲.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la validità", fa: "اعتبار" },
        { it: "scaduta di validità", fa: "منقضی‌شده" },
        { it: "la conferma di validità", fa: "تمدیدِ گواهینامه" },
        { it: "rilasciare", fa: "صادر کردن" },
        { it: "i requisiti fisici e psichici", fa: "شرایطِ جسمی و روانی" },
        { it: "l’accertamento sanitario", fa: "معاینه‌ی پزشکی" },
        { it: "il medico autorizzato", fa: "پزشکِ مجاز" },
        { it: "il compleanno", fa: "روزِ تولد" },
        { it: "la patente speciale", fa: "گواهینامه‌ی ویژه (برای خودروی تطبیق‌داده‌شده)" },
      ],
    },
    {
      kind: "trap",
      title: "«dieci anni»: زیرِ ۵۰، نه «در هر حال»",
      body: "هر دو جمله اعتبارِ ۱۰ ساله را می‌گویند. یکی شرطِ سن دارد، دیگری آن را برداشته:",
      examples: [
        {
          sourceId: "6343",
          textIt: "La patente di guida di categoria B, salvo diversa limitazione riportata sul documento stesso o salvo allineamento alla data del compleanno del titolare, ha validità di dieci anni se rilasciata o confermata a chi non ha superato i 50 anni di età",
          answer: 1,
          chunks: [
            { it: "La patente di guida di categoria B,", fa: "گواهینامه‌ی ردیفِ B،" },
            { it: "salvo diversa limitazione riportata sul documento stesso o salvo allineamento alla data del compleanno del titolare,", fa: "مگر محدودیتِ دیگری روی خودِ کارت آمده باشد یا تاریخ با روزِ تولدِ دارنده میزان شده باشد،", focus: "condition" },
            { it: "ha validità di dieci anni", fa: "ده سال اعتبار دارد", verb: "ha ← avere" },
            { it: "se rilasciata o confermata a chi non ha superato i 50 anni di età", fa: "اگر برای کسی صادر یا تمدید شود که از ۵۰ سال نگذشته", focus: "limit" },
          ],
          translation: "گواهینامه‌ی ردیفِ B، مگر محدودیتِ دیگری روی خودِ کارت آمده باشد یا تاریخ با روزِ تولدِ دارنده میزان شده باشد، اگر برای کسی صادر یا تمدید شود که از ۵۰ سال نگذشته، ده سال اعتبار دارد.",
          why: "درست است. زیرِ ۵۰ سال: ۱۰ سال.",
        },
        {
          sourceId: "6358",
          textIt: "La patente di guida di categoria B, salvo diversa limitazione riportata sul documento stesso o salvo allineamento alla data del compleanno del titolare, vale dieci anni in ogni caso di rilascio o di conferma",
          answer: 0,
          chunks: [
            { it: "La patente di guida di categoria B,", fa: "گواهینامه‌ی ردیفِ B،" },
            { it: "salvo diversa limitazione riportata sul documento stesso o salvo allineamento alla data del compleanno del titolare,", fa: "مگر محدودیتِ دیگری روی خودِ کارت آمده باشد یا تاریخ با روزِ تولدِ دارنده میزان شده باشد،", focus: "condition" },
            { it: "vale dieci anni", fa: "ده سال اعتبار دارد", verb: "vale ← valere" },
            { it: "in ogni caso di rilascio o di conferma", fa: "در هر صدور یا تمدیدی", focus: "always" },
          ],
          translation: "گواهینامه‌ی ردیفِ B، مگر محدودیتِ دیگری روی خودِ کارت آمده باشد یا تاریخ با روزِ تولدِ دارنده میزان شده باشد، در هر صدور یا تمدیدی ده سال اعتبار دارد.",
          why: "غلط است. «در هر حال» غلط است: از ۵۰ سالگی ۵ سال، از ۷۰ سالگی ۳ سال، از ۸۰ سالگی ۲ سال.",
        },
      ],
      takeaway: "عددِ اعتبار همیشه با سن می‌آید. جمله‌ای که سن را حذف کند غلط است.",
      rule: `${ART_126} c.2`,
    },
  ],
  practice: [
    {
      sourceId: "6341",
      textIt: "La patente di guida è confermata a seguito di esito favorevole dell’apposito accertamento sanitario eseguito da medico autorizzato",
      answer: 1,
      chunks: [
        { it: "La patente di guida è confermata", fa: "گواهینامه تمدید می‌شود", verb: "è confermata ← confermare" },
        { it: "a seguito di esito favorevole", fa: "پس از نتیجه‌ی مثبتِ", focus: "condition" },
        { it: "dell’apposito accertamento sanitario", fa: "معاینه‌ی پزشکیِ مخصوص" },
        { it: "eseguito da medico autorizzato", fa: "که پزشکِ مجاز انجام داده", verb: "eseguito ← eseguire" },
      ],
      translation: "گواهینامه پس از نتیجه‌ی مثبتِ معاینه‌ی پزشکیِ مخصوص که پزشکِ مجاز انجام داده، تمدید می‌شود.",
      why: "درست است (قدم ۱). تمدید فقط به معاینه‌ی پزشکی بستگی دارد.",
      rule: `${ART_126} c.1, c.8`,
      conceptStep: 1,
    },
    {
      sourceId: "6351",
      textIt: "Con la patente di guida scaduta di validità è possibile comunque continuare a guidare per un tempo massimo di tre giorni",
      answer: 0,
      chunks: [
        { it: "Con la patente di guida scaduta di validità", fa: "با گواهینامه‌ی منقضی‌شده", focus: "condition" },
        { it: "è possibile comunque continuare a guidare", fa: "در هر حال می‌شود به رانندگی ادامه داد", verb: "è ← essere", focus: "contrast" },
        { it: "per un tempo massimo di tre giorni", fa: "حداکثر تا سه روز", focus: "limit" },
      ],
      translation: "با گواهینامه‌ی منقضی‌شده در هر حال می‌شود حداکثر تا سه روز به رانندگی ادامه داد.",
      why: "غلط است (قدم ۱). مهلتی نیست: از روزِ بعد از تاریخِ 4b گواهینامه معتبر نیست.",
      rule: `${ART_126} c.11`,
      conceptStep: 1,
    },
    {
      sourceId: "6344",
      textIt: "La patente di guida di categoria B, salvo diversa limitazione riportata sul documento stesso o salvo allineamento alla data del compleanno del titolare, ha validità di cinque anni se rilasciata o confermata a chi ha una età compresa fra i 50 e i 70 anni",
      answer: 1,
      chunks: [
        { it: "La patente di guida di categoria B,", fa: "گواهینامه‌ی ردیفِ B،" },
        { it: "salvo diversa limitazione riportata sul documento stesso o salvo allineamento alla data del compleanno del titolare,", fa: "مگر محدودیتِ دیگری روی خودِ کارت آمده باشد یا تاریخ با روزِ تولدِ دارنده میزان شده باشد،", focus: "condition" },
        { it: "ha validità di cinque anni", fa: "پنج سال اعتبار دارد", verb: "ha ← avere" },
        { it: "se rilasciata o confermata a chi ha una età compresa fra i 50 e i 70 anni", fa: "اگر برای کسی صادر یا تمدید شود که بین ۵۰ و ۷۰ سال دارد", focus: "limit" },
      ],
      translation: "گواهینامه‌ی ردیفِ B، مگر محدودیتِ دیگری روی خودِ کارت آمده باشد یا تاریخ با روزِ تولدِ دارنده میزان شده باشد، اگر برای کسی صادر یا تمدید شود که بین ۵۰ و ۷۰ سال دارد، پنج سال اعتبار دارد.",
      why: "درست است (قدم ۲). ۵۰ تا ۷۰ سال: ۵ سال.",
      rule: `${ART_126} c.2`,
      conceptStep: 2,
    },
    {
      sourceId: "6356",
      textIt: "La patente di guida di categoria B, non può essere rinnovata a chi ha superato gli 80 anni di età",
      answer: 0,
      chunks: [
        { it: "La patente di guida di categoria B,", fa: "گواهینامه‌ی ردیفِ B،" },
        { it: "non può essere rinnovata", fa: "نمی‌تواند تمدید شود", verb: "può ← potere", focus: "negation" },
        { it: "a chi ha superato gli 80 anni di età", fa: "برای کسی که از ۸۰ سال گذشته", focus: "limit" },
      ],
      translation: "گواهینامه‌ی ردیفِ B برای کسی که از ۸۰ سال گذشته نمی‌تواند تمدید شود.",
      why: "غلط است (قدم ۲). بالای ۸۰ هم تمدید می‌شود، هر بار برای ۲ سال.",
      rule: `${ART_126} c.6`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6340", "6341", "6342", "6350", "6351", "6352", "6353"] },
    {
      step: 2,
      sourceIds: ["6343", "6344", "6345", "6346", "6347", "6348", "6349", "6354", "6355", "6356", "6357", "6358", "6359"],
    },
  ],
};
