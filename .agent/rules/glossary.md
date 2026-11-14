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

## Open conflicts (content not yet aligned)

Recorded 2026-11-14. Each one moves into «Never write» once the content is fixed.

- **attraversamento pedonale:** some lessons write «خط عابر پیاده», which is closer
  to *strisce pedonali*.
- **segnale raffigurato:** some lessons write «تابلوی تصویر».
- **tamponamento:** chapter 12 L3 writes «زدن به عقبِ خودروی جلو», chapter 10's review «تصادف از پشت». Pick one.
- **segnalazione luminosa di pericolo:** chapter 18 writes «چراغِ خطر (چهار راهنما با هم)»; chapter 11 L5 and
  chapter 15 L4 write «فلاشر». Align them, then add «فلاشر» to Never write.
- **dosso:** chapter 15 (L2, L6) writes «قله‌ی سربالایی»; the chapter 13 work in progress uses «برآمدگی». In
  overtaking, a dosso is a blind crest, not a speed bump, and «برآمدگی» alone reads as the bump. Pick one.
