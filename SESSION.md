# Resume BookOne QA — 18 October checkpoint

Read STATUS.md and handoffs/HANDOFF-20261018-v2514-resume.md first. Latest batch: 87 bounded assertions, 70 pass / 11 fail / 6 inconclusive; three live P1 return groups plus one P2 input-retention group. Source-only concerns now have sales UI reachability, but purchase analogues and full runtime/security/stock layers remain open. Prior draft-edit bug is still open, not retested today.

Product a36af042753f3ad8b40246d6cd579deac9233ba7, observed v2.5.14 · a36af04 throughout. QA base3691a4bbd7b6fa63dd8b8fb0bc582c1628475249/PR40; publication branch qa/v2514-resume-20261018. New candidate requires a new run; never relabel old results.

Existing fresh synthetic account QA N141710 and its own company remain usable. Credentials stay private in the prior local fixture file; never publish, reset or guess them. Explicit logout/login and loaded Owner verified today. No new account or access grant. Prior denied existing-company grants must not be bypassed.

Browser binding agent/browser/bookTab may persist; tab1455173440 was left on the final Balance Sheet and marked for handoff. Inspect fresh UI, actor and stamp before actions. Initial client chunk failure recovered by reload. Do not treat prior network timeout or ambiguous duplicate-bill click as established product accounting failures.

Preserve all data. Original INV0001 draft256.50; INV0002 paid after SR0001=85.50 and SR0002=171. Bad fixtures: INV0003 seven units/6.95, SR0003–0008 .99 each and SR0009 1.00, source due.01; INV0004 three units/300 with SR0010 accepted2+2units/200, source due100; INV0005/TAX26OCT_01/1 untouched/open302.67, valid full return rejected. Invalid first control INV0006 open3.53 was created under VAT on; retain and exclude from no-tax2.99control. Controls INV0007 paid118 via SR0011; INV0008 paid2.99 via SR0012/13/14=1/1/.99; INV0009 paid1 via SR0015. Earlier PUR0001/fullPR0001 600 settled; PUR0002 600 lessPR0002 60 leaves540. Older tenant fixtures remain untouched.

Final27journals/debitscredits4097.07; AR406.21/AP540/inventoryGL480/outputVAT46.71/profit299.50/assets886.21=liabilitiesequity. Actual stock/layer quantities not read. VATregisteredfalse and negativepolicyallow restored and reloaded; last costing/rate18 unchanged. Separate physical zero-stock catalog fixture persists from authorized quickcreation; denied invoice not created. No balancing entry/payment/writeoff/cleanup.

Library1.4.0/271draft cases; COREbook5/J06revision3/newC07; 23examples/56steps; rulebook1.0.0 expertpending; 26infrastructuretests passed. Historical graph/automated product pin unchanged. Source concerns cases HYB.J02.C08–C10 retain expectations; manual results do not create canonical bindings or independent review.

Next action: inspect coding fix SHA/CHG and diff, retest exact four reproductions plus adjacent controls, then PO → partial GRN → billing/GRNI/approval/stock master/layers and remaining business/shared layers. Duplicate-bill feedback remains inconclusive; Net30 due-date derivation has an owner review intake. No blind financial replay; read persisted source/journal first. Actual encrypted backup/restore LAST. Publish only reviewed sanitized repo files and give owner links for manual relay; no direct messages/merge/deploy.
