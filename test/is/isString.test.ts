import { describe, expect, it } from 'vitest'
import { args, slice, symbol } from '../util'
import { isString } from '../../src'

describe('isString', () => {
  it('should return `true` for strings', () => {
    expect(isString('a')).toBe(true)
    expect(isString(Object('a'))).toBe(true)
  })

  it('should return `false` for non-strings', () => {
    expect(isString(args)).toBe(false)
    expect(isString([1, 2, 3])).toBe(false)
    expect(isString(true)).toBe(false)
    expect(isString(new Date())).toBe(false)
    expect(isString(new Error('error'))).toBe(false)
    expect(isString(slice)).toBe(false)
    expect(isString({ 0: 1, length: 1 })).toBe(false)
    expect(isString(1)).toBe(false)
    expect(isString(/x/)).toBe(false)
    expect(isString(symbol)).toBe(false)
  })
})
