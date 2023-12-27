/** Used for built-in method references. */
const objectProto = Object.prototype

/**
 * Checks if `value` is likely a prototype object.
 *
 * @category Is
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
export function isPrototype(value: any): boolean {
  const Ctor = value && value.constructor
  const proto = (typeof Ctor === 'function' && Ctor.prototype) || objectProto

  return value === proto
}
