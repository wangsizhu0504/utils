import { describe, expect, it } from 'vitest'
import { numeral } from '../../src/format'

describe('format/numeral', () => {
  it('should set a default format', () => {
    numeral.defaultFormat('0,0')

    expect(numeral(10000).format()).to.equal('10,000')
  })
  it('should return a value as correct type', () => {
    const tests = [
      [1234.56, 'number'],
      ['1234.56', 'number'],
      [0, 'number'],
      [Number.NaN, 'object'],
      [null, 'object'],
    ]
    let i

    for (i = 0; i < tests.length; i++)
      expect(typeof numeral(tests[i][0]).value()).to.equal(tests[i][1])
  })
  it('should return a value', () => {
    numeral.reset()
    const tests = [
      [1000, 1000],
      [0.5, 0.5],
      [null, null],
      ['1,000', 1000],
      ['not a number', null],
    ]
    let num

    for (const item of tests) {
      num = numeral(item[0])

      expect(num.value()).to.equal(item[1])
    }
  })

  it('should change zero value', () => {
    const tests = [
      [0, null, '0', '0'],
      [0, 'N/A', '0', 'N/A'],
      [0, '', '', ''],
    ]

    for (const item of tests) {
      numeral.zeroFormat(item[1])

      expect(numeral(item[0]).format(item[2])).to.equal(item[3])
    }
  })
  it('should change null value', () => {
    const tests = [
      [null, null, '0', '0'],
      [null, 'N/A', '0', 'N/A'],
      [null, '', '', ''],
    ]

    for (const test of tests) {
      numeral.nullFormat(test[1])

      expect(numeral(test[0]).format(test[2])).to.equal(test[3])
    }
  })
  it('should clone', () => {
    const a = numeral(1000)
    const b = numeral(a)
    const c = a.clone()
    const aVal = a.value()
    const aSet = a.set(2000).value()
    const bVal = b.value()
    const cVal = c.add(10).value()

    expect(aVal).to.equal(1000)
    expect(aSet).to.equal(2000)
    expect(bVal).to.equal(1000)
    expect(cVal).to.equal(1010)
  })
  it('should return boolean', () => {
    const tests = [
      [numeral(), true],
      [1, false],
    ]

    for (const test of tests)
      expect(numeral.isNumeral(test[0])).to.equal(test[1])
  })
  it('should format to a number', () => {
    numeral.reset()
    const tests = [
      [0, null, '0'],
      [0, '0.00', '0.00'],
      [null, null, '0'],
      [Number.NaN, '0.0', '0.0'],
      [1.23, '0,0', '1'],
      [10000, '0,0.0000', '10,000.0000'],
      [10000.23, '0,0', '10,000'],
      [-10000, '0,0.0', '-10,000.0'],
      [10000.1234, '0.000', '10000.123'],
      [10000, '0[.]00', '10000'],
      [10000.1, '0[.]00', '10000.10'],
      [10000.123, '0[.]00', '10000.12'],
      [10000.456, '0[.]00', '10000.46'],
      [10000.001, '0[.]00', '10000'],
      [10000.45, '0[.]00[0]', '10000.45'],
      [10000.456, '0[.]00[0]', '10000.456'],
      [10000, '(0,0.0000)', '10,000.0000'],
      [-10000, '(0,0.0000)', '(10,000.0000)'],
      [-12300, '+0,0.0000', '-12,300.0000'],
      [1230, '+0,0', '+1,230'],
      [1230, '-0,0', '1,230'],
      [-1230, '-0,0', '-1,230'],
      [-1230.4, '0,0.0+', '1,230.4-'],
      [-1230.4, '0,0.0-', '1,230.4-'],
      [1230.4, '0,0.0-', '1,230.4'],
      [100.78, '0', '101'],
      [100.28, '0', '100'],
      [1.932, '0.0', '1.9'],
      [1.9687, '0', '2'],
      [1.9687, '0.0', '2.0'],
      [-0.23, '.00', '-.23'],
      [-0.23, '(.00)', '(.23)'],
      [0.23, '0.00000', '0.23000'],
      [0.67, '0.0[0000]', '0.67'],
      [3162.63, '0.0[00000000000000]', '3162.63'],
      [1.99, '0.[0]', '2'],
      [1.0501, '0.00[0]', '1.05'],
      [1.005, '0.00', '1.01'],
      // leading zero
      [0, '00.0', '00.0'],
      [0.23, '000.[00]', '000.23'],
      [4, '000', '004'],
      [10, '00000', '00010'],
      [1000, '000,0', '1,000'],
      [1000, '00000,0', '01,000'],
      [1000, '0000000,0', '0,001,000'],
      // abbreviations
      [2000000000, '0.0a', '2.0b'],
      [1230974, '0.0a', '1.2m'],
      [1460, '0a', '1k'],
      [-104000, '0 a', '-104 k'],
      [999950, '0.0a', '1.0m'],
      [999999999, '0a', '1b'],
      // forced abbreviations
      [-5444333222111, '0,0 ak', '-5,444,333,222 k'],
      [5444333222111, '0,0 am', '5,444,333 m'],
      [-5444333222111, '0,0 ab', '-5,444 b'],
      [-5444333222111, '0,0 at', '-5 t'],
      [123456, '0.0[0] ak', '123.46 k'],
      [150, '0.0 ak', '0.2 k'],
    ]
    let n
    let output

    for (const test of tests) {
      n = numeral(test[0])
      output = n.format(test[1])
      expect(output).to.equal(test[2])

      expect(typeof output).to.equal('string')
    }
  })
})
