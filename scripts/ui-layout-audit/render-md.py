import json,sys,os
d=sys.argv[1]; F=json.load(open(os.path.join(d,'findings.json')))
order={'Critical':0,'High':1,'Medium':2,'Low':3}
out=[]; w=out.append
w("# BookOne UI layout audit — 26 Nov 2026\n")
w("Staging `staging.clossyan.com`, build **v2.17.12 · e2e04d2**. Synthetic owner account UI-A (credentials kept privately, not in this public repo).\n")
w("## Summary\n")
from collections import Counter; c=Counter(f['sev'] for f in F)
w(f"{len(F)} layout findings: **{c['Critical']} critical, {c['High']} high, {c['Medium']} medium, {c['Low']} low**. 93 routes × 3 viewports (desktop 1440×900, tablet 768×1024, mobile 390×844) = 279 captures, 0 load errors.\n")
w("The biggest problems are structural, not per-page: the app shell has no responsive mode (UI-01, UI-02, UI-05), and tables and line-item grids have no narrow-screen layout (UI-03, UI-07, UI-08, UI-09). Fixing the shell drawer, a shared responsive table, and the line-item grid resolves most mobile/tablet findings at once. Desktop is mostly sound; its issues are alignment and consistency (UI-04, UI-10 to UI-23).\n")
w("### Suggested fix order for the coding agent\n")
w("1. App shell: off-canvas sidebar below 1024px + one-row mobile top bar (UI-01, UI-02, UI-05, UI-18).\n2. Shared table: right-aligned tabular money, nowrap codes/dates, stacked cards under 640px, scroll wrapper (UI-03, UI-04, UI-06, UI-09, UI-14, UI-20).\n3. Line-item grid and narrow forms (UI-07, UI-08, UI-23, UI-22).\n4. Page frame and form primitives: PageShell, check-row, form footer, form-grid auto-fit (UI-15, UI-16, UI-17, UI-29, UI-32, UI-02 forms).\n5. Dashboard and remaining polish (UI-10 to UI-13, UI-19, UI-21, UI-24 to UI-31).\n")
w("## Findings index\n\n| ID | Severity | Title | Where | Viewport |\n|---|---|---|---|---|")
for f in sorted(F,key=lambda f:(order[f['sev']],f['id'])): w(f"| [{f['id']}](#{f['id'].lower()}) | {f['sev']} | {f['title']} | {f['area']} | {f['vp']} |")
w("")
for f in sorted(F,key=lambda f:(order[f['sev']],f['id'])):
    w(f"## {f['id']}\n\n**{f['title']}**  \nSeverity: **{f['sev']}** · Area: {f['area']} · Viewport: {f['vp']}  \nScreens: {f['screens']}\n")
    w(f"**What is wrong.** {f['what']}\n")
    w("**Steps to reproduce.**\n"+"\n".join(f"{i+1}. {s}" for i,s in enumerate(f['repro']))+"\n")
    w("**Evidence.**\n\n"+"\n\n".join(f"![{f['id']}](img/{e})" for e in f['evidence'])+"\n")
    w(f"**Suggested fix.** {f['fix']}\n")
w(open(os.path.join(d,'_tail.md')).read())
open(os.path.join(d,'README.md'),'w').write("\n".join(out))
