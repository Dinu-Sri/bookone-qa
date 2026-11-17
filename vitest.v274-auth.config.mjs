import {fileURLToPath} from 'node:url';
export default {root:fileURLToPath(new URL('./work/product/',import.meta.url)),test:{include:['packages/auth/test/**/*.test.ts'],fileParallelism:false,pool:'forks',server:{deps:{inline:['drizzle-orm']}}}};
