/**
 * Authentication service.
 * All endpoints prefixed with the configured base URL (e.g. .../mb).
 */
import apiClient from '../axiosClient'

/**
 * Send OTP for the given channel (triggers SMS/email delivery).
 * Backend requires { vsid, session_secret, channel }.
 * Optionally pass email/mobile_number so backend can route to the correct destination.
 */
const sendOtp = ({ vsid, session_secret, channel, email, mobile_number }) => {
  const body = { vsid, session_secret, channel }
  if (email) body.email = email
  if (mobile_number) body.mobile_number = mobile_number
  return apiClient.post('/auth/register/send-otp', body).then((r) => r.data)
}

/**
 * Resend the registration OTP for the currently pending step.
 * Backend requires { vsid, session_secret }.
 */
const resend = ({ vsid, session_secret, email, mobile_number }) => {
  const body = { vsid, session_secret }
  if (email) body.email = email
  if (mobile_number) body.mobile_number = mobile_number
  return apiClient.post('/auth/register/resend', body).then((r) => r.data)
}

/**
 * Verify the registration OTP for the given channel.
 * Backend requires { vsid, session_secret, channel, code }.
 */
const verify = ({ vsid, session_secret, code, channel }) =>
  apiClient
    .post('/auth/register/verify-otp', { vsid, session_secret, channel, code })
    .then((r) => r.data)

export const authService = {
  // ── Login / refresh ────────────────────────────────────────────────────
  login: ({ username, password }) =>
    apiClient.post('/auth/login', { username, password }).then((r) => r.data),

  refresh: (refresh_token) =>
    apiClient.post('/auth/refresh', { refresh_token }).then((r) => r.data),

  logout: () => apiClient.post('/auth/logout').then((r) => r.data).catch(() => null),

  // ── Forgot password flow ───────────────────────────────────────────────
  forgotPassword: (email) =>
    apiClient.post('/auth/forgot-password', { email }).then((r) => r.data),

  verifyForgotPasswordOtp: ({ email, otp }) =>
    apiClient.post('/auth/forgot-password/verify', { email, otp }).then((r) => r.data),

  resetPassword: ({ email, otp, new_password }) =>
    apiClient
      .post('/auth/forgot-password/reset', { email, otp, new_password })
      .then((r) => r.data),

  // ── Signup flow ────────────────────────────────────────────────────────
  registerStart: (payload) =>
    apiClient.post('/auth/register/start', payload).then((r) => r.data),

  sendRegistrationOtp: ({ vsid, session_secret, channel }) =>
    sendOtp({ vsid, session_secret, channel }),

  verifyRegistrationEmail: ({ vsid, session_secret, code }) =>
    verify({ vsid, session_secret, code, channel: 'email' }),

  resendRegistrationEmail: ({ vsid, session_secret }) =>
    resend({ vsid, session_secret }),

  verifyRegistrationPhone: ({ vsid, session_secret, code }) =>
    verify({ vsid, session_secret, code, channel: 'phone' }),

  resendRegistrationPhone: ({ vsid, session_secret }) =>
    resend({ vsid, session_secret }),

  completeRegistration: ({ vsid, session_secret }) =>
    apiClient
      .post('/auth/register/complete', { vsid, session_secret })
      .then((r) => r.data),
}
