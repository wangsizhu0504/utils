/** Built-in value references. */

const propertyIsEnumerable = Object.prototype.propertyIsEnumerable

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeGetSymbols = Object.getOwnPropertySymbols

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
export function getSymbols(object: Record<string, any>) {
  if (object == null)
    return []

  object = Object(object)
  return nativeGetSymbols(object).filter(symbol => propertyIsEnumerable.call(object, symbol))
}

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
export function getSymbolsIn(object: Record<string, any>) {
  const result = []
  while (object) {
    result.push(...getSymbols(object))
    object = Object.getPrototypeOf(Object(object))
  }
  return result
}
