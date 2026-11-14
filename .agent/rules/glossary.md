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

## Open conflicts (content not yet aligned)

Recorded 2026-11-14. Each one moves into «Never write» once the content is fixed.

- **attraversamento pedonale:** some lessons write «خط عابر پیاده», which is closer
  to *strisce pedonali*.
- **segnale raffigurato:** some lessons write «تابلوی تصویر».
