import toTypeString from '../_internal/toTypeString'

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * isSymbol(Symbol.iterator)
 * // => true
 *
 * isSymbol('abc')
 * // => false
 */
export function isSymbol(value: any): value is symbol {
  const type = typeof value
  return (
    type === 'symbol'
    || (
      type === 'object'
      && value != null
      && toTypeString(value) === '[object Symbol]'
    )
  )
}
