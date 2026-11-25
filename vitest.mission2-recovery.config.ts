import base from './vitest.runtime.config';
export default {...base,test:{...base.test,include:['tests/recovery/missiontwo.test.ts'],testTimeout:120000,hookTimeout:120000}};
