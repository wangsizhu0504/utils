import toTypeString from '../_internal/toTypeString'
import { isObjectLike } from './isObject'
import { isPlainObject } from './isPlainObject'

/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
 * `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
 * @example
 *
 * isError(new Error)
 * // => true
 *
 * isError(Error)
 * // => false
 */
export function isError(value: any): value is Error {
  if (!isObjectLike(value))
    return false

  const tag = toTypeString(value)
  return (
    tag === '[object Error]'
        || tag === '[object DOMException]'
        || (typeof value.message === 'string'
            && typeof value.name === 'string'
            && !isPlainObject(value))
  )
}
