import baseClone from '../_internal/baseClone'

/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG = 1
/** Used to compose bitmasks for cloning. */
const CLONE_SYMBOLS_FLAG = 4

/**
 * Creates a shallow clone of `value`.
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
 * and supports cloning arrays, array buffers, booleans, date objects, maps,
 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
 * arrays. The own enumerable properties of `arguments` objects are cloned
 * as plain objects. Object inheritance is preserved. An empty object is
 * returned for uncloneable values such as error objects, functions, DOM nodes,
 * and WeakMaps.
 *
 * @category Object
 * @param {*} value The value to clone.
 * @returns {*} Returns the cloned value.
 * @see cloneDeep
 * @example
 *
 * const objects = [{ 'a': 1 }, { 'b': 2 }]
 *
 * const shallow = clone(objects)
 * console.log(shallow[0] === objects[0])
 * // => true
 */
export function clone<T = any>(value: T): T {
  return baseClone(value, CLONE_SYMBOLS_FLAG)
}

/**
 * This method is like `clone` except that it recursively clones `value`.
 * Object inheritance is preserved.
 *
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see clone
 * @example
 *
 * const objects = [{ 'a': 1 }, { 'b': 2 }]
 *
 * const deep = cloneDeep(objects)
 * console.log(deep[0] === objects[0])
 * // => false
 */
export function cloneDeep<T = any>(value: T): T {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG)
}
