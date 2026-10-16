# Workflow specification format v1

For the expanded detailed casebook format, also read [LIBRARY](LIBRARY.md) and [EXECUTION_GUIDE](EXECUTION_GUIDE.md). Its separate `workflows/library.json` registry, WB journey/case IDs, entity/source/control links and worked-example contracts retain the WF starter anchors described here.

Start by copying the closest file in `workflows/specs/`. Allocate a new stable ID for a new business goal; add a variant for a new path through an existing goal. Register new files in `workflows/catalog.json`.

| Field | Authoring requirement |
|---|---|
| `schemaVersion`, `id`, `revision`, `status` | Format 1; unique WF family ID matching filename; positive integer revision; draft, reviewed or retired |
| `title`, `author`, `scope`, `risk` | Named goal and author; supported start/end scope; P0–P3 risk |
| `profileIds`, `legacyTaskRefs`, `ruleRefs` | Existing business profiles, lifecycle task IDs and exact rule revisions |
| `featureAreas`, `dependsOn` | Impact tags and dependency family IDs; no cycles |
| `fixture`, `preconditions` | Synthetic opening records, settings, tax applicability, date/timezone, supported capabilities and actor prerequisites |
| `steps` | Stable step ID, action and independent expected journal lines, closing state, unchanged state, source/audit links |
| `variants` | Stable family.VNN ID, category, trigger, expected result and related bug IDs |
| `requiredLayers` | Persisted-command, credential-auth, browser, report-reconciliation, audit-history; explain applicability during review |
| `policyGaps`, `review` | Explicit unresolved questions; real independent QA/business review identities and decision record when reviewed |
| `automation`, `acceptance` | v1 requires unbound/empty bindings; acceptance starts `not-assessed;` and belongs in separate candidate evidence |

Current fixtures use LKR and integer cents. Other currencies or executable bindings require an explicit reviewed format/validator extension, including monetary precision and actual adapter validation. The validator checks selected structural constraints; it is not a complete JSON Schema or a semantic business validator.

Each journal line has `account`, `side` (debit/credit), and positive safe-integer `cents`. Empty journal arrays express no posting. Closing monetary keys end in `Cents`; use safe integers. State stock quantities and values separately. Examples do not authorize accounting policy or replace independently calculated expected outcomes.

Draft variants may describe a pending edge in prose. Before execution/acceptance, expand that variant into exact inputs, numerical outcomes, actor/configuration and evidence requirements. Missing product capability or policy remains an explicit gap.

Increment the family revision for changed expectations, scope, fixtures, layers or dependencies. Record the change using WORKFLOW_CHANGE; preserve historical Git versions and run evidence. Run `pnpm workflows:render`, `pnpm workflows:check`, and `pnpm test:workflow-governance`. Then perform the independent reviews and real execution required by PROTOCOL.md.
