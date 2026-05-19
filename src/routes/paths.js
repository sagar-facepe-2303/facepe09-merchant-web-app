/**
 * Centralized route paths so they aren't hardcoded across pages.
 */
export const ROUTES = Object.freeze({
  ROOT: '/',
  LOGIN: '/login',

  FORGOT_PASSWORD: '/forgot-password',
  FORGOT_PASSWORD_VERIFY_CODE: '/forgot-password/verify-code',
  FORGOT_PASSWORD_NEW_PASSWORD: '/forgot-password/new-password',
  FORGOT_PASSWORD_SUCCESS: '/forgot-password/success',

  SIGNUP: '/signup',
  SIGNUP_VERIFY_EMAIL: '/signup/verify-email',
  SIGNUP_VERIFY_PHONE: '/signup/verify-phone',
  SIGNUP_CONNECT_GATEWAY: '/signup/connect-gateway',

  DASHBOARD: '/dashboard',
  DASHBOARD_TRANSACTIONS: '/dashboard/transactions',
  DASHBOARD_SETTINGS: '/dashboard/settings',
})

export const PUBLIC_ROUTES = [
  ROUTES.ROOT,
  ROUTES.LOGIN,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.FORGOT_PASSWORD_VERIFY_CODE,
  ROUTES.FORGOT_PASSWORD_NEW_PASSWORD,
  ROUTES.FORGOT_PASSWORD_SUCCESS,
  ROUTES.SIGNUP,
  ROUTES.SIGNUP_VERIFY_EMAIL,
  ROUTES.SIGNUP_VERIFY_PHONE,
  ROUTES.SIGNUP_CONNECT_GATEWAY,
]
