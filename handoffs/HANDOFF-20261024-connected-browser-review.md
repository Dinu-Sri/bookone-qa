# Connected Browser transport: independent review requested

Base QA: a6fdda6ab48aed1f2fdb3abdde1be04558f20bf3. This PR contains only reusable transport source, synthetic tests and sanitized tooling evidence. Operational access records and recovery details are excluded.

Implemented: file-side preparation/claim/completion, portable execution of the unchanged GUARD, and a concrete tool-host entry point calling the actual connected Browser app. No alternate browser driver or HTTP write path was introduced. The existing guard, clock and queue modules are unchanged.

Executed: 44 Node tests passed (26 original guard,18 transport); full pnpm check passed. Through the concrete code-host entry point, one inert title read returned BookOne. Rejected command exit, missing intent, changed fingerprint and expired clock each made zero actual Browser calls. First host proof failed before dispatch because the host lacked structuredClone; explicit JSON-only cloning fixed that boundary and fresh proofs were used. No business action or application configuration change occurred.

Independent review must inspect source-bundle provenance, exact script/request/source/fingerprint binding, durable claims across processes, clock checks before actual tool invocation, two-stage clock persistence, crash/finish failures and Browser tool isError handling. Reproduce actual-tool controls with fresh synthetic inputs. These are author results, not independent sign-off.

See [contract](../docs/CONNECTED_BROWSER_TRANSPORT.md), [checks](../runs/CHECKS-20261024-connected-browser-transport.json), [change record](../changes/WCHG-20261024-connected-browser-transport.md).

After independent review, publish a NEW execution-ready mission copy at the final reviewed QA SHA. Begin a new ledger/clock and qualify the current actor, settings and openings. Repeat GUARD through the actual Browser tool. Continue independent UI checks when their prerequisites pass, and keep business writes gated until all relevant controls pass. Preserve every historical run and existing test record. Do not edit an adapter during a fixed execution run. No release acceptance is supplied here.
