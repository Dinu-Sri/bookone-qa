// Load this module's source in the tool host; it has no Node imports.
// tools is the host's real tool namespace, not a simulated browser implementation.
export async function runPersistedBrowserRequest({tools, cwd, requestPath}) {
  const quote = value => "'" + String(value).replaceAll("'", "'\\''") + "'";
  const ENVELOPE_LIMIT = 4096;
  const SLICE_ENVELOPE_LIMIT = 12000;
  const SLICE_MAX = 4096;
  const command = async (cmd, max_output_tokens = 4000) => {
    const result = await tools.exec_command({cmd, workdir: cwd, max_output_tokens});
    if (result.exit_code !== 0 || result.session_id) throw Error('Host command did not complete successfully; inspect private evidence');
    return result.output;
  };
  const parseEnvelope = (output, label, limit = ENVELOPE_LIMIT) => {
    const text = String(output ?? '');
    if (/output truncated|truncated to|max_output_tokens/i.test(text)) {
      throw Error(label + ' truncated; incomplete host payload');
    }
    if (text.length > limit) throw Error(label + ' exceeded bounded envelope; refuse full dump');
    try { return JSON.parse(text); }
    catch { throw Error(label + ' is not complete JSON; incomplete host payload'); }
  };
  const decodeBase64 = data => {
    const bin = atob(data);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  };
  const readSliced = async (file, bytes) => {
    const chunks = [];
    let offset = 0;
    while (offset < bytes) {
      const n = Math.min(SLICE_MAX, bytes - offset);
      const piece = parseEnvelope(await command(
        'node scripts/operator-browser-host.mjs slice ' + quote(file) + ' ' + offset + ' ' + n, 8000),
        'slice', SLICE_ENVELOPE_LIMIT);
      if (!piece.ok || piece.offset !== offset || piece.total !== bytes || typeof piece.data !== 'string' || piece.length < 1) {
        throw Error('Slice binding mismatch; incomplete preparation');
      }
      chunks.push(decodeBase64(piece.data));
      offset += piece.length;
    }
    let total = 0;
    for (const chunk of chunks) total += chunk.length;
    if (total !== bytes) throw Error('Reassembled payload length mismatch');
    const raw = new Uint8Array(total);
    let cursor = 0;
    for (const chunk of chunks) { raw.set(chunk, cursor); cursor += chunk.length; }
    return new TextDecoder().decode(raw);
  };
  const code = await command('cat scripts/operator-browser-transport.mjs', 5000);
  const dispatch = new Function(code.replace('export async function', 'async function') +
    '\nreturn dispatchConnectedBrowser;')();
  const normalized = String(requestPath).replaceAll('\\', '/');
  const separator = normalized.lastIndexOf('/');
  if (separator < 0) throw Error('Use an explicit request directory');
  const dir = normalized.slice(0, separator);
  let claimedUnknown = false;
  try {
    const env = parseEnvelope(await command('node scripts/operator-browser-host.mjs prepare ' + quote(requestPath), 2000), 'prepare');
    if (!env.ok) return {executed: false, reason: env.reason ?? 'Prepare refused', toolCalls: 0};
    if (!env.file || !env.sha256 || !Number.isInteger(env.bytes) || env.bytes < 1) {
      throw Error('Prepare envelope missing file reference');
    }
    const record = JSON.parse(await readSliced(env.file, env.bytes));
    const prepared = record.prepared;
    const confirm = parseEnvelope(await command(
      'node scripts/operator-browser-host.mjs confirm ' + quote(env.file) + ' ' + env.sha256 + ' ' + env.bytes, 2000),
      'confirm');
    if (!prepared?.ok || !confirm.ok || confirm.preparationId !== prepared.preparationId ||
        confirm.dispatchId !== prepared.dispatchId || confirm.runtimeHash !== prepared.runtimeHash ||
        prepared.preparationId !== env.preparationId || prepared.dispatchId !== env.dispatchId ||
        prepared.runtimeHash !== env.runtimeHash) {
      throw Error('Reassembled preparation does not match durable file');
    }
    return await dispatch({prepared,
      claim: async id => {
        let output;
        try {
          output = await command('node scripts/operator-browser-host.mjs claim ' + quote(dir) + ' ' + quote(id), 2000);
        } catch (error) {
          claimedUnknown = true;
          throw error;
        }
        let envelope;
        try { envelope = parseEnvelope(output, 'claim'); }
        catch (error) {
          claimedUnknown = true;
          throw Error('Claim receipt incomplete; never replay');
        }
        if (!envelope.ok) return envelope;
        claimedUnknown = true;
        if (envelope.planHash !== prepared.inputs.state.planHash ||
            envelope.fingerprintHash !== prepared.inputs.state.fingerprintHash ||
            envelope.runtimeHash !== prepared.runtimeHash || !envelope.chargedClock) {
          throw Error('Claim receipt incomplete; never replay');
        }
        return {ok: true, inputs: {...prepared.inputs, clock: envelope.chargedClock}};
      },
      finish: async result => {
        const file = dir + '/finish-' + result.preparationId + '.json';
        const patch = await tools.apply_patch('*** Begin Patch\n*** Add File: ' + file + '\n+' + JSON.stringify(result) + '\n*** End Patch');
        if (patch?.isError) throw Error('Private finish evidence could not be written');
        const receipt = parseEnvelope(await command('node scripts/operator-browser-host.mjs finish ' + quote(dir) + ' ' + quote(file), 1000), 'finish');
        if (!receipt.ok) throw Error('Finish refused; never replay');
      },
      js: async script => {
        const result = await tools.mcp__codex_apps__browser_js({code: script});
        if (result.isError) throw Error('Actual Browser app reported an error; inspect outcome without replay');
        return result;
      },
    });
  } catch (error) {
    return {
      executed: false,
      uncertain: claimedUnknown,
      reason: error instanceof Error ? error.message : String(error),
      toolCalls: 0,
    };
  }
}
