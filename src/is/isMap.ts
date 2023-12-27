import getNodeUtil from '../_internal/getNodeUtil'
import toTypeString from '../_internal/toTypeString'
import { isObjectLike } from './isObject'

/* Node.js helper references. */
const nodeIsMap = getNodeUtil && getNodeUtil.isMap

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * isMap(new Map)
 * // => true
 *
 * isMap(new WeakMap)
 * // => false
 */
export function isMap(value?: any): value is Map<any, any> {
  if (nodeIsMap)
    return nodeIsMap(value)
  else
    return isObjectLike(value) && toTypeString(value) === '[object Map]'
}
