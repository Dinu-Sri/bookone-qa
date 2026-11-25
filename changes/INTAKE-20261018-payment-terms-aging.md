# Review intake — Net30 versus missing explicit due date

Owner: BookOne business/product rule owner, with QA maintainer tracking the decision. Trigger/priority: before payment-term aging acceptance; provisionalP2contractquestion, not a confirmed new product defect. Affects WB-CORE.J03 and physical purchasing/billing/payment journeys, future sales analogue.

Observed synthetic PUR-20261017-0002 displays TermsNet30. Original form left optional due date blank. APAging18Oct shows bill age date17Oct,days1,bucket1–30,balance540. AP total540 is correct. Stored dueDate was not read directly; report fallback effect and submitted blank field were observed.

Question: should supported Net30 derive a due date30calendar days after issue (17Oct→16Nov), require an explicit due date before posting, or remain a display-only term with disclosed aging fallback? No approved explicit term-derivation rule was established in the current rulebook review. Do not silently introduce a legal/accounting policy or change historical records to make this pass.

Next action: responsible owner records intended contract/default, date arithmetic/timezone/overrides and old-document compatibility, then a versioned rule/workbook example and exact due-date/aging tests. Until resolved, term-derived aging acceptance remains unassessed. Explicit as-of/amount assertions from this run retain their bounded outcomes. Include receipts, installments, holidays where contracted, manually overridden due dates, draft edits and overdue current-versus-cutoff views.
