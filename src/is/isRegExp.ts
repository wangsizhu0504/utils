import getNodeUtil from '../_internal/getNodeUtil'
import toTypeString from '../_internal/toTypeString'
import { isObjectLike } from './isObject'

/* Node.js helper references. */
const nodeIsRegExp = getNodeUtil && getNodeUtil.isRegExp

/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 * @example
 *
 * isRegExp(/abc/)
 * // => true
 *
 * isRegExp('/abc/')
 * // => false
 */
export const isRegExp = nodeIsRegExp
  ? (value: any) => nodeIsRegExp(value)
  : (value: any) => isObjectLike(value) && toTypeString(value) === '[object RegExp]'
