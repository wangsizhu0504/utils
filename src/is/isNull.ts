/**
 * Checks if `value` is `null`.
 *
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
 * @example
 *
 * isNull(null)
 * // => true
 *
 * isNull(void 0)
 * // => false
 */
export function isNull(value?: any): value is null {
  return value === null
}
