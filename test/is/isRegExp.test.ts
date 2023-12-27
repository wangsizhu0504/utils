import { describe, expect, it } from 'vitest'
import { args, slice, symbol } from '../util'
import { isRegExp } from '../../src'

describe('isRegExp', () => {
  it('should return `true` for regexes', () => {
    expect(isRegExp(/x/)).toBe(true)

    // eslint-disable-next-line prefer-regex-literals
    expect(isRegExp(RegExp('x'))).toBe(true)
  })

  it('should return `false` for non-regexes', () => {
    expect(isRegExp(args)).toBe(false)
    expect(isRegExp([1, 2, 3])).toBe(false)
    expect(isRegExp(true)).toBe(false)
    expect(isRegExp(new Date())).toBe(false)
    expect(isRegExp(new Error('error'))).toBe(false)
    expect(isRegExp(slice)).toBe(false)
    expect(isRegExp({ a: 1 })).toBe(false)
    expect(isRegExp(1)).toBe(false)
    expect(isRegExp('a')).toBe(false)
    expect(isRegExp(symbol)).toBe(false)
  })
})
