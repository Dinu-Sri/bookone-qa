import { randomBytes } from 'node:crypto';
import { appendFileSync } from 'node:fs';
if(process.env.GITHUB_ACTIONS!=='true' || !process.env.GITHUB_ENV)throw new Error('Ephemeral CI environment required');
const password=randomBytes(24).toString('hex');
console.log('::add-mask::'+password);
appendFileSync(process.env.GITHUB_ENV,'QA_RUNTIME_ADMIN_URL=postgres://qa_fixture_admin:'+password+'@127.0.0.1:5432/bookone_qa_runtime\n');
