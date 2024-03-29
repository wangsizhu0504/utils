const toString = Object.prototype.toString

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function toTypeString(value: unknown): string {
  if (value == null)
    return value === undefined ? '[object Undefined]' : '[object Null]'

  return toString.call(value)
}
export default toTypeString
