# BookOne customer-readiness status

Customer readiness is **not certified**. Candidate source **v2.5.6 /d5377d8**; live sidebar now confirmed v2.5.6 /d5377d8. [Read-only live smoke](runs/RUN-20261015-v256-live-read-smoke.md) confirms Backup loads and traded-company restore is disabled in the UI. Existing administrative session only; full deployed workflow acceptance remains open.

[Latest campaign](runs/CAMP-20261015-015814708-878549.json): **292 checks:291 passed,1 failed,zero skipped/blocked/flaky/not-run**. CI38668445673. [PostgreSQL](runs/RUN-2026-10-15T01-58-15-584Z-runtime.json):117/118pass, no infrastructure failures,43/43 migrations. All98 retained units,60 source contracts and16 archive helpers pass.

**[BUG-0043 /RT-047](bugs/BUG-0043-module-off-historical-detail.md)** is the sole failing selected check: Owner historical invoice detail is denied after Sales-off. New invoice/payment writes are denied correctly, report profit100 is preserved, business snapshot unchanged. [Coding handoff](handoffs/HANDOFF-20261015-v256-retest.md). Retain fixed read-job/scope/tenant protections while restoring permitted historical reads.

All19 previous failure cases now pass across the thirteen groups (0031/0032/0024 omission/0033-0042); current bug files and ledger record bounded results. Full feature/credential/browser/storage acceptance remains pending. First v2.5.6 run290pass/2fail is preserved: B-104 stopped on a source-inconsistent credit fixture before reporting amounts. Corrected to copied source description,0.5 at original200; same independent100 credit,250 receipt,250 remaining AR,500 income and all prior assertions pass. No expectation or rule change, no original defect reopened from that failed prerequisite.

[Readiness ledger](memory/customer-readiness.json):137 workflows62partial bindings/75unbound/zero fully accepted. Counts are not customer-readiness percentages. Full physical/service/digital/rental/mixed/settings/roles/files/history/recovery scope and expert RF-01-10 remain open.

Next: coding fix/CHG for BUG-0043, deliberate candidate review/pin, then RT-047 plus full292 regression. Complete normal-role physical-first UI and real encrypted archive A-to-new-empty-B with attachment bytes, then remaining business/expert/operator recovery gates.

Browser dependencies: exact synthetic Owner/Admin/Viewer account/role approval remains pending. The previous popup no longer blocks navigation in this session. Automatic review rejected the unapproved specific Admin grant; do not bypass. Only disposable source-company setup was created earlier through the supported flow; no new staging users/trade/stock/files/archives in this retest. Private journal/secrets retained. No product source edits, production access, company-reset SQL, shared-staging faults or public secrets/raw evidence.

Read SESSION.md, AGENTS.md and memory/programme.json. Prior exact indexes retained in memory/history/STATUS-before-v256-result-20261015.md and SESSION-before-v256-result-20261015.md; all first attempts and fixture corrections remain in immutable evidence.
