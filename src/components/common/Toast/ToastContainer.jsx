import { useEffect, useState } from 'react'
import { toast as toastApi } from '../../../utils/toast'
import './Toast.css'

function ToastContainer() {
  const [items, setItems] = useState([])

  useEffect(() => toastApi.subscribe(setItems), [])

  if (!items.length) return null

  return (
    <div className="toast-container" role="region" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span className="toast-message">{t.message}</span>
          <button
            className="toast-close"
            onClick={() => toastApi.dismiss(t.id)}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export default ToastContainer
