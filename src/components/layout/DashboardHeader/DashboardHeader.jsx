import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { markAllRead } from '../../../features/notifications/notificationsSlice'
import { useNotificationStream } from '../../../features/notifications/useNotificationStream'

const getInitials = (profile) => {
  if (!profile) return 'AD'
  const source = profile.business_name || profile.email || ''
  const parts = source.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return (source.slice(0, 2) || 'AD').toUpperCase()
}

function DashboardHeader({ currentPage, currentPagePath, userName }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const profile = useSelector((s) => s.profile.data)
  const unreadCount = useSelector((s) => s.notifications.unreadCount)

  // Activate the SSE notifications stream while the dashboard is mounted
  useNotificationStream()

  const initials = userName || getInitials(profile)

  const handleNotificationsClick = () => {
    dispatch(markAllRead())
    navigate('/dashboard/settings', { state: { tab: 'notifications' } })
  }

  return (
    <header className="dashboard-header">
      <nav className="dashboard-breadcrumb" aria-label="Breadcrumb">
        <Link to="/dashboard" className="breadcrumb-item">Dashboard</Link>
        <span className="breadcrumb-separator">/</span>
        <Link to={currentPagePath} className="breadcrumb-item breadcrumb-item-active">{currentPage}</Link>
      </nav>

      <div className="dashboard-header-actions">
        {/* <div className="search-input-wrapper">
          <input type="text" placeholder="Search..." className="search-input" />
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13.9988 13.9998L11.1055 11.1064" stroke="#8C93A1" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 7.33333C2 10.2769 4.38979 12.6667 7.33333 12.6667C10.2769 12.6667 12.6667 10.2769 12.6667 7.33333C12.6667 4.38979 10.2769 2 7.33333 2C4.38979 2 2 4.38979 2 7.33333V7.33333" stroke="#8C93A1" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div> */}

        <button
          className="notification-btn"
          aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
          onClick={handleNotificationsClick}
          style={{ position: 'relative' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7.70047 15.75C7.96843 16.2141 8.4636 16.4999 8.99947 16.4999C9.53534 16.4999 10.0305 16.2141 10.2985 15.75M2.44597 11.4945C2.24578 11.7139 2.19393 12.0308 2.31375 12.3025C2.43356 12.5743 2.70246 12.7498 2.99947 12.75H14.9995C15.2964 12.7501 15.5655 12.575 15.6856 12.3034C15.8058 12.0318 15.7543 11.7149 15.5545 11.4952C14.557 10.467 13.4995 9.37425 13.4995 6C13.4995 3.51638 11.4831 1.5 8.99947 1.5C6.51585 1.5 4.49947 3.51638 4.49947 6C4.49947 9.37425 3.44122 10.467 2.44597 11.4945" stroke="#374151" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {unreadCount > 0 && (
            <span className="notification-badge" aria-hidden="true">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {profile?.logo_url ? (
          <img className="user-badge user-badge-img" src={profile.logo_url} alt={initials} />
        ) : (
          <div className="user-badge" title={profile?.business_name || ''}>{initials}</div>
        )}
      </div>
    </header>
  )
}

export default DashboardHeader
