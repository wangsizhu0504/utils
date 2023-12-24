/** Detect free variable `global` from Node.js. */
export const freeGlobal = typeof global === 'object' && global !== null && global.Object === Object && global

/** Detect free variable `exports`. */
const freeExports = typeof exports === 'object' && exports !== null && !exports.nodeType && exports

/** Detect free variable `module`. */
// @ts-expect-error
const freeModule = freeExports && typeof module === 'object' && module !== null && !module.nodeType && module

/** Detect the popular CommonJS extension `module.exports`. */
const moduleExports = freeModule && freeModule.exports === freeExports

/** Detect free variable `process` from Node.js. */
// eslint-disable-next-line node/prefer-global/process
const freeProcess = moduleExports && freeGlobal && freeGlobal.process

/** Used to access faster Node.js helpers. */
const getNodeUtil = ((() => {
  try {
    /* Detect public `util.types` helpers for Node.js v10+. */
    /* Node.js deprecation code: DEP0103. */
    const typesHelper = freeModule && freeModule.require && freeModule.require('util').types
    // eslint-disable-next-line node/no-deprecated-api
    return typesHelper || (freeProcess && freeProcess.binding && freeProcess.binding('util'))
  } catch (e) {}
})())

export default getNodeUtil
