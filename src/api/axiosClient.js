/**
 * Centralized axios instance with:
 *  - Base URL from VITE_API_BASE_URL
 *  - Authorization header injection
 *  - 401 → refresh token → retry once
 *  - Logout broadcast on refresh failure (window 'auth:logout' event)
 *  - Error normalization via errorParser
 */
import axios from 'axios'
import { tokenService } from '../utils/tokenService'
import { TOKEN_TYPE } from '../utils/constants'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.dev.facepe.ai/mb'
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 20000

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// ─── Request interceptor ─────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken()
    if (token && !config.headers?.Authorization) {
      config.headers = config.headers || {}
      config.headers.Authorization = `${TOKEN_TYPE} ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ─── Refresh-token coordination ──────────────────────────────────────────────
let refreshPromise = null

const performTokenRefresh = async () => {
  const refresh_token = tokenService.getRefreshToken()
  if (!refresh_token) throw new Error('NO_REFRESH_TOKEN')

  // Use a clean axios call to avoid recursive interceptor loop
  const { data } = await axios.post(
    `${BASE_URL}/auth/refresh`,
    { refresh_token },
    {
      headers: { 'Content-Type': 'application/json' },
      timeout: TIMEOUT,
    }
  )

  if (!data?.access_token) throw new Error('INVALID_REFRESH_RESPONSE')
  tokenService.setTokens({
    access_token: data.access_token,
    refresh_token: data.refresh_token || refresh_token,
  })
  return data.access_token
}

const broadcastLogout = (reason = 'session_expired') => {
  tokenService.clear()
  window.dispatchEvent(new CustomEvent('auth:logout', { detail: { reason } }))
}

// ─── Response interceptor ────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {}
    const status = error.response?.status

    const isAuthEndpoint =
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/refresh')

    if (status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true
      try {
        if (!refreshPromise) {
          refreshPromise = performTokenRefresh().finally(() => {
            refreshPromise = null
          })
        }
        const newToken = await refreshPromise
        originalRequest.headers = originalRequest.headers || {}
        originalRequest.headers.Authorization = `${TOKEN_TYPE} ${newToken}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        broadcastLogout('refresh_failed')
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
