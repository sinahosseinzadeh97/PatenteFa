/**
 * src/content/ch18-ripasso.ts
 * Chapter 18 (Luci e dispositivi acustici): the chapter review. Twelve real
 * bank questions, two per lesson in lesson order, none shown inside a lesson;
 * a mistake routes back to the lesson section that teaches it
 * (tests/chapter18.test.ts).
 */
import type { Lesson } from "./lessons.js";

const R121 = "Regolamento UN/ECE n. 121 (simboli e colori delle spie)";

export const reviewLuci: Lesson = {
  id: "ripasso-capitolo-18",
  titleFa: "مرور فصل ۱۸",
  titleIt: "RIPASSO · LUCI E DISPOSITIVI",
  minutes: 8,
  signs: [697, 704, 707],
  review: true,
  steps: [
    {
      kind: "intro",
      title: "مرور فصل",
      objective:
        "دوازده سؤالِ واقعی از بانک، دو تا از هر درس. هیچ‌کدام را در درس‌ها ندیده‌ای، پس این مرور نشان می‌دهد چه چیزی واقعاً در ذهنت مانده است.",
      why: "تقریباً هر سؤالِ این فصل یکی از سه چیز را می‌پرسد: «این‌جا و این ساعت کدام چراغ؟»، «این حرکت راهنما می‌خواهد؟» و «این نماد و این رنگ چه می‌گوید؟». سؤالی که این‌جا اشتباه کنی به فهرستِ مرورت اضافه می‌شود و به بخشِ درسِ مربوطش وصل است.",
    },
    {
      kind: "table",
      title: "فصل ۱۸ در شش خط",
      body: "قبل از سؤال‌ها، نکته‌ی اصلیِ هر درس را یک بار دیگر ببین. اگر جایی برایت تازه بود، اول همان درس را دوباره باز کن.",
      columns: ["نکته‌ی اصلی"],
      rows: [
        { label: "درس ۱", it: "anabbaglianti · nebbia", values: ["بیرون از آبادی و تونل: نورِ پایین همیشه. داخلِ آبادی: شب. دیدِ کم: همه‌جا. مه زیرِ ۵۰ متر، بارانِ شدید، برفِ سنگین: چراغِ مهِ عقب هم"] },
        { label: "درس ۲", it: "sosta · targa · catadiottri", values: ["پارک روی سواره‌رو در شب: موقعیت یا پارک. بیرون از سواره‌رو: هیچ. پلاک: سفید. شبرنگ روشن نمی‌شود و جای هیچ چراغی را نمی‌گیرد"] },
        { label: "درس ۳", it: "abbaglianti · lampeggio", values: ["نورِ بالا: بیرون از آبادی، جاده‌ی تاریک، کسی جلو نیست. هر کس که چشمش را بزنی = نورِ پایین. چشمک: هشدار یا خبرِ سبقت، هر ساعت، هر جا"] },
        { label: "درس ۴", it: "indicatori di direzione", values: ["بیرون رفتن از مسیر یا واردِ جریان شدن = راهنما، به هر طرف، روی هر جاده. ماندن در مسیر، حتی ایستادن = بی‌راهنما"] },
        { label: "درس ۵", it: "colori delle spie", values: ["قرمز خطر، زرد توجه، سبز روشن است، آبی نورِ بالا. مثلثِ قرمز = چراغِ خطر، با دستِ خودت"] },
        { label: "درس ۶", it: "spie rosse", values: ["دما = موتور داغ. روغن = فشار کم، موتور خاموش. باتری = شارژ نمی‌شود. ترمز = لنت یا روغنِ ترمز. کمربند = کسی نبسته"] },
      ],
      takeaway: "در هر جمله بپرس: کجا و کِی؟ از مسیرم بیرون می‌روم یا نه؟ این نماد دقیقاً چه چیزی را می‌سنجد؟",
    },
  ],
  practice: [
    {
      sourceId: "5820",
      textIt: "Percorrendo una strada extraurbana durante una giornata assolata è sufficiente accendere le luci di posizione",
      answer: 0,
      chunks: [
        { it: "Percorrendo una strada extraurbana", fa: "در جاده‌ی برون‌شهری", verb: "percorrendo ← percorrere" },
        { it: "durante una giornata assolata", fa: "در یک روزِ آفتابی" },
        { it: "è sufficiente accendere le luci di posizione", fa: "روشن کردنِ چراغ‌های موقعیت کافی است", verb: "è ← essere", focus: "contrast" },
      ],
      translation: "در جاده‌ی برون‌شهری، در یک روزِ آفتابی، روشن کردنِ چراغ‌های موقعیت کافی است.",
      why: "غلط است (درس ۱). بیرون از آبادی نورِ پایین (یا در روز چراغِ روز) لازم است؛ چراغ‌های موقعیت جاده را روشن نمی‌کنند.",
      rule: "Codice della Strada, art. 152 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "5834",
      textIt: "Durante la marcia, in caso di pioggia intensa, oltre alle luci anabbaglianti bisogna tenere accesa la luce posteriore per nebbia, se il veicolo ne è dotato",
      answer: 1,
      chunks: [
        { it: "Durante la marcia,", fa: "هنگامِ حرکت،" },
        { it: "in caso di pioggia intensa,", fa: "در بارانِ شدید،", focus: "condition" },
        { it: "oltre alle luci anabbaglianti", fa: "علاوه بر نورِ پایین" },
        { it: "bisogna tenere accesa la luce posteriore per nebbia,", fa: "باید چراغِ مهِ عقب را روشن نگه داری،", verb: "bisogna ← bisognare" },
        { it: "se il veicolo ne è dotato", fa: "اگر خودرو آن را دارد", focus: "condition" },
      ],
      translation: "هنگامِ حرکت، در بارانِ شدید، علاوه بر نورِ پایین باید چراغِ مهِ عقب را روشن نگه داری، اگر خودرو آن را دارد.",
      why: "درست است (درس ۱). بارانِ شدید یکی از سه حالتِ چراغِ مهِ عقب است، کنارِ مه زیرِ ۵۰ متر و برفِ سنگین.",
      rule: "Codice della Strada, art. 153 c.8",
      conceptStep: 3,
    },
    {
      sourceId: "5827",
      textIt: "Di notte, nei centri abitati, il veicolo in sosta al margine della carreggiata, può essere segnalato con le luci di sosta",
      answer: 1,
      chunks: [
        { it: "Di notte, nei centri abitati,", fa: "شب، داخلِ آبادی‌ها،", focus: "condition" },
        { it: "il veicolo in sosta al margine della carreggiata,", fa: "خودرویی که کنارِ سواره‌رو پارک شده،" },
        { it: "può essere segnalato con le luci di sosta", fa: "می‌تواند با چراغِ پارک نشان داده شود", verb: "può ← potere" },
      ],
      translation: "شب، داخلِ آبادی‌ها، خودرویی که کنارِ سواره‌رو پارک شده می‌تواند با چراغِ پارک نشان داده شود.",
      why: "درست است (درس ۲). داخلِ آبادی، کنارِ سواره‌رو، چراغِ پارک می‌تواند جای چراغ‌های موقعیت را بگیرد.",
      rule: "Codice della Strada, art. 153 c.6",
      conceptStep: 1,
    },
    {
      sourceId: "5847",
      textIt: "I catadiottri vanno accesi mezz'ora dopo il tramonto del sole",
      answer: 0,
      chunks: [
        { it: "I catadiottri", fa: "شبرنگ‌ها" },
        { it: "vanno accesi", fa: "باید روشن شوند", verb: "vanno ← andare", focus: "contrast" },
        { it: "mezz'ora dopo il tramonto del sole", fa: "نیم ساعت بعد از غروبِ خورشید" },
      ],
      translation: "شبرنگ‌ها باید نیم ساعت بعد از غروبِ خورشید روشن شوند.",
      why: "غلط است (درس ۲). شبرنگ لامپ ندارد و هیچ‌وقت روشن نمی‌شود؛ فقط نور را برمی‌گرداند.",
      rule: "Regolamento UN/ECE n. 48 (catadiottri)",
      conceptStep: 3,
    },
    {
      sourceId: "5924",
      textIt: "L’uso dei proiettori a luce abbagliante è necessario, fuori dei centri abitati, quando l’illuminazione pubblica manca e non si incrociano altri veicoli",
      answer: 1,
      chunks: [
        { it: "L’uso dei proiettori a luce abbagliante", fa: "استفاده از نورِ بالا" },
        { it: "è necessario, fuori dei centri abitati,", fa: "بیرون از آبادی لازم است،", verb: "è ← essere" },
        { it: "quando l’illuminazione pubblica manca", fa: "وقتی چراغِ خیابان نیست", verb: "manca ← mancare", focus: "condition" },
        { it: "e non si incrociano altri veicoli", fa: "و به خودروی دیگری از روبه‌رو نمی‌رسی", verb: "si incrociano ← incrociare", focus: "condition" },
      ],
      translation: "استفاده از نورِ بالا بیرون از آبادی لازم است، وقتی چراغِ خیابان نیست و به خودروی دیگری از روبه‌رو نمی‌رسی.",
      why: "درست است (درس ۳). هر سه شرطِ نورِ بالا در جمله هست: بیرون از آبادی، جاده‌ی تاریک، کسی روبه‌رو نیست.",
      rule: "Codice della Strada, art. 153 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "5937",
      textIt: "E’ consentito l’uso intermittente dei proiettori di profondità (a luce abbagliante), purché l’illuminazione esterna manchi o sia insufficiente",
      answer: 0,
      chunks: [
        { it: "E’ consentito l’uso intermittente dei proiettori di profondità (a luce abbagliante),", fa: "چشمک زدن با نورِ بالا مجاز است،", verb: "è consentito ← consentire" },
        { it: "purché l’illuminazione esterna manchi o sia insufficiente", fa: "به شرطِ این‌که نورِ بیرون نباشد یا کم باشد", verb: "manchi ← mancare", focus: "condition" },
      ],
      translation: "چشمک زدن با نورِ بالا مجاز است، به شرطِ این‌که نورِ بیرون نباشد یا کم باشد.",
      why: "غلط است (درس ۳). شرطِ تاریکی برای روشن نگه داشتنِ نورِ بالاست؛ چشمک هر ساعت و هر جا مجاز است، روزِ روشن هم.",
      rule: "Codice della Strada, art. 153 c.4",
      conceptStep: 3,
    },
    {
      sourceId: "5901",
      textIt: "Si devono usare gli indicatori di direzione quando, partendo dal margine della carreggiata, ci si vuole immettere nella circolazione",
      answer: 1,
      chunks: [
        { it: "Si devono usare gli indicatori di direzione", fa: "باید چراغ راهنما بزنی", verb: "si devono ← dovere" },
        { it: "quando, partendo dal margine della carreggiata,", fa: "وقتی از کنارِ سواره‌رو راه می‌افتی", verb: "partendo ← partire", focus: "condition" },
        { it: "ci si vuole immettere nella circolazione", fa: "و می‌خواهی واردِ جریانِ ترافیک شوی", verb: "ci si vuole immettere ← immettersi" },
      ],
      translation: "وقتی از کنارِ سواره‌رو راه می‌افتی و می‌خواهی واردِ جریانِ ترافیک شوی، باید چراغ راهنما بزنی.",
      why: "درست است (درس ۴). واردِ جریانِ ترافیک شدن یکی از حرکت‌های فهرستِ قانون است.",
      rule: "Codice della Strada, art. 154 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "5906",
      textIt: "Non si devono usare gli indicatori di direzione se, per effettuare una fermata fuori della carreggiata, ci si sposta sul margine sinistro",
      answer: 0,
      chunks: [
        { it: "Non si devono usare gli indicatori di direzione", fa: "نباید چراغ راهنما بزنی", verb: "si devono ← dovere", focus: "negation" },
        { it: "se, per effettuare una fermata fuori della carreggiata,", fa: "اگر برای توقفِ کوتاه بیرون از سواره‌رو", focus: "condition" },
        { it: "ci si sposta sul margine sinistro", fa: "به لبه‌ی چپ می‌روی", verb: "ci si sposta ← spostarsi" },
      ],
      translation: "اگر برای توقفِ کوتاه بیرون از سواره‌رو به لبه‌ی چپ می‌روی، نباید چراغ راهنما بزنی.",
      why: "غلط است (درس ۴). رفتن به هر لبه‌ای برای توقف حرکتی است که خبر می‌خواهد؛ چپ هم.",
      rule: "Codice della Strada, art. 154 c.1",
      conceptStep: 2,
    },
    {
      sourceId: "5868",
      textIt: "La spia di accensione delle luci abbaglianti è di colore rosso",
      answer: 0,
      chunks: [
        { it: "La spia di accensione delle luci abbaglianti", fa: "چراغِ نشانگرِ روشن بودنِ نورِ بالا" },
        { it: "è di colore rosso", fa: "قرمز است", verb: "è ← essere", focus: "contrast" },
      ],
      translation: "چراغِ نشانگرِ روشن بودنِ نورِ بالا قرمز است.",
      why: "غلط است (درس ۵). نشانگرِ نورِ بالا تنها چراغِ آبی است.",
      rule: R121,
      conceptStep: 1,
    },
    {
      sourceId: "5886",
      textIt: "Il simbolo raffigurato si trova sulla spia a luce verde lampeggiante dell'indicatore di direzione azionato",
      answer: 1,
      sign: 697,
      chunks: [
        { it: "Il simbolo raffigurato", fa: "نمادِ نشان‌داده‌شده" },
        { it: "si trova sulla spia a luce verde lampeggiante", fa: "روی چراغِ نشانگرِ سبزِ چشمک‌زن است", verb: "si trova ← trovarsi" },
        { it: "dell'indicatore di direzione azionato", fa: "که مالِ راهنمای روشن‌شده است" },
      ],
      translation: "نمادِ نشان‌داده‌شده روی چراغِ نشانگرِ سبزِ چشمک‌زنِ راهنمای روشن‌شده است.",
      why: "درست است (درس ۵). دو فلش = راهنما؛ نشانگرش سبز است و چشمک می‌زند.",
      rule: R121,
      conceptStep: 2,
    },
    {
      sourceId: "5952",
      textIt: "Il simbolo raffigurato è posto su una spia che segnala il livello del liquido di raffreddamento nel radiatore",
      answer: 0,
      sign: 704,
      chunks: [
        { it: "Il simbolo raffigurato", fa: "نمادِ نشان‌داده‌شده" },
        { it: "è posto su una spia", fa: "روی چراغِ نشانگری است", verb: "è posto ← porre" },
        { it: "che segnala il livello del liquido di raffreddamento nel radiatore", fa: "که سطحِ مایعِ خنک‌کننده در رادیاتور را نشان می‌دهد", verb: "segnala ← segnalare", focus: "contrast" },
      ],
      translation: "نمادِ نشان‌داده‌شده روی چراغِ نشانگری است که سطحِ مایعِ خنک‌کننده در رادیاتور را نشان می‌دهد.",
      why: "غلط است (درس ۶). این چراغ دما را می‌سنجد، نه سطح را: موتور داغ کرده.",
      rule: R121,
      conceptStep: 1,
    },
    {
      sourceId: "5987",
      textIt: "La spia rossa contraddistinta dal simbolo in figura, se accesa durante la marcia, è in genere abbinata ad un segnale acustico in funzione",
      answer: 1,
      sign: 707,
      chunks: [
        { it: "La spia rossa contraddistinta dal simbolo in figura,", fa: "چراغِ نشانگرِ قرمز با نمادِ تصویر،" },
        { it: "se accesa durante la marcia,", fa: "اگر هنگامِ حرکت روشن باشد،", focus: "condition" },
        { it: "è in genere abbinata ad un segnale acustico in funzione", fa: "معمولاً با یک صدای هشدار همراه است", verb: "è abbinata ← abbinare" },
      ],
      translation: "چراغِ نشانگرِ قرمز با نمادِ تصویر، اگر هنگامِ حرکت روشن باشد، معمولاً با یک صدای هشدار همراه است.",
      why: "درست است (درس ۶). چراغِ کمربند معمولاً با صدای هشدار همراه است تا کمربند بسته شود.",
      rule: R121,
      conceptStep: 3,
    },
  ],
  related: [],
};
