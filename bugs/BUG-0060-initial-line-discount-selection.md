# BUG-0060 — Initial percentage line selector calculates a fixed discount

Status: reproduced; open. Category: product. Priority: **P1** (high). First/current observed candidate v2.5.11 ·0bcdf4d; earlier affected versions unknown. See [consolidated run](../runs/RUN-20261016-broad-workflows.md) and [exact manual checks](../runs/CHECKS-20261016-broad-workflows.json), groupBW-S01.

## Evidence

Product: **v2.5.11 · 0bcdf4d**, SHA `0bcdf4d992c6e7254448ab27ee2e7bfc1535ec8c`. Environment: owner-authorized disposable staging https://bookone.clossyan.com. Browser: connected Chrome, same user tab, supported UI only. QA documentation branch `qa/broad-workflows-20261016`; base `ef3838ad804987d7ba299b1e648a5ca3f7148332`, intent commit `d90a839ff26110d626abd8d41999cd90a7285626`, checkpoint revision `8d2639cc8d6664ac3dc36b8c868e5f0a7da987b3`. No product or test implementation changed. Previous isolated automated results are historical, not rerun here. Rulebook 1.0.0 / `abcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc`, referenced rules revision1; expert review remains pending.

- Actor/settings: continued existing synthetic QA/Owner company; no fresh-login/role acceptance. Sri Lanka/LKR/Asia-Colombo;VAT0,approvalOFF,duplicate-billblockON,requireGRNOFF,GRNIOFF,last-cost,negative-stockallow; no settings mutation.
- Rules: BR-SAL-03 revision1.
- Preconditions: BW261016 run-owned records as listed in the consolidated fixture table. Normal supported UI; no database repair, request injection or financial replay.

### Reproduction

Quote physical3×100, initial visible line selector%,value10; header5%. Save/convert QT0001→SO0001→INV0001. Separate new Service free-text2×100,%10; compare before/after toggling LKR→%.

**Expected:** Physical line270,header13.50,total256.50. Service line180 regardless of whether selector touched.

**Actual and persisted effects:** Physical line290/header14.50,total275.50 saved and posted; AR/revenue275.50. Service initial190; toggling LKR→% immediately corrects same inputs to180.

**Observed boundary:** Initial selection/state mismatch is demonstrated; exact component root cause unreviewed. Explicitly toggling is only a bounded workaround for new unsaved lines; issued facts need supported correction.

First attempt preserved. Trigger executed once per named variant unless separate control explicitly described. Frequency across other accounts/builds/races is unknown. Screenshots were captured in browser session only; no durable screenshot checksum/trace archive. Sanitized DOM-visible outcomes and retained synthetic documents are canonical evidence. No private credentials, real customer data, raw logs or tokenized links published.

## Investigation

Confirmed: observations above. Component/internal exception/database root cause unverified; no new product graph tools were available in this session. This is deployed behavioural evidence, not a source review. Check adjacent source conversions, product types, history, settings and roles before classifying shared causes. No blanket workaround or data migration accepted. See handoff for bounded workarounds/control distinctions.

## Fix and regression

No fix commit or passing retest yet. Add a lasting independent assertion for the exact expected/actual example and adjacent valid/invalid transitions; critical gates need failure-sensitivity evidence. Retest on a fresh run-owned fixture with exact new product/QA/runtime fingerprint. Verify zero forbidden financial/stock/audit changes on rejection and preserved valid positives; inspect role/period/tenant boundaries. Retain original evidence and assess existing-record correction without silently rewriting issued history. Do not close from source change/CI alone.


## Appended v2.5.12 retest — 2026-10-16

Untouched default percentage selector now applied10% to3x100, line270; header5%13.50,total256.50. Conversion QT→SO→INV preserved256.50; bounded positive.

Candidate ead3a82170e7a34ad625ec6ef8434e5ae65b1609. [Exact run and boundaries](../runs/RUN-20261016-v2512-browser-deep.md), [assertions](../runs/CHECKS-20261016-v2512-browser-deep.json). Original observations above remain immutable; this is scoped follow-up, not blanket closure.
