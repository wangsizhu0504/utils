import getNodeUtil from '../_internal/getNodeUtil'
import toTypeString from '../_internal/toTypeString'
import { isObjectLike } from './isObject'

/* Node.js helper references. */
const nodeIsDate = getNodeUtil && getNodeUtil.isDate

/**
 * Checks if `value` is classified as a `Date` object.
 *
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
 * @example
 *
 * isDate(new Date)
 * // => true
 *
 * isDate('Mon April 23 2012')
 * // => false
 */
export function isDate(value?: any): value is Date {
  if (nodeIsDate)
    return nodeIsDate(value)
  else
    return isObjectLike(value) && toTypeString(value) === '[object Date]'
}
