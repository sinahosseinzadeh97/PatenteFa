/**
 * src/content/ch21-galleria.ts
 * Chapter 21 (Incidenti stradali e comportamenti), lesson 8: long tunnels.
 * Queues (wider gaps so a fire cannot jump from car to car), fire (leave the
 * vehicle, never turn round or reverse, go to an emergency exit, and follow the
 * voice instructions of tunnel staff or firefighters over the signs), and the
 * two bank panels: 334 escape route, 335 extinguisher. Original top-down
 * drawing "galleria"; one original "what should you do next?" exercise.
 *
 * Behaviour in a tunnel fire is guidance, not a CdS article: TCS (Swiss
 * touring club) and ANAS agree on it; checked by tests/chapter21.test.ts.
 */
import type { Lesson } from "./lessons.js";

const TCS = "TCS, «Guidare in galleria» (letto il 15/11/2026)";
const ANAS = "ANAS, «Guidare sicuri in galleria»";
const DLGS_264 = "D.Lgs. 264/2006 (sicurezza delle gallerie), all. 4-bis (segnaletica, DM 12/07/2021)";
const TUNNEL = "Percorrendo un lungo tunnel o traforo,";
const TUNNEL_FA = "در تونل یا تونلِ کوهستانیِ طولانی،";
const INCENDIO = "in caso d'incendio,";
const INCENDIO_FA = "اگر آتش‌سوزی شود،";

export const lessonGalleria: Lesson = {
  id: "galleria-incendio",
  titleFa: "تونلِ طولانی: صف، آتش، راهِ فرار",
  titleIt: "GALLERIE · INCENDIO · VIE DI FUGA",
  minutes: 4,
  signs: [334, 335],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی در صفِ داخلِ تونل چرا فاصله‌ی بیشتر لازم است، اگر در تونل آتش‌سوزی شود چه کنی (خودرو را رها کن، دور نزن، به خروجیِ اضطراری برو) و دستورِ چه کسی بر تابلو مقدم است. و دو تابلوی تونل را می‌شناسی: راهِ فرار و کپسولِ آتش‌نشانی.",
      why:
        "۷ سؤال. دامِ اصلی ترتیبِ اعتماد است: تابلو یا دستورِ صوتی؟ بانک می‌گوید دستورِ کارکنان و آتش‌نشان‌ها، چون آن‌ها می‌دانند آتش و دود کجاست.",
      rule: `${TCS}; ${ANAS}`,
    },
    {
      kind: "anatomy",
      title: "داخلِ تونل",
      scene: "galleria",
      body: "تصویر از بالاست و به مقیاس نیست. ترافیک به راست می‌رود؛ خودروی آبی تویی. روی هر بخش بزن:",
      parts: [
        {
          id: "coda",
          nameIt: "Coda · distanza",
          nameFa: "صف و فاصله",
          text: "در تونلِ طولانی، وقتی صف درست می‌شود، فاصله را با جلویی بیشتر از معمول نگه دار: اگر آتش بگیرد، آتش از خودرویی به خودروی دیگر کمتر می‌رسد و جا برای بیرون رفتن می‌ماند. TCS می‌گوید حتی ایستاده دست‌کم ۵ متر.",
        },
        {
          id: "fumo",
          nameIt: "Fumo · incendio",
          nameFa: "دود و آتش",
          text: "اگر خودروی خودت آتش گرفت و می‌توانی، با آن از تونل بیرون برو. اگر نه، یا اگر جلوتر آتش است: چراغِ خطر، بایست، موتور را خاموش کن و سوییچ را روی خودرو بگذار تا امدادگران بتوانند جابه‌جایش کنند. هرگز دور نزن و دنده‌عقب نرو. خاموش کردنِ آتش فقط وقتی تازه شروع شده.",
        },
        {
          id: "uscita",
          nameIt: "Via di fuga",
          nameFa: "راهِ فرار",
          text: "خروجی‌های اضطراری به جای امن می‌رسند، معمولاً پشتِ درِ ضدِ آتش. خودرو را رها کن و سریع، با دنبال کردنِ تابلوها، به نزدیک‌ترین خروجی برو. جانت از خودرو و وسایلت مهم‌تر است.",
        },
        {
          id: "nicchia",
          nameIt: "Nicchia SOS · estintore",
          nameFa: "جای اضطراری و کپسول",
          text: "در فاصله‌های منظم جای اضطراری با تلفنِ SOS و کپسولِ آتش‌نشانی هست. برای خبر کردن بهتر است از تلفنِ SOS استفاده کنی؛ مرکزِ تونل جایت را دقیق می‌داند.",
        },
        {
          id: "istruzioni",
          nameIt: "Istruzioni vocali",
          nameFa: "دستورِ صوتی",
          text: "اگر کارکنانِ تونل یا آتش‌نشان‌ها با بلندگو یا حضوری دستور می‌دهند، از آن‌ها پیروی کن، حتی اگر با تابلوها فرق دارد: آن‌ها می‌دانند آتش و دود کجاست.",
        },
      ],
      takeaway: "تونل و آتش: موتور خاموش، سوییچ روی خودرو، دور نزن، به خروجیِ اضطراری برو. دستورِ کارکنان و آتش‌نشان‌ها بر تابلو مقدم است.",
      rule: `${TCS}; ${ANAS}`,
    },
    {
      kind: "table",
      title: "دو تابلوی تونل",
      body: "تابلوهای ایمنیِ تونل شبیهِ تابلوهای ساختمان‌اند: سبز برای راهِ فرار، قرمز و سفید برای وسیله‌ی آتش‌نشانی. هیچ‌کدام دستورِ برگشتن به ورودیِ تونل نیست.",
      columns: ["یعنی"],
      rows: [
        { label: "راهِ فرار", it: "via di fuga · uscita di emergenza", sign: 334, values: ["مربعِ سبز با آدمِ دونده و در: خروجیِ اضطراری یا راهِ فرار این‌جاست."] },
        { label: "کپسولِ آتش‌نشانی", it: "estintore", sign: 335, values: ["کپسولِ سیاه با شعله‌ی قرمز روی زمینه‌ی سفید: کپسولِ آتش‌نشانی این‌جاست، معمولاً در جای اضطراری."] },
      ],
      takeaway: "سبز با آدمِ دونده = راهِ فرار. کپسول با شعله = کپسولِ آتش‌نشانی.",
      rule: DLGS_264,
    },
    {
      kind: "classify",
      title: "موقعیت: دود در تونل",
      body:
        "تمرینِ آموزشی است، نه سؤالِ بانک؛ موقعیتی ساده‌شده، نه دستورِ اضطراری برای موقعیتِ واقعیِ تو. در تونلی طولانی در صف ایستاده‌ای. جلوتر دود دیده می‌شود. از بلندگو اعلام می‌شود: «خودروها را رها کنید و به خروجیِ اضطراریِ سمتِ راست، صد متر عقب‌تر، بروید.» فلشِ یک تابلوی راهِ فرار به سمتِ جلو، به طرفِ دود، است. برای هر کار بگو:",
      options: [
        { it: "fallo", fa: "انجامش بده" },
        { it: "non è richiesto", fa: "لازم نیست" },
        { it: "non farlo", fa: "نکن" },
      ],
      items: [
        { prompt: "موتور را خاموش می‌کنی و سوییچ را روی خودرو می‌گذاری", answer: 0, explain: "امدادگران باید بتوانند خودرو را جابه‌جا کنند." },
        { prompt: "دور می‌زنی تا با خودرو از ورودی بیرون بروی", answer: 2, explain: "در تونل هرگز دور نزن و دنده‌عقب نرو." },
        { prompt: "به خروجیِ صد متر عقب‌تر می‌روی، همان که بلندگو گفت", answer: 0, explain: "دستورِ صوتیِ کارکنان بر تابلو مقدم است؛ آن‌ها جای آتش را می‌دانند." },
        { prompt: "دنبالِ فلشِ تابلو به طرفِ دود می‌روی، چون تابلو رسمی است", answer: 2, explain: "بانک دقیقاً همین را غلط می‌داند: تابلو حتی وقتی با دستورِ آتش‌نشان‌ها در تضاد است مقدم نیست." },
        { prompt: "با تلفنِ SOS آتشی را خبر می‌دهی که کارکنان همین حالا از بلندگو اعلام می‌کنند", answer: 1, explain: "مرکزِ تونل خبر دارد؛ وقتت را صرفِ رفتن به خروجی کن." },
        { prompt: "برمی‌گردی تا چمدانت را از صندوق برداری", answer: 2, explain: "دود و آتش ممکن است کشنده باشند؛ جانت از وسایلت مهم‌تر است." },
      ],
      takeaway: "در آتش‌سوزیِ تونل، پیاده و سریع به خروجی‌ای برو که کارکنان می‌گویند. خودرو و وسایل می‌مانند.",
      rule: `${TCS}; ${ANAS}`,
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "la galleria · il tunnel", fa: "تونل" },
        { it: "il traforo", fa: "تونلِ کوهستانی" },
        { it: "la via di fuga", fa: "راهِ فرار" },
        { it: "l'uscita di emergenza", fa: "خروجیِ اضطراری" },
        { it: "la porta tagliafuoco", fa: "درِ ضدِ آتش" },
        { it: "l'estintore", fa: "کپسولِ آتش‌نشانی" },
        { it: "i vigili del fuoco", fa: "آتش‌نشان‌ها" },
        { it: "il personale di servizio", fa: "کارکنانِ تونل" },
        { it: "le istruzioni vocali", fa: "دستورهای صوتی" },
        { it: "il propagarsi delle fiamme", fa: "پخش شدنِ آتش" },
      ],
    },
    {
      kind: "trap",
      title: "«segnaletica»: تابلو، ولی نه بالاتر از آتش‌نشان",
      body: "هر دو جمله می‌گویند تابلو را دنبال کن. یکی کامل است؛ دیگری تابلو را بالاتر از دستورِ آتش‌نشان‌ها می‌گذارد:",
      examples: [
        {
          sourceId: "6456",
          textIt: "Percorrendo un lungo tunnel o traforo, in caso d'incendio, bisogna abbandonare velocemente il veicolo, seguendo la segnaletica che porta alle vie di fuga o ai luoghi sicuri protetti da porte tagliafuoco",
          answer: 1,
          chunks: [
            { it: TUNNEL, fa: TUNNEL_FA },
            { it: INCENDIO, fa: INCENDIO_FA },
            { it: "bisogna abbandonare velocemente il veicolo,", fa: "باید خودرو را سریع رها کرد،", verb: "bisogna ← bisognare" },
            { it: "seguendo la segnaletica che porta alle vie di fuga", fa: "با دنبال کردنِ تابلوهایی که به راه‌های فرار می‌رسند", verb: "seguendo ← seguire" },
            { it: "o ai luoghi sicuri protetti da porte tagliafuoco", fa: "یا به جاهای امنی که درِ ضدِ آتش دارند" },
          ],
          translation: "در تونل یا تونلِ کوهستانیِ طولانی، اگر آتش‌سوزی شود، باید خودرو را سریع رها کرد و تابلوهایی را دنبال کرد که به راه‌های فرار یا جاهای امنِ پشتِ درِ ضدِ آتش می‌رسند.",
          why: "درست است. وقتی دستورِ دیگری نیست، تابلوها تو را به خروجی می‌رسانند.",
        },
        {
          sourceId: "6461",
          textIt: "Percorrendo un lungo tunnel o traforo, in caso d'incendio, bisogna seguire la segnaletica di emergenza, anche se in netto contrasto con gli ordini vocali impartiti dai vigili del fuoco",
          answer: 0,
          chunks: [
            { it: TUNNEL, fa: TUNNEL_FA },
            { it: INCENDIO, fa: INCENDIO_FA },
            { it: "bisogna seguire la segnaletica di emergenza,", fa: "باید تابلوهای اضطراری را دنبال کرد،", verb: "bisogna ← bisognare" },
            { it: "anche se in netto contrasto con gli ordini vocali impartiti dai vigili del fuoco", fa: "حتی اگر کاملاً با دستورهای صوتیِ آتش‌نشان‌ها در تضاد باشد", focus: "contrast" },
          ],
          translation: "در تونل یا تونلِ کوهستانیِ طولانی، اگر آتش‌سوزی شود، باید تابلوهای اضطراری را دنبال کرد، حتی اگر کاملاً با دستورهای صوتیِ آتش‌نشان‌ها در تضاد باشد.",
          why: "غلط است. دستورِ آتش‌نشان‌ها و کارکنان مقدم است؛ آن‌ها می‌دانند کدام راه امن است.",
        },
      ],
      takeaway: "تابلو برای وقتی است که کسی راهنمایی نمی‌کند. «anche se in contrasto con … vigili del fuoco» یعنی غلط.",
      rule: `${TCS}; ${ANAS}`,
    },
  ],
  practice: [
    {
      sourceId: "6457",
      textIt: "Percorrendo un lungo tunnel o traforo, in caso d'incendio, bisogna attenersi alle istruzioni vocali del personale di servizio o dei vigili del fuoco, per evitare di incamminarsi nella direzione sbagliata",
      answer: 1,
      chunks: [
        { it: TUNNEL, fa: TUNNEL_FA },
        { it: INCENDIO, fa: INCENDIO_FA },
        { it: "bisogna attenersi alle istruzioni vocali del personale di servizio o dei vigili del fuoco,", fa: "باید از دستورهای صوتیِ کارکنانِ تونل یا آتش‌نشان‌ها پیروی کرد،", verb: "attenersi ← attenersi" },
        { it: "per evitare di incamminarsi nella direzione sbagliata", fa: "تا به سمتِ اشتباه راه نیفتی", focus: "reason" },
      ],
      translation: "در تونل یا تونلِ کوهستانیِ طولانی، اگر آتش‌سوزی شود، باید از دستورهای صوتیِ کارکنانِ تونل یا آتش‌نشان‌ها پیروی کرد تا به سمتِ اشتباه راه نیفتی.",
      why: "درست است (قدم ۱). آن‌ها می‌دانند آتش و دود کجاست و کدام خروجی امن است.",
      rule: `${TCS}; ${ANAS}`,
      conceptStep: 1,
    },
    {
      sourceId: "6458",
      textIt: "Il pannello in figura, posto all'interno di una galleria, indica la presenza di una via di fuga",
      answer: 1,
      sign: 334,
      chunks: [
        { it: "Il pannello in figura,", fa: "پنلِ تصویر،" },
        { it: "posto all'interno di una galleria,", fa: "که داخلِ تونل نصب شده،" },
        { it: "indica la presenza di una via di fuga", fa: "نشان می‌دهد راهِ فرار این‌جاست", verb: "indica ← indicare" },
      ],
      translation: "پنلِ تصویر، که داخلِ تونل نصب شده، نشان می‌دهد راهِ فرار این‌جاست.",
      why: "درست است (قدم ۲). مربعِ سبز با آدمِ دونده و در = راهِ فرار.",
      rule: DLGS_264,
      conceptStep: 2,
    },
    {
      sourceId: "6460",
      textIt: "Il pannello in figura obbliga a tornare indietro all'imbocco della galleria",
      answer: 0,
      sign: 334,
      chunks: [
        { it: "Il pannello in figura", fa: "پنلِ تصویر" },
        { it: "obbliga a tornare indietro", fa: "مجبور می‌کند برگردی", verb: "obbliga ← obbligare", focus: "contrast" },
        { it: "all'imbocco della galleria", fa: "به ورودیِ تونل" },
      ],
      translation: "پنلِ تصویر مجبور می‌کند به ورودیِ تونل برگردی.",
      why: "غلط است (قدم ۲). این پنل راهِ فرار را نشان می‌دهد؛ دستورِ برگشتن نیست. در تونل هرگز دور نمی‌زنی.",
      rule: `${DLGS_264}; ${TCS}`,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6455", "6456", "6457", "6461"] },
    { step: 2, sourceIds: ["6458", "6459", "6460"] },
  ],
};
