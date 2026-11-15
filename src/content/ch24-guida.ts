/**
 * src/content/ch24-guida.ts
 * Chapter 24 (Consumi, ambiente e inquinamento), lessons 3–4: how the way you
 * drive changes fuel use and exhaust (bank groups 612, 617, 618, 620, 621, 622
 * in part).
 *
 *  L3 smooth driving: steady speed, a lower speed where suitable, flat and
 *     flowing roads, no hard acceleration or braking, the right gear; a safe
 *     following distance is what makes a steady speed possible.
 *  L4 throttle that moves nothing (revving at a standstill, with the clutch
 *     down, in neutral, before a gear change, at full revs) and the cold engine
 *     (catalyst, pumping the pedal, short trips); engine off when stopped for
 *     long, never while moving.
 *
 * Chapter 11 (downhill in neutral), chapter 12 (distance) and chapter 16 (engine
 * on for the air conditioning while parked) are linked by lesson title, not
 * repeated. Trust rules as in src/content/lessons.ts; tests/chapter24.test.ts.
 */
import type { Lesson } from "./lessons.js";
import { CDS, CHOICES, COMPARE, EXERCISE, GUIDA_CO2, ISPRA_FREDDO, TECNICA } from "./ch24-common.js";

const DIM = "Per diminuire l'inquinamento dell'aria provocato dai veicoli,";
const DIM_FA = "برای کم کردنِ آلودگیِ هوای ناشی از وسیله‌ها،";
const PUO = "L'inquinamento dell'aria prodotto dai veicoli a motore";
const PUO_FA = "آلودگیِ هوای ناشی از وسیله‌های موتوری";

export const lessonGuidaFluida: Lesson = {
  id: "guida-fluida",
  titleFa: "رانندگیِ نرم: سرعتِ ثابت، پیش‌بینی، دنده‌ی درست",
  titleIt: "STILE DI GUIDA: VELOCITÀ COSTANTE · ANTICIPO · MARCE",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی چرا رانندگیِ نرم هم سوختِ کمتری می‌خواهد و هم گازِ اگزوزِ کمتری می‌دهد: هر گازِ تند انرژی‌ای می‌خواهد که ترمزِ بعدی دور می‌ریزد. و یاد می‌گیری دنده را طوری انتخاب کنی که موتور بی‌دلیل در دورِ بالا نماند.",
      why:
        "۹ سؤال، همه درست به جز دو تا. جمله‌ی غلط یا «تند گاز بده و محکم ترمز کن» را صرفه‌جویی می‌داند، یا «همیشه با دنده‌ی سنگین برو» را راهِ کم کردنِ آلودگی.",
      rule: GUIDA_CO2,
    },
    {
      kind: "table",
      title: "چرا نرم یعنی کم‌مصرف",
      body:
        "خودرو برای رسیدن به سرعت انرژی می‌گیرد و ترمز همان انرژی را به گرما تبدیل می‌کند و دور می‌ریزد. هرچه کمتر گاز و ترمزِ بی‌دلیل، سوخت و اگزوزِ کمتر. برای موتورِ احتراقی، سوختِ کمتر یعنی آلودگیِ کمتر:",
      columns: ["چه کنی", "چرا"],
      rows: [
        { label: "سرعتِ ثابت", it: "costante la velocità", values: ["تا جایی که ترافیک اجازه می‌دهد سرعت را یکنواخت نگه دار", "هر بار تند شدن و کند شدن انرژی هدر می‌دهد"] },
        { label: "سرعتِ مناسب‌تر، نه زیادتر", it: "diminuendo opportunamente la velocità", values: ["زیرِ حدِ مجاز و متناسب با جاده و ترافیک برو", "با سرعت، مقاومتِ هوا و مصرف تند بالا می‌رود"] },
        { label: "راه افتادنِ آرام", it: "non accelerare bruscamente durante le partenze", values: ["پشتِ چراغ آرام گاز بده", "گازِ تند بیشترین سوخت و اگزوز را دارد"] },
        { label: "پیش‌بینی", it: "accelerare e frenare spesso", values: ["دور را ببین؛ چراغ قرمزِ جلو را که دیدی، پا را زودتر از گاز بردار", "ترمزِ کمتر، گازِ کمتر"] },
        { label: "فاصله‌ی ایمنی", it: "distanza di sicurezza", values: ["فاصله را کم نکن تا سوخت صرفه‌جویی شود", "فاصله‌ی کافی است که سرعتِ یکنواخت را ممکن می‌کند (فصلِ ۱۲، «دو عددِ قانون، و جاهایی که فاصله بیشتر می‌شود»)"] },
        { label: "جاده‌ی هموار و روان", it: "strade pianeggianti e più scorrevoli", values: ["اگر حق انتخاب داری، جاده‌ی صاف و کم‌ترافیک", "سربالایی و ایست‌وحرکت انرژی می‌خواهند"] },
      ],
      takeaway: "نرم، یکنواخت، با پیش‌بینی. هیچ صرفه‌جویی‌ای به اندازه‌ی کم کردنِ فاصله‌ی ایمنی نمی‌ارزد؛ اصلاً نمی‌ارزد.",
      rule: `${GUIDA_CO2}; ${CDS("141")}; ${CDS("149")}`,
    },
    {
      kind: "table",
      title: "دنده‌ی درست",
      body:
        "دنده‌ی سنگین (اول، دوم) برای راه افتادن و سربالاییِ تند است. اگر بی‌دلیل در آن بمانی، موتور در دورِ بالا می‌چرخد و بیشتر می‌سوزاند. راهنمای رسمی می‌گوید زود به دنده‌ی بالاتر برو، به شرطی که موتور نرم کار کند و ترافیک اجازه دهد:",
      columns: ["چه کنی", "استثنا"],
      rows: [
        { label: "دنده‌ی سنگینِ طولانی", it: "una marcia bassa per troppo tempo", values: ["بی‌دلیل در آن نمان", "سربالاییِ تند، یدک، راه افتادن"] },
        { label: "«همیشه دنده‌ی سنگین»", it: "sempre con marce basse", values: ["غلط: آلودگی را بیشتر می‌کند، نه کمتر", "—"] },
        { label: "نشانگرِ تعویضِ دنده", it: "indicatore cambio marcia", values: ["اگر خودرو دارد، از آن پیروی کن", "عددِ دورِ «ایده‌آل» برای همه‌ی خودروها وجود ندارد"] },
        { label: "کم کردنِ سرعت", it: "rilasciando il pedale dell'acceleratore", values: ["پا را از گاز بردار و دنده را نگه دار", "در سرازیری هم با دنده؛ دنده خلاص نه (فصلِ ۱۱، «سرازیریِ طولانی: نه دنده خلاص، نه موتورِ خاموش»)"] },
        { label: "خودکار و برقی", it: "cambio automatico · veicolo elettrico", values: ["دنده را خودرو انتخاب می‌کند؛ نرمیِ پا همان‌قدر مهم است", "برقی دنده ندارد؛ گازِ نرم و پیش‌بینی بُرد را بیشتر می‌کند"] },
      ],
      takeaway: "دنده‌ی سنگین فقط وقتی لازم است. کم کردنِ سرعت: پا از گاز، با دنده.",
      rule: `${GUIDA_CO2}; ${TECNICA}`,
    },
    {
      kind: "classify",
      title: "مقایسه کن: کدام نرم‌تر و کم‌مصرف‌تر است؟",
      body: `${COMPARE} برای هر جفت جواب بده:`,
      options: CHOICES,
      items: [
        {
          pair: { a: "تند گاز می‌دهد تا چراغِ بعدی، بعد محکم ترمز می‌کند", b: "قرمزِ جلو را از دور می‌بیند، آرام گاز می‌دهد و زود پا را برمی‌دارد", differs: "شیوه‌ی گاز و ترمز" },
          prompt: "کدام سوخت و گازِ اگزوزِ کمتری دارد؟",
          answer: 1,
          explain: "تنها فرق شیوه‌ی گاز و ترمز است. گازِ تندِ الف را ترمزِ محکم دور می‌ریزد (قدمِ ۱).",
        },
        {
          pair: { a: "با دنده‌ای که نشانگرِ خودرو پیشنهاد می‌دهد", b: "در جاده‌ی صاف، مدتِ طولانی در دنده‌ی دوم", differs: "دنده" },
          prompt: "کدام سوختِ کمتری مصرف می‌کند؟",
          answer: 0,
          explain: "دنده‌ی سنگینِ بی‌دلیل موتور را در دورِ بالا نگه می‌دارد (قدمِ ۲).",
        },
        {
          pair: { a: "پشتِ یک کامیون می‌چسبد «تا هوا کمتر جلویش را بگیرد»", b: "فاصله‌ی ایمنی را نگه می‌دارد و سرعتش را یکنواخت می‌کند", differs: "فاصله با خودروی جلو" },
          prompt: "کدام انتخاب درست است؟",
          answer: 1,
          explain: "چسبیدن به خودروی جلو هیچ‌وقت راهِ صرفه‌جویی نیست؛ اگر کامیون ترمز کند جای ایستادن نداری. فاصله سرعتِ یکنواخت را ممکن می‌کند (قدمِ ۱).",
        },
        {
          pair: { a: "سرازیریِ طولانی با دنده خلاص", b: "همان سرازیری با دنده، پا از گاز", differs: "دنده خلاص یا دنده‌ی درگیر" },
          prompt: "کدام انتخاب درست است؟",
          answer: 1,
          explain: "با دنده، ترمزِ موتور سرعت را نگه می‌دارد و ترمز و فرمان کمک دارند؛ راهنمای رسمی می‌گوید در این حالت موتور سوختی مصرف نمی‌کند (قدمِ ۲، فصلِ ۱۱).",
        },
        {
          pair: { a: "مسیرِ صاف و روان ولی کمی طولانی‌تر", b: "مسیرِ کوتاه‌تر با سربالایی و چراغ‌های زیاد", differs: "طولِ مسیر و نوعِ جاده، هر دو با هم" },
          prompt: "کدام سوختِ کمتری مصرف می‌کند؟",
          answer: 2,
          explain: "دو چیز با هم عوض شده: طولِ مسیر و نوعِ جاده. بانک می‌گوید «در صورتِ امکان» جاده‌ی هموار؛ ولی بدونِ دانستنِ فاصله‌ها نمی‌شود گفت کدام برنده است.",
        },
        {
          pair: { a: "در آزادراهِ خلوت، یکنواخت و دقیقاً با حدِ مجاز", b: "همان‌جا، یکنواخت و کمی زیرِ حد", differs: "سرعت" },
          prompt: "کدام سوختِ کمتری مصرف می‌کند؟",
          answer: 1,
          explain: "فقط سرعت عوض شده؛ با سرعتِ بیشتر مقاومتِ هوا و مصرف تند بالا می‌روند (قدمِ ۱). ولی نه آن‌قدر کند که مانعِ ترافیک شوی: سرعت باید با جاده و ترافیک بخواند.",
        },
      ],
      takeaway: "نرمی و پیش‌بینی صرفه‌جویی می‌آورند؛ فاصله‌ی ایمنی و دنده‌ی درگیر در سرازیری هیچ‌وقت فدای آن نمی‌شوند.",
      rule: GUIDA_CO2,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "lo stile di guida", fa: "شیوه‌ی رانندگی" },
        { it: "la velocità costante", fa: "سرعتِ ثابت" },
        { it: "accelerare bruscamente", fa: "تند گاز دادن", base: "accelerare" },
        { it: "frenare energicamente", fa: "محکم ترمز کردن", base: "frenare" },
        { it: "la partenza", fa: "راه افتادن" },
        { it: "la marcia bassa", fa: "دنده‌ی سنگین" },
        { it: "strade pianeggianti e scorrevoli", fa: "جاده‌های هموار و روان" },
        { it: "diminuire", fa: "کم کردن، کم شدن", base: "diminuire" },
        { it: "l'inquinamento dell'aria", fa: "آلودگیِ هوا" },
      ],
    },
    {
      kind: "trap",
      title: "سرعت: «costante» یا «energicamente»؟",
      body: "هر دو جمله درباره‌ی شیوه‌ی گاز دادن‌اند. یکی یکنواختی را می‌گوید، دیگری گاز و ترمزِ محکم را:",
      examples: [
        {
          sourceId: "6753",
          textIt: "Mantenendo il più possibile costante la velocità, si riduce il consumo di carburante",
          answer: 1,
          chunks: [
            { it: "Mantenendo il più possibile costante la velocità,", fa: "با ثابت نگه داشتنِ سرعت تا جایی که می‌شود،", verb: "mantenendo ← mantenere", focus: "condition" },
            { it: "si riduce il consumo di carburante", fa: "مصرفِ سوخت کم می‌شود", verb: "si riduce ← ridurre" },
          ],
          translation: "با ثابت نگه داشتنِ سرعت تا جایی که می‌شود، مصرفِ سوخت کم می‌شود.",
          why: "درست است. «il più possibile» یعنی تا جایی که ترافیک و ایمنی اجازه دهند.",
        },
        {
          sourceId: "6764",
          textIt: "Per consumare meno carburante conviene accelerare e frenare energicamente",
          answer: 0,
          chunks: [
            { it: "Per consumare meno carburante", fa: "برای این‌که سوختِ کمتری مصرف شود،", focus: "reason" },
            { it: "conviene accelerare e frenare energicamente", fa: "بهتر است محکم گاز بدهی و محکم ترمز کنی", verb: "conviene ← convenire", focus: "contrast" },
          ],
          translation: "برای این‌که سوختِ کمتری مصرف شود، بهتر است محکم گاز بدهی و محکم ترمز کنی.",
          why: "غلط است. گاز و ترمزِ محکم بیشترین هدر رفتنِ انرژی است.",
        },
      ],
      takeaway: "«bruscamente», «energicamente», «spesso» کنارِ گاز و ترمز: مصرف و آلودگیِ بیشتر.",
      rule: GUIDA_CO2,
    },
  ],
  practice: [
    {
      sourceId: "6755",
      textIt: "Diminuendo opportunamente la velocità diminuisce il consumo di carburante",
      answer: 1,
      chunks: [
        { it: "Diminuendo opportunamente la velocità", fa: "با کم کردنِ به‌جای سرعت", verb: "diminuendo ← diminuire", focus: "condition" },
        { it: "diminuisce il consumo di carburante", fa: "مصرفِ سوخت کم می‌شود", verb: "diminuisce ← diminuire" },
      ],
      translation: "با کم کردنِ به‌جای سرعت، مصرفِ سوخت کم می‌شود.",
      why: "درست است (قدم ۱). «opportunamente» یعنی به‌اندازه و متناسب با جاده و ترافیک، نه آن‌قدر که مانعِ دیگران شوی.",
      rule: GUIDA_CO2,
      conceptStep: 1,
    },
    {
      sourceId: "6787",
      textIt: "Per diminuire l'inquinamento provocato dai veicoli non bisogna accelerare bruscamente durante le partenze",
      answer: 1,
      chunks: [
        { it: "Per diminuire l'inquinamento provocato dai veicoli", fa: "برای کم کردنِ آلودگیِ ناشی از وسیله‌ها", focus: "reason" },
        { it: "non bisogna accelerare bruscamente durante le partenze", fa: "نباید هنگامِ راه افتادن تند گاز داد", focus: "negation", verb: "bisogna ← bisognare" },
      ],
      translation: "برای کم کردنِ آلودگیِ ناشی از وسیله‌ها، نباید هنگامِ راه افتادن تند گاز داد.",
      why: "درست است (قدم ۱). گازِ تند در راه افتادن بیشترین سوخت و گازِ اگزوز را دارد.",
      rule: GUIDA_CO2,
      conceptStep: 1,
    },
    {
      sourceId: "6788",
      textIt: "Per diminuire l'inquinamento, bisogna evitare di tenere inserita per troppo tempo una marcia bassa, se non è necessaria",
      answer: 1,
      chunks: [
        { it: "Per diminuire l'inquinamento,", fa: "برای کم کردنِ آلودگی،", focus: "reason" },
        { it: "bisogna evitare di tenere inserita per troppo tempo una marcia bassa,", fa: "باید از ماندنِ طولانی در دنده‌ی سنگین پرهیز کرد،", verb: "bisogna ← bisognare" },
        { it: "se non è necessaria", fa: "اگر لازم نیست", focus: "condition" },
      ],
      translation: "برای کم کردنِ آلودگی، اگر لازم نیست باید از ماندنِ طولانی در دنده‌ی سنگین پرهیز کرد.",
      why: "درست است (قدم ۲). دنده‌ی سنگینِ بی‌دلیل موتور را در دورِ بالا نگه می‌دارد. «se non è necessaria» برای سربالاییِ تند و راه افتادن جا می‌گذارد.",
      rule: GUIDA_CO2,
      conceptStep: 2,
    },
    {
      sourceId: "6815",
      textIt: "L'inquinamento dell'aria prodotto dai veicoli a motore può diminuire se si circola sempre con marce basse",
      answer: 0,
      chunks: [
        { it: PUO, fa: PUO_FA },
        { it: "può diminuire", fa: "ممکن است کم شود", verb: "può ← potere" },
        { it: "se si circola sempre con marce basse", fa: "اگر همیشه با دنده‌ی سنگین رانندگی کنی", focus: "always" },
      ],
      translation: "آلودگیِ هوای ناشی از وسیله‌های موتوری ممکن است کم شود، اگر همیشه با دنده‌ی سنگین رانندگی کنی.",
      why: "غلط است (قدم ۲). «sempre con marce basse» آلودگی را بیشتر می‌کند؛ دنده‌ی سنگین فقط وقتی لازم است.",
      rule: GUIDA_CO2,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6753", "6755", "6757", "6764", "6787", "6797", "6821"] },
    { step: 2, sourceIds: ["6788", "6815"] },
  ],
};

export const lessonMitiMotore: Lesson = {
  id: "miti-del-motore",
  titleFa: "باورهای غلط درباره‌ی گاز دادن و موتورِ سرد",
  titleIt: "MITI: COLPI DI ACCELERATORE · FOLLE · FRIZIONE · MOTORE FREDDO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی گاز دادنی که خودرو را جلو نمی‌برد (درجا، با کلاچِ گرفته، با دنده خلاص، پیش از عوض کردنِ دنده) فقط سوخت، صدا و گازِ اگزوز است. و می‌دانی موتورِ سرد بیشتر می‌آلاید، پس گرم کردنِ درجا و سفرهای خیلی کوتاه کمکی نمی‌کنند. و یاد می‌گیری کِی موتور را خاموش کنی و کِی هرگز.",
      why:
        "۱۲ سؤال، همه غلط به جز دو تا. بانک کارهای قدیمی و بی‌فایده را راهِ کم کردنِ آلودگی جا می‌زند: «پدال را چند بار فشار بده تا موتور گرم شود»، «قبل از کلاچ یک گاز بده»، «موتور را در حداکثر دور نگه دار»، «گازِ کامل آلودگی را می‌سوزاند».",
      rule: GUIDA_CO2,
    },
    {
      kind: "table",
      title: "گازی که خودرو را جلو نمی‌برد",
      body:
        "وقتی موتور به چرخ‌ها وصل نیست (درجا، کلاچِ گرفته، دنده خلاص) یا در لحظه‌ی عوض کردنِ دنده، هر گازی فقط سوخت می‌سوزاند و گرما، صدا و گازِ اگزوز می‌سازد. هیچ کدامِ این کارها آلودگی را کم نمی‌کند:",
      columns: ["چرا غلط است"],
      rows: [
        { label: "گاز دادنِ درجا «برای گرم ماندنِ موتور»", it: "accelerare ripetutamente da fermo", values: ["موتورِ ایستاده دیرتر گرم می‌شود، نه زودتر؛ فقط سوخت و صدا"] },
        { label: "گاز با کلاچِ گرفته", it: "tenendo premuto il pedale della frizione", values: ["موتور جدا از چرخ‌هاست؛ سوخت می‌رود، خودرو نمی‌رود"] },
        { label: "گاز با دنده خلاص", it: "con il cambio in folle", values: ["همان: انرژی به هیچ جا نمی‌رسد"] },
        { label: "یک گاز پیش از کلاچ", it: "un breve colpo di acceleratore", values: ["عادتِ خودروهای بسیار قدیمی؛ امروز فقط سوخت و صداست"] },
        { label: "حداکثر دورِ موتور / گازِ کامل هنگامِ دنده", it: "al massimo numero di giri · a fondo", values: ["بیشترین سوخت و بیشترین آلودگی و صدا"] },
        { label: "«گازِ کامل آلودگی را می‌سوزاند»", it: "scompare del tutto accelerando a fondo", values: ["هیچ چیزی آلودگی را «کاملاً» از بین نمی‌برد؛ گازِ کامل بیشترش می‌کند"] },
      ],
      takeaway: "گازی که خودرو را جلو نمی‌برد، همیشه هدر است. هر «برای کم کردنِ آلودگی، گاز بده…» غلط است.",
      rule: `${GUIDA_CO2}; ${TECNICA}`,
    },
    {
      kind: "table",
      title: "موتورِ سرد، سفرِ کوتاه، و خاموش کردن",
      body:
        "مبدلِ کاتالیستی فقط وقتی داغ شده خوب کار می‌کند. پس در دقیقه‌های اولِ بعد از روشن کردن، موتور بیشتر می‌آلاید. راهنمای رسمی می‌گوید: زود و آرام راه بیفت؛ موتور را درجا گرم نکن:",
      columns: ["چه کنی", "مراقب باش"],
      rows: [
        { label: "تازه روشن کرده‌ای", it: "subito dopo l'accensione", values: ["زود و آرام راه بیفت، بی‌دورِ بالا", "اول شیشه‌ها را از یخ و برف پاک کن؛ دید شرطِ راه افتادن است"] },
        { label: "پدال را چند بار فشار دادن", it: "premere più volte il pedale dell'acceleratore", values: ["نکن؛ موتورِ امروزی را واحدِ کنترل تنظیم می‌کند", "این کار سرد بودن را درمان نمی‌کند"] },
        { label: "سفرِ خیلی کوتاه", it: "brevi percorsi", values: ["اگر می‌شود پیاده، دوچرخه یا وسیله‌ی عمومی", "موتور و کاتالیست در سفرِ کوتاه هیچ‌وقت گرم نمی‌شوند"] },
        { label: "ایستادنِ طولانی", it: "arresto prolungato", values: ["موتور را خاموش کن؛ Start & Stop را روشن نگه دار", "فقط وقتی ایستاده‌ای؛ هرگز در حرکت، هرگز در سرازیری (فصلِ ۱۱، «سرازیریِ طولانی: نه دنده خلاص، نه موتورِ خاموش»)"] },
        { label: "پارک با موتورِ روشن برای کولر", it: "motore acceso durante la sosta", values: ["ممنوع است", "ماده‌ی ۱۵۷ بند ۷-bis (فصلِ ۱۶، «پارکِ امن، و پیاده شدن»)"] },
      ],
      takeaway: "موتورِ سرد بیشتر می‌آلاید؛ آرام راه بیفت، درجا گرمش نکن. ایستاده‌ای؟ خاموش. در حرکت؟ هرگز.",
      rule: `${GUIDA_CO2}; ${ISPRA_FREDDO}; ${CDS("157")} c.7-bis`,
    },
    {
      kind: "classify",
      title: "تمرین: درست یا باورِ غلط؟",
      body: `${EXERCISE} این جمله‌ها ساختگی‌اند، نه از بانک. درباره‌ی یک خودروی بنزینیِ امروزی، دسته کن:`,
      options: [
        { it: "vero", fa: "درست است" },
        { it: "mito", fa: "باورِ غلط است" },
      ],
      items: [
        { prompt: "صبحِ زمستان، پنج دقیقه موتور را درجا روشن بگذار تا گرم شود، بعد راه بیفت", answer: 1, explain: "موتورِ ایستاده دیرتر گرم می‌شود و در این مدت فقط می‌سوزاند (قدمِ ۲). شیشه‌ها را پاک کن و آرام راه بیفت." },
        { prompt: "در صفی که چند دقیقه تکان نمی‌خورد، خاموش کردنِ موتور سوخت و اگزوز را کم می‌کند", answer: 0, explain: "ایستاده‌ای و موتور هیچ کاری نمی‌کند (قدمِ ۲)." },
        { prompt: "کاتالیست درست بعد از روشن کردنِ موتورِ سرد بهترین کار را می‌کند", answer: 1, explain: "برعکس: کاتالیست باید داغ شود تا خوب کار کند (قدمِ ۲)." },
        { prompt: "وقتی با دنده پا را از گاز برمی‌داری تا سرعت کم شود، موتور سوختِ کمی یا هیچ مصرف نمی‌کند", answer: 0, explain: "راهنمای رسمی همین را می‌گوید، به شرطِ دنده‌ی درگیر و بی‌آن‌که موتور بیش از حد دور بگیرد." },
        { prompt: "در سرازیری موتور را خاموش کن تا اصلاً سوخت نسوزد", answer: 1, explain: "خطرناک است: ترمز و فرمان کمکشان را از دست می‌دهند (فصلِ ۱۱)." },
        { prompt: "پشتِ چراغ قرمز چند بار گاز بده تا موتور خاموش نشود", answer: 1, explain: "موتورِ سالم درجا خاموش نمی‌شود؛ این کار فقط سوخت و صداست (قدمِ ۱)." },
      ],
      takeaway: "ایستاده و بی‌کار؟ خاموش. در حرکت؟ با دنده و روشن. گازی که خودرو را جلو نمی‌برد، هیچ‌وقت کمک نمی‌کند.",
      rule: GUIDA_CO2,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il pedale della frizione", fa: "پدالِ کلاچ" },
        { it: "il cambio in folle", fa: "دنده خلاص" },
        { it: "il colpo di acceleratore", fa: "یک ضربه گاز" },
        { it: "il numero di giri", fa: "دورِ موتور" },
        { it: "il motore freddo", fa: "موتورِ سرد" },
        { it: "la temperatura di esercizio", fa: "دمای کارِ موتور" },
        { it: "la marmitta catalitica", fa: "مبدلِ کاتالیستی" },
        { it: "spegnere il motore", fa: "موتور را خاموش کردن", base: "spegnere" },
        { it: "l'arresto prolungato", fa: "ایستادنِ طولانی" },
        { it: "i brevi percorsi", fa: "مسیرهای کوتاه" },
      ],
    },
    {
      kind: "trap",
      title: "خودرو ایستاده: «spegnere» یا «accelerare»؟",
      body: "هر دو جمله درباره‌ی خودروی ایستاده‌اند. یکی می‌گوید خاموش کن، دیگری می‌گوید گاز بده تا موتور گرم بماند:",
      examples: [
        {
          sourceId: "6811",
          textIt: "L'inquinamento dell'aria prodotto dai veicoli a motore può diminuire se si spegne il motore, in caso di arresto prolungato",
          answer: 1,
          chunks: [
            { it: PUO, fa: PUO_FA },
            { it: "può diminuire se si spegne il motore,", fa: "ممکن است کم شود اگر موتور را خاموش کنی،", verb: "si spegne ← spegnere" },
            { it: "in caso di arresto prolungato", fa: "وقتی مدتِ طولانی ایستاده‌ای", focus: "condition" },
          ],
          translation: "آلودگیِ هوای ناشی از وسیله‌های موتوری ممکن است کم شود اگر موتور را خاموش کنی، وقتی مدتِ طولانی ایستاده‌ای.",
          why: "درست است. «in caso di arresto prolungato»: فقط ایستاده؛ هرگز در حرکت.",
        },
        {
          sourceId: "6793",
          textIt: "Per diminuire l'inquinamento dell'aria provocato dai veicoli, bisogna accelerare ripetutamente da fermo, per tenere caldo il motore e migliorarne il rendimento",
          answer: 0,
          chunks: [
            { it: DIM, fa: DIM_FA, focus: "reason" },
            { it: "bisogna accelerare ripetutamente da fermo,", fa: "باید درجا پشتِ سرِ هم گاز داد،", verb: "bisogna ← bisognare", focus: "contrast" },
            { it: "per tenere caldo il motore e migliorarne il rendimento", fa: "تا موتور گرم بماند و بازدهش بهتر شود", focus: "reason" },
          ],
          translation: "برای کم کردنِ آلودگیِ هوای ناشی از وسیله‌ها، باید درجا پشتِ سرِ هم گاز داد تا موتور گرم بماند و بازدهش بهتر شود.",
          why: "غلط است. گازِ درجا خودرو را جلو نمی‌برد؛ فقط سوخت، صدا و اگزوز است.",
        },
      ],
      takeaway: "خودروی ایستاده: «spegnere» درست، «accelerare da fermo» غلط.",
      rule: GUIDA_CO2,
    },
  ],
  practice: [
    {
      sourceId: "6817",
      textIt: "L'inquinamento dell'aria prodotto dai veicoli a motore può diminuire se si accelera con il cambio in folle",
      answer: 0,
      chunks: [
        { it: PUO, fa: PUO_FA },
        { it: "può diminuire", fa: "ممکن است کم شود", verb: "può ← potere" },
        { it: "se si accelera con il cambio in folle", fa: "اگر با دنده خلاص گاز بدهی", focus: "condition", verb: "si accelera ← accelerare" },
      ],
      translation: "آلودگیِ هوای ناشی از وسیله‌های موتوری ممکن است کم شود، اگر با دنده خلاص گاز بدهی.",
      why: "غلط است (قدم ۱). با دنده خلاص موتور به چرخ‌ها وصل نیست؛ گاز فقط سوخت و اگزوز است.",
      rule: TECNICA,
      conceptStep: 1,
    },
    {
      sourceId: "6822",
      textIt: "Per diminuire l'inquinamento dell'aria provocato dai veicoli, bisogna dare un breve colpo di acceleratore, prima di abbassare la frizione per cambiare marcia",
      answer: 0,
      chunks: [
        { it: DIM, fa: DIM_FA, focus: "reason" },
        { it: "bisogna dare un breve colpo di acceleratore,", fa: "باید یک گازِ کوتاه داد،", verb: "bisogna ← bisognare", focus: "contrast" },
        { it: "prima di abbassare la frizione per cambiare marcia", fa: "پیش از این‌که کلاچ را بگیری تا دنده عوض کنی" },
      ],
      translation: "برای کم کردنِ آلودگیِ هوای ناشی از وسیله‌ها، باید پیش از این‌که کلاچ را بگیری تا دنده عوض کنی، یک گازِ کوتاه داد.",
      why: "غلط است (قدم ۱). این گاز خودرو را جلو نمی‌برد؛ فقط می‌سوزاند و صدا می‌سازد.",
      rule: `${GUIDA_CO2}; ${TECNICA}`,
      conceptStep: 1,
    },
    {
      sourceId: "6794",
      textIt: "Nei veicoli dotati di marmitta catalitica, l'inquinamento dell'aria è minore subito dopo l'accensione del motore, quando la temperatura è ancora bassa",
      answer: 0,
      chunks: [
        { it: "Nei veicoli dotati di marmitta catalitica,", fa: "در وسیله‌هایی که مبدلِ کاتالیستی دارند،" },
        { it: "l'inquinamento dell'aria è minore subito dopo l'accensione del motore,", fa: "آلودگیِ هوا درست بعد از روشن کردنِ موتور کمتر است،", focus: "contrast" },
        { it: "quando la temperatura è ancora bassa", fa: "وقتی دما هنوز پایین است", focus: "condition" },
      ],
      translation: "در وسیله‌هایی که مبدلِ کاتالیستی دارند، آلودگیِ هوا درست بعد از روشن کردنِ موتور، وقتی دما هنوز پایین است، کمتر است.",
      why: "غلط است (قدم ۲). کاتالیست باید داغ شود تا کار کند؛ موتورِ سرد بیشتر می‌آلاید، نه کمتر.",
      rule: `${ISPRA_FREDDO}; ${TECNICA}`,
      conceptStep: 2,
    },
    {
      sourceId: "6812",
      textIt: "L'inquinamento dell'aria prodotto dai veicoli a motore può essere ridotto, evitando di usare il veicolo per brevi percorsi",
      answer: 1,
      chunks: [
        { it: PUO, fa: PUO_FA },
        { it: "può essere ridotto,", fa: "ممکن است کم شود،", verb: "può ← potere" },
        { it: "evitando di usare il veicolo per brevi percorsi", fa: "اگر برای مسیرهای کوتاه از خودرو استفاده نکنی", verb: "evitando ← evitare", focus: "condition" },
      ],
      translation: "آلودگیِ هوای ناشی از وسیله‌های موتوری ممکن است کم شود، اگر برای مسیرهای کوتاه از خودرو استفاده نکنی.",
      why: "درست است (قدم ۲). در مسیرِ کوتاه موتور و کاتالیست هیچ‌وقت گرم نمی‌شوند، پس همه‌ی راه با موتورِ سرد می‌روی.",
      rule: `${ISPRA_FREDDO}; ${GUIDA_CO2}`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6793", "6799", "6816", "6817", "6822", "6823", "6829"] },
    { step: 2, sourceIds: ["6794", "6811", "6812", "6827", "6828"] },
  ],
};
