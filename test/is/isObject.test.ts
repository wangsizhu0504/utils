import { describe, expect, it } from 'vitest'

import { args, body, document, slice, symbol } from '../util'
import { isObject, isObjectLike } from '../../src'

describe('isObject', () => {
  it('should return `true` for objects', () => {
    expect(isObject(args)).toBe(true)
    expect(isObject([1, 2, 3])).toBe(true)
    expect(isObject(Object(false))).toBe(true)
    expect(isObject(new Date())).toBe(true)
    expect(isObject(new Error('error'))).toBe(true)
    expect(isObject(slice)).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
    expect(isObject(Object(0))).toBe(true)
    expect(isObject(/x/)).toBe(true)
    expect(isObject(Object('a'))).toBe(true)

    if (document)
      expect(isObject(body)).toBe(true)
    // @ts-expect-error
    if (Symbol)
      expect(isObject(Object(symbol))).toBe(true)
  })
})

describe('isObjectLike', () => {
  it('should return `true` for objects', () => {
    expect(isObjectLike(args)).toBe(true)
    expect(isObjectLike([1, 2, 3])).toBe(true)
    expect(isObjectLike(Object(false))).toBe(true)
    expect(isObjectLike(new Date())).toBe(true)
    expect(isObjectLike(new Error('error'))).toBe(true)
    expect(isObjectLike({ a: 1 })).toBe(true)
    expect(isObjectLike(Object(0))).toBe(true)
    expect(isObjectLike(/x/)).toBe(true)
    expect(isObjectLike(Object('a'))).toBe(true)
  })
})
