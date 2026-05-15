/**
 * Notifications via Server-Sent Events.
 * Uses event-source-polyfill to support Authorization header.
 */
import { tokenService } from '../../utils/tokenService'
import { EventSourcePolyfill } from 'event-source-polyfill'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.dev.facepe.ai/mb'

export const notificationService = {
  /**
   * Open a notifications stream. Returns the EventSource so the caller
   * can attach handlers and close it on unmount.
   */
  openStream() {
    const token = tokenService.getAccessToken()
    if (!token) {
      console.warn('[notifications] No access token available')
      return null
    }
    const url = `${BASE_URL}/notifications/stream`
    return new EventSourcePolyfill(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
  },
}
