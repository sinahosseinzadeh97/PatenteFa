/**
 * src/content/ch22-sostanze.ts
 * Chapter 22 (Alcool, droga e primo soccorso), lesson 3: what can make a driver
 * unfit (bank group 578: sedatives, antidepressants, hallucinogens, alcohol vs
 * coffee, fizzy drinks, supplements) and drugs (group 579), with CdS art. 187 as
 * amended by L. 177/2024 and read by Corte costituzionale n. 10/2026.
 *
 * Medicines: the lesson says where to look (the leaflet), who to ask (doctor,
 * pharmacist) and never to stop or change a prescribed medicine on one's own.
 * It gives no advice about any specific medicine or dose.
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter22.test.ts.
 */
import type { Lesson } from "./lessons.js";

const CDS_187 = "Codice della Strada, art. 187 c.1 (testo vigente dopo L. 177/2024); Corte costituzionale, sentenza n. 10/2026";
const AIFA = "AIFA, Banca dati farmaci: foglio illustrativo, paragrafo «Guida di veicoli e utilizzo di macchinari»";
const IDONEITA = "L'idoneità alla guida può essere compromessa se si fa uso di";
const IDONEITA_FA = "آمادگی برای رانندگی ممکن است آسیب ببیند اگر کسی مصرف کند";
const SELF_CHECK =
  "تمرینِ آموزشی است، نه سؤالِ بانک. مثال‌ها ساختگی‌اند و جواب‌ها ثابت؛ چیزی ذخیره نمی‌شود.";

export const lessonDrogheFarmaci: Lesson = {
  id: "droghe-farmaci",
  titleFa: "مواد مخدر و دارو",
  titleIt: "DROGHE, FARMACI E IDONEITÀ ALLA GUIDA",
  minutes: 5,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی کدام مواد آمادگی برای رانندگی را خراب می‌کنند (بعضی داروها، همه‌ی مواد مخدر، الکل) و کدام‌ها در بانک «بی‌خطر» حساب می‌شوند (قهوه، نوشابه، مکمل). و می‌دانی ماده‌ی ۱۸۷ امروز درباره‌ی رانندگی بعد از مصرفِ مواد مخدر چه می‌گوید.",
      why:
        "۱۳ سؤال. نیمی فهرستی از چیزهاست که «آمادگی را خراب می‌کنند یا نه»؛ نیمی درباره‌ی مواد مخدر. تله‌ی اصلی «non compromette» است: هیچ ماده‌ی مخدری در بانک بی‌خطر نیست.",
      rule: CDS_187,
    },
    {
      kind: "factors",
      title: "کدام آمادگی را خراب می‌کند؟",
      body:
        "در بانک، هر چیزی که روی مغز اثر دارد (آرام‌بخش، ضدافسردگی، توهم‌زا، الکل) آمادگی را «ممکن است» خراب کند؛ نوشیدنی‌ها و مکمل‌های معمولی نه. «ممکن است» مهم است: هر داروی آرام‌بخش یا ضدافسردگی همه را ناتوان نمی‌کند، ولی ممکن است بکند، پس باید بدانی.",
      columns: [
        {
          title: "ممکن است خراب کند (VERO)",
          items: [
            { fa: "داروی ضدافسردگی", it: "farmaci antidepressivi", sourceId: "6469", textIt: "L'idoneità alla guida può essere compromessa se si fa uso di farmaci antidepressivi", answer: 1 },
            { fa: "مواد توهم‌زا", it: "allucinogeni (LSD, ecstasy, ecc.)", sourceId: "6470", textIt: "L'idoneità alla guida può essere compromessa se si fa uso di allucinogeni (LSD, ecstasy, ecc.)", answer: 1 },
            { fa: "نوشیدنیِ الکلی", it: "bevande alcoliche", sourceId: "6471", textIt: "L'idoneità alla guida può essere compromessa se si fa uso di bevande alcoliche", answer: 1 },
          ],
        },
        {
          title: "در بانک، خراب نمی‌کند (FALSO)",
          items: [
            { fa: "قهوه‌ی تلخ", it: "caffè amaro", sourceId: "6472", textIt: "L'idoneità alla guida può essere compromessa se si fa uso di caffè amaro", answer: 0 },
            { fa: "نوشابه‌ی گازدار", it: "bevande gassate", sourceId: "6473", textIt: "L'idoneità alla guida può essere compromessa se si fa uso di bevande gassate", answer: 0 },
          ],
        },
      ],
      takeaway: "آرام‌بخش، ضدافسردگی، توهم‌زا، الکل: VERO. قهوه، نوشابه، مکملِ غذایی یا املاح: FALSO.",
      rule: AIFA,
    },
    {
      kind: "table",
      title: "مواد مخدر، دارو و قانون",
      body:
        "مواد مخدر توجه، سنجیدنِ خطر و واکنش را خراب می‌کنند؛ هر کدام به شکلِ خودش. ماده‌ی ۱۸۷ رانندگی بعد از مصرف را جرم می‌داند. برای دارو، قانون فهرست نمی‌دهد: مسئولیتِ دانستن با خودِ راننده است.",
      columns: ["آنچه باید بدانی"],
      rows: [
        { label: "حشیش و ماری‌جوانا", it: "hashish o marijuana", values: ["توجه و حسِ زمان و فاصله را خراب می‌کنند و واکنش را کُند. «non compromette» درباره‌شان غلط است."] },
        { label: "هروئین، کوکائین", it: "eroina o cocaina", values: ["یکی خواب‌آور و کُندکننده، یکی تحریک‌کننده و بی‌احتیاط‌کننده؛ هر دو رانندگی را خطرناک می‌کنند."] },
        { label: "ال‌اس‌دی، آمفتامین", it: "LSD o l'anfetamina", values: ["دیدن و سنجیدنِ واقعیت را به هم می‌ریزند. «non compromette» غلط است."] },
        { label: "داروهای آرام‌بخش", it: "farmaci sedativi", values: ["موادی دارند که خواب‌آلودگی و کُندی می‌آورند. با الکل اثرشان بیشتر می‌شود."] },
        { label: "قانون (ماده‌ی ۱۸۷)", it: "dopo aver assunto sostanze stupefacenti o psicotrope", values: ["رانندگی بعد از مصرفِ مواد مخدر یا روان‌گردان جرم است: جریمه‌ی سنگین، حبسِ شش ماه تا یک سال، تعلیقِ گواهینامه یک تا دو سال. از دسامبرِ ۲۰۲۴ متنِ قانون دیگر «حالتِ آشفتگی» نمی‌خواهد؛ دادگاهِ قانونِ اساسی در ۲۰۲۶ گفته فقط مثبت بودنِ آزمایش کافی نیست و باید ماده هنگامِ رانندگی هنوز اثر داشته باشد. برای امتحان همین بس است: مواد مخدر و رانندگی با هم نه."] },
        { label: "داروی خودت", it: "il foglio illustrativo", values: ["برگه‌ی راهنمای دارو بخشی درباره‌ی رانندگی دارد. اگر شک داری از پزشک یا داروساز بپرس. داروی تجویزی را خودت قطع نکن و مقدارش را عوض نکن تا رانندگی کنی؛ این تصمیمِ پزشک است. این درس درباره‌ی هیچ داروی مشخصی توصیه نمی‌کند."] },
      ],
      takeaway: "هیچ ماده‌ی مخدری «بی‌اثر» نیست. برای دارو: برگه‌ی راهنما را بخوان، بپرس، و اگر خواب‌آلودی رانندگی نکن.",
      rule: `${CDS_187}; ${AIFA}`,
    },
    {
      kind: "classify",
      title: "آمادگی برای رانندگی: در خطر یا نه؟",
      body: `${SELF_CHECK} طبقِ همین درس و جواب‌های بانک، هر مورد را بسنج:`,
      options: [
        { it: "può compromettere", fa: "ممکن است آمادگی را خراب کند" },
        { it: "non compromette", fa: "در بانک خراب نمی‌کند" },
      ],
      items: [
        { prompt: "دیشب ماری‌جوانا کشیده و امروز صبح «حالش خوب است»", answer: 0, explain: "حسِ خوب معیار نیست؛ ماری‌جوانا آمادگی را خراب می‌کند و قانون هم رانندگی بعد از مصرف را مجازات می‌کند." },
        { prompt: "یک لیوان آبِ معدنیِ گازدار خورده", answer: 1, explain: "نوشابه‌ی گازدار در بانک FALSO است." },
        { prompt: "داروی سرماخوردگی خورده که برگه‌اش درباره‌ی خواب‌آلودگی هشدار می‌دهد", answer: 0, explain: "برگه‌ی راهنما همین را می‌گوید: ممکن است. از پزشک یا داروساز بپرس." },
        { prompt: "یک قرص مکملِ املاح (سدیم، پتاسیم) خورده", answer: 1, explain: "مکمل‌های املاح و غذایی در بانک FALSO‌اند." },
        { prompt: "آرام‌بخش خورده و حالا یک لیوان شراب هم می‌خورد", answer: 0, explain: "هر کدام ممکن است خراب کند، و با هم اثرِ همدیگر را بیشتر می‌کنند." },
      ],
      takeaway: "روی مغز اثر دارد؟ ممکن است رانندگی را خراب کند. شک داری؟ نران و بپرس.",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "le sostanze stupefacenti", fa: "مواد مخدر" },
        { it: "le sostanze psicotrope", fa: "مواد روان‌گردان" },
        { it: "i farmaci sedativi", fa: "داروهای آرام‌بخش" },
        { it: "i farmaci antidepressivi", fa: "داروهای ضدافسردگی" },
        { it: "gli allucinogeni", fa: "مواد توهم‌زا" },
        { it: "compromettere", fa: "آسیب زدن (به توانایی)" },
        { it: "la facoltà di guida", fa: "توانِ رانندگی" },
        { it: "gli integratori alimentari", fa: "مکمل‌های غذایی" },
        { it: "il foglio illustrativo", fa: "برگه‌ی راهنمای دارو" },
      ],
    },
    {
      kind: "trap",
      title: "«compromette» یا «non compromette»؟",
      body: "دو جمله‌ی تقریباً یکسان؛ فقط یک «non» فرقشان است:",
      examples: [
        {
          sourceId: "6476",
          textIt: "L'assunzione di hashish o di marijuana può compromettere la facoltà di guida",
          answer: 1,
          chunks: [
            { it: "L'assunzione di hashish o di marijuana", fa: "مصرفِ حشیش یا ماری‌جوانا" },
            { it: "può compromettere la facoltà di guida", fa: "می‌تواند به توانِ رانندگی آسیب بزند", verb: "può ← potere" },
          ],
          translation: "مصرفِ حشیش یا ماری‌جوانا می‌تواند به توانِ رانندگی آسیب بزند.",
          why: "درست است. توجه، حسِ زمان و فاصله، و واکنش آسیب می‌بینند.",
        },
        {
          sourceId: "6480",
          textIt: "L'assunzione di hashish o di marijuana non compromette la facoltà di guida",
          answer: 0,
          chunks: [
            { it: "L'assunzione di hashish o di marijuana", fa: "مصرفِ حشیش یا ماری‌جوانا" },
            { it: "non compromette la facoltà di guida", fa: "به توانِ رانندگی آسیب نمی‌زند", verb: "compromette ← compromettere", focus: "negation" },
          ],
          translation: "مصرفِ حشیش یا ماری‌جوانا به توانِ رانندگی آسیب نمی‌زند.",
          why: "غلط است. همان ماده، با «non»: هیچ ماده‌ی مخدری بی‌اثر نیست.",
        },
      ],
      takeaway: "در جمله‌های مواد مخدر دنبالِ «non» بگرد: «non compromette» همیشه غلط است.",
      rule: CDS_187,
    },
  ],
  practice: [
    {
      sourceId: "6468",
      textIt: "L'idoneità alla guida può essere compromessa se si fa uso di alcuni farmaci sedativi",
      answer: 1,
      chunks: [
        { it: IDONEITA, fa: IDONEITA_FA, verb: "può ← potere" },
        { it: "alcuni farmaci sedativi", fa: "بعضی داروهای آرام‌بخش را" },
      ],
      translation: "آمادگی برای رانندگی ممکن است آسیب ببیند اگر کسی بعضی داروهای آرام‌بخش را مصرف کند.",
      why: "درست است (قدم ۱). آرام‌بخش‌ها خواب‌آلودگی و کُندی می‌آورند؛ برگه‌ی راهنمای دارو را بخوان.",
      rule: AIFA,
      conceptStep: 1,
    },
    {
      sourceId: "6474",
      textIt: "L'idoneità alla guida può essere compromessa se si fa uso di integratori di sali minerali",
      answer: 0,
      chunks: [
        { it: IDONEITA, fa: IDONEITA_FA, verb: "può ← potere" },
        { it: "integratori di sali minerali", fa: "مکمل‌های املاحِ معدنی را", focus: "contrast" },
      ],
      translation: "آمادگی برای رانندگی ممکن است آسیب ببیند اگر کسی مکمل‌های املاحِ معدنی را مصرف کند.",
      why: "غلط است (قدم ۱). در بانک مکمل‌های املاح و غذایی آمادگی را خراب نمی‌کنند.",
      rule: AIFA,
      conceptStep: 1,
    },
    {
      sourceId: "6477",
      textIt: "L'assunzione di eroina o di cocaina può compromettere la facoltà di guida",
      answer: 1,
      chunks: [
        { it: "L'assunzione di eroina o di cocaina", fa: "مصرفِ هروئین یا کوکائین" },
        { it: "può compromettere la facoltà di guida", fa: "می‌تواند به توانِ رانندگی آسیب بزند", verb: "può ← potere" },
      ],
      translation: "مصرفِ هروئین یا کوکائین می‌تواند به توانِ رانندگی آسیب بزند.",
      why: "درست است (قدم ۲). یکی کُند و خواب‌آور، یکی تحریک‌کننده و بی‌احتیاط‌کننده؛ هر دو خطرناک.",
      rule: CDS_187,
      conceptStep: 2,
    },
    {
      sourceId: "6479",
      textIt: "L'assunzione di LSD o l'anfetamina non compromette la facoltà di guida",
      answer: 0,
      chunks: [
        { it: "L'assunzione di LSD o l'anfetamina", fa: "مصرفِ ال‌اس‌دی یا آمفتامین" },
        { it: "non compromette la facoltà di guida", fa: "به توانِ رانندگی آسیب نمی‌زند", verb: "compromette ← compromettere", focus: "negation" },
      ],
      translation: "مصرفِ ال‌اس‌دی یا آمفتامین به توانِ رانندگی آسیب نمی‌زند.",
      why: "غلط است (قدم ۲). هر دو دیدن و سنجیدنِ واقعیت را به هم می‌ریزند.",
      rule: CDS_187,
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["6468", "6469", "6470", "6471", "6472", "6473", "6474", "6475"] },
    { step: 2, sourceIds: ["6476", "6477", "6478", "6479", "6480"] },
  ],
};
