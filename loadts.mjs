/**
 * format hook so node accepts .ts files as module files
 * @param {string} url
 * @param {Object} context (currently empty)
 * @param {Function} defaultGetFormat
 * @returns {Promise<{ format: string }>}
 */
export async function getFormat(url, context, defaultGetFormat) {
  if (url.endsWith(".ts")) { // .ts files
    // format is one of the strings in the table: https://nodejs.org/api/esm.html#esm_hooks
    return {
      format: 'module',
    };
  }
  // Defer to Node.js for all other URLs.
  return defaultGetFormat(url, context, defaultGetFormat);
}

/**
 * resolve hook so a local `import... from "./"` statement with no extension defaults to load .ts files
 * @param {string} specifier
 * @param {{
 *   conditions: !Array<string>,
 *   parentURL: !(string | undefined),
 * }} context
 * @param {Function} defaultResolve
 * @returns {Promise<{ url: string }>}
 */
export async function resolve(specifier, context, defaultResolve) {
  const { parentURL = null } = context;
  if (specifier.startsWith(".") && !specifier.endsWith(".js") && !specifier.endsWith(".ts")) { // local, and no .js or .ts extension
    // Always return an object of the form {url: <string>}.
    return {
      url: parentURL ?
        new URL(specifier+".ts", parentURL).href :
        new URL(specifier).href,
    };
  }
  // Defer to Node.js for all other specifiers.
  return defaultResolve(specifier, context, defaultResolve);
}