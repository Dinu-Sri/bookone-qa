// Emit fixed categories only. Never return a message, stack, SQL, URL or identity.
export function failureCategories(messages) {
  const text = Array.isArray(messages) ? messages.filter(x=>typeof x==='string').join('\n') : '';
  return [
    ['driver-options-parsers-missing', /Cannot read properties of undefined \(reading ['"]parsers['"]\)/],
    ['driver-begin-unavailable', /\.begin is not a function/],
    ['driver-savepoint-unavailable', /\.savepoint is not a function/],
    ['test-timeout', /Test timed out in/],
  ].filter(([,pattern])=>pattern.test(text)).map(([category])=>category);
}
