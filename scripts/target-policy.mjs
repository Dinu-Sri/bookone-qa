const allowed = new Set(['https://bookone.clossyan.com', 'http://localhost:3100', 'http://localhost:3000', 'http://127.0.0.1:3100', 'http://127.0.0.1:3000']);
export function assertTarget(value) {
  if (!value) throw new Error('E2E_BASE_URL is required; no implicit live target is allowed.');
  const url = new URL(value);
  if (url.username || url.password || url.search || url.hash || url.pathname !== '/' || !allowed.has(url.origin)) {
    throw new Error('Target is outside the reviewed staging/local origin registry. Review scripts/target-policy.mjs before adding environments.');
  }
  return url.origin;
}
