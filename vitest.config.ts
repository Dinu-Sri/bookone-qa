import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  resolve: { alias: {
    '@product/accounting': fileURLToPath(new URL('./work/product/packages/accounting/src', import.meta.url)),
    '@product/statement-import': fileURLToPath(new URL('./work/product/packages/statement-import/src', import.meta.url)),
  } },
  test: {
    include: ['packages/*/test/**/*.test.ts'],
    reporters: ['default', 'json'],
    outputFile: { json: 'work/unit-results.json' },
    fileParallelism: false,
  },
});
