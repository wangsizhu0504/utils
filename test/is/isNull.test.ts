import { describe, expect, it } from 'vitest'
import { args, slice, symbol } from '../util'
import { isNull } from '../../src'

describe('isNull', () => {
  it('should return `true` for `null` values', () => {
    expect(isNull(null)).toBe(true)
  })

  it('should return `false` for non `null` values', () => {
    expect(isNull(args)).toBe(false)
    expect(isNull([1, 2, 3])).toBe(false)
    expect(isNull(true)).toBe(false)
    expect(isNull(new Date())).toBe(false)
    expect(isNull(new Error('error'))).toBe(false)
    expect(isNull(slice)).toBe(false)
    expect(isNull({ a: 1 })).toBe(false)
    expect(isNull(1)).toBe(false)
    expect(isNull(/x/)).toBe(false)
    expect(isNull('a')).toBe(false)
    expect(isNull(symbol)).toBe(false)
  })
})
