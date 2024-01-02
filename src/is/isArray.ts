import getNodeUtil from '../_internal/getNodeUtil'
import toTypeString from '../_internal/toTypeString'
import { isObjectLike } from './isObject'
import { isLength } from './isLength'

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * isArray([1, 2, 3]);
 * // => true
 *
 * isArray(document.body.children);
 * // => false
 *
 * isArray('abc');
 * // => false
 *
 * isArray(noop);
 * // => false
 */
export const isArray = Array.isArray

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * isArrayLike([1, 2, 3])
 * // => true
 *
 * isArrayLike(document.body.children)
 * // => true
 *
 * isArrayLike('abc')
 * // => true
 *
 * isArrayLike(Function)
 * // => false
 */

export function isArrayLike<T>(value?: any): value is T[] {
  return value != null && typeof value !== 'function' && isLength(value.length)
}

/**
 * This method is like `isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * isArrayLikeObject([1, 2, 3])
 * // => true
 *
 * isArrayLikeObject(document.body.children)
 * // => true
 *
 * isArrayLikeObject('abc')
 * // => false
 *
 * isArrayLikeObject(Function)
 * // => false
 */
export function isArrayLikeObject<T>(value?: any): value is T[] {
  return isObjectLike(value) && isArrayLike(value)
}

/** Used to match `toStringTag` values of typed arrays. */
const reTypedTag = /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array\]$/

/* Node.js helper references. */
const nodeIsTypedArray = getNodeUtil && getNodeUtil.isTypedArray

/**
 * Checks if `value` is classified as a typed array.
 *
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * isTypedArray(new Uint8Array)
 * // => true
 *
 * isTypedArray([])
 * // => false
 */
export function isTypedArray(value: any): boolean {
  if (nodeIsTypedArray)
    return nodeIsTypedArray(value)
  else
    return isObjectLike(value) && reTypedTag.test(toTypeString(value))
}
