# RUN-17: unified campaign, first deeper execution

Pinned product **v2.5.3 · 5becb2d**, `5becb2dcc768e056e34f8507fc2ecd2a3475e6a9`; observed live dashboard sidebar matching before this work. No staging write/reset/archive download/restore, production access or public secrets. Tests run isolated source/ephemeral PostgreSQL fixtures with declared synthetic login and seeded master/setup boundaries.

Implementation `0f91affd52d4934f01cad097e3a0d8ac690de9a4`, tested PR merge `bbbe042a34e62a5035d533b00d1864c7fdcc8b2f`, source content hash `1e8882e1e565e320713d9bd902ac236dda03e3263ca3a289fe5131f7e60da37e`. [QA validation](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38518894177), [A](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38518894194), [B–F](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38518894107) green; archive helper remains15/1 (BUG0021). Preserve old0010–16 expectations/history.

First [full campaign CI](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38518894233), `CAMP-20261014-055217021-fa0574`, aggregate **230 pass /8 fail /14 blocked /4 optional unit skips**, all256 expected slots accounted for. Aggregate comes from allowlisted console counters; detailed full campaign artifact is in that workflow. Do not assign separate standalone case observations to this campaign solely because its totals match.

Separate [PostgreSQL82](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38518894112), [immutable summary](RUN-2026-10-14T05-52-04-763Z-runtime.json): original49 all pass; new lanes12 pass/7 fail/14 archive blocked. No skipped SQL;43/43 applied PostgreSQL16.15.

Executed B-107 controlled concurrency: two350 payments accepted against600, payment cash700, document paid350/balance250, GL AR−100. This is an independent new over-allocation/GL-subledger failure, not reopening old allocation permission BUG0010. B-106 replay also fails; source shows generic idempotency completion recognizes result.id, while payment result stores ok/paidCount. No double-payment claim from that retry alone.

Archive14 collection is a **QA import defect** (`withTenantContext` is in helpers, not tenant-context); no restore assertion executed. D-103/D-105 first attempts lack required on_rent/wash/repair location fixtures; their failure does not establish dispatch or over-return product defects. Preserve first outcomes, correct the import/locations without changing expected business behavior, then use a new fingerprint.

D-117 rental Viewer writes, D-118 rental fault rollback and C-109 Viewer transfer fail; new sanitized numeric diagnostics and assertion source-line locations are being added before final attribution. Source `withTenantContext` reserves/sets a connection; it does not automatically start a transaction. Therefore connection scoping must not be treated as atomic financial/stock posting. No raw errors/SQL/URLs/records are published.

Follow-up expands to85 PostgreSQL assertions: separated transfer race RT021 from real last-unit sale C114, adds full failed-transfer snapshot RT022, rental tender RT023 and disabled-rental Owner E104. These have not been inferred passing from source. Full137 defined workflows remain unaccepted; broader credential/browser/real-storage/settings/history/recovery work and business policies are still open. Owner policy question remains pending.
