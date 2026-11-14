/**
 * src/content/ch11-passaggio.ts
 * Chapter 11 (Limiti di velocità), lesson 7: speed at level crossings and what
 * to do when the barriers close on you or the vehicle stops on the tracks
 * (CdS art. 147). The level-crossing signs themselves are chapter 2's
 * `passaggi-a-livello`; linked, not repeated.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter11.test.ts
 * and `npm run verify:lessons`.
 */
import type { Lesson } from "./lessons.js";

const CDS_147 = "Codice della Strada, art. 147";
const BARRIERE = "Nel caso in cui, a un passaggio a livello, ci si trova ancora sui binari col proprio veicolo quando le barriere cominciano a chiudersi,";
const BARRIERE_FA = "اگر سرِ گذرگاهِ راه‌آهن هنوز با خودروات روی ریل باشی و راه‌بندها شروع به بسته شدن کنند،";
const GUASTO = "Nel caso in cui, per un guasto al veicolo, si rimane bloccati sulla sede ferroviaria di un passaggio a livello,";
const GUASTO_FA = "اگر به خاطرِ خرابیِ خودرو روی ریلِ گذرگاهِ راه‌آهن گیر کنی،";

export const lessonPassaggioLivello: Lesson = {
  id: "passaggio-livello-emergenza",
  titleFa: "گذرگاهِ راه‌آهن: نزدیک شدن، و گیر افتادن روی ریل",
  titleIt: "PASSAGGIO A LIVELLO · BARRIERE · VEICOLO BLOCCATO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی چرا به گذرگاهِ راه‌آهن آهسته نزدیک می‌شوی، و اگر راه‌بندها رویت بسته شد یا خودرو روی ریل خاموش شد، اول چه می‌کنی: ریل را به هر شکلی خالی می‌کنی، و اگر نشد، آدم‌ها را بیرون می‌آوری و قطار را خبر می‌کنی.",
      why:
        "۲۳ سؤال. تابلوهای گذرگاه را در فصلِ ۲، درسِ ۸ دیدی؛ این‌جا درباره‌ی رفتار است. بانک گزینه‌های «نجاتِ نصفه» را دام می‌کند: یدک را جدا کن، بار را خالی کن، باک را خالی کن، صد متر دور شو.",
      rule: `${CDS_147} c.1, c.4`,
    },
    {
      kind: "table",
      title: "نزدیک شدن: آهسته و با دقت",
      body:
        "قانون سرِ گذرگاه «بیشترین احتیاط» را می‌خواهد. با سرعتِ کم نزدیک می‌شوی تا اگر راه‌بند پایین آمد یا چراغ روشن شد، پیش از خطِ توقف بایستی (فصلِ ۲، درسِ ۸).",
      columns: ["چرا"],
      rows: [
        { label: "سرعتِ کم", it: "moderare la velocità", values: ["تا به راه‌بند نخوری و به تجهیزاتِ گذرگاه آسیب نزنی."] },
        { label: "سرعتِ زیاد هرگز", it: "velocità molto elevata", values: ["نه «برای این‌که روی ریل گیر نکنی»، نه «برای این‌که اگر نتوانستی بایستی راه‌بند را بشکنی». هر دو غلط‌اند."] },
        { label: "خطر برای خیلی‌ها", it: "pericolo per molte persone", values: ["مانورِ عجولانه برای چند ثانیه وقت، جانِ مسافرانِ قطار را هم به خطر می‌اندازد، نه فقط خودت را؛ شب و روز ندارد."] },
        { label: "«فقط یک جریمه‌ی کوچک»", it: "lieve sanzione amministrativa", values: ["غلط. تخلف سرِ گذرگاه هم جریمه‌ی سنگین دارد، هم تکرارش تعلیقِ گواهینامه؛ و مهم‌تر، خطرِ واقعی برای دیگران دارد."] },
      ],
      takeaway: "به گذرگاه آهسته نزدیک شو. چند ثانیه صرفه‌جویی ارزشِ جانِ یک قطار پر از آدم را ندارد.",
      rule: `${CDS_147} c.1, c.3, c.5–6`,
    },
    {
      kind: "table",
      title: "روی ریل ماندی",
      body:
        "قاعده‌ی اصلی یکی است: ریل را هر طور شده خالی کن. اگر خودرو تکان نمی‌خورد، هر کاری بکن تا آدم‌ها در خطر نباشند و راننده‌ی قطار به موقع خبر شود. نجاتِ «نصفه» (بار، یدک، سوخت) در کار نیست.",
      columns: ["کارِ درست"],
      rows: [
        { label: "راه‌بند دارد بسته می‌شود", it: "le barriere cominciano a chiudersi", values: ["آرامشت را حفظ کن و ریل را به هر شکلی خالی کن، اگر لازم است حتی با شکستنِ راه‌بند. خودرو را رها نکن و از آن پیاده نشو."] },
        { label: "خودرو خراب شد", it: "guasto · veicolo bloccato", values: ["هر چه زودتر بیرونش ببر: با هلِ دیگران یا یدک‌کشیدن توسطِ یک خودروی دیگر."] },
        { label: "اگر تکان نمی‌خورد", it: "se non è possibile spostarlo", values: ["همه را فوراً پیاده کن، ایستگاه را خبر کن، و هر کاری بکن تا راننده‌ی قطار پیش از رسیدن خبردار شود."] },
        { label: "تصادف روی ریل", it: "tamponamento sul passaggio a livello", values: ["حتی اگر کسی زخمی شده، خودروها باید از روی ریل کنار بروند: قطار نمی‌تواند بایستد."] },
        { label: "دام‌های بانک", it: "non è", values: ["یدک را جدا نکن و جا نگذار، بار را خالی نکن، باک را خالی نکن. فقط «خاموش کن و پیاده‌شان کن» کافی نیست؛ «صد متر دور شو» هم وظیفه‌ات نیست."] },
      ],
      takeaway: "اول ریل را خالی کن، حتی با شکستنِ راه‌بند. اگر نشد: آدم‌ها بیرون، قطار خبردار.",
      rule: `${CDS_147} c.4`,
    },
    {
      kind: "classify",
      title: "روی ریل خاموش کرده‌ای",
      body: "راه‌بندها هنوز باز است و قطاری نمی‌بینی. هر کار را بخوان: درست است یا اشتباه؟ تمرینِ آموزشی است، نه سؤالِ بانک.",
      options: [
        { it: "giusto", fa: "درست" },
        { it: "sbagliato", fa: "اشتباه" },
      ],
      items: [
        { prompt: "فوراً دوباره روشن می‌کنی؛ اگر نشد، با کمکِ دیگران خودرو را از ریل بیرون هل می‌دهی", answer: 0, explain: "اول ریل را خالی کن؛ هل دادن یا یدک‌کشی هر دو درست‌اند." },
        { prompt: "پیش از هر کاری کیف‌ها و بارِ صندوق را بیرون می‌آوری", answer: 1, explain: "بار مهم نیست؛ وقت را برای خالی کردنِ ریل بگذار." },
        { prompt: "خودرو تکان نمی‌خورد: همه را پیاده می‌کنی و ایستگاه را خبر می‌کنی", answer: 0, explain: "وقتی نمی‌شود خودرو را برد، آدم‌ها و خبر دادن به قطار مهم‌اند." },
        { prompt: "یدک را جدا می‌کنی و روی ریل می‌گذاری تا دست‌کم سواری نجات پیدا کند", answer: 1, explain: "یدکِ روی ریل هم قطار را به خطر می‌اندازد." },
      ],
      takeaway: "خالی کردنِ ریل، نه نجاتِ وسایل.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il passaggio a livello", fa: "گذرگاهِ هم‌سطحِ راه‌آهن" },
        { it: "le barriere", fa: "راه‌بندها" },
        { it: "la sede ferroviaria", fa: "مسیرِ ریل" },
        { it: "i binari", fa: "ریل‌ها" },
        { it: "sgomberare", fa: "خالی کردن (از هر مانعی)" },
        { it: "sfondare le barriere", base: "sfondare", fa: "راه‌بند را شکستن و رد شدن" },
        { it: "l'arresto forzato", fa: "توقفِ ناخواسته (مثلاً خاموش شدن)" },
        { it: "presegnalare il pericolo", base: "presegnalare", fa: "از پیش خبر دادنِ خطر" },
        { it: "i veicoli su rotaie", fa: "وسیله‌های ریلی؛ قطار" },
      ],
    },
    {
      kind: "trap",
      title: "«sgomberare in qualunque modo» درست، «abbandonare» غلط",
      body: "هر دو جمله درباره‌ی همان لحظه است: هنوز روی ریلی و راه‌بندها پایین می‌آیند.",
      examples: [
        {
          sourceId: "4188",
          textIt: "Nel caso in cui, a un passaggio a livello, ci si trova ancora sui binari col proprio veicolo quando le barriere cominciano a chiudersi, occorre sgomberare in qualunque modo la sede ferroviaria, se necessario anche sfondando le barriere",
          answer: 1,
          chunks: [
            { it: BARRIERE, fa: BARRIERE_FA, focus: "condition", verb: "cominciano ← cominciare" },
            { it: "occorre sgomberare in qualunque modo la sede ferroviaria,", fa: "باید مسیرِ ریل را به هر شکلی خالی کنی،", verb: "occorre ← occorrere" },
            { it: "se necessario anche sfondando le barriere", fa: "اگر لازم بود حتی با شکستنِ راه‌بندها", focus: "condition", verb: "sfondando ← sfondare" },
          ],
          translation: "اگر سرِ گذرگاهِ راه‌آهن هنوز با خودروات روی ریل باشی و راه‌بندها شروع به بسته شدن کنند، باید مسیرِ ریل را به هر شکلی خالی کنی، اگر لازم بود حتی با شکستنِ راه‌بندها.",
          why: "درست است. قانون صریحاً می‌گوید خودرو را از ریل بیرون ببر، حتی با شکستنِ راه‌بند.",
        },
        {
          sourceId: "4196",
          textIt: "Nel caso in cui, a un passaggio a livello, ci si trova ancora sui binari col proprio veicolo quando le barriere cominciano a chiudersi, occorre scendere e abbandonare rapidamente il veicolo per mettersi in salvo",
          answer: 0,
          chunks: [
            { it: BARRIERE, fa: BARRIERE_FA, focus: "condition", verb: "cominciano ← cominciare" },
            { it: "occorre scendere e abbandonare rapidamente il veicolo", fa: "باید پیاده شوی و خودرو را سریع رها کنی", verb: "occorre ← occorrere", focus: "contrast" },
            { it: "per mettersi in salvo", fa: "تا خودت را نجات دهی", focus: "reason" },
          ],
          translation: "اگر سرِ گذرگاهِ راه‌آهن هنوز با خودروات روی ریل باشی و راه‌بندها شروع به بسته شدن کنند، باید پیاده شوی و خودرو را سریع رها کنی تا خودت را نجات دهی.",
          why: "غلط است. خودرو کار می‌کند و راه‌بند فقط دارد بسته می‌شود: کارِ درست بیرون بردنِ آن است، نه رها کردنش روی ریل.",
        },
      ],
      takeaway: "تا خودرو حرکت می‌کند، با آن از ریل بیرون برو. پیاده شدن فقط وقتی است که دیگر نمی‌شود خودرو را برد.",
      rule: `${CDS_147} c.4`,
    },
  ],
  practice: [
    {
      sourceId: "4194",
      textIt: "Attraversare un passaggio a livello con manovra azzardata per guadagnare tempo, può essere un pericolo per molti individui, oltre che per il conducente",
      answer: 1,
      chunks: [
        { it: "Attraversare un passaggio a livello", fa: "رد شدن از گذرگاهِ راه‌آهن" },
        { it: "con manovra azzardata", fa: "با مانورِ پرخطر" },
        { it: "per guadagnare tempo,", fa: "برای این‌که وقت بخری،", focus: "reason" },
        { it: "può essere un pericolo per molti individui,", fa: "می‌تواند برای آدم‌های زیادی خطرناک باشد،", verb: "può ← potere" },
        { it: "oltre che per il conducente", fa: "علاوه بر خودِ راننده" },
      ],
      translation: "رد شدن از گذرگاهِ راه‌آهن با مانورِ پرخطر برای وقت خریدن، می‌تواند علاوه بر خودِ راننده برای آدم‌های زیادی خطرناک باشد.",
      why: "درست است (قدم ۱). در قطار آدم‌های زیادی هستند؛ خطر فقط برای تو نیست.",
      rule: `${CDS_147} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "4201",
      textIt: "I passaggi a livello vanno affrontati a velocità molto elevata per essere in grado di sfondare le barriere se non si è in grado di fermarsi per tempo a barriere abbassate",
      answer: 0,
      chunks: [
        { it: "I passaggi a livello vanno affrontati", fa: "از گذرگاه‌های راه‌آهن باید رد شد", verb: "vanno affrontati ← affrontare" },
        { it: "a velocità molto elevata", fa: "با سرعتِ خیلی زیاد", focus: "contrast" },
        { it: "per essere in grado di sfondare le barriere", fa: "تا بتوانی راه‌بندها را بشکنی", focus: "reason" },
        { it: "se non si è in grado di fermarsi per tempo", fa: "اگر نتوانی به موقع بایستی", focus: "condition" },
        { it: "a barriere abbassate", fa: "وقتی راه‌بندها پایین‌اند" },
      ],
      translation: "از گذرگاه‌های راه‌آهن باید با سرعتِ خیلی زیاد رد شد تا اگر نتوانستی وقتی راه‌بندها پایین‌اند به موقع بایستی، بتوانی آن‌ها را بشکنی.",
      why: "غلط است (قدم ۱). برعکس: آهسته نزدیک می‌شوی تا پیش از راه‌بندِ بسته بایستی. شکستنِ راه‌بند فقط برای بیرون رفتن از روی ریل است.",
      rule: `${CDS_147} c.1, c.3`,
      conceptStep: 1,
    },
    {
      sourceId: "4189",
      textIt: "Nel caso in cui, per un guasto al veicolo, si rimane bloccati sulla sede ferroviaria di un passaggio a livello, occorre adoperarsi per rimuovere il veicolo al più presto, ad esempio facendosi trainare da altri utenti",
      answer: 1,
      chunks: [
        { it: GUASTO, fa: GUASTO_FA, focus: "condition", verb: "si rimane ← rimanere" },
        { it: "occorre adoperarsi per rimuovere il veicolo al più presto,", fa: "باید هر کاری بکنی تا خودرو را هر چه زودتر بیرون ببری،", verb: "occorre ← occorrere" },
        { it: "ad esempio facendosi trainare da altri utenti", fa: "مثلاً با این‌که دیگران تو را یدک بکشند", verb: "facendosi trainare ← trainare" },
      ],
      translation: "اگر به خاطرِ خرابیِ خودرو روی ریلِ گذرگاهِ راه‌آهن گیر کنی، باید هر کاری بکنی تا خودرو را هر چه زودتر بیرون ببری، مثلاً با این‌که دیگران تو را یدک بکشند.",
      why: "درست است (قدم ۲). قدمِ اول همیشه خالی کردنِ ریل است؛ هلِ دیگران یا یدک‌کشی هر دو راه‌اند.",
      rule: `${CDS_147} c.4`,
      conceptStep: 2,
    },
    {
      sourceId: "4205",
      textIt: "Nel caso in cui un veicolo rimanga fermo tra le barriere chiuse del passaggio a livello occorre allontanarsi di almeno cento metri il prima possibile",
      answer: 0,
      chunks: [
        { it: "Nel caso in cui un veicolo rimanga fermo", fa: "اگر خودرویی متوقف بماند", focus: "condition", verb: "rimanga ← rimanere" },
        { it: "tra le barriere chiuse del passaggio a livello", fa: "بینِ راه‌بندهای بسته‌ی گذرگاهِ راه‌آهن" },
        { it: "occorre allontanarsi di almeno cento metri", fa: "باید دست‌کم صد متر دور شوی", verb: "occorre ← occorrere", focus: "contrast" },
        { it: "il prima possibile", fa: "هر چه زودتر" },
      ],
      translation: "اگر خودرویی بینِ راه‌بندهای بسته‌ی گذرگاهِ راه‌آهن متوقف بماند، باید هر چه زودتر دست‌کم صد متر دور شوی.",
      why: "غلط است (قدم ۲). وظیفه‌ات دور شدن نیست؛ ریل را خالی کن، یا اگر نشد آدم‌ها را بیرون بیاور و قطار را خبر کن.",
      rule: `${CDS_147} c.4`,
      conceptStep: 2,
    },
    {
      sourceId: "4160",
      textIt: "In caso di arresto forzato di un veicolo sui binari di un passaggio a livello, se non è possibile spostarlo subito dai binari, bisogna far scendere immediatamente tutte le persone che si trovano a bordo, e avvisare la stazione ferroviaria",
      answer: 1,
      chunks: [
        { it: "In caso di arresto forzato di un veicolo", fa: "اگر خودرویی ناخواسته بایستد", focus: "condition" },
        { it: "sui binari di un passaggio a livello,", fa: "روی ریل‌های گذرگاهِ راه‌آهن،" },
        { it: "se non è possibile spostarlo subito dai binari,", fa: "اگر نشود فوراً آن را از روی ریل برد،", focus: "condition" },
        { it: "bisogna far scendere immediatamente tutte le persone", fa: "باید فوراً همه‌ی کسانی را پیاده کنی", verb: "bisogna ← bisognare" },
        { it: "che si trovano a bordo,", fa: "که داخلش هستند،" },
        { it: "e avvisare la stazione ferroviaria", fa: "و ایستگاهِ راه‌آهن را خبر کنی" },
      ],
      translation: "اگر خودرویی روی ریل‌های گذرگاهِ راه‌آهن ناخواسته بایستد و نشود فوراً آن را از روی ریل برد، باید فوراً همه‌ی کسانی را که داخلش هستند پیاده کنی و ایستگاهِ راه‌آهن را خبر کنی.",
      why: "درست است (قدم ۲). وقتی بردنِ خودرو ممکن نیست، آدم‌ها و خبر دادن به قطار اولویت دارند.",
      rule: `${CDS_147} c.4`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["4191", "4192", "4193", "4194", "4200", "4201", "4202", "4203"] },
    {
      step: 2,
      sourceIds: ["4159", "4160", "4161", "4187", "4188", "4189", "4190", "4195", "4196", "4197", "4198", "4199", "4204", "4205", "4206"],
    },
  ],
};
