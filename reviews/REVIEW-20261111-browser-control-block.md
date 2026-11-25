# BookOne launch execution blocked by desktop/browser controls

Date: 11 November 2026. Owner requested deployed testing in one sustained session. This is a control qualification result, not a completed business batch or a BookOne defect.

## Verified and blocked scope

The visible Chrome/Windows accessibility page is BookOne login at the approved host and displays v2.5.25 · a6eda60. This matches the expected short prefix of reviewed merge a6eda602bc67f20eb86736cbeceabc9cdd841769, whose tree equals reviewed product5ea0d6e. The visible short stamp is not an independent full server-build/digest attestation. No authenticated live gate or business fixture was qualified.

Chrome tab discovery, URL metadata and supported native accessibility reads work. Page navigation/DOM/screenshot methods repeatedly return `Cannot read properties of undefined (reading 'timeoutMs')`. Passing documented explicit locator timeout options avoids that exception but returns a selector deadline on the known visible login page. No browser-control implementation was inspected or patched; only documented APIs were used.

Supported native CUA controls were considered as an independent qualification path. A guarded read succeeded. The actual harmless Sign In mode-click proof failed with `coordinate input geometry is unavailable`. The durable claim was consumed and classified uncertain, never replayed. No Login, Logout, signup, permission/settings/master or business submission was attempted. A subsequent native AX+screen observation returned BookOne's accessibility tree but a screenshot of the Codex app. This mismatch prevents safe qualification for guarded test writes.

## Native adapter is quarantined

scripts/operator-native-cua.mjs reuses the existing persisted intent, exact fingerprint, single-use claim, conservative clock, date and exact target/control safeguards. No second HTTP/browser driver, arbitrary script or coordinate fallback is created. All native authentication/business/settings/master clicks are hard refused. The only possible diagnostic click is an explicitly marked inert Sign In mode button on the login page; this does not qualify production or QA transaction use. Existing browser guard/helper sources remain unchanged.

The initial actual proof refused both positives because native AX output repeats the focused address field as a separate summary. The parser now accepts only the real Chrome toolbar node before the first document root; it ignores focus summaries and refuses a page-supplied replacement. The first proof is preserved. A fresh source-version proof then passed the guarded read, while the click remained uncertain from missing geometry. Five exit/intent/fingerprint/clock/date negatives each refused with zero guarded actions, zero native observations and zero claims. The source revision used for that actual proof is retained privately; the later hard quarantine has only unit evidence and is not relabelled as an actual click pass.

Final focused host unit result:48/48 passed (26 existing desktop guard +22 new native diagnostic/quarantine tests). First restricted run39passed/9failed is preserved as a restricted-environment result consistent with temporary-directory access restrictions; exact underlying errors were caught by the guard. Unchanged tests all pass on the host. Metadata validation and diff whitespace checks passed. No full pnpm check or new application runtime/browser workflow pass is claimed here.

Two inert proof sets have all14 clocks closed. The deliberately expired-clock negative fixtures contain synthetic charged values; they are not business-run duration measurements. There was no active business clock, no authentication/business run and no consumed business source. One inert click claim remains explicitly uncertain. Current old planning queues remain non-executable.

## Next action

Resolve the Codex/Chrome control compatibility issue and require a fresh actual harmless read+click plus zero-action refusal proof on the restored supported control path. Do not repeatedly submit old requests or use native read success to infer click safety. This is not a grouped product coding fix request: no BookOne product root cause has been established.

After controls pass, Medium completes actual live candidate/actor/profile/current-opening/tender/fixture gates and publishes a NEW dated exact-bound M1A execution queue/helper/prompt. Existing M1A/M1B PLANs and consumed historical missions must never execute as-is. Owner personally deploys; no agent deployment. All earlier financial sources, four bad credits and stockGLgap120 remain preserved. No customer launch approval. Backup/recovery LAST in Mission4.
