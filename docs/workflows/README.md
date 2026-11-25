# BookOne business workflow playbooks

**Expanded maintained library:** start with [eight business workbooks](LIBRARY.md): 52 journeys, 272 cases, a source-linked business map, field matrix and independent worked examples. These detailed books apply the protocol below; all new cases remain draft/unbound/not run. The five starter families below remain retained anchors.

**One shared rulebook; five business playbooks; one maintenance protocol.** This is internal QA standard1.0.0,not a claim of ISO certification or product readiness.

- [Protocol](PROTOCOL.md): mandatory creation,review,execution,change and retirement procedure for humans and agents.
- [Specification format](FORMAT.md): fields, authoring constraints and extension procedure.
- [Framework validation](../../runs/RUN-20261016-workflow-governance.md): executed checks and their limits.
- [Coverage and adoption](COVERAGE_AND_ADOPTION.md): what exists,what remains,and how to apply it.
- [Canonical shared rules](../rulebook/README.md): intended behaviour and expert review.
- [Workflow catalogue](../../workflows/catalog.json): editable spec locations and overlay profiles.
- [Templates](../../templates/WORKFLOW_CHANGE.md): change; [edge intake](../../templates/WORKFLOW_EDGE_CASE.md); [run](../../templates/WORKFLOW_RUN.md); [review](../../templates/WORKFLOW_REVIEW.md).
- [Coding-agent adoption handoff](../../handoffs/HANDOFF-20261016-workflow-governance.md).

| Business | Existing profile | Generated playbook |
|---|---|---|
| Physical retail/wholesale | BP-01 | [WF-PHY-001](playbooks/WF-PHY-001.md) |
| Service | BP-03 | [WF-SVC-001](playbooks/WF-SVC-001.md) |
| Digital | BP-02 | [WF-DIG-001](playbooks/WF-DIG-001.md) |
| Rental | BP-04 | [WF-REN-001](playbooks/WF-REN-001.md) |
| Hybrid | BP-05 | [WF-HYB-001](playbooks/WF-HYB-001.md) |

BP-06multi-location,BP-07sole-proprietor,BP-08personal and BP-09multi-company are overlays,not substitutes for a business flow. Tax/entity/framework/tier/modules/roles/location/book domain/clock are separate dimensions. Preserve the existing nine profiles,92lifecycle tasks,45archive scenarios and inherited S IDs; this layer organizes/composes them rather than replacing them.

**Initial contents:5draft workflow families,27golden steps,44specified variants;zero new automated business bindings and zero newly accepted workflows.** Many variants still need exact numerical fixtures/support/policy review. Metadata green is not business green.

Edit workflows/specs/*.json;rendered Markdown is read-only. Commands:

```sh
pnpm workflows:render
pnpm workflows:check
pnpm test:workflow-governance
pnpm workflows:plan BR-PUR-02
pnpm workflows:plan discount payment
```

Planner returns affected families plus transitive dependents;missing/unknown impact broadens to all five. Shared core and actual-diff review remain mandatory. It neither executes business tests nor selects every inherited case automatically. Existing campaign/batch/HTTP/browser runners remain execution tools.


## UI/UX across all books

Read the [shared UI/UX companion](../ux/README.md) for32 interaction rules,48 drafted workflows, pinned existing-design inventory and safe incremental coding guidance. It supplements all eight books without replacing the current design system or financial policy.



