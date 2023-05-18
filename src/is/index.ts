const toString = Object.prototype.toString

/**
 * @description 比较一个值是否为某种类型
 * @param {unknown} val 比较的值
 * @param {string} type 对比的类型
 * @example is('string','String') // true
 * @returns {boolean}
 * @category is
 */
export function is(val: unknown, type: string): boolean {
  return toString.call(val) === `[object ${type}]`
}

/**
 * @description 判断一个值是否被定义
 * @param {unknown} val
 * @example isDef(a) // true | false
 * @returns {boolean}
 * @category is
 */
export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined'
}

/**
 * @description 判断一个值是否未定义
 * @param {unknown} val
 * @example isUnDef(a) // false | true
 * @returns {boolean}
 * @category is
 */
export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val)
}

/**
 * @description 判断一个值是否为 Object 类型
 * @param {any} val
 * @example isObject({}) // true
 * @returns {boolean}
 * @category is
 */
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

/**
 * @description 判断一个值是否为空值
 * @param {any} val
 * @returns {boolean}
 * @category is
 */
export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val))
    return val.length === 0

  if (val instanceof Map || val instanceof Set)
    return val.size === 0

  if (isObject(val))
    return Object.keys(val).length === 0

  return false
}

/**
 * @description 判断一个值是否为Date 类型
 * @param {unknown} val
 * @returns {boolean}
 * @category is
 */
export function isDate(val: unknown): val is Date {
  return is(val, 'Date')
}

/**
 * @description 判断一个值是否为 Null 类型
 * @param {unknown} val
 * @returns {boolean}
 * @category is
 */
export function isNull(val: unknown): val is null {
  return val === null
}

/**
 * @description 判断一个值是否为 Null & undefined
 * @param {unknown} val
 * @returns {boolean}
 * @category is
 */
export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val)
}

/**
 * @description 判断一个值是否为 Null 或者 未定义
 * @param {unknown} val
 * @returns {boolean}
 * @category is
 */
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val)
}

/**
 * @description 判断一个值是否为 number 类型
 * @param {unknown} val
 * @returns {boolean}
 * @category is
 */
export function isNumber(val: unknown): val is number {
  return is(val, 'Number')
}

/**
 * @description 判断一个值是否为 promise 函数
 * @param {unknown} val
 * @returns {any}
 * @category is
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
 * @description 判断一个值是否为 String 类型
 * @param {unknown} val
 * @returns {boolean}
 * @category is
 */
export function isString(val: unknown): val is string {
  return is(val, 'String')
}

/**
 * @description 判断一个值是否为 普通函数
 * @param {unknown} val
 * @returns {boolean}
 * @category is
 */
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

/**
 * @description 判断一个值是否为 boolean
 * @param {unknown} val
 * @returns {boolean}
 * @category is
 */
export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

/**
 * @description 判断一个值是否为 Regexp
 * @param {unknown} val
 * @returns {boolean}
 * @category is
 */
export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp')
}

/**
 * @description 判断一个值是否为 Array
 * @param {unknown} val
 * @returns {boolean}
 * @category is
 */
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}

/**
 * @description 判断一个值是否为Window对象
 * @param {unknown} val
 * @returns {boolean}
 * @category is
 */
export function isWindow(val: any): boolean {
  return typeof window !== 'undefined' && is(val, 'Window')
}

/**
 * @description 判断一个值是否为Window对象
 * @param {unknown} val
 * @returns {boolean}
 * @category is
 */
export function isElement(val: unknown): boolean {
  return isObject(val) && !!val.tagName
}

/**
 * @description 判断一个值是否为Map类型
 * @param {unknown} val
 * @returns {boolean}
 * @category is
 */
export function isMap(val: unknown): val is Map<any, any> {
  return is(val, 'Map')
}


export const isServer = typeof window === 'undefined'

export const isClient = !isServer
