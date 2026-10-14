import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
const local=(p:string)=>fileURLToPath(new URL(p,import.meta.url));
export default defineConfig({resolve:{alias:[
  {find:'@product/archive',replacement:local('./work/product/packages/db/src/archive')},
  {find:'@product/auth',replacement:local('./work/product/packages/auth/src')},
  {find:'@product/web',replacement:local('./work/product/apps/web/src')},
  {find:'next/navigation',replacement:local('./tests/archive/support/navigation.ts')},
]},test:{include:['tests/archive/*.test.ts'],fileParallelism:false,pool:'forks',poolOptions:{forks:{singleFork:true}},testTimeout:10000}});
