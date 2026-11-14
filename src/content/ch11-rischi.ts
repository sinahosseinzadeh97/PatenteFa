/**
 * src/content/ch11-rischi.ts
 * Chapter 11 (Limiti di velocità), lessons 5–6:
 *  L5 what speed does in a curve and to fuel, why right of way does not make
 *     speed blameless, and the hazards a driver must foresee at the roadside
 *     (a ball, parked cars, mixed traffic, worksites).
 *  L6 long descents in neutral with the engine off: what the servo brake and
 *     power steering lose.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter11.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_141 = "Codice della Strada, art. 141";
const DISCESA = "Se si percorre una lunga discesa con il cambio in folle e a motore spento,";
const DISCESA_FA = "اگر یک سرازیریِ طولانی را با دنده خلاص و موتورِ خاموش بروی،";
const SERVOFRENO = "Nei veicoli dotati di servofreno,";
const SERVOFRENO_FA = "در خودروهایی که ترمزِ کمکی (servofreno) دارند،";
const PALLONE = "In un centro abitato, se si vede un pallone rotolare sulla carreggiata,";
const PALLONE_FA = "داخلِ آبادی، اگر توپی ببینی که روی سواره‌رو قِل می‌خورد،";
const AUTO = "Passare molto vicino ad un'auto parcheggiata, a bordo della quale si trovano ancora persone,";
const AUTO_FA = "خیلی نزدیک از کنارِ خودروی پارک‌شده‌ای رد شدن که هنوز کسی داخلش نشسته،";
const INCROCIO = "Se si attraversa ad alta velocità un incrocio";
const INCROCIO_FA = "اگر با سرعتِ زیاد از تقاطعی عبور کنی";

// ── Lesson 5 ──────────────────────────────────────────────────────────────────

export const lessonVelocitaRischi: Lesson = {
  id: "velocita-rischi-prevedibili",
  titleFa: "سرعت و خطرهایی که باید پیش‌بینی کنی",
  titleIt: "CURVE · INCROCI · PALLONE · AUTO PARCHEGGIATE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی سرعتِ زیاد در پیچ چه می‌کند، چرا حق تقدم تو را از تقصیر معاف نمی‌کند، و کنارِ جاده دنبالِ چه خطرهایی بگردی: توپی که قِل می‌خورد، خودروی پارک‌شده‌ای که کسی داخلش است، ترافیکِ مختلط و کارگاه.",
      why:
        "۲۳ سؤال. درسِ ۱ گفت سرعت را با شرایط تنظیم کن؛ این درس می‌گوید اگر نکنی چه می‌شود، و بانک اغلب با «فقط» («solo») جمله را غلط می‌کند: «فقط با سرعتِ زیاد خطرناک است»، «فقط اگر در باز باشد».",
      rule: `${CDS_141} c.1–4`,
    },
    {
      kind: "table",
      title: "سرعت در پیچ، و سوخت",
      body: "در پیچ، خودرو برای ماندن روی مسیر به چسبندگیِ لاستیک نیاز دارد، و هرچه تندتر بروی بیشترش را لازم داری. سرعتِ زیاد هم سوخت می‌سوزاند.",
      columns: ["چرا"],
      rows: [
        { label: "چسبندگی", it: "tenuta di strada", values: ["سرعت در پیچ روی ماندنِ خودرو در مسیر اثر دارد؛ سرعتِ زیاد آن را از بین می‌برد."] },
        { label: "واژگونی", it: "ribaltamento", values: ["سرعتِ بیش از حد در پیچ ممکن است خودرو را واژگون کند، مخصوصاً خودروی بلند و پربار."] },
        { label: "کلاچ", it: "pedale della frizione", values: ["پیچ را با کلاچِ فشرده نرو: موتور از چرخ‌ها جدا می‌شود و کنترلِ سرعت و ترمزِ موتور را از دست می‌دهی. با دنده برو."] },
        { label: "سوخت و آلودگی", it: "consumo · inquinamento", values: ["سرعتِ زیاد و تغییرهای ناگهانیِ سرعت سوخت و آلودگی را بیشتر می‌کنند. رانندگیِ نرم ارزان‌تر است."] },
      ],
      takeaway: "پیش از پیچ، سرعت را کم کن و با دنده وارد شو. نرم رانندن هم امن‌تر است و هم کم‌مصرف‌تر.",
      rule: `${CDS_141} c.3`,
    },
    {
      kind: "table",
      title: "حق تقدم ≠ بی‌تقصیری",
      body:
        "حق تقدم می‌گوید چه کسی اول برود، نه این‌که تو هر سرعتی بروی. نزدیکِ تقاطع همیشه باید سرعت را تنظیم کنی (درسِ ۱). اگر با سرعتِ زیاد از تقاطعی که حق تقدمش با توست بگذری و تصادف شود، ممکن است بخشی از تقصیر با تو باشد (concorso di colpa).",
      columns: ["درست یا غلط"],
      rows: [
        { label: "تقصیرِ مشترک ممکن است", it: "concorso di colpa", values: ["درست. سرعتِ زیاد خودش تخلف است، حتی با حق تقدم."] },
        { label: "«کاملاً بی‌تقصیر»", it: "completamente privi di responsabilità", values: ["غلط."] },
        { label: "«فقط راننده‌ی فرعی مقصر است»", it: "solo del conducente … senza diritto di precedenza", values: ["غلط؛ «فقط» همین را رد می‌کند."] },
        { label: "«هر کس اول وارد شده مقصر است»", it: "chi ha impegnato per primo l'incrocio", values: ["غلط؛ تقصیر با رفتارِ هر دو سنجیده می‌شود، نه با ترتیبِ ورود."] },
      ],
      takeaway: "حق تقدم مجوزِ سرعت نیست. در تقاطع آهسته کن، حتی وقتی نوبتِ توست.",
      rule: `${CDS_141} c.3; CdS art. 145 c.1; Codice civile art. 2054 c.2`,
    },
    {
      kind: "table",
      title: "خطرهای کنارِ جاده",
      body:
        "خطر همیشه وسطِ جاده نیست. کنارِ جاده نشانه‌هایی هست که می‌گویند چیزی ممکن است ناگهان جلویت بیاید. با دیدنِ آن‌ها، آرام و پیوسته سرعت را کم می‌کنی تا اگر لازم شد بایستی.",
      columns: ["چه می‌کنی"],
      rows: [
        { label: "توپ روی سواره‌رو", it: "pallone sulla carreggiata", values: ["آرام و پیوسته ترمز کن تا خودروی پشتی به تو نزند، و آماده‌ی بچه‌ای باش که دنبالش می‌دود. فرمانِ ناگهانی نه، رفتن به خطِ مقابل نه. فلاشر زدن کارِ اصلی نیست؛ کم کردنِ سرعت است."] },
        { label: "خودروی پارک‌شده با سرنشین", it: "auto parcheggiata con persone a bordo", values: ["ممکن است درش ناگهان باز شود. با سرعتِ کم هم خطرناک است، نه «فقط» با سرعتِ زیاد یا «فقط» وقتی در باز است. فاصله‌ی کناری بگذار."] },
        { label: "ردیفِ خودروهای پارک‌شده", it: "auto parcheggiate", values: ["ممکن است عابری با کالسکه یا کسی روی ویلچر را پنهان کنند که می‌خواهد رد شود. خیلی چسبیده به آن‌ها نرو."] },
        { label: "ترافیکِ مختلط", it: "traffico misto", values: ["وسیله‌های کند و تند، حیوان یا عابر روی جاده: سرعت را کم کن."] },
        { label: "سطحِ جاده", it: "fondo stradale", values: ["چاله، ناهمواری، برگِ خیس: سرعت را با سطحِ جاده تنظیم کن."] },
        { label: "کارگاه و مثلثِ خطر", it: "lavori in corso · triangolo", values: ["کارگاهِ جاده‌ای یا مثلثِ «خودروی متوقف»: یعنی جلوتر چیزی ایستاده؛ سرعت را کم کن."] },
      ],
      takeaway: "نشانه را که دیدی، پیش از رسیدن به خطر آرام کن. خطر را پیش‌بینی کن، منتظرش نمان.",
      rule: `${CDS_141} c.2–4`,
    },
    {
      kind: "classify",
      title: "توپی جلوی ماشینت قِل می‌خورد",
      body: "خیابانِ داخلِ شهر، یک خودرو پشتِ سرت. هر کار را بخوان: درست است یا خطرناک؟ تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "giusto", fa: "درست" },
        { it: "pericoloso", fa: "خطرناک" },
      ],
      items: [
        { prompt: "پایت را از گاز برمی‌داری و آرام و پیوسته ترمز می‌کنی", answer: 0, explain: "سرعت کم می‌شود و خودروی پشتی فرصتِ واکنش دارد." },
        { prompt: "پیاده‌رو را نگاه می‌کنی تا ببینی بچه‌ای دنبالِ توپ می‌آید یا نه", answer: 0, explain: "توپ خبرِ آمدنِ کسی است که دنبالش می‌دود." },
        { prompt: "فرمان را تند می‌چرخانی تا به توپ نخوری", answer: 1, explain: "کنترلِ خودرو را از دست می‌دهی و ممکن است به کسی یا چیزی بخوری." },
        { prompt: "برای دور زدنِ توپ وارد خطِ مقابل می‌شوی", answer: 1, explain: "ممکن است از روبه‌رو خودرو بیاید." },
        { prompt: "فقط فلاشر را روشن می‌کنی و با همان سرعت ادامه می‌دهی", answer: 1, explain: "کارِ اصلی کم کردنِ سرعت است؛ فلاشر جایش را نمی‌گیرد." },
      ],
      takeaway: "توپ = بچه. آرام کن، نگاه کن، آماده‌ی ایستادن باش.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la tenuta di strada", fa: "ماندنِ خودرو در مسیر؛ چسبندگی" },
        { it: "il ribaltamento", fa: "واژگونی" },
        { it: "il concorso di colpa", fa: "تقصیرِ مشترک" },
        { it: "rotolare", fa: "قِل خوردن" },
        { it: "rallentare progressivamente", base: "rallentare", fa: "آرام و پیوسته سرعت را کم کردن" },
        { it: "sterzare bruscamente", base: "sterzare", fa: "فرمانِ ناگهانی دادن" },
        { it: "essere tamponati", base: "tamponare", fa: "از پشت ضربه خوردن" },
        { it: "l'apertura delle portiere", fa: "باز شدنِ درهای خودرو" },
        { it: "il passeggino", fa: "کالسکه‌ی بچه" },
        { it: "il fondo stradale", fa: "سطحِ جاده" },
      ],
    },
    {
      kind: "trap",
      title: "«può essere pericoloso» درست، «solo se» غلط",
      body: "هر دو جمله درباره‌ی رد شدن از کنارِ خودروی پارک‌شده‌ای است که کسی داخلش نشسته:",
      examples: [
        {
          sourceId: "4181",
          textIt: "Passare molto vicino ad un'auto parcheggiata, a bordo della quale si trovano ancora persone, può essere pericoloso, per la possibile apertura imprudente delle portiere",
          answer: 1,
          chunks: [
            { it: AUTO, fa: AUTO_FA },
            { it: "può essere pericoloso,", fa: "می‌تواند خطرناک باشد،", verb: "può ← potere" },
            { it: "per la possibile apertura imprudente delle portiere", fa: "چون ممکن است درها بی‌احتیاط باز شوند", focus: "reason" },
          ],
          translation: "خیلی نزدیک از کنارِ خودروی پارک‌شده‌ای رد شدن که هنوز کسی داخلش نشسته، می‌تواند خطرناک باشد، چون ممکن است درها بی‌احتیاط باز شوند.",
          why: "درست است. سرنشین ممکن است بی‌نگاه پیاده شود.",
        },
        {
          sourceId: "4186",
          textIt: "Passare molto vicino ad un'auto parcheggiata, a bordo della quale si trovano ancora persone, può essere pericoloso, solo se si viaggia ad alta velocità",
          answer: 0,
          chunks: [
            { it: AUTO, fa: AUTO_FA },
            { it: "può essere pericoloso,", fa: "می‌تواند خطرناک باشد،", verb: "può ← potere" },
            { it: "solo se si viaggia ad alta velocità", fa: "فقط اگر با سرعتِ زیاد بروی", focus: "limit", verb: "si viaggia ← viaggiare" },
          ],
          translation: "خیلی نزدیک از کنارِ خودروی پارک‌شده‌ای رد شدن که هنوز کسی داخلش نشسته، فقط اگر با سرعتِ زیاد بروی می‌تواند خطرناک باشد.",
          why: "غلط است. دری که ناگهان باز شود با سرعتِ کم هم خطرناک است؛ «solo» همین را رد می‌کند.",
        },
      ],
      takeaway: "در این درس، «solo» تقریباً همیشه نشانه‌ی جمله‌ی غلط است: خطر به یک شرط محدود نمی‌شود.",
      rule: `${CDS_141} c.2`,
    },
  ],
  practice: [
    {
      sourceId: "4042",
      textIt: "L'eccessiva velocità in curva può determinare il ribaltamento del veicolo",
      answer: 1,
      chunks: [
        { it: "L'eccessiva velocità in curva", fa: "سرعتِ بیش از حد در پیچ" },
        { it: "può determinare", fa: "می‌تواند باعثِ … شود", verb: "può ← potere" },
        { it: "il ribaltamento del veicolo", fa: "واژگون شدنِ خودرو" },
      ],
      translation: "سرعتِ بیش از حد در پیچ می‌تواند باعثِ واژگون شدنِ خودرو شود.",
      why: "درست است (قدم ۱). در پیچ، سرعتِ زیاد خودرو را به بیرونِ پیچ می‌کشد و ممکن است واژگونش کند.",
      rule: `${CDS_141} c.3`,
      conceptStep: 1,
    },
    {
      sourceId: "4043",
      textIt: "I tratti di strada in curva debbono essere percorsi con il pedale della frizione abbassato",
      answer: 0,
      chunks: [
        { it: "I tratti di strada in curva", fa: "بخش‌های پیچ‌دارِ جاده" },
        { it: "debbono essere percorsi", fa: "باید طی شوند", verb: "debbono ← dovere" },
        { it: "con il pedale della frizione abbassato", fa: "با پدالِ کلاچِ فشرده", focus: "contrast" },
      ],
      translation: "بخش‌های پیچ‌دارِ جاده باید با پدالِ کلاچِ فشرده طی شوند.",
      why: "غلط است (قدم ۱). با کلاچِ فشرده موتور از چرخ‌ها جداست و کنترلِ سرعت را از دست می‌دهی. پیچ را با دنده برو.",
      rule: `${CDS_141} c.3`,
      conceptStep: 1,
    },
    {
      sourceId: "4153",
      textIt: "Se si attraversa ad alta velocità un incrocio avendo diritto di precedenza, in caso di incidente, non può escludersi un concorso di colpa",
      answer: 1,
      chunks: [
        { it: INCROCIO, fa: INCROCIO_FA, focus: "condition", verb: "si attraversa ← attraversare" },
        { it: "avendo diritto di precedenza,", fa: "در حالی که حق تقدم با توست،", verb: "avendo ← avere" },
        { it: "in caso di incidente,", fa: "اگر تصادف شود،", focus: "condition" },
        { it: "non può escludersi un concorso di colpa", fa: "تقصیرِ مشترک را نمی‌شود کنار گذاشت", focus: "negation", verb: "può escludersi ← escludere" },
      ],
      translation: "اگر با سرعتِ زیاد از تقاطعی عبور کنی در حالی که حق تقدم با توست، و تصادف شود، تقصیرِ مشترک را نمی‌شود کنار گذاشت.",
      why: "درست است (قدم ۲). حق تقدم سرعتِ زیاد را مجاز نمی‌کند؛ بخشی از تقصیر می‌تواند با تو باشد.",
      rule: `${CDS_141} c.3; Codice civile art. 2054 c.2`,
      conceptStep: 2,
    },
    {
      sourceId: "4177",
      textIt: "In un centro abitato, se si vede un pallone rotolare sulla carreggiata, bisogna sterzare bruscamente",
      answer: 0,
      chunks: [
        { it: PALLONE, fa: PALLONE_FA, focus: "condition", verb: "si vede ← vedere" },
        { it: "bisogna sterzare bruscamente", fa: "باید ناگهان فرمان بدهی", verb: "bisogna ← bisognare", focus: "contrast" },
      ],
      translation: "داخلِ آبادی، اگر توپی ببینی که روی سواره‌رو قِل می‌خورد، باید ناگهان فرمان بدهی.",
      why: "غلط است (قدم ۳). فرمانِ ناگهانی کنترل را از تو می‌گیرد. کارِ درست کم کردنِ آرام و پیوسته‌ی سرعت است.",
      rule: `${CDS_141} c.2`,
      conceptStep: 3,
    },
    {
      sourceId: "4182",
      textIt: "Può essere pericoloso circolare troppo vicino alle auto parcheggiate, perché potrebbero impedire la vista di un disabile in carrozzella o di un pedone che spinge un passeggino per bambini, che sono in procinto di attraversare",
      answer: 1,
      chunks: [
        { it: "Può essere pericoloso", fa: "می‌تواند خطرناک باشد", verb: "può ← potere" },
        { it: "circolare troppo vicino alle auto parcheggiate,", fa: "خیلی نزدیکِ خودروهای پارک‌شده رانندگی کردن،" },
        { it: "perché potrebbero impedire la vista", fa: "چون ممکن است جلوی دیدِ … را بگیرند", focus: "reason", verb: "potrebbero ← potere" },
        { it: "di un disabile in carrozzella", fa: "فردِ معلولی روی ویلچر" },
        { it: "o di un pedone che spinge un passeggino per bambini,", fa: "یا عابری که کالسکه‌ی بچه را هل می‌دهد،", verb: "spinge ← spingere" },
        { it: "che sono in procinto di attraversare", fa: "که می‌خواهند از عرضِ خیابان رد شوند" },
      ],
      translation: "خیلی نزدیکِ خودروهای پارک‌شده رانندگی کردن می‌تواند خطرناک باشد، چون ممکن است جلوی دیدِ فردِ معلولی روی ویلچر یا عابری که کالسکه‌ی بچه را هل می‌دهد و می‌خواهند رد شوند را بگیرند.",
      why: "درست است (قدم ۳). خودروهای پارک‌شده کسانی را پنهان می‌کنند که پایین‌تر از سقفِ خودرواند.",
      rule: `${CDS_141} c.2, c.4`,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["4039", "4040", "4041", "4042", "4043"] },
    { step: 2, sourceIds: ["4153", "4155", "4156", "4158"] },
    {
      step: 3,
      sourceIds: ["4114", "4115", "4140", "4141", "4176", "4177", "4178", "4180", "4181", "4182", "4183", "4184", "4185", "4186"],
    },
  ],
};

// ── Lesson 6 ──────────────────────────────────────────────────────────────────

export const lessonDiscesaFolle: Lesson = {
  id: "discesa-folle-servofreno",
  titleFa: "سرازیریِ طولانی: نه دنده خلاص، نه موتورِ خاموش",
  titleIt: "DISCESA · FOLLE · MOTORE SPENTO · SERVOFRENO",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی چرا نباید سرازیریِ طولانی را با دنده خلاص و موتورِ خاموش بروی: ترمزِ کمکی و فرمانِ کمکی به موتورِ روشن وابسته‌اند، پس ترمز سخت و دیر می‌گیرد و فرمان سنگین می‌شود.",
      why:
        "۱۱ سؤال. بانک جمله‌هایی می‌آورد که به نظر منطقی می‌آیند («سوخت صرفه‌جویی می‌شود»، «سوئیچ را بیرون بکش») و جمله‌هایی که فنی به نظر می‌رسند ولی ربطی ندارند («دیفرانسیل»، «اضافه‌بارِ برق»).",
    },
    {
      kind: "table",
      title: "موتور چه کمکی می‌کند",
      body:
        "در بیشترِ خودروها ترمزِ کمکی (servofreno) با مکشی کار می‌کند که موتورِ روشن می‌سازد، و فرمانِ کمکی (servosterzo) هم با کارِ موتور. موتور که خاموش شود، این کمک بعد از چند بار ترمز تمام می‌شود. ترمز هنوز کار می‌کند، ولی پدال سفت می‌شود و باید خیلی محکم‌تر فشارش دهی.",
      columns: ["موتورِ روشن، با دنده", "خلاص و موتورِ خاموش"],
      rows: [
        { label: "ترمز", it: "servofreno", values: ["پدالِ سبک، توقفِ کوتاه", "پدالِ سفت؛ مسافتِ ترمز بیشتر و بیشتر؛ ایستادن سخت‌تر"] },
        { label: "فرمان", it: "servosterzo", values: ["فرمانِ سبک", "فرمانِ سنگین؛ دور زدنِ سریعِ یک مانع سخت"] },
        { label: "ترمزِ موتور", it: "freno motore", values: ["دنده سرعت را نگه می‌دارد", "هیچ؛ فقط ترمزها کار می‌کنند و داغ می‌شوند"] },
        { label: "نیروی ترمز", it: "forza frenante", values: ["کامل", "همان نیرو نیست؛ خطرِ تصادف بیشتر"] },
      ],
      takeaway: "سرازیری را با دنده و موتورِ روشن برو؛ ترمزِ موتور سرعت را نگه می‌دارد و ترمز و فرمان سبک می‌مانند.",
      rule: `${CDS_141} c.1–2; manuali d'uso (servofreno a depressione)`,
    },
    {
      kind: "table",
      title: "چهار باورِ غلط",
      body: "بانک این‌ها را درست جلوه می‌دهد. همه غلط‌اند:",
      columns: ["واقعیت"],
      rows: [
        { label: "«امن‌تر است و سوخت هم صرفه‌جویی می‌شود»", it: "risparmiando carburante", values: ["امن‌تر نیست: ترمز و فرمان کمک ندارند. خودروهای امروزی در سرازیری با دنده تقریباً سوختی مصرف نمی‌کنند."] },
        { label: "«سوئیچ را بیرون بکش»", it: "estrarre la chiave", values: ["خطرناک است: در بسیاری از خودروها بیرون کشیدنِ سوئیچ فرمان را قفل می‌کند."] },
        { label: "«اضافه‌بارِ برق»", it: "sovraccarico di corrente", values: ["ربطی ندارد. مشکل ترمز و فرمان است، نه برق."] },
        { label: "«خرابیِ دیفرانسیل»", it: "anomalia al differenziale", values: ["ربطی ندارد. بانک این را غلط می‌داند."] },
      ],
      takeaway: "پاسخِ درست همیشه درباره‌ی ترمز و فرمان است؛ هر جمله‌ای که از برق، دیفرانسیل یا صرفه‌جویی حرف بزند، غلط است.",
      rule: `${CDS_141} c.1`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la lunga discesa", fa: "سرازیریِ طولانی" },
        { it: "il cambio in folle", fa: "دنده خلاص" },
        { it: "a motore spento", fa: "با موتورِ خاموش" },
        { it: "il servofreno", fa: "ترمزِ کمکی (بوستر)" },
        { it: "il servosterzo", fa: "فرمانِ کمکی (هیدرولیک یا برقی)" },
        { it: "lo spazio di frenatura", fa: "مسافتِ ترمز" },
        { it: "la forza frenante", fa: "نیروی ترمز" },
        { it: "schivare un ostacolo", base: "schivare", fa: "از مانعی جاخالی دادن" },
        { it: "estrarre la chiave di accensione", base: "estrarre", fa: "سوئیچ را بیرون کشیدن" },
      ],
    },
    {
      kind: "trap",
      title: "«difficoltoso frenare» درست، «stessa forza frenante» غلط",
      body: "هر دو جمله درباره‌ی ترمزِ کمکی در همان سرازیری است:",
      examples: [
        {
          sourceId: "4163",
          textIt: "Se si percorre una lunga discesa con il cambio in folle e a motore spento, diventa difficoltoso frenare se il veicolo è dotato di servofreno",
          answer: 1,
          chunks: [
            { it: DISCESA, fa: DISCESA_FA, focus: "condition", verb: "si percorre ← percorrere" },
            { it: "diventa difficoltoso frenare", fa: "ترمز کردن سخت می‌شود", verb: "diventa ← diventare" },
            { it: "se il veicolo è dotato di servofreno", fa: "اگر خودرو ترمزِ کمکی داشته باشد", focus: "condition" },
          ],
          translation: "اگر یک سرازیریِ طولانی را با دنده خلاص و موتورِ خاموش بروی، و خودرو ترمزِ کمکی داشته باشد، ترمز کردن سخت می‌شود.",
          why: "درست است. بدونِ موتور، کمکِ ترمز تمام می‌شود و پدال سفت می‌شود.",
        },
        {
          sourceId: "4172",
          textIt: "Nei veicoli dotati di servofreno a depressione, se si percorre una lunga discesa con il cambio in folle e a motore spento, si ottiene la stessa forza frenante che si ha con il motore acceso",
          answer: 0,
          chunks: [
            { it: "Nei veicoli dotati di servofreno a depressione,", fa: "در خودروهایی که ترمزِ کمکیِ مکشی دارند،" },
            { it: "se si percorre una lunga discesa con il cambio in folle e a motore spento,", fa: "اگر سرازیریِ طولانی را با دنده خلاص و موتورِ خاموش بروی،", focus: "condition", verb: "si percorre ← percorrere" },
            { it: "si ottiene la stessa forza frenante", fa: "همان نیروی ترمز را داری", verb: "si ottiene ← ottenere", focus: "contrast" },
            { it: "che si ha con il motore acceso", fa: "که با موتورِ روشن داری" },
          ],
          translation: "در خودروهایی که ترمزِ کمکیِ مکشی دارند، اگر سرازیریِ طولانی را با دنده خلاص و موتورِ خاموش بروی، همان نیروی ترمزی را داری که با موتورِ روشن داری.",
          why: "غلط است. مکشِ ترمزِ کمکی را موتورِ روشن می‌سازد؛ بدونِ آن، با همان فشارِ پا نیروی کمتری می‌گیری.",
        },
      ],
      takeaway: "servofreno و servosterzo = به موتورِ روشن وابسته. موتور خاموش = ترمز و فرمان سخت.",
      rule: `${CDS_141} c.1`,
    },
  ],
  practice: [
    {
      sourceId: "4166",
      textIt: "Nei veicoli dotati di servofreno, se si percorre una lunga discesa con il cambio in folle e a motore spento, aumenta pericolosamente lo spazio di frenatura",
      answer: 1,
      chunks: [
        { it: SERVOFRENO, fa: SERVOFRENO_FA },
        { it: "se si percorre una lunga discesa con il cambio in folle e a motore spento,", fa: "اگر سرازیریِ طولانی را با دنده خلاص و موتورِ خاموش بروی،", focus: "condition", verb: "si percorre ← percorrere" },
        { it: "aumenta pericolosamente lo spazio di frenatura", fa: "مسافتِ ترمز به‌طورِ خطرناکی زیاد می‌شود", verb: "aumenta ← aumentare" },
      ],
      translation: "در خودروهایی که ترمزِ کمکی دارند، اگر سرازیریِ طولانی را با دنده خلاص و موتورِ خاموش بروی، مسافتِ ترمز به‌طورِ خطرناکی زیاد می‌شود.",
      why: "درست است (قدم ۱). پدال سفت می‌شود و با همان فشار دیرتر می‌ایستی.",
      rule: `${CDS_141} c.2`,
      conceptStep: 1,
    },
    {
      sourceId: "4165",
      textIt: "Nei veicoli dotati di servosterzo, se si percorre una lunga discesa con il cambio in folle e a motore spento, diventa difficoltoso girare rapidamente lo sterzo per schivare un ostacolo",
      answer: 1,
      chunks: [
        { it: "Nei veicoli dotati di servosterzo,", fa: "در خودروهایی که فرمانِ کمکی دارند،" },
        { it: "se si percorre una lunga discesa con il cambio in folle e a motore spento,", fa: "اگر سرازیریِ طولانی را با دنده خلاص و موتورِ خاموش بروی،", focus: "condition", verb: "si percorre ← percorrere" },
        { it: "diventa difficoltoso girare rapidamente lo sterzo", fa: "تند چرخاندنِ فرمان سخت می‌شود", verb: "diventa ← diventare" },
        { it: "per schivare un ostacolo", fa: "برای جاخالی دادن از یک مانع", focus: "reason" },
      ],
      translation: "در خودروهایی که فرمانِ کمکی دارند، اگر سرازیریِ طولانی را با دنده خلاص و موتورِ خاموش بروی، تند چرخاندنِ فرمان برای جاخالی دادن از یک مانع سخت می‌شود.",
      why: "درست است (قدم ۱). فرمانِ کمکی هم به موتورِ روشن وابسته است؛ بدونِ آن فرمان سنگین می‌شود.",
      rule: `${CDS_141} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "4170",
      textIt: "Per una maggiore sicurezza, è conveniente percorrere le lunghe discese con il cambio in folle e a motore spento, risparmiando così anche carburante",
      answer: 0,
      chunks: [
        { it: "Per una maggiore sicurezza,", fa: "برای ایمنیِ بیشتر،", focus: "reason" },
        { it: "è conveniente percorrere le lunghe discese", fa: "بهتر است سرازیری‌های طولانی را بروی", verb: "è ← essere" },
        { it: "con il cambio in folle e a motore spento,", fa: "با دنده خلاص و موتورِ خاموش،" },
        { it: "risparmiando così anche carburante", fa: "و این‌طور سوخت هم صرفه‌جویی کنی", verb: "risparmiando ← risparmiare" },
      ],
      translation: "برای ایمنیِ بیشتر، بهتر است سرازیری‌های طولانی را با دنده خلاص و موتورِ خاموش بروی و این‌طور سوخت هم صرفه‌جویی کنی.",
      why: "غلط است (قدم ۲). امن‌تر نیست: ترمز و فرمان کمکشان را از دست می‌دهند. صرفه‌جوییِ سوخت هم دلیلِ خوبی نیست.",
      rule: `${CDS_141} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "4171",
      textIt: "Se si percorre una lunga discesa con il cambio in folle e a motore spento, conviene estrarre la chiave di accensione del veicolo",
      answer: 0,
      chunks: [
        { it: DISCESA, fa: DISCESA_FA, focus: "condition", verb: "si percorre ← percorrere" },
        { it: "conviene estrarre la chiave di accensione del veicolo", fa: "بهتر است سوئیچِ خودرو را بیرون بکشی", verb: "conviene ← convenire", focus: "contrast" },
      ],
      translation: "اگر سرازیریِ طولانی را با دنده خلاص و موتورِ خاموش بروی، بهتر است سوئیچِ خودرو را بیرون بکشی.",
      why: "غلط است (قدم ۲). در بسیاری از خودروها بیرون کشیدنِ سوئیچ فرمان را قفل می‌کند؛ خطر را بیشتر می‌کند.",
      rule: `${CDS_141} c.1`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["4162", "4163", "4164", "4165", "4166", "4167", "4172"] },
    { step: 2, sourceIds: ["4168", "4169", "4170", "4171"] },
  ],
};
