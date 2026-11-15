# PatenteFa — Persian glossary for lesson content

One Italian term gets one Persian headword, in every chapter. Chapters were written
one at a time with no shared list, and drifted: `ciclomotore` was «موپد» in
chapters 1, 2 and 7 and «موتور گازی» in 3 and 4, and learners reported it.
`autostrada` was «بزرگراه» in chapters 7, 8 and 11; in Iranian road classification
that is a lower class than «آزادراه», and the exam keeps the two apart.

## Rules

- **Use the headword below** for the term in `fa`, `translation`, `why`,
  `takeaway`, labels and values in `src/content/`.
- **A short gloss may follow it** the first time in a lesson, in parentheses or after
  «؛»: «خودرو (وسیله‌ی موتوری چهارچرخ یا بیشتر)». The headword itself never changes.
- **Ezafe marks (ـِ) and the zero-width non-joiner are not variants.** «خطِ عبور»
  and «خط عبور» are the same entry. Plurals keep the ZWNJ: «موتور گازی‌ها».
- **Translate from Italian, not through English.** A loanword from the English
  equivalent («موپد» from *moped*) is not Persian a learner can read.
- **A term that is not here:** check how `src/content/` already translates it
  (`grep -rn 'it: "<term>"' src/content`), then add a row here in the same change.
- **Never write** words are enforced by `tests/glossary.test.ts` over
  `src/content/`. Separate several with «،».

## Vehicles

| Italiano | فارسی | Never write |
|---|---|---|
| ciclomotore | موتور گازی | موپد |
| motociclo | موتورسیکلت | |
| quadriciclo (leggero) | چهارچرخ موتوری (سبک) | |
| autovettura | سواری | |
| autocarro | کامیون | |
| autobus | اتوبوس | |
| filobus | اتوبوس برقی | |
| velocipede, bicicletta | دوچرخه | |
| veicolo a motore | وسیله‌ی موتوری | |
| autoveicolo | خودرو | |
| rimorchio | یدک | |
| semirimorchio | نیم‌یدک | |
| autocaravan | کمپر | |

## Roads and road parts

| Italiano | فارسی | Never write |
|---|---|---|
| autostrada | آزادراه | بزرگراه |
| strada extraurbana principale | جاده‌ی برون‌شهری اصلی | |
| centro abitato | آبادی | |
| carreggiata | سواره‌رو | |
| corsia | خط عبور | |
| banchina | شانه‌ی جاده | |
| marciapiede | پیاده‌رو | |
| incrocio, intersezione | تقاطع | |
| passaggio a livello | گذرگاه راه‌آهن | |
| attraversamento pedonale | گذرگاه عابر پیاده | |
| strisce pedonali | خط‌کشی عابر پیاده | |
| isola di traffico | جزیره‌ی ترافیکی | |
| salvagente | سکوی پناه عابر | |
| pista ciclabile | مسیر ویژه‌ی دوچرخه | |
| senso unico | یک‌طرفه | |

## Distance and braking

| Italiano | فارسی | Never write |
|---|---|---|
| distanza di sicurezza | فاصله‌ی ایمنی | |
| tempo di reazione | زمانِ واکنش | |
| spazio di frenatura | مسافتِ ترمز | |
| spazio (totale) di arresto | کل مسافتِ توقف | |
| corsia di emergenza | خطِ اضطراری | |
| galleria | تونل | |

## Actions and signs

| Italiano | فارسی | Never write |
|---|---|---|
| sosta | پارک | |
| fermata | توقف کوتاه | |
| arrestarsi | ایستادن کامل | |
| sorpasso | سبقت | |
| precedenza | حق تقدم | |
| segnale raffigurato | تابلوی نشان‌داده‌شده | |
| pannello integrativo | پنل تکمیلی | |

## Manoeuvres, lights and equipment (chapter 13)

| Italiano | فارسی | Never write |
|---|---|---|
| marcia per file parallele | حرکت در ردیف‌های موازی | |
| inversione di marcia (del senso di marcia) | دور زدن | |
| retromarcia | دنده‌عقب | |
| corsia di preselezione | خطِ عبورِ انتخابِ جهت | |
| immettersi nel flusso della circolazione | واردِ جریانِ ترافیک شدن | |
| margine destro della carreggiata | لبه‌ی راستِ سواره‌رو | |
| passo carrabile | ورودیِ خودرو به ملک | |
| proprietà privata | ملکِ خصوصی | |
| pericolo o intralcio | خطر یا مزاحمت | |
| dosso | برآمدگی | |
| rotatoria | میدان | |
| autotreno | کامیون با یدک | |
| corteo | دسته‌ی راهپیمایی | |
| indicatore di direzione | چراغ راهنما | |
| segnalazione luminosa di pericolo | چراغِ خطر (چهار راهنما با هم) | |
| proiettori abbaglianti | نورِ بالا | |
| proiettori anabbaglianti | نورِ پایین | |
| clacson, avvisatore acustico | بوق | |
| specchio retrovisore | آینه | |
| specchio retrovisore centrale | آینه‌ی وسط | |
| specchio retrovisore laterale sinistro | آینه‌ی بغلِ چپ | |
| angolo cieco | نقطه‌ی کور | |
| carico | بار | |
| carta di circolazione | کارتِ خودرو | کارت ماشین |
| linea di mezzeria | خطِ وسط | |
| striscia discontinua, tratteggiata | خط‌چین | |

## Junctions (chapter 14)

`incrocio` / `intersezione` = تقاطع, `precedenza` = حق تقدم and `filobus` = اتوبوس برقی follow the rows above.

| Italiano | فارسی | Never write |
|---|---|---|
| tram, veicolo su rotaie | تراموا، وسیله‌ی ریلی | |
| centro dell'incrocio | مرکزِ تقاطع | |
| svoltare a sinistra / a destra | به چپ / به راست پیچیدن | |
| impegnare l'incrocio | وارد تقاطع شدن | |
| disimpegnare l'incrocio | از تقاطع بیرون رفتن | |
| avere la destra libera / occupata | راستِ خالی / اشغال داشتن | |
| stallo (everyone has someone on the right) | گره | |

## Lights and dashboard (chapter 18)

| Italiano | فارسی | Never write |
|---|---|---|
| luci di posizione | چراغ‌های موقعیت | |
| luci di marcia diurna | چراغِ روز | |
| proiettori di profondità | نورِ بالا | |
| luce posteriore per nebbia | چراغِ مهِ عقب | |
| proiettori fendinebbia anteriori | چراغِ مهِ جلو | |
| luci di sosta | چراغِ پارک | |
| luce della targa | چراغِ پلاک | |
| catadiottro | شبرنگ | |
| abbagliare | چشم زدن (با نور) | |
| uso intermittente (lampeggio) | چشمک زدن با نورِ بالا | |
| spia | چراغِ نشانگر | |
| segnale mobile di pericolo | مثلثِ خطر | |
| liquido di raffreddamento | مایعِ خنک‌کننده | |
| alternatore, generatore di corrente | دینام | |
| impianto frenante | سیستمِ ترمز | |
| guarnizioni dei freni | لنتِ ترمز | |
| cinture di sicurezza | کمربندِ ایمنی | |
## Overtaking (chapter 15)

| Italiano | فارسی | Never write |
|---|---|---|
| tram | تراموا | |
| sede riservata | مسیرِ جدا | |
| corsia riservata | خطِ ویژه | |
| corsia di accelerazione | خطِ شتاب | |
| corsia di decelerazione | خطِ کاهشِ سرعت | |
| corsia di sorpasso | خطِ سبقت | |
| in servizio di emergenza | در مأموریتِ اضطراری | |
| veicolo a trazione animale | گاری | |
| piazzola di sosta | پارکینگِ کوچکِ کنارِ راه | |

## Stopping and parking (chapter 16)

`sosta` = پارک and `fermata` = توقف کوتاه follow the rows above. The chapter also uses the headwords
chapters 13 and 18 adopt: `passo carrabile` = ورودیِ خودرو به ملک, `dosso` = برآمدگی,
`indicatore di direzione` = چراغ راهنما, `specchio retrovisore` = آینه, `luci di posizione` = چراغ‌های موقعیت.

| Italiano | فارسی | Never write |
|---|---|---|
| arresto | ایستادن به خاطرِ ترافیک | |
| sosta di emergenza | توقفِ اضطراری | |
| disco orario | دیسکِ ساعت | |
| parchimetro | پارکومتر | |
| stallo (di sosta) | جای پارکِ خط‌کشی‌شده | |
| in seconda fila, in doppia fila | در ردیفِ دوم (دوبل) | |
| marciapiede rialzato | پیاده‌روی بلند | |
| area pedonale urbana | منطقه‌ی عابرِ پیاده | |
| zona a traffico limitato (ZTL) | منطقه‌ی تردد محدود | |
| scivolo (per persone invalide) | سرازیریِ پیاده‌رو | |
| distributore di carburante | پمپ‌بنزین | |
| cassonetto dei rifiuti | سطلِ زباله‌ی شهری | |
| freno di stazionamento, freno a mano | ترمزِ دستی | |
| portiera, sportello | درِ خودرو | |
| sottrazione / decurtazione dei punti | کم شدنِ امتیازِ گواهینامه | |

## Motorways, load and towing (chapter 17)

| Italiano | فارسی | Never write |
|---|---|---|
| segnale mobile triangolare di pericolo (triangolo) | مثلثِ خطر | |
| giubbotto o bretelle ad alta visibilità | جلیقه‌ی شب‌نما · بندهای بازتابنده | |
| ingombro della carreggiata | بسته شدنِ سواره‌رو | |
| area di servizio | محوطه‌ی خدمات آزادراه | |
| sporgenza del carico | بیرون‌زدگیِ بار | |
| pannello (retroriflettente) | پنلِ (بازتابنده) | |
| merci pericolose | کالای خطرناک | |
| traino (di un veicolo in avaria) | یدک کشیدن | |
| motrice | خودروی کشنده | |
| gancio di traino | قلابِ یدک‌کش | |
| freno a inerzia | ترمزِ اینرسی | |
| caravan (roulotte) | کاروان | |
| fuoristrada (Suv) | شاسی‌بلند | |
| ciclomotorista | موتور گازی‌سوار | |

## Belts, helmets and protective gear (chapter 19)

`cinture di sicurezza` = کمربندِ ایمنی, `spia` = چراغِ نشانگر, `quadriciclo` = چهارچرخ موتوری and
`decurtazione dei punti` = کم شدنِ امتیازِ گواهینامه follow the rows above. «کیسه‌ی هوا», «پشت‌سری»,
«کلاه ایمنی» and «تأییدشده» were already the words chapters 13, 16 and 17 used.

| Italiano | فارسی | Never write |
|---|---|---|
| airbag | کیسه‌ی هوا | |
| poggiatesta | پشت‌سری | |
| colpo di frusta | ضربه‌ی شلاقیِ گردن | |
| arrotolatore (della cintura) | جمع‌کنِ کمربند | |
| omologato | تأییدشده | |
| istruttore di guida | مربیِ رانندگی | |
| foglio rosa (autorizzazione ad esercitarsi alla guida) | مجوزِ تمرینِ رانندگی | |
| sistema di ritenuta per bambini | سیستمِ نگه‌دارنده‌ی کودک | |
| seggiolino (per bambini) | صندلیِ کودک | |
| rivolto all'indietro (schienale verso la strada) | رو به عقب | |
| casco (protettivo) | کلاه ایمنی | |
| casco integrale | کلاه ایمنیِ تمام‌صورت | |
| calotta (esterna) | پوسته‌ی کلاه | |
| calotta interna, imbottitura (EPS) | لایه‌ی فوم | |
| visiera | طلقِ کلاه | |
| cinturino | بندِ زیرِ چانه | |
| carrozzeria (chiusa) | بدنه (ی بسته) | |
| cellula di sicurezza | اتاقکِ ایمنی | |
| quadriciclo privo di carrozzeria (Quad) | کوادِ بی‌بدنه | |
| stivali / guanti / giacca ad uso motociclistico | چکمه / دستکش / کاپشنِ موتورسواری | |
| abrasione | سایش | |
| inserti rigidi protettivi | محافظ‌های سخت | |

## Licence, points and documents (chapter 20)

`carta di circolazione` = کارتِ خودرو, `decurtazione dei punti` = کم شدنِ امتیازِ گواهینامه,
`sospensione della patente` = تعلیقِ گواهینامه (chapter 16), `passo carrabile` = ورودیِ خودرو به ملک,
`quadriciclo (leggero)` = چهارچرخ موتوری (سبک), `rimorchio` = یدک, `autocaravan` = کمپر and
`autotreno` = کامیون با یدک follow the rows above. «گواهینامه», «سندِ مالکیت», «سه‌چرخ موتوری» and
«مالیاتِ مالکیتِ خودرو (bollo)» were already the words chapters 1, 11, 16 and 17 used.

| Italiano | فارسی | Never write |
|---|---|---|
| patente (di guida) | گواهینامه | |
| categoria (della patente) | ردیفِ گواهینامه | |
| neopatentato | راننده‌ی تازه‌کار | |
| punti, punteggio (della patente) | امتیاز (گواهینامه) | |
| patente a punti | گواهینامه‌ی امتیازی | |
| ritiro della patente | گرفتنِ گواهینامه (توسطِ پلیس) | |
| revisione della patente | بازآزماییِ گواهینامه | معاینه‌ی فنیِ گواهینامه |
| revoca della patente | ابطالِ گواهینامه | |
| conferma di validità, rinnovo | تمدیدِ گواهینامه | |
| requisiti fisici e psichici | شرایطِ جسمی و روانی | |
| requisiti morali | شرایطِ اخلاقی | |
| prefetto | فرماندار (Prefetto) | |
| Ufficio Motorizzazione civile | اداره‌ی موتوریتزاتسیونه (Motorizzazione) | |
| esame di idoneità tecnica | آزمونِ مهارت | |
| assicurazione per la responsabilità civile (RCA) | بیمه‌ی شخص ثالث | |
| polizza kasko | بیمه‌ی بدنه | |
| immatricolato | شماره‌گذاری‌شده | |
| targa | پلاک | |
| targa prova | پلاکِ آزمایشی | |
| massa massima autorizzata | حداکثر وزنِ مجاز | |
| rimorchio leggero | یدکِ سبک (تا ۷۵۰ کیلو) | |
| complesso veicolare | مجموعه‌ی خودرو و یدک | |
| codice armonizzato 96 | کدِ ۹۶ | |
| triciclo a motore | سه‌چرخ موتوری | |
| cilindrata | حجمِ موتور | |
| accesso graduale / diretto | راهِ پله‌ای / راهِ مستقیم | |
| macchine agricole | ماشین‌آلاتِ کشاورزی | |
| macchine operatrici | ماشین‌آلاتِ عملیاتی (راهسازی) | |
| carrozzetta | سایدکار | |

`revisione` of a *vehicle* stays «معاینه‌ی فنی» (chapter 20 L8); a *licence* revisione is «بازآزمایی»,
so the two never share a word.

## Accidents, bad weather and tunnels (chapter 21)

`segnale mobile di pericolo` = مثلثِ خطر, `segnalazione luminosa di pericolo` = چراغِ خطر (چهار راهنما با هم),
`proiettori fendinebbia anteriori` = چراغِ مهِ جلو, `luce posteriore per nebbia` = چراغِ مهِ عقب,
`distanza di sicurezza` = فاصله‌ی ایمنی, `strettoia` = باریکه, `cilindrata` = حجمِ موتور and
`freno di stazionamento` = ترمزِ دستی follow the rows above. «سطحِ جاده», «لاستیکِ زمستانی», «آجِ لاستیک»,
«مهِ غلیظ», «دنده خلاص» and «کلاچ» were already the words chapters 2, 4, 11, 16 and 17 used.

| Italiano | فارسی | Never write |
|---|---|---|
| incidente stradale | تصادف | |
| tamponamento | تصادف از پشت | |
| conducente coinvolto | راننده‌ی درگیر در تصادف | |
| prestare assistenza | کمک رساندن | |
| generalità | مشخصاتِ هویتی | |
| tracce (dell'incidente) | آثارِ تصادف | |
| modulo CAI (constatazione amichevole) | فرمِ توافقیِ تصادف (CAI) | |
| denuncia all'assicurazione | اعلامِ تصادف به بیمه | |
| aquaplaning | آکواپلنینگ | |
| aderenza | چسبندگی (لاستیک به جاده) | |
| battistrada | آجِ لاستیک | |
| sbandamento | لیز خوردن به پهلو | |
| pneumatici invernali | لاستیکِ زمستانی | |
| catene (da neve) | زنجیرِ چرخ | |
| ruote motrici | چرخ‌های محرک | |
| infossamento | گیر کردن (در برف یا شن) | |
| doppia trazione | چهارچرخ‌محرک | |
| marce basse | دنده‌های سنگین | |
| zone in ombra | جاهای سایه‌گیر | |
| nebbia fitta | مهِ غلیظ | |
| servosterzo | فرمانِ کمکی (هیدرولیک یا برقی) | |
| centralina | واحدِ کنترلِ موتور (ECU) | |
| traforo | تونلِ کوهستانی | |
| via di fuga | راهِ فرار | |
| uscita di emergenza | خروجیِ اضطراری | |
| porta tagliafuoco | درِ ضدِ آتش | |
| estintore | کپسولِ آتش‌نشانی | |
| vigili del fuoco | آتش‌نشان‌ها | |

## Alcohol, drugs and first aid (chapter 22)

`piazzola di sosta` = پارکینگِ کوچکِ کنارِ راه, `codice armonizzato` = کدِ … (chapter 20), `incidente stradale` = تصادف,
`prestare assistenza` = کمک رساندن and `tamponamento` = تصادف از پشت follow the rows above. «زخمی» (ferito) and
«کمک‌های اولیه» were already the words chapter 21 used; «مستی» and «الکلِ خون» were chapters 17 and 20's.

| Italiano | فارسی | Never write |
|---|---|---|
| stato di ebbrezza | حالتِ مستی | |
| tasso alcolemico, concentrazione di alcool nel sangue | الکلِ خون | |
| idoneità alla guida | آمادگی برای رانندگی | |
| arresto (pena, art. 186) | حبس | |
| sostanze stupefacenti | مواد مخدر | |
| sostanze psicotrope | مواد روان‌گردان | |
| farmaci sedativi | داروهای آرام‌بخش | |
| foglio illustrativo | برگه‌ی راهنمای دارو | |
| occhiali da vista | عینکِ طبی | |
| lenti a contatto | لنزِ تماسی | |
| primo soccorso | کمک‌های اولیه | |
| soccorritore | کمک‌رسان | |
| ferito (della strada) | زخمی (ی تصادف) | |
| infortunato | مصدوم | |
| stato di incoscienza | بیهوشی (جواب ندادن) | |
| emorragia | خونریزی | |
| tamponare (una ferita) | روی زخم فشار دادن | |
| corpo estraneo | جسمِ خارجی | |
| stato di shock | شوک | |
| gabbia toracica | قفسه‌ی سینه | |
| colonna vertebrale | ستونِ مهره‌ها | |
| fratture agli arti | شکستگیِ دست و پا | |
| ustione, bruciatura | سوختگی | |
| posizione semiseduta | نیمه‌نشسته | |

`arresto` now has two senses kept apart: the traffic stop of chapter 16 (ایستادن به خاطرِ ترافیک) and the penalty
of art. 186 (حبس). The lessons say which one a statement means. `tamponare` a wound (روی زخم فشار دادن) is not
`tamponamento` (تصادف از پشت); chapter 22 L7 says so in the text. `soccorritore` is whoever helps, usually untrained;
«امدادگر» stays for the professional responders chapter 21 names.

## Liability, insurance and traffic psychology (chapter 23)

`assicurazione per la responsabilità civile (RCA)` = بیمه‌ی شخص ثالث, `polizza kasko` = بیمه‌ی بدنه,
`incidente stradale` = تصادف, `modulo CAI` = فرمِ توافقیِ تصادف (CAI), `sospensione / revisione / revoca della patente`
(chapter 20), `stato di ebbrezza` = حالتِ مستی, `viva voce` = بلندگو (هندزفری), `auricolare` = هدفون (chapter 20) and
`specchio retrovisore` = آینه follow the rows above. «حواس‌پرتی» (distrazione), «تلفنِ همراه» and «جریمه‌ی اداری»
(sanzione amministrativa) were already the words chapters 13, 16 and 20 used; «قانونِ جزا» and «جرم» were chapters 21–22's.

| Italiano | فارسی | Never write |
|---|---|---|
| sinistro (stradale) | تصادف | |
| responsabilità civile | مسئولیتِ مدنی | |
| responsabilità penale | مسئولیتِ کیفری | |
| responsabilità amministrativa | مسئولیتِ اداری | |
| reato | جرم | |
| pena | مجازات | |
| risarcimento (del danno) | جبرانِ خسارت | |
| danneggiato | زیان‌دیده | |
| danni alle persone / alle cose | خسارتِ جانی / خسارتِ مالی | |
| lesioni personali (gravi, gravissime) | صدمه‌ی بدنی (شدید، بسیار شدید) | |
| omicidio colposo, omicidio stradale | قتلِ غیرعمد (در رانندگی) | |
| colpa | تقصیر | |
| forza maggiore | قوه‌ی قاهره | |
| querela | شکایتِ زیان‌دیده | |
| arresto (preventivo) | بازداشت | |
| proprietario del veicolo | مالکِ خودرو | |
| contro la volontà (del proprietario) | بدونِ رضایتِ (مالک) | |
| consulente d'infortunistica stradale | کارشناسِ تصادفات | |
| impresa di assicurazione, impresa assicuratrice | شرکتِ بیمه | |
| polizza | بیمه‌نامه | |
| premio (assicurativo) | حقِ بیمه | |
| massimale | سقفِ تعهد | |
| franchigia | فرانشیز | |
| rivalsa | حقِ رجوعِ بیمه | |
| bonus malus | بونوس‌مالوس | |
| classe di merito | طبقه‌ی سابقه | |
| certificato di assicurazione | گواهیِ بیمه | |
| contrassegno (assicurativo) | برچسبِ بیمه | |
| terzi / terzi trasportati | شخصِ ثالث / سرنشین‌ها | |
| risarcimento diretto | جبرانِ مستقیم | |
| Fondo di garanzia per le vittime della strada | صندوقِ تضمینِ قربانیانِ جاده | |
| veicolo non identificato / non assicurato | خودروی ناشناس / خودروی بی‌بیمه | |
| furto, incendio | سرقت، آتش‌سوزی | |
| confisca / sequestro (del veicolo) | مصادره / توقیف | |
| attenzione | توجه | |
| percezione del pericolo | تشخیصِ خطر | |
| ansia | اضطراب | |
| navigatore satellitare | مسیریاب | |
| sopravvalutare / sottostimare | دست‌بالا گرفتن / دست‌کم گرفتن | |

`arresto` now has three senses kept apart: the traffic stop of chapter 16 (ایستادن به خاطرِ ترافیک), the art. 186
penalty of chapter 22 (حبس), and arrest before trial in chapter 23 (بازداشت); chapter 23 L1 says so. `sinistro` as
«تصادف» is never «چپ»; chapter 23 L1 explains the double meaning. «مسئولیتِ مدنی» names the liability, «بیمه‌ی شخص
ثالث» the policy that pays it: the two are not used for each other. `franchigia` keeps the Iranian insurance word
«فرانشیز» because no plain Persian word is in use.

## Open conflicts (content not yet aligned)

Recorded 2026-11-14. Each one moves into «Never write» once the content is fixed.

- **attraversamento pedonale:** some lessons write «خط عابر پیاده», which is closer
  to *strisce pedonali*.
- **segnale raffigurato:** some lessons write «تابلوی تصویر».
- **tamponamento:** headword «تصادف از پشت» since chapter 21 (chapters 10, 17 and 21 already use it). Chapter 12
  L3 still writes «زدن به عقبِ خودروی جلو»; left unchanged by the chapter 21 work.
- **servosterzo:** headword «فرمانِ کمکی (هیدرولیک یا برقی)» (chapters 11 and 21); chapter 17 writes
  «فرمانِ هیدرولیک (کمکی)».
- **segnalazione luminosa di pericolo:** chapter 18 writes «چراغِ خطر (چهار راهنما با هم)»; chapter 11 L5 and
  chapter 15 L4 write «فلاشر». Align them, then add «فلاشر» to Never write.
- **dosso:** chapter 15 (L2, L6) writes «قله‌ی سربالایی»; the chapter 13 work in progress uses «برآمدگی». In
  overtaking, a dosso is a blind crest, not a speed bump, and «برآمدگی» alone reads as the bump. Pick one.
