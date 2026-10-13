# Coding-agent handoff — executable external Batch A

The owner accepted and requested implementation of the batch strategy. Commands and scope are in SESSION.md and docs/BATCH_TESTING.md. Run the external repo at a reviewed QA SHA with product-ref pinned deliberately to your candidate.

```
pnpm install --frozen-lockfile
pnpm product:prepare
pnpm check
pnpm test:unit
pnpm batch:run --seed 261013 --profile quick
```

The product candidate2b92cf4 has7 passing/8 failing assertions in the first full development run, grouped into BUG-0005/0006/0007/0008/0009. Failed assertions are expected **test results**, not expected-pass tests; do not use test.fails, skips or continue-on-error to hide them. Preserve numerical expectations and deny/no-side-effect contracts. Real source actions/SQL—not copied application calculations—are exercised. Generated cash-flow failure shrinks to a one-cent sale and reversal; replay details remain in private logs.

Fix order/source pointers: [finance/release handoff](HANDOFF-20261013-finance-and-release.md). Once fixed, update external product-ref to the exact candidate, prepare, run mandatory core plus affected/adjacent checks, export a new immutable run and report actual deployment stamp. Existing focused cash-sale posting works; keep it working.

The embedded SQL fixture uses live product columns/defaults/PKs but not migrations/FK/unique/RLS. Auth is a synthetic session with the real permission assertion; dimensions/framework are explicit adapters. A-008 checks actual tenant-filtered SQL with existing foreign records, not runtime database-role isolation. A-010/012 render source label behaviour, not a browser journey. Full real-runtime, constrained dimensions, concurrency, audit and deployed browser acceptance remain required. Review denied-action security audit policy if adding explicit denial events; do not silently weaken financial mutation assertions.

There are separate QA-harness and candidate-contract workflows. The latter must remain red on this candidate. Product release same-SHA gate wiring is still a required coding/infrastructure task under BUG-0008; these tests do not automatically gate GHCR or Portainer. Keep all E2E infrastructure external.

Future agents start SESSION.md and memory/programme.json, preserve checkpoints/failures and update indexes at finish. B–F are mapped but not implemented. No verified release baseline or launch-profile scope is declared yet. Build the next business state model after A fixes and real-runtime acceptance lanes, not by promoting route-smoke counts to acceptance.
