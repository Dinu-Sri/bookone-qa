## Current sales-value evidence and follow-up

[First sales campaign](runs/CAMP-20261014-120513142-57ddba.json):280assertions265pass/15fail/0skip/0block, actualPG91/106. New lane3pass/7fail exposes six groups BUG-0035–0040; previous five groups still open. Read [sales handoff](handoffs/HANDOFF-20261014-sales-value-readiness.md). RT-041 cash-repeat and exact B-105 receipt-history checks now implemented;107PG/281campaign planned, not yet executed. Full137 workflows61partial/76unbound/zero accepted. Candidate still8e1a2b8/v2.5.5; no staging writes.

## Active sales-value boundary wave

Ten new cases planned on unchanged v2.5.5 · 8e1a2b8: tax/discount service+digital, original VAT credit, discounted full return, standard taxable commercial style, excessive discounts, cumulative return, paid refund and invalid tender. Source plan: changes/CHG-20261014-sales-value-boundaries.md. Original270 assertions preserved;280 planned/106PG. No new pass/defect claimed before CI.

# Resume BookOne QA

1. Read AGENTS.md, STATUS.md, memory/customer-readiness.json and memory/programme.json. Canonical source is reviewed QA main; inspect pending PRs before assuming work merged. Check local Git/product identities and graph extraction freshness.
2. Pin product-ref.json; current8e1a2b8/v2.5.5 is not customer-ready. Latest270-case result and five finding groups are linked in STATUS. Use rules/rulebook.json and generated docs/rulebook/RULES.md for expectations; delegated defaults are not independent statutory sign-off.
3. Read both current coding handoffs and relevant cases. Preserve original expectations and immutable failed attempts. A source/QA/fixture change requires a new fingerprint/run.
4. Use pnpm session:start, pnpm product:prepare, pnpm check and campaign:plan. The full campaign requires verified fresh ephemeral loopback PostgreSQL16 named bookone_qa_runtime per docs/POSTGRES_RUNTIME.md. Never target staging with preparation/reset/fault/race commands. Runtime lanes are serial; source lanes may be parallel. Current inventory lane:pnpm runtime:run inventory-valuation.
5. test:unit/campaign generates synthetic bank fixtures privately; record actual byte hash. Parser tests are not real-bank certification. Resume only interrupted work at identical fingerprint/private preparation. Do not replay live payments from public summaries.
6. Fresh explicit fixture login and loaded actor/job/build evidence must precede role-specific UI mutations. Do not infer current actor from company name or roster. Normal-role creation waits for the exact pending approval; popup dismissal remains pending. Do not reset existing passwords or use another creation path to evade review. If private state is missing, disclose it; ask for necessary access, not public passwords/archives.
7. Source company creation is the only new staging setup so far. Private journal/secrets identify it locally; no trade/attachments/archives or new test users yet. Use supported empty-target creation for restore; no SQL company reset or overwrite of traded tenant. Secrets, cookies, backup files/passwords, raw traces and financial records stay ignored/private.
8. Record build-specific outcomes, actual creations/cleanup, rule hash, blockers and exact next actions in both indexes/ledger; publish only reviewed allowlisted summaries. No full acceptance from source helpers, synthetic sessions, in-memory files, balanced totals, green CI or screenshot existence.

Historical checkpoints retained in [history](memory/history/SESSION-before-valuation-20261014.md); immutable runs govern contradictory old notes. Actor-attribution corrections remain linked from historical status, not valid Viewer acceptance. The full goal remains customer readiness for the declared scope, with operator DR and Sri Lankan expert gates outstanding.
