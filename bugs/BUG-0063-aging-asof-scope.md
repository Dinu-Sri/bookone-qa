# BUG-0063 — AR and AP aging include future-issued documents

Status: reproduced; open. Category: product. Priority: **P1** (high). First/current observed candidate v2.5.11 ·0bcdf4d; earlier affected versions unknown. See [consolidated run](../runs/RUN-20261016-broad-workflows.md) and [exact manual checks](../runs/CHECKS-20261016-broad-workflows.json), groupBW-R01.

## Evidence

Product: **v2.5.11 · 0bcdf4d**, SHA `0bcdf4d992c6e7254448ab27ee2e7bfc1535ec8c`. Environment: owner-authorized disposable staging https://bookone.clossyan.com. Browser: connected Chrome, same user tab, supported UI only. QA documentation branch `qa/broad-workflows-20261016`; base `ef3838ad804987d7ba299b1e648a5ca3f7148332`, intent commit `d90a839ff26110d626abd8d41999cd90a7285626`, checkpoint revision `8d2639cc8d6664ac3dc36b8c868e5f0a7da987b3`. No product or test implementation changed. Previous isolated automated results are historical, not rerun here. Rulebook 1.0.0 / `abcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc`, referenced rules revision1; expert review remains pending.

- Actor/settings: continued existing synthetic QA/Owner company; no fresh-login/role acceptance. Sri Lanka/LKR/Asia-Colombo;VAT0,approvalOFF,duplicate-billblockON,requireGRNOFF,GRNIOFF,last-cost,negative-stockallow; no settings mutation.
- Rules: BR-ACC-08 revision1, BR-DAT-01 revision1.
- Preconditions: BW261016 run-owned records as listed in the consolidated fixture table. Normal supported UI; no database repair, request injection or financial replay.

### Reproduction

INV0002=70 issued16Oct; AR Aging asof16Oct shows70, then set15Oct/Refresh. PUR0002=40 issued16Oct,due15Nov; AP asof16Oct before payment shows40,then set15Oct/Refresh.

**Expected:** Exclude documents issued after asof; both synthetic open totals0 before16Oct.

**Actual and persisted effects:** AR15Oct still70, future invoice with Days−1. AP15Oct still40, future bill due15Nov. After separate valid payment40 APcurrent0.

**Observed boundary:** Both future-issue variants confirmed. Historical payments/returns reconstruction not tested successfully; separate attempted payment date17Oct actually persisted16Oct, not valid evidence of future payment.

First attempt preserved. Trigger executed once per named variant unless separate control explicitly described. Frequency across other accounts/builds/races is unknown. Screenshots were captured in browser session only; no durable screenshot checksum/trace archive. Sanitized DOM-visible outcomes and retained synthetic documents are canonical evidence. No private credentials, real customer data, raw logs or tokenized links published.

## Investigation

Confirmed: observations above. Component/internal exception/database root cause unverified; no new product graph tools were available in this session. This is deployed behavioural evidence, not a source review. Check adjacent source conversions, product types, history, settings and roles before classifying shared causes. No blanket workaround or data migration accepted. See handoff for bounded workarounds/control distinctions.

## Fix and regression

No fix commit or passing retest yet. Add a lasting independent assertion for the exact expected/actual example and adjacent valid/invalid transitions; critical gates need failure-sensitivity evidence. Retest on a fresh run-owned fixture with exact new product/QA/runtime fingerprint. Verify zero forbidden financial/stock/audit changes on rejection and preserved valid positives; inspect role/period/tenant boundaries. Retain original evidence and assess existing-record correction without silently rewriting issued history. Do not close from source change/CI alone.


## Appended v2.5.12 retest — 2026-10-16

Original AR/AP future-issue exclusion passed15Oct cutoff0. Adjacent future-payment scope still OPEN P1: INV0003 issued16Oct256.50, receipt75.50/16Oct, DISTINCT1/17Oct;16Oct AR incorrectly180 instead181, aggregate250 instead251. Current180 correct. Preserve fixture. Date-fill first attempt was harness issue, not product date bug.

Candidate ead3a82170e7a34ad625ec6ef8434e5ae65b1609. [Exact run and boundaries](../runs/RUN-20261016-v2512-browser-deep.md), [assertions](../runs/CHECKS-20261016-v2512-browser-deep.json). Original observations above remain immutable; this is scoped follow-up, not blanket closure.

## Appended v2.5.13 independent retest — 17 October 2026

Preserved INV0003 now reconstructs181 at16Oct,aggregate251,current180. AR/AP15Oct0. New currently closed sources correctly reconstruct AR34.50 and AP206.50/100 before genuine future18Oct credits/payments; same-day18Oct effects apply. These scoped historical variants pass. Void/reversal/dimension/timezone/runtime/actor/race layers remain open; no global report/security acceptance.

Candidate1a1020127c4ff0f11ccd9d84d736c6b18b235fca. [Immutable next-wave report](../runs/RUN-20261017-v2513-next-wave.md) and [exact assertions](../runs/CHECKS-20261017-v2513-next-wave.json). Original observations and previous scoped retests above remain preserved.
