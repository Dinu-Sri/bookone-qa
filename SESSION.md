## v2.5.6 first run completed; follow-up required

First292-case rerun290pass/2fail/zero skips/blocks; all19 previously failing cases pass. B-104 stopped on source-inconsistent credit fixture before financial observations; corrected to original description and0.5 at200 while preserving credit100 and all financial assertions. RT-047 historical Owner read after Sales-off fails; numeric denial observation added without changing expectations. Preserve first reports; new fingerprint/retest required. See changes/CHG-20261015-v256-independent-retest.md. No product bug closure or live acceptance yet.

## Candidate v2.5.6 independent retest in progress

Product source pinned d5377d89d2bd9d27c52a6e9c43376f2d03255bd0 /VERSION2.5.6; prior292 assertions unchanged. No new result or bug closure yet. Read changes/CHG-20261015-v256-independent-retest.md. Live page still displays v2.5.5 /8e1a2b8; browser/restore acceptance must wait for the matching stamp and pending access/popup dependencies. Historical candidate/results below remain immutable.

# Resume BookOne QA

1. Read AGENTS.md, STATUS.md, memory/customer-readiness.json and memory/programme.json. Check canonical QA main and pending PRs; verify product/QA identities and graph freshness.
2. Current candidate8e1a2b8/v2.5.5. Latest292-case campaign273pass/19fail/zero skips; PostgreSQL99/118, no infrastructure failures. Thirteen finding groups across four handoffs remain open. RT-051 Warehouse variant executed; same BUG-0041. No full workflow/release acceptance.
3. Read applicable handoffs, rulebook and immutable fingerprints. Preserve original expectations, first failures and invalid-fixture corrections. Source/QA/fixture changes need a new run; never reuse a prior pass.
4. Use pnpm session:start, product:prepare, check and campaign:plan. Runtime preparation/reset/revoke/fault/race commands target only verified fresh ephemeral loopback PostgreSQL16 named bookone_qa_runtime, never staging/tunnels. Runtime lanes serial. Latest publication changes evidence only; no new technical changes or repeat campaign required.
5. Unit/campaign generates deterministic private synthetic bank fixtures; retain actual byte hash. Parser checks do not certify every bank format. Resume only interrupted work at identical fingerprint; never replay live payments from public summaries.
6. Fresh fixture login and loaded actor/job/build evidence precede role-specific UI mutations. Exact synthetic account/role approval and Chrome popup dismissal pending. Do not reset passwords or use alternate creation paths to bypass review. Missing private state must be disclosed; never request public secrets.
7. Supported source-company creation is the only new staging setup. Private journal/secrets retain IDs; no new users/trade/stock/attachments/archives. Restore into supported newly empty target, never SQL reset or traded tenant. Credentials/cookies/encrypted archives/passwords/raw traces stay ignored/private.
8. Record exact build/rule/QA/fixture identities, executed versus accepted evidence, actual creations/cleanup, blockers and next actions in indexes/ledgers. Priority: product fixes and retesting, then real browser/archive and remaining business/expert/operator gates. Green CI/helpers/synthetic identities/balanced totals do not certify readiness.

Previous exact indexes retained in memory/history/SESSION-before-role-followup-20261014.md and STATUS-before-role-followup-20261014.md. Full goal remains customer readiness for declared physical/service/digital/rental/mixed scope. Existing attribution corrections and all immutable attempts preserved.
