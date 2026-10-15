# BUG-0032: Completed payment key returns success for a different payload

Priority P1; open. Candidate **v2.5.5 · 8e1a2b8**. Rules BR-ACC-04 and retry integrity require a completed key to identify the same operation.

RT-025: pay 250 against one posted invoice of 600. Reuse the completed request key for another posted invoice of 600. The command returns success, but the second invoice remains unpaid with balance 600 and no new payment. The state is unchanged: this is false success, not a double cash posting.

Expected: refuse a changed payload with zero mutation; return the original completed result only for an equivalent payload. Bind a stable canonical request fingerprint (tenant, command, targets, amounts, tender and relevant inputs) to the key. Preserve the existing exact-replay positive and failure handling. Confirm intended ordering/canonicalisation rather than hashing presentation-only fields.

Investigation: completed idempotency lookup uses tenant/request key and returns the stored result without checking the new operation payload. Original BUG-0023 completed-response reproduction now passes; this adjacent case has its own ID.

Evidence: [PG run](../runs/RUN-2026-10-14T11-10-44-786Z-runtime.json), [campaign](../runs/CAMP-20261014-111034220-9ed0bc.json), `tests/runtime/payment-boundaries.test.ts`. Actual isolated PostgreSQL/product commands with synthetic sessions; real credential/HTTP/UI exposure remains unverified.

## v2.5.6 bounded retest - 2026-10-15

RT-025 pass on d5377d89d2bd9d27c52a6e9c43376f2d03255bd0. [Latest campaign](../runs/CAMP-20261015-015814708-878549.json)291/292pass, [PostgreSQL](../runs/RUN-2026-10-15T01-58-15-584Z-runtime.json)117/118pass, zero skips or infrastructure failures. All19 earlier failure cases pass. This is bounded original/selected-adjacent reproduction evidence; full feature/credential/browser/storage acceptance remains pending. Retain historical failure and expectations. BUG-0043 module-off historical detail denial is a new adjacent access regression; do not undo scope/read-job protections to repair it. See [current handoff](../handoffs/HANDOFF-20261015-v256-retest.md).
