import base from './vitest.batch.config';
export default {...base,test:{...base.test,include:['tests/infrastructure/embedded-sql.test.ts'],reporters:['default']}};
