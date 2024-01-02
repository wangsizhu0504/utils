import { describe, expect, it } from 'vitest'
import { isMap, isNil, isNull, isUndefined } from '../../src/is'
import { args, map, slice, symbol, weakMap } from '../util'

const checkMap = [
  [args, false],
  [[1, 2, 3], false],
  [true, false],
  [new Date(), false],
  [new Error('error'), false],
  [slice, false],
  [{ a: 1 }, false],
  [1, false],
  [/x/, false],
  ['a', false],
  [symbol, false],
  [weakMap, false],
]

describe('isNull', () => {
  it('should return `true` for `null` values', () => {
    expect(isNull(null)).toBe(true)
  })

  it('should return `false` for non `null` values', () => {
    for (const [value, expected] of checkMap)
      expect(isNull(value)).toBe(expected)
  })
})
describe('isDef', () => {
  it('should return `true` for maps', () => {
    if (Map)
      expect(isMap(map)).toBe(true)
  })
  it('should return `false` for non-maps', () => {
    for (const [value, expected] of checkMap)
      expect(isMap(value)).toBe(expected)
  })
})

describe('isNil', () => {
  it('should return `true` for nullish values', () => {
    expect(isNil(null)).toBe(true)
    expect(isNil()).toBe(true)
    expect(isNil(undefined)).toBe(true)
  })
  it('should return `false` for non-nullish values', () => {
    for (const [value, expected] of checkMap)
      expect(isNil(value)).toBe(expected)
  })
})

describe('isUndefined', () => {
  it('should return `true` for `undefined` values', () => {
    expect(isUndefined()).toBe(true)
    expect(isUndefined(undefined)).toBe(true)
  })

  it('should return `false` for non `null` values', () => {
    for (const [value, expected] of checkMap)
      expect(isUndefined(value)).toBe(expected)

    // @ts-expect-error
    if (Symbol)
      expect(isUndefined(symbol)).toBe(false)
  })
})
