import toTypeString from '../_internal/toTypeString'

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * isBoolean(false)
 * // => true
 *
 * isBoolean(null)
 * // => false
 */
export function isBoolean(value: unknown): boolean {
  return (
    value === true
    || value === false
    || (toTypeString(value) === '[object Boolean]')
  )
}
