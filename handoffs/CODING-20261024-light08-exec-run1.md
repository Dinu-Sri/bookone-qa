# Light08 EXEC coding handoff

[Results](../runs/RUN-20261024-light08-exec-run1.md). One harness failure, no new product defect demonstrated.

Fix QA-HARNESS-L08-EXEC-01 in a separate change: concrete codehost prepare serializes the entire37case mission plus state/bundle into capped exec_command output. Observed96775UTF8bytes;16000token cap inserts a truncation warning; JSON.parse fails before any Browser call or exclusive claim. Examine BOTH prepare and claim response payloads, which return full inputs. Preserve this first failure. Do not merely assume a larger output cap will always suffice.

Use a reviewed bounded/chunked or file-reference data exchange with integrity/source/fingerprint binding and action-time revalidation. Keep the original guard and business expectations intact. Add regressions using the exact full EXEC plan, realistic grown state/events, and a host that actually truncates output. Assert explicit fail-closed diagnostics,0Browsercalls0claims on incomplete preparation, correct consumed semantics after a claim, and no replay. Retain crash/finish/isError and negative controls. Reproduce actual connected-tool title and zero-call controls after the correction; small injected tests are insufficient.

Browser separately needs recovery: settings navigation and follow-up supported diagnostics did not return. Fresh intended login succeeded before that stall. After reconnecting, verify current page/session afresh. Do not reuse old opening financial values as current evidence.

Independently review the correction and publish a NEW executable queue/handoff at exact QA/product pins. Start a new120/20clock and ledger; reverify actor/capabilities/settings/full openings and actual GUARD before any business write. Then execute independent focus/help/source-link checks and gated fresh financial families. No deployment, grants, funding workaround, historical record repair or acceptance by documentation. Historical Light07 failures and all parent queues remain immutable.
