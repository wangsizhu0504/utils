/**
 * Checks if `value` is `undefined`.
 *
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * isUndefined(void 0)
 * // => true
 *
 * isUndefined(null)
 * // => false
 */
export function isUndefined(value?: any): value is undefined {
  return value === undefined
}
