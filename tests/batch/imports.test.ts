import { it, expect } from 'vitest';
import fc from 'fast-check';
import { parseAmountCell, signedFromDebitCredit, signedFromAmountAndType, parseStatementDate } from '@product/statement-import/normalize';
import { lineFingerprint } from '@product/statement-import/fingerprint';
import { generation } from './support/oracles';
it('F-001 generated portable amount formats preserve exact cents and parentheses signs',()=>{
  fc.assert(fc.property(fc.integer({min:1,max:10000000}),cents=>{
    const s=(cents/100).toFixed(2), grouped=s.replace(/\B(?=(\d{3})+(?!\d))/g,',');
    expect(parseAmountCell(`LKR ${grouped}`)).toBe(cents/100);
    expect(parseAmountCell(`(${grouped})`)).toBe(-cents/100);
  }),generation());
});
it('F-002 bank debit/credit conventions preserve inflow/outflow signs',()=>{
  expect(signedFromDebitCredit(250,0)).toBe(-250);
  expect(signedFromDebitCredit(0,250)).toBe(250);
  expect(signedFromDebitCredit(250,0,'credit_debit')).toBe(250);
  expect(signedFromAmountAndType('250.00','DR')).toBe(-250);
  expect(signedFromAmountAndType('250.00','CR')).toBe(250);
});
it('F-003 duplicate fingerprints repeat within account and differ across tenant/account/sign',()=>{
  const input={tenantId:'synthetic-a',bankAccountId:'bank-a',date:'2026-10-13',amountSigned:12.34,description:'QA payment ref'};
  const fp=lineFingerprint(input);
  expect(lineFingerprint({...input})).toBe(fp);
  for(const change of [{tenantId:'synthetic-b'},{bankAccountId:'bank-b'},{amountSigned:-12.34},{date:'2026-10-14'}])
    expect(lineFingerprint({...input,...change})).not.toBe(fp);
});
it('F-004 impossible calendar dates must not normalize to accepted bank dates',()=>{
  expect(parseStatementDate('2026-02-28').iso).toBe('2026-02-28');
  for(const bad of ['2026-02-30','2026-13-01','31/04/2026'])expect(parseStatementDate(bad).iso).toBe('');
});
it('F-009 leap and century rules retain valid ISO/slash and deny impossible dates',()=>{
  for(const [input,expected] of [['2024-02-29','2024-02-29'],['29/02/2024','2024-02-29'],['2000-02-29','2000-02-29'],['28 Feb 2026','2026-02-28'],['2026-02-29',''],['1900-02-29',''],['29.02.2026','']])expect(parseStatementDate(input).iso,input).toBe(expected);
});
it('F-010 impossible named-month dates must not silently roll into the next month',()=>{
  for(const bad of ['30 Feb 2026','Feb 30, 2026','31 Apr 2026'])expect(parseStatementDate(bad).iso,bad).toBe('');
});
