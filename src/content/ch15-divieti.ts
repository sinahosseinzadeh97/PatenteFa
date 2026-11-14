/**
 * src/content/ch15-divieti.ts
 * Chapter 15 (Sorpasso), lesson 6: bans the bank invents, and the real duty
 * towards emergency vehicles. Art. 148 lists where overtaking is banned
 * (c.10–14); a bus, a police car off duty, a right indicator, a parking exit,
 * night, delineators or a caravan are not on that list. The place bans have no
 * vehicle exceptions (animal-drawn carts, two-wheelers, stopped buses near a
 * crest). Emergency vehicles with siren and blue light: leave the way free,
 * stop if needed, never follow closely to take advantage (CdS art. 177 c.3).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter15.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_148 = "Codice della Strada, art. 148";
const CDS_177 = "Codice della Strada, art. 177";
const VIETATO = "È vietato il sorpasso";
const VIETATO_FA = "سبقت ممنوع است";

export const lessonSorpassoDivieti: Lesson = {
  id: "sorpasso-falsi-divieti",
  titleFa: "ممنوعیت‌های ساختگی و وسیله‌های امدادی",
  titleIt: "FALSI DIVIETI · VEICOLI DI EMERGENZA",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس جمله‌هایی را که برای سبقت ممنوعیتی می‌سازند که در قانون نیست می‌شناسی (اتوبوس، پلیس، راهنمای راست، شب…)، و می‌دانی در برابرِ آمبولانس یا پلیسی که آژیر و چراغ گردانِ آبی روشن کرده چه وظیفه‌ای داری.",
      why:
        "۱۷ سؤال، و تقریباً همه غلط‌اند. بانک یک وسیله یا یک جای آشنا را برمی‌دارد و می‌پرسد «این‌جا سبقت ممنوع است؟». جواب از فهرستِ درس‌های ۲ و ۵ می‌آید: اگر در آن فهرست نیست، ممنوع نیست؛ هرچند بررسی‌های ایمنی همیشه لازم‌اند.",
      rule: `${CDS_148} c.10–14; ${CDS_177} c.3`,
    },
    {
      kind: "table",
      title: "در فهرستِ قانون نیست",
      body:
        "قانون جاهای ممنوع را یکی‌یکی نام برده است: پیچ و قله و دیدِ کم، تقاطع، گذرگاهِ راه‌آهن، عابر، صف، خطِ ممتد، تابلو. ردیف‌های بالای این جدول در آن فهرست نیستند. ردیف‌های پایینی برعکس‌اند: ممنوعیتِ واقعی را با یک «استثنای» ساختگی باز می‌کنند.",
      columns: ["ممنوع؟", "چرا"],
      rows: [
        { label: "سبقت از اتوبوسِ خطِ عمومی، حتی وقتی برای مسافر ایستاده", it: "autobus in servizio pubblico di linea", values: ["نه", "فقط تراموا و اتوبوس برقیِ ایستاده‌ی وسطِ جاده قاعده‌ی خاص دارند (درسِ ۴)؛ اتوبوس نه"] },
        { label: "سبقت از خودروی پلیس", it: "veicoli della polizia", values: ["نه", "مثلِ هر خودروی دیگر، وقتی در مأموریتِ اضطراری نیست"] },
        { label: "خودروی جلو راهنمای راست زده، یا علامت داده که کنار می‌کشد", it: "indicatore di direzione destro", values: ["نه", "سمتِ چپ باز است؛ فقط حواست باشد شاید آهسته کند"] },
        { label: "جلوی خروجیِ پارکینگِ عمومی", it: "uscita di un pubblico parcheggio", values: ["نه", "مثلِ پمپ‌بنزین و passo carrabile در درسِ ۲: در فهرست نیست"] },
        { label: "شب، در شهری که روشنایی‌اش کم است", it: "di notte · illuminazione insufficiente", values: ["نه به‌خودیِ‌خود", "ممنوعیت «دیدِ کم» است؛ اگر جاده را تا پایانِ سبقت نمی‌بینی، به همان دلیل نه"] },
        { label: "پشتِ اتوبوسِ خطِ عمومی در جاده‌ی کوهستانی", it: "strade di montagna · autobus di linea", values: ["نه", "کوهستان و اتوبوس هیچ‌کدام در فهرست نیستند"] },
        { label: "جاده‌ای که تیرک‌های راهنمای کنارِ جاده دارد", it: "delineatori normali di margine", values: ["نه", "تیرک‌ها شکلِ جاده را نشان می‌دهند (فصلِ ۹)؛ خطری نمی‌سازند"] },
        { label: "سبقت از خودرو با کاروانِ یدکی در سرازیریِ تند", it: "veicolo trainante un caravan · discesa", values: ["نه «هرگز»", "قانون چنین ممنوعیتی ندارد؛ بررسی‌های معمولی کافی است"] },
        { label: "نزدیکِ قله، در جاده‌ی دوطرفه‌ی دوخطه: سبقت از گاری", it: "veicoli a trazione animale", values: ["بله", "ممنوعیتِ قله برای همه‌ی وسیله‌هاست؛ کُند بودنِ گاری استثنا نمی‌سازد"] },
        { label: "همان‌جا: رفتن به سمتِ مقابل برای جلو زدن از اتوبوسِ ایستاده", it: "invadere l'opposta semicarreggiata", values: ["بله", "پشتِ قله را نمی‌بینی؛ ایستاده بودنِ اتوبوس این را عوض نمی‌کند"] },
        { label: "«سبقت از دوچرخ همیشه مجاز است»", it: "sempre consentito · a due ruote", values: ["گاهی بله", "دوچرخ هم مثلِ هر وسیله‌ای: پیچ، قله، تقاطع و خطِ ممتد سرِ جایشان‌اند"] },
      ],
      takeaway:
        "دو سؤال بپرس: این جا یا این وسیله در فهرستِ ممنوعیت‌های قانون هست؟ اگر نیست، جمله‌ی «ممنوع است» غلط است. اگر هست، یک وسیله‌ی کُند یا ایستاده آن را باز نمی‌کند.",
      rule: `${CDS_148} c.10–13`,
    },
    {
      kind: "table",
      title: "آمبولانس و پلیس: با آژیر یا بی‌آژیر",
      body:
        "یک چیز تعیین‌کننده است: آیا آژیر و چراغ گردانِ آبی روشن است (servizio di emergenza)؟ اگر بله، تو راه را باز می‌کنی؛ اگر نه، این خودرو مثلِ بقیه است.",
      columns: ["چه می‌کنی", "نمی‌کنی"],
      rows: [
        {
          label: "آمبولانس یا پلیس با آژیر و چراغ گردانِ آبی",
          it: "in servizio di emergenza",
          values: ["راه را باز کن و اگر لازم است بایست", "پشتش نچسب تا از راهی که باز می‌کند استفاده کنی؛ از او سبقت نگیر، حتی در آزادراهِ سه‌خطه"],
        },
        {
          label: "خودروی پلیس بی‌آژیر، در رانندگیِ عادی",
          it: "non in servizio di emergenza",
          values: ["مثلِ هر خودروی دیگر؛ اگر بقیه‌ی شرط‌ها جور است، سبقت بگیر", "به این بهانه که «مزاحمش نشوم» پشتش نمان"],
        },
      ],
      takeaway: "آژیر روشن = راه باز کن، بایست اگر لازم است، دنبالش نرو. آژیر خاموش = خودروی معمولی.",
      rule: `${CDS_177} c.3`,
    },
    {
      kind: "classify",
      title: "ممنوع یا نه؟",
      body: "فقط پرسشِ قانون: این موقعیت به‌خودیِ‌خود سبقت را ممنوع می‌کند؟ تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "vietato", fa: "ممنوع" },
        { it: "non vietato", fa: "ممنوع نیست" },
      ],
      items: [
        { prompt: "اتوبوسِ شهری در ایستگاهِ کنارِ جاده ایستاده و خطِ وسط خط‌چین است", answer: 1, explain: "اتوبوس در فهرست نیست. فقط مواظبِ مسافری باش که از جلوی اتوبوس بیرون می‌آید." },
        { prompt: "پشتِ آمبولانسی که با آژیر می‌رود و راه را باز می‌کند", answer: 0, explain: "ماده‌ی ۱۷۷ بند ۳: دنبال کردنش برای استفاده از راهِ باز ممنوع است." },
        { prompt: "خودروی پلیس بی‌آژیر با سرعتِ کم در جاده‌ی خالی", answer: 1, explain: "بی‌آژیر، مثلِ هر خودروی دیگر." },
        { prompt: "تراکتور نزدیکِ قله، جاده‌ی دوطرفه‌ی دوخطه", answer: 0, explain: "ممنوعیتِ قله برای همه است، حتی وسیله‌ی خیلی کُند." },
        { prompt: "خودروی جلو راهنمای راست زده، جاده‌ی صاف با خط‌چین", answer: 1, explain: "راهنمای راست سبقت را ممنوع نمی‌کند." },
      ],
      takeaway: "«ممنوع» فقط وقتی است که قانون نامش را برده. کُندی، ایستادن یا اسمِ آشنای یک وسیله جوابی نمی‌سازد.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l'autobus in servizio pubblico di linea", fa: "اتوبوسِ خطِ عمومی" },
        { it: "in servizio di emergenza", fa: "در مأموریتِ اضطراری (با آژیر و چراغ گردانِ آبی)" },
        { it: "l'ambulanza", fa: "آمبولانس" },
        { it: "accodarsi", fa: "پشتِ کسی در صف قرار گرفتن؛ دنبالش رفتن", note: "«accodandosi» = در حالی که دنبالش می‌روی." },
        { it: "il veicolo a trazione animale", fa: "گاری؛ وسیله‌ای که حیوان می‌کشد" },
        { it: "il passo carrabile", fa: "ورودیِ خودرو به ملک" },
        { it: "ostacolare", fa: "مانعِ کسی شدن" },
      ],
    },
    {
      kind: "trap",
      title: "پلیس: مجاز یا «برای اینکه مزاحمش نشوی» ممنوع؟",
      body: "هر دو جمله درباره‌ی خودروی پلیسی‌اند که در مأموریتِ اضطراری نیست:",
      examples: [
        {
          sourceId: "5275",
          textIt: "E' consentito sorpassare un'auto della Polizia, se non è in servizio di emergenza e non vi sono altri tipi di impedimenti",
          answer: 1,
          chunks: [
            { it: "E' consentito sorpassare", fa: "سبقت گرفتن مجاز است", verb: "E' consentito ← consentire" },
            { it: "un'auto della Polizia,", fa: "از خودروی پلیس،" },
            { it: "se non è in servizio di emergenza", fa: "اگر در مأموریتِ اضطراری نباشد", focus: "condition" },
            { it: "e non vi sono altri tipi di impedimenti", fa: "و مانعِ دیگری در کار نباشد", focus: "negation", verb: "vi sono ← esserci" },
          ],
          translation: "سبقت گرفتن از خودروی پلیس مجاز است، اگر در مأموریتِ اضطراری نباشد و مانعِ دیگری در کار نباشد.",
          why: "درست است. بی‌آژیر، خودروی پلیس مثلِ بقیه است؛ «مانعِ دیگر» یعنی همان بررسی‌ها و ممنوعیت‌های همیشگی.",
        },
        {
          sourceId: "5279",
          textIt: "E' vietato sorpassare un'auto della Polizia, non in servizio di emergenza, per non ostacolarne la marcia",
          answer: 0,
          chunks: [
            { it: "E' vietato sorpassare", fa: "سبقت گرفتن ممنوع است", verb: "E' ← essere" },
            { it: "un'auto della Polizia,", fa: "از خودروی پلیس،" },
            { it: "non in servizio di emergenza,", fa: "که در مأموریتِ اضطراری نیست،", focus: "negation" },
            { it: "per non ostacolarne la marcia", fa: "تا مانعِ حرکتش نشوی", focus: "reason", verb: "ostacolarne ← ostacolare" },
          ],
          translation: "سبقت گرفتن از خودروی پلیسی که در مأموریتِ اضطراری نیست ممنوع است، تا مانعِ حرکتش نشوی.",
          why: "غلط است. چنین ممنوعیتی نیست؛ دلیلش هم ساختگی است. سبقتِ درست مانعِ کسی نمی‌شود.",
        },
      ],
      takeaway: "اسمِ «پلیس» جوابی نمی‌سازد؛ آژیر می‌سازد. بی‌آژیر: مجاز، مثلِ بقیه.",
      rule: `${CDS_177} c.3`,
    },
  ],
  practice: [
    {
      sourceId: "5229",
      textIt: "È vietato il sorpasso degli autobus in servizio pubblico di linea",
      answer: 0,
      chunks: [
        { it: VIETATO, fa: VIETATO_FA, verb: "È ← essere" },
        { it: "degli autobus in servizio pubblico di linea", fa: "از اتوبوس‌های خطِ عمومی" },
      ],
      translation: "سبقت از اتوبوس‌های خطِ عمومی ممنوع است.",
      why: "غلط است (قدم ۱). اتوبوس در فهرستِ ممنوعیت‌ها نیست. قاعده‌ی خاص فقط برای تراموا و اتوبوس برقیِ ایستاده در وسطِ جاده است.",
      rule: `${CDS_148} c.9–13`,
      conceptStep: 1,
    },
    {
      sourceId: "5230",
      textIt: "È vietato il sorpasso quando il veicolo che precede ha azionato l'indicatore di direzione destro",
      answer: 0,
      chunks: [
        { it: VIETATO, fa: VIETATO_FA, verb: "È ← essere" },
        { it: "quando il veicolo che precede", fa: "وقتی وسیله‌ی جلو", focus: "condition", verb: "precede ← precedere" },
        { it: "ha azionato l'indicatore di direzione destro", fa: "راهنمای راست را روشن کرده", verb: "ha azionato ← azionare" },
      ],
      translation: "وقتی وسیله‌ی جلو راهنمای راست را روشن کرده، سبقت ممنوع است.",
      why: "غلط است (قدم ۱). راهنمای راست یعنی به راست می‌رود؛ سمتِ چپ باز می‌ماند. فقط راهنمای چپ است که سبقت از چپ را می‌بندد (درسِ ۴).",
      rule: `${CDS_148} c.2 lett. b, c.7`,
      conceptStep: 1,
    },
    {
      sourceId: "5240",
      textIt: "Su carreggiate a due corsie e a doppio senso in prossimità di un dosso, è consentito sorpassare veicoli a trazione animale",
      answer: 0,
      chunks: [
        { it: "Su carreggiate a due corsie e a doppio senso", fa: "روی سواره‌روهای دوخطه و دوطرفه" },
        { it: "in prossimità di un dosso,", fa: "نزدیکِ قله‌ی سربالایی،" },
        { it: "è consentito sorpassare", fa: "سبقت گرفتن مجاز است", verb: "è consentito ← consentire" },
        { it: "veicoli a trazione animale", fa: "از گاری‌ها" },
      ],
      translation: "روی سواره‌روهای دوخطه و دوطرفه، نزدیکِ قله‌ی سربالایی، سبقت گرفتن از گاری‌ها مجاز است.",
      why: "غلط است (قدم ۱). ممنوعیتِ قله برای سبقت از هر وسیله‌ای است. پشتِ قله دیده نمی‌شود، چه از ماشین جلو بزنی چه از گاری.",
      rule: `${CDS_148} c.10`,
      conceptStep: 1,
    },
    {
      sourceId: "5239",
      textIt: "E'vietato sorpassare accodandosi ad un'ambulanza in servizio di emergenza",
      answer: 1,
      chunks: [
        { it: "E'vietato sorpassare", fa: "سبقت گرفتن ممنوع است", verb: "E' ← essere" },
        { it: "accodandosi", fa: "با چسبیدن به دنبالِ", verb: "accodandosi ← accodarsi" },
        { it: "ad un'ambulanza in servizio di emergenza", fa: "آمبولانسی که در مأموریتِ اضطراری است" },
      ],
      translation: "سبقت گرفتن با چسبیدن به دنبالِ آمبولانسی که در مأموریتِ اضطراری است ممنوع است.",
      why: "درست است (قدم ۲). ماده‌ی ۱۷۷: دنبال کردنِ وسیله‌ی امدادی برای جلو افتادن ممنوع است. راهی که او باز می‌کند مالِ خودش است.",
      rule: `${CDS_177} c.3`,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      // bans the law does not have; place bans without vehicle exceptions
      sourceIds: ["5211", "5213", "5218", "5229", "5230", "5240", "5242", "5244", "5245", "5257", "5258", "5260", "5274"],
    },
    {
      step: 2,
      // emergency vehicles (art. 177 c.3) and the police car off duty
      sourceIds: ["5239", "5275", "5279", "5280"],
    },
  ],
};
