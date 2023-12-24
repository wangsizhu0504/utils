import { arrayLikeKeys } from '../_internal/array'
import { isArrayLike } from '../is/isArray'

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @category Object
 * @param {object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @see values, valuesIn
 * @example
 *
 * function Foo() {
 *   this.a = 1
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * keys(new Foo)
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * keys('hi')
 * // => ['0', '1']
 */
export function keys(object: object): any[] {
  return isArrayLike(object) ? arrayLikeKeys(object) : Object.keys(Object(object))
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 *
 * @static
 * @category Object
 * @param {object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
export function keysIn(object: any): any[] {
  const result = []
  for (const key in object)
    result.push(key)

  return result
}
