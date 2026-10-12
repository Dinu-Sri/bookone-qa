/** Credentials and base URL for browser tests (QA CLI / env, not the retired ERP /e2e console). */
export function requireE2eAuth() {
  const email = process.env.E2E_EMAIL?.trim() || '';
  const password = process.env.E2E_PASSWORD || '';
  if (!email || !password) {
    throw new Error(
      'E2E_EMAIL and E2E_PASSWORD are required. Supply them through your local environment or an authorized secret store.',
    );
  }
  return { email, password };
}

export function seed(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
