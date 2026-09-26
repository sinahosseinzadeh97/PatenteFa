/**
 * A D1Database backed by node:sqlite, loaded with the real src/db/schema.sql.
 * Lets tests run the actual SQL (upserts, RETURNING, batches) instead of
 * hand-written mocks. batch() runs in one transaction, like D1.
 */
import { readFileSync } from "node:fs";
import { createHmac } from "node:crypto";
import { DatabaseSync, type SQLInputValue } from "node:sqlite";

type Params = SQLInputValue[];

class Statement {
  constructor(
    private readonly raw: DatabaseSync,
    private readonly sql: string,
    private readonly params: Params = []
  ) {}

  bind(...params: unknown[]): Statement {
    return new Statement(this.raw, this.sql, params as Params);
  }

  async first<T>(): Promise<T | null> {
    return (this.raw.prepare(this.sql).get(...this.params) as T | undefined) ?? null;
  }

  async all<T>(): Promise<{ results: T[]; success: true; meta: { changes: number } }> {
    return { results: this.raw.prepare(this.sql).all(...this.params) as T[], success: true, meta: { changes: 0 } };
  }

  async run(): Promise<{ success: true; meta: { changes: number; last_row_id: number } }> {
    const result = this.raw.prepare(this.sql).run(...this.params);
    return { success: true, meta: { changes: Number(result.changes), last_row_id: Number(result.lastInsertRowid) } };
  }

  execute(): { results: unknown[]; success: true; meta: { changes: number } } {
    const statement = this.raw.prepare(this.sql);
    if (statement.columns().length > 0) {
      const results = statement.all(...this.params);
      const changes = /^\s*select/i.test(this.sql) ? 0 : Number(this.raw.prepare("SELECT changes() AS c").get()?.c ?? 0);
      return { results, success: true, meta: { changes } };
    }
    const result = statement.run(...this.params);
    return { results: [], success: true, meta: { changes: Number(result.changes) } };
  }
}

export function createSqliteD1(): { db: D1Database; raw: DatabaseSync } {
  const raw = new DatabaseSync(":memory:");
  raw.exec(readFileSync("src/db/schema.sql", "utf8"));
  const db = {
    prepare(sql: string) {
      return new Statement(raw, sql);
    },
    async batch(statements: Statement[]) {
      raw.exec("BEGIN");
      try {
        const results = statements.map((statement) => statement.execute());
        raw.exec("COMMIT");
        return results;
      } catch (error) {
        raw.exec("ROLLBACK");
        throw error;
      }
    },
  };
  return { db: db as unknown as D1Database, raw };
}

export function signedInitData(botToken: string, userId: number, firstName = "Learner"): string {
  const params = new URLSearchParams({
    auth_date: String(Math.floor(Date.now() / 1000)),
    user: JSON.stringify({ id: userId, first_name: firstName }),
  });
  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  const secret = createHmac("sha256", "WebAppData").update(botToken).digest();
  params.set("hash", createHmac("sha256", secret).update(dataCheckString).digest("hex"));
  return params.toString();
}
