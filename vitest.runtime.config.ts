import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const local = (p: string) => fileURLToPath(new URL(p, import.meta.url));
export default defineConfig({
  resolve: { alias: [
    { find: '@bookone/db', replacement: local('./work/product/packages/db/src/index.ts') },
    { find: '@bookone/auth', replacement: local('./tests/runtime/support/session.ts') },
    { find: '@bookone/accounting', replacement: local('./work/product/packages/accounting/src/index.ts') },
    { find: '@product/schema', replacement: local('./work/product/packages/db/src/schema') },
    { find: '@product/db', replacement: local('./work/product/packages/db/src') },
    { find: '@product/auth', replacement: local('./work/product/packages/auth/src') },
    { find: '@product/web', replacement: local('./work/product/apps/web/src') },
    { find: '@', replacement: local('./work/product/apps/web/src') },
    { find: 'postgres', replacement: require.resolve('postgres') },
    { find: 'server-only', replacement: local('./tests/runtime/support/server-only.ts') },
    { find: /^next\/(cache|navigation|headers)$/, replacement: local('./tests/batch/support/next.ts') },
  ] },
  test: { include: ['tests/runtime/*.test.ts'], fileParallelism: false, pool: 'forks',
    poolOptions: { forks: { singleFork: true } }, testTimeout: 60_000, hookTimeout: 60_000 },
});
