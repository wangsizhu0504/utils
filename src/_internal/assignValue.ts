import { eq } from '../object/eq'

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent.
 *
 * @private
 * @param {object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
export function assignValue(object: Record<string, any>, key: string, value: any) {
  const objValue = object[key]

  if (!(hasOwnProperty.call(object, key) && eq(objValue, value))) {
    if (value !== 0 || (1 / value) === (1 / objValue))
      baseAssignValue(object, key, value)
  } else if (value === undefined && !(key in object)) {
    baseAssignValue(object, key, value)
  }
}

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
export function baseAssignValue(object: Record<string, any>, key: string, value: any) {
  if (key === '__proto__') {
    Object.defineProperty(object, key, {
      configurable: true,
      enumerable: true,
      value,
      writable: true,
    })
  } else {
    object[key] = value
  }
}
