import { isPrototype } from '../is/isPrototype'

/**
 * Initializes an object clone.
 *
 * @private
 * @param {object} object The object to clone.
 * @returns {object} Returns the initialized clone.
 */
export function initCloneObject(object: Record<string, any>) {
  return (typeof object.constructor === 'function' && !isPrototype(object))
    ? Object.create(Object.getPrototypeOf(object))
    : {}
}
