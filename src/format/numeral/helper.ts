/* eslint-disable ts/no-invalid-this */
/**
 * Implementation of toFixed() that treats floats more like decimals
 *
 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
 * problems for accounting- and finance-related software.
 */
export function toFixed(
  value: any,
  maxDecimals: number,
  roundingFunction: (value: string) => any,
  optionals?: any,
) {
  const splitValue = value.toString().split('.')
  const minDecimals = maxDecimals - (optionals || 0)
  let boundedPrecision
  let optionalsRegExp
  let output

  // Use the smallest precision value possible to avoid errors from floating point representation
  if (splitValue.length === 2)
    boundedPrecision = Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals)
  else
    boundedPrecision = minDecimals

  const power = 10 ** boundedPrecision

  // Multiply up by precision, round accurately, then divide and use native toFixed():
  output = (roundingFunction(`${value}e+${boundedPrecision}`) / power).toFixed(boundedPrecision)

  if (optionals > maxDecimals - boundedPrecision) {
    optionalsRegExp = new RegExp(`\\.?0{1,${optionals - (maxDecimals - boundedPrecision)}}$`)
    output = output.replace(optionalsRegExp, '')
  }

  return output
}

export function reduce(array: any[], callback: (...args: any[]) => any, initialValue?: any) {
  // @ts-expect-error
  if (this === null)
    throw new TypeError('Array.prototype.reduce called on null or undefined')

  if (typeof callback !== 'function')
    throw new TypeError(`${callback} is not a function`)

  const t = Object(array)
  const len = t.length >>> 0
  let k = 0
  let value

  if (initialValue !== undefined) {
    value = initialValue
  } else {
    while (k < len && !(k in t))
      k++

    if (k >= len)
      throw new TypeError('Reduce of empty array with no initial value')

    value = t[k++]
  }
  for (; k < len; k++) {
    if (k in t)
      value = callback(value, t[k], k, t)
  }
  return value
}

export function correctionFactor(...args: any[]) {
  return args.reduce((pre, next) => {
    const parts = next.toString().split('.')
    const mn = parts.length < 2 ? 1 : 10 ** parts[1].length
    return pre > mn ? pre : mn
  }, 1)
}

export function isNaN(value: any) {
  return typeof value === 'number' && Number.isNaN(value)
}

export function insert(string: string, subString: string, start: any) {
  return string.slice(0, start) + subString + string.slice(start)
}
