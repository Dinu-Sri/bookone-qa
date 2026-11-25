import base from './vitest.batch.config';
export default {...base,test:{...base.test,include:['tests/components/mission2-payments.test.tsx'],reporters:['default']}};
