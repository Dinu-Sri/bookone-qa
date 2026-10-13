# RUN-20261013-authentication-validity-review-05 — correct Viewer test actor attribution

Status: completed. Prior Viewer write conclusions from follow-up runs 02–04 are invalidated because the actor was not verified.

## Observation

- Staging footer shows build marker v2.1.0 · 2b92cf4.
- The Team page lists Dinu Madhusanka as Owner and the synthetic test account as a separate Viewer.
- The Team page rendered user-management controls: add person, send invite, role selectors, and Remove controls. This strongly indicates the active browser session has Owner/admin-level access.
- No explicit fresh Viewer sign-in or same-session active-user identity check was recorded before the write actions in runs 02–04.

## Correction

- Customer creation and invoice draft saves in runs 02–04 occurred, and those newly created records were archived. Their actor identity was not verified. They are not proof that Viewer can write.
- BUG-0003 and BUG-0004 are now marked unverified. Do not count the historical attempts as Viewer permission failures or as release blockers.
- The earlier original run, including BUG-0002, must be audited separately for session identity before retaining any Viewer-specific conclusion. No result is promoted by assumption.

## Next controlled run

1. Sign out of the Owner account.
2. Sign in explicitly as the synthetic Viewer.
3. Record non-secret evidence of the active user and Viewer job in the same session before testing.
4. Verify Team page behavior and controls are consistent with that role; do not infer identity from the account roster alone.
5. Run one low-risk customer creation and one draft save only if authorized, then archive them. Never post the invoice.
6. If Viewer cannot safely sign in, stop and ask the owner for help rather than continuing under the Owner session.

No credentials, cookies, or private identifiers beyond the already-public synthetic account are included.