import { describe, expect, it } from 'vitest'

import { args, body, document, symbol } from '../util'
import { isElement } from '../../src'

describe('isElement', () => {
  it('should return `true` for element', () => {
    if (document)
      expect(isElement(body)).toBe(true)
  })

  it('should return `true` for non-plain objects', () => {
    function Foo() {
      // @ts-expect-error
      this.nodeType = 1
    }
    // @ts-expect-error
    expect(isElement(new Foo())).toBe(true)
  })
  it('should return `false` for non DOM elements', () => {
    expect(isElement(args)).toBe(false)
    expect(isElement([1, 2, 3])).toBe(false)
    expect(isElement(true)).toBe(false)
    expect(isElement(new Date())).toBe(false)
    expect(isElement(new Error('error'))).toBe(false)
    expect(isElement({ a: 1 })).toBe(false)
    expect(isElement(1)).toBe(false)
    expect(isElement(/x/)).toBe(false)
    expect(isElement('a')).toBe(false)
    expect(isElement(symbol)).toBe(false)
  })
})
