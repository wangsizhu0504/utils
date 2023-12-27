import { describe, expect, it } from 'vitest'
import { isNative } from '../../src'
import { args, symbol } from '../util'

describe('isNative', () => {
  it('should return `false` for non-maps', () => {
    expect(isNative(args)).toBe(false)
    expect(isNative([1, 2, 3])).toBe(false)
    expect(isNative(true)).toBe(false)
    expect(isNative(new Date())).toBe(false)
    expect(isNative(new Error('error'))).toBe(false)
    expect(isNative({ a: 1 })).toBe(false)
    expect(isNative(1)).toBe(false)
    expect(isNative(/x/)).toBe(false)
    expect(isNative('a')).toBe(false)
    expect(isNative(symbol)).toBe(false)
  })
})
