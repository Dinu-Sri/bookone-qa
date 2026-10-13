import { readFileSync, readdirSync, mkdirSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';
import { createHash, randomBytes } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import postgres from 'postgres';
import { runtimeTarget } from './target.mjs';
runtimeTarget(process.env.QA_RUNTIME_ADMIN_URL, process.env.QA_RUNTIME_ISOLATION);
mkdirSync('.local/runtime', { recursive: true });
if(existsSync('.local/runtime/latest-summary.json'))unlinkSync('.local/runtime/latest-summary.json'); // Cache copy only; immutable runs remain.
const verify = spawnSync(process.execPath, ['scripts/verify-product.mjs'], { encoding: 'utf8' });
if (verify.status !== 0) throw new Error('Pinned source verification failed');
const sql = postgres(process.env.QA_RUNTIME_ADMIN_URL, { max: 1 });
const manifest = { version: 1, productSha: JSON.parse(readFileSync('product-ref.json', 'utf8')).commit,
  schema: 'current-product-drizzle-push-plus-ordered-sql', migrations: [], complete: false };
try {
  const [{version}] = await sql`select current_setting('server_version_num')::int as version`;
  if(version<160000 || version>=170000)throw new Error('PostgreSQL 16 required for this fixture');
  manifest.postgresVersionNumber=version;
  const [{ count }] = await sql`select count(*)::int as count from pg_tables where schemaname='public'`;
  if (count !== 0) throw new Error('Refusing schema preparation: database is not empty');
  // Current product install is schema push followed by SQL. Never catch-and-ignore
  // an entire migration file like startup does; errors remain explicit evidence.
  const child = spawnSync(process.execPath, ['node_modules/drizzle-kit/bin.cjs', 'push', '--force', '--config=drizzle.runtime.config.ts'], { encoding: 'utf8', env: process.env });
  writeFileSync('.local/runtime/schema-push.log', (child.stdout ?? '') + (child.stderr ?? ''));
  if (child.status !== 0) throw new Error('Schema push failed; private log retained');
  for (const file of readdirSync('work/product/packages/db/migrations').filter(f => f.endsWith('.sql')).sort()) {
    const source = readFileSync(`work/product/packages/db/migrations/${file}`, 'utf8');
    const entry = { file, sha256: createHash('sha256').update(source).digest('hex'), result: 'not-run' };
    manifest.migrations.push(entry);
    try { await sql.unsafe(source); entry.result = 'applied'; }
    catch (error) { entry.result = 'failed'; entry.sqlstate = error.code ?? 'unknown'; throw new Error(`Migration ${file} failed (${entry.sqlstate}); no skip counted as applied`); }
  }
  const password = randomBytes(24).toString('hex');
  await sql.unsafe(`CREATE ROLE qa_runtime LOGIN PASSWORD '${password}' NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS`);
  await sql`GRANT USAGE ON SCHEMA public TO qa_runtime`;
  await sql`GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO qa_runtime`;
  await sql`GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO qa_runtime`;
  await sql`CREATE TABLE qa_runtime_guard (product_sha text NOT NULL, marker text NOT NULL)`;
  await sql`INSERT INTO qa_runtime_guard VALUES (${manifest.productSha}, 'isolated-bookone-qa-v1')`;
  await sql`GRANT SELECT ON qa_runtime_guard TO qa_runtime`;
  const url = new URL(process.env.QA_RUNTIME_ADMIN_URL); url.username = 'qa_runtime'; url.password = password;
  writeFileSync('.local/runtime/connection.json', JSON.stringify({ url: url.href }));
  manifest.complete = true;
  console.log(JSON.stringify({ scope: manifest.schema, migrationsApplied: manifest.migrations.length, role: 'non-owner-NOBYPASSRLS', result: 'prepared' }));
} finally {
  writeFileSync('.local/runtime/preparation.json', JSON.stringify(manifest, null, 2) + '\n');
  await sql.end();
}
