# Configuration, actors and files are part of every workflow

The owner explicitly requested this scope on 2026-10-13. It is a mandatory part of the independent QA programme, not an optional final UI sweep. The executable source checks, PostgreSQL action checks, browser checks and remaining specifications have separate evidence. A generated matrix is a test plan, never a passed test.

## Company and module variations

`batches/configuration-matrix.json` is generated deterministically by `pnpm matrix:generate`; `pnpm matrix:check` independently enumerates every factor pair and verifies coverage. It reduces the routine Cartesian set while retaining mandatory high-risk combinations. This does not cover every three-way interaction or replace exhaustive checks for critical finance/security invariants. Bind each row to supported workflows and an independent operation-specific expectation before executing it. Unsupported/unapproved cases remain blocked with a reason.

Factors: service/digital, physical, rental and mixed businesses; company, sole proprietor lite/full, personal and pending entities; all modules, sales only, inventory only, rental only and none; eight product job templates; unrestricted, assigned, unassigned and real foreign-tenant scope. Negative module/entity combinations are deliberate requests that should be denied where the module ceiling applies.

For each applicable journey verify persisted input/output, financial account/amount/date/tax accuracy, stock/cost/availability, source linkage, audit actor, tenant and scope, totals in reports, reload and print/export. Exercise create/read/edit/post/pay/credit/reverse/archive/restore and retries where supported, through both UI and the actual server boundary. Positive allowed operations must accompany denies. A denied operation must not create documents, transactions, journals, stock movements, allocations, business audit mutations or storage objects; operational error telemetry is tracked separately.

Settings submatrices must cover VAT registered/unregistered and tax/commercial invoice; invoice numbering/reset and concurrent allocation; credit limits on/off and equality/exceeded bounds; negative stock allow/block and last/average/FIFO; bill approval, supplier reference/duplicate and GRN-before-bill; rental capacity/turnaround/invoice timing/deposits/overrides; enabled POS register/shift; period locks; brand/location and document styles. Pending accounting/tax/rental policies in `memory/policies.json` remain explicit blockers. Synthetic tax fixtures do not establish jurisdictional compliance.

Change settings between operations as well as at initial signup: disable/re-enable a module with existing records, change a role/override/scope and invalidate stale sessions/caches, suspend a membership/company, switch active company on pooled connections, change a setting while another session has a stale form. Existing history and customer balances must be preserved; newly forbidden writes must be rejected on the server. Visibility of old records after module disable needs an approved product policy before acceptance.

## Role rules and configuration overrides

Use real persisted memberships, templates, custom jobs, extra roles, teams, allow/deny overrides and location/brand scopes. Include Viewer plus extra writer job and allow override; missing/disabled/voided membership; unassigned location; Owner versus tenant Admin versus platform Admin. Never treat platform Admin as an ordinary Owner positive control. Record the active fixture identity and loaded role on every role-sensitive run. Persisted permission-loading tests still do not prove credential login or Next request caching.

Current PostgreSQL action cases E-115–117 exercise real permission loading for Owner, Sales and Viewer, module/entity ceilings and overrides. They deliberately use an owner connection to isolate commercial action behaviour; the separate non-owner RLS lane cannot be replaced by those passes. Remaining matrix rows, HTTP/browser mutations, scope/team/revocation combinations are not executed by this initial lane.

## File capabilities and adversarial boundaries

Inventory surfaces by source/route before choosing tests: receipt attachment and download; product image; rental dispatch/return photos; logos/document assets; bank CSV/XLSX uploads and commit; company archive import/export. Retired inbuilt QA artifact endpoints stay inaccessible. Do not upload external customer files or malicious payloads to shared staging. Use small deterministic synthetic files and harmless invalid bytes; resource/failure tests belong in isolated services.

Required file cases:

| Group | Assertions |
| --- | --- |
| Valid round trip | JPEG/PNG/WebP and supported PDF/import/archive formats retain correct tenant, bytes/hash or intended image transformation, metadata, linked record, reload/download and audit; check supported HEIC/HEIF separately. |
| Validation | Missing/empty file, unsupported extension/MIME, MIME/extension/byte disagreement, malformed/truncated image/PDF/CSV/XLSX/archive, size 1 below/exactly/1 above limit, dimensions/row counts/expanded archive limits; failures create no partial committed records or orphan objects. |
| Ownership | Known existing foreign object key/record, assigned versus unassigned scope, missing/disabled actor, Viewer where a write permission is required, public link exposure/expiry, tenant/company switching and stale cached signed URLs. Knowing a key is not permission to sign or download it. |
| Names/rendering | Traversal/unicode/duplicate/long filename, path separators, HTML/script-looking text as inert data, safe response MIME/disposition; imported spreadsheet-formula text must remain inert or be explicitly escaped at export. |
| Reliability | Cancel/retry/double submit, storage failure, DB failure after storage write, deleted link/missing object, replacement and cleanup, simultaneous upload; preserve old attachment on failure. Test object/DB consistency and cleanup separately. |
| Imports | Preview has no financial effects; invalid date/amount/currency/reference mapping and mixed valid/invalid rows; duplicate file/row fingerprints by tenant/account; commit/retry/reversal reconcile journal/subledger/stock where applicable. No half-import unless an approved policy explicitly defines it. |
| Archives | Export excludes credentials/session/secrets; restore checks version/ownership, empty-tenant requirement, checksum/foreign refs and counts/balances/files; failure atomicity and recovery in isolated infrastructure. |

File-role policies and HEIC handling require source/requirements confirmation. Policy uncertainty is not permission to weaken cross-tenant isolation. F-008 now reproduces foreign-key forwarding to a recorded signer through the actual product action; see BUG-0013. Real storage, signed URL verification and deployed access remain unrun. F-005–007 cover only declared MIME, size, path and SDK-command metadata/bytes; they do not validate PDF/image structure or malware handling. Production storage and actual cloud credentials are never needed for isolated QA.

## Regression selection and memory

Always run critical finance/security baseline plus changed/adjacent module/settings/actor/file cases on a new candidate. Shared auth, dimensions, schema or upload helpers expand selection across every consuming module. An unmapped change broadens testing. Pairwise matrix rows are selected for routine interaction coverage; critical denies, tenant ownership, atomicity, period locks, money/stock conservation and known bugs always run regardless of pairwise choice.

Persist factor values, exact product/QA/dependency/schema/fixture identities, active actor, expected/observed outcomes, evidence level, first failure and cleanup. Update `memory/programme.json`, `batches/coverage.json` and STATUS.md. Never mark an entire row accepted from one permission helper assertion or a page load. Credentials/raw uploads/logs stay ignored and private.
