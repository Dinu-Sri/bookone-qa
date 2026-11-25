// Portable orchestration for a host that exposes both persisted-file and Browser app tools.
// No browser driver or network client is created here. Hooks are supplied by the host.
export async function dispatchConnectedBrowser({prepared, claim, finish, js, now = Date.now}) {
  if (typeof js !== 'function' || typeof claim !== 'function' || typeof finish !== 'function') {
    throw Error('Actual Browser app js and durable host hooks required');
  }
  if (!prepared?.ok) return {executed: false, reason: prepared?.reason ?? 'Prepare refused', toolCalls: 0};
  const hashes = new Map(prepared.digests);
  const digest = value => {
    const hash = hashes.get(JSON.stringify(value));
    if (!hash) throw Error('Unrecognized persisted plan/fingerprint');
    return hash;
  };
  // Bundle is built from the pinned, unchanged queue/clock/action-guard source.
  // The tool host need not expose structuredClone. Inputs are persisted JSON only.
  const jsonClone = value => JSON.parse(JSON.stringify(value));
  const runtime = new Function('digest', 'randomUUID', 'structuredClone', prepared.runtimeSource)(
    digest, () => prepared.dispatchId, jsonClone);
  let toolCalls = 0;
  let receipt;
  let out;
  let finishError;
  try {
    out = await runtime.dispatchBrowserAppWrite({...prepared.inputs, now: now()}, {
      script: prepared.script,
      js: async script => {
        if (script !== prepared.script) throw Error('Script binding changed');
        receipt = await claim(prepared.preparationId);
        if (!receipt?.ok) throw Error('Durable dispatch claim refused');
        // Recheck after host-tool latency; an expired clock must still cause zero Browser calls.
        const final = runtime.evaluateAuthorization({...receipt.inputs, now: now()});
        receipt.finalChargedClock = final.chargedClock ?? receipt.inputs.clock;
        if (!final.allowBrowserAction) throw Error('Final dispatch check refused');
        toolCalls++;
        return await js(script);
      },
    });
  } finally {
    // A failed/uncertain tool call remains consumed in durable storage; never replay.
    try {
      await finish({preparationId: prepared.preparationId, executed: out?.executed === true,
        toolCalls, uncertain: toolCalls > 0 && out?.executed !== true,
        chargedClock: receipt?.finalChargedClock ?? receipt?.inputs?.clock ?? out?.chargedClock});
    } catch (error) {
      finishError = error;
    }
  }
  if (finishError) {
    return {
      executed: false,
      uncertain: true,
      reason: 'Finish refused; never replay',
      toolCalls,
      chargedClock: receipt?.finalChargedClock ?? receipt?.inputs?.clock ?? out?.chargedClock,
    };
  }
  return {...out, chargedClock: receipt?.finalChargedClock ?? receipt?.inputs?.clock ?? out?.chargedClock,
    uncertain: toolCalls > 0 && out?.executed !== true, toolCalls};
}
