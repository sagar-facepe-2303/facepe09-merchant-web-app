/**
 * Reusable Header Component for Dashboard Layout
 * Shows logo, navigation, and user actions
 */
import { useNavigate } from 'react-router-dom'
import Button from '../../common/Button/Button'

function Header({
  user,
  onLogout,
  showNav = true,
  className = ''
}) {
  const navigate = useNavigate()

  const classes = ['app-header', className].filter(Boolean).join(' ')

  return (
    <header className={classes}>
      <div className="header-brand" onClick={() => navigate('/')}>
        <span className="header-logo">FP</span>
        <span className="header-brand-text">FacePe</span>
      </div>

      {showNav && (
        <nav className="header-nav">
          <button
            className="header-nav-link"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </button>
          <button
            className="header-nav-link"
            onClick={() => navigate('/transactions')}
          >
            Transactions
          </button>
          <button
            className="header-nav-link"
            onClick={() => navigate('/settings')}
          >
            Settings
          </button>
        </nav>
      )}

      <div className="header-actions">
        {user && (
          <div className="header-user">
            <span className="header-user-name">{user.name || user.email}</span>
            {user.plan && <span className="header-user-plan">{user.plan}</span>}
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout || (() => navigate('/login'))}
        >
          Logout
        </Button>
      </div>
    </header>
  )
}

export default Header
