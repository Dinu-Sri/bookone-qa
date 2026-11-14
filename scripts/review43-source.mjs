// Pinned source diagnostics. No browser, DB, credentials or product changes.
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import * as nodeModule from 'node:module';
const stripTypeScriptTypes=(...args)=>{if(typeof nodeModule.stripTypeScriptTypes!=='function')throw Error('Source diagnostics require Node >=22.13; metadata/oracle tests support the repo baseline');return nodeModule.stripTypeScriptTypes(...args);};
const hash=x=>createHash('sha256').update(x).digest('hex');
const paths={guard:'packages/accounting/src/document-guards.ts',sales:'apps/web/src/components/sales/sales-document-form.tsx',purchase:'apps/web/src/components/module/commercial-doc-screens.tsx',editor:'apps/web/src/components/module/document-lines-editor.tsx',invoice:'apps/web/src/components/sales/invoice-document-form.tsx'};
const cents=x=>Math.round(x*100);
export function conserved(expected,actual){return Number.isSafeInteger(expected)&&expected===actual;}
export function represented(result){return cents(result.lines.reduce((s,l)=>s+l.lineTotal,0))-cents(result.headerDiscount)===cents(result.total);}
export function profile(quantity,headerCents){
  // Independent fixture oracle: per-unit round-half-up, capped by unused header.
  // This is a declared test allocation, not a universal rounding policy.
  if(!Number.isInteger(quantity)||quantity<2||!Number.isInteger(headerCents)||headerCents<0||headerCents>=quantity*100)throw Error('Invalid fixture');
  let remaining=headerCents,paid=0;
  const expected=[];
  for(let i=0;i<quantity;i++){
    const header=i===quantity-1?remaining:Math.min(remaining,Math.floor((2*headerCents+quantity)/(2*quantity)));
    expected.push(100-header);remaining-=header;paid+=100-header;
  }
  if(remaining!==0||paid!==quantity*100-headerCents)throw Error('Oracle does not conserve');
  return expected;
}
function between(text,start,end){const a=text.indexOf(start),b=text.indexOf(end,a+start.length);if(a<0||b<0)throw Error('Source adapter anchor changed');return text.slice(a+start.length,b);}
export function verifiedSources(root,manifest){
  if(manifest.schemaVersion!==1||manifest.repository!=='Dinu-Sri/BookOne'||!/^[a-f0-9]{40}$/.test(manifest.commit))throw Error('Invalid source provenance');
  const result={};
  for(const [key,path]of Object.entries(paths)){
    const bytes=readFileSync(resolve(root,path));if(!/^[a-f0-9]{64}$/.test(manifest.files[path]??'')||hash(bytes)!==manifest.files[path])throw Error('Source fingerprint mismatch: '+path);
    result[key]=bytes.toString('utf8');
  }
  return result;
}
export async function diagnose(root,manifest){
  const src=verifiedSources(root,manifest);
  // The guard is a standalone pure TS module; require its entire reviewed file hash.
  const guardModule=stripTypeScriptTypes(src.guard,{mode:'strip'});
  const g=await import('data:text/javascript;base64,'+Buffer.from(guardModule).toString('base64'));
  const lineCode=between(src.editor,'export function computeLineAmounts','export function linesHavePercentDiscountOver100');
  const computeLineAmounts=new Function('lineDiscountAmount',stripTypeScriptTypes('function computeLineAmounts'+lineCode,{mode:'strip'})+';return computeLineAmounts;')(g.lineDiscountAmount);
  const previewBodies=Object.fromEntries(['sales','purchase'].map(key=>[key,between(src[key],'const computed = useMemo(() => {','\n  }, [')]));
  const previews=Object.fromEntries(Object.entries(previewBodies).map(([key,body])=>[key,new Function('context','with(context){'+body+'}') ]));
  const unit={productId:'SYNTHETIC-ONLY',description:'Synthetic digital',quantity:1};
  const checks=[],ladders=[];
  for(const [qty,header]of [[7,5],[10,5],[3,1]]){
    const expected=profile(qty,header),source=[{...unit,quantity:qty,unitPrice:1,discountAmount:0}],prior=[];
    let paid=0;const steps=[];
    for(let i=0;i<qty;i++){
      const context={computeLineAmounts,prorateSourceHeader:g.prorateSourceHeader,linkedReturnPreviewTotals:g.linkedReturnPreviewTotals,isClosingLinkedReturn:g.isClosingLinkedReturn,
        lines:[{...unit,quantity:'1',unitPrice:'1',sourceQuantity:String(qty),sourceDiscountAmount:'0'}],discountId:'',discounts:[],sourceInvoiceId:'SYNTHETIC-SOURCE',sourceHeaderDiscount:header/100,sourceLineNet:qty,headerDiscount:'0',headerDiscountType:'fixed',sourceNet:qty-header/100,sourceTotal:qty-header/100,alreadyReturnedNet:paid/100,alreadyReturnedTotal:paid/100,sourceQtyLines:source,priorReturnLines:prior,sourceVatRate:0,
        linkedReturn:true,sourceHeaderSnapshot:header/100,sourceLineNetSnapshot:qty,sourceTotalProp:qty-header/100,sourceVatRate:0};
      const preview=Object.fromEntries(Object.entries(previews).map(([k,fn])=>[k,cents(fn(context).total)]));
      const out=g.prorateLinkedReturn(source,header/100,[unit],{sourceTotal:qty-header/100,priorReturnTotal:paid/100,priorReturnLines:prior});
      const posted=cents(out.total);steps.push({step:i+1,priorCents:paid,expectedCents:expected[i],previewCents:preview,postingCents:posted,represented:represented(out)});
      paid+=posted;prior.push({...unit});
    }
    ladders.push({quantity:qty,headerCents:header,steps,cumulativeCents:paid});
    for(const kind of ['sales','purchase'])checks.push({id:`F${qty}-${kind}-preview-post`,expected:'Every preview, posting and declared independent fixture amount agrees',status:steps.every(s=>s.previewCents[kind]===s.postingCents&&conserved(s.expectedCents,s.postingCents))?'passed':'failed'});
    checks.push({id:`F${qty}-conservation`,expectedCents:qty*100-header,actualCents:paid,status:conserved(qty*100-header,paid)?'passed':'failed'});
  }
  const upgrades=[];
  for(const [qty,header,priorCents,residual]of [[7,5,594,101],[10,5,891,104]]){
    const source=[{...unit,quantity:qty,unitPrice:1,discountAmount:0}],prior=Array.from({length:qty-1},()=>({...unit}));
    const out=g.prorateLinkedReturn(source,header/100,[unit],{sourceTotal:(qty*100-header)/100,priorReturnTotal:priorCents/100,priorReturnLines:prior});
    upgrades.push({quantity:qty,priorCents,expectedCents:residual,postingCents:cents(out.total),lineNetCents:cents(out.lineNet),persistableLineSumCents:out.lines.reduce((s,l)=>s+cents(l.lineTotal),0),headerCents:cents(out.headerDiscount)});
    checks.push({id:`U${qty}-total`,expectedCents:residual,actualCents:cents(out.total),status:conserved(residual,cents(out.total))?'passed':'failed'});
    checks.push({id:`U${qty}-line-representation`,expected:'Line amounts minus header reconcile to returned credit without unexplained adjustment',status:represented(out)?'passed':'failed'});
  }
  const toastSource='async function toastIfFormError'+between(src.editor,'export async function toastIfFormError','\nfunction isSourceLockedLine');
  const toasts=[];
  const toast=new Function('pushStatusToast',stripTypeScriptTypes(toastSource,{mode:'strip'})+';return toastIfFormError;')(x=>toasts.push(x));
  const actionBody=between(src.invoice,'action={async (fd) => {','\n      }}');
  const wrapper=new Function('fd','toastIfFormError','createCommercialDocumentFromForm','return(async()=>{'+actionBody+'})();');
  const result=await wrapper(new FormData(),toast,async()=>({ok:false,error:'Synthetic stock refusal'}));
  const actionObservation={boundary:'Actual extracted client wrapper/toast; substituted server returns a business error; no React DOM execution',resolvesUndefined:result===undefined,toastCount:toasts.length,uncontrolledFieldNames:['issueDate','deliveryDate','dueDate','notes','paymentMode'].filter(name=>new RegExp('name="'+name+'"[\\s\\S]{0,160}?defaultValue=').test(src.invoice))};
  return{schemaVersion:1,productSha:manifest.commit,sourceHashes:manifest.files,layer:'Pinned product source calculation/control-flow diagnostics; no browser, database, credential or release acceptance',checks,ladders,upgrades,actionObservation,productGate:checks.every(c=>c.status==='passed')?'passed':'failed',releaseAcceptance:'not-established'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  const [root,manifestPath]=process.argv.slice(2);if(!root||!manifestPath)throw Error('Use node scripts/review43-source.mjs <private-product-snapshot-root> <source-manifest.json>');
  const report=await diagnose(root,JSON.parse(readFileSync(manifestPath,'utf8')));console.log(JSON.stringify(report,null,2));process.exitCode=report.productGate==='passed'?0:1;
}
