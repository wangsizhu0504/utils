import { describe, expect, it } from 'vitest'
import { isError } from '../../src'
import { CustomError, args, symbol } from '../util'

describe('isError', () => {
  it('should return `true` for subclassed values', () => {
    // @ts-expect-error
    expect(isError(new CustomError('x'))).toBe(true)
  })

  it('should return `false` for non error objects', () => {
    expect(isError(args)).toBe(false)
    expect(isError([1, 2, 3])).toBe(false)
    expect(isError(true)).toBe(false)
    expect(isError(new Date())).toBe(false)
    expect(isError({ a: 1 })).toBe(false)
    expect(isError(1)).toBe(false)
    expect(isError(/x/)).toBe(false)
    expect(isError('a')).toBe(false)
    expect(isError(symbol)).toBe(false)
  })

  it('should return `false` for plain objects', () => {
    expect(isError({ name: 'Error', message: '' })).toBe(false)
  })
})
