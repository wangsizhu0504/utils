import getNodeUtil from '../_internal/getNodeUtil'
import toTypeString from '../_internal/toTypeString'
import root from '../_internal/root'
import { isObjectLike } from './isObject'

/* Node.js helper references. */
const nodeIsArrayBuffer = getNodeUtil && getNodeUtil.isArrayBuffer

/**
 * Checks if `value` is classified as an `ArrayBuffer` object.
 *
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
 * @example
 *
 * isArrayBuffer(new ArrayBuffer(2))
 * // => true
 *
 * isArrayBuffer(new Array(2))
 * // => false
 */
export const isArrayBuffer = nodeIsArrayBuffer
  ? (value: any) => nodeIsArrayBuffer(value)
  : (value: any) => isObjectLike(value) && toTypeString(value) === '[object ArrayBuffer]'

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeIsBuffer = root?.Buffer?.isBuffer

/**
 * Checks if `value` is a buffer.
 *
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * isBuffer(Buffer.alloc(2))
 * // => true
 *
 * isBuffer(new Uint8Array(2))
 * // => false
 */
export function isBuffer(value?: any): boolean {
  if (typeof nativeIsBuffer === 'function')
    return nativeIsBuffer(value)
  else
    return false
}
