/**
 * src/content/ch24-ripasso.ts
 * Chapter 24 (Consumi, ambiente e inquinamento): the chapter review. Twenty
 * real bank questions, two per lesson in lesson order, none shown inside a
 * lesson and none of the flagged statements; a mistake routes back to the
 * lesson section that teaches it (tests/chapter24.test.ts).
 */
import type { Lesson } from "./lessons.js";
import { AMB, CDS, EEA_AIR, GUIDA_CO2, MANUALE, TECNICA } from "./ch24-common.js";

const PUO = "L'inquinamento dell'aria prodotto dai veicoli a motore";
const PUO_FA = "آلودگیِ هوای ناشی از وسیله‌های موتوری";
const DIM = "Per diminuire l'inquinamento dell'aria provocato dai veicoli,";
const DIM_FA = "برای کم کردنِ آلودگیِ هوای ناشی از وسیله‌ها،";

export const reviewAmbiente: Lesson = {
  id: "ripasso-capitolo-24",
  titleFa: "مرور فصل ۲۴",
  titleIt: "RIPASSO · CONSUMI, AMBIENTE E INQUINAMENTO",
  minutes: 9,
  signs: [],
  review: true,
  steps: [
    {
      kind: "intro",
      title: "مرور فصل",
      objective:
        "بیست سؤالِ واقعی از بانک، دو تا از هر درس، که داخلِ درس‌ها ندیده‌ای. اگر یکی را اشتباه زدی، بازخورد شماره‌ی درسش را می‌گوید و اشتباه به همان بخشِ درس وصل می‌شود.",
      why:
        "یک حرکت در کلِ فصل تکرار می‌شود: جمله‌ی غلط کاری بی‌فایده یا مضر را «صرفه‌جویی» یا «کم کردنِ آلودگی» جا می‌زند (گاز دادنِ درجا، بار روی سقف، لاستیکِ کم‌باد، سوراخ کردنِ اگزوز)، یا چیزی را «صفر» و «همه‌جا» می‌کند. و یادت باشد: مصرف، CO₂، آلاینده‌ها و صدا چهار چیزِ جدا هستند.",
    },
    {
      kind: "table",
      title: "فصل ۲۴ در ده خط",
      body: "قبل از سؤال‌ها، نکته‌ی اصلیِ هر درس را یک بار دیگر ببین. اگر جایی برایت تازه بود، اول همان درس را دوباره باز کن.",
      columns: ["نکته‌ی اصلی"],
      rows: [
        { label: "درس ۱", it: "aria · peso · pneumatici", values: ["باربند، پنجره و سان‌روفِ باز در سرعت، وزن، لاستیکِ کم‌باد، یدک: مصرفِ بیشتر. فشار: همانِ دفترچه"] },
        { label: "درس ۲", it: "impianti · clima · tipi di veicolo", values: ["برق و کولر سوخت یا بُرد می‌خورند؛ برقی اگزوز ندارد ولی ذره‌ی لاستیک و ترمز دارد؛ هیبریدی «دو برابر» نمی‌آلاید"] },
        { label: "درس ۳", it: "guida fluida", values: ["سرعتِ یکنواخت، پیش‌بینی، دنده‌ی درست؛ فاصله‌ی ایمنی هیچ‌وقت فدای صرفه‌جویی نمی‌شود"] },
        { label: "درس ۴", it: "miti del motore", values: ["گازی که خودرو را جلو نمی‌برد هدر است؛ موتورِ سرد بیشتر می‌آلاید؛ ایستاده خاموش، در حرکت هرگز"] },
        { label: "درس ۵", it: "scarico · CO₂ · Euro", values: ["چهار چیزِ جدا؛ یورو ۰ صفر نیست؛ یوروی جدیدتر حدِ سخت‌تر؛ بی‌مجوز در موتور و اگزوز دست نبر"] },
        { label: "درس ۶", it: "manutenzione · fumo", values: ["فیلترِ هوا، انژکتور، موتورِ سالم: بله؛ فیلترِ کابین و کمک‌فنر: نه؛ دودِ تیره: بررسی"] },
        { label: "درس ۷", it: "fonti del rumore", values: ["صدا فقط از موتور نیست؛ اگزوزِ سالم و تأییدشده؛ سوراخ، بریدن، لوله‌ی باریک‌تر: نه"] },
        { label: "درس ۸", it: "guida · clacson", values: ["ترمز و گازِ تند و درِ کوبیده صدا می‌سازند؛ بوق فقط برای ایمنی؛ چشمک شب و هر وقت لازم باشد"] },
        { label: "درس ۹", it: "rifiuti del veicolo", values: ["ضدیخ، باتری، روغن: نه فاضلاب، نه زمین؛ اسقاط: مرکزِ مجاز؛ رها کردنِ زباله‌ی خطرناک جرم است"] },
        { label: "درس ۱۰", it: "divieti su tutte le strade", values: ["آسیب، انداختن، زباله، گل: همه‌جا ممنوع. تمرین، بوق، طول، پارک در محله‌ی مسکونی: قاعده دارند"] },
      ],
      takeaway: "سوختِ کمتر CO₂ را کم می‌کند، ولی آلاینده‌ها و صدا هر کدام راهِ خودشان را دارند. هیچ «گاز بده تا…» هیچ چیزی را کم نمی‌کند.",
    },
  ],
  practice: [
    {
      sourceId: "6814",
      textIt: "L'inquinamento dell'aria prodotto dai veicoli a motore può diminuire se si sistemano i bagagli sul tetto dell'autovettura",
      answer: 0,
      chunks: [
        { it: PUO, fa: PUO_FA },
        { it: "può diminuire", fa: "ممکن است کم شود", verb: "può ← potere" },
        { it: "se si sistemano i bagagli sul tetto dell'autovettura", fa: "اگر بار را روی سقفِ سواری بگذاری", focus: "condition", verb: "si sistemano ← sistemare" },
      ],
      translation: "آلودگیِ هوای ناشی از وسیله‌های موتوری ممکن است کم شود، اگر بار را روی سقفِ سواری بگذاری.",
      why: "غلط است (درس ۱). بار روی سقف مصرف را بیشتر می‌کند، و برای موتورِ احتراقی سوختِ بیشتر یعنی گازِ اگزوزِ بیشتر.",
      rule: GUIDA_CO2,
      conceptStep: 2,
    },
    {
      sourceId: "6754",
      textIt: "Il consumo di carburante aumenta con l’aumentare del peso del veicolo",
      answer: 1,
      chunks: [
        { it: "Il consumo di carburante aumenta", fa: "مصرفِ سوخت بیشتر می‌شود", verb: "aumenta ← aumentare" },
        { it: "con l’aumentare del peso del veicolo", fa: "با بیشتر شدنِ وزنِ وسیله", focus: "condition" },
      ],
      translation: "مصرفِ سوخت با بیشتر شدنِ وزنِ وسیله بیشتر می‌شود.",
      why: "درست است (درس ۱). هر کیلوی اضافه را موتور باید راه بیندازد و از سربالایی بالا ببرد.",
      rule: GUIDA_CO2,
      conceptStep: 3,
    },
    {
      sourceId: "6834",
      textIt: "In caso di arresto prolungato in galleria, per la formazione di una fila di veicoli, è dannoso per la salute azionare il comando del ricircolo dell'aria all'interno del veicolo",
      answer: 0,
      chunks: [
        { it: "In caso di arresto prolungato in galleria,", fa: "وقتی مدتِ طولانی در تونل ایستاده‌ای،", focus: "condition" },
        { it: "per la formazione di una fila di veicoli,", fa: "چون صفی از وسیله‌ها درست شده،", focus: "reason" },
        { it: "è dannoso per la salute", fa: "برای سلامتی زیان‌آور است" },
        { it: "azionare il comando del ricircolo dell'aria all'interno del veicolo", fa: "که گردشِ داخلیِ هوای خودرو را روشن کنی" },
      ],
      translation: "وقتی مدتِ طولانی در تونل ایستاده‌ای، چون صفی از وسیله‌ها درست شده، روشن کردنِ گردشِ داخلیِ هوای خودرو برای سلامتی زیان‌آور است.",
      why: "غلط است (درس ۲). گردشِ داخلی جلوی ورودِ گازِ اگزوزِ بقیه را می‌گیرد. اگر شیشه بخار گرفت، دوباره هوای بیرون را باز کن.",
      rule: MANUALE,
      conceptStep: 1,
    },
    {
      sourceId: "6810",
      textIt: "L'inquinamento dell'aria prodotto dai veicoli a motore può essere ridotto, scegliendo veicoli con alimentazione elettrica, a metano o GPL",
      answer: 1,
      chunks: [
        { it: PUO, fa: PUO_FA },
        { it: "può essere ridotto,", fa: "ممکن است کم شود،", verb: "può ← potere" },
        { it: "scegliendo veicoli con alimentazione elettrica, a metano o GPL", fa: "با انتخابِ وسیله‌های برقی، متانی یا گازِ مایع", verb: "scegliendo ← scegliere", focus: "condition" },
      ],
      translation: "آلودگیِ هوای ناشی از وسیله‌های موتوری ممکن است با انتخابِ وسیله‌های برقی، متانی یا گازِ مایع کم شود.",
      why: "درست است (درس ۲). «può essere ridotto»: کم، نه صفر. برقی اگزوز ندارد؛ متان و گازِ مایع هنوز می‌سوزند.",
      rule: EEA_AIR,
      conceptStep: 2,
    },
    {
      sourceId: "6757",
      textIt: "Per consumare meno carburante conviene scegliere, per quanto possibile, strade pianeggianti e più scorrevoli",
      answer: 1,
      chunks: [
        { it: "Per consumare meno carburante", fa: "برای این‌که سوختِ کمتری مصرف شود،", focus: "reason" },
        { it: "conviene scegliere,", fa: "بهتر است انتخاب کنی،", verb: "conviene ← convenire" },
        { it: "per quanto possibile,", fa: "تا جایی که می‌شود،", focus: "condition" },
        { it: "strade pianeggianti e più scorrevoli", fa: "جاده‌های هموار و روان‌تر را" },
      ],
      translation: "برای این‌که سوختِ کمتری مصرف شود، بهتر است تا جایی که می‌شود جاده‌های هموار و روان‌تر را انتخاب کنی.",
      why: "درست است (درس ۳). سربالایی و ایست‌وحرکت انرژی می‌خواهند. «per quanto possibile» یعنی اگر حق انتخاب داری.",
      rule: GUIDA_CO2,
      conceptStep: 1,
    },
    {
      sourceId: "6821",
      textIt: "Per diminuire l'inquinamento dell'aria non bisogna accelerare e frenare spesso durante la marcia del veicolo",
      answer: 1,
      chunks: [
        { it: "Per diminuire l'inquinamento dell'aria", fa: "برای کم کردنِ آلودگیِ هوا", focus: "reason" },
        { it: "non bisogna accelerare e frenare spesso", fa: "نباید مدام گاز داد و ترمز کرد", verb: "bisogna ← bisognare", focus: "negation" },
        { it: "durante la marcia del veicolo", fa: "هنگامِ حرکتِ وسیله" },
      ],
      translation: "برای کم کردنِ آلودگیِ هوا، نباید هنگامِ حرکتِ وسیله مدام گاز داد و ترمز کرد.",
      why: "درست است (درس ۳). گازی که ترمزِ بعدی دور می‌ریزد، سوخت و اگزوزِ هدر است.",
      rule: GUIDA_CO2,
      conceptStep: 1,
    },
    {
      sourceId: "6823",
      textIt: "Per diminuire l'inquinamento atmosferico provocato dai veicoli, bisogna utilizzare il motore al massimo numero di giri",
      answer: 0,
      chunks: [
        { it: "Per diminuire l'inquinamento atmosferico provocato dai veicoli,", fa: "برای کم کردنِ آلودگیِ هوای ناشی از وسیله‌ها،", focus: "reason" },
        { it: "bisogna utilizzare il motore al massimo numero di giri", fa: "باید موتور را در حداکثرِ دور به کار برد", verb: "bisogna ← bisognare", focus: "contrast" },
      ],
      translation: "برای کم کردنِ آلودگیِ هوای ناشی از وسیله‌ها، باید موتور را در حداکثرِ دور به کار برد.",
      why: "غلط است (درس ۴). حداکثرِ دور بیشترین سوخت، آلودگی و صدا را دارد.",
      rule: GUIDA_CO2,
      conceptStep: 1,
    },
    {
      sourceId: "6828",
      textIt:
        "Per salvaguardare l'ambiente dall'inquinamento atmosferico, bisogna premere diverse volte e a fondo il pedale dell'acceleratore, affinché il veicolo raggiunga in fretta la temperatura di esercizio",
      answer: 0,
      chunks: [
        { it: "Per salvaguardare l'ambiente dall'inquinamento atmosferico,", fa: "برای حفظِ محیط‌زیست از آلودگیِ هوا،", focus: "reason" },
        { it: "bisogna premere diverse volte e a fondo il pedale dell'acceleratore,", fa: "باید چند بار پدالِ گاز را تا ته فشار داد،", verb: "bisogna ← bisognare", focus: "contrast" },
        { it: "affinché il veicolo raggiunga in fretta la temperatura di esercizio", fa: "تا خودرو زود به دمای کار برسد", verb: "raggiunga ← raggiungere", focus: "reason" },
      ],
      translation: "برای حفظِ محیط‌زیست از آلودگیِ هوا، باید چند بار پدالِ گاز را تا ته فشار داد تا خودرو زود به دمای کار برسد.",
      why: "غلط است (درس ۴). موتور با راه افتادنِ آرام گرم می‌شود، نه با فشار دادنِ پدال.",
      rule: GUIDA_CO2,
      conceptStep: 2,
    },
    {
      sourceId: "6789",
      textIt: "Per diminuire l’inquinamento dell’aria provocato dai veicoli con motore a scoppio, bisogna sostituire la marmitta catalitica quando la stessa è deteriorata o esausta",
      answer: 1,
      chunks: [
        { it: "Per diminuire l’inquinamento dell’aria provocato dai veicoli con motore a scoppio,", fa: "برای کم کردنِ آلودگیِ هوای ناشی از وسیله‌هایی با موتورِ احتراقی،", focus: "reason" },
        { it: "bisogna sostituire la marmitta catalitica", fa: "باید مبدلِ کاتالیستی را عوض کرد", verb: "bisogna ← bisognare" },
        { it: "quando la stessa è deteriorata o esausta", fa: "وقتی فرسوده یا ازکارافتاده است", focus: "condition" },
      ],
      translation: "برای کم کردنِ آلودگیِ هوای ناشی از وسیله‌هایی با موتورِ احتراقی، باید مبدلِ کاتالیستی را وقتی فرسوده یا ازکارافتاده است عوض کرد.",
      why: "درست است (درس ۵). کاتالیستِ فرسوده دیگر گازهای سمی را کم نمی‌کند.",
      rule: TECNICA,
      conceptStep: 3,
    },
    {
      sourceId: "6837",
      textIt: "Guidando un veicolo a cui sono stati modificati il motore e la marmitta, si può incorrere in pesanti sanzioni amministrative",
      answer: 1,
      chunks: [
        { it: "Guidando un veicolo a cui sono stati modificati il motore e la marmitta,", fa: "اگر با وسیله‌ای رانندگی کنی که موتور و اگزوزش تغییر داده شده،", verb: "guidando ← guidare", focus: "condition" },
        { it: "si può incorrere in pesanti sanzioni amministrative", fa: "ممکن است جریمه‌ی اداریِ سنگینی بگیری", verb: "si può ← potere" },
      ],
      translation: "اگر با وسیله‌ای رانندگی کنی که موتور و اگزوزش تغییر داده شده، ممکن است جریمه‌ی اداریِ سنگینی بگیری.",
      why: "درست است (درس ۵). تغییرِ بی‌بازدید و آزمایشِ فنی: جریمه‌ی سنگین و گرفتنِ کارتِ خودرو (ماده‌ی ۷۸).",
      rule: `${CDS("78")} c.3–4`,
      conceptStep: 3,
    },
    {
      sourceId: "6792",
      textIt: "Per diminuire l'inquinamento dell'aria provocato dai veicoli, bisogna ridurre la pressione di gonfiaggio dei pneumatici",
      answer: 0,
      chunks: [
        { it: DIM, fa: DIM_FA, focus: "reason" },
        { it: "bisogna ridurre la pressione di gonfiaggio dei pneumatici", fa: "باید فشارِ بادِ لاستیک‌ها را کم کرد", verb: "bisogna ← bisognare", focus: "contrast" },
      ],
      translation: "برای کم کردنِ آلودگیِ هوای ناشی از وسیله‌ها، باید فشارِ بادِ لاستیک‌ها را کم کرد.",
      why: "غلط است (درس ۶). لاستیکِ کم‌باد سخت‌تر می‌غلتد و مصرف و اگزوز را بیشتر می‌کند. فشار: همانِ دفترچه.",
      rule: `${GUIDA_CO2}; ${MANUALE}`,
      conceptStep: 1,
    },
    {
      sourceId: "6820",
      textIt: "Per diminuire l'inquinamento dell'aria provocato dai veicoli, bisogna far controllare il motore, se il fumo dello scarico risulta troppo scuro",
      answer: 1,
      chunks: [
        { it: DIM, fa: DIM_FA, focus: "reason" },
        { it: "bisogna far controllare il motore,", fa: "باید موتور را بدهی بررسی کنند،", verb: "bisogna ← bisognare" },
        { it: "se il fumo dello scarico risulta troppo scuro", fa: "اگر دودِ اگزوز خیلی تیره است", verb: "risulta ← risultare", focus: "condition" },
      ],
      translation: "برای کم کردنِ آلودگیِ هوای ناشی از وسیله‌ها، اگر دودِ اگزوز خیلی تیره است، باید موتور را بدهی بررسی کنند.",
      why: "درست است (درس ۶). دودِ تیره یعنی سوختنِ ناقص.",
      rule: TECNICA,
      conceptStep: 2,
    },
    {
      sourceId: "6786",
      textIt: "I rimorchi vuoti, che sobbalzano eccessivamente, possono essere causa di rumore",
      answer: 1,
      chunks: [
        { it: "I rimorchi vuoti,", fa: "یدک‌های خالی،" },
        { it: "che sobbalzano eccessivamente,", fa: "که بیش از حد بالا و پایین می‌پرند،", verb: "sobbalzano ← sobbalzare" },
        { it: "possono essere causa di rumore", fa: "ممکن است باعثِ صدا شوند", verb: "possono ← potere" },
      ],
      translation: "یدک‌های خالی، که بیش از حد بالا و پایین می‌پرند، ممکن است باعثِ صدا شوند.",
      why: "درست است (درس ۷). بدنه و بست‌ها به هم می‌خورند؛ صدا فقط از موتور نیست.",
      rule: `${CDS("155")} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "6783",
      textIt: "Per diminuire il rumore emesso dai veicoli a motore si deve sostituire il tubo di scarico, usandone uno di diametro più piccolo",
      answer: 0,
      chunks: [
        { it: "Per diminuire il rumore emesso dai veicoli a motore", fa: "برای کم کردنِ صدای وسیله‌های موتوری،", focus: "reason" },
        { it: "si deve sostituire il tubo di scarico,", fa: "باید لوله‌ی اگزوز را عوض کرد،", verb: "si deve ← dovere" },
        { it: "usandone uno di diametro più piccolo", fa: "و یکی با قطرِ کمتر گذاشت", verb: "usandone ← usare", focus: "contrast" },
      ],
      translation: "برای کم کردنِ صدای وسیله‌های موتوری، باید لوله‌ی اگزوز را عوض کرد و یکی با قطرِ کمتر گذاشت.",
      why: "غلط است (درس ۷). اگزوز باید از نوعِ تأییدشده باشد؛ لوله‌ی باریک‌تر دستکاری است، نه راهِ کم کردنِ صدا.",
      rule: `${CDS("155")} c.2; ${CDS("78")}`,
      conceptStep: 2,
    },
    {
      sourceId: "6771",
      textIt: "Per evitare rumori fastidiosi, occorre chiudere con forza le portiere dell'autovettura, in modo da non doverle richiudere",
      answer: 0,
      chunks: [
        { it: "Per evitare rumori fastidiosi,", fa: "برای جلوگیری از صدای مزاحم،", focus: "reason" },
        { it: "occorre chiudere con forza le portiere dell'autovettura,", fa: "باید درهای سواری را محکم بست،", verb: "occorre ← occorrere", focus: "contrast" },
        { it: "in modo da non doverle richiudere", fa: "تا لازم نباشد دوباره ببندی‌شان" },
      ],
      translation: "برای جلوگیری از صدای مزاحم، باید درهای سواری را محکم بست تا لازم نباشد دوباره ببندی‌شان.",
      why: "غلط است (درس ۸). کوبیدنِ در خودش صدای مزاحم است؛ آرام ببند و نگاه کن.",
      rule: `${CDS("155")} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "6774",
      textIt: "Il rumore prodotto dai veicoli a motore si può diminuire con una guida corretta, che eviti brusche frenate o forti accelerazioni",
      answer: 1,
      chunks: [
        { it: "Il rumore prodotto dai veicoli a motore", fa: "صدای وسیله‌های موتوری را" },
        { it: "si può diminuire con una guida corretta,", fa: "می‌شود با رانندگیِ درست کم کرد،", verb: "si può ← potere" },
        { it: "che eviti brusche frenate o forti accelerazioni", fa: "رانندگی‌ای که ترمزِ تند و گازِ شدید ندارد", verb: "eviti ← evitare" },
      ],
      translation: "صدای وسیله‌های موتوری را می‌شود با رانندگیِ درست کم کرد، رانندگی‌ای که ترمزِ تند و گازِ شدید ندارد.",
      why: "درست است (درس ۸). همان رانندگیِ نرمی که سوخت را هم کم می‌کند.",
      rule: `${CDS("155")} c.1`,
      conceptStep: 1,
    },
    {
      sourceId: "6840",
      textIt: "L'abbandono di una batteria per auto, sulla strada o sul terreno, può arrecare gravi danni all'ambiente e alle falde acquifere sottostanti",
      answer: 1,
      chunks: [
        { it: "L'abbandono di una batteria per auto,", fa: "رها کردنِ باتریِ خودرو،" },
        { it: "sulla strada o sul terreno,", fa: "روی جاده یا زمین،" },
        { it: "può arrecare gravi danni all'ambiente e alle falde acquifere sottostanti", fa: "ممکن است به محیط‌زیست و آب‌های زیرِ زمین آسیبِ جدی بزند", verb: "può ← potere" },
      ],
      translation: "رها کردنِ باتریِ خودرو روی جاده یا زمین ممکن است به محیط‌زیست و آب‌های زیرِ زمین آسیبِ جدی بزند.",
      why: "درست است (درس ۹). اسید و فلزِ سنگینِ باتری به خاک و آب می‌رسد؛ باتری را بی‌هزینه به مرکزِ جمع‌آوری بده.",
      rule: AMB("255-ter"),
      conceptStep: 1,
    },
    {
      sourceId: "6844",
      textIt: "Lo scarico dei residui organici e delle acque sporche delle autocaravan deve avvenire negli appositi impianti di smaltimento igienico-sanitari",
      answer: 1,
      chunks: [
        { it: "Lo scarico dei residui organici e delle acque sporche delle autocaravan", fa: "تخلیه‌ی پسماندِ آلی و آبِ کثیفِ کمپرها" },
        { it: "deve avvenire negli appositi impianti di smaltimento igienico-sanitari", fa: "باید در تأسیساتِ مخصوصِ تخلیه‌ی بهداشتی انجام شود", verb: "deve ← dovere" },
      ],
      translation: "تخلیه‌ی پسماندِ آلی و آبِ کثیفِ کمپرها باید در تأسیساتِ مخصوصِ تخلیه‌ی بهداشتی انجام شود.",
      why: "درست است (درس ۹). روی جاده و زمینِ عمومی ممنوع است (ماده‌ی ۱۸۵).",
      rule: `${CDS("185")} c.4`,
      conceptStep: 1,
    },
    {
      sourceId: "6849",
      textIt: "E' vietato sporcare la carreggiata depositando rifiuti",
      answer: 1,
      chunks: [
        { it: "E' vietato", fa: "ممنوع است" },
        { it: "sporcare la carreggiata depositando rifiuti", fa: "کثیف کردنِ سواره‌رو با گذاشتنِ زباله", verb: "depositando ← depositare" },
      ],
      translation: "کثیف کردنِ سواره‌رو با گذاشتنِ زباله ممنوع است.",
      why: "درست است (درس ۱۰). ماده‌ی ۱۵؛ روی همه‌ی جاده‌ها.",
      rule: `${CDS("15")} c.1 lett. f-bis`,
      conceptStep: 1,
    },
    {
      sourceId: "6854",
      textIt: "E' vietato parcheggiare nelle zone residenziali",
      answer: 0,
      chunks: [
        { it: "E' vietato", fa: "ممنوع است" },
        { it: "parcheggiare nelle zone residenziali", fa: "پارک کردن در محله‌های مسکونی", focus: "always" },
      ],
      translation: "پارک کردن در محله‌های مسکونی ممنوع است.",
      why: "غلط است (درس ۱۰). محله‌ی مسکونی قاعده‌های مخصوصِ خودش را دارد، ولی ممنوعیتِ عمومیِ پارک نیست.",
      rule: "DPR 495/1992, art. 135 (ZONA RESIDENZIALE)",
      conceptStep: 2,
    },
  ],
  related: [],
};

