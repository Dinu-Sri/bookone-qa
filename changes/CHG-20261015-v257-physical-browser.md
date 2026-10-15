# Live physical-goods run and report-equity regression

Product7ffafab14e0ac0b6c3e6150cec1c2c227fee87e6/live v2.5.7 /7ffafab, QA base5ae37b8f9ca135394e90e00269f950b43b71f8b8. [Manual run](../runs/RUN-20261015-v257-physical-browser.md) and [coding handoff](../handoffs/HANDOFF-20261015-v257-physical-browser-findings.md). Normal Owner credential UI with authorised admin module-only setup, no product source edits.23 bounded manual observations19pass/4fail, new BUG-0045-0048 including P1 unbalanced Balance Sheet. All first failures and configuration-preflight correction preserved.

Add RT-060 to commercial runtime lane and numeric observation allowlist: post a service invoice600 in fresh isolated PostgreSQL, independently require assets600/profit600/liability0/equity600 and unchanged balanced journal. This prevents balanced journals/P&L alone being mistaken for correct financial statements. Expected301 checks/PG127; existing300 IDs/expectations unchanged. No new data/schema/business-policy defaults. New fingerprint and fresh CI required; no new runtime result yet. Rulebook1.0.0 hashabcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc, BR-ACC-08/RB-UI-01; expert review unchanged.

No failed expectation may be reduced to match the current0 report equity. No balancing journal workaround. Retain correct posted fixture to retest rendering read-only. Company reset, production/shared-staging fault injection, secrets/archives/public raw traces excluded. Backup/restore last.

Preflight: pnpm session:start, pnpm check, campaign:plan and git diff --check passed. Plan discovers301 assertions including127 PostgreSQL; runtime execution pending publication. No weakened/removed old assertions.
