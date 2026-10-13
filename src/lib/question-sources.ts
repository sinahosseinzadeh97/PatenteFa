import bank from '../content/question-provenance.json';

export interface SourceQuestion { source_id: string | null; text_it: string; correct_answer: number; image_url: string | null }
export interface Citation { title: string; reference: string; url: string | null }
export interface QuestionSource extends Citation { official: Citation | null; note: string }
export interface Evidence { sourceId: string; textIt: string; correctAnswer: 1 }
type Entry = [string, number, string | null, number, number];
const entries = bank.entries as Entry[];
const imageKey = (image: string | null) => image?.split('/').pop() || null;

function matchedEntry(q: SourceQuestion): Entry | null {
  if (!q.source_id || !/^[1-9]\d*$/.test(q.source_id)) return null;
  const entry = entries[Number(q.source_id) - 1];
  return entry && entry[0] === q.text_it.trim() && entry[1] === q.correct_answer && entry[2] === imageKey(q.image_url) ? entry : null;
}

export const OFFICIAL_REVISION = 'https://www.ilportaledellautomobilista.it/documents/56611/57321/Domande%2BRevisione%2BAB%2Bitaliano%2B04%2B04%2B2025/37af530b-c893-4d69-ba4a-a94fc4622fe6?version=1.0';
export const OFFICIAL_LIST = 'https://www.ilportaledellautomobilista.it/gms/dettaglionormativa.downloadallegato_1%3Adownload/210779/Circ.%24002019281%240020del%24002005.07.24%240020All.%240020LISTATO_definitivo%240020in%240020pdf.pdf';
const corrections: Record<string, { translatedText: string; explanation: string; citation: Citation }> = {
  '7114': {
    translatedText: 'برای آسان‌تر خاموش‌کردن موتور، وسایل نقلیهٔ موتوری دوچرخ به کلید قطع اضطراری مجهز هستند که با فشار پای راست فعال می‌شود.',
    explanation: 'بخش غلط جمله «با فشار پای راست» است. کلید قطع اضطراری موتور وجود دارد و روی فرمان قرار دارد؛ با آن می‌توان موتور را بدون برداشتن دست‌ها از فرمان خاموش کرد. پس وجود کلید درست است، اما روش فعال‌کردنی که سؤال گفته نادرست است.',
    citation: { title: 'بانک رسمی وزارت حمل‌ونقل ایتالیا — بازبینی A/B، ۲۰۲۵', reference: 'صفحهٔ ۱۲۹؛ سؤال‌های 25419، 25421 و 25429', url: OFFICIAL_REVISION + '#page=129' },
  },
  '1461': {
    translatedText: 'در محل این تابلو، عبور خودروهای سواری متان‌سوز مجاز است.',
    explanation: 'این تابلو عبور خودروهای حامل مواد منفجره یا مواد به‌آسانی قابل‌اشتعال را ممنوع می‌کند. سوختی که برای حرکت خود خودرو در مخزن آن قرار دارد، مشمول این ممنوعیت نیست. بنابراین متان‌سوز بودنِ خودروی سواری به‌تنهایی مانع عبور آن نیست.',
    citation: { title: 'بانک رسمی وزارت حمل‌ونقل ایتالیا — A/B، ۲۰۲۴', reference: 'صفحهٔ ۵۶؛ گروه 03023، گزاره‌های V02، V03 و V04', url: OFFICIAL_LIST + '#page=56' },
  },
  '5723': {
    translatedText: 'وقتی در سرازیری تند تریلر می‌کشید، لازم نیست نیروی فشاری تریلر بر خودروی کشنده را در نظر بگیرید.',
    explanation: 'عبارت «لازم نیست در نظر بگیرید» غلط است. هنگام یدک‌کشیدن در سرازیری تند، باید نیرویی را که تریلر به خودروی کشنده وارد می‌کند در نظر گرفت. motrice در این جمله یعنی خودروی کشنده و rimorchio یعنی تریلر یا یدک.',
    citation: { title: 'بانک رسمی وزارت حمل‌ونقل ایتالیا — بازبینی A/B، ۲۰۲۵', reference: 'صفحهٔ ۱۰۹؛ سؤال 24117، گزارهٔ مثبتِ مرتبط', url: OFFICIAL_REVISION + '#page=109' },
  },
};

export function reviewedContent(q: SourceQuestion) {
  return matchedEntry(q) ? corrections[q.source_id!] ?? null : null;
}

export function sourceKey(q: SourceQuestion): string | null {
  return matchedEntry(q) ? `${bank.sha256}:${q.source_id}` : null;
}

export function getQuestionSource(q: SourceQuestion, allowAnswerLinks = true): QuestionSource {
  const entry = matchedEntry(q);
  const correction = reviewedContent(q);
  return {
    title: entry ? 'بانک QuizPatenteB — نسخهٔ ۲۰۲۳' : 'منبع این سؤال نیاز به بررسی دارد',
    reference: entry ? `شناسهٔ بانک برنامه: ${q.source_id}` : '',
    url: entry && allowAnswerLinks ? `https://github.com/Ed0ardo/QuizPatenteB/blob/${bank.commit}/${bank.file}#L${entry[4]}` : null,
    official: correction ? { ...correction.citation, url: allowAnswerLinks ? correction.citation.url : null } : null,
    note: entry ? 'بانک واردشده مربوط به ۲۰۲۳ است؛ تطبیق همهٔ سؤال‌ها با آخرین فهرست رسمی هنوز کامل نشده است.' : '',
  };
}

/** Only true statements in the exact original subtopic/image are evidence. */
export function getQuestionEvidence(q: SourceQuestion): Evidence[] {
  const entry = matchedEntry(q);
  if (!entry) return [];
  const words = new Set(q.text_it.toLowerCase().match(/[\p{L}]{4,}/gu) || []);
  return entries.flatMap((e, i) => e[3] === entry[3] && e[1] === 1 && e[2] === entry[2]
    ? [{ sourceId: String(i + 1), textIt: e[0], correctAnswer: 1 as const }] : [])
    .sort((a, b) => score(b.textIt) - score(a.textIt)).slice(0, 16);
  function score(text: string) { return (text.toLowerCase().match(/[\p{L}]{4,}/gu) || []).filter(w => words.has(w)).length; }
}
