import toTypeString from '../_internal/toTypeString'
import { isArguments } from './isArguments'
import { isArray, isArrayLike } from './isArray'
import { isBuffer } from './isBuffer'
import { isPrototype } from './isPrototype'
import { isTypedArray } from './isTypeArray'

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * isEmpty(null)
 * // => true
 *
 * isEmpty(true)
 * // => true
 *
 * isEmpty(1)
 * // => true
 *
 * isEmpty([1, 2, 3])
 * // => false
 *
 * isEmpty('abc')
 * // => false
 *
 * isEmpty({ 'a': 1 })
 * // => false
 */
export function isEmpty(value: any) {
  if (value == null)
    return true

  if (
    isArrayLike(value)
    && (isArray(value)
    || typeof value === 'string'
    || typeof value.splice === 'function'
    || isBuffer(value)
    || isTypedArray(value)
    || isArguments(value))
  )
    return !value.length

  const tag = toTypeString(value)
  if (tag === '[object Map]' || tag === '[object Set]')
    return !value.size

  if (isPrototype(value))
    return !Object.keys(value).length

  for (const key in value) {
    if (hasOwnProperty.call(value, key))
      return false
  }
  return true
}
