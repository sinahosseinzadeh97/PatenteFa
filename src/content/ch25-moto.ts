/**
 * src/content/ch25-moto.ts
 * Chapter 25 (Elementi del veicolo, manutenzione e comportamenti), lesson 14:
 * two-wheelers (bank groups 654–656). Drawing `moto`.
 *
 * The engine-stop switch, the chain, oil and brake-fluid levels. Not every
 * two-wheeler is alike: many small scooters have no engine-stop switch, some
 * motorcycles have a belt or a shaft, small mopeds can have cable brakes.
 * 7131 is flagged (VEICOLO_FLAGGED_SOURCE_IDS): mapped, never scored.
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter25.test.ts.
 */
import type { Lesson } from "./lessons.js";
import { EXERCISE, MANUALE, MODEL_NOTE, TECNICA } from "./ch25-common.js";

const DUE = "Nei veicoli a motore a due ruote,";
const DUE_FA = "در وسیله‌های موتوریِ دوچرخ،";
const KILL = "manuali d'uso Honda (GL1800, CBF250, CMX300): interruttore di arresto motore, per l'emergenza; in RUN per avviare";
const OLIO = "manuali d'uso Honda (GL1800, CB1000, MSX125): livello dell'olio con la moto verticale su un fondo piano (cavalletto centrale o tenuta dritta)";

export const lessonMoto: Lesson = {
  id: "due-ruote-interruttore-catena-livelli",
  titleFa: "دوچرخ‌ها: کلیدِ قطعِ اضطراری، زنجیر، روغن",
  titleIt: "DUE RUOTE · INTERRUTTORE DI EMERGENZA · CATENA · LIVELLI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی کلیدِ قطعِ اضطراریِ موتور کجاست و برای چیست، زنجیر چطور نیروی موتور را به چرخِ عقب می‌رساند و چه نگهداری‌ای می‌خواهد، و سطحِ روغنِ موتور و روغنِ ترمزِ موتورسیکلت را چطور ببینی. همه‌ی دوچرخ‌ها یکسان نیستند؛ هر جا فرق دارد، گفته می‌شود.",
      why:
        "۳۶ سؤال. دام‌ها جای کلید را عوض می‌کنند (روی پدالِ دنده، پایه، زیرِ پای راست)، کارِ دیگری به آن می‌دهند (ترمزِ دستی، قفلِ چرخ، دزدگیر)، زنجیر را «بی‌نیاز» جا می‌زنند (خودروغن‌کار، کشش‌خودکار، فقط سرعت را کم می‌کند)، یا موتورسیکلت را «بی‌مایع» می‌دانند.",
      rule: `${TECNICA}; ${MANUALE}`,
    },
    {
      kind: "anatomy",
      title: "یک موتورسیکلت، از پهلو",
      scene: "moto",
      body:
        "هر بخش را لمس کن. تصویر ساده است: جای کلیدها و شکلِ قطعه‌ها از مدلی به مدلِ دیگر فرق دارد، و همه‌ی دوچرخ‌ها همه‌ی این قطعه‌ها را ندارند.",
      parts: [
        { id: "interruttore", nameIt: "l'interruttore di emergenza", nameFa: "کلیدِ قطعِ اضطراریِ موتور", text: "روی دسته‌ی فرمان، معمولاً سمتِ راست، زیرِ انگشتِ شست. موتور را بی‌آن‌که دست از فرمان برداری خاموش می‌کند. بسیاری از اسکوترهای کوچک آن را ندارند." },
        { id: "chiave", nameIt: "la chiave di accensione", nameFa: "سوئیچ", text: "در حالتِ عادی موتور را با سوئیچ خاموش کن. کلیدِ اضطراری جای سوئیچ را نمی‌گیرد." },
        { id: "serbatoio", nameIt: "la vaschetta del liquido freni", nameFa: "مخزنِ روغنِ ترمز", text: "مخزنی کوچک و شفاف روی دسته‌ی فرمان (برای ترمزِ جلو)، و معمولاً یکی هم برای ترمزِ عقب. سطح را از پشتِ دیواره‌ی شفافش می‌بینی." },
        { id: "oblo", nameIt: "la finestrella (oblò) dell'olio", nameFa: "پنجره‌ی دیدِ روغن", text: "در بعضی موتورها پنجره‌ای کوچک روی کارتر، که سطحِ روغنِ موتور را نشان می‌دهد. در بعضی دیگر، گیج‌اندازه دارد." },
        { id: "catena", nameIt: "la catena di trasmissione", nameFa: "زنجیرِ انتقالِ نیرو", text: "نیروی موتور را از چرخ‌دنده‌ی جلو به چرخ‌دنده‌ی چرخِ عقب می‌رساند. بعضی موتورسیکلت‌ها به‌جای زنجیر تسمه یا میل‌گاردان دارند." },
        { id: "pignone", nameIt: "il pignone motore", nameFa: "چرخ‌دنده‌ی جلو (روی موتور)", text: "چرخ‌دنده‌ی کوچکی که موتور می‌چرخاند. با زنجیر و چرخ‌دنده‌ی عقب یک دست کار می‌کند." },
        { id: "corona", nameIt: "la corona della ruota", nameFa: "چرخ‌دنده‌ی چرخِ عقب", text: "چرخ‌دنده‌ی بزرگِ روی چرخِ عقب. نسبتِ دو چرخ‌دنده همان است که برای این موتورسیکلت تأیید شده." },
        { id: "cavalletto", nameIt: "il cavalletto (laterale)", nameFa: "پایه‌ی بغلِ موتورسیکلت", text: "موتورسیکلت را کج نگه می‌دارد. کلیدِ اضطراری روی آن نیست، و برای دیدنِ سطحِ روغن، موتورسیکلت نباید رویش کج باشد." },
      ],
      takeaway: `کلیدِ اضطراری روی دسته‌ی فرمان؛ زنجیر بینِ دو چرخ‌دنده؛ روغنِ ترمز در مخزنِ شفاف. ${MODEL_NOTE}`,
      rule: `${TECNICA}; ${MANUALE}`,
    },
    {
      kind: "table",
      title: "کلیدِ قطعِ اضطراریِ موتور",
      body:
        "این کلید روی دسته‌ی فرمان است تا در اضطرار، بی‌آن‌که دست‌ها از فرمان و اهرم‌ها جدا شوند، موتور را خاموش کنی. برای روشن کردن باید روی ON (یا RUN) باشد:",
      columns: ["درست", "دام"],
      rows: [
        { label: "جایش", it: "posto sul manubrio", values: ["روی دسته‌ی فرمان", "«روی پدالِ دنده»، «روی پایه»، «زیرِ پای راست»: غلط"] },
        { label: "روشن کردن", it: "posizionato su ON/Avviamento", values: ["باید روی ON باشد، وگرنه موتور روشن نمی‌شود", "اگر موتور روشن نمی‌شود، اول همین را ببین"] },
        { label: "کِی", it: "senza staccare le mani dal manubrio · su strade a forti pendenze", values: ["اضطرار؛ یا در سربالاییِ تند که دست‌هایت روی ترمز و کلاچ است", "در حالتِ عادی با سوئیچ خاموش کن"] },
        { label: "کارهایی که نمی‌کند", it: "il blocco istantaneo delle ruote · freno di stazionamento · l’antifurto", values: ["فقط موتور را خاموش می‌کند", "چرخ را قفل نمی‌کند، ترمزِ دستی نیست، دزدگیر نیست، و جای سوئیچ را نمی‌گیرد"] },
        { label: "اگر خراب است", it: "se guasto, deve essere riparato al più presto", values: ["زود تعمیرش کن", "—"] },
      ],
      takeaway: "روی دسته‌ی فرمان، برای اضطرار، فقط موتور را خاموش می‌کند. باید ON باشد تا روشن شود.",
      rule: KILL,
    },
    {
      kind: "table",
      title: "زنجیر: روغن، کشش، فرسودگی",
      body:
        "زنجیرِ خشک یا شل زود فرسوده می‌شود و ممکن است پاره شود. زنجیرِ پاره‌شده می‌تواند دورِ چرخ‌دنده‌ها گیر کند و چرخِ عقب را قفل کند: یعنی از دست رفتنِ کنترل، نه فقط از دست رفتنِ سرعت:",
      columns: ["درست", "دام"],
      rows: [
        { label: "روغن‌کاری", it: "ben lubrificata", values: ["مرتب تمیز و روغن‌کاری کن", "«فولادِ خودروغن‌کار است» یا «فقط تمیزش کن، روغن نزن»: غلط"] },
        { label: "کشش", it: "la corretta tensione della catena", values: ["مرتب بسنج", "«کشش‌خودکار دارد، لازم نیست»: غلط"] },
        { label: "فرسودگی", it: "segni di usura", values: ["زنجیرِ فرسوده را عوض کن", "«با سیمِ فولادی محکمش کن»: غلط"] },
        { label: "پاره شدن", it: "la rottura improvvisa della catena", values: ["چرخِ عقب ممکن است قفل شود", "«فقط سرعت کم می‌شود، ایمنی نه»: غلط"] },
        { label: "چرخ‌دنده‌ها", it: "il pignone motore e la corona della ruota", values: ["با زنجیرِ فرسوده معمولاً عوض می‌شوند", "«هرگز لازم نیست» غلط؛ تغییرِ نسبت با چرخ‌دنده‌های دیگر هم مجاز نیست"] },
      ],
      takeaway: "زنجیر: تمیز، روغن‌خورده، با کششِ درست؛ فرسوده شد، با چرخ‌دنده‌ها عوض. پاره شدنش خطرِ قفل شدنِ چرخ است.",
      rule: `${TECNICA}; ${MANUALE}`,
    },
    {
      kind: "table",
      title: "سطحِ روغنِ موتور و روغنِ ترمز",
      body:
        "موتورسیکلت هم مایع‌هایی دارد که باید مرتب دیده شوند: روغنِ موتور و روغنِ ترمز، و در موتورهای آب‌خنک، مایعِ خنک‌کننده. روغن را با موتورسیکلتِ صاف روی زمینِ مسطح ببین، چند دقیقه بعد از خاموش کردن:",
      columns: ["درست", "دام"],
      rows: [
        { label: "کِی و چطور", it: "con il veicolo in piano e dopo aver spento il motore da alcuni minuti", values: ["روی زمینِ مسطح، موتور خاموش، چند دقیقه بعد", "«با موتورِ روشن در درجا، روی پایه»: غلط"] },
        { label: "صاف ایستادن", it: "perfettamente orizzontale", values: ["موتورسیکلت باید صاف (عمودی) باشد، نه کج روی پایه‌ی بغل", "یادداشتِ منبع: بانک (7131) می‌گوید «روی چرخ‌ها، نه روی پایه». دفترچه‌های هوندا که خواندیم برعکس می‌گویند موتورسیکلت را روی پایه‌ی وسط بگذار یا صاف نگه دار. اصلِ مشترک: صاف، نه کج روی پایه‌ی بغل؛ روشِ دقیق را دفترچه‌ی موتورسیکلتت می‌گوید. جوابِ بانک VERO است؛ این سؤال را برای امتیاز نمی‌آوریم."] },
        { label: "«مخزن‌ها پلمب‌اند»", it: "i serbatoi sono sigillati", values: ["غلط: سطح‌ها را باید دید", "—"] },
        { label: "روغنِ ترمز", it: "il liquido freni · puramente meccanico", values: ["موتورسیکلت ترمزِ هیدرولیک و مخزن دارد", "بعضی موتور گازی‌های کوچک ترمزِ سیمی دارند؛ ولی «موتورسیکلت مخزن ندارد» غلط است"] },
        { label: "موتورِ هواخنک", it: "raffreddati ad aria", values: ["مایعِ خنک‌کننده ندارد", "«سطحش را از پنجره‌ی بینِ پره‌ها ببین»: غلط"] },
      ],
      takeaway: "صاف، روی زمینِ مسطح، موتور خاموش و کمی صبر. روغنِ ترمز در مخزنِ شفاف. هواخنک: بی‌مایعِ خنک‌کننده.",
      rule: `${OLIO}; ${MANUALE}`,
    },
    {
      kind: "classify",
      title: "تمرین: کدام قطعه؟",
      body: `${EXERCISE} هر موقعیت درباره‌ی کدام قطعه است؟`,
      options: [
        { it: "interruttore di emergenza", fa: "کلیدِ قطعِ اضطراری" },
        { it: "catena", fa: "زنجیر" },
        { it: "livelli di olio e liquido freni", fa: "سطحِ روغن و روغنِ ترمز" },
      ],
      items: [
        { prompt: "استارت می‌زنی و موتور روشن نمی‌شود؛ بنزین هست", answer: 0, explain: "شاید کلیدِ اضطراری روی OFF است (قدمِ ۲)." },
        { prompt: "در سربالاییِ تند ایستاده‌ای، دو دستت روی ترمز و کلاچ است و باید موتور را خاموش کنی", answer: 0, explain: "برای همین روی دسته‌ی فرمان است (قدمِ ۲)." },
        { prompt: "پیش از سفر می‌بینی حلقه‌ها خشک‌اند و پایینش شل آویزان است", answer: 1, explain: "روغن‌کاری و کشش (قدمِ ۳)." },
        { prompt: "موتورسیکلت را صاف روی زمینِ مسطح نگه می‌داری و از پنجره‌ی کوچکِ کارتر نگاه می‌کنی", answer: 2, explain: "سطحِ روغنِ موتور (قدمِ ۴)." },
        { prompt: "مخزنِ شفافِ کوچکِ روی دسته‌ی فرمان را نگاه می‌کنی", answer: 2, explain: "سطحِ روغنِ ترمزِ جلو (قدمِ ۱ و ۴)." },
        { prompt: "صدای تق‌تق از عقب می‌آید و دندانه‌های چرخ‌دنده تیز و ساییده شده‌اند", answer: 1, explain: "زنجیر و چرخ‌دنده‌ها فرسوده‌اند؛ با هم عوض (قدمِ ۳)." },
      ],
      takeaway: "روشن نمی‌شود؟ کلید. زنجیر خشک یا شل؟ روغن و کشش. سطح‌ها؟ صاف و خاموش.",
      rule: MANUALE,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'interruttore di emergenza", fa: "کلیدِ قطعِ اضطراریِ موتور" },
        { it: "il manubrio", fa: "دسته‌ی فرمانِ موتورسیکلت" },
        { it: "la chiave di accensione", fa: "سوئیچ" },
        { it: "la catena di trasmissione", fa: "زنجیرِ انتقالِ نیرو" },
        { it: "il pignone · la corona", fa: "چرخ‌دنده‌ی جلو · چرخ‌دنده‌ی چرخِ عقب" },
        { it: "la tensione della catena", fa: "کششِ زنجیر" },
        { it: "lubrificare", fa: "روغن‌کاری کردن", base: "lubrificare" },
        { it: "il cavalletto (laterale · centrale)", fa: "پایه‌ی موتورسیکلت (بغل · وسط)" },
        { it: "la vaschetta del liquido freni", fa: "مخزنِ روغنِ ترمز" },
        { it: "raffreddato ad aria", fa: "هواخنک" },
      ],
    },
    {
      kind: "trap",
      title: "«la rottura della catena»: فقط سرعت؟",
      body: "هر دو جمله درباره‌ی پاره شدنِ زنجیرند. یکی خطر را می‌گوید، دیگری آن را کوچک می‌کند:",
      examples: [
        {
          sourceId: "7122",
          textIt: "Nei veicoli a motore a due ruote, la rottura improvvisa della catena di trasmissione può causare il bloccaggio della ruota posteriore, con conseguente perdita del controllo del veicolo",
          answer: 1,
          chunks: [
            { it: DUE, fa: DUE_FA },
            { it: "la rottura improvvisa della catena di trasmissione", fa: "پاره شدنِ ناگهانیِ زنجیر" },
            { it: "può causare il bloccaggio della ruota posteriore,", fa: "می‌تواند چرخِ عقب را قفل کند،", verb: "può ← potere" },
            { it: "con conseguente perdita del controllo del veicolo", fa: "و کنترلِ وسیله از دست برود" },
          ],
          translation: "در وسیله‌های موتوریِ دوچرخ، پاره شدنِ ناگهانیِ زنجیر می‌تواند چرخِ عقب را قفل کند و کنترلِ وسیله از دست برود.",
          why: "درست است. زنجیرِ پاره‌شده دورِ چرخ‌دنده گیر می‌کند.",
        },
        {
          sourceId: "7125",
          textIt: "Nei veicoli a motore a due ruote, la rottura della catena di trasmissione pregiudica la velocità di marcia, ma non la sicurezza",
          answer: 0,
          chunks: [
            { it: DUE, fa: DUE_FA },
            { it: "la rottura della catena di trasmissione", fa: "پاره شدنِ زنجیر" },
            { it: "pregiudica la velocità di marcia,", fa: "به سرعتِ حرکت آسیب می‌زند،", verb: "pregiudica ← pregiudicare" },
            { it: "ma non la sicurezza", fa: "ولی به ایمنی نه", focus: "contrast" },
          ],
          translation: "در وسیله‌های موتوریِ دوچرخ، پاره شدنِ زنجیر به سرعتِ حرکت آسیب می‌زند، ولی به ایمنی نه.",
          why: "غلط است. چرخِ عقبِ قفل‌شده یعنی خطرِ زمین خوردن.",
        },
      ],
      takeaway: "زنجیرِ پاره = خطرِ قفل شدنِ چرخِ عقب. «ma non la sicurezza» یعنی جمله غلط است.",
      rule: TECNICA,
    },
  ],
  practice: [
    {
      sourceId: "7119",
      textIt: "Nei veicoli a motore a due ruote, la catena di trasmissione collega il pignone motore alla corona della ruota",
      answer: 1,
      chunks: [
        { it: DUE, fa: DUE_FA },
        { it: "la catena di trasmissione", fa: "زنجیرِ انتقالِ نیرو" },
        { it: "collega il pignone motore alla corona della ruota", fa: "چرخ‌دنده‌ی جلو را به چرخ‌دنده‌ی چرخ وصل می‌کند", verb: "collega ← collegare" },
      ],
      translation: "در وسیله‌های موتوریِ دوچرخ، زنجیرِ انتقالِ نیرو چرخ‌دنده‌ی جلو را به چرخ‌دنده‌ی چرخ وصل می‌کند.",
      why: "درست است (قدم ۱). نیروی موتور از همین راه به چرخِ عقب می‌رسد.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "7110",
      textIt: "Nei veicoli a motore a due ruote, l'interruttore di emergenza posto sul manubrio sostituisce il dispositivo di accensione a chiave",
      answer: 0,
      chunks: [
        { it: DUE, fa: DUE_FA },
        { it: "l'interruttore di emergenza posto sul manubrio", fa: "کلیدِ اضطراریِ روی دسته‌ی فرمان" },
        { it: "sostituisce il dispositivo di accensione a chiave", fa: "جای سوئیچ را می‌گیرد", verb: "sostituisce ← sostituire", focus: "contrast" },
      ],
      translation: "در وسیله‌های موتوریِ دوچرخ، کلیدِ اضطراریِ روی دسته‌ی فرمان جای سوئیچ را می‌گیرد.",
      why: "غلط است (قدم ۲). کلیدِ اضطراری برای اضطرار است؛ سوئیچ همچنان لازم است.",
      rule: KILL,
      conceptStep: 2,
    },
    {
      sourceId: "7106",
      textIt: "Nei veicoli a motore a due ruote, l'interruttore di emergenza permette lo spegnimento del motore senza staccare le mani dal manubrio",
      answer: 1,
      chunks: [
        { it: DUE, fa: DUE_FA },
        { it: "l'interruttore di emergenza permette lo spegnimento del motore", fa: "کلیدِ اضطراری اجازه می‌دهد موتور را خاموش کنی", verb: "permette ← permettere" },
        { it: "senza staccare le mani dal manubrio", fa: "بی‌آن‌که دست‌ها را از فرمان برداری", focus: "negation" },
      ],
      translation: "در وسیله‌های موتوریِ دوچرخ، کلیدِ اضطراری اجازه می‌دهد موتور را خاموش کنی، بی‌آن‌که دست‌ها را از فرمان برداری.",
      why: "درست است (قدم ۲). برای همین زیرِ انگشتِ شست است.",
      rule: KILL,
      conceptStep: 2,
    },
    {
      sourceId: "7124",
      textIt: "Nei veicoli a motore a due ruote, la catena di trasmissione non necessita di lubrificazione perché è realizzata in acciaio autolubrificante",
      answer: 0,
      chunks: [
        { it: DUE, fa: DUE_FA },
        { it: "la catena di trasmissione non necessita di lubrificazione", fa: "زنجیر روغن‌کاری لازم ندارد", verb: "necessita ← necessitare", focus: "negation" },
        { it: "perché è realizzata in acciaio autolubrificante", fa: "چون از فولادِ خودروغن‌کار ساخته شده", focus: "reason" },
      ],
      translation: "در وسیله‌های موتوریِ دوچرخ، زنجیر روغن‌کاری لازم ندارد، چون از فولادِ خودروغن‌کار ساخته شده.",
      why: "غلط است (قدم ۳). دلیلِ ساختگی است؛ زنجیرِ بی‌روغن زود فرسوده می‌شود و ممکن است پاره شود.",
      rule: MANUALE,
      conceptStep: 3,
    },
    {
      sourceId: "7137",
      textIt: "Sui motocicli, il livello del l'olio motore deve essere controllato con il motore in funzione al minimo e la moto sistemata sul cavalletto",
      answer: 0,
      chunks: [
        { it: "Sui motocicli, il livello del l'olio motore", fa: "در موتورسیکلت‌ها، سطحِ روغنِ موتور" },
        { it: "deve essere controllato con il motore in funzione al minimo", fa: "باید با موتورِ روشن در درجا دیده شود", verb: "deve ← dovere", focus: "contrast" },
        { it: "e la moto sistemata sul cavalletto", fa: "و موتورسیکلت روی پایه" },
      ],
      translation: "در موتورسیکلت‌ها، سطحِ روغنِ موتور باید با موتورِ روشن در درجا و موتورسیکلت روی پایه دیده شود.",
      why: "غلط است (قدم ۴). موتور خاموش باشد و چند دقیقه صبر کن تا روغن پایین بیاید؛ موتورسیکلت صاف، نه کج.",
      rule: OLIO,
      conceptStep: 4,
    },
  ],
  related: [
    { step: 1, sourceIds: ["7119", "7133", "7134"] },
    { step: 2, sourceIds: ["7104", "7105", "7106", "7107", "7108", "7109", "7110", "7111", "7112", "7113", "7114", "7115", "7116"] },
    { step: 3, sourceIds: ["7117", "7118", "7120", "7121", "7122", "7123", "7124", "7125", "7126", "7127", "7128", "7129", "7130"] },
    { step: 4, sourceIds: ["7131", "7132", "7135", "7136", "7137", "7138", "7139"] },
  ],
};
