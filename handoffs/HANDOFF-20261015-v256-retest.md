# Coding handoff: v2.5.6 retest - one historical-access regression

Product **v2.5.6 / d5377d89d2bd9d27c52a6e9c43376f2d03255bd0**. Rulebook1.0.0/hashabcdd8970b1c36e62a97c6a111d6088ca97067ad3d6e954f64250b67989b39fc. Source/runtime only; actual deployed browser/restore acceptance remains open.

[Final campaign](../runs/CAMP-20261015-015814708-878549.json), [CI38668445673](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38668445673): **292 checks,291 passed,1 failed,zero skipped/blocked/flaky/not-run**. [PostgreSQL](../runs/RUN-2026-10-15T01-58-15-584Z-runtime.json), [CI38668445532](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38668445532):117/118pass, no infrastructure failures,43/43 migrations on PostgreSQL16.15. All98 retained units,60 source and16 archive helpers pass. QA implementation04f5b860c36a93b557ed4d146b2f3b362223f794; tested mergeaedfbfbd1ca848984e39460d42a7678513b25be8; contenta2d4412ae8392dab664eedf3def0ed4a3510bd0cf8137c4dba65ce1c632d0cca. Exact fixture/plan hashes in immutable reports.

## Repair requested

**[BUG-0043 / RT-047](../bugs/BUG-0043-module-off-historical-detail.md): after disabling Sales, Owner cannot open an existing invoice100.** historyDenied1 (expected0), invoiceReadGrant0. New invoice/payment commands correctly denied, report profit100 remains correct, business snapshot unchanged1. This is denied historical access, not evidence of deleted records or wrong balances. RB-CONFIG-01 revision1 is an owner-adopted default, independently expert-pending; BR-DAT-01/BR-SEC-02 also apply.

The new assertCanReadCommercialDocument requires the normal module-ceiling read grant. Add authoritative eligibility for permitted historical reads when module writes are disabled, respecting active membership, job read authority, explicit denies, tenant and dimensions. Do not remove the read/scope guards or grant every disabled-module screen to every reader. Review analogous detail/print/export paths, preserve report/history positives, and rerun RT-045/046/047/048/049/050/051 plus the full292 checks on the next deliberately pinned candidate.

## Previous repairs - bounded passing evidence

All19 previously failing cases pass for the thirteen reported groups:

- BUG-0031: B-115, RT-026
- BUG-0032: RT-025
- BUG-0024: RT-027
- BUG-0033: RT-028, RT-030, RT-031
- BUG-0034: RT-029
- BUG-0035: RT-034
- BUG-0036: RT-035
- BUG-0037: RT-036, RT-037
- BUG-0038: RT-038, RT-041
- BUG-0039: B-105
- BUG-0040: RT-039
- BUG-0041: RT-045, RT-051
- BUG-0042: RT-046

This does not certify all business workflows or close broader credential/browser/storage acceptance. Preserve original Viewer/allocation/tender/date/SKU/atomicity/reserved-driver/tenant/reversal controls. No old BUG-0010-0030 original defect was reopened; BUG-0024 omitted checksum was an already tracked adjacent case.

## First attempt and fixture correction retained

[First unchanged campaign](../runs/CAMP-20261015-015120720-373e0d.json), CI38667833810:290pass/2fail; [PG](../runs/RUN-2026-10-15T01-51-27-828Z-runtime.json), CI38667833917:116/118pass. B-104 stopped at credit creation before reporting money: return changed source description and repriced1 unit from200 to100. Corrected to copied source description and0.5 unit at original200, preserving all original credit100/receipt250/source600/AR250/journal/report expectations. Final B-104 income500 and cash250 match exactly. This is a source-consistent benchmark, not acceptance of edited-description/ad-hoc credits. First fixture and failed report remain immutable; no wrong report amount was observed in that attempt. RT-047 adds known-denial capture and still explicitly expects no denial, original detail100/report100 and unchanged snapshot.

## Next acceptance work

Coding agent repairs BUG-0043 and ships a new CHG/SHA; QA reviews diff and independently retests. Last open-page observation was v2.5.5 /8e1a2b8; subsequent context read did not return and was cancelled, so deployment is unconfirmed. Browser phases require matching stamp and fresh normal actors. Exact synthetic role-grant approval and Chrome popup dismissal still pending; no bypass/account creation. No new staging writes or product edits by QA.

Real encrypted A-to-new-empty-B restore, attachment bytes, remaining physical/service/digital/rental/mixed/settings/users/files/history workflows, Sri Lankan expert RF-01-10 and operator recovery remain open.137 workflows62partial/75unbound/zero fully accepted; no readiness percentage or customer certificate. No company-reset SQL, shared-staging faults, production access or public secrets/archives/raw evidence.
