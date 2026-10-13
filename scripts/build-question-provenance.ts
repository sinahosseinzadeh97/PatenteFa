/** Build the immutable, server-only provenance index. Never changes exam data. */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const commit = '512dd5d2193d5ca805fbd4c0a9789d9670207dfe';
const path = process.argv[2] || 'data/quizPatenteB2023.json';
const text = readFileSync(path, 'utf8');
if (createHash('sha256').update(text).digest('hex') !== 'b556f1806fb6dfaeb83dcecba62799f293cd83ad2de56c0f10fd31b78861995d') {
  throw new Error('Source bytes do not match the pinned upstream commit; source line links would be untrustworthy.');
}
const bank = JSON.parse(text) as Record<string, Record<string, { q: string; a: boolean; img?: string }[]>>;
const local = JSON.parse(readFileSync('data/quizPatenteB2023.json', 'utf8'));
if (JSON.stringify(local) !== JSON.stringify(bank)) throw new Error('Pinned source differs from the imported bank; review the mapping first.');
const lines = text.split('\n');
const questionLines = lines.flatMap((line, i) => /^\s*"q":/.test(line) ? [i + 1] : []);
let group = 0;
const entries: [string, number, string | null, number, number][] = [];
for (const subtopics of Object.values(bank)) for (const questions of Object.values(subtopics)) {
  group++;
  for (const q of questions) entries.push([q.q.trim(), q.a ? 1 : 0, q.img?.split('/').pop() || null, group, questionLines[entries.length]]);
}
if (entries.length !== 7139 || entries.some(e => !e[4])) throw new Error('Unexpected bank shape or missing source lines.');
const header = { commit, file: 'quizPatenteB2023.json', sha256: createHash('sha256').update(text).digest('hex'), questionCount: entries.length };
writeFileSync('src/content/question-provenance.json', JSON.stringify(header).slice(0, -1) + ',"entries":[\n' + entries.map(e => JSON.stringify(e)).join(',\n') + '\n]}\n');
console.log(`Indexed ${entries.length} exact questions in ${group} source groups.`);
