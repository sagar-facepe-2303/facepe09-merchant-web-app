/**
 * Wraps a route to require authentication.
 * Redirects to /login (preserving the attempted location) when not auth'd.
 */
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ROUTES } from './paths'

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location.pathname }} replace />
  }
  return children
}

export default ProtectedRoute
