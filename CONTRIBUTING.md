# Contributing to BookOne QA

Humans and agents follow [AGENTS.md](AGENTS.md),current SESSION/STATUS,the [canonical rulebook](docs/rulebook/README.md) and [workflow protocol](docs/workflows/PROTOCOL.md). Start at [business playbooks](docs/workflows/README.md).

For a new feature,edge case or changed expected behaviour,use WORKFLOW_CHANGE/EDGE_CASE templates and link exact rule/family/task IDs. Change canonical JSON,regenerate views,run metadata and relevant existing/product checks,and obtain independent review. Never weaken a financial/access expectation to match output. Do not call a new case title,green metadata or listed binding a passing business workflow.

Publish reviewed sanitized QA records under standing owner approval;exclude credentials,rawtraces,realcustomerdata/privatearchives. No product merge/deploy authority from a QA contribution. Existing failing evidence remains immutable. Actual encrypted backup/restore LAST.

# Expanded workbook authoring and execution

Read [the maintained library](docs/workflows/LIBRARY.md), [execution guide](docs/workflows/EXECUTION_GUIDE.md) and applicable business book. Edit canonical `workflows/casebooks` JSON, retain stable IDs and increment affected revisions. New features/edges need change/intake and policy review as applicable. Run `pnpm library:render`, `pnpm library:check` and `pnpm test:business-library`. Source/task mappings and structural validation do not establish executed coverage. Bind real actor/configuration, independent expected outcomes and required evidence layers before testing.


**Mandatory maintenance:** every relevant feature, defect, edge case or correction must follow [AGENTS rules 73–81](AGENTS.md#mandatory-workbook-maintenance-correction-and-audit). Maintain canonical definitions and independent expected outputs, audit semantics and mappings, version/review changes, validate generated views, preserve history and publish the updated handoff. Structural checks and specification counts are separate from actual ERP test evidence.


## Shared UI/UX maintenance

The [UI/UX companion](docs/ux/README.md) and AGENTS rules91–98 apply to humans and agents. Edit canonical UX JSON, preserve the existing product design system, map affected business journeys and shared consumers, keep exact expected/unchanged outcomes, regenerate/check views and preserve historical evidence. Use templates/UX_CHANGE.md and UX_RUN.md. Draft workflows and structural checks are not ERP passes; missing browser/reader/history layers stay explicit.

