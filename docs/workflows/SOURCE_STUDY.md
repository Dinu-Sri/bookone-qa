# Product source study for expanded workbooks

Date: 2026-10-16. Product study pin: **v2.5.12 / ead3a82170e7a34ad625ec6ef8434e5ae65b1609** on master, discovered through the connected repository. Prior QA execution pin remains **v2.5.11 / 0bcdf4d992c6e7254448ab27ee2e7bfc1535ec8c**; product-ref.json was not changed. This deliberate study pin is not a claim about the live deployment.

Read the product and QA AGENTS instructions, existing rulebook governance and lifecycle register. Codebase-memory graph tools were not available. Fallback: pinned recursive product tree, complete available table schema declarations, module registries, selected commercial/inventory/rental/payment/POS/banking/auth/onboarding/upload actions, and the v2.5.12 change record. The [machine source manifest](../../workflows/business-map.json) records paths, Git blob SHA, normalized text SHA256 and immutable source URLs for 47 source files.

The product tree had 873 entries. Extraction found 68 schema entity declarations and 164 declared references, 138 exported action declarations in the selected action files, and 132 page-file routes. Counts describe static extraction scope. We inspected selected business transition implementations and contracts; this is not a full semantic audit of every action or a runtime trace. Route existence does not prove feature access or correctness. Normalized hashes use locally normalized line endings; Git blob IDs retain exact repository provenance.

Two module views coexist: packages/modules lists four operational navigation suites; platform-modules adds always-on Accounting/Company and optional POS/Rental/HR flags. HR is explicitly coming soon. Plan/module defaults and actual persisted capability ceilings must be tested separately; never infer supported payroll from the hr key.

The latest coding change record addresses the prior nine finding groups: remaining PO receipt/bill quantities, repeat purchase returns, percent discounts, persisted payment print and historical aging, plus validation/preview messaging. These are author-described repairs, not independently accepted fixes. The workbook includes the original examples and adjacent historical-payment/credit cutoffs. No bug was closed in this source study, and existing failing evidence was preserved.

No live UI action or product test was performed during this workbook-authoring run. Code and existing QA contracts were sufficient for the initial static map; UI-specific field thresholds/capability ambiguities remain execution prerequisites. No legal sources were refreshed and no expert opinion was invented. Existing expert-pending rules and support gaps remain explicit.

Publication contains source metadata, synthetic definitions, generated readable books and infrastructure checks only. Product source snapshots, credentials, raw traces and real customer records are not included. No product code, migration, deployment, restore or access-grant change was made.
