import { describe, expect, it } from 'vitest';
import { isTypedArray } from '../../src';
import { args, slice, symbol } from '../util';

describe('isTypedArray', () => {
  it('should return `false` for non typed arrays', () => {
    expect(isTypedArray(args)).toBe(false);
    expect(isTypedArray([1, 2, 3])).toBe(false);
    expect(isTypedArray(true)).toBe(false);
    expect(isTypedArray(new Date())).toBe(false);
    expect(isTypedArray(new Error('error'))).toBe(false);
    expect(isTypedArray(slice)).toBe(false);
    expect(isTypedArray({ a: 1 })).toBe(false);
    expect(isTypedArray(1)).toBe(false);
    expect(isTypedArray(/x/)).toBe(false);
    expect(isTypedArray('a')).toBe(false);
    expect(isTypedArray(symbol)).toBe(false);
  });
});
