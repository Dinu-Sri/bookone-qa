# Medium review: residual fixture conflict

Owner: QA planner using Medium. Status: unresolved, blocks P15-01 and live acceptance of the closing-1.01 reproduction. Product v2.5.15/158ddc2; frozen queue introduced in PR42. This is a fixture-design escalation, not a new reproduced product defect.

The queue requires a fresh seven-unit source at price 1/header discount 0.05 = 6.95, with six prior credits of 0.99 before a last credit of 1.01. The actual fix adds a remaining-header cap: after five credits of 0.99, its sixth credit is intended to be 1.00. The old staging source already has all seven accepted returned units, including the undercredit, and must remain untouched. No safe supported UI operation can turn that record back into the required pre-state.

Keep the frozen queue and historical failure unchanged. Review two separate fixtures: a fresh ladder that conserves header allocation and source value, and a prior-version upgrade fixture with six 0.99 credits and one remaining unit. Build the latter only in an authorized isolated environment using a legitimate earlier-version workflow, then upgrade and test the final unit. No staging reset, data repair, direct database fabrication or excess return is authorized by this intake. The independent conservation invariant remains 6.95 total credit and zero due after all units.

Medium should define expected per-step values from approved rounding rules and independent arithmetic, version the new queue/fixture plan, and review whether the canonical residual case needs clarification. Do not change expected values merely to accept the current helper. Missing upgrade evidence remains missing. Actual encrypted backup/restore stays LAST.
