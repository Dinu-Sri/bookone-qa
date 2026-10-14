import {spawnSync} from 'node:child_process';
// Fixed node commands only; no manifest-provided shell or arbitrary executable.
for(const [file,args]of [['scripts/validate.mjs',[]],['scripts/matrix.mjs',['check']],['scripts/validate-backup-plan.mjs',[]],['tests/infrastructure/target-policy.test.mjs',['test']],['tests/infrastructure/batch-state.test.mjs',['test']],['tests/infrastructure/runtime-diagnostics.test.mjs',['test']],['tests/infrastructure/runtime-target.test.mjs',['test']],['tests/infrastructure/campaign-state.test.mjs',['test']]]){
 const command=args[0]==='test'?['--test',file]:file.includes('validate-backup')?['--import','tsx',file]:[file,...args];
 const r=spawnSync(process.execPath,command,{stdio:'inherit'});if(r.status!==0)process.exit(r.status??1);
}
