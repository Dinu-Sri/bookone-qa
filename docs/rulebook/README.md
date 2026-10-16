# BookOne rulebook: the intended behaviour reference

The owner requested this book on 2026-10-14 and delegated filling product-policy gaps with professional defaults suited to Sri Lanka. This book defines intended behaviour for product development and independent QA. Applicable law and the appropriate Sri Lankan accounting framework take precedence; the book is amendable and may itself contain errors. A dispute triggers rule review and product investigation, not automatic rewriting of tests to match code.

Start with [the readable rules](RULES.md). Each has a stable ID, revision, applicability, owner, required behaviour, current implementation/evidence, worked example, source, related checks and independent expert-review status. [The review queue](REVIEW.md) identifies conflicting or unverified requirements. [The study record](STUDY.md) describes what was inspected and its limits.

## One maintained source, two views

Edit [rules/rulebook.json](../../rules/rulebook.json). `pnpm rulebook:render` produces RULES.md; `pnpm rulebook:check` detects missing metadata, unknown source/test IDs, unsupported expert approvals and stale generated text. `pnpm check` includes this validation. The JSON is the structured source and Markdown its readable view, not two independently maintained specifications. Existing CORE_RULES and memory/policies link here rather than holding competing rule text.

The product repository retains feature specifications, implementation and CHG records. They supply evidence and link to this register; do not copy a second editable rulebook into BookOne. When product specifications conflict, retain both versions and create a review issue. Do not silently declare a recent CHG stronger than a frozen security/financial contract.

## Effective policy and expert review are separate

Product-contract rules preserve existing obligations. Adopted-default rules are effective under the owner's delegation for future specifications; they are not independently reviewed accounting/legal opinions. Record their implementation gaps and compatibility impact before coding or acceptance. New-company defaults must not silently change existing companies, master costs, drafts, posted facts or test fingerprints. An external requirement needs the actual relevant registration/entity/framework/date, not simply a country label. Open-review rules block only the acceptance they affect; established invariants remain testable.

An expert reviews the rule's applicability, example and source—not just whether code passes. Record reviewer identity/qualification, date, decision, limitations and review-record path. Until that exists, `expertReview.status` remains pending. All initial rules are pending independent expert review. Statutory applicability never becomes approved by an AI selecting its own default.

## Change procedure

1. Open a rule-change record using [the template](../../templates/RULE_CHANGE.md). State old/new wording, authority, exact examples, affected settings/roles/businesses and reason. Update a stable rule ID/revision; a separate ID is required for a new concept. Retire instead of deleting IDs.
2. Identify applicable legal effective dates and accounting framework. For official-source changes, review original enactment/Gazette and amendments; an old authority web page or a budget proposal does not establish current law. Record retrieval date, section/paragraph and uncertainty.
3. Make the expected result independently calculable; add positive, denial, fault and boundary examples as relevant. Preserve historical run results and failing assertions. A policy change produces new versioned fixtures; it cannot make an old failure disappear.
4. Obtain review from the responsible product/rule owner for material changes. The current delegation covers initial professional defaults; later agents cannot silently reverse those defaults or statutory obligations. Legal/accounting interpretation still needs an appropriately qualified reviewer.
5. Increment rule revision and rulebook version: patch for explanation/source corrections without behaviour change, minor for additive policy, major for incompatible expected behaviour. Record effective date, migration/compatibility and expert disposition. Regenerate Markdown and run checks.
6. Coding agent links rule IDs/revisions, rulebook Git SHA/content hash, product CHG and test changes. QA independently compares the actual code diff, reruns impacted and shared core checks on a fresh fingerprint, and records implementation versus acceptance. Never mark a rule satisfied merely because a case ID is linked.

## Future sessions and launch

Read AGENTS, SESSION, STATUS, this index and the relevant rule sections before work. Check new product changes against applicable rules and inspect source-date changes before tax/compliance acceptance. Recheck official sources at least monthly during development and before release, and immediately after a relevant notice or expert finding. These are maintenance requirements, not an implemented scheduler.

Every future test specification/run should quote rulebook version, Git SHA and JSON SHA256, applicable rule revisions and explicit company policy profile. Campaign fingerprint already hashes tracked QA content, including the rule register; a changed register invalidates resume at the old fingerprint. Existing immutable runs have no retrospective rulebook certification. Automatic assertion-to-rule compliance enforcement beyond metadata remains future work.

Supported physical/service/digital/rental/mixed scope is retained. Payroll, specialized tax filing, manufacturing, serialised assets, leases and other features need declared support and their own contracts before acceptance; do not imply these are implemented. The current nine new defect groups and incomplete 137-workflow programme remain unchanged by this documentation.

## Business workflow applications

The [expanded maintained workbook library](../workflows/LIBRARY.md) applies these rules through eight business/shared books,source-linked entities,field decisions and independent worked examples. Definitions and mappings remain draft evidence targets;they do not certify rule satisfaction or change expert-pending dispositions.

Use [workflow protocol](../workflows/PROTOCOL.md) and [business playbooks](../workflows/README.md) to apply these shared rules to physical,service,digital,rental and hybrid journeys. Canonical workflow JSON references rule IDs/revisions;do not copy divergent intended rules into business books. New features/edges use versioned workflow change and rule-change review where applicable. Draft examples and metadata validation do not establish rule satisfaction or expert approval.

