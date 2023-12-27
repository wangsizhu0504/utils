import { describe, expect, it } from 'vitest'
import { isFunction } from '../../src'
import {
  args,
  asyncFunc,
  document,
  genFunc,
  slice,
  symbol,
} from '../util'

describe('isFunction', () => {
  it('should return `true` for functions', () => {
    expect(isFunction(slice)).toBe(true)
  })

  it('should return `true` for async functions', () => {
    expect(isFunction(asyncFunc)).toBe(typeof asyncFunc === 'function')
  })

  it('should return `true` for generator functions', () => {
    expect(isFunction(genFunc)).toBe(typeof genFunc === 'function')
  })

  it('should return `true` for the `Proxy` constructor', () => {
    if (Proxy)
      expect(isFunction(Proxy)).toBe(true)
  })

  it('should return `false` for non-functions', () => {
    expect(isFunction(args)).toBe(false)
    expect(isFunction([1, 2, 3])).toBe(false)
    expect(isFunction(true)).toBe(false)
    expect(isFunction(new Date())).toBe(false)
    expect(isFunction(new Error('xxxx'))).toBe(false)
    expect(isFunction({ a: 1 })).toBe(false)
    expect(isFunction(1)).toBe(false)
    expect(isFunction(/x/)).toBe(false)
    expect(isFunction('a')).toBe(false)
    expect(isFunction(symbol)).toBe(false)

    if (document)
      expect(isFunction(document.getElementsByTagName('body'))).toBe(false)
  })
})
