import toTypeString from '../_internal/toTypeString'

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * isString('abc')
 * // => true
 *
 * isString(1)
 * // => false
 */
export function isString(value: any) {
  const type = typeof value
  return (
    type === 'string'
    || (
      type === 'object'
        && value != null
        && !Array.isArray(value)
        && toTypeString(value) === '[object String]'
    )
  )
}
