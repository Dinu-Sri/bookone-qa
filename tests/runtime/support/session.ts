// Explicit synthetic authenticated identity boundary. Permission data/resolution
// and database helpers are real product code. No browser/credential-login claim.
export { SCREEN_DEFS, screenKeyFromHref } from '@product/auth/permissions/catalog';
export { isReadOnlyJob } from '@product/auth/permissions/resolve';
export { inDimensionScope } from '@product/auth/permissions/scope';
export { loadAccessForUser, getRequestAccess } from '@product/auth/permissions/load';
export { TENANT_A, TENANT_B } from '../../batch/support/actor';
export const OWNER = '00000000-0000-4000-8000-000000000003';
export const VIEWER = '00000000-0000-4000-8000-000000000004';
export const SALES = '00000000-0000-4000-8000-000000000005';
let actor = { id: OWNER, tenantId: '00000000-0000-4000-8000-000000000001', role: 'owner' };
export function setActor(id = OWNER, role = 'owner', tenantId = '00000000-0000-4000-8000-000000000001') { actor = { id, role, tenantId }; }
export async function requireTenantContext() { return { ...actor, name: 'Synthetic runtime actor', email: 'qa@example.invalid', platformRole: 'user' as const }; }
export async function getSession() { return { user: await requireTenantContext() }; }
