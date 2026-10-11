import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const ref=JSON.parse(readFileSync(new URL('../product-ref.json',import.meta.url),'utf8'));
const git=(args)=>execFileSync('git',['-C','work/product',...args],{encoding:'utf8'}).trim();
if(git(['rev-parse','HEAD'])!==ref.commit)throw new Error('Product SHA mismatch; run pnpm product:prepare');
if(git(['remote','get-url','origin'])!==ref.repository)throw new Error('Product remote mismatch');
if(git(['status','--porcelain','--untracked-files=no']))throw new Error('Product tracked source modified; cannot claim a pinned run');
console.log(`Testing external product source at ${ref.commit}`);
