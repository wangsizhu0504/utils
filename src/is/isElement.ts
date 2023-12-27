import { isObjectLike } from './isObject'
import { isPlainObject } from './isPlainObject'

/**
 * Checks if `value` is likely a DOM element.
 *
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * isElement(document.body)
 * // => true
 *
 * isElement('<body>')
 * // => false
 */
export function isElement(value?: any): boolean {
  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value)
}
