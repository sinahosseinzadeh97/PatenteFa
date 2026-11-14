/**
 * src/content/ch14-irregolari.ts
 * Chapter 14 (Precedenza negli incroci), lesson 5: junctions with diagonal
 * arms and five or six arms (bank figures 632, 634, 652, 657, 659, 661–665,
 * 667–669). No new rule: the right-hand rule of lesson 2 and the turning rules
 * of lesson 3, applied where "your right" is not simply the top, bottom, left
 * or right of the picture. Reviewed 2026-11-14; every order below was read by
 * hand from the figure and checked against the bank statements of that figure.
 */
import type { Lesson } from "./lessons.js";
import { FIG_657, FIG_664 } from "./crossings.js";

const SECONDO = "Secondo le norme di precedenza";
const SECONDO_FA = "طبق قواعد حق تقدم";
const NELL_INCROCIO = "nell'incrocio rappresentato in figura";
const NELL_INCROCIO_CAP = "Nell'incrocio rappresentato in figura";
const NELL_INCROCIO_FA = "در تقاطعِ نشان‌داده‌شده در شکل";
const CDS_145 = "Codice della Strada, art. 145 c.2";

export const lessonIrregolari: Lesson = {
  id: "incroci-a-piu-bracci",
  titleFa: "تقاطعِ کج و چندشاخه: راستِ تو کجاست؟",
  titleIt: "INCROCI A PIÙ BRACCI",
  minutes: 5,
  signs: [],
  figures: [632, 634, 652, 657, 659, 661, 662, 663, 664, 665, 667, 668, 669],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "در تقاطعی که بازوهایش مورب‌اند یا پنج و شش بازو دارد، برای هر وسیله پیدا کنی راستش کجاست و ترتیبِ عبور را با همان قاعده‌های درس ۲ و ۳ بچینی.",
      why:
        "۱۰۶ سؤال در ۱۳ شکلِ بانک همین کار را می‌خواهند. قاعده‌ی تازه‌ای در کار نیست؛ سختی فقط در خواندنِ شکل است: «راست» دیگر بالا، پایین، چپ یا راستِ صفحه نیست، بلکه سمتِ دستِ راستِ هر راننده است وقتی رو به جلو می‌راند.",
      rule: CDS_145,
    },
    {
      kind: "order",
      title: "بازوی مورب: راست را از جهتِ خودت پیدا کن",
      body:
        "خودت را جای هر راننده بگذار و رو به جهتِ حرکتش نگاه کن. هر بازویی که سمتِ دستِ راستت باشد «راست» توست، حتی اگر مورب باشد. وسیله‌ها را به ترتیبِ عبور انتخاب کن.",
      crossing: FIG_657,
      takeaway:
        "R راستِ خالی دارد، چون بازوهای مورب سمتِ چپِ او هستند. برای A و C که از پایین بالا می‌آیند، «راستِ تصویر» واقعاً سمتِ راستشان است. در شکلِ ۶۵۹ هم همین سه وسیله با همین ترتیب هستند.",
      rule: CDS_145,
    },
    {
      kind: "order",
      title: "چهار یا پنج وسیله: یک زنجیره، یکی‌یکی",
      body:
        "شکل‌های شلوغ هم با یک زنجیره حل می‌شوند: کسی که هیچ‌کس از راستش به مسیرش نمی‌آید اول است؛ بعد کسی که فقط منتظرِ او بود؛ و همین‌طور تا آخر. یادت باشد که فقط مسیرهایی مهم‌اند که با مسیرِ تو قطع می‌شوند (درس ۳).",
      crossing: FIG_664,
      takeaway:
        "S با اینکه D در بازوی سمت راستش است، اول می‌رود: گردشِ کوتاه به راست مسیرِ D را قطع نمی‌کند. بعد زنجیره ساده است: B، L، D. هر وسیله فقط به کسی نگاه می‌کند که از راستش وارد مسیرش می‌شود.",
      rule: "Codice della Strada, art. 145 c.2; art. 154 c.3 lett. a",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        {
          it: "disimpegnare l'incrocio",
          base: "disimpegnare",
          fa: "از تقاطع بیرون رفتن؛ تقاطع را خالی کردن",
          note: "برعکسِ «impegnare l'incrocio» (وارد تقاطع شدن). «disimpegnano nel seguente ordine» یعنی به این ترتیب از تقاطع بیرون می‌روند.",
        },
        { it: "dovendo attraversare", base: "dovere", fa: "وقتی باید عبور کنند", note: "«dovendo» وجهِ وصفیِ «dovere» است." },
        { it: "subito dopo", fa: "بلافاصله بعد از" },
        { it: "per terzo", fa: "سوم", note: "مثل «per primo» (اول) و «per ultimo» (آخر)." },
        { it: "non deve dare la precedenza ad alcun veicolo", base: "dovere", fa: "لازم نیست به هیچ وسیله‌ای حق تقدم بدهد" },
        { it: "giungendo all'incrocio", base: "giungere", fa: "وقتی به تقاطع می‌رسند" },
        { it: "l'autocarro", fa: "کامیون" },
      ],
    },
    {
      kind: "trap",
      title: "«به هیچ‌کس راه نمی‌دهد»: کدام وسیله؟",
      body:
        "اشتباه رایج: راستِ همه را با راستِ صفحه یکی گرفتن. این دو جمله‌ی بانک درباره‌ی یک شکل‌اند و کلماتشان یکی است؛ فقط وسیله فرق دارد:",
      examples: [
        {
          sourceId: "4775",
          figure: 659,
          textIt: "Secondo le norme di precedenza nell'incrocio rappresentato in figura il veicolo R non deve dare la precedenza ad alcun veicolo",
          answer: 1,
          chunks: [
            { it: SECONDO, fa: SECONDO_FA },
            { it: NELL_INCROCIO, fa: NELL_INCROCIO_FA },
            { it: "il veicolo R", fa: "وسیله‌ی R" },
            { it: "non deve dare la precedenza", fa: "لازم نیست حق تقدم بدهد", focus: "negation", verb: "deve ← dovere" },
            { it: "ad alcun veicolo", fa: "به هیچ وسیله‌ای" },
          ],
          translation: "طبق قواعد حق تقدم، در تقاطعِ نشان‌داده‌شده در شکل، وسیله‌ی R لازم نیست به هیچ وسیله‌ای حق تقدم بدهد.",
          why: "درست است. R از راستِ تصویر رو به چپ می‌راند؛ راستش بالای تصویر است و آنجا کسی نیست. A و C در بازوهای مورب پایین‌اند، یعنی سمتِ چپِ R.",
        },
        {
          sourceId: "4777",
          figure: 659,
          textIt: "Secondo le norme di precedenza nell'incrocio rappresentato in figura il veicolo C non deve dare la precedenza ad alcun veicolo",
          answer: 0,
          chunks: [
            { it: SECONDO, fa: SECONDO_FA },
            { it: NELL_INCROCIO, fa: NELL_INCROCIO_FA },
            { it: "il veicolo C", fa: "وسیله‌ی C" },
            { it: "non deve dare la precedenza", fa: "لازم نیست حق تقدم بدهد", focus: "negation", verb: "deve ← dovere" },
            { it: "ad alcun veicolo", fa: "به هیچ وسیله‌ای" },
          ],
          translation: "طبق قواعد حق تقدم، در تقاطعِ نشان‌داده‌شده در شکل، وسیله‌ی C لازم نیست به هیچ وسیله‌ای حق تقدم بدهد.",
          why: "غلط است. C از بازوی مورب پایین-چپ رو به بالا-راست می‌راند؛ سمتِ راستش بازوی پایین-راست (A) و راستِ تصویر (R) است. C به هر دو راه می‌دهد و آخر می‌رود.",
        },
      ],
      takeaway: "جمله یکی است، وسیله فرق دارد. برای هر حرف از نو بپرس: رو به کجا می‌راند؟ دستِ راستش به کدام بازو اشاره می‌کند؟",
      rule: CDS_145,
    },
  ],
  practice: [
    {
      sourceId: "5131",
      figure: 661,
      textIt: "Nell'incrocio rappresentato in figura i veicoli disimpegnano l'incrocio nel seguente ordine: E, C, L",
      answer: 1,
      chunks: [
        { it: NELL_INCROCIO_CAP, fa: NELL_INCROCIO_FA },
        { it: "i veicoli disimpegnano l'incrocio", fa: "وسیله‌ها از تقاطع بیرون می‌روند", verb: "disimpegnano ← disimpegnare" },
        { it: "nel seguente ordine:", fa: "به این ترتیب:" },
        { it: "E, C, L", fa: "E، C، L" },
      ],
      translation: "در تقاطعِ نشان‌داده‌شده در شکل، وسیله‌ها به این ترتیب از تقاطع بیرون می‌روند: E، C، L.",
      why:
        "درست است (قدم ۱). E از بالا پایین می‌آید؛ راستش سمت چپِ تصویر است و آنجا خالی است: E اول. C از راستِ تصویر رو به چپ می‌راند؛ راستش بالاست، جایی که E بود. L از بازوی مورب پایین-راست بالا می‌آید؛ راستش سمت راستِ تصویر است، جایی که C بود: L آخر.",
      rule: CDS_145,
      conceptStep: 1,
    },
    {
      sourceId: "4870",
      figure: 668,
      textIt: "Nell'incrocio rappresentato nella figura il veicolo C transita per primo",
      answer: 0,
      chunks: [
        { it: "Nell'incrocio rappresentato nella figura", fa: NELL_INCROCIO_FA },
        { it: "il veicolo C transita", fa: "وسیله‌ی C عبور می‌کند", verb: "transita ← transitare" },
        { it: "per primo", fa: "اول" },
      ],
      translation: "در تقاطعِ نشان‌داده‌شده در شکل، وسیله‌ی C اول عبور می‌کند.",
      why:
        "غلط است (قدم ۱). C از بالا پایین می‌آید؛ راستش سمت چپِ تصویر است و وسیله‌ی N از آنجا می‌آید. N هم منتظرِ S است که از بازوی مورب پایین-چپ می‌آید و راستش خالی است. ترتیب: S، N، C؛ C آخر است.",
      rule: CDS_145,
      conceptStep: 1,
    },
    {
      sourceId: "4885",
      figure: 665,
      textIt: "Nell'incrocio rappresentato in figura i veicoli disimpegnano l'incrocio nel seguente ordine: A, E, V, H, C",
      answer: 1,
      chunks: [
        { it: NELL_INCROCIO_CAP, fa: NELL_INCROCIO_FA },
        { it: "i veicoli disimpegnano l'incrocio", fa: "وسیله‌ها از تقاطع بیرون می‌روند", verb: "disimpegnano ← disimpegnare" },
        { it: "nel seguente ordine:", fa: "به این ترتیب:" },
        { it: "A, E, V, H, C", fa: "A، E، V، H، C" },
      ],
      translation: "در تقاطعِ نشان‌داده‌شده در شکل، وسیله‌ها به این ترتیب از تقاطع بیرون می‌روند: A، E، V، H، C.",
      why:
        "درست است (قدم ۲). A از چپ می‌آید و به چپ (بالا) می‌پیچد. C و H در بازوهای پایینِ سمتِ راستِ A هستند، ولی مسیرشان با مسیرِ کوتاهِ A قطع نمی‌شود؛ پس A اول است. بعد زنجیره: E (منتظرِ A)، V (منتظرِ E)، H (منتظرِ V)، و C که H را سمتِ راستش دارد، آخر.",
      rule: "Codice della Strada, art. 145 c.2; art. 154 c.3 lett. b",
      conceptStep: 2,
    },
    {
      sourceId: "4983",
      figure: 652,
      textIt: "Secondo le norme di precedenza nell'incrocio in figura i veicoli devono transitare nell'ordine: A, F, L, H",
      answer: 0,
      chunks: [
        { it: SECONDO, fa: SECONDO_FA },
        { it: "nell'incrocio in figura", fa: "در تقاطعِ شکل" },
        { it: "i veicoli devono transitare", fa: "وسیله‌ها باید عبور کنند", verb: "devono ← dovere" },
        { it: "nell'ordine:", fa: "به این ترتیب:" },
        { it: "A, F, L, H", fa: "A، F، L، H" },
      ],
      translation: "طبق قواعد حق تقدم، در تقاطعِ شکل، وسیله‌ها باید به این ترتیب عبور کنند: A، F، L، H.",
      why:
        "غلط است (قدم ۲). H از بازوی پایین-چپ به بازوی پایین-راست می‌رود: گردشی کوتاه به راست که مسیرِ کسی را قطع نمی‌کند، پس H اول است. بعد A (کامیون) که H را سمتِ راستش دارد، بعد F (اتوبوس) که A را، و آخر L که F را. ترتیب درست: H، A، F، L. اتوبوس بودن امتیازی نمی‌دهد.",
      rule: "Codice della Strada, art. 145 c.2; art. 154 c.3 lett. a",
      conceptStep: 2,
    },
  ],
  related: [
    {
      step: 1,
      sourceIds: [
        // 657: R, A, C (the step-1 drawing)
        "5089", "5090", "5091", "5092", "5093", "5094", "5095", "5096",
        // 659: same drawing, R, A, C
        "4773", "4774", "4775", "4776", "4777", "4778", "4779", "4780",
        // 661: E, C, L
        "5128", "5129", "5130", "5131", "5132", "5133", "5134", "5135",
        // 662: A, E, B
        "4763", "4764", "4765", "4766", "4767", "4768", "4769", "4770", "4771", "4772",
        // 667: C, A, P (4864 "P … ha la destra libera" stays in lesson 1)
        "4859", "4860", "4861", "4862", "4863",
        // 668: S, N, C
        "4865", "4866", "4867", "4868", "4869", "4870",
        // 634: A (right turn), C, L (left turn)
        "5120", "5121", "5122", "5123", "5124", "5125", "5126", "5127",
      ],
    },
    {
      step: 2,
      sourceIds: [
        // 664: S, B, L, D (the step-2 drawing)
        "5039", "5040", "5041", "5042",
        // 663: R, B, D, T
        "5047", "5048", "5049",
        // 665: A, E, V, H, C
        "4885", "4886", "4887", "4888", "4889", "4890", "4891", "4892", "4893", "4894", "4895",
        // 669: C, A, L, R, E (4883 "any vehicle may stop in the centre" is lesson 6)
        "4873", "4874", "4875", "4876", "4877", "4878", "4879", "4880", "4881", "4882", "4884",
        // 652: H, A, F (bus), L
        "4977", "4978", "4979", "4980", "4981", "4982", "4983", "4984", "4985", "4986", "4987",
        // 632: D, P, B, N
        "4789", "4790", "4791", "4792", "4793", "4794", "4795", "4796", "4797", "4798", "4799", "4800", "4801",
      ],
    },
  ],
};
