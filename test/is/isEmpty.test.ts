import { describe, expect, it } from 'vitest'

import { isEmpty } from '../../src'
import { args } from '../util'

describe('isEmpty', () => {
  it('should return `true` for empty values', () => {
    expect(isEmpty([])).toBe(true)
    expect(isEmpty(/x/)).toBe(true)
    expect(isEmpty()).toBe(true)
    if (Buffer) {
      expect(isEmpty(Buffer.alloc(0))).toBe(true)
      expect(isEmpty(Buffer.alloc(1))).toBe(false)
    }
  })
  it('should return `false` for non-empty values', () => {
    expect(isEmpty([0])).toBe(false)
    expect(isEmpty({ a: 0 })).toBe(false)
    expect(isEmpty('a')).toBe(false)
  })
  it('should work with an object that has a `length` property', () => {
    expect(isEmpty({ length: 0 })).toBe(false)
  })

  it('should work with `arguments` objects', () => {
    expect(isEmpty(args)).toBe(false)
  })

  it('should work with maps', () => {
    if (Map) {
      const map = new Map()
      expect(isEmpty(map)).toBe(true)
      map.set('a', 1)
      expect(isEmpty(map)).toBe(false)
      map.clear()
    }
  })

  it('should work with sets', () => {
    if (Set) {
      const set = new Set()
      expect(isEmpty(set)).toBe(true)
      set.add(1)
      expect(isEmpty(set)).toBe(false)
      set.clear()
    }
  })

  it('should not treat objects with non-number lengths as array-like', () => {
    expect(isEmpty({ length: '0' })).toBe(false)
  })
})
