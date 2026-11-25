import {fileURLToPath} from 'node:url';
export default {
  root:fileURLToPath(new URL('./',import.meta.url)),
  test:{include:['tests/runtime/ab05-independent-review.test.ts'],fileParallelism:false,pool:'forks'},
};
