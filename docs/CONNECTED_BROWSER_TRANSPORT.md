# Connected Browser host transport

Status: independently reviewed with a portable crash/finish correction; actual connected Browser tool still required at Light08 L08-GUARD. This is a separate preparation change, not an alteration of a frozen Light mission. No business action was dispatched during preparation or review.

`operator-browser-host.mjs` handles persisted files. `operator-browser-transport.mjs` runs in the tool host and receives the actual connected Browser app `js` callback. Neither creates a Playwright driver, HTTP client, or browser connection.

The host builds a portable function bundle from the unchanged operator queue, clock and action-guard source. It removes module export keywords, injects a digest lookup for exactly the already-validated persisted plan/fingerprint, a single generated dispatch ID, and a JSON clone for JSON-only inputs. Other objects are rejected by the digest lookup. Source layout changes fail closed and require review. It executes the original `dispatchBrowserAppWrite` with the actual Browser tool callback through the coordinator.

## Dispatch sequence

1. Record a successful intent with the existing queue CLI. Check its actual exit code. Write a private request file containing `plan`, `state`, `fingerprint`, `clock`, `script` paths, `caseId`, `submissionId`, and that exit code. Paths are relative to the request file. Never reconstruct a rejected command as exit zero.
2. Run `node scripts/operator-browser-host.mjs prepare REQUEST`. It freshly reads files, runs the original authorization checks, binds the request/script/plan/state/fingerprint/clock and source hashes, and saves a private preparation record. A refused prepare causes zero Browser calls.
3. In the tool host, load the coordinator from the reviewed source and call `dispatchConnectedBrowser({prepared, claim, finish, js})`. `js` must invoke `tools.mcp__codex_apps__browser_js({code: script})` and reject any tool result with `isError=true`. Do not substitute an injected callback for actual-tool proof.
4. `claim(preparationId)` invokes the host CLI `claim RUN_DIRECTORY PREPARATION_ID`. It rereads all inputs and source hashes, rejects any changed binding (including clock/request path), reruns authorization at current time, exclusively creates a durable claim for that plan/fingerprint/case/submission, and persists the charged clock before returning. A second process cannot claim the same submission, even with another preparation ID. A crash leaves the action consumed with unknown outcome.
5. The coordinator rechecks the clock after host-tool latency immediately before the Browser callback. Rejection still causes zero actual Browser calls. The final action-time charge is persisted by `finish`; the earlier host-claim charge is already durable before the call.
6. `finish(result)` privately writes the result JSON and invokes `finish RUN_DIRECTORY RESULT_FILE`. It persists the final clock and a consumed receipt. No raw Browser output is written into the receipt. A finish error, crash after exclusive claim, or Browser `isError` is an unresolved consumed outcome: recover from durable evidence and never replay. Request paths may use `/` or `\`.

`operator-browser-codehost.mjs` contains the concrete callable tool-host hooks using `tools.exec_command`, private JSON files, and the actual Browser app tool inside one awaited orchestration. Load its source into the tool host and call `runPersistedBrowserRequest({tools, cwd, requestPath})` with an absolute private request path. Its source hash is also bound at prepare/claim. Preparation output includes private ledger fields and must not be published. The preparation ID is passed unchanged; no separately authorized click may follow a returned Boolean. Do not print Browser response data into public evidence.

## Limits and required review

This is a cooperative single-operator control, not a sandbox against an operator who deliberately bypasses it. Independent review must examine bundle provenance, JSON/digest binding, clock-at-dispatch durability, cross-process claim consumption, crash/finish failure, and tool-level error handling. It must also reproduce the actual-tool controls from fresh synthetic fixtures. Passing tests or this document alone cannot approve business execution.

The request's QA source pin must be the final reviewed revision. Preparation used synthetic nonbusiness fingerprints; it did not prove actual actor permissions, current financial openings, deployed image/schema identity, accessibility, authorization, or accounting correctness. A new candidate or source revision requires a fresh fingerprint and run.
