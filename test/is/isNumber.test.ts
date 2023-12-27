import { describe, expect, it } from 'vitest'
import { isNumber } from '../../src'
import { args, slice, symbol } from '../util'

describe('isNumber', () => {
  it('should return `true` for numbers', () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber(Object(0))).toBe(true)
    expect(isNumber(Number.NaN)).toBe(true)
  })

  it('should return `false` for non-numbers', () => {
    expect(isNumber(args)).toBe(false)
    expect(isNumber([1, 2, 3])).toBe(false)
    expect(isNumber(true)).toBe(false)
    expect(isNumber(new Date())).toBe(false)
    expect(isNumber(new Error('error'))).toBe(false)
    expect(isNumber(slice)).toBe(false)
    expect(isNumber({ a: 1 })).toBe(false)
    expect(isNumber(/x/)).toBe(false)
    expect(isNumber('a')).toBe(false)
    expect(isNumber(symbol)).toBe(false)
  })
})
