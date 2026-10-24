// Load this module's source in the tool host; it has no Node imports.
// tools is the host's real tool namespace, not a simulated browser implementation.
export async function runPersistedBrowserRequest({tools, cwd, requestPath}) {
  const quote = value => "'" + String(value).replaceAll("'", "'\\''") + "'";
  const command = async (cmd, max_output_tokens = 16000) => {
    const result = await tools.exec_command({cmd, workdir: cwd, max_output_tokens});
    if (result.exit_code !== 0 || result.session_id) throw Error('Host command did not complete successfully; inspect private evidence');
    return result.output;
  };
  const code = await command('cat scripts/operator-browser-transport.mjs', 5000);
  const dispatch = new Function(code.replace('export async function', 'async function') +
    '\nreturn dispatchConnectedBrowser;')();
  const prepared = JSON.parse(await command('node scripts/operator-browser-host.mjs prepare ' + quote(requestPath)));
  const separator = requestPath.lastIndexOf('/');
  if (separator < 0) throw Error('Use an explicit request directory');
  const dir = requestPath.slice(0, separator);
  return dispatch({prepared,
    claim: async id => JSON.parse(await command('node scripts/operator-browser-host.mjs claim ' + quote(dir) + ' ' + quote(id))),
    finish: async result => {
      const file = dir + '/finish-' + result.preparationId + '.json';
      const patch = await tools.apply_patch('*** Begin Patch\n*** Add File: ' + file + '\n+' + JSON.stringify(result) + '\n*** End Patch');
      if (patch?.isError) throw Error('Private finish evidence could not be written');
      const receipt = JSON.parse(await command('node scripts/operator-browser-host.mjs finish ' + quote(dir) + ' ' + quote(file), 1000));
      if (!receipt.ok) throw Error('Finish refused; never replay');
    },
    js: async script => {
      const result = await tools.mcp__codex_apps__browser_js({code: script});
      if (result.isError) throw Error('Actual Browser app reported an error; inspect outcome without replay');
      return result;
    },
  });
}
