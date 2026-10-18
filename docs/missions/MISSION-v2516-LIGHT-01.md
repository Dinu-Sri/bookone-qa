# Next Light mission — v2.5.16, mission 01

Execute the fixed [18-slot queue](../../queues/MISSION-v2516-LIGHT-01.json). Product pin: **b2c5205a1bf52fbd327a948325810670467d21b4**, expected live stamp **v2.5.16 · b2c5205**. Coding CHG: CHG-20261018-preview-cap-residual-form-retain. Planning/source preflight only; live deployment is not verified yet. QA does not deploy.

## Start from durable records

Fetch/read this published branch's STATUS.md, SESSION.md, AGENTS.md and this mission before trusting local filenames. The scratch workspace was found to contain an older checkpoint during planning and was recovered from exact PR44. A stale local STATUS or missing private fixture file must not silently replace committed evidence. Product snapshots can be refetched by exact SHA; credentials cannot be guessed or published. If required private login material is unavailable, use the supported sign-in handoff rather than bypassing identity checks.

Read docs/COST_AWARE_QA.md, applicable rulebook/workbook sections, and the residual fixture plan. Model switching is manual. This mission does not create a scheduler, background agent, or paid API.

## Preflight already completed

The **same 13 independent source assertions now pass** on b2c5205, versus 7 passed/6 failed on 158ddc2. Actual pinned sales/purchase calculation bodies and the pure helper were executed with synthetic context. Legacy line sums now reconcile in the helper, with allocation adjustments; source unit prices remain unchanged. This is not a deployed browser, persisted DB, authentication, or real upgrade pass.

Use the new manifest and adapter, preserving the original PR44 adapter and evidence:

```sh
node scripts/retest2516-source.mjs <private-exact-source-root> reviews/RETEST-20261018-v2516-source.json
node --test tests/infrastructure/review43-source.test.mjs tests/infrastructure/mission-v2516.test.mjs
```

Source diagnostics require Node >=22.13; planning/oracle tests use the repository baseline. No new dependencies. A new manifest verifies the five source files by SHA256. If the product or source bytes differ, escalate; do not weaken extraction or assertions. If the exact published preflight is reused, cite its immutable SHA/manifest and source-only boundary; never present it as newly executed browser evidence. Coding agent's 123 accounting tests remain reported, not independently rerun here.

A setup mistake in the new QA adapter (missing cents converter) stopped its first attempt before results. It was corrected without changing expected values; the failed setup record is retained privately. The completed preflight is in runs/CHECKS-20261018-v2516-source-preflight.json.

## Execution order and scope

| Slots | Work | Required outcome |
|---|---|---|
| GATE, ACTOR | Verify exact live build, fresh intended login/Owner/company, actual opening balances/settings/stock | Correct candidate and actor before any mutation. A changed build blocks all mutation. |
| E01, E02 | Separate server stock refusal and client 150% refusal | Every applicable submitted field retained; clear errors; busy state clears; no business mutation. |
| I01, Q01 | Draft/save/post intent and quotation success | Correct button intent, saved values, one accepted operation and successful navigation; no journal from draft/quote. |
| F07, F10, C03 | Fresh seven-, ten- and three-unit ladders | Capture every intermediate preview and accepted credit, not just final total. |
| PART, TAX, HVAT | Physical 85.50/171, taxed 302.67, historical VAT 118 | Correct source balances, journals, quantities/costs and historical tax. |
| DENY, SPLIT | Duplicate 2+2 denial and valid 1+1+1 | Denied attempt preserves state; valid rows retain price 100 and reverse cost 180. |
| PO | Purchase shared server-error path and supported PO success | Missing-vendor error through supported UI retains fields; valid own-vendor PO has no AR/AP/GL/stock effect. |
| U07, U10 | Isolated legacy upgrades | Explicitly blocked until genuine infrastructure exists; do not reconstruct them in staging. |
| END | Reconcile and restore | Exact deltas, settings restored/reloaded, durable sanitized run/handoff. |

These are **18 execution slots**, including two preflight slots and two known infrastructure blockers, not 18 accepted business workflows. Full canonical cases stay unbound/not-run unless all required layers actually execute. No server/foreign authorization claim follows from UI locks or client guards.

Independent fixture amounts in cents:

- Seven-unit source 6.95: **99,99,99,99,99,100,100**.
- Ten-unit source 9.95: **99,99,99,99,99,100,100,100,100,100**.
- Three-unit control 2.99: **100,100,99**.

The first two use the reviewed declared capped round-half-up fixture, not a new universal policy. Legacy final amounts remain **1.01 after 5.94** and **1.04 after 8.91**. U07/U10 require authentic old-version-created unconsumed fixtures in an isolated application/auth/DB environment. That environment is not prepared. Source passes cannot close them or P15-01. Do not fake earlier credits, alter consumed records, downgrade staging, or run backup/restore.

## Fixtures and form checks

Use fresh independent source documents for every scenario. Existing own catalog/party masters may be reused only after actual class/cost/quantity checks; create run-owned zero Physical and Digital masters as needed. Existing failing documents remain untouched. If physical cost 60/sufficient stock cannot be verified, record a fixture blocker and continue non-stock cases; no SQL, quantity repair or arbitrary master edit to force the fixture.

For E01, record a field-name/value map before submission: dates, notes, payment mode and all supported dimensions/tax/export/hire fields that apply. Use valid values different from defaults. The queue specifies distinct dates relative to 18 October; if executing on another date, bind a new reviewed fixture rather than silently changing frozen dates. Payment mode Other here is a document header label, not a cash/bank transfer. Do not save credentials or process real payments.

After one real stock rejection, compare **every** applicable submitted value, not just lines. Retain customer, SKU, quantity, price, line/header discounts and all other entries. Check no invoice/AR/GL/stock mutation and record the toast immediately. Client 150% is a separate case. Correction must preserve intent and post once; I01 covers a separate valid draft/post path, not proof that the previously rejected physical form was successfully corrected. Same-form server-error correction remains a separately bound obligation if not executed.

For PO, only use a legitimately reachable missing-vendor state in the supported UI. If native validation or the UI prevents reaching the server branch, record that boundary and mark the server assertion blocked; do not tamper with hidden fields or call internal actions through the browser. Do not send documents or email to parties.

No deliberate shared-server latency/fault/race injection. Post-and-print intent, native printing, unsupported field variants, real server/foreign roles, concurrency, full audit, upgrade and complete business journeys are not silently accepted by this queue; record them as remaining scope. Read-only print inspection may be added only if safe and independently checkpointed; no physical printing.

## Checkpoints, budget and continuation

Budget: **90 minutes total; up to 75 minutes execution, reserve 15 minutes for reconciliation/restoration/publication**. Continue independent cases after preserving the first failure. Do not stop after one success or a few defects. If budget expires, leave untouched slots pending/not-run and publish the checkpoint; do not relabel them blocked or passed merely to finish a count.

Initialize a new private operator run with this queue and a complete fingerprint. The operator ledger validates recorded state, not live reality, time, dependencies or business truth. Verify lane prerequisites yourself. Record intent before **every** financial submission and persisted readback after it; each ladder needs a substep journal. Never reuse old terminal runs or replay an uncertain submit. Save after each case and each posting step. A running intent on resume requires source/list/journal inspection first.

Source failures block affected calculation cases, but independent form checks may continue after candidate/actor/safety prerequisites pass. A stale build or uncertain actor globally blocks mutations. Unexpected financial/access effects, ambiguous submits, unavailable fixture access, new expectations or harness faults go to Medium with exact evidence. Do not change expectations. An unexplained preview mismatch stops dependent submissions until its disposition is understood.

At the closing reserve, inspect outstanding intents, record honest dispositions, restore actual opening VAT/negative-stock/costing settings and reload. Reconcile all created invoices/returns/quotes/POs, AR/AP/GL/tax/profit, stock quantities and valuation. The intentionally unreturned duplicate-denial source remains open and must be included. Preserve the inherited stock/GL gap separately from new deltas; no balancing entry/writeoff/payment/cleanup.

## Prior checkpoint and final deliverable

Prior PR43 checkpoint only: 45 journals, debits=credits7,261.39; AR706.21/AP540/inventoryGL300/VAT46.71/profit419.50/assets1,006.21; physical stock7/value420 with inherited120gap. VAT registration false, negative stock Allow, last cost. Re-read everything; do not assume these are still current.

Publish a sanitized immutable run and scenario results, first failures, fixture register, correction notes, current STATUS/SESSION and coding-agent handoff. Exclude credentials/raw traces/screenshots/customer data from the public repo. Report case and evidence-layer coverage honestly; no invented credit savings, model telemetry or release approval. Keep public evidence linked for the owner to relay. No direct message, merge or deploy. Actual encrypted backup/restore LAST.
