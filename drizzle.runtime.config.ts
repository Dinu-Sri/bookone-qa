import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: './work/product/packages/db/src/schema/index.ts',
  out: './.local/runtime/drizzle',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.QA_RUNTIME_ADMIN_URL! },
});
