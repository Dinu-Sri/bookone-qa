# BUG-0046: First purchase order cannot use its alternative new-vendor field alone

Current v2.5.8 checkpoint: alternate-only native primary required now false and both-empty still blocks. [Retest](../runs/RUN-20261015-v258-live-fix-retest.md). **Persisted-positive retest incomplete**: own additional-company PO60 submitted once returned empty list; new-company write ceiling/config investigation INV258-01 separate from native validation. Do not count a relaxed HTML requirement as successful PO creation. No admin intervention/second save. Historical repro follows.

INV258-01 subsequently confirmed as distinct [BUG-0050](BUG-0050-additional-company-starter-capabilities.md) through actual isolated additional-company creation/permission loading. No successful staging configuration repair or PO retry; exact module save approval pending. The browser form's persisted positive still must execute after prerequisites are resolved.

P2 open, v2.5.7 /7ffafab, normal Owner with no vendors. [Run](../runs/RUN-20261015-v257-physical-browser.md), LP257-022.

In New purchase order, leave Vendor blank and fill Or type new name with a synthetic supplier. Valid date/location and actual product10at60 are present. Save purchase order stops at native Please fill out this field on the empty primary Vendor input. Read rendered input confirms partyName.required=true. Filling primary Vendor instead and clearing override saves PO600 once.

Expected: either supported vendor selection/name OR the advertised alternative name suffices; do not require both. Pinned apps/web/src/components/module/commercial-doc-screens.tsx:337 requires partyName unconditionally, while line342 provides partyNameOverride. Action createCommercialDocumentFromForm supports override selection. Quotation form has the same source pattern, but only PO behavior was executed here. Preserve native/server validation for the case where both are empty and existing vendor overrides.

Scope is first-document usability, not accounting corruption; workaround primary field verified. Automation pending. RB-UI-01.
