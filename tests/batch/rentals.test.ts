import { it, expect } from 'vitest';
import fc from 'fast-check';
import { datesOverlap, padHireTo, availableQty } from '@product/accounting/rental-availability';
import { inferInvoiceStage, invoiceTimingAllowed } from '@product/accounting/rental-invoice-timing';
import { buildSalesInvoicePosting } from '@product/accounting/engine/document-posting';
import { suggestedEventDeposit, daysOverdue, reconcileRentalSettings, DEFAULT_RENTAL_SETTINGS } from '@product/web/lib/rental-core';
import { exactLines, line, generation } from './support/oracles';
it('D-001 inclusive date overlap includes touching endpoints and is symmetric',()=>{
  expect(datesOverlap('2026-10-13','2026-10-15','2026-10-15','2026-10-17')).toBe(true);
  expect(datesOverlap('2026-10-13','2026-10-15','2026-10-16','2026-10-17')).toBe(false);
  fc.assert(fc.property(fc.integer({min:1,max:25}),fc.integer({min:1,max:25}),(a,b)=>{
    const date=(n:number)=>`2026-10-${String(n).padStart(2,'0')}`;
    const occupied=new Set(Array.from({length:3},(_,i)=>a+i));
    const expected=[b,b+1,b+2].some(d=>occupied.has(d));
    expect(datesOverlap(date(a),date(a+2),date(b),date(b+2))).toBe(expected);
    expect(datesOverlap(date(b),date(b+2),date(a),date(a+2))).toBe(expected);
  }),generation());
});
it('D-002 whole-calendar-day turnaround handles month and leap boundaries',()=>{
  expect(padHireTo('2026-10-31',0)).toBe('2026-10-31');
  expect(padHireTo('2026-10-31',1)).toBe('2026-11-01');
  expect(padHireTo('2026-10-31',24)).toBe('2026-11-01');
  expect(padHireTo('2026-10-31',25)).toBe('2026-11-02');
  expect(padHireTo('2028-02-28',24)).toBe('2028-02-29');
});
it('D-003 capacity subtracts repair and commitments and exposes oversubscription',()=>{
  fc.assert(fc.property(fc.integer({min:0,max:1000}),fc.integer({min:0,max:1000}),fc.integer({min:0,max:1000}),
    (owned,repair,committed)=>{ expect(availableQty({ownedQty:owned,repairQty:repair,committedQty:committed})).toBe(owned-repair-committed); }),generation());
});
it('D-004 explicit invoice timing matrix and mixed return stages agree',()=>{
  const expected={on_confirm:[true,true,true],on_dispatch:[false,true,true],after_return:[false,false,true],manual:[true,true,true]};
  for(const timing of ['on_confirm','on_dispatch','after_return','manual'] as const)
    expect(['confirm','dispatch','return'].map(s=>invoiceTimingAllowed(timing,s as any))).toEqual(expected[timing]);
  expect(inferInvoiceStage(['reserved','cancelled'])).toBe('confirm');
  expect(inferInvoiceStage(['returned','dispatched'])).toBe('dispatch');
  expect(inferInvoiceStage(['returned','returned','cancelled'])).toBe('return');
});
it('D-005 deposit suggestion modes retain explicit product-contract examples',()=>{
  const base={eventAmount:100,eventPercent:20,hireTotal:1000,itemDeposits:60};
  expect(['none','per_event','per_item','both'].map(mode=>suggestedEventDeposit({...base,mode:mode as any}))).toEqual([0,200,60,260]);
  // Product configuration convention, not approval of forfeiture/tax/accounting policy.
});
it('D-006 hire invoice never consumes or expenses owned fleet',()=>{
  exactLines(buildSalesInvoicePosting({lines:[{productType:'rental',quantity:5,unitPrice:100,unitCost:600,
    description:'Synthetic hire',revenueAccountCode:'4400'}]}).lines,[line('1300','debit',500),line('4400','credit',500)]);
});
it('D-007 disabled settings cannot leave defaults pointing to disabled options',()=>{
  const r=reconcileRentalSettings({...DEFAULT_RENTAL_SETTINGS,allowHirePerEvent:false,allowHirePerDay:true,
    allowHirePerHour:false,defaultHireUnit:'hour',allowInvoiceOnConfirm:false,allowInvoiceOnDispatch:false,
    allowInvoiceAfterReturn:true,allowInvoiceManual:false,defaultInvoiceTiming:'manual',allowDepositPerEvent:false,
    allowDepositPerItem:true,defaultDepositMode:'both'});
  expect([r.defaultHireUnit,r.defaultInvoiceTiming,r.defaultDepositMode]).toEqual(['day','after_return','per_item']);
});
it('D-008 overdue date examples span month/year without charging on due date',()=>{
  expect(daysOverdue('2026-10-13','2026-10-13')).toBe(0);
  expect(daysOverdue('2026-10-31','2026-11-02')).toBe(2);
  expect(daysOverdue('2026-12-31','2027-01-01')).toBe(1);
});
