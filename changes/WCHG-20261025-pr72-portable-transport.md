# PR72 independent correction: portable verified transport

Starting QA source: `20706e20` on `qa/pr72-independent-correction`. Scope is synthetic harness correctness; no browser, business execution, deployment or historical evidence change.

The concrete code host previously required `atob` and `TextDecoder`, absent in the actual function host. It now strictly decodes canonical base64 with portable JavaScript and decodes UTF-8 using percent bytes and `decodeURIComponent`. Each exact-length received slice is sent back through the bounded `verify-slice` host command; Node's SHA-256 and byte equality verify the received bytes against durable bytes before reassembly. Full-file confirmation remains required.

Claim now returns a bounded file envelope instead of the full, growing clock history. The complete claim payload is transferred through the same verified slices and confirmed against its full durable digest. No clock events are removed. Claim is already consumed before this exchange; any malformed/truncated receipt or failed slice/confirmation remains uncertain, causes zero Browser calls, and cannot replay. Finish persists that uncertainty without overwriting the durable claim clock with a stale preparation clock.

Guard, queue, clock and transport coordinator sources remain unchanged. Regression checks cover absent encoding/crypto globals, multibyte UTF-8, same-length harmless byte corruption, digest/length faults, malformed verification receipt, truncated/malformed claim, claim-transfer faults, and a 200-event clock. These are synthetic host/tool callbacks, not actual connected Browser proof or business acceptance.

Validation: direct Node guard + transport suite, 61 passed, zero failed/skipped; `git diff --check` passed. Independent review and actual connected-tool controls remain required at the final commit.
