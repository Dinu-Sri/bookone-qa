# AUTH-20261030-isolated-rental-company — REQUEST, not granted

Status: awaiting-owner-Control-Room-decision. This record does not grant access.

- Date: 2026-10-30.
- Requester: Rapid04 coding/fixture qualification (companion of product v2.5.24).
- Authority needed: Control Room plan/module write. Owner already authorizes synthetic signup of new companies; Starter keeps Inventory and Rental off. Pro (or equivalent) turns both on. Coding agent must not use Control Room without this specific authorization.

## Recipients and exact scope

| Alias | How created | Requested grant | Boundary |
|---|---|---|---|
| Isolated company A | Supported signup / Add company by an Owner-authorized synthetic user. Private locator only. | Control Room: plan **Pro** (or equivalent) with **Inventory on** and **Rental on** for company A only. | Fleet 20 @ 50, warehouse / on-rent / wash / repair via supported Inventory locations UI if signup does not seed them. CoA 1000/1100/1200/1300/2400/4400/4450/5150. |
| A Owner | Creator of company A | None beyond Owner of A | Permitted rental writes after the Pro grant. |
| A Viewer | Team invite to A with Viewer job | None beyond Viewer template | Read rental calendar/dispatch; write deny. |
| Isolated company B | Second supported signup, default Starter | **None** | Foreign tenant. Inventory/Rental remain off. Used for cross-tenant denial. |
| B Owner | Creator of company B | None | Foreign actor on A records. |

## Explicitly out of scope

- Original trading QA company: do not change its modules, jobs, or plan. Inventory-off is an observed ceiling.
- Password reset, SQL, hidden actions, quick-create bypass, BYPASSRLS, RBAC/RLS disable.
- Control Room grants for any tenant other than isolated A.
- Bank 1100 / card 1200 funded positives (separate fixture cashing after this grant).
- Archive/recovery.

## Independent local qualification while this is pending

`tests/runtime/rental.test.ts` seeds synthetic TENANT_A with `rental:true` / `inventory:true` on empty `bookone_qa_runtime` without Control Room. That is Owner-DB synthetic-session evidence only. It does not create staging company A/B and does not satisfy HTTP/browser credential denials.

## Next owner action

Approve or refuse this Control Room Pro+rental grant for isolated A only. After a grant, record the actual creator, flags, and private locator outside Git. Medium binds those identities into a NEW Rapid04 Light mission. Do not execute PLAN-RAPID04 or MISSION-v2524-RAPID-04 until then.
