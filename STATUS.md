# BookOne customer-readiness status

**NOT customer-ready.** Current source candidate v2.5.9 /2e105cd443ce01e31220bfe2d4b4637cdc737b75; live last verified v2.5.8 /cf35da1. Browser tooling/network failure prevented current stamp verification; no staging writes. [Current retest](runs/RUN-20261015-v259-first-retest.md), [coding handoff](handoffs/HANDOFF-20261015-v259-retest.md), [launch gates](docs/LAUNCH_ACCEPTANCE.md).

303 implemented campaign assertions pass on the corrected QA adapter (CI38754155102); independent129PG pass (CI38754154954). All44 migrations applied on fresh isolated PostgreSQL16.15. Campaign workflow deliberately remains nonzero because full137workflow acceptance is incomplete; executedGate passed, no test assertion failure.

Real compiled Next HTTPS (CI38754155274): **15pass/1fail/10blocked**. Owner-DB13/13 pass, restricted2pass/1fail/10blocked. BUG0049/0050 original isolated repros fixed; BUG0051 five settings and BUG0052 promotion/payment original owner-DB repros fixed. BUG0053 remains open: restricted own invoice pages307, downstream cases blocked. BUG0044 placeholder policy links remains open. No global tenant/BYPASS workaround.

QA implementation81c34b0e4507ffba6b67b1e07a04a160b652914e, tested merge7d5ff9257718944383e0f17485168220c62aed86, contenta581735bad83b8417d584783d747b9bb2b47de02e44ff523b41eb2e09441e0d6. First302/1 campaign and15/1/10 HTTP preserved: RT062 first stop was adapter missing new real job-seeding export; corrected without changing assertions. All original v2.5.8 failures remain immutable historical records.

Full137 workflows62partial/75unbound/0fullyaccepted. Physical/service/digital/rental/mixed/settings/roles/files/history scope intact. Expert RF01–10, performance targets, user acceptance, deployment/monitoring, upgrade/operator recovery and real archive restoration remain incomplete. Rulebook1.0.0 unchanged/hashabcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc. No readiness percentage from assertion counts. **Real backup/restore LAST**, before customer acceptance.

Next: preserve/publish PR33 evidence, verify terminal checks, then diagnose0053 with real restricted route positives and review migration042 function ownership/grants/search path. Continue Company Admin/adjacent settings and receipt/remittance integrity checks, physical GRNI/variable-cost/partial/lock workflows; no new confirmed receipt defect yet.

Preserve live P257-Physical: cash950/AR150/AP400/stock7/value420/profit120; six journals/debits2750. No replay of existing transactions. Last live page original product stock ledger; fresh actor/build verification required on resume. Credentials/IDs stay ignored/private. P258 exact setup still automatic-review rejected/specific approval pending/no successful save: Starter/environment unchanged; Sales/Purchase/Inventory ON, POS/Rental/HR OFF. Do not bypass via another route/grant; no company-reset SQL or production access.
