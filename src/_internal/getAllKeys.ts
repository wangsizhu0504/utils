import { keys } from '../object/keys'
import { getSymbols, getSymbolsIn } from './getSymbols'

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
export function getAllKeys(object: Record<string, any>): any[] {
  const result = keys(object)
  if (!Array.isArray(object))
    result.push(...getSymbols(object))

  return result
}

/**
 * Creates an array of own and inherited enumerable property names and symbols of `object`.
 *
 * @private
 * @param {object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
export function getAllKeysIn(object: Record<string, any>) {
  const result = []
  for (const key in object)
    result.push(key)

  if (!Array.isArray(object))
    result.push(...getSymbolsIn(object))

  return result
}
