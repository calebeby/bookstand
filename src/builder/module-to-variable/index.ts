/**
 * Generates a usable variable name for an import
 * @example
 * "asdf-function_name blah" => "AsdfFunctionNameBlah"
 */
const moduleToVariable = (id: string): string =>
  id
    .replace(/\.[^.]*$/, '') // remove ext
    .split(/[./\s_-]+/)
    .filter(c => c !== '')
    .map(chunk => chunk[0].toUpperCase() + chunk.slice(1))
    .join('')

export default moduleToVariable
