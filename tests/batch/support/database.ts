import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { SQL } from 'drizzle-orm';
import { getTableConfig, PgDialect } from 'drizzle-orm/pg-core';
import * as schema from '@product/schema/index';
import { TENANT_A, TENANT_B, setActor } from './actor';
export * from '@product/schema/index';
export { eq, and, isNull, or, not, desc, asc, gte, lte, inArray, sql, count, sum, ilike } from 'drizzle-orm';
let client: PGlite;
let orm: ReturnType<typeof drizzle>;
const tables = [schema.tenants, schema.users, schema.accounts, schema.parties,
  schema.transactions, schema.journalEntries, schema.journalLines,
  schema.businessDocuments, schema.periodLocks, schema.auditLog];
const quote = (s: string) => '"' + s.replaceAll('"', '""') + '"';
const dialect = new PgDialect();
function defaultSQL(value: unknown) {
  if (value instanceof SQL) {
    const q = dialect.sqlToQuery(value);
    if (q.params.length) throw new Error('Unsupported parameterized DDL default');
    return q.sql;
  }
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  const s = typeof value === 'object' ? JSON.stringify(value) : String(value);
  return "'" + s.replaceAll("'", "''") + "'";
}
export async function openDatabase() {
  client = new PGlite();
  orm = drizzle(client);
  // Live product columns/defaults/PKs. Intentionally NOT migrations/FKs/RLS/unique
  // constraints: this is a bounded SQL/action contract fixture, not DB acceptance.
  for (const table of tables) {
    const cfg = getTableConfig(table);
    const columns = cfg.columns.map(c => `${quote(c.name)} ${c.getSQLType()}` +
      (c.primary ? ' primary key' : '') + (c.notNull ? ' not null' : '') +
      (c.default !== undefined ? ` default ${defaultSQL(c.default)}` : ''));
    await client.exec(`create table ${quote(cfg.name)} (${columns.join(',')})`);
  }
}
export async function resetDatabase() {
  await client.exec(`truncate ${tables.map(t => quote(getTableConfig(t).name)).join(',')}`);
  setActor();
  for (const [id, slug] of [[TENANT_A, 'qa-a'], [TENANT_B, 'qa-b']]) {
    await orm.insert(schema.tenants).values({ id, name: slug, slug, entityKind: 'company' });
  }
  await orm.insert(schema.accounts).values([
    { tenantId: TENANT_A, code: '1000', name: 'Cash on Hand', type: 'asset', normalSide: 'debit' },
    { tenantId: TENANT_A, code: '4000', name: 'Sales Revenue', type: 'revenue', normalSide: 'credit' },
  ]);
}
export function db() { if (!orm) throw new Error('Fixture database not initialized'); return orm; }
export async function withTenantContext<T>(_tenant: string, work: () => Promise<T>) { return work(); }
export async function closeDatabase() { await client?.close(); }
export async function rawQuery(sql: string) { return client.query(sql); }
