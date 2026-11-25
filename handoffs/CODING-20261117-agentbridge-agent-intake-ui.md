# AgentBridge next coding mission — agent-first intake and staging UI findings

Base: deployed v2.7.4 `9eb13dabc3bd988bec2ed9e6bb2d17ded05db767`, tree `aa7ff89b146d8f2532dd5a5ef350a0e530e21d6b`. Review repository AGENTS before editing. This handoff authorizes implementation preparation; owner deploys. Do not replay closed QA financial actions or alter existing QA/company grants. Publish a reviewable candidate, exact SHA/tree, version, CI and migration notes. Do not claim customer readiness.

## 1. Agent-first intake, without mandatory server OCR

User requirement: users attach invoices to their chosen AI chat; the agent extracts facts and transfers the original file plus facts to BookOne. Implement a versioned API/MCP contract that works with no OCR endpoint/key. MCP does not automatically forward chat attachments; document the supported binary transfer/upload mechanism, limits and client capability failures. Do not accept arbitrary server file paths or fetch arbitrary URLs.

Separate raw-document intake from extraction. Persist the owned original with content hash and durable document identity. Accept initial agent-extracted structured facts against that tenant-owned identity and expected revision/hash; retain agent/extractor provenance and page/evidence references. Never require an extractor-created proposal before facts can be supplied. Preserve compatibility for optional server extraction and clearly label fixture extraction; do not silently use a fixture as live extraction.

Treat facts and invoice text as untrusted input. Server owns enabled company rules, tax/account mapping, decimal calculations, permissions, duplicate detection, clarification requirements and authoritative preview. Reject invented/unknown rule identifiers. The same canonical facts and policy must produce the same server outcome across model types; do not promise identical reading accuracy across models. Missing/contradictory facts must remain questions, not guessed accounting decisions. Do not execute instructions embedded in invoices.

Preserve existing separate human approval, approval binding to exact revision/preview, posting stop, draft-only, authorization rechecks, operation idempotency, concurrent request handling and lost-response reconciliation. No tool should bypass them. Retries must not create a second document/proposal/bill for the same logical request. Recover an existing failed source with supplied facts without forcing reupload. Do not weaken duplicate or tenant checks.

Current gap: `packages/agent-bridge/src/service.ts` submitDocument always calls runExtraction; proposePurchaseBill requires proposalId and updateDraft requires an existing proposal. Current submit_document tool accepts file bytes/textHint, not an initial facts object. Extend the real deployed runtime, not only a MemoryStore mock.

## 2. Actionable failed-document UX

Actual persisted staging upload shows failed but “Extractor pending (fixture or unconfigured)” with no useful cause, fields or recovery action. runExtraction catches failure, saves only status and returns an error ignored by submitDocument. Persist safe error code/reason and expose accurate next actions. Unconfigured optional OCR should allow awaiting agent/manual facts. Distinguish upload saved from proposal available; allow explicit supported retries against existing identity with clear progress. Do not display secrets or raw provider errors. Native no-file validation already works; retain it.

## 3. Jobs role-bound form state (priority P1)

Actual browser: Cashier→Owner leaves none selected although Owner is settled; reload yields write. Owner→Sales leaves write selected; reload yields none. No job save occurred in QA, so persisted escalation is not claimed.

`apps/web/src/components/team/team-jobs-screen.tsx` uses router.push for role changes, an unkeyed form, rows keyed only by section prefix and uncontrolled defaultValue selects. Bind controls and submission to the current role identity/revision; reset/remount or use properly controlled role state. Handle stale navigation responses and unsaved edits deliberately. Prevent a hidden target role changing while controls show another role. Preserve server Owner checks and catalog permission semantics.

Required real browser regression: Owner→Sales→Viewer→Owner and reverse, including slow/rapid transitions, reload equality, and save/readback using a disposable job. Verify a save cannot cross role identity. Do not use production grants for testing.

## 4. Backup storage-aware missing warning (priority P2)

Actual source backup reports0 files/1 missing; authenticated data archive contains the sole DB-backed invoice blob byte for byte. Data restore into a fresh empty staging target restored vendor/document and safety flags, with zero journals. Separate attachment pack and restored raw download were not exercised.

`packages/db/src/archive/snapshot.ts` collects storageKey/key from agent_bridge_documents and agent_bridge_blobs; `apps/web/src/lib/tenant-archive.ts` attempts S3 retrieval for those keys and increments missingCount when absent. Recognize DB-backed blobs already carried by data snapshot; do not classify them as missing S3 objects. Continue detecting genuinely missing external objects. Keep data/files pair integrity and restored tenant key remapping; do not suppress every missing warning. Check status after an actual download too: current screen still says no backup downloaded; treat that as a separate UX review, not a proven failed download.

## Required acceptance / QA gate

- With OCR env absent, authenticated real API/MCP submission of original+facts yields reviewable proposal, safe preview and explicit human approval flow; original bytes remain retrievable with tenant permission.
- Golden invoice cases: net1000/VAT180/gross1180, VAT-exempt, malformed totals, uncertain date/currency/vendor, duplicate invoice/hash, missing items, and hostile instruction text. Expected server outcomes must be recorded independently from model output.
- Actual Next+Postgres runtime: Owner approval and exactly one bill/journal under duplicate/concurrent/retried requests; changed revision invalidates approval; Viewer/nonmember denied; lost response reconciles existing receipt without reposting. Tests must exercise deployed authorization and posting integration.
- UI: upload→await-agent/clarify→preview→approval/status; safe errors/recovery using existing document; Jobs role-bound values and disposable save/readback.
- Recovery LAST: encrypted backup/restore to a distinct empty target; exact raw invoice bytes, remapped ownership, proposal/operation references where present, approval revocation, safe flags, accurate DB/S3 missing counts, unchanged source. A data-only restore cannot stand in for all attachments-pack cases.
- Keep CoreGuard mandatory before image publication and report actual branch/ruleset enforcement separately. Run existing quality checks; provide exact commands/results. Product tests and mocked adapters alone are not external-client/browser acceptance.

External OAuth/client credential configuration remains a separately disclosed integration dependency; do not create broad credentials or enable posting in existing companies. Optional OCR must not block the agent-first path. After owner deployment, QA starts a fresh dated clock and fresh gates against the exact live candidate; preserve all consumed staging and historical actions.
