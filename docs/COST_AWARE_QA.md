# Cost-aware QA operating protocol — 1.0.0

Effective 18 October 2026 for agents and humans. Read AGENTS, STATUS, SESSION and applicable workflow rules first. Maintain these procedures on every relevant change. Aim for fewer credits and human interventions per evidence-backed case; do not lower required assertions to increase throughput.

## Division of work

Medium: inspect changes, select risk/impact, resolve independent expectations, diagnose unknown failures, implement adapters and review evidence. Light: execute a fixed, explicit, already planned queue; capture specified evidence and checkpoint; continue independent cases after recorded failures. Existing deterministic batch/campaign/runtime runners execute supported regressions without model reasoning per assertion. Reuse them before adding adapters. Their source, runtime and browser boundaries remain distinct.

The model is selected by the user. This protocol and the queue tool cannot change the chat model or keep a stopped chat running in the background. A continuation prompt improves task clarity, not a guarantee of autonomy. No new paid API, scheduler or parallel-agent service is configured.

## First pilot

Use queues/PILOT-v2515.json: 12 bounded scenarios, not 12 fully automated tests. Product agent reports v2.5.15 / 158ddc2; live deployment and full product SHA are still unverified. First inspect CHG-20261018-residual-duplicate-tax-form and actual a36af04..158ddc2 diff, confirm live stamp and fresh loaded actor/company, then bind opening states/settings. If deployment differs, stop mutations and record the blocker. QA does not deploy.

Run-owned independent fixtures are required per scenario. Preserve historical failing sources and all prior returns. The final reconciliation uses actual observed opening balances plus all recorded deltas, never assumed empty books. Keep fixture IDs and credentials private; use synthetic aliases publicly. Record stock quantities/layers where required; absent evidence is inconclusive, not a financial pass. Server authorization, races, audit, purchase analogues, upgrades and full business journeys remain separate required work. Backup/restore LAST.

## Checkpoint tool

From the QA repository with Node >=20:

```sh
node scripts/operator-queue.mjs plan queues/PILOT-v2515.json
node --test tests/infrastructure/operator-queue.test.mjs
```

A single operator maintains a private run directory, e.g. `.local/operator/P15-unique/`. Create it before initialization. Prepare `fingerprint.json` with nonempty strings: productSha (verified full 40 characters), liveStamp, qaSha (full), rulesHash, libraryHash, schema, configuration, actor, fixture. Configuration and fixture identify a versioned run plan including its intended settings transitions and starting snapshots, not an unrecorded mutable current flag. Bind actual per-case pre-state and evidence; changed unplanned settings or actor/candidate require a new run. Fingerprints are supplied by the operator and must be independently checked against reality before each case; the tool cannot observe the browser.

Commands below use P=.local/operator/P15-unique as a shell variable for brevity; set it to your actual private directory. No credentials belong in result summaries.

```sh
P=.local/operator/P15-unique
node scripts/operator-queue.mjs init queues/PILOT-v2515.json "$P/state.json" "$P/fingerprint.json"
node scripts/operator-queue.mjs pack queues/PILOT-v2515.json "$P/state.json" "$P/fingerprint.json"
node scripts/operator-queue.mjs start queues/PILOT-v2515.json "$P/state.json" "$P/fingerprint.json" P15-01
# Execute supported UI actions, then inspect persisted state. Never reissue an uncertain submit.
node scripts/operator-queue.mjs record queues/PILOT-v2515.json "$P/state.json" "$P/fingerprint.json" P15-01 "$P/P15-01-result.json"
node scripts/operator-queue.mjs summary queues/PILOT-v2515.json "$P/state.json" "$P/fingerprint.json"
```

A result contains status (passed/failed/blocked/inconclusive), actual (observations), evidence (object keyed by the scenario's evidence fields, values concrete sanitized readbacks/references), and nextAction for every nonpass. Required evidence keys are enforced for passes; the operator/reviewer must check their truth and meaning. The tool validates completeness, not business truth. Preserve raw evidence privately. Do not publish state files automatically. After every completed case and before an interruption, save a checkpoint. Append substep progress/intent/readback in a private scenario journal for multi-submit cases; a case checkpoint alone is insufficient to infer which return posted.

A running case on resume is an unresolved intent: inspect its journal, source, return list and financial state before recording a disposition. Never restart it automatically. Terminal results cannot be overwritten; a retest gets a new run. Only one operator/process may write a run. If an interrupted atomic write leaves state.json.tmp, preserve and inspect both files; do not delete evidence or guess. The pack prints one next case and current fingerprint to keep context short; obtain relevant rules and starting snapshots too.

## Continue and escalate

Do not stop after each successful case or after finding a few bugs. Continue until all 12 have dispositions, the declared session budget is reached, or a genuine blocker prevents safe work. Record each first failure, then continue independent isolated fixtures. Stop dependent actions when prerequisites fail. Settings restoration and reconciliation are mandatory before closing when feasible, even after a case fails. Explain any restoration blocker.

Escalate to Medium for new/ambiguous expectations, unexpected financial/stock/permission effects, stale build/actor, unclear submit outcomes, harness defects, missing fixture access, policy decisions or workbook changes. Light records evidence and next action; it must not revise expectations or close bugs on its own. Product defects remain red. Continue unrelated cases only after their actor/configuration/opening state is verified safe. Critical money/access/data failures deserve prompt reporting, even within a large batch.

For deterministic source campaigns keep using `pnpm batch:plan --batch <ID>`, `pnpm batch:run --batch <ID>` and `pnpm batch:resume <runID>`; full orchestration already exists through campaign:plan/run/resume. Read docs/BATCH_TESTING.md and the selected manifest before execution. Those source pins are not the live v2.5.15 candidate. Do not silently advance product-ref.json. Browser queue completion does not implement missing adapters.

## Coverage and measurement

coverage/browser-evidence-index.json inventories 347 historical assertions across five runs. Eleven have reviewed related-partial links to four workbook cases; 336 remain unmapped. No complete canonical case is accepted by this index. Candidate repetitions and single-layer assertions cannot be divided by 271 to calculate ERP completion. Canonical specs/bindings remain unchanged. Subsequent mapping reviews must verify assertion meaning, case revision, candidate and missing layers before adding links; never infer full execution from text similarity.

For each pilot record model/setting, wall time, cases with complete required evidence, passed/failed/blocked/inconclusive, human interventions, unknown failures escalated, automation versus browser work, and credits if actually observable (otherwise unavailable). Compare equivalent scopes/fingerprints; no invented credit savings. Review Light results with Medium before broad rollout. Then add validated adapters for repetitive cases in the existing runners, with failure-sensitivity checks for critical assertions. The current queue is an execution aid, not unattended browser automation or a release gate.

## Prompt to use after selecting Light

Continue BookOne QA using docs/COST_AWARE_QA.md and queues/PILOT-v2515.json on branch qa/cost-aware-pilot. Read STATUS/SESSION and only relevant rules/evidence. Verify candidate and actor before mutation. Run the entire fixed queue with independent fixtures and checkpoint each case/submission; preserve first failures, continue independent cases, and do not stop after one case or a few bugs. Inspect persisted state before any uncertain replay. Escalate unknowns with evidence for Medium. Finish with sanitized run/handoff, exact remaining scope, settings restoration and financial reconciliation. Do not deploy, reset, repair historical failure fixtures or claim missing evidence passed. If infrastructure or context limits stop execution, publish a precise checkpoint and next action.

## First pilot outcome — 18 October 2026

The [v2.5.15 run](../runs/RUN-20261018-v2515-pilot.md) completed all 12 dispositions: 10 passed, 1 failed, 1 blocked, with no additional user prompt. Checkpointed execution took 33.1 minutes; model setting and credits were not observable, so cost savings are not established. Medium review is required for incomplete server-error retention, the residual fixture conflict and pilot evidence before broader rollout. Do not rerun the frozen queue against consumed fixtures. Use STATUS/SESSION and the latest handoff as the continuation point.

The [PR43 technical review](../reviews/REVIEW-20261018-pr43.md) completes the source investigation and fixture design. It preserves the original pilot results and identifies two additional source-level residual concerns. Follow the new versioned queue only after its prerequisites are verified; the legacy upgrade environment remains unavailable. Review completion does not close product findings.



## PR46 review and mission02

Read reviews/REVIEW-20261018-pr46.md and handoffs/HANDOFF-20261018-light02-mission.md. Light02 is frozen to v2.5.16/b2c5205 with18plannedslots and75execution+15closing active minutes; idlecreditwaiting is recorded separately. Capture error OR successnavigation with persisted readback; a timeout alone proves neither rollback nor failure. Verify controlled date values after rerender. Codingmission is separate; do not deploy across the run. All supplier/VAT/stock configuration variants must be explicit and restored. Newcandidate requires Mediumreview/newqueue. Priorfailures and corrections remain immutable; canonicalcaseacceptance and modelcredit savings are not established.
