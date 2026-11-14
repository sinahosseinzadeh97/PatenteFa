/**
 * src/content/ch18-indicatori.ts
 * Chapter 18 (Luci e dispositivi acustici), lesson 4: direction indicators
 * (CdS art. 154 c.1–2): every sideways move, turn, reverse or stop is
 * signalled, on any road and to either side; following the road, staying in
 * your lane, stopping at a red light or in a queue, and braking are not.
 * The three indicator-and-overtaking questions (#5912, #5917, #5918) stay
 * mapped in chapter 15, which teaches overtaking.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter18.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_154 = "Codice della Strada, art. 154";
const DEVONO = "Si devono usare gli indicatori di direzione";
const DEVONO_FA = "باید چراغ راهنما بزنی";
const NON_DEVONO = "Non si devono usare gli indicatori di direzione";
const NON_DEVONO_FA = "نباید چراغ راهنما بزنی";
const NECESSARIO = "L’uso degli indicatori di direzione";
const NECESSARIO_FA = "زدنِ چراغ راهنما";

export const lessonIndicatori: Lesson = {
  id: "indicatori-di-direzione",
  titleFa: "چراغ راهنما: هر حرکتِ به کنار، هر دو طرف",
  titleIt: "INDICATORI DI DIREZIONE · CAMBIO DI CORSIA · SVOLTA · RETROMARCIA",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی چراغ راهنما برای کدام حرکت‌هاست (تغییرِ خط عبور، پیچیدن، راه افتادن، توقف، دنده‌عقب)، که هیچ استثنایی برای راست، یک‌طرفه یا جاده‌ی جداشده ندارد، و کِی راهنما زدن غلط است: وقتی فقط جاده را دنبال می‌کنی یا در خطِ خودت می‌ایستی.",
      why:
        "۲۲ سؤال (سه سؤالِ دیگر درباره‌ی راهنمای سبقت در فصلِ ۱۵ است). بانک استثنا می‌سازد («به چپ آری، به راست نه»، «در یک‌طرفه نه») و راهنما را جای چیزهای دیگر می‌گذارد (ترمز، پیچِ جاده، چراغ قرمز). یک سؤال همه را حل می‌کند: آیا از مسیرِ خودت به کنار می‌روی یا از جریان بیرون و داخل می‌شوی؟",
      rule: `${CDS_154} c.1–2`,
    },
    {
      kind: "table",
      title: "هر حرکتِ به کنار یا توقف = راهنما",
      body:
        "قانون اول می‌گوید مطمئن شو حرکتت خطر یا مزاحمت نمی‌سازد، بعد «با فاصله‌ی کافی قبل از حرکت» خبر بده. راهنما تمامِ مدتِ حرکت روشن می‌ماند و وقتی حرکت تمام شد خاموش می‌شود.",
      columns: ["چراغ راهنما"],
      rows: [
        { label: "تغییرِ خط عبور", it: "cambio di corsia", values: ["هر بار، روی هر جاده‌ای که خط عبور دارد."] },
        { label: "پیچیدن", it: "svolta a destra o a sinistra", values: ["هر پیچیدنی به راست یا چپ، و واردِ جاده‌ی دیگری شدن."] },
        { label: "راه افتادن", it: "immettersi nella circolazione", values: ["وقتی از کنارِ سواره‌رو واردِ جریانِ ترافیک می‌شوی."] },
        { label: "توقف", it: "uscire dalla carreggiata per una fermata", values: ["وقتی برای توقف کوتاه یا پارک به کنار یا بیرون از سواره‌رو می‌روی."] },
        { label: "آزادراه", it: "corsia di accelerazione · di decelerazione", values: ["ورود: از خطِ شتاب به سواره‌رو. خروج: از سواره‌رو به خطِ کاهشِ سرعت. هر دو با راهنما."] },
        { label: "دنده‌عقب و دور زدن", it: "retromarcia · inversione di marcia", values: ["هر دو در فهرستِ قانون‌اند."] },
        { label: "سبقت", it: "sorpasso", values: ["هم وقتی بیرون می‌روی، هم وقتی به خطِ خودت برمی‌گردی (فصلِ ۱۵)."] },
      ],
      takeaway: "از مسیرت به کنار می‌روی، واردِ جریان می‌شوی یا از آن بیرون می‌روی؟ راهنما، قبل از حرکت و تا پایانش.",
      rule: `${CDS_154} c.1–2`,
    },
    {
      kind: "table",
      title: "استثنا ندارد",
      body:
        "بانک قاعده را با یک «فقط» یا «نه» کوچک می‌کند: فقط به چپ، نه در یک‌طرفه، نه در جاده‌ی جداشده، نه به طرفِ راست. قانون چنین استثنایی ندارد: خبر برای کسی است که پشتِ سر یا کنارِ توست.",
      columns: ["قاعده"],
      rows: [
        { label: "راست مثلِ چپ", it: "a destra come a sinistra", values: ["پیچیدن به راست هم راهنما می‌خواهد؛ پیچیدن به راست داخلِ ورودیِ خودرو به ملک هم."] },
        { label: "یک‌طرفه", it: "strada a senso unico", values: ["عوض کردنِ خط عبور در یک‌طرفه هم راهنما می‌خواهد (مثلاً از راست به چپ). پارک در لبه‌ی چپِ یک‌طرفه هم."] },
        { label: "جاده‌ی جداشده", it: "carreggiate separate da spartitraffico", values: ["جداکننده‌ی وسط چیزی را عوض نمی‌کند: تغییرِ خط عبور و خروج همچنان راهنما می‌خواهد."] },
        { label: "توقف در هر لبه", it: "margine destro o sinistro", values: ["رفتن به لبه‌ی راست یا چپ برای توقف یا پارک، هر دو با راهنما."] },
      ],
      takeaway: "در جمله‌های راهنما، «non si devono» و «non è necessario» برای یک حرکتِ واقعی همیشه غلط‌اند.",
      rule: `${CDS_154} c.1–2`,
    },
    {
      kind: "table",
      title: "کِی راهنما نمی‌زنی",
      body:
        "راهنما خبرِ «من از مسیرم بیرون می‌روم» است. اگر در مسیرِ خودت می‌مانی، راهنما خبرِ غلط می‌دهد و دیگران را گیج می‌کند.",
      columns: ["چه به‌جایش"],
      rows: [
        { label: "جاده خودش می‌پیچد", it: "tornante", values: ["پیچ یا پیچِ تندِ سنجاق‌سری را دنبال می‌کنی، از مسیرت بیرون نمی‌روی: راهنما لازم نیست."] },
        { label: "در خطِ خودت", it: "marcia per file parallele", values: ["در ردیف‌های موازی، تا وقتی خط عبور را عوض نکنی، راهنما لازم نیست."] },
        { label: "پشتِ چراغ قرمز یا صف", it: "semaforo rosso · interruzione della circolazione", values: ["در خطِ خودت می‌ایستی: چراغِ ترمز کافی است. این «توقف» به معنای کنار کشیدن نیست."] },
        { label: "ترمزِ ناگهانی", it: "frenare bruscamente", values: ["چراغِ ترمز خبر می‌دهد، نه راهنمای راست. اگر ترافیک ناگهان کند شد یا صف ساخت، چراغِ خطر (چهار راهنما با هم) هشدار می‌دهد."] },
      ],
      takeaway: "راهنما = بیرون رفتن از مسیر. ماندن در مسیر، حتی ایستادن، راهنما نمی‌خواهد.",
      rule: `${CDS_154} c.1, c.5; Codice della Strada, art. 153 c.7`,
    },
    {
      kind: "classify",
      title: "راهنما می‌زنی یا نه؟",
      body: "هر موقعیت را بخوان. تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "sì, indicatori", fa: "راهنما می‌زنم" },
        { it: "no", fa: "راهنما نمی‌زنم" },
      ],
      items: [
        { prompt: "از جای پارکِ کنارِ خیابان راه می‌افتی", answer: 0, explain: "واردِ جریانِ ترافیک می‌شوی." },
        { prompt: "جاده پیچِ تندی به چپ دارد و راهِ دیگری نیست", answer: 1, explain: "جاده را دنبال می‌کنی، از مسیرت بیرون نمی‌روی." },
        { prompt: "پشتِ چراغ قرمز در خطِ خودت می‌ایستی", answer: 1, explain: "در مسیرت می‌ایستی؛ چراغِ ترمز کافی است." },
        { prompt: "در یک‌طرفه از خطِ راست به خطِ چپ می‌روی", answer: 0, explain: "تغییرِ خط عبور، یک‌طرفه هم." },
        { prompt: "به راست می‌پیچی داخلِ ورودیِ خودرو به یک ملک", answer: 0, explain: "پیچیدن به راست هم راهنما می‌خواهد." },
        { prompt: "در ردیف‌های موازی در خطِ خودت ادامه می‌دهی", answer: 1, explain: "خط عبور را عوض نمی‌کنی." },
        { prompt: "دنده‌عقب می‌روی تا پارک کنی", answer: 0, explain: "دنده‌عقب در فهرستِ قانون است." },
      ],
      takeaway: "یک سؤال: از مسیرم بیرون می‌روم یا واردش می‌شوم؟",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "gli indicatori di direzione", fa: "چراغ راهنما" },
        { it: "il cambio di corsia", fa: "تغییرِ خط عبور" },
        { it: "la manovra di svolta", fa: "پیچیدن" },
        { it: "immettersi nella circolazione", base: "immettersi", fa: "واردِ جریانِ ترافیک شدن" },
        { it: "la retromarcia", fa: "دنده‌عقب" },
        { it: "il passo carrabile", fa: "ورودیِ خودرو به ملک" },
        { it: "la corsia di decelerazione", fa: "خطِ کاهشِ سرعت" },
        { it: "la corsia di accelerazione", fa: "خطِ شتاب" },
        { it: "il tornante", fa: "پیچِ تندِ سنجاق‌سری" },
        { it: "lo spartitraffico", fa: "جداکننده‌ی وسطِ جاده" },
      ],
    },
    {
      kind: "trap",
      title: "«cambio di corsia» درست، «anche se non» غلط",
      body: "هر دو جمله درباره‌ی راهنما روی جاده‌ی چندخطه است. یکی برای تغییرِ خط عبور است، دیگری برای ماندن در خط:",
      examples: [
        {
          sourceId: "5897",
          textIt: "Si devono usare gli indicatori di direzione prima di ogni cambio di corsia, quando si viaggia su strada suddivisa in corsie",
          answer: 1,
          chunks: [
            { it: DEVONO, fa: DEVONO_FA, verb: "si devono ← dovere" },
            { it: "prima di ogni cambio di corsia,", fa: "قبل از هر تغییرِ خط عبور،", focus: "always" },
            { it: "quando si viaggia su strada suddivisa in corsie", fa: "وقتی در جاده‌ای می‌رانی که خط عبور دارد", verb: "si viaggia ← viaggiare", focus: "condition" },
          ],
          translation: "وقتی در جاده‌ای می‌رانی که خط عبور دارد، قبل از هر تغییرِ خط عبور باید چراغ راهنما بزنی.",
          why: "درست است. تغییرِ خط عبور یعنی از مسیرت به کنار می‌روی: همیشه راهنما.",
        },
        {
          sourceId: "5916",
          textIt: "L’uso degli indicatori di direzione è necessario nella marcia per file parallele, anche se non si effettuano cambiamenti di corsia",
          answer: 0,
          chunks: [
            { it: NECESSARIO, fa: NECESSARIO_FA },
            { it: "è necessario nella marcia per file parallele,", fa: "در حرکت در ردیف‌های موازی لازم است،", verb: "è ← essere" },
            { it: "anche se non si effettuano cambiamenti di corsia", fa: "حتی اگر خط عبور را عوض نکنی", verb: "si effettuano ← effettuare", focus: "negation" },
          ],
          translation: "زدنِ چراغ راهنما در حرکت در ردیف‌های موازی لازم است، حتی اگر خط عبور را عوض نکنی.",
          why: "غلط است. وقتی در خطِ خودت می‌مانی، چیزی برای خبر دادن نیست.",
        },
      ],
      takeaway: "راهنما به حرکت بسته است، نه به نوعِ جاده.",
      rule: `${CDS_154} c.1`,
    },
  ],
  practice: [
    {
      sourceId: "5899",
      textIt: "Si devono usare gli indicatori di direzione ogni volta che si deve effettuare una manovra di svolta",
      answer: 1,
      chunks: [
        { it: DEVONO, fa: DEVONO_FA, verb: "si devono ← dovere" },
        { it: "ogni volta che si deve effettuare una manovra di svolta", fa: "هر بار که باید بپیچی", verb: "si deve ← dovere", focus: "always" },
      ],
      translation: "هر بار که باید بپیچی، باید چراغ راهنما بزنی.",
      why: "درست است (قدم ۱). پیچیدن یکی از حرکت‌های فهرستِ قانون است، به راست یا چپ.",
      rule: `${CDS_154} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "5915",
      textIt: "L’uso degli indicatori di direzione è necessario quando si effettuano manovre di retromarcia",
      answer: 1,
      chunks: [
        { it: NECESSARIO, fa: NECESSARIO_FA },
        { it: "è necessario", fa: "لازم است", verb: "è ← essere" },
        { it: "quando si effettuano manovre di retromarcia", fa: "وقتی دنده‌عقب می‌روی", verb: "si effettuano ← effettuare", focus: "condition" },
      ],
      translation: "زدنِ چراغ راهنما وقتی دنده‌عقب می‌روی لازم است.",
      why: "درست است (قدم ۱). قانون «fare retromarcia» را در فهرستِ حرکت‌هایی که باید خبر بدهی آورده است.",
      rule: `${CDS_154} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "5909",
      textIt: "Si devono usare gli indicatori di direzione quando si effettua una svolta a sinistra, ma non quando si svolta a destra",
      answer: 0,
      chunks: [
        { it: DEVONO, fa: DEVONO_FA, verb: "si devono ← dovere" },
        { it: "quando si effettua una svolta a sinistra,", fa: "وقتی به چپ می‌پیچی،", verb: "si effettua ← effettuare" },
        { it: "ma non quando si svolta a destra", fa: "ولی نه وقتی به راست می‌پیچی", verb: "si svolta ← svoltare", focus: "negation" },
      ],
      translation: "وقتی به چپ می‌پیچی باید چراغ راهنما بزنی، ولی نه وقتی به راست می‌پیچی.",
      why: "غلط است (قدم ۲). قانون «voltare a destra o a sinistra» می‌گوید؛ پیچیدن به راست هم راهنما می‌خواهد.",
      rule: `${CDS_154} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "5919",
      textIt: "L’uso degli indicatori di direzione non è necessario se si deve parcheggiare il veicolo spostandosi verso il margine destro della carreggiata",
      answer: 0,
      chunks: [
        { it: NECESSARIO, fa: NECESSARIO_FA },
        { it: "non è necessario", fa: "لازم نیست", verb: "è ← essere", focus: "negation" },
        { it: "se si deve parcheggiare il veicolo", fa: "اگر باید خودرو را پارک کنی", verb: "si deve ← dovere", focus: "condition" },
        { it: "spostandosi verso il margine destro della carreggiata", fa: "و به سمتِ لبه‌ی راستِ سواره‌رو می‌روی", verb: "spostandosi ← spostarsi" },
      ],
      translation: "اگر باید خودرو را پارک کنی و به سمتِ لبه‌ی راستِ سواره‌رو می‌روی، زدنِ چراغ راهنما لازم نیست.",
      why: "غلط است (قدم ۲). رفتن به کنار برای پارک، به راست یا چپ، حرکتی است که خبر می‌خواهد.",
      rule: `${CDS_154} c.1`,
      conceptStep: 2,
    },
    {
      sourceId: "5910",
      textIt: "Si devono usare gli indicatori di direzione sinistri quando si deve percorrere un tornante verso sinistra",
      answer: 0,
      chunks: [
        { it: "Si devono usare gli indicatori di direzione sinistri", fa: "باید راهنمای چپ بزنی", verb: "si devono ← dovere", focus: "contrast" },
        { it: "quando si deve percorrere un tornante verso sinistra", fa: "وقتی باید از یک پیچِ سنجاق‌سری به چپ بگذری", verb: "si deve ← dovere", focus: "condition" },
      ],
      translation: "وقتی باید از یک پیچِ سنجاق‌سری به چپ بگذری، باید راهنمای چپ بزنی.",
      why: "غلط است (قدم ۳). پیچِ جاده را دنبال می‌کنی و از مسیرت بیرون نمی‌روی؛ راهنما خبرِ غلط می‌دهد.",
      rule: `${CDS_154} c.1`,
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["5897", "5899", "5900", "5901", "5902", "5903", "5911", "5914", "5915"] },
    { step: 2, sourceIds: ["5898", "5904", "5905", "5906", "5908", "5909", "5913", "5919"] },
    { step: 3, sourceIds: ["5907", "5910", "5916", "5920", "5921"] },
  ],
};
