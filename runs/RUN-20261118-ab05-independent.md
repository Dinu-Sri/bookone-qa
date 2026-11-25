# AgentBridge v2.8.0 independent staging review — fixes required

Product43233f0d3fade99228f6e7590f1e7e86d6b91370/treefbda63ca4e60e44f4a512f5200f8839695a2a123; v2.8.0 live stamp independently observed. QA initial pinb8afcdc; remaining-only date reviewc07ebe8. No separate ERP server/database was started. Product checkout remains unchanged. This result covers17November partial checks plus explicitly reviewed18NovemberUTC continuation; original source invoice date17November is preserved.

## Clock and interruption

First run CLOSED43878245ms/0paused. File-chooser call held43032.5057seconds, exceeding180minutes; a selected file was returned but Receive had never been clicked. No document/financial intent before closure. Its exact ledger remains in CLOSING-20261117-ab05-first-attempt.json. No reset or inferred credit pause.

Reviewed18November successor carries only consumed company/Inbox/VAT/vendor setup, uses a NEW clock and fresh build/company/flags/source/hash/regression gates. The original selected file was submitted once without another file-chooser call. Final continuation closure/publication receipt follows separately.

## Exact-source checks

AgentBridge/auth/accounting suites:50files425tests passed. Repeated once for the new dated continuation gates:50files425passed. These are product unit/contract tests, NOT actual PostgreSQL posting acceptance. Initial sandbox Corepack network failure, bundled-pnpm store permission failure, and accidental parent QA Vitest config discovery failure were retained privately before corrected explicit configuration. Dependency installation completed against the frozen lockfile. No expectation weakened to make these pass.

Exact deployed commit CI independently queried: [Production Check44071214578](https://github.com/Dinu-Sri/BookOne/actions/runs/44071214578) and [Docker44071214689](https://github.com/Dinu-Sri/BookOne/actions/runs/44071214689) completed success. Their success does not override the independent failures below; actual branch-protection/promotion enforcement was not requalified.

Independent new service tests:5failed/0passed. First bounded suite4failed; fifth added specifically to verify stale approval consequence, final5failed. These run actual product service with MemoryStore and a recording posting port, without ERP/DB or staging financial effects.

| Independent expectation | Actual outcome |
| --- | --- |
| Concurrent same-key upload stores one document | Both succeed,2documents. |
| Changed semantic facts with same key are refused | Changed description returnsok:true. |
| Selected6800 category label is General Expense | Displays Cost of Goods Sold. |
| Approved facts can be corrected with fresh revision and approval invalidation | Illegal awaiting_approval→draft error, after proposal write. |
| Superseded proposal cannot reuse old approval to post | Service returns posted through recording port after old-proposal request/commit sequence. |

Reproducer: tests/runtime/ab05-independent-review.test.ts and vitest.ab05-independent.config.mjs. No live unauthorized bill or PostgreSQL race is claimed; real runtime outcome tests are required for the repair.

## Actual staging outcomes

| Case | Disposition | Evidence / limit |
| --- | --- | --- |
| Public and protected v2.8.0 build | PASS |43233f0 observed; fresh protected18Nov gates also passed. |
| Original company opening and settings | PASS | Cash771.20/net120/ARAP0/23posted; InboxOFF/draftON/postStopON, no changes. |
| Jobs Cashier→Owner→Sales→Viewer→Owner | PASS | Current role Inbox values none/write/none/read/write; no reload or grant save.17Nov actual check retained. Disposable save/concurrent navigation not qualified. |
| Fresh synthetic company and zero opening | PASS | New setup once; InboxON/draftON/postStopON, VAT18 and one vendor balance0. |
| No-OCR original receive | PASS |922-byte original stored once; awaiting_facts, useful explanation and usable facts form. |
| Manual initial facts and exact date | PASS | Supplier/invoice/date17Nov/net1000/VAT180/gross1180 stored; draft→validated. |
| Authoritative preview | PASS | Dr6800=1000,Dr2300=180,Cr2100=1180; exact1180payable, no posting. |
| Category display and draft edit | FAIL | General Expense6800 selected, saved label Cost of Goods Sold(6800); no draft edit form/action. No wrong posted account claim. |
| Connections screen | PASS (bounded) | Empty table and narrow-scope/human-approval explanation. No connection created. |
| Production OAuth / real Codex / real Claude | BLOCKED | Discovery points to own endpoints; JWKS empty. Source token path only mints fixture HMAC and requires tenant hint; production issuer/client not qualified. |
| Browser upload-session fallback | FAIL (source integration) | Session query only changes copy; upload action ignores it and does not finalize session. Not tested with real client. |
| Backup prepared classification | PARTIAL / FAIL | Prepared pair says0S3packed/1DB-backed; same page health still says1attachment missing. One pair created; no download or restore. |
| Actual approval/posting/retry reconciliation | BLOCKED | Independent critical failures; posting flags leftON for stop/draft. No financial approval or dispatch intent. |
| Fresh encrypted recovery LAST | BLOCKED | Functional acceptance failed first; no new target or restore. Prior-version recovery not relabeled as current proof. |
| Original Owner/session closing | PASS | Original dashboard restored unchanged: cash771.20/net120/ARAP0/23posted. |

## Reconciliation and preserved state

Fresh source retained: one vendor, one stored document, one validated proposal; zero staging bills/journals/stock/payments/shifts. One backup pair prepared, not downloaded/restored. No original-company business/config/grant writes. No external OAuth consent/credentials created. All dispatched application actions reconciled; no unknown financial outcome. A workspace-switch click gave no effect; server reload verified original fresh company, then keyboard activation completed switch and normal Owner login. Retain that tool anomaly without asserting a new product switch defect. Browser debug detachment also recovered on the same tab. Original Owner dashboard left visible; user tabs untouched.

Raw snapshots/screenshots, original bytes, encryption password and tool logs remain private under ignored.local/ab05. Public files contain synthetic reproducers and sanitized summaries only. No current customer-launch or posting activation approval.

## Next

Give coding agent handoffs/CODING-AGENTBRIDGE-06.md. Prioritize current-proposal/approval safety, atomic upload/facts idempotency and complete fallback before real client enablement; finish UI/category/archive-health inconsistencies and production OAuth integration. Scope stays supported unpaid service invoices; no universal standards engine. Owner deploys a new candidate, then independent new-clock acceptance and recovery LAST. Preserve this source and all old consumed financial queues.
