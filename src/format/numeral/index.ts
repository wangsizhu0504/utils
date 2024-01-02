import type { INumeralImplements, NumeralAbbreviations, NumeralLocales } from './type'
import { correctionFactor, reduce, toFixed } from './helper'

const formats: Record<string, any> = {}
const locales: NumeralLocales = {}
const defaults: Record<string, any> = {
  currentLocale: 'en',
  zeroFormat: null,
  nullFormat: null,
  defaultFormat: '0,0',
  scalePercentBy100: true,
}
const options: Record<string, any> = {
  currentLocale: defaults.currentLocale,
  zeroFormat: defaults.zeroFormat,
  nullFormat: defaults.nullFormat,
  defaultFormat: defaults.defaultFormat,
  scalePercentBy100: defaults.scalePercentBy100,
}

const numeral = function (input?: any): Numeral {
  let value,
    kind,
    unformatFunction,
    regexp

  if (input instanceof Numeral) {
    value = input.value()
  } else if (input === 0 || typeof input === 'undefined') {
    value = 0
  } else if (input === null || (typeof input === 'number' && Number.isNaN(input))) {
    value = null
  } else if (typeof input === 'string') {
    if (options.zeroFormat && input === options.zeroFormat) {
      value = 0
    } else if ((options.nullFormat && input === options.nullFormat) || !input.replace(/[^0-9]+/g, '').length) {
      value = null
    } else {
      for (kind in formats) {
        regexp = typeof formats[kind].regexps.unformat === 'function' ? formats[kind].regexps.unformat() : formats[kind].regexps.unformat

        if (regexp && input.match(regexp)) {
          unformatFunction = formats[kind].unformat

          break
        }
      }

      unformatFunction = unformatFunction || numeral.stringToNumber

      value = unformatFunction(input)
    }
  } else {
    value = Number(input) || null
  }

  return new Numeral(input, value)
}
class Numeral implements INumeralImplements {
  private _input: any
  private _value: number

  constructor(input: any, number: number) {
    this._input = input
    this._value = number
  }

  public clone() {
    return numeral(this)
  }

  public format(
    inputString?: any,
    roundingFunction?: (x: number) => number,
  ) {
    const value = this._value
    const format = inputString || options.defaultFormat

    let kind
    let output
    let formatFunction

    // make sure we have a roundingFunction
    roundingFunction = roundingFunction || Math.round

    // format based on value
    if (value === 0 && options.zeroFormat !== null) {
      output = options.zeroFormat
    } else if (value === null && options.nullFormat !== null) {
      output = options.nullFormat
    } else {
      for (kind in formats) {
        if (format.match(formats[kind].regexps.format)) {
          formatFunction = formats[kind].format

          break
        }
      }

      formatFunction = formatFunction || numeral.numberToFormat

      output = formatFunction(value, format, roundingFunction)
    }

    return output
  }

  public value() {
    return this._value
  }

  public input() {
    return this._input
  }

  public set(value: number | string) {
    this._value = Number(value)

    return this
  }

  public add(value: number | string) {
    const corrFactor = correctionFactor(this._value, value)

    this._value = reduce([this._value, value], (pre: number, cur: number) => {
      pre += Math.round(corrFactor * cur)
      return pre
    }, 0) / corrFactor

    return this
  }

  public subtract(value: number | string) {
    const corrFactor = correctionFactor(this._value, value)

    this._value = reduce([value], (pre: number, cur: number) => {
      pre -= Math.round(corrFactor * cur)
      return pre
    }, Math.round(this._value * corrFactor)) / corrFactor

    return this
  }

  public multiply(value: number | string) {
    this._value = reduce([this._value, value], (pre: number, cur: number) => {
      const corrFactor = correctionFactor(pre, cur)
      return Math.round(pre * corrFactor) * Math.round(cur * corrFactor) / Math.round(corrFactor * corrFactor)
    }, 1)

    return this
  }

  public divide(value: number | string) {
    this._value = reduce([this._value, value], (pre, cur) => {
      const corrFactor = correctionFactor(pre, cur)
      return Math.round(pre * corrFactor) / Math.round(pre * corrFactor)
    })

    return this
  }

  public difference(value: number | string) {
    return Math.abs(numeral(this._value).subtract(value).value())
  }
}
numeral.options = options
numeral.formats = formats
numeral.locales = locales
numeral.isNumeral = function (obj: any) {
  return obj instanceof Numeral
}
numeral.locale = function (key?: string) {
  if (key)
    options.currentLocale = key.toLowerCase()

  return options.currentLocale
}
numeral.localeData = function (key?: string) {
  if (!key)
    return locales[options.currentLocale]

  key = key.toLowerCase()
  if (!locales[key])
    throw new Error(`Unknown locale : ${key}`)

  return locales[key]
}
numeral.reset = function () {
  for (const property in defaults)
    options[property] = defaults[property]
}
numeral.zeroFormat = function (format: any) {
  options.zeroFormat = typeof (format) === 'string' ? format : null
}
numeral.nullFormat = function (format: any) {
  options.nullFormat = typeof (format) === 'string' ? format : null
}
numeral.defaultFormat = function (format: any) {
  options.defaultFormat = typeof (format) === 'string' ? format : '0.0'
}

numeral.register = function (type: 'locale' | 'format', name: string, format: any) {
  name = name.toLowerCase()

  if (this[`${type}s`][name])
    throw new TypeError(`${name} ${type} already registered.`)

  this[`${type}s`][name] = format

  return format
}
numeral.validate = function (val: any, culture: any) {
  let _thousandSep,
    _valArray,
    localeData,
    temp

  if (typeof val !== 'string') {
    val += ''

    if (console.warn)
      console.warn('Numeral: Value is not string. It has been co-erced to: ', val)
  }

  val = val.trim()

  if (val.match(/^\d+$/)) return true

  if (val === '') return false

  try {
    localeData = this.localeData(culture)
  } catch (e) {
    localeData = this.localeData(this.locale())
  }

  const _currSymbol = localeData.currency.symbol
  const _abbrObj = localeData.abbreviations
  const _decimalSep = localeData.delimiters.decimal
  if (localeData.delimiters.thousands === '.')
    _thousandSep = '\\.'
  else
    _thousandSep = localeData.delimiters.thousands

  temp = val.match(/^[^\d]+/)
  if (temp !== null) {
    val = val.substr(1)
    if (temp[0] !== _currSymbol)
      return false
  }

  temp = val.match(/[^\d]+$/)
  if (temp !== null) {
    val = val.slice(0, -1)
    if (
      temp[0] !== _abbrObj.thousand
      && temp[0] !== _abbrObj.million
      && temp[0] !== _abbrObj.billion
      && temp[0] !== _abbrObj.trillion
    )
      return false
  }

  const _thousandRegEx = new RegExp(`${_thousandSep}{2}`)

  if (!val.match(/[^\d.,]/g)) {
    _valArray = val.split(_decimalSep)
    if (_valArray.length > 2) {
      return false
    } else {
      if (_valArray.length < 2) {
        return (
          !!_valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx)
        )
      } else {
        if (_valArray[0].length === 1) {
          return (
            !!_valArray[0].match(/^\d+$/)
            && !_valArray[0].match(_thousandRegEx)
            && !!_valArray[1].match(/^\d+$/)
          )
        } else {
          return (
            !!_valArray[0].match(/^\d+.*\d$/)
            && !_valArray[0].match(_thousandRegEx)
            && !!_valArray[1].match(/^\d+$/)
          )
        }
      }
    }
  }

  return false
}
numeral.numberToFormat = function (
  value: any,
  format: any,
  roundingFunction: () => void,
) {
  const locale = locales[numeral.options.currentLocale]
  let negP = false
  let optDec = false
  let leadingCount = 0
  let abbr = ''
  const trillion = 1000000000000
  const billion = 1000000000
  const million = 1000000
  const thousand = 1000
  let decimal = ''
  let neg = false
  let abbrForce // force abbreviation
  let int
  let precision
  let signed
  let output

  // make sure we never format a null value
  value = value || 0

  const abs = Math.abs(value)

  // see if we should use parentheses for negative number or if we should prefix with a sign
  // if both are present we default to parentheses
  if (format.includes('(')) {
    negP = true
    format = format.replace(/[\(|\)]/g, '')
  } else if (format.includes('+') || format.includes('-')) {
    signed = format.includes('+') ? format.indexOf('+') : value < 0 ? format.indexOf('-') : -1
    format = format.replace(/[\+|\-]/g, '')
  }

  // see if abbreviation is wanted
  if (format.includes('a')) {
    abbrForce = format.match(/a(k|m|b|t)?/)

    abbrForce = abbrForce ? abbrForce[1] : false

    // check for space before abbreviation
    if (format.includes(' a'))
      abbr = ' '

    format = format.replace(new RegExp(`${abbr}a[kmbt]?`), '')

    if ((abs >= trillion && !abbrForce) || abbrForce === 't') {
      // trillion
      abbr += locale.abbreviations.trillion
      value = value / trillion
    } else if ((abs < trillion && abs >= billion && !abbrForce) || abbrForce === 'b') {
      // billion
      abbr += locale.abbreviations.billion
      value = value / billion
    } else if ((abs < billion && abs >= million && !abbrForce) || abbrForce === 'm') {
      // million
      abbr += locale.abbreviations.million
      value = value / million
    } else if ((abs < million && abs >= thousand && !abbrForce) || abbrForce === 'k') {
      // thousand
      abbr += locale.abbreviations.thousand
      value = value / thousand
    }
  }

  // check for optional decimals
  if (format.includes('[.]')) {
    optDec = true
    format = format.replace('[.]', '.')
  }

  // break number and format
  int = value.toString().split('.')[0]
  precision = format.split('.')[1]
  const thousands = format.indexOf(',')
  leadingCount = (format.split('.')[0].split(',')[0].match(/0/g) || []).length

  if (precision) {
    if (precision.includes('[')) {
      precision = precision.replace(']', '')
      precision = precision.split('[')
      decimal = toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length)
    } else {
      decimal = toFixed(value, precision.length, roundingFunction)
    }

    int = decimal.split('.')[0]

    if (decimal.includes('.'))
      decimal = locale.delimiters.decimal + decimal.split('.')[1]
    else
      decimal = ''

    if (optDec && Number(decimal.slice(1)) === 0)
      decimal = ''
  } else {
    int = toFixed(value, 0, roundingFunction)
  }

  // check abbreviation again after rounding
  if (abbr && !abbrForce && Number(int) >= 1000 && abbr !== locale.abbreviations.trillion) {
    int = String(Number(int) / 1000)

    switch (abbr) {
      case locale.abbreviations.thousand:
        abbr = locale.abbreviations.million
        break
      case locale.abbreviations.million:
        abbr = locale.abbreviations.billion
        break
      case locale.abbreviations.billion:
        abbr = locale.abbreviations.trillion
        break
    }
  }

  // format number
  if (int.includes('-')) {
    int = int.slice(1)
    neg = true
  }

  if (int.length < leadingCount) {
    for (let i = leadingCount - int.length; i > 0; i--)
      int = `0${int}`
  }

  if (thousands > -1)
    int = int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${locale.delimiters.thousands}`)

  if (format.indexOf('.') === 0)
    int = ''

  output = int + decimal + (abbr || '')

  if (negP) {
    output = (negP && neg ? '(' : '') + output + (negP && neg ? ')' : '')
  } else {
    if (signed >= 0)
      output = signed === 0 ? (neg ? '-' : '+') + output : output + (neg ? '-' : '+')
    else if (neg)
      output = `-${output}`
  }

  return output
}

numeral.stringToNumber = function (string: string) {
  const locale = locales[options.currentLocale]
  const stringOriginal = string
  const abbreviations = {
    thousand: 3,
    million: 6,
    billion: 9,
    trillion: 12,
  }
  let abbreviation: keyof NumeralAbbreviations
  let value
  let regexp

  if (options.zeroFormat && string === options.zeroFormat) {
    value = 0
  } else if (
    (options.nullFormat && string === options.nullFormat)
      || !string.replace(/[^0-9]+/g, '').length
  ) {
    value = null
  } else {
    value = 1

    if (locale.delimiters.decimal !== '.')
      string = string.replace(/\./g, '').replace(locale.delimiters.decimal, '.')

    for (abbreviation in abbreviations) {
      regexp = new RegExp(
          `[^a-zA-Z]${
            locale.abbreviations[abbreviation]
             }(?:\\)|(\\${
             locale.currency.symbol
             })?(?:\\))?)?$`,
      )

      if (stringOriginal.match(regexp)) {
        value *= 10 ** abbreviations[abbreviation]
        break
      }
    }

    value
        *= (string.split('-').length
          + Math.min(string.split('(').length - 1, string.split(')').length - 1))
        % 2
        ? 1
        : -1

    string = string.replace(/[^0-9\.]+/g, '')

    value *= Number(string)
  }

  return value
}

numeral.register('locale', 'en', {
  delimiters: {
    thousands: ',',
    decimal: '.',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't',
  },
  ordinal(number: number) {
    const b = number % 10
    return ~~((number % 100) / 10) === 1
      ? 'th'
      : b === 1
        ? 'st'
        : b === 2
          ? 'nd'
          : b === 3
            ? 'rd'
            : 'th'
  },
  currency: {
    symbol: '$',
  },
})

export { numeral }
