import {fileURLToPath} from 'node:url';
const path=p=>fileURLToPath(new URL(p,import.meta.url));
export default {root:path('./'),test:{include:['tests/runtime/pilot-bank-*.test.ts'],fileParallelism:false,pool:'forks'},resolve:{alias:{'@bookone/accounting':path('./work/product/packages/accounting/src/index.ts'),'@bookone/auth':path('./work/product/packages/auth/src/index.ts'),'@bookone/db':path('./work/product/packages/db/src/index.ts'),'next/cache':path('./work/product/apps/web/node_modules/next/cache.js')}}};
