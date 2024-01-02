import assert from 'node:assert'
import { describe, expect, it } from 'vitest'
import { LARGE_ARRAY_SIZE, Map, Set } from '../util'
import { clone, cloneDeep } from '../../src/object'

describe('format/numeral', () => {
  function Foo() {
    // @ts-expect-error
    this.a = 1
  }
  Foo.prototype.b = 1
  Foo.c = function () {}
  const objects: Record<string, any> = {
    'arrays': ['a', ''],
    'array-like objects': { 0: 'a', length: 1 },
    'booleans': false,
    'boolean objects': Object(false),
    'date objects': new Date(),
    // @ts-expect-error
    'Foo instances': new Foo(),
    'objects': { a: 0, b: 1, c: 2 },
    'objects with object values': { a: /a/, b: ['B'], c: { C: 1 } },
    'null values': null,
    'numbers': 0,
    'number objects': Object(0),
    'regexes': /a/gim,
    'strings': 'a',
    'string objects': Object('a'),
    'undefined values': undefined,
  }

  if (Map) {
    const map = new Map()
    map.set('a', 1)
    map.set('b', 2)
    objects.map = map
  }
  if (Set) {
    const set = new Set()
    set.add(1)
    set.add(2)
    objects.set = set
  }

  objects.arrays.length = 3

  it('`_.clone` should perform a shallow clone', () => {
    const array = [{ a: 0 }, { b: 1 }]
    const actual = clone(array)

    expect(actual).toEqual(array)
    expect(actual !== array && actual[0] === array[0])
  })

  it('`_.cloneDeep` should deep clone objects with circular references', () => {
    const object = {
      foo: { b: { c: { d: {} } } },
      bar: {} as any,
    }

    object.foo.b.c.d = object
    object.bar.b = object.foo.b

    const actual = cloneDeep(object)
    expect(
      actual.bar.b === actual.foo.b && actual === actual.foo.b.c.d && actual !== object,
    ).toBe(true)
  })

  it('`_.cloneDeep` should deep clone objects with lots of circular references', () => {
    const cyclical: Record<string, any> = {}

    const cloneCycical = cloneDeep(cyclical)
    const actual = cloneCycical[`v${LARGE_ARRAY_SIZE}`][0]

    expect(actual).toBe(cloneCycical[`v${LARGE_ARRAY_SIZE - 1}`])
    assert.notStrictEqual(actual, cyclical[`v${LARGE_ARRAY_SIZE - 1}`])
  })
})
