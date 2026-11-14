import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, readdirSync } from 'node:fs';

// Third column of each glossary table row: words lesson content must never use.
function neverWrite(): string[] {
  const md = readFileSync('.agent/rules/glossary.md', 'utf8');
  return md.split('\n')
    .map((line) => line.split('|').map((cell) => cell.trim()))
    .filter((cells) => cells.length === 5 && cells[1] !== 'Italiano' && !cells[1].startsWith('---'))
    .flatMap((cells) => cells[3].split('،').map((w) => w.trim()).filter(Boolean));
}

test('lesson content never uses a word the glossary bans', () => {
  const banned = neverWrite();
  assert.ok(banned.includes('موپد'), 'glossary table did not parse');
  for (const file of readdirSync('src/content').filter((f) => f.endsWith('.ts'))) {
    const src = readFileSync(`src/content/${file}`, 'utf8');
    for (const word of banned) assert.ok(!src.includes(word), `${file} uses «${word}»; see .agent/rules/glossary.md`);
  }
});
