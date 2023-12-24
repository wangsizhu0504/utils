import root from './root'

/** Detect free variable `exports`. */
const freeExports = typeof exports === 'object' && exports !== null && !exports.nodeType && exports

/** Detect free variable `module`. */
// @ts-expect-error
const freeModule = freeExports && typeof module === 'object' && module !== null && !module.nodeType && module

/** Detect the popular CommonJS extension `module.exports`. */
const moduleExports = freeModule && freeModule.exports === freeExports

/** Built-in value references. */
const Buffer = moduleExports ? root.Buffer : undefined
const allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined

/**
 * Creates a clone of `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
// eslint-disable-next-line node/prefer-global/buffer
export function cloneBuffer(buffer: Buffer, isDeep: boolean): Buffer {
  if (isDeep)
    return buffer.slice()

  const length = buffer.length
  // @ts-expect-error
  const result = allocUnsafe ? allocUnsafe(length) : buffer.constructor.alloc?.(length)

  buffer.copy(result)
  return result
}
