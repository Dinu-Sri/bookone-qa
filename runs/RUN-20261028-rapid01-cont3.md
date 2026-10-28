# Rapid01 CONT3 completed execution — 28 October 2026 UTC

Execution QA `caf89fd43725102520f1b934982681dab943f0b9`; product `211771e95d6f97cac5eb281a0f8e63f0fceef8a4`, observed beginning and ending `v2.5.22 · 211771e`. Fixed 23-checkpoint queue/oracle and desktop adapter were unchanged during execution. Results metadata is a successor commit, not the execution fingerprint. [Checks](CHECKS-20261028-rapid01-cont3.json) · [consolidated coding/review handoff](../handoffs/CODING-MISSION-20261028-rapid01-cont3.md) · [PR88](https://github.com/Dinu-Sri/bookone-qa/pull/88).

## Outcomes

All remaining eligible physical and delivered-service monetary events completed: 11 accepted financial events and one nonposting quote-to-order conversion. Existing bill600 and purchase credit60 were verified read-only and never repeated. No PO, GRN, quote, completed digital/mixed event, invalid over-allocation or master/settings change was submitted. All accepted submissions had immediate feedback and independent persisted readback; zero unresolved submissions. All earlier transactions and failures are preserved.

Before final publication closure: 17 passed, 2 failed, 3 inconclusive, 1 closure pending. Final counts and conservative closed clock are in the checks file; closure does not turn missing audit evidence into a pass. This is completed monetary workflow coverage at this fingerprint, not complete launch acceptance or retrospective acceptance of older runs.

| Lane | Executed sequence, LKR | Verified outcome |
|---|---|---|
| Physical | Sale6×100; receipt250; source credit1×100 at original cost60; receipt250; vendor payment540 on existing bill | Sale balance0; existing vendor bill balance0 including earlier60 credit; quantity −5; COGS +300; cash −40; AP −540 |
| Service | Existing quote200 → order200 → auto-posted invoice200; receipt50; source credit100; receipt50; manual delivered expense bill1×80 to6800; vendor payment80 | Invoice/bill balance0; cash +20; net income +20; no inventory, COGS or product master creation |

New issue/payment/conversion dates are 28 October; due dates31 October. Existing quote issue27 October and physical bill delivery27 October remain separate source facts. Conversions were inspected before further actions; invoice conversion posted immediately and was not posted twice. The controlled dates were committed with native keys and reread after other form fields changed.

## Fresh controls and evidence

New120/20 clock and ledger opened before browser/authentication. Fresh110 focused tests passed, zero failed/skipped. Actual desktop proof: seven adapter invocations in one CUA tool call, two positive UI calls (title/click), five zero-UI/zero-claim refusals for exit, intent, fingerprint, clock and wrong UTC day. All auth/business actions used persisted single-use desktop requests inside the actual bound CUA tab; no second driver or replay. The fixed28 October UTC/final-five-minute guard remained in force.

Agent performed fresh signout, protected-route reload redirect and original-fixture login with Remember me off. First login explicitly refused credentials; a distinct subsequent key-entry login succeeded. Preserve this unexplained first-attempt auth observation; redacted field values did not establish its cause. Final actor was the approved original QA Owner. No owner-assisted login was needed.

All three settings pages, 32 account definitions, journal/TB/PNL/BS/cashflow, dated AR/AP, 10 catalogue items, seven stock rows and all35 opening movements were captured before business. Read-only opening qualification included the consumed600 bill, consumed60 purchase credit, current sources, five protected historical records and completed digital/mixed documents/credits/receipts. Raw snapshots, screenshots, source bindings, request claims and detailed ledger remain private. This public report uses synthetic lane aliases and deltas only.

The20-minute checkpoint was persisted at approximately22.92 charged minutes after crossing the threshold; it was late, not claimed to be exactly on time. At that checkpoint all11 financial events had settled and no intent was unresolved; only closure/reporting/publication remained. No interruption pause or retrospective time subtraction occurred. Final clock is reported separately; publication was included until explicit close, followed only by metadata recording of that closure.

## Independent closing reconciliation

| Measure | Observed change | Oracle |
|---|---:|---:|
| New journal count | +11 | +11 |
| Debits / credits | +2720 / +2720 | +2720 / +2720 |
| Cash | −20 | −20 |
| AR / AP | 0 / −540 | 0 / −540 |
| Inventory GL / current stock value | −300 / −300 | −300 / −300 |
| Physical quantity | −5 | −5 |
| Revenue / returns / expense / COGS | +800 / +200 / +80 / +300 | same |
| Net income / assets / liabilities | +220 / −320 / −540 | same |
| New physical movements | Sale−6, source credit+1 | exactly two |

All170 earlier journal summaries and all35 earlier stock movements were preserved; closing had181 journals and37 movements. Three settings pages matched exactly. All32 account definitions/types/normal sides remained unchanged; expected balances changed. Catalogue remained10 and stock levels seven; only the owned physical row changed13→8 at cost60. All unaffected trial/AR/AP/stock rows remained unchanged. All five protected records and completed digital/mixed documents, credits and receipts matched opening snapshots. Earlier bill/credit are opening facts, excluded from these11 new events.

Explicit reports through28 October (not merely the default month-end view) agree with trial/subledgers, dated AR/AP and physical stock. As-of27 AR exceeds as-of28 by200 solely on the original digital invoice whose receipt was dated28; original mixed receipt27 is unchanged. New28 October invoices do not appear in27 October aging. The pre-existing120 inventory-value/GL gap remains120; no repair or new discrepancy is claimed.

Invoice, sales-credit, purchase-bill and purchase-credit loaded previews show correct amount/date/source lineage; physical bill delivery27 is preserved. All four new receipts and both vendor remittances were independently reopened and show the intended source, amount, date and cash account. No physical printing. Earlier receipt/remittance discovery gaps are superseded by these positive observations, without rewriting old results.

## Findings and limits

`R01-P-OVERPAY` and `R01-P-OVERRECEIPT` failed their prepared pre-submit feedback assertion: entering541 against remaining540, or251 against remaining250, left Record payment enabled without explicit inline/native range feedback. No invalid submit was attempted; source/journal remained unchanged. Pinned source independently shows explicit over-balance rejection inside both forms' submit handlers before server calls. These results therefore establish a pre-submit UX gap, not accepted overpayment or a demonstrated server/accounting defect. See grouped P2 investigation in the handoff.

Physical history, service history and adjacent-date closure remain inconclusive because a persisted financial audit history surface was not available in the inspected supported UI. Allocation journals and document ancestry do not substitute for actor/action audit records. Preview/accounting portions completed; missing audit did not stop the independent service lane.

The broader pnpm check remains not green due to the previously documented Windows workflow-governance process/filesystem failure; this run's110 focused checks are a separate result. No product fix, merge, deployment or launch certification occurred. Refund/rental, real roles/foreign tenants, race/fault, upgrade/storage and expert acceptance remain broader work. Backup/restore stays LAST. Medium should review this consolidated result and qualify the next substantial workflow/fix batch, rather than rerun these settled transactions or another tiny blocked queue.
