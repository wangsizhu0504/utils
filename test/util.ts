/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
// @ts-nocheck

/** Used as the size to cover large array optimizations. */
export const LARGE_ARRAY_SIZE = 200;
/** Used as a reference to the global object. */
const root = (typeof global === 'object' && global) || this;
export const ArrayBuffer = root.ArrayBuffer;
export const Buffer = root.Buffer;
export const Map = root.Map;
export const Promise = root.Promise;
export const Proxy = root.Proxy;
export const Set = root.Set;
export const Symbol = root.Symbol;
export const Uint8Array = root.Uint8Array;
export const WeakMap = root.WeakMap;
export const WeakSet = root.WeakSet;

/** Used for native method references. */
export const arrayProto = Array.prototype;
export const funcProto = Function.prototype;
export const objectProto = Object.prototype;
export const numberProto = Number.prototype;
export const stringProto = String.prototype;
/** Method and object shortcuts. */
export const phantom = root.phantom;
export const process = root.process;
export const amd = root.define ? define.amd : undefined;
export const args = toArgs([1, 2, 3]);
export const argv = process ? process.argv : undefined;
export const defineProperty = Object.defineProperty;
export const document = phantom ? undefined : root.document;
export const body = root.document ? root.document.body : undefined;
export const create = Object.create;
export const fnToString = funcProto.toString;
export const freeze = Object.freeze;
export const getSymbols = Object.getOwnPropertySymbols;
export const arrayBuffer = ArrayBuffer ? new ArrayBuffer(2) : undefined;
export const map = Map ? new Map() : undefined;
export const promise = Promise ? Promise.resolve(1) : undefined;
export const set = Set ? new Set() : undefined;
export const symbol = Symbol ? Symbol('a') : undefined;
export const weakMap = WeakMap ? new WeakMap() : undefined;
export const weakSet = WeakSet ? new WeakSet() : undefined;
export const slice = arrayProto.slice;
export const asyncFunc = async () => {}
export const genFunc =  () => {}
export const strictArgs = (function () {
  'use strict'

  return arguments
})(1, 2, 3)

export function toArgs(array) {
  return (function () {
    return arguments
  }.apply(undefined, array))
}


export function CustomError(message): any {
    this.name = 'CustomError';
    this.message = message;
}

CustomError.prototype = Object.create(Error.prototype, {
    constructor: CustomError,
});
