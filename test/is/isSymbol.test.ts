import { describe, expect, it } from 'vitest'
import { args, slice, symbol } from '../util'
import { isSymbol } from '../../src'

describe('isSymbol', () => {
  it('should return `true` for symbols', () => {
    // @ts-expect-error
    if (Symbol) {
      expect(isSymbol(symbol)).toBe(true)
      expect(isSymbol(Object(symbol))).toBe(true)
    }
  })

  it('should return `false` for non-symbols', () => {
    expect(isSymbol(args)).toBe(false)
    expect(isSymbol([1, 2, 3])).toBe(false)
    expect(isSymbol(true)).toBe(false)
    expect(isSymbol(new Date())).toBe(false)
    expect(isSymbol(new Error('error'))).toBe(false)
    expect(isSymbol(slice)).toBe(false)
    expect(isSymbol({ 0: 1, length: 1 })).toBe(false)
    expect(isSymbol(1)).toBe(false)
    expect(isSymbol(/x/)).toBe(false)
    expect(isSymbol('a')).toBe(false)
  })
})
