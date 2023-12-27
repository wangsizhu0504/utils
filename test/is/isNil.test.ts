import { describe, expect, it } from 'vitest'
import { isNil } from '../../src'
import { args, slice } from '../util'

describe('isNil', () => {
  it('should return `true` for nullish values', () => {
    expect(isNil(null)).toBe(true)
    expect(isNil()).toBe(true)
    expect(isNil(undefined)).toBe(true)
  })
  it('should return `false` for non-nullish values', () => {
    expect(isNil(args)).toBe(false)
    expect(isNil([1, 2, 3])).toBe(false)
    expect(isNil(true)).toBe(false)
    expect(isNil(new Date())).toBe(false)
    expect(isNil(new Error('error'))).toBe(false)
    expect(isNil(slice)).toBe(false)
    expect(isNil({ a: 1 })).toBe(false)
    expect(isNil(1)).toBe(false)
    expect(isNil(/x/)).toBe(false)
    expect(isNil('a')).toBe(false)
  })
})
