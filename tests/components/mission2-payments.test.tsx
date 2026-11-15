import {describe,it,expect} from 'vitest';import {renderToStaticMarkup} from 'react-dom/server';
import {AllocationAmountField} from '@product/web/components/payments/allocation-amount-field';
describe.each([['AR',708],['AP',94.40]])('actual %s payment amount component (SSR boundary)',(_kind,cap)=>{
 for(const raw of ['', '0','-1','abc','1abc','Infinity','NaN','1.001',String(Number(cap)+0.01)])it('selected invalid '+JSON.stringify(raw)+' exposes accessible field error',()=>{
  const html=renderToStaticMarkup(<AllocationAmountField id="m2-amount" label="Allocated amount" value={raw} balanceDue={Number(cap)} selected={true} onChange={()=>{}}/>);
  expect(html).toContain('aria-invalid="true"');expect(html).toContain('aria-describedby="m2-amount-error"');expect(html).toContain('role="alert"');
 });
 for(const raw of ['0.01',String(cap)])it('valid cents/equal cap '+raw+' has no error',()=>{const html=renderToStaticMarkup(<AllocationAmountField id="m2-amount" label="Allocated amount" value={raw} balanceDue={Number(cap)} selected={true} onChange={()=>{}}/>);expect(html).toContain('aria-invalid="false"');expect(html).not.toContain('role="alert"');});
 it('unselected invalid field disabled and excluded from error presentation',()=>{const html=renderToStaticMarkup(<AllocationAmountField id="m2-amount" label="Allocated amount" value="-1" balanceDue={Number(cap)} selected={false} onChange={()=>{}}/>);expect(html).toContain('disabled=""');expect(html).toContain('aria-invalid="false"');expect(html).not.toContain('role="alert"');});
});
