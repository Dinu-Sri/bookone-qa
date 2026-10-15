# BUG-0050: Additional company's Owner cannot use included Starter modules

**P2 open.** Productcf35da1244e902e4a41291bc409eb0d994ed4e01 /v2.5.8. Supported Company Details Add company path creates a valid Owner membership, but included Sales/Purchase cannot write. This is additional-company bootstrap, not the initial signup/onboarding path, not BUG-0046 native name validation, and not a Viewer access bypass.

Live P258-Entry created by normal Owner, switched and explicitly freshly logged in: Owner context correct, Sales/Purchase/Inventory/POS links View only. PO60 submitted once using alternate supplier after native validation relaxed; PO/vendor lists empty, journal0. Existing authorized Admin inspection shows Starter and Sales/Purchase/Inventory/POS enabled. The admin display normalizes defaults; it is not raw stored-JSON evidence. No successful operator configuration repair; exact scoped save was rejected by automatic approval review and user approval remains pending. No alternate staging execution or role grant.

Independent RT-062 creates a DIFFERENT new company on an ephemeral PostgreSQL fixture using actual createCompany. Viewer cannot create it, with listed tenant/membership/profile/tax/account/document/transaction/journal/audit snapshots unchanged. Owner creation, correct active membership, Sri Lanka/LKR/Asia-Colombo profile and original tenant's unchanged custom modules all pass. Fresh synthetic target identity then loads actual product permissions and getTenantInfo:

| Result | Expected | Actual |
|---|---|---|
| Starter/Owner membership | Present | Present |
| Owner Sales/Purchase write | Allowed | Both denied |
| Advertised Sales/Purchase | Enabled and writable | Enabled but read-only |
| New Starter Inventory/POS visibility | Off by declared plan default | Both enabled by legacy normalization |
| First service PO60 | One PO/vendor, no financial/stock posting | Refused, no PO/vendor/transactions/journals |

This is actual persisted company creation and permission loading on an owner DB connection with explicitly synthetic identity/framework/switch boundaries. No live credential/HTTP/RLS or optional-module-grant certification. It does not change the staging target awaiting approval. Test failure sensitivity is demonstrated against the actual faulty command/capability state with positive company-creation and Viewer-denial controls, not claimed for every conceivable mutation.

[303 campaign](../runs/CAMP-20261015-091325948-860ae3.json), [CI38711276337](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38711276337):301pass/2fail; [129PG](../runs/RUN-2026-10-15T09-13-33-663Z-runtime.json), [CI38711276366](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38711276366):127pass/2fail. Only RT-061/BUG-0049 and new RT-062/BUG-0050 fail. No skipped/blocked/flaky/not-run or infrastructure failure,43/43 migrations on PostgreSQL16.15. All original301 assertions remain passing. QA implementation78d4f986081032988090f9e46de03768e83301a0; tested merge92a4bfc6b277eae1250ab1f94dde49237af17728; contentd4775e8044006ba05edb10277152e78b40919b4896adac72a62971dc4c7e7ae7; plan78a786b058e8b1e12560f2d5aaa63a8d9eb8fbce7ab6bd1452fccc4dc95a8abd. Full fingerprints in JSON.

Graph-first review then pinned source: apps/web/src/app/actions/company-settings.ts createCompany seeds plan starter without module flags; packages/db/src/schema/tenants.ts defaults modules to empty object. Permission load.ts consumes raw flags and ceiling.ts requires explicit enabled modules. getTenantInfo/admin use normalizeModules; empty flags take legacy full-suite visibility, while modulesForPlan(starter) includes Sales/Purchase only. The observed runtime disagreement matches this source path.

Repair new-company initialization/display/effective permissions consistently with declared plan defaults; keep existing custom flags/explicit false, legacy companies, Viewer/tenant/dimension ceilings and module-off history intact. Do not enable every optional module, grant Admin, or weaken the authoritative guard to make this pass. Preserve profile/tax/CoA/Owner creation atomically and no initial trading. An additional-company Owner must be able to save the first included service PO without operator repair. Optional Inventory activation for our physical staging fixture is a separate pending approval, not a requirement to add Inventory to Starter defaults. Rerun unchanged303 at the fixed candidate and complete deployed UI positive/denial/duplicate-company controls. BR-SEC-02/RB-UI-01, expert review pending.
