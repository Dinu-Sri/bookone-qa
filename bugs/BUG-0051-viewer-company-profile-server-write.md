# BUG-0051: Assigned Viewer can persist company profile and finance settings

**P1 open; customer-readiness blocker.** Product v2.5.8 /cf35da1244e902e4a41291bc409eb0d994ed4e01. Confirmed in the real compiled Next HTTPS owner-DB baseline, not yet reproduced through the deployed browser or restricted DB role.

HTTP-004 uses fresh real credential logins and the actual Owner-rendered Company Details form action. HTTP-002 first verifies the assigned Viewer loads its own invoice and Viewer job; this is not an incorrectly attributed Owner session. Submitting the same form with the Viewer's cookie persists the forbidden synthetic legal name. The business snapshot changes. Submitting that form with the Owner's cookie also persists the intended Owner legal name, proving the action transport works.

Immutable evidence: [HTTP diagnostic summary](../runs/HTTP-2026-10-15T10-06-08-201Z-b7f9e8.json), [CI38717742247](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38717742247). Observations viewerProfileChanged=1 and ownerProfileSaved=1. QA implementation fc97fafc66869edbfbf99a0b2861e4fd1d4bef75; tested merge c130b49f0540791d27acaea4fe506639d2c0b3f6; content eadeeedbe640e91bf0a6c308d64e1f11874323e78d3e11581cb320b8f7247185. Full dependency/build/role fingerprint is in JSON. New ephemeral CI data only; no staging profile changed.

Graph discovery BookOneREAL followed by pinned-source verification: apps/web/src/app/actions/company-settings.ts saveCompanyProfile (line307) requires tenant context but has no corresponding write-permission assertion before updating company_profiles, tenants and potentially tax_profiles. Only legal-name mutation is dynamically confirmed here; other fields and adjacent mutators need explicit checks, not assumed exploitability.

Repair server authorization before any write using the appropriate company-settings permission and all existing role/tenant ceilings. Hidden or disabled UI is insufficient. Preserve a working Owner same-action positive, deny Viewer with zero persisted profile/tenant/tax/audit changes, test known foreign tenant and other settings actions. Do not promote Viewer or weaken the test to accept current output. BR-SEC-02 /RB-UI-01; expert review pending.

HTTP-104 is blocked because the restricted-role ERP identity positive fails; it does not prove a secure denial. Keep the two DB boundaries separate. Do not reopen BUG-0010–0043 from this new settings-specific failure.

## Confirmed adjacent settings actions

[HTTP v3 summary](../runs/HTTP-2026-10-15T13-00-44-761Z-8d1cb1.json), [CI38739011909](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38739011909): four additional actual rendered form actions accept writes from the correctly assigned real-credential Viewer. Every same-form Owner distinct-value positive persists, with posted finance/documents/stock unchanged. These share the demonstrated missing authoritative write-guard pattern and extend this open bug group; they are not inferred from source or counted as four new bug IDs.

| Case | Persisted unauthorized field | Source action | Existing required key |
|---|---|---|---|
| HTTP-010 | Tax office | company-settings.ts saveTaxProfile | company.tax.write |
| HTTP-011 | Sales tax-invoice department code | sales-settings.ts saveSalesSettingsFromForm | company.sales_settings.write |
| HTTP-012 | Purchase default payment terms | purchase-settings.ts savePurchaseSettingsFromForm | company.purchase_settings.write |
| HTTP-013 | Inventory costing method FIFO | inventory-settings.ts saveInventorySettingsFromForm | company.inventory_settings.write |

For all four: viewerSettingChanged=1, ownerSettingSaved=1, postedFactsUnchanged=1. Viewer whole-business snapshots change and expected denial fails. Owner subsequently saves a different exact value (inventory average/block); no money request replay or subsequent invoice affected by these settings. Only service products exist in the isolated fixture. No claim that every possible tax/cost/approval field was exercised, no tax eligibility approval, no actual role grant and no live company configuration change.

QA implementation90a785b1f6edbf24fafdcaa858abbb08a1871bf0; tested merge4ce27d4828438911bd8b5cac9abf24e6146cc85c; content2f67be2e24a90c19284311a8d16ade3505e5167c42532cee2986d19b9d9dae71; complete build/role fingerprint in JSON. HTTP110–113 block on the restricted identity failure (BUG0053), not passes. Repair all five confirmed actions with their actual permission keys, preserve Owner/Admin legitimate authority and Viewer hard-deny/tenant/module/scope ceilings, then run unchanged positives/zero-effect negatives and adjacent settings. Do not fix only the original company name UI.
