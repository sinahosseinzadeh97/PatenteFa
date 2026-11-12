/**
 * src/content/ch7-agenti.ts
 * Chapter 7 (Semafori e segnali degli agenti del traffico), lessons 8–10: the
 * traffic officer. Arms open / in profile / one arm raised (bank figures
 * 383–385), arms at a right angle (386) and the prolonged whistle, and how
 * officers are recognised and which documents you show them.
 *
 * The bank figures carry a third-party mark, so they are never annotated
 * (features.md §22.2). The "who moves?" drawings are original junction scenes
 * in public/js/road.js ("agente-braccia", "agente-angolo").
 *
 * Trust rules as in src/content/lessons.ts; checked by tests/chapter7.test.ts
 * and `npm run verify:lessons`.
 *
 * Flags (bank unchanged, see docs/chapter-7-coverage.md):
 *  - DPR 495/1992 art. 181 c.1 describes the right-angle signal only for the
 *    left-turning flow (from the officer's left) and the oncoming flow it stops.
 *    The bank's claims about going straight / right from his left, and stopping
 *    the flow behind him, follow from CdS art. 43 c.3 lett. b; the flow in front
 *    of him is never asked and lesson 9 says the regulation does not settle it.
 *  - #2841 (show the warning triangle on request) is VERO in the bank. CdS
 *    art. 180 lists only documents; art. 162 c.1 makes the triangle mandatory
 *    equipment. No text found that says "esibire"; lesson 10 says so.
 */
import type { Lesson } from "./lessons.js";

const BRACCIA = "Quando il vigile si dispone con le braccia aperte verso la nostra direzione come in figura";
const BRACCIA_FA = "وقتی مأمور مثلِ تصویر با دست‌های باز رو به جهتِ ما می‌ایستد،";
const PROFILO = "Quando il vigile si dispone di profilo con le braccia aperte come in figura";
const PROFILO_FA = "وقتی مأمور مثلِ تصویر نیم‌رخ و با دست‌های باز می‌ایستد،";
const ALZATO = "Se il vigile ha un braccio alzato come in figura";
const ALZATO_FA = "اگر مأمور مثلِ تصویر یک دستش بالاست،";
const ANGOLO = "Il vigile disposto con le braccia ad angolo retto come in figura";
const ANGOLO_FA = "مأموری که مثلِ تصویر دست‌هایش را با زاویه‌ی قائمه گرفته";
const FISCHIETTO = "Il suono prolungato del fischietto da parte dell'agente preposto al traffico";
const FISCHIETTO_FA = "سوتِ ممتدِ مأمورِ راهنمایی";
const ESIBIRE = "Chi guida autoveicoli o motocicli deve esibire, a richiesta degli agenti,";
const ESIBIRE_FA = "کسی که خودرو یا موتورسیکلت می‌راند باید، به درخواستِ مأموران، نشان بدهد:";
const MOSTRARE = "Chi guida autoveicoli o motocicli deve mostrare, a richiesta degli agenti,";
const ADDETTI = "Gli addetti a servizi di polizia stradale vengono riconosciuti";
const ADDETTI_FA = "مأمورانِ پلیسِ راه شناخته می‌شوند";

// ── Lesson 8 ──────────────────────────────────────────────────────────────────

export const lessonAgenteBraccia: Lesson = {
  id: "agente-braccia-aperte",
  titleFa: "مأمور: دست‌های باز و دستِ بالا",
  titleIt: "AGENTE DEL TRAFFICO · BRACCIA APERTE · BRACCIO ALZATO",
  minutes: 5,
  signs: [],
  figures: [383, 384, 385],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس از ژستِ مأمورِ راهنمایی می‌فهمی تو باید بایستی یا بروی: دست‌های باز وقتی سینه یا پشتش رو به توست، دست‌های باز وقتی نیم‌رخش را می‌بینی، و یک دستِ بالا.",
      why:
        "۲۷ سؤال. مأمور بر چراغ و تابلو مقدم است (فصل ۵، درس ۹). نکته‌ی اصلی: یک ژستِ «دست‌های باز» برای دو گروه دو معنیِ مخالف دارد. باید بدانی تو کجای تقاطعی.",
    },
    {
      kind: "table",
      title: "سه ژست، سه رنگ",
      body: "هر ژستِ مأمور معادلِ یک رنگِ چراغ است. ستونِ دوم می‌گوید برای تو یعنی چه.",
      columns: ["مثلِ چراغِ", "چه کنی"],
      rows: [
        {
          label: "دست‌های باز؛ سینه یا پشتش رو به توست",
          it: "braccia aperte verso di noi",
          sign: 383,
          values: ["قرمز", "پیش از خطِ توقف بایست: نه مستقیم، نه راست، نه چپ. بوق زدن برای جلبِ توجهِ مأمور هم نه."],
        },
        {
          label: "دست‌های باز؛ نیم‌رخش را می‌بینی",
          it: "di profilo, braccia aperte",
          sign: 384,
          values: ["سبز", "تو موازیِ دست‌هایش حرکت می‌کنی: مستقیم، راست یا چپ، با احتیاط."],
        },
        {
          label: "یک دست بالا",
          it: "braccio alzato",
          sign: 385,
          values: ["زردِ ثابت", "اگر بی‌خطر می‌توانی پیش از تقاطع بایست؛ اگر وارد شده‌ای، سریع خالی کن (قدم ۳)."],
        },
      ],
      takeaway: "سینه یا پشت = قرمز. نیم‌رخ = سبز. دستِ بالا = زرد.",
      rule: "Codice della Strada art. 43 c.1–4",
    },
    {
      kind: "anatomy",
      title: "یک ژست، دو پیام: چه کسی می‌رود؟",
      scene: "agente-braccia",
      body: "تقاطع از بالا. مأمور وسط است و صورتش (علامتِ زرد) رو به پایین؛ چپ و راست را از نگاهِ خودِ مأمور بخوان. روی هر خودرو بزن.",
      parts: [
        {
          id: "fronte",
          nameIt: "DI FRONTE · ALT",
          nameFa: "روبه‌روی سینه‌اش: بایست",
          text: "این راننده سینه‌ی مأمور را می‌بیند و دست‌ها مثلِ مانعی جلویش کشیده شده‌اند: قرمز. پیش از خطِ توقف بایست. تصویرِ «braccia aperte verso la nostra direzione» در بانک همین است.",
        },
        {
          id: "spalle",
          nameIt: "ALLE SPALLE · ALT",
          nameFa: "پشتِ سرش: بایست",
          text: "پشتِ مأمور هم مثلِ جلویش است: دست‌ها راهت را بسته‌اند. قرمز؛ بایست.",
        },
        {
          id: "sinistra",
          nameIt: "A SINISTRA · VIA",
          nameFa: "سمتِ چپش: برو",
          text: "این راننده مأمور را از نیم‌رخ می‌بیند و موازیِ دست‌هایش حرکت می‌کند: سبز. مستقیم، به راست یا به چپ، با احتیاط. تصویرِ «di profilo» در بانک همین است.",
        },
        {
          id: "destra",
          nameIt: "A DESTRA · VIA",
          nameFa: "سمتِ راستش: برو",
          text: "همان سبز از طرفِ دیگر. مجبور نیستی مستقیم بروی، و نباید پیش از خط یا بعد از گذرگاهِ عابر بایستی.",
        },
      ],
      takeaway: "کسی که سینه یا پشتِ مأمور را می‌بیند می‌ایستد؛ کسی که نیم‌رخش را می‌بیند می‌رود.",
      rule: "Codice della Strada art. 43 c.3 lett. b, c.4",
    },
    {
      kind: "table",
      title: "یک دستِ بالا = زردِ ثابت",
      body: "دستِ بالا یعنی «توجه، ایست» برای همه؛ ولی مثلِ زرد، کسی که نمی‌تواند بی‌خطر بایستد یا وارد شده، بیرون می‌رود.",
      columns: ["قاعده"],
      rows: [
        { label: "معنی", it: "attenzione, arresto", sign: 385, values: ["معادلِ زردِ ثابت، برای همه‌ی جهت‌ها. قرمز نیست."] },
        { label: "هنوز وارد نشده‌ای", it: "prima dell'incrocio", values: ["اگر می‌توانی بی‌خطر بایستی، پیش از تقاطع بایست."] },
        { label: "وارد شده‌ای", it: "incrocio già impegnato", values: ["تقاطع را سریع خالی کن."] },
        {
          label: "جمله‌های غلط",
          it: "solo · in ogni caso",
          values: ["«فقط برای پیچنده‌ها»، «فقط می‌شود به راست پیچید»، «در هر حال بایست»، «فقط اگر ریلِ تراموا هست آهسته کن»، «مثلِ قرمز است»."],
        },
      ],
      takeaway: "دستِ بالا همان قاعده‌ی زرد است: بی‌خطر می‌شود بایستی ← بایست؛ داخلی ← بیرون برو.",
      rule: "Codice della Strada art. 43 c.3 lett. a",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "il vigile · l'agente del traffico", fa: "مأمورِ راهنمایی و رانندگی" },
        { it: "si dispone", base: "disporsi", fa: "قرار می‌گیرد؛ می‌ایستد" },
        { it: "le braccia aperte", fa: "دست‌های باز" },
        { it: "di profilo", fa: "نیم‌رخ" },
        { it: "le correnti di traffico parallele alle sue braccia", fa: "جریان‌هایی که موازیِ دست‌هایش حرکت می‌کنند" },
        { it: "il braccio alzato", fa: "دستِ بالا" },
        { it: "equivale a", base: "equivalere", fa: "معادلِ … است" },
        { it: "suonare il clacson", base: "suonare", fa: "بوق زدن" },
      ],
    },
    {
      kind: "trap",
      title: "دست‌های باز رو به تو: قرمز یا سبز؟",
      body: "هر دو جمله همان تصویر را به یک رنگ نسبت می‌دهند. فقط یکی درست است:",
      examples: [
        {
          sourceId: "2856",
          figure: 383,
          textIt: "La posizione del vigile con le braccia aperte verso la nostra direzione come in figura equivale alla luce rossa del semaforo",
          answer: 1,
          chunks: [
            { it: "La posizione del vigile con le braccia aperte verso la nostra direzione come in figura", fa: "ژستِ مأمور با دست‌های باز رو به جهتِ ما، مثلِ تصویر،" },
            { it: "equivale alla luce rossa del semaforo", fa: "معادلِ چراغِ قرمز است", verb: "equivale ← equivalere" },
          ],
          translation: "ژستِ مأمور با دست‌های باز رو به جهتِ ما، مثلِ تصویر، معادلِ چراغِ قرمز است.",
          why: "درست است. سینه‌ی مأمور رو به توست؛ دست‌ها راهت را بسته‌اند.",
        },
        {
          sourceId: "2861",
          figure: 383,
          textIt: "La posizione del vigile con le braccia aperte verso la nostra direzione come in figura equivale alla luce verde del semaforo",
          answer: 0,
          chunks: [
            { it: "La posizione del vigile con le braccia aperte verso la nostra direzione come in figura", fa: "ژستِ مأمور با دست‌های باز رو به جهتِ ما، مثلِ تصویر،" },
            { it: "equivale alla luce verde del semaforo", fa: "معادلِ چراغِ سبز است", verb: "equivale ← equivalere", focus: "contrast" },
          ],
          translation: "ژستِ مأمور با دست‌های باز رو به جهتِ ما، مثلِ تصویر، معادلِ چراغِ سبز است.",
          why: "غلط است. سبز برای کسی است که نیم‌رخِ مأمور را می‌بیند، نه کسی که سینه‌اش را.",
        },
      ],
      takeaway: "«verso la nostra direzione» = سینه رو به ما = قرمز. «di profilo» = سبز.",
      rule: "Codice della Strada art. 43 c.3 lett. b",
    },
  ],
  practice: [
    {
      sourceId: "2857",
      figure: 383,
      textIt: "Quando il vigile si dispone con le braccia aperte verso la nostra direzione come in figura si può passare se si svolta a destra, dando però la precedenza ai pedoni che attraversano",
      answer: 0,
      chunks: [
        { it: BRACCIA, fa: BRACCIA_FA, verb: "si dispone ← disporsi", focus: "condition" },
        { it: "si può passare se si svolta a destra,", fa: "اگر به راست بپیچی می‌شود رد شد،", verb: "può ← potere", focus: "contrast" },
        { it: "dando però la precedenza ai pedoni che attraversano", fa: "ولی با راه دادن به عابرهایی که عبور می‌کنند", verb: "dando ← dare" },
      ],
      translation: "وقتی مأمور مثلِ تصویر با دست‌های باز رو به جهتِ ما می‌ایستد، اگر به راست بپیچی می‌شود رد شد، ولی با راه دادن به عابرهایی که عبور می‌کنند.",
      why: "غلط است (قدم ۱). این ژست برای تو قرمز است: هیچ جهتی، راست هم نه.",
      rule: "Codice della Strada art. 43 c.3 lett. b",
      conceptStep: 1,
    },
    {
      sourceId: "2859",
      figure: 383,
      textIt: "Quando il vigile si dispone con le braccia aperte verso la nostra direzione come in figura bisogna suonare il clacson, ma con moderazione, per richiamare l'attenzione del vigile",
      answer: 0,
      chunks: [
        { it: BRACCIA, fa: BRACCIA_FA, verb: "si dispone ← disporsi", focus: "condition" },
        { it: "bisogna suonare il clacson,", fa: "باید بوق بزنی،", verb: "bisogna ← bisognare", focus: "contrast" },
        { it: "ma con moderazione,", fa: "ولی آرام،" },
        { it: "per richiamare l'attenzione del vigile", fa: "تا توجهِ مأمور را جلب کنی", focus: "reason" },
      ],
      translation: "وقتی مأمور مثلِ تصویر با دست‌های باز رو به جهتِ ما می‌ایستد، باید بوق بزنی، ولی آرام، تا توجهِ مأمور را جلب کنی.",
      why: "غلط است (قدم ۱). قرمز است: پشتِ خط بایست و منتظرِ ژستِ بعدی بمان. بوق زدن کاری از پیش نمی‌برد.",
      rule: "Codice della Strada art. 43 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2863",
      figure: 384,
      textIt: "Quando il vigile si dispone di profilo con le braccia aperte come in figura si può svoltare a destra se si proviene dalla sua destra o dalla sua sinistra",
      answer: 1,
      chunks: [
        { it: PROFILO, fa: PROFILO_FA, verb: "si dispone ← disporsi", focus: "condition" },
        { it: "si può svoltare a destra", fa: "می‌شود به راست پیچید", verb: "può ← potere" },
        { it: "se si proviene dalla sua destra o dalla sua sinistra", fa: "اگر از سمتِ راست یا چپِ او می‌آیی", verb: "proviene ← provenire", focus: "condition" },
      ],
      translation: "وقتی مأمور مثلِ تصویر نیم‌رخ و با دست‌های باز می‌ایستد، اگر از سمتِ راست یا چپِ او می‌آیی می‌شود به راست پیچید.",
      why: "درست است (قدم ۲). از چپ یا راستِ مأمور یعنی موازیِ دست‌هایش: سبز؛ هر سه جهت باز است.",
      rule: "Codice della Strada art. 43 c.3 lett. b",
      conceptStep: 2,
    },
    {
      sourceId: "2867",
      figure: 384,
      textIt: "Quando il vigile si dispone di profilo con le braccia aperte come in figura, ci si deve arrestare prima della striscia trasversale di arresto se si proviene dalla sua sinistra",
      answer: 0,
      chunks: [
        { it: "Quando il vigile si dispone di profilo con le braccia aperte come in figura,", fa: PROFILO_FA, verb: "si dispone ← disporsi", focus: "condition" },
        { it: "ci si deve arrestare prima della striscia trasversale di arresto", fa: "باید پیش از خطِ عرضیِ توقف بایستی", verb: "deve ← dovere", focus: "contrast" },
        { it: "se si proviene dalla sua sinistra", fa: "اگر از سمتِ چپِ او می‌آیی", verb: "proviene ← provenire", focus: "condition" },
      ],
      translation: "وقتی مأمور مثلِ تصویر نیم‌رخ و با دست‌های باز می‌ایستد، اگر از سمتِ چپِ او می‌آیی باید پیش از خطِ عرضیِ توقف بایستی.",
      why: "غلط است (قدم ۲). سمتِ چپِ مأمور موازیِ دست‌هاست: سبز، نه ایست.",
      rule: "Codice della Strada art. 43 c.3 lett. b",
      conceptStep: 2,
    },
    {
      sourceId: "2872",
      figure: 385,
      textIt: "Se il vigile ha un braccio alzato come in figura bisogna arrestarsi prima dell'incrocio, se è possibile farlo senza creare pericolo",
      answer: 1,
      chunks: [
        { it: ALZATO, fa: ALZATO_FA, verb: "ha ← avere", focus: "condition" },
        { it: "bisogna arrestarsi prima dell'incrocio,", fa: "باید پیش از تقاطع بایستی،", verb: "bisogna ← bisognare" },
        { it: "se è possibile farlo senza creare pericolo", fa: "اگر بتوانی بدونِ ایجادِ خطر این کار را بکنی", focus: "condition" },
      ],
      translation: "اگر مأمور مثلِ تصویر یک دستش بالاست، باید پیش از تقاطع بایستی، اگر بتوانی بدونِ ایجادِ خطر این کار را بکنی.",
      why: "درست است (قدم ۳). همان شرطِ زرد: توقف، اگر بی‌خطر ممکن باشد.",
      rule: "Codice della Strada art. 43 c.3 lett. a",
      conceptStep: 3,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2851", "2852", "2853", "2854", "2855", "2856", "2857", "2858", "2859", "2860", "2861"] },
    { step: 2, sourceIds: ["2862", "2863", "2864", "2865", "2866", "2867", "2868", "2869"] },
    { step: 3, sourceIds: ["2870", "2871", "2872", "2873", "2874", "2875", "2876", "2877"] },
  ],
};

// ── Lesson 9 ──────────────────────────────────────────────────────────────────

export const lessonAgenteAngolo: Lesson = {
  id: "agente-angolo-fischietto",
  titleFa: "مأمور: دست‌های زاویه‌دار و سوتِ ممتد",
  titleIt: "BRACCIA AD ANGOLO RETTO · FISCHIETTO",
  minutes: 4,
  signs: [],
  figures: [386],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی مأموری که دست‌هایش را با زاویه‌ی قائمه گرفته به کدام جریان اجازه می‌دهد و کدام را نگه می‌دارد، و سوتِ ممتدِ او یعنی چه.",
      why:
        "۱۸ سؤال. در سؤال‌های زاویه‌ی قائمه، همه‌چیز به این بستگی دارد که «از سمتِ چپ»، «از سمتِ راست» یا «از پشتِ» مأمور می‌آیی؛ و این جهت‌ها از نگاهِ مأمورند، نه تو.",
    },
    {
      kind: "anatomy",
      title: "دست‌های زاویه‌دار: چه کسی می‌رود؟",
      scene: "agente-angolo",
      body: "یک دست به سمتِ چپِ مأمور دراز است و دستِ دیگر رو به جلو: دو دست با هم زاویه‌ی قائمه می‌سازند و مسیرِ جریانی را نشان می‌دهند که از سمتِ چپش می‌آید و به چپ می‌پیچد. روی هر خودرو بزن.",
      parts: [
        {
          id: "sinistra",
          nameIt: "A SINISTRA · VIA",
          nameFa: "سمتِ چپش: برو",
          text: "دستی که به سمتِ چپ دراز شده این جریان را صدا می‌کند. این خودروها رد می‌شوند: مستقیم، به راست، و به چپ؛ این ژست مخصوصاً برای همین پیچیدن به چپ است.",
        },
        {
          id: "destra",
          nameIt: "A DESTRA · ALT",
          nameFa: "سمتِ راستش: بایست",
          text: "این جریان روبه‌روی چپ‌گردهاست. مأمور نگهش می‌دارد تا آن‌ها بی‌خطر بپیچند: نه مستقیم، نه راست، نه چپ.",
        },
        {
          id: "spalle",
          nameIt: "ALLE SPALLE · ALT",
          nameFa: "پشتِ سرش: بایست",
          text: "از پشتِ مأمور رد نمی‌شوی: مستقیم ممنوع است، پیچیدن به راست هم.",
        },
        {
          id: "fronte",
          nameIt: "DI FRONTE · ?",
          nameFa: "روبه‌رویش: بانک نمی‌پرسد",
          text: "بانک درباره‌ی این جهت سؤالی ندارد و آیین‌نامه این ژست را فقط برای جریانِ چپ‌گرد توصیف می‌کند. اگر اینجا بودی، بی‌اشاره‌ی روشنِ مأمور حرکت نکن.",
        },
      ],
      takeaway: "دستِ کناری جریانِ «برو» را نشان می‌دهد (از سمتِ چپش). روبه‌روی آن جریان (سمتِ راستش) و پشتِ مأمور می‌ایستند.",
      rule: "DPR 495/1992 art. 181 c.1; Codice della Strada art. 43 c.3 lett. b",
    },
    {
      kind: "table",
      title: "سوتِ ممتد: همه بایستند",
      body: "سوتِ بلند و کشیده یعنی مأمور همه‌ی تقاطع را برای چند لحظه می‌بندد.",
      columns: ["قاعده"],
      rows: [
        {
          label: "معنی",
          it: "suono prolungato del fischietto",
          values: ["همه‌ی وسایلِ نقلیه، از هر جهت و سنگین یا سبک، که هنوز وارد تقاطع نشده‌اند، با رعایتِ ایمنی می‌ایستند. عابرها هم."],
        },
        { label: "چرا", it: "veicoli di soccorso in emergenza", values: ["برای اینکه آمبولانس، آتش‌نشانی یا پلیسِ در حالِ مأموریتِ فوری رد شوند."] },
        {
          label: "داخلِ تقاطعی",
          it: "chi ha impegnato l'incrocio",
          values: ["تقاطع را سریع خالی کن و اگر لازم است کمی بعد از آن بایست. برنگرد."],
        },
        { label: "دو سوتِ کوتاه", it: "due suoni brevi", values: ["یعنی ایست تمام شد و خودروهای ایستاده حرکت می‌کنند. سوتِ ممتد این معنی را ندارد."] },
      ],
      takeaway: "سوتِ ممتد = همه بایستند؛ داخلی‌ها بیرون بروند. دو سوتِ کوتاه = دوباره حرکت.",
      rule: "DPR 495/1992 art. 182 c.1",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "le braccia ad angolo retto", fa: "دست‌ها با زاویه‌ی قائمه" },
        { it: "i veicoli che arrivano dalla sua sinistra", fa: "خودروهایی که از سمتِ چپِ او می‌آیند" },
        { it: "dalle sue spalle", fa: "از پشتِ سرِ او" },
        { it: "vietare", fa: "ممنوع کردن" },
        { it: "il fischietto", fa: "سوت" },
        { it: "il suono prolungato", fa: "صدای کشیده؛ ممتد" },
        { it: "i veicoli di soccorso", fa: "خودروهای امدادی" },
        { it: "in condizioni di sicurezza", fa: "با رعایتِ ایمنی" },
      ],
    },
    {
      kind: "trap",
      title: "راست پیچیدن: از چپِ مأمور یا از راستش؟",
      body: "هر دو جمله درباره‌ی پیچیدن به راست با همین ژست است. فقط سمتِ آمدن فرق دارد:",
      examples: [
        {
          sourceId: "2882",
          figure: 386,
          textIt: "Il vigile disposto con le braccia ad angolo retto come in figura consente di svoltare a destra ai veicoli che arrivano dalla sua sinistra",
          answer: 1,
          chunks: [
            { it: ANGOLO, fa: ANGOLO_FA, verb: "disposto ← disporre" },
            { it: "consente di svoltare a destra", fa: "اجازه‌ی پیچیدن به راست را می‌دهد", verb: "consente ← consentire" },
            { it: "ai veicoli che arrivano dalla sua sinistra", fa: "به خودروهایی که از سمتِ چپِ او می‌آیند", verb: "arrivano ← arrivare" },
          ],
          translation: "مأموری که مثلِ تصویر دست‌هایش را با زاویه‌ی قائمه گرفته، به خودروهایی که از سمتِ چپِ او می‌آیند اجازه‌ی پیچیدن به راست را می‌دهد.",
          why: "درست است. سمتِ چپِ مأمور جریانِ «برو» است.",
        },
        {
          sourceId: "2883",
          figure: 386,
          textIt: "Il vigile disposto con le braccia ad angolo retto come in figura consente di svoltare a destra ai veicoli che arrivano dalla sua destra",
          answer: 0,
          chunks: [
            { it: ANGOLO, fa: ANGOLO_FA, verb: "disposto ← disporre" },
            { it: "consente di svoltare a destra", fa: "اجازه‌ی پیچیدن به راست را می‌دهد", verb: "consente ← consentire" },
            { it: "ai veicoli che arrivano dalla sua destra", fa: "به خودروهایی که از سمتِ راستِ او می‌آیند", verb: "arrivano ← arrivare", focus: "contrast" },
          ],
          translation: "مأموری که مثلِ تصویر دست‌هایش را با زاویه‌ی قائمه گرفته، به خودروهایی که از سمتِ راستِ او می‌آیند اجازه‌ی پیچیدن به راست را می‌دهد.",
          why: "غلط است. سمتِ راستِ مأمور روبه‌روی چپ‌گردهاست و متوقف می‌شود.",
        },
      ],
      takeaway: "در این ژست فقط «dalla sua sinistra» می‌رود. «dalla sua destra» و «dalle sue spalle» می‌ایستند.",
      rule: "DPR 495/1992 art. 181 c.1",
    },
  ],
  practice: [
    {
      sourceId: "2878",
      figure: 386,
      textIt: "Il vigile disposto con le braccia ad angolo retto come in figura consente la svolta a sinistra ai veicoli che arrivano dalla sua sinistra",
      answer: 1,
      chunks: [
        { it: ANGOLO, fa: ANGOLO_FA, verb: "disposto ← disporre" },
        { it: "consente la svolta a sinistra", fa: "اجازه‌ی پیچیدن به چپ را می‌دهد", verb: "consente ← consentire" },
        { it: "ai veicoli che arrivano dalla sua sinistra", fa: "به خودروهایی که از سمتِ چپِ او می‌آیند", verb: "arrivano ← arrivare" },
      ],
      translation: "مأموری که مثلِ تصویر دست‌هایش را با زاویه‌ی قائمه گرفته، به خودروهایی که از سمتِ چپِ او می‌آیند اجازه‌ی پیچیدن به چپ را می‌دهد.",
      why: "درست است (قدم ۱). این ژست برای همین ساخته شده: دست‌ها مسیرِ چپ‌گردِ جریانِ سمتِ چپ را نشان می‌دهند.",
      rule: "DPR 495/1992 art. 181 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2880",
      figure: 386,
      textIt: "Il vigile disposto con le braccia ad angolo retto come in figura vieta di proseguire diritto ai veicoli che gli vengono dalle sue spalle",
      answer: 1,
      chunks: [
        { it: ANGOLO, fa: ANGOLO_FA, verb: "disposto ← disporre" },
        { it: "vieta di proseguire diritto", fa: "مستقیم رفتن را ممنوع می‌کند", verb: "vieta ← vietare" },
        { it: "ai veicoli che gli vengono dalle sue spalle", fa: "برای خودروهایی که از پشتِ سرش می‌آیند", verb: "vengono ← venire" },
      ],
      translation: "مأموری که مثلِ تصویر دست‌هایش را با زاویه‌ی قائمه گرفته، مستقیم رفتن را برای خودروهایی که از پشتِ سرش می‌آیند ممنوع می‌کند.",
      why: "درست است (قدم ۱). پشتِ مأمور بسته است.",
      rule: "Codice della Strada art. 43 c.3 lett. b",
      conceptStep: 1,
    },
    {
      sourceId: "2885",
      figure: 386,
      textIt: "Il vigile disposto con le braccia ad angolo retto come in figura consente la svolta a sinistra ai veicoli che arrivano dalla sua destra",
      answer: 0,
      chunks: [
        { it: ANGOLO, fa: ANGOLO_FA, verb: "disposto ← disporre" },
        { it: "consente la svolta a sinistra", fa: "اجازه‌ی پیچیدن به چپ را می‌دهد", verb: "consente ← consentire" },
        { it: "ai veicoli che arrivano dalla sua destra", fa: "به خودروهایی که از سمتِ راستِ او می‌آیند", verb: "arrivano ← arrivare", focus: "contrast" },
      ],
      translation: "مأموری که مثلِ تصویر دست‌هایش را با زاویه‌ی قائمه گرفته، به خودروهایی که از سمتِ راستِ او می‌آیند اجازه‌ی پیچیدن به چپ را می‌دهد.",
      why: "غلط است (قدم ۱). جریانِ سمتِ راستِ مأمور متوقف است.",
      rule: "DPR 495/1992 art. 181 c.1",
      conceptStep: 1,
    },
    {
      sourceId: "2890",
      textIt: "Il suono prolungato del fischietto da parte dell'agente preposto al traffico impone a chi ha impegnato l'incrocio di liberarlo ed eventualmente di arrestarsi subito dopo",
      answer: 1,
      chunks: [
        { it: FISCHIETTO, fa: FISCHIETTO_FA },
        { it: "impone a chi ha impegnato l'incrocio", fa: "کسی را که وارد تقاطع شده مجبور می‌کند", verb: "impone ← imporre" },
        { it: "di liberarlo", fa: "که آن را خالی کند", verb: "liberarlo ← liberare" },
        { it: "ed eventualmente di arrestarsi subito dopo", fa: "و در صورتِ لزوم بلافاصله بعدش بایستد", focus: "condition" },
      ],
      translation: "سوتِ ممتدِ مأمورِ راهنمایی کسی را که وارد تقاطع شده مجبور می‌کند آن را خالی کند و در صورتِ لزوم بلافاصله بعدش بایستد.",
      why: "درست است (قدم ۲). داخلی‌ها بیرون می‌روند تا راهِ خودروی امدادی باز شود.",
      rule: "DPR 495/1992 art. 182 c.1",
      conceptStep: 2,
    },
    {
      sourceId: "2893",
      textIt: "Il suono prolungato del fischietto da parte dell'agente preposto al traffico serve per arrestare o deviare solo i veicoli che arrivano dalla sua destra",
      answer: 0,
      chunks: [
        { it: FISCHIETTO, fa: FISCHIETTO_FA },
        { it: "serve per arrestare o deviare", fa: "برای متوقف کردن یا منحرف کردن است", verb: "serve ← servire" },
        { it: "solo i veicoli che arrivano dalla sua destra", fa: "فقط خودروهایی که از سمتِ راستش می‌آیند", focus: "limit" },
      ],
      translation: "سوتِ ممتدِ مأمورِ راهنمایی فقط برای متوقف یا منحرف کردنِ خودروهایی است که از سمتِ راستش می‌آیند.",
      why: "غلط است (قدم ۲). سوتِ ممتد همه را متوقف می‌کند، از هر جهت.",
      rule: "DPR 495/1992 art. 182 c.1",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2878", "2879", "2880", "2881", "2882", "2883", "2884", "2885", "2886", "2887"] },
    { step: 2, sourceIds: ["2888", "2889", "2890", "2891", "2892", "2893", "2894", "2895"] },
  ],
};

// ── Lesson 10 ─────────────────────────────────────────────────────────────────

export const lessonAgentiDocumenti: Lesson = {
  id: "agenti-riconoscere-documenti",
  titleFa: "مأمور را بشناس و مدارک را نشان بده",
  titleIt: "AGENTI · DOCUMENTI DI GUIDA",
  minutes: 3,
  signs: [],
  steps: [
    {
      kind: "intro",
      title: "هدف این درس",
      objective:
        "بعد از این درس می‌دانی مأمورِ پلیسِ راه را از چه نشانه‌هایی می‌شناسی، و وقتی تو را متوقف می‌کند کدام مدارک را باید همراه داشته باشی و نشان بدهی و کدام‌ها را لازم نیست.",
      why:
        "۱۳ سؤال. بانک فهرستِ مدارک را با چیزهایی قاطی می‌کند که آشنا به نظر می‌رسند (سندِ مالکیت، کدِ مالیاتی، رسیدِ مالیاتِ خودرو) ولی لازم نیستند.",
    },
    {
      kind: "table",
      title: "مأمور را از کجا می‌شناسی",
      body: "دستورِ مأمور را بی‌درنگ اجرا می‌کنی؛ پس باید او را درست بشناسی.",
      columns: ["قاعده"],
      rows: [
        { label: "یونیفورم", it: "uniforme (divisa)", values: ["مأمورِ یونیفورم‌پوش را از لباسش می‌شناسی. او با دست، سوت یا چراغ هم دستورِ ایست می‌دهد."] },
        {
          label: "علامتِ مشخصه",
          it: "segnale distintivo · paletta",
          values: ["صفحه‌ی گردِ دسته‌دار («پالِتا»): وسطِ قرمز، حاشیه‌ی سفید. مأمورِ لباس‌شخصی اول آن را نشان می‌دهد و بعد کارتِ شناسایی‌اش را."],
        },
        { label: "چه نیست", it: "bianca e nera · guantoni", values: ["پالتای سفید و سیاه نیست. دستکش و نوارِ شبرنگ نشانه‌ی رسمیِ شناختنِ مأمور نیستند."] },
      ],
      takeaway: "یونیفورم، یا پالتای سفید و قرمز. نه سفید و سیاه، نه دستکش.",
      rule: "Codice della Strada art. 43 c.1, c.6; DPR 495/1992 art. 24 c.1–4",
    },
    {
      kind: "table",
      title: "چه چیزی را باید نشان بدهی",
      body: "وقتی مأمور می‌خواهد، این‌ها را باید همراهت داشته باشی و نشان بدهی:",
      columns: ["لازم است؟"],
      rows: [
        { label: "کارتِ خودرو", it: "carta di circolazione", values: ["بله."] },
        { label: "گواهی‌نامه", it: "patente di guida", values: ["بله، معتبر برای همان نوعِ خودرو."] },
        { label: "بیمه‌نامه", it: "certificato di assicurazione", values: ["بله، گواهیِ بیمه‌ی اجباری."] },
        {
          label: "مثلثِ خطر",
          it: "segnale mobile di pericolo",
          values: ["بانک می‌گوید بله. سند نیست، تجهیزاتِ اجباریِ خودرو است و باید در خودرو باشد؛ مأمور می‌تواند آن را ببیند."],
        },
        {
          label: "لازم نیست",
          it: "bollo · certificato di proprietà · codice fiscale · pronto soccorso",
          values: ["رسیدِ پرداختِ مالیاتِ خودرو (bollo)، سندِ مالکیت، کدِ مالیاتی و جعبه‌ی کمک‌های اولیه."],
        },
      ],
      takeaway: "سه سند (کارتِ خودرو، گواهی‌نامه، بیمه) به‌علاوه‌ی مثلث. بقیه لازم نیست.",
      rule: "Codice della Strada art. 180 c.1; art. 162 c.1",
    },
    {
      kind: "terms",
      title: "واژه‌های کلیدی این درس",
      terms: [
        { it: "esibire", fa: "نشان دادن (مدرک به مأمور)" },
        { it: "a richiesta degli agenti", fa: "به درخواستِ مأموران" },
        { it: "la carta di circolazione", fa: "کارتِ خودرو (سندِ ثبتِ خودرو)" },
        { it: "la patente di guida", fa: "گواهی‌نامه‌ی رانندگی" },
        { it: "il certificato di assicurazione", fa: "گواهیِ بیمه" },
        { it: "il segnale mobile di pericolo (triangolo)", fa: "مثلثِ خطر" },
        { it: "la divisa", fa: "یونیفورم" },
        { it: "la paletta", fa: "صفحه‌ی ایستِ پلیس (پالتا)" },
      ],
    },
    {
      kind: "trap",
      title: "پالتا: چه رنگی؟",
      body: "دو جمله با یک رنگِ متفاوت:",
      examples: [
        {
          sourceId: "2847",
          textIt: "Gli addetti a servizi di polizia stradale vengono riconosciuti dalla 'paletta' bianca e rossa",
          answer: 1,
          chunks: [
            { it: ADDETTI, fa: ADDETTI_FA, verb: "vengono riconosciuti ← riconoscere" },
            { it: "dalla 'paletta' bianca e rossa", fa: "از پالتای سفید و قرمز" },
          ],
          translation: "مأمورانِ پلیسِ راه از پالتای سفید و قرمز شناخته می‌شوند.",
          why: "درست است. علامتِ مشخصه وسطِ قرمز و حاشیه‌ی سفید دارد.",
        },
        {
          sourceId: "2849",
          textIt: "Gli addetti a servizi di polizia stradale vengono riconosciuti dalla 'paletta' bianca e nera",
          answer: 0,
          chunks: [
            { it: ADDETTI, fa: ADDETTI_FA, verb: "vengono riconosciuti ← riconoscere" },
            { it: "dalla 'paletta' bianca e nera", fa: "از پالتای سفید و سیاه", focus: "contrast" },
          ],
          translation: "مأمورانِ پلیسِ راه از پالتای سفید و سیاه شناخته می‌شوند.",
          why: "غلط است. پالتا سفید و قرمز است.",
        },
      ],
      takeaway: "پالتا = bianca e rossa. هر رنگِ دیگری غلط است.",
      rule: "DPR 495/1992 art. 24 c.1",
    },
  ],
  practice: [
    {
      sourceId: "2846",
      textIt: "Gli addetti a servizi di polizia stradale vengono riconosciuti dall'uniforme (divisa)",
      answer: 1,
      chunks: [
        { it: ADDETTI, fa: ADDETTI_FA, verb: "vengono riconosciuti ← riconoscere" },
        { it: "dall'uniforme (divisa)", fa: "از یونیفورم (لباسِ رسمی)" },
      ],
      translation: "مأمورانِ پلیسِ راه از یونیفورم (لباسِ رسمی) شناخته می‌شوند.",
      why: "درست است (قدم ۱). یونیفورم اولین نشانه است؛ بدونِ آن، پالتا.",
      rule: "DPR 495/1992 art. 24 c.4",
      conceptStep: 1,
    },
    {
      sourceId: "2850",
      textIt: "Gli addetti a servizi di polizia stradale vengono riconosciuti dai guantoni e dalle strisce rifrangenti",
      answer: 0,
      chunks: [
        { it: ADDETTI, fa: ADDETTI_FA, verb: "vengono riconosciuti ← riconoscere" },
        { it: "dai guantoni e dalle strisce rifrangenti", fa: "از دستکش‌های بزرگ و نوارهای شبرنگ", focus: "contrast" },
      ],
      translation: "مأمورانِ پلیسِ راه از دستکش‌های بزرگ و نوارهای شبرنگ شناخته می‌شوند.",
      why: "غلط است (قدم ۱). نشانه‌های رسمی یونیفورم و علامتِ مشخصه (پالتا) هستند.",
      rule: "DPR 495/1992 art. 24 c.1–4",
      conceptStep: 1,
    },
    {
      sourceId: "2840",
      textIt: "Chi guida autoveicoli o motocicli deve esibire, a richiesta degli agenti, il certificato di assicurazione del veicolo",
      answer: 1,
      chunks: [
        { it: ESIBIRE, fa: ESIBIRE_FA, verb: "deve ← dovere" },
        { it: "il certificato di assicurazione del veicolo", fa: "گواهیِ بیمه‌ی خودرو" },
      ],
      translation: "کسی که خودرو یا موتورسیکلت می‌راند باید، به درخواستِ مأموران، گواهیِ بیمه‌ی خودرو را نشان بدهد.",
      why: "درست است (قدم ۲). بیمه یکی از سه سندی است که همیشه همراهت است.",
      rule: "Codice della Strada art. 180 c.1 lett. d",
      conceptStep: 2,
    },
    {
      sourceId: "2845",
      textIt: "Chi guida autoveicoli o motocicli deve mostrare, a richiesta degli agenti, l'attestazione di pagamento della tassa di possesso (bollo)",
      answer: 0,
      chunks: [
        { it: MOSTRARE, fa: ESIBIRE_FA, verb: "deve ← dovere" },
        { it: "l'attestazione di pagamento della tassa di possesso (bollo)", fa: "رسیدِ پرداختِ مالیاتِ مالکیتِ خودرو (bollo)", focus: "contrast" },
      ],
      translation: "کسی که خودرو یا موتورسیکلت می‌راند باید، به درخواستِ مأموران، رسیدِ پرداختِ مالیاتِ مالکیتِ خودرو (bollo) را نشان بدهد.",
      why: "غلط است (قدم ۲). رسیدِ bollo جزوِ مدارکِ همراه نیست.",
      rule: "Codice della Strada art. 180 c.1",
      conceptStep: 2,
    },
    {
      sourceId: "2843",
      textIt: "Chi guida autoveicoli o motocicli deve esibire, a richiesta degli agenti, il certificato di proprietà",
      answer: 0,
      chunks: [
        { it: ESIBIRE, fa: ESIBIRE_FA, verb: "deve ← dovere" },
        { it: "il certificato di proprietà", fa: "سندِ مالکیت", focus: "contrast" },
      ],
      translation: "کسی که خودرو یا موتورسیکلت می‌راند باید، به درخواستِ مأموران، سندِ مالکیت را نشان بدهد.",
      why: "غلط است (قدم ۲). سندِ مالکیت در فهرستِ مدارکِ همراه نیست؛ کارتِ خودرو هست.",
      rule: "Codice della Strada art. 180 c.1",
      conceptStep: 2,
    },
  ],
  related: [
    { step: 1, sourceIds: ["2846", "2847", "2848", "2849", "2850"] },
    { step: 2, sourceIds: ["2838", "2839", "2840", "2841", "2842", "2843", "2844", "2845"] },
  ],
};
