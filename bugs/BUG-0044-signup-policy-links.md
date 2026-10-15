# BUG-0044: Signup policy links do not open their documents

P2 open, live **v2.5.7 /7ffafab**, staging https://bookone.clossyan.com/login. Manual read-only browser reproduction on2026-10-15, using the authorised Chrome session. This is a policy-document navigation/UX defect; no claim of a particular Sri Lankan statutory breach or legal opinion.

The Sign Up footer says creating the account agrees to Terms of Use, Privacy Policy and Cookies Policy. All three links have href#. Clicked each individually with a fresh accessibility observation after every click: Terms changes /login to /login#; Privacy and Cookies leave /login# unchanged. The signup form remains and no policy document/dialog appears. Typed synthetic name/credentials remain in the prepared form; password stays masked and private. The Create an account button was NOT clicked, so no new account/company was created.

Expected: each named policy is readable before account submission, opening the corresponding reviewed document/page/dialog. Do not invent legal text to satisfy the link check; responsible product/legal owners must provide or approve the intended content and consent flow. Related governance RB-GOV-01 and expert review queue; no new legal rule or business expectation adopted by this report.

[Live reproduction](../runs/RUN-20261015-v257-signup-policy-links.md). Three manual link checks failed and share this finding. The independently executed300-check automated campaign passes; these manual observations are separate and do not alter that immutable result. Regression browser automation is backlog. Verify all three destinations/content, back/navigation and signup usability after repair.

No acceptance of policies, real financial transaction, production access, permission grant, file upload, backup export or restore. The specific prepared-signup legal-policy approval remains pending under browser rules. Existing Admin grant rejection was not bypassed.
