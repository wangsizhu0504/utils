import { describe, expect, it } from 'vitest'

import { isDate } from '../../src'
import { args, symbol } from '../util'

describe('isDate', () => {
  it('should return `true` for array buffers', () => {
    expect(isDate(new Date())).toBe(true)
  })

  it('should return `false` for non dates', () => {
    expect(isDate(args)).toBe(false)
    expect(isDate([1])).toBe(false)
    expect(isDate(true)).toBe(false)
    expect(isDate(new Error('error'))).toBe(false)
    expect(isDate({ a: 1 })).toBe(false)
    expect(isDate(1)).toBe(false)
    expect(isDate(/x/)).toBe(false)
    expect(isDate('a')).toBe(false)
    expect(isDate(symbol)).toBe(false)
  })
})
