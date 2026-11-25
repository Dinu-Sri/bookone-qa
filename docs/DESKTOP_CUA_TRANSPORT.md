# Persisted desktop CUA actions — Rapid Cycle 01

This is a separately qualified surface for the NEW Rapid01 mission. Historical Light queues and their Browser-app proof requirements remain unchanged. The actual host is `mcp__cua_repl.js`, with the user's connected Chrome tab. No new browser driver, HTTP client, hidden state/action API or dynamic action-code evaluation is used.

`scripts/operator-desktop-cua.mjs` directly imports the existing persisted prepare/claim/finish and action guard modules. The original portable Browser transport uses Function-generated bundles, which the desktop host forbids. The desktop path invokes `dispatchBrowserAppWrite` directly inside the actual CUA tool invocation, with its bound tab as the UI surface. The original transport remains available for its original host.

CLI entrypoints now test `typeof process` before argv; queue/clock source extraction ends at an explicit CLI marker. CLI semantics and financial expectations do not change. All original queue/guard/transport tests must remain passing. Source hashes bind the desktop adapter and original queue/clock/action/host/transport modules; modification or stale cached-module/file disagreement refuses dispatch.

## Required usage

1. Read the exact final execution commit/handoff. Create a NEW run directory with `node scripts/rapid-cycle01-run.mjs init .local/rapid01/RUN_UNIQUE`. This opens the120/20clock and initializes the generic ledger with a concrete intended profile. Compare its HEAD with the published pin; independently verify actual identity/profile/openings. Declarations are not proof.
2. Establish current CUA browser/tab handles from current inventory. Browser IDs can change after a tool reset. Follow returned API documentation; never hardcode old IDs or use a second Playwright instance.
3. Before EVERY authentication, conversion, creation, posting, receipt, credit or payment, inspect the live UI and prepare inputs without submitting. Require actual supported action, exact current URL, exactly one visible enabled button, correct data/date/source and consistent independent preview. No Post & print or physical printing. Do not use Enter, evaluate(), hidden-field manipulation or an out-of-band click to submit.
4. Run `node scripts/rapid-cycle01-run.mjs request RUN_DIR CASE_ID UNIQUE_SUBMISSION_ID OBSERVED_FULL_URL EXACT_BUTTON_NAME`. The helper starts a pending case if eligible, checks dependencies/clock, persists an intent, then emits a private request path. Require the actual command exit0. A failed command leaves evidence; inspect it, never relabel it as successful or automatically repeat.
5. Invoke the adapter ONCE in `mcp__cua_repl.js`, using a local file-module URL and the actual bound tab:

```js
var fileUrls = await import('node:url');
var guarded = await import(fileUrls.pathToFileURL(QA_DIR + '/scripts/operator-desktop-cua.mjs').href);
var result = await guarded.dispatchPersistedDesktopAction({requestPath: ABSOLUTE_PRIVATE_REQUEST, tab: bookone});
nodeRepl.write({executed: result.executed, uiCalls: result.uiCalls, uncertain: result.uncertain, reason: result.reason});
```

`QA_DIR` is the absolute exact-commit checkout and `bookone` is the observed user tab. Do not send this to the shell or recreate a browser. Successful dispatch privately saves immediate URL/DOM feedback; receipts exclude raw browser data. Inspect the feedback in the private session and independently reload/read the persisted document, ledger and stock/allocation before recording acceptance. A click return or an old page is not financial acceptance. Observe transient feedback immediately; verify navigation actually completed.

6. Use unchanged `operator-queue.mjs readback` with same submissionId and accepted/refused/inconclusive plus concrete actual facts. An inconclusive readback remains unresolved. Then record the case outcome with all required evidence keys. Never record a readback/transaction pass from UI dispatch alone. Never submit another business action while an intent is unresolved.

The generic CLI layout is `COMMAND PLAN STATE FINGERPRINT CASE RESULT_JSON`. Plan is queues/MISSION-v2522-RAPID-01.json; state/fingerprint/clock live inside RUN_DIR. Read-only cases use start/record without submission; one case at a time. Pausing/closing uses the existing clock CLI. Keep all request/action/feedback/state files ignored and private.

## Fail-closed properties and limits

The wrapper checks exact dependencies, source hashes, persisted bindings and current target. It prepares after asynchronous DOM qualification, exclusively claims before action, rereads persisted inputs, rechecks/charges and durably writes the clock immediately before the actual API call. No await intervenes between final persisted authorization and dispatch. A duplicate claim, changed source/state/fingerprint/request/action, mismatched page, rejected intent or expired/paused clock refuses. A crash after claim is consumed unknown. Click/API/finish/feedback failure must never be replayed; inspect durable receipts and independent readback.

Only JSON descriptors `title` and exact named `button` click are supported; action text is not executable code. This is a cooperative single-operator control, not a security sandbox against a deliberately malicious operator. It does not attest server authorization, actor identity, database/image/schema or accounting correctness.

`uiCalls` counts actual bound title/click API dispatches. The outer CUA tool call has already happened even for a refused action; do not misreport zero UI dispatches as zero outer tool invocations. The inert proof establishes UI API provenance, not server-side financial behavior. All business results still need independent persistence evidence.

## Fresh proof at each run

`node scripts/prepare-desktop-proof.mjs NEW_PRIVATE_PROOF_DIR CURRENT_OBSERVED_BOOKONE_URL` creates five synthetic nonbusiness requests. Invoke them through the actual CUA host: positive returns title BookOne with1uiCall/1claim; exit/intent/fingerprint/clock controls each0uiCalls/0claims. Do not modify or reuse consumed proof requests. A safe navigation-toggle click may prove the click branch; it must not submit business data. Keep concrete counters/title/claim receipts privately. The preparation review records the author's actual proof and limitations; Light must perform fresh proof for its own execution pin/session.

## Rapid01 continuation date binding

The new reviewed continuation plan adds dateContract fixed-utc-day2026-10-28 and stopBeforeMidnightMinutes5. assertExecutionDate runs in every bindings check, including after durable claim and final persisted revalidation. New fixed helper also checks before init/request. Any day mismatch, malformed calendar date or lastfiveUTCminutes refuses. A refusal after claim remains consumed; never replay. Exactbutton allowlists apply to the whole Rapid01 mission family. The original frozen queue/oracle remain unchanged. Separate sourceissue/delivery/due/targetpayment facts; no retroactive date repair.
