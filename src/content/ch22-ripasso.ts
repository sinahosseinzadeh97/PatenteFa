/**
 * src/content/ch22-ripasso.ts
 * Chapter 22 (Alcool, droga e primo soccorso): the chapter review. Twenty-two
 * real bank questions, two per lesson in lesson order, none shown inside a
 * lesson and none of the statements the chapter flags as disputed; a mistake
 * routes back to the lesson section that teaches it (tests/chapter22.test.ts).
 */
import type { Lesson } from "./lessons.js";

const CDS = (n: string) => `Codice della Strada, art. ${n}`;
const MINSAL = "Ministero della Salute, pieghevole «Alcol» (Osservatorio Nazionale Alcol – ISS, 2018)";
const ERC = "European Resuscitation Council, Guidelines 2025 First Aid (Resuscitation 215, 2025, 110752)";
const NHS_FRATTURA = "NHS, «Broken arm or wrist» (rev. 02/10/2026)";
const NHS_OCCHIO = "NHS, «Eye injuries» (rev. 12/03/2026)";
const NHS_USTIONI = "NHS, «Burns and scalds» (rev. 31/03/2026)";
const CP_593 = "Codice penale, art. 593 c.2 (omissione di soccorso)";
const ALCOOL = "L'assunzione di alcool";
const ALCOOL_FA = "مصرفِ الکل";

export const reviewAlcool: Lesson = {
  id: "ripasso-capitolo-22",
  titleFa: "مرور فصل ۲۲",
  titleIt: "RIPASSO · ALCOOL, DROGA E PRIMO SOCCORSO",
  minutes: 10,
  signs: [],
  review: true,
  steps: [
    {
      kind: "intro",
      title: "مرور فصل",
      objective:
        "بیست‌ودو سؤالِ واقعی از بانک، دو تا از هر درس: چهار درسِ اول درباره‌ی آمادگی برای رانندگی (الکل، مواد، خستگی، عینک)، هفت درسِ بعد درباره‌ی کمک‌های اولیه. هیچ‌کدام را در درس‌ها ندیده‌ای.",
      why: "دو حرکت در کلِ فصل تکرار می‌شود: در بخشِ اول، جمله‌ی غلط می‌گوید چیزی «کمک» می‌کند یا «بی‌اثر» است؛ در بخشِ دوم، جمله‌ی غلط کاری فعال و خطرناک پیشنهاد می‌کند (راه بردن، کندن، بیرون آوردن، نوشاندن). سؤالی که این‌جا اشتباه کنی به فهرستِ مرورت اضافه می‌شود و به بخشِ درسِ مربوطش وصل است. این مرور گواهیِ کمک‌های اولیه نیست.",
    },
    {
      kind: "table",
      title: "فصل ۲۲ در یازده خط",
      body: "قبل از سؤال‌ها، نکته‌ی اصلیِ هر درس را یک بار دیگر ببین. اگر جایی برایت تازه بود، اول همان درس را دوباره باز کن.",
      columns: ["نکته‌ی اصلی"],
      rows: [
        { label: "درس ۱", it: "alcool e capacità di guida", values: ["الکل سنجیدنِ خطر، توجه و واکنش را پایین می‌آورد؛ هیچ چیز را بهتر نمی‌کند"] },
        { label: "درس ۲", it: "tempo · miti · legge", values: ["فقط زمان؛ قهوه و نمک و غذا نه. تازه‌کار: صفر. «arresto» یعنی حبس؛ دوچرخه هم"] },
        { label: "درس ۳", it: "droghe e farmaci", values: ["آرام‌بخش، ضدافسردگی، توهم‌زا، الکل: VERO؛ قهوه، نوشابه، مکمل: FALSO؛ «non compromette» همیشه غلط"] },
        { label: "درس ۴", it: "stanchezza · emozioni · occhiali", values: ["خسته: استراحت. عصبی: آرام شو. عینک: فقط و همیشه وقتی گواهینامه می‌گوید (کدِ ۰۱)"] },
        { label: "درس ۵", it: "obbligo di soccorso", values: ["کمک وظیفه‌ی قانونیِ همه است؛ ایمنی، خبر کردن، کمکِ ساده؛ نه رفتن، نه دارو"] },
        { label: "درس ۶", it: "scopo · incoscienza", values: ["زنده نگه دار تا امداد؛ بیهوش: خبر کن، تنفس، اپراتور، جابه‌جا نکن، نه نشاندن"] },
        { label: "درس ۷", it: "ferite · emorragia", values: ["بپوشان و فشار بده؛ جسمِ فرورفته را بیرون نکش؛ خونریزیِ شدید: فشار، خبر، دراز یا نشسته"] },
        { label: "درس ۸", it: "shock: cause e segni", values: ["خون، ضربه، درد؛ رنگ‌پریده، سرد، عرقِ سرد، قلبِ تند، گیج؛ نه داغ، نه سرخ"] },
        { label: "درس ۹", it: "posizioni", values: ["شوک: دراز، گرم، پاها بالا اگر می‌شود. قفسه‌ی سینه و هوشیار: نیمه‌نشسته"] },
        { label: "درس ۱۰", it: "fratture · occhio", values: ["تکان نده، صاف نکن، بیرون نیاور؛ چشم را نمال و آرام بپوشان"] },
        { label: "درس ۱۱", it: "ustioni", values: ["شعله را خفه کن، آبِ خنک، لباسِ چسبیده بماند، تمیز بپوشان؛ نه الکل"] },
      ],
      takeaway: "بخشِ اول: هیچ ماده‌ای رانندگی را بهتر نمی‌کند. بخشِ دوم: خبر کن، ساده و بی‌ضرر کمک کن، و کاری که بلد نیستی نکن.",
    },
  ],
  practice: [
    {
      sourceId: "6588",
      textIt: "L'assunzione di alcool rende meno sicura la guida, perché può modificare pericolosamente la capacità di concentrazione e attenzione",
      answer: 1,
      chunks: [
        { it: ALCOOL, fa: ALCOOL_FA },
        { it: "rende meno sicura la guida,", fa: "رانندگی را کم‌ایمن‌تر می‌کند،", verb: "rende ← rendere" },
        { it: "perché può modificare pericolosamente la capacità di concentrazione e attenzione", fa: "چون می‌تواند توانِ تمرکز و توجه را به‌طرزی خطرناک تغییر دهد", focus: "reason" },
      ],
      translation: "مصرفِ الکل رانندگی را کم‌ایمن‌تر می‌کند، چون می‌تواند توانِ تمرکز و توجه را به‌طرزی خطرناک تغییر دهد.",
      why: "درست است (درس ۱). تمرکز و توجه یکی از سه توانایی‌ای است که الکل خراب می‌کند.",
      rule: MINSAL,
      conceptStep: 1,
    },
    {
      sourceId: "6593",
      textIt: "L'assunzione di alcool rende la guida più sicura, più allegra e meno noiosa",
      answer: 0,
      chunks: [
        { it: ALCOOL, fa: ALCOOL_FA },
        { it: "rende la guida più sicura, più allegra e meno noiosa", fa: "رانندگی را امن‌تر، شادتر و کم‌ملال‌تر می‌کند", verb: "rende ← rendere", focus: "contrast" },
      ],
      translation: "مصرفِ الکل رانندگی را امن‌تر، شادتر و کم‌ملال‌تر می‌کند.",
      why: "غلط است (درس ۱). «امن‌تر» غلط است؛ شادی همان سرخوشی‌ای است که خطر را کوچک نشان می‌دهد.",
      rule: MINSAL,
      conceptStep: 2,
    },
    {
      sourceId: "6466",
      textIt: "Un conducente che ha assunto una quantità eccessiva di bevande alcoliche può recuperare velocemente l'idoneità alla guida se assume cibi piuttosto salati",
      answer: 0,
      chunks: [
        { it: "Un conducente che ha assunto una quantità eccessiva di bevande alcoliche", fa: "راننده‌ای که بیش از حد نوشیدنیِ الکلی خورده" },
        { it: "può recuperare velocemente l'idoneità alla guida", fa: "می‌تواند به‌سرعت آمادگی برای رانندگی را دوباره به دست بیاورد", verb: "può ← potere", focus: "contrast" },
        { it: "se assume cibi piuttosto salati", fa: "اگر غذای نسبتاً شور بخورد", focus: "condition" },
      ],
      translation: "راننده‌ای که بیش از حد نوشیدنیِ الکلی خورده، اگر غذای نسبتاً شور بخورد، می‌تواند به‌سرعت آمادگی برای رانندگی را دوباره به دست بیاورد.",
      why: "غلط است (درس ۲). فقط زمان؛ نمک اثری ندارد.",
      rule: MINSAL,
      conceptStep: 1,
    },
    {
      sourceId: "6483",
      textIt: "L'assunzione di bevande superalcoliche, durante un pasto abbondante non compromette la facoltà di guida",
      answer: 0,
      chunks: [
        { it: "L'assunzione di bevande superalcoliche,", fa: "خوردنِ نوشیدنی‌های الکلیِ قوی،" },
        { it: "durante un pasto abbondante", fa: "همراهِ غذای زیاد", focus: "condition" },
        { it: "non compromette la facoltà di guida", fa: "به توانِ رانندگی آسیب نمی‌زند", verb: "compromette ← compromettere", focus: "negation" },
      ],
      translation: "خوردنِ نوشیدنی‌های الکلیِ قوی همراهِ غذای زیاد به توانِ رانندگی آسیب نمی‌زند.",
      why: "غلط است (درس ۲). غذا الکل را بی‌اثر نمی‌کند، و غذای سنگین خودش توجه را کم می‌کند.",
      rule: MINSAL,
      conceptStep: 1,
    },
    {
      sourceId: "6475",
      textIt: "L'idoneità alla guida può essere compromessa se si fa uso di integratori alimentari",
      answer: 0,
      chunks: [
        { it: "L'idoneità alla guida può essere compromessa se si fa uso di", fa: "آمادگی برای رانندگی ممکن است آسیب ببیند اگر کسی مصرف کند", verb: "può ← potere" },
        { it: "integratori alimentari", fa: "مکمل‌های غذایی را", focus: "contrast" },
      ],
      translation: "آمادگی برای رانندگی ممکن است آسیب ببیند اگر کسی مکمل‌های غذایی را مصرف کند.",
      why: "غلط است (درس ۳). در بانک مکمل‌های غذایی آمادگی را خراب نمی‌کنند.",
      rule: "AIFA, Banca dati farmaci: foglio illustrativo, paragrafo «Guida di veicoli e utilizzo di macchinari»",
      conceptStep: 1,
    },
    {
      sourceId: "6478",
      textIt: "Nei farmaci sedativi sono presenti alcune sostanze che possono compromettere la facoltà di guida",
      answer: 1,
      chunks: [
        { it: "Nei farmaci sedativi sono presenti alcune sostanze", fa: "در داروهای آرام‌بخش موادی هست", verb: "sono ← essere" },
        { it: "che possono compromettere la facoltà di guida", fa: "که می‌توانند به توانِ رانندگی آسیب بزنند", verb: "possono ← potere" },
      ],
      translation: "در داروهای آرام‌بخش موادی هست که می‌توانند به توانِ رانندگی آسیب بزنند.",
      why: "درست است (درس ۳). برگه‌ی راهنمای دارو را بخوان و از پزشک یا داروساز بپرس.",
      rule: "Codice della Strada, art. 187 c.1; AIFA, foglio illustrativo",
      conceptStep: 2,
    },
    {
      sourceId: "6481",
      textIt: "Un'alimentazione pesante ed eccessiva è sconsigliata per chi deve guidare",
      answer: 1,
      chunks: [
        { it: "Un'alimentazione pesante ed eccessiva", fa: "غذای سنگین و زیاد" },
        { it: "è sconsigliata per chi deve guidare", fa: "برای کسی که باید رانندگی کند توصیه نمی‌شود", verb: "è ← essere" },
      ],
      translation: "غذای سنگین و زیاد برای کسی که باید رانندگی کند توصیه نمی‌شود.",
      why: "درست است (درس ۴). خواب‌آلودگی و واکنشِ کُند می‌آورد.",
      rule: "Indicazione di sicurezza, senza un articolo del CdS (come nel capitolo 12)",
      conceptStep: 1,
    },
    {
      sourceId: "6601",
      textIt: "Durante la guida, si devono usare gli occhiali da vista o le lenti a contatto soltanto in caso di scarsa visibilità",
      answer: 0,
      chunks: [
        { it: "Durante la guida, si devono usare gli occhiali da vista o le lenti a contatto", fa: "هنگامِ رانندگی باید عینکِ طبی یا لنزِ تماسی زد", verb: "devono ← dovere" },
        { it: "soltanto in caso di scarsa visibilità", fa: "فقط وقتی دید کم است", focus: "limit" },
      ],
      translation: "هنگامِ رانندگی فقط وقتی دید کم است باید عینکِ طبی یا لنزِ تماسی زد.",
      why: "غلط است (درس ۴). اگر گواهینامه می‌گوید، همیشه؛ «soltanto» شرطِ ساختگی است.",
      rule: CDS("173") + " c.1",
      conceptStep: 2,
    },
    {
      sourceId: "6490",
      textIt: "Soccorrere un ferito della strada può significare salvargli la vita",
      answer: 1,
      chunks: [
        { it: "Soccorrere un ferito della strada", fa: "کمک رساندن به زخمیِ تصادف" },
        { it: "può significare salvargli la vita", fa: "ممکن است یعنی نجاتِ جانِ او", verb: "può ← potere" },
      ],
      translation: "کمک رساندن به زخمیِ تصادف ممکن است به معنیِ نجاتِ جانِ او باشد.",
      why: "درست است (درس ۵). چند دقیقه‌ی اول ممکن است جان را نجات دهد.",
      rule: CP_593,
      conceptStep: 1,
    },
    {
      sourceId: "6571",
      textIt: "Dopo un incidente stradale, il soccorritore che interviene deve assistere gli infortunati al meglio delle sue possibilità, senza però prendere iniziative di specifica competenza medica",
      answer: 1,
      chunks: [
        { it: "Dopo un incidente stradale, il soccorritore che interviene deve", fa: "بعد از تصادف، کمک‌رسانی که وارد عمل می‌شود باید", verb: "deve ← dovere" },
        { it: "assistere gli infortunati al meglio delle sue possibilità,", fa: "تا جایی که از دستش برمی‌آید به مصدومان کمک کند،" },
        { it: "senza però prendere iniziative di specifica competenza medica", fa: "ولی بی‌آنکه کاری بکند که تخصصِ پزشکی می‌خواهد", focus: "limit" },
      ],
      translation: "بعد از تصادف، کمک‌رسانی که وارد عمل می‌شود باید تا جایی که از دستش برمی‌آید به مصدومان کمک کند، ولی بی‌آنکه کاری بکند که تخصصِ پزشکی می‌خواهد.",
      why: "درست است (درس ۵). کمکِ ساده در حدِ توان؛ کارِ پزشکی نه.",
      rule: ERC,
      conceptStep: 2,
    },
    {
      sourceId: "6498",
      textIt: "Il fine del primo soccorso è quello di assistere il ferito, come meglio possibile, in attesa che arrivi il soccorso medico",
      answer: 1,
      chunks: [
        { it: "Il fine del primo soccorso è quello di", fa: "هدفِ کمک‌های اولیه این است که", verb: "è ← essere" },
        { it: "assistere il ferito, come meglio possibile,", fa: "تا جای ممکن به زخمی کمک کنی،" },
        { it: "in attesa che arrivi il soccorso medico", fa: "تا امدادِ پزشکی برسد" },
      ],
      translation: "هدفِ کمک‌های اولیه این است که تا رسیدنِ امدادِ پزشکی، تا جای ممکن به زخمی کمک کنی.",
      why: "درست است (درس ۶). کمک‌های اولیه پلی تا رسیدنِ امداد است.",
      rule: ERC,
      conceptStep: 1,
    },
    {
      sourceId: "6544",
      textIt: "Se un ferito della strada è in stato di incoscienza, bisogna controllare spesso le sue condizioni di salute fino all'arrivo dell'ambulanza",
      answer: 1,
      chunks: [
        { it: "Se un ferito della strada è in stato di incoscienza,", fa: "اگر زخمیِ تصادف بیهوش است،" },
        { it: "bisogna controllare spesso le sue condizioni di salute", fa: "باید مدام حالش را بررسی کرد", verb: "bisogna ← bisognare" },
        { it: "fino all'arrivo dell'ambulanza", fa: "تا رسیدنِ آمبولانس" },
      ],
      translation: "اگر زخمیِ تصادف بیهوش است، باید تا رسیدنِ آمبولانس مدام حالش را بررسی کرد.",
      why: "درست است (درس ۶). بمان و بپا؛ هر تغییری را به اپراتور بگو.",
      rule: ERC,
      conceptStep: 2,
    },
    {
      sourceId: "6506",
      textIt: "Durante un intervento di primo soccorso, se l'infortunato ha una ferita sanguinante, con presenza di corpi estranei conficcati, non bisogna toglierli dalla ferita",
      answer: 1,
      chunks: [
        { it: "Durante un intervento di primo soccorso, se l'infortunato ha una ferita sanguinante,", fa: "در کمک‌های اولیه، اگر مصدوم زخمی دارد که خون می‌آید،" },
        { it: "con presenza di corpi estranei conficcati,", fa: "و جسم‌های خارجیِ فرورفته در آن هست،", focus: "condition" },
        { it: "non bisogna toglierli dalla ferita", fa: "نباید آن‌ها را از زخم بیرون آورد", verb: "bisogna ← bisognare", focus: "negation" },
      ],
      translation: "در کمک‌های اولیه، اگر مصدوم زخمی دارد که خون می‌آید و جسم‌های خارجیِ فرورفته در آن هست، نباید آن‌ها را از زخم بیرون آورد.",
      why: "درست است (درس ۷). بیرون کشیدن ممکن است خونریزی را شدیدتر کند؛ دورش را بپوشان.",
      rule: ERC,
      conceptStep: 1,
    },
    {
      sourceId: "6516",
      textIt: "Se un infortunato della strada ha un'abbondante emorragia esterna, bisogna solo medicare la ferita",
      answer: 0,
      chunks: [
        { it: "Se un infortunato della strada ha un'abbondante emorragia esterna,", fa: "اگر مصدومِ تصادف خونریزیِ بیرونیِ شدید دارد،" },
        { it: "bisogna solo medicare la ferita", fa: "فقط باید زخم را پانسمان کرد", verb: "bisogna ← bisognare", focus: "limit" },
      ],
      translation: "اگر مصدومِ تصادف خونریزیِ بیرونیِ شدید دارد، فقط باید زخم را پانسمان کرد.",
      why: "غلط است (درس ۷). «solo» غلط است: فشارِ محکم، خبر کردنِ فوری، و نشاندن یا دراز کردن.",
      rule: ERC,
      conceptStep: 2,
    },
    {
      sourceId: "6580",
      textIt: "Lo stato di shock può essere causato da un forte trauma",
      answer: 1,
      chunks: [
        { it: "Lo stato di shock può essere causato da", fa: "شوک ممکن است به خاطرِ … پیش بیاید:", verb: "può ← potere" },
        { it: "un forte trauma", fa: "ضربه‌ی شدید" },
      ],
      translation: "شوک ممکن است به خاطرِ ضربه‌ی شدید پیش بیاید.",
      why: "درست است (درس ۸). ضربه‌ی شدید، حتی بی‌خونریزیِ دیدنی.",
      rule: ERC,
      conceptStep: 1,
    },
    {
      sourceId: "6532",
      textIt: "Lo stato di shock si manifesta con ampie macchie scure sulla pelle",
      answer: 0,
      chunks: [
        { it: "Lo stato di shock si manifesta", fa: "شوک خودش را نشان می‌دهد", verb: "si manifesta ← manifestarsi" },
        { it: "con ampie macchie scure sulla pelle", fa: "با لکه‌های بزرگِ تیره روی پوست", focus: "contrast" },
      ],
      translation: "شوک با لکه‌های بزرگِ تیره روی پوست خودش را نشان می‌دهد.",
      why: "غلط است (درس ۸). نشانه‌ها: رنگ‌پریدگی، پوستِ سرد، عرقِ سرد، قلبِ تند، گیجی.",
      rule: ERC,
      conceptStep: 2,
    },
    {
      sourceId: "6534",
      textIt: "Un ferito in stato di shock va messo a terra e, se possibile, con le gambe sollevate",
      answer: 1,
      chunks: [
        { it: "Un ferito in stato di shock", fa: "زخمی‌ای که در شوک است" },
        { it: "va messo a terra", fa: "باید روی زمین خوابانده شود", verb: "va ← andare" },
        { it: "e, se possibile, con le gambe sollevate", fa: "و اگر ممکن است، با پاهای بالا", focus: "condition" },
      ],
      translation: "زخمی‌ای که در شوک است باید روی زمین خوابانده شود و اگر ممکن است پاهایش بالا باشد.",
      why: "درست است (درس ۹). «se possibile»: فقط اگر پا، لگن یا ستونِ مهره آسیب ندیده.",
      rule: ERC,
      conceptStep: 1,
    },
    {
      sourceId: "6552",
      textIt: "Se un infortunato della strada ha avuto un trauma della gabbia toracica, bisogna fargli fare profondi respiri",
      answer: 0,
      chunks: [
        { it: "Se un infortunato della strada ha avuto un trauma della gabbia toracica,", fa: "اگر قفسه‌ی سینه‌ی مصدومِ تصادف ضربه خورده،" },
        { it: "bisogna fargli fare profondi respiri", fa: "باید از او خواست نفس‌های عمیق بکشد", verb: "bisogna ← bisognare", focus: "contrast" },
      ],
      translation: "اگر قفسه‌ی سینه‌ی مصدومِ تصادف ضربه خورده، باید از او خواست نفس‌های عمیق بکشد.",
      why: "غلط است (درس ۹). نفسِ عمیق با دنده‌ی آسیب‌دیده درد و آسیب را بیشتر می‌کند؛ نیمه‌نشسته کمک می‌کند.",
      rule: ERC,
      conceptStep: 2,
    },
    {
      sourceId: "6556",
      textIt: "Se un infortunato della strada ha riportato fratture agli arti, bisogna bloccarglieli, senza procedere ad altre manovre",
      answer: 1,
      chunks: [
        { it: "Se un infortunato della strada ha riportato fratture agli arti,", fa: "اگر دست یا پای مصدومِ تصادف شکسته،" },
        { it: "bisogna bloccarglieli,", fa: "باید آن‌ها را بی‌حرکت نگه داشت،", verb: "bisogna ← bisognare" },
        { it: "senza procedere ad altre manovre", fa: "بی‌آنکه کارِ دیگری کرد", focus: "limit" },
      ],
      translation: "اگر دست یا پای مصدومِ تصادف شکسته، باید آن‌ها را بی‌حرکت نگه داشت، بی‌آنکه کارِ دیگری کرد.",
      why: "درست است (درس ۱۰). همان‌طور که هست بی‌حرکت؛ صاف کردن نه.",
      rule: NHS_FRATTURA,
      conceptStep: 1,
    },
    {
      sourceId: "6524",
      textIt: "Se ad un infortunato della strada è entrato un corpo estraneo in un occhio, bisogna massaggiargli delicatamente la palpebra, per favorire la lacrimazione",
      answer: 0,
      chunks: [
        { it: "Se ad un infortunato della strada è entrato un corpo estraneo in un occhio,", fa: "اگر جسمی خارجی در چشمِ مصدومِ تصادف رفته،" },
        { it: "bisogna massaggiargli delicatamente la palpebra,", fa: "باید آرام پلکش را مالید،", verb: "bisogna ← bisognare", focus: "contrast" },
        { it: "per favorire la lacrimazione", fa: "تا اشک بیاید", focus: "reason" },
      ],
      translation: "اگر جسمی خارجی در چشمِ مصدومِ تصادف رفته، باید آرام پلکش را مالید تا اشک بیاید.",
      why: "غلط است (درس ۱۰). حتی آرام مالیدن جسم را جابه‌جا می‌کند؛ دست نزن و آرام بپوشان.",
      rule: NHS_OCCHIO,
      conceptStep: 2,
    },
    {
      sourceId: "6565",
      textIt: "Per diminuire il dolore delle ustioni si deve, se possibile, fare uso di acqua fredda",
      answer: 1,
      chunks: [
        { it: "Per diminuire il dolore delle ustioni", fa: "برای کم کردنِ دردِ سوختگی", focus: "reason" },
        { it: "si deve, se possibile, fare uso di acqua fredda", fa: "اگر ممکن است باید از آبِ خنک استفاده کرد", verb: "deve ← dovere" },
      ],
      translation: "برای کم کردنِ دردِ سوختگی، اگر ممکن است، باید از آبِ خنک استفاده کرد.",
      why: "درست است (درس ۱۱). آبِ خنکِ روان، حدودِ بیست دقیقه؛ یخ نه.",
      rule: NHS_USTIONI,
      conceptStep: 1,
    },
    {
      sourceId: "6566",
      textIt: "Se un ferito della strada ha riportato delle ustioni al busto, conviene coprirle con materiale pulito, possibilmente sterile",
      answer: 1,
      chunks: [
        { it: "Se un ferito della strada ha riportato delle ustioni al busto,", fa: "اگر بالاتنه‌ی زخمیِ تصادف سوخته،" },
        { it: "conviene coprirle con materiale pulito, possibilmente sterile", fa: "بهتر است آن را با وسیله‌ی تمیز، و اگر شد استریل، پوشاند", verb: "conviene ← convenire" },
      ],
      translation: "اگر بالاتنه‌ی زخمیِ تصادف سوخته، بهتر است سوختگی‌ها را با وسیله‌ی تمیز، و اگر شد استریل، پوشاند.",
      why: "درست است (درس ۱۱). پوشاندنِ تمیز و شل، بعد از سرد کردن.",
      rule: NHS_USTIONI,
      conceptStep: 1,
    },
  ],
  related: [],
};
