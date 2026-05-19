/**
 * Hook that opens an SSE notifications stream while the user is authenticated.
 * Reconnects with exponential backoff on connection drop.
 */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notificationService } from '../../api/services/notificationService'
import {
  setConnected,
  addNotification,
} from './notificationsSlice'

const MAX_BACKOFF = 30_000

export function useNotificationStream() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) return undefined

    let es = null
    let backoff = 1000
    let retryTimer = null
    let cancelled = false

    const connect = () => {
      if (cancelled) return
      try {
        es = notificationService.openStream()
        if (!es) {
          console.warn('[notifications] No EventSource created (no token)')
          return
        }
      } catch (err) {
        console.warn('[notifications] open failed', err)
        scheduleReconnect()
        return
      }

      es.addEventListener('open', () => {
        backoff = 1000
        dispatch(setConnected(true))
      })

      es.addEventListener('connected', () => dispatch(setConnected(true)))

      es.addEventListener('ping', () => {
        // keepalive — no-op
      })

      es.addEventListener('notification', (event) => {
        try {
          const payload = JSON.parse(event.data)
          dispatch(addNotification(payload))
        } catch {
          dispatch(addNotification({ message: event.data, ts: Date.now() }))
        }
      })

      es.addEventListener('error', () => {
        dispatch(setConnected(false))
        es?.close()
        scheduleReconnect()
      })
    }

    const scheduleReconnect = () => {
      if (cancelled) return
      retryTimer = setTimeout(() => {
        backoff = Math.min(backoff * 2, MAX_BACKOFF)
        connect()
      }, backoff)
    }

    connect()

    return () => {
      cancelled = true
      if (retryTimer) clearTimeout(retryTimer)
      es?.close()
      dispatch(setConnected(false))
    }
  }, [isAuthenticated, dispatch])
}
