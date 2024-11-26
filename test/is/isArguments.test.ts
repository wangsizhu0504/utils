import { describe, expect, it } from 'vitest';
import { isArguments } from '../../src';
import { noop } from '../../src/function';
import { args, strictArgs } from '../util';

describe('isArguments', () => {
  it('should return `true` for `arguments` objects', () => {
    expect(isArguments(args)).toBe(true);
    expect(isArguments(strictArgs)).toBe(true);
  });
  it('should return `false` for non `arguments` objects', () => {
    expect(isArguments([1, 2, 3])).toBe(false);
    expect(isArguments(true)).toBe(false);
    expect(isArguments(new Date())).toBe(false);

    expect(isArguments({ 0: 1, callee: noop, length: 1 })).toBe(false);
    expect(isArguments(1)).toBe(false);
    expect(isArguments(/x/)).toBe(false);
    expect(isArguments('a')).toBe(false);
  });
});
