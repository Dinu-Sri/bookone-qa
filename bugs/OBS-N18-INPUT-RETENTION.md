# P2 — stock refusal discards otherwise valid invoice entry

Livev2.5.14 · a36af04; freshQA N141710/Owner/owncompany. Related prior OBS-N13-INPUT (150% branch had a bounded repair) and new WB-CORE.J06.C07. This does not undo the previously observed150%client-validation repair.

1. Read actual inventorypolicy last/allow. Set negativepolicyblock,save,reloadverifyblock.
2. Separately create physicalN18ZeroStockBoundary via supported quicksave,price10, no stock receipt/opening. Enter invoice1unit@10/customer/date.
3. Post once. Correct explicit stock shortage says need1/short1 and advises receiving goods or allowing negative stock. No invoice added: list still8; final journal count excludes this denied attempt.
4. Application redirects to invoice list; entered form is gone. User cannot correct stock then resume the original entry.

Expected: actionable refusal AND retained editable customer/date/SKU/qty/price/notes, no invoice/AR/GL/stock effects. Prior deliberate catalog creation may remain. Later correction must not cause hidden duplicate requests. Busy/error recovery and a fresh valid positive are separate assertions.

Complementary positive under SAMEblockpolicy: digitalINV0009qty1@1posts1; source returnSR0015posts1 with no inventory/COGS lines. Policy restoredallow/save/reloadverified. VATflagfalse restored. Core guard works within observed scope; input retention is the P2failure. No actual stock master/layer/audit snapshots or server role-denial acceptance claimed.

[Run](../runs/RUN-20261018-v2514-resume.md) · [checks](../runs/CHECKS-20261018-v2514-resume.json). Original draft-discount hydration bug from17Oct remains separately open and was not re-executed as a new18Oct failure.
