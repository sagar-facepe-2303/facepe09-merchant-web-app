/**
 * Storage keys & app-wide constants
 */
export const STORAGE_KEYS = Object.freeze({
  ACCESS_TOKEN: 'facepe.access_token',
  REFRESH_TOKEN: 'facepe.refresh_token',
  REMEMBER_ME: 'facepe.remember_me',
  REGISTRATION_SESSION: 'facepe.registration_session',
  RESET_PASSWORD_EMAIL: 'facepe.reset_email',
  RESET_PASSWORD_OTP: 'facepe.reset_otp',
})

export const TOKEN_TYPE = 'Bearer'

export const RESEND_OTP_COOLDOWN_SECONDS = 30

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const PHONE_REGEX = /^\+?[1-9]\d{7,14}$/
