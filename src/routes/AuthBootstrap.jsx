/**
 * Listens for global 'auth:logout' events (broadcast by axios interceptor on
 * refresh-token failure). On logout, clears state and redirects to /login.
 * Also fetches profile once when authenticated.
 */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { forceLogout } from '../features/auth/authSlice'
import { fetchProfileThunk, clearProfile } from '../features/profile/profileSlice'
import { clearNotifications } from '../features/notifications/notificationsSlice'
import { ROUTES } from './paths'
import { toast } from '../utils/toast'

function AuthBootstrap({ children }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated)
  const profileLoaded = useSelector((s) => !!s.profile.data)

  useEffect(() => {
    const onLogout = (e) => {
      dispatch(forceLogout())
      dispatch(clearProfile())
      dispatch(clearNotifications())
      const reason = e?.detail?.reason
      if (reason === 'refresh_failed' || reason === 'session_expired') {
        toast.warning('Your session has expired. Please log in again.')
      }
      navigate(ROUTES.LOGIN, { replace: true })
    }
    window.addEventListener('auth:logout', onLogout)
    return () => window.removeEventListener('auth:logout', onLogout)
  }, [dispatch, navigate])

  useEffect(() => {
    if (isAuthenticated && !profileLoaded) {
      dispatch(fetchProfileThunk())
    }
  }, [isAuthenticated, profileLoaded, dispatch])

  return children
}

export default AuthBootstrap
