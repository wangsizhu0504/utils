import getNodeUtil from '../_internal/getNodeUtil'
import toTypeString from '../_internal/toTypeString'

import { isObjectLike } from './isObject'

/* Node.js helper references. */
const nodeIsSet = getNodeUtil && getNodeUtil.isSet

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * isSet(new Set)
 * // => true
 *
 * isSet(new WeakSet)
 * // => false
 */
export function isSet(value?: any): value is Set<any> {
  if (nodeIsSet)
    return nodeIsSet(value)
  else
    return isObjectLike(value) && toTypeString(value) === '[object Set]'
}
