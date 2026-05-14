/**
 * Notifications via Server-Sent Events.
 * Tokens are sent via query param because browsers' EventSource API
 * does not allow custom headers.
 */
import { tokenService } from '../../utils/tokenService'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.dev.facepe.ai/mb'

export const notificationService = {
  /**
   * Open a notifications stream. Returns the EventSource so the caller
   * can attach handlers and close it on unmount.
   */
  openStream() {
    const token = tokenService.getAccessToken()
    const url = `${BASE_URL}/notifications/stream${token ? `?token=${encodeURIComponent(token)}` : ''}`
    return new EventSource(url, { withCredentials: true })
  },
}
