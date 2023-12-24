import toTypeString from '../_internal/toTypeString'
import { isObjectLike } from './isObject'

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object, else `false`.
 * @example
 *
 * isArguments(function() { return arguments }())
 * // => true
 *
 * isArguments([1, 2, 3])
 * // => false
 */
export function isArguments(value: unknown): boolean {
  return isObjectLike(value) && toTypeString(value) === '[object Arguments]'
}
