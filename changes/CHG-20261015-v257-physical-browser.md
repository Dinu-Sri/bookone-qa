# Live physical-goods run and report-equity regression

Product7ffafab14e0ac0b6c3e6150cec1c2c227fee87e6/live v2.5.7 /7ffafab, QA base5ae37b8f9ca135394e90e00269f950b43b71f8b8. [Manual run](../runs/RUN-20261015-v257-physical-browser.md) and [coding handoff](../handoffs/HANDOFF-20261015-v257-physical-browser-findings.md). Normal Owner credential UI with authorised admin module-only setup, no product source edits.23 bounded manual observations19pass/4fail, new BUG-0045-0048 including P1 unbalanced Balance Sheet. All first failures and configuration-preflight correction preserved.

Add RT-060 to commercial runtime lane and numeric observation allowlist: post a service invoice600 in fresh isolated PostgreSQL, independently require assets600/profit600/liability0/equity600 and unchanged balanced journal. This prevents balanced journals/P&L alone being mistaken for correct financial statements. Expected301 checks/PG127; existing300 IDs/expectations unchanged. No new data/schema/business-policy defaults. New fingerprint and fresh CI required; no new runtime result yet. Rulebook1.0.0 hashabcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc, BR-ACC-08/RB-UI-01; expert review unchanged.

No failed expectation may be reduced to match the current0 report equity. No balancing journal workaround. Retain correct posted fixture to retest rendering read-only. Company reset, production/shared-staging fault injection, secrets/archives/public raw traces excluded. Backup/restore last.

Preflight: pnpm session:start, pnpm check, campaign:plan and git diff --check passed. Plan discovers301 assertions including127 PostgreSQL; runtime execution pending publication. No weakened/removed old assertions.


## Subsequent isolated regression result

[301-check campaign](../runs/CAMP-20261015-070624689-f091fa.json), [CI38696490949](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38696490949): **300pass,1fail**, zero skip/block/flaky/not-run. Only RT-060 failed. [PostgreSQL](../runs/RUN-2026-10-15T07-06-31-692Z-runtime.json), [CI38696491048](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38696491048):126pass/1fail of127; no infrastructure failures;43/43 migrations on PostgreSQL16.15. Independent invoice600 gave assets600/profit600/liabilities0 but report equity0 instead of600. All original300 checks, including98units/60source/16archive helpers/126 priorPG checks, pass at this fresh fingerprint.

QA implementation ec441b210e19c7b8c35710cfef3e0f77d1a2a442; tested merge ed269a4a2624ecc7c7d1ef57796c163b3419c27f; QA content ea3c5e0da6c72944bbcfd3477b648b7f1658f277d07c233a157ff0563e49f252; plan 5196dbc99b6ee0633dd30930e373c69b0c34987ae7a4d306621b1a99ac340e9f; Node22.23.3, campaign-v2 bank hash 1a6e0581380277584a2318d851ee3eb7f2cf4b0c330230725cb5fd00ff5149fc. Product remains7ffafab. Complete fingerprints are in immutable JSON. This is an executed product assertion failure, separate from intentional full-workflow/policy acceptance gaps. Preserve the red check; do not weaken expected equity or rewrite posted journals. Earlier not-yet-executed statements describe the initial checkpoint only.
