/** Used to detect unsigned integer values. */
const reIsUint = /^(?:0|[1-9]\d*)$/

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
export function isIndex(value: any, length: number) {
  const type = typeof value
  length = length == null ? Number.MAX_SAFE_INTEGER : length

  return !!length
    && (type === 'number'
      || (type !== 'symbol' && reIsUint.test(value)))
        && (value > -1 && value % 1 === 0 && value < length)
}
