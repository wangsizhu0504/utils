import getNodeUtil from '../_internal/getNodeUtil'
import toTypeString from '../_internal/toTypeString'

import { isObjectLike } from './isObject'

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
export const isTypedArray = nodeIsTypedArray
  ? (value: any) => nodeIsTypedArray(value)
  : (value: any) => isObjectLike(value) && reTypedTag.test(toTypeString(value))
