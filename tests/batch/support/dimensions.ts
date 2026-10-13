// Unrestricted synthetic dimensions only; restricted-scope acceptance is separate.
export async function resolveDimensions() { return { brandId: null, locationId: null }; }
export async function currentDimensionScope() { return { brandIds: null, locationIds: null }; }
export async function assertDimensionScope() {}
export function columnInScope() { return undefined; }
