import type { Arrayable, Nullable } from './types'

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}
/**
 * Convert `Arrayable<T>` to `Array<T>`
 *
 * @category Array
 */
export function toArray<T>(array?: Nullable<Arrayable<T>>): T[] {
  array = array ?? []
  return Array.isArray(array) ? array : [array]
}

/**
 * Convert `Arrayable<T>` to `Array<T>` and flatten it
 *
 * @category Array
 */
export function flattenArrayable<T>(array?: Nullable<Arrayable<T | T[]>>): T[] {
  return toArray(array).flat(1) as T[]
}

/**
 * Use rest arguments to merge arrays
 *
 * @category Array
 */
export function mergeArrayable<T>(...args: Array<Nullable<Arrayable<T>>>): T[] {
  return args.flatMap(i => toArray(i))
}

/**
 * Unique an Array
 *
 * @category Array
 */
export function uniq<T>(array: readonly T[]): T[] {
  return Array.from(new Set(array))
}

/**
 * Unique an Array by a custom equality function
 *
 * @category Array
 */
export function uniqueBy<T>(array: readonly T[], equalFn: (a: any, b: any) => boolean): T[] {
  return array.reduce((acc: T[], cur: any) => {
    const index = acc.findIndex((item: any) => equalFn(cur, item))
    if (index === -1)
      acc.push(cur)
    return acc
  }, [])
}

/**
 * Get last item
 *
 * @category Array
 */
export function last(array: readonly []): undefined
export function last<T>(array: readonly T[]): T
export function last<T>(array: readonly T[]): T | undefined {
  return at(array, -1)
}

/**
 * Remove an item from Array
 *
 * @category Array
 */
export function remove<T>(array: T[], value: T) {
  if (!array)
    return false
  const index = array.indexOf(value)
  if (index >= 0) {
    array.splice(index, 1)
    return true
  }
  return false
}

/**
 * Get nth item of Array. Negative for backward
 *
 * @category Array
 */
export function at(array: readonly [], index: number): undefined
export function at<T>(array: readonly T[], index: number): T
export function at<T>(array: readonly T[] | [], index: number): T | undefined {
  const len = array.length
  if (!len)
    return undefined

  if (index < 0)
    index += len

  return array[index]
}

/**
 * Genrate a range array of numbers. The `stop` is exclusive.
 *
 * @category Array
 */
export function range(stop: number): number[]
export function range(start: number, stop: number, step?: number): number[]
export function range(...args: any): number[] {
  let start: number, stop: number, step: number

  if (args.length === 1) {
    start = 0
    step = 1;
    ([stop] = args)
  } else {
    ([start, stop, step = 1] = args)
  }

  const arr: number[] = []
  let current = start
  while (current < stop) {
    arr.push(current)
    current += step || 1
  }

  return arr
}

/**
 * Move element in an Array
 *
 * @category Array
 * @param arr
 * @param from
 * @param to
 */
export function move<T>(arr: T[], from: number, to: number) {
  arr.splice(to, 0, arr.splice(from, 1)[0])
  return arr
}

/**
 * Clamp a number to the index range of an array
 *
 * @category Array
 */
export function clampArrayRange(n: number, arr: readonly unknown[]) {
  return clamp(n, 0, arr.length - 1)
}

/**
 * Get random item(s) from an array
 *
 * @param arr
 * @param quantity - quantity of random items which will be returned
 */
export function sample<T>(arr: T[], quantity: number) {
  return Array.from({ length: quantity }, _ => arr[Math.round(Math.random() * (arr.length - 1))])
}

/**
 * Shuffle an array. This function mutates the array.
 *
 * @category Array
 */
export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
