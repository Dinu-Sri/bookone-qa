import {fileURLToPath} from 'node:url';
export default {root:fileURLToPath(new URL('./work/product/',import.meta.url)),test:{include:['packages/agent-bridge/test/**/*.test.ts'],fileParallelism:false,pool:'forks'}};
