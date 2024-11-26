/**
 * Determine whether the input value is the global window object.
 *
 * @returns {value is Window} Returns true if `value` is a Window, false otherwise.
 *
 * @example
 * isWindow(window); // true
 * isWindow({}); // false
 */
export function isWindow(val: unknown): val is Window {
  return val === window;
}
