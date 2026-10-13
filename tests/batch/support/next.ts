export function revalidatePath() {}
export function redirect(path: string): never { throw new Error(`QA redirect: ${path}`); }
export async function headers() { return new Headers(); }
