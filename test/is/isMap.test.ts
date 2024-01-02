import { describe, expect, it } from 'vitest'
import { isMap } from '../../src'
import { args, map, slice, symbol, weakMap } from '../util'

describe('isMap', () => {
  it('should return `true` for maps', () => {
    if (Map)
      expect(isMap(map)).toBe(true)
  })
  it('should return `false` for non-maps', () => {
    expect(isMap(args)).toBe(false)
    expect(isMap([1, 2, 3])).toBe(false)
    expect(isMap(true)).toBe(false)
    expect(isMap(new Date())).toBe(false)
    expect(isMap(new Error('error'))).toBe(false)
    expect(isMap(slice)).toBe(false)
    expect(isMap({ a: 1 })).toBe(false)
    expect(isMap(1)).toBe(false)
    expect(isMap(/x/)).toBe(false)
    expect(isMap('a')).toBe(false)
    expect(isMap(symbol)).toBe(false)
    expect(isMap(weakMap)).toBe(false)
  })
})
