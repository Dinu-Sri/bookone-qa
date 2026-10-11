import {existsSync,mkdirSync,readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';
const ref=JSON.parse(readFileSync(new URL('../product-ref.json',import.meta.url),'utf8'));
if(ref.repository!=='https://github.com/Dinu-Sri/BookOne.git'||!/^[a-f0-9]{40}$/.test(ref.commit)) throw new Error('Invalid pinned product reference');
const root=resolve('work/product');
mkdirSync(resolve('work'),{recursive:true});
if(!existsSync(resolve(root,'.git')))execFileSync('git',['clone','--no-checkout',ref.repository,root],{stdio:'inherit'});
const git=(args)=>execFileSync('git',['-C',root,...args],{encoding:'utf8'}).trim();
if(git(['remote','get-url','origin'])!==ref.repository)throw new Error('Unexpected product checkout remote');
// Never discard existing modifications to a checkout.
if(git(['status','--porcelain'])) {
  // A brand-new --no-checkout clone appears deleted in the worktree; allow only the first population.
  if(existsSync(resolve(root,'package.json')))throw new Error('Product checkout has changes; preserve or resolve them before preparing another revision');
}
execFileSync('git',['-C',root,'fetch','origin',ref.commit],{stdio:'inherit'});
execFileSync('git',['-C',root,'checkout','--detach',ref.commit],{stdio:'inherit'});
console.log(`Prepared BookOne ${git(['rev-parse','HEAD'])}`);
