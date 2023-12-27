import { describe, expect, it } from 'vitest'

import { args, slice, symbol } from '../util'
import { isUndefined } from '../../src'

describe('isUndefined', () => {
  it('should return `true` for `undefined` values', () => {
    expect(isUndefined()).toBe(true)
    expect(isUndefined(undefined)).toBe(true)
  })

  it('should return `false` for non `undefined` values', () => {
    expect(isUndefined(args)).toBe(false)
    expect(isUndefined([1, 2, 3])).toBe(false)
    expect(isUndefined(true)).toBe(false)
    expect(isUndefined(new Date())).toBe(false)
    expect(isUndefined(new Error('error'))).toBe(false)
    expect(isUndefined(slice)).toBe(false)
    expect(isUndefined({ a: 1 })).toBe(false)
    expect(isUndefined(1)).toBe(false)
    expect(isUndefined(/x/)).toBe(false)
    expect(isUndefined('a')).toBe(false)

    // @ts-expect-error
    if (Symbol)
      expect(isUndefined(symbol)).toBe(false)
  })
})
