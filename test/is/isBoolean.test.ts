import { describe, expect, it } from 'vitest'
import { isBoolean } from '../../src'
import { args, symbol } from '../util'

describe('isBoolean', () => {
  it('should return `true` for booleans', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isBoolean(Object(true))).toBe(true)
    expect(isBoolean(Object(false))).toBe(true)
  })
  it('should return `false` for non array buffers', () => {
    expect(isBoolean(args)).toBe(false)
    expect(isBoolean([1])).toBe(false)
    expect(isBoolean(new Date())).toBe(false)
    expect(isBoolean(new Error('error'))).toBe(false)
    expect(isBoolean({ a: 1 })).toBe(false)
    expect(isBoolean(1)).toBe(false)
    expect(isBoolean(/x/)).toBe(false)
    expect(isBoolean('a')).toBe(false)
    expect(isBoolean(symbol)).toBe(false)
  })
})
