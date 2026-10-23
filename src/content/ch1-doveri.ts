/**
 * src/content/ch1-doveri.ts
 * Chapter 1, lessons 10–14: duties in traffic and queues, what is forbidden on
 * the road, cyclists and visibility, vulnerable pedestrians, children.
 * Same trust rules as src/content/ch1-strada.ts.
 */
import type { Lesson } from "./lessons.js";

const range = (from: number, to: number): string[] =>
  Array.from({ length: to - from + 1 }, (_, i) => String(from + i));

// ── Lesson 10 ─────────────────────────────────────────────────────────────────

export const lessonTraffico: Lesson = {
  id: "traffico-code-centro-abitato",
  titleFa: "صف، ترافیک سنگین و رانندگی در شهر",
  titleIt: "TRAFFICO INTENSO · FILE DI VEICOLI · CENTRO ABITATO",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی در صف و ترافیک سنگین کدام جاها را باید خالی بگذاری، در شهر به چه چیزهایی بیشتر حواست باشد و حق تقدم داشتن چه چیزی را به تو اجازه نمی‌دهد.",
      why: "۴۱ سؤال درباره‌ی رفتار درست در ترافیک است. بیشتر جمله‌های غلط یک کار غیرمنطقی را مجاز جلوه می‌دهند: «حواس‌پرتی در سرعت کم»، «حق تقدم برای وسیله‌ی بزرگ‌تر».",
    },
    {
      kind: "anatomy",
      title: "صف خودروها: کجا را خالی بگذاری؟",
      scene: "queue",
      body: "روی هر بخش بزن. حتی وقتی صف ایستاده است، این جاها باید خالی بمانند تا راه بقیه بسته نشود.",
      parts: [
        { id: "incrocio", nameIt: "Incrocio", nameFa: "تقاطع", text: "وارد تقاطع نشو مگر وقتی مطمئنی می‌توانی از آن خارج شوی. فرقی نمی‌کند چراغ داشته باشد یا نه." },
        { id: "attraversamento", nameIt: "Attraversamenti pedonali e ciclabili", nameFa: "خط عابر و گذرگاه دوچرخه", text: "وقتی صف تشکیل می‌شود، روی خط عابر یا گذرگاه دوچرخه نایست." },
        { id: "binari", nameIt: "Binari del tram e passaggi a livello", nameFa: "ریل تراموا و گذرگاه راه‌آهن", text: "روی ریل یا گذرگاه راه‌آهن هرگز در صف نایست، حتی اگر ترافیک سنگین است." },
        { id: "sbocco", nameIt: "Immissioni e strade laterali", nameFa: "ورودی‌ها و خروجی خیابان‌های فرعی", text: "دهانه‌ی خیابان فرعی، ورودی پارکینگ‌ها و محل به هم پیوستن جاده‌ها را باز بگذار تا بقیه بتوانند وارد یا خارج شوند." },
        { id: "distanza", nameIt: "Distanza di sicurezza", nameFa: "فاصله‌ی ایمنی", text: "در صف هم فاصله‌ات را با خودروی جلویی حفظ کن و فقط به آن نگاه نکن؛ دورتر را هم ببین." },
      ],
      takeaway: "تقاطع، خط عابر، ریل و دهانه‌ی خیابان‌ها را خالی بگذار. روگذر، تونل و زیرگذر در این فهرست نیستند.",
      rule: "CdS art. 145 c.10; art. 147; art. 149; art. 140",
    },
    {
      kind: "factors",
      title: "وارد شهر که می‌شوی",
      body: "در شهر کاربرهای بیشتری با تو در تعامل‌اند: عابر، دوچرخه، خودروهایی که می‌ایستند و راه می‌افتند. قاعده‌ها شل‌تر نمی‌شوند؛ دقت باید بیشتر شود.",
      columns: [
        {
          title: "درست است (VERO)",
          items: [
            { fa: "حق تقدم سر تقاطع‌ها مدام عوض می‌شود", it: "può cambiare spesso la precedenza agli incroci", sourceId: "370", textIt: "Entrando in un centro abitato bisogna tenere conto che può cambiare spesso la precedenza agli incroci", answer: 1 },
            { fa: "خودروها می‌ایستند، راه می‌افتند، می‌پیچند", it: "veicoli che sono fermi, che partono o che cambiano direzione", sourceId: "371", textIt: "Entrando in un centro abitato, bisogna tenere conto che il flusso della circolazione viene spesso intralciato o interrotto da veicoli che sono fermi, che partono o che cambiano direzione", answer: 1 },
            { fa: "عابر و دوچرخه با ترافیک قاطی می‌شوند", it: "si mescolano maggiormente con il traffico motorizzato", sourceId: "372", textIt: "Entrati in un centro abitato, bisogna tenere conto che gli altri utenti della strada (quali pedoni e ciclisti) si mescolano maggiormente con il traffico motorizzato", answer: 1 },
            { fa: "باید دقیق‌تر، محتاط‌تر و صبورتر بود", it: "più attenti, prudenti e tolleranti", sourceId: "373", textIt: "In un centro abitato bisogna essere più attenti, prudenti e tolleranti, a causa del maggior numero di utenti che interagiscono nell'ambiente urbano", answer: 1 },
          ],
        },
        {
          title: "غلط است (FALSO)",
          items: [
            { fa: "سر تقاطع‌های بی‌چراغ می‌شود پارک کرد", it: "è possibile sostare in corrispondenza di incroci non regolati", sourceId: "375", textIt: "Entrando in un centro abitato, bisogna considerare che è possibile sostare in corrispondenza di incroci non regolati", answer: 0 },
            { fa: "حرکت در چند ردیف موازی همیشه مجاز است", it: "è sempre consentita la marcia per file parallele", sourceId: "376", textIt: "In un centro abitato è sempre consentita la marcia per file parallele", answer: 0 },
          ],
        },
      ],
      takeaway: "شهر یعنی دقت بیشتر، نه اجازه‌ی بیشتر.",
      rule: "CdS art. 140; art. 144; art. 158 c.1",
    },
    {
      kind: "factors",
      title: "حق تقدم، قدرت نیست",
      body: "اصل اول قانون این است: رفتار هیچ‌کس نباید خطر یا مزاحمت بسازد. حق تقدم داشتن تو را از احتیاط معاف نمی‌کند و بزرگی وسیله هم به تو حقی نمی‌دهد.",
      columns: [
        {
          title: "درست است (VERO)",
          items: [
            { fa: "رابطه‌ی درست و صبورانه با بقیه", it: "un rapporto corretto e tollerante", sourceId: "408", textIt: "Il conducente di un veicolo, oltre a rispettare le norme specifiche della circolazione, deve tenere un rapporto corretto e tollerante verso gli altri utenti della strada", answer: 1 },
            { fa: "همیشه به درست رفتار کردن بقیه تکیه نکن", it: "non deve fare sempre affidamento sul comportamento degli altri", sourceId: "414", textIt: "Il conducente di un veicolo non deve fare sempre affidamento sul comportamento degli altri, che può non essere corretto", answer: 1 },
            { fa: "اگر شک داری راهت می‌دهند، اصرار نکن", it: "non può pretendere di passare per primo", sourceId: "415", textIt: "Il conducente di un veicolo non può pretendere di passare per primo quando sorge il dubbio che non gli venga concessa la precedenza", answer: 1 },
            { fa: "به مأمور راهنمایی احترام بگذار و همکاری کن", it: "rispettare gli agenti del traffico e collaborare con essi", sourceId: "411", textIt: "Il conducente di un veicolo deve rispettare gli agenti del traffico e collaborare con essi", answer: 1 },
          ],
        },
        {
          title: "غلط است (FALSO)",
          items: [
            { fa: "وسیله‌ی بزرگ‌تر حق تقدم دارد", it: "ha, di norma, la precedenza sul conducente di un veicolo più piccolo", sourceId: "417", textIt: "Il conducente di un veicolo di grandi dimensioni ha, di norma, la precedenza sul conducente di un veicolo più piccolo", answer: 0 },
            { fa: "با قدرت وسیله‌ات حق تقدم نده", it: "approfittare della potenza del proprio veicolo", sourceId: "418", textIt: "Il conducente di un veicolo può approfittare della potenza del proprio veicolo per non dare la precedenza a chi spetta", answer: 0 },
            { fa: "احترام به مأمور فقط اگر یونیفرم داشته باشد", it: "solo se sono in divisa", sourceId: "420", textIt: "Il conducente di un veicolo deve rispettare gli agenti del traffico solo se sono in divisa", answer: 0 },
            { fa: "به جلویی کند بی‌حوصلگی نشان بده", it: "deve dare segni di impazienza", sourceId: "422", textIt: "Il conducente deve dare segni di impazienza, se il veicolo che sta davanti procede troppo lentamente", answer: 0 },
          ],
        },
      ],
      takeaway: "در این سؤال‌ها، جمله‌ای که راننده را صبورتر و محتاط‌تر می‌کند تقریباً همیشه VERO است.",
      rule: "CdS art. 140 c.1; art. 145 c.1",
    },
    {
      kind: "terms",
      title: "کلمه‌های این درس",
      terms: [
        { it: "il traffico intenso", fa: "ترافیک سنگین" },
        { it: "la coda / la fila di veicoli", fa: "صف خودروها" },
        { it: "lasciare liberi", fa: "خالی گذاشتن", base: "lasciare" },
        { it: "il centro abitato", fa: "محدوده‌ی شهری (آبادی)" },
        { it: "la marcia per file parallele", fa: "حرکت در چند ردیف موازی" },
        { it: "fare affidamento su", fa: "تکیه کردن به" },
        { it: "pretendere", fa: "اصرار کردن، طلبکار بودن" },
        { it: "tollerante", fa: "صبور، باگذشت" },
      ],
    },
    {
      kind: "trap",
      title: "تله: «سرعت کم» بهانه نیست",
      body: "هر دو جمله درباره‌ی رانندگی در صف‌اند. یکی می‌گوید قاعده «همچنان» برقرار است و دیگری با «سرعت کم» استثنا می‌سازد.",
      examples: [
        {
          sourceId: "363",
          textIt: "Quando si viaggia in fila con altri veicoli, bisogna mantenere ugualmente la distanza di sicurezza",
          answer: 1,
          chunks: [
            { it: "Quando si viaggia in fila con altri veicoli,", fa: "وقتی با خودروهای دیگر در صف حرکت می‌کنی،", focus: "condition" },
            { it: "bisogna mantenere", fa: "باید حفظ کرد", verb: "bisogna ← bisognare" },
            { it: "ugualmente", fa: "همچنان، به همان اندازه" },
            { it: "la distanza di sicurezza", fa: "فاصله‌ی ایمنی را" },
          ],
          translation: "وقتی با خودروهای دیگر در صف حرکت می‌کنی، باید همچنان فاصله‌ی ایمنی را حفظ کرد.",
          why: "درست است. در صف هم ممکن است جلویی ناگهان ترمز کند.",
        },
        {
          sourceId: "366",
          textIt: "Quando si viaggia in fila con altri veicoli è consentito distrarsi se si è a bassa velocità",
          answer: 0,
          chunks: [
            { it: "Quando si viaggia in fila con altri veicoli", fa: "وقتی با خودروهای دیگر در صف حرکت می‌کنی", focus: "condition" },
            { it: "è consentito distrarsi", fa: "حواس‌پرتی مجاز است", verb: "distrarsi ← distrarsi" },
            { it: "se si è a bassa velocità", fa: "اگر سرعتت کم باشد", focus: "condition" },
          ],
          translation: "وقتی با خودروهای دیگر در صف حرکت می‌کنی، اگر سرعتت کم باشد حواس‌پرتی مجاز است.",
          why: "غلط است. هیچ سرعتی حواس‌پرتی را مجاز نمی‌کند.",
        },
      ],
      takeaway: "شرط‌هایی مثل «اگر سرعت کم است» یا «اگر شب است» که احتیاط را کم می‌کنند، تقریباً همیشه تله‌اند.",
    },
  ],
  practice: [
    {
      sourceId: "353",
      textIt: "Bisogna lasciare liberi i passaggi a livello e i binari del tram anche in caso di traffico intenso",
      answer: 1,
      chunks: [
        { it: "Bisogna lasciare liberi", fa: "باید خالی گذاشت", verb: "bisogna ← bisognare" },
        { it: "i passaggi a livello e i binari del tram", fa: "گذرگاه‌های راه‌آهن و ریل تراموا را" },
        { it: "anche in caso di traffico intenso", fa: "حتی در ترافیک سنگین", focus: "always" },
      ],
      translation: "حتی در ترافیک سنگین باید گذرگاه‌های راه‌آهن و ریل تراموا را خالی گذاشت.",
      why: "درست است. ایستادن روی ریل یعنی گیر افتادن جلوی قطار یا تراموا.",
      rule: "CdS art. 147",
      conceptStep: 1,
    },
    {
      sourceId: "369",
      textIt: "Anche in condizioni di scarsa visibilità quando si viaggia dietro ad un veicolo che solleva polvere, conviene sorpassarlo subito",
      answer: 0,
      chunks: [
        { it: "Anche in condizioni di scarsa visibilità", fa: "حتی وقتی دید کم است", focus: "always" },
        { it: "quando si viaggia dietro ad un veicolo che solleva polvere,", fa: "وقتی پشت وسیله‌ای حرکت می‌کنی که گرد و خاک بلند می‌کند،", verb: "solleva ← sollevare" },
        { it: "conviene sorpassarlo subito", fa: "بهتر است فوراً از آن سبقت بگیری", verb: "conviene ← convenire" },
      ],
      translation: "حتی وقتی دید کم است، اگر پشت وسیله‌ای حرکت می‌کنی که گرد و خاک بلند می‌کند، بهتر است فوراً از آن سبقت بگیری.",
      why: "غلط است. با دید کم سبقت ممنوع و خطرناک است؛ باید فاصله بگیری و صبر کنی.",
      rule: "CdS art. 148 c.10",
      conceptStep: 1,
    },
    {
      sourceId: "377",
      textIt: "In un centro abitato, bisogna considerare che i pedoni e i diversamente abili devono sempre dare la precedenza ai veicoli a motore",
      answer: 0,
      chunks: [
        { it: "In un centro abitato,", fa: "در شهر،" },
        { it: "bisogna considerare che", fa: "باید در نظر گرفت که", verb: "bisogna ← bisognare" },
        { it: "i pedoni e i diversamente abili", fa: "عابران و افراد دارای معلولیت" },
        { it: "devono sempre dare la precedenza ai veicoli a motore", fa: "همیشه باید به وسایل موتوری حق تقدم بدهند", focus: "always", verb: "devono ← dovere" },
      ],
      translation: "در شهر باید در نظر گرفت که عابران و افراد دارای معلولیت همیشه باید به وسایل موتوری حق تقدم بدهند.",
      why: "غلط است. برعکس: در شهر باید با عابران و افراد آسیب‌پذیر محتاط‌تر بود و روی خط عابر حق تقدم با آن‌هاست.",
      rule: "CdS art. 191",
      conceptStep: 2,
    },
    {
      sourceId: "416",
      textIt: "Il diritto di precedenza non autorizza il conducente ad attraversare l'incrocio senza usare prudenza",
      answer: 1,
      chunks: [
        { it: "Il diritto di precedenza", fa: "حق تقدم" },
        { it: "non autorizza il conducente", fa: "به راننده اجازه نمی‌دهد", focus: "negation", verb: "autorizza ← autorizzare" },
        { it: "ad attraversare l'incrocio", fa: "از تقاطع رد شود" },
        { it: "senza usare prudenza", fa: "بدون احتیاط" },
      ],
      translation: "حق تقدم به راننده اجازه نمی‌دهد بدون احتیاط از تقاطع رد شود.",
      why: "درست است. حتی با حق تقدم ممکن است دیگری اشتباه کند؛ باید آماده‌ی ترمز باشی.",
      rule: "CdS art. 145 c.1",
      conceptStep: 3,
    },
    {
      sourceId: "419",
      textIt: "Il conducente di un veicolo pesante può tenere un comportamento che è causa di insofferenza negli altri",
      answer: 0,
      chunks: [
        { it: "Il conducente di un veicolo pesante", fa: "راننده‌ی وسیله‌ی سنگین" },
        { it: "può tenere un comportamento", fa: "می‌تواند رفتاری داشته باشد", verb: "può ← potere" },
        { it: "che è causa di insofferenza negli altri", fa: "که باعث کلافگی دیگران شود" },
      ],
      translation: "راننده‌ی وسیله‌ی سنگین می‌تواند رفتاری داشته باشد که باعث کلافگی دیگران شود.",
      why: "غلط است. هیچ راننده‌ای، با هر اندازه وسیله، حق ندارد مزاحم دیگران شود.",
      rule: "CdS art. 140 c.1",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: range(352, 369) },
    { step: 2, sourceIds: range(370, 377) },
    { step: 3, sourceIds: range(408, 422) },
  ],
};

// ── Lesson 11 ─────────────────────────────────────────────────────────────────

export const lessonDivieti: Lesson = {
  id: "divieti-sulla-strada",
  titleFa: "کارهای ممنوع در جاده",
  titleIt: "SEGNALETICA · GARE DI VELOCITÀ · STRADA PULITA",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی دست زدن به تابلوها، مسابقه‌ی سرعت و کثیف کردن جاده چرا و تا چه حد ممنوع است و اگر وسیله‌ات روغن ریخت چه باید بکنی.",
      why: "۳۰ سؤال این فصل درباره‌ی همین ممنوعیت‌هاست. جمله‌های غلط معمولاً یک استثنای ساختگی می‌سازند: «اگر به پلیس خبر بدهی»، «از ساعت ۲۳ تا ۶».",
    },
    {
      kind: "table",
      title: "ممنوع است، چون…",
      body: "این کارها ممنوع‌اند چون برای دیگران خطر می‌سازند، نه فقط چون قانون گفته. دلیل را بدانی، استثناهای ساختگی را راحت‌تر رد می‌کنی.",
      columns: ["چرا", "نتیجه"],
      rows: [
        { label: "جابه‌جا کردن، کندن یا کثیف کردن تابلو", it: "spostare, rimuovere, imbrattare la segnaletica", values: ["بقیه با اطلاعات غلط رانندگی می‌کنند؛ حتی مخروط و راه‌بند موقت", "جریمه؛ هیچ استثنایی ندارد"] },
        { label: "مسابقه‌ی سرعت بدون مجوز", it: "gare di velocità non autorizzate", values: ["خطر جدی برای همه", "جرم کیفری: زندان، حتی برای کسی که شرط می‌بندد"] },
        { label: "انداختن ته‌سیگار یا هر چیزی از پنجره", it: "gettare oggetti dal finestrino", values: ["آتش‌سوزی در جنگل، خطر برای موتورسوار و دوچرخه‌سوار", "جریمه"] },
        { label: "ریختن گل یا خاک روی جاده", it: "spargere fango o detriti", values: ["جاده لغزنده می‌شود", "جریمه‌ی اداری؛ قبل از ورود به جاده چرخ‌ها را تمیز کن"] },
        { label: "نشت شدید روغن یا سوخت", it: "perdite di olio o carburante", values: ["جاده لغزنده می‌شود", "هر کاری برای رفع خطر بکن و فوراً به اداره‌ی جاده یا پلیس خبر بده"] },
      ],
      takeaway: "در این ممنوعیت‌ها استثنای «اگر…» یا «ساعت…» وجود ندارد.",
      rule: "CdS art. 9-ter; art. 15 c.1",
    },
    {
      kind: "factors",
      title: "تابلو و مسابقه",
      body: "هیچ‌کس جز اداره‌ی صاحب جاده حق ندارد به تابلوها دست بزند. مسابقه‌ی سرعتِ بی‌مجوز در جاده‌ی عمومی جرم است، نه تخلف ساده.",
      columns: [
        {
          title: "درست است (VERO)",
          items: [
            { fa: "جابه‌جا کردن یا کثیف کردن تابلو ممنوع است", it: "È vietato spostare o imbrattare la segnaletica stradale", sourceId: "378", textIt: "È vietato spostare o imbrattare la segnaletica stradale", answer: 1 },
            { fa: "جابه‌جا کردن تابلو ممکن است خطر جدی بسازد", it: "può comportare pericolo grave", sourceId: "380", textIt: "Spostare la segnaletica stradale può comportare pericolo grave per gli altri utenti della strada", answer: 1 },
            { fa: "مسابقه‌ی سرعت در جاده ممنوع است", it: "è vietato gareggiare in velocità", sourceId: "384", textIt: "Sulle strade è vietato gareggiare in velocità", answer: 1 },
            { fa: "شرط‌بندی روی مسابقه‌ی بی‌مجوز: زندان", it: "chi scommette su veicoli", sourceId: "387", textIt: "E' punito con la reclusione chi scommette su veicoli che partecipano a gare di velocità non autorizzate su strade pubbliche", answer: 1 },
          ],
        },
        {
          title: "غلط است (FALSO)",
          items: [
            { fa: "جابه‌جایی مجاز است اگر تابلوی خطر نباشد", it: "se non si tratta di segnali di pericolo", sourceId: "381", textIt: "E' consentito spostare la segnaletica stradale, se non si tratta di segnali di pericolo", answer: 0 },
            { fa: "جابه‌جایی مجاز است اگر به پلیس خبر بدهی", it: "dopo aver avvisato gli organi di polizia", sourceId: "382", textIt: "E' consentito spostare la segnaletica stradale, dopo aver avvisato gli organi di polizia", answer: 0 },
            { fa: "مسابقه از ساعت ۲۳ تا ۶ مجاز است", it: "dalle ore 23.00 alle ore 6.00", sourceId: "389", textIt: "Sulle strade pubbliche sono consentite le gare di velocità, anche se non autorizzate, dalle ore 23.00 alle ore 6.00", answer: 0 },
            { fa: "مسابقه‌ی ورزشی در جاده‌ی عمومی بدون مجوز", it: "consentite senza autorizzazione", sourceId: "388", textIt: "Le competizioni sportive con veicoli su aree pubbliche sono consentite senza autorizzazione", answer: 0 },
          ],
        },
      ],
      takeaway: "«مجاز است اگر…» درباره‌ی تابلو و مسابقه همیشه FALSO است.",
      rule: "CdS art. 9; art. 9-ter; art. 15 c.1 lett. a–b",
    },
    {
      kind: "factors",
      title: "جاده را تمیز و ایمن نگه دار",
      body: "هر چیزی که روی جاده بیفتد (ته‌سیگار، کاغذ، گل، روغن) برای نفر بعدی خطر است، مخصوصاً برای موتورسوار و دوچرخه‌سوار.",
      columns: [
        {
          title: "درست است (VERO)",
          items: [
            { fa: "انداختن ته‌سیگار روشن از پنجره ممنوع است", it: "lanciare dal finestrino mozziconi di sigaretta accesi", sourceId: "392", textIt: "E' vietato lanciare dal finestrino mozziconi di sigaretta accesi", answer: 1 },
            { fa: "ته‌سیگار کنار جنگل ممکن است آتش‌سوزی راه بیندازد", it: "potrebbe causare incendi", sourceId: "394", textIt: "Gettare mozziconi accesi dai finestrini in prossimità di boschi o aree verdi potrebbe causare incendi", answer: 1 },
            { fa: "ریختن گل و خاک با چرخ‌های کثیف ممنوع است", it: "spargere fango o detriti", sourceId: "395", textIt: "E' vietato spargere fango o detriti sulle strade con le ruote sporche dei veicoli", answer: 1 },
            { fa: "از روی چاله‌ی آب آهسته رد شو", it: "procedere a bassa velocità sopra le pozzanghere", sourceId: "399", textIt: "Alla guida di un veicolo il conducente deve procedere a bassa velocità sopra le pozzanghere", answer: 1 },
          ],
        },
        {
          title: "غلط است (FALSO)",
          items: [
            { fa: "انداختن کاغذ از پنجره مجاز است", it: "lanciare la carta dal finestrino", sourceId: "404", textIt: "E' consentito lanciare la carta dal finestrino", answer: 0 },
            { fa: "انداختن اشیا روی شانه‌ی جاده مجاز است", it: "lanciare oggetti dal finestrino sulla banchina", sourceId: "405", textIt: "Il conducente può lanciare oggetti dal finestrino sulla banchina", answer: 0 },
            { fa: "جابه‌جا کردن تابلوی موقت برای پارک کردن", it: "spostare i segnali stradali verticali temporanei per parcheggiare", sourceId: "403", textIt: "E' consentito spostare i segnali stradali verticali temporanei per parcheggiare il veicolo", answer: 0 },
            { fa: "روی سنگ‌ریزه با سرعت بالا", it: "circolare a velocità sostenuta", sourceId: "406", textIt: "Su una strada ricoperta da brecciolino il conducente può circolare a velocità sostenuta", answer: 0 },
          ],
        },
      ],
      takeaway: "حیوان خانگی روی موتور یا دوچرخه فقط در قفس و حداکثر ۵۰ سانتی‌متر بیرون‌زده مجاز است.",
      rule: "CdS art. 15 c.1 lett. f, i; art. 170",
    },
    {
      kind: "terms",
      title: "کلمه‌های این درس",
      terms: [
        { it: "la segnaletica stradale", fa: "تابلوها و علائم راه" },
        { it: "spostare / rimuovere", fa: "جابه‌جا کردن / برداشتن" },
        { it: "imbrattare", fa: "کثیف کردن، رنگ زدن" },
        { it: "la gara di velocità", fa: "مسابقه‌ی سرعت" },
        { it: "la reclusione", fa: "زندان" },
        { it: "il mozzicone", fa: "ته‌سیگار" },
        { it: "il fango", fa: "گل" },
        { it: "la perdita di olio", fa: "نشت روغن" },
      ],
    },
    {
      kind: "trap",
      title: "تله: استثنای ساختگی",
      body: "جمله‌ی دوم با یک شرط مهربان («اگر تابلوی خطر نباشد») شروع می‌کند تا کاری ممنوع را مجاز جلوه دهد.",
      examples: [
        {
          sourceId: "379",
          textIt: "È vietato rimuovere la segnaletica stradale",
          answer: 1,
          chunks: [
            { it: "È vietato", fa: "ممنوع است", focus: "negation" },
            { it: "rimuovere", fa: "برداشتن" },
            { it: "la segnaletica stradale", fa: "علائم راه" },
          ],
          translation: "برداشتن علائم راه ممنوع است.",
          why: "درست است، بدون استثنا.",
        },
        {
          sourceId: "383",
          textIt: "E' consentito spostare la segnaletica stradale, se si tratta delle barriere di delimitazione o dei coni stradali",
          answer: 0,
          chunks: [
            { it: "E' consentito", fa: "مجاز است", verb: "consentito ← consentire" },
            { it: "spostare la segnaletica stradale,", fa: "جابه‌جا کردن علائم راه،" },
            { it: "se si tratta delle barriere di delimitazione o dei coni stradali", fa: "اگر راه‌بندهای مرزنما یا مخروط‌های راه باشند", focus: "condition" },
          ],
          translation: "جابه‌جا کردن علائم راه مجاز است، اگر راه‌بندهای مرزنما یا مخروط‌های راه باشند.",
          why: "غلط است. مخروط و راه‌بند هم علامت‌اند؛ جابه‌جا کردنشان ممکن است کارگر یا راننده‌ای را در خطر بیندازد.",
        },
      ],
      takeaway: "اگر جمله‌ای کار ممنوعی را «با یک شرط» مجاز کرد، به شرط شک کن.",
    },
  ],
  practice: [
    {
      sourceId: "386",
      textIt: "E' punito con la reclusione il conducente che gareggia in velocità su strade pubbliche",
      answer: 1,
      chunks: [
        { it: "E' punito con la reclusione", fa: "به زندان محکوم می‌شود", verb: "punito ← punire" },
        { it: "il conducente che gareggia in velocità", fa: "راننده‌ای که مسابقه‌ی سرعت می‌دهد", verb: "gareggia ← gareggiare" },
        { it: "su strade pubbliche", fa: "در جاده‌های عمومی" },
      ],
      translation: "راننده‌ای که در جاده‌های عمومی مسابقه‌ی سرعت می‌دهد به زندان محکوم می‌شود.",
      why: "درست است. مسابقه‌ی بی‌مجوز جرم کیفری است.",
      rule: "CdS art. 9-ter",
      conceptStep: 2,
    },
    {
      sourceId: "391",
      textIt: "Sulle strade pubbliche sono consentite le gare di velocità, anche se non autorizzate, tra motocicli e non tra autoveicoli",
      answer: 0,
      chunks: [
        { it: "Sulle strade pubbliche", fa: "در جاده‌های عمومی" },
        { it: "sono consentite le gare di velocità,", fa: "مسابقه‌های سرعت مجازند،", verb: "consentite ← consentire" },
        { it: "anche se non autorizzate,", fa: "حتی اگر مجوز نداشته باشند،", focus: "condition" },
        { it: "tra motocicli e non tra autoveicoli", fa: "بین موتورسیکلت‌ها، نه بین خودروها", focus: "contrast" },
      ],
      translation: "در جاده‌های عمومی مسابقه‌های سرعت، حتی بدون مجوز، بین موتورسیکلت‌ها مجازند، نه بین خودروها.",
      why: "غلط است. نوع وسیله مهم نیست؛ مسابقه‌ی بی‌مجوز برای همه ممنوع و جرم است.",
      rule: "CdS art. 9-ter",
      conceptStep: 2,
    },
    {
      sourceId: "393",
      textIt: "Gettare mozziconi di sigaretta accesi dai finestrini è molto pericoloso soprattutto se sopraggiungono veicoli a due ruote",
      answer: 1,
      chunks: [
        { it: "Gettare mozziconi di sigaretta accesi dai finestrini", fa: "انداختن ته‌سیگار روشن از پنجره" },
        { it: "è molto pericoloso", fa: "خیلی خطرناک است" },
        { it: "soprattutto se sopraggiungono veicoli a due ruote", fa: "مخصوصاً اگر وسیله‌ی دوچرخ از پشت برسد", focus: "condition", verb: "sopraggiungono ← sopraggiungere" },
      ],
      translation: "انداختن ته‌سیگار روشن از پنجره خیلی خطرناک است، مخصوصاً اگر وسیله‌ی دوچرخ از پشت برسد.",
      why: "درست است. ته‌سیگار ممکن است به صورت یا لباس موتورسوار بخورد.",
      rule: "CdS art. 15 c.1 lett. i",
      conceptStep: 3,
    },
    {
      sourceId: "397",
      textIt: "Il conducente che si accorga che il suo veicolo ha forti perdite di olio o carburante, deve immediatamente avvisare l’ente proprietario della strada o gli organi di polizia",
      answer: 1,
      chunks: [
        { it: "Il conducente che si accorga", fa: "راننده‌ای که متوجه شود", verb: "accorga ← accorgersi" },
        { it: "che il suo veicolo ha forti perdite di olio o carburante,", fa: "که وسیله‌اش نشت شدید روغن یا سوخت دارد،" },
        { it: "deve immediatamente avvisare", fa: "باید فوراً خبر بدهد", verb: "deve ← dovere" },
        { it: "l’ente proprietario della strada o gli organi di polizia", fa: "به اداره‌ی صاحب جاده یا پلیس" },
      ],
      translation: "راننده‌ای که متوجه شود وسیله‌اش نشت شدید روغن یا سوخت دارد، باید فوراً به اداره‌ی صاحب جاده یا پلیس خبر بدهد.",
      why: "درست است. روغن روی آسفالت جاده را برای همه لغزنده می‌کند و باید سریع پاک یا علامت‌گذاری شود.",
      rule: "CdS art. 15 c.1 lett. f",
      conceptStep: 3,
    },
    {
      sourceId: "407",
      textIt: "Il conducente può superare i veicoli in coda accelerando bruscamente e cambiando ripetutamente corsia",
      answer: 0,
      chunks: [
        { it: "Il conducente può superare i veicoli in coda", fa: "راننده می‌تواند از خودروهای صف جلو بزند", verb: "può ← potere" },
        { it: "accelerando bruscamente", fa: "با گاز دادن ناگهانی", verb: "accelerando ← accelerare" },
        { it: "e cambiando ripetutamente corsia", fa: "و تغییر خط پشت سر هم", verb: "cambiando ← cambiare" },
      ],
      translation: "راننده می‌تواند با گاز دادن ناگهانی و تغییر خط پشت سر هم از خودروهای صف جلو بزند.",
      why: "غلط است. این رانندگی پرخطر است و بقیه را مجبور به ترمز ناگهانی می‌کند.",
      rule: "CdS art. 140; art. 154",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 2, sourceIds: range(378, 391) },
    { step: 3, sourceIds: range(392, 407) },
  ],
};

// ── Lesson 12 ─────────────────────────────────────────────────────────────────

export const lessonCiclisti: Lesson = {
  id: "ciclisti-e-visibilita",
  titleFa: "دوچرخه‌سوار، موتورسوار و نقطه‌ی کور",
  titleIt: "CICLISTI · MOTOCICLISTI · VISIBILITÀ · TAXI",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی دوچرخه‌سوار و موتورسوار کجا از دیدت پنهان می‌شوند، چطور با فاصله‌ی درست از دوچرخه سبقت بگیری و با چه کسانی باید محتاط‌تر باشی.",
      why: "۳۸ سؤال درباره‌ی کاربرهای آسیب‌پذیر و دید راننده است. تصادفی که برای سواری «جزئی» است، برای دوچرخه‌سوار ممکن است جدی باشد.",
    },
    {
      kind: "anatomy",
      title: "دید تو و دوچرخه‌سوار",
      scene: "cyclist",
      body: "روی هر بخش بزن. این‌ها جاهایی‌اند که دوچرخه‌سوار یا موتورسوار ممکن است دیده نشود یا آسیب ببیند.",
      parts: [
        { id: "montante", nameIt: "Montante", nameFa: "ستون کنار شیشه", text: "ستون‌های داخلی بدنه‌ی خودرو دید را محدود می‌کنند و ممکن است یک دوچرخه یا موتور را کاملاً پنهان کنند. سرت را حرکت بده تا پشتشان را ببینی." },
        { id: "specchietto", nameIt: "Specchietto retrovisore", nameFa: "آینه", text: "مرتب در آینه نگاه کن ببین دوچرخه یا موتوری از پشت می‌رسد یا نه، نه فقط کامیون و اتوبوس." },
        { id: "sportello", nameIt: "Sportello", nameFa: "در خودرو", text: "بعد از پارک، قبل از باز کردن در نگاه کن دوچرخه یا موتوری نمی‌رسد. دری که ناگهان باز شود دوچرخه‌سوار را زمین می‌زند." },
        { id: "distanza", nameIt: "Distanza laterale", nameFa: "فاصله‌ی کناری در سبقت", text: "دوچرخه‌سوار گاهی کمی تاب می‌خورد. از دسامبر ۲۰۲۴ قانون در سبقت از دوچرخه، هر جا جاده اجازه دهد، حداقل ۱٫۵ متر فاصله‌ی کناری می‌خواهد. اگر نمی‌شود، سبقت نگیر." },
      ],
      takeaway: "دوچرخه‌سوار کوچک است و راحت پنهان می‌شود: آینه، ستون‌ها و در خودرو را جدی بگیر.",
      rule: "CdS art. 148 c.9-bis (L. 177/2024); art. 157 c.7",
    },
    {
      kind: "factors",
      title: "با چه کسانی محتاط‌تر باشی؟",
      body: "احتیاط بیشتر برای کسانی است که کندتر واکنش نشان می‌دهند یا رفتارشان قابل پیش‌بینی نیست، نه برای نوع گواهینامه یا نوع خودرو.",
      columns: [
        {
          title: "درست است (VERO)",
          items: [
            { fa: "افراد دارای معلولیت", it: "persone diversamente abili", sourceId: "434", textIt: "Bisogna usare maggiore prudenza nei confronti delle persone diversamente abili", answer: 1 },
            { fa: "سالمندان", it: "persone anziane", sourceId: "435", textIt: "Bisogna usare maggiore prudenza nei confronti delle persone anziane", answer: 1 },
            { fa: "راننده‌ای که مردد رانندگی می‌کند", it: "una guida incerta", sourceId: "437", textIt: "Bisogna usare maggiore prudenza nei confronti dei conducenti che dimostrano una guida incerta", answer: 1 },
            { fa: "دوچرخه‌سوار و کسی که به‌سختی حرکت می‌کند", it: "persone in bicicletta e di quelle con scarsa capacità di movimento", sourceId: "439", textIt: "Bisogna usare maggiore prudenza nei confronti delle persone in bicicletta e di quelle con scarsa capacità di movimento", answer: 1 },
          ],
        },
        {
          title: "غلط است (FALSO)",
          items: [
            { fa: "راننده با گواهینامه‌ی خارجی", it: "patente di guida in uno Stato estero", sourceId: "440", textIt: "Bisogna usare particolare prudenza nei confronti dei conducenti che hanno conseguito la patente di guida in uno Stato estero", answer: 0 },
            { fa: "راننده‌ی خودروی برقی", it: "autoveicoli elettrici", sourceId: "441", textIt: "Bisogna usare maggiore prudenza nei confronti dei conducenti di autoveicoli elettrici", answer: 0 },
            { fa: "راننده‌ی سه‌چرخ موتوری", it: "tricicli a motore", sourceId: "443", textIt: "Bisogna usare maggiore prudenza nei confronti dei conducenti di tricicli a motore", answer: 0 },
            { fa: "عصای سفید بله، سفید و قرمز نه", it: "ma non di quelli con bastone bianco-rosso", sourceId: "444", textIt: "Bisogna usare maggiore prudenza nei confronti dei pedoni muniti di bastone bianco, ma non di quelli con bastone bianco-rosso", answer: 0 },
          ],
        },
      ],
      takeaway: "احتیاط بیشتر به آسیب‌پذیری آدم‌ها بستگی دارد، نه به ملیت یا نوع موتور خودرو.",
      rule: "CdS art. 140; art. 191 c.3",
    },
    {
      kind: "table",
      title: "تاکسی و سبقت از کاربرهای کند",
      body: "کنار ایستگاه تاکسی مسافرها ناگهان پیاده یا سوار می‌شوند. وقتی دوچرخه‌سوار یا عابر روی سواره‌رو است، سبقت ممنوع نیست، ولی فقط با فاصله‌ی کافی.",
      columns: ["چه باید کرد", "تله‌ی رایج"],
      rows: [
        { label: "ایستگاه تاکسی", it: "posteggio riservato ai taxi", values: ["آهسته کن، مراقب کسانی باش که سوار و پیاده می‌شوند یا بی‌هوا از خیابان رد می‌شوند", "تاکسیِ در حال حرکت حق تقدم ویژه ندارد؛ پارک غیرتاکسی در ایستگاه هیچ ساعتی مجاز نیست"] },
        { label: "سبقت از دوچرخه یا عابر", it: "sorpassare ciclisti o pedoni", values: ["فاصله‌ی کناری کافی؛ برای دوچرخه حداقل ۱٫۵ متر هر جا ممکن است؛ بیرون شهر بوق کوتاه توصیه می‌شود", "«حداقل ۲ متر»، «حداکثر ۳۰ کیلومتر» و «سبقت ممنوع است» هر سه FALSO هستند"] },
        { label: "شب و خط عابر", it: "di notte, strisce pedonali", values: ["حق تقدم عابر شب و روز یکی است", "«شب لازم نیست به عابر راه بدهی» غلط است"] },
      ],
      takeaway: "عدد ۱٫۵ متر قانون فعلی است؛ جمله‌ی بانک با «۲ متر» غلط می‌ماند.",
      rule: "CdS art. 148 c.9-bis (L. 177/2024); art. 156; art. 191; art. 158",
    },
    {
      kind: "terms",
      title: "کلمه‌های این درس",
      terms: [
        { it: "il ciclista", fa: "دوچرخه‌سوار" },
        { it: "il motociclista", fa: "موتورسوار" },
        { it: "lo specchietto retrovisore", fa: "آینه‌ی عقب" },
        { it: "i montanti", fa: "ستون‌های بدنه‌ی خودرو" },
        { it: "lo sportello", fa: "در خودرو" },
        { it: "sopraggiungere", fa: "از پشت رسیدن" },
        { it: "la distanza laterale", fa: "فاصله‌ی کناری" },
        { it: "il posteggio dei taxi", fa: "ایستگاه تاکسی" },
      ],
    },
    {
      kind: "trap",
      title: "تله: «ممنوع» به جای «با احتیاط»",
      body: "هر دو جمله درباره‌ی سبقت از دوچرخه‌سوار و عابر هستند. یکی شرطِ فاصله را می‌گذارد و دیگری کل کار را ممنوع می‌کند.",
      examples: [
        {
          sourceId: "513",
          textIt: "Quando la carreggiata è occupata da ciclisti o pedoni, non è prudente sorpassarli se non si può rispettare una distanza laterale sufficiente.",
          answer: 1,
          chunks: [
            { it: "Quando la carreggiata è occupata da ciclisti o pedoni,", fa: "وقتی دوچرخه‌سوار یا عابر روی سواره‌رو است،", focus: "condition" },
            { it: "non è prudente sorpassarli", fa: "سبقت گرفتن از آن‌ها محتاطانه نیست", focus: "negation" },
            { it: "se non si può rispettare", fa: "اگر نشود رعایت کرد", focus: "condition", verb: "può ← potere" },
            { it: "una distanza laterale sufficiente.", fa: "فاصله‌ی کناری کافی را." },
          ],
          translation: "وقتی دوچرخه‌سوار یا عابر روی سواره‌رو است، اگر نشود فاصله‌ی کناری کافی را رعایت کرد، سبقت گرفتن از آن‌ها محتاطانه نیست.",
          why: "درست است. سبقت مشروط به فاصله‌ی کافی است.",
        },
        {
          sourceId: "518",
          textIt: "E' vietato sorpassare ciclisti o pedoni che occupano la carreggiata",
          answer: 0,
          chunks: [
            { it: "E' vietato", fa: "ممنوع است", focus: "negation" },
            { it: "sorpassare ciclisti o pedoni", fa: "سبقت گرفتن از دوچرخه‌سواران یا عابران" },
            { it: "che occupano la carreggiata", fa: "که روی سواره‌رو هستند", verb: "occupano ← occupare" },
          ],
          translation: "سبقت گرفتن از دوچرخه‌سواران یا عابرانی که روی سواره‌رو هستند ممنوع است.",
          why: "غلط است. ممنوع نیست؛ با فاصله‌ی کافی و احتیاط مجاز است.",
        },
      ],
      takeaway: "قانون برای سبقت از دوچرخه شرط می‌گذارد، نه ممنوعیت.",
    },
  ],
  practice: [
    {
      sourceId: "425",
      textIt: "Il conducente, dopo aver posteggiato il veicolo al lato della carreggiata, prima di aprire lo sportello deve controllare che non sopraggiungano ciclisti o motociclisti",
      answer: 1,
      chunks: [
        { it: "Il conducente,", fa: "راننده،" },
        { it: "dopo aver posteggiato il veicolo al lato della carreggiata,", fa: "بعد از پارک کردن وسیله کنار سواره‌رو،", verb: "posteggiato ← posteggiare" },
        { it: "prima di aprire lo sportello", fa: "قبل از باز کردن در" },
        { it: "deve controllare", fa: "باید نگاه کند", verb: "deve ← dovere" },
        { it: "che non sopraggiungano ciclisti o motociclisti", fa: "که دوچرخه‌سوار یا موتورسواری از پشت نرسد", verb: "sopraggiungano ← sopraggiungere" },
      ],
      translation: "راننده بعد از پارک کردن وسیله کنار سواره‌رو، قبل از باز کردن در باید نگاه کند که دوچرخه‌سوار یا موتورسواری از پشت نرسد.",
      why: "درست است. در خودرو که ناگهان باز شود دوچرخه‌سوار را زمین می‌زند.",
      rule: "CdS art. 157 c.7",
      conceptStep: 1,
    },
    {
      sourceId: "427",
      textIt: "I montanti interni degli autoveicoli riducono la possibilità di vedere un ciclista o un motociclista",
      answer: 1,
      chunks: [
        { it: "I montanti interni degli autoveicoli", fa: "ستون‌های داخلی بدنه‌ی خودروها" },
        { it: "riducono la possibilità di vedere", fa: "امکان دیدن را کم می‌کنند", verb: "riducono ← ridurre" },
        { it: "un ciclista o un motociclista", fa: "یک دوچرخه‌سوار یا موتورسوار" },
      ],
      translation: "ستون‌های داخلی بدنه‌ی خودروها امکان دیدن یک دوچرخه‌سوار یا موتورسوار را کم می‌کنند.",
      why: "درست است. پشت ستون جلویی کاملاً جا برای یک دوچرخه هست.",
      rule: "CdS art. 140",
      conceptStep: 1,
    },
    {
      sourceId: "442",
      textIt: "Bisogna usare maggiore prudenza nei confronti dei conducenti di taxi",
      answer: 0,
      chunks: [
        { it: "Bisogna usare maggiore prudenza", fa: "باید احتیاط بیشتری کرد", verb: "bisogna ← bisognare" },
        { it: "nei confronti dei conducenti di taxi", fa: "در برابر راننده‌های تاکسی" },
      ],
      translation: "در برابر راننده‌های تاکسی باید احتیاط بیشتری کرد.",
      why: "غلط است. راننده‌ی تاکسی دسته‌ی آسیب‌پذیری نیست. کنار ایستگاه تاکسی، مراقب مسافرها هستی، نه راننده.",
      rule: "CdS art. 140",
      conceptStep: 2,
    },
    {
      sourceId: "509",
      textIt: "Il conducente, in vicinanza di un posteggio riservato ai taxi, deve dare la precedenza ai taxi che s'immettono sulla strada",
      answer: 0,
      chunks: [
        { it: "Il conducente,", fa: "راننده،" },
        { it: "in vicinanza di un posteggio riservato ai taxi,", fa: "نزدیک ایستگاه تاکسی،" },
        { it: "deve dare la precedenza", fa: "باید حق تقدم بدهد", verb: "deve ← dovere" },
        { it: "ai taxi che s'immettono sulla strada", fa: "به تاکسی‌هایی که وارد خیابان می‌شوند", verb: "immettono ← immettersi" },
      ],
      translation: "راننده نزدیک ایستگاه تاکسی باید به تاکسی‌هایی که وارد خیابان می‌شوند حق تقدم بدهد.",
      why: "غلط است. تاکسی‌ای که از ایستگاه وارد خیابان می‌شود حق تقدم ویژه ندارد؛ خودش باید راه بدهد.",
      rule: "CdS art. 154",
      conceptStep: 3,
    },
    {
      sourceId: "517",
      textIt: "Il conducente che intende sorpassare ciclisti o pedoni che occupano la carreggiata deve mantenere una distanza laterale di almeno 2 metri",
      answer: 0,
      chunks: [
        { it: "Il conducente che intende sorpassare", fa: "راننده‌ای که قصد سبقت دارد", verb: "intende ← intendere" },
        { it: "ciclisti o pedoni che occupano la carreggiata", fa: "از دوچرخه‌سواران یا عابرانی که روی سواره‌رو هستند" },
        { it: "deve mantenere", fa: "باید حفظ کند", verb: "deve ← dovere" },
        { it: "una distanza laterale di almeno 2 metri", fa: "فاصله‌ی کناری حداقل ۲ متر", focus: "limit" },
      ],
      translation: "راننده‌ای که قصد سبقت از دوچرخه‌سواران یا عابرانِ روی سواره‌رو را دارد، باید فاصله‌ی کناری حداقل ۲ متر حفظ کند.",
      why:
        "غلط است. عدد ۲ متر در قانون نیست. قانون فعلی (از دسامبر ۲۰۲۴) برای دوچرخه، هر جا جاده اجازه دهد، حداقل ۱٫۵ متر می‌خواهد؛ برای عابر «فاصله‌ی کافی».",
      rule: "CdS art. 148 c.9-bis (L. 177/2024)",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: range(423, 433) },
    { step: 2, sourceIds: range(434, 444) },
    { step: 3, sourceIds: range(505, 520) },
  ],
};

// ── Lesson 13 ─────────────────────────────────────────────────────────────────

export const lessonPedoni: Lesson = {
  id: "pedoni-vulnerabili",
  titleFa: "عابر پیاده: سالمند، نابینا، باردار",
  titleIt: "PEDONI · ANZIANI · NON VEDENTI · GRAVIDANZA",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی نزدیک خط عابر چه رفتارهای غیرمنتظره‌ای را باید پیش‌بینی کنی و در برابر عابر نابینا، سالمند یا باردار دقیقاً چه کاری بکنی.",
      why: "۴۹ سؤال درباره‌ی عابران آسیب‌پذیر است. جمله‌های غلط معمولاً برای عابر شرط می‌گذارند («فقط اگر از چپ به راست») یا به او عجله می‌دهند («بوق بزن»).",
    },
    {
      kind: "anatomy",
      title: "نزدیک یک خط عابر",
      scene: "crossing",
      body: "روی هر بخش بزن. هر کدام یک رفتار غیرمنتظره است که باید پیش‌بینی کنی.",
      parts: [
        { id: "parcheggiate", nameIt: "Veicoli parcheggiati", nameFa: "خودروهای پارک‌شده", text: "خودروهای پارک‌شده کنار خط عابر دیدت را می‌بندند؛ بچه‌ها ممکن است ناگهان از بینشان بیرون بیایند." },
        { id: "fermo", nameIt: "Pedone fermo sulle strisce", nameFa: "عابری که وسط خط ایستاده", text: "عابری که وسط خط عابر ایستاده از حقش نگذشته؛ ممکن است دوباره راه بیفتد. صبر کن." },
        { id: "indietro", nameIt: "Pedone che torna indietro", nameFa: "عابری که برمی‌گردد", text: "عابر ممکن است وسط راه مردد شود و ناگهان برگردد، مخصوصاً بچه‌ها." },
        { id: "anziano", nameIt: "Persona anziana", nameFa: "سالمند", text: "آهسته عبور می‌کند، ممکن است وسط راه بایستد، سرعت خودروها را بد تخمین بزند و دیر واکنش نشان دهد. نزدیکش نرو و بوق نزن." },
        { id: "scivolo", nameIt: "Scivolo del marciapiede", nameFa: "شیب پیاده‌رو", text: "جلوی شیب پیاده‌رو پارک نکن؛ کسی که کالسکه یا ویلچر دارد از همین‌جا رد می‌شود. هیچ ساعتی استثنا نیست." },
      ],
      takeaway: "نزدیک خط عابر انتظار هر رفتار غیرمنتظره‌ای را داشته باش و آهسته کن.",
      rule: "CdS art. 191 c.1; art. 158 c.2",
    },
    {
      kind: "table",
      title: "عصای سفید، سفید و قرمز، سگ راهنما",
      body: "قانون می‌گوید جلوی این افراد بایست، چه در حال عبور باشند چه آماده‌ی عبور، و فرقی نمی‌کند روی خط عابر باشند یا بیرون آن.",
      columns: ["یعنی", "تو چه می‌کنی"],
      rows: [
        { label: "عصای سفید", it: "bastone bianco", values: ["نابینا", "می‌ایستی و حق تقدم می‌دهی، حتی بیرون از خط عابر و حتی بدون سگ راهنما"] },
        { label: "عصای سفید و قرمز", it: "bastone bianco-rosso", values: ["ناشنوا و نابینا", "دقیقاً همان: می‌ایستی و حق تقدم می‌دهی"] },
        { label: "سگ راهنما", it: "cane guida", values: ["نابینا", "می‌ایستی و حق تقدم می‌دهی"] },
        { label: "چطور بایستی", values: ["—", "آرام، بدون ترمز ناگهانی که بترساندش؛ بوق نزن و انتظار نداشته باش سریع و بی‌تردید راه برود"] },
      ],
      takeaway: "عصای سفید و عصای سفید و قرمز یک قاعده دارند: بایست، حتی بیرون خط عابر.",
      rule: "CdS art. 191 c.3",
    },
    {
      kind: "factors",
      title: "سالمندان و زنان باردار",
      body: "هر دو آهسته‌تر از جاده رد می‌شوند. وظیفه‌ی تو صبر است، نه عجله دادن. حق تقدمشان به جهت عبورشان بستگی ندارد.",
      columns: [
        {
          title: "درست است (VERO)",
          items: [
            { fa: "سالمند ممکن است وسط خیابان ناگهان بایستد", it: "potrebbero fermarsi improvvisamente al centro della strada", sourceId: "446", textIt: "Quando le persone anziane attraversano la carreggiata bisogna tenere presente che potrebbero fermarsi improvvisamente al centro della strada", answer: 1 },
            { fa: "سالمند ممکن است سرعت خودروها را بد تخمین بزند", it: "potrebbero valutare male la velocità dei veicoli", sourceId: "451", textIt: "Le persone anziane che attraversano la carreggiata sono esposte a maggiori pericoli, perché potrebbero valutare male la velocità dei veicoli che sopraggiungono", answer: 1 },
            { fa: "به سالمند خیلی نزدیک نشو", it: "non bisogna avvicinarsi troppo con il veicolo", sourceId: "449", textIt: "Quando le persone anziane attraversano la carreggiata non bisogna avvicinarsi troppo con il veicolo, per evitare che si sentano minacciati e reagiscano con movimenti pericolosi", answer: 1 },
            { fa: "بگذار زن باردار بی‌عجله رد شود", it: "senza metterle fretta", sourceId: "521", textIt: "Il conducente deve consentire ad una donna incinta di attraversare la strada senza metterle fretta", answer: 1 },
          ],
        },
        {
          title: "غلط است (FALSO)",
          items: [
            { fa: "سالمندان واکنش سریع‌تری دارند", it: "hanno i riflessi più rapidi", sourceId: "452", textIt: "Quando le persone anziane attraversano la carreggiata bisogna tenere presente che hanno i riflessi più rapidi e quindi attraversano con più accortezza", answer: 0 },
            { fa: "با چراغ و بوق به سالمند عجله بده", it: "bisogna lampeggiare e suonare il clacson", sourceId: "455", textIt: "Quando le persone anziane attraversano la carreggiata bisogna lampeggiare e suonare il clacson per farle attraversare rapidamente", answer: 0 },
            { fa: "فقط به کسی که از چپ به راست می‌رود راه بده", it: "solo a coloro che attraversano da sinistra a destra", sourceId: "456", textIt: "Quando le persone anziane attraversano la carreggiata bisogna dare la precedenza solo a coloro che attraversano da sinistra a destra", answer: 0 },
            { fa: "کسی که کالسکه دارد معمولاً سریع رد می‌شود", it: "di solito, attraversa rapidamente", sourceId: "527", textIt: "Quando un pedone che spinge una carrozzina per bambini attraversa la carreggiata bisogna tenere presente che, di solito, attraversa rapidamente", answer: 0 },
          ],
        },
      ],
      takeaway: "«فقط از چپ به راست» در همه‌ی این سؤال‌ها ساختگی و FALSO است.",
      rule: "CdS art. 191; art. 140",
    },
    {
      kind: "terms",
      title: "کلمه‌های این درس",
      terms: [
        { it: "il pedone", fa: "عابر پیاده" },
        { it: "la persona anziana", fa: "سالمند" },
        { it: "il non vedente", fa: "نابینا" },
        { it: "il bastone bianco", fa: "عصای سفید" },
        { it: "il cane guida", fa: "سگ راهنما" },
        { it: "la donna incinta", fa: "زن باردار" },
        { it: "la carrozzina per bambini", fa: "کالسکه‌ی بچه" },
        { it: "si accinge ad attraversare", fa: "آماده‌ی عبور است", base: "accingersi" },
      ],
    },
    {
      kind: "trap",
      title: "تله: «فقط اگر عصای سفید و قرمز»",
      body: "هر دو جمله درباره‌ی عابر نابینا بیرون خط عابر‌اند. یکی هر دو عصا را می‌پذیرد و دیگری فقط یکی را.",
      examples: [
        {
          sourceId: "461",
          textIt: "Il conducente deve dare la precedenza al pedone con il bastone bianco o bianco-rosso che attraversa la strada, anche se è fuori dalle strisce di un attraversamento pedonale",
          answer: 1,
          chunks: [
            { it: "Il conducente deve dare la precedenza", fa: "راننده باید حق تقدم بدهد", verb: "deve ← dovere" },
            { it: "al pedone con il bastone bianco o bianco-rosso", fa: "به عابری با عصای سفید یا سفید و قرمز" },
            { it: "che attraversa la strada,", fa: "که از خیابان رد می‌شود،", verb: "attraversa ← attraversare" },
            { it: "anche se è fuori dalle strisce di un attraversamento pedonale", fa: "حتی اگر بیرون از خط‌های عابر پیاده باشد", focus: "condition" },
          ],
          translation: "راننده باید به عابری با عصای سفید یا سفید و قرمز که از خیابان رد می‌شود حق تقدم بدهد، حتی اگر بیرون از خط‌های عابر پیاده باشد.",
          why: "درست است. قاعده برای هر دو عصا یکی است.",
        },
        {
          sourceId: "466",
          textIt: "Il conducente deve dare la precedenza a un pedone non vedente che attraversa la strada fuori dalle strisce pedonali, solo se munito di bastone bianco-rosso",
          answer: 0,
          chunks: [
            { it: "Il conducente deve dare la precedenza", fa: "راننده باید حق تقدم بدهد", verb: "deve ← dovere" },
            { it: "a un pedone non vedente", fa: "به عابر نابینایی" },
            { it: "che attraversa la strada fuori dalle strisce pedonali,", fa: "که بیرون از خط عابر از خیابان رد می‌شود،", verb: "attraversa ← attraversare" },
            { it: "solo se munito di bastone bianco-rosso", fa: "فقط اگر عصای سفید و قرمز داشته باشد", focus: "limit" },
          ],
          translation: "راننده باید به عابر نابینایی که بیرون از خط عابر از خیابان رد می‌شود حق تقدم بدهد، فقط اگر عصای سفید و قرمز داشته باشد.",
          why: "غلط است. عصای سفید هم همین حق را دارد.",
        },
      ],
      takeaway: "«solo se» در سؤال‌های عابر آسیب‌پذیر تقریباً همیشه تله است.",
    },
  ],
  practice: [
    {
      sourceId: "474",
      textIt: "In vicinanza di un attraversamento pedonale, il conducente deve considerare che i pedoni, in special modo i bambini, possono sbucare all'improvviso tra i veicoli parcheggiati",
      answer: 1,
      chunks: [
        { it: "In vicinanza di un attraversamento pedonale,", fa: "نزدیک خط عابر پیاده،" },
        { it: "il conducente deve considerare che", fa: "راننده باید در نظر بگیرد که", verb: "deve ← dovere" },
        { it: "i pedoni, in special modo i bambini,", fa: "عابران، به‌خصوص بچه‌ها،" },
        { it: "possono sbucare all'improvviso", fa: "ممکن است ناگهان بیرون بیایند", verb: "possono ← potere" },
        { it: "tra i veicoli parcheggiati", fa: "از بین خودروهای پارک‌شده" },
      ],
      translation: "نزدیک خط عابر پیاده، راننده باید در نظر بگیرد که عابران، به‌خصوص بچه‌ها، ممکن است ناگهان از بین خودروهای پارک‌شده بیرون بیایند.",
      why: "درست است. خودروی پارک‌شده یک بچه را کاملاً پنهان می‌کند.",
      rule: "CdS art. 191 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "481",
      textIt: "In vicinanza di un attraversamento pedonale, il conducente deve considerare che se il pedone si è fermato in mezzo alle strisce dell'attraversamento significa che ha rinunciato al suo diritto di passare",
      answer: 0,
      chunks: [
        { it: "In vicinanza di un attraversamento pedonale,", fa: "نزدیک خط عابر پیاده،" },
        { it: "il conducente deve considerare che", fa: "راننده باید در نظر بگیرد که", verb: "deve ← dovere" },
        { it: "se il pedone si è fermato in mezzo alle strisce dell'attraversamento", fa: "اگر عابر وسط خط عابر ایستاده است", focus: "condition", verb: "fermato ← fermarsi" },
        { it: "significa che ha rinunciato al suo diritto di passare", fa: "یعنی از حق عبورش گذشته است", verb: "rinunciato ← rinunciare" },
      ],
      translation: "نزدیک خط عابر پیاده، راننده باید در نظر بگیرد که اگر عابر وسط خط عابر ایستاده است، یعنی از حق عبورش گذشته است.",
      why: "غلط است. عابری که ایستاده ممکن است دوباره راه بیفتد؛ حقش را از دست نداده است.",
      rule: "CdS art. 191 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "462",
      textIt: "Il conducente deve fermarsi quando un pedone non vedente con il bastone bianco si accinge ad attraversare la strada, evitando di frenare bruscamente per non spaventarlo",
      answer: 1,
      chunks: [
        { it: "Il conducente deve fermarsi", fa: "راننده باید بایستد", verb: "deve ← dovere" },
        { it: "quando un pedone non vedente con il bastone bianco", fa: "وقتی عابر نابینایی با عصای سفید", focus: "condition" },
        { it: "si accinge ad attraversare la strada,", fa: "آماده‌ی عبور از خیابان است،", verb: "accinge ← accingersi" },
        { it: "evitando di frenare bruscamente", fa: "و از ترمز ناگهانی پرهیز کند", verb: "evitando ← evitare" },
        { it: "per non spaventarlo", fa: "تا او را نترساند", focus: "reason" },
      ],
      translation: "راننده باید بایستد وقتی عابر نابینایی با عصای سفید آماده‌ی عبور از خیابان است، و از ترمز ناگهانی پرهیز کند تا او را نترساند.",
      why: "درست است. نابینا صدای ترمز ناگهانی را می‌شنود و ممکن است بترسد؛ آرام بایست.",
      rule: "CdS art. 191 c.3",
      conceptStep: 2,
    },
    {
      sourceId: "468",
      textIt: "Se un pedone con bastone bianco attraversa la strada fuori dalle strisce pedonali, bisogna suonare il clacson per sollecitarlo ad attraversare rapidamente",
      answer: 0,
      chunks: [
        { it: "Se un pedone con bastone bianco", fa: "اگر عابری با عصای سفید", focus: "condition" },
        { it: "attraversa la strada fuori dalle strisce pedonali,", fa: "بیرون از خط عابر از خیابان رد شود،", verb: "attraversa ← attraversare" },
        { it: "bisogna suonare il clacson", fa: "باید بوق زد", verb: "bisogna ← bisognare" },
        { it: "per sollecitarlo ad attraversare rapidamente", fa: "تا او را به عبور سریع وادار کرد", focus: "reason" },
      ],
      translation: "اگر عابری با عصای سفید بیرون از خط عابر از خیابان رد شود، باید بوق زد تا او را به عبور سریع وادار کرد.",
      why: "غلط است. باید بایستی و حق تقدم بدهی؛ بوق او را می‌ترساند.",
      rule: "CdS art. 191 c.3",
      conceptStep: 2,
    },
    {
      sourceId: "526",
      textIt: "Quando una donna in stato di gravidanza attraversa la carreggiata bisogna tenere presente che ha il passo più rapido e quindi attraversa velocemente",
      answer: 0,
      chunks: [
        { it: "Quando una donna in stato di gravidanza attraversa la carreggiata", fa: "وقتی زن بارداری از سواره‌رو رد می‌شود", focus: "condition", verb: "attraversa ← attraversare" },
        { it: "bisogna tenere presente che", fa: "باید در نظر داشت که", verb: "bisogna ← bisognare" },
        { it: "ha il passo più rapido", fa: "قدم‌هایش سریع‌تر است" },
        { it: "e quindi attraversa velocemente", fa: "و برای همین سریع رد می‌شود", focus: "reason" },
      ],
      translation: "وقتی زن بارداری از سواره‌رو رد می‌شود، باید در نظر داشت که قدم‌هایش سریع‌تر است و برای همین سریع رد می‌شود.",
      why: "غلط است. برعکس: آهسته‌تر رد می‌شود و باید بی‌عجله صبر کنی.",
      rule: "CdS art. 191; art. 140",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: [...range(469, 482), "524", "528", "531"] },
    { step: 2, sourceIds: range(457, 468) },
    { step: 3, sourceIds: [...range(445, 456), "521", "522", "523", "525", "526", "527", "529", "530"] },
  ],
};

// ── Lesson 14 ─────────────────────────────────────────────────────────────────

export const lessonBambini: Lesson = {
  id: "bambini-semaforo-scuolabus",
  titleFa: "بچه‌ها: چراغ راهنمایی و اتوبوس مدرسه",
  titleIt: "BAMBINI AL SEMAFORO · SCUOLABUS",
  minutes: 4,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی بچه‌ها کنار چراغ راهنمایی و ایستگاه اتوبوس مدرسه چه کارهای غیرمنتظره‌ای ممکن است بکنند و تو چطور باید آماده باشی.",
      why: "۲۲ سؤال درباره‌ی بچه‌هاست. قاعده‌ی کلی ساده است: از بچه‌ها رفتار درست انتظار نداشته باش.",
    },
    {
      kind: "anatomy",
      title: "ایستگاه اتوبوس مدرسه و چراغ",
      scene: "school",
      body: "روی هر بخش بزن تا ببینی چه چیزی را باید پیش‌بینی کنی.",
      parts: [
        { id: "scuolabus", nameIt: "Scuolabus fermo", nameFa: "اتوبوس مدرسه‌ی متوقف", text: "وقتی اتوبوس مدرسه در ایستگاه است، به‌خصوص آهسته کن، حتی اگر متوقف است و کسی را نمی‌بینی." },
        { id: "nascosti", nameIt: "Bambini nascosti dall'autobus", nameFa: "بچه‌هایی که پشت اتوبوس پنهان‌اند", text: "بچه‌ها ممکن است از جلوی اتوبوس، جایی که تو نمی‌بینی، شروع به عبور کرده باشند یا بی‌توجه پیاده شوند." },
        { id: "corsa", nameIt: "Bambini che corrono", nameFa: "بچه‌ای که می‌دود", text: "بچه ممکن است برای رسیدن به اتوبوس بدود و بی‌هوا از خیابان رد شود. آماده‌ی ترمز باش." },
        { id: "semaforo", nameIt: "Bambini al semaforo", nameFa: "بچه‌ها کنار چراغ", text: "ممکن است با زرد شدن چراغ خودروها راه بیفتند، با قرمز رد شوند چون فکر می‌کنند طول کشیده، یا همدیگر را هل بدهند و روی سواره‌رو بیفتند." },
      ],
      takeaway: "کنار بچه‌ها آهسته کن و آماده‌ی ترمز باش، حتی وقتی کسی در حال عبور نیست.",
      rule: "CdS art. 140; art. 191",
    },
    {
      kind: "factors",
      title: "بچه‌ها کنار چراغ راهنمایی",
      body: "بچه‌ها همیشه از چراغ پیروی نمی‌کنند و خطر را مثل بزرگ‌ترها نمی‌سنجند. سبز شدن چراغ تو هم یعنی اول صبر کنی تا عابران عبورشان را تمام کنند.",
      columns: [
        {
          title: "درست است (VERO)",
          items: [
            { fa: "ممکن است با زرد شدن چراغ خودروها رد شوند", it: "appena la luce del semaforo veicolare passa dal verde al giallo", sourceId: "483", textIt: "Quando vi sono bambini fermi al semaforo bisogna usare prudenza, in quanto potrebbero attraversare improvvisamente la strada appena la luce del semaforo veicolare passa dal verde al giallo", answer: 1 },
            { fa: "ممکن است همدیگر را هل بدهند", it: "si spingano a vicenda", sourceId: "485", textIt: "Quando vi sono bambini fermi al semaforo bisogna usare prudenza, perché può accadere che si spingano a vicenda, finendo sulla carreggiata", answer: 1 },
            { fa: "ممکن است با قرمزِ خودشان پایین بیایند", it: "quando ancora per loro il semaforo è disposto al rosso", sourceId: "486", textIt: "Quando vi sono bambini fermi al semaforo bisogna usare prudenza, perché potrebbero scendere dal marciapiede, invadendo la carreggiata, quando ancora per loro il semaforo è disposto al rosso", answer: 1 },
            { fa: "با سبز شدن، صبر کن عابران عبور را تمام کنند", it: "attendere che i pedoni abbiano finito di attraversare", sourceId: "487", textIt: "Prima di impegnare un incrocio, dopo che è scattata la luce verde del semaforo, il conducente deve attendere che i pedoni abbiano finito di attraversare la strada", answer: 1 },
          ],
        },
        {
          title: "غلط است (FALSO)",
          items: [
            { fa: "فقط همراه یک بزرگ‌تر رد می‌شوند", it: "solo se accompagnati da un adulto", sourceId: "488", textIt: "Quando vi sono bambini fermi al semaforo, bisogna tenere presente che possono attraversare la strada solo se accompagnati da un adulto", answer: 0 },
            { fa: "فقط با اشاره‌ی راننده رد می‌شوند", it: "un gesto di consenso da parte degli automobilisti", sourceId: "489", textIt: "I bambini, al semaforo, possono attraversare la strada solo dopo aver ricevuto un gesto di consenso da parte degli automobilisti", answer: 0 },
            { fa: "با زرد چشمک‌زن مطمئناً رد نمی‌شوند", it: "si può essere certi che non attraverseranno", sourceId: "491", textIt: "Quando vi sono bambini fermi al semaforo, si può essere certi che non attraverseranno la strada se il semaforo è a luce gialla lampeggiante", answer: 0 },
          ],
        },
      ],
      takeaway: "درباره‌ی بچه‌ها «مطمئن بودن» (si può essere certi) همیشه FALSO است.",
      rule: "CdS art. 140; art. 191",
    },
    {
      kind: "factors",
      title: "ایستگاه اتوبوس مدرسه",
      body: "در ایتالیا قانون نمی‌گوید پشت اتوبوس مدرسه با در باز بایستی؛ می‌گوید به‌خصوص آهسته کنی و آماده‌ی ترمز باشی.",
      columns: [
        {
          title: "درست است (VERO)",
          items: [
            { fa: "بچه‌ها ممکن است پشت اتوبوس پنهان باشند", it: "nascosti dall'autobus", sourceId: "492", textIt: "Alla guida di un veicolo, in vicinanza di una piazzola di fermata di autobus che trasporta scolari, occorre fare attenzione ai bambini che potrebbero aver iniziato ad attraversare la carreggiata nascosti dall'autobus", answer: 1 },
            { fa: "آماده‌ی ترمز باش", it: "occorre prepararsi a frenare", sourceId: "494", textIt: "Alla guida di un veicolo, in vicinanza di una piazzola di fermata di autobus per scolari, occorre prepararsi a frenare, nel caso in cui dei bambini attraversino improvvisamente la strada", answer: 1 },
            { fa: "ممکن است بی‌توجه پیاده شوند", it: "scendano dall'autobus senza fare attenzione", sourceId: "496", textIt: "In vicinanza di una piazzola di fermata di autobus per scolari, può accadere che i bambini scendano dall'autobus senza fare attenzione ai veicoli che sopraggiungono", answer: 1 },
            { fa: "اگر اتوبوس مدرسه هست، به‌خصوص آهسته کن", it: "bisogna rallentare particolarmente se vi è lo scuolabus", sourceId: "497", textIt: "Alla guida di un veicolo, in vicinanza di una piazzola di fermata di autobus per scolari, bisogna rallentare particolarmente se vi è lo scuolabus", answer: 1 },
          ],
        },
        {
          title: "غلط است (FALSO)",
          items: [
            { fa: "آهسته نکن تا ترافیک را کند نکنی", it: "non si deve rallentare", sourceId: "498", textIt: "Alla guida di un veicolo, in vicinanza di una piazzola di fermata di autobus per scolari, non si deve rallentare, per evitare di ostacolare la circolazione degli altri veicoli", answer: 0 },
            { fa: "بوق بزن تا بچه‌ها راه بدهند", it: "occorre suonare", sourceId: "500", textIt: "Alla guida di un veicolo, in vicinanza di una piazzola di fermata di autobus per scolari, occorre suonare per invitare i bambini che attraversano sulle strisce a dare la precedenza", answer: 0 },
            { fa: "فقط اگر بچه‌ای در حال عبور است آهسته کن", it: "si deve rallentare solo se vi sono bambini che attraversano", sourceId: "501", textIt: "Alla guida di un veicolo, in vicinanza di una piazzola di fermata di autobus per scolari, si deve rallentare solo se vi sono bambini che attraversano", answer: 0 },
          ],
        },
      ],
      takeaway: "کنار اتوبوس مدرسه آهسته کن، چه بچه‌ای ببینی چه نه.",
      rule: "CdS art. 140; art. 141",
    },
    {
      kind: "terms",
      title: "کلمه‌های این درس",
      terms: [
        { it: "il semaforo", fa: "چراغ راهنمایی" },
        { it: "lo scuolabus", fa: "اتوبوس مدرسه" },
        { it: "la piazzola di fermata", fa: "ایستگاه کنار جاده" },
        { it: "gli scolari", fa: "دانش‌آموزان" },
        { it: "nascosti", fa: "پنهان", base: "nascondere" },
        { it: "prepararsi a frenare", fa: "آماده‌ی ترمز شدن", base: "prepararsi" },
        { it: "rallentare", fa: "آهسته کردن" },
        { it: "imprevedibili", fa: "غیرقابل پیش‌بینی" },
      ],
    },
    {
      kind: "trap",
      title: "تله: قاعده‌ای که منطقی به نظر می‌رسد",
      body: "جمله‌ی دوم محتاطانه به نظر می‌رسد و در بعضی کشورها قانون است، ولی در قانون ایتالیا نیست. بانک فقط قانون ایتالیا را می‌سنجد.",
      examples: [
        {
          sourceId: "495",
          textIt: "Alla guida di un veicolo, in vicinanza di una piazzola di fermata di autobus per scolari, occorre essere prudenti e tenere conto dei comportamenti imprevedibili dei bambini",
          answer: 1,
          chunks: [
            { it: "Alla guida di un veicolo,", fa: "هنگام رانندگی،" },
            { it: "in vicinanza di una piazzola di fermata di autobus per scolari,", fa: "نزدیک ایستگاه اتوبوس مدرسه،" },
            { it: "occorre essere prudenti", fa: "باید محتاط بود", verb: "occorre ← occorrere" },
            { it: "e tenere conto dei comportamenti imprevedibili dei bambini", fa: "و رفتارهای غیرقابل پیش‌بینی بچه‌ها را در نظر گرفت" },
          ],
          translation: "هنگام رانندگی، نزدیک ایستگاه اتوبوس مدرسه باید محتاط بود و رفتارهای غیرقابل پیش‌بینی بچه‌ها را در نظر گرفت.",
          why: "درست است. این همان اصل کلی این درس است.",
        },
        {
          sourceId: "503",
          textIt: "Alla guida di un veicolo, in vicinanza di una piazzola di fermata di autobus per scolari, non si può proseguire nella marcia se le portiere dello scuolabus sono ancora aperte",
          answer: 0,
          chunks: [
            { it: "Alla guida di un veicolo,", fa: "هنگام رانندگی،" },
            { it: "in vicinanza di una piazzola di fermata di autobus per scolari,", fa: "نزدیک ایستگاه اتوبوس مدرسه،" },
            { it: "non si può proseguire nella marcia", fa: "نمی‌شود به حرکت ادامه داد", focus: "negation", verb: "può ← potere" },
            { it: "se le portiere dello scuolabus sono ancora aperte", fa: "اگر درهای اتوبوس مدرسه هنوز باز است", focus: "condition" },
          ],
          translation: "هنگام رانندگی، نزدیک ایستگاه اتوبوس مدرسه، اگر درهای اتوبوس مدرسه هنوز باز است نمی‌شود به حرکت ادامه داد.",
          why: "غلط است. قانون ایتالیا چنین منع مطلقی ندارد؛ باید به‌خصوص آهسته کنی و آماده‌ی ترمز باشی.",
        },
      ],
      takeaway: "جمله را با قانون ایتالیا بسنج، نه با چیزی که در فیلم‌ها یا کشورهای دیگر دیده‌ای.",
    },
  ],
  practice: [
    {
      sourceId: "484",
      textIt: "Quando vi sono bambini fermi al semaforo bisogna usare prudenza, in quanto potrebbero attraversare velocemente la strada anche con il rosso, ritenendo che duri troppo",
      answer: 1,
      chunks: [
        { it: "Quando vi sono bambini fermi al semaforo", fa: "وقتی بچه‌هایی کنار چراغ ایستاده‌اند", focus: "condition" },
        { it: "bisogna usare prudenza,", fa: "باید احتیاط کرد،", verb: "bisogna ← bisognare" },
        { it: "in quanto", fa: "چون", focus: "reason" },
        { it: "potrebbero attraversare velocemente la strada anche con il rosso,", fa: "ممکن است حتی با قرمز سریع از خیابان رد شوند،", verb: "potrebbero ← potere" },
        { it: "ritenendo che duri troppo", fa: "چون فکر می‌کنند خیلی طول می‌کشد", verb: "ritenendo ← ritenere" },
      ],
      translation: "وقتی بچه‌هایی کنار چراغ ایستاده‌اند باید احتیاط کرد، چون ممکن است حتی با قرمز سریع از خیابان رد شوند، چون فکر می‌کنند خیلی طول می‌کشد.",
      why: "درست است. بچه‌ها حوصله‌ی صبر کردن ندارند و ممکن است قاعده را نادیده بگیرند.",
      rule: "CdS art. 140",
      conceptStep: 2,
    },
    {
      sourceId: "490",
      textIt: "Quando vi sono bambini fermi al semaforo, si può essere certi che attraversino la strada solo quando il semaforo pedonale abbia la luce verde accesa",
      answer: 0,
      chunks: [
        { it: "Quando vi sono bambini fermi al semaforo,", fa: "وقتی بچه‌هایی کنار چراغ ایستاده‌اند،", focus: "condition" },
        { it: "si può essere certi che", fa: "می‌شود مطمئن بود که", focus: "always", verb: "può ← potere" },
        { it: "attraversino la strada", fa: "از خیابان رد می‌شوند", verb: "attraversino ← attraversare" },
        { it: "solo quando il semaforo pedonale abbia la luce verde accesa", fa: "فقط وقتی چراغ عابر سبز است", focus: "limit" },
      ],
      translation: "وقتی بچه‌هایی کنار چراغ ایستاده‌اند، می‌شود مطمئن بود که فقط وقتی چراغ عابر سبز است از خیابان رد می‌شوند.",
      why: "غلط است. درباره‌ی بچه‌ها هیچ‌وقت نمی‌شود «مطمئن» بود.",
      rule: "CdS art. 140",
      conceptStep: 2,
    },
    {
      sourceId: "493",
      textIt: "Alla guida di un veicolo, in vicinanza di una piazzola per la fermata di autobus per scolari, occorre fare attenzione ai bambini, che potrebbero attraversare di corsa la strada per salire sullo scuolabus",
      answer: 1,
      chunks: [
        { it: "Alla guida di un veicolo,", fa: "هنگام رانندگی،" },
        { it: "in vicinanza di una piazzola per la fermata di autobus per scolari,", fa: "نزدیک ایستگاه اتوبوس مدرسه،" },
        { it: "occorre fare attenzione ai bambini,", fa: "باید مراقب بچه‌ها بود،", verb: "occorre ← occorrere" },
        { it: "che potrebbero attraversare di corsa la strada", fa: "که ممکن است دوان‌دوان از خیابان رد شوند", verb: "potrebbero ← potere" },
        { it: "per salire sullo scuolabus", fa: "تا سوار اتوبوس مدرسه شوند", focus: "reason" },
      ],
      translation: "هنگام رانندگی، نزدیک ایستگاه اتوبوس مدرسه باید مراقب بچه‌ها بود که ممکن است دوان‌دوان از خیابان رد شوند تا سوار اتوبوس مدرسه شوند.",
      why: "درست است. بچه‌ای که نگران جا ماندن از اتوبوس است به خودروها نگاه نمی‌کند.",
      rule: "CdS art. 140",
      conceptStep: 3,
    },
    {
      sourceId: "499",
      textIt: "Alla guida di un veicolo, in vicinanza di una piazzola di fermata di autobus per scolari, occorre passare per primi, avendo sempre la precedenza sui bambini che attraversano la strada",
      answer: 0,
      chunks: [
        { it: "Alla guida di un veicolo,", fa: "هنگام رانندگی،" },
        { it: "in vicinanza di una piazzola di fermata di autobus per scolari,", fa: "نزدیک ایستگاه اتوبوس مدرسه،" },
        { it: "occorre passare per primi,", fa: "باید اول رد شد،", verb: "occorre ← occorrere" },
        { it: "avendo sempre la precedenza", fa: "چون همیشه حق تقدم با توست", focus: "always", verb: "avendo ← avere" },
        { it: "sui bambini che attraversano la strada", fa: "نسبت به بچه‌هایی که از خیابان رد می‌شوند" },
      ],
      translation: "هنگام رانندگی، نزدیک ایستگاه اتوبوس مدرسه باید اول رد شد، چون همیشه نسبت به بچه‌هایی که از خیابان رد می‌شوند حق تقدم با توست.",
      why: "غلط است. هیچ‌وقت «همیشه حق تقدم» نسبت به بچه‌ها نداری؛ باید آهسته کنی و آماده‌ی ایستادن باشی.",
      rule: "CdS art. 140; art. 191",
      conceptStep: 3,
    },
    {
      sourceId: "502",
      textIt: "Alla guida di un veicolo, in vicinanza di una piazzola di fermata di autobus per scolari, occorre fare attenzione allo scuolabus, che dopo la fermata farà sicuramente retromarcia",
      answer: 0,
      chunks: [
        { it: "Alla guida di un veicolo,", fa: "هنگام رانندگی،" },
        { it: "in vicinanza di una piazzola di fermata di autobus per scolari,", fa: "نزدیک ایستگاه اتوبوس مدرسه،" },
        { it: "occorre fare attenzione allo scuolabus,", fa: "باید مراقب اتوبوس مدرسه بود،", verb: "occorre ← occorrere" },
        { it: "che dopo la fermata farà sicuramente retromarcia", fa: "که بعد از توقف حتماً دنده‌عقب می‌رود", focus: "always", verb: "farà ← fare" },
      ],
      translation: "هنگام رانندگی، نزدیک ایستگاه اتوبوس مدرسه باید مراقب اتوبوس مدرسه بود که بعد از توقف حتماً دنده‌عقب می‌رود.",
      why: "غلط است. خطر اصلی بچه‌ها هستند، نه دنده‌عقب اتوبوس؛ «حتماً» هم این را ساختگی نشان می‌دهد.",
      rule: "CdS art. 140",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 2, sourceIds: range(483, 491) },
    { step: 3, sourceIds: range(492, 504) },
  ],
};
