import base from './vitest.runtime.config';
export default {...base,test:{...base.test,include:['tests/http/seed.test.ts'],testTimeout:120_000,hookTimeout:120_000}};
