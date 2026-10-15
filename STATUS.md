# BookOne customer-readiness status

Customer readiness is **not certified**. Source/live stamp **v2.5.7 /7ffafab** confirmed. [Current handoff](handoffs/HANDOFF-20261015-v257-regression-and-live-next.md).

[Latest300-check campaign](runs/CAMP-20261015-030413695-b7f7f0.json): **300 passed,zero failed/skipped/blocked/flaky/not-run**. CI38674272156. [PostgreSQL](runs/RUN-2026-10-15T03-04-19-509Z-runtime.json):126/126pass, no infrastructure failures,43/43 migrations. All98 retained units,60 source contracts and16 archive helpers pass. The coordinated workflow intentionally stays nonzero until full137 workflows/policies are accepted; selected checks passing is separate from release acceptance.

BUG-0043 original RT-047 and eight new module-off controls RT-052-059 pass at bounded runtime: permitted history/print, Viewer writes denied, Warehouse/branch/explicit-deny/suspended/personal/pending/foreign-tenant restrictions preserved, denied-action business snapshots unchanged. These use synthetic authentication and real non-owner PostgreSQL, not fresh credential/HTTP/browser acceptance or complete security certification. All old failures/fixture corrections immutable.

**Manual live finding:** [BUG-0044](bugs/BUG-0044-signup-policy-links.md), P2: all three signup policy links leave /login# with no document/dialog. Three manual failures, separate from300 passing automated checks; legal impact not assessed. [Evidence](runs/RUN-20261015-v257-signup-policy-links.md).

**Live work waits at prepared signup.** Existing admin signed out; P257-Owner synthetic signup filled, NOT submitted. The page says signup accepts Terms/Privacy/Cookies (links#); specific at-action approval requested under browser rules and still unanswered. No new account/company/live transaction/file/archive created. User authorises many supported synthetic signup companies; this does not bypass earlier existing-company Admin grant rejection. Private accounts/journal/planned ledger in .local/live-v257/.

Next: after approval submit prepared account and complete supported onboarding/identity/settings checks. Physical first:1000 opening capital,10units at60, sale4at100, receipt150, return1at100/cost60, supplier payment200. Planned final cash950/AR150/AP400/stock7/value420/profit120; not observed. Continue service/digital/rental/mixed/settings/users/files/history. **Real backup/restore LAST** by owner instruction. No company-reset SQL or overwrite of traded target.

[Readiness ledger](memory/customer-readiness.json):137 workflows62partial/75unbound/zero fully accepted; expert RF-01-10/operator recovery/real storage/history gates remain. No overall readiness percentage. No production access, product source changes, shared-staging faults, public credentials/cookies/archives/raw traces. Read SESSION.md and AGENTS.md. Exact previous indexes retained in memory/history/STATUS-before-v257-result-20261015.md and SESSION-before-v257-result-20261015.md.
