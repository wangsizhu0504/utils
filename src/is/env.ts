import { toTypeString } from '../shared/base'

/**
 * 判断是否是 window 对象
 *
 * @param {any} any object
 * @returns {boolean} true/false
 *
 * @category Is
 */

export const isWindow = (v: any): boolean => typeof window !== 'undefined' && toTypeString(v) === '[object Window]'

/**
 * 判断是否在浏览器环境中
 * @returns {boolean} true/false
 *
 * @category Is
 */

export const inBrowser = typeof window !== 'undefined'

/**
 * 判断是否在微信浏览器环境中
 * @returns {boolean} true/false
 *
 * @category Is
 */

export const isWechatBrowser = (): boolean => (navigator?.userAgent.toLowerCase() as string).includes('micromessenger')

/**
 * 浏览器标识
 *
 * @category Is
 */
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
/**
 * isIE
 *
 * @category Is
 */
export const isIE = UA && /msie|trident/.test(UA)
/**
 * isIE9
 *
 * @category Is
 */
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
/**
 * isEdge
 *
 * @category Is
 */
export const isEdge = UA && UA.indexOf('edge/') > 0
/**
 * isChrome
 *
 * @category Is
 */
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
/**
 * isPhantomJS
 *
 * @category Is
 */
export const isPhantomJS = UA && /phantomjs/.test(UA)
/**
 * isFireFox
 *
 * @category Is
 */
export const isFF = UA && UA.match(/firefox\/(\d+)/)
/**
 * isElectron
 *
 * @category Is
 */
export const isElectron = inBrowser && (location.protocol === 'app:' || (process.env.NODE_ENV === 'development' && navigator.userAgent.includes('Electron')))
/**
 * isvscode
 *
 * @category Is
 */
export const isVSCode = inBrowser && location.protocol === 'vscode-webview:'

