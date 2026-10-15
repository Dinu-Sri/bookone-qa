# Coding handoff: v2.5.6 independent retest

Product d5377d89d2bd9d27c52a6e9c43376f2d03255bd0 / VERSION2.5.6. Rulebook1.0.0 SHA256abcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc. Product source/QA fingerprint, not deployed acceptance; open live page still displayed v2.5.5 /8e1a2b8 on2026-10-15.

First unchanged [campaign](../runs/CAMP-20261015-015120720-373e0d.json), CI38667833810:292checks290pass/2fail/zero skips/blocks. [PostgreSQL](../runs/RUN-2026-10-15T01-51-27-828Z-runtime.json), CI38667833917:116/118pass, no infrastructure failures. Implementation54ea08b9b3d014dfdb557fac0a7beecdaee421c1; tested merge70cdcc1661dade2b094a882849a2e33afea59dbc; content725578279b4b7bc38b537b3a5040a1b8d071a571ff365770af0e0e271aa47b23.

All19 earlier failing repros pass: B-115/RT-026 (BUG-0031), RT-025 (0032), RT-027 (0024 omission), RT-028/030/031 (0033), RT-029 (0034), RT-034 (0035), RT-035 (0036), RT-036/037 (0037), RT-038/041 (0038), B-105 (0039), RT-039 (0040), RT-045/051 (0041), RT-046 (0042). No full bug/workflow/customer acceptance from that alone; preserve original and adjacent tests.

Remaining failures:

- [BUG-0043 / RT-047](../bugs/BUG-0043-module-off-historical-detail.md): new read guard prevents Owner historical invoice detail after Sales-off. Preserve active jobs/explicit-deny/branch/tenant checks; do not bypass all read guards. Historical read eligibility needs to coexist with module write denial under RB-CONFIG-01. First run stops at detail, so no after-error report/snapshot observations claimed.
- B-104 stopped creating credit before report assertions. Fixture changed source description and repriced1 unit200 to100. Correct to copied source description,0.5 unit at original200: same independently expected100 credit,250 receipt,600 invoice,250 remaining AR, journals and reports. First result retained; no wrong report amount observed. Edited-description/ad-hoc credit support is not established by this correction.

Follow-up requires a fresh fingerprint on the same product: source-consistent B-104 fixture plus explicit RT-047 denial observation without relaxing any expectations. All292 checks retained; no new pass claimed before execution. Read changes/CHG-20261015-v256-independent-retest.md.

No product source edits or new staging records. Exact synthetic account/role grant approval, Chrome popup dismissal, matching live stamp, real browser and encrypted A-to-new-empty-B restore remain pending.137 workflows62partial/75unbound/zero fully accepted; Sri Lankan expert and operator recovery gates open. Never publish private archive/password/cookie/raw evidence or run company-reset SQL.
