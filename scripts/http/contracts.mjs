import assert from 'node:assert/strict';

export function receiptPath(paymentIds) {
  assert.ok(Array.isArray(paymentIds) && paymentIds.length > 0, 'saved payment IDs required');
  const params = new URLSearchParams();
  for (const id of paymentIds) {
    assert.match(id, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    params.append('payment', id);
  }
  return '/sales/payments/receipt?' + params;
}

export function settingsDeniedValue(before, denied, allowed) {
  assert.ok(before.length <= 1, 'at most one settings row expected');
  const value = before[0]?.value === denied ? allowed : denied;
  if (before.length) assert.notEqual(value, before[0].value, 'denied payload must differ from opening value');
  return value;
}
