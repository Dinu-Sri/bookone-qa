# BUG-0059 — Purchase bill can generate two full posted returns

Status: reproduced; open. Category: product. Priority: **P1** (high). First/current observed candidate v2.5.11 ·0bcdf4d; earlier affected versions unknown. See [consolidated run](../runs/RUN-20261016-broad-workflows.md) and [exact manual checks](../runs/CHECKS-20261016-broad-workflows.json), groupBW-P04.

## Evidence

Product: **v2.5.11 · 0bcdf4d**, SHA `0bcdf4d992c6e7254448ab27ee2e7bfc1535ec8c`. Environment: owner-authorized disposable staging https://bookone.clossyan.com. Browser: connected Chrome, same user tab, supported UI only. QA documentation branch `qa/broad-workflows-20261016`; base `ef3838ad804987d7ba299b1e648a5ca3f7148332`, intent commit `d90a839ff26110d626abd8d41999cd90a7285626`, checkpoint revision `8d2639cc8d6664ac3dc36b8c868e5f0a7da987b3`. No product or test implementation changed. Previous isolated automated results are historical, not rerun here. Rulebook 1.0.0 / `abcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc`, referenced rules revision1; expert review remains pending.

- Actor/settings: continued existing synthetic QA/Owner company; no fresh-login/role acceptance. Sri Lanka/LKR/Asia-Colombo;VAT0,approvalOFF,duplicate-billblockON,requireGRNOFF,GRNIOFF,last-cost,negative-stockallow; no settings mutation.
- Rules: BR-PUR-01 revision1, BR-STK-01 revision1, BR-ACC-03 revision1.
- Preconditions: BW261016 run-owned records as listed in the consolidated fixture table. Normal supported UI; no database repair, request injection or financial replay.

### Reproduction

PUR0001 physical4×60=240; pay100. Create return makes PR0001 total240,allocated140,credit due100. Reopen original paid240/due0: Create return still present. Click it once more.

**Expected:** Reject second return; cumulative linked returns at most4 units/240, with zero extra stock, AP and journal writes.

**Actual and persisted effects:** PR0002 again4×60=240; both returns posted. Expanded PR0002 journal DrAP2100 240/CrInventory5100 240. Total returned8 units/480 against purchase4/240.

**Observed boundary:** Fresh deployed purchase variant adjacent to BUG-0038; sales extra1 attempt produced no second visible SR or journal. Exact stock ledger not verified.

First attempt preserved. Trigger executed once per named variant unless separate control explicitly described. Frequency across other accounts/builds/races is unknown. Screenshots were captured in browser session only; no durable screenshot checksum/trace archive. Sanitized DOM-visible outcomes and retained synthetic documents are canonical evidence. No private credentials, real customer data, raw logs or tokenized links published.

## Investigation

Confirmed: observations above. Component/internal exception/database root cause unverified; no new product graph tools were available in this session. This is deployed behavioural evidence, not a source review. Check adjacent source conversions, product types, history, settings and roles before classifying shared causes. No blanket workaround or data migration accepted. See handoff for bounded workarounds/control distinctions.

## Fix and regression

No fix commit or passing retest yet. Add a lasting independent assertion for the exact expected/actual example and adjacent valid/invalid transitions; critical gates need failure-sensitivity evidence. Retest on a fresh run-owned fixture with exact new product/QA/runtime fingerprint. Verify zero forbidden financial/stock/audit changes on rejection and preserved valid positives; inspect role/period/tenant boundaries. Retain original evidence and assess existing-record correction without silently rewriting issued history. Do not close from source change/CI alone.


## Appended v2.5.12 retest — 2026-10-16

Full supplier return240 applied140/credit100; repeated Create return created no extra PR/journal. One new PR0003. Race/idempotency-key boundaries unrun.

Candidate ead3a82170e7a34ad625ec6ef8434e5ae65b1609. [Exact run and boundaries](../runs/RUN-20261016-v2512-browser-deep.md), [assertions](../runs/CHECKS-20261016-v2512-browser-deep.json). Original observations above remain immutable; this is scoped follow-up, not blanket closure.
