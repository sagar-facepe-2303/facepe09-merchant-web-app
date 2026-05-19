/**
 * Tiny zero-dependency toast manager.
 * The <ToastContainer /> component (in components/common/Toast) subscribes
 * to changes and renders the active toasts.
 */

let _id = 0
let _listeners = new Set()
let _toasts = []

const emit = () => _listeners.forEach((l) => l(_toasts))

const push = (type, message, opts = {}) => {
  const id = ++_id
  const duration = opts.duration ?? 4000
  _toasts = [..._toasts, { id, type, message, duration }]
  emit()
  if (duration > 0) {
    setTimeout(() => {
      _toasts = _toasts.filter((t) => t.id !== id)
      emit()
    }, duration)
  }
  return id
}

export const toast = {
  success: (msg, opts) => push('success', msg, opts),
  error: (msg, opts) => push('error', msg, opts),
  info: (msg, opts) => push('info', msg, opts),
  warning: (msg, opts) => push('warning', msg, opts),
  dismiss: (id) => {
    _toasts = _toasts.filter((t) => t.id !== id)
    emit()
  },
  subscribe: (l) => {
    _listeners.add(l)
    l(_toasts)
    return () => _listeners.delete(l)
  },
}
