import { describe, expect, it } from 'vitest'
import { isArrayBuffer } from '../../src'
import { args, ArrayBuffer, arrayBuffer, symbol } from '../util'

describe('isArrayBuffer', () => {
  it('should return `true` for array buffers', () => {
    if (ArrayBuffer)
      expect(isArrayBuffer(arrayBuffer)).toBe(true)
  })

  it('should return `false` for non array buffers', () => {
    expect(isArrayBuffer(args)).toBe(false)
    expect(isArrayBuffer([1])).toBe(false)
    expect(isArrayBuffer(true)).toBe(false)
    expect(isArrayBuffer(new Date())).toBe(false)
    expect(isArrayBuffer(new Error('error'))).toBe(false)
    expect(isArrayBuffer({ a: 1 })).toBe(false)
    expect(isArrayBuffer(1)).toBe(false)
    expect(isArrayBuffer(/x/)).toBe(false)
    expect(isArrayBuffer('a')).toBe(false)
    expect(isArrayBuffer(symbol)).toBe(false)
  })
})
