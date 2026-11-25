# Light10 desktop read-only recovery — 27 October 2026

Execution source: QA `3e57f1efaf5bcb3dd9d079be716b19404acf2c13`; target product `211771e95d6f97cac5eb281a0f8e63f0fceef8a4`; observed start/end stamp `v2.5.22 · 211771e`. Results extend PR82/83 without changing their evidence.

This is owner-authorized read-only recovery after owner-performed manual login, not a compliant new formal Light10 run or authentication acceptance. The initial session observation preceded the new diagnostic90/15 clock; that boundary is explicit. A new intended-fingerprint generic ledger preceded subsequent navigation. Original identity/profile/source baselines are not established by intended labels.

## Current observations

- Consumed invoice600 is settled; linked credit100 is one digital unit, settled, with correct source ancestry. Invoice preview shows six units100. Credit preview explicitly says CREDIT NOTE, identifies the source invoice and credit date, and shows one unit100 without a VAT line.
- Consumed manual-service bill200 is settled. Full journal lines for all seven events are readable: sales/credit/two250receipts and bill/two80/120payments. Their independent debit and credit sums are1600; sales branch1200, purchase branch400. No target physical-stock or COGS line.
- October journal has162entries and Dr=Cr19308.11. P&L, all32TB/account-purpose rows, BS and cashflow read: cash300, AR1906.21, AP1490, income1329.50, assets2866.21=liabilities1536.71+currentearnings1329.50. These match the published historical summary; unavailable original raw opening/row snapshots are not replaced by that summary.
- As-of26October explicitly selected through read-only aging GET URLs:8ARrows1906.21 (current600/1–30days1306.21);10AProws1490 (current220/1–30days1270). Settled targets and nonposting protected documents absent. Every currently displayed row read; historical row-by-row equality remains unproven.
- All10catalogue rows,7stock-level rows and31movement rows across4pages read. Value780 versus inventoryGL660 retains the known120gap. No displayed movement later than21October. Original raw comparison maps unavailable.
- All five protected detail pages read: converted quote600, confirmed order600 linking that quote, unposted draft100, original open invoice600 paid0 and bill200 paid0. Current visible expected facts agree; exact historical unchanged comparison remains blocked.
- All24sales/7purchase/2inventory visible settings read at opening and closing and exactly equal within this recovery session. Target October transaction Review badges read Open. Current maps kept private. Original serialization/map is unavailable, so its historical hash cannot be compared reliably; no drift claim.
- Document language en. DOM client dimensions1905x855 then1920x855 on different pages; no override or restoration action. Full browser locale/viewport attestation is unavailable.

## Gaps and review items

Payment pages show open obligations only; no persisted receipt/remittance history or print control was found on the inspected source detail/payment lists. Expanded journal rows show allocation/source labels but no reverse source anchors or full actor/allocation audit layer. Document Posted links lead to journal?q=source but all162 entries remain visible; no filtered drilldown acceptance inferred.

Purchase preview says INVOICE, From company, Bill to vendor. This is a potential purchase-document semantic issue requiring QA/product review, not an approved remittance print or a newly confirmed product defect. No editable historical receipt URL was manufactured; BUG0058 remains separate.

The reviewed codehost requires an actual Browser-app tool absent on this desktop surface. Available CUA read-only observations do not satisfy that guard. No guarded login/business action, adapter modification, historical rerating, financial replay, settings/grant/master change, physical printing, merge or deployment occurred.

## Dispositions and controls

All16slots have explicit diagnostic dispositions: **7blocked/9inconclusive;0formalpasses;0productfailures established;0unresolved submissions**. Subassertions above are fresh observed evidence, not full-case acceptance. [Checks](CHECKS-20261027-light10-desktop-recovery.json).

Focused unchanged harness suite initially38pass/32fail under sandbox temporary-file EPERM errors. A separate repeat with TEMP/TMP inside the workspace passed70/70,0skipped. Both logs preserved privately; no source changes. These tests are not actual connected-tool or ERP acceptance.

The diagnostic clock explicitly closed after the rejected publication attempt:612796ms charged (10.213minutes),0paused. The initial session observation preceded this clock; no retrospective timing compliance is claimed. Automatic approval review initially rejected the tree upload for missing explicit payload/destination authorization. The owner subsequently explicitly approved publishing these sanitized results and future sanitized QA records to Dinu-Sri/bookone-qa. Publication after clock closure is a metadata-only tail. Credits/model compute not measured.

[Consolidated handoff](../handoffs/CODING-MISSION-20261027-light10-desktop-recovery.md). Original all-business acceptance checklist remains open. No canonical case, expert or release/customer-readiness acceptance. Backup/restore LAST.
