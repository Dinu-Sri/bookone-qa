# Initial product and Sri Lankan rule extraction

Date 2026-10-14. QA base957dccd; tested product pin 5becb2d/v2.5.3 unchanged. GitHub master9b8e443/v2.5.4 was discovered during research; it is one direct child commit of5becb2d. Reviewed its full changed-path list and relevant archive/permission/doc patches. No v2.5.4 execution, staging stamp, bug closure or production acceptance claimed.

## Product evidence inspected

- Existing QA CORE_RULES, ten POL topics, full programme/workflow/campaign manifests, RUN17 outcomes and agent/change contracts.
- Product PRODUCTION_RULES, AGENTS, accounting engine design and dated accounting integration audit.
- Pure document posting builder, commercial VAT/number generation, allocation/tender/period guards and payment wrappers.
- Inventory settings defaults, cost-layer source and costing user guide; guide predates FIFO and cannot override newer implementation/contracts.
- Purchase design: earlier no-GRN/gap baseline conflicts with later completed phases. Extract intended PO/GRN/GRNI/bill rules; existing bounded PG evidence verifies some paths, not every design claim.
- Rental/catering design, inclusive date availability/padding, invoice stage helper, rental settings/defaults and rental money commands.
- Access/entity architecture: some overview sections predate implemented roles/scopes. Preserve intended ceiling/privilege/security contracts; distinguish planned entity/tax scope from actual support.
- POS locked design, reconciliation separate-bank/books principles, frozen tenant archive and current archive v2.5.4 change.

Graph search and one function snippet were attempted first on BookOneREAL. Extraction retains old unit/test nodes and only41 migrations while pinned executable study applies43; graph is incomplete/stale for new archive work. Verified relevant pinned files directly and used exact GitHub commit diff for the newer archive contract. All product citations pin a SHA rather than floating master. This was a targeted contract extraction, not a line-by-line proof of all application behaviour.

## Sri Lankan and engineering sources checked

Official IRD VAT overview, informational consolidated Act through2025 and2026 amendment; invoice Gazette2481/22 and effective-date amendment2500/106; Sri Lankan official accounting publication PDFs LKAS2 and SLFRS15; SME standard publication; IRD SSCL overview; DPA amended Act and Gazette/draft-regulation index; OWASP authorization/upload guidance. Source locators, dates and limitations are in the generated source register.

The operative invoice format effective date was verified from the amending Gazette, rather than earlier postponement notices. DPA Gazette2498/16 is indexed but its PDF could not be fetched; do not substitute an old enforcement headline or a third-party summary. Statutory thresholds, special regimes and all accounting-framework applicability remain unapproved where research is incomplete.

## Rule choices and coverage boundaries

The owner's delegation supports initial safe non-statutory defaults: exact LKR rounding and explicit tax buckets; average/block new inventory profile; controlled backdating; atomic payment batches; zero unagreed rental penalties; scoped private files and declared upload limits; readable preserved history; frozen draft policy; linked manual controls; conservative financial retention and measurable DR planning targets. These are choices, not assertions that the world has one universal rule or that code already implements them.

Every inherited BR ID is preserved. Related test IDs are discovery/extension pointers, not audited complete rule bindings. No product assertions, expected snapshots, pins or prior run results were changed. No browser login, test transaction, archive export/restore/download or company-reset SQL was performed. Remaining domain/expert questions are RF-01–10. Existing latest campaign242pass/13 fail/4 skip and all137unaccepted full workflows remain as recorded.
