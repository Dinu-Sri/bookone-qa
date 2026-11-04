# First-customer launch programme

Owner-confirmed 4 November 2026: buying/selling physical goods, selling services, POS, both VAT and non-VAT coverage, cash/bank-transfer/card tenders. Required before launch: complete journeys on the deployed version, correct closing balances, staff/company isolation, confirmed tax settings, reconciled customer opening data and verified backup/recovery. The owner personally deploys; coding and QA agents must not deploy.

## Four missions and execution estimate

| Mission | Complete scope | Planned Light runs |
|---|---|---:|
| 1 | Physical purchase/receipt/bill/payment/sale/return/refund plus full service cycles and accounting/stock/history; separate non-VAT and VAT profiles, all three ledger tenders | 2 |
| 2 | POS registers/sessions, physical/service/mixed baskets where required, cash/bank/card, refunds/receipts and session/day close | 1 |
| 3 | Actual customer staff/company isolation, critical boundaries, stock/balance opening data, applicable tax/profile/location/tender configuration and representative daily work | 1 |
| 4 | Exact final release regression/evidence review and operating handover, real backup/restore and recovery in an isolated target LAST | 1 |

Five planned Light runs across four missions, plus allowance for one or two grouped retest runs: planning estimate5–7, not a guaranteed cap. This supersedes the earlier4–6 estimate because the owner subsequently required both tax profiles and all three tenders. Medium prepares/reviews; coding fixes happen between runs; owner deploys. Significant defects, missing supported controls or required operator procedures can add work. No fixed launch date or readiness percentage follows from this count.

All necessary exposed finance/security blockers must be fixed and affected workflows retested before final release acceptance. Operator-only recovery remains with the owner/operator. Completing prompts is not acceptance. No destructive restore into production. New customer work requires its own reconciled openings; synthetic fixtures are not customer onboarding data.

Rental is outside the proposed first-customer scope unless needed later; unused rental/HR/digital/advanced features do not receive acceptance from this programme. POS is mandatory. Real card processing/acquirer settlement/fees and bank integration remain separate from ledger tender bookkeeping; determine the actual supported customer process and cover it in Missions2–4 as applicable. Do not call synthetic payment entries a real processor integration test.

## Recorded evidence and protection

See reviews/FIRST-CUSTOMER-SCOPE-20261104.md for bounded historical physical/service results, and reviews/REVIEW-20261104-v2525-medium.md for PG136/HTTPS30 passing on the tested candidate. Old live v2.5.22/v2.5.23 workflows are not automatically accepted on a new deployment. Preserve original QA, prior225 journals/43 movements, consumed source actions, historical four bad credits and stockGLgap120. Existing A/B/Viewer credentials remain private and reusable; foreign B must not be repurposed into the VAT positive fixture.

Mission1 plans, independent oracles, release conditions and next Medium prompt: handoffs/HANDOFF-20261104-first-customer-m1-plan.md. No executable Light queue has been released by this programme.
