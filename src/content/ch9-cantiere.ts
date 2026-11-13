/**
 * src/content/ch9-cantiere.ts
 * Chapter 9 (Segnali complementari, segnali temporanei e di cantiere),
 * lessons 1–2: the yellow temporary signs that announce roadworks (LAVORI,
 * the worksite traffic-light warning) and the devices that mark a worksite
 * out (barrier, cone, the rear panel of a works vehicle).
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter9.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const SIGN = "Il segnale raffigurato";
const SIGN_FA = "تابلوی تصویر";

// ── Lesson 1 ──────────────────────────────────────────────────────────────────

export const lessonLavoriSemaforo: Lesson = {
  id: "lavori-semaforo-cantiere",
  titleFa: "کارگاهِ جاده: تابلوی LAVORI و چراغِ موقت",
  titleIt: "LAVORI · SEMAFORO DI CANTIERE",
  minutes: 5,
  signs: [275, 297],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی زمینه‌ی زرد یعنی تابلوی موقتِ کارگاه، تابلوی LAVORI از چه چیزهایی خبر می‌دهد و چه چیزی را اجبار نمی‌کند، و مثلثِ زردِ چراغ‌دار پیش‌آگهیِ چراغِ موقتی است که کارگاه گذاشته.",
      why: "۱۸ سؤال. بانک «خبر دادن» را با «حق تقدم دادن» یا «یک‌طرفه‌ی متناوب» عوض می‌کند و چراغِ کارگاه را با چراغِ پلِ متحرک، اسکله یا گذرگاهِ راه‌آهن.",
    },
    {
      kind: "table",
      title: "تابلوی LAVORI",
      body: "مثلثِ خطر با زمینه‌ی زرد و مردی که بیل می‌زند. زرد یعنی موقت: فقط تا پایانِ کار سرِ جاست و بعد باید برداشته شود (فصل ۲ درس ۱ و فصل ۸ درس ۱۳). اگر با یک تابلوی دائمی تناقض داشته باشد، همین تابلوی موقت معتبر است.",
      columns: ["قاعده"],
      rows: [
        { label: "خبر می‌دهد از", it: "lavori in corso · cantiere", sign: 275, values: ["کارِ در حالِ انجام و کارگاهِ جاده؛ مصالح یا ماشین‌آلاتی که موقتاً روی جاده یا کنارش گذاشته‌اند؛ کارگرهایی که کنار یا روی سواره‌رو کار می‌کنند."] },
        { label: "پنلِ زیرش", it: "pannello: lunghezza del cantiere", values: ["پنلی ممکن است طولِ کارگاه را بگوید. قانون آن را برای کارگاهِ بلندتر از ۱۰۰ متر لازم می‌داند."] },
        { label: "دستور نمی‌دهد", it: "non impone obblighi", values: ["حق تقدم به کارگرها، به ماشین‌های کارگاه یا به خودروهای روبه‌رو نمی‌دهد؛ دور زدن یا یک‌طرفه‌ی متناوب را اعلام نمی‌کند. اگر قاعده‌ای باشد، تابلوی جداگانه‌ی خودش را دارد (باریکه، حق تقدم، حداکثرِ سرعت)."] },
      ],
      takeaway: "LAVORI یعنی «جلوتر کار است، مراقب باش». خبر است، نه دستور.",
      rule: "DPR 495/1992 art. 30 c.3, c.5; art. 31",
    },
    {
      kind: "table",
      title: "چراغِ موقتِ کارگاه",
      body: "همان تابلوی SEMAFORO فصل ۲ (درس ۱۳)، این بار با زمینه‌ی زرد. پیش‌آگهیِ چراغ راهنمایی‌ای است که کارگاه گذاشته؛ معمولاً جایی که سواره‌رو باریک شده و دو جهت باید به نوبت رد شوند.",
      columns: ["قاعده"],
      rows: [
        { label: "یعنی", it: "semaforo di cantiere", sign: 297, values: ["جلوتر چراغِ موقتِ کارگاه است، اغلب قبل از باریک شدنِ سواره‌رو. هم در جاده‌ی شهری پیدا می‌شود هم برون‌شهری."] },
        { label: "دایره‌ی وسط", it: "luce gialla lampeggiante", values: ["دایره‌ی زردِ وسط در واقع چراغِ زردِ چشمک‌زن است تا تابلو از دور دیده شود."] },
        { label: "چه نیست", it: "non è", values: ["چراغِ پلِ متحرک یا اسکله‌ی کشتی نیست، پیش‌آگهیِ STOP نیست، گذرگاهِ راه‌آهنِ بدونِ مانع هم نیست. آن‌ها تابلوهای خودشان را دارند."] },
      ],
      takeaway: "مثلثِ چراغ روی زمینه‌ی زرد = چراغِ موقتِ کارگاه.",
      rule: "DPR 495/1992 art. 42",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il cantiere stradale", fa: "کارگاهِ جاده" },
        { it: "i lavori in corso", fa: "کارِ در حالِ انجام" },
        { it: "preavvisa", base: "preavvisare", fa: "از قبل خبر می‌دهد" },
        { it: "il deposito di materiali", fa: "انبار کردنِ مصالح (موقت، روی جاده)" },
        { it: "gli addetti ai lavori", fa: "کارگرانِ کارگاه" },
        { it: "il restringimento della carreggiata", fa: "باریک شدنِ سواره‌رو" },
        { it: "lampeggiante", fa: "چشمک‌زن" },
      ],
    },
    {
      kind: "trap",
      title: "خبر یا دستور؟",
      body: "هر دو جمله درباره‌ی کارگرهاست. فقط یکی چیزی می‌گوید که تابلو واقعاً می‌گوید:",
      examples: [
        {
          sourceId: "3530",
          sign: 275,
          textIt: "Il segnale raffigurato preavvisa la eventuale presenza di uomini che lavorano presso o sulla carreggiata",
          answer: 1,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "preavvisa la eventuale presenza di uomini che lavorano", fa: "از حضورِ احتمالیِ افرادی که کار می‌کنند از قبل خبر می‌دهد", verb: "preavvisa ← preavvisare" },
            { it: "presso o sulla carreggiata", fa: "کنارِ سواره‌رو یا روی آن" },
          ],
          translation: "تابلوی تصویر از حضورِ احتمالیِ افرادی که کنارِ سواره‌رو یا روی آن کار می‌کنند از قبل خبر می‌دهد.",
          why: "درست است. خبر دادن از خطر، کارِ همین تابلوست.",
        },
        {
          sourceId: "3535",
          sign: 275,
          textIt: "Il segnale raffigurato obbliga a dare la precedenza agli addetti ai lavori",
          answer: 0,
          chunks: [
            { it: SIGN, fa: SIGN_FA },
            { it: "obbliga a dare la precedenza", fa: "مجبور می‌کند حق تقدم بدهی", verb: "obbliga ← obbligare", focus: "contrast" },
            { it: "agli addetti ai lavori", fa: "به کارگرانِ کارگاه" },
          ],
          translation: "تابلوی تصویر مجبور می‌کند به کارگرانِ کارگاه حق تقدم بدهی.",
          why: "غلط است. LAVORI تابلوی خطر است: خبر می‌دهد، کسی را صاحبِ حق تقدم نمی‌کند.",
        },
      ],
      takeaway: "مثلث = خطر = خبر. «obbliga» یا «precedenza» در جمله‌ی LAVORI یعنی دام.",
      rule: "DPR 495/1992 art. 31",
    },
  ],
  practice: [
    {
      sourceId: "3531",
      sign: 275,
      textIt: "Il segnale raffigurato può essere integrato da pannello che indica la lunghezza del cantiere",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "può essere integrato da pannello", fa: "می‌تواند با یک پنل کامل شود", verb: "può ← potere" },
        { it: "che indica la lunghezza del cantiere", fa: "که طولِ کارگاه را نشان می‌دهد" },
      ],
      translation: "تابلوی تصویر می‌تواند با پنلی کامل شود که طولِ کارگاه را نشان می‌دهد.",
      why: "درست است (قدم ۱). برای کارگاهِ بلندتر از ۱۰۰ متر، پنلِ طول لازم است.",
      rule: "DPR 495/1992 art. 31",
      conceptStep: 1,
    },
    {
      sourceId: "3536",
      sign: 275,
      textIt: "Il segnale raffigurato preavvisa un senso unico alternato",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "preavvisa", fa: "از قبل خبر می‌دهد", verb: "preavvisa ← preavvisare" },
        { it: "un senso unico alternato", fa: "از یک یک‌طرفه‌ی متناوب", focus: "contrast" },
      ],
      translation: "تابلوی تصویر از یک یک‌طرفه‌ی متناوب از قبل خبر می‌دهد.",
      why: "غلط است (قدم ۱). LAVORI فقط کار را خبر می‌دهد. یک‌طرفه‌ی متناوب تابلوهای خودش را دارد (فصل ۵ درس ۸).",
      rule: "DPR 495/1992 art. 31; art. 42",
      conceptStep: 1,
    },
    {
      sourceId: "3529",
      sign: 275,
      textIt: "Il segnale raffigurato preavvisa eventuali depositi temporanei di materiali o macchinari",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "preavvisa eventuali depositi temporanei", fa: "از انبارهای موقتِ احتمالی از قبل خبر می‌دهد", verb: "preavvisa ← preavvisare" },
        { it: "di materiali o macchinari", fa: "از مصالح یا ماشین‌آلات" },
      ],
      translation: "تابلوی تصویر از انبارهای موقتِ احتمالیِ مصالح یا ماشین‌آلات از قبل خبر می‌دهد.",
      why: "درست است (قدم ۱). مصالح و ماشین‌هایی که موقتاً روی جاده گذاشته شده‌اند هم با همین تابلو خبر داده می‌شوند.",
      rule: "DPR 495/1992 art. 30 c.1; art. 31",
      conceptStep: 1,
    },
    {
      sourceId: "3673",
      sign: 297,
      textIt: "Il segnale raffigurato può essere posto prima del restringimento di carreggiata per lavori in corso",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "può essere posto", fa: "ممکن است نصب شود", verb: "può ← potere" },
        { it: "prima del restringimento di carreggiata per lavori in corso", fa: "قبل از باریک شدنِ سواره‌رو به‌خاطرِ کار", focus: "condition" },
      ],
      translation: "تابلوی تصویر ممکن است قبل از باریک شدنِ سواره‌رو به‌خاطرِ کار نصب شود.",
      why: "درست است (قدم ۲). جایی که سواره‌رو باریک شده، چراغِ موقت دو جهت را به نوبت عبور می‌دهد و این تابلو از قبل خبرش را می‌دهد.",
      rule: "DPR 495/1992 art. 42",
      conceptStep: 2,
    },
    {
      sourceId: "3675",
      sign: 297,
      textIt: "Il segnale raffigurato preavvisa un semaforo che regola il traffico in transito su ponti mobili o girevoli",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "preavvisa un semaforo", fa: "از قبل از یک چراغ راهنمایی خبر می‌دهد", verb: "preavvisa ← preavvisare" },
        { it: "che regola il traffico in transito su ponti mobili o girevoli", fa: "که عبور از پل‌های متحرک یا چرخان را تنظیم می‌کند", focus: "contrast" },
      ],
      translation: "تابلوی تصویر از قبل از چراغی خبر می‌دهد که عبور از پل‌های متحرک یا چرخان را تنظیم می‌کند.",
      why: "غلط است (قدم ۲). زمینه‌ی زرد یعنی کارگاه. پلِ متحرک تابلوی خطرِ خودش را دارد (فصل ۲ درس ۱۳).",
      rule: "DPR 495/1992 art. 30 c.3; art. 42",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["3527", "3528", "3529", "3530", "3531", "3532", "3533", "3534", "3535", "3536"] },
    { step: 2, sourceIds: ["3671", "3672", "3673", "3674", "3675", "3676", "3677", "3678"] },
  ],
};

// ── Lesson 2 ──────────────────────────────────────────────────────────────────

const BARRIERA = "La barriera raffigurata";
const BARRIERA_FA = "راه‌بندِ تصویر";
const CONO = "Il cono raffigurato";
const CONO_FA = "مخروطِ تصویر";

export const lessonBarriereConi: Lesson = {
  id: "barriere-coni-veicoli-operativi",
  titleFa: "راه‌بند، مخروط و ماشینِ کارگاه",
  titleIt: "BARRIERA · CONO · VEICOLI OPERATIVI",
  minutes: 5,
  signs: [276, 278, 279],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس سه وسیله‌ی قرمز و سفید را از هم جدا می‌کنی: راه‌بندی که دورِ کارگاه را می‌بندد، مخروطی که برای کارِ کوتاه و حادثه گذاشته می‌شود، و پنلی که پشتِ ماشینِ کارگاه می‌گوید از کدام طرف از آن رد شوی.",
      why: "۲۸ سؤال. بانک کارگاه را با پارکینگ، عوارضی و مسیرِ دوچرخه عوض می‌کند، مدتِ کار را بزرگ می‌کند و جهتِ فلش را برعکس می‌پرسد.",
    },
    {
      kind: "table",
      title: "راه‌بند (barriera normale)",
      body: "تخته‌ای افقی با نوارهای مایلِ سفید و قرمز، روی پایه. جلوی کارگاه همیشه هست و در کناره‌ها هر جا خطر باشد.",
      columns: ["قاعده"],
      rows: [
        { label: "کجا", it: "barriera normale", sign: 276, values: ["لبه‌های کارگاهِ جاده: محدوده‌ای را که کار در آن انجام می‌شود می‌بندد و نشان می‌دهد."] },
        { label: "شب و مه", it: "lanterna a luce rossa fissa", values: ["شب یا وقتی دید کم است، روی راه‌بندِ جلوی کارگاه چراغِ قرمزِ ثابت (نه چشمک‌زن) می‌گذارند."] },
        { label: "گذرگاهِ راه‌آهن", it: "sbarre guaste", values: ["بانک: اگر میله‌های گذرگاهِ راه‌آهن خراب باشند، همین راه‌بند را می‌شود به جایشان گذاشت."] },
        { label: "چه نیست", it: "non è", values: ["ورودیِ پارکینگِ سرپوشیده، پارکینگِ ماشین‌های کارگاه، جداکننده‌ی خط‌های عوارضی، پیچِ خطرناک یا مسیرِ دوچرخه نیست."] },
      ],
      takeaway: "نوارِ مایلِ سفید و قرمز = مرزِ کارگاه. شب چراغِ قرمزِ ثابت.",
      rule: "DPR 495/1992 art. 32; art. 36",
    },
    {
      kind: "table",
      title: "مخروط (cono)",
      body: "مخروطِ قرمز با حلقه‌های سفیدِ شبرنگ. سبک است و زود جمع می‌شود، پس برای کارهای کوتاه است.",
      columns: ["قاعده"],
      rows: [
        { label: "برای چه", it: "cono", sign: 278, values: ["کارِ کوتاه‌مدت (قانون: حداکثر دو روز)، رنگ زدنِ خطوط، انحرافِ موقت، محلِ حادثه، و جدا کردنِ موقتِ دو جهتِ حرکت."] },
        { label: "کارِ طولانی", it: "lavori di lunga durata", values: ["برای کارِ چندروزه (مثلاً بیش از ۱۰ روز) مخروط کافی نیست؛ راه‌بند و مسیرنماهای ثابت لازم است."] },
        { label: "چه نیست", it: "non è", values: ["علامتِ پارکِ رزروشده، علامتِ جاده‌ی پربرف یا جداکننده‌ی مسیرِ دوچرخه نیست. روی سواره‌رو گذاشته می‌شود، نه برای مانعی بیرون از آن."] },
      ],
      takeaway: "مخروط = موقت و کوتاه: کارِ چندساعته، حادثه، انحراف.",
      rule: "DPR 495/1992 art. 34",
    },
    {
      kind: "table",
      title: "پنلِ پشتِ ماشینِ کارگاه",
      body: "پنلِ مربعی با نوارهای سفید و قرمز و یک دایره‌ی آبی با فلشِ مورب. فلش همان «عبورِ اجباری» فصل ۴ (درس ۵) است: از سمتی که فلش نشان می‌دهد رد شو.",
      columns: ["قاعده"],
      rows: [
        { label: "یعنی", it: "passaggio obbligatorio per veicoli operativi", sign: 279, values: ["از این ماشین از سمتی سبقت بگیر که فلش نشان می‌دهد. در تصویر فلش رو به پایین و راست است: از راست."] },
        { label: "روی چه", it: "veicoli per lavori stradali", values: ["ماشینِ کار یا نگه‌داریِ جاده که روی سواره‌رو ایستاده یا خیلی آهسته جلو می‌رود."] },
        { label: "رفتار", it: "diminuire la velocità", values: ["سرعت را کم کن: جلوتر ماشینی ایستاده یا آهسته است."] },
        { label: "چه نیست", it: "non è", values: ["دستورِ پیچیدن یا توقف به راست نیست و نمی‌گوید خطِ راست بسته است."] },
      ],
      takeaway: "فلش سمتِ عبور را نشان می‌دهد. در این تصویر: از راست.",
      rule: "DPR 495/1992 art. 38",
    },
    {
      kind: "classify",
      title: "کدام وسیله؟",
      body: "برای هر موقعیت بگو کدام‌یک را می‌بینی.",
      options: [
        { it: "barriera", fa: "راه‌بند" },
        { it: "cono", fa: "مخروط" },
        { it: "pannello del veicolo operativo", fa: "پنلِ ماشینِ کارگاه" },
      ],
      items: [
        { prompt: "کارگاهی که سه ماه می‌ماند و جلویش بسته شده است", answer: 0, explain: "کارِ طولانی و مرزِ ثابتِ کارگاه: راه‌بند." },
        { prompt: "دو ساعت رنگ زدنِ خطوطِ وسطِ جاده", answer: 1, explain: "کارِ کوتاه: مخروط." },
        { prompt: "تصادف شده و محل موقتاً جدا شده است", answer: 1, explain: "محلِ حادثه با مخروط جدا می‌شود." },
        { prompt: "ماشینِ نگه‌داریِ جاده که آهسته جلوی تو می‌رود", answer: 2, explain: "پنلِ پشتِ ماشین می‌گوید از کدام طرف رد شوی." },
        { prompt: "میله‌های گذرگاهِ راه‌آهن خراب‌اند", answer: 0, explain: "بانک: راه‌بند جای میله‌های خراب را می‌گیرد." },
      ],
      takeaway: "مدت را بسنج: طولانی راه‌بند، کوتاه مخروط. ماشینِ متحرک پنلِ خودش را دارد.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la barriera", fa: "راه‌بند (تخته‌ی نواری)" },
        { it: "delimita", base: "delimitare", fa: "مرزش را مشخص می‌کند" },
        { it: "la lanterna a luce rossa fissa", fa: "چراغِ قرمزِ ثابت" },
        { it: "il cono", fa: "مخروطِ ترافیکی" },
        { it: "di breve durata", fa: "کوتاه‌مدت" },
        { it: "il veicolo operativo", fa: "ماشینِ کارِ جاده" },
        { it: "in lento movimento", fa: "در حالِ حرکتِ آهسته" },
        { it: "deve essere sorpassato", base: "sorpassare", fa: "باید از او سبقت گرفته شود" },
      ],
    },
    {
      kind: "trap",
      title: "مدت مهم است",
      body: "دو جمله درباره‌ی همان مخروط. فرقشان فقط طولِ کار است:",
      examples: [
        {
          sourceId: "3547",
          sign: 278,
          textIt: "Il cono raffigurato può delimitare zone di lavoro di breve durata",
          answer: 1,
          chunks: [
            { it: CONO, fa: CONO_FA },
            { it: "può delimitare zone di lavoro", fa: "می‌تواند مرزِ محدوده‌های کار را مشخص کند", verb: "può ← potere" },
            { it: "di breve durata", fa: "کوتاه‌مدت", focus: "limit" },
          ],
          translation: "مخروطِ تصویر می‌تواند مرزِ محدوده‌های کارِ کوتاه‌مدت را مشخص کند.",
          why: "درست است. کارِ کوتاه کارِ مخروط است.",
        },
        {
          sourceId: "3552",
          sign: 278,
          textIt: "Il cono raffigurato si può usare in presenza di lavori stradali superiori a 10 giorni",
          answer: 0,
          chunks: [
            { it: CONO, fa: CONO_FA },
            { it: "si può usare", fa: "می‌شود به کار برد", verb: "si può ← potersi" },
            { it: "in presenza di lavori stradali superiori a 10 giorni", fa: "وقتی کارِ جاده بیش از ۱۰ روز طول می‌کشد", focus: "limit" },
          ],
          translation: "مخروطِ تصویر را می‌شود وقتی کارِ جاده بیش از ۱۰ روز است به کار برد.",
          why: "غلط است. قانون مخروط را برای کارِ حداکثر دو روزه می‌خواهد.",
        },
      ],
      takeaway: "در جمله‌ی مخروط دنبالِ عددِ روز بگرد: کوتاه درست، طولانی غلط.",
      rule: "DPR 495/1992 art. 34",
    },
  ],
  practice: [
    {
      sourceId: "3541",
      sign: 276,
      textIt: "La barriera raffigurata può essere integrata da lanterna a luce rossa fissa in caso di scarsa visibilità",
      answer: 1,
      chunks: [
        { it: BARRIERA, fa: BARRIERA_FA },
        { it: "può essere integrata da lanterna a luce rossa fissa", fa: "می‌تواند با چراغِ قرمزِ ثابت کامل شود", verb: "può ← potere" },
        { it: "in caso di scarsa visibilità", fa: "وقتی دید کم است", focus: "condition" },
      ],
      translation: "راه‌بندِ تصویر می‌تواند وقتی دید کم است با چراغِ قرمزِ ثابت کامل شود.",
      why: "درست است (قدم ۱). شب و در دیدِ کم، راه‌بندِ جلوی کارگاه چراغِ قرمزِ ثابت می‌گیرد.",
      rule: "DPR 495/1992 art. 36",
      conceptStep: 1,
    },
    {
      sourceId: "3549",
      sign: 278,
      textIt: "Il cono raffigurato si può usare per indicare aree interessate da incidenti",
      answer: 1,
      chunks: [
        { it: CONO, fa: CONO_FA },
        { it: "si può usare per indicare", fa: "می‌شود برای نشان دادنِ … به کار برد", verb: "si può ← potersi" },
        { it: "aree interessate da incidenti", fa: "محدوده‌هایی که حادثه در آن‌ها رخ داده" },
      ],
      translation: "مخروطِ تصویر را می‌شود برای نشان دادنِ محدوده‌هایی که حادثه در آن‌ها رخ داده به کار برد.",
      why: "درست است (قدم ۲). محلِ حادثه با مخروط جدا می‌شود.",
      rule: "DPR 495/1992 art. 34",
      conceptStep: 2,
    },
    {
      sourceId: "3555",
      sign: 278,
      textIt: "Il cono raffigurato indica un ostacolo posto fuori della carreggiata",
      answer: 0,
      chunks: [
        { it: CONO, fa: CONO_FA },
        { it: "indica un ostacolo", fa: "مانعی را نشان می‌دهد", verb: "indica ← indicare" },
        { it: "posto fuori della carreggiata", fa: "که بیرون از سواره‌رو قرار دارد", focus: "contrast" },
      ],
      translation: "مخروطِ تصویر مانعی را نشان می‌دهد که بیرون از سواره‌رو قرار دارد.",
      why: "غلط است (قدم ۲). مخروط روی سواره‌رو گذاشته می‌شود تا بخشی از آن را موقتاً جدا کند.",
      rule: "DPR 495/1992 art. 34",
      conceptStep: 2,
    },
    {
      sourceId: "3557",
      sign: 279,
      textIt: "Il segnale raffigurato indica il lato dal quale il veicolo su cui è posto deve essere sorpassato",
      answer: 1,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica il lato dal quale", fa: "سمتی را نشان می‌دهد که از آن", verb: "indica ← indicare" },
        { it: "il veicolo su cui è posto", fa: "وسیله‌ای که تابلو رویش نصب است" },
        { it: "deve essere sorpassato", fa: "باید از آن سبقت گرفته شود", verb: "deve ← dovere" },
      ],
      translation: "تابلوی تصویر سمتی را نشان می‌دهد که باید از آن از وسیله‌ای که تابلو رویش است سبقت گرفت.",
      why: "درست است (قدم ۳). فلش سمتِ عبور از کنارِ ماشینِ کارگاه را نشان می‌دهد.",
      rule: "DPR 495/1992 art. 38",
      conceptStep: 3,
    },
    {
      sourceId: "3561",
      sign: 279,
      textIt: "Il segnale raffigurato indica di sorpassare l'ostacolo sulla sinistra",
      answer: 0,
      chunks: [
        { it: SIGN, fa: SIGN_FA },
        { it: "indica di sorpassare l'ostacolo", fa: "می‌گوید از مانع سبقت بگیری", verb: "indica ← indicare" },
        { it: "sulla sinistra", fa: "از سمتِ چپ", focus: "contrast" },
      ],
      translation: "تابلوی تصویر می‌گوید از مانع از سمتِ چپ سبقت بگیری.",
      why: "غلط است (قدم ۳). فلش رو به پایین و راست است: از راست رد شو.",
      rule: "DPR 495/1992 art. 38",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["3537", "3538", "3539", "3540", "3541", "3542", "3543", "3544", "3545", "3546"] },
    { step: 2, sourceIds: ["3547", "3548", "3549", "3550", "3551", "3552", "3553", "3554", "3555"] },
    { step: 3, sourceIds: ["3556", "3557", "3558", "3559", "3560", "3561", "3562", "3563", "3564"] },
  ],
};
