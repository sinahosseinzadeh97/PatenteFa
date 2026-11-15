/**
 * src/content/ch20-moto.ts
 * Chapter 20 (Patente, punti e documenti), lessons 2–3: two- and three-wheel
 * licence categories.
 *  L2 AM (14 years; mopeds on two and three wheels, light quadricycles; at 14
 *     only in Italy and without passengers, art. 115) and A1 (16 years; 125 cm³
 *     AND 11 kW AND 0,1 kW/kg; tricycles up to 15 kW; includes AM).
 *  L3 A2 (18 years; 35 kW, 0,2 kW/kg, not derived from more than double the
 *     power; passenger only if the carta di circolazione has the seat) and A
 *     (every motorcycle; tricycles over 15 kW from 21; gradual access at 20
 *     after two years of A2, direct access at 24).
 *
 * No category turns into another by itself, and none needs the one below it.
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter20.test.ts.
 */
import type { Lesson } from "./lessons.js";

const ART = (n: string) => `Codice della Strada, art. ${n}`;

export const lessonAmA1: Lesson = {
  id: "patente-am-a1",
  titleFa: "گواهینامه‌ی AM و A1: موتور گازی و موتورسیکلتِ سبک",
  titleIt: "PATENTE AM · PATENTE A1",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی گواهینامه‌ی AM از چند سالگی است و چه وسیله‌هایی را می‌شود با آن راند (موتور گازیِ دو و سه‌چرخ، چهارچرخ موتوریِ سبک)، و A1 با سه سقفش (۱۲۵ سی‌سی، ۱۱ کیلووات، ۰٫۱ کیلووات بر کیلوگرم) چه چیزی اضافه می‌کند.",
      why:
        "۲۲ سؤال. دامِ اصلی دو جور است: «ارتقای خودکار» (AM بعد از سه سال موتورسیکلت هم می‌شود؛ A1 بعد از دو سال A2 می‌شود) و «یک عدد به جای سه عدد» (A1 یعنی هر ۱۲۵ سی‌سی). هیچ ردیفی خودبه‌خود به ردیفِ بالاتر تبدیل نمی‌شود.",
      rule: `${ART("115")}, ${ART("116")} c.3`,
    },
    {
      kind: "table",
      title: "AM: از ۱۴ سالگی، برای وسیله‌های کُند",
      body:
        "AM گواهینامه‌ی وسیله‌های کوچک و کُند است: موتور گازی (حداکثر ۴۵ کیلومتر بر ساعت؛ اگر موتورِ بنزینی دارد، تا ۵۰ سی‌سی) و چهارچرخ موتوریِ سبک. آزمونِ تئوری و عملی همیشه لازم است، در هر سنی.",
      columns: ["AM"],
      rows: [
        { label: "سن", it: "14 anni", values: ["از ۱۴ سالگی."] },
        { label: "موتور گازی", it: "ciclomotori a due e a tre ruote", values: ["هم دوچرخ، هم سه‌چرخ. برای سه‌چرخ A1 لازم نیست."] },
        { label: "چهارچرخ", it: "quadricicli leggeri", values: ["فقط چهارچرخ موتوریِ سبک. چهارچرخِ غیرِ سبک B1 می‌خواهد (درس ۴)."] },
        { label: "موتورسیکلت", it: "motocicli", values: ["هرگز، حتی برقی، حتی بعد از چند سال داشتنِ AM."] },
        { label: "۱۴ تا ۱۶ سال", it: "solo sul territorio nazionale", values: ["تا ۱۶ سالگی فقط در ایتالیا و بی‌مسافر. در اتحادیه‌ی اروپا حداقلِ سن برای AM ۱۶ است."] },
        { label: "آزمون", it: "esami teorici e pratici", values: ["همیشه تئوری و عملی؛ بزرگسال بودن چیزی را حذف نمی‌کند."] },
      ],
      takeaway: "AM: از ۱۴، موتور گازیِ دو و سه‌چرخ و چهارچرخِ سبک. نه موتورسیکلت، نه چهارچرخِ غیرِ سبک، نه بی‌آزمون.",
      rule: `${ART("115")} c.1; ${ART("116")} c.3 lett. a`,
    },
    {
      kind: "table",
      title: "A1: سه سقف با هم",
      body:
        "A1 اولین گواهینامه‌ی موتورسیکلت است. موتورسیکلتش باید هر سه شرط را با هم داشته باشد: حجمِ موتور تا ۱۲۵ سی‌سی، توان تا ۱۱ کیلووات، و نسبتِ توان به وزن تا ۰٫۱ کیلووات بر کیلوگرم. یک ۱۲۵ سی‌سیِ پرقدرت‌تر در A1 نمی‌گنجد.",
      columns: ["A1"],
      rows: [
        { label: "سن", it: "16 anni", values: ["از ۱۶ سالگی. داشتنِ AM لازم نیست."] },
        { label: "موتورسیکلت", it: "125 cm³ · 11 kW · 0,1 kW/kg", values: ["با یا بی‌سایدکار، با هر سه سقف با هم."] },
        { label: "سه‌چرخ موتوری", it: "tricicli fino a 15 kW", values: ["تا ۱۵ کیلووات. بیشتر از ۱۵ کیلووات ردیفِ A می‌خواهد."] },
        { label: "ماشین‌آلاتِ کشاورزی", it: "macchine agricole", values: ["آن‌هایی که در اندازه و وزنِ موتورسیکلت می‌گنجند. ماشین‌آلاتِ عملیاتی (راهسازی) نه."] },
        { label: "AM هم در آن است", it: "veicoli della patente AM", values: ["هر چه با AM می‌شود راند، با A1 هم."] },
        { label: "مسافر", it: "passeggero", values: ["قانونی درباره‌ی سنِ مسافر برای زیرِ ۱۸ ساله‌های A1 نیست (از ۲۰۱۵ برداشته شد). شرط این است که وسیله جای مسافر داشته باشد."] },
        { label: "ارتقا", it: "non diventa automaticamente A2 o A", values: ["هرگز خودبه‌خود A2 یا A نمی‌شود."] },
      ],
      takeaway: "A1: از ۱۶، موتورسیکلت با سه سقفِ ۱۲۵ / ۱۱ / ۰٫۱ و سه‌چرخ تا ۱۵ کیلووات. خودبه‌خود بالا نمی‌رود.",
      rule: `${ART("115")} c.1; ${ART("116")} c.3 lett. b; ${ART("124")}; L. 115/2015`,
    },
    {
      kind: "classify",
      title: "کدام گواهینامه کافی است؟",
      body: "کمترین گواهینامه‌ای را انتخاب کن که برای این وسیله کافی است. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "AM", fa: "AM" },
        { it: "A1", fa: "A1" },
        { it: "né AM né A1", fa: "هیچ‌کدام" },
      ],
      items: [
        { prompt: "موتور گازیِ سه‌چرخ، ۵۰ سی‌سی", answer: 0, explain: "موتور گازیِ سه‌چرخ هم با AM است." },
        { prompt: "چهارچرخ موتوریِ سبک", answer: 0, explain: "چهارچرخِ سبک در AM است." },
        { prompt: "موتورسیکلت ۱۲۵ سی‌سی، ۱۱ کیلووات، ۰٫۰۸ کیلووات بر کیلوگرم", answer: 1, explain: "هر سه سقف رعایت شده." },
        { prompt: "سه‌چرخ موتوری ۱۲ کیلووات", answer: 1, explain: "سه‌چرخ تا ۱۵ کیلووات با A1 است." },
        { prompt: "موتورسیکلت ۱۲۵ سی‌سی، ۱۵ کیلووات", answer: 2, explain: "توانش از ۱۱ کیلووات بیشتر است؛ A2 لازم است." },
        { prompt: "موتورسیکلتِ برقیِ ۴ کیلووات", answer: 1, explain: "موتورسیکلت است، نه موتور گازی؛ AM کافی نیست." },
      ],
      takeaway: "اول بپرس: موتور گازی است یا موتورسیکلت؟ بعد سه سقفِ A1 را با هم بسنج.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la patente di categoria AM", fa: "گواهینامه‌ی ردیفِ AM" },
        { it: "conseguire la patente", base: "conseguire", fa: "گواهینامه گرفتن" },
        { it: "abilitare alla guida", base: "abilitare", fa: "اجازه‌ی راندن دادن" },
        { it: "il ciclomotore a tre ruote", fa: "موتور گازیِ سه‌چرخ" },
        { it: "il quadriciclo leggero", fa: "چهارچرخ موتوریِ سبک" },
        { it: "il motociclo", fa: "موتورسیکلت" },
        { it: "il triciclo a motore", fa: "سه‌چرخ موتوری" },
        { it: "la cilindrata", fa: "حجمِ موتور" },
        { it: "la potenza", fa: "توان" },
        { it: "il rapporto potenza/peso", fa: "نسبتِ توان به وزن" },
        { it: "la carrozzetta", fa: "سایدکار" },
      ],
    },
    {
      kind: "trap",
      title: "«a tre ruote»: AM کافی است",
      body: "هر دو جمله درباره‌ی موتور گازی با AM است. یکی سه‌چرخ را از AM بیرون می‌گذارد:",
      examples: [
        {
          sourceId: "6146",
          textIt: "Con la patente di categoria AM si possono condurre i ciclomotori a tre ruote",
          answer: 1,
          chunks: [
            { it: "Con la patente di categoria AM", fa: "با گواهینامه‌ی ردیفِ AM" },
            { it: "si possono condurre", fa: "می‌شود راند", verb: "si possono ← potere" },
            { it: "i ciclomotori a tre ruote", fa: "موتور گازی‌های سه‌چرخ" },
          ],
          translation: "با گواهینامه‌ی ردیفِ AM می‌شود موتور گازی‌های سه‌چرخ را راند.",
          why: "درست است. AM همه‌ی موتور گازی‌ها را دارد، دو و سه‌چرخ.",
        },
        {
          sourceId: "6149",
          textIt: "Con la patente di categoria AM si possono condurre i ciclomotori a due ruote mentre per condurre i ciclomotori a tre ruote occorre la patente A1",
          answer: 0,
          chunks: [
            { it: "Con la patente di categoria AM", fa: "با گواهینامه‌ی ردیفِ AM" },
            { it: "si possono condurre i ciclomotori a due ruote", fa: "می‌شود موتور گازی‌های دوچرخ را راند", verb: "si possono ← potere" },
            { it: "mentre per condurre i ciclomotori a tre ruote", fa: "در حالی که برای راندنِ موتور گازی‌های سه‌چرخ", focus: "contrast" },
            { it: "occorre la patente A1", fa: "گواهینامه‌ی A1 لازم است", verb: "occorre ← occorrere" },
          ],
          translation: "با گواهینامه‌ی ردیفِ AM می‌شود موتور گازی‌های دوچرخ را راند، در حالی که برای راندنِ موتور گازی‌های سه‌چرخ گواهینامه‌ی A1 لازم است.",
          why: "غلط است. سه‌چرخِ موتور گازی هم در AM است؛ A1 برای موتورسیکلت و سه‌چرخِ موتوریِ قوی‌تر است.",
        },
      ],
      takeaway: "تعدادِ چرخ AM را عوض نمی‌کند: موتور گازی، موتور گازی است.",
      rule: `${ART("116")} c.3 lett. a`,
    },
  ],
  practice: [
    {
      sourceId: "6147",
      textIt: "La patente AM si può conseguire a 14 anni di età",
      answer: 1,
      chunks: [
        { it: "La patente AM", fa: "گواهینامه‌ی AM" },
        { it: "si può conseguire", fa: "می‌شود گرفت", verb: "si può ← potere" },
        { it: "a 14 anni di età", fa: "در ۱۴ سالگی", focus: "limit" },
      ],
      translation: "گواهینامه‌ی AM را می‌شود در ۱۴ سالگی گرفت.",
      why: "درست است (قدم ۱). حداقلِ سن برای AM در ایتالیا ۱۴ سال است.",
      rule: `${ART("115")} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "6150",
      textIt: "La patente AM consente, a chi ha compiuto 14 anni, di condurre i ciclomotori in tutti i paesi dell’Unione Europea",
      answer: 0,
      chunks: [
        { it: "La patente AM consente,", fa: "گواهینامه‌ی AM اجازه می‌دهد،", verb: "consente ← consentire" },
        { it: "a chi ha compiuto 14 anni,", fa: "به کسی که ۱۴ سالش تمام شده،", focus: "limit" },
        { it: "di condurre i ciclomotori", fa: "موتور گازی براند" },
        { it: "in tutti i paesi dell’Unione Europea", fa: "در همه‌ی کشورهای اتحادیه‌ی اروپا", focus: "always" },
      ],
      translation: "گواهینامه‌ی AM به کسی که ۱۴ سالش تمام شده اجازه می‌دهد در همه‌ی کشورهای اتحادیه‌ی اروپا موتور گازی براند.",
      why: "غلط است (قدم ۱). از ۱۴ تا ۱۶ سالگی AM فقط در ایتالیا معتبر است؛ در اروپا حداقلِ سن ۱۶ است.",
      rule: `${ART("115")} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "6155",
      textIt: "Con la patente di categoria A1 si possono condurre i motocicli (con o senza carrozzetta) di cilindrata fino a 125 cm3, potenza non superiore a 11 kW e rapporto potenza/peso non superiore a 0,1 kW/kg",
      answer: 1,
      chunks: [
        { it: "Con la patente di categoria A1", fa: "با گواهینامه‌ی ردیفِ A1" },
        { it: "si possono condurre i motocicli (con o senza carrozzetta)", fa: "می‌شود موتورسیکلت (با یا بی‌سایدکار) راند", verb: "si possono ← potere" },
        { it: "di cilindrata fino a 125 cm3,", fa: "با حجمِ موتورِ تا ۱۲۵ سی‌سی،", focus: "limit" },
        { it: "potenza non superiore a 11 kW", fa: "توانِ نه بیشتر از ۱۱ کیلووات", focus: "limit" },
        { it: "e rapporto potenza/peso non superiore a 0,1 kW/kg", fa: "و نسبتِ توان به وزنِ نه بیشتر از ۰٫۱ کیلووات بر کیلوگرم", focus: "limit" },
      ],
      translation: "با گواهینامه‌ی ردیفِ A1 می‌شود موتورسیکلت (با یا بی‌سایدکار) با حجمِ موتورِ تا ۱۲۵ سی‌سی، توانِ نه بیشتر از ۱۱ کیلووات و نسبتِ توان به وزنِ نه بیشتر از ۰٫۱ کیلووات بر کیلوگرم راند.",
      why: "درست است (قدم ۲). این دقیقاً سه سقفِ A1 است، با هم.",
      rule: `${ART("116")} c.3 lett. b`,
      conceptStep: 2,
    },
    {
      sourceId: "6161",
      textIt: "La patente di categoria A1 abilita alla guida di tutti i motocicli di cilindrata fino a 125 cm3",
      answer: 0,
      chunks: [
        { it: "La patente di categoria A1", fa: "گواهینامه‌ی ردیفِ A1" },
        { it: "abilita alla guida", fa: "اجازه‌ی راندن می‌دهد", verb: "abilita ← abilitare" },
        { it: "di tutti i motocicli", fa: "همه‌ی موتورسیکلت‌ها را", focus: "always" },
        { it: "di cilindrata fino a 125 cm3", fa: "با حجمِ موتورِ تا ۱۲۵ سی‌سی", focus: "limit" },
      ],
      translation: "گواهینامه‌ی ردیفِ A1 اجازه‌ی راندنِ همه‌ی موتورسیکلت‌ها با حجمِ موتورِ تا ۱۲۵ سی‌سی را می‌دهد.",
      why: "غلط است (قدم ۲). «همه» غلط است: موتورسیکلتِ ۱۲۵ سی‌سی باید توان و نسبتِ توان به وزنش هم در سقف باشد.",
      rule: `${ART("116")} c.3 lett. b`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6144", "6145", "6146", "6147", "6148", "6149", "6150", "6151", "6152", "6153", "6154"] },
    { step: 2, sourceIds: ["6155", "6156", "6157", "6158", "6159", "6160", "6161", "6162", "6163", "6164", "6165"] },
  ],
};

export const lessonA2A: Lesson = {
  id: "patente-a2-a",
  titleFa: "گواهینامه‌ی A2 و A: سقفِ ۳۵ کیلووات و دو راه به A",
  titleIt: "PATENTE A2 · PATENTE A · ACCESSO GRADUALE E DIRETTO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی A2 از ۱۸ سالگی چه موتورسیکلت‌هایی را می‌دهد (تا ۳۵ کیلووات)، و A، گواهینامه‌ی همه‌ی موتورسیکلت‌ها، از دو راه به دست می‌آید: پله‌ای در ۲۰ سالگی با دو سال سابقه‌ی A2، یا مستقیم در ۲۴ سالگی.",
      why:
        "۲۷ سؤال. بانک عددها را جابه‌جا می‌کند: ۲۵ به جای ۳۵ کیلووات، «سه برابر» به جای «دو برابر»، ۲۰ یا ۲۱ به جای ۱۸ و ۲۴، A1 به جای A2. جدولِ سن‌ها را یک بار درست ببین، بقیه‌اش خودش جا می‌افتد.",
      rule: `${ART("115")}, ${ART("116")} c.3`,
    },
    {
      kind: "table",
      title: "A2: از ۱۸ سالگی، تا ۳۵ کیلووات",
      body:
        "A2 موتورسیکلت‌های متوسط را می‌دهد. سه شرط: توان تا ۳۵ کیلووات، نسبتِ توان به وزن تا ۰٫۲ کیلووات بر کیلوگرم، و موتورسیکلت از مدلی گرفته نشده باشد که بیش از دو برابرِ این توان دارد (یعنی بیش از ۷۰ کیلووات). برای گرفتنش داشتنِ A1 لازم نیست.",
      columns: ["A2"],
      rows: [
        { label: "سن", it: "18 anni", values: ["از ۱۸ سالگی. نه ۲۰. داشتنِ A1 شرط نیست."] },
        { label: "موتورسیکلت", it: "35 kW · 0,2 kW/kg · non oltre il doppio", values: ["تا ۳۵ کیلووات و ۰٫۲ کیلووات بر کیلوگرم، از مدلی نه بیش از دو برابرِ قوی‌تر. حجمِ موتور سقف ندارد."] },
        { label: "A1 و AM هم در آن است", it: "veicoli delle patenti A1 e AM", values: ["پس سه‌چرخ تا ۱۵ کیلووات و موتور گازی و چهارچرخِ سبک هم."] },
        { label: "ماشین‌آلاتِ کشاورزی", it: "macchine agricole", values: ["آن‌هایی که در اندازه و وزنِ موتورسیکلت می‌گنجند."] },
        { label: "مسافر", it: "posto del passeggero sulla carta di circolazione", values: ["فقط اگر جای مسافر در کارتِ خودروی موتورسیکلت آمده باشد."] },
        { label: "بعد از دو سال", it: "dopo 2 anni di A2", values: ["می‌تواند A بگیرد، حتی زیرِ ۲۴ سال. خودبه‌خود نمی‌شود؛ آزمونِ عملی دارد."] },
      ],
      takeaway: "A2: از ۱۸، تا ۳۵ کیلووات، شامل A1 و AM. مسافر فقط اگر در کارتِ خودرو آمده باشد.",
      rule: `${ART("115")} c.1; ${ART("116")} c.3 lett. c; ${ART("124")}; ${ART("170")}`,
    },
    {
      kind: "table",
      title: "A: همه‌ی موتورسیکلت‌ها، دو راهِ رسیدن",
      body:
        "A هر موتورسیکلتی را می‌دهد، با یا بی‌سایدکار، با هر حجم و توان. سه‌چرخ‌های بالای ۱۵ کیلووات هم در A هستند، ولی فقط از ۲۱ سالگی. برای رسیدن به A دو راه هست:",
      columns: ["چه کسی", "از چند سالگی"],
      rows: [
        { label: "راهِ پله‌ای", it: "accesso graduale", values: ["کسی که دست‌کم دو سال A2 داشته", "۲۰ سال"] },
        { label: "راهِ مستقیم", it: "accesso diretto", values: ["کسی که دو سال A2 ندارد", "۲۴ سال"] },
        { label: "سه‌چرخِ بالای ۱۵ کیلووات", it: "tricicli oltre 15 kW", values: ["دارنده‌ی A", "۲۱ سال"] },
        { label: "از A1 به A", it: "da A1 ad A", values: ["راهِ پله‌ای از A2 می‌گذرد، نه از A1", "—"] },
        { label: "سال‌های اولِ A", it: "nessun limite di 35 kW", values: ["محدودیتِ توان ندارد؛ سقفِ ۳۵ کیلووات مالِ A2 است", "—"] },
      ],
      takeaway:
        "A: پله‌ای در ۲۰ با دو سال A2، مستقیم در ۲۴. سه‌چرخِ قوی از ۲۱. در همه‌ی اروپا معتبر، شاملِ A2، A1 و AM؛ ولی چهارچرخِ غیرِ سبک در آن نیست (B1 یا B).",
      rule: `${ART("115")} c.1; ${ART("116")} c.3 lett. d`,
    },
    {
      kind: "classify",
      title: "می‌تواند گواهینامه‌ی A بگیرد؟",
      body: "هر شخص را بخوان. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "sì, accesso graduale", fa: "بله، راهِ پله‌ای" },
        { it: "sì, accesso diretto", fa: "بله، راهِ مستقیم" },
        { it: "non ancora", fa: "هنوز نه" },
      ],
      items: [
        { prompt: "۲۰ ساله، دو سال است A2 دارد", answer: 0, explain: "دو سال A2 و ۲۰ سال: راهِ پله‌ای." },
        { prompt: "۲۴ ساله، هیچ گواهینامه‌ی موتوری ندارد", answer: 1, explain: "۲۴ سال: راهِ مستقیم." },
        { prompt: "۲۲ ساله، فقط B دارد", answer: 2, explain: "نه دو سال A2، نه ۲۴ سال." },
        { prompt: "۱۹ ساله، یک سال است A2 دارد", answer: 2, explain: "هنوز نه ۲۰ سال، نه دو سال A2." },
        { prompt: "۱۸ ساله، دو سال است A1 دارد", answer: 2, explain: "راهِ پله‌ای از A2 است، نه A1، و از ۲۰ سالگی." },
        { prompt: "۲۳ ساله، سه سال است A2 دارد", answer: 0, explain: "دو سال A2 دارد و بالای ۲۰ است؛ لازم نیست تا ۲۴ صبر کند." },
      ],
      takeaway: "دو سؤال: دو سال A2 دارد؟ (پس ۲۰) وگرنه ۲۴ سالش شده؟",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "l’accesso graduale", fa: "راهِ پله‌ای" },
        { it: "l’accesso diretto", fa: "راهِ مستقیم" },
        { it: "essere titolare di", base: "essere", fa: "دارنده‌ی … بودن" },
        { it: "da almeno 2 anni", fa: "دست‌کم از دو سال پیش" },
        { it: "derivato da", base: "derivare", fa: "گرفته‌شده از (مدلی دیگر)" },
        { it: "il doppio della potenza", fa: "دو برابرِ توان" },
        { it: "compiere 24 anni", base: "compiere", fa: "۲۴ ساله شدن" },
        { it: "il quadriciclo non leggero", fa: "چهارچرخ موتوریِ غیرِ سبک" },
      ],
    },
    {
      kind: "trap",
      title: "«accesso diretto»: ۲۴، نه ۲۱",
      body: "هر دو جمله درباره‌ی گرفتنِ A بی‌سابقه‌ی دو ساله‌ی A2 است. فقط عدد فرق دارد:",
      examples: [
        {
          sourceId: "6182",
          textIt: "La patente di categoria A può essere conseguita, con accesso diretto, da chi non è già titolare di patente A2 da almeno 2 anni, solo se ha compiuto 24 anni di età",
          answer: 1,
          chunks: [
            { it: "La patente di categoria A può essere conseguita,", fa: "گواهینامه‌ی ردیفِ A را می‌شود گرفت،", verb: "può ← potere" },
            { it: "con accesso diretto,", fa: "از راهِ مستقیم،" },
            { it: "da chi non è già titolare di patente A2 da almeno 2 anni,", fa: "برای کسی که از دو سال پیش A2 ندارد،", focus: "negation" },
            { it: "solo se ha compiuto 24 anni di età", fa: "فقط اگر ۲۴ سالش تمام شده باشد", verb: "ha compiuto ← compiere", focus: "limit" },
          ],
          translation: "گواهینامه‌ی ردیفِ A را از راهِ مستقیم، کسی که از دو سال پیش A2 ندارد فقط وقتی می‌تواند بگیرد که ۲۴ سالش تمام شده باشد.",
          why: "درست است. راهِ مستقیم از ۲۴ سالگی است.",
        },
        {
          sourceId: "6190",
          textIt: "La patente di categoria A può essere conseguita con accesso diretto anche da chi non è già titolare di patente A2 da almeno 2 anni, purché abbia compiuto 21 anni di età",
          answer: 0,
          chunks: [
            { it: "La patente di categoria A può essere conseguita", fa: "گواهینامه‌ی ردیفِ A را می‌شود گرفت", verb: "può ← potere" },
            { it: "con accesso diretto", fa: "از راهِ مستقیم" },
            { it: "anche da chi non è già titolare di patente A2 da almeno 2 anni,", fa: "حتی برای کسی که از دو سال پیش A2 ندارد،", focus: "negation" },
            { it: "purché abbia compiuto 21 anni di età", fa: "به شرطی که ۲۱ سالش تمام شده باشد", verb: "abbia compiuto ← compiere", focus: "condition" },
          ],
          translation: "گواهینامه‌ی ردیفِ A را از راهِ مستقیم حتی کسی که از دو سال پیش A2 ندارد می‌تواند بگیرد، به شرطی که ۲۱ سالش تمام شده باشد.",
          why: "غلط است. ۲۱ سنِ سه‌چرخِ قوی است؛ راهِ مستقیم به A از ۲۴ سالگی است.",
        },
      ],
      takeaway: "عددهای A را از هم جدا نگه دار: ۲۰ پله‌ای، ۲۱ سه‌چرخِ قوی، ۲۴ مستقیم.",
      rule: `${ART("115")} c.1`,
    },
  ],
  practice: [
    {
      sourceId: "6168",
      textIt: "La patente di categoria A2 può essere conseguita da chi ha almeno 18 anni di età",
      answer: 1,
      chunks: [
        { it: "La patente di categoria A2", fa: "گواهینامه‌ی ردیفِ A2" },
        { it: "può essere conseguita", fa: "می‌تواند گرفته شود", verb: "può ← potere" },
        { it: "da chi ha almeno 18 anni di età", fa: "توسطِ کسی که دست‌کم ۱۸ سال دارد", focus: "limit" },
      ],
      translation: "گواهینامه‌ی ردیفِ A2 را کسی می‌تواند بگیرد که دست‌کم ۱۸ سال دارد.",
      why: "درست است (قدم ۱). A2 از ۱۸ سالگی است.",
      rule: `${ART("115")} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "6173",
      textIt: "Con la patente di categoria A2 si possono condurre i motocicli (con o senza carrozzetta) di potenza fino a 25 kW, rapporto potenza/peso non superiore a 0,2 kW/kg purché non siano derivati da una versione che sviluppa oltre il triplo della potenza massima",
      answer: 0,
      chunks: [
        { it: "Con la patente di categoria A2", fa: "با گواهینامه‌ی ردیفِ A2" },
        { it: "si possono condurre i motocicli (con o senza carrozzetta)", fa: "می‌شود موتورسیکلت (با یا بی‌سایدکار) راند", verb: "si possono ← potere" },
        { it: "di potenza fino a 25 kW,", fa: "با توانِ تا ۲۵ کیلووات،", focus: "limit" },
        { it: "rapporto potenza/peso non superiore a 0,2 kW/kg", fa: "نسبتِ توان به وزنِ نه بیشتر از ۰٫۲ کیلووات بر کیلوگرم" },
        { it: "purché non siano derivati da una versione", fa: "به شرطی که از مدلی گرفته نشده باشند", verb: "siano derivati ← derivare", focus: "condition" },
        { it: "che sviluppa oltre il triplo della potenza massima", fa: "که بیش از سه برابرِ حداکثرِ توان دارد", focus: "limit" },
      ],
      translation: "با گواهینامه‌ی ردیفِ A2 می‌شود موتورسیکلت (با یا بی‌سایدکار) با توانِ تا ۲۵ کیلووات و نسبتِ توان به وزنِ نه بیشتر از ۰٫۲ کیلووات بر کیلوگرم راند، به شرطی که از مدلی گرفته نشده باشد که بیش از سه برابرِ حداکثرِ توان دارد.",
      why: "غلط است (قدم ۱). دو عدد عوض شده: سقفِ A2 ۳۵ کیلووات است و مدلِ اصلی نباید بیش از «دو برابر» قوی‌تر باشد.",
      rule: `${ART("116")} c.3 lett. c`,
      conceptStep: 1,
    },
    {
      sourceId: "6183",
      textIt: "La patente di categoria A può essere conseguita a 20 anni di età, con accesso graduale, da chi è titolare di patente A2 da almeno 2 anni",
      answer: 1,
      chunks: [
        { it: "La patente di categoria A può essere conseguita", fa: "گواهینامه‌ی ردیفِ A را می‌شود گرفت", verb: "può ← potere" },
        { it: "a 20 anni di età,", fa: "در ۲۰ سالگی،", focus: "limit" },
        { it: "con accesso graduale,", fa: "از راهِ پله‌ای،" },
        { it: "da chi è titolare di patente A2 da almeno 2 anni", fa: "برای کسی که دست‌کم از دو سال پیش A2 دارد", focus: "condition" },
      ],
      translation: "گواهینامه‌ی ردیفِ A را از راهِ پله‌ای کسی می‌تواند در ۲۰ سالگی بگیرد که دست‌کم از دو سال پیش A2 دارد.",
      why: "درست است (قدم ۲). راهِ پله‌ای: دو سال A2 و ۲۰ سال.",
      rule: `${ART("115")} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "6192",
      textIt: "Per conseguire la patente di categoria A è in ogni caso necessario aver compiuto almeno 24 anni di età",
      answer: 0,
      chunks: [
        { it: "Per conseguire la patente di categoria A", fa: "برای گرفتنِ گواهینامه‌ی ردیفِ A" },
        { it: "è in ogni caso necessario", fa: "در هر حال لازم است", verb: "è ← essere", focus: "always" },
        { it: "aver compiuto almeno 24 anni di età", fa: "دست‌کم ۲۴ سالت تمام شده باشد", focus: "limit" },
      ],
      translation: "برای گرفتنِ گواهینامه‌ی ردیفِ A در هر حال لازم است دست‌کم ۲۴ سالت تمام شده باشد.",
      why: "غلط است (قدم ۲). «در هر حال» غلط است: با دو سال A2، از ۲۰ سالگی هم می‌شود.",
      rule: `${ART("115")} c.1`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6166", "6167", "6168", "6169", "6170", "6171", "6172", "6173", "6174", "6175", "6176", "6177", "6178"] },
    { step: 2, sourceIds: ["6179", "6180", "6181", "6182", "6183", "6184", "6185", "6186", "6187", "6188", "6189", "6190", "6191", "6192"] },
  ],
};
