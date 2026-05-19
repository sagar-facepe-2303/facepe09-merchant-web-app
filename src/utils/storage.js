/**
 * Safe localStorage / sessionStorage helpers with JSON support.
 * Falls back gracefully if storage is unavailable (e.g. SSR, private mode).
 */

const safeRun = (fn, fallback) => {
  try {
    return fn()
  } catch {
    return fallback
  }
}

export const storage = {
  getItem: (key, fallback = null) =>
    safeRun(() => {
      const raw = window.localStorage.getItem(key)
      if (raw == null) return fallback
      try {
        return JSON.parse(raw)
      } catch {
        return raw
      }
    }, fallback),

  setItem: (key, value) =>
    safeRun(() => {
      const serialized =
        typeof value === 'string' ? value : JSON.stringify(value)
      window.localStorage.setItem(key, serialized)
      return true
    }, false),

  removeItem: (key) =>
    safeRun(() => {
      window.localStorage.removeItem(key)
      return true
    }, false),

  clear: () =>
    safeRun(() => {
      window.localStorage.clear()
      return true
    }, false),
}

export const sessionStore = {
  getItem: (key, fallback = null) =>
    safeRun(() => {
      const raw = window.sessionStorage.getItem(key)
      if (raw == null) return fallback
      try {
        return JSON.parse(raw)
      } catch {
        return raw
      }
    }, fallback),
  setItem: (key, value) =>
    safeRun(() => {
      const serialized =
        typeof value === 'string' ? value : JSON.stringify(value)
      window.sessionStorage.setItem(key, serialized)
      return true
    }, false),
  removeItem: (key) =>
    safeRun(() => {
      window.sessionStorage.removeItem(key)
      return true
    }, false),
}
