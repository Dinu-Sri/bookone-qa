# AgentBridge v2.7.3 retest — 16 November 2026 UTC

Exact clean product `382f0d8f7e242817d046b20c0f16fa05a0a3153a`. Fresh successor checkout/clock/PostgreSQL fixture. **One newly established permission-key integration defect blocks Owner approval; activation stays off.** Never resume any consumed review/Mission2/CONT action.

## Observed results

- Public login and protected Owner staging sidebar both display `v2.7.3 · 382f0d8`. Current company Inbox OFF/draft-only ON/posting-stop ON, unchanged. Existing session reused, zero auth submissions and zero staging financial/config/master/grant/shift/restore actions. Navigation timed out once; later observation showed the intended page, with no replay. Agent-created tab closed.
- Docker43879381604 and Production Check43879381524 report success; same-SHA Production Check43879376600 also success. Workflow publication still depends on quality and CoreGuard. GitHub API still reports master unprotected, no required checks and empty rulesets. No settings or deployment changes.
- Product AgentBridge regression **44/44 passed**; original independent service checks **5/5 passed**.
- Actual non-owner PostgreSQL16,47migrations successfully applied. Runtime acceptance **6 passed / 1 failed / 2 blocked**. Vitest encodes the two blocked prerequisite cases as skipped; receipt explicitly adjudicates them blocked, not completed acceptance or pending execution.
- Exact permission resolver/template acceptance **1 passed / 3 failed**, all three failures are instances of the same new defect across Owner, Accountant and Purchasing. Viewer copied-grant denial control passes.

## AB-11 — catalog keys do not match resolver normalization

`packages/auth/src/permissions/catalog.ts` registers `agent_bridge.approve` and `agent_bridge.post`. Templates contain these exact grants at write level. `allows` in `permissions/resolve.ts:162` strips optional read/write suffix and then checks `${prefix}.write` for a write request. The actual keys become `agent_bridge.approve.write` / `agent_bridge.post.write`, which are not the granted keys.

Real `loadAccessForUser` on a standard synthetic Owner confirms job owner, both catalog grants present, but direct `allows('agent_bridge.approve','write')` and `allows('agent_bridge.post','write')` false. UI server actions call those same checks. The runtime Owner approval raises Missing capability approve after the new live-grant binding. Runtime posting may separately derive post from purchase.bills.write; that does not repair the explicit UI post permission check or missing approval. Do not conflate direct catalog permission failure with every possible service post path being denied.

Actual role resolver tests reproduce false for all three intended roles. Existing product permission tests assert grant-array membership and source strings; they do not exercise `allows` for these leaf capability keys. No permission bypass or artificial grant alias was introduced to force the positive path green.

## Previous three defects: current evidence

- AB-08 stale Viewer posting: independent negative control passes with a valid signed old post-scoped token, actual current grant loader, service factory and real DB. Refusal is specifically Missing capability post before even looking up a proposal; bill count stays zero. Full approved-proposal end-to-end case is blocked because legitimate Owner approval cannot be obtained.
- AB-09 receipt/document reconciliation: source now synchronizes the document and in-memory product regression passes. Fresh real-ERP reconciliation case remains BLOCKED by Owner approval; no claim that the full prior acceptance case passed.
- AB-10 attachments: actual encrypted tenant data restore LAST succeeds into a separate operationally empty synthetic tenant. Restored application attachment retrieval returns exact original bytes. Source snapshot remains exactly unchanged. Source1document/1blob/1matchingkey and target1/1/1; zero bills/journals because positive posting was blocked. Restored settings verified draft-only1/posting-stop1. This proves DB-blob attachment repair, not financial data recovery or S3 disaster recovery.

## Harness and scope notes

First unchanged v2.7.2 runtime run retained privately:4pass/4fail. One foreign-company test lacked an actual role binding in its membership; fresh current-grant enforcement correctly refused it. Added a real Owner role binding in the new v2.7.3 fixture. Actual Owner approval failure is a product defect, not waived. Dependent Viewer/full-reconciliation cases explicitly block, and recovery counts derive from actual source records. Added independent Viewer denial and restored-safety controls; final outcome6pass/1fail/2blocked. No expected business answer weakened. Initial product checkout path was corrected within verified workspace before installing dependencies/testing; old checkouts and clocks stayed unchanged.

Full actual Next+PostgreSQL positive browser workflow remains unqualified, and cannot be honestly completed while normal Owner approval is broken. Production OAuth wiring now exists and local JWKS product tests pass, but real IdP/client/remote OCR qualification remains unperformed. Branch protection remains absent; no blanket launch/customer-readiness approval. Existing company flags remain untouched.

Reproduce: install locked QA/product dependencies and verify exact `product-ref.json`. `node scripts/agentbridge-v273-review.mjs product` and `service`; `node node_modules/vitest/vitest.mjs run --config vitest.v273-permissions.config.mjs` for the pure actual-resolver acceptance. For `database`, prepare a NEW guarded loopback-only PostgreSQL16 `bookone_qa_runtime` using existing runtime prepare and private admin env; the lane truncates only its disposable fixture. Never run it against staging. Recovery is last. See sanitized receipt and `handoffs/CODING-AGENTBRIDGE-04.md`.
