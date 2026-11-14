// Candidate-specific adapter; preserves PR44's original adapter and all 13 expectations.
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import * as nodeModule from 'node:module';
const stripTypeScriptTypes=(...args)=>{if(typeof nodeModule.stripTypeScriptTypes!=='function')throw Error('Source diagnostics require Node >=22.13');return nodeModule.stripTypeScriptTypes(...args);};
const cents=x=>Math.round(x*100);
import {conserved,represented,profile,verifiedSources} from './review43-source.mjs';
function between(text,start,end){const a=text.indexOf(start),b=text.indexOf(end,a+start.length);if(a<0||b<0)throw Error('Source adapter anchor changed');return text.slice(a+start.length,b);}
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
      const context={computeLineAmounts,prorateSourceHeader:g.prorateSourceHeader,linkedReturnPreviewTotals:g.linkedReturnPreviewTotals,isClosingLinkedReturn:g.isClosingLinkedReturn,linkedReturnDocumentTotals:g.linkedReturnDocumentTotals,sourcePricedLines:source,
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
    upgrades.push({quantity:qty,priorCents,expectedCents:residual,postingCents:cents(out.total),lineNetCents:cents(out.lineNet),persistableLineSumCents:out.lines.reduce((s,l)=>s+cents(l.lineTotal),0),headerCents:cents(out.headerDiscount),allocationAdjustmentCents:cents(out.allocationAdjustment??0),sourceUnitPrices:out.lines.map(l=>l.unitPrice)});
    checks.push({id:`U${qty}-total`,expectedCents:residual,actualCents:cents(out.total),status:conserved(residual,cents(out.total))?'passed':'failed'});
    checks.push({id:`U${qty}-line-representation`,expected:'Line amounts minus header reconcile to returned credit without unexplained adjustment',status:represented(out)?'passed':'failed'});
  }
  const actionObservation={boundary:'Source linkage inspection only; real React DOM retention, submission and pending behavior remain untested',
    invoiceUsesRetainingHelper:src.invoice.includes('await submitRetainingFields(e, createCommercialDocumentFromForm)'),
    helperPreventsNativeSubmit:src.editor.includes('event.preventDefault()'),
    helperCapturesSubmitter:src.editor.includes('appendSubmitter(fd, event)'),
    helperWrapsPending:src.editor.includes('await withFormPending(async () =>'),
    invoiceFunctionActionRemoved:!src.invoice.includes('action={async (fd) =>')};

  return{schemaVersion:1,productSha:manifest.commit,sourceHashes:manifest.files,layer:'Pinned product source calculation/control-flow diagnostics; no browser, database, credential or release acceptance',checks,ladders,upgrades,actionObservation,productGate:checks.every(c=>c.status==='passed')?'passed':'failed',releaseAcceptance:'not-established'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const[root,manifestPath]=process.argv.slice(2);if(!root||!manifestPath)throw Error('Use node scripts/retest2516-source.mjs <private-source-root> <manifest.json>');
 const report=await diagnose(root,JSON.parse(readFileSync(manifestPath,'utf8')));console.log(JSON.stringify(report,null,2));process.exitCode=report.productGate==='passed'?0:1;
}
