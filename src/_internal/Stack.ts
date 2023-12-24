import ListCache from './ListCache'
import MapCache from './MapCache'

/** Used as the size to enable large array optimizations. */
const LARGE_ARRAY_SIZE = 200

class Stack {
  private __data__: ListCache | MapCache
  private size: number

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  constructor(entries: any[] = []) {
    const data = this.__data__ = new ListCache(entries)
    this.size = data.size
  }

  /**
   * Removes all key-value entries from the stack.
   *
   * @memberOf Stack
   */
  public clear() {
    this.__data__ = new ListCache()
    this.size = 0
  }

  /**
   * Removes `key` and its value from the stack.
   *
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  public delete(key: string): boolean {
    const data = this.__data__
    const result = data.delete(key)

    this.size = data.size
    return result
  }

  /**
   * Gets the stack value for `key`.
   *
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  public get(key: string): any {
    return this.__data__.get(key)
  }

  /**
   * Checks if a stack value for `key` exists.
   *
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  public has(key: string): boolean {
    return this.__data__.has(key)
  }

  /**
   * Sets the stack `key` to `value`.
   *
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {object} Returns the stack cache instance.
   */
  public set(key: string, value: any): Record<string, any> {
    let data = this.__data__
    if (data instanceof ListCache) {
      const pairs = data.__data__
      if (pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value])
        this.size = ++data.size
        return this
      }
      data = this.__data__ = new MapCache(pairs)
    }
    data.set(key, value)
    this.size = data.size
    return this
  }
}

export default Stack
