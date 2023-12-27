import { describe, expect, it } from 'vitest'
import { args, set, slice, symbol, weakSet } from '../util'
import { isSet } from '../../src'

describe('isSet', () => {
  it('should return `true` for sets', () => {
    if (Set)
      expect(isSet(set)).toBe(true)
  })

  it('should return `false` for non-sets', () => {
    expect(isSet(args)).toBe(false)
    expect(isSet([1, 2, 3])).toBe(false)
    expect(isSet(true)).toBe(false)
    expect(isSet(new Date())).toBe(false)
    expect(isSet(new Error('error'))).toBe(false)
    expect(isSet(slice)).toBe(false)
    expect(isSet({ a: 1 })).toBe(false)
    expect(isSet(1)).toBe(false)
    expect(isSet(/x/)).toBe(false)
    expect(isSet('a')).toBe(false)
    expect(isSet(symbol)).toBe(false)
    expect(isSet(weakSet)).toBe(false)
  })
})
