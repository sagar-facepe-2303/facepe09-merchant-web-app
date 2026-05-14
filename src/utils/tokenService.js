/**
 * Token service.
 * - Stores access/refresh tokens in localStorage if "remember me",
 *   otherwise sessionStorage.
 * - Single source of truth used by axios interceptors and the auth slice.
 */
import { storage, sessionStore } from './storage'
import { STORAGE_KEYS } from './constants'

const getStore = () => {
  const remember = storage.getItem(STORAGE_KEYS.REMEMBER_ME, false)
  return remember ? storage : sessionStore
}

export const tokenService = {
  setRememberMe(remember) {
    storage.setItem(STORAGE_KEYS.REMEMBER_ME, !!remember)
  },

  getAccessToken() {
    return (
      sessionStore.getItem(STORAGE_KEYS.ACCESS_TOKEN) ||
      storage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
    )
  },

  getRefreshToken() {
    return (
      sessionStore.getItem(STORAGE_KEYS.REFRESH_TOKEN) ||
      storage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
    )
  },

  setTokens({ access_token, refresh_token }) {
    const store = getStore()
    if (access_token) store.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token)
    if (refresh_token) store.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh_token)
  },

  clear() {
    storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
    storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    sessionStore.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
    sessionStore.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
  },

  isAuthenticated() {
    return !!this.getAccessToken()
  },
}
