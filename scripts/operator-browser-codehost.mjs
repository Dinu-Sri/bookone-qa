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
    if (typeof data !== 'string' || data.length % 4 !== 0 ||
        !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(data)) {
      throw Error('Invalid slice base64');
    }
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const padding = data.endsWith('==') ? 2 : data.endsWith('=') ? 1 : 0;
    const out = new Uint8Array(data.length / 4 * 3 - padding);
    let cursor = 0;
    for (let i = 0; i < data.length; i += 4) {
      const a = alphabet.indexOf(data[i]), b = alphabet.indexOf(data[i + 1]);
      const c = data[i + 2] === '=' ? 0 : alphabet.indexOf(data[i + 2]);
      const d = data[i + 3] === '=' ? 0 : alphabet.indexOf(data[i + 3]);
      if ((data[i + 2] === '=' && (b & 15)) || (data[i + 3] === '=' && (c & 3))) {
        throw Error('Noncanonical slice base64');
      }
      const value = (a << 18) | (b << 12) | (c << 6) | d;
      for (const shift of [16, 8, 0]) if (cursor < out.length) out[cursor++] = (value >> shift) & 255;
    }
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
      if (piece.ok !== true || piece.offset !== offset || piece.total !== bytes || typeof piece.data !== 'string' || piece.length !== n || !/^[a-f0-9]{64}$/.test(piece.sha256)) {
        throw Error('Slice binding mismatch; incomplete preparation');
      }
      const chunk = decodeBase64(piece.data);
      if (chunk.length !== n) throw Error('Decoded slice length mismatch');
      const verified = parseEnvelope(await command(
        'node scripts/operator-browser-host.mjs verify-slice ' + quote(file) + ' ' + quote(offset) +
        ' ' + quote(piece.data) + ' ' + quote(piece.sha256), 2000), 'verify-slice');
      if (verified.ok !== true || verified.offset !== offset || verified.length !== n ||
          verified.sha256 !== piece.sha256) throw Error('Received slice integrity mismatch');
      chunks.push(chunk);
      offset += piece.length;
    }
    let total = 0;
    for (const chunk of chunks) total += chunk.length;
    if (total !== bytes) throw Error('Reassembled payload length mismatch');
    const raw = new Uint8Array(total);
    let cursor = 0;
    for (const chunk of chunks) { raw.set(chunk, cursor); cursor += chunk.length; }
    return decodeURIComponent(Array.from(raw, byte => '%' + byte.toString(16).padStart(2, '0')).join(''));
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
    if (env.ok === false) return {executed: false, reason: env.reason ?? 'Prepare refused', toolCalls: 0};
    if (env.ok !== true) throw Error('Prepare envelope missing valid disposition');
    if (typeof env.file !== 'string' || !/^[a-f0-9]{64}$/.test(env.sha256) || !Number.isSafeInteger(env.bytes) || env.bytes < 1) {
      throw Error('Prepare envelope missing file reference');
    }
    const record = JSON.parse(await readSliced(env.file, env.bytes));
    const prepared = record.prepared;
    const confirm = parseEnvelope(await command(
      'node scripts/operator-browser-host.mjs confirm ' + quote(env.file) + ' ' + quote(env.sha256) + ' ' + quote(env.bytes), 2000),
      'confirm');
    if (!prepared?.ok || !confirm.ok || confirm.preparationId !== prepared.preparationId ||
        confirm.dispatchId !== prepared.dispatchId || confirm.runtimeHash !== prepared.runtimeHash ||
        prepared.preparationId !== env.preparationId || prepared.dispatchId !== env.dispatchId ||
        prepared.runtimeHash !== env.runtimeHash) {
      throw Error('Reassembled preparation does not match durable file');
    }
    const result = await dispatch({prepared,
      claim: async id => {
        claimedUnknown = true;
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
        if (envelope.ok === false && typeof envelope.reason === 'string') {
          claimedUnknown = false;
          return envelope;
        }
        if (envelope.ok !== true || envelope.preparationId !== id ||
            typeof envelope.file !== 'string' || !/^[a-f0-9]{64}$/.test(envelope.sha256) ||
            !Number.isSafeInteger(envelope.bytes) || envelope.bytes < 1) {
          throw Error('Claim receipt incomplete; never replay');
        }
        const payload = JSON.parse(await readSliced(envelope.file, envelope.bytes));
        const confirmation = parseEnvelope(await command(
          'node scripts/operator-browser-host.mjs confirm-claim ' + quote(envelope.file) + ' ' +
          quote(envelope.sha256) + ' ' + quote(envelope.bytes), 2000), 'confirm-claim');
        if (confirmation.ok !== true || confirmation.preparationId !== id ||
            confirmation.bytes !== envelope.bytes || confirmation.runtimeHash !== envelope.runtimeHash ||
            confirmation.planHash !== envelope.planHash || confirmation.fingerprintHash !== envelope.fingerprintHash ||
            payload.ok !== true || payload.preparationId !== id || payload.planHash !== envelope.planHash ||
            payload.fingerprintHash !== envelope.fingerprintHash || payload.runtimeHash !== envelope.runtimeHash ||
            !payload.chargedClock || !Array.isArray(payload.chargedClock.events)) {
          throw Error('Claim payload incomplete; never replay');
        }
        if (envelope.planHash !== prepared.inputs.state.planHash ||
            envelope.fingerprintHash !== prepared.inputs.state.fingerprintHash ||
            envelope.runtimeHash !== prepared.runtimeHash || !payload.chargedClock) {
          throw Error('Claim receipt incomplete; never replay');
        }
        claimedUnknown = false;
        return {ok: true, inputs: {...prepared.inputs, clock: payload.chargedClock}};
      },
      finish: async result => {
        if (claimedUnknown) { result = {...result, uncertain: true}; delete result.chargedClock; }
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
    return {...result, uncertain: claimedUnknown || result.uncertain === true};
  } catch (error) {
    return {
      executed: false,
      uncertain: claimedUnknown,
      reason: error instanceof Error ? error.message : String(error),
      toolCalls: 0,
    };
  }
}
