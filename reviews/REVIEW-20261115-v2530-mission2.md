# v2.5.30 independent preparation review

15 November 2026 UTC. Target commit `ca05491f18965f757adfead48b5d98595872272c`, tree `a0a8d06415067c7e8fb2ef4959bca683954279bf`, parent `ba840d008051d8753b6c921ef1b674dd6478cc0b`, VERSION2.5.30. Exact detached product checkout `work/product` has no tracked modifications. QA preparation starts at `dafd419c01a298530780d823c84f38caf0cda9ed`, preserving CLOSED Mission1.

Git objects independently match the owner's identity. GitHub run43706904461 reports successful lint/typecheck/build/test and web image build/push; run43706904528 reports Tests, Security Scan and Lint/typecheck/build successful. These are CI outcomes, not an independent observation of Portainer or the actual live stamp. Owner reports deployment; expected actual UI is `v2.5.30 · ca05491`. Browser/live/auth have NOT been opened in this preparation; no execution clock initialized.

Reviewed the combined40-file change from v2.5.28 `48e4407` through v2.5.29 and v2.5.30, rather than the final compile-fix commit alone. Register save/archive now assert `company.sales_settings.write` before tenant-scoped mutation; default-register insertion was removed from the read path. Company settings and document controls derive write capability. Simple Entry now receives `canWrite` from the server Home page and no longer imports the server access module into the client screen. Direct Simple Entry action permission checking remains.

Payment forms share a validated selected allocation batch; server numeric schemas now reject nonpositive/excess-precision allocations instead of silently filtering them. Purchase footer derives net/VAT/gross from the VAT policy. VAT percentages are formatted for new posting memos. Informational document type/tax-treatment/number presentation is separated. Reports gains a journal-based VAT bookkeeping summary and CSV under Reports read access, explicitly not a statutory return.

Independent local executions against this exact checkout:

- Accounting:18files/237tests passed, including payment guards, linked-return protection, purchase VAT preview, sales presentation, VAT memo and VAT summary math.
- Auth:11files/97tests passed, including6register authorization/source-policy cases. Those cases inspect action source order and exercise the permission resolver; they do NOT invoke the actual server actions against PostgreSQL.
- Existing installed dependencies reused through ignored junctions; no package install or product-code edit. Initial junction creation was denied in the sandbox, approved scoped creation succeeded, then both actual suites passed. Initial test calls before dependencies existed failed before execution. Earlier relative worktree target attempt failed permission checking; correct absolute in-workspace target succeeded. No source or data modification resulted from those setup failures.

No new defect requiring a further coding handoff is established by this bounded source/unit review. Acceptance remains conditional on deployed and isolated outcome tests. Actual server mutation refusal/unchanged-state outcomes, fresh open-row AR/AP UI matrix, tenant/location boundaries, report CSV correspondence/access, physical print, and isolated backup/restore were not executed here. No claim that CI service containers establish those missing tests. Preserve all original Mission1 failures as historical results; Mission2 uses new cases.

Read `handoffs/MISSION2-V2530-PREPARATION-20261115.md`. It is a preparation contract, not an executable released queue. Complete isolation/guard qualification and freeze/publish a new QA pin before browser/auth or new test transactions. Owner alone deploys. No customer launch approval.
