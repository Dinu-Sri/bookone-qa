import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
const local = (p: string) => fileURLToPath(new URL(p, import.meta.url));
export default defineConfig({
  resolve: { alias: [
    { find: '@bookone/db', replacement: local('./tests/batch/support/database.ts') },
    { find: '@bookone/auth', replacement: local('./tests/batch/support/actor.ts') },
    { find: '@bookone/accounting', replacement: local('./work/product/packages/accounting/src/index.ts') },
    { find: '@/lib/dimensions', replacement: local('./tests/batch/support/dimensions.ts') },
    { find: '@/lib/dimension-scope', replacement: local('./tests/batch/support/dimensions.ts') },
    { find: '@/components/layout/bookone-shell', replacement: local('./tests/batch/support/ui.tsx') },
    { find: '@/components/ui/bookone-ui', replacement: local('./tests/batch/support/ui.tsx') },
    { find: 'lucide-react', replacement: local('./tests/batch/support/ui.tsx') },
    { find: 'next/link', replacement: local('./tests/batch/support/ui.tsx') },
    { find: /^next\/(cache|navigation|headers)$/, replacement: local('./tests/batch/support/next.ts') },
    { find: '@product/web', replacement: local('./work/product/apps/web/src') },
    { find: '@product/schema', replacement: local('./work/product/packages/db/src/schema') },
    { find: '@product/auth', replacement: local('./work/product/packages/auth/src') },
    { find: '@product/accounting', replacement: local('./work/product/packages/accounting/src') },
    { find: '@product/statement-import', replacement: local('./work/product/packages/statement-import/src') },
    { find: '@', replacement: local('./work/product/apps/web/src') },
  ] },
  esbuild: { jsx: 'automatic', jsxImportSource: 'react' },
  test: {
    include: ['tests/batch/*.test.ts', 'tests/batch/*.test.tsx'],
    fileParallelism: false,
    pool: 'threads',
    poolOptions: { threads: { singleThread: true } },
    testTimeout: 60_000,
    hookTimeout: 60_000,
    reporters: ['default', './scripts/batch/reporter.mjs'],
  },
});
