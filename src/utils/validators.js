/**
 * Lightweight form validators.
 */
import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX } from './constants'

export const isEmail = (v = '') => EMAIL_REGEX.test(String(v).trim())

export const isPhone = (v = '') => PHONE_REGEX.test(String(v).trim())

export const isStrongPassword = (v = '') => PASSWORD_REGEX.test(String(v))

export const isNonEmpty = (v) => v != null && String(v).trim().length > 0

/**
 * Username supports email or phone.
 */
export const isEmailOrPhone = (v = '') => isEmail(v) || isPhone(v)

/**
 * Validate a key/value record against a map of validators.
 * Returns { ok: boolean, errors: { [key]: message } }
 */
export function validateForm(values, rules) {
  const errors = {}
  Object.keys(rules).forEach((key) => {
    const fns = Array.isArray(rules[key]) ? rules[key] : [rules[key]]
    for (const rule of fns) {
      const result = rule(values[key], values)
      if (result) {
        errors[key] = result
        break
      }
    }
  })
  return { ok: Object.keys(errors).length === 0, errors }
}

// Common rule factories
export const required = (msg = 'This field is required') => (v) =>
  isNonEmpty(v) ? null : msg

export const email = (msg = 'Enter a valid email address') => (v) =>
  !isNonEmpty(v) || isEmail(v) ? null : msg

export const phone = (msg = 'Enter a valid phone number') => (v) =>
  !isNonEmpty(v) || isPhone(v) ? null : msg

export const emailOrPhone = (msg = 'Enter a valid email or phone number') => (v) =>
  !isNonEmpty(v) || isEmailOrPhone(v) ? null : msg

export const strongPassword = (
  msg = 'Use 8+ chars with upper, lower, number & symbol'
) => (v) => (!isNonEmpty(v) || isStrongPassword(v) ? null : msg)

export const matches = (otherKey, msg = 'Values do not match') => (v, all) =>
  v === all?.[otherKey] ? null : msg

export const minLength = (n, msg) => (v) =>
  !isNonEmpty(v) || String(v).length >= n
    ? null
    : msg || `Must be at least ${n} characters`
