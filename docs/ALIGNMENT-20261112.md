# Reviewed QA candidate alignment

Current candidatee741a6a has an explicitly reviewed commercial invoice zero-output-VAT contract. RT035 now asserts that contract and an adjacent eligible TAX invoice18/118; four nonVAT refund fixtures explicitly create commercial invoices. Refund/cap/receipt/no-mutation assertions are retained. No product source changes.

Current backup45-case specification and plan are repinned to this candidate, not accepted as executed. Exact previous5ea versions are preserved under history/backup-v2525/. Git diff5ea..e741 for packages/db/src/archive and docs/TENANT_BACKUP_ARCHIVE.md is empty. Thus the archive-format contract is unchanged; current candidate helper assertions still must run, including imported authorization/navigation dependencies. All scenarios remain unverified and backup/recovery remains LAST. No old execution queue or clock changed.

CI reruns must establish fullQAcheck, all136 PostgreSQL and30realHTTPS plus changed source/archive lanes. First red results remain in PR103 review. This alignment is not an executable business mission or proof of deployed financial acceptance.
