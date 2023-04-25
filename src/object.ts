import { isObject } from './is'
import type { DeepMerge } from './types'

/**
 * Strict typed `Object.keys`
 *
 * @category Object
 */
export function objectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<`${keyof T & (string | number | boolean | null | undefined)}`>
}

function isMergableObject(item: any): item is Object {
  return isObject(item) && !Array.isArray(item)
}
/**
 * Deep merge :P
 *
 * @category Object
 */
export function deepMerge<T extends object = object, S extends object = T>(target: T, ...sources: S[]): DeepMerge<T, S> {
  if (!sources.length)
    return target as any

  const source = sources.shift()
  if (source === undefined)
    return target as any

  if (isMergableObject(target) && isMergableObject(source)) {
    objectKeys(source).forEach((key) => {
      // @ts-expect-error
      if (isMergableObject(source[key])) {
        // @ts-expect-error
        if (!target[key])
          // @ts-expect-error
          target[key] = {}

        // @ts-expect-error
        deepMerge(target[key], source[key])
      } else {
        // @ts-expect-error
        target[key] = source[key]
      }
    })
  }

  return deepMerge(target, ...sources)
}
