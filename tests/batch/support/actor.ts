// Synthetic session boundary. Real product assertPermission is NOT replaced.
// This does not exercise credential login, permission loading, or runtime RLS.
export { isReadOnlyJob } from '@product/auth/permissions/resolve';
export { SCREEN_DEFS, screenKeyFromHref } from '@product/auth/permissions/catalog';
export const TENANT_A = '00000000-0000-4000-8000-000000000001';
export const TENANT_B = '00000000-0000-4000-8000-000000000002';
let role = 'owner';
let tenantId = TENANT_A;
export function setActor(nextRole = 'owner', nextTenant = TENANT_A) {
  role = nextRole; tenantId = nextTenant;
}
export async function requireTenantContext() {
  return { id: '00000000-0000-4000-8000-000000000003', tenantId,
    name: 'Synthetic QA actor', email: 'fixture@example.invalid', role,
    platformRole: 'user', jobSlug: role };
}
export async function getSession() { return { user: await requireTenantContext() }; }
export async function getRequestAccess() {
  return { primaryTemplateKey: role, jobSlug: role, legacyRole: role,
    allows: (_key: string, need: string) => need === 'read' || role === 'owner' };
}
export const loadAccessForUser = getRequestAccess;
