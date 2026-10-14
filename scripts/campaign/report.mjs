import {readdirSync,existsSync} from 'node:fs';
import {readJSON} from '../batch/state.mjs';
import {campaignPlan,campaignSummary} from './state.mjs';
const root='.local/campaigns';if(!existsSync(root))throw new Error('No campaign checkpoint available');
const ids=readdirSync(root).filter(id=>/^CAMP-\d{8}-\d{9}-[a-f0-9]{6}$/.test(id)).sort();if(!ids.length)throw new Error('No campaign checkpoint available');
// Regenerate the allowlist from private state. Never print state/raw logs directly.
const state=readJSON(`${root}/${ids.at(-1)}/state.json`),plan=campaignPlan();
if(state.fingerprint?.planHash!==plan.planHash)throw new Error('Campaign manifest changed; use its immutable summary and original QA revision');
console.log(JSON.stringify(campaignSummary(state,plan),null,2));
