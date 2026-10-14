import {spawnSync} from 'node:child_process';
import {prepareBankFixtures,fixtureEnvironment} from './bank.mjs';
const fixtures=prepareBankFixtures();
console.log(JSON.stringify({fixtureVersion:fixtures.manifest.version,bankFixtureHash:fixtures.hash,syntheticRows:[fixtures.manifest.sampath.rows,fixtures.manifest.hnb.rows],scope:'Synthetic parser fixtures; not authentic bank format certification'}));
const out=spawnSync(process.execPath,['node_modules/vitest/vitest.mjs','run','--config','vitest.config.ts',...process.argv.slice(2).filter(a=>a!=='--')],{env:{...process.env,...fixtureEnvironment(fixtures.paths)},stdio:'inherit'});
process.exitCode=out.status??1;
