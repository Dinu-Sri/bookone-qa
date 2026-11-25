import {describe,expect,it} from 'vitest';
import {rowsFromLines,spendableCashFromRows,externalCashFlow} from '../../work/product/packages/accounting/src/dashboard-metrics';
const line=(accountCode:string,accountType:string,side:string,amount:number)=>({journalId:'qa-funding',date:'2026-11-19',accountCode,accountType,side,amount});
describe('custom bank recognized by business dashboard (pure calculation)',()=>{
 it('positive default bank control',()=>{expect(spendableCashFromRows(rowsFromLines([line('1100','asset','debit',300),line('3000','equity','credit',300)]))).toBe(300);});
 it('includes a legitimate custom bank1101 in cash and bank',()=>{expect(spendableCashFromRows(rowsFromLines([line('1101','asset','debit',300),line('3000','equity','credit',300)]))).toBe(300);});
 it('internal transfer1100 to1101 is not an external outflow',()=>{const flow=externalCashFlow([line('1100','asset','credit',100),line('1101','asset','debit',100)]);expect(flow.moneyOut).toBe(0);});
});
