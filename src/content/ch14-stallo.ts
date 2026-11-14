/**
 * src/content/ch14-stallo.ts
 * Chapter 14 (Precedenza negli incroci), lesson 6: the deadlock figures, where
 * every driver has someone on the right (bank figures 617, 638, 642), and the
 * statements elsewhere that test the same idea (only that left-turner, only
 * in a deadlock, stops at the centre: 4883 from 669, 4952–4953 from 648).
 *
 * No article of the Codice della Strada states this resolution. The bank's
 * answers are consistent across all three figures: the left-turner moves to
 * the centre of the junction (art. 154 c.3 lett. b: a left turn is made near
 * the centre), waits there, lets the others through and finishes last. Taught
 * as the bank's reading, with art. 145 c.1–2 and art. 154 c.3 lett. b as its
 * legal hooks (docs/chapter-14-coverage.md). Reviewed 2026-11-14.
 */
import type { Lesson } from "./lessons.js";
import { FIG_617, FIG_638 } from "./crossings.js";

const NELL_INCROCIO_NELLA = "Nell'incrocio rappresentato nella figura";
const NELL_INCROCIO_FA = "در تقاطعِ نشان‌داده‌شده در شکل";
const NELLA_SITUAZIONE = "Nella situazione rappresentata in figura";
const NELLA_SITUAZIONE_FA = "در وضعیتِ نشان‌داده‌شده در شکل";
const RULE = "Codice della Strada, art. 145 c.1–2; art. 154 c.3 lett. b";

export const lessonStallo: Lesson = {
  id: "stallo-al-centro",
  titleFa: "وقتی راستِ همه پر است",
  titleIt: "STALLO · AL CENTRO DELL'INCROCIO",
  minutes: 5,
  signs: [],
  figures: [617, 638, 642, 648, 669],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "تقاطعی را بشناسی که در آن هر راننده کسی را سمتِ راستش دارد و قاعده‌ی راست به تنهایی گره می‌خورد؛ و بدانی بانک سؤال این گره را چطور باز می‌کند.",
      why:
        "۵۰ سؤال درباره‌ی همین گره‌اند. راهِ حل همیشه یکی است: وسیله‌ای که به چپ می‌پیچد تا مرکزِ تقاطع جلو می‌رود، همان‌جا می‌ایستد، بقیه رد می‌شوند و او آخر پیچیدنش را تمام می‌کند. قانون این را با یک جمله نمی‌گوید؛ از دو چیز می‌آید: پیچیدن به چپ نزدیکِ مرکز انجام می‌شود، و سرِ تقاطع «حداکثرِ احتیاط» لازم است.",
      rule: RULE,
    },
    {
      kind: "order",
      title: "گره: هر کس منتظرِ دیگری",
      body:
        "اول زنجیره را دنبال کن و ببین که بسته می‌شود: هیچ‌کس راستِ خالی ندارد، یا تنها کسی که دارد به چپ می‌پیچد و باید به روبه‌رو راه بدهد. بعد ترتیبی را بچین که وسیله‌ها تقاطع را تمام می‌کنند.",
      crossing: FIG_617,
      takeaway:
        "N اول وارد تقاطع می‌شود ولی آخر بیرون می‌رود. این فقط مالِ گره است و فقط مالِ کسی که به چپ می‌پیچد؛ در تقاطعِ معمولی هیچ‌کس وسطِ تقاطع نمی‌ایستد.",
      rule: RULE,
    },
    {
      kind: "order",
      title: "چهار وسیله در گره",
      body:
        "اینجا دو وسیله از پایین می‌آیند. گره همان است: R به B راه می‌دهد، B به N، و N و D به R. ببین چه کسی تا مرکز جلو می‌رود و بعد چه کسانی با هم رد می‌شوند. اگر تراموا هم باشد (شکل ۶۴۲)، اول تراموا رد می‌شود و بعد همین گره باز می‌شود.",
      crossing: FIG_638,
      takeaway:
        "B در مرکز فقط منتظرِ N است که روبه‌رویش مستقیم می‌آید؛ به D که او هم به چپ می‌پیچد راه نمی‌دهد. در شکل ۶۴۲ هم: اول تراموا، بعد A تا مرکز می‌رود، O و M رد می‌شوند و A آخر.",
      rule: "Codice della Strada, art. 145 c.1–3; art. 154 c.3 lett. b",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        {
          it: "portarsi al centro dell'incrocio",
          base: "portarsi",
          fa: "تا مرکزِ تقاطع جلو رفتن",
          note: "«che il veicolo A si porti al centro» یعنی «که وسیله‌ی A تا مرکز جلو برود» (وجهِ التزامی).",
        },
        { it: "fermarsi al centro di esso", base: "fermarsi", fa: "در مرکزِ آن ایستادن", note: "«esso» یعنی «آن» و به l'incrocio برمی‌گردد." },
        { it: "concludere la manovra di svolta", base: "concludere", fa: "پیچیدن را تمام کردن" },
        { it: "concludere l'attraversamento", base: "concludere", fa: "عبور از تقاطع را تمام کردن" },
        {
          it: "dopo essersi portato al centro",
          base: "portarsi",
          fa: "بعد از اینکه تا مرکز جلو رفت",
          note: "«essersi portato» مصدرِ گذشته است: کاری که قبلاً انجام شده.",
        },
        { it: "avere la precedenza rispetto a", base: "avere", fa: "نسبت به … حق تقدم داشتن" },
        { it: "usare prudenza", base: "usare", fa: "احتیاط کردن" },
      ],
    },
    {
      kind: "trap",
      title: "حق تقدم داشتن یعنی اول رد شدن؟",
      body:
        "اشتباه رایج: «اگر N نسبت به R حق تقدم دارد، پس قبل از R رد می‌شود». در گره این‌طور نیست. این دو جمله‌ی بانک درباره‌ی شکل ۶۱۷ را ببین؛ کلماتشان یکی است:",
      examples: [
        {
          sourceId: "4990",
          figure: 617,
          textIt: "Nell'incrocio rappresentato nella figura il veicolo N ha la precedenza rispetto al veicolo R",
          answer: 1,
          chunks: [
            { it: NELL_INCROCIO_NELLA, fa: NELL_INCROCIO_FA },
            { it: "il veicolo N", fa: "وسیله‌ی N" },
            { it: "ha la precedenza", fa: "حق تقدم دارد", verb: "ha ← avere" },
            { it: "rispetto al veicolo R", fa: "نسبت به وسیله‌ی R" },
          ],
          translation: "در تقاطعِ نشان‌داده‌شده در شکل، وسیله‌ی N نسبت به وسیله‌ی R حق تقدم دارد.",
          why: "درست است. N در سمت راستِ R است، پس R باید به N راه بدهد. N از همین حق استفاده می‌کند تا جلوتر از همه وارد شود و تا مرکز برود؛ ولی آنجا برای A می‌ایستد و R در این فاصله رد می‌شود.",
        },
        {
          sourceId: "5000",
          figure: 617,
          textIt: "Nell'incrocio rappresentato nella figura il veicolo N ha la precedenza rispetto al veicolo A",
          answer: 0,
          chunks: [
            { it: NELL_INCROCIO_NELLA, fa: NELL_INCROCIO_FA },
            { it: "il veicolo N", fa: "وسیله‌ی N" },
            { it: "ha la precedenza", fa: "حق تقدم دارد", verb: "ha ← avere" },
            { it: "rispetto al veicolo A", fa: "نسبت به وسیله‌ی A" },
          ],
          translation: "در تقاطعِ نشان‌داده‌شده در شکل، وسیله‌ی N نسبت به وسیله‌ی A حق تقدم دارد.",
          why: "غلط است. N به چپ می‌پیچد و A روبه‌رویش مستقیم می‌آید؛ هنگامِ پیچیدن A از راستِ N وارد مسیرش می‌شود (درس ۳). پس N به A راه می‌دهد.",
        },
      ],
      takeaway:
        "«ha la precedenza rispetto a» یعنی دیگری باید به او راه بدهد، نه اینکه او اول تمام می‌کند. در گره، N نسبت به R حق تقدم دارد و باز هم آخر بیرون می‌رود.",
      rule: RULE,
    },
  ],
  practice: [
    {
      sourceId: "4993",
      figure: 617,
      textIt: "Nell'incrocio rappresentato nella figura il conducente del veicolo R deve dare la precedenza al veicolo N",
      answer: 1,
      chunks: [
        { it: NELL_INCROCIO_NELLA, fa: NELL_INCROCIO_FA },
        { it: "il conducente del veicolo R", fa: "راننده‌ی وسیله‌ی R" },
        { it: "deve dare la precedenza", fa: "باید حق تقدم بدهد", verb: "deve ← dovere" },
        { it: "al veicolo N", fa: "به وسیله‌ی N" },
      ],
      translation: "در تقاطعِ نشان‌داده‌شده در شکل، راننده‌ی وسیله‌ی R باید به وسیله‌ی N حق تقدم بدهد.",
      why:
        "درست است (قدم ۱). R رو به چپِ تصویر می‌راند؛ راستش بالای تصویر است و N از آنجا می‌آید. R به N راه می‌دهد، و N با همین حق تا مرکز جلو می‌رود. چون N آنجا برای A می‌ایستد، R آخرِ کار زودتر از همه تمام می‌کند.",
      rule: RULE,
      conceptStep: 1,
    },
    {
      sourceId: "5006",
      figure: 617,
      textIt: "Nell'incrocio rappresentato nella figura il conducente del veicolo R impegna l'incrocio e si ferma al centro",
      answer: 0,
      chunks: [
        { it: NELL_INCROCIO_NELLA, fa: NELL_INCROCIO_FA },
        { it: "il conducente del veicolo R", fa: "راننده‌ی وسیله‌ی R" },
        { it: "impegna l'incrocio", fa: "وارد تقاطع می‌شود", verb: "impegna ← impegnare" },
        { it: "e si ferma al centro", fa: "و در مرکز می‌ایستد", verb: "si ferma ← fermarsi" },
      ],
      translation: "در تقاطعِ نشان‌داده‌شده در شکل، راننده‌ی وسیله‌ی R وارد تقاطع می‌شود و در مرکز می‌ایستد.",
      why:
        "غلط است (قدم ۱). R مستقیم می‌رود. فقط وسیله‌ای که به چپ می‌پیچد (N) تا مرکز جلو می‌رود و می‌ایستد؛ R وقتی N در مرکز است، بدون توقف رد می‌شود.",
      rule: RULE,
      conceptStep: 1,
    },
    {
      sourceId: "4723",
      figure: 642,
      textIt: "Nella situazione rappresentata in figura il veicolo O deve attendere il transito del tram e che il veicolo A si porti al centro",
      answer: 1,
      chunks: [
        { it: NELLA_SITUAZIONE, fa: NELLA_SITUAZIONE_FA },
        { it: "il veicolo O deve attendere", fa: "وسیله‌ی O باید منتظر بماند", verb: "deve ← dovere" },
        { it: "il transito del tram", fa: "عبورِ تراموا" },
        { it: "e che il veicolo A si porti al centro", fa: "و اینکه وسیله‌ی A تا مرکز جلو برود", verb: "si porti ← portarsi" },
      ],
      translation: "در وضعیتِ نشان‌داده‌شده در شکل، وسیله‌ی O باید منتظرِ عبورِ تراموا بماند و منتظر بماند که وسیله‌ی A تا مرکز جلو برود.",
      why:
        "درست است (قدم ۲). اول تراموا رد می‌شود (درس ۲). بعد گره: O به A راه می‌دهد (A راستِ O است)، A که به چپ می‌پیچد به M روبه‌رویش، و M به O. A تا مرکز جلو می‌رود و می‌ایستد؛ حالا O رد می‌شود، بعد M، و A آخر.",
      rule: "Codice della Strada, art. 145 c.1–3; art. 154 c.3 lett. b",
      conceptStep: 2,
    },
    {
      sourceId: "4857",
      figure: 638,
      textIt: "Nell'incrocio rappresentato nella figura il conducente del veicolo B deve impegnare per ultimo l'incrocio perché svolta a sinistra",
      answer: 0,
      chunks: [
        { it: NELL_INCROCIO_NELLA, fa: NELL_INCROCIO_FA },
        { it: "il conducente del veicolo B deve impegnare", fa: "راننده‌ی وسیله‌ی B باید وارد … شود", verb: "deve ← dovere" },
        { it: "per ultimo l'incrocio", fa: "آخر از همه تقاطع" },
        { it: "perché svolta a sinistra", fa: "چون به چپ می‌پیچد", focus: "reason", verb: "svolta ← svoltare" },
      ],
      translation: "در تقاطعِ نشان‌داده‌شده در شکل، راننده‌ی وسیله‌ی B باید آخر از همه وارد تقاطع شود، چون به چپ می‌پیچد.",
      why:
        "غلط است (قدم ۲). B اول از همه وارد تقاطع می‌شود و تا مرکز جلو می‌رود؛ همین گره را باز می‌کند. آخر تمام می‌کند، نه آخر وارد می‌شود. دلیلِ جمله هم غلط است: پیچیدن به چپ تو را خود به خود آخرِ صف نمی‌کند (درس ۳).",
      rule: RULE,
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        // 617: N to the centre; R, A, N
        "4988", "4989", "4990", "4991", "4992", "4993", "4994", "4995", "4996", "4997",
        "4998", "4999", "5000", "5001", "5002", "5003", "5004", "5005", "5006",
        // Not a deadlock, so nobody stops in the centre (669, 648)
        "4883", "4952", "4953",
      ],
    },
    {
      step: 2,
      sourceIds: [
        // 638: B to the centre; R, D + N, B (4856 "B ha la destra libera" is lesson 1)
        "4840", "4841", "4842", "4843", "4844", "4845", "4846", "4847", "4848", "4849",
        "4850", "4851", "4852", "4853", "4854", "4855", "4857", "4858",
        // 642: tram first, then A to the centre; O, M, A (4727 "A ha la destra libera" is lesson 1)
        "4721", "4722", "4723", "4724", "4725", "4726", "4728", "4729", "4730", "4731",
      ],
    },
  ],
};
