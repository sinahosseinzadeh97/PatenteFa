/**
 * Chapter 0 («واژه‌های تخصصی»): the word list in src/content/glossary.ts, its search in
 * public/js/glossary.js, and GET /api/learn/glossary.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

import worker from "../src/index.js";
import { GLOSSARY, type GlossaryTerm } from "../src/content/glossary.js";
import type { AppEnv } from "../src/types.js";
import { createSqliteD1, signedInitData } from "./helpers/sqlite-d1.js";

const TERMS = GLOSSARY.flatMap((group) => group.terms);

/** Italian term as the rules file writes it: no article, no brackets, lower case. */
function italianKey(text: string): string {
  return text.toLowerCase().replace(/’/g, "'").replace(/^(il|lo|la|i|gli|le|un|uno|una) |^l'/, "")
    .replace(/[()]/g, "").replace(/\s+/g, " ").trim();
}

/** Ezafe marks and ZWNJ are not variants (.agent/rules/glossary.md). */
function persianKey(text: string): string {
  return text.toLowerCase().replace(/[ً-ٟ‌\s]/g, "");
}

/** Italian key → every headword the rules file gives it (several rows may name the same term). */
function headwords(): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const line of readFileSync(".agent/rules/glossary.md", "utf8").split("\n")) {
    const cells = line.split("|").map((cell) => cell.trim());
    if (cells.length !== 5 || cells[1] === "Italiano" || cells[1].startsWith("---")) continue;
    const fa = cells[2].replace(/\s*\([^)]*\)/g, "");
    const pieces = [fa, ...fa.split("،").map((piece) => piece.trim())];
    for (const it of [cells[1], ...cells[1].split(",")]) {
      const key = italianKey(it);
      map.set(key, [...(map.get(key) ?? []), ...pieces]);
    }
  }
  return map;
}

test("every chapter 0 term has Italian and Persian, and each Italian term appears once", () => {
  assert.ok(GLOSSARY.length >= 8 && TERMS.length >= 200, "chapter 0 lost most of its words");
  const seen = new Set<string>();
  for (const term of TERMS) {
    assert.ok(term.it.trim() && term.fa.trim(), `empty term: ${JSON.stringify(term)}`);
    assert.ok(!seen.has(term.it), `«${term.it}» is listed twice; it is the key saved to the word list`);
    seen.add(term.it);
  }
});

test("chapter 0 uses the glossary headword for every term the rules file lists", () => {
  const rules = headwords();
  let checked = 0;
  for (const term of TERMS) {
    const allowed = rules.get(italianKey(term.it));
    if (!allowed) continue;
    checked++;
    assert.ok(
      allowed.some((word) => persianKey(term.fa).startsWith(persianKey(word))),
      `«${term.it}» is «${term.fa}»; .agent/rules/glossary.md says «${allowed[0]}»`
    );
  }
  assert.ok(checked >= 120, `only ${checked} terms were checked against the rules file; did its table format change?`);
});

function loadSearch(): (term: GlossaryTerm, query: string) => boolean {
  const App: Record<string, any> = {};
  vm.runInNewContext(readFileSync("public/js/glossary.js", "utf8"), { App, state: {}, window: {}, document: {} });
  return App.glossaryMatches;
}

function search(query: string): string[] {
  const matches = loadSearch();
  return TERMS.filter((term) => matches(term, query)).map((term) => term.it);
}

test("search finds a term from everyday Persian, Italian without accents, and either keyboard", () => {
  assert.ok(search("کلاج").includes("la frizione"), "colloquial «کلاج»");
  assert.ok(search("فرمون").includes("il volante"), "colloquial «فرمون»");
  assert.ok(search("FRIZIONE").includes("la frizione"), "case");
  assert.ok(search("velocita").includes("la velocità"), "Italian accent");
  assert.ok(search("پیاده رو").includes("il marciapiede"), "space for the ZWNJ in «پیاده‌رو»");
  assert.ok(search("دنده عقب").includes("la retromarcia"), "space for the ZWNJ in «دنده‌عقب»");
  assert.ok(search("كاپوت").includes("il cofano"), "Arabic kaf");
  assert.ok(search("صندلي").includes("il sedile"), "Arabic yeh");
  assert.ok(search("اینه").includes("lo specchio retrovisore"), "alef without madda");
  assert.ok(search("freno a mano").includes("il freno di stazionamento"), "Italian everyday name");
});

test("an empty search shows every term and a nonsense search shows none", () => {
  assert.equal(search("   ").length, TERMS.length);
  assert.equal(search("zzqx").length, 0);
});

test("GET /api/learn/glossary returns the word list and only this learner's saved terms", async () => {
  const BOT_TOKEN = "123456:glossary-test";
  const { db, raw } = createSqliteD1();
  const user = raw.prepare(`INSERT INTO users (id, telegram_user_id, first_name, is_approved) VALUES (?, ?, ?, 1)`);
  user.run(1, 7001, "A");
  user.run(2, 7002, "B");
  const vocab = raw.prepare(`INSERT INTO vocab_items (user_id, term_it, term_fa) VALUES (?, ?, ?)`);
  vocab.run(1, "la frizione", "کلاچ");
  vocab.run(1, "una parola qualsiasi", "یک کلمه");
  vocab.run(2, "il volante", "غربیلکِ فرمان");
  const env = {
    DB: db,
    TELEGRAM_BOT_TOKEN: BOT_TOKEN,
    ALLOWED_TELEGRAM_USER_IDS: "1",
    PRIMARY_ADMIN_TELEGRAM_USER_ID: "1",
    LOG_CHANNEL_ID: "-100",
  } as AppEnv;
  const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;
  const get = async (telegramId: number | null) => {
    const headers: Record<string, string> = telegramId === null ? {} : { "X-Telegram-InitData": signedInitData(BOT_TOKEN, telegramId) };
    const response = await worker.fetch(new Request("https://example.test/api/learn/glossary", { headers }), env, ctx);
    return { status: response.status, body: (await response.json()) as Record<string, any> };
  };

  assert.equal((await get(null)).status, 401);
  const a = await get(7001);
  assert.equal(a.status, 200);
  assert.equal(a.body.groups.length, GLOSSARY.length);
  assert.deepEqual(a.body.savedTerms, ["la frizione"]);
  assert.deepEqual((await get(7002)).body.savedTerms, ["il volante"]);
});
