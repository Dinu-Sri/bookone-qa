# Live signup preparation and policy-link checks

Date2026-10-15; staging https://bookone.clossyan.com; displayed stamp v2.5.7 /7ffafab. Authorised existing Chrome session, no alternate browser/runtime. Source pin7ffafab14e0ac0b6c3e6150cec1c2c227fee87e6. Independent manual observations, not part of the300 automated assertion count.

Existing administrative user was signed out through Logout. Sign In appeared, then Sign Up selected. Prepared unique synthetic P257-Owner first/last name, email and password/confirmation as authorised by owner. Actual credentials are ignored/private under .local/live-v257/. No submit/account/company creation. Footer says signup accepts Terms of Use/Privacy/Cookies; at-action approval requested under browser rules, still unanswered. Prepared form preserved as browser handoff.

Read-only link checks, one click followed by a fresh accessibility observation each:

| Link | Observed destination/result | Outcome |
|---|---|---|
| Terms of Use | href#; /login becomes /login#; signup remains, no policy document/dialog | failed |
| Privacy Policy | href#; /login# and signup unchanged, no policy document/dialog | failed |
| Cookies Policy | href#; /login# and signup unchanged, no policy document/dialog | failed |

Three manual failures, one P2 finding [BUG-0044](../bugs/BUG-0044-signup-policy-links.md). Legal/statutory impact not assessed. The300 automated checks remain passed with no infrastructure failures; real credential/HTTP/business workflow acceptance remains open.

No new account, company, product, transaction, stock, payment, upload, backup export or restore created. No company-reset SQL, shared-staging faults or production access. No public password/cookie/raw trace/screenshot. After explicit approval submit the prepared signup, complete supported onboarding/identity/settings and physical-first ledger; remaining workflows follow, real backup/restore LAST.
