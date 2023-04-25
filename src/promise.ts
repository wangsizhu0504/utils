import { remove } from './array'
import type { Fn } from './types'

/**
 * Promised `setTimeout`
 *
 * @category Promise
 */
export function sleep(ms: number, callback?: Fn<any>) {
  return new Promise<void>(resolve =>
    setTimeout(async () => {
      await callback?.()
      resolve()
    }, ms),
  )
}
/**
 * Create a promise lock
 *
 * @category Promise
 * @example
 * ```
 * const lock = createPromiseLock()
 *
 * lock.run(async () => {
 *   await doSomething()
 * })
 *
 * await lock.wait() // it will wait all tasking finished
 * ```
 */
export function createPromiseLock() {
  const locks: Promise<any>[] = []

  return {
    async run<T = void>(fn: () => Promise<T>): Promise<T> {
      const p = fn()
      locks.push(p)
      try {
        return await p
      } finally {
        remove(locks, p)
      }
    },
    async wait(): Promise<void> {
      await Promise.allSettled(locks)
    },
    isWaiting() {
      return Boolean(locks.length)
    },
    clear() {
      locks.length = 0
    },
  }
}
