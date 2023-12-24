import { isBuffer, isObject, isTypedArray } from '../is'
import { keys, keysIn } from '../object/keys'
import Stack from './Stack'
import { arrayEach } from './array'
import { assignValue, baseAssignValue } from './assignValue'
import { getAllKeys, getAllKeysIn } from './getAllKeys'
import { getSymbols, getSymbolsIn } from './getSymbols'
import toTypeString from './toTypeString'

import { initCloneObject } from './initCloneObject'

import root from './root'

/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG = 1
const CLONE_FLAT_FLAG = 2
const CLONE_SYMBOLS_FLAG = 4

/** `Object#toString` result references. */
const argsTag = '[object Arguments]'
const arrayTag = '[object Array]'
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const mapTag = '[object Map]'
const numberTag = '[object Number]'
const objectTag = '[object Object]'
const regexpTag = '[object RegExp]'
const setTag = '[object Set]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const weakMapTag = '[object WeakMap]'

const arrayBufferTag = '[object ArrayBuffer]'
const dataViewTag = '[object DataView]'
const float32Tag = '[object Float32Array]'
const float64Tag = '[object Float64Array]'
const int8Tag = '[object Int8Array]'
const int16Tag = '[object Int16Array]'
const int32Tag = '[object Int32Array]'
const uint8Tag = '[object Uint8Array]'
const uint8ClampedTag = '[object Uint8ClampedArray]'
const uint16Tag = '[object Uint16Array]'
const uint32Tag = '[object Uint32Array]'

/** Used to identify `toStringTag` values supported by `clone`. */
const cloneableTags: Record<string, any> = {}
cloneableTags[argsTag] = cloneableTags[arrayTag]
= cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag]
= cloneableTags[boolTag] = cloneableTags[dateTag]
= cloneableTags[float32Tag] = cloneableTags[float64Tag]
= cloneableTags[int8Tag] = cloneableTags[int16Tag]
= cloneableTags[int32Tag] = cloneableTags[mapTag]
= cloneableTags[numberTag] = cloneableTags[objectTag]
= cloneableTags[regexpTag] = cloneableTags[setTag]
= cloneableTags[stringTag] = cloneableTags[symbolTag]
= cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag]
= cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true
cloneableTags[errorTag] = cloneableTags[weakMapTag] = false

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

/** Detect free variable `exports`. */
const freeExports = typeof exports === 'object' && exports !== null && !exports.nodeType && exports

/** Detect free variable `module`. */
// @ts-expect-error
const freeModule = freeExports && typeof module === 'object' && module !== null && !module.nodeType && module

/** Detect the popular CommonJS extension `module.exports`. */
const moduleExports = freeModule && freeModule.exports === freeExports

/** Built-in value references. */
const Buffer = moduleExports ? root.Buffer : undefined
const allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined

/**
 * Creates a clone of `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
// eslint-disable-next-line node/prefer-global/buffer
export function cloneBuffer(buffer: Buffer, isDeep: boolean): Buffer {
  if (isDeep)
    return buffer.slice()

  const length = buffer.length
  // @ts-expect-error
  const result = allocUnsafe ? allocUnsafe(length) : buffer.constructor.alloc?.(length)

  buffer.copy(result)
  return result
}
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
export function copyArray(source: any[], array?: any[]): any[] {
  let index = -1
  const length = source.length

  if (!array)
    array = new Array(length)

  while (++index < length)
    array[index] = source[index]

  return array
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {object} [object] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {object} Returns `object`.
 */
export function copyObject(source: Record<string, any>, props: any[], object?: Record<string, any>, customizer?: Function): Record<string, any> {
  const isNew = !object
  if (!object)
    object = {}

  for (const key of props) {
    let newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined

    if (newValue === undefined)
      newValue = source[key]

    if (isNew)
      baseAssignValue(object, key, newValue)
    else
      assignValue(object, key, newValue)
  }
  return object
}
/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
export function cloneArrayBuffer(arrayBuffer: ArrayBuffer): ArrayBuffer {
// @ts-expect-error
  const result = new arrayBuffer.constructor(arrayBuffer.byteLength)
  new Uint8Array(result).set(new Uint8Array(arrayBuffer))
  return result
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {object} Returns the cloned data view.
 */
export function cloneDataView(dataView: Record<any, any>, isDeep: boolean): Record<string, any> {
  const buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer
  // @ts-expect-error
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength)
}
/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {object} Returns the cloned typed array.
 */
export function cloneTypedArray(typedArray: Record<any, any>, isDeep: boolean): Record<any, any> {
  const buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer
  // @ts-expect-error
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length)
}

/** Used to match `RegExp` flags from their coerced string values. */
const reFlags = /\w*$/

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {object} regexp The regexp to clone.
 * @returns {object} Returns the cloned regexp.
 */
export function cloneRegExp(regexp: Record<any, any>): Record<any, any> {
// @ts-expect-error
  const result = new regexp.constructor(regexp.source, reFlags.exec(regexp))
  result.lastIndex = regexp.lastIndex
  return result
}

/** Used to convert symbols to primitives and strings. */
const symbolValueOf = Symbol.prototype.valueOf

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {object} symbol The symbol object to clone.
 * @returns {object} Returns the cloned symbol object.
 */
export function cloneSymbol(symbol: Record<any, any>): Record<any, any> {
  return Object(symbolValueOf.call(symbol))
}

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {object} source The object to copy symbols from.
 * @param {object} [object] The object to copy symbols to.
 * @returns {object} Returns `object`.
 */
export function copySymbolsIn(source: Record<string, any>, object: Record<string, any>): Record<string, any> {
  return copyObject(source, getSymbolsIn(source), object)
}
/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {object} source The object to copy symbols from.
 * @param {object} [object] The object to copy symbols to.
 * @returns {object} Returns `object`.
 */
export function copySymbols(source: Record<string, any>, object: Record<string, any>): Record<string, any> {
  return copyObject(source, getSymbols(source), object)
}

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {object} Returns the initialized clone.
 */
export function initCloneByTag(object: Record<string, any>, tag: string, isDeep: boolean) {
  const Ctor = object.constructor
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object as ArrayBuffer)

    case boolTag:
    case dateTag:
      // @ts-expect-error
      return new Ctor(+object)

    case dataViewTag:
      return cloneDataView(object, isDeep)

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep)

    case mapTag:
      // @ts-expect-error
      return new Ctor()

    case numberTag:
    case stringTag:
      // @ts-expect-error
      return new Ctor(object)

    case regexpTag:
      return cloneRegExp(object)

    case setTag:
      // @ts-expect-error
      return new Ctor()

    case symbolTag:
      return cloneSymbol(object)
  }
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array: any): any[] {
  const { length } = array

  const result = new array.constructor(length)

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] === 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index
    result.input = array.input
  }
  return result
}

/**
 * The base implementation of `clone` and `cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {number} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {object} [object] The parent object of `value`.
 * @param {object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
export function baseClone(
  value: any,
  bitmask: number,
  customizer?: Function,
  key?: string,
  object?: object,
  stack?: Stack,
): any {
  let result: any
  const isDeep = bitmask & CLONE_DEEP_FLAG
  const isFlat = bitmask & CLONE_FLAT_FLAG
  const isFull = bitmask & CLONE_SYMBOLS_FLAG

  if (customizer)
    result = object ? customizer(value, key, object, stack) : customizer(value)

  if (result !== undefined)
    return result

  if (!isObject(value))
    return value

  const isArr = Array.isArray(value)
  const tag = toTypeString(value)
  if (isArr) {
    result = initCloneArray(value)
    if (!isDeep)
      return copyArray(value, result)
  } else {
    const isFunc = typeof value === 'function'

    if (isBuffer(value))
      return cloneBuffer(value, isDeep as unknown as boolean)

    if (tag === objectTag || tag === argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value)
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, copyObject(value, keysIn(value), result))
          : copySymbols(value, Object.assign(result, value))
      }
    } else {
      if (isFunc || !cloneableTags[tag])
        return object ? value : {}

      result = initCloneByTag(value, tag, Boolean(isDeep))
    }
  }
  // Check for circular references and return its corresponding clone.
  if (!stack)
    stack = new Stack()

  const stacked = stack.get(value)
  if (stacked)
    return stacked

  stack.set(value, result)

  if (tag === mapTag) {
    value.forEach((subValue: any, _key: any) => {
      result.set(_key, baseClone(subValue, bitmask, customizer, _key, value, stack))
    })
    return result
  }

  if (tag === setTag) {
    value.forEach((subValue: any) => {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack))
    })
    return result
  }

  if (isTypedArray(value))
    return result

  const keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys)

  const props = isArr ? undefined : keysFunc(value)
  arrayEach(props || value, (subValue: any, _key: any) => {
    if (props) {
      _key = subValue
      subValue = value[_key]
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, _key, baseClone(subValue, bitmask, customizer, _key, value, stack))
  })
  return result
}

export default baseClone
