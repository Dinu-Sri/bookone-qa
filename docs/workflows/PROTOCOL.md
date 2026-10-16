# Workflow definition and change protocol —1.0.0

Owner requested continuous,shared standards on2026-10-16. Applies to QA agents,coding agents,product/business owners,reviewers and human testers. The owner explicitly requires these as mandatory QA working procedures (2026-10-16), including maintenance, editing, expansion, correction and audit under AGENTS rules73–81. Draft business specifications still require independent review;no automatic release authority,access grant or product deployment follows.

## 1. Specification hierarchy

Applicable law/eligible accounting framework → canonical rules/rulebook.json and approved versioned policy decisions → business workflow specifications → test adapters/fixtures → immutable run evidence → candidate acceptance decision. Implementation is evidence,never its own oracle. When these conflict,open review;do not silently weaken tests.

Maintain shared invariants once. Business playbooks reference stable rule IDs/revisions and add applicability,sequence,fixtures and expected effects. A genuinely new business rule goes through templates/RULE_CHANGE.md,not private wording in one playbook. Keep professional adopted-default/expert-pending distinctions. Do not claim tax/recognition/rental applicability from a country label or an AI-authored example.

JSON in workflows/specs is canonical for starter families; workflows/library.json and workflows/casebooks contain the detailed business applications. Generated playbooks/workbooks are human views. Existing batches/coverage.json owns lifecycle task implementation evidence;campaigns own execution;these families compose their task IDs. Preserve S/RT/B/C/D/E/F identities. Do not count family→task mappings as executed coverage.

## 2. Define a family and its variants

A family represents a business goal and explicit start/end states,not a screen or list of fields. Use WF-PHY/SVC/DIG/REN/HYB-NNN;stable step IDs and family.VNN variants. New business concept gets a new family;new edge path usually gets a variant. Never recycle IDs. Retired items retain reason,replacement and historical links.

Detailed library applications use stable WB-TYPE.JNN journeys and WB-TYPE.JNN.CNN cases, referencing applicable starter families, rules and retained lifecycle tasks. Shared CORE/BANK/OPS books compose business-specific books without replacing the canonical rulebook or existing execution registers. Library schema/version and validation are separately declared in library.json. Consult LIBRARY.md and EXECUTION_GUIDE.md before execution; outlines with unresolved bindings/policies are not execution-ready.

Each specification requires: ID/revision/status/author/independent review;profiles;required capabilities and verified configuration prerequisites;rule revisions;existing task refs;feature impact tags;dependencies;synthetic opening state;preconditions;actions;expected changes and unchanged state at every step;legal/invalid transitions;required evidence layers;policy/support gaps. Account names identify purpose;bind actual fixture CoA and stored product classes before execution.

Use independent exact integer cents/decimal calculations. State quantity,location,value/layer,AR/AP,cash/deposits,revenue/COGS/tax,document status/source links,remaining quantities,audit and historical expectations as relevant. Explain omitted fields. Balance alone does not prove correct accounts/recognition. A zero-journal step must still assert permitted document/stock/reservation effects and prohibited changes.

Every meaningful transition needs:
1. Input and confirmed pre-state.
2. Allowed action and actor/capability.
3. Exact changed records/numerical state,or explicit denial.
4. Expected journal/account/tax/date/tenant and subledger/stock consequences.
5. Unchanged state,source links and attributable history.
6. Independent readback/reload/report evidence and supported recovery after ambiguous response.

Golden paths are anchors,not universal policies. Examples for unearned service,hire recognition,cancellation,fees,entitlements/tax must remain blocked or draft until their applicable rules/support are resolved. Unsupported advertised behaviour is recorded,never passed.

## 3. Minimum branch and input coverage

Each family includes valid normal,partial and correction paths plus boundary,invalid-state,retry,permissions,history and failure categories. Add actual settings transitions and stale forms;every critical effect must be checked at its necessary layer.

| Dimension | Required examples |
|---|---|
| Form/data | Required/optional fields;existing/new party;product classification;zero/negative/fractional/extreme values;precision;date/timezone;multiple lines;line/header discounts;tax/currency where supported |
| Lifecycle | Draft/edit/post;convert;partial/full receipt,bill,payment,return/refund;cancel/void/reverse/archive where supported;attempt illegal transition |
| Preservation | Reload/print/export;old master prices/tax/settings;source ancestry;historical asof;moduleoff history;upgrade |
| Access | Fresh verified authorized positive;read-only/other role denial;real foreign record;scope/location;revocation mid-session;files/cache |
| Repeated/failing work | Double submit;same key/retry;timeout after commit;separate-connection race;isolated fault rollback |
| Business-specific | Quantity/cost/location;fleet availability/buckets;deposit liability;digital delivery;hybrid effects by product type |

Do not attempt the Cartesian product. Execute all critical rule/transition/risk intersections;use recorded pairwise coverage only for remaining lower-risk combinations. Document excluded combinations and reason. A field filled once is not field validation;one successful receipt is not cumulative-return coverage. Performance/load needs isolated infrastructure and approved budgets.

## 4. Review before implementation/acceptance

Lifecycle of specification: draft → reviewed → retired. A reviewed specification requires independent QA reviewer,business owner,decision record and resolved local policy gaps;reviewer cannot equal author. Expert approval is separate wherever needed. Agents may draft/implement/test;they cannot invent human expert sign-off or approve their own expected results as independent.

Maintain separate ledgers for specification,automation,evidence and candidate acceptance. v1 validator supports unbound new-family adapters only;any future binding implementation must add a reviewed binding schema/adapter check and executable evidence. Do not set implemented merely by listing test IDs. Existing lower-level cases remain maintained under their current registries.

A run never mutates its specification to fit actual output. Requirement dispute,harness defect,environment issue and product failure are distinct classifications. Preserve first failure;fix or policy revision creates new evidence at a new fingerprint. A related earlier pass does not close a new variant.

## 5. New edge case intake

Anyone may submit templates/WORKFLOW_EDGE_CASE.md at any time. Capture trigger,business goal,old/new state,expected rule/example,actual observation,evidence/build and safety/impact. Uncertain expected outcome becomes a policy question;clear violated invariant becomes a bug. Deduplicate by mechanism only with evidence;retain business variants and original IDs.

Triage critical money/access/data issues immediately;do not wait for a large handoff when urgent containment is needed. Otherwise aggregate substantial batches as requested. Assign owner,priority,target family/variant and due/review trigger. Before closure add/update a versioned expectation,required layers,test binding or explicit unimplemented backlog;then independently retest exact reproduction and adjacent valid paths. No silent deletion of inconvenient edges.

## 6. Feature or rule change protocol

Before coding materially changed behaviour:
1. Open WORKFLOW_CHANGE plus product CHG;record old/new examples,reason,support/effective date and compatibility.
2. Inspect actual product diff,not just author description;include DB/auth/settings/migrations/dependencies/shared UI/printing/imports. If no verified baseline or mapping exists,broaden.
3. List directly affected families,rule refs,variants,legacy tasks,dependent families and unchanged controls. Hybrid composes physical/service/digital/rental dependencies. Use workflows:plan as an aid;unknown tag/rule selects all active starters. Add new feature tags/mappings before declaring scope complete.
4. Review changed expectations independently. Behaviour changes need workflow revision plus programme version and,if intended rule changes,rulebook procedure. New feature with no supported contract remains explicitly unaccepted.
5. Implement product and independent assertions. Metadata/adapter changes must not reinterpret old records. Critical new gates need representative isolated failure-sensitivity evidence.
6. Execute mandatory shared core + directly affected + dependent + bug regressions + risk-specific roles/tax/settings/history/upgrade tests. Pin product+QA+rulebook+workflow revisions/hash+fixture+schema+config+browser/storage identity. A deployment crossing invalidates single-candidate acceptance.
7. Review outcomes and invalidate previous acceptance for impacted scope. Untouched historical evidence remains immutable,not silently relabelled against new expectations. Record migration/correction needs for existing drafts/posted facts/custom settings.
8. Publish sanitized handoff with completed/failed/blocked/not-run scope and exact next action. No merge/deploy without separate authority.

Material semantics require explicit changed expected examples and owner review;no “updated snapshot” shortcut. Old/legacy behaviour may coexist through dated capability/policy profiles. Test supported old documents after upgrade plus new transactions. Rollback code does not restore data.

## 7. Versions and stale evidence

Protocol/catalogue use semantic versions: patch clarification without behavioural change;minor additive compatible workflow/variant;major incompatible contract/format or removed support. Increment integer family revision whenever expected behaviour,scope,fixtures,required layers or dependencies change;retain prior Git revisions. Update catalogue protocolVersion and validator support together for protocol format changes. Rulebook version/revisions change only via its own procedure.

Evidence acceptance is scoped to candidate tuple,not a permanent green badge: product/QA commits,image/schema/config,rulebook+workflow versions/hashes,fixture seed/clock,actor/profile/capabilities,required layers and complete step/variant IDs. Any relevant change makes impacted prior acceptance stale until retested;do not rewrite old pass/fail. “Not supported,”“blocked,”“not run,”“failed,”“flaky” and “passed” are distinct;only required executed passes can support acceptance. Acceptance reviewer and owner release decision are separate from test author.

## 8. Responsibilities and enforcement

| Role | Must do |
|---|---|
| Business/product owner | Declare supported scope/policies;review material behaviour;resolve exceptions with expiry/mitigation;approve launch separately |
| Qualified expert | Review applicable tax/accounting/legal expectations and dated sources;record limitations |
| Workflow author | Define independent inputs/states/outcomes,rules,risks and mappings before claiming coverage |
| Coding agent/developer | Read protocol and product QA contract;declare actual impact;implement lasting regressions;preserve issued history;never self-close bugs |
| Independent QA | Challenge oracle/fixture validity;test exact and adjacent layers;preserve first failures;recommend scoped acceptance |
| Human tester | Use pinned reviewed spec;record every executed assertion/effect;report deviations;never replace failed expectations ad hoc |
| Maintainer | Validate references/generated views;review changes;keep traceability and gaps visible;prevent stale evidence becoming approval |

AGENTS.md and CONTRIBUTING.md link this protocol. Metadata checks are integrated into pnpm check;they catch structural errors,not business correctness or false human attestations. Existing CI must actually execute required checks,and branch protection/trusted release status must be owner-configured and tested. This PR does not configure protection,deploy a release gate or automatically impose instructions in the product repo. Coding-agent handoff requires a product AGENTS/QA-contract link in its next separately versioned change.

## 9. Cadence and completion

Each session:read current state,rulebook,relevant playbooks and product changes;select scope and record intent. Each bug/feature:run change procedure. Each candidate:impact review+required regressions+fresh evidence. Weekly during active development:triage new edges and mapping gaps;before release:reconcile declared support against all required families/layers,open risks,expert decisions,operations/history/recovery. These are process requirements,not scheduled automations.

Finish with sanitized immutable run/handoff,current pointers,unresolved questions and exact continuation. Publication follows standing owner approval and exclusions. Never publish secrets/rawtraces/realcustomerdata. Actual encrypted backup/restore remains LAST;operator recovery is separate and requires authorized isolated infrastructure.

